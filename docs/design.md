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
   - Leise, nur in **Einstellungen**: Instrument wechseln, Linkshänder, Stimmung, Darstellung, Sprache, Sicherung. Es gibt keine
     Instrumentenleiste, keine Umschalter dafür in den Ansichten. Das Instrument steht nur klein neben dem
     Namen „Open String“ in der Kopfzeile der Startseite.
4. **Gleich für alle Instrumente.** Farben, Abstände, Anordnung und Texte der Bedienung sind auf allen Instrumenten
   gleich. Das Instrument erkennt man an Name, App-Symbol und Griffbildern, nicht an anderen Farben.
5. **Eine Seite, eine Hauptaktion.** Jede Ansicht hat genau eine Hauptaktion (Abspielen/Stopp, Weiter, Geschafft).
   Sie sitzt unter der Bühne (Griffbild, Hals, Anzeige) in Daumenreichweite, am Handy über die ganze Breite, und hat
   den höchsten Kontrast der Seite (hell: dunkel gefüllt, dunkel: hell gefüllt). Spielansichten, die heute ohne
   Scrollen bedienbar sind (Tablet quer, Handy quer), bleiben es – die Bühne hat Vorrang vor der Position ganz unten.
6. **Fußzeile immer.** Impressum, Datenschutz und Sprache stehen auf jeder Seite unten als ruhige kleine Links; dazu
   ein leises Sonne/Mond-Symbol für hell/dunkel.

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
| `--on-accent` | `#FFFFFF` | Text und Symbole auf Akzentflächen (Fingerzahl, Play-Knopf, aktive Felder) |
| `--fret` | `#D5D7DC` | Bundstäbe in Griffbild und Hals |
| `--seg-on` | `#FFFFFF` | aktiver Knopf im Segmentschalter |
| `--shadow-seg`, `--shadow-pop` | leichte Schatten | aktiver Segment-Knopf bzw. Dialog/Einblendung (dunkel: keine) |

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

- **Figtree** (SIL OFL, `public/fonts/OFL.txt`), selbst gehostet als WOFF2 in festen Schnitten 400/600/700/800 je
  latin und latin-ext (keine variable Schrift, keine Anfrage an fremde Server; im Offline-Speicher). Andere Stärken
  (500) nicht verwenden. Rückfall: `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`.
- Größen: 13 (Bereichsüberschrift, Großbuchstaben, 600) · 15 (Zusatz, `--ink-2`) · 17 (Grundtext, Listenzeilen) ·
  19 (Kartentitel, 700) · 28 (Seitentitel, 800) · Akkordname im Spiel 72–96 (800, `letter-spacing: -0.04em`).
- Zahlen in Zählern und Tempos mit `font-variant-numeric: tabular-nums`.

## Maße

- Abstandsraster 4 px; üblich 8 / 12 / 16 / 24. Seitenrand am Handy 16 px.
- Radien: Gruppen und Karten **16**, Knöpfe und Segmente **12** (innen 10), Symbolkacheln **9**, runde Knöpfe 50 %.
- Tippziele: **≥ 64 px** Höhe für alles, was Kinder antippen (Listenzeilen, Knöpfe, Kacheln, Schalter). Segmente
  56 px, kleine Zweitknöpfe (z. B. „Zurück zur Normalstimmung“) mindestens 52 px. Kopfzeilen-Symbole und das
  Sonne/Mond-Symbol 48 px plus Abstand zum nächsten Ziel.
- Inhaltsbreite: Listen und Text höchstens 680 px (Startseite, Lieder, Sterne, Einstellungen, Lehrkräfte, alle
  Inhaltsseiten, Fußzeile); Spielansichten bis 1100 px.
- Abstände mit `margin` (kein Flexbox-`gap`, Safari 12); in CSS-Grid `grid-gap` und `gap`.
- Breakpoints wie bisher: Handy hoch ≤ 600 px, Handy quer (Höhe ≤ 560 px), Tablet/Desktop ≥ 900 px.

## Bausteine

Helfer in `src/ui/screen.ts`: `screen()`, `button()`, `toggle()`, `listRow()`, `group()`, `tunerLink()`.

