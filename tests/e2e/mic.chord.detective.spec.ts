import { test, expect } from './fixtures.ts';

// Das künstliche Mikrofon spielt jede Sekunde einen C-Akkord (tools/make-wav.ts).

test('Detektiv erkennt den C-Akkord: Name, Art, Töne und Bünde', async ({ page }) => {
  await page.goto('#/detektiv');
  await page.getByRole('button', { name: /Zuhören/ }).click();
  await page.getByRole('button', { name: 'Ja, hör zu!' }).click();
  await expect(page.locator('.det-chord .chord-name')).toHaveText('C', { timeout: 10000 });
  await expect(page.locator('.det-chord .say')).toHaveText('C-Dur');
  await expect(page.locator('.det-chord')).toContainText('C – E – G');
  await expect(page.locator('.det-chord')).toContainText('Bünde G-C-E-A: 0 0 0 3');
  await expect(page.getByRole('link', { name: 'C in der Akkord-Liste' })).toBeVisible();
});
