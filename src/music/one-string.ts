import type { Song } from './song.ts';
import { STRINGS } from './notes.ts';

export interface OneStringNote {
  syllable: string;
  /** Bund auf der gewählten Saite (0 = leer). */
  fret: number;
  joinNext: boolean;
  /** Melisma: dieselbe Silbe auf einem neuen Ton. */
  hold: boolean;
}

export interface OneStringTab {
  /** Index in STRINGS. */
  string: number;
  /** Halbtöne, um die die Melodie verschoben ist (ohne Oktaven). */
  shift: number;
  /** Höchster Bund, der vorkommt. */
  maxFret: number;
  lines: OneStringNote[][];
}

/**
 * Die ganze Melodie auf einer einzigen Saite, so tief am Hals wie möglich: Für Kinder ist das der allererste Schritt –
 * nur Bundzahlen, kein Saitenwechsel. Verschoben wird nur, wenn es in der Liedtonart nicht in die ersten Bünde passt.
 */
export function oneStringTab(song: Song, limit = 7): OneStringTab | null {
  const notes = song.events.filter((e) => e.midi !== null);
  if (!notes.length) return null;
  const midis = notes.map((e) => e.midi as number);
  const low = Math.min.apply(null, midis);
  const high = Math.max.apply(null, midis);
  if (high - low > limit) return null;
  let best: { string: number; shift: number; offset: number; maxFret: number; score: number } | null = null;
  STRINGS.forEach((s, i) => {
    // die kurze Banjo-Saite klingt nur leer
    if (s.start) return;
    for (let shift = -6; shift <= 5; shift++) {
      // tiefster Ton so nah wie möglich an der leeren Saite (beliebige Oktave)
      const offset = s.midi + ((((low + shift - s.midi) % 12) + 12) % 12) - low;
      const maxFret = high + offset - s.midi;
      if (maxFret > limit) continue;
      const score = maxFret + 1.5 * Math.abs(shift) + 0.01 * i;
      if (!best || score < best.score) best = { string: i, shift, offset, maxFret, score };
    }
  });
  if (!best) return null;
  const b = best as { string: number; shift: number; offset: number; maxFret: number };
  const lines: OneStringNote[][] = [];
  for (const e of notes) {
    if (!lines[e.line]) lines[e.line] = [];
    lines[e.line].push({ syllable: e.syllable, fret: (e.midi as number) + b.offset - STRINGS[b.string].midi, joinNext: e.joinNext, hold: e.hold });
  }
  return { string: b.string, shift: b.shift, maxFret: b.maxFret, lines: lines.filter((l) => l && l.length) };
}
