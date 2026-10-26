import { STRINGS, playableFret, stringMidi } from './notes.ts';
import { QUALITY_INTERVALS, ROOTS, chord, chordCost, parseChordName } from './chords.ts';
import { instrument } from './instrument.ts';
import { tk } from '../i18n.ts';

/**
 * Begleitungen zum Mitspielen außer dem Blues: Rock, Pop, Shuffle, Country. Je Stil eine kurze Akkordfolge, ein
 * Schlagzeug-Muster, Akkord-Tupfer der Band (außerhalb dessen, was das Mikrofon hören will, wie beim Blues) und eine
 * Basslinie – die spielt auf dem E-Bass das Kind, sonst die Band. Alles in Achteln: 8 je 4/4-Takt; beim Shuffle kommt
 * die zweite Achtel jedes Schlags erst bei 2/3 (triolisch).
 */
export type GrooveId = 'rock' | 'pop' | 'shuffle' | 'country';

/** Akkord eines Takts als Stufe: Halbtöne über dem Grundton der Tonart und Akkordart („“, „m“, „7“). */
interface Step {
  deg: number;
  q: string;
}

/** Ton der Basslinie relativ zum Akkord: Abstand zum Grundton, Quinte darunter (wenn erreichbar) oder Durchgangston. */
type BassStep = number | 'fifth' | 'approach';

interface LinePart {
  /** Achtel im Takt (0–7). */
  e: number;
  step: BassStep;
  /** Länge in Achteln. */
  len: number;
}

export interface Groove {
  id: GrooveId;
  /** Name des Stils und Überschrift der Seite (tk). */
  name: string;
  title: string;
  bars: Step[];
  swing: boolean;
  /** Tempi zu „Sehr langsam“ … „Schnell“. */
  tempos: number[];
  /** Achtel für Bassdrum, Snare, Hi-Hat. */
  kick: number[];
  snare: number[];
  hat: number[];
  /** Akkord-Tupfer der Band: Achtel, Länge in Schlägen, Klang (Powerchord = Grundton und Quinte). */
  keys: { at: number[]; dur: number; power: boolean; gain: number };
  /** Basslinie: einfach (nur Grundtöne), ggf. eine Zwischenstufe und die des Stils. */
  simple: LinePart[];
  middle?: { line: LinePart[]; name: string; text: string };
  line: LinePart[];
  /** Schlagmuster für Akkordinstrumente: je Achtel D = runter, U = rauf, - = Pause. */
  strum: string;
  /** Erklärungen (tk): Stil, Schlagmuster, Basslinie. */
  about: string;
  strumText: string;
  lineName: string;
  lineText: string;
  simpleText: string;
}

const part = (e: number, step: BassStep, len: number): LinePart => ({ e, step, len });
const roots = (at: number[], len: number) => at.map((e) => part(e, 0, len));
const I = { deg: 0, q: '' };
const IV = { deg: 5, q: '' };
const V = { deg: 7, q: '' };

