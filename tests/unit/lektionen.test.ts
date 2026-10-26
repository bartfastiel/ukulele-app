import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { COURSES, type Course, type Lesson, type Play } from '../../src/content/lektionen.ts';
import { COURSE_INSTRUMENTS, COURSE_TITLES } from '../../src/content/kurse.ts';
import { ARTICLES } from '../../src/content/wissen.ts';
import type { L10n } from '../../src/content/types.ts';
import { SONGS } from '../../src/music/songs.ts';
import { CHORDS, parseChordName } from '../../src/music/chords.ts';
import { LEVELS } from '../../src/music/blues.ts';
import { instrument, setInstrument } from '../../src/music/instrument.ts';
import { canonicalChord } from '../../src/site/routes.ts';
import { capoHint, shiftToKey, transposeSong } from '../../src/music/transpose.ts';
import { renderSite, type BuildEnv } from '../../src/site/pages.ts';

const LANGS = ['de', 'en', 'fr'] as const;
const TOOLS = ['stimmen', 'rhythmus', 'spiel', 'blues', 'detektiv', 'akkorde', 'lieder', 'eigenes-lied', 'powerchords'];
const RHYTHM_SRC = readFileSync('src/views/rhythm.ts', 'utf8');

function texts(x: Lesson): L10n[] {
  return [x.title, x.goal, x.piece.text].concat(x.review ? [x.review] : [], x.steps, x.homework, x.done, x.trouble, x.teacher, x.sheet);
}

function eachCourse(f: (c: Course) => void): void {
  for (const c of COURSES) {
    setInstrument(c.instrument);
    try {
      f(c);
    } finally {
      setInstrument('ukulele');
    }
  }
}

const song = (id: string) => SONGS.filter((s) => s.id === id)[0];

test('Kurse: Liste für die App stimmt, Nummern lückenlos ab 1, Abschnitte aufsteigend', () => {
  assert.deepEqual(COURSE_INSTRUMENTS.slice().sort(), COURSES.map((c) => c.instrument).sort());
  // Titel für die Lernweg-Karte der Startseite: gleich wie in den Kursen
  for (const c of COURSES) assert.deepEqual(COURSE_TITLES[c.instrument], c.lessons.map((x) => x.title), c.instrument);
  for (const c of COURSES) {
    assert.ok(c.lessons.length >= 20 && c.lessons.length <= 30, `${c.instrument}: ${c.lessons.length} Lektionen`);
    c.lessons.forEach((x, i) => assert.equal(x.n, i + 1, `${c.instrument}: Lektion an Stelle ${i + 1} hat Nummer ${x.n}`));
    assert.equal(c.parts[0].from, 1, c.instrument);
    for (let i = 1; i < c.parts.length; i++) assert.ok(c.parts[i].from > c.parts[i - 1].from && c.parts[i].from <= c.lessons.length, `${c.instrument}: Abschnitt ${i}`);
  }
});

test('Lektionen: jeder Text in allen drei Sprachen, nie „falsch“, knapp genug fürs Druckblatt', () => {
  for (const c of COURSES)
    for (const x of c.lessons) {
      const id = `${c.instrument} ${x.n}`;
      for (const tx of texts(x).concat(c.parts.map((p) => p.title)))
        for (const l of LANGS) assert.ok(tx[l] && tx[l].trim(), `${id}: leer (${l}) bei ${tx.de}`);
      for (const tx of texts(x)) {
        assert.ok(!/falsch/i.test(tx.de), `${id}: ${tx.de}`);
        assert.ok(!/\bwrong\b/i.test(tx.en), `${id}: ${tx.en}`);
        assert.ok(!/\bfaux\b|\bfausse\b/i.test(tx.fr), `${id}: ${tx.fr}`);
      }
      if (x.n > 1) assert.ok(x.review, `${id}: Wiederholung fehlt`);
      assert.ok(x.sheet.length >= 2 && x.sheet.length <= 4, `${id}: ${x.sheet.length} Schritte auf dem Blatt`);
      assert.ok(x.homework.length >= 3 && x.homework.length <= 5, `${id}: Hausaufgabe`);
      assert.ok(x.done.length >= 1 && x.done.length <= 3, `${id}: Geschafft-Kriterien`);
      assert.equal(x.teacher.length, 3, `${id}: Ablauf in der Stunde`);
      assert.ok(x.trouble.length >= 1, `${id}: Tipps bei Problemen`);
      assert.ok(x.piece.play.length >= 1, `${id}: nichts zum Mitspielen`);
      // das Blatt zeigt Links nur als Text – dort keine Verweise
      for (const tx of x.sheet.concat(x.homework, x.done)) for (const l of LANGS) assert.ok(!/\]\(/.test(tx[l]), `${id}: Link auf dem Blatt: ${tx[l]}`);
    }
});

