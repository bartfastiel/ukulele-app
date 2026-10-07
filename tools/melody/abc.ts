// Kleiner Leser für ABC-Notation (Teilmenge): eine Stimme, Akkordsymbole in Anführungszeichen, Liedtext in w:-Zeilen.
// Wiederholungszeichen werden nicht ausgewertet – Wiederholungen ausschreiben. Ergebnis wie parseLily(), damit
// import.ts beide Quellen gleich behandelt. Bögen „( )“ sind nur Phrasierung; ein Melisma steht im Text als „_“.
import type { LyChord, LyNote, LyScore, LySyllable } from './lily.ts';

export interface AbcScore extends LyScore {
  /** S:-Feld – Herkunft der Melodie */
  source: string;
  title: string;
}

const LETTERS = 'CDEFGAB';
const NATURAL = [0, 2, 4, 5, 7, 9, 11];
const MODES: Record<string, number> = { '': 0, maj: 0, ion: 0, m: 9, min: 9, aeo: 9, dor: 2, phr: 4, lyd: 5, mix: 7, loc: 11 };

function pcOf(name: string): number {
  const base = NATURAL[LETTERS.indexOf(name[0].toUpperCase())];
  const acc = name.slice(1);
  return (base + (acc === '#' ? 1 : acc === 'b' ? -1 : 0) + 12) % 12;
}

/** Vorzeichen der Tonart: Halbtonverschiebung je Stammton C…B. */
function keySignature(tonic: number, mode: number): number[] {
  const major = (tonic - mode + 12) % 12;
  const scale = [0, 2, 4, 5, 7, 9, 11].map((x) => (major + x) % 12);
  // Stammtöne der Durtonleiter: ab dem Buchstaben der Tonika fortlaufend – b-Tonarten mit b, sonst mit #
  const flatKeys = [5, 10, 3, 8, 1, 6];
  const useFlats = flatKeys.includes(major);
  const sig = [0, 0, 0, 0, 0, 0, 0];
  for (const pc of scale) {
    let letter = NATURAL.indexOf(pc);
    if (letter >= 0) continue;
    letter = useFlats ? NATURAL.indexOf((pc + 1) % 12) : NATURAL.indexOf((pc + 11) % 12);
    sig[letter] = useFlats ? -1 : 1;
  }
  return sig;
}

