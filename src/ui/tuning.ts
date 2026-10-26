import { h } from './dom.ts';
import { icon } from './icons.ts';
import { button, toggle } from './screen.ts';
import { activeTuning, baseInstrument, instrument, setTuning, setVariant, soundId, twelveString } from '../music/instrument.ts';
import { strum } from '../audio/engine.ts';
import { load, save } from '../store.ts';
import { t } from '../i18n.ts';
import { link } from '../site/nav.ts';

/** Die Ansicht neu aufbauen, wenn sich die Stimmung ändert (main.ts hört zu). */
export const TUNING_EVENT = 'saiten-stimmung';

/** Saitennamen von oben nach unten, z. B. „D G D G B D“; die kurze Banjo-Saite wie üblich klein („f# D F# A D“). */
export function tuningNotes(names: string[]): string {
  const strings = baseInstrument().strings;
  return names.map((n, i) => (strings[i] && strings[i].start ? n.toLowerCase() : n.toUpperCase())).join(' ');
}

/** Gespeicherte Stimmung anwenden (nach dem Laden im Browser; vorgerenderte Seiten zeigen die Normalstimmung). */
export function applyStoredTuning(): void {
  const st = load().settings;
  setTuning(st.tuning);
  setVariant(st.sound, st.twelve);
  tuningBanner();
}

export function chooseTuning(id: string): void {
  save((p) => (p.settings.tuning = id));
  setTuning(id);
  tuningBanner();
  window.dispatchEvent(new Event(TUNING_EVENT));
}

/**
 * Leiser Hinweis oben auf jeder Seite, solange eine andere Stimmung die Griffe ändert: eine schmale Zeile, damit man
 * weiß, warum die Griffbilder anders aussehen – und mit einem Tippen zurück zur Normalstimmung.
 */
export function tuningBanner(): void {
  const old = document.getElementById('tuning-banner');
  if (old && old.parentNode) old.parentNode.removeChild(old);
  const tu = activeTuning();
  if (!tu || tu.banner === false) return;
  const el = h(
    'div',
    { id: 'tuning-banner', class: 'tuning-banner', role: 'status' },
    h(
      'p',
      null,
      h('strong', null, t('Andere Stimmung: {name}', { name: t(tu.name) })),
      ' · ',
      h('span', { class: 'tuning-notes' }, tuningNotes(tu.names)),
    ),
    button(t('Zurück zur Normalstimmung'), () => chooseTuning(''), 'btn-quiet'),
  );
  const app = document.getElementById('app');
  if (app && app.parentNode) app.parentNode.insertBefore(el, app);
}

/** Auswahl in den Einstellungen: Normalstimmung zuerst, jede andere mit kurzer Begründung. */
export function tuningChooser(): HTMLElement | null {
  const inst = baseInstrument();
  const list = inst.tunings || [];
  if (!list.length) return null;
  const active = instrument().tuning;
  const option = (id: string, name: string, notes: string, why: string) => {
    const on = (active ? active.id : '') === id;
    return h(
      'button',
      { type: 'button', class: 'list-row choice tuning-btn', 'aria-pressed': String(on), 'data-tuning': id || 'normal', onclick: () => chooseTuning(id) },
      h('span', { class: 'row-text' }, h('span', { class: 'row-title' }, name, ' ', h('span', { class: 'tuning-notes' }, notes)), h('span', { class: 'row-sub' }, why)),
      icon('check', 'icon row-check'),
    );
  };
  return h(
    'section',
    { class: 'group-wrap tuning-choice', id: 'stimmung' },
    h('h2', { class: 'section-label' }, t('Stimmung')),
    h(
      'div',
      { class: 'group' },
      option('', t('Normalstimmung'), tuningNotes(inst.strings.map((x) => x.name)), t('So lernt man es, und so passen alle Griffe aus Heften und Kursen.')),
      ...list.map((x) => option(x.id, t(x.name), tuningNotes(x.names), t(x.why))),
    ),
    h('p', { class: 'group-note' }, t('Für Fortgeschrittene. Wenn du nicht sicher bist, bleib bei der Normalstimmung.')),
  );
}

function chooseVariant(sound: string, twelve: boolean): void {
  save((p) => {
    p.settings.sound = sound;
    p.settings.twelve = twelve;
  });
  setVariant(sound, twelve);
  window.dispatchEvent(new Event(TUNING_EVENT));
  strum('Em');
}

/** Klang (Nylon, Stahl, E-Gitarre) und 12 Saiten – in den Einstellungen. */
export function variantChooser(): HTMLElement | null {
  const inst = baseInstrument();
  const sounds = inst.sounds || [];
  if (!sounds.length && !inst.twelve) return null;
  const twelve = twelveString();
  const current = soundId();
  return h(
    'section',
    { class: 'group-wrap variant-choice' },
    h('h2', { class: 'section-label' }, t('Meine Gitarre')),
    sounds.length ? h('p', { class: 'group-note group-note-top' }, t('Klang beim Vorspielen:')) : null,
    sounds.length
      ? h(
          'div',
          { class: 'seg' },
          ...sounds.map((x) => button(t(x.name), () => chooseVariant(x.id, twelve), 'btn-seg', { 'aria-pressed': String(x.id === current), 'data-sound': x.id })),
        )
      : null,
    inst.twelve ? h('div', { class: 'group' }, toggle(t('12-saitige Gitarre'), twelve, (v) => chooseVariant(current, v), { 'data-twelve': '' })) : null,
    twelve
      ? h(
          'p',
          { class: 'group-note twelve-hint' },
          t('Jede Saite hat eine Partnerin: Bei E, A, D und G klingt sie eine Oktave höher, bei B und e genau gleich. Stimm erst die dicke Saite, dann ihre Partnerin – das Stimmgerät erkennt beide.'),
        )
      : null,
  );
}

/** Im Stimmgerät: leiser Hinweis auf die gewählte Stimmung, Ändern in den Einstellungen. */
export function tuningLink(): HTMLElement | null {
  const inst = baseInstrument();
  if (!(inst.tunings || []).length && !(inst.sounds || []).length && !inst.twelve) return null;
  const tu = instrument().tuning;
  return h(
    'div',
    { class: 'group' },
    h(
      'a',
      { class: 'list-row tuning-link', href: link('einstellungen') + '#stimmung' },
      h('span', { class: 'row-text' }, h('span', { class: 'row-title' }, t('Stimmung')), h('span', { class: 'row-sub' }, tu ? t(tu.name) : t('Normalstimmung'))),
      icon('chevron', 'icon chevron'),
    ),
  );
}
