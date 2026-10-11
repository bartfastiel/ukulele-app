/**
 * Weihnachtszeit: 1. November bis 6. Januar. Der Hinweis darauf entsteht erst im Browser nach dessen Datum – vorgerendert
 * bleibt die Seite neutral, damit kein alter Zwischenspeicher im Sommer noch „Weihnachten“ zeigt.
 */
export function isChristmasSeason(d: Date): boolean {
  const m = d.getMonth();
  return m === 10 || m === 11 || (m === 0 && d.getDate() <= 6);
}

let prerendering = false;

/** Vorrendern im Build (src/site/pages.ts): kein Datum, kein saisonaler Hinweis. */
export function neutralSeason(): void {
  prerendering = true;
}

export function christmasNow(): boolean {
  return !prerendering && isChristmasSeason(new Date());
}
