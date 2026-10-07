import { test, expect } from './fixtures.ts';

// Das künstliche Mikrofon spielt jede Sekunde einen C-Akkord (tools/make-wav.ts).

test('„Prüf mich!“ erkennt einen echten C-Akkord', async ({ page }) => {
  await page.goto('#/akkord/C');
  await page.getByRole('button', { name: /Prüf mich/ }).click();
  await page.getByRole('button', { name: 'Ja, hör zu!' }).click();
  await expect(page.locator('.feedback.good')).toContainText('schönes C', { timeout: 10000 });
});

test('„Prüf mich!“ lobt kein F, wenn C klingt', async ({ page }) => {
  await page.goto('#/akkord/F');
  await page.getByRole('button', { name: /Prüf mich/ }).click();
  await page.getByRole('button', { name: 'Ja, hör zu!' }).click();
  await page.waitForTimeout(5000);
  await expect(page.locator('.feedback.good')).toHaveCount(0);
});

test('„Wartet auf mich“ geht weiter, sobald der Akkord klingt', async ({ page }) => {
  await page.goto('#/lied/row-row');
  await page.getByRole('button', { name: 'Wartet auf mich' }).click();
  await page.locator('.btn-play').click();
  await page.getByRole('button', { name: 'Ja, hör zu!' }).click();
  await expect(page.locator('.wait-title')).toContainText('Spiel jetzt C');
  // ohne Tippen: das Mikrofon hört C und das Lied startet
  await expect(page.locator('.syl.now .syl-text')).toHaveText('Row,', { timeout: 10000 });
});

test('Akkord-Spiel zählt erkannte Akkorde', async ({ page }) => {
  await page.goto('#/spiel');
  await page.getByRole('button', { name: /C · F · G7/ }).click();
  await page.getByRole('button', { name: /C und F/ }).click();
  await page.getByRole('button', { name: /Start/ }).click();
  await page.getByRole('button', { name: 'Ja, hör zu!' }).click();
  await expect(page.locator('.score').first()).toHaveText('1', { timeout: 10000 });
  await expect(page.locator('.game-target .chord-name')).toHaveText('F');
});
