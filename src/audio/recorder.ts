import { audio } from './engine.ts';
import type { Mic } from './mic.ts';

export interface Recording {
  stop(): Float32Array;
  /** Pegel der letzten ~85 ms: RMS und Spitze (0..1). */
  level(): { rms: number; peak: number };
}

/**
 * Nimmt das rohe Mikrofonsignal auf. ScriptProcessorNode ist veraltet, läuft aber überall ohne Zusatzdatei –
 * für ein Aufnahmewerkzeug, das nicht im Takt spielen muss, genügt das.
 */
export function startRecording(mic: Mic): Recording {
  const c = audio();
  const proc = c.createScriptProcessor(4096, 1, 1);
  const chunks: Float32Array[] = [];
  let rms = 0;
  let peak = 0;
  proc.onaudioprocess = (e) => {
    const data = e.inputBuffer.getChannelData(0);
    chunks.push(new Float32Array(data));
    let sum = 0;
    let p = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i] * data[i];
      const a = Math.abs(data[i]);
      if (a > p) p = a;
    }
    rms = Math.sqrt(sum / data.length);
    peak = p;
  };
  // Chrome ruft den Prozessor nur auf, wenn er mit dem Ausgang verbunden ist – stumm geschaltet, damit nichts rückkoppelt
  const mute = c.createGain();
  mute.gain.value = 0;
  mic.source.connect(proc);
  proc.connect(mute);
  mute.connect(c.destination);
  return {
    stop() {
      mic.source.disconnect(proc);
      proc.disconnect();
      mute.disconnect();
      proc.onaudioprocess = null;
      const out = new Float32Array(chunks.reduce((s, ch) => s + ch.length, 0));
      let pos = 0;
      for (const ch of chunks) {
        out.set(ch, pos);
        pos += ch.length;
      }
      return out;
    },
    level: () => ({ rms, peak }),
  };
}
