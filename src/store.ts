import { sanitizeOwnSong, type OwnSong } from './music/own-songs.ts';

/** Fortschritt und Einstellungen – nur lokal im Browser, kein Konto, nichts verlässt das Gerät. */
export interface Progress {
  stars: Record<string, number>;
  /** Übungstage als YYYY-MM-DD (Ortszeit). */
  days: string[];
  bestHunt: Record<string, number>;
  /** Gewählte Transposition je Lied in Halbtönen (0 = einfache Standardtonart). */
  keys: Record<string, number>;
  chordsChecked: string[];
  tunedStrings: number;
  lastSong: string | null;
  settings: {
    lefty: boolean;
    speed: number;
    tab: boolean;
    backing: boolean;
    melody: boolean;
    clickOn: boolean;
    waitMode: boolean;
    calm: boolean;
    /** schwere Griffe durch leichtere Verwandte ersetzen (E → E7 …) */
    simplify: boolean;
    /** andere Stimmung des Instruments; '' = Normalstimmung */
    tuning: string;
    /** Klang (Gitarre: nylon, stahl, e); '' = Vorgabe */
    sound: string;
    /** 12-saitige Gitarre */
    twelve: boolean;
    /** gewählte Sprache; '' = Sprache des Geräts */
    lang: string;
    /** E-Bass im Lied: nur Grundtöne oder Grundton und Quinte */
    bassLine: 'root' | 'fifth';
    /** E-Bass: die Basslinie zum Mitspielen vorspielen */
    bassDemo: boolean;
  };
}

/**
 * Fortschritt je Instrument – unter einer gemeinsamen Domain liegen alle Instrumente im selben Speicher. Früher gab es
 * nur einen Schlüssel je Subdomain; der gilt weiter, bis das Instrument zum ersten Mal speichert.
 */
const LEGACY_KEY = 'ukulele-club:v1';
function siteInstrument(): string {
  return (typeof document !== 'undefined' && document.documentElement.getAttribute('data-instrument')) || 'ukulele';
}
const progressKey = () => 'saiten:' + siteInstrument() + ':v1';
/** Zuletzt gespieltes Instrument – die Startseite bietet es oben an. */
const LAST_KEY = 'saiten:zuletzt';
/** Einstellungen, die für alle Instrumente gelten (die Hand wechselt nicht mit dem Instrument). */
const SHARED_KEY = 'saiten:einstellungen';

interface Shared {
  lefty: boolean;
}

/**
 * Gemeinsame Einstellungen lesen. Fehlen sie noch, gilt Linkshänder, wenn es bei irgendeinem Instrument (oder am
 * früheren Speicherort) eingeschaltet war – so übernimmt jedes Instrument die frühere Wahl.
 */
function readShared(): Shared {
  try {
    const raw = localStorage.getItem(SHARED_KEY);
    if (raw) {
      const data = JSON.parse(raw) as Partial<Shared>;
      if (data && typeof data.lefty === 'boolean') return { lefty: data.lefty };
    }
  } catch {
    // kaputt oder kein Speicher: wie neu
  }
  let lefty = false;
  try {
    const store = localStorage;
    const keys: string[] = [LEGACY_KEY];
    if (typeof store.key === 'function') for (let i = 0; i < store.length; i++) keys.push(store.key(i) || '');
    for (const k of keys) {
      if (k !== LEGACY_KEY && !/^saiten:[a-z]+:v1$/.test(k)) continue;
      const data = JSON.parse(store.getItem(k) || '{}') as Partial<Progress>;
      if (data && data.settings && data.settings.lefty === true) lefty = true;
    }
  } catch {
    // ohne lesbaren Speicher bleibt es bei rechts
  }
  writeShared({ lefty });
  return { lefty };
}

function writeShared(shared: Shared): void {
  try {
    localStorage.setItem(SHARED_KEY, JSON.stringify(shared));
  } catch {
    // privater Modus: gilt nur bis zum Neuladen
  }
}