export const GROOVES: Groove[] = [
  {
    id: 'rock',
    name: tk('Rock'),
    title: tk('Rock-Begleitung'),
    // I–IV–V–IV, je zwei Takte
    bars: [I, I, IV, IV, V, V, IV, IV],
    swing: false,
    tempos: [60, 80, 100, 120],
    kick: [0, 4, 5],
    snare: [2, 6],
    hat: [0, 1, 2, 3, 4, 5, 6, 7],
    keys: { at: [0, 1, 2, 3, 4, 5, 6, 7], dur: 0.4, power: true, gain: 0.05 },
    simple: roots([0, 2, 4, 6], 2),
    line: roots([0, 1, 2, 3, 4, 5, 6, 7], 1),
    strum: 'DDDDDDDD',
    about: tk('Rock: gerade Achtel, kräftig und gleichmäßig. Die Akkordfolge {chords} – je zwei Takte, dann wieder von vorn.'),
    strumText: tk('Achtel, alle runter, kurz und kräftig. Zu schnell? Dann nur auf eins, zwei, drei, vier.'),
    lineName: tk('Rock-Achtel'),
    lineText: tk('Achtmal den Grundton in jedem Takt, gleichmäßig wie ein Motor: eins und zwei und drei und vier und. Zupf abwechselnd mit Zeige- und Mittelfinger.'),
    simpleText: tk('Spiel auf jeden Schlag den Grundton – den Ton, nach dem der Akkord heißt. Wo er liegt, zeigt der grüne Punkt.'),
  },
  {
    id: 'pop',
    name: tk('Pop'),
    title: tk('Pop-Begleitung'),
    // die „vier Akkorde“ vieler Popsongs: I–V–vi–IV
    bars: [I, V, { deg: 9, q: 'm' }, IV],
    swing: false,
    tempos: [60, 75, 90, 105],
    kick: [0, 3, 4],
    snare: [2, 6],
    hat: [0, 1, 2, 3, 4, 5, 6, 7],
    keys: { at: [0, 4], dur: 1.8, power: false, gain: 0.035 },
    simple: roots([0, 4], 4),
    line: [part(0, 0, 3), part(3, 0, 1), part(4, 0, 2), part(6, 'approach', 2)],
    strum: 'D-DU-UDU',
    about: tk('Pop: ein ruhiger, gerader Beat und vier Akkorde, die in sehr vielen Liedern stecken: {chords}.'),
    strumText: tk('Runter, runter, rauf, rauf, runter, rauf – zwischen den beiden „rauf“ schwingt die Hand runter, ohne zu treffen.'),
    lineName: tk('Mit Zwischenton'),
    lineText: tk('Grundton auf eins, kurz vor drei noch einmal und auf drei. Auf vier ein Zwischenton, der zum nächsten Akkord führt.'),
    simpleText: tk('Spiel den Grundton auf eins und auf drei und lass ihn klingen. Wo er liegt, zeigt der grüne Punkt.'),
  },
  {
    id: 'shuffle',
    name: tk('Shuffle'),
    title: tk('Shuffle-Begleitung'),
    // Rock’n’Roll in Dur, acht Takte; der V-Akkord als Septakkord
    bars: [I, I, IV, IV, I, { deg: 7, q: '7' }, I, { deg: 7, q: '7' }],
    swing: true,
    tempos: [60, 75, 90, 110],
    kick: [0, 4],
    snare: [2, 6],
    hat: [0, 1, 2, 3, 4, 5, 6, 7],
    keys: { at: [3, 7], dur: 0.45, power: false, gain: 0.06 },
    simple: roots([0, 2, 4, 6], 2),
    middle: {
      line: [0, 4, 7, 9].map((iv, beat) => part(beat * 2, iv, 2)),
      name: tk('Boogie in Vierteln'),
      text: tk('Ein Ton auf jeden Schlag: Grundton, Terz, Quinte, Sexte (1-3-5-6). Nimm einen Finger pro Bund, dann liegt jeder Ton schon unter einem Finger.'),
    },
    line: [0, 4, 7, 9, 10, 9, 7, 4].map((iv, e) => part(e, iv, 1)),
    strum: 'DUDUDUDU',
    about: tk('Shuffle: Die Achtel schwingen lang-kurz, lang-kurz – wie beim Blues, nur heller: mit einfachen Dur-Akkorden, als Rock’n’Roll. Die Akkordfolge: {chords}.'),
    strumText: tk('Runter-rauf in Achteln, aber schwingend: das Runter lang, das Rauf kurz – wie beim Hüpfen.'),
    lineName: tk('Boogie-Linie'),
    lineText: tk('Das Boogie-Riff in Achteln: Grundton, Terz, Quinte, Sexte, kleine Septime – und über Sexte, Quinte, Terz zurück (1-3-5-6-b7-6-5-3). Ein Finger pro Bund hilft: Zeigefinger im 1. Bund, Mittelfinger im 2., Ringfinger im 3., kleiner Finger im 4.'),
    simpleText: tk('Spiel auf jeden Schlag den Grundton – und fühl, wie die Band dazwischen schwingt. Wo er liegt, zeigt der grüne Punkt.'),
  },
  {
    id: 'country',
    name: tk('Country'),
    title: tk('Country-Begleitung'),
    bars: [I, I, IV, IV, I, I, V, V],
    swing: false,
    tempos: [70, 90, 110, 130],
    kick: [0, 4],
    snare: [2, 6],
    hat: [1, 3, 5, 7],
    keys: { at: [2, 6], dur: 0.35, power: false, gain: 0.06 },
    simple: roots([0, 4], 4),
    line: [part(0, 0, 2), part(4, 'fifth', 2)],
    strum: 'D-DUD-DU',
    about: tk('Country: „Boom-Chick“ – auf eins und drei der Bass (Boom), auf zwei und vier der Akkord (Chick). Die Akkordfolge: {chords}.'),
    strumText: tk('Runter auf eins und drei, runter-rauf auf zwei und vier – betone das Runter auf eins und drei.'),
    lineName: tk('Grundton und Quinte'),
    lineText: tk('Auf eins der Grundton, auf drei die Quinte – meist unter dem Grundton. Das ist das „Boom“ des Boom-Chick.'),
    simpleText: tk('Spiel den Grundton auf eins und auf drei. Wo er liegt, zeigt der grüne Punkt.'),
  },
];

