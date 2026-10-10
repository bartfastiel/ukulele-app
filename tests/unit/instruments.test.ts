import { test } from 'node:test';
import assert from 'node:assert/strict';
import { INSTRUMENTS, instrument, setInstrument } from '../../src/music/instrument.ts';
import { CHORDS, QUALITY_INTERVALS, ROOTS, chord, chordMidis, parseChordName, playableChord } from '../../src/music/chords.ts';
import { STRINGS, midiToFreq, pitchClass, stringMidi, tabPosition } from '../../src/music/notes.ts';
import { SONGS } from '../../src/music/songs.ts';
import { capoHint, melodyOffset, rateKeys, suggestShift, transposeName, transposeSong } from '../../src/music/transpose.ts';
import { instrumentPeaks, judgeChord } from '../../src/audio/chord-detect.ts';
import { evaluateRecording, spectrum } from '../../src/audio/offline.ts';
import { renderPluck, renderStrum } from '../../src/audio/pluck.ts';
import { cents, detectPitch } from '../../src/audio/pitch.ts';
import { identifyFingering, libraryName, nameChord } from '../../src/music/identify.ts';
import { BLUES_SCALE, bendable, bluesBars, fitsFree, freeNotes, spell, inWindow, LEVELS, levelWindow, organVoicing, place, position, rootOf, scalePositions, windowTop } from '../../src/music/blues.ts';
import { parseFrets, plan } from '../../src/music/recording-plan.ts';
import type { Chord } from '../../src/music/grip.ts';

const SR = 48000;
const OTHERS = ['gitarre', 'banjo', 'bariton', 'mandoline'];

/** Für jedes Instrument ausführen; danach wieder Ukulele. */
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

const sameSet = (a: number[], b: number[]) => {
  const x = new Set(a);
  const y = new Set(b);
  return x.size === y.size && Array.from(x).every((v) => y.has(v));
};

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

/** Spielbar für Kinderhände: Spanne höchstens 3 Bünde, höchstens 4 Finger (Barré zählt als einer), genug Saiten. */
function playErrors(ch: Chord): string[] {
  const errors: string[] = [];
  if (!playableChord(ch)) errors.push('nicht auf dem Instrument');
  const pressed = ch.frets.filter((f) => f > 0);
  // Mandoline: kurze Mensur, in der ersten Lage reicht die Hand wie auf der Geige vom 1. bis zum 5. Bund (F = 5301)
  const span = instrument().id === 'mandoline' ? 4 : 3;
  if (pressed.length && Math.max(...pressed) - Math.min(...pressed) > span) errors.push(`Spanne > ${span}`);
  if (pressed.length && Math.max(...pressed) > 12) errors.push('über dem 12. Bund');
  const fingers = new Set(ch.fingers.filter((f) => f > 0));
  if (Array.from(fingers).some((f) => f < 1 || f > 4)) errors.push('Finger außerhalb 1–4');
  ch.frets.forEach((f, i) => {
    if (f > 0 && !ch.fingers[i]) errors.push(`Saite ${i} ohne Finger`);
    if (f <= 0 && ch.fingers[i]) errors.push(`Saite ${i} leer, aber mit Finger`);
  });
  // derselbe Finger nur im selben Bund (Barré)
  for (const f of fingers) {
    const at = new Set(ch.frets.filter((_, i) => ch.fingers[i] === f));
    if (at.size > 1) errors.push(`Finger ${f} in zwei Bünden`);
  }
  if (chordMidis(ch).length < 4) errors.push('weniger als vier Saiten');
  return errors;
}

