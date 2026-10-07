import { h, clear, announce } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, button, confirmDialog, type View } from '../ui/screen.ts';
import { importNotes, songPreview } from '../ui/song-preview.ts';
import { importSong, MAX_TEXT } from '../music/import.ts';
import { BPM_MAX, BPM_MIN, MAX_TITLE, METERS, cleanTitle, newOwnId, ownToSong, type OwnSong } from '../music/own-songs.ts';
import { ownSongs, putOwnSong, removeOwnSong } from '../store.ts';
import { t } from '../i18n.ts';
import { link, go } from '../site/nav.ts';

// eigener Beispieltext, kein fremdes Lied; der zweite Akkord steht über dem letzten Wort der Zeile
function placeholder(): string {
  const over = (a: string, b: string, line: string) => {
    const col = line.lastIndexOf(' ') + 1;
    return a + new Array(Math.max(2, col - a.length + 1)).join(' ') + b;
  };
  const one = t('Heute spiel ich Ukulele,');
  const two = t('und die Sonne lacht.');
  const inline = '[C]' + one.replace(/,$/, '').replace(/ (\S+)$/, ' [G7]$1');
  return [over('C', 'G7', one), one, over('G7', 'C', two), two, '', `${t('Oder so:')} ${inline} …`].join('\n');
}

