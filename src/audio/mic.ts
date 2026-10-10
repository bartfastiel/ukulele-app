import { audio, hasAudio } from './engine.ts';

/**
 * Mikrofon-Eingang mit AnalyserNode. Echo-/Rauschunterdrückung und automatische Lautstärke sind aus, weil sie
 * gezupfte Töne verbiegen bzw. wegfiltern würden.
 */
export interface Mic {
  analyser: AnalyserNode;
  /** Rohes Mikrofonsignal, z. B. für Aufnahmen. */
  source: MediaStreamAudioSourceNode;
  sampleRate: number;
  /** Zeitbereich (für das Stimmgerät). */
  timeData(out: Float32Array): Float32Array;
  /** Betragsspektrum in dB (für die Akkorderkennung). */
  freqData(out: Float32Array): Float32Array;
  stop(): void;
}

export type MicState = 'unknown' | 'granted' | 'denied' | 'unsupported' | 'failed';

let current: Mic | null = null;
let state: MicState = 'unknown';
/** Name des letzten Fehlers beim Öffnen (für die Hilfe-Anzeige, z. B. „NotReadableError“). */
let lastError = '';

export function micError(): string {
  return lastError;
}

interface AudioSessionNav {
  audioSession?: { type: string };
}

/**
 * Safari ab 16.4 (iPad, iPhone, Mac) hat einen Audio-Modus: „playback“ spielt auch bei Lautlos-Schalter, sperrt aber das
 * Mikrofon. Vor dem Öffnen muss er auf „play-and-record“ stehen – danach umzuschalten ist zu spät.
 */
function sessionType(type: 'playback' | 'play-and-record'): void {
  const nav = navigator as unknown as AudioSessionNav;
  if (nav.audioSession && nav.audioSession.type !== type) nav.audioSession.type = type;
}

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
  sessionType('play-and-record');
  let stream: MediaStream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
    });
  } catch (e) {
    // DOMException ist in älterem Safari kein Error – den Namen direkt lesen
    const name = e && typeof e === 'object' ? (e as { name?: unknown }).name : undefined;
    lastError = typeof name === 'string' && name ? name : String(e);
    // gesperrt (Einstellungen, Nachfrage abgelehnt) oder belegt bzw. technisch nicht startbar
    state = lastError === 'NotAllowedError' || lastError === 'SecurityError' || lastError === 'PermissionDeniedError' ? 'denied' : 'failed';
    sessionType('playback');
    throw e;
  }
  state = 'granted';
  lastError = '';
  // der Moduswechsel kann den Audio-Kontext unterbrechen („interrupted“) – wieder anwerfen
  if (c.state !== 'running') await c.resume().catch(() => undefined);
  const source = c.createMediaStreamSource(stream);
  const analyser = c.createAnalyser();
  analyser.fftSize = 8192;
  analyser.smoothingTimeConstant = 0;
  analyser.minDecibels = -110;
  analyser.maxDecibels = -10;
  source.connect(analyser);
  // Safari rechnet nur Knoten, die (über Umwege) am Ausgang hängen – sonst bleibt der Analysator still. Stumm anschließen.
  const sink = c.createGain();
  sink.gain.value = 0;
  analyser.connect(sink);
  sink.connect(c.destination);
  const bytes = new Uint8Array(analyser.fftSize);
  const full = new Float32Array(analyser.fftSize);
  const mic: Mic = {
    analyser,
    source,
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
      sink.disconnect();
      sessionType('playback');
      current = null;
    },
  };
  current = mic;
  return mic;
}

export function closeMic(): void {
  if (current) current.stop();
}
