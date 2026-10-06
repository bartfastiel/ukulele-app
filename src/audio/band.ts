import { audio, hasAudio, output } from './engine.ts';
import { midiToFreq } from '../music/notes.ts';

/**
 * Begleitband für den Blues – bewusst keine Ukulele, damit das Kind seine eigene Stimme hört: Bass (Dreieck,
 * gefiltert), Orgel-Akzente (Rechteck, gefiltert) und Schlagzeug aus Rauschen. Alles aus Oszillatoren, keine
 * Samples. Die Orgel bleibt unter 240 Hz, damit das Mikrofon die Ukulele-Töne darüber noch sauber hört.
 */
let noise: AudioBuffer | null = null;

function noiseBuffer(): AudioBuffer {
  if (!noise) {
    const c = audio();
    noise = c.createBuffer(1, Math.floor(c.sampleRate * 0.5), c.sampleRate);
    const d = noise.getChannelData(0);
    let s = 1;
    for (let i = 0; i < d.length; i++) {
      s = (s * 16807) % 2147483647;
      d[i] = s / 2147483647 - 0.5;
    }
  }
  return noise;
}

function env(g: GainNode, when: number, peak: number, attack: number, release: number): void {
  g.gain.setValueAtTime(0.0001, when);
  g.gain.linearRampToValueAtTime(peak, when + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, when + attack + release);
}

export function bass(midi: number, when: number, dur: number, gain = 0.5): void {
  if (!hasAudio()) return;
  const c = audio();
  const o = c.createOscillator();
  o.type = 'triangle';
  o.frequency.value = midiToFreq(midi);
  const f = c.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.value = 500;
  const g = c.createGain();
  env(g, when, gain, 0.008, Math.max(0.12, dur * 0.95));
  o.connect(f);
  f.connect(g);
  g.connect(output());
  o.start(when);
  o.stop(when + dur + 0.1);
}

export function organ(midis: number[], when: number, dur: number, gain = 0.06): void {
  if (!hasAudio()) return;
  const c = audio();
  const f = c.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.value = 700;
  const g = c.createGain();
  env(g, when, gain, 0.01, dur);
  f.connect(g);
  g.connect(output());
  for (const m of midis) {
    const o = c.createOscillator();
    o.type = 'square';
    o.frequency.value = midiToFreq(m);
    o.connect(f);
    o.start(when);
    o.stop(when + dur + 0.05);
  }
}

function hit(when: number, type: BiquadFilterType, freq: number, gain: number, decay: number): void {
  const c = audio();
  const src = c.createBufferSource();
  src.buffer = noiseBuffer();
  const f = c.createBiquadFilter();
  f.type = type;
  f.frequency.value = freq;
  const g = c.createGain();
  env(g, when, gain, 0.002, decay);
  src.connect(f);
  f.connect(g);
  g.connect(output());
  src.start(when);
  src.stop(when + decay + 0.05);
}

export function kick(when: number, gain = 0.8): void {
  if (!hasAudio()) return;
  const c = audio();
  const o = c.createOscillator();
  o.frequency.setValueAtTime(110, when);
  o.frequency.exponentialRampToValueAtTime(42, when + 0.12);
  const g = c.createGain();
  env(g, when, gain, 0.003, 0.18);
  o.connect(g);
  g.connect(output());
  o.start(when);
  o.stop(when + 0.25);
}

export function snare(when: number, gain = 0.25): void {
  if (hasAudio()) hit(when, 'bandpass', 1800, gain, 0.14);
}

export function hat(when: number, gain = 0.08): void {
  if (hasAudio()) hit(when, 'highpass', 7000, gain, 0.04);
}