test('Stimmungen: Ukulele G4 C4 E4 A4, Gitarre E2 A2 D3 G3 B3 E4, Banjo g4 D3 G3 B3 D4, Bariton D3 G3 B3 E4, Mandoline G3 D4 A4 E5', () => {
  const tunings: Record<string, string> = {};
  each(['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline'], (id) => {
    tunings[id] = STRINGS.map((s) => `${s.name}${s.midi}`).join(' ');
  });
  assert.equal(tunings.ukulele, 'G67 C60 E64 A69');
  assert.equal(tunings.gitarre, 'E40 A45 D50 G55 B59 e64');
  assert.equal(tunings.banjo, 'g67 D50 G55 B59 D62');
  assert.equal(tunings.bariton, 'D50 G55 B59 E64');
  assert.equal(tunings.mandoline, 'G55 D62 A69 E76');
});

test('kurze Banjo-Saite: beginnt am 5. Bund, Tabulatur nutzt sie nur leer', () => {
  each(['banjo'], () => {
    assert.equal(stringMidi(0, 0), 67);
    assert.equal(stringMidi(0, 7), 69);
    assert.deepEqual(tabPosition(67), { string: 0, fret: 0 });
    assert.deepEqual(tabPosition(69), { string: 4, fret: 7 });
    assert.deepEqual(tabPosition(62), { string: 4, fret: 0 });
  });
});

test('Gitarre: Tabulatur der Melodie eine Oktave tiefer, in den ersten Bünden', () => {
  each(['gitarre'], () => {
    assert.equal(instrument().melody.offset, -12);
    // C4 gesungen → C3 gespielt: A-Saite, 3. Bund
    assert.deepEqual(tabPosition(60 + instrument().melody.offset), { string: 1, fret: 3 });
  });
});

test('alle Melodien liegen auf jedem Instrument, auf Gitarre, Banjo und Bariton-Ukulele fast alle in den ersten Bünden', () => {
  each(['ukulele', ...OTHERS], (id) => {
    let notes = 0;
    let low = 0;
    for (const s of SONGS) {
      const offset = melodyOffset(s);
      for (const e of s.events) {
        if (e.midi === null) continue;
        const pos = tabPosition(e.midi + offset);
        assert.ok(pos && pos.fret <= (id === 'banjo' || id === 'bariton' ? 17 : 12), `${id} ${s.id}: ${e.syllable} (${e.midi})`);
        notes++;
        if (pos!.fret <= 5) low++;
      }
    }
    if (id === 'gitarre') assert.ok(low / notes > 0.95, `nur ${low}/${notes} Töne in den ersten fünf Bünden`);
    if (id === 'banjo') assert.ok(low / notes > 0.85, `nur ${low}/${notes} Töne in den ersten fünf Bünden`);
    if (id === 'bariton') assert.ok(low / notes > 0.9, `nur ${low}/${notes} Töne in den ersten fünf Bünden`);
    // Mandoline: die gesungene Lage, ohne Oktavsprung, und alles in der ersten Lage (der 6. Bund nur für C#4)
    if (id === 'mandoline') assert.ok(low / notes > 0.98, `nur ${low}/${notes} Töne in den ersten fünf Bünden`);
  });
});

test('Bibliotheksgriffe: richtige Töne, greifbar, Fingersatz passt', () => {
  each(['ukulele', ...OTHERS], (id) => {
    const names = new Set<string>();
    for (const ch of CHORDS) {
      assert.ok(!names.has(ch.name), `${id}: ${ch.name} doppelt`);
      names.add(ch.name);
      assert.equal(ch.frets.length, STRINGS.length, `${id} ${ch.name}`);
      assert.deepEqual(toneErrors(ch.name, ch), [], `${id} ${ch.name} (${ch.frets.join(' ')})`);
      assert.deepEqual(playErrors(ch), [], `${id} ${ch.name} (${ch.frets.join(' ')} / ${ch.fingers.join(' ')})`);
      if (ch.barre) assert.ok(ch.frets[ch.barre.from] === ch.barre.fret && ch.frets[ch.barre.to] === ch.barre.fret, `${id} ${ch.name}: Barré`);
    }
  });
});

