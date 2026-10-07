import { test, expect, type Page } from './fixtures.ts';

const VIEWS = ['', 'lieder', 'lied/alle-meine-entchen', 'lied/horch-was-kommt', 'akkorde', 'akkord/G7', 'spiel', 'stimmen', 'rhythmus', 'sterne', 'aufnahme', 'blues', 'detektiv', 'eigenes-lied', 'teilen/0kaputt'];

const LANGS = [
  { id: 'de', prefix: '', locale: 'de-DE', songs: 'Lieder', tuner: 'Stimmen', play: 'Los geht’s' },
  { id: 'en', prefix: 'en/', locale: 'en-US', songs: 'Songs', tuner: 'Tuning', play: 'Let’s go' },
  { id: 'fr', prefix: 'fr/', locale: 'fr-FR', songs: 'Chansons', tuner: 'Accorder', play: 'C’est parti' },
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
        // frühere Hash-Adresse auf der Startseite der Sprache: leitet auf die echte Seite weiter
        await page.goto(`${l.prefix}#/${v}`);
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

  test('deutsche Seite bietet die französische Fassung an, ohne automatisch umzuleiten', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
    await page.getByRole('link', { name: /Cette page existe aussi en français/ }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    await expect(page.getByRole('link', { name: /Jouer des chansons/ })).toBeVisible();
    // Wahl gemerkt: kein Hinweis mehr
    await page.goto('./');
    await expect(page.locator('.lang-offer')).toHaveCount(0);
    await page.goto('fr/#/stimmen');
    await expect(page).toHaveTitle(/accordeur/i);
  });
});

test.describe('Browser in anderer Sprache', () => {
  test.use({ locale: 'es-ES' });

  test('bietet Englisch an', async ({ page }) => {
    await page.goto('./');
    await expect(page.getByRole('link', { name: /This page is also available in English/ })).toBeVisible();
    await page.getByRole('button', { name: 'No, thanks' }).click();
    await expect(page.locator('.lang-offer')).toHaveCount(0);
  });
});

for (const l of LANGS.slice(1)) {
  test(`Sprache umschalten auf ${l.id}: Startseite, Lieder, Lied und Stimmgerät übersetzt, eigene Adresse je Sprache`, async ({ page }) => {
    const name = l.id === 'en' ? 'English' : 'Français';
    await page.goto('./');
    await expect(page.locator('.lang-switch').getByRole('link', { name: 'Deutsch' })).toHaveAttribute('aria-current', 'true');
    await page.locator('.lang-switch').getByRole('link', { name }).click();
    await expect(page).toHaveURL(new RegExp(`/ukulele/${l.id}/$`));
    await expect(page.locator('html')).toHaveAttribute('lang', l.id);
    await expect(page.locator('.lang-switch').getByRole('link', { name })).toHaveAttribute('aria-current', 'true');

    await page.getByRole('link', { name: l.id === 'en' ? /Play songs/ : /Jouer des chansons/ }).click();
    await expect(page.getByRole('heading', { name: l.songs, exact: true })).toBeVisible();
    await expect(page).toHaveURL(new RegExp(`/${l.id}/${l.id === 'en' ? 'songs' : 'chansons'}/$`));
    // Kategorien übersetzt, Liedtitel bleiben im Original
    await expect(page.getByRole('button', { name: l.id === 'en' ? /^Christmas/ : /^Noël/ })).toBeVisible();
    await page.locator('.song-card', { hasText: 'Alle meine Entchen' }).click();
    await expect(page.getByRole('heading', { name: 'Alle meine Entchen' })).toBeVisible();
    await expect(page.locator('.btn-play')).toContainText(l.play);
    await expect(page.locator('.now-card .card-label')).toHaveText(l.id === 'en' ? 'Now' : 'Maintenant');

    await page.goto(`${l.prefix}#/stimmen`);
    await expect(page.getByRole('heading', { name: l.tuner })).toBeVisible();
    await expect(page.locator('.tuner .feedback').first()).toContainText(l.id === 'en' ? 'Tap “Listen”' : 'Touche « Écouter »');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang', l.id);

    // zurück auf Deutsch über die Fußzeile: dieselbe Seite auf Deutsch
    await page.locator('.footer-langs').getByRole('link', { name: 'Deutsch' }).click();
    await expect(page.getByRole('heading', { name: 'Stimmen' })).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  });
}

test('Akkord-Detektiv auf Französisch: Akkordsymbole bleiben, Beschreibung übersetzt', async ({ page }) => {
  await page.goto('fr/#/akkord/G7');
  await expect(page.getByRole('heading', { name: 'Accord G7' })).toBeVisible();
  await expect(page.locator('.say')).toHaveText('Sol sept');
  await expect(page.locator('.desc')).toContainText('majeur sur la corde C, 2e case');
  await page.goto('fr/#/blues');
  await expect(page.locator('.blues-target')).toHaveText('Joue Do');
  await expect(page.locator('.blues-bar').first()).toContainText('C');
});
