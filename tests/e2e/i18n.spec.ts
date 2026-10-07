import { test, expect, type Page } from '@playwright/test';

const VIEWS = ['', 'lieder', 'lied/alle-meine-entchen', 'lied/horch-was-kommt', 'akkorde', 'akkord/G7', 'spiel', 'stimmen', 'rhythmus', 'sterne', 'aufnahme', 'blues', 'detektiv', 'eigenes-lied', 'teilen/0kaputt'];

const LANGS = [
  { id: 'de', locale: 'de-DE', songs: 'Lieder', tuner: 'Stimmen', play: 'Los geht’s' },
  { id: 'en', locale: 'en-US', songs: 'Songs', tuner: 'Tuning', play: 'Let’s go' },
  { id: 'fr', locale: 'fr-FR', songs: 'Chansons', tuner: 'Accorder', play: 'C’est parti' },
];

/** Knöpfe, deren Text nicht hineinpasst (längere Übersetzungen), als lesbare Liste. */
function overflowingButtons(page: Page): Promise<string[]> {
  return page.evaluate(() =>
    Array.from(document.querySelectorAll('.btn'))
      .filter((b) => {
        const r = b.getBoundingClientRect();
        if (!r.width) return false;
        if (b.scrollWidth > b.clientWidth + 1) return true;
        // in einer waagrecht scrollbaren Leiste (Kategorien am Handy) dürfen Knöpfe rechts hinausragen
        for (let p = b.parentElement; p; p = p.parentElement) if (/auto|scroll/.test(getComputedStyle(p).overflowX)) return false;
        return r.right > window.innerWidth + 1;
      })
      .map((b) => (b.textContent || '').trim()),
  );
}

for (const l of LANGS) {
  test.describe(`Sprache ${l.id}`, () => {
    test.use({ locale: l.locale });

    test('alle Ansichten: übersetzt, ohne JS-Fehler, ohne überlaufende Knöpfe', async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      for (const v of VIEWS) {
        await page.goto(`#/${v}`);
        await expect(page.locator('main')).toBeVisible();
        await expect(page.locator('html')).toHaveAttribute('lang', l.id);
        const more = page.locator('details.more summary');
        if (await more.count()) await more.click();
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow, `waagrechtes Scrollen in #/${v}`).toBeLessThanOrEqual(1);
        expect(await overflowingButtons(page), `überlaufende Knöpfe in #/${v}`).toEqual([]);
      }
      expect(errors).toEqual([]);
    });
  });
}

test.describe('Browser auf Französisch', () => {
  test.use({ locale: 'fr-FR' });

  test('startet ohne Auswahl auf Französisch', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    await expect(page.getByRole('link', { name: /Jouer des chansons/ })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Français' })).toHaveAttribute('aria-pressed', 'true');
    await page.goto('#/stimmen');
    await expect(page).toHaveTitle('Accorder · Ukulele-Club');
  });
});

test.describe('Browser in anderer Sprache', () => {
  test.use({ locale: 'es-ES' });

  test('fällt auf Englisch zurück', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('link', { name: /Play songs/ })).toBeVisible();
  });
});

for (const l of LANGS.slice(1)) {
  test(`Sprache umschalten auf ${l.id}: Startseite, Lieder, Lied und Stimmgerät übersetzt, Wahl bleibt nach Neuladen`, async ({ page }) => {
    await page.goto('./');
    await expect(page.getByRole('button', { name: 'Deutsch' })).toHaveAttribute('aria-pressed', 'true');
    await page.getByRole('button', { name: l.id === 'en' ? 'English' : 'Français' }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', l.id);
    await expect(page.getByRole('button', { name: l.id === 'en' ? 'English' : 'Français' })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('button', { name: 'Deutsch' })).toHaveAttribute('aria-pressed', 'false');
    await expect(page.getByRole('link', { name: l.id === 'en' ? /Play songs/ : /Jouer des chansons/ })).toBeVisible();

    await page.getByRole('link', { name: l.id === 'en' ? /Play songs/ : /Jouer des chansons/ }).click();
    await expect(page.getByRole('heading', { name: l.songs, exact: true })).toBeVisible();
    await expect(page).toHaveTitle(`${l.songs} · Ukulele-Club`);
    // Kategorien übersetzt, Liedtitel bleiben im Original
    await expect(page.getByRole('button', { name: l.id === 'en' ? /^Christmas/ : /^Noël/ })).toBeVisible();
    await expect(page.locator('.song-card', { hasText: 'Alle meine Entchen' })).toBeVisible();

    await page.goto('#/lied/alle-meine-entchen');
    await expect(page.getByRole('heading', { name: 'Alle meine Entchen' })).toBeVisible();
    await expect(page.locator('.btn-play')).toContainText(l.play);
    await expect(page.locator('.now-card .card-label')).toHaveText(l.id === 'en' ? 'Now' : 'Maintenant');
    await page.getByRole('button', { name: l.id === 'en' ? 'Plays through' : 'Sans pause' }).click();

    await page.goto('#/stimmen');
    await expect(page.getByRole('heading', { name: l.tuner })).toBeVisible();
    await expect(page.locator('.tuner .feedback').first()).toContainText(l.id === 'en' ? 'Tap “Listen”' : 'Touche « Écouter »');
    await expect(page.getByRole('button', { name: l.id === 'en' ? 'Hear the G string' : 'Écouter la corde G' })).toBeVisible();

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang', l.id);
    await expect(page.getByRole('heading', { name: l.tuner })).toBeVisible();

    // zurück auf Deutsch, auch über die Einstellungen erreichbar
    await page.goto('#/sterne');
    await page.getByRole('button', { name: 'Deutsch' }).click();
    await expect(page.getByRole('heading', { name: 'Meine Sterne' })).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  });
}

test('Akkord-Detektiv auf Französisch: Akkordsymbole bleiben, Beschreibung übersetzt', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: 'Français' }).click();
  await page.goto('#/akkord/G7');
  await expect(page.getByRole('heading', { name: 'Accord G7' })).toBeVisible();
  await expect(page.locator('.say')).toHaveText('Sol sept');
  await expect(page.locator('.desc')).toContainText('majeur sur la corde C, 2e case');
  await page.goto('#/blues');
  await expect(page.locator('.blues-target')).toHaveText('Joue Do');
  await expect(page.locator('.blues-bar').first()).toContainText('C');
});
