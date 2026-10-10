import { chordDiagram, diagramLayout, type DiagramOptions } from './chord-diagram.ts';
import { attachPlay, type Play } from './fret-gesture.ts';
import { VIBRATO_CENTS, VibratoDetector, slideFret, strikeGain } from './expression.ts';
import { hold, pluckCourse } from '../audio/engine.ts';
import { STRINGS } from '../music/notes.ts';
import type { Chord } from '../music/chords.ts';

const glowing = new WeakMap<Element, number>();
const clock = () => (typeof performance !== 'undefined' ? performance.now() : Date.now()) / 1000;

/** Die klingende Saite leuchtet kurz auf; `data-played`/`data-plays` am Bild zeigen, was zuletzt klang. */
function glow(svg: Element, string: number, fret: number): void {
  svg.setAttribute('data-played', `${string}:${fret}`);
  svg.setAttribute('data-plays', String(Number(svg.getAttribute('data-plays') || 0) + 1));
  const line = svg.querySelector(`.string[data-string="${string}"]`);
  if (!line) return;
  window.clearTimeout(glowing.get(line) || 0);
  line.setAttribute('class', 'string ringing');
  glowing.set(
    line,
    window.setTimeout(() => line.setAttribute('class', 'string'), 380),
  );
}

/**
 * Griffbild, das klingt wie das Instrument: Antippen einer Saite (irgendwo in ihrer Spalte) spielt sie mit dem Bund des
 * Griffs, gedämpfte Saiten bleiben still. Halten lässt klingen; entlang der Saite rutscht ein gegriffener Ton in den
 * Nachbarbund, Hin-und-her-Wiegen gibt Vibrato. Wischen quer über die Saiten schlägt den Akkord an – in Wischrichtung,
 * schnell gewischt lauter. Nur für Bilder, die nicht selbst ein Link oder Knopf sind.
 */
export function playableChord(ch: Chord, opts: DiagramOptions = {}, strings: Tuning = tuningNow()): SVGElement {
  const svg = chordDiagram(ch, opts);
  makePlayable(svg, ch, opts, strings);
  return svg;
}

/** Stimmung, in der ein Griffbild klingt: Wissensartikel zeigen die Normalstimmung, auch wenn umgestimmt ist. */
export type Tuning = { midi: number; start: number }[];

export function tuningNow(): Tuning {
  return STRINGS.map((st) => ({ midi: st.midi, start: st.start || 0 }));
}

function makePlayable(svg: SVGElement, ch: Chord, opts: DiagramOptions, strings: Tuning): void {
  const L = diagramLayout(ch, opts);
  const midiOf = (string: number, fret: number) => (fret <= 0 ? strings[string].midi : strings[string].midi + fret - strings[string].start);
  // die kurze Banjo-Saite lässt sich nur leer spielen
  const playableFret = (string: number, fret: number) => fret === 0 || (fret > 0 && !strings[string].start);
  svg.setAttribute('class', (svg.getAttribute('class') || '') + ' playable');
  const sounding = (i: number) => (ch.frets[i] >= 0 ? ch.frets[i] : -1);
  // genaue Lage des Fingers beim Aufsetzen in Saiten (Spielreihenfolge), damit Wischen beim Überqueren einer Saite zupft
  let startPos = 0;
  const hit = (x: number) => {
    const r = svg.getBoundingClientRect();
    const ux = r.width ? ((x - r.left) * L.width) / r.width : 0;
    const col = Math.max(0, Math.min(L.n - 1, (ux - L.x0) / L.gap));
    startPos = opts.lefty ? L.n - 1 - col : col;
    const string = L.order[Math.round(col)];
    return { string, fret: sounding(string), arrow: false };
  };

  const play: Play = (p) => {
    const voice = p.fret >= 0 ? hold(midiOf(p.string, p.fret), strikeGain(p.pressure)) : null;
    if (p.fret >= 0) glow(svg, p.string, p.fret);
    const vib = new VibratoDetector();
    let fret = p.fret;
    let pos = startPos;
    let lastT = clock();
    let lastPlucked = p.string;
    let strummed = false;
    return {
      move(along, across, px, t) {
        const next = Math.max(0, Math.min(L.n - 1, startPos + across));
        if (next !== pos) {
          const crossed: number[] = [];
          if (next > pos) for (let s = Math.floor(pos) + 1; s <= next; s++) crossed.push(s);
          else for (let s = Math.ceil(pos) - 1; s >= next; s--) crossed.push(s);
          const at = clock();
          const speed = Math.abs(next - pos) / Math.max(0.008, at - lastT);
          lastT = at;
          pos = next;
          // schnell gewischt klingt kräftiger, langsam über die Saiten gestrichen leise
          const gain = 0.2 + 0.32 * Math.min(1, speed / 25);
          for (const s of crossed) {
            if (s === lastPlucked) continue;
            lastPlucked = s;
            strummed = true;
            const f = sounding(s);
            if (f < 0) continue;
            pluckCourse(midiOf(s, f), s, 0, gain);
            glow(svg, s, f);
          }
        }
        if (strummed || !voice) return;
        if (p.fret > 0) {
          const moved = slideFret(p.fret, along, fret, Math.max(1, L.first), L.first + L.rows - 1);
          if (moved !== fret && playableFret(p.string, moved)) {
            fret = moved;
            voice.pitch(fret - p.fret, 0.03);
            glow(svg, p.string, fret);
          }
        }
        voice.vibrato(vib.rate, vib.update(px, t) * VIBRATO_CENTS);
      },
      end() {
        if (voice) voice.release(strummed);
      },
    };
  };

  attachPlay(svg, { svg: svg as SVGSVGElement, width: L.width, fret: L.fh, gap: L.gap, lefty: !!opts.lefty, vertical: true }, hit, play);
}
