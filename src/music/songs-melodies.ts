// Erzeugt von tools/melody/import.ts aus den Notenbeispielen der Wikipedia-Artikel und tools/melody/abc/ (gemeinfreie
// Melodien; übernommen sind nur Tonhöhen, Dauern, Silben und ggf. Akkordfolgen). Nicht von Hand bearbeiten.

export interface ImportedMelody {
  text: string;
  meter: number;
  pickup: number;
  originalKey: string;
  /** Anteil des Notentexts, der mit unserem geprüften Text übereinstimmt. */
  similarity: number;
  /** Herkunft der Melodie, wird an `origin` angehängt. */
  source: string;
}

export const MELODIES: Record<string, ImportedMelody> = {
  'gedanken-sind-frei': { meter: 3, pickup: 1, originalKey: 'C', similarity: 0.95, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Die:G4:0.5 Ge-:G4:0.5 dan-:C5 ken:C5 sind:E5:0.5 ~:C5:0.5 frei,:G4:2 wer:G4 [G7]kann:F4 sie:D4 er-:G4 [C]ra-:E4 then?:C4
Sie:G4 flie-:C5 gen:C5 vor-:E5:0.5 ~:C5:0.5 bei:G4:2 wie:G4 [G7]nächt-:F4 li-:D4 che:G4 [C]Schat-:E4 ten.:C4
Kein:C5 [G7]Mensch:B4 kann:D5 sie:D5 [C]wis-:C5 sen,:E5 kein:E5 [G7]Jä-:B4 ger:D5 sie:D5 [C]schie-:C5 ßen.:E5
Es:C5 [F]blei-:A4 bet:A4 da-:C5:0.5 ~:A4:0.5 [C]bei:G4:2 Die:G4:0.5 Ge-:E5:0.5 dan-:E5:0.5 ~:D5:0.5 ken:C5 sind:B4 frei.:C5:2` },
  'kein-schoener-land': { meter: 3, pickup: 1.5, originalKey: 'A', similarity: 0.88, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Kein:G4:0.5 schö-:G4:0.5 ner:G4:0.5 Land:C5 in:E5 die-:D5:0.5 ser:C5:0.5 [G7]Zeit,:D5
_:R:0.5 als:G4:0.5 hier:G4:0.5 das:G4:0.5 [C]uns-:C5 re:E5 weit:D5:0.5 und:C5:0.5 [G7]breit,:D5
_:R:0.5 Wo:E5:0.5 wir:C5:0.5 uns:D5:0.5 [C]fin-:E5:0.5 ~:G5:0.5 den:F5:0.5 wohl:E5:0.5 un-:D5:0.5 ter:C5:0.5 [G7]Lin-:D5:0.5 ~:F5:0.5 den:E5:0.5 zur:D5:0.5 A-:C5:0.5 bend-:D5:0.5 [C]zeit!:E5
_:R:0.5 Wo:E5:0.5 wir:C5:0.5 uns:D5:0.5 fin-:E5:0.5 ~:G5:0.5 den:F5:0.5 wohl:E5:0.5 un-:D5:0.5 ter:C5:0.5 [G7]Lin-:D5:0.5 ~:F5:0.5 den:E5:0.5 zur:D5:0.5 A-:C5:0.5 bend-:B4:0.5 [C]zeit!:C5
_:R:0.5` },
  'muss-i-denn': { meter: 4, pickup: 1, originalKey: 'Eb', similarity: 0.85, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Muss:C4:0.5 i:D4:0.5 denn,:E4 muss:E4:0.5 i:G4:0.5 [F]denn:F4 zum:F4:0.5 ~:A4:0.5 [G7]Städ-:G4 te-:G4:0.5 le:F4:0.5 [C]hin-aus,:E4
~:E4 [G7]Städ-:G4 te-:G4:0.5 le:F4:0.5 [C]hin-aus,:E4:0.5 ~:E4:0.5 und:E4:0.5 ~:G4:0.5 [G7]du,:F4
mein:F4 Schatz,:D4 bleibst:G4 [C]hier.:E4:2
_:R Wenn:C4:0.5 i:D4:0.5 komm,:E4 wenn:E4:0.5 i:G4:0.5 [F]komm,:F4 wenn:F4:0.5 i:A4:0.5 [G7]wie-:G4 der-:G4:0.5 um:F4:0.5 [C]komm,:E4
~:E4 [G7]wie-:G4 der-:G4:0.5 um:F4:0.5 [C]komm,:E4:0.5 ~:E4:0.5 kehr:E4:0.5 i:G4:0.5 [G7]ein:F4 mein:F4 Schatz,:D4
bei:G4 [C]dir.:E4:2 _:R Kann:C4:0.5 i:E4:0.5 [G7]glei':D4:1.5 net:E4:0.5 all-:F4 weil:D4 [C]bei:E4:1.5 dir:F4:0.5 sein,:G4
han:G4:0.5 i:G4:0.5 [F]doch:A4 mei:A4 Freud:C5 an:B4:0.5 ~:A4:0.5 [C]dir.:G4:2
_:R Wenn:C4:0.5 i:E4:0.5 komm,:G4 wenn:G4:0.5 i:A4:0.5 komm,:G4 wenn:G4:0.5 i:C5:0.5 [G7]wie-:G4 der-:G4:0.5 um:F4:0.5 [C]komm,:E4:2
[G7]wie-:G4 der-:G4:0.5 um:F4:0.5 [C]komm,:E4 kehr:E4:0.5 i:G4:0.5 [G7]ein:F4 mein:F4 Schatz:D4 bei:G4 [C]dir.:E4:2
_:R` },
  'mond-ist-aufgegangen': { meter: 4, pickup: 1, originalKey: 'F', similarity: 1.00, source: 'nach dem Notenbeispiel im Wikipedia-Artikel „Abendlied (Matthias Claudius)“', text: `
[C]Der:C4 [G]Mond:D4 ist:C4 [F]auf-:F4 ge-:E4 [G]gan-:D4:2 [C]gen,:C4 die:E4 gold-:E4 nen:E4 [F]Stern-:A4 lein:G4 pran-:F4:2 [C]gen:E4 am:E4 Him-:E4 mel:E4 [F]hell:F4 und:E4 [G]klar.:D4:3
[C]Der:C4 [G]Wald:D4 steht:C4 [F]schwarz:F4 und:E4 [G]schwei-:D4:2 [C]get,:C4 und:E4 aus:E4 den:E4 [F]Wie-:A4 sen:G4 stei-:F4:2 [C]get:E4 der:E4 wei-:E4 ße:E4 [F]Ne-:F4 bel:E4 [G]wun-:D4 der-:D4 [C]bar.:C4` },
  'bunt-sind-die-waelder': { meter: 6, pickup: 0, originalKey: 'G', similarity: 1.00, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Bunt:C5:2 sind:C5 schon:C5 ~:B4 die:C5 [G7]Wäl-:D5:3 [C]der,:C5:3 gelb:E5:2 die:E5 Stop-:E5 ~:D5 pel-:E5 [G7]fel-:F5:3 [C]der,:E5:3
[F6]und:D5:2 der:D5 [D7]Herbst:C5 ~:E5 be-:F#4 [G]ginnt.:G4:3
[G7]_:R:3 [C]Ro-:E5:2 te:D5 [Am]Blät-:C5:2 ter:B4 [F]fal-:A4:3 len,:A4:3 [Dm]grau-:F5:2 e:E5 Ne-:D5 ~:E5 bel:C5 [G]wal-:B4:3 [G7]len,:B4:3
[C]küh-:C5 ~:E5 ler:G5 [G7]weht:G4 ~:A4 der:B4 [C]Wind.:C5:3
_:R:3` },
  'jaeger-aus-kurpfalz': { meter: 2, pickup: 0.5, originalKey: 'F', similarity: 0.96, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Der:G4:0.5 Jä-:C5:0.5 ger:E5:0.5 aus:E5:0.5 Kur-:E5:0.5 pfalz,:E5:1.5 der:G5:0.5 [G7]rei-:G5:0.5 tet:F5:0.5 durch:F5:0.5 den:E5:0.5 [C]grü-:E5:0.5 nen:D5:0.5 [G7]Wald,:D5:0.5
er:C5:0.5 schießt:B4:0.5 das:D5:0.5 Wild:D5:0.5 da-:D5:0.5 her,:D5 gleich:G5 [C]wie:E5:0.5 es:E5:0.5 [G7]ihm:D5:0.5 ge-:D5:0.5 [C]fällt.:C5:1.5
Ju-:E5:0.5 hu,:G5:1.5 [G7]Tra-:F5:0.5 [C]ra!:E5:1.5
Gar:G5:0.5 lus-:C5:0.5 tig:G5:0.5 ist:G5:0.5 die:E5:0.5 Jä-:E5:0.5 ge-:D5:0.5 [G7]rei,:D5:0.5
all-:C5:0.5 hier:B4:0.5 auf:D5:0.5 grü-:D5:0.5 ner:D5:0.5 Heid',:D5 all-:G5 [C]hier:E5:0.5 auf:E5:0.5 [G7]grü-:D5:0.5 ner:D5:0.5 [C]Heid'.:C5
_:R:0.5` },
  'bruennlein-fliessen': { meter: 4, pickup: 1, originalKey: 'G', similarity: 0.81, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Wenn:G4 al-:C5 le:C5 [G7]Brünn-:D5 lein:D5 [C]flie-:E5:1.5 ~:D5:0.5 ~:C5 ßen,:E5
[G7]so:F5 muss:E5 man:D5 ~:C5 trin-:D5:2 _:R ken;:G4
[C]wenn:C5 ich:C5 [G7]mein:D5 Schatz:D5 [C]nicht:E5:1.5 ~:D5:0.5 ru-:C5 fen:E5 [G7]darf,:F5
tu:E5 ich:D5 ~:C5 ihm:D5:2 _:R win-:G5 ken.:G4:1.5
Wenn:A4:0.5 ich:G4 mein:B4 [C]Schatz:C5:1.5 nicht:D5:0.5 ru-:C5:2 [G7]fen:D5:2 darf,:G5:2
ju,:G5:1.5 ja,:A5:0.5 ru-:G5 fen:F5 [C]darf,:E5 tu:C5 ich:E5 ~:D5 ihm:C5:2 _:R` },
  'ade-zur-guten-nacht': { meter: 4, pickup: 1, originalKey: 'D', similarity: 0.95, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]A-:G4 de:C4:2 [G7]zur:D4 ~:F4 [C]gu-:E4 ten:E4:0.5 ~:D4:0.5 Nacht!:C4
Jetzt:D4 wird:E4:2 [F]der:F4 ~:A4 [G7]Schluss:G4 ge:G4:0.5 ~:F4:0.5 [C]macht,:E4
dass:G4 ich:G4 muss:F4:0.5 ~:E4:0.5 [G7]schei:F4 ~:G4 [C]den.:E4:2
_:R Im:G4 Som-:E4:2 mer:G4 da:C5 [F]wächst:A4 der:A4:0.5 ~:G4:0.5 Klee,:F4
im:F4 [G7]Win-:D4:2 [F]ter:F4 da:A4 [G7]schneit's:G4 den:G4:0.5 ~:F4:0.5 [C]Schnee,:E4
da:G4 komm:G4 ich:F4:0.5 ~:E4:0.5 [G7]wie:F4 ~:G4 [C]der.:E4:2
_:R` },
  'alle-voegel': { meter: 4, pickup: 0, originalKey: 'D', similarity: 1.00, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Al-:C4:1.5 le:E4:0.5 Vö-:G4 gel:C4 [F]sind:A4 schon:C4:0.5 ~:A4:0.5 [C]da,:G4:2
[G7]al-:F4:1.5 le:G4:0.5 [C]Vö-:E4 gel,:C4 [G7]al-:D4:2 [C]le.:C4
_:R Welch:G5 ein:G4 [G7]Sin-:F4 gen,:F4 [C]Mu-:E4 si-:G4:0.5 ~:E4:0.5 [G7]ziern,:D4:2
Pfei-:G5 fen,:G4 Zwit-:F4 schern,:F4 [C]Ti-:E4 ri-:G4:0.5 ~:E4:0.5 [G7]liern!:D4:2
[C]Früh-:C4:1.5 ling:E4:0.5 will:G4 nun:C4 [F]ein-:A4 mar-:C4:0.5 ~:A4:0.5 [C]schiern,:G4:2
[G7]kommt:F4:1.5 mit:G4:0.5 [C]Sang:E4 und:C4 [G7]Schal-:D4:2 [C]le.:C4
_:R` },
  'kuckuck-und-esel': { meter: 4, pickup: 1, originalKey: 'F', similarity: 0.78, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Der:G4 Ku-:E4 ckuck:G4 und:E4 der:G4 [Dm]E-:F4 sel,:F4 _:R die:F4 [G7]hat-:D4 ten:F4 gro-:D4 ßen:F4 [C]Streit,:E4:2
_:R wer:G4:0.5 ~:F4:0.5 wohl:E4 am:E4 bes-:E4 ten:E4 [Dm]sän-:F4 ge,:F4
_:R wer:F4:0.5 ~:E4:0.5 [G7]wohl:D4 am:D4 bes-:D4 ten:D4 [C]sän-:E4 ge:E4 _:R zur:C4 schö-:C4 nen:D4 [Am]Mai-:E4 en-:F4 [A7]zeit,:G4:1.5
~:A4:0.5 [Dm]~:G4 zur:F4 [G7]schö-:E4 nen:E4 [C]Mai-:D4 en-:D4 zeit.:C4:2
_:R` },
  'schwaebsche-eisebahne': { meter: 2, pickup: 0, originalKey: 'G', similarity: 0.94, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Auf:G4:0.75 de:G4:0.25 schwäb-:G4:0.5 sche:G4:0.5 Ei-:G4:0.5 se-:G4:0.5 bah-:C5:0.5 ne:C5:0.5 gibt’s:A4:0.75 gar:A4:0.25 vie-:A4:0.5 le:A4:0.5 Halt-:A4:0.5 sta-:A4:0.5 [G7]tio-:D5:0.5 ne,:D5:0.5
[C]Schtue-:E5:0.75 gert,:D5:0.25 Ulm:E5:0.5 und:D5:0.5 [G7]Bi-:D5:0.5 ber-:C5:0.5 ach,:G4 Mek-:G4:0.5 ke-:G4:0.5 beu-:A4:0.5 re,:B4:0.5
[C]Dur-:C5:0.5 les-:C5:0.5 bach.:C5 Trul-:G4:0.5 la,:G4:0.5 trul-:G4:0.5 la,:G4:0.5 trul-:G4:0.5 la-:G4:0.5 la,:C5
trul-:A4:0.5 la,:A4:0.5 trul-:A4:0.5 la,:A4:0.5 tru-:A4:0.5 la-:A4:0.5 [G7]la,:D5 [C]Schtue-:E5:0.75 gert,:D5:0.25
Ulm:E5:0.5 und:D5:0.5 [G7]Bi-:D5:0.5 ber-:C5:0.5 ach,:G4 Mek-:G4:0.5 ke-:G4:0.5 beu-:A4:0.5 re,:B4:0.5
[C]Dur-:C5:0.5 les-:C5:0.5 bach.:C5` },
  'es-toenen-die-lieder': { meter: 3, pickup: 1, originalKey: 'F', similarity: 0.88, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Es:G4 tö-:C5 nen:C5 die:C5 [G7]Lie-:D5 der,:G4 der:G4 Früh-:D5 ling:D5 kehrt:D5 [C]wie-:E5 der,:C5
es:G5 spie-:G5 let:E5:0.5 ~:G5:0.5 der:E5:0.5 ~:G5:0.5 [G7]Hir-:F5 te,:D5
auf:F5 sei-:F5 ner:D5:0.5 ~:F5:0.5 Schal-:D5:0.5 ~:F5:0.5 [C]mei:E5:2 La:G5 la:C5:0.5 la:B4:0.5 la:A5:0.5 la:G5:0.5 la:F5:0.5 la:E5:0.5 [G7]la:G5 ~:F5 la:D5 La:B4:0.5 la:C5:0.5 la:D5:0.5 la:E5:0.5 la:F5:0.5 la:D5:0.5 [C]la.:C5:2` },
  'wohlauf-gottes-welt': { meter: 4, pickup: 1, originalKey: 'G', similarity: 0.80, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Wohl-:G4 auf:G4 in:C5 Got-:C5 tes:E5 schö-:E5 ne:G5 Welt,:G5:2
[G7]le-:F5:1.5 be:E5:0.5 wohl,:F5 a-:G5 [C]de!:E5:3
Die:G4 Luft:G4 ist:C5 warm:C5 und:E5 grün:E5 das:G5 Feld,:G5:2
[G7]le-:F5:1.5 be:E5:0.5 wohl,:F5 a-:G5 [C]de!:E5:3
Die:C5 [F]Ber-:C5 ge:A5 glüh’n:A5 wie:A5 [C]E-:A5:1.5 del-:G5:0.5 stein,:G5
[Am]ich:A5:0.5 ~:G5:0.5 [G7]wan-:G5:1.5 dre:F5:0.5 mit:F5 dem:G5 [C]Son-:F5:1.5 nen-:E5:0.5 schein,:E5:2
[G7]la-:D5:1.5 la-:E5:0.5 la-:F5 la,:D5 [C]la-:E5:1.5 la-:F5:0.5 la,:G5 ins:E5 [G7]wei-:G5:1.5 te:F5:0.5 Land:E5 hin-:D5 [C]ein!:C5
[G]~:D5 ~:E5 _:R [G7]la-:D5:1.5 la-:E5:0.5 [C]la-:F5 la,:D5 [G7]la-:E5:1.5 la-:F5:0.5 [C]la,:G5
ins:E5 wei-:G5:1.5 te:F5:0.5 Land:E5 hin-:D5 ein!:C5:2
_:R` },
  'fuchs-gans': { meter: 4, pickup: 0, originalKey: 'D', similarity: 1.00, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Fuchs,:C4 du:D4 hast:E4 die:F4 Gans:G4 ge-:G4 stoh-:G4 len,:G4
[F]gib:A4 sie:F4 wie-:C5 der:A4 [C]her,:G4:4 [F]gib:A4 sie:F4 wie-:C5 der:A4 [C]her,:G4:4
[G7]sonst:G4 wird:F4 dich:F4 der:F4 [C]Jä-:F4 ger:E4 ho-:E4 len:E4 [G7]mit:E4 dem:D4 Schieß-:E4 [C]ge-:D4 wehr,:C4
~:E4 ~:G4:2 [G7]sonst:G4 wird:F4 dich:F4 der:F4 [C]Jä-:F4 ger:E4 ho-:E4 len:E4 [G7]mit:E4 dem:D4 Schieß-:E4 [C]ge-:D4 wehr.:C4:4` },
  'haeschen-grube': { meter: 2, pickup: 0, originalKey: 'D', similarity: 1.00, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Häs-:C4:0.5 chen:D4:0.5 in:E4:0.5 der:F4:0.5 Gru-:G4 be:G4 [F]saß:A4:0.5 ~:F4:0.5 und:C5:0.5 ~:A4:0.5 [C]schlief,:G4
_:R [F]saß:A4:0.5 ~:F4:0.5 und:C5:0.5 ~:A4:0.5 [C]schlief.:G4
_:R [G7]Ar-:G4:0.5 mes:F4:0.5 Häs-:F4:0.5 chen,:F4:0.5 [C]bist:F4:0.5 du:E4:0.5 krank,:E4
[G7]dass:E4:0.5 du:D4:0.5 nicht:E4:0.5 mehr:D4:0.5 [C]hüp-:C4:0.5 fen:E4:0.5 kannst?:G4
Häs-:G4:0.5 chen,:G4:0.5 hüpf!:C5 Häs-:G4:0.5 chen,:G4:0.5 hüpf!:C5
[G7]Häs-:G4 chen,:G4 [C]hüpf!:C4 _:R` },
  'summ-summ': { meter: 2, pickup: 0, originalKey: 'G', similarity: 0.98, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Summ:G4 [G7]summ:F4 [C]summ!:E4 _:R [G7]Bien-:D4:0.5 chen:E4:0.5 summ’:F4:0.5 her-:D4:0.5 [C]um!:C4
_:R ei!:E4:0.5 wir:F4:0.5 thun:G4:0.5 dir:E4:0.5 [G7]nichts:D4:0.5 zu:E4:0.5 Lei-:F4:0.5 de,:D4:0.5
[C]flieg’:E4:0.5 nun:F4:0.5 aus:G4:0.5 in:E4:0.5 [G7]Wald:D4:0.5 und:E4:0.5 Hei-:F4:0.5 de!:D4:0.5
Summ:G4 summ:F4 [C]summ!:E4 _:R [G7]Bien-:D4:0.5 chen:E4:0.5 summ’:F4:0.5 her-:D4:0.5 [C]um!:C4
_:R` },
  'vogelhochzeit': { meter: 2, pickup: 0.5, originalKey: 'G', similarity: 1.00, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Ein:E5:0.5 Vo-:G5:0.5 gel:E5:0.5 woll-:G5:0.5 te:E5:0.5 [G7]Hoch-:F5:0.5 zeit:D5:0.5 ma-:F5:0.5 chen:D5:0.5 in:E5:0.5 [C]dem:C5:0.5 grü-:G5:0.5 nen:E5:0.5 [G]Wal-:D5:0.5 ~:G5:0.5 de.:G5:0.5
Fi-:G5:0.25 di-:E5:0.25 [C]ral-:C5:0.5 la-:C5:0.5 la,:C5:0.5 fi-:G5:0.25 di-:E5:0.25 [G7]ral-:D5:0.5 la-:D5:0.5 la,:D5:0.5
fi-:G5:0.25 di-:F5:0.25 [C]ral-:E5:0.5 la-:C5:0.5 [G7]la-:D5:0.5 la-:B4:0.5 [C]la.:C5
_:R:0.5` },
  'bi-ba-butzemann': { meter: 2, pickup: 0.5, originalKey: 'G', similarity: 0.99, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Es:G4:0.5 tanzt:C5:0.5 ein:C5:0.5 Bi-:G5:0.5 Ba-:G5:0.5 But-:E5:0.5 ze-:E5:0.5 mann:C5:0.5 in:C5:0.5 [G7]un-:D5:0.5 serm:D5:0.5 Haus:G4:0.5 [C]her-:G4:0.5 um,:C5:0.5
fi-:C5:0.25 de-:E5:0.25 bum,:G5:0.5 es:G4:0.5 tanzt:C5:0.5 ein:C5:0.5 Bi-:G5:0.5 Ba-:G5:0.5 But-:E5:0.5 ze-:E5:0.5 mann:C5:0.5 in:C5:0.5 [G7]un-:D5:0.5 serm:D5:0.5 Haus:G4:0.5 [C]her-:G4:0.5 um.:C5
_:R:0.5 Er:E5:0.5 [G7]rüt-:D5:0.75 telt:E5:0.25 sich,:F5:0.5 er:D5:0.5 [C]schüt-:E5:0.75 telt:F5:0.25 sich,:G5:0.5
er:E5:0.5 [G7]wirft:D5:0.75 sein:E5:0.25 Säck-:F5:0.5 lein:D5:0.5 [C]hin-:E5:0.75 ter:F5:0.25 sich.:G5:0.5
Es:G4:0.5 tanzt:C5:0.5 ein:C5:0.5 Bi-:G5:0.5 Ba-:G5:0.5 But-:E5:0.5 ze-:E5:0.5 mann:C5:0.5 in:C5:0.5 [G7]un-:D5:0.5 serm:D5:0.5 Haus:G4:0.5 [C]her-:G4:0.5 um.:C5
_:R:0.5` },
  'haensel-und-gretel': { meter: 4, pickup: 0, originalKey: 'D', similarity: 1.00, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Hän-:G4:2 sel:E4 und:F4 Gre-:G4:2 tel:E4 ver-:C4 [G7]lie-:D4 fen:D4 sich:D4 im:E4 [C]Wald.:C4:3
_:R Es:G4:2 war:E4 so:F4 fin-:G4:2 ster:E4 und:C4 [G7]auch:D4 so:D4 bit-:D4 ter:E4 [C]kalt.:C4:2
_:R Sie:C4 [G7]ka-:D4 men:D4 an:D4 ein:E4 Häus-:F4:2 chen:D4 von:D4 [C]Pfef-:E4 fer-:E4 ku-:E4 chen:F4 fein.:G4:3
_:R Wer:G4:2 mag:E4 der:F4 Herr:G4:2 wohl:E4 von:C4 [G7]die-:D4 sem:D4 Häus-:D4 chen:E4 [C]sein?:C4:3
_:R` },
  'auf-der-mauer': { meter: 2, pickup: 0, originalKey: 'F', similarity: 1.00, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Auf:C4:0.5 der:C4:0.5 Mau-:C4:0.5 er,:D4:0.5 auf:E4:0.5 der:E4:0.5 Lau-:E4:0.5 er:E4:0.5 [G7]sitzt:D4:0.5 ’ne:C4:0.5 klei-:D4:0.5 ne:E4:0.5 [C]Wan-:C4 ze.:C4
Auf:E4:0.5 der:E4:0.5 Mau-:E4:0.5 er,:F4:0.5 auf:G4:0.5 der:G4:0.5 Lau-:G4:0.5 er:G4:0.5 [G7]sitzt:F4:0.5 ’ne:E4:0.5 klei-:F4:0.5 ne:G4:0.5 [C]Wan-:E4 ze.:E4
Seht:G4:0.5 euch:G4:0.5 nur:G4:0.5 die:G4:0.5 [F]Wan-:A4:0.5 ze:A4:0.5 an,:A4 [G7]wie:F4:0.5 die:F4:0.5 Wan-:F4:0.5 ze:F4:0.5 [C]tan-:G4:0.5 zen:G4:0.5 kann!:G4
Auf:C4:0.5 der:C4:0.5 Mau-:C4:0.5 er,:D4:0.5 auf:E4:0.5 der:E4:0.5 Lau-:E4:0.5 er:E4:0.5 [G7]sitzt:D4:0.5 ’ne:C4:0.5 klei-:D4:0.5 ne:E4:0.5 [C]Wan-:C4 ze.:C4` },
  'backe-kuchen': { meter: 4, pickup: 0, originalKey: 'D', similarity: 1.00, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Ba-:G4 cke,:G4 [F]ba-:A4 cke:A4 [C]Ku-:G4:2 chen,:E4 der:C4 Bä-:G4 cker:G4 [F]hat:A4 ge-:A4 [C]ru-:G4:2 fen.:E4:2
Wer:G4 will:G4 [F]gu-:A4 ten:A4 [C]Ku-:G4 chen:G4 ba-:E4 cken,:C4
der:G4 muss:G4 [F]ha-:A4 ben:A4 [C]sie-:G4 ben:G4 Sa-:E4 chen:E4
[G7]Ei-:G4:0.5 er:G4:0.5 und:G4 [C]Schmalz,:E4:2 [G7]Zu-:G4:0.5 cker:G4:0.5 und:G4 [C]Salz,:E4:2
[G7]Milch:G4 und:G4 [C]Mehl,:E4:2 Sa-:G4 fran:G4 [F]macht:A4 den:A4 [C]Ku-:G4 chen:G4 gehl.:E4:2
Schieb,:C5:2 [F]schieb:G4 in'n:F4 [C]O-:E4 [G7]fen:D4 [C]'nein.:C4:2` },
  'gruen-gruen-gruen': { meter: 2, pickup: 0, originalKey: 'G', similarity: 1.00, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Grün,:C5 grün,:C5 [G7]grün:D5 sind:D5 al-:B4:0.5 le:B4:0.5 mei-:A4:0.5 ne:B4:0.5 [C]Klei-:C5 der;:G4
grün,:C5 grün,:C5 [G7]grün:D5 ist:D5 al-:B4:0.5 les:B4:0.5 was:A4:0.5 ich:B4:0.5 [C]hab.:C5
_:R Da-:E5 rum:E5:0.5 ~:G5:0.5 [F]lieb:F5 ich:F5 [G7]al-:D5:0.5 les,:D5:0.5
was:D5:0.5 so:F5:0.5 [C]grün:E5 ist,:E5 weil:C5 mein:C5 [G7]Schatz:D5 ein:D5 Jä-:B4 ger:A4:0.5 ~:B4:0.5 [C]ist.:C5
_:R` },
  'schlaf-kindlein': { meter: 2, pickup: 0, originalKey: 'F', similarity: 0.99, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[F]Schlaf’,:A4 [C7]Kind-:G4:0.5 lein,:G4:0.5 [F]schlaf’!:F4
_:R:0.5 Der:F4:0.25 ~:A4:0.25 [C7]Va-:C5:0.5 ter:C5:0.5 hüt’t:Bb4:0.5 die:Bb4:0.5 [F]Schaf’,:A4
_:R:0.5 die:A4:0.5 [C7]Mut-:Bb4:0.5 ter:Bb4:0.5 schüt-:G4:0.5 telt’s:G4:0.5 [F]Bäu-:C5:0.5 me-:C5:0.5 lein,:A4:0.5
da:A4:0.5 [C7]fällt:Bb4:0.5 her-:Bb4:0.5 ab:G4:0.5 ein:G4:0.5 [F]Träu-:C5:0.5 me-:C5:0.5 lein.:A4
[C7]Schlaf’,:Bb4 Kind-:G4:0.5 lein,:G4:0.5 [F]schlaf’!:F4
_:R` },
  'weisst-du-wie-viel': { meter: 3, pickup: 1, originalKey: 'F', similarity: 1.00, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Weißt:C4:0.5 du,:D4:0.5 wie:E4 viel:E4 [G7]Ster-:F4:0.5 ne:D4:0.5 [C]ste-:A4:0.5 ~:G4:0.5 hen:G4 [A7]an:E4:0.5 dem:G4:0.5 [F]blau-:G4:0.5 ~:F4:0.5 en:F4 [G7]Him-:G4:0.5 mels-:F4:0.5 [C]zelt?:E4:2
Weißt:C4:0.5 du,:D4:0.5 wie:E4 viel:E4 [G7]Wol-:F4:0.5 ken:D4:0.5 [C]ge-:A4:0.5 ~:G4:0.5 hen:G4 [A7]weit-:E4:0.5 hin:G4:0.5 [F]ü-:G4:0.5 ~:F4:0.5 ber:F4 [G7]al-:G4:0.5 le:F4:0.5 [C]Welt?:E4:2
Gott:G4:0.5 der:E4:0.5 [D7]Herr:E4:0.5 ~:D4:0.5 hat:D4 [G7]sie:A4:0.5 ge-:F4:0.5 [C]zäh-:F4:0.5 ~:E4:0.5 let,:E4
dass:G4:0.5 ihm:E4:0.5 [D7]auch:E4:0.5 ~:D4:0.5 nicht:D4 [G7]ei-:A4:0.5 nes:F4:0.5 [C]feh-:F4:0.5 ~:E4:0.5 let,:E4
an:C4:0.5 der:D4:0.5 gan-:E4 zen:E4 [G7]gro-:F4:0.5 ßen:D4:0.5 [C]Zahl,:A4 ~:G4 [A7]an:E4:0.5 der:G4:0.5 [F]gan-:G4:0.5 ~:F4:0.5 zen:F4 [G7]gro-:G4:0.5 ßen:F4:0.5 [C]Zahl.:E4:2` },
  'kuckuck-kuckuck': { meter: 3, pickup: 0, originalKey: 'G', similarity: 0.98, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Kuk-:G4 kuck,:E4 _:R Kuk-:G4 kuck,:E4 _:R [G7]rufts:D4 aus:C4 dem:D4 [C]Wald.:C4:3
[G7]Las-:D4 set:D4 uns:E4 sin-:F4:2 gen,:D4 [C]tan-:E4 zen:E4 und:F4 sprin-:G4:2 gen,:E4
Früh-:G4:2 ling,:E4 Früh-:G4:2 ling:E4 [G7]wird:F4 es:E4 nun:D4 [C]bald.:C4:3` },
  'winter-ade': { meter: 3, pickup: 0, originalKey: 'G', similarity: 0.98, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Win-:E4 ter,:E4 [G7]a-:D4 [C]de!:C4:3
Schei-:E4 den:E4 [G7]thut:D4 [C]weh.:C4:3
A-:E4 ber:F4 dein:G4 [G7]Schei-:G4 den:F4:0.5 ~:E4:0.5 macht,:F4 daß:D4 jetzt:E4 mein:F4 [C]Her-:F4 ze:E4:0.5 ~:D4:0.5 lacht.:E4
Win-:E4 ter,:E4 a-:F4 [G7]de!:G4:3
[C]Schei-:E4 den:E4 [G7]thut:D4 [C]weh.:C4:3` },
  'alles-neu-mai': { meter: 2, pickup: 0, originalKey: 'A', similarity: 0.99, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Al-:G4:0.5 les:E4:0.5 neu:E4 [G7]macht:F4:0.5 der:D4:0.5 Mai,:D4 [C]macht:C4:0.5 die:D4:0.5 See-:E4:0.5 le:F4:0.5 frisch:G4:0.5 und:G4:0.5 frei.:G4
Lasst:G4:0.5 das:E4:0.5 Haus,:E4 [G7]kommt:F4:0.5 he-:D4:0.5 raus!:D4
[C]Win-:C4:0.5 det:E4:0.5 ei-:G4:0.5 nen:G4:0.5 Strauß!:E4
_:R [G7]Rings:D4:0.5 er:D4:0.5 glän-:D4:0.5 zet:D4:0.5 Son-:D4:0.5 nen-:E4:0.5 schein,:F4
[C]duf-:E4:0.5 tend:E4:0.5 pran-:E4:0.5 gen:E4:0.5 Flur:E4:0.5 und:F4:0.5 Hain:G4 Vo-:G4:0.5 gel-:E4:0.5 sang,:E4
[G7]Hör-:F4:0.5 ner-:D4:0.5 klang,:D4 [C]tönt:C4:0.5 den:E4:0.5 Wald:G4:0.5 ent-:G4:0.5 lang.:C4
_:R` },
  'ich-geh-mit-meiner-laterne': { meter: 6, pickup: 1, originalKey: 'G', similarity: 0.78, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Ich:G4 geh’:C5:2 mit:C5 mei-:E5 ner:C5 La-:E5 ter-:G5:3 ne:E5:2 und:C5 [G7]mei-:D5 ne:D5 La-:D5 ter-:D5 ne:E5 mit:D5 [C]mir.:C5:3
_:R:2 Da:G4 o-:C5:2 ben:C5 leuch-:E5 ten:C5 die:E5 Ster-:G5:3 ne:E5:2 und:C5 [G7]un-:D5:2 ten:D5 da:D5 leuch-:E5 ten:D5 [C]wir.:C5:3
_:R:2 Mein:E5 Licht:G5:2 ist:E5 aus,:C5:2 ich:E5 geh’:G5:2 nach:E5 Haus.:C5:2
ra-:C5 [G7]bimm-:D5 el,:D5 ra-:D5 bamm-:D5 el,:E5 ra-:D5 [C]bum.:C5:3
_:R:2 Mein:E5 Licht:G5:2 ist:E5 aus,:C5:2 ich:E5 geh’:G5:2 nach:E5 Haus.:C5:2
ra-:C5 [G7]bimm-:D5 el,:D5 ra-:D5 bamm-:D5 el,:E5 ra-:D5 [C]bum.:C5:3
_:R:2` },
  'alle-jahre-wieder': { meter: 4, pickup: 0, originalKey: 'D', similarity: 1.00, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Al-:G4:1.5 le:A4:0.5 Jah-:G4 re:F4 wie-:E4:2 [G7]der:D4:2 [C]kommt:C4 das:D4:0.5 ~:E4:0.5 Chris-:F4 tus-:E4 [G7]kind:D4:3 _:R [C]auf:E4 die:G4 Er-:A4 de:G4 [F]nie-:C5:2 [G7]der,:B4
~:A4 [C]wo:G4 wir:F4:0.5 ~:E4:0.5 [G7]Men-:F4 schen:G4 [C]sind.:E4:3
_:R` },
  'ihr-kinderlein-kommet': { meter: 2, pickup: 0.5, originalKey: 'D', similarity: 0.99, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Ihr:G4:0.5 Kin-:G4 der-:E4:0.5 lein,:G4:0.5 kom-:G4 met,:E4:0.5 o:G4:0.5 [G7]kom-:F4 met:D4:0.5 doch:F4:0.5 [C]all!:E4
_:R:0.5 Zur:G4:0.5 Krip-:G4 pe:E4:0.5 her:G4:0.5 kom-:G4 met:E4:0.5 in:G4:0.5 [G7]Beth-:F4 le-:D4:0.5 hems:F4:0.5 [C]Stall:E4 _:R:0.5 und:E4:0.5 [G7]seht,:D4
was:D4:0.5 in:D4:0.5 die-:F4 ser:F4:0.5 hoch-:F4:0.5 [C]hei-:E4 li-:E4:0.5 gen:E4:0.5 [F]Nacht:A4 _:R:0.5 der:A4:0.5 [C]Va-:G4 ter:G4:0.5 im:G4:0.5 Him-:C5 mel:G4:0.5 für:E4:0.5 [G7]Freu-:F4 de:D4:0.5 uns:B4:0.5 [C]macht!:C4:1.5` },
  'o-tannenbaum': { meter: 3, pickup: 0.5, originalKey: 'G', similarity: 1.00, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]O:G4:0.5 Tan-:C5:0.75 nen-:C5:0.25 baum,:C5 [G]o:D5 [C]Tan-:E5:0.75 nen-:E5:0.25 baum!:E5:1.5
Wie:E5:0.5 [Dm]treu:D5:0.5 sind:E5:0.5 dei-:F5 [G7]ne:B4 Blät-:D5 [C]ter;:C5
_:R:0.5 du:G5:0.5 [C7]grünst:G5:0.5 nicht:E5:0.5 [F]nur:A5:1.5 zur:G5:0.5 [G7]Som-:G5:0.5 mer-:F5:0.5 zeit,:F5:1.5
nein,:F5:0.5 auch:F5:0.5 im:D5:0.5 Win-:G5:1.5 ter,:F5:0.5 [C]wenn:F5:0.5 es:E5:0.5 schneit.:E5
O:G4:0.5 Tan-:C5:0.75 nen-:C5:0.25 baum,:C5 [G]o:D5 [C]Tan-:E5:0.75 nen-:E5:0.25 baum,:E5:1.5
wie:E5:0.5 [Dm]treu:D5:0.5 sind:E5:0.5 dei-:F5 [G7]ne:B4 Blät-:D5 [C]ter.:C5
_:R:0.5` },
  'kling-gloeckchen': { meter: 2, pickup: 0, originalKey: 'F', similarity: 1.00, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[F]Kling,:C5 Glöck-:A4:0.5 chen,:B4:0.5 klin-:C5:0.25 ge-:D5:0.25 lin-:C5:0.25 ge-:D5:0.25 ling,:C5
[G7]kling,:B4 [C7]Glöck-:G4:0.5 chen,:C5:0.5 [F]kling!:A4:2
[C7]Lasst:G4:0.5 mich:G4:0.5 [F]ein,:A4:0.5 ihr:F4:0.5 Kin-:A4 [C7]der,:G4 [G7]ist:B4:0.5 so:B4:0.5 [C7]kalt:C5:0.5 der:G4:0.5 [G7]Win-:B4 [F]ter,:A4
[C7]öff-:G4:0.5 net:G4:0.5 [F]mir:A4:0.5 die:C5 [C7]Tü-:G4 [F]ren,:A4:0.5 [G7]lasst:D5:0.5 mich:C5:0.5 nicht:D5 [F]er-:C5 frie-:C5 ren!:A4:0.5
Kling,:B4:0.5 Glöck-:C5:0.25 chen,:D5:0.25 klin-:C5:0.25 ge-:D5:0.25 lin-:C5 [G7]ge-:B4 [C7]ling,:G4:0.5
kling,:C5:0.5 [F]Glöck-:A4:2` },
  'leise-rieselt': { meter: 6, pickup: 0, originalKey: 'G', similarity: 0.96, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Lei-:E5:2 se:E5 rie-:D5 selt:E5 der:D5 Schnee,:C5:5 _:R [F]still:C5:2 und:A4 starr:C5 [G7]liegt:B4 der:A4 [C]See,:G4:5
_:R [G7]weih-:D5 nacht-:C#5 lich:D5 glän-:F5 zet:E5 der:D5 [C]Wald:C5:5
_:R [Dm]Freu-:D5:1.5 e:A4:0.5 dich,:A4 [G7]Christ-:B4 kind:A4 kommt:B4 [C]bald.:C5:5
_:R` },
  'lasst-uns-froh': { meter: 4, pickup: 0, originalKey: 'C', similarity: 1.00, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Lasst:G4 uns:G4 froh:G4:0.5 ~:A4:0.5 und:G4:0.5 ~:F4:0.5 mun-:E4 ter:E4 sein:E4 _:R [G7]und:F4 uns:F4 recht:F4:0.5 ~:G4:0.5 von:F4:0.5 ~:E4:0.5 Her-:D4 zen:D4 freun!:D4
_:R [C]Lus-:C4 tig,:D4 lus-:E4 tig,:F4 tra-:G4:0.5 le-:A4:0.5 ra-:G4:0.5 le-:A4:0.5 ra!:G4
_:R Bald:C5 ist:G4 Ni-:G4:0.5 ko-:A4:0.5 laus-:G4:0.5 ~:F4:0.5 [G7]a-:E4 bend:D4 da,:G4
_:R [C]bald:C5 ist:G4 Ni-:G4:0.5 ko-:A4:0.5 laus-:G4:0.5 ~:F4:0.5 [G7]a-:E4 bend:D4 [C]da!:C4
_:R` },
  'morgen-kinder': { meter: 2, pickup: 0, originalKey: 'G', similarity: 0.98, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Mor-:C5:0.5 gen,:G4:0.5 Kin-:A4:0.5 der,:G4:0.5 [G7]wird’s:A4:0.25 ~:C5:0.25 was:B4:0.25 ~:D5:0.25 [C]ge-:C5:0.5 ben,:G4:0.5
mor-:E5:0.5 gen:E5:0.25 ~:F5:0.25 wer-:G5:0.5 den:E5:0.5 [G7]wir:F5:0.5 uns:E5:0.5 freu’n!:D5
[C]Wel-:C5:0.5 che:G4:0.5 Won-:A4:0.5 ne,:G4:0.5 [G7]welch:A4:0.25 ~:C5:0.25 ein:B4:0.25 ~:D5:0.25 [C]Le-:C5:0.5 ben:G4:0.5 wird:E5:0.5 in:E5:0.25 ~:F5:0.25 un-:G5:0.5 serm:E5:0.5 [G7]Hau-:F5:0.5 se:E5:0.5 sein!:D5
[F]Ein-:F5:0.5 mal:F5:0.5 wer-:A5:0.5 den:A5:0.5 [G7]wir:D5:0.5 noch:D5:0.5 wach,:G5 [F]hei-:C5:0.5 ßa,:C5:0.5
dann:F5:0.5 ist:F5:0.5 [C]Weih-:E5:0.25 ~:D5:0.25 [G7]nachts-:C5:0.25 ~:B4:0.25 [C]tag!:C5` },
  'o-du-froehliche': { meter: 4, pickup: 0, originalKey: 'C', similarity: 1.00, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]O:G4:2 [F]du:A4:2 [G7]fröh-:G4:1.5 li-:F4:0.5 [C]che,:E4 ~:F4 o:G4:2 [F]du:A4:2 [G7]se-:G4:1.5 li-:F4:0.5 [C]ge,:E4
