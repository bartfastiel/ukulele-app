import { s } from './dom.ts';
import { describeChord, type Chord } from '../music/chords.ts';
import { STRINGS } from '../music/notes.ts';

let uid = 0;

/**
 * Griffbild wie im Schulheft: Griffbrett senkrecht, Sattel oben, Saiten G-C-E-A von links nach rechts
 * (für Linkshänder gespiegelt). Palisander-Griffbrett, Neusilber-Bünde, Perlmutt-Punkte, Finger als Messingknöpfe.
 */
export function chordDiagram(ch: Chord, opts: { lefty?: boolean; highlight?: number; labels?: boolean } = {}): SVGElement {
  const id = `cd${++uid}`;
  const frets = Math.max(4, ...ch.frets);
  const x0 = 18;
  const gap = 22;
  const y0 = 26;
  const fh = 24;
  const width = x0 * 2 + gap * 3;
  const height = y0 + fh * frets + (opts.labels === false ? 8 : 26);
  const order = opts.lefty ? [3, 2, 1, 0] : [0, 1, 2, 3];
  const xOf = (stringIdx: number) => x0 + order.indexOf(stringIdx) * gap;

  const svg = s('svg', {
    viewBox: `0 0 ${width} ${height}`,
    class: 'chord-svg',
    role: 'img',
    'aria-label': describeChord(ch),
  });
  svg.appendChild(
    s(
      'defs',
      null,
      s(
        'linearGradient',
        { id: `${id}b`, x1: 0, x2: 1 },
        s('stop', { offset: 0, 'stop-color': '#3a2116' }),
        s('stop', { offset: 0.5, 'stop-color': '#4b2b1c' }),
        s('stop', { offset: 1, 'stop-color': '#341d12' }),
      ),
      s(
        'radialGradient',
        { id: `${id}f`, cx: 0.35, cy: 0.3, r: 0.8 },
        s('stop', { offset: 0, 'stop-color': '#ffe9a8' }),
        s('stop', { offset: 0.45, 'stop-color': '#d8a640' }),
        s('stop', { offset: 1, 'stop-color': '#8a5a14' }),
      ),
      s(
        'radialGradient',
        { id: `${id}p`, cx: 0.4, cy: 0.35, r: 0.7 },
        s('stop', { offset: 0, 'stop-color': '#ffffff' }),
        s('stop', { offset: 0.6, 'stop-color': '#dfe9ef' }),
        s('stop', { offset: 1, 'stop-color': '#b9c7d6' }),
      ),
    ),
  );
  const boardTop = y0;
  const boardBottom = y0 + fh * frets;
  svg.appendChild(
    s('rect', { x: x0 - 10, y: boardTop, width: gap * 3 + 20, height: boardBottom - boardTop + 4, rx: 3, fill: `url(#${id}b)` }),
  );
  // Perlmutt-Punkt am 5. Bund (falls sichtbar), wie auf echten Ukulelen
  if (frets >= 5)
    svg.appendChild(s('circle', { cx: x0 + gap * 1.5, cy: y0 + fh * 4.5, r: 3.4, fill: `url(#${id}p)`, opacity: 0.8 }));
  for (let f = 1; f <= frets; f++)
    svg.appendChild(
      s('rect', { x: x0 - 10, y: y0 + fh * f - 1, width: gap * 3 + 20, height: 2.4, fill: '#c9ccd1', stroke: '#7d8088', 'stroke-width': 0.4 }),
    );
  // Sattel (Knochen)
  svg.appendChild(s('rect', { x: x0 - 11, y: y0 - 5, width: gap * 3 + 22, height: 6, rx: 1.5, fill: '#f3e6c4', stroke: '#b9a77c', 'stroke-width': 0.6 }));
  for (let i = 0; i < 4; i++) {
    const x = xOf(i);
    const hl = opts.highlight === i;
    svg.appendChild(
      s('line', {
        x1: x,
        y1: y0 - 2,
        x2: x,
        y2: boardBottom + 3,
        stroke: hl ? '#ff7a45' : '#f7f1e6',
        'stroke-width': hl ? 3.2 : 1.4 + (i === 1 ? 0.5 : 0),
        'stroke-linecap': 'round',
      }),
    );
  }
  for (let i = 0; i < 4; i++) {
    const fret = ch.frets[i];
    const x = xOf(i);
    if (fret === 0) {
      svg.appendChild(s('circle', { cx: x, cy: y0 - 14, r: 4.6, fill: 'none', stroke: '#2b1608', 'stroke-width': 1.8, class: 'open' }));
    } else if (fret === -1) {
      svg.appendChild(
        s('path', { d: `M${x - 4.5} ${y0 - 18.5}l9 9m0 -9l-9 9`, stroke: '#a3263a', 'stroke-width': 2.4, 'stroke-linecap': 'round', class: 'muted' }),
      );
    } else if (fret < 0) {
      continue;
    } else {
      const cy = y0 + fh * (fret - 0.5);
      svg.appendChild(s('circle', { cx: x, cy: cy + 1, r: 8.6, fill: 'rgba(0,0,0,.35)' }));
      svg.appendChild(s('circle', { cx: x, cy, r: 8.6, fill: `url(#${id}f)`, stroke: '#6b430c', 'stroke-width': 0.8 }));
      if (ch.fingers[i])
        svg.appendChild(
          s('text', { x, y: cy + 4.2, 'text-anchor': 'middle', class: 'finger', fill: '#3a2105' }, String(ch.fingers[i])),
        );
    }
  }
  if (opts.labels !== false)
    for (let i = 0; i < 4; i++)
      svg.appendChild(
        s('text', { x: xOf(i), y: boardBottom + 20, 'text-anchor': 'middle', class: 'string-label', fill: '#2b1608' }, STRINGS[i].name),
      );
  return svg;
}
