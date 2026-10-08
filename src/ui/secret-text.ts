import { h } from './dom.ts';
import { t } from '../i18n.ts';
import { unscramble } from '../site/scramble.ts';

/**
 * Impressumsangaben nur als Grafik: Erst nach einer kurzen, zufälligen Pause setzen sich viele kleine Bildkacheln in
 * vertauschter Reihenfolge zur Anschrift zusammen; die Buchstaben stehen leicht versetzt. Im HTML steht kein Text.
 * Bewusst auch nicht für Screenreader oder als Link (nur „Anschrift als Bild“ bzw. „E-Mail-Adresse als Bild“).
 */
const TILE = 14;

function draw(lines: string[], color: string, font: string, size: number): HTMLCanvasElement {
  const ratio = Math.min(3, window.devicePixelRatio || 1);
  const lineH = Math.round(size * 1.4);
  const probe = document.createElement('canvas').getContext('2d')!;
  // WebKit liefert die Schriftliste ohne Anführungszeichen; für die Zeichenfläche jeden Namen mit Leerzeichen quoten
  const family = font
    .split(',')
    .map((f) => f.trim().replace(/^["']|["']$/g, ''))
    .filter((f) => f && f !== 'system-ui')
    .map((f) => (/\s/.test(f) ? `"${f}"` : f))
    .join(', ');
  probe.font = `${size}px ${family || 'sans-serif'}`;
  if (probe.font.indexOf(`${size}px`) < 0) probe.font = `${size}px sans-serif`;
  const width = Math.ceil(Math.max(...lines.map((l) => probe.measureText(l).width))) + 4;
  const canvas = document.createElement('canvas');
  canvas.width = width * ratio;
  canvas.height = (lines.length * lineH + Math.round(size * 0.35)) * ratio;
  const g = canvas.getContext('2d')!;
  g.scale(ratio, ratio);
  g.font = probe.font;
  g.fillStyle = color;
  g.textBaseline = 'alphabetic';
  lines.forEach((line, row) => {
    let x = 0;
    const y = row * lineH + size;
    for (const ch of line) {
      // ein wenig Versatz je Zeichen: für Menschen unauffällig, für Texterkennung lästig
      g.fillText(ch, x + (Math.random() - 0.5) * 0.8, y + (Math.random() - 0.5) * 2.2);
      x += g.measureText(ch).width;
    }
  });
  return canvas;
}

function puzzle(source: HTMLCanvasElement, box: HTMLElement): void {
  const dpr = Math.min(3, window.devicePixelRatio || 1);
  const w = source.width / dpr;
  const hgt = source.height / dpr;
  box.style.width = `${w}px`;
  box.style.height = `${hgt}px`;
  const tiles: HTMLCanvasElement[] = [];
  for (let y = 0; y < hgt; y += TILE)
    for (let x = 0; x < w; x += TILE) {
      const tw = Math.min(TILE, w - x);
      const th = Math.min(TILE, hgt - y);
      const c = document.createElement('canvas');
      c.width = Math.ceil(tw * dpr);
      c.height = Math.ceil(th * dpr);
      c.getContext('2d')!.drawImage(source, x * dpr, y * dpr, tw * dpr, th * dpr, 0, 0, tw * dpr, th * dpr);
      c.style.left = `${x}px`;
      c.style.top = `${y}px`;
      c.style.width = `${tw}px`;
      c.style.height = `${th}px`;
      tiles.push(c);
    }
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = tiles[i];
    tiles[i] = tiles[j];
    tiles[j] = tmp;
  }
  tiles.forEach((c) => window.setTimeout(() => box.appendChild(c), 51 + Math.random() * 120));
}

/** Alle [data-secret]-Stellen der Seite (nur Impressum und Datenschutz) als Grafik füllen. */
export function renderSecrets(): void {
  const spots = document.querySelectorAll('[data-secret]');
  for (let i = 0; i < spots.length; i++) {
    const spot = spots[i] as HTMLElement;
    const text = unscramble(spot.getAttribute('data-secret') || '');
    if (!text) continue;
    const isMail = spot.getAttribute('data-kind') === 'mail';
    const lines = text.split('\n');
    const style = getComputedStyle(spot);
    const box = h('span', { class: 'secret-art', role: 'img', 'aria-label': isMail ? t('E-Mail-Adresse als Bild') : t('Anschrift als Bild') });
    while (spot.firstChild) spot.removeChild(spot.firstChild);
    spot.appendChild(box);
    puzzle(draw(lines, style.color || '#2b1608', style.fontFamily || 'sans-serif', parseFloat(style.fontSize) || 20), box);
  }
}
