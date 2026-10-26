/**
 * Vorschaubild für Links (og:image, 1200 × 630) je Instrument-Seite, im Build gerechnet, im Design „Klar“: hellgrauer
 * Grund, links das Zeichen von Open String, rechts ein Griffbild des Instruments auf einer weißen Karte. Ohne Text, damit
 * ein Bild für alle Sprachen passt. Kantenglättung über Abstandsfunktionen, PNG über node:zlib – keine Bildbibliothek nötig.
 */
import { deflateSync, crc32 } from 'node:zlib';
import { instrument, setInstrument } from '../music/instrument.ts';
import { chord } from '../music/chords.ts';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

/** Akkord auf der Karte: drei Finger, alle im 1. bis 3. Bund. */
const CARD_CHORD: Record<string, string> = { ukulele: 'G7', gitarre: 'C', banjo: 'C', bariton: 'D', mandoline: 'D7' };

export type RGB = [number, number, number];
export type Sdf = (x: number, y: number) => number;
export type Paint = RGB | ((x: number, y: number) => RGB);

export const clamp = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
export const hex = (s: string): RGB => [parseInt(s.slice(1, 3), 16), parseInt(s.slice(3, 5), 16), parseInt(s.slice(5, 7), 16)];
export const mix = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

export class Canvas {
  readonly w: number;
  readonly h: number;
  readonly px: Float32Array;
  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.px = new Float32Array(w * h * 3);
  }

  /** Form mit weicher Kante (`soft` Pixel), nur innerhalb des Rechtecks [x0, x1) × [y0, y1) ausgewertet. */
  shape(sdf: Sdf, box: number[], paint: Paint, alpha = 1, soft = 1): void {
    const x0 = Math.max(0, Math.floor(box[0]));
    const y0 = Math.max(0, Math.floor(box[1]));
    const x1 = Math.min(this.w, Math.ceil(box[2]));
    const y1 = Math.min(this.h, Math.ceil(box[3]));
    for (let y = y0; y < y1; y++)
      for (let x = x0; x < x1; x++) {
        const a = clamp(0.5 - sdf(x + 0.5, y + 0.5) / soft) * alpha;
        if (a <= 0) continue;
        const c = typeof paint === 'function' ? paint(x + 0.5, y + 0.5) : paint;
        const i = (y * this.w + x) * 3;
        this.px[i] += (c[0] - this.px[i]) * a;
        this.px[i + 1] += (c[1] - this.px[i + 1]) * a;
        this.px[i + 2] += (c[2] - this.px[i + 2]) * a;
      }
  }

  rgb(): Uint8Array {
    const out = new Uint8Array(this.px.length);
    for (let i = 0; i < out.length; i++) out[i] = Math.round(Math.max(0, Math.min(255, this.px[i])));
    return out;
  }
}

// ---------- Abstandsfunktionen (negativ = innen) ----------

export const circle = (cx: number, cy: number, r: number): Sdf => (x, y) => Math.hypot(x - cx, y - cy) - r;
export const ring = (cx: number, cy: number, r: number, w: number): Sdf => (x, y) => Math.abs(Math.hypot(x - cx, y - cy) - r) - w / 2;

export function roundRect(x0: number, y0: number, x1: number, y1: number, r: number): Sdf {
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const hw = (x1 - x0) / 2 - r;
  const hh = (y1 - y0) / 2 - r;
  return (x, y) => {
    const qx = Math.abs(x - cx) - hw;
    const qy = Math.abs(y - cy) - hh;
    return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r;
  };
}

export function segment(ax: number, ay: number, bx: number, by: number, w: number): Sdf {
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy;
  return (x, y) => {
    const t = clamp(((x - ax) * dx + (y - ay) * dy) / len2);
    return Math.hypot(x - ax - dx * t, y - ay - dy * t) - w / 2;
  };
}

