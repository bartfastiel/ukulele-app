import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { readZip } from '../../src/util/zip.ts';
import { decodeWav } from '../../src/audio/wav.ts';

// Das künstliche Mikrofon spielt jede Sekunde einen C-Akkord (tools/make-wav.ts).

test('Aufnahme: eine Aufnahme speichern und als ZIP mit WAV und takes.json herunterladen', async ({ page }) => {
  await page.goto('#/aufnahme');
  await expect(page.locator('.rec-card .chord-name')).toHaveText('C');
  await page.getByRole('button', { name: /Aufnehmen/ }).click();
  await page.getByRole('button', { name: 'Ja, hör zu!' }).click();
  await expect(page.locator('.rec-summary h2')).toHaveText('1 von 28 Aufnahmen', { timeout: 15000 });
  // automatisch weiter zur zweiten Aufnahme (Am)
  await expect(page.locator('.rec-card .chord-name')).toHaveText('Am', { timeout: 5000 });

  const downloadP = page.waitForEvent('download');
  await page.getByRole('button', { name: /ZIP herunterladen/ }).click();
  const download = await downloadP;
  expect(download.suggestedFilename()).toMatch(/^ukulele-aufnahmen-.*\.zip$/);
  const entries = readZip(new Uint8Array(readFileSync((await download.path())!)));
  const names = entries.map((e) => e.name);
  expect(names).toEqual(['01-C-0003-strum.wav', 'takes.json']);
  const meta = JSON.parse(new TextDecoder().decode(entries[1].data));
  expect(meta.takes[0]).toMatchObject({ chord: 'C', frets: '0003', technique: 'strum', correct: true });
  const wav = decodeWav(entries[0].data);
  expect(wav.samples.length / wav.sampleRate).toBeGreaterThan(4.5);
  // Das Signal ist wirklich angekommen (nicht nur Stille)
  expect(wav.samples.reduce((m, v) => Math.max(m, Math.abs(v)), 0)).toBeGreaterThan(0.05);

  // Aufnahmen überstehen ein Neuladen
  await page.reload();
  await expect(page.locator('.rec-summary h2')).toHaveText('1 von 28 Aufnahmen');
});
