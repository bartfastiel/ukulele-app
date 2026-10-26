import { h } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, group, listRow, type View } from '../ui/screen.ts';
import { allSongs } from '../music/library.ts';
import { load, totalStars, daysThisWeek } from '../store.ts';
import { countWord, t, tk } from '../i18n.ts';
import { STRINGS } from '../music/notes.ts';
import { link } from '../site/nav.ts';
import { notesOnly } from '../music/instrument.ts';

const WEEKDAYS = [tk('So'), tk('Mo'), tk('Di'), tk('Mi'), tk('Do'), tk('Fr'), tk('Sa')];

export const stars: View = (root) => {
  // frühere Adresse der Einstellungen (Link „Für Linkshänder“): jetzt eine eigene Seite
  if (typeof location !== 'undefined' && location.hash === '#einstellungen') {
    location.replace(link('einstellungen'));
    return;
  }
  const p = load();
  const SONGS = allSongs();
  const week = daysThisWeek();
  const practiced = week.filter(Boolean).length;
  const bass = notesOnly();
  const badges = [
    { name: t('Gestimmt wie ein Profi'), ok: p.tunedStrings >= STRINGS.length, how: t('Alle {n} Saiten stimmen', { n: countWord(STRINGS.length) }) },
    bass
      ? { name: t('Erster Ton'), ok: p.chordsChecked.length >= 1, how: t('Einen Ton mit „Prüf mich!“ schaffen') }
      : { name: t('Erster Akkord'), ok: p.chordsChecked.length >= 1, how: t('Einen Akkord mit „Prüf mich!“ schaffen') },
    bass
      ? { name: t('Ton-Sammler'), ok: p.chordsChecked.length >= 5, how: t('5 verschiedene Töne schaffen') }
      : { name: t('Akkord-Sammler'), ok: p.chordsChecked.length >= 5, how: t('5 verschiedene Akkorde schaffen') },
    { name: t('Erstes Lied'), ok: Object.keys(p.stars).length >= 1, how: t('Ein Lied bis zum Ende spielen') },
    { name: t('Liedermacher'), ok: Object.keys(p.stars).length >= 5, how: t('5 Lieder spielen') },
    { name: t('Durchstarter'), ok: Object.keys(p.stars).some((k) => p.stars[k] >= 3), how: t('Ein Lied im Original-Tempo') },
    { name: t('Wechsel-Meister'), ok: Object.keys(p.bestHunt).some((k) => p.bestHunt[k] >= 20), how: bass ? t('20 Punkte im Ton-Spiel') : t('20 Punkte im Akkord-Spiel') },
    { name: t('Fleißig'), ok: practiced >= 4, how: t('An 4 Tagen in einer Woche üben') },
  ];
  const today = new Date().getDay();
  screen(
    root,
    { title: t('Meine Sterne') },
    h(
      'div',
      { class: 'card total' },
      icon('star', 'icon star on huge-star'),
      h('div', null, h('div', { class: 'score huge' }, String(totalStars())), h('div', { class: 'small' }, t('von {n} Sternen', { n: SONGS.length * 3 }))),
    ),
    h(
      'section',
      { class: 'group-wrap' },
      h('h2', { class: 'section-label' }, t('Diese Woche: {n} von 7 Tagen geübt', { n: practiced })),
      h('div', { class: 'card week' }, ...week.map((d, i) => h('span', { class: `day ${d ? 'on' : ''}` }, t(WEEKDAYS[(today - 6 + i + 7) % 7])))),
    ),
    h(
      'section',
      { class: 'group-wrap' },
      h('h2', { class: 'section-label' }, t('Abzeichen')),
      h(
        'ul',
        { class: 'badges' },
        ...badges.map((b) => h('li', { class: `badge ${b.ok ? 'ok' : ''}` }, icon('star', `icon star ${b.ok ? 'on' : 'off'}`), h('strong', null, b.name), h('span', { class: 'small' }, b.how))),
      ),
    ),
    h(
      'section',
      { class: 'group-wrap' },
      h('h2', { class: 'section-label' }, t('Lieder')),
      h(
        'ul',
        { class: 'song-stars-list group' },
        ...SONGS.map((s) =>
          h(
            'li',
            null,
            h('a', { href: link(`lied/${s.id}`) }, s.title),
            h('span', { class: 'song-stars' }, ...[1, 2, 3].map((i) => icon('star', `icon star ${i <= (p.stars[s.id] || 0) ? 'on' : 'off'}`))),
          ),
        ),
      ),
    ),
    group(null, listRow(link('einstellungen'), 'gear', 'tools', t('Einstellungen'), t('Linkshänder, Stimmung, Sprache, Sicherung'))),
  );
};