/** Ring aus `n` gleich langen Stücken (Anteil `on` gefüllt). */
export function dashedRing(cx: number, cy: number, r: number, w: number, n: number, on: number): Sdf {
  const period = (Math.PI * 2 * r) / n;
  const dash = period * on;
  const base = ring(cx, cy, r, w);
  return (x, y) => {
    const s = (Math.atan2(y - cy, x - cx) + Math.PI) * r;
    const m = s - Math.floor(s / period) * period;
    return Math.max(base(x, y), Math.abs(m - dash / 2) - dash / 2);
  };
}

/** Kubische Bézierkurve als Strich der Breite w (aus kurzen Stücken). */
export function curve(p: number[], w: number): Sdf {
  const pts: number[] = [];
  for (let i = 0; i <= 24; i++) {
    const t = i / 24;
    const a = (1 - t) * (1 - t) * (1 - t);
    const b = 3 * (1 - t) * (1 - t) * t;
    const c = 3 * (1 - t) * t * t;
    const d = t * t * t;
    pts.push(a * p[0] + b * p[2] + c * p[4] + d * p[6], a * p[1] + b * p[3] + c * p[5] + d * p[7]);
  }
  const parts: Sdf[] = [];
  for (let i = 0; i + 3 < pts.length; i += 2) parts.push(segment(pts[i], pts[i + 1], pts[i + 2], pts[i + 3], w));
  return (x, y) => {
    let m = Infinity;
    for (const f of parts) m = Math.min(m, f(x, y));
    return m;
  };
}

const box = (cx: number, cy: number, r: number) => [cx - r - 2, cy - r - 2, cx + r + 2, cy + r + 2];

// ---------- Bild ----------

const BG = hex('#f2f3f5');
const WHITE = hex('#ffffff');
const INK = hex('#1c1c1e');
const INK_2 = hex('#55575e');
const FRET = hex('#d5d7dc');
const ACCENT = hex('#0a7c6e');

/** Zeichen von Open String (wie `logo()` in src/ui/icons.ts) als große Akzentfläche links. */
function mark(c: Canvas): void {
  const x0 = 110;
  const y0 = 135;
  const k = 12;
  c.shape(roundRect(x0, y0, x0 + 30 * k, y0 + 30 * k, 8 * k), [x0 - 2, y0 - 2, x0 + 30 * k + 2, y0 + 30 * k + 2], ACCENT);
  const p = (x: number, y: number) => [x0 + x * k, y0 + y * k];
  const arc = [...p(8, 20), ...p(11, 12), ...p(19, 12), ...p(22, 20)];
  c.shape(curve(arc, 2.4 * k), [x0, y0, x0 + 30 * k, y0 + 30 * k], WHITE);
  c.shape(circle(x0 + 15 * k, y0 + 12 * k, 2.5 * k), box(x0 + 15 * k, y0 + 12 * k, 2.5 * k), WHITE);
}

