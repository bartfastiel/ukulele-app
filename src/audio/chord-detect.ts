import { CHORDS, chordMidis, type Chord } from '../music/chords.ts';
import { STRINGS, midiToFreq } from '../music/notes.ts';

/**
 * Akkorderkennung aus einem Betragsspektrum (linear, z. B. aus AnalyserNode.getFloatFrequencyData umgerechnet).
 *
 * Statt Tonklassen (Chroma) zu vergleichen, prüft sie jede Saite des erwarteten Griffs einzeln: Klingt die
 * Grundfrequenz (oder ihre Oktave) der Saite? Und wie viel der Energie erklärt der Griff überhaupt? So lassen sich
 * auch nah verwandte Griffe wie C (0003) und Am7 (0000) unterscheiden, und die Rückmeldung kann eine Saite nennen.
 */

/** Schwellen der Entscheidung – abgestimmt an echten Handy-Aufnahmen (tools/eval-recordings.ts). */
export const TUNING = {
  minScore: 0.45,
  minPresence: 0.2,
  maxForeign: 0.3,
  /** Strengere Grenze für den Leerton einer Saite, die der Griff greift: das typische Zeichen „Finger drückt nicht“. */
  maxOpenString: 0.06,
  /** Spitzenhalter: Anteil, der pro Messung (80 ms) vom gehaltenen Spektrum bleibt. 0 = aus. */
  hold: 0.75,
};

/**
 * Spitzenhalter über die letzten Messungen: Ein Fremdton vom Anschlag (z. B. die leere G-Saite, weil der Finger
 * nicht drückt) verklingt oft schneller als der Rest und darf sich nicht im Ausklang verstecken.
 */
export function holdSpectrum(held: Float32Array, current: Float32Array, keep = TUNING.hold): Float32Array {
  for (let i = 0; i < held.length; i++) held[i] = Math.max(current[i], held[i] * keep);
  return held;
}

export interface Peak {
  freq: number;
  mag: number;
}

export function findPeaks(spec: Float32Array, binHz: number, minHz = 240, maxHz = 1100): Peak[] {
  const lo = Math.max(2, Math.floor(minHz / binHz));
  const hi = Math.min(spec.length - 2, Math.ceil(maxHz / binHz));
  let max = 0;
  for (let i = lo; i <= hi; i++) if (spec[i] > max) max = spec[i];
  if (max <= 0) return [];
  const floor = max * 0.04;
  const peaks: Peak[] = [];
  for (let i = lo; i <= hi; i++) {
    const m = spec[i];
    if (m < floor || m < spec[i - 1] || m < spec[i + 1] || m < spec[i - 2] || m < spec[i + 2]) continue;
    // parabolische Interpolation auf logarithmischer Skala für genauere Frequenz
    const a = Math.log(spec[i - 1] + 1e-12);
    const b = Math.log(m + 1e-12);
    const c = Math.log(spec[i + 1] + 1e-12);
    const denom = a - 2 * b + c;
    const offset = denom !== 0 ? (0.5 * (a - c)) / denom : 0;
    peaks.push({ freq: (i + offset) * binHz, mag: m });
  }
  return peaks;
}

function near(freq: number, target: number, centsTol: number): boolean {
  return Math.abs(1200 * Math.log2(freq / target)) <= centsTol;
}

export interface ChordScore {
  chord: string;
  score: number;
  /** Anteil 0..1 je Saite G, C, E, A: wie deutlich der erwartete Ton zu hören ist. */
  strings: number[];
  /** Anteil der Spitzen (nach Betrag), die der Griff erklärt. */
  explained: number;
  /** Schwächster Ton des Griffs (0..1). */
  minPresence: number;
  /** Stärkste Spitze, die der Griff nicht erklärt, relativ zur stärksten Spitze. */
  foreign: number;
  /** Stärkster nicht erklärter Leerton einer gegriffenen Saite, relativ zur stärksten Spitze. */
  openString: number;
}

