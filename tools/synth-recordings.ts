// Erzeugt ein synthetisches Aufnahme-Set nach dem Aufnahmeplan (gleiches Format wie #/aufnahme), als Gegenprobe
// zu echten Aufnahmen für tools/eval-recordings.ts:   node tools/synth-recordings.ts <ziel.zip>
import { writeFileSync } from 'node:fs';
import { PLAN, parseFrets } from '../src/music/recording-plan.ts';
import { renderStrum } from '../src/audio/pluck.ts';
import { encodeWav } from '../src/audio/wav.ts';
import { makeZip, type ZipEntry } from '../src/util/zip.ts';
import { STRINGS, midiToFreq } from '../src/music/notes.ts';

const SR = 48000;
const files: ZipEntry[] = [];
const takes: object[] = [];
PLAN.forEach((t, i) => {
  const freqs = parseFrets(t.frets).flatMap((f, s) => (f >= 0 ? [midiToFreq(STRINGS[s].midi + f)] : []));
  const one = freqs.length ? renderStrum(freqs, SR, 1.2) : new Float32Array(SR * 1.2);
  const sig = new Float32Array(SR * 5);
  for (let k = 0; k + one.length <= sig.length; k += one.length) sig.set(one.map((v) => v * 0.6), k);
  const name = `${i + 1 < 10 ? '0' : ''}${i + 1}-${t.id}.wav`;
  files.push({ name, data: encodeWav(sig, SR) });
  takes.push({ file: name, id: t.id, chord: t.chord, frets: t.frets, technique: t.technique, correct: t.correct });
});
files.push({ name: 'takes.json', data: new TextEncoder().encode(JSON.stringify({ userAgent: 'synthetisch', takes })) });
writeFileSync(process.argv[2], makeZip(files));
console.log(`${takes.length} synthetische Aufnahmen → ${process.argv[2]}`);
