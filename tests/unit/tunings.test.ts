import { test } from 'node:test';
import assert from 'node:assert/strict';
import { INSTRUMENTS, activeTuning, baseInstrument, instrument, setInstrument, setTuning } from '../../src/music/instrument.ts';
import { CHORDS, QUALITY_INTERVALS, ROOTS, chord, chordMidis, parseChordName, playableChord } from '../../src/music/chords.ts';
import { STRINGS, midiToFreq, pitchClass, stringMidi, tabPosition } from '../../src/music/notes.ts';
import { SONGS } from '../../src/music/songs.ts';
import { transposeName } from '../../src/music/transpose.ts';
import { instrumentPeaks, judgeChord } from '../../src/audio/chord-detect.ts';
import { spectrum } from '../../src/audio/offline.ts';
import { renderStrum } from '../../src/audio/pluck.ts';
import { scalePositions } from '../../src/music/blues.ts';
import type { Chord } from '../../src/music/grip.ts';

const SR = 48000;

/** Alle anderen Stimmungen aller Instrumente; danach wieder Ukulele in Normalstimmung. */
function eachTuning(f: (inst: string, tuning: string) => void): void {
  try {
    for (const inst of INSTRUMENTS)
      for (const tu of inst.tunings || []) {
        setInstrument(inst.id);
        setTuning(tu.id);
        f(inst.id, tu.id);
      }
  } finally {
    setInstrument('ukulele');
  }
}

function inTuning(inst: string, tuning: string, f: () => void): void {
  try {
    setInstrument(inst);
    setTuning(tuning);
    f();
  } finally {
    setInstrument('ukulele');
  }
}

const grip = (name: string) => chord(name).frets.map((f) => (f < 0 ? 'x' : String(f))).join(' ');

/** Töne passen genau zum Akkordnamen (bei Vierklängen darf die Quinte fehlen). */
function toneErrors(name: string, ch: Chord): string[] {
  const p = parseChordName(name)!;
  const iv = QUALITY_INTERVALS[p.quality];
  const want = iv.map((i) => (p.root + i) % 12);
  const got = chordMidis(ch).map(pitchClass);
  const errors: string[] = [];
  for (const n of got) if (want.indexOf(n) < 0) errors.push(`fremder Ton ${n}`);
  const required = iv.length === 4 ? want.filter((_, k) => iv[k] !== 7) : want;
  for (const n of required) if (got.indexOf(n) < 0) errors.push(`fehlt Ton ${n}`);
  return errors;
}

/** Spielbar: Spanne höchstens 3 Bünde, bis 12. Bund, Finger 1–4 (derselbe nur im selben Bund), mindestens vier Saiten. */
function playErrors(ch: Chord): string[] {
  const errors: string[] = [];
  if (!playableChord(ch)) errors.push('nicht auf dem Instrument');
  const pressed = ch.frets.filter((f) => f > 0);
  if (pressed.length && Math.max(...pressed) - Math.min(...pressed) > 3) errors.push('Spanne > 3');
  if (pressed.length && Math.max(...pressed) > 12) errors.push('über dem 12. Bund');
  ch.frets.forEach((f, i) => {
    if (f > 0 && !(ch.fingers[i] >= 1 && ch.fingers[i] <= 4)) errors.push(`Saite ${i} ohne Finger`);
    if (f <= 0 && ch.fingers[i]) errors.push(`Saite ${i} leer, aber mit Finger`);
  });
  for (const f of new Set(ch.fingers.filter((x) => x > 0))) {
    const at = new Set(ch.frets.filter((_, i) => ch.fingers[i] === f));
    if (at.size > 1) errors.push(`Finger ${f} in zwei Bünden`);
  }
  if (chordMidis(ch).length < 4) errors.push('weniger als vier Saiten');
  return errors;
}

test('Stimmungen: Saiten und Töne', () => {
  const got: Record<string, string> = {};
  eachTuning((inst, tu) => {
    got[`${inst}/${tu}`] = STRINGS.map((s) => `${s.name}${s.midi}`).join(' ');
  });
  assert.deepEqual(got, {
    'ukulele/tiefes-g': 'G55 C60 E64 A69',
    'ukulele/d': 'A69 D62 F#66 B71',
    'gitarre/drop-d': 'D38 A45 D50 G55 B59 e64',
    'gitarre/open-g': 'D38 G43 D50 G55 B59 d62',
    'gitarre/open-d': 'D38 A45 D50 F#54 A57 d62',
    'gitarre/open-e': 'E40 B47 E52 G#56 B59 e64',
    'gitarre/dadgad': 'D38 A45 D50 G55 A57 d62',
    'banjo/double-c': 'g67 C48 G55 C60 D62',
    'banjo/g-modal': 'g67 D50 G55 C60 D62',
    'banjo/open-d': 'f#66 D50 F#54 A57 D62',
  });
  assert.equal(INSTRUMENTS.filter((i) => i.id === 'bariton')[0].tunings, undefined);
});