test('Gitarre: offene Griffe wie im Lehrbuch', () => {
  each(['gitarre'], () => {
    const g = (n: string) => chord(n).frets.map((f) => (f < 0 ? 'x' : String(f))).join('');
    assert.equal(g('C'), 'x32010');
    assert.equal(g('G'), '320003');
    assert.equal(g('D'), 'xx0232');
    assert.equal(g('Em'), '022000');
    assert.equal(g('Am'), 'x02210');
    // Barré-Formen: F# als E-Form im 2. Bund, Bb als A-Form im 1., C#m als A-Form im 4.
    assert.equal(g('F#'), '244322');
    assert.equal(g('Bb'), 'x13331');
    assert.equal(g('C#m'), 'x46654');
    assert.deepEqual(chord('F#').barre, { fret: 2, from: 0, to: 5 });
  });
});

test('Banjo (Open G): G ist leer, die kurze Saite schweigt bei Akkorden ohne G', () => {
  each(['banjo'], () => {
    assert.deepEqual(chord('G').frets, [0, 0, 0, 0, 0]);
    assert.equal(chord('D').frets[0], -1);
    assert.equal(chord('C').frets[0], 0);
    for (const r of ROOTS) {
      const ch = chord(r);
      assert.equal(ch.frets[0] === 0, chordMidis(ch).map(pitchClass).indexOf(7) >= 0, `${r}: ${ch.frets.join(' ')}`);
    }
  });
});

test('Bariton-Ukulele: Griffe wie auf den vier hohen Gitarrensaiten, Ukulele-Formen eine Quarte tiefer', () => {
  const g = (n: string) => chord(n).frets.map((f) => (f < 0 ? 'x' : String(f))).join('');
  const guitar: Record<string, string> = {};
  const uke: Record<string, string> = {};
  each(['gitarre'], () => {
    for (const ch of CHORDS) guitar[ch.name] = g(ch.name);
  });
  for (const r of ROOTS) for (const q of ['', 'm', '7']) uke[r + q] = g(r + q);
  each(['bariton'], () => {
    assert.equal(g('G'), '0003');
    assert.equal(g('C'), '2010');
    assert.equal(g('D'), '0232');
    assert.equal(g('Em7'), '0000');
    // Am7 und A7 brauchen auf vier Saiten den Grundton A, den die Gitarre auf der A-Saite spielt
    for (const ch of CHORDS) if (guitar[ch.name] && ch.name !== 'Am7' && ch.name !== 'A7') assert.equal(g(ch.name), guitar[ch.name].slice(2), ch.name);
    for (const r of ROOTS)
      for (const q of ['', 'm', '7']) {
        const ch = chord(r + q);
        if (CHORDS.indexOf(ch) < 0) assert.equal(g(r + q), uke[transposeName(r + q, 5)], r + q);
      }
  });
});

test('Mandoline: offene Griffe wie im Lehrbuch, bewegliche Formen (Chop Chords) in allen zwölf Tonarten', () => {
  each(['mandoline'], () => {
    const g = (n: string) => chord(n).frets.join('');
    assert.equal(g('G'), '0023');
    assert.equal(g('C'), '0230');
    assert.equal(g('D'), '2002');
    assert.equal(g('A'), '2240');
    assert.equal(g('Em'), '0220');
    assert.equal(g('Am'), '2230');
    assert.equal(g('D7'), '2032');
    assert.equal(g('G7'), '0021');
    // Tabelle: G-, C- und E-Form ohne leere Saiten, je Grundton im tiefsten Bund
    assert.equal(g('C#'), '1341');
    assert.equal(g('Eb'), '3563');
    assert.equal(g('F#'), '3442');
    assert.equal(g('Ab'), '1134');
    assert.equal(g('B'), '4467');
    assert.equal(g('F#m'), '2442');
    assert.equal(g('C#7'), '4341');
    assert.deepEqual(chord('B').barre, { fret: 4, from: 0, to: 1 });
    for (const q of ['', 'm', '7'])
      for (const r of ROOTS) {
        const shape = instrument().shapes[q][ROOTS.indexOf(r)];
        const ch = { name: r + q, frets: shape.frets, fingers: shape.fingers!, say: '', level: 5 };
        assert.deepEqual(toneErrors(r + q, ch), [], `${r + q} (${ch.frets.join(' ')})`);
        assert.deepEqual(playErrors(ch), [], `${r + q} (${ch.frets.join(' ')} / ${ch.fingers.join(' ')})`);
        assert.ok(Math.max(...shape.frets) <= 7, `${r + q}: zu weit oben`);
        // ohne leere Saite: alle vier Saitenpaare gegriffen, die Form lässt sich verschieben
        if (shape.frets.indexOf(0) < 0) assert.ok(shape.frets.every((f) => f > 0), r + q);
      }
  });
});

