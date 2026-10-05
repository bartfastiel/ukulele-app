import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SONG_SOURCES, SONGS } from '../../src/music/songs.ts';
import { barErrors, chordChanges, eventAt } from '../../src/music/song.ts';
import { chord } from '../../src/music/chords.ts';
import { tabPosition } from '../../src/music/notes.ts';

test('alle Takte sind vollständig', () => {
  assert.deepEqual(SONG_SOURCES.flatMap(barErrors), []);
});

test('alle Akkorde der Lieder haben ein Griffbild', () => {
  for (const s of SONGS) for (const name of s.chords) assert.ok(chord(name), `${s.id}: ${name}`);
});

test('alle Melodietöne liegen auf der Ukulele mit hohem G (bis zum 12. Bund)', () => {
  for (const s of SONGS)
    for (const e of s.events) {
      if (e.midi === null) continue;
      const pos = tabPosition(e.midi);
      assert.ok(pos && pos.fret <= 12, `${s.id}: ${e.syllable} (${e.midi})`);
    }
});

test('Melodietöne passen zum Akkord oder sind Durchgangstöne auf leichter Zählzeit', () => {
  // grobe Plausibilitätsprüfung gegen Tippfehler in Tonhöhen: höchstens 30 % akkordfremde Töne je Lied
  for (const s of SONGS) {
    const notes = s.events.filter((e) => e.midi !== null);
    const foreign = notes.filter((e) => {
      const pcs = new Set(chord(e.chord).frets.map((f, i) => ([67, 60, 64, 69][i] + f) % 12));
      return !pcs.has(e.midi! % 12);
    });
    assert.ok(foreign.length / notes.length < 0.3, `${s.id}: ${foreign.length}/${notes.length}`);
  }
});

test('ids sind eindeutig und das erste Ereignis wechselt den Akkord', () => {
  assert.equal(new Set(SONGS.map((s) => s.id)).size, SONGS.length);
  for (const s of SONGS) assert.equal(chordChanges(s)[0], 0);
});

test('eventAt findet die klingende Silbe', () => {
  const s = SONGS.find((x) => x.id === 'alle-meine-entchen')!;
  assert.equal(eventAt(s, -1), -1);
  assert.equal(eventAt(s, 0), 0);
  assert.equal(s.events[eventAt(s, 4.5)].syllable, 'Ent');
  assert.equal(eventAt(s, 1000), s.events.length - 1);
});

test('Melisma und Bruchdauern werden gelesen', () => {
  const ode = SONGS.find((x) => x.id === 'ode-an-die-freude')!;
  assert.ok(ode.events.some((e) => e.hold));
  const row = SONGS.find((x) => x.id === 'row-row')!;
  assert.ok(Math.abs(row.totalBeats - 32) < 1e-9);
});