/** Weiße Karte mit einem Griffbild im Stil der App: dunkle Saiten und Sattel, helle Bünde, Finger in der Akzentfarbe. */
function card(c: Canvas, id: string): void {
  const x0 = 640;
  const x1 = 1090;
  const y0 = 75;
  const y1 = 555;
  c.shape(roundRect(x0, y0, x1, y1, 32), [x0 - 2, y0 - 2, x1 + 2, y1 + 2], WHITE);
  const ch = chord(CARD_CHORD[id] || 'C');
  // E-Bass: statt eines Griffs F als Grundton, seine Quinte C und die Oktave F – die erste Basslinie
  const frets = id === 'bass' ? [1, 3, 3, -2] : ch.frets;
  const n = frets.length;
  const spacing = n === 4 ? 88 : n === 5 ? 70 : 58;
  const cx = (x0 + x1) / 2;
  const top = 170;
  const row = 84;
  const rows = 4;
  const sx = (i: number) => cx + (i - (n - 1) / 2) * spacing;
  const left = sx(0);
  const right = sx(n - 1);
  for (let r = 1; r <= rows; r++) c.shape(segment(left, top + r * row, right, top + r * row, 4), [left - 4, top + r * row - 4, right + 4, top + r * row + 4], FRET);
  for (let i = 0; i < n; i++) c.shape(segment(sx(i), top, sx(i), top + rows * row, 4), [sx(i) - 4, top - 4, sx(i) + 4, top + rows * row + 4], INK);
  c.shape(segment(left, top - 2, right, top - 2, 12), [left - 8, top - 10, right + 8, top + 6], INK);
  for (let i = 0; i < n; i++) {
    const f = frets[i];
    const x = sx(i);
    if (f > 0) c.shape(circle(x, top + (f - 0.5) * row, 27), box(x, top + (f - 0.5) * row, 27), id === 'bass' && i ? INK_2 : ACCENT);
    else if (f === 0) c.shape(ring(x, top - 36, 12, 4), box(x, top - 36, 16), INK);
    else if (f === -1) {
      c.shape(segment(x - 11, top - 47, x + 11, top - 25, 4), box(x, top - 36, 16), INK);
      c.shape(segment(x - 11, top - 25, x + 11, top - 47, 4), box(x, top - 36, 16), INK);
    }
  }
}

/** Rohbild (RGB, zeilenweise) des Vorschaubilds für eine Instrument-Seite: hellgrauer Grund, Zeichen links, Griffbild rechts. */
export function renderOgImage(id: string): Uint8Array {
  const keep = instrument().id;
  setInstrument(id);
  try {
    const c = new Canvas(OG_WIDTH, OG_HEIGHT);
    c.shape(() => -1, [0, 0, OG_WIDTH, OG_HEIGHT], BG);
    mark(c);
    card(c, id);
    return c.rgb();
  } finally {
    setInstrument(keep);
  }
}

function chunk(type: string, data: Uint8Array): Uint8Array {
  const out = new Uint8Array(12 + data.length);
  const view = new DataView(out.buffer);
  view.setUint32(0, data.length);
  for (let i = 0; i < 4; i++) out[4 + i] = type.charCodeAt(i);
  out.set(data, 8);
  view.setUint32(8 + data.length, crc32(out.subarray(4, 8 + data.length)));
  return out;
}

/** PNG (8 Bit RGB) mit Paeth-Filter je Zeile – packt Flächen und Verläufe deutlich kleiner als ungefiltert. */
export function encodePng(rgb: Uint8Array, w: number, h: number): Uint8Array {
  const stride = w * 3;
  const raw = new Uint8Array((stride + 1) * h);
  for (let y = 0; y < h; y++) {
    const o = y * (stride + 1);
    raw[o] = 4;
    for (let x = 0; x < stride; x++) {
      const i = y * stride + x;
      const a = x >= 3 ? rgb[i - 3] : 0;
      const b = y > 0 ? rgb[i - stride] : 0;
      const c = x >= 3 && y > 0 ? rgb[i - stride - 3] : 0;
      const p = a + b - c;
      const pa = Math.abs(p - a);
      const pb = Math.abs(p - b);
      const pc = Math.abs(p - c);
      const pred = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      raw[o + 1 + x] = (rgb[i] - pred) & 255;
    }
  }
  const ihdr = new Uint8Array(13);
  const v = new DataView(ihdr.buffer);
  v.setUint32(0, w);
  v.setUint32(4, h);
  ihdr[8] = 8;
  ihdr[9] = 2;
  const parts = [new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw, { level: 9 })), chunk('IEND', new Uint8Array(0))];
  const out = new Uint8Array(parts.reduce((s, p) => s + p.length, 0));
  let pos = 0;
  for (const p of parts) {
    out.set(p, pos);
    pos += p.length;
  }
  return out;
}

export function ogImagePng(id: string): Uint8Array {
  return encodePng(renderOgImage(id), OG_WIDTH, OG_HEIGHT);
}
