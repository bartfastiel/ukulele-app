import { h } from './dom.ts';
import { button } from './screen.ts';
import { activeTuning, baseInstrument, instrument, setTuning, setVariant, soundId, twelveString } from '../music/instrument.ts';
import { strum } from '../audio/engine.ts';
import { load, save } from '../store.ts';
import { t } from '../i18n.ts';

/** Die Ansicht neu aufbauen, wenn sich die Stimmung ändert (main.ts hört zu). */
export const TUNING_EVENT = 'saiten-stimmung';

/** Saitennamen von oben nach unten, z. B. „D G D G B D“. */
export function tuningNotes(names: string[]): string {
  return names.map((n) => n.toUpperCase()).join(' ');
}

/** Gespeicherte Stimmung anwenden (nach dem Laden im Browser; vorgerenderte Seiten zeigen die Normalstimmung). */
export function applyStoredTuning(): void {
  const st = load().settings;
  setTuning(st.tuning);
  setVariant(st.sound, st.twelve);
  tuningBanner();
}

/** Nach einer Wahl bleibt die Liste im Stimmgerät offen. */
let chosen = false;

export function chooseTuning(id: string): void {
  chosen = true;
  save((p) => (p.settings.tuning = id));
  setTuning(id);
  tuningBanner();
  window.dispatchEvent(new Event(TUNING_EVENT));
}

/** Deutlicher Hinweis oben auf jeder Seite, solange eine andere Stimmung die Griffe ändert. */
export function tuningBanner(): void {
  const old = document.getElementById('tuning-banner');
  if (old && old.parentNode) old.parentNode.removeChild(old);
  const tu = activeTuning();
  if (!tu || tu.banner === false) return;
  const el = h(
    'div',
    { id: 'tuning-banner', class: 'card tuning-banner', role: 'status' },
    h(
      'p',
      null,
      h('strong', null, t('Andere Stimmung: {name}', { name: t(tu.name) })),
      ' ',
      t('Gestimmt auf {notes}. Griffbilder und Stimmgerät passen dazu.', { notes: tuningNotes(tu.names) }),
    ),
    button(t('Zurück zur Normalstimmung'), () => chooseTuning(''), 'btn-primary'),
  );
  const app = document.getElementById('app');
  if (app && app.parentNode) app.parentNode.insertBefore(el, app);
}

/** Auswahl im Stimmgerät: zugeklappt, damit Neulinge die Normalstimmung behalten. */
export function tuningChooser(): HTMLElement | null {
  const inst = baseInstrument();
  const list = inst.tunings || [];
  if (!list.length) return null;
  const active = instrument().tuning;
  const option = (id: string, name: string, notes: string, why: string) => {
    const on = (active ? active.id : '') === id;
    return h(
      'li',
      null,
      button(
        h('span', { class: 'tuning-option' }, h('strong', null, name), ' ', h('span', { class: 'tuning-notes' }, notes), h('span', { class: 'tuning-why' }, why)),
        () => chooseTuning(id),
        'btn-seg tuning-btn',
        { 'aria-pressed': String(on), 'data-tuning': id || 'normal' },
      ),
    );
  };
  return h(
    'details',
    { class: 'tuning-choice', open: chosen || !!active },
    h('summary', { class: 'btn btn-seg' }, t('Andere Stimmung …')),
    h(
      'div',
      { class: 'card' },
      h('p', { class: 'tuning-intro' }, t('Für Fortgeschrittene. Wenn du nicht sicher bist, bleib bei der Normalstimmung.')),
      h(
        'ul',
        { class: 'tuning-list' },
        option('', t('Normalstimmung'), tuningNotes(inst.strings.map((x) => x.name)), t('So lernt man es, und so passen alle Griffe aus Heften und Kursen.')),
        ...list.map((x) => option(x.id, t(x.name), tuningNotes(x.names), t(x.why))),
      ),
    ),
  );
}

let variantChosen = false;

function chooseVariant(sound: string, twelve: boolean): void {
  variantChosen = true;
  save((p) => {
    p.settings.sound = sound;
    p.settings.twelve = twelve;
  });
  setVariant(sound, twelve);
  window.dispatchEvent(new Event(TUNING_EVENT));
  strum('Em');
}

/** Klang (Nylon, Stahl, E-Gitarre) und 12 Saiten – dezent zugeklappt im Stimmgerät. */
export function variantChooser(): HTMLElement | null {
  const inst = baseInstrument();
  const sounds = inst.sounds || [];
  if (!sounds.length && !inst.twelve) return null;
  const twelve = twelveString();
  const current = soundId();
  return h(
    'details',
    { class: 'tuning-choice variant-choice', open: variantChosen || current !== (sounds.length ? sounds[0].id : '') || twelve },
    h('summary', { class: 'btn btn-seg' }, t('Meine Gitarre …')),
    h(
      'div',
      { class: 'card' },
      sounds.length ? h('p', { class: 'tuning-intro' }, t('Klang beim Vorspielen:')) : null,
      h(
        'div',
        { class: 'seg seg-wrap' },
        ...sounds.map((x) =>
          button(t(x.name), () => chooseVariant(x.id, twelve), 'btn-seg', { 'aria-pressed': String(x.id === current), 'data-sound': x.id }),
        ),
      ),
      inst.twelve
        ? button(t('12-saitige Gitarre'), () => chooseVariant(current, !twelve), 'btn-seg', { 'aria-pressed': String(twelve), 'data-twelve': '' })
        : null,
      twelve
        ? h(
            'p',
            { class: 'tuning-intro twelve-hint' },
            t('Jede Saite hat eine Partnerin: Bei E, A, D und G klingt sie eine Oktave höher, bei B und e genau gleich. Stimm erst die dicke Saite, dann ihre Partnerin – das Stimmgerät erkennt beide.'),
          )
        : null,
    ),
  );
}
