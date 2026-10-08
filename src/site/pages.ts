/**
 * Vorrendern im Build: Für jede Instrument-Seite und Sprache entsteht je Adresse eine fertige HTML-Seite mit Titel,
 * Beschreibung, Sprachversionen (hreflang), strukturierten Daten und Inhalt. Werkzeug-Seiten enthalten die Ansicht so,
 * wie die App sie zeichnet; im Browser übernimmt dann das gemeinsame Skript. Läuft nur in Node (tools/build.mjs).
 */
import { installDom, serialize, esc, escAttr } from './vdom.ts';
import { LANGS, setLang, t, type Lang } from '../i18n.ts';
import { SITES, type SiteDef, type SiteId } from './sites.ts';
import { routePath, canonicalChord } from './routes.ts';
import { chordLongName, PAGE_QUALITIES } from './chord-names.ts';
import { SONGS } from '../music/songs.ts';
import type { Song } from '../music/song.ts';
import { ROOTS, chord } from '../music/chords.ts';
import { ARTICLES } from '../content/wissen.ts';
import { LEGAL } from './legal-data.ts';
import { setInstrument } from '../music/instrument.ts';
import type { Article, Block, L10n } from '../content/types.ts';
import { h } from '../ui/dom.ts';
import { icon, soundHole } from '../ui/icons.ts';
import { chordDiagram } from '../ui/chord-diagram.ts';
import { screen, type View } from '../ui/screen.ts';
import { home } from '../views/home.ts';
import { songs } from '../views/songs.ts';
import { player } from '../views/player.ts';
import { chords, chordDetail } from '../views/chords.ts';
import { game } from '../views/game.ts';
import { tuner } from '../views/tuner.ts';
import { rhythm } from '../views/rhythm.ts';
import { stars } from '../views/stars.ts';
import { record } from '../views/record.ts';
import { detective } from '../views/detective.ts';
import { blues } from '../views/blues.ts';
import { ownSongEditor } from '../views/own-song.ts';
import { receiveSong, shareSong } from '../views/share.ts';
import { CATEGORIES } from '../music/song.ts';
import { OG_HEIGHT, OG_WIDTH } from './og-image.ts';

/** Vorschaubild je Instrument-Seite, erzeugt von tools/build.mjs (src/site/og-image.ts). */
export const OG_IMAGE = 'og-image.png';
/** Seit wann es die Wissensartikel gibt (datePublished), solange ein Artikel kein eigenes Datum trägt. */
const ARTICLES_PUBLISHED = '2026-10-07';
/** Längere Titel schneiden Suchmaschinen ab; bis hierhin wird der Markenname angehängt. */
const TITLE_MAX = 65;

export interface BuildEnv {
  /** Adresse der Seite, wie im Build verlinkt (Produktion https://ukulele.…/, Vorschau /vorschau-…/pr-1/ukulele/). */
  url: (site: SiteId) => string;
  /** Öffentliche Adresse für canonical, hreflang und Sitemap. */
  publicUrl: (site: SiteId) => string;
  /** Vorschau: nicht indexieren. */
  preview: boolean;
  /** Gehashte Dateien, relativ zur Basis der Seite. */
  assets: { js: string; css: string };
  /** Instrument-Seiten, die es (schon) gibt – nur auf diese wird verlinkt. */
  sites: SiteId[];
}

export interface Page {
  /** Datei relativ zum Verzeichnis der Seite, z. B. „en/songs/index.html“. */
  file: string;
  html: string;
  /** Öffentliche Adressen je Sprache (für die Sitemap); leer = nicht indexieren. */
  alternates: Partial<Record<Lang, string>>;
  /** Öffentliche Adresse dieser Seite, wenn sie in die Sitemap gehört. */
  url?: string;
}

interface Spec {
  route: string;
  title: string;
  description: string;
  /** Ansicht, die im Browser startet (wie die frühere Hash-Route); fehlt bei reinen Inhaltsseiten. */
  view?: View;
  /** Parameter steht hinter „#“ (eigene/geteilte Lieder): nicht vorrendern, nicht indexieren. */
  hashParam?: boolean;
  noindex?: boolean;
  /** Inhalt für Seiten ohne Ansicht oder wenn sich die Ansicht nicht vorrendern lässt. */
  body?: () => Node[];
  /** Zusätzliche Erklärung unter der App (für Menschen und Suchmaschinen). */
  extra?: () => Node | null;
  jsonld?: () => object[];
  /** Nur auf diesen Sprachen (z. B. Wissensartikel mit Slug je Sprache) – sonst alle. */
  ogType?: string;
  /** Letztes Glied der Brotkrümel (sonst der Titel). */
  crumb?: string;
  /** Gleicher Inhalt auf mehreren Instrument-Seiten: Diese Seite gilt als Original (canonical, Sitemap). */
  canonicalSite?: SiteId;
}

const VIEW_NAMES: Record<string, View> = {
  '': home,
  lieder: songs,
  lied: player,
  akkorde: chords,
  akkord: chordDetail,
  spiel: game,
  stimmen: tuner,
  rhythmus: rhythm,
  sterne: stars,
  aufnahme: record,
  detektiv: detective,
  blues,
  'eigenes-lied': ownSongEditor,
  'lied-teilen': shareSong,
  teilen: receiveSong,
};

function paramOf(route: string): string {
  const i = route.indexOf('/');
  return i < 0 ? '' : route.slice(i + 1);
}

function isBuiltInOwn(): boolean {
  return false;
}

function articleSlug(id: string, l: Lang): string | undefined {
  const a = ARTICLES.filter((x) => x.id === id)[0];
  return a ? a.slug[l] : undefined;
}

/** Pfad einer Route relativ zur Basis (ohne Hash-Teil für vorgerenderte Seiten). */
export function pathOf(route: string, l: Lang): string {
  return routePath(route, l, isBuiltInOwn, articleSlug);
}

function pathname(url: string): string {
  const m = /^[a-z]+:\/\/[^/]+(\/.*)$/.exec(url);
  return m ? m[1] : url;
}

