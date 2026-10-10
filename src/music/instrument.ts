import type { Chord } from './grip.ts';
import { tk } from '../i18n.ts';
import { UKULELE } from './instruments/ukulele.ts';
import { GITARRE } from './instruments/gitarre.ts';
import { BANJO } from './instruments/banjo.ts';
import { BARITON } from './instruments/bariton.ts';

export type InstrumentId = 'ukulele' | 'gitarre' | 'banjo' | 'bariton';

export interface InstrumentString {
  /** Kurzname im Griffbild und in Sätzen („{s}-Saite“): G C E A, Gitarre E A D G B e, Banjo g D G B D. */
  name: string;
  /** Leersaite als MIDI-Ton (C4 = 60). */
  midi: number;
  /** Bund, an dem die Saite beginnt – die kurze 5. Banjo-Saite hat ihren Wirbel am 5. Bund. */
  start?: number;
  /** Kleiner Zusatz im Stimmgerät, z. B. „tief“ für die tiefe E-Saite der Gitarre. */
  hint?: string;
}

/** Vorgaben für die Akkorderkennung (siehe audio/chord-detect.ts). */
export interface DetectSettings {
  /** Fenster der Spektralspitzen in Hz. */
  minHz: number;
  maxHz: number;
  /** Wie viele Obertöne einer Saite als „erklärt“ gelten (Ukulele 3; tiefe Saiten haben viele starke Obertöne). */
  harmonics: number;
  /** Toleranz in Cent, mit der ein Grundton als vorhanden gilt. */
  presenceCents: number;
  /** Abweichende Schwellen (sonst TUNING). */
  tuning?: { minScore?: number; minPresence?: number; maxForeign?: number; maxOpenString?: number };
}

/** Grifffinder für Akkorde, die weder in der Bibliothek noch in der Tabelle stehen. */
export interface FinderSettings {
  /** Höchster Bund der Suche. */
  maxFret: number;
  /** Saiten, die weggelassen (x) werden dürfen – nur die Bass-Seite und nur zusammenhängend. */
  mutable: number;
  /** Mindestens so viele Saiten klingen. */
  minSounding: number;
  /** Kosten: weggelassene Saite, Barré, Grundton nicht im Bass. */
  mutedCost: number;
  barreCost: number;
  bassRootCost: number;
}

/** Karplus-Strong: Helligkeit, Ausklingen (Faktor), Länge in s, Zupfstelle (Anteil der Saitenlänge), Verzerrung (E-Gitarre). */
export interface Synth {
  brightness: number;
  sustain: number;
  seconds: number;
  position: number;
  drive?: number;
}

