/**
 * Anschrift und E-Mail fürs Impressum: weder im Repo noch als Text im HTML. Der Build verpackt sie in vertauschte,
 * einzeln verschlüsselte Bruchstücke (kein Schutz vor gezieltem Lesen, aber kein Treffer für Programme, die Seiten nach
 * Adressmustern absuchen); im Browser setzt src/ui/secret-text.ts sie als Grafik zusammen.
 */

function utf8(text: string): number[] {
  const out: number[] = [];
  const enc = unescape(encodeURIComponent(text));
  for (let i = 0; i < enc.length; i++) out.push(enc.charCodeAt(i));
  return out;
}

function fromUtf8(bytes: number[]): string {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return decodeURIComponent(escape(s));
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

function toB64(bytes: number[]): string {
  let out = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const n = (bytes[i] << 16) | ((bytes[i + 1] || 0) << 8) | (bytes[i + 2] || 0);
    out += ALPHABET[(n >> 18) & 63] + ALPHABET[(n >> 12) & 63];
    if (i + 1 < bytes.length) out += ALPHABET[(n >> 6) & 63];
    if (i + 2 < bytes.length) out += ALPHABET[n & 63];
  }
  return out;
}

function fromB64(text: string): number[] {
  const out: number[] = [];
  let buf = 0;
  let bits = 0;
  for (let i = 0; i < text.length; i++) {
    buf = (buf << 6) | ALPHABET.indexOf(text[i]);
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      out.push((buf >> bits) & 255);
    }
  }
  return out;
}

/** Zufall nur für die Verpackung; `rand` lässt sich für Tests festlegen. */
export function scramble(text: string, rand: () => number = Math.random): string {
  const bytes = utf8(text);
  const pieces: { i: number; key: number; data: number[] }[] = [];
  for (let i = 0, n = 0; i < bytes.length; n++) {
    const len = 2 + Math.floor(rand() * 3);
    const key = 1 + Math.floor(rand() * 254);
    pieces.push({ i: n, key, data: bytes.slice(i, i + len).map((b, k) => b ^ ((key + k * 31) & 255)) });
    i += len;
  }
  for (let i = pieces.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = pieces[i];
    pieces[i] = pieces[j];
    pieces[j] = tmp;
  }
  return pieces.map((p) => toB64([p.i, p.key].concat(p.data))).join('.');
}

export function unscramble(packed: string): string {
  if (!packed) return '';
  const pieces = packed.split('.').map(fromB64);
  pieces.sort((a, b) => a[0] - b[0]);
  const bytes: number[] = [];
  for (const p of pieces) {
    const key = p[1];
    for (let k = 2; k < p.length; k++) bytes.push(p[k] ^ ((key + (k - 2) * 31) & 255));
  }
  return fromUtf8(bytes);
}
