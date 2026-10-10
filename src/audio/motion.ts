/**
 * Das Handy kippen steuert ein Wah (wie ein Pedal): nach hinten dunkel, nach vorn hell. Nullpunkt ist die Haltung beim
 * ersten Finger auf dem Hals; ein kleiner Bereich um die Mitte bewirkt nichts, damit ruhiges Halten ruhig klingt.
 * Die Rechnung ist reine Logik (tilt), der Anschluss an den Sensor steht in watchTilt.
 */

const DEAD = 4;
const FULL = 30;
const SMOOTH = 0.06;

/** Vor-/Zurückkippen in Grad aus dem Schwerkraftvektor. */
export function pitchOf(x: number, y: number, z: number): number {
  return (Math.atan2(z, Math.sqrt(x * x + y * y)) * 180) / Math.PI;
}

/** Abweichung vom Nullpunkt in Grad → Wah 0 … 1 (0,5 = Mitte). */
export function wahOf(delta: number): number {
  const a = Math.abs(delta);
  if (a <= DEAD) return 0.5;
  const amount = Math.min(1, (a - DEAD) / (FULL - DEAD));
  return 0.5 + (delta > 0 ? 0.5 : -0.5) * amount;
}

export class TiltTracker {
  private g: number[] | null = null;
  private zero: number | null = null;
  private lastT = -1;

  /** Schwerkraft (m/s²) zur Zeit t (s); liefert Wah 0 … 1 oder null, solange kein Nullpunkt gesetzt ist. */
  update(x: number, y: number, z: number, t: number): number | null {
    const dt = this.lastT < 0 ? 0 : Math.min(0.1, Math.max(0, t - this.lastT));
    this.lastT = t;
    if (!this.g) this.g = [x, y, z];
    else {
      const k = 1 - Math.exp(-dt / SMOOTH);
      this.g = [this.g[0] + (x - this.g[0]) * k, this.g[1] + (y - this.g[1]) * k, this.g[2] + (z - this.g[2]) * k];
    }
    if (this.zero === null) return null;
    return wahOf(pitchOf(this.g[0], this.g[1], this.g[2]) - this.zero);
  }

  /** Jetzige Haltung gilt als Mitte. */
  rezero(): void {
    if (this.g) this.zero = pitchOf(this.g[0], this.g[1], this.g[2]);
  }
}

interface MotionPermission {
  requestPermission?: () => Promise<string>;
}

/** Gibt es einen Bewegungssensor (nur auf Geräten mit Touch sinnvoll)? */
export function hasMotion(): boolean {
  return typeof window !== 'undefined' && 'DeviceMotionEvent' in window && 'ontouchstart' in window;
}

/**
 * Sensor anschließen (muss aus einem Tippen heraus aufgerufen werden: iOS fragt dann um Erlaubnis). `onWah` bekommt
 * 0 … 1; die Rückgabe trennt den Sensor wieder und setzt den Nullpunkt mit `rezero`.
 */
export function watchTilt(onWah: (wah: number) => void): { stop: () => void; rezero: () => void } {
  const tracker = new TiltTracker();
  const listener = (e: Event) => {
    const g = (e as DeviceMotionEvent).accelerationIncludingGravity;
    if (!g || g.x === null || g.y === null || g.z === null) return;
    const wah = tracker.update(g.x, g.y, g.z, e.timeStamp / 1000);
    if (wah !== null) onWah(wah);
  };
  const ask = (window as unknown as { DeviceMotionEvent?: MotionPermission }).DeviceMotionEvent;
  if (ask && typeof ask.requestPermission === 'function') ask.requestPermission().catch(() => undefined);
  window.addEventListener('devicemotion', listener);
  return {
    stop: () => window.removeEventListener('devicemotion', listener),
    rezero: () => tracker.rezero(),
  };
}
