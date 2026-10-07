import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ROOTS, QUALITY_INTERVALS, chord, chordMidis, parseChordName } from '../../src/music/chords.ts';
import { pitchClass } from '../../src/music/notes.ts';
import { transposeName, transposeSong, songKey, suggestShift, originalShift, rateKeys } from '../../src/music/transpose.ts';
import { SONGS, song } from '../../src/music/songs.ts';

test('jeder Akkord in jeder Tonart hat einen Griff mit genau seinen Tönen (Quinte darf bei Vierklängen fehlen)', () => {
  for (const root of ROOTS)
    for (const q of Object.keys(QUALITY_INTERVALS)) {
      const name = root + q;
      const ch = chord(name);
      const p = parseChordName(name)!;
      const want = QUALITY_INTERVALS[q].map((i) => (p.root + i) % 12);
      const got = new Set(chordMidis(ch).map(pitchClass));
      for (const n of got) assert.ok(want.includes(n), `${name} (${ch.frets.join('')}): fremder Ton ${n}`);
      const required = QUALITY_INTERVALS[q].length === 4 ? want.filter((_, k) => QUALITY_INTERVALS[q][k] !== 7) : want;
      for (const n of required) assert.ok(got.has(n), `${name} (${ch.frets.join('')}): fehlt Ton ${n}`);
    }
});

test('Akkordnamen transponieren, auch über die Oktave hinaus', () => {
  assert.equal(transposeName('C', 7), 'G');
  assert.equal(transposeName('G7', 5), 'C7');
  assert.equal(transposeName('Am', 2), 'Bm');
  assert.equal(transposeName('F', -6), 'B');
  assert.equal(transposeName('Bb', 1), 'B');
  assert.equal(transposeName('Dm', -3), 'Bm');
});

test('Lied transponieren verschiebt Akkorde und Melodie, Tonart folgt', () => {
  const s = song('alle-meine-entchen')!;
  const t = transposeSong(s, 2);
  assert.deepEqual(t.chords, ['D', 'G', 'A7']);
  assert.equal(t.events[0].midi, s.events[0].midi! + 2);
  assert.equal(songKey(t).root, 2);
});

test('Original-/Quellentonart: Ode an die Freude (F) liegt im Original in D', () => {
  assert.equal(originalShift(song('ode-an-die-freude')!), -3);
  assert.equal(originalShift(song('bruder-jakob')!), null);
});

test('Vorschlag ist für jedes Lied eine spielbare Tonart (Griffe nicht schwerer als nötig)', () => {
  for (const s of SONGS) {
    const shift = suggestShift(s);
    assert.ok(shift >= -6 && shift <= 5, s.id);
    const rated = rateKeys(s);
    const bestPlay = Math.min(...rated.map((r) => r.play));
    const chosen = rated.find((r) => r.shift === shift)!;
    assert.ok(chosen.play <= bestPlay + 4, `${s.id}: Vorschlag ${shift} viel schwerer als nötig`);
  }
});
