import { test, expect } from './fixtures.ts';

// Das künstliche Mikrofon spielt die tiefe E-Saite des E-Basses (E1 ≈ 41 Hz), 20 Cent zu tief (tools/make-wav.ts).

test('E-Bass: Stimmgerät erkennt die tiefe E-Saite (41 Hz) und sagt „zu tief“', async ({ page }) => {
  await page.goto('../bass/#/stimmen');
  await page.getByRole('button', { name: /Zuhören/ }).click();
  await page.getByRole('button', { name: 'Ja, hör zu!' }).click();
  await expect(page.locator('.tuner-note')).toHaveText('E', { timeout: 8000 });
  await expect(page.locator('.tuner .feedback:not(.tip)')).toContainText('E-Saite ist zu tief');
});

test('E-Bass: „Prüf mich!“ hört den Ton E', async ({ page }) => {
  await page.goto('../bass/#/akkord/E');
  await page.getByRole('button', { name: /Prüf mich/ }).click();
  await page.getByRole('button', { name: 'Ja, hör zu!' }).click();
  await expect(page.locator('.feedback.good')).toContainText('Das war ein sauberes E!', { timeout: 8000 });
});

test('E-Bass: Ton-Detektiv nennt E und zeigt, wo es auf dem Hals liegt', async ({ page }) => {
  await page.goto('../bass/#/detektiv');
  await page.getByRole('button', { name: /Zuhören/ }).click();
  await page.getByRole('button', { name: 'Ja, hör zu!' }).click();
  await expect(page.locator('.det-note .chord-name')).toHaveText('E', { timeout: 8000 });
  await expect(page.locator('.det-note .fb-mark.now')).toHaveCount(1);
});
