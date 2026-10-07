/**
 * Schlankes DEFLATE (RFC 1951) ohne Abhängigkeiten: Packen mit LZ77 und festen Huffman-Codes, Entpacken vollständig.
 * Läuft synchron in jedem Browser (auch Safari 12, wo es CompressionStream noch nicht gibt).
 */

const LEN_BASE = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258];
const LEN_EXTRA = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
const DIST_BASE = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
const DIST_EXTRA = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
const CL_ORDER = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];

// ---------- Packen ----------

class BitWriter {
  out: number[] = [];
  private acc = 0;
  private n = 0;
  /** `count` Bits von `value`, niedrigstes zuerst (so verlangt es DEFLATE für alles außer Huffman-Codes). */
  bits(value: number, count: number): void {
    for (let i = 0; i < count; i++) {
      this.acc |= ((value >>> i) & 1) << this.n;
      if (++this.n === 8) {
        this.out.push(this.acc);
        this.acc = 0;
        this.n = 0;
      }
    }
  }
  /** Huffman-Code: höchstes Bit zuerst. */
  code(value: number, count: number): void {
    for (let i = count - 1; i >= 0; i--) this.bits((value >>> i) & 1, 1);
  }
  flush(): number[] {
    if (this.n) this.out.push(this.acc);
    this.acc = 0;
    this.n = 0;
    return this.out;
  }
}

function writeLiteral(w: BitWriter, sym: number): void {
  if (sym < 144) w.code(0x30 + sym, 8);
  else if (sym < 256) w.code(0x190 + sym - 144, 9);
  else if (sym < 280) w.code(sym - 256, 7);
  else w.code(0xc0 + sym - 280, 8);
}

function writeMatch(w: BitWriter, len: number, dist: number): void {
  let li = LEN_BASE.length - 1;
  while (LEN_BASE[li] > len) li--;
  writeLiteral(w, 257 + li);
  w.bits(len - LEN_BASE[li], LEN_EXTRA[li]);
  let di = DIST_BASE.length - 1;
  while (DIST_BASE[di] > dist) di--;
  w.code(di, 5);
  w.bits(dist - DIST_BASE[di], DIST_EXTRA[di]);
}

/** Roh-DEFLATE (ohne zlib-Kopf), ein Block mit festen Codes – für kurze Texte kaum schlechter als dynamische. */
export function deflateRaw(data: Uint8Array): Uint8Array {
  const w = new BitWriter();
  w.bits(1, 1);
  w.bits(1, 2);
  const WINDOW = 32768;
  const head = new Map<number, number>();
  const prev = new Int32Array(data.length);
  const key = (i: number) => (data[i] << 16) | (data[i + 1] << 8) | data[i + 2];
  const insert = (i: number) => {
    if (i + 2 >= data.length) return;
    const k = key(i);
    const p = head.get(k);
    prev[i] = p === undefined ? -1 : p;
    head.set(k, i);
  };
  let i = 0;
  while (i < data.length) {
    let bestLen = 0;
    let bestDist = 0;
    if (i + 2 < data.length) {
      let p = head.get(key(i));
      let chain = 128;
      while (p !== undefined && p >= 0 && i - p <= WINDOW && chain-- > 0) {
        let l = 0;
        while (l < 258 && i + l < data.length && data[p + l] === data[i + l]) l++;
        if (l > bestLen) {
          bestLen = l;
          bestDist = i - p;
          if (l === 258) break;
        }
        p = prev[p];
      }
    }
    if (bestLen >= 3) {
      writeMatch(w, bestLen, bestDist);
      for (let k = 0; k < bestLen; k++) insert(i + k);
      i += bestLen;
    } else {
      writeLiteral(w, data[i]);
      insert(i);
      i++;
    }
  }
  writeLiteral(w, 256);
  return new Uint8Array(w.flush());
}

// ---------- Entpacken ----------

interface Huffman {
  counts: number[];
  symbols: number[];
}

function huffman(lengths: number[]): Huffman {
  const counts = new Array(16).fill(0);
  for (const l of lengths) counts[l]++;
  counts[0] = 0;
  const offs = new Array(16).fill(0);
  for (let i = 1; i < 16; i++) offs[i] = offs[i - 1] + counts[i - 1];
  const symbols = new Array(lengths.length).fill(0);
  lengths.forEach((l, sym) => {
    if (l) symbols[offs[l]++] = sym;
  });
  return { counts, symbols };
}

let FIXED_LIT: Huffman | null = null;
let FIXED_DIST: Huffman | null = null;

