import { test } from 'node:test';
import assert from 'node:assert/strict';
import { instrument, setInstrument } from '../../src/music/instrument.ts';
import { QUALITY_INTERVALS, ROOTS, chordCost, parseChordName, playableChord } from '../../src/music/chords.ts';
import { pitchClass, stringMidi } from '../../src/music/notes.ts';
import { COMP_LEVELS, compBars, compChordsText, compGrip, compStrum } from '../../src/music/blues.ts';

const CHORD_INSTRUMENTS = ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline'];
const DEGREES = [0, 0, 0, 0, 5, 5, 0, 0, 7, 5, 0, 7];

function each(f: (id: string) => void): void {
  try {
    for (const id of CHORD_INSTRUMENTS) {
      setInstrument(id);
      f(id);
    }
  } finally {
    setInstrument('ukulele');
  }
}

test('Blues-Akkorde in der ★-Tonart: leicht Dur (B7 statt B mit Barré), dann Septakkorde', () => {
  const easy: Record<string, string> = {
    ukulele: 'C – F – G',
    gitarre: 'E – A – B7',
    banjo: 'G – C – D',
    bariton: 'G – C – D',
    mandoline: 'D – G – A',
  };
  each((id) => {
    const key = instrument().blues.easyKey;
    assert.equal(compChordsText(key, COMP_LEVELS[0]), easy[id], id);
    const i = ROOTS[key];
    assert.equal(compChordsText(key, COMP_LEVELS[1]), `${i}7 – ${ROOTS[(key + 5) % 12]}7 – ${ROOTS[(key + 7) % 12]}7`, id);
  });
});

test('Blues-Akkorde in allen Tonarten: I, IV, V nach dem 12-Takt-Schema, jeder Griff klingt genau nach seinem Akkord', () => {
  each((id) => {
    for (let key = 0; key < 12; key++)
      for (const level of COMP_LEVELS) {
        const bars = compBars(key, level);
        assert.equal(bars.length, 12);
        bars.forEach((name, bar) => {
          const where = `${id} in ${ROOTS[key]} (${level.id}), Takt ${bar + 1} ${name}`;
          const p = parseChordName(name)!;
          assert.equal(p.root, (key + DEGREES[bar]) % 12, `${where}: Stufe`);
          if (level.id === 'sept') assert.equal(p.quality, '7', where);
          else assert.ok(p.quality === '' || p.quality === '7', where);
          const grip = compGrip(name);
          assert.ok(playableChord(grip), `${where}: nicht spielbar`);
          assert.ok(Number.isFinite(chordCost(grip)), where);
          const pressed = grip.frets.filter((f) => f > 0);
          if (pressed.length) assert.ok(Math.max(...pressed) - Math.min(...pressed) <= 3, `${where}: Spanne`);
          const sounding: number[] = [];
          grip.frets.forEach((f, s) => f >= 0 && sounding.push(pitchClass(stringMidi(s, f))));
          const tones = QUALITY_INTERVALS[p.quality].map((iv) => (p.root + iv) % 12);
          for (const pc of sounding) assert.ok(tones.indexOf(pc) >= 0, `${where}: fremder Ton ${pc} in ${grip.frets.join(' ')}`);
          // die Quinte darf beim Septakkord fehlen, Grundton, Terz und Septime nie
          for (const iv of QUALITY_INTERVALS[p.quality])
            if (!(p.quality === '7' && iv === 7)) assert.ok(sounding.indexOf((p.root + iv) % 12) >= 0, `${where}: Ton ${iv} fehlt in ${grip.frets.join(' ')}`);
        });
      }
  });
});

test('Blues-Akkorde: Schlagmuster je Stufe, auf der Mandoline der Chop auf 2 und 4', () => {
  each((id) => {
    assert.equal(compStrum(COMP_LEVELS[0]), 'D-D-D-D-', id);
    assert.equal(compStrum(COMP_LEVELS[1]), id === 'mandoline' ? '--C---C-' : 'DUDUDUDU', id);
  });
});
