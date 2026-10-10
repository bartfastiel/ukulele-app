/**
 * Holz je Instrument, einmal beim Start auf Canvas gerechnet und als Hintergrundbild verwendet – keine Bilddateien,
 * keine Filter pro Frame. Die Texturen sind nahtlos kachelbar (periodisches Rauschen, ganzzahlige Frequenzen) und groß
 * genug, dass jeder Knopf einen eigenen Ausschnitt bekommt (zufällig verschoben, teils gespiegelt): So wiederholt sich
 * die Maserung nicht sichtbar.
 *
 *   Ukulele  Mahagoni (Korpus und Knöpfe), cremefarbene Einfassung
 *   Gitarre  Hintergrund aus gealterter Fichtendecke, Knöpfe aus Palisander, Einfassung elfenbein-schwarz
 *   Banjo    gebeizter, geflammter Ahorn (Resonator und Knöpfe), Einfassung wie verchromte Spannreifen
 *   Bariton  dunkles, geriegeltes Koa (Korpus), Knöpfe aus hellerem Koa, Einfassung elfenbein mit Abalone-Streifen
 *   Mandoline  Fichtendecke im Sunburst (Mitte bernsteinfarben, Rand fast schwarz – der Verlauf liegt in styles.css),
 *            Knöpfe aus kirschrot gebeiztem, geflammtem Ahorn, Einfassung mehrfach elfenbein-schwarz mit Schildpatt
 *   E-Bass   schwarz gebeizte Esche mit grau durchscheinenden Jahresringen (Korpus), Knöpfe aus Esche unter
 *            Bernsteinlack, Einfassung wie die Kante eines Schlagbretts: weiß-schwarz-weiß
 */
import { instrument } from '../music/instrument.ts';

export type RGB = [number, number, number];

function lattice(px: number, py: number, seed: number): (x: number, y: number) => number {
  const vals = new Float32Array(px * py);
  let s = seed;
  for (let i = 0; i < vals.length; i++) {
    s = (s * 16807) % 2147483647;
    vals[i] = s / 2147483647;
  }
  return (x, y) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const fx = x - xi;
    const fy = y - yi;
    const sx = fx * fx * (3 - 2 * fx);
    const sy = fy * fy * (3 - 2 * fy);
    const at = (a: number, b: number) => vals[(((b % py) + py) % py) * px + (((a % px) + px) % px)];
    const top = at(xi, yi) + (at(xi + 1, yi) - at(xi, yi)) * sx;
    const bot = at(xi, yi + 1) + (at(xi + 1, yi + 1) - at(xi, yi + 1)) * sx;
    return top + (bot - top) * sy;
  };
}

/** Helligkeit 0..1 der Maserung an (u, v) ∈ [0, 1)²; waagrechte Faser, kachelbar. */
type Grain = (u: number, v: number) => number;

const TAU = Math.PI * 2;
const clamp = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);

function mahogany(seed: number): Grain {
  const warp = lattice(4, 4, 7 + seed);
  const warp2 = lattice(8, 8, 5 + seed);
  const fine = lattice(128, 24, 11 + seed);
  const ribbon = lattice(12, 3, 3 + seed);
  return (u, v) => {
    const w = warp(u * 4, v * 4) * 2.2 + warp2(u * 8, v * 8) * 0.6;
    const grain = Math.sin(v * TAU * 34 + w * 3.2) * 0.5 + 0.5;
    const pores = fine(u * 128, v * 24);
    // Riegel: breite, schimmernde Querbänder, typisch für Mahagoni
    const rib = ribbon(u * 12, v * 3);
    return clamp((0.25 + grain * 0.38 + (pores - 0.5) * 0.22) * (0.78 + rib * 0.44));
  };
}

function rosewood(seed: number): Grain {
  const warp = lattice(3, 6, 21 + seed);
  const streaks = lattice(6, 48, 23 + seed);
  const fine = lattice(160, 32, 29 + seed);
  return (u, v) => {
    const w = warp(u * 3, v * 6) * 3.0;
    const grain = Math.sin(v * TAU * 40 + w * 4) * 0.5 + 0.5;
    // lange, dunkle, unregelmäßige Adern – das Erkennungszeichen von Palisander
    const st = streaks(u * 6, v * 48);
    const dark = st > 0.62 ? (st - 0.62) * 2.6 : 0;
    const pores = fine(u * 160, v * 32);
    return clamp(0.35 + grain * 0.3 + (pores - 0.5) * 0.18 - dark);
  };
}

