import { test, expect } from './fixtures.ts';

test('Akkordseite Gitarre G: „Leichter greifen“ mit ehrlicher Beschriftung, Daumen im Griffbild, abspielbar', async ({ page }) => {
  await page.goto('/gitarre/#/akkord/G');
  const section = page.locator('.easy-grips');
  await expect(section.getByRole('heading', { name: 'Leichter greifen' })).toBeVisible();
  const cards = section.locator('.easy-card');
  await expect(cards).toHaveCount(3);
  const mini = cards.filter({ hasText: 'Mini-G' });
  await expect(mini.locator('.easy-tag')).toContainText(['alle Töne von G', 'nur 4 Saiten anschlagen', 'tiefster Ton D']);
  const thumb = cards.filter({ hasText: 'Daumen-G' });
  await expect(thumb.locator('svg .finger')).toContainText(['D']);
  await expect(thumb.locator('svg .muted')).toHaveCount(1);
  await expect(thumb.locator('svg.chord-svg')).toHaveAttribute('aria-label', /Daumen auf der E-Saite im 3\. Bund/);
  await page.getByRole('button', { name: 'Mini-G mit einem Finger anhören' }).click();
  // Hauptgriff bleibt eindeutig ansprechbar
  await expect(page.getByRole('button', { name: /Anhören/ })).toHaveCount(1);
  // vorgerendert: der Artikel mit den Tricks steht bei „Mehr dazu“ vorn
  await expect(page.locator('.seo-card .wissen-list a').first()).toHaveAttribute('href', /wissen\/gitarre-akkorde-leichter-greifen\/$/);

  // Tippziele groß genug, kein waagrechtes Scrollen
  for (const b of await section.locator('.btn').all()) {
    const box = (await b.boundingBox())!;
    expect(box.height).toBeGreaterThanOrEqual(52);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
});

test('Ukulele E: E7 heißt ehrlich „eigentlich E7“; Akkorde ohne Varianten zeigen keinen Abschnitt', async ({ page }) => {
  await page.goto('#/akkord/E');
  await expect(page.locator('.easy-card').filter({ hasText: 'E7 statt E' }).locator('.easy-tag')).toContainText(['eigentlich E7']);
  await page.goto('#/akkord/C');
  await expect(page.locator('.easy-grips')).toHaveCount(0);
});

test('Linkshänder: das Griffbild der Variante ist gespiegelt', async ({ page }) => {
  await page.goto('/gitarre/#/akkord/F');
  const labels = () =>
    page
      .locator('.easy-card')
      .first()
      .locator('svg .string-label')
      .evaluateAll((els) => els.sort((a, b) => Number(a.getAttribute('x')) - Number(b.getAttribute('x'))).map((e) => e.textContent));
  expect(await labels()).toEqual(['E', 'A', 'D', 'G', 'B', 'e']);
  await page.locator('.site-footer').getByRole('link', { name: 'Für Linkshänder' }).click();
  await page.getByRole('button', { name: 'Linkshänder', exact: true }).click();
  await page.goto('/gitarre/#/akkord/F');
  expect(await labels()).toEqual(['e', 'B', 'G', 'D', 'A', 'E']);
});

test('Lied mit „Einfache Griffe“ auf der Gitarre nennt die Mini-Griffe', async ({ page }) => {
  await page.goto('/gitarre/#/lied/alle-meine-entchen');
  await expect(page.locator('.key-box')).toContainText('Leichtere Griffbilder für');
});
