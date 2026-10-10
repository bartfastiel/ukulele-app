import { test } from 'node:test';
import assert from 'node:assert/strict';
import { instrument, notesOnly, setInstrument } from '../../src/music/instrument.ts';
import { ROOTS, chord, describeChord, parseChordName } from '../../src/music/chords.ts';
import { STRINGS, freqToMidi, midiToFreq, pitchClass, stringMidi } from '../../src/music/notes.ts';
import { SONGS } from '../../src/music/songs.ts';
import { parseSong } from '../../src/music/song.ts';
import { transposeName } from '../../src/music/transpose.ts';
import { bassLine, bassPosition } from '../../src/music/bassline.ts';
import { LEVELS, bluesBars, levelTitle } from '../../src/music/blues.ts';
import { lowpass, renderPluck } from '../../src/audio/pluck.ts';
import { cents, detectPitch, detectPitchIn } from '../../src/audio/pitch.ts';
import { rootClass } from '../../src/audio/listen.ts';
import { routePath } from '../../src/site/routes.ts';

const SR = 48000;

/** Auf dem E-Bass ausführen, danach wieder Ukulele. */
function onBass(f: () => void): void {
  try {
    setInstrument('bass');
    f();
  } finally {
    setInstrument('ukulele');
  }
}

/** Gezupfte Bass-Saite wie in engine.ts: Karplus-Strong mit dem Klang des E-Basses, danach der Tiefpass. */
function bassTone(midi: number, seconds = 1.2): Float32Array {
  const s = instrument().synth;
  const sig = renderPluck(midiToFreq(midi), SR, seconds, s.brightness, midi, s.sustain, s.position);
  lowpass(sig, SR, s.lowpass!);
  return sig;
}

/** Handy-Mikrofon: Hochpass zweiter Ordnung – vom Grundton der tiefen Saiten bleibt kaum etwas übrig. */
function phoneMic(sig: Float32Array, hz = 120): Float32Array {
  const a = Math.exp((-2 * Math.PI * hz) / SR);
  const out = new Float32Array(sig.length);
  let x1 = 0;
  let y1 = 0;
  let z1 = 0;
  let y2 = 0;
  for (let i = 0; i < sig.length; i++) {
    y1 = a * (y1 + sig[i] - x1);
    x1 = sig[i];
    y2 = a * (y2 + y1 - z1);
    z1 = y1;
    out[i] = y2;
  }
  return out;
}

test('E-Bass: vier Saiten E1 A1 D2 G2, spielt Einzeltöne', () => {
  onBass(() => {
    assert.equal(STRINGS.map((s) => `${s.name}${s.midi}`).join(' '), 'E28 A33 D38 G43');
    assert.equal(notesOnly(), true);
    assert.equal(instrument().chords.length, 0);
  });
  assert.equal(notesOnly(), false);
});

test('E-Bass: zu jedem Akkord der Grundton, so tief wie möglich in der ersten Lage, die Quinte eine Saite höher', () => {
  onBass(() => {
    const at = (name: string) => {
      const ch = chord(name);
      const s = ch.frets.findIndex((f) => f >= 0);
      return `${STRINGS[s].name}${ch.frets[s]}`;
    };
    assert.deepEqual(['E', 'F', 'G', 'A', 'B', 'C', 'D', 'Eb'].map(at), ['E0', 'E1', 'E3', 'A0', 'A2', 'A3', 'D0', 'D1']);
    // Akkordart egal: Am7, A7 und A haben denselben Basston
    assert.equal(at('Am7'), 'A0');
    assert.equal(at('G7'), 'E3');
    for (const r of ROOTS) {
      const ch = chord(r);
      const sounding = ch.frets.filter((f) => f >= 0);
      assert.equal(sounding.length, 1, r);
      const s = ch.frets.findIndex((f) => f >= 0);
      const f = ch.frets[s];
      assert.ok(f >= 0 && f <= 4, `${r}: Bund ${f}`);
      assert.equal(pitchClass(stringMidi(s, f)), ROOTS.indexOf(r), r);
      // ein Finger je Bund
      assert.equal(ch.fingers[s], f, r);
      // tiefer geht es in der ersten Lage nicht
      for (let i = 0; i < STRINGS.length; i++)
        for (let g = 0; g <= 4; g++) if (pitchClass(stringMidi(i, g)) === ROOTS.indexOf(r)) assert.ok(stringMidi(i, g) >= stringMidi(s, f), `${r}: tiefer auf ${STRINGS[i].name}${g}`);
      assert.ok(ch.fifth, `${r}: keine Quinte`);
      assert.equal(ch.fifth!.string, s + 1);
      assert.equal(ch.fifth!.fret, f + 2);
      assert.equal(stringMidi(ch.fifth!.string, ch.fifth!.fret), stringMidi(s, f) + 7);
    }
    assert.equal(describeChord(chord('C')), 'C: Ringfinger auf der A-Saite im 3. Bund');
    assert.equal(describeChord(chord('Am')), 'Am: leere A-Saite');
  });
});

