import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderSite, type BuildEnv } from '../../src/site/pages.ts';
import type { SiteId } from '../../src/site/sites.ts';
import { encodeQr, qrPath } from '../../src/util/qr.ts';
import { shortUrl } from '../../src/views/teachers.ts';

const SITES: SiteId[] = ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline', 'bass', 'start'];
const env: BuildEnv = {
  url: (s) => `/vorschau/${s}/`,
  publicUrl: (s) => `https://${s}.example.org/`,
  preview: false,
  assets: { js: 'assets/app.js', css: 'assets/app.css' },
  sites: SITES,
};
const FILES = { de: 'lehrkraefte-und-eltern/index.html', en: 'en/teachers-and-parents/index.html', fr: 'fr/enseignants-et-parents/index.html' };

test('Seite für Lehrkräfte und Eltern: je Instrument und Sprache, mit Handout und QR-Code auf die öffentliche Adresse', () => {
  for (const s of SITES.filter((x) => x !== 'start')) {
    const pages = renderSite(s, env);
    for (const l of ['de', 'en', 'fr'] as const) {
      const page = pages.filter((p) => p.file === FILES[l])[0];
      assert.ok(page, `${s}: ${FILES[l]} fehlt`);
      assert.ok(page.url, `${s}/${FILES[l]}: nicht indexierbar`);
      const html = page.html;
      assert.ok(html.indexOf('data-route="lehrkraefte"') >= 0, 'Ansicht startet im Browser');
      assert.ok(html.indexOf(`data-public="https://${s}.example.org/"`) >= 0, 'öffentliche Adresse für die QR-Codes');
      assert.ok(html.indexOf('class="handout"') >= 0, `${s}/${l}: Handout fehlt`);
      // QR-Code zeigt auf die öffentliche Startseite der Sprache, nicht auf die Vorschau
      const home = `https://${s}.example.org/${l === 'de' ? '' : l + '/'}`;
      assert.ok(html.indexOf(qrPath(encodeQr(home, { ecl: 'M' })!)) >= 0, `${s}/${l}: QR-Code passt nicht zu ${home}`);
      assert.ok(html.indexOf(shortUrl(home).replace(/\./g, '.<wbr>').replace(/\//g, '/<wbr>')) >= 0, `${s}/${l}: Adresse zum Abtippen`);
      // Platz für die Lehrkraft, Linien statt leerer Felder
      assert.ok(html.indexOf('class="ho-line"') >= 0);
    }
    // gefunden wird sie über die Fußzeile jeder Seite
    const home = pages.filter((p) => p.file === 'index.html')[0];
    assert.ok(home.html.slice(home.html.indexOf('<footer')).indexOf(`href="/vorschau/${s}/lehrkraefte-und-eltern/"`) >= 0, `${s}: Fußzeile`);
  }
  const start = renderSite('start', env).filter((p) => p.file === 'index.html')[0];
  for (const s of SITES.filter((x) => x !== 'start')) assert.ok(start.html.indexOf(`href="/vorschau/${s}/lehrkraefte-und-eltern/"`) >= 0, `Startseite → ${s}`);
});

test('E-Bass: Übungsplan mit Tönen statt Griffwechseln', () => {
  const page = renderSite('bass', env).filter((p) => p.file === FILES.de)[0];
  assert.ok(page.html.indexOf('Töne finden im Ton-Spiel') >= 0);
  assert.ok(page.html.indexOf('Griffwechsel mit zwei Akkorden') < 0);
});
