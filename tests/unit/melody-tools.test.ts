import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseAbc } from '../../tools/melody/abc.ts';
import { parseLily, align, bestAligns } from '../../tools/melody/lily.ts';

test('ABC: Tonart, Auftakt, punktierte Noten, Akkorde und Silben', () => {
  const sc = parseAbc(['X:1', 'M:3/4', 'L:1/8', 'K:F', 'S:Test', '"F"F>F | F2 C2 A>A | "C7"B2 c2 z2 |]', 'w: In a cav-ern, in a can _'].join('\n'));
  assert.equal(sc.source, 'Test');
  assert.equal(sc.partial, 1);
  assert.deepEqual(
    sc.notes.map((n) => n.midi),
    [65, 65, 65, 60, 69, 69, 70, 72, null],
  );
  assert.deepEqual(
    sc.notes.map((n) => n.dur),
    [0.75, 0.25, 1, 1, 0.75, 0.25, 1, 1, 1],
  );
  assert.equal(sc.chords!.length, 2);
  assert.equal(sc.chords![1].quality, '7');
  const a = align(sc.notes, sc.verses[0]);
  assert.equal(a.leftoverNotes + a.leftoverSyllables, 0);
  assert.equal(a.events[2].syllable, 'cav');
  assert.equal(a.events[2].joinNext, true);
  assert.equal(a.events[7].hold, true);
});

test('LilyPond: Wiederholung mit nicht ausgeschriebenem Text und Alternativen', () => {
  const ly = '\\relative c\' { \\time 2/4 \\repeat volta 2 { c4 d } \\alternative { { e2 } { f2 } } } \\addlyrics { la la eins zwei }';
  const sc = parseLily(ly)!;
  // ausgeschrieben: c d e c d f – die zweite Runde wiederholt „la la“
  assert.equal(sc.notes.length, 6);
  const best = bestAligns(sc.notes, sc.verses[0]);
  assert.equal(best.leftover, 0);
  const a = align(sc.notes, sc.verses[0], best.opts[0]);
  assert.deepEqual(
    a.events.map((e) => e.syllable),
    ['la', 'la', 'eins', 'la', 'la', 'zwei'],
  );
});

test('LilyPond: Da capo al fine und Dynamikzeichen', () => {
  const ly = '\\relative c\' { \\time 2/4 c4\\< d\\! e2^"Fine" \\bar "||" g4 g g2^"D.C. al fine" } \\addlyrics { a b c d e f }';
  const sc = parseLily(ly)!;
  assert.deepEqual(
    sc.notes.map((n) => n.midi),
    [60, 62, 64, 67, 67, 67, 60, 62, 64],
  );
});
