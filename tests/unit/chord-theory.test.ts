import { test } from 'node:test';
import assert from 'node:assert/strict';
import { majorKeysWith, spellChord } from '../../src/music/chord-theory.ts';
import { ROOTS } from '../../src/music/chords.ts';

const spell = (name: string, q: string) => spellChord(ROOTS.indexOf(name), q).join(' ');

test('Akkordtöne werden nach Buchstaben geschrieben, nicht nach Tasten', () => {
  assert.equal(spell('C', ''), 'C E G');
  assert.equal(spell('E', ''), 'E G# B');
  assert.equal(spell('F#', ''), 'F# A# C#');
  assert.equal(spell('Eb', 'm'), 'Eb Gb Bb');
  assert.equal(spell('Bb', '7'), 'Bb D F Ab');
  assert.equal(spell('C', 'dim7'), 'C Eb Gb Bbb');
  assert.equal(spell('C', 'aug'), 'C E G#');
  assert.equal(spell('D', 'sus4'), 'D G A');
  assert.equal(spell('A', 'm7b5'), 'A C Eb G');
});

test('Tonarten: Dur-Akkord als I, IV, V; Moll als II, III, VI; Septakkord nur als V', () => {
  const keys = (name: string, q: string) => majorKeysWith(ROOTS.indexOf(name), q).map((k) => ROOTS[k.key] + ':' + (k.degree + 1)).join(' ');
  assert.equal(keys('G', ''), 'G:1 D:4 C:5');
  assert.equal(keys('A', 'm'), 'G:2 F:3 C:6');
  assert.equal(keys('G', '7'), 'C:5');
  assert.equal(keys('B', 'dim'), 'C:7');
  assert.equal(keys('C', 'sus4'), '');
});
