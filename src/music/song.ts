import { parsePitch } from './notes.ts';

export type Category = 'kinder' | 'jahreszeiten' | 'weihnachten' | 'lagerfeuer' | 'english' | 'eigene';

export const CATEGORIES: { id: Category; title: string }[] = [
  { id: 'kinder', title: 'Kinderlieder' },
  { id: 'lagerfeuer', title: 'Lagerfeuer & Wandern' },
  { id: 'jahreszeiten', title: 'Frühling bis Herbst' },
  { id: 'weihnachten', title: 'Weihnachten' },
  { id: 'english', title: 'English Songs' },
  { id: 'eigene', title: 'Eigene Lieder' },
];

export interface SongSource {
  id: string;
  title: string;
  category: Category;
  /** Herkunft und Rechte – alle Lieder sind gemeinfrei oder eigene Werke. */
  origin: string;
  meter: number;
  bpm: number;
  /** Auftakt in Schlägen: so viele Schläge stehen vor dem ersten vollen Takt. */
  pickup?: number;
  /**
   * Zeilen, Takte mit „|“ getrennt. Token: `Silbe:Ton[:Dauer]`, Dauer in Schlägen (Standard 1).
   * `[F]` vor einem Token wechselt den Akkord. Silbe `_` = Pause (Ton `R`), `~` = gehaltene Silbe mit neuem Ton.
   * Endet eine Silbe auf „-“, geht das Wort in der nächsten Silbe weiter.
   */
  text?: string;
  /**
   * Alternative ohne Melodie: Text mit Akkorden im ChordPro-Stil, `[C]Im Märzen der [Dm]Bauer`. Jeder Akkord gilt
   * einen Takt lang, `[G7:2]` zwei Schläge. Akkorde mitten im Wort sind erlaubt: `ein[C]spannt`.
   */
  chordpro?: string;
}

export interface SongEvent {
  /** Beginn in Schlägen ab Liedanfang (ohne Einzähler). */
  beat: number;
  dur: number;
  syllable: string;
  /** Wort geht in der nächsten Silbe weiter (Anzeige ohne Leerzeichen). */
  joinNext: boolean;
  midi: number | null;
  chord: string;
  /** An dieser Silbe wechselt der Akkord. */
  chordChange: boolean;
  /** Melisma: dieselbe Silbe klingt auf einem neuen Ton weiter. */
  hold: boolean;
  line: number;
}

export interface Song extends SongSource {
  /** false bei Liedern nur mit Akkorden und Text – dann ohne Melodie und Tabulatur. */
  hasMelody: boolean;
  events: SongEvent[];
  lines: number;
  totalBeats: number;
  chords: string[];
}

