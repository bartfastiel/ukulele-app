import { h, clear } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, button, ensureMic, type View } from '../ui/screen.ts';
import { chordDiagram } from '../ui/chord-diagram.ts';
import { plan, instructionText, parseFrets, type Take } from '../music/recording-plan.ts';
import { instrument } from '../music/instrument.ts';
import { CHORDS } from '../music/chords.ts';
import { STRINGS } from '../music/notes.ts';
import { audio } from '../audio/engine.ts';
import { openMic } from '../audio/mic.ts';
import { startRecording, type Recording } from '../audio/recorder.ts';
import { encodeWav, decodeWav } from '../audio/wav.ts';
import { makeZip } from '../util/zip.ts';
import { idbAll, idbClear, idbPut } from '../util/idb.ts';
import type { Chord } from '../music/chords.ts';
import { t, tp } from '../i18n.ts';
import { link } from '../site/nav.ts';
import { load } from '../store.ts';

/**
 * Aufnahmewerkzeug für Erwachsene: sammelt beschriftete Beispielaufnahmen (richtige Akkorde, typische Fehler,
 * Geräusche), mit denen sich die Akkorderkennung offline prüfen und verbessern lässt. Nichts wird hochgeladen –
 * am Ende gibt es eine ZIP-Datei zum Herunterladen oder Teilen.
 */

interface Stored {
  take: Take;
  note: string;
  sampleRate: number;
  wav: ArrayBuffer;
  recordedAt: string;
}

const SECONDS = 5;

function diagramFor(t: Take): SVGElement | null {
  if (!t.chord) return null;
  const frets = parseFrets(t.frets);
  const ch: Chord = { name: t.chord, frets, fingers: frets.map(() => 0), say: '', level: 0 };
  return chordDiagram(ch, { lefty: load().settings.lefty });
}

function fileName(index: number, s: Stored): string {
  const n = index + 1 < 10 ? `0${index + 1}` : String(index + 1);
  return `${n}-${s.take.id}.wav`.replace(/[^A-Za-z0-9._-]/g, '_');
}

