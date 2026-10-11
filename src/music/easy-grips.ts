import { noteText, t, tk } from '../i18n.ts';
import { instrument } from './instrument.ts';
import { QUALITY_INTERVALS, chord, chordCost, parseChordName } from './chords.ts';
import { findBarre, parseGrip, type Chord } from './grip.ts';
import { STRINGS, noteName, pitchClass, stringMidi } from './notes.ts';

/** Finger-Nummer des Daumens, der über den Hals greift (im Griffbild als Buchstabe). */
export const THUMB = 5;

/**
 * Leichtere Griffvariante oder Lagerfeuer-Trick für einen Akkord. Was wirklich klingt, rechnet `easyLabels` aus den
 * Bünden aus – so steht nie „F“ drauf, wo Fmaj7 klingt.
 */
interface EasyDef {
  chord: string;
  frets: string;
  /** Finger je Saite: 1–4, D = Daumen, 0/x = keiner */
  fingers: string;
  title: string;
  text: string;
  when: string;
  /** So heißt der Griff eigentlich, wenn er nicht genau der Akkord ist (Fmaj7 statt F). */
  is?: string;
  /** Der Grundton fehlt (leichtes D7 auf der Ukulele). */
  noRoot?: boolean;
}

const DEFS: Record<string, EasyDef[]> = {
  ukulele: [
    {
      chord: 'D',
      frets: '2220',
      fingers: '1110',
      title: tk('D mit einem Finger'),
      text: tk('Leg den Zeigefinger flach über G-, C- und E-Saite im 2. Bund. Die A-Saite muss frei klingen – knick dafür die Fingerspitze etwas ab.'),
      when: tk('Wenn drei Finger im 2. Bund nicht nebeneinander passen.'),
    },
    {
      chord: 'D',
      frets: '2020',
      fingers: '1020',
      is: 'D7',
      noRoot: true,
      title: tk('Leichtes D7'),
      text: tk('Zeigefinger auf die G-Saite, Mittelfinger auf die E-Saite, beide im 2. Bund. C- und A-Saite bleiben leer.'),
      when: tk('Wenn im Lied auch D7 passt, zum Beispiel kurz vor G.'),
    },
    {
      chord: 'E',
      frets: '1202',
      fingers: '1203',
      is: 'E7',
      title: tk('E7 statt E'),
      text: tk('Zeigefinger auf die G-Saite im 1. Bund, Mittelfinger auf die C-Saite und Ringfinger auf die A-Saite im 2. Bund. Die E-Saite bleibt leer.'),
      when: tk('In den meisten Liedern klingt E7 an dieser Stelle fast genauso gut.'),
    },
    {
      chord: 'E',
      frets: '1402',
      fingers: '1302',
      title: tk('E mit drei Fingern'),
      text: tk('Zeigefinger auf die G-Saite im 1. Bund, Mittelfinger auf die A-Saite im 2. Bund, Ringfinger auf die C-Saite im 4. Bund. Die E-Saite bleibt leer.'),
      when: tk('Ein echtes E mit nur drei Fingern – dafür musst du sie weit spreizen.'),
    },
    {
      chord: 'G',
      frets: '0212',
      fingers: '0213',
      is: 'G7',
      title: tk('G7 als Wechselhilfe'),
      text: tk('Von F zu G7 bleibt der Zeigefinger auf der E-Saite im 1. Bund liegen – nur zwei Finger wandern.'),
      when: tk('Wenn der Wechsel zu G zu lange dauert und G7 ins Lied passt, besonders vor C.'),
    },
    {
      chord: 'Bb',
      frets: '3210',
      fingers: '3210',
      is: 'Bbmaj7',
      title: tk('Bbmaj7 ohne Querbalken'),
      text: tk('Ringfinger auf die G-Saite im 3. Bund, Mittelfinger auf die C-Saite im 2. Bund, Zeigefinger auf die E-Saite im 1. Bund. Die A-Saite bleibt leer.'),
      when: tk('Wenn der kleine Barré noch nicht klappt. Klingt weicher als Bb, passt aber in vielen Liedern.'),
    },
    {
      chord: 'Em',
      frets: '0202',
      fingers: '0102',
      is: 'Em7',
      title: tk('Em7 mit zwei Fingern'),
      text: tk('Zeigefinger auf die C-Saite, Mittelfinger auf die A-Saite, beide im 2. Bund. G- und E-Saite bleiben leer.'),
      when: tk('Klingt fast wie Em und passt fast immer – viel leichter als drei Finger in drei Bünden.'),
    },
    {
      chord: 'Em',
      frets: '0402',
      fingers: '0301',
      title: tk('Em mit zwei Fingern'),
      text: tk('Ringfinger auf die C-Saite im 4. Bund, Zeigefinger auf die A-Saite im 2. Bund. G- und E-Saite bleiben leer.'),
      when: tk('Ein echtes Em mit nur zwei Fingern. Pass auf, dass der Ringfinger die E-Saite nicht berührt.'),
    },
  ],
  gitarre: [
    {
      chord: 'F',
      frets: 'xx3210',
      fingers: 'xx3210',
      is: 'Fmaj7',
      title: tk('Fmaj7 ohne Barré'),
      text: tk('Ringfinger auf die D-Saite im 3. Bund, Mittelfinger auf die G-Saite im 2. Bund, Zeigefinger auf die B-Saite im 1. Bund. Die hohe e-Saite bleibt leer, die zwei tiefen Saiten schlägst du nicht an.'),
      when: tk('Der leichteste Einstieg statt F: klingt weicher und passt fast immer.'),
    },
    {
      chord: 'G',
      frets: 'xx0003',
      fingers: 'xx0003',
      title: tk('Mini-G mit einem Finger'),
      text: tk('Ringfinger auf die hohe e-Saite im 3. Bund. Nur die vier dünnen Saiten anschlagen.'),
      when: tk('Für den Anfang und für schnelle Wechsel – zusammen mit Mini-C und D.'),
    },
    {
      chord: 'G',
      frets: '3x0003',
      fingers: 'Dx0003',
      title: tk('Daumen-G'),
      text: tk('Der Daumen drückt über den Hals die tiefe E-Saite im 3. Bund und dämpft mit seiner Spitze die A-Saite. Der Ringfinger kommt auf die hohe e-Saite im 3. Bund.'),
      when: tk('Ein volles G mit tiefem Grundton, aber nur zwei Fingern.'),
    },
    {
      chord: 'G',
      frets: '320033',
      fingers: '210034',
      title: tk('Rock-G für schnelle Wechsel'),
      text: tk('Mittelfinger auf die tiefe E-Saite und Ringfinger auf die B-Saite, kleiner Finger auf die e-Saite – alle im 3. Bund. Zeigefinger auf die A-Saite im 2. Bund.'),
      when: tk('Ring- und kleiner Finger bleiben beim Wechsel zu Cadd9, Dsus4 und dem Em7 zum Rock-G einfach liegen.'),
    },
    {
      chord: 'G7',
      frets: 'xx0001',
      fingers: 'xx0001',
      title: tk('Mini-G7 mit einem Finger'),
      text: tk('Zeigefinger auf die hohe e-Saite im 1. Bund. Nur die vier dünnen Saiten anschlagen.'),
      when: tk('Passt zu Mini-G und Mini-C – so geht C, G7 und G mit ganz wenig Fingerarbeit.'),
    },
    {
      chord: 'Em',
      frets: '022033',
      fingers: '012034',
      is: 'Em7',
      title: tk('Em7 zum Rock-G'),
      text: tk('Zeigefinger auf die A-Saite und Mittelfinger auf die D-Saite im 2. Bund, Ringfinger und kleiner Finger auf B- und e-Saite im 3. Bund.'),
      when: tk('In Liedern mit G: Ring- und kleiner Finger bleiben vom Rock-G aus einfach liegen.'),
    },
    {
      chord: 'C',
      frets: 'xx2010',
      fingers: 'xx2010',
      title: tk('Mini-C mit zwei Fingern'),
      text: tk('Mittelfinger auf die D-Saite im 2. Bund, Zeigefinger auf die B-Saite im 1. Bund. Nur die vier dünnen Saiten anschlagen.'),
      when: tk('Wenn der Ringfinger für das große C noch nicht weit genug reicht.'),
    },
    {
      chord: 'C',
      frets: 'x32033',
      fingers: 'x21034',
      is: 'Cadd9',
      title: tk('Cadd9 zum Rock-G'),
      text: tk('Mittelfinger auf die A-Saite im 3. Bund, Zeigefinger auf die D-Saite im 2. Bund, Ringfinger und kleiner Finger auf B- und e-Saite im 3. Bund.'),
      when: tk('In Liedern mit G: Vom Rock-G aus wandern nur zwei Finger eine Saite weiter. Der Zusatzton D klingt schön offen.'),
    },
    {
      chord: 'A',
      frets: 'x02220',
      fingers: 'x01110',
      title: tk('A mit einem Finger'),
      text: tk('Leg den Zeigefinger flach über D-, G- und B-Saite im 2. Bund. Die hohe e-Saite soll frei klingen.'),
      when: tk('Wenn drei Finger im 2. Bund keinen Platz haben.'),
    },
    {
      chord: 'A',
      frets: 'x02200',
      fingers: 'x01200',
      is: 'Asus2',
      title: tk('Asus2 mit zwei Fingern'),
      text: tk('Zeigefinger auf die D-Saite, Mittelfinger auf die G-Saite, beide im 2. Bund. B- und e-Saite bleiben leer, die tiefe E-Saite schlägst du nicht an.'),
      when: tk('Klingt offen und schwebend, weder Dur noch Moll. Passt in vielen Pop- und Lagerfeuerliedern statt A.'),
    },
    {
      chord: 'Bm',
      frets: 'xx4432',
      fingers: 'xx3421',
      title: tk('Mini-Bm ohne Barré'),
      text: tk('Ringfinger auf die D-Saite und kleiner Finger auf die G-Saite im 4. Bund, Mittelfinger auf die B-Saite im 3. Bund, Zeigefinger auf die e-Saite im 2. Bund. Nur vier Saiten anschlagen.'),
      when: tk('Der übliche Weg zu Bm, bis der Barré klappt.'),
    },
    {
      chord: 'Bm',
      frets: 'x20202',
      fingers: 'x10203',
      is: 'Bm7',
      title: tk('Bm7 mit drei Fingern'),
      text: tk('Zeigefinger auf die A-Saite, Mittelfinger auf die G-Saite, Ringfinger auf die hohe e-Saite – alle im 2. Bund. D- und B-Saite bleiben leer.'),
      when: tk('Klingt weich und fast wie Bm.'),
    },
    {
      chord: 'Bb',
      frets: 'xx3331',
      fingers: 'xx2341',
      title: tk('Mini-Bb'),
      text: tk('Mittel-, Ring- und kleiner Finger auf D-, G- und B-Saite im 3. Bund, Zeigefinger auf die hohe e-Saite im 1. Bund. Nur vier Saiten anschlagen.'),
      when: tk('Statt des großen Barrés, zum Beispiel in Liedern in F.'),
    },
  ],
  mandoline: [
    {
      chord: 'A',
      frets: '2200',
      fingers: '1200',
      is: 'A5',
      title: tk('A5 mit zwei Fingern'),
      text: tk('Zeigefinger auf die G-Saite, Mittelfinger auf die D-Saite, beide im 2. Bund. A- und E-Saite bleiben leer.'),
      when: tk('Ohne Terz, also weder Dur noch Moll – klingt kräftig und passt, wenn die anderen A spielen.'),
    },
  ],
  bariton: [
    {
      chord: 'F',
      frets: '3210',
      fingers: '3210',
      is: 'Fmaj7',
      title: tk('Fmaj7 ohne Barré'),
      text: tk('Ringfinger auf die D-Saite im 3. Bund, Mittelfinger auf die G-Saite im 2. Bund, Zeigefinger auf die B-Saite im 1. Bund. Die E-Saite bleibt leer.'),
      when: tk('Der leichteste Einstieg statt F: klingt weicher und passt fast immer.'),
    },
    {
      chord: 'A',
      frets: '2220',
      fingers: '1110',
      title: tk('A mit einem Finger'),
      text: tk('Leg den Zeigefinger flach über D-, G- und B-Saite im 2. Bund. Die E-Saite soll frei klingen.'),
      when: tk('Wenn drei Finger im 2. Bund keinen Platz haben.'),
    },
    {
      chord: 'Bm',
      frets: '0202',
      fingers: '0102',
      is: 'Bm7',
      title: tk('Bm7 mit zwei Fingern'),
      text: tk('Zeigefinger auf die G-Saite, Mittelfinger auf die E-Saite, beide im 2. Bund. D- und B-Saite bleiben leer.'),
      when: tk('Klingt fast wie Bm – viel leichter als vier Finger.'),
    },
  ],
  banjo: [
    {
      chord: 'C',
      frets: '05555',
      fingers: '01111',
      title: tk('C mit einem Finger'),
      text: tk('Leg den Zeigefinger flach über die vier langen Saiten im 5. Bund. Die kurze Saite klingt leer mit.'),
      when: tk('Der Lagerfeuer-Trick des Banjos: G klingt mit leeren Saiten, C ist ein Finger im 5. Bund.'),
    },
    {
      chord: 'D',
      frets: 'x7777',
      fingers: 'x1111',
      title: tk('D mit einem Finger'),
      text: tk('Leg den Zeigefinger flach über die vier langen Saiten im 7. Bund. Die kurze Saite schlägst du nicht an.'),
      when: tk('Mit G (leer) und C (5. Bund) hast du drei Akkorde für viele Lieder.'),
    },
  ],
};

