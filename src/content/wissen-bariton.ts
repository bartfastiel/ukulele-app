import type { Article } from './types.ts';

export const BARITON_ARTICLES: Article[] = [
  {
    id: 'bariton-stimmen',
    slug: { de: 'bariton-ukulele-stimmen', en: 'tune-baritone-ukulele', fr: 'accorder-ukulele-baryton' },
    instruments: ['bariton'],
    category: 'erste-schritte',
    title: {
      de: 'Bariton-Ukulele stimmen (D G B E) – Schritt für Schritt',
      en: 'How to Tune a Baritone Ukulele (D G B E) – Step by Step',
      fr: 'Accorder un ukulélé baryton (D G B E), étape par étape',
    },
    description: {
      de: 'Bariton-Ukulele stimmen in D G B E: mit Stimmgerät oder nach Gehör, Saite für Saite – und warum sie wie die vier hohen Gitarrensaiten klingt.',
      en: 'Tune your baritone ukulele to D G B E with a tuner or by ear, string by string – and why it sounds like the four highest strings of a guitar.',
      fr: 'Accorder ton ukulélé baryton en D G B E avec un accordeur ou à l’oreille, corde par corde – et pourquoi il sonne comme les quatre cordes aiguës d’une guitare.',
    },
    blocks: [
      {
        p: {
          de: 'Die Bariton-Ukulele ist die größte und tiefste Ukulele. Gestimmt ist sie genau wie die **vier hohen Saiten einer Gitarre**: D, G, B und E. Neue Saiten dehnen sich anfangs stark – deshalb stimmst du am besten **vor jedem Üben**. Mit etwas Übung dauert das nur eine Minute.',
          en: 'The baritone ukulele is the biggest and lowest ukulele. It is tuned exactly like the **four highest strings of a guitar**: D, G, B and E. New strings stretch a lot at first, so tune **every time you practise**. With a little experience it takes about a minute.',
          fr: 'Le ukulélé baryton est le plus grand et le plus grave des ukulélés. Il est accordé exactement comme les **quatre cordes aiguës d’une guitare** : D, G, B et E. Les cordes neuves se détendent beaucoup au début : accorde-le **à chaque fois que tu joues**. Avec l’habitude, ça prend une minute.',
        },
      },
      { h2: { de: 'Die Zieltöne', en: 'The target notes', fr: 'Les notes à obtenir' } },
      {
        ul: [
          { de: '4. Saite (oben, die tiefste): **D** (D3)', en: 'String 4 (top, the lowest): **D** (D3)', fr: '4e corde (en haut, la plus grave) : **D** (Ré, D3)' },
          { de: '3. Saite: **G** (G3)', en: 'String 3: **G** (G3)', fr: '3e corde : **G** (Sol, G3)' },
          { de: '2. Saite: **B** (B3, im Deutschen auch H)', en: 'String 2: **B** (B3)', fr: '2e corde : **B** (Si, B3)' },
          { de: '1. Saite (unten, die höchste): **E** (E4)', en: 'String 1 (bottom, the highest): **E** (E4)', fr: '1re corde (en bas, la plus aiguë) : **E** (Mi, E4)' },
        ],
      },
      {
        p: {
          de: 'Anders als bei der Sopran-Ukulele gibt es hier kein „hohes G“: Die Töne werden von oben nach unten immer höher. Die D- und die G-Saite sind meist mit feinem Metalldraht **umsponnen**, damit sie tief und kräftig klingen.',
          en: 'Unlike a soprano ukulele there is no “high G” here: the notes get higher from top to bottom. The D and G strings are usually **wound** with fine metal wire so they sound deep and full.',
          fr: 'Contrairement au ukulélé soprano, il n’y a pas de « Sol aigu » : les notes montent de la corde du haut à celle du bas. Les cordes de Ré et de Sol sont en général **filées** d’un fin fil de métal pour sonner grave et plein.',
        },
      },
      { h2: { de: 'Mit dem Stimmgerät', en: 'With a tuner', fr: 'Avec un accordeur' } },
      {
        ol: [
          {
            de: 'Öffne das [Stimmgerät](tool:stimmen) und erlaube das Mikrofon.',
            en: 'Open the [tuner](tool:stimmen) and allow the microphone.',
            fr: 'Ouvre l’[accordeur](tool:stimmen) et autorise le micro.',
          },
          {
            de: 'Zupf eine Saite an und lass sie klingen.',
            en: 'Pluck one string and let it ring.',
            fr: 'Pince une corde et laisse-la sonner.',
          },
          {
            de: 'Ist der Ton zu tief, drehst du den Wirbel so, dass die Saite straffer wird. Ist er zu hoch, lockerst du sie ein wenig.',
            en: 'If the note is too low, turn the peg to tighten the string. If it’s too high, loosen it a little.',
            fr: 'Si la note est trop grave, tourne la mécanique pour tendre la corde. Si elle est trop aiguë, détends-la un peu.',
          },
          {
            de: 'Dreh in kleinen Schritten und zupfe dabei immer wieder an. So schießt du nicht über das Ziel hinaus.',
            en: 'Turn in small steps and keep plucking as you go, so you don’t overshoot.',
            fr: 'Tourne par petites touches en rejouant la corde, pour ne pas dépasser la note.',
          },
        ],
      },
      { tool: 'stimmen' },
      { h2: { de: 'Nach Gehör: die Saiten untereinander', en: 'By ear: string against string', fr: 'À l’oreille : les cordes entre elles' } },
      {
        p: {
          de: 'Wenn die D-Saite stimmt, kannst du die anderen danach stimmen. Greif den angegebenen Bund und vergleiche mit der leeren Nachbarsaite – beide Töne sollen gleich klingen:',
          en: 'Once the D string is in tune, you can tune the others to it. Fret the given position and compare it with the next open string – both should sound the same:',
          fr: 'Quand la corde de Ré est juste, tu peux accorder les autres à partir d’elle. Appuie à la case indiquée et compare avec la corde voisine à vide : les deux doivent sonner pareil.',
        },
      },
      {
        ul: [
          {
            de: 'D-Saite im **5. Bund** = G-Saite leer',
            en: 'D string at the **5th fret** = G string open',
            fr: 'Corde de Ré à la **5e case** = corde de Sol à vide',
          },
          {
            de: 'G-Saite im **4. Bund** = B-Saite leer',
            en: 'G string at the **4th fret** = B string open',
            fr: 'Corde de Sol à la **4e case** = corde de Si à vide',
          },
          {
            de: 'B-Saite im **5. Bund** = E-Saite leer',
            en: 'B string at the **5th fret** = E string open',
            fr: 'Corde de Si à la **5e case** = corde de Mi à vide',
          },
        ],
      },
      {
        p: {
          de: 'Zum Schluss schlägst du alle Saiten leer an. Es klingt ein weicher, etwas verträumter Akkord: **Em7**.',
          en: 'Finally, strum all strings open. You’ll hear a soft, slightly dreamy chord: **Em7**.',
          fr: 'Pour finir, joue toutes les cordes à vide. Tu entends un accord doux et un peu rêveur : **Em7**.',
        },
      },
      { chord: 'Em7' },
      {
        tip: {
          de: 'Manche stimmen ihre Bariton-Ukulele auch wie eine große Sopran-Ukulele (G C E A). Diese App nutzt die übliche Stimmung D G B E. Stimm immer von unten an den Ton heran: erst etwas zu tief, dann hochdrehen – so hält die Stimmung besser.',
          en: 'Some people tune a baritone ukulele like a big soprano (G C E A). This app uses the usual D G B E tuning. Always tune up to the note: start a little low and turn up – the tuning holds better that way.',
          fr: 'Certains accordent leur ukulélé baryton comme un grand soprano (G C E A). Cette appli utilise l’accordage habituel D G B E. Accorde toujours en montant vers la note : pars un peu en dessous puis remonte, l’accord tient mieux.',
        },
      },
    ],
    related: ['bariton-erste-akkorde', 'bariton-oder-sopran', 'saiten-wechseln-pflege', 'toene-und-notennamen'],
  },
  {
    id: 'bariton-erste-akkorde',
    slug: { de: 'bariton-ukulele-erste-akkorde', en: 'first-baritone-ukulele-chords', fr: 'premiers-accords-ukulele-baryton' },
    instruments: ['bariton'],
    category: 'akkorde',
    title: {
      de: 'Die ersten Akkorde auf der Bariton-Ukulele: G, C, D7 und Em',
      en: 'Your First Baritone Ukulele Chords: G, C, D7 and Em',
      fr: 'Les premiers accords au ukulélé baryton : G, C, D7 et Em',
    },
    description: {
      de: 'Bariton-Ukulele lernen für Anfänger: die ersten Akkorde G, C, D7 und Em mit Griffbildern, der erste Akkordwechsel und Tipps zum Üben.',
      en: 'Learn baritone ukulele as a beginner: your first chords G, C, D7 and Em with diagrams, your first chord change and tips for practising.',
      fr: 'Apprendre le ukulélé baryton : les premiers accords G, C, D7 et Em avec diagrammes, le premier changement d’accord et des conseils pour t’entraîner.',
    },
    blocks: [
      {
        p: {
          de: 'Mit vier Akkorden kannst du auf der Bariton-Ukulele schon sehr viele Lieder begleiten. Auf der Bariton-Ukulele klingen **alle vier Saiten immer mit** – du musst also keine Saite auslassen.',
          en: 'With four chords you can already accompany lots of songs on the baritone ukulele. On the baritone ukulele **all four strings always ring** – you never have to skip a string.',
          fr: 'Avec quatre accords, tu peux déjà accompagner plein de chansons au ukulélé baryton. Ici, **les quatre cordes sonnent toujours** : tu n’as jamais besoin d’en éviter une.',
        },
      },
      { h2: { de: '1. G-Dur – ein einziger Finger', en: '1. G major – just one finger', fr: '1. Sol majeur – un seul doigt' } },
      {
        p: {
          de: 'Für **G** setzt du den Ringfinger in den **3. Bund der E-Saite** (das ist die unterste). Die anderen drei Saiten klingen leer.',
          en: 'For **G**, put your ring finger on the **3rd fret of the E string** (the bottom one). The other three strings ring open.',
          fr: 'Pour **G**, pose l’annulaire sur la **case 3 de la corde de Mi** (celle du bas). Les trois autres cordes sonnent à vide.',
        },
      },
      { chord: 'G' },
      { h2: { de: '2. C-Dur', en: '2. C major', fr: '2. Do majeur (C)' } },
      {
        p: {
          de: 'Für **C** brauchst du zwei Finger: Mittelfinger in den **2. Bund der D-Saite**, Zeigefinger in den **1. Bund der B-Saite**. G- und E-Saite bleiben leer.',
          en: 'For **C** you need two fingers: middle finger on the **2nd fret of the D string**, index finger on the **1st fret of the B string**. The G and E strings stay open.',
          fr: 'Pour **C**, il faut deux doigts : le majeur sur la **case 2 de la corde de Ré**, l’index sur la **case 1 de la corde de Si**. Les cordes de Sol et de Mi restent à vide.',
        },
      },
      { chord: 'C' },
      { h2: { de: '3. D7 und Em', en: '3. D7 and Em', fr: '3. D7 et Em' } },
      {
        p: {
          de: '**D7** führt fast immer zurück zu G – das klingt wie „nach Hause kommen“. **Em** (e-Moll) ist ganz leicht: nur ein Finger im 2. Bund der D-Saite. Die Griffbilder zeigen dir, wo die Finger hingehören.',
          en: '**D7** almost always leads back to G – it sounds like “coming home”. **Em** (E minor) is really easy: just one finger at the 2nd fret of the D string. The diagrams show where your fingers go.',
          fr: '**D7** ramène presque toujours vers G : on a l’impression de « rentrer à la maison ». **Em** (Mi mineur) est tout simple : un seul doigt à la case 2 de la corde de Ré. Les diagrammes te montrent où placer les doigts.',
        },
      },
      { chord: 'D7' },
      { chord: 'Em' },
      { h2: { de: 'Der erste Akkordwechsel: G → C', en: 'Your first chord change: G → C', fr: 'Le premier changement : G → C' } },
      {
        ol: [
          {
            de: 'Spiel G und zähl langsam bis vier.',
            en: 'Play G and count slowly to four.',
            fr: 'Joue G et compte lentement jusqu’à quatre.',
          },
          {
            de: 'Setz während „vier“ schon die Finger für C auf.',
            en: 'On “four”, already start placing your fingers for C.',
            fr: 'Sur « quatre », commence déjà à poser les doigts pour C.',
          },
          {
            de: 'Spiel C und zähl wieder bis vier. Dann zurück zu G.',
            en: 'Play C and count to four again. Then back to G.',
            fr: 'Joue C et compte de nouveau jusqu’à quatre. Puis retour à G.',
          },
          {
            de: 'Wiederhole das, bis es ohne Pause klappt. Erst dann schneller werden.',
            en: 'Repeat until it works without a pause. Only then speed up.',
            fr: 'Recommence jusqu’à ce que ça s’enchaîne sans pause. Ensuite seulement, accélère.',
          },
        ],
      },
      {
        tip: {
          de: 'Mehr Tricks für flüssige Wechsel findest du unter [Akkordwechsel schneller](wissen:akkordwechsel-schneller). Im [Akkord-Spiel](tool:spiel) kannst du Wechsel spielerisch trainieren.',
          en: 'More tricks for smooth changes are in [faster chord changes](wissen:akkordwechsel-schneller). The [chord game](tool:spiel) lets you practise changes in a fun way.',
          fr: 'D’autres astuces pour enchaîner les accords : [changer d’accord plus vite](wissen:akkordwechsel-schneller). Le [jeu d’accords](tool:spiel) te permet de t’entraîner en t’amusant.',
        },
      },
      { h2: { de: 'Erste Lieder', en: 'First songs', fr: 'Premières chansons' } },
      {
        p: {
          de: 'Mit G und D7 klappen viele Lieder, zum Beispiel [Oh My Darling, Clementine](lied:clementine) oder [Skip to My Lou](lied:skip-to-my-lou). Die App schlägt bei jedem Lied eine Tonart vor, die auf der Bariton-Ukulele gut liegt.',
          en: 'Many songs work with G and D7, for example [Oh My Darling, Clementine](lied:clementine) or [Skip to My Lou](lied:skip-to-my-lou). For every song the app suggests a key that suits the baritone ukulele.',
          fr: 'Beaucoup de chansons se jouent avec G et D7, par exemple [Oh My Darling, Clementine](lied:clementine) ou [Skip to My Lou](lied:skip-to-my-lou). Pour chaque chanson, l’appli propose une tonalité qui va bien au ukulélé baryton.',
        },
      },
      { tool: 'lieder' },
    ],
    related: ['bariton-stimmen', 'akkordwechsel-schneller', 'lieder-fuer-anfaenger', 'bariton-oder-sopran'],
  },
  {
    id: 'bariton-oder-sopran',
    slug: { de: 'bariton-ukulele-oder-sopran-ukulele', en: 'baritone-vs-soprano-ukulele', fr: 'ukulele-baryton-ou-soprano' },
    instruments: ['bariton'],
    category: 'instrument',
    title: {
      de: 'Bariton-Ukulele oder Sopran-Ukulele? Die Unterschiede einfach erklärt',
      en: 'Baritone or Soprano Ukulele? The Differences Explained Simply',
      fr: 'Ukulélé baryton ou soprano ? Les différences expliquées simplement',
    },
    description: {
      de: 'Größe, Stimmung, Klang und Griffe: Was die Bariton-Ukulele von der Sopran-Ukulele unterscheidet – und warum dieselbe Griffform anders heißt.',
      en: 'Size, tuning, sound and chord shapes: how a baritone ukulele differs from a soprano – and why the same chord shape has a different name.',
      fr: 'Taille, accordage, son et accords : ce qui distingue le ukulélé baryton du soprano – et pourquoi une même forme d’accord change de nom.',
    },
    blocks: [
      {
        p: {
          de: 'Ukulelen gibt es in vier Größen: **Sopran**, **Konzert**, **Tenor** und **Bariton**. Die ersten drei werden meist gleich gestimmt (G C E A). Die Bariton-Ukulele ist anders: größer, tiefer – und mit einer eigenen Stimmung.',
          en: 'Ukuleles come in four sizes: **soprano**, **concert**, **tenor** and **baritone**. The first three are usually tuned the same (G C E A). The baritone is different: bigger, lower – and with its own tuning.',
          fr: 'Il existe quatre tailles de ukulélé : **soprano**, **concert**, **ténor** et **baryton**. Les trois premiers sont en général accordés pareil (G C E A). Le baryton est différent : plus grand, plus grave, avec son propre accordage.',
        },
      },
      { h2: { de: 'Größe', en: 'Size', fr: 'Taille' } },
      {
        p: {
          de: 'Eine Sopran-Ukulele ist etwa **53 cm** lang, eine Bariton-Ukulele etwa **76 cm**. Hals und Bünde sind länger, die Abstände zwischen den Bünden größer. Für kleine Hände ist das am Anfang etwas mehr Strecke – für größere Kinder, Jugendliche und Erwachsene ist es oft sogar bequemer. Am besten probierst du beide im Musikgeschäft aus.',
          en: 'A soprano ukulele is about **53 cm** (21 in) long, a baritone about **76 cm** (30 in). The neck is longer and the frets are further apart. For small hands that means a bit more stretching at first – for older kids, teens and adults it often feels even more comfortable. The best way is to try both in a music shop.',
          fr: 'Un ukulélé soprano mesure environ **53 cm**, un baryton environ **76 cm**. Le manche est plus long et les cases sont plus espacées. Pour de petites mains, il faut un peu plus s’étirer au début ; pour les grands enfants, les ados et les adultes, c’est souvent même plus confortable. Le mieux : essayer les deux dans un magasin de musique.',
        },
      },
      { h2: { de: 'Stimmung und Klang', en: 'Tuning and sound', fr: 'Accordage et son' } },
      {
        ul: [
          {
            de: '**Sopran:** G C E A, mit „hohem G“ – die oberste Saite ist höher als die zweite. Das gibt den hellen, typischen Ukulele-Klang.',
            en: '**Soprano:** G C E A with a “high G” – the top string is higher than the second. That gives the bright, typical ukulele sound.',
            fr: '**Soprano :** G C E A avec un « Sol aigu » : la corde du haut est plus aiguë que la deuxième. C’est ce qui donne le son clair typique du ukulélé.',
          },
          {
            de: '**Bariton:** D G B E – jede Saite eine Quarte tiefer als bei der Sopran-Ukulele, und von oben nach unten immer höher. Sie klingt voll und warm, fast wie eine Konzertgitarre.',
            en: '**Baritone:** D G B E – each string a fourth lower than on the soprano, getting higher from top to bottom. It sounds full and warm, almost like a classical guitar.',
            fr: '**Baryton :** D G B E – chaque corde une quarte plus bas que sur le soprano, et les notes montent du haut vers le bas. Le son est plein et chaleureux, presque comme une guitare classique.',
          },
        ],
      },
      { h2: { de: 'Gleiche Form, anderer Name', en: 'Same shape, different name', fr: 'Même forme, autre nom' } },
      {
        p: {
          de: 'Weil alle Saiten um denselben Abstand tiefer gestimmt sind, passen die Griffformen der Sopran-Ukulele auch auf die Bariton-Ukulele. Sie klingen nur fünf Halbtöne tiefer – und heißen deshalb anders:',
          en: 'Because every string is tuned down by the same amount, soprano chord shapes also work on a baritone. They just sound five half steps lower – so they have different names:',
          fr: 'Comme toutes les cordes sont accordées plus bas du même intervalle, les formes d’accords du soprano marchent aussi sur le baryton. Elles sonnent simplement cinq demi-tons plus bas – et changent donc de nom :',
        },
      },
      {
        ul: [
          { de: 'Die Form von **C** auf der Sopran-Ukulele ist auf der Bariton-Ukulele ein **G**.', en: 'The soprano **C** shape is a **G** on the baritone.', fr: 'La forme de **C** au soprano donne un **G** au baryton.' },
          { de: 'Die Form von **F** wird zu **C**.', en: 'The **F** shape becomes **C**.', fr: 'La forme de **F** devient **C**.' },
          { de: 'Die Form von **G** wird zu **D**, die von **G7** zu **D7**.', en: 'The **G** shape becomes **D**, the **G7** shape becomes **D7**.', fr: 'La forme de **G** devient **D**, celle de **G7** devient **D7**.' },
          { de: 'Die Form von **Am** wird zu **Em**.', en: 'The **Am** shape becomes **Em**.', fr: 'La forme de **Am** devient **Em**.' },
        ],
      },
      { chord: 'G' },
      {
        tip: {
          de: 'Wenn du in einer Gruppe mit Sopran-Ukulelen spielst, sprecht vorher die Tonart ab. Spielen alle dieselben Akkordnamen, klingt es zusammen – nur die Griffe sehen bei dir anders aus. Hilfe beim Umrechnen findest du unter [Transponieren](wissen:transponieren).',
          en: 'If you play in a group with soprano ukuleles, agree on the key first. When everyone plays the same chord names it sounds right together – your shapes just look different. For help converting, see [Transposing](wissen:transponieren).',
          fr: 'Si tu joues en groupe avec des ukulélés soprano, mettez-vous d’accord sur la tonalité. Si tout le monde joue les mêmes noms d’accords, ça sonne bien ensemble – seules tes formes sont différentes. Pour convertir, lis [Transposer](wissen:transponieren).',
        },
      },
    ],
    related: ['bariton-stimmen', 'bariton-zur-gitarre', 'transponieren', 'instrumentalklasse-schule'],
  },
  {
    id: 'bariton-zur-gitarre',
    slug: { de: 'von-der-bariton-ukulele-zur-gitarre', en: 'baritone-ukulele-to-guitar', fr: 'du-ukulele-baryton-a-la-guitare' },
    instruments: ['bariton'],
    category: 'instrument',
    title: {
      de: 'Von der Bariton-Ukulele zur Gitarre: Was du schon kannst',
      en: 'From Baritone Ukulele to Guitar: What You Already Know',
      fr: 'Du ukulélé baryton à la guitare : ce que tu sais déjà',
    },
    description: {
      de: 'Die Bariton-Ukulele ist gestimmt wie die vier hohen Gitarrensaiten. So nimmst du Griffe, Tabs und Akkordnamen ganz einfach mit zur Gitarre.',
      en: 'A baritone ukulele is tuned like the four highest guitar strings. Here’s how your chords, tabs and chord names carry straight over to guitar.',
      fr: 'Le ukulélé baryton est accordé comme les quatre cordes aiguës de la guitare. Voici comment tes accords, tablatures et noms d’accords passent à la guitare.',
    },
    blocks: [
      {
        p: {
          de: 'Eine Gitarre hat sechs Saiten: E A D G B E. Die Bariton-Ukulele hat genau die **vier hohen davon**: D G B E. Alles, was du auf diesen vier Saiten gelernt hast, klingt auf der Gitarre gleich – mit denselben Bünden und denselben Akkordnamen.',
          en: 'A guitar has six strings: E A D G B E. A baritone ukulele has exactly **the four highest of them**: D G B E. Everything you’ve learned on these four strings sounds the same on guitar – same frets, same chord names.',
          fr: 'Une guitare a six cordes : E A D G B E. Le ukulélé baryton a exactement **les quatre plus aiguës** : D G B E. Tout ce que tu as appris sur ces quatre cordes sonne pareil à la guitare – mêmes cases, mêmes noms d’accords.',
        },
      },
      { h2: { de: 'Deine Griffe auf der Gitarre', en: 'Your chords on the guitar', fr: 'Tes accords à la guitare' } },
      {
        p: {
          de: 'Auf der Gitarre greifst du die vier hohen Saiten genau wie gewohnt. Für den vollen Klang kommen oft noch Töne auf den zwei tiefen Saiten dazu:',
          en: 'On the guitar you fret the four high strings just as you’re used to. For a full sound you often add notes on the two low strings:',
          fr: 'À la guitare, tu joues les quatre cordes aiguës exactement comme d’habitude. Pour un son plus plein, on ajoute souvent des notes sur les deux cordes graves :',
        },
      },
      {
        ul: [
          {
            de: '**G:** wie auf der Bariton-Ukulele, dazu tiefe E-Saite im 3. Bund und A-Saite im 2. Bund.',
            en: '**G:** just like on the baritone, plus the low E string at fret 3 and the A string at fret 2.',
            fr: '**G :** comme au baryton, plus la corde de Mi grave à la case 3 et la corde de La à la case 2.',
          },
          {
            de: '**C:** wie auf der Bariton-Ukulele, dazu A-Saite im 3. Bund. Die tiefe E-Saite schlägst du nicht an.',
            en: '**C:** just like on the baritone, plus the A string at fret 3. Don’t play the low E string.',
            fr: '**C :** comme au baryton, plus la corde de La à la case 3. Ne joue pas la corde de Mi grave.',
          },
          {
            de: '**D, D7 und Dm:** genau wie auf der Bariton-Ukulele. Die zwei tiefen Saiten schlägst du nicht an.',
            en: '**D, D7 and Dm:** exactly like on the baritone. Don’t play the two low strings.',
            fr: '**D, D7 et Dm :** exactement comme au baryton. Ne joue pas les deux cordes graves.',
          },
          {
            de: '**Em:** wie auf der Bariton-Ukulele, dazu A-Saite im 2. Bund; die tiefe E-Saite klingt leer mit.',
            en: '**Em:** just like on the baritone, plus the A string at fret 2; the low E string rings open.',
            fr: '**Em :** comme au baryton, plus la corde de La à la case 2 ; la corde de Mi grave sonne à vide.',
          },
          {
            de: '**Am:** wie auf der Bariton-Ukulele, dazu die leere A-Saite. Die tiefe E-Saite schlägst du nicht an.',
            en: '**Am:** just like on the baritone, plus the open A string. Don’t play the low E string.',
            fr: '**Am :** comme au baryton, plus la corde de La à vide. Ne joue pas la corde de Mi grave.',
          },
        ],
      },
      { chord: 'D' },
      { h2: { de: 'Was neu ist', en: 'What’s new', fr: 'Ce qui change' } },
      {
        ul: [
          {
            de: 'Der Hals ist **breiter** und länger, die Finger müssen etwas weiter greifen.',
            en: 'The neck is **wider** and longer, so your fingers have to stretch a little further.',
            fr: 'Le manche est **plus large** et plus long : les doigts doivent s’écarter un peu plus.',
          },
          {
            de: 'Eine **Westerngitarre** hat Stahlsaiten. Die drücken am Anfang stärker auf die Fingerkuppen als die Nylonsaiten der Bariton-Ukulele. Eine **Konzertgitarre** hat Nylonsaiten und fühlt sich vertrauter an.',
            en: 'A **steel-string acoustic** guitar presses harder on your fingertips at first than the nylon strings of a baritone. A **classical guitar** has nylon strings and feels more familiar.',
            fr: 'Une guitare **folk** a des cordes en acier : au début, elles appuient plus fort sur le bout des doigts que les cordes en nylon du baryton. Une guitare **classique** a des cordes en nylon et paraît plus familière.',
          },
          {
            de: 'Manche Akkorde brauchen einen **Barré**: Der Zeigefinger drückt mehrere Saiten auf einmal. Das kennst du vielleicht schon vom F auf der Bariton-Ukulele.',
            en: 'Some chords need a **barre**: your index finger presses several strings at once. You may already know that from F on the baritone.',
            fr: 'Certains accords demandent un **barré** : l’index appuie sur plusieurs cordes à la fois. Tu connais peut-être déjà ça avec le F au baryton.',
          },
        ],
      },
      {
        tip: {
          de: 'Auch Tabulaturen kannst du mitnehmen: Die vier oberen Linien einer Gitarren-Tab sind genau deine vier Saiten. Wie Tabs funktionieren, steht in [Tabulatur lesen](wissen:tabulatur-lesen).',
          en: 'You can take tabs along too: the top four lines of a guitar tab are exactly your four strings. How tabs work is explained in [Reading tab](wissen:tabulatur-lesen).',
          fr: 'Tu peux aussi garder tes tablatures : les quatre lignes du haut d’une tab de guitare correspondent exactement à tes quatre cordes. Comment lire une tab : [Lire une tablature](wissen:tabulatur-lesen).',
        },
      },
    ],
    related: ['bariton-oder-sopran', 'bariton-erste-akkorde', 'tabulatur-lesen', 'fingerkuppen-hornhaut'],
  },
];
