// Erzeugt docs/quellen.md: je mitgeliefertem Lied Urheber mit Lebensdaten, Jahr der Gemeinfreiheit und die Quellen von
// Text und Melodie (aus `origin`, `textUrl` und `melodyUrl` der Lieder). Der Unit-Test prüft, dass die Datei aktuell ist.
//   node tools/quellen.ts
import { writeFileSync } from 'node:fs';
import { SONGS } from '../src/music/songs.ts';
import { CATEGORIES, type Song } from '../src/music/song.ts';
import { WIKI } from './melody/sources.ts';

const LIFESPAN = /(\d{4})–(\d{4})/g;
const OWN = /^Eigenes Lied/;

export interface SourceRow {
  id: string;
  title: string;
  text: string;
  melody: string;
  /** Jahr, ab dem Text und Melodie gemeinfrei sind (70 Jahre nach dem Tod des letzten Urhebers), sonst Erklärung. */
  freeSince: string;
  textSource: string;
  textUrl: string;
  melodySource: string;
  melodyUrl: string;
}

/** Urheber-Teil von `origin` (vor dem ersten „;“) in Text und Melodie aufgeteilt. */
function authors(head: string): { text: string; melody: string } {
  const both = /^Text und Melodie (.*)$/.exec(head);
  if (both) return { text: both[1], melody: both[1] };
  const i = head.search(/(^|, )Melodie /);
  if (i < 0) return { text: head.replace(/^Text /, ''), melody: head };
  const text = head.slice(0, i).replace(/^Text /, '');
  return { text: text || '–', melody: head.slice(i).replace(/^, /, '').replace(/^Melodie /, '') };
}

function freeSince(origin: string): string {
  if (OWN.test(origin)) return 'eigenes Lied (CC0)';
  const stated = /gemeinfrei seit (\d{4})/.exec(origin);
  let last = 0;
  let m: RegExpExecArray | null;
  LIFESPAN.lastIndex = 0;
  while ((m = LIFESPAN.exec(origin))) last = Math.max(last, Number(m[2]));
  if (stated) return stated[1];
  if (last) return String(last + 71);
  if (/Lebensdaten unbekannt/.test(origin)) return 'Lebensdaten unbekannt';
  return 'traditionell/anonym';
}

/** Adresse der Textquelle: angegeben oder – bei „Wikipedia-Artikel“ – der Artikel, aus dem auch das Notenbeispiel kommt. */
function textUrlOf(s: Song, source: string): string {
  if (s.textUrl) return s.textUrl;
  if (/Wikipedia-Artikel/.test(source) && WIKI[s.id]) {
    const parts = WIKI[s.id].split(':');
    return `https://${parts[0]}.wikipedia.org/wiki/${parts.slice(1).join(':')}`;
  }
  return '';
}

export function sourceRows(songs: Song[] = SONGS): SourceRow[] {
  return songs.map((s) => {
    const parts = s.origin.split('; ');
    const own = OWN.test(s.origin);
    const who = authors(parts[0]);
    const melodyPart = parts.filter((p) => /^Melodie gemeinfrei, Notation nach/.test(p))[0] || '';
    const textPart = parts.slice(1).filter((p) => p !== melodyPart && /\bnach\b/.test(p)).join('; ');
    return {
      id: s.id,
      title: s.title,
      text: own ? 'eigenes Lied' : who.text,
      melody: own ? 'eigenes Lied' : who.melody,
      freeSince: freeSince(s.origin),
      textSource: own ? 'eigenes Lied (CC0)' : textPart,
      textUrl: own ? '' : textUrlOf(s, textPart),
      melodySource: own
        ? 'eigenes Lied (CC0)'
        : melodyPart
          ? melodyPart.replace(/^Melodie gemeinfrei, /, '')
          : s.hasMelody
            ? 'eigene Notation der gemeinfreien Melodie'
            : '– (nur Akkorde und Text)',
      melodyUrl: s.melodyUrl || '',
    };
  });
}

const cell = (text: string) => text.replace(/\|/g, '\\|');
const linked = (text: string, url: string) =>
  url ? `${cell(text || 'Quelle')} ([Link](${url.replace(/\(/g, '%28').replace(/\)/g, '%29')}))` : cell(text) || '–';

export function sourcesMarkdown(songs: Song[] = SONGS): string {
  const rows = sourceRows(songs);
  const out = [
    '# Quellen der Lieder',
    '',
    '<!-- Erzeugt von tools/quellen.ts aus `origin`, `textUrl` und `melodyUrl` der Lieder – nicht von Hand bearbeiten. -->',
    '',
    'Alle mitgelieferten Lieder sind gemeinfrei (Text **und** Melodie: Urheber seit mehr als 70 Jahren verstorben,',
    'traditionell bzw. anonym und alt) oder eigene Lieder des Projekts (CC0). „Gemeinfrei seit“ ist das erste Jahr nach',
    'Ablauf der 70 Jahre nach dem Tod des letzten genannten Urhebers. Melodien aus Notenbeispielen in Wikipedia bzw.',
    'Wikisource: übernommen sind nur Tonhöhen, Dauern und Silben der gemeinfreien Melodie; der Link führt auf die',
    'verwendete Fassung des Artikels (Notation dort unter CC BY-SA 4.0). Hinweise von Rechteinhabern bitte als Issue:',
    'https://github.com/bartfastiel/ukulele-app/issues – betroffene Inhalte werden umgehend geprüft und ggf. entfernt.',
    '',
    `${rows.length} Lieder.`,
  ];
  for (const cat of CATEGORIES) {
    const inCat = rows.filter((_r, i) => songs[i].category === cat.id);
    if (!inCat.length) continue;
    out.push('', `## ${cat.title}`, '');
    out.push('| Lied | Text | Melodie | Gemeinfrei seit | Textquelle | Melodiequelle |', '| --- | --- | --- | --- | --- | --- |');
    for (const r of inCat)
      out.push(`| ${cell(r.title)} | ${cell(r.text)} | ${cell(r.melody)} | ${r.freeSince} | ${linked(r.textSource, r.textUrl)} | ${linked(r.melodySource, r.melodyUrl)} |`);
  }
  return out.join('\n') + '\n';
}

export const QUELLEN_FILE = new URL('../docs/quellen.md', import.meta.url);

if (/tools[\\/]quellen\.ts$/.test(process.argv[1] || '')) {
  writeFileSync(QUELLEN_FILE, sourcesMarkdown());
  console.log(`docs/quellen.md: ${SONGS.length} Lieder`);
}
