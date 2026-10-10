import { h, clear, announce } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { screen, button, ensureMic, keepAwake, type View } from '../ui/screen.ts';
import { playableChord } from '../ui/chord-play.ts';
import { openMic } from '../audio/mic.ts';
import { hearingOwnSound } from '../audio/own-sound.ts';
import { dbToLinear, holdSpectrum, instrumentPeaks } from '../audio/chord-detect.ts';
import { identifyFingering, libraryName, nameChord, noteLabel, positions, singleNote, PREFER } from '../music/identify.ts';
import { NOTE_NAMES, STRINGS, pitchClass } from '../music/notes.ts';
import type { Chord } from '../music/chords.ts';
import { load } from '../store.ts';
import { instrument } from '../music/instrument.ts';
import { lang, noteText, ordinal, t } from '../i18n.ts';
import { link } from '../site/nav.ts';

/** Im Französischen ohne Oktavzahl: dort zählt man die Oktaven anders (C4 = Do3). */
function noteShown(midi: number): string {
  return lang() === 'fr' ? noteText(NOTE_NAMES[pitchClass(midi)]) : noteLabel(midi);
}

/** „E-Saite“; doppelte Namen (Banjo: zwei D-Saiten) mit Zusatz „D-Saite (tief)“. */
function stringText(i: number): string {
  const st = STRINGS[i];
  return st.hint ? t('{s}-Saite ({hint})', { s: st.name, hint: t(st.hint) }) : t('{s}-Saite', { s: st.name });
}

