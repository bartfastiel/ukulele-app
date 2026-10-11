import type { Article, InstrumentId } from './types.ts';

/** Begleitungen zum Mitspielen (Rock, Pop, Shuffle, Country) – je Stil ein kurzer Artikel, auf allen Instrument-Seiten. */
const ALL: InstrumentId[] = ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline', 'bass'];
const PUBLISHED = '2026-10-11';

export const BEGLEITUNG_ARTICLES: Article[] = [
  {
    id: 'groove-rock-begleitung',
    slug: { de: 'rock-begleitung-mitspielen', en: 'rock-backing-track-play-along', fr: 'accompagnement-rock-jouer' },
    instruments: ALL,
    category: 'rhythmus',
    title: {
      de: 'Rock spielen: drei Akkorde, gerade Achtel und ein Bass wie ein Motor',
      en: 'Playing Rock: Three Chords, Straight Eighths and a Bass Like an Engine',
      fr: 'Jouer du rock : trois accords, des croches droites et une basse comme un moteur',
    },
    description: {
      de: 'So klingt Rock: die Akkorde I, IV und V, gerade Achtel, Schlagzeug mit Betonung auf 2 und 4 und ein Bass, der achtmal pro Takt den Grundton spielt.',
      en: 'What makes rock sound like rock: chords I, IV and V, straight eighth notes, drums stressing 2 and 4 and a bass that plays the root eight times a bar.',
      fr: 'Ce qui fait le rock : les accords I, IV et V, des croches droites, une batterie qui marque 2 et 4 et une basse qui joue huit fois la fondamentale.',
    },
    blocks: [
      {
        p: {
          de: 'Viele Rocksongs kommen mit nur drei Akkorden aus: dem Akkord der Tonart (Stufe I), dem auf der vierten Stufe (IV) und dem auf der fünften (V). In C sind das **C**, **F** und **G**, in G sind es **G**, **C** und **D**, in E sind es **E**, **A** und **B**.',
          en: 'Lots of rock songs need only three chords: the chord of the key (step I), the one on the fourth step (IV) and the one on the fifth (V). In C that’s **C**, **F** and **G**, in G it’s **G**, **C** and **D**, in E it’s **E**, **A** and **B**.',
          fr: 'Beaucoup de chansons rock n’ont besoin que de trois accords : l’accord de la tonalité (degré I), celui du quatrième degré (IV) et celui du cinquième (V). En Do, ce sont **C**, **F** et **G**, en Sol **G**, **C** et **D**, en Mi **E**, **A** et **B**.',
        },
      },
      { chord: 'C' },
      { chord: 'F' },
      { chord: 'G' },
      { h2: { de: 'Gerade Achtel', en: 'Straight eighths', fr: 'Des croches droites' } },
      {
        p: {
          de: 'Rock läuft in **geraden Achteln**: Zwischen zwei Schlägen liegt genau in der Mitte noch ein Ton – „eins und zwei und drei und vier und“. Das Schlagzeug spielt die Bassdrum auf eins und drei, die Snare auf zwei und vier. Diese Betonung auf zwei und vier heißt **Backbeat**.',
          en: 'Rock runs in **straight eighth notes**: exactly halfway between two beats there’s another note – “one and two and three and four and”. The drums play the bass drum on one and three and the snare on two and four. That accent on two and four is called the **backbeat**.',
          fr: 'Le rock avance en **croches droites** : pile au milieu entre deux temps, il y a encore une note – « un et deux et trois et quatre et ». La batterie joue la grosse caisse sur un et trois, la caisse claire sur deux et quatre. Cet accent sur deux et quatre s’appelle le **backbeat**.',
        },
      },
      {
        ul: [
          {
            de: '**Akkorde:** Schlag alle Achtel nach unten, kurz und kräftig. Wenn das zu schnell ist, erst nur auf jeden Schlag.',
            en: '**Chords:** strum every eighth note downwards, short and strong. If that’s too fast, start with just one strum per beat.',
            fr: '**Accords :** gratte toutes les croches vers le bas, courtes et fortes. Si c’est trop rapide, commence par un seul coup par temps.',
          },
          {
            de: '**Bass:** Spiel achtmal pro Takt den Grundton, gleichmäßig wie ein Motor. Am Anfang reicht der Grundton auf jedem Schlag. Zupf abwechselnd mit Zeige- und Mittelfinger.',
            en: '**Bass:** play the root note eight times per bar, steady like an engine. To begin with, the root on every beat is enough. Pluck with your index and middle finger in turn.',
            fr: '**Basse :** joue huit fois la fondamentale par mesure, régulière comme un moteur. Au début, la fondamentale sur chaque temps suffit. Pince en alternant index et majeur.',
          },
        ],
      },
      {
        tip: {
          de: 'Ein Powerchord besteht nur aus Grundton und Quinte. Er ist weder Dur noch Moll und passt deshalb fast überall im Rock.',
          en: 'A power chord is just the root and the fifth. It’s neither major nor minor, so it fits almost anywhere in rock.',
          fr: 'Un power chord n’a que la fondamentale et la quinte. Il n’est ni majeur ni mineur, et il va donc presque partout dans le rock.',
        },
      },
      {
        p: {
          de: 'Die Rock-Begleitung der App spielt I–IV–V–IV, je zwei Takte. Du wählst Tempo und Tonart – der Stern zeigt die Tonart, in der es auf deinem Instrument am leichtesten ist.',
          en: 'The app’s rock backing track plays I–IV–V–IV, two bars each. You choose the tempo and key – the star shows the key that’s easiest on your instrument.',
          fr: 'L’accompagnement rock de l’application joue I–IV–V–IV, deux mesures chacun. Tu choisis le tempo et la tonalité – l’étoile montre la tonalité la plus facile sur ton instrument.',
        },
      },
      { tool: 'begleitung/rock' },
    ],
    related: ['groove-pop-begleitung', 'groove-shuffle-begleitung', 'groove-country-begleitung', 'takt-und-taktarten'],
    published: PUBLISHED,
  },
  {
    id: 'groove-pop-begleitung',
    slug: { de: 'pop-begleitung-vier-akkorde', en: 'pop-backing-track-four-chords', fr: 'accompagnement-pop-quatre-accords' },
    instruments: ALL,
    category: 'rhythmus',
    title: {
      de: 'Pop spielen: die vier Akkorde, die in so vielen Liedern stecken',
      en: 'Playing Pop: the Four Chords Behind So Many Songs',
      fr: 'Jouer de la pop : les quatre accords cachés dans tant de chansons',
    },
    description: {
      de: 'I–V–vi–IV: Mit vier Akkorden wie C, G, Am und F begleitest du sehr viele Popsongs. Dazu ein ruhiger Beat und ein Bass auf eins und drei.',
      en: 'I–V–vi–IV: with four chords like C, G, Am and F you can accompany a huge number of pop songs. Add a calm beat and a bass on one and three.',
      fr: 'I–V–vi–IV : avec quatre accords comme C, G, Am et F, tu accompagnes énormément de chansons pop. Avec un rythme calme et une basse sur un et trois.',
    },
    blocks: [
      {
        p: {
          de: 'In sehr vielen Popsongs kehren dieselben vier Akkorde immer wieder: **I – V – vi – IV**. In C heißt das **C – G – Am – F**, in G **G – D – Em – C**. Der dritte Akkord ist Moll – er bringt ein bisschen Sehnsucht in den Klang.',
          en: 'In a great many pop songs the same four chords come round again and again: **I – V – vi – IV**. In C that’s **C – G – Am – F**, in G **G – D – Em – C**. The third chord is minor – it adds a touch of longing to the sound.',
          fr: 'Dans énormément de chansons pop, les quatre mêmes accords reviennent sans cesse : **I – V – vi – IV**. En Do, cela donne **C – G – Am – F**, en Sol **G – D – Em – C**. Le troisième accord est mineur – il ajoute un peu de nostalgie au son.',
        },
      },
      { chord: 'C' },
      { chord: 'G' },
      { chord: 'Am' },
      { chord: 'F' },
      { h2: { de: 'Ein ruhiger Beat', en: 'A calm beat', fr: 'Un rythme calme' } },
      {
        ul: [
          {
            de: '**Akkorde:** Das Schlagmuster „runter, runter, rauf, rauf, runter, rauf“ passt fast immer. Zwischen den beiden „rauf“ schwingt die Hand nach unten, ohne die Saiten zu treffen.',
            en: '**Chords:** the strumming pattern “down, down, up, up, down, up” fits almost every time. Between the two “ups” your hand swings down without touching the strings.',
            fr: '**Accords :** le rythme « bas, bas, haut, haut, bas, haut » va presque toujours. Entre les deux « haut », la main redescend sans toucher les cordes.',
          },
          {
            de: '**Bass:** Spiel den Grundton auf eins und drei und lass ihn klingen. Später spielst du ihn auch kurz vor drei und auf vier einen **Zwischenton**, der zum nächsten Akkord führt – in C etwa das B vor dem C.',
            en: '**Bass:** play the root on one and three and let it ring. Later also play it just before three, and on four an **in-between note** that leads to the next chord – in C for example the B before the C.',
            fr: '**Basse :** joue la fondamentale sur un et trois et laisse-la sonner. Plus tard, joue-la aussi juste avant trois, et sur quatre une **note de liaison** qui mène à l’accord suivant – en Do par exemple le Si avant le Do.',
          },
        ],
      },
      {
        tip: {
          de: 'Pop klingt am besten etwas leiser und gleichmäßig. Lieber langsam und ruhig als schnell und hektisch.',
          en: 'Pop sounds best a little quieter and very even. Better slow and calm than fast and rushed.',
          fr: 'La pop sonne mieux un peu plus doucement et bien régulière. Mieux vaut lent et calme que rapide et précipité.',
        },
      },
      {
        p: {
          de: 'Probier es mit der Pop-Begleitung der App: Sie spielt die vier Akkorde im Kreis, du wählst Tempo und Tonart.',
          en: 'Try it with the app’s pop backing track: it plays the four chords round and round, you choose the tempo and key.',
          fr: 'Essaie avec l’accompagnement pop de l’application : il joue les quatre accords en boucle, tu choisis le tempo et la tonalité.',
        },
      },
      { tool: 'begleitung/pop' },
    ],
    related: ['groove-rock-begleitung', 'groove-country-begleitung', 'groove-shuffle-begleitung'],
    published: PUBLISHED,
  },
  {
    id: 'groove-shuffle-begleitung',
    slug: { de: 'shuffle-rhythmus-boogie', en: 'shuffle-rhythm-boogie', fr: 'rythme-shuffle-boogie' },
    instruments: ALL,
    category: 'rhythmus',
    title: {
      de: 'Shuffle: Achtel, die lang-kurz schwingen, und das Boogie-Riff',
      en: 'Shuffle: Eighth Notes That Swing Long-Short, and the Boogie Riff',
      fr: 'Le shuffle : des croches qui balancent long-court, et le riff boogie',
    },
    description: {
      de: 'Beim Shuffle schwingen die Achtel lang-kurz. Dazu das Boogie-Riff 1-3-5-6-b7-6-5-3 – wie im Blues, nur heller: mit Dur-Akkorden, als Rock’n’Roll.',
      en: 'In a shuffle the eighth notes swing long-short. Add the boogie riff 1-3-5-6-b7-6-5-3 – like the blues, just brighter: with major chords, as rock ’n’ roll.',
      fr: 'Dans le shuffle, les croches balancent long-court. Avec le riff boogie 1-3-5-6-b7-6-5-3 – comme le blues, en plus lumineux : accords majeurs, façon rock’n’roll.',
    },
    blocks: [
      {
        p: {
          de: 'Beim Shuffle teilt man jeden Schlag nicht in zwei gleiche Hälften, sondern in drei Teile: Der erste Ton dauert zwei Drittel, der zweite ein Drittel. So entsteht das typische **lang-kurz, lang-kurz** – wie beim Hüpfen.',
          en: 'In a shuffle each beat isn’t split into two equal halves but into three parts: the first note lasts two thirds, the second one third. That gives the typical **long-short, long-short** – like skipping.',
          fr: 'Dans le shuffle, on ne coupe pas chaque temps en deux moitiés égales mais en trois parties : la première note dure deux tiers, la seconde un tiers. Cela donne le **long-court, long-court** typique – comme quand tu sautilles.',
        },
      },
      { h2: { de: 'Das Boogie-Riff', en: 'The boogie riff', fr: 'Le riff boogie' } },
      {
        p: {
          de: 'Der Bass spielt dazu das **Boogie-Riff**: Grundton, Terz, Quinte, Sexte, kleine Septime – und über Sexte, Quinte, Terz zurück (1-3-5-6-b7-6-5-3). In C sind das C, E, G, A, Bb, A, G, E. In E sind es E, G#, B, C#, D, C#, B, G#.',
          en: 'The bass plays the **boogie riff**: root, third, fifth, sixth, flat seventh – and back via sixth, fifth, third (1-3-5-6-b7-6-5-3). In C that’s C, E, G, A, Bb, A, G, E. In E it’s E, G#, B, C#, D, C#, B, G#.',
          fr: 'La basse joue le **riff boogie** : fondamentale, tierce, quinte, sixte, septième mineure – puis retour par sixte, quinte, tierce (1-3-5-6-b7-6-5-3). En Do : Do, Mi, Sol, La, Sib, La, Sol, Mi. En Mi : Mi, Sol#, Si, Do#, Ré, Do#, Si, Sol#.',
        },
      },
      {
        ul: [
          {
            de: '**Akkorde:** runter-rauf in Achteln, aber schwingend – das Runter lang, das Rauf kurz.',
            en: '**Chords:** down-up in eighth notes, but swinging – the down long, the up short.',
            fr: '**Accords :** bas-haut en croches, mais en balançant – le bas long, le haut court.',
          },
          {
            de: '**Bass:** zuerst auf jeden Schlag den Grundton, dann das Riff in Vierteln (1-3-5-6), dann das ganze Boogie-Riff. Nimm einen Finger pro Bund.',
            en: '**Bass:** first the root on every beat, then the riff in quarter notes (1-3-5-6), then the whole boogie riff. Use one finger per fret.',
            fr: '**Basse :** d’abord la fondamentale sur chaque temps, puis le riff en noires (1-3-5-6), puis tout le riff boogie. Mets un doigt par case.',
          },
        ],
      },
      {
        tip: {
          de: 'Der Shuffle ist ein naher Verwandter des Blues. Wenn er dir gefällt, probier auch den [12-Takt-Blues](wissen:zwoelf-takt-blues).',
          en: 'The shuffle is a close relative of the blues. If you like it, try the [12-bar blues](wissen:zwoelf-takt-blues) too.',
          fr: 'Le shuffle est un proche parent du blues. S’il te plaît, essaie aussi le [blues en 12 mesures](wissen:zwoelf-takt-blues).',
        },
      },
      { tool: 'begleitung/shuffle' },
    ],
    related: ['zwoelf-takt-blues', 'groove-rock-begleitung', 'groove-country-begleitung'],
    published: PUBLISHED,
  },
  {
    id: 'groove-country-begleitung',
    slug: { de: 'country-boom-chick', en: 'country-boom-chick', fr: 'country-boum-tchic' },
    instruments: ALL,
    category: 'rhythmus',
    title: {
      de: 'Country: Boom-Chick mit Grundton und Quinte',
      en: 'Country: Boom-Chick with Root and Fifth',
      fr: 'La country : boum-tchic avec fondamentale et quinte',
    },
    description: {
      de: 'Country klingt nach „Boom-Chick“: auf eins und drei der Bass, auf zwei und vier der Akkord. Der Bass wechselt dabei zwischen Grundton und Quinte.',
      en: 'Country sounds like “boom-chick”: the bass on one and three, the chord on two and four. The bass switches between the root and the fifth.',
      fr: 'La country fait « boum-tchic » : la basse sur un et trois, l’accord sur deux et quatre. La basse alterne entre la fondamentale et la quinte.',
    },
    blocks: [
      {
        p: {
          de: 'Im Country hört man oft ein gleichmäßiges **Boom-Chick**: Auf eins und drei spielt der Bass einen tiefen Ton (Boom), auf zwei und vier klingt kurz der Akkord (Chick). Die Akkorde sind meist wieder I, IV und V – in G etwa **G**, **C** und **D**.',
          en: 'In country music you often hear an even **boom-chick**: on one and three the bass plays a low note (boom), on two and four the chord sounds briefly (chick). The chords are usually I, IV and V again – in G for example **G**, **C** and **D**.',
          fr: 'Dans la country, on entend souvent un **boum-tchic** régulier : sur un et trois, la basse joue une note grave (boum), sur deux et quatre, l’accord sonne brièvement (tchic). Les accords sont souvent I, IV et V – en Sol par exemple **G**, **C** et **D**.',
        },
      },
      { chord: 'G' },
      { chord: 'C' },
      { chord: 'D' },
      { h2: { de: 'Grundton und Quinte im Wechsel', en: 'Root and fifth in turn', fr: 'Fondamentale et quinte en alternance' } },
      {
        p: {
          de: 'Der Bass spielt auf eins den Grundton und auf drei die **Quinte** – oft die Quinte unter dem Grundton. Zu G sind das G und D, zu C sind es C und G, zu D sind es D und A.',
          en: 'The bass plays the root on one and the **fifth** on three – often the fifth below the root. For G that’s G and D, for C it’s C and G, for D it’s D and A.',
          fr: 'La basse joue la fondamentale sur un et la **quinte** sur trois – souvent la quinte sous la fondamentale. Pour G : Sol et Ré, pour C : Do et Sol, pour D : Ré et La.',
        },
      },
      {
        ul: [
          {
            de: '**Akkorde:** runter auf eins und drei, runter-rauf auf zwei und vier – das Runter auf eins und drei etwas stärker.',
            en: '**Chords:** down on one and three, down-up on two and four – the downs on one and three a little stronger.',
            fr: '**Accords :** bas sur un et trois, bas-haut sur deux et quatre – les bas sur un et trois un peu plus forts.',
          },
          {
            de: '**Bass:** erst nur den Grundton auf eins und drei, dann Grundton und Quinte im Wechsel.',
            en: '**Bass:** first just the root on one and three, then root and fifth in turn.',
            fr: '**Basse :** d’abord seulement la fondamentale sur un et trois, puis fondamentale et quinte en alternance.',
          },
        ],
      },
      {
        tip: {
          de: 'Zähl laut mit: „Boom – chick – boom – chick“. Wenn du das sprechen kannst, kannst du es auch spielen.',
          en: 'Count out loud: “boom – chick – boom – chick”. If you can say it, you can play it.',
          fr: 'Compte à voix haute : « boum – tchic – boum – tchic ». Si tu peux le dire, tu peux le jouer.',
        },
      },
      { tool: 'begleitung/country' },
    ],
    related: ['groove-rock-begleitung', 'groove-pop-begleitung', 'takt-und-taktarten'],
    published: PUBLISHED,
  },
];
