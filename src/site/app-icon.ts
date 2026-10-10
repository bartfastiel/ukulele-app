/**
 * App-Symbole je Instrument-Seite (Favicon als SVG, Home-Bildschirm und Manifest als PNG), im Build erzeugt. Eine
 * Beschreibung aus einfachen Formen ergibt beide Fassungen, so sehen SVG und PNG gleich aus. Gleicher Aufbau für alle:
 * Holz als Hintergrund, in der Mitte das Erkennungszeichen des Instruments, darüber die Saiten. Die Startseite bekommt
 * ein neutrales Symbol (Griffbild mit „offener Saite“), weil Suchmaschinen je Adresse nur eines zeigen.
 */
import { Canvas, circle, clamp, curve, dashedRing, encodePng, hex, mix, ring, roundRect, segment, type Paint, type Sdf } from './og-image.ts';
import type { RGB } from '../ui/wood.ts';

/** Kantenlänge der Beschreibung; die PNGs werden darauf skaliert. */
const S = 512;
export const ICON_SIZES = [180, 192, 512];

type Stops = [number, string][];
type Fill = string | { cx: number; cy: number; r: number; stops: Stops };

type Shape =
  | { k: 'circle'; cx: number; cy: number; r: number; fill: Fill }
  | { k: 'ring'; cx: number; cy: number; r: number; w: number; color: string; dashes?: number; on?: number }
  | { k: 'line'; x1: number; y1: number; x2: number; y2: number; w: number; color: string }
  | { k: 'curve'; p: number[]; w: number; color: string }
  | { k: 'rect'; x: number; y: number; w: number; h: number; r: number; fill: Fill };

interface Icon {
  /** Hintergrund (radialer Verlauf von hell nach dunkel). */
  bg: Stops;
  shapes: Shape[];
}

const C = S / 2;
const BG_LIGHT = { cx: 205, cy: 154, r: 461 };
const HOLE: Fill = { cx: C, cy: C, r: 128, stops: [[0, '#0d0503'], [1, '#2f1207']] };

/** Senkrechte Saiten über das ganze Symbol, mittig verteilt. */
function strings(n: number, spacing: number, width: (i: number) => number, color: (i: number) => string, pairs = 0): Shape[] {
  const out: Shape[] = [];
  for (let i = 0; i < n; i++) {
    const x = C + (i - (n - 1) / 2) * spacing;
    for (const d of pairs ? [-pairs, pairs] : [0]) out.push({ k: 'line', x1: x + d, y1: -10, x2: x + d, y2: S + 10, w: width(i), color: color(i) });
  }
  return out;
}

function rosette(dash: string, band: string, accent: string): Shape[] {
  return [
    { k: 'circle', cx: C, cy: C, r: 170, fill: band },
    { k: 'ring', cx: C, cy: C, r: 150, w: 18, color: dash, dashes: 34, on: 0.59 },
    { k: 'ring', cx: C, cy: C, r: 150, w: 6, color: accent },
    { k: 'circle', cx: C, cy: C, r: 124, fill: HOLE },
  ];
}

function fHoles(): Shape[] {
  const out: Shape[] = [];
  const k = 1.86;
  for (const side of [-1, 1]) {
    const x = (v: number) => C + side * v * k;
    const y = (v: number) => C + (v - 100) * k;
    out.push({ k: 'curve', p: [x(52), y(46), x(66), y(70), x(40), y(128), x(56), y(154)], w: 11, color: '#140703' });
    out.push({ k: 'circle', cx: x(52), cy: y(46), r: 12, fill: '#140703' });
    out.push({ k: 'circle', cx: x(56), cy: y(154), r: 13, fill: '#140703' });
  }
  return out;
}

