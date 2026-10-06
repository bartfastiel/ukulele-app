import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TuningCoach, type Tip } from '../../src/audio/tuning-coach.ts';

/** Simuliert Anschläge: je Anschlag 1 s lang Messungen alle 50 ms, dann 1 s Pause. Liefert alle Tipps. */
function play(centsPerPluck: number[], string = 2, jitter = 0.8): Tip[] {
  const coach = new TuningCoach();
  const tips: Tip[] = [];
  let t = 0;
  let seed = 1;
  centsPerPluck.forEach((c) => {
    for (let k = 0; k < 20; k++) {
      seed = (seed * 16807) % 2147483647;
      const noise = (seed / 2147483647 - 0.5) * 2 * jitter;
      const tip = coach.reading(string, c + noise, 0.1 * Math.exp(-k / 10), t);
      if (tip) tips.push(tip);
      t += 50;
    }
    t += 1000;
    const tip = coach.silence(t);
    if (tip) tips.push(tip);
  });
  return tips;
}

test('unverändert verstimmt über mehrere Anschläge → „falscher Wirbel?“', () => {
  const tips = play([-35, -35, -34, -35, -35]);
  assert.deepEqual(tips, [{ kind: 'wrong-peg', string: 2 }]);
});

test('gleichmäßiges Annähern → kein Tipp', () => {
  assert.deepEqual(play([-40, -30, -21, -12, -5, -1]), []);
});

test('Annähern mit kleinem Überschießen ohne Plateau → kein Tipp', () => {
  assert.deepEqual(play([-30, -20, -10, 12, 4]), []);
});

test('Plateau, dann Sprung über den Zielton → „Saite hakt“', () => {
  const tips = play([-25, -24, -25, 18]);
  assert.deepEqual(tips, [{ kind: 'slipping', string: 2, direction: 1 }]);
});

test('nur kurz gleich (unter 6 s) → noch kein Hinweis auf den falschen Wirbel', () => {
  assert.deepEqual(play([-35, -35, -35]), []);
});

test('fast gestimmt und gleich → kein Tipp (das ist einfach richtig)', () => {
  assert.deepEqual(play([-3, -2, -3, -2, -3]), []);
});

test('ohne Pause erneut angeschlagen (Pegel springt) zählt als neuer Anschlag', () => {
  const coach = new TuningCoach();
  const tips: Tip[] = [];
  let t = 0;
  for (let pluck = 0; pluck < 8; pluck++)
    for (let k = 0; k < 60; k++) {
      // 1 s je Anschlag, 60 Messungen, Pegel klingt aus und springt beim nächsten Anschlag wieder hoch
      const tip = coach.reading(1, -30, 0.2 * Math.exp(-k / 25), t);
      if (tip) tips.push(tip);
      t += 1000 / 60;
    }
  assert.deepEqual(tips, [{ kind: 'wrong-peg', string: 1 }]);
});

test('Tipp kommt je Saite nur einmal, bis sie gestimmt war', () => {
  const tips = play([-35, -35, -35, -35, -35, -35, -35, -35]);
  assert.equal(tips.length, 1);
});