test('jeder Akkord aus jedem Lied hat in jeder Tonart auf jedem Instrument einen spielbaren Griff', () => {
  each(['ukulele', ...OTHERS], (id) => {
    const names = new Set<string>();
    for (const s of SONGS) for (const c of s.chords) for (let k = -6; k < 6; k++) names.add(transposeName(c, k));
    // „Einfache Griffe“ ersetzen verwandte Akkordarten
    for (const n of Array.from(names)) {
      const p = parseChordName(n)!;
      for (const q of ['7', 'm7', '']) names.add(ROOTS[p.root] + q);
    }
    for (const n of names) {
      const ch = chord(n);
      assert.deepEqual(toneErrors(n, ch), [], `${id} ${n} (${ch.frets.join(' ')})`);
      if (id !== 'ukulele') assert.deepEqual(playErrors(ch), [], `${id} ${n} (${ch.frets.join(' ')} / ${ch.fingers.join(' ')})`);
    }
  });
});

test('Gitarre und Banjo: jede Akkordart in jeder Tonart hat einen Griff mit genau ihren Tönen', () => {
  each(OTHERS, (id) => {
    for (const r of ROOTS)
      for (const q of Object.keys(QUALITY_INTERVALS)) {
        const ch = chord(r + q);
        assert.deepEqual(toneErrors(r + q, ch), [], `${id} ${r + q} (${ch.frets.join(' ')})`);
        assert.ok(playableChord(ch), `${id} ${r + q}`);
      }
  });
});

test('Tonart-Vorschlag richtet sich nach den Griffen des Instruments', () => {
  each(OTHERS, (id) => {
    for (const s of SONGS) {
      const shift = suggestShift(s);
      const rated = rateKeys(s);
      const bestPlay = Math.min(...rated.map((r) => r.play));
      const chosen = rated.find((r) => r.shift === shift)!;
      assert.ok(chosen.play <= bestPlay + 4, `${id} ${s.id}: Vorschlag ${shift} viel schwerer als nötig`);
    }
  });
});

test('Kapodaster-Hinweis nur auf der Gitarre: Lied in Bb → Kapo mit leichten offenen Griffen', () => {
  const s = SONGS.find((x) => x.id === 'alle-meine-entchen')!;
  // C → Bb ist -2
  assert.equal(capoHint(s, -2), null);
  each(['gitarre'], () => {
    const hint = capoHint(s, -2);
    assert.ok(hint, 'kein Hinweis');
    assert.ok(hint!.capo >= 1 && hint!.capo <= 7);
    assert.equal(transposeName(hint!.shapes, hint!.capo), 'Bb');
    // in C ist alles leicht – kein Kapo nötig
    assert.equal(capoHint(s, 0), null);
  });
  each(['banjo'], () => assert.equal(capoHint(s, -2), null));
});

const strumOf = (ch: Chord) => renderStrum(chordMidis(ch).map(midiToFreq), SR, 1.2, 18, instrument().synth);
const peaksOf = (sig: Float32Array) => instrumentPeaks(spectrum(sig, 4800 + 8192), SR / 8192);

