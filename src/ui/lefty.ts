import { save } from '../store.ts';

/** Die Hand wurde umgestellt: Ansichten mit Griffbildern zeichnen neu. */
export const LEFTY_EVENT = 'saiten-hand';

/** Linkshänder ist eine Einmal-Einstellung (Einstellungen): kein Abzeichen, kein Schalter in den Ansichten. */
export function setLefty(on: boolean): void {
  save((p) => (p.settings.lefty = on));
  window.dispatchEvent(new Event(LEFTY_EVENT));
}
