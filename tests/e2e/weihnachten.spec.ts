import { test, expect } from './fixtures.ts';

test('Im Advent: Kachel „Weihnachtslieder“ auf der Startseite führt zur Weihnachtsseite', async ({ page }) => {
  await page.clock.setFixedTime(new Date(2026, 11, 3, 16, 0));
  await page.goto('./');
  const tile = page.locator('a.tile-season');
  await expect(tile).toContainText('Weihnachtslieder');
  const box = (await tile.boundingBox())!;
  expect(box.height).toBeGreaterThanOrEqual(52);
  await tile.click();
  await expect(page).toHaveURL(/\/ukulele\/weihnachtslieder\/$/);
  await expect(page.getByRole('heading', { name: 'Weihnachtslieder', level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Alle Jahre wieder' })).toBeVisible();
  await expect(page.locator('.os-note').first()).toBeVisible();
  await page.getByRole('link', { name: 'Still, still, still' }).first().click();
  await expect(page).toHaveURL(/\/ukulele\/lieder\/still-still-still\/$/);
});

test('Im Sommer: keine Weihnachtskachel, die Seite gibt es trotzdem', async ({ page }) => {
  await page.clock.setFixedTime(new Date(2026, 6, 15, 12, 0));
  await page.goto('./');
  await expect(page.locator('a.tile').first()).toBeVisible();
  await expect(page.locator('a.tile-season')).toHaveCount(0);
  await page.goto('weihnachtslieder/');
  await expect(page.getByRole('heading', { name: 'Weihnachtslieder', level: 1 })).toBeVisible();
});

test('Wurzel-Startseite im Dezember: Hinweis auf die Weihnachtslieder des vordersten Instruments', async ({ page }) => {
  await page.clock.setFixedTime(new Date(2026, 11, 20, 10, 0));
  await page.goto('../');
  const hint = page.locator('a.season-hint');
  await expect(hint).toContainText('Weihnachtslieder');
  await expect(hint).toHaveAttribute('href', /\/weihnachtslieder\/$/);
  await hint.click();
  await expect(page.getByRole('heading', { name: 'Weihnachtslieder', level: 1 })).toBeVisible();
});
