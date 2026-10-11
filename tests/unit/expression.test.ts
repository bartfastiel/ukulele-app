import { test } from 'node:test';
import assert from 'node:assert/strict';
import { BEND_MAX, StrikeSense, VibratoDetector, bendSemis, slideFret, STRIKE_TUNING, strikeAttack, strikeCutoff, strikeGain, type TouchSample } from '../../src/ui/expression.ts';
import { TiltTracker, pitchOf, wahOf } from '../../src/audio/motion.ts';

const dB = (g: number) => 20 * Math.log10(g);

/**
 * Ein Anschlag wie in fret-gesture.ts: Aufsetzen, dann Messpunkte in der Wartezeit; der höchste Wert zählt.
 * `make(p)` liefert den Messpunkt beim Anteil p (0 … 1) des Anstiegs.
 */
function tap(sense: StrikeSense, make: (p: number) => TouchSample): number | null {
  const first = make(0);
  sense.observe(first);
  let force = first.force;
  let radius = first.radius;
  for (const p of [0.35, 0.7, 1]) {
    const s = make(p);
    sense.observe(s);
    if (typeof s.force === 'number') force = Math.max(force || 0, s.force);
    if (typeof s.radius === 'number') radius = Math.max(radius || 0, s.radius);
  }
  return sense.strike({ force, radius });
}

/** Kontaktfläche wie auf vielen Android-Geräten: wächst nach dem Aufsetzen, fest getippt weiter (kleines Rauschen). */
const areaTap = (peak: number, jitter: number) => (p: number): TouchSample => ({ force: undefined, radius: 4.1 + (peak - 4.1) * p + jitter });

test('Anschlag ohne Sensor: Konstanten (Desktop, iPad ohne 3D Touch) klingen immer gleich und warten nicht', () => {
  const ipad = new StrikeSense();
  for (let i = 0; i < 12; i++) assert.equal(tap(ipad, () => ({ force: 0, radius: 20.8 })), null);
  assert.equal(ipad.supported, false);
  assert.equal(ipad.worthWaiting({ force: 0, radius: 20.8 }), false);

  const stub = new StrikeSense();
  for (let i = 0; i < 12; i++) assert.equal(tap(stub, (p) => ({ force: p < 0.5 ? 0.5 : 1, radius: undefined })), null);
  assert.equal(stub.worthWaiting({ force: 1 }), false);
  assert.equal(new StrikeSense().worthWaiting({}), false);

  assert.equal(strikeGain(null), 0.6);
  assert.equal(strikeCutoff(null, 440), 0);
});

test('Anschlag: grob gestufte Radien (Tablets runden auf etwa 5 px) gelten nicht als Sensor', () => {
  const s = new StrikeSense();
  const steps = [20.88, 26.1, 31.32, 36.54];
  for (let i = 0; i < 12; i++) assert.equal(tap(s, (p) => ({ force: 0, radius: steps[Math.min(3, Math.floor(p * 3 + (i % 2)))] })), null);
  assert.equal(s.supported, false);
});

test('Anschlag nur über die Kontaktfläche (Android): leicht deutlich leiser und dunkler als fest', () => {
  const s = new StrikeSense();
  // ein neues Gerät: vor dem ersten Anschlag lohnt das Warten schon
  assert.equal(s.worthWaiting({ radius: 4.1 }), true);
  const soft: number[] = [];
  const hard: number[] = [];
  for (let i = 0; i < 16; i++) {
    const j = (i % 3) * 0.13;
    soft.push(tap(s, areaTap(7, j))!);
    hard.push(tap(s, areaTap(15, j))!);
  }
  assert.equal(s.supported, true);
  const late = (xs: number[]) => xs.slice(8);
  for (const v of late(soft)) assert.ok(v < 0.25, `leicht ${v}`);
  for (const v of late(hard)) assert.ok(v > 0.75, `fest ${v}`);
  const gap = dB(strikeGain(late(hard)[0])) - dB(strikeGain(late(soft)[0]));
  assert.ok(gap >= 20, `Unterschied ${gap.toFixed(1)} dB`);
  assert.ok(strikeCutoff(late(soft)[0], 392) < 2000);
  assert.ok(strikeCutoff(late(hard)[0], 392) > 8000);
  // gleich fest getippt klingt gleich (nicht zufällig)
  const again = tap(s, areaTap(15, 0.13))!;
  assert.ok(Math.abs(again - late(hard)[1]) < 0.15, `wieder fest ${again}`);
});

