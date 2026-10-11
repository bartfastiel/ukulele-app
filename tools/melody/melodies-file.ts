// Schreibt src/music/songs-melodies.ts (gemeinsam für import.ts und relyric.ts).
import { writeFileSync } from 'node:fs';

export interface MelodyEntry {
  id: string;
  meter: number;
  pickup: number;
  originalKey: string;
  similarity: number;
  source: string;
  url: string;
  text: string;
}

export function writeMelodies(entries: MelodyEntry[]) {
  const out = [
    '// Erzeugt von tools/melody/import.ts aus den Notenbeispielen der Wikipedia-Artikel und tools/melody/abc/ (gemeinfreie',
    '// Melodien; übernommen sind nur Tonhöhen, Dauern und ggf. Akkordfolgen, die Silben stammen aus dem belegten Liedtext,',
    '// s. tools/melody/relyric.ts). Nicht von Hand bearbeiten.',
    '',
    'export interface ImportedMelody {',
    '  text: string;',
    '  meter: number;',
    '  pickup: number;',
    '  originalKey: string;',
    '  /** Anteil des Notentexts, der mit unserem geprüften Text übereinstimmt. */',
    '  similarity: number;',
    '  /** Herkunft der Melodie, wird an `origin` angehängt. */',
    '  source: string;',
    '  /** Adresse der Quelle (Permalink auf die verwendete Fassung des Notenbeispiels). */',
    '  url: string;',
    '}',
    '',
    'export const MELODIES: Record<string, ImportedMelody> = {',
    ...entries.map(
      (r) =>
        `  '${r.id}': { meter: ${r.meter}, pickup: ${r.pickup}, originalKey: '${r.originalKey}', similarity: ${r.similarity.toFixed(2)}, source: '${r.source.replace(/'/g, '’')}', url: '${r.url.replace(/'/g, '%27')}', text: \`${r.text.replace(/`/g, '\\`')}\` },`,
    ),
    '};',
    '',
  ].join('\n');
  writeFileSync(new URL('../../src/music/songs-melodies.ts', import.meta.url), out);
}
