import { h, clear } from '../ui/dom.ts';
import { icon, soundHole } from '../ui/icons.ts';
import { load, totalStars } from '../store.ts';
import { song } from '../music/songs.ts';
import type { View } from '../ui/screen.ts';

function tile(href: string, ic: string, title: string, sub: string, cls = ''): HTMLElement {
  return h(
    'a',
    { class: `tile btn ${cls}`, href },
    h('span', { class: 'tile-icon' }, icon(ic)),
    h('span', { class: 'tile-text' }, h('span', { class: 'tile-title' }, title), h('span', { class: 'tile-sub' }, sub)),
  );
}

export const home: View = (root) => {
  clear(root);
  const p = load();
  const last = p.lastSong ? song(p.lastSong) : undefined;
  const firstVisit = !p.days.length;
  root.appendChild(
    h(
      'main',
      { class: 'home', id: 'main' },
      h(
        'header',
        { class: 'home-head' },
        soundHole(),
        h('div', { class: 'brand' }, h('h1', null, 'Ukulele-Club'), h('p', null, 'Üben, mitspielen, Spaß haben')),
        h(
          'a',
          { class: 'btn star-badge', href: '#/sterne', 'aria-label': `Meine Sterne: ${totalStars()}` },
          icon('star', 'icon star'),
          h('span', null, String(totalStars())),
        ),
      ),
      firstVisit
        ? h(
            'a',
            { class: 'card hint', href: '#/stimmen' },
            h('strong', null, 'Hallo! '),
            'Zuerst stimmen wir deine Ukulele – dann klingt alles viel schöner. ',
            h('span', { class: 'hint-go' }, 'Zum Stimmgerät ›'),
          )
        : null,
      h(
        'nav',
        { class: 'tiles', 'aria-label': 'Bereiche' },
        last ? tile(`#/lied/${last.id}`, 'play', 'Weiterspielen', last.title, 'tile-wide theme-pearl') : null,
        tile('#/lieder', 'songs', 'Lieder spielen', 'Karaoke zum Mitspielen', 'tile-big theme-brass'),
        tile('#/blues', 'blues', 'Blues', 'Mit der Band jammen', 'theme-teal'),
        tile('#/akkorde', 'chords', 'Akkorde', 'Griffe lernen und prüfen', 'theme-teal'),
        tile('#/detektiv', 'detective', 'Akkord-Detektiv', 'Spiel was – ich sag, was es ist', 'theme-cherry'),
        tile('#/spiel', 'game', 'Akkord-Spiel', 'Wie viele schaffst du?', 'theme-cherry'),
        tile('#/stimmen', 'tuner', 'Stimmen', 'Stimmgerät', 'theme-pearl'),
        tile('#/rhythmus', 'rhythm', 'Rhythmus', 'Metronom & Schlagmuster', 'theme-pearl'),
      ),
    ),
  );
};