- **Kopfzeile** (`screen()`): links „‹ Zurück“ bzw. „‹ Start“ als Akzent-Textlink, Mitte Seitentitel (17, 700),
  rechts das Stimmgerät-Symbol (48 px, Ziel `stimmen`; auf dem Stimmgerät selbst und auf der Wurzel-Startseite
  entfällt es). Kein Rahmen. Inhaltsseiten (Wissen, Lektionen, Rechtliches) zeigen den Titel als großen Seitentitel
  (28/800) unter der Kopfzeile.
  Auf der Startseite: links Logo (`logo()`) + „Open String“ + klein der Instrumentname, rechts Stimmgerät, Sterne
  (mit Zahl), Einstellungen (Regler-Symbol).
- **Startseite** (Instrument): Hallo-Hinweis (nur beim ersten Besuch), Lernweg-Karte, Gruppen „Spielen“
  (Weihnachtslieder in der Saison, Lieder, Blues, Band-Begleitung), „Üben“ (Detektiv, Spiel), „Lernen“ (Lektionen,
  Wissen), dann „Werkzeuge“ als Kacheln (Stimmen, Akkorde bzw. Töne, Rhythmus). Wurzel-Startseite: Gruppe
  „Instrument wählen“ mit einem Saiten-Symbol je Instrument, darunter Text-Karten.
- **Lernweg-Karte**: weiße Karte, Akzent-Überschrift („Weiter mit deinem Kurs“), „Lektion 4 · Titel“, Fortschritt
  „3 von 24 Lektionen geschafft“ mit dünnem Akzentbalken, runder Akzentknopf mit Play-Symbol. Nächste Lektion =
  kleinste Nummer ohne Häkchen. Ohne Häkchen: „Lernweg starten“ (führt zur Übersicht); alle geschafft: „Alle
  Lektionen geschafft!“. Die Titel stehen in `src/content/kurse.ts` (ein Test hält sie gleich mit den Kursen).
  Instrumente ohne Kurs zeigen an dieser Stelle „Weiterspielen“ (zuletzt gespieltes Lied) bzw. „Dein erstes Lied“;
  bei Kurs-Instrumenten ist „Weiterspielen“ die erste Zeile der Gruppe „Spielen“.
- **Bereichsüberschrift**: 13 px, 600, Großbuchstaben, `--ink-2`, 8 px Einzug, über jeder Gruppe.
- **Gruppe**: `--surface`, Radius 16, Zeilen mit 1-px-Trennlinie `--fill-soft`, kein Rand, kein Schatten.
- **Zeile** (`listRow()`): Symbolkachel 34 px (Bereichsfarbe) · Titel 17/600 · optional Zusatz **darunter** 15
  `--ink-2` · Chevron `--ink-3`. Mindesthöhe 64 px. Ganze Zeile ist der Link. Auswahl-Zeilen (Stimmung) sind
  `<button aria-pressed>` mit Häkchen statt Chevron.
- **Werkzeugkachel**: `--surface`, Radius 16, Symbol 26 px in `--accent`, Beschriftung 15/600 darunter, 3 je Reihe.
- **Segmentschalter**: für Modi **innerhalb** einer Ansicht (Stufe, Tonart, Tempo, „Wartet auf mich / Läuft durch“,
  Darstellung). Spur `--fill`, Radius 12, aktiver Knopf `--seg-on` mit leichtem Schatten. Mehr als 4 Optionen:
  umbrechen (am Handy: Kategorien als wischbare Zeile).
- **Schalter (Toggle)** (`toggle()`): an/aus-Einstellungen wie „Ich höre zu“, „Ton vorspielen“, „Linkshänder“,
  Begleitung/Klick/Tabulatur im Lied. Ein `<button aria-pressed>` als ganze Zeile in einer Gruppe mit
  Schiebeschalter rechts (Akzent = an).
- **Wahlknopf** (einzelner `btn-seg` außerhalb eines Segments, z. B. Akkordpaar im Spiel, „Als geschafft
  abhaken“): aktiv mit `--accent-soft`-Fläche und Akzentschrift.
- **Hauptknopf** (`btn-primary`): `--ink` gefüllt, Schrift in `--surface` 19/700, Höhe 64, Radius 16; am Handy
  volle Breite. Hauptaktion = höchster Kontrast: hell dunkel gefüllt, dunkel hell gefüllt.
