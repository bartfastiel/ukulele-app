import { CHORDS, chordMidis, type Chord } from '../music/chords.ts';
import { midiToFreq } from '../music/notes.ts';

/**
 * Akkorderkennung aus einem Betragsspektrum (linear, z. B. aus AnalyserNode.getFloatFrequencyData umgerechnet).
 *
 * Statt Tonklassen (Chroma) zu vergleichen, prüft sie jede Saite des erwarteten Griffs einzeln: Klingt die
 * Grundfrequenz (oder ihre Oktave) der Saite? Und wie viel der Energie erklärt der Griff überhaupt? So lassen sich
 * auch nah verwandte Griffe wie C (0003) und Am7 (0000) unterscheiden, und die Rückmeldung kann eine Saite nennen.
 */

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
}

export function scoreChord(peaks: Peak[], ch: Chord): ChordScore {
  const midis = chordMidis(ch);
  const freqs = midis.map(midiToFreq);
  const maxMag = peaks.reduce((m, p) => Math.max(m, p.mag), 0) || 1;
  const strings = freqs.map((f) => {
    let best = 0;
    for (const p of peaks) {
      if (near(p.freq, f, 40)) best = Math.max(best, p.mag);
      else if (near(p.freq, 2 * f, 40)) best = Math.max(best, p.mag * 0.6);
    }
    return Math.min(1, best / maxMag / 0.25);
  });
  let total = 0;
  let explainedE = 0;
  // Nur Grundtöne der ersten Lage (261–523 Hz) und ihre ersten Obertöne liegen im Fenster; linear gewichtet, damit
  // ein einzelner fremder Ton (z. B. leere A-Saite statt C) nicht in den starken Obertönen untergeht.
  for (const p of peaks) {
    total += p.mag;
    if (freqs.some((f) => [1, 2, 3].some((k) => near(p.freq, k * f, 35)))) explainedE += p.mag;
  }
  const explained = total > 0 ? explainedE / total : 0;
  // Gleiche Töne auf zwei Saiten zählen einmal, sonst wären Griffe mit Doppeltönen im Vorteil.
  const unique = new Map<number, number>();
  midis.forEach((m, i) => unique.set(m, Math.max(unique.get(m) ?? 0, strings[i])));
  const vals = [...unique.values()];
  const presence = vals.reduce((s, v) => s + v, 0) / vals.length;
  const minPresence = Math.min(...vals);
  const score = explained * (0.55 * presence + 0.45 * minPresence);
  return { chord: ch.name, score, strings, explained };
}

export interface ChordVerdict {
  /** Erwarteter Akkord klar erkannt. */
  ok: boolean;
  /** Wahrscheinlichster Akkord aus der Bibliothek. */
  best: string;
  expected: ChordScore;
  /** Index der Saite (0 = G … 3 = A), die beim erwarteten Akkord fehlt, sonst -1. */
  weakString: number;
}

export function judgeChord(peaks: Peak[], expected: string, candidates: Chord[] = CHORDS): ChordVerdict | null {
  if (peaks.length < 2) return null;
  const scores = candidates.map((ch) => scoreChord(peaks, ch)).sort((a, b) => b.score - a.score);
  const exp = scores.find((s) => s.chord === expected);
  if (!exp) throw new Error(`Akkord ${expected} fehlt in den Kandidaten`);
  const best = scores[0];
  const ok = exp.score >= 0.42 && exp.score >= best.score - 0.02;
  let weakString = -1;
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
      }
    });
    if (weakString < 0 && exp.explained > 0.5) {
      let min = 0.25;
      exp.strings.forEach((v, i) => {
        if (v < min) {
          min = v;
          weakString = i;
        }
      });
    }
  }
  return { ok, best: best.chord, expected: exp, weakString };
}

/** dB-Spektrum des AnalyserNode in lineare Beträge umrechnen. */
export function dbToLinear(db: Float32Array, out: Float32Array): Float32Array {
  for (let i = 0; i < db.length; i++) out[i] = db[i] === -Infinity ? 0 : Math.pow(10, db[i] / 20);
  return out;
}