/** Akkord-Detektiv: irgendetwas spielen – die App zeigt Griff, Namen, Art und Töne. */
export const detective: View = (root) => {
  const lefty = load().settings.lefty;
  let timer = 0;
  let releaseWake: (() => void) | null = null;
  const result = h('div', { class: 'card det-result', 'aria-live': 'polite' });
  const status = h('div', { class: 'feedback' }, t('Tippe auf „Zuhören“ und spiel irgendeinen Akkord – oder einen einzelnen Ton.'));

  const showIdle = (text: string) => {
    clear(result);
    result.appendChild(h('div', { class: 'det-wait' }, h('div', { class: 'det-glass' }, icon('detective', 'icon big')), h('p', null, text)));
  };

  const showChord = (frets: number[], midis: number[]) => {
    clear(result);
    const pcs = midis.map(pitchClass);
    const names = nameChord(pcs);
    const lib = libraryName(frets);
    const main = lib ? names.find((n) => n.name === lib) || names[0] : names[0];
    const ch: Chord = { name: main ? main.name : '?', frets, fingers: frets.map(() => 0), say: '', level: 0 };
    const tones = Array.from(new Set(pcs));
    const rootPc = main ? (NOTE_NAMES as readonly string[]).indexOf(main.root) : tones[0];
    const ordered = tones.slice().sort((a, b) => ((a - rootPc + 12) % 12) - ((b - rootPc + 12) % 12));
    result.appendChild(
      h(
        'div',
        { class: 'det-chord' },
        h(
          'div',
          { class: 'det-text' },
          h('div', { class: 'card-label' }, t('Das klingt wie')),
          h('div', { class: 'chord-name huge' }, main ? main.name : '?'),
          main ? h('div', { class: 'say' }, t('{root}-{quality}', { root: noteText(main.root), quality: t(main.quality.name) })) : h('div', { class: 'say' }, t('kein bekannter Akkordname')),
          h(
            'p',
            null,
            t('Töne:'),
            ' ',
            h('b', null, ordered.map((x) => noteText(NOTE_NAMES[x])).join(' – ')),
          ),
          names.length > 1 ? h('p', { class: 'det-alt' }, t('Heißt auch:'), ' ', names.slice(1, 4).map((n) => n.name).join(', ')) : null,
          lib ? h('a', { class: 'btn btn-chip', href: link(`akkord/${encodeURIComponent(lib)}`) }, t('{chord} in der Akkord-Liste', { chord: lib })) : null,
          h('p', { class: 'small' }, t('Bünde {strings}: {frets}', { strings: STRINGS.map((x) => x.name).join('-'), frets: frets.map((f) => (f < 0 ? 'x' : f)).join(' ') })),
        ),
        h('div', { class: 'diagram-big' }, playableChord(ch, { lefty })),
      ),
    );
    announce(main ? `${main.name}, ${t(main.quality.name)}` : t('unbekannter Akkord'));
  };

  const showNote = (midi: number) => {
    clear(result);
    result.appendChild(
      h(
        'div',
        { class: 'det-note' },
        h('div', { class: 'card-label' }, t('Einzelner Ton')),
        h('div', { class: 'chord-name huge' }, noteShown(midi)),
        h('p', null, t('Diesen Ton findest du hier:')),
        h(
          'ul',
          { class: 'det-positions' },
          ...positions(midi).map((p) => h('li', null, h('b', null, stringText(p.string)), ' ', p.fret === 0 ? t('leer') : t('im {fret} Bund', { fret: ordinal(p.fret) }))),
        ),
      ),
    );
    announce(t('Ton {note}', { note: noteShown(midi) }));
  };

  const start = () => {
    void ensureMic().then(async (ok) => {
      if (!ok) {
        status.textContent = t('Der Detektiv braucht das Mikrofon, um zu hören, was du spielst.');
        return;
      }
      listenBtn.disabled = true;
      releaseWake = keepAwake();
      status.textContent = t('Ich höre zu …');
      const mic = await openMic();
      const db = new Float32Array(mic.analyser.frequencyBinCount);
      const lin = new Float32Array(db.length);
      const held = new Float32Array(db.length);
      const time = new Float32Array(2048);
      const binHz = mic.sampleRate / mic.analyser.fftSize;
      const recent: string[] = [];
      let shown = '';
      let quietSince = 0;
      timer = window.setInterval(() => {
        holdSpectrum(held, dbToLinear(mic.freqData(db), lin));
        mic.timeData(time);
        let rms = 0;
        for (let i = 0; i < time.length; i++) rms += time[i] * time[i];
        rms = Math.sqrt(rms / time.length);
        let key = '';
        let view: () => void = () => undefined;
        if (hearingOwnSound()) {
          // ein angetipptes Griffbild klingt: nicht deuten, aber auch nicht als Stille werten
          recent.length = 0;
          return;
        }
        if (rms >= 0.006) {
          quietSince = 0;
          const peaks = instrumentPeaks(held, binHz);
          const note = singleNote(peaks);
          if (note !== null) {
            key = `n${note}`;
            view = () => showNote(note);
          } else {
            const f = identifyFingering(peaks);
            if (f && f.score >= PREFER.minScore) {
              key = `c${f.frets.join(',')}`;
              view = () => showChord(f.frets, f.midis);
            }
          }
        } else if (!quietSince) quietSince = performance.now();
        recent.push(key);
        if (recent.length > 5) recent.shift();
        // erst zeigen, wenn 3 der letzten 5 Messungen dasselbe sagen – sonst flackert die Anzeige
        const count = recent.filter((k) => k === key).length;
        if (key && key !== shown && count >= 3) {
          shown = key;
          view();
          status.textContent = t('Ich höre zu … spiel gern noch etwas anderes!');
        }
        if (!shown && quietSince && performance.now() - quietSince > 4000) showIdle(t('Spiel einen Akkord oder einen Ton – ich verrate dir, was es ist.'));
      }, 80);
    });
  };

  const listenBtn = button(h('span', null, icon('mic'), ' ', t('Zuhören')), start, 'btn-primary btn-play');
  showIdle(t('Spiel irgendeinen Akkord oder einen einzelnen Ton. Ich zeige dir, welche Saiten du gegriffen hast und wie der Akkord heißt.'));
  screen(
    root,
    { title: t('Akkord-Detektiv'), theme: 'cherry' },
    result,
    h('div', { class: 'row' }, listenBtn),
    status,
    h(
      'p',
      { class: 'card small' },
      t('Tipp: Schlag die Saiten kräftig an und halte {obj} ruhig. Der Detektiv kennt Dur, Moll, Sept-, Major-Sept-, Sext-, sus-, verminderte und übermäßige Akkorde in den ersten fünf Bünden.', { obj: t(instrument().obj) }),
      ' ',
      t('Manche Griffe klingen gleich (z. B. Am7 und C6) – dann stehen beide Namen da.'),
    ),
  );
  return () => {
    window.clearInterval(timer);
    releaseWake?.();
  };
};
