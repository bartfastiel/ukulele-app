# Ukulele-Club – Hinweise für Claude

Private Lern-App von Daniel für seinen Sohn (10, Realschul-Ukulelenklasse). Öffentlich als Open Source auf GitHub
(`bartfastiel/ukulele-app`), live unter https://ukulele.wer-ist-daniel-schwarz.de. Antworten und UI-Texte auf
Deutsch, Akkordnamen international (B statt H).

## Befehle

```sh
npm run dev        # Watch-Build + Server auf http://localhost:5173
npm run typecheck  # tsc --noEmit (TypeScript 7)
npm test           # Unit-Tests: node --test mit Type-Stripping (tests/unit/*.test.ts)
npm run build      # dist/ via tools/build.mjs (esbuild, Inhalts-Hash, Service Worker)
npm run e2e        # Build + Playwright (tests/e2e), Server: tools/serve.mjs auf :4173
node tools/shots.mjs <ordner>   # Bildschirmfotos aller Ansichten (iPad/WebKit, Handy hoch/quer)
node tools/eval-recordings.ts <zip>   # echte Beispielaufnahmen (#/aufnahme) durch die Akkorderkennung spielen
```

## Regeln

- **Keine Laufzeit-Abhängigkeiten, keine Frameworks.** Neue devDependencies nur mit Begründung; bisher 3.
- **Alte iPads:** Build-Ziel Safari 12. Keine Destrukturierung (weder Array noch Objekt) in `src/` (esbuild kann sie für dieses Ziel
  nicht umschreiben), kein Flexbox-`gap` (Safari < 14.1), kein `aspect-ratio`, kein `replaceChildren`,
  kein `replaceAll`. Ohne Web Audio muss die App stumm weiterlaufen (`hasAudio()`).
- **Kindgerecht:** Tippziele ≥ 64 px (Test prüft ≥ 52 px), Text nur auf cremefarbenen Flächen, nie „Falsch“,
  unsichere Mikrofon-Erkennung darf nie blockieren („Geschafft“ immer sichtbar), alles auch ohne Mikrofon nutzbar.
- **Lieder nur gemeinfrei oder eigene** (Herkunft in `origin`). Melodien innerhalb C4–A5 (Ukulele mit hohem G).
- Code-Kommentare nur, wo der Grund nicht aus dem Code hervorgeht.
- Arbeit per Branch + Pull Request; CI (`ci.yml`) muss grün sein; `deploy.yml` deployt `main` und Vorschauen.
  Keine Secrets ins Repo.
- Commit-Nachrichten: Conventional Commits (`feat|fix|docs|test|refactor|chore|ci`), Hook in `.githooks/`.
- Keine KI-Attribution: keine `Co-Authored-By`-Zeilen, keine Session-Links, kein „Generated with …“ in Commits und PRs.

## Architektur

```
src/main.ts              Hash-Router (#/, #/lieder, #/lied/<id>, #/akkorde, #/akkord/<name>, #/spiel, #/stimmen, #/rhythmus, #/sterne)
src/views/*.ts           je Ansicht eine Funktion (root, param) → Aufräumfunktion
src/views/player.ts      Karaoke: Transport auf der AudioContext-Uhr, Vorausplanung (25-ms-Takt, 150 ms Horizont),
                         Modus „Wartet auf mich“ hält an jedem Akkordwechsel (stopBeat) und hört per listen.ts zu
src/ui/                  dom.ts (h/s-Helfer), screen.ts (Kopfzeile, Mikrofon-Dialog, Lob, Wake Lock),
                         chord-diagram.ts (SVG-Griffbild), wood.ts (prozedurale Mahagoni-Textur), icons.ts
src/audio/engine.ts      AudioContext, Karplus-Strong-Puffer je Ton (Cache), Strum, Klick
src/audio/pluck.ts       Synthese ohne Web Audio (auch für Tests und tools/make-wav.ts)
src/audio/pitch.ts       YIN-Tonhöhe (Stimmgerät)
src/audio/chord-detect.ts  Spektralspitzen → Bewertung je Griff und Saite, Hinweis auf leer klingende Saite
src/audio/mic.ts, listen.ts  Mikrofon (ohne Echo-/Rauschunterdrückung), Lauscher mit 2er-Bestätigung
src/music/               notes.ts, chords.ts (18 Griffe), song.ts (Notation + Parser), songs.ts (Lieddaten)
src/audio/offline.ts     Nachbau von AnalyserNode + Lauscher für Tests und tools/eval-recordings.ts
src/views/record.ts      Aufnahme-Werkzeug (#/aufnahme), Plan in src/music/recording-plan.ts, ZIP via src/util/zip.ts
src/store.ts             localStorage (Sterne, Übungstage, Einstellungen), storage.persist(), Export-Code
src/styles.css           Design-Tokens, Mahagoni-Knöpfe, Layouts: Handy hoch (≤600px), Handy quer (Höhe ≤560px), ≥900px
```