function chordSymbol(text: string): { root: number; quality: string } | null {
  const m = /^([A-G][#b]?)(m(?!aj)|min)?(maj7|7|6|dim|aug|sus4|sus2)?/.exec(text);
  if (!m) return null;
  const minor = !!m[2];
  const ext = m[3] || '';
  const quality = minor ? (ext === '7' ? 'm7' : ext === '6' ? 'm6' : 'm') : ext;
  return { root: pcOf(m[1]), quality };
}

function lyricLine(text: string, out: LySyllable[]): void {
  const re = /\\-|[^\s\-_*~|]+(?:~[^\s\-_*|]+)*|-|_|\*|\|/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const t = m[0];
    if (t === '-') {
      if (out.length) out[out.length - 1].hyphen = true;
    } else if (t === '_' || t === '*') out.push({ text: '', hyphen: false, skip: true });
    else if (t === '|') continue;
    else out.push({ text: t.replace(/~/g, ' ').replace(/\\-/g, '-'), hyphen: false, skip: false });
  }
}

export function parseAbc(src: string): AbcScore {
  let unit = 0.5;
  let timeNum = 4;
  let timeDen = 4;
  let tonic = 0;
  let mode = 0;
  let sig = [0, 0, 0, 0, 0, 0, 0];
  let source = '';
  let title = '';
  const notes: LyNote[] = [];
  const syl: LySyllable[] = [];
  const chords: LyChord[] = [];
  let firstBar: number | null = null;
  let pos = 0;
  for (const rawLine of src.split('\n')) {
    const line = rawLine.replace(/%.*$/, '').trim();
    if (!line) continue;
    const field = /^([A-Za-z]):\s*(.*)$/.exec(line);
    if (field) {
      const k = field[1];
      const v = field[2].trim();
      if (k === 'L') {
        const p = v.split('/');
        unit = (Number(p[0]) / Number(p[1])) * 4;
      } else if (k === 'M') {
        const p = v === 'C' ? ['4', '4'] : v === 'C|' ? ['2', '2'] : v.split('/');
        timeNum = Number(p[0]);
        timeDen = Number(p[1]);
      } else if (k === 'K') {
        const km = /^([A-G][#b]?)\s*([A-Za-z]*)/.exec(v)!;
        tonic = pcOf(km[1]);
        mode = MODES[km[2].toLowerCase().slice(0, 3)] ?? 0;
        if (km[2] === 'm') mode = 9;
        sig = keySignature(tonic, mode);
      } else if (k === 'S') source = source ? `${source} ${v}` : v;
      else if (k === 'T' && !title) title = v;
      else if (k === 'w') lyricLine(v, syl);
      continue;
    }
    // Notenzeile
    const barAcc = new Map<string, number>();
    let tuplet = 0;
    let tupletFactor = 1;
    let broken = 1;
    for (let i = 0; i < line.length; ) {
      const c = line[i];
      if (c === '"') {
        const end = line.indexOf('"', i + 1);
        const text = line.slice(i + 1, end);
        const sym = chordSymbol(text);
        if (sym) chords.push({ root: sym.root, quality: sym.quality, dur: 0 });
        i = end + 1;
        continue;
      }
      if (c === '|' || c === ':' || c === ']' || (c === '[' && /[|\d]/.test(line[i + 1] || ''))) {
        if (c === '|' && firstBar === null) firstBar = pos;
        barAcc.clear();
        i++;
        while (i < line.length && /[|:\]\d]/.test(line[i])) i++;
        continue;
      }
      if (c === '!' || c === '+') {
        i = line.indexOf(c, i + 1) + 1;
        continue;
      }
      if (c === '{') {
        i = line.indexOf('}', i) + 1;
        continue;
      }
      if (c === '(') {
        if (/\d/.test(line[i + 1] || '')) {
          tuplet = Number(line[i + 1]);
          tupletFactor = tuplet === 3 ? 2 / 3 : tuplet === 2 ? 3 / 2 : tuplet === 4 ? 3 / 4 : 1;
          i += 2;
        } else i++;
        continue;
      }
      if (c === '-') {
        if (notes.length) notes[notes.length - 1].tie = true;
        i++;
        continue;
      }
      if (c === '>' || c === '<') {
        const last = notes[notes.length - 1];
        const f = c === '>' ? 1.5 : 0.5;
        if (last) {
          const before = last.dur;
          last.dur *= f;
          pos += last.dur - before;
          if (chords.length) chords[chords.length - 1].dur += last.dur - before;
        }
        broken = c === '>' ? 0.5 : 1.5;
        i++;
        continue;
      }
      const m = /^(\^\^|\^|__|_|=)?([A-Ga-gzx])([',]*)(\d*)(\/*)(\d*)/.exec(line.slice(i));
      if (!m) {
        i++;
        continue;
      }
      i += m[0].length;
      let len = m[4] ? Number(m[4]) : 1;
      const slashes = m[5].length;
      if (slashes) len /= m[6] ? Number(m[6]) : 2 ** slashes;
      let dur = unit * len * broken;
      broken = 1;
      if (tuplet > 0) {
        dur *= tupletFactor;
        tuplet--;
      }
      let midi: number | null = null;
      if (m[2] !== 'z' && m[2] !== 'x') {
        const upper = m[2].toUpperCase();
        const letter = LETTERS.indexOf(upper);
        let octave = m[2] === upper ? 4 : 5;
        octave += (m[3].match(/'/g) || []).length - (m[3].match(/,/g) || []).length;
        const key = `${upper}${octave}`;
        if (m[1]) barAcc.set(key, m[1] === '^' ? 1 : m[1] === '^^' ? 2 : m[1] === '_' ? -1 : m[1] === '__' ? -2 : 0);
        const acc = barAcc.has(key) ? barAcc.get(key)! : sig[letter];
        midi = (octave + 1) * 12 + NATURAL[letter] + acc;
      }
      notes.push({ midi, dur, tie: false, slurStart: false, slurEnd: false });
      if (chords.length) chords[chords.length - 1].dur += dur;
      else chords.push({ root: -1, quality: '', dur });
      pos += dur;
    }
  }
  const bar = (timeNum * 4) / timeDen;
  const partial = firstBar !== null && firstBar > 1e-6 && firstBar < bar - 1e-6 ? firstBar : 0;
  return {
    notes,
    verses: [syl],
    chords: chords.some((c) => c.root >= 0) ? chords : null,
    timeNum,
    timeDen,
    partial,
    keyTonic: tonic,
    minor: mode === 9,
    source,
    title,
  };
}
