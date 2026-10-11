import { test } from 'node:test';
import assert from 'node:assert/strict';
import { INSTRUMENTS, instrument, setInstrument } from '../../src/music/instrument.ts';
import { chord, parseChordName } from '../../src/music/chords.ts';
import { midiToFreq, pitchClass } from '../../src/music/notes.ts';
import { position } from '../../src/music/blues.ts';
import { BAND_RANGE, GROOVES, bandBar, chordPcs, chordsText, easyKey, eighthAt, eighthOf, firstPosition, groove, grooveBars, keysVoicing, levels, lineNotes, noteAt } from '../../src/music/grooves.ts';
import { lowpass, renderPluck } from '../../src/audio/pluck.ts';
import { detectPitchIn } from '../../src/audio/pitch.ts';
import { routePath } from '../../src/site/routes.ts';

const SR = 48000;
const MAJOR = [0, 2, 4, 5, 7, 9, 11];

function each(ids: string[], f: (id: string) => void): void {
  try {
    for (const id of ids) {
      setInstrument(id);
      f(id);
    }
  } finally {
    setInstrument('ukulele');
  }
}

const near = (a: number[], b: number[]) => a.length === b.length && a.every((x, i) => Math.abs(x - b[i]) < 1e-9);

test('Akkordfolgen je Stil: Rock I–IV–V–IV, Pop I–V–vi–IV, Shuffle und Country mit I, IV, V', () => {
  assert.deepEqual(grooveBars(groove('rock')!, 0), ['C', 'C', 'F', 'F', 'G', 'G', 'F', 'F']);
  assert.deepEqual(grooveBars(groove('pop')!, 0), ['C', 'G', 'Am', 'F']);
  assert.deepEqual(grooveBars(groove('pop')!, 7), ['G', 'D', 'Em', 'C']);
  assert.deepEqual(grooveBars(groove('shuffle')!, 4), ['E', 'E', 'A', 'A', 'E', 'B7', 'E', 'B7']);
  assert.deepEqual(grooveBars(groove('country')!, 7), ['G', 'G', 'C', 'C', 'G', 'G', 'D', 'D']);
  assert.equal(chordsText(groove('rock')!, 0), 'C – F – G – F');
  for (const g of GROOVES)
    for (let key = 0; key < 12; key++) {
      const bars = grooveBars(g, key);
      assert.equal(parseChordName(bars[0])!.root, key, `${g.id}: beginnt auf der I`);
      for (const name of bars) {
        const p = parseChordName(name)!;
        assert.ok(MAJOR.indexOf((p.root - key + 12) % 12) >= 0, `${g.id} ${name}: Grundton in der Tonart`);
        // alle Akkordtöne leitereigen, auch die Septime des V7
        for (const pc of chordPcs(name)) assert.ok(MAJOR.indexOf((pc - key + 12) % 12) >= 0, `${g.id} ${name}: ${pc} nicht leitereigen`);
      }
    }
});

test('Basslinien auf dem E-Bass: passende Töne, alles in der ersten Lage, jeder Takt beginnt mit dem Grundton', () => {
  each(['bass'], () => {
    const range = firstPosition();
    assert.deepEqual(range, { lo: 28, hi: 47 });
    for (const g of GROOVES)
      for (let key = 0; key < 12; key++)
        for (const level of levels(g)) {
          const bars = grooveBars(g, key);
          bars.forEach((name, bar) => {
            const notes = lineNotes(g, level, key, bar);
            const root = parseChordName(name)!.root;
            assert.equal(notes[0].at, 0);
            assert.equal(pitchClass(notes[0].midi), root, `${g.id} ${name}: Takt beginnt mit dem Grundton`);
            let last = -1;
            for (const n of notes) {
              const where = `${g.id} in ${bars[0]} (${level}), Takt ${bar + 1} ${name}: ${n.midi}`;
              assert.ok(n.at > last, `${where}: Reihenfolge`);
              last = n.at;
              assert.ok(n.midi >= range.lo && n.midi <= range.hi, `${where}: außerhalb der ersten Lage`);
              assert.ok(position(n.midi).fret <= instrument().blues.frets, `${where}: Bund ${position(n.midi).fret}`);
              const rel = (n.midi - root + 120) % 12;
              if (level === 'simple' || g.id === 'rock') assert.equal(rel, 0, where);
              else if (g.id === 'country') assert.ok(rel === 0 || rel === 7, where);
              else if (g.id === 'shuffle') assert.ok((level === 'middle' ? [0, 4, 7, 9] : [0, 4, 7, 9, 10]).indexOf(rel) >= 0, where);
              else if (n.approach) {
                // Durchgangston: leitereigen und einen Schritt neben dem nächsten Grundton
                const next = parseChordName(bars[(bar + 1) % bars.length])!.root;
                assert.ok(MAJOR.indexOf((n.midi - key + 120) % 12) >= 0, `${where}: Durchgang nicht leitereigen`);
                const step = Math.min((n.midi - next + 120) % 12, (next - n.midi + 120) % 12);
                assert.ok(step === 1 || step === 2, `${where}: Durchgang ${step} Halbtöne vom Ziel`);
              } else assert.ok(chordPcs(name).indexOf(pitchClass(n.midi)) >= 0, where);
            }
          });
        }
  });
});

