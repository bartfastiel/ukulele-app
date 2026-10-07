import { s } from './dom.ts';
import { describeChord, type Chord } from '../music/chords.ts';
import { STRINGS } from '../music/notes.ts';
import { instrument } from '../music/instrument.ts';

let uid = 0;

/**
 * Griffbild wie im Schulheft: Griffbrett senkrecht, Sattel oben, Saiten in Spielreihenfolge von links nach rechts
 * (Ukulele G-C-E-A, Gitarre E-A-D-G-B-e, Banjo g-D-G-B-D; für Linkshänder gespiegelt). Palisander-Griffbrett,
 * Neusilber-Bünde, Perlmutt-Punkte, Finger als Messingknöpfe, ein Barré als Messingbalken. Liegt ein Griff höher als
 * im 5. Bund, beginnt das Bild an seinem tiefsten Bund mit der Bundzahl daneben.
 */
export function chordDiagram(ch: Chord, opts: { lefty?: boolean; highlight?: number; labels?: boolean } = {}): SVGElement {
  const id = `cd${++uid}`;
  const inst = instrument();
  const n = ch.frets.length;
  const pressed = ch.frets.filter((f) => f > 0);
  const top = pressed.length ? Math.max(...pressed) : 0;
  const first = top > 5 ? Math.min(...pressed) : 1;
  const rows = Math.max(inst.diagram.minRows, top - first + 1);
  const shown = (fret: number) => fret - first + 1;
  const x0 = first > 1 ? 26 : 18;
  const gap = 22;
  const y0 = 26;
  const fh = 24;
  const boardW = gap * (n - 1);
  const width = x0 + boardW + 18;
  const height = y0 + fh * rows + (opts.labels === false ? 8 : 26);
  const order: number[] = [];
  for (let i = 0; i < n; i++) order.push(opts.lefty ? n - 1 - i : i);
  const xOf = (stringIdx: number) => x0 + order.indexOf(stringIdx) * gap;

  const svg = s('svg', {
    viewBox: `0 0 ${width} ${height}`,
    class: `chord-svg strings-${n}`,
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
        'linearGradient',
        { id: `${id}r`, x1: 0, x2: 0, y1: 0, y2: 1 },
        s('stop', { offset: 0, 'stop-color': '#ffe9a8' }),
        s('stop', { offset: 0.5, 'stop-color': '#d8a640' }),
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
  const boardBottom = y0 + fh * rows;
  svg.appendChild(s('rect', { x: x0 - 10, y: boardTop, width: boardW + 20, height: boardBottom - boardTop + 4, rx: 3, fill: `url(#${id}b)` }));
  // Perlmutt-Punkte an den üblichen Bünden (Ukulele: 5. Bund), soweit sichtbar
  for (const f of inst.diagram.inlays) {
    if (f < first || f > first + rows - 1) continue;
    const cy = y0 + fh * (shown(f) - 0.5);
    const cx = x0 + boardW / 2;
    if (f === 12) {
      svg.appendChild(s('circle', { cx: cx - gap, cy, r: 3.4, fill: `url(#${id}p)`, opacity: 0.8 }));
      svg.appendChild(s('circle', { cx: cx + gap, cy, r: 3.4, fill: `url(#${id}p)`, opacity: 0.8 }));
    } else svg.appendChild(s('circle', { cx, cy, r: 3.4, fill: `url(#${id}p)`, opacity: 0.8 }));
  }
  for (let f = 1; f <= rows; f++)
    svg.appendChild(
      s('rect', { x: x0 - 10, y: y0 + fh * f - 1, width: boardW + 20, height: 2.4, fill: '#c9ccd1', stroke: '#7d8088', 'stroke-width': 0.4 }),
    );
  if (first > 1) {
    // höher am Hals: kein Sattel, dafür die Bundzahl links neben dem ersten Bund
    svg.appendChild(s('rect', { x: x0 - 10, y: y0 - 1, width: boardW + 20, height: 2.4, fill: '#c9ccd1', stroke: '#7d8088', 'stroke-width': 0.4 }));
    svg.appendChild(s('text', { x: 2, y: y0 + fh * 0.5 + 5, class: 'fret-number', fill: '#2b1608' }, String(first)));
  } else
    // Sattel (Knochen)
    svg.appendChild(s('rect', { x: x0 - 11, y: y0 - 5, width: boardW + 22, height: 6, rx: 1.5, fill: '#f3e6c4', stroke: '#b9a77c', 'stroke-width': 0.6 }));
  for (let i = 0; i < n; i++) {
    const x = xOf(i);
    const hl = opts.highlight === i;
    const start = STRINGS[i] ? STRINGS[i].start || 0 : 0;
    const attrs = {
      x1: x,
      y1: y0 - 2,
      x2: x,
      y2: boardBottom + 3,
      stroke: hl ? '#ff7a45' : '#f7f1e6',
      'stroke-width': hl ? 3.2 : 1.4 + (n === 4 && i === 1 ? 0.5 : 0) + (n === 6 ? (2 - Math.min(i, 2)) * 0.35 : 0),
      'stroke-linecap': 'round',
    };
    if (start >= first) {
      // kurze Banjo-Saite: erst ab ihrem Wirbel am 5. Bund eine echte Saite, darüber nur angedeutet
      const pegY = start - first + 1 <= rows ? y0 + fh * shown(start) : boardBottom + 3;
      svg.appendChild(s('line', { x1: x, y1: y0 - 2, x2: x, y2: pegY, stroke: '#f7f1e6', 'stroke-width': 1, 'stroke-dasharray': '2 4', opacity: 0.6 }));
      attrs.y1 = pegY;
      if (pegY <= boardBottom) svg.appendChild(s('circle', { cx: x, cy: pegY, r: 3.2, fill: '#f3e6c4', stroke: '#b9a77c', 'stroke-width': 0.6 }));
    }
    svg.appendChild(s('line', attrs));
  }
  const barre = ch.barre;
  if (barre && barre.fret >= first) {
    const cy = y0 + fh * (shown(barre.fret) - 0.5);
    const xa = Math.min(xOf(barre.from), xOf(barre.to));
    const xb = Math.max(xOf(barre.from), xOf(barre.to));
    svg.appendChild(s('rect', { x: xa - 8.6, y: cy - 7.6, width: xb - xa + 17.2, height: 17.2, rx: 8.6, fill: 'rgba(0,0,0,.35)' }));
    svg.appendChild(s('rect', { x: xa - 8.6, y: cy - 8.6, width: xb - xa + 17.2, height: 17.2, rx: 8.6, fill: `url(#${id}r)`, stroke: '#6b430c', 'stroke-width': 0.8, class: 'barre' }));
  }
  const onBarre = (i: number) => !!barre && ch.frets[i] === barre.fret && ch.fingers[i] === 1 && i >= barre.from && i <= barre.to;
  for (let i = 0; i < n; i++) {
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
      const cy = y0 + fh * (shown(fret) - 0.5);
      if (onBarre(i)) {
        // die Ziffer des Zeigefingers steht einmal auf dem Balken (an seinem ersten Ende)
        if (i === barre!.from) svg.appendChild(s('text', { x, y: cy + 4.2, 'text-anchor': 'middle', class: 'finger', fill: '#3a2105' }, '1'));
        continue;
      }
      svg.appendChild(s('circle', { cx: x, cy: cy + 1, r: 8.6, fill: 'rgba(0,0,0,.35)' }));
      svg.appendChild(s('circle', { cx: x, cy, r: 8.6, fill: `url(#${id}f)`, stroke: '#6b430c', 'stroke-width': 0.8 }));
      if (ch.fingers[i])
        svg.appendChild(
          s('text', { x, y: cy + 4.2, 'text-anchor': 'middle', class: 'finger', fill: '#3a2105' }, String(ch.fingers[i])),
        );
    }
  }
  if (opts.labels !== false)
    for (let i = 0; i < n; i++)
      svg.appendChild(
        s('text', { x: xOf(i), y: boardBottom + 20, 'text-anchor': 'middle', class: 'string-label', fill: '#2b1608' }, STRINGS[i] ? STRINGS[i].name : ''),
      );
  return svg;
}
