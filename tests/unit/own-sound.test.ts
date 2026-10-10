import { test } from 'node:test';
import assert from 'node:assert/strict';
import { OWN_SOUND_MS, hearingOwnSound, holdOwnSound, markOwnSound } from '../../src/audio/own-sound.ts';

test('eigener Ton: das Mikrofon ist bis kurz nach dem Anschlag taub', () => {
  const t0 = 1_000_000;
  assert.equal(hearingOwnSound(t0), false);
  markOwnSound(t0);
  assert.equal(hearingOwnSound(t0 + 100), true);
  assert.equal(hearingOwnSound(t0 + OWN_SOUND_MS - 1), true);
  assert.equal(hearingOwnSound(t0 + OWN_SOUND_MS + 1), false);
});

test('gehaltener eigener Ton: taub, solange er klingt, und danach noch die Nachklingzeit', () => {
  const t0 = 2_000_000;
  const release = holdOwnSound(t0);
  assert.equal(hearingOwnSound(t0 + 10_000), true, 'lange gehalten');
  release(t0 + 10_000);
  release(t0 + 10_000);
  assert.equal(hearingOwnSound(t0 + 10_000 + OWN_SOUND_MS - 1), true);
  assert.equal(hearingOwnSound(t0 + 10_000 + OWN_SOUND_MS + 1), false, 'doppeltes Loslassen zählt nur einmal');
});

test('zwei Finger: erst wenn beide los sind, hört das Mikrofon wieder', () => {
  const t0 = 3_000_000;
  const a = holdOwnSound(t0);
  const b = holdOwnSound(t0);
  a(t0 + 100);
  assert.equal(hearingOwnSound(t0 + 5_000), true);
  b(t0 + 5_000);
  assert.equal(hearingOwnSound(t0 + 5_000 + OWN_SOUND_MS + 1), false);
});
