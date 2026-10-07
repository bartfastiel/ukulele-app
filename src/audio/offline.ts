import { holdSpectrum, instrumentPeaks, judgeChord } from './chord-detect.ts';
import { CHORDS, type Chord } from '../music/chords.ts';

/**
 * Offline-Nachbau dessen, was die App live tut: Spektrum wie der AnalyserNode (Blackman-Fenster, Betrag/N),
 * Messung alle 80 ms, Pegelschwelle und Zweier-Bestätigung wie in listen.ts. Für Tests und für die Auswertung
 * echter Aufnahmen (tools/eval-recordings.ts).
 */
export const FFT_SIZE = 8192;
export const HOP_SECONDS = 0.08;
const RMS_GATE = 0.006;

export function spectrum(signal: Float32Array, end: number, size = FFT_SIZE): Float32Array {
  const re = new Float64Array(size);
  const im = new Float64Array(size);
  const start = end - size;
  for (let i = 0; i < size; i++) {
    const w = 0.42 - 0.5 * Math.cos((2 * Math.PI * i) / size) + 0.08 * Math.cos((4 * Math.PI * i) / size);
    const x = start + i >= 0 && start + i < signal.length ? signal[start + i] : 0;
    re[i] = x * w;
  }
  for (let i = 1, j = 0; i < size; i++) {
    let bit = size >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      const tr = re[i];
      re[i] = re[j];
      re[j] = tr;
      const ti = im[i];
      im[i] = im[j];
      im[j] = ti;
    }
  }
  for (let len = 2; len <= size; len <<= 1) {
    const ang = (-2 * Math.PI) / len;
    const half = len >> 1;
    for (let k = 0; k < half; k++) {
      const wr = Math.cos(ang * k);
      const wi = Math.sin(ang * k);
      for (let i = k; i < size; i += len) {
        const vr = re[i + half] * wr - im[i + half] * wi;
        const vi = re[i + half] * wi + im[i + half] * wr;
        re[i + half] = re[i] - vr;
        im[i + half] = im[i] - vi;
        re[i] += vr;
        im[i] += vi;
      }
    }
  }
  const out = new Float32Array(size / 2);
  for (let i = 0; i < size / 2; i++) out[i] = Math.hypot(re[i], im[i]) / size;
  return out;
}

function rms(signal: Float32Array, end: number, n = 2048): number {
  let sum = 0;
  const start = Math.max(0, end - n);
  for (let i = start; i < end; i++) sum += signal[i] * signal[i];
  return Math.sqrt(sum / Math.max(1, end - start));
}

export interface TakeResult {
  /** Akkordname → Zeitpunkt (s), zu dem die App ihn als „richtig“ gemeldet hätte. Fehlt = nie. */
  accepted: Record<string, number>;
  /** Anteil der Messungen über der Pegelschwelle. */
  loudFrames: number;
}

/** Spielt eine Aufnahme durch den Lauscher – für jeden Akkord der Liste, als wäre er der erwartete. */
export function evaluateRecording(signal: Float32Array, sampleRate: number, chords: Chord[] = CHORDS): TakeResult {
  const hop = Math.round(HOP_SECONDS * sampleRate);
  const binHz = sampleRate / FFT_SIZE;
  const streak: Record<string, number> = {};
  const accepted: Record<string, number> = {};
  let frames = 0;
  let loud = 0;
  const held = new Float32Array(FFT_SIZE / 2);
  for (let end = FFT_SIZE; end <= signal.length; end += hop) {
    frames++;
    const spec = holdSpectrum(held, spectrum(signal, end));
    if (rms(signal, end) < RMS_GATE) {
      chords.forEach((c) => (streak[c.name] = 0));
      continue;
    }
    loud++;
    const peaks = instrumentPeaks(spec, binHz);
    for (const c of chords) {
      if (accepted[c.name] !== undefined) continue;
      const v = judgeChord(peaks, c.name, CHORDS);
      streak[c.name] = v && v.ok ? (streak[c.name] || 0) + 1 : 0;
      if (streak[c.name] >= 2) accepted[c.name] = end / sampleRate;
    }
  }
  return { accepted, loudFrames: frames ? loud / frames : 0 };
}
