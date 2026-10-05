import { h } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, button, type View } from '../ui/screen.ts';
import { SONGS } from '../music/songs.ts';
import { load, save, totalStars, daysThisWeek, exportCode, importCode } from '../store.ts';

const WEEKDAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

export const stars: View = (root) => {
  const p = load();
  const week = daysThisWeek();
  const practiced = week.filter(Boolean).length;
  const badges = [
    { name: 'Gestimmt wie ein Profi', ok: p.tunedStrings >= 4, how: 'Alle vier Saiten stimmen' },
    { name: 'Erster Akkord', ok: p.chordsChecked.length >= 1, how: 'Einen Akkord mit „Prüf mich!“ schaffen' },
    { name: 'Akkord-Sammler', ok: p.chordsChecked.length >= 5, how: '5 verschiedene Akkorde schaffen' },
    { name: 'Erstes Lied', ok: Object.keys(p.stars).length >= 1, how: 'Ein Lied bis zum Ende spielen' },
    { name: 'Liedermacher', ok: Object.keys(p.stars).length >= 5, how: '5 Lieder spielen' },
    { name: 'Durchstarter', ok: Object.keys(p.stars).some((k) => p.stars[k] >= 3), how: 'Ein Lied im Original-Tempo' },
    { name: 'Wechsel-Meister', ok: Object.keys(p.bestHunt).some((k) => p.bestHunt[k] >= 20), how: '20 Punkte im Akkord-Spiel' },
    { name: 'Fleißig', ok: practiced >= 4, how: 'An 4 Tagen in einer Woche üben' },
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
  const codeBox = h('textarea', { class: 'code', rows: 3, 'aria-label': 'Sicherungs-Code', placeholder: 'Code hier einfügen' }) as HTMLTextAreaElement;
  const codeMsg = h('p', { class: 'small', 'aria-live': 'polite' });
  const today = new Date().getDay();
  screen(
    root,
    { title: 'Meine Sterne', theme: 'brass' },
    h(
      'div',
      { class: 'card total' },
      icon('star', 'icon star on huge-star'),
      h('div', null, h('div', { class: 'score huge' }, String(totalStars())), h('div', null, `von ${SONGS.length * 3} Sternen`)),
    ),
    h(
      'div',
      { class: 'card' },
      h('h2', null, `Diese Woche: ${practiced} von 7 Tagen geübt`),
      h(
        'div',
        { class: 'week' },
        ...week.map((d, i) => h('span', { class: `day ${d ? 'on' : ''}` }, WEEKDAYS[(today - 6 + i + 7) % 7])),
      ),
    ),
    h('h2', null, 'Abzeichen'),
    h(
      'ul',
      { class: 'badges' },
      ...badges.map((b) =>
        h('li', { class: `card badge ${b.ok ? 'ok' : ''}` }, icon(b.ok ? 'star' : 'star', `icon star ${b.ok ? 'on' : 'off'}`), h('strong', null, b.name), h('span', { class: 'small' }, b.how)),
      ),
    ),
    h('h2', null, 'Lieder'),
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
    h('h2', null, 'Einstellungen'),
    h('div', { class: 'seg seg-wrap' }, settingToggle('Linkshänder', 'lefty'), settingToggle('Weniger Bewegung', 'calm')),
    h(
      'details',
      { class: 'card backup' },
      h('summary', null, 'Sterne sichern oder auf ein anderes Gerät mitnehmen'),
      h('p', { class: 'small' }, 'Alles bleibt nur auf diesem Gerät. Mit dem Code kannst du deine Sterne woanders einfügen.'),
      codeBox,
      h(
        'div',
        { class: 'row' },
        button('Code zeigen', () => {
          codeBox.value = exportCode();
          codeBox.select();
        }),
        button('Code einfügen', () => {
          codeMsg.textContent = importCode(codeBox.value) ? 'Übernommen!' : 'Der Code passt nicht.';
        }),
      ),
      codeMsg,
    ),
  );
};