const ICONS: Record<string, Icon> = {
  // Mahagoni, Rosette in Türkis und Gold, vier Nylonsaiten
  ukulele: {
    bg: [[0, '#a5502a'], [0.6, '#6b2a12'], [1, '#3d160a']],
    shapes: [...rosette('#2c6e63', '#f1e2bf', '#c9a24a'), ...strings(4, 46, (i) => 7 + i, () => '#fffaf0')],
  },
  // honigfarbene Fichtendecke, schwarz-elfenbeinfarbene Rosette, sechs Saiten (vier umsponnen)
  gitarre: {
    bg: [[0, '#e2b468'], [0.6, '#a8722e'], [1, '#5a3812']],
    shapes: [
      { k: 'circle', cx: C, cy: C, r: 172, fill: '#15100e' },
      { k: 'circle', cx: C, cy: C, r: 166, fill: '#efe3c4' },
      { k: 'ring', cx: C, cy: C, r: 150, w: 14, color: '#15100e', dashes: 60, on: 0.5 },
      { k: 'circle', cx: C, cy: C, r: 134, fill: '#15100e' },
      { k: 'circle', cx: C, cy: C, r: 128, fill: HOLE },
      ...strings(6, 30, (i) => 8 - i * 0.8, (i) => (i < 4 ? '#d8ab5c' : '#e4e8eb')),
    ],
  },
  // Fell mit verchromtem Spannreifen auf dunklem Ahorn, fünf Stahlsaiten und Steg
  banjo: {
    bg: [[0, '#9a5e28'], [0.6, '#5a3010'], [1, '#2a1406']],
    shapes: [
      ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i): Shape => {
        const a = (i * Math.PI * 2) / 16 + Math.PI / 16;
        return { k: 'line', x1: C + Math.cos(a) * 170, y1: C + Math.sin(a) * 170, x2: C + Math.cos(a) * 192, y2: C + Math.sin(a) * 192, w: 9, color: '#b8c0c6' };
      }),
      { k: 'circle', cx: C, cy: C, r: 182, fill: { cx: 190, cy: 160, r: 330, stops: [[0, '#f4f6f8'], [0.6, '#aab2b9'], [1, '#5f686f']] } },
      { k: 'circle', cx: C, cy: C, r: 160, fill: { cx: 220, cy: 200, r: 220, stops: [[0, '#f8f2e2'], [1, '#ddd0ad']] } },
      ...strings(5, 34, (i) => 6 - i * 0.5, () => '#6d757c'),
      { k: 'rect', x: C - 100, y: 318, w: 200, h: 22, r: 5, fill: '#4a2c14' },
    ],
  },
  // dunkles Koa, Rosette ganz in Abalone-Tönen (so von der Ukulele zu unterscheiden), zwei umsponnene und zwei Nylonsaiten
  bariton: {
    bg: [[0, '#a8743a'], [0.6, '#5e3614'], [1, '#22100a']],
    shapes: [...rosette('#8fd0bf', '#1f4a52', '#f1e2bf'), ...strings(4, 46, (i) => (i < 2 ? 10 - i : 7 + i), (i) => (i < 2 ? '#d8ab5c' : '#fffaf0'))],
  },
  // Decke im Sunburst mit F-Löchern auf kirschrotem Ahorn, vier Saitenpaare
  mandoline: {
    bg: [[0, '#b23a22'], [0.6, '#6a160c'], [1, '#2a0805']],
    shapes: [
      { k: 'circle', cx: C, cy: C, r: 182, fill: '#140703' },
      { k: 'circle', cx: C, cy: C, r: 177, fill: '#f4e9cc' },
      { k: 'circle', cx: C, cy: C, r: 171, fill: { cx: C, cy: C - 14, r: 172, stops: [[0, '#f2bd5a'], [0.45, '#c9772a'], [0.8, '#6a2a0c'], [1, '#1c0903']] } },
      ...fHoles(),
      ...strings(4, 34, (i) => (i < 2 ? 4.5 - i * 0.5 : 3.6 - (i - 2) * 0.4), (i) => (i < 2 ? '#d8ab5c' : '#e4e8eb'), 6),
    ],
  },
  // neutral: Griffbild mit Sattel, Saiten, einem Fingerpunkt und dem Kreis für „leere Saite“
  start: {
    bg: [[0, '#8a6a48'], [0.6, '#4e3622'], [1, '#22160c']],
    shapes: [
      { k: 'circle', cx: C, cy: C, r: 176, fill: '#f6ecd2' },
      { k: 'rect', x: 156, y: 236, w: 200, h: 16, r: 4, fill: '#3a2a20' },
      { k: 'line', x1: 160, y1: 312, x2: 352, y2: 312, w: 5, color: '#8a7a66' },
      { k: 'line', x1: 160, y1: 372, x2: 352, y2: 372, w: 5, color: '#8a7a66' },
      ...[0, 1, 2, 3, 4].map((i): Shape => ({ k: 'line', x1: 166 + i * 45, y1: 244, x2: 166 + i * 45, y2: 400, w: 6, color: '#3a2a20' })),
      { k: 'ring', cx: 256, cy: 180, r: 30, w: 13, color: '#2c6e63' },
      { k: 'circle', cx: 211, cy: 342, r: 22, fill: '#2c6e63' },
    ],
  },
};

function icon(id: string): Icon {
  return ICONS[id] || ICONS.start;
}

// ---------- SVG ----------

const n = (x: number) => String(Math.round(x * 100) / 100);

