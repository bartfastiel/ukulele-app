import { test, expect } from '@playwright/test';

// Das künstliche Mikrofon spielt eine E-Saite, 20 Cent zu tief (tools/make-wav.ts).

test('Stimmgerät erkennt die E-Saite und sagt „zu tief“', async ({ page }) => {
  await page.goto('#/stimmen');
  await page.getByRole('button', { name: /Zuhören/ }).click();
  await page.getByRole('button', { name: 'Ja, hör zu!' }).click();
  await expect(page.locator('.tuner-note')).toHaveText('E', { timeout: 8000 });
  await expect(page.locator('.tuner .feedback')).toContainText('E-Saite ist zu tief');
});
