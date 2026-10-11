import { test, expect, type Page } from './fixtures.ts';
import type { CDPSession } from '@playwright/test';

/**
 * Anschlagdynamik mit synthetischen Touch-Ereignissen (Chromium-CDP, nur auf den Handy-Projekten mit Touch): Was
 * kommt bei der Klangerzeugung an? Dafür merkt sich die Seite jeden Wert, der einem Gain bzw. einer Filterfrequenz
 * zugewiesen wird.
 */
test.skip(({ browserName, hasTouch }) => browserName !== 'chromium' || !hasTouch, 'CDP-Touch nur in Chromium mit Touch');

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const w = window as unknown as { __sets: { kind: string; v: number }[] };
    w.__sets = [];
    const owner = new WeakMap<AudioParam, string>();
    const proto = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext).prototype;
    const gain = proto.createGain;
    proto.createGain = function (this: AudioContext) {
      const n = gain.call(this);
      owner.set(n.gain, 'gain');
      return n;
    };
    const biquad = proto.createBiquadFilter;
    proto.createBiquadFilter = function (this: AudioContext) {
      const n = biquad.call(this);
      owner.set(n.frequency, 'cutoff');
      return n;
    };
    const d = Object.getOwnPropertyDescriptor(AudioParam.prototype, 'value')!;
    Object.defineProperty(AudioParam.prototype, 'value', {
      get: d.get,
      set(this: AudioParam, v: number) {
        const kind = owner.get(this);
        if (kind) w.__sets.push({ kind, v });
        d.set!.call(this, v);
      },
      configurable: true,
    });
  });
});

interface Struck {
  gain: number;
  cutoff: number;
}

async function openChord(page: Page): Promise<{ x: number; y: number }> {
  await page.goto('#/akkord/C');
  await page.goto(page.url().split('#')[0] + '?druck=1');
  const svg = page.locator('.diagram-big svg.playable');
  await svg.scrollIntoViewIfNeeded();
  const g = (await page.locator('.diagram-big .string[data-string="0"]').boundingBox())!;
  return { x: g.x + g.width / 2, y: g.y + g.height / 2 };
}

/** Ein Anschlag: Aufsetzen, Kraft/Fläche wachsen in drei Schritten bis `peak`, kurz liegen lassen, loslassen. */
async function tap(page: Page, cdp: CDPSession, at: { x: number; y: number }, peak: { radius: number; force: number }, start = { radius: 4, force: 0.04 }): Promise<Struck> {
  await page.evaluate(() => ((window as unknown as { __sets: unknown[] }).__sets.length = 0));
  const point = (p: number) => [
    {
      // ein echter Finger wackelt beim Aufsetzen um Bruchteile eines Pixels; ohne Bewegung meldet Chrome kein touchmove
      x: at.x + 0.4 * p,
      y: at.y,
      id: 1,
      radiusX: start.radius + (peak.radius - start.radius) * p,
      radiusY: start.radius + (peak.radius - start.radius) * p,
      force: start.force + (peak.force - start.force) * p,
    },
  ];
  // in einem Zug schicken, damit alle Messpunkte wie auf dem Gerät in die Wartezeit fallen
  await Promise.all(
    [0, 0.35, 0.7, 1].map((p) => cdp.send('Input.dispatchTouchEvent', { type: p ? 'touchMove' : 'touchStart', touchPoints: point(p) })),
  );
  await page.waitForTimeout(80);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await page.waitForTimeout(20);
  const sets = await page.evaluate(() => (window as unknown as { __sets: { kind: string; v: number }[] }).__sets);
  // hold(): ein Gain mit der Lautstärke (der Vibrato-Gain bleibt 0), ggf. ein Klangfilter unter 18 kHz
  const gains = sets.filter((s) => s.kind === 'gain' && s.v > 0).map((s) => s.v);
  const cutoffs = sets.filter((s) => s.kind === 'cutoff' && s.v < 18000).map((s) => s.v);
  expect(gains.length, 'ein Ton').toBeGreaterThan(0);
  return { gain: gains[gains.length - 1], cutoff: cutoffs.length ? Math.min.apply(null, cutoffs) : 18000 };
}

const dB = (g: number) => 20 * Math.log10(g);

test('Anschlag über die Kontaktfläche (Druck immer 1 wie auf manchen Android-Geräten): leicht leise und dunkel, fest laut und hell', async ({ page }) => {
  const at = await openChord(page);
  const cdp = await page.context().newCDPSession(page);
  const soft: Struck[] = [];
  const hard: Struck[] = [];
  for (let i = 0; i < 6; i++) {
    soft.push(await tap(page, cdp, at, { radius: 7 + (i % 2) * 0.3, force: 1 }, { radius: 4, force: 1 }));
    hard.push(await tap(page, cdp, at, { radius: 16 + (i % 2) * 0.3, force: 1 }, { radius: 5, force: 1 }));
  }
  const s = soft[soft.length - 1];
  const h = hard[hard.length - 1];
  expect(dB(h.gain) - dB(s.gain)).toBeGreaterThan(12);
  expect(s.cutoff).toBeLessThan(h.cutoff);
  await expect(page.locator('.strike-meter')).toContainText('dB');
  await expect(page.locator('.strike-meter')).toContainText('Fläche: erkannt');
});

test('Anschlag mit echter Kraft (Radius gleichbleibend): fest deutlich lauter', async ({ page }) => {
  const at = await openChord(page);
  const cdp = await page.context().newCDPSession(page);
  let s: Struck | null = null;
  let h: Struck | null = null;
  for (let i = 0; i < 6; i++) {
    s = await tap(page, cdp, at, { radius: 1, force: 0.15 + i * 0.002 }, { radius: 1, force: 0.03 });
    h = await tap(page, cdp, at, { radius: 1, force: 0.8 - i * 0.002 }, { radius: 1, force: 0.05 });
  }
  expect(dB(h!.gain) - dB(s!.gain)).toBeGreaterThan(12);
});

test('Anschlag ohne Sensor (Kraft und Radius immer gleich): jeder Ton gleich laut und unverändert hell', async ({ page }) => {
  const at = await openChord(page);
  const cdp = await page.context().newCDPSession(page);
  const all: Struck[] = [];
  for (let i = 0; i < 5; i++) {
    all.push(await tap(page, cdp, at, { radius: 1, force: 1 }, { radius: 1, force: 1 }));
    all.push(await tap(page, cdp, at, { radius: 1, force: 0 }, { radius: 1, force: 0 }));
  }
  for (const x of all) {
    expect(x.gain).toBeCloseTo(0.6, 5);
    expect(x.cutoff).toBe(18000);
  }
  await expect(page.locator('.strike-meter')).toContainText('ohne Sensor gleich laut');
});
