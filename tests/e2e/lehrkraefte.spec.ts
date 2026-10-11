import { test, expect } from './fixtures.ts';

test('Lehrkräfte und Eltern: von der Fußzeile zum Handout, eigene Angaben nur auf dem Blatt', async ({ page }) => {
  await page.goto('');
  await page.locator('footer a', { hasText: 'Für Lehrkräfte und Eltern' }).click();
  await expect(page).toHaveURL(/\/ukulele\/lehrkraefte-und-eltern\/$/);
  await expect(page.getByRole('heading', { name: 'Für Lehrkräfte und Eltern', level: 1 })).toBeVisible();
  const sheet = page.locator('.handout');
  // ohne Eingaben: Linien zum Ausfüllen, ein QR-Code auf die Seite
  await expect(sheet.locator('svg.ho-qr-svg')).toHaveCount(1);
  await expect(sheet.locator('.ho-songs')).toHaveCount(0);
  await page.getByLabel('Klasse oder Gruppe (freiwillig)').fill('Klasse 5b');
  await page.getByLabel('Hinweis für Kinder und Eltern (freiwillig)').fill('Bis Freitag das erste Lied');
  await page.getByLabel(/Lieder als QR-Code/).selectOption('alle-meine-entchen');
  await expect(sheet.locator('.ho-group')).toContainText('Klasse 5b');
  await expect(sheet.locator('.ho-note-text')).toHaveText('Bis Freitag das erste Lied');
  await expect(sheet.locator('.ho-song figcaption')).toHaveText(['Alle meine Entchen']);
  await expect(sheet.locator('svg.ho-song-qr')).toHaveCount(1);
  // wieder entfernen
  await page.getByRole('button', { name: 'Alle meine Entchen wieder entfernen' }).click();
  await expect(sheet.locator('svg.ho-song-qr')).toHaveCount(0);
  // nichts davon wird gespeichert
  const stored = await page.evaluate(() => JSON.stringify(Object.keys(localStorage).map((k) => localStorage.getItem(k))));
  expect(stored).not.toContain('Klasse 5b');
});

test('Lehrkräfte und Eltern: Druckansicht zeigt nur das Blatt, auf genau einer A4-Seite', async ({ page, browserName }) => {
  await page.goto('lehrkraefte-und-eltern/');
  for (const id of ['alle-meine-entchen', 'klappert-die-muehle', 'kuckuck-kuckuck', 'haenschen-klein']) {
    await page.locator('.handout-picker').selectOption(id);
  }
  await expect(page.locator('svg.ho-song-qr')).toHaveCount(4);
  await page.locator('textarea.handout-input').fill('Bitte jeden Tag üben. '.repeat(9).trim());
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.topbar')).toBeHidden();
  await expect(page.locator('.site-footer')).toBeHidden();
  await expect(page.locator('.handout-controls')).toBeHidden();
  await expect(page.locator('.teach-card').first()).toBeHidden();
  await expect(page.locator('.handout')).toBeVisible();
  // weißer Grund statt Holz
  expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(255, 255, 255)');
  if (browserName === 'chromium') {
    const pdf = await page.pdf({ preferCSSPageSize: true });
    const pages = pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || [];
    expect(pages.length).toBe(1);
  }
});

test('Lehrkräfte und Eltern: auf Englisch und beim E-Bass', async ({ page }) => {
  await page.goto('../bass/en/teachers-and-parents/');
  await expect(page.getByRole('heading', { name: 'For teachers and parents', level: 1 })).toBeVisible();
  await expect(page.locator('.ho-plan')).toContainText('Find notes in the note game');
  await expect(page.locator('.ho-url')).toHaveText(/bass\..*\/en$/);
});
