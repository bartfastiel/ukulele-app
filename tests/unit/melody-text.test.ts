import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MELODIES } from '../../src/music/songs-melodies.ts';
import { SONGS } from '../../src/music/songs.ts';
import { CHORD_SONGS } from '../../src/music/songs-chordpro.ts';
import { KINDER_SONGS } from '../../src/music/songs-kinder.ts';
import { ENGLISH_SONGS } from '../../src/music/songs-english.ts';
import { CHRISTMAS_SONGS } from '../../src/music/songs-weihnachten.ts';
import type { Song } from '../../src/music/song.ts';
import { chordproWords, letters, relyric, NO_FIT } from '../../tools/melody/relyric.ts';

const SOURCES = CHORD_SONGS.concat(KINDER_SONGS, ENGLISH_SONGS, CHRISTMAS_SONGS);

/** Wörter, wie die Karaoke sie zeigt (gehaltene Töne und Pausen zählen nicht, Silben eines Worts zusammen). */
function shownWords(song: Song): string[] {
  const out: string[] = [];
  let cur = '';
  for (const e of song.events) {
    if (e.hold || !e.syllable) continue;
    cur += e.syllable.replace(/‿/g, ' ');
    if (!e.joinNext) {
      out.push(cur);
      cur = '';
    }
  }
  if (cur) out.push(cur);
  // „th’an-gel-ic“: zwei Wörter auf einer Note
  return out.join(' ').split(' ').map(letters).filter(Boolean);
}

/**
 * Stimmen die gezeigten Wörter mit dem Anfang des belegten Texts überein? Erlaubt sind nur Wiederholungen, die das
 * Notenbeispiel ausschreibt („Städtele naus, Städtele naus“), und ein Ende mitten im letzten Wort.
 */
function mismatch(shown: string[], text: string[]): string | null {
  let j = 0;
  for (let i = 0; i < shown.length; ) {
    if (j < text.length && shown[i] === text[j]) {
      i++;
      j++;
      continue;
    }
    let k = Math.min(i, shown.length - i);
    while (k >= 2 && shown.slice(i, i + k).join(' ') !== shown.slice(i - k, i).join(' ')) k--;
    if (k >= 2) {
      i += k;
      continue;
    }
    if (i === shown.length - 1 && j < text.length && text[j].startsWith(shown[i])) return null;
    return `Wort ${i + 1}: „${shown[i]}“, im Text steht „${text[j] ?? '(Ende)'}“`;
  }
  return null;
}

test('Karaoke zeigt bei Liedern mit Melodie wörtlich den belegten Text (1. Strophe)', () => {
  const ids = Object.keys(MELODIES).filter((id) => SOURCES.some((s) => s.id === id));
  assert.ok(ids.length >= 30, `nur ${ids.length} Lieder mit Melodie`);
  for (const id of ids) {
    const src = SOURCES.find((s) => s.id === id)!;
    const song = SONGS.find((s) => s.id === id)!;
    assert.ok(song.hasMelody, id);
    const text = chordproWords(src).map(letters).filter(Boolean);
    assert.equal(mismatch(shownWords(song), text), null, id);
  }
});

test('Melodietexte sind mit den aktuellen Regeln erzeugt (node tools/melody/relyric.ts --write)', () => {
  for (const id of Object.keys(MELODIES)) {
    const src = SOURCES.find((s) => s.id === id);
    if (!src) continue;
    assert.equal(relyric(MELODIES[id].text, src).text, MELODIES[id].text, id);
  }
});

test('Lieder, deren Melodie nicht zum belegten Text passt, haben keine Melodie', () => {
  for (const id of Object.keys(NO_FIT)) {
    assert.ok(!MELODIES[id], id);
    const song = SONGS.find((s) => s.id === id);
    assert.ok(song, `${id} fehlt`);
    assert.equal(song!.hasMelody, false, id);
  }
});

test('Silben werden nach dem belegten Text getrennt, Wiederholungen und Melismen bleiben', () => {
  const src = { id: 'probe', title: 'Probe', category: 'kinder' as const, origin: '', meter: 4, bpm: 100, chordpro: '[C]Ein Jäger aus Kurpfalz, juja, juja, wiedrum komm. Und dann?' };
  const melody = '\n[C]Der:C4 Jä-:D4 ger:E4 aus:F4 Kur-:G4 pfalz,:A4 Ju-:G4 hu,:F4 Ju-:G4 hu,:F4 wie-:E4 der-:D4 um:C4 komm,:C4 wie-:E4 der-:D4 um:C4 komm.:C4';
  const r = relyric(melody, src);
  assert.equal(r.text, '\n[C]Ein:C4 Jä-:D4 ger:E4 aus:F4 Kur-:G4 pfalz,:A4 ju-:G4 ja,:F4 ju-:G4 ja,:F4 wie-:E4 ~:D4 drum:C4 komm.:C4 wie-:E4 ~:D4 drum:C4 komm.:C4');
});
