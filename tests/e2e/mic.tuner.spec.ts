import { test, expect } from './fixtures.ts';

// Das künstliche Mikrofon spielt eine E-Saite, 20 Cent zu tief (tools/make-wav.ts).

test('Stimmgerät erkennt die E-Saite und sagt „zu tief“', async ({ page }) => {
  await page.goto('#/stimmen');
  await page.getByRole('button', { name: /Zuhören/ }).click();
  await page.getByRole('button', { name: 'Ja, hör zu!' }).click();
  await expect(page.locator('.tuner-note')).toHaveText('E', { timeout: 8000 });
  await expect(page.locator('.tuner .feedback:not(.tip)')).toContainText('E-Saite ist zu tief');
});

test('Stimmgerät: bleibt die Saite über mehrere Anschläge gleich, kommt der Tipp „falscher Wirbel?“', async ({ page }) => {
  // Das Testsignal wird nie nachgestimmt – genau der Fall, in dem jemand am falschen Wirbel dreht
  await page.goto('#/stimmen');
  await page.getByRole('button', { name: /Zuhören/ }).click();
  await page.getByRole('button', { name: 'Ja, hör zu!' }).click();
  await expect(page.locator('.feedback.tip')).toContainText('falschen Wirbel', { timeout: 20000 });
  await expect(page.locator('.feedback.tip')).toContainText('E-Saite');
});
