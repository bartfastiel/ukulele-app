import { tabPosition } from './notes.ts';

/**
 * 12-Takt-Blues in C – auf der Ukulele (hohes G) besonders bequem: Grundtöne C, F, G liegen auf der leeren
 * C-Saite, der E-Saite im 1. Bund und der leeren G-Saite; die ganze Blues-Tonleiter passt in die ersten drei Bünde.
 */
export const BARS = ['C7', 'C7', 'C7', 'C7', 'F7', 'F7', 'C7', 'C7', 'G7', 'F7', 'C7', 'G7'];

/** Grundton je Akkord auf der Ukulele (MIDI) und in der Basslage. */
export const ROOT: Record<string, { uke: number; bass: number }> = {
  C7: { uke: 60, bass: 36 },
  F7: { uke: 65, bass: 41 },
  G7: { uke: 67, bass: 43 },
};

/** Blues-Tonleiter in C: Moll-Pentatonik plus „blue note“ (Fis/Ges). */
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

/** Hält Melodietöne in der bequemen ersten Lage (C4–C5). */
function inReach(midi: number): number {
  return midi > 72 ? midi - 12 : midi;
}

const pattern = (intervals: number[]) => (chord: string) =>
  intervals.map((iv, beat) => ({ beat, midi: inReach(ROOT[chord].uke + iv) }));

export const LEVELS: Level[] = [
  {
    id: 'grundton',
    title: '1 · Grundton',
    text: 'Spiel in jedem Takt viermal den Grundton – den Ton, nach dem der Akkord heißt. Bei C die leere C-Saite, bei F die E-Saite im 1. Bund, bei G die leere G-Saite.',
    notes: pattern([0, 0, 0, 0]),
  },
  {
    id: 'quinte',
    title: '2 · Grundton und Quinte',
    text: 'Zweimal Grundton, zweimal Quinte. Die Quinte ist fünf Töne über dem Grundton und klingt wie ein starker Partner.',
    notes: pattern([0, 0, 7, 7]),
  },
  {
    id: 'boogie',
    title: '3 · Boogie-Riff',
    text: 'Grundton, Terz, Quinte, Sexte – das klassische Boogie-Riff. Bei C sind das alles leere Saiten: C, E, G, A!',
    notes: pattern([0, 4, 7, 9]),
  },
  {
    id: 'frei',
    title: '4 · Frei spielen',
    text: 'Jetzt bist du dran: Alle Punkte auf dem Hals gehören zur Blues-Tonleiter und passen immer. Die goldenen passen besonders gut zum Akkord gerade. Probier kurze Melodien, wiederhole sie, mach Pausen!',
    notes: null,
  },
];

/** Töne des Akkords (Dominantsept) als Tonklassen. */
export function chordTones(chord: string): number[] {
  const r = ROOT[chord].uke % 12;
  return [0, 4, 7, 10].map((i) => (r + i) % 12);
}

/** Alle Stellen der Blues-Tonleiter auf dem Hals (Bund 0–maxFret), je Saite. */
export function scalePositions(maxFret = 3): { string: number; fret: number; midi: number }[] {
  const open = [67, 60, 64, 69];
  const out: { string: number; fret: number; midi: number }[] = [];
  open.forEach((m, s) => {
    for (let f = 0; f <= maxFret; f++) if (BLUES_SCALE.indexOf((m + f) % 12) >= 0) out.push({ string: s, fret: f, midi: m + f });
  });
  return out;
}

export function position(midi: number): { string: number; fret: number } {
  return tabPosition(midi) || { string: 1, fret: 0 };
}

/** Swing: die zweite Achtel jedes Schlags kommt bei 2/3 statt bei 1/2. */
export const SWING = 2 / 3;
