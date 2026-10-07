import { STRINGS, pitchClass } from './notes.ts';
import { ordinal, t, tk } from '../i18n.ts';

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
  c('C', '0003', '0003', tk('C-Dur'), 1),
  c('Am', '2000', '2000', tk('a-Moll'), 1),
  c('C7', '0001', '0001', tk('C-Sieben'), 1),
  c('A7', '0100', '0100', tk('A-Sieben'), 1),
  c('Am7', '0000', '0000', tk('a-Moll-Sieben (alle Saiten leer)'), 1),
  c('F', '2010', '2010', tk('F-Dur'), 2),
  c('G7', '0212', '0213', tk('G-Sieben'), 2),
  c('Cmaj7', '0002', '0002', tk('C-Major-Sieben'), 2),
  c('G', '0232', '0132', tk('G-Dur'), 3),
  c('Dm', '2210', '2310', tk('d-Moll'), 3),
  c('A', '2100', '2100', tk('A-Dur'), 3),
  c('Em', '0432', '0321', tk('e-Moll'), 3),
  c('D7', '2223', '1112', tk('D-Sieben'), 3),
  c('Gm', '0231', '0231', tk('g-Moll'), 3),
  c('D', '2220', '1230', tk('D-Dur'), 4),
  c('E7', '1202', '1203', tk('E-Sieben'), 4),
  c('B7', '2322', '1211', tk('H-Sieben (international B7)'), 4),
  c('Bb', '3211', '3211', tk('B-Dur (international Bb)'), 4),
];

const BY_NAME = new Map(CHORDS.map((ch) => [ch.name, ch]));

/** Akkord nach Namen – aus der Bibliothek oder, für jede Tonart beim Transponieren, aus Tabelle bzw. Grifffinder. */
export function chord(name: string): Chord {
  const ch = BY_NAME.get(name);
  if (ch) return ch;
  const made = makeChord(name);
  if (!made) throw new Error(`Unbekannter Akkord: ${name}`);
  BY_NAME.set(name, made);
  return made;
}

// ---------- Akkorde in jeder Tonart ----------

export const ROOTS = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const ROOT_ALIAS: Record<string, string> = { Db: 'C#', 'D#': 'Eb', Gb: 'F#', 'G#': 'Ab', 'A#': 'Bb', H: 'B' };

export const QUALITY_INTERVALS: Record<string, number[]> = {
  '': [0, 4, 7],
  m: [0, 3, 7],
  '7': [0, 4, 7, 10],
  m7: [0, 3, 7, 10],
  maj7: [0, 4, 7, 11],
  '6': [0, 4, 7, 9],
  m6: [0, 3, 7, 9],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7],
  '7sus4': [0, 5, 7, 10],
  add9: [0, 2, 4, 7],
  dim: [0, 3, 6],
  dim7: [0, 3, 6, 9],
  m7b5: [0, 3, 6, 10],
  aug: [0, 4, 8],
};

/** Übliche Ukulele-Griffe (G C E A) für Dur, Moll und Sept in allen zwölf Tonarten. */
const SHAPES: Record<string, string[]> = {
  '': ['0003', '1114', '2220', '0331', '4442', '2010', '3121', '0232', '5343', '2100', '3211', '4322'],
  m: ['0333', '1104', '2210', '3321', '0432', '1013', '2120', '0231', '4342', '2000', '3111', '4222'],
  '7': ['0001', '1112', '2223', '3334', '1202', '2310', '3424', '0212', '1323', '0100', '1211', '2322'],
};

