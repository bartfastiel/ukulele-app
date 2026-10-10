import type { Article } from './types.ts';

export const BASS_ARTICLES: Article[] = [
  {
    id: 'bass-stimmen',
    slug: { de: 'e-bass-stimmen', en: 'tune-bass-guitar', fr: 'accorder-basse-electrique' },
    instruments: ['bass'],
    category: 'erste-schritte',
    title: {
      de: 'E-Bass stimmen (E A D G) – mit Stimmgerät und nach Gehör',
      en: 'How to Tune a Bass Guitar (E A D G) – with a Tuner and by Ear',
      fr: 'Accorder une basse électrique (E A D G), avec accordeur ou à l’oreille',
    },
    description: {
      de: 'E-Bass stimmen in E A D G: mit dem Stimmgerät im Browser oder nach Gehör über den 5. Bund – und was hilft, wenn das Handy die tiefen Töne kaum hört.',
      en: 'Tune your bass guitar to E A D G with the browser tuner or by ear using the 5th fret – and what helps when a phone can barely hear the low notes.',
      fr: 'Accorde ta basse en E A D G avec l’accordeur du navigateur ou à l’oreille par la 5e case – et que faire si le téléphone entend mal les graves.',
    },
    blocks: [
      {
        p: {
          de: 'Der E-Bass hat **vier Saiten** und klingt genau **eine Oktave tiefer** als die vier tiefen Saiten der Gitarre. Seine Saiten sind dick und mit Draht umsponnen – die tiefe E-Saite schwingt nur gut 41-mal in der Sekunde. Deshalb brummt der Bass so schön und hält eine ganze Band zusammen.',
          en: 'A bass guitar has **four strings** and sounds exactly **one octave lower** than the four low strings of a guitar. Its strings are thick and wound with wire – the low E string vibrates only about 41 times a second. That’s why the bass hums so nicely and holds a whole band together.',
          fr: 'La basse électrique a **quatre cordes** et sonne exactement **une octave plus grave** que les quatre cordes graves de la guitare. Ses cordes sont épaisses et filées – la corde de Mi grave ne vibre qu’environ 41 fois par seconde. C’est pour ça que la basse ronronne si bien et tient tout un groupe ensemble.',
        },
      },
      { h2: { de: 'Die Zieltöne', en: 'The target notes', fr: 'Les notes à obtenir' } },
      {
        ul: [
          { de: '4. Saite (oben, die dickste): **E** (E1)', en: '4th string (top, the thickest): **E** (E1)', fr: '4e corde (en haut, la plus épaisse) : **E** (Mi, E1)' },
          { de: '3. Saite: **A** (A1)', en: '3rd string: **A** (A1)', fr: '3e corde : **A** (La, A1)' },
          { de: '2. Saite: **D** (D2)', en: '2nd string: **D** (D2)', fr: '2e corde : **D** (Ré, D2)' },
          { de: '1. Saite (unten, die dünnste): **G** (G2)', en: '1st string (bottom, the thinnest): **G** (G2)', fr: '1re corde (en bas, la plus fine) : **G** (Sol, G2)' },
        ],
      },
      {
        tip: {
          de: 'Merksatz von oben nach unten: **E**ine **A**lte **D**ame **G**eht.',
          en: 'A phrase to remember, top to bottom: **E**very **A**pple **D**oes **G**row.',
          fr: 'Pour retenir de haut en bas : **E**ntends **A**ussi **D**anser **G**aston.',
        },
      },
      { h2: { de: 'Mit dem Stimmgerät', en: 'With a tuner', fr: 'Avec un accordeur' } },
      {
        ol: [
          {
            de: 'Schließ den Bass an den Verstärker an und dreh ihn leise auf. Ohne Verstärker klingt ein E-Bass sehr leise – dann halte das Handy nah an die Saiten.',
            en: 'Plug the bass into the amp and turn it up a little. Without an amp a bass guitar is very quiet – then hold the phone close to the strings.',
            fr: 'Branche la basse sur l’ampli et monte un peu le volume. Sans ampli, une basse électrique est très discrète – tiens alors le téléphone près des cordes.',
          },
          {
            de: 'Öffne das [Stimmgerät](tool:stimmen), erlaube das Mikrofon und zupf eine Saite kräftig an.',
            en: 'Open the [tuner](tool:stimmen), allow the microphone and pluck one string firmly.',
            fr: 'Ouvre l’[accordeur](tool:stimmen), autorise le micro et pince une corde franchement.',
          },
          {
            de: 'Zu tief? Dreh den Wirbel so, dass die Saite straffer wird. Zu hoch? Lockere sie ein wenig. Die Mechaniken am Bass sind groß – schon eine kleine Drehung verändert viel.',
            en: 'Too low? Turn the tuning key to tighten the string. Too high? Loosen it a little. Bass tuning keys are big – even a small turn changes a lot.',
            fr: 'Trop grave ? Tourne la mécanique pour tendre la corde. Trop aigu ? Détends-la un peu. Les mécaniques de basse sont grandes – un petit tour change déjà beaucoup.',
          },
        ],
      },
      { tool: 'stimmen' },
      {
        p: {
          de: 'Handy-Mikrofone hören sehr tiefe Töne nur schwach. Das Stimmgerät der App achtet deshalb auch auf die Oberschwingung eine Oktave höher – dort ist der Ton viel lauter. Wenn die Nadel trotzdem zappelt, zupf etwas weiter vom Steg weg und lass die Saite ruhig ausklingen.',
          en: 'Phone microphones hear very low notes only faintly. That’s why the app’s tuner also listens to the overtone one octave higher, which is much louder. If the needle still jumps around, pluck a little further from the bridge and let the string ring.',
          fr: 'Les micros de téléphone entendent mal les notes très graves. L’accordeur de l’application écoute donc aussi l’harmonique une octave plus haut, bien plus forte. Si l’aiguille bouge encore, pince un peu plus loin du chevalet et laisse la corde résonner.',
        },
      },
      { h2: { de: 'Nach Gehör: der 5. Bund', en: 'By ear: the 5th fret', fr: 'À l’oreille : la 5e case' } },
      {
        p: {
          de: 'Ist die E-Saite gestimmt, kannst du den Rest ohne Gerät stimmen: Greif die E-Saite im **5. Bund** – das ist ein A. Die leere A-Saite muss genauso klingen. Dann A-Saite im 5. Bund gegen die leere D-Saite, D-Saite im 5. Bund gegen die leere G-Saite. Hörst du ein Wabern, ist eine Saite noch nicht ganz richtig – dreh langsam, bis es verschwindet.',
          en: 'Once the E string is in tune, you can tune the rest without a device: fret the E string at the **5th fret** – that’s an A. The open A string must sound exactly the same. Then the A string at the 5th fret against the open D string, and the D string at the 5th fret against the open G string. If you hear a wobble, one string isn’t quite there yet – turn slowly until it disappears.',
          fr: 'Une fois la corde de Mi accordée, tu peux accorder le reste sans appareil : appuie sur la corde de Mi à la **5e case** – c’est un La. La corde de La à vide doit sonner exactement pareil. Puis la corde de La à la 5e case contre le Ré à vide, et la corde de Ré à la 5e case contre le Sol à vide. Si tu entends une ondulation, une corde n’est pas encore tout à fait juste – tourne lentement jusqu’à ce qu’elle disparaisse.',
        },
      },
    ],
    related: ['bass-erste-toene', 'bass-zupfen'],
    published: '2026-10-10',
  },
  {
    id: 'bass-erste-toene',
    slug: { de: 'e-bass-erste-toene-grundtoene', en: 'bass-guitar-first-notes-root-notes', fr: 'basse-premieres-notes-fondamentales' },
    instruments: ['bass'],
    category: 'erste-schritte',
    title: {
      de: 'Erste Töne auf dem E-Bass: Grundtöne finden und mitspielen',
      en: 'First Notes on the Bass Guitar: Finding and Playing Root Notes',
      fr: 'Premières notes à la basse : trouver et jouer les fondamentales',
    },
    description: {
      de: 'Der Bass spielt zu jedem Akkord seinen Grundton. So findest du E, A, D, G, C und F in der ersten Lage – und spielst damit sofort bei ganzen Liedern mit.',
      en: 'The bass plays the root note of every chord. Here’s how to find E, A, D, G, C and F in first position – and play along with whole songs right away.',
      fr: 'La basse joue la fondamentale de chaque accord. Voici comment trouver E, A, D, G, C et F en première position – et accompagner tout de suite des chansons.',
    },
    blocks: [
      {
        p: {
          de: 'Gitarre und Ukulele spielen Akkorde, also mehrere Töne zugleich. Der Bass spielt fast immer nur **einen Ton**: den **Grundton** des Akkords – den Ton, nach dem der Akkord heißt. Zu C spielst du ein C, zu Am ein A, zu G7 ein G. Mehr musst du am Anfang nicht wissen, um bei einem Lied mitzuspielen.',
          en: 'Guitar and ukulele play chords – several notes at once. The bass almost always plays just **one note**: the **root** of the chord, the note the chord is named after. For C you play a C, for Am an A, for G7 a G. That’s all you need to know to start playing along with a song.',
          fr: 'La guitare et le ukulélé jouent des accords, plusieurs notes à la fois. La basse joue presque toujours **une seule note** : la **fondamentale** de l’accord, la note qui donne son nom à l’accord. Pour C tu joues un Do, pour Am un La, pour G7 un Sol. Au début, il ne t’en faut pas plus pour accompagner une chanson.',
        },
      },
      { h2: { de: 'Ein Finger pro Bund', en: 'One finger per fret', fr: 'Un doigt par case' } },
      {
        p: {
          de: 'In der **ersten Lage** liegt deine Hand am Sattel: Zeigefinger für den 1. Bund, Mittelfinger für den 2., Ringfinger für den 3. und kleiner Finger für den 4. Bund. Der Daumen ruht hinten am Hals, etwa hinter dem Mittelfinger. So erreichst du alle zwölf Töne, ohne die Hand zu bewegen.',
          en: 'In **first position** your hand sits near the nut: index finger for the 1st fret, middle finger for the 2nd, ring finger for the 3rd and little finger for the 4th. Your thumb rests behind the neck, roughly behind the middle finger. That way you reach all twelve notes without moving your hand.',
          fr: 'En **première position**, ta main est près du sillet : l’index pour la 1re case, le majeur pour la 2e, l’annulaire pour la 3e et l’auriculaire pour la 4e. Le pouce repose derrière le manche, à peu près derrière le majeur. Ainsi tu atteins les douze notes sans bouger la main.',
        },
      },
      { h2: { de: 'Die ersten Töne', en: 'The first notes', fr: 'Les premières notes' } },
      {
        ul: [
          {
            de: '**E, A und D** sind leere Saiten – einfach zupfen.',
            en: '**E, A and D** are open strings – just pluck.',
            fr: '**E, A et D** (Mi, La, Ré) sont des cordes à vide – il suffit de pincer.',
          },
          {
            de: '**G** liegt auf der E-Saite im 3. Bund, **C** auf der A-Saite im 3. Bund – beide mit dem Ringfinger.',
            en: '**G** is on the E string at the 3rd fret, **C** on the A string at the 3rd fret – both with your ring finger.',
            fr: '**G** (Sol) est sur la corde de Mi à la 3e case, **C** (Do) sur la corde de La à la 3e case – les deux avec l’annulaire.',
          },
          {
            de: '**F** liegt auf der E-Saite im 1. Bund, mit dem Zeigefinger.',
            en: '**F** is on the E string at the 1st fret, with your index finger.',
            fr: '**F** (Fa) est sur la corde de Mi à la 1re case, avec l’index.',
          },
        ],
      },
      { chord: 'C' },
      { chord: 'F' },
      { chord: 'G' },
      {
        p: {
          de: 'Mit C, F und G kannst du schon [Alle meine Entchen](lied:alle-meine-entchen) begleiten. Zupf den Grundton immer auf der **Eins** eines Taktes und lass ihn klingen. [Bruder Jakob](lied:bruder-jakob) braucht sogar nur einen einzigen Ton: F.',
          en: 'With C, F and G you can already play along with [Alle meine Entchen](lied:alle-meine-entchen). Pluck the root on the **one** of each bar and let it ring. [Bruder Jakob](lied:bruder-jakob) needs just a single note: F.',
          fr: 'Avec Do, Fa et Sol, tu peux déjà accompagner [Alle meine Entchen](lied:alle-meine-entchen). Pince la fondamentale sur le **un** de chaque mesure et laisse-la sonner. [Bruder Jakob](lied:bruder-jakob) n’a besoin que d’une seule note : Fa.',
        },
      },
      { tool: 'lieder' },
      { h2: { de: 'Der nächste Schritt: die Quinte', en: 'The next step: the fifth', fr: 'L’étape suivante : la quinte' } },
      {
        p: {
          de: 'Zum Grundton passt immer seine **Quinte**. Auf dem Bass ist sie leicht zu finden: **eine Saite höher, zwei Bünde weiter**. Zu C (A-Saite, 3. Bund) ist das G auf der D-Saite im 5. Bund. Grundton auf der Eins, Quinte auf der Drei – schon klingt es wie eine richtige Basslinie. In der App stellst du dafür im Lied „Grundton und Quinte“ ein.',
          en: 'The **fifth** always goes with the root. On bass it’s easy to find: **one string higher, two frets further**. For C (A string, 3rd fret) that’s the G on the D string at the 5th fret. Root on beat one, fifth on beat three – and it already sounds like a real bass line. In the app, choose “Root and fifth” in a song.',
          fr: 'La **quinte** va toujours avec la fondamentale. À la basse, elle est facile à trouver : **une corde plus haut, deux cases plus loin**. Pour Do (corde de La, 3e case), c’est le Sol sur la corde de Ré à la 5e case. Fondamentale sur le un, quinte sur le trois – et ça sonne déjà comme une vraie ligne de basse. Dans l’application, choisis « Fondamentale et quinte » dans une chanson.',
        },
      },
      { tool: 'akkorde' },
    ],
    related: ['bass-stimmen', 'bass-zupfen', 'toene-und-notennamen'],
    published: '2026-10-10',
  },
  {
    id: 'bass-zupfen',
    slug: { de: 'e-bass-zupfen-zwei-finger-plektrum', en: 'bass-guitar-plucking-two-fingers-pick', fr: 'basse-pincer-deux-doigts-mediator' },
    instruments: ['bass'],
    category: 'technik',
    title: {
      de: 'E-Bass zupfen: mit zwei Fingern oder mit Plektrum',
      en: 'Plucking the Bass Guitar: Two Fingers or a Pick',
      fr: 'Pincer la basse électrique : avec deux doigts ou au médiator',
    },
    description: {
      de: 'Wechselschlag mit Zeige- und Mittelfinger, Daumen als Stütze, Plektrum für harte Töne – und wie du die anderen Saiten still hältst, damit nichts brummt.',
      en: 'Alternating index and middle finger, the thumb as an anchor, a pick for punchy notes – and how to keep the other strings quiet so nothing hums along.',
      fr: 'Alterner index et majeur, le pouce en appui, le médiator pour un son plus dur – et comment garder les autres cordes muettes pour que rien ne bourdonne.',
    },
    blocks: [
      {
        p: {
          de: 'Die meisten Bassisten zupfen mit **zwei Fingern** der rechten Hand: Zeigefinger und Mittelfinger wechseln sich ab – wie zwei Beine, die gehen. So bleibt jeder Finger locker, und du kannst auch schnelle Töne gleichmäßig spielen.',
          en: 'Most bass players pluck with **two fingers** of the picking hand: index and middle finger take turns – like two legs walking. That keeps each finger relaxed, and you can play even fast notes evenly.',
          fr: 'La plupart des bassistes pincent avec **deux doigts** de la main droite : l’index et le majeur alternent – comme deux jambes qui marchent. Chaque doigt reste détendu et tu peux jouer même les notes rapides bien régulièrement.',
        },
      },
      { h2: { de: 'So geht der Wechselschlag', en: 'How to alternate', fr: 'Comment alterner' } },
      {
        ol: [
          {
            de: 'Leg den **Daumen** auf den Tonabnehmer oder auf die E-Saite. Er ist deine Stütze.',
            en: 'Rest your **thumb** on the pickup or on the E string. It’s your anchor.',
            fr: 'Pose le **pouce** sur le micro ou sur la corde de Mi. C’est ton point d’appui.',
          },
          {
            de: 'Zieh die Fingerkuppe des Zeigefingers über die Saite zu dir hin, bis sie an der nächsten Saite liegen bleibt. Das ist ein **Anschlag mit Auflage**: Er klingt voll und rund.',
            en: 'Pull the tip of your index finger across the string towards you until it comes to rest on the next string. That’s a **rest stroke**: it sounds full and round.',
            fr: 'Tire le bout de l’index sur la corde vers toi jusqu’à ce qu’il s’arrête sur la corde suivante. C’est un **coup buté** : il sonne plein et rond.',
          },
          {
            de: 'Jetzt der Mittelfinger, dann wieder der Zeigefinger – immer im Wechsel, auch wenn du die Saite wechselst.',
            en: 'Now the middle finger, then the index again – always alternating, even when you change strings.',
            fr: 'Puis le majeur, puis de nouveau l’index – toujours en alternance, même quand tu changes de corde.',
          },
          {
            de: 'Fang langsam an, zum Beispiel mit dem Metronom auf 60, vier Töne pro Klick auf der leeren E-Saite.',
            en: 'Start slowly, for example with the metronome at 60, four notes per click on the open E string.',
            fr: 'Commence lentement, par exemple avec le métronome à 60, quatre notes par clic sur la corde de Mi à vide.',
          },
        ],
      },
      { tool: 'rhythmus' },
      { h2: { de: 'Mit dem Plektrum', en: 'With a pick', fr: 'Au médiator' } },
      {
        p: {
          de: 'Mit einem **Plektrum** klingt der Bass härter und knackiger – gut für Rock. Halte es zwischen Daumen und Zeigefinger, nur die Spitze schaut heraus. Für den Anfang reichen **Abschläge**: immer von oben nach unten. Ein mittelstarkes Plektrum (etwa 0,7 bis 0,9 mm) ist für Kinderhände angenehm.',
          en: 'With a **pick** the bass sounds harder and punchier – great for rock. Hold it between thumb and index finger with just the tip showing. To start with, **downstrokes** are enough: always from top to bottom. A medium pick (about 0.7 to 0.9 mm) feels comfortable in small hands.',
          fr: 'Au **médiator**, la basse sonne plus dur et plus percutant – idéal pour le rock. Tiens-le entre le pouce et l’index, seule la pointe dépasse. Pour commencer, les **coups vers le bas** suffisent : toujours de haut en bas. Un médiator moyen (environ 0,7 à 0,9 mm) est agréable pour les petites mains.',
        },
      },
      { h2: { de: 'Andere Saiten still halten', en: 'Keeping the other strings quiet', fr: 'Garder les autres cordes muettes' } },
      {
        p: {
          de: 'Dicke Saiten schwingen gern mit, auch wenn du sie nicht spielst. Das brummt. Zwei Tricks helfen: Der Daumen der rechten Hand liegt auf den tieferen Saiten, und die Finger der linken Hand berühren die höheren Saiten ganz leicht. Wenn ein Ton aufhören soll, heb den greifenden Finger nur ein bisschen an, ohne die Saite loszulassen – dann ist er sofort still.',
          en: 'Thick strings like to ring along even when you don’t play them. That hums. Two tricks help: the thumb of your picking hand rests on the lower strings, and the fingers of your fretting hand lightly touch the higher strings. When a note should stop, lift the fretting finger just a little without leaving the string – it goes quiet at once.',
          fr: 'Les grosses cordes aiment vibrer toutes seules, même quand tu ne les joues pas. Ça bourdonne. Deux astuces : le pouce de la main droite repose sur les cordes plus graves, et les doigts de la main gauche effleurent les cordes plus aiguës. Quand une note doit s’arrêter, soulève juste un peu le doigt qui appuie sans quitter la corde – elle se tait aussitôt.',
        },
      },
      {
        tip: {
          de: 'Ein guter Bass klingt nicht laut, sondern **gleichmäßig**. Spiel lieber leise und genau im Takt – dann hört dir die ganze Band gern zu.',
          en: 'Good bass playing isn’t loud, it’s **even**. Play softly and right in time – then the whole band will love listening to you.',
          fr: 'Une bonne basse n’est pas forte, elle est **régulière**. Joue plutôt doucement et bien en rythme – tout le groupe aimera t’écouter.',
        },
      },
    ],
    related: ['bass-erste-toene', 'mit-metronom-ueben', 'fingerkuppen-hornhaut'],
    published: '2026-10-10',
  },
  {
    id: 'bass-walking-blues',
    slug: { de: 'walking-bass-blues-e-bass', en: 'walking-bass-blues-bass-guitar', fr: 'walking-bass-blues-basse' },
    instruments: ['bass'],
    category: 'theorie',
    title: {
      de: 'Walking Bass im Blues: vom Grundton zur laufenden Basslinie',
      en: 'Walking Bass in the Blues: from Root Notes to a Moving Bass Line',
      fr: 'Walking bass dans le blues : de la fondamentale à la ligne qui marche',
    },
    description: {
      de: 'Im 12-Takt-Blues lernst du Schritt für Schritt: Grundton, Grundton und Quinte, dann der Walking Bass 1-3-5-6-7-6-5-3 – in E fast nur auf leeren Saiten.',
      en: 'Learn the 12-bar blues step by step: root note, root and fifth, then the walking bass 1-3-5-6-7-6-5-3 – in E almost entirely on open strings.',
      fr: 'Apprends le blues en 12 mesures pas à pas : fondamentale, fondamentale et quinte, puis la walking bass 1-3-5-6-7-6-5-3 – en Mi presque sur cordes à vide.',
    },
    blocks: [
      {
        p: {
          de: 'Im Blues ist der Bass das Herz der Band. Er sagt allen, welcher Akkord gerade dran ist, und gibt den Schritt vor. Eine **Walking Bass**-Linie „geht“ dabei Ton für Ton durch den Akkord – auf jeden Schlag ein neuer Ton. Wie der 12-Takt-Blues aufgebaut ist, steht in [12-Takt-Blues lernen](wissen:zwoelf-takt-blues).',
          en: 'In the blues the bass is the heart of the band. It tells everyone which chord is playing and sets the pace. A **walking bass** line “walks” through the chord note by note – a new note on every beat. How the 12-bar blues works is explained in [Learning the 12-bar blues](wissen:zwoelf-takt-blues).',
          fr: 'Dans le blues, la basse est le cœur du groupe. Elle dit à tout le monde quel accord on joue et donne le pas. Une ligne de **walking bass** « marche » à travers l’accord note après note – une nouvelle note sur chaque temps. La grille du blues en 12 mesures est expliquée dans [Le blues en 12 mesures](wissen:zwoelf-takt-blues).',
        },
      },
      { h2: { de: 'In E ist es am bequemsten', en: 'E is the most comfortable key', fr: 'Mi est la tonalité la plus confortable' } },
      {
        p: {
          de: 'Ein Blues in E braucht die Akkorde E7, A7 und B7. Ihre Grundtöne liegen auf dem Bass ganz nah beieinander: **E** und **A** sind leere Saiten, **B** liegt auf der A-Saite im 2. Bund.',
          en: 'A blues in E uses the chords E7, A7 and B7. Their roots sit very close together on the bass: **E** and **A** are open strings, **B** is on the A string at the 2nd fret.',
          fr: 'Un blues en Mi utilise les accords E7, A7 et B7. Leurs fondamentales sont toutes proches sur la basse : **E** et **A** (Mi et La) sont des cordes à vide, **B** (Si) est sur la corde de La à la 2e case.',
        },
      },
      { chord: 'E' },
      { chord: 'A' },
      { chord: 'B' },
      { h2: { de: 'Vier Stufen', en: 'Four steps', fr: 'Quatre étapes' } },
      {
        ol: [
          {
            de: '**Grundton:** In jedem Takt viermal den Grundton – zu E7 also E, E, E, E.',
            en: '**Root:** four roots in every bar – for E7 that’s E, E, E, E.',
            fr: '**Fondamentale :** quatre fois la fondamentale dans chaque mesure – pour E7, Mi, Mi, Mi, Mi.',
          },
          {
            de: '**Grundton und Quinte:** zweimal Grundton, zweimal Quinte – zu E7 also E, E, B, B.',
            en: '**Root and fifth:** two roots, two fifths – for E7 that’s E, E, B, B.',
            fr: '**Fondamentale et quinte :** deux fois la fondamentale, deux fois la quinte – pour E7, Mi, Mi, Si, Si.',
          },
          {
            de: '**Walking Bass:** im einen Takt Grundton, Terz, Quinte, Sexte hinauf (1-3-5-6), im nächsten Septime, Sexte, Quinte, Terz wieder hinunter (7-6-5-3). Zu E7 heißt das E, G#, B, C# – und dann D, C#, B, G#.',
            en: '**Walking bass:** in one bar root, third, fifth, sixth going up (1-3-5-6), in the next seventh, sixth, fifth, third coming down (7-6-5-3). For E7 that’s E, G#, B, C# – and then D, C#, B, G#.',
            fr: '**Walking bass :** dans une mesure fondamentale, tierce, quinte, sixte en montant (1-3-5-6), dans la suivante septième, sixte, quinte, tierce en redescendant (7-6-5-3). Pour E7 : Mi, Sol#, Si, Do# – puis Ré, Do#, Si, Sol#.',
          },
          {
            de: '**Frei spielen:** mit den Tönen der Blues-Tonleiter eigene Linien erfinden.',
            en: '**Free playing:** invent your own lines with the notes of the blues scale.',
            fr: '**Jeu libre :** invente tes propres lignes avec les notes de la gamme blues.',
          },
        ],
      },
      {
        tip: {
          de: 'In E ist sogar die Septime D eine leere Saite. Lass leere Saiten ruhig klingen, während deine linke Hand schon zum nächsten Ton wandert.',
          en: 'In E even the seventh, D, is an open string. Let open strings ring while your fretting hand already moves to the next note.',
          fr: 'En Mi, même la septième, Ré, est une corde à vide. Laisse sonner les cordes à vide pendant que ta main gauche part déjà vers la note suivante.',
        },
      },
      {
        p: {
          de: 'Im Blues-Werkzeug der App spielt eine Band mit Schlagzeug und Orgel – ohne eigenen Bass, denn der bist du. Die Töne leuchten als Punkte auf dem Hals, und das Mikrofon zählt mit, wie viele du triffst.',
          en: 'In the app’s blues tool a band plays drums and organ – without its own bass, because that’s you. The notes light up as dots on the neck, and the microphone counts how many you hit.',
          fr: 'Dans l’outil blues de l’application, un groupe joue batterie et orgue – sans bassiste, car c’est toi. Les notes s’allument sur le manche, et le micro compte combien tu en réussis.',
        },
      },
      { tool: 'blues' },
    ],
    related: ['zwoelf-takt-blues', 'bass-erste-toene', 'takt-und-taktarten'],
    published: '2026-10-10',
  },
];
