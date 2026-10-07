import { t, tk } from '../i18n.ts';

/**
 * Aufnahmeplan für Testdaten der Akkorderkennung: richtige Griffe in verschiedenen Spielweisen, typische
 * Anfängerfehler und Störgeräusche. `frets` beschreibt, was WIRKLICH gespielt wird (G, C, E, A; x = gedämpft) –
 * daran misst die Auswertung (tools/eval-recordings.ts), ob die Erkennung zu Recht lobt.
 */
export type Technique = 'strum' | 'pluck' | 'ring' | 'noise';

export interface Take {
  id: string;
  /** Akkord, den das Kind spielen wollte (für Fehlgriffe) bzw. der gespielt wird; null bei Geräuschen. */
  chord: string | null;
  frets: string;
  technique: Technique;
  correct: boolean;
  /** Anweisung auf Deutsch (so landet sie in takes.json). */
  instruction: string;
  /** Übersetzbare Teile der Anweisung für die Anzeige. */
  parts?: string[];
}

const HOW: Record<Technique, string> = {
  strum: tk('Viermal langsam mit dem Daumen oder Zeigefinger abwärts über alle Saiten streichen.'),
  pluck: tk('Die Saiten einzeln zupfen, von oben (G) nach unten (A), danach einmal alle zusammen.'),
  ring: tk('Einmal kräftig anschlagen und ausklingen lassen.'),
  noise: '',
};

function take(chord: string, frets: string, technique: Technique, correct = true, mistake = ''): Take {
  const id = `${chord}-${frets}-${technique}${correct ? '' : '-fehler'}`;
  return {
    id,
    chord,
    frets,
    technique,
    correct,
    instruction: mistake ? `${mistake} ${HOW[technique]}` : HOW[technique],
    parts: mistake ? [mistake, HOW[technique]] : [HOW[technique]],
  };
}

function noise(id: string, frets: string, instruction: string): Take {
  return { id, chord: null, frets, technique: 'noise', correct: false, instruction, parts: [instruction] };
}

export const CORRECT_FRETS: Record<string, string> = {
  C: '0003',
  Am: '2000',
  F: '2010',
  G7: '0212',
  C7: '0001',
  A7: '0100',
  G: '0232',
  Dm: '2210',
  Em: '0432',
  D7: '2223',
};

export const PLAN: Take[] = [
  ...Object.keys(CORRECT_FRETS).map((c) => take(c, CORRECT_FRETS[c], 'strum')),
  ...['C', 'F', 'G7', 'Am'].map((c) => take(c, CORRECT_FRETS[c], 'pluck')),
  ...['C', 'G7'].map((c) => take(c, CORRECT_FRETS[c], 'ring')),
  take('C', '0000', 'strum', false, tk('Absichtlich falsch: C greifen, aber der Ringfinger drückt NICHT – alle Saiten klingen leer.')),
  take('C', '0002', 'strum', false, tk('Absichtlich falsch: Ringfinger im 2. statt im 3. Bund der A-Saite.')),
  take('C', '00x3', 'strum', false, tk('Absichtlich falsch: C greifen, aber der Ringfinger berührt die E-Saite, sodass sie gedämpft klingt.')),
  take('F', '2000', 'strum', false, tk('Absichtlich falsch: F ohne Zeigefinger (nur der Mittelfinger auf der G-Saite).')),
  take('F', '0010', 'strum', false, tk('Absichtlich falsch: F ohne Mittelfinger (nur der Zeigefinger auf der E-Saite).')),
  take('G7', '0202', 'strum', false, tk('Absichtlich falsch: G7 ohne Zeigefinger (E-Saite klingt leer).')),
  take('G7', '2120', 'strum', false, tk('Absichtlich falsch: die G7-Form um eine Saite nach oben verrutscht (G-, C- und E-Saite gegriffen, A leer).')),
  take('Am', '0200', 'strum', false, tk('Absichtlich falsch: Am-Finger auf der C-Saite statt auf der G-Saite.')),
  noise('stille', '----', tk('Nichts spielen – nur die Stille im Raum aufnehmen.')),
  noise('sprechen', '----', tk('Ein paar Sätze sprechen, ohne zu spielen.')),
  noise('klopfen', '----', tk('Mit den Fingern auf den Korpus der Ukulele klopfen.')),
  noise('G-saite-leer', '0xxx', tk('Nur die G-Saite (oben) leer zupfen, mehrmals.')),
];

/** Bünde als Text → Griffbild-Werte; „x“ wird zu -1 (gedämpft), „-“ zu -2 (nicht gespielt). */
export function parseFrets(frets: string): number[] {
  return frets.split('').map((c) => (c === 'x' ? -1 : c === '-' ? -2 : Number(c)));
}

/** Anweisung in der gewählten Sprache; eigene Aufnahmen zeigen die eingegebene Notiz. */
export function instructionText(take: Take): string {
  return take.parts ? take.parts.map((x) => t(x)).join(' ') : take.instruction;
}
