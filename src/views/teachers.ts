import { h, s, clear } from '../ui/dom.ts';
import { screen, button, type View } from '../ui/screen.ts';
import { encodeQr, qrPath } from '../util/qr.ts';
import { SONGS } from '../music/songs.ts';
import { CATEGORIES } from '../music/song.ts';
import { instrument, notesOnly } from '../music/instrument.ts';
import { SITES } from '../site/sites.ts';
import { routePath } from '../site/routes.ts';
import { brand, link } from '../site/nav.ts';
import { lang, t } from '../i18n.ts';

/** So viele Lieder-QR-Codes passen neben die Notizen der Lehrkraft, ohne dass das Blatt auf eine zweite Seite rutscht. */
export const MAX_HANDOUT_SONGS = 4;

/** Öffentliche Adresse der Instrument-Seite, vom Build geschrieben (Vorschauen zeigen so auf die echte Seite). */
function publicBase(): string {
  const attr = document.documentElement.getAttribute('data-public');
  if (attr) return attr;
  return location.protocol + '//' + location.host + (document.documentElement.getAttribute('data-base') || '/');
}

/** Adresse einer Route, wie sie auf dem Blatt steht und im QR-Code steckt. */
export function publicLink(route: string): string {
  return publicBase() + routePath(route, lang(), () => false);
}

