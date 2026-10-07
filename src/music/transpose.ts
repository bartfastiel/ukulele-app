import { ROOTS, chord, chordCost, parseChordName } from './chords.ts';
import { instrument } from './instrument.ts';
import { tabPosition } from './notes.ts';
import type { Song } from './song.ts';

const SING_LOW = 60;
const SING_HIGH = 74;

/** Akkordname um `shift` Halbtöne verschieben (Schreibweise: C C# D Eb E F F# G Ab A Bb B). */
export function transposeName(name: string, shift: number): string {
  const p = parseChordName(name);
  if (!p) return name;
  return ROOTS[(((p.root + shift) % 12) + 12) % 12] + p.quality;
}

/** Melodie-Verschiebung in Halbtönen: Tonart plus die Oktave, in der die Melodie am besten singbar und greifbar ist. */
export function melodyShift(song: Song, shift: number): number {
  const midis = song.events.flatMap((e) => (e.midi === null ? [] : [e.midi]));
  if (!midis.length) return shift;
  let best = shift;
  let bestPenalty = Infinity;
  for (const k of [0, -12, 12]) {
    const p = vocalPenalty(Math.min(...midis) + shift + k, Math.max(...midis) + shift + k);
    if (p < bestPenalty - 1e-9) {
      bestPenalty = p;
      best = shift + k;
    }
  }
  return best;
}

function vocalPenalty(lo: number, hi: number): number {
  // Kinderstimme etwa C4–D5; tiefer als der tiefste Ton des Instruments (Ukulele mit hohem G: C4) lässt sich die
  // Melodie nicht mehr greifen – die Gitarre spielt sie eine Oktave tiefer
  const m = instrument().melody;
  return 0.8 * Math.max(0, SING_LOW - lo) + 0.8 * Math.max(0, hi - SING_HIGH) + 1.5 * Math.max(0, m.low - (lo + m.offset));
}

/**
 * Wie viele Halbtöne die Melodie auf dem Instrument gegen die gesungene Lage verschoben klingt und gegriffen wird:
 * Gitarre eine Oktave tiefer, Banjo je Lied die Oktave, die tiefer am Hals liegt.
 */
export function melodyOffset(song: Song): number {
  const m = instrument().melody;
  const midis = song.events.flatMap((e) => (e.midi === null ? [] : [e.midi]));
  if (!m.flexible || !midis.length) return m.offset;
  let best = m.offset;
  let bestCost = Infinity;
  for (const o of [m.offset, m.offset - 12]) {
    let cost = 0;
    for (const x of midis) {
      const p = tabPosition(x + o);
      cost += p ? Math.max(0, p.fret - 5) : 1000;
    }
    if (cost < bestCost) {
      bestCost = cost;
      best = o;
    }
  }
  return best;
}

export function transposeSong(song: Song, shift: number): Song {
  if (!shift) return song;
  const ms = melodyShift(song, shift);
  const events = song.events.map((e) => ({
    ...e,
    chord: transposeName(e.chord, shift),
    midi: e.midi === null ? null : e.midi + ms,
  }));
  return { ...song, events, chords: song.chords.map((c) => transposeName(c, shift)) };
}

/** Tonart eines Liedes: der Schlussakkord ist (fast) immer die Tonika. */
export function songKey(song: Song): { root: number; minor: boolean } {
  const last = parseChordName(song.events[song.events.length - 1].chord);
  if (!last) return { root: 0, minor: false };
  return { root: last.root, minor: last.quality === 'm' || last.quality === 'm7' };
}

export function keyLabel(root: number, minor: boolean): string {
  return ROOTS[((root % 12) + 12) % 12] + (minor ? 'm' : '');
}

/** Kürzester Weg (−6 … +5 Halbtöne) von einer Tonart zur anderen. */
export function shiftBetween(from: number, to: number): number {
  const d = (((to - from) % 12) + 12) % 12;
  return d > 5 ? d - 12 : d;
}

/** Verschiebung zur Original- bzw. Quellentonart, falls bekannt. */
export function originalShift(song: Song): number | null {
  if (!song.originalKey) return null;
  const p = parseChordName(song.originalKey);
  if (!p) return null;
  return shiftBetween(songKey(song).root, p.root);
}

const COMMON_KEYS = [0, 2, 5, 7];

export interface KeyRating {
  shift: number;
  play: number;
  total: number;
}

/** Spielbarkeit der Griffe eines Liedes: schwerster Griff zählt voll, der Durchschnitt etwas. */
function playCost(chords: string[], shift: number): number {
  const costs = chords.map((c) => chordCost(chord(transposeName(c, shift))));
  return Math.max(...costs) + (0.3 * costs.reduce((a, b) => a + b, 0)) / costs.length;
}

/**
 * Kapodaster (Gitarre): Klingt das Lied in dieser Tonart nur mit schweren Griffen, aber mit Kapo im Bund `capo` und
 * den Griffen einer leichten Tonart? Dann z. B. { capo: 2, shapes: 'G' } – „Kapo 2, greif wie G“.
 */
export function capoHint(song: Song, shift: number): { capo: number; shapes: string } | null {
  if (!instrument().capo) return null;
  const own = playCost(song.chords, shift);
  let best: { capo: number; shapes: string } | null = null;
  // nur, wenn es deutlich leichter wird – ein kleiner Gewinn ist den Kapodaster nicht wert
  let bestCost = own - 3;
  for (let capo = 1; capo <= 7; capo++) {
    const cost = playCost(song.chords, shift - capo) + capo * 0.3;
    if (cost < bestCost) {
      bestCost = cost;
      const k = songKey(song);
      best = { capo, shapes: keyLabel(k.root + shift - capo, k.minor) };
    }
  }
  return best;
}

/**
 * Bester Kompromiss aus Spielbarkeit (Griffe), Wiedererkennung (Nähe zur Original-/Quellentonart) und Stimmlage
 * (Kinderstimme etwa C4–D5, nur bei Liedern mit Melodie; die Melodie muss außerdem auf dem Instrument liegen).
 */
export function rateKeys(song: Song): KeyRating[] {
  const orig = originalShift(song);
  const base = songKey(song).root;
  const midis = song.events.flatMap((e) => (e.midi === null ? [] : [e.midi]));
  const out: KeyRating[] = [];
  for (let shift = -6; shift <= 5; shift++) {
    const play = playCost(song.chords, shift);
    let total = play;
    if (orig !== null) total += 0.6 * Math.abs(shiftBetween(orig, shift));
    if (midis.length) {
      const ms = melodyShift(song, shift);
      total += vocalPenalty(Math.min(...midis) + ms, Math.max(...midis) + ms);
    }
    if (COMMON_KEYS.indexOf((((base + shift) % 12) + 12) % 12) < 0) total += 0.5;
    out.push({ shift, play, total });
  }
  return out;
}

export function suggestShift(song: Song): number {
  return rateKeys(song).reduce((best, r) => (r.total < best.total - 1e-9 || (Math.abs(r.total - best.total) < 1e-9 && r.shift === 0) ? r : best)).shift;
}
