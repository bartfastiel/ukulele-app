import { s } from './dom.ts';
import { describeChord, type Chord } from '../music/chords.ts';
import { STRINGS } from '../music/notes.ts';
import { instrument } from '../music/instrument.ts';
import { t } from '../i18n.ts';

/** Finger 5 ist der Daumen, der über den Hals greift: im Bild sein Anfangsbuchstabe (D, T, P). */
function fingerLabel(f: number): string {
  return f === 5 ? t('Daumen').charAt(0).toUpperCase() : String(f);
}

/** Farben wie in docs/design.md („Griffbild“); SVG-Attribute statt CSS, damit vorgerenderte Seiten gleich aussehen. */
const INK = '#1C1C1E';
const INK_2 = '#55575E';
const INK_3 = '#9A9CA3';
const FRET = '#D5D7DC';
const ACCENT = '#0A7C6E';

/**
 * Griffbild wie im Schulheft: Griffbrett senkrecht, Sattel oben, Saiten in Spielreihenfolge von links nach rechts
 * (Ukulele G-C-E-A, Gitarre E-A-D-G-B-e, Banjo g-D-G-B-D; für Linkshänder gespiegelt). Dunkle Saiten und Sattel,
 * helle Bünde, Finger als Punkte in der Akzentfarbe, ein Barré als Balken. Liegt ein Griff höher als im 5. Bund,
 * beginnt das Bild an seinem tiefsten Bund mit der Bundzahl daneben.
 */
export interface DiagramOptions {
  lefty?: boolean;
  highlight?: number;
  labels?: boolean;
  /** E-Bass: die Quinte als Kreis „5“ zeigen */
  fifth?: boolean;
  /** Zum Drucken: weiß, dünne schwarze Linien, kaum Tinte (siehe printDiagram) */
  print?: boolean;
  /** Druck: Fingerzahlen in hellen Kreisen statt schwarzer Punkte (für größere Bilder) */
  fingers?: boolean;
}

/** Maße eines Griffbilds in viewBox-Einheiten – zum Zeichnen und, um Berührungen einer Stelle zuzuordnen. */
export interface DiagramLayout {
  n: number;
  /** erster gezeigter Bund und Zahl der Bundreihen */
  first: number;
  rows: number;
  x0: number;
  gap: number;
  y0: number;
  fh: number;
  width: number;
  height: number;
  /** Saite (Spielreihenfolge) je Spalte von links */
  order: number[];
}

export function diagramLayout(ch: Chord, opts: DiagramOptions = {}): DiagramLayout {
  const n = ch.frets.length;
  // E-Bass: ein Ton, die anderen Saiten bleiben einfach still – ohne Kreuz; auf Wunsch die Quinte als Kreis
  const fifth = opts.fifth && ch.fifth ? ch.fifth : null;
  const pressed = ch.frets.filter((f) => f > 0).concat(fifth ? [fifth.fret] : []);
  const top = pressed.length ? Math.max(...pressed) : 0;
  const first = top > 5 ? Math.min(...pressed) : 1;
  const rows = Math.max(instrument().diagram.minRows, top - first + 1);
  const x0 = first > 1 ? 26 : 18;
  const gap = 22;
  const y0 = 26;
  const fh = 24;
  const order: number[] = [];
  for (let i = 0; i < n; i++) order.push(opts.lefty ? n - 1 - i : i);
  return { n, first, rows, x0, gap, y0, fh, width: x0 + gap * (n - 1) + 18, height: y0 + fh * rows + (opts.labels === false ? 8 : 26), order };
}

/**
 * Griffbild zum Ausdrucken: gleiche Anordnung wie am Bildschirm, aber nur dünne schwarze Linien auf Weiß – spart Tinte
 * und bleibt auf jedem Schwarzweiß-Drucker klar. Klein (über dem Liedtext) als schwarze Punkte, größer mit Fingerzahl.
 */
