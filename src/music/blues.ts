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

const LETTERS = 'CDEFGAB';
const NATURAL = [0, 2, 4, 5, 7, 9, 11];
/** Tonstufe (in Buchstaben ab dem Grundton) je Abstand: kleine und große Terz heißen beide „Terz“ usw. */
const STEPS = [0, 1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6];

/**
 * Tonname passend zur Tonart: in E ist die große Terz G# (nicht Ab), in C die kleine Terz Eb (nicht D#). Wo das
 * ungewohnte Namen ergäbe (Cb, Fb, E#, B#, Doppelvorzeichen), der übliche Name.
 */
export function spell(pc: number, key: number): string {
  const p = ((pc % 12) + 12) % 12;
  const letter = (LETTERS.indexOf(ROOTS[key].charAt(0)) + STEPS[(p - key + 12) % 12]) % 7;
  const diff = ((p - NATURAL[letter] + 18) % 12) - 6;
  const name = LETTERS.charAt(letter) + (diff === 1 ? '#' : diff === -1 ? 'b' : diff === 0 ? '' : '?');
  return /\?|Cb|Fb|E#|B#/.test(name) ? ROOTS[p] : name;
}

/** Töne aus Dur, die man in den Blues mischt (große Sekunde, große Terz, große Sexte): Dur-Pentatonik. */
export const MAJOR_ADD = [2, 4, 9];

export interface LevelNote {
  /** Schlag im Takt (0–3). */
  beat: number;
  midi: number;
}

export interface Level {
  id: string;
  title: string;
  text: string;
  /** Töne je Takt (Akkord, Takt 0–11) für die Vorgabe; null = freies Spiel. */
  notes: ((chord: string, bar?: number) => LevelNote[]) | null;
}

/** Hält Melodietöne in der bequemen ersten Lage (Ukulele C4–C5). */
function inReach(midi: number): number {
  return midi > instrument().blues.low + 12 ? midi - 12 : midi;
}

const pattern = (intervals: number[]) => (chord: string) =>
  intervals.map((iv, beat) => ({ beat, midi: inReach(rootOf(chord).uke + iv) }));

/**
 * Walking Bass (E-Bass): Grundton, Terz, Quinte, Sexte hinauf und im nächsten Takt Septime, Sexte, Quinte, Terz
 * hinunter – das Boogie-Riff der Begleitband, in Vierteln.
 */
const WALK_UP = [0, 4, 7, 9];
const WALK_DOWN = [10, 9, 7, 4];
const walking = (chord: string, bar = 0) => pattern(bar % 2 ? WALK_DOWN : WALK_UP)(chord);
const boogie = pattern([0, 4, 7, 9]);

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
    // Text je Instrument (Ukulele: „In C sind das alles leere Saiten“), siehe levelText(); auf dem E-Bass Walking Bass
    text: '',
    notes: (chord, bar) => (instrument().notesOnly ? walking(chord, bar) : boogie(chord)),
  },
  {
    id: 'frei',
    title: tk('4 · Frei spielen'),
    text: tk('Jetzt bist du dran: Alle Punkte auf dem Hals gehören zur Blues-Tonleiter und passen immer. Die goldenen passen besonders gut zum Akkord gerade. Probier kurze Melodien, wiederhole sie, mach Pausen!'),
    notes: null,
  },
  {
    id: 'mischen',
    title: tk('5 · Dur und Moll mischen'),
    text: tk('Wie Stufe 4, dazu kommen blasse Punkte: Töne aus Dur. Über dem {i}-Akkord klingt seine große Terz {iii} wunderbar – rutsch gern von {b3} aus hinein. Über {iv} ist {iii} ausgeblendet, dort reibt er sich mit dem Akkord.'),
    notes: null,
  },
];

/** Name einer Stufe; auf dem E-Bass wird das Boogie-Riff zum Walking Bass. */
export function levelTitle(level: Level): string {
  return level.id === 'boogie' && instrument().notesOnly ? tk('3 · Walking Bass') : level.title;
}

