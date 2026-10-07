import { instrument, onInstrumentChange, type InstrumentString } from './instrument.ts';

export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'] as const;

const LETTER: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

/** "C4", "F#4", "Bb3" → MIDI-Nummer (C4 = 60). */
export function parsePitch(text: string): number {
  const m = /^([A-G])(#|b)?(-?\d)$/.exec(text);
  if (!m) throw new Error(`Unbekannte Tonhöhe: ${text}`);
  const accidental = m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0;
  return (Number(m[3]) + 1) * 12 + LETTER[m[1]] + accidental;
}

export function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export function freqToMidi(freq: number): number {
  return 69 + 12 * Math.log2(freq / 440);
}

export function pitchClass(midi: number): number {
  return ((Math.round(midi) % 12) + 12) % 12;
}

export function noteName(midi: number): string {
  return NOTE_NAMES[pitchClass(midi)];
}

/** Leersaiten des aktuellen Instruments in Spielreihenfolge von oben nach unten (Ukulele G C E A). */
export let STRINGS: InstrumentString[] = instrument().strings;
onInstrumentChange(() => (STRINGS = instrument().strings));

/** Ton der Saite `string` im Bund `fret`; die kurze Banjo-Saite zählt ihre Bünde ab ihrem Wirbel. */
export function stringMidi(string: number, fret: number): number {
  const s = STRINGS[string];
  return fret <= 0 ? s.midi : s.midi + fret - (s.start || 0);
}

/** Bünde, auf denen eine Saite gegriffen werden kann (die kurze Banjo-Saite nur leer). */
export function playableFret(string: number, fret: number): boolean {
  return fret === 0 || (fret > 0 && !STRINGS[string].start);
}

/** Wo spielt man einen Melodieton am einfachsten? Niedrigster Bund gewinnt, bei Gleichstand die obere Saite. */
export function tabPosition(midi: number): { string: number; fret: number } | null {
  let best: { string: number; fret: number } | null = null;
  STRINGS.forEach((s, i) => {
    const fret = midi - s.midi;
    if (fret < 0 || fret > instrument().frets || !playableFret(i, fret)) return;
    if (!best || fret < best.fret) best = { string: i, fret };
  });
  return best;
}