const DEFAULTS: Progress = {
  stars: {},
  days: [],
  bestHunt: {},
  keys: {},
  chordsChecked: [],
  tunedStrings: 0,
  lastSong: null,
  settings: {
    lefty: false,
    speed: 0.7,
    tab: false,
    backing: true,
    melody: true,
    clickOn: true,
    waitMode: true,
    calm: false,
    simplify: false,
    tuning: '',
    sound: '',
    twelve: false,
    lang: '',
    bassLine: 'root',
    bassDemo: false,
  },
};

let cache: Progress | null = null;
let persistAsked = false;

export function load(): Progress {
  if (cache) return cache;
  let data: Partial<Progress> = {};
  try {
    data = JSON.parse(localStorage.getItem(progressKey()) || localStorage.getItem(LEGACY_KEY) || '{}') as Partial<Progress>;
  } catch {
    data = {};
  }
  cache = { ...DEFAULTS, ...data, keys: { ...(data.keys || {}) }, settings: { ...DEFAULTS.settings, ...(data.settings || {}) } };
  cache.settings.lefty = readShared().lefty;
  return cache;
}

export function save(mutate: (p: Progress) => void): Progress {
  const p = load();
  mutate(p);
  writeShared({ lefty: p.settings.lefty });
  try {
    localStorage.setItem(progressKey(), JSON.stringify(p));
  } catch {
    // privater Modus oder voller Speicher: die App läuft trotzdem, nur ohne Gedächtnis
  }
  if (!persistAsked && navigator.storage && navigator.storage.persist) {
    persistAsked = true;
    // Safari löscht Website-Daten sonst nach 7 Tagen ohne Besuch
    navigator.storage.persist().catch(() => undefined);
  }
  return p;
}