test('Pop in C auf dem E-Bass: Durchgangstöne führen schrittweise zum nächsten Grundton', () => {
  each(['bass'], () => {
    const g = groove('pop')!;
    const line = (bar: number) => lineNotes(g, 'line', 0, bar).map((n) => n.midi);
    // C (A-Saite 3) → A → G (E-Saite 3) → B → A (leer) → G → F (E-Saite 1) → B → C
    assert.deepEqual(line(0), [36, 36, 36, 33]);
    assert.deepEqual(line(1), [31, 31, 31, 35]);
    assert.deepEqual(line(2), [33, 33, 33, 31]);
    assert.deepEqual(line(3), [29, 29, 29, 35]);
    // Shuffle in E: das Boogie-Riff E G# B C# D C# B G#, ganz in der ersten Lage
    assert.deepEqual(lineNotes(groove('shuffle')!, 'line', 4, 0).map((n) => n.midi), [28, 32, 35, 37, 38, 37, 35, 32]);
    // Zwischenstufe: dieselben Töne 1-3-5-6 in Vierteln
    assert.deepEqual(lineNotes(groove('shuffle')!, 'middle', 4, 0).map((n) => [n.at, n.midi]), [[0, 28], [1, 32], [2, 35], [3, 37]]);
    assert.deepEqual(levels(groove('shuffle')!), ['simple', 'middle', 'line']);
    assert.deepEqual(levels(groove('rock')!), ['simple', 'line']);
    // Country in G: Grundton und die Quinte darunter
    assert.deepEqual(lineNotes(groove('country')!, 'line', 7, 0).map((n) => n.midi), [31, 26 + 12]);
  });
});

test('Rhythmus: gerade Achtel bei Rock und Pop, triolisch beim Shuffle, Backbeat auf 2 und 4', () => {
  assert.equal(eighthAt(1, false), 0.5);
  assert.equal(eighthAt(1, true), 2 / 3);
  assert.equal(eighthAt(6, true), 3);
  assert.equal(eighthOf(2.7, true), 5);
  assert.equal(eighthOf(2.6, true), 4);
  const times = (g: string, kind: string) =>
    bandBar(groove(g)!, 0, 0, false)
      .filter((x) => x.kind === kind)
      .map((x) => x.at);
  assert.ok(near(times('rock', 'hat'), [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5]));
  assert.ok(near(times('rock', 'snare'), [1, 3]));
  assert.ok(near(times('rock', 'kick'), [0, 2, 2.5]));
  assert.ok(near(times('rock', 'bass'), [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5]));
  assert.ok(near(times('shuffle', 'hat'), [0, 2 / 3, 1, 5 / 3, 2, 8 / 3, 3, 11 / 3]));
  assert.ok(near(times('shuffle', 'bass'), [0, 2 / 3, 1, 5 / 3, 2, 8 / 3, 3, 11 / 3]));
  assert.ok(near(times('shuffle', 'keys'), [5 / 3, 11 / 3]));
  assert.ok(near(times('pop', 'bass'), [0, 1.5, 2, 3]));
  assert.ok(near(times('country', 'bass'), [0, 2]));
  assert.ok(near(times('country', 'keys'), [1, 3]));
  for (const g of GROOVES) {
    assert.ok(near(times(g.id, 'snare'), [1, 3]), `${g.id}: Backbeat`);
    assert.equal(times(g.id, 'kick')[0], 0, `${g.id}: Bassdrum auf der Eins`);
    // jede Note endet vor der nächsten, nichts ragt über den Takt
    const line = lineNotes(g, 'line', 0, 0, BAND_RANGE);
    line.forEach((n, i) => assert.ok(n.at + n.dur <= (i + 1 < line.length ? line[i + 1].at : 4) + 1e-9, `${g.id}: Note ${i}`));
    assert.equal(g.strum.length, 8);
    assert.equal(g.tempos.length, 4);
    for (let i = 1; i < 4; i++) assert.ok(g.tempos[i] > g.tempos[i - 1]);
  }
  // Vorgabe zum Schlag: der zuletzt angeschlagene Ton
  const pop = lineNotes(groove('pop')!, 'line', 0, 0);
  assert.equal(noteAt(pop, 1.4)!.eighth, 0);
  assert.equal(noteAt(pop, 1.5)!.eighth, 3);
  assert.equal(noteAt(pop, 3.9)!.eighth, 6);
});

