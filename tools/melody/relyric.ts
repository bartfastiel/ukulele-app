// Legt den geprüften Liedtext (ChordPro des Liedes, wörtlich nach der gemeinfreien Primärquelle) Silbe für Silbe auf die
// Noten einer importierten Melodie. Die Notenbeispiele bringen ihren eigenen Wortlaut mit („Der Jäger …“, „errathen“);
// angezeigt werden soll aber der Text, der in `origin` belegt ist. Die Silbengrenzen des Notentexts werden per
// Buchstabenabgleich auf unseren Text übertragen; Wiederholungen, die nur im Notenbeispiel ausgeschrieben sind, bekommen
// den Text ihres Vorbilds. Hat unser Text für eine Note keine eigene Silbe, klingt die vorige weiter (Melisma, `~`).
// import.ts wendet das auf jede neu eingelesene Melodie an. Ohne Notenbeispiel-Cache (z. B. nach einer Textkorrektur):
//   node tools/melody/relyric.ts [--write]   legt den Text in src/music/songs-melodies.ts neu auf die Noten, Lieder aus
//                                             NO_FIT fallen heraus
import { parseChordPro, type SongSource } from '../../src/music/song.ts';
import type { MelodyEntry } from './melodies-file.ts';

/** Nur Buchstaben, klein – Grundlage für Abgleich und Vergleich. */
export const letters = (s: string) => s.toLowerCase().replace(/[^\p{L}]/gu, '');

/** Längste gemeinsame Teilfolge: für jede Stelle in a die zugeordnete Stelle in b (oder -1). */
export function lcsMap(a: string, b: string): { map: number[]; matched: number } {
  const n = a.length;
  const m = b.length;
  const dp: Uint16Array[] = [];
  for (let i = 0; i <= n; i++) dp.push(new Uint16Array(m + 1));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--) dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const map = new Array<number>(n).fill(-1);
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      map[i] = j;
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  return { map, matched: dp[0][0] };
}

/** Kosten für das Ersetzen eines Zeichens: Wortgrenzen (Leerzeichen) werden nie gegen Buchstaben getauscht. */
const sub = (x: string, y: string) => (x === y ? 0 : x === ' ' || y === ' ' ? 3 : 1);

/**
 * Ausrichtung mit möglichst wenigen Änderungen (Levenshtein; das Ende von b ist frei): für jede Stelle in a die Stelle
 * in b oder -1. Anders als die längste gemeinsame Teilfolge springt sie nicht für einen einzelnen Buchstaben über
 * ganze Wörter hinweg, und vertauschte Buchstaben gleicher Silbenzahl („Juhu“ ↔ „Juja“) bleiben an ihrem Platz.
 */
export function editMap(a: string, b: string): number[] {
  const n = a.length;
  const m = b.length;
  const d: Uint16Array[] = [];
  for (let i = 0; i <= n; i++) {
    d.push(new Uint16Array(m + 1));
    d[i][0] = i;
  }
  for (let j = 0; j <= m; j++) d[0][j] = j;
  for (let i = 1; i <= n; i++)
    for (let j = 1; j <= m; j++) d[i][j] = Math.min(d[i - 1][j - 1] + sub(a[i - 1], b[j - 1]), d[i - 1][j] + 1, d[i][j - 1] + 1);
  let j = 0;
  for (let k = 1; k <= m; k++) if (d[n][k] < d[n][j]) j = k;
  const map = new Array<number>(n).fill(-1);
  let i = n;
  while (i > 0 && j > 0) {
    if (d[i][j] === d[i - 1][j - 1] + sub(a[i - 1], b[j - 1])) {
      map[i - 1] = j - 1;
      i--;
      j--;
    } else if (d[i][j] === d[i - 1][j] + 1) i--;
    else j--;
  }
  return map;
}

