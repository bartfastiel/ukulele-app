// Baut dist/: gebündeltes, minifiziertes JS und CSS mit Inhalts-Hash, index.html, Service Worker, statische Dateien.
// `--serve` baut bei jeder Änderung neu und liefert dist/ auf http://localhost:5173 aus.
import { build, context } from 'esbuild';
import { createHash } from 'node:crypto';
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { serve } from './serve.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
// Alte iPads (iOS 12) und ältere Android-Browser sollen die App noch ausführen können.
const TARGET = ['es2017', 'safari12', 'chrome70', 'firefox68'];

const options = {
  entryPoints: { app: join(root, 'src/main.ts'), style: join(root, 'src/styles.css') },
  bundle: true,
  minify: true,
  target: TARGET,
  write: false,
  outdir: join(dist, 'assets'),
  legalComments: 'none',
  logLevel: 'warning',
};

function emit(result) {
  rmSync(dist, { recursive: true, force: true });
  mkdirSync(join(dist, 'assets'), { recursive: true });
  cpSync(join(root, 'public'), dist, { recursive: true });
  const names = {};
  for (const file of result.outputFiles) {
    const hash = createHash('sha256').update(file.contents).digest('hex').slice(0, 10);
    const ext = file.path.endsWith('.css') ? 'css' : 'js';
    const name = `assets/app-${hash}.${ext}`;
    writeFileSync(join(dist, name), file.contents);
    names[ext] = name;
  }
  const html = readFileSync(join(root, 'index.html'), 'utf8').replace('__CSS__', names.css).replace('__JS__', names.js);
  writeFileSync(join(dist, 'index.html'), html);
  const files = ['./', ...readdirSync(dist).filter((f) => f !== 'assets' && f !== 'index.html'), names.js, names.css];
  const version = createHash('sha256').update(files.join('|') + html).digest('hex').slice(0, 10);
  const sw = readFileSync(join(root, 'src/sw.js'), 'utf8').replace('__VERSION__', version).replace('__FILES__', JSON.stringify(files));
  writeFileSync(join(dist, 'sw.js'), sw);
  const size = result.outputFiles.reduce((s, f) => s + f.contents.length, 0);
  console.log(`dist/ gebaut: ${names.js}, ${names.css} (${(size / 1024).toFixed(1)} KiB JS+CSS)`);
}

if (process.argv.includes('--serve')) {
  const ctx = await context({
    ...options,
    plugins: [{ name: 'emit', setup: (b) => b.onEnd((r) => r.errors.length || emit(r)) }],
  });
  await ctx.watch();
  serve(dist, 5173);
} else {
  emit(await build(options));
}