export function printDiagram(ch: Chord, opts: DiagramOptions = {}): SVGElement {
  const inst = instrument();
  const L = diagramLayout(ch, opts);
  const n = L.n;
  const first = L.first;
  const y0 = L.y0;
  const fh = L.fh;
  const boardW = L.gap * (n - 1);
  const bottom = y0 + fh * L.rows;
  const xOf = (i: number) => L.x0 + L.order.indexOf(i) * L.gap;
  const yOf = (fret: number) => y0 + fh * (fret - first + 0.5);
  const ink = '#000';
  const svg = s('svg', {
    viewBox: `0 0 ${L.width} ${L.height}`,
    class: `pd-svg strings-${n}`,
    role: 'img',
    'aria-label': describeChord(ch),
  });
  const line = (x1: number, y1: number, x2: number, y2: number, w: number, extra: Record<string, string | number> = {}) =>
    svg.appendChild(s('line', { x1, y1, x2, y2, stroke: ink, 'stroke-width': w, 'stroke-linecap': 'round', ...extra }));
  for (let f = 0; f <= L.rows; f++) line(L.x0, y0 + fh * f, L.x0 + boardW, y0 + fh * f, f === 0 && first === 1 ? 4.5 : 1.2);
  if (first > 1) svg.appendChild(s('text', { x: 2, y: y0 + fh * 0.5 + 5, class: 'pd-fret', fill: ink }, String(first)));
  for (let i = 0; i < n; i++) {
    const x = xOf(i);
    const start = STRINGS[i] ? STRINGS[i].start || 0 : 0;
    if (start >= first) {
      // kurze Banjo-Saite: bis zu ihrem Wirbel gestrichelt
      const pegY = start - first + 1 <= L.rows ? y0 + fh * (start - first + 1) : bottom;
      line(x, y0, x, pegY, 0.8, { 'stroke-dasharray': '2 4' });
      if (pegY < bottom) {
        line(x, pegY, x, bottom, 1.2);
        svg.appendChild(s('circle', { cx: x, cy: pegY, r: 3.2, fill: '#fff', stroke: ink, 'stroke-width': 1.2 }));
      }
    } else line(x, y0, x, bottom, 1.2);
  }
  const barre = ch.barre && ch.barre.fret >= first ? ch.barre : null;
  const big = !!opts.fingers;
  const dot = { fill: big ? '#fff' : ink, stroke: ink, 'stroke-width': big ? 1.6 : 0 };
  if (barre) {
    const xa = Math.min(xOf(barre.from), xOf(barre.to));
    const xb = Math.max(xOf(barre.from), xOf(barre.to));
    const r = big ? 9.6 : 7.4;
    svg.appendChild(s('rect', { x: xa - r, y: yOf(barre.fret) - r, width: xb - xa + 2 * r, height: 2 * r, rx: r, class: 'barre', ...dot }));
  }
  const onBarre = (i: number) => !!barre && ch.frets[i] === barre.fret && ch.fingers[i] === 1 && i >= barre.from && i <= barre.to;
  for (let i = 0; i < n; i++) {
    const fret = ch.frets[i];
    const x = xOf(i);
    if (fret === 0) svg.appendChild(s('circle', { cx: x, cy: y0 - 13, r: 5, fill: 'none', stroke: ink, 'stroke-width': 1.5, class: 'open' }));
    else if (fret === -1 && !inst.notesOnly)
      svg.appendChild(s('path', { d: `M${x - 4.5} ${y0 - 17.5}l9 9m0 -9l-9 9`, stroke: ink, 'stroke-width': 1.6, 'stroke-linecap': 'round', class: 'muted' }));
    else if (fret > 0) {
      const cy = yOf(fret);
      if (!onBarre(i)) svg.appendChild(s('circle', { cx: x, cy, r: big ? 9.6 : 7.4, ...dot }));
      if (big && ch.fingers[i] && (!onBarre(i) || i === barre!.from))
        svg.appendChild(s('text', { x, y: cy + 5, 'text-anchor': 'middle', class: 'pd-finger', fill: ink }, String(ch.fingers[i])));
    }
  }
  if (opts.labels !== false)
    for (let i = 0; i < n; i++)
      svg.appendChild(s('text', { x: xOf(i), y: bottom + 19, 'text-anchor': 'middle', class: 'pd-label', fill: ink }, STRINGS[i] ? STRINGS[i].name : ''));
  return svg;
}

