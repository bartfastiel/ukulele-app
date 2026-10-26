import { h, announce } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, button, ensureMic, praise, type View } from '../ui/screen.ts';
import { diagnose } from '../music/diagnose.ts';
import { chordDiagram } from '../ui/chord-diagram.ts';
import { playableChord } from '../ui/chord-play.ts';
import { CHORDS, ROOTS, chord, chordSay, describeChord, parseChordName, type Chord } from '../music/chords.ts';
import { easyGrips, easyLabels, type EasyGrip } from '../music/easy-grips.ts';
import { canonicalChord } from '../site/routes.ts';
import { strum, successSound } from '../audio/engine.ts';
import { markOwnSound } from '../audio/own-sound.ts';
import { listenForChord, type ChordListener } from '../audio/listen.ts';
import { load, save, markPracticed } from '../store.ts';
import { lang, t, tk } from '../i18n.ts';
import { chordLongName, PAGE_QUALITIES, POWER_ORDER } from '../site/chord-names.ts';
import { relativeHints } from '../site/relatives.ts';
import { instrument } from '../music/instrument.ts';
import { link, go } from '../site/nav.ts';
import { notesOnly } from '../music/instrument.ts';
import { noteDetail, notesView, printLinks } from './notes.ts';

const GROUPS = [
  { title: tk('Die ersten Akkorde'), level: 1 },
  { title: tk('Für die meisten Lieder'), level: 2 },
  { title: tk('Für Fortgeschrittene'), level: 3 },
  { title: tk('Profi-Griffe'), level: 4 },
];

export const chords: View = (root, param) => {
  // E-Bass: Töne auf dem Hals statt Griffe
  if (notesOnly()) return notesView(root, param);
  const p = load();
  screen(
    root,
    { title: t('Akkorde') },
    ...GROUPS.map((g) =>
      h(
        'section',
        { class: 'chord-group' },
        h('h2', null, t(g.title)),
        h(
          'div',
          { class: 'chord-grid' },
          ...CHORDS.filter((c) => c.level === g.level).map((c) =>
            h(
              'a',
              { class: 'chord-tile btn', href: link(`akkord/${encodeURIComponent(c.name)}`), 'aria-label': describeChord(c) },
              h('span', { class: c.name.length > 5 ? 'chord-name long' : 'chord-name' }, c.name, p.chordsChecked.includes(c.name) ? icon('check', 'icon tick') : null),
              chordDiagram(c, { lefty: p.settings.lefty, labels: false }),
            ),
          ),
        ),
      ),
    ),
    // nur wo das Instrument eigene Powerchord-Griffe hat (Gitarre in Normalstimmung)
    ...(instrument().shapes['5'] ? [h('p', { class: 'card relative-hint' }, h('a', { href: link('powerchords') }, t('Powerchords für E-Gitarre: E5, A5, D5 …'), ' ›'))] : []),
    printLinks(),
  );
};