export function today(): string {
  const d = new Date();
  const pad = (n: number) => (n < 10 ? '0' : '') + n;
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function markPracticed(): void {
  const t = today();
  if (!load().days.includes(t)) save((p) => p.days.push(t));
}

export function giveStars(songId: string, n: number): boolean {
  const before = load().stars[songId] || 0;
  if (n <= before) return false;
  save((p) => (p.stars[songId] = n));
  return true;
}

export function totalStars(): number {
  const s = load().stars;
  return Object.keys(s).reduce((sum, k) => sum + s[k], 0);
}

/** Wie viele der letzten 7 Tage (inklusive heute) wurde geübt? */
export function daysThisWeek(): boolean[] {
  const days = new Set(load().days);
  const out: boolean[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const pad = (n: number) => (n < 10 ? '0' : '') + n;
    out.push(days.has(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`));
  }
  return out;
}

export function exportCode(): string {
  const data: Progress & { ownSongs?: OwnSong[] } = { ...load() };
  if (ownSongs().length) data.ownSongs = ownSongs();
  return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
}

export function importCode(code: string): boolean {
  try {
    const data = JSON.parse(decodeURIComponent(escape(atob(code.trim())))) as Progress & { ownSongs?: unknown };
    if (typeof data !== 'object' || !data.stars) return false;
    // eigene Lieder kommen dazu, vorhandene mit gleicher id werden ersetzt
    if (Array.isArray(data.ownSongs)) {
      const incoming = readOwn(JSON.stringify({ songs: data.ownSongs }));
      writeOwn(ownSongs().filter((s) => !incoming.some((x) => x.id === s.id)).concat(incoming));
    }
    delete data.ownSongs;
    if (data.settings && typeof data.settings.lefty === 'boolean') writeShared({ lefty: data.settings.lefty });
    cache = null;
    localStorage.setItem(progressKey(), JSON.stringify(data));
    load();
    return true;
  } catch {
    return false;
  }
}

// ---------- Eigene Lieder: eigener Schlüssel mit Versionsnummer, damit sich das Format später ändern kann ----------

// für alle Instrumente gemeinsam: Akkorde passen sich beim Spielen dem Instrument an
const OWN_KEY = 'saiten:eigene-lieder';
const LEGACY_OWN_KEY = 'ukulele-club:eigene-lieder';
const OWN_VERSION = 1;
let ownCache: OwnSong[] | null = null;

function readOwn(raw: string | null): OwnSong[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw) as { version?: number; songs?: unknown };
    if (!data || !Array.isArray(data.songs)) return [];
    // neuere Version (von einem anderen Gerät mit neuerer App): lesen, was sich lesen lässt
    const out: OwnSong[] = [];
    for (const x of data.songs) {
      const s = sanitizeOwnSong(x);
      if (s && !out.some((o) => o.id === s.id)) out.push(s);
    }
    return out;
  } catch {
    return [];
  }
}

export function ownSongs(): OwnSong[] {
  if (ownCache) return ownCache;
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(OWN_KEY) || localStorage.getItem(LEGACY_OWN_KEY);
  } catch {
    raw = null;
  }
  ownCache = readOwn(raw);
  return ownCache;
}

function writeOwn(list: OwnSong[]): boolean {
  try {
    localStorage.setItem(OWN_KEY, JSON.stringify({ version: OWN_VERSION, songs: list }));
  } catch {
    return false;
  }
  ownCache = list;
  if (!persistAsked && navigator.storage && navigator.storage.persist) {
    persistAsked = true;
    navigator.storage.persist().catch(() => undefined);
  }
  return true;
}

/** Neu anlegen oder ersetzen. false, wenn der Browser nichts speichern lässt (privater Modus, Speicher voll). */
export function putOwnSong(song: OwnSong): boolean {
  const list = ownSongs().filter((s) => s.id !== song.id);
  list.push(song);
  return writeOwn(list);
}

export function removeOwnSong(id: string): boolean {
  const ok = writeOwn(ownSongs().filter((s) => s.id !== id));
  if (ok)
    save((p) => {
      delete p.keys[id];
      if (p.lastSong === id) p.lastSong = null;
    });
  return ok;
}

// ---------- Zuletzt gespieltes Instrument und Umzug auf eine neue Adresse ----------

export function rememberInstrument(): void {
  try {
    localStorage.setItem(LAST_KEY, siteInstrument());
  } catch {
    // ohne Speicher bietet die Startseite eben nichts an
  }
}

export function lastInstrument(): string | null {
  try {
    return localStorage.getItem(LAST_KEY);
  } catch {
    return null;
  }
}

/**
 * Daten von der alten Adresse übernehmen (src/site/move.ts): Sterne und Bestwerte das Bessere von beiden, Übungstage
 * zusammen, sonst gilt, was hier schon war; eigene Lieder kommen dazu. false bei kaputten Daten.
 */
export function takeMoved(code: string): boolean {
  let data: { p?: string | null; o?: string | null };
  try {
    data = JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(code))))) as typeof data;
  } catch {
    return false;
  }
  if (!data || typeof data !== 'object') return false;
  if (data.p) {
    let incoming: Partial<Progress>;
    try {
      incoming = JSON.parse(data.p) as Partial<Progress>;
    } catch {
      incoming = {};
    }
    if (incoming && incoming.settings && incoming.settings.lefty === true) writeShared({ lefty: true });
    let had = false;
    try {
      had = !!localStorage.getItem(progressKey());
    } catch {
      had = false;
    }
    cache = null;
    if (!had) {
      try {
        localStorage.setItem(progressKey(), JSON.stringify(incoming));
      } catch {
        return false;
      }
    } else
      save((p) => {
        const stars = incoming.stars || {};
        for (const id of Object.keys(stars)) p.stars[id] = Math.max(p.stars[id] || 0, stars[id]);
        const hunt = incoming.bestHunt || {};
        for (const id of Object.keys(hunt)) p.bestHunt[id] = Math.max(p.bestHunt[id] || 0, hunt[id]);
        for (const d of incoming.days || []) if (p.days.indexOf(d) < 0) p.days.push(d);
        p.days.sort();
      });
  }
  if (data.o) {
    const incoming = readOwn(data.o);
    const mine = ownSongs();
    writeOwn(mine.concat(incoming.filter((s) => !mine.some((x) => x.id === s.id))));
  }
  return true;
}