export interface Instrument {
  id: InstrumentId;
  /** Name (tk) – „Ukulele“. */
  name: string;
  /** Name der App für dieses Instrument (tk). */
  club: string;
  /** Wörter für Sätze (tk): als Objekt („halte die Ukulele ruhig“), „deine Ukulele“, Genitiv („Korpus der Ukulele“). */
  obj: string;
  yours: string;
  of: string;
  /** Beispielzeile für eigene Lieder (tk). */
  ownLine: string;
  strings: InstrumentString[];
  /** Bünde auf dem Hals, bis zu denen die Tabulatur reicht. */
  frets: number;
  /** Griffbild: mindestens so viele Bünde zeigen; Perlmutt-Punkte. */
  diagram: { minRows: number; inlays: number[] };
  /**
   * Melodie: so viele Halbtöne gegen die gesungene Lage verschoben spielen (Gitarre eine Oktave tiefer), tiefster Ton;
   * `flexible`: je Lied die Oktave wählen, die tiefer am Hals liegt (Banjo).
   */
  melody: { offset: number; low: number; flexible?: boolean };
  tuner: { minHz: number; maxHz: number };
  detect: DetectSettings;
  /** Bekannte Griffe mit Fingersatz (Akkordseite, Erkennung, Detektiv). */
  chords: Chord[];
  /** Übliche Griffe in allen zwölf Tonarten je Akkordart (Index = Grundton ab C), sonst Grifffinder. */
  shapes: Record<string, { frets: number[]; fingers?: number[]; barre?: boolean }[]>;
  finder: FinderSettings;
  /** Griffschwere: Barré und weggelassene Saiten. */
  cost: { barre: number; muted: number };
  /** Kapodaster-Hinweis im Player. */
  capo: boolean;
  /** Klang der Saiten (Vorgabe). */
  synth: Synth;
  /** Klänge zur Wahl (Gitarre: Nylon, Stahl, E-Gitarre); der erste ist die Vorgabe und gleich `synth`. */
  sounds?: { id: string; name: string; synth: Synth }[];
  /** Gibt es das Instrument auch mit doppelten Saiten (12-saitige Gitarre)? */
  twelve?: boolean;
  blues: {
    /** Tiefster Grundton der Vorgabe-Töne (MIDI); alles bleibt innerhalb einer Oktave darüber. */
    low: number;
    /** Bünde auf dem Hals der Blues-Ansicht. */
    frets: number;
    /** Bequemste Tonart (Tonklasse). */
    easyKey: number;
    /** Tiefster Ton der Orgel-Akzente; sie liegen außerhalb dessen, was das Mikrofon vom Instrument hören will. */
    organ: number;
    pitch: { minHz: number; maxHz: number };
    /** Hinweis zur ★-Tonart und Text zur Boogie-Stufe (tk). */
    hint: string;
    boogie: string;
  };
  /** Akkord-Spiel: Auswahl an Akkordfolgen. */
  game: string[][];
  /** Rhythmus: Akkorde zum Mitklingen. */
  rhythmChords: string[];
  /** Zupfmuster (Banjo): Saite je Achtel für Daumen (T), Zeige- (I) und Mittelfinger (M). */
  roll?: { fingers: string; strings: number[]; explain: string };
  /** Aufnahmeplan: Griffe für richtige Aufnahmen. */
  recordChords: string[];
  /** Andere Stimmungen zum Auswählen; die Normalstimmung ist immer die Vorgabe und steht nicht in der Liste. */
  tunings?: Tuning[];
  /** Nur bei umgestimmten Instrumenten: die aktive Stimmung. */
  tuning?: Tuning;
}

/** Eine andere Stimmung: Leersaiten in Spielreihenfolge wie beim Instrument. */
export interface Tuning {
  id: string;
  /** Name (tk), z. B. „Open G“. */
  name: string;
  /** Kurzer Satz „Wofür?“ (tk). */
  why: string;
  /** Saitennamen und Leersaiten (MIDI). */
  names: string[];
  midi: number[];
  /** Tonklasse des Dur-Akkords, der mit allen Saiten leer erklingt – Dur ist dann ein gerader Barré. */
  open?: number;
  /** Bequemste Blues-Tonart in dieser Stimmung. */
  bluesKey?: number;
  /** false: Die Griffe bleiben gleich (tiefes G) – dann kein Hinweis oben auf jeder Seite. */
  banner?: boolean;
}

export const INSTRUMENTS: Instrument[] = [UKULELE, GITARRE, BANJO, BARITON];

let current: Instrument = UKULELE;
let base: Instrument = UKULELE;
const listeners: (() => void)[] = [];

export function instrument(): Instrument {
  return current;
}

export function isInstrumentId(x: unknown): x is InstrumentId {
  return INSTRUMENTS.some((i) => i.id === x);
}

/** Wechselt das Instrument; eine Umstimmung gilt danach nicht mehr. */
export function setInstrument(id: string): Instrument {
  const next = INSTRUMENTS.filter((i) => i.id === id)[0] || UKULELE;
  if (next !== current) {
    current = next;
    base = next;
    sound = '';
    twelve = false;
    listeners.forEach((f) => f());
  }
  return current;
}

/** Bis hierhin hört das Stimmgerät bei der 12-saitigen Gitarre (Oktavsaite der G-Saite: G4 ≈ 392 Hz). */
export const TWELVE_MAX_HZ = 480;

let sound = '';
let twelve = false;

