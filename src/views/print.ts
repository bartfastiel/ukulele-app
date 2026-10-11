import { h, clear } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, button, type View } from '../ui/screen.ts';
import { chordDiagram } from '../ui/chord-diagram.ts';
import { neckChart, type NeckString } from '../ui/neck-chart.ts';
import { findSong } from '../music/library.ts';
import { sheetChords, sheetLines } from '../music/sheet.ts';
import { CHORDS, ROOTS, chord, parseChordName, type Chord } from '../music/chords.ts';
import { capoHint, keyLabel, songKey, transposeSong } from '../music/transpose.ts';
import { simplifications, simplifySong } from '../music/simplify.ts';
import { activeTuning, baseInstrument, instrument, notesOnly } from '../music/instrument.ts';
import { tuningNotes } from '../ui/tuning.ts';
import { load, save } from '../store.ts';
import { noteText, ordinal, t, tk } from '../i18n.ts';
import { brand, go, link } from '../site/nav.ts';
import { NOTE_GROUPS } from './notes.ts';
import type { Song } from '../music/song.ts';

/** Liedblatt: nur Griffbilder (für Kinder), Akkordnamen mit Griff-Leiste oben, oder beides über dem Text. */
export type SheetMode = 'griff' | 'name' | 'beides';

const MODES: { id: SheetMode; label: string; hint: string }[] = [
  { id: 'griff', label: tk('Nur Griffbilder'), hint: tk('Über dem Text steht an jedem Wechsel das Griffbild – ganz ohne Akkordnamen. Am leichtesten zu lesen.') },
  { id: 'name', label: tk('Akkordnamen'), hint: tk('Über dem Text stehen die Akkordnamen, oben auf dem Blatt alle Griffbilder des Liedes.') },
  { id: 'beides', label: tk('Name und Griffbild'), hint: tk('Über dem Text stehen Akkordname und Griffbild zusammen – so lernst du die Namen nebenbei.') },
];

/** Umschalter wie im Player: ein Knopf je Wahl, der gewählte ist hell. */
function choice<T>(label: string, options: { value: T; text: string }[], now: T, pick: (v: T) => void): HTMLElement {
  return h(
    'div',
    { class: 'seg seg-wrap', role: 'group', 'aria-label': label },
    ...options.map((o) => {
      const b = button(o.text, () => {
        Array.prototype.forEach.call(b.parentNode!.children, (c: Element) => c.setAttribute('aria-pressed', 'false'));
        b.setAttribute('aria-pressed', 'true');
        pick(o.value);
      }, 'btn-seg', { 'aria-pressed': String(o.value === now) });
      return b;
    }),
  );
}

/** Bildschirm einer Druckansicht: Wahlknöpfe und „Drucken“ oben, darunter das Blatt, wie es aufs Papier kommt. */
function printScreen(root: HTMLElement, title: string, back: string, controls: (Node | null)[], preview: HTMLElement): void {
  const print = button(h('span', null, icon('print'), ' ', t('Drucken')), () => window.print(), 'btn-primary btn-play print-now');
  screen(
    root,
    { title, back, theme: 'pearl' },
    h(
      'section',
      { class: 'card print-controls no-print' },
      ...(controls.filter((c) => c !== null) as Node[]),
      h('div', { class: 'row' }, print),
      h('p', { class: 'small' }, t('Im Druckfenster kannst du auch „Als PDF sichern“ wählen.')),
    ),
    preview,
  );
}

function sheet(cls: string, ...content: (Node | null)[]): HTMLElement {
  return h('article', { class: `print-sheet ${cls}` }, ...content);
}

/** Fuß jedes Blattes: Herkunft klein, dazu die Seite, von der es stammt. */
function sheetFoot(...text: (string | null)[]): HTMLElement {
  return h('footer', { class: 'sheet-foot' }, ...text.filter((x) => !!x).map((x) => h('p', null, x)), h('p', null, brand()));
}

function tuningLabel(): string | null {
  const tu = activeTuning();
  return tu ? t('Stimmung: {name} ({notes})', { name: t(tu.name), notes: tuningNotes(tu.names) }) : null;
}

// ---------- Liedblatt ----------

