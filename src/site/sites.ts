import type { Lang } from '../i18n.ts';

/** Instrument-Seiten (je eine Subdomain) und die Startseite ohne Subdomain (nur Instrumentenwahl). */
export type SiteId = 'ukulele' | 'gitarre' | 'banjo' | 'start';

export interface SiteDef {
  id: SiteId;
  /** Instrument der Seite (für data-instrument); die Startseite hat keins. */
  instrument: 'ukulele' | 'gitarre' | 'banjo' | null;
  brand: Record<Lang, string>;
  /** Instrumentname, wie er in Titeln steht („Lieder für Ukulele“). */
  name: Record<Lang, string>;
}

export const SITES: SiteDef[] = [
  {
    id: 'ukulele',
    instrument: 'ukulele',
    brand: { de: 'Ukulele-Club', en: 'Ukulele Club', fr: 'Club Ukulélé' },
    name: { de: 'Ukulele', en: 'ukulele', fr: 'ukulélé' },
  },
  {
    id: 'gitarre',
    instrument: 'gitarre',
    brand: { de: 'Gitarren-Club', en: 'Guitar Club', fr: 'Club Guitare' },
    name: { de: 'Gitarre', en: 'guitar', fr: 'guitare' },
  },
  {
    id: 'banjo',
    instrument: 'banjo',
    brand: { de: 'Banjo-Club', en: 'Banjo Club', fr: 'Club Banjo' },
    name: { de: 'Banjo', en: 'banjo', fr: 'banjo' },
  },
  {
    id: 'start',
    instrument: null,
    brand: { de: 'Saiten-Club', en: 'Strings Club', fr: 'Club des cordes' },
    name: { de: 'Saiteninstrumente', en: 'string instruments', fr: 'instruments à cordes' },
  },
];

export function site(id: SiteId): SiteDef {
  return SITES.filter((s) => s.id === id)[0];
}
