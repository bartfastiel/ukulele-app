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

export function go(route: string): void {
  location.href = link(route);
}

/** Markenname der Instrument-Seite (z. B. „Ukulele-Club“), vom Build in die Seite geschrieben. */
export function brand(): string {
  return attr('data-brand') || 'Ukulele-Club';
}
