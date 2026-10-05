// Rendert public/icon.svg einmalig zu PNG (Home-Bildschirm-Symbole), mit dem Chromium von Playwright.
import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const svg = readFileSync(new URL('../public/icon.svg', import.meta.url), 'utf8');
const browser = await chromium.launch();
for (const size of [180, 192, 512]) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.setContent(`<style>html,body{margin:0;background:#3d160a}svg{width:${size}px;height:${size}px;display:block}</style>${svg}`);
  await page.screenshot({ path: fileURLToPath(new URL(`../public/icon-${size}.png`, import.meta.url)) });
  await page.close();
}
await browser.close();
console.log('Symbole erzeugt');
