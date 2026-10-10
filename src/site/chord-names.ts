import { parseChordName } from '../music/chords.ts';
import type { Lang } from '../i18n.ts';

/** Grundtöne zum Ausschreiben: im Deutschen mit Fis, Es, B (= Bb) und H (= B), damit Suchanfragen wie „Fis-Moll“ passen. */
const ROOT_NAMES: Record<Lang, string[]> = {
  de: ['C', 'Cis', 'D', 'Es', 'E', 'F', 'Fis', 'G', 'As', 'A', 'B', 'H'],
  en: ['C', 'C sharp', 'D', 'E flat', 'E', 'F', 'F sharp', 'G', 'A flat', 'A', 'B flat', 'B'],
  fr: ['do', 'do dièse', 'ré', 'mi bémol', 'mi', 'fa', 'fa dièse', 'sol', 'la bémol', 'la', 'si bémol', 'si'],
};

const QUALITY_NAMES: Record<string, Record<Lang, string>> = {
  '': { de: '-Dur', en: ' major', fr: ' majeur' },
  m: { de: '-Moll', en: ' minor', fr: ' mineur' },
  '7': { de: '-Dur mit Septime (Sept-Akkord)', en: ' seventh', fr: ' septième' },
  m7: { de: '-Moll mit Septime', en: ' minor seventh', fr: ' mineur septième' },
  maj7: { de: '-Dur mit großer Septime', en: ' major seventh', fr: ' septième majeure' },
  '6': { de: '-Dur mit Sexte', en: ' sixth', fr: ' sixte' },
  m6: { de: '-Moll mit Sexte', en: ' minor sixth', fr: ' mineur sixte' },
  sus2: { de: ' mit Sekunde statt Terz (sus2)', en: ' suspended second', fr: ' sus2' },
  sus4: { de: ' mit Quarte statt Terz (sus4)', en: ' suspended fourth', fr: ' sus4' },
  '7sus4': { de: '-Sept mit Quarte (7sus4)', en: ' seventh suspended fourth', fr: ' septième sus4' },
  add9: { de: '-Dur mit None (add9)', en: ' add nine', fr: ' add9' },
  dim: { de: ' vermindert', en: ' diminished', fr: ' diminué' },
  dim7: { de: ' vermindert mit Septime', en: ' diminished seventh', fr: ' septième diminuée' },
  m7b5: { de: ' halbvermindert', en: ' half-diminished', fr: ' demi-diminué' },
  aug: { de: ' übermäßig', en: ' augmented', fr: ' augmenté' },
  '5': { de: '-Powerchord (Grundton und Quinte)', en: ' power chord', fr: ' power chord' },
};

/** Ausgeschriebener Akkordname, z. B. „F#m“ → „Fis-Moll“ / „F sharp minor“ / „fa dièse mineur“. */
export function chordLongName(name: string, lang: Lang): string {
  const p = parseChordName(name);
  if (!p) return name;
  const q = QUALITY_NAMES[p.quality];
  const root = ROOT_NAMES[lang][p.root];
  if (!q) return name;
  const text = root + q[lang];
  return lang === 'fr' ? text.charAt(0).toUpperCase() + text.slice(1) : text;
}

/** Akkordarten, für die es eigene Seiten gibt (häufig gesucht und auf allen Instrumenten greifbar). */
export const PAGE_QUALITIES = ['', 'm', '7', 'm7', 'maj7', '6', 'm6', 'sus2', 'sus4', '7sus4', 'add9', 'dim', 'dim7', 'm7b5', 'aug'];

/** Grundtöne der Powerchords in der Reihenfolge am Gitarrenhals: ab der leeren tiefen E-Saite aufwärts. */
export const POWER_ORDER = [4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3];
