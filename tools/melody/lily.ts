// Liest die Melodie (erste Stimme), Liedsilben und ggf. Begleitakkorde aus einem LilyPond-Notenbeispiel, wie es in
// Wikipedia-Artikeln steht. Bewusst nur die Teilmenge, die dort vorkommt – kein vollständiger LilyPond-Interpreter.

export interface LyNote {
  /** MIDI-Tonhöhe, null = Pause */
  midi: number | null;
  /** Dauer in Vierteln */
  dur: number;
  tie: boolean;
  slurStart: boolean;
  slurEnd: boolean;
}

export interface LySyllable {
  text: string;
  /** Wort geht weiter („--“) */
  hyphen: boolean;
  /** „_“: Note ohne neue Silbe */
  skip: boolean;
}

export interface LyChord {
  root: number;
  quality: string;
  dur: number;
}

export interface LyScore {
  notes: LyNote[];
  verses: LySyllable[][];
  chords: LyChord[] | null;
  timeNum: number;
  timeDen: number;
  /** Auftakt in Vierteln */
  partial: number;
  keyTonic: number;
  minor: boolean;
}

type Tok = string;

function stripComments(src: string): string {
  return src.replace(/%\{[\s\S]*?%\}/g, ' ').replace(/%[^\n]*/g, ' ');
}

function tokenize(src: string): Tok[] {
  const out: Tok[] = [];
  const re = /"(?:\\.|[^"\\])*"|<<|>>|\\\\|\\[A-Za-z]+|--|__|[{}<>()\[\]~|=]|[^\s{}<>()\[\]~|="\\]+/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) out.push(m[0]);
  return out;
}

/** Klammerausdruck ab Index i (bei „{“ oder „<<“) – liefert Ende (exklusiv). */
function blockEnd(t: Tok[], i: number): number {
  const open = t[i];
  const close = open === '{' ? '}' : '>>';
  let depth = 0;
  for (let j = i; j < t.length; j++) {
    if (t[j] === open) depth++;
    else if (t[j] === close) {
      depth--;
      if (depth === 0) return j + 1;
    }
  }
  return t.length;
}

function parsePitchName(name: string, lang: string): { step: number; pc: number } | null {
  // Schritt (c=0 … h/b=6) für die Oktavwahl im relativen Modus, Tonklasse für die Tonhöhe
  const steps = 'cdefgab';
  const base: Record<string, number> = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
  let letter: string;
  let rest: string;
  let pc: number;
  if (lang === 'deutsch' && name === 'b') return { step: 6, pc: 10 };
  if (lang === 'deutsch' && name[0] === 'h') {
    letter = 'b';
    rest = name.slice(1);
  } else if (name === 'es' || name === 'eses' || name === 'as' || name === 'ases') {
    letter = name[0];
    rest = name.slice(1).replace(/^s/, 'es');
  } else {
    letter = name[0];
    rest = name.slice(1);
    if (lang === 'deutsch' && letter === 'h') return null;
  }
  if (!(letter in base)) return null;
  if (!/^(is|es)*$/.test(rest)) return null;
  pc = base[letter] + (rest.match(/is/g) || []).length - (rest.match(/es/g) || []).length;
  return { step: steps.indexOf(letter), pc: ((pc % 12) + 12) % 12 };
}

interface Ctx {
  lang: string;
  vars: Map<string, Tok[]>;
  rel: { step: number; octave: number } | null;
  dur: number;
  timeNum: number;
  timeDen: number;
  partial: number;
  keyTonic: number;
  minor: boolean;
  scale: number;
  slurOpen: boolean;
  beamMelisma: boolean;
}