/** Eigenes Lied anlegen (#/eigenes-lied) oder bearbeiten (#/eigenes-lied/<id>). */
export const ownSongEditor: View = (root, id) => {
  const existing = id ? ownSongs().find((o) => o.id === id) : undefined;
  if (id && !existing) {
    go('lieder');
    return;
  }
  let meter = existing ? existing.meter : 4;
  let bpm = existing ? existing.bpm : 90;

  const titleIn = h('input', {
    type: 'text',
    class: 'field',
    id: 'own-title',
    maxlength: MAX_TITLE,
    autocomplete: 'off',
    placeholder: t('Wie heißt dein Lied?'),
  }) as HTMLInputElement;
  titleIn.value = existing ? existing.title : '';
  const textIn = h('textarea', {
    class: 'field field-song',
    id: 'own-text',
    rows: 12,
    maxlength: MAX_TEXT,
    spellcheck: 'false',
    autocapitalize: 'off',
    autocomplete: 'off',
    wrap: 'off',
    placeholder: placeholder(),
  }) as HTMLTextAreaElement;
  textIn.value = existing ? existing.text : '';

  const segGroup = (label: string, options: { label: string; active: boolean; on: () => void }[]) =>
    h(
      'div',
      { class: 'seg seg-wrap', role: 'group', 'aria-label': label },
      ...options.map((o) => {
        const b = button(o.label, () => {
          o.on();
          Array.prototype.forEach.call(b.parentNode!.children, (c: Element) => c.setAttribute('aria-pressed', 'false'));
          b.setAttribute('aria-pressed', 'true');
        }, 'btn-seg', { 'aria-pressed': String(o.active) });
        return b;
      }),
    );
  const bpmLabel = h('span', { class: 'bpm-now', 'aria-live': 'polite' });
  const showBpm = () => (bpmLabel.textContent = t('{n} Schläge pro Minute', { n: bpm }));
  const stepBpm = (d: number) => {
    bpm = Math.max(BPM_MIN, Math.min(BPM_MAX, bpm + d));
    showBpm();
  };
  showBpm();

  const message = h('p', { class: 'own-msg', 'aria-live': 'polite', hidden: true });
  const say = (text: string) => {
    message.textContent = text;
    message.hidden = !text;
  };

  const preview = h('section', { class: 'card pv-card', 'aria-label': t('Vorschau') });
  const renderPreview = () => {
    const r = importSong(textIn.value);
    if (!titleIn.value.trim() && r.title) titleIn.value = cleanTitle(r.title);
    clear(preview);
    preview.appendChild(h('h2', null, t('Vorschau')));
    if (!textIn.value.trim()) {
      preview.appendChild(h('p', { class: 'small' }, t('Füge links (oder oben) deinen Liedtext mit Akkorden ein. Hier siehst du dann, wie er im Lied aussieht.')));
      return;
    }
    preview.appendChild(importNotes(r));
    const song = ownToSong({ id: 'mein-vorschau', title: titleIn.value || t('Vorschau'), text: textIn.value, meter, bpm, created: 0, updated: 0 });
    if (song) preview.appendChild(songPreview(song));
  };
  let timer = 0;
  textIn.addEventListener('input', () => {
    say('');
    window.clearTimeout(timer);
    timer = window.setTimeout(renderPreview, 200);
  });
  titleIn.addEventListener('input', () => say(''));
  renderPreview();

  const doSave = () => {
    const title = cleanTitle(titleIn.value);
    if (!title) {
      say(t('Wie heißt dein Lied? Schreib oben einen Titel hin.'));
      titleIn.focus();
      return;
    }
    const r = importSong(textIn.value);
    if (!r.chords.length) {
      say(t('Ich finde noch keine Akkorde. Schreib sie in eckige Klammern wie [C] oder in eine eigene Zeile über den Text.'));
      textIn.focus();
      return;
    }
    const now = Date.now();
    const song: OwnSong = existing
      ? { ...existing, title, text: textIn.value, meter, bpm, updated: now }
      : { id: newOwnId(title, ownSongs().map((o) => o.id)), title, text: textIn.value, meter, bpm, created: now, updated: now };
    if (!putOwnSong(song)) {
      say(t('Speichern hat nicht geklappt. Vielleicht ist der Browser im privaten Modus oder der Speicher ist voll.'));
      return;
    }
    announce(t('Gespeichert'));
    go(`lied/${song.id}`);
  };

  const doDelete = () => {
    if (!existing) return;
    void confirmDialog({
      title: t('Lied löschen?'),
      text: t('„{title}“ ist dann von diesem Gerät weg.', { title: existing.title }),
      yes: t('Ja, löschen'),
      no: t('Nein, behalten'),
      danger: true,
    }).then((yes) => {
      if (!yes) return;
      if (removeOwnSong(existing.id)) go('lieder');
      else say(t('Löschen hat nicht geklappt.'));
    });
  };

  const form = h(
    'section',
    { class: 'card own-form' },
    h('label', { class: 'field-label', for: 'own-title' }, t('Titel')),
    titleIn,
    h('label', { class: 'field-label', for: 'own-text' }, t('Liedtext mit Akkorden')),
    h('p', { class: 'small' }, t('Akkorde in eckigen Klammern wie [C]Text – oder jeder Akkord in einer eigenen Zeile genau über dem Wort. Ein Akkord gilt einen Takt lang.')),
    textIn,
    h('div', { class: 'field-label' }, t('Taktart')),
    segGroup(
      t('Taktart'),
      METERS.map((m) => ({ label: m.label, active: m.value === meter, on: () => ((meter = m.value), renderPreview()) })),
    ),
    h('div', { class: 'field-label' }, t('Tempo')),
    h(
      'div',
      { class: 'seg seg-bpm', role: 'group', 'aria-label': t('Tempo') },
      button('−', () => stepBpm(-5), 'btn-seg', { 'aria-label': t('Langsamer') }),
      bpmLabel,
      button('+', () => stepBpm(5), 'btn-seg', { 'aria-label': t('Schneller') }),
    ),
    message,
    h(
      'div',
      { class: 'row own-actions' },
      button(h('span', null, icon('check'), t('Speichern')), doSave, 'btn-primary'),
      existing ? h('a', { class: 'btn', href: link(`lied-teilen/${existing.id}`) }, icon('share'), t('Teilen')) : null,
      existing ? button(h('span', null, icon('trash'), t('Löschen')), doDelete) : null,
    ),
  );

  screen(
    root,
    { title: existing ? t('Lied bearbeiten') : t('Eigenes Lied'), back: existing ? link(`lied/${existing.id}`) : link('lieder'), theme: 'brass' },
    h('div', { class: 'own-edit' }, form, preview),
  );
  return () => window.clearTimeout(timer);
};
