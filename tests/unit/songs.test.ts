import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SONG_SOURCES, SONGS } from '../../src/music/songs.ts';
import { barErrors, chordChanges, eventAt, parseSong } from '../../src/music/song.ts';
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
  // grobe Plausibilitätsprüfung gegen Tippfehler in Tonhöhen: höchstens 35 % akkordfremde Töne je Lied
  // (London Bridge hat mit seinen Durchgangstönen F über C echte 33 %)
  for (const s of SONGS) {
    const notes = s.events.filter((e) => e.midi !== null);
    if (!notes.length) continue;
    const foreign = notes.filter((e) => {
      const pcs = new Set(chord(e.chord).frets.map((f, i) => ([67, 60, 64, 69][i] + f) % 12));
      return !pcs.has(e.midi! % 12);
    });
    assert.ok(foreign.length / notes.length < 0.35, `${s.id}: ${foreign.length}/${notes.length}`);
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

test('ChordPro: Wörter teilen sich den Takt ihres Akkords, Akkord mitten im Wort verbindet', () => {
  const s = parseSong({
    id: 't',
    title: 'T',
    category: 'kinder',
    origin: 'Test',
    meter: 3,
    bpm: 90,
    chordpro: ['Im [C]Märzen der [Dm]Bauer die [G7]Rösslein ein[C]spannt,', '{comment: Strophe 2}', '[C]er setzt seine [G7:2]Felder'].join(String.fromCharCode(10)),
  });
  assert.equal(s.hasMelody, false);
  assert.deepEqual(
    s.events.map((e) => e.syllable),
    ['Im', 'Märzen', 'der', 'Bauer', 'die', 'Rösslein', 'ein', 'spannt,', 'er', 'setzt', 'seine', 'Felder'],
  );
  // Auftakt „Im“ (1 Schlag) gehört schon zum ersten Akkord
  assert.equal(s.events[0].chord, 'C');
  assert.equal(s.events[1].beat, 1);
  assert.equal(s.events[2].beat, 2.5);
  const ein = s.events.find((e) => e.syllable === 'ein')!;
  assert.equal(ein.joinNext, true);
  assert.equal(s.events.find((e) => e.syllable === 'spannt,')!.chordChange, true);
  // C zweimal hintereinander (Zeilenwechsel) ist kein Wechsel
  assert.equal(s.events.find((e) => e.syllable === 'er')!.chordChange, false);
  assert.equal(s.totalBeats, 1 + 3 * 5 + 2);
  assert.equal(s.lines, 2);
});