const TOKEN = /^(?:\[([^\]]+)\])?([^:]+):([A-Gb#R0-9-]+)(?::([0-9./]+))?$/;

function duration(text: string | undefined): number {
  if (!text) return 1;
  const parts = text.split('/');
  return parts.length > 1 ? Number(parts[0]) / Number(parts[1]) : Number(parts[0]);
}

export function parseSong(src: SongSource): Song {
  if (src.chordpro !== undefined) return parseChordPro(src);
  const events: SongEvent[] = [];
  let beat = 0;
  let current = '';
  const lines = (src.text || '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  lines.forEach((lineText, line) => {
    for (const bar of lineText.split('|')) {
      const tokens = bar.trim().split(/\s+/).filter(Boolean);
      for (const tok of tokens) {
        const m = TOKEN.exec(tok);
        if (!m) throw new Error(`${src.id}: Token nicht lesbar: ${tok}`);
        const chordName = m[1];
        const rawSyl = m[2];
        const pitch = m[3];
        const dur = m[4];
        let chordChange = false;
        if (chordName && chordName !== current) {
          current = chordName;
          chordChange = true;
        }
        if (!current) throw new Error(`${src.id}: kein Akkord am Liedanfang`);
        const d = duration(dur);
        const hold = rawSyl === '~';
        const joinNext = rawSyl.endsWith('-');
        const syllable = rawSyl === '_' || hold ? '' : rawSyl.replace(/-$/, '');
        events.push({
          beat,
          dur: d,
          syllable,
          joinNext,
          midi: pitch === 'R' ? null : parsePitch(pitch),
          chord: current,
          chordChange,
          hold,
          line,
        });
        beat += d;
      }
    }
  });
  const chords = [...new Set(events.map((e) => e.chord))];
  return { ...src, hasMelody: true, events, lines: lines.length, totalBeats: beat, chords };
}

interface Word {
  text: string;
  joinNext: boolean;
  line: number;
}

interface Segment {
  chord: string;
  beats: number;
  words: Word[];
  line: number;
}

/** Lied ohne Melodie: Akkorde und Text. Die Wörter eines Akkords teilen sich seine Schläge gleichmäßig. */
export function parseChordPro(src: SongSource): Song {
  const segments: Segment[] = [];
  let lastWord: Word | null = null;
  let endedWithSpace = true;
  const lines = (src.chordpro || '')
    .split('\n')
    .map((l) => l.replace(/\s+$/, ''))
    .filter((l) => l.trim() && !/^\s*\{/.test(l));
  const addText = (text: string, line: number) => {
    if (!text) return;
    if (!segments.length) segments.push({ chord: '', beats: 1, words: [], line });
    const seg = segments[segments.length - 1];
    // Text direkt nach einem Akkord ohne Leerzeichen davor: das Wort von vorhin geht weiter („ein[C]spannt“)
    if (lastWord && !endedWithSpace && /^\S/.test(text)) lastWord.joinNext = true;
    for (const w of text.split(/\s+/).filter(Boolean)) {
      lastWord = { text: w, joinNext: false, line };
      seg.words.push(lastWord);
    }
    endedWithSpace = /\s$/.test(text);
  };
  lines.forEach((raw, line) => {
    const re = /\[([^\]]+)\]/g;
    let pos = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(raw))) {
      addText(raw.slice(pos, m.index), line);
      const parts = m[1].split(':');
      segments.push({ chord: parts[0].trim(), beats: parts[1] ? Number(parts[1]) : src.meter, words: [], line });
      pos = m.index + m[0].length;
    }
    addText(raw.slice(pos), line);
    endedWithSpace = true;
  });
  const first = segments.find((g) => g.chord);
  if (!first) throw new Error(`${src.id}: keine Akkorde`);
  const events: SongEvent[] = [];
  let beat = 0;
  let current = '';
  for (const seg of segments) {
    const chord = seg.chord || first.chord;
    const change = chord !== current;
    current = chord;
    if (!seg.words.length) {
      events.push({ beat, dur: seg.beats, syllable: '', joinNext: false, midi: null, chord, chordChange: change, hold: false, line: seg.line });
    } else {
      const d = seg.beats / seg.words.length;
      seg.words.forEach((w, i) => {
        events.push({ beat: beat + i * d, dur: d, syllable: w.text, joinNext: w.joinNext, midi: null, chord, chordChange: change && i === 0, hold: false, line: w.line });
      });
    }
    beat += seg.beats;
  }
  const chords = [...new Set(events.map((e) => e.chord))];
  return { ...src, hasMelody: false, events, lines: lines.length, totalBeats: beat, chords };
}

/** Prüft die Taktstriche: jeder Takt (außer Auftakt und letztem) muss genau `meter` Schläge haben. */
export function barErrors(src: SongSource): string[] {
  const errors: string[] = [];
  if (!src.text) return errors;
  // Zeilenumbrüche gliedern nur den Text; ein Takt darf über das Zeilenende weiterlaufen.
  const bars = src.text
    .split('|')
    .map((bar) => bar.trim().split(/\s+/).filter(Boolean))
    .filter((tokens) => tokens.length)
    .map((tokens) => tokens.reduce((sum, t) => sum + duration(TOKEN.exec(t)?.[4]), 0));
  bars.forEach((len, i) => {
    if (i === 0 && src.pickup && Math.abs(len - src.pickup) < 1e-6) return;
    if (i === bars.length - 1 && len <= src.meter + 1e-6) return;
    if (Math.abs(len - src.meter) > 1e-6) errors.push(`${src.id}: Takt ${i + 1} hat ${len} statt ${src.meter} Schläge`);
  });
  return errors;
}

/** Index des Ereignisses, das zum Zeitpunkt `beat` klingt (-1 vor dem Lied). */
export function eventAt(song: Song, beat: number): number {
  const ev = song.events;
  if (beat < 0) return -1;
  let lo = 0;
  let hi = ev.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (ev[mid].beat <= beat) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}

/** Die Ereignisse, an denen der Akkord wechselt (inklusive des ersten). */
export function chordChanges(song: Song): number[] {
  return song.events.flatMap((e, i) => (e.chordChange ? [i] : []));
}

/** Schwierigkeit 1–3: nach Zahl und Art der Akkorde. */
export function difficulty(song: Song): number {
  const hard = song.chords.some((c) => ['G', 'Dm', 'D', 'E7', 'Bb', 'Em'].includes(c));
  if (song.chords.length <= 2 && !hard) return 1;
  if (song.chords.length <= 3 && !hard) return 2;
  return 3;
}
