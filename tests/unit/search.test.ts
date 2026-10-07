import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SONGS } from '../../src/music/songs.ts';
import { fold, searchSongs, songText } from '../../src/music/search.ts';

test('Vereinheitlichung: Umlaute, ß und Großschreibung', () => {
  assert.equal(fold('Vögel'), fold('VOEGEL'));
  assert.equal(fold('Süßer'), fold('suesser'));
  assert.equal(fold('Glöckchen'), 'glockchen');
});

test('Titeltreffer kommen vor Texttreffern', () => {
  const hits = searchSongs(SONGS, 'Entchen');
  assert.equal(hits[0].song.id, 'alle-meine-entchen');
  assert.equal(hits[0].inTitle, true);
});

test('Suche im Liedtext liefert einen Ausschnitt mit der Fundstelle', () => {
  const hits = searchSongs(SONGS, 'Schwänzchen');
  const h = hits.find((x) => x.song.id === 'alle-meine-entchen')!;
  assert.ok(h, 'Alle meine Entchen nicht gefunden');
  assert.equal(h.inTitle, false);
  assert.equal(fold(h.snippet![1]), fold('Schwänzchen'));
});

test('mehrere Wörter müssen alle vorkommen, Umlaute auch als ae/oe/ue', () => {
  assert.ok(searchSongs(SONGS, 'voegel schon').some((x) => x.song.id === 'alle-voegel'));
  assert.equal(searchSongs(SONGS, 'voegel xylophon').length, 0);
});

test('Liedtext wird aus Silben zu Wörtern zusammengesetzt', () => {
  const s = SONGS.find((x) => x.id === 'alle-meine-entchen')!;
  assert.ok(songText(s).startsWith('Alle meine Entchen'));
});