export const record: View = (root) => {
  const PLAN = plan();
  const names = STRINGS.map((x) => x.name);
  let recording: Recording | null = null;
  let meterRaf = 0;
  let timer = 0;
  let idx = 0;
  const done = new Map<string, Stored>();
  const area = h('div', { class: 'rec-area' });
  const summary = h('div', { class: 'card rec-summary' });
  const shareMsg = h('p', { class: 'small', 'aria-live': 'polite' });

  const stopAll = () => {
    window.clearTimeout(timer);
    cancelAnimationFrame(meterRaf);
    if (recording) recording.stop();
    recording = null;
  };

  const renderSummary = () => {
    clear(summary);
    summary.appendChild(h('h2', null, t('{n} von {total} Aufnahmen', { n: done.size, total: PLAN.length })));
    summary.appendChild(
      h(
        'div',
        { class: 'rec-dots' },
        ...PLAN.map((x, i) =>
          h(
            'button',
            {
              type: 'button',
              class: `rec-dot${done.has(x.id) ? ' ok' : ''}${i === idx ? ' cur' : ''}`,
              'aria-label': t('Aufnahme {n}: {name}', { n: i + 1, name: x.chord || x.id }),
              onclick: () => {
                stopAll();
                idx = i;
                renderTake();
              },
            },
            String(i + 1),
          ),
        ),
      ),
    );
    const extra = Array.from(done.values()).filter((s) => s.take.id.indexOf('eigene-') === 0).length;
    if (extra) summary.appendChild(h('p', { class: 'small' }, tp(extra, 'plus {n} eigene Aufnahme', 'plus {n} eigene Aufnahmen')));
    summary.appendChild(
      h(
        'div',
        { class: 'row' },
        canShareFiles ? button(h('span', null, icon('next'), ' ', t('Teilen')), () => share(), 'btn-primary', done.size ? {} : { disabled: 'true' }) : null,
        button(h('span', null, icon('check'), ' ', t('ZIP herunterladen')), () => download(), canShareFiles ? '' : 'btn-primary', done.size ? {} : { disabled: 'true' }),
        button(t('Alles löschen'), () => {
          if (!window.confirm(t('Alle Aufnahmen auf diesem Gerät löschen?'))) return;
          void idbClear().then(() => {
            done.clear();
            idx = 0;
            renderTake();
          });
        }),
      ),
    );
    summary.appendChild(shareMsg);
  };

  const zipBytes = (): Uint8Array => {
    const list = Array.from(done.values()).sort((a, b) => (a.recordedAt < b.recordedAt ? -1 : 1));
    const files = list.map((s, i) => ({ name: fileName(i, s), data: new Uint8Array(s.wav) }));
    const meta = {
      app: instrument().club,
      instrument: instrument().id,
      createdAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
      takes: list.map((s, i) => ({
        file: files[i].name,
        id: s.take.id,
        chord: s.take.chord,
        frets: s.take.frets,
        technique: s.take.technique,
        correct: s.take.correct,
        instruction: s.take.instruction,
        note: s.note,
        sampleRate: s.sampleRate,
        recordedAt: s.recordedAt,
      })),
    };
    files.push({ name: 'takes.json', data: new TextEncoder().encode(JSON.stringify(meta, null, 2)) });
    return makeZip(files);
  };

  const zipFile = (): { blob: Blob; name: string } => {
    const d = new Date();
    const pad = (n: number) => (n < 10 ? '0' : '') + n;
    const name = `${instrument().id}-aufnahmen-${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}.zip`;
    return { blob: new Blob([zipBytes() as BlobPart], { type: 'application/zip' }), name };
  };

  const download = () => {
    const z = zipFile();
    const url = URL.createObjectURL(z.blob);
    const a = h('a', { href: url, download: z.name });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.setTimeout(() => URL.revokeObjectURL(url), 10000);
    shareMsg.textContent = t('Gespeichert als „{name}“ im Download-Ordner des Geräts.', { name: z.name });
  };

  type ShareNav = { canShare?: (d: { files: File[] }) => boolean; share?: (d: { files: File[]; title?: string }) => Promise<void> };
  const nav = navigator as unknown as ShareNav;
  const canShareFiles = typeof File !== 'undefined' && !!nav.share && !!nav.canShare;

  /** Teilen-Menü des Handys (Mail, Drive, Messenger …); manche Browser teilen keine ZIPs – dann Download. */
  const share = () => {
    const z = zipFile();
    const file = new File([z.blob], z.name, { type: 'application/zip' });
    if (!nav.canShare!({ files: [file] })) {
      shareMsg.textContent = t('Dieser Browser kann ZIP-Dateien nicht teilen – ich lade sie stattdessen herunter.');
      download();
      return;
    }
    nav.share!({ files: [file], title: z.name }).catch(() => undefined);
  };

  const save = (take: Take, note: string, samples: Float32Array, sampleRate: number) => {
    const wav = encodeWav(samples, sampleRate);
    const stored: Stored = { take, note, sampleRate, wav: wav.buffer as ArrayBuffer, recordedAt: new Date().toISOString() };
    done.set(take.id, stored);
    void idbPut(take.id, stored).catch(() => undefined);
  };

  const playBack = (s: Stored) => {
    const c = audio();
    const decoded = decodeWav(new Uint8Array(s.wav));
    const buf = c.createBuffer(1, decoded.samples.length, decoded.sampleRate);
    buf.getChannelData(0).set(decoded.samples);
    const src = c.createBufferSource();
    src.buffer = buf;
    src.connect(c.destination);
    src.start();
  };

  /** Countdown, dann SECONDS Sekunden aufnehmen; der Pegel wird live angezeigt. */
  const capture = (take: Take, note: () => string, status: HTMLElement, meter: HTMLElement, after: () => void) => {
    void ensureMic().then(async (ok) => {
      if (!ok) {
        status.textContent = t('Ohne Mikrofon geht die Aufnahme nicht.');
        return;
      }
      const mic = await openMic();
      let n = 3;
      const tick = () => {
        if (n > 0) {
          status.textContent = t('Gleich geht’s los … {n}', { n });
          n--;
          timer = window.setTimeout(tick, 700);
          return;
        }
        status.textContent = t('Aufnahme läuft – jetzt spielen!');
        status.className = 'feedback listening';
        const rec = startRecording(mic);
        recording = rec;
        const t0 = performance.now();
        let clipped = false;
        const draw = () => {
          const lv = rec.level();
          if (lv.peak > 0.98) clipped = true;
          meter.style.width = `${Math.min(100, Math.sqrt(lv.rms) * 220)}%`;
          meter.className = `meter-bar${lv.peak > 0.98 ? ' clip' : ''}`;
          const left = Math.max(0, SECONDS - (performance.now() - t0) / 1000);
          status.textContent = t('Aufnahme läuft – noch {s} s', { s: left.toFixed(1) });
          meterRaf = requestAnimationFrame(draw);
        };
        draw();
        timer = window.setTimeout(() => {
          cancelAnimationFrame(meterRaf);
          const samples = rec.stop();
          recording = null;
          save(take, note(), samples, mic.sampleRate);
          status.className = 'feedback good';
          status.textContent = clipped ? t('Gespeichert – aber übersteuert. Etwas weiter weg und nochmal?') : t('Gespeichert!');
          meter.style.width = '0%';
          after();
        }, SECONDS * 1000);
      };
      tick();
    });
  };

  const renderTake = () => {
    clear(area);
    renderSummary();
    if (idx >= PLAN.length) {
      renderCustom();
      return;
    }
    const take = PLAN[idx];
    const status = h('div', { class: 'feedback', 'aria-live': 'polite' }, done.has(take.id) ? t('Schon aufgenommen – du kannst sie wiederholen.') : t('Bereit.'));
    const meter = h('div', { class: 'meter-bar' });
    const diag = diagramFor(take);
    const next = () => {
      stopAll();
      idx++;
      renderTake();
    };
    const recBtn = button(h('span', null, icon('mic'), ' ', done.has(take.id) ? t('Nochmal aufnehmen') : t('Aufnehmen')), () => {
      recBtn.disabled = true;
      capture(take, () => '', status, meter, () => {
        recBtn.disabled = false;
        renderTake();
        // nach einem Moment automatisch zur nächsten Aufnahme, damit es zügig geht
        timer = window.setTimeout(next, 1200);
      });
    }, 'btn-primary btn-play');
    area.appendChild(
      h(
        'div',
        { class: 'rec-take' },
        h(
          'div',
          { class: `card rec-card${take.correct ? '' : ' wrong'}` },
          h('div', { class: 'card-label' }, t('Aufnahme {n} von {total}', { n: idx + 1, total: PLAN.length }) + (take.correct ? '' : ' · ' + t('absichtlich falsch'))),
          h('div', { class: 'chord-name' }, take.chord ? take.chord + (take.correct ? '' : ' (' + t('falsch') + ')') : t('Geräusch')),
          take.chord ? h('div', { class: 'say' }, t('Bünde {strings}: {frets}', { strings: names.join('-'), frets: take.frets })) : null,
          diag ? h('div', { class: 'diagram-big' }, diag) : null,
          h('p', { class: 'rec-instruction' }, instructionText(take)),
        ),
        h(
          'div',
          { class: 'rec-side' },
          recBtn,
          h('div', { class: 'meter' }, meter),
          status,
          h(
            'div',
            { class: 'row' },
            done.has(take.id) ? button(h('span', null, icon('sound'), ' ', t('Anhören')), () => playBack(done.get(take.id)!)) : null,
            button(h('span', null, icon('next'), ' ', t('Weiter')), next),
          ),
        ),
      ),
    );
  };

  const renderCustom = () => {
    const chordIn = h('input', { class: 'rec-input', placeholder: t('z. B. C'), 'aria-label': t('Akkord'), maxlength: 6 }) as HTMLInputElement;
    const example = (CHORDS[0].frets.map((f) => (f < 0 ? 'x' : String(f))).join(''));
    const fretsIn = h('input', {
      class: 'rec-input',
      placeholder: t('z. B. {frets} (x = gedämpft)', { frets: example }),
      'aria-label': t('Bünde {strings}', { strings: names.join(' ') }),
      maxlength: names.length,
    }) as HTMLInputElement;
    const noteIn = h('input', { class: 'rec-input wide', placeholder: t('Was ist passiert? z. B. „wurde gelobt, obwohl F gegriffen war“'), 'aria-label': t('Notiz') }) as HTMLInputElement;
    const correctIn = h('input', { type: 'checkbox', id: 'rec-correct' }) as HTMLInputElement;
    const status = h('div', { class: 'feedback', 'aria-live': 'polite' }, t('Alle geplanten Aufnahmen sind durch. Hier kannst du eigene hinzufügen – z. B. Fälle, in denen die App falsch gelobt hat.'));
    const meter = h('div', { class: 'meter-bar' });
    const recBtn = button(h('span', null, icon('mic'), ' ', t('Eigene Aufnahme')), () => {
      const frets = fretsIn.value.trim().toLowerCase();
      if (frets.length !== names.length || !/^[0-9x]+$/.test(frets)) {
        status.textContent = t('Bitte die Bünde als {n} Zeichen eingeben ({strings}), z. B. {frets}; x für gedämpft.', { n: names.length, strings: names.join(' '), frets: example });
        return;
      }
      const chordName = chordIn.value.trim() || null;
      const custom: Take = {
        id: `eigene-${Date.now().toString(36)}`,
        chord: chordName,
        frets,
        technique: 'strum',
        correct: correctIn.checked,
        instruction: noteIn.value.trim(),
      };
      recBtn.disabled = true;
      capture(custom, () => noteIn.value.trim(), status, meter, () => {
        recBtn.disabled = false;
        renderSummary();
      });
    }, 'btn-primary btn-play');
    area.appendChild(
      h(
        'div',
        { class: 'card rec-custom' },
        h('h2', null, t('Eigene Aufnahme')),
        h('label', null, t('Gewollter Akkord'), ' ', chordIn),
        h('label', null, t('Wirklich gespielt (Bünde {strings})', { strings: names.join(' ') }), ' ', fretsIn),
        h('label', { class: 'check' }, correctIn, ' ', t('Das war richtig gegriffen')),
        h('label', null, t('Notiz'), ' ', noteIn),
        recBtn,
        h('div', { class: 'meter' }, meter),
        status,
      ),
    );
  };

  screen(
    root,
    { title: t('Beispielaufnahmen'), back: link('sterne'), theme: 'pearl' },
    h(
      'p',
      { class: 'card rec-intro' },
      t('Für Erwachsene: je 5 Sekunden spielen, was angezeigt wird – auch absichtlich falsch.'),
      ' ',
      t('Bleibt auf dem Gerät, bis du es unten teilst oder herunterlädst.'),
    ),
    area,
    summary,
  );

  void idbAll<Stored>()
    .then((list) => {
      // Aufnahmen anderer Instrumente (andere Saitenzahl) gehören nicht in dieses Set
      list.forEach((s) => {
        if (s.take.frets.length === names.length) done.set(s.take.id, s);
      });
      const firstOpen = PLAN.findIndex((x) => !done.has(x.id));
      idx = firstOpen < 0 ? PLAN.length : firstOpen;
    })
    .catch(() => undefined)
    .then(renderTake);

  return stopAll;
};
