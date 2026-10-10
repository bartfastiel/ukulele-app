import { s } from './dom.ts';
import { STRINGS } from '../music/notes.ts';
import { t } from '../i18n.ts';
import { attachPlay, type NeckGeometry, type Play } from './fret-gesture.ts';

export interface Mark {
  string: number;
  fret: number;
  /** now = jetzt spielen, next = gleich, chord = Akkordton, scale = passt, played = gerade gehört */
  kind: 'now' | 'next' | 'chord' | 'scale' | 'played';
  label?: string;
  /** Ton zum Hochziehen (Blue Note): kleiner Pfeil nach oben */
  bend?: boolean;
  /** weniger naheliegender Ton: blasser */
  weak?: boolean;
}

/**
 * Hals waagrecht wie eine Tabulatur: oben die höchste Saite (Ukulele A), unten die erste in Spielreihenfolge
 * (Ukulele G), links der Sattel, Bünde from … from+frets-1. Leere Saiten (Bund 0) stehen links vor dem Sattel – weiter
 * oben am Hals vor einem Bruch statt des Sattels. Die kurze Banjo-Saite ist bis zu ihrem Wirbel am 5. Bund nur angedeutet.
 * Für Linkshänder ist das Bild waagrecht gespiegelt (Sattel rechts); Schrift bleibt lesbar.
 */
export function fretboard(marks: Mark[], frets = 5, from = 1, play?: Play, lefty = false): SVGElement {
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
  const svg = s('svg', { viewBox: `0 0 ${width} ${height}`, class: lefty ? 'fretboard lefty' : 'fretboard', role: 'img', 'aria-label': t('Griffbrett') });
  // gezeichnet wird immer rechtshändig; für Linkshänder spiegelt eine Gruppe alles, Schrift wird zurückgespiegelt
  const geo: NeckGeometry = { svg: svg as SVGSVGElement, width, fret: fw, gap, lefty };
  const g = lefty ? svg.appendChild(s('g', { transform: `matrix(-1 0 0 1 ${width} 0)` })) : svg;
  const text = (attrs: Record<string, string | number>, content: string) => {
    if (lefty) {
      attrs.transform = `matrix(-1 0 0 1 ${2 * Number(attrs.x)} 0)`;
      if (!attrs['text-anchor']) attrs['text-anchor'] = 'end';
    }
    return s('text', attrs, content);
  };
  g.appendChild(s('rect', { x: x0, y: top - 12, width: fw * frets + 6, height: span + 24, rx: 4, class: 'fb-wood' }));
  [3, 5, 7, 9, 12, 15, 17, 19, 21].forEach((f) => {
    if (f < from || f >= from + frets) return;
    const ys = f === 12 ? [top + span / 2 - gap, top + span / 2 + gap] : [top + span / 2];
    ys.forEach((cy) => g.appendChild(s('circle', { cx: xOf(f), cy, r: 5, class: 'fb-dot' })));
  });
  if (from === 1) g.appendChild(s('rect', { x: x0 - 4, y: top - 12, width: 6, height: span + 24, class: 'fb-nut' }));
  else
    g.appendChild(
      s('path', { d: `M${x0 - 3} ${top - 14} l6 ${(span + 28) / 4} l-6 ${(span + 28) / 4} l6 ${(span + 28) / 4} l-6 ${(span + 28) / 4}`, class: 'fb-break' }),
    );
  for (let f = 1; f <= frets; f++) g.appendChild(s('rect', { x: x0 + fw * f - 1, y: top - 12, width: 2.5, height: span + 24, class: 'fb-fret' }));
  for (let i = 0; i < n; i++) {
    const y = yOf(i);
    const start = STRINGS[i].start || 0;
    const end = x0 + fw * frets + 6;
    if (start) {
      const peg = Math.max(x0 - 40, Math.min(end, x0 + fw * (start - from + 1)));
      g.appendChild(s('line', { x1: x0 - 40, y1: y, x2: peg, y2: y, class: 'fb-string short' }));
      if (peg < end) g.appendChild(s('line', { x1: peg, y1: y, x2: end, y2: y, class: 'fb-string' }));
    } else g.appendChild(s('line', { x1: x0 - 40, y1: y, x2: end, y2: y, class: 'fb-string' }));
    g.appendChild(text({ x: 4, y: y + 5, class: 'fb-label', 'data-string': i }, STRINGS[i].name));
  }
  for (let f = from; f < from + frets; f++) g.appendChild(text({ x: xOf(f), y: height - 3, class: 'fb-num', 'text-anchor': 'middle' }, String(f)));
  if (play) {
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
        attachPlay(cell, geo, () => ({ string: i, fret: f, arrow: false }), play);
        g.appendChild(cell);
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
      const weak = m.weak ? ' weak' : '';
      g.appendChild(s('circle', { cx, cy, r, class: `fb-mark ${m.kind}${weak}`, 'data-string': m.string, 'data-fret': m.fret }));
      if (m.label)
        g.appendChild(text({ x: cx, y: cy + 4.5, 'text-anchor': 'middle', class: `fb-mark-label ${m.kind}${weak}` }, m.label));
      if (m.bend) {
        g.appendChild(s('path', { d: `M${cx + r + 1} ${cy + 4} l5 -12 l5 12 m-5 -12 v16`, class: 'fb-bend' }));
        if (play) {
          const hit = s('rect', { x: cx + r - 2, y: cy - gap / 2 - 4, width: 18, height: gap + 4, class: 'fb-hit fb-hit-bend' });
          attachPlay(hit, geo, () => ({ string: m.string, fret: m.fret, arrow: true }), play);
          g.appendChild(hit);
        }
      }
    });
  return svg;
}

