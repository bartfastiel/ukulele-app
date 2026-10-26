import { h, clear } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { load, totalStars } from '../store.ts';
import { lang, t } from '../i18n.ts';
import { baseInstrument, instrument, notesOnly } from '../music/instrument.ts';
import { allSongs, findSong } from '../music/library.ts';
import { christmasNow } from '../site/season.ts';
import { group, listRow, tunerLink, type View } from '../ui/screen.ts';
import { link } from '../site/nav.ts';
import { COURSE_TITLES } from '../content/kurse.ts';

/** Werkzeugkachel: Symbol in der Akzentfarbe, Beschriftung darunter, drei je Reihe. */
function toolTile(href: string, ic: string, title: string, cls = ''): HTMLElement {
  return h('a', { class: `tool-tile ${cls}`, href }, icon(ic), h('span', { class: 'tool-title' }, title));
}

/**
 * Große Karte ganz oben: Lernweg („Weiter mit Lektion 4“, „Lernweg starten“), bei Instrumenten ohne Kurs
 * „Weiterspielen“ mit dem zuletzt gespielten Lied. Ein runder Akzentknopf zeigt: hier geht es weiter.
 */
function heroCard(href: string, kicker: string, title: string, sub: string | null, progress: number | null, cls: string): HTMLElement {
  return h(
    'a',
    { class: `hero-card ${cls}`, href },
    h(
      'span',
      { class: 'hero-text' },
      h('span', { class: 'hero-kicker' }, kicker),
      h('span', { class: 'hero-title' }, title),
      sub ? h('span', { class: 'hero-sub' }, sub) : null,
      progress === null ? null : h('span', { class: 'progress', 'aria-hidden': 'true' }, h('span', { class: 'progress-bar', style: `width: ${Math.round(progress * 100)}%` })),
    ),
    h('span', { class: 'hero-go', 'aria-hidden': 'true' }, icon('play')),
  );
}

/** Lernweg: nächste offene Lektion, Fortschritt; ohne Häkchen „Lernweg starten“. */
function courseCard(titles: { de: string; en: string; fr: string }[]): HTMLElement {
  const done = (load().lessonsDone || []).filter((n) => n >= 1 && n <= titles.length);
  const total = titles.length;
  let next = 0;
  for (let n = 1; n <= total && !next; n++) if (done.indexOf(n) < 0) next = n;
  const l = lang();
  if (!done.length)
    return heroCard(link('lektionen'), t('Lernweg'), t('Lernweg starten'), t('{n} Lektionen, eine pro Woche', { n: total }), null, 'hero-course');
  const sub = t('{done} von {n} Lektionen geschafft', { done: done.length, n: total });
  if (!next) return heroCard(link('lektionen'), t('Lernweg'), t('Alle Lektionen abgeschlossen'), sub, 1, 'hero-course');
  return heroCard(
    link(`lektion/${next}`),
    t('Weiter mit deinem Kurs'),
    t('Lektion {n} · {title}', { n: next, title: titles[next - 1][l] }),
    sub,
    done.length / total,
    'hero-course',
  );
}

/** Vom 1. November bis 6. Januar: Weihnachtslieder als erste Zeile bei den Liedern (nur im Browser, nach dessen Datum). */
function seasonRow(): HTMLElement | null {
  if (!christmasNow()) return null;
  const n = allSongs().filter((s) => s.category === 'weihnachten').length;
  return listRow(link('weihnachten'), 'star', 'songs', t('Weihnachtslieder'), t('{n} Lieder für die Weihnachtszeit', { n }), 'tile-season');
}

export const home: View = (root) => {
  clear(root);
  const p = load();
  const last = p.lastSong ? findSong(p.lastSong) : undefined;
  const bass = notesOnly();
  const titles = COURSE_TITLES[baseInstrument().id];
  const lastRow = last ? listRow(link(`lied/${last.id}`), 'play', 'songs', t('Weiterspielen'), last.title, 'row-continue') : null;
  const hero = titles
    ? courseCard(titles)
    : last
      ? heroCard(link(`lied/${last.id}`), t('Weiterspielen'), last.title, t('Zuletzt gespielt'), null, 'hero-continue')
      : heroCard(link('lieder'), t('Einstieg'), t('Erstes Lied spielen'), bass ? t('Basstöne zum Mitspielen') : t('Karaoke zum Mitspielen'), null, 'hero-start');
  root.appendChild(
    h(
      'main',
      { class: 'home', id: 'main' },
      h(
        'header',
        { class: 'home-head' },
        h('div', { class: 'brand' }, h('h1', null, h('span', { class: 'brand-name' }, 'Open String'), ' ', h('span', { class: 'brand-inst' }, t(instrument().name)))),
        h(
          'nav',
          { class: 'head-tools', 'aria-label': t('Werkzeuge') },
          tunerLink(),
          h('a', { class: 'topbar-tool star-link', href: link('sterne'), 'aria-label': t('Meine Sterne: {n}', { n: totalStars() }) }, icon('star', 'icon star'), h('span', { class: 'star-count' }, String(totalStars()))),
          h('a', { class: 'topbar-tool', href: link('einstellungen'), 'aria-label': t('Einstellungen'), title: t('Einstellungen') }, icon('gear')),
        ),
      ),
      hero,
      h(
        'section',
        { class: 'group-wrap' },
        h('h2', { class: 'section-label' }, t('Werkzeuge')),
        h(
          'div',
          { class: 'tool-grid' },
          toolTile(link('stimmen'), 'tuner', t('Stimmen'), 'tile-tuner'),
          toolTile(link('akkorde'), bass ? 'note' : 'chords', bass ? t('Töne') : t('Akkorde'), 'tile-chords'),
          toolTile(link('rhythmus'), 'rhythm', t('Rhythmus'), 'tile-rhythm'),
        ),
      ),
      h(
        'nav',
        { class: 'home-groups', 'aria-label': t('Bereiche') },
        group(
          t('Spielen'),
          seasonRow(),
          titles ? lastRow : null,
          listRow(link('lieder'), 'songs', 'songs', t('Lieder spielen'), bass ? t('Basstöne zum Mitspielen') : t('Karaoke zum Mitspielen'), 'tile-songs'),
          listRow(link('blues'), 'blues', 'band', t('Blues'), bass ? t('Walking Bass mit Begleitband') : t('12-Takt-Blues mit Begleitband'), 'tile-blues'),
          listRow(link('begleitung/rock'), 'band', 'band', t('Band-Begleitung'), t('Rock, Pop, Shuffle, Country'), 'tile-grooves'),
        ),
        group(
          t('Üben'),
          listRow(link('detektiv'), 'detective', 'games', bass ? t('Ton-Detektiv') : t('Akkord-Detektiv'), bass ? t('Erkennt gespielte Töne') : t('Erkennt gespielte Akkorde'), 'tile-detective'),
          listRow(link('spiel'), 'game', 'games', bass ? t('Ton-Spiel') : t('Akkord-Spiel'), bass ? t('Töne finden auf Zeit') : t('Akkordwechsel auf Zeit'), 'tile-game'),
        ),
        group(
          t('Lernen'),
          titles ? listRow(link('lektionen'), 'steps', 'learn', t('Lektionen'), t('Aufbauender Kurs, eine Lektion pro Woche'), 'tile-lessons') : null,
          listRow(link('wissen'), 'book', 'learn', t('Tipps & Wissen'), bass ? t('Kurze Artikel zu Stimmen, Tönen und Üben') : t('Kurze Artikel zu Stimmen, Akkorden und Üben'), 'tile-wissen'),
        ),
      ),
    ),
  );
};