/** Wissensartikel mit Tricks je Instrument (Akkordseiten verlinken ihn, wo es Varianten gibt). */
const ARTICLE: Record<string, string> = { ukulele: 'ukulele-schwierige-akkorde', gitarre: 'gitarre-lagerfeuer-tricks', banjo: 'banjo-ein-finger-akkorde' };

export function easyArticle(): string | undefined {
  return ARTICLE[instrument().id];
}

export interface EasyGrip {
  /** Akkord, für den der Griff einspringt */
  chord: string;
  grip: Chord;
  title: string;
  text: string;
  when: string;
  is?: string;
  noRoot?: boolean;
}

function make(d: EasyDef): EasyGrip {
  const frets = parseGrip(d.frets);
  const fingers = d.fingers.split('').map((c) => (c === 'D' ? THUMB : c === 'x' ? 0 : Number(c)));
  const grip: Chord = { name: d.chord, frets, fingers, say: d.title, level: 5 };
  const barre = findBarre(frets, fingers);
  if (barre) grip.barre = barre;
  const out: EasyGrip = { chord: d.chord, grip, title: d.title, text: d.text, when: d.when };
  if (d.is) out.is = d.is;
  if (d.noRoot) out.noRoot = true;
  return out;
}

/** Alle Varianten des aktuellen Instruments; in anderen Stimmungen keine (sie gelten für die Normalstimmung). */
export function allEasyGrips(): EasyGrip[] {
  const inst = instrument();
  if (inst.tuning || inst.notesOnly) return [];
  return (DEFS[inst.id] || []).map(make);
}

