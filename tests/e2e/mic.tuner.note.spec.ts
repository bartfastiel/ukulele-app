import { test, expect } from '@playwright/test';

// Das künstliche Mikrofon spielt eine einzelne E-Saite, 20 Cent zu tief (tools/make-wav.ts).

test('Detektiv erkennt einen einzelnen Ton und zeigt, wo er liegt', async ({ page }) => {
  await page.goto('#/detektiv');
  await page.getByRole('button', { name: /Zuhören/ }).click();
  await page.getByRole('button', { name: 'Ja, hör zu!' }).click();
  await expect(page.locator('.det-note .chord-name')).toHaveText('E4', { timeout: 10000 });
  await expect(page.locator('.det-positions')).toContainText('E-Saite leer');
  await expect(page.locator('.det-positions')).toContainText('C-Saite im 4. Bund');
});
