import { QUALITY_INTERVALS } from './chords.ts';
import { tk } from '../i18n.ts';

const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const NATURAL = [0, 2, 4, 5, 7, 9, 11];
/** Buchstabe des Grundtons je Halbton, passend zu ROOTS (C, C#, D, Eb …). */
const ROOT_LETTER = [0, 0, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6];

/** Stufe im Notennamen (Terz = 2 Buchstaben weiter) je Intervall; die verminderte Septime (9) ist eine Septime. */
function degreeOf(interval: number, quality: string): number {
  if (interval === 9 && quality === 'dim7') return 6;
  return [0, 1, 1, 2, 2, 3, 4, 4, 4, 5, 6, 6][interval];
}

/** Töne des Akkords, richtig geschrieben: E-Dur → E, G#, B; Cdim7 → C, Eb, Gb, Bbb. */
export function spellChord(root: number, quality: string): string[] {
  const intervals = QUALITY_INTERVALS[quality] || [];
  return intervals.map((iv) => {
    const letter = (ROOT_LETTER[root] + degreeOf(iv, quality)) % 7;
    let diff = (((root + iv - NATURAL[letter]) % 12) + 12) % 12;
    if (diff > 6) diff -= 12;
    const acc = diff > 0 ? '#'.repeat(diff) : 'b'.repeat(-diff);
    return LETTERS[letter] + acc;
  });
}

const INTERVAL_NAMES = [
  tk('Grundton'),
  tk('kleine Sekunde'),
  tk('große Sekunde'),
  tk('kleine Terz'),
  tk('große Terz'),
  tk('Quarte'),
  tk('verminderte Quinte'),
  tk('Quinte'),
  tk('übermäßige Quinte'),
  tk('große Sexte'),
  tk('kleine Septime'),
  tk('große Septime'),
];

/** Name des Intervalls zum Grundton (für „Grundton, große Terz, Quinte“), Schlüssel für t(). */
export function intervalName(interval: number, quality: string): string {
  if (interval === 9 && quality === 'dim7') return tk('verminderte Septime');
  if (interval === 2 && quality === 'add9') return tk('None');
  return INTERVAL_NAMES[interval];
}

const MAJOR = [0, 2, 4, 5, 7, 9, 11];
const TRIADS = ['', 'm', 'm', '', '', 'm', 'dim'];
const SEVENTHS = ['maj7', 'm7', 'm7', 'maj7', '7', 'm7', 'm7b5'];

/** Dur-Tonarten, in denen der Akkord leitereigen ist: Grundton der Tonart und Stufe (0 = I). */
export function majorKeysWith(root: number, quality: string): { key: number; degree: number }[] {
  const out: { key: number; degree: number }[] = [];
  for (let d = 0; d < 7; d++) {
    if (TRIADS[d] !== quality && SEVENTHS[d] !== quality) continue;
    out.push({ key: (((root - MAJOR[d]) % 12) + 12) % 12, degree: d });
  }
  return out;
}

export const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