test('E-Bass: jeder Akkord aus jedem Lied hat in jeder Tonart einen Basston', () => {
  onBass(() => {
    for (const s of SONGS)
      for (const c of s.chords)
        for (let k = -6; k < 6; k++) {
          const name = transposeName(c, k);
          const p = bassPosition(name, false);
          assert.equal(pitchClass(p.midi), parseChordName(name)!.root, name);
          assert.ok(p.fret <= 4, name);
          assert.equal(pitchClass(bassPosition(name, true).midi), (parseChordName(name)!.root + 7) % 12, `${name}: Quinte`);
        }
  });
});

test('Basslinie: Grundton auf der Eins und bei jedem Wechsel, Quinte zur Taktmitte', () => {
  onBass(() => {
    const song = parseSong({ id: 't', title: 'T', category: 'kinder', origin: '', meter: 4, bpm: 80, chordpro: '[C]eins [C]zwei [G:2]drei [F:2]vier' });
    const show = (p: 'root' | 'fifth') => bassLine(song, p).map((n) => `${n.beat}:${n.midi}${n.fifth ? '5' : ''}`).join(' ');
    // C = A-Saite 3. Bund (36), G = E-Saite 3. Bund (31), F = E-Saite 1. Bund (29), Quinte G zu C = D-Saite 5. Bund (43)
    assert.equal(show('root'), '0:36 4:36 8:31 10:29');
    assert.equal(show('fifth'), '0:36 2:435 4:36 6:435 8:31 10:29');
    // im 3/4-Takt nur der Grundton auf der Eins
    const waltz = parseSong({ id: 'w', title: 'W', category: 'kinder', origin: '', meter: 3, bpm: 80, chordpro: '[C]eins [G]zwei' });
    assert.deepEqual(bassLine(waltz, 'fifth').map((n) => n.beat), [0, 3]);
    // jedes Lied: Töne in zeitlicher Reihenfolge, Grundtöne passen zum Akkord
    for (const s of SONGS) {
      const line = bassLine(s, 'fifth');
      assert.ok(line.length > 0, s.id);
      for (let i = 1; i < line.length; i++) assert.ok(line[i].beat > line[i - 1].beat, `${s.id}: doppelt bei ${line[i].beat}`);
      for (const n of line) assert.equal(pitchClass(n.midi), (parseChordName(n.chord)!.root + (n.fifth ? 7 : 0)) % 12, `${s.id} ${n.beat}`);
    }
  });
});

test('Blues auf dem E-Bass: Walking Bass 1-3-5-6 hinauf und 7-6-5-3 hinunter, alles in der ersten Lage', () => {
  onBass(() => {
    const walk = LEVELS.filter((l) => l.id === 'boogie')[0];
    assert.equal(levelTitle(walk), '3 · Walking Bass');
    const bars = bluesBars(instrument().blues.easyKey);
    assert.equal(bars[0], 'E7');
    const notes = (bar: number) => walk.notes!(bars[bar], bar).map((n) => n.midi);
    assert.deepEqual(notes(0), [28, 32, 35, 37]);
    assert.deepEqual(notes(1), [38, 37, 35, 32]);
    // A7 im 5. Takt: A, C#, E, F# – und zurück G, F#, E, C#
    assert.deepEqual(notes(4).map((m) => pitchClass(m)), [9, 1, 4, 6]);
    assert.deepEqual(notes(5).map((m) => pitchClass(m)), [7, 6, 4, 1]);
  });
  // die anderen Instrumente behalten ihr Boogie-Riff
  const boogie = LEVELS.filter((l) => l.id === 'boogie')[0];
  assert.equal(levelTitle(boogie), boogie.title);
  assert.deepEqual(
    boogie.notes!('C7', 1).map((n) => pitchClass(n.midi)),
    [0, 4, 7, 9],
  );
});