export function groove(id: string): Groove | undefined {
  return GROOVES.filter((g) => g.id === id)[0];
}

/** Akkordfolge des Stils in der Tonart `key` (Tonklasse 0 = C). */
export function grooveBars(g: Groove, key: number): string[] {
  return g.bars.map((s) => ROOTS[(key + s.deg) % 12] + s.q);
}

/** Akkordfolge als Text ohne Wiederholungen hintereinander: „C – F – G – F“. */
export function chordsText(g: Groove, key: number): string {
  const out: string[] = [];
  grooveBars(g, key).forEach((c) => out[out.length - 1] !== c && out.push(c));
  return out.join(' – ');
}

/** Wo im Takt eine Achtel liegt (in Schlägen): gerade bei 1/2, triolisch bei 2/3. */
export function eighthAt(e: number, swing: boolean): number {
  return Math.floor(e / 2) + (e % 2 ? (swing ? 2 / 3 : 1 / 2) : 0);
}

/** Länge von `len` Achteln ab Achtel `e` in Schlägen. */
function span(e: number, len: number, swing: boolean): number {
  return eighthAt(e + len, swing) - eighthAt(e, swing);
}

/**
 * Bequemste Tonart des Stils: Auf dem E-Bass wie beim Blues (Grundtöne auf leeren Saiten), sonst die Tonart, in der
 * alle Griffe zusammen am leichtesten sind; bei (fast) Gleichstand die des Blues, dann C, G, D, A, E, F.
 */
export function easyKey(g: Groove): number {
  const inst = instrument();
  if (inst.notesOnly) return inst.blues.easyKey;
  const order = [inst.blues.easyKey, 0, 7, 2, 9, 4, 5];
  for (let k = 0; k < 12; k++) if (order.indexOf(k) < 0) order.push(k);
  let best = order[0];
  let cost = Infinity;
  for (const key of order) {
    const names = grooveBars(g, key).filter((n, i, all) => all.indexOf(n) === i);
    const c = names.reduce((sum, name) => sum + chordCost(chord(name)), 0);
    if (c < cost - 0.5) {
      cost = c;
      best = key;
    }
  }
  return best;
}

export interface LineNote {
  /** Achtel im Takt (0–7) und Zeitpunkt in Schlägen. */
  eighth: number;
  at: number;
  /** Länge in Schlägen. */
  dur: number;
  midi: number;
  /** Abstand zum Grundton des Akkords (Tonklassen, 0–11); Durchgangstöne gehören zum nächsten Akkord. */
  rel: number;
  approach: boolean;
}