test('Synthese: tiefe Gitarrensaiten und Banjo klingen in der richtigen Tonhöhe, das Stimmgerät erkennt sie', () => {
  each(OTHERS, (id) => {
    const tone = instrument().synth;
    const range = instrument().tuner;
    for (const s of STRINGS) {
      const f = midiToFreq(s.midi) * Math.pow(2, 15 / 1200);
      const sig = renderPluck(f, SR, 0.6, tone.brightness, 1, tone.sustain, tone.position);
      const p = detectPitch(sig.subarray(6000, 6000 + 4096), SR, range.minHz, range.maxHz);
      assert.ok(p && Math.abs(cents(p.freq, f)) < 5, `${id} ${s.name}: ${p ? p.freq.toFixed(1) : '–'} statt ${f.toFixed(1)} Hz`);
    }
  });
});

test('Erkennung: jeder Bibliotheksgriff wird als er selbst erkannt und kein anderer Griff gelobt', () => {
  each(OTHERS, (id) => {
    const peaks = new Map(CHORDS.map((c) => [c.name, peaksOf(strumOf(c))]));
    for (const ch of CHORDS) {
      const v = judgeChord(peaks.get(ch.name)!, ch.name);
      assert.ok(v && v.ok, `${id} ${ch.name}: erkannt als ${v && v.best}, score ${v && v.expected.score.toFixed(2)}`);
    }
    for (const played of CHORDS)
      for (const expected of CHORDS) {
        if (played === expected || sameSet(chordMidis(played).map(pitchClass), chordMidis(expected).map(pitchClass))) continue;
        const v = judgeChord(peaks.get(played.name)!, expected.name);
        assert.ok(!(v && v.ok), `${id}: ${played.name} gespielt, aber als ${expected.name} gelobt`);
      }
  });
});

test('Erkennung: drückt ein Finger nicht, gibt es kein Lob – und meist den Hinweis auf genau diese Saite', () => {
  each(OTHERS, (id) => {
    let cases = 0;
    let named = 0;
    for (const ch of CHORDS)
      ch.frets.forEach((f, i) => {
        if (f <= 0) return;
        const frets = ch.frets.slice();
        frets[i] = 0;
        const wrong = { ...ch, frets };
        if (sameSet(chordMidis(wrong).map(pitchClass), chordMidis(ch).map(pitchClass))) return;
        cases++;
        const v = judgeChord(peaksOf(strumOf(wrong)), ch.name);
        assert.ok(v && !v.ok, `${id} ${ch.name} mit leerer Saite ${i} gelobt`);
        if (v && v.weakString === i) named++;
      });
    assert.ok(named / cases > 0.9, `${id}: nur ${named}/${cases} Saiten benannt`);
  });
});

test('Detektiv: jeder Bibliotheksgriff wird mit Tönen und Namen erkannt', () => {
  each(OTHERS, (id) => {
    for (const ch of CHORDS) {
      const f = identifyFingering(peaksOf(strumOf(ch)))!;
      assert.ok(f, `${id} ${ch.name}`);
      const pcs = chordMidis(ch).map(pitchClass);
      const found = f.midis.map(pitchClass);
      assert.ok(sameSet(found, pcs), `${id} ${ch.name}: Töne ${found} statt ${pcs} (Bünde ${f.frets})`);
      assert.ok(nameChord(found).some((n) => n.name === ch.name) || libraryName(f.frets) === ch.name, `${id} ${ch.name}`);
    }
  });
});

