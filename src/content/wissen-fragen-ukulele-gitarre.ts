import type { Article } from './types.ts';

// Fragen, die Einsteiger rund um Ukulele und Gitarre oft stellen (Ausbau Oktober 2026)
export const FRAGEN_UKULELE_GITARRE: Article[] = [
  {
    id: 'ukulele-gitarrenakkorde-uebertragen',
    slug: { de: 'gitarrenakkorde-auf-ukulele-uebertragen', en: 'guitar-chords-on-ukulele', fr: 'accords-guitare-sur-ukulele' },
    instruments: ['ukulele'],
    category: 'akkorde',
    title: {
      de: 'Gitarrenakkorde auf die Ukulele übertragen – auch mit Kapo-Angabe',
      en: 'Using Guitar Chords on the Ukulele – Even with a Capo Instruction',
      fr: 'Jouer des accords de guitare au ukulélé – même avec un capodastre',
    },
    description: {
      de: 'Ein Liedblatt für Gitarre auf der Ukulele spielen: Akkordnamen übernehmen, „Kapo 3“ umrechnen, Gitarren-Griffbilder verstehen – und was eine Guitalele ist.',
      en: 'Play a guitar song sheet on the ukulele: keep the chord names, convert “capo 3”, understand guitar chord shapes – and find out what a guitalele is.',
      fr: 'Jouer une grille de guitare au ukulélé : garder les noms d’accords, convertir « capo 3 », comprendre les formes de guitare – et découvrir le guitalélé.',
    },
    blocks: [
      {
        p: {
          de: 'Du hast ein Lied gefunden, aber über dem Text steht „Gitarre“? Kein Problem. Akkordnamen sind Tonnamen – ein **C** ist auf jedem Instrument ein C. Du nimmst einfach deinen Ukulele-Griff für denselben Namen. Nur bei zwei Dingen musst du aufpassen: bei **Kapo-Angaben** und bei **Griffbildern** für Gitarre.',
          en: 'You found a song, but it says “guitar” above the lyrics? No problem. Chord names are note names – a **C** is a C on every instrument. You simply use your ukulele grip for the same name. You only need to watch out for two things: **capo instructions** and guitar **chord diagrams**.',
          fr: 'Tu as trouvé une chanson, mais il est écrit « guitare » au-dessus des paroles ? Pas de souci. Les noms d’accords sont des noms de notes – un **C** est un Do sur tous les instruments. Tu prends simplement ton doigté de ukulélé pour le même nom. Il faut seulement faire attention à deux choses : les indications de **capodastre** et les **diagrammes** de guitare.',
        },
      },
      { h2: { de: 'Akkordnamen: einfach übernehmen', en: 'Chord names: just keep them', fr: 'Les noms d’accords : garde-les tels quels' } },
      {
        p: {
          de: 'Steht über dem Text C, Am, F und G, spielst du auf der Ukulele genau diese vier Akkorde. Die Ukulele klingt höher als die Gitarre, aber es ist derselbe Akkord – ihr könnt also zusammen spielen. Ist ein Griff auf der Ukulele schwer, etwa E oder Bb, hilft [Schwierige Ukulele-Akkorde einfach spielen](wissen:ukulele-schwierige-akkorde) oder du verschiebst das Lied in eine leichtere Tonart ([Transponieren](wissen:transponieren)).',
          en: 'If the sheet says C, Am, F and G, you play exactly those four chords on the ukulele. The ukulele sounds higher than the guitar, but it’s the same chord – so you can play together. If a grip is hard on the ukulele, such as E or Bb, see [Playing hard ukulele chords the easy way](wissen:ukulele-schwierige-akkorde) or move the song to an easier key ([Transposing](wissen:transponieren)).',
          fr: 'Si la grille indique C, Am, F et G, tu joues exactement ces quatre accords au ukulélé. Le ukulélé sonne plus aigu que la guitare, mais c’est le même accord – vous pouvez donc jouer ensemble. Si un accord est difficile au ukulélé, comme E ou Bb, lis [Accords difficiles au ukulélé](wissen:ukulele-schwierige-akkorde) ou mets la chanson dans une tonalité plus facile ([Transposer](wissen:transponieren)).',
        },
      },
      { h2: { de: 'Kapo-Angaben umrechnen', en: 'Converting capo instructions', fr: 'Convertir une indication de capodastre' } },
      {
        p: {
          de: 'Steht über einem Gitarrenlied „**Kapo 3**“, klemmt die Gitarre einen Kapodaster in den 3. Bund. Dann **greift** sie zum Beispiel G, **klingt** aber drei Halbtöne höher. Für die Ukulele hast du drei Möglichkeiten:',
          en: 'If a guitar song says “**capo 3**”, the guitar clamps a capo at the 3rd fret. It then **plays the shape** of, say, G, but **sounds** three semitones higher. On the ukulele you have three options:',
          fr: 'Si une chanson pour guitare indique « **capo 3** », la guitare pose un capodastre à la 3e case. Elle **fait la forme** de G, par exemple, mais **sonne** trois demi-tons plus haut. Au ukulélé, tu as trois possibilités :',
        },
      },
      {
        ol: [
          {
            de: '**Die klingenden Akkorde spielen:** Zähl jeden Akkord drei Halbtöne hoch. Aus G, C, D und Em werden Bb, Eb, F und Gm. Das klingt genau wie die Gitarre, die Griffe sind aber oft schwerer.',
            en: '**Play the sounding chords:** count every chord up three semitones. G, C, D and Em become Bb, Eb, F and Gm. That sounds exactly like the guitar, but the grips are often harder.',
            fr: '**Jouer les accords réels :** monte chaque accord de trois demi-tons. G, C, D et Em deviennent Bb, Eb, F et Gm. Ça sonne exactement comme la guitare, mais les doigtés sont souvent plus difficiles.',
          },
          {
            de: '**Selbst einen Kapo setzen:** Klemm einen Ukulele-Kapodaster ebenfalls in den 3. Bund und greif G, C, D und Em. Mehr dazu in [Kapodaster an der Ukulele](wissen:ukulele-kapodaster).',
            en: '**Use a capo yourself:** clamp a ukulele capo at the 3rd fret as well and play G, C, D and Em. More in [Using a capo on the ukulele](wissen:ukulele-kapodaster).',
            fr: '**Mettre toi aussi un capodastre :** pose un capodastre de ukulélé à la 3e case et joue G, C, D et Em. Plus d’infos dans [Le capodastre au ukulélé](wissen:ukulele-kapodaster).',
          },
          {
            de: '**Den Kapo weglassen:** Spielst du allein, kannst du G, C, D und Em einfach ohne Kapo greifen. Das Lied klingt dann etwas tiefer – oft passt es so sogar besser zu einer Kinderstimme.',
            en: '**Leave the capo out:** if you play on your own, you can simply play G, C, D and Em without a capo. The song then sounds a bit lower – which often suits a child’s voice even better.',
            fr: '**Oublier le capodastre :** si tu joues seul, tu peux simplement jouer G, C, D et Em sans capodastre. La chanson sonne alors un peu plus grave – ce qui convient souvent mieux à une voix d’enfant.',
          },
        ],
      },
      {
        tip: {
          de: 'Halbtöne zählen geht so: C, C#, D, D#, E, F, F#, G, G#, A, Bb, B – und wieder C. Zwischen E und F und zwischen B und C liegt kein Ton dazwischen. Mehr dazu in [Töne und Notennamen](wissen:toene-und-notennamen).',
          en: 'Counting semitones goes like this: C, C#, D, D#, E, F, F#, G, G#, A, Bb, B – and back to C. There is no note in between E and F or between B and C. More in [Notes and note names](wissen:toene-und-notennamen).',
          fr: 'Pour compter les demi-tons : C, C#, D, D#, E, F, F#, G, G#, A, Bb, B – puis de nouveau C. Il n’y a pas de note entre E et F, ni entre B et C. Plus d’infos dans [Les notes et leurs noms](wissen:toene-und-notennamen).',
        },
      },
      { h2: { de: 'Gitarren-Griffbilder auf der Ukulele', en: 'Guitar chord shapes on the ukulele', fr: 'Les formes de guitare sur le ukulélé' } },
      {
        p: {
          de: 'Die vier Ukulele-Saiten G, C, E und A sind genauso gestimmt wie die vier hohen Gitarrensaiten mit einem Kapo im 5. Bund. Deshalb sieht dein Ukulele-Griff für C aus wie die oberen vier Saiten des Gitarren-G. Kennst du schon Gitarrengriffe, kannst du ihre Form übernehmen – sie heißt auf der Ukulele aber anders, nämlich fünf Halbtöne höher:',
          en: 'The four ukulele strings G, C, E and A are tuned just like the four high guitar strings with a capo at the 5th fret. That’s why your ukulele C looks like the top four strings of a guitar G. If you already know guitar chords, you can reuse their shapes – but on the ukulele they have a different name, five semitones higher:',
          fr: 'Les quatre cordes du ukulélé G, C, E et A sont accordées comme les quatre cordes aiguës d’une guitare avec un capodastre à la 5e case. C’est pour ça que ton accord de C au ukulélé ressemble aux quatre cordes aiguës du G de la guitare. Si tu connais déjà des accords de guitare, tu peux reprendre leur forme – mais au ukulélé, elle porte un autre nom, cinq demi-tons plus haut :',
        },
      },
      {
        ul: [
          { de: 'Gitarrenform **G** → auf der Ukulele **C**', en: 'Guitar shape **G** → ukulele **C**', fr: 'Forme de guitare **G** → au ukulélé **C**' },
          { de: 'Gitarrenform **D** → auf der Ukulele **G**', en: 'Guitar shape **D** → ukulele **G**', fr: 'Forme de guitare **D** → au ukulélé **G**' },
          { de: 'Gitarrenform **A** → auf der Ukulele **D**', en: 'Guitar shape **A** → ukulele **D**', fr: 'Forme de guitare **A** → au ukulélé **D**' },
          { de: 'Gitarrenform **E** → auf der Ukulele **A**', en: 'Guitar shape **E** → ukulele **A**', fr: 'Forme de guitare **E** → au ukulélé **A**' },
          { de: 'Gitarrenform **C** → auf der Ukulele **F**', en: 'Guitar shape **C** → ukulele **F**', fr: 'Forme de guitare **C** → au ukulélé **F**' },
          { de: 'Gitarrenform **Em** → auf der Ukulele **Am**, **Am** → **Dm**', en: 'Guitar shape **Em** → ukulele **Am**, **Am** → **Dm**', fr: 'Forme de guitare **Em** → au ukulélé **Am**, **Am** → **Dm**' },
        ],
      },
      { chord: 'C' },
      { chord: 'G' },
      { h2: { de: 'Und was ist eine Guitalele?', en: 'And what is a guitalele?', fr: 'Et c’est quoi, un guitalélé ?' } },
      {
        p: {
          de: 'Eine **Guitalele** ist eine kleine Gitarre mit sechs Saiten in der Größe einer Tenor-Ukulele. Sie ist gestimmt wie eine Gitarre mit Kapo im 5. Bund: **A D G C E A**. Gitarrengriffe funktionieren also, klingen aber fünf Halbtöne höher – die G-Form ergibt ein C. Die vier hohen Saiten G, C, E, A entsprechen einer Ukulele mit tiefem G ([Ukulele mit tiefem G](wissen:ukulele-d-stimmung-tiefes-g)). Deine Ukulele-Griffe passen darauf also auch, wenn du die zwei tiefsten Saiten nicht anschlägst.',
          en: 'A **guitalele** is a small six-string guitar about the size of a tenor ukulele. It is tuned like a guitar with a capo at the 5th fret: **A D G C E A**. So guitar shapes work, but sound five semitones higher – the G shape gives a C. The four high strings G, C, E, A match a low-G ukulele ([Low-G ukulele](wissen:ukulele-d-stimmung-tiefes-g)). Your ukulele grips work on it too, as long as you don’t strum the two lowest strings.',
          fr: 'Un **guitalélé** est une petite guitare à six cordes de la taille d’un ukulélé ténor. Il est accordé comme une guitare avec un capodastre à la 5e case : **A D G C E A**. Les formes de guitare fonctionnent donc, mais sonnent cinq demi-tons plus haut – la forme de G donne un C. Les quatre cordes aiguës G, C, E, A correspondent à un ukulélé avec Sol grave ([Ukulélé avec Sol grave](wissen:ukulele-d-stimmung-tiefes-g)). Tes doigtés de ukulélé marchent donc aussi, si tu ne grattes pas les deux cordes les plus graves.',
        },
      },
      { h2: { de: 'In der App', en: 'In the app', fr: 'Dans l’appli' } },
      {
        p: {
          de: 'Kopier Text und Akkorde des Gitarrenlieds als eigenes Lied in die App. Dort kannst du es mit „Einen Halbton höher“ und „Einen Halbton tiefer“ verschieben, bis die Griffe leicht sind. Die App schlägt dir auch eine Tonart vor und sagt, wenn ein Kapodaster helfen würde.',
          en: 'Copy the lyrics and chords of the guitar song into the app as your own song. There you can shift it with “One semitone higher” and “One semitone lower” until the grips are easy. The app also suggests a key and tells you when a capo would help.',
          fr: 'Copie les paroles et les accords de la chanson de guitare dans l’appli comme chanson perso. Tu peux la décaler avec « Un demi-ton plus haut » et « Un demi-ton plus bas » jusqu’à ce que les accords soient faciles. L’appli te propose aussi une tonalité et te dit quand un capodastre aiderait.',
        },
      },
      { tool: 'eigenes-lied' },
    ],
    related: ['ukulele-kapodaster', 'gitarre-und-ukulele-zusammen', 'transponieren', 'akkordsymbole-lesen'],
    published: '2026-10-11',
  },
  {
    id: 'ukulele-kapodaster',
    slug: { de: 'kapodaster-ukulele', en: 'ukulele-capo', fr: 'capodastre-ukulele' },
    instruments: ['ukulele'],
    category: 'technik',
    title: {
      de: 'Kapodaster an der Ukulele – wann er hilft und wie er sitzt',
      en: 'Using a Capo on the Ukulele – When It Helps and How to Fit It',
      fr: 'Le capodastre au ukulélé – quand il aide et comment le poser',
    },
    description: {
      de: 'Mit Kapodaster spielst du an der Ukulele leichte Griffe in höheren Tonarten. Welcher Bund welche Tonart ergibt, wie er richtig sitzt und welcher Kapo passt.',
      en: 'A capo lets you play easy ukulele grips in higher keys. Which fret gives which key, how to place it properly and what kind of capo suits a ukulele.',
      fr: 'Avec un capodastre, tu joues des accords faciles dans des tonalités plus aiguës. Quelle case donne quelle tonalité, comment le poser et quel modèle choisir.',
    },
    blocks: [
      {
        p: {
          de: 'Ein **Kapodaster** (kurz Kapo) ist eine Klammer, die alle Saiten in einem Bund gleichzeitig herunterdrückt. Er wirkt wie ein neuer Sattel: Alles klingt höher, aber deine Griffe bleiben gleich. Greifst du mit Kapo im 2. Bund ein C, klingt ein **D**.',
          en: 'A **capo** is a clamp that holds down all the strings at one fret at once. It works like a new nut: everything sounds higher, but your grips stay the same. If you play a C shape with the capo at the 2nd fret, you hear a **D**.',
          fr: 'Un **capodastre** (ou capo) est une pince qui appuie sur toutes les cordes d’une même case à la fois. Il agit comme un nouveau sillet : tout sonne plus aigu, mais tes doigtés restent les mêmes. Si tu fais un C avec le capo à la 2e case, tu entends un **D**.',
        },
      },
      { h2: { de: 'Wofür ist das gut?', en: 'What is it good for?', fr: 'À quoi ça sert ?' } },
      {
        ul: [
          {
            de: '**Für deine Stimme:** Ist ein Lied zum Singen zu tief, setzt du den Kapo einen oder zwei Bünde höher – und behältst die leichten Griffe.',
            en: '**For your voice:** if a song is too low to sing, put the capo one or two frets higher – and keep the easy grips.',
            fr: '**Pour ta voix :** si une chanson est trop grave à chanter, pose le capo une ou deux cases plus haut – et garde les accords faciles.',
          },
          {
            de: '**Mit anderen zusammen:** Spielt die Gitarre mit Kapo, kannst du ihn an derselben Stelle setzen und dieselben Griffnamen greifen.',
            en: '**Playing with others:** if the guitar uses a capo, you can put yours at the same fret and play the same chord shapes.',
            fr: '**Avec d’autres :** si la guitare joue avec un capo, tu peux poser le tien à la même case et jouer les mêmes formes.',
          },
          {
            de: '**Schwere Tonarten umgehen:** Ein Lied in D mit vielen schweren Griffen? Mit Kapo im 2. Bund greifst du es in C.',
            en: '**Avoiding hard keys:** a song in D with lots of tricky grips? With the capo at the 2nd fret you can play it in C shapes.',
            fr: '**Éviter les tonalités difficiles :** une chanson en Ré avec plein d’accords durs ? Avec le capo à la 2e case, tu la joues avec les formes de Do.',
          },
        ],
      },
      { h2: { de: 'Welcher Bund ergibt was?', en: 'Which fret gives what?', fr: 'Quelle case donne quoi ?' } },
      {
        p: {
          de: 'Jeder Bund macht alles einen **Halbton** höher. So klingt der C-Griff:',
          en: 'Every fret raises everything by a **semitone**. This is how the C shape sounds:',
          fr: 'Chaque case monte tout d’un **demi-ton**. Voici comment sonne la forme de C :',
        },
      },
      {
        ul: [
          { de: 'Kapo im 1. Bund: C klingt als **C#** (Db)', en: 'Capo at fret 1: C sounds as **C#** (Db)', fr: 'Capo à la 1re case : C sonne **C#** (Db)' },
          { de: 'Kapo im 2. Bund: C klingt als **D**, G als A, Am als Bm, F als G', en: 'Capo at fret 2: C sounds as **D**, G as A, Am as Bm, F as G', fr: 'Capo à la 2e case : C sonne **D**, G sonne A, Am sonne Bm, F sonne G' },
          { de: 'Kapo im 3. Bund: C klingt als **Eb**', en: 'Capo at fret 3: C sounds as **Eb**', fr: 'Capo à la 3e case : C sonne **Eb**' },
          { de: 'Kapo im 4. Bund: C klingt als **E**', en: 'Capo at fret 4: C sounds as **E**', fr: 'Capo à la 4e case : C sonne **E**' },
          { de: 'Kapo im 5. Bund: C klingt als **F**', en: 'Capo at fret 5: C sounds as **F**', fr: 'Capo à la 5e case : C sonne **F**' },
        ],
      },
      { chord: 'C' },
      { h2: { de: 'So sitzt der Kapo richtig', en: 'How to fit the capo properly', fr: 'Bien poser le capo' } },
      {
        ol: [
          {
            de: 'Setz ihn **dicht vor das Bundstäbchen**, also auf der Seite zum Kopf hin – nicht mitten in den Bund und nicht oben auf das Stäbchen.',
            en: 'Place it **right behind the fret wire**, on the side towards the headstock – not in the middle of the fret and not on top of the wire.',
            fr: 'Pose-le **juste derrière la frette**, du côté de la tête – pas au milieu de la case et pas sur la frette.',
          },
          {
            de: 'Er soll **gerade** quer über den Hals liegen und alle vier Saiten gleichmäßig drücken.',
            en: 'It should sit **straight** across the neck and press all four strings evenly.',
            fr: 'Il doit être **bien droit** en travers du manche et appuyer sur les quatre cordes de la même façon.',
          },
          {
            de: '**Nicht zu fest:** Zieht er die Saiten zur Seite oder drückt er sehr stark, klingen sie etwas zu hoch. So fest wie nötig, damit nichts schnarrt.',
            en: '**Not too tight:** if it pulls the strings sideways or presses very hard, they sound slightly sharp. Just tight enough that nothing buzzes.',
            fr: '**Pas trop serré :** s’il tire les cordes sur le côté ou appuie très fort, elles sonnent un peu trop haut. Juste assez pour que rien ne frise.',
          },
          {
            de: 'Danach kurz mit dem Stimmgerät prüfen. Am einfachsten stimmst du die Ukulele **ohne** Kapo und setzt ihn dann vorsichtig auf.',
            en: 'Then check briefly with the tuner. The easiest way is to tune the ukulele **without** the capo and then put it on carefully.',
            fr: 'Puis vérifie rapidement avec l’accordeur. Le plus simple est d’accorder le ukulélé **sans** capo, puis de le poser délicatement.',
          },
        ],
      },
      { h2: { de: 'Welcher Kapo passt?', en: 'Which capo fits?', fr: 'Quel capo choisir ?' } },
      {
        p: {
          de: 'Nimm einen **kleinen, leichten Kapo für Ukulele**. Gitarren-Kapos sind oft zu breit und zu schwer für den schmalen Hals und drücken zu stark. Es gibt Klemm-Kapos mit Feder, solche mit kleiner Stellschraube und einfache mit Gummiband. Für Kinderhände ist ein Federkapo am bequemsten – der lässt sich mit einer Hand umsetzen.',
          en: 'Choose a **small, light capo made for ukulele**. Guitar capos are often too wide and heavy for the narrow neck and press too hard. There are spring clamps, ones with a small adjusting screw and simple elastic ones. For children’s hands a spring capo is the most comfortable – you can move it with one hand.',
          fr: 'Prends un **petit capo léger pour ukulélé**. Les capos de guitare sont souvent trop larges et trop lourds pour le manche étroit et serrent trop. Il existe des pinces à ressort, des modèles avec une petite vis de réglage et des modèles simples à élastique. Pour des mains d’enfant, le capo à ressort est le plus pratique – il se déplace d’une seule main.',
        },
      },
      {
        tip: {
          de: 'Die Ukulele klingt schon hell. Ab dem 5. oder 6. Bund wird es schnell piepsig und auf einer Sopran-Ukulele eng für die Finger. Ist ein Lied viel zu tief, probier lieber eine andere Tonart ohne Kapo.',
          en: 'The ukulele already sounds bright. From the 5th or 6th fret up it quickly gets squeaky, and cramped for your fingers on a soprano. If a song is much too low, try another key without a capo instead.',
          fr: 'Le ukulélé sonne déjà clair. À partir de la 5e ou 6e case, ça devient vite pointu, et serré pour les doigts sur un soprano. Si une chanson est beaucoup trop grave, essaie plutôt une autre tonalité sans capo.',
        },
      },
      { h2: { de: 'Kapo in der App', en: 'The capo in the app', fr: 'Le capo dans l’appli' } },
      {
        p: {
          de: 'Bei jedem Lied kannst du die Tonart verschieben. Würde ein Kapo die Griffe leichter machen, zeigt die App das an, zum Beispiel „Kapo 2, greif wie C“ – dann siehst du die leichten C-Griffe und das Lied klingt trotzdem in D. Mehr übers Verschieben steht in [Transponieren](wissen:transponieren).',
          en: 'In every song you can change the key. If a capo would make the grips easier, the app shows it, for example “Capo 2, play C shapes” – you then see the easy C grips while the song still sounds in D. More about changing keys in [Transposing](wissen:transponieren).',
          fr: 'Dans chaque chanson, tu peux changer de tonalité. Si un capo rendait les accords plus faciles, l’appli l’indique, par exemple « Capo case 2, joue comme en C » – tu vois alors les accords faciles de C, et la chanson sonne quand même en Ré. Plus d’infos dans [Transposer](wissen:transponieren).',
        },
      },
      { tool: 'lieder' },
    ],
    related: ['ukulele-gitarrenakkorde-uebertragen', 'transponieren', 'ukulele-schwierige-akkorde', 'singen-und-spielen'],
    published: '2026-10-11',
  },
  {
    id: 'ukulele-klingt-schief',
    slug: { de: 'ukulele-klingt-schief-obwohl-gestimmt', en: 'ukulele-sounds-out-of-tune-after-tuning', fr: 'ukulele-pas-juste-meme-accorde' },
    instruments: ['ukulele'],
    category: 'instrument',
    title: {
      de: 'Ukulele klingt schief, obwohl gestimmt? Die häufigsten Ursachen',
      en: 'Ukulele Sounds Out of Tune Even After Tuning? The Usual Causes',
      fr: 'Ton ukulélé ne sonne pas juste alors qu’il est accordé ? Les causes',
    },
    description: {
      de: 'Neue Saiten dehnen sich, eine Saite steckt eine Oktave daneben, zu fester Griff, hohe Saitenlage: So findest du heraus, warum die Ukulele trotz Stimmen schief klingt.',
      en: 'New strings stretch, a string sits an octave off, pressing too hard, high action: how to find out why your ukulele still sounds off after tuning.',
      fr: 'Cordes neuves qui se détendent, corde à la mauvaise octave, doigts qui appuient trop, cordes trop hautes : trouve pourquoi ton ukulélé ne sonne pas juste.',
    },
    blocks: [
      {
        p: {
          de: 'Das Stimmgerät zeigt bei jeder Saite „genau richtig“ – und trotzdem klingen die Akkorde schräg? Das ist ärgerlich, aber fast immer harmlos. Geh die Liste von oben nach unten durch: Die häufigsten Ursachen stehen zuerst.',
          en: 'The tuner says every string is spot on – and yet the chords sound off? Annoying, but almost always harmless. Work through the list from top to bottom: the most common causes come first.',
          fr: 'L’accordeur indique que chaque corde est juste – et pourtant les accords sonnent bizarrement ? C’est agaçant, mais presque toujours sans gravité. Parcours la liste dans l’ordre : les causes les plus fréquentes sont en premier.',
        },
      },
      { h2: { de: '1. Neue Saiten dehnen sich', en: '1. New strings stretch', fr: '1. Les cordes neuves se détendent' } },
      {
        p: {
          de: 'Ukulele-Saiten aus Nylon oder ähnlichem Kunststoff dehnen sich in den ersten Tagen, manchmal sogar Wochen, stark. Du stimmst – und zehn Minuten später ist die Saite schon wieder zu tief. Das ist ganz normal. Hilfe: Saite stimmen, dann vorsichtig ein paar Zentimeter vom Griffbrett wegziehen, nachstimmen und das ein paarmal wiederholen. Danach hält die Stimmung viel besser.',
          en: 'Ukulele strings made of nylon or similar plastics stretch a lot during the first days, sometimes even weeks. You tune – and ten minutes later the string is low again. That’s completely normal. What helps: tune the string, gently pull it a few centimetres away from the fretboard, retune and repeat a few times. After that the tuning holds much better.',
          fr: 'Les cordes de ukulélé en nylon ou matière similaire se détendent beaucoup les premiers jours, parfois même des semaines. Tu accordes – et dix minutes plus tard, la corde est de nouveau trop grave. C’est tout à fait normal. Ce qui aide : accorde la corde, tire-la doucement de quelques centimètres loin de la touche, réaccorde et recommence plusieurs fois. Ensuite, l’accord tient bien mieux.',
        },
      },
      { h2: { de: '2. Eine Saite steckt eine Oktave daneben', en: '2. A string is an octave off', fr: '2. Une corde est à la mauvaise octave' } },
      {
        p: {
          de: 'Viele Stimmgeräte zeigen nur den Tonnamen – G ist G, egal ob hoch oder tief. Ist eine Saite eine **Oktave zu tief** gestimmt, hängt sie schlaff und schnarrt. Ist sie eine Oktave zu hoch, ist sie extrem straff und kann reißen. Besonders oft passiert das bei der **G-Saite**: Normalerweise ist sie dünn und klingt **höher** als die C-Saite daneben. Bei einer Ukulele mit **tiefem G** ist sie dicker und klingt tiefer.',
          en: 'Many tuners only show the note name – G is G, high or low. If a string is tuned **an octave too low**, it’s floppy and buzzes. If it’s an octave too high, it’s extremely tight and may snap. This happens most often with the **G string**: normally it’s thin and sounds **higher** than the C string next to it. On a **low-G** ukulele it’s thicker and sounds lower.',
          fr: 'Beaucoup d’accordeurs n’indiquent que le nom de la note – un Sol est un Sol, aigu ou grave. Si une corde est accordée **une octave trop bas**, elle est molle et frise. Une octave trop haut, elle est très tendue et peut casser. Ça arrive surtout avec la **corde de Sol** : normalement elle est fine et sonne **plus aigu** que la corde de Do à côté. Sur un ukulélé avec **Sol grave**, elle est plus épaisse et sonne plus bas.',
        },
      },
      {
        ul: [
          {
            de: 'Prüfung für das hohe G: Die E-Saite im **3. Bund** klingt genau wie die leere G-Saite.',
            en: 'Check for high G: the E string at the **3rd fret** sounds exactly like the open G string.',
            fr: 'Test pour le Sol aigu : la corde de Mi à la **3e case** sonne exactement comme la corde de Sol à vide.',
          },
          {
            de: 'Prüfung für die C-Saite: Die C-Saite im **4. Bund** klingt wie die leere E-Saite.',
            en: 'Check for the C string: the C string at the **4th fret** sounds like the open E string.',
            fr: 'Test pour la corde de Do : la corde de Do à la **4e case** sonne comme la corde de Mi à vide.',
          },
          {
            de: 'Prüfung für die A-Saite: Die E-Saite im **5. Bund** klingt wie die leere A-Saite.',
            en: 'Check for the A string: the E string at the **5th fret** sounds like the open A string.',
            fr: 'Test pour la corde de La : la corde de Mi à la **5e case** sonne comme la corde de La à vide.',
          },
        ],
      },
      {
        p: {
          de: 'Hast du eine Ukulele mit tiefem G, stell das Stimmgerät der App unter „Andere Stimmung …“ auf „Tiefes G“. Mehr dazu: [Ukulele mit tiefem G](wissen:ukulele-d-stimmung-tiefes-g).',
          en: 'If your ukulele has a low G, set the app’s tuner to “Low G” under “Other tuning …”. More in [Low-G ukulele](wissen:ukulele-d-stimmung-tiefes-g).',
          fr: 'Si ton ukulélé a un Sol grave, choisis « G grave » sous « Autre accordage … » dans l’accordeur de l’appli. Plus d’infos : [Ukulélé avec Sol grave](wissen:ukulele-d-stimmung-tiefes-g).',
        },
      },
      { h2: { de: '3. Zu fest gedrückt', en: '3. Pressing too hard', fr: '3. Les doigts appuient trop fort' } },
      {
        p: {
          de: 'Drückst du eine Saite sehr kräftig oder ziehst sie beim Greifen zur Seite, wird sie gedehnt und klingt **höher**. Leere Saiten stimmen dann, gegriffene Akkorde aber nicht. Drück nur so fest, dass der Ton gerade klar klingt, und setz die Fingerkuppe senkrecht auf. Mehr Tipps stehen in [Saite schnarrt oder klingt dumpf?](wissen:saubere-griffe).',
          en: 'If you press a string very hard or pull it sideways while fretting, it gets stretched and sounds **sharp**. The open strings are in tune, but fretted chords aren’t. Press only as hard as needed for a clear note, with your fingertip straight down. More tips in [String buzzing or sounding dull?](wissen:saubere-griffe).',
          fr: 'Si tu appuies très fort sur une corde ou la tires sur le côté, elle s’étire et sonne **trop haut**. Les cordes à vide sont justes, mais pas les accords. Appuie juste assez pour que la note soit nette, avec le bout du doigt bien vertical. Plus d’astuces dans [La corde frise ou sonne étouffée ?](wissen:saubere-griffe).',
        },
      },
      { h2: { de: '4. Die Bundreinheit prüfen', en: '4. Checking the intonation', fr: '4. Vérifier la justesse sur le manche' } },
      {
        p: {
          de: 'Greif eine Saite im **12. Bund**. Der Ton muss genau eine Oktave über der leeren Saite liegen – gleicher Name, nur höher. Vergleiche nach Gehör oder mit einem Stimmgerät, das jeden Ton anzeigt (das Stimmgerät der App kennt nur die leeren Saiten). Klingt der 12. Bund deutlich zu hoch, ist oft die **Saitenlage** zu hoch: Die Saiten liegen weit über dem Griffbrett und werden beim Drücken gedehnt. Klingen schon die ersten Bünde zu hoch, liegt es meist am **Sattel**, der bei sehr günstigen Instrumenten oft zu hoch ist.',
          en: 'Fret a string at the **12th fret**. The note must be exactly one octave above the open string – same name, just higher. Compare by ear or with a tuner that shows any note (the app’s tuner only knows the open strings). If the 12th fret is clearly sharp, the **action** is often too high: the strings sit far above the fretboard and get stretched when you press. If even the first frets are sharp, it’s usually the **nut**, which is often too high on very cheap instruments.',
          fr: 'Appuie sur une corde à la **12e case**. La note doit être exactement une octave au-dessus de la corde à vide – même nom, juste plus aigu. Compare à l’oreille ou avec un accordeur qui affiche toutes les notes (celui de l’appli ne connaît que les cordes à vide). Si la 12e case est nettement trop haute, les **cordes sont souvent trop hautes** au-dessus de la touche et s’étirent quand tu appuies. Si même les premières cases sont trop hautes, c’est en général le **sillet**, souvent trop haut sur les instruments très bon marché.',
        },
      },
      {
        tip: {
          de: 'Sattel und Steg tiefer feilen ist Arbeit für eine Werkstatt. Das kostet meist nicht viel und macht aus einer günstigen Ukulele oft ein richtig angenehmes Instrument.',
          en: 'Lowering the nut and saddle is a job for a repair shop. It usually doesn’t cost much and often turns a cheap ukulele into a really nice instrument.',
          fr: 'Abaisser le sillet et le chevalet, c’est un travail d’atelier. En général, ça ne coûte pas cher et ça rend souvent un ukulélé bon marché vraiment agréable.',
        },
      },
      { h2: { de: '5. Einfache Saiten, rutschende Wirbel, Wetter', en: '5. Basic strings, slipping pegs, weather', fr: '5. Cordes basiques, chevilles qui glissent, météo' } },
      {
        ul: [
          {
            de: 'Bei sehr günstigen Ukulelen sind oft einfache Saiten aufgezogen. Ein gutes Saitenset kostet wenig und verbessert Klang und Stimmstabilität deutlich.',
            en: 'Very cheap ukuleles often come with basic strings. A good set costs little and clearly improves the sound and how well it stays in tune.',
            fr: 'Les ukulélés très bon marché ont souvent des cordes basiques. Un bon jeu de cordes coûte peu et améliore nettement le son et la tenue de l’accord.',
          },
          {
            de: 'Manche Ukulelen haben einfache Reibungswirbel ohne Getriebe. Rutschen sie zurück, zieh die kleine Schraube am Wirbelende ein wenig fester.',
            en: 'Some ukuleles have simple friction pegs without gears. If they slip back, tighten the small screw at the end of the peg a little.',
            fr: 'Certains ukulélés ont des chevilles à friction sans engrenage. Si elles reviennent en arrière, serre un peu la petite vis au bout de la cheville.',
          },
          {
            de: 'Kälte, Wärme und trockene Heizungsluft verstimmen jedes Holzinstrument. Lass die Ukulele nach dem Transport ein paar Minuten im Raum, bevor du stimmst.',
            en: 'Cold, heat and dry heating air put any wooden instrument out of tune. After carrying the ukulele around, give it a few minutes in the room before you tune.',
            fr: 'Le froid, la chaleur et l’air sec du chauffage désaccordent tous les instruments en bois. Après un transport, laisse le ukulélé quelques minutes dans la pièce avant d’accorder.',
          },
        ],
      },
      {
        p: {
          de: 'Im Werkzeug „Akkorde“ hört dir der Knopf „Prüf mich!“ zu und sagt, welche Saite im Akkord noch nicht passt. So findest du schnell heraus, ob es an einer Saite oder am Griff liegt.',
          en: 'In the “Chords” tool, the “Check me!” button listens and tells you which string in the chord isn’t right yet. That way you quickly find out whether it’s a string or your grip.',
          fr: 'Dans l’outil « Accords », le bouton « Teste-moi ! » t’écoute et te dit quelle corde de l’accord n’est pas encore juste. Tu sais ainsi vite si ça vient d’une corde ou de ton doigté.',
        },
      },
      { tool: 'stimmen' },
    ],
    related: ['ukulele-stimmen', 'saubere-griffe', 'saiten-wechseln-pflege', 'ukulele-d-stimmung-tiefes-g'],
    published: '2026-10-11',
  },
  {
    id: 'singen-und-spielen',
    slug: { de: 'singen-und-spielen-gleichzeitig', en: 'singing-and-playing-at-the-same-time', fr: 'chanter-et-jouer-en-meme-temps' },
    instruments: ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline'],
    category: 'technik',
    title: {
      de: 'Singen und Spielen gleichzeitig – so klappt es Schritt für Schritt',
      en: 'Singing and Playing at the Same Time – Step by Step',
      fr: 'Chanter et jouer en même temps – pas à pas',
    },
    description: {
      de: 'Die Hände laufen, aber beim Singen stolpert alles? Mit diesen Schritten lernst du, zur eigenen Begleitung zu singen – und findest eine Tonart für deine Stimme.',
      en: 'Your hands are fine, but singing makes everything stumble? These steps teach you to sing over your own playing – and to find a key that suits your voice.',
      fr: 'Tes mains se débrouillent, mais tout déraille quand tu chantes ? Avec ces étapes, tu apprends à chanter en t’accompagnant – et à trouver la bonne tonalité.',
    },
    blocks: [
      {
        p: {
          de: 'Singen und gleichzeitig spielen ist wie Kopf streicheln und Bauch kreisen: Jedes für sich ist leicht, zusammen verknotet sich erst mal alles. Das geht allen so. Der Trick: Eine Sache muss **von allein** laufen, bevor die zweite dazukommt – und das ist fast immer die Begleitung.',
          en: 'Singing while playing is like patting your head and rubbing your tummy: each is easy on its own, but together everything gets tangled at first. That happens to everyone. The trick: one thing must run **on autopilot** before you add the second – and that’s almost always the accompaniment.',
          fr: 'Chanter en jouant, c’est comme se tapoter la tête en se frottant le ventre : chaque geste seul est facile, mais ensemble tout s’emmêle au début. C’est pareil pour tout le monde. L’astuce : une chose doit marcher **toute seule** avant d’ajouter la deuxième – et c’est presque toujours l’accompagnement.',
        },
      },
      { h2: { de: 'Fünf Schritte', en: 'Five steps', fr: 'Cinq étapes' } },
      {
        ol: [
          {
            de: '**Begleitung auf Autopilot:** Spiel das Lied so lange, bis du die Akkordwechsel ohne Hinsehen schaffst. Am Anfang reicht ein Abschlag auf jeden Schlag.',
            en: '**Accompaniment on autopilot:** play the song until you can change chords without looking. At first one downstroke per beat is enough.',
            fr: '**L’accompagnement en pilote automatique :** joue la chanson jusqu’à changer d’accord sans regarder. Au début, un coup vers le bas par temps suffit.',
          },
          {
            de: '**Text sprechen:** Spiel weiter und sprich den Liedtext im Rhythmus dazu, ohne Melodie – wie ein Rap.',
            en: '**Speak the lyrics:** keep playing and speak the lyrics in rhythm, without the tune – like a rap.',
            fr: '**Dire le texte :** continue à jouer et dis les paroles en rythme, sans mélodie – comme un rap.',
          },
          {
            de: '**Summen:** Jetzt summst du die Melodie. Summen ist leichter als Singen, weil du nicht an den Text denken musst.',
            en: '**Hum:** now hum the melody. Humming is easier than singing because you don’t have to think about the words.',
            fr: '**Fredonner :** maintenant, fredonne la mélodie. C’est plus facile que chanter, car tu n’as pas à penser aux paroles.',
          },
          {
            de: '**Singen mit wenig Anschlag:** Sing den Text und schlag nur einmal pro Takt an, auf die Eins. Dann zweimal, dann auf jeden Schlag.',
            en: '**Sing with fewer strokes:** sing the lyrics and strum only once per bar, on beat one. Then twice, then on every beat.',
            fr: '**Chanter avec peu de coups :** chante les paroles et gratte une seule fois par mesure, sur le un. Puis deux fois, puis sur chaque temps.',
          },
          {
            de: '**Wechselstellen merken:** Schau, auf welcher Silbe der Akkord wechselt. Oft ist das ein betontes Wort. Diese Silben sind deine Wegweiser.',
            en: '**Mark the changes:** notice on which syllable the chord changes. It’s often a stressed word. These syllables are your signposts.',
            fr: '**Repérer les changements :** regarde sur quelle syllabe l’accord change. C’est souvent un mot accentué. Ces syllabes sont tes panneaux indicateurs.',
          },
        ],
      },
      {
        tip: {
          de: 'Wenn beim Singen ein Wechsel nicht klappt: Weiterspielen und weitersingen, notfalls auf dem alten Akkord. Ein Lied, das durchläuft, klingt viel besser als eines, das stehen bleibt.',
          en: 'If a change doesn’t work while singing: keep playing and singing, on the old chord if necessary. A song that keeps going sounds much better than one that stops.',
          fr: 'Si un changement ne marche pas en chantant : continue à jouer et à chanter, au besoin sur l’ancien accord. Une chanson qui avance sonne bien mieux qu’une chanson qui s’arrête.',
        },
      },
      { h2: { de: 'Die richtige Tonart für deine Stimme', en: 'The right key for your voice', fr: 'La bonne tonalité pour ta voix' } },
      {
        p: {
          de: 'Ist ein Lied unangenehm hoch oder brummig tief, liegt es nicht an dir, sondern an der Tonart. Verschieb das Lied, bis du bequem singen kannst. Kinderstimmen liegen meist höher als Erwachsenenstimmen. In der App zeigt dir der ★-Vorschlag eine Tonart, die einfache Griffe und eine gute Stimmlage verbindet. Wie das Verschieben funktioniert, steht in [Transponieren](wissen:transponieren).',
          en: 'If a song is uncomfortably high or rumbly low, it’s not you – it’s the key. Move the song until you can sing comfortably. Children’s voices are usually higher than adults’. In the app, the ★ suggestion shows a key that combines easy grips with a good singing range. How changing keys works is explained in [Transposing](wissen:transponieren).',
          fr: 'Si une chanson est trop aiguë ou trop grave pour toi, ce n’est pas ta faute – c’est la tonalité. Décale la chanson jusqu’à chanter confortablement. Les voix d’enfants sont en général plus aiguës que celles des adultes. Dans l’appli, la suggestion ★ indique une tonalité qui allie accords faciles et bonne hauteur de voix. Pour changer de tonalité, lis [Transposer](wissen:transponieren).',
        },
      },
      { h2: { de: 'So hilft die App', en: 'How the app helps', fr: 'Comment l’appli t’aide' } },
      {
        p: {
          de: 'Im Liedplayer steht jeder Akkord genau über der Silbe, auf der er wechselt. Im Modus „Wartet auf mich“ hält die Begleitung an jedem Wechsel an, bis du so weit bist. Bei Liedern mit Melodie kannst du die Melodie mitspielen lassen und erst einmal mitsummen. Gut zum Anfangen: [Zum Geburtstag viel Glück](lied:geburtstag) und [Hänschen klein](lied:haenschen-klein).',
          en: 'In the song player every chord sits right above the syllable where it changes. In “Waits for me” mode the backing stops at each change until you’re ready. For songs with a melody you can have the tune played along and hum with it first. Good to start with: [Zum Geburtstag viel Glück](lied:geburtstag) and [Hänschen klein](lied:haenschen-klein).',
          fr: 'Dans le lecteur, chaque accord est placé juste au-dessus de la syllabe où il change. En mode « Attends-moi », l’accompagnement s’arrête à chaque changement jusqu’à ce que tu sois prêt. Pour les chansons avec mélodie, tu peux faire jouer la mélodie et fredonner d’abord. Pour commencer : [Zum Geburtstag viel Glück](lied:geburtstag) et [Hänschen klein](lied:haenschen-klein).',
        },
      },
      { tool: 'lieder' },
    ],
    related: ['akkordwechsel-schneller', 'transponieren', 'lieder-fuer-anfaenger', 'ukulele-ohne-singen', 'schlagmuster-lernen'],
    published: '2026-10-11',
  },
  {
    id: 'ukulele-ohne-singen',
    slug: { de: 'ukulele-spielen-ohne-singen', en: 'ukulele-without-singing', fr: 'ukulele-sans-chanter' },
    instruments: ['ukulele'],
    category: 'technik',
    title: {
      de: 'Ukulele ohne Singen: Melodien, Zupfen und Blues',
      en: 'Ukulele Without Singing: Melodies, Picking and Blues',
      fr: 'Le ukulélé sans chanter : mélodies, picking et blues',
    },
    description: {
      de: 'Du magst nicht singen? Die Ukulele klingt auch allein: Melodien nach Tabulatur, Zupfmuster, Akkord-Melodien, Blues-Solos und Begleitung für andere.',
      en: 'Don’t like singing? The ukulele sounds great on its own: melodies from tab, picking patterns, chord melodies, blues solos and backing other singers.',
      fr: 'Tu n’aimes pas chanter ? Le ukulélé sonne aussi tout seul : mélodies en tablature, arpèges, mélodies en accords, solos de blues et accompagnement.',
    },
    blocks: [
      {
        p: {
          de: 'Die Ukulele gilt als Instrument zum Mitsingen. Aber niemand muss singen, um Ukulele zu spielen. Manche mögen ihre Stimme nicht, andere sind schüchtern, und wieder andere finden einfach das Instrument spannender. Hier sind Ideen, wie die Ukulele ganz allein gut klingt.',
          en: 'The ukulele is known as a sing-along instrument. But nobody has to sing to play the ukulele. Some don’t like their voice, others are shy, and some simply find the instrument more exciting. Here are ideas for making the ukulele sound good all on its own.',
          fr: 'Le ukulélé est connu comme instrument pour chanter. Mais personne n’est obligé de chanter pour en jouer. Certains n’aiment pas leur voix, d’autres sont timides, et d’autres trouvent simplement l’instrument plus passionnant. Voici des idées pour que le ukulélé sonne bien tout seul.',
        },
      },
      { h2: { de: 'Melodien spielen', en: 'Playing melodies', fr: 'Jouer des mélodies' } },
      {
        p: {
          de: 'Statt die Melodie zu singen, spielst du sie Ton für Ton. Bei Liedern mit Melodie zeigt die App eine Tabulatur: Unter jeder Silbe stehen Saite und Bund. Probier [Alle meine Entchen](lied:alle-meine-entchen) oder [Ode an die Freude](lied:ode-an-die-freude). Wie Tabs funktionieren, steht in [Tabulatur lesen](wissen:tabulatur-lesen).',
          en: 'Instead of singing the melody, you play it note by note. For songs with a melody the app shows a tab: string and fret appear under every syllable. Try [Alle meine Entchen](lied:alle-meine-entchen) or [Ode an die Freude](lied:ode-an-die-freude). How tab works is explained in [Reading tab](wissen:tabulatur-lesen).',
          fr: 'Au lieu de chanter la mélodie, tu la joues note par note. Pour les chansons avec mélodie, l’appli affiche une tablature : la corde et la case sous chaque syllabe. Essaie [Alle meine Entchen](lied:alle-meine-entchen) ou [Ode an die Freude](lied:ode-an-die-freude). Pour comprendre les tablatures, lis [Lire une tablature](wissen:tabulatur-lesen).',
        },
      },
      { h2: { de: 'Zupfen statt Schlagen', en: 'Picking instead of strumming', fr: 'Pincer au lieu de gratter' } },
      {
        p: {
          de: 'Gezupfte Akkorde klingen wie eine kleine Harfe und brauchen keine Stimme obendrauf. Schon ein einfaches Muster über C, Am, F und G klingt wie ein ganzes Stück. Anleitungen findest du in [Ukulele zupfen](wissen:ukulele-zupfen).',
          en: 'Picked chords sound like a little harp and don’t need a voice on top. Even a simple pattern over C, Am, F and G sounds like a complete piece. You’ll find instructions in [Ukulele fingerpicking](wissen:ukulele-zupfen).',
          fr: 'Les accords pincés sonnent comme une petite harpe et n’ont pas besoin de voix. Même un motif simple sur C, Am, F et G sonne comme un vrai morceau. Les explications sont dans [Le picking au ukulélé](wissen:ukulele-zupfen).',
        },
      },
      { h2: { de: 'Akkord-Melodie: beides zugleich', en: 'Chord melody: both at once', fr: 'Mélodie en accords : les deux à la fois' } },
      {
        p: {
          de: 'Bei einer **Akkord-Melodie** liegt der Melodieton oben, meist auf der A-Saite, und darunter klingt der Akkord mit. Du schlägst also Akkorde an, aber so, dass man die Melodie heraushört. Fang mit einem langsamen Lied an, dessen Melodie du gut kennst, und such auf der A-Saite die Melodietöne. Zu jedem Ton nimmst du einen Akkord, der ihn enthält.',
          en: 'In a **chord melody** the melody note sits on top, usually on the A string, and the chord rings underneath. You strum chords, but in a way that lets the melody stand out. Start with a slow song you know well and find the melody notes on the A string. For each note, pick a chord that contains it.',
          fr: 'Dans une **mélodie en accords**, la note de la mélodie est en haut, souvent sur la corde de La, et l’accord sonne en dessous. Tu grattes des accords, mais de façon à entendre la mélodie. Commence par une chanson lente que tu connais bien et cherche les notes de la mélodie sur la corde de La. Pour chaque note, choisis un accord qui la contient.',
        },
      },
      { h2: { de: 'Blues: frei spielen', en: 'Blues: playing freely', fr: 'Le blues : jouer librement' } },
      {
        p: {
          de: 'Im Blues-Werkzeug spielt eine kleine Band, und du erfindest dazu eigene Töne. Die passenden Töne leuchten auf dem Hals – du kannst eigentlich nichts verkehrt machen. Wie der Blues aufgebaut ist, steht in [12-Takt-Blues lernen](wissen:zwoelf-takt-blues).',
          en: 'In the blues tool a little band plays and you make up your own notes on top. The notes that fit light up on the neck – you really can’t go astray. How the blues is built is explained in [Learning the 12-bar blues](wissen:zwoelf-takt-blues).',
          fr: 'Dans l’outil Blues, un petit groupe joue et tu inventes tes propres notes. Les notes qui vont bien s’allument sur le manche – impossible de te perdre. La structure du blues est expliquée dans [Le blues en 12 mesures](wissen:zwoelf-takt-blues).',
        },
      },
      { tool: 'blues' },
      { h2: { de: 'Andere singen, du spielst', en: 'Others sing, you play', fr: 'Les autres chantent, tu joues' } },
      {
        p: {
          de: 'In der Familie, mit Freunden oder in der Klasse singt fast immer jemand gern. Dann bist du die Band. Begleiten ist eine eigene Kunst: gleichmäßiger Rhythmus, pünktliche Wechsel und die richtige Lautstärke, damit man die Sänger gut hört.',
          en: 'In the family, with friends or in class there’s almost always someone who loves to sing. Then you’re the band. Accompanying is an art of its own: steady rhythm, changes on time and the right volume so the singers can be heard.',
          fr: 'En famille, entre amis ou en classe, il y a presque toujours quelqu’un qui aime chanter. Alors c’est toi, le groupe. Accompagner est un art en soi : un rythme régulier, des changements à l’heure et le bon volume pour qu’on entende bien les chanteurs.',
        },
      },
      {
        tip: {
          de: 'Und wenn du doch einmal mitsingen magst: Summen zählt auch. Wie es Schritt für Schritt geht, steht in [Singen und Spielen gleichzeitig](wissen:singen-und-spielen).',
          en: 'And if you ever do feel like joining in: humming counts too. How to do it step by step is explained in [Singing and playing at the same time](wissen:singen-und-spielen).',
          fr: 'Et si un jour tu as envie de chanter : fredonner, ça compte aussi. Tout est expliqué pas à pas dans [Chanter et jouer en même temps](wissen:singen-und-spielen).',
        },
      },
    ],
    related: ['ukulele-zupfen', 'tabulatur-lesen', 'singen-und-spielen', 'zwoelf-takt-blues'],
    published: '2026-10-11',
  },
  {
    id: 'ukulele-steckbrief',
    slug: { de: 'ukulele-steckbrief-referat', en: 'ukulele-fact-sheet-school-project', fr: 'ukulele-fiche-expose' },
    instruments: ['ukulele'],
    category: 'instrument',
    title: {
      de: 'Ukulele-Steckbrief für dein Referat: Herkunft, Name und Aufbau',
      en: 'Ukulele Fact Sheet for Your School Project: Origin, Name and Parts',
      fr: 'Fiche ukulélé pour ton exposé : origine, nom et fabrication',
    },
    description: {
      de: 'Steckbrief zur Ukulele für Schule und Referat: Woher sie kommt, was der Name bedeutet, wie sie aufgebaut und gestimmt ist – mit Tipps zum Vortrag.',
      en: 'A ukulele fact sheet for school: where it comes from, what the name means, how it’s built and tuned – plus tips for presenting it to your class.',
      fr: 'Une fiche sur le ukulélé pour l’école : son origine, le sens de son nom, sa fabrication et son accordage – avec des conseils pour ton exposé.',
    },
    blocks: [
      {
        p: {
          de: 'Du hältst ein Referat über die Ukulele oder brauchst einen Steckbrief für den Musikunterricht? Hier stehen die wichtigsten Fakten kurz und verständlich zusammen.',
          en: 'Giving a talk about the ukulele or need a fact sheet for music class? Here are the key facts, short and easy to understand.',
          fr: 'Tu fais un exposé sur le ukulélé ou tu as besoin d’une fiche pour le cours de musique ? Voici l’essentiel, court et facile à comprendre.',
        },
      },
      { h2: { de: 'Steckbrief', en: 'Fact sheet', fr: 'Fiche' } },
      {
        ul: [
          { de: '**Instrumentenart:** Saiteninstrument, genauer ein Zupfinstrument – verwandt mit der Gitarre', en: '**Type:** string instrument, more precisely a plucked instrument – related to the guitar', fr: '**Type :** instrument à cordes pincées – de la famille de la guitare' },
          { de: '**Herkunft:** Hawaii, Ende des 19. Jahrhunderts', en: '**Origin:** Hawaii, late 19th century', fr: '**Origine :** Hawaï, fin du XIXe siècle' },
          { de: '**Saiten:** 4, heute meist aus Nylon oder ähnlichem Kunststoff', en: '**Strings:** 4, today mostly nylon or a similar plastic', fr: '**Cordes :** 4, aujourd’hui surtout en nylon ou matière similaire' },
          { de: '**Stimmung:** G C E A – die G-Saite klingt höher als die C-Saite daneben', en: '**Tuning:** G C E A – the G string sounds higher than the C string next to it', fr: '**Accordage :** G C E A (Sol, Do, Mi, La) – la corde de Sol sonne plus aigu que celle de Do à côté' },
          { de: '**Größen:** Sopran (etwa 53 cm), Konzert (etwa 58 cm), Tenor (etwa 66 cm), Bariton (etwa 76 cm)', en: '**Sizes:** soprano (about 53 cm), concert (about 58 cm), tenor (about 66 cm), baritone (about 76 cm)', fr: '**Tailles :** soprano (environ 53 cm), concert (environ 58 cm), ténor (environ 66 cm), baryton (environ 76 cm)' },
          { de: '**Material:** Holz, bei Schul-Ukulelen oft Sperrholz, bei teureren Instrumenten massives Holz', en: '**Material:** wood – often plywood on school ukuleles, solid wood on more expensive ones', fr: '**Matériau :** bois – souvent contreplaqué pour les ukulélés d’école, bois massif pour les plus chers' },
          { de: '**Gespielt wird:** mit den Fingern – Akkorde anschlagen oder einzelne Töne zupfen', en: '**Played:** with the fingers – strumming chords or picking single notes', fr: '**Jeu :** avec les doigts – en grattant des accords ou en pinçant des notes' },
        ],
      },
      { h2: { de: 'Woher kommt die Ukulele?', en: 'Where does the ukulele come from?', fr: 'D’où vient le ukulélé ?' } },
      {
        p: {
          de: 'Die Ukulele entstand auf **Hawaii**. Im Jahr **1879** kamen mit dem Schiff „Ravenscrag“ Einwanderer von der portugiesischen Insel **Madeira** dort an. Sie brachten ein kleines, viersaitiges Instrument mit, die **Machete** (auch Braguinha genannt). Drei Instrumentenbauer unter ihnen – **Manuel Nunes**, **Augusto Dias** und **José do Espírito Santo** – bauten in Honolulu solche Instrumente und entwickelten daraus die Ukulele.',
          en: 'The ukulele was born in **Hawaii**. In **1879** immigrants from the Portuguese island of **Madeira** arrived there on the ship “Ravenscrag”. They brought a small four-string instrument called the **machete** (also known as braguinha). Three instrument makers among them – **Manuel Nunes**, **Augusto Dias** and **José do Espírito Santo** – built such instruments in Honolulu and developed the ukulele from them.',
          fr: 'Le ukulélé est né à **Hawaï**. En **1879**, des immigrés de l’île portugaise de **Madère** y arrivèrent à bord du navire « Ravenscrag ». Ils apportaient un petit instrument à quatre cordes, la **machete** (aussi appelée braguinha). Trois luthiers parmi eux – **Manuel Nunes**, **Augusto Dias** et **José do Espírito Santo** – fabriquèrent ces instruments à Honolulu et en tirèrent le ukulélé.',
        },
      },
      {
        p: {
          de: 'Der hawaiische König **David Kalākaua** mochte das neue Instrument und ließ es bei Festen am Hof spielen. So wurde es auf Hawaii schnell beliebt. Auf dem amerikanischen Festland wurde die Ukulele nach der Weltausstellung **1915 in San Francisco** bekannt, wo hawaiische Musiker auftraten.',
          en: 'The Hawaiian king **David Kalākaua** liked the new instrument and had it played at royal festivities. So it quickly became popular in Hawaii. On the American mainland the ukulele became known after the **1915 world’s fair in San Francisco**, where Hawaiian musicians performed.',
          fr: 'Le roi hawaïen **David Kalākaua** aimait ce nouvel instrument et le faisait jouer lors des fêtes à la cour. Il devint vite populaire à Hawaï. Sur le continent américain, le ukulélé se fit connaître après l’exposition universelle de **1915 à San Francisco**, où des musiciens hawaïens se produisirent.',
        },
      },
      { h2: { de: 'Was bedeutet der Name?', en: 'What does the name mean?', fr: 'Que veut dire son nom ?' } },
      {
        p: {
          de: 'Auf Hawaiisch schreibt man **ʻukulele** und spricht jede Silbe deutlich: „u-ku-le-le“. Die bekannteste Übersetzung ist „**hüpfender Floh**“ (ʻuku = Floh, lele = springen) – vielleicht, weil die Finger beim Spielen so flink über die Saiten hüpfen. Königin **Liliʻuokalani**, die letzte Königin von Hawaii, erklärte den Namen dagegen als „das Geschenk, das hierherkam“. Welche Erklärung stimmt, weiß man nicht sicher – im Referat kannst du beide nennen.',
          en: 'In Hawaiian it’s spelled **ʻukulele** and every syllable is pronounced clearly: “oo-koo-leh-leh”. The best-known translation is “**jumping flea**” (ʻuku = flea, lele = to jump) – maybe because the fingers hop so quickly over the strings. Queen **Liliʻuokalani**, the last queen of Hawaii, explained the name instead as “the gift that came here”. Nobody knows for sure which is right – in your talk you can mention both.',
          fr: 'En hawaïen, on écrit **ʻukulele** et on prononce chaque syllabe : « ou-kou-lé-lé ». La traduction la plus connue est « **puce qui saute** » (ʻuku = puce, lele = sauter) – peut-être parce que les doigts sautillent si vite sur les cordes. La reine **Liliʻuokalani**, dernière reine d’Hawaï, expliquait plutôt le nom par « le cadeau venu ici ». On ne sait pas avec certitude laquelle est juste – dans ton exposé, tu peux citer les deux.',
        },
      },
      { h2: { de: 'Aufbau', en: 'Parts of the ukulele', fr: 'Les parties du ukulélé' } },
      {
        ul: [
          { de: '**Kopf** mit den Wirbeln (Stimmmechaniken)', en: '**Headstock** with the tuning pegs', fr: '**Tête** avec les mécaniques (chevilles)' },
          { de: '**Sattel:** die kleine Leiste, über die die Saiten vom Kopf auf das Griffbrett laufen', en: '**Nut:** the small strip where the strings pass from the headstock onto the fretboard', fr: '**Sillet :** la petite barrette où les cordes passent de la tête à la touche' },
          { de: '**Hals** mit **Griffbrett** und **Bundstäbchen** – zwischen zwei Stäbchen liegt ein Bund', en: '**Neck** with the **fretboard** and **frets** – the space between two frets is one fret position', fr: '**Manche** avec la **touche** et les **frettes** – l’espace entre deux frettes est une case' },
          { de: '**Korpus** mit **Decke**, **Schallloch**, **Boden** und **Zargen** (Seitenwände)', en: '**Body** with **top**, **sound hole**, **back** and **sides**', fr: '**Caisse** avec la **table**, la **rosace** (trou), le **fond** et les **éclisses**' },
          { de: '**Steg:** hier sind die Saiten unten befestigt', en: '**Bridge:** where the strings are fixed at the bottom', fr: '**Chevalet :** c’est là que les cordes sont fixées en bas' },
        ],
      },
      { h2: { de: 'Tipps für den Vortrag', en: 'Tips for your presentation', fr: 'Conseils pour ton exposé' } },
      {
        ul: [
          {
            de: 'Bring eine Ukulele mit und spiel ein kurzes Lied vor, zum Beispiel [Das Saiten-Lied G-C-E-A](lied:gcea) – so hören alle gleich die vier Saiten.',
            en: 'Bring a ukulele and play a short song, such as [the string song G-C-E-A](lied:gcea) – everyone hears the four strings right away.',
            fr: 'Apporte un ukulélé et joue une courte chanson, par exemple [la chanson des cordes G-C-E-A](lied:gcea) – tout le monde entend tout de suite les quatre cordes.',
          },
          {
            de: 'Lass die Klasse den Unterschied zwischen Dur und Moll hören: erst C, dann Am.',
            en: 'Let the class hear the difference between major and minor: first C, then Am.',
            fr: 'Fais entendre à la classe la différence entre majeur et mineur : d’abord C, puis Am.',
          },
          {
            de: 'Gib an, woher du deine Informationen hast – zum Beispiel ein Lexikon oder ein Buch aus der Bücherei.',
            en: 'Say where your information comes from – for example an encyclopaedia or a library book.',
            fr: 'Indique d’où viennent tes informations – par exemple une encyclopédie ou un livre de la bibliothèque.',
          },
        ],
      },
      { chord: 'C' },
      { chord: 'Am' },
      { tool: 'lieder' },
    ],
    related: ['ukulele-groessen', 'ukulele-saiten', 'ukulele-kinder', 'ukulele-d-stimmung-tiefes-g'],
    published: '2026-10-11',
  },
  {
    id: 'schlagmuster-heraushoeren',
    slug: { de: 'schlagmuster-heraushoeren', en: 'figure-out-strumming-pattern-by-ear', fr: 'trouver-rythmique-a-l-oreille' },
    instruments: ['ukulele', 'gitarre', 'bariton'],
    category: 'rhythmus',
    title: {
      de: 'Schlagmuster zum Lied finden und heraushören – so geht’s',
      en: 'How to Find a Strumming Pattern for a Song by Ear',
      fr: 'Trouver la rythmique d’une chanson à l’oreille',
    },
    description: {
      de: 'Kein Schlagmuster angegeben? So hörst du es selbst heraus: Puls finden, Takt zählen, Betonungen hören, mit einem Grundmuster starten und es ans Lied anpassen.',
      en: 'No strumming pattern given? Here’s how to work it out yourself: find the pulse, count the bar, hear the accents, start with a basic pattern and adapt it.',
      fr: 'Pas de rythmique indiquée ? Trouve-la toi-même : repère la pulsation, compte la mesure, écoute les accents, pars d’un motif de base et adapte-le.',
    },
    blocks: [
      {
        p: {
          de: 'Auf vielen Liedblättern stehen nur Akkorde und Text – aber wie schlägt man dazu an? Die gute Nachricht: Du musst das Muster aus einer Aufnahme nicht genau kopieren. Es reicht ein Muster, das **zum Lied passt**. Mit diesen Schritten findest du es.',
          en: 'Many song sheets show only chords and lyrics – but how should you strum? The good news: you don’t have to copy the pattern from a recording exactly. A pattern that **fits the song** is enough. These steps help you find one.',
          fr: 'Beaucoup de grilles n’indiquent que les accords et les paroles – mais comment gratter ? La bonne nouvelle : pas besoin de copier exactement la rythmique d’un enregistrement. Il suffit d’un motif qui **va avec la chanson**. Ces étapes t’aident à le trouver.',
        },
      },
      { h2: { de: 'Schritt für Schritt', en: 'Step by step', fr: 'Pas à pas' } },
      {
        ol: [
          {
            de: '**Den Puls finden:** Hör das Lied und klopf mit dem Fuß oder klatsch mit. Das ist der Grundschlag. Im Rhythmus-Werkzeug kannst du mehrmals im Takt auf „Tippen“ drücken – dann zeigt es dir das Tempo.',
            en: '**Find the pulse:** listen to the song and tap your foot or clap along. That’s the beat. In the rhythm tool you can press “Tap” several times in time – it then shows you the tempo.',
            fr: '**Trouver la pulsation :** écoute la chanson et tape du pied ou frappe dans les mains. C’est le temps. Dans l’outil Rythme, tu peux appuyer plusieurs fois sur « Taper » en rythme – il t’indique alors le tempo.',
          },
          {
            de: '**Den Takt zählen:** Zähl „1, 2, 3, 4“ mit. Passt es, ist es ein Vierertakt. Fühlt es sich an wie „1, 2, 3 – 1, 2, 3“, ist es ein Walzer im Dreiertakt. Die Eins ist meist dort, wo der Akkord wechselt. Mehr in [Takt und Taktarten](wissen:takt-und-taktarten).',
            en: '**Count the bar:** count “1, 2, 3, 4” along. If it fits, it’s four beats to the bar. If it feels like “1, 2, 3 – 1, 2, 3”, it’s a waltz in three. Beat one is usually where the chord changes. More in [Time signatures](wissen:takt-und-taktarten).',
            fr: '**Compter la mesure :** compte « 1, 2, 3, 4 ». Si ça colle, c’est une mesure à quatre temps. Si ça fait « 1, 2, 3 – 1, 2, 3 », c’est une valse à trois temps. Le un est en général là où l’accord change. Plus d’infos dans [La mesure](wissen:takt-und-taktarten).',
          },
          {
            de: '**Betonungen hören:** Gibt es ein Schlagzeug, hörst du oft eine tiefe Trommel auf 1 und 3 und einen hellen Knall auf 2 und 4. Betone mit deinem Anschlag dieselben Schläge.',
            en: '**Hear the accents:** if there are drums, you often hear a deep drum on 1 and 3 and a sharp crack on 2 and 4. Accent the same beats with your strumming.',
            fr: '**Écouter les accents :** s’il y a une batterie, tu entends souvent un tambour grave sur 1 et 3 et un claquement sec sur 2 et 4. Accentue les mêmes temps en grattant.',
          },
          {
            de: '**Viertel oder Achtel?** Hör auf die Begleitung: Kommt pro Schlag ein Anschlag oder zwei („1 und 2 und“)? Ruhige Lieder kommen oft mit Vierteln aus, flotte brauchen Achtel.',
            en: '**Quarters or eighths?** Listen to the backing: is there one stroke per beat or two (“1 and 2 and”)? Calm songs often work with quarters, lively ones need eighths.',
            fr: '**Noires ou croches ?** Écoute l’accompagnement : un coup par temps ou deux (« 1 et 2 et ») ? Les chansons calmes se contentent souvent de noires, les plus vives demandent des croches.',
          },
          {
            de: '**Mit einem Grundmuster starten:** Nimm ein Muster aus [Schlagmuster lernen](wissen:schlagmuster-lernen) und spiel leise zur Aufnahme mit. Lass dann einzelne Schläge weg, bis es sich richtig anfühlt – die Hand schwingt dabei immer weiter.',
            en: '**Start with a basic pattern:** take a pattern from [Learning strumming patterns](wissen:schlagmuster-lernen) and play softly along with the recording. Then leave out single strokes until it feels right – your hand keeps swinging all the time.',
            fr: '**Partir d’un motif de base :** prends un motif de [Apprendre les rythmiques](wissen:schlagmuster-lernen) et joue doucement avec l’enregistrement. Puis enlève des coups jusqu’à ce que ça sonne juste – ta main continue toujours de balancer.',
          },
        ],
      },
      { tool: 'rhythmus' },
      {
        tip: {
          de: 'Lieber ein einfaches Muster, das gleichmäßig läuft, als ein kompliziertes, das wackelt. Viele Profis spielen erstaunlich einfache Muster – dafür absolut im Takt.',
          en: 'Better a simple pattern that runs evenly than a complicated one that wobbles. Many professionals play surprisingly simple patterns – but perfectly in time.',
          fr: 'Mieux vaut un motif simple et régulier qu’un motif compliqué qui vacille. Beaucoup de pros jouent des motifs étonnamment simples – mais parfaitement en rythme.',
        },
      },
      { h2: { de: 'Lieder ohne Aufnahme', en: 'Songs without a recording', fr: 'Chansons sans enregistrement' } },
      {
        p: {
          de: 'Bei Volks- und Kinderliedern gibt es oft keine Aufnahme mit Begleitung. Dann sing oder sprich den Text und achte, welche Silben betont sind – dort liegen die starken Schläge. Ein Lied im Dreiertakt wie [Kein schöner Land](lied:kein-schoener-land) begleitest du mit „Ab – ab auf – ab auf“, also ein Schlag auf der Eins und zwei Hin-und-her-Bewegungen auf 2 und 3.',
          en: 'Folk and children’s songs often have no recording with accompaniment. Then sing or speak the lyrics and notice which syllables are stressed – that’s where the strong beats are. A song in three like [Kein schöner Land](lied:kein-schoener-land) can be accompanied with “down – down up – down up”: one stroke on beat one and two back-and-forth movements on 2 and 3.',
          fr: 'Pour les chansons populaires et enfantines, il n’y a souvent pas d’enregistrement avec accompagnement. Chante ou dis alors les paroles et repère les syllabes accentuées – c’est là que tombent les temps forts. Une chanson à trois temps comme [Kein schöner Land](lied:kein-schoener-land) s’accompagne avec « bas – bas haut – bas haut » : un coup sur le un et deux allers-retours sur 2 et 3.',
        },
      },
      {
        p: {
          de: 'Im Liedplayer der App läuft die Begleitung mit, sodass du hörst, wo die Schläge liegen. Spiel einfach mit und probier verschiedene Muster aus.',
          en: 'In the app’s song player the backing plays along, so you can hear where the beats are. Just play along and try out different patterns.',
          fr: 'Dans le lecteur de l’appli, l’accompagnement joue avec toi, tu entends donc où tombent les temps. Joue simplement avec et essaie différents motifs.',
        },
      },
      { tool: 'lieder' },
    ],
    related: ['schlagmuster-lernen', 'takt-und-taktarten', 'mit-metronom-ueben', 'singen-und-spielen'],
    published: '2026-10-11',
  },
  {
    id: 'gitarre-und-ukulele-zusammen',
    slug: { de: 'gitarre-und-ukulele-zusammen-spielen', en: 'guitar-and-ukulele-together', fr: 'guitare-et-ukulele-ensemble' },
    instruments: ['ukulele', 'gitarre', 'bariton'],
    category: 'akkorde',
    title: {
      de: 'Gitarre und Ukulele zusammen spielen – Akkorde, Kapo 5 und Klang',
      en: 'Playing Guitar and Ukulele Together – Chords, Capo 5 and Sound',
      fr: 'Jouer guitare et ukulélé ensemble – accords, capo 5 et son',
    },
    description: {
      de: 'Eltern mit Gitarre, Kind mit Ukulele: Gleiche Akkordnamen passen zusammen. Was bei Kapo-Angaben gilt und warum Gitarre mit Kapo 5 wie eine Ukulele gestimmt ist.',
      en: 'Parent on guitar, child on ukulele: the same chord names fit together. What to do with capo instructions and why a guitar with capo 5 is tuned like a ukulele.',
      fr: 'Parent à la guitare, enfant au ukulélé : les mêmes noms d’accords vont ensemble. Que faire avec un capo, et pourquoi une guitare avec capo 5 sonne comme un ukulélé.',
    },
    blocks: [
      {
        p: {
          de: 'Ein Elternteil spielt Gitarre, das Kind Ukulele – oder in der Klasse mischen sich die Instrumente. Passt das zusammen? Ja, ganz einfach: **Alle spielen die Akkordnamen, die auf dem Blatt stehen**, jeder mit seinem eigenen Griff. Ein C ist auf Gitarre, Ukulele und Bariton-Ukulele ein C, auch wenn die Finger ganz anders liegen.',
          en: 'A parent plays guitar, the child plays ukulele – or the instruments are mixed in class. Does that work? Yes, quite simply: **everyone plays the chord names on the sheet**, each with their own grip. A C is a C on guitar, ukulele and baritone ukulele, even though the fingers sit in completely different places.',
          fr: 'Un parent joue de la guitare, l’enfant du ukulélé – ou les instruments se mélangent en classe. Ça marche ensemble ? Oui, tout simplement : **chacun joue les noms d’accords de la grille**, avec son propre doigté. Un C est un C à la guitare, au ukulélé et au ukulélé baryton, même si les doigts sont placés tout autrement.',
        },
      },
      { chord: 'C' },
      { h2: { de: 'Wenn einer einen Kapo benutzt', en: 'When someone uses a capo', fr: 'Quand quelqu’un utilise un capo' } },
      {
        p: {
          de: 'Setzt die Gitarre einen Kapodaster, klingen ihre Griffe höher. Die Regel: **Klingender Akkord = Griffname + Anzahl der Kapo-Bünde in Halbtönen.** Greift die Gitarre mit Kapo 2 ein G, klingt ein A – die Ukulele spielt dann also A. Oder die Ukulele setzt ebenfalls einen Kapo in den 2. Bund und greift wie die Gitarre G. Beides klingt zusammen.',
          en: 'If the guitar uses a capo, its shapes sound higher. The rule: **sounding chord = shape name + number of capo frets in semitones.** If the guitar plays a G shape with capo 2, an A sounds – so the ukulele plays A. Or the ukulele also puts a capo at the 2nd fret and plays G like the guitar. Both sound right together.',
          fr: 'Si la guitare met un capodastre, ses formes sonnent plus haut. La règle : **accord réel = nom de la forme + nombre de cases du capo en demi-tons.** Si la guitare fait un G avec capo 2, on entend un A – le ukulélé joue donc A. Ou bien le ukulélé met lui aussi un capo à la 2e case et fait G comme la guitare. Les deux vont ensemble.',
        },
      },
      { h2: { de: 'Gitarre mit Kapo 5 = Ukulele', en: 'Guitar with capo 5 = ukulele', fr: 'Guitare avec capo 5 = ukulélé' } },
      {
        p: {
          de: 'Ein schöner Trick: Setzt die Gitarre einen Kapo in den **5. Bund**, sind ihre vier hohen Saiten genau wie eine Ukulele gestimmt – G, C, E, A. Nur das G liegt eine Oktave tiefer, wie bei einer Ukulele mit tiefem G. Dann kann die Gitarre auf diesen vier Saiten **dieselben Griffbilder** wie die Ukulele greifen, und beide spielen buchstäblich denselben Akkord. Praktisch, wenn Eltern beim Kind mitlernen wollen.',
          en: 'A neat trick: if the guitar puts a capo at the **5th fret**, its four high strings are tuned exactly like a ukulele – G, C, E, A. Only the G is an octave lower, as on a low-G ukulele. The guitar can then play **the same chord shapes** as the ukulele on those four strings, and both play literally the same chord. Handy when parents want to learn alongside their child.',
          fr: 'Une astuce sympa : si la guitare met un capo à la **5e case**, ses quatre cordes aiguës sont accordées exactement comme un ukulélé – G, C, E, A. Seul le Sol est une octave plus bas, comme sur un ukulélé avec Sol grave. La guitare peut alors jouer sur ces quatre cordes **les mêmes diagrammes** que le ukulélé, et les deux jouent vraiment le même accord. Pratique quand les parents veulent apprendre avec leur enfant.',
        },
      },
      {
        p: {
          de: 'Ohne Kapo entsprechen die vier hohen Gitarrensaiten (D, G, B, E) genau der **Bariton-Ukulele**. Bariton und Gitarre haben also dieselben Griffbilder mit denselben Namen. Eine Ukulele-Form klingt auf Gitarre und Bariton dagegen fünf Halbtöne tiefer: Der Ukulele-C-Griff ist dort ein G.',
          en: 'Without a capo, the four high guitar strings (D, G, B, E) match the **baritone ukulele** exactly. So baritone and guitar share the same chord shapes with the same names. A ukulele shape, on the other hand, sounds five semitones lower on guitar and baritone: the ukulele C shape is a G there.',
          fr: 'Sans capo, les quatre cordes aiguës de la guitare (D, G, B, E) correspondent exactement au **ukulélé baryton**. Baryton et guitare ont donc les mêmes diagrammes avec les mêmes noms. Une forme de ukulélé sonne en revanche cinq demi-tons plus bas sur la guitare et le baryton : la forme de C du ukulélé y donne un G.',
        },
      },
      { h2: { de: 'Damit es gut klingt', en: 'Making it sound good', fr: 'Pour que ça sonne bien' } },
      {
        ul: [
          {
            de: '**Gemeinsam stimmen:** Stimmt beide Instrumente mit demselben Stimmgerät, direkt vor dem Spielen.',
            en: '**Tune together:** tune both instruments with the same tuner, right before playing.',
            fr: '**Accordez-vous ensemble :** accordez les deux instruments avec le même accordeur, juste avant de jouer.',
          },
          {
            de: '**Rollen verteilen:** Die Gitarre klingt voller und tiefer, die Ukulele hell. Schön ist es, wenn die Gitarre ruhig zupft oder nur auf 1 und 3 anschlägt und die Ukulele den Rhythmus macht – oder umgekehrt.',
            en: '**Share the roles:** the guitar sounds fuller and deeper, the ukulele bright. It sounds lovely when the guitar picks gently or strums only on 1 and 3 while the ukulele keeps the rhythm – or the other way round.',
            fr: '**Répartissez les rôles :** la guitare sonne plus pleine et plus grave, le ukulélé plus clair. C’est joli quand la guitare arpège doucement ou ne gratte que sur 1 et 3 pendant que le ukulélé fait le rythme – ou l’inverse.',
          },
          {
            de: '**Lautstärke:** Eine Gitarre ist deutlich lauter. Wer Gitarre spielt, darf ruhig sanfter anschlagen, damit die Ukulele zu hören ist.',
            en: '**Volume:** a guitar is much louder. The guitarist can strum more gently so the ukulele can be heard.',
            fr: '**Volume :** une guitare est bien plus forte. Le guitariste peut gratter plus doucement pour qu’on entende le ukulélé.',
          },
          {
            de: '**Gleiche Tonart wählen:** Im Liedplayer der App verschiebst du die Tonart auf jedem Gerät gleich, dann passen die angezeigten Akkorde zusammen.',
            en: '**Pick the same key:** in the app’s song player, set the same key on each device so the chords shown match.',
            fr: '**Choisissez la même tonalité :** dans le lecteur de l’appli, réglez la même tonalité sur chaque appareil pour que les accords affichés correspondent.',
          },
        ],
      },
      {
        tip: {
          de: 'Ihr spielt gemeinsam und ein Akkord ist für einen von euch zu schwer? Dann verschiebt das ganze Lied mit [Transponieren](wissen:transponieren) in eine Tonart, die für beide leicht ist – C, G und Am gehen auf allen drei Instrumenten gut.',
          en: 'Playing together and one chord is too hard for one of you? Then move the whole song with [Transposing](wissen:transponieren) to a key that’s easy for both – C, G and Am work well on all three instruments.',
          fr: 'Vous jouez ensemble et un accord est trop dur pour l’un de vous ? Décalez toute la chanson avec [Transposer](wissen:transponieren) dans une tonalité facile pour les deux – C, G et Am vont bien sur les trois instruments.',
        },
      },
      { tool: 'lieder' },
    ],
    related: ['ukulele-gitarrenakkorde-uebertragen', 'gitarre-kapodaster', 'bariton-oder-sopran', 'transponieren', 'ukulele-kapodaster'],
    published: '2026-10-11',
  },
];
