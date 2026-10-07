import { tk } from '../../i18n.ts';
import { grip } from '../grip.ts';
import type { Instrument } from '../instrument.ts';

/**
 * 5-saitiges Banjo in Open G (g4 D3 G3 B3 D4). Die kurze 5. Saite (g) beginnt am 5. Bund und klingt immer leer;
 * gehört G nicht zum Akkord, wird sie nicht angeschlagen (x). Alles Übrige findet der Grifffinder.
 */
export const BANJO: Instrument = {
  id: 'banjo',
  name: tk('Banjo'),
  club: tk('Banjo-Club'),
  obj: tk('das Banjo'),
  yours: tk('dein Banjo'),
  of: tk('des Banjos'),
  ownLine: tk('Heute spiel ich Banjo,'),
  strings: [
    { name: 'g', midi: 67, start: 5, hint: tk('kurz') },
    { name: 'D', midi: 50, hint: tk('tief') },
    { name: 'G', midi: 55 },
    { name: 'B', midi: 59 },
    { name: 'D', midi: 62, hint: tk('hoch') },
  ],
  frets: 22,
  diagram: { minRows: 5, inlays: [3, 5, 7, 10, 12] },
  melody: { offset: 0, low: 50, flexible: true },
  tuner: { minHz: 130, maxHz: 450 },
  detect: { minHz: 130, maxHz: 1100, harmonics: 5, presenceCents: 40 },
  chords: [
    grip('G', '00000', '00000', tk('G-Dur'), 1),
    grip('C', '02012', '02013', tk('C-Dur'), 1),
    grip('D', 'x0234', 'x0123', tk('D-Dur'), 1),
    grip('Em', '02002', '01002', tk('e-Moll'), 1),
    grip('G7', '00003', '00003', tk('G-Sieben'), 2),
    grip('Am', 'x2212', 'x2314', tk('a-Moll'), 2),
    grip('D7', 'x0214', 'x0214', tk('D-Sieben'), 2),
    grip('A', 'x2222', 'x1111', tk('A-Dur'), 2, true),
    grip('F', 'x3213', 'x3214', tk('F-Dur'), 3),
    grip('Dm', 'x0233', 'x0123', tk('d-Moll'), 3),
    grip('C7', '02312', '02413', tk('C-Sieben'), 3),
    grip('E', 'x2102', 'x2103', tk('E-Dur'), 3),
    grip('E7', 'x0102', 'x0102', tk('E-Sieben'), 3),
    grip('Gm', '00330', '00120', tk('g-Moll'), 4),
    grip('B7', 'x1201', 'x1302', tk('H-Sieben (international B7)'), 4),
    grip('Bb', 'x3333', 'x1111', tk('B-Dur (international Bb)'), 4, true),
  ],
  shapes: {},
  finder: { maxFret: 12, mutable: 0, minSounding: 4, mutedCost: 0, barreCost: 1, bassRootCost: 0 },
  cost: { barre: 1.5, muted: 0.2 },
  capo: false,
  synth: { brightness: 0.85, sustain: 0.45, seconds: 1.3, position: 0.12 },
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
  roll: {
    fingers: 'TIMTIMTM',
    strings: [2, 3, 4, 0, 3, 4, 2, 4],
    explain: tk('Der Daumen zupft die G-Saite und die kurze g-Saite, der Zeigefinger die B-Saite, der Mittelfinger die hohe D-Saite. Die Buchstaben zeigen, welcher Finger dran ist.'),
  },
  recordChords: ['G', 'C', 'D', 'D7', 'Em', 'Am', 'G7', 'F', 'E7', 'A'],
};