function spruce(seed: number): Grain {
  const warp = lattice(2, 4, 31 + seed);
  const silk = lattice(40, 3, 37 + seed);
  const fine = lattice(200, 16, 41 + seed);
  return (u, v) => {
    const w = warp(u * 2, v * 4) * 1.4;
    // dichte, gerade Jahresringe: feine dunkle Spätholz-Linien auf hellem Frühholz, unterschiedlich kräftig
    const ring = Math.sin(v * TAU * 150 + w * 5) * 0.5 + 0.5;
    const strength = 0.15 + warp(u * 2 + 1.7, v * 4 + 0.3) * 0.35;
    const late = Math.pow(ring, 8) * strength;
    // „Seidenglanz“ quer zur Faser
    const sk = silk(u * 40, v * 3);
    return clamp(0.72 - late + (sk - 0.5) * 0.2 + (fine(u * 200, v * 16) - 0.5) * 0.08);
  };
}

function flamedMaple(seed: number): Grain {
  const warp = lattice(3, 3, 51 + seed);
  const flameAmp = lattice(5, 2, 53 + seed);
  const fine = lattice(140, 20, 57 + seed);
  return (u, v) => {
    const w = warp(u * 3, v * 3) * 2;
    const grain = Math.sin(v * TAU * 24 + w * 2) * 0.5 + 0.5;
    // Flammen: weiche Bänder quer zur Faser, die schräg verlaufen und mal kräftig, mal kaum zu sehen sind
    const flame = Math.sin(u * TAU * 20 + v * TAU * 3 + Math.sin(v * TAU * 2 + w * 2) * 3 + w * 4) * 0.5 + 0.5;
    const amp = Math.pow(flameAmp(u * 5, v * 2), 1.5);
    return clamp(0.45 + grain * 0.14 + (flame - 0.5) * amp * 0.55 + (fine(u * 140, v * 20) - 0.5) * 0.1);
  };
}

/**
 * Koa: Die Faser bildet keine gleichmäßigen Linien, sondern unterschiedlich helle Bänder (golden bis schokoladenbraun).
 * Der Riegel („Curl“) schimmert quer dazu – weich, unregelmäßig im Abstand und je Band versetzt, mal kräftig, mal
 * kaum zu sehen. Regelmäßige Streifen in beiden Richtungen ergäben ein Gitter wie Stoff.
 */
function koa(seed: number): Grain {
  const warp = lattice(3, 5, 61 + seed);
  const bands = lattice(2, 14, 63 + seed);
  const narrow = lattice(3, 44, 65 + seed);
  const lines = lattice(5, 170, 67 + seed);
  const curlWarp = lattice(7, 3, 69 + seed);
  const curlAmp = lattice(4, 3, 71 + seed);
  const streaks = lattice(3, 64, 73 + seed);
  return (u, v) => {
    const w = warp(u * 3, v * 5);
    const b1 = bands(u * 2, v * 14 + w * 2);
    const b2 = narrow(u * 3, v * 44 + w * 4);
    const fine = lines(u * 5, v * 170 + w * 8);
    // Querschimmer: Abstand und Lage schwanken, und jedes Faserband verschiebt ihn ein Stück
    const phase = u * TAU * 18 + curlWarp(u * 7, v * 3) * TAU * 2.2 + b1 * 2 + b2 * 2.5;
    const curl = (Math.sin(phase) + Math.sin(phase * 2 + 1.3) * 0.35) / 1.35;
    const amp = Math.pow(curlAmp(u * 4, v * 3), 1.6) * (0.4 + b1);
    const st = streaks(u * 3, v * 64 + w * 5);
    const dark = st > 0.7 ? (st - 0.7) * 1.6 : 0;
    return clamp(0.44 + (b1 - 0.5) * 0.62 + (b2 - 0.5) * 0.26 + (fine - 0.5) * 0.08 + curl * amp * 0.26 - dark);
  };
}

