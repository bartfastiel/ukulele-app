import { STRINGS, pitchClass } from './notes.ts';

export interface Chord {
  name: string;
  /** Bund je Saite G, C, E, A; 0 = leer. */
  frets: [number, number, number, number];
  /** Finger je Saite (1 Zeige-, 2 Mittel-, 3 Ring-, 4 kleiner Finger), 0 = keiner. */
  fingers: [number, number, number, number];
  /** Kindgerechte Aussprache/Beschreibung. */
  say: string;
  level: number;
}

const c = (name: string, frets: string, fingers: string, say: string, level: number): Chord => ({
  name,
  frets: frets.split('').map(Number) as Chord['frets'],
  fingers: fingers.split('').map(Number) as Chord['fingers'],
  say,
  level,
});

export const CHORDS: Chord[] = [
  c('C', '0003', '0003', 'C-Dur', 1),
  c('Am', '2000', '2000', 'a-Moll', 1),
  c('C7', '0001', '0001', 'C-Sieben', 1),
  c('A7', '0100', '0100', 'A-Sieben', 1),
  c('Am7', '0000', '0000', 'a-Moll-Sieben (alle Saiten leer)', 1),
  c('F', '2010', '2010', 'F-Dur', 2),
  c('G7', '0212', '0213', 'G-Sieben', 2),
  c('Cmaj7', '0002', '0002', 'C-Major-Sieben', 2),
  c('G', '0232', '0132', 'G-Dur', 3),
  c('Dm', '2210', '2310', 'd-Moll', 3),
  c('A', '2100', '2100', 'A-Dur', 3),
  c('Em', '0432', '0321', 'e-Moll', 3),
  c('D7', '2223', '1112', 'D-Sieben', 3),
  c('Gm', '0231', '0231', 'g-Moll', 3),
  c('D', '2220', '1230', 'D-Dur', 4),
  c('E7', '1202', '1203', 'E-Sieben', 4),
  c('B7', '2322', '1211', 'H-Sieben (international B7)', 4),
  c('Bb', '3211', '3211', 'B-Dur (international Bb)', 4),
];

const BY_NAME = new Map(CHORDS.map((ch) => [ch.name, ch]));

export function chord(name: string): Chord {
  const ch = BY_NAME.get(name);
  if (!ch) throw new Error(`Unbekannter Akkord: ${name}`);
  return ch;
}

export function chordMidis(ch: Chord): number[] {
  return ch.frets.map((f, i) => STRINGS[i].midi + f);
}

export function chordPitchClasses(ch: Chord): Set<number> {
  return new Set(chordMidis(ch).map(pitchClass));
}

export function describeChord(ch: Chord): string {
  const parts: string[] = [];
  const fingerName = ['', 'Zeigefinger', 'Mittelfinger', 'Ringfinger', 'kleiner Finger'];
  ch.frets.forEach((f, i) => {
    if (f > 0) parts.push(`${fingerName[ch.fingers[i]]} auf der ${STRINGS[i].name}-Saite im ${f}. Bund`);
  });
  return `${ch.name}: ${parts.length ? parts.join(', ') : 'alle Saiten leer'}`;
}
