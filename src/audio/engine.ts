import { overdrive, renderPluck } from './pluck.ts';
import { midiToFreq } from '../music/notes.ts';
import { chord as chordByName } from '../music/chords.ts';
import { stringMidi } from '../music/notes.ts';
import { onInstrumentChange, twelveString, voice } from '../music/instrument.ts';

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
    const tone = voice();
    const data = renderPluck(midiToFreq(midi), c.sampleRate, tone.seconds, tone.brightness, midi, tone.sustain, tone.position);
    if (tone.course) {
      const pair = renderPluck(midiToFreq(midi) * Math.pow(2, tone.course / 1200), c.sampleRate, tone.seconds, tone.brightness, midi + 97, tone.sustain, tone.position);
      for (let i = 0; i < data.length; i++) data[i] = (data[i] + pair[i]) * 0.5;
    }
    if (tone.drive) overdrive(data, tone.drive);
    buf = c.createBuffer(1, data.length, c.sampleRate);
    buf.getChannelData(0).set(data);
    plucks.set(midi, buf);
  }
  return buf;
}

function play(buf: AudioBuffer, when: number, gain: number, bend = 0): void {
  const c = audio();
  if (silent) return;
  const src = c.createBufferSource();
  src.buffer = buf;
  if (bend) {
    // gezogene Saite: erst gerade anschlagen, dann gleitend um `bend` Halbtöne hoch
    const t0 = Math.max(when, c.currentTime);
    src.playbackRate.setValueAtTime(1, t0 + 0.07);
    src.playbackRate.linearRampToValueAtTime(Math.pow(2, bend / 12), t0 + 0.32);
  }
  const g = c.createGain();
  g.gain.value = gain;
  src.connect(g);
  g.connect(master!);
  src.start(Math.max(when, c.currentTime));
}

/** Einen Ton zupfen; `bend` zieht ihn nach dem Anschlag um so viele Halbtöne hoch. */
export function pluck(midi: number, when = 0, gain = 0.6, bend = 0): void {
  if (!hasAudio()) return;
  play(pluckBuffer(midi), when, gain, bend);
}

/** Ein gegriffener Ton, der klingt, solange der Finger liegt, und sich dabei verändern lässt. */
export interface Voice {
  /** Tonhöhe relativ zum Anschlag in Halbtönen (Ziehen, Rutschen); `glide` = Zeitkonstante in s. */
  pitch(semis: number, glide?: number): void;
  /** Vibrato: Schwingungen pro Sekunde und Tiefe in Cent (0 = aus). */
  vibrato(rate: number, cents: number): void;
  /** Finger weg: kurz Angetipptes klingt aus wie gezupft, lange Gehaltenes wird gedämpft; `ring` lässt es ausklingen. */
  release(ring?: boolean): void;
}

const SILENT_VOICE: Voice = { pitch: () => undefined, vibrato: () => undefined, release: () => undefined };
/** Wah (0 = zu, dunkel … 1 = offen, hell; null = aus) gilt für alle klingenden und neuen Töne. */
let wahLevel: number | null = null;
const live: { filter: BiquadFilterNode }[] = [];

function wahTarget(f: BiquadFilterNode, at: number): void {
  if (wahLevel === null) {
    f.frequency.setTargetAtTime(18000, at, 0.02);
    f.Q.setTargetAtTime(0.7, at, 0.02);
  } else {
    // ein Tiefpass mit Resonanz, der zwischen 450 Hz und 3,2 kHz wandert – wie ein Wah-Pedal
    f.frequency.setTargetAtTime(450 * Math.pow(3200 / 450, wahLevel), at, 0.03);
    f.Q.setTargetAtTime(6, at, 0.03);
  }
}

export function setWah(level: number | null): void {
  wahLevel = level === null ? null : Math.max(0, Math.min(1, level));
  if (silent || !ctx) return;
  for (const v of live) wahTarget(v.filter, ctx.currentTime);
}