/** Tonbereich: tiefster Ton und höchster, der in erster Lage noch geht. */
export interface Range {
  lo: number;
  hi: number;
  /** Grundtöne ab hier (sonst ab `lo`). */
  root?: number;
}

/** Erste Lage des Instruments: leere tiefste Saite bis Bund `blues.frets` der höchsten. */
export function firstPosition(): Range {
  let lo = Infinity;
  let hi = 0;
  STRINGS.forEach((_, s) => {
    lo = Math.min(lo, stringMidi(s, 0));
    for (let f = instrument().blues.frets; f >= 0; f--)
      if (playableFret(s, f)) {
        hi = Math.max(hi, stringMidi(s, f));
        break;
      }
  });
  return { lo, hi };
}

/** Die Band spielt den Bass ab C2 (wie beim Blues), Quinten und Durchgänge darunter bis E1. */
export const BAND_RANGE: Range = { lo: 28, hi: 60, root: 36 };

const MAJOR = [0, 2, 4, 5, 7, 9, 11];

function rootPc(name: string): number {
  const p = parseChordName(name);
  return p ? p.root : 0;
}

/** Tiefste Lage des Grundtons im Bereich. */
function rootIn(pc: number, r: Range): number {
  const lo = r.root !== undefined ? r.root : r.lo;
  return lo + ((((pc - lo) % 12) + 12) % 12);
}

/**
 * Durchgangston vor dem nächsten Grundton `next`: der Nachbar in der Tonleiter der Tonart, und zwar der, der zwischen
 * dem jetzigen und dem nächsten Grundton liegt (sonst einer, der zum jetzigen Akkord gehört; sonst der tiefere).
 */
function approachNote(cur: number, next: number, key: number, tones: number[], r: Range): number | null {
  const inScale = (m: number) => MAJOR.indexOf((((m - key) % 12) + 12) % 12) >= 0;
  let above = next + 1;
  while (!inScale(above)) above++;
  let below = next - 1;
  while (!inScale(below)) below--;
  const ok = [above, below].filter((m) => m >= r.lo && m <= r.hi && m !== cur);
  const between = ok.filter((m) => (m - cur) * (m - next) < 0);
  if (between.length) return between[0];
  const fits = ok.filter((m) => tones.indexOf(((m % 12) + 12) % 12) >= 0);
  if (fits.length) return fits[0];
  return ok.length ? ok[ok.length - 1] : null;
}

/** Akkordtöne als Tonklassen. */
export function chordPcs(name: string): number[] {
  const p = parseChordName(name);
  const iv = (p && QUALITY_INTERVALS[p.quality]) || [0, 4, 7];
  return iv.map((i) => ((p ? p.root : 0) + i) % 12);
}

/** Stufen der Basslinie: nur Grundtöne, ggf. eine Zwischenstufe, die Linie des Stils. */
export type Level = 'simple' | 'middle' | 'line';

export function levels(g: Groove): Level[] {
  return g.middle ? ['simple', 'middle', 'line'] : ['simple', 'line'];
}

/**
 * Basslinie eines Takts auf einer Stufe. Der Grundton liegt so tief wie möglich; passt die Linie darüber nicht in den
 * Bereich, rutschen einzelne Töne eine Oktave (wie beim Blues).
 */