export const chordDetail: View = (root, param) => {
  if (notesOnly()) return noteDetail(root, param);
  const name = decodeURIComponent(param);
  // Jeder benennbare Akkord hat eine Seite, nicht nur die Griffe der Bibliothek
  const ch = CHORDS.find((c) => c.name === name) || (parseChordName(name) ? chord(canonicalChord(name)) : null);
  if (!ch) {
    go('akkorde');
    return;
  }
  const lefty = load().settings.lefty;
  let listener: ChordListener | null = null;
  let giveUp = 0;
  let active: HTMLElement | null = null;
  const stopListening = () => {
    listener?.stop();
    listener = null;
    window.clearTimeout(giveUp);
  };
  /** „Prüf mich!“ für einen Griff; bei einer leichten Variante gilt genau sie als richtig. */
  const checkButton = (grip: Chord, box: HTMLElement, feedback: HTMLElement, easy: boolean, label?: string) =>
    button(
      h('span', null, icon('mic'), ' ', t('Prüf mich!')),
      () => {
        stopListening();
        // nur eine Rückmeldung hört gleichzeitig zu
        if (active && active !== feedback && active.className === 'feedback listening') {
          active.className = 'feedback';
          active.textContent = '';
        }
        active = feedback;
        feedback.hidden = false;
        void ensureMic().then((ok) => {
          if (!ok) {
            feedback.textContent = t('Ohne Mikrofon kann ich nicht zuhören – vergleiche deinen Klang mit „Anhören“.');
            return;
          }
          feedback.className = 'feedback listening';
          feedback.textContent = t('Ich höre zu … schlag die Saiten an!');
          let streak = { s: -1, n: 0 };
          void listenForChord(
            ch.name,
            {
              onHit: () => {
                stopListening();
                successSound();
                feedback.className = 'feedback good';
                feedback.textContent = easy ? `${praise()} ${t('Dein leichter Griff klingt richtig gut!')}` : `${praise()} ${t('Das ist ein schönes {chord}!', { chord: ch.name })}`;
                announce(feedback.textContent);
                if (!easy)
                  save((p) => {
                    if (!p.chordsChecked.includes(ch.name)) p.chordsChecked.push(ch.name);
                  });
                markPracticed();
                box.replaceChild(playableChord(grip, { lefty }), box.firstChild!);
              },
              onVerdict: (v) => {
                if (!v || v.ok || v.weakString < 0) return;
                streak = streak.s === v.weakString ? { s: v.weakString, n: streak.n + 1 } : { s: v.weakString, n: 1 };
                if (streak.n === 4) {
                  feedback.className = 'feedback almost';
                  feedback.textContent = `${t('Fast!')} ${diagnose(grip, v.weakString, v.weakKind)}`;
                  box.replaceChild(playableChord(grip, { lefty, highlight: v.weakString }), box.firstChild!);
                }
              },
            },
            easy ? grip : undefined,
          ).then((l) => {
            listener = l;
            giveUp = window.setTimeout(() => {
              if (!listener) return;
              stopListening();
              if (feedback.className !== 'feedback good') {
                feedback.className = 'feedback almost';
                feedback.textContent = t('Noch nicht ganz – probier’s gleich nochmal. Jede Saite einzeln anzupfen hilft!');
              }
            }, 12000);
          }, () => undefined);
        });
      },
      easy ? '' : 'btn-primary',
      label ? { 'aria-label': label } : {},
    );
  const diagramBox = h('div', { class: 'diagram-big' }, playableChord(ch, { lefty }));
  const feedback = h('div', { class: 'feedback', 'aria-live': 'polite' }, t('Greif den Akkord und tippe auf „Prüf mich!“.'));
  const check = checkButton(ch, diagramBox, feedback, false);
  const easy = easyGrips(ch.name);
  const p = parseChordName(ch.name);
  const power = !!p && p.quality === '5';
  // bei Powerchords die anderen Powerchords, sonst Verwandte und häufige Griffe
  const family = !p ? [] : power ? POWER_ORDER.map((r) => ROOTS[r] + '5') : ['', 'm', '7', 'm7', 'maj7', 'sus4'].map((q) => ROOTS[p.root] + q);
  const others = power ? family : family.concat(CHORDS.filter((c) => c.level <= 2 && family.indexOf(c.name) < 0).map((c) => c.name)).slice(0, 14);
  const hints = p && PAGE_QUALITIES.indexOf(p.quality) >= 0 ? relativeHints(`akkord/${encodeURIComponent(ch.name)}`, ch.name) : [];
  screen(
    root,
    { title: t('Akkord {chord}', { chord: ch.name }), back: link('akkorde') },
    h(
      'div',
      { class: 'chord-detail' },
      h('div', { class: 'card detail-card' }, h('div', { class: 'chord-name huge' }, ch.name), h('div', { class: 'say' }, CHORDS.indexOf(ch) >= 0 ? chordSay(ch) : chordLongName(ch.name, lang())), diagramBox, h('p', { class: 'small play-hint' }, t('Tipp eine Saite an oder wisch über alle.'))),
      h(
        'div',
        { class: 'detail-side' },
        h('p', { class: 'card desc' }, describeChord(ch)),
        h(
          'div',
          { class: 'row' },
          button(h('span', null, icon('sound'), ' ', t('Anhören')), () => {
            markOwnSound();
            strum(ch.name, 0, 0.45);
          }, ''),
          check,
        ),
        feedback,
        h('h2', null, t('Andere Akkorde')),
        h(
          'div',
          { class: 'chip-row' },
          ...others.map((c) => h('a', { class: `btn btn-chip${c === ch.name ? ' active' : ''}`, href: link(`akkord/${encodeURIComponent(c)}`) }, c)),
        ),
        power ? h('p', { class: 'card relative-hint' }, h('a', { href: link('powerchords') }, t('Alle Powerchords auf einen Blick'), ' ›')) : null,
        ...hints,
      ),
    ),
    ...(easy.length ? [easySection(ch.name, easy, lefty, checkButton)] : []),
  );
  return stopListening;
};

/** „Leichter greifen“: Varianten mit ehrlicher Beschriftung, abspielbar und prüfbar wie der Hauptgriff. */
function easySection(name: string, easy: EasyGrip[], lefty: boolean, checkButton: (grip: Chord, box: HTMLElement, feedback: HTMLElement, easy: boolean, label?: string) => HTMLElement): HTMLElement {
  return h(
    'section',
    { class: 'easy-grips' },
    h('div', { class: 'card easy-intro' }, h('h2', null, t('Leichter greifen')), h('p', null, t('Andere Wege zu {chord}: Manche sind leichter, manche ein Trick für schnelle Wechsel. Was anders klingt, steht immer dabei.', { chord: name }))),
    h(
      'div',
      { class: 'easy-grid' },
      ...easy.map((e) => {
        const box = h('div', { class: 'diagram-easy' }, playableChord(e.grip, { lefty }));
        const feedback = h('div', { class: 'feedback', 'aria-live': 'polite', hidden: true });
        return h(
          'div',
          { class: 'card easy-card' },
          h('h3', null, t(e.title)),
          h('p', { class: 'easy-tags' }, ...easyLabels(e).map((l) => h('span', { class: 'easy-tag' }, l))),
          box,
          h('p', null, t(e.text)),
          h('p', { class: 'small easy-when' }, t(e.when)),
          h(
            'div',
            { class: 'row' },
            button(
              h('span', null, icon('sound'), ' ', t('Anhören')),
              () => {
                markOwnSound();
                strum(e.grip, 0, 0.45);
              },
              '',
              { 'aria-label': t('{title} anhören', { title: t(e.title) }) },
            ),
            checkButton(e.grip, box, feedback, true, t('{title} prüfen lassen', { title: t(e.title) })),
          ),
          feedback,
        );
      }),
    ),
  );
}

export { chord };