- **Akzentknopf**: rund, `--accent`, Symbol in `--on-accent`, für „weiter im Lernweg“ und Play in Karten.
- **Zweitknopf**: `--surface`, Schrift `--ink`, Radius 12, Höhe ≥ 64; auf Karte, Gruppe oder Dialog mit
  `--bg`-Fläche. Werkzeug-Knöpfe in Texten (`article-tool`) sind Zweitknöpfe mit Akzent-Symbol.
- **Lob/Rückmeldung**: `--accent-soft`-Fläche mit Akzentschrift; „fast“ in `--almost`; neutrale Hinweise auf `--bg`
  (in Karten) bzw. `--surface`. Kurze Wörter („Super!“).
- **Dialog**: Karte, Radius 16, `--shadow-pop`, abgedunkelter Hintergrund; sichere Wahl zuerst und als Hauptknopf.
- **Fußzeile** (vorgerendert auf jeder Seite, auch unter den App-Ansichten): auf `--bg` mit Haarlinie oben, 15 px
  `--ink-2`; Zeilen: Bereiche (Lieder, Lektionen, Akkorde, Stimmgerät, Wissen) · Rechtliches (Lehrkräfte, Über,
  Impressum, Datenschutz; unterstrichen) · Sprache · „Auch für: …“ nur auf der Startseite des Instruments ·
  „Kostenlos …“ · Sonne/Mond (hell/dunkel).
- **Einstellungen** (Seite `einstellungen`, Regler-Symbol der Startseite; das frühere `sterne#einstellungen` leitet
  dorthin um): Spielen (Linkshänder, Weniger Bewegung), Stimmung, Meine Gitarre (Klang, 12 Saiten), Darstellung
  (Automatisch · Hell · Dunkel), Sprache, Instrument wechseln, Sicherung, Für Erwachsene. Keine Abzeichen oder
  Umschalter dafür in den Ansichten: das Stimmgerät zeigt die Stimmung nur als leise Zeile mit Link dorthin, eine
  andere Stimmung meldet eine schmale Zeile über der Kopfzeile („Zurück zur Normalstimmung“).

## Musik-Darstellungen

- **Griffbild**: Saiten und Sattel `--ink` (Sattel 4,5 Einheiten, rund), Bundstäbe `--fret`, Fingerpunkte `--accent`
  mit Fingerzahl in `--on-accent`, Barré als Akzentbalken, leere Saite als Ring `--ink`, gedämpfte als × in `--ink`,
  Saitennamen `--ink-2`. Die Farben stehen als Attribute im SVG (Rückfall) und werden in `src/styles.css` über
  Klassen auf die Tokens gesetzt (`.fret`, `.nut`, `.string`, `.dot`, `.finger` …). Bünde sind Pfade, `<line>` sind
  nur die Saiten.
- **Griffbrett/Tabulator, Hals**: `--surface`, Bundstäbe `--fret`, Saiten `--ink-2`, Sattel `--ink`, Treffer und
  Akkordtöne `--accent`, Tonleiter `--ink-2`, „gleich“ als `--accent-soft` mit gestricheltem Rand.
- **Takt- und Fortschrittsanzeige**: dünner Balken (6 px, Lernweg) oder 12 Felder (Blues: Felder `--bg`, jetzt
  `--accent`).
- **Schlagmuster**: Pfeile in 56–60-px-Feldern, aktuelles Feld `--accent` mit Pfeil in `--on-accent`, sonst `--bg`.
- **Karaoke**: Liedtext 24–32 px auf `--surface`, aktuelle Silbe `--accent` unterstrichen (die Fläche
  `--accent-soft` füllt sich), Akkorde darüber 700 in `--ink-2`.
- Texte nennen eine Farbe nur, wenn die Form sie mitträgt („der grüne Punkt“ ist auch der große).

## Inhaltsseiten (vorgerendert)

Lektionen, Wissen, Lehrkräfte, Rechtliches: Kopfzeile wie oben, darunter Seitentitel 28/800, Text in einer Karte
mit 24 px Innenabstand, höchstens 680 px breit, Zeilenhöhe 1,55. Zwischenüberschriften 19/700. Links im Fließtext
`--accent`, Tipps auf `--accent-soft`.