test('Lektionen: Links führen auf Lieder, Werkzeuge, Akkorde, Artikel und Lektionen, die es gibt – in allen Sprachen dieselben', () => {
  for (const c of COURSES) {
    const articles = ARTICLES.filter((a) => a.instruments.indexOf(c.instrument) >= 0).map((a) => a.id);
    for (const x of c.lessons) {
      const id = `${c.instrument} ${x.n}`;
      const keys: Record<string, string> = {};
      for (const l of LANGS) {
        const found: string[] = [];
        for (const tx of texts(x))
          for (const m of tx[l].matchAll(/\]\(([a-z-]+):([^)]*)\)/g)) {
            const kind = m[1];
            const target = m[2];
            found.push(kind + ':' + target);
            if (kind === 'lied') assert.ok(song(target), `${id}: Lied ${target}`);
            else if (kind === 'tool') assert.ok(TOOLS.indexOf(target) >= 0, `${id}: Werkzeug ${target}`);
            else if (kind === 'chord') assert.ok(parseChordName(target), `${id}: Akkord ${target}`);
            else if (kind === 'wissen') assert.ok(articles.indexOf(target) >= 0, `${id}: Artikel ${target}`);
            else if (kind === 'lektion') assert.ok(c.lessons.some((y) => String(y.n) === target), `${id}: Lektion ${target}`);
            else assert.ok(false, `${id}: Linkart ${kind}`);
          }
        keys[l] = found.sort().join(' ');
      }
      assert.equal(keys.en, keys.de, `${id}: Links en ≠ de`);
      assert.equal(keys.fr, keys.de, `${id}: Links fr ≠ de`);
      for (const w of x.wissen || []) assert.ok(articles.indexOf(w) >= 0, `${id}: Artikel ${w}`);
    }
  }
});

test('Lektionen: neue Griffe gibt es auf dem Instrument, Werkzeug-Einstellungen gibt es in der App', () => {
  eachCourse((c) => {
    for (const x of c.lessons) {
      const id = `${c.instrument} ${x.n}`;
      for (const name of x.chords || []) {
        const p = parseChordName(name);
        assert.ok(p, `${id}: ${name}`);
        const inLibrary = CHORDS.some((ch) => ch.name === canonicalChord(name));
        const shape = p && instrument().shapes[p.quality];
        assert.ok(inLibrary || shape, `${id}: ${name} gibt es auf ${c.instrument} nicht`);
      }
      for (const play of x.piece.play) {
        const y = play as { song?: string; key?: string; tool?: string; pattern?: string; chords?: string[]; level?: number };
        if (y.song) {
          assert.ok(song(y.song), `${id}: Lied ${y.song}`);
          if (y.key) assert.ok(shiftToKey(song(y.song), y.key) !== null, `${id}: Tonart ${y.key}`);
          continue;
        }
        assert.ok(TOOLS.indexOf(y.tool || '') >= 0, `${id}: Werkzeug ${y.tool}`);
        if (y.tool === 'powerchords') assert.ok(instrument().shapes['5'], `${id}: Powerchords gibt es nur auf der Gitarre`);
        if (y.tool === 'rhythmus') assert.ok(RHYTHM_SRC.indexOf(`name: tk('${y.pattern}')`) >= 0, `${id}: Rhythmus-Muster „${y.pattern}“`);
        if (y.tool === 'spiel') assert.ok(instrument().game.some((g) => g.join(' ') === (y.chords || []).join(' ')), `${id}: Akkord-Spiel ${y.chords}`);
        if (y.tool === 'blues') assert.ok(y.level && y.level >= 1 && y.level <= LEVELS.length && parseChordName(String(y.key)), `${id}: Blues`);
      }
    }
  });
});

