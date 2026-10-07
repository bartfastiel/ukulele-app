import { h, clear, announce, reducedMotion } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, button, ensureMic, praise, keepAwake, type View } from '../ui/screen.ts';
import { chordDiagram } from '../ui/chord-diagram.ts';
import { song as findSong } from '../music/songs.ts';
import { chordChanges, eventAt, type Song } from '../music/song.ts';
import { chord } from '../music/chords.ts';
import { STRINGS, tabPosition } from '../music/notes.ts';
import { audio, click, pluck, strum, successSound } from '../audio/engine.ts';
import { listenForChord, type ChordListener } from '../audio/listen.ts';
import { load, save, giveStars, markPracticed } from '../store.ts';
import { keyLabel, originalShift, songKey, suggestShift, transposeSong } from '../music/transpose.ts';
import { simplifications, simplifySong } from '../music/simplify.ts';
import { diagnose } from '../music/diagnose.ts';

const SPEEDS = [
  { value: 0.6, label: 'Langsam' },
  { value: 0.8, label: 'Mittel' },
  { value: 1, label: 'Original' },
];

type Phase = 'idle' | 'countin' | 'playing' | 'paused' | 'waiting' | 'done';

export const player: View = (root, id) => {
  const song = findSong(id);
  if (!song) {
    location.hash = '#/lieder';
    return;
  }
  save((p) => (p.lastSong = song.id));
  return new Player(root, song).cleanup;
};

class Player {
  private settings = load().settings;
  private phase: Phase = 'idle';
  /** AudioContext-Zeit, zu der Schlag 0 des Liedes erklingt. */
  private start = 0;
  /** Position beim Anhalten oder Warten. */
  private held = 0;
  private stopBeat = Infinity;
  private scheduledTo = 0;
  private timer = 0;
  private raf = 0;
  private lastIdx = -2;
  private lastLine = -1;
  private changes: number[];
  private listener: ChordListener | null = null;
  private micOk = false;
  private hintStreak = { string: -1, count: 0 };
  private releaseWake: (() => void) | null = null;
  private els: HTMLElement[] = [];
  private lineEls: HTMLElement[] = [];
  private visibleOf: number[] = [];

  private nowCard!: HTMLElement;
  private nextCard!: HTMLElement;
  private lyrics!: HTMLElement;
  private overlay!: HTMLElement;
  private playBtn!: HTMLButtonElement;
  private stage!: HTMLElement;

  private song: Song;
  /** Lied in der hinterlegten (einfachen) Tonart; `song` ist die gerade gewählte Transposition davon. */
  private base: Song;
  private shift = 0;
  private keyBox!: HTMLElement;

  constructor(root: HTMLElement, song: Song) {
    this.base = song;
    this.shift = load().keys[song.id] || 0;
    this.song = this.arrange();
    this.changes = chordChanges(this.song);
    this.render(root);
    this.drawKeyBox();
    this.showChords(0);
    this.highlight(-1);
  }

  private get spb(): number {
    return 60 / (this.song.bpm * this.settings.speed);
  }

  private beatNow(): number {
    if (this.phase === 'playing' || this.phase === 'countin') return (audio().currentTime - this.start) / this.spb;
    return this.held;
  }

  // ---------- Aufbau ----------

