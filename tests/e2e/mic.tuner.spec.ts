import { test, expect } from './fixtures.ts';

// Das künstliche Mikrofon spielt eine E-Saite, 20 Cent zu tief (tools/make-wav.ts).

test('Stimmgerät erkennt die E-Saite und sagt „zu tief“', async ({ page }) => {
  await page.goto('#/stimmen');
  await page.getByRole('button', { name: /Zuhören/ }).click();
  await page.getByRole('button', { name: 'Ja, hör zu!' }).click();
  await expect(page.locator('.tuner-note')).toHaveText('E', { timeout: 8000 });
  await expect(page.locator('.tuner .feedback:not(.tip)')).toContainText('E-Saite ist zu tief');
});

test('Stimmgerät: bleibt die Saite über mehrere Anschläge gleich, kommt der Tipp „falscher Wirbel?“', async ({ page }) => {
  // Das Testsignal wird nie nachgestimmt – genau der Fall, in dem jemand am falschen Wirbel dreht
  await page.goto('#/stimmen');
  await page.getByRole('button', { name: /Zuhören/ }).click();
  await page.getByRole('button', { name: 'Ja, hör zu!' }).click();
  await expect(page.locator('.feedback.tip')).toContainText('falschen Wirbel', { timeout: 20000 });
  await expect(page.locator('.feedback.tip')).toContainText('E-Saite');
});

test('Safari-Audio-Modus: das Mikrofon geht auch, wenn vorher schon Töne gespielt wurden (iPad)', async ({ page }) => {
  // Nachbau von Safari ab 16.4: im Modus „playback“ verweigert getUserMedia das Mikrofon
  await page.addInitScript(() => {
    const session = { type: 'auto' };
    Object.defineProperty(navigator, 'audioSession', { value: session, configurable: true });
    const original = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = (c) =>
      session.type === 'playback' ? Promise.reject(new DOMException('playback', 'NotAllowedError')) : original(c);
  });
  await page.goto('#/stimmen');
  // erst einen Ton abspielen: legt den Audio-Kontext an und stellt den Modus auf „playback“
  await page.locator('.sname').first().click();
  await page.getByRole('button', { name: /Zuhören/ }).click();
  await page.getByRole('button', { name: 'Ja, hör zu!' }).click();
  await expect(page.locator('.tuner-note')).toHaveText('E', { timeout: 8000 });
  await expect(page.getByText('Ich kann nichts hören')).toHaveCount(0);
});
