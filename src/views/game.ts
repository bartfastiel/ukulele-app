import { h, clear, announce } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, button, ensureMic, praise, keepAwake, type View } from '../ui/screen.ts';
import { playableChord } from '../ui/chord-play.ts';
import { CHORDS, chord } from '../music/chords.ts';
import { successSound } from '../audio/engine.ts';
import { listenForChord, type ChordListener } from '../audio/listen.ts';
import { load, save, markPracticed } from '../store.ts';
import { t } from '../i18n.ts';
import { instrument } from '../music/instrument.ts';

const SECONDS = 60;

function presetLabel(chords: string[]): string {
  return chords.length === 2 ? t('{a} und {b}', { a: chords[0], b: chords[1] }) : chords.join(' · ');
}

export const game: View = (root) => {
  const PRESETS = instrument().game.map((chords) => ({ chords }));
  let selected = PRESETS[0].chords;
  let listener: ChordListener | null = null;
  let timer = 0;
  let releaseWake: (() => void) | null = null;
  const lefty = load().settings.lefty;
  const area = h('div', { class: 'game-area' });

  const stop = () => {
    listener?.stop();
    listener = null;
    window.clearInterval(timer);
    releaseWake?.();
    releaseWake = null;
  };

  const setup = () => {
    stop();
    clear(area);
    const best = load().bestHunt;
    area.appendChild(
      h(
        'div',
        { class: 'card game-setup' },
        h('h2', null, t('Welche Akkorde?')),
        h(
          'div',
          { class: 'preset-grid' },
          ...PRESETS.map((p) => {
            const b = button(
              h('span', null, h('span', null, presetLabel(p.chords)), best[p.chords.join('-')] ? h('span', { class: 'best' }, ' ', t('Rekord: {n}', { n: best[p.chords.join('-')] })) : null),
              () => {
                selected = p.chords;
                Array.prototype.forEach.call(b.parentNode!.children, (c: Element) => c.setAttribute('aria-pressed', 'false'));
                b.setAttribute('aria-pressed', 'true');
              },
              'btn-seg',
              { 'aria-pressed': String(p.chords === selected) },
            );
            return b;
          }),
        ),
        h('p', null, t('Spiel den Akkord, der erscheint – ich höre zu und zähle mit. Du hast {n} Sekunden. Bei zwei Akkorden wechselst du immer hin und her.', { n: SECONDS })),
        button(h('span', null, icon('play'), ' ', t('Start')), () => void play(), 'btn-primary btn-play'),
      ),
    );
  };

  const play = async () => {
    const mic = await ensureMic();
    stop();
    releaseWake = keepAwake();
    clear(area);
    let score = 0;
    let idx = 0;
    let current = selected[0];
    const pick = () => {
      if (selected.length === 2) {
        idx = 1 - idx;
        return selected[idx];
      }
      let next = current;
      while (next === current) next = selected[Math.floor(Math.random() * selected.length)];
      return next;
    };
    const name = h('div', { class: 'chord-name huge' }, current);
    const diag = h('div', { class: 'diagram-big' }, playableChord(chord(current), { lefty }));
    const scoreEl = h('div', { class: 'score', 'aria-live': 'polite' }, '0');
    const timeEl = h('div', { class: 'time' }, String(SECONDS));
    const ring = h('div', { class: 'time-ring' }, timeEl);
    const msg = h('div', { class: 'feedback' }, mic ? t('Los! Ich höre zu …') : t('Tippe auf „Geschafft“, wenn du den Akkord gespielt hast.'));
    const hit = (heard: boolean) => {
      score++;
      scoreEl.textContent = String(score);
      if (heard) successSound();
      msg.textContent = praise();
      current = pick();
      name.textContent = current;
      diag.replaceChild(playableChord(chord(current), { lefty }), diag.firstChild!);
      listener?.setExpected(current);
      announce(`${current}`);
    };
    area.appendChild(
      h(
        'div',
        { class: 'game-run' },
        h('div', { class: 'card game-target' }, h('div', { class: 'card-label' }, t('Spiel')), name, diag),
        h(
          'div',
          { class: 'game-side' },
          h('div', { class: 'card stats' }, h('div', null, h('div', { class: 'card-label' }, t('Punkte')), scoreEl), ring),
          msg,
          button(h('span', null, icon('check'), ' ', t('Geschafft')), () => hit(false), mic ? '' : 'btn-primary'),
          button(t('Aufhören'), setup, ''),
        ),
      ),
    );
    if (mic)
      listener = await listenForChord(current, { onHit: () => hit(true) }).catch(() => null);
    const end = Date.now() + SECONDS * 1000;
    timer = window.setInterval(() => {
      const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      timeEl.textContent = String(left);
      ring.style.setProperty('--p', String(left / SECONDS));
      if (left > 0) return;
      stop();
      const key = selected.join('-');
      const before = load().bestHunt[key] || 0;
      if (score > before) save((p) => (p.bestHunt[key] = score));
      markPracticed();
      successSound();
      clear(area);
      area.appendChild(
        h(
          'div',
          { class: 'card result' },
          h('div', { class: 'wait-title' }, score > before ? t('Neuer Rekord!') : t('Zeit um!')),
          h('div', { class: 'score huge' }, String(score)),
          h('p', null, score > before ? t('Vorher: {n}', { n: before }) : t('Dein Rekord: {n}', { n: before })),
          h('div', { class: 'row' }, button(t('Nochmal'), () => void play(), 'btn-primary'), button(t('Andere Akkorde'), setup)),
        ),
      );
    }, 250);
  };

  screen(root, { title: t('Akkord-Spiel'), theme: 'cherry' }, area);
  setup();
  return stop;
};

export const ALL = CHORDS;
