import { s } from './dom.ts';
import { STRINGS } from '../music/notes.ts';
import { instrument } from '../music/instrument.ts';

/** Eigene, schlichte Symbole statt Emojis: sehen auf jedem Betriebssystem gleich aus. */
const PATHS: Record<string, string> = {
  songs: 'M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
  chords: 'M5 3h14M5 3v18M10 3v18M14 3v18M19 3v18M5 9h14M5 15h14',
  game: 'M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6z',
  tuner: 'M4 18a8 8 0 1 1 16 0M12 18l4-7',
  rhythm: 'M8 21h8l-2-17h-4zM12 14l5-9',
  home: 'M3 11l9-8 9 8M5 9v12h5v-6h4v6h5V9',
  back: 'M15 5l-7 7 7 7',
  play: 'M7 4v16l13-8z',
  pause: 'M7 4h4v16H7zM14 4h4v16h-4z',
  stop: 'M6 6h12v12H6z',
  mic: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3',
  sound: 'M4 9v6h4l5 4V5L8 9zM16 8a5 5 0 0 1 0 8M18.5 5.5a9 9 0 0 1 0 13',
  star: 'M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6z',
  check: 'M4 12l5 5L20 6',
  next: 'M5 4v16l10-8zM17 4h3v16h-3z',
  text: 'M4 6h16M4 11h16M4 16h11',
  blues: 'M3 15c3 0 3-6 6-6s3 6 6 6 3-6 6-6M3 19h18',
  detective: 'M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM14.5 14.5L21 21',
  gear: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1',
  plus: 'M12 5v14M5 12h14',
  edit: 'M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4',
  trash: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
  share: 'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.6 13.5l6.8 4M15.4 6.5l-6.8 4',
  copy: 'M9 9h11v11H9zM5 15H4V4h11v1',
};

export function icon(name: keyof typeof PATHS | string, cls = 'icon'): SVGElement {
  const filled = name === 'play' || name === 'pause' || name === 'stop' || name === 'star' || name === 'next';
  return s(
    'svg',
    { viewBox: '0 0 24 24', class: cls, 'aria-hidden': 'true', focusable: 'false' },
    s('path', {
      d: PATHS[name] || '',
      fill: filled ? 'currentColor' : 'none',
      stroke: 'currentColor',
      'stroke-width': filled ? 1 : 2.2,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    }),
  );
}

/** Erkennungszeichen oben auf der Startseite: Schallloch (Ukulele, Gitarre, Bariton-Ukulele) bzw. Trommelfell (Banjo). */
export function soundHole(): SVGElement {
  const id = instrument().id;
  if (id === 'banjo') return banjoHead();
  if (id === 'gitarre') return guitarRosette();
  // Bariton-Ukulele: dieselbe Rosette wie die Ukulele, aber mit Abalone-Tönen, die tiefen D- und G-Saiten umsponnen
  if (id === 'bariton') return ukuleleHole(['#1f4f5a', '#8fc0b2', '#3b1d0c', '#c9a24a'], 2);
  return ukuleleHole(['#2c6e63', '#c9a24a', '#6a2410'], 0);
}

function strings(g: SVGElement, x0: number, x1: number, y0: number, y1: number): void {
  const n = STRINGS.length;
  for (let i = 0; i < n; i++) {
    const x = x0 + (i * (x1 - x0)) / (n - 1);
    const k = (i * 3) / (n - 1);
    g.appendChild(s('rect', { x: x - 1.2 - k * 0.2, y: y0, width: 2.4 + k * 0.4, height: y1 - y0, fill: 'url(#str)', opacity: 0.95 }));
  }
}

function stringGradient(): SVGElement {
  return s(
    'linearGradient',
    { id: 'str', x1: 0, x2: 1 },
    s('stop', { offset: 0, 'stop-color': '#d9d0bf' }),
    s('stop', { offset: 0.5, 'stop-color': '#fffaf0' }),
    s('stop', { offset: 1, 'stop-color': '#cfc5b2' }),
  );
}

/** Klassische Gitarren-Rosette: Mosaikring zwischen schwarz-elfenbeinfarbenen Zierlinien. */
function guitarRosette(): SVGElement {
  const g = s('svg', { viewBox: '0 0 200 200', class: 'soundhole', 'aria-hidden': 'true' });
  g.appendChild(
    s(
      'defs',
      null,
      s('radialGradient', { id: 'hole' }, s('stop', { offset: 0, 'stop-color': '#0b0604' }), s('stop', { offset: 1, 'stop-color': '#24150a' })),
      stringGradient(),
    ),
  );
  g.appendChild(s('circle', { cx: 100, cy: 100, r: 94, fill: '#d6b06a' }));
  const ring = (r: number, w: number, color: string) => g.appendChild(s('circle', { cx: 100, cy: 100, r, fill: 'none', stroke: color, 'stroke-width': w }));
  ring(90, 2.5, '#15100e');
  ring(87, 2, '#f6eedb');
  ring(84.5, 2, '#15100e');
  const segs = 72;
  for (let i = 0; i < segs; i++) {
    const a0 = (i / segs) * Math.PI * 2;
    const a1 = ((i + 1) / segs) * Math.PI * 2;
    const p = (r: number, a: number) => `${100 + r * Math.cos(a)},${100 + r * Math.sin(a)}`;
    for (let band = 0; band < 2; band++) {
      const r0 = 72 + band * 6;
      const r1 = r0 + 6;
      g.appendChild(
        s('path', {
          d: `M${p(r0, a0)} L${p(r1, a0)} A${r1},${r1} 0 0 1 ${p(r1, a1)} L${p(r0, a1)} A${r0},${r0} 0 0 0 ${p(r0, a0)}z`,
          fill: (i + band) % 2 === 0 ? '#5a2f1a' : i % 4 < 2 ? '#2f5e3a' : '#f1e2bf',
        }),
      );
    }
  }
  ring(71, 2, '#15100e');
  ring(68.5, 2, '#f6eedb');
  ring(66, 2, '#15100e');
  g.appendChild(s('circle', { cx: 100, cy: 100, r: 64, fill: 'url(#hole)' }));
  strings(g, 58, 142, 0, 200);
  return g;
}