export function easyGrips(name: string): EasyGrip[] {
  return allEasyGrips().filter((e) => e.chord === name);
}

/** Tonklassen, die ein Griff tatsächlich klingen lässt. */
export function soundingClasses(ch: Chord): number[] {
  const out: number[] = [];
  ch.frets.forEach((f, i) => {
    if (f < 0) return;
    const pc = pitchClass(stringMidi(i, f));
    if (out.indexOf(pc) < 0) out.push(pc);
  });
  return out.sort((a, b) => a - b);
}

/** Tonklassen, die der Griff laut Beschriftung haben soll: der Akkord bzw. `is`, ohne Grundton bei `noRoot`. */
export function claimedClasses(e: EasyGrip): number[] {
  const p = parseChordName(e.is || e.chord)!;
  return QUALITY_INTERVALS[p.quality]
    .filter((i) => !(e.noRoot && i === 0))
    .map((i) => (p.root + i) % 12)
    .sort((a, b) => a - b);
}

/** Tiefster klingender Ton (Tonklasse) – bei der Ukulele mit hohem G zählt er nicht als Bass. */
export function lowestClass(ch: Chord): number {
  let low = Infinity;
  ch.frets.forEach((f, i) => {
    if (f >= 0) low = Math.min(low, stringMidi(i, f));
  });
  return pitchClass(low);
}

