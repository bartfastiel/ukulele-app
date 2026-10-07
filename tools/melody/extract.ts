// Zieht die <score>-Blöcke (LilyPond) aus dem Wikipedia-Quelltext im Cache: <id>.txt → <id>-<n>.ly.
//   node tools/melody/extract.ts <cache-ordner>
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2];
for (const f of readdirSync(dir).filter((x) => x.endsWith('.txt'))) {
  const id = f.slice(0, -4);
  const text = readFileSync(join(dir, f), 'utf8');
  const re = /<score[^>]*>([\s\S]*?)<\/score>/g;
  let m: RegExpExecArray | null;
  let n = 0;
  while ((m = re.exec(text))) writeFileSync(join(dir, `${id}-${++n}.ly`), m[1]);
  if (n) console.log(`${id.padEnd(28)} ${n}`);
}
