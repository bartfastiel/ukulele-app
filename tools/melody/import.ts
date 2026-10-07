// Erzeugt src/music/songs-melodies.ts: Melodien aus den Wikipedia-Notenbeispielen für Lieder, die bisher nur
// Akkorde und Text haben. Transponiert in die einfache Tonart der App, Akkorde aus dem Notenbeispiel (falls vorhanden)
// oder per Textabgleich aus unserem Akkordsatz. Meldet, wo der Notentext von unserem geprüften Text abweicht.
//   node tools/melody/import.ts <ordner-mit-.ly> [--write]
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseLily, align, type Aligned, type LyScore } from './lily.ts';
import { WIKI } from './sources.ts';
import { CHORD_SONGS } from '../../src/music/songs-chordpro.ts';
import { KINDER_SONGS } from '../../src/music/songs-kinder.ts';
import { ENGLISH_SONGS } from '../../src/music/songs-english.ts';
import { parseSong, type Song } from '../../src/music/song.ts';
import { songKey, shiftBetween } from '../../src/music/transpose.ts';
import { ROOTS, chord, chordMidis } from '../../src/music/chords.ts';
import { NOTE_NAMES } from '../../src/music/notes.ts';

/** Nicht übernehmen – der Notentext ist eine geschützte oder abweichende Fassung. */
const EXCLUDE: Record<string, string> = {
  'im-maerzen-der-bauer': 'Notentext ist die Fassung von Walther Hensel (1923), geschützt bis Ende 2026',
};

const dir = process.argv[2];
const write = process.argv.includes('--write');
const songs = new Map<string, Song>();
for (const s of CHORD_SONGS.concat(KINDER_SONGS, ENGLISH_SONGS)) songs.set(s.id, parseSong(s));

const norm = (s: string) => s.toLowerCase().replace(/[^a-zäöüß]/g, '');

/** Längste gemeinsame Teilfolge: für jede Stelle in a die zugeordnete Stelle in b (oder -1). */
function lcsMap(a: string, b: string): { map: number[]; matched: number } {
  const n = a.length;
  const m = b.length;
  const dp: Uint16Array[] = [];
  for (let i = 0; i <= n; i++) dp.push(new Uint16Array(m + 1));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--) dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const map = new Array<number>(n).fill(-1);
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      map[i] = j;
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  return { map, matched: dp[0][0] };
}

function pitchName(midi: number): string {
  return `${NOTE_NAMES[((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}`;
}

function durText(d: number): string {
  for (const den of [3, 6]) {
    const num = d * den;
    if (Math.abs(num - Math.round(num)) < 1e-6 && Math.abs(d * 4 - Math.round(d * 4)) > 1e-6) return `${Math.round(num)}/${den}`;
  }
  return String(Number(d.toFixed(4)));
}

function tones(name: string): Set<number> {
  return new Set(chordMidis(chord(name)).map((m) => m % 12));
}

/** Anteil akkordfremder Melodietöne (nach Dauer gewichtet). */
function foreignShare(ev: Aligned[], chords: string[]): number {
  let all = 0;
  let foreign = 0;
  ev.forEach((e, i) => {
    if (e.midi === null || !chords[i]) return;
    all += e.dur;
    if (!tones(chords[i]).has(e.midi % 12)) foreign += e.dur;
  });
  return all ? foreign / all : 1;
}

/**
 * Einfache Harmonisierung: je Takt (bei geraden Taktarten auch je Halbtakt) der Akkord aus dem Vorrat des Liedes,
 * der die meisten Melodietöne trifft; betonte Zählzeiten zählen doppelt, Wechsel kosten etwas, Schluss auf der Tonika.
 */
function harmonize(ev: Aligned[], vocab: string[], meter: number, pickup: number, tonic: number): string[] {
  if (!vocab.length) return ev.map(() => 'C');
  const tonicChord = vocab.find((c) => c === ROOTS[tonic]) || vocab[0];
  const seg = meter % 2 === 0 ? meter / 2 : meter;
  const starts: number[] = [];
  let pos = 0;
  const segOf = ev.map((e) => {
    const s = Math.floor((pos - pickup + 100 * seg) / seg + 1e-9) - 100;
    starts.push(pos);
    pos += e.dur;
    return s;
  });
  const segs = Array.from(new Set(segOf));
  const choice = new Map<number, string>();
  let prev = tonicChord;
  segs.forEach((sg, k) => {
    let best = prev;
    let bestScore = -Infinity;
    for (const c of vocab) {
      const t = tones(c);
      let score = 0;
      ev.forEach((e, i) => {
        if (segOf[i] !== sg || e.midi === null) return;
        const beatInSeg = (((starts[i] - pickup) % seg) + seg) % seg;
        const w = e.dur * (beatInSeg < 1e-6 ? 2 : 1);
        score += t.has(e.midi % 12) ? w : -0.6 * w;
      });
      if (c === prev) score += 0.3;
      if (k === segs.length - 1 && c === tonicChord) score += 1;
      if (score > bestScore) {
        bestScore = score;
        best = c;
      }
    }
    choice.set(sg, best);
    prev = best;
  });
  return ev.map((_, i) => choice.get(segOf[i])!);
}