test('Lieder einer Lektion brauchen nur Griffe, die bis dahin eingeführt sind (in der verlinkten Tonart, mit Kapo gegriffen)', () => {
  eachCourse((c) => {
    const known: string[] = [];
    for (const x of c.lessons) {
      for (const name of x.chords || []) known.push(canonicalChord(name));
      for (const play of x.piece.play as (Play & { song?: string; key?: string; capo?: number })[]) {
        if (!play.song) continue;
        const s = song(play.song);
        const shift = play.key ? shiftToKey(s, play.key)! : 0;
        const grip = transposeSong(s, shift - (play.capo || 0));
        const missing = grip.chords.map(canonicalChord).filter((ch) => known.indexOf(ch) < 0);
        assert.deepEqual(missing, [], `${c.instrument} ${x.n}: ${play.song}${play.key ? ' in ' + play.key : ''} braucht noch nicht eingeführte Griffe`);
        // mit Kapo: die App schlägt genau diesen Kapodaster vor
        if (play.capo) assert.equal((capoHint(s, shift) || { capo: 0 }).capo, play.capo, `${c.instrument} ${x.n}: Kapo-Hinweis`);
      }
    }
  });
});

const env: BuildEnv = {
  url: (s) => `/${s}/`,
  publicUrl: (s) => `https://example.org/${s}/`,
  preview: false,
  assets: { js: 'assets/app.js', css: 'assets/app.css' },
  sites: ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline', 'bass', 'start'],
};

test('Seiten: Übersicht und jede Lektion in drei Sprachen vorgerendert, mit Druckblatt, QR-Code und strukturierten Daten', () => {
  for (const c of COURSES) {
    const pages = renderSite(c.instrument, env);
    const page = (f: string) => pages.filter((p) => p.file === f)[0];
    for (const f of ['lektionen/index.html', 'en/lessons/index.html', 'fr/lecons/index.html']) assert.ok(page(f) && page(f).url, `${c.instrument}/${f}`);
    const overview = page('lektionen/index.html').html;
    assert.ok(overview.indexOf('"@type":"Course"') >= 0, 'Course-JSON-LD');
    assert.ok(overview.indexOf('data-page="lektionen"') >= 0);
    for (const x of c.lessons) {
      for (const f of [`lektion/${x.n}/index.html`, `en/lesson/${x.n}/index.html`, `fr/lecon/${x.n}/index.html`]) {
        const p = page(f);
        assert.ok(p && p.url, `${c.instrument}/${f}`);
        assert.ok(p.html.indexOf('class="lesson-sheet"') >= 0, `${f}: Druckblatt`);
        assert.ok(p.html.indexOf('class="sheet-qr"') >= 0, `${f}: QR-Code`);
        assert.ok(p.html.indexOf('"@type":"LearningResource"') >= 0, `${f}: JSON-LD`);
        assert.ok(p.html.indexOf('data-page="lektion"') >= 0, `${f}: data-page`);
      }
      assert.ok(overview.indexOf(`href="/${c.instrument}/lektion/${x.n}/"`) >= 0, `Übersicht verlinkt Lektion ${x.n}`);
    }
    const title = /<title>([^<]*)<\/title>/.exec(page('lektion/4/index.html').html)![1];
    assert.match(title, /^(Ukulele|Gitarre) lernen: Lektion 4 – /);
    // auffindbar: Kachel auf der Startseite des Instruments, Fußzeile, Wissen
    assert.ok(page('index.html').html.indexOf(`href="/${c.instrument}/lektionen/"`) >= 0, 'Kachel/Fußzeile');
    assert.ok(page('wissen/index.html').html.indexOf(`href="/${c.instrument}/lektionen/"`) >= 0, 'Wissen');
  }
  const start = renderSite('start', env).filter((p) => p.file === 'index.html')[0].html;
  for (const c of COURSES) assert.ok(start.indexOf(`href="/${c.instrument}/lektionen/"`) >= 0, `Startseite → ${c.instrument}`);
  // Instrumente ohne Kurs bekommen keine Lektionsseiten
  assert.ok(!renderSite('banjo', env).some((p) => /^lektion/.test(p.file)));
});
