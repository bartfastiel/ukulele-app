import { STRINGS, playableFret, stringMidi, tabPosition } from './notes.ts';
import { ROOTS, parseChordName } from './chords.ts';
import { instrument } from './instrument.ts';
import { tk } from '../i18n.ts';

/**
 * 12-Takt-Blues: I7 I7 I7 I7 | IV7 IV7 I7 I7 | V7 IV7 I7 V7. In C ist er auf der Ukulele (hohes G) besonders bequem:
 * Grundtöne C, F, G liegen auf der leeren C-Saite, der E-Saite im 1. Bund und der leeren G-Saite. Auf der Gitarre ist
 * es E (E und A leer), auf dem Banjo G (G und D leer) – siehe `blues` im Instrument.
 */
const DEGREES = [0, 0, 0, 0, 5, 5, 0, 0, 7, 5, 0, 7];

/** Akkordfolge in der Tonart `key` (Tonklasse 0 = C). */
export function bluesBars(key: number): string[] {
  return DEGREES.map((d) => ROOTS[(key + d) % 12] + '7');
}

/**
 * Grundton eines Sept-Akkords in der Spiellage des Instruments (`uke`; Ukulele C4–B4, Gitarre E2–Eb3, Banjo D3–C#4)
 * und in der Basslage.
 */
export function rootOf(chord: string): { uke: number; bass: number } {
  const p = parseChordName(chord);
  const pc = p ? p.root : 0;
  const low = instrument().blues.low;
  return { uke: low + ((pc - low + 120) % 12), bass: 36 + pc };
}

/** Blues-Tonleiter (relativ zum Grundton der Tonart): Moll-Pentatonik plus „blue note“. */
export const BLUES_SCALE = [0, 3, 5, 6, 7, 10];

export interface LevelNote {
  /** Schlag im Takt (0–3). */
  beat: number;
  midi: number;
}

export interface Level {
  id: string;
  title: string;
  text: string;
  /** Töne je Takt für die Vorgabe; null = freies Spiel. */
  notes: ((chord: string) => LevelNote[]) | null;
}

/** Hält Melodietöne in der bequemen ersten Lage (Ukulele C4–C5). */
function inReach(midi: number): number {
  return midi > instrument().blues.low + 12 ? midi - 12 : midi;
}

const pattern = (intervals: number[]) => (chord: string) =>
  intervals.map((iv, beat) => ({ beat, midi: inReach(rootOf(chord).uke + iv) }));

export const LEVELS: Level[] = [
  {
    id: 'grundton',
    title: tk('1 · Grundton'),
    text: tk('Spiel in jedem Takt viermal den Grundton – den Ton, nach dem der Akkord heißt. Wo er liegt, zeigt der goldene Punkt auf dem Hals.'),
    notes: pattern([0, 0, 0, 0]),
  },
  {
    id: 'quinte',
    title: tk('2 · Grundton und Quinte'),
    text: tk('Zweimal Grundton, zweimal Quinte. Die Quinte ist fünf Töne über dem Grundton und klingt wie ein starker Partner.'),
    notes: pattern([0, 0, 7, 7]),
  },
  {
    id: 'boogie',
    title: tk('3 · Boogie-Riff'),
    // Text je Instrument (Ukulele: „In C sind das alles leere Saiten“), siehe levelText()
    text: '',
    notes: pattern([0, 4, 7, 9]),
  },
  {
    id: 'frei',
    title: tk('4 · Frei spielen'),
    text: tk('Jetzt bist du dran: Alle Punkte auf dem Hals gehören zur Blues-Tonleiter und passen immer. Die goldenen passen besonders gut zum Akkord gerade. Probier kurze Melodien, wiederhole sie, mach Pausen!'),
    notes: null,
  },
];

/** Erklärtext einer Stufe; das Boogie-Riff liegt je Instrument anders. */
export function levelText(level: Level): string {
  return level.id === 'boogie' ? instrument().blues.boogie : level.text;
}

/** Töne des Akkords (Dominantsept) als Tonklassen. */
export function chordTones(chord: string): number[] {
  const r = rootOf(chord).uke % 12;
  return [0, 4, 7, 10].map((i) => (r + i) % 12);
}

/** Alle Stellen der Blues-Tonleiter auf dem Hals (Bund 0–maxFret), je Saite. */
export function scalePositions(key: number, maxFret = 3): { string: number; fret: number; midi: number }[] {
  const out: { string: number; fret: number; midi: number }[] = [];
  STRINGS.forEach((_, s) => {
    for (let f = 0; f <= maxFret; f++) {
      if (!playableFret(s, f)) continue;
      const m = stringMidi(s, f);
      if (BLUES_SCALE.indexOf((m - key + 120) % 12) >= 0) out.push({ string: s, fret: f, midi: m });
    }
  });
  return out;
}

export function position(midi: number): { string: number; fret: number } {
  return tabPosition(midi) || { string: 1, fret: 0 };
}

/** Swing: die zweite Achtel jedes Schlags kommt bei 2/3 statt bei 1/2. */
export const SWING = 2 / 3;

/**
 * Orgel-Griff des Sept-Akkords außerhalb dessen, was das Mikrofon hören will: bei der Ukulele unter 240 Hz (B2–Bb3),
 * bei Gitarre und Banjo, die selbst so tief klingen, darüber (B4–Bb5).
 */
export function organVoicing(chord: string): number[] {
  const r = rootOf(chord).uke % 12;
  const low = instrument().blues.organ;
  return [0, 4, 7, 10].map((i) => low + ((((r + i - low) % 12) + 12) % 12)).sort((a, b) => a - b);
}
