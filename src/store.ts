/** Fortschritt und Einstellungen – nur lokal im Browser, kein Konto, nichts verlässt das Gerät. */
export interface Progress {
  stars: Record<string, number>;
  /** Übungstage als YYYY-MM-DD (Ortszeit). */
  days: string[];
  bestHunt: Record<string, number>;
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
  };
}

const KEY = 'ukulele-club:v1';

const DEFAULTS: Progress = {
  stars: {},
  days: [],
  bestHunt: {},
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
  cache = { ...DEFAULTS, ...data, settings: { ...DEFAULTS.settings, ...(data.settings || {}) } };
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
  return btoa(unescape(encodeURIComponent(JSON.stringify(load()))));
}

export function importCode(code: string): boolean {
  try {
    const data = JSON.parse(decodeURIComponent(escape(atob(code.trim())))) as Progress;
    if (typeof data !== 'object' || !data.stars) return false;
    cache = null;
    localStorage.setItem(KEY, JSON.stringify(data));
    load();
    return true;
  } catch {
    return false;
  }
}
