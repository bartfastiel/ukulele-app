import { tk } from '../../i18n.ts';
import { grip } from '../grip.ts';
import type { Instrument } from '../instrument.ts';
import { UKULELE } from './ukulele.ts';

/**
 * Bariton-Ukulele: dieselben Abstände wie die Ukulele, nur eine Quarte tiefer – also klingt die Ukulele-Form eines
 * Akkords auf der Bariton-Ukulele fünf Halbtöne tiefer (C-Form → G, G-Form → D …).
 */
function fromUkulele(q: string): Instrument['shapes'][string] {
  const uke = UKULELE.shapes[q];
  const out: Instrument['shapes'][string] = [];
  for (let root = 0; root < 12; root++) out.push({ frets: uke[(root + 5) % 12].frets });
  return out;
}

/**
 * Bariton-Ukulele in linearer Stimmung D3 G3 B3 E4 – wie die vier hohen Saiten der Gitarre. Die Griffe sind die
 * Gitarrengriffe auf diesen vier Saiten (G = 0003, C = 2010, D = 0232); alle vier Saiten klingen immer mit.
 */
export const BARITON: Instrument = {
  id: 'bariton',
  name: tk('Bariton-Ukulele'),
  club: tk('Bariton-Ukulele-Club'),
  obj: tk('die Bariton-Ukulele'),
  yours: tk('deine Bariton-Ukulele'),
  of: tk('der Bariton-Ukulele'),
  ownLine: tk('Heute spiel ich Bariton-Ukulele,'),
  strings: [
    { name: 'D', midi: 50 },
    { name: 'G', midi: 55 },
    { name: 'B', midi: 59 },
    { name: 'E', midi: 64 },
  ],
  frets: 19,
  diagram: { minRows: 4, inlays: [5, 7, 10, 12] },
  melody: { offset: 0, low: 50, flexible: true },
  tuner: { minHz: 120, maxHz: 450 },
  detect: { minHz: 130, maxHz: 1100, harmonics: 5, presenceCents: 40 },
  chords: [
    grip('G', '0003', '0003', tk('G-Dur'), 1),
    grip('C', '2010', '2010', tk('C-Dur'), 1),
    grip('Em', '2000', '2000', tk('e-Moll'), 1),
    grip('Am', '2210', '2310', tk('a-Moll'), 1),
    grip('D', '0232', '0132', tk('D-Dur'), 1),
    grip('Em7', '0000', '0000', tk('e-Moll-Sieben (alle Saiten leer)'), 1),
    grip('G7', '0001', '0001', tk('G-Sieben'), 2),
    grip('D7', '0212', '0213', tk('D-Sieben'), 2),
    grip('Dm', '0231', '0231', tk('d-Moll'), 2),
    grip('E7', '0100', '0100', tk('E-Sieben'), 2),
    grip('E', '2100', '2100', tk('E-Dur'), 2),
    grip('A', '2220', '1230', tk('A-Dur'), 2),
    grip('Am7', '2213', '2314', tk('a-Moll-Sieben'), 3),
    grip('A7', '2223', '1112', tk('A-Sieben'), 3, true),
    grip('C7', '2310', '2410', tk('C-Sieben'), 3),
    grip('Fmaj7', '3210', '3210', tk('F-Major-Sieben'), 3),
    grip('B7', '1202', '1203', tk('H-Sieben (international B7)'), 3),
    grip('F', '3211', '3211', tk('F-Dur'), 3, true),
    grip('Bm', '4432', '3421', tk('h-Moll (international Bm)'), 4),
    grip('Bb', '3331', '2341', tk('B-Dur (international Bb)'), 4),
    grip('F#m', '4222', '3111', tk('fis-Moll (international F#m)'), 4, true),
    grip('Gm', '5333', '3111', tk('g-Moll'), 4, true),
  ],
  /** Die üblichen Ukulele-Griffe für Dur, Moll und Sept, eine Quarte tiefer gelesen. */
  shapes: { '': fromUkulele(''), m: fromUkulele('m'), '7': fromUkulele('7') },
  finder: { maxFret: 9, mutable: 0, minSounding: 4, mutedCost: 0, barreCost: 0, bassRootCost: 0 },
  cost: { barre: 1.5, muted: 0 },
  capo: false,
  // Nylon, tiefer gestimmt und mit größerem Korpus: wärmer und länger als die Sopran-Ukulele
  synth: { brightness: 0.42, sustain: 1.3, seconds: 2.2, position: 0.27 },
  blues: {
    low: 50,
    frets: 4,
    easyKey: 7,
    organ: 71,
    pitch: { minHz: 130, maxHz: 450 },
    hint: tk('★ In G liegen die Grundtöne G und D auf leeren Saiten – am bequemsten. Andere Tonarten passen zu Liedern oder Mitspielern.'),
    boogie: tk('Grundton, Terz, Quinte, Sexte – das klassische Boogie-Riff. In G sind G, B und D leere Saiten!'),
  },
  game: [['G', 'C'], ['G', 'D7'], ['G', 'Em'], ['C', 'D'], ['G', 'C', 'D7'], ['G', 'Em', 'C', 'D']],
  rhythmChords: ['G', 'C', 'D7', 'Em'],
  recordChords: ['G', 'C', 'D', 'D7', 'Em', 'Am', 'G7', 'Dm', 'E7', 'A'],
};
