import { test, expect, type Page } from './fixtures.ts';

test('Lernweg: Startseite → Übersicht → Lektion → Lied in der Tonart der Lektion', async ({ page }) => {
  await page.goto('./');
  await page.locator('a.tile-lessons').click();
  await expect(page).toHaveURL(/\/ukulele\/lektionen\/$/);
  await page.locator('[data-lesson="1"] a').click();
  await expect(page).toHaveURL(/\/ukulele\/lektion\/1\/$/);
  await expect(page.locator('h1')).toHaveText(/^Lektion 1: /);
  // Bruder Jakob steht in F; die Lektion spielt es nur mit C
  const song = page.locator('.lesson-play a[href*="/lieder/bruder-jakob/?tonart=C"]');
  await expect(song).toBeVisible();
  await song.click();
  await expect(page).toHaveURL(/\/lieder\/bruder-jakob\/\?tonart=C$/);
  await expect(page.locator('.key-now')).toHaveText(/Tonart C\b/);
});

test('Lernweg: Werkzeug-Knopf öffnet das Werkzeug, Häkchen bleibt gespeichert', async ({ page }) => {
  await page.goto('lektion/2/');
  await page.locator('.lesson-play a[href$="/stimmgeraet/"]').first().click();
  await expect(page).toHaveURL(/\/ukulele\/stimmgeraet\/$/);
  await expect(page.locator('main .btn-string').first()).toBeVisible();
  await page.goto('lektion/2/');
  const done = page.locator('[data-lesson-done]');
  await expect(done).toHaveAttribute('aria-pressed', 'false');
  await done.click();
  await expect(done).toHaveAttribute('aria-pressed', 'true');
  await page.goto('lektionen/');
  await expect(page.locator('[data-lesson="2"]')).toHaveClass(/is-done/);
  await expect(page.locator('[data-lesson="1"]')).not.toHaveClass(/is-done/);
});

test('Gitarre: Kapo-Lektion öffnet das Lied in A mit dem Kapo-Hinweis', async ({ page }) => {
  await page.goto('../gitarre/lektionen/');
  const capo = page.locator('.course-list a', { hasText: /Kapo/ }).first();
  await capo.click();
  await page.locator('.lesson-play a[href*="tonart=A"]').first().click();
  await expect(page.locator('.key-now')).toHaveText(/Tonart A\b/);
  await expect(page.locator('.capo-hint')).toContainText('Kapo 2');
});

async function pdfPages(page: Page): Promise<number> {
  const pdf = await page.pdf({ format: 'A4' });
  return (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
}

test('Druck: jede Lektion passt auf genau eine A4-Seite (alle Sprachen)', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'PDF nur in Chromium');
  test.setTimeout(600000);
  const tooLong: string[] = [];
  for (const site of ['ukulele', 'gitarre'])
    for (const prefix of ['', 'en/', 'fr/']) {
      const lessons = prefix === '' ? 'lektionen' : prefix === 'en/' ? 'lessons' : 'lecons';
      await page.goto(`../${site}/${prefix}${lessons}/`);
      const hrefs = await page.locator('.course-list a').evaluateAll((els) => els.map((e) => (e as HTMLAnchorElement).href));
      expect(hrefs.length).toBeGreaterThan(19);
      for (const href of hrefs) {
        await page.goto(href);
        const n = await pdfPages(page);
        if (n !== 1) tooLong.push(`${href}: ${n} Seiten`);
      }
    }
  expect(tooLong).toEqual([]);
});
