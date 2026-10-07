import { h, clear } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, button, ensureMic, keepAwake, type View } from '../ui/screen.ts';
import { fretboard, type Mark } from '../ui/fretboard.ts';
import { BLUES_SCALE, LEVELS, SWING, bluesBars, chordTones, organVoicing, position, rootOf, scalePositions, type Level } from '../music/blues.ts';
import { ROOTS } from '../music/chords.ts';
import { audio, click, pluck } from '../audio/engine.ts';
import { bass, hat, kick, organ, snare } from '../audio/band.ts';
import { openMic, type Mic } from '../audio/mic.ts';
import { detectPitch } from '../audio/pitch.ts';
import { NOTE_NAMES, freqToMidi, pitchClass } from '../music/notes.ts';
import { markPracticed } from '../store.ts';

const TEMPOS = [
  { label: 'Langsam', bpm: 70 },
  { label: 'Mittel', bpm: 85 },
  { label: 'Schnell', bpm: 100 },
];

const WALK = [0, 4, 7, 9, 10, 9, 7, 4];

export const blues: View = (root) => {
  let level: Level = LEVELS[0];
  let key = 0;
  let BARS = bluesBars(key);
  let bpm = 70;
  let guide = false;
  let listening = false;
  let running = false;
  let start = 0;
  let scheduled = 0;
  let timer = 0;
  let raf = 0;
  let micTimer = 0;
  let lastBeat = -99;
  let hits = 0;
  let hitBeat = -1;
  let played: { midi: number; at: number } | null = null;
  let releaseWake: (() => void) | null = null;

  const grid = h('div', { class: 'blues-grid', 'aria-label': '12 Takte' });
  const neck = h('div', { class: 'card blues-neck' });
  const info = h('p', { class: 'card blues-info' });
  const counter = h('div', { class: 'feedback', 'aria-live': 'polite' }, 'Tippe auf „Start“ – die Band zählt ein.');
  const playBtn = button('', () => (running ? stop() : go()), 'btn-primary btn-play');

  const spb = () => 60 / bpm;
  const beatNow = () => (audio().currentTime - start) / spb();

  const drawGrid = (bar: number) => {
    clear(grid);
    BARS.forEach((c, i) => grid.appendChild(h('div', { class: `blues-bar${i === bar ? ' now' : ''}` }, c.replace('7', ''), h('small', null, '7'))));
  };

  const targetAt = (beat: number) => {
    if (!level.notes || beat < 0) return null;
    const bar = Math.floor(beat / 4) % 12;
    const n = level.notes(BARS[bar])[Math.floor(beat) % 4];
    return n ? n.midi : null;
  };

  const drawNeck = (beat: number) => {
    clear(neck);
    const bar = ((Math.floor(beat / 4) % 12) + 12) % 12;
    const chord = BARS[bar];
    const marks: Mark[] = [];
    if (level.notes) {
      const now = targetAt(Math.max(0, beat));
      const next = targetAt(Math.max(0, beat) + 1);
      if (next !== null && next !== now) {
        const p = position(next);
        marks.push({ string: p.string, fret: p.fret, kind: 'next', label: String(p.fret) });
      }
      if (now !== null) {
        const p = position(now);
        marks.push({ string: p.string, fret: p.fret, kind: 'now', label: String(p.fret) });
      }
    } else {
      const tones = chordTones(chord);
      for (const p of scalePositions(key, 3))
        marks.push({ string: p.string, fret: p.fret, kind: tones.indexOf(p.midi % 12) >= 0 ? 'chord' : 'scale', label: NOTE_NAMES[p.midi % 12] });
    }
    if (played && audio().currentTime - played.at < 0.6) {
      const p = position(played.midi);
      marks.push({ string: p.string, fret: p.fret, kind: 'played' });
    }
    neck.appendChild(
      h(
        'div',
        { class: 'blues-now' },
        h('span', { class: 'chord-name' }, chord),
        level.notes && beat >= 0 && targetAt(beat) !== null ? h('span', { class: 'blues-target' }, `Spiel ${NOTE_NAMES[pitchClass(targetAt(beat)!)]}`) : null,
      ),
    );
    neck.appendChild(fretboard(marks, 3));
  };

  const schedule = () => {
    const horizon = beatNow() + 0.2 / spb();
    while (scheduled < horizon) {
      const b = scheduled;
      const t = start + b * spb();
      if (b < 0) {
        click(t, b === -4, 0.5);
      } else {
        const bar = Math.floor(b / 4) % 12;
        const chord = BARS[bar];
        const inBar = b % 4;
        hat(t);
        hat(t + SWING * spb(), 0.05);
        if (inBar === 0 || inBar === 2) kick(t);
        else snare(t);
        for (let k = 0; k < 2; k++) {
          const step = inBar * 2 + k;
          const off = k ? SWING : 0;
          bass(rootOf(chord).bass + WALK[step], t + off * spb(), (k ? 1 - SWING : SWING) * spb());
        }
        if (inBar === 1 || inBar === 3) organ(organVoicing(chord), t + SWING * spb(), spb() * 0.45);
        if (guide && level.notes) {
          const target = targetAt(b);
          if (target !== null) pluck(target, t, 0.35);
        }
      }
      scheduled++;
    }
  };

  const frame = () => {
    const beat = beatNow();
    const whole = Math.floor(beat);
    if (whole !== lastBeat) {
      lastBeat = whole;
      if (beat < 0) counter.textContent = `Einzählen … ${4 + whole + 1}`;
      else if (!listening) counter.textContent = `Takt ${(Math.floor(beat / 4) % 12) + 1} von 12`;
      drawGrid(beat < 0 ? -1 : Math.floor(beat / 4) % 12);
      drawNeck(beat);
    }
    raf = requestAnimationFrame(frame);
  };

  const listen = (mic: Mic) => {
    const buf = new Float32Array(2048);
    micTimer = window.setInterval(() => {
      if (!running) return;
      mic.timeData(buf);
      const p = detectPitch(buf, mic.sampleRate, 240, 1100);
      if (!p || p.clarity < 0.9) return;
      const midi = Math.round(freqToMidi(p.freq));
      played = { midi, at: audio().currentTime };
      const beat = beatNow();
      if (beat < 0) return;
      if (level.notes) {
        const target = targetAt(beat);
        const whole = Math.floor(beat);
        if (target !== null && pitchClass(target) === pitchClass(midi) && hitBeat !== whole) {
          hitBeat = whole;
          hits++;
          counter.textContent = `Treffer: ${hits}`;
        }
      } else if (BLUES_SCALE.indexOf((pitchClass(midi) - key + 12) % 12) >= 0 && hitBeat !== Math.floor(beat)) {
        hitBeat = Math.floor(beat);
        hits++;
        counter.textContent = `${hits} Blues-Töne – klingt gut!`;
      }
      drawNeck(beat);
    }, 50);
  };

  const label = () => {
    clear(playBtn);
    playBtn.appendChild(h('span', null, icon(running ? 'stop' : 'play'), h('span', { class: 'lbl' }, running ? 'Stopp' : 'Start')));
  };

  const go = () => {
    const c = audio();
    running = true;
    hits = 0;
    hitBeat = -1;
    start = c.currentTime + 0.15 + 4 * spb();
    scheduled = -4;
    lastBeat = -99;
    releaseWake = keepAwake();
    timer = window.setInterval(schedule, 25);
    schedule();
    raf = requestAnimationFrame(frame);
    markPracticed();
    label();
  };

  const stop = () => {
    running = false;
    window.clearInterval(timer);
    cancelAnimationFrame(raf);
    releaseWake?.();
    releaseWake = null;
    label();
    drawGrid(-1);
    drawNeck(0);
    if (hits) counter.textContent = level.notes ? `Geschafft – ${hits} Treffer!` : `Geschafft – ${hits} Blues-Töne!`;
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
        }, 'btn-seg', { 'aria-pressed': String(isOn(it)) });
        return b;
      }),
    );

  const setLevel = (l: Level) => {
    level = l;
    info.textContent = l.text;
    drawNeck(running ? beatNow() : 0);
  };

  const guideBtn = button('Ton vorspielen', () => {
    guide = !guide;
    guideBtn.setAttribute('aria-pressed', String(guide));
  }, 'btn-seg', { 'aria-pressed': 'false' });
  const micBtn = button(h('span', null, icon('mic'), ' Ich höre zu'), () => {
    if (listening) return;
    void ensureMic().then(async (ok) => {
      if (!ok) return;
      listening = true;
      micBtn.setAttribute('aria-pressed', 'true');
      listen(await openMic());
    });
  }, 'btn-seg', { 'aria-pressed': 'false' });

  const explainText = () => {
    const n = (i: number) => BARS[i].replace('7', '');
    return `Der 12-Takt-Blues: 4 Takte ${n(0)}, 2 Takte ${n(4)}, 2 Takte ${n(0)}, dann ${n(8)}, ${n(9)}, ${n(10)}, ${n(11)} – und wieder von vorn. Die Band spielt im „Shuffle“: lang-kurz, lang-kurz.`;
  };
  const explain = h('p', { class: 'card small' }, explainText());

  label();
  drawGrid(-1);
  setLevel(LEVELS[0]);
  screen(
    root,
    { title: 'Blues', theme: 'teal' },
    h('div', { class: 'blues-top' }, grid, neck),
    info,
    h(
      'div',
      { class: 'controls' },
      playBtn,
      h('h2', null, 'Stufe'),
      seg('Stufe', LEVELS, (l) => l.title, (l) => l === level, setLevel),
      h('h2', null, 'Tonart'),
      seg('Tonart', ROOTS.map((_, i) => i), (i) => (i === 0 ? 'C ★' : ROOTS[i]), (i) => i === key, (i) => {
        key = i;
        BARS = bluesBars(key);
        explain.textContent = explainText();
        drawGrid(running ? Math.floor(Math.max(0, beatNow()) / 4) % 12 : -1);
        drawNeck(running ? beatNow() : 0);
      }),
      h('p', { class: 'card small' }, '★ In C liegen die Grundtöne auf leeren Saiten – am bequemsten. Andere Tonarten passen zu Liedern oder Mitspielern.'),
      h('h2', null, 'Tempo'),
      seg('Tempo', TEMPOS, (t) => t.label, (t) => t.bpm === bpm, (t) => {
        const beat = running ? beatNow() : 0;
        bpm = t.bpm;
        if (running) {
          start = audio().currentTime - beat * spb();
          scheduled = Math.ceil(beat);
        }
      }),
      h('h2', null, 'Hilfen'),
      h('div', { class: 'seg seg-wrap' }, guideBtn, micBtn),
    ),
    counter,
    explain,
  );
  return () => {
    stop();
    window.clearInterval(micTimer);
  };
};