function absPitch(ctx: Ctx, step: number, pc: number, marks: string): number {
  const up = (marks.match(/'/g) || []).length;
  const down = (marks.match(/,/g) || []).length;
  let octave: number;
  if (ctx.rel) {
    // nächstgelegene Oktave (höchstens eine Quarte entfernt), dann Oktavzeichen
    let diff = step - ctx.rel.step;
    octave = ctx.rel.octave;
    if (diff > 3) octave--;
    else if (diff < -3) octave++;
    diff = 0;
    octave += up - down;
    ctx.rel = { step, octave };
  } else {
    octave = 3 + up - down; // c = C3 (MIDI 48), c' = C4
  }
  return (octave + 1) * 12 + pc;
}

function parseDuration(ctx: Ctx, text: string): void {
  const m = /^(\d+)(\.*)(?:\*(\d+)(?:\/(\d+))?)?/.exec(text);
  if (!m) return;
  let d = 4 / Number(m[1]);
  let add = d;
  for (let i = 0; i < m[2].length; i++) {
    add /= 2;
    d += add;
  }
  if (m[3]) d *= Number(m[3]) / Number(m[4] || 1);
  ctx.dur = d;
}

const SKIP_ONE = new Set(['\\clef', '\\tempo', '\\mark', '\\bar', '\\override', '\\set', '\\once', '\\revert', '\\markup', '\\tweak', '\\omit', '\\hide', '\\unset', '\\midiInstrument', '\\label']);

/** Melodie aus Tokens lesen (erste Stimme bei `<< … \\ … >>`). */
function music(t: Tok[], ctx: Ctx, out: LyNote[]): void {
  for (let i = 0; i < t.length; i++) {
    const tok = t[i];
    if (tok === '{') {
      const end = blockEnd(t, i);
      music(t.slice(i + 1, end - 1), ctx, out);
      i = end - 1;
    } else if (tok === '<<') {
      const end = blockEnd(t, i);
      const inner = t.slice(i + 1, end - 1);
      // erste Stimme: bis zum ersten „\\“ auf oberster Ebene, sonst erster Block
      let depth = 0;
      let cut = inner.length;
      for (let j = 0; j < inner.length; j++) {
        if (inner[j] === '{' || inner[j] === '<<') depth++;
        else if (inner[j] === '}' || inner[j] === '>>') depth--;
        else if (depth === 0 && inner[j] === '\\\\') {
          cut = j;
          break;
        }
      }
      let first = inner.slice(0, cut);
      if (cut === inner.length) {
        // mehrere Stimmen nebeneinander: nur bis zur zweiten „\new“ auf oberster Ebene bzw. erster Block
        const news: number[] = [];
        let d = 0;
        for (let j = 0; j < first.length; j++) {
          if (first[j] === '{' || first[j] === '<<') d++;
          else if (first[j] === '}' || first[j] === '>>') d--;
          else if (d === 0 && first[j] === '\\new') news.push(j);
        }
        if (news.length > 1) first = first.slice(news[0], news[1]);
        else {
          const b = first.indexOf('{');
          if (b >= 0) first = first.slice(0, blockEnd(first, b));
        }
      }
      music(first, ctx, out);
      i = end - 1;
    } else if (tok === '\\relative') {
      const m = /^([a-h](?:is|es|s)*)([',]*)$/.exec(t[i + 1] || '');
      if (m) {
        const p = parsePitchName(m[1], ctx.lang)!;
        const up = (m[2].match(/'/g) || []).length;
        const down = (m[2].match(/,/g) || []).length;
        ctx.rel = { step: p.step, octave: 3 + up - down };
        i++;
      } else ctx.rel = { step: 3, octave: 3 }; // ohne Startton: relativ zu f
    } else if (tok === '\\fixed' || tok === '\\transpose') {
      i += tok === '\\transpose' ? 2 : 1;
    } else if (tok === '\\time') {
      const m = /^(\d+)\/(\d+)$/.exec(t[i + 1] || '');
      if (m) {
        ctx.timeNum = Number(m[1]);
        ctx.timeDen = Number(m[2]);
      }
      i++;
    } else if (tok === '\\key') {
      const p = parsePitchName(t[i + 1] || '', ctx.lang);
      if (p) ctx.keyTonic = p.pc;
      ctx.minor = t[i + 2] === '\\minor';
      i += 2;
    } else if (tok === '\\partial') {
      const save = ctx.dur;
      parseDuration(ctx, t[i + 1] || '4');
      ctx.partial = ctx.dur;
      ctx.dur = save;
      i++;
    } else if (tok === '\\repeat') {
      const kind = t[i + 1];
      const times = Number(t[i + 2]) || 2;
      const start = i + 3;
      if (t[start] !== '{') continue;
      const end = blockEnd(t, start);
      const body = t.slice(start + 1, end - 1);
      let alts: Tok[][] = [];
      let next = end;
      if (t[end] === '\\alternative' && t[end + 1] === '{') {
        const aEnd = blockEnd(t, end + 1);
        const inner = t.slice(end + 2, aEnd - 1);
        for (let j = 0; j < inner.length; j++)
          if (inner[j] === '{') {
            const e = blockEnd(inner, j);
            alts.push(inner.slice(j + 1, e - 1));
            j = e - 1;
          }
        next = aEnd;
      }
      // Wiederholungen ausschreiben – Liedtexte in Wikipedia schreiben die zweite Runde meist aus
      // Relative Tonhöhen gelten wie geschrieben (einmal ausgewertet), erst danach wird ausgeschrieben
      const n = kind === 'unfold' || kind === 'volta' ? times : 1;
      const bodyNotes: LyNote[] = [];
      music(body, ctx, bodyNotes);
      const altNotes = alts.map((a) => {
        const x: LyNote[] = [];
        music(a, ctx, x);
        return x;
      });
      for (let k = 0; k < n; k++) {
        out.push(...bodyNotes.map((x) => ({ ...x })));
        if (altNotes.length) out.push(...altNotes[Math.min(k, altNotes.length - 1)].map((x) => ({ ...x })));
      }
      i = next - 1;
      alts = [];
    } else if (tok === '\\times' || tok === '\\tuplet') {
      const m = /^(\d+)\/(\d+)$/.exec(t[i + 1] || '');
      const factor = m ? (tok === '\\times' ? Number(m[1]) / Number(m[2]) : Number(m[2]) / Number(m[1])) : 1;
      const start = i + 2;
      if (t[start] !== '{') continue;
      const end = blockEnd(t, start);
      const save = ctx.scale;
      ctx.scale *= factor;
      music(t.slice(start + 1, end - 1), ctx, out);
      ctx.scale = save;
      i = end - 1;
    } else if (tok === '\\grace' || tok === '\\acciaccatura' || tok === '\\appoggiatura') {
      if (t[i + 1] === '{') i = blockEnd(t, i + 1) - 1;
      else i++;
    } else if (SKIP_ONE.has(tok)) {
      // Argumente überspringen: Zeichenkette, Block oder bis „=“-Ausdruck
      if (tok === '\\tempo') {
        if (/^"/.test(t[i + 1] || '')) i++;
        if (/^\d/.test(t[i + 1] || '') && t[i + 2] === '=') i += 3;
      } else if (tok === '\\set' || tok === '\\override') {
        while (i + 1 < t.length && t[i + 1] !== '=') i++;
        i += 2;
        if (t[i] === '{' || t[i] === '<<') i = blockEnd(t, i) - 1;
      } else if (t[i + 1] === '{') i = blockEnd(t, i + 1) - 1;
      else i++;
    } else if (tok.startsWith('\\')) {
      const name = tok.slice(1);
      const v = ctx.vars.get(name);
      if (v) music(v, ctx, out);
    } else if (tok === '~') {
      if (out.length) out[out.length - 1].tie = true;
    } else if (tok === '(') {
      if (out.length) {
        out[out.length - 1].slurStart = true;
        ctx.slurOpen = true;
      }
    } else if (tok === ')') {
      if (out.length) out[out.length - 1].slurEnd = true;
      ctx.slurOpen = false;
    } else if ((tok === '[' || tok === ']') && ctx.beamMelisma) {
      // bei \autoBeamOff bindet ein von Hand gesetzter Balken die Noten zu einer Silbe (wie ein Bogen)
      if (out.length) {
        if (tok === '[') out[out.length - 1].slurStart = true;
        else out[out.length - 1].slurEnd = true;
      }
    } else if (tok === '<') {
      // Akkord in der Melodiestimme: oberster notierter Ton zählt, Dauer steht nach „>“
      let j = i + 1;
      const notes: string[] = [];
      while (j < t.length && t[j] !== '>') notes.push(t[j++]);
      const durTok = t[j + 1] && /^\d/.test(t[j + 1]) ? t[j + 1] : '';
      const head = notes[0] || '';
      const m = /^([a-h](?:is|es|s)*)([',]*)/.exec(head);
      if (m) {
        const p = parsePitchName(m[1], ctx.lang)!;
        const midi = absPitch(ctx, p.step, p.pc, m[2]);
        if (durTok) parseDuration(ctx, durTok);
        out.push({ midi, dur: ctx.dur * ctx.scale, tie: false, slurStart: false, slurEnd: false });
      }
      i = durTok ? j + 1 : j;
    } else {
      const m = /^([a-hrsR](?:is|es|s)*)([',]*)(?:[!?])?(\d+\.*(?:\*\d+(?:\/\d+)?)?)?/.exec(tok);
      if (!m) continue;
      if (m[3]) parseDuration(ctx, m[3]);
      const d = ctx.dur * ctx.scale;
      if (m[1] === 'r' || m[1] === 'R' || m[1] === 's') {
        out.push({ midi: null, dur: d, tie: false, slurStart: false, slurEnd: false });
        continue;
      }
      const p = parsePitchName(m[1], ctx.lang);
      if (!p) continue;
      out.push({ midi: absPitch(ctx, p.step, p.pc, m[2]), dur: d, tie: false, slurStart: false, slurEnd: false });
    }
  }
}

function lyrics(t: Tok[], vars: Map<string, Tok[]>): LySyllable[] {
  const out: LySyllable[] = [];
  for (let i = 0; i < t.length; i++) {
    const tok = t[i];
    if (tok === '{' || tok === '}' || tok === '|' || tok === '\\lyricmode' || tok === '>>') continue;
    if (tok === '\\new' || tok === '\\context') {
      if (t[i + 1] === 'Lyrics') i++;
      if (t[i + 1] === '=') i += 2;
      continue;
    }
    if (tok === '\\lyricsto') {
      i++;
      continue;
    }
    if (tok === '<<') {
      // parallele Strophen (Text der ersten und zweiten Runde einer Wiederholung): nacheinander
      const end = blockEnd(t, i);
      const inner = t.slice(i + 1, end - 1);
      for (let j = 0; j < inner.length; j++) {
        if (inner[j] === '{') {
          const e = blockEnd(inner, j);
          out.push(...lyrics(inner.slice(j + 1, e - 1), vars));
          j = e - 1;
        }
      }
      i = end - 1;
      continue;
    }
    if (tok === '\\repeat') {
      const times = Number(t[i + 2]) || 2;
      let start = i + 3;
      if (t[start] === '\\lyricmode') start++;
      if (t[start] !== '{') continue;
      const end = blockEnd(t, start);
      const body = t.slice(start + 1, end - 1);
      const alts: Tok[][] = [];
      let next = end;
      if (t[end] === '\\alternative' && t[end + 1] === '{') {
        const aEnd = blockEnd(t, end + 1);
        const inner = t.slice(end + 2, aEnd - 1);
        for (let j = 0; j < inner.length; j++)
          if (inner[j] === '{') {
            const e = blockEnd(inner, j);
            alts.push(inner.slice(j + 1, e - 1));
            j = e - 1;
          }
        next = aEnd;
      }
      for (let k = 0; k < times; k++) {
        out.push(...lyrics(body, vars));
        if (alts.length) out.push(...lyrics(alts[Math.min(k, alts.length - 1)], vars));
      }
      i = next - 1;
      continue;
    }
    if (tok === '--') {
      if (out.length) out[out.length - 1].hyphen = true;
      continue;
    }
    if (tok === '__') continue;
    if (tok.startsWith('#')) {
      // Scheme-Wert wie #"1. " (Strophennummer) – samt folgender Zeichenkette überspringen
      if (/^"/.test(t[i + 1] || '')) i++;
      continue;
    }
    if (tok === '\\set' || tok === '\\override') {
      while (i + 1 < t.length && t[i + 1] !== '=') i++;
      i += 2;
      // Wert wie #"1. " (Strophennummer): das Zeichen # und die Zeichenkette gehören zusammen
      if (t[i]?.startsWith('#') && /^"/.test(t[i + 1] || '')) i++;
      continue;
    }
    if (tok === '\\skip') {
      out.push({ text: '', hyphen: false, skip: true });
      i++;
      continue;
    }
    if (tok.startsWith('\\')) {
      const v = vars.get(tok.slice(1));
      if (v) out.push(...lyrics(v, vars));
      continue;
    }
    if (tok === '_') {
      out.push({ text: '', hyphen: false, skip: true });
      continue;
    }
    let text = tok.replace(/^"|"$/g, '').replace(/~/g, ' ');
    text = text.replace(/_$/, '').replace(/_/g, ' ');
    if (!text || text === '=') continue;
    out.push({ text, hyphen: false, skip: false });
  }
  return out;
}

const CHORD_Q: Record<string, string> = { '': '', m: 'm', '7': '7', 'm7': 'm7', maj7: 'maj7', '6': '6', m6: 'm6', dim: 'dim', dim7: 'dim7', aug: 'aug', sus4: 'sus4', sus2: 'sus2' };

function chordQuality(q: string): string {
  if (!q) return '';
  if (/^m7\.?5-$/.test(q)) return 'm7b5';
  const k = q.replace(/^min/, 'm').replace(/\.$/, '');
  if (k in CHORD_Q) return CHORD_Q[k];
  if (/^7/.test(k)) return '7';
  if (/^m7/.test(k)) return 'm7';
  if (/^m/.test(k)) return 'm';
  return '';
}

/** Begleitakkorde aus \chordmode – Wiederholungen werden wie in der Melodie ausgeschrieben; Pause = root -1. */
function chords(t: Tok[], lang: string, state = { dur: 1 }, out: LyChord[] = []): LyChord[] {
  for (let i = 0; i < t.length; i++) {
    const tok = t[i];
    if (tok === '{') {
      const end = blockEnd(t, i);
      chords(t.slice(i + 1, end - 1), lang, state, out);
      i = end - 1;
      continue;
    }
    if (tok === '\\repeat') {
      const times = Number(t[i + 2]) || 2;
      const start = i + 3;
      if (t[start] !== '{') continue;
      const end = blockEnd(t, start);
      const body = t.slice(start + 1, end - 1);
      const alts: Tok[][] = [];
      let next = end;
      if (t[end] === '\\alternative' && t[end + 1] === '{') {
        const aEnd = blockEnd(t, end + 1);
        const inner = t.slice(end + 2, aEnd - 1);
        for (let j = 0; j < inner.length; j++)
          if (inner[j] === '{') {
            const e = blockEnd(inner, j);
            alts.push(inner.slice(j + 1, e - 1));
            j = e - 1;
          }
        next = aEnd;
      }
      for (let k = 0; k < times; k++) {
        chords(body, lang, state, out);
        if (alts.length) chords(alts[Math.min(k, alts.length - 1)], lang, state, out);
      }
      i = next - 1;
      continue;
    }
    if (tok === '\\set' || tok === '\\override') {
      while (i + 1 < t.length && t[i + 1] !== '=') i++;
      i += 2;
      // Wert wie #"1. " (Strophennummer): das Zeichen # und die Zeichenkette gehören zusammen
      if (t[i]?.startsWith('#') && /^"/.test(t[i + 1] || '')) i++;
      continue;
    }
    if (tok === '\\transpose') {
      i += 2;
      continue;
    }
    const m = /^([a-h](?:is|es|s)*)[',]*(\d+\.*)?(?::([a-z0-9.+-]+))?(?:\/.*)?$/.exec(tok);
    const r = /^[rsR](\d+\.*)?$/.exec(tok);
    if (!m && !r) continue;
    const durTok = m ? m[2] : r![1];
    if (durTok) {
      const ctx = { dur: state.dur } as Ctx;
      parseDuration(ctx, durTok);
      state.dur = ctx.dur;
    }
    if (r) {
      out.push({ root: -1, quality: '', dur: state.dur });
      continue;
    }
    const p = parsePitchName(m![1], lang);
    if (!p) continue;
    out.push({ root: p.pc, quality: chordQuality(m![3] || ''), dur: state.dur });
  }
  return out;
}

export function parseLily(src: string): LyScore | null {
  const clean = stripComments(src);
  const t = tokenize(clean);
  const langM = /\\language\s+"(\w+)"/.exec(clean);
  const lang = langM ? langM[1] : 'nederlands';
  // Variablen: name = Ausdruck
  const vars = new Map<string, Tok[]>();
  for (let i = 1; i < t.length - 1; i++) {
    if (t[i] !== '=' || !/^[A-Za-z]+$/.test(t[i - 1]) || (i > 1 && t[i - 2] === '\\set') || t[i - 2]?.startsWith('#')) continue;
    let j = i + 1;
    const startTok = j;
    while (j < t.length && t[j] !== '{' && t[j] !== '<<' && j - startTok < 6) {
      if (t[j] === '\\relative' && /^[a-h]/.test(t[j + 1] || '')) j++;
      else if (t[j] === '\\new' && /^[A-Z]/.test(t[j + 1] || '')) j++;
      else if (!t[j].startsWith('\\')) break;
      j++;
    }
    if (t[j] === '{' || t[j] === '<<') vars.set(t[i - 1], t.slice(startTok, blockEnd(t, j)));
  }

  // Melodie und Text finden: \addlyrics hinter einem Musikausdruck oder \lyricsto "stimme"
  let melodyToks: Tok[] | null = null;
  const verses: LySyllable[][] = [];
  const add = t.indexOf('\\addlyrics');
  if (add >= 0 && t[add - 1]?.startsWith('\\') && vars.has(t[add - 1].slice(1))) melodyToks = vars.get(t[add - 1].slice(1))!;
  if (add >= 0 && !melodyToks) {
    // Musikausdruck davor: von der passenden öffnenden Klammer bis vor \addlyrics
    let j = add - 1;
    while (j >= 0 && t[j] !== '}' && t[j] !== '>>') j--;
    if (j >= 0) {
      const close = t[j];
      const open = close === '}' ? '{' : '<<';
      let depth = 0;
      let k = j;
      for (; k >= 0; k--) {
        if (t[k] === close) depth++;
        else if (t[k] === open) {
          depth--;
          if (depth === 0) break;
        }
      }
      let s = k;
      while (s > 0 && (t[s - 1].startsWith('\\') || /^[a-h](?:is|es)*[',]*$/.test(t[s - 1])) && t[s - 1] !== '}' && !['\\score', '\\new'].includes(t[s - 1])) s--;
      melodyToks = t.slice(s, j + 1);
    }
  }
  if (add >= 0) {
    for (let i = add; i < t.length; i++)
      if (t[i] === '\\addlyrics') {
        if (t[i + 1] === '{') {
          const e = blockEnd(t, i + 1);
          verses.push(lyrics(t.slice(i + 1, e), vars));
          i = e - 1;
        } else if (t[i + 1]?.startsWith('\\')) verses.push(lyrics(vars.get(t[i + 1].slice(1)) || [], vars));
      }
  } else {
    const lt = t.indexOf('\\lyricsto');
    if (lt < 0) return null;
    const voice = (t[lt + 1] || '').replace(/"/g, '');
    for (let i = 0; i < t.length; i++)
      if (t[i] === '\\new' && t[i + 1] === 'Voice' && t[i + 2] === '=' && t[i + 3]?.replace(/"/g, '') === voice) {
        let j = i + 4;
        while (j < t.length && t[j] !== '{') j++;
        melodyToks = t.slice(j, blockEnd(t, j));
        break;
      }
    if (!melodyToks) {
      // \context Voice = "x" oder Variable mit dem Stimmnamen
      const v = vars.get(voice);
      if (v) melodyToks = v;
    }
    for (let i = 0; i < t.length; i++)
      if (t[i] === '\\lyricsto' && t[i + 1]?.replace(/"/g, '') === voice) {
        const arg = t[i + 2];
        if (arg === '{') verses.push(lyrics(t.slice(i + 2, blockEnd(t, i + 2)), vars));
        else if (arg === '\\lyricmode' && t[i + 3] === '{') verses.push(lyrics(t.slice(i + 3, blockEnd(t, i + 3)), vars));
        else if (arg?.startsWith('\\')) verses.push(lyrics(vars.get(arg.slice(1)) || [], vars));
      }
  }
  if (!melodyToks || !verses.length) return null;

  const ctx: Ctx = { lang, vars, rel: null, dur: 1, timeNum: 4, timeDen: 4, partial: 0, keyTonic: 0, minor: false, scale: 1, slurOpen: false, beamMelisma: t.indexOf('\\autoBeamOff') >= 0 };
  // Taktart/Tonart können außerhalb der Melodie stehen (global-Variable, Staff-Kopf)
  const pre: LyNote[] = [];
  const g = vars.get('global');
  if (g) music(g, ctx, pre);
  // erste Tonart-/Taktangabe im ganzen Beispiel als Vorgabe (steht oft vor dem Melodieblock)
  const k = t.indexOf('\\key');
  if (k >= 0 && !g) {
    const p = parsePitchName(t[k + 1] || '', lang);
    if (p) ctx.keyTonic = p.pc;
    ctx.minor = t[k + 2] === '\\minor';
  }
  const tm = t.indexOf('\\time');
  const tmM = tm >= 0 ? /^(\d+)\/(\d+)$/.exec(t[tm + 1] || '') : null;
  if (tmM && !g) {
    ctx.timeNum = Number(tmM[1]);
    ctx.timeDen = Number(tmM[2]);
  }
  const pa = t.indexOf('\\partial');
  if (pa >= 0 && !g && melodyToks.indexOf('\\partial') < 0) {
    const save = ctx.dur;
    parseDuration(ctx, t[pa + 1] || '4');
    ctx.partial = ctx.dur;
    ctx.dur = save;
  }
  const notes: LyNote[] = [];
  music(melodyToks, ctx, notes);
  if (notes.filter((n) => n.midi !== null).length < 4) return null;

  let chordList: LyChord[] | null = null;
  const cm = t.indexOf('\\chordmode');
  if (cm >= 0 && t[cm + 1] === '{') chordList = chords(t.slice(cm + 2, blockEnd(t, cm + 1) - 1), lang);
  else {
    for (const [, v] of vars)
      if (v[0] === '\\chordmode' && v[1] === '{') chordList = chords(v.slice(2, blockEnd(v, 1) - 1), lang);
  }
  return { notes, verses, chords: chordList && chordList.length ? chordList : null, timeNum: ctx.timeNum, timeDen: ctx.timeDen, partial: ctx.partial, keyTonic: ctx.keyTonic, minor: ctx.minor };
}

export interface Aligned {
  syllable: string;
  joinNext: boolean;
  midi: number | null;
  dur: number;
  hold: boolean;
}

/** Silben auf Noten verteilen: Haltebogen und Bindebogen tragen keine neue Silbe, „_“ hält die vorige. */
export function align(notes: LyNote[], syl: LySyllable[]): { events: Aligned[]; leftoverSyllables: number; leftoverNotes: number } {
  const events: Aligned[] = [];
  let s = 0;
  let inSlur = false;
  let tied = false;
  let unsung = 0;
  for (const n of notes) {
    if (n.midi === null) {
      events.push({ syllable: '', joinNext: false, midi: null, dur: n.dur, hold: false });
      tied = false;
      continue;
    }
    const continuation = tied || inSlur;
    if (n.slurStart) inSlur = true;
    if (n.slurEnd) inSlur = false;
    if (continuation) {
      const last = events[events.length - 1];
      if (tied && last && last.midi === n.midi) last.dur += n.dur;
      else events.push({ syllable: '', joinNext: false, midi: n.midi, dur: n.dur, hold: true });
    } else if (s < syl.length) {
      const y = syl[s++];
      if (y.skip) events.push({ syllable: '', joinNext: false, midi: n.midi, dur: n.dur, hold: true });
      else events.push({ syllable: y.text, joinNext: y.hyphen, midi: n.midi, dur: n.dur, hold: false });
    } else {
      unsung++;
      events.push({ syllable: '', joinNext: false, midi: n.midi, dur: n.dur, hold: true });
    }
    tied = n.tie;
  }
  return { events, leftoverSyllables: syl.length - s, leftoverNotes: unsung };
}
