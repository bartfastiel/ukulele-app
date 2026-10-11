import { test, expect, type Page, navigationNoise } from './fixtures.ts';

function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (e) => !navigationNoise(e.message) && errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && !navigationNoise(m.text()) && errors.push(m.text()));
  return errors;
}

const bars = (page: Page) => page.locator('.groove-bar').allTextContents();

test('Rock-Begleitung: eigene Seite, Griffe und Schlagmuster, Einzählen, die Takte laufen', async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto('#/begleitung/rock');
  await expect(page).toHaveURL(/\/ukulele\/begleitung\/rock\/$/);
  await expect(page.getByRole('heading', { name: 'Rock-Begleitung', exact: true })).toBeVisible();
  await expect(page).toHaveTitle(/Rock-Begleitung zum Mitspielen für (der )?Ukulele/);
  expect(await bars(page)).toEqual(['C', 'C', 'F', 'F', 'G', 'G', 'F', 'F']);
  await expect(page.locator('.groove-chord:not(.next) .chord-name')).toHaveText('C');
  await expect(page.locator('.groove-chord:not(.next) svg')).toBeVisible();
  await expect(page.locator('.groove-pattern .arrow.down')).toHaveCount(8);
  await expect(page.getByRole('group', { name: 'Tonart' }).getByRole('button', { name: 'C ★' })).toHaveAttribute('aria-pressed', 'true');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);

  await page.getByRole('button', { name: 'Schnell · 120' }).click();
  await expect(page.getByRole('button', { name: 'Schnell · 120' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: /Start/ }).click();
  await expect(page.locator('.feedback')).toContainText('Einzählen', { timeout: 3000 });
  await expect(page.locator('.groove-bar.now')).toHaveCount(1, { timeout: 5000 });
  await expect(page.locator('.groove-pattern .arrow.on')).toHaveCount(1);
  // nach zwei Takten (8 Schläge bei 120 bpm = 4 s + Einzähler) kommt F
  await expect(page.locator('.groove-chord:not(.next) .chord-name')).toHaveText('F', { timeout: 10000 });
  await expect(page.locator('.feedback')).toContainText(/Takt [34] von 8/);
  await page.getByRole('button', { name: /Stopp/ }).click();
  await expect(page.locator('.groove-bar.now')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('Stil wechseln ohne Neuladen: Pop mit I–V–vi–IV, Tempo bleibt, Tonart wählbar', async ({ page }) => {
  await page.goto('#/begleitung/rock');
  await page.getByRole('button', { name: 'Langsam · 80' }).click();
  await page.getByRole('navigation', { name: 'Stil', exact: true }).getByRole('link', { name: 'Pop', exact: true }).click();
  await expect(page).toHaveURL(/\/begleitung\/pop\/$/);
  await expect(page.getByRole('heading', { name: 'Pop-Begleitung', exact: true })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Stil', exact: true }).getByRole('link', { name: 'Pop', exact: true })).toHaveAttribute('aria-current', 'page');
  expect(await bars(page)).toEqual(['C', 'G', 'Am', 'F']);
  await expect(page.getByRole('button', { name: 'Langsam · 75' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByText(/C – G – Am – F/)).toBeVisible();
  await page.getByRole('group', { name: 'Tonart' }).getByRole('button', { name: 'G', exact: true }).click();
  expect(await bars(page)).toEqual(['G', 'D', 'Em', 'C']);
  await expect(page.locator('.groove-chord.next .chord-name')).toHaveText('D');
  // Shuffle schwingt: die gewählte Tonart bleibt
  await page.getByRole('navigation', { name: 'Stil', exact: true }).getByRole('link', { name: 'Shuffle', exact: true }).click();
  expect(await bars(page)).toEqual(['G', 'G', 'C', 'C', 'D7', 'C', 'G', 'D7']);
  await expect(page.locator('.groove-pattern .arrow.up')).toHaveCount(4);
  // der Blues bleibt eine eigene Seite und verlinkt die anderen Stile
  await page.getByRole('navigation', { name: 'Stil', exact: true }).getByRole('link', { name: 'Blues', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Blues', exact: true })).toBeVisible();
  await page.getByRole('navigation', { name: 'Andere Stile' }).getByRole('link', { name: 'Country', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Country-Begleitung', exact: true })).toBeVisible();
});

test('Startseite führt zur Band-Begleitung', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('link', { name: /Band-Begleitung/ }).click();
  await expect(page.getByRole('heading', { name: 'Rock-Begleitung', exact: true })).toBeVisible();
});

test('E-Bass: Shuffle zeigt die Basslinie auf dem Hals, Stufe 2 ist das Boogie-Riff', async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto('../bass/#/begleitung/shuffle');
  await expect(page).toHaveURL(/\/bass\/begleitung\/shuffle\/$/);
  await expect(page).toHaveTitle(/Shuffle-Begleitung zum Mitspielen für (den )?E-Bass/);
  expect(await bars(page)).toEqual(['E', 'E', 'A', 'A', 'B7', 'A', 'E', 'B7']);
  await expect(page.locator('.groove-target')).toHaveText('Spiel E');
  await expect(page.locator('.fb-label')).toHaveCount(4);
  await expect(page.locator('.fb-mark.now')).toHaveCount(1);
  expect(await page.locator('.groove-pattern .glyph').allTextContents()).toEqual(['E', '·', 'E', '·', 'E', '·', 'E', '·']);
  await page.getByRole('button', { name: '2 · Boogie-Linie' }).click();
  expect(await page.locator('.groove-pattern .glyph').allTextContents()).toEqual(['E', 'G#', 'B', 'C#', 'D', 'C#', 'B', 'G#']);
  await expect(page.getByText(/1-3-5-6-b7-6-5-3/)).toBeVisible();
  await page.getByRole('button', { name: /Mittel/ }).click();
  await page.getByRole('button', { name: /Start/ }).click();
  await expect(page.locator('.groove-bar.now')).toHaveCount(1, { timeout: 6000 });
  // die Vorgabe wandert mit der Boogie-Linie weiter
  await expect(page.locator('.groove-target')).toHaveText(/Spiel (G#|B|C#|D)$/, { timeout: 5000 });
  // Antippen auf dem Hals zählt als gespielter Ton
  await page.getByRole('button', { name: /Stopp/ }).click();
  await page.locator('.fb-hit[data-string="0"][data-fret="0"]').click();
  await expect(page.locator('.fb-mark.played')).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('Begleitungen auf allen Instrumenten: in der bequemen Tonart, ohne Fehler und ohne waagrechtes Scrollen', async ({ page }) => {
  const errors = collectErrors(page);
  const first: Record<string, string> = { gitarre: 'D', banjo: 'G', bariton: 'G', mandoline: 'G' };
  for (const id of Object.keys(first))
    for (const style of ['rock', 'pop', 'shuffle', 'country']) {
      await page.goto(`../${id}/#/begleitung/${style}`);
      await expect(page.locator('.groove-bar').first()).toHaveText(style === 'pop' ? 'G' : first[id]);
      await expect(page.locator('.groove-chord:not(.next) svg')).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `${id}/${style}`).toBeLessThanOrEqual(1);
    }
  expect(errors).toEqual([]);
});
