import type { Article, InstrumentId } from './types.ts';
import { ALLGEMEIN_THEORIE } from './wissen-allgemein-theorie.ts';
import { ALLGEMEIN_PRAXIS } from './wissen-allgemein-praxis.ts';
import { UKULELE_ARTICLES } from './wissen-ukulele.ts';
import { GITARRE_ARTICLES } from './wissen-gitarre.ts';
import { BANJO_ARTICLES } from './wissen-banjo.ts';
import { BARITON_ARTICLES } from './wissen-bariton.ts';
import { MANDOLINE_ARTICLES } from './wissen-mandoline.ts';
import { BASS_ARTICLES } from './wissen-bass.ts';
import { STIMMUNGEN_ARTICLES } from './wissen-stimmungen.ts';

export const ARTICLES: Article[] = UKULELE_ARTICLES.concat(
  GITARRE_ARTICLES,
  BANJO_ARTICLES,
  BARITON_ARTICLES,
  MANDOLINE_ARTICLES,
  BASS_ARTICLES,
  STIMMUNGEN_ARTICLES,
  ALLGEMEIN_THEORIE,
  ALLGEMEIN_PRAXIS,
);

export function article(id: string): Article | undefined {
  return ARTICLES.find((a) => a.id === id);
}

export function articlesFor(instrument: InstrumentId): Article[] {
  return ARTICLES.filter((a) => a.instruments.indexOf(instrument) >= 0);
}