test('Stimmungen: Normalstimmung ist Vorgabe, Instrumentwechsel setzt zurück', () => {
  try {
    setInstrument('gitarre');
    assert.equal(activeTuning(), null);
    setTuning('open-g');
    assert.equal(activeTuning()!.id, 'open-g');
    assert.equal(baseInstrument().strings[0].midi, 40);
    assert.equal(grip('G'), '0 0 0 0 0 0');
    setTuning('');
    assert.equal(activeTuning(), null);
    assert.equal(STRINGS[0].midi, 40);
    assert.equal(grip('G'), '3 2 0 0 0 3');
    setTuning('open-g');
    setInstrument('banjo');
    assert.equal(activeTuning(), null);
    assert.equal(STRINGS[1].midi, 50);
    // unbekannte Stimmung (z. B. von einem anderen Instrument gespeichert) = Normalstimmung
    setTuning('open-g');
    assert.equal(activeTuning(), null);
  } finally {
    setInstrument('ukulele');
  }
});

test('Open G, Open D, Open E: leer = Grundakkord, Dur als gerader Barré', () => {
  inTuning('gitarre', 'open-g', () => {
    assert.equal(grip('G'), '0 0 0 0 0 0');
    assert.equal(grip('C'), '5 5 5 5 5 5');
    assert.equal(grip('D'), '7 7 7 7 7 7');
    assert.deepEqual(chord('C').barre, { fret: 5, from: 0, to: 5 });
  });
  inTuning('gitarre', 'open-d', () => {
    assert.equal(grip('D'), '0 0 0 0 0 0');
    assert.equal(grip('G'), '5 5 5 5 5 5');
    assert.equal(grip('A'), '7 7 7 7 7 7');
  });
  inTuning('gitarre', 'open-e', () => {
    assert.equal(grip('E'), '0 0 0 0 0 0');
    assert.equal(grip('A'), '5 5 5 5 5 5');
    assert.equal(grip('B'), '7 7 7 7 7 7');
  });
  inTuning('banjo', 'open-d', () => {
    assert.equal(grip('D'), '0 0 0 0 0');
    // die kurze Saite (F#) gehört nicht zu G
    assert.equal(grip('G'), 'x 5 5 5 5');
  });
});

test('Drop D: gewohnte Griffe, die tiefe Saite zwei Bünde höher', () => {
  inTuning('gitarre', 'drop-d', () => {
    assert.equal(grip('C'), 'x 3 2 0 1 0');
    assert.equal(grip('E'), '2 2 2 1 0 0');
    // G mit der tiefen Saite im 5. Bund wäre zu weit gespreizt (520003)
    assert.equal(grip('G'), 'x x 0 0 0 3');
    assert.equal(chord('G').say, 'G-Dur');
  });
});

test('Drop D: D-Akkorde mit allen sechs Saiten, die leeren Bass-Saiten klingen mit', () => {
  inTuning('gitarre', 'drop-d', () => {
    assert.equal(grip('D'), '0 0 0 2 3 2');
    assert.equal(grip('Dm'), '0 0 0 2 3 1');
    assert.equal(grip('D7'), '0 0 0 2 1 2');
    assert.deepEqual(chord('D').fingers, [0, 0, 0, 1, 3, 2]);
  });
});

test('Drop D: Griffe ohne tiefe E-Saite bleiben genau gleich', () => {
  const base = INSTRUMENTS.filter((i) => i.id === 'gitarre')[0].chords.filter((c) => c.frets[0] < 0);
  inTuning('gitarre', 'drop-d', () => {
    assert.equal(grip('Bm'), 'x 2 4 4 3 2');
    for (const c of base) {
      const now = chord(c.name);
      // nur stumme Bass-Saiten dürfen leer mitklingen (D, Dm, D7)
      c.frets.forEach((f, i) => assert.ok(f >= 0 ? now.frets[i] === f : now.frets[i] <= 0, `${c.name}: ${now.frets.join(' ')}`));
      if (now.frets[0] < 0) assert.deepEqual(now.fingers, c.fingers, c.name);
    }
  });
});

test('Andere Stimmungen: übliche, kompakte Griffe statt bloß tonal richtiger', () => {
  const want: [string, string, string, string][] = [
    ['gitarre', 'dadgad', 'G7', '0 2 0 0 2 3'],
    ['gitarre', 'open-e', 'G7', 'x x 3 3 3 1'],
    ['gitarre', 'open-d', 'Gm', 'x x 5 4 5 5'],
    ['gitarre', 'open-e', 'Am', 'x x 5 4 5 5'],
    ['gitarre', 'open-d', 'F#m', 'x x 4 3 4 4'],
    ['gitarre', 'open-g', 'Bm', 'x x 4 4 3 4'],
    ['banjo', 'g-modal', 'Em', '0 2 4 4 2'],
    ['banjo', 'double-c', 'G7', '0 2 4 2 3'],
  ];
  for (const w of want) inTuning(w[0], w[1], () => assert.equal(grip(w[2]), w[3], `${w[0]}/${w[1]} ${w[2]}`));
});

