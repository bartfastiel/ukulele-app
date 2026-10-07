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
- **Blues:** 12-Takt-Blues in C mit Begleitband (Bass, Orgel, Schlagzeug – keine Ukulele). Vier Stufen, die
  Töne direkt als Punkte auf dem Hals: Grundton → Grundton und Quinte → Boogie-Riff → frei spielen mit der
  Blues-Tonleiter. Optional spielt die App den Ton vor oder hört zu und zählt Treffer.
- **Akkord-Detektiv:** irgendeinen Akkord oder Ton spielen – die App zeigt Griff, Namen, Art (Dur, Moll, 7, maj7,
  m7, 6, sus, dim, aug …), die Töne und gleichklingende Namen (z. B. Am7 = C6); bei einem Ton alle Stellen auf dem Hals.
- **Stimmgerät** mit Nadel, Saitenerkennung, Referenztönen und Tipps bei falschem Wirbel oder hakender Saite.
- **Rhythmus:** Metronom mit Schlagmustern (↓ ↑), auf Wunsch mit Akkord.
- **Eigene Lieder:** Text mit Akkorden einfügen – als `[C]Text` oder im verbreiteten Format „Akkordzeile über
  Textzeile“ (die Spalte bestimmt das Wort). Vorschau, freundlicher Hinweis bei unbekannten Akkorden, Taktart und
  Tempo wählbar. Gespeichert nur im Browser; spielbar wie die „Akkorde + Text“-Lieder.
  - **Teilen per Link oder QR-Code:** Das ganze Lied steckt komprimiert im Link hinter `#/teilen/…` – der Teil hinter
    „#“ erreicht nie den Server. QR-Code ohne Fremdbibliothek (Byte-Modus, Fehlerkorrektur L/M, bis Version 25):
    reicht für etwa 1500 Zeichen Liedtext, längere Lieder lassen sich nur per Link teilen. Beim Teilen erinnert die App
    daran, nur eigene oder freie Lieder weiterzugeben.
- **Meine Sterne:** Übungstage, Abzeichen, Linkshänder-Modus, Sicherungs-Code zum Mitnehmen auf ein anderes Gerät.

Ohne Mikrofon funktioniert alles weiter – dann bestätigt das Kind selbst.

## Lieder

Über 80 Lieder in sechs Gruppen: Kinderlieder, Lagerfeuer & Wandern, Frühling bis Herbst, Weihnachten, English Songs
und eigene Lieder. Ein Teil hat eine ausnotierte Melodie (Karaoke mit Melodie und Tabulatur), die übrigen sind
„Akkorde + Text“ – die Melodie kennt man, die App führt durch die Akkordwechsel.

Alle Lieder sind gemeinfrei (Text **und** Melodie: Urheber vor 1956 gestorben oder nachweislich traditionell) oder
eigene. Bei jedem Lied stehen Urheber mit Lebensdaten und die gemeinfreie Textquelle (z. B. volksliederarchiv.de,
Erstdrucke über Wikipedia, Camp-Fire Choruses 1916, The Shanty Book 1921). Bewusst ausgeschlossen sind u. a. jüngere
Textfassungen (z. B. „Im Märzen der Bauer“ nach Hensel 1923, frei erst ab 2027), Lieder mit geschützter Melodie
(„Hoch auf dem gelben Wagen“) und Lieder mit rassistischen Originalstrophen.

- Mit Melodie: `src/music/songs.ts` (Notation siehe `SongSource.text` in `src/music/song.ts`)
- Akkorde + Text: `src/music/songs-chordpro.ts`, `songs-kinder.ts`, `songs-english.ts` (ChordPro-Stil `[C]Text`,
  ein Akkord = ein Takt, `[G7:2]` = zwei Schläge)

Die Unit-Tests prüfen Taktlängen, Griffbarkeit, eindeutige IDs und dass jeder Akkord ein Griffbild hat.