/** Ton anschlagen und halten; `bend` zieht ihn kurz nach dem Anschlag selbst um so viele Halbtöne hoch. */
export function hold(midi: number, gain = 0.6, bend = 0): Voice {
  if (!hasAudio()) return SILENT_VOICE;
  const c = audio();
  const t0 = c.currentTime;
  const src = c.createBufferSource();
  src.buffer = pluckBuffer(midi);
  const filter = c.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 18000;
  wahTarget(filter, t0);
  const g = c.createGain();
  g.gain.value = gain;
  const lfo = c.createOscillator();
  lfo.frequency.value = 5;
  const depth = c.createGain();
  depth.gain.value = 0;
  lfo.connect(depth);
  depth.connect(src.playbackRate);
  src.connect(filter);
  filter.connect(g);
  g.connect(master!);
  if (bend) {
    src.playbackRate.setValueAtTime(1, t0 + 0.07);
    src.playbackRate.linearRampToValueAtTime(Math.pow(2, bend / 12), t0 + 0.32);
  }
  src.start(t0);
  lfo.start(t0);
  const entry = { filter };
  live.push(entry);
  let ended = false;
  const end = (at: number | null) => {
    if (ended) return;
    ended = true;
    if (at !== null) src.stop(at);
    lfo.stop(at === null ? c.currentTime : at);
    const i = live.indexOf(entry);
    if (i >= 0) live.splice(i, 1);
  };
  // ausgeklungen, obwohl der Finger noch liegt
  src.onended = () => end(null);
  return {
    pitch(semis, glide = 0.03) {
      if (ended) return;
      src.playbackRate.cancelScheduledValues(c.currentTime);
      src.playbackRate.setTargetAtTime(Math.pow(2, semis / 12), c.currentTime, glide);
    },
    vibrato(rate, cents) {
      if (ended) return;
      lfo.frequency.setTargetAtTime(Math.max(1, rate), c.currentTime, 0.05);
      depth.gain.setTargetAtTime(Math.pow(2, cents / 1200) - 1, c.currentTime, cents ? 0.06 : 0.26);
    },
    release(ring = false) {
      if (ended) return;
      const now = c.currentTime;
      // kurz getippt: wie gezupft weiterklingen lassen; gehalten: Finger hebt ab, die Saite wird gedämpft
      const tau = ring || now - t0 < 0.18 ? 0.35 : 0.07;
      g.gain.setTargetAtTime(0, now, tau);
      end(now + tau * 8);
    },
  };
}

/** Akkord anschlagen; abwärts von der oberen Saite (Ukulele G) zur unteren (A), aufwärts umgekehrt. */
export function strum(name: string, when = 0, gain = 0.35, up = false): void {
  const ch = chordByName(name);
  const notes: { midi: number; string: number }[] = [];
  ch.frets.forEach((f, i) => {
    if (f >= 0) notes.push({ midi: stringMidi(i, f), string: i });
  });
  const order = up ? notes.slice().reverse() : notes;
  // sechs Saiten klingen zusammen lauter als vier
  const level = gain * (up ? 0.75 : 1) * Math.sqrt(4 / Math.max(4, notes.length));
  order.forEach((n, i) => pluckCourse(n.midi, n.string, when + i * 0.016, level));
}

/** Eine Saite, bei der 12-saitigen Gitarre mit ihrer Partnerin (die vier tiefen eine Oktave höher). */
export function pluckCourse(midi: number, string: number, when = 0, gain = 0.6): void {
  pluck(midi, when, gain);
  if (twelveString()) pluck(string < 4 ? midi + 12 : midi, when + 0.006, gain * (string < 4 ? 0.45 : 0.6));
}

/** Eine Saite des Griffs zupfen (Banjo-Roll); nicht angeschlagene Saiten bleiben still. */
export function pluckString(name: string, string: number, when = 0, gain = 0.4): void {
  const f = chordByName(name).frets[string];
  if (f === undefined || f < 0) return;
  pluckCourse(stringMidi(string, f), string, when, gain);
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