function ash(seed: number): Grain {
  const warp = lattice(3, 5, 81 + seed);
  const width = lattice(4, 12, 83 + seed);
  const pores = lattice(40, 150, 89 + seed);
  return (u, v) => {
    const w = warp(u * 3, v * 5);
    // Fladerschnitt: Jahresringe als flache, ineinander liegende Bögen („Kathedralen“) längs der Faser
    const arch = Math.cos(u * TAU + w * 1.6) * (0.5 + w * 0.5);
    const ring = (v * 9 + arch + w * 0.8) % 1;
    const r = ring < 0 ? ring + 1 : ring;
    // Frühholz: ein breites, grob poriges Band – bei Esche das kräftige Erkennungszeichen
    const band = 0.3 + width(u * 4, v * 12) * 0.15;
    const early = r < band ? Math.pow(Math.sin((r / band) * Math.PI), 0.7) : 0;
    // Poren: kurze Striche längs der Faser, im Frühholz dicht und offen
    const p = pores(u * 40, v * 150);
    const open = early * (0.4 + 0.6 * clamp((p - 0.35) * 3));
    return clamp(0.7 - open * 0.55 + (p - 0.5) * 0.12 - r * 0.1);
  };
}

export interface Material {
  grain: (seed: number) => Grain;
  dark: RGB;
  light: RGB;
}

export const MATERIALS: Record<string, { body: Material; button: Material }> = {
  ukulele: {
    body: { grain: mahogany, dark: [58, 20, 9], light: [122, 48, 22] },
    button: { grain: mahogany, dark: [92, 32, 14], light: [168, 72, 34] },
  },
  gitarre: {
    // gealterte, lackierte Fichtendecke: honigfarben, aber dunkel genug für helle Überschriften
    body: { grain: spruce, dark: [70, 44, 16], light: [150, 104, 46] },
    button: { grain: rosewood, dark: [28, 14, 14], light: [104, 58, 44] },
  },
  banjo: {
    // tabakfarben gebeizter Ahorn (Resonator), Knöpfe aus hellerem geflammtem Ahorn
    body: { grain: flamedMaple, dark: [40, 20, 8], light: [116, 64, 24] },
    button: { grain: flamedMaple, dark: [112, 60, 18], light: [204, 136, 60] },
  },
  bariton: {
    // dunkles Koa für den Korpus, die Knöpfe goldbraun – verwandt mit der Ukulele, aber kühler und tiefer
    body: { grain: koa, dark: [34, 17, 8], light: [136, 80, 34] },
    button: { grain: koa, dark: [86, 44, 16], light: [188, 120, 52] },
  },
  mandoline: {
    body: { grain: spruce, dark: [66, 30, 8], light: [170, 100, 30] },
    button: { grain: flamedMaple, dark: [72, 16, 10], light: [184, 70, 32] },
  },
  bass: {
    // schwarz gebeizte Esche, die Jahresringe schimmern grau durch; Knöpfe aus Esche unter Bernsteinlack
    body: { grain: ash, dark: [8, 8, 10], light: [86, 84, 80] },
    button: { grain: ash, dark: [54, 30, 12], light: [172, 120, 58] },
  },
};

/** Rechnet die Textur in Streifen und gibt dazwischen den Browser frei (alte iPads, langsame Rechner). */
export function renderWood(material: Material, size: number, seed: number, done: (canvas: HTMLCanvasElement) => void): void {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const g = canvas.getContext('2d')!;
  const rows = 32;
  const grain = material.grain(seed);
  const d = material.dark;
  const l = material.light;
  let y0 = 0;
  const step = () => {
    const h = Math.min(rows, size - y0);
    const img = g.createImageData(size, h);
    for (let y = 0; y < h; y++) {
      const v = (y0 + y) / size;
      for (let x = 0; x < size; x++) {
        const t = grain(x / size, v);
        const i = (y * size + x) * 4;
        img.data[i] = d[0] + (l[0] - d[0]) * t;
        img.data[i + 1] = d[1] + (l[1] - d[1]) * t;
        img.data[i + 2] = d[2] + (l[2] - d[2]) * t;
        img.data[i + 3] = 255;
      }
    }
    g.putImageData(img, 0, y0);
    y0 += h;
    if (y0 < size) window.setTimeout(step, 0);
    else done(canvas);
  };
  window.setTimeout(step, 0);
}

/** Gespiegelte Kopie (billig, ohne neu zu rechnen): zweite Variante für die Knöpfe. */
function mirrored(src: HTMLCanvasElement): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = src.width;
  c.height = src.height;
  const g = c.getContext('2d')!;
  g.translate(src.width, src.height);
  g.scale(-1, -1);
  g.drawImage(src, 0, 0);
  return c;
}

