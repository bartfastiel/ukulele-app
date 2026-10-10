import { ROOTS, chord } from './chords.ts';

/**
 * Eigene Lieder einlesen: ChordPro (`[C]Text`) oder „Akkordzeile über Textzeile“ (die Spalte des Akkords bestimmt,
 * über welcher Silbe er steht). Ergebnis ist immer ChordPro, wie es `parseChordPro` liest.
 */

export type ImportFormat = 'chordpro' | 'chord-lines' | 'mixed' | 'none';

export interface ImportResult {
  chordpro: string;
  format: ImportFormat;
  /** erkannte Akkorde in App-Schreibweise, in der Reihenfolge ihres ersten Auftretens */
  chords: string[];
  /** Akkorde, für die es kein Griffbild gibt – sie werden weggelassen */
  unknown: string[];
  /** vereinfachte Akkorde, z. B. C9 → C7 oder C/G → C */
  simplified: { from: string; to: string }[];
  /** Textzeilen ohne eigenen Akkord (werden beim vorherigen Akkord mitgesungen) */
  linesWithoutChords: number;
  /** aus `{title: …}` */
  title: string | null;
  /** deutsche Schreibweise erkannt (H = B, B = Bb) */
  german: boolean;
}

export const MAX_TEXT = 20000;

const CHORD_LIKE = /^([A-H])([#b♯♭]?)((?:maj|min|dim|aug|sus|add|m|M|°|ø|Δ|\+|-|[0-9]|[#b♯♭])*)(?:\/([A-H][#b♯♭]?))?$/;
// Taktstriche, Wiederholungen und „kein Akkord“ dürfen in einer Akkordzeile stehen
const FILLER = /^(?:\|+:?|:?\|+|:+|[/.%–—-]+|\(?\d+x\)?|\(?x\d+\)?|N\.?C\.?|\*+)$/i;
const SECTION =
  /^\s*[[(]?\s*((?:\d+\.?\s*)?(?:intro|outro|vers(?:e)?|strophe|refrain|chorus|bridge|interlude|solo|pre-?chorus|zwischenspiel|instrumental|ende|schluss|coda|kehrreim)(?:\s*\d+)?\.?)\s*[\])]?\s*:?\s*$/i;

const PC: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11, H: 11 };

// Schreibweisen → Qualitäten der App (siehe QUALITY_INTERVALS); `to` ist nur eine Vereinfachung
const QUALITY: Record<string, { q: string; exact: boolean }> = {
  '': { q: '', exact: true },
  M: { q: '', exact: true },
  maj: { q: '', exact: true },
  m: { q: 'm', exact: true },
  min: { q: 'm', exact: true },
  '-': { q: 'm', exact: true },
  '7': { q: '7', exact: true },
  m7: { q: 'm7', exact: true },
  min7: { q: 'm7', exact: true },
  '-7': { q: 'm7', exact: true },
  maj7: { q: 'maj7', exact: true },
  M7: { q: 'maj7', exact: true },
  'Δ': { q: 'maj7', exact: true },
  'Δ7': { q: 'maj7', exact: true },
  '6': { q: '6', exact: true },
  m6: { q: 'm6', exact: true },
  sus: { q: 'sus4', exact: true },
  sus4: { q: 'sus4', exact: true },
  '4': { q: 'sus4', exact: true },
  sus2: { q: 'sus2', exact: true },
  '2': { q: 'sus2', exact: true },
  '7sus': { q: '7sus4', exact: true },
  '7sus4': { q: '7sus4', exact: true },
  add9: { q: 'add9', exact: true },
  add2: { q: 'add9', exact: true },
  dim: { q: 'dim', exact: true },
  '°': { q: 'dim', exact: true },
  dim7: { q: 'dim7', exact: true },
  '°7': { q: 'dim7', exact: true },
  m7b5: { q: 'm7b5', exact: true },
  'ø': { q: 'm7b5', exact: true },
  'ø7': { q: 'm7b5', exact: true },
  aug: { q: 'aug', exact: true },
  '+': { q: 'aug', exact: true },
  '#5': { q: 'aug', exact: true },
  '9': { q: '7', exact: false },
  '11': { q: '7', exact: false },
  '13': { q: '7', exact: false },
  '7b9': { q: '7', exact: false },
  '7#9': { q: '7', exact: false },
  m9: { q: 'm7', exact: false },
  m11: { q: 'm7', exact: false },
  maj9: { q: 'maj7', exact: false },
  '69': { q: '6', exact: false },
  '5': { q: '5', exact: true },
};

/** Sieht das Wort wie ein Akkordname aus (unabhängig davon, ob es ein Griffbild gibt)? */
export function looksLikeChord(token: string): boolean {
  return CHORD_LIKE.test(token);
}

/**
 * Akkordname in App-Schreibweise (C C# D Eb E F F# G Ab A Bb B + Qualität). `german`: H = B und B = Bb.
 * Liefert `exact: false`, wenn vereinfacht wurde; null, wenn es dafür kein Griffbild gibt.
 */
export function normalizeChord(raw: string, german = false): { name: string; exact: boolean } | null {
  const m = CHORD_LIKE.exec(raw.trim());
  if (!m) return null;
  let pc = PC[m[1]];
  const acc = m[2] === '♯' ? '#' : m[2] === '♭' ? 'b' : m[2];
  if (german && m[1] === 'B' && !acc) pc = 10;
  if (acc === '#') pc += 1;
  if (acc === 'b') pc -= 1;
  const qual = QUALITY[m[3].replace(/♯/g, '#').replace(/♭/g, 'b')];
  if (!qual) return null;
  const name = ROOTS[(pc + 12) % 12] + qual.q;
  try {
    chord(name);
  } catch {
    return null;
  }
  return { name, exact: qual.exact && !m[4] };
}

function expandTabs(line: string): string {
  if (line.indexOf('\t') < 0) return line;
  let out = '';
  for (const ch of line) {
    if (ch === '\t') out += ' '.repeat(8 - (out.length % 8));
    else out += ch;
  }
  return out;
}

interface ChordAt {
  col: number;
  raw: string;
}

/** Spalten der Akkorde, wenn die Zeile nur aus Akkorden (und Taktstrichen o. Ä.) besteht; sonst null. */
export function chordLine(line: string): ChordAt[] | null {
  if (/\[[^\]]*\]/.test(line) || /^\s*\{/.test(line)) return null;
  const plain = line.replace(/[|()]/g, ' ');
  const re = /\S+/g;
  const out: ChordAt[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(plain))) {
    const tok = m[0];
    if (looksLikeChord(tok)) out.push({ col: m.index, raw: tok });
    else if (!FILLER.test(tok)) return null;
  }
  return out.length ? out : null;
}

