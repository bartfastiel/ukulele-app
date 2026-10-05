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

/** Leersaiten der Ukulele in Standardstimmung mit hohem G, in Spielreihenfolge von oben (G) nach unten (A). */
export const STRINGS = [
  { name: 'G', midi: 67 },
  { name: 'C', midi: 60 },
  { name: 'E', midi: 64 },
  { name: 'A', midi: 69 },
] as const;

/** Wo spielt man einen Melodieton am einfachsten? Niedrigster Bund gewinnt, bei Gleichstand die tiefere Saite. */
export function tabPosition(midi: number): { string: number; fret: number } | null {
  let best: { string: number; fret: number } | null = null;
  STRINGS.forEach((s, i) => {
    const fret = midi - s.midi;
    if (fret < 0 || fret > 15) return;
    if (!best || fret < best.fret) best = { string: i, fret };
  });
  return best;
}
