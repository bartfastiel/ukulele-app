import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chord } from '../../src/music/chords.ts';
import { diagnose } from '../../src/music/diagnose.ts';

test('Tipp nennt Saite, Finger und Bund und klingt nie nach „falsch“', () => {
  const c = chord('C');
  const open = diagnose(c, 3, 'open');
  assert.ok(/A-Saite/.test(open), open);
  assert.ok(/Ringfinger/.test(open), open);
  assert.ok(/3\. Bund/.test(open), open);
  const leer = diagnose(c, 1, 'muted');
  assert.ok(/leere C-Saite/.test(leer), leer);
  assert.ok(/Brücke/.test(leer), leer);
  for (const t of [open, leer, diagnose(chord('G7'), 2, 'muted')]) assert.ok(!/falsch/i.test(t), t);
});