/** Wörter des ChordPro-Texts in Reihenfolge (Silben mitten im Wort, „ein[C]spannt“, zusammengefügt). */
export function chordproWords(src: SongSource): string[] {
  const out: string[] = [];
  let cur = '';
  for (const e of parseChordPro(src).events) {
    cur += e.syllable;
    if (!e.joinNext && cur) {
      out.push(cur);
      cur = '';
    }
  }
  if (cur) out.push(cur);
  return out;
}

/**
 * Melodie und belegter Text passen nicht zusammen (andere Silbenzahl, Verse anders gebaut) – dann das Lied nur mit
 * Akkorden und Text zeigen, ohne Melodie.
 */
export const NO_FIT: Record<string, string> = {
  'bruennlein-fliessen':
    'Notenbeispiel singt „wenn ich mein Schatz nicht rufen darf, tu ich ihm winken“ zweimal (einmal ohne „juja“) und endet vor „winken“; bei Erk steht die Zeile nur einmal mit „juja“',
  'schwaebsche-eisebahne':
    'Notenbeispiel „gibt’s gar viele Haltstatione“ und „trulla, trulla, trullala“ hat drei Noten mehr als der Text der Quelle („geit es viele Statione“, „trula, trula, la“)',
  clementine: 'Notenbeispiel „in a cavern … excavating … forty-niner“ hat andere Silbenzahl als der Text der Quelle („an excavation“, „a forty-niner“)',
  'my-bonnie': 'Notenbeispiel hat im zweiten Kehrreim keine Note für „oh, bring back“',
  'kling-gloeckchen': 'Notenbeispiel endet mitten im Kehrreim bei „kling, Glöck-“, für „-chen, kling!“ fehlen die Noten',
  'auld-lang-syne':'Notenbeispiel „and auld lang syne“, „my jo“ – die Quelle singt „and days o’ auld lang syne“ (zwei Silben mehr)',
};

/**
 * Silben des Notenbeispiels, die vor dem Abgleich ersetzt werden, weil der Buchstabenabgleich die Silben unseres Texts
 * sonst falsch trennen oder die zusätzliche Note an eine ungünstige Stelle legen würde. Links stehen die Silben wie im
 * Notenbeispiel (ohne Pausen, `~` = gehaltener Ton), rechts gleich viele Silben unseres Texts.
 */
const SYLLABLES: Record<string, [string, string][]> = {
  // „Mein Licht ist aus, ich geh nach Haus“ ist die letzte Strophe; in der ersten steht „Laternenlicht, verlösch mir nicht“
  'ich-geh-mit-meiner-laterne': [
    ['Mein Licht ist aus, ich geh’ nach Haus.', 'La- ter- nen- licht, ver- lösch mir nicht!'],
    ['ra- bimm- el, ra- bamm- el,', 'Ra- bim- mel, ra- bam- mel,'],
  ],
  // 16 Noten auf „la“, die Quelle schreibt 15: die letzte Silbe der ersten Kette klingt über zwei Noten
  'es-toenen-die-lieder': [['la ~ la La', 'la ~ ~ La']],
  'alles-neu-mai': [['he- raus!', 'hin- aus!']],
  'morgen-kinder': [['welch ~ ein', 'wel- ~ ches']],
  'kuckuck-kuckuck': [['Kuk- kuck,', 'Ku- ckuck,']],
  // Kirkpatrick 1895 singt „in the bright sky“: „bright“ auf die Note, über die das Notenbeispiel „sky“ hält
  'away-in-a-manger': [['the sky ~ Looked', 'the bright sky Looked']],
};

const TOKEN = /^(\[[^\]]+\])?([^:]+):(.+)$/;
const VOWEL = /[aeiouyäöüàâéèêëîïôœùûÿ]/i;

/** Ersetzt in `toks` jede Folge der Silben `from` (Pausen übersprungen) durch `to`. */
function replaceSyllables(toks: Tok[], from: string, to: string) {
  const f = from.split(' ');
  const r = to.split(' ');
  if (f.length !== r.length) throw new Error(`Ersetzung mit ungleicher Silbenzahl: ${from} → ${to}`);
  const idx = toks.map((t, i) => (t.syl === '_' ? -1 : i)).filter((i) => i >= 0);
  for (let s = 0; s + f.length <= idx.length; s++) {
    if (!f.every((x, k) => toks[idx[s + k]].syl === x)) continue;
    r.forEach((x, k) => (toks[idx[s + k]].syl = x));
    s += f.length - 1;
  }
}

