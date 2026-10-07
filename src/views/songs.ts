import { h } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, type View } from '../ui/screen.ts';
import { allSongs } from '../music/library.ts';
import { difficulty, CATEGORIES, type Song } from '../music/song.ts';
import { load } from '../store.ts';
import { searchSongs } from '../music/search.ts';
import { t, tk } from '../i18n.ts';
import { link } from '../site/nav.ts';

const LEVEL = ['', tk('Leicht'), tk('Mittel'), tk('Knifflig')];

/** Kleines Symbol mit Erklärung beim Darüberfahren (title) und für Screenreader. */
function feature(name: string, label: string): HTMLElement {
  return h('span', { class: 'feature', title: label, 'aria-label': label, role: 'img' }, icon(name, 'icon'));
}

export const songs: View = (root) => {
  const stars = load().stars;
  const SONGS = allSongs();
  const sorted = SONGS.slice().sort((a, b) => difficulty(a) - difficulty(b) || a.chords.length - b.chords.length || a.title.localeCompare(b.title, 'de'));
  const card = (s: Song, snippet: [string, string, string] | null = null) => {
    const n = stars[s.id] || 0;
    const level = t(LEVEL[difficulty(s)]);
    // kompakt: Titel und Sterne in einer Zeile, darunter Akkorde und Merkmale; Schwierigkeit als Farbstreifen
    return h(
      'li',
      null,
      h(
        'a',
        { class: `song-card btn lvl-${difficulty(s)}`, href: link(`lied/${s.id}`), title: `${s.title} – ${level}` },
        h('span', { class: 'sr-only' }, `${level}. `),
        h(
          'span',
          { class: 'song-top' },
          h('span', { class: 'song-title' }, s.title),
          h(
            'span',
            { class: 'song-stars', 'aria-label': t('{n} von 3 Sternen', { n }) },
            ...[1, 2, 3].map((i) => icon('star', `icon star ${i <= n ? 'on' : 'off'}`)),
          ),
        ),
        h(
          'span',
          { class: 'song-meta' },
          ...s.chords.map((c) => h('span', { class: 'chip' }, c)),
          h(
            'span',
            { class: 'song-features' },
            feature('text', t('Liedtext')),
            feature('chords', t('Akkorde')),
            s.hasMelody ? feature('songs', t('Melodie zum Mitspielen und als Tabulatur')) : null,
          ),
        ),
        snippet ? h('span', { class: 'song-snippet' }, snippet[0], h('mark', null, snippet[1]), snippet[2]) : null,
      ),
    );
  };
  const sections = h('div', { class: 'song-sections' });
  const filter = h('div', { class: 'seg seg-wrap song-filter', role: 'group', 'aria-label': t('Kategorie') });
  let active = 'alle';
  const render = () => {
    while (sections.firstChild) sections.removeChild(sections.firstChild);
    CATEGORIES.forEach((c) => {
      if (active !== 'alle' && active !== c.id) return;
      const items = sorted.filter((s) => s.category === c.id);
      if (!items.length) return;
      sections.appendChild(
        h(
          'section',
          { class: 'song-section' },
          h('h2', null, `${t(c.title)} (${items.length})`),
          h('ul', { class: 'song-list' }, ...items.map((x) => card(x))),
          c.id === 'eigene' ? h('a', { class: 'btn own-new', href: link('eigenes-lied') }, icon('plus'), t('Eigenes Lied hinzufügen')) : null,
        ),
      );
    });
  };
  [{ id: 'alle', title: t('Alle ({n})', { n: SONGS.length }) }]
    .concat(CATEGORIES.filter((c) => SONGS.some((s) => s.category === c.id)).map((c) => ({ id: c.id, title: t(c.title) })))
    .forEach((c) => {
      const b = h('button', { type: 'button', class: 'btn btn-seg', 'aria-pressed': String(c.id === active) }, c.title);
      b.addEventListener('click', () => {
        active = c.id;
        Array.prototype.forEach.call(filter.children, (x: Element) => x.setAttribute('aria-pressed', 'false'));
        b.setAttribute('aria-pressed', 'true');
        render();
      });
      filter.appendChild(b);
    });
  render();
  // Suche: zuerst Treffer im Titel, darunter Treffer im Liedtext mit Ausschnitt
  const results = h('div', { class: 'song-results', 'aria-live': 'polite', hidden: true });
  const search = h('input', {
    type: 'search',
    class: 'song-search',
    placeholder: t('Lied suchen – Titel oder Liedtext'),
    'aria-label': t('Lied suchen, im Titel oder im Liedtext'),
    autocomplete: 'off',
    enterkeyhint: 'search',
  }) as HTMLInputElement;
  const runSearch = () => {
    const q = search.value.trim();
    const searching = q.length > 0;
    filter.hidden = searching;
    sections.hidden = searching;
    results.hidden = !searching;
    while (results.firstChild) results.removeChild(results.firstChild);
    if (!searching) return;
    const hits = searchSongs(sorted, q);
    const inTitle = hits.filter((x) => x.inTitle);
    const inText = hits.filter((x) => !x.inTitle);
    if (!hits.length) {
      results.appendChild(h('p', { class: 'card small' }, t('Kein Lied gefunden für „{q}“.', { q })));
      return;
    }
    if (inTitle.length)
      results.appendChild(h('section', { class: 'song-section' }, h('h2', null, t('Im Titel ({n})', { n: inTitle.length })), h('ul', { class: 'song-list' }, ...inTitle.map((x) => card(x.song)))));
    if (inText.length)
      results.appendChild(
        h('section', { class: 'song-section' }, h('h2', null, t('Im Liedtext ({n})', { n: inText.length })), h('ul', { class: 'song-list' }, ...inText.map((x) => card(x.song, x.snippet)))),
      );
  };
  search.addEventListener('input', runSearch);
  const tools = h('div', { class: 'song-tools' }, search, h('a', { class: 'btn btn-seg own-add', href: link('eigenes-lied') }, icon('plus'), t('Eigenes Lied')));
  screen(root, { title: t('Lieder'), theme: 'brass' }, tools, filter, sections, results);
};
