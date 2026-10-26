/**
 * App-Symbole je Instrument-Seite (Favicon als SVG, Home-Bildschirm und Manifest als PNG), im Build erzeugt. Eine
 * Beschreibung aus einfachen Formen ergibt beide Fassungen, so sehen SVG und PNG gleich aus. Gleicher Aufbau für alle
 * (docs/design.md): ruhige Fläche in der Akzentfarbe, davor das Zeichen von Open String (Bogen und Punkt, wie
 * `logo()` in src/ui/icons.ts). Die Instrumente unterscheiden sich an den hellen Saiten dahinter – Zahl und Stärke wie
 * beim echten Instrument; die Startseite hat keine Saiten.
 */
import { Canvas, circle, clamp, curve, dashedRing, encodePng, hex, mix, ring, roundRect, segment, type Paint, type RGB, type Sdf } from './og-image.ts';

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
  /** Hintergrund (radialer Verlauf; im Design „Klar“ eine einzige Farbe). */
  bg: Stops;
  shapes: Shape[];
}

const BG_LIGHT = { cx: 205, cy: 154, r: 461 };
const ACCENT = '#0a7c6e';
/** Saiten: Weiß auf der Akzentfläche, zurückgenommen */
const STRING = '#4fa397';

/**
 * Zeichen von Open String aus src/ui/icons.ts (30 × 30) auf 360 px vergrößert und mittig: bleibt im sicheren Kreis der
 * „maskable“-Symbole.
 */
function mark(): Shape[] {
  const k = 12;
  const o = (S - 30 * k) / 2;
  const p = (x: number, y: number) => [o + x * k, o + y * k];
  return [
    { k: 'curve', p: [...p(8, 20), ...p(11, 12), ...p(19, 12), ...p(22, 20)], w: 2.4 * k, color: '#ffffff' },
    { k: 'circle', cx: o + 15 * k, cy: o + 12 * k, r: 2.5 * k, fill: '#ffffff' },
  ];
}

/** Senkrechte Saiten über das ganze Symbol: Lage auf einem 24er-Raster wie das Saiten-Zeichen der Startseite. */
function strings(xs: number[], width: (i: number) => number): Shape[] {
  return xs.map((x, i): Shape => ({ k: 'line', x1: (x * S) / 24, y1: -20, x2: (x * S) / 24, y2: S + 20, w: width(i), color: STRING }));
}

const flat: Stops = [
  [0, ACCENT],
  [1, ACCENT],
];

const ICONS: Record<string, Icon> = {
  // vier gleich dünne Nylonsaiten
  ukulele: { bg: flat, shapes: [...strings([6, 10, 14, 18], () => 9), ...mark()] },
  // sechs Saiten, die tiefen dicker
  gitarre: { bg: flat, shapes: [...strings([4, 7, 10, 14, 17, 20], (i) => 14 - i * 1.6), ...mark()] },
  // fünf Saiten, die kurze fünfte endet oben am Hals (hier: die erste nur bis zur Mitte)
  banjo: { bg: flat, shapes: [{ k: 'line', x1: (5 * S) / 24, y1: S / 2, x2: (5 * S) / 24, y2: S + 20, w: 7, color: STRING }, ...strings([8.5, 12, 15.5, 19], () => 7), ...mark()] },
  // vier Saiten, zwei davon umsponnen und dicker
  bariton: { bg: flat, shapes: [...strings([6, 10, 14, 18], (i) => (i < 2 ? 16 : 9)), ...mark()] },
  // vier Saitenpaare
  mandoline: { bg: flat, shapes: [...strings([5, 6.4, 9.8, 11.2, 12.8, 14.2, 17.6, 19], () => 5), ...mark()] },
  // vier dicke Saiten
  bass: { bg: flat, shapes: [...strings([6, 10, 14, 18], () => 20), ...mark()] },
  // Startseite: nur das Zeichen
  start: { bg: flat, shapes: mark() },
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
