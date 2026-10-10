import { h, clear } from './dom.ts';
import { icon } from './icons.ts';
import { micError, micState, openMic } from '../audio/mic.ts';
import { audio } from '../audio/engine.ts';
import { t, tk } from '../i18n.ts';
import { link } from '../site/nav.ts';
import { syncLeftyBadge } from './lefty.ts';

export type Cleanup = (() => void) | void;
export type View = (root: HTMLElement, param: string) => Cleanup;

/** Kopfzeile mit Zurück-Knopf immer an derselben Stelle, darunter der Inhalt auf cremefarbenem Grund. */
export function screen(root: HTMLElement, opts: { title: string; back?: string; theme?: string }, ...content: Node[]): HTMLElement {
  clear(root);
  const back = opts.back ?? link('');
  const main = h('main', { class: `screen theme-${opts.theme || 'brass'}`, id: 'main' }, ...content);
  root.appendChild(
    h(
      'header',
      { class: 'topbar' },
      h(
        'a',
        { class: 'btn btn-round', href: back, 'aria-label': back === link('') ? t('Zur Startseite') : t('Zurück') },
        icon(back === link('') ? 'home' : 'back'),
      ),
      h('h1', null, opts.title),
    ),
  );
  root.appendChild(main);
  syncLeftyBadge();
  return main;
}

export function button(label: string | Node, onclick: () => void, cls = '', attrs: Record<string, string> = {}): HTMLButtonElement {
  return h('button', { type: 'button', class: `btn ${cls}`, onclick: () => onclick(), ...attrs }, label);
}

function dialog(...content: Node[]): { el: HTMLElement; close: () => void } {
  const el = h('div', { class: 'dialog-backdrop', role: 'dialog', 'aria-modal': 'true' }, h('div', { class: 'dialog card' }, ...content));
  document.body.appendChild(el);
  const first = el.querySelector('button');
  if (first) first.focus();
  return { el, close: () => el.parentNode && el.parentNode.removeChild(el) };
}

/**
 * Rückfrage im Stil der App (statt window.confirm). Schließt sich auch, wenn die Ansicht wechselt; dann gilt „Nein“.
 */
export function confirmDialog(opts: { title: string; text: string; yes: string; no: string; danger?: boolean }): Promise<boolean> {
  return new Promise((resolve) => {
    let done = false;
    const finish = (v: boolean) => {
      if (done) return;
      done = true;
      window.removeEventListener('hashchange', onLeave);
      document.removeEventListener('keydown', onKey);
      d.close();
      resolve(v);
    };
    const onLeave = () => finish(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish(false);
    };
    // „Nein“ zuerst: der Fokus landet auf der sicheren Wahl
    const d = dialog(
      h('h2', null, opts.title),
      h('p', null, opts.text),
      h('div', { class: 'row' }, button(opts.no, () => finish(false), 'btn-primary'), button(opts.yes, () => finish(true), opts.danger ? 'btn-danger' : '')),
    );
    window.addEventListener('hashchange', onLeave);
    document.addEventListener('keydown', onKey);
  });
}

const EXPLAINED = 'ukulele-club:mic-explained';

/**
 * Mikrofon kindgerecht anfragen: erst erklären, dann fragt der Browser. Gibt false zurück, wenn es ohne Mikrofon
 * weitergehen soll – jede Ansicht hat dafür einen Ersatzweg.
 */
