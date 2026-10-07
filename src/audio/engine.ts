import { renderPluck } from './pluck.ts';
import { midiToFreq } from '../music/notes.ts';
import { chordMidis, chord as chordByName } from '../music/chords.ts';
import { stringMidi } from '../music/notes.ts';
import { instrument, onInstrumentChange } from '../music/instrument.ts';

type Ctx = AudioContext;

let ctx: Ctx | null = null;
/** Ohne Web Audio (sehr alte Browser) läuft die App stumm weiter; die Uhr kommt dann von performance.now(). */
let silent = false;
let master: GainNode | null = null;
const plucks = new Map<number, AudioBuffer>();
let clickHi: AudioBuffer | null = null;
let clickLo: AudioBuffer | null = null;
onInstrumentChange(() => plucks.clear());

interface AudioSessionNav {
  audioSession?: { type: string };
}

/** Den AudioContext erst bei einer Berührung anlegen bzw. fortsetzen – iOS spielt sonst nichts ab. */
export function audio(): Ctx {
  if (!ctx) {
    const Ctor: typeof AudioContext | undefined =
      window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) {
      silent = true;
      const t0 = performance.now();
      ctx = {
        get currentTime() {
          return (performance.now() - t0) / 1000;
        },
        state: 'running',
        sampleRate: 48000,
        resume: () => Promise.resolve(),
      } as unknown as Ctx;
      return ctx;
    }
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);
    // Safari ab 16.4: „playback“ spielt auch bei eingeschaltetem Lautlos-Schalter.
    const nav = navigator as unknown as AudioSessionNav;
    if (nav.audioSession) nav.audioSession.type = 'playback';
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

export function now(): number {
  return audio().currentTime;
}

/** Gemeinsamer Ausgang (Lautstärke) für weitere Klangquellen wie die Blues-Band. */
export function output(): AudioNode {
  audio();
  return master!;
}

export function hasAudio(): boolean {
  audio();
  return !silent;
}

function pluckBuffer(midi: number): AudioBuffer {
  let buf = plucks.get(midi);
  if (!buf) {
    const c = audio();
    const tone = instrument().synth;
    const data = renderPluck(midiToFreq(midi), c.sampleRate, tone.seconds, tone.brightness, midi, tone.sustain, tone.position);
    buf = c.createBuffer(1, data.length, c.sampleRate);
    buf.getChannelData(0).set(data);
    plucks.set(midi, buf);
  }
  return buf;
}

function play(buf: AudioBuffer, when: number, gain: number): void {
  const c = audio();
  if (silent) return;
  const src = c.createBufferSource();
  src.buffer = buf;
  const g = c.createGain();
  g.gain.value = gain;
  src.connect(g);
  g.connect(master!);
  src.start(Math.max(when, c.currentTime));
}

export function pluck(midi: number, when = 0, gain = 0.6): void {
  if (!hasAudio()) return;
  play(pluckBuffer(midi), when, gain);
}

/** Akkord anschlagen; abwärts von der oberen Saite (Ukulele G) zur unteren (A), aufwärts umgekehrt. */
export function strum(name: string, when = 0, gain = 0.35, up = false): void {
  const midis = chordMidis(chordByName(name));
  const order = up ? midis.slice().reverse() : midis;
  // sechs Saiten klingen zusammen lauter als vier
  const level = gain * (up ? 0.75 : 1) * Math.sqrt(4 / Math.max(4, midis.length));
  order.forEach((m, i) => pluck(m, when + i * 0.016, level));
}

/** Eine Saite des Griffs zupfen (Banjo-Roll); nicht angeschlagene Saiten bleiben still. */
export function pluckString(name: string, string: number, when = 0, gain = 0.4): void {
  const f = chordByName(name).frets[string];
  if (f === undefined || f < 0) return;
  pluck(stringMidi(string, f), when, gain);
}

function makeClick(freq: number): AudioBuffer {
  const c = audio();
  const n = Math.floor(c.sampleRate * 0.05);
  const buf = c.createBuffer(1, n, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) {
    const t = i / c.sampleRate;
    d[i] = Math.sin(2 * Math.PI * freq * t) * Math.exp(-t * 90);
  }
  return buf;
}

/** Holzblock-artiger Klick fürs Metronom. */
export function click(when = 0, accent = false, gain = 0.5): void {
  if (!hasAudio()) return;
  if (!clickHi) clickHi = makeClick(1600);
  if (!clickLo) clickLo = makeClick(1000);
  play(accent ? clickHi : clickLo, when, gain);
}

/** Kurzer, freundlicher Erfolgsklang (zwei Töne aufwärts). */
export function successSound(): void {
  const t = now();
  pluck(79, t, 0.35);
  pluck(84, t + 0.09, 0.35);
}
