import { tk } from '../../i18n.ts';
import { grip } from '../grip.ts';
import type { Instrument } from '../instrument.ts';

interface Form {
  /** Abstand je Saite zum tiefsten Bund der Form. */
  offsets: number[];
  /** Saite, auf der die Form den Grundton greift – daraus folgt, in welchem Bund sie für einen Grundton liegt. */
  rootString: number;
  /** Fingersatz weiter oben am Hals (Zeigefinger quer, wo er zwei Saiten im selben Bund hält) … */
  fingers: number[];
  /** … und am Sattel, wo leere Saiten den Zeigefinger ersetzen. */
  open: number[];
}

const OPEN = [55, 62, 69, 76];

/**
 * Die beweglichen Formen der Mandoline sind ihre offenen Griffe, nur ohne leere Saiten: G-Form (Dur 0023, Moll 0013,
 * Sept 0021), C-Form (0230, 0133, 3230), E-Form (1220, 0220, 1020) und für Moll die A-Form (2230) – benannt nach dem
 * Akkord, den sie am Sattel ergeben. Mit allen vier Saiten gegriffen sind es die „Chop Chords“ der Bluegrass-Mandoline.
 * Je Grundton gewinnt die Form im tiefsten Bund.
 */
const FORMS: Record<string, Form[]> = {
  '': [
    { offsets: [0, 0, 2, 3], rootString: 0, fingers: [1, 1, 3, 4], open: [0, 0, 2, 3] },
    { offsets: [0, 2, 3, 0], rootString: 2, fingers: [1, 3, 4, 1], open: [0, 2, 3, 0] },
    { offsets: [1, 2, 2, 0], rootString: 3, fingers: [2, 3, 4, 1], open: [1, 2, 3, 0] },
  ],
  m: [
    { offsets: [0, 0, 1, 3], rootString: 0, fingers: [1, 1, 2, 4], open: [0, 0, 1, 3] },
    { offsets: [0, 1, 3, 3], rootString: 2, fingers: [1, 2, 3, 4], open: [0, 1, 3, 4] },
    { offsets: [0, 2, 2, 0], rootString: 3, fingers: [1, 3, 4, 1], open: [0, 1, 2, 0] },
    { offsets: [2, 2, 3, 0], rootString: 0, fingers: [2, 3, 4, 1], open: [1, 2, 3, 0] },
  ],
  '7': [
    { offsets: [0, 0, 2, 1], rootString: 0, fingers: [1, 1, 3, 2], open: [0, 0, 2, 1] },
    { offsets: [3, 2, 3, 0], rootString: 2, fingers: [3, 2, 4, 1], open: [2, 1, 3, 0] },
    { offsets: [1, 0, 2, 0], rootString: 3, fingers: [2, 1, 3, 1], open: [1, 0, 2, 0] },
  ],
};

function chopTable(q: string): Instrument['shapes'][string] {
  const out: Instrument['shapes'][string] = [];
  for (let root = 0; root < 12; root++) {
    let best: Instrument['shapes'][string][number] | null = null;
    let bestFret = 99;
    for (const form of FORMS[q]) {
      // Bund, in dem die Form liegt: Grundton auf ihrer Grundton-Saite, abzüglich deren Abstand in der Form
      const at = (((root - OPEN[form.rootString] - form.offsets[form.rootString]) % 12) + 12) % 12;
      if (at >= bestFret) continue;
      bestFret = at;
      const frets = form.offsets.map((o) => o + at);
      const fingers = at ? form.fingers : form.open;
      best = { frets, fingers: fingers.map((f, i) => (frets[i] > 0 ? f : 0)), barre: at > 0 && fingers.filter((f) => f === 1).length > 1 };
    }
    out.push(best!);
  }
  return out;
}

/**
 * Mandoline: vier Saitenpaare (Chöre) in Quinten gestimmt wie die Geige, G3 D4 A4 E5. Beide Saiten eines Chors
 * klingen gleich und werden zusammen gegriffen – für Griffe, Erkennung und Stimmgerät zählt je Chor ein Ton.
 * Fingersatz in der ersten Lage: ein Finger je Bund.
 */
