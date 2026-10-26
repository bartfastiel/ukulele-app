import { s } from './dom.ts';

/** Eigene, schlichte Symbole statt Emojis: sehen auf jedem Betriebssystem gleich aus. */
const PATHS: Record<string, string> = {
  songs: 'M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
  note: 'M10 18V4l7 2M10 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
  chords: 'M5 3h14M5 3v18M10 3v18M14 3v18M19 3v18M5 9h14M5 15h14',
  game: 'M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6z',
  tuner: 'M4 18a8 8 0 1 1 16 0M12 18l4-7',
  rhythm: 'M8 21h8l-2-17h-4zM12 14l5-9',
  band: 'M4 9c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 9v7c0 1.7 3.6 3 8 3s8-1.3 8-3V9M7 2l3.5 5M17 2l-3.5 5',
  home: 'M3 11l9-8 9 8M5 9v12h5v-6h4v6h5V9',
  back: 'M15 5l-7 7 7 7',
  chevron: 'M9 6l6 6-6 6',
  play: 'M7 4v16l13-8z',
  pause: 'M7 4h4v16H7zM14 4h4v16h-4z',
  stop: 'M6 6h12v12H6z',
  mic: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3',
  sound: 'M4 9v6h4l5 4V5L8 9zM16 8a5 5 0 0 1 0 8M18.5 5.5a9 9 0 0 1 0 13',
  star: 'M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6z',
  check: 'M4 12l5 5L20 6',
  steps: 'M3 20h5v-5h5v-5h5V5h3M3 20h18',
  next: 'M5 4v16l10-8zM17 4h3v16h-3z',
  text: 'M4 6h16M4 11h16M4 16h11',
  book: 'M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5zM4 19.5A1.5 1.5 0 0 0 5.5 21H20v-3',
  blues: 'M3 15c3 0 3-6 6-6s3 6 6 6 3-6 6-6M3 19h18',
  detective: 'M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM14.5 14.5L21 21',
  gear: 'M4 7h9M17 7h3M4 17h3M11 17h9M15 4.5v5M9 14.5v5',
  plus: 'M12 5v14M5 12h14',
  edit: 'M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4',
  trash: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
  share: 'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.6 13.5l6.8 4M15.4 6.5l-6.8 4',
  copy: 'M9 9h11v11H9zM5 15H4V4h11v1',
  print: 'M6 9V3h12v6M6 18H3v-9h18v9h-3M7 14h10v7H7z',
  sun: 'M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6L7 7M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  moon: 'M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z',
  school: 'M2 9l10-5 10 5-10 5zM6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6',
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

