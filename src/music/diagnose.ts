import type { Chord } from './chords.ts';

const STRING_NAME = ['G-Saite (ganz oben)', 'C-Saite', 'E-Saite', 'A-Saite (ganz unten)'];
const FINGER = ['', 'Zeigefinger', 'Mittelfinger', 'Ringfinger', 'kleiner Finger'];
const FINGER_ACC = ['', 'deinen Zeigefinger', 'deinen Mittelfinger', 'deinen Ringfinger', 'deinen kleinen Finger'];

/**
 * Kindgerechter Tipp, was am Griff vermutlich nicht stimmt – statt nur „noch nicht richtig“.
 * kind 'open': gegriffene Saite klingt leer; 'muted': Saite klingt kaum (meist von einem Finger berührt).
 */
export function diagnose(ch: Chord, string: number, kind: 'open' | 'muted' | ''): string {
  const s = STRING_NAME[string];
  const fret = ch.frets[string];
  const finger = ch.fingers[string];
  if (fret === 0) {
    return `Die leere ${s} klingt nicht. Wahrscheinlich liegt ein Finger ein bisschen darauf. Stell deine Finger steil auf wie eine Brücke – nur die Fingerkuppen berühren die Saiten.`;
  }
  const who = finger ? FINGER[finger] : 'Finger';
  if (kind === 'open') {
    return `Die ${s} klingt so, als wäre sie leer: Dein ${who} drückt im ${fret}. Bund noch nicht ganz herunter. Drück fester – und setz ihn direkt hinter das Bundstäbchen, dann geht es ganz leicht.`;
  }
  return `Die ${s} klingt gedämpft. Vielleicht berührt sie ein Nachbarfinger, oder ${finger ? FINGER_ACC[finger] : 'der Finger'} liegt flach. Mach ihn rund wie eine Brücke und drück mit der Fingerkuppe im ${fret}. Bund.`;
}