interface Tok {
  line: number;
  prefix: string;
  syl: string;
  rest: string;
}

interface Unit {
  /** Stelle des Tokens im Text. */
  tok: number;
  /** Nummer des Worts im Notentext (Silben eines Worts sind mit `-` verbunden). */
  word: number;
  /** Stelle der Silbe in ihrem Wort. */
  index: number;
  text: string;
}

export interface Relyric {
  /** Melodie mit unserem Text, `null`, wenn er sich nicht sauber auf die Noten legen lässt. */
  text: string | null;
  /** Hinweise für den Bericht des Imports (Note ohne eigene Silbe, mehrere Wörter auf einer Note …). */
  notes: string[];
}

/** Ersetzt die Silben von `melody` (Melodieformat der App) durch den Anfang des Texts von `src.chordpro`. */
export function relyric(melody: string, src: SongSource): Relyric {
  const notes: string[] = [];
  const lines = melody.split('\n');
  const toks: Tok[] = [];
  lines.forEach((l, line) => {
    for (const t of l.split(/\s+/).filter(Boolean)) {
      const m = TOKEN.exec(t);
      if (!m) throw new Error(`${src.id}: Token nicht lesbar: ${t}`);
      toks.push({ line, prefix: m[1] || '', syl: m[2], rest: m[3] });
    }
  });
  if (NO_FIT[src.id]) return { text: null, notes: [NO_FIT[src.id]] };
  for (const pair of SYLLABLES[src.id] || []) replaceSyllables(toks, pair[0], pair[1]);
  // Silbentokens und ihre Wörter; gehaltene Töne (~) und Pausen gehören zu keiner Silbe
  const units: Unit[] = [];
  let word = 0;
  let index = 0;
  toks.forEach((t, i) => {
    if (t.syl === '_' || t.syl === '~') return;
    units.push({ tok: i, word, index: index++, text: t.syl.replace(/-$/, '').replace(/‿/g, ' ') });
    if (!t.syl.endsWith('-')) {
      word++;
      index = 0;
    }
  });
  const wordCount = word + (index ? 1 : 0);
  const wordText: string[] = new Array(wordCount).fill('');
  for (const u of units) wordText[u.word] += letters(u.text);

  const cpWords = chordproWords(src);
  // Satzzeichen mit Leerzeichen davor (französisch „né !“) gehören zum Wort davor
  const raw = cpWords.reduce((s, w, i) => (i && !letters(w) ? s + '‿' + w : s + (i ? ' ' : '') + w), '');
  const rawPos: number[] = [];
  let b = '';
  for (let p = 0; p < raw.length; p++)
    if (letters(raw[p]) || raw[p] === ' ') {
      rawPos.push(p);
      b += raw[p] === ' ' ? ' ' : letters(raw[p]);
    }
  // Buchstabenabgleich Notentext ↔ unser Text (nur der Anfang zählt, damit nichts in spätere Strophen rutscht)
  const project = (list: Unit[], exact: boolean) => {
    const starts: number[] = [];
    let a = '';
    for (const u of list) {
      starts.push(a.length);
      a += letters(u.text) + (toks[u.tok].syl.endsWith('-') ? '' : ' ');
    }
    starts.push(a.length);
    return { starts, a, map: (exact ? (x: string, y: string) => lcsMap(x, y).map : editMap)(a, b.slice(0, Math.min(b.length, Math.round(a.length * 1.3) + 10))) };
  };
  // Wörter, die sich in unserem Text am Stück wiederfinden
  const first = project(units, true);
  const placed: boolean[] = new Array(wordCount).fill(true);
  for (let w = 0; w < wordCount; w++) {
    const idx = units.map((u, k) => (u.word === w ? k : -1)).filter((k) => k >= 0);
    const from = first.starts[idx[0]];
    const to = first.starts[idx[idx.length - 1] + 1];
    const hit = first.map.slice(from, to).filter((j, p) => j >= 0 && b[j] === first.a[from + p]);
    placed[w] = hit.length >= 0.7 * (to - from) && (!hit.length || hit[hit.length - 1] - hit[0] + 1 <= 1.5 * (to - from) + 2);
  }
  // Wiederholungen, die unser Text nicht ausschreibt: Wörter, die die unmittelbar vorangehenden wiederholen und sich
  // in unserem Text nicht am Stück wiederfinden; sie bekommen den Text ihres Vorbilds
  const copyOf: number[] = new Array(wordCount).fill(-1);
  for (let w = 1; w < wordCount; ) {
    let found = 0;
    for (let k = Math.min(w, wordCount - w); k >= 2 && !found; k--) {
      let same = true;
      for (let x = 0; x < k && same; x++) same = wordText[w + x] === wordText[w - k + x];
      const span = wordText.slice(w, w + k);
      const distinct = new Set(span).size >= 2;
      const misplaced = placed.slice(w, w + k).filter((p) => !p).length;
      if (same && distinct && misplaced > 0.2 * k) found = k;
    }
    if (found) {
      for (let x = 0; x < found; x++) copyOf[w + x] = copyOf[w - found + x] >= 0 ? copyOf[w - found + x] : w - found + x;
      w += found;
    } else w++;
  }
  const own = units.filter((u) => copyOf[u.word] < 0);
  const proj = project(own, false);
  const starts = proj.starts;
  const a = proj.a;
  const map = proj.map;
  const firstMapped = own.map((_, k) => {
    for (let p = starts[k]; p < a.length; p++) if (map[p] >= 0 && a[p] !== ' ') return map[p];
    return -1;
  });
  const lastMapped = own.map((_, k) => {
    for (let p = starts[k + 1] - 1; p >= 0; p--) if (map[p] >= 0 && a[p] !== ' ') return map[p];
    return -1;
  });
  const lastLetter = lastMapped[own.length - 1];
  if (!own.length || lastLetter < 0) return { text: null, notes: ['kein gemeinsamer Text'] };
  // Ende: hinter dem Wort des letzten zugeordneten Buchstabens – endet das Notenbeispiel mitten im Wort, dort
  const lastUnit = own[own.length - 1];
  const truncated = toks[lastUnit.tok].syl.endsWith('-');
  let end = rawPos[lastLetter] + 1;
  if (!truncated) while (end < raw.length && raw[end] !== ' ') end++;
  // Schnitt zwischen dem letzten zugeordneten Buchstaben davor und dem ersten danach: liegt ein Leerzeichen dazwischen,
  // dort; sonst direkt hinter dem letzten zugeordneten (nicht zugeordnete Buchstaben beginnen die nächste Silbe)
  const cuts: number[] = [0];
  for (let k = 1; k < own.length; k++) {
    const prev = cuts[k - 1];
    const f = firstMapped[k];
    if (f < 0) {
      cuts.push(end);
      continue;
    }
    const from = lastMapped[k - 1] >= 0 ? rawPos[lastMapped[k - 1]] + 1 : prev;
    const to = rawPos[f];
    const space = raw.lastIndexOf(' ', to);
    let cut: number;
    if (space >= from) cut = space + 1;
    else {
      cut = from;
      while (cut < to && !letters(raw[cut])) cut++;
    }
    cuts.push(Math.min(Math.max(cut, prev), end));
  }
  cuts.push(end);
  const pieces = own.map((_, k) => raw.slice(cuts[k], cuts[k + 1]));

  // Silbe ohne Vokal (z. B. „wied|rum“ auf drei Noten) geht in die nächste Silbe desselben Worts über
  for (let k = 0; k < pieces.length; k++) {
    const core = pieces[k].trim();
    if (!letters(core) || VOWEL.test(core)) continue;
    if (k + 1 < pieces.length && !/\s$/.test(pieces[k])) {
      pieces[k + 1] = pieces[k] + pieces[k + 1];
      pieces[k] = '';
    } else if (k > 0) {
      pieces[k - 1] += pieces[k];
      pieces[k] = '';
    }
  }
  const out: Tok[] = toks.map((t) => ({ line: t.line, prefix: t.prefix, syl: t.syl, rest: t.rest }));
  let ok = true;
  own.forEach((u, k) => {
    const piece = pieces[k];
    const core = piece.trim();
    if (!letters(core)) {
      const before = pieces.slice(0, k).join('').trim().split(' ').pop();
      if (k === 0 || !before) {
        notes.push('keine Silbe für die erste Note');
        ok = false;
        return;
      }
      // keine eigene Silbe für diese Note: die vorige klingt weiter
      out[u.tok].syl = '~';
      notes.push(`Melisma nach „${before}“`);
      return;
    }
    // zwei Wörter auf einer Note nur, wo auch das Notenbeispiel sie zusammenzieht („th’an-gel-ic“)
    if (/\s/.test(core) && !/‿|\p{L}['’]\p{L}/u.test(toks[u.tok].syl)) {
      notes.push(`mehrere Wörter auf einer Note: „${core}“`);
      ok = false;
      return;
    }
    const join = !/\s$/.test(piece) && (k + 1 < own.length ? cuts[k + 1] < end : truncated);
    // „Bi-Ba-Butzemann“: der Bindestrich der Quelle steckt schon in der Silbentrennung der Anzeige
    const syl = core.replace(/[:|[\]]+/g, '').replace(/\s+/g, '‿');
    out[u.tok].syl = join ? syl.replace(/-$/, '') + '-' : syl;
  });
  if (!ok) return { text: null, notes };
  // ausgeschriebene Wiederholungen: Text des Vorbilds, Silbe für Silbe
  const unitsOfWord = new Map<number, Unit[]>();
  for (const u of units) {
    if (!unitsOfWord.has(u.word)) unitsOfWord.set(u.word, []);
    unitsOfWord.get(u.word)!.push(u);
  }
  for (const u of units) {
    const w = copyOf[u.word];
    if (w < 0) continue;
    const model = unitsOfWord.get(w)![u.index];
    out[u.tok].syl = model ? out[model.tok].syl : '~';
  }
  const text = lines
    .map((_, line) =>
      out
        .filter((t) => t.line === line)
        .map((t) => `${t.prefix}${t.syl}:${t.rest}`)
        .join(' '),
    )
    .join('\n');
  return { text, notes };
}

if (/relyric.ts$/.test(process.argv[1] || '')) {
  const { MELODIES } = await import('../../src/music/songs-melodies.ts');
  const { CHORD_SONGS } = await import('../../src/music/songs-chordpro.ts');
  const { KINDER_SONGS } = await import('../../src/music/songs-kinder.ts');
  const { ENGLISH_SONGS } = await import('../../src/music/songs-english.ts');
  const { writeMelodies } = await import('./melodies-file.ts');
  const { CHRISTMAS_SONGS } = await import('../../src/music/songs-weihnachten.ts');
  const all = CHORD_SONGS.concat(KINDER_SONGS, ENGLISH_SONGS, CHRISTMAS_SONGS);
  const entries: MelodyEntry[] = [];
  for (const id of Object.keys(MELODIES)) {
    const src = all.find((s) => s.id === id);
    const m = MELODIES[id];
    const r = src ? relyric(m.text, src) : { text: m.text, notes: [] };
    const mark = r.text === null ? '✗' : r.text === m.text ? '=' : '✓';
    console.log(`${mark} ${id}${r.notes.length ? '  ' + r.notes.join('; ') : ''}`);
    if (r.text !== null) entries.push({ id, meter: m.meter, pickup: m.pickup, originalKey: m.originalKey, similarity: m.similarity, source: m.source, url: m.url, text: r.text });
  }
  if (process.argv.includes('--write')) writeMelodies(entries);
}
