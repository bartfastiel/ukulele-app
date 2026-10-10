import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PressureSense, VibratoDetector, bendSemis, slideFret, strikeGain } from '../../src/ui/expression.ts';
import { TiltTracker, pitchOf, wahOf } from '../../src/audio/motion.ts';

test('Druck: Standardwerte (0, 0,5, 1) zählen nicht als Sensor, echte Werte lernen ihren Bereich', () => {
  const p = new PressureSense();
  for (const x of [0, 0.5, 1, 0.5, 1]) p.observe(x);
  assert.equal(p.supported, false);
  assert.equal(p.normalised(0.5), null);
  assert.equal(strikeGain(null), 0.6);
  for (const x of [0.12, 0.3, 0.55, 0.8]) p.observe(x);
  assert.equal(p.supported, true);
  assert.equal(p.normalised(0.12), 0);
  assert.equal(p.normalised(1), 1);
  assert.ok(strikeGain(1) > strikeGain(0.5) && strikeGain(0.5) > strikeGain(0));
});

/** Bewegung abtasten: alle 16 ms eine Position. */
function run(v: VibratoDetector, f: (t: number) => number, seconds: number, t0 = 0): number {
  let d = 0;
  for (let t = t0; t < t0 + seconds; t += 0.016) d = v.update(f(t), t);
  return d;
}

test('Vibrato: Wiegen schwingt mit passender Geschwindigkeit, ein einmaliges Verschieben nicht', () => {
  const rock = new VibratoDetector();
  const depth = run(rock, (t) => 10 * Math.sin(2 * Math.PI * 5 * t), 1);
  assert.ok(depth > 0.5, `Tiefe ${depth}`);
  assert.ok(rock.rate > 4 && rock.rate < 6, `Rate ${rock.rate}`);
  // danach ruhig: klingt aus
  assert.ok(run(rock, () => 0, 1.5, 1) < 0.05);

  const push = new VibratoDetector();
  assert.equal(run(push, (t) => 40 * t, 1), 0);
  // Zittern unter der Schwelle
  const shaky = new VibratoDetector();
  assert.equal(run(shaky, (t) => 0.8 * Math.sin(2 * Math.PI * 6 * t), 1), 0);
});

test('Ziehen: kleiner Spielraum ohne Wirkung, eine Saite weit etwa ein Ganzton, höchstens anderthalb Töne', () => {
  assert.equal(bendSemis(0.1), 0);
  assert.equal(bendSemis(-0.1), 0);
  assert.ok(Math.abs(bendSemis(1) - 2) < 0.1);
  assert.equal(bendSemis(-1), bendSemis(1));
  assert.equal(bendSemis(5), 3);
});

test('Rutschen: erst tief im Nachbarbund wechselt der Ton, Grenzen des Ausschnitts gelten', () => {
  assert.equal(slideFret(5, 0.6, 5, 1, 9), 5);
  assert.equal(slideFret(5, 0.7, 5, 1, 9), 6);
  assert.equal(slideFret(5, 0.4, 6, 1, 9), 6);
  assert.equal(slideFret(5, -0.2, 6, 1, 9), 5);
  assert.equal(slideFret(5, 9, 5, 1, 9), 9);
  assert.equal(slideFret(2, -5, 2, 1, 9), 1);
});

test('Kippen: Nullpunkt beim ersten Finger, Totzone, nach vorn heller, nach hinten dunkler', () => {
  const g = (deg: number) => {
    const r = (deg * Math.PI) / 180;
    return [0, 9.81 * Math.cos(r), 9.81 * Math.sin(r)];
  };
  assert.ok(Math.abs(pitchOf(g(20)[0], g(20)[1], g(20)[2]) - 20) < 1e-9);
  assert.equal(wahOf(3), 0.5);
  assert.equal(wahOf(40), 1);
  assert.equal(wahOf(-40), 0);
  const tr = new TiltTracker();
  let t = 0;
  const feed = (deg: number, s: number) => {
    let w: number | null = null;
    for (const end = t + s; t < end; t += 0.016) w = tr.update(g(deg)[0], g(deg)[1], g(deg)[2], t);
    return w;
  };
  assert.equal(feed(30, 0.5), null);
  tr.rezero();
  assert.equal(feed(32, 0.5), 0.5);
  assert.ok(feed(55, 0.5)! > 0.9);
  assert.ok(feed(5, 0.5)! < 0.1);
});
