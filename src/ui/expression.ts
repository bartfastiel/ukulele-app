/**
 * Ausdruck mit dem Finger auf dem Hals – reine Rechenlogik ohne DOM, damit sie sich testen lässt.
 *
 * - Druck: Viele Geräte melden gar keinen oder immer denselben Wert (0, 0,5, 1). Erst wenn mehrere verschiedene Werte
 *   kommen, gilt der Sensor als echt; der Bereich lernt sich selbst.
 * - Vibrato: Wiegt der Finger entlang der Saite hin und her (mindestens zwei Umkehrungen in 0,6 s), schwingt der Ton.
 *   Ein einmaliges Verschieben ist kein Vibrato.
 * - Ziehen: Schiebt der Finger quer zur Saite, klingt der Ton höher – wie beim echten Ziehen (Bending).
 * - Rutschen: Gleitet der Finger entlang der Saite in den Nachbarbund, rutscht der Ton mit (Slide).
 */

const MEANINGLESS = [0, 0.5, 1];

export class PressureSense {
  private seen: number[] = [];
  private low = 1;
  private high = 0;

  observe(p: number | undefined): void {
    if (typeof p !== 'number' || !isFinite(p)) return;
    if (p > 0 && p !== 0.5) this.high = Math.max(this.high, p);
    if (MEANINGLESS.indexOf(p) >= 0) return;
    if (this.seen.length < 8 && this.seen.indexOf(p) < 0) this.seen.push(p);
    this.low = Math.min(this.low, p);
  }

  get supported(): boolean {
    return this.seen.length >= 4;
  }

  /** 0 … 1 im gelernten Bereich; ohne echten Sensor null. */
  normalised(p: number | undefined): number | null {
    if (!this.supported || typeof p !== 'number' || this.high <= this.low) return null;
    return Math.max(0, Math.min(1, (p - this.low) / (this.high - this.low)));
  }
}

/** Anschlagstärke aus dem Druck (ohne Sensor ein mittlerer Wert). */
export function strikeGain(pressure: number | null): number {
  return pressure === null ? 0.6 : 0.3 + 0.55 * Math.pow(pressure, 0.7);
}

const MIN_SWING = 2;
const FULL_SWING = 16;
const WINDOW = 0.6;
const RISE = 0.06;
const FALL = 0.26;
/** Größte Vibrato-Tiefe in Cent: Gitarre und Ukulele vertragen etwas mehr als ein Streicher. */
export const VIBRATO_CENTS = 25;

/** Erkennt Hin-und-her-Wiegen aus Positionen in Pixeln entlang der Saite. */
export class VibratoDetector {
  private turns: { t: number; swing: number }[] = [];
  private dir = 0;
  private extreme = 0;
  /** letzter Umkehrpunkt (bzw. Aufsetzpunkt): die Auslenkung ist der halbe Weg zwischen zwei Umkehrpunkten */
  private peak = 0;
  private first = true;
  private lastT = -1;
  depth = 0;
  rate = 5;

  /** Neue Position `x` (px) zur Zeit `t` (s); liefert die geglättete Tiefe 0 … 1. */
  update(x: number, t: number): number {
    if (this.lastT < 0) {
      this.extreme = x;
      this.peak = x;
      this.lastT = t;
      return 0;
    }
    const dt = Math.min(0.1, Math.max(0, t - this.lastT));
    this.lastT = t;
    const d = x - this.extreme;
    if (this.dir === 0) {
      if (Math.abs(d) > MIN_SWING) {
        this.dir = d > 0 ? 1 : -1;
        this.extreme = x;
      }
    } else if (d * this.dir > 0) this.extreme = x;
    else if (-d * this.dir > MIN_SWING) {
      const travel = Math.abs(this.extreme - this.peak);
      this.turns.push({ t, swing: this.first ? travel : travel / 2 });
      this.first = false;
      this.peak = this.extreme;
      this.dir = -this.dir;
      this.extreme = x;
    }
    while (this.turns.length && t - this.turns[0].t > WINDOW) this.turns.shift();
    let target = 0;
    if (this.turns.length >= 2) {
      const span = Math.max(0.05, t - this.turns[0].t);
      this.rate = Math.max(3, Math.min(9, (this.turns.length - 1) / 2 / span));
      const swing = this.turns.reduce((s, x) => s + x.swing, 0) / this.turns.length;
      target = Math.max(0.15, Math.min(1, (swing - MIN_SWING) / (FULL_SWING - MIN_SWING)));
    }
    const tau = target > this.depth ? RISE : FALL;
    this.depth += (target - this.depth) * (1 - Math.exp(-dt / tau));
    return this.depth;
  }
}

/** Ziehen quer zur Saite: Abstand in Saitenabständen → Halbtöne (eine Saite weit ≈ ein Ganzton, höchstens 1,5 Töne). */
export function bendSemis(across: number): number {
  const a = Math.abs(across) - 0.15;
  return a <= 0 ? 0 : Math.min(3, a * 2.4);
}

/**
 * Rutschen entlang der Saite: Bund unter dem Finger mit etwas Widerstand an der Grenze (erst 18 % im Nachbarbund
 * wechselt er), damit ein Wiegen für Vibrato den Bund nicht wechselt. `along` in Bundbreiten ab Bundmitte.
 */
export function slideFret(startFret: number, along: number, current: number, min: number, max: number): number {
  const exact = startFret + along;
  const hold = 0.5 + 0.18;
  if (Math.abs(exact - current) < hold) return current;
  return Math.max(min, Math.min(max, Math.round(exact)));
}
