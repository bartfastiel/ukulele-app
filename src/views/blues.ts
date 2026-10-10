import { h, clear } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, button, ensureMic, keepAwake, type View } from '../ui/screen.ts';
import { fretboard, type Mark } from '../ui/fretboard.ts';
import { LEVELS, SWING, bluesBars, fitsFree, freeNotes, spell, levelText, levelWindow, organVoicing, place, rootOf, windowTop, type Level, type NeckWindow } from '../music/blues.ts';
import { instrument } from '../music/instrument.ts';
import { ROOTS } from '../music/chords.ts';
import { audio, click, hold, pluck, setWah } from '../audio/engine.ts';
import { hasMotion, watchTilt } from '../audio/motion.ts';
import { fingerDown, type Play } from '../ui/fret-gesture.ts';
import { VIBRATO_CENTS, VibratoDetector, bendSemis, slideFret, strikeGain } from '../ui/expression.ts';
import { bass, hat, kick, organ, snare } from '../audio/band.ts';
import { openMic, type Mic } from '../audio/mic.ts';
import { detectPitch } from '../audio/pitch.ts';
import { freqToMidi, midiToFreq, pitchClass, playableFret, stringMidi } from '../music/notes.ts';
import { load, markPracticed } from '../store.ts';
import { noteText, t, tk, tp } from '../i18n.ts';

const TEMPOS = [
  { label: tk('Sehr langsam'), bpm: 55 },
  { label: tk('Langsam'), bpm: 70 },
  { label: tk('Mittel'), bpm: 85 },
  { label: tk('Schnell'), bpm: 100 },
];

const WALK = [0, 4, 7, 9, 10, 9, 7, 4];
/** Beim freien Spiel mehr vom Hals zeigen als bei den Vorgaben. */
const FREE_FRETS = 5;

