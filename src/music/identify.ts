import { tk } from '../i18n.ts';
import { CHORDS } from './chords.ts';
import { NOTE_NAMES, STRINGS, freqToMidi, pitchClass, playableFret, stringMidi } from './notes.ts';
import { instrument } from './instrument.ts';
import type { Peak } from '../audio/chord-detect.ts';

/**
 * Akkord-Detektiv: Welcher Griff (Bund je Saite, auch gedämpft) erklärt das Spektrum am besten – und wie heißt
 * der Akkord? Statt nur die Griffe der Bibliothek zu prüfen, werden alle Kombinationen der ersten fünf Bünde
 * bewertet (Ukulele: 6 Werte × 4 Saiten + gedämpft = 2401). Auf Halbtöne gerechnet, damit das unter 2 ms bleibt.
 * Bei sechs Saiten wären es 117 649 – dann kommen je Saite nur Bünde in Frage, deren Ton im Spektrum klingt.
 */

export const MAX_FRET = 5;
const MUTED = -1;
/** Abstand der Obertöne 1–3 in Halbtönen. */
const HARMONICS = [0, 12, 19.02];
/** Mehr Kombinationen werden nicht vollständig durchsucht. */
const FULL_SEARCH = 5000;
const TOL = 0.4;

export interface Fingering {
  frets: number[];
  score: number;
  midis: number[];
}

interface P {
  midi: number;
  mag: number;
}

function prepare(peaks: Peak[]): { ps: P[]; max: number } {
  const max = peaks.reduce((m, p) => Math.max(m, p.mag), 0) || 1;
  return { ps: peaks.map((p) => ({ midi: freqToMidi(p.freq), mag: p.mag / max })), max };
}

function scoreMidis(ps: P[], midis: number[], harmonics: number[]): number {
  if (!midis.length) return 0;
  let total = 0;
  let explained = 0;
  let foreign = 0;
  for (const p of ps) {
    total += p.mag;
    let hit = false;
    for (const m of midis) {
      for (const h of harmonics)
        if (Math.abs(p.midi - (m + h)) < TOL) {
          hit = true;
          break;
        }
      if (hit) break;
    }
    if (hit) explained += p.mag;
    else if (p.mag > foreign) foreign = p.mag;
  }
  const unique = Array.from(new Set(midis));
  let sum = 0;
  let min = 1;
  for (const m of unique) {
    let best = 0;
    for (const p of ps) if (Math.abs(p.midi - m) < TOL && p.mag > best) best = p.mag;
    const v = Math.min(1, best / 0.25);
    sum += v;
    if (v < min) min = v;
  }
  const presence = sum / unique.length;
  return (total ? explained / total : 0) * (0.55 * presence + 0.45 * min) * (1 - Math.min(1, foreign * 2));
}

const libraries: Record<string, Map<string, string>> = {};

/** Bibliotheksgriffe des aktuellen Instruments nach Bünden. */
function library(): Map<string, string> {
  const id = instrument().id;
  if (!libraries[id]) libraries[id] = new Map(CHORDS.map((c) => [c.frets.join(','), c.name]));
  return libraries[id];
}

/** Obertöne in Halbtönen, die als erklärt gelten: Ukulele 1–3, tiefe Instrumente mehr. */
function harmonicsFor(count: number): number[] {
  const out: number[] = [];
  for (let k = 1; k <= Math.max(3, count); k++) out.push(k === 3 ? 19.02 : 12 * Math.log2(k));
  return out;
}

/**
 * Handy-Mikrofone hören die tiefe C-Saite und die hohe G-Saite oft schwach. Dann erklären mehrere Griffe den
 * Klang fast gleich gut, und der einfachere (weniger Finger, tiefere Bünde, bekannter Griff) ist der richtige.
 */
export const PREFER = { perFret: 0.012, perFinger: 0.02, perMuted: 0.1, library: 0.08, minScore: 0.4 };

/** Bünde, die je Saite in Frage kommen: alle der ersten fünf (und gedämpft) – bei vielen Saiten nur die hörbaren. */
function candidates(ps: P[]): number[][] {
  const all = STRINGS.map((_, i) => {
    const values = [MUTED];
    for (let f = 0; f <= MAX_FRET; f++) if (playableFret(i, f)) values.push(f);
    return values;
  });
  const count = all.reduce((n, v) => n * v.length, 1);
  if (count <= FULL_SEARCH) return all;
  return all.map((values, i) =>
    values.filter((f) => {
      if (f === MUTED) return true;
      const m = stringMidi(i, f);
      return ps.some((p) => p.mag >= 0.05 && Math.abs(p.midi - m) < TOL);
    }),
  );
}

