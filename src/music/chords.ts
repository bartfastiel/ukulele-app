import { STRINGS, pitchClass, playableFret, stringMidi } from './notes.ts';
import { baseInstrument, instrument, onInstrumentChange, type Instrument } from './instrument.ts';
import { findBarre, parseGrip, type Chord } from './grip.ts';
import { ordinal, t, tk } from '../i18n.ts';

export type { Chord };

/** Griff-Bibliothek des aktuellen Instruments. */
export let CHORDS: Chord[] = instrument().chords;

let byName = new Map(CHORDS.map((ch) => [ch.name, ch]));

onInstrumentChange(() => {
  byName = new Map();
  CHORDS = library(instrument());
  byName = new Map(CHORDS.map((ch) => [ch.name, ch]));
});

/** In einer anderen Stimmung behält die Bibliothek Namen, Aussprache und Stufe; die Griffe werden neu berechnet. */
function library(inst: Instrument): Chord[] {
  if (!inst.tuning) return inst.chords;
  const out: Chord[] = [];
  for (const ch of inst.chords) {
    const made = makeChord(ch.name);
    if (made) out.push({ ...made, say: ch.say, level: ch.level });
  }
  return out;
}

/**
 * Sind alle Saiten um gleich viele Halbtöne verstimmt (D-Stimmung der Ukulele, tiefes G), bleiben die Griffe gleich und
 * nur die Namen wandern mit: die Zahl der Halbtöne, sonst null.
 */
function sameShapes(): number | null {
  const tuning = instrument().tuning;
  if (!tuning) return null;
  const from = baseInstrument().strings;
  const k = pitchClass(tuning.midi[0] - from[0].midi);
  return tuning.midi.every((m, i) => pitchClass(m - from[i].midi) === k) ? k : null;
}

