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
    /** gewählte Sprache; '' = Sprache des Geräts */
    lang: string;
  };
}

const KEY = 'ukulele-club:v1';

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
    lang: '',
  },
};

let cache: Progress | null = null;
let persistAsked = false;

export function load(): Progress {
  if (cache) return cache;
  let data: Partial<Progress> = {};
  try {
    data = JSON.parse(localStorage.getItem(KEY) || '{}') as Partial<Progress>;
  } catch {
    data = {};
  }
  cache = { ...DEFAULTS, ...data, keys: { ...(data.keys || {}) }, settings: { ...DEFAULTS.settings, ...(data.settings || {}) } };
  return cache;
}

export function save(mutate: (p: Progress) => void): Progress {
  const p = load();
  mutate(p);
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
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
    cache = null;
    localStorage.setItem(KEY, JSON.stringify(data));
    load();
    return true;
  } catch {
    return false;
  }
}

// ---------- Eigene Lieder: eigener Schlüssel mit Versionsnummer, damit sich das Format später ändern kann ----------

const OWN_KEY = 'ukulele-club:eigene-lieder';
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
    raw = localStorage.getItem(OWN_KEY);
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
