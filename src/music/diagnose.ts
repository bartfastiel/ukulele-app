import type { Chord } from './chords.ts';
import { STRINGS } from './notes.ts';
import { ordinal, t, tk } from '../i18n.ts';

/** „G-Saite (ganz oben)“, „C-Saite“ … „A-Saite (ganz unten)“ – oben und unten so, wie man das Instrument hält. */
function stringName(i: number): string {
  const s = STRINGS[i].name;
  if (i === 0) return t('{s}-Saite (ganz oben)', { s });
  if (i === STRINGS.length - 1) return t('{s}-Saite (ganz unten)', { s });
  return t('{s}-Saite', { s });
}
const FINGER = ['', tk('Zeigefinger'), tk('Mittelfinger'), tk('Ringfinger'), tk('kleiner Finger')];
const FINGER_ACC = ['', tk('deinen Zeigefinger'), tk('deinen Mittelfinger'), tk('deinen Ringfinger'), tk('deinen kleinen Finger')];

/**
 * Kindgerechter Tipp, was am Griff vermutlich nicht stimmt – statt nur „noch nicht richtig“.
 * kind 'open': gegriffene Saite klingt leer; 'muted': Saite klingt kaum (meist von einem Finger berührt).
 */
export function diagnose(ch: Chord, string: number, kind: 'open' | 'muted' | ''): string {
  const s = stringName(string);
  const fret = ch.frets[string];
  const finger = ch.fingers[string];
  if (fret === 0) {
    return t(
      'Die leere {s} klingt nicht. Wahrscheinlich liegt ein Finger ein bisschen darauf. Stell deine Finger steil auf wie eine Brücke – nur die Fingerkuppen berühren die Saiten.',
      { s },
    );
  }
  const who = finger ? t(FINGER[finger]) : t('Finger');
  if (kind === 'open') {
    return t(
      'Die {s} klingt so, als wäre sie leer: Dein {finger} drückt im {fret} Bund noch nicht ganz herunter. Drück fester – und setz ihn direkt hinter das Bundstäbchen, dann geht es ganz leicht.',
      { s, finger: who, fret: ordinal(fret) },
    );
  }
  return t(
    'Die {s} klingt gedämpft. Vielleicht berührt sie ein Nachbarfinger, oder {finger} liegt flach. Mach ihn rund wie eine Brücke und drück mit der Fingerkuppe im {fret} Bund.',
    { s, finger: finger ? t(FINGER_ACC[finger]) : t('der Finger'), fret: ordinal(fret) },
  );
}