~:F4 gna-:G4:2 den-:G4:2 [F]brin-:A4:2 [G7]gen-:B4 de:C5 Weih-:B4:2 [F]nachts-:A4:2 [C]zeit!:G4:4
[G7]Welt:D4:1.5 ~:E4:0.5 ging:D4 ver-:E4 lo-:F4:1.5 ~:G4:0.5 ren,:F4:2 [C]Christ:E4:1.5 ~:F4:0.5 ist:E4 ge-:F4 bo-:G4:1.5 ~:A4:0.5 ren:G4:2
Freu-:C5 ~:B4 [F]e,:A4 ~:G4 freu-:C5 e:A4 [G7]dich,:G4 o:F4 [C]Chris-:E4:2 [G7]ten-:D4:2 [C]heit!:C4:4` },
  'suesser-die-glocken': { meter: 6, pickup: 0, originalKey: 'F', similarity: 1.00, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Sü-:E4:1.5 ßer:E4:0.5 die:E4 Glo-:E4 cken:D4 nie:E4 klin-:G4:3 [G7]gen,:D4:3
Als:D4:1.5 zu:D4:0.5 der:D4 Weih-:D4 ~:C4 nachts-:D4 [C]zeit,:E4:4 _:R _:R Ist,:G4:1.5
als:G4:0.5 ob:G4 En-:G4 ge-:E4 lein:C4 sin-:C5:3 [F]gen:A4:3 [C]Wie-:G4:1.5 der:A4:0.5 von:G4 [G7]Frie-:G4 den:F4 und:D4 [C]Freud',:C4:5
_:R [G7]Wie:D4:1.5 sie:D4:0.5 ge-:D4 [C]sun-:E4 gen:E4 in:E4 [G7]se-:G4:1.5 li-:F4:0.5 ger:D4 [C]Nacht,:E4:3
[G7]Wie:D4:1.5 sie:D4:0.5 ge-:D4 [C]sun-:E4 gen:E4 in:E4 [G7]se-:G4:1.5 li-:F4:0.5 ger:D4 [C]Nacht,:E4:3
Glo-:G4:1.5 cken:F4:0.5 mit:E4 hei-:E4 li-:D4 gem:C4 Klang,:C5:3 [F]~:A4:3 [C]Klingt:G4:1.5 doch:A4:0.5 die:G4 [G7]Er-:G4 de:F4 ent-:D4 [C]lang!:C4:5
_:R` },
  'kommet-ihr-hirten': { meter: 3, pickup: 0, originalKey: 'F', similarity: 1.00, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Kom-:G4 met,:G4:0.5 ~:E4:0.5 ihr:A4:0.5 ~:F4:0.5 Hir-:G4 ten,:G4:0.5 ~:E4:0.5 ihr:A4:0.5 ~:F4:0.5 Män-:G4 ner:E4:0.5 ~:G4:0.5 [G7]und:D4:0.5 ~:E4:0.5 [C]Fraun,:C4:3
Kom-:G4 met,:G4:0.5 ~:E4:0.5 das:A4:0.5 ~:F4:0.5 lieb-:G4 li-:G4:0.5 ~:E4:0.5 che:A4:0.5 ~:F4:0.5 Kind-:G4 lein:E4:0.5 ~:G4:0.5 [G7]zu:D4:0.5 ~:E4:0.5 [C]schaun,:C4:3
Chri-:C4 stus,:E4:0.5 der:C4:0.5 Herr,:E4:0.5 ist:G4:0.5 [F]heu-:C5 te:E5:0.5 ge-:C5:0.5 [G7]bo-:D5:0.5 ren,:G4:0.5
[C]Den:C5 Gott:E5:0.5 zum:C5:0.5 Hei-:E5:0.5 land:G5:0.5 [F]euch:C5 hat:E5:0.5 er-:C5:0.5 [G7]ko-:D5:0.5 ren.:G4:0.5
[C]Fürch-:G5 tet:E5:0.5 ~:G5:0.5 [G7]euch:D5:0.5 ~:E5:0.5 [C]nicht!:C5:2
_:R` },
  'clementine': { meter: 3, pickup: 1, originalKey: 'G', similarity: 0.95, source: 'nach „College Songs (Waite, 1887)“ (Wikisource)', text: `
[C]In:C5:0.75 a:C5:0.25 cav-:C5 ern,:G4 in:E5:0.75 a:E5:0.25 can-:E5 on,:C5
Ex-:C5:0.5 ca-:E5:0.5 vat-:G5 ing:G5 for:F5:0.5 a:E5:0.5 [G7]mine,:D5:2 Dwelt:D5:0.75 a:E5:0.25 min-:F5 er,:F5
for-:E5:0.75 ty-:D5:0.25 [C]nin-:E5 er,:C5 And:C5:0.75 his:E5:0.25 daugh-:D5 ter,:G4
[G7]Cle-:B4:0.75 men-:D5:0.25 [C]tine.:C5:2` },
  'my-bonnie': { meter: 3, pickup: 1, originalKey: 'G', similarity: 1.00, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]My:G4 Bon-:E5 nie:D5 lies:C5 [F]o-:D5 ver:C5 the:A4 [C]o-:G4 cean.:E4:4
My:G4 Bon-:E5 nie:D5 lies:C5 [D7]o-:C5 ver:B4 the:C5 [G7]sea.:D5:5
My:G4 [C]Bon-:E5 nie:D5 lies:C5 [F]o-:D5 ver:C5 the:A4 [C]o-:G4 cean.:E4:4
Oh,:G4 [F]bring:A4 back:D5 my:C5 [G7]Bon-:B4 nie:A4 to:B4 [C]me.:C5:5
_:R Bring:G4:3 [C7]back,:C5:3 [F]bring:A4:3 [D7]back,:D5:3 [G7]bring:B4 back:B4 my:B4 Bon-:B4 nie:A4 to:B4 [C]me,:C5:2
to:D5 me.:E5:3 Bring:G4:3 [C7]back,:C5:3 [F]bring:A4:3 [D7]back,:D5:3 [G7]bring:B4 back:B4 my:B4 Bon-:B4 nie:A4 to:B4 [C]me.:C5:6` },
  'michael-row': { meter: 4, pickup: 2, originalKey: 'C', similarity: 0.77, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Mi-:C4 chael,:E4 row:G4:1.5 the:E4:0.5 boat:G4 a-:A4 shore,:G4:2 Hal-:E4 le-:G4 [F]lu-:A4:4 [C]jah!:G4:2
Mi-:E4 chael,:G4 row:G4:1.5 the:E4:0.5 [F]boat:F4 a-:E4 [G7]shore,:D4:2 [C]Hal-:C4 le-:D4 lu-:E4:2 [G7]~:D4:2 [C]jah!:C4:2` },
  'amazing-grace': { meter: 3, pickup: 1, originalKey: 'G', similarity: 1.00, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]A-:G4 ma-:C5:2 zing:E5:0.5 ~:C5:0.5 grace!:E5:2
How:D5 [F]sweet:C5:2 the:A4 [C]sound,:G4:2 that:G4 saved:C5:2 a:E5:0.5 ~:C5:0.5 wretch:E5:2 like:D5 [G7]me!:G5:2
I:E5 [C]once:G5:1.5 ~:E5:0.5 was:G5:0.5 ~:E5:0.5 lost,:C5:2 but:G4 [F]now:A4:1.5 ~:C5:0.5 am:C5:0.5 ~:A4:0.5 [C]found.:G4:2
Was:G4 [Am]blind,:C5:2 but:E5:0.5 ~:C5:0.5 [G7]now:E5:2 I:D5 [C]see.:C5:3` },
  'auld-lang-syne': { meter: 4, pickup: 1, originalKey: 'F', similarity: 0.98, source: 'nach dem Notenbeispiel im Wikipedia-Artikel', text: `
[C]Should:G4 auld:C5:1.5 ac-:C5:0.5 quain-:C5 tance:E5 [G7]be:D5:1.5 for-:C5:0.5 got,:D5
and:E5 [C]ne-:C5:1.5 ver:C5:0.5 brought:E5 to:G5 [F]mind?:A5:3
Should:A5 [C]auld:G5:1.5 ac-:E5:0.5 quain-:E5 tance:C5 [G7]be:D5:1.5 for-:C5:0.5 got,:D5
and:E5 [F]auld:C5:1.5 ~:A4:0.5 lang:A4 ~:G4 syne?:C5:3
For:A5 [C]auld:G5:1.5 ~:E5:0.5 lang:E5 ~:C5 [G7]syne,:D5:1.5 my:C5:0.5 jo,:D5
for:A5 [C]auld:G5:1.5 ~:E5:0.5 lang:E5 ~:G5 [F]syne,:A5:3 we'll:A5 [C]tak':G5:1.5 a:E5:0.5 cup:E5 o':C5 [G7]kind-:D5:1.5 ness:C5:0.5 yet,:D5
for:E5 [F]auld:C5:1.5 ~:A4:0.5 lang:A4 ~:G4 [C]syne.:C5:3` },
};
