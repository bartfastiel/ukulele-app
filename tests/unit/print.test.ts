import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SONGS } from '../../src/music/songs.ts';
import { parseSong } from '../../src/music/song.ts';
import { sheetChords, sheetLines } from '../../src/music/sheet.ts';
import { installDom, serialize } from '../../src/site/vdom.ts';
import { setInstrument } from '../../src/music/instrument.ts';
import { chord } from '../../src/music/chords.ts';
import { chordDiagram, printDiagram } from '../../src/ui/chord-diagram.ts';
import { neckChart } from '../../src/ui/neck-chart.ts';
import { routePath } from '../../src/site/routes.ts';

const text = (line: { space: boolean; word: string; rest: string }[]) => line.map((p) => (p.space ? ' ' : '') + p.word + p.rest).join('');

test('Liedblatt: jeder Akkordwechsel steht an seiner Silbe, der Text bleibt vollständig', () => {
  const song = parseSong({
    id: 't',
    title: 'T',
    category: 'eigene',
    origin: '',
    meter: 4,
    bpm: 90,
    chordpro: '[C]Im Märzen der [G7]Bauer die Rösslein ein[C]spannt\n[F]Er setzt seine Felder',
  });
  const lines = sheetLines(song);
  assert.equal(lines.length, 2);
  assert.equal(text(lines[0]), 'Im Märzen der Bauer die Rösslein einspannt');
  assert.deepEqual(
    lines[0].map((p) => [p.chord, p.word]),
    [
      ['C', 'Im'],
      ['G7', 'Bauer'],
      ['C', 'spannt'],
    ],
  );
  // Wechsel mitten im Wort: kein Leerzeichen davor
  assert.equal(lines[0][2].space, false);
  assert.equal(lines[0][1].space, true);
  assert.deepEqual(sheetChords(song), ['C', 'G7', 'F']);
});

test('Liedblatt: alle Lieder ergeben Zeilen mit Text und dem ersten Akkord am Anfang', () => {
  for (const s of SONGS) {
    const lines = sheetLines(s);
    assert.ok(lines.length > 0, s.id);
    assert.equal(lines[0][0].chord, s.events[0].chord, s.id);
    const changes = lines.reduce((n, l) => n + l.filter((p) => p.chord).length, 0);
    assert.ok(changes >= s.chords.length, `${s.id}: ${changes} Wechsel`);
    for (const l of lines) assert.ok(!/  /.test(text(l)), `${s.id}: doppeltes Leerzeichen in „${text(l)}“`);
  }
});

test('Druck-Griffbild: schwarz auf weiß, ohne Verläufe, Fingerzahlen nur auf Wunsch', () => {
  installDom();
  setInstrument('gitarre');
  const svg = serialize(printDiagram(chord('F'), { fingers: true }));
  assert.ok(svg.indexOf('Gradient') < 0);
  assert.ok(svg.indexOf('class="barre"') >= 0);
  assert.ok(svg.indexOf('class="pd-finger"') >= 0);
  assert.ok(serialize(chordDiagram(chord('C'), { print: true })).indexOf('pd-finger') < 0);
  // am Bildschirm Fingerpunkte in der Akzentfarbe, gedruckt nur Schwarz
  assert.ok(serialize(chordDiagram(chord('C'))).indexOf('#0A7C6E') >= 0);
  assert.ok(svg.indexOf('#0A7C6E') < 0);
  setInstrument('ukulele');
});

test('Hals: Tonname in jedem Bund, die kurze Banjo-Saite erst ab dem 5. Bund', () => {
  installDom();
  const svg = serialize(neckChart([{ name: 'g', midi: 67, start: 5 }, { name: 'D', midi: 50 }], { frets: 15, inlays: [5, 12] }));
  // D-Saite: 16 Töne, kurze g-Saite: leer und Bund 6 bis 15
  const notes = (svg.match(/class="neck-(note|sharp)"/g) || []).length;
  const sharps = (svg.match(/class="neck-sharp"/g) || []).length;
  assert.equal(notes - sharps / 2, 16 + 11);
});

test('Druckseiten: Adressen je Sprache, eigene Lieder hinter dem „#“', () => {
  assert.equal(routePath('liedblatt/stille-nacht', 'de', () => false), 'liedblatt/stille-nacht/');
  assert.equal(routePath('liedblatt/mein-lied', 'en', () => true), 'en/song-sheet/eigen/#mein-lied');
  assert.equal(routePath('hals', 'fr', () => false), 'fr/manche/');
  assert.equal(routePath('griffe-drucken', 'de', () => false), 'griffe-drucken/');
});
