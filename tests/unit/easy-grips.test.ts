import { test } from 'node:test';
import assert from 'node:assert/strict';
import { instrument, setInstrument, setTuning } from '../../src/music/instrument.ts';
import { chord, chordMidis, describeChord, parseChordName, playableChord } from '../../src/music/chords.ts';
import { midiToFreq, pitchClass } from '../../src/music/notes.ts';
import { THUMB, allEasyGrips, claimedClasses, easyGrips, easyLabels, lowestClass, songGrip, soundingClasses } from '../../src/music/easy-grips.ts';
import { candidatesFor } from '../../src/audio/listen.ts';
import { instrumentPeaks, judgeChord } from '../../src/audio/chord-detect.ts';
import { spectrum } from '../../src/audio/offline.ts';
import { renderStrum } from '../../src/audio/pluck.ts';
import type { Chord } from '../../src/music/grip.ts';

const IDS = ['ukulele', 'gitarre', 'bariton', 'banjo', 'mandoline'];
const SR = 48000;

function each(f: (id: string) => void): void {
  try {
    for (const id of IDS) {
      setInstrument(id);
      f(id);
    }
  } finally {
    setInstrument('ukulele');
  }
}

test('leichte Griffe: jede Variante klingt genau mit den Tönen, die ihre Beschriftung verspricht', () => {
  let n = 0;
  each((id) => {
    for (const e of allEasyGrips()) {
      n++;
      const where = `${id} ${e.chord} ${e.grip.frets.join('')}`;
      assert.ok(parseChordName(e.chord), where);
      assert.deepEqual(soundingClasses(e.grip), claimedClasses(e), where);
      const labels = easyLabels(e).join(' | ');
      const root = parseChordName(e.is || e.chord)!.root;
      // anderer Akkord, fehlender Grundton, Daumen und anderer Basston stehen immer dabei
      assert.equal(!!e.is, labels.indexOf(`eigentlich ${e.is}`) >= 0, `${where}: ${labels}`);
      assert.equal(soundingClasses(e.grip).indexOf(root) < 0, !!e.noRoot, where);
      if (e.noRoot) assert.ok(labels.indexOf('ohne Grundton') >= 0, where);
      if (e.grip.fingers.indexOf(THUMB) >= 0) assert.ok(labels.indexOf('Daumen') >= 0, where);
      const sameAsLibrary = chord(e.chord).frets.join(' ') === e.grip.frets.join(' ');
      if (id !== 'ukulele' && !e.noRoot && !sameAsLibrary && lowestClass(e.grip) !== root) assert.ok(labels.indexOf('tiefster Ton') >= 0, `${where}: ${labels}`);
      if (!e.is && !e.noRoot) assert.ok(/alle Töne von|gleiche Töne/.test(labels), where);
      // eine Variante unterscheidet sich vom Bibliotheksgriff in Bünden oder Fingersatz
      assert.ok(!sameAsLibrary || chord(e.chord).fingers.join('') !== e.grip.fingers.join(''), where);
      assert.equal(e.grip.name, e.chord);
    }
  });
  assert.ok(n >= 20, `nur ${n} Varianten`);
});

