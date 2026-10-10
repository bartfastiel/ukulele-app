import { test } from 'node:test';
import assert from 'node:assert/strict';
import { installDom } from '../../src/site/vdom.ts';
import { chordDiagram } from '../../src/ui/chord-diagram.ts';
import { fretboard } from '../../src/ui/fretboard.ts';
import { chord } from '../../src/music/chords.ts';
import { setInstrument } from '../../src/music/instrument.ts';

installDom();

interface El {
  tagName: string;
  childNodes: El[];
  textContent: string;
  getAttribute(k: string): string | null;
}

function all(el: El, pred: (e: El) => boolean, out: El[] = []): El[] {
  if (pred(el)) out.push(el);
  for (const c of el.childNodes || []) if (c.tagName) all(c, pred, out);
  return out;
}

/** Saitennamen im Griffbild von links nach rechts. */
function labelsLeftToRight(svg: El): string[] {
  return all(svg, (e) => e.tagName === 'text' && e.getAttribute('class') === 'string-label')
    .sort((a, b) => Number(a.getAttribute('x')) - Number(b.getAttribute('x')))
    .map((e) => e.textContent);
}

/** Waagrechte Lage auf dem Bildschirm: x samt Spiegelung der Gruppe (matrix(-1 0 0 1 w 0)). */
function screenX(svg: El, el: El, x: number): number {
  const g = all(svg, (e) => e.tagName === 'g' && !!e.getAttribute('transform'))[0];
  if (!g || all(g, (e) => e === el).length === 0) return x;
  const w = Number(/matrix\(-1 0 0 1 ([\d.]+) 0\)/.exec(g.getAttribute('transform')!)![1]);
  return w - x;
}

test('Griffbild für Linkshänder: Saiten in umgekehrter Reihenfolge, Text bleibt Text', () => {
  try {
    for (const [id, right] of [
      ['ukulele', ['G', 'C', 'E', 'A']],
      ['gitarre', ['E', 'A', 'D', 'G', 'B', 'e']],
      ['banjo', ['g', 'D', 'G', 'B', 'D']],
    ] as [string, string[]][]) {
      setInstrument(id);
      const normal = chordDiagram(chord('C')) as unknown as El;
      const lefty = chordDiagram(chord('C'), { lefty: true }) as unknown as El;
      assert.deepEqual(labelsLeftToRight(normal), right, id);
      assert.deepEqual(labelsLeftToRight(lefty), right.slice().reverse(), id);
      // nichts wird per transform gespiegelt, also keine Spiegelschrift
      assert.equal(all(lefty, (e) => !!e.getAttribute('transform')).length, 0, id);
    }
  } finally {
    setInstrument('ukulele');
  }
});

test('Griffbild für Linkshänder: Finger sitzen auf der gespiegelten Saite', () => {
  // C auf der Ukulele: nur die A-Saite (rechts außen) ist gegriffen – für Linkshänder links außen
  const fingerX = (svg: El) => Number(all(svg, (e) => e.tagName === 'text' && e.getAttribute('class') === 'finger')[0].getAttribute('x'));
  const labelX = (svg: El, name: string) =>
    Number(all(svg, (e) => e.getAttribute('class') === 'string-label' && e.textContent === name)[0].getAttribute('x'));
  const normal = chordDiagram(chord('C')) as unknown as El;
  const lefty = chordDiagram(chord('C'), { lefty: true }) as unknown as El;
  assert.equal(fingerX(normal), labelX(normal, 'A'));
  assert.equal(fingerX(lefty), labelX(lefty, 'A'));
  assert.ok(fingerX(lefty) < fingerX(normal));
});

test('Hals (Blues) für Linkshänder: Sattel rechts, Saitennamen und Bundzahlen lesbar', () => {
  const normal = fretboard([{ string: 0, fret: 3, kind: 'now', label: '3' }]) as unknown as El;
  const lefty = fretboard([{ string: 0, fret: 3, kind: 'now', label: '3' }], 5, 1, undefined, true) as unknown as El;
  const width = Number(normal.getAttribute('viewBox')!.split(' ')[2]);
  const nutX = (svg: El) => {
    const nut = all(svg, (e) => e.getAttribute('class') === 'fb-nut')[0];
    return screenX(svg, nut, Number(nut.getAttribute('x')) + Number(nut.getAttribute('width')) / 2);
  };
  assert.ok(nutX(normal) < width / 2, 'rechtshändig: Sattel links');
  assert.ok(nutX(lefty) > width / 2, 'linkshändig: Sattel rechts');
  const markX = (svg: El) => {
    const m = all(svg, (e) => e.tagName === 'circle' && (e.getAttribute('class') || '').indexOf('fb-mark') === 0)[0];
    return screenX(svg, m, Number(m.getAttribute('cx')));
  };
  assert.equal(markX(lefty), width - markX(normal));
  // jede Schrift wird um ihren eigenen Ankerpunkt zurückgespiegelt, ist also insgesamt nur verschoben
  for (const t of all(lefty, (e) => e.tagName === 'text')) {
    const x = Number(t.getAttribute('x'));
    assert.equal(t.getAttribute('transform'), `matrix(-1 0 0 1 ${2 * x} 0)`, t.textContent);
  }
  assert.deepEqual(
    all(lefty, (e) => e.getAttribute('class') === 'fb-label').map((e) => e.textContent),
    all(normal, (e) => e.getAttribute('class') === 'fb-label').map((e) => e.textContent),
  );
  const labelAnchor = all(lefty, (e) => e.getAttribute('class') === 'fb-label')[0].getAttribute('text-anchor');
  assert.equal(labelAnchor, 'end', 'Saitennamen stehen rechtsbündig am rechten Rand');
});
