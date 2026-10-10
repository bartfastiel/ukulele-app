// Baut dist/<seite>/ je Instrument-Seite (ukulele, gitarre, banjo, bariton) und die Startseite: ein gemeinsames, gehashtes
// Skript und Stylesheet, je Adresse und Sprache eine vorgerenderte HTML-Seite, Sitemap, robots.txt, Manifest,
// Vorschaubild (og-image.png) und Service Worker. `--serve` baut bei jeder Änderung neu und liefert dist/ auf
// http://localhost:5173 aus (Seiten unter /ukulele/, /gitarre/, …; vorgerendertes HTML nur beim Start, das Skript bei
// jeder Änderung).
//
// Umgebung:
//   SITE_URL    Adresse je Seite im Build, {site} wird ersetzt (Standard „/{site}/“; Produktion „https://{site}.<domain>/“,
//               Vorschau „/<pfad>/pr-<nr>/{site}/“)
//   PUBLIC_URL  öffentliche Adresse je Seite für canonical/hreflang/Sitemap (Standard https://{site}.wer-ist-daniel-schwarz.de/)
//   PREVIEW=1   nichts indexieren (Vorschauen, lokale Builds)
//   LEGAL_ADDRESS, LEGAL_EMAIL  Impressumsangaben (GitHub-Secrets, nie im Repo; Zeilen der Anschrift mit „|“ getrennt)
import { build, context } from 'esbuild';
import { createHash } from 'node:crypto';
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { serve } from './serve.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
// Alte iPads (iOS 12) und ältere Android-Browser sollen die App noch ausführen können.
const TARGET = ['es2017', 'safari12', 'chrome70', 'firefox68'];
const SITE_IDS = ['ukulele', 'gitarre', 'banjo', 'bariton', 'start'];
const SITE_URL = process.env.SITE_URL || '/{site}/';
const PUBLIC_URL = process.env.PUBLIC_URL || 'https://{site}.wer-ist-daniel-schwarz.de/';
const PREVIEW = process.env.PREVIEW === '1' || !process.env.PUBLIC_URL;

const options = {
  entryPoints: { app: join(root, 'src/main.ts'), style: join(root, 'src/styles.css') },
  bundle: true,
  minify: true,
  target: TARGET,
  write: false,
  outdir: join(dist, 'assets'),
  legalComments: 'none',
  logLevel: 'warning',
};

const url = (site) => SITE_URL.replace('{site}', site);
const publicUrl = (site) => PUBLIC_URL.replace('{site}', site);

function write(file, content) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

let rendered = null;

// Vorschaubilder ändern sich nur mit dem Code von og-image.ts; im Watch-Modus einmal rechnen genügt
const ogImages = {};
async function ogImage(instrument) {
  if (!ogImages[instrument]) {
    const { ogImagePng } = await import('../src/site/og-image.ts');
    ogImages[instrument] = ogImagePng(instrument);
  }
  return ogImages[instrument];
}

async function renderAll(assets) {
  const { renderSite, sitemap } = await import('../src/site/pages.ts');
  const { SITES } = await import('../src/site/sites.ts');
  const out = {};
  for (const id of SITE_IDS) {
    const lines = (process.env.LEGAL_ADDRESS || '').split('|').map((x) => x.trim()).filter(Boolean);
    const legal = { address: lines.join('\n'), email: (process.env.LEGAL_EMAIL || '').trim() };
    const pages = renderSite(id, { url, publicUrl, preview: PREVIEW, assets, sites: SITE_IDS, legal });
    out[id] = { pages, sitemap: sitemap(pages), def: SITES.filter((s) => s.id === id)[0] };
  }
  return out;
}

async function emit(result) {
  rmSync(dist, { recursive: true, force: true });
  const assets = {};
  const files = {};
  for (const file of result.outputFiles) {
    const hash = createHash('sha256').update(file.contents).digest('hex').slice(0, 10);
    const ext = file.path.endsWith('.css') ? 'css' : 'js';
    assets[ext] = `assets/app-${hash}.${ext}`;
    files[ext] = file.contents;
  }
  // Seiten nur einmal rendern, wenn die Namen der Bundles gleich bleiben (Watch-Modus)
  if (!rendered || rendered.js !== assets.js || rendered.css !== assets.css) rendered = { ...(await renderAll(assets)), js: assets.js, css: assets.css };
  let count = 0;
  for (const id of SITE_IDS) {
    const dir = join(dist, id);
    const r = rendered[id];
    cpSync(join(root, 'public'), dir, { recursive: true });
    write(join(dir, assets.js), files.js);
    write(join(dir, assets.css), files.css);
    for (const p of r.pages) write(join(dir, p.file), p.html);
    count += r.pages.length;
    const manifest = JSON.parse(readFileSync(join(root, 'public/manifest.webmanifest'), 'utf8'));
    manifest.name = r.def.brand.de;
    manifest.short_name = r.def.name.de;
    write(join(dir, 'manifest.webmanifest'), JSON.stringify(manifest, null, 2));
    write(join(dir, 'sitemap.xml'), r.sitemap);
    write(join(dir, 'og-image.png'), await ogImage(r.def.instrument || 'ukulele'));
    write(
      join(dir, 'robots.txt'),
      PREVIEW ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n\nSitemap: ${publicUrl(id)}sitemap.xml\n`,
    );
    const notFound = r.pages.filter((p) => p.file === 'index.html')[0];
    write(join(dir, '404.html'), notFound.html.replace('<head>', '<head>\n<meta name="robots" content="noindex">'));
    // Offline: Skript, Stil, Symbole und die Startseiten und Werkzeuge jeder Sprache vorab; alles andere beim Besuch
    const core = r.pages
      .map((p) => p.file)
      .filter((f) => /^((en|fr)\/)?([^/]+\/)?index\.html$/.test(f))
      .map((f) => f.replace(/index\.html$/, '') || './');
    const precache = ['./', ...core, assets.js, assets.css, 'manifest.webmanifest', 'icon.svg', 'icon-192.png'].filter((x, i, a) => a.indexOf(x) === i);
    const version = createHash('sha256').update(precache.join('|') + assets.js + assets.css + count).digest('hex').slice(0, 10);
    const sw = readFileSync(join(root, 'src/sw.js'), 'utf8').replace('__VERSION__', `${id}-${version}`).replace('__FILES__', JSON.stringify(precache));
    write(join(dir, 'sw.js'), sw);
  }
  // nur lokal: Übersicht der Seiten
  write(join(dist, 'index.html'), `<!doctype html><meta charset="utf-8"><title>dist</title><ul>${SITE_IDS.map((s) => `<li><a href="${s}/">${s}</a>`).join('')}</ul>`);
  const size = result.outputFiles.reduce((s, f) => s + f.contents.length, 0);
  console.log(`dist/ gebaut: ${SITE_IDS.join(', ')} – ${count} Seiten, ${assets.js}, ${assets.css} (${(size / 1024).toFixed(1)} KiB JS+CSS)`);
}

if (process.argv.includes('--serve')) {
  const ctx = await context({
    ...options,
    plugins: [{ name: 'emit', setup: (b) => b.onEnd((r) => (r.errors.length ? undefined : emit(r))) }],
  });
  await ctx.watch();
  serve(dist, 5173);
} else {
  await emit(await build(options));
}
