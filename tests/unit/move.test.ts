import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';
import { movedPage } from '../../src/site/move.ts';

const TARGET = 'https://neu.example/ukulele/lieder/';

class Mem {
  data: Record<string, string> = {};
  getItem(k: string): string | null {
    return k in this.data ? this.data[k] : null;
  }
  setItem(k: string, v: string): void {
    this.data[k] = String(v);
  }
}

/** Das Skript der Umzugsseite wie im Browser ausführen; liefert die Zieladresse. */
function runMoved(storage: Mem, hash = ''): string {
  const html = movedPage(TARGET, 'ukulele');
  const script = html.slice(html.indexOf('<script>') + 8, html.indexOf('</script>'));
  let went = '';
  runInNewContext(script, {
    localStorage: storage,
    location: { hash, replace: (u: string) => (went = u) },
    btoa,
    unescape,
    encodeURIComponent,
  });
  return went;
}

test('Umzugsseite: canonical auf die neue Adresse, ohne Daten schlicht weiter', () => {
  const html = movedPage(TARGET, 'ukulele');
  assert.ok(html.indexOf(`<link rel="canonical" href="${TARGET}">`) > 0);
  assert.equal(runMoved(new Mem()), TARGET);
});

test('Umzugsseite: ein geteiltes Lied hinter dem # geht vor', () => {
  const s = new Mem();
  s.setItem('ukulele-club:v1', '{"stars":{"a":3}}');
  assert.equal(runMoved(s, '#abc'), TARGET + '#abc');
});

test('Umzug: Sterne, Übungstage und eigene Lieder kommen an und werden mit Vorhandenem zusammengeführt', async () => {
  const old = new Mem();
  old.setItem('ukulele-club:v1', JSON.stringify({ stars: { a: 3, b: 1 }, days: ['2026-01-02'], bestHunt: { x: 9 } }));
  old.setItem(
    'ukulele-club:eigene-lieder',
    JSON.stringify({ version: 1, songs: [{ id: 'mein-lied', title: 'Mein Lied', text: '[C]la la', created: 1, updated: 1 }] }),
  );
  const went = runMoved(old);
  assert.ok(went.indexOf(TARGET + '#umzug=') === 0, went);

  // neue Seite: schon etwas geübt
  const fresh = new Mem();
  fresh.setItem('saiten:ukulele:v1', JSON.stringify({ stars: { a: 1, c: 2 }, days: ['2026-02-03'], bestHunt: { x: 4 } }));
  const g = globalThis as unknown as Record<string, unknown>;
  g.localStorage = fresh;
  const store = await import('../../src/store.ts');
  assert.equal(store.takeMoved(went.slice(went.indexOf('#umzug=') + 7)), true);
  const p = store.load();
  assert.deepEqual(p.stars, { a: 3, b: 1, c: 2 });
  assert.deepEqual(p.days, ['2026-01-02', '2026-02-03']);
  assert.equal(p.bestHunt.x, 9);
  assert.equal(JSON.parse(fresh.getItem('saiten:ukulele:v1')!).stars.b, 1);
  assert.deepEqual(
    store.ownSongs().map((s) => s.id),
    ['mein-lied'],
  );
  assert.equal(store.takeMoved('kaputt'), false);
});