/** Bester Griff für die Spitzen; null bei zu wenig Signal. */
export function identifyFingering(peaks: Peak[]): Fingering | null {
  if (peaks.length < 1) return null;
  const prep = prepare(peaks);
  const harmonics = instrument().id === 'ukulele' ? HARMONICS : harmonicsFor(instrument().detect.harmonics);
  const lib = library();
  const values = candidates(prep.ps);
  const n = values.length;
  let best: Fingering | null = null;
  const frets: number[] = [];
  const visit = (s: number) => {
    if (s < n) {
      for (const f of values[s]) {
        frets[s] = f;
        visit(s + 1);
      }
      return;
    }
    const midis: number[] = [];
    let fretSum = 0;
    let fretted = 0;
    let muted = 0;
    frets.forEach((f, i) => {
      if (f === MUTED) muted++;
      else {
        midis.push(stringMidi(i, f));
        fretSum += f;
        if (f > 0) fretted++;
      }
    });
    if (!midis.length) return;
    let score = scoreMidis(prep.ps, midis, harmonics);
    // Bei gleichem Klang gewinnt der einfachere Griff: wenig Bünde, keine gedämpften Saiten, bekannte Griffe
    score -= fretSum * PREFER.perFret + fretted * PREFER.perFinger + muted * PREFER.perMuted;
    if (lib.has(frets.join(','))) score += PREFER.library;
    if (!best || score > best.score) best = { frets: frets.slice(), score, midis };
  };
  visit(0);
  return best;
}

/** Klingt nur ein einzelner Ton? Dann seine MIDI-Nummer (alle Spitzen sind Obertöne von ihm), sonst null. */
export function singleNote(peaks: Peak[]): number | null {
  const prep = prepare(peaks);
  const strong = prep.ps.filter((p) => p.mag >= 0.2).sort((x, y) => x.midi - y.midi);
  if (!strong.length) return null;
  const root = strong[0];
  const all = strong.every((p) => HARMONICS.concat([24, 27.86]).some((h) => Math.abs(p.midi - (root.midi + h)) < TOL));
  return all ? Math.round(root.midi) : null;
}

// ---------- Akkordnamen ----------

export interface Quality {
  suffix: string;
  name: string;
  intervals: number[];
}

/** Nach Häufigkeit sortiert: bei mehreren passenden Namen steht der gebräuchlichste vorn. */
export const QUALITIES: Quality[] = [
  { suffix: '', name: tk('Dur'), intervals: [0, 4, 7] },
  { suffix: 'm', name: tk('Moll'), intervals: [0, 3, 7] },
  { suffix: '7', name: tk('Sept (Dominantsept)'), intervals: [0, 4, 7, 10] },
  { suffix: 'm7', name: tk('Moll-Sept'), intervals: [0, 3, 7, 10] },
  { suffix: 'maj7', name: tk('Major-Sept (große Septime)'), intervals: [0, 4, 7, 11] },
  { suffix: '6', name: tk('Sext'), intervals: [0, 4, 7, 9] },
  { suffix: 'm6', name: tk('Moll-Sext'), intervals: [0, 3, 7, 9] },
  { suffix: 'sus4', name: tk('sus4 (Quarte statt Terz)'), intervals: [0, 5, 7] },
  { suffix: 'sus2', name: tk('sus2 (Sekunde statt Terz)'), intervals: [0, 2, 7] },
  { suffix: '7sus4', name: tk('Sept mit Quarte'), intervals: [0, 5, 7, 10] },
  { suffix: 'add9', name: tk('Dur mit None'), intervals: [0, 2, 4, 7] },
  { suffix: 'dim', name: tk('vermindert'), intervals: [0, 3, 6] },
  { suffix: 'dim7', name: tk('vermindert-Sept'), intervals: [0, 3, 6, 9] },
  { suffix: 'm7b5', name: tk('halbvermindert'), intervals: [0, 3, 6, 10] },
  { suffix: 'aug', name: tk('übermäßig'), intervals: [0, 4, 8] },
  { suffix: 'mmaj7', name: tk('Moll mit großer Septime'), intervals: [0, 3, 7, 11] },
  { suffix: '7', name: tk('Sept (ohne Quinte)'), intervals: [0, 4, 10] },
  { suffix: 'm7', name: tk('Moll-Sept (ohne Quinte)'), intervals: [0, 3, 10] },
  { suffix: 'maj7', name: tk('Major-Sept (ohne Quinte)'), intervals: [0, 4, 11] },
  { suffix: '5', name: tk('Quinte (Powerchord)'), intervals: [0, 7] },
];

export interface ChordName {
  name: string;
  root: string;
  quality: Quality;
}

/** Alle Namen, die genau diese Tonklassen ergeben – der gebräuchlichste zuerst. */
export function nameChord(pitchClasses: number[]): ChordName[] {
  const set = Array.from(new Set(pitchClasses.map((p) => ((p % 12) + 12) % 12))).sort((a, b) => a - b);
  const out: ChordName[] = [];
  QUALITIES.forEach((q) => {
    if (q.intervals.length !== set.length) return;
    for (const root of set) {
      const rel = set.map((p) => (p - root + 12) % 12).sort((a, b) => a - b);
      if (rel.every((v, i) => v === q.intervals[i])) out.push({ name: NOTE_NAMES[root] + q.suffix, root: NOTE_NAMES[root], quality: q });
    }
  });
  return out;
}

/** Name des bekannten Bibliotheksgriffs, falls die Bünde genau passen. */
export function libraryName(frets: number[]): string | null {
  return library().get(frets.join(',')) || null;
}

/** Alle Stellen (Saite, Bund bis 12) für einen Ton auf dem aktuellen Instrument. */
export function positions(midi: number): { string: number; fret: number }[] {
  return STRINGS.map((s, i) => ({ string: i, fret: midi - s.midi })).filter((p) => p.fret >= 0 && p.fret <= 12 && playableFret(p.string, p.fret));
}

export function noteLabel(midi: number): string {
  return `${NOTE_NAMES[pitchClass(midi)]}${Math.floor(midi / 12) - 1}`;
}
