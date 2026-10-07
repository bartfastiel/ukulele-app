import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chordLine, importSong, normalizeChord } from '../../src/music/import.ts';
import { parseSong } from '../../src/music/song.ts';
import { newOwnId, ownToSong, sanitizeOwnSong } from '../../src/music/own-songs.ts';

// eigene Testtexte (keine fremden Lieder)
const OVER = ['C              G7', 'Heute spiel ich Ukulele,', 'G7           C', 'und die Sonne lacht.'].join('\n');

test('Akkordzeile über Textzeile wird zu ChordPro, die Spalte bestimmt die Stelle', () => {
  const r = importSong(OVER);
  assert.equal(r.format, 'chord-lines');
  assert.equal(r.chordpro, '[C]Heute spiel ich [G7]Ukulele,\n[G7]und die Sonne [C]lacht.');
  assert.deepEqual(r.chords, ['C', 'G7']);
  assert.deepEqual(r.unknown, []);
});

test('Akkord mitten im Wort und Akkorde hinter dem Textende', () => {
  const r = importSong('   F         C   G\nMein Hund heißt Bello');
  assert.equal(r.chordpro, 'Mei[F]n Hund hei[C]ßt B[G]ello');
  const r2 = importSong('C       F      G7\nKurz');
  assert.equal(r2.chordpro, '[C]Kurz [F] [G7]');
  const song = parseSong({ id: 't', title: 't', category: 'eigene', origin: '', meter: 4, bpm: 90, chordpro: r2.chordpro });
  assert.equal(song.totalBeats, 12);
});

test('ChordPro bleibt ChordPro; Umwandeln ist wiederholbar ohne Änderung', () => {
  const src = '[C]Heute spiel ich [F]Ukule[C]le,\n[G7:2]und die [C:2]Sonne lacht.';
  const r = importSong(src);
  assert.equal(r.format, 'chordpro');
  assert.equal(r.chordpro, src);
  const again = importSong(importSong(OVER).chordpro);
  assert.equal(again.chordpro, importSong(OVER).chordpro);
  assert.equal(again.format, 'chordpro');
});

test('Akkordzeile ohne Text darunter: Zwischenspiel, Taktstriche und Wiederholungen werden ignoriert', () => {
  const r = importSong('| C  | G7 | (2x)\n\nC\nLa la la');
  assert.equal(r.chordpro, '[C] [G7]\n\n[C]La la la');
  assert.ok(chordLine('|: Am  F  | C  G :| x2'));
  assert.equal(chordLine('Am Brunnen steht ein Baum'), null);
});

test('Abschnittsnamen werden zu Kommentaren und nicht als Akkord gemeldet', () => {
  const r = importSong('[Refrain]\n[C]La la\nStrophe 2:\n[G]Lu lu');
  assert.deepEqual(r.unknown, []);
  assert.equal(r.chordpro, '{c: Refrain}\n[C]La la\n{c: Strophe 2}\n[G]Lu lu');
  assert.equal(parseSong({ id: 't', title: 't', category: 'eigene', origin: '', meter: 4, bpm: 90, chordpro: r.chordpro }).lines, 2);
});

test('unbekannte Akkorde werden gemeldet und weggelassen, ähnliche vereinfacht', () => {
  const r = importSong('[C]Eins [Cxyz]zwei [G9]drei [D/F#]vier [Pause]fünf');
  assert.deepEqual(r.unknown, ['Cxyz', 'Pause']);
  assert.deepEqual(r.simplified, [
    { from: 'G9', to: 'G7' },
    { from: 'D/F#', to: 'D' },
  ]);
  assert.equal(r.chordpro, '[C]Eins zwei [G7]drei [D]vier fünf');
});

test('Schreibweisen: Kreuz/b, min, maj7, deutsche H-Schreibweise', () => {
  assert.equal(normalizeChord('A#')!.name, 'Bb');
  assert.equal(normalizeChord('Db')!.name, 'C#');
  assert.equal(normalizeChord('Amin')!.name, 'Am');
  assert.equal(normalizeChord('CM7')!.name, 'Cmaj7');
  assert.equal(normalizeChord('Hm', true)!.name, 'Bm');
  assert.equal(normalizeChord('B', true)!.name, 'Bb');
  assert.equal(normalizeChord('B')!.name, 'B');
  assert.equal(normalizeChord('Xyz'), null);
  const r = importSong('H7       E\nLa la la la');
  assert.equal(r.german, true);
  assert.deepEqual(r.chords, ['B7', 'E']);
});

test('Titel aus {title:}, Tabulatoren und geschützte Leerzeichen', () => {
  const r = importSong('{title: Mein Lied}\nC\tG\nMorgen, wieder');
  assert.equal(r.title, 'Mein Lied');
  assert.equal(r.chordpro, '[C]Morgen, [G]wieder');
});

test('ohne Akkorde: Format „none“; Textzeilen ohne Akkord werden gezählt', () => {
  assert.equal(importSong('Nur Text\nohne Akkorde').format, 'none');
  const r = importSong('[C]Eins\nzwei\ndrei');
  assert.equal(r.linesWithoutChords, 2);
});

test('gemischt: Klammer-Akkorde und Akkordzeilen im selben Text', () => {
  const r = importSong('[C]Eins zwei\nF    C\nDrei vier');
  assert.equal(r.format, 'mixed');
  assert.equal(r.chordpro, '[C]Eins zwei\n[F]Drei [C]vier');
});

test('eigene Lieder: ids, Prüfung gespeicherter Daten, spielbares Lied', () => {
  assert.equal(newOwnId('Über den Wolken!', []), 'mein-ueber-den-wolken');
  assert.equal(newOwnId('Lied', ['mein-lied']), 'mein-lied-2');
  assert.equal(sanitizeOwnSong({ id: 'bruder-jakob', title: 'x', text: '' }), null);
  assert.equal(sanitizeOwnSong({ id: 'mein-x', title: '  ', text: '' }), null);
  const s = sanitizeOwnSong({ id: 'mein-x', title: ' Mein  Lied ', text: OVER, meter: 7, bpm: 999 })!;
  assert.equal(s.title, 'Mein Lied');
  assert.equal(s.meter, 4);
  assert.equal(s.bpm, 200);
  const song = ownToSong(s)!;
  assert.equal(song.hasMelody, false);
  assert.equal(song.category, 'eigene');
  assert.deepEqual(song.chords, ['C', 'G7']);
  assert.equal(ownToSong({ ...s, text: 'kein Akkord' }), null);
});