test('E-Bass: die Band spielt keinen eigenen Bass und die Bassdrum leiser', () => {
  for (const g of GROOVES) {
    const own = bandBar(g, 4, 0, true);
    assert.equal(own.filter((x) => x.kind === 'bass').length, 0);
    assert.ok(own.filter((x) => x.kind === 'kick').every((x) => x.gain < 0.5));
    assert.ok(bandBar(g, 4, 0, false).filter((x) => x.kind === 'bass').length > 0);
  }
});

test('Akkord-Tupfer der Band bleiben außerhalb dessen, was das Mikrofon vom Instrument hören will', () => {
  each(INSTRUMENTS.map((i) => i.id), (id) => {
    const b = instrument().blues;
    const top = firstPosition().hi;
    for (const g of GROOVES)
      for (let key = 0; key < 12; key++)
        for (const name of grooveBars(g, key)) {
          const want = chordPcs(name);
          for (const power of [true, false]) {
            const v = keysVoicing(name, power, instrument().notesOnly ? top : 0);
            assert.ok(v.every((m) => want.indexOf(pitchClass(m)) >= 0), `${id} ${name}: Tupfer passt nicht zum Akkord`);
            for (const m of v) {
              const hz = midiToFreq(m);
              assert.ok(hz < b.pitch.minHz || hz > b.pitch.maxHz, `${id} ${g.id} ${name}: ${m} im Bereich der Erkennung`);
              if (instrument().notesOnly) assert.ok(m > top + 1, `${id}: ${m} im Spielbereich`);
            }
          }
        }
  });
});

test('Bequeme Tonart: Ukulele C, Gitarre ohne Barré, E-Bass E – alle Griffe in den ersten Bünden', () => {
  each(INSTRUMENTS.map((i) => i.id), (id) => {
    for (const g of GROOVES) {
      const key = easyKey(g);
      if (id === 'ukulele') assert.equal(key, 0, `${g.id}`);
      if (id === 'bass') assert.equal(key, 4, `${g.id}`);
      if (id === 'gitarre' && g.id === 'pop') assert.equal(key, 7);
      if (instrument().notesOnly) continue;
      for (const name of grooveBars(g, key)) {
        const ch = chord(name);
        assert.ok(!ch.barre, `${id} ${g.id} ${name}: Barré`);
        assert.ok(Math.max(...ch.frets) <= 4, `${id} ${g.id} ${name}: ${ch.frets}`);
      }
    }
  });
});

test('Seiten je Stil: eigene Adressen in allen Sprachen', () => {
  const own = () => false;
  assert.equal(routePath('begleitung/rock', 'de', own), 'begleitung/rock/');
  assert.equal(routePath('begleitung/pop', 'en', own), 'en/backing-tracks/pop/');
  assert.equal(routePath('begleitung/shuffle', 'fr', own), 'fr/accompagnement/shuffle/');
});

// ---------- kleiner Offline-Render: liegen die Schläge wirklich auf den Zeitpunkten? ----------

interface Hit {
  at: number;
  dur: number;
  midi: number | null;
}

