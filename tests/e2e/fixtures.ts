import { test as base, expect } from '@playwright/test';

/**
 * Die Tests öffnen Seiten oft über frühere Adressen (#/lied/…); die App leitet sie auf die echten Seiten um. page.goto
 * wartet hier, bis die Weiterleitung durch ist – sonst prüft ein langsamer Browser noch die Zwischenseite.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    const goto = page.goto.bind(page);
    page.goto = async (url, options) => {
      const res = await goto(url, options);
      if (/#\//.test(url)) await page.waitForURL((u) => !/^#\//.test(u.hash), { timeout: 15000 });
      return res;
    };
    await use(page);
  },
});

export { expect };
export type { Page } from '@playwright/test';

/**
 * WebKit meldet beim schnellen Seitenwechsel abgebrochene Ladevorgänge der Holztextur (blob:) und einen beendeten
 * Audio-Kontext als Fehler. Beides passiert nur, wenn die Seite verlassen wird, und ist für Nutzer unsichtbar.
 */
export function navigationNoise(message: string): boolean {
  return /^blob:|due to access control checks|Context is stopped/.test(message);
}
