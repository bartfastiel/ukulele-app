import type { InstrumentId, L10n } from './types.ts';
import { UKULELE_COURSE } from './lektionen-ukulele.ts';
import { GITARRE_COURSE } from './lektionen-gitarre.ts';

/**
 * Lernweg in nummerierten Lektionen – eine Lektion je Unterrichtswoche. Die Nummern sind Teil der Adresse
 * (/ukulele/lektion/4/) und stehen an Tafeln und auf Arbeitsblättern: Sie dürfen sich nie verschieben. Neues kommt
 * hinten dazu.
 *
 * Texte dürfen Inline-Auszeichnung wie die Wissensartikel enthalten: **fett**, [Text](chord:Am), [Text](tool:stimmen),
 * [Text](wissen:<id>), [Text](lied:<id>), dazu [Text](lektion:<n>).
 */

/** Etwas zum Mitspielen: Lied (auf Wunsch in einer bestimmten Tonart), Rhythmus, Akkord-Spiel oder Blues. */
export type Play =
  /** Lied mit „Wartet auf mich“; `key` = Tonart, in der es startet (Schlussakkord, z. B. 'G' oder 'Em'). */
  | { song: string; key?: string; capo?: number }
  /** Rhythmus-Werkzeug; `pattern` = deutscher Name des Musters wie in src/views/rhythm.ts. */
  | { tool: 'rhythmus'; pattern: string }
  /** Akkord-Spiel; `chords` = eine Auswahl, die es im Spiel des Instruments gibt. */
  | { tool: 'spiel'; chords: string[] }
  /** Blues mit Band; `level` = Stufe 1–5, `key` = Tonart. */
  | { tool: 'blues'; level: number; key: string }
  /** Sonstige Seite der App (stimmen, detektiv, akkorde, eigenes-lied, powerchords …). */
  | { tool: string };

export interface Lesson {
  /** Nummer = Woche; fest, lückenlos ab 1. */
  n: number;
  /** Kurzer Titel ohne „Lektion n“, z. B. „Der erste Akkordwechsel“. */
  title: L10n;
  /** Ziel in einem Satz. */
  goal: L10n;
  /** Griffe, die in dieser Lektion neu dazukommen (Griffbilder). */
  chords?: string[];
  /** Wiederholung der Vorwoche (ab Lektion 2). */
  review?: L10n;
  /** Schritt für Schritt (Bildschirm, ausführlich). */
  steps: L10n[];
  /** „Jetzt wird Musik gemacht“: das Stück dieser Woche und womit man es mitspielt. */
  piece: { text: L10n; play: Play[] };
  /** Hausaufgabe bis zum nächsten Mal, z. B. je Tag ein Punkt; mit einem Spaß-Teil. */
  homework: L10n[];
  /** „Geschafft, wenn …“ – nie „falsch“. */
  done: L10n[];
  /** Tipps, wenn es hakt (Finger tun weh, schnarrt …). */
  trouble: L10n[];
  /** Für Lehrkräfte: Ablauf in der Stunde (Einstieg, Übung in der Gruppe, gemeinsames Lied). */
  teacher: L10n[];
  /** Druckblatt: drei bis vier knappe Schritte (das Blatt muss auf eine A4-Seite passen). */
  sheet: L10n[];
  /** Passende Wissensartikel (ids). */
  wissen?: string[];
}

/** Abschnitt der Übersicht: ab Lektion `from`. */
export interface CoursePart {
  from: number;
  title: L10n;
}

export interface Course {
  instrument: InstrumentId;
  parts: CoursePart[];
  lessons: Lesson[];
}

export const COURSES: Course[] = [UKULELE_COURSE, GITARRE_COURSE];

export function courseFor(instrument: string): Course | undefined {
  return COURSES.filter((c) => c.instrument === instrument)[0];
}
