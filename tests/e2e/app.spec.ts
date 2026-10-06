import { test, expect, type Page } from '@playwright/test';

const VIEWS = ['', 'lieder', 'lied/alle-meine-entchen', 'akkorde', 'akkord/G7', 'spiel', 'stimmen', 'rhythmus', 'sterne', 'aufnahme', 'blues', 'detektiv'];

function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  return errors;
}

test('alle Ansichten laden ohne Fehler und ohne waagrechtes Scrollen', async ({ page }) => {
  const errors = collectErrors(page);
  for (const v of VIEWS) {
    await page.goto(`#/${v}`);
    await expect(page.locator('main')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `waagrechtes Scrollen in #/${v}`).toBeLessThanOrEqual(1);
  }
  expect(errors).toEqual([]);
});

test('Tippziele sind groß genug (mindestens 52 px)', async ({ page }) => {
  for (const v of ['', 'lieder', 'lied/bruder-jakob', 'stimmen']) {
    await page.goto(`#/${v}`);
    const small = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.btn'))
        .map((b) => b.getBoundingClientRect())
        .filter((r) => r.width > 0 && (r.width < 52 || r.height < 52)).length,
    );
    expect(small, `zu kleine Knöpfe in #/${v}`).toBe(0);
  }
});

test('Startseite führt zu den Liedern und zurück', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { name: 'Ukulele-Club' })).toBeVisible();
  await page.getByRole('link', { name: /Lieder spielen/ }).click();
  await expect(page.getByRole('heading', { name: 'Lieder', exact: true })).toBeVisible();
  await expect(page.locator('.song-card')).toHaveCount(81);
  await expect(page.locator('.song-card .feature[title^="Melodie"]')).toHaveCount(50);
  await page.getByRole('button', { name: /^Weihnachten/ }).click();
  await expect(page.locator('.song-card')).toHaveCount(12);
  await page.getByRole('button', { name: /^Alle/ }).click();
  await page.getByRole('link', { name: 'Zur Startseite' }).click();
  await expect(page.getByRole('heading', { name: 'Ukulele-Club' })).toBeVisible();
});

test('Karaoke „Läuft durch“: Einzähler, dann wandert die Silbe', async ({ page }) => {
  await page.goto('#/lied/alle-meine-entchen');
  await page.getByRole('button', { name: 'Läuft durch' }).click();
  await page.getByRole('button', { name: 'Original' }).click();
  await page.locator('.btn-play').click();
  await expect(page.locator('.count')).toBeVisible();
  await expect(page.locator('.syl.now .syl-text')).toHaveText('Al', { timeout: 5000 });
  await expect(page.locator('.syl.now .syl-text')).toHaveText('Ent', { timeout: 6000 });
  // Pause per Tipp auf die Bühne
  await page.locator('.now-card').click();
  await expect(page.locator('.paused')).toBeVisible();
});

test('Karaoke „Wartet auf mich“ ohne Mikrofon: wartet bei jedem Akkordwechsel', async ({ page }) => {
  await page.goto('#/lied/alle-meine-entchen');
  await page.getByRole('button', { name: 'Wartet auf mich' }).click();
  await page.getByRole('button', { name: 'Original' }).click();
  await page.locator('.btn-play').click();
  // ohne Web Audio (WebKit unter Windows) gibt es kein Mikrofon und daher keine Frage
  const noMic = page.getByRole('button', { name: 'Ohne Mikrofon' });
  if (await noMic.isVisible({ timeout: 1500 }).catch(() => false)) await noMic.click();
  await expect(page.locator('.wait-title')).toContainText('Spiel jetzt C');
  await page.locator('.wait').getByRole('button', { name: /Geschafft/ }).click();
  await expect(page.locator('.syl.now .syl-text')).toHaveText('Al', { timeout: 5000 });
  // erster Wechsel auf F bei „schwim-“
  await expect(page.locator('.wait-title')).toContainText('Spiel jetzt F', { timeout: 10000 });
  await expect(page.locator('.syl.now .syl-text')).toHaveText('schwim');
  await expect(page.locator('.now-card .card-inner:not(.leaving) .chord-name')).toHaveText('F');
});

test('kurzes Lied bis zum Ende ergibt einen Stern', async ({ page }) => {
  await page.goto('#/lied/bruder-jakob');
  await page.getByRole('button', { name: 'Wartet auf mich' }).click();
  await page.getByRole('button', { name: 'Original' }).click();
  await page.locator('.btn-play').click();
  const noMic = page.getByRole('button', { name: 'Ohne Mikrofon' });
  if (await noMic.isVisible({ timeout: 1500 }).catch(() => false)) await noMic.click();
  await page.locator('.wait').getByRole('button', { name: /Geschafft/ }).click();
  // Bruder Jakob hat nur einen Akkord: läuft ohne weiteres Warten durch (32 Schläge bei 100 bpm ≈ 19 s)
  await expect(page.locator('.result')).toBeVisible({ timeout: 30000 });
  await page.goto('#/sterne');
  await expect(page.locator('.total .score')).toHaveText('1');
});

