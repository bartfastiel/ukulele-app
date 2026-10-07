import { h, s } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, button, type View } from '../ui/screen.ts';
import { importNotes, songPreview } from '../ui/song-preview.ts';
import { importSong } from '../music/import.ts';
import { METERS, decodeShare, encodeShare, newOwnId, ownToSong } from '../music/own-songs.ts';
import { encodeQr, qrPath } from '../util/qr.ts';
import { ownSongs, putOwnSong } from '../store.ts';
import { t } from '../i18n.ts';
import { link, go } from '../site/nav.ts';

/** Größte QR-Version, die auf einem Bildschirm noch zuverlässig abfotografiert werden kann. */
const MAX_QR_VERSION = 25;

function meterLabel(m: number): string {
  const found = METERS.filter((x) => x.value === m)[0];
  return found ? found.label : `${m}/4`;
}

/** Link zum Lied: alles steckt im Fragment hinter „#“ – das schickt der Browser nie an den Server. */
export function shareLink(data: string): string {
  return location.protocol + '//' + location.host + link(`teilen/${data}`);
}

function qrSvg(text: string): SVGElement | null {
  const qr = encodeQr(text, { maxVersion: MAX_QR_VERSION });
  if (!qr) return null;
  const n = qr.size + 8;
  return s(
    'svg',
    { viewBox: `0 0 ${n} ${n}`, class: 'qr-svg', role: 'img', 'aria-label': t('QR-Code mit dem Link zum Lied'), 'shape-rendering': 'crispEdges' },
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
    go('lieder');
    return;
  }
  const url = shareLink(encodeShare({ title: own.title, text: importSong(own.text).chordpro, meter: own.meter, bpm: own.bpm }));
  const svg = qrSvg(url);
  const area = h('textarea', { class: 'code share-link', rows: 3, readonly: true, 'aria-label': t('Link zum Lied') }) as HTMLTextAreaElement;
  area.value = url;
  const msg = h('p', { class: 'small', 'aria-live': 'polite' });
  const nav = navigator as Navigator & { share?: (d: { title?: string; url?: string }) => Promise<void> };
  screen(
    root,
    { title: t('Lied teilen'), back: link(`lied/${own.id}`), theme: 'brass' },
    h(
      'div',
      { class: 'share-grid' },
      h(
        'section',
        { class: 'card share-hint' },
        h('h2', null, t('Bevor du teilst')),
        h('p', null, t('Teile nur Lieder, die du selbst erfunden hast oder die frei sind – zum Beispiel sehr alte Volkslieder.')),
        h('p', null, t('Lieder aus dem Internet sind nur für dich und deine Familie.')),
        h('p', { class: 'small' }, t('Das ganze Lied steckt im Link selbst. Es wird nirgends hochgeladen.')),
      ),
      svg
        ? h('section', { class: 'card share-qr' }, h('h2', null, own.title), svg, h('p', { class: 'small' }, t('Mit der Kamera eines anderen Tablets oder Handys abfotografieren.')))
        : h(
            'section',
            { class: 'card share-qr' },
            h('h2', null, own.title),
            h('p', null, t('Das Lied ist zu lang für einen QR-Code. Du kannst aber den Link schicken.')),
          ),
      h(
        'section',
        { class: 'card share-url' },
        h('h2', null, t('Link')),
        area,
        h(
          'div',
          { class: 'row' },
          button(h('span', null, icon('copy'), t('Link kopieren')), () => {
            void copyText(url, area).then((ok) => (msg.textContent = ok ? t('Kopiert! Jetzt kannst du ihn in eine Nachricht einfügen.') : t('Markiere den Link und kopiere ihn selbst.')));
          }, 'btn-primary'),
          nav.share
            ? button(h('span', null, icon('share'), t('Schicken …')), () => {
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
      { title: t('Geschicktes Lied'), back: link('lieder'), theme: 'brass' },
      h(
        'section',
        { class: 'card' },
        h('h2', null, t('Dieser Link klappt leider nicht')),
        h('p', null, t('Vielleicht wurde er beim Kopieren abgeschnitten. Frag nach, ob man ihn dir noch einmal schicken kann.')),
        h('a', { class: 'btn btn-primary', href: link('lieder') }, t('Zu den Liedern')),
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
      msg.textContent = t('Speichern hat nicht geklappt. Vielleicht ist der Browser im privaten Modus oder der Speicher ist voll.');
      msg.hidden = false;
      return;
    }
    go(`lied/${id}`);
  };
  screen(
    root,
    { title: t('Geschicktes Lied'), back: link('lieder'), theme: 'brass' },
    h(
      'div',
      { class: 'own-edit' },
      h(
        'section',
        { class: 'card' },
        h('h2', null, shared.title),
        h('p', null, t('Jemand hat dir dieses Lied geschickt.')),
        h('p', { class: 'small' }, `${meterLabel(shared.meter)} · ${t('{n} Schläge pro Minute', { n: shared.bpm })}`),
        importNotes(importSong(shared.text)),
        same ? h('p', null, t('Dieses Lied hast du schon.')) : null,
        msg,
        h(
          'div',
          { class: 'row' },
          same
            ? h('a', { class: 'btn btn-primary', href: link(`lied/${same.id}`) }, icon('play'), t('Spielen'))
            : button(h('span', null, icon('plus'), t('Zu meinen Liedern hinzufügen')), add, 'btn-primary'),
          h('a', { class: 'btn', href: link('lieder') }, same ? t('Zu den Liedern') : t('Nein, danke')),
        ),
      ),
      h('section', { class: 'card pv-card', 'aria-label': t('Vorschau') }, h('h2', null, t('Vorschau')), songPreview(song)),
    ),
  );
};
