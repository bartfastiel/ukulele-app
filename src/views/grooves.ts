import { h, clear } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, button, toggle, ensureMic, keepAwake, type View } from '../ui/screen.ts';
import { fretboard, type Mark } from '../ui/fretboard.ts';
import { playableChord } from '../ui/chord-play.ts';
import { chordDiagram } from '../ui/chord-diagram.ts';
import { GROOVES, bandBar, chordsText, easyKey, eighthOf, firstPosition, groove, grooveBars, levels, lineNotes, noteAt, type Groove, type Level, type LineNote } from '../music/grooves.ts';
import { place, spell } from '../music/blues.ts';
import { instrument } from '../music/instrument.ts';
import { ROOTS, chord } from '../music/chords.ts';
import { audio, click, hold, pluck } from '../audio/engine.ts';
import { bass, hat, kick, organ, snare } from '../audio/band.ts';
import { holdOwnSound, hearingOwnSound } from '../audio/own-sound.ts';
import { closeMic, openMic, type Mic } from '../audio/mic.ts';
import { detectPitchIn } from '../audio/pitch.ts';
import { freqToMidi, pitchClass, stringMidi } from '../music/notes.ts';
import { load, markPracticed } from '../store.ts';
import { brand, link } from '../site/nav.ts';
import { noteText, t, tk } from '../i18n.ts';

const TEMPO_NAMES = [tk('Sehr langsam'), tk('Langsam'), tk('Mittel'), tk('Schnell')];

/** Was beim Wechsel des Stils bleibt: Tempo-Stufe und eine selbst gewählte Tonart. */
interface Keep {
  tempo: number;
  key: number | null;
}

/** Ein Stil je Seite; der Wechsel geschieht ohne Neuladen, die Adresse folgt. */
export const grooves: View = (root, param) => {
  const keep: Keep = { tempo: 1, key: null };
  let cleanup: () => void = () => undefined;
  const show = (g: Groove, moved: boolean) => {
    cleanup();
    if (moved) {
      closeMic();
      history.replaceState(null, '', link(`begleitung/${g.id}`));
      document.title = `${t(g.title)} · ${brand()}`;
    }
    cleanup = mount(root, g, keep, (next) => show(next, true));
  };
  show(groove(param) || GROOVES[0], false);
  return () => cleanup();
};

