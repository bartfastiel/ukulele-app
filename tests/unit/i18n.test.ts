import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { DICTS, detectLang, ordinal, noteText, setLang, t, tp, tParts } from '../../src/i18n.ts';

function sources(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name !== 'i18n') out.push(...sources(p));
    } else if (p.endsWith('.ts')) out.push(p);
  }
  return out;
}

/** Inhalt eines '…'-Literals ab Position i (zeigt auf das öffnende '). */
function literal(src: string, i: number): { text: string; end: number } {
  let text = '';
  let j = i + 1;
  while (j < src.length && src[j] !== "'") {
    if (src[j] === '\\') {
      text += src[j + 1];
      j += 2;
    } else text += src[j++];
  }
  return { text, end: j + 1 };
}

/** Alle Schlüssel aus t('…'), tk('…'), tParts('…') und tp(n, '…', '…') im Quelltext. */
function usedKeys(): Map<string, string> {
  const keys = new Map<string, string>();
  for (const file of sources('src')) {
    const src = readFileSync(file, 'utf8');
    const one = /\b(?:t|tk|tParts)\(\s*'/g;
    let m: RegExpExecArray | null;
    while ((m = one.exec(src))) keys.set(literal(src, m.index + m[0].length - 1).text, file);
    const plural = /\btp\(\s*[^,']+,\s*'/g;
    while ((m = plural.exec(src))) {
      const a = literal(src, m.index + m[0].length - 1);
      keys.set(a.text, file);
      const rest = /^\s*,\s*'/.exec(src.slice(a.end));
      if (!rest) throw new Error(`tp() ohne zweites Literal in ${file}`);
      keys.set(literal(src, a.end + rest[0].length - 1).text, file);
    }
    // nur Literale lassen sich prüfen: t(`…`) oder t("…") wäre für den Test unsichtbar
    assert.ok(!/\b(?:t|tk|tParts)\(\s*[`"]/.test(src), `t() mit \` oder " in ${file} – bitte '…' verwenden`);
  }
  return keys;
}

const placeholders = (s: string) => (s.match(/\{\w+\}/g) || []).slice().sort().join(' ');

test('jeder Text im Code hat eine englische und eine französische Übersetzung mit denselben Platzhaltern', () => {
  const keys = usedKeys();
  assert.ok(keys.size > 300, `nur ${keys.size} Schlüssel gefunden`);
  for (const l of Object.keys(DICTS)) {
    const dict = DICTS[l];
    const missing = Array.from(keys.keys()).filter((k) => typeof dict[k] !== 'string' || !dict[k].trim());
    assert.deepEqual(missing, [], `${l}: fehlende Übersetzungen`);
    for (const k of keys.keys()) assert.equal(placeholders(dict[k]), placeholders(k), `${l}: Platzhalter in „${k}“`);
    const unused = Object.keys(dict).filter((k) => !keys.has(k));
    assert.deepEqual(unused, [], `${l}: Übersetzungen ohne Verwendung im Code`);
  }
});

test('Übersetzungen klingen nie nach „falsch“', () => {
  for (const l of Object.keys(DICTS))
    for (const k of Object.keys(DICTS[l])) assert.ok(!/\bwrong\b|\bfaux\b|\bfausse\b/i.test(DICTS[l][k]), `${l}: „${DICTS[l][k]}“`);
});

test('Sprache des Geräts: de* und fr* werden erkannt, alles andere wird Englisch', () => {
  assert.equal(detectLang(['de-AT', 'en']), 'de');
  assert.equal(detectLang(['fr-CA']), 'fr');
  assert.equal(detectLang(['es-ES', 'fr-FR']), 'fr');
  assert.equal(detectLang(['es-ES']), 'en');
  assert.equal(detectLang([]), 'en');
});

test('t(): Platzhalter, Rückfall auf Deutsch, Mehrzahl, Ordnungszahlen, Tonnamen', () => {
  try {
    setLang('de');
    assert.equal(t('Takt {n} von 12', { n: 3 }), 'Takt 3 von 12');
    assert.equal(t('gibt es nicht {x}', { x: 1 }), 'gibt es nicht 1');
    assert.equal(ordinal(3), '3.');
    assert.equal(noteText('G'), 'G');
    setLang('en');
    assert.equal(t('Takt {n} von 12', { n: 3 }), 'Bar 3 of 12');
    assert.equal(t('gibt es nicht'), 'gibt es nicht');
    assert.equal(tp(1, '{n} Blues-Ton – klingt gut!', '{n} Blues-Töne – klingt gut!'), '1 blues note – sounds great!');
    assert.equal(tp(2, '{n} Blues-Ton – klingt gut!', '{n} Blues-Töne – klingt gut!'), '2 blues notes – sounds great!');
    assert.deepEqual([1, 2, 3, 4, 11, 22].map(ordinal), ['1st', '2nd', '3rd', '4th', '11th', '22nd']);
    setLang('fr');
    assert.equal(tp(0, '{n} Blues-Ton – klingt gut!', '{n} Blues-Töne – klingt gut!').indexOf('0 note'), 0);
    assert.equal(ordinal(1), '1re');
    assert.equal(noteText('G'), 'Sol');
    assert.equal(noteText('Bb'), 'Sib');
    // französische Typografie: schmales geschütztes Leerzeichen vor ! ? : ;
    assert.ok(/ !$/.test(t('Geschafft!')), t('Geschafft!'));
    assert.deepEqual(tParts('Spiel jetzt {chord}', { chord: 42 }), ['Joue ', 42]);
  } finally {
    setLang('de');
  }
});