/** Name über dem Text: der Akkord, beim E-Bass zusätzlich sein Grundton nur im Griffbild. */
function overChord(name: string, mode: SheetMode, lefty: boolean): HTMLElement {
  const ch = chord(name);
  return h(
    'span',
    { class: 'ps-over' },
    mode !== 'griff' ? h('b', { class: 'ps-name' }, name) : null,
    mode !== 'name' ? chordDiagram(ch, { print: true, lefty, labels: false }) : null,
  );
}

/** Griff-Leiste oben auf dem Blatt (Akkordnamen-Modus); beim E-Bass je Grundton einmal. */
function legend(song: Song, lefty: boolean): HTMLElement {
  const bass = notesOnly();
  const seen: string[] = [];
  const items: { label: string; ch: Chord }[] = [];
  for (const name of sheetChords(song)) {
    const p = parseChordName(name);
    const key = bass && p ? ROOTS[p.root] : name;
    if (seen.indexOf(key) >= 0) continue;
    seen.push(key);
    items.push({ label: bass ? noteText(key) : name, ch: chord(name) });
  }
  return h(
    'div',
    { class: 'ps-legend' },
    ...items.map((x) => h('figure', { class: 'ps-legend-chord' }, h('figcaption', null, x.label), chordDiagram(x.ch, { print: true, lefty, fingers: true, labels: false }))),
  );
}

/**
 * Braucht das Griffbild (bzw. der Name) mehr Platz als der Text bis zum nächsten Wechsel? Dann hält es den Platz frei,
 * sonst ragt es über den folgenden Text hinaus und das Wort bleibt in einem Stück. Gemessen in Zeichen: ein Griffbild
 * ist etwa so breit wie sechs bis acht Buchstaben.
 */
function needsRoom(chordName: string, text: string, mode: SheetMode): boolean {
  const strings = instrument().strings.length;
  const over = mode === 'name' ? chordName.length + 1 : Math.max(strings + 3, mode === 'beides' ? chordName.length + 1 : 0);
  return text.length < over;
}

export function songSheetNode(song: Song, mode: SheetMode, info: (string | null)[]): HTMLElement {
  const lefty = load().settings.lefty;
  const lines = sheetLines(song).map((line) =>
    h(
      'p',
      { class: 'ps-line' },
      ...line.map((p) =>
        h(
          'span',
          null,
          p.space ? ' ' : '',
          p.chord
            ? h(
                'span',
                { class: needsRoom(p.chord, p.word + p.rest, mode) ? 'ps-anchor' : 'ps-anchor ps-free' },
                overChord(p.chord, mode, lefty),
                h('span', { class: 'ps-word' }, p.word || ' '),
              )
            : p.word,
          p.rest,
        ),
      ),
    ),
  );
  return sheet(
    `song-sheet mode-${mode}`,
    h('header', { class: 'sheet-head' }, h('h2', null, song.title), h('p', { class: 'sheet-sub' }, info.filter((x) => !!x).join(' · '))),
    mode === 'name' ? legend(song, lefty) : null,
    h('div', { class: 'ps-lines' }, ...lines),
    sheetFoot(song.origin),
  );
}

