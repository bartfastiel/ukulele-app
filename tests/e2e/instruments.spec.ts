import { test, expect, type Page } from '@playwright/test';

/** Gitarre und Banjo auf ihren eigenen Seiten (/gitarre/, /banjo/ – in Produktion eigene Subdomains). */
const CASES = [
  { id: 'gitarre', club: 'Gitarren-Club', strings: ['E', 'A', 'D', 'G', 'B', 'e'], song: 'C', blues: 'E7', target: 'Spiel E' },
  { id: 'banjo', club: 'Banjo-Club', strings: ['g', 'D', 'G', 'B', 'D'], song: 'C', blues: 'G7', target: 'Spiel G' },
];

const VIEWS = ['', 'lieder', 'lied/alle-meine-entchen', 'akkorde', 'akkord/G', 'spiel', 'stimmen', 'rhythmus', 'sterne', 'aufnahme', 'blues', 'detektiv', 'eigenes-lied'];

function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  return errors;
}

const labelsLeftToRight = (page: Page, selector: string) =>
  page.locator(selector).evaluateAll((els) => els.sort((a, b) => Number(a.getAttribute('x')) - Number(b.getAttribute('x'))).map((e) => e.textContent));

for (const c of CASES) {
  test.describe(c.id, () => {
    const go = (page: Page, view: string) => page.goto(`../${c.id}/#/${view}`);

    test('alle Ansichten laden ohne Fehler und ohne waagrechtes Scrollen', async ({ page }) => {
      const errors = collectErrors(page);
      for (const v of VIEWS) {
        await go(page, v);
        await expect(page.locator('main')).toBeVisible();
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow, `waagrechtes Scrollen in #/${v}`).toBeLessThanOrEqual(1);
      }
      expect(errors).toEqual([]);
    });

    test('Startseite nennt das Instrument', async ({ page }) => {
      await go(page, '');
      await expect(page.getByRole('heading', { name: c.club })).toBeVisible();
      await expect(page.locator('html')).toHaveAttribute('data-instrument', c.id);
    });

    test('Akkordseite zeigt das Griffbild mit allen Saiten', async ({ page }) => {
      await go(page, 'akkord/G');
      await expect(page.getByRole('heading', { name: 'Akkord G' })).toBeVisible();
      expect(await labelsLeftToRight(page, '.diagram-big .string-label')).toEqual(c.strings);
      await expect(page.locator('.diagram-big svg > line')).toHaveCount(c.id === 'banjo' ? c.strings.length + 1 : c.strings.length);
      await page.getByRole('button', { name: /Anhören/ }).click();
      await go(page, 'akkorde');
      await expect(page.locator('.chord-tile').first()).toBeVisible();
    });

    test('Stimmgerät zeigt die Saiten des Instruments', async ({ page }) => {
      await go(page, 'stimmen');
      await expect(page.locator('.btn-string .sname')).toHaveCount(c.strings.length);
      const names = await page.locator('.btn-string .sname').evaluateAll((els) => els.map((e) => (e.firstChild ? e.firstChild.textContent : '')));
      expect(names).toEqual(c.strings);
      await expect(page.locator('.tuner-side .small')).toContainText(c.strings.join(' – '));
      // Tippziele bleiben groß genug
      const small = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.btn-string'))
          .map((b) => b.getBoundingClientRect())
          .filter((r) => r.width < 52 || r.height < 52).length,
      );
      expect(small).toBe(0);
    });

    test('Lied spielt mit den Griffen des Instruments', async ({ page }) => {
      const errors = collectErrors(page);
      await go(page, 'lied/alle-meine-entchen');
      await page.getByRole('button', { name: 'Läuft durch' }).click();
      await page.getByRole('button', { name: 'Original' }).click();
      await expect(page.locator('.now-card .chord-name')).toHaveText(c.song);
      expect(await labelsLeftToRight(page, '.now-card .card-inner:not(.leaving) .string-label')).toEqual(c.strings);
      await page.locator('.btn-play').click();
      await expect(page.locator('.syl.now .syl-text')).toHaveText('Ent', { timeout: 10000 });
      // erster Wechsel auf F: Griffbild des Instruments
      await expect(page.locator('.now-card .card-inner:not(.leaving) .chord-name')).toHaveText('F', { timeout: 10000 });
      expect(await labelsLeftToRight(page, '.now-card .card-inner:not(.leaving) .string-label')).toEqual(c.strings);
      // Tabulatur nennt Saiten des Instruments
      await page.locator('.more summary').click();
      await page.getByRole('button', { name: 'Tabulatur' }).click();
      const tab = (await page.locator('.syl-tab').first().textContent()) || '';
      expect(c.strings.indexOf(tab.replace(/\d+$/, ''))).toBeGreaterThanOrEqual(0);
      expect(errors).toEqual([]);
    });

    test('Blues läuft in der bequemen Tonart', async ({ page }) => {
      const errors = collectErrors(page);
      await go(page, 'blues');
      await expect(page.locator('.blues-now .chord-name')).toHaveText(c.blues);
      await expect(page.locator('.blues-target')).toHaveText(c.target);
      await expect(page.locator('.fb-label')).toHaveCount(c.strings.length);
      await page.getByRole('button', { name: 'Schnell' }).click();
      await page.getByRole('button', { name: /Start/ }).click();
      await expect(page.locator('.blues-bar.now')).toHaveCount(1, { timeout: 8000 });
      await page.getByRole('button', { name: '4 · Frei spielen' }).click();
      await expect(page.locator('.fb-mark.scale').first()).toBeVisible();
      await page.getByRole('button', { name: /Stopp/ }).click();
      expect(errors).toEqual([]);
    });
  });
}

test('Gitarre: Kapodaster-Hinweis bei einer Tonart mit Barré-Griffen', async ({ page }) => {
  await page.goto('../gitarre/#/lied/alle-meine-entchen');
  await page.locator('.more summary').click();
  await page.getByRole('button', { name: 'Einen Halbton tiefer' }).click();
  await page.getByRole('button', { name: 'Einen Halbton tiefer' }).click();
  await expect(page.locator('.key-now')).toContainText('Bb');
  await expect(page.locator('.capo-hint')).toContainText(/Kapo \d, greif wie/);
});

test('Banjo: Rhythmus hat ein Zupfmuster mit Daumen, Zeige- und Mittelfinger', async ({ page }) => {
  await page.goto('../banjo/#/rhythmus');
  await page.getByRole('button', { name: 'Banjo-Roll: Daumen – Zeige – Mittel' }).click();
  await expect(page.locator('.arrow .glyph')).toHaveText(['D', 'Z', 'M', 'D', 'Z', 'M', 'D', 'M']);
  await page.getByRole('button', { name: /Start/ }).click();
  await expect(page.locator('.arrow.on')).toHaveCount(1, { timeout: 3000 });
  await page.getByRole('button', { name: /Stopp/ }).click();
});
