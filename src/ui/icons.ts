import { s } from './dom.ts';

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

/** Schallloch mit Rosette und Saiten – Schmuck der Startseite, kein Bedienelement. */
export function soundHole(): SVGElement {
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
    ),
  );
  g.appendChild(s('circle', { cx: 100, cy: 100, r: 92, fill: '#f1e2bf', opacity: 0.95 }));
  const segs = 48;
  for (let i = 0; i < segs; i++) {
    const a0 = (i / segs) * Math.PI * 2;
    const a1 = ((i + 1) / segs) * Math.PI * 2;
    const r0 = 74;
    const r1 = 88;
    const p = (r: number, a: number) => `${100 + r * Math.cos(a)},${100 + r * Math.sin(a)}`;
    g.appendChild(
      s('path', {
        d: `M${p(r0, a0)} L${p(r1, a0)} A${r1},${r1} 0 0 1 ${p(r1, a1)} L${p(r0, a1)} A${r0},${r0} 0 0 0 ${p(r0, a0)}z`,
        fill: i % 3 === 0 ? '#2c6e63' : i % 3 === 1 ? '#c9a24a' : '#6a2410',
      }),
    );
  }
  g.appendChild(s('circle', { cx: 100, cy: 100, r: 74, fill: '#f1e2bf' }));
  g.appendChild(s('circle', { cx: 100, cy: 100, r: 70, fill: 'url(#hole)' }));
  [64, 88, 112, 136].forEach((x, i) =>
    g.appendChild(s('rect', { x: x - 1.2 - i * 0.2, y: 0, width: 2.4 + i * 0.4, height: 200, fill: 'url(#str)', opacity: 0.95 })),
  );
  return g;
}
