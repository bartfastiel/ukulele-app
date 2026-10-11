/**
 * Ausdruck mit dem Finger auf dem Hals – reine Rechenlogik ohne DOM, damit sie sich testen lässt.
 *
 * - Anschlag: Druck bzw. Kontaktfläche beim Aufsetzen bestimmen Lautstärke und Klangfarbe. Geräte ohne Sensor melden
 *   gar keinen oder immer denselben Wert; dort klingt jeder Anschlag gleich.
 * - Vibrato: Wiegt der Finger entlang der Saite hin und her (mindestens zwei Umkehrungen in 0,6 s), schwingt der Ton.
 *   Ein einmaliges Verschieben ist kein Vibrato.
 * - Ziehen: Schiebt der Finger quer zur Saite, klingt der Ton höher – wie beim echten Ziehen (Bending), bis gut einen
 *   Halbton.
 * - Rutschen: Gleitet der Finger entlang der Saite in den Nachbarbund, rutscht der Ton mit (Slide).
 */

/** Ein Messpunkt eines Fingers: `force` wie gemeldet, `radius` = mittlerer Kontaktradius in CSS-Pixeln. */
export interface TouchSample {
  force?: number;
  radius?: number;
}

/** So viele verschiedene Werte braucht ein Kanal, bevor er als echter Sensor gilt. */
const DISTINCT = 4;
/** Nach so vielen Messpunkten ohne genug verschiedene, fein abgestufte Werte gilt ein Kanal als stumm. */
const GIVE_UP = 16;
/** Anschläge, aus denen sich der Bereich lernt (ältere fallen heraus, damit ein Ausreißer nicht für immer bleibt). */
const HISTORY = 24;
/** Bis so viele Anschläge gelernt sind, gibt ein Bereich um den Median den ersten Anschlägen Halt. */
const PRIOR_UNTIL = 6;

/**
 * Ein Messkanal (Kraft oder Kontaktfläche). Echt ist er erst, wenn mehrere verschiedene, fein abgestufte Werte kommen:
 * Konstanten (0, 0,5, 1 beim Druck; immer derselbe Radius) und grob gestufte Radien (manche Tablets runden auf etwa
 * 5 px) geben keine verlässliche Dynamik und zählen nicht. Der Bereich lernt sich aus den letzten Anschlägen.
 */
export class StrikeChannel {
  private seen: number[] = [];
  private count = 0;
  private strikes: number[] = [];
  private readonly meaningless: number[];
  /** größter Abstand zweier benachbarter Werte, damit der Kanal als fein abgestuft gilt */
  private readonly fineStep: number;
  /** kleinstes Verhältnis hoch/tief, damit Rauschen nicht zur vollen Dynamik aufgeblasen wird */
  private readonly minRatio: number;

  constructor(meaningless: number[], fineStep: number, minRatio: number) {
    this.meaningless = meaningless;
    this.fineStep = fineStep;
    this.minRatio = minRatio;
  }

  observe(v: number | undefined): void {
    if (typeof v !== 'number' || !isFinite(v) || v <= 0) return;
    this.count++;
    if (this.meaningless.indexOf(v) >= 0) return;
    if (this.seen.length < 16 && this.seen.indexOf(v) < 0) this.seen.push(v);
  }

  get supported(): boolean {
    if (this.seen.length < DISTINCT) return false;
    const s = this.seen.slice().sort((a, b) => a - b);
    let finest = Infinity;
    for (let i = 1; i < s.length; i++) finest = Math.min(finest, s[i] - s[i - 1]);
    return finest <= this.fineStep;
  }

  /** Noch offen, ob der Kanal etwas taugt (bis genug Messpunkte da sind). */
  get undecided(): boolean {
    return !this.supported && this.count < GIVE_UP;
  }

  /** Lohnt es sich bei diesem Wert, kurz auf den Anstieg zu warten? */
  promising(v: number | undefined): boolean {
    if (this.supported) return true;
    return this.undecided && typeof v === 'number' && v > 0 && this.meaningless.indexOf(v) < 0;
  }

  /** Spitzenwert eines Anschlags → 0 … 1 im gelernten Bereich (logarithmisch); ohne echten Sensor null. */
  level(peak: number | undefined): number | null {
    if (!this.supported || typeof peak !== 'number' || !(peak > 0)) return null;
    const pts = this.strikes.slice();
    if (pts.length < PRIOR_UNTIL) {
      const ref = pts.length ? median(pts) : peak;
      pts.push(ref / 1.4, ref * 1.4);
    }
    let lo = Math.min.apply(null, pts);
    let hi = Math.max.apply(null, pts);
    if (hi / lo < this.minRatio) {
      const mid = Math.sqrt(hi * lo);
      lo = mid / Math.sqrt(this.minRatio);
      hi = mid * Math.sqrt(this.minRatio);
    }
    return Math.max(0, Math.min(1, Math.log(peak / lo) / Math.log(hi / lo)));
  }

