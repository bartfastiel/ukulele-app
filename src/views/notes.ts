import { h, clear, announce } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, button, ensureMic, keepAwake, praise, type View } from '../ui/screen.ts';
import { chordDiagram } from '../ui/chord-diagram.ts';
import { fretboard, type Mark } from '../ui/fretboard.ts';
import { ROOTS, chord, describeChord, parseChordName } from '../music/chords.ts';
import { STRINGS, freqToMidi, pitchClass, stringMidi } from '../music/notes.ts';
import { instrument } from '../music/instrument.ts';
import { openMic } from '../audio/mic.ts';
import { detectPitchIn } from '../audio/pitch.ts';
import { pluck, successSound } from '../audio/engine.ts';
import { hearingOwnSound, markOwnSound } from '../audio/own-sound.ts';
import { playableChord } from '../ui/chord-play.ts';
import { listenForChord, type ChordListener } from '../audio/listen.ts';
import { load, save, markPracticed } from '../store.ts';
import { noteText, ordinal, t, tk } from '../i18n.ts';
import { link, go } from '../site/nav.ts';

/**
 * E-Bass statt Akkorden: Töne auf dem Hals. Zuerst die Töne, die in fast jedem Lied als Grundton vorkommen, dann die
 * übrigen ohne Vorzeichen, dann die mit # und b.
 */
export const NOTE_GROUPS = [
  { title: tk('Die ersten Töne'), names: ['E', 'A', 'D', 'G'] },
  { title: tk('Ohne # und b'), names: ['C', 'F', 'B'] },
  { title: tk('Mit # und b'), names: ['C#', 'Eb', 'F#', 'Ab', 'Bb'] },
];

/** Tippen auf den Hals spielt den Ton. */
const tap = (p: { string: number; fret: number }) => {
  markOwnSound();
  pluck(stringMidi(p.string, p.fret), 0, 0.8);
  return { move: () => undefined, end: () => undefined };
};

/** Bis zu welchem Bund die Übersicht reicht: die erste Lage und der 5. Bund, an dem die nächste Saite beginnt. */
const OVERVIEW_FRETS = 5;

export const notesView: View = (root) => {
  const p = load();
  const marks: Mark[] = [];
  STRINGS.forEach((_, s) => {
    for (let f = 0; f <= OVERVIEW_FRETS; f++) {
      const name = ROOTS[pitchClass(stringMidi(s, f))];
      // Töne ohne Vorzeichen golden mit Namen, die übrigen als kleine Punkte
      if (name.length === 1) marks.push({ string: s, fret: f, kind: 'chord', label: noteText(name) });
      else marks.push({ string: s, fret: f, kind: 'scale' });
    }
  });
  screen(
    root,
    { title: t('Töne'), theme: 'teal' },
    h(
      'section',
      { class: 'card notes-neck' },
      h('h2', null, t('Die Töne in der ersten Lage')),
      fretboard(marks, OVERVIEW_FRETS, 1, tap, p.settings.lefty),
      h('p', { class: 'small' }, t('Tipp auf einen Punkt, dann hörst du den Ton. Die kleinen Punkte sind die Töne mit # und b. Ab dem 5. Bund klingt jede Saite wie die nächste leer.')),
    ),
    ...NOTE_GROUPS.map((g) =>
      h(
        'section',
        { class: 'chord-group' },
        h('h2', null, t(g.title)),
        h(
          'div',
          { class: 'chord-grid' },
          ...g.names.map((n) => {
            const ch = chord(n);
            return h(
              'a',
              { class: 'chord-tile btn', href: link(`akkord/${encodeURIComponent(n)}`), 'aria-label': describeChord(ch) },
              h('span', { class: 'chord-name' }, noteText(n), p.chordsChecked.includes(n) ? icon('check', 'icon tick') : null),
              chordDiagram(ch, { lefty: p.settings.lefty, labels: false }),
            );
          }),
        ),
      ),
    ),
  );
};

/** Saite und Bund als Satz: „A-Saite im 3. Bund“, „leere E-Saite“. */
function where(string: number, fret: number): string {
  return fret ? t('{s}-Saite im {fret} Bund', { s: STRINGS[string].name, fret: ordinal(fret) }) : t('leere {s}-Saite', { s: STRINGS[string].name });
}

