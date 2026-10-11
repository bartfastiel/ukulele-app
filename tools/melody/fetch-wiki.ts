// Lädt den Wikipedia-Quelltext je Lied (folgt Weiterleitungen) in einen Cache-Ordner außerhalb des Repos. Neben
// <id>.txt steht <id>.src mit „host|Seitentitel|Revision“ – import.ts macht daraus den Nachweis (Permalink) im Lied.
//   node tools/melody/fetch-wiki.ts <cache-ordner>
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { WIKI } from './sources.ts';
import { fetchPage } from './wiki-api.ts';

const dir = process.argv[2];
mkdirSync(dir, { recursive: true });

for (const id of Object.keys(WIKI)) {
  const file = join(dir, `${id}.txt`);
  if (existsSync(file)) continue;
  const parts = WIKI[id].split(':');
  const host = `${parts[0]}.wikipedia.org`;
  try {
    const page = await fetchPage(host, decodeURIComponent(parts.slice(1).join(':')).replace(/_/g, ' '));
    if (!page) {
      console.log(`${id.padEnd(28)} Artikel fehlt`);
      continue;
    }
    writeFileSync(file, page.text);
    writeFileSync(join(dir, `${id}.src`), `${host}|${page.title}|${page.revid}`);
    const scores = (page.text.match(/<score/g) || []).length;
    const lyrics = /\\addlyrics|\\lyricsto|\\lyricmode/.test(page.text);
    console.log(`${id.padEnd(28)} ${scores} Notenbeispiel(e)${lyrics ? ' mit Text' : ''}`);
  } catch (e) {
    console.log(`${id.padEnd(28)} FEHLER ${(e as Error).message}`);
  }
  await new Promise((r) => setTimeout(r, 400));
}
