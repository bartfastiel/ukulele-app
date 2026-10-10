/**
 * Selbst erzeugte Töne (angetipptes Griffbild, Blues-Hals, „Anhören“): Solange so ein Ton klingt und noch kurz danach
 * werten die Lauscher nichts – sonst lobte das Mikrofon den Lautsprecher statt des Kindes. Die Begleitung beim Spielen
 * zählt nicht dazu, sie läuft ja die ganze Zeit.
 */

/** So lange nach dem letzten eigenen Ton (in ms) bleibt das Mikrofon taub – Ausklang und Raumhall. */
export const OWN_SOUND_MS = 1200;

let until = 0;
let holding = 0;

const clock = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());

/** Ein eigener Ton wurde gerade angeschlagen. */
export function markOwnSound(at = clock()): void {
  until = Math.max(until, at + OWN_SOUND_MS);
}

/** Ein gehaltener eigener Ton beginnt; die zurückgegebene Funktion meldet das Loslassen (einmal). */
export function holdOwnSound(at = clock()): (endAt?: number) => void {
  holding++;
  markOwnSound(at);
  let done = false;
  return (endAt = clock()) => {
    if (done) return;
    done = true;
    holding = Math.max(0, holding - 1);
    markOwnSound(endAt);
  };
}

/** Klingt gerade (oder eben noch) ein selbst erzeugter Ton? */
export function hearingOwnSound(at = clock()): boolean {
  return holding > 0 || at < until;
}
