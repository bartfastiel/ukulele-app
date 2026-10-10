import { test } from 'node:test';
import assert from 'node:assert/strict';

class Mem {
  data: Record<string, string> = {};
  get length(): number {
    return Object.keys(this.data).length;
  }
  key(i: number): string | null {
    return Object.keys(this.data)[i] ?? null;
  }
  getItem(k: string): string | null {
    return k in this.data ? this.data[k] : null;
  }
  setItem(k: string, v: string): void {
    this.data[k] = String(v);
  }
}

const g = globalThis as unknown as Record<string, unknown>;
let n = 0;
/** Frisches Modul (eigener Zwischenspeicher) auf einem Speicher für das Instrument `inst`. */
async function storeOn(mem: Mem, inst: string) {
  g.localStorage = mem;
  g.document = { documentElement: { getAttribute: (k: string) => (k === 'data-instrument' ? inst : null) } };
  return import(`../../src/store.ts?fresh=${++n}`) as Promise<typeof import('../../src/store.ts')>;
}

test('Linkshänder gilt für alle Instrumente gemeinsam', async () => {
  const mem = new Mem();
  const uke = await storeOn(mem, 'ukulele');
  assert.equal(uke.load().settings.lefty, false);
  uke.save((p) => (p.settings.lefty = true));
  const guitar = await storeOn(mem, 'gitarre');
  assert.equal(guitar.load().settings.lefty, true);
  guitar.save((p) => (p.settings.lefty = false));
  assert.equal((await storeOn(mem, 'ukulele')).load().settings.lefty, false);
});

test('Linkshänder: frühere Wahl eines einzelnen Instruments (oder der alten Adresse) wird übernommen', async () => {
  const one = new Mem();
  one.setItem('saiten:banjo:v1', JSON.stringify({ stars: {}, settings: { lefty: true } }));
  assert.equal((await storeOn(one, 'gitarre')).load().settings.lefty, true);
  assert.equal(JSON.parse(one.getItem('saiten:einstellungen')!).lefty, true);

  const legacy = new Mem();
  legacy.setItem('ukulele-club:v1', JSON.stringify({ stars: {}, settings: { lefty: true } }));
  assert.equal((await storeOn(legacy, 'ukulele')).load().settings.lefty, true);

  const none = new Mem();
  none.setItem('saiten:ukulele:v1', JSON.stringify({ stars: {}, settings: { lefty: false } }));
  assert.equal((await storeOn(none, 'mandoline')).load().settings.lefty, false);
});
