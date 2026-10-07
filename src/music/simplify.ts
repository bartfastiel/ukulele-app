import { chord, chordCost, parseChordName, ROOTS } from './chords.ts';
import type { Song } from './song.ts';

/**
 * Verwandte Griffe, die harmonisch fast gleich klingen. Dur/Moll wird nie getauscht; aus Dur darf Sept werden
 * (E → E7 ist auf der Ukulele der klassische Ausweg), Zusätze wie maj7, 6, sus, add9 dürfen wegfallen.
 */
const RELATIVES: Record<string, string[]> = {
  '': ['7'],
  '7': [''],
  m: ['m7'],
  m7: ['m'],
  maj7: ['', '7'],
  '6': [''],
  m6: ['m'],
  sus2: [''],
  sus4: [''],
  '7sus4': ['7', ''],
  add9: [''],
};

/** Mindestens so viel leichter muss der Ersatz sein, sonst bleibt der Originalgriff. */
const MIN_GAIN = 2;

export function simplifyName(name: string): string {
  const p = parseChordName(name);
  if (!p) return name;
  const rels = RELATIVES[p.quality];
  if (!rels) return name;
  const own = chordCost(chord(name));
  let best = name;
  let bestCost = own - MIN_GAIN + 1e-9;
  for (const q of rels) {
    const cand = ROOTS[p.root] + q;
    const cost = chordCost(chord(cand));
    if (cost < bestCost) {
      best = cand;
      bestCost = cost;
    }
  }
  return best;
}

/** Ersetzte Griffe, z. B. { E: 'E7' }. */
export function simplifications(song: Song): Record<string, string> {
  const out: Record<string, string> = {};
  for (const c of song.chords) {
    const s = simplifyName(c);
    if (s !== c) out[c] = s;
  }
  return out;
}

export function simplifySong(song: Song): Song {
  const map = simplifications(song);
  if (!Object.keys(map).length) return song;
  const sub = (c: string) => map[c] || c;
  const chords: string[] = [];
  for (const c of song.chords) if (chords.indexOf(sub(c)) < 0) chords.push(sub(c));
  return { ...song, chords, events: song.events.map((e) => ({ ...e, chord: sub(e.chord) })) };
}