  private render(root: HTMLElement): void {
    this.nowCard = h('div', { class: 'chord-card now-card', 'aria-live': 'polite' });
    this.nextCard = h('div', { class: 'chord-card next-card' });
    this.overlay = h('div', { class: 'stage-overlay', hidden: true });
    this.stage = h(
      'section',
      { class: 'stage', 'aria-label': 'Akkorde' },
      this.nextCard,
      this.nowCard,
      this.overlay,
    );
    this.stage.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('button')) return;
      this.primary();
    });
    this.lyrics = h('section', { class: `lyrics card ${this.settings.tab ? 'with-tab' : ''}`, 'aria-label': 'Liedtext' });
    this.buildLyrics();
    this.playBtn = button(h('span', null, icon('play'), h('span', { class: 'lbl' }, 'Los geht’s')), () => this.primary(), 'btn-primary btn-play');

    const seg = (name: string, options: { label: string; active: boolean; on: () => void }[]) =>
      h(
        'div',
        { class: 'seg', role: 'group', 'aria-label': name },
        ...options.map((o) => {
          const b = button(o.label, () => {
            o.on();
            Array.prototype.forEach.call(b.parentNode!.children, (c: Element) => c.setAttribute('aria-pressed', 'false'));
            b.setAttribute('aria-pressed', 'true');
          }, 'btn-seg', { 'aria-pressed': String(o.active) });
          return b;
        }),
      );
    const toggle = (label: string, key: 'backing' | 'melody' | 'clickOn' | 'tab') => {
      const b = button(label, () => {
        const v = !this.settings[key];
        save((p) => (p.settings[key] = v));
        b.setAttribute('aria-pressed', String(v));
        if (key === 'tab') this.lyrics.classList.toggle('with-tab', v);
      }, 'btn-seg', { 'aria-pressed': String(this.settings[key]) });
      return b;
    };
    const controls = h(
      'section',
      { class: 'controls' },
      this.playBtn,
      seg('Modus', [
        { label: 'Wartet auf mich', active: this.settings.waitMode, on: () => this.setMode(true) },
        { label: 'Läuft durch', active: !this.settings.waitMode, on: () => this.setMode(false) },
      ]),
      seg(
        'Tempo',
        SPEEDS.map((sp) => ({ label: sp.label, active: Math.abs(this.settings.speed - sp.value) < 0.01, on: () => this.setSpeed(sp.value) })),
      ),
      h(
        'details',
        { class: 'more' },
        h('summary', { class: 'btn btn-seg' }, icon('gear'), ' Mehr'),
        h(
          'div',
          { class: 'seg seg-wrap' },
          toggle('Begleitung', 'backing'),
          this.song.hasMelody ? toggle('Melodie', 'melody') : null,
          toggle('Klick', 'clickOn'),
          this.song.hasMelody ? toggle('Tabulatur', 'tab') : null,
        ),
        (this.keyBox = h('div', { class: 'key-box' })),
        h('p', { class: 'small' }, this.song.origin),
      ),
    );
    const note = this.song.hasMelody
      ? null
      : h('p', { class: 'card small no-melody' }, 'Dieses Lied hat hier nur Akkorde und Text – die Melodie singst du so, wie du sie kennst.');
    const main = screen(root, { title: this.song.title, back: '#/lieder', theme: 'brass' }, this.stage, this.lyrics, controls);
    if (note) main.insertBefore(note, controls);
    main.classList.add('player');
  }

  private buildLyrics(): void {
    clear(this.lyrics);
    const lines: HTMLElement[] = [];
    for (let l = 0; l < this.song.lines; l++) lines.push(h('div', { class: 'lyric-line' }));
    let lastVisible = 0;
    this.song.events.forEach((e, i) => {
      if (e.hold || (!e.syllable && !e.chordChange)) {
        this.visibleOf[i] = lastVisible;
        this.els[i] = this.els[lastVisible];
        return;
      }
      const tab = e.midi !== null ? tabPosition(e.midi) : null;
      const el = h(
        'span',
        { class: `syl${e.joinNext ? ' join' : ''}` },
        h('span', { class: 'syl-chord' }, e.chordChange ? e.chord : ''),
        h('span', { class: 'syl-text' }, e.syllable ? e.syllable.replace(/‿/g, ' ') : ' '),
        h(
          'span',
          { class: `syl-tab${tab ? ` s${tab.string}` : ''}` },
          tab ? `${STRINGS[tab.string].name}${tab.fret}` : '',
        ),
      );
      lines[e.line].appendChild(el);
      this.els[i] = el;
      this.visibleOf[i] = i;
      lastVisible = i;
    });
    lines.forEach((l) => this.lyrics.appendChild(l));
    this.lineEls = lines;
  }

  // ---------- Anzeige ----------

  /** Gerade angezeigter „Jetzt“-Akkord – nur bei einem echten Wechsel wird animiert. */
  private shownChord = '';

  /**
   * Akkordkarten füllen. Mit `animate` rutscht bei einem Wechsel alles eine Position nach rechts: das alte „Jetzt“
   * hinaus, „Gleich“ ins „Jetzt“, der nächste Akkord von links ins „Gleich“ – kurz, nur damit das Auge folgt.
   */
  private showChords(idx: number, animate = false): void {
    const ev = this.song.events[Math.max(0, idx)];
    const name = ev.chord;
    const moving = animate && !reducedMotion() && !!this.shownChord && name !== this.shownChord;
    this.shownChord = name;

    const nowInner = h(
      'div',
      { class: 'card-inner' },
      h('div', { class: 'card-label' }, 'Jetzt'),
      h('div', { class: 'chord-name' }, name),
      chordDiagram(chord(name), { lefty: this.settings.lefty }),
    );
    const next = this.changes.find((c) => c > Math.max(0, idx));
    const nextInner = h('div', { class: 'card-inner' }, h('div', { class: 'card-label' }, 'Gleich'));
    if (next !== undefined) {
      const nn = this.song.events[next].chord;
      nextInner.appendChild(h('div', { class: 'chord-name' }, nn));
      nextInner.appendChild(chordDiagram(chord(nn), { lefty: this.settings.lefty, labels: false }));
      nextInner.appendChild(h('div', { class: 'beat-dots', 'aria-hidden': 'true' }));
    } else nextInner.appendChild(h('div', { class: 'chord-name end' }, 'Ende'));

    this.swap(this.nowCard, nowInner, moving);
    this.swap(this.nextCard, nextInner, moving);
  }

  private swap(card: HTMLElement, inner: HTMLElement, moving: boolean): void {
    const old = card.querySelector('.card-inner:not(.leaving)');
    if (moving && old) {
      // die alte Karte rutscht nach rechts hinaus und verschwindet; sie zählt nicht mehr als Inhalt
      old.classList.add('leaving');
      old.setAttribute('aria-hidden', 'true');
      window.setTimeout(() => old.parentNode && old.parentNode.removeChild(old), 320);
      inner.classList.add('entering');
    } else clear(card);
    card.appendChild(inner);
  }

  private highlight(idx: number): void {
    const vis = idx >= 0 ? this.visibleOf[idx] : -1;
    this.els.forEach((el, i) => {
      if (!el || this.visibleOf[i] !== i) return;
      el.classList.toggle('done', vis >= 0 && i < vis);
      el.classList.toggle('now', i === vis);
    });
    if (vis >= 0) {
      const el = this.els[vis];
      const ev = this.song.events[vis];
      // Füllbalken der Silbe läuft per CSS-Animation genau so lange wie die Silbe – kein Rechnen pro Frame
      el.style.animationDuration = `${(ev.dur * this.spb).toFixed(3)}s`;
      el.classList.remove('fill');
      void el.offsetWidth;
      if (this.phase === 'playing' && !reducedMotion()) el.classList.add('fill');
    }
    const line = idx >= 0 ? this.song.events[idx].line : 0;
    if (line !== this.lastLine) {
      this.lineEls.forEach((l, i) => {
        l.classList.toggle('cur', i === line);
        l.classList.toggle('nxt', i === line + 1);
      });
      this.lastLine = line;
    }
  }

  private updateDots(beat: number): void {
    const dots = this.nextCard.querySelector('.card-inner:not(.leaving) .beat-dots');
    if (!dots) return;
    const next = this.changes.find((c) => this.song.events[c].beat > beat + 1e-6);
    if (next === undefined) return;
    const remaining = Math.ceil(this.song.events[next].beat - beat - 1e-6);
    const n = Math.min(4, remaining);
    const html = remaining <= 4 ? new Array(n + 1).join('●') : '';
    if (dots.textContent !== html) dots.textContent = html;
  }

  private frame = (): void => {
    const beat = this.beatNow();
    if (this.phase === 'countin') {
      const n = Math.floor(-beat);
      const label = n >= 0 ? String(this.song.meter - n) : '';
      this.overlayText(label ? h('div', { class: 'count' }, label) : null);
      if (beat >= 0) {
        this.phase = 'playing';
        this.overlayText(null);
      }
    }
    if (this.phase === 'playing') {
      if (beat >= this.stopBeat - 1e-6) {
        this.enterWait(this.stopBeat);
      } else if (beat >= this.song.totalBeats) {
        this.finish();
        return;
      } else {
        const idx = eventAt(this.song, beat);
        if (idx !== this.lastIdx) {
          const prevChord = this.lastIdx >= 0 ? this.song.events[this.lastIdx].chord : '';
          this.lastIdx = idx;
          this.highlight(idx);
          if (this.song.events[idx].chord !== prevChord) this.showChords(idx, true);
        }
        this.updateDots(beat);
      }
    }
    if (this.phase === 'playing' || this.phase === 'countin') this.raf = requestAnimationFrame(this.frame);
  };

  private overlayText(node: Node | null): void {
    clear(this.overlay);
    if (node) this.overlay.appendChild(node);
    this.overlay.hidden = !node;
  }

  // ---------- Ablauf ----------

  private primary(): void {
    audio();
    switch (this.phase) {
      case 'idle':
      case 'done':
        void this.begin();
        break;
      case 'playing':
      case 'countin':
        this.pause();
        break;
      case 'paused':
        this.run(this.held, true);
        break;
      case 'waiting':
        this.confirmChord(false);
        break;
    }
  }

  private async begin(): Promise<void> {
    this.lastIdx = -2;
    this.held = 0;
    this.highlight(-1);
    this.showChords(0);
    if (!this.releaseWake) this.releaseWake = keepAwake();
    if (this.settings.waitMode) {
      this.micOk = await ensureMic();
      this.enterWait(0);
    } else {
      this.stopBeat = Infinity;
      this.run(0, true);
    }
  }

  /** Spielt ab Schlag `from`; mit Einzähler (ein Takt) beim Start und nach einer Pause. */
  private run(from: number, countIn: boolean): void {
    const ctx = audio();
    const lead = countIn ? this.song.meter : 0;
    this.start = ctx.currentTime + 0.12 + lead * this.spb - from * this.spb;
    this.scheduledTo = from - lead;
    this.phase = countIn ? 'countin' : 'playing';
    this.stopBeat = this.settings.waitMode ? this.nextChangeAfter(from) : Infinity;
    this.setPlayLabel();
    window.clearInterval(this.timer);
    this.timer = window.setInterval(() => this.schedule(), 25);
    this.schedule();
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(this.frame);
  }

  private nextChangeAfter(beat: number): number {
    const c = this.changes.find((i) => this.song.events[i].beat > beat + 1e-6);
    return c === undefined ? Infinity : this.song.events[c].beat;
  }

  /** Vorausplanung: alles, was in den nächsten 150 ms klingt, wird jetzt auf die Audio-Uhr gelegt. */
  private schedule(): void {
    const horizon = this.beatNow() + 0.15 / this.spb;
    const until = Math.min(horizon, this.stopBeat - 1e-6, this.song.totalBeats);
    const s = this.song;
    const spb = this.spb;
    const t = (b: number) => this.start + b * spb;
    // Schläge: Klick, Begleitung
    for (let b = Math.ceil(this.scheduledTo - 1e-6); b < until; b++) {
      if (b < this.scheduledTo - 1e-6) continue;
      const barPos = (((b - (s.pickup ? s.pickup - s.meter : 0)) % s.meter) + s.meter) % s.meter;
      // Zusammengesetzte Takte (6/8): Schlag = Achtel, Klick und Begleitung nur auf den beiden Hauptschlägen
      const strong = s.meter === 6 ? barPos % 3 === 0 : true;
      if (!strong) continue;
      if (b < 0 || this.settings.clickOn) click(t(b), barPos === 0, b < 0 ? 0.6 : 0.35);
      if (b >= 0 && this.settings.backing) {
        const ev = s.events[eventAt(s, b)];
        strum(ev.chord, t(b), barPos === 0 ? 0.3 : 0.2);
      }
    }
    // Melodie
    if (this.settings.melody)
      for (const e of s.events) {
        if (e.midi === null || e.beat < this.scheduledTo - 1e-6 || e.beat >= until) continue;
        pluck(e.midi, t(e.beat), 0.55);
      }
    if (until > this.scheduledTo) this.scheduledTo = until;
  }

  private pause(): void {
    this.held = Math.max(0, this.beatNow());
    this.phase = 'paused';
    window.clearInterval(this.timer);
    cancelAnimationFrame(this.raf);
    this.overlayText(h('div', { class: 'paused' }, 'Pause – tippen zum Weiterspielen'));
    this.setPlayLabel();
  }

  private enterWait(beat: number): void {
    window.clearInterval(this.timer);
    cancelAnimationFrame(this.raf);
    this.held = beat;
    this.phase = 'waiting';
    const idx = eventAt(this.song, beat + 1e-6);
    this.lastIdx = idx;
    this.highlight(idx);
    this.showChords(idx, true);
    const name = this.song.events[idx].chord;
    const hint = h('div', { class: 'hint-line' }, this.micOk ? 'Ich höre zu …' : 'Tippe auf „Geschafft“, wenn du so weit bist.');
    this.overlayText(
      h(
        'div',
        { class: 'wait' },
        h('div', { class: 'wait-title' }, 'Spiel jetzt ', h('b', null, name)),
        hint,
        button(h('span', null, icon('check'), ' Geschafft'), () => this.confirmChord(false), 'btn-primary'),
      ),
    );
    announce(`Spiel jetzt ${name}`);
    this.setPlayLabel();
    if (this.micOk) {
      const handle = (l: ChordListener) => {
        if (this.phase !== 'waiting') return l.stop();
        this.listener = l;
      };
      if (this.listener) this.listener.setExpected(name);
      else
        void listenForChord(name, {
          onHit: () => this.confirmChord(true),
          onVerdict: (v) => {
            if (!v || v.ok || v.weakString < 0) {
              this.hintStreak = { string: -1, count: 0 };
              return;
            }
            this.hintStreak =
              this.hintStreak.string === v.weakString
                ? { string: v.weakString, count: this.hintStreak.count + 1 }
                : { string: v.weakString, count: 1 };
            // Nur bei wiederholt gleicher Diagnose einen Tipp geben – einzelne Fehlmessungen sollen nicht frustrieren
            if (this.hintStreak.count === 4) {
              hint.textContent = diagnose(chord(name), v.weakString, v.weakKind);
              const svg = this.nowCard.querySelector('.card-inner:not(.leaving) svg');
              if (svg) svg.replaceWith(chordDiagram(chord(name), { lefty: this.settings.lefty, highlight: v.weakString }));
            }
          },
        }).then(handle, () => {
          this.micOk = false;
          hint.textContent = 'Tippe auf „Geschafft“, wenn du so weit bist.';
        });
    }
  }

  private confirmChord(heard: boolean): void {
    if (this.phase !== 'waiting') return;
    this.listener?.stop();
    this.listener = null;
    if (heard) {
      successSound();
      this.overlayText(h('div', { class: 'praise' }, praise()));
      announce('Richtig!');
    } else this.overlayText(null);
    const from = this.held;
    // Erster Akkord: danach Einzähler; mitten im Lied geht es direkt weiter
    window.setTimeout(() => {
      if (this.phase !== 'waiting') return;
      this.overlayText(null);
      this.run(from, from === 0);
    }, heard ? 450 : 0);
  }

  private finish(): void {
    window.clearInterval(this.timer);
    cancelAnimationFrame(this.raf);
    this.phase = 'done';
    this.listener?.stop();
    this.listener = null;
    this.highlight(this.song.events.length - 1);
    const stars = this.settings.waitMode ? 1 : this.settings.speed >= 1 ? 3 : 2;
    const improved = giveStars(this.song.id, stars);
    markPracticed();
    successSound();
    const total = load().stars[this.song.id] || 0;
    const next = this.settings.waitMode
      ? 'Nächster Stern: Spiel es mit „Läuft durch“.'
      : this.settings.speed < 1
        ? 'Nächster Stern: Spiel es im Original-Tempo.'
        : 'Du hast alle Sterne für dieses Lied!';
    this.overlayText(
      h(
        'div',
        { class: 'result' },
        h('div', { class: 'result-stars' }, ...[1, 2, 3].map((i) => icon('star', `icon star ${i <= total ? 'on' : 'off'}`))),
        h('div', { class: 'wait-title' }, improved ? 'Neuer Stern!' : 'Geschafft!'),
        h('p', null, total < 3 ? next : 'Du hast alle Sterne für dieses Lied!'),
        h(
          'div',
          { class: 'row' },
          button('Nochmal', () => void this.begin(), 'btn-primary'),
          h('a', { class: 'btn', href: '#/lieder' }, 'Andere Lieder'),
        ),
      ),
    );
    announce(improved ? 'Neuer Stern!' : 'Geschafft!');
    this.setPlayLabel();
  }

  private setPlayLabel(): void {
    const playing = this.phase === 'playing' || this.phase === 'countin';
    clear(this.playBtn);
    this.playBtn.appendChild(
      h(
        'span',
        null,
        icon(playing ? 'pause' : 'play'),
        h('span', { class: 'lbl' }, playing ? 'Pause' : this.phase === 'paused' ? 'Weiter' : this.phase === 'waiting' ? 'Geschafft' : 'Los geht’s'),
      ),
    );
  }

  private setMode(wait: boolean): void {
    save((p) => (p.settings.waitMode = wait));
    this.reset();
  }

  private setSpeed(v: number): void {
    const beat = this.beatNow();
    save((p) => (p.settings.speed = v));
    if (this.phase === 'playing') {
      this.start = audio().currentTime - beat * this.spb;
      this.scheduledTo = beat;
    }
  }

  /** Tonart wählen: Akkorde, Griffbilder, Melodie und Tabulatur wandern mit. */
  private setShift(shift: number): void {
    const n = ((((shift + 6) % 12) + 12) % 12) - 6;
    this.shift = n;
    save((p) => {
      if (n) p.keys[this.base.id] = n;
      else delete p.keys[this.base.id];
    });
    this.song = this.arrange();
    this.changes = chordChanges(this.song);
    this.buildLyrics();
    this.lastLine = -1;
    this.reset();
    this.drawKeyBox();
  }

  /** Gewählte Tonart, auf Wunsch mit leichteren Griffen. */
  private arrange(): Song {
    const t = transposeSong(this.base, this.shift);
    return this.settings.simplify ? simplifySong(t) : t;
  }

  private setSimplify(on: boolean): void {
    save((p) => (p.settings.simplify = on));
    this.setShift(this.shift);
  }

  private drawKeyBox(): void {
    const k = songKey(this.base);
    const suggest = suggestShift(this.base);
    const orig = originalShift(this.base);
    const label = (s: number) => keyLabel(k.root + s, k.minor);
    const marks = (s: number) => `${s === suggest ? ' ★' : ''}${orig !== null && s === orig ? ' ◆' : ''}`;
    clear(this.keyBox);
    const quick = (text: string, s: number) =>
      button(text, () => this.setShift(s), 'btn-seg', { 'aria-pressed': String(this.shift === s) });
    this.keyBox.appendChild(
      h(
        'div',
        { class: 'seg seg-wrap', role: 'group', 'aria-label': 'Tonart' },
        button('−', () => this.setShift(this.shift - 1), 'btn-seg', { 'aria-label': 'Einen Halbton tiefer' }),
        h('span', { class: 'key-now', 'aria-live': 'polite' }, `Tonart ${label(this.shift)}${marks(this.shift)}`),
        button('+', () => this.setShift(this.shift + 1), 'btn-seg', { 'aria-label': 'Einen Halbton höher' }),
      ),
    );
    this.keyBox.appendChild(
      h(
        'div',
        { class: 'seg seg-wrap' },
        quick(`Einfach: ${label(0)}${marks(0)}`, 0),
        suggest !== 0 ? quick(`★ Vorschlag: ${label(suggest)}`, suggest) : null,
        orig !== null && orig !== 0 && orig !== suggest ? quick(`◆ Original: ${label(orig)}`, orig) : null,
      ),
    );
    const swaps = simplifications(transposeSong(this.base, this.shift));
    const names = Object.keys(swaps);
    this.keyBox.appendChild(
      h(
        'div',
        { class: 'seg seg-wrap' },
        button('Einfache Griffe', () => this.setSimplify(!this.settings.simplify), 'btn-seg', { 'aria-pressed': String(this.settings.simplify) }),
      ),
    );
    this.keyBox.appendChild(
      h(
        'p',
        { class: 'small' },
        names.length
          ? `Einfache Griffe: ${names.map((n) => `${n} → ${swaps[n]}`).join(', ')} – klingt fast gleich, ist aber leichter zu greifen.`
          : 'Einfache Griffe: In dieser Tonart sind schon alle Griffe so leicht wie möglich.',
      ),
    );
    this.keyBox.appendChild(
      h(
        'p',
        { class: 'small' },
        '★ Vorschlag: bester Kompromiss aus einfachen Griffen, Stimmlage und Wiedererkennung.',
        orig !== null ? ' ◆ Original- bzw. Quellentonart.' : '',
      ),
    );
  }

  private reset(): void {
    window.clearInterval(this.timer);
    cancelAnimationFrame(this.raf);
    this.listener?.stop();
    this.listener = null;
    this.phase = 'idle';
    this.held = 0;
    this.lastIdx = -2;
    this.overlayText(null);
    this.highlight(-1);
    this.showChords(0);
    this.setPlayLabel();
  }

  cleanup = (): void => {
    window.clearInterval(this.timer);
    cancelAnimationFrame(this.raf);
    this.listener?.stop();
    this.releaseWake?.();
  };
}
