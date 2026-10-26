# Design-Richtlinie „Klar“

Verbindlich für alle Instrumente, alle Ansichten (App) und alle vorgerenderten Seiten (Lektionen, Wissen, Lehrkräfte,
Rechtliches). Wer ein Feature ergänzt, baut es aus den Bausteinen unten. Weicht etwas ab, wird zuerst diese Datei
geändert.

## Leitgedanken

1. **Werkzeug, nicht Spielzeug.** Die App soll wirken wie ein gut gemachtes Werkzeug, das schon auf dem Handy
   installiert ist. Eltern und Lehrkräfte sollen ihr auf den ersten Blick vertrauen, Kinder sollen sich sofort
   zurechtfinden.
2. **Ruhe vor Reiz.** Hellgrauer Grund, weiße Gruppen, **eine** Akzentfarbe. Keine Texturen, keine Verläufe, keine
   Holzoptik, keine Schatten (Ausnahmen: aktiver Segment-Knopf, Dialog). Keine Emojis als Gestaltung.
3. **Was oft gebraucht wird, ist oben. Was man einmal einstellt, ist leise.**
   - Immer sichtbar: **Stimmgerät** (Symbol oben rechts in jeder Kopfzeile) und der **Lernweg** („Weiter mit
     Lektion 4“ bzw. „Lernweg starten“ ganz oben auf der Startseite).
   - Leise, nur in **Einstellungen**: Instrument wechseln, Linkshänder, Stimmung, Sprache, Sicherung. Es gibt keine
     Instrumentenleiste, keine Umschalter dafür in den Ansichten. Das Instrument steht nur klein neben dem
     Namen „Open String“ in der Kopfzeile der Startseite.
4. **Gleich für alle Instrumente.** Farben, Abstände, Anordnung und Texte der Bedienung sind auf allen Instrumenten
   gleich. Das Instrument erkennt man an Name, App-Symbol und Griffbildern, nicht an anderen Farben.
5. **Eine Seite, eine Hauptaktion.** Jede Ansicht hat genau eine Hauptaktion (Abspielen/Stopp, Weiter, Geschafft).
   Sie sitzt unten in Daumenreichweite und ist die einzige dunkle, volle Fläche.
6. **Fußzeile immer.** Impressum, Datenschutz und Sprache stehen auf jeder Seite unten als ruhige kleine Links.

## Farben (Tokens in `src/styles.css`, `:root`)

| Token | Wert | Verwendung |
|---|---|---|
| `--bg` | `#F2F3F5` | Seitengrund |
| `--surface` | `#FFFFFF` | Gruppen, Karten, Kacheln |
| `--fill` | `#E1E3E7` | Spur des Segmentschalters, inaktive Fortschrittsflächen |
| `--fill-soft` | `#ECEDF0` | Trennlinien in Gruppen, leere Fortschrittsbalken, inaktive Schlagpfeile |
| `--ink` | `#1C1C1E` | Text, Hauptaktion, Griffbild-Linien |
| `--ink-2` | `#55575E` | Zweittext, Bereichsüberschriften, Zusatzangaben (7:1 auf Weiß) |
| `--ink-3` | `#9A9CA3` | nur Chevrons und Deko, **nie Text** |
| `--accent` | `#0A7C6E` | Lernweg, Fortschritt, aktiver Zustand, Fingerpunkte, Links im Fließtext, Erfolg |
| `--accent-soft` | `#E3F1EE` | hinterlegte Akzentflächen (Lob, geschaffte Lektion) |
| `--almost` | `#B45309` | „fast“ (Stimmgerät, Erkennung). Nie Rot, nie „Falsch“. |

**Bereichsfarben**, nur für die 34-px-Symbolkacheln in Listen (weißes Symbol darauf, nie als Fläche oder Text):

| Bereich | Farbe |
|---|---|
| Lernen (Lektionen, Wissen) | `--accent` `#0A7C6E` |
| Lieder, Karaoke, Weihnachten, eigene Lieder | `#2F6FEB` |
| Blues, Band-Begleitung, Rhythmus | `#4B4FC6` |
| Spiele und Erkennung (Detektiv, Akkord-/Ton-Spiel) | `#C2410C` |
| Werkzeuge (Stimmgerät, Akkorde, Töne, Sterne, Einstellungen) | `#55575E` |

Text erfüllt immer mindestens 4,5:1. Farben unterscheiden sich nie nur im Farbton. Fehlt Farbe (Druck), bleibt alles
verständlich.

## Schrift

- **Figtree** (SIL OFL), selbst gehostet als WOFF2 (keine Anfrage an fremde Server), Schnitte 400/600/700/800.
  Rückfall: `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`.
- Größen: 13 (Bereichsüberschrift, Großbuchstaben, 600) · 15 (Zusatz, `--ink-2`) · 17 (Grundtext, Listenzeilen) ·
  19 (Kartentitel, 700) · 28 (Seitentitel, 800) · Akkordname im Spiel 72–96 (800, `letter-spacing: -0.04em`).
- Zahlen in Zählern und Tempos mit `font-variant-numeric: tabular-nums`.

## Maße

- Abstandsraster 4 px; üblich 8 / 12 / 16 / 24. Seitenrand am Handy 16 px.
- Radien: Gruppen und Karten **16**, Knöpfe und Segmente **12** (innen 10), Symbolkacheln **9**, runde Knöpfe 50 %.
- Tippziele: **≥ 64 px** Höhe für alles, was Kinder antippen (Listenzeilen, Knöpfe, Kacheln). Kopfzeilen-Symbole
  48 px plus Abstand zum nächsten Ziel.
- Inhaltsbreite: Listen und Text höchstens 680 px; Spielansichten bis 1100 px.
- Breakpoints wie bisher: Handy hoch ≤ 600 px, Handy quer (Höhe ≤ 560 px), Tablet/Desktop ≥ 900 px.