/** Greifbar: Spanne ≤ 3, jeder gedrückte Ton hat einen Finger, Finger aufsteigend nach Bund, Querfinger ohne Lücke. */
function gripErrors(ch: Chord): string[] {
  const errors: string[] = [];
  if (!playableChord(ch)) errors.push('nicht auf dem Instrument');
  const pressed = ch.frets.filter((f) => f > 0);
  if (Math.max(...pressed) - Math.min(...pressed) > 3) errors.push('Spanne > 3');
  const fretOf: Record<number, number> = {};
  ch.frets.forEach((f, i) => {
    const fi = ch.fingers[i];
    if (f > 0 && !fi) errors.push(`Saite ${i} ohne Finger`);
    if (f <= 0 && fi) errors.push(`Saite ${i}: Finger auf leerer Saite`);
    if (!fi) return;
    if (fretOf[fi] !== undefined && fretOf[fi] !== f) errors.push(`Finger ${fi} in zwei Bünden`);
    fretOf[fi] = f;
  });
  for (let a = 1; a <= 4; a++)
    for (let b = a + 1; b <= 4; b++) if (fretOf[a] !== undefined && fretOf[b] !== undefined && fretOf[a] > fretOf[b]) errors.push(`Finger ${a} hinter Finger ${b}`);
  // ein Finger auf mehreren Saiten liegt quer: dazwischen klingt keine leere Saite
  for (let fi = 1; fi <= 4; fi++) {
    const on = ch.fingers.map((x, i) => (x === fi ? i : -1)).filter((i) => i >= 0);
    for (let i = on[0]; on.length > 1 && i < on[on.length - 1]; i++) if (ch.frets[i] === 0) errors.push(`leere Saite ${i} unter dem Querfinger`);
  }
  // der Daumen greift nur die tiefste Saite
  ch.fingers.forEach((fi, i) => {
    if (fi === THUMB && i !== 0) errors.push('Daumen nicht auf der tiefen Saite');
  });
  return errors;
}

test('leichte Griffe: jede Variante ist mit einer Hand greifbar', () => {
  each((id) => {
    for (const e of allEasyGrips()) assert.deepEqual(gripErrors(e.grip), [], `${id} ${e.chord} ${e.grip.frets.join('')}`);
  });
});

test('leichte Griffe: gewählt, erkennt das Mikrofon die Variante als richtig', () => {
  each((id) => {
    for (const e of allEasyGrips()) {
      const sig = renderStrum(chordMidis(e.grip).map(midiToFreq), SR, 1.2, 18, instrument().synth);
      const peaks = instrumentPeaks(spectrum(sig, 4800 + 8192), SR / 8192);
      const v = judgeChord(peaks, e.chord, candidatesFor(e.chord, e.grip));
      assert.ok(v && v.ok, `${id} ${e.chord} ${e.grip.frets.join('')}: erkannt als ${v && v.best}`);
    }
  });
});

test('leichte Griffe: Kandidaten ersetzen den Bibliotheksgriff, gleiche Griffe fallen weg', () => {
  try {
    setInstrument('gitarre');
    const f = easyGrips('F').filter((e) => e.is === 'Fmaj7')[0];
    const c = candidatesFor('F', f.grip);
    assert.equal(c.filter((x) => x.name === 'F').length, 1);
    assert.equal(c.filter((x) => x.name === 'Fmaj7').length, 0);
    assert.equal(c.filter((x) => x.name === 'F')[0].frets.join(''), f.grip.frets.join(''));
  } finally {
    setInstrument('ukulele');
  }
});

test('leichte Griffe: Daumen im Text, in Liedern nur Mini-Griffe mit allen Tönen', () => {
  try {
    setInstrument('gitarre');
    const thumbG = easyGrips('G').filter((e) => e.grip.fingers.indexOf(THUMB) >= 0)[0];
    assert.match(describeChord(thumbG.grip), /Daumen auf der E-Saite im 3\. Bund/);
    assert.match(describeChord(thumbG.grip), /nicht anschlagen: A/);
    assert.equal(songGrip('G')!.frets.join(','), '-1,-1,0,0,0,3');
    assert.equal(songGrip('C')!.frets.join(','), '-1,-1,2,0,1,0');
    assert.equal(songGrip('F'), null);
    assert.equal(songGrip('Am'), null);
    // in anderen Stimmungen gelten die Varianten nicht
    setTuning('drop-d');
    assert.equal(easyGrips('G').length, 0);
    assert.equal(songGrip('G'), null);
    setTuning('');
    setInstrument('ukulele');
    for (const n of ['C', 'F', 'G', 'D', 'E', 'Bb']) assert.equal(songGrip(n), null, n);
    assert.ok(easyGrips('E').some((e) => e.is === 'E7'));
    // Pitch-Klassen der Bibliothek bleiben unberührt
    assert.deepEqual(chordMidis(chord('D')).map(pitchClass), [9, 2, 6, 9]);
  } finally {
    setInstrument('ukulele');
  }
});
