import { EN } from './i18n/en.ts';
import { FR } from './i18n/fr.ts';

/**
 * Übersetzungen: Der deutsche Text ist der Schlüssel, en/fr sind Wörterbücher. Fehlt ein Eintrag, bleibt es deutsch.
 * Alle Texte gehen durch t() (bzw. tk() für Tabellen, die erst beim Anzeigen übersetzt werden) – nur so findet der
 * Unit-Test fehlende Übersetzungen.
 */
export type Lang = 'de' | 'en' | 'fr';

export const LANGS: { id: Lang; name: string }[] = [
  { id: 'de', name: 'Deutsch' },
  { id: 'en', name: 'English' },
  { id: 'fr', name: 'Français' },
];

export const DICTS: Record<string, Record<string, string>> = { en: EN, fr: FR };

let current: Lang = 'de';
const listeners: (() => void)[] = [];

export function isLang(x: unknown): x is Lang {
  return x === 'de' || x === 'en' || x === 'fr';
}

/** de* → de, fr* → fr, alles andere → en. */
export function detectLang(languages: readonly string[]): Lang {
  for (const l of languages) {
    const p = String(l).toLowerCase().slice(0, 2);
    if (p === 'de' || p === 'fr' || p === 'en') return p;
  }
  return 'en';
}

/** Gespeicherte Wahl oder (nur im Browser) die Sprache des Geräts; in Node-Tests bleibt es deutsch. */
export function initLang(saved: unknown): Lang {
  let l: Lang = 'de';
  if (isLang(saved)) l = saved;
  else if (typeof document !== 'undefined' && typeof navigator !== 'undefined')
    l = detectLang(navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'de']);
  setLang(l);
  return l;
}

export function lang(): Lang {
  return current;
}

export function setLang(l: Lang): void {
  const changed = l !== current;
  current = l;
  if (typeof document !== 'undefined') document.documentElement.lang = l;
  if (changed) listeners.forEach((f) => f());
}

export function onLangChange(f: () => void): void {
  listeners.push(f);
}

type Params = Record<string, string | number>;

function fill(text: string, params?: Params): string {
  if (!params) return text;
  return text.replace(/\{(\w+)\}/g, (m, k: string) => (k in params ? String(params[k]) : m));
}

/** Französische Typografie: schmales geschütztes Leerzeichen vor ! ? ; : und in « ». */
function frenchSpaces(text: string): string {
  return text.replace(/ ([!?;:»])/g, ' $1').replace(/« /g, '« ');
}

export function t(key: string, params?: Params): string {
  if (current === 'de') return fill(key, params);
  const tr = DICTS[current][key];
  const text = fill(tr === undefined ? key : tr, params);
  return current === 'fr' ? frenchSpaces(text) : text;
}

/** Wie t(), aber Platzhalter dürfen Elemente sein (z. B. ein fetter Akkordname mitten im Satz). */
export function tParts<T>(key: string, params: Record<string, T | string>): (T | string)[] {
  const out: (T | string)[] = [];
  const parts = t(key).split(/\{(\w+)\}/);
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      if (parts[i]) out.push(parts[i]);
    } else out.push(parts[i] in params ? params[parts[i]] : `{${parts[i]}}`);
  }
  return out;
}

/** Nur markieren: Schlüssel in Tabellen auf Modulebene, übersetzt wird beim Anzeigen mit t(). */
export function tk(key: string): string {
  return key;
}

/** Einzahl/Mehrzahl; {n} steht für die Zahl. Im Französischen gilt auch 0 als Einzahl. */
export function tp(n: number, one: string, other: string, params?: Params): string {
  const single = current === 'fr' ? Math.abs(n) < 2 : n === 1;
  const p: Params = { n };
  if (params) for (const k of Object.keys(params)) p[k] = params[k];
  return t(single ? one : other, p);
}

/** Ordnungszahl für Bünde: „3.“, „3rd“, „3e“ (la case → „1re“). */
export function ordinal(n: number): string {
  if (current === 'en') {
    const tens = n % 100;
    const suffix = tens >= 11 && tens <= 13 ? 'th' : n % 10 === 1 ? 'st' : n % 10 === 2 ? 'nd' : n % 10 === 3 ? 'rd' : 'th';
    return `${n}${suffix}`;
  }
  if (current === 'fr') return n === 1 ? '1re' : `${n}e`;
  return `${n}.`;
}

const SOLFEGE: Record<string, string> = {
  C: 'Do',
  D: 'Ré',
  E: 'Mi',
  F: 'Fa',
  G: 'Sol',
  A: 'La',
  B: 'Si',
};

/**
 * Ausgeschriebener Tonname (Einzelton, Töne eines Akkords): im Französischen Solmisation (Do, Ré, Mi …).
 * Akkordsymbole (C, G7, Am) und Saitennamen (G C E A) bleiben in allen Sprachen Buchstaben.
 */
export function noteText(name: string): string {
  if (current !== 'fr') return name;
  const base = SOLFEGE[name.charAt(0)];
  return base ? base + name.slice(1) : name;
}
