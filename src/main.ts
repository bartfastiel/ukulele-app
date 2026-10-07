import { installWood } from './ui/wood.ts';
import { closeMic } from './audio/mic.ts';
import { load } from './store.ts';
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
  lieder: 'Lieder',
  lied: 'Lied',
  akkorde: 'Akkorde',
  akkord: 'Akkord',
  spiel: 'Akkord-Spiel',
  stimmen: 'Stimmen',
  rhythmus: 'Rhythmus',
  sterne: 'Meine Sterne',
  aufnahme: 'Aufnahmen',
  detektiv: 'Akkord-Detektiv',
  blues: 'Blues',
  'eigenes-lied': 'Eigenes Lied',
  'lied-teilen': 'Lied teilen',
  teilen: 'Geschicktes Lied',
};

let cleanup: Cleanup = undefined;

function route(): void {
  // ohne Array-Destrukturierung: esbuild kann sie für Safari 12 nicht umschreiben
  const parts = location.hash.replace(/^#/, '').split('/');
  const name = parts[1] || '';
  const param = parts[2] || '';
  const view = ROUTES[name] || home;
  if (cleanup) cleanup();
  // Mikrofon nur dort offen halten, wo es gebraucht wird – die Anzeige im Browser geht dann wieder aus
  closeMic();
  const root = document.getElementById('app')!;
  cleanup = view(root, param);
  document.title = TITLES[name] ? `${TITLES[name]} · Ukulele-Club` : 'Ukulele-Club';
  window.scrollTo(0, 0);
  const focus = root.querySelector('h1');
  if (focus && name) {
    focus.setAttribute('tabindex', '-1');
    (focus as HTMLElement).focus({ preventScroll: true });
  }
}

installWood();
if (load().settings.calm) document.documentElement.classList.add('calm');
window.addEventListener('hashchange', route);
route();

if ('serviceWorker' in navigator && location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => undefined);
  });
}
