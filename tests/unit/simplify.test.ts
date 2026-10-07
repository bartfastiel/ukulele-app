import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SONGS } from '../../src/music/songs.ts';
import { simplifyName, simplifySong } from '../../src/music/simplify.ts';
import { chord, chordCost, parseChordName } from '../../src/music/chords.ts';

test('schwere Griffe werden durch leichtere Verwandte ersetzt', () => {
  assert.equal(simplifyName('E'), 'E7');
  assert.equal(simplifyName('D7'), 'D');
  assert.equal(simplifyName('Em'), 'Em7');
});

test('leichte Griffe bleiben, Dur/Moll wird nie getauscht', () => {
  for (const n of ['C', 'Am', 'F', 'G', 'G7', 'C7', 'Dm']) assert.equal(simplifyName(n), n);
  for (const s of SONGS) {
    for (const c of s.chords) {
      const a = parseChordName(c)!;
      const b = parseChordName(simplifyName(c))!;
      assert.equal(a.root, b.root, c);
      assert.equal(a.quality.charAt(0) === 'm' && a.quality.indexOf('maj') !== 0, b.quality.charAt(0) === 'm' && b.quality.indexOf('maj') !== 0, c);
      assert.ok(chordCost(chord(simplifyName(c))) <= chordCost(chord(c)), c);
    }
  }
});

test('vereinfachtes Lied nutzt nur noch die Ersatzgriffe', () => {
  const s = simplifySong(SONGS.find((x) => x.id === 'my-bonnie')!);
  assert.ok(s.chords.indexOf('D7') < 0);
  assert.ok(s.events.every((e) => e.chord !== 'D7'));
});
