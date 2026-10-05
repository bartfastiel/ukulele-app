import { h } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, type View } from '../ui/screen.ts';
import { SONGS } from '../music/songs.ts';
import { difficulty } from '../music/song.ts';
import { load } from '../store.ts';

const LEVEL = ['', 'Leicht', 'Mittel', 'Knifflig'];

export const songs: View = (root) => {
  const stars = load().stars;
  const list = [...SONGS].sort((a, b) => difficulty(a) - difficulty(b) || a.chords.length - b.chords.length);
  screen(
    root,
    { title: 'Lieder', theme: 'brass' },
    h(
      'ul',
      { class: 'song-list' },
      ...list.map((s) => {
        const n = stars[s.id] || 0;
        return h(
          'li',
          null,
          h(
            'a',
            { class: 'song-card btn', href: `#/lied/${s.id}` },
            h('span', { class: 'song-title' }, s.title),
            h(
              'span',
              { class: 'song-meta' },
              h('span', { class: `level level-${difficulty(s)}` }, LEVEL[difficulty(s)]),
              ...s.chords.map((c) => h('span', { class: 'chip' }, c)),
            ),
            h(
              'span',
              { class: 'song-stars', 'aria-label': `${n} von 3 Sternen` },
              ...[1, 2, 3].map((i) => icon('star', `icon star ${i <= n ? 'on' : 'off'}`)),
            ),
          ),
        );
      }),
    ),
  );
};
