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
- **Lieder nur gemeinfrei oder eigene** (Text UND Melodie; Urheber mit Lebensdaten und Textquelle in `origin`).
  Text wörtlich aus gemeinfreier Quelle, nie aus dem Gedächtnis. Melodien nur, wenn sicher bekannt, innerhalb C4–A5.
- Code-Kommentare nur, wo der Grund nicht aus dem Code hervorgeht.
- Arbeit per Branch + Pull Request; CI (`ci.yml`) muss grün sein; `deploy.yml` deployt `main` und Vorschauen.
  Keine Secrets ins Repo.
- Commit-Nachrichten: Conventional Commits (`feat|fix|docs|test|refactor|chore|ci`), Hook in `.githooks/`.
- Keine KI-Attribution: keine `Co-Authored-By`-Zeilen, keine Session-Links, kein „Generated with …“ in Commits und PRs.

## Architektur

```
src/main.ts              Hash-Router (#/, #/lieder, #/lied/<id>, #/akkorde, #/akkord/<name>, #/spiel, #/stimmen, #/rhythmus, #/sterne,
                         #/blues, #/detektiv, #/aufnahme, #/eigenes-lied[/<id>], #/lied-teilen/<id>, #/teilen/<daten>)
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
src/music/               notes.ts, chords.ts (18 Griffe), song.ts (Notation + Parser, ChordPro-Parser, Kategorien),
                         songs.ts (Lieder mit Melodie), songs-chordpro/-kinder/-english.ts (Akkorde + Text)
src/audio/offline.ts     Nachbau von AnalyserNode + Lauscher für Tests und tools/eval-recordings.ts
src/views/record.ts      Aufnahme-Werkzeug (#/aufnahme), Plan in src/music/recording-plan.ts, ZIP via src/util/zip.ts
src/music/identify.ts    Akkord-Detektiv: alle Griffe der ersten 5 Bünde bewerten, Akkordnamen aus Tonklassen
src/music/blues.ts, src/audio/band.ts, src/ui/fretboard.ts   12-Takt-Blues, Begleitband aus Oszillatoren, Hals als Tabulatur
src/music/transpose.ts   Transponieren, Tonart-Vorschlag (★) und Original-/Quellentonart (◆)
src/music/songs-melodies.ts  erzeugt von tools/melody/import.ts (LilyPond aus Wikipedia → Melodieformat)
src/music/import.ts      Eigene Lieder einlesen: ChordPro oder Akkordzeile über Text → ChordPro, Akkordnamen normalisieren
src/music/own-songs.ts   Eigene Lieder (Prüfung, ids, als Song) und Teilen-Kodierung (JSON → DEFLATE → Base64url)
src/music/library.ts     mitgelieferte + eigene Lieder (allSongs, findSong)
src/util/deflate.ts, qr.ts  eigenes DEFLATE (packen/entpacken) und QR-Encoder (Byte-Modus, L/M, Maskenwahl)
src/views/own-song.ts, share.ts  Eingabe/Bearbeiten, Teilen (QR + Link), geschicktes Lied hinzufügen
src/store.ts             localStorage (Sterne, Übungstage, Einstellungen, eigene Lieder), storage.persist(), Export-Code
src/styles.css           Design-Tokens, Mahagoni-Knöpfe, Layouts: Handy hoch (≤600px), Handy quer (Höhe ≤560px), ≥900px
```