/** „https://ukulele.example.org/en/“ → „ukulele.example.org/en“: zum Abtippen ohne Schnörkel. */
export function shortUrl(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

/** Adresse mit Umbruchstellen nach jedem Punkt und Schrägstrich, statt mitten im Wort. */
function breakable(url: string): Node[] {
  const out: Node[] = [];
  let part = '';
  for (let i = 0; i < url.length; i++) {
    part += url.charAt(i);
    if ((url.charAt(i) === '.' || url.charAt(i) === '/') && i < url.length - 1) {
      out.push(document.createTextNode(part), h('wbr'));
      part = '';
    }
  }
  out.push(document.createTextNode(part));
  return out;
}

function instrumentName(): string {
  const id = document.documentElement.getAttribute('data-site');
  const def = SITES.filter((x) => x.id === id)[0];
  return def ? def.name[lang()] : t(instrument().name);
}

/** QR-Code als schlichtes SVG; null, wenn der Text nicht in `maxVersion` passt (kleine Codes bleiben gut lesbar). */
export function qrCode(text: string, cls: string, label: string, maxVersion?: number): SVGElement | null {
  const code = encodeQr(text, { ecl: 'M', maxVersion });
  if (!code) return null;
  const n = code.size + 8;
  return s(
    'svg',
    { viewBox: `0 0 ${n} ${n}`, class: cls, role: 'img', 'aria-label': label, 'shape-rendering': 'crispEdges' },
    s('rect', { width: n, height: n, fill: '#fff' }),
    s('path', { d: qrPath(code), fill: '#000' }),
  );
}

/** Schlichtes Zeichen fürs Blatt: Schallloch mit den Saiten des Instruments, nur Linien. */
function sheetLogo(): SVGElement {
  const n = instrument().strings.length;
  const lines: SVGElement[] = [];
  for (let i = 0; i < n; i++) {
    const x = 20 + (i - (n - 1) / 2) * (n > 5 ? 3.4 : 4.4);
    lines.push(s('line', { x1: x, y1: 2, x2: x, y2: 38, stroke: '#000', 'stroke-width': 1 }));
  }
  return s(
    'svg',
    { viewBox: '0 0 40 40', class: 'ho-logo', 'aria-hidden': 'true' },
    s('circle', { cx: 20, cy: 20, r: 12, fill: 'none', stroke: '#000', 'stroke-width': 1.4 }),
    s('circle', { cx: 20, cy: 20, r: 15, fill: 'none', stroke: '#000', 'stroke-width': 0.6 }),
    ...lines,
  );
}

function printIcon(): SVGElement {
  return s(
    'svg',
    { class: 'icon', viewBox: '0 0 24 24', 'aria-hidden': 'true', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' },
    s('path', { d: 'M7 9V3h10v6M7 18H4v-8h16v8h-3M7 14h10v7H7z' }),
  );
}

/** Die vier Schritte der täglichen 10 Minuten: Minuten, Was, Werkzeug. */
function dailySteps(): [number, string, string][] {
  return [
    [1, t('Stimmen'), 'stimmen'],
    [3, notesOnly() ? t('Töne finden im Ton-Spiel') : t('Griffwechsel mit zwei Akkorden'), 'spiel'],
    [4, t('Ein Lied mitspielen'), 'lieder'],
    [2, t('Rhythmus mit dem Metronom'), 'rhythmus'],
  ];
}

interface SheetState {
  group: string;
  note: string;
  songs: string[];
}

function writeLines(n: number): HTMLElement {
  const out = h('div', { class: 'ho-lines' });
  for (let i = 0; i < n; i++) out.appendChild(h('span', { class: 'ho-line' }));
  return out;
}

/** Das A4-Blatt: auf dem Bildschirm als Vorschau, beim Drucken allein. */
export function handoutSheet(state: SheetState): HTMLElement {
  const home = publicLink('');
  const big = qrCode(home, 'ho-qr-svg', t('QR-Code mit der Adresse der App'));
  const songs = state.songs.map((id) => SONGS.filter((x) => x.id === id)[0]).filter((x) => !!x);
  return h(
    'article',
    { class: 'handout', 'aria-label': t('Handout zum Ausdrucken') },
    h(
      'header',
      { class: 'ho-head' },
      sheetLogo(),
      h('div', { class: 'ho-brand' }, h('p', { class: 'ho-title' }, brand()), h('p', { class: 'ho-sub' }, t('Lernen, üben, mitspielen – kostenlos im Browser'))),
      h('p', { class: 'ho-group' }, h('span', { class: 'ho-label' }, t('Klasse:')), ' ', state.group ? h('strong', null, state.group) : h('span', { class: 'ho-blank' })),
    ),
    h(
      'div',
      { class: 'ho-top' },
      h('div', { class: 'ho-qr' }, big, h('p', { class: 'ho-url' }, ...breakable(shortUrl(home))), h('p', { class: 'ho-hint' }, t('Mit der Kamera scannen oder die Adresse eintippen'))),
      h(
        'div',
        { class: 'ho-intro' },
        h(
          'p',
          { class: 'ho-lead' },
          notesOnly()
            ? t('Lieder zum Mitspielen, Töne auf dem Hals, Stimmgerät und Basslinien. Die Begleitung wartet bei jedem Wechsel, bis du so weit bist.')
            : t('Lieder zum Mitspielen, Griffbilder, Stimmgerät und Rhythmus. Die Begleitung wartet bei jedem Akkordwechsel, bis du so weit bist.'),
        ),
        h('h2', { class: 'ho-h' }, t('So geht’s los')),
        h(
          'ol',
          { class: 'ho-steps' },
          h('li', null, h('span', { class: 'ho-num' }, '1'), h('span', null, t('Öffne die Seite: QR-Code scannen oder Adresse eintippen.'))),
          h('li', null, h('span', { class: 'ho-num' }, '2'), h('span', null, t('Stimmen: Zupf eine Saite an – die Nadel zeigt, ob sie zu hoch oder zu tief ist.'))),
          h('li', null, h('span', { class: 'ho-num' }, '3'), h('span', null, t('Such dir ein Lied aus, wähle „Wartet auf mich“ und spiel mit.'))),
        ),
      ),
    ),
    h(
      'div',
      { class: 'ho-cols' },
      h(
        'section',
        { class: 'ho-col' },
        h('h2', { class: 'ho-h' }, t('Für Eltern: Du musst selbst nicht spielen können')),
        h(
          'ul',
          { class: 'ho-list' },
          h('li', null, t('Jeden Tag 5 bis 10 Minuten, am besten zur selben Zeit.')),
          h('li', null, t('Zuhören und loben, was schon klappt – nicht verbessern.')),
          h('li', null, t('Die App prüft und wartet. Du musst keine Noten kennen.')),
          h('li', null, t('Lass dir zum Schluss ein Lied vorspielen und sing mit.')),
        ),
      ),
      h(
        'section',
        { class: 'ho-col' },
        h('h2', { class: 'ho-h' }, t('10 Minuten am Tag')),
        h('ol', { class: 'ho-plan' }, ...dailySteps().map((x) => h('li', null, h('span', { class: 'ho-min' }, t('{n} Min.', { n: x[0] })), h('span', null, x[1])))),
      ),
    ),
    h(
      'div',
      { class: 'ho-facts' },
      h(
        'section',
        { class: 'ho-box' },
        h('h2', { class: 'ho-h' }, t('Kein Konto, keine Werbung, keine Daten')),
        h('p', null, t('Keine Anmeldung, keine Cookies, kein Tracking. Fortschritt und eigene Lieder bleiben auf dem Gerät; das Mikrofon hört nur zu und nimmt nichts auf.')),
      ),
      h(
        'section',
        { class: 'ho-box' },
        h('h2', { class: 'ho-h' }, t('Läuft auf fast jedem Gerät')),
        h('p', null, t('Im Browser auf Tablet, Handy und Computer, ohne Installation – auch auf älteren iPads. Nach dem ersten Besuch klappt vieles auch offline.')),
      ),
    ),
    h(
      'section',
      { class: 'ho-teacher' },
      h('h2', { class: 'ho-h' }, t('Von deiner Lehrkraft')),
      h('p', { class: 'ho-homework' }, h('span', { class: 'ho-label' }, t('Hausaufgabe: Lektion')), ' ', h('span', { class: 'ho-blank ho-blank-short' })),
      h('div', { class: 'ho-note' }, state.note ? h('p', { class: 'ho-note-text' }, state.note) : writeLines(2)),
      h('p', { class: 'ho-label' }, t('Unsere Lieder:')),
      songs.length
        ? h(
            'div',
            { class: 'ho-songs' },
            ...songs.map((x) =>
              h('figure', { class: 'ho-song' }, qrCode(publicLink(`lied/${x.id}`), 'ho-song-qr', t('QR-Code zum Lied {title}', { title: x.title })), h('figcaption', null, x.title)),
            ),
          )
        : writeLines(3),
    ),
    h('footer', { class: 'ho-foot' }, h('span', null, t('Kostenlos, ohne Werbung, ohne Konto – Open Source.')), h('span', null, shortUrl(home))),
  );
}

function card(title: string, ...content: (Node | null)[]): HTMLElement {
  return h('section', { class: 'card article teach-card' }, h('h2', null, title), ...content);
}

function bullet(head: string, text: string): HTMLElement {
  return h('li', null, h('strong', null, head), ' ', text);
}

/** Seite für Lehrkräfte und Eltern: was die App kann, Datenschutz, Unterricht, Übungsplan – und ein Handout zum Drucken. */
export const teachers: View = (root) => {
  const bass = notesOnly();
  const inst = instrumentName();
  const state: SheetState = { group: '', note: '', songs: [] };
  const paper = h('div', { class: 'handout-paper' });
  const chosen = h('div', { class: 'handout-chosen', 'aria-live': 'polite' });
  const draw = () => {
    clear(paper);
    paper.appendChild(handoutSheet(state));
    clear(chosen);
    for (const id of state.songs) {
      const song = SONGS.filter((x) => x.id === id)[0];
      if (!song) continue;
      chosen.appendChild(
        button(h('span', null, '✕ ', song.title), () => {
          state.songs = state.songs.filter((x) => x !== id);
          draw();
        }, 'btn-chip handout-song-chip', { 'aria-label': t('{title} wieder entfernen', { title: song.title }) }),
      );
    }
    picker.disabled = state.songs.length >= MAX_HANDOUT_SONGS;
  };
  const group = h('input', { type: 'text', class: 'field handout-input', maxlength: 40, autocomplete: 'off', placeholder: t('z. B. 5b oder Montagsgruppe') }) as HTMLInputElement;
  group.addEventListener('input', () => {
    state.group = group.value.trim();
    draw();
  });
  const note = h('textarea', { class: 'field handout-input', rows: 3, maxlength: 200, placeholder: t('z. B. Bitte jeden Tag 10 Minuten üben, bis Freitag das erste Lied.') }) as HTMLTextAreaElement;
  note.addEventListener('input', () => {
    state.note = note.value.trim();
    draw();
  });
  const picker = h(
    'select',
    { class: 'field handout-input handout-picker' },
    h('option', { value: '' }, t('Lied hinzufügen …')),
    ...CATEGORIES.filter((c) => SONGS.some((x) => x.category === c.id)).map((c) =>
      h('optgroup', { label: t(c.title) }, ...SONGS.filter((x) => x.category === c.id).map((x) => h('option', { value: x.id }, x.title))),
    ),
  ) as HTMLSelectElement;
  picker.addEventListener('change', () => {
    const id = picker.value;
    picker.value = '';
    if (!id || state.songs.indexOf(id) >= 0 || state.songs.length >= MAX_HANDOUT_SONGS) return;
    state.songs.push(id);
    draw();
  });
  const tool = (route: string, label: string) => h('a', { href: link(route) }, label);
  const main = screen(
    root,
    { title: t('Für Lehrkräfte und Eltern'), back: link(''), theme: 'pearl' },
    card(
      t('Was die App kann'),
      h('p', null, t('Der {brand} ist eine kostenlose Übungs-App für {instrument}: gemacht für Kinder in Instrumentalklassen, ihre Lehrkräfte und Eltern.', { brand: brand(), instrument: inst })),
      h(
        'ul',
        null,
        h('li', null, bass ? t('Lieder mit Basstönen und Text als Karaoke. Die Begleitung wartet bei jedem Wechsel, bis das Kind so weit ist.') : t('Lieder mit Akkorden und Text als Karaoke. Die Begleitung wartet bei jedem Akkordwechsel, bis das Kind so weit ist.')),
        h('li', null, bass ? t('Alle Töne auf dem Hals – das Mikrofon prüft, ob der Ton stimmt.') : t('Griffbilder für alle wichtigen Akkorde – das Mikrofon prüft, ob ein Akkord sauber klingt.')),
        h('li', null, bass ? t('Stimmgerät, Metronom mit Basslinien, Ton-Spiel und Walking Bass im Blues.') : t('Stimmgerät, Metronom mit Schlagmustern, Akkord-Spiel und 12-Takt-Blues mit Band.')),
        h('li', null, t('Sterne und ein Kalender der Übungstage – gespeichert nur auf dem Gerät.')),
        h('li', null, t('Eigene Lieder eingeben und per Link oder QR-Code an die Klasse weitergeben.')),
      ),
      h('a', { class: 'btn btn-primary article-tool', href: '#handout' }, printIcon(), ' ', t('Zum Handout zum Ausdrucken')),
    ),
    card(
      t('Schul- und datenschutzfreundlich'),
      h(
        'ul',
        null,
        bullet(t('Kein Konto:'), t('keine Anmeldung, keine E-Mail-Adresse, keine Klassenverwaltung. Für den Unterricht müssen keine Schülerdaten angelegt oder weitergegeben werden.')),
        bullet(t('Keine Werbung, kein Tracking:'), t('keine Käufe in der App, keine Cookies, keine Statistik-Dienste.')),
        bullet(t('Alles bleibt auf dem Gerät:'), t('Sterne, Einstellungen und eigene Lieder liegen nur im Speicher des Browsers. Das Mikrofon wird nur auf dem Gerät ausgewertet und nie aufgezeichnet.')),
        bullet(t('Auch ohne Mikrofon:'), t('Wer das Mikrofon nicht freigeben möchte, tippt selbst auf „Geschafft“.')),
        bullet(t('Offen und kostenlos:'), t('kein Abo, der Quelltext ist öffentlich (Open Source).')),
      ),
      h('p', null, tool('datenschutz', t('Datenschutzerklärung')) as Node),
    ),
    card(
      t('Läuft auf fast jedem Gerät'),
      h(
        'ul',
        null,
        h('li', null, t('Im Browser auf Tablet, Handy und Computer – ohne Installation und ohne Freigabe durch die Geräteverwaltung der Schule.')),
        h('li', null, t('Auch auf älteren iPads (ab iOS 12), die keine neuen Apps mehr installieren können.')),
        h('li', null, t('Nach dem ersten Besuch auch offline: Stimmgerät, Rhythmus und alle schon einmal geöffneten Lieder funktionieren dann ohne Internet.')),
        h('li', null, t('Tipp: Über „Zum Home-Bildschirm“ im Menü des Browsers liegt die App wie jede andere auf dem Startbildschirm.')),
      ),
    ),
    card(
      t('Im Unterricht'),
      h(
        'ul',
        null,
        h('li', null, t('Zu Beginn der Stunde stimmen: Das Stimmgerät erkennt die Saite und hilft, wenn jemand am Wirbel der Nachbarsaite dreht.')),
        h('li', null, t('Jedes Lied hat eine eigene Adresse. Auf dem Handout unten erscheinen ausgewählte Lieder als QR-Code – die Kinder landen direkt beim Lied.')),
        h('li', null, t('Eigene oder gemeinfreie Lieder gibst du unter „Eigenes Lied“ ein und teilst sie per QR-Code. Das Lied steckt im Link selbst, nichts wird hochgeladen.'), ' ', tool('eigenes-lied', t('Eigenes Lied anlegen'))),
        h('li', null, bass ? t('Hausaufgaben konkret machen: „Jeden Tag einmal das Lied im Modus ‚Wartet auf mich‘ und eine Minute Ton-Spiel.“') : t('Hausaufgaben konkret machen: „Jeden Tag einmal das Lied im Modus ‚Wartet auf mich‘ und eine Minute Akkord-Spiel mit zwei Akkorden.“')),
        h('li', null, t('Am Beamer oder Whiteboard sehen alle dieselbe Liedzeile; mit Lautsprecher hört die ganze Klasse die Begleitung.')),
      ),
    ),
    card(
      t('Für Eltern: Du musst selbst nicht spielen können'),
      h('p', null, t('So hilfst du deinem Kind, auch ohne Noten zu kennen:')),
      h(
        'ul',
        null,
        bullet(t('Kurz und regelmäßig:'), t('lieber jeden Tag 5 bis 10 Minuten als einmal in der Woche eine Stunde. Ein fester Zeitpunkt erspart Diskussionen.')),
        bullet(t('Zuhören statt verbessern:'), t('Lass dir vorspielen und lobe, was schon klappt – und dass dein Kind drangeblieben ist.')),
        bullet(t('Die App prüft:'), t('Die Begleitung wartet, das Mikrofon hört mit, es gibt Sterne. Du musst nicht wissen, ob alles stimmt.')),
        bullet(t('Mitbestimmen lassen:'), t('Dein Kind sucht sich das nächste Lied selbst aus.')),
        bullet(t('Mitsingen und mitklatschen:'), t('Gemeinsam Musik machen ist die schönste Belohnung.')),
        bullet(t('Pausen sind in Ordnung:'), t('Tun die Finger weh oder ist die Luft raus, hilft ein Lieblingslied mehr als jede Ermahnung.')),
      ),
    ),
    card(
      t('Übungsplan: 10 Minuten am Tag'),
      h('p', null, t('Immer in derselben Reihenfolge – so weiß dein Kind, was kommt:')),
      h('ol', null, ...dailySteps().map((x) => h('li', null, h('strong', null, t('{n} Min.', { n: x[0] })), ' ', tool(x[2], x[1])))),
      h('p', { class: 'small' }, t('Nichts davon wird gespeichert oder kontrolliert – der Plan ist nur ein Vorschlag.')),
    ),
    h(
      'section',
      { class: 'card handout-tool', id: 'handout' },
      h(
        'div',
        { class: 'handout-controls' },
        h('h2', null, t('Handout zum Ausdrucken')),
        h('p', null, t('Ein A4-Blatt für Kinder und Eltern: QR-Code zur App, die ersten Schritte, Tipps fürs Üben und Platz für deine Hinweise. Was du hier eintippst, kommt nur auf das Blatt und wird nicht gespeichert.')),
        h('label', { class: 'handout-field' }, h('span', { class: 'field-label' }, t('Klasse oder Gruppe (freiwillig)')), group),
        h('label', { class: 'handout-field' }, h('span', { class: 'field-label' }, t('Hinweis für Kinder und Eltern (freiwillig)')), note),
        h('label', { class: 'handout-field' }, h('span', { class: 'field-label' }, t('Lieder als QR-Code (bis zu {n})', { n: MAX_HANDOUT_SONGS })), picker),
        chosen,
        h(
          'div',
          { class: 'row' },
          button(h('span', null, printIcon(), ' ', t('Drucken')), () => window.print(), 'btn-primary handout-print'),
        ),
        h('p', { class: 'small' }, t('Tipp: Im Druckdialog A4 und Hochformat wählen. Ohne Eintrag bleiben Linien zum Ausfüllen mit dem Stift.')),
      ),
      paper,
    ),
  );
  // langer Titel: lieber umbrechen als abschneiden
  const head = root.childNodes[0];
  const title = head ? (head.childNodes[1] as Element | undefined) : undefined;
  if (title) title.setAttribute('class', 'wrap');
  void main;
  draw();
};
