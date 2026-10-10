import { test, expect, type Page, navigationNoise } from './fixtures.ts';

/** Gitarre, Banjo, Bariton-Ukulele und Mandoline auf ihren eigenen Seiten (/gitarre/, /banjo/, /bariton/, /mandoline/ – in Produktion eigene Subdomains). */
const CASES = [
  { id: 'gitarre', club: 'Gitarren-Club', strings: ['E', 'A', 'D', 'G', 'B', 'e'], song: 'C', blues: 'E7', target: 'Spiel E' },
  { id: 'banjo', club: 'Banjo-Club', strings: ['g', 'D', 'G', 'B', 'D'], song: 'C', blues: 'G7', target: 'Spiel G' },
  { id: 'bariton', club: 'Bariton-Ukulele-Club', strings: ['D', 'G', 'B', 'E'], song: 'C', blues: 'G7', target: 'Spiel G' },
  { id: 'mandoline', club: 'Mandolinen-Club', strings: ['G', 'D', 'A', 'E'], song: 'C', blues: 'D7', target: 'Spiel D' },
];

const VIEWS = ['', 'lieder', 'lied/alle-meine-entchen', 'akkorde', 'akkord/G', 'spiel', 'stimmen', 'rhythmus', 'sterne', 'aufnahme', 'blues', 'detektiv', 'eigenes-lied'];

function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (e) => !navigationNoise(e.message) && errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && !navigationNoise(m.text()) && errors.push(m.text()));
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

test('Startseite an der Wurzel: das zuletzt gespielte Instrument steht vorn', async ({ page }) => {
  await page.goto('../');
  await expect(page.locator('.tile-badge')).toHaveCount(0);
  await page.goto('../gitarre/');
  await page.goto('../');
  await expect(page.locator('.tiles .tile').first()).toHaveClass(/tile-gitarre/);
  await expect(page.locator('.tile-gitarre .tile-badge')).toHaveText('Zuletzt gespielt');
});

