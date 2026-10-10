import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ARTICLES, articlesFor } from '../../src/content/wissen.ts';
import type { Article, Block, InstrumentId, L10n, ToolId } from '../../src/content/types.ts';
import { SONGS } from '../../src/music/songs.ts';
import { parseChordName } from '../../src/music/chords.ts';

const LANGS = ['de', 'en', 'fr'] as const;
const INSTRUMENTS: InstrumentId[] = ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline'];
const TOOLS: ToolId[] = ['stimmen', 'rhythmus', 'spiel', 'blues', 'detektiv', 'akkorde', 'lieder', 'eigenes-lied'];
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const songIds = new Set(SONGS.map((s) => s.id));
const byId = new Map(ARTICLES.map((a) => [a.id, a]));

function texts(b: Block): L10n[] {
  if ('h2' in b) return [b.h2];
  if ('p' in b) return [b.p];
  if ('tip' in b) return [b.tip];
  if ('ul' in b) return b.ul;
  if ('ol' in b) return b.ol;
  return [];
}

function allTexts(a: Article): L10n[] {
  return [a.slug, a.title, a.description].concat(a.blocks.flatMap(texts));
}

interface Link {
  kind: string;
  target: string;
  lang: string;
}

function links(a: Article): Link[] {
  const out: Link[] = [];
  for (const t of a.blocks.flatMap(texts))
    for (const lang of LANGS)
      for (const m of t[lang].matchAll(/\]\(([a-z-]+):([^)]*)\)/g)) out.push({ kind: m[1], target: m[2], lang });
  return out;
}

test('Artikel-ids sind eindeutig und wohlgeformt', () => {
  assert.equal(byId.size, ARTICLES.length);
  for (const a of ARTICLES) assert.match(a.id, SLUG, a.id);
});

test('Slugs sind je Sprache und Instrument eindeutig und nur a-z0-9-', () => {
  for (const inst of INSTRUMENTS)
    for (const lang of LANGS) {
      const seen = new Map<string, string>();
      for (const a of articlesFor(inst)) {
        const slug = a.slug[lang];
        assert.match(slug, SLUG, `${a.id} (${lang})`);
        assert.ok(!seen.has(slug), `${inst}/${lang}: ${slug} doppelt (${seen.get(slug)}, ${a.id})`);
        seen.set(slug, a.id);
      }
    }
});

test('jede Sprache ist in jedem Text ausgefüllt', () => {
  for (const a of ARTICLES)
    for (const t of allTexts(a))
      for (const lang of LANGS) assert.ok(t[lang] && t[lang].trim(), `${a.id}: leerer Text (${lang}) bei ${t.de}`);
});

test('Beschreibungen sind 80–170 Zeichen lang', () => {
  for (const a of ARTICLES)
    for (const lang of LANGS) {
      const n = a.description[lang].length;
      assert.ok(n >= 80 && n <= 170, `${a.id} (${lang}): ${n} Zeichen`);
    }
});

test('jeder Artikel gehört zu mindestens einem Instrument und hat Inhalt', () => {
  for (const a of ARTICLES) {
    assert.ok(a.instruments.length > 0, a.id);
    for (const i of a.instruments) assert.ok(INSTRUMENTS.indexOf(i) >= 0, `${a.id}: ${i}`);
    assert.ok(a.blocks.length >= 4, a.id);
  }
});

test('verwandte Artikel teilen ein Instrument, wissen:-Links gibt es für alle Instrumente des Artikels', () => {
  for (const a of ARTICLES) {
    for (const id of a.related || []) {
      const b = byId.get(id);
      assert.ok(b, `${a.id}: unbekannter verwandter Artikel ${id}`);
      assert.ok(id !== a.id, `${a.id} verweist auf sich selbst`);
      if (!b) continue;
      assert.ok(
        a.instruments.some((i) => b.instruments.indexOf(i) >= 0),
        `${a.id} → ${id}: kein gemeinsames Instrument`,
      );
    }
    for (const l of links(a)) {
      if (l.kind !== 'wissen') continue;
      const b = byId.get(l.target);
      assert.ok(b, `${a.id}: Link auf unbekannten Artikel ${l.target}`);
      if (!b) continue;
      for (const i of a.instruments) assert.ok(b.instruments.indexOf(i) >= 0, `${a.id} → ${l.target}: fehlt für ${i}`);
    }
  }
});

test('Inline-Links sind gültig (lied, tool, chord) und in allen Sprachen dieselben', () => {
  for (const a of ARTICLES) {
    const all = links(a);
    for (const l of all) {
      if (l.kind === 'lied') assert.ok(songIds.has(l.target), `${a.id}: unbekanntes Lied ${l.target}`);
      else if (l.kind === 'tool')
        assert.ok(TOOLS.indexOf(l.target as ToolId) >= 0, `${a.id}: unbekanntes Werkzeug ${l.target}`);
      else if (l.kind === 'chord') assert.ok(parseChordName(l.target), `${a.id}: unbekannter Akkord ${l.target}`);
      else assert.equal(l.kind, 'wissen', `${a.id}: unbekannte Linkart ${l.kind}`);
    }
    const key = (lang: string) =>
      all
        .filter((l) => l.lang === lang)
        .map((l) => l.kind + ':' + l.target)
        .sort()
        .join(' ');
    assert.equal(key('en'), key('de'), `${a.id}: Links en ≠ de`);
    assert.equal(key('fr'), key('de'), `${a.id}: Links fr ≠ de`);
  }
});

test('Akkord- und Werkzeug-Blöcke sind gültig', () => {
  for (const a of ARTICLES)
    for (const b of a.blocks) {
      if ('chord' in b) assert.ok(parseChordName(b.chord), `${a.id}: ${b.chord}`);
      if ('tool' in b) assert.ok(TOOLS.indexOf(b.tool) >= 0, `${a.id}: ${b.tool}`);
    }
});

test('Texte bewerten nie mit „falsch“', () => {
  for (const a of ARTICLES)
    for (const t of allTexts(a)) {
      assert.ok(!/falsch/i.test(t.de), `${a.id}: ${t.de}`);
      assert.ok(!/\bwrong\b/i.test(t.en), `${a.id}: ${t.en}`);
    }
});

test('mindestens 8 Artikel je Instrument', () => {
  for (const inst of INSTRUMENTS) assert.ok(articlesFor(inst).length >= 8, `${inst}: ${articlesFor(inst).length}`);
});