/** Klang und 12 Saiten wählen (nur, wo das Instrument sie anbietet). */
export function setVariant(soundId: string, twelveOn: boolean): void {
  const s = (base.sounds || []).some((x) => x.id === soundId) ? soundId : '';
  const tw = !!base.twelve && twelveOn;
  if (s === sound && tw === twelve) return;
  sound = s;
  twelve = tw;
  listeners.forEach((f) => f());
}

/** Gewählter Klang (Synthese) des Instruments. */
export function voice(): Synth {
  const s = (base.sounds || []).filter((x) => x.id === sound)[0];
  return s ? s.synth : current.synth;
}

export function soundId(): string {
  return sound || (base.sounds ? base.sounds[0].id : '');
}

/** 12-saitige Gitarre: jede Saite hat eine Partnerin – die vier tiefen eine Oktave höher, die beiden hohen gleich hoch. */
export function twelveString(): boolean {
  return twelve;
}

/** Das aktuelle Instrument in Normalstimmung. */
export function baseInstrument(): Instrument {
  return base;
}

/** Aktive Stimmung, null bei Normalstimmung. */
export function activeTuning(): Tuning | null {
  return current.tuning || null;
}

/** Stimmung des aktuellen Instruments wählen; '' oder unbekannt = Normalstimmung. */
export function setTuning(id: string): Instrument {
  const tuning = (base.tunings || []).filter((x) => x.id === id)[0];
  const next = tuning ? tuned(base, tuning) : base;
  if (next.tuning !== current.tuning) {
    current = next;
    listeners.forEach((f) => f());
  }
  return current;
}

const freq = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

/**
 * Umgestimmtes Instrument: neue Leersaiten, Frequenzfenster bis unter die tiefste Saite. Die Griffbibliothek behält
 * ihre Namen, die Griffe rechnet chords.ts für die neuen Saiten aus.
 */
function tuned(inst: Instrument, tuning: Tuning): Instrument {
  const strings = inst.strings.map((st, i) => {
    const out: InstrumentString = { name: tuning.names[i], midi: tuning.midi[i] };
    if (st.start) out.start = st.start;
    if (st.hint) out.hint = st.hint;
    return out;
  });
  const low = Math.min.apply(null, tuning.midi);
  const below = (hz: number) => Math.min(hz, Math.floor(freq(low) * 0.85));
  const own = tuning.bluesKey !== undefined;
  return {
    ...inst,
    strings,
    tuning,
    tuner: { minHz: below(inst.tuner.minHz), maxHz: inst.tuner.maxHz },
    detect: { ...inst.detect, minHz: below(inst.detect.minHz) },
    blues: {
      ...inst.blues,
      low: Math.max(inst.blues.low, low),
      easyKey: own ? tuning.bluesKey! : inst.blues.easyKey,
      pitch: { minHz: below(inst.blues.pitch.minHz), maxHz: inst.blues.pitch.maxHz },
      hint: own ? tk('★ In dieser Tonart liegen in deiner Stimmung die Grundtöne auf leeren Saiten – am bequemsten.') : inst.blues.hint,
      boogie: own ? tk('Grundton, Terz, Quinte, Sexte – das klassische Boogie-Riff.') : inst.blues.boogie,
    },
    shapes: {},
  };
}

/** Wird gerufen, wenn das Instrument wechselt (Zwischenspeicher leeren). */
export function onInstrumentChange(f: () => void): void {
  listeners.push(f);
}

/**
 * Instrument beim Start: vorgerenderte Seiten setzen `data-instrument` am <html>, zum Entwickeln und Testen geht
 * auch `?instrument=gitarre`; sonst Ukulele.
 */
export function initInstrument(): Instrument {
  if (typeof document === 'undefined') return current;
  const attr = document.documentElement.getAttribute('data-instrument');
  const m = /[?&]instrument=([a-z]+)/.exec(location.search);
  const id = attr || (m ? m[1] : 'ukulele');
  setInstrument(id);
  document.documentElement.setAttribute('data-instrument', current.id);
  // für das Layout: breitere Griffbilder bei fünf und sechs Saiten
  document.documentElement.setAttribute('data-strings', String(current.strings.length));
  return current;
}
