export type InstrumentId = 'ukulele' | 'gitarre' | 'banjo';
export type Lang = 'de' | 'en' | 'fr';
export type L10n = { de: string; en: string; fr: string };
/** Inline-Auszeichnung in Texten: **fett**, [Text](chord:Am), [Text](tool:stimmen), [Text](wissen:<id>), [Text](lied:<id>) */
export type Block =
  | { h2: L10n }
  | { p: L10n }
  | { ul: L10n[] }
  | { ol: L10n[] }
  | { tip: L10n }
  | { chord: string }
  | { tool: ToolId };
export type ToolId = 'stimmen' | 'rhythmus' | 'spiel' | 'blues' | 'detektiv' | 'akkorde' | 'lieder' | 'eigenes-lied';
export type Category = 'erste-schritte' | 'technik' | 'akkorde' | 'rhythmus' | 'theorie' | 'instrument' | 'eltern-lehrkraefte';
export interface Article {
  id: string;
  slug: L10n;
  instruments: InstrumentId[];
  category: Category;
  title: L10n;
  description: L10n;
  blocks: Block[];
  related?: string[];
}
