import { s } from './dom.ts';
import { STRINGS } from '../music/notes.ts';
import { t } from '../i18n.ts';

export interface Mark {
  string: number;
  fret: number;
  /** now = jetzt spielen, next = gleich, chord = Akkordton, scale = passt, played = gerade gehört */
  kind: 'now' | 'next' | 'chord' | 'scale' | 'played';
  label?: string;
  /** Ton zum Hochziehen (Blue Note): kleiner Pfeil nach oben */
  bend?: boolean;
}

/**
 * Hals waagrecht wie eine Tabulatur: oben die höchste Saite (Ukulele A), unten die erste in Spielreihenfolge
 * (Ukulele G), links der Sattel, Bünde from … from+frets-1. Leere Saiten (Bund 0) stehen links vor dem Sattel – weiter
 * oben am Hals vor einem Bruch statt des Sattels. Die kurze Banjo-Saite ist bis zu ihrem Wirbel am 5. Bund nur angedeutet.
 */
/** Antippen einer Stelle: Saite, Bund und ob der Ziehpfeil getroffen wurde. */
export type Tap = (string: number, fret: number, bend: boolean) => void;

/** Sofort beim Berühren auslösen (ohne Verzögerung des Klicks); Maus als Rückfall. */
function onPress(el: Element, f: () => void): void {
  el.addEventListener('touchstart', (e) => {
    e.preventDefault();
    f();
  });
  el.addEventListener('mousedown', f);
}

export function fretboard(marks: Mark[], frets = 5, from = 1, tap?: Tap): SVGElement {
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
  const xOf = (fret: number) => (fret === 0 ? x0 - 24 : x0 + fw * (fret - from + 0.5));
  const svg = s('svg', { viewBox: `0 0 ${width} ${height}`, class: 'fretboard', role: 'img', 'aria-label': t('Griffbrett') });
  svg.appendChild(s('rect', { x: x0, y: top - 12, width: fw * frets + 6, height: span + 24, rx: 4, class: 'fb-wood' }));
  [3, 5, 7, 9, 12, 15, 17, 19, 21].forEach((f) => {
    if (f < from || f >= from + frets) return;
    const ys = f === 12 ? [top + span / 2 - gap, top + span / 2 + gap] : [top + span / 2];
    ys.forEach((cy) => svg.appendChild(s('circle', { cx: xOf(f), cy, r: 5, class: 'fb-dot' })));
  });
  if (from === 1) svg.appendChild(s('rect', { x: x0 - 4, y: top - 12, width: 6, height: span + 24, class: 'fb-nut' }));
  else
    svg.appendChild(
      s('path', { d: `M${x0 - 3} ${top - 14} l6 ${(span + 28) / 4} l-6 ${(span + 28) / 4} l6 ${(span + 28) / 4} l-6 ${(span + 28) / 4}`, class: 'fb-break' }),
    );
  for (let f = 1; f <= frets; f++) svg.appendChild(s('rect', { x: x0 + fw * f - 1, y: top - 12, width: 2.5, height: span + 24, class: 'fb-fret' }));
  for (let i = 0; i < n; i++) {
    const y = yOf(i);
    const start = STRINGS[i].start || 0;
    const end = x0 + fw * frets + 6;
    if (start) {
      const peg = Math.max(x0 - 40, Math.min(end, x0 + fw * (start - from + 1)));
      svg.appendChild(s('line', { x1: x0 - 40, y1: y, x2: peg, y2: y, class: 'fb-string short' }));
      if (peg < end) svg.appendChild(s('line', { x1: peg, y1: y, x2: end, y2: y, class: 'fb-string' }));
    } else svg.appendChild(s('line', { x1: x0 - 40, y1: y, x2: end, y2: y, class: 'fb-string' }));
    svg.appendChild(s('text', { x: 4, y: y + 5, class: 'fb-label' }, STRINGS[i].name));
  }
  for (let f = from; f < from + frets; f++) svg.appendChild(s('text', { x: xOf(f), y: height - 3, class: 'fb-num', 'text-anchor': 'middle' }, String(f)));
  if (tap) {
    // jede Stelle im Ausschnitt ist antippbar, auch leere Saiten
    for (let i = 0; i < n; i++)
      for (let f = 0; f < from + frets; f++) {
        if ((f > 0 && f < from) || (f > 0 && STRINGS[i].start)) continue;
        const cell = s('rect', {
          x: f === 0 ? x0 - 48 : x0 + fw * (f - from),
          y: yOf(i) - gap / 2,
          width: f === 0 ? 44 : fw,
          height: gap,
          class: 'fb-hit',
          'data-string': String(i),
          'data-fret': String(f),
        });
        onPress(cell, () => tap(i, f, false));
        svg.appendChild(cell);
      }
  }
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
      if (m.bend) {
        svg.appendChild(s('path', { d: `M${cx + r + 1} ${cy + 4} l5 -12 l5 12 m-5 -12 v16`, class: 'fb-bend' }));
        if (tap) {
          const hit = s('rect', { x: cx + r - 2, y: cy - gap / 2 - 4, width: 18, height: gap + 4, class: 'fb-hit fb-hit-bend' });
          onPress(hit, () => tap(m.string, m.fret, true));
          svg.appendChild(hit);
        }
      }
    });
  return svg;
}
