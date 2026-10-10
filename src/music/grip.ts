/** Ein Griff auf dem aktuellen Instrument. Saiten in Spielreihenfolge (Ukulele G C E A, Gitarre E A D G B e, Banjo g D G B D). */
export interface Chord {
  name: string;
  /** Bund je Saite; 0 = leer, -1 = nicht anschlagen (x). */
  frets: number[];
  /** Finger je Saite (1 Zeige-, 2 Mittel-, 3 Ring-, 4 kleiner Finger), 0 = keiner. */
  fingers: number[];
  /** Kindgerechte Aussprache/Beschreibung. */
  say: string;
  level: number;
  /** Der Zeigefinger liegt quer über mehrere Saiten (Barré): Bund und erste/letzte Saite. */
  barre?: { fret: number; from: number; to: number };
  /** Nur bei Einzeltönen (E-Bass): wo die Quinte für die Basslinie Grundton–Quinte liegt. */
  fifth?: { string: number; fret: number };
}

/** Bünde als Text, ein Zeichen je Saite: „x32010“ → [-1, 3, 2, 0, 1, 0]. */
export function parseGrip(text: string): number[] {
  return text.split('').map((c) => (c === 'x' ? -1 : Number(c)));
}

/** Griff aus der Bibliothek; Barré ergibt sich aus dem Fingersatz (Zeigefinger auf mehreren Saiten im selben Bund). */
export function grip(name: string, frets: string, fingers: string, say: string, level: number, barre = false): Chord {
  const f = parseGrip(frets);
  const fi = fingers.split('').map((c) => (c === 'x' ? 0 : Number(c)));
  const ch: Chord = { name, frets: f, fingers: fi, say, level };
  if (barre) ch.barre = findBarre(f, fi);
  return ch;
}

/** Barré des Zeigefingers: tiefster gegriffener Bund, über alle Saiten mit Finger 1 in diesem Bund. */
export function findBarre(frets: number[], fingers: number[]): Chord['barre'] {
  let fret = 0;
  let from = -1;
  let to = -1;
  frets.forEach((f, i) => {
    if (fingers[i] !== 1 || f <= 0) return;
    if (!fret || f < fret) {
      fret = f;
      from = i;
      to = i;
    } else if (f === fret) to = i;
  });
  return fret && to > from ? { fret, from, to } : undefined;
}
