import { test } from 'node:test';
import assert from 'node:assert/strict';
import { scramble, unscramble } from '../../src/site/scramble.ts';
import { renderSite } from '../../src/site/pages.ts';

const ADDRESS = 'c/o Beispiel GmbH\nMüllerstraße 12a\n80331 München';

test('Verpackung lässt sich wieder auspacken (auch Umlaute), ist aber jedes Mal anders', () => {
  assert.equal(unscramble(scramble(ADDRESS)), ADDRESS);
  assert.equal(unscramble(scramble('post@example.org')), 'post@example.org');
  assert.ok(scramble(ADDRESS) !== scramble(ADDRESS));
});

test('verpackt enthält nichts Lesbares: keine Straße, keine Postleitzahl, kein @', () => {
  const packed = scramble(ADDRESS + '\npost@example.org');
  for (const part of ['straße', 'strasse', '80331', 'München', 'Beispiel', '@', 'example']) assert.ok(packed.indexOf(part) < 0, part);
});

test('Impressum: Angaben nur verpackt im HTML, Seite nicht indexiert', () => {
  const pages = renderSite('ukulele', {
    url: (s) => `/${s}/`,
    publicUrl: (s) => `https://${s}.example.org/`,
    preview: false,
    assets: { js: 'a.js', css: 'a.css' },
    sites: ['ukulele'],
    legal: { address: ADDRESS, email: 'post@beispiel.invalid' },
  });
  for (const file of ['impressum/index.html', 'en/imprint/index.html', 'datenschutz/index.html']) {
    const html = pages.filter((p) => p.file === file)[0].html;
    assert.ok(html.indexOf('data-secret="') >= 0, `${file}: keine verpackten Angaben`);
    for (const part of ['Müllerstraße', '80331', 'beispiel.invalid', 'post@']) assert.ok(html.indexOf(part) < 0, `${file} enthält ${part}`);
    // der Köder ist da, aber für Screenreader verborgen
    assert.ok(/<span class="decoy" aria-hidden="true">Max Mustermann, Musterstraße 1, 12345 Musterstadt, kontakt@example\.org<\/span>/.test(html), `${file}: Köder fehlt`);
    assert.ok(html.indexOf('<meta name="robots" content="noindex">') >= 0, `${file} ohne noindex`);
  }
  for (const p of pages) if (p.file.indexOf('impressum') < 0 && p.file.indexOf('datenschutz') < 0 && p.file.indexOf('imprint') < 0 && p.file.indexOf('privacy') < 0 && p.file.indexOf('mentions') < 0 && p.file.indexOf('confidentialite') < 0) assert.ok(p.html.indexOf('data-secret') < 0, `${p.file} enthält Impressumsangaben`);
});
