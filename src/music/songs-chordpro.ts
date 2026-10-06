import type { SongSource } from './song.ts';

/**
 * Lieder ohne Melodie: nur Akkorde und Text (ChordPro-Stil). Alle gemeinfrei – Text und Melodie; Urheber mit
 * Lebensdaten bzw. „traditionell“ in `origin`. Texte nach volksliederarchiv.de bzw. Wikisource (gemeinfreie
 * Fassungen), Akkorde als einfache eigene Begleitung.
 */
const PD = 'gemeinfrei';
const VLA = 'Text nach volksliederarchiv.de';

export const CHORD_SONGS: SongSource[] = [
  {
    id: 'gedanken-sind-frei',
    title: 'Die Gedanken sind frei',
    category: 'lagerfeuer',
    origin: `Text und Melodie anonym, Süddeutschland um 1800; ${VLA}; ${PD}`,
    meter: 3,
    bpm: 110,
    chordpro: `
Die Ge[C]danken sind [G7]frei, wer [C]kann sie er[G7]raten?
Sie [C]fliehen vor[G7]bei wie [C]nächtliche [G7]Schatten.
Kein [F]Mensch kann sie [C]wissen, kein [G7]Kerker ein[C]schließen.
Es [F]bleibet da[C]bei: Die Ge[G7]danken sind [C]frei!
Ich [C]denke, was ich [G7]will und [C]was mich be[G7]glücket,
doch [C]alles in der [G7]Still’ und [C]wie es sich [G7]schicket.
Mein [F]Wunsch, mein Be[C]gehren kann [G7]niemand mir [C]wehren,
es [F]bleibet da[C]bei: Die Ge[G7]danken sind [C]frei!
Und [C]sperrt man mich [G7]ein in [C]finsteren [G7]Kerker,
das [C]alles sind [G7]rein ver[C]gebliche [G7]Werke.
Denn [F]meine Ge[C]danken zer[G7]reißen die [C]Schranken
und [F]Mauern ent[C]zwei: Die Ge[G7]danken sind [C]frei!`,
  },
  {
    id: 'kein-schoener-land',
    title: 'Kein schöner Land in dieser Zeit',
    category: 'lagerfeuer',
    origin: `Text und Melodie Anton Wilhelm von Zuccalmaglio (1803–1869), 1840 – Originalstrophen; ${VLA}; ${PD}`,
    meter: 3,
    bpm: 100,
    chordpro: `
Kein [C]schöner Land in [G7]dieser [C]Zeit
als [C]hier das unsre [G7]weit und [C]breit,
wo [G7]wir uns [C]finden
[G7]wohl unter [C]Linden
zur [F]Abend[G7]zeit. [C]
Da [C]haben wir so [G7]manche [C]Stund’
ge[C]sessen da in [G7]frohem [C]Rund
und [G7]taten [C]singen,
die [G7]Lieder [C]klingen
im [F]Eichen[G7]grund. [C]
Dass [C]wir uns hier in [G7]diesem [C]Tal
noch [C]treffen so viel [G7]hundert[C]mal,
Gott [G7]mag es [C]schenken,
Gott [G7]mag es [C]lenken,
der [F]hat die [G7]Gnad. [C]`,
  },
  {
    id: 'wandern-muellers-lust',
    title: 'Das Wandern ist des Müllers Lust',
    category: 'lagerfeuer',
    origin: `Text Wilhelm Müller (1794–1827), Melodie Carl Friedrich Zöllner (1800–1860); ${VLA}; ${PD}`,
    meter: 4,
    bpm: 100,
    chordpro: `
Das [C]Wandern ist des [G7]Müllers [C]Lust,
das [G7]Wan[C]dern!
Das [C]muss ein schlechter [G7]Müller sein,
dem [C]niemals fiel das [G7]Wandern ein,
das [F]Wandern, [C]
das [G7]Wandern! [C]
Vom [C]Wasser haben [G7]wir’s ge[C]lernt,
vom [G7]Was[C]ser!
Das [C]hat nicht Ruh bei [G7]Tag und Nacht,
ist [C]stets auf Wander[G7]schaft bedacht,
das [F]Wasser, [C]
das [G7]Wasser! [C]
Das [C]sehn wir auch den [G7]Rädern [C]an,
den [G7]Rä[C]dern!
Die [C]gar nicht gerne [G7]stille stehn
und [C]sich bei Tag nicht [G7]müde drehn,
die [F]Räder, [C]
die [G7]Räder! [C]`,
  },
  {
    id: 'muss-i-denn',
    title: 'Muss i denn zum Städtele hinaus',
    category: 'lagerfeuer',
    origin: `Strophe 1 traditionell, Strophe 2 Heinrich Wagner (1783–1863), Melodie volkstümlich aus dem Remstal; ${VLA}; ${PD}`,
    meter: 4,
    bpm: 100,
    chordpro: `
Muss i [C]denn, muss i denn zum [G7]Städele naus,
und [G7]du, mein Schatz, bleibst [C]hier?
Wenn i [C]komm, wenn i komm, wenn i [F]wiedrum komm,
kehr i [C]ein, mein [G7]Schatz, bei [C]dir.
Kann i [G7]glei net allweil bei dir [C]sein,
han i [G7]doch mein Freud an [C]dir;
wenn i [C]komm, wenn i komm, wenn i [F]wiedrum komm,
kehr i [C]ein, mein [G7]Schatz, bei [C]dir.
Wie du [C]weinst, wie du weinst, dass i [G7]wandere muss,
wie wenn [G7]d’ Lieb jetzt wär vor[C]bei!
Sind au [C]drauß, sind au drauß der [F]Mädele viel,
lieber [C]Schatz, i [G7]bleib dir [C]treu.
Denk du [G7]net, wenn i ein andere [C]seh,
no sei [G7]mein Lieb vor[C]bei;
sind au [C]drauß, sind au drauß der [F]Mädele viel,
lieber [C]Schatz, i [G7]bleib dir [C]treu.`,
  },
  {
    id: 'wem-gott-will',
    title: 'Wem Gott will rechte Gunst erweisen',
    category: 'lagerfeuer',
    origin: `Text Joseph von Eichendorff (1788–1857), Melodie Friedrich Theodor Fröhlich (1803–1836); ${VLA}; ${PD}`,
    meter: 4,
    bpm: 100,
    chordpro: `
Wem [C]Gott will rechte [G7]Gunst er[C]weisen,
den [C]schickt er in die [G7]weite [C]Welt,
dem [C]will er seine [F]Wunder [C]weisen
in [F]Berg und [C]Wald und [G7]Strom und [C]Feld.
Die [C]Trägen, die zu [G7]Hause [C]liegen,
er[C]quicket nicht das [G7]Morgen[C]rot,
sie [C]wissen nur von [F]Kinder[C]wiegen,
von [F]Sorgen, [C]Last und [G7]Not um [C]Brot.
Die [C]Bächlein von den [G7]Bergen [C]springen,
die [C]Lerchen schwirren [G7]hoch vor [C]Lust,
was [C]soll ich nicht mit [F]ihnen [C]singen
aus [F]voller [C]Kehl und [G7]frischer [C]Brust?`,
  },
  {
    id: 'freut-euch-des-lebens',
    title: 'Freut euch des Lebens',
    category: 'lagerfeuer',
    origin: `Text Johann Martin Usteri (1763–1827), Melodie Hans Georg Nägeli (1773–1836); ${VLA}; ${PD}`,
    meter: 3,
    bpm: 110,
    chordpro: `
[C]Freut euch des [G7]Lebens,
weil noch das [C]Lämpchen glüht,
[C]pflücket die [G7]Rose,
eh sie ver[C]blüht!
Man [C]schafft so gerne sich [G7]Sorg und Müh,
sucht [C]Dornen auf und [G7]findet sie
und [C]lässt das Veilchen [F]unbemerkt,
das [G7]uns am Wege [C]blüht.
Wenn [C]scheu die Schöpfung sich [G7]verhüllt
und [C]laut der Donner [G7]ob uns brüllt,
so [C]lacht am Abend [F]nach dem Sturm
die [G7]Sonne uns so [C]schön.`,
  },
  {
    id: 'mond-ist-aufgegangen',
    title: 'Der Mond ist aufgegangen',
    category: 'lagerfeuer',
    origin: `Text Matthias Claudius (1740–1815), Melodie Johann Abraham Peter Schulz (1747–1800); ${VLA}; ${PD}`,
    meter: 4,
    bpm: 80,
    chordpro: `
Der [C]Mond ist [F]aufge[C]gangen,
die [C]goldnen [G]Sternlein [C]prangen
am [F]Himmel [G]hell und [C]klar;
der [C]Wald steht [G]schwarz und [C]schweiget,
und [C]aus den [F]Wiesen [C]steiget
der [F]weiße [C]Nebel [G7]wunder[C]bar.
Wie [C]ist die [F]Welt so [C]stille
und [C]in der [G]Dämmrung [C]Hülle
so [F]traulich [G]und so [C]hold,
gleich [C]einer [G]stillen [C]Kammer,
wo [C]ihr des [F]Tages [C]Jammer
ver[F]schlafen [C]und ver[G7]gessen [C]sollt.
Seht [C]ihr den [F]Mond dort [C]stehen?
Er [C]ist nur [G]halb zu [C]sehen
und [F]ist doch [G]rund und [C]schön.
So [C]sind wohl [G]manche [C]Sachen,
die [C]wir ge[F]trost ver[C]lachen,
weil [F]unsre [C]Augen [G7]sie nicht [C]sehn.`,
  },
  {
    id: 'horch-was-kommt',
    title: 'Horch, was kommt von draußen rein',
    category: 'lagerfeuer',
    origin: `Text und Melodie anonym, belegt um 1890; ${VLA}; ${PD}`,
    meter: 4,
    bpm: 110,
    chordpro: `
[C]Horch, was kommt von [G7]draußen rein? [C]Hollahi, hollaho!
[C]Wird wohl mein Feins[G7]liebchen sein, hollahi [C]jaho!
[C]Geht vorbei und [G7]schaut nicht rein, [C]hollahi, hollaho!
[C]Wird’s wohl nicht ge[G7]wesen sein, hollahi [C]jaho!
[C]Leute haben’s [G7]oft gesagt, [C]hollahi, hollaho!
[C]Dass ich ein feins [G7]Liebchen hab, hollahi [C]jaho!
[C]Lass sie reden, [G7]schweig fein still, [C]hollahi, hollaho!
[C]Kann ja lieben, [G7]wen ich will, hollahi [C]jaho!`,
  },
  {
    id: 'junger-wandersmann',
    title: 'Auf, du junger Wandersmann',
    category: 'lagerfeuer',
    origin: `Text und Melodie anonym, Franken um 1840; ${VLA}; ${PD}`,
    meter: 4,
    bpm: 110,
    chordpro: `
Auf, du [C]junger Wandersmann,
[G7]jetzo kommt die [C]Zeit heran,
die [F]Wanderszeit, die [C]gibt uns Freud.
[G7]Woll’n uns auf die [C]Fahrt begeben,
[G7]das ist unser [C]schönstes Leben,
[F]große Wasser, [C]Berg und Tal
[G7]anzuschauen [C]überall.
An dem [C]schönen Donaufluss
[G7]findet man ja [C]seine Lust
und [F]seine Freud auf [C]grüner Heid,
[G7]wo die Vöglein [C]lieblich singen
[G7]und die Hirschlein [C]fröhlich springen;
[F]dann kommt man an [C]eine Stadt,
[G7]wo man gute [C]Arbeit hat.`,
  },
  {
    id: 'bunt-sind-die-waelder',
    title: 'Bunt sind schon die Wälder',
    category: 'jahreszeiten',
    origin: `Text Johann Gaudenz von Salis-Seewis (1762–1834), Melodie Johann Friedrich Reichardt (1752–1814); ${VLA}; ${PD}`,
    meter: 3,
    bpm: 110,
    chordpro: `
[C]Bunt sind schon die [G7]Wälder,
gelb die Stoppel[C]felder,
und der Herbst [G7]be[C]ginnt.
[C]Rote Blätter [F]fallen,
[G7]graue Nebel [C]wallen,
kühler [G7]weht der [C]Wind.
[C]Wie die volle [G7]Traube
an dem Reben[C]laube
purpur[G7]farbig [C]strahlt!
[C]Am Geländer [F]reifen
[G7]Pfirsiche, mit [C]Streifen
rot und [G7]weiß be[C]malt.`,
  },
  {
    id: 'klappert-die-muehle',
    title: 'Es klappert die Mühle am rauschenden Bach',
    category: 'kinder',
    origin: `Text Ernst Anschütz (1780–1861), Melodie traditionell (18. Jh.); ${VLA}; ${PD}`,
    meter: 6,
    bpm: 170,
    chordpro: `
Es [C]klappert die Mühle am [G7]rauschenden [C]Bach,
klipp [G7]klapp!
Bei [C]Tag und bei Nacht ist der [G7]Müller stets [C]wach,
klipp [G7]klapp!
Er [C]mahlet das Korn zu dem [F]kräftigen [C]Brot,
und [G7]haben wir dieses, so [C]hat’s keine Not.
Klipp [G7]klapp, klipp [C]klapp, klipp [G7]klapp! [C]
[C]Flink laufen die Räder und [G7]drehen den [C]Stein,
klipp [G7]klapp!
Und [C]mahlen den Weizen zu [G7]Mehl uns so [C]fein,
klipp [G7]klapp!
Der [C]Müller, der füllt uns den [F]schweren [C]Sack,
der [G7]Bäcker das Brot und den [C]Kuchen backt.
Klipp [G7]klapp, klipp [C]klapp, klipp [G7]klapp! [C]`,
  },
  {
    id: 'jaeger-aus-kurpfalz',
    title: 'Ein Jäger aus Kurpfalz',
    category: 'lagerfeuer',
    origin: `Text und Melodie anonym, 18. Jahrhundert; ${VLA}; ${PD}`,
    meter: 3,
    bpm: 120,
    chordpro: `
Ein [C]Jäger aus Kur[G7]pfalz,
der [C]reitet durch den [G7]grünen Wald,
er [C]schießt das Wild da[F]her,
gleich [C]wie es [G7]ihm ge[C]fällt.
Ju[C]ja, juja, gar [G7]lustig ist die [C]Jägerei
all[F]hier auf grüner [C]Heid, all[G7]hier auf grüner [C]Heid.
Auf! [C]Sattelt mir mein [G7]Pferd
und [C]legt darauf den [G7]Mantelsack,
so [C]reit ich hin und [F]her
als [C]Jäger [G7]aus Kur[C]pfalz.
Ju[C]ja, juja, gar [G7]lustig ist die [C]Jägerei
all[F]hier auf grüner [C]Heid, all[G7]hier auf grüner [C]Heid.`,
  },
  {
    id: 'bruennlein-fliessen',
    title: 'Wenn alle Brünnlein fließen',
    category: 'lagerfeuer',
    origin: `Text und Melodie anonym (Des Knaben Wunderhorn 1808); ${VLA}; ${PD}`,
    meter: 3,
    bpm: 110,
    chordpro: `
Wenn [C]alle Brünnlein [G7]fließen,
so [G7]muss man [C]trinken;
wenn [C]ich mein Schatz nicht [F]rufen darf,
ju[C]ja, rufen [G7]darf,
tu [G7]ich ihm [C]winken.
Ja, [C]winken mit den [G7]Augen
und [G7]treten auf den [C]Fuß;
’s ist [C]eine in der [F]Stuben,
ju[C]ja, [G7]Stuben,
und [G7]die mir werden [C]muss.`,
  },
  {
    id: 'ade-zur-guten-nacht',
    title: 'Ade zur guten Nacht',
    category: 'lagerfeuer',
    origin: `Text und Melodie anonym, Sachsen/Thüringen um 1840; ${VLA}; ${PD}`,
    meter: 3,
    bpm: 100,
    chordpro: `
A[C]de zur guten [G7]Nacht!
Jetzt [G7]wird der Schluss ge[C]macht,
dass [C]ich muss [G7]scheiden.
Im [C]Sommer, da wächst der [F]Klee,
im [C]Winter, da schneit’s den [G7]Schnee,
ich [C]muss dich [G7]mei[C]den.
Es [C]trauern Berg und [G7]Tal,
wo [G7]ich viel tausend[C]mal
bin [C]drüber [G7]gangen;
das [C]hat deine Schönheit ge[F]macht,
die [C]hat mich zum Lieben ge[G7]bracht
mit [C]großem Ver[G7]lan[C]gen.`,
  },
  {
    id: 'alle-voegel',
    title: 'Alle Vögel sind schon da',
    category: 'jahreszeiten',
    origin: `Text August Heinrich Hoffmann von Fallersleben (1798–1874), Melodie traditionell (18. Jh.); ${VLA}; ${PD}`,
    meter: 4,
    bpm: 110,
    chordpro: `
[C]Alle Vögel [G7]sind schon [C]da, [F]alle [C]Vögel, [G7]al[C]le!
[C]Welch ein Singen, [G7]Musiziern,
[C]Pfeifen, Zwitschern, [G7]Tiriliern!
[C]Frühling will nun [F]einmarschiern,
[C]kommt mit [G7]Sang und [C]Schalle.
[C]Wie sie alle [G7]lustig [C]sind, [F]flink und [C]froh sich [G7]re[C]gen!
[C]Amsel, Drossel, [G7]Fink und Star
[C]und die ganze [G7]Vogelschar
[C]wünschet dir ein [F]frohes Jahr,
[C]lauter [G7]Heil und [C]Segen.`,
  },
  {
    id: 'kuckuck-und-esel',
    title: 'Der Kuckuck und der Esel',
    category: 'kinder',
    origin: `Text August Heinrich Hoffmann von Fallersleben (1798–1874), Melodie Carl Friedrich Zelter (1758–1832); ${VLA}; ${PD}`,
    meter: 3,
    bpm: 120,
    chordpro: `
Der [C]Kuckuck und der [G7]Esel,
die [G7]hatten großen [C]Streit,
wer [C]wohl am besten [F]sänge
zur [C]schönen [G7]Maien[C]zeit.
Der [C]Kuckuck sprach: „Das [G7]kann ich!“
Und [G7]hub gleich an zu [C]schrein.
„Ich [C]aber kann es [F]besser!“,
fiel [C]gleich der [G7]Esel [C]ein.
Das [C]klang so schön und [G7]lieblich,
so [G7]schön von fern und [C]nah;
sie [C]sangen alle [F]beide:
„Kuckuck, [C]Kuckuck, [G7]i-[C]a!“`,
  },
  {
    id: 'schwaebsche-eisebahne',
    title: 'Auf de schwäbsche Eisebahne',
    category: 'lagerfeuer',
    origin: `Text und Melodie anonym, schwäbisches Volkslied (Tübinger Kommersbuch 1853); ${VLA}; ${PD}`,
    meter: 4,
    bpm: 120,
    chordpro: `
Auf de [C]schwäbsche Eisebahne
gibt es [G7]viele Haltstat[C]ione:
Schtuegart, Ulm und [G7]Biberach,
Mekkebeure, [C]Durlesbach.
[C]Rulla, rulla, rullala, [G7]rulla, rulla, rulla[C]la,
Schtuegart, Ulm und [G7]Biberach,
Mekkebeure, [C]Durlesbach.
Auf de [C]schwäbsche Eisebahne
wollt a[G7]mal a Bäurle [C]fahre,
geht am Schalter, [G7]lüpft de Hut:
„Oi Bi[C]lettle, seid so gut!“
[C]Rulla, rulla, rullala, [G7]rulla, rulla, rulla[C]la.`,
  },
  {
    id: 'es-toenen-die-lieder',
    title: 'Es tönen die Lieder (Kanon)',
    category: 'jahreszeiten',
    origin: `Text und Melodie anonym, 19. Jahrhundert; ${VLA}; ${PD}`,
    meter: 3,
    bpm: 110,
    chordpro: `
Es [C]tönen die Lieder,
der [G7]Frühling kehrt [C]wieder,
es [C]spielet der Hirte
auf [G7]seiner Schal[C]mei:
[C]La la la la la la [G7]la la la [C]la!`,
  },
  {
    id: 'wohlauf-gottes-welt',
    title: 'Wohlauf in Gottes schöne Welt',
    category: 'lagerfeuer',
    origin: `Text Julius Rodenberg (1831–1914), Melodie anonym (frühes 19. Jh.); ${VLA}; ${PD}`,
    meter: 4,
    bpm: 110,
    chordpro: `
Wohl[C]auf in Gottes [G7]schöne [C]Welt,
lebe[G7]wohl, a[C]de!
Die [C]Luft ist blau und [G7]grün das [C]Feld,
lebe[G7]wohl, a[C]de!
Die [F]Berge glühn wie [C]Edelstein,
ich [G7]wandere mit dem [C]Sonnenschein,
tra[F]lala, (ade, ade, ade,) ins [G7]weite Land hi[C]nein.`,
  },
];