export const noteDetail: View = (root, param) => {
  const parsed = parseChordName(decodeURIComponent(param));
  if (!parsed) {
    go('akkorde');
    return;
  }
  const name = ROOTS[parsed.root];
  const ch = chord(name);
  const shown = noteText(name);
  const lefty = load().settings.lefty;
  let listener: ChordListener | null = null;
  let giveUp = 0;
  const diagramBox = h('div', { class: 'diagram-big' }, playableChord(ch, { lefty, fifth: true }));
  const feedback = h('div', { class: 'feedback', 'aria-live': 'polite' }, t('Greif den Ton und tippe auf „Prüf mich!“.'));
  const stopListening = () => {
    listener?.stop();
    listener = null;
    window.clearTimeout(giveUp);
  };
  const s = ch.frets.findIndex((f) => f >= 0);
  const rootMidi = stringMidi(s, ch.frets[s]);
  const check = button(
    h('span', null, icon('mic'), ' ', t('Prüf mich!')),
    () => {
      stopListening();
      void ensureMic().then((ok) => {
        if (!ok) {
          feedback.textContent = t('Ohne Mikrofon kann ich nicht zuhören – vergleiche deinen Klang mit „Anhören“.');
          return;
        }
        feedback.className = 'feedback listening';
        feedback.textContent = t('Ich höre zu … zupf die Saite!');
        void listenForChord(name, {
          onHit: () => {
            stopListening();
            successSound();
            feedback.className = 'feedback good';
            feedback.textContent = `${praise()} ${t('Das war ein sauberes {note}!', { note: shown })}`;
            announce(feedback.textContent);
            save((pr) => {
              if (!pr.chordsChecked.includes(name)) pr.chordsChecked.push(name);
            });
            markPracticed();
          },
        }).then((l) => {
          listener = l;
          giveUp = window.setTimeout(() => {
            if (!listener) return;
            stopListening();
            if (feedback.className !== 'feedback good') {
              feedback.className = 'feedback almost';
              feedback.textContent = t('Noch nicht ganz – zupf die Saite kräftig und lass sie ausklingen.');
            }
          }, 12000);
        }, () => undefined);
      });
    },
    'btn-primary',
  );
  // alle Stellen bis zum 12. Bund – in jeder Oktave
  const spots: { string: number; fret: number }[] = [];
  STRINGS.forEach((_, i) => {
    for (let f = 0; f <= 12; f++) if (pitchClass(stringMidi(i, f)) === parsed.root) spots.push({ string: i, fret: f });
  });
  const marks: Mark[] = spots.map((x) => ({ string: x.string, fret: x.fret, kind: x.string === s && x.fret === ch.frets[s] ? 'now' : 'chord', label: String(x.fret) }));
  const fifth = ch.fifth;
  screen(
    root,
    { title: t('Ton {note}', { note: shown }), back: link('akkorde'), theme: 'teal' },
    h(
      'div',
      { class: 'chord-detail' },
      h('div', { class: 'card detail-card' }, h('div', { class: 'chord-name huge' }, shown), h('div', { class: 'say' }, where(s, ch.frets[s])), diagramBox),
      h(
        'div',
        { class: 'detail-side' },
        h('p', { class: 'card desc' }, describeChord(ch)),
        fifth
          ? h(
              'p',
              { class: 'card desc' },
              t('Die Quinte {note} (Perlmutt-Punkt mit der 5): {where} – eine Saite höher, zwei Bünde weiter. Grundton und Quinte im Wechsel: Das ist die einfachste Basslinie.', {
                note: noteText(ROOTS[(parsed.root + 7) % 12]),
                where: where(fifth.string, fifth.fret),
              }),
            )
          : null,
        h('div', { class: 'row' }, button(h('span', null, icon('sound'), ' ', t('Anhören')), () => {
          markOwnSound();
          pluck(rootMidi, 0, 0.8);
        }, ''), check),
        feedback,
      ),
    ),
    h(
      'section',
      { class: 'card notes-neck' },
      h('h2', null, t('{note} überall auf dem Hals', { note: shown })),
      fretboard(marks, 12, 1, tap, lefty),
      h('p', { class: 'small' }, spots.map((x) => where(x.string, x.fret)).join(' · ')),
    ),
    h('h2', null, t('Andere Töne')),
    h(
      'div',
      { class: 'chip-row' },
      ...ROOTS.map((r) => h('a', { class: `btn btn-chip${r === name ? ' active' : ''}`, href: link(`akkord/${encodeURIComponent(r)}`) }, noteText(r))),
    ),
  );
  return stopListening;
};

