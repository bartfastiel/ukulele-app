import { h } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, button, type View } from '../ui/screen.ts';
import { allSongs } from '../music/library.ts';
import { load, save, totalStars, daysThisWeek, exportCode, importCode } from '../store.ts';
import { t, tk } from '../i18n.ts';
import { langSwitch } from '../ui/lang-switch.ts';

const WEEKDAYS = [tk('So'), tk('Mo'), tk('Di'), tk('Mi'), tk('Do'), tk('Fr'), tk('Sa')];

export const stars: View = (root) => {
  const p = load();
  const SONGS = allSongs();
  const week = daysThisWeek();
  const practiced = week.filter(Boolean).length;
  const badges = [
    { name: t('Gestimmt wie ein Profi'), ok: p.tunedStrings >= 4, how: t('Alle vier Saiten stimmen') },
    { name: t('Erster Akkord'), ok: p.chordsChecked.length >= 1, how: t('Einen Akkord mit „Prüf mich!“ schaffen') },
    { name: t('Akkord-Sammler'), ok: p.chordsChecked.length >= 5, how: t('5 verschiedene Akkorde schaffen') },
    { name: t('Erstes Lied'), ok: Object.keys(p.stars).length >= 1, how: t('Ein Lied bis zum Ende spielen') },
    { name: t('Liedermacher'), ok: Object.keys(p.stars).length >= 5, how: t('5 Lieder spielen') },
    { name: t('Durchstarter'), ok: Object.keys(p.stars).some((k) => p.stars[k] >= 3), how: t('Ein Lied im Original-Tempo') },
    { name: t('Wechsel-Meister'), ok: Object.keys(p.bestHunt).some((k) => p.bestHunt[k] >= 20), how: t('20 Punkte im Akkord-Spiel') },
    { name: t('Fleißig'), ok: practiced >= 4, how: t('An 4 Tagen in einer Woche üben') },
  ];
  const settingToggle = (label: string, key: 'lefty' | 'calm') => {
    const b = button(label, () => {
      const v = !load().settings[key];
      save((pr) => (pr.settings[key] = v));
      b.setAttribute('aria-pressed', String(v));
      if (key === 'calm') document.documentElement.classList.toggle('calm', v);
    }, 'btn-seg', { 'aria-pressed': String(p.settings[key]) });
    return b;
  };
  const codeBox = h('textarea', { class: 'code', rows: 3, 'aria-label': t('Sicherungs-Code'), placeholder: t('Code hier einfügen') }) as HTMLTextAreaElement;
  const codeMsg = h('p', { class: 'small', 'aria-live': 'polite' });
  const today = new Date().getDay();
  screen(
    root,
    { title: t('Meine Sterne'), theme: 'brass' },
    h(
      'div',
      { class: 'card total' },
      icon('star', 'icon star on huge-star'),
      h('div', null, h('div', { class: 'score huge' }, String(totalStars())), h('div', null, t('von {n} Sternen', { n: SONGS.length * 3 }))),
    ),
    h(
      'div',
      { class: 'card' },
      h('h2', null, t('Diese Woche: {n} von 7 Tagen geübt', { n: practiced })),
      h(
        'div',
        { class: 'week' },
        ...week.map((d, i) => h('span', { class: `day ${d ? 'on' : ''}` }, t(WEEKDAYS[(today - 6 + i + 7) % 7]))),
      ),
    ),
    h('h2', null, t('Abzeichen')),
    h(
      'ul',
      { class: 'badges' },
      ...badges.map((b) =>
        h('li', { class: `card badge ${b.ok ? 'ok' : ''}` }, icon(b.ok ? 'star' : 'star', `icon star ${b.ok ? 'on' : 'off'}`), h('strong', null, b.name), h('span', { class: 'small' }, b.how)),
      ),
    ),
    h('h2', null, t('Lieder')),
    h(
      'ul',
      { class: 'song-stars-list card' },
      ...SONGS.map((s) =>
        h(
          'li',
          null,
          h('a', { href: `#/lied/${s.id}` }, s.title),
          h('span', null, ...[1, 2, 3].map((i) => icon('star', `icon star ${i <= (p.stars[s.id] || 0) ? 'on' : 'off'}`))),
        ),
      ),
    ),
    h('h2', null, t('Einstellungen')),
    h('div', { class: 'seg seg-wrap' }, settingToggle(t('Linkshänder'), 'lefty'), settingToggle(t('Weniger Bewegung'), 'calm')),
    langSwitch(),
    h(
      'details',
      { class: 'card backup' },
      h('summary', null, t('Sterne sichern oder auf ein anderes Gerät mitnehmen')),
      h('p', { class: 'small' }, t('Alles bleibt nur auf diesem Gerät. Mit dem Code kannst du deine Sterne woanders einfügen.')),
      codeBox,
      h(
        'div',
        { class: 'row' },
        button(t('Code zeigen'), () => {
          codeBox.value = exportCode();
          codeBox.select();
        }),
        button(t('Code einfügen'), () => {
          codeMsg.textContent = importCode(codeBox.value) ? t('Übernommen!') : t('Der Code passt nicht.');
        }),
      ),
      codeMsg,
    ),
    h(
      'a',
      { class: 'btn', href: '#/aufnahme' },
      t('Für Erwachsene: Beispiel-Akkorde aufnehmen'),
    ),
  );
};
