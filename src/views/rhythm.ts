import { h, clear } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, button, keepAwake, type View } from '../ui/screen.ts';
import { audio, click, pluck, pluckString, strum } from '../audio/engine.ts';
import { bassPosition } from '../music/bassline.ts';
import { fretboard, type Mark } from '../ui/fretboard.ts';
import { STRINGS, stringMidi } from '../music/notes.ts';
import { instrument } from '../music/instrument.ts';
import { load } from '../store.ts';
import { noteText, t, tk } from '../i18n.ts';

/** Ton der Basslinie: Grundton, Quinte oder Oktave des gewählten Tons. */
function bassMidi(name: string, step: string): number {
  const root = bassPosition(name, false).midi;
  return step === 'F' ? bassPosition(name, true).midi : step === 'O' ? root + 12 : root;
}

/** Wo Grundton (1), Quinte (5) und Oktave (8) in der ersten Lage liegen. */
function bassMarks(name: string): Mark[] {
  const root = bassPosition(name, false);
  const fifth = bassPosition(name, true);
  const marks: Mark[] = [{ string: root.string, fret: root.fret, kind: 'now', label: '1' }];
  if (fifth.midi !== root.midi) marks.push({ string: fifth.string, fret: fifth.fret, kind: 'chord', label: '5' });
  for (let s = root.string + 1; s < STRINGS.length; s++) {
    const f = root.midi + 12 - stringMidi(s, 0);
    if (f >= 0 && f <= 5) {
      marks.push({ string: s, fret: f, kind: 'chord', label: '8' });
      break;
    }
  }
  return marks;
}

/**
 * Schlagmuster je Achtel: D = abwärts, U = aufwärts, - = Pause (Hand bewegt sich trotzdem).
 * sub = Achtel je gezähltem Schlag (2 bei x/4, 3 beim schwingenden 6/8).
 * Zupfmuster (roll): T = Daumen, I = Zeigefinger, M = Mittelfinger; welche Saite, steht beim Instrument.
 */
interface Pattern {
  name: string;
  meter: string;
  steps: string;
  sub: number;
  say: string;
  roll?: boolean;
  /** E-Bass: R = Grundton, F = Quinte, O = Oktave, - = Pause (der Ton klingt weiter). */
  bass?: boolean;
}
const PATTERNS: Pattern[] = [
  { name: tk('Nur runter'), meter: '4/4', steps: 'D-D-D-D-', sub: 2, say: tk('runter, runter, runter, runter') },
  { name: tk('Runter-rauf'), meter: '4/4', steps: 'DUDUDUDU', sub: 2, say: tk('runter-rauf, runter-rauf, runter-rauf, runter-rauf') },
  // „Insel-Schlag“ (Calypso), das Standardmuster vieler Ukulelenschulen
  { name: tk('Runter, runter, rauf, rauf, runter, rauf'), meter: '4/4', steps: 'D-DU-UDU', sub: 2, say: tk('runter, runter, rauf, rauf, runter, rauf – zwischen den beiden „rauf“ schwingt die Hand runter, ohne zu treffen') },
  { name: tk('Marsch (2/4)'), meter: '2/4', steps: 'D-DU', sub: 2, say: tk('runter, runter-rauf – im Zweiertakt') },
  { name: tk('Walzer (3/4)'), meter: '3/4', steps: 'D-D-D-', sub: 2, say: tk('runter, runter, runter – im Dreiertakt') },
  { name: tk('Walzer mit rauf (3/4)'), meter: '3/4', steps: 'D-DUDU', sub: 2, say: tk('runter, runter-rauf, runter-rauf') },
  { name: tk('Schaukeln (6/8)'), meter: '6/8', steps: 'D-UD-U', sub: 3, say: tk('runter … rauf, runter … rauf – schaukelnd, zwei große Schläge mit je drei Achteln') },
];
const BASS_PATTERNS: Pattern[] = [
  { name: tk('Grundton auf der Eins'), meter: '4/4', steps: 'R-------', sub: 2, say: tk('eins – zwei – drei – vier: nur auf der Eins zupfen und klingen lassen'), bass: true },
  { name: tk('Grundton auf 1 und 3'), meter: '4/4', steps: 'R---R---', sub: 2, say: tk('eins, zwei, drei, vier – auf eins und drei zupfen'), bass: true },
  { name: tk('Grundton und Quinte'), meter: '4/4', steps: 'R---F---', sub: 2, say: tk('Grundton auf eins, Quinte auf drei'), bass: true },
  { name: tk('Auf jeden Schlag'), meter: '4/4', steps: 'R-R-R-R-', sub: 2, say: tk('eins, zwei, drei, vier – gleichmäßig wie Schritte'), bass: true },
  { name: tk('Oktave'), meter: '4/4', steps: 'R-O-R-O-', sub: 2, say: tk('tief, hoch, tief, hoch – Grundton und Oktave im Wechsel'), bass: true },
  { name: tk('Rock-Achtel'), meter: '4/4', steps: 'RRRRRRRR', sub: 2, say: tk('eins und zwei und drei und vier und – gleichmäßig wie ein Motor'), bass: true },
  { name: tk('Marsch (2/4)'), meter: '2/4', steps: 'R-F-', sub: 2, say: tk('Grundton, Quinte – im Zweiertakt'), bass: true },
  { name: tk('Walzer (3/4)'), meter: '3/4', steps: 'R-----', sub: 2, say: tk('Grundton auf eins, dann klingen lassen – zwei, drei'), bass: true },
  { name: tk('Schaukeln (6/8)'), meter: '6/8', steps: 'R--F--', sub: 3, say: tk('Grundton … Quinte – schaukelnd, zwei große Schläge mit je drei Achteln'), bass: true },
];
/** Ziffer über dem Ton: 1 = Grundton, 5 = Quinte, 8 = Oktave. */
const BASS_GLYPH: Record<string, string> = { R: '1', F: '5', O: '8' };
const TEMPOS = [
  { label: tk('Langsam'), bpm: 60 },
  { label: tk('Mittel'), bpm: 80 },
  { label: tk('Schnell'), bpm: 100 },
];
const MIN_BPM = 40;
const MAX_BPM = 200;
/** Erster Buchstabe des Fingers in der gewählten Sprache: Daumen → D, thumb → T, pouce → P. */
const FINGER_WORD: Record<string, string> = { T: tk('Daumen'), I: tk('Zeigefinger'), M: tk('Mittelfinger') };