const BODY = 768;
const BUTTON = 512;

/** Jeder Knopf bekommt seinen eigenen Ausschnitt: zufällig verschoben, jeder zweite aus der gespiegelten Textur. */
function vary(el: Element): void {
  const s = (el as HTMLElement).style;
  if (!s || s.getPropertyValue('--wx')) return;
  s.setProperty('--wx', `${-Math.floor(Math.random() * BUTTON)}px`);
  s.setProperty('--wy', `${-Math.floor(Math.random() * BUTTON)}px`);
  if (Math.random() < 0.5) s.setProperty('--wood-btn-el', 'var(--wood-btn-b)');
}

function varyAll(root: ParentNode): void {
  const list = root.querySelectorAll('.btn');
  for (let i = 0; i < list.length; i++) vary(list[i]);
}

/** Einmal gerechnete Texturen bleiben im Cache des Browsers: Jede weitere Seite bekommt sie sofort. Ändert sich die
 * Maserung, die Nummer erhöhen. */
const CACHE = 'saiten-holz-2';

function cached(key: string): Promise<string | null> {
  if (typeof caches === 'undefined') return Promise.resolve(null);
  return caches
    .open(CACHE)
    .then((c) => c.match(key))
    .then((r) => (r ? r.blob() : null))
    .then((b) => (b ? URL.createObjectURL(b) : null))
    .catch(() => null);
}

/** Texturen einer früheren Maserung freigeben. */
function dropOldCaches(): void {
  if (typeof caches === 'undefined') return;
  caches
    .keys()
    .then((keys) => Promise.all(keys.filter((k) => k.indexOf('saiten-holz-') === 0 && k !== CACHE).map((k) => caches.delete(k))))
    .catch(() => undefined);
}

function store(key: string, canvas: HTMLCanvasElement, apply: (url: string) => void): void {
  dropOldCaches();
  if (!canvas.toBlob) {
    apply(canvas.toDataURL());
    return;
  }
  canvas.toBlob((b) => {
    if (!b) return apply(canvas.toDataURL());
    apply(URL.createObjectURL(b));
    if (typeof caches !== 'undefined')
      caches
        .open(CACHE)
        .then((c) => c.put(key, new Response(b, { headers: { 'Content-Type': 'image/png' } })))
        .catch(() => undefined);
  }, 'image/png');
}

export function installWood(): void {
  const root = document.documentElement;
  const id = instrument().id;
  const mat = MATERIALS[id] || MATERIALS.ukulele;
  const css = (name: string) => (url: string) => root.style.setProperty(name, `url("${url}")`);
  const key = (name: string) => `${root.getAttribute('data-base') || '/'}holz/${id}-${name}.png`;
  const texture = (name: string, m: Material, size: number, seed: number, then?: (c: HTMLCanvasElement | null) => void) =>
    cached(key(name)).then((url) => {
      if (url) {
        css(`--wood-${name}`)(url);
        if (then) then(null);
        return;
      }
      renderWood(m, size, seed, (c) => {
        store(key(name), c, css(`--wood-${name}`));
        if (then) then(c);
      });
    });
  // erst die Knöpfe, dann der Hintergrund; bis dahin gilt die Grundfarbe
  void texture('btn', mat.button, BUTTON, 0, (c) => {
    if (c) store(key('btn-b'), mirrored(c), css('--wood-btn-b'));
    else void cached(key('btn-b')).then((url) => url && css('--wood-btn-b')(url));
    void texture('body', mat.body, BODY, 1);
  });
  // jede Seite beginnt an einer anderen Stelle der Maserung
  root.style.setProperty('--body-x', `${-Math.floor(Math.random() * BODY)}px`);
  root.style.setProperty('--body-y', `${-Math.floor(Math.random() * BODY)}px`);
  const start = () => {
    varyAll(document);
    if (typeof MutationObserver === 'undefined') return;
    new MutationObserver((records) => {
      for (const r of records)
        for (let i = 0; i < r.addedNodes.length; i++) {
          const n = r.addedNodes[i];
          if (n.nodeType !== 1) continue;
          if ((n as Element).classList.contains('btn')) vary(n as Element);
          varyAll(n as Element);
        }
    }).observe(document.body, { childList: true, subtree: true });
  };
  if (document.body) start();
  else document.addEventListener('DOMContentLoaded', start);
}
