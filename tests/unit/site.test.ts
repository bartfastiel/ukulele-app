import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderSite, sitemap, type BuildEnv, type Page } from '../../src/site/pages.ts';
import { chordSlug, routePath } from '../../src/site/routes.ts';
import type { SiteId } from '../../src/site/sites.ts';
import { ogImagePng, OG_HEIGHT, OG_WIDTH } from '../../src/site/og-image.ts';

const SITES: SiteId[] = ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline', 'bass', 'start'];
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
        // nicht in der Sitemap: entweder noindex oder Kopie eines Artikels, dessen Original auf einer anderen Instrument-Seite steht
        const elsewhere = /<link rel="canonical" href="https:\/\/([a-z]+)\./.exec(p.html);
        assert.ok(p.html.indexOf('<meta name="robots" content="noindex">') >= 0 || (elsewhere && elsewhere[1] !== s), `${s}/${p.file} ohne noindex`);
        if (elsewhere) assert.ok(p.html.indexOf('<link rel="alternate" hreflang') < 0, `${s}/${p.file}: hreflang auf einer Kopie`);
        continue;
      }
      assert.equal((p.html.match(/<h1[ >]/g) || []).length, 1, `${s}/${p.file}: genau eine h1`);
      assert.ok(p.html.indexOf(`<link rel="canonical" href="${p.url}">`) >= 0, `${s}/${p.file}: canonical`);
      for (const l of ['de', 'en', 'fr', 'x-default']) assert.ok(p.html.indexOf(`hreflang="${l}"`) >= 0, `${s}/${p.file}: hreflang ${l}`);
      const title = /<title>([^<]*)<\/title>/.exec(p.html)![1];
      assert.ok(!titles[title], `doppelter Titel „${title}“: ${titles[title]} und ${p.file}`);
      assert.ok(title.charAt(0) === title.charAt(0).toUpperCase(), `${s}/${p.file}: Titel beginnt klein: ${title}`);
      assert.ok(title.length <= 80, `${s}/${p.file}: Titel ${title.length} Zeichen`);
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
  assert.ok(ch.html.indexOf('class="chord-svg') >= 0);
  const guitar = renderSite('gitarre', env).filter((p) => p.file === 'akkorde/c/index.html')[0];
  assert.ok(guitar.html.indexOf('strings-6') >= 0, 'Gitarrenseite zeigt kein 6-saitiges Griffbild');
  const en = rendered.ukulele.filter((p) => p.file === 'en/chords/b-flat/index.html')[0];
  assert.ok(en.html.indexOf('B flat major') >= 0);
});

test('Instrument-Seiten verlinken sich gegenseitig nur unauffällig in der Fußzeile', () => {
  const home = rendered.ukulele.filter((p) => p.file === 'index.html')[0];
  const foot = home.html.slice(home.html.indexOf('<footer'));
  assert.ok(foot.indexOf('href="/gitarre/"') >= 0);
  assert.ok(foot.indexOf('href="/banjo/"') >= 0);
  assert.ok(foot.indexOf('href="/bariton/"') >= 0);
  assert.ok(foot.indexOf('href="/mandoline/"') >= 0);
  assert.ok(foot.indexOf('href="/bass/"') >= 0);
  assert.ok(home.html.indexOf('data-instrument="ukulele"') >= 0);
  const start = rendered.start.filter((p) => p.file === 'index.html')[0];
  for (const s of ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline', 'bass']) assert.ok(start.html.indexOf(`href="/${s}/"`) >= 0, s);
});

const page = (site: string, file: string) => rendered[site].filter((p) => p.file === file)[0];

function jsonLd(html: string): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  const re = /<script type="application\/ld\+json">(.*?)<\/script>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) out.push(JSON.parse(m[1]) as Record<string, unknown>);
  return out;
}

test('Vorschaubild, Social-Tags und gültige strukturierte Daten auf jeder indexierbaren Seite', () => {
  for (const s of SITES)
    for (const p of rendered[s]) {
      if (!p.url) continue;
      assert.ok(p.html.indexOf(`<meta property="og:image" content="https://${s}.example.org/og-image.png">`) >= 0, `${s}/${p.file}: og:image`);
      assert.ok(p.html.indexOf('<meta name="twitter:card" content="summary_large_image">') >= 0, `${s}/${p.file}: twitter:card`);
      for (const ld of jsonLd(p.html)) {
        assert.equal(ld['@context'], 'https://schema.org', `${s}/${p.file}`);
        assert.ok(typeof ld['@type'] === 'string', `${s}/${p.file}: @type`);
      }
    }
  const crumbs = jsonLd(page('ukulele', 'lieder/alle-meine-entchen/index.html').html).filter((x) => x['@type'] === 'BreadcrumbList')[0] as {
    itemListElement: { position: number; name: string; item: string }[];
  };
  assert.deepEqual(
    crumbs.itemListElement.map((x) => [x.position, x.name, x.item]),
    [
      [1, 'Ukulele-Club', 'https://ukulele.example.org/'],
      [2, 'Lieder', 'https://ukulele.example.org/lieder/'],
      [3, 'Alle meine Entchen', 'https://ukulele.example.org/lieder/alle-meine-entchen/'],
    ],
  );
  const article = jsonLd(page('ukulele', 'wissen/ukulele-stimmen/index.html').html).filter((x) => x['@type'] === 'Article')[0];
  assert.match(String(article.datePublished), /^\d{4}-\d\d-\d\d$/);
});

