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
  // die Griffbilder klingen: A-Saite leer
  const tile = page.locator('.article-chord', { has: page.locator('.chord-name', { hasText: /^A5$/ }) });
  const svg = tile.locator('svg.playable');
  await svg.scrollIntoViewIfNeeded();
  const a = (await tile.locator('.string[data-string="1"]').boundingBox())!;
  await page.mouse.click(a.x + a.width / 2, a.y + a.height / 2);
  await expect(svg).toHaveAttribute('data-played', '1:0');
  await tile.locator('a.chord-name').click();
  await expect(page.locator('.chord-name.huge')).toHaveText('A5');
  await expect(page.locator('.chip-row .btn-chip')).toHaveCount(12);
  await expect(page.locator('main .relative-hint a')).toHaveText(/Alle Powerchords/);
});

test('Seite einer Stimmung: Griffbilder mit den Saiten der Stimmung, Weg zum Stimmgerät', async ({ page }) => {
  await page.goto('../gitarre/stimmung/open-g/');
  await expect(page.getByRole('heading', { name: 'Akkorde in Open G', level: 1 })).toBeVisible();
  // G klingt in Open G mit allen Saiten leer – auch nach dem Laden (spielbar) noch mit den Saiten der Stimmung
  const g = page.locator('.article-chord[data-tuning="open-g"]', { has: page.locator('.chord-name', { hasText: /^G$/ }) });
  const svg = g.locator('svg.playable');
  await svg.scrollIntoViewIfNeeded();
  await expect(g.locator('svg text', { hasText: /^d$/ })).toHaveCount(1);
  const low = (await g.locator('.string[data-string="0"]').boundingBox())!;
  await page.mouse.click(low.x + low.width / 2, low.y + low.height / 2);
  await expect(svg).toHaveAttribute('data-played', '0:0');
  await page.getByRole('link', { name: 'Zum Stimmgerät' }).click();
  await expect(page).toHaveURL(/\/gitarre\/stimmgeraet\/$/);
  await expect(page.locator('a[href$="/gitarre/stimmung/open-g/"]')).toHaveCount(1);
});