/** Erklärtext einer Stufe; das Boogie-Riff liegt je Instrument anders. */
export function levelText(level: Level): string {
  return level.id === 'boogie' ? instrument().blues.boogie : level.text;
}

/** Töne des Akkords (Dominantsept) als Tonklassen. */
export function chordTones(chord: string): number[] {
  const r = rootOf(chord).uke % 12;
  return [0, 4, 7, 10].map((i) => (r + i) % 12);
}

/**
 * Sichtbarer Ausschnitt des Halses: `frets` Bünde ab Bund `from` (1 = am Sattel). Leere Saiten gehören immer dazu,
 * sie klingen in jeder Lage.
 */
export interface NeckWindow {
  from: number;
  frets: number;
}

export function inWindow(fret: number, w: NeckWindow): boolean {
  return fret === 0 || (fret >= w.from && fret < w.from + w.frets);
}

/** Höchster Ton, der im Ausschnitt gegriffen werden kann. */
export function windowTop(w: NeckWindow): number {
  let top = 0;
  STRINGS.forEach((_, s) => {
    const f = playableFret(s, w.from + w.frets - 1) ? w.from + w.frets - 1 : 0;
    top = Math.max(top, stringMidi(s, f));
  });
  return top;
}

/**
 * Ausschnitt für die Vorgabe-Stufen: am Sattel `blues.frets` Bünde, weiter oben so viele mehr, dass jeder Ton darin
 * liegt (Ukulele 4, Banjo 5).
 */
export function levelWindow(from: number): NeckWindow {
  const max = instrument().frets;
  for (let frets = instrument().blues.frets; ; frets++) {
    const w = { from: Math.max(1, Math.min(from, max - frets + 1)), frets };
    const pcs: number[] = [];
    STRINGS.forEach((_, s) => {
      for (let f = 0; f < w.from + w.frets; f++)
        if (inWindow(f, w) && playableFret(s, f) && pcs.indexOf(stringMidi(s, f) % 12) < 0) pcs.push(stringMidi(s, f) % 12);
    });
    if (pcs.length === 12 || frets >= 12) return w;
  }
}

/** Alle Stellen der Blues-Tonleiter im Ausschnitt (Zahl = Bünde ab dem Sattel), je Saite. */
export function scalePositions(key: number, w: NeckWindow | number = 3): { string: number; fret: number; midi: number }[] {
  const win = typeof w === 'number' ? { from: 1, frets: w } : w;
  const out: { string: number; fret: number; midi: number }[] = [];
  STRINGS.forEach((_, s) => {
    for (let f = 0; f < win.from + win.frets; f++) {
      if (!inWindow(f, win) || !playableFret(s, f)) continue;
      const m = stringMidi(s, f);
      if (BLUES_SCALE.indexOf((m - key + 120) % 12) >= 0) out.push({ string: s, fret: f, midi: m });
    }
  });
  return out;
}

/**
 * Die kleine Terz der Tonart ist die klassische Blue Note: ein wenig hochgezogen liegt sie zwischen Moll und Dur.
 * Ziehen geht nur gegriffen, nicht auf der leeren Saite.
 */
export function bendable(midi: number, fret: number, key: number): boolean {
  return fret > 0 && (midi - key + 120) % 12 === 3;
}

export interface FreeNote {
  string: number;
  fret: number;
  midi: number;
  /** chord = Akkordton (golden), scale = passt */
  kind: 'chord' | 'scale';
  /** weniger naheliegend: blasser zeigen */
  weak: boolean;
  bend: boolean;
}

/**
 * Passt der Ton beim freien Spiel? Blues-Tonleiter immer; beim Mischen auch die Dur-Töne – außer der großen Terz der
 * Tonart über dem IV-Akkord, die reibt sich mit dessen Septime (in C: E gegen Eb über F7).
 */
