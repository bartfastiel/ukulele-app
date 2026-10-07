// Bildschirmfotos aller Ansichten in typischen Geräteformaten (Sichtprüfung des Designs).
import { chromium, webkit } from '@playwright/test';

const base = process.env.BASE || 'http://localhost:4173/';
const out = process.argv[2] || 'shots';
const views = ['', 'lieder', 'lied/alle-voegel', 'lied/alle-meine-entchen', 'akkorde', 'akkord/G7', 'spiel', 'stimmen', 'rhythmus', 'sterne', 'aufnahme', 'blues', 'detektiv'];
const devices = [
  { name: 'ipad', width: 1024, height: 768, engine: webkit },
  { name: 'phone', width: 390, height: 844, engine: chromium },
  { name: 'phone-quer', width: 844, height: 390, engine: chromium },
];
const errors = [];
for (const d of devices) {
  const browser = await d.engine.launch();
  const page = await browser.newPage({ viewport: { width: d.width, height: d.height }, deviceScaleFactor: 1 });
  page.on('pageerror', (e) => errors.push(`${d.name}: ${e.message}`));
  for (const v of views) {
    await page.goto(`${base}#/${v}`);
    await page.waitForTimeout(250);
    await page.screenshot({ path: `${out}/${d.name}-${v.replace(/\//g, '_') || 'home'}.png` });
  }
  await browser.close();
}
console.log(errors.length ? errors.join('\n') : 'keine JS-Fehler');