export const MANDOLINE: Instrument = {
  id: 'mandoline',
  name: tk('Mandoline'),
  club: tk('Mandolinen-Club'),
  obj: tk('die Mandoline'),
  yours: tk('deine Mandoline'),
  of: tk('der Mandoline'),
  ownLine: tk('Heute spiel ich Mandoline,'),
  strings: [
    { name: 'G', midi: 55 },
    { name: 'D', midi: 62 },
    { name: 'A', midi: 69 },
    { name: 'E', midi: 76 },
  ],
  frets: 17,
  diagram: { minRows: 5, inlays: [5, 7, 10, 12] },
  // Kinderlieder (C4–A5) liegen auf der Mandoline genau in der ersten Lage
  melody: { offset: 0, low: 55 },
  tuner: { minHz: 170, maxHz: 800 },
  detect: { minHz: 180, maxHz: 1400, harmonics: 3, presenceCents: 40 },
  chords: [
    grip('G', '0023', '0023', tk('G-Dur'), 1),
    grip('C', '0230', '0230', tk('C-Dur'), 1),
    grip('D', '2002', '1002', tk('D-Dur'), 1),
    grip('Em', '0220', '0120', tk('e-Moll'), 1),
    grip('Am', '2230', '1230', tk('a-Moll'), 2),
    grip('A', '2240', '1240', tk('A-Dur'), 2),
    grip('E', '1220', '1230', tk('E-Dur'), 2),
    grip('G7', '0021', '0021', tk('G-Sieben'), 2),
    grip('D7', '2032', '1032', tk('D-Sieben'), 2),
    grip('Dm', '2001', '2001', tk('d-Moll'), 3),
    grip('A7', '2243', '1243', tk('A-Sieben'), 3),
    grip('E7', '1020', '1020', tk('E-Sieben'), 3),
    grip('C7', '3230', '2130', tk('C-Sieben'), 3),
    grip('F', '5301', '4301', tk('F-Dur'), 3),
    grip('Gm', '0013', '0013', tk('g-Moll'), 3),
    grip('Bm', '4022', '3012', tk('h-Moll (international Bm)'), 4),
    grip('B7', '2122', '2134', tk('H-Sieben (international B7)'), 4),
    grip('Bb', '3011', '3011', tk('B-Dur (international Bb)'), 4, true),
  ],
  shapes: { '': chopTable(''), m: chopTable('m'), '7': chopTable('7') },
  finder: { maxFret: 12, mutable: 0, minSounding: 4, mutedCost: 0, barreCost: 0, bassRootCost: 0 },
  cost: { barre: 1.5, muted: 0 },
  capo: false,
  // Stahlsaiten mit dem Plektrum nah am Steg: hell, kurz; das zweite Saitenpaar schwebt ein paar Cent daneben
  synth: { brightness: 0.8, sustain: 0.55, seconds: 1.5, position: 0.16, course: 4 },
  blues: {
    low: 62,
    frets: 6,
    easyKey: 2,
    organ: 43,
    pitch: { minHz: 190, maxHz: 1400 },
    hint: tk('★ In D liegen die Grundtöne D und A auf leeren Saiten – am bequemsten. Andere Tonarten passen zu Liedern oder Mitspielern.'),
    boogie: tk('Grundton, Terz, Quinte, Sexte – das klassische Boogie-Riff. In D sind D und A leere Saiten, F# und B liegen gleich daneben!'),
  },
  game: [['G', 'C'], ['G', 'D'], ['D', 'A'], ['G', 'Em'], ['G', 'C', 'D'], ['G', 'Em', 'C', 'D']],
  rhythmChords: ['G', 'C', 'D', 'Em'],
  recordChords: ['G', 'C', 'D', 'D7', 'Em', 'Am', 'G7', 'A', 'E7', 'Dm'],
};
