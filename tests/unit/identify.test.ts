import { test } from 'node:test';
import assert from 'node:assert/strict';
import { identifyFingering, nameChord, singleNote, libraryName, positions } from '../../src/music/identify.ts';
import { findPeaks } from '../../src/audio/chord-detect.ts';
import { spectrum } from '../../src/audio/offline.ts';
import { renderPluck, renderStrum } from '../../src/audio/pluck.ts';
import { CHORDS, chordMidis } from '../../src/music/chords.ts';
import { STRINGS, midiToFreq, pitchClass } from '../../src/music/notes.ts';

const SR = 48000;
const peaksOf = (sig: Float32Array) => findPeaks(spectrum(sig, 4800 + 8192), SR / 8192);
const strumFrets = (frets: number[]) =>
  renderStrum(
    frets.flatMap((f, i) => (f >= 0 ? [midiToFreq(STRINGS[i].midi + f)] : [])),
    SR,
    1.2,
  );

test('Namen: Dur, Moll, Sept, maj7, vermindert, übermäßig, sus4', () => {
  assert.equal(nameChord([0, 4, 7])[0].name, 'C');
  assert.equal(nameChord([9, 0, 4])[0].name, 'Am');
  assert.equal(nameChord([7, 11, 2, 5])[0].name, 'G7');
  assert.equal(nameChord([0, 4, 7, 11])[0].name, 'Cmaj7');
  assert.equal(nameChord([11, 2, 5])[0].name, 'Bdim');
  assert.equal(nameChord([0, 4, 8]).map((c) => c.name).join(' '), 'Caug Eaug G#aug');
  assert.equal(nameChord([2, 7, 9])[0].name, 'Dsus4');
});

test('Mehrdeutig: Am7 heißt auch C6', () => {
  const names = nameChord([9, 0, 4, 7]).map((c) => c.name);
  assert.ok(names.includes('Am7') && names.includes('C6'), names.join(' '));
});

test('jeder Bibliotheksgriff wird mit Bünden und Namen erkannt', () => {
  for (const ch of CHORDS) {
    const f = identifyFingering(peaksOf(strumFrets(ch.frets)))!;
    assert.ok(f, ch.name);
    const pcs = chordMidis(ch).map(pitchClass);
    const found = f.midis.map(pitchClass);
    assert.deepEqual(new Set(found), new Set(pcs), `${ch.name}: Töne ${found} statt ${pcs} (Bünde ${f.frets})`);
    assert.ok(nameChord(found).some((n) => n.name === ch.name || libraryName(f.frets) === ch.name), `${ch.name}: ${nameChord(found).map((n) => n.name)}`);
  }
});

test('ungewöhnlicher Griff außerhalb der Bibliothek: Cdim7 (2323) wird erkannt', () => {
  const f = identifyFingering(peaksOf(strumFrets([2, 3, 2, 3])))!;
  assert.ok(f);
  // 5320 klingt exakt gleich (dieselben vier Töne auf anderen Saiten) – beide Griffe sind richtig
  assert.deepEqual(f.midis.slice().sort(), [63, 66, 69, 72]);
  assert.ok(nameChord(f.midis.map(pitchClass)).some((n) => n.quality.name === 'vermindert-Sept'));
});

test('einzelner Ton: E4 auf der E-Saite, mit allen Stellen auf dem Hals', () => {
  const peaks = peaksOf(renderPluck(midiToFreq(64), SR, 1));
  assert.equal(singleNote(peaks), 64);
  assert.deepEqual(positions(64), [{ string: 1, fret: 4 }, { string: 2, fret: 0 }]);
});

test('Akkord ist kein einzelner Ton', () => {
  assert.equal(singleNote(peaksOf(strumFrets([0, 0, 0, 3]))), null);
});

test('Blues in jeder Tonart: Vorgabe-Töne in den ersten drei Bünden, Grundtöne passen, Orgel unter 240 Hz', async () => {
  const { bluesBars, LEVELS, rootOf, position, organVoicing, scalePositions } = await import('../../src/music/blues.ts');
  for (let key = 0; key < 12; key++) {
    const bars = bluesBars(key);
    assert.equal(rootOf(bars[0]).uke % 12, key);
    assert.equal(rootOf(bars[4]).uke % 12, (key + 5) % 12);
    assert.equal(rootOf(bars[8]).uke % 12, (key + 7) % 12);
    assert.ok(scalePositions(key, 3).length >= 6, `Tonleiter in ${bars[0]}`);
    for (const level of LEVELS) {
      if (!level.notes) continue;
      for (const chordName of bars) {
        const notes = level.notes(chordName);
        assert.equal(notes.length, 4);
        assert.equal(notes[0].midi % 12, rootOf(chordName).uke % 12, `${level.id} ${chordName}`);
        for (const n of notes) assert.ok(position(n.midi).fret <= 3, `${level.id} ${chordName}: ${n.midi}`);
      }
    }
    for (const chordName of bars) for (const m of organVoicing(chordName)) assert.ok(m >= 47 && m <= 58, `${chordName}: ${m}`);
  }
});
