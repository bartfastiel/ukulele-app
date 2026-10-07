import { tk } from '../../i18n.ts';
import { grip } from '../grip.ts';
import type { Instrument } from '../instrument.ts';

const X = -1;

/**
 * Barré-Formen (Abstand zum Barré-Bund, X = nicht anschlagen) mit Fingersatz: E-Form mit dem Grundton auf der tiefen
 * E-Saite, A-Form mit dem Grundton auf der A-Saite. Im Bund 0 sind es die offenen Griffe E, Em, E7 … bzw. A, Am, A7 …
 */
const FORMS: Record<string, { e: number[][]; a: number[][] }> = {
  '': { e: [[0, 2, 2, 1, 0, 0], [1, 3, 4, 2, 1, 1]], a: [[X, 0, 2, 2, 2, 0], [0, 1, 2, 3, 4, 1]] },
  m: { e: [[0, 2, 2, 0, 0, 0], [1, 3, 4, 1, 1, 1]], a: [[X, 0, 2, 2, 1, 0], [0, 1, 3, 4, 2, 1]] },
  '7': { e: [[0, 2, 0, 1, 0, 0], [1, 3, 1, 2, 1, 1]], a: [[X, 0, 2, 0, 2, 0], [0, 1, 3, 1, 4, 1]] },
  m7: { e: [[0, 2, 0, 0, 0, 0], [1, 3, 1, 1, 1, 1]], a: [[X, 0, 2, 0, 1, 0], [0, 1, 3, 1, 2, 1]] },
  maj7: { e: [[0, 2, 1, 1, 0, 0], [1, 4, 2, 3, 1, 1]], a: [[X, 0, 2, 1, 2, 0], [0, 1, 3, 2, 4, 1]] },
};

/** Für jeden Grundton (ab C) die Form im tieferen Bund; im Bund 0 ohne Barré (Finger rücken eins auf). */
function barreTable(q: string): Instrument['shapes'][string] {
  const out: Instrument['shapes'][string] = [];
  for (let root = 0; root < 12; root++) {
    const re = (root - 4 + 12) % 12;
    const ra = (root - 9 + 12) % 12;
    const form = re <= ra ? FORMS[q].e : FORMS[q].a;
    const r = Math.min(re, ra);
    const frets = form[0].map((o) => (o === X ? X : o + r));
    const fingers = form[1].map((f, i) => (r > 0 ? f : form[0][i] === 0 || form[0][i] === X ? 0 : f - 1));
    out.push({ frets, fingers, barre: r > 0 });
  }
  return out;
}

const shapes: Instrument['shapes'] = {};
for (const q of Object.keys(FORMS)) shapes[q] = barreTable(q);

/** Konzert- oder Westerngitarre in Standardstimmung (E2 A2 D3 G3 B3 E4). */
export const GITARRE: Instrument = {
  id: 'gitarre',
  name: tk('Gitarre'),
  club: tk('Gitarren-Club'),
  obj: tk('die Gitarre'),
  yours: tk('deine Gitarre'),
  of: tk('der Gitarre'),
  ownLine: tk('Heute spiel ich Gitarre,'),
  strings: [
    { name: 'E', midi: 40, hint: tk('tief') },
    { name: 'A', midi: 45 },
    { name: 'D', midi: 50 },
    { name: 'G', midi: 55 },
    { name: 'B', midi: 59 },
    { name: 'e', midi: 64, hint: tk('hoch') },
  ],
  frets: 19,
  diagram: { minRows: 4, inlays: [3, 5, 7, 9, 12] },
  melody: { offset: -12, low: 40 },
  tuner: { minHz: 70, maxHz: 400 },
  detect: { minHz: 75, maxHz: 1000, harmonics: 8, presenceCents: 45 },
  chords: [
    grip('Em', '022000', '023000', tk('e-Moll'), 1),
    grip('Am', 'x02210', 'x02310', tk('a-Moll'), 1),
    grip('E', '022100', '023100', tk('E-Dur'), 1),
    grip('A', 'x02220', 'x01230', tk('A-Dur'), 1),
    grip('D', 'xx0232', 'xx0132', tk('D-Dur'), 1),
    grip('Em7', '020000', '020000', tk('e-Moll-Sieben'), 1),
    grip('C', 'x32010', 'x32010', tk('C-Dur'), 2),
    grip('G', '320003', '210003', tk('G-Dur'), 2),
    grip('Dm', 'xx0231', 'xx0231', tk('d-Moll'), 2),
    grip('E7', '020100', '020100', tk('E-Sieben'), 2),
    grip('A7', 'x02020', 'x02030', tk('A-Sieben'), 2),
    grip('D7', 'xx0212', 'xx0213', tk('D-Sieben'), 2),
    grip('Am7', 'x02010', 'x02010', tk('a-Moll-Sieben'), 2),
    grip('G7', '320001', '320001', tk('G-Sieben'), 3),
    grip('C7', 'x32310', 'x32410', tk('C-Sieben'), 3),
    grip('Cmaj7', 'x32000', 'x32000', tk('C-Major-Sieben'), 3),
    grip('Fmaj7', 'xx3210', 'xx3210', tk('F-Major-Sieben'), 3),
    grip('B7', 'x21202', 'x21304', tk('H-Sieben (international B7)'), 3),
    grip('F', 'xx3211', 'xx3211', tk('F-Dur'), 3, true),
    grip('Bm', 'x24432', 'x13421', tk('h-Moll (international Bm)'), 4, true),
    grip('Bb', 'x13331', 'x12341', tk('B-Dur (international Bb)'), 4, true),
    grip('F#m', '244222', '134111', tk('fis-Moll (international F#m)'), 4, true),
    grip('Gm', '355333', '134111', tk('g-Moll'), 4, true),
  ],
  shapes,
  finder: { maxFret: 10, mutable: 2, minSounding: 4, mutedCost: 0.7, barreCost: 1.5, bassRootCost: 4.5 },
  cost: { barre: 2.5, muted: 0.4 },
  capo: true,
  synth: { brightness: 0.6, sustain: 1.6, seconds: 2.6, position: 0.22 },
  blues: {
    low: 40,
    frets: 4,
    easyKey: 4,
    organ: 71,
    pitch: { minHz: 75, maxHz: 420 },
    hint: tk('★ In E liegen die Grundtöne E und A auf leeren Saiten – am bequemsten. Andere Tonarten passen zu Liedern oder Mitspielern.'),
    boogie: tk('Grundton, Terz, Quinte, Sexte – das klassische Boogie-Riff. In E liegt es ganz bequem auf den beiden tiefsten Saiten.'),
  },
  game: [['Em', 'Am'], ['E', 'A'], ['D', 'A'], ['G', 'C'], ['G', 'Em', 'C', 'D'], ['A', 'D', 'E']],
  rhythmChords: ['Em', 'G', 'C', 'D'],
  recordChords: ['Em', 'Am', 'C', 'G', 'D', 'E', 'A', 'D7', 'G7', 'Dm'],
};
