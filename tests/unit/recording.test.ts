import { test } from 'node:test';
import assert from 'node:assert/strict';
import { crc32 as nodeCrc32 } from 'node:zlib';
import { encodeWav, decodeWav } from '../../src/audio/wav.ts';
import { makeZip, readZip, crc32 } from '../../src/util/zip.ts';
import { evaluateRecording } from '../../src/audio/offline.ts';
import { renderStrum } from '../../src/audio/pluck.ts';
import { chord, chordMidis } from '../../src/music/chords.ts';
import { midiToFreq } from '../../src/music/notes.ts';
import { PLAN, parseFrets } from '../../src/music/recording-plan.ts';

test('WAV hin und zurück verliert höchstens die 16-Bit-Quantisierung', () => {
  const sig = new Float32Array(1000).map((_, i) => Math.sin(i / 10) * 0.8);
  const d = decodeWav(encodeWav(sig, 44100));
  assert.equal(d.sampleRate, 44100);
  assert.equal(d.samples.length, 1000);
  assert.ok(d.samples.every((v, i) => Math.abs(v - sig[i]) < 1e-4));
});

test('ZIP: CRC wie zlib, Inhalt und Umlaut-Namen kommen unverändert zurück', () => {
  const data = new TextEncoder().encode('Hänschen klein');
  assert.equal(crc32(data), nodeCrc32(data));
  const zip = makeZip([
    { name: 'a.txt', data },
    { name: 'über.json', data: new Uint8Array([1, 2, 3]) },
  ]);
  const back = readZip(zip);
  assert.deepEqual(
    back.map((e) => e.name),
    ['a.txt', 'über.json'],
  );
  assert.equal(new TextDecoder().decode(back[0].data), 'Hänschen klein');
  assert.deepEqual(Array.from(back[1].data), [1, 2, 3]);
});

test('Offline-Lauscher lobt einen gezupften C-Akkord als C, aber nicht als F', () => {
  const freqs = chordMidis(chord('C')).map(midiToFreq);
  const one = renderStrum(freqs, 48000, 1);
  const sig = new Float32Array(one.length * 3);
  for (let k = 0; k < 3; k++) sig.set(one, k * one.length);
  const r = evaluateRecording(sig, 48000);
  assert.ok(r.accepted.C !== undefined, 'C nicht erkannt');
  assert.equal(r.accepted.F, undefined);
});

test('Stille wird nie gelobt', () => {
  const r = evaluateRecording(new Float32Array(48000 * 2), 48000);
  assert.deepEqual(r.accepted, {});
});

test('Aufnahmeplan: eindeutige ids, vier Saiten je Griff', () => {
  assert.equal(new Set(PLAN.map((t) => t.id)).size, PLAN.length);
  for (const t of PLAN) assert.equal(parseFrets(t.frets).length, 4, t.id);
});

test('Aufnahmeplan synthetisch: jeder richtige Griff gelobt, kein Fehlgriff als gewollter Akkord', () => {
  const open = [67, 60, 64, 69];
  for (const t of PLAN) {
    const f = parseFrets(t.frets);
    const freqs = f.flatMap((x, s) => (x >= 0 ? [midiToFreq(open[s] + x)] : []));
    if (!freqs.length) continue;
    const one = renderStrum(freqs, 48000, 1);
    const sig = new Float32Array(one.length * 3);
    for (let k = 0; k < 3; k++) sig.set(one, k * one.length);
    const r = evaluateRecording(sig, 48000);
    if (t.correct) assert.ok(r.accepted[t.chord!] !== undefined, `${t.id}: nicht erkannt`);
    else if (t.chord) assert.equal(r.accepted[t.chord], undefined, `${t.id}: Fehlgriff als ${t.chord} gelobt`);
  }
});