export function scoreChord(peaks: Peak[], ch: Chord): ChordScore {
  const midis = chordMidis(ch);
  const freqs = midis.map(midiToFreq);
  const maxMag = peaks.reduce((m, p) => Math.max(m, p.mag), 0) || 1;
  // Nur der Grundton zählt als „Saite klingt“: Die Oktave darf nicht mitzählen, sonst gilt z. B. das B4 von Cmaj7
  // als vorhanden, weil der dritte Oberton der E-Saite (989 Hz) zufällig auf seiner Oktave liegt.
  const strings = freqs.map((f) => {
    let best = 0;
    for (const p of peaks) if (near(p.freq, f, 40)) best = Math.max(best, p.mag);
    return Math.min(1, best / maxMag / 0.25);
  });
  let total = 0;
  let explainedE = 0;
  let foreign = 0;
  // Nur Grundtöne der ersten Lage (261–523 Hz) und ihre ersten Obertöne liegen im Fenster; linear gewichtet, damit
  // ein einzelner fremder Ton (z. B. leere A-Saite statt C) nicht in den starken Obertönen untergeht.
  for (const p of peaks) {
    total += p.mag;
    if (freqs.some((f) => [1, 2, 3].some((k) => near(p.freq, k * f, 35)))) explainedE += p.mag;
    else foreign = Math.max(foreign, p.mag / maxMag);
  }
  const explained = total > 0 ? explainedE / total : 0;
  let openString = 0;
  ch.frets.forEach((f, i) => {
    if (f <= 0) return;
    const open = midiToFreq(STRINGS[i].midi);
    if (freqs.some((g) => [1, 2, 3].some((k) => near(open, k * g, 35)))) return;
    for (const p of peaks) if (near(p.freq, open, 40)) openString = Math.max(openString, p.mag / maxMag);
  });
  // Gleiche Töne auf zwei Saiten zählen einmal, sonst wären Griffe mit Doppeltönen im Vorteil.
  const unique = new Map<number, number>();
  midis.forEach((m, i) => unique.set(m, Math.max(unique.get(m) ?? 0, strings[i])));
  const vals = [...unique.values()];
  const presence = vals.reduce((s, v) => s + v, 0) / vals.length;
  const minPresence = Math.min(...vals);
  // Ein fremder Ton kostet Punkte: Sonst gewinnt bei G7 (0212) der Griff G (0232), dessen Töne alle mitklingen.
  const score = explained * (0.55 * presence + 0.45 * minPresence) * (1 - Math.min(1, foreign * 2));
  return { chord: ch.name, score, strings, explained, minPresence, foreign, openString };
}

export interface ChordVerdict {
  /** Erwarteter Akkord klar erkannt. */
  ok: boolean;
  /** Wahrscheinlichster Akkord aus der Bibliothek. */
  best: string;
  expected: ChordScore;
  /** Index der Saite (0 = G … 3 = A), die beim erwarteten Akkord fehlt, sonst -1. */
  weakString: number;
  /** 'open': gegriffene Saite klingt leer (Finger drückt nicht); 'muted': Saite klingt kaum (gedämpft). */
  weakKind: 'open' | 'muted' | '';
}

export function judgeChord(peaks: Peak[], expected: string, candidates: Chord[] = CHORDS): ChordVerdict | null {
  if (peaks.length < 2) return null;
  const scores = candidates.map((ch) => scoreChord(peaks, ch)).sort((a, b) => b.score - a.score);
  const exp = scores.find((s) => s.chord === expected);
  if (!exp) throw new Error(`Akkord ${expected} fehlt in den Kandidaten`);
  const best = scores[0];
  const runnerUp = scores.find((x) => x.chord !== expected)!;
  // Streng: jeder Ton des Griffs klingt, kein deutlicher fremder Ton, und der Griff liegt klar vor jedem anderen.
  const ok =
    exp.score >= TUNING.minScore &&
    exp.minPresence >= TUNING.minPresence &&
    exp.foreign < TUNING.maxForeign &&
    exp.openString < TUNING.maxOpenString &&
    exp.score > runnerUp.score;
  let weakString = -1;
  let weakKind: ChordVerdict['weakKind'] = '';
  if (!ok) {
    // Häufigster Anfängerfehler: ein Finger drückt nicht richtig, die Saite klingt leer. Passt der Griff mit dieser
    // leeren Saite besser als der gewünschte, ist das die Saite für den Hinweis.
    const ch = candidates.find((c) => c.name === expected)!;
    let bestVariant = exp.score;
    ch.frets.forEach((f, i) => {
      if (f === 0) return;
      const frets = ch.frets.slice() as Chord['frets'];
      frets[i] = 0;
      const v = scoreChord(peaks, { ...ch, frets });
      if (v.score > bestVariant + 0.05) {
        bestVariant = v.score;
        weakString = i;
        weakKind = 'open';
      }
    });
    if (weakString < 0 && exp.explained > 0.5) {
      let min = 0.25;
      exp.strings.forEach((v, i) => {
        if (v < min) {
          min = v;
          weakString = i;
          weakKind = 'muted';
        }
      });
    }
  }
  return { ok, best: best.chord, expected: exp, weakString, weakKind };
}

/** dB-Spektrum des AnalyserNode in lineare Beträge umrechnen. */
export function dbToLinear(db: Float32Array, out: Float32Array): Float32Array {
  for (let i = 0; i < db.length; i++) out[i] = db[i] === -Infinity ? 0 : Math.pow(10, db[i] / 20);
  return out;
}