test('Blues: Vorgabe-Töne in bequemer Lage, Grundtöne passen, Orgel außerhalb des Hörbereichs der Erkennung', () => {
  each(['ukulele', ...OTHERS], (id) => {
    const b = instrument().blues;
    for (let key = 0; key < 12; key++) {
      const bars = bluesBars(key);
      assert.equal(rootOf(bars[0]).uke % 12, key);
      assert.ok(scalePositions(key, b.frets).length >= 6, `${id} Tonleiter in ${bars[0]}`);
      for (const level of LEVELS) {
        if (!level.notes) continue;
        for (const chordName of bars)
          for (const n of level.notes(chordName)) {
            const p = position(n.midi);
            assert.ok(p.fret <= b.frets, `${id} ${level.id} ${chordName}: ${n.midi}`);
            const hz = midiToFreq(n.midi);
            assert.ok(hz >= b.pitch.minHz && hz <= b.pitch.maxHz, `${id}: ${n.midi} außerhalb der Tonhöhenerkennung`);
          }
      }
      for (const chordName of bars)
        for (const m of organVoicing(chordName)) {
          const hz = midiToFreq(m);
          assert.ok(hz < b.pitch.minHz || hz > b.pitch.maxHz, `${id} ${chordName}: Orgel ${m} im Bereich der Erkennung`);
        }
    }
    // in der ★-Tonart liegt der Grundton auf einer leeren Saite
    assert.equal(position(rootOf(bluesBars(b.easyKey)[0]).uke).fret, 0, id);
  });
});

test('Blues weiter oben am Hals: Vorgabe im Ausschnitt, ganze Tonleiter sichtbar, Orgel über dem Spielbereich', () => {
  each(['ukulele', ...OTHERS], (id) => {
    const b = instrument().blues;
    for (const free of [false, true])
      for (let from = 1; from + 4 <= instrument().frets; from++) {
        const w = free ? { from, frets: 5 } : levelWindow(from);
        const top = windowTop(w);
        for (let key = 0; key < 12; key++) {
          const bars = bluesBars(key);
          const seen = scalePositions(key, w).map((p) => (p.midi - key + 120) % 12);
          if (free) for (const iv of BLUES_SCALE) assert.ok(seen.indexOf(iv) >= 0, `${id} Bund ${from}+${w.frets} in ${bars[0]}: Stufe ${iv} fehlt`);
          for (const p of scalePositions(key, w)) assert.ok(inWindow(p.fret, w));
          for (const level of LEVELS) {
            if (!level.notes || free) continue;
            for (const chordName of bars)
              for (const n of level.notes(chordName)) {
                const p = place(n.midi, w);
                assert.equal(pitchClass(p.midi), pitchClass(n.midi));
                assert.equal(stringMidi(p.string, p.fret), p.midi);
                assert.ok(inWindow(p.fret, w), `${id} ${level.id} ${chordName} Bund ${from}: ${n.midi} → Bund ${p.fret}`);
              }
          }
          if (b.organ > b.low) for (const chordName of bars) for (const m of organVoicing(chordName, top)) assert.ok(m > top + 1, `${id}: Orgel ${m} im Spielbereich`);
        }
      }
    // am Sattel bleibt alles wie bisher
    const home = levelWindow(1);
    assert.deepEqual(home, { from: 1, frets: b.frets });
    for (const n of LEVELS[0].notes!(bluesBars(b.easyKey)[0])) assert.deepEqual(place(n.midi, home), { ...position(n.midi), midi: n.midi });
    // die Blue Note (kleine Terz) lässt sich nur gegriffen ziehen
    assert.equal(bendable(stringMidi(1, 3), 3, (stringMidi(1, 3) - 3 + 12) % 12), true);
    assert.equal(bendable(STRINGS[1].midi, 0, (STRINGS[1].midi - 3 + 12) % 12), false);
  });
});

