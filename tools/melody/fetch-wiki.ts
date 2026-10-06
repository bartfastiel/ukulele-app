// Lädt den Wikipedia-Quelltext je Lied (folgt Weiterleitungen) in einen Cache-Ordner außerhalb des Repos.
//   node tools/melody/fetch-wiki.ts <cache-ordner>
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { WIKI } from './sources.ts';

const dir = process.argv[2];
mkdirSync(dir, { recursive: true });

async function raw(lang: string, title: string, depth = 0): Promise<string> {
  const url = `https://${lang}.wikipedia.org/w/index.php?title=${encodeURIComponent(decodeURIComponent(title))}&action=raw`;
  const res = await fetch(url, { headers: { 'User-Agent': 'ukulele-app-melody-import/1.0 (privates Open-Source-Projekt)' } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const text = await res.text();
  const redirect = /^#(?:REDIRECT|WEITERLEITUNG)\s*\[\[([^\]|#]+)/i.exec(text);
  if (redirect && depth < 3) return raw(lang, redirect[1].trim().replace(/ /g, '_'), depth + 1);
  return text;
}

for (const id of Object.keys(WIKI)) {
  const file = join(dir, `${id}.txt`);
  if (existsSync(file)) continue;
  const parts = WIKI[id].split(':');
  try {
    const text = await raw(parts[0], parts.slice(1).join(':'));
    writeFileSync(file, text);
    const scores = (text.match(/<score/g) || []).length;
    const lyrics = /\\addlyrics|\\lyricsto|\\lyricmode/.test(text);
    console.log(`${id.padEnd(28)} ${scores} Notenbeispiel(e)${lyrics ? ' mit Text' : ''}`);
  } catch (e) {
    console.log(`${id.padEnd(28)} FEHLER ${(e as Error).message}`);
  }
  await new Promise((r) => setTimeout(r, 400));
}