test('Stimmungen: vorgegebene Griffe passen zum Namen und liegen gut in der Hand', () => {
  eachTuning((inst, tu) => {
    for (const name of Object.keys(activeTuning()!.grips || {})) {
      const ch = chord(name);
      assert.deepEqual(toneErrors(name, ch), [], `${inst}/${tu} ${name}`);
      assert.deepEqual(playErrors(ch), [], `${inst}/${tu} ${name}`);
      // Grundton oder Quinte im Bass
      const p = parseChordName(name)!;
      const bass = pitchClass(chordMidis(ch)[0]);
      assert.ok(bass === p.root || bass === (p.root + 7) % 12 || inst === 'banjo', `${inst}/${tu} ${name}`);
    }
  });
});

test('Ukulele: D-Stimmung = gleiche Formen mit neuem Namen, tiefes G = gleiche Griffe', () => {
  inTuning('ukulele', 'd', () => {
    assert.equal(grip('D'), '0 0 0 3');
    assert.equal(grip('G'), '2 0 1 0');
    assert.equal(grip('A'), '0 2 3 2');
    assert.equal(grip('Bm'), '2 0 0 0');
  });
  const normal: Record<string, string> = {};
  for (const c of CHORDS) normal[c.name] = grip(c.name);
  inTuning('ukulele', 'tiefes-g', () => {
    for (const c of CHORDS) assert.equal(grip(c.name), normal[c.name], c.name);
    assert.equal(activeTuning()!.banner, false);
  });
});

test('Stimmungen: jeder Akkord aus jedem Lied (alle Tonarten) hat genau seine Töne und ist spielbar', () => {
  eachTuning((inst, tu) => {
    const names = new Set<string>(CHORDS.map((c) => c.name));
    for (const s of SONGS) for (const c of s.chords) for (let k = -6; k < 6; k++) names.add(transposeName(c, k));
    for (const n of names) {
      const ch = chord(n);
      assert.deepEqual(toneErrors(n, ch), [], `${inst}/${tu} ${n} (${ch.frets.join(' ')})`);
      if (inst !== 'ukulele') assert.deepEqual(playErrors(ch), [], `${inst}/${tu} ${n} (${ch.frets.join(' ')} / ${ch.fingers.join(' ')})`);
      else assert.ok(playableChord(ch), `${inst}/${tu} ${n}`);
    }
  });
});

test('Stimmungen: jede Akkordart in jeder Tonart hat einen Griff mit genau ihren Tönen', () => {
  eachTuning((inst, tu) => {
    for (const r of ROOTS)
      for (const q of Object.keys(QUALITY_INTERVALS)) {
        const ch = chord(r + q);
        assert.deepEqual(toneErrors(r + q, ch), [], `${inst}/${tu} ${r + q} (${ch.frets.join(' ')})`);
        assert.ok(playableChord(ch), `${inst}/${tu} ${r + q}`);
      }
  });
});

test('Stimmungen: Bibliothek behält Namen und Aussprache, Stimmgerät und Erkennung hören tief genug', () => {
  eachTuning((inst, tu) => {
    const base = baseInstrument();
    assert.deepEqual(
      CHORDS.map((c) => c.name),
      base.chords.map((c) => c.name),
      `${inst}/${tu}`,
    );
    const low = Math.min(...STRINGS.map((s) => midiToFreq(s.midi)));
    assert.ok(instrument().tuner.minHz < low, `${inst}/${tu} Stimmgerät`);
    assert.ok(instrument().detect.minHz < low, `${inst}/${tu} Erkennung`);
    assert.ok(instrument().blues.pitch.minHz < low, `${inst}/${tu} Blues`);
  });
});

test('Stimmungen: Tabulatur und Blues-Hals folgen den Saiten', () => {
  inTuning('gitarre', 'drop-d', () => {
    assert.deepEqual(tabPosition(38), { string: 0, fret: 0 });
    const pos = scalePositions(2, 3);
    assert.ok(pos.some((p) => p.string === 0 && p.fret === 0 && p.midi === 38), 'leere tiefe D-Saite fehlt im D-Blues');
    for (const p of pos) assert.equal(p.midi, stringMidi(p.string, p.fret));
  });
  inTuning('ukulele', 'tiefes-g', () => assert.deepEqual(tabPosition(55), { string: 0, fret: 0 }));
});

test('Stimmungen: die Erkennung lobt die berechneten Griffe', () => {
  for (const [inst, tu] of [
    ['gitarre', 'open-g'],
    ['gitarre', 'drop-d'],
    ['banjo', 'double-c'],
    ['ukulele', 'd'],
  ])
    inTuning(inst, tu, () => {
      for (const name of instrument().game.flat()) {
        const ch = chord(name);
        const sig = renderStrum(chordMidis(ch).map(midiToFreq), SR, 1.2, 18, instrument().synth);
        const v = judgeChord(instrumentPeaks(spectrum(sig, 4800 + 8192), SR / 8192), name);
        assert.ok(v && v.ok, `${inst}/${tu} ${name} (${ch.frets.join(' ')}): ${v && v.best}`);
      }
    });
});