export function fitsFree(midi: number, key: number, chord: string, mixed: boolean): boolean {
  const rel = (midi - key + 120) % 12;
  if (BLUES_SCALE.indexOf(rel) >= 0) return true;
  if (!mixed || MAJOR_ADD.indexOf(rel) < 0) return false;
  return !(rel === 4 && rootOf(chord).uke % 12 === (key + 5) % 12);
}

/** Punkte für das freie Spiel im Ausschnitt, zum gerade klingenden Akkord. */
export function freeNotes(key: number, chord: string, w: NeckWindow, mixed: boolean): FreeNote[] {
  const tones = chordTones(chord);
  // Ziehen zur großen Terz klingt nur über dem Grundakkord; über IV7 ist der Ton schon Akkordton, über V7 reibt er
  const onTonic = rootOf(chord).uke % 12 === key;
  const out: FreeNote[] = [];
  STRINGS.forEach((_, s) => {
    for (let f = 0; f < w.from + w.frets; f++) {
      if (!inWindow(f, w) || !playableFret(s, f)) continue;
      const m = stringMidi(s, f);
      if (!fitsFree(m, key, chord, mixed)) continue;
      const isChord = tones.indexOf(m % 12) >= 0;
      out.push({
        string: s,
        fret: f,
        midi: m,
        kind: isChord ? 'chord' : 'scale',
        weak: !isChord && BLUES_SCALE.indexOf((m - key + 120) % 12) < 0,
        bend: onTonic && bendable(m, f, key),
      });
    }
  });
  return out;
}

export function position(midi: number): { string: number; fret: number } {
  return tabPosition(midi) || { string: 1, fret: 0 };
}

/**
 * Wo spielt man einen Vorgabe-Ton im Ausschnitt? Am Sattel wie bisher die bequemste Stelle. Weiter oben gilt jede
 * Oktave (das Mikrofon vergleicht nur die Tonklasse): erst gegriffen im Ausschnitt – dafür hat man die Hand ja dorthin
 * geschoben –, dann auf einer leeren Saite, sonst die bequemste Stelle überhaupt; jeweils möglichst nah an der Vorgabe.
 */
export function place(midi: number, w: NeckWindow): { string: number; fret: number; midi: number } {
  const home = position(midi);
  if (w.from === 1 && inWindow(home.fret, w)) return { string: home.string, fret: home.fret, midi };
  let best: { string: number; fret: number; midi: number } | null = null;
  let score = Infinity;
  STRINGS.forEach((_, s) => {
    for (let f = 0; f < w.from + w.frets; f++) {
      if (!inWindow(f, w) || !playableFret(s, f)) continue;
      const m = stringMidi(s, f);
      if ((m - midi + 120) % 12) continue;
      const cost = (f === 0 ? 100 : 0) + Math.abs(m - midi);
      if (cost < score) {
        score = cost;
        best = { string: s, fret: f, midi: m };
      }
    }
  });
  return best || { string: home.string, fret: home.fret, midi };
}

/** Swing: die zweite Achtel jedes Schlags kommt bei 2/3 statt bei 1/2. */
export const SWING = 2 / 3;

/**
 * Orgel-Griff des Sept-Akkords außerhalb dessen, was das Mikrofon hören will: bei der Ukulele unter 240 Hz (B2–Bb3),
 * bei Gitarre und Banjo, die selbst so tief klingen, darüber (B4–Bb5) – und noch eine Oktave höher, wenn man weiter
 * oben am Hals spielt (`above` = höchster Ton, den man gerade spielen kann).
 */
export function organVoicing(chord: string, above = 0): number[] {
  const r = rootOf(chord).uke % 12;
  let low = instrument().blues.organ;
  if (low > instrument().blues.low) while (low <= above + 1) low += 12;
  return [0, 4, 7, 10].map((i) => low + ((((r + i - low) % 12) + 12) % 12)).sort((a, b) => a - b);
}
