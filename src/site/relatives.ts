import { h } from '../ui/dom.ts';
import { t, tk } from '../i18n.ts';
import { otherSite, siteLink } from './nav.ts';

/**
 * Verwandte Instrumente, die man leicht verwechselt: Wer mit einer Bariton-Ukulele auf der Ukulele-Seite landet, findet
 * dort falsche Griffe. Ein kleiner Hinweis führt zur selben Seite beim Verwandten. Nur echte Verwandte; ein Eintrag
 * wirkt erst, wenn es die Seite des Verwandten gibt (z. B. `bass`).
 */
interface Relative {
  from: string;
  to: string;
  /** Text je Seitenart: Akkordseite (mit {chord}) und Stimmgerät. Fehlt er, kein Hinweis auf dieser Seitenart. */
  akkord?: string;
  stimmen?: string;
}

export const RELATIVES: Relative[] = [
  {
    from: 'ukulele',
    to: 'bariton',
    akkord: tk('Du spielst Bariton-Ukulele? Dort greifst du {chord} anders'),
    stimmen: tk('Du spielst Bariton-Ukulele? Die wird tiefer gestimmt: D G B E'),
  },
  {
    from: 'bariton',
    to: 'ukulele',
    akkord: tk('Sopran-, Konzert- oder Tenor-Ukulele? Dort greifst du {chord} anders'),
    stimmen: tk('Sopran-, Konzert- oder Tenor-Ukulele? Die wird höher gestimmt: G C E A'),
  },
  { from: 'bariton', to: 'gitarre', akkord: tk('Gitarre? {chord} hat auf den vier hohen Saiten dieselbe Form') },
  { from: 'gitarre', to: 'bariton', akkord: tk('Bariton-Ukulele? {chord} hat dieselbe Form wie auf den vier hohen Gitarrensaiten') },
  { from: 'gitarre', to: 'bass', stimmen: tk('E-Bass? Gestimmt wie die vier tiefen Gitarrensaiten, nur eine Oktave tiefer') },
  { from: 'bass', to: 'gitarre', stimmen: tk('Gitarre? Ihre vier tiefen Saiten klingen wie der Bass, eine Oktave höher') },
];

/**
 * Hinweise für eine Seite der aktuellen Instrument-Seite, z. B. `akkord/C` oder `stimmen` – leer, wenn es keinen
 * Verwandten mit dieser Seite gibt.
 */
export function relativeHints(route: string, chordName = ''): HTMLElement[] {
  const kind = route.split('/')[0] as 'akkord' | 'stimmen';
  const here = document.documentElement.getAttribute('data-site');
  return RELATIVES.filter((r) => r.from === here && r[kind] && otherSite(r.to) !== null).map((r) =>
    h('p', { class: 'card relative-hint' }, h('a', { href: siteLink(r.to, route) }, t(r[kind]!, { chord: chordName }), ' ›')),
  );
}
