import type { Song } from './song.ts';

/** Für die Suche vereinheitlichen: klein, ohne Akzente, ä/ö/ü auch als ae/oe/ue, ß als ss. */
export function fold(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ae/g, 'a')
    .replace(/oe/g, 'o')
    .replace(/ue/g, 'u');
}

/** Liedtext als Fließtext (Silben zu Wörtern zusammengesetzt). */
export function songText(song: Song): string {
  let out = '';
  for (const e of song.events) {
    if (!e.syllable) continue;
    out += e.syllable.replace(/‿/g, ' ') + (e.joinNext ? '' : ' ');
  }
  return out.replace(/\s+/g, ' ').trim();
}

export interface Hit {
  song: Song;
  /** Treffer im Titel (sonst nur im Text) */
  inTitle: boolean;
  /** Textausschnitt um den Treffer: davor, Treffer, danach */
  snippet: [string, string, string] | null;
}

/**
 * Vereinheitlichte Fassung samt Zuordnung zurück zur Originalstelle, damit der Ausschnitt den echten Text zeigt.
 */
function foldWithMap(text: string): { folded: string; map: number[] } {
  let folded = '';
  const map: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const f = fold(text[i]);
    for (let k = 0; k < f.length; k++) {
      folded += f[k];
      map.push(i);
    }
  }
  // „ae“ usw. über Zeichengrenzen hinweg: dieselbe Regel wie in fold(), Zuordnung mitführen
  let out = '';
  const outMap: number[] = [];
  for (let i = 0; i < folded.length; i++) {
    const two = folded.slice(i, i + 2);
    if (two === 'ae' || two === 'oe' || two === 'ue') {
      out += two[0];
      outMap.push(map[i]);
      i++;
      continue;
    }
    out += folded[i];
    outMap.push(map[i]);
  }
  return { folded: out, map: outMap };
}

/** Alle Wörter der Anfrage müssen vorkommen; Titeltreffer zuerst, dann Treffer im Liedtext. */
export function searchSongs(songs: Song[], query: string, context = 28): Hit[] {
  const words = fold(query).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const titleHits: Hit[] = [];
  const textHits: Hit[] = [];
  for (const song of songs) {
    const title = fold(song.title);
    if (words.every((w) => title.indexOf(w) >= 0)) {
      titleHits.push({ song, inTitle: true, snippet: null });
      continue;
    }
    const text = songText(song);
    const f = foldWithMap(text);
    if (!words.every((w) => f.folded.indexOf(w) >= 0)) continue;
    const at = f.folded.indexOf(words[0]);
    const start = f.map[at];
    const end = f.map[at + words[0].length - 1] + 1;
    const from = Math.max(0, text.lastIndexOf(' ', Math.max(0, start - context)) + 1);
    const toSpace = text.indexOf(' ', end + context);
    const to = toSpace < 0 ? text.length : toSpace;
    textHits.push({
      song,
      inTitle: false,
      snippet: [(from > 0 ? '… ' : '') + text.slice(from, start), text.slice(start, end), text.slice(end, to) + (to < text.length ? ' …' : '')],
    });
  }
  // kürzere Titel (genauere Treffer) zuerst
  titleHits.sort((a, b) => a.song.title.length - b.song.title.length);
  return titleHits.concat(textHits);
}