test('Sitemaps: x-default, jede Adresse nur einmal über alle Instrument-Seiten', () => {
  const seen: Record<string, string> = {};
  for (const s of SITES) {
    const xml = sitemap(rendered[s]);
    assert.ok(xml.indexOf(`<xhtml:link rel="alternate" hreflang="x-default" href="https://${s}.example.org/"/>`) >= 0, `${s}: x-default`);
    for (const m of xml.match(/<loc>[^<]*<\/loc>/g) || []) {
      assert.ok(!seen[m], `${m} doppelt (${seen[m]}, ${s})`);
      seen[m] = s;
    }
  }
  // gemeinsamer Artikel: Original auf der Ukulele-Seite, die anderen Seiten verweisen dorthin
  const copy = page('banjo', 'wissen/dur-und-moll/index.html');
  assert.equal(copy.url, undefined);
  assert.ok(copy.html.indexOf('<link rel="canonical" href="https://ukulele.example.org/wissen/dur-und-moll/">') >= 0);
  assert.ok(copy.html.indexOf('<meta name="robots"') < 0);
});

test('Titel und Texte: Artikel vor Instrumentnamen, wo die Sprache einen braucht', () => {
  for (const s of SITES)
    for (const p of rendered[s]) {
      const bad = /\b(le|au|du|mon|ton|son) (guitare|basse électrique)|\bauf (Ukulele|Gitarre|Banjo|Bariton-Ukulele|Mandoline|E-Bass)\b|\brund um (Ukulele|Gitarre|Banjo|Bariton-Ukulele|Mandoline|E-Bass)\b/i.exec(p.html);
      assert.equal(bad && bad[0], null, `${s}/${p.file}`);
    }
  assert.ok(page('gitarre', 'fr/index.html').html.indexOf('<title>Apprendre la guitare gratuitement') >= 0);
  assert.ok(page('banjo', 'wissen/index.html').html.indexOf('rund ums Banjo') >= 0);
  assert.ok(page('bariton', 'wissen/index.html').html.indexOf('rund um die Bariton-Ukulele') >= 0);
  assert.ok(page('bariton', 'akkorde/g/index.html').html.indexOf('auf der Bariton-Ukulele') >= 0);
  assert.ok(page('mandoline', 'wissen/index.html').html.indexOf('rund um die Mandoline') >= 0);
  assert.ok(page('mandoline', 'akkorde/g/index.html').html.indexOf('auf der Mandoline') >= 0);
  assert.ok(page('bass', 'wissen/index.html').html.indexOf('rund um den E-Bass') >= 0);
  assert.ok(page('bass', 'ton-detektiv/index.html').html.indexOf('auf dem E-Bass') >= 0);
  assert.ok(page('bass', 'fr/index.html').html.indexOf('<title>Apprendre la basse électrique gratuitement') >= 0);
});

test('E-Bass: Töne statt Akkorde – eigene Pfade, nur zwölf Tonseiten, keine Akkord- und Aufnahmeseiten', () => {
  const files = rendered.bass.map((p) => p.file);
  const notes = files.filter((f) => /^toene\/[a-z-]+\/index\.html$/.test(f));
  assert.equal(notes.length, 12);
  for (const f of ['toene/index.html', 'toene/c-sharp/index.html', 'en/notes/b-flat/index.html', 'fr/notes/c/index.html', 'ton-spiel/index.html', 'en/note-detective/index.html'])
    assert.ok(files.indexOf(f) >= 0, f);
  assert.ok(!files.some((f) => /^(akkorde|aufnahmen|akkord-spiel|akkord-detektiv)\//.test(f)), 'Akkordseiten auf der Bass-Seite');
  const song = page('bass', 'lieder/alle-meine-entchen/index.html').html;
  // Akkordnamen bleiben, Links und Tabulatur führen zum Grundton
  assert.ok(song.indexOf('href="/bass/toene/f/"') >= 0, 'Link auf den Grundton fehlt');
  assert.ok(/class="bass-root">Grundton [CFG]</.test(song), 'Grundton im Lied fehlt');
  assert.ok(/class="syl-tab s\d">[EADG]\d/.test(song), 'Bass-Tabulatur fehlt');
  const c = page('bass', 'fr/notes/c/index.html').html;
  assert.ok(c.indexOf('<title>Do sur la basse électrique') >= 0);
  assert.ok(c.indexOf('class="fifth"') >= 0, 'Quinte im Griffbild fehlt');
});

test('Querverweise: Lied → weitere Lieder, Akkord → Wissen, Werkzeug → Wissen', () => {
  const song = page('ukulele', 'lieder/alle-meine-entchen/index.html').html;
  assert.ok(song.indexOf('href="/ukulele/lieder/haenschen-klein/"') >= 0, 'weitere Kinderlieder fehlen');
  assert.ok(/href="\/ukulele\/wissen\/[a-z-]+\/"/.test(page('ukulele', 'akkorde/c/index.html').html), 'Akkordseite ohne Wissensartikel');
  assert.ok(page('ukulele', 'stimmgeraet/index.html').html.indexOf('href="/ukulele/wissen/ukulele-stimmen/"') >= 0, 'Stimmgerät ohne Anleitung');
  assert.ok(page('ukulele', 'sterne/index.html').html.indexOf('<meta name="robots" content="noindex">') >= 0, 'Sterne sind persönlich');
});

test('Vorschaubild: PNG in 1200 × 630', () => {
  for (const id of ['banjo', 'bariton', 'mandoline', 'bass']) {
    const png = ogImagePng(id);
    assert.deepEqual(Array.from(png.slice(0, 8)), [137, 80, 78, 71, 13, 10, 26, 10]);
    const v = new DataView(png.buffer, png.byteOffset);
    assert.equal(v.getUint32(16), OG_WIDTH);
    assert.equal(v.getUint32(20), OG_HEIGHT);
    assert.ok(png.length < 600 * 1024, `${id}: ${png.length} Bytes`);
  }
});
