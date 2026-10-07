import type { Article } from './types.ts';

export const GITARRE_ARTICLES: Article[] = [
  {
    id: 'gitarre-kinder',
    slug: { de: 'gitarre-fuer-kinder-groessen', en: 'guitar-size-kids', fr: 'taille-guitare-enfant' },
    instruments: ['gitarre'],
    category: 'erste-schritte',
    title: {
      de: 'Gitarre für Kinder: Welche Größe passt?',
      en: 'Guitar for Kids: Which Size Fits?',
      fr: 'Guitare pour enfant : quelle taille choisir ?',
    },
    description: {
      de: 'Gitarre lernen als Kind: Welche Gitarrengröße passt zu welchem Alter? 1/4 bis 4/4, Nylon oder Stahl – so findet ihr das passende Instrument.',
      en: 'Learning guitar as a kid: which guitar size suits which age? From 1/4 to 4/4, nylon or steel strings – how to find an instrument that fits.',
      fr: 'Apprendre la guitare enfant : quelle taille selon l’âge ? Du 1/4 au 4/4, cordes nylon ou acier – comment trouver l’instrument adapté.',
    },
    blocks: [
      {
        p: {
          de: 'Eine Gitarre, die zu groß ist, macht das Lernen unnötig schwer: Der Arm reicht kaum um den Korpus, die Finger kommen nicht bis zum dritten Bund, und schon nach ein paar Minuten tut die Schulter weh. Deshalb gibt es Gitarren in mehreren Größen. Sie unterscheiden sich vor allem in der **Mensur** – das ist die Länge der schwingenden Saite vom Sattel bis zum Steg.',
          en: 'A guitar that’s too big makes learning harder than it needs to be: your arm barely reaches over the body, your fingers can’t stretch to the third fret, and your shoulder aches after a few minutes. That’s why guitars come in several sizes. The main difference is the **scale length** – the length of the vibrating string from the nut to the bridge.',
          fr: 'Une guitare trop grande rend l’apprentissage inutilement difficile : le bras passe à peine par-dessus la caisse, les doigts n’atteignent pas la troisième case et l’épaule fatigue au bout de quelques minutes. C’est pourquoi les guitares existent en plusieurs tailles. Elles se distinguent surtout par leur **diapason**, la longueur de corde qui vibre entre le sillet et le chevalet.',
        },
      },
      { h2: { de: 'Größen im Überblick', en: 'Sizes at a glance', fr: 'Les tailles en bref' } },
      {
        p: {
          de: 'Die Angaben sind nur grobe Richtwerte. Entscheidend ist die Körpergröße, besonders die Armlänge, nicht das Alter allein.',
          en: 'These are rough guidelines only. Body height – especially arm length – matters more than age alone.',
          fr: 'Ces repères sont approximatifs. La taille de l’enfant, et surtout la longueur de ses bras, compte davantage que son âge.',
        },
      },
      {
        ul: [
          {
            de: '**1/4-Gitarre** (Mensur etwa 48 cm): etwa 4 bis 6 Jahre, bis rund 115 cm Körpergröße',
            en: '**1/4 guitar** (scale about 48 cm): roughly ages 4 to 6, up to about 115 cm tall',
            fr: '**Guitare 1/4** (diapason d’environ 48 cm) : vers 4 à 6 ans, jusqu’à environ 1,15 m',
          },
          {
            de: '**1/2-Gitarre** (etwa 53 cm): etwa 6 bis 8 Jahre, rund 115 bis 130 cm',
            en: '**1/2 guitar** (about 53 cm): roughly ages 6 to 8, about 115 to 130 cm',
            fr: '**Guitare 1/2** (environ 53 cm) : vers 6 à 8 ans, environ 1,15 à 1,30 m',
          },
          {
            de: '**3/4-Gitarre** (etwa 58 cm): etwa 8 bis 11 Jahre, rund 130 bis 145 cm',
            en: '**3/4 guitar** (about 58 cm): roughly ages 8 to 11, about 130 to 145 cm',
            fr: '**Guitare 3/4** (environ 58 cm) : vers 8 à 11 ans, environ 1,30 à 1,45 m',
          },
          {
            de: '**7/8-Gitarre** (etwa 62 cm): etwa 11 bis 13 Jahre und für Erwachsene mit kleinen Händen',
            en: '**7/8 guitar** (about 62 cm): roughly ages 11 to 13, and adults with small hands',
            fr: '**Guitare 7/8** (environ 62 cm) : vers 11 à 13 ans, et pour les adultes aux petites mains',
          },
          {
            de: '**4/4-Gitarre** (etwa 65 cm): ab etwa 150 bis 155 cm Körpergröße',
            en: '**4/4 guitar** (about 65 cm): from around 150 to 155 cm tall',
            fr: '**Guitare 4/4** (environ 65 cm) : à partir d’environ 1,50 à 1,55 m',
          },
        ],
      },
      {
        tip: {
          de: 'Der einfachste Test: Setz dich hin, nimm die Gitarre auf das Bein und streck den linken Arm entspannt aus. Du solltest den ersten Bund erreichen, ohne dich nach vorne zu lehnen. Und dein rechter Arm sollte bequem über den Korpus passen.',
          en: 'The simplest test: sit down, rest the guitar on your leg and stretch your fretting arm out loosely. You should reach the first fret without leaning forward, and your strumming arm should rest comfortably over the body.',
          fr: 'Le test le plus simple : assieds-toi, pose la guitare sur ta jambe et tends le bras gauche sans forcer. Tu dois atteindre la première case sans te pencher en avant, et ton bras droit doit passer confortablement par-dessus la caisse.',
        },
      },
      { h2: { de: 'Nylon oder Stahl?', en: 'Nylon or steel?', fr: 'Nylon ou acier ?' } },
      {
        p: {
          de: 'Für Kinder ist meist eine **Konzertgitarre** (auch klassische Gitarre) mit **Nylonsaiten** die beste Wahl. Nylonsaiten sind weicher und drücken weniger in die Fingerkuppen. Der Hals ist etwas breiter, sodass die Finger mehr Platz zwischen den Saiten haben. In Musikschulen und Schulklassen wird fast immer mit Konzertgitarren begonnen.',
          en: 'For children, a **classical guitar** with **nylon strings** is usually the best choice. Nylon strings are softer and press less into the fingertips. The neck is a little wider, giving the fingers more room between the strings. Most music schools and school classes start on classical guitars.',
          fr: 'Pour un enfant, une **guitare classique** à **cordes nylon** est généralement le meilleur choix. Les cordes nylon sont plus souples et marquent moins le bout des doigts. Le manche, un peu plus large, laisse davantage de place entre les cordes. Les écoles de musique et les classes commencent presque toujours avec des guitares classiques.',
        },
      },
      {
        p: {
          de: 'Eine **Westerngitarre** mit Stahlsaiten klingt heller und lauter, braucht aber mehr Kraft in den Fingern. Sie passt eher, wenn das Kind schon etwas Erfahrung hat oder unbedingt diesen Klang möchte. Wichtig: Auf eine Konzertgitarre dürfen nie Stahlsaiten – der Hals ist dafür nicht gebaut.',
          en: 'A **steel-string acoustic** sounds brighter and louder but needs more finger strength. It’s a better fit once a child has some experience or really wants that sound. Important: never put steel strings on a classical guitar – its neck isn’t built for that tension.',
          fr: 'Une **guitare folk** à cordes acier sonne plus brillante et plus fort, mais demande plus de force dans les doigts. Elle convient plutôt quand l’enfant a déjà un peu d’expérience ou tient vraiment à ce son. Important : ne monte jamais de cordes acier sur une guitare classique, son manche n’est pas conçu pour cette tension.',
        },
      },
      { h2: { de: 'Worauf ihr achten könnt', en: 'What to look for', fr: 'Ce qu’il faut vérifier' } },
      {
        ul: [
          {
            de: 'Die Saiten liegen nah am Griffbrett – zu hohe Saiten machen jeden Griff mühsam.',
            en: 'The strings sit close to the fretboard – high action makes every chord a struggle.',
            fr: 'Les cordes sont proches de la touche : des cordes trop hautes rendent chaque accord pénible.',
          },
          {
            de: 'Die Gitarre hält die Stimmung über mehrere Tage.',
            en: 'The guitar stays in tune for several days.',
            fr: 'La guitare tient l’accord pendant plusieurs jours.',
          },
          {
            de: 'Die Bundstäbchen stehen an den Kanten nicht über.',
            en: 'The fret ends don’t stick out at the edges of the neck.',
            fr: 'Les extrémités des frettes ne dépassent pas sur les bords du manche.',
          },
          {
            de: 'Eine weiche Tasche schützt beim Transport zur Schule.',
            en: 'A padded bag protects it on the way to school.',
            fr: 'Une housse rembourrée la protège sur le chemin de l’école.',
          },
        ],
      },
      {
        p: {
          de: 'Wenn die Gitarre da ist, geht es mit dem [Halten](wissen:gitarre-halten) und dem [Stimmen](wissen:gitarre-stimmen) los.',
          en: 'Once the guitar has arrived, start with [how to hold it](wissen:gitarre-halten) and [tuning](wissen:gitarre-stimmen).',
          fr: 'Une fois la guitare arrivée, commence par [la tenir](wissen:gitarre-halten) et [l’accorder](wissen:gitarre-stimmen).',
        },
      },
    ],
    related: ['gitarre-halten', 'gitarre-stimmen', 'instrumentalklasse-schule', 'ueben-mit-kindern'],
  },
  {
    id: 'gitarre-halten',
    slug: { de: 'gitarre-halten', en: 'hold-guitar', fr: 'tenir-guitare' },
    instruments: ['gitarre'],
    category: 'erste-schritte',
    title: {
      de: 'Gitarre richtig halten – Sitzhaltung für Anfänger',
      en: 'How to Hold a Guitar – Posture for Beginners',
      fr: 'Bien tenir la guitare – la posture du débutant',
    },
    description: {
      de: 'Gitarre halten leicht gemacht: Sitzhaltung, Fußbank, Daumen hinter dem Hals und lockere Schultern. So spielst du entspannt und ohne Schmerzen.',
      en: 'How to hold a guitar: sitting posture, footstool, thumb behind the neck and relaxed shoulders. Play comfortably and without aches from day one.',
      fr: 'Comment tenir la guitare : position assise, repose-pied, pouce derrière le manche, épaules détendues. Pour jouer à l’aise dès le premier jour.',
    },
    blocks: [
      {
        p: {
          de: 'Eine gute Haltung ist kein strenges Muss, sondern ein Trick, damit alles leichter geht. Wenn die Gitarre sicher liegt, müssen deine Hände sie nicht festhalten – und haben den Kopf frei für Akkorde und Rhythmus.',
          en: 'Good posture isn’t a strict rule – it’s a trick that makes everything easier. When the guitar sits securely, your hands don’t have to hold it up, so they’re free for chords and rhythm.',
          fr: 'Une bonne posture n’est pas une règle stricte, c’est une astuce pour que tout soit plus facile. Quand la guitare tient toute seule, tes mains n’ont pas besoin de la retenir : elles restent libres pour les accords et le rythme.',
        },
      },
      { h2: { de: 'Richtig sitzen', en: 'Sitting well', fr: 'Bien s’asseoir' } },
      {
        ol: [
          {
            de: 'Setz dich vorne auf einen Stuhl ohne Armlehnen. Beide Füße stehen fest auf dem Boden.',
            en: 'Sit near the front of a chair without armrests, both feet flat on the floor.',
            fr: 'Assieds-toi au bord d’une chaise sans accoudoirs, les deux pieds bien à plat.',
          },
          {
            de: 'Der Rücken ist gerade, aber nicht steif. Die Schultern hängen locker.',
            en: 'Keep your back straight but not stiff, and let your shoulders drop.',
            fr: 'Garde le dos droit sans être raide, les épaules relâchées.',
          },
          {
            de: 'Die Gitarre steht fast senkrecht, die Decke zeigt nach vorne, nicht zur Decke des Zimmers.',
            en: 'The guitar stands almost upright, with the top facing forwards rather than up at the ceiling.',
            fr: 'La guitare est presque verticale, la table tournée vers l’avant et non vers le plafond.',
          },
          {
            de: 'Der Hals zeigt leicht schräg nach oben, etwa so hoch wie deine Schulter.',
            en: 'The neck angles slightly upwards, with the headstock around shoulder height.',
            fr: 'Le manche monte légèrement en biais, la tête à peu près à hauteur d’épaule.',
          },
        ],
      },
      {
        p: {
          de: 'Es gibt zwei übliche Arten: Bei der **klassischen Haltung** liegt die Gitarre auf dem linken Oberschenkel, und der linke Fuß steht auf einer kleinen **Fußbank**. Alternativ hebt eine **Gitarrenstütze** am Korpus die Gitarre an, dann bleiben beide Füße auf dem Boden. Bei der **lockeren Haltung** liegt die Gitarre auf dem rechten Bein – so spielen viele, die vor allem Akkorde begleiten. Probier beides aus und nimm, was sich für dich gut anfühlt.',
          en: 'There are two common ways. In the **classical position** the guitar rests on your left thigh and your left foot is raised on a small **footstool**. Alternatively, a **guitar support** attached to the body lifts the guitar so both feet stay on the floor. In the **casual position** the guitar rests on your right leg – that’s how many people play when they mainly strum chords. Try both and pick what feels good.',
          fr: 'Il existe deux façons courantes. Dans la **position classique**, la guitare repose sur la cuisse gauche et le pied gauche est surélevé par un petit **repose-pied**. Un **support de guitare** fixé à la caisse peut aussi la surélever, et les deux pieds restent au sol. Dans la **position décontractée**, la guitare repose sur la jambe droite : c’est ce que font beaucoup de guitaristes qui accompagnent en grattant des accords. Essaie les deux et garde celle qui te convient.',
        },
      },
      {
        tip: {
          de: 'Linkshänder können die Gitarre spiegelverkehrt halten – dann muss sie aber umgebaut oder als Linkshändermodell gebaut sein. Viele Linkshänder lernen auch ganz normal rechtsherum. Probiert in Ruhe aus, was besser klappt.',
          en: 'Left-handed players can hold the guitar mirrored – but then it needs to be restrung or built as a left-handed model. Many left-handers also learn the standard way round. Take your time to find out what works best.',
          fr: 'Les gauchers peuvent tenir la guitare à l’envers – il faut alors une guitare pour gaucher ou inverser les cordes. Beaucoup de gauchers apprennent aussi dans le sens habituel. Prenez le temps de voir ce qui marche le mieux.',
        },
      },
      { h2: { de: 'Die Greifhand', en: 'The fretting hand', fr: 'La main gauche' } },
      {
        ul: [
          {
            de: 'Der **Daumen** liegt hinten am Hals, ungefähr hinter dem Mittelfinger. Er stützt nur, er drückt nicht.',
            en: 'Your **thumb** rests behind the neck, roughly behind your middle finger. It supports – it doesn’t squeeze.',
            fr: 'Le **pouce** se place derrière le manche, à peu près derrière le majeur. Il soutient, il ne serre pas.',
          },
          {
            de: 'Die Finger sind gebogen wie ein kleiner Bogen und drücken mit den **Fingerkuppen**.',
            en: 'Your fingers curve like little arches and press with the **fingertips**.',
            fr: 'Les doigts forment de petites arches et appuient avec le **bout des doigts**.',
          },
          {
            de: 'Das Handgelenk bleibt locker und knickt nicht stark ab.',
            en: 'Your wrist stays relaxed and doesn’t bend sharply.',
            fr: 'Le poignet reste souple, sans se plier fortement.',
          },
        ],
      },
      { h2: { de: 'Die Anschlaghand', en: 'The strumming hand', fr: 'La main droite' } },
      {
        p: {
          de: 'Dein rechter Unterarm liegt auf der Kante des Korpus. So hängt die Hand ganz natürlich über dem Schallloch. Von dort aus kannst du [anschlagen](wissen:schlagmuster-lernen) oder [zupfen](wissen:gitarre-zupfen).',
          en: 'Your right forearm rests on the edge of the body, so your hand hangs naturally over the sound hole. From there you can [strum](wissen:schlagmuster-lernen) or [fingerpick](wissen:gitarre-zupfen).',
          fr: 'Ton avant-bras droit repose sur le bord de la caisse, la main tombe naturellement au-dessus de la rosace. De là, tu peux [gratter](wissen:schlagmuster-lernen) ou [jouer en picking](wissen:gitarre-zupfen).',
        },
      },
      {
        tip: {
          de: 'Spür zwischendurch nach: Sind die Schultern hochgezogen? Dann kurz ausschütteln und weiterspielen. Kurze Pausen sind Teil des Übens.',
          en: 'Check in now and then: are your shoulders creeping up? Give them a shake and carry on. Short breaks are part of practising.',
          fr: 'Vérifie de temps en temps : tes épaules remontent ? Secoue-les un peu et continue. Les petites pauses font partie de l’entraînement.',
        },
      },
    ],
    related: ['gitarre-kinder', 'gitarre-saiten', 'gitarre-erste-akkorde', 'fingerkuppen-hornhaut'],
  },
  {
    id: 'gitarre-saiten',
    slug: { de: 'gitarre-saiten-namen', en: 'guitar-string-names', fr: 'noms-cordes-guitare' },
    instruments: ['gitarre'],
    category: 'erste-schritte',
    title: {
      de: 'Gitarrensaiten: Namen und Merksätze (E A D G H E)',
      en: 'Guitar String Names and How to Remember Them',
      fr: 'Noms des cordes de guitare : astuces pour les retenir',
    },
    description: {
      de: 'Die sechs Gitarrensaiten E A D G H E – mit Merksätzen, Zählweise und warum die h-Saite international B heißt. So merkst du sie dir schnell.',
      en: 'The six guitar strings E A D G B E – with memory sentences, how they are numbered and which one is thickest. Learn the string names fast.',
      fr: 'Les six cordes de la guitare Mi La Ré Sol Si Mi – phrases mnémotechniques, numérotation et astuces pour les retenir rapidement.',
    },
    blocks: [
      {
        p: {
          de: 'Eine Gitarre hat sechs Saiten. Wenn du sie nicht greifst, klingen sie (von der dicksten zur dünnsten): **E – A – D – G – H – E**. Die dickste Saite ist die tiefe E-Saite, die dünnste die hohe e-Saite. Beide heißen E, liegen aber zwei Oktaven auseinander.',
          en: 'A guitar has six strings. Played open, from thickest to thinnest, they are: **E – A – D – G – B – E**. The thickest is the low E string, the thinnest the high E string. Both are E, just two octaves apart.',
          fr: 'Une guitare a six cordes. À vide, de la plus grosse à la plus fine, elles donnent : **Mi – La – Ré – Sol – Si – Mi**. La plus grosse est le Mi grave, la plus fine le Mi aigu : deux Mi, à deux octaves d’écart.',
        },
      },
      {
        tip: {
          de: '**H oder B?** Im Deutschen heißt der Ton zwischen A und C traditionell **H**, international aber **B**. In Akkordsymbolen und in dieser App steht deshalb oft B. Gemeint ist derselbe Ton. Mehr dazu unter [Töne und Notennamen](wissen:toene-und-notennamen).',
          en: '**B or H?** In German-speaking countries the note between A and C is traditionally called **H**, while everywhere else it’s **B**. Same note, different name. More in [note names](wissen:toene-und-notennamen).',
          fr: '**Si, B ou H ?** Dans les grilles d’accords anglo-saxonnes, le Si s’écrit **B** ; en Allemagne on l’appelle souvent **H**. C’est toujours la même note. Plus de détails dans [le nom des notes](wissen:toene-und-notennamen).',
        },
      },
      { h2: { de: 'Merksätze', en: 'Memory sentences', fr: 'Phrases mnémotechniques' } },
      {
        p: {
          de: 'Mit einem Satz, dessen Wörter mit den Saitennamen beginnen, merkst du dir die Reihenfolge von der tiefsten zur höchsten Saite ganz leicht:',
          en: 'A sentence whose words start with the string names makes the order from lowest to highest easy to remember:',
          fr: 'Une phrase dont les mots commencent comme les noms des cordes aide à retenir l’ordre, du grave à l’aigu :',
        },
      },
      {
        ul: [
          {
            de: '**E**ine **A**lte **D**ame **G**eht **H**eute **E**inkaufen',
            en: '**E**at **A**ll **D**ay, **G**et **B**ig **E**asily',
            fr: '**M**a **L**une **R**êve, **S**on **S**ourire **M**onte (Mi, La, Ré, Sol, Si, Mi)',
          },
          {
            de: '**E**in **A**nfänger **D**er **G**itarre **H**at **E**rfolg',
            en: '**E**very **A**corn **D**reams **G**rowing **B**ig **E**ventually',
            fr: '**M**on **L**apin **R**onge **S**ept **S**uperbes **M**elons',
          },
        ],
      },
      {
        p: {
          de: 'Noch besser: Denk dir einen eigenen Satz aus! Was du selbst erfunden hast, vergisst du kaum.',
          en: 'Even better: make up your own sentence! Things you invent yourself are hard to forget.',
          fr: 'Encore mieux : invente ta propre phrase ! Ce que tu as inventé toi-même, tu l’oublies difficilement.',
        },
      },
      {
        p: {
          de: 'Auf einer Konzertgitarre erkennst du die drei tiefen Saiten übrigens leicht: Sie sind mit feinem Draht umwickelt und glänzen metallisch. Die drei hohen Saiten sind glatt und durchsichtig oder milchig. Wenn du beim Spielen von oben auf die Gitarre schaust, liegt die tiefe E-Saite oben, nah bei deinem Gesicht – obwohl sie den tiefsten Ton hat.',
          en: 'On a classical guitar the three low strings are easy to spot: they’re wound with fine wire and look metallic. The three high strings are smooth and clear or milky. When you look down at the guitar while playing, the low E string is at the top, closest to your face – even though it has the lowest sound.',
          fr: 'Sur une guitare classique, les trois cordes graves se reconnaissent facilement : elles sont filées d’un fin fil métallique et brillent. Les trois aiguës sont lisses, transparentes ou laiteuses. Quand tu regardes ta guitare en jouant, le Mi grave est en haut, près de ton visage, même si c’est le son le plus grave.',
        },
      },
      { h2: { de: 'Saiten zählen', en: 'Numbering the strings', fr: 'Numéroter les cordes' } },
      {
        p: {
          de: 'In Noten und Tabulaturen werden die Saiten oft nummeriert. Dabei ist die **1. Saite die dünnste** (hohes e) und die **6. Saite die dickste** (tiefes E). Das klingt erst verdreht, ist aber überall so üblich.',
          en: 'In notation and tab the strings are often numbered. The **1st string is the thinnest** (high E) and the **6th string is the thickest** (low E). It sounds backwards at first, but that’s the standard everywhere.',
          fr: 'Dans les partitions et tablatures, les cordes sont souvent numérotées. La **1re corde est la plus fine** (Mi aigu) et la **6e la plus grosse** (Mi grave). Ça paraît inversé au début, mais c’est la convention partout.',
        },
      },
      {
        ul: [
          { de: '6. Saite: tiefes E', en: '6th string: low E', fr: '6e corde : Mi grave' },
          { de: '5. Saite: A', en: '5th string: A', fr: '5e corde : La' },
          { de: '4. Saite: D', en: '4th string: D', fr: '4e corde : Ré' },
          { de: '3. Saite: G', en: '3rd string: G', fr: '3e corde : Sol' },
          { de: '2. Saite: H (B)', en: '2nd string: B', fr: '2e corde : Si' },
          { de: '1. Saite: hohes e', en: '1st string: high E', fr: '1re corde : Mi aigu' },
        ],
      },
      {
        p: {
          de: 'Diese Nummern brauchst du zum Beispiel beim [Tabulatur lesen](wissen:tabulatur-lesen) und beim [Stimmen](wissen:gitarre-stimmen). Im Stimmgerät der App kannst du jede Saite auch anhören.',
          en: 'You’ll need these numbers when you [read tab](wissen:tabulatur-lesen) and when you [tune](wissen:gitarre-stimmen). In the app’s tuner you can also listen to each string.',
          fr: 'Ces numéros te serviront pour [lire une tablature](wissen:tabulatur-lesen) et pour [accorder](wissen:gitarre-stimmen). Dans l’accordeur de l’appli, tu peux aussi écouter chaque corde.',
        },
      },
      { tool: 'stimmen' },
    ],
    related: ['gitarre-stimmen', 'toene-und-notennamen', 'tabulatur-lesen', 'gitarre-halten'],
  },
  {
    id: 'gitarre-stimmen',
    slug: { de: 'gitarre-stimmen', en: 'tune-guitar', fr: 'accorder-guitare' },
    instruments: ['gitarre'],
    category: 'erste-schritte',
    title: {
      de: 'Gitarre stimmen – so geht’s auch für Anfänger',
      en: 'How to Tune a Guitar – Easy Guide for Beginners',
      fr: 'Accorder sa guitare – la méthode pour débutants',
    },
    description: {
      de: 'Gitarre stimmen Schritt für Schritt: mit Stimmgerät oder nach Gehör über den 5. Bund. Mit Tipps, wenn eine Saite nicht in Stimmung bleibt.',
      en: 'Tune your guitar step by step: with a tuner or by ear using the 5th-fret method. Plus tips for strings that keep slipping out of tune.',
      fr: 'Accorder sa guitare pas à pas : avec un accordeur ou à l’oreille par la 5e case. Avec des conseils quand une corde ne tient pas l’accord.',
    },
    blocks: [
      {
        p: {
          de: 'Eine gestimmte Gitarre klingt sofort schöner – und du hörst besser, ob dein Griff schon sitzt. Deshalb gilt: **vor jedem Üben kurz stimmen**. Das dauert nach ein paar Wochen keine Minute mehr.',
          en: 'A guitar in tune instantly sounds better – and you can hear much more clearly whether your chord is working. So: **tune briefly every time you practise**. After a few weeks it takes less than a minute.',
          fr: 'Une guitare accordée sonne tout de suite mieux, et tu entends mieux si ton accord est bien placé. Donc : **accorde-la rapidement avant chaque séance**. Après quelques semaines, ça prend moins d’une minute.',
        },
      },
      {
        p: {
          de: 'Die Standardstimmung von der dicksten zur dünnsten Saite ist **E – A – D – G – H – E** (international E A D G B E). Die tiefe E-Saite klingt zwei Oktaven tiefer als die hohe.',
          en: 'Standard tuning from thickest to thinnest string is **E – A – D – G – B – E**. The low E sounds two octaves below the high E.',
          fr: 'L’accordage standard, de la plus grosse à la plus fine corde, est **Mi – La – Ré – Sol – Si – Mi** (E A D G B E). Le Mi grave sonne deux octaves sous le Mi aigu.',
        },
      },
      { h2: { de: 'Mit dem Stimmgerät', en: 'With a tuner', fr: 'Avec un accordeur' } },
      {
        ol: [
          {
            de: 'Öffne das [Stimmgerät](tool:stimmen) und erlaube das Mikrofon. Alles bleibt auf deinem Gerät.',
            en: 'Open the [tuner](tool:stimmen) and allow the microphone. Everything stays on your device.',
            fr: 'Ouvre l’[accordeur](tool:stimmen) et autorise le micro. Tout reste sur ton appareil.',
          },
          {
            de: 'Zupf eine Saite einzeln und lass sie klingen.',
            en: 'Pluck one string on its own and let it ring.',
            fr: 'Pince une seule corde et laisse-la sonner.',
          },
          {
            de: 'Zeigt die Nadel nach links, ist die Saite zu tief: Wirbel langsam fester drehen. Nach rechts: etwas lockern.',
            en: 'If the needle points left, the string is flat: tighten the tuning peg slowly. If it points right, loosen it a little.',
            fr: 'Si l’aiguille part à gauche, la corde est trop basse : tends-la doucement. À droite, détends-la un peu.',
          },
          {
            de: 'Wenn die Nadel in der Mitte steht, ist die Saite gestimmt. Weiter zur nächsten.',
            en: 'When the needle sits in the middle, that string is in tune. On to the next one.',
            fr: 'Quand l’aiguille est au centre, la corde est juste. Passe à la suivante.',
          },
        ],
      },
      {
        tip: {
          de: 'Stimm immer von unten nach oben: Ist die Saite zu hoch, lass sie erst etwas tiefer und dreh sie dann langsam hinauf. So hält die Stimmung besser.',
          en: 'Always tune up to the note: if a string is too high, drop it a little below and then bring it slowly up. It holds its tuning better that way.',
          fr: 'Accorde toujours en montant : si la corde est trop haute, descends-la un peu en dessous, puis remonte doucement. L’accord tient mieux ainsi.',
        },
      },
      { tool: 'stimmen' },
      { h2: { de: 'Nach Gehör: die 5.-Bund-Methode', en: 'By ear: the 5th-fret method', fr: 'À l’oreille : la méthode de la 5e case' } },
      {
        p: {
          de: 'Wenn die tiefe E-Saite stimmt, kannst du die anderen danach ausrichten. Du greifst eine Saite in einem bestimmten Bund und vergleichst sie mit der nächsten leeren Saite. Beide sollen gleich klingen.',
          en: 'Once the low E string is in tune, you can tune the others to it. Fret one string at a certain fret and compare it with the next open string. Both should sound the same.',
          fr: 'Quand le Mi grave est juste, tu peux accorder les autres cordes à partir de lui. Appuie une corde à une case précise et compare-la à la corde voisine jouée à vide : les deux doivent sonner pareil.',
        },
      },
      {
        ul: [
          {
            de: 'Tiefe E-Saite im **5. Bund** = leere A-Saite',
            en: 'Low E string at the **5th fret** = open A string',
            fr: 'Mi grave à la **5e case** = La à vide',
          },
          { de: 'A-Saite im **5. Bund** = leere D-Saite', en: 'A string at the **5th fret** = open D string', fr: 'La à la **5e case** = Ré à vide' },
          { de: 'D-Saite im **5. Bund** = leere G-Saite', en: 'D string at the **5th fret** = open G string', fr: 'Ré à la **5e case** = Sol à vide' },
          {
            de: 'G-Saite im **4. Bund** = leere H-Saite (die Ausnahme!)',
            en: 'G string at the **4th fret** = open B string (the exception!)',
            fr: 'Sol à la **4e case** = Si à vide (l’exception !)',
          },
          { de: 'H-Saite im **5. Bund** = leere hohe e-Saite', en: 'B string at the **5th fret** = open high E string', fr: 'Si à la **5e case** = Mi aigu à vide' },
        ],
      },
      { h2: { de: 'Wenn es nicht klappen will', en: 'When it just won’t work', fr: 'Quand ça ne veut pas' } },
      {
        ul: [
          {
            de: 'Neue Saiten dehnen sich ein paar Tage lang und müssen oft nachgestimmt werden. Das ist normal.',
            en: 'New strings stretch for a few days and need retuning often. That’s normal.',
            fr: 'Des cordes neuves se détendent pendant quelques jours et doivent souvent être réaccordées. C’est normal.',
          },
          {
            de: 'Zupf beim Drehen immer wieder an, damit du hörst, was passiert – und prüf, ob du den richtigen Wirbel erwischt hast.',
            en: 'Keep plucking while you turn so you can hear what’s happening – and check you’re turning the right peg.',
            fr: 'Continue à pincer la corde pendant que tu tournes pour entendre ce qui se passe, et vérifie que c’est la bonne clé.',
          },
          {
            de: 'Eine Saite reißt eher, wenn sie viel zu hoch gestimmt wird. Dreh lieber in kleinen Schritten.',
            en: 'Strings break more easily when tuned far too high. Turn in small steps.',
            fr: 'Une corde casse plus facilement si on la tend beaucoup trop. Tourne par petites étapes.',
          },
        ],
      },
      {
        p: {
          de: 'Wie du Saiten aufziehst und die Gitarre pflegst, steht unter [Saiten wechseln und Pflege](wissen:saiten-wechseln-pflege).',
          en: 'How to fit new strings and look after your guitar is covered in [changing strings and care](wissen:saiten-wechseln-pflege).',
          fr: 'Pour monter des cordes et entretenir ta guitare, lis [changer les cordes et entretien](wissen:saiten-wechseln-pflege).',
        },
      },
    ],
    related: ['gitarre-saiten', 'saiten-wechseln-pflege', 'gitarre-erste-akkorde', 'app-ohne-konto'],
  },
  {
    id: 'gitarre-erste-akkorde',
    slug: { de: 'gitarre-erste-akkorde', en: 'first-guitar-chords', fr: 'premiers-accords-guitare' },
    instruments: ['gitarre'],
    category: 'erste-schritte',
    title: {
      de: 'Gitarre lernen: Die ersten Akkorde für Anfänger',
      en: 'Learn Guitar: Your First Chords as a Beginner',
      fr: 'Apprendre la guitare : les premiers accords',
    },
    description: {
      de: 'Gitarre lernen für Kinder und Anfänger: Em, Am, C, G und D – mit Griffbildern, einfachen Ein-Finger-Varianten und dem ersten Akkordwechsel.',
      en: 'Learn guitar as a beginner or kid: Em, Am, C, G and D – with chord diagrams, easy one-finger versions and your very first chord change.',
      fr: 'Apprendre la guitare enfant ou débutant : Em, Am, C, G et D, avec schémas, versions faciles à un doigt et ton tout premier changement d’accord.',
    },
    blocks: [
      {
        p: {
          de: 'Mit wenigen Akkorden kannst du schon richtig viele Lieder begleiten. Fang mit Griffen an, bei denen nur zwei oder drei Finger drücken. Wichtig ist nicht Tempo, sondern dass jede Saite klar klingt.',
          en: 'With just a few chords you can already accompany loads of songs. Start with shapes that need only two or three fingers. Speed doesn’t matter yet – what counts is that every string rings clearly.',
          fr: 'Avec quelques accords, tu peux déjà accompagner plein de chansons. Commence par ceux qui ne demandent que deux ou trois doigts. La vitesse n’a pas d’importance : l’essentiel est que chaque corde sonne clairement.',
        },
      },
      { h2: { de: 'Der leichteste Anfang: e-Moll', en: 'The easiest start: E minor', fr: 'Le début le plus facile : Mi mineur' } },
      {
        p: {
          de: '**Em** braucht nur zwei Finger: Mittelfinger auf die A-Saite und Ringfinger auf die D-Saite, beide im 2. Bund. Dann schlägst du alle sechs Saiten an. Klingt ein bisschen geheimnisvoll, oder?',
          en: '**Em** needs just two fingers: middle finger on the A string and ring finger on the D string, both at the 2nd fret. Then strum all six strings. Sounds a bit mysterious, doesn’t it?',
          fr: '**Em** ne demande que deux doigts : le majeur sur la corde de La et l’annulaire sur la corde de Ré, tous deux en case 2. Puis gratte les six cordes. Ça sonne un peu mystérieux, non ?',
        },
      },
      { chord: 'Em' },
      { h2: { de: 'Der erste Wechsel: Em zu Am', en: 'Your first change: Em to Am', fr: 'Premier changement : Em vers Am' } },
      {
        p: {
          de: 'Für **Am** rutschen dieselben beiden Finger einfach **eine Saite tiefer** (Richtung Boden): Mittelfinger auf die D-Saite, Ringfinger auf die G-Saite, beide im 2. Bund. Dazu kommt der Zeigefinger auf die H-Saite im 1. Bund. Die tiefe E-Saite schlägst du nicht an.',
          en: 'For **Am**, the same two fingers simply slide **one string over** (towards the floor): middle finger on the D string, ring finger on the G string, both at the 2nd fret. Add your index finger on the B string at the 1st fret. Don’t strum the low E string.',
          fr: 'Pour **Am**, les deux mêmes doigts descendent simplement **d’une corde** (vers le sol) : majeur sur le Ré, annulaire sur le Sol, toujours en case 2. Ajoute l’index sur la corde de Si en case 1. Ne gratte pas le Mi grave.',
        },
      },
      { chord: 'Am' },
      {
        tip: {
          de: 'Übe den Wechsel ganz langsam: viermal Em, viermal Am. Schau, welcher Finger zuerst ankommt – und lass die anderen nachrutschen. Im [Akkord-Spiel](tool:spiel) kannst du genau diesen Wechsel trainieren.',
          en: 'Practise the change really slowly: four strums of Em, four of Am. Notice which finger lands first and let the others follow. You can train exactly this change in the [chord game](tool:spiel).',
          fr: 'Travaille le changement très lentement : quatre fois Em, quatre fois Am. Observe quel doigt arrive en premier et laisse les autres suivre. Le [jeu des accords](tool:spiel) permet d’entraîner exactement ce passage.',
        },
      },
      { h2: { de: 'C, G und D', en: 'C, G and D', fr: 'C, G et D' } },
      {
        p: {
          de: 'Mit **C**, **G** und **D** hast du die Akkorde für unzählige Lieder. Am Anfang dürfen es auch kleine Varianten sein:',
          en: 'With **C**, **G** and **D** you have the chords for countless songs. At first, small versions are perfectly fine:',
          fr: 'Avec **C**, **G** et **D**, tu as les accords d’innombrables chansons. Au début, des versions simplifiées suffisent :',
        },
      },
      {
        ul: [
          {
            de: '**Kleines C:** nur Zeigefinger auf der H-Saite im 1. Bund, dazu die drei dünnsten Saiten anschlagen.',
            en: '**Mini C:** just your index finger on the B string at the 1st fret, and strum only the three thinnest strings.',
            fr: '**Petit C :** seulement l’index sur la corde de Si en case 1, et gratte uniquement les trois cordes les plus fines.',
          },
          {
            de: '**Kleines G:** nur Ringfinger auf der hohen e-Saite im 3. Bund, wieder die drei dünnsten Saiten.',
            en: '**Mini G:** just your ring finger on the high E string at the 3rd fret, again only the three thinnest strings.',
            fr: '**Petit G :** seulement l’annulaire sur le Mi aigu en case 3, toujours sur les trois cordes les plus fines.',
          },
          {
            de: '**D** greifst du mit drei Fingern auf den drei dünnsten Saiten und schlägst ab der D-Saite an.',
            en: '**D** uses three fingers on the three thinnest strings; strum from the D string down.',
            fr: '**D** se joue avec trois doigts sur les trois cordes fines ; gratte à partir de la corde de Ré.',
          },
        ],
      },
      { chord: 'C' },
      { chord: 'G' },
      { chord: 'D' },
      {
        p: {
          de: 'Später ergänzt du die vollen Griffe von C und G. Ein gutes erstes Lied mit zwei Akkorden ist [Hänschen klein](lied:haenschen-klein); mit Am wird es bei [Am Lagerfeuer](lied:lagerfeuer) spannend. Mehr Ideen: [Lieder für Anfänger](wissen:lieder-fuer-anfaenger).',
          en: 'Later you’ll add the full C and G shapes. A good first two-chord song is [Hänschen klein](lied:haenschen-klein); with Am, try [Am Lagerfeuer](lied:lagerfeuer). More ideas: [easy songs for beginners](wissen:lieder-fuer-anfaenger).',
          fr: 'Plus tard, tu ajouteras les formes complètes de C et G. Une bonne première chanson à deux accords : [Hänschen klein](lied:haenschen-klein) ; avec Am, essaie [Am Lagerfeuer](lied:lagerfeuer). D’autres idées : [chansons faciles pour débutants](wissen:lieder-fuer-anfaenger).',
        },
      },
      { tool: 'akkorde' },
    ],
    related: ['gitarre-akkorde', 'akkordwechsel-schneller', 'saubere-griffe', 'fingerkuppen-hornhaut'],
  },
  {
    id: 'gitarre-akkorde',
    slug: { de: 'wichtigste-gitarre-akkorde', en: 'guitar-chords', fr: 'accords-guitare' },
    instruments: ['gitarre'],
    category: 'akkorde',
    title: {
      de: 'Gitarre Akkorde: Die wichtigsten Griffe im Überblick',
      en: 'Guitar Chords: The Most Important Shapes',
      fr: 'Accords de guitare : les plus importants',
    },
    description: {
      de: 'Die wichtigsten Gitarre-Akkorde mit Griffbildern: Dur, Moll und Septakkorde in offener Lage – und welche Akkorde in welchen Tonarten zusammengehören.',
      en: 'The most important guitar chords with diagrams: major, minor and seventh chords in open position – and which chords belong together in a key.',
      fr: 'Les accords de guitare essentiels avec schémas : majeurs, mineurs et septièmes en position ouverte, et quels accords vont ensemble.',
    },
    blocks: [
      {
        p: {
          de: 'Die meisten Lieder für Anfänger kommen mit einer Handvoll **offener Akkorde** aus. „Offen“ heißt: Einige Saiten klingen leer mit, ohne dass ein Finger drückt. Das klingt voll und ist leichter zu greifen als Barré-Akkorde.',
          en: 'Most beginner songs need only a handful of **open chords**. “Open” means some strings ring without any finger pressing them. That sounds full and is easier to play than barre chords.',
          fr: 'La plupart des chansons pour débutants n’utilisent qu’une poignée d’**accords ouverts**. « Ouvert » signifie que certaines cordes sonnent à vide, sans doigt posé. Ça sonne ample et c’est plus facile que les barrés.',
        },
      },
      { h2: { de: 'Dur-Akkorde', en: 'Major chords', fr: 'Accords majeurs' } },
      {
        p: {
          de: 'Dur-Akkorde klingen hell und fröhlich. Die fünf wichtigsten in offener Lage sind C, G, D, A und E.',
          en: 'Major chords sound bright and happy. The five key open-position ones are C, G, D, A and E.',
          fr: 'Les accords majeurs sonnent clairs et joyeux. Les cinq principaux en position ouverte sont C, G, D, A et E.',
        },
      },
      { chord: 'C' },
      { chord: 'G' },
      { chord: 'D' },
      { chord: 'A' },
      { chord: 'E' },
      { h2: { de: 'Moll-Akkorde', en: 'Minor chords', fr: 'Accords mineurs' } },
      {
        p: {
          de: 'Moll-Akkorde klingen weicher, oft etwas nachdenklich. Am, Em und Dm reichen für den Anfang. Vergleich mal A und Am: Nur ein einziger Ton ist anders. Wie man den Unterschied hört, steht unter [Dur und Moll](wissen:dur-und-moll).',
          en: 'Minor chords sound softer and often a little thoughtful. Am, Em and Dm are plenty to start with. Compare A and Am: just one note is different. How to hear the difference is explained in [major and minor](wissen:dur-und-moll).',
          fr: 'Les accords mineurs sonnent plus doux, souvent un peu mélancoliques. Am, Em et Dm suffisent pour commencer. Compare A et Am : une seule note change. Pour entendre la différence, lis [majeur et mineur](wissen:dur-und-moll).',
        },
      },
      { chord: 'Am' },
      { chord: 'Em' },
      { chord: 'Dm' },
      { h2: { de: 'Septakkorde', en: 'Seventh chords', fr: 'Accords de septième' } },
      {
        p: {
          de: 'Ein Septakkord (geschrieben mit 7, zum Beispiel G7) hat einen zusätzlichen Ton, der nach „weiter, bitte!“ klingt. Er führt oft zurück zum Grundakkord, etwa G7 zu C. Häufig sind E7, A7, D7, G7 und C7.',
          en: 'A seventh chord (written with a 7, like G7) has an extra note that sounds like “keep going!”. It often leads back home, for example G7 to C. Common ones are E7, A7, D7, G7 and C7.',
          fr: 'Un accord de septième (noté avec un 7, comme G7) contient une note en plus qui donne envie de continuer. Il ramène souvent à l’accord principal, par exemple G7 vers C. Les plus courants : E7, A7, D7, G7 et C7.',
        },
      },
      { chord: 'G7' },
      { chord: 'D7' },
      { chord: 'E7' },
      { chord: 'A7' },
      { h2: { de: 'Welche Akkorde gehören zusammen?', en: 'Which chords go together?', fr: 'Quels accords vont ensemble ?' } },
      {
        p: {
          de: 'In einer Tonart tauchen immer wieder dieselben Akkorde auf. Wenn du diese Gruppen kennst, kannst du viele Lieder schon nach dem ersten Hinschauen spielen:',
          en: 'Within a key, the same chords turn up again and again. Once you know these groups, you can play lots of songs almost at first sight:',
          fr: 'Dans une tonalité, on retrouve sans cesse les mêmes accords. Une fois ces familles connues, tu peux jouer beaucoup de chansons presque à vue :',
        },
      },
      {
        ul: [
          { de: '**C-Dur:** C, F, G (G7), Am, Dm, Em', en: '**C major:** C, F, G (G7), Am, Dm, Em', fr: '**Do majeur :** C, F, G (G7), Am, Dm, Em' },
          { de: '**G-Dur:** G, C, D (D7), Em, Am', en: '**G major:** G, C, D (D7), Em, Am', fr: '**Sol majeur :** G, C, D (D7), Em, Am' },
          { de: '**D-Dur:** D, G, A (A7), Em', en: '**D major:** D, G, A (A7), Em', fr: '**Ré majeur :** D, G, A (A7), Em' },
          { de: '**A-Dur:** A, D, E (E7)', en: '**A major:** A, D, E (E7)', fr: '**La majeur :** A, D, E (E7)' },
          { de: '**a-Moll:** Am, Dm, E (E7), C, G', en: '**A minor:** Am, Dm, E (E7), C, G', fr: '**La mineur :** Am, Dm, E (E7), C, G' },
        ],
      },
      {
        tip: {
          de: 'G-Dur ist auf der Gitarre besonders bequem: G, C, D und Em liegen gut in der Hand. Steht ein Lied in einer schwierigen Tonart, hilft oft [Transponieren](wissen:transponieren) oder ein [Kapodaster](wissen:gitarre-kapodaster).',
          en: 'G major is especially comfortable on guitar: G, C, D and Em all sit nicely under the fingers. If a song is in an awkward key, [transposing](wissen:transponieren) or a [capo](wissen:gitarre-kapodaster) often helps.',
          fr: 'Sol majeur est particulièrement confortable à la guitare : G, C, D et Em tombent bien sous les doigts. Si une chanson est dans une tonalité difficile, [transposer](wissen:transponieren) ou un [capodastre](wissen:gitarre-kapodaster) aide souvent.',
        },
      },
      {
        p: {
          de: 'Was die Zeichen hinter dem Buchstaben bedeuten, erklärt [Akkordsymbole lesen](wissen:akkordsymbole-lesen). Den F-Akkord findest du bei den [Barré-Griffen](wissen:gitarre-barre).',
          en: 'What the symbols after the letter mean is explained in [reading chord symbols](wissen:akkordsymbole-lesen). You’ll find the F chord under [barre chords](wissen:gitarre-barre).',
          fr: 'La signification des symboles après la lettre est expliquée dans [lire les symboles d’accords](wissen:akkordsymbole-lesen). L’accord de F se trouve avec les [accords barrés](wissen:gitarre-barre).',
        },
      },
      { tool: 'akkorde' },
    ],
    related: ['gitarre-erste-akkorde', 'gitarre-barre', 'akkordsymbole-lesen', 'dur-und-moll'],
  },
  {
    id: 'gitarre-barre',
    slug: { de: 'barre-griffe-gitarre', en: 'guitar-barre-chords', fr: 'accords-barres-guitare' },
    instruments: ['gitarre'],
    category: 'technik',
    title: {
      de: 'Barré-Griffe auf der Gitarre – und F leichter spielen',
      en: 'Guitar Barre Chords – and an Easier F Chord',
      fr: 'Accords barrés à la guitare – et un Fa plus facile',
    },
    description: {
      de: 'Barré-Griffe auf der Gitarre lernen: F-Akkord vereinfachen mit kleinem F und Fmaj7, Barré Schritt für Schritt üben und typische Probleme lösen.',
      en: 'Learn guitar barre chords: simplify the F chord with a mini F and Fmaj7, practise the barre step by step and sort out common problems.',
      fr: 'Apprendre les accords barrés à la guitare : simplifier le Fa avec un petit F et Fmaj7, travailler le barré pas à pas, résoudre les soucis courants.',
    },
    blocks: [
      {
        p: {
          de: 'Bei einem **Barré** legt sich der Zeigefinger quer über mehrere Saiten – wie ein Kapodaster aus Fleisch und Blut. Damit kannst du Griffe verschieben und jeden Akkord in jeder Tonart spielen. Der berühmteste ist der **F-Akkord**: Er kommt in vielen Liedern in C-Dur vor und ist für fast alle am Anfang eine Herausforderung. Das ist ganz normal und braucht einfach Zeit.',
          en: 'In a **barre**, your index finger lies flat across several strings – like a capo made of finger. Barres let you move shapes up the neck and play any chord in any key. The most famous one is the **F chord**: it turns up in lots of songs in C major, and almost everyone finds it tough at first. That’s completely normal and just takes time.',
          fr: 'Dans un **barré**, l’index se couche à plat sur plusieurs cordes, comme un capodastre en chair et en os. Le barré permet de déplacer les formes et de jouer n’importe quel accord dans n’importe quelle tonalité. Le plus célèbre est le **Fa (F)** : il revient dans beaucoup de chansons en Do majeur et donne du fil à retordre à presque tout le monde au début. C’est normal, il faut juste du temps.',
        },
      },
      { h2: { de: 'Erst einmal: F vereinfachen', en: 'First: make F easier', fr: 'D’abord : simplifier le Fa' } },
      {
        p: {
          de: 'Du musst nicht warten, bis der volle Barré klappt. Diese Varianten klingen gut und passen in fast jedes Lied:',
          en: 'You don’t have to wait until the full barre works. These versions sound good and fit almost any song:',
          fr: 'Pas besoin d’attendre que le barré complet fonctionne. Ces versions sonnent bien et conviennent à presque toutes les chansons :',
        },
      },
      {
        ul: [
          {
            de: '**Fmaj7:** Ringfinger auf der D-Saite im 3. Bund, Mittelfinger auf der G-Saite im 2. Bund, Zeigefinger auf der H-Saite im 1. Bund, hohe e-Saite leer. Nur die vier dünnsten Saiten anschlagen. Klingt weich und ist der leichteste Einstieg.',
            en: '**Fmaj7:** ring finger on the D string at the 3rd fret, middle finger on the G string at the 2nd fret, index on the B string at the 1st fret, high E open. Strum only the four thinnest strings. It sounds soft and is the easiest way in.',
            fr: '**Fmaj7 :** annulaire sur la corde de Ré en case 3, majeur sur le Sol en case 2, index sur le Si en case 1, Mi aigu à vide. Gratte seulement les quatre cordes les plus fines. Doux à l’oreille et le plus facile pour commencer.',
          },
          {
            de: '**Kleines F:** wie Fmaj7, aber der Zeigefinger liegt flach über H- und hoher e-Saite im 1. Bund – ein Mini-Barré über zwei Saiten. Wieder nur vier Saiten anschlagen.',
            en: '**Mini F:** like Fmaj7, but your index finger lies flat across the B and high E strings at the 1st fret – a mini barre over two strings. Again, strum just four strings.',
            fr: '**Petit F :** comme Fmaj7, mais l’index se couche sur le Si et le Mi aigu en case 1 – un mini-barré sur deux cordes. Là encore, gratte seulement quatre cordes.',
          },
        ],
      },
      { chord: 'Fmaj7' },
      { chord: 'F' },
      {
        p: {
          de: 'Das Griffbild oben zeigt das volle F mit Barré. Wenn das kleine F sicher sitzt, ist der Weg dorthin nicht mehr weit.',
          en: 'The diagram above shows the full barre F. Once the mini F feels solid, you’re not far off.',
          fr: 'Le schéma ci-dessus montre le Fa complet avec barré. Quand le petit F est bien en place, tu n’en es plus très loin.',
        },
      },
      { h2: { de: 'Den Barré Schritt für Schritt üben', en: 'Practising the barre step by step', fr: 'Travailler le barré pas à pas' } },
      {
        ol: [
          {
            de: 'Leg den Zeigefinger im 1. Bund quer über alle Saiten, ohne andere Finger. Schlag jede Saite einzeln an und hör, welche noch dumpf klingt.',
            en: 'Lay your index finger across all strings at the 1st fret, no other fingers. Pluck each string separately and listen for any that sound muffled.',
            fr: 'Pose l’index sur toutes les cordes en case 1, sans les autres doigts. Pince chaque corde séparément et écoute celles qui sonnent étouffées.',
          },
          {
            de: 'Dreh den Zeigefinger leicht auf die Kante zur Kopfplatte hin. Die harte Knochenseite drückt besser als die weiche Unterseite.',
            en: 'Roll your index finger slightly onto its edge, towards the headstock. The bony side presses better than the soft underside.',
            fr: 'Fais légèrement rouler l’index sur sa tranche, côté tête de la guitare. Le côté osseux appuie mieux que le dessous charnu.',
          },
          {
            de: 'Leg den Finger dicht hinter das Bundstäbchen, nicht in die Mitte zwischen zwei Bünde.',
            en: 'Place your finger just behind the fret wire, not in the middle between two frets.',
            fr: 'Place le doigt juste derrière la frette, pas au milieu de la case.',
          },
          {
            de: 'Zieh mit dem Arm leicht nach hinten, statt nur mit dem Daumen zu quetschen. So brauchst du weniger Kraft.',
            en: 'Let your arm pull back gently instead of squeezing with your thumb. That way you need much less strength.',
            fr: 'Tire légèrement avec le bras au lieu de serrer avec le pouce. Tu as ainsi besoin de beaucoup moins de force.',
          },
          {
            de: 'Erst dann kommen Mittel-, Ring- und kleiner Finger dazu.',
            en: 'Only then add your middle, ring and little fingers.',
            fr: 'Ensuite seulement, ajoute le majeur, l’annulaire et l’auriculaire.',
          },
        ],
      },
      {
        tip: {
          de: 'Übe den Barré lieber zehnmal am Tag für ein paar Sekunden als einmal lange. Wenn die Hand müde wird, ausschütteln und Pause machen. Ein Barré im 5. Bund ist übrigens leichter als im 1. – dort sind die Saiten weicher.',
          en: 'Practise the barre ten times a day for a few seconds rather than once for ages. If your hand gets tired, shake it out and take a break. By the way, a barre at the 5th fret is easier than at the 1st – the strings give more there.',
          fr: 'Mieux vaut travailler le barré dix fois par jour quelques secondes qu’une seule fois longtemps. Si ta main fatigue, secoue-la et fais une pause. Au passage, un barré en case 5 est plus facile qu’en case 1 : les cordes y sont plus souples.',
        },
      },
      { h2: { de: 'Wenn es schnarrt', en: 'If it buzzes', fr: 'Si ça frise' } },
      {
        p: {
          de: 'Schnarrt eine Saite oder klingt dumpf, liegt sie oft genau in der Falte eines Fingergelenks. Verschieb den Zeigefinger ein kleines Stück nach oben oder unten. Mehr Ideen gibt es unter [Saite schnarrt oder klingt dumpf](wissen:saubere-griffe). Der [Akkord-Detektiv](tool:detektiv) zeigt dir, welche Töne gerade erklingen.',
          en: 'If a string buzzes or sounds dull, it’s often sitting right in the crease of a finger joint. Shift your index finger slightly up or down. More ideas in [buzzing or muted strings](wissen:saubere-griffe). The [chord detective](tool:detektiv) shows you which notes are actually sounding.',
          fr: 'Si une corde frise ou sonne étouffée, elle tombe souvent dans le pli d’une articulation. Décale un peu l’index vers le haut ou le bas. D’autres idées dans [corde qui frise ou sonne étouffée](wissen:saubere-griffe). Le [détective d’accords](tool:detektiv) te montre quelles notes sonnent vraiment.',
        },
      },
    ],
    related: ['gitarre-akkorde', 'saubere-griffe', 'gitarre-kapodaster', 'fingerkuppen-hornhaut'],
  },
  {
    id: 'gitarre-kapodaster',
    slug: { de: 'kapodaster-gitarre', en: 'guitar-capo', fr: 'capodastre-guitare' },
    instruments: ['gitarre'],
    category: 'technik',
    title: {
      de: 'Kapodaster an der Gitarre – einfach erklärt',
      en: 'Guitar Capo Explained Simply',
      fr: 'Le capodastre à la guitare, expliqué simplement',
    },
    description: {
      de: 'Kapodaster an der Gitarre: wie er funktioniert, wann er hilft und wie du ausrechnest, welcher Akkord klingt. Mit Tabelle für Bund 1 bis 5.',
      en: 'How a guitar capo works, when it helps and how to work out which chord actually sounds. With a handy table for frets 1 to 5.',
      fr: 'Le capodastre à la guitare : comment il fonctionne, quand il aide et comment savoir quel accord sonne vraiment. Avec un tableau des cases 1 à 5.',
    },
    blocks: [
      {
        p: {
          de: 'Ein **Kapodaster** (kurz Kapo) ist eine Klemme, die du quer über alle Saiten an einen Bund setzt. Er macht im Grunde einen neuen Sattel: Alle Saiten klingen höher, und du greifst trotzdem deine gewohnten offenen Akkorde.',
          en: 'A **capo** is a clamp you fix across all the strings at one fret. In effect it creates a new nut: every string sounds higher, yet you still play your familiar open chord shapes.',
          fr: 'Un **capodastre** est une pince que l’on fixe en travers de toutes les cordes sur une case. Il crée en fait un nouveau sillet : toutes les cordes sonnent plus haut, et tu gardes tes formes d’accords ouvertes habituelles.',
        },
      },
      { h2: { de: 'Wofür ist das gut?', en: 'What is it for?', fr: 'À quoi ça sert ?' } },
      {
        ul: [
          {
            de: '**Passend zur Stimme:** Ist ein Lied zu tief zum Singen, setzt du den Kapo ein paar Bünde höher – die Griffe bleiben gleich.',
            en: '**To suit your voice:** if a song is too low to sing, move the capo up a few frets – the shapes stay the same.',
            fr: '**Pour s’adapter à la voix :** si une chanson est trop grave à chanter, place le capodastre quelques cases plus haut, les formes restent les mêmes.',
          },
          {
            de: '**Schwierige Tonarten umgehen:** Statt Barré-Akkorde zu greifen, spielst du bequeme Formen wie G, C, D und Em.',
            en: '**To dodge awkward keys:** instead of barre chords, you play comfortable shapes like G, C, D and Em.',
            fr: '**Pour éviter les tonalités difficiles :** au lieu des barrés, tu joues des formes confortables comme G, C, D et Em.',
          },
          {
            de: '**Mit anderen zusammenspielen:** Spielt jemand ein Lied in einer anderen Tonart, kannst du mit dem Kapo schnell mitziehen.',
            en: '**To play along with others:** if someone plays a song in a different key, a capo lets you follow quickly.',
            fr: '**Pour jouer avec d’autres :** si quelqu’un joue dans une autre tonalité, le capodastre te permet de suivre rapidement.',
          },
          {
            de: '**Heller Klang:** Mit Kapo klingt die Gitarre glänzender, fast ein bisschen wie eine kleine Gitarre.',
            en: '**A brighter sound:** with a capo, the guitar sounds sparklier, almost like a smaller guitar.',
            fr: '**Un son plus brillant :** avec un capodastre, la guitare sonne plus scintillante, presque comme une petite guitare.',
          },
        ],
      },
      { h2: { de: 'Was klingt, wenn der Kapo sitzt?', en: 'What sounds with the capo on?', fr: 'Qu’est-ce qui sonne avec le capodastre ?' } },
      {
        p: {
          de: 'Die Regel ist einfach: **Jeder Bund macht den Klang einen Halbton höher.** Die Griffform behältst du, der Name des klingenden Akkords rückt weiter. Mit Kapo im 2. Bund klingt eine G-Form als A, eine C-Form als D.',
          en: 'The rule is simple: **each fret raises the sound by one semitone.** You keep the shape, but the name of the sounding chord moves up. With the capo at the 2nd fret, a G shape sounds as A and a C shape as D.',
          fr: 'La règle est simple : **chaque case monte le son d’un demi-ton.** Tu gardes la forme, mais le nom de l’accord entendu monte. Capodastre en case 2 : une forme de G sonne A, une forme de C sonne D.',
        },
      },
      {
        ul: [
          {
            de: 'Kapo 1: G-Form klingt als Ab, C-Form als C#, Em-Form als Fm',
            en: 'Capo 1: G shape sounds as Ab, C shape as C#, Em shape as Fm',
            fr: 'Capo 1 : forme G = Ab, forme C = C#, forme Em = Fm',
          },
          {
            de: 'Kapo 2: G-Form klingt als A, C-Form als D, Em-Form als F#m',
            en: 'Capo 2: G shape sounds as A, C shape as D, Em shape as F#m',
            fr: 'Capo 2 : forme G = A, forme C = D, forme Em = F#m',
          },
          {
            de: 'Kapo 3: G-Form klingt als Bb, C-Form als Eb, Em-Form als Gm',
            en: 'Capo 3: G shape sounds as Bb, C shape as Eb, Em shape as Gm',
            fr: 'Capo 3 : forme G = Bb, forme C = Eb, forme Em = Gm',
          },
          {
            de: 'Kapo 4: G-Form klingt als B (deutsch H), C-Form als E, Em-Form als G#m',
            en: 'Capo 4: G shape sounds as B, C shape as E, Em shape as G#m',
            fr: 'Capo 4 : forme G = B (Si), forme C = E, forme Em = G#m',
          },
          {
            de: 'Kapo 5: G-Form klingt als C, C-Form als F, Em-Form als Am',
            en: 'Capo 5: G shape sounds as C, C shape as F, Em shape as Am',
            fr: 'Capo 5 : forme G = C, forme C = F, forme Em = Am',
          },
        ],
      },
      { chord: 'G' },
      {
        tip: {
          de: 'Steht in einem Liederbuch „Kapo 3“ über den Akkorden, greifst du einfach die geschriebenen Akkorde mit dem Kapo im 3. Bund. Rechnen musst du nur, wenn du mit anderen Instrumenten zusammenspielst. Mehr über Tonarten unter [Transponieren](wissen:transponieren).',
          en: 'If a songbook says “capo 3” above the chords, just play the written chords with the capo at the 3rd fret. You only need to do the maths when playing with other instruments. More about keys in [transposing](wissen:transponieren).',
          fr: 'Si un recueil indique « capo 3 » au-dessus des accords, joue simplement les accords écrits avec le capodastre en case 3. Tu n’as à calculer que si tu joues avec d’autres instruments. Plus sur les tonalités dans [transposer](wissen:transponieren).',
        },
      },
      { h2: { de: 'So setzt du den Kapo richtig', en: 'How to fit the capo', fr: 'Bien poser le capodastre' } },
      {
        ol: [
          {
            de: 'Setz ihn **dicht vor das Bundstäbchen**, nicht in die Mitte des Bundes.',
            en: 'Place it **right behind the fret wire**, not in the middle of the fret.',
            fr: 'Place-le **juste derrière la frette**, pas au milieu de la case.',
          },
          {
            de: 'Er soll gerade sitzen und alle sechs Saiten gleichmäßig drücken.',
            en: 'It should sit straight and press all six strings evenly.',
            fr: 'Il doit être bien droit et appuyer uniformément sur les six cordes.',
          },
          {
            de: 'Nach dem Aufsetzen kurz nachstimmen – ein Kapo zieht die Saiten manchmal etwas höher.',
            en: 'Retune briefly after fitting it – a capo can pull the strings slightly sharp.',
            fr: 'Réaccorde rapidement après l’avoir posé : il peut faire légèrement monter les cordes.',
          },
        ],
      },
      {
        p: {
          de: 'Ein schönes Experiment: Spiel [Amazing Grace](lied:amazing-grace) einmal ohne und einmal mit Kapo im 2. oder 3. Bund und hör, wo es für deine Stimme besser passt.',
          en: 'A nice experiment: play [Amazing Grace](lied:amazing-grace) once without a capo and once with it at the 2nd or 3rd fret, and hear which suits your voice better.',
          fr: 'Une petite expérience : joue [Amazing Grace](lied:amazing-grace) une fois sans capodastre, puis en case 2 ou 3, et écoute ce qui convient le mieux à ta voix.',
        },
      },
      { tool: 'stimmen' },
    ],
    related: ['transponieren', 'gitarre-barre', 'gitarre-akkorde', 'lieder-fuer-anfaenger'],
  },
  {
    id: 'gitarre-zupfen',
    slug: { de: 'gitarre-zupfen-fingerpicking', en: 'guitar-fingerpicking', fr: 'picking-guitare' },
    instruments: ['gitarre'],
    category: 'technik',
    title: {
      de: 'Gitarre zupfen: Fingerpicking für Anfänger',
      en: 'Guitar Fingerpicking for Beginners',
      fr: 'Picking à la guitare pour débutants',
    },
    description: {
      de: 'Gitarre zupfen lernen: Fingerpicking mit p, i, m, a, ein erstes Zupfmuster für Akkorde und Tipps für einen gleichmäßigen, schönen Klang.',
      en: 'Learn guitar fingerpicking: the p, i, m, a fingers, a first picking pattern over chords and tips for an even, lovely sound.',
      fr: 'Apprendre le picking à la guitare : les doigts p, i, m, a, un premier motif sur les accords et des conseils pour un son régulier et doux.',
    },
    blocks: [
      {
        p: {
          de: 'Beim **Zupfen** (Fingerpicking) schlägst du die Saiten nicht alle zusammen an, sondern spielst die Töne eines Akkords nacheinander. Das klingt ruhig und fließend – perfekt für Schlaflieder und langsame Balladen.',
          en: 'With **fingerpicking**, you don’t strum all the strings together – you play the notes of a chord one after another. It sounds calm and flowing, perfect for lullabies and slow ballads.',
          fr: 'En **picking**, tu ne grattes pas toutes les cordes en même temps : tu joues les notes de l’accord l’une après l’autre. Ça sonne calme et fluide, idéal pour les berceuses et les ballades lentes.',
        },
      },
      { h2: { de: 'p, i, m, a – die Finger der Zupfhand', en: 'p, i, m, a – the picking-hand fingers', fr: 'p, i, m, a – les doigts de la main droite' } },
      {
        p: {
          de: 'Die Finger der Zupfhand haben Buchstaben, die aus dem Spanischen kommen:',
          en: 'The fingers of the picking hand have letters that come from Spanish:',
          fr: 'Les doigts de la main qui pince portent des lettres venues de l’espagnol :',
        },
      },
      {
        ul: [
          {
            de: '**p** = Daumen: spielt die Basssaiten (tiefes E, A, D)',
            en: '**p** = thumb: plays the bass strings (low E, A, D)',
            fr: '**p** = pouce : joue les cordes graves (Mi grave, La, Ré)',
          },
          { de: '**i** = Zeigefinger: G-Saite', en: '**i** = index finger: G string', fr: '**i** = index : corde de Sol' },
          { de: '**m** = Mittelfinger: H-Saite', en: '**m** = middle finger: B string', fr: '**m** = majeur : corde de Si' },
          { de: '**a** = Ringfinger: hohe e-Saite', en: '**a** = ring finger: high E string', fr: '**a** = annulaire : Mi aigu' },
        ],
      },
      {
        p: {
          de: 'So hat jeder Finger „seine“ Saite. Das gibt Sicherheit, weil die Hand an Ort und Stelle bleiben kann.',
          en: 'That way each finger has “its own” string, which helps because your hand can stay in one place.',
          fr: 'Ainsi chaque doigt a « sa » corde : la main peut rester en place, ce qui donne de l’assurance.',
        },
      },
      { h2: { de: 'Dein erstes Zupfmuster', en: 'Your first picking pattern', fr: 'Ton premier motif de picking' } },
      {
        p: {
          de: 'Greif ein **Am**. Der Daumen spielt den Grundton auf der A-Saite. Dann folgen nacheinander i, m, a, m, i. Das sind sechs gleichmäßige Töne – sie passen genau in einen 3/4- oder 6/8-Takt.',
          en: 'Fret an **Am**. Your thumb plays the root note on the A string. Then follow with i, m, a, m, i – six even notes, which fit neatly into a bar of 3/4 or 6/8.',
          fr: 'Fais un **Am**. Le pouce joue la fondamentale sur la corde de La, puis enchaîne i, m, a, m, i. Six notes régulières, qui tiennent parfaitement dans une mesure à 3/4 ou 6/8.',
        },
      },
      { chord: 'Am' },
      {
        ol: [
          { de: 'p – A-Saite', en: 'p – A string', fr: 'p – corde de La' },
          { de: 'i – G-Saite', en: 'i – G string', fr: 'i – corde de Sol' },
          { de: 'm – H-Saite', en: 'm – B string', fr: 'm – corde de Si' },
          { de: 'a – hohe e-Saite', en: 'a – high E string', fr: 'a – Mi aigu' },
          { de: 'm – H-Saite', en: 'm – B string', fr: 'm – corde de Si' },
          { de: 'i – G-Saite', en: 'i – G string', fr: 'i – corde de Sol' },
        ],
      },
      {
        p: {
          de: 'Klappt das, wechsle zu **C** (Daumen ebenfalls auf der A-Saite), zu **G** (Daumen auf der tiefen E-Saite) und zu **Em** (ebenfalls tiefe E-Saite). Der Daumen sucht sich immer den tiefsten Ton des Akkords, die anderen Finger bleiben auf ihren Saiten.',
          en: 'Once that works, switch to **C** (thumb also on the A string), **G** (thumb on the low E) and **Em** (also low E). Your thumb always finds the lowest note of the chord while the other fingers stay on their strings.',
          fr: 'Quand ça marche, passe à **C** (pouce aussi sur le La), à **G** (pouce sur le Mi grave) et à **Em** (Mi grave également). Le pouce va toujours chercher la note la plus grave de l’accord, les autres doigts restent sur leurs cordes.',
        },
      },
      { chord: 'C' },
      {
        tip: {
          de: 'Zupf ganz leise und langsam. Lass jeden Ton ausklingen, bevor der nächste kommt. Ein gleichmäßiger Rhythmus ist schöner als ein schneller – das [Metronom](tool:rhythmus) hilft dir dabei.',
          en: 'Pick quietly and slowly. Let each note ring before the next one comes. An even rhythm sounds better than a fast one – the [metronome](tool:rhythmus) will help.',
          fr: 'Joue doucement et lentement. Laisse chaque note résonner avant la suivante. Un rythme régulier est plus beau qu’un rythme rapide : le [métronome](tool:rhythmus) t’aidera.',
        },
      },
      { h2: { de: 'Lieder zum Zupfen', en: 'Songs to fingerpick', fr: 'Des chansons pour le picking' } },
      {
        p: {
          de: 'Ruhige Lieder im Dreiertakt eignen sich besonders, zum Beispiel [Amazing Grace](lied:amazing-grace) oder [Clementine](lied:clementine). Wie Taktarten funktionieren, steht unter [Takt und Taktarten](wissen:takt-und-taktarten). Und wenn du lieber nach Zahlen liest, schau dir [Tabulatur lesen](wissen:tabulatur-lesen) an.',
          en: 'Calm songs in three-four time work especially well, such as [Amazing Grace](lied:amazing-grace) or [Clementine](lied:clementine). How time signatures work is explained in [time signatures](wissen:takt-und-taktarten). And if you prefer reading numbers, check out [how to read tab](wissen:tabulatur-lesen).',
          fr: 'Les chansons calmes à trois temps s’y prêtent particulièrement, comme [Amazing Grace](lied:amazing-grace) ou [Clementine](lied:clementine). Le fonctionnement des mesures est expliqué dans [mesures et temps](wissen:takt-und-taktarten). Et si tu préfères lire des chiffres, regarde [lire une tablature](wissen:tabulatur-lesen).',
        },
      },
      { tool: 'lieder' },
    ],
    related: ['schlagmuster-lernen', 'takt-und-taktarten', 'tabulatur-lesen', 'gitarre-halten'],
  },
];
