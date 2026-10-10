import { test } from 'node:test';
import assert from 'node:assert/strict';
import { setInstrument } from '../../src/music/instrument.ts';
import { ROOTS, chord, chordMidis, parseChordName } from '../../src/music/chords.ts';
import { pitchClass } from '../../src/music/notes.ts';
import { chordLongName } from '../../src/site/chord-names.ts';

test('Powerchords (E5, A5 …): Grundton und Quinte, auf der Gitarre drei benachbarte Saiten, verschiebbar', () => {
  setInstrument('gitarre');
  try {
    assert.deepEqual(chord('E5').frets, [0, 2, 2, -1, -1, -1]);
    assert.deepEqual(chord('A5').frets, [-1, 0, 2, 2, -1, -1]);
    assert.deepEqual(chord('D5').frets, [-1, -1, 0, 2, 3, -1]);
    assert.deepEqual(chord('G5').frets, [3, 5, 5, -1, -1, -1]);
    assert.deepEqual(chord('C5').frets, [-1, 3, 5, 5, -1, -1]);
    for (const r of ROOTS) {
      const ch = chord(r + '5');
      const sounding = ch.frets.map((f, i) => (f >= 0 ? i : -1)).filter((i) => i >= 0);
      assert.equal(sounding.length, 3, r);
      assert.equal(sounding[2] - sounding[0], 2, `${r}5: Saiten nebeneinander`);
      assert.equal(ch.barre, undefined, `${r}5 ohne Barré`);
      assert.equal(pitchClass(chordMidis(ch)[0]), parseChordName(r + '5')!.root, `${r}5: Grundton im Bass`);
    }
  } finally {
    setInstrument('ukulele');
  }
});

test('Powerchords auf anderen Instrumenten: Saiten von der Bass-Seite weglassen, nur Grundton und Quinte', () => {
  setInstrument('ukulele');
  assert.deepEqual(chord('F5').frets, [-1, 0, 1, 3]);
  assert.equal(chordLongName('E5', 'de'), 'E-Powerchord (Grundton und Quinte)');
  assert.equal(chordLongName('A5', 'en'), 'A power chord');
});
