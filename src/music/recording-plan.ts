import { t, tk } from '../i18n.ts';
import { instrument } from './instrument.ts';
import { chord, chordPitchClasses } from './chords.ts';
import { STRINGS, stringMidi } from './notes.ts';

/**
 * Aufnahmeplan für Testdaten der Akkorderkennung: richtige Griffe in verschiedenen Spielweisen, typische
 * Anfängerfehler und Störgeräusche. `frets` beschreibt, was WIRKLICH gespielt wird (ein Zeichen je Saite, bei der
 * Ukulele G, C, E, A; x = gedämpft) –
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
  /** Platzhalter der Teile, z. B. { chord: 'G', s: 'B' }. */
  params?: Record<string, string>;
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

// ---------- Gitarre, Banjo: Plan aus den Griffen des Instruments ----------

/** Deutscher Text mit Platzhaltern – für takes.json, unabhängig von der gewählten Sprache. */
function german(text: string, params: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (m, k: string) => (k in params ? params[k] : m));
}

const PLUCK_ANY = tk('Die Saiten einzeln zupfen, von oben ({first}) nach unten ({last}), danach einmal alle zusammen.');

function generic(chordName: string, frets: number[], technique: Technique, mistake = '', params: Record<string, string> = {}): Take {
  const text = frets.map((f) => (f < 0 ? 'x' : String(f))).join('');
  const how = technique === 'pluck' ? PLUCK_ANY : HOW[technique];
  const p: Record<string, string> = { first: STRINGS[0].name, last: STRINGS[STRINGS.length - 1].name, chord: chordName };
  for (const k of Object.keys(params)) p[k] = params[k];
  const parts = mistake ? [mistake, how] : [how];
  return {
    id: `${chordName}-${text}-${technique}${mistake ? '-fehler' : ''}`,
    chord: chordName,
    frets: text,
    technique,
    correct: !mistake,
    instruction: parts.map((x) => german(x, p)).join(' '),
    parts,
    params: p,
  };
}

/**
 * Liegt der Ton der Saite `string` genau auf einem Oberton einer anderen klingenden Saite (z. B. F#4 = 3. Oberton von
 * B2)? Dann ist der Fehlgriff im Spektrum kaum vom richtigen Griff zu unterscheiden – als Testaufnahme ungeeignet.
 */
function overtone(frets: number[], string: number): boolean {
  const m = stringMidi(string, frets[string]);
  return frets.some((f, i) => {
    if (i === string || f < 0) return false;
    const d = m - stringMidi(i, f);
    return d === 19 || d === 28 || d === 31;
  });
}

function samePcs(a: number[], name: string): boolean {
  const want = chordPitchClasses(chord(name));
  const got = chordPitchClasses({ name, frets: a, fingers: [], say: '', level: 0 });
  return want.size === got.size && Array.from(want).every((p) => got.has(p));
}

/** Typische Fehler am Griff: ein Finger drückt nicht, liegt einen Bund zu tief, oder dämpft eine Nachbarsaite. */
function mistakes(name: string): Take[] {
  const ch = chord(name);
  const out: Take[] = [];
  let top = -1;
  ch.frets.forEach((f, i) => {
    if (f > 0 && (top < 0 || f >= ch.frets[top])) top = i;
  });
  if (top >= 0) {
    const s = STRINGS[top].name;
    const open = ch.frets.slice();
    open[top] = 0;
    if (!samePcs(open, name))
      out.push(generic(name, open, 'strum', tk('Absichtlich falsch: {chord} greifen, aber der Finger auf der {s}-Saite drückt NICHT – sie klingt leer.'), { s }));
    const low = ch.frets.slice();
    low[top] = ch.frets[top] - 1;
    if (low[top] > 0 && !samePcs(low, name) && !overtone(low, top))
      out.push(
        generic(name, low, 'strum', tk('Absichtlich falsch: {chord} greifen, aber den Finger auf der {s}-Saite einen Bund zu tief setzen ({fret} statt {right}).'), {
          s,
          fret: String(low[top]),
          right: String(ch.frets[top]),
        }),
      );
  }
  for (let i = 0; i < ch.frets.length; i++) {
    if (ch.frets[i] < 0) continue;
    const muted = ch.frets.slice();
    muted[i] = -1;
    if (samePcs(muted, name)) continue;
    out.push(generic(name, muted, 'strum', tk('Absichtlich falsch: {chord} greifen, aber ein Finger berührt die {s}-Saite, sodass sie gedämpft klingt.'), { s: STRINGS[i].name }));
    break;
  }
  return out;
}

const plans: Record<string, Take[]> = {};

/** Aufnahmeplan des aktuellen Instruments (Ukulele: PLAN). */
export function plan(): Take[] {
  const inst = instrument();
  if (inst.id === 'ukulele' && !inst.tuning) return PLAN;
  const key = inst.id + (inst.tuning ? ':' + inst.tuning.id : '');
  if (plans[key]) return plans[key];
  const names = inst.recordChords;
  const out: Take[] = [];
  names.forEach((c) => out.push(generic(c, chord(c).frets, 'strum')));
  names.slice(0, 4).forEach((c) => out.push(generic(c, chord(c).frets, 'pluck')));
  names.slice(0, 2).forEach((c) => out.push(generic(c, chord(c).frets, 'ring')));
  names.slice(0, 4).forEach((c) => mistakes(c).forEach((m) => out.push(m)));
  const none = STRINGS.map(() => '-').join('');
  const of = { of: t(inst.of) };
  out.push(noise('stille', none, tk('Nichts spielen – nur die Stille im Raum aufnehmen.')));
  out.push(noise('sprechen', none, tk('Ein paar Sätze sprechen, ohne zu spielen.')));
  const knock = tk('Mit den Fingern auf den Korpus {of} klopfen.');
  out.push({ id: 'klopfen', chord: null, frets: none, technique: 'noise', correct: false, instruction: german(knock, of), parts: [knock], params: of });
  const top = { s: STRINGS[0].name };
  const single = tk('Nur die {s}-Saite (oben) leer zupfen, mehrmals.');
  const frets = '0' + none.slice(1).replace(/-/g, 'x');
  out.push({ id: `${top.s}-saite-leer`, chord: null, frets, technique: 'noise', correct: false, instruction: german(single, top), parts: [single], params: top });
  plans[key] = out;
  return out;
}

/** Bünde als Text → Griffbild-Werte; „x“ wird zu -1 (gedämpft), „-“ zu -2 (nicht gespielt). */
export function parseFrets(frets: string): number[] {
  return frets.split('').map((c) => (c === 'x' ? -1 : c === '-' ? -2 : Number(c)));
}

/** Anweisung in der gewählten Sprache; eigene Aufnahmen zeigen die eingegebene Notiz. */
export function instructionText(take: Take): string {
  return take.parts ? take.parts.map((x) => t(x, take.params)).join(' ') : take.instruction;
}
