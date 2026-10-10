import { routePath } from './routes.ts';
import { isOwnId } from '../music/own-songs.ts';
import { lang, type Lang } from '../i18n.ts';

function attr(name: string): string | null {
  return typeof document === 'undefined' ? null : document.documentElement.getAttribute(name);
}

/** Basis der Instrument-Seite, z. B. „/“ (eigene Subdomain) oder „/vorschau-…/pr-12/ukulele/“. */
export function base(): string {
  return attr('data-base') || '/';
}

/** Interne Route („lied/<id>“, „akkorde“, „“ …) als Adresse in der aktuellen (oder angegebenen) Sprache. */
export function link(route: string, l: Lang = lang()): string {
  return base() + routePath(route, l, isOwnId);
}

/** Adresse einer anderen Instrument-Seite dieses Builds (vom Build als data-sites="id=adresse …" geschrieben), sonst null. */
export function otherSite(id: string): string | null {
  const list = (attr('data-sites') || '').split(' ');
  for (const x of list) {
    const i = x.indexOf('=');
    if (i > 0 && x.slice(0, i) === id) return x.slice(i + 1);
  }
  return null;
}

/** Route auf einer anderen Instrument-Seite, z. B. dieselbe Akkordseite bei der Bariton-Ukulele. */
export function siteLink(id: string, route: string, l: Lang = lang()): string {
  return (otherSite(id) || base()) + routePath(route, l, isOwnId);
}

export function go(route: string): void {
  location.href = link(route);
}

/** Markenname der Instrument-Seite (z. B. „Ukulele-Club“), vom Build in die Seite geschrieben. */
export function brand(): string {
  return attr('data-brand') || 'Ukulele-Club';
}
