import type { Lang } from '../i18n.ts';

/** Instrument-Seiten (je eine Subdomain) und die Startseite ohne Subdomain (nur Instrumentenwahl). */
export type SiteId = 'ukulele' | 'gitarre' | 'banjo' | 'bariton' | 'mandoline' | 'bass' | 'start';

export interface SiteDef {
  id: SiteId;
  /** Instrument der Seite (für data-instrument); die Startseite hat keins. */
  instrument: 'ukulele' | 'gitarre' | 'banjo' | 'bariton' | 'mandoline' | 'bass' | null;
  brand: Record<Lang, string>;
  /** Instrumentname, wie er in Titeln steht („Lieder für Ukulele“). */
  name: Record<Lang, string>;
}

export const SITES: SiteDef[] = [
  {
    id: 'ukulele',
    instrument: 'ukulele',
    brand: { de: 'Open String Ukulele', en: 'Open String Ukulele', fr: 'Open String Ukulélé' },
    name: { de: 'Ukulele', en: 'ukulele', fr: 'ukulélé' },
  },
  {
    id: 'gitarre',
    instrument: 'gitarre',
    brand: { de: 'Open String Gitarre', en: 'Open String Guitar', fr: 'Open String Guitare' },
    name: { de: 'Gitarre', en: 'guitar', fr: 'guitare' },
  },
  {
    id: 'banjo',
    instrument: 'banjo',
    brand: { de: 'Open String Banjo', en: 'Open String Banjo', fr: 'Open String Banjo' },
    name: { de: 'Banjo', en: 'banjo', fr: 'banjo' },
  },
  {
    id: 'bariton',
    instrument: 'bariton',
    brand: { de: 'Open String Bariton-Ukulele', en: 'Open String Baritone Ukulele', fr: 'Open String Ukulélé baryton' },
    name: { de: 'Bariton-Ukulele', en: 'baritone ukulele', fr: 'ukulélé baryton' },
  },
  {
    id: 'mandoline',
    instrument: 'mandoline',
    brand: { de: 'Open String Mandoline', en: 'Open String Mandolin', fr: 'Open String Mandoline' },
    name: { de: 'Mandoline', en: 'mandolin', fr: 'mandoline' },
  },
  {
    id: 'bass',
    instrument: 'bass',
    brand: { de: 'Open String E-Bass', en: 'Open String Bass', fr: 'Open String Basse' },
    name: { de: 'E-Bass', en: 'bass guitar', fr: 'basse électrique' },
  },
  {
    id: 'start',
    instrument: null,
    brand: { de: 'Open String', en: 'Open String', fr: 'Open String' },
    name: { de: 'Saiteninstrumente', en: 'string instruments', fr: 'instruments à cordes' },
  },
];

export function site(id: SiteId): SiteDef {
  return SITES.filter((s) => s.id === id)[0];
}