test('Akkord-Seite: Anhören und Griffbeschreibung', async ({ page }) => {
  await page.goto('#/akkorde');
  await page.getByRole('link', { name: /^G7:/ }).click();
  await expect(page.getByRole('heading', { name: 'Akkord G7' })).toBeVisible();
  await expect(page.locator('.desc')).toContainText('Mittelfinger auf der C-Saite im 2. Bund');
  await page.getByRole('button', { name: /Anhören/ }).click();
});

test('Linkshänder spiegelt die Griffbilder', async ({ page }) => {
  await page.goto('#/sterne');
  await page.getByRole('button', { name: 'Linkshänder' }).click();
  await page.goto('#/akkord/C');
  const labels = await page.locator('.diagram-big .string-label').evaluateAll((els) =>
    els.sort((a, b) => Number(a.getAttribute('x')) - Number(b.getAttribute('x'))).map((e) => e.textContent),
  );
  expect(labels).toEqual(['A', 'E', 'C', 'G']);
});

test('Rhythmus startet und stoppt', async ({ page }) => {
  await page.goto('#/rhythmus');
  await page.getByRole('button', { name: 'Runter, runter, rauf, rauf, runter, rauf' }).click();
  await expect(page.locator('.say-line')).toContainText('runter, runter, rauf, rauf, runter, rauf');
  await expect(page.locator('.arrow .glyph')).toHaveText(['↓', '·', '↓', '↑', '·', '↑', '↓', '↑']);
  await page.getByRole('button', { name: /Start/ }).click();
  await expect(page.locator('.arrow.on')).toHaveCount(1, { timeout: 3000 });
  await page.getByRole('button', { name: /Stopp/ }).click();
});

test('Blues: Einzählen, Takte laufen, Vorgabe auf dem Hals, freie Stufe zeigt die Tonleiter', async ({ page }) => {
  await page.goto('#/blues');
  await expect(page.locator('.blues-bar')).toHaveCount(12);
  await expect(page.locator('.blues-target')).toHaveText('Spiel C');
  await page.getByRole('button', { name: 'Schnell' }).click();
  await page.getByRole('button', { name: /Start/ }).click();
  await expect(page.locator('.feedback')).toContainText('Einzählen', { timeout: 3000 });
  await expect(page.locator('.blues-bar.now')).toHaveCount(1, { timeout: 5000 });
  // nach 4 Takten (16 Schläge bei 100 bpm ≈ 9,6 s + Einzähler) wechselt der Akkord auf F
  await expect(page.locator('.blues-now .chord-name')).toHaveText('F7', { timeout: 15000 });
  await expect(page.locator('.blues-target')).toHaveText('Spiel F');
  await page.getByRole('button', { name: '4 · Frei spielen' }).click();
  await expect(page.locator('.fb-mark.scale').first()).toBeVisible();
  await expect(page.locator('.fb-mark.chord').first()).toBeVisible();
  await page.getByRole('button', { name: /Stopp/ }).click();
});

test('Startseite: Blues und Akkord-Detektiv sind erreichbar', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('link', { name: /Akkord-Detektiv/ }).click();
  await expect(page.getByRole('heading', { name: 'Akkord-Detektiv' })).toBeVisible();
  await page.goto('./');
  await page.getByRole('link', { name: /^Blues/ }).click();
  await expect(page.getByRole('heading', { name: 'Blues' })).toBeVisible();
});

test('Stille Nacht im 6/8-Takt: Einzähler, dann wandert die Silbe über das Melisma hinweg', async ({ page }) => {
  await page.goto('#/lied/stille-nacht');
  await page.getByRole('button', { name: 'Läuft durch' }).click();
  await page.getByRole('button', { name: 'Original' }).click();
  await page.locator('.btn-play').click();
  await expect(page.locator('.syl.now .syl-text')).toHaveText('Stil', { timeout: 6000 });
  // „Nacht,“ hält über zwei Töne (G–E), danach „hei-“ (6 Achtel bei 150/min = 2,4 s pro Takt)
  await expect(page.locator('.syl.now .syl-text')).toHaveText('Nacht,', { timeout: 4000 });
  await expect(page.locator('.syl.now .syl-text')).toHaveText('hei', { timeout: 4000 });
});