## Dunkelmodus

- Standard folgt dem Gerät (`prefers-color-scheme`); kennt der Browser das nicht (alte iPads): hell. Hell ist die
  Grundlage im CSS; dunkel kommt nur über `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }`
  und `:root[data-theme="dark"]`.
- Wahl „Automatisch · Hell · Dunkel“ in den Einstellungen, dazu Sonne/Mond in der Fußzeile. Gespeichert unter
  `saiten:darstellung` (gemeinsam für alle Instrumente, `src/store.ts`), angewendet von `src/ui/theme.ts`. Ein kleines
  Skript im Kopf jeder vorgerenderten Seite setzt `data-theme` und `theme-color` vor dem ersten Zeichnen (kein
  Aufblitzen); `color-scheme` folgt.

| Token | Dunkel |
|---|---|
| `--bg` | `#111214` |
| `--surface` | `#1C1D21` |
| `--fill` | `#2C2E33` |
| `--fill-soft` | `#26282C` |
| `--ink` | `#F2F3F5` |
| `--ink-2` | `#A4A7AE` (6,9:1 auf `--surface`) |
| `--ink-3` | `#6B6E76` (nur Deko) |
| `--accent` | `#3FBFA8`, darauf `--on-accent` `#0B1F1C` |
| `--accent-soft` | `#133A34` |
| `--almost` | `#F0A24B` |
| `--fret`, `--seg-on` | `#3A3C42` |
| Bereiche | Lieder `#4C8DFF`, Blues/Rhythmus `#7A7FF0`, Spiele `#E8692B`, Werkzeuge `#6B6E76`, Lernen = `--accent` |

- Keine Schatten im Dunkeln (`--shadow-*: none`); Gruppen heben sich nur über `--surface` vom `--bg` ab.
- Neue Features nur über Tokens (SVG über Klassen + CSS oder `currentColor`), nie feste Hellfarben; in beiden Modi
  prüfen (`DARK=1 node tools/shots.mjs …`).

## Druck

Alles Gedruckte (Liedblatt, Griff-Übersicht, Hals, Lektions-A4, Lehrkräfte-Handout und Strg+P auf jeder Seite) ist
weiß und schwarz – auch im Dunkelmodus (`@media print` setzt die hellen Tokens und erzwingt Schwarz auf
transparentem Grund):

- nur Haarlinien (0,5–1 px bzw. 0,25–0,5 pt), keine gefüllten Flächen, keine grauen Kästen, keine Akzentfarbe, keine
  Hintergrundbilder; Karten werden zu Haarlinien-Rahmen;
- gefüllt bleiben nur kleine Fingerpunkte und QR-Codes, alles andere als Kontur;
- Kopfzeile, Fußzeile, Knöpfe, Schalter, Segmente und Hinweise werden ausgeblendet (Quelle und Adresse stehen im
  Blatt selbst);
- `tests/e2e/darstellung.spec.ts` prüft im Druck-Medium mit dunklem Gerät: weißer Grund, keine Fläche mit Farbe, nur
  schwarze Schrift.

## Checkliste für neue Features

- [ ] Nur Tokens aus `:root`, keine neuen Farben oder Schatten.
- [ ] Startpunkt: als Zeile in der passenden Gruppe der Startseite (Bereichsfarbe aus der Tabelle), nicht als neue
      große Kachel.
- [ ] `screen()` für die Kopfzeile (mit Stimmgerät-Symbol), Fußzeile vorhanden.
- [ ] Genau eine Hauptaktion mit höchstem Kontrast, unter der Bühne in Daumenreichweite.
- [ ] Modi als Segmentschalter, An/Aus als Schalter, Einmal-Einstellungen in den Einstellungen.
- [ ] Neue Texte über `t()` mit Englisch und Französisch.
- [ ] Tippziele ≥ 64 px, Text ≥ 4,5:1, Handy hoch/quer und Tablet geprüft (`node tools/shots.mjs`).
- [ ] Hell UND dunkel geprüft (`DARK=1 node tools/shots.mjs`), Druck weiß ohne Flächen.
- [ ] Gleich auf allen Instrumenten; Unterschiede nur im Inhalt.