function sectionLabel(line: string): string | null {
  const m = SECTION.exec(line);
  return m ? m[1].trim() : null;
}

/** Akkorde an ihren Spalten in die Textzeile setzen; Akkorde hinter dem Textende kommen ans Zeilenende. */
function merge(chords: ChordAt[], text: string): string {
  let t = text.replace(/\s+$/, '');
  const last = chords[chords.length - 1].col;
  while (t.length < last) t += ' ';
  for (let i = chords.length - 1; i >= 0; i--) {
    let col = chords[i].col;
    // steht der Akkord über dem Leerzeichen vor einem Wort, gehört er zu diesem Wort
    if (t.charAt(col) === ' ' && /\S/.test(t.charAt(col + 1)) && (i + 1 >= chords.length || chords[i + 1].col > col + 1)) col++;
    t = t.slice(0, col) + `[${chords[i].raw}]` + t.slice(col);
  }
  return t;
}

export function importSong(input: string): ImportResult {
  const lines = input
    .slice(0, MAX_TEXT)
    .replace(/\r\n?/g, '\n')
    .replace(/[\u00a0\u2007\u202f]/g, ' ')
    .replace(/[\u200b\ufeff]/g, '')
    .split('\n')
    .map(expandTabs);
  let title: string | null = null;
  let bracketChords = 0;
  let chordLines = 0;
  // deutsche Schreibweise, sobald irgendwo ein H-Akkord vorkommt
  let german = false;
  const scan = (raw: string) => {
    if (/^H/.test(raw) && looksLikeChord(raw)) german = true;
  };
  lines.forEach((l) => {
    const cl = chordLine(l);
    if (cl) cl.forEach((c) => scan(c.raw));
    const re = /\[([^\]:]+)(?::[^\]]*)?\]/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(l))) {
      const raw = m[1].trim();
      scan(raw);
      if (looksLikeChord(raw)) bracketChords++;
    }
  });

  const out: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const directive = /^\s*\{\s*(title|t)\s*:\s*(.*?)\s*\}\s*$/i.exec(line);
    if (directive) {
      if (!title && directive[2]) title = directive[2];
      continue;
    }
    if (/^\s*\{/.test(line)) {
      out.push(line.trim());
      continue;
    }
    const label = sectionLabel(line);
    if (label) {
      out.push(`{c: ${label}}`);
      continue;
    }
    const cl = chordLine(line);
    if (cl) {
      chordLines++;
      const next = lines[i + 1];
      if (next !== undefined && next.trim() && !chordLine(next) && !sectionLabel(next) && !/^\s*\{/.test(next) && !/\[[^\]]*\]/.test(next)) {
        out.push(merge(cl, next));
        i++;
      } else out.push(cl.map((c) => `[${c.raw}]`).join(' '));
      continue;
    }
    out.push(line);
  }

  const chords: string[] = [];
  const unknown: string[] = [];
  const simplified: { from: string; to: string }[] = [];
  let linesWithoutChords = 0;
  let seenChord = false;
  const result = out
    .map((line) => {
      if (/^\s*\{/.test(line)) return line;
      const fixed = line.replace(/\[([^\]]*)\]/g, (_all, inner: string) => {
        const parts = inner.split(':');
        const raw = parts[0].trim();
        const beats = parts.length > 1 && /^\d+(\.\d+)?$/.test(parts[1].trim()) ? Number(parts[1].trim()) : 0;
        if (!raw) return '';
        const n = normalizeChord(raw, german);
        if (!n) {
          if (unknown.indexOf(raw) < 0) unknown.push(raw);
          return '';
        }
        if (!n.exact && !simplified.some((x) => x.from === raw)) simplified.push({ from: raw, to: n.name });
        if (chords.indexOf(n.name) < 0) chords.push(n.name);
        return `[${n.name}${beats > 0 && beats <= 64 ? `:${beats}` : ''}]`;
      });
      if (fixed.trim()) {
        if (/\[/.test(fixed)) seenChord = true;
        else if (seenChord) linesWithoutChords++;
      }
      return fixed.replace(/ {2,}/g, ' ').replace(/\s+$/, '');
    })
    // höchstens eine Leerzeile zwischen Abschnitten
    .filter((l, i, arr) => l.trim() || (i > 0 && arr[i - 1].trim()))
    .join('\n')
    .trim();

  const format: ImportFormat = !chords.length ? 'none' : chordLines && bracketChords ? 'mixed' : chordLines ? 'chord-lines' : 'chordpro';
  return { chordpro: result, format, chords, unknown, simplified, linesWithoutChords, title, german };
}
