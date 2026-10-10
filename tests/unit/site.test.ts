import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderSite, sitemap, type BuildEnv, type Page } from '../../src/site/pages.ts';
import { chordSlug, routePath } from '../../src/site/routes.ts';
import type { SiteId } from '../../src/site/sites.ts';
import { ogImagePng, OG_HEIGHT, OG_WIDTH } from '../../src/site/og-image.ts';
import { ICON_SIZES, iconColor, iconPng, iconSvg, renderIcon } from '../../src/site/app-icon.ts';

const SITES: SiteId[] = ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline', 'start'];
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

// Früher nur in der Fußzeile; dazu kommen jetzt kleine Hinweise bei echten Verwandten (Test „Verwechslungshinweise“)
test('Instrument-Seiten verlinken sich gegenseitig in der Fußzeile', () => {
  const home = rendered.ukulele.filter((p) => p.file === 'index.html')[0];
  const foot = home.html.slice(home.html.indexOf('<footer'));
  assert.ok(foot.indexOf('href="/gitarre/"') >= 0);
  assert.ok(foot.indexOf('href="/banjo/"') >= 0);
  assert.ok(foot.indexOf('href="/bariton/"') >= 0);
  assert.ok(foot.indexOf('href="/mandoline/"') >= 0);
  assert.ok(home.html.indexOf('data-instrument="ukulele"') >= 0);
  const start = rendered.start.filter((p) => p.file === 'index.html')[0];
  for (const s of ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline']) assert.ok(start.html.indexOf(`href="/${s}/"`) >= 0, s);
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
      const bad = /\b(le|au|du|mon|ton|son) guitare\b|\bauf (Ukulele|Gitarre|Banjo|Bariton-Ukulele|Mandoline)\b|\brund um (Ukulele|Gitarre|Banjo|Bariton-Ukulele|Mandoline)\b/i.exec(p.html);
      assert.equal(bad && bad[0], null, `${s}/${p.file}`);
    }
  assert.ok(page('gitarre', 'fr/index.html').html.indexOf('<title>Apprendre la guitare gratuitement') >= 0);
  assert.ok(page('banjo', 'wissen/index.html').html.indexOf('rund ums Banjo') >= 0);
  assert.ok(page('bariton', 'wissen/index.html').html.indexOf('rund um die Bariton-Ukulele') >= 0);
  assert.ok(page('bariton', 'akkorde/g/index.html').html.indexOf('auf der Bariton-Ukulele') >= 0);
  assert.ok(page('mandoline', 'wissen/index.html').html.indexOf('rund um die Mandoline') >= 0);
  assert.ok(page('mandoline', 'akkorde/g/index.html').html.indexOf('auf der Mandoline') >= 0);
});

test('Querverweise: Lied → weitere Lieder, Akkord → Wissen, Werkzeug → Wissen', () => {
  const song = page('ukulele', 'lieder/alle-meine-entchen/index.html').html;
  assert.ok(song.indexOf('href="/ukulele/lieder/haenschen-klein/"') >= 0, 'weitere Kinderlieder fehlen');
  assert.ok(/href="\/ukulele\/wissen\/[a-z-]+\/"/.test(page('ukulele', 'akkorde/c/index.html').html), 'Akkordseite ohne Wissensartikel');
  assert.ok(page('ukulele', 'stimmgeraet/index.html').html.indexOf('href="/ukulele/wissen/ukulele-stimmen/"') >= 0, 'Stimmgerät ohne Anleitung');
  assert.ok(page('ukulele', 'sterne/index.html').html.indexOf('<meta name="robots" content="noindex">') >= 0, 'Sterne sind persönlich');
});

test('Vorschaubild: PNG in 1200 × 630', () => {
  for (const id of ['banjo', 'bariton', 'mandoline']) {
    const png = ogImagePng(id);
    assert.deepEqual(Array.from(png.slice(0, 8)), [137, 80, 78, 71, 13, 10, 26, 10]);
    const v = new DataView(png.buffer, png.byteOffset);
    assert.equal(v.getUint32(16), OG_WIDTH);
    assert.equal(v.getUint32(20), OG_HEIGHT);
    assert.ok(png.length < 600 * 1024, `${id}: ${png.length} Bytes`);
  }
});

