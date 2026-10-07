import { h, clear, announce } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, button, confirmDialog, type View } from '../ui/screen.ts';
import { importNotes, songPreview } from '../ui/song-preview.ts';
import { importSong, MAX_TEXT } from '../music/import.ts';
import { BPM_MAX, BPM_MIN, MAX_TITLE, METERS, cleanTitle, newOwnId, ownToSong, type OwnSong } from '../music/own-songs.ts';
import { ownSongs, putOwnSong, removeOwnSong } from '../store.ts';

// eigener Beispieltext, kein fremdes Lied
const PLACEHOLDER = `C              G7
Heute spiel ich Ukulele,
G7           C
und die Sonne lacht.

Oder so: [C]Heute spiel ich [G7]Ukulele …`;

/** Eigenes Lied anlegen (#/eigenes-lied) oder bearbeiten (#/eigenes-lied/<id>). */
export const ownSongEditor: View = (root, id) => {
  const existing = id ? ownSongs().find((o) => o.id === id) : undefined;
  if (id && !existing) {
    location.hash = '#/lieder';
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
    placeholder: 'Wie heißt dein Lied?',
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
    placeholder: PLACEHOLDER,
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
  const showBpm = () => (bpmLabel.textContent = `${bpm} Schläge pro Minute`);
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

  const preview = h('section', { class: 'card pv-card', 'aria-label': 'Vorschau' });
  const renderPreview = () => {
    const r = importSong(textIn.value);
    if (!titleIn.value.trim() && r.title) titleIn.value = cleanTitle(r.title);
    clear(preview);
    preview.appendChild(h('h2', null, 'Vorschau'));
    if (!textIn.value.trim()) {
      preview.appendChild(h('p', { class: 'small' }, 'Füge links (oder oben) deinen Liedtext mit Akkorden ein. Hier siehst du dann, wie er im Lied aussieht.'));
      return;
    }
    preview.appendChild(importNotes(r));
    const song = ownToSong({ id: 'mein-vorschau', title: titleIn.value || 'Vorschau', text: textIn.value, meter, bpm, created: 0, updated: 0 });
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
      say('Wie heißt dein Lied? Schreib oben einen Titel hin.');
      titleIn.focus();
      return;
    }
    const r = importSong(textIn.value);
    if (!r.chords.length) {
      say('Ich finde noch keine Akkorde. Schreib sie in eckige Klammern wie [C] oder in eine eigene Zeile über den Text.');
      textIn.focus();
      return;
    }
    const now = Date.now();
    const song: OwnSong = existing
      ? { ...existing, title, text: textIn.value, meter, bpm, updated: now }
      : { id: newOwnId(title, ownSongs().map((o) => o.id)), title, text: textIn.value, meter, bpm, created: now, updated: now };
    if (!putOwnSong(song)) {
      say('Speichern hat nicht geklappt. Vielleicht ist der Browser im privaten Modus oder der Speicher ist voll.');
      return;
    }
    announce('Gespeichert');
    location.hash = `#/lied/${song.id}`;
  };

  const doDelete = () => {
    if (!existing) return;
    void confirmDialog({
      title: 'Lied löschen?',
      text: `„${existing.title}“ ist dann von diesem Gerät weg.`,
      yes: 'Ja, löschen',
      no: 'Nein, behalten',
      danger: true,
    }).then((yes) => {
      if (!yes) return;
      if (removeOwnSong(existing.id)) location.hash = '#/lieder';
      else say('Löschen hat nicht geklappt.');
    });
  };

  const form = h(
    'section',
    { class: 'card own-form' },
    h('label', { class: 'field-label', for: 'own-title' }, 'Titel'),
    titleIn,
    h('label', { class: 'field-label', for: 'own-text' }, 'Liedtext mit Akkorden'),
    h('p', { class: 'small' }, 'Akkorde in eckigen Klammern wie [C]Text – oder jeder Akkord in einer eigenen Zeile genau über dem Wort. Ein Akkord gilt einen Takt lang.'),
    textIn,
    h('div', { class: 'field-label' }, 'Taktart'),
    segGroup(
      'Taktart',
      METERS.map((m) => ({ label: m.label, active: m.value === meter, on: () => ((meter = m.value), renderPreview()) })),
    ),
    h('div', { class: 'field-label' }, 'Tempo'),
    h(
      'div',
      { class: 'seg seg-bpm', role: 'group', 'aria-label': 'Tempo' },
      button('−', () => stepBpm(-5), 'btn-seg', { 'aria-label': 'Langsamer' }),
      bpmLabel,
      button('+', () => stepBpm(5), 'btn-seg', { 'aria-label': 'Schneller' }),
    ),
    message,
    h(
      'div',
      { class: 'row own-actions' },
      button(h('span', null, icon('check'), 'Speichern'), doSave, 'btn-primary'),
      existing ? h('a', { class: 'btn', href: `#/lied-teilen/${existing.id}` }, icon('share'), 'Teilen') : null,
      existing ? button(h('span', null, icon('trash'), 'Löschen'), doDelete) : null,
    ),
  );

  screen(
    root,
    { title: existing ? 'Lied bearbeiten' : 'Eigenes Lied', back: existing ? `#/lied/${existing.id}` : '#/lieder', theme: 'brass' },
    h('div', { class: 'own-edit' }, form, preview),
  );
  return () => window.clearTimeout(timer);
};
