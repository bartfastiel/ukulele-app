import { s } from './dom.ts';
import { noteText, t } from '../i18n.ts';
import { pitchClass } from '../music/notes.ts';

export interface NeckString {
  name: string;
  midi: number;
  /** Bund, an dem die Saite beginnt (kurze Banjo-Saite: 5) */
  start?: number;
}

export interface NeckOptions {
  frets: number;
  /** Bünde mit Markierung (12 doppelt) */
  inlays: number[];
  lefty?: boolean;
  /** hochkant wie ein Griffbild (Sattel oben) statt quer wie eine Tabulatur */
  upright?: boolean;
}

/** Tonnamen je Halbton: ohne Vorzeichen ein Name, sonst beide Schreibweisen (C#/Db). */
const NAMES: string[][] = [['C'], ['C#', 'Db'], ['D'], ['D#', 'Eb'], ['E'], ['F'], ['F#', 'Gb'], ['G'], ['G#', 'Ab'], ['A'], ['A#', 'Bb'], ['B']];

/** Lage eines Bundstäbchens: wie auf dem echten Hals werden die Bünde zum Korpus hin enger. */
function fretPos(f: number, frets: number, length: number): number {
  return (length * (1 - Math.pow(2, -f / 12))) / (1 - Math.pow(2, -frets / 12));
}

/**
 * Der ganze Hals zum Ausdrucken: auf jeder Saite und in jedem Bund der Tonname, Bundmarkierungen und Bundzahlen.
 * Quer liegt die höchste Saite oben (wie in der Tabulatur), hochkant stehen die Saiten wie im Griffbild. Nur dünne
 * schwarze Linien; Töne ohne Vorzeichen im Kreis, die anderen klein mit beiden Namen.
 */
export function neckChart(strings: NeckString[], opts: NeckOptions): SVGElement {
  const n = strings.length;
  const frets = opts.frets;
  const upright = !!opts.upright;
  const gap = upright ? (n <= 4 ? 110 : n === 5 ? 96 : 84) : n <= 4 ? 110 : n === 5 ? 96 : 84;
  // Längsachse: Saitenname, leere Saite, Hals; Querachse: Saiten, darunter Markierungen und Bundzahlen
  const head = 44;
  const open = 74;
  const length = upright ? 1000 : 1100;
  const neckLen = length - head - open - 8;
  const across0 = 36;
  const span = gap * (n - 1);
  const top = across0 - gap / 2 + 6;
  const bottom = across0 + span + gap / 2 - 6;
  const total = bottom + 62;
  const along = (f: number) => head + open + fretPos(f, frets, neckLen);
  const cellMid = (f: number) => (f === 0 ? head + open / 2 - 4 : (along(f - 1) + along(f)) / 2);
  // Quer: höchste Saite oben; hochkant: Spielreihenfolge von links (Linkshänder gespiegelt)
  const acrossOf = (i: number) => across0 + (upright ? (opts.lefty ? n - 1 - i : i) : n - 1 - i) * gap;
  const W = upright ? total : length;
  const H = upright ? length : total;
  const P = (a: number, c: number) => {
    // Linkshänder quer: Sattel rechts
    const x = upright ? c : opts.lefty ? length - a : a;
    const y = upright ? a : c;
    return { x, y };
  };
  const svg = s('svg', { viewBox: `0 0 ${W} ${H}`, class: `neck-chart ${upright ? 'upright' : 'across'}`, role: 'img', 'aria-label': t('Alle Töne auf dem Hals') });
  const ln = (a1: number, c1: number, a2: number, c2: number, w: number, extra: Record<string, string | number> = {}) => {
    const p = P(a1, c1);
    const q = P(a2, c2);
    svg.appendChild(s('line', { x1: p.x, y1: p.y, x2: q.x, y2: q.y, stroke: '#000', 'stroke-width': w, ...extra }));
  };
  const text = (a: number, c: number, content: string, cls: string, dy = 0) => {
    const p = P(a, c);
    svg.appendChild(s('text', { x: p.x, y: p.y + dy, 'text-anchor': 'middle', class: cls }, content));
  };
  // Sattel und Bundstäbchen
  ln(along(0), top, along(0), bottom, 6);
  for (let f = 1; f <= frets; f++) ln(along(f), top, along(f), bottom, 1.4);
  // Saiten: leer ab dem Saitennamen; die kurze Banjo-Saite bis zu ihrem Wirbel nur gestrichelt
  strings.forEach((st, i) => {
    const c = acrossOf(i);
    const begin = head + 10;
    const end = along(frets);
    if (st.start) {
      const peg = along(st.start);
      ln(begin, c, peg, c, 1, { 'stroke-dasharray': '3 7' });
      ln(peg, c, end, c, 1.6);
      const p = P(peg, c);
      svg.appendChild(s('circle', { cx: p.x, cy: p.y, r: 7, fill: '#fff', stroke: '#000', 'stroke-width': 1.6 }));
    } else ln(begin, c, end, c, 1.6);
    text(head / 2, c, st.name, 'neck-string', 9);
  });
  // Bundmarkierungen und Bundzahlen
  const dotC = bottom + 14;
  for (let f = 0; f <= frets; f++) {
    const a = cellMid(f);
    if (opts.inlays.indexOf(f) >= 0) {
      const offs = f === 12 ? [-9, 9] : [0];
      for (const o of offs) {
        const p = P(a + o, dotC);
        svg.appendChild(s('circle', { cx: p.x, cy: p.y, r: 6.5, fill: '#000', class: 'neck-inlay' }));
      }
    }
    text(a, bottom + 42, String(f), opts.inlays.indexOf(f) >= 0 ? 'neck-num strong' : 'neck-num', 8);
  }
  // Tonnamen
  strings.forEach((st, i) => {
    const c = acrossOf(i);
    for (let f = 0; f <= frets; f++) {
      if (st.start && f > 0 && f <= st.start) continue;
      const midi = f === 0 ? st.midi : st.midi + f - (st.start || 0);
      const names = NAMES[pitchClass(midi)];
      const a = cellMid(f);
      const width = f === 0 ? open : along(f) - along(f - 1);
      if (names.length === 1) {
        const r = Math.min(26, width / 2 - 3, gap / 2 - 6);
        const p = P(a, c);
        svg.appendChild(s('circle', { cx: p.x, cy: p.y, r, fill: '#fff', stroke: '#000', 'stroke-width': 1.6 }));
        svg.appendChild(s('text', { x: p.x, y: p.y + r * 0.38, 'text-anchor': 'middle', class: 'neck-note', 'font-size': (r * 1.05).toFixed(1) }, noteText(names[0])));
      } else {
        const size = Math.min(19, width / 3.2);
        // weißer Grund, damit die Saite nicht durch die Schrift läuft
        const p = P(a, c);
        const bw = Math.min(width - 6, 50);
        svg.appendChild(s('rect', { x: p.x - bw / 2, y: p.y - size * 1.15, width: bw, height: size * 2.3, fill: '#fff' }));
        svg.appendChild(s('text', { x: p.x, y: p.y - size * 0.15, 'text-anchor': 'middle', class: 'neck-sharp', 'font-size': size.toFixed(1) }, noteText(names[0])));
        svg.appendChild(s('text', { x: p.x, y: p.y + size * 0.95, 'text-anchor': 'middle', class: 'neck-sharp', 'font-size': size.toFixed(1) }, noteText(names[1])));
      }
    }
  });
  return svg;
}
