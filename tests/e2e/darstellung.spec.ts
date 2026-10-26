import { test, expect, type Page } from './fixtures.ts';

const bodyBg = (page: Page) => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
const LIGHT = 'rgb(242, 243, 245)';
const DARK = 'rgb(17, 18, 20)';

test.describe('Gerät dunkel', () => {
  test.use({ colorScheme: 'dark' });

  test('folgt dem Gerät, Hell in den Einstellungen überschreibt und bleibt nach dem Neuladen', async ({ page }) => {
    await page.goto('./');
    expect(await bodyBg(page)).toBe(DARK);
    await page.goto('#/einstellungen');
    await page.getByRole('button', { name: 'Hell', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    expect(await bodyBg(page)).toBe(LIGHT);
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    expect(await bodyBg(page)).toBe(LIGHT);
    // gilt für alle Instrumente und schon vor dem ersten Zeichnen (Skript im Kopf der Seite)
    await page.goto('../gitarre/akkorde/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    expect(await bodyBg(page)).toBe(LIGHT);
    // zurück auf Automatisch
    await page.goto('#/einstellungen');
    await page.getByRole('button', { name: 'Automatisch' }).click();
    await expect(page.locator('html')).not.toHaveAttribute('data-theme', /./);
    expect(await bodyBg(page)).toBe(DARK);
  });
});

test('Sonne/Mond in der Fußzeile wechselt hell und dunkel und merkt es sich', async ({ page }) => {
  await page.goto('./');
  expect(await bodyBg(page)).toBe(LIGHT);
  const toggle = page.locator('.site-footer [data-theme-toggle]');
  const box = (await toggle.boundingBox())!;
  expect(box.height).toBeGreaterThanOrEqual(48);
  await toggle.click();
  expect(await bodyBg(page)).toBe(DARK);
  await expect(page.locator('meta[name="theme-color"]').first()).toHaveAttribute('content', '#111214');
  await page.goto('#/lieder');
  expect(await bodyBg(page)).toBe(DARK);
  await page.locator('.site-footer [data-theme-toggle]').click();
  expect(await bodyBg(page)).toBe(LIGHT);
});

/** Im Druck (auch im Dunkelmodus): weißer Grund, keine Flächen mit Farbe – nur Linien, Text und kleine SVG-Punkte. */
test.describe('Druck', () => {
  test.use({ colorScheme: 'dark' });

  for (const v of ['./', 'akkorde/c/', 'lieder/alle-meine-entchen/', 'liedblatt/alle-meine-entchen/', 'lektion/1/', 'lektionen/', 'lehrkraefte-und-eltern/', 'wissen/ukulele-stimmen/', 'stimmgeraet/', 'blues/']) {
    test(`weiß und ohne Flächen: ${v}`, async ({ page }) => {
      await page.goto(v);
      await page.evaluate(() => localStorage.setItem('saiten:darstellung', 'dark'));
      await page.reload();
      await page.emulateMedia({ media: 'print', colorScheme: 'dark' });
      expect(await bodyBg(page)).toBe('rgb(255, 255, 255)');
      const filled = await page.evaluate(() =>
        Array.from(document.querySelectorAll('body *'))
          .filter((e) => {
            const st = getComputedStyle(e);
            if (st.display === 'none' || st.visibility === 'hidden') return false;
            const bg = st.backgroundColor;
            return bg !== 'rgba(0, 0, 0, 0)' && bg !== 'rgb(255, 255, 255)' && bg !== 'transparent';
          })
          .map((e) => `${e.tagName}.${e.getAttribute('class')}: ${getComputedStyle(e).backgroundColor}`),
      );
      expect(filled).toEqual([]);
      const dark = await page.evaluate(() =>
        Array.from(document.querySelectorAll('body *'))
          .filter((e) => getComputedStyle(e).display !== 'none' && (e.textContent || '').trim() && !e.closest('svg'))
          .map((e) => getComputedStyle(e).color)
          .filter((c) => c !== 'rgb(0, 0, 0)'),
      );
      expect(dark).toEqual([]);
    });
  }
});
