import { tk } from '../../i18n.ts';
import { grip, parseGrip } from '../grip.ts';
import type { Instrument } from '../instrument.ts';

const shapes = (list: string[]) => list.map((s) => ({ frets: parseGrip(s) }));

/** Sopran-/Konzert-Ukulele in Standardstimmung mit hohem G (G4 C4 E4 A4). */
export const UKULELE: Instrument = {
  id: 'ukulele',
  name: tk('Ukulele'),
  club: tk('Ukulele-Club'),
  obj: tk('die Ukulele'),
  yours: tk('deine Ukulele'),
  of: tk('der Ukulele'),
  ownLine: tk('Heute spiel ich Ukulele,'),
  strings: [
    { name: 'G', midi: 67 },
    { name: 'C', midi: 60 },
    { name: 'E', midi: 64 },
    { name: 'A', midi: 69 },
  ],
  frets: 15,
  diagram: { minRows: 4, inlays: [5] },
  melody: { offset: 0, low: 60 },
  tuner: { minHz: 200, maxHz: 900 },
  detect: { minHz: 240, maxHz: 1100, harmonics: 3, presenceCents: 40 },
  chords: [
    grip('C', '0003', '0003', tk('C-Dur'), 1),
    grip('Am', '2000', '2000', tk('a-Moll'), 1),
    grip('C7', '0001', '0001', tk('C-Sieben'), 1),
    grip('A7', '0100', '0100', tk('A-Sieben'), 1),
    grip('Am7', '0000', '0000', tk('a-Moll-Sieben (alle Saiten leer)'), 1),
    grip('F', '2010', '2010', tk('F-Dur'), 2),
    grip('G7', '0212', '0213', tk('G-Sieben'), 2),
    grip('Cmaj7', '0002', '0002', tk('C-Major-Sieben'), 2),
    grip('G', '0232', '0132', tk('G-Dur'), 3),
    grip('Dm', '2210', '2310', tk('d-Moll'), 3),
    grip('A', '2100', '2100', tk('A-Dur'), 3),
    grip('Em', '0432', '0321', tk('e-Moll'), 3),
    grip('D7', '2223', '1112', tk('D-Sieben'), 3),
    grip('Gm', '0231', '0231', tk('g-Moll'), 3),
    grip('D', '2220', '1230', tk('D-Dur'), 4),
    grip('E7', '1202', '1203', tk('E-Sieben'), 4),
    grip('B7', '2322', '1211', tk('H-Sieben (international B7)'), 4),
    grip('Bb', '3211', '3211', tk('B-Dur (international Bb)'), 4),
  ],
  /** Übliche Ukulele-Griffe (G C E A) für Dur, Moll und Sept in allen zwölf Tonarten. */
  shapes: {
    '': shapes(['0003', '1114', '2220', '0331', '4442', '2010', '3121', '0232', '5343', '2100', '3211', '4322']),
    m: shapes(['0333', '1104', '2210', '3321', '0432', '1013', '2120', '0231', '4342', '2000', '3111', '4222']),
    '7': shapes(['0001', '1112', '2223', '3334', '1202', '2310', '3424', '0212', '1323', '0100', '1211', '2322']),
  },
  finder: { maxFret: 7, mutable: 0, minSounding: 4, mutedCost: 0, barreCost: 0, bassRootCost: 0 },
  cost: { barre: 1.5, muted: 0 },
  capo: false,
  synth: { brightness: 0.5, sustain: 1, seconds: 1.8, position: 0.3 },
  blues: {
    low: 60,
    frets: 3,
    easyKey: 0,
    organ: 47,
    pitch: { minHz: 240, maxHz: 1100 },
    hint: tk('★ In C liegen die Grundtöne auf leeren Saiten – am bequemsten. Andere Tonarten passen zu Liedern oder Mitspielern.'),
    boogie: tk('Grundton, Terz, Quinte, Sexte – das klassische Boogie-Riff. In C sind das alles leere Saiten: C, E, G, A!'),
  },
  game: [['C', 'Am'], ['C', 'F'], ['C', 'G7'], ['F', 'C7'], ['C', 'Am', 'F', 'G7'], ['C', 'F', 'G7']],
  rhythmChords: ['C', 'Am', 'F', 'G7'],
  recordChords: ['C', 'Am', 'F', 'G7', 'C7', 'A7', 'G', 'Dm', 'Em', 'D7'],
  tunings: [
    {
      id: 'tiefes-g',
      article: 'ukulele-d-stimmung-tiefes-g',
      name: tk('Tiefes G'),
      why: tk('Eine eigene, dickere G-Saite eine Oktave tiefer: voller, tieferer Klang. Die Griffe bleiben genau gleich.'),
      names: ['G', 'C', 'E', 'A'],
      midi: [55, 60, 64, 69],
      banner: false,
    },
    {
      id: 'd',
      article: 'ukulele-d-stimmung-tiefes-g',
      name: tk('D-Stimmung'),
      why: tk('Alle Saiten einen Ganzton höher gespannt (A D F# B): heller Klang wie bei alten Ukulelen – lieber mit einem Erwachsenen umstimmen. Gleiche Fingerform, anderer Akkordname.'),
      names: ['A', 'D', 'F#', 'B'],
      midi: [69, 62, 66, 71],
      bluesKey: 2,
    },
  ],
};