export function ensureMic(): Promise<boolean> {
  audio();
  const st = micState();
  if (st === 'unsupported') return Promise.resolve(false);
  if (st === 'granted') return openMic().then(() => true, () => false);
  let explained = false;
  try {
    explained = localStorage.getItem(EXPLAINED) === '1';
  } catch {
    explained = false;
  }
  const ask = () =>
    openMic().then(
      () => true,
      () => showDenied(),
    );
  if (explained && st !== 'denied') return ask();
  return new Promise((resolve) => {
    const d = dialog(
      h('div', { class: 'dialog-icon' }, icon('mic', 'icon big')),
      h('h2', null, t('Darf ich zuhören?')),
      h('p', null, t('Damit ich hören kann, ob dein Akkord stimmt, brauche ich das Mikrofon. Es wird nichts aufgenommen und nichts verschickt.')),
      h(
        'div',
        { class: 'row' },
        button(
          t('Ja, hör zu!'),
          () => {
            d.close();
            try {
              localStorage.setItem(EXPLAINED, '1');
            } catch {
              // ohne Speicher fragen wir eben beim nächsten Mal wieder
            }
            void ask().then(resolve);
          },
          'btn-primary',
        ),
        button(t('Ohne Mikrofon'), () => {
          d.close();
          resolve(false);
        }),
      ),
    );
  });
}

function showDenied(): Promise<boolean> {
  const failed = micState() === 'failed';
  return new Promise((resolve) => {
    const d = dialog(
      h('h2', null, t('Ich kann nichts hören')),
      h('p', null, failed ? t('Das Mikrofon startet gerade nicht. Frag einen Erwachsenen:') : t('Das Mikrofon ist gesperrt. Frag einen Erwachsenen:')),
      failed
        ? h(
            'ul',
            { class: 'help' },
            h('li', null, t('Andere Apps schließen, die das Mikrofon benutzen (Anruf, Video, Sprachaufnahme), dann die Seite neu laden.')),
            h('li', null, t('Hilft das nicht: das Gerät einmal neu starten.')),
          )
        : h(
            'ul',
            { class: 'help' },
            h('li', null, t('iPad/iPhone: in Safari links neben der Adresse auf „aA“ tippen › Website-Einstellungen › Mikrofon › „Erlauben“.')),
            h('li', null, t('Außerdem: Einstellungen › Apps › Safari › Mikrofon › „Erlauben“ (bei älteren Geräten: Einstellungen › Safari).')),
            h('li', null, t('Ist Bildschirmzeit an: Einstellungen › Bildschirmzeit › Beschränkungen › Mikrofon › „Änderungen erlauben“.')),
            h('li', null, t('Android/Chrome: auf das Schloss neben der Adresse tippen › Mikrofon › Zulassen.')),
            h('li', null, t('Danach die Seite neu laden.')),
          ),
      h('p', null, t('Du kannst trotzdem weiterüben – dann tippst du selbst auf „Geschafft“.')),
      h('p', { class: 'small mic-error' }, micError() ? t('Technischer Hinweis: {code}', { code: micError() }) : ''),
      button(
        t('Ohne Mikrofon weiter'),
        () => {
          d.close();
          resolve(false);
        },
        'btn-primary',
      ),
    );
  });
}

/** Lob in Abwechslung, damit es nicht abgenutzt klingt. */
const PRAISE = [tk('Super!'), tk('Klasse!'), tk('Genau so!'), tk('Stark!'), tk('Wow!'), tk('Spitze!'), tk('Perfekt!'), tk('Yeah!')];
let praiseIdx = 0;
export function praise(): string {
  praiseIdx = (praiseIdx + 1 + Math.floor(Math.random() * 3)) % PRAISE.length;
  return t(PRAISE[praiseIdx]);
}

/** Bildschirm wach halten, solange gespielt wird (Safari ab 16.4, Chrome; ältere Geräte ignorieren es). */
export function keepAwake(): () => void {
  const nav = navigator as unknown as { wakeLock?: { request(t: string): Promise<{ release(): Promise<void> }> } };
  let lock: { release(): Promise<void> } | null = null;
  let active = true;
  const request = () => {
    if (!nav.wakeLock || !active || document.visibilityState !== 'visible') return;
    nav.wakeLock.request('screen').then(
      (l) => (lock = l),
      () => undefined,
    );
  };
  request();
  document.addEventListener('visibilitychange', request);
  return () => {
    active = false;
    document.removeEventListener('visibilitychange', request);
    if (lock) void lock.release().catch(() => undefined);
  };
}
