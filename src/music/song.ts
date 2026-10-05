import { parsePitch } from './notes.ts';

export interface SongSource {
  id: string;
  title: string;
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
  text: string;
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
  const events: SongEvent[] = [];
  let beat = 0;
  let current = '';
  const lines = src.text
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
  return { ...src, events, lines: lines.length, totalBeats: beat, chords };
}

/** Prüft die Taktstriche: jeder Takt (außer Auftakt und letztem) muss genau `meter` Schläge haben. */
export function barErrors(src: SongSource): string[] {
  const errors: string[] = [];
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