export function iconSvg(id: string): string {
  const ic = icon(id);
  const defs: string[] = [];
  const fill = (f: Fill): string => {
    if (typeof f === 'string') return f;
    const gid = `g${defs.length}`;
    defs.push(
      `<radialGradient id="${gid}" gradientUnits="userSpaceOnUse" cx="${n(f.cx)}" cy="${n(f.cy)}" r="${n(f.r)}">` +
        f.stops.map((s) => `<stop offset="${s[0]}" stop-color="${s[1]}"/>`).join('') +
        '</radialGradient>',
    );
    return `url(#${gid})`;
  };
  const body: string[] = [`<rect width="${S}" height="${S}" rx="110" fill="${fill({ cx: BG_LIGHT.cx, cy: BG_LIGHT.cy, r: BG_LIGHT.r, stops: ic.bg })}"/>`];
  for (const sh of ic.shapes) {
    if (sh.k === 'circle') body.push(`<circle cx="${n(sh.cx)}" cy="${n(sh.cy)}" r="${n(sh.r)}" fill="${fill(sh.fill)}"/>`);
    else if (sh.k === 'rect') body.push(`<rect x="${n(sh.x)}" y="${n(sh.y)}" width="${n(sh.w)}" height="${n(sh.h)}" rx="${n(sh.r)}" fill="${fill(sh.fill)}"/>`);
    else if (sh.k === 'line')
      body.push(`<line x1="${n(sh.x1)}" y1="${n(sh.y1)}" x2="${n(sh.x2)}" y2="${n(sh.y2)}" stroke="${sh.color}" stroke-width="${n(sh.w)}" stroke-linecap="round"/>`);
    else if (sh.k === 'curve')
      body.push(`<path d="M${n(sh.p[0])} ${n(sh.p[1])}C${sh.p.slice(2).map(n).join(' ')}" fill="none" stroke="${sh.color}" stroke-width="${n(sh.w)}" stroke-linecap="round"/>`);
    else {
      const period = (Math.PI * 2 * sh.r) / (sh.dashes || 1);
      const dash = sh.dashes ? ` stroke-dasharray="${n(period * (sh.on || 0.5))} ${n(period * (1 - (sh.on || 0.5)))}"` : '';
      body.push(`<circle cx="${n(sh.cx)}" cy="${n(sh.cy)}" r="${n(sh.r)}" fill="none" stroke="${sh.color}" stroke-width="${n(sh.w)}"${dash}/>`);
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}">` + (defs.length ? `<defs>${defs.join('')}</defs>` : '') + body.join('') + '</svg>\n';
}

// ---------- PNG ----------

function gradient(stops: Stops, cx: number, cy: number, r: number): (x: number, y: number) => RGB {
  const rgb = stops.map((s): [number, RGB] => [s[0], hex(s[1])]);
  return (x, y) => {
    const t = clamp(Math.hypot(x - cx, y - cy) / r);
    let k = 1;
    while (k < rgb.length - 1 && t > rgb[k][0]) k++;
    const a = rgb[k - 1];
    const b = rgb[k];
    return mix(a[1], b[1], clamp((t - a[0]) / (b[0] - a[0] || 1)));
  };
}

/**
 * Rohbild (RGB) in `size` Pixeln. Ohne abgerundete Ecken und ohne Transparenz: Home-Bildschirme runden selbst ab,
 * und „maskable“ verlangt eine volle Fläche.
 */
export function renderIcon(id: string, size: number): Uint8Array {
  const ic = icon(id);
  const k = size / S;
  const c = new Canvas(size, size);
  const all = [0, 0, size, size];
  const paint = (f: Fill): Paint => (typeof f === 'string' ? hex(f) : gradient(f.stops, f.cx * k, f.cy * k, f.r * k));
  c.shape(() => -1, all, gradient(ic.bg, BG_LIGHT.cx * k, BG_LIGHT.cy * k, BG_LIGHT.r * k));
  for (const sh of ic.shapes) {
    let sdf: Sdf;
    let fill: Fill;
    if (sh.k === 'circle') {
      sdf = circle(sh.cx * k, sh.cy * k, sh.r * k);
      fill = sh.fill;
    } else if (sh.k === 'rect') {
      sdf = roundRect(sh.x * k, sh.y * k, (sh.x + sh.w) * k, (sh.y + sh.h) * k, sh.r * k);
      fill = sh.fill;
    } else if (sh.k === 'line') {
      sdf = segment(sh.x1 * k, sh.y1 * k, sh.x2 * k, sh.y2 * k, sh.w * k);
      fill = sh.color;
    } else if (sh.k === 'curve') {
      sdf = curve(
        sh.p.map((v) => v * k),
        sh.w * k,
      );
      fill = sh.color;
    } else {
      sdf = sh.dashes ? dashedRing(sh.cx * k, sh.cy * k, sh.r * k, sh.w * k, sh.dashes, sh.on || 0.5) : ring(sh.cx * k, sh.cy * k, sh.r * k, sh.w * k);
      fill = sh.color;
    }
    c.shape(sdf, all, paint(fill));
  }
  return c.rgb();
}

export function iconPng(id: string, size: number): Uint8Array {
  return encodePng(renderIcon(id, size), size, size);
}

/** Dunkelster Ton des Hintergrunds – für Startbildschirm und Browserleiste im Manifest. */
export function iconColor(id: string): string {
  const bg = icon(id).bg;
  return bg[bg.length - 1][1];
}