/** Ansichten greifen auf Zeitgeber und Browser-Objekte zu; im Build laufen sie ins Leere. */
function quietly<T>(f: () => T): T | null {
  const g = globalThis as unknown as Record<string, unknown>;
  const keep = { setTimeout: g.setTimeout, setInterval: g.setInterval, rAF: g.requestAnimationFrame, window: g.window };
  const noop = () => 0;
  g.setTimeout = noop;
  g.setInterval = noop;
  g.requestAnimationFrame = noop;
  g.window = {
    setTimeout: noop,
    setInterval: noop,
    clearTimeout: noop,
    clearInterval: noop,
    addEventListener: noop,
    removeEventListener: noop,
    matchMedia: () => ({ matches: false }),
    scrollTo: noop,
  };
  try {
    return f();
  } catch {
    return null;
  } finally {
    g.setTimeout = keep.setTimeout;
    g.setInterval = keep.setInterval;
    g.requestAnimationFrame = keep.rAF;
    g.window = keep.window;
  }
}

function inline(text: string, siteDef: SiteDef, l: Lang): Node[] {
  // **fett** und [Text](ziel:wert) – sonst reiner Text
  const out: Node[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\((chord|tool|wissen|lied):([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(document.createTextNode(text.slice(last, m.index)));
    if (m[1]) out.push(h('strong', null, m[1]));
    else {
      const kind = m[3];
      const target = m[4];
      const route = kind === 'chord' ? `akkord/${encodeURIComponent(canonicalChord(target))}` : kind === 'tool' ? target : kind === 'lied' ? `lied/${target}` : `wissen/${target}`;
      out.push(h('a', { href: rel(route, l) }, m[2]));
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(document.createTextNode(text.slice(last)));
  void siteDef;
  return out;
}

let currentBase = '/';
function rel(route: string, l: Lang): string {
  return currentBase + pathOf(route, l);
}

const TOOL_ICON: Record<string, string> = {
  stimmen: 'tuner',
  rhythmus: 'rhythm',
  spiel: 'game',
  blues: 'blues',
  detektiv: 'detective',
  akkorde: 'chords',
  lieder: 'songs',
  'eigenes-lied': 'plus',
};

function toolTitle(tool: string): string {
  const titles: Record<string, string> = {
    stimmen: t('Zum Stimmgerät'),
    rhythmus: t('Rhythmus üben'),
    spiel: t('Akkord-Spiel starten'),
    blues: t('Blues spielen'),
    detektiv: t('Akkord-Detektiv öffnen'),
    akkorde: t('Alle Akkorde'),
    lieder: t('Lieder spielen'),
    'eigenes-lied': t('Eigenes Lied anlegen'),
  };
  return titles[tool] || tool;
}

function renderBlocks(blocks: Block[], siteDef: SiteDef, l: Lang): Node[] {
  const out: Node[] = [];
  for (const b of blocks) {
    const x = b as Record<string, unknown>;
    if (x.h2) out.push(h('h2', null, (x.h2 as L10n)[l]));
    else if (x.p) out.push(h('p', null, ...inline((x.p as L10n)[l], siteDef, l)));
    else if (x.tip) out.push(h('aside', { class: 'tip' }, h('strong', null, t('Tipp:'), ' '), ...inline((x.tip as L10n)[l], siteDef, l)));
    else if (x.ul) out.push(h('ul', null, ...(x.ul as L10n[]).map((li) => h('li', null, ...inline(li[l], siteDef, l)))));
    else if (x.ol) out.push(h('ol', null, ...(x.ol as L10n[]).map((li) => h('li', null, ...inline(li[l], siteDef, l)))));
    else if (x.chord) {
      const name = canonicalChord(String(x.chord));
      out.push(
        h(
          'a',
          { class: 'article-chord btn', href: rel(`akkord/${encodeURIComponent(name)}`, l) },
          h('span', { class: 'chord-name' }, name),
          chordDiagram(chord(name), { labels: false }),
        ),
      );
    } else if (x.tool) {
      const tool = String(x.tool);
      out.push(h('a', { class: 'btn btn-primary article-tool', href: rel(tool, l) }, icon(TOOL_ICON[tool] || 'next'), ' ', toolTitle(tool)));
    }
  }
  return out;
}

function chordPageNames(): string[] {
  const out: string[] = [];
  for (const q of PAGE_QUALITIES) for (const r of ROOTS) out.push(r + q);
  return out;
}

function songsWith(name: string): Song[] {
  return SONGS.filter((s) => s.chords.indexOf(name) >= 0);
}

function articlesOn(siteDef: SiteDef): Article[] {
  return ARTICLES.filter((a) => a.instruments.indexOf(siteDef.instrument as 'ukulele') >= 0);
}

/** Artikel, die ein Griffbild oder Werkzeug zeigen oder darauf verlinken (für Querverweise). */
function articlesAbout(kind: 'chord' | 'tool', value: string, siteDef: SiteDef): Article[] {
  const link = new RegExp(`\\]\\(${kind}:${value.replace(/[#]/g, '\\$&')}\\)`);
  const mentions = (b: Block) => {
    const x = b as Record<string, unknown>;
    if (x[kind] !== undefined) return String(x[kind]) === value;
    return JSON.stringify(b).search(link) >= 0;
  };
  return articlesOn(siteDef).filter((a) => a.blocks.some(mentions));
}

function articleLinks(title: string, list: Article[], l: Lang): Node | null {
  if (!list.length) return null;
  return h('nav', { 'aria-label': title }, h('h2', null, title), h('ul', { class: 'wissen-list' }, ...list.map((a) => h('li', null, h('a', { href: rel(`wissen/${a.id}`, l) }, a.title[l])))));
}

/** Gleiche Artikel auf mehreren Instrument-Seiten: Original ist die erste Seite (Reihenfolge wie SITES). */
function primarySite(a: Article): SiteId {
  const hit = SITES.filter((s) => s.instrument && a.instruments.indexOf(s.instrument) >= 0 && env().sites.indexOf(s.id) >= 0)[0];
  return hit ? hit.id : 'ukulele';
}

// Instrumentnamen stehen ohne Artikel in den Texten; wo die Sprache einen verlangt, wird er hier ergänzt.
const GRAMMAR: Record<Lang, [RegExp, string][]> = {
  de: [
    [/\bauf (Ukulele|Gitarre)\b/g, 'auf der $1'],
    [/\bauf Banjo\b/g, 'auf dem Banjo'],
    [/\brund um (Ukulele|Gitarre)\b/g, 'rund um die $1'],
    [/\brund um Banjo\b/g, 'rund ums Banjo'],
  ],
  en: [],
  fr: [
    [/\b([Ll])e guitare\b/g, '$1a guitare'],
    [/\bau guitare\b/g, 'à la guitare'],
    [/\bdu guitare\b/g, 'de la guitare'],
    [/\b([MmTtSs])on guitare\b/g, '$1a guitare'],
  ],
};

function grammar(text: string, l: Lang): string {
  let out = text;
  for (const rule of GRAMMAR[l]) out = out.replace(rule[0], rule[1]);
  return out;
}

/** Erster Buchstabe groß (englische Titel beginnen sonst mit „ukulele chords“), Marke anhängen, solange es passt. */
function pageTitle(title: string, brand: string): string {
  const t1 = title.charAt(0).toUpperCase() + title.slice(1);
  if (t1.indexOf(brand) >= 0) return t1;
  const full = `${t1} | ${brand}`;
  return full.length <= TITLE_MAX ? full : t1;
}

/** Inhaltsseite im Stil der App: Kopfzeile mit Zurück-Knopf, darunter cremefarbene Karten. */
function staticScreen(title: string, back: string, ...content: (Node | null)[]): Node[] {
  const root = document.createElement('div');
  screen(root as unknown as HTMLElement, { title, back, theme: 'pearl' }, ...(content.filter((c) => c !== null) as Node[]));
  // lange Titel (Wissensartikel) dürfen umbrechen statt abgeschnitten zu werden
  const header = root.childNodes[0] as unknown as { childNodes: { tagName?: string; setAttribute: (k: string, v: string) => void }[] };
  for (const c of header.childNodes) if (c.tagName === 'h1') c.setAttribute('class', 'wrap');
  return Array.prototype.slice.call(root.childNodes);
}

function specsFor(siteDef: SiteDef, l: Lang): Spec[] {
  const inst = siteDef.name[l];
  const brand = siteDef.brand[l];
  const specs: Spec[] = [];
  if (siteDef.id === 'start') {
    specs.push({
      route: '',
      title: t('{brand} – Saiteninstrumente lernen, kostenlos', { brand }),
      description: t('Kostenlos Ukulele, Gitarre oder Banjo lernen: Lieder zum Mitspielen, Akkorde, Stimmgerät und Rhythmus – ohne Abo, ohne Werbung, ohne Konto.'),
      body: () => startPage(siteDef, l),
      jsonld: () => [webSite(siteDef, l)],
    });
    return specs.concat(legalSpecs(siteDef, l));
  }
  specs.push({
    route: '',
    title: t('{instrument} lernen kostenlos: Lieder und Akkorde', { instrument: inst }),
    description: t('Kostenlos {instrument} lernen, für Kinder und Einsteiger: Lieder zum Mitspielen, Akkorde mit Griffbildern, Stimmgerät und Rhythmus. Ohne Abo, ohne Werbung.', { instrument: inst }),
    view: home,
    extra: () => aboutCard(siteDef, l),
    jsonld: () => [webSite(siteDef, l), webApp(siteDef, l)],
  });
  specs.push({
    route: 'lieder',
    title: t('Lieder für {instrument} mit Akkorden und Text', { instrument: inst }),
    description: t('{n} Lieder für {instrument}: Kinderlieder, Lagerfeuer, Weihnachten und mehr – mit Akkorden, Text und Melodie zum Mitspielen.', { n: SONGS.length, instrument: inst }),
    view: songs,
    extra: () => songsIntroCard(siteDef, l),
    crumb: t('Lieder'),
  });
  for (const s of SONGS) {
    const long = t('{title} – Akkorde und Text für {instrument}', { title: s.title, instrument: inst });
    specs.push({
      route: `lied/${s.id}`,
      title: long.length <= TITLE_MAX ? long : t('{title} – Akkorde für {instrument}', { title: s.title, instrument: inst }),
      description: t('{title}: Akkorde ({chords}) und Text zum Mitspielen für {instrument} – mit Begleitung, die auf dich wartet.', {
        title: s.title,
        chords: s.chords.join(', '),
        instrument: inst,
      }),
      view: player,
      extra: () => songCard(s, l),
      jsonld: () => [songLd(s, siteDef, l)],
      ogType: 'music.song',
      crumb: s.title,
    });
  }
  specs.push({ route: 'lied/eigen', title: t('Eigenes Lied'), description: t('Dein eigenes Lied, gespeichert nur auf diesem Gerät.'), view: player, hashParam: true, noindex: true, body: () => staticScreen(t('Eigenes Lied'), rel('lieder', l)) });
  specs.push({
    route: 'akkorde',
    title: t('Akkorde für {instrument} – Griffbilder zum Lernen', { instrument: inst }),
    description: t('Alle wichtigen Akkorde für {instrument} mit Griffbild, Fingersatz und Prüf-Funktion übers Mikrofon – kostenlos und ohne Anmeldung.', { instrument: inst }),
    view: chords,
    extra: () => chordIndexCard(l),
    crumb: t('Akkorde'),
  });
  for (const name of chordPageNames()) {
    // „Fis-Sept mit Quarte (7sus4)“: die Klammer wiederholt nur den Akkordnamen, der ohnehin davor steht
    const long = chordLongName(name, l).replace(/ \([^)]*\)$/, '');
    specs.push({
      route: `akkord/${encodeURIComponent(name)}`,
      title: t('{chord} ({long}) – Akkord für {instrument}', { chord: name, long, instrument: inst }),
      description: t('So greifst du {chord} ({long}) auf {instrument}: Griffbild, Fingersatz und Klang – und das Mikrofon sagt dir, ob er sauber klingt.', {
        chord: name,
        long,
        instrument: inst,
      }),
      view: chordDetail,
      extra: () => chordCard(name, siteDef, l),
      crumb: name,
    });
  }
  const tools: [string, string, string][] = [
    ['stimmen', t('{instrument} stimmen – Stimmgerät online', { instrument: inst }), t('Kostenloses Stimmgerät für {instrument} im Browser: Saite anzupfen, die Anzeige zeigt zu hoch oder zu tief – mit Tipps, wenn es hakt.', { instrument: inst })],
    ['rhythmus', t('Schlagmuster und Metronom für {instrument}', { instrument: inst }), t('Schlagmuster für {instrument} lernen: runter, rauf, Pausen – mit Metronom, Taktarten und Tempo zum Antippen.', { instrument: inst })],
    ['spiel', t('Akkord-Spiel für {instrument} – Akkordwechsel üben', { instrument: inst }), t('Wie viele Akkorde schaffst du in einer Minute? Das Mikrofon hört zu und zählt mit – ein Spiel für {instrument}.', { instrument: inst })],
    ['detektiv', t('Akkord-Detektiv für {instrument}: Welcher Akkord ist das?', { instrument: inst }), t('Spiel einen Akkord oder Ton auf {instrument} – der Detektiv sagt dir, wie er heißt und wo er auf dem Hals liegt.', { instrument: inst })],
    ['blues', t('12-Takt-Blues zum Mitspielen für {instrument}', { instrument: inst }), t('Blues mit Band in jeder Tonart: erst Grundtöne, dann Riffs, dann frei spielen – auf {instrument}, mit Tabulatur.', { instrument: inst })],
    ['sterne', t('Meine Sterne', {}), t('Deine Sterne, Abzeichen und Übungstage – gespeichert nur auf diesem Gerät.', {})],
  ];
  for (const tool of tools)
    specs.push({
      route: tool[0],
      title: tool[1],
      description: tool[2],
      view: VIEW_NAMES[tool[0]],
      extra: () => toolCard(tool[1], tool[2], tool[0], siteDef, l),
      // persönlicher Fortschritt, nichts für Suchmaschinen
      noindex: tool[0] === 'sterne',
    });
  specs.push({ route: 'aufnahme', title: t('Beispielaufnahmen'), description: t('Beispielaufnahmen für die Akkorderkennung.'), view: record, noindex: true });
  specs.push({
    route: 'eigenes-lied',
    title: t('Eigenes Lied anlegen'),
    description: t('Lied mit Akkorden einfügen und mitspielen – gespeichert nur auf deinem Gerät.'),
    view: ownSongEditor,
    hashParam: true,
  });
  specs.push({ route: 'lied-teilen', title: t('Lied teilen'), description: t('Eigenes Lied per Link oder QR-Code teilen.'), view: shareSong, hashParam: true, noindex: true, body: () => staticScreen(t('Lied teilen'), rel('lieder', l)) });
  specs.push({ route: 'teilen', title: t('Geschicktes Lied'), description: t('Ein geteiltes Lied öffnen.'), view: receiveSong, hashParam: true, noindex: true, body: () => staticScreen(t('Geschicktes Lied'), rel('lieder', l)) });
  const articles = ARTICLES.filter((a) => a.instruments.indexOf(siteDef.instrument as 'ukulele') >= 0);
  specs.push({
    route: 'wissen',
    title: t('Wissen rund um {instrument} – Tipps zum Lernen', { instrument: inst }),
    description: t('Stimmen, Akkorde, Rhythmus, Üben mit Kindern: kurze, verständliche Artikel rund um {instrument} – mit Übungen zum Mitmachen.', { instrument: inst }),
    body: () => wissenIndex(articles, siteDef, l),
    crumb: t('Wissen'),
  });
  for (const a of articles)
    specs.push({
      route: `wissen/${a.id}`,
      title: a.title[l],
      description: a.description[l],
      body: () => articlePage(a, siteDef, l),
      jsonld: () => [articleLd(a, siteDef, l)],
      ogType: 'article',
      crumb: a.title[l],
      canonicalSite: primarySite(a),
    });
  return specs.concat(legalSpecs(siteDef, l));
}

function legalSpecs(siteDef: SiteDef, l: Lang): Spec[] {
  const brand = siteDef.brand[l];
  return [
    { route: 'ueber', title: t('Über den {brand}', { brand }), description: t('Wer hinter der App steht und warum sie kostenlos ist: ein privates Projekt, ohne Werbung, ohne Abo, Open Source.'), body: () => legalPage('ueber', siteDef, l) },
    { route: 'impressum', title: t('Impressum'), description: t('Impressum und Kontakt: ein privates, nicht-kommerzielles Projekt – kostenlos, ohne Werbung und ohne Abo.'), body: () => legalPage('impressum', siteDef, l) },
    { route: 'datenschutz', title: t('Datenschutz'), description: t('Datenschutz: keine Konten, keine Cookies, kein Tracking – Fortschritt und Mikrofon bleiben auf deinem Gerät.'), body: () => legalPage('datenschutz', siteDef, l) },
  ];
}

// ---------- Inhalte ----------

function aboutCard(siteDef: SiteDef, l: Lang): Node {
  const inst = siteDef.name[l];
  return h(
    'section',
    { class: 'card seo-card' },
    h('h2', null, t('Kostenlos {instrument} lernen', { instrument: inst })),
    h(
      'p',
      null,
      t('Lieder zum Mitspielen, die auf dich warten, Akkorde mit Prüf-Funktion übers Mikrofon, Stimmgerät, Rhythmus und Blues. Ohne Abo, ohne Werbung, ohne Konto – alles bleibt auf deinem Gerät.'),
    ),
    h('p', null, h('a', { href: rel('wissen', l) }, t('Tipps und Wissen rund um {instrument}', { instrument: inst }), ' ›')),
  );
}

function toolCard(title: string, text: string, tool: string, siteDef: SiteDef, l: Lang): Node {
  return h(
    'section',
    { class: 'card seo-card' },
    h('h2', null, title),
    h('p', null, text),
    articleLinks(t('Mehr dazu'), articlesAbout('tool', tool, siteDef).slice(0, 4), l),
  );
}

function songsIntroCard(siteDef: SiteDef, l: Lang): Node {
  const easy = articlesOn(siteDef).filter((a) => a.id === 'lieder-fuer-anfaenger')[0];
  return h(
    'section',
    { class: 'card seo-card' },
    h('h2', null, t('Lieder für {instrument} mit Akkorden und Text', { instrument: siteDef.name[l] })),
    h('p', null, t('Kinderlieder, Volkslieder, Weihnachtslieder und englische Songs, mit Akkorden über dem Text und vielen Melodien als Tabulatur. Beim Akkordwechsel wartet die Begleitung auf dich.')),
    h(
      'ul',
      { class: 'wissen-list' },
      easy ? h('li', null, h('a', { href: rel(`wissen/${easy.id}`, l) }, easy.title[l])) : null,
      h('li', null, h('a', { href: rel('akkorde', l) }, t('Akkorde für {instrument} – Griffbilder zum Lernen', { instrument: siteDef.name[l] }))),
    ),
  );
}

function songCard(s: Song, l: Lang): Node {
  return h(
    'section',
    { class: 'card seo-card' },
    h('h2', null, t('Über das Lied')),
    h('p', null, s.origin),
    h('p', null, t('Akkorde:'), ' ', ...s.chords.map((c, i) => h('span', null, i ? ', ' : '', h('a', { href: rel(`akkord/${encodeURIComponent(canonicalChord(c))}`, l) }, c)))),
    h('p', null, t('{meter}er-Takt, {bpm} Schläge pro Minute.', { meter: s.meter, bpm: s.bpm })),
    moreSongs(s, l),
  );
}

/** Weitere Lieder derselben Gruppe (Querverweise für Leser und Suchmaschinen). */
function moreSongs(s: Song, l: Lang): Node | null {
  const cat = CATEGORIES.filter((c) => c.id === s.category)[0];
  const others = SONGS.filter((x) => x.category === s.category && x.id !== s.id).slice(0, 8);
  if (!cat || !others.length) return null;
  return h(
    'nav',
    { 'aria-label': t(cat.title) },
    h('h2', null, t('Mehr Lieder: {category}', { category: t(cat.title) })),
    h('ul', { class: 'wissen-list' }, ...others.map((x) => h('li', null, h('a', { href: rel(`lied/${x.id}`, l) }, x.title)))),
  );
}

function chordIndexCard(l: Lang): Node {
  return h(
    'section',
    { class: 'card seo-card' },
    h('h2', null, t('Alle Akkorde in allen Tonarten')),
    ...PAGE_QUALITIES.slice(0, 5).map((q) =>
      h('p', { class: 'chord-index' }, ...ROOTS.map((r) => h('a', { class: 'btn btn-chip', href: rel(`akkord/${encodeURIComponent(r + q)}`, l) }, r + q))),
    ),
    h(
      'details',
      null,
      h('summary', null, t('Weitere Akkordarten')),
      ...PAGE_QUALITIES.slice(5).map((q) =>
        h('p', { class: 'chord-index' }, ...ROOTS.map((r) => h('a', { class: 'btn btn-chip', href: rel(`akkord/${encodeURIComponent(r + q)}`, l) }, r + q))),
      ),
    ),
  );
}

function chordCard(name: string, siteDef: SiteDef, l: Lang): Node {
  const with_ = songsWith(name).slice(0, 12);
  return h(
    'section',
    { class: 'card seo-card' },
    h('h2', null, chordLongName(name, l)),
    with_.length ? h('p', null, t('Lieder mit {chord}:', { chord: name }), ' ', ...with_.map((s, i) => h('span', null, i ? ', ' : '', h('a', { href: rel(`lied/${s.id}`, l) }, s.title)))) : null,
    articleLinks(t('Mehr dazu'), articlesAbout('chord', name, siteDef).slice(0, 4), l),
  );
}

function wissenIndex(articles: Article[], siteDef: SiteDef, l: Lang): Node[] {
  const cats: { id: string; title: string }[] = [
    { id: 'erste-schritte', title: t('Erste Schritte') },
    { id: 'instrument', title: t('Dein Instrument') },
    { id: 'technik', title: t('Technik') },
    { id: 'akkorde', title: t('Akkorde') },
    { id: 'rhythmus', title: t('Rhythmus') },
    { id: 'theorie', title: t('Musik verstehen') },
    { id: 'eltern-lehrkraefte', title: t('Für Eltern und Lehrkräfte') },
  ];
  return staticScreen(
    t('Wissen rund um {instrument}', { instrument: siteDef.name[l] }),
    rel('', l),
    ...cats
      .filter((c) => articles.some((a) => a.category === c.id))
      .map((c) =>
        h(
          'section',
          { class: 'card wissen-cat' },
          h('h2', null, c.title),
          h('ul', { class: 'wissen-list' }, ...articles.filter((a) => a.category === c.id).map((a) => h('li', null, h('a', { href: rel(`wissen/${a.id}`, l) }, a.title[l]), h('span', { class: 'small' }, ' – ', a.description[l])))),
        ),
      ),
  );
}

function articlePage(a: Article, siteDef: SiteDef, l: Lang): Node[] {
  const related = (a.related || []).map((id) => ARTICLES.filter((x) => x.id === id)[0]).filter((x) => x && x.instruments.indexOf(siteDef.instrument as 'ukulele') >= 0);
  return staticScreen(
    a.title[l],
    rel('wissen', l),
    h('article', { class: 'card article' }, ...renderBlocks(a.blocks, siteDef, l)),
    related.length
      ? h('section', { class: 'card wissen-cat' }, h('h2', null, t('Passt dazu')), h('ul', { class: 'wissen-list' }, ...related.map((r) => h('li', null, h('a', { href: rel(`wissen/${r.id}`, l) }, r.title[l])))))
      : null,
  );
}

function startPage(siteDef: SiteDef, l: Lang): Node[] {
  return [
    h(
      'main',
      { class: 'home start', id: 'main' },
      h('header', { class: 'home-head' }, soundHole(), h('div', { class: 'brand' }, h('h1', null, siteDef.brand[l]), h('p', null, t('Kostenlos lernen, mitspielen, Spaß haben')))),
      h(
        'nav',
        { class: 'tiles', 'aria-label': t('Instrument wählen') },
        ...SITES.filter((s) => s.instrument && env().sites.indexOf(s.id) >= 0).map((s) =>
          h(
            'a',
            { class: `tile btn tile-big theme-brass tile-${s.id}`, href: env().url(s.id) + (l === 'de' ? '' : l + '/') },
            h('span', { class: 'tile-icon' }, icon(s.id === 'ukulele' ? 'songs' : s.id === 'gitarre' ? 'chords' : 'rhythm')),
            h('span', { class: 'tile-text' }, h('span', { class: 'tile-title' }, s.brand[l]), h('span', { class: 'tile-sub' }, t('{instrument} lernen', { instrument: s.name[l] }))),
          ),
        ),
      ),
      h('section', { class: 'card seo-card' }, h('p', null, t('Lieder zum Mitspielen, die auf dich warten, Akkorde mit Prüf-Funktion übers Mikrofon, Stimmgerät, Rhythmus und Blues. Ohne Abo, ohne Werbung, ohne Konto – alles bleibt auf deinem Gerät.'))),
    ),
  ];
}

function legalPage(kind: 'ueber' | 'impressum' | 'datenschutz', siteDef: SiteDef, l: Lang): Node[] {
  const p = (text: string) => h('p', null, text);
  const contact = LEGAL.email ? h('p', null, t('E-Mail:'), ' ', h('a', { href: `mailto:${LEGAL.email}` }, LEGAL.email)) : null;
  const address = LEGAL.address.length ? h('p', null, ...LEGAL.address.map((line, i) => h('span', null, i ? h('br') : null, line))) : null;
  if (kind === 'impressum')
    return staticScreen(
      t('Impressum'),
      rel('', l),
      h(
        'section',
        { class: 'card article' },
        h('h2', null, t('Angaben nach § 18 Abs. 1 Medienstaatsvertrag')),
        h('p', null, LEGAL.name),
        address || p(t('Die Anschrift wird gerade eingetragen.')),
        contact,
        h('h2', null, t('Ein privates Projekt')),
        p(t('Diese Seite ist ein privates, nicht-kommerzielles Projekt: kostenlos, ohne Werbung, ohne Abo, ohne Gewinnabsicht. Der Quelltext ist offen (MIT-Lizenz).')),
        h('p', null, h('a', { href: 'https://github.com/bartfastiel/ukulele-app' }, t('Quelltext auf GitHub'))),
      ),
    );
  if (kind === 'datenschutz')
    return staticScreen(
      t('Datenschutz'),
      rel('', l),
      h(
        'section',
        { class: 'card article' },
        h('h2', null, t('Kurz gesagt')),
        p(t('Keine Konten, keine Cookies, keine Werbung, kein Tracking. Dein Fortschritt (Sterne, Einstellungen, eigene Lieder) wird nur im Speicher deines Browsers abgelegt und verlässt dein Gerät nicht.')),
        h('h2', null, t('Verantwortlich')),
        h('p', null, LEGAL.name),
        address,
        contact,
        h('h2', null, t('Beim Aufruf der Seite')),
        p(t('Der Server muss deine IP-Adresse kurz verarbeiten, um die Seite auszuliefern (Art. 6 Abs. 1 lit. f DSGVO). Es werden keine Zugriffsprotokolle mit IP-Adressen gespeichert und keine Dienste Dritter eingebunden – keine Schriften, keine Statistik, keine Videos von fremden Servern.')),
        h('h2', null, t('Mikrofon')),
        p(t('Für Stimmgerät und Akkorderkennung fragt der Browser nach dem Mikrofon. Der Klang wird nur auf deinem Gerät ausgewertet, nie aufgezeichnet oder übertragen. Ausnahme: das Werkzeug für Beispielaufnahmen speichert Aufnahmen nur, wenn du es ausdrücklich startest, und nur auf deinem Gerät.')),
        h('h2', null, t('Speicher im Browser')),
        p(t('Sterne, Übungstage, Einstellungen und eigene Lieder liegen im lokalen Speicher deines Browsers (technisch notwendig, § 25 Abs. 2 Nr. 2 TDDDG). Du kannst sie jederzeit über die Browser-Einstellungen löschen. Zum Offline-Spielen speichert der Browser außerdem die Dateien der App.')),
        h('h2', null, t('Geteilte Lieder')),
        p(t('Beim Teilen steckt das Lied in der Adresse hinter dem „#“. Dieser Teil wird vom Browser nie an den Server geschickt.')),
        h('h2', null, t('Deine Rechte')),
        p(t('Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch und Beschwerde bei einer Datenschutz-Aufsichtsbehörde. Da hier keine personenbezogenen Daten gespeichert werden, gibt es in der Regel nichts zu beauskunften – frag aber gern.')),
      ),
    );
  return staticScreen(
    t('Über den {brand}', { brand: siteDef.brand[l] }),
    rel('', l),
    h(
      'section',
      { class: 'card article' },
      p(t('Diese App ist entstanden, damit Kinder in Instrumentalklassen zu Hause gern üben – ohne Abo-Fallen, ohne Werbung und ohne Konto. Sie ist ein privates Projekt, kostenlos und Open Source.')),
      h('h2', null, t('Was sie kann')),
      h(
        'ul',
        null,
        h('li', null, t('Lieder als Karaoke, die auf deinen Akkordwechsel warten')),
        h('li', null, t('Akkorde mit Griffbild und Prüf-Funktion übers Mikrofon')),
        h('li', null, t('Stimmgerät, Rhythmus, Blues und Akkord-Detektiv')),
        h('li', null, t('Eigene Lieder einfügen und teilen')),
      ),
      h('h2', null, t('Wie sie funktioniert')),
      p(t('Alles läuft in deinem Browser, auch auf älteren Tablets, und nach dem ersten Besuch auch offline. Nichts wird an einen Server geschickt.')),
      h('p', null, h('a', { href: 'https://github.com/bartfastiel/ukulele-app' }, t('Quelltext und Ideen auf GitHub'))),
    ),
  );
}

// ---------- strukturierte Daten ----------

function webSite(siteDef: SiteDef, l: Lang): object {
  return { '@context': 'https://schema.org', '@type': 'WebSite', name: siteDef.brand[l], url: env().publicUrl(siteDef.id) + pathOf('', l), inLanguage: l };
}

function webApp(siteDef: SiteDef, l: Lang): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteDef.brand[l],
    description: t('Lieder zum Mitspielen, die auf dich warten, Akkorde mit Prüf-Funktion übers Mikrofon, Stimmgerät, Rhythmus und Blues. Ohne Abo, ohne Werbung, ohne Konto – alles bleibt auf deinem Gerät.'),
    image: env().publicUrl(siteDef.id) + OG_IMAGE,
    url: env().publicUrl(siteDef.id) + pathOf('', l),
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Any',
    inLanguage: l,
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  };
}

function songLd(s: Song, siteDef: SiteDef, l: Lang): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicComposition',
    name: s.title,
    url: env().publicUrl(siteDef.id) + pathOf(`lied/${s.id}`, l),
    description: s.origin,
    isAccessibleForFree: true,
  };
}