interface Result {
  id: string;
  text: string;
  meter: number;
  pickup: number;
  originalKey: string;
  similarity: number;
  leftover: number;
  chordSource: 'Notenbeispiel' | 'Textabgleich' | 'Harmonisierung';
  file: string;
}

function convert(id: string, sc: LyScore, file: string): Result | null {
  const song = songs.get(id);
  if (!song) return null;
  const al = align(sc.notes, sc.verses[0]);
  const leftover = al.leftoverNotes + al.leftoverSyllables;
  let ev: Aligned[] = al.events;
  // Taktart in Schläge der App umrechnen: x/8 → Achtel als Schlag, sonst Viertel
  const factor = sc.timeDen === 8 ? 2 : 1;
  const meter = sc.timeDen === 2 ? sc.timeNum * 2 : sc.timeNum;
  // Tonart: in die einfache Tonart unseres Liedes, Oktave so, dass die Melodie auf der Ukulele (ab C4) liegt
  const ours = songKey(song);
  const shift = shiftBetween(sc.keyTonic, ours.root);
  const pitches = ev.flatMap((e) => (e.midi === null ? [] : [e.midi + shift]));
  let best = 0;
  let bestScore = -Infinity;
  for (let k = -3; k <= 3; k++) {
    const p = pitches.map((x) => x + 12 * k);
    const inRange = p.filter((x) => x >= 60 && x <= 81).length;
    const med = p.slice().sort((a, b) => a - b)[p.length >> 1];
    const score = inRange * 10 - Math.abs(med - 68);
    if (score > bestScore) {
      bestScore = score;
      best = k;
    }
  }
  const total = shift + 12 * best;
  // einzelne Ausreißer unter C4 bzw. über A5 eine Oktave versetzen, damit jeder Ton auf der Ukulele greifbar bleibt
  const fit = (m: number) => (m < 60 ? m + 12 : m > 81 ? m - 12 : m);
  ev = ev.map((e) => ({ ...e, midi: e.midi === null ? null : fit(e.midi + total), dur: e.dur * factor }));

  // Akkorde je Ereignis
  const chordAt: string[] = new Array(ev.length).fill('');
  let chordSource: Result['chordSource'] = 'Textabgleich';
  if (sc.chords) {
    chordSource = 'Notenbeispiel';
    const timeline: { beat: number; name: string }[] = [];
    let beat = 0;
    for (const c of sc.chords) {
      if (c.root >= 0) timeline.push({ beat, name: ROOTS[(((c.root + shift) % 12) + 12) % 12] + c.quality });
      beat += c.dur * factor;
    }
    let pos = 0;
    let k = 0;
    ev.forEach((e, i) => {
      while (k + 1 < timeline.length && timeline[k + 1].beat <= pos + 1e-6) k++;
      chordAt[i] = timeline.length ? timeline[k].name : '';
      pos += e.dur;
    });
  } else {
    // unsere Akkordwechsel per Buchstabenabgleich auf die Silben des Notentexts legen
    let a = '';
    const marks: { pos: number; chord: string }[] = [];
    for (const e of song.events) {
      if (e.chordChange) marks.push({ pos: a.length, chord: e.chord });
      a += norm(e.syllable);
    }
    let b = '';
    const owner: number[] = [];
    ev.forEach((e, i) => {
      const t = norm(e.syllable);
      for (let c = 0; c < t.length; c++) owner.push(i);
      b += t;
    });
    const { map } = lcsMap(a, b);
    let current = marks.length ? marks[0].chord : 'C';
    const changeAt = new Map<number, string>();
    for (const mk of marks) {
      let p = mk.pos;
      while (p < map.length && map[p] < 0) p++;
      if (p >= map.length) break;
      const idx = owner[map[p]];
      if (!changeAt.has(idx)) changeAt.set(idx, mk.chord);
    }
    ev.forEach((_, i) => {
      if (changeAt.has(i)) current = changeAt.get(i)!;
      chordAt[i] = current;
    });
  }
  // Ohne Akkorde im Notenbeispiel: zusätzlich aus der Melodie harmonisieren und die Variante mit weniger
  // akkordfremden Tönen nehmen (unsere Akkordstellen aus dem Textabgleich sind nur ungefähr)
  if (chordSource === 'Textabgleich') {
    const vocab = Array.from(new Set(chordAt.filter(Boolean)));
    const harm = harmonize(ev, vocab, meter, sc.partial * factor, ours.root);
    if (foreignShare(ev, harm) + 0.05 < foreignShare(ev, chordAt)) {
      harm.forEach((c, i) => (chordAt[i] = c));
      chordSource = 'Harmonisierung';
    }
  }
  const firstChord = chordAt.find((c) => c) || 'C';
  // Ähnlichkeit des Notentexts mit unserem geprüften Text (nur die erste Strophe zählt)
  const scoreText = norm(ev.map((e) => e.syllable).join(''));
  const ourText = norm(song.events.map((e) => e.syllable).join(''));
  const { matched } = lcsMap(scoreText, ourText.slice(0, Math.round(scoreText.length * 1.3)));
  const similarity = scoreText.length ? matched / scoreText.length : 0;

  // Text im Melodieformat der App
  const lines: string[] = [];
  let line: string[] = [];
  let last = '';
  ev.forEach((e, i) => {
    const chord = chordAt[i] || firstChord;
    const prefix = chord !== last || i === 0 ? `[${chord}]` : '';
    last = chord;
    const pitch = e.midi === null ? 'R' : pitchName(e.midi);
    const syl = e.midi === null ? '_' : e.hold || !e.syllable ? '~' : e.syllable.replace(/[:|[\]]+/g, '').replace(/\s+/g, '\u203f') + (e.joinNext ? '-' : '');
    // Melisma ohne vorherige Silbe ist nicht darstellbar – dann als eigene, stumme Silbe
    const token = `${prefix}${syl === '~' && !line.length && !lines.length ? '_' : syl}:${syl === '_' && e.midi !== null ? pitchName(e.midi) : pitch}${e.dur === 1 ? '' : ':' + durText(e.dur)}`;
    line.push(token);
    const words = line.length;
    if (!e.joinNext && /[.!?;]$/.test(e.syllable) && words >= 4) {
      lines.push(line.join(' '));
      line = [];
    } else if (!e.joinNext && /[,:]$/.test(e.syllable) && words >= 8) {
      lines.push(line.join(' '));
      line = [];
    }
  });
  if (line.length) lines.push(line.join(' '));
  return {
    id,
    text: '\n' + lines.join('\n'),
    meter,
    pickup: sc.partial * factor,
    originalKey: ROOTS[sc.keyTonic] + (sc.minor ? 'm' : ''),
    similarity,
    leftover,
    chordSource,
    file,
  };
}

