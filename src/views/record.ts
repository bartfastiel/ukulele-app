import { h, clear } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, button, ensureMic, type View } from '../ui/screen.ts';
import { chordDiagram } from '../ui/chord-diagram.ts';
import { PLAN, parseFrets, type Take } from '../music/recording-plan.ts';
import { audio } from '../audio/engine.ts';
import { openMic } from '../audio/mic.ts';
import { startRecording, type Recording } from '../audio/recorder.ts';
import { encodeWav, decodeWav } from '../audio/wav.ts';
import { makeZip } from '../util/zip.ts';
import { idbAll, idbClear, idbPut } from '../util/idb.ts';
import type { Chord } from '../music/chords.ts';

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
  const ch = { name: t.chord, frets, fingers: [0, 0, 0, 0], say: '', level: 0 } as unknown as Chord;
  return chordDiagram(ch);
}

function fileName(index: number, s: Stored): string {
  const n = index + 1 < 10 ? `0${index + 1}` : String(index + 1);
  return `${n}-${s.take.id}.wav`.replace(/[^A-Za-z0-9._-]/g, '_');
}

export const record: View = (root) => {
  let recording: Recording | null = null;
  let meterRaf = 0;
  let timer = 0;
  let idx = 0;
  const done = new Map<string, Stored>();
  const area = h('div', { class: 'rec-area' });
  const summary = h('div', { class: 'card rec-summary' });

  const stopAll = () => {
    window.clearTimeout(timer);
    cancelAnimationFrame(meterRaf);
    if (recording) recording.stop();
    recording = null;
  };

  const renderSummary = () => {
    clear(summary);
    summary.appendChild(h('h2', null, `${done.size} von ${PLAN.length} Aufnahmen`));
    summary.appendChild(
      h(
        'div',
        { class: 'rec-dots' },
        ...PLAN.map((t, i) =>
          h(
            'button',
            {
              type: 'button',
              class: `rec-dot${done.has(t.id) ? ' ok' : ''}${i === idx ? ' cur' : ''}`,
              'aria-label': `Aufnahme ${i + 1}: ${t.chord || t.id}`,
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
    if (extra) summary.appendChild(h('p', { class: 'small' }, `plus ${extra} eigene Aufnahme(n)`));
    summary.appendChild(
      h(
        'div',
        { class: 'row' },
        button(h('span', null, icon('check'), ' ZIP herunterladen'), () => download(), 'btn-primary', done.size ? {} : { disabled: 'true' }),
        button('Alles löschen', () => {
          if (!window.confirm('Alle Aufnahmen auf diesem Gerät löschen?')) return;
          void idbClear().then(() => {
            done.clear();
            idx = 0;
            renderTake();
          });
        }),
      ),
    );
  };

  const zipBytes = (): Uint8Array => {
    const list = Array.from(done.values()).sort((a, b) => (a.recordedAt < b.recordedAt ? -1 : 1));
    const files = list.map((s, i) => ({ name: fileName(i, s), data: new Uint8Array(s.wav) }));
    const meta = {
      app: 'Ukulele-Club',
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

  const download = () => {
    const bytes = zipBytes();
    const d = new Date();
    const pad = (n: number) => (n < 10 ? '0' : '') + n;
    const name = `ukulele-aufnahmen-${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}.zip`;
    const blob = new Blob([bytes as BlobPart], { type: 'application/zip' });
    const nav = navigator as unknown as { canShare?: (d: { files: File[] }) => boolean; share?: (d: { files: File[] }) => Promise<void> };
    // iPad: Teilen-Menü (AirDrop, Dateien, Mail) ist bequemer als ein Download
    if (typeof File !== 'undefined' && nav.canShare && nav.share && /iPad|iPhone|Macintosh/.test(navigator.userAgent) && 'ontouchend' in document) {
      const file = new File([blob], name, { type: 'application/zip' });
      if (nav.canShare({ files: [file] })) {
        nav.share({ files: [file] }).catch(() => undefined);
        return;
      }
    }
    const url = URL.createObjectURL(blob);
    const a = h('a', { href: url, download: name });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.setTimeout(() => URL.revokeObjectURL(url), 10000);
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
        status.textContent = 'Ohne Mikrofon geht die Aufnahme nicht.';
        return;
      }
      const mic = await openMic();
      let n = 3;
      const tick = () => {
        if (n > 0) {
          status.textContent = `Gleich geht’s los … ${n}`;
          n--;
          timer = window.setTimeout(tick, 700);
          return;
        }
        status.textContent = 'Aufnahme läuft – jetzt spielen!';
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
          status.textContent = `Aufnahme läuft – noch ${left.toFixed(1)} s`;
          meterRaf = requestAnimationFrame(draw);
        };
        draw();
        timer = window.setTimeout(() => {
          cancelAnimationFrame(meterRaf);
          const samples = rec.stop();
          recording = null;
          save(take, note(), samples, mic.sampleRate);
          status.className = 'feedback good';
          status.textContent = clipped ? 'Gespeichert – aber übersteuert. Etwas weiter weg und nochmal?' : 'Gespeichert!';
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
    const t = PLAN[idx];
    const status = h('div', { class: 'feedback', 'aria-live': 'polite' }, done.has(t.id) ? 'Schon aufgenommen – du kannst sie wiederholen.' : 'Bereit.');
    const meter = h('div', { class: 'meter-bar' });
    const diag = diagramFor(t);
    const next = () => {
      stopAll();
      idx++;
      renderTake();
    };
    const recBtn = button(h('span', null, icon('mic'), done.has(t.id) ? ' Nochmal aufnehmen' : ' Aufnehmen'), () => {
      recBtn.disabled = true;
      capture(t, () => '', status, meter, () => {
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
          { class: `card rec-card${t.correct ? '' : ' wrong'}` },
          h('div', { class: 'card-label' }, `Aufnahme ${idx + 1} von ${PLAN.length}${t.correct ? '' : ' · absichtlich falsch'}`),
          h('div', { class: 'chord-name' }, t.chord ? `${t.chord}${t.correct ? '' : ' (falsch)'}` : 'Geräusch'),
          t.chord ? h('div', { class: 'say' }, `Bünde G-C-E-A: ${t.frets}`) : null,
          diag ? h('div', { class: 'diagram-big' }, diag) : null,
          h('p', { class: 'rec-instruction' }, t.instruction),
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
            done.has(t.id) ? button(h('span', null, icon('sound'), ' Anhören'), () => playBack(done.get(t.id)!)) : null,
            button(h('span', null, icon('next'), ' Weiter'), next),
          ),
        ),
      ),
    );
  };

  const renderCustom = () => {
    const chordIn = h('input', { class: 'rec-input', placeholder: 'z. B. C', 'aria-label': 'Akkord', maxlength: 6 }) as HTMLInputElement;
    const fretsIn = h('input', { class: 'rec-input', placeholder: 'z. B. 0003 (x = gedämpft)', 'aria-label': 'Bünde G C E A', maxlength: 4 }) as HTMLInputElement;
    const noteIn = h('input', { class: 'rec-input wide', placeholder: 'Was ist passiert? z. B. „wurde gelobt, obwohl F gegriffen war“', 'aria-label': 'Notiz' }) as HTMLInputElement;
    const correctIn = h('input', { type: 'checkbox', id: 'rec-correct' }) as HTMLInputElement;
    const status = h('div', { class: 'feedback', 'aria-live': 'polite' }, 'Alle geplanten Aufnahmen sind durch. Hier kannst du eigene hinzufügen – z. B. Fälle, in denen die App falsch gelobt hat.');
    const meter = h('div', { class: 'meter-bar' });
    const recBtn = button(h('span', null, icon('mic'), ' Eigene Aufnahme'), () => {
      const frets = fretsIn.value.trim().toLowerCase();
      if (!/^[0-9x]{4}$/.test(frets)) {
        status.textContent = 'Bitte die Bünde als vier Zeichen eingeben (G C E A), z. B. 0003 oder 2010; x für gedämpft.';
        return;
      }
      const chordName = chordIn.value.trim() || null;
      const t: Take = {
        id: `eigene-${Date.now().toString(36)}`,
        chord: chordName,
        frets,
        technique: 'strum',
        correct: correctIn.checked,
        instruction: noteIn.value.trim(),
      };
      recBtn.disabled = true;
      capture(t, () => noteIn.value.trim(), status, meter, () => {
        recBtn.disabled = false;
        renderSummary();
      });
    }, 'btn-primary btn-play');
    area.appendChild(
      h(
        'div',
        { class: 'card rec-custom' },
        h('h2', null, 'Eigene Aufnahme'),
        h('label', null, 'Gewollter Akkord ', chordIn),
        h('label', null, 'Wirklich gespielt (Bünde G C E A) ', fretsIn),
        h('label', { class: 'check' }, correctIn, ' Das war richtig gegriffen'),
        h('label', null, 'Notiz ', noteIn),
        recBtn,
        h('div', { class: 'meter' }, meter),
        status,
      ),
    );
  };

  screen(
    root,
    { title: 'Aufnahmen für die Erkennung', back: '#/sterne', theme: 'pearl' },
    h(
      'p',
      { class: 'card rec-intro' },
      'Für Erwachsene: Hier nimmst du Beispiel-Akkorde auf – richtige, absichtlich falsche und Geräusche. ',
      'Jede Aufnahme dauert 5 Sekunden. Am Ende lädst du alles als ZIP herunter. Nichts wird hochgeladen; ',
      'die Aufnahmen bleiben bis zum Löschen auf diesem Gerät gespeichert.',
    ),
    area,
    summary,
  );

  void idbAll<Stored>()
    .then((list) => {
      list.forEach((s) => done.set(s.take.id, s));
      const firstOpen = PLAN.findIndex((t) => !done.has(t.id));
      idx = firstOpen < 0 ? PLAN.length : firstOpen;
    })
    .catch(() => undefined)
    .then(renderTake);

  return stopAll;
};