test('Dur und Moll mischen: Dur-Töne blass, große Terz golden über I, ausgeblendet über IV; Ziehen nur über I', () => {
  const w = { from: 1, frets: 5 };
  const pcs = (chord: string, mixed: boolean) => freeNotes(0, chord, w, mixed);
  const find = (list: ReturnType<typeof pcs>, pc: number) => list.filter((n) => n.midi % 12 === pc);
  // E (große Terz in C)
  assert.ok(find(pcs('C7', true), 4).every((n) => n.kind === 'chord' && !n.weak));
  assert.equal(find(pcs('F7', true), 4).length, 0);
  assert.ok(find(pcs('G7', true), 4).every((n) => n.weak));
  // A ist über F7 Akkordton, sonst blass; D blass
  assert.ok(find(pcs('F7', true), 9).every((n) => n.kind === 'chord' && !n.weak));
  assert.ok(find(pcs('C7', true), 9).every((n) => n.weak));
  assert.ok(find(pcs('C7', true), 2).length > 0);
  // ohne Mischen keine Dur-Töne
  for (const pc of [2, 4, 9]) assert.equal(find(pcs('C7', false), pc).filter((n) => n.kind !== 'chord').length, 0);
  // Ziehpfeil nur über dem Grundakkord
  assert.ok(pcs('C7', false).some((n) => n.bend));
  assert.ok(!pcs('F7', false).some((n) => n.bend) && !pcs('G7', false).some((n) => n.bend));
  assert.equal(fitsFree(64, 0, 'F7', true), false);
  assert.equal(fitsFree(64, 0, 'C7', true), true);
  assert.equal(fitsFree(64, 0, 'C7', false), false);
});

test('Tonnamen passend zur Tonart', () => {
  const scale = (key: number) => [0, 3, 4, 5, 6, 7, 10].map((i) => spell(key + i, key)).join(' ');
  assert.equal(scale(0), 'C Eb E F Gb G Bb');
  assert.equal(scale(4), 'E G G# A Bb B D');
  assert.equal(scale(9), 'A C C# D Eb E G');
  assert.equal(scale(7), 'G Bb B C Db D F');
  // ungewohnte Namen werden vermieden
  assert.equal(spell(11, 8), 'B');
  for (let key = 0; key < 12; key++) for (let pc = 0; pc < 12; pc++) assert.match(spell(pc, key), /^[A-G][#b]?$/);
});

test('Aufnahmeplan je Instrument: eindeutig, ein Zeichen je Saite, synthetisch richtig bewertet', () => {
  each(OTHERS, (id) => {
    const p = plan();
    assert.equal(new Set(p.map((t) => t.id)).size, p.length);
    assert.ok(p.filter((t) => !t.correct && t.chord).length >= 6, `${id}: zu wenige Fehlgriffe`);
    for (const t of p) {
      const f = parseFrets(t.frets);
      assert.equal(f.length, STRINGS.length, `${id} ${t.id}`);
      const freqs = f.flatMap((x, s) => (x >= 0 ? [midiToFreq(stringMidi(s, x))] : []));
      if (!freqs.length || !t.chord) continue;
      const one = renderStrum(freqs, SR, 1, 18, instrument().synth);
      const sig = new Float32Array(one.length * 3);
      for (let k = 0; k < 3; k++) sig.set(one, k * one.length);
      const r = evaluateRecording(sig, SR);
      if (t.correct) assert.ok(r.accepted[t.chord] !== undefined, `${id} ${t.id}: nicht erkannt`);
      else assert.equal(r.accepted[t.chord], undefined, `${id} ${t.id}: Fehlgriff als ${t.chord} gelobt`);
    }
  });
});

test('Instrumentwechsel: Griffe und Saiten folgen, Ukulele bleibt wie sie war', () => {
  assert.equal(instrument().id, 'ukulele');
  assert.equal(chord('C').frets.join(''), '0003');
  each(['gitarre'], () => assert.equal(chord('C').frets.length, 6));
  assert.equal(chord('C').frets.join(''), '0003');
  assert.equal(INSTRUMENTS.length, 5);
  assert.equal(setInstrument('gibt-es-nicht').id, 'ukulele');
});

test('Transponieren auf der Gitarre: Melodie folgt, Griffe der neuen Tonart existieren', () => {
  each(['gitarre'], () => {
    for (const s of SONGS.slice(0, 20))
      for (let k = -6; k < 6; k++) {
        const t = transposeSong(s, k);
        for (const c of t.chords) assert.ok(chord(c).frets.length === 6, `${s.id} ${c}`);
      }
  });
});
