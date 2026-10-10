import { h } from './dom.ts';
import { load, save } from '../store.ts';
import { t } from '../i18n.ts';

/** Die Hand wurde umgestellt: Ansichten mit Griffbildern zeichnen neu. */
export const LEFTY_EVENT = 'saiten-hand';

export function setLefty(on: boolean): void {
  save((p) => (p.settings.lefty = on));
  syncLeftyBadge();
  window.dispatchEvent(new Event(LEFTY_EVENT));
}

/**
 * Nur für Linkshänder: ein kleines Abzeichen in der Kopfzeile zeigt, dass Griffbilder und Hals gespiegelt sind;
 * Antippen schaltet zurück. Rechtshänder sehen nichts davon.
 */
export function syncLeftyBadge(): void {
  // beim Vorrendern im Build (src/site/vdom.ts) gibt es weder Einstellung noch querySelectorAll
  if (typeof document === 'undefined' || typeof document.querySelectorAll !== 'function') return;
  const bars = document.querySelectorAll('.topbar');
  for (let i = 0; i < bars.length; i++) {
    const old = bars[i].querySelector('.lefty-badge');
    if (old && old.parentNode) old.parentNode.removeChild(old);
    if (!load().settings.lefty) continue;
    bars[i].appendChild(
      h(
        'button',
        {
          type: 'button',
          class: 'btn lefty-badge',
          'aria-label': t('Linkshänder-Ansicht ausschalten'),
          title: t('Linkshänder-Ansicht ausschalten'),
          onclick: () => setLefty(false),
        },
        h('span', { class: 'lefty-text' }, t('Linkshänder')),
        h('span', { class: 'lefty-x', 'aria-hidden': 'true' }, '×'),
      ),
    );
  }
}
