import { openMic, type Mic } from './mic.ts';
import { dbToLinear, findPeaks, judgeChord, type ChordVerdict } from './chord-detect.ts';
import { CHORDS } from '../music/chords.ts';

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

/** Hört ~12-mal pro Sekunde zu und meldet, sobald der erwartete Akkord klingt. */
export async function listenForChord(expected: string, ev: ListenEvents): Promise<ChordListener> {
  const mic: Mic = await openMic();
  const db = new Float32Array(mic.analyser.frequencyBinCount);
  const lin = new Float32Array(db.length);
  const time = new Float32Array(2048);
  const binHz = mic.sampleRate / mic.analyser.fftSize;
  let target = expected;
  let streak = 0;
  let paused = false;
  const timer = window.setInterval(() => {
    if (paused) return;
    mic.timeData(time);
    let rms = 0;
    for (let i = 0; i < time.length; i++) rms += time[i] * time[i];
    rms = Math.sqrt(rms / time.length);
    if (rms < 0.006) {
      streak = 0;
      ev.onVerdict?.(null, rms);
      return;
    }
    const peaks = findPeaks(dbToLinear(mic.freqData(db), lin), binHz);
    const v = judgeChord(peaks, target, CHORDS);
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
