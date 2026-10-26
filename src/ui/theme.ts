import { loadTheme, saveTheme, THEME_KEY, type Theme } from '../store.ts';

/** Farbe der Browserleiste je Darstellung (= --bg in src/styles.css). */
export const THEME_COLOR = { light: '#f2f3f5', dark: '#111214' };

/**
 * Kleines Skript für den Kopf jeder vorgerenderten Seite: setzt die gewählte Darstellung vor dem ersten Zeichnen, damit
 * nichts hell aufblitzt. Ohne Wahl entscheidet das Gerät (CSS prefers-color-scheme). Bewusst ES5.
 */
export function themeBootScript(): string {
  return (
    `(function(){try{var t=localStorage.getItem('${THEME_KEY}');if(t==='light'||t==='dark'){` +
    `document.documentElement.setAttribute('data-theme',t);var m=document.querySelectorAll('meta[name="theme-color"]');` +
    `for(var i=0;i<m.length;i++)m[i].setAttribute('content',t==='dark'?'${THEME_COLOR.dark}':'${THEME_COLOR.light}')}}catch(e){}})();`
  );
}

/** Wirkt die Darstellung gerade dunkel (Wahl oder Gerät)? */
export function isDark(): boolean {
  const t = loadTheme();
  if (t !== 'auto') return t === 'dark';
  return typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches;
}

/** Darstellung anwenden: Attribut am <html> und Farbe der Browserleiste. */
export function applyTheme(t: Theme): void {
  const html = document.documentElement;
  if (t === 'auto') html.removeAttribute('data-theme');
  else html.setAttribute('data-theme', t);
  const metas = document.querySelectorAll('meta[name="theme-color"]');
  for (let i = 0; i < metas.length; i++) {
    const media = metas[i].getAttribute('media') || '';
    const own = media.indexOf('dark') >= 0 ? THEME_COLOR.dark : THEME_COLOR.light;
    metas[i].setAttribute('content', t === 'auto' ? own : THEME_COLOR[t]);
  }
}

export function setTheme(t: Theme): void {
  saveTheme(t);
  applyTheme(t);
  syncThemeToggles();
}

/** Sonne/Mond in der Fußzeile zeigt, wohin ein Tippen wechselt. */
function syncThemeToggles(): void {
  const dark = isDark();
  const btns = document.querySelectorAll('[data-theme-toggle]');
  for (let i = 0; i < btns.length; i++) btns[i].setAttribute('aria-pressed', String(dark));
}

/** Fußzeile: leiser Knopf, der zwischen hell und dunkel wechselt (die Wahl bleibt gespeichert). */
export function initThemeToggle(): void {
  const btns = document.querySelectorAll('[data-theme-toggle]');
  for (let i = 0; i < btns.length; i++) btns[i].addEventListener('click', () => setTheme(isDark() ? 'light' : 'dark'));
  syncThemeToggles();
  if (typeof matchMedia === 'function') {
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => syncThemeToggles();
    if (typeof mq.addEventListener === 'function') mq.addEventListener('change', onChange);
    else if (typeof mq.addListener === 'function') mq.addListener(onChange);
  }
}

export type { Theme };
