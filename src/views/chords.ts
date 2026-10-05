import { h, announce } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, button, ensureMic, praise, STRING_HINT, type View } from '../ui/screen.ts';
import { chordDiagram } from '../ui/chord-diagram.ts';
import { CHORDS, chord, describeChord } from '../music/chords.ts';
import { strum, successSound } from '../audio/engine.ts';
import { listenForChord, type ChordListener } from '../audio/listen.ts';
import { load, save, markPracticed } from '../store.ts';

const GROUPS = [
  { title: 'Die ersten Akkorde', level: 1 },
  { title: 'Für die meisten Lieder', level: 2 },
  { title: 'Für Fortgeschrittene', level: 3 },
  { title: 'Profi-Griffe', level: 4 },
];

export const chords: View = (root) => {
  const p = load();
  screen(
    root,
    { title: 'Akkorde', theme: 'teal' },
    ...GROUPS.map((g) =>
      h(
        'section',
        { class: 'chord-group' },
        h('h2', null, g.title),
        h(
          'div',
          { class: 'chord-grid' },
          ...CHORDS.filter((c) => c.level === g.level).map((c) =>
            h(
              'a',
              { class: 'chord-tile btn', href: `#/akkord/${encodeURIComponent(c.name)}`, 'aria-label': describeChord(c) },
              h('span', { class: 'chord-name' }, c.name, p.chordsChecked.includes(c.name) ? icon('check', 'icon tick') : null),
              chordDiagram(c, { lefty: p.settings.lefty, labels: false }),
            ),
          ),
        ),
      ),
    ),
  );
};

export const chordDetail: View = (root, param) => {
  const name = decodeURIComponent(param);
  const ch = CHORDS.find((c) => c.name === name);
  if (!ch) {
    location.hash = '#/akkorde';
    return;
  }
  const lefty = load().settings.lefty;
  let listener: ChordListener | null = null;
  let giveUp = 0;
  const diagramBox = h('div', { class: 'diagram-big' }, chordDiagram(ch, { lefty }));
  const feedback = h('div', { class: 'feedback', 'aria-live': 'polite' }, 'Greif den Akkord und tippe auf „Prüf mich!“.');
  const stopListening = () => {
    listener?.stop();
    listener = null;
    window.clearTimeout(giveUp);
  };
  const check = button(
    h('span', null, icon('mic'), ' Prüf mich!'),
    () => {
      stopListening();
      void ensureMic().then((ok) => {
        if (!ok) {
          feedback.textContent = 'Ohne Mikrofon kann ich nicht zuhören – vergleiche deinen Klang mit „Anhören“.';
          return;
        }
        feedback.className = 'feedback listening';
        feedback.textContent = 'Ich höre zu … schlag die Saiten an!';
        let streak = { s: -1, n: 0 };
        void listenForChord(ch.name, {
          onHit: () => {
            stopListening();
            successSound();
            feedback.className = 'feedback good';
            feedback.textContent = `${praise()} Das ist ein schönes ${ch.name}!`;
            announce(feedback.textContent);
            save((p) => {
              if (!p.chordsChecked.includes(ch.name)) p.chordsChecked.push(ch.name);
            });
            markPracticed();
            diagramBox.replaceChild(chordDiagram(ch, { lefty }), diagramBox.firstChild!);
          },
          onVerdict: (v) => {
            if (!v || v.ok || v.weakString < 0) return;
            streak = streak.s === v.weakString ? { s: v.weakString, n: streak.n + 1 } : { s: v.weakString, n: 1 };
            if (streak.n === 4) {
              feedback.className = 'feedback almost';
              feedback.textContent = `Fast! ${STRING_HINT[v.weakString]} Drück den Finger fest direkt hinter dem Bundstäbchen.`;
              diagramBox.replaceChild(chordDiagram(ch, { lefty, highlight: v.weakString }), diagramBox.firstChild!);
            }
          },
        }).then((l) => {
          listener = l;
          giveUp = window.setTimeout(() => {
            if (!listener) return;
            stopListening();
            if (feedback.className !== 'feedback good') {
              feedback.className = 'feedback almost';
              feedback.textContent = 'Noch nicht ganz – probier’s gleich nochmal. Jede Saite einzeln anzupfen hilft!';
            }
          }, 12000);
        }, () => undefined);
      });
    },
    'btn-primary',
  );
  const others = CHORDS.filter((c) => c.level <= Math.max(2, ch.level)).slice(0, 12);
  screen(
    root,
    { title: `Akkord ${ch.name}`, back: '#/akkorde', theme: 'teal' },
    h(
      'div',
      { class: 'chord-detail' },
      h('div', { class: 'card detail-card' }, h('div', { class: 'chord-name huge' }, ch.name), h('div', { class: 'say' }, ch.say), diagramBox),
      h(
        'div',
        { class: 'detail-side' },
        h('p', { class: 'card desc' }, describeChord(ch)),
        h(
          'div',
          { class: 'row' },
          button(h('span', null, icon('sound'), ' Anhören'), () => strum(ch.name, 0, 0.45), ''),
          check,
        ),
        feedback,
        h('h2', null, 'Andere Akkorde'),
        h(
          'div',
          { class: 'chip-row' },
          ...others.map((c) => h('a', { class: `btn btn-chip${c.name === ch.name ? ' active' : ''}`, href: `#/akkord/${encodeURIComponent(c.name)}` }, c.name)),
        ),
      ),
    ),
  );
  return stopListening;
};

export { chord };
