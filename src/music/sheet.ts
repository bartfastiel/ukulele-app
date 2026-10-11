import type { Song } from './song.ts';

/** Ein Stück einer Liedzeile: beginnt mit einem Akkordwechsel (oder am Zeilenanfang ohne Wechsel). */
export interface SheetPiece {
  /** Akkord, der hier wechselt; '' = kein Wechsel (Zeilenanfang). */
  chord: string;
  /** Leerzeichen vor dem Stück (zwischen zwei Wörtern); fehlt bei einem Wechsel mitten im Wort. */
  space: boolean;
  /** erstes Wort(-stück) direkt unter dem Akkord – steht mit ihm zusammen, damit er nie allein am Zeilenende hängt */
  word: string;
  /** übriger Text bis zum nächsten Wechsel, beginnt mit einem Leerzeichen oder ist leer */
  rest: string;
}

/**
 * Liedblatt: Text Zeile für Zeile, jeder Akkordwechsel an seiner Silbe. Gehaltene Töne und Pausen ohne Wechsel fallen
 * weg; ein Wechsel auf einer Pause steht für sich (ohne Text darunter).
 */
export function sheetLines(song: Song): SheetPiece[][] {
  const lines: { chord: string; space: boolean; text: string }[][] = [];
  let line = -1;
  let needSpace = false;
  for (const e of song.events) {
    if (e.hold) continue;
    const syl = e.syllable.replace(/‿/g, ' ');
    if (!syl && !e.chordChange) continue;
    if (e.line !== line) {
      line = e.line;
      lines.push([]);
      needSpace = false;
    }
    const pieces = lines[lines.length - 1];
    if (e.chordChange || !pieces.length) {
      pieces.push({ chord: e.chordChange ? e.chord : '', space: needSpace && pieces.length > 0, text: '' });
      needSpace = false;
    }
    const p = pieces[pieces.length - 1];
    if (!syl) continue;
    p.text += (needSpace && p.text ? ' ' : '') + syl;
    needSpace = !e.joinNext;
  }
  return lines
    .filter((l) => l.some((p) => p.chord || p.text.trim()))
    .map((l) =>
      l.map((p) => {
        const m = /^(\S*)([\s\S]*)$/.exec(p.text)!;
        return { chord: p.chord, space: p.space, word: m[1], rest: m[2] };
      }),
    );
}

/** Akkorde des Liedes in der Reihenfolge ihres ersten Auftretens. */
export function sheetChords(song: Song): string[] {
  const out: string[] = [];
  for (const e of song.events) if (out.indexOf(e.chord) < 0) out.push(e.chord);
  return out;
}
