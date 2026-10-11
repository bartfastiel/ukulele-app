import type { SongSource } from './song.ts';

// Weihnachts- und Adventslieder ohne Melodie (Akkorde + Text), deutsch, englisch und französisch. Alle gemeinfrei: Text
// nach der in origin genannten Quelle (Rechtschreibung behutsam modernisiert; „Still, still, still“ in eigener Übertragung aus der Mundart), Akkorde als
// eigene einfache Begleitung. Melodien kommen, wo es ein gemeinfreies Notenbeispiel gibt, aus songs-melodies.ts.

export const CHRISTMAS_SONGS: SongSource[] = [
  {
    id: 'tochter-zion',
    title: 'Tochter Zion, freue dich',
    category: 'weihnachten',
    origin:
      'Text Friedrich Heinrich Ranke (1798–1876), Erstdruck 1826 (bei Louise Reichardt), Melodie Georg Friedrich Händel (1685–1759), Chor aus „Joshua“ (1747), 1751 in „Judas Maccabaeus“ übernommen; Text nach dem Wikipedia-Artikel',
    meter: 4,
    bpm: 100,
    chordpro: `
[C]Tochter Zion, [G7]freue [C]dich,
[G7]jauchze laut, Je[C]rusa[G7]lem![C]
[G7]Sieh, dein König [C]kommt zu dir,
[G7]ja, er kommt, der [C]Friede[G7]fürst.[C]
[C]Tochter Zion, [G7]freue [C]dich,
[G7]jauchze laut, Je[C]rusa[G7]lem![C]
[C]Hosianna, [G7]Davids [C]Sohn,
[G7]sei gesegnet [C]deinem [G7]Volk![C]
[G7]Gründe nun dein [C]ew’ges Reich,
[G7]Hosianna [C]in der [G7]Höh![C]
[C]Hosianna, [G7]Davids [C]Sohn,
[G7]sei gesegnet [C]deinem [G7]Volk![C]
[C]Hosianna, [G7]Davids [C]Sohn,
[G7]sei gegrüßet, [C]König [G7]mild![C]
[G7]Ewig steht dein [C]Friedensthron,
[G7]du des ew’gen [C]Vaters [G7]Kind.[C]
[C]Hosianna, [G7]Davids [C]Sohn,
[G7]sei gegrüßet, [C]König [G7]mild![C]`,
  },
  {
    id: 'es-ist-ein-ros',
    title: 'Es ist ein Ros entsprungen',
    category: 'weihnachten',
    origin:
      'Text 1. und 2. Strophe traditionell (Speyerer Gesangbuch 1599, 2. Strophe nach Michael Praetorius, 1571–1621), 3. Strophe Friedrich Layriz (1808–1859), 1844; Melodie traditionell (gedruckt Köln 1599); Text nach Layriz 1844 (Wikipedia-Artikel)',
    meter: 4,
    bpm: 80,
    chordpro: `
Es [C]ist ein Ros ent[Am]sprungen
[F]aus einer [G7]Wurzel [C]zart,
wie [C]uns die Alten [Am]sungen,
[F]von Jesse [G7]kam die [C]Art
und [Am]hat ein Blümlein [G7]bracht
[C]mitten im kalten [Am]Winter
[F]wohl zu der [G7]halben [C]Nacht.
Das [C]Röslein, das ich [Am]meine,
[F]davon Je[G7]saias [C]sagt,
hat [C]uns gebracht al[Am]leine
[F]Marie, die [G7]reine [C]Magd.
Aus [Am]Gottes ew’gem [G7]Rat
[C]hat sie ein Kind ge[Am]boren
[F]wohl zu der [G7]halben [C]Nacht.
Das [C]Röselein so [Am]kleine,
[F]das duftet [G7]uns so [C]süß,
mit [C]seinem hellen [Am]Scheine
[F]vertreibt’s die [G7]Finster[C]nis.
Wahr [Am]Mensch und wahrer [G7]Gott,
[C]hilft uns aus allem [Am]Leide,
[F]rettet von [G7]Sünd und [C]Tod.`,
  },
  {
    id: 'am-weihnachtsbaum',
    title: 'Am Weihnachtsbaum die Lichter brennen',
    category: 'weihnachten',
    origin: 'Text Hermann Kletke (1813–1886), 1841, Melodie anonym (um 1830); Text nach dem Erstdruck (Wikipedia-Artikel)',
    meter: 3,
    bpm: 100,
    chordpro: `
Am [C]Weihnachtsbaum die [C]Lichter [G7]brennen,
wie [G7]glänzt er festlich, [G7]lieb und [C]mild,
als [C]spräch er: Wollt in [F]mir er[C]kennen
ge[G7]treuer Hoffnung [G7]stilles [C]Bild.
Die [C]Kinder stehn mit [C]hellen [G7]Blicken,
das [G7]Auge lacht, es [G7]lacht das [C]Herz;
o [C]fröhlich, seliges [F]Ent[C]zücken!
Die [G7]Alten schauen [G7]himmel[C]wärts.
Zwei [C]Engel sind her[C]einge[G7]treten,
kein [G7]Auge hat sie [G7]kommen [C]sehn,
sie [C]gehn zum Weihnachts[F]tisch und [C]beten
und [G7]wenden wieder [G7]sich und [C]gehn.`,
  },
  {
    id: 'was-soll-das-bedeuten',
    title: 'Was soll das bedeuten',
    category: 'weihnachten',
    origin:
      'Text und Melodie traditionell aus Schlesien, gedruckt 1842 in „Schlesische Volkslieder“ von Hoffmann von Fallersleben (1798–1874) und Ernst Richter (1805–1876); Text nach dem Druck von 1842',
    meter: 3,
    bpm: 110,
    chordpro: `
Was [C]soll das be[C]deuten? Es [G7]taget ja [C]schon.
Ich [C]weiß wohl, es [C]geht erst um [G7]Mitternacht [C]rum.
[F]Schaut nur da[C]her, [G7]schaut nur da[C]her,
wie [F]glänzen die [C]Sternlein je [G7]länger, je [C]mehr.
Treibt [C]z’sammen, treibt [C]z’sammen die [G7]Schäflein für[C]bass.
Treibt [C]z’sammen, treibt [C]z’sammen, dort [G7]zeig ich euch [C]was.
[F]Dort in dem [C]Stall, [G7]dort in dem [C]Stall
werd’t [F]Wunderding’ [C]sehen, treibt [G7]z’sammen ein[C]mal.
Ich [C]hab nur ein [C]wenig von [G7]weitem ge[C]guckt,
da [C]hat mir mein [C]Herz schon vor [G7]Freuden ge[C]hupft:
[F]Ein schönes [C]Kind, [G7]ein schönes [C]Kind
liegt [F]dort in der [C]Krippe bei [G7]Esel und [C]Rind.`,
  },
  {
    id: 'still-still-still',
    title: 'Still, still, still',
    category: 'weihnachten',
    origin:
      'Text und Melodie traditionell aus dem Salzburger Land, gedruckt 1865 in der Sammlung von Vinzenz Maria Süß (1802–1868); Text: eigene Übertragung aus der Mundart nach Süß 1865 (Wikipedia-Artikel)',
    meter: 3,
    bpm: 80,
    chordpro: `
[C]Still, still, still, [G7]weil’s Kindlein schlafen [C]will!
Ma[G7]ria tut es [C]niedersingen,
[G7]ihre keusche Brust [C]darbringen.
[C]Still, still, still, [G7]weil’s Kindlein schlafen [C]will.
[C]Schlaf, schlaf, schlaf, [G7]mein liebes Kindlein, [C]schlaf!
Die [G7]Engel tun schön [C]musizieren,
[G7]bei dem Kindlein [C]jubilieren.
[C]Schlaf, schlaf, schlaf, [G7]mein liebes Kindlein, [C]schlaf.
[C]Groß, groß, groß, [G7]die Lieb ist über[C]groß!
Gott [G7]hat den Himmelsthron [C]verlassen
[G7]und muss reisen auf der [C]Straßen;
[C]groß, groß, groß, [G7]die Lieb ist über[C]groß!`,
  },
  {
    id: 'zu-bethlehem-geboren',
    title: 'Zu Bethlehem geboren',
    category: 'weihnachten',
    origin:
      'Text Friedrich Spee (1591–1635), gedruckt Köln 1637, Melodie nach dem französischen „Une petite feste“ (Paris 1599); Text nach dem Wikipedia-Artikel',
    meter: 4,
    bpm: 90,
    chordpro: `
Zu [C]Bethlehem ge[G7]boren
ist [G7]uns ein Kinde[C]lein.
Das [C]hab ich auser[G7]koren,
sein [G7]eigen will ich [C]sein.
[F]Eia, [C]eia, sein [G7]eigen will ich [C]sein.
In [C]seine Lieb ver[G7]senken
will [G7]ich mich ganz hin[C]ab;
mein [C]Herz will ich ihm [G7]schenken
und [G7]alles, was ich [C]hab.
[F]Eia, [C]eia, und [G7]alles, was ich [C]hab.
O [C]Kindelein, von [G7]Herzen
dich [G7]will ich lieben [C]sehr
in [C]Freuden und in [G7]Schmerzen,
je [G7]länger mehr und [C]mehr.
[F]Eia, [C]eia, je [G7]länger mehr und [C]mehr.`,
  },
  {
    id: 'macht-hoch-die-tuer',
    title: 'Macht hoch die Tür',
    category: 'weihnachten',
    origin: 'Text Georg Weissel (1590–1635), 1623, Melodie Halle 1704 (Freylinghausens Gesangbuch); Text nach dem Wikipedia-Artikel',
    meter: 3,
    bpm: 110,
    chordpro: `
Macht [C]hoch die Tür, die [G7]Tor macht [C]weit;
es [C]kommt der Herr der [G7]Herrlich[C]keit,
ein [Am]König aller [Dm]König[G7]reich,
ein [C]Heiland aller [F]Welt zu[C]gleich,
der [C]Heil und Leben [F]mit sich [C]bringt;
der[F]halben jauchzt, mit [G7]Freuden [C]singt:
Ge[F]lobet [C]sei mein [G7]Gott,
mein [C]Schöpfer [G7]reich von [C]Rat.
Er [C]ist gerecht, ein [G7]Helfer [C]wert;
Sanft[C]mütigkeit ist [G7]sein Ge[C]fährt,
sein [Am]Königskron ist [Dm]Heilig[G7]keit,
sein [C]Zepter ist Barm[F]herzig[C]keit;
all [C]unsre Not zum [F]End er [C]bringt,
der[F]halben jauchzt, mit [G7]Freuden [C]singt:
Ge[F]lobet [C]sei mein [G7]Gott,
mein [C]Heiland [G7]groß von [C]Tat.
O [C]wohl dem Land, o [G7]wohl der [C]Stadt,
so [C]diesen König [G7]bei sich [C]hat.
Wohl [Am]allen Herzen [Dm]insge[G7]mein,
da [C]dieser König [F]ziehet [C]ein.
Er [C]ist die rechte [F]Freuden[C]sonn,
bringt [F]mit sich lauter [G7]Freud und [C]Wonn.
Ge[F]lobet [C]sei mein [G7]Gott,
mein [C]Tröster [G7]früh und [C]spat.`,
  },
  {
    id: 'es-kommt-ein-schiff',
    title: 'Es kommt ein Schiff, geladen',
    category: 'weihnachten',
    origin:
      'Text Daniel Sudermann (1550–1631) nach einem älteren Lied (Elsass, 15. Jahrhundert), gedruckt Straßburg 1626; Melodie traditionell (Andernacher Gesangbuch 1608); Text nach dem Druck von 1626 (Wikipedia-Artikel)',
    meter: 3,
    bpm: 90,
    chordpro: `
Es [Am]kommt ein Schiff, ge[G]laden
bis [C]an sein’ höchsten [E7]Bord,
trägt [Am]Gottes Sohn voll [G]Gnaden,
des [Dm]Vaters ewigs [Am]Wort.
Das [Am]Schiff geht still im [G]Triebe,
es [C]trägt ein teure [E7]Last;
der [Am]Segel ist die [G]Liebe,
der [Dm]Heilig Geist der [Am]Mast.
Der [Am]Anker haft’ auf [G]Erden,
und [C]das Schiff ist am [E7]Land.
Gotts [Am]Wort tut uns Fleisch [G]werden,
der [Dm]Sohn ist uns ge[Am]sandt.
Zu [Am]Bethlehem ge[G]boren
im [C]Stall ein Kinde[E7]lein,
gibt [Am]sich für uns ver[G]loren;
ge[Dm]lobet muss es [Am]sein.`,
  },
  {
    id: 'vom-himmel-hoch',
    title: 'Vom Himmel hoch, da komm ich her',
    category: 'weihnachten',
    origin: 'Text Martin Luther (1483–1546), 1535, Melodie Martin Luther, gedruckt Leipzig 1539; Text nach dem Wikipedia-Artikel',
    meter: 4,
    bpm: 90,
    chordpro: `
Vom [C]Himmel [G7]hoch, da [C]komm ich her,
ich [C]bring euch [F]gute [G7]neue [C]Mär,
der [Am]guten [Dm]Mär bring [G7]ich so viel,
da[C]von ich [F]singn und [G7]sagen [C]will.
Euch [C]ist ein [G7]Kindlein [C]heut geborn
von [C]einer [F]Jungfrau [G7]auser[C]korn,
ein [Am]Kinde[Dm]lein, so [G7]zart und fein,
das [C]soll eu’r [F]Freud und [G7]Wonne [C]sein.
Es [C]ist der [G7]Herr Christ, [C]unser Gott,
der [C]will euch [F]führn aus [G7]aller [C]Not,
er [Am]will eu’r [Dm]Heiland [G7]selber sein,
von [C]allen [F]Sünden [G7]machen [C]rein.`,
  },
  {
    id: 'herbei-o-ihr-glaeubigen',
    title: 'Herbei, o ihr Gläub’gen',
    category: 'weihnachten',
    origin:
      'Deutscher Text Friedrich Heinrich Ranke (1798–1876), Erstdruck 1826, nach dem lateinischen „Adeste fideles“; Melodie John Francis Wade (1711–1786) zugeschrieben; Text nach Rankes Wortlaut (Wikipedia-Artikel)',
    meter: 4,
    bpm: 90,
    chordpro: `
Her[C]bei, o ihr [G7]Gläub’gen, [C]fröhlich trium[G7]phierend,
o [C]kommet, o [F]kommet nach [C]Beth[G7]le[C]hem!
[F]Sehet das [C]Kindlein, [G7]uns zum Heil ge[C]boren!
O [C]lasset uns anbeten, o [G7]lasset uns anbeten,
o [C]lasset uns [F]an[C]be[G7]ten den [C]König!
Du [C]König der [G7]Ehren, [C]Herr der Heer[G7]scharen,
dich [C]trug der [F]Jungfrau [C]rei[G7]ner [C]Schoß,
[F]dich, wahrer [C]Gott, von [G7]Ewigkeit ge[C]boren.
O [C]lasset uns anbeten, o [G7]lasset uns anbeten,
o [C]lasset uns [F]an[C]be[G7]ten den [C]König!
Kommt, [C]singet dem [G7]Herren, [C]o ihr Engel[G7]chöre!
Froh[C]locket, froh[F]locket, ihr [C]Se[G7]li[C]gen:
[F]„Ehre sei [C]Gott im [G7]Himmel und auf [C]Erden!“
O [C]lasset uns anbeten, o [G7]lasset uns anbeten,
o [C]lasset uns [F]an[C]be[G7]ten den [C]König!`,
  },
  {
    id: 'mon-beau-sapin',
    title: 'Mon beau sapin',
    category: 'weihnachten',
    origin:
      'Französischer Text Laurent Delcasso (1797–1887), 1856, nach „O Tannenbaum“, Melodie Volksweise; Text nach dem Erstdruck (französischer Wikipedia-Artikel)',
    meter: 3,
    bpm: 90,
    chordpro: `
Mon [C]beau sapin, [G]roi [C]des forêts,
que [Dm]j’aime ta [G7]ver[C]dure.
Quand [C7]par l’hi[F]ver, bois [G7]et guérets
sont dépouillés de [C]leurs attraits,
mon [C]beau sapin, [G]roi [C]des forêts,
tu [Dm]gardes ta [G7]pa[C]rure.
Toi [C]que Noël [G]plan[C]ta chez nous
au [Dm]saint anni[G7]ver[C]saire,
jo[C7]li sa[F]pin, comme [G7]ils sont doux
et tes bonbons et [C]tes joujoux !
Toi [C]que Noël [G]plan[C]ta chez nous
par [Dm]les mains de [G7]ma [C]mère.
Mon [C]beau sapin, [G]tes [C]verts sommets
et [Dm]leur fidèle [G7]om[C]brage
de [C7]la foi [F]qui ne [G7]ment jamais,
de la constance [C]et de la paix,
mon [C]beau sapin, [G]tes [C]verts sommets
m’of[Dm]frent la douce [G7]i[C]mage.`,
  },
  {
    id: 'il-est-ne',
    title: 'Il est né, le divin Enfant',
    category: 'weihnachten',
    origin:
      'Text und Melodie traditionell (Frankreich; Text gedruckt 1818, Melodie notiert 1819, gedruckt 1862 von Jean-Romary Grosjean, 1815–1888); Text nach dem englischen Wikipedia-Artikel',
    meter: 2,
    bpm: 100,
    chordpro: `
Il est [C]né le di[G7]vin En[C]fant,
[C]jouez, haut[F]bois, réson[C]nez, mu[G7]settes !
Il est [C]né le di[G7]vin En[C]fant,
[F]chantons [C]tous son a[G7]vène[C]ment !
De[C]puis plus de [G7]quatre mille [C]ans,
[C]nous le pro[F]mettaient les [C]pro[G7]phètes,
de[C]puis plus de [G7]quatre mille [C]ans,
[F]nous at[C]tendions cet [G7]heureux [C]temps.
Il est [C]né le di[G7]vin En[C]fant,
[C]jouez, haut[F]bois, réson[C]nez, mu[G7]settes !
Il est [C]né le di[G7]vin En[C]fant,
[F]chantons [C]tous son a[G7]vène[C]ment !
Ah ! qu’il [C]est beau, qu’il [G7]est char[C]mant !
[C]Ah ! que ses [F]grâces sont [C]par[G7]faites !
Ah ! qu’il [C]est beau, qu’il [G7]est char[C]mant !
[F]Qu’il est [C]doux ce di[G7]vin En[C]fant !
Il est [C]né le di[G7]vin En[C]fant,
[C]jouez, haut[F]bois, réson[C]nez, mu[G7]settes !
Il est [C]né le di[G7]vin En[C]fant,
[F]chantons [C]tous son a[G7]vène[C]ment !
Une é[C]table est son [G7]loge[C]ment,
[C]un peu de [F]paille est sa [C]cou[G7]chette,
une é[C]table est son [G7]loge[C]ment,
[F]pour un [C]dieu quel a[G7]baisse[C]ment !
Il est [C]né le di[G7]vin En[C]fant,
[C]jouez, haut[F]bois, réson[C]nez, mu[G7]settes !
Il est [C]né le di[G7]vin En[C]fant,
[F]chantons [C]tous son a[G7]vène[C]ment !`,
  },
  {
    id: 'les-anges',
    title: 'Les anges dans nos campagnes',
    category: 'weihnachten',
    origin:
      'Text und Melodie traditionell (Frankreich; Text gedruckt 1805, Fassung mit Melodie 1842 bei Louis Lambillotte, 1796–1855); Text nach dem Druck Lille 1862 (französisches Wikisource)',
    meter: 4,
    bpm: 100,
    chordpro: `
[C]Les anges dans [G7]nos cam[C]pagnes
[C]ont entonné [G7]l’hymne des [C]cieux,
[C]et l’écho de [G7]nos mon[C]tagnes
[C]redit ce chant [G7]mélodi[C]eux :
[C]Glo[Am]ri[Dm]a [G7]in ex[C]cel[F]sis [G7]De[C]o !
[C]Glo[Am]ri[Dm]a [G7]in ex[C]cel[F]sis [G7]De[C]o !
[C]Bergers, pour qui [G7]cette [C]fête ?
[C]Quel est l’objet [G7]de tous ces [C]chants ?
[C]Quel vainqueur ? [G7]Quelle con[C]quête
[C]mérite ces [G7]cris triom[C]phants ?
[C]Glo[Am]ri[Dm]a [G7]in ex[C]cel[F]sis [G7]De[C]o !
[C]Glo[Am]ri[Dm]a [G7]in ex[C]cel[F]sis [G7]De[C]o !
[C]Ils annoncent [G7]la nais[C]sance
[C]du libéra[G7]teur d’Isra[C]ël,
[C]et pleins de re[G7]connais[C]sance,
[C]chantent, en ce [G7]jour so[C]lennel :
[C]Glo[Am]ri[Dm]a [G7]in ex[C]cel[F]sis [G7]De[C]o !
[C]Glo[Am]ri[Dm]a [G7]in ex[C]cel[F]sis [G7]De[C]o !`,
  },
  {
    id: 'entre-le-boeuf',
    title: 'Entre le bœuf et l’âne gris',
    category: 'weihnachten',
    origin:
      'Text und Melodie traditionell (Frankreich, ältester Druck Nantes 1792); Text nach dem französischen Wikipedia-Artikel',
    meter: 4,
    bpm: 150,
    chordpro: `
[Am]Entre le [Am]bœuf et l’âne [E7]gris,
[Am]dors, dors, [Am]dors le petit [E7]fils.
[Am]Mille anges di[Dm]vins,
[Am]mille séra[E7]phins
[Am]volent à l’en[Am]tour
[Dm]de ce grand [E7]Dieu d’a[Am]mour.
[Am]Entre les [Am]deux bras de Ma[E7]rie,
[Am]dors, dors, [Am]dors le fruit de [E7]vie.
[Am]Mille anges di[Dm]vins,
[Am]mille séra[E7]phins
[Am]volent à l’en[Am]tour
[Dm]de ce grand [E7]Dieu d’a[Am]mour.
[Am]Entre les [Am]roses et les [E7]lys,
[Am]dors, dors, [Am]dors le petit [E7]fils.
[Am]Mille anges di[Dm]vins,
[Am]mille séra[E7]phins
[Am]volent à l’en[Am]tour
[Dm]de ce grand [E7]Dieu d’a[Am]mour.`,
  },
  {
    id: 'we-wish-you',
    title: 'We Wish You a Merry Christmas',
    category: 'weihnachten',
    origin:
      'Text und Melodie traditionell (England, West Country); früheste Notenquelle Arthur Warrell (1883–1939), Oxford 1935 – nach EU-Recht gemeinfrei (70 Jahre nach dem Tod); Text nach Wikisource',
    meter: 3,
    bpm: 120,
    chordpro: `
We [C]wish you a merry [F]Christmas,
we [D7]wish you a merry [G7]Christmas,
we [E7]wish you a merry [Am]Christmas
and a [F]happy [G7]New [C]Year!
Good [C]tidings we [G7]bring
to [D7]you and your [G7]kin;
we [C]wish you a merry [Am]Christmas
and a [F]happy [G7]New [C]Year!
Now [C]bring us some figgy [F]pudding,
now [D7]bring us some figgy [G7]pudding,
now [E7]bring us some figgy [Am]pudding,
and [F]bring some [G7]out [C]here!
Good [C]tidings we [G7]bring
to [D7]you and your [G7]kin;
we [C]wish you a merry [Am]Christmas
and a [F]happy [G7]New [C]Year!
For [C]we all like figgy [F]pudding,
we [D7]all like figgy [G7]pudding,
we [E7]all like figgy [Am]pudding,
so [F]bring some [G7]out [C]here!
Good [C]tidings we [G7]bring
to [D7]you and your [G7]kin;
we [C]wish you a merry [Am]Christmas
and a [F]happy [G7]New [C]Year!
And we [C]won’t go until we’ve got [F]some,
we [D7]won’t go until we’ve got [G7]some,
we [E7]won’t go until we’ve got [Am]some,
so [F]bring some [G7]out [C]here!
Good [C]tidings we [G7]bring
to [D7]you and your [G7]kin;
we [C]wish you a merry [Am]Christmas
and a [F]happy [G7]New [C]Year!`,
  },
  {
    id: 'deck-the-halls',
    title: 'Deck the Halls',
    category: 'weihnachten',
    origin:
      'Englischer Text nach Thomas Oliphant (1799–1873), 1862, in der Fassung aus „The Pennsylvania School Journal“ (1877), Melodie traditionell aus Wales; Text nach dem englischen Wikipedia-Artikel',
    meter: 4,
    bpm: 120,
    chordpro: `
[C]Deck the hall with boughs of holly,
[C]Fa, la, la, la, la, [G7]la, la, la, [C]la!
[C]’Tis the season to be jolly,
[C]Fa, la, la, la, la, [G7]la, la, la, [C]la!
[G7]Don we now our [C]gay ap[G7]parel,
[C]Fa, la, la, [Am]la, la, la, [D7]la, la, [G7]la!
[C]Troll the ancient Christmas carol,
[F]Fa, la, la, la, [C]la, [G7]la, la, la, [C]la!
[C]See the blazing yule before us,
[C]Fa, la, la, la, la, [G7]la, la, la, [C]la!
[C]Strike the harp and join the chorus.
[C]Fa, la, la, la, la, [G7]la, la, la, [C]la!
[G7]Follow me in [C]merry [G7]measure,
[C]Fa, la, la, [Am]la, la, la, [D7]la, la, [G7]la!
[C]While I tell of Christmas treasure,
[F]Fa, la, la, la, [C]la, [G7]la, la, la, [C]la!
[C]Fast away the old year passes,
[C]Fa, la, la, la, la, [G7]la, la, la, [C]la!
[C]Hail the new, ye lads and lasses!
[C]Fa, la, la, la, la, [G7]la, la, la, [C]la!
[G7]Sing we joyous [C]all to[G7]gether,
[C]Fa, la, la, [Am]la, la, la, [D7]la, la, [G7]la!
[C]Heedless of the wind and weather,
[F]Fa, la, la, la, [C]la, [G7]la, la, la, [C]la!`,
  },
  {
    id: 'joy-to-the-world',
    title: 'Joy to the World',
    category: 'weihnachten',
    origin:
      'Text Isaac Watts (1674–1748), 1719, Melodie „Antioch“ von Lowell Mason (1792–1872), 1839, Georg Friedrich Händel zugeschrieben; Text nach „The Army and Navy Hymnal“ (1920, Wikisource)',
    meter: 2,
    bpm: 90,
    chordpro: `
[C]Joy to the [F]world! the [G7]Lord is [C]come;
Let [G7]earth re[G7]ceive her [C]King;
Let [C]every heart pre[C]pare him room,
And [C]heaven and nature sing,
And [G7]heaven and nature sing,
And [C]heaven and [F]nature [G7]sing.[C]
[C]Joy to the [F]world! the [G7]Saviour [C]reigns;
Let [G7]men their [G7]songs em[C]ploy
While [C]fields and floods, rocks, [C]hills and plains
Re[C]peat the sounding joy,
Re[G7]peat the sounding joy,
Re[C]peat, re[F]peat the [G7]sounding [C]joy.
[C]He rules the [F]world with [G7]truth and [C]grace,
And [G7]makes the [G7]nations [C]prove
The [C]glories of his [C]righteousness,
And [C]wonders of his love,
And [G7]wonders of his love,
And [C]wonders, and [F]wonders [G7]of his [C]love.`,
  },
  {
    id: 'hark-the-herald',
    title: 'Hark! The Herald Angels Sing',
    category: 'weihnachten',
    origin:
      'Text Charles Wesley (1707–1788), 1739, in der Fassung von „Hymns Ancient and Modern“ (1861), Melodie Felix Mendelssohn Bartholdy (1809–1847), eingerichtet von William Hayman Cummings (1831–1915); Text nach dem englischen Wikipedia-Artikel',
    meter: 4,
    bpm: 100,
    chordpro: `
[C]Hark! the herald-angels [G7]sing
[C]Glory [G7]to the [C]new-born King,
[C]Peace on earth, and [G7]mercy mild,
[Am]God and [G7]sinners reconciled.
[C]Joyful, all ye [G7]nations, rise,
[C]Join the [G7]triumph [C]of the skies;
[F]With the angelic [C]host proclaim
[F]Christ is [C]born in [G7]Bethle[C]hem.
[F]Hark! the herald-[C]angels sing
[Dm]Glory [G7]to the [C]new-born King.
[C]Christ, by highest [G7]heaven adored,
[C]Christ, the [G7]Everlasting [C]Lord,
[C]Late in time be[G7]hold Him come,
[Am]Offspring [G7]of a Virgin’s womb.
[C]Veiled in flesh the [G7]Godhead see,
[C]Hail, the [G7]Incarnate [C]Deity!
[F]Pleased as Man with [C]man to dwell,
[F]Jesus, [C]our Em[G7]manu[C]el.
[F]Hark! the herald-[C]angels sing
[Dm]Glory [G7]to the [C]new-born King.
[C]Hail, the heaven-born [G7]Prince of Peace!
[C]Hail, the [G7]Sun of [C]Righteousness!
[C]Light and Life to [G7]all He brings,
[Am]Risen [G7]with healing in His wings.
[C]Mild He lays His [G7]glory by,
[C]Born that [G7]man no [C]more may die,
[F]Born to raise the [C]sons of earth,
[F]Born to [C]give them [G7]second [C]birth.
[F]Hark! the herald-[C]angels sing
[Dm]Glory [G7]to the [C]new-born King.`,
  },
  {
    id: 'o-come-all-ye-faithful',
    title: 'O Come, All Ye Faithful',
    category: 'weihnachten',
    origin:
      'Englischer Text Frederick Oakeley (1802–1880), 1841, überarbeitet 1852, nach dem lateinischen „Adeste fideles“; Melodie John Francis Wade (1711–1786) zugeschrieben; Text nach dem englischen Wikipedia-Artikel',
    meter: 4,
    bpm: 90,
    chordpro: `
O [C]come, all ye [G7]faithful, [C]joyful and tri[G7]umphant!
O [C]come ye, O [F]come ye to [C]Beth[G7]le[C]hem;
[F]Come and be[C]hold him [G7]born, the King of [C]Angels:
O [C]come, let us adore Him, O [G7]come, let us adore Him,
O [C]come, let us [F]a[C]dore [G7]Him, Christ the [C]Lord.
[C]Sing, choirs of [G7]angels, [C]sing in exul[G7]tation,
[C]Sing, all ye [F]citizens of [C]Heaven a[G7]bove[C]!
[F]Glory to [C]God, [G7]glory in the [C]highest:
O [C]come, let us adore Him, O [G7]come, let us adore Him,
O [C]come, let us [F]a[C]dore [G7]Him, Christ the [C]Lord.
[C]Yea, Lord, we [G7]greet thee, [C]born this happy [G7]morning;
[C]Jesus, to [F]thee be glory [C]gi[G7]ven[C]!
[F]Word of the [C]Father, [G7]now in flesh ap[C]pearing!
O [C]come, let us adore Him, O [G7]come, let us adore Him,
O [C]come, let us [F]a[C]dore [G7]Him, Christ the [C]Lord.`,
  },
  {
    id: 'away-in-a-manger',
    title: 'Away in a Manger',
    category: 'weihnachten',
    origin:
      'Text anonym (USA, ab 1882; 3. Strophe gedruckt 1892), Melodie „Mueller“ von James Ramsey Murray (1841–1905), 1887; Text nach Kirkpatrick 1895 (englischer Wikipedia-Artikel)',
    meter: 3,
    bpm: 90,
    chordpro: `
A[C]way in a [C]manger, no [F]crib for a [C]bed,
the [C]little Lord [C]Jesus laid [G7]down his sweet [G7]head.
The [C]stars in the [C]bright sky looked [F]down where he [C]lay,
the [F]little Lord [C]Jesus a[G7]sleep on the [C]hay.
The [C]cattle are [C]lowing, the [F]baby a[C]wakes,
but [C]little Lord [C]Jesus, no [G7]crying he [G7]makes.
I [C]love thee, Lord [C]Jesus! look [F]down from the [C]sky,
and [F]stay by my [C]cradle till [G7]morning is [C]nigh.
Be [C]near me, Lord [C]Jesus; I [F]ask thee to [C]stay
close [C]by me for[C]ever, and [G7]love me I [G7]pray.
Bless [C]all the dear [C]children in [F]thy tender [C]care,
and [F]take us to [C]heaven to [G7]live with thee [C]there.`,
  },
  {
    id: 'we-three-kings',
    title: 'We Three Kings',
    category: 'weihnachten',
    origin:
      'Text und Melodie John Henry Hopkins Jr. (1820–1891), 1857; Text nach Hopkins, „Carols, Hymns, and Songs“ (1863)',
    meter: 3,
    bpm: 160,
    chordpro: `
[Am]We three kings of [E7]Orient [Am]are;
[Am]bearing gifts we [E7]traverse a[Am]far,
[G]field and [C]fountain, [Dm]moor and [Am]mountain,
[F]following [E7]yonder [Am]star.
[G7]O star of [C]wonder, [F]star of [C]night,
[C]star with royal [F]beauty [C]bright,
[C]westward [F]leading, [C]still pro[F]ceeding,
[C]guide us [G7]to thy [C]perfect light.
[Am]Born a King on [E7]Bethlehem [Am]plain,
[Am]gold I bring to [E7]crown Him a[Am]gain,
[G]King for[C]ever, [Dm]ceasing [Am]never,
[F]over us [E7]all to [Am]reign.
[G7]O star of [C]wonder, [F]star of [C]night,
[C]star with royal [F]beauty [C]bright,
[C]westward [F]leading, [C]still pro[F]ceeding,
[C]guide us [G7]to thy [C]perfect light.
[Am]Frankincense to [E7]offer have [Am]I;
[Am]incense owns a [E7]Deity [Am]nigh;
[G]prayer and [C]praising, [Dm]all men [Am]raising,
[F]worship Him [E7]God on [Am]high.
[G7]O star of [C]wonder, [F]star of [C]night,
[C]star with royal [F]beauty [C]bright,
[C]westward [F]leading, [C]still pro[F]ceeding,
[C]guide us [G7]to thy [C]perfect light.
[Am]Glorious now be[E7]hold Him a[Am]rise;
[Am]King and God and [E7]sacri[Am]fice;
[G]Heav’n sings [C]Halle[Dm]lu[Am]jah:
[F]Hallelujah the [E7]earth re[Am]plies.
[G7]O star of [C]wonder, [F]star of [C]night,
[C]star with royal [F]beauty [C]bright,
[C]westward [F]leading, [C]still pro[F]ceeding,
[C]guide us [G7]to thy [C]perfect light.`,
  },
  {
    id: 'i-saw-three-ships',
    title: 'I Saw Three Ships',
    category: 'weihnachten',
    origin: 'Text und Melodie traditionell (England); Text nach William Sandys (1792–1874), „Christmas Carols, Ancient and Modern“ (1833, Wikisource)',
    meter: 6,
    bpm: 160,
    chordpro: `
I [C]saw three ships come [G7]sailing [C]in
On [C]Christmas day, on [G7]Christmas day;
I [C]saw three ships come [G7]sailing [C]in
On [C]Christmas day [G7]in the [C]morning.
And [C]what was in those [G7]ships all [C]three,
On [C]Christmas day, on [G7]Christmas day?
And [C]what was in those [G7]ships all [C]three,
On [C]Christmas day [G7]in the [C]morning?
Our [C]Saviour Christ and [G7]his [C]lady,
On [C]Christmas day, on [G7]Christmas day;
Our [C]Saviour Christ and [G7]his [C]lady,
On [C]Christmas day [G7]in the [C]morning.
Pray [C]whither sailed those [G7]ships all [C]three,
On [C]Christmas day, on [G7]Christmas day?
Pray [C]whither sailed those [G7]ships all [C]three,
On [C]Christmas day [G7]in the [C]morning?
O [C]they sailed into [G7]Bethle[C]hem,
On [C]Christmas day, on [G7]Christmas day;
O [C]they sailed into [G7]Bethle[C]hem,
On [C]Christmas day [G7]in the [C]morning.
And [C]all the bells on [G7]earth shall [C]ring,
On [C]Christmas day, on [G7]Christmas day;
And [C]all the bells on [G7]earth shall [C]ring,
On [C]Christmas day [G7]in the [C]morning.
Then [C]let us all re[G7]joice a[C]main,
On [C]Christmas day, on [G7]Christmas day;
Then [C]let us all re[G7]joice a[C]main,
On [C]Christmas day [G7]in the [C]morning.`,
  },
  {
    id: 'first-nowell',
    title: 'The First Nowell',
    category: 'weihnachten',
    origin:
      'Text und Melodie traditionell (England); Text in der Fassung von Bramley und Stainer, „Christmas Carols New and Old“ (1871), nach Wikisource',
    meter: 3,
    bpm: 110,
    chordpro: `
The [C]first No[G7]well the [C]angels did [F]say
was to [C]certain poor [F]shepherds in [C]fields [G7]as they [C]lay;
in [C]fields where they [G7]lay, [C]keeping their [F]sheep,
on a [C]cold winter’s [F]night that [C]was [G7]so [C]deep:
No[C]well, No[G7]well, No[C]well, No[F]well,
[C]born is the [F]King [C]of [G7]Isra[C]el.
They [C]lookèd [G7]up and [C]saw a [F]star,
[C]shining in the [F]east, be[C]yond [G7]them [C]far:
and [C]to the [G7]earth it [C]gave great [F]light,
and [C]so it con[F]tinued both [C]day [G7]and [C]night:
No[C]well, No[G7]well, No[C]well, No[F]well,
[C]born is the [F]King [C]of [G7]Isra[C]el.
And [C]by the [G7]light of [C]that same [F]star,
three [C]Wise Men came [F]from [C]coun[G7]try [C]far;
to [C]seek for a [G7]King was [C]their in[F]tent,
and to [C]follow the [F]star whereso[C]ever [G7]it [C]went:
No[C]well, No[G7]well, No[C]well, No[F]well,
[C]born is the [F]King [C]of [G7]Isra[C]el.
Then [C]let us [G7]all with [C]one ac[F]cord
sing [C]praises to [F]our [C]heaven[G7]ly [C]Lord
that hath [C]made heaven and [G7]earth [C]of [F]nought,
and with [C]his blood [F]mankind [C]hath [G7]bought:
No[C]well, No[G7]well, No[C]well, No[F]well,
[C]born is the [F]King [C]of [G7]Isra[C]el.`,
  },
];