**Melodien aus Notenbeispielen:** Viele Wikipedia-Artikel zu Volksliedern enthalten die (gemeinfreie) Melodie als
LilyPond-Notenbeispiel. `tools/melody/` liest daraus Tonhöhen, Dauern, Silben und ggf. Akkorde, transponiert in die
einfache Tonart der App und legt unsere Akkorde per Textabgleich bzw. Harmonisierung auf die Silben. Der Notentext
wird mit unserem geprüften Text verglichen; abweichende, geschützte Fassungen (z. B. „Im Märzen der Bauer“ nach
Hensel) werden ausgeschlossen. Außer dem Artikel selbst werden seine anderen Sprachversionen und per Volltextsuche
weitere Seiten in Wikipedia und Wikisource (z. B. transkribierte gemeinfreie Liederbücher) durchsucht; die Herkunft
landet im `origin` des Lieds. Melodien ohne solche Quelle können als ABC-Datei in `tools/melody/abc/<id>.abc`
ergänzt werden (Herkunft im Feld `S:`).

```sh
node tools/melody/fetch-wiki.ts <cache>                       # Artikel laden (langsam, Wikipedia drosselt)
node tools/melody/fetch-langs.ts <cache2> [id …]              # andere Sprachversionen mit Notenbeispiel
node tools/melody/search-wiki.ts <cache3> <id> <wiki> "<text>" # Volltextsuche, z. B. en.wikisource.org
node tools/melody/extract.ts <cache>                          # <score>-Blöcke als .ly ablegen (je Cache)
node tools/melody/import.ts <cache> [<cache2> …] --write      # src/music/songs-melodies.ts erzeugen
```

**Transponieren:** Jedes Lied lässt sich in alle zwölf Tonarten verschieben (Griffe für jede Tonart aus einer
geprüften Tabelle bzw. per Grifffinder). ★ markiert den Vorschlag – bester Kompromiss aus einfachen Griffen,
Kinderstimmlage (etwa C4–D5, Melodie in der günstigsten Oktave) und Nähe zur Original-/Quellentonart (◆).

### Rechtliches zu den Liedern

Liedtexte und Melodien sind urheberrechtlich geschützt, bis 70 Jahre nach dem Tod des letzten Urhebers; reine
Akkordfolgen sind es nach herrschender Meinung nicht. Text mit Akkorden, eine Melodie als Tabulatur oder das
Abspielen der Melodie bräuchten für geschützte Lieder Genehmigungen der Musikverlage. Diese App enthält deshalb
nur gemeinfreie Lieder (mit Quelle in `origin`) und eigene Lieder, auch nicht als Testdaten im Repo.
Hinweise von Rechteinhabern bitte als Issue: https://github.com/bartfastiel/ukulele-app/issues – betroffene Inhalte
werden sofort entfernt. (Keine Rechtsberatung.)

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

## Akkorderkennung verbessern: Beispielaufnahmen

Unter **Meine Sterne › „Für Erwachsene: Beispiel-Akkorde aufnehmen“** (`#/aufnahme`) führt die App durch 28
beschriftete Aufnahmen à 5 Sekunden: richtige Griffe (geschlagen, gezupft, ausklingend), typische Fehlgriffe
(Finger drückt nicht, falscher Bund, gedämpfte Saite, verrutschte Form) und Geräusche. Eigene Aufnahmen – etwa
Fälle, in denen die App falsch gelobt hat – lassen sich mit Bünden und Notiz ergänzen. Alles bleibt im Browser
(IndexedDB) und wird als ZIP (WAV + `takes.json`) heruntergeladen bzw. auf dem iPad geteilt.

```sh
node tools/eval-recordings.ts ~/Downloads/ukulele-aufnahmen-….zip   # --all zeigt auch die fehlerfreien
```

Die Auswertung spielt jede Aufnahme durch denselben Lauscher wie die App (Spektrum wie der AnalyserNode, alle
80 ms, Zweier-Bestätigung) und meldet richtige Treffer, verpasste Akkorde und falsches Lob.

## Deployment

Jeder Push auf `main` baut `dist/` und legt es per SSH auf den Server von wer-ist-daniel-schwarz.de
(`/mnt/frag-daniel/ukulele/app`), jeder Pull Request bekommt eine Vorschau. Caddy-Konfiguration und
TLS liegen im Repo `frag-daniel`. Secrets (`DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`) liegen nur in den
GitHub-Einstellungen, nie im Repo.

## Lizenz

MIT – siehe `LICENSE`.
