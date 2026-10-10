import type { Chord } from './grip.ts';
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
  /** Karplus-Strong: Helligkeit, Ausklingen (Faktor), Länge in s, Zupfstelle (Anteil der Saitenlänge). */
  synth: { brightness: number; sustain: number; seconds: number; position: number };
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
}

export const INSTRUMENTS: Instrument[] = [UKULELE, GITARRE, BANJO, BARITON];

let current: Instrument = UKULELE;
const listeners: (() => void)[] = [];

export function instrument(): Instrument {
  return current;
}

export function isInstrumentId(x: unknown): x is InstrumentId {
  return INSTRUMENTS.some((i) => i.id === x);
}

export function setInstrument(id: string): Instrument {
  const next = INSTRUMENTS.filter((i) => i.id === id)[0] || UKULELE;
  if (next !== current) {
    current = next;
    listeners.forEach((f) => f());
  }
  return current;
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
