import type { Article } from './types.ts';

export const MANDOLINE_ARTICLES: Article[] = [
  {
    id: 'mandoline-stimmen',
    slug: { de: 'mandoline-stimmen', en: 'tune-mandolin', fr: 'accorder-mandoline' },
    instruments: ['mandoline'],
    category: 'erste-schritte',
    title: {
      de: 'Mandoline stimmen (G D A E) – auch die Doppelsaiten',
      en: 'How to Tune a Mandolin (G D A E) – Including the Double Strings',
      fr: 'Accorder une mandoline (G D A E), cordes doubles comprises',
    },
    description: {
      de: 'Mandoline stimmen in G D A E: mit Stimmgerät oder nach Gehör, Saitenpaar für Saitenpaar – und wie du hörst, ob beide Saiten eines Paares gleich klingen.',
      en: 'Tune your mandolin to G D A E with a tuner or by ear, pair by pair – and how to hear whether both strings of a pair sound exactly the same.',
      fr: 'Accorder ta mandoline en G D A E avec un accordeur ou à l’oreille, paire par paire – et entendre si les deux cordes d’une paire sonnent pareil.',
    },
    blocks: [
      {
        p: {
          de: 'Die Mandoline hat **acht Saiten**, aber nur **vier verschiedene Töne**: Je zwei Saiten liegen dicht nebeneinander und sind genau gleich gestimmt. So ein Saitenpaar heißt **Chor**. Du greifst und schlägst immer beide Saiten eines Paares zusammen an – deshalb klingt die Mandoline so hell und glitzernd.',
          en: 'A mandolin has **eight strings** but only **four different notes**: the strings come in pairs that lie close together and are tuned exactly the same. Such a pair is called a **course**. You always fret and pick both strings of a pair together – that’s what gives the mandolin its bright, shimmering sound.',
          fr: 'La mandoline a **huit cordes** mais seulement **quatre notes différentes** : les cordes vont par deux, très proches l’une de l’autre et accordées exactement pareil. Une telle paire s’appelle un **chœur**. Tu appuies et tu joues toujours les deux cordes d’une paire ensemble – c’est ce qui donne à la mandoline son son clair et scintillant.',
        },
      },
      { h2: { de: 'Die Zieltöne', en: 'The target notes', fr: 'Les notes à obtenir' } },
      {
        ul: [
          { de: '4. Saitenpaar (oben, das tiefste): **G** (G3)', en: 'Course 4 (top, the lowest): **G** (G3)', fr: '4e paire (en haut, la plus grave) : **G** (Sol, G3)' },
          { de: '3. Saitenpaar: **D** (D4)', en: 'Course 3: **D** (D4)', fr: '3e paire : **D** (Ré, D4)' },
          { de: '2. Saitenpaar: **A** (A4)', en: 'Course 2: **A** (A4)', fr: '2e paire : **A** (La, A4)' },
          { de: '1. Saitenpaar (unten, das höchste): **E** (E5)', en: 'Course 1 (bottom, the highest): **E** (E5)', fr: '1re paire (en bas, la plus aiguë) : **E** (Mi, E5)' },
        ],
      },
      {
        p: {
          de: 'Von Saitenpaar zu Saitenpaar liegen immer genau **fünf Töne** (eine Quinte) dazwischen – genau wie bei der Geige. Die G- und die D-Saiten sind dicker und mit Draht umsponnen, die A- und E-Saiten sind glatt und dünn.',
          en: 'From one pair to the next there is always exactly a **fifth** – just like on a violin. The G and D strings are thicker and wound with wire; the A and E strings are plain and thin.',
          fr: 'D’une paire à l’autre, il y a toujours exactement une **quinte** – comme sur un violon. Les cordes G et D sont plus épaisses et filées ; les cordes A et E sont lisses et fines.',
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
            de: 'Leg einen Finger der linken Hand ganz leicht auf **eine** Saite des Paares, damit sie nicht klingt. Zupf die andere Saite an.',
            en: 'Rest one finger of your fretting hand lightly on **one** string of the pair so it doesn’t ring. Pluck the other string.',
            fr: 'Pose très légèrement un doigt de la main gauche sur **une** corde de la paire pour qu’elle ne sonne pas. Pince l’autre corde.',
          },
          {
            de: 'Ist der Ton zu tief, drehst du den Wirbel so, dass die Saite straffer wird. Ist er zu hoch, lockerst du sie ein wenig. Dreh in kleinen Schritten.',
            en: 'If the note is too low, turn the peg to tighten the string. If it’s too high, loosen it a little. Turn in small steps.',
            fr: 'Si la note est trop grave, tourne la mécanique pour tendre la corde. Si elle est trop aiguë, détends-la un peu. Tourne par petites touches.',
          },
          {
            de: 'Jetzt dämpfst du die gestimmte Saite und stimmst die zweite Saite des Paares genauso. Dann kommt das nächste Paar dran.',
            en: 'Now mute the string you just tuned and tune the second string of the pair the same way. Then move on to the next pair.',
            fr: 'Étouffe maintenant la corde que tu viens d’accorder et accorde la deuxième corde de la paire de la même façon. Puis passe à la paire suivante.',
          },
        ],
      },
      { tool: 'stimmen' },
      { h2: { de: 'Klingen beide Saiten gleich?', en: 'Do both strings match?', fr: 'Les deux cordes sont-elles pareilles ?' } },
      {
        p: {
          de: 'Schlag zum Schluss jedes Paar zusammen an und hör genau hin. Sind beide Saiten gleich, klingt der Ton ruhig und klar. Ist eine Saite ein kleines bisschen daneben, hörst du ein **Wabern** – „wa-wa-wa“. Dreh die zweite Saite ganz langsam, bis das Wabern immer langsamer wird und verschwindet.',
          en: 'Finally, pick each pair together and listen closely. If both strings match, the note sounds calm and clear. If one string is a tiny bit off, you’ll hear a **wobble** – “wah-wah-wah”. Turn the second string very slowly until the wobble gets slower and disappears.',
          fr: 'Pour finir, joue chaque paire ensemble et écoute bien. Si les deux cordes sont pareilles, la note est calme et nette. Si une corde est un tout petit peu à côté, tu entends une **ondulation** – « oua-oua-oua ». Tourne très lentement la deuxième corde jusqu’à ce que l’ondulation ralentisse et disparaisse.',
        },
      },
      { h2: { de: 'Nach Gehör: immer der 7. Bund', en: 'By ear: always the 7th fret', fr: 'À l’oreille : toujours la 7e case' } },
      {
        p: {
          de: 'Weil alle Paare eine Quinte auseinanderliegen, gilt überall dieselbe Regel: Der **7. Bund** eines Paares klingt wie das nächste Paar leer.',
          en: 'Because all pairs are a fifth apart, the same rule works everywhere: the **7th fret** of one pair sounds like the next pair open.',
          fr: 'Comme toutes les paires sont espacées d’une quinte, la même règle marche partout : la **7e case** d’une paire sonne comme la paire suivante à vide.',
        },
      },
      {
        ul: [
          { de: 'G-Saiten im **7. Bund** = D-Saiten leer', en: 'G strings at the **7th fret** = D strings open', fr: 'Cordes G à la **7e case** = cordes D à vide' },
          { de: 'D-Saiten im **7. Bund** = A-Saiten leer', en: 'D strings at the **7th fret** = A strings open', fr: 'Cordes D à la **7e case** = cordes A à vide' },
          { de: 'A-Saiten im **7. Bund** = E-Saiten leer', en: 'A strings at the **7th fret** = E strings open', fr: 'Cordes A à la **7e case** = cordes E à vide' },
        ],
      },
      {
        tip: {
          de: 'Der Steg einer Mandoline ist nicht festgeklebt, er wird nur von den Saiten gehalten. Schau beim Stimmen ab und zu, ob er noch gerade steht. Kippt er nach vorn, bitte einen Erwachsenen oder deine Lehrkraft, ihn vorsichtig wieder aufzurichten.',
          en: 'A mandolin’s bridge isn’t glued; only the strings hold it in place. While tuning, check now and then that it still stands straight. If it starts to lean forward, ask an adult or your teacher to straighten it carefully.',
          fr: 'Le chevalet d’une mandoline n’est pas collé : seules les cordes le tiennent. Pendant l’accordage, vérifie de temps en temps qu’il reste bien droit. S’il penche vers l’avant, demande à un adulte ou à ton professeur de le redresser doucement.',
        },
      },
    ],
    related: ['mandoline-erste-akkorde', 'mandoline-und-geige', 'saiten-wechseln-pflege', 'toene-und-notennamen'],
  },
  {
    id: 'mandoline-erste-akkorde',
    slug: { de: 'mandoline-erste-akkorde', en: 'first-mandolin-chords', fr: 'premiers-accords-mandoline' },
    instruments: ['mandoline'],
    category: 'akkorde',
    title: {
      de: 'Die ersten Akkorde auf der Mandoline: G, C, D und Em',
      en: 'Your First Mandolin Chords: G, C, D and Em',
      fr: 'Les premiers accords à la mandoline : G, C, D et Em',
    },
    description: {
      de: 'Mandoline lernen für Anfänger: die ersten Akkorde G, C, D und Em mit Griffbildern, der erste Akkordwechsel und wie du Doppelsaiten sauber greifst.',
      en: 'Learn mandolin as a beginner: your first chords G, C, D and Em with diagrams, your first chord change and how to fret double strings cleanly.',
      fr: 'Apprendre la mandoline : les premiers accords G, C, D et Em avec diagrammes, le premier changement d’accord et comment bien appuyer les cordes doubles.',
    },
    blocks: [
      {
        p: {
          de: 'Mit **G, C und D** kannst du auf der Mandoline schon sehr viele Lieder begleiten, mit **Em** noch mehr. Alle vier Griffe liegen ganz am Anfang des Halses und brauchen nur zwei Finger.',
          en: 'With **G, C and D** you can already accompany lots of songs on the mandolin, and even more with **Em**. All four chords sit right at the start of the neck and need only two fingers.',
          fr: 'Avec **G, C et D**, tu peux déjà accompagner plein de chansons à la mandoline, et encore plus avec **Em**. Les quatre accords sont tout en haut du manche et n’utilisent que deux doigts.',
        },
      },
      { h2: { de: 'Doppelsaiten greifen', en: 'Fretting double strings', fr: 'Appuyer sur les cordes doubles' } },
      {
        p: {
          de: 'Jeder Finger drückt immer **beide Saiten eines Paares** zugleich. Setz die Fingerkuppe mittig auf das Paar, dicht hinter das Bundstäbchen. Die Bünde der Mandoline liegen eng beieinander – deshalb hat auf ihr jeder Finger seinen eigenen Bund: Zeigefinger im 1. oder 2., Mittelfinger im 2. oder 3., Ringfinger im 3. bis 5. Bund.',
          en: 'Each finger always presses **both strings of a pair** at once. Place your fingertip in the middle of the pair, just behind the fret. The frets on a mandolin are close together – so each finger gets its own fret: index finger on the 1st or 2nd, middle finger on the 2nd or 3rd, ring finger on the 3rd to 5th fret.',
          fr: 'Chaque doigt appuie toujours sur **les deux cordes d’une paire** à la fois. Pose le bout du doigt au milieu de la paire, juste derrière la frette. Les cases de la mandoline sont serrées – chaque doigt a donc sa propre case : l’index sur la 1re ou la 2e, le majeur sur la 2e ou la 3e, l’annulaire de la 3e à la 5e case.',
        },
      },
      { h2: { de: '1. G-Dur', en: '1. G major', fr: '1. Sol majeur' } },
      {
        p: {
          de: 'Für **G** setzt du den Mittelfinger in den **2. Bund der A-Saiten** und den Ringfinger in den **3. Bund der E-Saiten**. Die G- und die D-Saiten klingen leer.',
          en: 'For **G**, put your middle finger on the **2nd fret of the A strings** and your ring finger on the **3rd fret of the E strings**. The G and D strings ring open.',
          fr: 'Pour **G**, pose le majeur sur la **2e case des cordes A** et l’annulaire sur la **3e case des cordes E**. Les cordes G et D sonnent à vide.',
        },
      },
      { chord: 'G' },
      { h2: { de: '2. C-Dur', en: '2. C major', fr: '2. Do majeur' } },
      {
        p: {
          de: 'Für **C** rutschen beide Finger einfach **ein Saitenpaar nach oben**: Mittelfinger in den 2. Bund der D-Saiten, Ringfinger in den 3. Bund der A-Saiten. Die G- und die E-Saiten klingen leer. Der Wechsel G – C ist deshalb besonders leicht.',
          en: 'For **C**, both fingers simply move **one pair up**: middle finger on the 2nd fret of the D strings, ring finger on the 3rd fret of the A strings. The G and E strings ring open. That’s why the change G – C is especially easy.',
          fr: 'Pour **C**, les deux doigts montent simplement **d’une paire** : majeur sur la 2e case des cordes D, annulaire sur la 3e case des cordes A. Les cordes G et E sonnent à vide. C’est pour ça que le passage G – C est si facile.',
        },
      },
      { chord: 'C' },
      { h2: { de: '3. D-Dur', en: '3. D major', fr: '3. Ré majeur' } },
      {
        p: {
          de: 'Für **D** greifst du den **2. Bund** gleich zweimal: den Zeigefinger auf den G-Saiten und den Mittelfinger auf den E-Saiten. Die D- und die A-Saiten in der Mitte klingen leer – achte darauf, dass deine Finger sie nicht berühren.',
          en: 'For **D** you use the **2nd fret** twice: index finger on the G strings and middle finger on the E strings. The D and A strings in the middle ring open – make sure your fingers don’t touch them.',
          fr: 'Pour **D**, tu appuies deux fois sur la **2e case** : l’index sur les cordes G et le majeur sur les cordes E. Les cordes D et A au milieu sonnent à vide – fais attention que tes doigts ne les touchent pas.',
        },
      },
      { chord: 'D' },
      { h2: { de: '4. e-Moll', en: '4. E minor', fr: '4. Mi mineur' } },
      {
        p: {
          de: 'Für **Em** liegen zwei Finger nebeneinander im **2. Bund**: der Zeigefinger auf den D-Saiten, der Mittelfinger auf den A-Saiten. Em klingt weicher und etwas traurig – ein schöner Gegenpart zu G.',
          en: 'For **Em**, two fingers sit side by side on the **2nd fret**: index finger on the D strings, middle finger on the A strings. Em sounds softer and a little sad – a lovely partner for G.',
          fr: 'Pour **Em**, deux doigts sont côte à côte sur la **2e case** : l’index sur les cordes D, le majeur sur les cordes A. Em sonne plus doux et un peu triste – un joli partenaire pour G.',
        },
      },
      { chord: 'Em' },
      { h2: { de: 'Der erste Wechsel', en: 'Your first change', fr: 'Ton premier changement' } },
      {
        p: {
          de: 'Übe zuerst **G und C** im Wechsel: viermal anschlagen, wechseln, viermal anschlagen. Schlag mit einem Plektrum locker über alle Saiten. Wenn das klappt, nimm **D** dazu. Mit G, C und D kannst du schon unzählige Lieder begleiten. Im [Akkord-Spiel](tool:spiel) übst du die Wechsel mit dem Mikrofon.',
          en: 'Start by switching between **G and C**: strum four times, change, strum four times. Strum loosely across all strings with a pick. Once that works, add **D**. With G, C and D you can already accompany countless songs. In the [chord game](tool:spiel) you can practise the changes with the microphone.',
          fr: 'Commence par alterner **G et C** : gratte quatre fois, change, gratte quatre fois. Gratte souplement toutes les cordes avec un médiator. Quand ça marche, ajoute **D**. Avec G, C et D, tu peux déjà accompagner d’innombrables chansons. Dans le [jeu des accords](tool:spiel), tu t’entraînes avec le micro.',
        },
      },
      { tool: 'spiel' },
      {
        tip: {
          de: 'Schnarrt ein Ton, drückst du meist nur eine Saite des Paares richtig. Rück den Finger etwas näher ans Bundstäbchen und setz ihn steiler auf. Mehr dazu in [Saite schnarrt oder klingt dumpf?](wissen:saubere-griffe).',
          en: 'If a note buzzes, you’re usually pressing only one string of the pair properly. Move your finger a little closer to the fret and press more upright. More in [Buzzing or muffled strings?](wissen:saubere-griffe).',
          fr: 'Si une note frise, tu n’appuies souvent bien que sur une corde de la paire. Rapproche un peu le doigt de la frette et pose-le plus droit. Plus d’infos dans [Une corde frise ou sonne étouffée ?](wissen:saubere-griffe).',
        },
      },
    ],
    related: ['mandoline-stimmen', 'mandoline-tremolo', 'akkordwechsel-schneller', 'lieder-fuer-anfaenger'],
  },
  {
    id: 'mandoline-tremolo',
    slug: { de: 'mandoline-tremolo', en: 'mandolin-tremolo', fr: 'tremolo-mandoline' },
    instruments: ['mandoline'],
    category: 'technik',
    title: {
      de: 'Tremolo auf der Mandoline: lange Töne mit dem Plektrum',
      en: 'Mandolin Tremolo: Long Notes With a Pick',
      fr: 'Le trémolo à la mandoline : des notes longues au médiator',
    },
    description: {
      de: 'Tremolo auf der Mandoline lernen: wie du mit schnellen Ab- und Aufschlägen lange, singende Töne spielst – Schritt für Schritt mit Metronom.',
      en: 'Learn mandolin tremolo: how quick down- and upstrokes turn short plucks into long, singing notes – step by step with a metronome.',
      fr: 'Apprendre le trémolo à la mandoline : des allers-retours rapides au médiator pour faire chanter les notes longues – pas à pas avec le métronome.',
    },
    blocks: [
      {
        p: {
          de: 'Ein Ton auf der Mandoline klingt hell, aber kurz – die dünnen Stahlsaiten verklingen schnell. Für lange Töne gibt es einen Trick: Du schlägst dasselbe Saitenpaar mit dem Plektrum **ganz schnell abwärts und aufwärts** an. Die vielen Anschläge verschmelzen zu einem langen, singenden Ton. Das heißt **Tremolo** und ist der typische Klang der Mandoline.',
          en: 'A note on the mandolin sounds bright but short – the thin steel strings fade quickly. For long notes there’s a trick: pick the same pair of strings **very quickly down and up**. The many strokes blend into one long, singing note. That’s called **tremolo**, and it’s the typical sound of the mandolin.',
          fr: 'Une note de mandoline sonne clair mais court – les fines cordes en acier s’éteignent vite. Pour les notes longues, il y a une astuce : tu joues la même paire de cordes au médiator **très vite vers le bas et vers le haut**. Toutes ces attaques se fondent en une longue note qui chante. C’est le **trémolo**, le son typique de la mandoline.',
        },
      },
      { h2: { de: 'Das Plektrum halten', en: 'Holding the pick', fr: 'Tenir le médiator' } },
      {
        ul: [
          {
            de: 'Leg das Plektrum auf das vordere Glied des gekrümmten Zeigefingers und drück es mit dem Daumen fest. Nur die **Spitze** schaut ein paar Millimeter heraus.',
            en: 'Lay the pick on the last joint of your curled index finger and hold it with your thumb. Only the **tip** sticks out a few millimetres.',
            fr: 'Pose le médiator sur la dernière phalange de l’index replié et tiens-le avec le pouce. Seule la **pointe** dépasse de quelques millimètres.',
          },
          {
            de: 'Halt es fest genug, dass es nicht wegrutscht, aber ohne zu verkrampfen.',
            en: 'Hold it firmly enough that it doesn’t slip, but without squeezing.',
            fr: 'Tiens-le assez fermement pour qu’il ne glisse pas, mais sans te crisper.',
          },
          {
            de: 'Die Bewegung kommt aus dem **lockeren Handgelenk**, nicht aus dem ganzen Arm – wie beim Abschütteln von Wassertropfen.',
            en: 'The movement comes from a **relaxed wrist**, not the whole arm – like shaking water off your hand.',
            fr: 'Le mouvement vient du **poignet détendu**, pas de tout le bras – comme quand tu secoues des gouttes d’eau.',
          },
        ],
      },
      { h2: { de: 'Schritt für Schritt', en: 'Step by step', fr: 'Pas à pas' } },
      {
        ol: [
          {
            de: 'Spiel auf den leeren A-Saiten gleichmäßig **ab – auf – ab – auf**, zwei Anschläge pro Schlag. Stell das Metronom dafür auf ein ruhiges Tempo.',
            en: 'On the open A strings, pick evenly **down – up – down – up**, two strokes per beat. Set the metronome to a calm tempo.',
            fr: 'Sur les cordes A à vide, joue régulièrement **bas – haut – bas – haut**, deux attaques par temps. Règle le métronome sur un tempo calme.',
          },
          {
            de: 'Klappt das sauber, spielst du **vier Anschläge pro Schlag**. Alle sollen gleich laut sein, abwärts wie aufwärts.',
            en: 'Once that’s clean, play **four strokes per beat**. They should all be equally loud, down as well as up.',
            fr: 'Quand c’est propre, joue **quatre attaques par temps**. Elles doivent toutes être aussi fortes, vers le bas comme vers le haut.',
          },
          {
            de: 'Stell das Metronom jeden Tag ein kleines Stück schneller. Irgendwann zählst du die Anschläge nicht mehr – dann ist es ein echtes Tremolo.',
            en: 'Make the metronome a little faster each day. At some point you stop counting the strokes – then it’s a real tremolo.',
            fr: 'Accélère un peu le métronome chaque jour. Un jour, tu ne comptes plus les attaques – c’est alors un vrai trémolo.',
          },
          {
            de: 'Zum Schluss wechselst du mitten im Tremolo die Töne, ohne aufzuhören – so wird aus einzelnen Tönen eine Melodie.',
            en: 'Finally, change notes in the middle of the tremolo without stopping – that turns single notes into a melody.',
            fr: 'Pour finir, change de note au milieu du trémolo sans t’arrêter – ainsi, les notes isolées deviennent une mélodie.',
          },
        ],
      },
      { tool: 'rhythmus' },
      {
        p: {
          de: 'Tremolo passt vor allem zu **langsamen Liedern mit langen Tönen**. Bei schnellen Melodien schlägst du jeden Ton nur einmal an, meist im Wechsel ab und auf. Wie du dabei im Takt bleibst, steht in [Mit dem Metronom üben](wissen:mit-metronom-ueben).',
          en: 'Tremolo suits **slow songs with long notes** best. In fast melodies you pick each note just once, usually alternating down and up. How to stay in time is explained in [Practising with a metronome](wissen:mit-metronom-ueben).',
          fr: 'Le trémolo convient surtout aux **chansons lentes avec des notes longues**. Dans les mélodies rapides, tu joues chaque note une seule fois, en général en alternant bas et haut. Pour rester en rythme, lis [S’entraîner avec le métronome](wissen:mit-metronom-ueben).',
        },
      },
      {
        tip: {
          de: 'Wird die Hand müde oder fest, mach eine kurze Pause und schüttle sie aus. Ein lockeres, gleichmäßiges Tremolo klingt schöner als ein schnelles, verkrampftes.',
          en: 'If your hand gets tired or tight, take a short break and shake it out. A relaxed, even tremolo sounds nicer than a fast, tense one.',
          fr: 'Si ta main fatigue ou se crispe, fais une petite pause et secoue-la. Un trémolo détendu et régulier sonne mieux qu’un trémolo rapide et crispé.',
        },
      },
    ],
    related: ['mandoline-erste-akkorde', 'mit-metronom-ueben', 'mandoline-und-geige', 'fingerkuppen-hornhaut'],
  },
  {
    id: 'mandoline-und-geige',
    slug: { de: 'mandoline-und-geige', en: 'mandolin-and-violin', fr: 'mandoline-et-violon' },
    instruments: ['mandoline'],
    category: 'instrument',
    title: {
      de: 'Mandoline und Geige: gleiche Stimmung, andere Spielweise',
      en: 'Mandolin and Violin: Same Tuning, Different Playing',
      fr: 'Mandoline et violon : même accord, jeu différent',
    },
    description: {
      de: 'Mandoline und Geige sind beide in G D A E gestimmt. Was gleich ist, was anders – und warum Geigenmelodien sich auf der Mandoline so leicht spielen lassen.',
      en: 'Mandolin and violin are both tuned G D A E. What’s the same, what’s different – and why violin tunes are so easy to play on the mandolin.',
      fr: 'La mandoline et le violon sont tous deux accordés en G D A E. Ce qui est pareil, ce qui change – et pourquoi les airs de violon vont si bien à la mandoline.',
    },
    blocks: [
      {
        p: {
          de: 'Die Mandoline und die Geige sehen ganz verschieden aus, sind aber **genau gleich gestimmt**: G, D, A und E, jeweils eine Quinte auseinander. Die tiefste Saite ist bei beiden das G unter dem eingestrichenen C, die Töne klingen also in derselben Lage.',
          en: 'The mandolin and the violin look completely different, but they are **tuned exactly the same**: G, D, A and E, each a fifth apart. On both, the lowest string is the G below middle C, so the notes sound in the same range.',
          fr: 'La mandoline et le violon ont l’air très différents, mais ils sont **accordés exactement pareil** : G, D, A et E, à une quinte d’écart. Sur les deux, la corde la plus grave est le Sol sous le Do du milieu : les notes sonnent dans la même hauteur.',
        },
      },
      { h2: { de: 'Was gleich ist', en: 'What’s the same', fr: 'Ce qui est pareil' } },
      {
        ul: [
          {
            de: '**Dieselben Plätze für Töne:** In der ersten Lage liegt ein Ton auf beiden Instrumenten auf derselben Saite. Wer Geige spielt, findet sich auf der Mandoline schnell zurecht – und umgekehrt.',
            en: '**The same places for notes:** in first position, a note lies on the same string on both instruments. Violinists find their way around the mandolin quickly – and the other way round.',
            fr: '**Les mêmes places pour les notes :** en première position, une note se trouve sur la même corde sur les deux instruments. Un violoniste s’y retrouve vite sur la mandoline, et inversement.',
          },
          {
            de: '**Dieselben Noten:** Geigenstücke und Volkstänze passen meist ohne Änderung auf die Mandoline. Mandoline und Geige spielen deshalb oft zusammen, zum Beispiel in der Volksmusik.',
            en: '**The same sheet music:** violin pieces and folk dances usually fit the mandolin without changes. That’s why mandolin and violin often play together, for example in folk music.',
            fr: '**Les mêmes partitions :** les morceaux de violon et les danses traditionnelles passent en général tels quels sur la mandoline. C’est pour ça qu’ils jouent souvent ensemble, par exemple en musique traditionnelle.',
          },
          {
            de: '**Dieselbe Familie:** Wie die Bratsche und das Cello zur Geige gibt es größere Geschwister der Mandoline – die Mandola und das Mandoloncello.',
            en: '**The same family:** just as the viola and cello are the violin’s bigger siblings, the mandolin has bigger siblings too – the mandola and the mandocello.',
            fr: '**La même famille :** comme l’alto et le violoncelle pour le violon, la mandoline a de grandes sœurs – la mandole et le mandoloncelle.',
          },
        ],
      },
      { h2: { de: 'Was anders ist', en: 'What’s different', fr: 'Ce qui change' } },
      {
        ul: [
          {
            de: '**Bünde:** Die Mandoline hat Bundstäbchen wie eine Gitarre. Drückst du hinter dem richtigen Bund, stimmt der Ton – auf der Geige musst du die Stelle nach Gehör genau treffen.',
            en: '**Frets:** the mandolin has frets like a guitar. Press behind the right fret and the note is in tune – on the violin you have to find the exact spot by ear.',
            fr: '**Les frettes :** la mandoline a des frettes comme une guitare. Appuie derrière la bonne frette et la note est juste – au violon, il faut trouver l’endroit exact à l’oreille.',
          },
          {
            de: '**Plektrum statt Bogen:** Die Mandoline wird gezupft, deshalb verklingt jeder Ton. Lange Töne spielst du mit dem [Tremolo](wissen:mandoline-tremolo).',
            en: '**Pick instead of bow:** the mandolin is plucked, so every note fades away. You play long notes with [tremolo](wissen:mandoline-tremolo).',
            fr: '**Médiator au lieu de l’archet :** la mandoline est pincée, chaque note s’éteint donc. Les notes longues se jouent en [trémolo](wissen:mandoline-tremolo).',
          },
          {
            de: '**Akkorde:** Auf der Mandoline klingen mühelos alle vier Saitenpaare zusammen. Damit kannst du Lieder begleiten – mit dem Geigenbogen klingen meist nur zwei Saiten gleichzeitig.',
            en: '**Chords:** on the mandolin all four pairs ring together easily, so you can accompany songs – a violin bow usually sounds only two strings at once.',
            fr: '**Les accords :** à la mandoline, les quatre paires sonnent facilement ensemble, tu peux donc accompagner des chansons – au violon, l’archet ne fait en général sonner que deux cordes à la fois.',
          },
          {
            de: '**Doppelsaiten:** Die Mandoline hat acht Saiten in vier Paaren, die Geige vier einzelne Saiten.',
            en: '**Double strings:** the mandolin has eight strings in four pairs; the violin has four single strings.',
            fr: '**Cordes doubles :** la mandoline a huit cordes en quatre paires, le violon quatre cordes simples.',
          },
        ],
      },
      { h2: { de: 'Der 7. Bund und der kleine Finger', en: 'The 7th fret and the little finger', fr: 'La 7e case et l’auriculaire' } },
      {
        p: {
          de: 'Auf der Geige greift der kleine Finger in der ersten Lage genau den Ton der nächsten leeren Saite. Auf der Mandoline ist das der **7. Bund** – und auch hier ist er der Platz für den kleinen Finger. So kannst du wählen: Ton gegriffen oder leere Saite. Gegriffen klingt er weicher und lässt sich mit Vibrato verzieren.',
          en: 'On the violin, the little finger in first position plays exactly the note of the next open string. On the mandolin that’s the **7th fret** – and here, too, it’s the little finger’s place. So you can choose: fretted note or open string. Fretted, it sounds softer and you can decorate it with vibrato.',
          fr: 'Au violon, l’auriculaire en première position joue exactement la note de la corde à vide suivante. À la mandoline, c’est la **7e case** – et là aussi, c’est la place de l’auriculaire. Tu peux donc choisir : note appuyée ou corde à vide. Appuyée, elle sonne plus doux et tu peux l’orner d’un vibrato.',
        },
      },
      {
        tip: {
          de: 'Spielst du schon Geige? Dann nimm dir die Melodien vor, die du kennst, und spiel sie auf der Mandoline nach. Die Töne liegen auf denselben Saiten – nur die Finger landen jetzt hinter den Bünden. Wie du Tabs liest, erklärt [Tabulatur lesen](wissen:tabulatur-lesen).',
          en: 'Already play the violin? Take tunes you know and play them on the mandolin. The notes are on the same strings – only now your fingers land behind the frets. How to read tabs is explained in [Reading tablature](wissen:tabulatur-lesen).',
          fr: 'Tu joues déjà du violon ? Reprends les airs que tu connais et joue-les à la mandoline. Les notes sont sur les mêmes cordes – seuls tes doigts se posent maintenant derrière les frettes. Pour lire les tablatures, lis [Lire une tablature](wissen:tabulatur-lesen).',
        },
      },
    ],
    related: ['mandoline-stimmen', 'mandoline-tremolo', 'tabulatur-lesen', 'toene-und-notennamen'],
  },
];
