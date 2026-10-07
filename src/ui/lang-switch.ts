import { h } from './dom.ts';
import { save } from '../store.ts';
import { LANGS, detectLang, lang, type Lang } from '../i18n.ts';
import { link } from '../site/nav.ts';

/** Dieselbe Seite in einer anderen Sprache: steht als hreflang-Link im Kopf jeder Seite. */
export function alternate(l: Lang): string {
  const el = document.querySelector(`link[rel="alternate"][hreflang="${l}"]`);
  return el ? el.getAttribute('href') || link('', l) : link('', l);
}

function remember(l: Lang): void {
  save((p) => (p.settings.lang = l));
}

/** Sprachwahl; jeder Name in seiner eigenen Sprache. Führt zur selben Seite in der anderen Sprache. */
export function langSwitch(): HTMLElement {
  return h(
    'nav',
    { class: 'lang-switch seg', 'aria-label': 'Sprache · Language · Langue' },
    ...LANGS.map((l) =>
      h(
        'a',
        { class: 'btn btn-seg', lang: l.id, hreflang: l.id, href: alternate(l.id), 'aria-current': l.id === lang() ? 'true' : null, onclick: () => remember(l.id) },
        l.name,
      ),
    ),
  );
}

const OFFER: Record<Lang, string> = {
  de: 'Diese Seite gibt es auch auf Deutsch',
  en: 'This page is also available in English',
  fr: 'Cette page existe aussi en français',
};
const NO: Record<Lang, string> = { de: 'Nein, danke', en: 'No, thanks', fr: 'Non, merci' };

/**
 * Ohne gespeicherte Wahl: freundlicher Hinweis, wenn das Gerät eine andere Sprache spricht. Bewusst keine automatische
 * Weiterleitung – Suchmaschinen sollen jede Sprachfassung sehen.
 */
export function offerLanguage(saved: unknown): void {
  if (saved) return;
  const want = detectLang(navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'de']);
  if (want === lang()) return;
  const bar: HTMLElement = h(
    'div',
    { class: 'lang-offer card', lang: want, role: 'note' },
    h('a', { href: alternate(want), onclick: () => remember(want) }, OFFER[want], ' ›'),
    h('button', { type: 'button', class: 'btn btn-seg', onclick: () => {
      remember(lang());
      if (bar.parentNode) bar.parentNode.removeChild(bar);
    } }, NO[want]),
  );
  document.body.insertBefore(bar, document.body.firstChild);
}
