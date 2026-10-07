import { parseSong, type Song } from './song.ts';
import { t } from '../i18n.ts';
import { importSong, MAX_TEXT } from './import.ts';
import { base64url, deflateRaw, fromBase64url, inflateRaw, utf8Decode, utf8Encode } from '../util/deflate.ts';

/** Ein selbst eingegebenes oder geschicktes Lied – liegt nur im Browser. */
export interface OwnSong {
  id: string;
  title: string;
  /** so wie eingegeben (ChordPro oder Akkordzeilen); umgewandelt wird beim Laden */
  text: string;
  meter: number;
  bpm: number;
  created: number;
  updated: number;
  /** über einen Link empfangen */
  shared?: boolean;
}

export const METERS = [
  { value: 3, label: '3/4' },
  { value: 4, label: '4/4' },
  { value: 6, label: '6/8' },
];
export const BPM_MIN = 40;
export const BPM_MAX = 200;
export const MAX_TITLE = 80;
export const OWN_PREFIX = 'mein-';

export function isOwnId(id: string): boolean {
  return id.indexOf(OWN_PREFIX) === 0;
}

function clampBpm(n: number): number {
  return Math.max(BPM_MIN, Math.min(BPM_MAX, Math.round(n)));
}

export function cleanTitle(title: string): string {
  return title.replace(/\s+/g, ' ').trim().slice(0, MAX_TITLE);
}

/** Prüft gespeicherte oder empfangene Daten; alles Unpassende fällt weg statt die App zu stören. */
export function sanitizeOwnSong(x: unknown): OwnSong | null {
  if (!x || typeof x !== 'object') return null;
  const o = x as Record<string, unknown>;
  if (typeof o.id !== 'string' || !/^mein-[a-z0-9-]{1,60}$/.test(o.id)) return null;
  if (typeof o.title !== 'string' || typeof o.text !== 'string') return null;
  const title = cleanTitle(o.title);
  if (!title) return null;
  const meter = METERS.some((m) => m.value === o.meter) ? (o.meter as number) : 4;
  const bpm = typeof o.bpm === 'number' && isFinite(o.bpm) ? clampBpm(o.bpm) : 90;
  const now = Date.now();
  return {
    id: o.id,
    title,
    text: o.text.slice(0, MAX_TEXT),
    meter,
    bpm,
    created: typeof o.created === 'number' ? o.created : now,
    updated: typeof o.updated === 'number' ? o.updated : now,
    shared: o.shared === true ? true : undefined,
  };
}

function slug(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .normalize('NFD')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 32)
      .replace(/-+$/, '') || 'lied'
  );
}

export function newOwnId(title: string, taken: string[]): string {
  const base = OWN_PREFIX + slug(title);
  let id = base;
  for (let n = 2; taken.indexOf(id) >= 0; n++) id = `${base}-${n}`;
  return id;
}

/** Als spielbares Lied (Akkord-Modus wie die ChordPro-Lieder); null, wenn keine Akkorde erkannt werden. */
export function ownToSong(o: OwnSong): Song | null {
  const imp = importSong(o.text);
  if (!imp.chords.length) return null;
  try {
    return parseSong({
      id: o.id,
      title: o.title,
      category: 'eigene',
      origin: o.shared ? t('Geschicktes Lied – nur auf diesem Gerät gespeichert.') : t('Dein eigenes Lied – nur auf diesem Gerät gespeichert.'),
      meter: o.meter,
      bpm: o.bpm,
      chordpro: imp.chordpro,
    });
  } catch {
    return null;
  }
}

// ---------- Teilen per Link ----------

export interface SharedSong {
  title: string;
  text: string;
  meter: number;
  bpm: number;
}

/** Größe, die ein entpackter Link höchstens haben darf (schützt vor absichtlich aufgeblähten Daten). */
const MAX_SHARED = 64 * 1024;

/**
 * Lied → Fragment-Daten. Erstes Zeichen = Format: „1“ DEFLATE + Base64url, „0“ nur Base64url (falls kürzer).
 * Geteilt wird das umgewandelte ChordPro, das ist kürzer als Akkordzeilen mit vielen Leerzeichen.
 */
export function encodeShare(s: SharedSong): string {
  const json = JSON.stringify({ t: cleanTitle(s.title), c: s.text, m: s.meter, b: s.bpm });
  const raw = utf8Encode(json);
  const packed = deflateRaw(raw);
  return packed.length < raw.length ? '1' + base64url(packed) : '0' + base64url(raw);
}

export function decodeShare(data: string): SharedSong | null {
  try {
    const kind = data.charAt(0);
    const bytes = fromBase64url(decodeURIComponent(data.slice(1)));
    if (!bytes || (kind !== '0' && kind !== '1')) return null;
    const raw = kind === '1' ? inflateRaw(bytes, MAX_SHARED) : bytes;
    if (raw.length > MAX_SHARED) return null;
    const o = JSON.parse(utf8Decode(raw)) as Record<string, unknown>;
    if (typeof o.t !== 'string' || typeof o.c !== 'string') return null;
    const title = cleanTitle(o.t);
    if (!title) return null;
    return {
      title,
      text: o.c.slice(0, MAX_TEXT),
      meter: METERS.some((m) => m.value === o.m) ? (o.m as number) : 4,
      bpm: typeof o.b === 'number' && isFinite(o.b) ? clampBpm(o.b) : 90,
    };
  } catch {
    return null;
  }
}
