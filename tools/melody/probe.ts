// Prüft alle LilyPond-Beispiele im Cache: Noten, Silben, Rest, Tonumfang.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parseLily, align } from './lily.ts';

const dir = process.argv[2];
for (const f of readdirSync(dir).filter((x) => x.endsWith('.ly'))) {
  try {
    const sc = parseLily(new TextDecoder().decode(readFileSync(join(dir, f))));
    if (!sc) {
      console.log(f.padEnd(34), 'nicht lesbar');
      continue;
    }
    const a = align(sc.notes, sc.verses[0]);
    const m = sc.notes.flatMap((n) => (n.midi === null ? [] : [n.midi]));
    const beats = sc.notes.reduce((x, n) => x + n.dur, 0);
    console.log(
      f.padEnd(34),
      `Noten ${String(m.length).padStart(3)} Silben ${String(sc.verses[0].length).padStart(3)} Strophen ${sc.verses.length}`,
      `Rest S${a.leftoverSyllables} N${a.leftoverNotes}`,
      `Umfang ${Math.min(...m)}–${Math.max(...m)} Takt ${sc.timeNum}/${sc.timeDen} Auftakt ${sc.partial} Viertel ${beats.toFixed(2)}`,
      sc.chords ? `Akkorde ${sc.chords.length}` : '',
    );
  } catch (e) {
    console.log(f.padEnd(34), 'FEHLER', (e as Error).message);
  }
}
