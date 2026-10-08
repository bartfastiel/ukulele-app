import { installWood } from './ui/wood.ts';
import { closeMic } from './audio/mic.ts';
import { load } from './store.ts';
import { isLang, setLang, t, tk } from './i18n.ts';
import { base, brand, link } from './site/nav.ts';
import { offerLanguage } from './ui/lang-switch.ts';
import { renderSecrets } from './ui/secret-text.ts';
import { initInstrument } from './music/instrument.ts';
import type { Cleanup, View } from './ui/screen.ts';
import { home } from './views/home.ts';
import { songs } from './views/songs.ts';
import { player } from './views/player.ts';
import { chords, chordDetail } from './views/chords.ts';
import { game } from './views/game.ts';
import { tuner } from './views/tuner.ts';
import { rhythm } from './views/rhythm.ts';
import { stars } from './views/stars.ts';
import { record } from './views/record.ts';
import { detective } from './views/detective.ts';
import { blues } from './views/blues.ts';
import { ownSongEditor } from './views/own-song.ts';
import { receiveSong, shareSong } from './views/share.ts';

const ROUTES: Record<string, View> = {
  '': home,
  lieder: songs,
  lied: player,
  akkorde: chords,
  akkord: chordDetail,
  spiel: game,
  stimmen: tuner,
  rhythmus: rhythm,
  sterne: stars,
  aufnahme: record,
  detektiv: detective,
  blues,
  'eigenes-lied': ownSongEditor,
  'lied-teilen': shareSong,
  teilen: receiveSong,
};

const TITLES: Record<string, string> = {
  lieder: tk('Lieder'),
  lied: tk('Lied'),
  akkorde: tk('Akkorde'),
  akkord: tk('Akkord'),
  spiel: tk('Akkord-Spiel'),
  stimmen: tk('Stimmen'),
  rhythmus: tk('Rhythmus'),
  sterne: tk('Meine Sterne'),
  aufnahme: tk('Aufnahmen'),
  detektiv: tk('Akkord-Detektiv'),
  blues: tk('Blues'),
  'eigenes-lied': tk('Eigenes Lied'),
  'lied-teilen': tk('Lied teilen'),
  teilen: tk('Geschicktes Lied'),
};

let cleanup: Cleanup = undefined;

const html = document.documentElement;

/** Startet das Werkzeug der Seite. Reine Inhaltsseiten (Wissen, Rechtliches) haben keins und bleiben, wie sie sind. */
function mount(): void {
  const route = html.getAttribute('data-route');
  if (route === null) return;
  const i = route.indexOf('/');
  const name = i < 0 ? route : route.slice(0, i);
  let param = i < 0 ? '' : route.slice(i + 1);
  // Persönliches (eigene und geteilte Lieder) steht hinter dem „#“ und erreicht so nie den Server
  if (html.hasAttribute('data-hash-param')) param = location.hash.slice(1);
  const view = ROUTES[name] || home;
  if (cleanup) cleanup();
  // Mikrofon nur dort offen halten, wo es gebraucht wird – die Anzeige im Browser geht dann wieder aus
  closeMic();
  const root = document.getElementById('app')!;
  cleanup = view(root, param);
  if (TITLES[name] && html.hasAttribute('data-hash-param')) document.title = `${t(TITLES[name])} · ${brand()}`;
  const focus = root.querySelector('h1');
  if (focus && name) {
    focus.setAttribute('tabindex', '-1');
    (focus as HTMLElement).focus({ preventScroll: true });
  }
}

// zuerst das Instrument: Holz und Farben hängen davon ab
initInstrument();
installWood();
/** Frühere Adressen (#/lied/…, #/teilen/…) auf die neuen Seiten umleiten – auch bei einem Wechsel nur hinter dem „#“. */
function redirectOldHash(): boolean {
  if (location.hash.indexOf('#/') !== 0) return false;
  location.replace(link(location.hash.slice(2), isLang(html.lang) ? html.lang : 'de'));
  return true;
}
window.addEventListener('hashchange', redirectOldHash);
if (!redirectOldHash()) {
  setLang(isLang(html.lang) ? html.lang : 'de');
  if (load().settings.calm) html.classList.add('calm');
  mount();
  renderSecrets();
  if (html.hasAttribute('data-hash-param')) window.addEventListener('hashchange', () => mount());
  offerLanguage(load().settings.lang);
}

if ('serviceWorker' in navigator && location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(base() + 'sw.js', { scope: base() }).catch(() => undefined);
  });
}
