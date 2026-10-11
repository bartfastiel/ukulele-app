import { STRIKE_WAIT, StrikeSense, type TouchSample } from './expression.ts';

/** Was beim Aufsetzen getroffen wurde. */
export interface Press {
  string: number;
  fret: number;
  /** der Ziehpfeil der Blue Note statt des Punkts */
  arrow: boolean;
  /** Anschlagstärke 0 … 1 aus Druck bzw. Kontaktfläche, wenn das Gerät sie wirklich misst; sonst null */
  strength: number | null;
}

/** Ein liegender Finger; Bewegung relativ zum Aufsetzpunkt. */
export interface Held {
  /** `along` in Bundbreiten Richtung Korpus, `across` in Saitenabständen, `px` entlang der Saite für Vibrato, `t` in s. */
  move(along: number, across: number, px: number, t: number): void;
  end(): void;
}

export type Play = (press: Press) => Held | null;

export interface NeckGeometry {
  svg: SVGSVGElement;
  /** Breite der Zeichnung (viewBox), Bundbreite und Saitenabstand in deren Einheiten */
  width: number;
  fret: number;
  gap: number;
  lefty: boolean;
  /** Griffbild: Saiten senkrecht (entlang = nach unten, quer = zur Seite) statt waagrecht wie der Hals */
  vertical?: boolean;
}

/** Ein Anschlag, wie er gemessen wurde (für die Messanzeige). */
export interface StrikeInfo {
  first: TouchSample;
  peak: TouchSample;
  strength: number | null;
  /** Wartezeit bis zum Anschlag in ms und Zahl der Messpunkte darin */
  waited: number;
  samples: number;
}

const sense = new StrikeSense();
let active = 0;
let strikeListener: ((info: StrikeInfo) => void) | null = null;

/** Liegt gerade ein Finger auf dem Hals? Solange zeichnet die Ansicht den Hals nicht neu (sonst verlöre er den Finger). */
export function fingerDown(): boolean {
  return active > 0;
}

/** Messanzeige: gelernter Zustand und jeder Anschlag. */
export function strikeSense(): StrikeSense {
  return sense;
}

export function onStrike(listener: ((info: StrikeInfo) => void) | null): void {
  strikeListener = listener;
}

const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now()) / 1000;

/** Kraft und mittlerer Kontaktradius eines Fingers, soweit der Browser sie meldet. */
export function touchSample(t: Touch): TouchSample {
  const r = t as unknown as { force?: number; radiusX?: number; radiusY?: number };
  const rx = typeof r.radiusX === 'number' ? r.radiusX : 0;
  const ry = typeof r.radiusY === 'number' ? r.radiusY : rx;
  return { force: typeof r.force === 'number' ? r.force : undefined, radius: rx > 0 || ry > 0 ? (rx + ry) / 2 : undefined };
}

function higher(a: number | undefined, b: number | undefined): number | undefined {
  if (typeof a !== 'number') return b;
  if (typeof b !== 'number') return a;
  return Math.max(a, b);
}

/** Bewegt sich der Finger schon in der Wartezeit so weit, schlägt er sofort an (Wischen über die Saiten). */
const MOVE_NOW = 6;

/**
 * Finger (oder Maus) auf einer Stelle des Halses: anschlagen, halten, ziehen, rutschen, wiegen. Mehrere Finger
 * gleichzeitig klingen zusammen. Bewusst mit Touch- statt Pointer-Events: alte iPads (Safari 12) kennen nur diese.
 *
 * Meldet das Gerät Druck oder Kontaktfläche, wartet der Anschlag bis zu STRIKE_WAIT ms und nimmt den höchsten Wert
 * darin: Beim Aufsetzen ist die Fläche noch klein, ein fester Anschlag wird erst in den nächsten Millisekunden breiter.
 */
