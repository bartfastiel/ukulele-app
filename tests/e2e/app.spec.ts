import { test, expect, type Page, navigationNoise } from './fixtures.ts';

const VIEWS = ['', 'lieder', 'lied/alle-meine-entchen', 'akkorde', 'akkord/G7', 'spiel', 'stimmen', 'rhythmus', 'sterne', 'aufnahme', 'blues', 'detektiv', 'eigenes-lied', 'teilen/0kaputt'];

function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (e) => !navigationNoise(e.message) && errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && !navigationNoise(m.text()) && errors.push(m.text()));
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
  for (const v of ['', 'lieder', 'lied/bruder-jakob', 'stimmen', 'eigenes-lied']) {
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
  await expect(page.locator('.song-card .feature[title^="Melodie"]')).toHaveCount(59);
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

test('Metronom: Taktarten, Tempo mit Plus/Minus und Tippen', async ({ page }) => {
  await page.goto('#/rhythmus');
  await page.getByRole('button', { name: 'Schaukeln (6/8)' }).click();
  await expect(page.locator('.arrow .beat-count')).toHaveText(['1', '2', '3', '4', '5', '6']);
  await page.getByRole('button', { name: 'Schneller' }).click();
  await expect(page.locator('.bpm-value')).toHaveText('85 Schläge pro Minute');
  // Tippen im Abstand von 500 ms direkt im Browser, damit die Testgeschwindigkeit das Ergebnis nicht verfälscht
  await page.evaluate(
    () =>
      new Promise<void>((done) => {
        const b = document.querySelector('[aria-label="Tempo durch Tippen bestimmen"]') as HTMLElement;
        let n = 0;
        const t = window.setInterval(() => {
          b.click();
          if (++n === 4) {
            window.clearInterval(t);
            done();
          }
        }, 500);
      }),
  );
  const bpm = Number((await page.locator('.bpm-value').textContent())!.split(' ')[0]);
  expect(bpm).toBeGreaterThan(90);
  expect(bpm).toBeLessThan(135);
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

test('Blues in G: Akkorde, Erklärung und Vorgabe wandern mit', async ({ page }) => {
  await page.goto('#/blues');
  await page.getByRole('group', { name: 'Tonart' }).getByRole('button', { name: 'G', exact: true }).click();
  await expect(page.locator('.blues-bar').first()).toContainText('G');
  await expect(page.locator('.blues-bar').nth(4)).toContainText('C');
  await expect(page.locator('.blues-bar').nth(8)).toContainText('D');
  await expect(page.locator('.blues-target')).toHaveText('Spiel G');
  await expect(page.getByText(/4 Takte G, 2 Takte C/)).toBeVisible();
});

test('Blues: Hals verschieben, frei spielen mit fünf Bünden und Ziehton', async ({ page }) => {
  await page.goto('#/blues');
  const head = page.getByRole('button', { name: 'Richtung Kopf' });
  await expect(head).toBeDisabled();
  await expect(page.locator('.blues-shift-label')).toHaveText('Bund 1–3');
  for (let i = 0; i < 4; i++) await page.getByRole('button', { name: 'Richtung Korpus' }).click();
  await expect(page.locator('.blues-shift-label')).toHaveText('Bund 5–8');
  await expect(head).toBeEnabled();
  // C liegt jetzt gegriffen im Ausschnitt (G-Saite, 5. Bund) statt auf der leeren C-Saite
  await expect(page.locator('.fb-mark-label.now')).toHaveText('5');
  await page.getByRole('button', { name: '4 · Frei spielen' }).click();
  await expect(page.locator('.blues-shift-label')).toHaveText('Bund 5–9');
  await expect(page.locator('.fb-bend').first()).toBeVisible();
  await expect(page.getByText(/Ziehen ↑/)).toBeVisible();
  await page.getByRole('button', { name: 'Sehr langsam' }).click();
  await expect(page.getByRole('button', { name: 'Sehr langsam' })).toHaveAttribute('aria-pressed', 'true');
});

test('Startseite: Blues und Akkord-Detektiv sind erreichbar', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('link', { name: /Akkord-Detektiv/ }).click();
  await expect(page.getByRole('heading', { name: 'Akkord-Detektiv', exact: true })).toBeVisible();
  await page.goto('./');
  await page.getByRole('link', { name: /^Blues/ }).click();
  await expect(page.getByRole('heading', { name: 'Blues', exact: true })).toBeVisible();
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
  await page.goto('#/lied/horch-was-kommt');
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
  await expect(page.locator('.syl.now .syl-text')).toHaveText('draußen');
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

test('Liedsuche: zuerst Treffer im Titel, darunter im Liedtext mit hervorgehobener Fundstelle', async ({ page }) => {
  await page.goto('#/lieder');
  const search = page.getByRole('searchbox', { name: /Lied suchen/ });
  await search.fill('Glocken');
  await expect(page.locator('.song-results h2').first()).toContainText('Im Titel');
  await expect(page.locator('.song-results .song-card').first()).toContainText('Süßer die Glocken');
  await search.fill('Schwänzchen');
  await expect(page.locator('.song-results h2')).toHaveText(['Im Liedtext (1)']);
  await expect(page.locator('.song-results mark')).toHaveText('Schwänzchen');
  await page.locator('.song-results .song-card').first().click();
  await expect(page.getByRole('heading', { name: 'Alle meine Entchen' })).toBeVisible();
  await page.goto('#/lieder');
  await page.getByRole('searchbox', { name: /Lied suchen/ }).fill('xylophonquatsch');
  await expect(page.locator('.song-results')).toContainText('Kein Lied gefunden');
  await page.getByRole('searchbox', { name: /Lied suchen/ }).fill('');
  await expect(page.locator('.song-filter')).toBeVisible();
});

test('Einfache Griffe: D7 wird zu D, Hinweis nennt den Tausch', async ({ page }) => {
  await page.goto('#/lied/my-bonnie');
  await page.locator('details.more summary').click();
  await expect(page.locator('.key-box')).toContainText('D7 → D');
  await page.getByRole('button', { name: 'Einfache Griffe' }).click();
  await expect(page.getByRole('button', { name: 'Einfache Griffe' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.lyrics .syl-chord', { hasText: /^D7$/ })).toHaveCount(0);
  await page.getByRole('button', { name: 'Einfache Griffe' }).click();
  await expect(page.locator('.lyrics .syl-chord', { hasText: /^D7$/ }).first()).toBeVisible();
});

test('eigenes Lied: Akkorde über dem Text einfügen, speichern, finden, spielen, per Link teilen und löschen', async ({ page, browser }) => {
  await page.goto('#/lieder');
  await page.getByRole('link', { name: 'Eigenes Lied', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Eigenes Lied' })).toBeVisible();
  // eigener Testtext; die letzte Zeile hat einen Akkord ohne Griffbild
  const text = ['C              G7', 'Heute spiel ich Ukulele,', 'G7           C', 'und die Sonne lacht.', 'C13b9', 'Schluss.'].join('\n');
  await page.locator('#own-title').fill('Sonnenlied');
  await page.locator('#own-text').fill(text);
  await expect(page.locator('.pv-notes')).toContainText('Akkordzeilen über dem Text');
  await expect(page.locator('.pv-notes')).toContainText('Diese Akkorde kenne ich nicht: C13b9');
  await expect(page.locator('.pv-syl').filter({ hasText: 'Ukulele' }).locator('.pv-chord')).toHaveText('G7');
  await page.getByRole('button', { name: '3/4' }).click();
  await page.getByRole('button', { name: 'Schneller' }).click();
  await page.getByRole('button', { name: /Speichern/ }).click();

  // spielbar wie ein Lied mit Akkorden und Text
  await expect(page.getByRole('heading', { name: 'Sonnenlied' })).toBeVisible();
  await expect(page).toHaveURL(/\/lieder\/eigen\/#mein-sonnenlied$/);
  await expect(page.locator('.no-melody')).toBeVisible();
  await page.getByRole('button', { name: 'Läuft durch' }).click();
  await page.getByRole('button', { name: 'Original' }).click();
  await page.locator('.btn-play').click();
  await expect(page.locator('.syl.now .syl-text')).toHaveText('Heute', { timeout: 6000 });
  await page.locator('.now-card').click();

  // in der Liste unter „Eigene Lieder“ und über die Suche
  await page.goto('#/lieder');
  await expect(page.locator('.song-section').filter({ hasText: 'Eigene Lieder' }).locator('.song-card', { hasText: 'Sonnenlied' })).toBeVisible();
  await page.getByRole('searchbox', { name: /Lied suchen/ }).fill('Sonne lacht');
  await expect(page.locator('.song-results .song-card').first()).toContainText('Sonnenlied');

  // teilen: Hinweis, QR-Code, Link
  await page.goto('#/lied/mein-sonnenlied');
  await page.getByRole('link', { name: 'Teilen' }).click();
  await expect(page.locator('.share-hint')).toContainText('nur für dich und deine Familie');
  await expect(page.locator('.qr-svg')).toBeVisible();
  const link = await page.locator('.share-link').inputValue();
  expect(link).toMatch(/\/geteiltes-lied\/#[01][A-Za-z0-9_-]+$/);

  // auf einem anderen Gerät (eigener Speicher) öffnen und hinzufügen
  const other = await browser.newContext();
  const page2 = await other.newPage();
  await page2.goto(link);
  await expect(page2.getByRole('heading', { name: 'Sonnenlied' })).toBeVisible();
  await expect(page2.locator('.card').first()).toContainText('3/4 · 95 Schläge pro Minute');
  await page2.getByRole('button', { name: /Zu meinen Liedern hinzufügen/ }).click();
  await expect(page2.getByRole('heading', { name: 'Sonnenlied' })).toBeVisible();
  await expect(page2).toHaveURL(/\/lieder\/eigen\/#mein-sonnenlied$/);
  await page2.goto('#/lieder');
  await expect(page2.locator('.song-card', { hasText: 'Sonnenlied' })).toBeVisible();
  await other.close();

  // derselbe Link auf dem eigenen Gerät: schon vorhanden
  await page.goto(link);
  await expect(page.getByText('Dieses Lied hast du schon.')).toBeVisible();

  // bearbeiten und löschen mit Rückfrage im App-Stil
  await page.goto('#/lied/mein-sonnenlied');
  await page.getByRole('link', { name: 'Bearbeiten' }).click();
  await expect(page.locator('#own-title')).toHaveValue('Sonnenlied');
  await page.getByRole('button', { name: /Löschen/ }).click();
  await expect(page.getByRole('dialog')).toContainText('Lied löschen?');
  await page.getByRole('button', { name: 'Nein, behalten' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: /Löschen/ }).click();
  await page.getByRole('button', { name: 'Ja, löschen' }).click();
  await expect(page.getByRole('heading', { name: 'Lieder', exact: true })).toBeVisible();
  await expect(page.locator('.song-card', { hasText: 'Sonnenlied' })).toHaveCount(0);
});

test('kaputter Teilen-Link: freundliche Meldung statt Fehler', async ({ page }) => {
  await page.goto('#/teilen/1abc');
  await expect(page.getByRole('heading', { name: 'Dieser Link klappt leider nicht' })).toBeVisible();
});

test('Impressum: Anschrift erscheint nur als Grafik aus Kacheln, nie als Text', async ({ page }) => {
  await page.goto('impressum/');
  const spot = page.locator('[data-secret]').first();
  // nur wenn der Build Testangaben bekommen hat (CI: LEGAL_ADDRESS/LEGAL_EMAIL), sonst steht dort ein Hinweis
  test.skip((await spot.count()) === 0, 'ohne Impressumsangaben gebaut');
  await expect(page.locator('.secret-art').first()).toHaveAttribute('aria-label', 'Anschrift als Bild');
  await expect.poll(() => page.locator('.secret-art canvas').count()).toBeGreaterThan(20);
  const html = await page.evaluate(() => document.documentElement.outerHTML);
  for (const part of ['Beispielweg', 'Beispielstadt', 'beispiel.invalid']) expect(html.indexOf(part), part).toBeLessThan(0);
  // der Köder steht im HTML, ist aber unsichtbar und wird nicht vorgelesen
  const decoy = page.locator('.decoy').first();
  await expect(decoy).toHaveAttribute('aria-hidden', 'true');
  expect(await decoy.evaluate((el) => getComputedStyle(el).color)).toBe('rgba(0, 0, 0, 0)');
  expect(await decoy.evaluate((el) => getComputedStyle(el).userSelect || getComputedStyle(el).webkitUserSelect)).toBe('none');
  const box = await decoy.boundingBox();
  expect(box && box.width * box.height).toBeLessThanOrEqual(1);
  await expect(page.locator('[data-kind="mail"] .secret-art')).toHaveAttribute('aria-label', 'E-Mail-Adresse als Bild');
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
});