export function chordDiagram(ch: Chord, opts: DiagramOptions = {}): SVGElement {
  if (opts.print) return printDiagram(ch, opts);
  const inst = instrument();
  const L = diagramLayout(ch, opts);
  const fifth = opts.fifth && ch.fifth ? ch.fifth : null;
  const n = L.n;
  const first = L.first;
  const rows = L.rows;
  const shown = (fret: number) => fret - first + 1;
  const x0 = L.x0;
  const gap = L.gap;
  const y0 = L.y0;
  const fh = L.fh;
  const boardW = gap * (n - 1);
  const width = L.width;
  const height = L.height;
  const order = L.order;
  const xOf = (stringIdx: number) => x0 + order.indexOf(stringIdx) * gap;

  const svg = s('svg', {
    viewBox: `0 0 ${width} ${height}`,
    class: `chord-svg strings-${n}`,
    role: 'img',
    'aria-label': describeChord(ch),
  });
  const boardTop = y0;
  const boardBottom = y0 + fh * rows;
  // Griffbrett als Fläche nur zum Antippen (klingende Griffbilder); sichtbar sind Linien und Punkte
  svg.appendChild(s('rect', { x: x0 - 10, y: boardTop, width: boardW + 20, height: boardBottom - boardTop + 4, fill: 'transparent', class: 'board' }));
  // Markierungen an den üblichen Bünden (Ukulele: 5. Bund), soweit sichtbar
  for (const f of inst.diagram.inlays) {
    if (f < first || f > first + rows - 1) continue;
    const cy = y0 + fh * (shown(f) - 0.5);
    const cx = x0 + boardW / 2;
    if (f === 12) {
      svg.appendChild(s('circle', { cx: cx - gap, cy, r: 3, fill: FRET }));
      svg.appendChild(s('circle', { cx: cx + gap, cy, r: 3, fill: FRET }));
    } else svg.appendChild(s('circle', { cx, cy, r: 3, fill: FRET }));
  }
  for (let f = 1; f <= rows; f++)
    svg.appendChild(s('line', { x1: x0, y1: y0 + fh * f, x2: x0 + boardW, y2: y0 + fh * f, stroke: FRET, 'stroke-width': 1.6 }));
  if (first > 1) {
    // höher am Hals: kein Sattel, dafür die Bundzahl links neben dem ersten Bund
    svg.appendChild(s('line', { x1: x0, y1: y0, x2: x0 + boardW, y2: y0, stroke: FRET, 'stroke-width': 1.6 }));
    svg.appendChild(s('text', { x: 2, y: y0 + fh * 0.5 + 5, class: 'fret-number', fill: INK }, String(first)));
  } else
    // Sattel
    svg.appendChild(s('line', { x1: x0 - 1, y1: y0 - 1, x2: x0 + boardW + 1, y2: y0 - 1, stroke: INK, 'stroke-width': 4.5, 'stroke-linecap': 'round' }));
  for (let i = 0; i < n; i++) {
    const x = xOf(i);
    const hl = opts.highlight === i;
    const start = STRINGS[i] ? STRINGS[i].start || 0 : 0;
    const attrs = {
      x1: x,
      y1: y0 - 1,
      x2: x,
      y2: boardBottom,
      stroke: hl ? ACCENT : INK,
      'stroke-width': hl ? 3.2 : 1.2 + (n === 6 ? (2 - Math.min(i, 2)) * 0.25 : 0),
      'stroke-linecap': 'round',
      class: 'string',
      'data-string': i,
    };
    if (start >= first) {
      // kurze Banjo-Saite: erst ab ihrem Wirbel am 5. Bund eine echte Saite, darüber nur angedeutet
      const pegY = start - first + 1 <= rows ? y0 + fh * shown(start) : boardBottom;
      svg.appendChild(s('line', { x1: x, y1: y0 - 1, x2: x, y2: pegY, stroke: INK_3, 'stroke-width': 1, 'stroke-dasharray': '2 4' }));
      attrs.y1 = pegY;
      if (pegY <= boardBottom) svg.appendChild(s('circle', { cx: x, cy: pegY, r: 3.2, fill: '#fff', stroke: INK, 'stroke-width': 1.2 }));
    }
    svg.appendChild(s('line', attrs));
  }
  const barre = ch.barre;
  if (barre && barre.fret >= first) {
    const cy = y0 + fh * (shown(barre.fret) - 0.5);
    const xa = Math.min(xOf(barre.from), xOf(barre.to));
    const xb = Math.max(xOf(barre.from), xOf(barre.to));
    svg.appendChild(s('rect', { x: xa - 8.6, y: cy - 8.6, width: xb - xa + 17.2, height: 17.2, rx: 8.6, fill: ACCENT, class: 'barre' }));
  }
  const onBarre = (i: number) => !!barre && ch.frets[i] === barre.fret && ch.fingers[i] === 1 && i >= barre.from && i <= barre.to;
  for (let i = 0; i < n; i++) {
    const fret = ch.frets[i];
    const x = xOf(i);
    if (fret === 0) {
      svg.appendChild(s('circle', { cx: x, cy: y0 - 14, r: 4.6, fill: 'none', stroke: INK, 'stroke-width': 1.8, class: 'open' }));
    } else if (fret === -1 && inst.notesOnly) {
      if (fifth && fifth.string === i) {
        const cy = y0 + fh * (shown(fifth.fret) - 0.5);
        svg.appendChild(s('circle', { cx: x, cy, r: 8.6, fill: '#fff', stroke: ACCENT, 'stroke-width': 2, class: 'fifth' }));
        svg.appendChild(s('text', { x, y: cy + 4.2, 'text-anchor': 'middle', class: 'finger', fill: ACCENT }, '5'));
      }
    } else if (fret === -1) {
      svg.appendChild(s('path', { d: `M${x - 4.5} ${y0 - 18.5}l9 9m0 -9l-9 9`, stroke: INK, 'stroke-width': 2, 'stroke-linecap': 'round', class: 'muted' }));
    } else if (fret < 0) {
      continue;
    } else {
      const cy = y0 + fh * (shown(fret) - 0.5);
      if (onBarre(i)) {
        // die Ziffer des Zeigefingers steht einmal auf dem Balken (an seinem ersten Ende)
        if (i === barre!.from) svg.appendChild(s('text', { x, y: cy + 4.2, 'text-anchor': 'middle', class: 'finger', fill: '#fff' }, '1'));
        continue;
      }
      svg.appendChild(s('circle', { cx: x, cy, r: 8.6, fill: ACCENT, class: 'dot' }));
      if (ch.fingers[i])
        svg.appendChild(s('text', { x, y: cy + 4.2, 'text-anchor': 'middle', class: 'finger', fill: '#fff' }, fingerLabel(ch.fingers[i])));
    }
  }
  if (opts.labels !== false)
    for (let i = 0; i < n; i++)
      svg.appendChild(s('text', { x: xOf(i), y: boardBottom + 20, 'text-anchor': 'middle', class: 'string-label', fill: INK_2 }, STRINGS[i] ? STRINGS[i].name : ''));
  return svg;
}
