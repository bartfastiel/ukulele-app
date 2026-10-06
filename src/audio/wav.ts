/** 16-Bit-PCM-WAV, mono – das Format, das jedes Werkzeug ohne Umwege lesen kann. */
export function encodeWav(samples: Float32Array, sampleRate: number): Uint8Array {
  const buf = new ArrayBuffer(44 + samples.length * 2);
  const v = new DataView(buf);
  const str = (o: number, t: string) => {
    for (let i = 0; i < t.length; i++) v.setUint8(o + i, t.charCodeAt(i));
  };
  str(0, 'RIFF');
  v.setUint32(4, 36 + samples.length * 2, true);
  str(8, 'WAVE');
  str(12, 'fmt ');
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true);
  v.setUint16(22, 1, true);
  v.setUint32(24, sampleRate, true);
  v.setUint32(28, sampleRate * 2, true);
  v.setUint16(32, 2, true);
  v.setUint16(34, 16, true);
  str(36, 'data');
  v.setUint32(40, samples.length * 2, true);
  for (let i = 0; i < samples.length; i++) v.setInt16(44 + i * 2, Math.max(-1, Math.min(1, samples[i])) * 0x7fff, true);
  return new Uint8Array(buf);
}

/** Liest 16-Bit-PCM-WAV (mono oder Stereo → Mittelwert); andere Formate werden abgelehnt. */
export function decodeWav(bytes: Uint8Array): { samples: Float32Array; sampleRate: number } {
  const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const tag = (o: number) => String.fromCharCode(bytes[o], bytes[o + 1], bytes[o + 2], bytes[o + 3]);
  if (tag(0) !== 'RIFF' || tag(8) !== 'WAVE') throw new Error('kein WAV');
  let pos = 12;
  let channels = 1;
  let sampleRate = 48000;
  let bits = 16;
  while (pos + 8 <= bytes.length) {
    const id = tag(pos);
    const size = v.getUint32(pos + 4, true);
    if (id === 'fmt ') {
      channels = v.getUint16(pos + 10, true);
      sampleRate = v.getUint32(pos + 12, true);
      bits = v.getUint16(pos + 22, true);
    } else if (id === 'data') {
      if (bits !== 16) throw new Error(`nur 16 Bit unterstützt, nicht ${bits}`);
      const frames = Math.floor(size / 2 / channels);
      const samples = new Float32Array(frames);
      for (let i = 0; i < frames; i++) {
        let sum = 0;
        for (let c = 0; c < channels; c++) sum += v.getInt16(pos + 8 + (i * channels + c) * 2, true);
        samples[i] = sum / channels / 0x8000;
      }
      return { samples, sampleRate };
    }
    pos += 8 + size + (size & 1);
  }
  throw new Error('WAV ohne Daten');
}
