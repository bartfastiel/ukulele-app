// Gemeinsamer Zugriff auf die MediaWiki-API (Wikipedia, Wikisource) für die Melodie-Werkzeuge.
const UA = { 'User-Agent': 'ukulele-app-melody-import/1.0 (privates Open-Source-Projekt)' };

export async function json(url: string, attempt = 0): Promise<any> {
  const res = await fetch(url, { headers: UA });
  if (res.status === 429 && attempt < 6) {
    await new Promise((r) => setTimeout(r, 5000 * 2 ** attempt));
    return json(url, attempt + 1);
  }
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

export interface WikiPage {
  /** Seitentitel nach Auflösen von Weiterleitungen. */
  title: string;
  revid: number;
  text: string;
}

/** Aktueller Quelltext einer Seite samt Revision (für den Permalink im Nachweis). */
export async function fetchPage(host: string, title: string): Promise<WikiPage | null> {
  const data = await json(
    `https://${host}/w/api.php?action=query&prop=revisions&rvprop=content|ids&rvslots=main&redirects=1&format=json&formatversion=2&titles=${encodeURIComponent(title)}`,
  );
  const page = data.query.pages[0];
  if (page.missing || !page.revisions) return null;
  return { title: page.title, revid: page.revisions[0].revid, text: page.revisions[0].slots.main.content };
}

/** Permalink auf genau die Fassung, aus der das Notenbeispiel stammt. */
export function permalink(host: string, title: string, revid: number | string): string {
  return `https://${host}/w/index.php?title=${encodeURIComponent(title.replace(/ /g, '_'))}&oldid=${revid}`;
}
