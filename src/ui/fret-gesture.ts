import { PressureSense } from './expression.ts';

/** Was beim Aufsetzen getroffen wurde. */
export interface Press {
  string: number;
  fret: number;
  /** der Ziehpfeil der Blue Note statt des Punkts */
  arrow: boolean;
  /** Druck 0 … 1, wenn das Gerät ihn wirklich misst */
  pressure: number | null;
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

const pressure = new PressureSense();
let active = 0;

/** Liegt gerade ein Finger auf dem Hals? Solange zeichnet die Ansicht den Hals nicht neu (sonst verlöre er den Finger). */
export function fingerDown(): boolean {
  return active > 0;
}

const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now()) / 1000;

function force(t: Touch): number | undefined {
  const f = (t as unknown as { force?: number }).force;
  return typeof f === 'number' ? f : undefined;
}

/**
 * Finger (oder Maus) auf einer Stelle des Halses: anschlagen, halten, ziehen, rutschen, wiegen. Mehrere Finger
 * gleichzeitig klingen zusammen. Bewusst mit Touch- statt Pointer-Events: alte iPads (Safari 12) kennen nur diese.
 */
export function attachPlay(el: Element, geo: NeckGeometry, hit: (clientX: number, clientY: number) => Omit<Press, 'pressure'>, play: Play): void {
  const scale = () => {
    const r = geo.svg.getBoundingClientRect();
    return r.width ? r.width / geo.width : 1;
  };
  const begin = (x: number, y: number, p: number | undefined) => {
    pressure.observe(p);
    const base = hit(x, y);
    // vor dem Anschlag zählen: der Ton löst Neuzeichnen aus, das bis zum Loslassen warten muss
    active++;
    const held = play({ string: base.string, fret: base.fret, arrow: base.arrow, pressure: pressure.normalised(p) });
    if (!held) {
      active--;
      return null;
    }
    el.setAttribute('class', el.getAttribute('class') + ' down');
    if (navigator.vibrate) navigator.vibrate(8);
    const k = scale();
    const sign = geo.lefty ? -1 : 1;
    let done = false;
    return {
      move(mx: number, my: number, mp?: number) {
        pressure.observe(mp);
        if (geo.vertical) {
          const dy = my - y;
          held.move(dy / k / geo.fret, ((mx - x) * sign) / k / geo.gap, dy, now());
          return;
        }
        const dx = (mx - x) * sign;
        held.move(dx / k / geo.fret, (my - y) / k / geo.gap, dx, now());
      },
      end() {
        if (done) return;
        done = true;
        active = Math.max(0, active - 1);
        el.setAttribute('class', (el.getAttribute('class') || '').replace(/ down/g, ''));
        held.end();
      },
    };
  };

  el.addEventListener('touchstart', (e) => {
    const ev = e as TouchEvent;
    ev.preventDefault();
    for (let i = 0; i < ev.changedTouches.length; i++) {
      const touch = ev.changedTouches[i];
      const g = begin(touch.clientX, touch.clientY, force(touch));
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
        g.move(tm.clientX, tm.clientY, force(tm));
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
    const g = begin(ev.clientX, ev.clientY, undefined);
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