test('Stimmgerät: E1 (41 Hz) und A1 werden sicher erkannt – auch wenn das Mikrofon den Grundton kaum hört', () => {
  onBass(() => {
    const t = instrument().tuner;
    for (const midi of [28, 33, 38, 43]) {
      const f = midiToFreq(midi);
      const sig = bassTone(midi);
      for (const at of [4000, 24000]) {
        const p = detectPitchIn(sig.subarray(at, at + 4096), SR, t.minHz, t.maxHz);
        assert.ok(p && Math.abs(cents(p.freq, f)) < 5, `${midi} bei ${at}: ${p ? p.freq.toFixed(2) : '–'} statt ${f.toFixed(2)} Hz`);
        assert.ok(p!.clarity > 0.85);
      }
      // Handy-Mikrofon: höchstens die Oktave daneben, nie ein anderer Ton
      const p = detectPitchIn(phoneMic(sig).subarray(24000, 28096), SR, t.minHz, t.maxHz);
      assert.ok(p, `${midi}: nichts erkannt`);
      assert.equal(pitchClass(freqToMidi(p!.freq)), pitchClass(midi), `${midi}: ${p!.freq.toFixed(1)} Hz`);
    }
    // ohne die halbe Abtastrate passt die Periode von E1 nicht in ein Fenster von 2048 Werten
    assert.equal(detectPitch(bassTone(28).subarray(4000, 6048), SR, 35, 250)?.freq.toFixed(0) === '41', false);
  });
});

test('Klang des E-Basses: tief und rund, klingt lange aus', () => {
  onBass(() => {
    const sig = bassTone(28, instrument().synth.seconds);
    const rms = (a: number, b: number) => {
      let s = 0;
      for (let i = Math.floor(a * SR); i < Math.floor(b * SR); i++) s += sig[i] * sig[i];
      return Math.sqrt(s / ((b - a) * SR));
    };
    // nach anderthalb Sekunden noch deutlich hörbar
    assert.ok(rms(1.5, 1.7) > rms(0.05, 0.25) * 0.1, `${rms(1.5, 1.7)} / ${rms(0.05, 0.25)}`);
    // wenig Obertöne über 1 kHz: der Unterschied zwischen Nachbarwerten (Steilheit) bleibt klein
    let diff = 0;
    let level = 0;
    for (let i = SR * 0.1; i < SR * 0.3; i++) {
      diff += (sig[i] - sig[i - 1]) ** 2;
      level += sig[i] ** 2;
    }
    assert.ok(diff / level < 0.002, `Steilheit ${diff / level}`);
  });
});

test('Lauscher und Adressen des E-Basses: Grundton zählt, Töne statt Akkorde in der Adresse', () => {
  assert.equal(rootClass('Am7'), 9);
  assert.equal(rootClass('F#'), 6);
  assert.equal(rootClass('?'), -1);
  const own = () => false;
  assert.equal(routePath('akkord/Am7', 'de', own), 'akkorde/a-m7/');
  onBass(() => {
    assert.equal(routePath('akkorde', 'de', own), 'toene/');
    assert.equal(routePath('akkord/Am7', 'de', own), 'toene/a/');
    assert.equal(routePath('akkord/F%23m', 'en', own), 'en/notes/f-sharp/');
    assert.equal(routePath('spiel', 'fr', own), 'fr/jeu-des-notes/');
    assert.equal(routePath('detektiv', 'de', own), 'ton-detektiv/');
    assert.equal(routePath('stimmen', 'de', own), 'stimmgeraet/');
  });
  assert.equal(routePath('spiel', 'de', own), 'akkord-spiel/');
});
