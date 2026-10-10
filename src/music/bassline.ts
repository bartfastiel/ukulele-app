import { eventAt, type Song } from './song.ts';
import { chord } from './chords.ts';
import { stringMidi } from './notes.ts';

/** Basslinie im Lied: nur Grundtöne (auf der Eins und bei jedem Wechsel) oder Grundton und Quinte im Wechsel. */
export type BassPattern = 'root' | 'fifth';

export interface BassNote {
  /** Schlag ab Liedanfang. */
  beat: number;
  midi: number;
  string: number;
  fret: number;
  /** Quinte statt Grundton. */
  fifth: boolean;
  chord: string;
}

/**
 * Wo im Takt die Quinte kommt: im 4/4-Takt auf der 3, im 2/4-Takt auf der 2, im 6/8-Takt auf dem zweiten Hauptschlag.
 * Im 3/4-Takt bleibt es beim Grundton auf der Eins – wie beim Walzer.
 */
const FIFTH_AT: Record<number, number> = { 4: 2, 2: 1, 6: 3 };

/** Schlag im Takt (0 = die Eins); ein Auftakt verschiebt die Takte wie im Player. */
export function barPosition(song: Song, beat: number): number {
  const m = song.meter;
  return (((beat - (song.pickup ? song.pickup - m : 0)) % m) + m) % m;
}

/** Grundton bzw. Quinte des Akkords auf dem Hals (Griff aus chords.ts: erste Lage, Quinte eine Saite höher). */
export function bassPosition(name: string, fifth: boolean): { string: number; fret: number; midi: number } {
  const ch = chord(name);
  const at = fifth && ch.fifth ? ch.fifth : null;
  if (at) return { string: at.string, fret: at.fret, midi: stringMidi(at.string, at.fret) };
  const s = ch.frets.findIndex((f) => f >= 0);
  return { string: s, fret: ch.frets[s], midi: stringMidi(s, ch.frets[s]) };
}

/**
 * Basstöne eines Liedes: der Grundton bei jedem Akkordwechsel (auch mitten im Takt) und auf jeder Eins; mit „fifth“
 * zusätzlich die Quinte zur Taktmitte, wenn der Akkord dort noch klingt.
 */
export function bassLine(song: Song, pattern: BassPattern): BassNote[] {
  const out: BassNote[] = [];
  const add = (beat: number, name: string, fifth: boolean) => {
    const p = bassPosition(name, fifth);
    out.push({ beat, midi: p.midi, string: p.string, fret: p.fret, fifth, chord: name });
  };
  const starts: number[] = [];
  song.events.forEach((e, i) => {
    if (i === 0 || e.chordChange) starts.push(e.beat);
  });
  const isStart = (b: number) => starts.some((s) => Math.abs(s - b) < 1e-6);
  let next = 0;
  for (let b = 0; b < song.totalBeats; b++) {
    // Wechsel zwischen zwei ganzen Schlägen (oder genau auf diesem)
    while (next < starts.length && starts[next] < b + 1 - 1e-6) {
      if (starts[next] >= b - 1e-6) add(starts[next], song.events[eventAt(song, starts[next] + 1e-6)].chord, false);
      next++;
    }
    if (isStart(b)) continue;
    const name = song.events[eventAt(song, b + 1e-6)].chord;
    const pos = barPosition(song, b);
    if (pos === 0) add(b, name, false);
    else if (pattern === 'fifth' && pos === FIFTH_AT[song.meter] && !starts.some((s) => s > b - FIFTH_AT[song.meter] + 1e-6 && s < b)) add(b, name, true);
  }
  return out.sort((a, b) => a.beat - b.beat);
}
