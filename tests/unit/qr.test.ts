import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { alignmentPositions, byteCapacity, encodeQr, formatBits, qrPath, type QrCode } from '../../src/util/qr.ts';

const rows = (q: QrCode) => q.modules.map((r) => r.map((b) => (b ? '1' : '0')).join(''));
const sha = (q: QrCode) => createHash('sha256').update(rows(q).join('\n')).digest('hex');
const text = (n: number) => 'Ukulele-Club teilt Lieder: C G Am F. '.repeat(100).slice(0, n);

test('Kapazitäten im Byte-Modus stimmen mit der Norm überein', () => {
  assert.equal(byteCapacity(1, 'L'), 17);
  assert.equal(byteCapacity(1, 'M'), 14);
  assert.equal(byteCapacity(10, 'L'), 271);
  assert.equal(byteCapacity(10, 'M'), 213);
  assert.equal(byteCapacity(25, 'L'), 1273);
  assert.equal(byteCapacity(25, 'M'), 997);
  assert.equal(byteCapacity(40, 'L'), 2953);
  assert.deepEqual(alignmentPositions(7), [6, 22, 38]);
  assert.deepEqual(alignmentPositions(25), [6, 32, 58, 84, 110]);
});

test('Formatinformation nach Norm (Tabelle C.1)', () => {
  assert.equal(formatBits('M', 0), 0b101010000010010);
  assert.equal(formatBits('L', 0), 0b111011111000100);
  assert.equal(formatBits('L', 7), 0b110100101110110);
});

test('bitgenau wie ein unabhängiger Referenz-Encoder (voll gefüllte Symbole)', () => {
  // Referenz: segno 1.6.6 mit fester Version, Fehlerkorrektur und Maske
  const v1 = encodeQr(text(14), { ecl: 'M', mask: 3 })!;
  assert.equal(v1.version, 1);
  assert.deepEqual(rows(v1), [
    '111111101011101111111',
    '100000101001101000001',
    '101110100101001011101',
    '101110101100001011101',
    '101110100001001011101',
    '100000100100001000001',
    '111111101010101111111',
    '000000001011000000000',
    '101101110111001001011',
    '100001001101011110001',
    '000111100010011000111',
    '111101000000000111000',
    '010100110000100001010',
    '000000001101101010011',
    '111111101000001111000',
    '100000101100010101101',
    '101110100101000111110',
    '101110101100101001110',
    '101110101001100000100',
    '100000100010011100001',
    '111111101101001110100',
  ]);
  assert.equal(sha(encodeQr(text(154), { ecl: 'L', mask: 5 })!), '25f924ab765ba0197d8bf7d9ed12c31dcb8e5c06d345b51b0e51e907877896a2');
  assert.equal(sha(encodeQr(text(287), { ecl: 'M', mask: 6 })!), '3d1fa0227b83a330ad86ba8845b8a8e84543ecf8a51e8d86b3adb8b138f12ffe');
  assert.equal(sha(encodeQr(text(1273), { ecl: 'L', mask: 1 })!), '1c85afea869e83501bc98778a2ab56d20839e2ec219a9d82e9c63e53ad619d7c');
});

test('Struktur: Finder-Muster, Taktlinien, dunkles Modul, Formatinfo doppelt', () => {
  const q = encodeQr('https://example.org/#/teilen/' + 'Ab9_-'.repeat(40))!;
  const n = q.size;
  assert.equal(n, q.version * 4 + 17);
  const finder = ['1111111', '1000001', '1011101', '1011101', '1011101', '1000001', '1111111'];
  const at = (x0: number, y0: number) => finder.map((_, y) => rows(q)[y0 + y].slice(x0, x0 + 7));
  assert.deepEqual(at(0, 0), finder);
  assert.deepEqual(at(n - 7, 0), finder);
  assert.deepEqual(at(0, n - 7), finder);
  for (let i = 8; i < n - 8; i++) {
    assert.equal(q.modules[6][i], i % 2 === 0);
    assert.equal(q.modules[i][6], i % 2 === 0);
  }
  assert.equal(q.modules[n - 8][8], true);
  // beide Kopien der Formatinformation lesen und vergleichen
  let a = 0;
  let b = 0;
  const first: [number, number][] = [[8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 7], [8, 8], [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8]];
  first.forEach((p, i) => (a |= (q.modules[p[1]][p[0]] ? 1 : 0) << i));
  for (let i = 0; i < 8; i++) b |= (q.modules[8][n - 1 - i] ? 1 : 0) << i;
  for (let i = 8; i < 15; i++) b |= (q.modules[n - 15 + i][8] ? 1 : 0) << i;
  assert.equal(a, b);
  assert.equal(a, formatBits(q.ecl, q.mask));
});

test('Versionswahl: kleinste passende, bei gleicher Größe lieber M; zu lang ergibt null', () => {
  const q = encodeQr('x'.repeat(14))!;
  assert.equal(q.version, 1);
  assert.equal(q.ecl, 'M');
  assert.equal(encodeQr('x'.repeat(15))!.ecl, 'L');
  assert.equal(encodeQr('x'.repeat(1273), { maxVersion: 25 })!.version, 25);
  assert.equal(encodeQr('x'.repeat(1274), { maxVersion: 25 }), null);
  assert.ok(encodeQr('x'.repeat(1274))!.version > 25);
});

test('SVG-Pfad: ein Rechteck je dunklem Lauf, mit Ruhezone versetzt', () => {
  const q = encodeQr('Hallo')!;
  const d = qrPath(q);
  assert.ok(d.startsWith('M4 4h7v1h-7z'));
  const area = (d.match(/h(\d+)/g) || []).reduce((s, m) => s + Number(m.slice(1)), 0);
  assert.equal(area, q.modules.reduce((s, r) => s + r.filter(Boolean).length, 0));
});
