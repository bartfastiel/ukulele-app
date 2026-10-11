// Sucht Seiten mit Notenbeispiel (<score>) in einem Wiki und legt deren Quelltext im Cache ab, daneben
// <id>@<tag>.src mit „host|Seitentitel|Revision“ für den Nachweis.
//   node tools/melody/search-wiki.ts <cache-ordner> <id> <host> "<suchbegriffe>"
//   z. B. … mond-ist-aufgegangen de.wikisource.org "Mond aufgegangen"
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fetchPage, json } from './wiki-api.ts';

const dir = process.argv[2];
const id = process.argv[3];
const host = process.argv[4];
const query = process.argv[5];
mkdirSync(dir, { recursive: true });

const api = `https://${host}/w/api.php?format=json&formatversion=2`;
const found = await json(`${api}&action=query&list=search&srlimit=10${host.includes('wikisource') ? '&srnamespace=0|104' : ''}&srsearch=${encodeURIComponent(`${query} insource:/\\<score/`)}`);
let n = 0;
for (const hit of found.query.search) {
  const page = await fetchPage(host, hit.title);
  if (!page) continue;
  const scores = (page.text.match(/<score/g) || []).length;
  const tag = `${host.split('.')[0]}${host.includes('wikisource') ? 's' : ''}${++n}`;
  writeFileSync(join(dir, `${id}@${tag}.txt`), page.text);
  // Herkunft für import.ts
  writeFileSync(join(dir, `${id}@${tag}.src`), `${host}|${page.title}|${page.revid}`);
  console.log(`${tag.padEnd(6)} ${hit.title}  (${scores} Notenbeispiel(e))`);
  await new Promise((r) => setTimeout(r, 1000));
}
if (!n) console.log('nichts gefunden');
