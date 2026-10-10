import { test, expect } from './fixtures.ts';

test('Akkordseite der Ukulele: Hinweis führt zum selben Akkord auf der Bariton-Ukulele', async ({ page }) => {
  await page.goto('akkorde/c/');
  const hint = page.locator('main .relative-hint a');
  await expect(hint).toHaveText(/Bariton-Ukulele\? Dort greifst du C anders/);
  await hint.click();
  await expect(page).toHaveURL(/\/bariton\/akkorde\/c\/$/);
  await expect(page.locator('.diagram-big .string-label')).toHaveCount(4);
  // zurück geht es von dort aus genauso
  await expect(page.locator('main .relative-hint a').first()).toHaveAttribute('href', /\/ukulele\/akkorde\/c\/$/);
});

test('Stimmgerät: Hinweis nur bei Verwandten', async ({ page }) => {
  await page.goto('stimmgeraet/');
  await expect(page.locator('main .relative-hint a')).toHaveAttribute('href', /\/bariton\/stimmgeraet\/$/);
  await page.goto('../mandoline/stimmgeraet/');
  await expect(page.locator('main .btn-string').first()).toBeVisible();
  await expect(page.locator('main .relative-hint')).toHaveCount(0);
});

test('Gitarre: Powerchords von der Akkord-Übersicht bis zum Griff', async ({ page }) => {
  await page.goto('../gitarre/akkorde/');
  await page.getByRole('link', { name: /Powerchords für E-Gitarre/ }).click();
  await expect(page.getByRole('heading', { name: 'Powerchords', level: 1 })).toBeVisible();
  await page.locator('a.article-chord', { hasText: 'A5' }).click();
  await expect(page.locator('.chord-name.huge')).toHaveText('A5');
  await expect(page.locator('.chip-row .btn-chip')).toHaveCount(12);
  await expect(page.locator('main .relative-hint a')).toHaveText(/Alle Powerchords/);
});

test('Seite einer Stimmung: Griffbilder mit den Saiten der Stimmung, Weg zum Stimmgerät', async ({ page }) => {
  await page.goto('../gitarre/stimmung/open-g/');
  await expect(page.getByRole('heading', { name: 'Akkorde in Open G', level: 1 })).toBeVisible();
  await expect(page.locator('.article-chord').first()).toBeVisible();
  await page.getByRole('link', { name: 'Zum Stimmgerät' }).click();
  await expect(page).toHaveURL(/\/gitarre\/stimmgeraet\/$/);
  await expect(page.locator('a[href$="/gitarre/stimmung/open-g/"]')).toHaveCount(1);
});
