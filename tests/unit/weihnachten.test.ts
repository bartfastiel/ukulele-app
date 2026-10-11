import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isChristmasSeason } from '../../src/site/season.ts';
import { oneStringTab } from '../../src/music/one-string.ts';
import { SONGS } from '../../src/music/songs.ts';
import { STRINGS, stringMidi } from '../../src/music/notes.ts';
import { setInstrument } from '../../src/music/instrument.ts';
import { renderSite, type BuildEnv } from '../../src/site/pages.ts';

test('Weihnachtszeit: 1. November bis 6. Januar', () => {
  assert.equal(isChristmasSeason(new Date(2026, 9, 31)), false);
  assert.equal(isChristmasSeason(new Date(2026, 10, 1)), true);
  assert.equal(isChristmasSeason(new Date(2026, 11, 24)), true);
  assert.equal(isChristmasSeason(new Date(2027, 0, 6)), true);
  assert.equal(isChristmasSeason(new Date(2027, 0, 7)), false);
  assert.equal(isChristmasSeason(new Date(2027, 6, 15)), false);
});

test('Lieder auf einer Saite: jeder Ton liegt auf derselben Saite, Abstände wie in der Melodie', () => {
  for (const id of ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline', 'bass']) {
    setInstrument(id);
    let found = 0;
    for (const s of SONGS.filter((x) => x.category === 'weihnachten')) {
      const tab = oneStringTab(s, 9);
      if (!tab) continue;
      found++;
      assert.ok(!STRINGS[tab.string].start, `${id} ${s.id}: keine kurze Banjo-Saite`);
      const melody = s.events.filter((e) => e.midi !== null).map((e) => e.midi as number);
      const frets = tab.lines.reduce((a: number[], l) => a.concat(l.map((n) => n.fret)), []);
      assert.equal(frets.length, melody.length);
      const offset = stringMidi(tab.string, frets[0]) - melody[0];
      assert.equal(((offset - tab.shift) % 12 + 12) % 12, 0, `${id} ${s.id}: nur um ${tab.shift} Halbtöne verschoben`);
      frets.forEach((f, i) => {
        assert.ok(f >= 0 && f <= 9, `${id} ${s.id}: Bund ${f}`);
        assert.equal(stringMidi(tab.string, f) - melody[i], offset, `${id} ${s.id}: Ton ${i}`);
      });
    }
    assert.ok(found >= 3, `${id}: mindestens drei Weihnachtslieder auf einer Saite`);
  }
  setInstrument('ukulele');
});

test('Weihnachtsseite: alle Weihnachtslieder, leichteste zuerst; Startseiten vorgerendert ohne Datum', () => {
  const env: BuildEnv = {
    url: (s) => `/${s}/`,
    publicUrl: (s) => `https://${s}.example.org/`,
    preview: false,
    assets: { js: 'assets/app.js', css: 'assets/app.css' },
    sites: ['ukulele', 'start'],
  };
  const pages = renderSite('ukulele', env);
  const de = pages.filter((p) => p.file === 'weihnachtslieder/index.html')[0];
  assert.ok(de, 'Seite /weihnachtslieder/');
  assert.ok(pages.some((p) => p.file === 'en/christmas-songs/index.html'));
  assert.ok(pages.some((p) => p.file === 'fr/chants-de-noel/index.html'));
  const xmas = SONGS.filter((s) => s.category === 'weihnachten');
  for (const s of xmas) assert.ok(de.html.indexOf(`/ukulele/lieder/${s.id}/`) >= 0, s.id);
  assert.ok(de.html.indexOf('os-note') >= 0, 'Lieder auf einer Saite');
  assert.ok(de.html.indexOf('/ukulele/wissen/leichte-weihnachtslieder/') >= 0, 'Wissensartikel verlinkt');
  // die Liederliste verlinkt die Weihnachtsseite immer, die Startseite nie im vorgerenderten HTML
  const songs = pages.filter((p) => p.file === 'lieder/index.html')[0];
  assert.ok(songs.html.indexOf('/ukulele/weihnachtslieder/') >= 0);
  const home = pages.filter((p) => p.file === 'index.html')[0];
  assert.equal(home.html.indexOf('tile-season'), -1);
});
