// Bildschirmfotos aller Ansichten in typischen Geräteformaten (Sichtprüfung des Designs).
// node tools/shots.mjs <ordner> [de|en|fr] [ukulele|gitarre|banjo] – die Sprache kommt über die Browser-Sprache
// (Standard: de), das Instrument über ?instrument=… (Standard: Ukulele).
import { chromium, webkit } from '@playwright/test';

const base = process.env.BASE || `http://localhost:4173/${process.argv[4] || process.env.SITE || 'ukulele'}/`;
const out = process.argv[2] || 'shots';
const lang = process.argv[3] || 'de';
const prefix = lang === 'de' ? '' : `${lang}/`;
const locale = { de: 'de-DE', en: 'en-US', fr: 'fr-FR' }[lang] || lang;
const instrument = process.argv[4] || '';
const shotPrefix = instrument ? `${lang}-${instrument}` : lang;
const views = ['', 'lieder', 'lied/alle-voegel', 'lied/alle-meine-entchen', 'akkorde', 'akkord/G7', 'spiel', 'stimmen', 'rhythmus', 'sterne', 'aufnahme', 'blues', 'detektiv', 'eigenes-lied', 'eigenes-lied/mein-sonnenlied', 'lied/mein-sonnenlied', 'lied-teilen/mein-sonnenlied', '/wissen/', '/wissen/ukulele-stimmen/', '/impressum/', '/akkorde/f-sharp-m/'];
const devices = [
  { name: 'ipad', width: 1024, height: 768, engine: webkit },
  { name: 'phone', width: 390, height: 844, engine: chromium },
  { name: 'phone-quer', width: 844, height: 390, engine: chromium },
];
const errors = [];
for (const d of devices) {
  const browser = await d.engine.launch();
  const page = await browser.newPage({ viewport: { width: d.width, height: d.height }, deviceScaleFactor: 1, locale });
  page.on('pageerror', (e) => errors.push(`${d.name}: ${e.message}`));
  // eigenes Beispiel-Lied (eigener Text) für Bearbeiten, Spielen und Teilen
  await page.goto(base);
  await page.evaluate(() => {
    const text = ['C              G7', 'Heute spiel ich Ukulele,', 'G7           C', 'und die Sonne lacht.', '', 'F            C', 'Alle Saiten klingen,', 'G7                C', 'und mein Herz, das lacht.'].join('\n');
    const song = { id: 'mein-sonnenlied', title: 'Sonnenlied', text, meter: 4, bpm: 90, created: 0, updated: 0 };
    localStorage.setItem('ukulele-club:eigene-lieder', JSON.stringify({ version: 1, songs: [song] }));
  });
  for (const v of views) {
    // frühere Hash-Adressen leiten auf die echten Seiten der Sprache weiter
    await page.goto(v.indexOf('/') === 0 ? `${base}${prefix}${v.slice(1)}` : `${base}${prefix}#/${v}`);
    await page.waitForLoadState('load');
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${out}/${shotPrefix}-${d.name}-${v.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'home'}.png` });
  }
  await browser.close();
}
console.log(errors.length ? errors.join('\n') : 'keine JS-Fehler');
