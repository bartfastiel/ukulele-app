import { h } from './dom.ts';
import type { Song } from '../music/song.ts';
import type { ImportResult } from '../music/import.ts';

/** Liedtext mit Akkorden über den Wörtern, wie er im Player erscheint – nur ruhig, ohne Ablauf. */
export function songPreview(song: Song): HTMLElement {
  const box = h('div', { class: 'pv-lyrics' });
  const lines: HTMLElement[] = [];
  for (let l = 0; l < song.lines; l++) lines.push(h('div', { class: 'pv-line' }));
  for (const e of song.events) {
    if (!e.syllable && !e.chordChange) continue;
    lines[e.line].appendChild(
      h(
        'span',
        { class: `pv-syl${e.joinNext ? ' join' : ''}` },
        h('span', { class: 'pv-chord' }, e.chordChange ? e.chord : ''),
        h('span', { class: 'pv-text' }, e.syllable || ' '),
      ),
    );
  }
  lines.forEach((l) => box.appendChild(l));
  return box;
}

const FORMAT: Record<string, string> = {
  chordpro: 'Akkorde in eckigen Klammern, z. B. [C]',
  'chord-lines': 'Akkordzeilen über dem Text',
  mixed: 'Akkorde in Klammern und Akkordzeilen',
};

/** Freundliche Hinweise zum Einlesen: erkanntes Format, Akkorde, was weggelassen oder vereinfacht wurde. */
export function importNotes(r: ImportResult): HTMLElement {
  const box = h('div', { class: 'pv-notes', 'aria-live': 'polite' });
  if (!r.chords.length) {
    box.appendChild(
      h('p', { class: 'note-warn' }, 'Ich finde noch keine Akkorde. Schreib sie in eckige Klammern wie [C] oder in eine eigene Zeile über den Text.'),
    );
    return box;
  }
  box.appendChild(h('p', null, h('strong', null, 'Erkannt: '), FORMAT[r.format] || ''));
  box.appendChild(h('div', { class: 'chip-row' }, ...r.chords.map((c) => h('span', { class: 'chip chip-big' }, c))));
  if (r.german) box.appendChild(h('p', { class: 'small' }, 'Deutsche Schreibweise erkannt: H heißt hier B, und B heißt Bb.'));
  if (r.simplified.length)
    box.appendChild(h('p', { class: 'small' }, 'Etwas einfacher gemacht: ' + r.simplified.map((x) => `${x.from} → ${x.to}`).join(', ') + '.'));
  if (r.unknown.length)
    box.appendChild(
      h(
        'p',
        { class: 'note-warn' },
        `Diese Akkorde kenne ich nicht: ${r.unknown.join(', ')}. Ich lasse sie weg – du kannst sie im Text ändern.`,
      ),
    );
  if (r.linesWithoutChords)
    box.appendChild(
      h(
        'p',
        { class: 'small' },
        r.linesWithoutChords === 1
          ? '1 Zeile hat keinen eigenen Akkord – sie wird beim Akkord davor mitgesungen.'
          : `${r.linesWithoutChords} Zeilen haben keinen eigenen Akkord – sie werden beim Akkord davor mitgesungen.`,
      ),
    );
  return box;
}