function articleLd(a: Article, siteDef: SiteDef, l: Lang): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    datePublished: a.published || ARTICLES_PUBLISHED,
    dateModified: a.updated || a.published || ARTICLES_PUBLISHED,
    image: env().publicUrl(primarySite(a)) + OG_IMAGE,
    mainEntityOfPage: env().publicUrl(primarySite(a)) + pathOf(`wissen/${a.id}`, l),
    headline: a.title[l],
    description: a.description[l],
    inLanguage: l,
    url: env().publicUrl(siteDef.id) + pathOf(`wissen/${a.id}`, l),
    author: { '@type': 'Person', name: LEGAL.name },
  };
}

/** Brotkrümel: Startseite › Bereich › Seite (nur für Unterseiten). */
function breadcrumbLd(spec: Spec, siteDef: SiteDef, l: Lang, canonicalBase: string): object | null {
  if (!spec.route) return null;
  const name = spec.route.split('/')[0];
  const parent: Record<string, [string, string]> = { lied: ['lieder', t('Lieder')], akkord: ['akkorde', t('Akkorde')], wissen: ['wissen', t('Wissen')] };
  const items: [string, string][] = [['', siteDef.brand[l]]];
  if (parent[name] && spec.route.indexOf('/') > 0) items.push(parent[name]);
  items.push([spec.route, spec.crumb || spec.title]);
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((x, i) => ({ '@type': 'ListItem', position: i + 1, name: x[1], item: canonicalBase + pathOf(x[0], l) })),
  };
}

