import { openMic, type Mic } from './mic.ts';
import { hearingOwnSound } from './own-sound.ts';
import { dbToLinear, holdSpectrum, instrumentPeaks, judgeChord, type ChordVerdict } from './chord-detect.ts';
import { CHORDS, chord, parseChordName } from '../music/chords.ts';
import { detectPitchIn } from './pitch.ts';
import { freqToMidi, pitchClass } from '../music/notes.ts';
import { instrument } from '../music/instrument.ts';

export interface ChordListener {
  stop(): void;
  setExpected(name: string): void;
}

export interface ListenEvents {
  /** Akkord sicher erkannt (zweimal hintereinander). */
  onHit(name: string): void;
  /** Laufende Einschätzung, auch wenn es noch nicht passt (für Hinweise). */
  onVerdict?(v: ChordVerdict | null, level: number): void;
}

/** Bis hierhin hört der Bass-Lauscher: G-Saite im 12. Bund (G3) und – falls das Mikrofon die Oktave meldet – darüber. */
const NOTE_MAX_HZ = 420;

/** Tonklasse des Grundtons eines Akkordnamens („Am7“ → 9). */
export function rootClass(name: string): number {
  const p = parseChordName(name);
  return p ? p.root : -1;
}

/**
 * E-Bass: Er spielt nur den Grundton des Akkords. Gehört wird per Tonhöhe (YIN) und nur die Tonklasse verglichen – in
 * welcher Oktave und an welcher Stelle am Hals, ist egal, und ein Handy-Mikrofon, das statt des tiefen Grundtons nur
 * dessen Oktave hört, schadet nicht.
 */
async function listenForNote(expected: string, ev: ListenEvents): Promise<ChordListener> {
  const mic: Mic = await openMic();
  const buf = new Float32Array(4096);
  let target = expected;
  let streak = 0;
  let paused = false;
  const timer = window.setInterval(() => {
    if (paused) return;
    mic.timeData(buf);
    let rms = 0;
    for (let i = 0; i < buf.length; i++) rms += buf[i] * buf[i];
    rms = Math.sqrt(rms / buf.length);
    ev.onVerdict?.(null, rms);
    const p = rms < 0.006 || hearingOwnSound() ? null : detectPitchIn(buf, mic.sampleRate, instrument().tuner.minHz, NOTE_MAX_HZ);
    if (p && p.clarity > 0.85 && pitchClass(freqToMidi(p.freq)) === rootClass(target)) {
      streak++;
      if (streak >= 2) {
        streak = 0;
        paused = true;
        window.setTimeout(() => (paused = false), 500);
        ev.onHit(target);
      }
    } else streak = 0;
  }, 80);
  return {
    stop() {
      window.clearInterval(timer);
    },
    setExpected(name: string) {
      target = name;
      streak = 0;
    },
  };
}

/** Hört ~12-mal pro Sekunde zu und meldet, sobald der erwartete Akkord klingt (E-Bass: sein Grundton). */
export async function listenForChord(expected: string, ev: ListenEvents): Promise<ChordListener> {
  if (instrument().notesOnly) return listenForNote(expected, ev);
  const mic: Mic = await openMic();
  const db = new Float32Array(mic.analyser.frequencyBinCount);
  const lin = new Float32Array(db.length);
  const held = new Float32Array(db.length);
  const time = new Float32Array(2048);
  const binHz = mic.sampleRate / mic.analyser.fftSize;
  let target = expected;
  let streak = 0;
  let paused = false;
  const timer = window.setInterval(() => {
    if (paused) return;
    mic.timeData(time);
    // auch in leisen Momenten weiterführen, damit der Spitzenhalter genauso abklingt wie in der Offline-Auswertung
    holdSpectrum(held, dbToLinear(mic.freqData(db), lin));
    let rms = 0;
    for (let i = 0; i < time.length; i++) rms += time[i] * time[i];
    rms = Math.sqrt(rms / time.length);
    // was die App eben selbst gespielt hat, ist nie „richtig gespielt“
    if (rms < 0.006 || hearingOwnSound()) {
      streak = 0;
      ev.onVerdict?.(null, rms);
      return;
    }
    const peaks = instrumentPeaks(held, binHz);
    // transponierte Lieder können Akkorde außerhalb der Bibliothek verlangen
    const candidates = CHORDS.some((c) => c.name === target) ? CHORDS : CHORDS.concat([chord(target)]);
    const v = judgeChord(peaks, target, candidates);
    ev.onVerdict?.(v, rms);
    if (v && v.ok) {
      streak++;
      if (streak >= 2) {
        streak = 0;
        // kurz taub stellen, damit derselbe Anschlag nicht doppelt zählt
        paused = true;
        window.setTimeout(() => (paused = false), 500);
        ev.onHit(target);
      }
    } else streak = 0;
  }, 80);
  return {
    stop() {
      window.clearInterval(timer);
    },
    setExpected(name: string) {
      target = name;
      streak = 0;
    },
  };
}
