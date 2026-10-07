import { s } from './dom.ts';
import { STRINGS } from '../music/notes.ts';
import { t } from '../i18n.ts';

export interface Mark {
  string: number;
  fret: number;
  /** now = jetzt spielen, next = gleich, chord = Akkordton, scale = passt, played = gerade gehört */
  kind: 'now' | 'next' | 'chord' | 'scale' | 'played';
  label?: string;
}

/**
 * Hals waagrecht wie eine Tabulatur: oben die höchste Saite (Ukulele A), unten die erste in Spielreihenfolge
 * (Ukulele G), links der Sattel, Bünde 0–frets. Leere Saiten (Bund 0) stehen links vor dem Sattel. Die kurze
 * Banjo-Saite ist bis zu ihrem Wirbel am 5. Bund nur angedeutet.
 */
export function fretboard(marks: Mark[], frets = 5): SVGElement {
  const n = STRINGS.length;
  const x0 = 70;
  const fw = 64;
  const top = 18;
  const gap = n > 4 ? 22 : 26;
  const span = gap * (n - 1);
  const width = x0 + fw * frets + 14;
  const height = top * 2 + span + 16;
  const order: number[] = [];
  for (let i = n - 1; i >= 0; i--) order.push(i);
  const yOf = (string: number) => top + order.indexOf(string) * gap;
  const xOf = (fret: number) => (fret === 0 ? x0 - 24 : x0 + fw * (fret - 0.5));
  const svg = s('svg', { viewBox: `0 0 ${width} ${height}`, class: 'fretboard', role: 'img', 'aria-label': t('Griffbrett') });
  svg.appendChild(s('rect', { x: x0, y: top - 12, width: fw * frets + 6, height: span + 24, rx: 4, class: 'fb-wood' }));
  [3, 5].forEach((f) => {
    if (f <= frets) svg.appendChild(s('circle', { cx: x0 + fw * (f - 0.5), cy: top + span / 2, r: 5, class: 'fb-dot' }));
  });
  svg.appendChild(s('rect', { x: x0 - 4, y: top - 12, width: 6, height: span + 24, class: 'fb-nut' }));
  for (let f = 1; f <= frets; f++) svg.appendChild(s('rect', { x: x0 + fw * f - 1, y: top - 12, width: 2.5, height: span + 24, class: 'fb-fret' }));
  for (let i = 0; i < n; i++) {
    const y = yOf(i);
    const start = STRINGS[i].start || 0;
    const end = x0 + fw * frets + 6;
    if (start) {
      const peg = Math.min(end, x0 + fw * start);
      svg.appendChild(s('line', { x1: x0 - 40, y1: y, x2: peg, y2: y, class: 'fb-string short' }));
      if (peg < end) svg.appendChild(s('line', { x1: peg, y1: y, x2: end, y2: y, class: 'fb-string' }));
    } else svg.appendChild(s('line', { x1: x0 - 40, y1: y, x2: end, y2: y, class: 'fb-string' }));
    svg.appendChild(s('text', { x: 4, y: y + 5, class: 'fb-label' }, STRINGS[i].name));
  }
  for (let f = 1; f <= frets; f++) svg.appendChild(s('text', { x: x0 + fw * (f - 0.5), y: height - 3, class: 'fb-num', 'text-anchor': 'middle' }, String(f)));
  const rank = { scale: 0, chord: 1, next: 2, played: 3, now: 4 };
  marks
    .slice()
    .sort((a, b) => rank[a.kind] - rank[b.kind])
    .forEach((m) => {
      const cx = xOf(m.fret);
      const cy = yOf(m.string);
      const r = m.kind === 'now' ? 12 : m.kind === 'scale' ? 7 : 10;
      svg.appendChild(s('circle', { cx, cy, r, class: `fb-mark ${m.kind}` }));
      if (m.label)
        svg.appendChild(s('text', { x: cx, y: cy + 4.5, 'text-anchor': 'middle', class: `fb-mark-label ${m.kind}` }, m.label));
    });
  return svg;
}
