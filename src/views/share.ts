import { h, s } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, button, type View } from '../ui/screen.ts';
import { importNotes, songPreview } from '../ui/song-preview.ts';
import { importSong } from '../music/import.ts';
import { METERS, decodeShare, encodeShare, newOwnId, ownToSong } from '../music/own-songs.ts';
import { encodeQr, qrPath } from '../util/qr.ts';
import { ownSongs, putOwnSong } from '../store.ts';

/** Größte QR-Version, die auf einem Bildschirm noch zuverlässig abfotografiert werden kann. */
const MAX_QR_VERSION = 25;

function meterLabel(m: number): string {
  const found = METERS.filter((x) => x.value === m)[0];
  return found ? found.label : `${m}/4`;
}

/** Link zum Lied: alles steckt im Fragment hinter „#“ – das schickt der Browser nie an den Server. */
export function shareLink(data: string): string {
  return `${location.href.split('#')[0]}#/teilen/${data}`;
}

function qrSvg(text: string): SVGElement | null {
  const qr = encodeQr(text, { maxVersion: MAX_QR_VERSION });
  if (!qr) return null;
  const n = qr.size + 8;
  return s(
    'svg',
    { viewBox: `0 0 ${n} ${n}`, class: 'qr-svg', role: 'img', 'aria-label': 'QR-Code mit dem Link zum Lied', 'shape-rendering': 'crispEdges' },
    s('rect', { width: n, height: n, fill: '#fff' }),
    s('path', { d: qrPath(qr), fill: '#000' }),
  );
}

function copyText(text: string, area: HTMLTextAreaElement): Promise<boolean> {
  const fallback = () => {
    area.focus();
    area.select();
    try {
      return document.execCommand('copy');
    } catch {
      return false;
    }
  };
  const clip = navigator.clipboard;
  if (clip && clip.writeText) return clip.writeText(text).then(() => true, () => fallback());
  return Promise.resolve(fallback());
}

/** Eigenes Lied teilen (#/lied-teilen/<id>): Hinweis, QR-Code, Link. */
export const shareSong: View = (root, id) => {
  const own = ownSongs().find((o) => o.id === id);
  if (!own) {
    location.hash = '#/lieder';
    return;
  }
  const url = shareLink(encodeShare({ title: own.title, text: importSong(own.text).chordpro, meter: own.meter, bpm: own.bpm }));
  const svg = qrSvg(url);
  const area = h('textarea', { class: 'code share-link', rows: 3, readonly: true, 'aria-label': 'Link zum Lied' }) as HTMLTextAreaElement;
  area.value = url;
  const msg = h('p', { class: 'small', 'aria-live': 'polite' });
  const nav = navigator as Navigator & { share?: (d: { title?: string; url?: string }) => Promise<void> };
  screen(
    root,
    { title: 'Lied teilen', back: `#/lied/${own.id}`, theme: 'brass' },
    h(
      'div',
      { class: 'share-grid' },
      h(
        'section',
        { class: 'card share-hint' },
        h('h2', null, 'Bevor du teilst'),
        h('p', null, 'Teile nur Lieder, die du selbst erfunden hast oder die frei sind – zum Beispiel sehr alte Volkslieder.'),
        h('p', null, 'Lieder aus dem Internet sind nur für dich und deine Familie.'),
        h('p', { class: 'small' }, 'Das ganze Lied steckt im Link selbst. Es wird nirgends hochgeladen.'),
      ),
      svg
        ? h('section', { class: 'card share-qr' }, h('h2', null, own.title), svg, h('p', { class: 'small' }, 'Mit der Kamera eines anderen Tablets oder Handys abfotografieren.'))
        : h(
            'section',
            { class: 'card share-qr' },
            h('h2', null, own.title),
            h('p', null, 'Das Lied ist zu lang für einen QR-Code. Du kannst aber den Link schicken.'),
          ),
      h(
        'section',
        { class: 'card share-url' },
        h('h2', null, 'Link'),
        area,
        h(
          'div',
          { class: 'row' },
          button(h('span', null, icon('copy'), 'Link kopieren'), () => {
            void copyText(url, area).then((ok) => (msg.textContent = ok ? 'Kopiert! Jetzt kannst du ihn in eine Nachricht einfügen.' : 'Markiere den Link und kopiere ihn selbst.'));
          }, 'btn-primary'),
          nav.share
            ? button(h('span', null, icon('share'), 'Schicken …'), () => {
                nav.share!({ title: own.title, url }).catch(() => undefined);
              })
            : null,
        ),
        msg,
      ),
    ),
  );
};

/** Geschicktes Lied öffnen (#/teilen/<daten>): Vorschau und „Zu meinen Liedern hinzufügen“. */
export const receiveSong: View = (root, data) => {
  const shared = decodeShare(data);
  const song = shared ? ownToSong({ id: 'mein-geschickt', title: shared.title, text: shared.text, meter: shared.meter, bpm: shared.bpm, created: 0, updated: 0, shared: true }) : null;
  if (!shared || !song) {
    screen(
      root,
      { title: 'Geschicktes Lied', back: '#/lieder', theme: 'brass' },
      h(
        'section',
        { class: 'card' },
        h('h2', null, 'Dieser Link klappt leider nicht'),
        h('p', null, 'Vielleicht wurde er beim Kopieren abgeschnitten. Frag nach, ob man ihn dir noch einmal schicken kann.'),
        h('a', { class: 'btn btn-primary', href: '#/lieder' }, 'Zu den Liedern'),
      ),
    );
    return;
  }
  const same = ownSongs().filter((o) => o.title === shared.title && importSong(o.text).chordpro === importSong(shared.text).chordpro)[0];
  const msg = h('p', { class: 'own-msg', 'aria-live': 'polite', hidden: true });
  const add = () => {
    const now = Date.now();
    const id = newOwnId(shared.title, ownSongs().map((o) => o.id));
    const ok = putOwnSong({ id, title: shared.title, text: shared.text, meter: shared.meter, bpm: shared.bpm, created: now, updated: now, shared: true });
    if (!ok) {
      msg.textContent = 'Speichern hat nicht geklappt. Vielleicht ist der Browser im privaten Modus oder der Speicher ist voll.';
      msg.hidden = false;
      return;
    }
    location.hash = `#/lied/${id}`;
  };
  screen(
    root,
    { title: 'Geschicktes Lied', back: '#/lieder', theme: 'brass' },
    h(
      'div',
      { class: 'own-edit' },
      h(
        'section',
        { class: 'card' },
        h('h2', null, shared.title),
        h('p', null, 'Jemand hat dir dieses Lied geschickt.'),
        h('p', { class: 'small' }, `${meterLabel(shared.meter)} · ${shared.bpm} Schläge pro Minute`),
        importNotes(importSong(shared.text)),
        same ? h('p', null, 'Dieses Lied hast du schon.') : null,
        msg,
        h(
          'div',
          { class: 'row' },
          same
            ? h('a', { class: 'btn btn-primary', href: `#/lied/${same.id}` }, icon('play'), 'Spielen')
            : button(h('span', null, icon('plus'), 'Zu meinen Liedern hinzufügen'), add, 'btn-primary'),
          h('a', { class: 'btn', href: '#/lieder' }, same ? 'Zu den Liedern' : 'Nein, danke'),
        ),
      ),
      h('section', { class: 'card pv-card', 'aria-label': 'Vorschau' }, h('h2', null, 'Vorschau'), songPreview(song)),
    ),
  );
};