function mount(root: HTMLElement, g: Groove, keep: Keep, switchTo: (g: Groove) => void): () => void {
  const ownBass = !!instrument().notesOnly;
  const lefty = load().settings.lefty;
  const star = easyKey(g);
  let key = keep.key === null ? star : keep.key;
  let bars = grooveBars(g, key);
  let level: Level = 'simple';
  let bpm = g.tempos[keep.tempo];
  let guide = false;
  let listening = false;
  let running = false;
  let start = 0;
  let scheduled = 0;
  let timer = 0;
  let raf = 0;
  let micTimer = 0;
  let lastStep = '';
  let hits = 0;
  let hitNote = '';
  let played: { midi: number; at: number; string?: number; fret?: number } | null = null;
  let releaseWake: (() => void) | null = null;
  const win = { from: 1, frets: instrument().blues.frets };

  const spb = () => 60 / bpm;
  const beatNow = () => (audio().currentTime - start) / spb();
  const barOf = (beat: number) => ((Math.floor(beat / 4) % bars.length) + bars.length) % bars.length;
  const notesOf = (bar: number): LineNote[] => lineNotes(g, level, key, bar);

  /** Vorgabe-Ton zum Schlag (E-Bass) samt Kennung (Takt und Achtel), damit jeder Ton nur einmal zählt. */
  const targetAt = (beat: number): { note: LineNote; id: string } | null => {
    if (!ownBass || beat < 0) return null;
    const bar = barOf(beat);
    const n = noteAt(notesOf(bar), beat - Math.floor(beat / 4) * 4);
    return n ? { note: n, id: `${Math.floor(beat / 4)}:${n.eighth}` } : null;
  };

  const grid = h('div', { class: 'blues-grid groove-grid', 'aria-label': t('Akkordfolge') });
  const now = h('div', { class: 'card groove-now' });
  const pattern = h('div', { class: 'arrows groove-pattern', 'aria-hidden': 'true' });
  const counter = h('div', { class: 'feedback', 'aria-live': 'polite' }, t('Tippe auf „Start“ – die Band zählt ein.'));
  const playBtn = button('', () => (running ? stop() : go()), 'btn-primary btn-play');
  const about = h('p', { class: 'card small' });
  const howTo = h('p', { class: 'blues-info groove-how' });

  const drawGrid = (bar: number) => {
    clear(grid);
    bars.forEach((c, i) => grid.appendChild(h('div', { class: `blues-bar groove-bar${i === bar ? ' now' : ''}` }, c)));
  };

  /** Achtel-Reihe: Schlagmuster (↓ ↑ ·) bzw. auf dem E-Bass die Töne der Basslinie im Takt. */
  const drawPattern = (bar: number, on: number) => {
    clear(pattern);
    const notes = ownBass ? notesOf(bar) : [];
    for (let e = 0; e < 8; e++) {
      const st = g.strum.charAt(e);
      const n = notes.filter((x) => x.eighth === e)[0];
      const kind = ownBass ? (n ? 'pick' : 'rest') : st === 'D' ? 'down' : st === 'U' ? 'up' : 'rest';
      const glyph = ownBass ? (n ? noteText(spell(n.midi, key)) : '·') : st === 'D' ? '↓' : st === 'U' ? '↑' : '·';
      pattern.appendChild(
        h(
          'span',
          { class: `arrow ${kind}${e === on ? ' on' : ''}` },
          h('span', { class: 'glyph' }, glyph),
          h('span', { class: 'beat-count' }, e % 2 === 0 ? String(e / 2 + 1) : t('und')),
        ),
      );
    }
  };

  const drawNow = (beat: number) => {
    clear(now);
    const bar = beat < 0 ? 0 : barOf(beat);
    const chordName = bars[bar];
    const nextName = bars[(bar + 1) % bars.length];
    if (ownBass) {
      const target = targetAt(Math.max(0, beat));
      const after = targetAt(Math.max(0, beat) + 0.5);
      const marks: Mark[] = [];
      if (after && target && after.note.midi !== target.note.midi) {
        const p = place(after.note.midi, win);
        marks.push({ string: p.string, fret: p.fret, kind: 'next', label: String(p.fret) });
      }
      if (target) {
        const p = place(target.note.midi, win);
        marks.push({ string: p.string, fret: p.fret, kind: 'now', label: String(p.fret) });
      }
      if (played && audio().currentTime - played.at < 0.6) {
        const p = played.string !== undefined ? { string: played.string, fret: played.fret! } : place(played.midi, win);
        marks.push({ string: p.string, fret: p.fret, kind: 'played' });
      }
      now.appendChild(
        h(
          'div',
          { class: 'blues-now' },
          h('span', { class: 'chord-name' }, chordName),
          target ? h('span', { class: 'blues-target groove-target' }, t('Spiel {note}', { note: noteText(spell(target.note.midi, key)) })) : null,
        ),
      );
      now.appendChild(fretboard(marks, win.frets, win.from, playNote, lefty));
    } else {
      now.appendChild(
        h(
          'div',
          { class: 'groove-chords' },
          h('div', { class: 'groove-chord' }, h('span', { class: 'chord-name' }, chordName), playableChord(chord(chordName), { lefty })),
          h(
            'div',
            { class: 'groove-chord next' },
            h('span', { class: 'groove-next-label' }, t('Gleich:'), ' ', h('span', { class: 'chord-name' }, nextName)),
            chordDiagram(chord(nextName), { lefty }),
          ),
        ),
      );
    }
  };

  const playNote = (p: { string: number; fret: number }) => {
    const midi = stringMidi(p.string, p.fret);
    const voice = hold(midi);
    const own = holdOwnSound();
    played = { midi, at: audio().currentTime, string: p.string, fret: p.fret };
    heard(midi);
    return {
      move() {},
      end() {
        voice.release();
        own();
      },
    };
  };

  const drawAll = (beat: number) => {
    const bar = beat < 0 ? -1 : barOf(beat);
    drawGrid(bar);
    drawNow(beat);
    drawPattern(bar < 0 ? 0 : bar, beat < 0 ? -1 : eighthOf(beat - Math.floor(beat / 4) * 4, g.swing));
  };

  const schedule = () => {
    const horizon = beatNow() + 0.2 / spb();
    // ganze Takte vorausplanen wäre zu spät für Tempowechsel – daher je Schlag
    while (scheduled < horizon) {
      const b = scheduled;
      const when = start + b * spb();
      if (b < 0) click(when, b === -4, 0.5);
      else {
        const bar = barOf(b);
        const inBar = b % 4;
        for (const x of bandBar(g, key, bar, ownBass, ownBass ? firstPosition().hi : 0)) {
          if (x.at < inBar || x.at >= inBar + 1) continue;
          const at = start + (Math.floor(b / 4) * 4 + x.at) * spb();
          if (x.kind === 'kick') kick(at, x.gain);
          else if (x.kind === 'snare') snare(at, x.gain);
          else if (x.kind === 'hat') hat(at, x.gain);
          else if (x.kind === 'keys') organ(x.midi, at, x.dur * spb(), x.gain);
          else bass(x.midi[0], at, x.dur * spb(), x.gain);
        }
        if (guide && ownBass)
          for (const n of notesOf(bar))
            if (n.at >= inBar && n.at < inBar + 1) pluck(place(n.midi, win).midi, start + (Math.floor(b / 4) * 4 + n.at) * spb(), 0.4);
      }
      scheduled++;
    }
  };

  const frame = () => {
    const beat = beatNow();
    const inBar = beat - Math.floor(beat / 4) * 4;
    const step = beat < 0 ? String(Math.floor(beat)) : `${Math.floor(beat / 4)}:${eighthOf(inBar, g.swing)}`;
    if (step !== lastStep) {
      lastStep = step;
      if (beat < 0) counter.textContent = t('Einzählen … {n}', { n: 4 + Math.floor(beat) + 1 });
      else if (!listening || !hits) counter.textContent = t('Takt {n} von {total}', { n: barOf(beat) + 1, total: bars.length });
      drawAll(beat);
    }
    raf = requestAnimationFrame(frame);
  };

  /** Gespielter Ton (Mikrofon oder angetippt): Treffer zählen, solange die Band läuft. */
  const heard = (midi: number) => {
    if (!running) return drawNow(0);
    const beat = beatNow();
    const target = targetAt(beat);
    if (target && pitchClass(target.note.midi) === pitchClass(midi) && hitNote !== target.id) {
      hitNote = target.id;
      hits++;
      counter.textContent = t('Treffer: {n}', { n: hits });
    }
    drawNow(beat);
  };

  const listen = (mic: Mic) => {
    // tiefe Töne (E-Bass ab 41 Hz) brauchen ein längeres Fenster
    const buf = new Float32Array(4096);
    const range = instrument().blues.pitch;
    micTimer = window.setInterval(() => {
      if (!running || hearingOwnSound()) return;
      mic.timeData(buf);
      const p = detectPitchIn(buf, mic.sampleRate, range.minHz, range.maxHz);
      if (!p || p.clarity < 0.9) return;
      const midi = Math.round(freqToMidi(p.freq));
      played = { midi, at: audio().currentTime };
      heard(midi);
    }, 50);
  };

  const label = () => {
    clear(playBtn);
    playBtn.appendChild(h('span', null, icon(running ? 'stop' : 'play'), h('span', { class: 'lbl' }, running ? t('Stopp') : t('Start'))));
  };

  const go = () => {
    const c = audio();
    running = true;
    hits = 0;
    hitNote = '';
    start = c.currentTime + 0.15 + 4 * spb();
    scheduled = -4;
    lastStep = '';
    releaseWake = keepAwake();
    timer = window.setInterval(schedule, 25);
    schedule();
    raf = requestAnimationFrame(frame);
    markPracticed();
    label();
  };

  const stop = () => {
    const was = running;
    running = false;
    window.clearInterval(timer);
    cancelAnimationFrame(raf);
    if (releaseWake) releaseWake();
    releaseWake = null;
    label();
    if (!was) return;
    drawAll(-1);
    counter.textContent = hits ? t('Geschafft – {n} Treffer!', { n: hits }) : t('Geschafft!');
  };

  const seg = <T,>(name: string, items: T[], text: (x: T) => string, isOn: (x: T) => boolean, pick: (x: T) => void) =>
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

  const texts = () => {
    about.textContent = t(g.about, { chords: chordsText(g, key) });
    howTo.textContent = ownBass ? t(level === 'simple' ? g.simpleText : level === 'middle' && g.middle ? g.middle.text : g.lineText) : t(g.strumText);
  };

  const redraw = () => {
    texts();
    drawAll(running ? beatNow() : -1);
  };

  // Stile als Links (eigene Seiten), im Browser ohne Neuladen: Tempo und Tonart bleiben
  const styles = h(
    'nav',
    { class: 'seg seg-wrap groove-styles', 'aria-label': t('Stil') },
    ...GROOVES.map((x) => {
      const a = h('a', { class: 'btn btn-seg', href: link(`begleitung/${x.id}`), 'aria-current': x.id === g.id ? 'page' : null }, t(x.name));
      a.addEventListener('click', (ev) => {
        ev.preventDefault();
        if (x.id !== g.id) switchTo(x);
      });
      return a;
    }),
    h('a', { class: 'btn btn-seg', href: link('blues') }, t('Blues')),
  );

  const guideBtn = toggle(t('Ton vorspielen'), false, (v) => (guide = v));
  // einmal an, bleibt an: der Lauscher hört bis zum Verlassen der Seite zu
  const micBtn = toggle(h('span', null, icon('mic'), t('Ich höre zu')), false, () => {
    micBtn.setAttribute('aria-pressed', String(listening));
    if (listening) return;
    void ensureMic().then(async (ok) => {
      if (!ok) return;
      listening = true;
      micBtn.setAttribute('aria-pressed', 'true');
      listen(await openMic());
    });
  });

  texts();
  label();
  screen(
    root,
    { title: t(g.title) },
    styles,
    h('div', { class: 'blues-top' }, grid, now),
    h('div', { class: 'card groove-pattern-card' }, pattern, howTo),
    h(
      'div',
      { class: 'controls' },
      playBtn,
      ownBass ? h('h2', null, t('Stufe')) : null,
      ownBass
        ? seg(t('Stufe'), levels(g), (x) => (x === 'simple' ? t('1 · Grundton') : t('{n} · {name}', { n: levels(g).indexOf(x) + 1, name: t(x === 'middle' && g.middle ? g.middle.name : g.lineName) })), (x) => x === level, (x) => {
            level = x;
            redraw();
          })
        : null,
      h('h2', null, t('Tonart')),
      seg(t('Tonart'), ROOTS.map((_, i) => i), (i) => (i === star ? `${ROOTS[i]} ★` : ROOTS[i]), (i) => i === key, (i) => {
        key = i;
        keep.key = i;
        bars = grooveBars(g, key);
        redraw();
      }),
      h('p', { class: 'card small' }, ownBass ? t(instrument().blues.hint) : t('★ In dieser Tonart sind die Griffe am leichtesten. Andere Tonarten passen zu Liedern oder Mitspielern.')),
      h('h2', null, t('Tempo')),
      seg(t('Tempo'), [0, 1, 2, 3], (i) => `${t(TEMPO_NAMES[i])} · ${g.tempos[i]}`, (i) => i === keep.tempo, (i) => {
        const beat = running ? beatNow() : 0;
        keep.tempo = i;
        bpm = g.tempos[i];
        if (running) {
          start = audio().currentTime - beat * spb();
          scheduled = Math.ceil(beat);
        }
      }),
      ownBass ? h('h2', null, t('Hilfen')) : null,
      ownBass ? h('div', { class: 'group helpers' }, micBtn, guideBtn) : null,
    ),
    counter,
    about,
  );
  drawAll(-1);
  return () => {
    stop();
    window.clearInterval(micTimer);
  };
}
