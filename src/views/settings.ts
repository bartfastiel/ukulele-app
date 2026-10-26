import { h } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, button, toggle, group, type View } from '../ui/screen.ts';
import { load, save, exportCode, importCode, loadTheme, type Theme } from '../store.ts';
import { setTheme } from '../ui/theme.ts';
import { lang, t } from '../i18n.ts';
import { langSwitch } from '../ui/lang-switch.ts';
import { link, otherSite, siteLink } from '../site/nav.ts';
import { setLefty } from '../ui/lefty.ts';
import { notesOnly } from '../music/instrument.ts';
import { SITES } from '../site/sites.ts';
import { tuningChooser, variantChooser } from '../ui/tuning.ts';

/** Instrumentname am Zeilenanfang groß („bass guitar“ → „Bass guitar“). */
function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Einstellungen: alles, was man einmal festlegt und dann nicht mehr sehen will (docs/design.md „leise“) – Instrument,
 * Hand, Stimmung und Klang, Sprache, Bewegung, Sicherung. Erreichbar über das Zahnrad auf der Startseite.
 */
/** Darstellung: Automatisch (wie das Gerät), Hell oder Dunkel – als Segmentschalter. */
function themeChoice(): HTMLElement {
  const now = loadTheme();
  const options: [Theme, string][] = [
    ['auto', t('Automatisch')],
    ['light', t('Hell')],
    ['dark', t('Dunkel')],
  ];
  const seg = h('div', { class: 'seg', role: 'group', 'aria-label': t('Darstellung') });
  for (const o of options) {
    const b = button(o[1], () => {
      setTheme(o[0]);
      for (let i = 0; i < seg.children.length; i++) seg.children[i].setAttribute('aria-pressed', String(seg.children[i] === b));
    }, 'btn-seg', { 'aria-pressed': String(o[0] === now), 'data-theme-choice': o[0] });
    seg.appendChild(b);
  }
  return seg;
}

export const settings: View = (root) => {
  const p = load();
  const here = document.documentElement.getAttribute('data-site') || '';
  const l = lang();
  const instruments = SITES.filter((s) => s.instrument && (s.id === here || otherSite(s.id) !== null)).map((s) =>
    s.id === here
      ? h(
          'div',
          { class: 'list-row is-current', 'aria-current': 'true' },
          h('span', { class: 'row-text' }, h('span', { class: 'row-title' }, cap(s.name[l]))),
          icon('check', 'icon row-check'),
        )
      : h('a', { class: 'list-row', href: siteLink(s.id, '') }, h('span', { class: 'row-text' }, h('span', { class: 'row-title' }, cap(s.name[l]))), icon('chevron', 'icon chevron')),
  );
  const codeBox = h('textarea', { class: 'code', rows: 3, 'aria-label': t('Sicherungs-Code'), placeholder: t('Code hier einfügen') }) as HTMLTextAreaElement;
  const codeMsg = h('p', { class: 'small', 'aria-live': 'polite' });
  const play = group(
    t('Spielen'),
    toggle(t('Linkshänder'), p.settings.lefty, (v) => setLefty(v), { 'data-setting': 'lefty' }),
    toggle(t('Weniger Bewegung'), p.settings.calm, (v) => {
      save((pr) => (pr.settings.calm = v));
      document.documentElement.classList.toggle('calm', v);
    }, { 'data-setting': 'calm' }),
  );
  play.appendChild(h('p', { class: 'group-note' }, t('Linkshänder: Griffbilder und Hals werden gespiegelt – auf allen Instrumenten.')));
  screen(
    root,
    { title: t('Einstellungen') },
    play,
    tuningChooser(),
    variantChooser(),
    h('section', { class: 'group-wrap', id: 'darstellung' }, h('h2', { class: 'section-label' }, t('Darstellung')), themeChoice()),
    h('section', { class: 'group-wrap' }, h('h2', { class: 'section-label' }, t('Sprache')), langSwitch()),
    group(t('Instrument'), ...instruments),
    h(
      'section',
      { class: 'group-wrap', id: 'sicherung' },
      h('h2', { class: 'section-label' }, t('Sicherung')),
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
    ),
    // Beispielaufnahmen gibt es nur für die Akkorderkennung
    notesOnly() ? null : group(t('Für Erwachsene'), h('a', { class: 'list-row', href: link('aufnahme') }, h('span', { class: 'row-text' }, h('span', { class: 'row-title' }, t('Beispiel-Akkorde aufnehmen'))), icon('chevron', 'icon chevron'))),
  );
  // Sprung von einem Link wie „Stimmung“ im Stimmgerät: die Stelle entsteht erst jetzt, der Browser fand sie noch nicht
  const target = typeof location !== 'undefined' && location.hash.length > 1 ? document.getElementById(location.hash.slice(1)) : null;
  if (target) target.scrollIntoView();
};
