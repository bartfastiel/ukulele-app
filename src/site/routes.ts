import { ROOTS, parseChordName } from '../music/chords.ts';
import type { Lang } from '../i18n.ts';

/**
 * Adressen der Website. Intern heißen Seiten wie früher die Hash-Routen („lied/<id>“, „akkord/C“); hier werden sie zu
 * echten Pfaden je Sprache (Deutsch ohne Präfix, /en/, /fr/). Persönliche Daten (eigene Lieder, geteilte Lieder)
 * stehen hinter dem „#“ und erreichen so nie den Server.
 */
export const SEGMENTS: Record<string, Record<Lang, string>> = {
  lieder: { de: 'lieder', en: 'songs', fr: 'chansons' },
  akkorde: { de: 'akkorde', en: 'chords', fr: 'accords' },
  spiel: { de: 'akkord-spiel', en: 'chord-game', fr: 'jeu-des-accords' },
  stimmen: { de: 'stimmgeraet', en: 'tuner', fr: 'accordeur' },
  rhythmus: { de: 'rhythmus', en: 'rhythm', fr: 'rythme' },
  sterne: { de: 'sterne', en: 'stars', fr: 'etoiles' },
  aufnahme: { de: 'aufnahmen', en: 'recordings', fr: 'enregistrements' },
  detektiv: { de: 'akkord-detektiv', en: 'chord-detective', fr: 'detective-des-accords' },
  blues: { de: 'blues', en: 'blues', fr: 'blues' },
  'eigenes-lied': { de: 'eigenes-lied', en: 'my-song', fr: 'ma-chanson' },
  'lied-teilen': { de: 'lied-teilen', en: 'share-song', fr: 'partager' },
  teilen: { de: 'geteiltes-lied', en: 'shared-song', fr: 'chanson-partagee' },
  wissen: { de: 'wissen', en: 'learn', fr: 'apprendre' },
  impressum: { de: 'impressum', en: 'imprint', fr: 'mentions-legales' },
  datenschutz: { de: 'datenschutz', en: 'privacy', fr: 'confidentialite' },
  ueber: { de: 'ueber', en: 'about', fr: 'a-propos' },
};

/** Seiten, deren Parameter hinter dem „#“ steht (nur im Browser bekannt, daher nicht vorgerendert). */
export const HASH_PARAM = ['eigenes-lied', 'lied-teilen', 'teilen'];

/** Eigene Lieder: eine Player-Seite, die das Lied aus dem Gerät lädt. */
export const OWN_SONG_SEGMENT = 'eigen';

/** Akkordname → Pfadteil: „F#m“ → „f-sharp-m“, „Bb7“ → „b-flat-7“, „C“ → „c“. */
export function chordSlug(name: string): string {
  const p = parseChordName(name);
  if (!p) return encodeURIComponent(name.toLowerCase());
  const root = ROOTS[p.root];
  let out = root.charAt(0).toLowerCase();
  if (root.charAt(1) === '#') out += '-sharp';
  if (root.charAt(1) === 'b') out += '-flat';
  if (p.quality) out += '-' + p.quality.toLowerCase();
  return out;
}

/** Gebräuchliche Schreibweise (C#, Eb, F#, Ab, Bb) für Links auf Akkordseiten. */
export function canonicalChord(name: string): string {
  const p = parseChordName(name);
  return p ? ROOTS[p.root] + p.quality : name;
}

/**
 * Pfad relativ zur Basis der Instrument-Seite, z. B. „en/songs/alle-meine-entchen/“ oder „lieder/eigen/#mein-lied“.
 * `articleSlug` löst Wissensartikel auf (nur im Build bekannt; im Browser genügt die Übersicht).
 */
export function routePath(route: string, lang: Lang, isOwn: (id: string) => boolean, articleSlug?: (id: string, lang: Lang) => string | undefined): string {
  const i = route.indexOf('/');
  const name = i < 0 ? route : route.slice(0, i);
  const param = i < 0 ? '' : route.slice(i + 1);
  const prefix = lang === 'de' ? '' : lang + '/';
  if (!name) return prefix;
  if (name === 'lied') {
    const seg = SEGMENTS.lieder[lang];
    if (isOwn(param)) return `${prefix}${seg}/${OWN_SONG_SEGMENT}/#${encodeURIComponent(param)}`;
    return `${prefix}${seg}/${param}/`;
  }
  if (name === 'akkord') return `${prefix}${SEGMENTS.akkorde[lang]}/${chordSlug(decodeURIComponent(param))}/`;
  const seg = SEGMENTS[name];
  if (!seg) return prefix;
  if (HASH_PARAM.indexOf(name) >= 0) return `${prefix}${seg[lang]}/${param ? '#' + param : ''}`;
  if (name === 'wissen' && param) {
    const slug = articleSlug ? articleSlug(param, lang) : undefined;
    return `${prefix}${seg[lang]}/${slug ? slug + '/' : ''}`;
  }
  return `${prefix}${seg[lang]}/`;
}