export const blues: View = (root) => {
  const setup = instrument().blues;
  let level: Level = LEVELS[0];
  let key = setup.easyKey;
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
  let played: { midi: number; at: number; string?: number; fret?: number } | null = null;
  let fade = 0;
  let releaseWake: (() => void) | null = null;
  let from = 1;
  const win = (): NeckWindow => (level.notes ? levelWindow(from) : { from: Math.min(from, instrument().frets - FREE_FRETS + 1), frets: FREE_FRETS });

  const grid = h('div', { class: 'blues-grid', 'aria-label': t('12 Takte') });
  const neck = h('div', { class: 'blues-neck-view' });
  const shiftLabel = h('span', { class: 'blues-shift-label' });
  const shift = (d: number) => {
    const w = win();
    from = Math.max(1, Math.min(instrument().frets - w.frets + 1, w.from + d));
    drawNeck(running ? beatNow() : 0);
  };
  // Linkshänder: der Kopf liegt rechts, also zeigen auch die Pfeile andersherum
  const lefty = load().settings.lefty;
  const towardHead = button(lefty ? '▶' : '◀', () => shift(-1), 'btn-seg blues-shift', { 'aria-label': t('Richtung Kopf') });
  const towardBody = button(lefty ? '◀' : '▶', () => shift(1), 'btn-seg blues-shift', { 'aria-label': t('Richtung Korpus') });
  const gestures = h('p', { class: 'small blues-gestures' }, t('Halten: klingt weiter · quer schieben: ziehen · entlang gleiten: rutschen · hin und her wiegen: Vibrato'));
  const neckCard = h(
    'div',
    { class: 'card blues-neck' },
    neck,
    gestures,
    h('div', { class: 'blues-shift-row' }, lefty ? towardBody : towardHead, shiftLabel, lefty ? towardHead : towardBody),
  );
  const info = h('p', { class: 'card blues-info' });
  const counter = h('div', { class: 'feedback', 'aria-live': 'polite' }, t('Tippe auf „Start“ – die Band zählt ein.'));
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

  let redrawLater = false;
  const drawNeck = (beat: number) => {
    // liegt ein Finger auf dem Hals, bliebe er beim Neuzeichnen ohne Ton – danach nachholen
    if (fingerDown()) {
      redrawLater = true;
      return;
    }
    redrawLater = false;
    clear(neck);
    const w = win();
    towardHead.disabled = w.from <= 1;
    towardBody.disabled = w.from + w.frets > instrument().frets;
    shiftLabel.textContent = t('Bund {a}–{b}', { a: w.from, b: w.from + w.frets - 1 });
    const bar = ((Math.floor(beat / 4) % 12) + 12) % 12;
    const chord = BARS[bar];
    const marks: Mark[] = [];
    if (level.notes) {
      const now = targetAt(Math.max(0, beat));
      const next = targetAt(Math.max(0, beat) + 1);
      if (next !== null && next !== now) {
        const p = place(next, w);
        marks.push({ string: p.string, fret: p.fret, kind: 'next', label: String(p.fret) });
      }
      if (now !== null) {
        const p = place(now, w);
        marks.push({ string: p.string, fret: p.fret, kind: 'now', label: String(p.fret) });
      }
    } else {
      for (const p of freeNotes(key, chord, w, level.id === 'mischen'))
        marks.push({ string: p.string, fret: p.fret, kind: p.kind, label: noteText(spell(p.midi, key)), bend: p.bend, weak: p.weak });
    }
    if (played && audio().currentTime - played.at < 0.6) {
      const p = played.string !== undefined ? { string: played.string, fret: played.fret! } : place(played.midi, w);
      marks.push({ string: p.string, fret: p.fret, kind: 'played' });
    }
    neck.appendChild(
      h(
        'div',
        { class: 'blues-now' },
        h('span', { class: 'chord-name' }, chord),
        level.notes && beat >= 0 && targetAt(beat) !== null ? h('span', { class: 'blues-target' }, t('Spiel {note}', { note: noteText(spell(targetAt(beat)!, key)) })) : null,
      ),
    );
    neck.appendChild(fretboard(marks, w.frets, w.from, playNote, lefty));
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
        if (inBar === 1 || inBar === 3) organ(organVoicing(chord, windowTop(win())), t + SWING * spb(), spb() * 0.45);
        if (guide && level.notes) {
          const target = targetAt(b);
          if (target !== null) pluck(place(target, win()).midi, t, 0.35);
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
      if (beat < 0) counter.textContent = t('Einzählen … {n}', { n: 4 + whole + 1 });
      else if (!listening) counter.textContent = t('Takt {n} von 12', { n: (Math.floor(beat / 4) % 12) + 1 });
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
      // weiter oben am Hals klingen die Töne höher; die Orgel weicht dann aus (organVoicing)
      const maxHz = Math.max(setup.pitch.maxHz, midiToFreq(windowTop(win()) + 1));
      const p = detectPitch(buf, mic.sampleRate, setup.pitch.minHz, maxHz);
      if (!p || p.clarity < 0.9) return;
      const midi = Math.round(freqToMidi(p.freq));
      played = { midi, at: audio().currentTime };
      heard(midi);
    }, 50);
  };

  /** Gespielter Ton (Mikrofon oder angetippt): Treffer zählen, solange die Band läuft. */
  const heard = (midi: number) => {
    if (running) {
      const beat = beatNow();
      if (beat < 0) return drawNeck(beat);
      if (level.notes) {
        const target = targetAt(beat);
        const whole = Math.floor(beat);
        if (target !== null && pitchClass(target) === pitchClass(midi) && hitBeat !== whole) {
          hitBeat = whole;
          hits++;
          counter.textContent = t('Treffer: {n}', { n: hits });
        }
      } else if (fitsFree(midi, key, BARS[Math.floor(beat / 4) % 12], level.id === 'mischen') && hitBeat !== Math.floor(beat)) {
        hitBeat = Math.floor(beat);
        hits++;
        counter.textContent = tp(hits, '{n} Blues-Ton – klingt gut!', '{n} Blues-Töne – klingt gut!');
      }
      drawNeck(beat);
    } else drawNeck(0);
  };

  /**
   * Ton auf dem Hals: Antippen zupft, Halten lässt klingen, Loslassen dämpft. Quer zur Saite schieben zieht den Ton
   * hoch, entlang der Saite rutscht er in den Nachbarbund, Hin-und-her-Wiegen gibt Vibrato. Der Ziehpfeil zieht selbst
   * um einen Viertelton. Ein starker Druck (wo das Gerät ihn misst) schlägt lauter an.
   */
  const playNote: Play = (p) => {
    const w = win();
    const midi = stringMidi(p.string, p.fret);
    const auto = p.arrow ? 0.5 : 0;
    const voice = hold(midi, strikeGain(p.pressure), auto);
    if (wahCtl) wahCtl.rezero();
    const vib = new VibratoDetector();
    let fret = p.fret;
    let semis = auto;
    const sound = (f: number) => {
      played = { midi: stringMidi(p.string, f), at: audio().currentTime, string: p.string, fret: f };
      heard(stringMidi(p.string, f));
    };
    sound(fret);
    return {
      move(along, across, px, t) {
        // leere Saiten lassen sich weder ziehen noch rutschen
        if (p.fret > 0) {
          const next = slideFret(p.fret, along, fret, Math.max(1, w.from), w.from + w.frets - 1);
          if (next !== fret && playableFret(p.string, next)) {
            fret = next;
            sound(fret);
          }
          const target = fret - p.fret + Math.max(auto, bendSemis(across));
          if (target !== semis) {
            semis = target;
            voice.pitch(semis, 0.03);
          }
        }
        voice.vibrato(vib.rate, vib.update(px, t) * VIBRATO_CENTS);
      },
      end() {
        voice.release();
        if (fingerDown()) return;
        if (redrawLater) drawNeck(running ? beatNow() : 0);
        window.clearTimeout(fade);
        fade = window.setTimeout(() => !running && !fingerDown() && drawNeck(0), 650);
      },
    };
  };

  const label = () => {
    clear(playBtn);
    playBtn.appendChild(h('span', null, icon(running ? 'stop' : 'play'), h('span', { class: 'lbl' }, running ? t('Stopp') : t('Start'))));
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
    if (hits) counter.textContent = level.notes ? t('Geschafft – {n} Treffer!', { n: hits }) : tp(hits, 'Geschafft – {n} Blues-Ton!', 'Geschafft – {n} Blues-Töne!');
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

  const bendInfo = h('p', { class: 'card small' });
  const setLevel = (l: Level) => {
    level = l;
    info.textContent = t(levelText(l), {
      i: ROOTS[key],
      iv: ROOTS[(key + 5) % 12],
      iii: noteText(spell(key + 4, key)),
      b3: noteText(spell(key + 3, key)),
    });
    bendInfo.style.display = l.notes ? 'none' : '';
    gestures.style.display = l.notes ? 'none' : '';
    bendInfo.textContent = t(
      'Ziehen ↑: Den Ton mit Pfeil ({note}) kannst du ein kleines Stück hochziehen – drück die Saite mit dem greifenden Finger quer über das Griffbrett, bis sie etwas höher klingt. Das ist die „Blue Note“ zwischen Moll und Dur. Der Pfeil erscheint nur, wenn der {i}-Akkord klingt – nur dort passt das Ziehen. Der Ton {b5} ist ein Durchgangston: kurz antippen, dann weiter.',
      { note: noteText(spell(key + 3, key)), i: ROOTS[key], b5: noteText(spell(key + 6, key)) },
    );
    drawNeck(running ? beatNow() : 0);
  };

  const guideBtn = button(t('Ton vorspielen'), () => {
    guide = !guide;
    guideBtn.setAttribute('aria-pressed', String(guide));
  }, 'btn-seg', { 'aria-pressed': 'false' });
  let wahCtl: { stop: () => void; rezero: () => void } | null = null;
  const wahBtn = button(t('Wah: Handy kippen'), () => {
    if (wahCtl) {
      wahCtl.stop();
      wahCtl = null;
      setWah(null);
    } else {
      setWah(0.5);
      wahCtl = watchTilt((x) => setWah(x));
      wahCtl.rezero();
    }
    wahBtn.setAttribute('aria-pressed', String(!!wahCtl));
  }, 'btn-seg', { 'aria-pressed': 'false' });
  const micBtn = button(h('span', null, icon('mic'), ' ', t('Ich höre zu')), () => {
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
    return t(
      'Der 12-Takt-Blues: 4 Takte {i}, 2 Takte {iv}, 2 Takte {i}, dann {a}, {b}, {c}, {d} – und wieder von vorn. Die Band spielt im „Shuffle“: lang-kurz, lang-kurz.',
      { i: n(0), iv: n(4), a: n(8), b: n(9), c: n(10), d: n(11) },
    );
  };
  const explain = h('p', { class: 'card small' }, explainText());

  label();
  drawGrid(-1);
  setLevel(LEVELS[0]);
  screen(
    root,
    { title: t('Blues'), theme: 'teal' },
    h('div', { class: 'blues-top' }, grid, neckCard),
    info,
    bendInfo,
    h(
      'div',
      { class: 'controls' },
      playBtn,
      h('h2', null, t('Stufe')),
      seg(t('Stufe'), LEVELS, (l) => t(l.title), (l) => l === level, setLevel),
      h('h2', null, t('Tonart')),
      seg(t('Tonart'), ROOTS.map((_, i) => i), (i) => (i === setup.easyKey ? `${ROOTS[i]} ★` : ROOTS[i]), (i) => i === key, (i) => {
        key = i;
        BARS = bluesBars(key);
        explain.textContent = explainText();
        setLevel(level);
        drawGrid(running ? Math.floor(Math.max(0, beatNow()) / 4) % 12 : -1);
        drawNeck(running ? beatNow() : 0);
      }),
      h('p', { class: 'card small' }, t(setup.hint)),
      h('h2', null, t('Tempo')),
      seg(t('Tempo'), TEMPOS, (x) => t(x.label), (x) => x.bpm === bpm, (x) => {
        const beat = running ? beatNow() : 0;
        bpm = x.bpm;
        if (running) {
          start = audio().currentTime - beat * spb();
          scheduled = Math.ceil(beat);
        }
      }),
      h('h2', null, t('Hilfen')),
      h('div', { class: 'seg seg-wrap' }, guideBtn, micBtn, hasMotion() ? wahBtn : null),
    ),
    counter,
    explain,
  );
  return () => {
    stop();
    window.clearInterval(micTimer);
    window.clearTimeout(fade);
    if (wahCtl) wahCtl.stop();
    setWah(null);
  };
};