/** Akkord nach Namen – aus der Bibliothek oder, für jede Tonart beim Transponieren, aus Tabelle bzw. Grifffinder. */
export function chord(name: string): Chord {
  const ch = byName.get(name);
  if (ch) return ch;
  const made = makeChord(name);
  if (!made) throw new Error(`Unbekannter Akkord: ${name}`);
  byName.set(name, made);
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

export function parseChordName(name: string): { root: number; quality: string } | null {
  const m = /^([A-G])(#|b)?(.*)$/.exec(name);
  if (!m) return null;
  const rootName = ROOT_ALIAS[m[1] + (m[2] || '')] || m[1] + (m[2] || '');
  const root = ROOTS.indexOf(rootName);
  if (root < 0 || !QUALITY_INTERVALS[m[3]]) return null;
  return { root, quality: m[3] };
}

interface Fingering {
  fingers: number[];
  barre: boolean;
}

/** Griff ohne Namen; moved: ein gewohnter Griff, der für die neue Stimmung verschoben wurde. */
interface Entry {
  frets: number[];
  fingers?: number[];
  barre?: boolean;
  moved?: boolean;
}

/**
 * Finger nach Bund verteilen; liegen drei oder mehr Saiten im tiefsten Bund (ohne leere Saite dazwischen) oder
 * braucht der Griff sonst mehr als vier Finger, greift der Zeigefinger quer (Barré). null = nicht greifbar.
 */
function assignFingers(frets: number[]): Fingering | null {
  const fingers = frets.map(() => 0);
  const pressed = frets.map((f, i) => ({ f, i })).filter((x) => x.f > 0);
  if (!pressed.length) return { fingers, barre: false };
  const min = Math.min(...pressed.map((x) => x.f));
  const atMin = pressed.filter((x) => x.f === min);
  const first = atMin[0].i;
  const last = atMin[atMin.length - 1].i;
  let canBarre = atMin.length >= 2;
  for (let i = first; i <= last; i++) if (frets[i] === 0) canBarre = false;
  const barre = canBarre && (atMin.length >= 3 || pressed.length > 4);
  let next = 1;
  if (barre) {
    atMin.forEach((x) => (fingers[x.i] = 1));
    next = 2;
  }
  const rest = pressed.filter((x) => !(barre && x.f === min)).sort((a, b) => a.f - b.f || a.i - b.i);
  if (next + rest.length - 1 > 4 && frets.length > 4) return null;
  rest.forEach((x) => (fingers[x.i] = Math.min(4, next++)));
  return { fingers, barre };
}

/**
 * Griff suchen: nur Akkordtöne, alle nötigen dabei (bei Vierklängen darf die Quinte fehlen), möglichst wenige Finger,
 * kleine Spanne, tiefe Bünde. Weglassen darf man nur Bass-Saiten (Gitarre) bzw. die kurze Banjo-Saite.
 */
/** Töne, die ein Griff enthalten muss: bei Vierklängen darf die Quinte fehlen. */
function requiredTones(intervals: number[], root: number): number[] {
  return intervals.filter((i) => intervals.length < 4 || i !== 7).map((i) => (root + i) % 12);
}

function findShape(root: number, intervals: number[]): number[] | null {
  const inst = instrument();
  const set = inst.finder;
  const n = STRINGS.length;
  const pcs = intervals.map((i) => (root + i) % 12);
  const required = requiredTones(intervals, root);
  const options: number[][] = STRINGS.map((s, i) => {
    const out: number[] = [];
    if (s.start) {
      // die kurze Banjo-Saite klingt leer mit, wenn ihr Ton passt – sonst bleibt sie still
      out.push(pcs.indexOf(pitchClass(s.midi)) >= 0 ? 0 : -1);
      return out;
    }
    if (i < set.mutable) out.push(-1);
    for (let f = 0; f <= set.maxFret; f++) if (pcs.indexOf(pitchClass(stringMidi(i, f))) >= 0) out.push(f);
    return out;
  });
  let best: number[] | null = null;
  let bestCost = Infinity;
  const frets: number[] = [];
  const visit = (i: number) => {
    if (i === n) {
      const cost = shapeCost(frets, root, required);
      if (cost < bestCost) {
        bestCost = cost;
        best = frets.slice();
      }
      return;
    }
    for (const f of options[i]) {
      // weggelassen nur zusammenhängend von der Bass-Saite her
      if (f < 0 && i > 0 && frets[i - 1] >= 0 && !STRINGS[i].start) continue;
      frets[i] = f;
      visit(i + 1);
    }
  };
  visit(0);
  return best;
}

function spread(frets: number[]): number {
  const pressed = frets.filter((f) => f > 0);
  return pressed.length ? Math.max.apply(null, pressed) - Math.min.apply(null, pressed) : 0;
}

function shapeCost(frets: number[], root: number, required: number[]): number {
  const set = instrument().finder;
  const notes: number[] = [];
  frets.forEach((f, i) => {
    if (f >= 0) notes.push(pitchClass(stringMidi(i, f)));
  });
  if (notes.length < set.minSounding) return Infinity;
  if (!required.every((p) => notes.indexOf(p) >= 0)) return Infinity;
  const pressed = frets.filter((f) => f > 0);
  const span = pressed.length ? Math.max(...pressed) - Math.min(...pressed) : 0;
  if (span > 3) return Infinity;
  let cost = pressed.length + span * 1.5 + Math.max(0, Math.max(0, ...frets) - 3) * 0.8;
  if (frets.length > 4) {
    const fi = assignFingers(frets);
    if (!fi) return Infinity;
    if (fi.barre) cost += set.barreCost;
    cost += frets.filter((f) => f < 0).length * set.mutedCost;
    if (notes[0] !== root) cost += set.bassRootCost;
  }
  if (instrument().tuning && sameShapes() === null) cost += awkward(frets);
  return cost;
}

/**
 * Umgestimmt findet der Grifffinder sonst Griffe, deren Töne stimmen, die aber so niemand zeigt: weiter oben am Hals
 * mehrere Finger im selben Bund, zwischen denen leere Saiten klingen (Open D: F#m = 404044 statt xx4344).
 */
function awkward(frets: number[]): number {
  const fi = assignFingers(frets);
  if (!fi) return 0;
  let cost = 0;
  const seen: number[] = [];
  frets.forEach((f) => {
    if (f < 4 || seen.indexOf(f) >= 0) return;
    seen.push(f);
    const at: number[] = [];
    frets.forEach((g, i) => {
      if (g === f && !(fi.barre && fi.fingers[i] === 1)) at.push(i);
    });
    for (let i = at.length ? at[0] : 0; at.length > 1 && i < at[at.length - 1]; i++) if (frets[i] === 0) cost += 2;
  });
  return cost;
}

/**
 * Offene Stimmung: alle Saiten leer sind schon ein Dur-Akkord, jeder andere Dur-Akkord ist der Zeigefinger quer im
 * passenden Bund. Die kurze Banjo-Saite klingt nur mit, wenn ihr Ton dazugehört.
 */
function openBarre(root: number, open: number): { frets: number[]; fingers: number[]; barre: boolean } {
  const fret = (root - open + 12) % 12;
  const pcs = [0, 4, 7].map((i) => (root + i) % 12);
  const frets = STRINGS.map((s) => (s.start ? (pcs.indexOf(pitchClass(s.midi)) >= 0 ? 0 : -1) : fret));
  const fingers = frets.map((f) => (f > 0 ? 1 : 0));
  return { frets, fingers, barre: fret > 0 };
}

/**
 * Der gewohnte Griff, nur auf den umgestimmten Saiten so verschoben, dass dieselben Töne klingen (Drop D: E = 222100).
 * null, wenn er so nicht mehr greifbar ist.
 */
function sameNotes(name: string, root: number, quality: string): Entry | null {
  const from = baseInstrument();
  const known = from.chords.filter((c) => c.name === name)[0];
  const table = from.shapes[quality];
  const src = known || (table ? table[root] : null);
  if (!src) return null;
  const frets: number[] = [];
  let moved = false;
  for (let i = 0; i < STRINGS.length; i++) {
    const f = src.frets[i];
    let nf = f < 0 ? f : f + from.strings[i].midi - STRINGS[i].midi;
    // die kurze Banjo-Saite klingt nur leer – mit, wenn ihr neuer Ton zum Akkord gehört
    if (STRINGS[i].start && f >= 0) nf = QUALITY_INTERVALS[quality].some((k) => (root + k) % 12 === pitchClass(STRINGS[i].midi)) ? 0 : -1;
    if (nf !== f) moved = true;
    if (f >= 0 && (nf < 0 || nf > instrument().finder.maxFret || !playableFret(i, nf))) return null;
    frets.push(nf);
  }
  openBass(frets, root, quality);
  if (!moved) return { frets, fingers: src.fingers, barre: !!src.barre };
  return spread(frets) > 3 ? null : { frets, moved: true };
}

/**
 * Stumme Bass-Saiten, die nach dem Umstimmen leer Grundton oder Quinte sind, klingen bei offenen Griffen mit
 * (Drop D: D = 000232) – aber nur, wenn danach der Grundton unten liegt.
 */
function openBass(frets: number[], root: number, quality: string): void {
  if (frets.indexOf(0) < 0) return;
  const fifth = QUALITY_INTERVALS[quality].indexOf(7) >= 0 ? (root + 7) % 12 : -1;
  let top = 0;
  while (top < frets.length && frets[top] < 0) top++;
  let lowest = top;
  for (let i = top - 1; i >= 0 && i < instrument().finder.mutable && !STRINGS[i].start; i--) {
    const pc = pitchClass(STRINGS[i].midi);
    if (pc !== root && pc !== fifth) break;
    if (pc === root) lowest = i;
  }
  for (let i = lowest; i < top; i++) frets[i] = 0;
}

function makeChord(name: string): Chord | null {
  const p = parseChordName(name);
  if (!p) return null;
  const inst = instrument();
  if (inst.notesOnly) return rootGrip(name, p.root);
  const shift = sameShapes();
  if (shift !== null) {
    const from = baseInstrument();
    const src = ROOTS[(p.root - shift + 12) % 12] + p.quality;
    const known = from.chords.filter((c) => c.name === src)[0];
    if (known) {
      const out: Chord = { name, frets: known.frets, fingers: known.fingers, say: name, level: 5 };
      if (known.barre) out.barre = known.barre;
      return out;
    }
  }
  let entry: Entry | null = null;
  if (shift !== null) {
    const table = baseInstrument().shapes[p.quality];
    entry = table ? table[(p.root - shift + 12) % 12] : null;
  } else if (inst.tuning && inst.tuning.grips && inst.tuning.grips[name]) {
    entry = { frets: parseGrip(inst.tuning.grips[name]) };
  } else if (inst.tuning && inst.tuning.open !== undefined && p.quality === '') {
    entry = openBarre(p.root, inst.tuning.open);
  } else if (inst.tuning) {
    entry = sameNotes(name, p.root, p.quality);
    // ein verschobener gewohnter Griff gewinnt, außer die neue Stimmung bietet einen deutlich leichteren (Double C: C = 00002)
    const iv = QUALITY_INTERVALS[p.quality];
    const found = entry && entry.moved && findShape(p.root, iv);
    const need = requiredTones(iv, p.root);
    // weit gespreizt (Drop D: G = 520003) hat er weniger Vorsprung
    const lead = spread(entry ? entry.frets : []) >= 3 ? 2 : 3;
    if (entry && found && shapeCost(found, p.root, need) < shapeCost(entry.frets, p.root, need) - lead) entry = { frets: found };
  } else {
    const table = inst.shapes[p.quality];
    entry = table ? table[p.root] : null;
  }
  const made = entry ? withFingers(name, entry) : null;
  if (made) return made;
  const frets = findShape(p.root, QUALITY_INTERVALS[p.quality]);
  return frets ? withFingers(name, { frets }) : null;
}

/**
 * Einzeltöne (E-Bass): der Grundton so tief wie möglich in der ersten Lage (Bund 0–4, ein Finger je Bund) – dort
 * liegt jeder der zwölf Töne. Die Quinte für die Basslinie liegt eine Saite höher, zwei Bünde weiter.
 */
export function rootGrip(name: string, root: number): Chord {
  let best = { string: 0, fret: 0, midi: Infinity };
  for (let reach = 4; best.midi === Infinity && reach <= 11; reach += 7)
    STRINGS.forEach((_, i) => {
      for (let f = 0; f <= reach; f++) {
        const m = stringMidi(i, f);
        if (pitchClass(m) === root && playableFret(i, f) && m < best.midi) best = { string: i, fret: f, midi: m };
      }
    });
  const frets = STRINGS.map((_, i) => (i === best.string ? best.fret : -1));
  const ch: Chord = { name, frets, fingers: frets.map((f) => (f > 0 ? Math.min(4, f) : 0)), say: name, level: 5 };
  const up = best.string + 1;
  if (up < STRINGS.length && stringMidi(up, best.fret + 2) === best.midi + 7) ch.fifth = { string: up, fret: best.fret + 2 };
  return ch;
}

function withFingers(name: string, entry: Entry): Chord | null {
  const frets = entry.frets;
  let fingers = entry.fingers;
  let barre = !!entry.barre;
  if (!fingers) {
    const fi = assignFingers(frets);
    if (!fi) return null;
    fingers = fi.fingers;
    barre = fi.barre;
  }
  const ch: Chord = { name, frets, fingers, say: name, level: 5 };
  // auf der Ukulele zeigen Griffbilder wie im Schulheft einzelne Finger, Gitarre und Banjo den Querbalken
  if (barre && instrument().id !== 'ukulele') ch.barre = findBarre(frets, fingers);
  return ch;
}

/** Wie schwer ist ein Griff? Finger, Spanne, hohe Bünde, Barré und weggelassene Saiten kosten. */
export function chordCost(ch: Chord): number {
  const inst = instrument();
  const pressed = ch.frets.filter((f) => f > 0);
  const muted = ch.frets.filter((f) => f < 0).length * inst.cost.muted;
  if (!pressed.length) return muted;
  const span = Math.max(...pressed) - Math.min(...pressed);
  const barre = ch.fingers.filter((f) => f === 1).length >= 3 ? inst.cost.barre : 0;
  return pressed.length + span + Math.max(0, Math.max(...pressed) - 3) * 1.2 + barre + muted;
}

/** Klingende Töne des Griffs (ohne weggelassene Saiten), von oben nach unten. */
export function chordMidis(ch: Chord): number[] {
  const out: number[] = [];
  ch.frets.forEach((f, i) => {
    if (f >= 0) out.push(stringMidi(i, f));
  });
  return out;
}

export function chordPitchClasses(ch: Chord): Set<number> {
  return new Set(chordMidis(ch).map(pitchClass));
}

/** Liegt der Griff auf dem Instrument (Bünde, kurze Banjo-Saite nur leer)? */
export function playableChord(ch: Chord): boolean {
  return ch.frets.length === STRINGS.length && ch.frets.every((f, i) => f < 0 || playableFret(i, f));
}

const FINGER_NAME = ['', tk('Zeigefinger'), tk('Mittelfinger'), tk('Ringfinger'), tk('kleiner Finger')];

export function describeChord(ch: Chord): string {
  if (instrument().notesOnly) {
    const i = ch.frets.findIndex((f) => f >= 0);
    if (i < 0) return ch.name;
    const f = ch.frets[i];
    const where =
      f > 0
        ? t('{finger} auf der {string}-Saite im {fret} Bund', { finger: t(FINGER_NAME[ch.fingers[i]] || tk('Finger')), string: STRINGS[i].name, fret: ordinal(f) })
        : t('leere {s}-Saite', { s: STRINGS[i].name });
    return `${ch.name}: ${where}`;
  }
  const parts: string[] = [];
  const b = ch.barre;
  if (b && b.to - b.from >= 2)
    parts.push(t('Zeigefinger quer über die Saiten {from} bis {to} im {fret} Bund', { from: STRINGS[b.from].name, to: STRINGS[b.to].name, fret: ordinal(b.fret) }));
  ch.frets.forEach((f, i) => {
    if (b && b.to - b.from >= 2 && i >= b.from && i <= b.to && f === b.fret && ch.fingers[i] === 1) return;
    if (f > 0)
      parts.push(
        t('{finger} auf der {string}-Saite im {fret} Bund', { finger: t(FINGER_NAME[ch.fingers[i]] || tk('Finger')), string: STRINGS[i].name, fret: ordinal(f) }),
      );
  });
  const muted = ch.frets.map((f, i) => (f < 0 ? STRINGS[i].name : '')).filter(Boolean);
  if (muted.length) parts.push(t('nicht anschlagen: {strings}', { strings: muted.join(', ') }));
  return `${ch.name}: ${parts.length ? parts.join(', ') : t('alle Saiten leer')}`;
}

/** Ausgesprochener Name („C-Dur“); transponierte Griffe ohne eigenen Text zeigen ihr Symbol. */
export function chordSay(ch: Chord): string {
  return t(ch.say);
}