  /** Spitzenwert eines Anschlags für den Bereich merken. */
  learn(peak: number | undefined): void {
    if (!this.supported || typeof peak !== 'number' || !(peak > 0)) return;
    this.strikes.push(peak);
    if (this.strikes.length > HISTORY) this.strikes.shift();
  }
}

function median(xs: number[]): number {
  const s = xs.slice().sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : Math.sqrt(s[m - 1] * s[m]);
}

/**
 * Anschlagstärke aus Druck und Kontaktfläche. Viele Android-Geräte melden als „Druck“ in Wahrheit die Fläche unter dem
 * Finger; beide wachsen in den ersten Millisekunden nach dem Aufsetzen – fest getippt schneller und weiter. Deshalb
 * zählt der höchste Wert kurz nach dem Aufsetzen, nicht der erste.
 */
export class StrikeSense {
  readonly force = new StrikeChannel([0, 0.5, 1], Infinity, 1.6);
  readonly area = new StrikeChannel([0, 1], 3, 1.6);

  observe(sample: TouchSample): void {
    this.force.observe(sample.force);
    this.area.observe(sample.radius);
  }

  get supported(): boolean {
    return this.force.supported || this.area.supported;
  }

  /** Kurz auf den Anstieg warten? Nur wenn das Gerät etwas Messbares meldet; sonst sofort anschlagen. */
  worthWaiting(sample: TouchSample): boolean {
    return this.force.promising(sample.force) || this.area.promising(sample.radius);
  }

  /** Spitzenwerte eines Anschlags → Stärke 0 … 1; ohne Sensor null. Der Anschlag zählt danach zum gelernten Bereich. */
  strike(peak: TouchSample): number | null {
    const f = this.force.level(peak.force);
    const a = this.area.level(peak.radius);
    this.force.learn(peak.force);
    this.area.learn(peak.radius);
    if (f === null) return a;
    if (a === null) return f;
    return (f + a) / 2;
  }
}

/**
 * So lange (ms) wartet ein Anschlag höchstens auf den Anstieg von Druck bzw. Fläche: Auf einem 120-Hz-Bildschirm kommen
 * darin vier Messpunkte, und der Unterschied zwischen leicht und fest ist schon deutlich; länger fühlte es sich träge an.
 */
export const STRIKE_WAIT = 30;
/** Dynamikumfang in dB zwischen leisestem und festestem Anschlag. */
export const STRIKE_RANGE_DB = 24;
const STRIKE_MAX = 0.9;

/**
 * Anschlagstärke → Lautstärke: ohne Sensor ein gleichmäßiger mittlerer Wert, mit Sensor von −24 dB bis zum Höchstwert.
 * Die Kurve ist oben flach (ein normaler Anschlag klingt etwa so laut wie ohne Sensor) und fällt zum leisen Ende steil ab.
 */
export function strikeGain(strength: number | null): number {
  if (strength === null) return 0.6;
  const v = Math.max(0, Math.min(1, strength));
  return STRIKE_MAX * Math.pow(10, (-STRIKE_RANGE_DB * Math.pow(1 - v, 2.5)) / 20);
}

/**
 * Klangfarbe des Anschlags als Grenzfrequenz eines Tiefpasses: leise gezupft klingen nur die ersten Obertöne (weich),
 * fest gezupft alle (hell). Ohne Sensor 0 = kein Filter.
 */
export function strikeCutoff(strength: number | null, freq: number): number {
  if (strength === null) return 0;
  const v = Math.max(0, Math.min(1, strength));
  const low = Math.min(18000, 2.5 * freq);
  return Math.min(18000, low * Math.pow(18000 / low, v));
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

/** Größtes Ziehen in Halbtönen: knapp über dem nächsten Halbton. */
export const BEND_MAX = 1.2;

/**
 * Ziehen quer zur Saite: Abstand in Saitenabständen → Halbtöne. Nach einem kleinen Spielraum steigt der Ton und läuft
 * bei drei Viertel Saitenabstand flach in den Halbton ein; dort bleibt er ein Stück (gut zu treffen), erst darüber geht
 * es bis höchstens 1,2 Halbtöne.
 */
export function bendSemis(across: number): number {
  const a = Math.abs(across);
  if (a <= 0.15) return 0;
  if (a <= 0.75) {
    const x = (a - 0.15) / 0.6;
    return x * (2 - x);
  }
  if (a <= 0.95) return 1;
  return Math.min(BEND_MAX, 1 + ((a - 0.95) / 0.3) * (BEND_MAX - 1));
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
