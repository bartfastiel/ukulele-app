import { h } from './dom.ts';
import { save } from '../store.ts';
import { LANGS, lang, setLang, type Lang } from '../i18n.ts';

/** Sprachwahl; jeder Name in seiner eigenen Sprache. Der Wechsel zeichnet die Ansicht neu (Router). */
export function langSwitch(): HTMLElement {
  const pick = (l: Lang) => {
    save((p) => (p.settings.lang = l));
    setLang(l);
    const again = document.querySelector(`.lang-switch [lang="${l}"]`) as HTMLElement | null;
    if (again) again.focus();
  };
  return h(
    'nav',
    { class: 'lang-switch seg', 'aria-label': 'Sprache · Language · Langue' },
    ...LANGS.map((l) =>
      h('button', { type: 'button', class: 'btn btn-seg', lang: l.id, 'aria-pressed': String(l.id === lang()), onclick: () => pick(l.id) }, l.name),
    ),
  );
}
