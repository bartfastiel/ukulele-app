/**
 * Grundfrequenz nach YIN (de Cheveigné & Kawahara 2002). Liefert null bei Stille oder ohne klare Periode.
 * Rechenaufwand: Fensterlänge × größte Periode – bei 2048 Samples und 48 kHz unter einer Millisekunde.
 */
export function detectPitch(
  buf: Float32Array,
  sampleRate: number,
  minFreq = 150,
  maxFreq = 1100,
  threshold = 0.12,
): { freq: number; clarity: number } | null {
  let rms = 0;
  for (let i = 0; i < buf.length; i++) rms += buf[i] * buf[i];
  rms = Math.sqrt(rms / buf.length);
  if (rms < 0.004) return null;

  const tauMin = Math.floor(sampleRate / maxFreq);
  const tauMax = Math.min(Math.floor(sampleRate / minFreq), Math.floor(buf.length / 2));
  const w = buf.length - tauMax;
  const d = new Float32Array(tauMax + 1);
  for (let tau = 1; tau <= tauMax; tau++) {
    let sum = 0;
    for (let i = 0; i < w; i++) {
      const diff = buf[i] - buf[i + tau];
      sum += diff * diff;
    }
    d[tau] = sum;
  }
  // kumulierte, normierte Differenz
  let running = 0;
  d[0] = 1;
  for (let tau = 1; tau <= tauMax; tau++) {
    running += d[tau];
    d[tau] = running > 0 ? (d[tau] * tau) / running : 1;
  }
  let tau = -1;
  for (let t = tauMin; t <= tauMax; t++) {
    if (d[t] < threshold) {
      while (t + 1 <= tauMax && d[t + 1] < d[t]) t++;
      tau = t;
      break;
    }
  }
  if (tau < 0) return null;
  // Tiefe Saiten (Gitarre E2) haben kurz vor dem richtigen Tal manchmal ein flacheres Nebental: im Umkreis von 10 %
  // gewinnt das tiefste Tal
  for (let t = Math.max(tauMin, Math.floor(tau * 0.9)); t <= Math.min(tauMax - 1, Math.ceil(tau * 1.1)); t++)
    if (d[t] < d[tau] && d[t] <= d[t - 1] && d[t] <= d[t + 1]) tau = t;
  // parabolische Interpolation für Bruchteile eines Samples
  let better = tau;
  if (tau > 1 && tau < tauMax) {
    const a = d[tau - 1];
    const b = d[tau];
    const c = d[tau + 1];
    const denom = a - 2 * b + c;
    if (denom !== 0) better = tau + (a - c) / (2 * denom);
  }
  return { freq: sampleRate / better, clarity: 1 - d[tau] };
}

/**
 * Wie detectPitch, aber für tiefe Töne (E-Bass ab 41 Hz) erst auf die halbe Abtastrate gebracht: Die längste Periode
 * passt dann mit genug Rest ins Fenster, und die Rechenzeit sinkt auf ein Viertel. Höhere Bereiche bleiben unverändert.
 */
export function detectPitchIn(buf: Float32Array, sampleRate: number, minFreq: number, maxFreq: number, threshold = 0.12): { freq: number; clarity: number } | null {
  if (minFreq >= 60 || maxFreq * 8 > sampleRate / 2) return detectPitch(buf, sampleRate, minFreq, maxFreq, threshold);
  const half = new Float32Array(buf.length >> 1);
  for (let i = 0; i < half.length; i++) half[i] = (buf[2 * i] + buf[2 * i + 1]) * 0.5;
  return detectPitch(half, sampleRate / 2, minFreq, maxFreq, threshold);
}

/** Abweichung in Cent von `target`. */
export function cents(freq: number, target: number): number {
  return 1200 * Math.log2(freq / target);
}
