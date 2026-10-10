import type { Article } from './types.ts';

export const ALLGEMEIN_THEORIE: Article[] = [
  {
    id: 'akkordsymbole-lesen',
    slug: { de: 'akkordsymbole-lesen', en: 'read-chord-symbols', fr: 'lire-symboles-accords' },
    instruments: ['ukulele', 'gitarre', 'banjo', 'bariton'],
    category: 'akkorde',
    title: {
      de: 'Akkordsymbole lesen: Was bedeuten C, Am, G7 und Fmaj7?',
      en: 'How to Read Chord Symbols: C, Am, G7 and Fmaj7 Explained',
      fr: 'Lire les symboles d’accords : que veulent dire C, Am, G7 et Fmaj7 ?',
    },
    description: {
      de: 'Akkordsymbole einfach erklärt: Was C, Am, G7, Fmaj7 oder Bb bedeuten und wie du sie über dem Liedtext liest – für Kinder und Einsteiger.',
      en: 'Chord symbols made simple: what C, Am, G7, Fmaj7 or Bb mean and how to read them above the lyrics – for kids and beginners on any instrument.',
      fr: 'Les symboles d’accords expliqués simplement : ce que veulent dire C, Am, G7, Fmaj7 ou Bb et comment les lire au-dessus des paroles.',
    },
    blocks: [
      {
        p: {
          de: 'Über vielen Liedtexten stehen kleine Buchstaben wie **C**, **Am** oder **G7**. Das sind Akkordsymbole. Sie sagen dir, welchen Griff du an dieser Stelle spielst. Das Schöne: Die Symbole sind auf der ganzen Welt gleich – egal ob du Ukulele, Gitarre oder Banjo spielst. Nur das Griffbild sieht auf jedem Instrument anders aus.',
          en: 'Above many song lyrics you’ll see little letters like **C**, **Am** or **G7**. These are chord symbols. They tell you which chord to play at that point in the song. The best part: they’re the same all over the world, whether you play ukulele, guitar or banjo. Only the chord shape looks different on each instrument.',
          fr: 'Au-dessus de nombreuses paroles, tu vois de petites lettres comme **C**, **Am** ou **G7**. Ce sont des symboles d’accords. Ils t’indiquent quel accord jouer à cet endroit de la chanson. Ces symboles sont les mêmes partout dans le monde, que tu joues du ukulélé, de la guitare ou du banjo. Seule la position des doigts change d’un instrument à l’autre.',
        },
      },
      { h2: { de: 'Der große Buchstabe: der Grundton', en: 'The capital letter: the root note', fr: 'La lettre majuscule : la fondamentale' } },
      {
        p: {
          de: 'Der erste, große Buchstabe ist der **Grundton**. Er gibt dem Akkord seinen Namen. Es gibt sieben Buchstaben: C, D, E, F, G, A und B. Steht nur der Buchstabe allein da, zum Beispiel **C**, ist es ein **Dur-Akkord**. Dur klingt meistens hell und fröhlich.',
          en: 'The first capital letter is the **root note**. It gives the chord its name. There are seven letters: C, D, E, F, G, A and B. If the letter stands on its own, like **C**, it’s a **major chord**. Major chords usually sound bright and happy.',
          fr: 'La première lettre, en majuscule, est la **fondamentale**. C’est elle qui donne son nom à l’accord. Il y a sept lettres : C, D, E, F, G, A et B, qui correspondent à Do, Ré, Mi, Fa, Sol, La et Si. Si la lettre est seule, par exemple **C**, c’est un **accord majeur**. Il sonne en général clair et joyeux.',
        },
      },
      { chord: 'C' },
      {
        p: {
          de: 'Manchmal steht hinter dem Buchstaben ein **#** (Kreuz) oder ein **b**. Das # macht den Ton einen kleinen Schritt höher, das b einen kleinen Schritt tiefer. **F#** ist also etwas höher als F, **Bb** etwas tiefer als B.',
          en: 'Sometimes the letter is followed by a **#** (sharp) or a **b** (flat). A sharp raises the note by one small step, a flat lowers it by one small step. So **F#** is a little higher than F, and **Bb** is a little lower than B.',
          fr: 'Parfois, la lettre est suivie d’un **#** (dièse) ou d’un **b** (bémol). Le dièse monte la note d’un petit pas (un demi-ton), le bémol la descend d’un demi-ton. **F#** (Fa dièse) est donc un peu plus aigu que F, et **Bb** (Si bémol) un peu plus grave que B.',
        },
      },
      { h2: { de: 'Was hinter dem Buchstaben steht', en: 'What comes after the letter', fr: 'Ce qui suit la lettre' } },
      {
        ul: [
          {
            de: '**m** steht für **Moll**: [Am](chord:Am) heißt a-Moll. Moll klingt oft weicher, ruhiger oder ein bisschen traurig.',
            en: '**m** means **minor**: [Am](chord:Am) is A minor. Minor chords often sound softer, calmer or a little sad.',
            fr: '**m** veut dire **mineur** : [Am](chord:Am) se lit « La mineur ». Le mineur sonne souvent plus doux, plus calme ou un peu triste.',
          },
          {
            de: '**7** heißt **Septakkord**: [G7](chord:G7) ist G-Dur mit einem zusätzlichen Ton. Er klingt, als wolle er gleich weitergehen – meistens zurück zum Grundakkord.',
            en: '**7** means a **seventh chord**: [G7](chord:G7) is G major with one extra note. It sounds as if it wants to move on – usually back home to the main chord.',
            fr: '**7** désigne un **accord de septième** : [G7](chord:G7) est un Sol majeur avec une note en plus. Il donne envie d’avancer, le plus souvent pour revenir à l’accord principal.',
          },
          {
            de: '**m7** ist Moll mit Septime, zum Beispiel **Am7**. Klingt weich und ein wenig jazzig.',
            en: '**m7** is a minor seventh, for example **Am7**. It sounds soft and a little jazzy.',
            fr: '**m7** est un accord mineur avec septième, par exemple **Am7**. Il sonne doux, un peu jazzy.',
          },
          {
            de: '**maj7** (gesprochen „Major Sieben“) ist eine andere, sanftere Septime: **Fmaj7** klingt träumerisch.',
            en: '**maj7** (“major seven”) uses a different, gentler seventh: **Fmaj7** sounds dreamy.',
            fr: '**maj7** (« majeur sept ») ajoute une septième plus douce : **Fmaj7** a un son rêveur.',
          },
          {
            de: '**sus4**, **sus2**, **dim** und **aug** sind seltener. Wenn du sie triffst, schau dir einfach das Griffbild an.',
            en: '**sus4**, **sus2**, **dim** and **aug** are less common. When you meet one, just look up the chord shape.',
            fr: '**sus4**, **sus2**, **dim** et **aug** sont plus rares. Quand tu en rencontres un, regarde simplement sa grille.',
          },
        ],
      },
      { chord: 'Am' },
      { chord: 'G7' },
      { h2: { de: 'So liest du Akkorde im Lied', en: 'Reading chords in a song', fr: 'Lire les accords dans une chanson' } },
      {
        p: {
          de: 'Der Akkord steht genau über der Silbe, bei der du ihn wechselst. Du spielst ihn so lange weiter, bis ein neuer Akkord kommt. Steht über einer Zeile gar nichts, bleibst du einfach beim letzten Akkord.',
          en: 'The chord sits right above the syllable where you change to it. Keep playing it until a new chord appears. If nothing is written above a line, simply stay on the last chord.',
          fr: 'L’accord est placé juste au-dessus de la syllabe où tu changes. Tu le joues jusqu’à ce qu’un nouvel accord apparaisse. S’il n’y a rien au-dessus d’une ligne, tu restes simplement sur le dernier accord.',
        },
      },
      {
        tip: {
          de: 'Im Deutschen heißt der Ton B oft **H**, und „B“ meint dann Bb. In Liederbüchern für Kinder findest du deshalb manchmal **H7** statt **B7**. Es ist derselbe Akkord. Mehr dazu in [Töne und Notennamen](wissen:toene-und-notennamen).',
          en: 'In German songbooks the note B is often called **H**, and “B” then means Bb. So you might see **H7** instead of **B7** – it’s the same chord. Read more in [Note names](wissen:toene-und-notennamen).',
          fr: 'Dans les recueils allemands, la note Si (B) s’appelle souvent **H**, et « B » y désigne Si bémol. Tu peux donc voir **H7** au lieu de **B7** : c’est le même accord. Plus d’infos dans [Les noms des notes](wissen:toene-und-notennamen).',
        },
      },
      {
        p: {
          de: 'In der App findest du zu jedem Namen das passende Griffbild. Und wenn du einen Griff spielst und nicht weißt, wie er heißt, verrät es dir der Akkord-Detektiv.',
          en: 'In the app you’ll find the chord shape for every name. And if you play a chord and don’t know what it’s called, the Chord Detective will tell you.',
          fr: 'Dans l’appli, tu trouves la grille de chaque accord. Et si tu joues un accord sans savoir comment il s’appelle, le Détective d’accords te le dira.',
        },
      },
      { tool: 'akkorde' },
      { tool: 'detektiv' },
    ],
    related: ['dur-und-moll', 'toene-und-notennamen', 'transponieren'],
  },
  {
    id: 'dur-und-moll',
    slug: { de: 'dur-und-moll', en: 'major-and-minor', fr: 'majeur-et-mineur' },
    instruments: ['ukulele', 'gitarre', 'banjo', 'bariton'],
    category: 'theorie',
    title: {
      de: 'Dur und Moll hören und verstehen – einfach erklärt',
      en: 'Major and Minor Chords: Hear the Difference',
      fr: 'Majeur et mineur : entendre et comprendre la différence',
    },
    description: {
      de: 'Dur klingt hell, Moll eher weich oder traurig. Kindgerecht erklärt, woran du den Unterschied hörst und welcher eine Ton ihn ausmacht.',
      en: 'Major sounds bright, minor softer or sadder. A kid-friendly guide to hearing the difference and the single note that makes it.',
      fr: 'Le majeur sonne clair, le mineur plus doux ou triste. Une explication pour enfants : comment entendre la différence et quelle note la crée.',
    },
    blocks: [
      {
        p: {
          de: 'Spiel einmal [C](chord:C) und danach [Am](chord:Am). Hörst du den Unterschied? Der erste Akkord klingt hell, wie Sonnenschein. Der zweite klingt weicher, ein bisschen nachdenklich, wie ein Regentag. Das ist der Unterschied zwischen **Dur** und **Moll**.',
          en: 'Play [C](chord:C) and then [Am](chord:Am). Can you hear the difference? The first chord sounds bright, like sunshine. The second one sounds softer and a bit thoughtful, like a rainy day. That’s the difference between **major** and **minor**.',
          fr: 'Joue [C](chord:C), puis [Am](chord:Am). Tu entends la différence ? Le premier accord sonne clair, comme un rayon de soleil. Le second est plus doux, un peu pensif, comme un jour de pluie. C’est la différence entre **majeur** et **mineur**.',
        },
      },
      { chord: 'C' },
      { chord: 'Am' },
      { h2: { de: 'Ein einziger Ton macht den Unterschied', en: 'One single note makes the difference', fr: 'Une seule note fait toute la différence' } },
      {
        p: {
          de: 'Ein einfacher Akkord besteht aus drei Tönen: dem Grundton, einem Ton in der Mitte und einem Ton oben. Bei C-Dur sind das **C – E – G**. Bei c-Moll ist der mittlere Ton einen kleinen Schritt tiefer: **C – Eb – G**. Nur dieser eine Ton, die **Terz**, entscheidet, ob ein Akkord nach Dur oder Moll klingt.',
          en: 'A basic chord is made of three notes: the root, a middle note and a top note. C major is **C – E – G**. In C minor the middle note is one small step lower: **C – Eb – G**. Just that one note, called the **third**, decides whether a chord sounds major or minor.',
          fr: 'Un accord simple se compose de trois notes : la fondamentale, une note du milieu et une note du haut. Do majeur, c’est **Do – Mi – Sol** (C – E – G). En Do mineur, la note du milieu est un demi-ton plus bas : **Do – Mi bémol – Sol**. Cette seule note, la **tierce**, décide si l’accord sonne majeur ou mineur.',
        },
      },
      {
        ul: [
          {
            de: '**Große Terz** (4 kleine Schritte über dem Grundton) → Dur, Symbol ohne Zusatz: C, G, F',
            en: '**Major third** (4 half steps above the root) → major, symbol with no extra letter: C, G, F',
            fr: '**Tierce majeure** (4 demi-tons au-dessus de la fondamentale) → majeur, sans rien après la lettre : C, G, F',
          },
          {
            de: '**Kleine Terz** (3 kleine Schritte) → Moll, Symbol mit m: Am, Dm, Em',
            en: '**Minor third** (3 half steps) → minor, symbol with an m: Am, Dm, Em',
            fr: '**Tierce mineure** (3 demi-tons) → mineur, avec un m : Am, Dm, Em',
          },
        ],
      },
      { h2: { de: 'Hör-Spiel für zwei', en: 'A listening game for two', fr: 'Un jeu d’écoute à deux' } },
      {
        ol: [
          {
            de: 'Eine Person spielt entweder [C](chord:C) oder [Am](chord:Am), ohne dass die andere auf die Finger schaut.',
            en: 'One person plays either [C](chord:C) or [Am](chord:Am) while the other one doesn’t look at their hands.',
            fr: 'Une personne joue soit [C](chord:C), soit [Am](chord:Am), sans que l’autre regarde ses doigts.',
          },
          {
            de: 'Die andere ruft „Sonne!“ für Dur oder „Regen!“ für Moll.',
            en: 'The other shouts “Sunshine!” for major or “Rain!” for minor.',
            fr: 'L’autre crie « Soleil ! » pour majeur ou « Pluie ! » pour mineur.',
          },
          {
            de: 'Dann tauscht ihr. Später könnt ihr G und Em oder F und Dm dazunehmen.',
            en: 'Then swap roles. Later, add G and Em or F and Dm.',
            fr: 'Puis vous échangez. Ensuite, ajoutez G et Em, ou F et Dm.',
          },
        ],
      },
      {
        tip: {
          de: 'Dur heißt nicht immer fröhlich und Moll nicht immer traurig. Viele lustige Seemannslieder stehen in Moll, zum Beispiel [Drunken Sailor](lied:drunken-sailor). Am besten lernst du Dur und Moll, indem du ganz oft hinhörst.',
          en: 'Major doesn’t always mean happy and minor doesn’t always mean sad. Lots of lively sea shanties are in minor, like [Drunken Sailor](lied:drunken-sailor). The best way to learn is simply to listen a lot.',
          fr: 'Majeur ne veut pas toujours dire joyeux, ni mineur triste. Beaucoup de chants de marins entraînants sont en mineur, comme [Drunken Sailor](lied:drunken-sailor). Le mieux, c’est d’écouter souvent.',
        },
      },
      { h2: { de: 'Geschwister-Akkorde', en: 'Chord siblings', fr: 'Des accords cousins' } },
      {
        p: {
          de: 'Jeder Dur-Akkord hat einen Moll-Akkord, der fast die gleichen Töne hat. Zu C-Dur gehört a-Moll, zu G-Dur gehört e-Moll, zu F-Dur gehört d-Moll. Deshalb passen diese Paare so gut zusammen und tauchen in vielen Liedern nebeneinander auf. Der Akkord-Detektiv in der App zeigt dir bei jedem Akkord, ob er Dur oder Moll ist und welche Töne darin stecken.',
          en: 'Every major chord has a minor partner that shares almost the same notes: C major goes with A minor, G major with E minor, F major with D minor. That’s why these pairs sound so good together and turn up side by side in many songs. The Chord Detective in the app shows you whether a chord is major or minor and which notes it contains.',
          fr: 'Chaque accord majeur a un « cousin » mineur qui partage presque les mêmes notes : Do majeur va avec La mineur, Sol majeur avec Mi mineur, Fa majeur avec Ré mineur. C’est pour ça que ces paires s’enchaînent si bien dans tant de chansons. Le Détective d’accords de l’appli te montre si un accord est majeur ou mineur et quelles notes il contient.',
        },
      },
      { tool: 'detektiv' },
    ],
    related: ['akkordsymbole-lesen', 'toene-und-notennamen', 'transponieren'],
  },
  {
    id: 'takt-und-taktarten',
    slug: { de: 'takt-und-taktarten', en: 'time-signatures', fr: 'mesures-et-temps' },
    instruments: ['ukulele', 'gitarre', 'banjo', 'bariton'],
    category: 'rhythmus',
    title: {
      de: 'Takt und Taktarten: 4/4, 3/4, 2/4 und 6/8 einfach erklärt',
      en: 'Time Signatures for Beginners: 4/4, 3/4, 2/4 and 6/8',
      fr: 'Les mesures pour débutants : 4/4, 3/4, 2/4 et 6/8',
    },
    description: {
      de: 'Was ist ein Takt, und wie zählt man 4/4, 3/4, 2/4 oder 6/8? Kindgerecht erklärt mit Liedbeispielen und Tipps zum Mitklatschen und Zählen.',
      en: 'What is a bar, and how do you count 4/4, 3/4, 2/4 or 6/8? A kid-friendly guide with song examples and tips for clapping and counting along.',
      fr: 'Qu’est-ce qu’une mesure et comment compter 4/4, 3/4, 2/4 ou 6/8 ? Une explication pour enfants avec des exemples de chansons à taper.',
    },
    blocks: [
      {
        p: {
          de: 'Musik hat einen Herzschlag: den **Schlag** oder **Puls**. Wenn du zu einem Lied mit dem Fuß wippst, tippst du genau diesen Schlag. Die Schläge werden in kleine Gruppen eingeteilt, die **Takte**. Der erste Schlag in jedem Takt ist ein bisschen stärker – auf ihm wechselt man meistens den Akkord.',
          en: 'Music has a heartbeat: the **beat** or **pulse**. When you tap your foot to a song, you’re tapping that beat. Beats are grouped into small packages called **bars** (or measures). The first beat in each bar is a bit stronger – that’s usually where the chord changes.',
          fr: 'La musique a un battement de cœur : la **pulsation**. Quand tu tapes du pied sur une chanson, tu marques ces temps. Les temps sont regroupés en petits paquets, les **mesures**. Le premier temps de chaque mesure est un peu plus fort : c’est souvent là qu’on change d’accord.',
        },
      },
      { h2: { de: 'Was die zwei Zahlen bedeuten', en: 'What the two numbers mean', fr: 'Ce que veulent dire les deux chiffres' } },
      {
        p: {
          de: 'Am Anfang eines Liedes steht oft ein Bruch wie **4/4** oder **3/4**. Die obere Zahl sagt dir, wie viele Schläge in einem Takt sind. Die untere Zahl verrät, welcher Notenwert als ein Schlag zählt – für den Anfang reicht die obere Zahl völlig.',
          en: 'At the start of a song you’ll often see a fraction like **4/4** or **3/4**. The top number tells you how many beats are in each bar. The bottom number tells you which note value counts as one beat – for now, the top number is all you need.',
          fr: 'Au début d’une chanson, on voit souvent une fraction comme **4/4** ou **3/4**. Le chiffre du haut indique combien de temps il y a dans une mesure. Celui du bas dit quelle valeur de note compte pour un temps – pour commencer, le chiffre du haut suffit.',
        },
      },
      {
        ul: [
          {
            de: '**4/4** – zähle „1 2 3 4“. Die häufigste Taktart, zum Beispiel bei [Hänschen klein](lied:haenschen-klein) oder [Mary Had a Little Lamb](lied:mary-lamb).',
            en: '**4/4** – count “1 2 3 4”. The most common time signature, for example in [Mary Had a Little Lamb](lied:mary-lamb) or the German children’s song [Hänschen klein](lied:haenschen-klein).',
            fr: '**4/4** – compte « 1 2 3 4 ». La mesure la plus courante, par exemple dans [Mary Had a Little Lamb](lied:mary-lamb) ou la comptine allemande [Hänschen klein](lied:haenschen-klein).',
          },
          {
            de: '**3/4** – zähle „1 2 3“. Der Walzer-Takt, schwingt wie eine Schaukel. Hör dir [Zum Geburtstag viel Glück](lied:geburtstag) oder [My Bonnie](lied:my-bonnie) an.',
            en: '**3/4** – count “1 2 3”. Waltz time, swinging like a swing. Listen to [My Bonnie](lied:my-bonnie) or the birthday song [Zum Geburtstag viel Glück](lied:geburtstag).',
            fr: '**3/4** – compte « 1 2 3 ». La mesure de la valse, qui balance comme une balançoire. Écoute [My Bonnie](lied:my-bonnie) ou la chanson d’anniversaire [Zum Geburtstag viel Glück](lied:geburtstag).',
          },
          {
            de: '**2/4** – zähle „1 2“. Klingt wie Marschieren: [Summ, summ, summ](lied:summ-summ).',
            en: '**2/4** – count “1 2”. Feels like marching: [Summ, summ, summ](lied:summ-summ).',
            fr: '**2/4** – compte « 1 2 ». On dirait une marche : [Summ, summ, summ](lied:summ-summ).',
          },
          {
            de: '**6/8** – zähle „1 2 3 4 5 6“ und betone 1 und 4. Das klingt wiegend, wie ein Boot auf Wellen: [Stille Nacht](lied:stille-nacht).',
            en: '**6/8** – count “1 2 3 4 5 6” and lean on 1 and 4. It rocks gently like a boat on the waves: [Stille Nacht (Silent Night)](lied:stille-nacht).',
            fr: '**6/8** – compte « 1 2 3 4 5 6 » en appuyant sur 1 et 4. Ça berce, comme un bateau sur les vagues : [Stille Nacht (Douce nuit)](lied:stille-nacht).',
          },
        ],
      },
      { h2: { de: 'Den Takt im Körper spüren', en: 'Feel the beat in your body', fr: 'Sentir la mesure avec le corps' } },
      {
        ol: [
          {
            de: 'Hör ein Lied an und klatsche jeden Schlag mit.',
            en: 'Listen to a song and clap on every beat.',
            fr: 'Écoute une chanson et tape dans tes mains à chaque temps.',
          },
          {
            de: 'Klatsche die **1** laut und die anderen Schläge leise. Jetzt hörst du, wie lang ein Takt ist.',
            en: 'Clap **1** loudly and the other beats softly. Now you can hear how long a bar is.',
            fr: 'Tape fort sur le **1** et doucement sur les autres temps. Tu entends maintenant la longueur d’une mesure.',
          },
          {
            de: 'Spiele dann einen einzigen Akkord und schlage auf jeden Schlag einmal nach unten an.',
            en: 'Then play a single chord and strum down once on every beat.',
            fr: 'Ensuite, joue un seul accord en grattant vers le bas une fois par temps.',
          },
        ],
      },
      {
        tip: {
          de: 'Zähle am Anfang laut mit. Das fühlt sich vielleicht komisch an, hilft aber enorm. Profis zählen im Kopf weiter, auch wenn man es nicht sieht.',
          en: 'Count out loud at first. It might feel silly, but it helps a lot. Professional musicians keep counting in their heads, even if you can’t see it.',
          fr: 'Au début, compte à voix haute. Ça peut paraître bizarre, mais ça aide énormément. Les musiciens professionnels comptent aussi dans leur tête, même si on ne le voit pas.',
        },
      },
      {
        p: {
          de: 'Im Rhythmus-Werkzeug der App kannst du die Taktart einstellen. Das Metronom betont dann die 1, und du hörst sofort, wo ein neuer Takt beginnt. Wie du damit am besten übst, steht in [Mit Metronom üben](wissen:mit-metronom-ueben).',
          en: 'In the app’s rhythm tool you can choose the time signature. The metronome then accents beat 1, so you instantly hear where each new bar begins. Find out how to practise with it in [Practising with a metronome](wissen:mit-metronom-ueben).',
          fr: 'Dans l’outil Rythme de l’appli, tu peux choisir la mesure. Le métronome accentue alors le 1 et tu entends tout de suite où commence chaque mesure. Pour bien t’entraîner, lis [Travailler avec un métronome](wissen:mit-metronom-ueben).',
        },
      },
      { tool: 'rhythmus' },
    ],
    related: ['mit-metronom-ueben', 'schlagmuster-lernen', 'lieder-fuer-anfaenger'],
  },
  {
    id: 'schlagmuster-lernen',
    slug: { de: 'schlagmuster-lernen', en: 'strumming-patterns', fr: 'rythmiques-grattage' },
    instruments: ['ukulele', 'gitarre', 'bariton'],
    category: 'rhythmus',
    title: {
      de: 'Schlagmuster lernen: Die besten Anschläge für Anfänger',
      en: 'Easy Strumming Patterns for Beginners',
      fr: 'Rythmiques de grattage faciles pour débutants',
    },
    description: {
      de: 'Schlagmuster für Ukulele und Gitarre Schritt für Schritt: vom einfachen Abschlag bis zum Calypso-Rhythmus, mit Wechselschlag und Zähltipps.',
      en: 'Strumming patterns for ukulele and guitar, step by step: from simple down strums to the island strum, with tips on counting and steady hand motion.',
      fr: 'Rythmiques pour ukulélé et guitare, pas à pas : du simple coup vers le bas au rythme calypso, avec des conseils pour compter et garder le mouvement.',
    },
    blocks: [
      {
        p: {
          de: 'Ein Schlagmuster ist die Reihenfolge, in der du die Saiten nach unten (↓) und nach oben (↑) anschlägst. Es macht aus einem einzelnen Akkord schon ein kleines Musikstück. Bei der Ukulele schlägst du meist mit dem Zeigefinger oder Daumen, bei der Gitarre mit dem Daumen, dem Zeigefinger oder einem Plektrum.',
          en: 'A strumming pattern is the order in which you strum down (↓) and up (↑) across the strings. It turns a single chord into a little piece of music. On ukulele you usually strum with your index finger or thumb; on guitar with your thumb, index finger or a pick.',
          fr: 'Une rythmique, c’est l’ordre dans lequel tu grattes les cordes vers le bas (↓) et vers le haut (↑). Avec elle, un seul accord devient déjà un petit morceau. Au ukulélé, on gratte souvent avec l’index ou le pouce ; à la guitare, avec le pouce, l’index ou un médiator.',
        },
      },
      { h2: { de: 'Das Geheimnis: Die Hand bleibt in Bewegung', en: 'The secret: keep your hand moving', fr: 'Le secret : la main ne s’arrête jamais' } },
      {
        p: {
          de: 'Deine Schlaghand bewegt sich gleichmäßig auf und ab wie ein Pendel: nach unten auf die Zahlen (1, 2, 3, 4), nach oben auf das „und“ dazwischen. Für ein Muster triffst du die Saiten nur manchmal – die Hand schwingt aber immer weiter. So bleibst du ganz automatisch im Takt.',
          en: 'Your strumming hand moves steadily up and down like a pendulum: down on the numbers (1, 2, 3, 4) and up on the “and” in between. For a pattern you only hit the strings some of the time – but your hand never stops swinging. That keeps you in time automatically.',
          fr: 'Ta main qui gratte bouge régulièrement de haut en bas, comme un balancier : vers le bas sur les chiffres (1, 2, 3, 4), vers le haut sur les « et » entre eux. Pour une rythmique, tu ne touches les cordes que de temps en temps, mais la main continue toujours de se balancer. Comme ça, tu restes en rythme sans y penser.',
        },
      },
      { h2: { de: 'Vier Muster zum Loslegen', en: 'Four patterns to get started', fr: 'Quatre rythmiques pour démarrer' } },
      {
        ol: [
          {
            de: '**↓ ↓ ↓ ↓** – vier Abschläge pro Takt. Damit kannst du schon jedes Lied im 4/4-Takt begleiten.',
            en: '**↓ ↓ ↓ ↓** – four down strums per bar. With this alone you can already accompany any song in 4/4.',
            fr: '**↓ ↓ ↓ ↓** – quatre coups vers le bas par mesure. Avec ça, tu peux déjà accompagner n’importe quelle chanson en 4/4.',
          },
          {
            de: '**↓ ↓↑ ↓ ↓↑** – gezählt „1, 2 und, 3, 4 und“. Klingt schon richtig lebendig.',
            en: '**↓ ↓↑ ↓ ↓↑** – counted “1, 2 and, 3, 4 and”. It already sounds lively.',
            fr: '**↓ ↓↑ ↓ ↓↑** – compté « 1, 2 et, 3, 4 et ». Ça sonne déjà très vivant.',
          },
          {
            de: '**↓ ↓↑ ↑↓↑** – der beliebte Insel- oder Calypso-Rhythmus: „1, 2 und, und 4 und“. Auf der 3 schwingt die Hand nach unten, ohne die Saiten zu berühren.',
            en: '**↓ ↓↑ ↑↓↑** – the popular island or calypso strum: “1, 2 and, and 4 and”. On beat 3 your hand swings down without touching the strings.',
            fr: '**↓ ↓↑ ↑↓↑** – la célèbre rythmique « calypso » : « 1, 2 et, et 4 et ». Sur le 3, la main descend sans toucher les cordes.',
          },
          {
            de: '**↓ ↓↑ ↓↑** – für den 3/4-Takt: „1, 2 und, 3 und“. Passt zu Walzerliedern wie [Clementine](lied:clementine).',
            en: '**↓ ↓↑ ↓↑** – for 3/4 time: “1, 2 and, 3 and”. Great for waltz songs like [Clementine](lied:clementine).',
            fr: '**↓ ↓↑ ↓↑** – pour la mesure à 3/4 : « 1, 2 et, 3 et ». Parfait pour les valses comme [Clementine](lied:clementine).',
          },
        ],
      },
      {
        tip: {
          de: 'Lerne ein neues Muster erst mit gedämpften Saiten: Leg die Greifhand locker auf alle Saiten, ohne zu drücken. Dann hörst du nur den Rhythmus. Erst wenn der sitzt, nimmst du einen Akkord dazu.',
          en: 'Learn a new pattern with muted strings first: rest your fretting hand lightly across all strings without pressing. You’ll hear only the rhythm. Once it feels solid, add a chord.',
          fr: 'Apprends une nouvelle rythmique d’abord avec les cordes étouffées : pose doucement ta main gauche sur toutes les cordes sans appuyer. Tu n’entends plus que le rythme. Quand il est en place, ajoute un accord.',
        },
      },
      { h2: { de: 'So übst du ein Muster', en: 'How to practise a pattern', fr: 'Comment travailler une rythmique' } },
      {
        ul: [
          {
            de: 'Sprich das Muster laut: „runter, runter-rauf, rauf-runter-rauf“.',
            en: 'Say the pattern out loud: “down, down-up, up-down-up”.',
            fr: 'Dis la rythmique à voix haute : « bas, bas-haut, haut-bas-haut ».',
          },
          {
            de: 'Abschläge etwas kräftiger, Aufschläge leichter – oft triffst du nach oben nur die hohen Saiten. Das ist völlig in Ordnung.',
            en: 'Make down strums a little stronger and up strums lighter – going up you often only catch the higher strings. That’s perfectly fine.',
            fr: 'Les coups vers le bas un peu plus forts, ceux vers le haut plus légers : en remontant, on ne touche souvent que les cordes aiguës, et c’est très bien ainsi.',
          },
          {
            de: 'Erst langsam mit Metronom, dann schneller. Wenn du einen Akkordwechsel dazunimmst, bleibt die Schlaghand einfach in Bewegung.',
            en: 'Start slowly with a metronome, then speed up. When you add a chord change, just keep your strumming hand moving.',
            fr: 'D’abord lentement avec un métronome, puis plus vite. Quand tu ajoutes un changement d’accord, ta main droite continue tout simplement à bouger.',
          },
        ],
      },
      {
        p: {
          de: 'Das Rhythmus-Werkzeug zeigt dir die Pfeile im Takt an und spielt auf Wunsch einen Akkord mit. Ein Schlagmuster ist kein Gesetz: Wenn dir ein Lied mit einfachen Abschlägen besser gefällt, spiel es so. Mehr über das Zählen erfährst du in [Takt und Taktarten](wissen:takt-und-taktarten).',
          en: 'The rhythm tool shows the arrows in time and can play a chord along with you. A strumming pattern isn’t a rule: if a song feels better to you with simple down strums, play it that way. Learn more about counting in [Time signatures](wissen:takt-und-taktarten).',
          fr: 'L’outil Rythme affiche les flèches en mesure et peut jouer un accord avec toi. Une rythmique n’est pas une loi : si une chanson te plaît plus avec de simples coups vers le bas, joue-la comme ça. Pour en savoir plus sur le comptage, lis [Les mesures](wissen:takt-und-taktarten).',
        },
      },
      { tool: 'rhythmus' },
    ],
    related: ['takt-und-taktarten', 'mit-metronom-ueben', 'akkordwechsel-schneller'],
  },
  {
    id: 'mit-metronom-ueben',
    slug: { de: 'mit-metronom-ueben', en: 'practice-with-metronome', fr: 'travailler-avec-metronome' },
    instruments: ['ukulele', 'gitarre', 'banjo', 'bariton'],
    category: 'rhythmus',
    title: {
      de: 'Mit Metronom üben – so wird dein Rhythmus stabil',
      en: 'How to Practise with a Metronome',
      fr: 'Travailler avec un métronome : le guide pour débutants',
    },
    description: {
      de: 'Warum das Metronom dein bester Übungspartner ist und wie du damit langsam beginnst und Schritt für Schritt schneller wirst, ohne zu verkrampfen.',
      en: 'Why a metronome is your best practice partner, and how to start slowly and get faster step by step without tensing up. Tips for kids and beginners.',
      fr: 'Pourquoi le métronome est ton meilleur partenaire d’entraînement et comment commencer lentement puis accélérer pas à pas, sans te crisper.',
    },
    blocks: [
      {
        p: {
          de: 'Ein Metronom tickt ganz gleichmäßig, wie eine Uhr. Es zeigt dir den Schlag, an dem du dich festhalten kannst. Viele Anfänger werden bei leichten Stellen schneller und bei schweren Stellen langsamer. Mit dem Metronom merkst du das sofort – und lernst, ruhig im Tempo zu bleiben.',
          en: 'A metronome ticks perfectly evenly, like a clock. It gives you a beat to hold on to. Many beginners rush the easy bits and slow down on the hard ones. With a metronome you notice straight away – and learn to stay steady.',
          fr: 'Un métronome bat de façon parfaitement régulière, comme une horloge. Il te donne une pulsation sur laquelle t’appuyer. Beaucoup de débutants accélèrent dans les passages faciles et ralentissent dans les passages difficiles. Avec le métronome, tu le remarques tout de suite et tu apprends à garder un tempo stable.',
        },
      },
      { h2: { de: 'Was bedeutet BPM?', en: 'What does BPM mean?', fr: 'Que veut dire BPM ?' } },
      {
        p: {
          de: 'Das Tempo wird in **BPM** angegeben, „Schläge pro Minute“. 60 BPM heißt: ein Schlag pro Sekunde – ziemlich langsam. 120 BPM ist doppelt so schnell und schon flott. Zum Üben fängst du fast immer langsamer an, als das Lied eigentlich ist.',
          en: 'Tempo is measured in **BPM**, beats per minute. 60 BPM means one beat per second – quite slow. 120 BPM is twice as fast and already lively. For practice you almost always start slower than the song’s real tempo.',
          fr: 'Le tempo se mesure en **BPM**, « battements par minute ». 60 BPM, c’est un battement par seconde : assez lent. 120 BPM, c’est deux fois plus rapide et déjà entraînant. Pour t’entraîner, commence presque toujours plus lentement que le vrai tempo de la chanson.',
        },
      },
      { h2: { de: 'Schritt für Schritt schneller', en: 'Getting faster step by step', fr: 'Accélérer pas à pas' } },
      {
        ol: [
          {
            de: 'Stell ein Tempo ein, bei dem du die Stelle **ohne Stocken** schaffst – auch wenn das sehr langsam ist, zum Beispiel 60 BPM.',
            en: 'Pick a tempo at which you can play the passage **without stopping** – even if it’s very slow, say 60 BPM.',
            fr: 'Choisis un tempo auquel tu peux jouer le passage **sans t’arrêter**, même s’il est très lent, par exemple 60 BPM.',
          },
          {
            de: 'Hör zuerst nur zu und zähle mit. Dann spiel mit, zum Beispiel einen Abschlag auf jeden Klick.',
            en: 'First just listen and count along. Then join in, for example with one down strum per click.',
            fr: 'D’abord, écoute simplement en comptant. Puis joue avec lui, par exemple un coup vers le bas à chaque clic.',
          },
          {
            de: 'Klappt es dreimal hintereinander entspannt, stell das Metronom ein kleines Stück schneller, etwa 5 BPM.',
            en: 'When it goes smoothly three times in a row, nudge the metronome up a little, about 5 BPM.',
            fr: 'Quand ça passe tranquillement trois fois de suite, augmente un peu le métronome, environ 5 BPM.',
          },
          {
            de: 'Wird es hektisch, geh wieder ein Stück zurück. Das ist kein Rückschritt, sondern genau so funktioniert Üben.',
            en: 'If it gets hectic, go back down a little. That’s not a step backwards – it’s exactly how practice works.',
            fr: 'Si ça devient stressant, redescends un peu. Ce n’est pas un recul : c’est exactement comme ça qu’on progresse.',
          },
        ],
      },
      {
        tip: {
          de: 'Übe Akkordwechsel mit dem Metronom so: Vier Schläge auf dem ersten Akkord, vier auf dem zweiten. Der Wechsel muss genau auf der **1** fertig sein. Wenn das zu knapp ist, lass beim letzten Schlag vor dem Wechsel einfach eine Pause und nutze die Zeit für die Finger.',
          en: 'Practise chord changes with the metronome like this: four beats on the first chord, four on the second. The change has to be ready right on beat **1**. If that’s too tight, skip the last strum before the change and use that time for your fingers.',
          fr: 'Entraîne-toi aux changements d’accords ainsi : quatre temps sur le premier accord, quatre sur le second. Le changement doit être prêt pile sur le **1**. Si c’est trop juste, saute le dernier coup avant le changement et utilise ce temps pour placer tes doigts.',
        },
      },
      { h2: { de: 'Typische Stolpersteine', en: 'Common stumbling blocks', fr: 'Les pièges classiques' } },
      {
        ul: [
          {
            de: '**Zu schnell angefangen:** Langsam und sauber bringt dich schneller ans Ziel als schnell und holprig.',
            en: '**Starting too fast:** slow and clean gets you there sooner than fast and bumpy.',
            fr: '**Commencer trop vite :** lent et propre te fait progresser plus vite que rapide et approximatif.',
          },
          {
            de: '**Den Klick überhören:** Zähle laut mit, dann rutschst du nicht weg.',
            en: '**Losing the click:** count out loud so you don’t drift away.',
            fr: '**Ne plus entendre le clic :** compte à voix haute, tu ne décrocheras pas.',
          },
          {
            de: '**Zu lange am Stück:** Lieber fünf Minuten konzentriert als eine halbe Stunde müde.',
            en: '**Practising too long in one go:** five focused minutes beat half an hour of tired playing.',
            fr: '**Jouer trop longtemps d’affilée :** mieux vaut cinq minutes concentrées qu’une demi-heure fatiguée.',
          },
        ],
      },
      {
        p: {
          de: 'In der App findest du ein Metronom im Rhythmus-Werkzeug, auf Wunsch mit Schlagmuster und Akkord. Auch die Lieder kannst du langsam, mittel oder im Originaltempo spielen. Fang langsam an und arbeite dich zum Original hoch.',
          en: 'The app’s rhythm tool has a metronome, with an optional strumming pattern and chord. You can also play the songs slow, medium or at their original tempo. Start slow and work your way up.',
          fr: 'Dans l’appli, l’outil Rythme contient un métronome, avec rythmique et accord si tu veux. Tu peux aussi jouer les chansons lentement, à vitesse moyenne ou au tempo d’origine. Commence lentement et monte petit à petit.',
        },
      },
      { tool: 'rhythmus' },
      { tool: 'lieder' },
    ],
    related: ['takt-und-taktarten', 'akkordwechsel-schneller', 'schlagmuster-lernen'],
  },
  {
    id: 'toene-und-notennamen',
    slug: { de: 'toene-und-notennamen', en: 'note-names', fr: 'noms-des-notes' },
    instruments: ['ukulele', 'gitarre', 'banjo', 'bariton'],
    category: 'theorie',
    title: {
      de: 'Töne und Notennamen: C D E F G A B – und warum B auch H heißt',
      en: 'Note Names for Beginners: C D E F G A B and Sharps and Flats',
      fr: 'Les noms des notes : Do Ré Mi et les lettres C D E F G A B',
    },
    description: {
      de: 'Die sieben Notennamen, Kreuz und b und warum B im Deutschen oft H heißt – kindgerecht erklärt, mit Tipps zum Finden der Töne auf dem Instrument.',
      en: 'The seven note names, sharps and flats, and why German speakers call B “H” – explained for kids, with tips for finding notes on your instrument.',
      fr: 'Les sept notes, dièses et bémols, et la correspondance entre Do Ré Mi et les lettres C D E – expliqué aux enfants, avec des astuces pour l’instrument.',
    },
    blocks: [
      {
        p: {
          de: 'Jeder Ton hat einen Namen. Im Englischen und bei Akkorden auf der ganzen Welt sind es sieben Buchstaben: **C – D – E – F – G – A – B**. Danach geht es wieder mit C los, nur höher. Den Abstand von einem C zum nächsten nennt man **Oktave**.',
          en: 'Every note has a name. In English, and for chord symbols around the world, there are seven letters: **C – D – E – F – G – A – B**. After B you start again at C, just higher. The distance from one C to the next is called an **octave**.',
          fr: 'Chaque note a un nom. En français, on chante **Do – Ré – Mi – Fa – Sol – La – Si**. Dans les symboles d’accords, on utilise partout dans le monde des lettres : **C – D – E – F – G – A – B**. Après Si, on recommence à Do, mais plus aigu. L’écart entre un Do et le suivant s’appelle une **octave**.',
        },
      },
      {
        ul: [
          { de: 'C = Do', en: 'C = Do', fr: 'C = Do' },
          { de: 'D = Re', en: 'D = Re', fr: 'D = Ré' },
          { de: 'E = Mi', en: 'E = Mi', fr: 'E = Mi' },
          { de: 'F = Fa', en: 'F = Fa', fr: 'F = Fa' },
          { de: 'G = Sol', en: 'G = Sol', fr: 'G = Sol' },
          { de: 'A = La', en: 'A = La', fr: 'A = La' },
          { de: 'B = Si (im Deutschen: H)', en: 'B = Ti or Si (in German: H)', fr: 'B = Si (en allemand : H)' },
        ],
      },
      { h2: { de: 'B oder H?', en: 'B or H?', fr: 'B ou H ?' } },
      {
        p: {
          de: 'In Deutschland, Österreich und der Schweiz heißt der siebte Ton traditionell **H**. Mit **B** ist dann der Ton einen kleinen Schritt darunter gemeint, international **Bb**. Das führt oft zu Verwirrung. In dieser App verwenden wir die internationalen Namen: **B** ist der Ton direkt unter C, **Bb** der Ton einen Halbton tiefer. Liest du in einem deutschen Liederbuch **H7**, spielst du hier **B7**.',
          en: 'In German-speaking countries the seventh note is traditionally called **H**, and “B” means the note one half step lower – Bb in English. That causes a lot of confusion. This app always uses the international names: **B** is the note just below C, and **Bb** is one half step lower. If a German songbook says **H7**, play **B7**.',
          fr: 'Dans les pays germanophones, la septième note s’appelle traditionnellement **H**, et « B » y désigne la note un demi-ton plus bas, notre Si bémol (Bb). C’est souvent source de confusion. Cette appli utilise toujours les noms internationaux : **B** est la note juste sous Do, **Bb** est un demi-ton plus bas. Si un recueil allemand indique **H7**, joue **B7**.',
        },
      },
      { h2: { de: 'Die Töne dazwischen', en: 'The notes in between', fr: 'Les notes entre les notes' } },
      {
        p: {
          de: 'Zwischen den meisten Tönen liegt noch ein weiterer Ton. Er bekommt ein **#** (Kreuz, eins höher) oder ein **b** (eins tiefer). Zwischen C und D liegt also C# oder Db – zwei Namen für denselben Ton. Nur zwischen **E und F** und zwischen **B und C** gibt es keinen Zwischenton. Zusammen sind es zwölf verschiedene Töne, jeder einen **Halbton** vom nächsten entfernt.',
          en: 'Between most notes there’s another note. It gets a **#** (sharp, one step higher) or a **b** (flat, one step lower). So between C and D sits C# or Db – two names for the same note. Only **E–F** and **B–C** have no note in between. Altogether there are twelve different notes, each a **half step** from the next.',
          fr: 'Entre la plupart des notes, il y a encore une note. Elle porte un **#** (dièse, un cran plus haut) ou un **b** (bémol, un cran plus bas). Entre Do et Ré se trouve donc Do dièse ou Ré bémol : deux noms pour la même note. Seuls **Mi–Fa** et **Si–Do** n’ont pas de note entre eux. En tout, il y a douze notes différentes, séparées chacune d’un **demi-ton**.',
        },
      },
      {
        tip: {
          de: 'Auf deinem Instrument ist jeder Bund genau ein Halbton. Rutschst du auf einer Saite einen Bund höher, wird der Ton einen Halbton höher. Zwölf Bünde weiter klingt die Saite wieder wie leer – nur eine Oktave höher. Am 12. Bund ist deshalb oft ein besonderer Punkt.',
          en: 'On your instrument every fret is exactly one half step. Move up one fret on a string and the note goes up a half step. Twelve frets up, the string sounds like the open string again – just an octave higher. That’s why the 12th fret often has a special marker.',
          fr: 'Sur ton instrument, chaque case vaut exactement un demi-ton. Monte d’une case sur une corde et la note monte d’un demi-ton. Douze cases plus loin, la corde sonne comme à vide, mais une octave plus haut. C’est pour ça que la 12e case porte souvent un repère spécial.',
        },
      },
      { h2: { de: 'Töne auf dem Instrument finden', en: 'Finding notes on your instrument', fr: 'Trouver les notes sur l’instrument' } },
      {
        p: {
          de: 'Jede leere Saite hat einen Namen. Von dort zählst du die Bünde hoch. Ein Beispiel: Ist eine Saite auf G gestimmt, liegt im 2. Bund das A, im 4. Bund das B und im 5. Bund das C. Der Akkord-Detektiv in der App zeigt dir zu jedem gespielten Ton seinen Namen und alle Stellen, an denen du ihn auf dem Hals findest. Und im Stimmgerät siehst du die Namen der leeren Saiten.',
          en: 'Every open string has a name. From there you count up the frets. For example, if a string is tuned to G, the 2nd fret is A, the 4th fret is B and the 5th fret is C. The Chord Detective in the app tells you the name of any note you play and shows every place you can find it on the neck. The tuner shows the names of the open strings.',
          fr: 'Chaque corde à vide a un nom. À partir de là, tu comptes les cases. Par exemple, si une corde est accordée en Sol, la 2e case donne La, la 4e Si et la 5e Do. Le Détective d’accords de l’appli te donne le nom de chaque note jouée et toutes les positions où la trouver sur le manche. L’accordeur affiche les noms des cordes à vide.',
        },
      },
      { tool: 'detektiv' },
      { tool: 'stimmen' },
    ],
    related: ['akkordsymbole-lesen', 'transponieren', 'tabulatur-lesen'],
  },
  {
    id: 'transponieren',
    slug: { de: 'transponieren-tonarten', en: 'transpose-keys', fr: 'transposer-tonalites' },
    instruments: ['ukulele', 'gitarre', 'banjo', 'bariton'],
    category: 'theorie',
    title: {
      de: 'Transponieren: Lieder in eine andere Tonart bringen',
      en: 'How to Transpose a Song into Another Key',
      fr: 'Transposer une chanson dans une autre tonalité',
    },
    description: {
      de: 'Was eine Tonart ist und wie du ein Lied transponierst, damit es leichter zu greifen oder besser zu singen ist – mit Tonleiter-Trick und Beispiel.',
      en: 'What a key is and how to transpose a song so it’s easier to play or more comfortable to sing – with a simple note-ladder trick and an example.',
      fr: 'Ce qu’est une tonalité et comment transposer une chanson pour la jouer plus facilement ou la chanter plus confortablement, avec une astuce simple.',
    },
    blocks: [
      {
        p: {
          de: 'Jedes Lied hat eine **Tonart**. Sie sagt, um welchen Ton sich das Lied dreht – meistens ist das der erste und der letzte Akkord. Ein Lied mit den Akkorden C, F und G7 steht in **C-Dur**. Manchmal ist eine Tonart zu hoch oder zu tief zum Singen, oder ein Akkord ist schwer zu greifen. Dann kannst du das Lied **transponieren**: Du verschiebst alle Akkorde um denselben Abstand.',
          en: 'Every song has a **key**. It tells you which note the song revolves around – usually the first and last chord. A song with C, F and G7 is in **C major**. Sometimes a key is too high or too low to sing, or one chord is hard to play. Then you can **transpose** the song: you shift every chord by the same distance.',
          fr: 'Chaque chanson a une **tonalité**. Elle indique autour de quelle note tourne la chanson, le plus souvent le premier et le dernier accord. Une chanson avec C, F et G7 est en **Do majeur**. Parfois, une tonalité est trop aiguë ou trop grave pour chanter, ou un accord est difficile. Tu peux alors **transposer** la chanson : décaler tous les accords du même écart.',
        },
      },
      { h2: { de: 'Die Ton-Leiter als Hilfe', en: 'The note ladder', fr: 'L’échelle des notes' } },
      {
        p: {
          de: 'Schreib dir die zwölf Töne im Kreis oder in einer Reihe auf:',
          en: 'Write out the twelve notes in a row or a circle:',
          fr: 'Écris les douze notes en ligne ou en cercle :',
        },
      },
      {
        p: {
          de: '**C – C# – D – Eb – E – F – F# – G – Ab – A – Bb – B** – und dann wieder C.',
          en: '**C – C# – D – Eb – E – F – F# – G – Ab – A – Bb – B** – and back to C.',
          fr: '**C – C# – D – Eb – E – F – F# – G – Ab – A – Bb – B** – puis de nouveau C.',
        },
      },
      {
        p: {
          de: 'Jeder Schritt ist ein Halbton. Willst du ein Lied zwei Halbtöne höher spielen, gehst du bei jedem Akkord zwei Schritte nach rechts. Das Anhängsel bleibt dabei gleich: Aus **Am** wird **Bm**, aus **G7** wird **A7**.',
          en: 'Each step is a half step. To move a song two half steps higher, move every chord two places to the right. The ending stays the same: **Am** becomes **Bm**, **G7** becomes **A7**.',
          fr: 'Chaque pas est un demi-ton. Pour jouer une chanson deux demi-tons plus haut, avance chaque accord de deux cases vers la droite. Ce qui suit la lettre ne change pas : **Am** devient **Bm**, **G7** devient **A7**.',
        },
      },
      { h2: { de: 'Ein Beispiel', en: 'An example', fr: 'Un exemple' } },
      {
        p: {
          de: 'Ein Lied in C-Dur mit **C, F, G7** soll fünf Halbtöne tiefer klingen. Fünf Schritte nach links ergibt **G, C, D7**. Auf der Gitarre, der Bariton-Ukulele und dem Banjo liegt G-Dur besonders gut, auf der Ukulele fühlt sich C-Dur oder F-Dur oft leichter an. Darum transponieren Musikerinnen und Musiker ständig.',
          en: 'A song in C major with **C, F, G7** should sound five half steps lower. Five steps to the left gives **G, C, D7**. On guitar, baritone ukulele and banjo G major is especially comfortable; on ukulele C or F major often feels easier. That’s why musicians transpose all the time.',
          fr: 'Une chanson en Do majeur avec **C, F, G7** doit sonner cinq demi-tons plus bas. Cinq pas vers la gauche donnent **G, C, D7**. À la guitare, au ukulélé baryton et au banjo, Sol majeur est très confortable ; au ukulélé, Do ou Fa majeur sont souvent plus faciles. C’est pour ça que les musiciens transposent sans arrêt.',
        },
      },
      { chord: 'C' },
      { chord: 'G' },
      {
        tip: {
          de: 'Singen geht vor! Wenn ein Kind beim Mitsingen piepsen oder brummen muss, ist die Tonart nicht passend. Probier ein, zwei Halbtöne höher oder tiefer, bis es bequem klingt.',
          en: 'Singing comes first! If a child has to squeak or growl to sing along, the key doesn’t fit. Try one or two half steps higher or lower until it feels comfortable.',
          fr: 'Le chant d’abord ! Si un enfant doit couiner ou grogner pour chanter, la tonalité ne convient pas. Essaie un ou deux demi-tons plus haut ou plus bas jusqu’à ce que ce soit confortable.',
        },
      },
      { h2: { de: 'Transponieren in der App', en: 'Transposing in the app', fr: 'Transposer dans l’appli' } },
      {
        ul: [
          {
            de: 'Bei jedem Lied kannst du die Tonart ändern. Alle Akkorde und Griffbilder passen sich sofort an.',
            en: 'You can change the key of any song. All chords and chord diagrams update instantly.',
            fr: 'Tu peux changer la tonalité de chaque chanson. Tous les accords et toutes les grilles s’adaptent aussitôt.',
          },
          {
            de: 'Ein **★** markiert einen Tonart-Vorschlag mit möglichst leichten Griffen.',
            en: 'A **★** marks a suggested key with the easiest chords.',
            fr: 'Une **★** indique une tonalité conseillée, avec les accords les plus faciles.',
          },
          {
            de: 'Ein **◆** zeigt die Original- oder Quellentonart des Liedes.',
            en: 'A **◆** shows the song’s original or source key.',
            fr: 'Un **◆** indique la tonalité d’origine ou celle de la source.',
          },
        ],
      },
      {
        p: {
          de: 'Bei Gitarre und Banjo gibt es noch einen Trick: den **Kapodaster**. Er verkürzt alle Saiten auf einmal. Du greifst weiter die gewohnten Akkorde, aber das Lied klingt höher. Damit kannst du die Tonart wechseln, ohne neue Griffe zu lernen. Wie die Töne heißen, steht in [Töne und Notennamen](wissen:toene-und-notennamen).',
          en: 'Guitar and banjo players have one more trick: the **capo**. It shortens all strings at once. You keep playing your familiar chord shapes, but the song sounds higher. That way you can change key without learning new chords. The note names are explained in [Note names](wissen:toene-und-notennamen).',
          fr: 'Les guitaristes et les banjoïstes ont une autre astuce : le **capodastre**. Il raccourcit toutes les cordes d’un coup. Tu gardes les accords habituels, mais la chanson sonne plus haut. Tu changes ainsi de tonalité sans apprendre de nouveaux accords. Les noms des notes sont expliqués dans [Les noms des notes](wissen:toene-und-notennamen).',
        },
      },
      { tool: 'lieder' },
    ],
    related: ['toene-und-notennamen', 'akkordsymbole-lesen', 'lieder-fuer-anfaenger'],
  },
  {
    id: 'tabulatur-lesen',
    slug: { de: 'tabulatur-lesen', en: 'read-tabs', fr: 'lire-tablature' },
    instruments: ['ukulele', 'gitarre', 'banjo', 'bariton'],
    category: 'theorie',
    title: {
      de: 'Tabulatur lesen lernen – Tabs einfach erklärt',
      en: 'How to Read Tabs: Tablature Explained for Beginners',
      fr: 'Lire une tablature : les tabs expliquées aux débutants',
    },
    description: {
      de: 'Tabulatur lesen ohne Noten: Was die Linien und Zahlen bedeuten und wie du Melodien Saite für Saite spielst. Für Ukulele, Gitarre und Banjo.',
      en: 'Read tabs without sheet music: what the lines and numbers mean and how to play melodies string by string. For ukulele, guitar and banjo.',
      fr: 'Lire une tablature sans solfège : ce que signifient les lignes et les chiffres, et comment jouer une mélodie corde par corde. Ukulélé, guitare, banjo.',
    },
    blocks: [
      {
        p: {
          de: 'Noten lesen dauert eine Weile. Für Saiteninstrumente gibt es eine Abkürzung: die **Tabulatur**, kurz **Tab**. Sie zeigt nicht, wie ein Ton heißt, sondern **wo** du ihn greifst: auf welcher Saite und in welchem Bund. Damit kannst du schon am ersten Tag eine Melodie spielen.',
          en: 'Learning to read sheet music takes a while. String players have a shortcut: **tablature**, or **tab** for short. It doesn’t tell you the name of a note but **where** to play it: which string and which fret. That means you can play a melody on day one.',
          fr: 'Apprendre à lire les notes prend du temps. Pour les instruments à cordes, il existe un raccourci : la **tablature**, ou **tab**. Elle n’indique pas le nom de la note, mais **où** la jouer : sur quelle corde et à quelle case. Tu peux ainsi jouer une mélodie dès le premier jour.',
        },
      },
      { h2: { de: 'Linien sind Saiten', en: 'Lines are strings', fr: 'Les lignes sont les cordes' } },
      {
        p: {
          de: 'Eine Tab hat so viele waagerechte Linien, wie dein Instrument Saiten hat: vier bei der Ukulele, sechs bei der Gitarre, fünf beim Banjo. Die **oberste Linie** ist die Saite, die am **höchsten** klingt – also die, die beim Spielen dem Boden am nächsten ist. Das verwirrt am Anfang, weil es wie auf den Kopf gestellt aussieht. Stell dir einfach vor, du schaust von oben auf dein Instrument auf dem Schoß.',
          en: 'A tab has as many horizontal lines as your instrument has strings: four for ukulele, six for guitar, five for banjo. The **top line** is the **highest-sounding** string – the one closest to the floor when you play. That’s confusing at first because it looks upside down. Just imagine looking down at the instrument lying in your lap.',
          fr: 'Une tablature a autant de lignes horizontales que ton instrument a de cordes : quatre pour le ukulélé, six pour la guitare, cinq pour le banjo. La **ligne du haut** est la corde **la plus aiguë**, celle qui est la plus proche du sol quand tu joues. Au début, ça semble à l’envers. Imagine simplement que tu regardes ton instrument posé à plat sur tes genoux.',
        },
      },
      { h2: { de: 'Zahlen sind Bünde', en: 'Numbers are frets', fr: 'Les chiffres sont les cases' } },
      {
        ul: [
          {
            de: '**0** heißt: leere Saite, nichts greifen.',
            en: '**0** means open string – don’t press anything.',
            fr: '**0** veut dire corde à vide, sans appuyer.',
          },
          {
            de: '**1, 2, 3 …** heißt: Diesen Bund drücken und die Saite anschlagen.',
            en: '**1, 2, 3 …** means press that fret and pluck the string.',
            fr: '**1, 2, 3…** veut dire appuyer sur cette case et pincer la corde.',
          },
          {
            de: 'Du liest von **links nach rechts**, wie in einem Buch.',
            en: 'You read from **left to right**, just like a book.',
            fr: 'On lit de **gauche à droite**, comme un livre.',
          },
          {
            de: 'Stehen mehrere Zahlen **genau übereinander**, spielst du sie gleichzeitig – das ist dann ein Akkord.',
            en: 'Numbers stacked **directly on top of each other** are played together – that’s a chord.',
            fr: 'Des chiffres **les uns au-dessus des autres** se jouent en même temps : c’est un accord.',
          },
        ],
      },
      {
        tip: {
          de: 'Die Zahl sagt dir den Bund, nicht den Finger. Welchen Finger du nimmst, entscheidest du – meistens Zeigefinger für Bund 1, Mittelfinger für Bund 2 und Ringfinger für Bund 3.',
          en: 'The number tells you the fret, not the finger. You choose the finger – usually index for fret 1, middle for fret 2 and ring finger for fret 3.',
          fr: 'Le chiffre indique la case, pas le doigt. C’est toi qui choisis le doigt : en général l’index pour la case 1, le majeur pour la 2 et l’annulaire pour la 3.',
        },
      },
      { h2: { de: 'Was die Tab nicht verrät', en: 'What tab doesn’t tell you', fr: 'Ce que la tablature ne dit pas' } },
      {
        p: {
          de: 'Eine einfache Tab zeigt oft nicht, wie lang ein Ton dauert. Darum hilft es sehr, die Melodie schon zu kennen oder sie vorher anzuhören. Manche Tabs haben zusätzlich Rhythmuszeichen oder Liedtext darunter. Bei Banjo-Tabs steht oft noch ein Buchstabe dabei, der den Finger der Zupfhand angibt: T für Daumen, I für Zeigefinger, M für Mittelfinger.',
          en: 'A simple tab often doesn’t show how long each note lasts. That’s why it really helps to know the tune already or listen to it first. Some tabs add rhythm marks or lyrics underneath. Banjo tabs often add a letter for the picking-hand finger: T for thumb, I for index, M for middle.',
          fr: 'Une tablature simple n’indique souvent pas la durée des notes. C’est pourquoi il aide beaucoup de connaître déjà la mélodie ou de l’écouter avant. Certaines tablatures ajoutent des signes de rythme ou les paroles en dessous. Au banjo, une lettre indique souvent le doigt de la main droite : T pour le pouce (thumb), I pour l’index, M pour le majeur.',
        },
      },
      { h2: { de: 'Tabs in der App', en: 'Tabs in the app', fr: 'Les tablatures dans l’appli' } },
      {
        p: {
          de: 'Bei Liedern mit Melodie kannst du die Tabulatur einblenden: Unter jeder Silbe stehen dann Saite und Bund. Probier es mit [Alle meine Entchen](lied:alle-meine-entchen) oder [Twinkle, Twinkle, Little Star](lied:twinkle). Auch beim Blues siehst du die Töne direkt auf dem Hals, wie in einer Tab.',
          en: 'For songs with a melody you can show the tab: the string and fret appear under every syllable. Try [Twinkle, Twinkle, Little Star](lied:twinkle) or [Alle meine Entchen](lied:alle-meine-entchen). In the blues tool, too, you see the notes right on the neck, just like a tab.',
          fr: 'Pour les chansons avec mélodie, tu peux afficher la tablature : la corde et la case apparaissent sous chaque syllabe. Essaie [Twinkle, Twinkle, Little Star](lied:twinkle) ou [Alle meine Entchen](lied:alle-meine-entchen). Dans l’outil Blues aussi, tu vois les notes directement sur le manche, comme dans une tablature.',
        },
      },
      { tool: 'lieder' },
      { tool: 'blues' },
    ],
    related: ['toene-und-notennamen', 'zwoelf-takt-blues', 'lieder-fuer-anfaenger'],
  },
  {
    id: 'zwoelf-takt-blues',
    slug: { de: 'zwoelf-takt-blues', en: 'twelve-bar-blues', fr: 'blues-douze-mesures' },
    instruments: ['ukulele', 'gitarre', 'banjo', 'bariton'],
    category: 'theorie',
    title: {
      de: '12-Takt-Blues lernen: Das Grundschema für Einsteiger',
      en: '12-Bar Blues for Beginners: The Basic Pattern',
      fr: 'Le blues en 12 mesures pour débutants : la grille de base',
    },
    description: {
      de: 'Der 12-Takt-Blues mit nur drei Akkorden: Schema, Zählen, erste Töne zum Improvisieren und wie du mit einer Begleitband übst. Ideal für Kinder.',
      en: 'The 12-bar blues with just three chords: the pattern, how to count it, first notes to improvise with and how to jam with a backing band. Great for kids.',
      fr: 'Le blues en 12 mesures avec trois accords : la grille, le comptage, les premières notes pour improviser et comment jouer avec un groupe d’accompagnement.',
    },
    blocks: [
      {
        p: {
          de: 'Der Blues ist eine der wichtigsten Musikformen überhaupt. Aus ihm sind Rock, Jazz und viele Popsongs entstanden. Das Beste: Sein Grundgerüst ist ganz einfach. Es besteht aus **12 Takten** und nur **drei Akkorden**. Wenn du diese Form kennst, kannst du mit Musikerinnen und Musikern auf der ganzen Welt zusammen spielen.',
          en: 'The blues is one of the most important styles of music ever. Rock, jazz and countless pop songs grew out of it. The best part: its framework is really simple – **12 bars** and just **three chords**. Once you know this form, you can jam with musicians all over the world.',
          fr: 'Le blues est l’un des styles les plus importants de la musique. Le rock, le jazz et de nombreuses chansons pop en sont issus. Et sa structure est très simple : **12 mesures** et seulement **trois accords**. Quand tu connais cette grille, tu peux jouer avec des musiciens du monde entier.',
        },
      },
      { h2: { de: 'Das Schema in C', en: 'The pattern in C', fr: 'La grille en Do' } },
      {
        p: {
          de: 'Jeder Takt hat vier Schläge. So sieht der 12-Takt-Blues in C aus – eine Zeile sind vier Takte:',
          en: 'Each bar has four beats. Here’s the 12-bar blues in C – each line is four bars:',
          fr: 'Chaque mesure compte quatre temps. Voici le blues en 12 mesures en Do – chaque ligne fait quatre mesures :',
        },
      },
      {
        ol: [
          { de: '**C | C | C | C**', en: '**C | C | C | C**', fr: '**C | C | C | C**' },
          { de: '**F | F | C | C**', en: '**F | F | C | C**', fr: '**F | F | C | C**' },
          { de: '**G7 | F | C | G7**', en: '**G7 | F | C | G7**', fr: '**G7 | F | C | G7**' },
        ],
      },
      { chord: 'C' },
      { chord: 'F' },
      { chord: 'G7' },
      {
        p: {
          de: 'Im letzten Takt führt G7 wieder zurück zum Anfang, und alles beginnt von vorn. Blues-Musiker spielen gern alle drei Akkorde als Septakkorde, also C7, F7 und G7. Das klingt noch „bluesiger“. Zum Lernen reichen aber die einfachen Griffe.',
          en: 'In the last bar G7 leads back to the start, and the whole thing begins again. Blues players love to play all three chords as sevenths – C7, F7 and G7 – for an even bluesier sound. To get started, the simple chords are all you need.',
          fr: 'Dans la dernière mesure, G7 ramène au début et tout recommence. Les bluesmen aiment jouer les trois accords en septième (C7, F7 et G7), ce qui sonne encore plus « blues ». Pour apprendre, les accords simples suffisent.',
        },
      },
      {
        tip: {
          de: 'Zähle laut die Takte mit: „**1**-2-3-4, **2**-2-3-4, **3**-2-3-4 …“. Die erste Zahl sagt dir, in welchem Takt du bist. So verlierst du nie den Faden.',
          en: 'Count the bars out loud: “**1**-2-3-4, **2**-2-3-4, **3**-2-3-4 …”. The first number tells you which bar you’re in, so you never lose your place.',
          fr: 'Compte les mesures à voix haute : « **1**-2-3-4, **2**-2-3-4, **3**-2-3-4… ». Le premier chiffre te dit dans quelle mesure tu es : tu ne te perds jamais.',
        },
      },
      { h2: { de: 'Der Blues in anderen Tonarten', en: 'The blues in other keys', fr: 'Le blues dans d’autres tonalités' } },
      {
        p: {
          de: 'Das Schema funktioniert in jeder Tonart. Man nennt die drei Akkorde oft **I, IV und V** – nach ihrer Stufe in der Tonleiter. In G sind das G, C und D7, in A sind es A, D und E7. Auf der Gitarre, der Bariton-Ukulele und dem Banjo ist der Blues in G oder A beliebt, auf der Ukulele in C. Mehr dazu in [Transponieren](wissen:transponieren).',
          en: 'The pattern works in any key. The three chords are often called **I, IV and V** after their place in the scale. In G they’re G, C and D7; in A they’re A, D and E7. On guitar, baritone ukulele and banjo the blues in G or A is popular, on ukulele the blues in C. More in [Transposing](wissen:transponieren).',
          fr: 'La grille fonctionne dans toutes les tonalités. On appelle souvent les trois accords **I, IV et V**, d’après leur degré dans la gamme. En Sol, ce sont G, C et D7 ; en La, A, D et E7. À la guitare, au ukulélé baryton et au banjo, on aime le blues en Sol ou en La ; au ukulélé, en Do. Plus d’infos dans [Transposer](wissen:transponieren).',
        },
      },
      { h2: { de: 'Selbst Töne spielen', en: 'Playing your own notes', fr: 'Jouer tes propres notes' } },
      {
        ul: [
          {
            de: '**Stufe 1:** Spiel nur den Grundton des Akkords, einmal pro Takt.',
            en: '**Step 1:** play just the root note of each chord, once per bar.',
            fr: '**Étape 1 :** joue seulement la fondamentale de chaque accord, une fois par mesure.',
          },
          {
            de: '**Stufe 2:** Grundton und Quinte im Wechsel – das klingt schon wie eine Basslinie.',
            en: '**Step 2:** alternate root and fifth – it already sounds like a bass line.',
            fr: '**Étape 2 :** alterne fondamentale et quinte : on dirait déjà une ligne de basse.',
          },
          {
            de: '**Stufe 3:** ein kleines Boogie-Riff, das mit den Akkorden mitwandert.',
            en: '**Step 3:** a little boogie riff that moves along with the chords.',
            fr: '**Étape 3 :** un petit riff boogie qui suit les accords.',
          },
          {
            de: '**Stufe 4:** frei spielen mit den Tönen der Blues-Tonleiter. Hier gibt es keine verbotenen Töne – probier einfach aus!',
            en: '**Step 4:** improvise freely with the notes of the blues scale. There are no forbidden notes here – just try things out!',
            fr: '**Étape 4 :** improvise librement avec les notes de la gamme blues. Ici, aucune note n’est interdite : essaie !',
          },
        ],
      },
      {
        p: {
          de: 'Genau diese vier Stufen findest du im Blues-Werkzeug der App. Eine Begleitband mit Bass, Orgel und Schlagzeug spielt das Schema, die Töne leuchten als Punkte auf dem Hals, und du kannst die Tonart frei wählen.',
          en: 'You’ll find exactly these four steps in the app’s blues tool. A backing band with bass, organ and drums plays the pattern, the notes light up as dots on the neck, and you can pick any key you like.',
          fr: 'Tu retrouves exactement ces quatre étapes dans l’outil Blues de l’appli. Un groupe avec basse, orgue et batterie joue la grille, les notes s’affichent en points sur le manche, et tu choisis librement la tonalité.',
        },
      },
      { tool: 'blues' },
    ],
    related: ['transponieren', 'takt-und-taktarten', 'tabulatur-lesen'],
  },
];
