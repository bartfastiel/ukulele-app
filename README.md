# Ukulele-Club

Kostenlose Lern-App für Ukulele im Browser – gebaut für Kinder in der Ukulelenklasse, die einfach üben und Spaß
haben wollen. Läuft auf iPad (auch älteren), Android-Handys (hoch und quer) und am PC, ohne Konto, ohne Werbung,
ohne Tracking. Alles bleibt auf dem Gerät.

**Live:** https://ukulele.wer-ist-daniel-schwarz.de

## Was die App kann

- **Lieder spielen (Karaoke):** Liedtext mit Silben, Akkord über der Silbe, wo gewechselt wird, großes Griffbild für
  „Jetzt“ und „Gleich“ mit Countdown-Punkten. Optional die Melodie als Tabulatur (Saite + Bund) unter jeder Silbe.
  - **Wartet auf mich:** Bei jedem Akkordwechsel hält das Lied an, bis das Mikrofon den richtigen Akkord hört
    (oder das Kind auf „Geschafft“ tippt).
  - **Läuft durch:** mit Einzähler, Klick, Begleitung und Melodie; Tempo langsam, mittel oder original.
  - Sterne: ★ zu Ende gespielt, ★★ durchlaufend, ★★★ im Original-Tempo. Sterne gehen nie verloren.
- **Akkorde:** 18 Griffbilder wie im Schulheft (Sattel oben, G-C-E-A von links), Anhören, **„Prüf mich!“** mit
  Rückmeldung, welche Saite noch nicht klingt.
- **Akkord-Spiel:** 60 Sekunden – das Mikrofon zählt jeden richtig gespielten Akkord; bei zwei Akkorden als
  Wechsel-Training.
- **Stimmgerät** mit Nadel, Saitenerkennung und Referenztönen.
- **Rhythmus:** Metronom mit Schlagmustern (↓ ↑), auf Wunsch mit Akkord.
- **Meine Sterne:** Übungstage, Abzeichen, Linkshänder-Modus, Sicherungs-Code zum Mitnehmen auf ein anderes Gerät.

Ohne Mikrofon funktioniert alles weiter – dann bestätigt das Kind selbst.

## Lieder

Nur gemeinfreie Lieder oder eigene: Bruder Jakob, Row Row Row Your Boat, Hänschen klein, Alle meine Entchen,
Ode an die Freude, Twinkle Twinkle Little Star, Jingle Bells, Zum Geburtstag viel Glück und das eigene
„G-C-E-A (das Saiten-Lied)“. Neue Lieder kommen in `src/music/songs.ts` (Notation siehe `SongSource` in
`src/music/song.ts`); die Unit-Tests prüfen Taktlängen, Griffbarkeit und Akkorde.

## Technik

- **Vanilla TypeScript, keine Laufzeit-Abhängigkeiten.** Entwicklung braucht nur `esbuild`, `typescript` und
  `@playwright/test` (7 Pakete in `node_modules`).
- **Audio:** Web Audio API. Klänge per Karplus-Strong-Synthese (gezupfte Nylonsaite) direkt im Browser, Metronom
  und Begleitung vorausgeplant auf der Audio-Uhr. Stimmgerät per YIN-Tonhöhenerkennung, Akkorderkennung über die
  Spektralspitzen des `AnalyserNode` – je Saite geprüft, damit auch C (0003) und Am7 (0000) unterscheidbar sind.
  Kein WebAssembly nötig: beides braucht weniger als 1 ms pro Messung.
- **Design:** Mahagoni-Maserung einmal beim Start prozedural auf ein Canvas gerechnet und als Textur verwendet;
  Griffbilder, Schallloch und Symbole als SVG. Keine Bilder, keine Webfonts.
- **Kompatibilität:** gebaut für Safari 12 (alte iPads), Chrome 70, Firefox 68. Ohne Web Audio läuft die App stumm
  weiter. PWA mit Service Worker – nach dem ersten Besuch offline nutzbar, auf dem Home-Bildschirm installierbar.

## Entwickeln

```sh
npm install
npm run dev        # baut bei jeder Änderung neu, http://localhost:5173
npm run check      # Typen, Unit-Tests, Build
npm run e2e        # Build + Playwright (Desktop, iPad/WebKit, Handy hoch/quer, Mikrofon-Simulation)
```

Die Mikrofon-Tests spielen Chromium ein synthetisches Signal als Mikrofon vor (`tools/make-wav.ts`): einen
C-Akkord bzw. eine 20 Cent zu tiefe E-Saite.

## Deployment

Jeder Push auf `main` baut `dist/` und legt es per SSH auf den Server von wer-ist-daniel-schwarz.de
(`/mnt/frag-daniel/ukulele/app`), jeder Pull Request bekommt eine Vorschau. Caddy-Konfiguration und
TLS liegen im Repo `frag-daniel`. Secrets (`DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`) liegen nur in den
GitHub-Einstellungen, nie im Repo.

## Lizenz

MIT – siehe `LICENSE`.
