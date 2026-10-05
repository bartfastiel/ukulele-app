// Erzeugt Testsignale für das künstliche Mikrofon von Chromium (Playwright): angeschlagener Akkord bzw.
// einzelne Saite, jede Sekunde neu angeschlagen. Gleiche Synthese wie in der App (Karplus-Strong).
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { renderPluck, renderStrum } from '../src/audio/pluck.ts';
import { chord, chordMidis } from '../src/music/chords.ts';
import { midiToFreq } from '../src/music/notes.ts';

const SR = 48000;

function wav(samples: Float32Array): Uint8Array {
  const buf = new ArrayBuffer(44 + samples.length * 2);
  const v = new DataView(buf);
  const str = (o: number, t: string) => t.split('').forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  str(0, 'RIFF');
  v.setUint32(4, 36 + samples.length * 2, true);
  str(8, 'WAVE');
  str(12, 'fmt ');
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true);
  v.setUint16(22, 1, true);
  v.setUint32(24, SR, true);
  v.setUint32(28, SR * 2, true);
  v.setUint16(32, 2, true);
  v.setUint16(34, 16, true);
  str(36, 'data');
  v.setUint32(40, samples.length * 2, true);
  samples.forEach((s, i) => v.setInt16(44 + i * 2, Math.max(-1, Math.min(1, s)) * 0x7fff, true));
  return new Uint8Array(buf);
}

function repeat(make: () => Float32Array, times: number, gain: number): Float32Array {
  const one = make();
  const out = new Float32Array(one.length * times);
  for (let t = 0; t < times; t++) for (let i = 0; i < one.length; i++) out[t * one.length + i] = one[i] * gain;
  return out;
}

export function makeTestAudio(dir: string): { chordC: string; stringE: string } {
  const chordC = `${dir}/chord-c.wav`;
  const stringE = `${dir}/string-e.wav`;
  mkdirSync(dirname(chordC), { recursive: true });
  writeFileSync(chordC, wav(repeat(() => renderStrum(chordMidis(chord('C')).map(midiToFreq), SR, 1), 8, 0.8)));
  // E-Saite um 20 Cent zu tief – das Stimmgerät soll „zu tief“ sagen
  writeFileSync(stringE, wav(repeat(() => renderPluck(329.63 * Math.pow(2, -20 / 1200), SR, 1), 8, 0.6)));
  return { chordC, stringE };
}
