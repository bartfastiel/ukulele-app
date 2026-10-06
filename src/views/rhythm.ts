import { h, clear } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, button, keepAwake, type View } from '../ui/screen.ts';
import { audio, click, strum } from '../audio/engine.ts';

/** Schlagmuster je Achtel: D = abwärts, U = aufwärts, - = Pause (Hand bewegt sich trotzdem). */
const PATTERNS = [
  { name: 'Nur runter', meter: 4, steps: 'D-D-D-D-', say: 'runter, runter, runter, runter' },
  { name: 'Runter-rauf', meter: 4, steps: 'DUDUDUDU', say: 'runter-rauf, runter-rauf, runter-rauf, runter-rauf' },
  // „Insel-Schlag“ (Calypso), das Standardmuster vieler Ukulelenschulen
  { name: 'Runter, runter, rauf, rauf, runter, rauf', meter: 4, steps: 'D-DU-UDU', say: 'runter, runter, rauf, rauf, runter, rauf – zwischen den beiden „rauf“ schwingt die Hand runter, ohne zu treffen' },
  { name: 'Walzer', meter: 3, steps: 'D-D-D-', say: 'runter, runter, runter – im Dreiertakt' },
];
const TEMPOS = [
  { label: 'Langsam', bpm: 60 },
  { label: 'Mittel', bpm: 80 },
  { label: 'Schnell', bpm: 100 },
];
const CHORD_CHOICES = ['C', 'Am', 'F', 'G7'];

export const rhythm: View = (root) => {
  let pattern = PATTERNS[0];
  let bpm = 80;
  let chordName = 'C';
  let playStrum = true;
  let timer = 0;
  let raf = 0;
  let start = 0;
  let scheduled = 0;
  let running = false;
  let releaseWake: (() => void) | null = null;
  const arrows = h('div', { class: 'arrows', 'aria-hidden': 'true' });
  const sayLine = h('p', { class: 'say-line' });
  const playBtn = button('', () => (running ? stop() : go()), 'btn-primary btn-play');

  const drawArrows = () => {
    clear(arrows);
    sayLine.textContent = `Gesprochen: ${pattern.say}`;
    pattern.steps.split('').forEach((st, i) => {
      arrows.appendChild(
        h(
          'span',
          { class: `arrow ${st === 'D' ? 'down' : st === 'U' ? 'up' : 'rest'}` },
          h('span', { class: 'glyph' }, st === 'D' ? '↓' : st === 'U' ? '↑' : '·'),
          h('span', { class: 'count' }, i % 2 === 0 ? String(i / 2 + 1) : 'und'),
        ),
      );
    });
  };
  const label = () => {
    clear(playBtn);
    playBtn.appendChild(h('span', null, icon(running ? 'stop' : 'play'), h('span', { class: 'lbl' }, running ? 'Stopp' : 'Start')));
  };

  const go = () => {
    const ctx = audio();
    running = true;
    start = ctx.currentTime + 0.1;
    scheduled = 0;
    releaseWake = keepAwake();
    timer = window.setInterval(schedule, 25);
    schedule();
    raf = requestAnimationFrame(frame);
    label();
  };
  const stop = () => {
    running = false;
    window.clearInterval(timer);
    cancelAnimationFrame(raf);
    releaseWake?.();
    releaseWake = null;
    Array.prototype.forEach.call(arrows.children, (a: Element) => a.classList.remove('on'));
    label();
  };
  const stepDur = () => 60 / bpm / 2;
  const schedule = () => {
    const horizon = audio().currentTime + 0.15;
    const steps = pattern.steps;
    while (start + scheduled * stepDur() < horizon) {
      const i = scheduled % steps.length;
      const t = start + scheduled * stepDur();
      if (i % 2 === 0) click(t, i === 0, 0.4);
      if (playStrum && steps[i] !== '-') strum(chordName, t, 0.28, steps[i] === 'U');
      scheduled++;
    }
  };
  const frame = () => {
    const pos = Math.floor((audio().currentTime - start) / stepDur());
    const i = ((pos % pattern.steps.length) + pattern.steps.length) % pattern.steps.length;
    Array.prototype.forEach.call(arrows.children, (a: Element, j: number) => a.classList.toggle('on', j === i && pos >= 0));
    raf = requestAnimationFrame(frame);
  };
  const seg = <T,>(name: string, items: T[], text: (t: T) => string, isOn: (t: T) => boolean, pick: (t: T) => void) =>
    h(
      'div',
      { class: 'seg seg-wrap', role: 'group', 'aria-label': name },
      ...items.map((it) => {
        const b = button(text(it), () => {
          pick(it);
          Array.prototype.forEach.call(b.parentNode!.children, (c: Element) => c.setAttribute('aria-pressed', 'false'));
          b.setAttribute('aria-pressed', 'true');
          if (running) {
            stop();
            go();
          }
        }, 'btn-seg', { 'aria-pressed': String(isOn(it)) });
        return b;
      }),
    );

  drawArrows();
  label();
  screen(
    root,
    { title: 'Rhythmus', theme: 'teal' },
    h('div', { class: 'card rhythm-card' }, arrows, sayLine, h('p', { class: 'small' }, '↓ = runter streichen (Daumen oder Zeigefinger), ↑ = hoch. Die Hand schwingt immer weiter, auch bei „·“.')),
    h(
      'div',
      { class: 'controls' },
      playBtn,
      h('h2', null, 'Muster'),
      seg('Muster', PATTERNS, (p) => p.name, (p) => p === pattern, (p) => {
        pattern = p;
        drawArrows();
      }),
      h('h2', null, 'Tempo'),
      seg('Tempo', TEMPOS, (t) => `${t.label} (${t.bpm})`, (t) => t.bpm === bpm, (t) => (bpm = t.bpm)),
      h('h2', null, 'Akkord'),
      seg('Akkord', [...CHORD_CHOICES, 'nur Klick'], (c) => c, (c) => c === chordName, (c) => {
        playStrum = c !== 'nur Klick';
        if (playStrum) chordName = c;
      }),
    ),
  );
  return stop;
};