export function parseChordName(name: string): { root: number; quality: string } | null {
  const m = /^([A-G])(#|b)?(.*)$/.exec(name);
  if (!m) return null;
  const rootName = ROOT_ALIAS[m[1] + (m[2] || '')] || m[1] + (m[2] || '');
  const root = ROOTS.indexOf(rootName);
  if (root < 0 || !QUALITY_INTERVALS[m[3]]) return null;
  return { root, quality: m[3] };
}

/** Finger nach Bund verteilen; liegen drei oder mehr Saiten im tiefsten Bund, greift der Zeigefinger quer (Barré). */
function assignFingers(frets: number[]): Chord['fingers'] {
  const fingers = [0, 0, 0, 0];
  const pressed = frets.map((f, i) => ({ f, i })).filter((x) => x.f > 0);
  if (!pressed.length) return fingers as Chord['fingers'];
  const min = Math.min(...pressed.map((x) => x.f));
  const atMin = pressed.filter((x) => x.f === min);
  let next = 1;
  if (atMin.length >= 3) {
    atMin.forEach((x) => (fingers[x.i] = 1));
    next = 2;
  }
  pressed
    .filter((x) => !(atMin.length >= 3 && x.f === min))
    .sort((a, b) => a.f - b.f || a.i - b.i)
    .forEach((x) => (fingers[x.i] = Math.min(4, next++)));
  return fingers as Chord['fingers'];
}

/** Griff suchen: alle Akkordtöne (bei Vierklängen darf die Quinte fehlen), möglichst wenige Finger, kleine Spanne. */
function findShape(root: number, intervals: number[]): number[] | null {
  const pcs = intervals.map((i) => (root + i) % 12);
  const required = intervals.length === 4 ? pcs.filter((_, k) => intervals[k] !== 7) : pcs;
  let best: number[] | null = null;
  let bestCost = Infinity;
  for (let a = 0; a <= 7; a++)
    for (let b = 0; b <= 7; b++)
      for (let c = 0; c <= 7; c++)
        for (let d = 0; d <= 7; d++) {
          const frets = [a, b, c, d];
          const notes = frets.map((f, i) => (STRINGS[i].midi + f) % 12);
          if (!notes.every((n) => pcs.indexOf(n) >= 0)) continue;
          if (!required.every((p) => notes.indexOf(p) >= 0)) continue;
          const pressed = frets.filter((f) => f > 0);
          const span = pressed.length ? Math.max(...pressed) - Math.min(...pressed) : 0;
          if (span > 3) continue;
          const cost = pressed.length + span * 1.5 + Math.max(0, Math.max(0, ...frets) - 3) * 0.8;
          if (cost < bestCost) {
            bestCost = cost;
            best = frets;
          }
        }
  return best;
}

function makeChord(name: string): Chord | null {
  const p = parseChordName(name);
  if (!p) return null;
  const table = SHAPES[p.quality];
  const frets = table ? table[p.root].split('').map(Number) : findShape(p.root, QUALITY_INTERVALS[p.quality]);
  if (!frets) return null;
  return { name, frets: frets as Chord['frets'], fingers: assignFingers(frets), say: name, level: 5 };
}

/** Wie schwer ist ein Griff? Finger, Spanne, hohe Bünde und Barré kosten. */
export function chordCost(ch: Chord): number {
  const pressed = ch.frets.filter((f) => f > 0);
  if (!pressed.length) return 0;
  const span = Math.max(...pressed) - Math.min(...pressed);
  const barre = ch.fingers.filter((f) => f === 1).length >= 3 ? 1.5 : 0;
  return pressed.length + span + Math.max(0, Math.max(...pressed) - 3) * 1.2 + barre;
}

export function chordMidis(ch: Chord): number[] {
  return ch.frets.map((f, i) => STRINGS[i].midi + f);
}

export function chordPitchClasses(ch: Chord): Set<number> {
  return new Set(chordMidis(ch).map(pitchClass));
}

const FINGER_NAME = ['', tk('Zeigefinger'), tk('Mittelfinger'), tk('Ringfinger'), tk('kleiner Finger')];

export function describeChord(ch: Chord): string {
  const parts: string[] = [];
  ch.frets.forEach((f, i) => {
    if (f > 0)
      parts.push(
        t('{finger} auf der {string}-Saite im {fret} Bund', { finger: t(FINGER_NAME[ch.fingers[i]] || tk('Finger')), string: STRINGS[i].name, fret: ordinal(f) }),
      );
  });
  return `${ch.name}: ${parts.length ? parts.join(', ') : t('alle Saiten leer')}`;
}

/** Ausgesprochener Name („C-Dur“); transponierte Griffe ohne eigenen Text zeigen ihr Symbol. */
export function chordSay(ch: Chord): string {
  return t(ch.say);
}
