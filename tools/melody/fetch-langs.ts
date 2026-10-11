// Sucht Notenbeispiele in den anderen Sprachversionen eines Wikipedia-Artikels (Sprachlinks des Artikels aus
// sources.ts) und legt die Quelltexte mit <score> als <id>@<sprache>.txt in den Cache-Ordner, daneben <id>@<sprache>.src
// mit „host|Seitentitel|Revision“ für den Nachweis.
//   node tools/melody/fetch-langs.ts <cache-ordner> [id …]
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { WIKI } from './sources.ts';
import { fetchPage, json } from './wiki-api.ts';

const dir = process.argv[2];
const only = process.argv.slice(3);
mkdirSync(dir, { recursive: true });

for (const id of only.length ? only : Object.keys(WIKI)) {
  const parts = WIKI[id].split(':');
  const lang = parts[0];
  const title = decodeURIComponent(parts.slice(1).join(':')).replace(/_/g, ' ');
  try {
    const data = await json(
      `https://${lang}.wikipedia.org/w/api.php?action=query&prop=langlinks&lllimit=500&redirects=1&format=json&formatversion=2&titles=${encodeURIComponent(title)}`,
    );
    const page = data.query.pages[0];
    const links: { lang: string; title: string }[] = (page.langlinks || []).concat([{ lang, title }]);
    const found: string[] = [];
    for (const l of links) {
      const file = join(dir, `${id}@${l.lang}.txt`);
      if (existsSync(file)) {
        found.push(l.lang);
        continue;
      }
      const host = `${l.lang}.wikipedia.org`;
      const got = await fetchPage(host, l.title);
      if (got && /<score/.test(got.text)) {
        writeFileSync(file, got.text);
        writeFileSync(join(dir, `${id}@${l.lang}.src`), `${host}|${got.title}|${got.revid}`);
        found.push(l.lang);
      }
      await new Promise((r) => setTimeout(r, 1000));
    }
    console.log(`${id.padEnd(28)} ${page.missing ? 'Artikel fehlt' : `${links.length} Sprachen, Notenbeispiel: ${found.join(' ') || '–'}`}`);
  } catch (e) {
    console.log(`${id.padEnd(28)} FEHLER ${(e as Error).message}`);
  }
}
