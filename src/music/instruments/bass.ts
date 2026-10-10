import { tk } from '../../i18n.ts';
import type { Instrument } from '../instrument.ts';

/**
 * E-Bass mit vier Saiten, E1 A1 D2 G2 – eine Oktave unter den vier tiefen Gitarrensaiten. Er spielt keine Akkorde:
 * Zu jedem Akkord eines Liedes greift man seinen Grundton (siehe `notesOnly` und chords.ts). In der ersten Lage
 * (Bund 0–4, ein Finger je Bund) liegt jeder der zwölf Töne – deshalb gibt es keine Griff-Bibliothek, nur Töne.
 */
export const BASS: Instrument = {
  id: 'bass',
  name: tk('E-Bass'),
  club: tk('Bass-Club'),
  obj: tk('den E-Bass'),
  yours: tk('deinen E-Bass'),
  of: tk('des E-Basses'),
  ownLine: tk('Heute spiel ich E-Bass,'),
  strings: [
    { name: 'E', midi: 28 },
    { name: 'A', midi: 33 },
    { name: 'D', midi: 38 },
    { name: 'G', midi: 43 },
  ],
  frets: 20,
  diagram: { minRows: 5, inlays: [3, 5, 7, 9, 12] },
  // die Melodie singt man; gespielt wird sie von der Begleitung in der gesungenen Lage
  melody: { offset: 0, low: 28 },
  // E1 ≈ 41 Hz; bis 250 Hz, damit auch die Oktave darüber (das Handy-Mikrofon hört den Grundton kaum) noch zählt
  tuner: { minHz: 35, maxHz: 250 },
  detect: { minHz: 35, maxHz: 600, harmonics: 8, presenceCents: 40 },
  chords: [],
  shapes: {},
  finder: { maxFret: 4, mutable: 0, minSounding: 1, mutedCost: 0, barreCost: 0, bassRootCost: 0 },
  cost: { barre: 0, muted: 0 },
  capo: false,
  notesOnly: true,
  // Rundwickelsaiten mit den Fingern über dem Tonabnehmer gezupft: dunkel, rund, langes Ausklingen
  synth: { brightness: 0.22, sustain: 2.2, seconds: 3, position: 0.22, lowpass: 1400 },
  blues: {
    low: 28,
    frets: 4,
    easyKey: 4,
    // die Orgel spielt hoch über allem, was der Bass am Hals erreicht – das Mikrofon hört nur ihn
    organ: 69,
    pitch: { minHz: 36, maxHz: 420 },
    hint: tk('★ In E liegen die Grundtöne E und A auf leeren Saiten – am bequemsten. Andere Tonarten passen zu Liedern oder Mitspielern.'),
    boogie: tk('Walking Bass: im einen Takt Grundton, Terz, Quinte, Sexte hinauf, im nächsten Septime, Sexte, Quinte, Terz wieder hinunter. In E ist sogar die Septime D eine leere Saite!'),
  },
  game: [['E', 'A'], ['A', 'D'], ['E', 'G'], ['C', 'G'], ['E', 'A', 'D'], ['C', 'F', 'G'], ['E', 'A', 'D', 'G']],
  rhythmChords: ['E', 'A', 'D', 'G'],
  recordChords: [],
};
