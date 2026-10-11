// Erzeugt von tools/melody/import.ts aus den Notenbeispielen der Wikipedia-Artikel und tools/melody/abc/ (gemeinfreie
// Melodien; übernommen sind nur Tonhöhen, Dauern und ggf. Akkordfolgen, die Silben stammen aus dem belegten Liedtext,
// s. tools/melody/relyric.ts). Nicht von Hand bearbeiten.

export interface ImportedMelody {
  text: string;
  meter: number;
  pickup: number;
  originalKey: string;
  /** Anteil des Notentexts, der mit unserem geprüften Text übereinstimmt. */
  similarity: number;
  /** Herkunft der Melodie, wird an `origin` angehängt. */
  source: string;
  /** Adresse der Quelle (Permalink auf die verwendete Fassung des Notenbeispiels). */
  url: string;
}

export const MELODIES: Record<string, ImportedMelody> = {
  'gedanken-sind-frei': { meter: 3, pickup: 1, originalKey: 'C', similarity: 0.95, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Die Gedanken sind frei“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Die_Gedanken_sind_frei&oldid=270100198', text: `
[C]Die:G4:0.5 Ge-:G4:0.5 dan-:C5 ken:C5 sind:E5:0.5 ~:C5:0.5 frei,:G4:2 wer:G4 [G7]kann:F4 sie:D4 er-:G4 [C]ra-:E4 ten?:C4
Sie:G4 flie-:C5 gen:C5 vor-:E5:0.5 ~:C5:0.5 bei:G4:2 wie:G4 [G7]nächt-:F4 li-:D4 che:G4 [C]Schat-:E4 ten.:C4
Kein:C5 [G7]Mensch:B4 kann:D5 sie:D5 [C]wis-:C5 sen,:E5 kein:E5 [G7]Jä-:B4 ger:D5 sie:D5 [C]schie-:C5 ßen.:E5
Es:C5 [F]blei-:A4 bet:A4 da-:C5:0.5 ~:A4:0.5 [C]bei:G4:2 Die:G4:0.5 Ge-:E5:0.5 dan-:E5:0.5 ~:D5:0.5 ken:C5 sind:B4 frei!:C5:2` },
  'kein-schoener-land': { meter: 3, pickup: 1.5, originalKey: 'A', similarity: 0.88, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Kein schöner Land in dieser Zeit“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Kein_sch%C3%B6ner_Land_in_dieser_Zeit&oldid=270747011', text: `
[C]Kein:G4:0.5 schö-:G4:0.5 ner:G4:0.5 Land:C5 in:E5 die-:D5:0.5 ser:C5:0.5 [G7]Zeit:D5
_:R:0.5 als:G4:0.5 hier:G4:0.5 das:G4:0.5 [C]uns-:C5 re:E5 weit:D5:0.5 und:C5:0.5 [G7]breit,:D5
_:R:0.5 wo:E5:0.5 wir:C5:0.5 uns:D5:0.5 [C]fin-:E5:0.5 ~:G5:0.5 den:F5:0.5 wohl:E5:0.5 un-:D5:0.5 tern:C5:0.5 [G7]Lin-:D5:0.5 ~:F5:0.5 den:E5:0.5 zur:D5:0.5 A-:C5:0.5 bend-:D5:0.5 [C]zeit.:E5
_:R:0.5 wo:E5:0.5 wir:C5:0.5 uns:D5:0.5 fin-:E5:0.5 ~:G5:0.5 den:F5:0.5 wohl:E5:0.5 un-:D5:0.5 tern:C5:0.5 [G7]Lin-:D5:0.5 ~:F5:0.5 den:E5:0.5 zur:D5:0.5 A-:C5:0.5 bend-:B4:0.5 [C]zeit.:C5
_:R:0.5` },
  'muss-i-denn': { meter: 4, pickup: 1, originalKey: 'Eb', similarity: 0.85, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Muss i denn, muss i denn zum Städtele hinaus“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Muss_i_denn%2C_muss_i_denn_zum_St%C3%A4dtele_hinaus&oldid=251252286', text: `
[C]Muss:C4:0.5 i:D4:0.5 denn,:E4 muss:E4:0.5 i:G4:0.5 [F]denn:F4 zum:F4:0.5 ~:A4:0.5 [G7]Städ-:G4 te-:G4:0.5 le:F4:0.5 [C]naus,:E4
~:E4 [G7]Städ-:G4 te-:G4:0.5 le:F4:0.5 [C]naus,:E4:0.5 ~:E4:0.5 und:E4:0.5 ~:G4:0.5 [G7]du,:F4
mein:F4 Schatz,:D4 bleibst:G4 [C]hier?:E4:2
_:R Wenn:C4:0.5 i:D4:0.5 komm,:E4 wenn:E4:0.5 i:G4:0.5 [F]komm,:F4 wenn:F4:0.5 i:A4:0.5 [G7]wie-:G4 ~:G4:0.5 drum:F4:0.5 [C]komm,:E4
~:E4 [G7]wie-:G4 ~:G4:0.5 drum:F4:0.5 [C]komm,:E4:0.5 ~:E4:0.5 kehr:E4:0.5 i:G4:0.5 [G7]ein,:F4 mein:F4 Schatz,:D4
bei:G4 [C]dir.:E4:2 _:R Kann:C4:0.5 i:E4:0.5 [G7]gleich:D4:1.5 net:E4:0.5 all-:F4 weil:D4 [C]bei:E4:1.5 dir:F4:0.5 sein,:G4
han:G4:0.5 i:G4:0.5 [F]doch:A4 mein:A4 Freud:C5 an:B4:0.5 ~:A4:0.5 [C]dir;:G4:2
_:R wenn:C4:0.5 i:E4:0.5 komm,:G4 wenn:G4:0.5 i:A4:0.5 komm,:G4 wenn:G4:0.5 i:C5:0.5 [G7]wie-:G4 ~:G4:0.5 drum:F4:0.5 [C]komm,:E4:2
[G7]wie-:G4 ~:G4:0.5 drum:F4:0.5 [C]komm,:E4 kehr:E4:0.5 i:G4:0.5 [G7]ein,:F4 mein:F4 Schatz,:D4 bei:G4 [C]dir.:E4:2
_:R` },
  'bunt-sind-die-waelder': { meter: 6, pickup: 0, originalKey: 'G', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Bunt sind schon die Wälder“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Bunt_sind_schon_die_W%C3%A4lder&oldid=265580824', text: `
[C]Bunt:C5:2 sind:C5 schon:C5 ~:B4 die:C5 [G7]Wäl-:D5:3 [C]der,:C5:3 gelb:E5:2 die:E5 Stop-:E5 ~:D5 pel-:E5 [G7]fel-:F5:3 [C]der,:E5:3
[F6]und:D5:2 der:D5 [D7]Herbst:C5 ~:E5 be-:F#4 [G]ginnt.:G4:3
[G7]_:R:3 [C]Ro-:E5:2 te:D5 [Am]Blät-:C5:2 ter:B4 [F]fal-:A4:3 len,:A4:3 [Dm]grau-:F5:2 e:E5 Ne-:D5 ~:E5 bel:C5 [G]wal-:B4:3 [G7]len,:B4:3
[C]küh-:C5 ~:E5 ler:G5 [G7]weht:G4 ~:A4 der:B4 [C]Wind.:C5:3
_:R:3` },
  'jaeger-aus-kurpfalz': { meter: 2, pickup: 0.5, originalKey: 'F', similarity: 0.96, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Ein Jäger aus Kurpfalz“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Ein_J%C3%A4ger_aus_Kurpfalz&oldid=265337715', text: `
[C]Ein:G4:0.5 Jä-:C5:0.5 ger:E5:0.5 aus:E5:0.5 Kur-:E5:0.5 pfalz,:E5:1.5 der:G5:0.5 [G7]rei-:G5:0.5 tet:F5:0.5 durch:F5:0.5 den:E5:0.5 [C]grü-:E5:0.5 nen:D5:0.5 [G7]Wald,:D5:0.5
er:C5:0.5 schießt:B4:0.5 das:D5:0.5 Wild:D5:0.5 da-:D5:0.5 her,:D5 gleich:G5 [C]wie:E5:0.5 es:E5:0.5 [G7]ihm:D5:0.5 ge-:D5:0.5 [C]fällt.:C5:1.5
Ju-:E5:0.5 ja,:G5:1.5 [G7]ju-:F5:0.5 [C]ja,:E5:1.5
gar:G5:0.5 lus-:C5:0.5 tig:G5:0.5 ist:G5:0.5 die:E5:0.5 Jä-:E5:0.5 ge-:D5:0.5 [G7]rei:D5:0.5
all-:C5:0.5 hier:B4:0.5 auf:D5:0.5 grü-:D5:0.5 ner:D5:0.5 Heid,:D5 all-:G5 [C]hier:E5:0.5 auf:E5:0.5 [G7]grü-:D5:0.5 ner:D5:0.5 [C]Heid.:C5
_:R:0.5` },
  'ade-zur-guten-nacht': { meter: 4, pickup: 1, originalKey: 'D', similarity: 0.95, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Ade zur guten Nacht“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Ade_zur_guten_Nacht&oldid=261224846', text: `
[C]A-:G4 de:C4:2 [G7]zur:D4 ~:F4 [C]gu-:E4 ten:E4:0.5 ~:D4:0.5 Nacht!:C4
Jetzt:D4 ist:E4:2 [F]der:F4 ~:A4 [G7]Schluss:G4 ge-:G4:0.5 ~:F4:0.5 [C]macht,:E4
dass:G4 ich:G4 muss:F4:0.5 ~:E4:0.5 [G7]schei-:F4 ~:G4 [C]den.:E4:2
_:R Im:G4 Som-:E4:2 mer:G4 ~:C5 [F]wächst:A4 der:A4:0.5 ~:G4:0.5 Klee,:F4
im:F4 [G7]Win-:D4:2 [F]ter:F4 ~:A4 [G7]schneit’s:G4 den:G4:0.5 ~:F4:0.5 [C]Schnee,:E4
ich:G4 muss:G4 dich:F4:0.5 ~:E4:0.5 [G7]mei-:F4 ~:G4 [C]den.:E4:2
_:R` },
  'alle-voegel': { meter: 4, pickup: 0, originalKey: 'D', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Alle Vögel sind schon da“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Alle_V%C3%B6gel_sind_schon_da&oldid=268278777', text: `
[C]Al-:C4:1.5 le:E4:0.5 Vö-:G4 gel:C4 [F]sind:A4 schon:C4:0.5 ~:A4:0.5 [C]da,:G4:2
[G7]al-:F4:1.5 le:G4:0.5 [C]Vö-:E4 gel,:C4 [G7]al-:D4:2 [C]le!:C4
_:R Welch:G5 ein:G4 [G7]Sin-:F4 gen,:F4 [C]Mu-:E4 si-:G4:0.5 ~:E4:0.5 [G7]ziern,:D4:2
Pfei-:G5 fen,:G4 Zwit-:F4 schern,:F4 [C]Ti-:E4 re-:G4:0.5 ~:E4:0.5 [G7]liern!:D4:2
[C]Früh-:C4:1.5 ling:E4:0.5 will:G4 nun:C4 [F]ein-:A4 mar-:C4:0.5 ~:A4:0.5 [C]schiern,:G4:2
[G7]kommt:F4:1.5 mit:G4:0.5 [C]Sang:E4 und:C4 [G7]Schal-:D4:2 [C]le.:C4
_:R` },
  'kuckuck-und-esel': { meter: 4, pickup: 1, originalKey: 'F', similarity: 0.78, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Der Kuckuck und der Esel“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Der_Kuckuck_und_der_Esel&oldid=262888666', text: `
[C]Der:G4 Ku-:E4 ckuck:G4 und:E4 der:G4 [Dm]E-:F4 sel,:F4 _:R die:F4 [G7]hat-:D4 ten:F4 gro-:D4 ßen:F4 [C]Streit,:E4:2
_:R wer:G4:0.5 ~:F4:0.5 wohl:E4 am:E4 bes-:E4 ten:E4 [Dm]sän-:F4 ge:F4
_:R wer:F4:0.5 ~:E4:0.5 [G7]wohl:D4 am:D4 bes-:D4 ten:D4 [C]sän-:E4 ge:E4 _:R zur:C4 schö-:C4 nen:D4 [Am]Mai-:E4 en-:F4 [A7]zeit.:G4:1.5
~:A4:0.5 [Dm]~:G4 zur:F4 [G7]schö-:E4 nen:E4 [C]Mai-:D4 en-:D4 zeit.:C4:2
_:R` },
  'es-toenen-die-lieder': { meter: 3, pickup: 1, originalKey: 'F', similarity: 0.88, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Es tönen die Lieder“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Es_t%C3%B6nen_die_Lieder&oldid=264877700', text: `
[C]Es:G4 tö-:C5 nen:C5 die:C5 [G7]Lie-:D5 der,:G4 der:G4 Früh-:D5 ling:D5 kehrt:D5 [C]wie-:E5 der,:C5
es:G5 lie-:G5 delt:E5:0.5 ~:G5:0.5 der:E5:0.5 ~:G5:0.5 [G7]Hir-:F5 te:D5
auf:F5 sei-:F5 ner:D5:0.5 ~:F5:0.5 Schal-:D5:0.5 ~:F5:0.5 [C]mei:E5:2 La:G5 la:C5:0.5 la:B4:0.5 la:A5:0.5 la:G5:0.5 la:F5:0.5 la:E5:0.5 [G7]la:G5 ~:F5 ~:D5 la:B4:0.5 la:C5:0.5 la:D5:0.5 la:E5:0.5 la:F5:0.5 la:D5:0.5 [C]la!:C5:2` },
  'fuchs-gans': { meter: 4, pickup: 0, originalKey: 'D', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Fuchs, du hast die Gans gestohlen“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Fuchs%2C_du_hast_die_Gans_gestohlen&oldid=246341239', text: `
[C]Fuchs,:C4 du:D4 hast:E4 die:F4 Gans:G4 ge-:G4 stoh-:G4 len,:G4
[F]gib:A4 sie:F4 wie-:C5 der:A4 [C]her!:G4:4 [F]Gib:A4 sie:F4 wie-:C5 der:A4 [C]her!:G4:4
[G7]Sonst:G4 wird:F4 dich:F4 der:F4 [C]Jä-:F4 ger:E4 ho-:E4 len:E4 [G7]mit:E4 dem:D4 Schieß-:E4 [C]ge-:D4 wehr,:C4
~:E4 ~:G4:2 [G7]sonst:G4 wird:F4 dich:F4 der:F4 [C]Jä-:F4 ger:E4 ho-:E4 len:E4 [G7]mit:E4 dem:D4 Schieß-:E4 [C]ge-:D4 wehr.:C4:4` },
  'haeschen-grube': { meter: 2, pickup: 0, originalKey: 'D', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Häschen in der Grube“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=H%C3%A4schen_in_der_Grube&oldid=244590953', text: `
[C]Häs-:C4:0.5 chen:D4:0.5 in:E4:0.5 der:F4:0.5 Gru-:G4 be:G4 [F]saß:A4:0.5 ~:F4:0.5 und:C5:0.5 ~:A4:0.5 [C]schlief,:G4
_:R [F]saß:A4:0.5 ~:F4:0.5 und:C5:0.5 ~:A4:0.5 [C]schlief.:G4
_:R [G7]Ar-:G4:0.5 mes:F4:0.5 Häs-:F4:0.5 chen,:F4:0.5 [C]bist:F4:0.5 du:E4:0.5 krank,:E4
[G7]dass:E4:0.5 du:D4:0.5 nicht:E4:0.5 mehr:D4:0.5 [C]hüp-:C4:0.5 fen:E4:0.5 kannst?:G4
Häs-:G4:0.5 chen:G4:0.5 hüpf,:C5 Häs-:G4:0.5 chen:G4:0.5 hüpf,:C5
[G7]Häs-:G4 chen:G4 [C]hüpf!:C4 _:R` },
  'summ-summ': { meter: 2, pickup: 0, originalKey: 'G', similarity: 0.98, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Summ, summ, summ“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Summ%2C_summ%2C_summ&oldid=270163297', text: `
[C]Summ,:G4 [G7]summ,:F4 [C]summ!:E4 _:R [G7]Bien-:D4:0.5 chen,:E4:0.5 summ:F4:0.5 her-:D4:0.5 [C]um!:C4
_:R Ei,:E4:0.5 wir:F4:0.5 tun:G4:0.5 dir:E4:0.5 [G7]nichts:D4:0.5 zu-:E4:0.5 lei-:F4:0.5 de,:D4:0.5
[C]flieg:E4:0.5 nur:F4:0.5 aus:G4:0.5 in:E4:0.5 [G7]Wald:D4:0.5 und:E4:0.5 Hei-:F4:0.5 de!:D4:0.5
Summ,:G4 summ,:F4 [C]summ!:E4 _:R [G7]Bien-:D4:0.5 chen,:E4:0.5 summ:F4:0.5 her-:D4:0.5 [C]um!:C4
_:R` },
  'vogelhochzeit': { meter: 2, pickup: 0.5, originalKey: 'G', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Die Vogelhochzeit“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Die_Vogelhochzeit&oldid=260731563', text: `
[C]Ein:E5:0.5 Vo-:G5:0.5 gel:E5:0.5 woll-:G5:0.5 te:E5:0.5 [G7]Hoch-:F5:0.5 zeit:D5:0.5 ma-:F5:0.5 chen:D5:0.5 in:E5:0.5 [C]dem:C5:0.5 grü-:G5:0.5 nen:E5:0.5 [G]Wal-:D5:0.5 ~:G5:0.5 de.:G5:0.5
Fi-:G5:0.25 di-:E5:0.25 [C]ral-:C5:0.5 la-:C5:0.5 la,:C5:0.5 fi-:G5:0.25 di-:E5:0.25 [G7]ral-:D5:0.5 la-:D5:0.5 la,:D5:0.5
fi-:G5:0.25 di-:F5:0.25 [C]ral-:E5:0.5 la-:C5:0.5 [G7]la-:D5:0.5 la-:B4:0.5 [C]la.:C5
_:R:0.5` },
  'bi-ba-butzemann': { meter: 2, pickup: 0.5, originalKey: 'G', similarity: 0.99, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Es tanzt ein Bi-Ba-Butzemann“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Es_tanzt_ein_Bi-Ba-Butzemann&oldid=265684641', text: `
[C]Es:G4:0.5 tanzt:C5:0.5 ein:C5:0.5 Bi-:G5:0.5 Ba-:G5:0.5 But-:E5:0.5 ze-:E5:0.5 mann:C5:0.5 in:C5:0.5 [G7]un-:D5:0.5 serm:D5:0.5 Haus:G4:0.5 [C]her-:G4:0.5 um,:C5:0.5
fi-:C5:0.25 de-:E5:0.25 bum,:G5:0.5 es:G4:0.5 tanzt:C5:0.5 ein:C5:0.5 Bi-:G5:0.5 Ba-:G5:0.5 But-:E5:0.5 ze-:E5:0.5 mann:C5:0.5 in:C5:0.5 [G7]un-:D5:0.5 serm:D5:0.5 Haus:G4:0.5 [C]her-:G4:0.5 um.:C5
_:R:0.5 Er:E5:0.5 [G7]rüt-:D5:0.75 telt:E5:0.25 sich,:F5:0.5 er:D5:0.5 [C]schüt-:E5:0.75 telt:F5:0.25 sich,:G5:0.5
er:E5:0.5 [G7]wirft:D5:0.75 sein:E5:0.25 Säck-:F5:0.5 chen:D5:0.5 [C]hin-:E5:0.75 ter:F5:0.25 sich.:G5:0.5
Es:G4:0.5 tanzt:C5:0.5 ein:C5:0.5 Bi-:G5:0.5 Ba-:G5:0.5 But-:E5:0.5 ze-:E5:0.5 mann:C5:0.5 in:C5:0.5 [G7]un-:D5:0.5 serm:D5:0.5 Haus:G4:0.5 [C]her-:G4:0.5 um.:C5
_:R:0.5` },
  'haensel-und-gretel': { meter: 4, pickup: 0, originalKey: 'D', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Hänsel und Gretel verliefen sich im Wald“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=H%C3%A4nsel_und_Gretel_verliefen_sich_im_Wald&oldid=258471809', text: `
[C]Hän-:G4:2 sel:E4 und:F4 Gre-:G4:2 tel:E4 ver-:C4 [G7]lie-:D4 fen:D4 sich:D4 im:E4 [C]Wald.:C4:3
_:R Es:G4:2 war:E4 so:F4 fin-:G4:2 ster:E4 und:C4 [G7]auch:D4 so:D4 bit-:D4 ter:E4 [C]kalt.:C4:2
_:R Sie:C4 [G7]ka-:D4 men:D4 an:D4 ein:E4 Häus-:F4:2 chen:D4 von:D4 [C]Pfef-:E4 fer-:E4 ku-:E4 chen:F4 fein.:G4:3
_:R Wer:G4:2 mag:E4 der:F4 Herr:G4:2 wohl:E4 von:C4 [G7]die-:D4 sem:D4 Häus-:D4 chen:E4 [C]sein?:C4:3
_:R` },
  'auf-der-mauer': { meter: 2, pickup: 0, originalKey: 'F', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Auf der Mauer, auf der Lauer“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Auf_der_Mauer%2C_auf_der_Lauer&oldid=264533855', text: `
[C]Auf:C4:0.5 der:C4:0.5 Mau-:C4:0.5 er,:D4:0.5 auf:E4:0.5 der:E4:0.5 Lau-:E4:0.5 er:E4:0.5 [G7]sitzt:D4:0.5 ’ne:C4:0.5 klei-:D4:0.5 ne:E4:0.5 [C]Wan-:C4 ze.:C4
Auf:E4:0.5 der:E4:0.5 Mau-:E4:0.5 er,:F4:0.5 auf:G4:0.5 der:G4:0.5 Lau-:G4:0.5 er:G4:0.5 [G7]sitzt:F4:0.5 ’ne:E4:0.5 klei-:F4:0.5 ne:G4:0.5 [C]Wan-:E4 ze.:E4
Seht:G4:0.5 euch:G4:0.5 nur:G4:0.5 die:G4:0.5 [F]Wan-:A4:0.5 ze:A4:0.5 an,:A4 [G7]wie:F4:0.5 die:F4:0.5 Wan-:F4:0.5 ze:F4:0.5 [C]tan-:G4:0.5 zen:G4:0.5 kann!:G4
Auf:C4:0.5 der:C4:0.5 Mau-:C4:0.5 er,:D4:0.5 auf:E4:0.5 der:E4:0.5 Lau-:E4:0.5 er:E4:0.5 [G7]sitzt:D4:0.5 ’ne:C4:0.5 klei-:D4:0.5 ne:E4:0.5 [C]Wan-:C4 ze.:C4` },
  'backe-kuchen': { meter: 4, pickup: 0, originalKey: 'D', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Backe, backe Kuchen“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Backe%2C_backe_Kuchen&oldid=271034269', text: `
[C]Ba-:G4 cke,:G4 [F]ba-:A4 cke:A4 [C]Ku-:G4:2 chen,:E4 der:C4 Bä-:G4 cker:G4 [F]hat:A4 ge-:A4 [C]ru-:G4:2 fen.:E4:2
Wer:G4 will:G4 [F]gu-:A4 ten:A4 [C]Ku-:G4 chen:G4 ba-:E4 cken,:C4
der:G4 muss:G4 [F]ha-:A4 ben:A4 [C]sie-:G4 ben:G4 Sa-:E4 chen:E4
[G7]Ei-:G4:0.5 er:G4:0.5 und:G4 [C]Schmalz,:E4:2 [G7]Zu-:G4:0.5 cker:G4:0.5 und:G4 [C]Salz,:E4:2
[G7]Milch:G4 und:G4 [C]Mehl,:E4:2 Sa-:G4 fran:G4 [F]macht:A4 den:A4 [C]Ku-:G4 chen:G4 gehl!:E4:2
Schieb,:C5:2 [F]schieb:G4 in’n:F4 [C]O-:E4 [G7]fen:D4 [C]’nein.:C4:2` },
  'gruen-gruen-gruen': { meter: 2, pickup: 0, originalKey: 'G', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Grün, grün, grün sind alle meine Kleider“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Gr%C3%BCn%2C_gr%C3%BCn%2C_gr%C3%BCn_sind_alle_meine_Kleider&oldid=254727624', text: `
[C]Grün,:C5 grün,:C5 [G7]grün:D5 sind:D5 al-:B4:0.5 le:B4:0.5 mei-:A4:0.5 ne:B4:0.5 [C]Klei-:C5 der,:G4
grün,:C5 grün,:C5 [G7]grün:D5 ist:D5 al-:B4:0.5 les,:B4:0.5 was:A4:0.5 ich:B4:0.5 [C]hab.:C5
_:R Da-:E5 rum:E5:0.5 ~:G5:0.5 [F]lieb:F5 ich:F5 [G7]al-:D5:0.5 les,:D5:0.5
was:D5:0.5 so:F5:0.5 [C]grün:E5 ist,:E5 weil:C5 mein:C5 [G7]Schatz:D5 ein:D5 Jä-:B4 ger:A4:0.5 ~:B4:0.5 [C]ist.:C5
_:R` },
  'schlaf-kindlein': { meter: 2, pickup: 0, originalKey: 'F', similarity: 0.99, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Schlaf, Kindlein, schlaf“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Schlaf%2C_Kindlein%2C_schlaf&oldid=253778190', text: `
[F]Schlaf,:A4 [C7]Kind-:G4:0.5 lein,:G4:0.5 [F]schlaf,:F4
_:R:0.5 der:F4:0.25 ~:A4:0.25 [C7]Va-:C5:0.5 ter:C5:0.5 hüt:Bb4:0.5 die:Bb4:0.5 [F]Schaf,:A4
_:R:0.5 die:A4:0.5 [C7]Mut-:Bb4:0.5 ter:Bb4:0.5 schüt-:G4:0.5 telts:G4:0.5 [F]Bäu-:C5:0.5 me-:C5:0.5 lein,:A4:0.5
da:A4:0.5 [C7]fällt:Bb4:0.5 her-:Bb4:0.5 ab:G4:0.5 ein:G4:0.5 [F]Träu-:C5:0.5 me-:C5:0.5 lein.:A4
[C7]Schlaf,:Bb4 Kind-:G4:0.5 lein,:G4:0.5 [F]schlaf!:F4
_:R` },
  'weisst-du-wie-viel': { meter: 3, pickup: 1, originalKey: 'F', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Weißt du, wie viel Sternlein stehen“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Wei%C3%9Ft_du%2C_wie_viel_Sternlein_stehen&oldid=263820130', text: `
[C]Weißt:C4:0.5 du,:D4:0.5 wie:E4 viel:E4 [G7]Ster-:F4:0.5 ne:D4:0.5 [C]ste-:A4:0.5 ~:G4:0.5 hen:G4 [A7]an:E4:0.5 dem:G4:0.5 [F]blau-:G4:0.5 ~:F4:0.5 en:F4 [G7]Him-:G4:0.5 mels-:F4:0.5 [C]zelt?:E4:2
Weißt:C4:0.5 du,:D4:0.5 wie:E4 viel:E4 [G7]Wol-:F4:0.5 ken:D4:0.5 [C]ge-:A4:0.5 ~:G4:0.5 hen:G4 [A7]weit-:E4:0.5 hin:G4:0.5 [F]ü-:G4:0.5 ~:F4:0.5 ber:F4 [G7]al-:G4:0.5 le:F4:0.5 [C]Welt?:E4:2
Gott:G4:0.5 der:E4:0.5 [D7]Herr:E4:0.5 ~:D4:0.5 hat:D4 [G7]sie:A4:0.5 ge-:F4:0.5 [C]zäh-:F4:0.5 ~:E4:0.5 let,:E4
dass:G4:0.5 ihm:E4:0.5 [D7]auch:E4:0.5 ~:D4:0.5 nicht:D4 [G7]ei-:A4:0.5 nes:F4:0.5 [C]feh-:F4:0.5 ~:E4:0.5 let:E4
an:C4:0.5 der:D4:0.5 gan-:E4 zen:E4 [G7]gro-:F4:0.5 ßen:D4:0.5 [C]Zahl,:A4 ~:G4 [A7]an:E4:0.5 der:G4:0.5 [F]gan-:G4:0.5 ~:F4:0.5 zen:F4 [G7]gro-:G4:0.5 ßen:F4:0.5 [C]Zahl.:E4:2` },
  'kuckuck-kuckuck': { meter: 3, pickup: 0, originalKey: 'G', similarity: 0.98, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Kuckuck, Kuckuck, ruft’s aus dem Wald“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Kuckuck%2C_Kuckuck%2C_ruft%E2%80%99s_aus_dem_Wald&oldid=270233513', text: `
[C]Ku-:G4 ckuck,:E4 _:R Ku-:G4 ckuck:E4 _:R [G7]ruft’s:D4 aus:C4 dem:D4 [C]Wald.:C4:3
[G7]Las-:D4 set:D4 uns:E4 sin-:F4:2 gen,:D4 [C]tan-:E4 zen:E4 und:F4 sprin-:G4:2 gen!:E4
Früh-:G4:2 ling,:E4 Früh-:G4:2 ling:E4 [G7]wird:F4 es:E4 nun:D4 [C]bald.:C4:3` },
  'winter-ade': { meter: 3, pickup: 0, originalKey: 'G', similarity: 0.98, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Winter, ade! Scheiden tut weh“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Winter%2C_ade!_Scheiden_tut_weh&oldid=258949773', text: `
[C]Win-:E4 ter,:E4 [G7]a-:D4 [C]de!:C4:3
Schei-:E4 den:E4 [G7]tut:D4 [C]weh.:C4:3
A-:E4 ber:F4 dein:G4 [G7]Schei-:G4 den:F4:0.5 ~:E4:0.5 macht,:F4 dass:D4 jetzt:E4 mein:F4 [C]Her-:F4 ze:E4:0.5 ~:D4:0.5 lacht.:E4
Win-:E4 ter,:E4 a-:F4 [G7]de!:G4:3
[C]Schei-:E4 den:E4 [G7]tut:D4 [C]weh.:C4:3` },
  'alles-neu-mai': { meter: 2, pickup: 0, originalKey: 'A', similarity: 0.99, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Alles neu macht der Mai“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Alles_neu_macht_der_Mai&oldid=245350595', text: `
[C]Al-:G4:0.5 les:E4:0.5 neu:E4 [G7]macht:F4:0.5 der:D4:0.5 Mai,:D4 [C]macht:C4:0.5 die:D4:0.5 See-:E4:0.5 le:F4:0.5 frisch:G4:0.5 und:G4:0.5 frei.:G4
Lasst:G4:0.5 das:E4:0.5 Haus,:E4 [G7]kommt:F4:0.5 hin-:D4:0.5 aus!:D4
[C]Win-:C4:0.5 det:E4:0.5 ei-:G4:0.5 nen:G4:0.5 Strauß!:E4
_:R [G7]Rings:D4:0.5 er-:D4:0.5 glän-:D4:0.5 zet:D4:0.5 Son-:D4:0.5 nen-:E4:0.5 schein,:F4
[C]duf-:E4:0.5 tend:E4:0.5 pran-:E4:0.5 gen:E4:0.5 Flur:E4:0.5 und:F4:0.5 Hain:G4 Vo-:G4:0.5 gel-:E4:0.5 sang,:E4
[G7]Hör-:F4:0.5 ner-:D4:0.5 klang:D4 [C]tönt:C4:0.5 den:E4:0.5 Wald:G4:0.5 ent-:G4:0.5 lang.:C4
_:R` },
  'ich-geh-mit-meiner-laterne': { meter: 6, pickup: 1, originalKey: 'G', similarity: 0.78, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Ich geh’ mit meiner Laterne“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Ich_geh%E2%80%99_mit_meiner_Laterne&oldid=261478419', text: `
[C]Ich:G4 geh:C5:2 mit:C5 mei-:E5 ner:C5 La-:E5 ter-:G5:3 ne:E5:2 und:C5 [G7]mei-:D5 ne:D5 La-:D5 ter-:D5 ne:E5 mit:D5 [C]mir.:C5:3
_:R:2 Da:G4 o-:C5:2 ben:C5 leuch-:E5 ten:C5 die:E5 Ster-:G5:3 ne,:E5:2 und:C5 [G7]un-:D5:2 ten,:D5 da:D5 leuch-:E5 ten:D5 [C]wir.:C5:3
_:R:2 La-:E5 ter-:G5:2 nen-:E5 licht,:C5:2 ver-:E5 lösch:G5:2 mir:E5 nicht!:C5:2
Ra-:C5 [G7]bim-:D5 mel,:D5 ra-:D5 bam-:D5 mel,:E5 ra-:D5 [C]bum.:C5:3
_:R:2 La-:E5 ter-:G5:2 nen-:E5 licht,:C5:2 ver-:E5 lösch:G5:2 mir:E5 nicht!:C5:2
Ra-:C5 [G7]bim-:D5 mel,:D5 ra-:D5 bam-:D5 mel,:E5 ra-:D5 [C]bum.:C5:3
_:R:2` },
  'alle-jahre-wieder': { meter: 4, pickup: 0, originalKey: 'D', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Alle Jahre wieder“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Alle_Jahre_wieder&oldid=269928115', text: `
[C]Al-:G4:1.5 le:A4:0.5 Jah-:G4 re:F4 wie-:E4:2 [G7]der:D4:2 [C]kommt:C4 das:D4:0.5 ~:E4:0.5 Chris-:F4 tus-:E4 [G7]kind:D4:3 _:R [C]auf:E4 die:G4 Er-:A4 de:G4 [F]nie-:C5:2 [G7]der,:B4
~:A4 [C]wo:G4 wir:F4:0.5 ~:E4:0.5 [G7]Men-:F4 schen:G4 [C]sind.:E4:3
_:R` },
  'ihr-kinderlein-kommet': { meter: 2, pickup: 0.5, originalKey: 'D', similarity: 0.99, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Ihr Kinderlein, kommet“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Ihr_Kinderlein%2C_kommet&oldid=259822920', text: `
[C]Ihr:G4:0.5 Kin-:G4 der-:E4:0.5 lein,:G4:0.5 kom-:G4 met,:E4:0.5 o:G4:0.5 [G7]kom-:F4 met:D4:0.5 doch:F4:0.5 [C]all!:E4
_:R:0.5 Zur:G4:0.5 Krip-:G4 pe:E4:0.5 her:G4:0.5 kom-:G4 met:E4:0.5 in:G4:0.5 [G7]Bet-:F4 le-:D4:0.5 hems:F4:0.5 [C]Stall:E4 _:R:0.5 und:E4:0.5 [G7]seht,:D4
was:D4:0.5 in:D4:0.5 die-:F4 ser:F4:0.5 hoch-:F4:0.5 [C]hei-:E4 li-:E4:0.5 gen:E4:0.5 [F]Nacht:A4 _:R:0.5 der:A4:0.5 [C]Va-:G4 ter:G4:0.5 im:G4:0.5 Him-:C5 mel:G4:0.5 für:E4:0.5 [G7]Freu-:F4 de:D4:0.5 uns:B4:0.5 [C]macht!:C4:1.5` },
  'o-tannenbaum': { meter: 3, pickup: 0.5, originalKey: 'G', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „O Tannenbaum“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=O_Tannenbaum&oldid=262942290', text: `
[C]O:G4:0.5 Tan-:C5:0.75 nen-:C5:0.25 baum,:C5 [G]o:D5 [C]Tan-:E5:0.75 nen-:E5:0.25 baum,:E5:1.5
wie:E5:0.5 [Dm]treu:D5:0.5 sind:E5:0.5 dei-:F5 [G7]ne:B4 Blät-:D5 [C]ter!:C5
_:R:0.5 Du:G5:0.5 [C7]grünst:G5:0.5 nicht:E5:0.5 [F]nur:A5:1.5 zur:G5:0.5 [G7]Som-:G5:0.5 mer-:F5:0.5 zeit,:F5:1.5
nein,:F5:0.5 auch:F5:0.5 im:D5:0.5 Win-:G5:1.5 ter,:F5:0.5 [C]wenn:F5:0.5 es:E5:0.5 schneit.:E5
O:G4:0.5 Tan-:C5:0.75 nen-:C5:0.25 baum,:C5 [G]o:D5 [C]Tan-:E5:0.75 nen-:E5:0.25 baum,:E5:1.5
wie:E5:0.5 [Dm]treu:D5:0.5 sind:E5:0.5 dei-:F5 [G7]ne:B4 Blät-:D5 [C]ter!:C5
_:R:0.5` },
  'leise-rieselt': { meter: 6, pickup: 0, originalKey: 'G', similarity: 0.96, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Leise rieselt der Schnee“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Leise_rieselt_der_Schnee&oldid=258946810', text: `
[C]Lei-:E5:2 se:E5 rie-:D5 selt:E5 der:D5 Schnee,:C5:5 _:R [F]still:C5:2 und:A4 starr:C5 [G7]ruht:B4 der:A4 [C]See,:G4:5
_:R [G7]weih-:D5 nacht-:C#5 lich:D5 glän-:F5 zet:E5 der:D5 [C]Wald:C5:5
_:R [Dm]Freu-:D5:1.5 e:A4:0.5 dich,:A4 [G7]Christ-:B4 kind:A4 kommt:B4 [C]bald!:C5:5
_:R` },
  'lasst-uns-froh': { meter: 4, pickup: 0, originalKey: 'C', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Lasst uns froh und munter sein“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Lasst_uns_froh_und_munter_sein&oldid=262560930', text: `
[C]Lasst:G4 uns:G4 froh:G4:0.5 ~:A4:0.5 und:G4:0.5 ~:F4:0.5 mun-:E4 ter:E4 sein:E4 _:R [G7]und:F4 uns:F4 recht:F4:0.5 ~:G4:0.5 von:F4:0.5 ~:E4:0.5 Her-:D4 zen:D4 freun!:D4
_:R [C]Lus-:C4 tig,:D4 lus-:E4 tig,:F4 tra-:G4:0.5 le-:A4:0.5 ra-:G4:0.5 le-:A4:0.5 ra!:G4
_:R Bald:C5 ist:G4 Ni-:G4:0.5 ko-:A4:0.5 laus-:G4:0.5 ~:F4:0.5 [G7]a-:E4 bend:D4 da,:G4
_:R [C]bald:C5 ist:G4 Ni-:G4:0.5 ko-:A4:0.5 laus-:G4:0.5 ~:F4:0.5 [G7]a-:E4 bend:D4 [C]da!:C4
_:R` },
  'morgen-kinder': { meter: 2, pickup: 0, originalKey: 'G', similarity: 0.98, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Morgen, Kinder, wird’s was geben“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Morgen%2C_Kinder%2C_wird%E2%80%99s_was_geben&oldid=267967459', text: `
[C]Mor-:C5:0.5 gen,:G4:0.5 Kin-:A4:0.5 der,:G4:0.5 [G7]wird’s:A4:0.25 ~:C5:0.25 was:B4:0.25 ~:D5:0.25 [C]ge-:C5:0.5 ben,:G4:0.5
mor-:E5:0.5 gen:E5:0.25 ~:F5:0.25 wer-:G5:0.5 den:E5:0.5 [G7]wir:F5:0.5 uns:E5:0.5 freun!:D5
[C]Wel-:C5:0.5 che:G4:0.5 Won-:A4:0.5 ne,:G4:0.5 [G7]wel-:A4:0.25 ~:C5:0.25 ches:B4:0.25 ~:D5:0.25 [C]Le-:C5:0.5 ben:G4:0.5 wird:E5:0.5 in:E5:0.25 ~:F5:0.25 un-:G5:0.5 serm:E5:0.5 [G7]Hau-:F5:0.5 se:E5:0.5 sein!:D5
[F]Ein-:F5:0.5 mal:F5:0.5 wer-:A5:0.5 den:A5:0.5 [G7]wir:D5:0.5 noch:D5:0.5 wach,:G5 [F]Hei-:C5:0.5 sa,:C5:0.5
dann:F5:0.5 ist:F5:0.5 [C]Weih-:E5:0.25 ~:D5:0.25 [G7]nachts-:C5:0.25 ~:B4:0.25 [C]tag!:C5` },
  'o-du-froehliche': { meter: 4, pickup: 0, originalKey: 'C', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „O du fröhliche“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=O_du_fr%C3%B6hliche&oldid=267766473', text: `
[C]O:G4:2 [F]du:A4:2 [G7]fröh-:G4:1.5 li-:F4:0.5 [C]che,:E4 ~:F4 o:G4:2 [F]du:A4:2 [G7]se-:G4:1.5 li-:F4:0.5 [C]ge,:E4
~:F4 gna-:G4:2 den-:G4:2 [F]brin-:A4:2 [G7]gen-:B4 de:C5 Weih-:B4:2 [F]nachts-:A4:2 [C]zeit!:G4:4
[G7]Welt:D4:1.5 ~:E4:0.5 ging:D4 ver-:E4 lo-:F4:1.5 ~:G4:0.5 ren,:F4:2 [C]Christ:E4:1.5 ~:F4:0.5 ist:E4 ge-:F4 bo-:G4:1.5 ~:A4:0.5 ren:G4:2
Freu-:C5 ~:B4 [F]e,:A4 ~:G4 freu-:C5 e:A4 [G7]dich,:G4 o:F4 [C]Chris-:E4:2 [G7]ten-:D4:2 [C]heit!:C4:4` },
  'suesser-die-glocken': { meter: 6, pickup: 0, originalKey: 'F', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Süßer die Glocken nie klingen“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=S%C3%BC%C3%9Fer_die_Glocken_nie_klingen&oldid=265021876', text: `
[C]Sü-:E4:1.5 ßer:E4:0.5 die:E4 Glo-:E4 cken:D4 nie:E4 klin-:G4:3 [G7]gen:D4:3
als:D4:1.5 zu:D4:0.5 der:D4 Weih-:D4 ~:C4 nachts-:D4 [C]zeit,:E4:4 _:R _:R ist,:G4:1.5
als:G4:0.5 ob:G4 En-:G4 ge-:E4 lein:C4 sin-:C5:3 [F]gen:A4:3 [C]wie-:G4:1.5 der:A4:0.5 von:G4 [G7]Frie-:G4 den:F4 und:D4 [C]Freud,:C4:5
_:R [G7]wie:D4:1.5 sie:D4:0.5 ge-:D4 [C]sun-:E4 gen:E4 in:E4 [G7]se-:G4:1.5 li-:F4:0.5 ger:D4 [C]Nacht,:E4:3
[G7]wie:D4:1.5 sie:D4:0.5 ge-:D4 [C]sun-:E4 gen:E4 in:E4 [G7]se-:G4:1.5 li-:F4:0.5 ger:D4 [C]Nacht.:E4:3
Glo-:G4:1.5 cken:F4:0.5 mit:E4 hei-:E4 li-:D4 gem:C4 Klang,:C5:3 [F]~:A4:3 [C]klingt:G4:1.5 doch:A4:0.5 die:G4 [G7]Er-:G4 de:F4 ent-:D4 [C]lang!:C4:5
_:R` },
  'kommet-ihr-hirten': { meter: 3, pickup: 0, originalKey: 'F', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Kommet, ihr Hirten“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Kommet%2C_ihr_Hirten&oldid=267478475', text: `
[C]Kom-:G4 met,:G4:0.5 ~:E4:0.5 ihr:A4:0.5 ~:F4:0.5 Hir-:G4 ten,:G4:0.5 ~:E4:0.5 ihr:A4:0.5 ~:F4:0.5 Män-:G4 ner:E4:0.5 ~:G4:0.5 [G7]und:D4:0.5 ~:E4:0.5 [C]Fraun,:C4:3
kom-:G4 met,:G4:0.5 ~:E4:0.5 das:A4:0.5 ~:F4:0.5 lieb-:G4 li-:G4:0.5 ~:E4:0.5 che:A4:0.5 ~:F4:0.5 Kind-:G4 lein:E4:0.5 ~:G4:0.5 [G7]zu:D4:0.5 ~:E4:0.5 [C]schaun,:C4:3
Chri-:C4 stus,:E4:0.5 der:C4:0.5 Herr,:E4:0.5 ist:G4:0.5 [F]heu-:C5 te:E5:0.5 ge-:C5:0.5 [G7]bo-:D5:0.5 ren,:G4:0.5
[C]den:C5 Gott:E5:0.5 zum:C5:0.5 Hei-:E5:0.5 land:G5:0.5 [F]euch:C5 hat:E5:0.5 er-:C5:0.5 [G7]ko-:D5:0.5 ren.:G4:0.5
[C]Fürch-:G5 tet:E5:0.5 ~:G5:0.5 [G7]euch:D5:0.5 ~:E5:0.5 [C]nicht!:C5:2
_:R` },
  'michael-row': { meter: 4, pickup: 2, originalKey: 'C', similarity: 0.77, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Michael, Row the Boat Ashore“ (CC BY-SA 4.0)', url: 'https://en.wikipedia.org/w/index.php?title=Michael%2C_Row_the_Boat_Ashore&oldid=1367191734', text: `
[C]Mi-:C4 chael,:E4 row:G4:1.5 the:E4:0.5 boat:G4 a-:A4 shore,:G4:2 Hal-:E4 le-:G4 [F]lu-:A4:4 [C]jah!:G4:2
Mi-:E4 chael,:G4 row:G4:1.5 the:E4:0.5 [F]boat:F4 a-:E4 [G7]shore,:D4:2 [C]Hal-:C4 le-:D4 lu-:E4:2 [G7]~:D4:2 [C]jah!:C4:2` },
  'amazing-grace': { meter: 3, pickup: 1, originalKey: 'G', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Amazing Grace“ (CC BY-SA 4.0)', url: 'https://en.wikipedia.org/w/index.php?title=Amazing_Grace&oldid=1377370033', text: `
[C]A-:G4 ma-:C5:2 zing:E5:0.5 ~:C5:0.5 grace!:E5:2
(How:D5 [F]sweet:C5:2 the:A4 [C]sound!):G4:2 That:G4 saved:C5:2 a:E5:0.5 ~:C5:0.5 wretch:E5:2 like:D5 [G7]me!:G5:2
I:E5 [C]once:G5:1.5 ~:E5:0.5 was:G5:0.5 ~:E5:0.5 lost,:C5:2 but:G4 [F]now:A4:1.5 ~:C5:0.5 am:C5:0.5 ~:A4:0.5 [C]found,:G4:2
was:G4 [Am]blind,:C5:2 but:E5:0.5 ~:C5:0.5 [G7]now:E5:2 I:D5 [C]see.:C5:3` },
  'es-ist-ein-ros': { meter: 4, pickup: 2, originalKey: 'F', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Es ist ein Ros entsprungen“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Es_ist_ein_Ros_entsprungen&oldid=270412355', text: `
[C]Es:G5:2 ist:G5 ein:G5 [Am]Ros:A5 ent-:G5 [C]sprun-:G5:2 gen:E5:2 [F]aus:F5:2 [C]ei-:E5 ner:D5:2 Wur-:C5:2 [G7]zel:B4 [C]zart,:C5:2
wie:G5:2 uns:G5 die:G5 [Am]Al-:A5 ten:G5 [C]sun-:G5:2 gen,:E5:2 [F]von:F5:2 [C]Jes-:E5 se:D5:2 kam:C5:2 [G7]die:B4 [C]Art:C5:2
_:R und:E5 [G7]hat:D5 ein:B4 [Am]Blüm-:C5 lein:A4 [C]bracht:G4:2 _:R mit-:G5 ten:G5 im:G5 [Am]kal-:A5 ten:G5 [C]Win-:G5:2 ter:E5:2
[F]wohl:F5:2 [C]zu:E5 der:D5:2 hal-:C5:2 [G7]ben:B4 [C]Nacht.:C5:2` },
  'am-weihnachtsbaum': { meter: 3, pickup: 1.5, originalKey: 'C', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Am Weihnachtsbaum die Lichter brennen“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Am_Weihnachtsbaum_die_Lichter_brennen&oldid=262727332', text: `
[C]Am:C4:0.5 Weih-:C4:0.5 nachts-:E4:0.5 baum:G4 ~:E4:0.5 die:G4:0.5 Lich-:C5:0.5 ter:A4:0.5 bren-:G4 nen,:E4:0.5
wie:G4:0.5 glänzt:A4:0.5 er:G4:0.5 [G7]fest-:F4 lich,:D4 lieb:G4:0.5 und:G4:0.5 [C]mild,:E4
_:R:0.5 als:E4:0.5 spräch:E4:0.5 er:G4:0.5 [G7]Wollt:F4 ~:D4:0.5 in:F4:0.5 mir:F4:0.5 er-:A4:0.5 [C]ken-:G4 nen:E4:0.5 ge-:E4:0.5 treu-:E4:0.5 er:G4:0.5 [G7]Hoff-:F4 nung:D4 still-:G4:0.5 es:G4:0.5 [C]Bild.:E4
_:R:0.5` },
  'was-soll-das-bedeuten': { meter: 3, pickup: 1, originalKey: 'G', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Was soll das bedeuten“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Was_soll_das_bedeuten&oldid=231184199', text: `
[C]Was:C4:0.5 ~:D4:0.5 soll:E4 das:E4 be-:D4:0.5 ~:E4:0.5 [G7]deu-:F4 ten?:F4
Es:E4:0.5 ~:F4:0.5 ta-:G4 get:G4 ja:F4:0.5 ~:E4:0.5 schon.:D4:2
Ich:C4:0.5 ~:D4:0.5 [C]weiß:E4 wohl,:E4 es:D4:0.5 ~:E4:0.5 [G7]geht:F4 erst:F4 um:E4:0.5 ~:F4:0.5 Mit-:G4 ter-:G4 nacht:F4:0.5 ~:E4:0.5 rum.:D4:2
_:R Schaut:D4 nur:D4:0.5 ~:C4:0.5 da-:D4:0.5 ~:F4:0.5 [C]her,:E4:2 _:R schaut:E4 nur:E4:0.5 ~:D4:0.5 da-:E4:0.5 ~:F4:0.5 [G7]her,:D4:2
wie:G4:0.5 ~:F4:0.5 [C]glän-:E4 zen:G4 die:F4:0.5 ~:E4:0.5 [G7]Stern-:D4:0.5 ~:E4:0.5 lein:F4 je:E4:0.5 ~:D4:0.5 [C]län-:C4:0.5 ~:D4:0.5 ger,:E4
je:D4 mehr.:C4:2` },
  'still-still-still': { meter: 2, pickup: 0, originalKey: 'F', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Still, still, still“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Still%2C_still%2C_still&oldid=261911341', text: `
[C]Still,:G5 ~:C5 still,:E5 ~:G5 still,:C5 weil’s:C5:0.5 ~:E5:0.5 [G7]Kind-:D5 lein:D5:0.5 ~:F5:0.5 schla-:B4 fen:B4:0.5 ~:D5:0.5 [C]will!:C5:2
_:R Ma-:C5 [G7]ri-:D5 a:D5:0.5 ~:E5:0.5 tut:F5 es:D5 [C]nie-:E5 der-:E5:0.5 ~:F5:0.5 sing-:G5 en,:E5
[G7]ih-:D5 re:D5:0.5 ~:E5:0.5 keu-:F5 sche:D5 [C]Brust:E5 dar-:E5:0.5 ~:F5:0.5 brin-:G5 gen.:E5
Still,:G5 ~:C5 still,:E5 ~:G5 still,:C5 weil’s:C5:0.5 ~:E5:0.5 [G7]Kind-:D5 lein:D5:0.5 ~:F5:0.5 schla-:B4 fen:B4:0.5 ~:D5:0.5 [C]will.:C5:2` },
  'zu-bethlehem-geboren': { meter: 4, pickup: 1, originalKey: 'F', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Zu Bethlehem geboren“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Zu_Bethlehem_geboren&oldid=252973153', text: `
[C]Zu:G4 Beth-:C5:1.5 le-:D5:0.5 hem:E5 ge-:D5 bo-:C5:2 [G7]ren:B4 ist:C5 uns:D5 ein:C5:0.5 ~:D5:0.5 [C]Kin-:E5 de-:D5 lein.:C5:2
_:R Das:G5 hab:G5 ich:E5 [G7]aus-:F5 er-:G5 [F]ko-:A5:2 ren,:F5
sein:F5 [C]ei-:E5 gen:F5 will:G5 ich:F5:0.5 ~:E5:0.5 [G7]sein.:D5:3
_:R Ei-:G5:2 a,:D5:2 [C]ei-:E5:2 [G7]a,:D5 sein:E5:0.5 ~:F5:0.5 ei-:G5 gen:C5:0.5 ~:D5:0.5 [C]will:E5 ich:D5 sein.:C5:3` },
  'macht-hoch-die-tuer': { meter: 3, pickup: 1, originalKey: 'G', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Macht hoch die Tür“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Macht_hoch_die_T%C3%BCr&oldid=270515756', text: `
[C]Macht:E4 [G7]hoch:G4:2 die:F4 [C]Tür,:E4:2 die:D4 Tor:C4 ~:D4 macht:E4 [G7]weit;:D4:2
es:G4 kommt:F4:2 der:F4 [C]Herr:E4:2 der:E4 [G7]Herr-:D4 ~:C4 lich-:D4 [C]keit,:C4:2
ein:E4 [G7]Kö-:D4:2 nig:D4 [C]al-:E4 ~:F#4 ler:G4 Kö-:G4 ~:A4 nig-:F#4 [G7]reich,:G4:2
ein:D4 [C]Hei-:E4:2 land:D4 al-:E4 ~:F#4 ler:G4 Welt:G4 ~:A4 zu-:F#4 gleich,:G4:2
der:G4 [Am]Heil:A4:2 und:G4 Le-:A4:2 ben:G4 [Dm]mit:A4 ~:G4 sich:F4 [C]bringt;:E4:2
der-:G4 [Am]hal-:A4:2 ben:G4 jauchzt,:A4:2 mit:G4 [Dm]Freu-:A4 ~:G4 den:F4 [C]singt:E4:2
Ge-:G4 lo-:C4:2 bet:C4 [G7]sei:F4:2 mein:E4 Gott,:D4:5 mein:G4 Schöp-:F4:2 fer:E4
reich:D4 ~:C4 von:D4 [C]Rat.:C4:5` },
  'es-kommt-ein-schiff': { meter: 4, pickup: 1, originalKey: 'Dm', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Es kommt ein Schiff, geladen“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Es_kommt_ein_Schiff%2C_geladen&oldid=266130537', text: `
[Am]Es:E5 kommt:E5:2 [C]ein:E5 Schiff,:G5:2 ge-:G5 [Am]la-:A5:3 den:A5:2 bis:E5 [Dm]an:F5:2 sein’:F5 höch-:D5:2 sten:D5 [Am]Bord,:E5:2
_:R trägt:C5 [C]Got-:E5 tes:G5 [Am]Sohn:A5 voll:A5 [G]Gna-:G5:0.5 ~:F5:0.5 ~:E5:0.5 ~:D5:0.5 [Am]den,:C5
des:D5 [E7]Va-:E5 ters:D5 [Am]e-:C5 wigs:B4 Wort.:A4:3` },
  'il-est-ne': { meter: 2, pickup: 0, originalKey: 'G', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Il est né, le divin Enfant“ (CC BY-SA 4.0)', url: 'https://en.wikipedia.org/w/index.php?title=Il_est_n%C3%A9%2C_le_divin_Enfant&oldid=1324825612', text: `
[C]Il:G4 est:C5 né:C5 le:E5:0.5 di-:C5:0.5 vin:G4 En-:C5 fant,:C5:2
jou-:C5 ez,:C5:0.5 haut-:D5:0.5 bois,:E5 ré-:F5:0.5 son-:E5:0.5 [G7]nez,:D5 mu-:C5 set-:D5:0.5 ~:B4:0.5 tes‿!:G4
[C]Il:G4 est:C5 né:C5 le:E5:0.5 di-:C5:0.5 vin:G4 En-:C5 fant,:C5:2
chan-:C5 tons:D5 tous:E5 son:F5:0.5 a-:E5:0.5 [G7]vè-:D5 ne-:G5 [C]ment‿!:C5:2
De-:E5 puis:F5 plus:G5 de:F5:0.5 qua-:E5:0.5 [G7]tre:F5 mille:A5 [C]ans,:G5:2
nous:E5 le:F5 pro-:G5 met-:A5:0.5 taient:G5:0.5 les:F5 pro-:E5 [G7]phè-:E5 tes,:D5
[C]de-:E5 puis:F5 plus:G5 de:F5:0.5 qua-:E5:0.5 [G7]tre:F5 mille:A5 [C]ans,:G5:2
nous:E5 at-:F5 ten-:G5 dions:A5:0.5 cet:G5:0.5 [G7]heu-:F5 [C]reux:E5 [G7]temps.:D5:2` },
  'entre-le-boeuf': { meter: 4, pickup: 0, originalKey: 'Em', similarity: 0.97, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Entre le bœuf et l’âne gris“ (CC BY-SA 4.0)', url: 'https://fr.wikipedia.org/w/index.php?title=Entre_le_b%C5%93uf_et_l%27%C3%A2ne_gris&oldid=239977253', text: `
[Am]En-:A4:2 tre:A4 le:B4 bœuf:C5:2 et:A4:2 l’â-:E5:2 ne:E5:2 gris,:E5:4 dors,:A5:4
dors,:E5:4 [E7]dors:E5 le:D5 [Am]pe-:C5 tit:D5 fils.:E5:4 Mille:A4 an-:B4 ges:C5 di-:D5 [E7]vins,:D5:4 mil-:E5 le:D5 [Am]sé-:C5 ra-:B4 phins:A4:4 vo-:A4 lent:B4 à:C5 l’en-:D5 tour:E5:1.5 de:C5:0.5 [E7]ce:D5 grand:E5 [Am]Dieu:C5:2 [E7]d’a-:B4:2 [Am]mour.:A4:4` },
  'hark-the-herald': { meter: 4, pickup: 0, originalKey: 'F', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Hark! The Herald Angels Sing“ (CC BY-SA 4.0)', url: 'https://en.wikipedia.org/w/index.php?title=Hark!_The_Herald_Angels_Sing&oldid=1359078229', text: `
[C]Hark!:G4 the:C5 her-:C5:1.5 ald-:B4:0.5 an-:C5 gels:E5 sing:E5 ~:D5 Glo-:G5 ry:G5 [G7]to:G5:1.5 the:F5:0.5 [C]new-:E5 born:D5 King,:E5:2
Peace:G4 on:C5 earth,:C5:1.5 and:B4:0.5 mer-:C5 cy:E5 mild,:E5 ~:D5 [G7]God:G5 and:D5 sin-:D5:1.5 ners:B4:0.5 rec-:B4 on-:A4 ciled.:G4:2 Joy-:G5 ful,:G5
[C]all:G5 ye:C5 [G7]na-:F5 tions,:E5 [C]rise,:E5 ~:D5 Join:G5 the:G5 tri-:G5 umph:C5 [G7]of:F5 the:E5 [C]skies;:E5
~:D5 [Am]With:A5 the‿an-:A5 gel-:A5 ic:G5 [G7]host:F5 pro-:E5 claim:F5:2 Christ:D5 is:E5:0.5 ~:F5:0.5 [C]born:G5:1.5 in:C5:0.5 Beth-:C5 le-:D5 hem.:E5:2 [Am]Hark!:A5:1.5
the:A5:0.5 her-:A5 ald-:G5 [G7]an-:F5 gels:E5 sing:F5:2 Glo-:D5 ry:E5:0.5 ~:F5:0.5 [C]to:G5:1.5 the:C5:0.5 new-:C5 born:D5 King.:C5:2` },
  'away-in-a-manger': { meter: 3, pickup: 1, originalKey: 'F', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Away in a Manger“ (CC BY-SA 4.0)', url: 'https://en.wikipedia.org/w/index.php?title=Away_in_a_Manger&oldid=1331519026', text: `
[C]A-:G5 way:G5:1.5 in:F5:0.5 a:E5 man-:E5:1.5 ger,:D5:0.5 no:C5 [F]crib:C5 for:B4 a:A4 [C]bed,:G4:2
the:G4 lit-:G4:1.5 tle:A4:0.5 Lord:G4 [G7]Je-:G4 sus:D5 laid:B4 [F]down:A4 his:G4 sweet:C5 [C]head.:E5:2
The:G5 stars:G5:1.5 in:F5:0.5 the:E5 bright:E5:1.5 sky:D5:0.5 looked:C5 [F]down:C5 where:B4 he:A4 [C]lay,:G4:2
the:G4 [G7]lit-:F5:1.5 tle:E5:0.5 Lord:D5 [C]Je-:E5 sus:D5 a-:C5 [G7]sleep:D5 on:A4 the:B4 [C]hay.:C5:2` },
  'we-three-kings': { meter: 3, pickup: 0, originalKey: 'Em', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „We Three Kings“ (CC BY-SA 4.0)', url: 'https://en.wikipedia.org/w/index.php?title=We_Three_Kings&oldid=1373948208', text: `
[Am]We:E5:2 three:D5 kings:C5:2 of:A4 [E7]O-:B4 ri-:C5 ent:B4 [Am]are;:A4:2
_:R bear-:E5:2 ing:D5 gifts:C5:2 we:A4 [E7]tra-:B4 verse:C5 a-:B4 [Am]far,:A4:2
_:R field:C5:2 and:C5 [G]foun-:D5:2 tain,:D5 [C]moor:E5:2 and:E5 moun-:G5 ~:F5 tain,:E5
[Dm]fol-:D5 low-:E5 ing:D5 [Am]yon-:C5:2 [E7]der:B4 [Am]star.:A4:2
_:R [G7]O:B4:2 ~:D5 [C]star:C5:2 of:C5 won-:C5:2 der,:G4 [F]star:C5:2 of:A4 [C]night,:C5:2
_:R star:C5:2 with:C5 roy-:C5:2 al:G4 [F]beau-:C5:2 ty:A4 [C]bright,:C5:2
_:R [Am]west-:C5:2 ward:C5 [G]lead-:D5:2 [C]ing,:E5 [F]still:F5:2 [C]pro-:E5 [G]ceed-:D5:2 [C]ing,:E5
guide:C5:2 [F]us:C5 [C]to:C5:2 thy:G4 [F]per-:C5:2 fect:A4 [C]light.:C5:3` },
  'i-saw-three-ships': { meter: 6, pickup: 1, originalKey: 'Ab', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „I Saw Three Ships“ (CC BY-SA 4.0)', url: 'https://en.wikipedia.org/w/index.php?title=I_Saw_Three_Ships&oldid=1358441275', text: `
[C]I:G4 saw:C5:2 three:C5 [G7]ships:D5:2 come:E5 [C]sail-:G5:2 ing:E5 [G7]in:D5:2 On:F5 [C]Christ-:E5:2 mas:C5 day,:C5:2
on:E5 [G7]Christ-:D5:2 mas:B4 day;:G4:2
I:G4 [C]saw:C5:2 three:C5 [G7]ships:D5:2 come:E5 [C]sail-:G5:2 ing:E5 [G7]in:D5:2 On:F5 [C]Christ-:E5:2 mas:C5 day:C5 in:D5 the:E5 [G7]morn-:D5:3 [C]ing.:C5:2` },
  'mond-ist-aufgegangen': { meter: 4, pickup: 1, originalKey: 'F', similarity: 1.00, source: 'Melodie gemeinfrei, Notation nach dem Notenbeispiel im Wikipedia-Artikel „Abendlied (Matthias Claudius)“ (CC BY-SA 4.0)', url: 'https://de.wikipedia.org/w/index.php?title=Abendlied_(Matthias_Claudius)&oldid=267877595', text: `
[C]Der:C4 [G]Mond:D4 ist:C4 [F]auf-:F4 ge-:E4 [G]gan-:D4:2 [C]gen,:C4 die:E4 gold-:E4 nen:E4 [F]Stern-:A4 lein:G4 pran-:F4:2 [C]gen:E4 am:E4 Him-:E4 mel:E4 [F]hell:F4 und:E4 [G]klar;:D4:3
[C]der:C4 [G]Wald:D4 steht:C4 [F]schwarz:F4 und:E4 [G]schwei-:D4:2 [C]get,:C4 und:E4 aus:E4 den:E4 [F]Wie-:A4 sen:G4 stei-:F4:2 [C]get:E4 der:E4 wei-:E4 ße:E4 [F]Ne-:F4 bel:E4 [G]wun-:D4 der-:D4 [C]bar.:C4` },
};
