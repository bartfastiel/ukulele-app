import { test } from 'node:test';
import assert from 'node:assert/strict';
import { detectPitch, cents } from '../../src/audio/pitch.ts';
import { findPeaks, judgeChord } from '../../src/audio/chord-detect.ts';
import { renderPluck, renderStrum } from '../../src/audio/pluck.ts';
import { CHORDS, chord, chordMidis } from '../../src/music/chords.ts';
import { midiToFreq } from '../../src/music/notes.ts';

const SR = 48000;

/** Betragsspektrum mit Hann-Fenster, wie es der AnalyserNode liefert (nur linear statt dB). */
function spectrum(signal: Float32Array, start: number, size: number): Float32Array {
  const re = new Float64Array(size);
  const im = new Float64Array(size);
  for (let i = 0; i < size; i++) re[i] = (signal[start + i] ?? 0) * (0.5 - 0.5 * Math.cos((2 * Math.PI * i) / size));
  for (let i = 1, j = 0; i < size; i++) {
    let bit = size >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
  }
  for (let len = 2; len <= size; len <<= 1) {
    const ang = (-2 * Math.PI) / len;
    for (let i = 0; i < size; i += len)
      for (let k = 0; k < len / 2; k++) {
        const wr = Math.cos(ang * k);
        const wi = Math.sin(ang * k);
        const ur = re[i + k];
        const ui = im[i + k];
        const vr = re[i + k + len / 2] * wr - im[i + k + len / 2] * wi;
        const vi = re[i + k + len / 2] * wi + im[i + k + len / 2] * wr;
        re[i + k] = ur + vr;
        im[i + k] = ui + vi;
        re[i + k + len / 2] = ur - vr;
        im[i + k + len / 2] = ui - vi;
      }
  }
  const out = new Float32Array(size / 2);
  for (let i = 0; i < size / 2; i++) out[i] = Math.hypot(re[i], im[i]) / size;
  return out;
}

function strum(name: string, mute = -1): Float32Array {
  const freqs = chordMidis(chord(name))
    .map(midiToFreq)
    .filter((_, i) => i !== mute);
  return renderStrum(freqs, SR, 1.2);
}

function noisy(sig: Float32Array, amount: number): Float32Array {
  let s = 1;
  return sig.map((v) => {
    s = (s * 16807) % 2147483647;
    return v + amount * (s / 2147483647 - 0.5);
  });
}

test('Pluck klingt in der richtigen Tonhöhe (Karplus-Strong gestimmt)', () => {
  for (const midi of [60, 64, 67, 69, 72, 79]) {
    const sig = renderPluck(midiToFreq(midi), SR, 0.5);
    const p = detectPitch(sig.subarray(4800, 4800 + 2048), SR);
    assert.ok(p, `kein Ton bei ${midi}`);
    assert.ok(p && Math.abs(cents(p.freq, midiToFreq(midi))) < 6, `${midi}: ${p?.freq} Hz`);
  }
});

test('Stimmgerät erkennt verstimmte Saiten auf wenige Cent genau', () => {
  for (const [f, label] of [
    [392 * Math.pow(2, -30 / 1200), 'G -30'],
    [261.63 * Math.pow(2, 12 / 1200), 'C +12'],
    [329.63, 'E'],
    [440 * Math.pow(2, 45 / 1200), 'A +45'],
  ] as const) {
    const sig = noisy(renderPluck(f, SR, 0.4), 0.02);
    const p = detectPitch(sig.subarray(6000, 6000 + 2048), SR);
    assert.ok(p, label);
    assert.ok(p && Math.abs(cents(p.freq, f)) < 4, `${label}: ${p?.freq}`);
  }
});

test('Stille ergibt keinen Ton', () => {
  assert.equal(detectPitch(new Float32Array(2048), SR), null);
});

test('jeder Akkord der Bibliothek wird als er selbst erkannt', () => {
  for (const ch of CHORDS) {
    const sig = noisy(strum(ch.name), 0.01);
    const peaks = findPeaks(spectrum(sig, 4800, 8192), SR / 8192);
    const v = judgeChord(peaks, ch.name);
    assert.ok(v?.ok, `${ch.name}: erkannt als ${v?.best}, score ${v?.expected.score.toFixed(2)}`);
  }
});

test('falscher Akkord wird nicht durchgewunken (Lied-Akkorde gegeneinander)', () => {
  const pairs = [
    ['C', 'Am'],
    ['C', 'F'],
    ['C', 'G7'],
    ['F', 'C7'],
    ['Am', 'F'],
    ['G7', 'C'],
    ['C7', 'C'],
    ['Am7', 'C'],
    ['C', 'C7'],
  ];
  for (const [played, expected] of pairs) {
    const peaks = findPeaks(spectrum(strum(played), 4800, 8192), SR / 8192);
    const v = judgeChord(peaks, expected);
    assert.ok(!v?.ok, `${played} gespielt, aber als ${expected} akzeptiert`);
  }
});

test('Saite, die leer statt gegriffen klingt, wird benannt', () => {
  // C-Akkord, aber der Ringfinger drückt nicht: die A-Saite klingt leer (das ist Am7)
  const v1 = judgeChord(findPeaks(spectrum(strum('Am7'), 4800, 8192), SR / 8192), 'C');
  assert.ok(v1 && !v1.ok, 'Am7 darf nicht als C gelten');
  assert.equal(v1?.weakString, 3);
  // F-Akkord, aber der Zeigefinger auf der E-Saite fehlt (Bünde 2000 = Am)
  const v2 = judgeChord(findPeaks(spectrum(strum('Am'), 4800, 8192), SR / 8192), 'F');
  assert.ok(v2 && !v2.ok);
  assert.equal(v2?.weakString, 2);
});