export const songSheet: View = (root, id) => {
  const base = findSong(id);
  if (!base) {
    go('lieder');
    return;
  }
  const song: Song = base;
  const bass = notesOnly();
  let mode: SheetMode = 'griff';
  let shift = load().keys[song.id] || 0;
  const preview = h('div', { class: 'print-preview' });
  const keyBox = h('div', { class: 'key-box' });
  const modeHint = h('p', { class: 'small' }, t(MODES[0].hint));

  const arranged = (): Song => {
    const tr = transposeSong(song, shift);
    return load().settings.simplify && !bass ? simplifySong(tr) : tr;
  };
  const info = (): (string | null)[] => {
    const k = songKey(song);
    const capo = instrument().capo ? capoHint(song, shift) : null;
    const swaps = bass || !load().settings.simplify ? {} : simplifications(transposeSong(song, shift));
    const names = Object.keys(swaps);
    return [
      t(instrument().name),
      t('Tonart {key}', { key: keyLabel(k.root + shift, k.minor) }),
      capo ? t('Kapo {n}, greif wie {key}', { n: capo.capo, key: capo.shapes }) : null,
      names.length ? t('Einfache Griffe: {swaps}', { swaps: names.map((n) => `${n} → ${swaps[n]}`).join(', ') }) : null,
      tuningLabel(),
      load().settings.lefty ? t('Linkshänder') : null,
    ];
  };
  const draw = () => {
    clear(preview);
    preview.appendChild(songSheetNode(arranged(), mode, info()));
  };
  const drawKeys = () => {
    const k = songKey(song);
    clear(keyBox);
    keyBox.appendChild(
      h(
        'div',
        { class: 'seg seg-wrap', role: 'group', 'aria-label': t('Tonart') },
        button('−', () => setShift(shift - 1), 'btn-seg', { 'aria-label': t('Einen Halbton tiefer') }),
        h('span', { class: 'key-now', 'aria-live': 'polite' }, t('Tonart {key}', { key: keyLabel(k.root + shift, k.minor) })),
        button('+', () => setShift(shift + 1), 'btn-seg', { 'aria-label': t('Einen Halbton höher') }),
        shift ? button(t('Einfach: {key}', { key: keyLabel(k.root, k.minor) }), () => setShift(0), 'btn-seg') : null,
      ),
    );
    if (!bass) {
      const simple = load().settings.simplify;
      keyBox.appendChild(
        h(
          'div',
          { class: 'seg seg-wrap' },
          button(t('Einfache Griffe'), () => {
            save((p) => (p.settings.simplify = !simple));
            drawKeys();
            draw();
          }, 'btn-seg', { 'aria-pressed': String(simple) }),
        ),
      );
    }
  };
  // dieselbe Tonart wie im Lied: was hier gewählt wird, gilt auch beim Mitspielen
  const setShift = (to: number) => {
    shift = ((((to + 6) % 12) + 12) % 12) - 6;
    save((p) => {
      if (shift) p.keys[song.id] = shift;
      else delete p.keys[song.id];
    });
    drawKeys();
    draw();
  };
  drawKeys();
  draw();
  printScreen(
    root,
    t('Liedblatt: {title}', { title: song.title }),
    link(`lied/${song.id}`),
    [
      h('h2', null, t('Was steht über dem Text?')),
      choice(
        t('Was steht über dem Text?'),
        MODES.map((m) => ({ value: m.id, text: t(m.label) })),
        mode,
        (v) => {
          mode = v;
          modeHint.textContent = t(MODES.filter((m) => m.id === v)[0].hint);
          draw();
        },
      ),
      modeHint,
      keyBox,
    ],
    preview,
  );
};

// ---------- Griff-Übersicht ----------

const GROUPS: { title: string; test: (quality: string) => boolean }[] = [
  { title: tk('Dur'), test: (q) => q === '' },
  { title: tk('Moll'), test: (q) => q === 'm' },
  { title: tk('Septakkorde'), test: (q) => q === '7' },
  { title: tk('Weitere Akkorde'), test: (q) => q !== '' && q !== 'm' && q !== '7' },
];

function chartCell(label: string, ch: Chord, lefty: boolean): HTMLElement {
  return h('figure', { class: 'chart-chord' }, h('figcaption', null, label), chordDiagram(ch, { print: true, lefty, fingers: true }));
}

export function chordChartNode(): HTMLElement {
  const lefty = load().settings.lefty;
  const bass = notesOnly();
  const inst = t(instrument().name);
  const groups: { title: string; cells: HTMLElement[] }[] = bass
    ? NOTE_GROUPS.map((g) => ({ title: t(g.title), cells: g.names.map((n) => chartCell(noteText(n), chord(n), lefty)) }))
    : GROUPS.map((g) => ({
        title: t(g.title),
        cells: CHORDS.filter((c) => {
          const p = parseChordName(c.name);
          return !!p && g.test(p.quality);
        })
          .map((c, i) => ({ c, i }))
          // leichte zuerst, sonst wie in der Bibliothek
          .sort((a, b) => a.c.level - b.c.level || a.i - b.i)
          .map((x) => chartCell(x.c.name, x.c, lefty)),
      })).filter((g) => g.cells.length > 0);
  return sheet(
    'chord-chart',
    h(
      'header',
      { class: 'sheet-head' },
      h('h2', null, bass ? t('Töne auf dem {instrument}', { instrument: inst }) : t('Griffe für {instrument}', { instrument: inst })),
      h('p', { class: 'sheet-sub' }, [tuningLabel(), lefty ? t('Linkshänder') + ' –' : null, t('Zahlen: 1 Zeigefinger, 2 Mittelfinger, 3 Ringfinger, 4 kleiner Finger.'), bass ? null : t('o: leere Saite, x: nicht spielen.')].filter((x) => !!x).join(' ')),
    ),
    ...groups.map((g) => h('section', { class: 'chart-group' }, h('h3', null, g.title), h('div', { class: 'chart-grid' }, ...g.cells))),
    sheetFoot(bass ? t('Ab dem 5. Bund klingt jede Saite wie die nächste leer.') : null),
  );
}

