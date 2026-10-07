import type { SongSource } from './song.ts';

// Kinder-, Jahreszeiten- und Weihnachtslieder ohne Melodie (Akkorde + Text). Alle gemeinfrei; Text nach dem in
// origin genannten Erstdruck (über den jeweiligen Wikipedia-Artikel), Rechtschreibung behutsam modernisiert,
// Akkorde als eigene einfache Begleitung.

export const KINDER_SONGS: SongSource[] = [
  {
    id: 'fuchs-gans',
    title: 'Fuchs, du hast die Gans gestohlen',
    category: 'kinder',
    origin: 'Text Ernst Anschütz (1780–1861), 1824, Melodie Volkslied; Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 4,
    bpm: 110,
    chordpro: `
[C]Fuchs, du hast die Gans gestohlen,
[F]gib sie wieder [C]her! [F]Gib sie wieder [C]her!
[G7]Sonst wird dich der [C]Jäger holen
[G7]mit dem Schieß[C]gewehr,
[G7]sonst wird dich der [C]Jäger holen
[G7]mit dem Schieß[C]gewehr.
[C]Liebes Füchslein, lass dir raten,
[F]sei doch nur kein [C]Dieb, [F]sei doch nur kein [C]Dieb;
[G7]nimm, du brauchst nicht [C]Gänsebraten,
[G7]mit der Maus vor[C]lieb,
[G7]nimm, du brauchst nicht [C]Gänsebraten,
[G7]mit der Maus vor[C]lieb.`,
  },
  {
    id: 'haeschen-grube',
    title: 'Häschen in der Grube',
    category: 'kinder',
    origin: 'Text Friedrich Fröbel (1782–1852), 1840, Melodie Volkslied; Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 2,
    bpm: 100,
    chordpro: `
[C]Häschen in der Grube [F]saß und [C]schlief, [F]saß und [C]schlief.
[G7]Armes Häschen, [C]bist du krank,
[G7]dass du nicht mehr [C]hüpfen kannst?
[C]Häschen hüpf, Häschen hüpf, [G7]Häschen [C]hüpf!
[C]Häschen, vor dem Hunde [F]hüte [C]dich, [F]hüte [C]dich!
[G7]Hat gar einen [C]scharfen Zahn,
[G7]packt damit mein [C]Häschen an.
[C]Häschen lauf, Häschen lauf, [G7]Häschen [C]lauf!`,
  },
  {
    id: 'summ-summ',
    title: 'Summ, summ, summ',
    category: 'kinder',
    origin: 'Text August Heinrich Hoffmann von Fallersleben (1798–1874), Melodie Volkslied aus Böhmen; Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 2,
    bpm: 100,
    chordpro: `
[C]Summ, summ, summ!
[G7]Bienchen, summ her[C]um!
[C]Ei, wir tun dir [G7]nichts zuleide,
[C]flieg nur aus in [G7]Wald und Heide!
[C]Summ, summ, summ!
[G7]Bienchen, summ her[C]um!
[C]Summ, summ, summ!
[G7]Bienchen, summ her[C]um!
[C]Such in Blumen, [G7]such in Blümchen
[C]dir ein Tröpfchen, [G7]dir ein Krümchen!
[C]Summ, summ, summ!
[G7]Bienchen, summ her[C]um!
[C]Summ, summ, summ!
[G7]Bienchen, summ her[C]um!
[C]Kehre heim mit [G7]reicher Habe,
[C]bau uns manche [G7]volle Wabe!
[C]Summ, summ, summ!
[G7]Bienchen, summ her[C]um!`,
  },
  {
    id: 'maennlein-im-walde',
    title: 'Ein Männlein steht im Walde',
    category: 'jahreszeiten',
    origin: 'Text August Heinrich Hoffmann von Fallersleben (1798–1874), Melodie Volksweise um 1800; Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 2,
    bpm: 90,
    chordpro: `
Ein [F]Männlein steht im Walde
ganz [F]still [C7]und [F]stumm,
es [F]hat von lauter Purpur
ein [F]Mänt[C7]lein [F]um.
[F]Sagt, wer mag das [C7]Männlein sein,
[F]das da steht im [C7]Wald allein
[F]mit dem purpurroten [F]Män[C7]te[F]lein?
Das [F]Männlein steht im Walde
auf [F]ei[C7]nem [F]Bein
und [F]hat auf seinem Haupte
schwarz [F]Käpp[C7]lein [F]klein.
[F]Sagt, wer mag das [C7]Männlein sein,
[F]das da steht im [C7]Wald allein
[F]mit dem kleinen schwarzen [F]Käp[C7]pe[F]lein?`,
  },
  {
    id: 'vogelhochzeit',
    title: 'Ein Vogel wollte Hochzeit machen',
    category: 'kinder',
    origin: 'Text traditionell (seit etwa 1470), Melodie aus Schlesien, gedruckt 1842; Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 2,
    bpm: 110,
    chordpro: `
Ein [C]Vogel wollte [G7]Hochzeit machen
in [C]dem grünen [G]Walde.
Fidi[C]rallala, fidi[G7]rallala,
fidi[C]ralla[G7]lala[C]la.
Die [C]Drossel war der [G7]Bräutigam,
die [C]Amsel war die [G]Braute.
Fidi[C]rallala, fidi[G7]rallala,
fidi[C]ralla[G7]lala[C]la.
Der [C]Sperber, der [G7]Sperber,
der [C]war der Hochzeits[G]werber.
Fidi[C]rallala, fidi[G7]rallala,
fidi[C]ralla[G7]lala[C]la.`,
  },
  {
    id: 'bi-ba-butzemann',
    title: 'Es tanzt ein Bi-Ba-Butzemann',
    category: 'kinder',
    origin: 'Text traditionell (Des Knaben Wunderhorn, 1808), Melodie Volksweise; Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 2,
    bpm: 110,
    chordpro: `
Es [C]tanzt ein Bi-Ba-Butzemann
in [G7]unserm Haus he[C]rum, fidebum,
es [C]tanzt ein Bi-Ba-Butzemann
in [G7]unserm Haus he[C]rum.
Er [G7]rüttelt sich, er [C]schüttelt sich,
er [G7]wirft sein Säckchen [C]hinter sich.
Es [C]tanzt ein Bi-Ba-Butzemann
in [G7]unserm Haus he[C]rum.`,
  },
  {
    id: 'haensel-und-gretel',
    title: 'Hänsel und Gretel',
    category: 'kinder',
    origin: 'Text und Melodie anonym, gedruckt 1907; Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 4,
    bpm: 100,
    chordpro: `
[C]Hänsel und Gretel ver[G7]liefen sich im [C]Wald.
[C]Es war so finster und [G7]auch so bitter [C]kalt.
Sie [G7]kamen an ein Häuschen von [C]Pfefferkuchen fein.
[C]Wer mag der Herr wohl von [G7]diesem Häuschen [C]sein?
[C]Hu, hu, da schaut eine [G7]alte Hexe [C]raus!
[C]Lockte die Kinder ins [G7]Pfefferkuchen[C]haus.
Sie [G7]stellte sich gar freundlich, o [C]Hänsel, welche Not!
[C]Ihn wollt sie braten im [G7]Ofen braun wie [C]Brot.
[C]Doch als die Hexe zum [G7]Ofen schaut hin[C]ein,
[C]ward sie gestoßen von [G7]unserm Grete[C]lein.
Die [G7]Hexe musste braten, die [C]Kinder gehn nach Haus.
[C]Nun ist das Märchen von [G7]Hans und Gretel [C]aus.`,
  },
  {
    id: 'auf-der-mauer',
    title: 'Auf der Mauer, auf der Lauer',
    category: 'kinder',
    origin: 'Text und Melodie traditionell, gedruckt 1890; Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 2,
    bpm: 110,
    chordpro: `
[C]Auf der Mauer, auf der Lauer
[G7]sitzt ’ne kleine [C]Wanze.
[C]Auf der Mauer, auf der Lauer
[G7]sitzt ’ne kleine [C]Wanze.
[C]Seht euch nur die [F]Wanze an,
[G7]wie die Wanze [C]tanzen kann!
[C]Auf der Mauer, auf der Lauer
[G7]sitzt ’ne kleine [C]Wanze.
[C]Auf der Mauer, auf der Lauer
[G7]sitzt ’ne kleine [C]Wanz…
[C]Auf der Mauer, auf der Lauer
[G7]sitzt ’ne kleine [C]Wanz…
[C]Seht euch nur die [F]Wanz… an,
[G7]wie die Wanz… [C]tanz… kann!
[C]Auf der Mauer, auf der Lauer
[G7]sitzt ’ne kleine [C]Wanz…`,
  },
  {
    id: 'backe-kuchen',
    title: 'Backe, backe Kuchen',
    category: 'kinder',
    origin: 'Text und Melodie traditionell, Sachsen/Thüringen vor 1840; Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 4,
    bpm: 100,
    chordpro: `
[C]Backe, [F]backe [C]Kuchen,
der [C]Bäcker [F]hat ge[C]rufen.
[C]Wer will [F]guten [C]Kuchen backen,
[C]der muss [F]haben [C]sieben Sachen:
[G7]Eier und [C]Schmalz,
[G7]Zucker und [C]Salz,
[G7]Milch und [C]Mehl,
[C]Safran [F]macht den [C]Kuchen gehl!
[C]Schieb, [F]schieb in’n [C]O[G7]fen [C]’nein.`,
  },
  {
    id: 'gruen-gruen-gruen',
    title: 'Grün, grün, grün sind alle meine Kleider',
    category: 'kinder',
    origin: 'Volkslied, überliefert seit 1870 (Strophen 1842 bei Hoffmann/Richter); Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 2,
    bpm: 100,
    chordpro: `
[C]Grün, grün, [G7]grün sind alle meine [C]Kleider,
[C]grün, grün, [G7]grün ist alles, was ich [C]hab.
[C]Darum [F]lieb ich [G7]alles, was so [C]grün ist,
[C]weil mein [G7]Schatz ein Jäger [C]ist.
[C]Rot, rot, [G7]rot sind alle meine [C]Kleider,
[C]rot, rot, [G7]rot ist alles, was ich [C]hab.
[C]Darum [F]lieb ich [G7]alles, was so [C]rot ist,
[C]weil mein [G7]Schatz ein Reiter [C]ist.
[C]Blau, blau, [G7]blau sind alle meine [C]Kleider,
[C]blau, blau, [G7]blau ist alles, was ich [C]hab.
[C]Darum [F]lieb ich [G7]alles, was so [C]blau ist,
[C]weil mein [G7]Schatz ein Matrose [C]ist.`,
  },
  {
    id: 'schlaf-kindlein',
    title: 'Schlaf, Kindlein, schlaf',
    category: 'kinder',
    origin: 'Text traditionell (Des Knaben Wunderhorn, 1808), Melodie Johann Friedrich Reichardt (1752–1814); Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 2,
    bpm: 80,
    chordpro: `
[F]Schlaf, [C7]Kindlein, [F]schlaf,
der [C7]Vater hüt die [F]Schaf,
die [C7]Mutter schüttelts [F]Bäumelein,
da [C7]fällt herab ein [F]Träumelein.
[C7]Schlaf, Kindlein, [F]schlaf!
[F]Schlaf, [C7]Kindlein, [F]schlaf,
am [C7]Himmel ziehn die [F]Schaf,
die [C7]Sternlein sind die [F]Lämmerlein,
der [C7]Mond, der ist das [F]Schäferlein.
[C7]Schlaf, Kindlein, [F]schlaf!
[F]Schlaf, [C7]Kindlein, [F]schlaf,
so [C7]schenk ich dir ein [F]Schaf
mit [C7]einer goldnen [F]Schelle fein,
das [C7]soll dein Spielge[F]selle sein.
[C7]Schlaf, Kindlein, [F]schlaf!`,
  },
  {
    id: 'weisst-du-wie-viel',
    title: 'Weißt du, wie viel Sternlein stehen',
    category: 'kinder',
    origin: 'Text Wilhelm Hey (1789–1854), 1837 (Originaltext), Melodie Volksweise; Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 3,
    bpm: 90,
    chordpro: `
Weißt du, [C]wie viel [G7]Sterne [C]stehen
[A7]an dem [F]blauen [G7]Himmels[C]zelt?
Weißt du, [C]wie viel [G7]Wolken [C]gehen
[A7]weithin [F]über [G7]alle [C]Welt?
Gott der [D7]Herr hat [G7]sie ge[C]zählet,
dass ihm [D7]auch nicht [G7]eines [C]fehlet
an der [C]ganzen [G7]großen [C]Zahl,
[A7]an der [F]ganzen [G7]großen [C]Zahl.
Weißt du, [C]wie viel [G7]Mücklein [C]spielen
[A7]in der [F]hellen [G7]Sonnen[C]glut?
Wie viel [C]Fischlein [G7]auch sich [C]kühlen
[A7]in der [F]hellen [G7]Wasser[C]flut?
Gott der [D7]Herr rief [G7]sie mit [C]Namen,
dass sie [D7]all ins [G7]Leben [C]kamen,
dass sie [C]nun so [G7]fröhlich [C]sind,
[A7]dass sie [F]nun so [G7]fröhlich [C]sind.`,
  },
  {
    id: 'mein-hut',
    title: 'Mein Hut, der hat drei Ecken',
    category: 'kinder',
    origin: 'Text traditionell (vor 1870), Melodie neapolitanische Canzonetta (18. Jh.); Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 3,
    bpm: 110,
    chordpro: `
Mein [C]Hut, der hat drei [G7]Ecken,
drei Ecken hat mein [C]Hut.
Und [C]hätt er nicht drei [G7]Ecken,
so wär’s auch nicht mein [C]Hut.`,
  },
  {
    id: 'kuckuck-kuckuck',
    title: 'Kuckuck, Kuckuck, ruft’s aus dem Wald',
    category: 'jahreszeiten',
    origin: 'Text August Heinrich Hoffmann von Fallersleben (1798–1874), Melodie Volkslied (seit 1817); Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 3,
    bpm: 110,
    chordpro: `
[C]Kuckuck, Kuckuck [G7]ruft’s aus dem [C]Wald.
[G7]Lasset uns singen, [C]tanzen und springen!
[C]Frühling, Frühling [G7]wird es nun [C]bald.
[C]Kuckuck, Kuckuck [G7]lässt nicht sein [C]Schrein:
[G7]Komm in die Felder, [C]Wiesen und Wälder!
[C]Frühling, Frühling, [G7]stelle dich [C]ein!
[C]Kuckuck, Kuckuck, [G7]trefflicher [C]Held!
[G7]Was du gesungen, [C]ist dir gelungen:
[C]Winter, Winter [G7]räumet das [C]Feld.`,
  },
  {
    id: 'winter-ade',
    title: 'Winter, ade!',
    category: 'jahreszeiten',
    origin: 'Text August Heinrich Hoffmann von Fallersleben (1798–1874), Melodie fränkisches Volkslied (18. Jh.); Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 3,
    bpm: 110,
    chordpro: `
[C]Winter, [G7]a[C]de!
[C]Scheiden [G7]tut [C]weh.
[C]Aber dein [G7]Scheiden macht,
[G7]dass jetzt mein [C]Herze lacht.
[C]Winter, a[G7]de!
[C]Scheiden [G7]tut [C]weh.
[C]Winter, [G7]a[C]de!
[C]Scheiden [G7]tut [C]weh.
[C]Gerne ver[G7]gess ich dein,
[G7]kannst immer [C]ferne sein.
[C]Winter, a[G7]de!
[C]Scheiden [G7]tut [C]weh.
[C]Winter, [G7]a[C]de!
[C]Scheiden [G7]tut [C]weh.
[C]Gehst du nicht [G7]bald nach Haus,
[G7]lacht dich der [C]Kuckuck aus.
[C]Winter, a[G7]de!
[C]Scheiden [G7]tut [C]weh.`,
  },
  {
    id: 'im-maerzen-der-bauer',
    title: 'Im Märzen der Bauer',
    category: 'jahreszeiten',
    origin: 'Volkslied aus Mähren, Fassung Josef Pommer (1845–1918), 1905 – nicht die Fassung von 1923; Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 3,
    bpm: 110,
    chordpro: `
Im [F]Märzen der [C7]Bauer die Rösslein ein[F]spannt.
Er [F]pfleget und [C7]pflanzet all Bäume und [F]Land.
Er [C7]ackert, er [F]egget, er [C7]pflüget und [F]sät
und [F]regt seine [C7]Hände gar früh und noch [F]spät.
Den [F]Rechen, den [C7]Spaten, die nimmt er zur [F]Hand
und [F]setzet die [C7]Wiesen in ebenen [F]Stand;
auch [C7]pfropft er die [F]Bäume mit [C7]edlerem [F]Reis
und [F]spart weder [C7]Arbeit noch Mühe noch [F]Fleiß.`,
  },
  {
    id: 'alles-neu-mai',
    title: 'Alles neu macht der Mai',
    category: 'jahreszeiten',
    origin: 'Text Hermann Adam von Kamp (1796–1867), Melodie Volksweise (18. Jh.); Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 2,
    bpm: 100,
    chordpro: `
[C]Alles neu [G7]macht der Mai,
[C]macht die Seele frisch und frei.
[C]Lasst das Haus, [G7]kommt hinaus!
[C]Windet einen Strauß!
[G7]Rings erglänzet Sonnenschein,
[C]duftend prangen Flur und Hain:
[C]Vogelsang, [G7]Hörnerklang
[C]tönt den Wald entlang.
[C]Wir durchziehn [G7]Saaten grün,
[C]Haine, die ergötzend blühn,
[C]Waldespracht, [G7]neu gemacht
[C]nach des Winters Nacht.
[G7]Dort im Schatten an dem Quell,
[C]rieselnd munter, silberhell,
[C]Klein und Groß [G7]ruht im Moos
[C]wie im weichen Schoß.`,
  },
  {
    id: 'ich-geh-mit-meiner-laterne',
    title: 'Ich geh mit meiner Laterne',
    category: 'jahreszeiten',
    origin: 'Text und Melodie traditionell (Edition 1851) – nur die alten Strophen; Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 3,
    bpm: 110,
    chordpro: `
Ich [C]geh mit meiner La[C]terne
und [G7]meine Laterne mit [C]mir.
Da [C]oben leuchten die [C]Sterne,
und [G7]unten, da leuchten [C]wir.
[C]Laternenlicht,
[C]verlösch mir nicht!
[G7]Rabimmel, rabammel, ra[C]bum.
Ich [C]geh mit meiner La[C]terne
und [G7]meine Laterne mit [C]mir.
Da [C]oben leuchten die [C]Sterne,
und [G7]unten, da leuchten [C]wir.
[C]Mein Licht ist aus,
[C]ich geh nach Haus.
[G7]Rabimmel, rabammel, ra[C]bum.`,
  },
  {
    id: 'laterne-laterne',
    title: 'Laterne, Laterne',
    category: 'jahreszeiten',
    origin: 'Text und Melodie traditionell (um 1875); Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 4,
    bpm: 100,
    chordpro: `
[C]Laterne, Laterne,
[G7]Sonne, Mond und [C]Sterne.
[F]Brenne auf, mein [C]Licht,
[G7]brenne auf, mein [C]Licht,
[F]aber nur meine [C]liebe La[G7]terne [C]nicht!
[C]Laterne, Laterne,
[G7]Sonne, Mond und [C]Sterne.`,
  },
  {
    id: 'sankt-martin',
    title: 'Sankt Martin ritt durch Schnee und Wind',
    category: 'jahreszeiten',
    origin: 'Text und Melodie anonym, Niederrhein, Ende 19. Jh.; Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 4,
    bpm: 100,
    chordpro: `
[C]Sankt Martin, [G7]Sankt [C]Martin,
[C]Sankt Martin ritt durch [G7]Schnee und [C]Wind,
[C]sein Ross, das trug ihn [G7]fort ge[C]schwind.
[F]Sankt Martin ritt mit [C]leichtem Mut,
[G7]sein Mantel deckt ihn [C]warm und gut.
[C]Im Schnee saß, [G7]im Schnee [C]saß,
[C]im Schnee, da saß ein [G7]armer [C]Mann,
[C]hatt Kleider nicht, hatt [G7]Lumpen [C]an.
[F]„O helft mir doch in [C]meiner Not,
[G7]sonst ist der bittre [C]Frost mein Tod!“`,
  },
  {
    id: 'alle-jahre-wieder',
    title: 'Alle Jahre wieder',
    category: 'weihnachten',
    origin: 'Text Wilhelm Hey (1789–1854), Melodie Friedrich Silcher (1789–1860); Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 4,
    bpm: 90,
    chordpro: `
[C]Alle Jahre wie[G7]der
[C]kommt das Christus[G7]kind
[C]auf die Erde [F]nie[G7]der,
[C]wo wir [G7]Menschen [C]sind.
[C]Kehrt mit seinem Se[G7]gen
[C]ein in jedes [G7]Haus,
[C]geht auf allen [F]We[G7]gen
[C]mit uns [G7]ein und [C]aus.
[C]Ist auch mir zur Sei[G7]te
[C]still und uner[G7]kannt,
[C]dass es treu mich [F]lei[G7]te
[C]an der [G7]lieben [C]Hand.`,
  },
  {
    id: 'ihr-kinderlein-kommet',
    title: 'Ihr Kinderlein, kommet',
    category: 'weihnachten',
    origin: 'Text Christoph von Schmid (1768–1854), Melodie Johann Abraham Peter Schulz (1747–1800); Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 2,
    bpm: 90,
    chordpro: `
Ihr [C]Kinderlein, kommet, o [G7]kommet doch [C]all!
Zur [C]Krippe her kommet in [G7]Betlehems [C]Stall
und [G7]seht, was in dieser hoch[C]heiligen [F]Nacht
der [C]Vater im Himmel für [G7]Freude uns [C]macht!
O [C]seht in der Krippe, im [G7]nächtlichen [C]Stall,
seht [C]hier bei des Lichtleins hell[G7]glänzendem [C]Strahl
den [G7]lieblichen Knaben, das [C]himmlische [F]Kind,
viel [C]schöner und holder, als [G7]Engelein [C]sind.
Da [C]liegt es, das Kindlein, auf [G7]Heu und auf [C]Stroh,
Ma[C]ria und Josef be[G7]trachten es [C]froh;
die [G7]redlichen Hirten knien [C]betend da[F]vor,
hoch [C]oben schwebt jubelnd der [G7]Engelein [C]Chor.`,
  },
  {
    id: 'o-tannenbaum',
    title: 'O Tannenbaum',
    category: 'weihnachten',
    origin: 'Text Ernst Anschütz (1780–1861), 1824, Melodie Volksweise; Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 3,
    bpm: 90,
    chordpro: `
O [C]Tannenbaum, [G]o [C]Tannenbaum,
wie [Dm]treu sind dei[G7]ne Blät[C]ter!
Du [C7]grünst nicht [F]nur zur [G7]Sommerzeit,
nein, auch im Winter, [C]wenn es schneit.
O [C]Tannenbaum, [G]o [C]Tannenbaum,
wie [Dm]treu sind dei[G7]ne Blät[C]ter!
O [C]Tannenbaum, [G]o [C]Tannenbaum,
du [Dm]kannst mir sehr [G7]gefal[C]len!
Wie [C7]oft hat [F]nicht zur [G7]Weihnachtszeit
ein Baum von dir mich [C]hoch erfreut!
O [C]Tannenbaum, [G]o [C]Tannenbaum,
du [Dm]kannst mir sehr [G7]gefal[C]len!`,
  },
  {
    id: 'kling-gloeckchen',
    title: 'Kling, Glöckchen, klingelingeling',
    category: 'weihnachten',
    origin: 'Text Karl Enslin (1819–1875), Melodie anonym (gedruckt 1862); Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 2,
    bpm: 100,
    chordpro: `
[F]Kling, Glöckchen, klingelingeling,
[C7]kling, Glöckchen, [F]kling!
[C7]Lasst mich [F]ein, ihr Kin[C7]der,
ist so kalt der Win[F]ter,
[G7]öffnet mir die [C]Türen,
[G7]lasst mich nicht erfrie[C]ren! [C7]
[F]Kling, Glöckchen, klingelingeling,
[C7]kling, Glöckchen, [F]kling!
[F]Kling, Glöckchen, klingelingeling,
[C7]kling, Glöckchen, [F]kling!
[C7]Mädchen, [F]hört, und Büb[C7]chen,
macht mir auf das Stüb[F]chen,
[G7]bring euch viele [C]Gaben,
[G7]sollt euch dran er[C]laben! [C7]
[F]Kling, Glöckchen, klingelingeling,
[C7]kling, Glöckchen, [F]kling!`,
  },
  {
    id: 'leise-rieselt',
    title: 'Leise rieselt der Schnee',
    category: 'weihnachten',
    origin: 'Text und Melodie Eduard Ebel (1839–1905), 1895; Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 3,
    bpm: 90,
    chordpro: `
[C]Leise rieselt der Schnee,
[F]still und starr [G7]ruht der [C]See,
[G7]weihnachtlich glänzet der [C]Wald:
[Dm]Freue dich, [G7]Christkind kommt [C]bald!
[C]In den Herzen ist’s warm,
[F]still schweigt [G7]Kummer und [C]Harm,
[G7]Sorge des Lebens ver[C]hallt:
[Dm]Freue dich, [G7]Christkind kommt [C]bald!
[C]Bald ist heilige Nacht,
[F]Chor der [G7]Engel er[C]wacht,
[G7]horch nur, wie lieblich es [C]schallt:
[Dm]Freue dich, [G7]Christkind kommt [C]bald!`,
  },
  {
    id: 'lasst-uns-froh',
    title: 'Lasst uns froh und munter sein',
    category: 'weihnachten',
    origin: 'Text und Melodie anonym, 19. Jahrhundert; Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 4,
    bpm: 110,
    chordpro: `
[C]Lasst uns froh und munter sein
[G7]und uns recht von Herzen freun!
[C]Lustig, lustig, traleralera!
[C]Bald ist Nikolaus[G7]abend da,
[C]bald ist Nikolaus[G7]abend [C]da!
[C]Dann stell ich den Teller auf,
[G7]Nik’laus legt gewiss was drauf.
[C]Lustig, lustig, traleralera!
[C]Bald ist Nikolaus[G7]abend da,
[C]bald ist Nikolaus[G7]abend [C]da!
[C]Wenn ich schlaf, dann träume ich:
[G7]Jetzt bringt Nik’laus was für mich.
[C]Lustig, lustig, traleralera!
[C]Bald ist Nikolaus[G7]abend da,
[C]bald ist Nikolaus[G7]abend [C]da!`,
  },
  {
    id: 'morgen-kinder',
    title: 'Morgen, Kinder, wird’s was geben',
    category: 'weihnachten',
    origin: 'Text Karl Friedrich Splittegarb (1753–1802), 1795, Melodie Carl Gottlieb Hering (1766–1853); Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 2,
    bpm: 100,
    chordpro: `
[C]Morgen, Kinder, [G7]wird’s was [C]geben,
[C]morgen werden [G7]wir uns freun!
[C]Welche Wonne, [G7]welches [C]Leben
[C]wird in unserm [G7]Hause sein!
[F]Einmal werden [G7]wir noch wach,
[F]Heisa, dann ist [C]Weih[G7]nachts[C]tag!
[C]Wie wird dann die [G7]Stube [C]glänzen
[C]von der großen [G7]Lichterzahl!
[C]Schöner als bei [G7]frohen [C]Tänzen
[C]ein geputzter [G7]Kronensaal.
[F]Wisst ihr noch, wie [G7]vor’ges Jahr
[F]es am heil’gen [C]A[G7]bend [C]war?`,
  },
  {
    id: 'o-du-froehliche',
    title: 'O du fröhliche',
    category: 'weihnachten',
    origin: 'Text Johannes Daniel Falk (1768–1826) und Heinrich Holzschuher (1798–1847), Melodie „O sanctissima“ (traditionell); Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 4,
    bpm: 90,
    chordpro: `
[C]O du fröhliche, o du selige,
[C]gnaden[F]bringende [G7]Weihnachts[C]zeit!
[G7]Welt ging verloren, [C]Christ ist geboren:
[C]Freue, [F]freue dich, o [C]Chris[G7]ten[C]heit!
[C]O du fröhliche, o du selige,
[C]gnaden[F]bringende [G7]Weihnachts[C]zeit!
[G7]Christ ist erschienen, [C]uns zu versühnen:
[C]Freue, [F]freue dich, o [C]Chris[G7]ten[C]heit!
[C]O du fröhliche, o du selige,
[C]gnaden[F]bringende [G7]Weihnachts[C]zeit!
[G7]Himmlische Heere [C]jauchzen dir Ehre:
[C]Freue, [F]freue dich, o [C]Chris[G7]ten[C]heit!`,
  },
  {
    id: 'suesser-die-glocken',
    title: 'Süßer die Glocken nie klingen',
    category: 'weihnachten',
    origin: 'Text Friedrich Wilhelm Kritzinger (1816–1890), Melodie Volkslied (ab 1841); Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 3,
    bpm: 100,
    chordpro: `
[C]Süßer die Glocken nie [G7]klingen
[G7]als zu der Weihnachts[C]zeit,
[C]ist, als ob Engelein [F]singen
[G7]wieder von Frieden und [C]Freud,
[G7]wie sie ge[C]sungen in [G7]seliger Nacht,
[G7]wie sie ge[C]sungen in [G7]seliger Nacht.
[C]Glocken mit heiligem [F]Klang,
[G7]klingt doch die Erde ent[C]lang!
[C]O, wenn die Glocken er[G7]klingen,
[G7]schnell sie das Christkindlein [C]hört,
[C]tut sich vom Himmel dann [F]schwingen,
[G7]eilet hernieder zur [C]Erd.
[G7]Segnet den [C]Vater, die [G7]Mutter, das Kind,
[G7]segnet den [C]Vater, die [G7]Mutter, das Kind.
[C]Glocken mit heiligem [F]Klang,
[G7]klingt doch die Erde ent[C]lang!`,
  },
  {
    id: 'kommet-ihr-hirten',
    title: 'Kommet, ihr Hirten',
    category: 'weihnachten',
    origin: 'Deutscher Text Carl Riedel (1827–1888), 1870, Melodie traditionell aus Böhmen; Text nach dem Erstdruck (Wikipedia-Artikel); gemeinfrei',
    meter: 3,
    bpm: 100,
    chordpro: `
[C]Kommet, ihr Hirten, ihr Männer [G7]und [C]Fraun,
[C]kommet, das liebliche Kindlein [G7]zu [C]schaun,
[C]Christus, der Herr, ist [F]heute ge[G7]boren,
[C]den Gott zum Heiland [F]euch hat er[G7]koren.
[C]Fürchtet [G7]euch [C]nicht!
[C]Lasset uns sehen in Bethlehems [G7]Stall,
[C]was uns verheißen der himmlische [G7]Schall;
[C]was wir dort finden, [F]lasset uns [G7]künden,
[C]lasset uns preisen in [F]frommen [G7]Weisen:
[C]Halle[G7]lu[C]ja!`,
  },
];