export function attachPlay(el: Element, geo: NeckGeometry, hit: (clientX: number, clientY: number) => Omit<Press, 'strength'>, play: Play): void {
  const scale = () => {
    const r = geo.svg.getBoundingClientRect();
    return r.width ? r.width / geo.width : 1;
  };
  const begin = (x: number, y: number, first: TouchSample | null) => {
    const base = hit(x, y);
    // vor dem Anschlag zählen: der Ton löst Neuzeichnen aus, das bis zum Loslassen warten muss
    active++;
    if (first) sense.observe(first);
    const startedAt = now();
    let peak: TouchSample = first ? { force: first.force, radius: first.radius } : {};
    let samples = first ? 1 : 0;
    let held: Held | null = null;
    let struck = false;
    let done = false;
    let timer = 0;
    const strike = () => {
      if (struck) return;
      struck = true;
      window.clearTimeout(timer);
      const strength = first ? sense.strike(peak) : null;
      if (first && strikeListener)
        strikeListener({ first, peak, strength, waited: Math.round((now() - startedAt) * 1000), samples });
      held = play({ string: base.string, fret: base.fret, arrow: base.arrow, strength });
      if (!held) {
        done = true;
        active = Math.max(0, active - 1);
        return;
      }
      el.setAttribute('class', el.getAttribute('class') + ' down');
      if (navigator.vibrate) navigator.vibrate(8);
    };
    if (first && sense.worthWaiting(first)) timer = window.setTimeout(strike, STRIKE_WAIT);
    else strike();
    if (done) return null;
    const k = scale();
    const sign = geo.lefty ? -1 : 1;
    return {
      move(mx: number, my: number, sample?: TouchSample) {
        if (done) return;
        if (sample) sense.observe(sample);
        if (!struck && sample) {
          peak = { force: higher(peak.force, sample.force), radius: higher(peak.radius, sample.radius) };
          samples++;
          if (Math.abs(mx - x) + Math.abs(my - y) < MOVE_NOW) return;
        }
        strike();
        if (!held) return;
        if (geo.vertical) {
          const dy = my - y;
          held.move(dy / k / geo.fret, ((mx - x) * sign) / k / geo.gap, dy, now());
          return;
        }
        const dx = (mx - x) * sign;
        held.move(dx / k / geo.fret, (my - y) / k / geo.gap, dx, now());
      },
      end() {
        // kürzer getippt als die Wartezeit: trotzdem anschlagen, mit dem bis dahin höchsten Wert
        strike();
        if (done) return;
        done = true;
        active = Math.max(0, active - 1);
        el.setAttribute('class', (el.getAttribute('class') || '').replace(/ down/g, ''));
        if (held) held.end();
      },
    };
  };

  el.addEventListener('touchstart', (e) => {
    const ev = e as TouchEvent;
    ev.preventDefault();
    for (let i = 0; i < ev.changedTouches.length; i++) {
      const touch = ev.changedTouches[i];
      const g = begin(touch.clientX, touch.clientY, touchSample(touch));
      if (!g) continue;
      const id = touch.identifier;
      const find = (list: TouchList) => {
        for (let j = 0; j < list.length; j++) if (list[j].identifier === id) return list[j];
        return null;
      };
      const onMove = (m: Event) => {
        const tm = find((m as TouchEvent).changedTouches);
        if (!tm) return;
        m.preventDefault();
        g.move(tm.clientX, tm.clientY, touchSample(tm));
      };
      const onEnd = (m: Event) => {
        if (!find((m as TouchEvent).changedTouches)) return;
        g.end();
        el.removeEventListener('touchmove', onMove);
        el.removeEventListener('touchend', onEnd);
        el.removeEventListener('touchcancel', onEnd);
      };
      // Touch-Ereignisse gehen immer an das Element, auf dem der Finger aufgesetzt hat
      el.addEventListener('touchmove', onMove);
      el.addEventListener('touchend', onEnd);
      el.addEventListener('touchcancel', onEnd);
    }
  });

  el.addEventListener('mousedown', (e) => {
    const ev = e as MouseEvent;
    if (ev.button !== 0) return;
    ev.preventDefault();
    const g = begin(ev.clientX, ev.clientY, null);
    if (!g) return;
    const onMove = (m: MouseEvent) => g.move(m.clientX, m.clientY);
    const onUp = () => {
      g.end();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  });
  el.addEventListener('contextmenu', (e) => e.preventDefault());
}