/** Ton-Detektiv (E-Bass): einen Ton spielen – die App sagt, wie er heißt und wo er überall auf dem Hals liegt. */
export const noteDetective: View = (root) => {
  const lefty = load().settings.lefty;
  let timer = 0;
  let releaseWake: (() => void) | null = null;
  const result = h('div', { class: 'card det-result', 'aria-live': 'polite' });
  const status = h('div', { class: 'feedback' }, t('Tippe auf „Zuhören“ und zupf einen Ton.'));

  const showIdle = (text: string) => {
    clear(result);
    result.appendChild(h('div', { class: 'det-wait' }, h('div', { class: 'det-glass' }, icon('detective', 'icon big')), h('p', null, text)));
  };

  const showNote = (midi: number) => {
    clear(result);
    const pc = pitchClass(midi);
    const name = noteText(ROOTS[pc]);
    const marks: Mark[] = [];
    STRINGS.forEach((_, i) => {
      for (let f = 0; f <= 12; f++) {
        const m = stringMidi(i, f);
        if (pitchClass(m) === pc) marks.push({ string: i, fret: f, kind: m === midi ? 'now' : 'chord', label: String(f) });
      }
    });
    const exact = marks.filter((m) => m.kind === 'now');
    result.appendChild(
      h(
        'div',
        { class: 'det-note' },
        h('div', { class: 'card-label' }, t('Das klingt wie')),
        h('div', { class: 'chord-name huge' }, name),
        h('p', null, exact.length ? t('Genau diese Tonhöhe liegt beim goldenen Punkt, an den anderen Stellen klingt derselbe Ton eine Oktave höher oder tiefer.') : t('Diesen Ton findest du hier:')),
        fretboard(marks, 12, 1, tap, lefty),
        h('p', { class: 'small' }, (exact.length ? exact : marks).map((m) => where(m.string, m.fret)).join(' · ')),
        h('a', { class: 'btn btn-chip', href: link(`akkord/${encodeURIComponent(ROOTS[pc])}`) }, t('Mehr zum Ton {note}', { note: name })),
      ),
    );
    announce(t('Ton {note}', { note: name }));
  };

  const start = () => {
    void ensureMic().then(async (ok) => {
      if (!ok) {
        status.textContent = t('Der Detektiv braucht das Mikrofon, um zu hören, was du spielst.');
        return;
      }
      listenBtn.disabled = true;
      releaseWake = keepAwake();
      status.textContent = t('Ich höre zu …');
      const mic = await openMic();
      const buf = new Float32Array(4096);
      const recent: number[] = [];
      let shown = -1;
      let quietSince = 0;
      timer = window.setInterval(() => {
        mic.timeData(buf);
        // der eben angetippte Ton aus dem Lautsprecher zählt nicht
        const p = hearingOwnSound() ? null : detectPitchIn(buf, mic.sampleRate, instrument().tuner.minHz, 420);
        const midi = p && p.clarity > 0.9 ? Math.round(freqToMidi(p.freq)) : -1;
        if (midi < 0 && !quietSince) quietSince = performance.now();
        if (midi >= 0) quietSince = 0;
        recent.push(midi);
        if (recent.length > 5) recent.shift();
        // erst zeigen, wenn 3 der letzten 5 Messungen dasselbe sagen – sonst flackert die Anzeige
        if (midi >= 0 && midi !== shown && recent.filter((m) => m === midi).length >= 3) {
          shown = midi;
          showNote(midi);
          status.textContent = t('Ich höre zu … spiel gern noch einen anderen Ton!');
        }
        if (shown < 0 && quietSince && performance.now() - quietSince > 4000) showIdle(t('Zupf eine Saite – leer oder gegriffen. Ich verrate dir, welcher Ton es ist.'));
      }, 80);
    });
  };

  const listenBtn = button(h('span', null, icon('mic'), ' ', t('Zuhören')), start, 'btn-primary btn-play');
  showIdle(t('Zupf eine Saite – leer oder gegriffen. Ich verrate dir, welcher Ton es ist.'));
  screen(
    root,
    { title: t('Ton-Detektiv'), theme: 'cherry' },
    result,
    h('div', { class: 'row' }, listenBtn),
    status,
    h('p', { class: 'card small' }, t('Tipp: Zupf kräftig und lass den Ton klingen. Immer nur eine Saite – dann hört der Detektiv am besten.')),
  );
  return () => {
    window.clearInterval(timer);
    releaseWake?.();
  };
};

