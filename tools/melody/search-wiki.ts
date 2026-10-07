// Sucht Seiten mit Notenbeispiel (<score>) in einem Wiki und legt deren Quelltext im Cache ab.
//   node tools/melody/search-wiki.ts <cache-ordner> <id> <host> "<suchbegriffe>"
//   z. B. … mond-ist-aufgegangen de.wikisource.org "Mond aufgegangen"
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2];
const id = process.argv[3];
const host = process.argv[4];
const query = process.argv[5];
mkdirSync(dir, { recursive: true });
const UA = { 'User-Agent': 'ukulele-app-melody-import/1.0 (privates Open-Source-Projekt)' };

async function json(url: string, attempt = 0): Promise<any> {
  const res = await fetch(url, { headers: UA });
  if (res.status === 429 && attempt < 6) {
    await new Promise((r) => setTimeout(r, 5000 * 2 ** attempt));
    return json(url, attempt + 1);
  }
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

const api = `https://${host}/w/api.php?format=json&formatversion=2`;
const found = await json(`${api}&action=query&list=search&srlimit=10${host.includes('wikisource') ? '&srnamespace=0|104' : ''}&srsearch=${encodeURIComponent(`${query} insource:/\\<score/`)}`);
let n = 0;
for (const hit of found.query.search) {
  const data = await json(`${api}&action=query&prop=revisions&rvprop=content&rvslots=main&titles=${encodeURIComponent(hit.title)}`);
  const text: string = data.query.pages[0].revisions[0].slots.main.content;
  const scores = (text.match(/<score/g) || []).length;
  const tag = `${host.split('.')[0]}${host.includes('wikisource') ? 's' : ''}${++n}`;
  writeFileSync(join(dir, `${id}@${tag}.txt`), text);
  // Herkunft für import.ts
  writeFileSync(join(dir, `${id}@${tag}.title`), `${host}|${hit.title}`);
  console.log(`${tag.padEnd(6)} ${hit.title}  (${scores} Notenbeispiel(e))`);
  await new Promise((r) => setTimeout(r, 1000));
}
if (!n) console.log('nichts gefunden');