export function lineNotes(g: Groove, level: Level, key: number, bar: number, r: Range = firstPosition()): LineNote[] {
  const bars = grooveBars(g, key);
  const name = bars[bar % bars.length];
  const nextName = bars[(bar + 1) % bars.length];
  const pc = rootPc(name);
  const root = rootIn(pc, r);
  const next = rootIn(rootPc(nextName), r);
  const out: LineNote[] = [];
  for (const p of level === 'simple' ? g.simple : level === 'middle' && g.middle ? g.middle.line : g.line) {
    let midi: number;
    let approach = false;
    if (p.step === 'fifth') midi = root - 5 >= r.lo ? root - 5 : root + 7;
    else if (p.step === 'approach') {
      const a = approachNote(root, next, key, chordPcs(name), r);
      approach = a !== null;
      midi = a === null ? (root - 5 >= r.lo ? root - 5 : root + 7) : a;
    } else {
      midi = root + p.step;
      while (midi > r.hi) midi -= 12;
      while (midi < r.lo) midi += 12;
    }
    out.push({
      eighth: p.e,
      at: eighthAt(p.e, g.swing),
      dur: span(p.e, p.len, g.swing),
      midi,
      rel: (((midi - pc) % 12) + 12) % 12,
      approach,
    });
  }
  return out;
}

/** Ton der Linie, der zum Schlag `beat` (im Takt, 0 ≤ beat < 4) klingt bzw. als Letzter angeschlagen wurde. */
export function noteAt(notes: LineNote[], beat: number): LineNote | null {
  let hit: LineNote | null = null;
  for (const n of notes) if (n.at <= beat + 1e-9) hit = n;
  return hit;
}

/** Achtel, in der der Schlag `beat` (im Takt) liegt. */
export function eighthOf(beat: number, swing: boolean): number {
  let e = 0;
  for (let i = 0; i < 8; i++) if (eighthAt(i, swing) <= beat + 1e-9) e = i;
  return e;
}

/**
 * Akkord-Tupfer der Band außerhalb des Hörbereichs der Erkennung (wie die Blues-Orgel): bei der Ukulele darunter, bei
 * tiefen Instrumenten darüber – und weiter oben am Hals noch eine Oktave höher (`above` = höchster spielbarer Ton).
 * Powerchord: nur Grundton und Quinte.
 */
export function keysVoicing(name: string, power: boolean, above = 0): number[] {
  const p = parseChordName(name);
  const r = p ? p.root : 0;
  const iv = power ? [0, 7] : (p && QUALITY_INTERVALS[p.quality]) || [0, 4, 7];
  let low = instrument().blues.organ;
  if (low > instrument().blues.low) while (low <= above + 1) low += 12;
  return iv.map((i) => low + ((((r + i - low) % 12) + 12) % 12)).sort((a, b) => a - b);
}

export interface BandHit {
  /** Schlag im Takt. */
  at: number;
  kind: 'kick' | 'snare' | 'hat' | 'bass' | 'keys';
  midi: number[];
  dur: number;
  gain: number;
}

/**
 * Alles, was die Band in einem Takt spielt. `ownBass`: Das Kind spielt den Bass (E-Bass) – die Band lässt ihn weg und
 * spielt die Bassdrum leiser, damit man sich selbst hört.
 */
export function bandBar(g: Groove, key: number, bar: number, ownBass: boolean, above = 0): BandHit[] {
  const name = grooveBars(g, key)[bar % g.bars.length];
  const out: BandHit[] = [];
  const at = (e: number) => eighthAt(e, g.swing);
  for (const e of g.kick) out.push({ at: at(e), kind: 'kick', midi: [], dur: 0.2, gain: ownBass ? 0.45 : e % 2 ? 0.55 : 0.8 });
  for (const e of g.snare) out.push({ at: at(e), kind: 'snare', midi: [], dur: 0.15, gain: g.id === 'pop' || g.id === 'country' ? 0.18 : 0.25 });
  for (const e of g.hat) out.push({ at: at(e), kind: 'hat', midi: [], dur: 0.04, gain: e % 2 ? 0.05 : 0.08 });
  for (const e of g.keys.at) out.push({ at: at(e), kind: 'keys', midi: keysVoicing(name, g.keys.power, above), dur: g.keys.dur, gain: g.keys.gain });
  if (!ownBass)
    for (const n of lineNotes(g, 'line', key, bar, BAND_RANGE)) out.push({ at: n.at, kind: 'bass', midi: [n.midi], dur: n.dur * 0.92, gain: 0.5 });
  return out.sort((a, b) => a.at - b.at);
}