/** Entpackt Roh-DEFLATE; wirft bei kaputten Daten oder wenn das Ergebnis größer als `limit` Bytes würde. */
export function inflateRaw(input: Uint8Array, limit = 1 << 20): Uint8Array {
  let pos = 0;
  let bitBuf = 0;
  let bitCnt = 0;
  const out: number[] = [];
  const bits = (n: number): number => {
    while (bitCnt < n) {
      if (pos >= input.length) throw new Error('DEFLATE: Daten zu kurz');
      bitBuf |= input[pos++] << bitCnt;
      bitCnt += 8;
    }
    const v = bitBuf & ((1 << n) - 1);
    bitBuf >>>= n;
    bitCnt -= n;
    return v;
  };
  const decode = (hf: Huffman): number => {
    let code = 0;
    let first = 0;
    let index = 0;
    for (let len = 1; len < 16; len++) {
      code |= bits(1);
      const count = hf.counts[len];
      if (code - count < first) return hf.symbols[index + (code - first)];
      index += count;
      first += count;
      first <<= 1;
      code <<= 1;
    }
    throw new Error('DEFLATE: ungültiger Code');
  };
  const push = (b: number) => {
    if (out.length >= limit) throw new Error('DEFLATE: zu groß');
    out.push(b);
  };
  let last = 0;
  while (!last) {
    last = bits(1);
    const type = bits(2);
    if (type === 0) {
      bitBuf = 0;
      bitCnt = 0;
      if (pos + 4 > input.length) throw new Error('DEFLATE: Daten zu kurz');
      const len = input[pos] | (input[pos + 1] << 8);
      const nlen = input[pos + 2] | (input[pos + 3] << 8);
      if ((len ^ 0xffff) !== nlen) throw new Error('DEFLATE: Längenfehler');
      pos += 4;
      if (pos + len > input.length) throw new Error('DEFLATE: Daten zu kurz');
      for (let k = 0; k < len; k++) push(input[pos++]);
      continue;
    }
    let lit: Huffman;
    let dist: Huffman;
    if (type === 1) {
      if (!FIXED_LIT || !FIXED_DIST) {
        const l: number[] = [];
        for (let k = 0; k < 288; k++) l.push(k < 144 ? 8 : k < 256 ? 9 : k < 280 ? 7 : 8);
        FIXED_LIT = huffman(l);
        FIXED_DIST = huffman(new Array(30).fill(5));
      }
      lit = FIXED_LIT;
      dist = FIXED_DIST;
    } else if (type === 2) {
      const nlen = bits(5) + 257;
      const ndist = bits(5) + 1;
      const ncode = bits(4) + 4;
      const cl = new Array(19).fill(0);
      for (let k = 0; k < ncode; k++) cl[CL_ORDER[k]] = bits(3);
      const clh = huffman(cl);
      const lengths: number[] = [];
      while (lengths.length < nlen + ndist) {
        const sym = decode(clh);
        if (sym < 16) lengths.push(sym);
        else {
          let rep = 0;
          let val = 0;
          if (sym === 16) {
            if (!lengths.length) throw new Error('DEFLATE: Wiederholung ohne Wert');
            val = lengths[lengths.length - 1];
            rep = 3 + bits(2);
          } else if (sym === 17) rep = 3 + bits(3);
          else rep = 11 + bits(7);
          while (rep--) lengths.push(val);
        }
      }
      lit = huffman(lengths.slice(0, nlen));
      dist = huffman(lengths.slice(nlen, nlen + ndist));
    } else throw new Error('DEFLATE: ungültiger Blocktyp');
    for (;;) {
      const sym = decode(lit);
      if (sym < 256) push(sym);
      else if (sym === 256) break;
      else {
        const li = sym - 257;
        if (li >= LEN_BASE.length) throw new Error('DEFLATE: ungültige Länge');
        const len = LEN_BASE[li] + bits(LEN_EXTRA[li]);
        const di = decode(dist);
        if (di >= DIST_BASE.length) throw new Error('DEFLATE: ungültiger Abstand');
        const d = DIST_BASE[di] + bits(DIST_EXTRA[di]);
        if (d > out.length) throw new Error('DEFLATE: Abstand zu groß');
        for (let k = 0; k < len; k++) push(out[out.length - d]);
      }
    }
  }
  return new Uint8Array(out);
}

// ---------- Text und Base64url ----------

export function utf8Encode(text: string): Uint8Array {
  const bin = unescape(encodeURIComponent(text));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

/** Wirft bei ungültigem UTF-8. */
export function utf8Decode(bytes: Uint8Array): string {
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return decodeURIComponent(escape(bin));
}

const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

/** Base64 mit URL-sicheren Zeichen und ohne „=“ – passt unverändert in ein URL-Fragment. */
export function base64url(bytes: Uint8Array): string {
  let out = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const n = (bytes[i] << 16) | ((bytes[i + 1] || 0) << 8) | (bytes[i + 2] || 0);
    out += B64[(n >> 18) & 63] + B64[(n >> 12) & 63];
    if (i + 1 < bytes.length) out += B64[(n >> 6) & 63];
    if (i + 2 < bytes.length) out += B64[n & 63];
  }
  return out;
}

/** Liest auch normales Base64 (+ / =); null bei fremden Zeichen. */
export function fromBase64url(text: string): Uint8Array | null {
  const clean = text.replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
  if (clean.length % 4 === 1) return null;
  const out: number[] = [];
  let acc = 0;
  let n = 0;
  for (let i = 0; i < clean.length; i++) {
    const v = B64.indexOf(clean[i]);
    if (v < 0) return null;
    acc = (acc << 6) | v;
    n += 6;
    if (n >= 8) {
      n -= 8;
      out.push((acc >> n) & 255);
    }
  }
  return new Uint8Array(out);
}
