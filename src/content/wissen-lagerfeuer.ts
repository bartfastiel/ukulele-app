import type { Article } from './types.ts';

/** Leichte Griffe und Lagerfeuer-Tricks; die Griffe selbst stehen in src/music/easy-grips.ts und auf den Akkordseiten. */
export const LAGERFEUER_ARTICLES: Article[] = [
  {
    id: 'gitarre-lagerfeuer-tricks',
    slug: { de: 'gitarre-akkorde-leichter-greifen', en: 'easy-guitar-chord-tricks', fr: 'accords-guitare-plus-faciles' },
    instruments: ['gitarre'],
    category: 'akkorde',
    published: '2026-10-11',
    title: {
      de: 'Lagerfeuer-Tricks: Gitarrenakkorde leichter greifen',
      en: 'Campfire Tricks: Easier Ways to Play Guitar Chords',
      fr: 'Astuces feu de camp : des accords de guitare plus faciles',
    },
    description: {
      de: 'Mini-Akkorde auf vier Saiten, Daumen-Griffe, liegende Finger und Ersatzakkorde: So klingen G, C, F, A und Bm auf der Gitarre auch mit kleinen Händen.',
      en: 'Mini chords on four strings, thumb shapes, anchor fingers and stand-in chords: how G, C, F, A and Bm work on guitar even with small hands.',
      fr: 'Mini-accords sur quatre cordes, pouce, doigts qui restent en place et accords de remplacement : G, C, F, A et Bm même avec de petites mains.',
    },
    blocks: [
      {
        p: {
          de: 'Am Lagerfeuer zählt, dass die Musik weiterläuft. Profis nehmen dafür oft gar nicht den „richtigen“ Griff aus dem Buch, sondern einen leichteren, der fast gleich klingt. Das darfst du auch! Auf jeder Akkordseite der App findest du unter **Leichter greifen** solche Varianten – immer mit dem Hinweis, was daran anders ist.',
          en: 'Round the campfire, what counts is that the music keeps going. Even experienced players often skip the “proper” textbook shape and use an easier one that sounds almost the same. You can do that too! On every chord page in the app, **Easier ways to play it** shows such shapes – always with a note about what is different.',
          fr: 'Autour du feu de camp, l’important est que la musique continue. Même les guitaristes expérimentés prennent souvent un doigté plus facile qui sonne presque pareil au lieu du doigté « officiel ». Toi aussi, tu as le droit ! Sur chaque page d’accord de l’appli, la rubrique **Plus facile à jouer** te montre ces variantes, avec toujours ce qui change.',
        },
      },
      { h2: { de: 'Mini-Akkorde: nur die dünnen Saiten', en: 'Mini chords: just the thin strings', fr: 'Mini-accords : seulement les cordes fines' } },
      {
        p: {
          de: 'Viele Akkorde klingen schon auf den vier dünnen Saiten. Die tiefen Saiten schlägst du dann einfach nicht an. **Mini-G:** nur der Ringfinger auf der hohen e-Saite im 3. Bund. **Mini-C:** Mittelfinger auf der D-Saite im 2. Bund, Zeigefinger auf der B-Saite im 1. Bund. Zusammen mit [D](chord:D) hast du damit die drei Akkorde für unzählige Lieder. Der tiefste Ton ist dabei nicht der Grundton – das klingt etwas leichter, aber es ist noch derselbe Akkord.',
          en: 'Lots of chords already sound on the four thin strings. You simply don’t strum the low strings. **Mini G:** just your ring finger on the high E string at the 3rd fret. **Mini C:** middle finger on the D string at the 2nd fret, index finger on the B string at the 1st fret. Together with [D](chord:D) that gives you the three chords for countless songs. The lowest note isn’t the root – it sounds a little lighter, but it is still the same chord.',
          fr: 'Beaucoup d’accords sonnent déjà sur les quatre cordes fines. Tu ne grattes simplement pas les cordes graves. **Mini G :** seulement l’annulaire sur la corde E aiguë en case 3. **Mini C :** majeur sur la corde D en case 2, index sur la corde B en case 1. Avec [D](chord:D), tu as les trois accords d’innombrables chansons. La note la plus grave n’est pas la fondamentale : le son est un peu plus léger, mais c’est bien le même accord.',
        },
      },
      {
        p: {
          de: 'Auch schwere Barré-Griffe haben Mini-Formen: [Bm](chord:Bm) mit vier Fingern auf den dünnen Saiten (4., 4., 3. und 2. Bund) oder [Bb](chord:Bb) mit drei Fingern im 3. Bund und dem Zeigefinger auf der hohen e-Saite im 1. Bund. Wie das kleine F geht, steht unter [Barré-Griffe](wissen:gitarre-barre).',
          en: 'Hard barre chords have mini forms too: [Bm](chord:Bm) with four fingers on the thin strings (4th, 4th, 3rd and 2nd fret) or [Bb](chord:Bb) with three fingers at the 3rd fret and your index on the high E string at the 1st fret. How the mini F works is explained in [barre chords](wissen:gitarre-barre).',
          fr: 'Les accords barrés difficiles ont aussi des mini-formes : [Bm](chord:Bm) avec quatre doigts sur les cordes fines (cases 4, 4, 3 et 2) ou [Bb](chord:Bb) avec trois doigts en case 3 et l’index sur la corde E aiguë en case 1. Le petit F est expliqué dans [accords barrés](wissen:gitarre-barre).',
        },
      },
      { h2: { de: 'Der Daumen hilft mit', en: 'Your thumb can help', fr: 'Le pouce donne un coup de main' } },
      {
        p: {
          de: 'Viele Gitarristen greifen mit dem Daumen über den Hals die tiefe E-Saite. Beim **Daumen-G** drückt der Daumen die E-Saite im 3. Bund und berührt mit seiner Spitze die A-Saite, damit sie still bleibt. Dazu kommt nur noch der Ringfinger auf der hohen e-Saite im 3. Bund – fertig ist ein volles G. Beim **Daumen-F** kommt der Daumen in den 1. Bund, die anderen Finger greifen das kleine F. Mit kleinen Händen ist das schwer. Probier es aus, aber quäl dich nicht.',
          en: 'Lots of guitarists wrap their thumb over the neck to fret the low E string. For **thumb G**, your thumb presses the E string at the 3rd fret and touches the A string with its tip so it stays quiet. Add just your ring finger on the high E string at the 3rd fret and you have a full G. For **thumb F**, your thumb goes to the 1st fret and the other fingers play the mini F. With small hands this is hard. Give it a try, but don’t force it.',
          fr: 'Beaucoup de guitaristes passent le pouce par-dessus le manche pour appuyer la corde E grave. Pour le **G avec le pouce**, le pouce appuie la corde E en case 3 et effleure la corde A avec son bout pour qu’elle reste muette. Ajoute seulement l’annulaire sur la corde E aiguë en case 3 : voilà un G complet. Pour le **F avec le pouce**, le pouce se place en case 1 et les autres doigts font le petit F. Avec de petites mains, c’est difficile. Essaie, mais ne force pas.',
        },
      },
      { h2: { de: 'Finger liegen lassen', en: 'Leave your fingers where they are', fr: 'Laisser les doigts en place' } },
      {
        p: {
          de: 'Beim **Rock-G** liegen Ringfinger und kleiner Finger im 3. Bund auf der B- und der e-Saite. Diese beiden bleiben einfach liegen, wenn du zu **Cadd9**, **Em7** oder [Dsus4](chord:Dsus4) wechselst – nur die anderen Finger wandern. Diese Akkorde heißen etwas anders als G, C, Em und D, weil ein Zusatzton mitklingt, passen aber in vielen Liedern und klingen schön offen.',
          en: 'In **rock G**, your ring and little fingers sit at the 3rd fret on the B and high E strings. Those two simply stay put when you change to **Cadd9**, **Em7** or [Dsus4](chord:Dsus4) – only the other fingers move. These chords have slightly different names from G, C, Em and D because an extra note sounds along, but they fit many songs and sound nice and open.',
          fr: 'Dans le **G rock**, l’annulaire et l’auriculaire sont en case 3 sur les cordes B et E aiguë. Ces deux doigts restent simplement en place quand tu passes à **Cadd9**, **Em7** ou [Dsus4](chord:Dsus4) ; seuls les autres doigts bougent. Ces accords ont un nom un peu différent de G, C, Em et D parce qu’une note en plus sonne avec, mais ils conviennent à beaucoup de chansons et sonnent joliment ouverts.',
        },
      },
      { h2: { de: 'Ersatzakkorde, die fast gleich klingen', en: 'Stand-in chords that sound almost the same', fr: 'Des accords de remplacement qui sonnent presque pareil' } },
      {
        ul: [
          {
            de: '[Fmaj7](chord:Fmaj7) statt F: drei Finger, kein Barré, klingt weicher.',
            en: '[Fmaj7](chord:Fmaj7) instead of F: three fingers, no barre, a softer sound.',
            fr: '[Fmaj7](chord:Fmaj7) au lieu de F : trois doigts, pas de barré, un son plus doux.',
          },
          {
            de: '[Asus2](chord:Asus2) statt A: zwei Finger, klingt offen – weder Dur noch Moll.',
            en: '[Asus2](chord:Asus2) instead of A: two fingers, an open sound – neither major nor minor.',
            fr: '[Asus2](chord:Asus2) au lieu de A : deux doigts, un son ouvert – ni majeur ni mineur.',
          },
          {
            de: '**Bm7** statt [Bm](chord:Bm): drei Finger im 2. Bund auf A-, G- und hoher e-Saite, klingt weich und fast wie Bm.',
            en: '**Bm7** instead of [Bm](chord:Bm): three fingers at the 2nd fret on the A, G and high E strings, soft and almost like Bm.',
            fr: '**Bm7** au lieu de [Bm](chord:Bm) : trois doigts en case 2 sur les cordes A, G et E aiguë, un son doux, presque comme Bm.',
          },
        ],
      },
      { chord: 'Fmaj7' },
      { h2: { de: 'Kapodaster statt Barré', en: 'A capo instead of a barre', fr: 'Le capodastre plutôt que le barré' } },
      {
        p: {
          de: 'Steht ein Lied voller Barré-Griffe, hilft oft der Kapodaster: Er übernimmt den Barré für dich, und du greifst die leichten offenen Griffe. Wie das genau geht, erklärt [Kapodaster auf der Gitarre](wissen:gitarre-kapodaster). Bei den Liedern in der App zeigt die Tonart-Auswahl, mit welchem Bund es klappt.',
          en: 'If a song is full of barre chords, a capo often helps: it does the barre for you and you play the easy open shapes. [The guitar capo](wissen:gitarre-kapodaster) explains exactly how. For the songs in the app, the key selector shows which fret works.',
          fr: 'Si une chanson est pleine d’accords barrés, le capodastre aide souvent : il fait le barré à ta place et tu joues les doigtés ouverts faciles. [Le capodastre à la guitare](wissen:gitarre-kapodaster) explique comment faire. Pour les chansons de l’appli, le choix de la tonalité t’indique la bonne case.',
        },
      },
      {
        tip: {
          de: 'Schalte bei einem Lied **Einfache Griffe** ein: Dann zeigt die App für G und C die Mini-Griffe und nimmt, wo es passt, leichtere Verwandte. Hat ein Freund den vollen Griff, klingt beides zusammen trotzdem gut.',
          en: 'Switch on **Easy chords** in a song: the app then shows the mini shapes for G and C and, where it fits, uses easier related chords. If a friend plays the full shape, both still sound good together.',
          fr: 'Active **Accords faciles** dans une chanson : l’appli montre alors les mini-doigtés pour G et C et prend, quand ça va, des accords voisins plus faciles. Si un ami joue le doigté complet, les deux sonnent quand même bien ensemble.',
        },
      },
      { tool: 'akkorde' },
    ],
    related: ['gitarre-g-dur-leicht', 'gitarre-barre', 'gitarre-kapodaster', 'akkordwechsel-schneller'],
  },
  {
    id: 'gitarre-g-dur-leicht',
    slug: { de: 'g-dur-gitarre-leicht', en: 'easy-g-chord-guitar', fr: 'accord-sol-guitare-facile' },
    instruments: ['gitarre'],
    category: 'akkorde',
    published: '2026-10-11',
    title: {
      de: 'G-Dur auf der Gitarre: vier Wege, vom leichtesten bis zum vollen Griff',
      en: 'G Major on Guitar: Four Ways, from the Easiest to the Full Chord',
      fr: 'Sol majeur à la guitare : quatre façons, de la plus facile au doigté complet',
    },
    description: {
      de: 'G-Dur auf der Gitarre leicht greifen: Mini-G mit einem Finger, Daumen-G, das volle G mit drei Fingern und das Rock-G für schnelle Wechsel zu C und D.',
      en: 'Easy G major on guitar: mini G with one finger, thumb G, the full G with three fingers and rock G for quick changes to C and D.',
      fr: 'Sol majeur facile à la guitare : mini G avec un doigt, G avec le pouce, le G complet à trois doigts et le G rock pour changer vite vers C et D.',
    },
    blocks: [
      {
        p: {
          de: '**G-Dur** gehört zu den wichtigsten Akkorden überhaupt. Der übliche Griff spannt die Hand aber über alle sechs Saiten – für kleine Hände ist das viel. Hier sind vier Wege, vom leichtesten bis zum vollen Klang. Alle bestehen aus den Tönen **G, B und D**.',
          en: '**G major** is one of the most important chords there is. But the usual shape stretches your hand across all six strings – a lot for small hands. Here are four ways, from the easiest to the fullest sound. All of them are made of the notes **G, B and D**.',
          fr: '**Sol majeur (G)** fait partie des accords les plus importants. Mais le doigté habituel étire la main sur les six cordes, c’est beaucoup pour de petites mains. Voici quatre façons, de la plus facile au son le plus plein. Toutes sont faites des notes **Sol, Si et Ré**.',
        },
      },
      { h2: { de: '1. Mini-G: ein Finger', en: '1. Mini G: one finger', fr: '1. Mini G : un seul doigt' } },
      {
        p: {
          de: 'Ringfinger auf die hohe e-Saite im 3. Bund und nur die vier dünnen Saiten anschlagen: D, G, B und G. Der tiefste Ton ist D, nicht G – deshalb klingt das Mini-G etwas leichter. Es ist der beste Start und passt gut zu Mini-C und D.',
          en: 'Ring finger on the high E string at the 3rd fret and strum only the four thin strings: D, G, B and G. The lowest note is D, not G – that’s why mini G sounds a little lighter. It’s the best start and goes well with mini C and D.',
          fr: 'Annulaire sur la corde E aiguë en case 3 et gratte seulement les quatre cordes fines : Ré, Sol, Si et Sol. La note la plus grave est Ré, pas Sol : c’est pour ça que le mini G sonne un peu plus léger. C’est le meilleur départ, et il va bien avec le mini C et D.',
        },
      },
      { h2: { de: '2. Daumen-G: zwei Finger, voller Klang', en: '2. Thumb G: two fingers, full sound', fr: '2. G avec le pouce : deux doigts, son plein' } },
      {
        p: {
          de: 'Leg den Daumen über den Hals und drück die tiefe E-Saite im 3. Bund. Mit seiner Spitze berührt er die A-Saite, damit sie nicht mitklingt. Dazu der Ringfinger auf die hohe e-Saite im 3. Bund. Jetzt darfst du alle Saiten anschlagen, und der tiefste Ton ist ein G. Das klappt mit großen Händen und dünnem Hals besser.',
          en: 'Wrap your thumb over the neck and press the low E string at the 3rd fret. Its tip touches the A string so it doesn’t ring. Add your ring finger on the high E string at the 3rd fret. Now you can strum all the strings, and the lowest note is a G. This works better with big hands and a slim neck.',
          fr: 'Passe le pouce par-dessus le manche et appuie la corde E grave en case 3. Son bout effleure la corde A pour qu’elle ne sonne pas. Ajoute l’annulaire sur la corde E aiguë en case 3. Tu peux maintenant gratter toutes les cordes, et la note la plus grave est un Sol. C’est plus facile avec de grandes mains et un manche fin.',
        },
      },
      { h2: { de: '3. Das volle G mit drei Fingern', en: '3. The full G with three fingers', fr: '3. Le G complet à trois doigts' } },
      {
        p: {
          de: 'Mittelfinger auf die tiefe E-Saite im 3. Bund, Zeigefinger auf die A-Saite im 2. Bund, Ringfinger auf die hohe e-Saite im 3. Bund. Alle sechs Saiten klingen. Das ist der Griff aus dem Griffbild unten.',
          en: 'Middle finger on the low E string at the 3rd fret, index finger on the A string at the 2nd fret, ring finger on the high E string at the 3rd fret. All six strings ring. That’s the shape in the diagram below.',
          fr: 'Majeur sur la corde E grave en case 3, index sur la corde A en case 2, annulaire sur la corde E aiguë en case 3. Les six cordes sonnent. C’est le doigté du schéma ci-dessous.',
        },
      },
      { chord: 'G' },
      { h2: { de: '4. Rock-G: vier Finger, schnellere Wechsel', en: '4. Rock G: four fingers, quicker changes', fr: '4. G rock : quatre doigts, changements plus rapides' } },
      {
        p: {
          de: 'Wie das volle G, aber der Ringfinger liegt auf der B-Saite und der kleine Finger auf der hohen e-Saite, beide im 3. Bund. Das sieht schwerer aus, aber beim Wechsel zu **Cadd9** oder [Dsus4](chord:Dsus4) bleiben diese beiden Finger einfach liegen. Mehr dazu unter [Lagerfeuer-Tricks](wissen:gitarre-lagerfeuer-tricks).',
          en: 'Like the full G, but your ring finger sits on the B string and your little finger on the high E string, both at the 3rd fret. It looks harder, but when you change to **Cadd9** or [Dsus4](chord:Dsus4) those two fingers simply stay put. More in [campfire tricks](wissen:gitarre-lagerfeuer-tricks).',
          fr: 'Comme le G complet, mais l’annulaire se pose sur la corde B et l’auriculaire sur la corde E aiguë, tous deux en case 3. Ça paraît plus dur, mais pour passer à **Cadd9** ou [Dsus4](chord:Dsus4), ces deux doigts restent simplement en place. Plus d’infos dans [astuces feu de camp](wissen:gitarre-lagerfeuer-tricks).',
        },
      },
      {
        tip: {
          de: 'Welches G du nimmst, darfst du je nach Lied entscheiden. Der [Akkord-Detektiv](tool:detektiv) zeigt dir, welche Töne gerade klingen – so hörst du selbst, ob alle Saiten sauber sind.',
          en: 'You can choose which G to use for each song. The [chord detective](tool:detektiv) shows you which notes are sounding – so you can hear for yourself whether every string is clean.',
          fr: 'Tu peux choisir quel G prendre selon la chanson. Le [détective d’accords](tool:detektiv) te montre quelles notes sonnent : tu entends toi-même si toutes les cordes sont nettes.',
        },
      },
    ],
    related: ['gitarre-lagerfeuer-tricks', 'gitarre-erste-akkorde', 'akkordwechsel-schneller'],
  },
  {
    id: 'banjo-ein-finger-akkorde',
    slug: { de: 'banjo-akkorde-mit-einem-finger', en: 'one-finger-banjo-chords', fr: 'accords-banjo-un-doigt' },
    instruments: ['banjo'],
    category: 'akkorde',
    published: '2026-10-11',
    title: {
      de: 'Banjo-Akkorde mit einem Finger: G, C und D',
      en: 'One-Finger Banjo Chords: G, C and D',
      fr: 'Accords de banjo avec un seul doigt : G, C et D',
    },
    description: {
      de: 'Der Lagerfeuer-Trick auf dem Banjo in Open G: G mit leeren Saiten, C und D mit einem Finger quer im 5. und 7. Bund – drei Akkorde für viele Lieder.',
      en: 'The campfire trick for banjo in open G: G on open strings, C and D with one finger across the 5th and 7th frets – three chords for lots of songs.',
      fr: 'L’astuce feu de camp au banjo en Open G : G à vide, C et D avec un doigt à plat en case 5 et 7 – trois accords pour beaucoup de chansons.',
    },
    blocks: [
      {
        p: {
          de: 'Das Banjo ist in **Open G** gestimmt: Alle leeren Saiten zusammen klingen schon als G-Dur. Das hat einen tollen Nebeneffekt. Legst du einen Finger flach über die vier langen Saiten, verschiebst du diesen G-Akkord einfach nach oben – und bekommst einen anderen Dur-Akkord.',
          en: 'The banjo is tuned to **open G**: all the open strings together already sound as G major. That has a great side effect. If you lay one finger flat across the four long strings, you simply slide that G chord up – and get a different major chord.',
          fr: 'Le banjo est accordé en **Open G** : toutes les cordes à vide sonnent déjà comme un Sol majeur. Ça a un super effet. Si tu poses un doigt à plat sur les quatre longues cordes, tu fais simplement monter cet accord de G et tu obtiens un autre accord majeur.',
        },
      },
      {
        ul: [
          {
            de: '**G:** alle Saiten leer.',
            en: '**G:** all strings open.',
            fr: '**G :** toutes les cordes à vide.',
          },
          {
            de: '**C:** Zeigefinger flach über die vier langen Saiten im **5. Bund**. Die kurze 5. Saite klingt leer mit, denn ihr Ton G gehört auch zu C.',
            en: '**C:** index finger flat across the four long strings at the **5th fret**. The short 5th string rings open along with them, because its note G is part of C too.',
            fr: '**C :** index à plat sur les quatre longues cordes en **case 5**. La petite 5e corde sonne à vide avec elles, car sa note Sol fait aussi partie de C.',
          },
          {
            de: '**D:** Zeigefinger flach über die vier langen Saiten im **7. Bund**. Die kurze 5. Saite schlägst du hier nicht an – ihr G passt nicht zu D.',
            en: '**D:** index finger flat across the four long strings at the **7th fret**. Don’t play the short 5th string here – its G doesn’t fit D.',
            fr: '**D :** index à plat sur les quatre longues cordes en **case 7**. Ne joue pas la petite 5e corde ici : son Sol ne va pas avec D.',
          },
        ],
      },
      {
        p: {
          de: 'Der tiefste Ton ist bei diesen Griffen nicht immer der Grundton: bei C ist es ein G, bei D ein A. Es sind trotzdem echte Dur-Akkorde mit allen drei Tönen. Auf den Akkordseiten [C](chord:C) und [D](chord:D) findest du sie unter **Leichter greifen** zum Anhören.',
          en: 'With these shapes the lowest note isn’t always the root: for C it’s a G, for D an A. They’re still real major chords with all three notes. On the [C](chord:C) and [D](chord:D) chord pages you’ll find them under **Easier ways to play it**, ready to listen to.',
          fr: 'Avec ces doigtés, la note la plus grave n’est pas toujours la fondamentale : pour C c’est un Sol, pour D un La. Ce sont quand même de vrais accords majeurs avec leurs trois notes. Sur les pages d’accord [C](chord:C) et [D](chord:D), tu les trouves sous **Plus facile à jouer** pour les écouter.',
        },
      },
      { h2: { de: 'So klingt der Querfinger sauber', en: 'Getting the barre to ring clearly', fr: 'Pour que le doigt à plat sonne bien' } },
      {
        ol: [
          {
            de: 'Leg den Zeigefinger dicht hinter das Bundstäbchen, nicht in die Mitte.',
            en: 'Place your index finger just behind the fret wire, not in the middle.',
            fr: 'Place l’index juste derrière la frette, pas au milieu de la case.',
          },
          {
            de: 'Dreh ihn ein wenig auf die Seite, dann drückt er gleichmäßiger.',
            en: 'Roll it slightly onto its side so it presses more evenly.',
            fr: 'Fais-le un peu rouler sur le côté, il appuie alors plus régulièrement.',
          },
          {
            de: 'Zupf jede Saite einzeln. Klingt eine dumpf, verschieb den Finger ein kleines Stück.',
            en: 'Pick each string on its own. If one sounds dull, shift your finger a tiny bit.',
            fr: 'Pince chaque corde séparément. Si l’une sonne étouffée, décale un tout petit peu le doigt.',
          },
        ],
      },
      {
        tip: {
          de: 'Zum Rollen mit Daumen und Fingern sind die Ein-Finger-Griffe nicht immer ideal, weil der Daumen oft die kurze Saite spielt. Für Schlagen, Mitsingen und die ersten Lieder sind sie super. Die üblichen Griffe stehen unter [Die ersten Banjo-Akkorde](wissen:banjo-erste-akkorde).',
          en: 'For rolls with thumb and fingers, the one-finger shapes aren’t always ideal, because your thumb often plays the short string. For strumming, singing along and your first songs they’re great. The usual shapes are in [first banjo chords](wissen:banjo-erste-akkorde).',
          fr: 'Pour les rolls avec le pouce et les doigts, les accords à un doigt ne sont pas toujours idéaux, car le pouce joue souvent la petite corde. Pour gratter, chanter et tes premières chansons, ils sont parfaits. Les doigtés habituels sont dans [premiers accords de banjo](wissen:banjo-erste-akkorde).',
        },
      },
      { tool: 'lieder' },
    ],
    related: ['banjo-erste-akkorde', 'banjo-akkorde', 'banjo-kapodaster'],
  },
];
