/**
 * Erkennt zwei typische Stimm-Probleme aus der Folge der Anschläge einer Saite – und meldet sie nur, wenn das
 * Muster eindeutig ist, damit der Tipp nicht in die Irre führt:
 *
 * - „Falscher Wirbel?“: mehrere Anschläge über einige Sekunden, alle deutlich verstimmt und praktisch gleich –
 *   es wird gedreht, aber an dieser Saite ändert sich nichts.
 * - „Saite hakt“: erst ändert sich trotz Drehen nichts (Plateau), dann springt die Tonhöhe über den Zielton auf
 *   die andere Seite. Typisch, wenn die Saite am Sattel oder Steg hängt und die Spannung sich plötzlich ausgleicht.
 */
export type TipKind = 'wrong-peg' | 'slipping';

export interface Tip {
  kind: TipKind;
  string: number;
  /** Richtung des Sprungs bei „slipping“: +1 = sprang nach oben (zu hoch), -1 = nach unten. */
  direction?: number;
}

interface Pluck {
  string: number;
  cents: number;
  time: number;
}

const OUT_OF_TUNE = 10;
const SAME = 3;
const MIN_READINGS = 4;
const ATTACK_MS = 150;
const GAP_MS = 350;

export class TuningCoach {
  private plucks: Pluck[] = [];
  private readings: number[] = [];
  private current = -1;
  private startedAt = 0;
  private lastAt = 0;
  /** Leisester Pegel des laufenden Anschlags (nach dem Einschwingen) – ein neuer Anschlag liegt deutlich darüber. */
  private minRms = Infinity;
  private told = new Set<string>();

  /** Eine Messung mit erkannter Tonhöhe. Gibt einen Tipp zurück, sobald ein Muster sicher ist. */
  reading(string: number, cents: number, rms: number, timeMs: number): Tip | null {
    // Neuer Anschlag: andere Saite, Pause dazwischen oder deutlich lauter als der ausklingende Ton (erneut angeschlagen)
    const settled = timeMs - this.startedAt >= ATTACK_MS;
    const newPluck = string !== this.current || timeMs - this.lastAt > GAP_MS || (settled && rms > this.minRms * 2);
    let tip: Tip | null = null;
    if (newPluck) {
      tip = this.closePluck();
      this.current = string;
      this.startedAt = timeMs;
      this.readings = [];
      this.minRms = Infinity;
    }
    this.lastAt = timeMs;
    if (timeMs - this.startedAt >= ATTACK_MS) {
      this.readings.push(cents);
      this.minRms = Math.min(this.minRms, rms);
    }
    return tip;
  }

  /** Stille oder kein klarer Ton: der laufende Anschlag ist zu Ende. */
  silence(timeMs: number): Tip | null {
    if (this.current < 0 || timeMs - this.lastAt < GAP_MS) return null;
    const tip = this.closePluck();
    this.current = -1;
    return tip;
  }

  private closePluck(): Tip | null {
    if (this.current < 0 || this.readings.length < MIN_READINGS) return null;
    const sorted = this.readings.slice().sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    this.plucks.push({ string: this.current, cents: median, time: this.startedAt });
    if (this.plucks.length > 40) this.plucks.shift();
    return this.analyse(this.current);
  }

  private analyse(string: number): Tip | null {
    const own = this.plucks.filter((p) => p.string === string);
    const last = own[own.length - 1];
    if (Math.abs(last.cents) < OUT_OF_TUNE) {
      // gestimmt: Hinweise dürfen beim nächsten Problem wieder kommen
      this.told.delete(`wrong-peg:${string}`);
      return null;
    }

    // Sprung über den Zielton nach einem Plateau
    if (own.length >= 4) {
      const before = own.slice(-4, -1);
      const plateau = before.every((p) => Math.abs(p.cents - before[0].cents) <= SAME && Math.abs(p.cents) >= OUT_OF_TUNE);
      const crossed = Math.sign(last.cents) !== Math.sign(before[2].cents);
      const jump = Math.abs(last.cents - before[2].cents);
      if (plateau && crossed && jump >= 20 && !this.told.has(`slipping:${string}`)) {
        this.told.add(`slipping:${string}`);
        return { kind: 'slipping', string, direction: Math.sign(last.cents - before[2].cents) };
      }
    }

    // Nichts ändert sich, obwohl schon eine Weile gestimmt wird: die Serie gleicher Anschläge bis jetzt
    let n = 1;
    while (n < own.length && Math.abs(own[own.length - 1 - n].cents - last.cents) <= SAME) n++;
    const span = last.time - own[own.length - n].time;
    if (n >= 4 && span >= 6000 && !this.told.has(`wrong-peg:${string}`)) {
      this.told.add(`wrong-peg:${string}`);
      return { kind: 'wrong-peg', string };
    }
    return null;
  }
}

export function tipText(tip: Tip, stringName: string): string {
  if (tip.kind === 'wrong-peg')
    return (
      `Die ${stringName}-Saite verändert sich gar nicht. Drehst du vielleicht am falschen Wirbel? ` +
      'Fahr mit dem Finger die Saite entlang bis zu ihrem Wirbel und dreh genau an dem.'
    );
  return (
    `Die ${stringName}-Saite springt: Erst passiert nichts, dann ist sie plötzlich ${tip.direction! > 0 ? 'zu hoch' : 'zu tief'}. ` +
    'Sie hakt vermutlich am Sattel oder Steg. Zieh die Saite in der Mitte vorsichtig ein paar Mal vom Griffbrett weg, ' +
    'damit sich die Spannung vor und hinter dem Steg ausgleicht. Dann in kleinen Schritten nachstimmen – am besten von unten an den Ton heran.'
  );
}