## Bausteine

- **Kopfzeile** (`screen()`): links „‹ Zurück“ bzw. „‹ Start“ als Akzent-Textlink, Mitte Seitentitel (17, 700),
  rechts das Stimmgerät-Symbol (48 px, Ziel `stimmen`; auf dem Stimmgerät selbst entfällt es). Kein großer Titel in
  der Kopfzeile, kein Rahmen.
  Auf der Startseite: links Logo + „Open String“ + klein der Instrumentname, rechts Stimmgerät, Sterne,
  Einstellungen (Zahnrad).
- **Lernweg-Karte**: weiße Karte, Akzent-Überschrift („Weiter mit deinem Kurs“), Titel der nächsten offenen Lektion,
  Fortschritt „3 von 12 Lektionen geschafft“ mit dünnem Akzentbalken, runder Akzentknopf mit Play-Symbol. Ohne
  begonnene Lektion: „Lernweg starten“. Instrumente ohne Kurs zeigen stattdessen „Weiterspielen“ (zuletzt gespieltes
  Lied) an dieser Stelle.
- **Bereichsüberschrift**: 13 px, 600, Großbuchstaben, `--ink-2`, 8 px Einzug, über jeder Gruppe.
- **Gruppe**: weiße Fläche, Radius 16, Zeilen mit 1-px-Trennlinie `--fill-soft`, kein Rand, kein Schatten.
- **Zeile**: Symbolkachel 34 px (Bereichsfarbe) · Titel 17/600 · optional Zusatz rechts 15 `--ink-2` · Chevron
  `--ink-3`. Mindesthöhe 64 px. Ganze Zeile ist der Link.
- **Werkzeugkachel**: weiße Fläche, Radius 16, Symbol 26 px in `--accent`, Beschriftung 15/600 darunter, 3 je Reihe.
- **Segmentschalter**: für Modi **innerhalb** einer Ansicht (Stufe, Tonart, Tempo, Ansicht). Spur `--fill`, Radius 12,
  aktiver Knopf weiß mit leichtem Schatten. Mehr als 4 Optionen: umbrechen oder als Zeile mit Auswahl.
- **Schalter (Toggle)**: an/aus-Einstellungen wie „Ich höre zu“, „Linkshänder“, „Wartet auf mich“. Ein `<button
  aria-pressed>` im Aussehen eines Schiebeschalters (Akzent = an).
- **Hauptknopf**: `--ink` gefüllt, weiße Schrift 19/700, volle Breite, Höhe 64, Radius 16, unten in der Ansicht.
- **Akzentknopf**: rund, `--accent`, für „weiter im Lernweg“ und Play in Karten.
- **Zweitknopf**: weiß, Schrift `--ink`, Radius 12, Höhe ≥ 64; auf weißer Gruppe mit `--fill`-Fläche statt Weiß.
- **Lob/Rückmeldung**: `--accent-soft`-Fläche mit Akzent-Häkchen; „fast“ mit `--almost`. Kurze Wörter („Super!“).
- **Dialog**: weiße Karte, Radius 16, Schatten, abgedunkelter Hintergrund; sichere Wahl zuerst und als Hauptknopf.
- **Fußzeile**: auf `--bg`, 15 px `--ink-2`, Links unterstrichen; Zeilen: Sprache · Rechtliches (Impressum,
  Datenschutz, Lizenzen) · „Auch für: …“ nur auf der Startseite.

## Musik-Darstellungen

- **Griffbild**: Saiten und Sattel `--ink` (Sattel 6 px, rund), Bundstäbe `#D5D7DC`, Fingerpunkte `--accent`
  (optional weiße Fingerzahl), leere Saite als Ring `--ink`, gedämpfte als ×. Keine Holzfarbe.
- **Griffbrett/Tabulator, Hals**: weiße Fläche, Bundstäbe `#D5D7DC`, Saiten `--ink-2`, Treffer `--accent`.
- **Takt- und Fortschrittsanzeige**: dünner Balken (6 px) oder 12 Felder; gespielt `--ink-3`, jetzt `--accent`,
  kommend `--fill-soft`.
- **Schlagmuster**: Pfeile in 56-px-Feldern, aktuelles Feld `--accent` mit weißem Pfeil, sonst `--bg`.
- **Karaoke**: Liedtext 22–28 px auf Weiß, aktuelle Silbe `--accent` unterstrichen, Akkorde darüber 700.

## Inhaltsseiten (vorgerendert)

Lektionen, Wissen, Lehrkräfte, Rechtliches: Kopfzeile wie oben, darunter Seitentitel 28/800, Text in einer weißen
Gruppe mit 24 px Innenabstand, höchstens 680 px breit, Zeilenhöhe 1,55. Zwischenüberschriften 19/700. Druckansichten
bleiben schwarz auf weiß ohne Flächen.

## Checkliste für neue Features

- [ ] Nur Tokens aus `:root`, keine neuen Farben oder Schatten.
- [ ] Startpunkt: als Zeile in der passenden Gruppe der Startseite (Bereichsfarbe aus der Tabelle), nicht als neue
      große Kachel.
- [ ] `screen()` für die Kopfzeile (mit Stimmgerät-Symbol), Fußzeile vorhanden.
- [ ] Genau eine Hauptaktion, unten, dunkel.
- [ ] Modi als Segmentschalter, An/Aus als Schalter, Einmal-Einstellungen in den Einstellungen.
- [ ] Tippziele ≥ 64 px, Text ≥ 4,5:1, Handy hoch/quer und Tablet geprüft (`node tools/shots.mjs`).
- [ ] Gleich auf allen Instrumenten; Unterschiede nur im Inhalt.
