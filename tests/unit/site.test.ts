import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderSite, sitemap, type BuildEnv, type Page } from '../../src/site/pages.ts';
import { chordSlug, routePath } from '../../src/site/routes.ts';
import type { SiteId } from '../../src/site/sites.ts';

const SITES: SiteId[] = ['ukulele', 'gitarre', 'banjo', 'start'];
const env: BuildEnv = {
  url: (s) => `/${s}/`,
  publicUrl: (s) => `https://${s}.example.org/`,
  preview: false,
  assets: { js: 'assets/app.js', css: 'assets/app.css' },
  sites: SITES,
};
const rendered: Record<string, Page[]> = {};
for (const s of SITES) rendered[s] = renderSite(s, env);

test('Akkord-Pfade: lesbar und ohne Sonderzeichen', () => {
  assert.equal(chordSlug('C'), 'c');
  assert.equal(chordSlug('F#m'), 'f-sharp-m');
  assert.equal(chordSlug('Bb7'), 'b-flat-7');
  assert.equal(chordSlug('Gb'), 'f-sharp');
  assert.equal(routePath('lied/mein-lied', 'en', (id) => id.indexOf('mein-') === 0), 'en/songs/eigen/#mein-lied');
  assert.equal(routePath('teilen/abc', 'fr', () => false), 'fr/chanson-partagee/#abc');
});

test('jeder interne Link führt auf eine erzeugte Seite (alle Instrumente, alle Sprachen)', () => {
  const files: Record<string, boolean> = {};
  for (const s of SITES) for (const p of rendered[s]) files[`/${s}/${p.file}`] = true;
  const broken: string[] = [];
  for (const s of SITES)
    for (const p of rendered[s]) {
      const re = /href="(\/[^"#]*)(#[^"]*)?"/g;
      let m: RegExpExecArray | null;
      while ((m = re.exec(p.html))) {
        const href = m[1];
        if (/\.(css|js|svg|png|webmanifest)$/.test(href)) continue;
        if (!files[href.endsWith('/') ? href + 'index.html' : href]) broken.push(`${s}/${p.file} → ${href}`);
      }
    }
  assert.deepEqual(broken.slice(0, 10), []);
});

test('indexierbare Seiten: canonical, drei Sprachfassungen, eindeutiger Titel und knappe Beschreibung', () => {
  for (const s of SITES) {
    const titles: Record<string, string> = {};
    for (const p of rendered[s]) {
      if (!p.url) {
        assert.ok(p.html.indexOf('<meta name="robots" content="noindex">') >= 0, `${s}/${p.file} ohne noindex`);
        continue;
      }
      assert.ok(p.html.indexOf(`<link rel="canonical" href="${p.url}">`) >= 0, `${s}/${p.file}: canonical`);
      for (const l of ['de', 'en', 'fr', 'x-default']) assert.ok(p.html.indexOf(`hreflang="${l}"`) >= 0, `${s}/${p.file}: hreflang ${l}`);
      const title = /<title>([^<]*)<\/title>/.exec(p.html)![1];
      assert.ok(!titles[title], `doppelter Titel „${title}“: ${titles[title]} und ${p.file}`);
      titles[title] = p.file;
      const desc = /<meta name="description" content="([^"]*)">/.exec(p.html)![1];
      assert.ok(desc.length >= 40 && desc.length <= 260, `${s}/${p.file}: Beschreibung ${desc.length} Zeichen`);
    }
  }
});

test('Sitemap enthält jede indexierbare Seite mit ihren Sprachfassungen', () => {
  const pages = rendered.ukulele;
  const xml = sitemap(pages);
  const count = (xml.match(/<url>/g) || []).length;
  assert.equal(count, pages.filter((p) => p.url).length);
  assert.ok(xml.indexOf('<loc>https://ukulele.example.org/en/chords/f-sharp-m/</loc>') >= 0);
  assert.ok(xml.indexOf('hreflang="fr" href="https://ukulele.example.org/fr/accords/f-sharp-m/"') >= 0);
});

test('Lied- und Akkordseiten enthalten ihren Inhalt schon ohne Skript', () => {
  const song = rendered.ukulele.filter((p) => p.file === 'lieder/alle-meine-entchen/index.html')[0];
  assert.ok(song.html.indexOf('<h1>Alle meine Entchen</h1>') >= 0);
  assert.ok(/class="syl-text">Ent</.test(song.html), 'Liedtext fehlt');
  const ch = rendered.ukulele.filter((p) => p.file === 'akkorde/f-sharp-m/index.html')[0];
  assert.ok(ch.html.indexOf('Fis-Moll') >= 0);
  assert.ok(ch.html.indexOf('class="chord-svg"') >= 0);
  const en = rendered.ukulele.filter((p) => p.file === 'en/chords/b-flat/index.html')[0];
  assert.ok(en.html.indexOf('B flat major') >= 0);
});

test('Instrument-Seiten verlinken sich gegenseitig nur unauffällig in der Fußzeile', () => {
  const home = rendered.ukulele.filter((p) => p.file === 'index.html')[0];
  const foot = home.html.slice(home.html.indexOf('<footer'));
  assert.ok(foot.indexOf('href="/gitarre/"') >= 0);
  assert.ok(foot.indexOf('href="/banjo/"') >= 0);
  assert.ok(home.html.indexOf('data-instrument="ukulele"') >= 0);
  const start = rendered.start.filter((p) => p.file === 'index.html')[0];
  for (const s of ['ukulele', 'gitarre', 'banjo']) assert.ok(start.html.indexOf(`href="/${s}/"`) >= 0, s);
});
