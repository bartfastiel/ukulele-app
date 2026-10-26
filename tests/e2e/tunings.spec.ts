import { test, expect, type Page } from './fixtures.ts';

const labelsLeftToRight = (page: Page, selector: string) =>
  page.locator(selector).evaluateAll((els) => els.sort((a, b) => Number(a.getAttribute('x')) - Number(b.getAttribute('x'))).map((e) => e.textContent));

const stringNames = (page: Page) => page.locator('.btn-string .sname').evaluateAll((els) => els.map((e) => (e.firstChild ? e.firstChild.textContent : '')));

test('Gitarre: Open G wählen, Hinweis auf jeder Seite, Griffbild als Barré, zurück zur Normalstimmung', async ({ page }) => {
  // im Stimmgerät nur ein leiser Verweis, gewählt wird in den Einstellungen
  await page.goto('../gitarre/#/stimmen');
  await expect(page.locator('#tuning-banner')).toHaveCount(0);
  await expect(page.locator('[data-tuning="open-g"]')).toHaveCount(0);
  await page.locator('.tuning-link').click();
  await expect(page).toHaveURL(/\/gitarre\/einstellungen\/#stimmung$/);
  await expect(page.locator('[data-tuning="normal"]')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('[data-tuning="open-g"]').click();

  const banner = page.locator('#tuning-banner');
  await expect(banner).toContainText('Andere Stimmung: Open G');
  await expect(banner).toContainText('D G D G B D');
  await expect(page.locator('[data-tuning="open-g"]')).toHaveAttribute('aria-pressed', 'true');
  await page.goto('../gitarre/#/stimmen');
  expect(await stringNames(page)).toEqual(['D', 'G', 'D', 'G', 'B', 'd']);
  await expect(page.locator('.tuning-link')).toContainText('Open G');

  for (const v of ['', 'lieder', 'lied/alle-meine-entchen', 'blues']) {
    await page.goto(`../gitarre/#/${v}`);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('#tuning-banner'), v).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `waagrechtes Scrollen in #/${v}`).toBeLessThanOrEqual(1);
  }

  await page.goto('../gitarre/#/akkord/D');
  await expect(page.locator('#tuning-banner')).toBeVisible();
  expect(await labelsLeftToRight(page, '.diagram-big .string-label')).toEqual(['D', 'G', 'D', 'G', 'B', 'd']);
  await expect(page.locator('.diagram-big .barre')).toHaveCount(1);
  await expect(page.locator('.diagram-big .fret-number')).toHaveText('7');
  const size = await page.locator('#tuning-banner .btn').boundingBox();
  expect(size!.height).toBeGreaterThanOrEqual(52);

  await page.getByRole('button', { name: 'Zurück zur Normalstimmung' }).click();
  await expect(page.locator('#tuning-banner')).toHaveCount(0);
  expect(await labelsLeftToRight(page, '.diagram-big .string-label')).toEqual(['E', 'A', 'D', 'G', 'B', 'e']);
  await expect(page.locator('.diagram-big .barre')).toHaveCount(0);

  await page.goto('../gitarre/#/stimmen');
  expect(await stringNames(page)).toEqual(['E', 'A', 'D', 'G', 'B', 'e']);
  await page.goto('../gitarre/#/lieder');
  await expect(page.locator('#tuning-banner')).toHaveCount(0);
});

test('Ukulele: tiefes G ändert nur das Stimmgerät, kein Hinweis; die Stimmung gilt nur für dieses Instrument', async ({ page }) => {
  await page.goto('#/einstellungen');
  await page.locator('[data-tuning="tiefes-g"]').click();
  await expect(page.locator('[data-tuning="tiefes-g"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#tuning-banner')).toHaveCount(0);
  await page.goto('../gitarre/#/stimmen');
  expect(await stringNames(page)).toEqual(['E', 'A', 'D', 'G', 'B', 'e']);
  await expect(page.locator('#tuning-banner')).toHaveCount(0);
});

test('Banjo: die kurze 5. Saite steht im Hinweis klein', async ({ page }) => {
  await page.goto('../banjo/#/einstellungen');
  await expect(page.locator('[data-tuning="normal"]')).toContainText('g D G B D');
  await page.locator('[data-tuning="open-d"]').click();
  await expect(page.locator('#tuning-banner')).toContainText('f# D F# A D');
});

test('Bariton-Ukulele hat keine anderen Stimmungen', async ({ page }) => {
  await page.goto('../bariton/#/stimmen');
  await expect(page.locator('.btn-string')).toHaveCount(4);
  await expect(page.locator('.tuning-link')).toHaveCount(0);
  await page.goto('../bariton/#/einstellungen');
  await expect(page.locator('#stimmung')).toHaveCount(0);
});

test('Gitarre: Klang und 12 Saiten wählen, ohne Hinweis oben; bleibt gespeichert', async ({ page }) => {
  await page.goto('../gitarre/#/stimmen');
  await expect(page.locator('[data-sound="e"]')).toHaveCount(0);
  await page.goto('../gitarre/#/einstellungen');
  await expect(page.locator('[data-sound="nylon"]')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('[data-sound="e"]').click();
  await expect(page.locator('[data-sound="e"]')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('[data-twelve]').click();
  await expect(page.locator('[data-twelve]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.twelve-hint')).toContainText('Oktave');
  await expect(page.locator('#tuning-banner')).toHaveCount(0);
  await page.reload();
  await expect(page.locator('[data-sound="e"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.twelve-hint')).toBeVisible();
  await page.goto('../banjo/#/einstellungen');
  await expect(page.locator('.variant-choice')).toHaveCount(0);
});