const results: Result[] = [];
for (const id of Object.keys(WIKI)) {
  const files = readdirSync(dir).filter((f) => f.startsWith(id + '-') && f.endsWith('.ly'));
  let chosen: Result | null = null;
  for (const f of files) {
    const sc = parseLily(new TextDecoder().decode(readFileSync(join(dir, f))));
    if (!sc) continue;
    const r = convert(id, sc, f);
    if (r && (!chosen || r.leftover < chosen.leftover)) chosen = r;
  }
  if (!chosen) continue;
  const ok = chosen.leftover <= 4 && !EXCLUDE[id];
  console.log(
    `${ok ? (chosen.similarity < 0.8 ? '⚠' : '✓') : '✗'} ${id.padEnd(28)} Rest ${chosen.leftover}  Text ${(chosen.similarity * 100).toFixed(0)} %  Akkorde: ${chosen.chordSource}  Quelle ${chosen.originalKey}${EXCLUDE[id] ? '  (' + EXCLUDE[id] + ')' : ''}`,
  );
  if (ok) results.push(chosen);
}

if (write) {
  const out = [
    '// Erzeugt von tools/melody/import.ts aus den Notenbeispielen der Wikipedia-Artikel (gemeinfreie Melodien;',
    '// übernommen sind nur Tonhöhen, Dauern, Silben und ggf. Akkordfolgen). Nicht von Hand bearbeiten.',
    '',
    'export interface ImportedMelody {',
    '  text: string;',
    '  meter: number;',
    '  pickup: number;',
    '  originalKey: string;',
    '  /** Anteil des Notentexts, der mit unserem geprüften Text übereinstimmt. */',
    '  similarity: number;',
    '}',
    '',
    'export const MELODIES: Record<string, ImportedMelody> = {',
    ...results.map(
      (r) =>
        `  '${r.id}': { meter: ${r.meter}, pickup: ${r.pickup}, originalKey: '${r.originalKey}', similarity: ${r.similarity.toFixed(2)}, text: \`${r.text.replace(/`/g, '\\`')}\` },`,
    ),
    '};',
    '',
  ].join('\n');
  writeFileSync(new URL('../../src/music/songs-melodies.ts', import.meta.url), out);
  console.log(`\n${results.length} Melodien geschrieben.`);
}
