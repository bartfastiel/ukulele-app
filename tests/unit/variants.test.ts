import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TWELVE_MAX_HZ, instrument, setInstrument, setTuning, setVariant, soundId, twelveString, voice } from '../../src/music/instrument.ts';
import { STRINGS, midiToFreq } from '../../src/music/notes.ts';
import { overdrive, renderPluck } from '../../src/audio/pluck.ts';
import { cents, detectPitch } from '../../src/audio/pitch.ts';

const SR = 48000;

test('Varianten: Klang und 12 Saiten nur auf der Gitarre, Instrumentwechsel setzt zurück', () => {
  try {
    setInstrument('ukulele');
    setVariant('e', true);
    assert.equal(twelveString(), false);
    assert.equal(voice(), instrument().synth);

    setInstrument('gitarre');
    assert.equal(soundId(), 'nylon');
    assert.deepEqual(voice(), instrument().synth);
    setVariant('e', true);
    assert.equal(soundId(), 'e');
    assert.ok(voice().drive! > 0);
    assert.equal(twelveString(), true);
    // eine Stimmung ändert Klang und Saitenzahl nicht
    setTuning('open-g');
    assert.equal(soundId(), 'e');
    assert.equal(twelveString(), true);
    setVariant('unbekannt', false);
    assert.equal(soundId(), 'nylon');

    setVariant('stahl', true);
    setInstrument('banjo');
    assert.equal(twelveString(), false);
    setInstrument('gitarre');
    assert.equal(soundId(), 'nylon');
    assert.equal(twelveString(), false);
  } finally {
    setInstrument('ukulele');
  }
});

test('Varianten: jeder Gitarrenklang – auch verzerrt – hat die richtige Tonhöhe', () => {
  try {
    setInstrument('gitarre');
    for (const s of instrument().sounds!) {
      setVariant(s.id, false);
      const tone = voice();
      STRINGS.forEach((st, i) => {
        const f = midiToFreq(st.midi);
        const sig = renderPluck(f, SR, 0.6, tone.brightness, 1, tone.sustain, tone.position);
        if (tone.drive) overdrive(sig, tone.drive);
        const p = detectPitch(sig.subarray(4800, 4800 + 4096), SR, instrument().tuner.minHz, instrument().tuner.maxHz);
        assert.ok(p, `${s.id} ${st.name}: kein Ton`);
        assert.ok(Math.abs(cents(p!.freq, f)) < 10, `${s.id} ${st.name}: ${p!.freq.toFixed(1)} Hz statt ${f.toFixed(1)} Hz`);
        // die Oktavsaite der 12-saitigen Gitarre liegt eine Oktave höher und wird ebenfalls erkannt
        const oct = renderPluck(f * 2, SR, 0.6, tone.brightness, 1, tone.sustain, tone.position);
        const q = detectPitch(oct.subarray(4800, 4800 + 4096), SR, instrument().tuner.minHz, TWELVE_MAX_HZ);
        if (i < 4) assert.ok(q && Math.abs(cents(q.freq, f * 2)) < 10, `${s.id} ${st.name}: Oktave`);
      });
    }
  } finally {
    setInstrument('ukulele');
  }
});

test('Verzerrer: begrenzt weich auf ±1 und behält das Vorzeichen', () => {
  const d = new Float32Array([-1, -0.5, 0, 0.25, 1]);
  overdrive(d, 3);
  assert.ok(Array.from(d).every((x) => Math.abs(x) <= 1 + 1e-6));
  assert.equal(d[2], 0);
  assert.ok(d[1] < -0.5 && d[3] > 0.25, 'leise Stellen werden angehoben');
});
