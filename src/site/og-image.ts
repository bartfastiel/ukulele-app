/**
 * Vorschaubild für Links (og:image, 1200 × 630) je Instrument-Seite, im Build gerechnet: Holz des Instruments,
 * Schallloch bzw. Banjo-Fell mit Saiten und ein Griffbild auf cremefarbener Karte. Ohne Text, damit ein Bild für alle
 * Sprachen passt. Kantenglättung über Abstandsfunktionen, PNG über node:zlib – keine Bildbibliothek nötig.
 */
import { deflateSync, crc32 } from 'node:zlib';
import { MATERIALS, type RGB } from '../ui/wood.ts';
import { instrument, setInstrument } from '../music/instrument.ts';
import { chord } from '../music/chords.ts';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

/** Akkord auf der Karte: drei Finger, alle im 1. bis 3. Bund. */
const CARD_CHORD: Record<string, string> = { ukulele: 'G7', gitarre: 'C', banjo: 'C' };

type Sdf = (x: number, y: number) => number;
type Paint = RGB | ((x: number, y: number) => RGB);

const clamp = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
const hex = (s: string): RGB => [parseInt(s.slice(1, 3), 16), parseInt(s.slice(3, 5), 16), parseInt(s.slice(5, 7), 16)];
const mix = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

class Canvas {
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

const circle = (cx: number, cy: number, r: number): Sdf => (x, y) => Math.hypot(x - cx, y - cy) - r;
const ring = (cx: number, cy: number, r: number, w: number): Sdf => (x, y) => Math.abs(Math.hypot(x - cx, y - cy) - r) - w / 2;

function roundRect(x0: number, y0: number, x1: number, y1: number, r: number): Sdf {
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

function segment(ax: number, ay: number, bx: number, by: number, w: number): Sdf {
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy;
  return (x, y) => {
    const t = clamp(((x - ax) * dx + (y - ay) * dy) / len2);
    return Math.hypot(x - ax - dx * t, y - ay - dy * t) - w / 2;
  };
}

/** Ring aus `n` gleich langen Stücken (Anteil `on` gefüllt). */
function dashedRing(cx: number, cy: number, r: number, w: number, n: number, on: number): Sdf {
  const period = (Math.PI * 2 * r) / n;
  const dash = period * on;
  const base = ring(cx, cy, r, w);
  return (x, y) => {
    const s = (Math.atan2(y - cy, x - cx) + Math.PI) * r;
    const m = s - Math.floor(s / period) * period;
    return Math.max(base(x, y), Math.abs(m - dash / 2) - dash / 2);
  };
}

/** Fünfzackiger Stern (Umkreis r). */
function star(cx: number, cy: number, r: number): Sdf {
  const inner = r * 0.48;
  const pts: number[] = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? inner : r;
    pts.push(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
  }
  return (x, y) => {
    let d = Infinity;
    let inside = false;
    for (let i = 0, j = 18; i < 20; j = i, i += 2) {
      const ax = pts[j];
      const ay = pts[j + 1];
      const bx = pts[i];
      const by = pts[i + 1];
      const ex = bx - ax;
      const ey = by - ay;
      const t = clamp(((x - ax) * ex + (y - ay) * ey) / (ex * ex + ey * ey));
      d = Math.min(d, Math.hypot(x - ax - ex * t, y - ay - ey * t));
      if (ay > y !== by > y && x < ((bx - ax) * (y - ay)) / (by - ay) + ax) inside = !inside;
    }
    return inside ? -d : d;
  };
}

const box = (cx: number, cy: number, r: number) => [cx - r - 2, cy - r - 2, cx + r + 2, cy + r + 2];

// ---------- Bild ----------

const CREAM = hex('#f6ecd2');
const INK = hex('#3a2a20');
const TEAL = hex('#2c6e63');
const GOLD = hex('#c9a24a');
const BLACK: RGB = [20, 14, 12];

function woodBackground(c: Canvas, id: string): void {
  const mat = (MATERIALS[id] || MATERIALS.ukulele).body;
  const grain = mat.grain(1);
  const size = 768;
  for (let y = 0; y < c.h; y++)
    for (let x = 0; x < c.w; x++) {
      const t = grain((x % size) / size, (y % size) / size);
      // sanfte Vignette, damit Mitte und Karte hervortreten
      const dx = (x - c.w / 2) / (c.w / 2);
      const dy = (y - c.h / 2) / (c.h / 2);
      const v = 1 - 0.32 * clamp((dx * dx + dy * dy) / 2);
      const col = mix(mat.dark, mat.light, t);
      const i = (y * c.w + x) * 3;
      c.px[i] = col[0] * v;
      c.px[i + 1] = col[1] * v;
      c.px[i + 2] = col[2] * v;
    }
}

function hole(cx: number, cy: number, r: number): Paint {
  const inner = hex('#0d0503');
  const outer = hex('#2f1207');
  return (x, y) => mix(inner, outer, clamp(Math.hypot(x - cx, y - cy) / r));
}

/** Schallloch (Ukulele, Gitarre) bzw. Fell mit Spannreifen (Banjo). */
function soundHole(c: Canvas, id: string, cx: number, cy: number): void {
  if (id === 'gitarre') {
    const rings: [number, number, RGB][] = [
      [232, 6, BLACK],
      [224, 6, hex('#efe3c4')],
      [212, 14, hex('#efe3c4')],
      [200, 8, hex('#efe3c4')],
      [191, 6, BLACK],
    ];
    for (const r of rings) c.shape(ring(cx, cy, r[0], r[1]), box(cx, cy, r[0] + r[1]), r[2]);
    c.shape(dashedRing(cx, cy, 212, 14, 90, 0.5), box(cx, cy, 222), BLACK);
    c.shape(circle(cx, cy, 178), box(cx, cy, 178), hole(cx, cy, 178));
    return;
  }
  if (id === 'banjo') {
    const light = hex('#f1f3f5');
    const dark = hex('#7d858c');
    const chrome: Paint = (x, y) => mix(dark, light, 0.5 + 0.5 * Math.cos(Math.atan2(y - cy, x - cx) + Math.PI * 0.75));
    for (let i = 0; i < 24; i++) {
      const a = (i * Math.PI * 2) / 24;
      const bx = cx + Math.cos(a) * 252;
      const by = cy + Math.sin(a) * 252;
      c.shape(segment(cx + Math.cos(a) * 238, cy + Math.sin(a) * 238, bx, by, 9), box(bx, by, 24), chrome);
    }
    c.shape(ring(cx, cy, 236, 22), box(cx, cy, 250), chrome);
    const head = hex('#efe5cb');
    const edge = hex('#d8c9a4');
    c.shape(circle(cx, cy, 225), box(cx, cy, 225), (x, y) => mix(head, edge, Math.pow(clamp(Math.hypot(x - cx, y - cy) / 225), 3)));
    c.shape(ring(cx, cy, 214, 2), box(cx, cy, 216), edge, 0.8);
    return;
  }
  c.shape(circle(cx, cy, 246), box(cx, cy, 246), hex('#f1e2bf'));
  c.shape(dashedRing(cx, cy, 217, 26, 34, 0.59), box(cx, cy, 232), TEAL);
  c.shape(ring(cx, cy, 217, 9), box(cx, cy, 223), GOLD);
  c.shape(circle(cx, cy, 180), box(cx, cy, 180), hole(cx, cy, 180));
}

function strings(c: Canvas, id: string, cx: number): void {
  const n = instrument().strings.length;
  const spacing = id === 'ukulele' ? 66 : id === 'gitarre' ? 40 : 44;
  const nylon = hex('#fffaf0');
  const bronze = hex('#d2a556');
  const steel = id === 'banjo' ? hex('#8d959c') : hex('#e4e8eb');
  for (let i = 0; i < n; i++) {
    const x = cx + (i - (n - 1) / 2) * spacing;
    const w = id === 'ukulele' ? 6 + i : id === 'gitarre' ? 7 - i : 4.4 - i * 0.3;
    const col = id === 'ukulele' ? nylon : id === 'gitarre' && i < 4 ? bronze : steel;
    c.shape(segment(x + 6, -20, x + 6, c.h + 20, w), [x - 20, 0, x + 30, c.h], BLACK, 0.35, 3);
    c.shape(segment(x, -20, x, c.h + 20, w), [x - 20, 0, x + 20, c.h], col);
  }
  if (id === 'banjo') {
    // Steg auf dem Fell
    const span = (n - 1) * spacing + 50;
    c.shape(roundRect(cx - span / 2 + 6, 393, cx + span / 2 + 6, 413, 4), [cx - span, 380, cx + span, 430], BLACK, 0.35, 3);
    c.shape(roundRect(cx - span / 2, 386, cx + span / 2, 404, 4), [cx - span, 380, cx + span, 410], hex('#4a2c14'));
  }
}

function card(c: Canvas, id: string): void {
  const x0 = 690;
  const x1 = 1120;
  const y0 = 66;
  const y1 = 564;
  c.shape(roundRect(x0 + 8, y0 + 14, x1 + 8, y1 + 14, 30), [x0 - 30, y0 - 20, x1 + 50, y1 + 60], BLACK, 0.5, 16);
  c.shape(roundRect(x0, y0, x1, y1, 30), [x0 - 2, y0 - 2, x1 + 2, y1 + 2], CREAM);
  const ch = chord(CARD_CHORD[id] || 'C');
  const n = ch.frets.length;
  const spacing = n === 4 ? 84 : n === 5 ? 66 : 54;
  const cx = (x0 + x1) / 2;
  const top = 160;
  const row = 78;
  const rows = 4;
  const sx = (i: number) => cx + (i - (n - 1) / 2) * spacing;
  const left = sx(0);
  const right = sx(n - 1);
  const grid = hex('#8a7a66');
  for (let r = 1; r <= rows; r++) c.shape(segment(left, top + r * row, right, top + r * row, 4), [left - 4, top + r * row - 4, right + 4, top + r * row + 4], grid);
  for (let i = 0; i < n; i++) c.shape(segment(sx(i), top, sx(i), top + rows * row, 4), [sx(i) - 4, top - 4, sx(i) + 4, top + rows * row + 4], INK);
  c.shape(roundRect(left - 4, top - 7, right + 4, top + 7, 3), [left - 6, top - 9, right + 6, top + 9], INK);
  for (let i = 0; i < n; i++) {
    const f = ch.frets[i];
    const x = sx(i);
    if (f > 0) c.shape(circle(x, top + (f - 0.5) * row, 25), box(x, top + (f - 0.5) * row, 25), TEAL);
    else if (f === 0) c.shape(ring(x, top - 34, 12, 4), box(x, top - 34, 16), INK);
    else {
      c.shape(segment(x - 11, top - 45, x + 11, top - 23, 4), box(x, top - 34, 16), INK);
      c.shape(segment(x - 11, top - 23, x + 11, top - 45, 4), box(x, top - 34, 16), INK);
    }
  }
  const gold = hex('#e2a72b');
  for (let i = -1; i <= 1; i++) c.shape(star(cx + i * 62, 516, 24), box(cx + i * 62, 516, 24), gold);
}

/** Rohbild (RGB, zeilenweise) des Vorschaubilds für eine Instrument-Seite. */
export function renderOgImage(id: string): Uint8Array {
  const keep = instrument().id;
  setInstrument(id);
  try {
    const c = new Canvas(OG_WIDTH, OG_HEIGHT);
    woodBackground(c, id);
    soundHole(c, id, 360, 315);
    strings(c, id, 360);
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

/** PNG (8 Bit RGB) mit Paeth-Filter je Zeile – packt Holzmaserung deutlich kleiner als ungefiltert. */
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