/** Bass als gezupfte Saite (wie die Synthese der App), Schlagzeug als kurzes Rauschen; jeder Ton endet nach `dur`. */
function render(hits: Hit[], seconds: number): Float32Array {
  const out = new Float32Array(Math.ceil(seconds * SR));
  let seed = 1;
  for (const x of hits) {
    const start = Math.round(x.at * SR);
    const len = Math.min(out.length - start, Math.round(x.dur * SR));
    let sig: Float32Array;
    if (x.midi === null) {
      sig = new Float32Array(len);
      for (let i = 0; i < len; i++) {
        seed = (seed * 16807) % 2147483647;
        sig[i] = (seed / 2147483647 - 0.5) * Math.exp(-i / (0.01 * SR));
      }
    } else {
      sig = renderPluck(midiToFreq(x.midi), SR, x.dur + 0.05, 0.5, x.midi, 1, 0.3);
      lowpass(sig, SR, 900);
    }
    for (let i = 0; i < len; i++) out[start + i] += sig[i] * (i > len - 48 ? (len - i) / 48 : 1);
  }
  return out;
}

/** Einsätze: wo nach mindestens 5 ms Stille wieder etwas klingt (jeder Ton endet vor dem nächsten). */
function onsets(sig: Float32Array): number[] {
  const out: number[] = [];
  const quiet = Math.round(0.005 * SR);
  let silent = quiet;
  for (let i = 0; i < sig.length; i++) {
    const loud = Math.abs(sig[i]) > 1e-3;
    if (loud && silent >= quiet) out.push(i / SR);
    silent = Math.abs(sig[i]) < 1e-4 ? silent + 1 : 0;
  }
  return out;
}

test('Offline-Render: Basslinie und Schlagzeug setzen genau auf dem Achtel-Raster ein, die Töne stimmen', () => {
  each(['bass'], () => {
    for (const id of ['rock', 'shuffle', 'pop', 'country']) {
      const g = groove(id)!;
      const bpm = g.tempos[2];
      const spb = 60 / bpm;
      const key = 4;
      const want: number[] = [];
      const hits: Hit[] = [];
      for (let bar = 0; bar < 2; bar++)
        for (const n of lineNotes(g, 'line', key, bar)) {
          hits.push({ at: (bar * 4 + n.at) * spb, dur: n.dur * spb * 0.92, midi: n.midi });
          want.push((bar * 4 + n.at) * spb);
        }
      const sig = render(hits, 8 * spb + 0.3);
      const got = onsets(sig);
      assert.equal(got.length, want.length, `${id}: ${got.map((x) => x.toFixed(3))} statt ${want.map((x) => x.toFixed(3))}`);
      got.forEach((x, i) => assert.ok(Math.abs(x - want[i]) < 0.006, `${id}: Einsatz ${i} bei ${x.toFixed(3)} s statt ${want[i].toFixed(3)} s`));
      // Tonhöhe jedes Tons aus dem Signal (ab 40 ms nach dem Anschlag)
      hits.forEach((x, i) => {
        const from = Math.round((x.at + 0.04) * SR);
        const p = detectPitchIn(sig.subarray(from, from + 4096), SR, 36, 420);
        assert.ok(p, `${id}: Ton ${i} nicht erkannt`);
        assert.equal(pitchClass(Math.round(12 * Math.log2(p!.freq / 440) + 69)), pitchClass(x.midi!), `${id}: Ton ${i}`);
      });
      // Schlagzeug: Hi-Hat, Bassdrum und Snare zusammen auf dem Raster des Stils
      const drums: Hit[] = [];
      for (let bar = 0; bar < 2; bar++)
        for (const x of bandBar(g, key, bar, true)) if (x.kind === 'kick' || x.kind === 'snare' || x.kind === 'hat') drums.push({ at: (bar * 4 + x.at) * spb, dur: 0.05, midi: null });
      const times = drums.map((d) => d.at).filter((x, i, all) => all.indexOf(x) === i).sort((a, b) => a - b);
      const heard = onsets(render(drums, 8 * spb + 0.3));
      assert.equal(heard.length, times.length, `${id} Schlagzeug`);
      heard.forEach((x, i) => assert.ok(Math.abs(x - times[i]) < 0.006, `${id} Schlagzeug ${i}: ${x.toFixed(3)} statt ${times[i].toFixed(3)}`));
      const grid = times.map((x) => (((x / spb) % 1) + 1e-6) % 1).map((x) => x.toFixed(3));
      if (g.swing) assert.ok(grid.every((x) => x === '0.000' || x === '0.667'), `${id}: ${grid}`);
      else assert.ok(grid.every((x) => x === '0.000' || x === '0.500'), `${id}: ${grid}`);
    }
  });
});
