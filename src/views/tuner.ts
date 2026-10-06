import { h, s, announce } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, button, ensureMic, keepAwake, type View } from '../ui/screen.ts';
import { STRINGS, midiToFreq } from '../music/notes.ts';
import { detectPitch, cents } from '../audio/pitch.ts';
import { openMic } from '../audio/mic.ts';
import { pluck, successSound } from '../audio/engine.ts';
import { save } from '../store.ts';
import { TuningCoach, tipText } from '../audio/tuning-coach.ts';

export const tuner: View = (root) => {
  let raf = 0;
  let releaseWake: (() => void) | null = null;
  const done = [false, false, false, false];
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
  const advice = h('div', { class: 'feedback', 'aria-live': 'polite' }, 'Tippe auf „Zuhören“ und zupf eine Saite.');
  const tipBox = h('div', { class: 'feedback tip', 'aria-live': 'polite', hidden: true });
  const coach = new TuningCoach();
  let tipString = -1;
  const showTip = (text: string | null, stringIdx = -1) => {
    tipBox.hidden = !text;
    tipBox.textContent = text ? `Tipp: ${text}` : '';
    tipString = stringIdx;
  };
  const stringBtns = STRINGS.map((st) =>
    button(
      h('span', null, h('span', { class: 'sname' }, st.name), icon('check', 'icon tick')),
      () => pluck(st.midi, 0, 0.7),
      'btn-string',
      { 'aria-label': `${st.name}-Saite anhören` },
    ),
  );
  stringBtns.forEach((b, i) => b.classList.toggle('ok', done[i]));

  const loop = (mic: Awaited<ReturnType<typeof openMic>>) => {
    const buf = new Float32Array(4096);
    const tick = () => {
      mic.timeData(buf);
      const t = performance.now();
      const p = detectPitch(buf, mic.sampleRate, 200, 900);
      if (!p || p.clarity <= 0.85) {
        const tip = coach.silence(t);
        if (tip) showTip(tipText(tip, STRINGS[tip.string].name), tip.string);
      }
      if (p && p.clarity > 0.85) {
        let best = 0;
        let bestC = Infinity;
        STRINGS.forEach((st, i) => {
          const c = cents(p.freq, midiToFreq(st.midi));
          if (Math.abs(c) < Math.abs(bestC)) {
            bestC = c;
            best = i;
          }
        });
        if (Math.abs(bestC) < 400) {
          let level = 0;
          for (let i = 0; i < buf.length; i++) level += buf[i] * buf[i];
          const tip = coach.reading(best, bestC, Math.sqrt(level / buf.length), t);
          if (tip) showTip(tipText(tip, STRINGS[tip.string].name), tip.string);
          if (best !== lastString) smooth = bestC;
          smooth = smooth * 0.6 + bestC * 0.4;
          lastString = best;
          const shown = Math.max(-50, Math.min(50, smooth));
          needle.setAttribute('transform', `rotate(${(shown / 50) * 70} 100 110)`);
          note.textContent = STRINGS[best].name;
          stringBtns.forEach((b, i) => b.classList.toggle('active', i === best));
          const ok = Math.abs(smooth) < 6;
          gauge.classList.toggle('in-tune', ok);
          if (ok) {
            advice.textContent = `${STRINGS[best].name}-Saite: genau richtig!`;
            if (tipString === best) showTip(null);
            if (!inTuneSince) inTuneSince = performance.now();
            if (performance.now() - inTuneSince > 700 && !done[best]) {
              done[best] = true;
              stringBtns[best].classList.add('ok');
              successSound();
              announce(`${STRINGS[best].name}-Saite gestimmt`);
              const count = done.filter(Boolean).length;
              save((pr) => (pr.tunedStrings = Math.max(pr.tunedStrings, count)));
              if (count === 4) advice.textContent = 'Alle vier Saiten gestimmt – los geht’s!';
            }
          } else {
            inTuneSince = 0;
            advice.textContent =
              smooth < 0
                ? `${STRINGS[best].name}-Saite ist zu tief – Wirbel etwas fester drehen.`
                : `${STRINGS[best].name}-Saite ist zu hoch – Wirbel etwas lockern.`;
          }
        } else if (Math.abs(bestC) >= 400) advice.textContent = 'Das klingt weit weg von G, C, E oder A – zupf eine einzelne Saite.';
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
  };

  const listen = button(
    h('span', null, icon('mic'), ' Zuhören'),
    () => {
      void ensureMic().then(async (ok) => {
        if (!ok) {
          advice.textContent = 'Ohne Mikrofon: Tippe auf eine Saite unten, hör genau hin und dreh, bis deine Saite gleich klingt.';
          return;
        }
        listen.disabled = true;
        advice.textContent = 'Zupf eine Saite …';
        releaseWake = keepAwake();
        loop(await openMic());
      });
    },
    'btn-primary',
  );

  screen(
    root,
    { title: 'Stimmen', theme: 'pearl' },
    h(
      'div',
      { class: 'tuner' },
      h('div', { class: 'card tuner-card' }, gauge, note, advice, tipBox),
      h(
        'div',
        { class: 'tuner-side' },
        listen,
        h('p', { class: 'small' }, 'Tipp auf eine Saite spielt ihren Ton vor. Von oben nach unten: G – C – E – A.'),
        h('div', { class: 'string-row' }, ...stringBtns),
      ),
    ),
  );
  return () => {
    cancelAnimationFrame(raf);
    releaseWake?.();
  };
};
