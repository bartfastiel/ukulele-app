import { test } from 'node:test';
import assert from 'node:assert/strict';
import { deflateRawSync, inflateRawSync } from 'node:zlib';
import { base64url, deflateRaw, fromBase64url, inflateRaw, utf8Decode, utf8Encode } from '../../src/util/deflate.ts';
import { decodeShare, encodeShare } from '../../src/music/own-songs.ts';
import { SONGS } from '../../src/music/songs.ts';
import { byteCapacity } from '../../src/util/qr.ts';

const SAMPLE = '[C]Heute spiel ich [G7]Ukulele,\n[G7]und die Sonne [C]lacht. Ä Ö Ü ß € 🎵\n'.repeat(12);

test('eigenes DEFLATE ist mit zlib verträglich – in beide Richtungen', () => {
  for (const text of ['', 'a', 'abcabcabcabc', SAMPLE, 'x'.repeat(70000)]) {
    const bytes = utf8Encode(text);
    assert.equal(utf8Decode(new Uint8Array(inflateRawSync(deflateRaw(bytes)))), text);
    assert.equal(utf8Decode(inflateRaw(new Uint8Array(deflateRawSync(bytes)), 1 << 20)), text);
    assert.equal(utf8Decode(inflateRaw(deflateRaw(bytes), 1 << 20)), text);
  }
  // gespeicherte und dynamische Blöcke von zlib
  const big = utf8Encode(SONGS.map((s) => s.title + (s.chordpro || s.text)).join('\n'));
  assert.deepEqual(inflateRaw(new Uint8Array(deflateRawSync(big, { level: 0 })), 1 << 22), big);
  assert.deepEqual(inflateRaw(new Uint8Array(deflateRawSync(big, { level: 9 })), 1 << 22), big);
});

test('Entpacken bricht bei kaputten oder aufgeblähten Daten ab', () => {
  assert.throws(() => inflateRaw(new Uint8Array([0xff, 0xff, 0xff])));
  assert.throws(() => inflateRaw(deflateRaw(utf8Encode('x'.repeat(5000))), 1000));
});

test('Base64url: ohne + / =, rundum gleich', () => {
  for (let n = 0; n < 20; n++) {
    const bytes = new Uint8Array(n).map((_, i) => (i * 97 + 251) & 255);
    const enc = base64url(bytes);
    assert.match(enc, /^[A-Za-z0-9_-]*$/);
    assert.deepEqual(fromBase64url(enc), bytes);
    assert.equal(enc, btoa(String.fromCharCode.apply(null, Array.from(bytes))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''));
  }
  assert.equal(fromBase64url('ab$c'), null);
});

test('Lied per Link: kodieren und wieder lesen', () => {
  const s = { title: 'Mein Lied', text: SAMPLE, meter: 3, bpm: 72 };
  const data = encodeShare(s);
  assert.equal(data[0], '1');
  assert.match(data, /^[01][A-Za-z0-9_-]+$/);
  assert.deepEqual(decodeShare(data), s);
  // kurze Texte unkomprimiert, wenn das kürzer ist
  const tiny = encodeShare({ title: 'A', text: '[C]x', meter: 4, bpm: 90 });
  assert.deepEqual(decodeShare(tiny), { title: 'A', text: '[C]x', meter: 4, bpm: 90 });
});

test('kaputte oder fremde Links ergeben null statt eines Fehlers', () => {
  assert.equal(decodeShare(''), null);
  assert.equal(decodeShare('1kaputt'), null);
  assert.equal(decodeShare('2' + base64url(utf8Encode('{}'))), null);
  assert.equal(decodeShare('0' + base64url(utf8Encode('{"t":"","c":"[C]x"}'))), null);
  // unsinnige Werte werden geglättet
  const odd = decodeShare('0' + base64url(utf8Encode('{"t":"X","c":"[C]x","m":5,"b":1e9}')));
  assert.deepEqual(odd, { title: 'X', text: '[C]x', meter: 4, bpm: 200 });
});

test('ein typisches Lied passt komprimiert in einen QR-Code', () => {
  const longest = SONGS.filter((s) => s.chordpro).sort((a, b) => b.chordpro!.length - a.chordpro!.length)[0];
  const url = 'https://ukulele.wer-ist-daniel-schwarz.de/#/teilen/' + encodeShare({ title: longest.title, text: longest.chordpro!, meter: 4, bpm: 90 });
  assert.ok(url.length < longest.chordpro!.length, `${url.length} ≥ ${longest.chordpro!.length}`);
  const typical = SONGS.filter((s) => s.chordpro).map((s) => 'https://ukulele.wer-ist-daniel-schwarz.de/#/teilen/' + encodeShare({ title: s.title, text: s.chordpro!, meter: 4, bpm: 90 }));
  const fits = typical.filter((n) => n.length <= byteCapacity(25, 'L')).length;
  assert.ok(fits / typical.length > 0.8, `${fits}/${typical.length}`);
});
