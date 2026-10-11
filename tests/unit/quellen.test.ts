import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SONGS } from '../../src/music/songs.ts';
import { MELODIES } from '../../src/music/songs-melodies.ts';
import { QUELLEN_FILE, sourceRows, sourcesMarkdown } from '../../tools/quellen.ts';

const OWN = /^Eigenes Lied für diese App, frei verwendbar \(CC0\)$/;
const LIFESPAN = /\d{4}–\d{4}/;
const TRADITIONAL = /traditionell|volkstümlich|Volkslied|Volksweise|anonym|Lebensdaten unbekannt/i;

test('jedes Lied nennt Urheber mit Lebensdaten (oder traditionell/anonym) und eine Textquelle', () => {
  for (const s of SONGS) {
    if (OWN.test(s.origin)) continue;
    assert.ok(LIFESPAN.test(s.origin) || TRADITIONAL.test(s.origin), `${s.id}: Lebensdaten oder „traditionell“ fehlen in „${s.origin}“`);
    assert.ok(/\bnach\b/.test(s.origin.split('; ').slice(1).join('; ')), `${s.id}: Textquelle („… nach …“) fehlt in „${s.origin}“`);
  }
});

test('Lebensdaten sind plausibel (gestorben vor mehr als 70 Jahren)', () => {
  const limit = new Date().getFullYear() - 70;
  for (const s of SONGS) {
    const re = /(\d{4})–(\d{4})/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(s.origin))) {
      const born = Number(m[1]);
      const died = Number(m[2]);
      assert.ok(born < died && died - born < 110, `${s.id}: ${m[0]}`);
      assert.ok(died < limit, `${s.id}: ${m[0]} – noch nicht gemeinfrei`);
    }
  }
});

test('Melodien aus Notenbeispielen: Notation mit Lizenz und Link auf die verwendete Fassung', () => {
  for (const id of Object.keys(MELODIES)) {
    const m = MELODIES[id];
    const s = SONGS.find((x) => x.id === id);
    assert.ok(s, id);
    if (!/Wikipedia|Wikisource/.test(m.source)) continue;
    assert.match(m.source, /^Melodie gemeinfrei, Notation nach .*CC BY-SA 4\.0/, id);
    assert.match(m.url, /^https:\/\/[a-z]+\.wiki(pedia|source)\.org\/w\/index\.php\?title=.+&oldid=\d+$/, id);
    assert.equal(s!.melodyUrl, m.url, id);
    assert.ok(s!.origin.indexOf('CC BY-SA 4.0') > 0, id);
  }
});

test('Quellenadressen sind vollständige https-Adressen', () => {
  for (const s of SONGS) {
    if (s.textUrl) assert.match(s.textUrl, /^https:\/\/[^\s]+$/, s.id);
    if (s.melodyUrl) assert.match(s.melodyUrl, /^https:\/\/[^\s]+$/, s.id);
  }
  for (const r of sourceRows()) assert.ok(r.freeSince, r.id);
});

test('docs/quellen.md ist aktuell (sonst: node tools/quellen.ts)', () => {
  assert.equal(readFileSync(QUELLEN_FILE, 'utf8').replace(/\r\n/g, '\n'), sourcesMarkdown(), 'docs/quellen.md neu erzeugen: node tools/quellen.ts');
});