/** Ehrliche Kurzbeschriftung: was klingt wirklich, was fehlt, wie viele Saiten, wo ist der Daumen. */
export function easyLabels(e: EasyGrip): string[] {
  const out: string[] = [];
  const root = parseChordName(e.chord)!.root;
  if (e.is) out.push(t('eigentlich {chord}', { chord: e.is }));
  if (e.noRoot) out.push(t('ohne Grundton {note}', { note: noteText(noteName(root)) }));
  const lib = chord(e.chord).frets;
  const same = lib.join(' ') === e.grip.frets.join(' ');
  if (!e.is && !e.noRoot) out.push(same ? t('gleiche Töne, anderer Fingersatz') : t('alle Töne von {chord}', { chord: e.chord }));
  if (same) return out;
  const thumb = e.grip.fingers.indexOf(THUMB) >= 0;
  const muted = e.grip.frets.filter((f) => f < 0).length;
  // der Daumen dämpft eine Saite, angeschlagen werden trotzdem alle
  if (!thumb && muted > lib.filter((f) => f < 0).length) out.push(t('nur {n} Saiten anschlagen', { n: STRINGS.length - muted }));
  const pcRoot = parseChordName(e.is || e.chord)!.root;
  const low = lowestClass(e.grip);
  if (instrument().id !== 'ukulele' && !e.noRoot && low !== pcRoot) out.push(t('tiefster Ton {note}', { note: noteText(noteName(low)) }));
  if (thumb) out.push(t('mit dem Daumen'));
  return out;
}

/** Mindestens so viel leichter muss ein Griffbild sein, damit „Einfache Griffe“ es in Liedern zeigt. */
const SONG_GAIN = 1.5;

/**
 * Leichteres Griffbild für denselben Akkord in Liedern („Einfache Griffe“): nur Varianten mit allen Tönen des Akkords,
 * ohne Daumen-Trick, und nur, wenn sie deutlich leichter sind (Gitarre: Mini-G statt G).
 */
export function songGrip(name: string): Chord | null {
  let best: Chord | null = null;
  let bestCost = chordCost(chord(name)) - SONG_GAIN + 1e-9;
  for (const e of easyGrips(name)) {
    if (e.is || e.noRoot || e.grip.fingers.indexOf(THUMB) >= 0) continue;
    const c = chordCost(e.grip);
    if (c < bestCost) {
      best = e.grip;
      bestCost = c;
    }
  }
  return best;
}