test('App-Symbole: je Seite ein eigenes, gültiges PNG in jeder Größe und ein SVG', () => {
  const seen: Record<string, string> = {};
  for (const id of SITES) {
    for (const size of ICON_SIZES) {
      const png = iconPng(id, size);
      assert.deepEqual(Array.from(png.slice(0, 8)), [137, 80, 78, 71, 13, 10, 26, 10], `${id} ${size}`);
      const v = new DataView(png.buffer, png.byteOffset);
      assert.equal(v.getUint32(16), size);
      assert.equal(v.getUint32(20), size);
    }
    const key = Array.from(renderIcon(id, 48)).join(',');
    assert.ok(!seen[key], `${id} sieht aus wie ${seen[key]}`);
    seen[key] = id;
    const svg = iconSvg(id);
    assert.match(svg, /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 512 512">/);
    assert.ok(svg.trim().endsWith('</svg>'));
    assert.match(iconColor(id), /^#[0-9a-f]{6}$/);
  }
  const home = page('gitarre', 'index.html').html;
  assert.ok(home.indexOf('<link rel="icon" href="/gitarre/icon.svg" type="image/svg+xml">') >= 0);
  assert.ok(home.indexOf('<link rel="apple-touch-icon" href="/gitarre/icon-180.png">') >= 0);
});

test('Verwechslungshinweise: nur echte Verwandte, auf dieselbe Seite beim Verwandten', () => {
  const uke = page('ukulele', 'akkorde/c/index.html').html;
  assert.ok(uke.indexOf('class="card relative-hint"><a href="/bariton/akkorde/c/"') >= 0, 'Ukulele → Bariton fehlt');
  assert.ok(page('ukulele', 'en/chords/f-sharp-m/index.html').html.indexOf('href="/bariton/en/chords/f-sharp-m/"') >= 0);
  const bari = page('bariton', 'akkorde/g-7/index.html').html;
  assert.ok(bari.indexOf('href="/ukulele/akkorde/g-7/"') >= 0 && bari.indexOf('href="/gitarre/akkorde/g-7/"') >= 0);
  assert.ok(page('gitarre', 'akkorde/a-m/index.html').html.indexOf('relative-hint"><a href="/bariton/akkorde/a-m/"') >= 0);
  assert.ok(page('ukulele', 'stimmgeraet/index.html').html.indexOf('relative-hint"><a href="/bariton/stimmgeraet/"') >= 0);
  // keine Verwandten in der App (Mandoline, Banjo); Powerchords gibt es bei der Bariton-Ukulele nicht
  for (const f of ['akkorde/c/index.html', 'stimmgeraet/index.html']) {
    assert.ok(page('mandoline', f).html.indexOf('relative-hint') < 0, `mandoline/${f}`);
    assert.ok(page('banjo', f).html.indexOf('relative-hint"><a href="/') < 0, `banjo/${f}`);
  }
  assert.ok(page('gitarre', 'akkorde/e-5/index.html').html.indexOf('relative-hint"><a href="/bariton/') < 0);
  // ein Verwandter ohne eigene Seite (E-Bass, solange es ihn nicht gibt) erzeugt keinen Link
  assert.ok(page('gitarre', 'stimmgeraet/index.html').html.indexOf('E-Bass?') < 0);
  const withBass = renderSite('gitarre', { ...env, sites: ['gitarre', 'bass' as SiteId] }).filter((p) => p.file === 'stimmgeraet/index.html')[0];
  assert.ok(withBass.html.indexOf('relative-hint"><a href="/bass/stimmgeraet/">E-Bass?') >= 0, 'Bass-Hinweis, sobald es die Seite gibt');
});

test('Powerchords: nur auf der Gitarre, Übersicht und Akkordseiten, verlinkt mit dem Wissensartikel', () => {
  const overview = page('gitarre', 'powerchords/index.html');
  assert.ok(overview.url, 'Übersicht indexierbar');
  for (const n of ['e-5', 'a-5', 'd-5', 'g-5', 'c-5', 'f-sharp-5']) assert.ok(overview.html.indexOf(`href="/gitarre/akkorde/${n}/"`) >= 0, n);
  assert.ok(overview.html.indexOf('href="/gitarre/wissen/e-gitarre-powerchords-ziehen/"') >= 0);
  assert.ok(page('gitarre', 'wissen/e-gitarre-powerchords-ziehen/index.html').html.indexOf('href="/gitarre/powerchords/"') >= 0);
  assert.ok(page('gitarre', 'akkorde/index.html').html.indexOf('href="/gitarre/powerchords/"') >= 0);
  const e5 = page('gitarre', 'akkorde/e-5/index.html');
  assert.ok(e5.url && /<title>E5 \(E-Powerchord\)/.test(e5.html), 'Titel E5');
  assert.ok(page('gitarre', 'en/power-chords/index.html'));
  for (const s of ['ukulele', 'banjo', 'bariton', 'mandoline']) {
    assert.equal(page(s, 'powerchords/index.html'), undefined, s);
    assert.equal(page(s, 'akkorde/e-5/index.html'), undefined, s);
  }
});

test('Seiten je Stimmung: Griffe in der Stimmung, Sitemap, Brotkrümel, verlinkt vom Stimmgerät und vom Artikel', () => {
  const og = page('gitarre', 'stimmung/open-g/index.html');
  assert.equal(og.url, 'https://gitarre.example.org/stimmung/open-g/');
  assert.equal(og.alternates.en, 'https://gitarre.example.org/en/tuning/open-g/');
  assert.equal(og.alternates.fr, 'https://gitarre.example.org/fr/accordage/open-g/');
  assert.ok(sitemap(rendered.gitarre).indexOf('<loc>https://gitarre.example.org/stimmung/drop-d/</loc>') >= 0);
  // Griffe der Stimmung: Dur-Akkorde als Barré, Saitennamen der Stimmung
  assert.ok(og.html.indexOf('class="barre') >= 0, 'Barré-Griffe');
  assert.ok(/>d<\/text>/.test(og.html), 'Saitennamen der Stimmung');
  const crumbs = jsonLd(og.html).filter((x) => x['@type'] === 'BreadcrumbList')[0] as { itemListElement: { item: string }[] };
  assert.deepEqual(
    crumbs.itemListElement.map((x) => x.item),
    ['https://gitarre.example.org/', 'https://gitarre.example.org/stimmgeraet/', 'https://gitarre.example.org/stimmung/open-g/'],
  );
  const tuner = page('gitarre', 'stimmgeraet/index.html').html;
  for (const id of ['drop-d', 'open-g', 'open-d', 'open-e', 'dadgad']) assert.ok(tuner.indexOf(`href="/gitarre/stimmung/${id}/"`) >= 0, id);
  assert.ok(page('gitarre', 'wissen/open-g-stimmung-gitarre/index.html').html.indexOf('href="/gitarre/stimmung/open-g/"') >= 0);
  assert.ok(page('banjo', 'stimmung/double-c/index.html').url);
  assert.ok(page('ukulele', 'stimmung/d/index.html').url);
  // tiefes G ändert keine Griffe: keine eigene Seite
  assert.equal(page('ukulele', 'stimmung/tiefes-g/index.html'), undefined);
  assert.ok(page('ukulele', 'fr/accordage/d/index.html').html.indexOf('Accords avec l’accordage en D') >= 0);
  // danach gilt wieder die Normalstimmung
  assert.ok(!/>d<\/text>/.test(page('gitarre', 'akkorde/g/index.html').html), 'Normalstimmung auf den Akkordseiten');
});
