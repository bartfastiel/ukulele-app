// Wertet Beispielaufnahmen aus der Aufnahme-Ansicht (#/aufnahme) aus: Wie hätte die Akkorderkennung der App
// auf jede Aufnahme reagiert? Zeigt richtige Treffer, verpasste Akkorde und – am wichtigsten – falsches Lob.
//
//   node tools/eval-recordings.ts <ukulele-aufnahmen-….zip | Ordner mit takes.json> [--all]
//
// „Richtig“ heißt: die gespielten Bünde (frets in takes.json) stimmen mit dem Griff des Akkords überein.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { readZip } from '../src/util/zip.ts';
import { decodeWav } from '../src/audio/wav.ts';
import { evaluateRecording } from '../src/audio/offline.ts';
import { CHORDS } from '../src/music/chords.ts';

interface TakeMeta {
  file: string;
  id: string;
  chord: string | null;
  frets: string;
  technique: string;
  correct: boolean;
  note?: string;
}

const input = process.argv[2];
const showAll = process.argv.includes('--all');
if (!input) {
  console.error('Aufruf: node tools/eval-recordings.ts <zip|ordner> [--all]');
  process.exit(2);
}

const files = new Map<string, Uint8Array>();
if (statSync(input).isDirectory()) {
  for (const f of readdirSync(input)) files.set(f, new Uint8Array(readFileSync(join(input, f))));
} else {
  for (const e of readZip(new Uint8Array(readFileSync(input)))) files.set(e.name, e.data);
}
const metaBytes = files.get('takes.json');
if (!metaBytes) throw new Error('takes.json fehlt');
const meta = JSON.parse(new TextDecoder().decode(metaBytes)) as { userAgent?: string; takes: TakeMeta[] };

const fretsOf = (name: string) =>
  CHORDS.find((c) => c.name === name)!
    .frets.join('');

let truePos = 0;
let shouldPos = 0;
let falseAccepts = 0;
let falseOnIntended = 0;
let mistakeTakes = 0;
const lines: string[] = [];

console.log(`Gerät: ${meta.userAgent || 'unbekannt'}`);
console.log(`${meta.takes.length} Aufnahmen\n`);

for (const t of meta.takes) {
  const wav = files.get(t.file);
  if (!wav) {
    lines.push(`?  ${t.file}: Datei fehlt`);
    continue;
  }
  const d = decodeWav(wav);
  const r = evaluateRecording(d.samples, d.sampleRate);
  const shouldAccept = CHORDS.filter((c) => fretsOf(c.name) === t.frets).map((c) => c.name);
  const accepted = Object.keys(r.accepted);
  const wrong = accepted.filter((c) => shouldAccept.indexOf(c) < 0);
  const missed = shouldAccept.filter((c) => accepted.indexOf(c) < 0);
  shouldPos += shouldAccept.length;
  truePos += shouldAccept.length - missed.length;
  falseAccepts += wrong.length;
  // Kernfrage: Fehlgriff, aber die App lobt genau den Akkord, den das Kind spielen wollte
  const intendedWrong = !!t.chord && fretsOf(t.chord) !== t.frets && wrong.indexOf(t.chord) >= 0;
  if (t.chord && CHORDS.some((c) => c.name === t.chord) && fretsOf(t.chord) !== t.frets) mistakeTakes++;
  if (intendedWrong) falseOnIntended++;
  const flag = intendedWrong ? '‼' : wrong.length ? '✗' : missed.length ? '·' : '✓';
  if (showAll || flag !== '✓')
    lines.push(
      `${flag}  ${t.file.padEnd(34)} gespielt ${t.frets} ${(t.technique || '').padEnd(6)} ` +
        `laut ${(r.loudFrames * 100).toFixed(0).padStart(3)} %  ` +
        (accepted.length ? `gelobt: ${accepted.map((c) => `${c}@${r.accepted[c].toFixed(1)}s`).join(' ')}` : 'gelobt: –') +
        (missed.length ? `  verpasst: ${missed.join(' ')}` : '') +
        (t.note ? `  (${t.note})` : ''),
    );
}

console.log(lines.join('\n'));
console.log('\nZusammenfassung');
console.log(`  richtig erkannt:            ${truePos}/${shouldPos}`);
console.log(`  falsches Lob (alle Akkorde): ${falseAccepts}`);
console.log(`  Fehlgriff als gewollter Akkord gelobt: ${falseOnIntended}/${mistakeTakes}`);
console.log('\nLegende: ‼ Fehlgriff als gewollter Akkord gelobt · ✗ anderes falsches Lob · · verpasst · ✓ alles richtig');