test('Bariton-Ukulele: G mit einem Finger wie die vier hohen Gitarrensaiten, eigene Kachel auf der Startseite', async ({ page }) => {
  await page.goto('../bariton/#/akkord/G');
  await expect(page.locator('.diagram-big')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-instrument', 'bariton');
  await expect(page.getByText('G: Ringfinger auf der E-Saite im 3. Bund')).toBeVisible();
  await page.goto('../');
  await expect(page.locator('a.tile-bariton')).toContainText('Bariton-Ukulele-Club');
});

test('Mandoline: G mit zwei Fingern, Blues in D, eigene Kachel auf der Startseite', async ({ page }) => {
  await page.goto('../mandoline/#/akkord/G');
  await expect(page.locator('.diagram-big')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-instrument', 'mandoline');
  await expect(page.getByText('G: Mittelfinger auf der A-Saite im 2. Bund, Ringfinger auf der E-Saite im 3. Bund')).toBeVisible();
  await page.goto('../');
  await expect(page.locator('a.tile-mandoline')).toContainText('Mandolinen-Club');
});

/** E-Bass (/bass/): Einzeltöne statt Akkorde – Töne, Ton-Spiel, Ton-Detektiv, Basstöne im Lied, Walking Bass. */
test.describe('bass', () => {
  const BASS = ['E', 'A', 'D', 'G'];
  const go = (page: Page, view: string) => page.goto(`../bass/#/${view}`);

  test('alle Ansichten laden ohne Fehler und ohne waagrechtes Scrollen', async ({ page }) => {
    const errors = collectErrors(page);
    for (const v of ['', 'lieder', 'lied/alle-meine-entchen', 'akkorde', 'akkord/G', 'spiel', 'stimmen', 'rhythmus', 'sterne', 'blues', 'detektiv', 'eigenes-lied']) {
      await go(page, v);
      await expect(page.locator('main')).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `waagrechtes Scrollen in #/${v}`).toBeLessThanOrEqual(1);
    }
    expect(errors).toEqual([]);
  });

  test('Startseite: Töne, Ton-Spiel und Ton-Detektiv statt Akkorden', async ({ page }) => {
    await go(page, '');
    await expect(page.getByRole('heading', { name: 'Bass-Club' })).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('data-instrument', 'bass');
    const tiles = page.locator('.tiles .tile-title');
    await expect(tiles).toContainText(['Lieder spielen', 'Blues', 'Töne', 'Ton-Detektiv', 'Ton-Spiel', 'Stimmen', 'Rhythmus']);
    await expect(page.locator('.tiles')).not.toContainText('Akkord');
    await page.getByRole('link', { name: /^Töne Wo liegt/ }).click();
    await expect(page).toHaveURL(/\/bass\/toene\/$/);
  });

  test('Ton G: ein Finger auf der E-Saite, Quinte als Perlmutt-Punkt, alle Stellen am Hals', async ({ page }) => {
    await go(page, 'akkord/Gm7');
    await expect(page).toHaveURL(/\/bass\/toene\/g\/$/);
    await expect(page.getByRole('heading', { name: 'Ton G', exact: true })).toBeVisible();
    expect(await labelsLeftToRight(page, '.diagram-big .string-label')).toEqual(BASS);
    await expect(page.locator('.detail-side .desc').first()).toHaveText('G: Ringfinger auf der E-Saite im 3. Bund');
    await expect(page.locator('.diagram-big .fifth')).toHaveCount(1);
    await expect(page.locator('.diagram-big .muted')).toHaveCount(0);
    await expect(page.locator('.notes-neck .fb-mark')).toHaveCount(5);
    await page.getByRole('button', { name: /Anhören/ }).click();
    await go(page, 'akkorde');
    await expect(page.locator('.chord-tile')).toHaveCount(12);
  });

  test('Stimmgerät zeigt die vier Bass-Saiten', async ({ page }) => {
    await go(page, 'stimmen');
    const names = await page.locator('.btn-string .sname').evaluateAll((els) => els.map((e) => (e.firstChild ? e.firstChild.textContent : '')));
    expect(names).toEqual(BASS);
  });

  test('Lied: Akkord und Grundton, Quinte auf Wunsch, Tabulatur mit Basstönen', async ({ page }) => {
    const errors = collectErrors(page);
    await go(page, 'lied/alle-meine-entchen');
    await page.getByRole('button', { name: 'Läuft durch' }).click();
    await page.getByRole('button', { name: 'Original' }).click();
    await expect(page.locator('.now-card .chord-name')).toHaveText('C');
    await expect(page.locator('.now-card .bass-root')).toHaveText('Grundton C');
    expect(await labelsLeftToRight(page, '.now-card .card-inner:not(.leaving) .string-label')).toEqual(BASS);
    await page.getByRole('button', { name: 'Grundton und Quinte' }).click();
    await expect(page.locator('.now-card .card-inner:not(.leaving) .fifth')).toHaveCount(1);
    await page.locator('.more summary').click();
    await expect(page.getByRole('button', { name: 'Einfache Griffe' })).toHaveCount(0);
    await page.getByRole('button', { name: 'Bass vorspielen' }).click();
    await page.getByRole('button', { name: 'Tabulatur' }).click();
    await expect(page.locator('.syl-tab').first()).toHaveText('A3');
    await page.locator('.btn-play').click();
    await expect(page.locator('.now-card .card-inner:not(.leaving) .chord-name')).toHaveText('F', { timeout: 10000 });
    await expect(page.locator('.now-card .card-inner:not(.leaving) .bass-root')).toHaveText('Grundton F');
    expect(errors).toEqual([]);
  });

  test('Lied „Wartet auf mich“: ohne Mikrofon wartet es auf den Grundton und „Geschafft“', async ({ page }) => {
    await go(page, 'lied/alle-meine-entchen');
    await page.getByRole('button', { name: 'Wartet auf mich' }).click();
    await page.getByRole('button', { name: 'Original' }).click();
    await page.locator('.btn-play').click();
    const noMic = page.getByRole('button', { name: 'Ohne Mikrofon' });
    if (await noMic.isVisible({ timeout: 1500 }).catch(() => false)) await noMic.click();
    await expect(page.locator('.wait-title')).toContainText('Spiel jetzt C');
    await page.locator('.wait').getByRole('button', { name: /Geschafft/ }).click();
    await expect(page.locator('.wait-title')).toContainText('Spiel jetzt F', { timeout: 10000 });
    await expect(page.locator('.now-card .card-inner:not(.leaving) .bass-root')).toHaveText('Grundton F');
  });

  test('Blues: Walking Bass in E, die Band spielt ohne eigenen Bass', async ({ page }) => {
    const errors = collectErrors(page);
    await go(page, 'blues');
    await expect(page.locator('.blues-now .chord-name')).toHaveText('E7');
    await expect(page.locator('.blues-target')).toHaveText('Spiel E');
    await expect(page.locator('.fb-label')).toHaveCount(4);
    await page.getByRole('button', { name: '3 · Walking Bass' }).click();
    await page.getByRole('button', { name: 'Schnell' }).click();
    await page.getByRole('button', { name: /Start/ }).click();
    await expect(page.locator('.blues-bar.now')).toHaveCount(1, { timeout: 8000 });
    await page.getByRole('button', { name: /Stopp/ }).click();
    expect(errors).toEqual([]);
  });

  test('Rhythmus: Basslinien mit Grundton, Quinte und Oktave', async ({ page }) => {
    await go(page, 'rhythmus');
    await page.getByRole('button', { name: 'Grundton und Quinte' }).click();
    await expect(page.locator('.arrow .glyph')).toHaveText(['1', '·', '·', '·', '5', '·', '·', '·']);
    await expect(page.locator('.rhythm-neck .fb-mark')).toHaveCount(3);
    await page.getByRole('button', { name: /Start/ }).click();
    await expect(page.locator('.arrow.on')).toHaveCount(1, { timeout: 3000 });
    await page.getByRole('button', { name: /Stopp/ }).click();
  });

  test('eigene Kachel auf der Startseite', async ({ page }) => {
    await page.goto('../');
    await expect(page.locator('a.tile-bass')).toContainText('Bass-Club');
  });
});