/** Banjo: mattes Trommelfell mit verchromtem Spannreif, Haken und Steg. */
function banjoHead(): SVGElement {
  const g = s('svg', { viewBox: '0 0 200 200', class: 'soundhole', 'aria-hidden': 'true' });
  g.appendChild(
    s(
      'defs',
      null,
      s(
        'linearGradient',
        { id: 'chrome', x1: 0, y1: 0, x2: 1, y2: 1 },
        s('stop', { offset: 0, 'stop-color': '#fbfdff' }),
        s('stop', { offset: 0.45, 'stop-color': '#9aa4ac' }),
        s('stop', { offset: 0.55, 'stop-color': '#e9eef2' }),
        s('stop', { offset: 1, 'stop-color': '#5d666e' }),
      ),
      s('radialGradient', { id: 'head', cx: 0.4, cy: 0.35 }, s('stop', { offset: 0, 'stop-color': '#ffffff' }), s('stop', { offset: 1, 'stop-color': '#e3dccd' })),
      stringGradient(),
    ),
  );
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    g.appendChild(
      s('rect', { x: 96, y: 2, width: 8, height: 20, rx: 3, fill: 'url(#chrome)', transform: `rotate(${(a * 180) / Math.PI} 100 100)` }),
    );
  }
  g.appendChild(s('circle', { cx: 100, cy: 100, r: 86, fill: 'url(#chrome)' }));
  g.appendChild(s('circle', { cx: 100, cy: 100, r: 78, fill: 'url(#head)' }));
  g.appendChild(s('rect', { x: 64, y: 122, width: 72, height: 7, rx: 2, fill: '#c9a46a', stroke: '#6b4a22', 'stroke-width': 1.5 }));
  strings(g, 74, 126, 0, 126);
  return g;
}

function ukuleleHole(colors: string[], wound: number): SVGElement {
  const g = s('svg', { viewBox: '0 0 200 200', class: 'soundhole', 'aria-hidden': 'true' });
  g.appendChild(
    s(
      'defs',
      null,
      s(
        'radialGradient',
        { id: 'hole' },
        s('stop', { offset: 0, 'stop-color': '#0d0503' }),
        s('stop', { offset: 0.8, 'stop-color': '#1d0a04' }),
        s('stop', { offset: 1, 'stop-color': '#2f1207' }),
      ),
      s(
        'linearGradient',
        { id: 'str', x1: 0, x2: 1 },
        s('stop', { offset: 0, 'stop-color': '#d9d0bf' }),
        s('stop', { offset: 0.5, 'stop-color': '#fffaf0' }),
        s('stop', { offset: 1, 'stop-color': '#cfc5b2' }),
      ),
      s(
        'linearGradient',
        { id: 'wound', x1: 0, x2: 1 },
        s('stop', { offset: 0, 'stop-color': '#8d9399' }),
        s('stop', { offset: 0.5, 'stop-color': '#eef1f3' }),
        s('stop', { offset: 1, 'stop-color': '#7d838a' }),
      ),
    ),
  );
  g.appendChild(s('circle', { cx: 100, cy: 100, r: 92, fill: '#f1e2bf', opacity: 0.95 }));
  const segs = colors.length * 16;
  for (let i = 0; i < segs; i++) {
    const a0 = (i / segs) * Math.PI * 2;
    const a1 = ((i + 1) / segs) * Math.PI * 2;
    const r0 = 74;
    const r1 = 88;
    const p = (r: number, a: number) => `${100 + r * Math.cos(a)},${100 + r * Math.sin(a)}`;
    g.appendChild(
      s('path', {
        d: `M${p(r0, a0)} L${p(r1, a0)} A${r1},${r1} 0 0 1 ${p(r1, a1)} L${p(r0, a1)} A${r0},${r0} 0 0 0 ${p(r0, a0)}z`,
        fill: colors[i % colors.length],
      }),
    );
  }
  g.appendChild(s('circle', { cx: 100, cy: 100, r: 74, fill: '#f1e2bf' }));
  g.appendChild(s('circle', { cx: 100, cy: 100, r: 70, fill: 'url(#hole)' }));
  // so viele Saiten wie das Instrument (Ukulele: 4 im Abstand 24)
  const n = STRINGS.length;
  for (let i = 0; i < n; i++) {
    const x = 64 + (i * 72) / (n - 1);
    const k = (i * 3) / (n - 1);
    const w = i < wound ? 3.4 - i * 0.4 : 2.4 + k * 0.4;
    g.appendChild(s('rect', { x: x - w / 2, y: 0, width: w, height: 200, fill: i < wound ? 'url(#wound)' : 'url(#str)', opacity: 0.95 }));
  }
  return g;
}