export const rhythm: View = (root) => {
  const inst = instrument();
  const roll = inst.roll;
  const patterns = inst.notesOnly
    ? BASS_PATTERNS
    : roll
    ? PATTERNS.concat([
        {
          name: tk('Banjo-Roll: Daumen – Zeige – Mittel'),
          meter: '4/4',
          steps: roll.fingers,
          sub: 2,
          say: tk('Daumen, Zeige, Mittel, Daumen, Zeige, Mittel, Daumen, Mittel – gleichmäßig wie ein Uhrwerk'),
          roll: true,
        },
      ])
    : PATTERNS;
  const CHORD_CHOICES = inst.rhythmChords;
  let pattern = patterns[0];
  let bpm = 80;
  let chordName = CHORD_CHOICES[0];
  let playStrum = true;
  let accent = true;
  let taps: number[] = [];
  let timer = 0;
  let raf = 0;
  let start = 0;
  let scheduled = 0;
  let running = false;
  let releaseWake: (() => void) | null = null;
  const arrows = h('div', { class: 'arrows', 'aria-hidden': 'true' });
  const sayLine = h('p', { class: 'say-line' });
  const playBtn = button('', () => (running ? stop() : go()), 'btn-primary btn-play');

  const explain = h('p', { class: 'small' });
  const drawArrows = () => {
    clear(arrows);
    explain.textContent = pattern.bass
      ? t('1 = Grundton, 5 = Quinte (eine Saite höher, zwei Bünde weiter), 8 = Oktave (zwei Saiten höher, zwei Bünde weiter). Bei „·“ klingt der Ton weiter. Tipp: Tippe mehrmals im Takt eines Liedes auf „Tippen“ – dann passt sich das Tempo an.')
      : pattern.roll && roll
      ? t(roll.explain)
      : t('↓ = runter streichen (Daumen oder Zeigefinger), ↑ = hoch. Die Hand schwingt immer weiter, auch bei „·“. Tipp: Tippe mehrmals im Takt eines Liedes auf „Tippen“ – dann passt sich das Tempo an.');
    sayLine.textContent = t('Gesprochen: {say}', { say: t(pattern.say) });
    pattern.steps.split('').forEach((st, i) => {
      const glyph = pattern.bass ? BASS_GLYPH[st] || '·' : pattern.roll ? t(FINGER_WORD[st]).charAt(0).toUpperCase() : st === 'D' ? '↓' : st === 'U' ? '↑' : '·';
      arrows.appendChild(
        h(
          'span',
          { class: `arrow ${pattern.bass ? (st === '-' ? 'rest' : 'pick') : pattern.roll ? 'pick' : st === 'D' ? 'down' : st === 'U' ? 'up' : 'rest'}` },
          h('span', { class: 'glyph' }, glyph),
          h('span', { class: 'beat-count' }, pattern.sub === 3 ? String(i + 1) : i % 2 === 0 ? String(i / 2 + 1) : t('und')),
        ),
      );
    });
  };
  const label = () => {
    clear(playBtn);
    playBtn.appendChild(h('span', null, icon(running ? 'stop' : 'play'), h('span', { class: 'lbl' }, running ? t('Stopp') : t('Start'))));
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
  const stepDur = () => 60 / bpm / pattern.sub;
  const schedule = () => {
    const horizon = audio().currentTime + 0.15;
    const steps = pattern.steps;
    while (start + scheduled * stepDur() < horizon) {
      const i = scheduled % steps.length;
      const t = start + scheduled * stepDur();
      if (i % pattern.sub === 0) click(t, accent && i === 0, 0.4);
      else if (pattern.sub === 3) click(t, false, 0.12);
      if (playStrum && pattern.bass && steps[i] !== '-') pluck(bassMidi(chordName, steps[i]), t, 0.75);
      else if (playStrum && pattern.roll && roll) pluckString(chordName, roll.strings[i], t, 0.4);
      else if (playStrum && steps[i] !== '-') strum(chordName, t, 0.28, steps[i] === 'U');
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

  const restart = () => {
    if (running) {
      stop();
      go();
    }
  };
  const bpmShow = h('span', { class: 'bpm-value', 'aria-live': 'polite' });
  const tempoSeg = h('div', { class: 'seg seg-wrap', role: 'group', 'aria-label': t('Tempo') });
  const setBpm = (v: number) => {
    bpm = Math.max(MIN_BPM, Math.min(MAX_BPM, Math.round(v)));
    bpmShow.textContent = t('{n} Schläge pro Minute', { n: bpm });
    Array.prototype.forEach.call(tempoSeg.children, (c: Element, i: number) => c.setAttribute('aria-pressed', String(TEMPOS[i] && TEMPOS[i].bpm === bpm)));
    restart();
  };
  TEMPOS.forEach((x) => tempoSeg.appendChild(button(`${t(x.label)} (${x.bpm})`, () => setBpm(x.bpm), 'btn-seg', { 'aria-pressed': String(x.bpm === bpm) })));
  // Tippen: Mittel der letzten Abstände, nach 2 s Pause beginnt eine neue Messung
  const tap = () => {
    const now = performance.now();
    if (taps.length && now - taps[taps.length - 1] > 2000) taps = [];
    taps.push(now);
    if (taps.length > 5) taps.shift();
    if (taps.length >= 2) setBpm((60000 * (taps.length - 1)) / (taps[taps.length - 1] - taps[0]));
    else bpmShow.textContent = t('Weiter tippen …');
  };
  const tempoRow = h(
    'div',
    { class: 'tempo-row' },
    button('−', () => setBpm(bpm - 5), 'btn-seg tempo-step', { 'aria-label': t('Langsamer') }),
    bpmShow,
    button('+', () => setBpm(bpm + 5), 'btn-seg tempo-step', { 'aria-label': t('Schneller') }),
    button(t('Tippen'), tap, 'btn-seg tempo-tap', { 'aria-label': t('Tempo durch Tippen bestimmen') }),
  );
  bpmShow.textContent = t('{n} Schläge pro Minute', { n: bpm });

  // E-Bass: wo Grundton, Quinte und Oktave des gewählten Tons liegen
  const neck = h('div', { class: 'rhythm-neck' });
  const drawNeck = () => {
    if (!inst.notesOnly) return;
    clear(neck);
    if (playStrum) neck.appendChild(fretboard(bassMarks(chordName), 5, 1, undefined, load().settings.lefty));
  };
  drawArrows();
  drawNeck();
  label();
  screen(
    root,
    { title: t('Rhythmus'), theme: 'teal' },
    h('div', { class: 'card rhythm-card' }, arrows, sayLine, explain, inst.notesOnly ? neck : null),
    h(
      'div',
      { class: 'controls' },
      playBtn,
      h('h2', null, t('Muster')),
      seg(t('Muster'), patterns, (p) => t(p.name), (p) => p === pattern, (p) => {
        pattern = p;
        drawArrows();
      }),
      h('h2', null, t('Tempo')),
      tempoSeg,
      tempoRow,
      h('h2', null, t('Betonung')),
      seg(t('Betonung'), [true, false], (c) => (c ? t('Eins betont') : t('Alle gleich')), (c) => c === accent, (c) => (accent = c)),
      h('h2', null, inst.notesOnly ? t('Ton') : t('Akkord')),
      seg(inst.notesOnly ? t('Ton') : t('Akkord'), CHORD_CHOICES.concat(['']), (c) => (c ? (inst.notesOnly ? noteText(c) : c) : t('nur Klick')), (c) => c === chordName, (c) => {
        playStrum = c !== '';
        if (playStrum) chordName = c;
        drawNeck();
      }),
    ),
  );
  return stop;
};
