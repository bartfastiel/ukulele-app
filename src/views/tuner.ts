import { h, s, announce } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, button, ensureMic, keepAwake, type View } from '../ui/screen.ts';
import { STRINGS, midiToFreq } from '../music/notes.ts';
import { detectPitchIn, cents } from '../audio/pitch.ts';
import { openMic } from '../audio/mic.ts';
import { pluckCourse, successSound } from '../audio/engine.ts';
import { save } from '../store.ts';
import { TuningCoach, tipText } from '../audio/tuning-coach.ts';
import { TWELVE_MAX_HZ, instrument, twelveString } from '../music/instrument.ts';
import { countWord, t } from '../i18n.ts';
import { tuningChooser, variantChooser } from '../ui/tuning.ts';

export const tuner: View = (root) => {
  let raf = 0;
  let releaseWake: (() => void) | null = null;
  const tr = instrument().tuner;
  const range = { minHz: tr.minHz, maxHz: twelveString() ? Math.max(tr.maxHz, TWELVE_MAX_HZ) : tr.maxHz };
  const done = STRINGS.map(() => false);
  const names = STRINGS.map((st) => st.name);
  // 12-saitige Gitarre: auch die Oktavsaiten der vier tiefen Chöre erkennen
  const targets = STRINGS.map((st, i) => ({ string: i, midi: st.midi, octave: false }));
  if (twelveString()) STRINGS.forEach((st, i) => i < 4 && targets.push({ string: i, midi: st.midi + 12, octave: true }));
  // E-Bass: Handy-Mikrofone hören den tiefen Grundton kaum und melden oft die Oktave darüber. Die vier Leersaiten
  // heißen alle verschieden (E A D G), also gehört auch die Oktave eindeutig zu ihrer Saite.
  if (instrument().notesOnly) STRINGS.forEach((st, i) => targets.push({ string: i, midi: st.midi + 12, octave: false }));
  let inTuneSince = 0;
  let lastString = -1;
  let smooth = 0;

  const needle = s('line', { x1: 100, y1: 110, x2: 100, y2: 22, class: 'needle' });
  const gauge = s(
    'svg',
    { viewBox: '0 0 200 125', class: 'gauge', 'aria-hidden': 'true' },
    s('path', { d: 'M20 110 A80 80 0 0 1 180 110', class: 'gauge-arc' }),
    s('path', { d: 'M86 31 A80 80 0 0 1 114 31', class: 'gauge-ok' }),
    ...[-50, -25, 0, 25, 50].map((c) => {
      const a = ((c / 50) * 70 * Math.PI) / 180;
      return s('line', {
        x1: 100 + Math.sin(a) * 72,
        y1: 110 - Math.cos(a) * 72,
        x2: 100 + Math.sin(a) * 84,
        y2: 110 - Math.cos(a) * 84,
        class: 'tick',
      });
    }),
    needle,
    s('circle', { cx: 100, cy: 110, r: 7, class: 'hub' }),
  );
  const note = h('div', { class: 'tuner-note' }, '–');
  const advice = h('div', { class: 'feedback', 'aria-live': 'polite' }, t('Tippe auf „Zuhören“ und zupf eine Saite.'));
  const tipBox = h('div', { class: 'feedback tip', 'aria-live': 'polite', hidden: true });
  const coach = new TuningCoach();
  let tipString = -1;
  const showTip = (text: string | null, stringIdx = -1) => {
    tipBox.hidden = !text;
    tipBox.textContent = text ? t('Tipp: {text}', { text }) : '';
    tipString = stringIdx;
  };
  const stringBtns = STRINGS.map((st) =>
    button(
      h('span', null, h('span', { class: 'sname' }, st.name, st.hint ? h('small', { class: 'shint' }, t(st.hint)) : null), icon('check', 'icon tick')),
      () => pluckCourse(st.midi, STRINGS.indexOf(st), 0, 0.7),
      'btn-string',
      { 'aria-label': t('{s}-Saite anhören', { s: st.name }) },
    ),
  );
  stringBtns.forEach((b, i) => b.classList.toggle('ok', done[i]));

  const loop = (mic: Awaited<ReturnType<typeof openMic>>) => {
    const buf = new Float32Array(4096);
    const tick = () => {
      mic.timeData(buf);
      const now = performance.now();
      const p = detectPitchIn(buf, mic.sampleRate, range.minHz, range.maxHz);
      if (!p || p.clarity <= 0.85) {
        const tip = coach.silence(now);
        if (tip) showTip(tipText(tip, STRINGS[tip.string].name), tip.string);
      }
      if (p && p.clarity > 0.85) {
        let best = 0;
        let bestC = Infinity;
        let octave = false;
        targets.forEach((x) => {
          const c = cents(p.freq, midiToFreq(x.midi));
          if (Math.abs(c) < Math.abs(bestC)) {
            bestC = c;
            best = x.string;
            octave = x.octave;
          }
        });
        if (Math.abs(bestC) < 400) {
          let level = 0;
          for (let i = 0; i < buf.length; i++) level += buf[i] * buf[i];
          const tip = coach.reading(best, bestC, Math.sqrt(level / buf.length), now);
          if (tip) showTip(tipText(tip, STRINGS[tip.string].name), tip.string);
          if (best !== lastString) smooth = bestC;
          smooth = smooth * 0.6 + bestC * 0.4;
          lastString = best;
          const shown = Math.max(-50, Math.min(50, smooth));
          needle.setAttribute('transform', `rotate(${(shown / 50) * 70} 100 110)`);
          const hint = STRINGS[best].hint;
          const extra = octave ? t('Oktavsaite') : hint ? t(hint) : '';
          note.textContent = extra ? `${STRINGS[best].name} (${extra})` : STRINGS[best].name;
          stringBtns.forEach((b, i) => b.classList.toggle('active', i === best));
          const ok = Math.abs(smooth) < 6;
          gauge.classList.toggle('in-tune', ok);
          if (ok) {
            advice.textContent = t('{s}-Saite: genau richtig!', { s: STRINGS[best].name });
            if (tipString === best) showTip(null);
            if (!inTuneSince) inTuneSince = performance.now();
            if (performance.now() - inTuneSince > 700 && !done[best]) {
              done[best] = true;
              stringBtns[best].classList.add('ok');
              successSound();
              announce(t('{s}-Saite gestimmt', { s: STRINGS[best].name }));
              const count = done.filter(Boolean).length;
              save((pr) => (pr.tunedStrings = Math.max(pr.tunedStrings, count)));
              if (count === STRINGS.length) advice.textContent = t('Alle {n} Saiten gestimmt – los geht’s!', { n: countWord(STRINGS.length) });
            }
          } else {
            inTuneSince = 0;
            advice.textContent =
              smooth < 0
                ? t('{s}-Saite ist zu tief – Wirbel etwas fester drehen.', { s: STRINGS[best].name })
                : t('{s}-Saite ist zu hoch – Wirbel etwas lockern.', { s: STRINGS[best].name });
          }
        } else if (Math.abs(bestC) >= 400)
          advice.textContent = t('Das klingt weit weg von {notes} – zupf eine einzelne Saite.', {
            notes: t('{a} oder {b}', { a: names.slice(0, -1).join(', '), b: names[names.length - 1] }),
          });
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
  };

  const listen = button(
    h('span', null, icon('mic'), ' ', t('Zuhören')),
    () => {
      void ensureMic().then(async (ok) => {
        if (!ok) {
          advice.textContent = t('Ohne Mikrofon: Tippe auf eine Saite unten, hör genau hin und dreh, bis deine Saite gleich klingt.');
          return;
        }
        listen.disabled = true;
        advice.textContent = t('Zupf eine Saite …');
        releaseWake = keepAwake();
        loop(await openMic());
      });
    },
    'btn-primary',
  );

  screen(
    root,
    { title: t('Stimmen'), theme: 'pearl' },
    h(
      'div',
      { class: 'tuner' },
      h('div', { class: 'card tuner-card' }, gauge, note, advice, tipBox),
      h(
        'div',
        { class: 'tuner-side' },
        listen,
        h('p', { class: 'small' }, t('Tipp auf eine Saite spielt ihren Ton vor. Von oben nach unten: {strings}.', { strings: names.join(' – ') })),
        h('div', { class: `string-row strings-${STRINGS.length}` }, ...stringBtns),
        tuningChooser(),
        variantChooser(),
      ),
    ),
  );
  return () => {
    cancelAnimationFrame(raf);
    releaseWake?.();
  };
};