test('Anschlag mit echter Kraft (3D Touch, Stift); Standardwerte daneben stören nicht', () => {
  const s = new StrikeSense();
  const forceTap = (peak: number) => (p: number): TouchSample => ({ force: 0.02 + (peak - 0.02) * p + 0.003 * p, radius: 0 });
  const v: number[] = [];
  for (let i = 0; i < 10; i++) {
    v.push(tap(s, forceTap(0.12))!, tap(s, forceTap(0.7))!);
  }
  assert.equal(s.force.supported, true);
  assert.equal(s.area.supported, false);
  assert.ok(v[v.length - 2] < 0.2 && v[v.length - 1] > 0.8, `${v[v.length - 2]} / ${v[v.length - 1]}`);
  // Kraft immer 1 (manche Geräte), Fläche echt: die Fläche zählt
  const mixed = new StrikeSense();
  let last: number | null = null;
  for (let i = 0; i < 10; i++) last = tap(mixed, (p) => ({ force: 1, radius: 5 + 9 * p + (i % 2) * 0.2 }));
  assert.equal(mixed.force.supported, false);
  assert.ok(last !== null);
});

test('Anschlag: die ersten Anschläge eines Geräts springen nicht wild, der Bereich lernt sich', () => {
  const s = new StrikeSense();
  // bevor genug verschiedene Werte da sind: gleichmäßig wie ohne Sensor
  assert.equal(s.strike({ radius: 8 }), null);
  const first = tap(s, areaTap(10, 0));
  assert.ok(first !== null && first > 0.3 && first < 0.7, `erster ${first}`);
});

test('Lautstärke: über 30 dB Umfang, leisester Anschlag hörbar, kleine Unterschiede in der Mitte hörbar', () => {
  assert.ok(STRIKE_TUNING.rangeDb >= 30);
  assert.ok(Math.abs(dB(strikeGain(1)) - dB(strikeGain(0)) - STRIKE_TUNING.rangeDb) < 0.01);
  // nie stumm: auch der leiseste Anschlag hat noch über 1 % der vollen Lautstärke
  assert.ok(strikeGain(0) > 0.01, `leisester ${strikeGain(0)}`);
  // ein Zehntel mehr Druck in der Mitte: mindestens 3 dB lauter
  assert.ok(dB(strikeGain(0.55)) - dB(strikeGain(0.45)) >= 3, `Mitte ${(dB(strikeGain(0.55)) - dB(strikeGain(0.45))).toFixed(1)} dB`);
  for (let i = 0; i < 10; i++) assert.ok(strikeGain((i + 1) / 10) > strikeGain(i / 10));
  assert.equal(strikeGain(2), strikeGain(1));
  assert.equal(strikeGain(null), 0.6);
  // leise deutlich dumpf (unter dem 2. Oberton), fest ganz hell
  assert.ok(strikeCutoff(0, 392) < 2 * 392 && strikeCutoff(0.5, 392) > strikeCutoff(0, 392) && strikeCutoff(1, 392) === 18000);
  // Anschlagsgeräusch nur bei festem Anschlag, ohne Sensor keins
  assert.equal(strikeAttack(null), 0);
  assert.equal(strikeAttack(0.3), 0);
  assert.ok(strikeAttack(1) > strikeAttack(0.75) && strikeAttack(0.75) > 0);
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

test('Ziehen: kleiner Spielraum ohne Wirkung, der Halbton ist gut zu treffen, höchstens knapp darüber', () => {
  assert.equal(bendSemis(0.1), 0);
  assert.equal(bendSemis(-0.1), 0);
  assert.ok(bendSemis(0.4) > 0.5 && bendSemis(0.4) < 0.8, `halb ${bendSemis(0.4)}`);
  // eine breite Stelle, an der genau der Halbton klingt
  for (const a of [0.75, 0.8, 0.9, 0.95]) assert.equal(bendSemis(a), 1);
  assert.ok(Math.abs(bendSemis(0.68) - 1) < 0.02);
  assert.equal(bendSemis(-1), bendSemis(1));
  assert.ok(bendSemis(1.1) > 1 && bendSemis(1.1) < BEND_MAX);
  assert.equal(bendSemis(5), BEND_MAX);
  assert.ok(BEND_MAX <= 1.25);
  for (let a = 0; a < 2; a += 0.05) assert.ok(bendSemis(a + 0.05) >= bendSemis(a));
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
