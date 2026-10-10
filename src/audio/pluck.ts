/**
 * Gezupfte Saite nach Karplus-Strong mit gebrochener Verzögerung (lineare Interpolation), damit auch hohe
 * Töne sauber gestimmt sind. Läuft ohne Web Audio, damit Tests und das Testsignal-Werkzeug dieselben Klänge erzeugen.
 * `sustain` verlängert (Gitarre) oder verkürzt (Banjo) das Ausklingen; `position` ist die Zupfstelle – nah am Steg
 * (kleiner Wert) klingt es heller und dünner.
 */
export function renderPluck(freq: number, sampleRate: number, seconds = 1.6, brightness = 0.5, seed = 1, sustain = 1, position = 0.3): Float32Array {
  const n = Math.floor(sampleRate * seconds);
  const out = new Float32Array(n);
  // Die Mittelwertbildung zweier Nachbarn verzögert um ein halbes Sample.
  const delay = sampleRate / freq - 0.5;
  const excite = Math.min(n, Math.ceil(delay) + 1);
  // Anregung wie beim echten Zupfen: dreieckige Auslenkung (Zupfstelle, Ukulele bei 30 % der Länge) plus etwas Rauschen.
  // Reines Rauschen hätte je nach Zufallsfolge kaum Grundton – die Saite klänge mal laut, mal fast stumm.
  let s = seed * 7919;
  let prev = 0;
  let mean = 0;
  for (let i = 0; i < excite; i++) {
    s = (s * 9301 + 49297) % 233280;
    const x = i / excite;
    const tri = x < position ? x / position : (1 - x) / (1 - position);
    prev += brightness * (s / 233280 - 0.5 - prev);
    out[i] = 0.8 * (tri - 0.5) + 0.6 * prev;
    mean += out[i];
  }
  mean /= excite;
  for (let i = 0; i < excite; i++) out[i] -= mean;
  const decay = Math.pow(0.001, 1 / (freq * Math.max(0.7, 2.4 - freq / 500) * sustain));
  const at = (pos: number) => {
    const i0 = Math.floor(pos);
    return out[i0] + (out[i0 + 1] - out[i0]) * (pos - i0);
  };
  for (let i = excite; i < n; i++) {
    const p = i - delay;
    out[i] = decay * 0.5 * (at(p) + at(p - 1));
  }
  const fadeOut = Math.min(n, Math.floor(sampleRate * 0.08));
  for (let i = 0; i < fadeOut; i++) out[n - 1 - i] *= i / fadeOut;
  let peak = 0;
  for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(out[i]));
  if (peak > 0) for (let i = 0; i < n; i++) out[i] /= peak;
  return out;
}

/** Einfacher Verzerrer wie bei einem kleinen Gitarrenverstärker: weich begrenzen, dann wieder auf volle Lautstärke. */
export function overdrive(data: Float32Array, drive: number): void {
  const norm = Math.tanh(drive);
  for (let i = 0; i < data.length; i++) data[i] = Math.tanh(drive * data[i]) / norm;
}

export interface Tone {
  brightness: number;
  sustain: number;
  position: number;
}

/** Mischt mehrere Saiten zu einem Anschlag (Strum) mit kleinem Versatz je Saite; ohne `tone` wie eine Ukulele. */
export function renderStrum(freqs: number[], sampleRate: number, seconds = 2, spreadMs = 18, tone?: Tone): Float32Array {
  const n = Math.floor(sampleRate * seconds);
  const out = new Float32Array(n);
  freqs.forEach((f, i) => {
    const offset = Math.floor((i * spreadMs * sampleRate) / 1000);
    const note = tone
      ? renderPluck(f, sampleRate, seconds, tone.brightness, i + 1, tone.sustain, tone.position)
      : renderPluck(f, sampleRate, seconds, 0.55, i + 1);
    for (let j = 0; j + offset < n; j++) out[j + offset] += note[j] * 0.3;
  });
  return out;
}
