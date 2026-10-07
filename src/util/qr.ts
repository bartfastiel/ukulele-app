/**
 * Kleiner QR-Code-Encoder (ISO/IEC 18004): Byte-Modus, Fehlerkorrektur L oder M, Versionen 1–40, Maskenwahl
 * nach den vier Strafregeln. Ergebnis ist eine Modulmatrix; als SVG zeichnet sie `qrPath`.
 */

import { utf8Encode } from './deflate.ts';

export type Ecl = 'L' | 'M';

export interface QrCode {
  version: number;
  ecl: Ecl;
  mask: number;
  size: number;
  /** modules[y][x], true = dunkel */
  modules: boolean[][];
}

// Index = Version; aus der Norm (Tabelle 9)
const ECC_PER_BLOCK: Record<Ecl, number[]> = {
  L: [0, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  M: [0, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
};
const BLOCKS: Record<Ecl, number[]> = {
  L: [0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
  M: [0, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
};
const ECL_BITS: Record<Ecl, number> = { L: 1, M: 0 };

/** Module für Daten und Fehlerkorrektur (ohne Funktionsmuster). */
function rawModules(ver: number): number {
  let r = (16 * ver + 128) * ver + 64;
  if (ver >= 2) {
    const n = Math.floor(ver / 7) + 2;
    r -= (25 * n - 10) * n - 55;
    if (ver >= 7) r -= 36;
  }
  return r;
}

export function dataCodewords(ver: number, ecl: Ecl): number {
  return Math.floor(rawModules(ver) / 8) - ECC_PER_BLOCK[ecl][ver] * BLOCKS[ecl][ver];
}

/** Wie viele Bytes passen in diese Version (Byte-Modus)? */
export function byteCapacity(ver: number, ecl: Ecl): number {
  const headerBits = 4 + (ver <= 9 ? 8 : 16);
  return Math.floor((dataCodewords(ver, ecl) * 8 - headerBits) / 8);
}

export function alignmentPositions(ver: number): number[] {
  if (ver === 1) return [];
  const n = Math.floor(ver / 7) + 2;
  const size = ver * 4 + 17;
  const step = Math.floor((ver * 8 + n * 3 + 5) / (n * 4 - 4)) * 2;
  const out = [6];
  for (let pos = size - 7; out.length < n; pos -= step) out.splice(1, 0, pos);
  return out;
}

// ---------- Reed-Solomon über GF(256), Polynom 0x11D ----------

function gfMul(a: number, b: number): number {
  let r = 0;
  for (let i = 7; i >= 0; i--) {
    r = (r << 1) ^ ((r >>> 7) * 0x11d);
    r ^= ((b >>> i) & 1) * a;
  }
  return r & 255;
}

function rsDivisor(degree: number): number[] {
  const res = new Array(degree).fill(0);
  res[degree - 1] = 1;
  let root = 1;
  for (let i = 0; i < degree; i++) {
    for (let j = 0; j < degree; j++) {
      res[j] = gfMul(res[j], root);
      if (j + 1 < degree) res[j] ^= res[j + 1];
    }
    root = gfMul(root, 2);
  }
  return res;
}

function rsRemainder(data: number[], divisor: number[]): number[] {
  const res = divisor.map(() => 0);
  for (const b of data) {
    const factor = b ^ (res.shift() as number);
    res.push(0);
    divisor.forEach((coef, i) => (res[i] ^= gfMul(coef, factor)));
  }
  return res;
}

// ---------- Aufbau ----------

class Matrix {
  size: number;
  modules: boolean[][];
  isFunction: boolean[][];
  constructor(size: number) {
    this.size = size;
    this.modules = [];
    this.isFunction = [];
    for (let y = 0; y < size; y++) {
      this.modules.push(new Array(size).fill(false));
      this.isFunction.push(new Array(size).fill(false));
    }
  }
  fn(x: number, y: number, dark: boolean): void {
    this.modules[y][x] = dark;
    this.isFunction[y][x] = true;
  }
}

function bit(x: number, i: number): boolean {
  return ((x >>> i) & 1) !== 0;
}

function drawFunctionPatterns(m: Matrix, ver: number): void {
  const size = m.size;
  for (let i = 0; i < size; i++) {
    m.fn(6, i, i % 2 === 0);
    m.fn(i, 6, i % 2 === 0);
  }
  const finder = (cx: number, cy: number) => {
    for (let dy = -4; dy <= 4; dy++)
      for (let dx = -4; dx <= 4; dx++) {
        const x = cx + dx;
        const y = cy + dy;
        if (x < 0 || y < 0 || x >= size || y >= size) continue;
        const d = Math.max(Math.abs(dx), Math.abs(dy));
        m.fn(x, y, d !== 2 && d !== 4);
      }
  };
  finder(3, 3);
  finder(size - 4, 3);
  finder(3, size - 4);
  const pos = alignmentPositions(ver);
  const last = pos.length - 1;
  for (let i = 0; i <= last; i++)
    for (let j = 0; j <= last; j++) {
      if ((i === 0 && j === 0) || (i === 0 && j === last) || (i === last && j === 0)) continue;
      for (let dy = -2; dy <= 2; dy++)
        for (let dx = -2; dx <= 2; dx++) m.fn(pos[i] + dx, pos[j] + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
    }
  drawFormat(m, 'L', 0);
  if (ver >= 7) {
    let rem = ver;
    for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25);
    const bits = (ver << 12) | rem;
    for (let i = 0; i < 18; i++) {
      const b = bit(bits, i);
      const a = size - 11 + (i % 3);
      const c = Math.floor(i / 3);
      m.fn(a, c, b);
      m.fn(c, a, b);
    }
  }
}

/** Formatinformation (Fehlerkorrektur + Maske, BCH-geschützt) an beiden Stellen; dazu das dunkle Modul. */
function drawFormat(m: Matrix, ecl: Ecl, mask: number): void {
  const bits = formatBits(ecl, mask);
  const size = m.size;
  for (let i = 0; i <= 5; i++) m.fn(8, i, bit(bits, i));
  m.fn(8, 7, bit(bits, 6));
  m.fn(8, 8, bit(bits, 7));
  m.fn(7, 8, bit(bits, 8));
  for (let i = 9; i < 15; i++) m.fn(14 - i, 8, bit(bits, i));
  for (let i = 0; i < 8; i++) m.fn(size - 1 - i, 8, bit(bits, i));
  for (let i = 8; i < 15; i++) m.fn(8, size - 15 + i, bit(bits, i));
  m.fn(8, size - 8, true);
}

export function formatBits(ecl: Ecl, mask: number): number {
  const data = (ECL_BITS[ecl] << 3) | mask;
  let rem = data;
  for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
  return ((data << 10) | rem) ^ 0x5412;
}

function codewords(bytes: Uint8Array, ver: number, ecl: Ecl): number[] {
  const bb: number[] = [];
  const put = (val: number, len: number) => {
    for (let i = len - 1; i >= 0; i--) bb.push((val >>> i) & 1);
  };
  put(4, 4);
  put(bytes.length, ver <= 9 ? 8 : 16);
  for (let i = 0; i < bytes.length; i++) put(bytes[i], 8);
  const capBits = dataCodewords(ver, ecl) * 8;
  put(0, Math.min(4, capBits - bb.length));
  put(0, (8 - (bb.length % 8)) % 8);
  for (let pad = 0xec; bb.length < capBits; pad ^= 0xec ^ 0x11) put(pad, 8);
  const data: number[] = [];
  for (let i = 0; i < bb.length; i += 8) {
    let v = 0;
    for (let k = 0; k < 8; k++) v = (v << 1) | bb[i + k];
    data.push(v);
  }
  // in Blöcke teilen, Fehlerkorrektur je Block, dann verschränken
  const nBlocks = BLOCKS[ecl][ver];
  const eccLen = ECC_PER_BLOCK[ecl][ver];
  const raw = Math.floor(rawModules(ver) / 8);
  const nShort = nBlocks - (raw % nBlocks);
  const shortLen = Math.floor(raw / nBlocks);
  const div = rsDivisor(eccLen);
  const blocks: number[][] = [];
  for (let i = 0, k = 0; i < nBlocks; i++) {
    const dat = data.slice(k, k + shortLen - eccLen + (i < nShort ? 0 : 1));
    k += dat.length;
    const ecc = rsRemainder(dat, div);
    if (i < nShort) dat.push(0);
    blocks.push(dat.concat(ecc));
  }
  const out: number[] = [];
  for (let i = 0; i < blocks[0].length; i++)
    blocks.forEach((b, j) => {
      if (i !== shortLen - eccLen || j >= nShort) out.push(b[i]);
    });
  return out;
}

function drawCodewords(m: Matrix, data: number[]): void {
  const size = m.size;
  let i = 0;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vert = 0; vert < size; vert++)
      for (let j = 0; j < 2; j++) {
        const x = right - j;
        const upward = ((right + 1) & 2) === 0;
        const y = upward ? size - 1 - vert : vert;
        if (!m.isFunction[y][x] && i < data.length * 8) {
          m.modules[y][x] = bit(data[i >>> 3], 7 - (i & 7));
          i++;
        }
      }
  }
}

function maskHit(mask: number, x: number, y: number): boolean {
  switch (mask) {
    case 0:
      return (x + y) % 2 === 0;
    case 1:
      return y % 2 === 0;
    case 2:
      return x % 3 === 0;
    case 3:
      return (x + y) % 3 === 0;
    case 4:
      return (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0;
    case 5:
      return ((x * y) % 2) + ((x * y) % 3) === 0;
    case 6:
      return (((x * y) % 2) + ((x * y) % 3)) % 2 === 0;
    default:
      return (((x + y) % 2) + ((x * y) % 3)) % 2 === 0;
  }
}

function applyMask(m: Matrix, mask: number): void {
  for (let y = 0; y < m.size; y++)
    for (let x = 0; x < m.size; x++) if (!m.isFunction[y][x] && maskHit(mask, x, y)) m.modules[y][x] = !m.modules[y][x];
}

/** Strafpunkte nach den vier Regeln der Norm – die Maske mit den wenigsten gewinnt. */
export function penalty(mod: boolean[][]): number {
  const size = mod.length;
  let p = 0;
  const finderA = [true, false, true, true, true, false, true, false, false, false, false];
  const finderB = finderA.slice().reverse();
  const line = (get: (i: number) => boolean) => {
    let run = 1;
    for (let i = 1; i <= size; i++) {
      if (i < size && get(i) === get(i - 1)) run++;
      else {
        if (run >= 5) p += 3 + run - 5;
        run = 1;
      }
    }
    for (let i = 0; i + 11 <= size; i++) {
      let a = true;
      let b = true;
      for (let k = 0; k < 11; k++) {
        const v = get(i + k);
        if (v !== finderA[k]) a = false;
        if (v !== finderB[k]) b = false;
      }
      if (a) p += 40;
      if (b) p += 40;
    }
  };
  let dark = 0;
  for (let y = 0; y < size; y++) {
    line((x) => mod[y][x]);
    line((x) => mod[x][y]);
    for (let x = 0; x < size; x++) {
      if (mod[y][x]) dark++;
      if (x + 1 < size && y + 1 < size) {
        const c = mod[y][x];
        if (c === mod[y][x + 1] && c === mod[y + 1][x] && c === mod[y + 1][x + 1]) p += 3;
      }
    }
  }
  p += Math.floor(Math.abs((dark * 100) / (size * size) - 50) / 5) * 10;
  return p;
}

/**
 * QR-Code für die Bytes: kleinste Version mit L, bei gleicher Version lieber M. null, wenn es über `maxVersion` hinaus
 * nicht passt.
 */
export function encodeQr(data: Uint8Array | string, opts: { maxVersion?: number; mask?: number; ecl?: Ecl } = {}): QrCode | null {
  const bytes = typeof data === 'string' ? utf8Encode(data) : data;
  const maxVersion = Math.min(40, opts.maxVersion || 40);
  let ver = 0;
  for (let v = 1; v <= maxVersion; v++)
    if (byteCapacity(v, opts.ecl || 'L') >= bytes.length) {
      ver = v;
      break;
    }
  if (!ver) return null;
  const ecl: Ecl = opts.ecl || (byteCapacity(ver, 'M') >= bytes.length ? 'M' : 'L');
  const cw = codewords(bytes, ver, ecl);
  const base = new Matrix(ver * 4 + 17);
  drawFunctionPatterns(base, ver);
  drawCodewords(base, cw);
  let best: Matrix | null = null;
  let bestMask = 0;
  let bestScore = Infinity;
  const masks = opts.mask !== undefined ? [opts.mask] : [0, 1, 2, 3, 4, 5, 6, 7];
  for (const mask of masks) {
    const m = new Matrix(base.size);
    for (let y = 0; y < base.size; y++) {
      m.modules[y] = base.modules[y].slice();
      m.isFunction[y] = base.isFunction[y];
    }
    applyMask(m, mask);
    drawFormat(m, ecl, mask);
    const score = penalty(m.modules);
    if (score < bestScore) {
      bestScore = score;
      best = m;
      bestMask = mask;
    }
  }
  const m = best as Matrix;
  return { version: ver, ecl, mask: bestMask, size: m.size, modules: m.modules };
}

/** SVG-Pfad aller dunklen Module, mit `quiet` Modulen Ruhezone versetzt. */
export function qrPath(qr: QrCode, quiet = 4): string {
  let d = '';
  for (let y = 0; y < qr.size; y++)
    for (let x = 0; x < qr.size; x++) {
      if (!qr.modules[y][x]) continue;
      // waagrechte Läufe zusammenfassen: kürzerer Pfad, keine Haarlinien zwischen Modulen
      let run = 1;
      while (x + run < qr.size && qr.modules[y][x + run]) run++;
      d += `M${x + quiet} ${y + quiet}h${run}v1h-${run}z`;
      x += run - 1;
    }
  return d;
}