// ---------- Seite zusammensetzen ----------

let currentEnv: BuildEnv | null = null;
function env(): BuildEnv {
  return currentEnv!;
}

function footer(siteDef: SiteDef, l: Lang, alternates: Partial<Record<Lang, string>>): Node {
  const others = siteDef.id === 'start' ? [] : SITES.filter((s) => s.instrument && s.id !== siteDef.id && env().sites.indexOf(s.id) >= 0);
  const links: [string, string][] =
    siteDef.id === 'start'
      ? []
      : [
          ['lieder', t('Lieder')],
          ['akkorde', t('Akkorde')],
          ['stimmen', t('Stimmgerät')],
          ['wissen', t('Wissen')],
        ];
  return h(
    'footer',
    { class: 'site-footer card' },
    links.length ? h('nav', { 'aria-label': t('Bereiche') }, ...links.map((x) => h('a', { href: rel(x[0], l) }, x[1]))) : null,
    h(
      'nav',
      { class: 'footer-langs', 'aria-label': 'Sprache · Language · Langue' },
      ...LANGS.map((x) => h('a', { href: alternates[x.id] ? localHref(alternates[x.id]!, siteDef) : rel('', x.id), hreflang: x.id, lang: x.id, 'aria-current': x.id === l ? 'true' : null }, x.name)),
    ),
    others.length
      ? h('p', { class: 'footer-instruments' }, t('Auch für:'), ' ', ...others.map((s, i) => h('span', null, i ? ' · ' : '', h('a', { href: env().url(s.id) + (l === 'de' ? '' : l + '/') }, s.name[l]))))
      : null,
    h(
      'nav',
      { class: 'footer-legal', 'aria-label': t('Rechtliches') },
      h('a', { href: rel('ueber', l) }, t('Über')),
      h('a', { href: rel('impressum', l) }, t('Impressum')),
      h('a', { href: rel('datenschutz', l) }, t('Datenschutz')),
    ),
    h('p', { class: 'small' }, t('Kostenlos, ohne Werbung, ohne Konto – Open Source.')),
  );
}

