import { audio, hasAudio } from './engine.ts';

/**
 * Mikrofon-Eingang mit AnalyserNode. Echo-/Rauschunterdrückung und automatische Lautstärke sind aus, weil sie
 * gezupfte Töne verbiegen bzw. wegfiltern würden.
 */
export interface Mic {
  analyser: AnalyserNode;
  sampleRate: number;
  /** Zeitbereich (für das Stimmgerät). */
  timeData(out: Float32Array): Float32Array;
  /** Betragsspektrum in dB (für die Akkorderkennung). */
  freqData(out: Float32Array): Float32Array;
  stop(): void;
}

export type MicState = 'unknown' | 'granted' | 'denied' | 'unsupported';

let current: Mic | null = null;
let state: MicState = 'unknown';

export function micState(): MicState {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !hasAudio()) return 'unsupported';
  return state;
}

export async function openMic(): Promise<Mic> {
  if (current) return current;
  const c = audio();
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !hasAudio()) {
    state = 'unsupported';
    throw new Error('unsupported');
  }
  let stream: MediaStream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
    });
  } catch (e) {
    state = 'denied';
    throw e;
  }
  state = 'granted';
  const nav = navigator as unknown as { audioSession?: { type: string } };
  if (nav.audioSession) nav.audioSession.type = 'play-and-record';
  if (c.state === 'suspended') await c.resume();
  const source = c.createMediaStreamSource(stream);
  const analyser = c.createAnalyser();
  analyser.fftSize = 8192;
  analyser.smoothingTimeConstant = 0;
  analyser.minDecibels = -110;
  analyser.maxDecibels = -10;
  source.connect(analyser);
  const bytes = new Uint8Array(analyser.fftSize);
  const full = new Float32Array(analyser.fftSize);
  const mic: Mic = {
    analyser,
    sampleRate: c.sampleRate,
    timeData(out) {
      // Die jüngsten Samples stehen am Ende des Puffers; ältere Safari-Versionen kennen nur die Byte-Variante.
      const offset = full.length - out.length;
      if (typeof analyser.getFloatTimeDomainData === 'function') {
        analyser.getFloatTimeDomainData(full);
        out.set(full.subarray(offset));
      } else {
        analyser.getByteTimeDomainData(bytes);
        for (let i = 0; i < out.length; i++) out[i] = (bytes[offset + i] - 128) / 128;
      }
      return out;
    },
    freqData(out) {
      analyser.getFloatFrequencyData(out as Float32Array<ArrayBuffer>);
      return out;
    },
    stop() {
      stream.getTracks().forEach((t) => t.stop());
      source.disconnect();
      current = null;
    },
  };
  current = mic;
  return mic;
}

export function closeMic(): void {
  if (current) current.stop();
}
