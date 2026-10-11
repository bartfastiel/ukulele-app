import { h, clear } from './dom.ts';
import { onStrike, strikeSense, touchSample, type StrikeInfo } from './fret-gesture.ts';
import { STRIKE_TUNING, strikeCutoff, strikeGain, type StrikeChannel } from './expression.ts';
import { t } from '../i18n.ts';

/** Mit `?druck=1` in der Adresse: Messanzeige für Druck und Kontaktfläche zum Prüfen auf dem eigenen Gerät. */
export function strikeMeterWanted(search: string): boolean {
  return /[?&]druck=1(&|$)/.test(search);
}

const num = (v: number | undefined, digits: number) => (typeof v === 'number' ? v.toFixed(digits) : '–');
const db = (gain: number) => 20 * Math.log10(gain / strikeGain(1));

function status(c: StrikeChannel): string {
  if (c.supported) return t('erkannt');
  return c.undecided ? t('noch offen') : t('keiner');
}

/**
 * Zeigt live, was der Browser meldet (Touch.force, radiusX/Y; PointerEvent.pressure, width/height), ob die App daraus
 * einen Sensor erkennt und was jeder Anschlag ergibt. Nur Anzeige – nichts wird gespeichert oder gesendet; sie liegt
 * oben über der Seite und lässt Berührungen durch.
 */
export function strikeMeter(): void {
  const box = 'position:fixed;top:8px;right:8px;z-index:50;max-width:340px;pointer-events:none;';
  const look = 'background:var(--cream);color:var(--ink);border:2px solid var(--brass-dark);border-radius:12px;';
  const text = 'padding:8px 10px;font:13px/1.35 ui-monospace,Menlo,Consolas,monospace;box-shadow:0 4px 14px rgba(0,0,0,.35);';
  const touchLine = h('div', null, 'Touch: –');
  const pointerLine = h('div', null, 'Pointer: –');
  const sensorLine = h('div');
  const strikeLine = h('div', { style: 'margin-top:6px;font-weight:bold' }, t('Tipp auf eine Saite – leicht und fest.'));
  const detailLine = h('div');
  const bars = h('div', { style: 'margin-top:6px' });
  const panel = h(
    'div',
    { class: 'strike-meter', role: 'status', style: box + look + text },
    h('div', { style: 'font-weight:bold;margin-bottom:4px' }, t('Druck-Messung')),
    touchLine,
    pointerLine,
    sensorLine,
    strikeLine,
    detailLine,
    bars,
  );
  document.body.appendChild(panel);

  const showSensor = () => {
    const s = strikeSense();
    sensorLine.textContent = `${t('Kraft')}: ${status(s.force)} · ${t('Fläche')}: ${status(s.area)}`;
  };
  showSensor();

  const onTouch = (e: Event) => {
    const list = (e as TouchEvent).changedTouches;
    if (!list || !list.length) return;
    const tt = list[0] as unknown as { radiusX?: number; radiusY?: number };
    const sample = touchSample(list[0]);
    touchLine.textContent = `Touch: force ${num(sample.force, 3)} · radius ${num(tt.radiusX, 1)}×${num(tt.radiusY, 1)} px`;
    showSensor();
  };
  const onPointer = (e: Event) => {
    const p = e as PointerEvent;
    pointerLine.textContent = `Pointer (${p.pointerType}): pressure ${num(p.pressure, 3)} · ${num(p.width, 1)}×${num(p.height, 1)} px`;
  };
  const opts = { capture: true, passive: true } as AddEventListenerOptions;
  document.addEventListener('touchstart', onTouch, opts);
  document.addEventListener('touchmove', onTouch, opts);
  if (typeof window.PointerEvent === 'function') {
    document.addEventListener('pointerdown', onPointer, opts);
    document.addEventListener('pointermove', onPointer, opts);
  }

  const history: number[] = [];
  onStrike((info: StrikeInfo) => {
    showSensor();
    const gain = strikeGain(info.strength);
    if (info.strength === null) {
      strikeLine.textContent = `${t('Anschlag')}: ${t('ohne Sensor gleich laut')} (${db(gain).toFixed(1)} dB)`;
    } else {
      const hz = Math.round(strikeCutoff(info.strength, 440));
      strikeLine.textContent = `${t('Anschlag')}: ${Math.round(info.strength * 100)} % → ${db(gain).toFixed(1)} dB · ${t('Klang')} ${hz} Hz`;
    }
    detailLine.textContent =
      `force ${num(info.first.force, 3)}→${num(info.peak.force, 3)} · radius ${num(info.first.radius, 1)}→${num(info.peak.radius, 1)} · ` +
      `${info.waited} ms, ${info.samples}×`;
    history.push(gain);
    if (history.length > 8) history.shift();
    clear(bars);
    for (const g of history) {
      const w = Math.max(2, Math.round(100 * (1 + db(g) / STRIKE_TUNING.rangeDb)));
      bars.appendChild(h('div', { style: `height:6px;margin:2px 0;border-radius:3px;background:var(--teal);width:${w}%` }));
    }
  });
}