/** Öffentliche Adresse → Link innerhalb dieses Builds (Vorschau/lokal liegen die Seiten woanders). */
function localHref(publicHref: string, siteDef: SiteDef): string {
  const pub = env().publicUrl(siteDef.id);
  return publicHref.indexOf(pub) === 0 ? env().url(siteDef.id) + publicHref.slice(pub.length) : publicHref;
}

const OG_LOCALE: Record<Lang, string> = { de: 'de_DE', en: 'en_US', fr: 'fr_FR' };

function renderPage(spec: Spec, siteDef: SiteDef, l: Lang): Page {
  const e = env();
  const de = document.documentElement as unknown as { setAttribute: (k: string, v: string) => void };
  de.setAttribute('data-base', currentBase);
  de.setAttribute('data-brand', siteDef.brand[l]);
  const indexable = !spec.noindex && !spec.hashParam;
  const alternates: Partial<Record<Lang, string>> = {};
  for (const x of LANGS) alternates[x.id] = e.publicUrl(siteDef.id) + pathOf(spec.route, x.id);
  let body: Node[] | null = null;
  const view = spec.view;
  if (view && !spec.hashParam)
    body = quietly(() => {
      const root = document.createElement('div');
      view(root as unknown as HTMLElement, paramOf(spec.route));
      return Array.prototype.slice.call(root.childNodes) as Node[];
    });
  if (!body || !body.length) body = spec.body ? spec.body() : staticScreen(spec.title, rel('', l));
  const extra = spec.extra ? spec.extra() : null;
  // gleicher Artikel auf mehreren Instrument-Seiten: nur das Original kommt in Sitemap und Suchindex
  const original = spec.canonicalSite && e.sites.indexOf(spec.canonicalSite) >= 0 ? spec.canonicalSite : siteDef.id;
  const isOriginal = original === siteDef.id;
  const canonical = e.publicUrl(original) + pathOf(spec.route, l);
  const title = grammar(spec.title, l);
  const description = grammar(spec.description, l);
  const image = e.publicUrl(siteDef.id) + OG_IMAGE;
  const head: string[] = [
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
    `<title>${esc(pageTitle(title, siteDef.brand[l]))}</title>`,
    `<meta name="description" content="${escAttr(description)}">`,
    '<meta name="theme-color" content="#3d160a">',
    '<meta name="apple-mobile-web-app-capable" content="yes">',
    '<meta name="mobile-web-app-capable" content="yes">',
    `<meta name="apple-mobile-web-app-title" content="${escAttr(siteDef.brand[l])}">`,
    '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">',
  ];
  if (e.preview || !indexable) head.push('<meta name="robots" content="noindex">');
  if (indexable) head.push(`<link rel="canonical" href="${escAttr(canonical)}">`);
  if (indexable && isOriginal) {
    for (const x of LANGS) head.push(`<link rel="alternate" hreflang="${x.id}" href="${escAttr(localHref(alternates[x.id]!, siteDef))}">`);
    head.push(`<link rel="alternate" hreflang="x-default" href="${escAttr(localHref(alternates.de!, siteDef))}">`);
  }
  head.push(
    `<meta property="og:title" content="${escAttr(title)}">`,
    `<meta property="og:description" content="${escAttr(description)}">`,
    `<meta property="og:type" content="${spec.ogType || 'website'}">`,
    `<meta property="og:url" content="${escAttr(canonical)}">`,
    `<meta property="og:image" content="${escAttr(image)}">`,
    '<meta property="og:image:type" content="image/png">',
    `<meta property="og:image:width" content="${OG_WIDTH}">`,
    `<meta property="og:image:height" content="${OG_HEIGHT}">`,
    `<meta property="og:image:alt" content="${escAttr(t('Holz, Saiten und ein Griffbild – {brand}', { brand: siteDef.brand[l] }))}">`,
    `<meta property="og:locale" content="${OG_LOCALE[l]}">`,
    ...LANGS.filter((x) => x.id !== l).map((x) => `<meta property="og:locale:alternate" content="${OG_LOCALE[x.id]}">`),
    `<meta property="og:site_name" content="${escAttr(siteDef.brand[l])}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<link rel="manifest" href="${currentBase}manifest.webmanifest">`,
    `<link rel="icon" href="${currentBase}icon.svg" type="image/svg+xml">`,
    `<link rel="apple-touch-icon" href="${currentBase}icon-180.png">`,
    `<link rel="stylesheet" href="${currentBase}${e.assets.css}">`,
  );
  const ld = indexable && isOriginal ? (spec.jsonld ? spec.jsonld() : []).concat(breadcrumbLd(spec, siteDef, l, e.publicUrl(siteDef.id)) || []) : [];
  for (const j of ld) head.push(`<script type="application/ld+json">${grammar(JSON.stringify(j), l).replace(/</g, '\\u003c')}</script>`);
  const attrs: string[] = [`lang="${l}"`, `data-base="${escAttr(currentBase)}"`, `data-brand="${escAttr(siteDef.brand[l])}"`, `data-site="${siteDef.id}"`];
  if (siteDef.instrument) attrs.push(`data-instrument="${siteDef.instrument}"`);
  if (spec.view) attrs.push(`data-route="${escAttr(spec.route)}"`);
  if (spec.hashParam) attrs.push('data-hash-param');
  const html =
    `<!doctype html>\n<html ${attrs.join(' ')}>\n<head>\n${head.join('\n')}\n</head>\n<body>\n` +
    `<div id="app">${grammar(body.map(serialize).join(''), l)}</div>\n` +
    (extra ? `<div class="page-extra">${grammar(serialize(extra), l)}</div>\n` : '') +
    serialize(footer(siteDef, l, indexable ? alternates : {})) +
    '\n<div id="live" class="sr-only" aria-live="polite"></div>\n' +
    `<script src="${currentBase}${e.assets.js}" defer></script>\n</body>\n</html>\n`;
  const path = pathOf(spec.route, l).replace(/#.*$/, '');
  const listed = indexable && isOriginal;
  return { file: path + 'index.html', html, alternates: listed ? alternates : {}, url: listed ? canonical : undefined };
}

/** Alle Seiten einer Instrument-Seite (bzw. der Startseite) in allen Sprachen. */
export function renderSite(siteId: SiteId, buildEnv: BuildEnv): Page[] {
  installDom();
  currentEnv = buildEnv;
  const siteDef = SITES.filter((s) => s.id === siteId)[0];
  currentBase = pathname(buildEnv.url(siteId));
  // Griffe, Saiten und Texte des Instruments der Seite (die Startseite zeigt keine Griffe)
  setInstrument(siteDef.instrument || 'ukulele');
  const pages: Page[] = [];
  for (const x of LANGS) {
    setLang(x.id);
    for (const spec of specsFor(siteDef, x.id)) pages.push(renderPage(spec, siteDef, x.id));
  }
  setLang('de');
  return pages;
}

/** Sitemap mit Sprachversionen je Adresse. */
export function sitemap(pages: Page[]): string {
  const urls = pages
    .filter((p) => p.url)
    .map(
      (p) =>
        `<url><loc>${esc(p.url!)}</loc>` +
        (Object.keys(p.alternates) as Lang[]).map((a) => `<xhtml:link rel="alternate" hreflang="${a}" href="${esc(p.alternates[a]!)}"/>`).join('') +
        (p.alternates.de ? `<xhtml:link rel="alternate" hreflang="x-default" href="${esc(p.alternates.de)}"/>` : '') +
        '</url>',
    );
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    urls.join('\n') +
    '\n</urlset>\n'
  );
}
