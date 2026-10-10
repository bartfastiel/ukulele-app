export type InstrumentId = 'ukulele' | 'gitarre' | 'banjo' | 'bariton' | 'mandoline';
export type Lang = 'de' | 'en' | 'fr';
export type L10n = { de: string; en: string; fr: string };
/** Inline-Auszeichnung in Texten: **fett**, [Text](chord:Am), [Text](tool:stimmen), [Text](wissen:<id>), [Text](lied:<id>) */
export type Block =
  | { h2: L10n }
  | { p: L10n }
  | { ul: L10n[] }
  | { ol: L10n[] }
  | { tip: L10n } // hervorgehobener Tipp-Kasten
  | { chord: string } // Griffbild dieses Akkords für das Instrument der Seite (z. B. 'C', 'Am', 'G7')
  | { tool: ToolId }; // großer Knopf zum Werkzeug der App
export type ToolId = 'stimmen' | 'rhythmus' | 'spiel' | 'blues' | 'detektiv' | 'akkorde' | 'lieder' | 'eigenes-lied';
export type Category =
  | 'erste-schritte'
  | 'technik'
  | 'akkorde'
  | 'rhythmus'
  | 'theorie'
  | 'instrument'
  | 'eltern-lehrkraefte';
export interface Article {
  id: string; // stabil, a-z0-9-
  slug: L10n; // URL-Teil je Sprache, a-z0-9-, sprechend (SEO)
  instruments: InstrumentId[]; // auf welchen Instrument-Seiten der Artikel erscheint
  category: Category;
  title: L10n; // H1/Seitentitel, enthält das Suchwort natürlich
  description: L10n; // Meta-Beschreibung, 120–155 Zeichen
  blocks: Block[];
  related?: string[]; // ids verwandter Artikel
  published?: string; // JJJJ-MM-TT, sonst der Start der Wissenssammlung
  updated?: string; // JJJJ-MM-TT der letzten inhaltlichen Überarbeitung
}
