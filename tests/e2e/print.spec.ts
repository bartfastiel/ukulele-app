import { test, expect, type Page, navigationNoise } from './fixtures.ts';

function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (e) => !navigationNoise(e.message) && errors.push(e.message));
  return errors;
}

/** Seitenzahl eines PDF (Chromium): jede Seite ist ein Objekt „/Type /Page“. */
function pageCount(pdf: { toString(encoding: 'latin1'): string }): number {
  return (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
}

test('Liedblatt: vom Lied aus erreichbar, drei Arten, gedruckt nur das Blatt', async ({ page, browserName }) => {
  const errors = collectErrors(page);
  await page.goto('#/lied/alle-meine-entchen');
  await page.locator('.print-link').click();
  await expect(page).toHaveURL(/\/liedblatt\/alle-meine-entchen\/$/);
  await expect(page.getByRole('heading', { name: 'Alle meine Entchen', exact: true })).toBeVisible();
  // Kinder: nur Griffbilder, an jedem Wechsel eins, kein Akkordname
  const anchors = page.locator('.song-sheet .ps-anchor');
  const changes = await anchors.count();
  expect(changes).toBeGreaterThan(4);
  await expect(page.locator('.song-sheet .ps-anchor .pd-svg')).toHaveCount(changes);
  await expect(page.locator('.song-sheet .ps-name')).toHaveCount(0);
  // Fortgeschritten: Namen über dem Text, Griffbilder einmal oben
  await page.getByRole('button', { name: 'Akkordnamen' }).click();
  await expect(page.locator('.song-sheet .ps-name')).toHaveCount(changes);
  await expect(page.locator('.song-sheet .ps-anchor .pd-svg')).toHaveCount(0);
  await expect(page.locator('.ps-legend .ps-legend-chord')).toHaveCount(3);
  await page.getByRole('button', { name: 'Name und Griffbild' }).click();
  await expect(page.locator('.song-sheet .ps-name')).toHaveCount(changes);
  await expect(page.locator('.song-sheet .ps-anchor .pd-svg')).toHaveCount(changes);
  // Tonart wählen: gilt auch im Lied
  await page.getByRole('button', { name: 'Einen Halbton höher' }).click();
  await expect(page.locator('.sheet-sub')).toContainText('Tonart C#');
  await page.getByRole('button', { name: 'Einen Halbton tiefer' }).click();
  // Drucken: Kopfzeile, Wahlknöpfe und Fußzeile verschwinden
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.topbar')).toBeHidden();
  await expect(page.locator('.print-controls')).toBeHidden();
  await expect(page.locator('.site-footer')).toBeHidden();
  await expect(page.locator('.print-sheet')).toBeVisible();
  if (browserName === 'chromium') expect(pageCount(await page.pdf({ preferCSSPageSize: true }))).toBe(1);
  expect(errors).toEqual([]);
});

test('Liedblatt eines eigenen Liedes entsteht im Browser', async ({ page }) => {
  await page.goto('./');
  await page.evaluate(() => {
    const text = ['C              G7', 'Heute spiel ich Ukulele,', 'G7           C', 'und die Sonne lacht.'].join('\n');
    const song = { id: 'mein-sonnenlied', title: 'Sonnenlied', text, meter: 4, bpm: 90, created: 0, updated: 0 };
    localStorage.setItem('ukulele-club:eigene-lieder', JSON.stringify({ version: 1, songs: [song] }));
  });
  await page.goto('#/lied/mein-sonnenlied');
  await page.locator('.print-link').click();
  await expect(page).toHaveURL(/\/liedblatt\/eigen\/#mein-sonnenlied$/);
  await expect(page.locator('.print-sheet h2')).toHaveText('Sonnenlied');
  await expect(page.locator('.ps-line')).toHaveCount(2);
  await expect(page.locator('.ps-line').first()).toContainText('Heute spiel ich Ukulele,');
});

test('Griff-Übersicht und Hals: von Akkorden und Stimmgerät verlinkt, Knöpfe groß genug', async ({ page, browserName }) => {
  await page.goto('#/akkorde');
  await page.getByRole('link', { name: 'Griffe drucken' }).click();
  await expect(page.locator('.chord-chart .chart-chord')).toHaveCount(18);
  await expect(page.locator('.chart-group h3').first()).toHaveText('Dur');
  const small = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.btn'))
      .map((b) => b.getBoundingClientRect())
      .filter((r) => r.width > 0 && (r.width < 52 || r.height < 52)).length,
  );
  expect(small).toBe(0);
  if (browserName === 'chromium') {
    await page.emulateMedia({ media: 'print' });
    expect(pageCount(await page.pdf({ preferCSSPageSize: true }))).toBe(1);
    await page.emulateMedia({ media: 'screen' });
  }
  await page.goto('#/stimmen');
  await page.getByRole('link', { name: /Alle Töne auf dem Hals/ }).click();
  await expect(page.locator('.neck-chart.across')).toBeVisible();
  // vier Saiten, je leer und 15 Bünde
  await expect(page.locator('.neck-chart text.neck-string')).toHaveCount(4);
  await page.getByRole('button', { name: 'Hochkant' }).click();
  await expect(page.locator('.neck-chart.upright')).toBeVisible();
  if (browserName === 'chromium') {
    await page.emulateMedia({ media: 'print' });
    expect(pageCount(await page.pdf({ preferCSSPageSize: true }))).toBe(1);
  }
});

for (const id of ['gitarre', 'banjo', 'bariton', 'mandoline', 'bass']) {
  test(`${id}: Griff-Übersicht und Hals passen je auf ein Blatt`, async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'PDF nur in Chromium');
    const errors = collectErrors(page);
    await page.goto(`../${id}/#/griffe-drucken`);
    await expect(page.locator('.chart-chord').first()).toBeVisible();
    await page.emulateMedia({ media: 'print' });
    expect(pageCount(await page.pdf({ preferCSSPageSize: true })), 'Griffe').toBe(1);
    await page.emulateMedia({ media: 'screen' });
    await page.goto(`../${id}/#/hals`);
    await expect(page.locator('.neck-chart')).toBeVisible();
    await page.emulateMedia({ media: 'print' });
    expect(pageCount(await page.pdf({ preferCSSPageSize: true })), 'Hals quer').toBe(1);
    await page.emulateMedia({ media: 'screen' });
    await page.getByRole('button', { name: 'Hochkant' }).click();
    await page.emulateMedia({ media: 'print' });
    expect(pageCount(await page.pdf({ preferCSSPageSize: true })), 'Hals hochkant').toBe(1);
    expect(errors).toEqual([]);
  });
}