test('Lied ohne Melodie: Hinweis, keine Melodie-/Tab-Knöpfe, „Wartet auf mich“ geht von Akkord zu Akkord', async ({ page }) => {
  await page.goto('#/lied/muss-i-denn');
  await expect(page.locator('.no-melody')).toContainText('nur Akkorde und Text');
  await page.locator('.more summary').click();
  await expect(page.getByRole('button', { name: 'Melodie' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Tabulatur' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Begleitung' })).toBeVisible();
  await page.getByRole('button', { name: 'Wartet auf mich' }).click();
  await page.locator('.btn-play').click();
  const noMic = page.getByRole('button', { name: 'Ohne Mikrofon' });
  if (await noMic.isVisible({ timeout: 1500 }).catch(() => false)) await noMic.click();
  await expect(page.locator('.wait-title')).toContainText('Spiel jetzt C');
  await page.locator('.wait').getByRole('button', { name: /Geschafft/ }).click();
  await expect(page.locator('.wait-title')).toContainText('Spiel jetzt G7', { timeout: 10000 });
  await expect(page.locator('.syl.now .syl-text')).toHaveText('Städele');
});

test('Transponieren: Tonart wechseln, Vorschlag ★ und Original ◆ markiert, Wahl bleibt gespeichert', async ({ page }) => {
  await page.goto('#/lied/ode-an-die-freude');
  await page.locator('.more summary').click();
  await expect(page.locator('.key-now')).toHaveText('Tonart F ★');
  await expect(page.getByRole('button', { name: '◆ Original: D' })).toBeVisible();
  await page.getByRole('button', { name: '◆ Original: D' }).click();
  await expect(page.locator('.key-now')).toHaveText('Tonart D ◆');
  await expect(page.locator('.now-card .card-inner:not(.leaving) .chord-name')).toHaveText('D');
  await page.getByRole('button', { name: 'Einen Halbton höher' }).click();
  await expect(page.locator('.key-now')).toHaveText('Tonart Eb');
  await expect(page.locator('.now-card .card-inner:not(.leaving) .chord-name')).toHaveText('Eb');
  await page.reload();
  await page.locator('.more summary').click();
  await expect(page.locator('.key-now')).toHaveText('Tonart Eb');
  await page.getByRole('button', { name: /^Einfach: F/ }).click();
  await expect(page.locator('.now-card .card-inner:not(.leaving) .chord-name')).toHaveText('F');
});

test('Transponieren: Vorschlag für ein C-Lied ist D, Melodie-Tab wandert mit', async ({ page }) => {
  await page.goto('#/lied/haenschen-klein');
  await page.locator('.more summary').click();
  await page.getByRole('button', { name: 'Tabulatur' }).click();
  const before = await page.locator('.syl-tab').first().textContent();
  await page.getByRole('button', { name: '★ Vorschlag: D' }).click();
  await expect(page.locator('.now-card .card-inner:not(.leaving) .chord-name')).toHaveText('D');
  const after = await page.locator('.syl-tab').first().textContent();
  expect(after).not.toBe(before);
});

test('Akkordwechsel: „Gleich“ steht links, „Jetzt“ rechts, beim Wechsel rutscht alles nach rechts', async ({ page }) => {
  await page.goto('#/lied/alle-meine-entchen');
  const next = await page.locator('.next-card').boundingBox();
  const now = await page.locator('.now-card').boundingBox();
  expect(next!.x).toBeLessThan(now!.x);
  await page.getByRole('button', { name: 'Wartet auf mich' }).click();
  await page.getByRole('button', { name: 'Original' }).click();
  await page.locator('.btn-play').click();
  const noMic = page.getByRole('button', { name: 'Ohne Mikrofon' });
  if (await noMic.isVisible({ timeout: 1500 }).catch(() => false)) await noMic.click();
  // die Ausblende-Animation dauert nur 0,3 s – deshalb im Browser mitschreiben, ob sie lief
  await page.evaluate(() => {
    const w = window as unknown as { sawLeaving?: string };
    new MutationObserver(() => {
      const el = document.querySelector('.now-card .card-inner.leaving .chord-name');
      if (el && !w.sawLeaving) w.sawLeaving = el.textContent || '?';
    }).observe(document.body, { subtree: true, childList: true, attributes: true });
  });
  await page.locator('.wait').getByRole('button', { name: /Geschafft/ }).click();
  await expect(page.locator('.now-card .card-inner:not(.leaving) .chord-name')).toHaveText('F', { timeout: 10000 });
  expect(await page.evaluate(() => (window as unknown as { sawLeaving?: string }).sawLeaving)).toBe('C');
  await expect(page.locator('.now-card .card-inner.leaving')).toHaveCount(0, { timeout: 2000 });
});