export const chordChart: View = (root) => {
  const preview = h('div', { class: 'print-preview' }, chordChartNode());
  printScreen(root, notesOnly() ? t('Töne drucken') : t('Griffe drucken'), link('akkorde'), [h('p', null, t('Alle wichtigen Griffe auf einem Blatt – leichte zuerst.'))], preview);
};

// ---------- Hals ----------

const NECK_FRETS = 15;

/** Bundmarkierungen wie auf dem echten Instrument; die Ukulele-Griffbilder zeigen nur den 5. Bund. */
function neckInlays(): number[] {
  const base = baseInstrument().diagram.inlays;
  const list = base.length > 1 ? base.slice() : [5, 7, 10, 12];
  if (list.indexOf(15) < 0) list.push(15);
  return list;
}

/** Saiten in einer Stimmung ('' = Normalstimmung). */
function neckStrings(tuningId: string): NeckString[] {
  const inst = baseInstrument();
  const tu = (inst.tunings || []).filter((x) => x.id === tuningId)[0];
  return inst.strings.map((st, i) => ({ name: tu ? tu.names[i] : st.name, midi: tu ? tu.midi[i] : st.midi, start: st.start }));
}

export function neckSheetNode(tuningId: string, upright: boolean): HTMLElement {
  const inst = baseInstrument();
  const tu = (inst.tunings || []).filter((x) => x.id === tuningId)[0];
  const strings = neckStrings(tuningId);
  const lefty = load().settings.lefty;
  const notes = tuningNotes(strings.map((x) => x.name));
  return sheet(
    upright ? 'neck-sheet' : 'neck-sheet sheet-landscape',
    h(
      'header',
      { class: 'sheet-head' },
      h('h2', null, t('Alle Töne auf dem Hals')),
      h('p', { class: 'sheet-sub' }, [t(inst.name), tu ? t('Stimmung: {name} ({notes})', { name: t(tu.name), notes }) : t('Normalstimmung: {notes}', { notes }), lefty ? t('Linkshänder') : null].filter((x) => !!x).join(' · ')),
    ),
    h('div', { class: 'neck-wrap' }, neckChart(strings, { frets: NECK_FRETS, inlays: neckInlays(), lefty, upright })),
    h(
      'p',
      { class: 'sheet-note' },
      t('Im Kreis: Töne ohne # und b. Klein: Töne mit # oder b – zwei Namen für denselben Ton.'),
      ' ',
      t('Ab dem {fret} Bund wiederholt sich alles eine Oktave höher.', { fret: ordinal(12) }),
    ),
    sheetFoot(),
  );
}

export const neckView: View = (root) => {
  const inst = baseInstrument();
  const now = activeTuning();
  let tuning = now ? now.id : '';
  let upright = false;
  const preview = h('div', { class: 'print-preview' });
  const draw = () => {
    clear(preview);
    preview.appendChild(neckSheetNode(tuning, upright));
  };
  const orientHint = h('p', { class: 'small' });
  const hint = () => {
    orientHint.textContent = upright ? t('Hochkant wie ein Griffbild – passt auf ein Blatt im Hochformat.') : t('Quer wie eine Tabulatur. Falls der Drucker nicht von selbst Querformat nimmt, stell es im Druckfenster ein.');
  };
  hint();
  draw();
  const tunings = inst.tunings || [];
  printScreen(
    root,
    t('Hals drucken'),
    link(notesOnly() ? 'akkorde' : 'stimmen'),
    [
      choice(
        t('Ausrichtung'),
        [
          { value: false, text: t('Quer') },
          { value: true, text: t('Hochkant') },
        ],
        upright,
        (v) => {
          upright = v;
          hint();
          draw();
        },
      ),
      orientHint,
      tunings.length
        ? choice(
            t('Stimmung'),
            [{ value: '', text: t('Normalstimmung') }].concat(tunings.map((x) => ({ value: x.id, text: t(x.name) }))),
            tuning,
            (v) => {
              tuning = v;
              draw();
            },
          )
        : null,
    ],
    preview,
  );
};
