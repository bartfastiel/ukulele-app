import type { Article } from './types.ts';

export const UKULELE_ARTICLES: Article[] = [
  {
    id: 'ukulele-kinder',
    slug: { de: 'ukulele-fuer-kinder-groessen', en: 'ukulele-sizes-kids', fr: 'taille-ukulele-enfant' },
    instruments: ['ukulele'],
    category: 'erste-schritte',
    title: {
      de: 'Welche Ukulele für Kinder? Die Größen im Überblick',
      en: 'Which ukulele for kids? Ukulele sizes explained',
      fr: 'Quel ukulélé pour un enfant ? Les tailles expliquées',
    },
    description: {
      de: 'Sopran, Konzert, Tenor oder Bariton? So findest du die passende Ukulele-Größe für Kinder und erkennst ein gut spielbares erstes Instrument.',
      en: 'Soprano, concert, tenor or baritone? How to pick the right ukulele size for kids and spot a first instrument that is easy to play.',
      fr: 'Soprano, concert, ténor ou baryton ? Comment choisir la bonne taille de ukulélé pour un enfant et reconnaître un premier instrument jouable.',
    },
    blocks: [
      {
        p: {
          de: 'Ukulelen sehen auf den ersten Blick alle ähnlich aus. Tatsächlich gibt es aber vier gängige Größen, die sich in Länge, Klang und im Abstand der Bünde unterscheiden. Für Kinder ist die richtige Größe wichtig: Passt das Instrument zur Hand, klingen die ersten Akkorde schneller sauber und das Üben macht mehr Spaß.',
          en: 'At first glance all ukuleles look alike. In fact there are four common sizes that differ in length, sound and the spacing of the frets. For children the size really matters: when the instrument fits the hand, the first chords ring clearly sooner and practising is simply more fun.',
          fr: 'Au premier coup d’œil, tous les ukulélés se ressemblent. Il existe pourtant quatre tailles courantes, qui diffèrent par la longueur, le son et l’écart entre les frettes. Pour un enfant, la taille compte vraiment : si l’instrument est adapté à sa main, les premiers accords sonnent plus vite et les séances sont bien plus agréables.',
        },
      },
      { h2: { de: 'Die vier Größen', en: 'The four sizes', fr: 'Les quatre tailles' } },
      {
        ul: [
          {
            de: '**Sopran:** etwa 53 cm lang, die kleinste und klassische Ukulele mit hellem, typischem Klang. Für die meisten Kinder ab etwa 5 bis 6 Jahren ideal.',
            en: '**Soprano:** about 53 cm long, the smallest and most classic ukulele with a bright, typical sound. Ideal for most children from around 5 or 6.',
            fr: '**Soprano :** environ 53 cm, le plus petit et le plus classique, avec un son clair et typique. Idéal pour la plupart des enfants dès 5 ou 6 ans.',
          },
          {
            de: '**Konzert:** etwa 58 bis 63 cm. Etwas mehr Platz zwischen den Bünden und ein vollerer Klang. Gut für größere Kinder, Jugendliche und Erwachsene.',
            en: '**Concert:** about 58 to 63 cm. A little more room between the frets and a fuller sound. Great for older kids, teens and adults.',
            fr: '**Concert :** environ 58 à 63 cm. Un peu plus d’espace entre les frettes et un son plus rond. Parfait pour les grands enfants, les ados et les adultes.',
          },
          {
            de: '**Tenor:** etwa 66 cm. Noch voller im Klang, eher für Erwachsene oder Jugendliche mit großen Händen.',
            en: '**Tenor:** about 66 cm. An even fuller tone, better suited to adults or teens with larger hands.',
            fr: '**Ténor :** environ 66 cm. Un son encore plus ample, plutôt pour les adultes ou les ados aux grandes mains.',
          },
          {
            de: '**Bariton:** etwa 76 cm und gestimmt wie die vier hohen Gitarrensaiten (D G B E). Dieselben Griffbilder ergeben hier andere Akkorde – für Ukulelenklassen meist nicht geeignet.',
            en: '**Baritone:** about 76 cm and tuned like the four highest guitar strings (D G B E). The same chord shapes produce different chords here, so it rarely suits a ukulele class.',
            fr: '**Baryton :** environ 76 cm, accordé comme les quatre cordes aiguës de la guitare (Ré Sol Si Mi). Les mêmes doigtés donnent ici d’autres accords : rarement adapté à une classe de ukulélé.',
          },
        ],
      },
      {
        p: {
          de: 'Sopran, Konzert und Tenor werden gleich gestimmt (G C E A). Griffbilder, Lieder und Schulhefte passen deshalb zu allen drei Größen.',
          en: 'Soprano, concert and tenor share the same tuning (G C E A), so chord charts, songs and school books work for all three.',
          fr: 'Soprano, concert et ténor ont le même accordage (Sol Do Mi La) : les diagrammes d’accords, les chansons et les méthodes conviennent donc aux trois.',
        },
      },
      {
        h2: {
          de: 'Welche Größe passt zu meinem Kind?',
          en: 'Which size fits my child?',
          fr: 'Quelle taille pour mon enfant ?',
        },
      },
      {
        p: {
          de: 'Als Faustregel gilt: Bis etwa 10 Jahre ist die Sopran-Ukulele die beste Wahl. Ab etwa 10 bis 12 Jahren oder bei großen Händen ist eine Konzert-Ukulele bequemer. Ein einfacher Test: Kann dein Kind den Hals locker umfassen und mit dem Ringfinger den 3. Bund erreichen, ohne den Arm zu strecken? Dann passt die Größe.',
          en: 'As a rule of thumb, a soprano ukulele is the best choice up to about age 10. From around 10 to 12, or with bigger hands, a concert ukulele feels more comfortable. A quick test: can your child wrap a relaxed hand around the neck and reach the 3rd fret with the ring finger without stretching the arm? Then the size is right.',
          fr: 'En règle générale, le soprano est le meilleur choix jusqu’à 10 ans environ. Vers 10 à 12 ans, ou avec de grandes mains, le concert est plus confortable. Un petit test : ton enfant peut-il tenir le manche sans se crisper et atteindre la 3e case avec l’annulaire sans tendre le bras ? Alors la taille convient.',
        },
      },
      {
        tip: {
          de: 'Spielt dein Kind in einer Ukulelenklasse? Frag die Lehrkraft, welche Größe und Stimmung die Klasse nutzt. Fast immer ist es Sopran oder Konzert mit hohem G.',
          en: 'Is your child joining a ukulele class at school? Ask the teacher which size and tuning the class uses. It is almost always soprano or concert with a high G.',
          fr: 'Ton enfant suit une classe de ukulélé à l’école ? Demande à l’enseignant quelle taille et quel accordage la classe utilise. C’est presque toujours un soprano ou un concert avec Sol aigu.',
        },
      },
      {
        h2: {
          de: 'Worauf du beim ersten Instrument achten solltest',
          en: 'What to look for in a first instrument',
          fr: 'Ce qui compte pour un premier instrument',
        },
      },
      {
        ul: [
          {
            de: '**Saitenlage:** Die Saiten sollten nah über dem Griffbrett liegen. Liegen sie hoch, muss das Kind sehr fest drücken – das frustriert schnell.',
            en: '**Action:** the strings should sit close to the fretboard. If they are high, your child has to press very hard, which gets frustrating fast.',
            fr: '**Hauteur des cordes :** elles doivent être proches de la touche. Si elles sont hautes, il faut appuyer très fort, ce qui décourage vite.',
          },
          {
            de: '**Stimmmechaniken:** Sie sollten sich gleichmäßig drehen lassen und die Stimmung halten.',
            en: '**Tuning pegs:** they should turn smoothly and hold the tuning.',
            fr: '**Mécaniques :** elles doivent tourner sans à-coups et bien tenir l’accord.',
          },
          {
            de: '**Bundstäbchen:** An den Kanten des Halses darf nichts überstehen oder kratzen.',
            en: '**Frets:** nothing should stick out or feel sharp along the edges of the neck.',
            fr: '**Frettes :** rien ne doit dépasser ni accrocher sur les bords du manche.',
          },
          {
            de: '**Neue Saiten:** Sie dehnen sich in den ersten Tagen und müssen oft nachgestimmt werden. Das ist ganz normal.',
            en: '**New strings:** they stretch during the first days and need frequent retuning. That is completely normal.',
            fr: '**Cordes neuves :** elles se détendent les premiers jours et il faut souvent réaccorder. C’est tout à fait normal.',
          },
        ],
      },
      {
        p: {
          de: 'Ein teures Instrument ist für den Anfang nicht nötig. Viel wichtiger ist, dass es sich gut stimmen und angenehm greifen lässt. Wenn möglich, lass es vor dem Kauf einmal stimmen und ein paar Akkorde darauf spielen. Danach geht es los: [Ukulele richtig halten](wissen:ukulele-halten), [stimmen](wissen:ukulele-stimmen) und [die ersten Akkorde](wissen:ukulele-erste-akkorde) lernen.',
          en: 'A pricey instrument is not necessary to start. What matters much more is that it tunes easily and feels comfortable to play. If you can, have it tuned and try a few chords before buying. Then off you go: learn to [hold the ukulele](wissen:ukulele-halten), [tune it](wissen:ukulele-stimmen) and play [your first chords](wissen:ukulele-erste-akkorde).',
          fr: 'Pas besoin d’un instrument cher pour débuter. L’essentiel est qu’il s’accorde facilement et soit agréable sous les doigts. Si possible, fais-le accorder et joue quelques accords avant l’achat. Ensuite, c’est parti : apprends à [tenir le ukulélé](wissen:ukulele-halten), à [l’accorder](wissen:ukulele-stimmen) et à jouer [tes premiers accords](wissen:ukulele-erste-akkorde).',
        },
      },
      { tool: 'stimmen' },
    ],
    related: ['ukulele-halten', 'ukulele-stimmen', 'ukulele-saiten', 'instrumentalklasse-schule'],
  },
  {
    id: 'ukulele-halten',
    slug: { de: 'ukulele-halten', en: 'hold-ukulele', fr: 'tenir-ukulele' },
    instruments: ['ukulele'],
    category: 'erste-schritte',
    title: {
      de: 'Ukulele halten – so sitzt und steht es sich richtig',
      en: 'How to hold a ukulele – sitting and standing',
      fr: 'Comment tenir un ukulélé – assis ou debout',
    },
    description: {
      de: 'Ukulele halten leicht gemacht: Haltung im Sitzen und Stehen, Daumen am Hals, Anschlag mit der rechten Hand und typische Stolpersteine für Anfänger.',
      en: 'How to hold a ukulele: posture sitting and standing, where your thumb goes, where to strum, plus the most common beginner habits to avoid.',
      fr: 'Bien tenir son ukulélé : position assise et debout, place du pouce sur le manche, zone de grattage et petites erreurs fréquentes chez les débutants.',
    },
    blocks: [
      {
        p: {
          de: 'Eine gute Haltung ist die halbe Miete: Wenn die Ukulele ruhig liegt, haben beide Hände frei, und die Akkorde klingen viel leichter sauber. Die Beschreibung gilt für Rechtshänder – wenn du links spielst, ist einfach alles gespiegelt.',
          en: 'Good posture does half the work: when the ukulele sits still, both hands are free and chords ring clearly with much less effort. These steps are for right-handed players; if you play left-handed, simply mirror everything.',
          fr: 'Une bonne position, c’est déjà la moitié du travail : quand le ukulélé reste stable, tes deux mains sont libres et les accords sonnent bien plus facilement. Ces conseils sont pour les droitiers ; si tu joues en gaucher, inverse simplement tout.',
        },
      },
      { h2: { de: 'Im Sitzen', en: 'Sitting down', fr: 'En position assise' } },
      {
        ol: [
          {
            de: 'Setz dich aufrecht auf die vordere Hälfte eines Stuhls, beide Füße stehen auf dem Boden.',
            en: 'Sit up straight on the front half of a chair with both feet on the floor.',
            fr: 'Assieds-toi bien droit sur l’avant de la chaise, les deux pieds au sol.',
          },
          {
            de: 'Leg den Korpus auf deinen rechten Oberschenkel und lehne ihn sanft an deinen Bauch.',
            en: 'Rest the body of the ukulele on your right thigh and lean it gently against your tummy.',
            fr: 'Pose la caisse sur ta cuisse droite et appuie-la doucement contre ton ventre.',
          },
          {
            de: 'Dein rechter Unterarm liegt locker auf dem oberen Rand des Korpus und drückt die Ukulele leicht an dich. So kann sie nicht wegrutschen.',
            en: 'Your right forearm rests loosely on the top edge of the body and hugs the ukulele lightly against you, so it cannot slip away.',
            fr: 'Ton avant-bras droit repose sur le bord supérieur de la caisse et serre légèrement le ukulélé contre toi : il ne peut plus glisser.',
          },
          {
            de: 'Der Hals zeigt schräg nach oben nach links – ungefähr wie der kleine Zeiger auf 10 Uhr.',
            en: 'The neck points up and to the left, roughly like a clock hand at ten o’clock.',
            fr: 'Le manche monte en biais vers la gauche, à peu près comme une aiguille sur 10 heures.',
          },
        ],
      },
      { h2: { de: 'Im Stehen', en: 'Standing up', fr: 'Debout' } },
      {
        p: {
          de: 'Im Stehen hält allein der rechte Unterarm die Ukulele an deinem Körper fest. Das braucht etwas Übung. Ein leichter Gurt hilft, besonders bei Auftritten mit der Klasse.',
          en: 'When you stand, only your right forearm holds the ukulele against your body. That takes a little practice. A light strap helps, especially when you perform with your class.',
          fr: 'Debout, seul ton avant-bras droit maintient le ukulélé contre toi. Cela demande un peu d’entraînement. Une sangle légère aide beaucoup, surtout pour jouer en concert avec ta classe.',
        },
      },
      { h2: { de: 'Die linke Hand', en: 'Your fretting hand', fr: 'La main gauche' } },
      {
        p: {
          de: 'Dein Daumen liegt hinten am Hals, ungefähr hinter dem Mittelfinger. Die Finger stehen rund wie kleine Hämmer und drücken mit den Fingerkuppen direkt hinter dem Bundstäbchen. Halte die Fingernägel kurz, sonst kommst du nicht senkrecht auf die Saite. Mehr dazu findest du bei [Saite schnarrt oder klingt dumpf](wissen:saubere-griffe).',
          en: 'Your thumb sits behind the neck, roughly behind your middle finger. Keep your fingers curved like little hammers and press with the fingertips just behind the fret wire. Keep your nails short, otherwise you cannot land straight on the string. Read more in [buzzing or muted strings](wissen:saubere-griffe).',
          fr: 'Ton pouce se place derrière le manche, à peu près derrière le majeur. Tes doigts restent arrondis comme de petits marteaux et appuient du bout juste derrière la frette. Garde les ongles courts, sinon tu ne peux pas poser le doigt bien droit. Plus de détails dans [corde qui frise ou sonne étouffée](wissen:saubere-griffe).',
        },
      },
      { h2: { de: 'Die rechte Hand', en: 'Your strumming hand', fr: 'La main droite' } },
      {
        p: {
          de: 'Angeschlagen wird dort, wo Hals und Korpus sich treffen – nicht direkt über dem Schallloch. Dort klingt die Ukulele weich und rund. Schlag locker aus dem Handgelenk, meist mit dem Zeigefinger: nach unten mit dem Nagel, nach oben mit der Fingerkuppe.',
          en: 'Strum where the neck meets the body rather than right over the sound hole. That spot gives a soft, round tone. Move loosely from the wrist, usually with your index finger: down with the nail, up with the fingertip.',
          fr: 'On gratte là où le manche rejoint la caisse, pas juste au-dessus de la rosace. C’est là que le ukulélé sonne doux et rond. Bouge souplement le poignet, en général avec l’index : vers le bas avec l’ongle, vers le haut avec la pulpe du doigt.',
        },
      },
      {
        ul: [
          {
            de: 'Die Ukulele nach hinten kippen, um aufs Griffbrett zu schauen – dann dämpfen die Finger die Saiten.',
            en: 'Tilting the ukulele back to look at the fretboard – your fingers then mute the strings.',
            fr: 'Pencher le ukulélé vers soi pour voir la touche : les doigts étouffent alors les cordes.',
          },
          {
            de: 'Den Daumen ganz um den Hals wickeln und mit der Handfläche gegen den Hals drücken.',
            en: 'Wrapping the thumb all the way around the neck and squeezing it with your palm.',
            fr: 'Enrouler le pouce autour du manche et serrer avec la paume.',
          },
          {
            de: 'Schultern hochziehen und viel zu fest drücken. Locker bleiben lohnt sich!',
            en: 'Hunching your shoulders and pressing far too hard. Staying relaxed pays off!',
            fr: 'Remonter les épaules et appuyer beaucoup trop fort. Reste détendu, ça vaut le coup !',
          },
        ],
      },
      {
        tip: {
          de: 'Wenn du sehen willst, wo deine Finger sind, schau lieber in einen Spiegel, statt die Ukulele zu kippen. Danach kannst du direkt [die ersten Akkorde](wissen:ukulele-erste-akkorde) ausprobieren.',
          en: 'If you want to see where your fingers are, look in a mirror instead of tilting the ukulele. Then go straight on to [your first chords](wissen:ukulele-erste-akkorde).',
          fr: 'Pour voir où sont tes doigts, regarde-toi dans un miroir au lieu de pencher le ukulélé. Ensuite, passe directement à [tes premiers accords](wissen:ukulele-erste-akkorde).',
        },
      },
      { tool: 'akkorde' },
    ],
    related: ['ukulele-kinder', 'ukulele-erste-akkorde', 'saubere-griffe', 'schlagmuster-lernen', 'ukulele-linkshaender'],
  },
  {
    id: 'ukulele-saiten',
    slug: { de: 'ukulele-saiten-namen', en: 'ukulele-string-names', fr: 'noms-cordes-ukulele' },
    instruments: ['ukulele'],
    category: 'erste-schritte',
    title: {
      de: 'Ukulele-Saiten: Namen G, C, E, A leicht merken',
      en: 'Ukulele string names: G, C, E, A made easy to remember',
      fr: 'Noms des cordes du ukulélé : Sol, Do, Mi, La faciles à retenir',
    },
    description: {
      de: 'Wie heißen die Saiten der Ukulele? G, C, E, A mit Merksätzen, Nummerierung der Saiten und warum das hohe G die Ukulele so typisch klingen lässt.',
      en: 'What are the ukulele string names? G, C, E, A with memory tricks, how the strings are numbered and why the high G gives the ukulele its typical sound.',
      fr: 'Comment s’appellent les cordes du ukulélé ? Sol, Do, Mi, La avec des astuces mnémotechniques, leur numérotation et le secret du Sol aigu.',
    },
    blocks: [
      {
        p: {
          de: 'Die vier Saiten der Ukulele heißen – von oben nach unten, also vom Kinn zum Boden – **G, C, E, A**. Diese Reihenfolge brauchst du ständig: beim Stimmen, bei Griffbildern und beim Lesen von Tabulaturen. Darum lohnt es sich, sie gleich am Anfang gut zu merken.',
          en: 'The four ukulele strings are called **G, C, E, A**, from top to bottom – that is, from your chin towards the floor. You will need this order all the time: for tuning, for chord charts and for reading tabs. So it is worth learning it right away.',
          fr: 'Les quatre cordes du ukulélé s’appellent **Sol, Do, Mi, La** (en lettres : G, C, E, A), de haut en bas, c’est-à-dire du menton vers le sol. Tu en auras besoin tout le temps : pour accorder, lire les diagrammes d’accords et les tablatures. Mieux vaut donc les retenir dès le début.',
        },
      },
      { h2: { de: 'Merksätze', en: 'Memory tricks', fr: 'Des phrases pour s’en souvenir' } },
      {
        p: {
          de: 'Mit einem kleinen Satz, bei dem jedes Wort mit dem Saitennamen beginnt, geht es ganz leicht:',
          en: 'A short sentence in which each word starts with a string name makes it easy:',
          fr: 'Une petite phrase dont chaque mot commence par le nom d’une corde, et c’est réglé :',
        },
      },
      {
        ul: [
          {
            de: '**G**ute **C**lowns **e**ssen **A**nanas.',
            en: '**G**oats **C**an **E**at **A**nything.',
            fr: '**Sol**eil, **Do**udou, **Mi**el, **La**pin – une syllabe de solfège au début de chaque mot.',
          },
          {
            de: '**G**eh **C**hillen, **E**nte **A**nna!',
            en: '**G**rumpy **C**ats **E**at **A**pples.',
            fr: '**G**entil **C**hat **E**st **A**rrivé – pour retenir les lettres G, C, E, A.',
          },
        ],
      },
      {
        tip: {
          de: 'Am besten merkst du dir einen Satz, den du selbst erfunden hast. Je lustiger, desto besser! Oder du singst die Saiten: In der App gibt es [das Saiten-Lied G-C-E-A](lied:gcea).',
          en: 'The sentence you remember best is one you made up yourself – the sillier, the better! Or sing the strings: the app has [the string song G-C-E-A](lied:gcea).',
          fr: 'La phrase la plus facile à retenir, c’est celle que tu inventes toi-même : plus elle est drôle, mieux c’est ! Tu peux aussi chanter les cordes avec [la chanson des cordes G-C-E-A](lied:gcea).',
        },
      },
      { h2: { de: 'Saitennummern', en: 'String numbers', fr: 'Les numéros des cordes' } },
      {
        p: {
          de: 'Oft werden die Saiten auch nummeriert. Die **1. Saite** ist die A-Saite, die dem Boden am nächsten ist. Die **4. Saite** ist die G-Saite oben. Achtung: In Griffbildern stehen die Saiten senkrecht nebeneinander – ganz links G, ganz rechts A, so als würdest du die Ukulele vor dir aufstellen und anschauen.',
          en: 'Strings are often numbered too. **String 1** is the A string, closest to the floor. **String 4** is the G string at the top. Note that chord charts show the strings as vertical lines side by side – G on the far left, A on the far right – as if the ukulele were standing up in front of you.',
          fr: 'On numérote aussi souvent les cordes. La **1re corde** est la corde de La, la plus proche du sol. La **4e corde** est la corde de Sol, en haut. Attention : sur les diagrammes d’accords, les cordes sont dessinées à la verticale – Sol tout à gauche, La tout à droite – comme si le ukulélé était debout devant toi.',
        },
      },
      {
        h2: {
          de: 'Das Geheimnis des hohen G',
          en: 'The secret of the high G',
          fr: 'Le secret du Sol aigu',
        },
      },
      {
        p: {
          de: 'Bei einer Gitarre werden die Saiten von oben nach unten immer höher. Bei der Ukulele nicht: Die G-Saite oben klingt höher als die C- und die E-Saite. Nur die A-Saite ist noch höher. Diese Stimmung nennt man auch „rückläufig“ (englisch reentrant). Sie sorgt für den hellen, fröhlichen Klang, an dem man eine Ukulele sofort erkennt. Die tiefste Saite ist also die C-Saite.',
          en: 'On a guitar the strings get higher from top to bottom. Not on the ukulele: the G string at the top sounds higher than the C and E strings, and only the A string is higher still. This is called reentrant tuning. It creates the bright, cheerful sound that makes a ukulele instantly recognisable. So the lowest string is actually the C string.',
          fr: 'Sur une guitare, les cordes sont de plus en plus aiguës de haut en bas. Pas sur le ukulélé : la corde de Sol, en haut, sonne plus aigu que celles de Do et de Mi ; seule la corde de La est encore plus aiguë. On parle d’accordage « rentrant ». C’est lui qui donne ce son clair et joyeux qu’on reconnaît tout de suite. La corde la plus grave est donc celle de Do.',
        },
      },
      {
        p: {
          de: 'Manche Ukulelen sind mit einem **tiefen G** bespannt. Das klingt voller, passt aber nicht immer zu Schulheften und Zupfmustern. Für den Anfang und für die Ukulelenklasse ist das hohe G üblich. Die Bariton-Ukulele ist eine Ausnahme: Sie hat die Saiten D, G, B, E (im Deutschen D, G, H, E). Warum B und H dieselbe Note sind, erfährst du bei [Töne und Notennamen](wissen:toene-und-notennamen).',
          en: 'Some ukuleles are strung with a **low G**. It sounds fuller but does not always match school books and picking patterns. For beginners and ukulele classes the high G is the norm. The baritone ukulele is the exception: its strings are D, G, B, E. To learn more about how notes are named, see [notes and note names](wissen:toene-und-notennamen).',
          fr: 'Certains ukulélés sont montés avec un **Sol grave**. Le son est plus ample, mais ne correspond pas toujours aux méthodes et aux motifs de picking. Pour débuter et en classe, on utilise le Sol aigu. Le ukulélé baryton fait exception : ses cordes sont Ré, Sol, Si, Mi. Pour en savoir plus sur le nom des notes, lis [les notes et leurs noms](wissen:toene-und-notennamen).',
        },
      },
      {
        p: {
          de: 'Wenn du die Namen sicher kennst, kannst du deine Ukulele [stimmen](wissen:ukulele-stimmen) und [Tabulaturen lesen](wissen:tabulatur-lesen).',
          en: 'Once you know the names by heart, you are ready to [tune your ukulele](wissen:ukulele-stimmen) and [read tabs](wissen:tabulatur-lesen).',
          fr: 'Quand tu connais les noms par cœur, tu peux [accorder ton ukulélé](wissen:ukulele-stimmen) et [lire une tablature](wissen:tabulatur-lesen).',
        },
      },
      { tool: 'stimmen' },
    ],
    related: ['ukulele-stimmen', 'toene-und-notennamen', 'tabulatur-lesen', 'ukulele-erste-akkorde'],
  },
  {
    id: 'ukulele-stimmen',
    slug: { de: 'ukulele-stimmen', en: 'tune-ukulele', fr: 'accorder-ukulele' },
    instruments: ['ukulele'],
    category: 'erste-schritte',
    title: {
      de: 'Ukulele stimmen – so geht’s Schritt für Schritt',
      en: 'How to tune a ukulele – step by step',
      fr: 'Accorder un ukulélé – pas à pas',
    },
    description: {
      de: 'Ukulele stimmen auf G C E A: mit Stimmgerät oder nach Gehör, welcher Wirbel zu welcher Saite gehört und warum neue Saiten ständig verstimmen.',
      en: 'Tune your ukulele to G C E A: with a tuner or by ear, which peg belongs to which string and why new strings keep going out of tune.',
      fr: 'Accorder son ukulélé en Sol Do Mi La : avec un accordeur ou à l’oreille, quelle mécanique pour quelle corde et pourquoi les cordes neuves bougent.',
    },
    blocks: [
      {
        p: {
          de: 'Eine gestimmte Ukulele ist das Wichtigste überhaupt: Selbst der schönste Akkord klingt schief, wenn die Saiten nicht stimmen. Zum Glück geht das Stimmen schnell, wenn du einmal weißt, wie. Die Standardstimmung lautet **G C E A**, mit hohem G.',
          en: 'A tuned ukulele matters more than anything else: even the nicest chord sounds off when the strings are out of tune. Luckily, tuning is quick once you know how. Standard tuning is **G C E A** with a high G.',
          fr: 'Un ukulélé accordé, c’est le plus important : même le plus bel accord sonne bizarre si les cordes ne sont pas justes. Heureusement, ça va vite une fois qu’on a compris. L’accordage standard est **Sol Do Mi La** (G C E A), avec Sol aigu.',
        },
      },
      {
        h2: {
          de: 'Mit dem Stimmgerät',
          en: 'Using a tuner',
          fr: 'Avec un accordeur',
        },
      },
      {
        ol: [
          {
            de: 'Öffne das [Stimmgerät](tool:stimmen) und erlaube das Mikrofon. Die Töne werden nur auf deinem Gerät ausgewertet.',
            en: 'Open the [tuner](tool:stimmen) and allow the microphone. The sound is only analysed on your device.',
            fr: 'Ouvre l’[accordeur](tool:stimmen) et autorise le micro. Le son est analysé uniquement sur ton appareil.',
          },
          {
            de: 'Zupf eine leere Saite, zum Beispiel die G-Saite, und lass sie ausklingen.',
            en: 'Pluck an open string, for example the G string, and let it ring.',
            fr: 'Pince une corde à vide, par exemple la corde de Sol, et laisse-la sonner.',
          },
          {
            de: 'Zeigt die Nadel nach links, ist die Saite zu tief: Dreh den Wirbel so, dass die Saite straffer wird.',
            en: 'If the needle points left, the string is too low: turn the peg so the string gets tighter.',
            fr: 'Si l’aiguille part à gauche, la corde est trop grave : tourne la mécanique pour la tendre.',
          },
          {
            de: 'Zeigt sie nach rechts, ist die Saite zu hoch: Dreh in die andere Richtung, bis die Nadel in der Mitte steht.',
            en: 'If it points right, the string is too high: turn the other way until the needle sits in the middle.',
            fr: 'Si elle part à droite, la corde est trop aiguë : tourne dans l’autre sens jusqu’à ce que l’aiguille soit au centre.',
          },
          {
            de: 'Wiederhole das für C, E und A – und prüf danach noch einmal alle vier Saiten.',
            en: 'Repeat for C, E and A – then check all four strings once more.',
            fr: 'Recommence pour Do, Mi et La, puis vérifie encore une fois les quatre cordes.',
          },
        ],
      },
      { tool: 'stimmen' },
      {
        h2: {
          de: 'Welcher Wirbel gehört zu welcher Saite?',
          en: 'Which peg belongs to which string?',
          fr: 'Quelle mécanique pour quelle corde ?',
        },
      },
      {
        p: {
          de: 'Der häufigste Stolperstein: Man dreht am Wirbel einer anderen Saite und wundert sich, dass sich nichts tut. Folge deshalb mit dem Finger der Saite bis zum Kopf der Ukulele. Dreh langsam, in kleinen Schritten, und zupf dabei immer wieder. Stimm am besten von unten an den Ton heran: Ist die Saite zu hoch, lass sie erst etwas tiefer und dreh dann wieder hinauf. So hält die Stimmung besser.',
          en: 'The most common stumbling block: turning the peg of a different string and wondering why nothing changes. So trace the string with your finger all the way to the headstock. Turn slowly, in small steps, and keep plucking while you turn. It helps to tune up to the note: if the string is too high, go a bit below first and then come back up. The tuning holds better that way.',
          fr: 'Le piège le plus courant : tourner la mécanique d’une autre corde et se demander pourquoi rien ne change. Suis donc la corde avec ton doigt jusqu’à la tête du ukulélé. Tourne lentement, par petits pas, en pinçant la corde régulièrement. Monte de préférence vers la note : si la corde est trop aiguë, descends un peu plus bas puis remonte. L’accord tient mieux ainsi.',
        },
      },
      {
        tip: {
          de: 'Zeigt das Stimmgerät den richtigen Buchstaben, aber die Saite fühlt sich sehr straff an? Dann ist sie vielleicht eine Oktave zu hoch. Lass sie lieber locker, bevor sie reißt.',
          en: 'The tuner shows the right letter, but the string feels very tight? It may be an octave too high. Loosen it before it snaps.',
          fr: 'L’accordeur affiche la bonne note, mais la corde est très tendue ? Elle est peut-être une octave trop haut. Détends-la avant qu’elle ne casse.',
        },
      },
      {
        h2: {
          de: 'Ohne Stimmgerät: die Saiten untereinander stimmen',
          en: 'Without a tuner: tuning the strings to each other',
          fr: 'Sans accordeur : accorder les cordes entre elles',
        },
      },
      {
        p: {
          de: 'Wenn eine Saite stimmt, zum Beispiel die A-Saite nach einem Referenzton, kannst du die anderen danach richten:',
          en: 'Once one string is in tune – say the A string, matched to a reference note – you can tune the others to it:',
          fr: 'Si une corde est juste, par exemple la corde de La d’après une note de référence, tu peux accorder les autres sur elle :',
        },
      },
      {
        ul: [
          {
            de: 'E-Saite im **5. Bund** greifen = klingt wie die leere A-Saite.',
            en: 'E string held at the **5th fret** = sounds like the open A string.',
            fr: 'Corde de Mi à la **5e case** = même son que le La à vide.',
          },
          {
            de: 'C-Saite im **4. Bund** = klingt wie die leere E-Saite.',
            en: 'C string at the **4th fret** = sounds like the open E string.',
            fr: 'Corde de Do à la **4e case** = même son que le Mi à vide.',
          },
          {
            de: 'C-Saite im **7. Bund** = klingt wie die leere G-Saite (das hohe G).',
            en: 'C string at the **7th fret** = sounds like the open G string (the high G).',
            fr: 'Corde de Do à la **7e case** = même son que le Sol à vide (le Sol aigu).',
          },
        ],
      },
      {
        p: {
          de: 'Neue Saiten dehnen sich in den ersten Tagen stark und verstimmen sich ständig. Das ist normal und hört bald auf. Mehr dazu bei [Saiten wechseln und Pflege](wissen:saiten-wechseln-pflege). Die Namen der Saiten erklärt [Ukulele-Saiten: G, C, E, A](wissen:ukulele-saiten).',
          en: 'New strings stretch a lot during the first few days and keep going out of tune. That is normal and soon stops. Find out more in [changing strings and care](wissen:saiten-wechseln-pflege). The string names are explained in [ukulele string names](wissen:ukulele-saiten).',
          fr: 'Les cordes neuves se détendent beaucoup les premiers jours et se désaccordent sans arrêt. C’est normal et ça passe vite. Plus d’infos dans [changer les cordes et entretien](wissen:saiten-wechseln-pflege). Le nom des cordes est expliqué dans [les cordes du ukulélé](wissen:ukulele-saiten).',
        },
      },
    ],
    related: ['ukulele-saiten', 'saiten-wechseln-pflege', 'ukulele-erste-akkorde', 'toene-und-notennamen'],
  },
  {
    id: 'ukulele-erste-akkorde',
    slug: { de: 'ukulele-erste-akkorde', en: 'first-ukulele-chords', fr: 'premiers-accords-ukulele' },
    instruments: ['ukulele'],
    category: 'erste-schritte',
    title: {
      de: 'Die ersten Ukulele-Akkorde: C, Am, F und G7',
      en: 'First ukulele chords for beginners: C, Am, F and G7',
      fr: 'Premiers accords de ukulélé : C, Am, F et G7',
    },
    description: {
      de: 'Ukulele lernen für Anfänger: Die ersten Akkorde C, Am, F und G7 Schritt für Schritt, der erste Akkordwechsel und Lieder, die du damit spielen kannst.',
      en: 'Learn ukulele as a beginner: your first chords C, Am, F and G7 step by step, your first chord change and songs you can play with them right away.',
      fr: 'Débuter le ukulélé : les premiers accords C, Am, F et G7 pas à pas, ton premier changement d’accord et des chansons à jouer tout de suite.',
    },
    blocks: [
      {
        p: {
          de: 'Mit nur vier Akkorden kannst du schon Dutzende Lieder begleiten. Die gute Nachricht: Auf der Ukulele sind sie besonders leicht. Zwei davon brauchen nur einen einzigen Finger! Stimm deine Ukulele vorher, dann klingen die Akkorde gleich richtig schön.',
          en: 'With just four chords you can already accompany dozens of songs. The good news: on the ukulele they are especially easy, and two of them need only a single finger! Tune your ukulele first so the chords sound lovely straight away.',
          fr: 'Avec seulement quatre accords, tu peux déjà accompagner des dizaines de chansons. Bonne nouvelle : au ukulélé, ils sont particulièrement simples, et deux d’entre eux ne demandent qu’un seul doigt ! Accorde ton ukulélé avant, pour que tout sonne bien dès le départ.',
        },
      },
      { h2: { de: 'C – ein Finger', en: 'C – one finger', fr: 'C – un seul doigt' } },
      {
        p: {
          de: 'Leg deinen Ringfinger auf die A-Saite (die unterste) in den 3. Bund. Die anderen drei Saiten bleiben leer. Schlag alle vier Saiten an – das ist C-Dur.',
          en: 'Put your ring finger on the A string (the bottom one) at the 3rd fret. The other three strings stay open. Strum all four strings – that is C major.',
          fr: 'Pose ton annulaire sur la corde de La (celle du bas) à la 3e case. Les trois autres cordes restent à vide. Gratte les quatre cordes : voilà C, do majeur.',
        },
      },
      { chord: 'C' },
      { h2: { de: 'Am – ein Finger', en: 'Am – one finger', fr: 'Am – un seul doigt' } },
      {
        p: {
          de: 'Jetzt der Mittelfinger auf die G-Saite (die oberste) in den 2. Bund. Alles andere bleibt leer. Hör genau hin: Am (a-Moll) klingt etwas nachdenklicher als C.',
          en: 'Now place your middle finger on the G string (the top one) at the 2nd fret. Everything else stays open. Listen closely: Am (A minor) sounds a little more thoughtful than C.',
          fr: 'Maintenant, le majeur sur la corde de Sol (celle du haut) à la 2e case. Le reste à vide. Écoute bien : Am (la mineur) sonne un peu plus mélancolique que C.',
        },
      },
      { chord: 'Am' },
      { h2: { de: 'F – Am plus ein Finger', en: 'F – Am plus one finger', fr: 'F – Am plus un doigt' } },
      {
        p: {
          de: 'Greif Am und setz zusätzlich den Zeigefinger auf die E-Saite in den 1. Bund. Fertig ist F-Dur. Die beiden Akkorde sind also Nachbarn.',
          en: 'Hold Am and add your index finger on the E string at the 1st fret. That is F major – so the two chords are next-door neighbours.',
          fr: 'Garde Am et ajoute l’index sur la corde de Mi à la 1re case. Voilà F, fa majeur. Ces deux accords sont donc voisins.',
        },
      },
      { chord: 'F' },
      { h2: { de: 'G7 – drei Finger', en: 'G7 – three fingers', fr: 'G7 – trois doigts' } },
      {
        p: {
          de: 'G7 ist der erste Akkord mit drei Fingern: Zeigefinger auf die E-Saite im 1. Bund, Mittelfinger auf die C-Saite im 2. Bund, Ringfinger auf die A-Saite im 2. Bund. Die Finger bilden ein kleines Dreieck. Nimm dir Zeit, bis alle Saiten klingen.',
          en: 'G7 is your first three-finger chord: index finger on the E string at the 1st fret, middle finger on the C string at the 2nd fret, ring finger on the A string at the 2nd fret. Your fingers form a little triangle. Take your time until every string rings.',
          fr: 'G7 est ton premier accord à trois doigts : index sur la corde de Mi à la 1re case, majeur sur la corde de Do à la 2e case, annulaire sur la corde de La à la 2e case. Tes doigts forment un petit triangle. Prends ton temps jusqu’à ce que toutes les cordes sonnent.',
        },
      },
      { chord: 'G7' },
      {
        h2: {
          de: 'Dein erster Akkordwechsel',
          en: 'Your first chord change',
          fr: 'Ton premier changement d’accord',
        },
      },
      {
        ol: [
          {
            de: 'Beginne mit **Am → F**: Der Mittelfinger bleibt einfach liegen, nur der Zeigefinger kommt dazu oder geht weg.',
            en: 'Start with **Am → F**: your middle finger simply stays put; only the index finger comes and goes.',
            fr: 'Commence par **Am → F** : le majeur reste en place, seul l’index se pose ou se lève.',
          },
          {
            de: 'Schlag jeden Akkord viermal an und wechsle dann. Klappt es, nur noch zweimal, dann einmal.',
            en: 'Strum each chord four times, then switch. When that works, try two strums each, then one.',
            fr: 'Gratte chaque accord quatre fois, puis change. Quand ça marche, deux fois chacun, puis une seule.',
          },
          {
            de: 'Danach **C → G7** und **C → Am**. Beweg alle Finger gleichzeitig, nicht einzeln nacheinander.',
            en: 'Then try **C → G7** and **C → Am**. Move all your fingers at once rather than one after another.',
            fr: 'Ensuite **C → G7** et **C → Am**. Déplace tous les doigts en même temps, pas l’un après l’autre.',
          },
        ],
      },
      {
        tip: {
          de: 'Zu Beginn tun die Fingerkuppen manchmal weh. Lieber oft kurz üben als selten lange – mehr dazu bei [Fingerkuppen und Hornhaut](wissen:fingerkuppen-hornhaut). Tricks für schnellere Wechsel findest du bei [Akkordwechsel schneller](wissen:akkordwechsel-schneller).',
          en: 'Your fingertips may hurt a little at first. Short, frequent sessions beat long, rare ones – see [sore fingertips and calluses](wissen:fingerkuppen-hornhaut). For tricks to switch faster, read [faster chord changes](wissen:akkordwechsel-schneller).',
          fr: 'Au début, le bout des doigts peut faire un peu mal. Mieux vaut jouer souvent et peu que rarement et longtemps : lis [doigts douloureux et corne](wissen:fingerkuppen-hornhaut). Pour changer plus vite, va voir [changer d’accord plus vite](wissen:akkordwechsel-schneller).',
        },
      },
      { tool: 'spiel' },
      { h2: { de: 'Deine ersten Lieder', en: 'Your first songs', fr: 'Tes premières chansons' } },
      {
        p: {
          de: 'Mit C und G7 klappen schon [Hänschen klein](lied:haenschen-klein) und [Row, Row, Row Your Boat](lied:row-row). Kommt F dazu, spielst du [Alle meine Entchen](lied:alle-meine-entchen). Mit allen vier Akkorden passt [Am Lagerfeuer](lied:lagerfeuer).',
          en: 'With C and G7 you can already play [Hänschen klein](lied:haenschen-klein) and [Row, Row, Row Your Boat](lied:row-row). Add F for [Alle meine Entchen](lied:alle-meine-entchen), and with all four chords try [Am Lagerfeuer](lied:lagerfeuer).',
          fr: 'Avec C et G7, tu peux déjà jouer [Hänschen klein](lied:haenschen-klein) et [Row, Row, Row Your Boat](lied:row-row). Avec F en plus, essaie [Alle meine Entchen](lied:alle-meine-entchen), et avec les quatre accords [Am Lagerfeuer](lied:lagerfeuer).',
        },
      },
      { tool: 'lieder' },
    ],
    related: ['ukulele-akkorde', 'akkordwechsel-schneller', 'lieder-fuer-anfaenger', 'schlagmuster-lernen'],
  },
  {
    id: 'ukulele-akkorde',
    slug: { de: 'wichtigste-ukulele-akkorde', en: 'ukulele-chords', fr: 'accords-ukulele' },
    instruments: ['ukulele'],
    category: 'akkorde',
    title: {
      de: 'Ukulele-Akkorde: die wichtigsten Griffe für Anfänger',
      en: 'Ukulele chords: the most important shapes for beginners',
      fr: 'Accords de ukulélé : les doigtés essentiels pour débuter',
    },
    description: {
      de: 'Die wichtigsten Ukulele-Akkorde mit Griffbild: C, Am, F, G, G7, Dm, Em, D, A7 und C7 – nach Tonarten sortiert, damit du schnell viele Lieder spielst.',
      en: 'The most important ukulele chords with diagrams: C, Am, F, G, G7, Dm, Em, D, A7 and C7 – grouped by key so you can play lots of songs quickly.',
      fr: 'Les accords de ukulélé essentiels avec diagrammes : C, Am, F, G, G7, Dm, Em, D, A7 et C7, rangés par tonalité pour jouer vite plein de chansons.',
    },
    blocks: [
      {
        p: {
          de: 'Es gibt Hunderte von Ukulele-Akkorden – aber für die allermeisten Lieder reichen zehn bis zwölf. Am leichtesten lernst du sie in „Familien“: Akkorde, die in derselben Tonart oft zusammen vorkommen. Ein Griffbild zeigt die Saiten G, C, E, A von links nach rechts; die Punkte sind deine Finger.',
          en: 'There are hundreds of ukulele chords, but ten to twelve cover the vast majority of songs. The easiest way to learn them is in “families”: chords that often appear together in the same key. A chord chart shows the strings G, C, E, A from left to right; the dots are your fingers.',
          fr: 'Il existe des centaines d’accords de ukulélé, mais dix à douze suffisent pour la grande majorité des chansons. Le plus simple est de les apprendre par « familles » : des accords qui vont souvent ensemble dans une même tonalité. Un diagramme montre les cordes Sol, Do, Mi, La de gauche à droite ; les points sont tes doigts.',
        },
      },
      {
        h2: {
          de: 'Familie C: die Startfamilie',
          en: 'The C family: where everyone starts',
          fr: 'La famille de C : pour commencer',
        },
      },
      {
        p: {
          de: 'C, Am, F und G7 sind die vier ersten Akkorde fast jeder Ukulelenklasse. Sie sind in den [ersten Ukulele-Akkorden](wissen:ukulele-erste-akkorde) Schritt für Schritt erklärt. Statt G7 steht manchmal G, und Dm und Em kommen dazu.',
          en: 'C, Am, F and G7 are the first four chords in almost every ukulele class. They are explained step by step in [first ukulele chords](wissen:ukulele-erste-akkorde). Sometimes G appears instead of G7, and Dm and Em join in.',
          fr: 'C, Am, F et G7 sont les quatre premiers accords de presque toutes les classes de ukulélé. Ils sont expliqués pas à pas dans [premiers accords de ukulélé](wissen:ukulele-erste-akkorde). Parfois G remplace G7, et Dm et Em s’y ajoutent.',
        },
      },
      { chord: 'C' },
      { chord: 'Am' },
      { chord: 'F' },
      { chord: 'G7' },
      { chord: 'G' },
      { chord: 'Dm' },
      { chord: 'Em' },
      { h2: { de: 'Familie F', en: 'The F family', fr: 'La famille de F' } },
      {
        p: {
          de: 'Viele Kinderlieder stehen in F. Dazu brauchst du F, C7 und manchmal Bb. C7 ist herrlich einfach: nur der Zeigefinger auf der A-Saite im 1. Bund.',
          en: 'Lots of children’s songs are in F. For those you need F, C7 and sometimes Bb. C7 is wonderfully easy: just your index finger on the A string at the 1st fret.',
          fr: 'Beaucoup de comptines sont en F. Il te faut F, C7 et parfois Bb. C7 est super simple : juste l’index sur la corde de La à la 1re case.',
        },
      },
      { chord: 'C7' },
      { h2: { de: 'Familie G und D', en: 'The G and D families', fr: 'Les familles de G et de D' } },
      {
        p: {
          de: 'Für Lieder in G brauchst du G, C, D (oder D7) und Em. In D kommen A7 und D dazu. A7 ist wieder ein Ein-Finger-Akkord: Zeigefinger auf die C-Saite im 1. Bund.',
          en: 'Songs in G need G, C, D (or D7) and Em. For D you add A7 and D. A7 is another one-finger chord: index finger on the C string at the 1st fret.',
          fr: 'Pour les chansons en G, il faut G, C, D (ou D7) et Em. En D, on ajoute A7 et D. A7 est encore un accord à un doigt : l’index sur la corde de Do à la 1re case.',
        },
      },
      { chord: 'D' },
      { chord: 'A7' },
      {
        h2: {
          de: 'Griffe als Zahlen',
          en: 'Chords written as numbers',
          fr: 'Les accords en chiffres',
        },
      },
      {
        p: {
          de: 'Manchmal stehen Griffe als vier Ziffern da, zum Beispiel **2010** für F. Jede Ziffer gehört zu einer Saite, in der Reihenfolge G, C, E, A. Die Zahl sagt dir den Bund, eine 0 heißt: Saite leer lassen. C ist also 0003, Am 2000 und G7 0212. Mit dieser Schreibweise kannst du dir Griffe auch ohne Bild schnell notieren.',
          en: 'Sometimes chords are written as four digits, such as **2010** for F. Each digit belongs to a string, in the order G, C, E, A. The number tells you the fret, and 0 means leave the string open. So C is 0003, Am is 2000 and G7 is 0212. This shorthand lets you jot down chords quickly without drawing a diagram.',
          fr: 'Parfois, les accords s’écrivent avec quatre chiffres, par exemple **2010** pour F. Chaque chiffre correspond à une corde, dans l’ordre Sol, Do, Mi, La. Le chiffre indique la case, et 0 veut dire corde à vide. C s’écrit donc 0003, Am 2000 et G7 0212. Pratique pour noter un accord vite fait, sans dessiner de diagramme.',
        },
      },
      {
        tip: {
          de: 'Lern nicht alle Akkorde auf einmal. Nimm dir pro Woche einen neuen vor und üb ihn mit einem Akkord, den du schon kannst. Zu schwer? Dann hilft [Schwierige Ukulele-Akkorde einfach spielen](wissen:ukulele-schwierige-akkorde).',
          en: 'Do not try to learn every chord at once. Pick one new chord a week and practise switching to it from one you already know. Too tricky? See [hard ukulele chords made easy](wissen:ukulele-schwierige-akkorde).',
          fr: 'N’apprends pas tous les accords d’un coup. Choisis-en un nouveau par semaine et entraîne-toi à passer d’un accord connu à celui-là. Trop dur ? Lis [accords de ukulélé difficiles](wissen:ukulele-schwierige-akkorde).',
        },
      },
      {
        h2: {
          de: 'Was bedeuten m und 7?',
          en: 'What do m and 7 mean?',
          fr: 'Que veulent dire m et 7 ?',
        },
      },
      {
        p: {
          de: 'Ein kleines **m** steht für Moll (Am = a-Moll), eine **7** für einen Septakkord mit einem zusätzlichen Ton, der nach „weiter geht’s“ klingt. Alles Weitere erklären [Akkordsymbole lesen](wissen:akkordsymbole-lesen) und [Dur und Moll](wissen:dur-und-moll). Wenn du einen Griff gefunden hast und wissen willst, wie er heißt, spiel ihn dem [Akkord-Detektiv](tool:detektiv) vor.',
          en: 'A small **m** stands for minor (Am = A minor), and a **7** means a seventh chord with an extra note that sounds like “there’s more to come”. Find out more in [reading chord symbols](wissen:akkordsymbole-lesen) and [major and minor](wissen:dur-und-moll). Found a shape and want to know its name? Play it to the [chord detective](tool:detektiv).',
          fr: 'Un petit **m** signifie mineur (Am = la mineur), un **7** un accord de septième avec une note en plus qui donne envie de continuer. Tout est expliqué dans [lire les symboles d’accords](wissen:akkordsymbole-lesen) et [majeur et mineur](wissen:dur-und-moll). Tu as trouvé un doigté et tu veux connaître son nom ? Joue-le au [détective d’accords](tool:detektiv).',
        },
      },
      { tool: 'akkorde' },
    ],
    related: ['ukulele-erste-akkorde', 'ukulele-schwierige-akkorde', 'akkordsymbole-lesen', 'dur-und-moll'],
  },
  {
    id: 'ukulele-schwierige-akkorde',
    slug: {
      de: 'schwierige-ukulele-akkorde',
      en: 'hard-ukulele-chords-made-easy',
      fr: 'accords-ukulele-difficiles',
    },
    instruments: ['ukulele'],
    category: 'akkorde',
    title: {
      de: 'Schwierige Ukulele-Akkorde einfach spielen: E, Bb und D',
      en: 'Hard ukulele chords made easy: E, Bb and D',
      fr: 'Accords de ukulélé difficiles : E, Bb et D en plus facile',
    },
    description: {
      de: 'E, Bb und D auf der Ukulele sind knifflig. Mit diesen Tricks, einfacheren Ersatzakkorden und Transponieren klappen auch schwierige Griffe.',
      en: 'E, Bb and D are tricky on the ukulele. These tips, simpler substitute chords and transposing help you handle even the hardest shapes.',
      fr: 'E, Bb et D sont délicats au ukulélé. Avec ces astuces, des accords de remplacement plus simples et la transposition, tout devient jouable.',
    },
    blocks: [
      {
        p: {
          de: 'Irgendwann taucht in einem Lied ein Akkord auf, der sich einfach nicht greifen lassen will. Bei der Ukulele sind das vor allem **E**, **Bb** und **D**. Keine Sorge: Damit kämpfen fast alle. Es gibt drei Wege – üben mit dem richtigen Trick, einen einfacheren Ersatz nehmen oder das ganze Lied in eine andere Tonart verschieben.',
          en: 'Sooner or later a song throws a chord at you that just will not cooperate. On the ukulele these are mostly **E**, **Bb** and **D**. Do not worry – almost everybody struggles with them. There are three ways out: practise with the right trick, use a simpler substitute, or move the whole song into a different key.',
          fr: 'Un jour ou l’autre, une chanson te réserve un accord qui ne veut pas se laisser jouer. Au ukulélé, ce sont surtout **E**, **Bb** et **D**. Pas de panique, presque tout le monde galère avec. Il y a trois solutions : t’entraîner avec la bonne astuce, prendre un accord de remplacement plus simple ou transposer toute la chanson.',
        },
      },
      { h2: { de: 'D: drei Finger in einem Bund', en: 'D: three fingers on one fret', fr: 'D : trois doigts sur la même case' } },
      {
        p: {
          de: 'Bei D liegen G-, C- und E-Saite alle im 2. Bund, die A-Saite bleibt leer. Für kleine Hände ist es eng. Probier Zeige-, Mittel- und Ringfinger schräg nebeneinander. Manchen hilft es, nur einen Finger flach über die drei Saiten zu legen. Die A-Saite muss dabei frei bleiben.',
          en: 'For D, the G, C and E strings are all at the 2nd fret while the A string stays open. That is a tight squeeze for small hands. Try index, middle and ring finger side by side at a slight angle. Some players prefer laying one finger flat across the three strings – just keep the A string free.',
          fr: 'Pour D, les cordes de Sol, Do et Mi sont toutes à la 2e case, la corde de La reste à vide. Pour de petites mains, c’est serré. Essaie l’index, le majeur et l’annulaire côte à côte, légèrement en biais. Certains préfèrent poser un seul doigt à plat sur les trois cordes, en laissant la corde de La libre.',
        },
      },
      { chord: 'D' },
      {
        p: {
          de: 'Ersatz: In vielen Liedern passt auch D7. Eine sehr leichte Form von D7: Zeigefinger auf die G-Saite im 2. Bund, Mittelfinger auf die E-Saite im 2. Bund, C- und A-Saite bleiben leer.',
          en: 'Substitute: in many songs D7 works too. A very easy form of D7: index finger on the G string at the 2nd fret, middle finger on the E string at the 2nd fret, with the C and A strings open.',
          fr: 'Remplacement : dans beaucoup de chansons, D7 fonctionne aussi. Une forme très facile de D7 : index sur la corde de Sol à la 2e case, majeur sur la corde de Mi à la 2e case, cordes de Do et de La à vide.',
        },
      },
      { h2: { de: 'Bb: der kleine Barré', en: 'Bb: the mini barre', fr: 'Bb : le petit barré' } },
      {
        p: {
          de: 'Für Bb legt der Zeigefinger flach über E- und A-Saite im 1. Bund. Dazu kommt der Mittelfinger auf die C-Saite im 2. Bund und der Ringfinger auf die G-Saite im 3. Bund. Drück mit der Außenkante des Zeigefingers, ganz nah am Bundstäbchen – das braucht weniger Kraft.',
          en: 'For Bb, lay your index finger flat across the E and A strings at the 1st fret. Add your middle finger on the C string at the 2nd fret and your ring finger on the G string at the 3rd fret. Press with the outer edge of your index finger, right next to the fret wire – that takes less strength.',
          fr: 'Pour Bb, pose l’index à plat sur les cordes de Mi et de La à la 1re case. Ajoute le majeur sur la corde de Do à la 2e case et l’annulaire sur la corde de Sol à la 3e case. Appuie avec le côté extérieur de l’index, tout près de la frette : il faut moins de force.',
        },
      },
      { chord: 'Bb' },
      { h2: { de: 'E: der Endgegner', en: 'E: the final boss', fr: 'E : le boss final' } },
      {
        p: {
          de: 'E-Dur ist auf der Ukulele wirklich schwer. Eine übliche Form braucht im 4. Bund drei Saiten auf einmal und die A-Saite im 2. Bund. Für Anfänger gibt es zwei bessere Lösungen: Oft klingt **E7** an derselben Stelle fast genauso passend und ist viel leichter. Oder du transponierst das Lied.',
          en: 'E major is genuinely hard on the ukulele. A common shape needs three strings at the 4th fret plus the A string at the 2nd. Beginners have two better options: **E7** often fits almost as well in the same spot and is far easier. Or you transpose the song.',
          fr: 'E majeur est vraiment difficile au ukulélé. Un doigté courant demande trois cordes à la 4e case et la corde de La à la 2e. Pour débuter, il y a deux meilleures solutions : souvent, **E7** convient presque aussi bien au même endroit et il est bien plus simple. Ou alors tu transposes la chanson.',
        },
      },
      { chord: 'E7' },
      {
        h2: {
          de: 'Der Joker: Transponieren',
          en: 'The joker: transposing',
          fr: 'Le joker : transposer',
        },
      },
      {
        p: {
          de: 'Steht ein Lied in A oder E, wimmelt es von schwierigen Griffen. Verschiebst du alle Akkorde gleichmäßig, zum Beispiel nach C oder G, bleiben Melodie und Stimmung gleich – nur etwas höher oder tiefer. Wie das geht, erklärt [Transponieren](wissen:transponieren). Bei den Liedern in der App kannst du die Tonart direkt umstellen.',
          en: 'Songs in A or E are full of awkward shapes. If you shift every chord by the same amount, for example to C or G, the tune and mood stay the same – just a little higher or lower. [Transposing](wissen:transponieren) explains how. For the songs in the app you can change the key directly.',
          fr: 'Les chansons en A ou en E sont pleines de doigtés compliqués. Si tu décales tous les accords de la même façon, par exemple vers C ou G, la mélodie et l’ambiance restent les mêmes, juste un peu plus aiguës ou plus graves. [Transposer](wissen:transponieren) t’explique comment faire. Pour les chansons de l’appli, tu peux changer la tonalité directement.',
        },
      },
      {
        tip: {
          de: 'Ein schwerer Griff wird leichter, wenn du ihn ohne Anschlagen „trocken“ übst: greifen, loslassen, greifen – zehnmal hintereinander. Klingt eine Saite trotzdem dumpf, hilft [Saite schnarrt oder klingt dumpf](wissen:saubere-griffe).',
          en: 'A tough shape gets easier when you practise it “dry” without strumming: fingers on, fingers off, fingers on – ten times in a row. If a string still sounds dull, read [buzzing or muted strings](wissen:saubere-griffe).',
          fr: 'Un doigté difficile devient plus facile si tu l’entraînes « à sec », sans gratter : poser, lever, poser, dix fois de suite. Si une corde sonne encore étouffée, lis [corde qui frise ou sonne étouffée](wissen:saubere-griffe).',
        },
      },
      { tool: 'akkorde' },
    ],
    related: ['ukulele-akkorde', 'transponieren', 'saubere-griffe', 'akkordsymbole-lesen'],
  },
  {
    id: 'ukulele-zupfen',
    slug: { de: 'ukulele-zupfen-fingerpicking', en: 'ukulele-fingerpicking', fr: 'picking-ukulele' },
    instruments: ['ukulele'],
    category: 'technik',
    title: {
      de: 'Ukulele zupfen: Fingerpicking für Anfänger',
      en: 'Ukulele fingerpicking for beginners',
      fr: 'Le picking au ukulélé pour débutants',
    },
    description: {
      de: 'Ukulele zupfen lernen: welcher Finger welche Saite spielt, drei einfache Zupfmuster für 4/4- und 3/4-Takt und Tipps für einen gleichmäßigen Klang.',
      en: 'Learn ukulele fingerpicking: which finger plays which string, three easy picking patterns in 4/4 and 3/4 time and tips for an even, flowing sound.',
      fr: 'Apprendre le picking au ukulélé : quel doigt pour quelle corde, trois motifs simples en 4/4 et 3/4 et des conseils pour un son régulier.',
    },
    blocks: [
      {
        p: {
          de: 'Beim Zupfen schlägst du die Saiten nicht alle zusammen an, sondern einzeln nacheinander. Das klingt ruhig und ein bisschen wie eine Harfe – perfekt für langsame Lieder und Schlaflieder. Die linke Hand greift dabei ganz normale Akkorde.',
          en: 'When you fingerpick, you do not strum all the strings together but play them one after another. It sounds calm and a little like a harp – perfect for slow songs and lullabies. Your fretting hand simply holds ordinary chords.',
          fr: 'En picking, tu ne grattes pas toutes les cordes ensemble : tu les pinces l’une après l’autre. Le son est doux, un peu comme une harpe, idéal pour les chansons lentes et les berceuses. La main gauche fait simplement les accords habituels.',
        },
      },
      {
        h2: {
          de: 'Ein Finger für jede Saite',
          en: 'One finger per string',
          fr: 'Un doigt par corde',
        },
      },
      {
        ul: [
          {
            de: '**Daumen** → G-Saite',
            en: '**Thumb** → G string',
            fr: '**Pouce** → corde de Sol',
          },
          {
            de: '**Zeigefinger** → C-Saite',
            en: '**Index finger** → C string',
            fr: '**Index** → corde de Do',
          },
          {
            de: '**Mittelfinger** → E-Saite',
            en: '**Middle finger** → E string',
            fr: '**Majeur** → corde de Mi',
          },
          {
            de: '**Ringfinger** → A-Saite',
            en: '**Ring finger** → A string',
            fr: '**Annulaire** → corde de La',
          },
        ],
      },
      {
        p: {
          de: 'So muss deine Hand kaum wandern. Der Daumen zupft nach unten, die anderen Finger ziehen die Saite leicht nach oben in die Handfläche. Die Hand schwebt locker über den Saiten, ungefähr dort, wo Hals und Korpus sich treffen.',
          en: 'That way your hand hardly has to move. The thumb plucks downwards; the other fingers pull their string gently up towards your palm. Your hand hovers loosely over the strings, roughly where the neck meets the body.',
          fr: 'Ainsi, ta main bouge à peine. Le pouce pince vers le bas, les autres doigts tirent doucement leur corde vers la paume. La main flotte, détendue, au-dessus des cordes, à peu près là où le manche rejoint la caisse.',
        },
      },
      { h2: { de: 'Drei Zupfmuster zum Start', en: 'Three patterns to start with', fr: 'Trois motifs pour commencer' } },
      {
        ol: [
          {
            de: '**Die Harfe (4/4):** G – C – E – A, also Daumen, Zeige-, Mittel-, Ringfinger. Wegen des hohen G klingt das wie eine kleine Glockenmelodie.',
            en: '**The harp (4/4):** G – C – E – A, that is thumb, index, middle, ring. Thanks to the high G it sounds like a little chime.',
            fr: '**La harpe (4/4) :** Sol – Do – Mi – La, soit pouce, index, majeur, annulaire. Grâce au Sol aigu, on dirait un petit carillon.',
          },
          {
            de: '**Hin und zurück (4/4):** C – E – A – E. Gleichmäßig in Achteln gezählt: „1 und 2 und …“. Passt gut zu [Twinkle, Twinkle, Little Star](lied:twinkle).',
            en: '**There and back (4/4):** C – E – A – E. Count evenly in eighth notes: “1 and 2 and …”. Works nicely for [Twinkle, Twinkle, Little Star](lied:twinkle).',
            fr: '**Aller-retour (4/4) :** Do – Mi – La – Mi. Compte régulièrement en croches : « 1 et 2 et … ». Parfait pour [Twinkle, Twinkle, Little Star](lied:twinkle).',
          },
          {
            de: '**Walzer (3/4):** Erst der Daumen auf der C-Saite, dann zweimal Mittel- und Ringfinger gemeinsam auf E und A: „Bum – tschick – tschick“. Ideal für [Oh My Darling, Clementine](lied:clementine).',
            en: '**Waltz (3/4):** first the thumb on the C string, then middle and ring finger together on E and A, twice: “boom – chick – chick”. Ideal for [Oh My Darling, Clementine](lied:clementine).',
            fr: '**Valse (3/4) :** d’abord le pouce sur la corde de Do, puis deux fois le majeur et l’annulaire ensemble sur Mi et La : « boum – tchic – tchic ». Idéal pour [Oh My Darling, Clementine](lied:clementine).',
          },
        ],
      },
      {
        p: {
          de: 'Zupfmuster werden oft als Tabulatur aufgeschrieben. Wie du sie liest, erfährst du bei [Tabulatur lesen](wissen:tabulatur-lesen). Was 4/4 und 3/4 bedeuten, erklärt [Takt und Taktarten](wissen:takt-und-taktarten).',
          en: 'Picking patterns are often written as tabs. Learn how to read them in [reading tabs](wissen:tabulatur-lesen). What 4/4 and 3/4 mean is explained in [time signatures](wissen:takt-und-taktarten).',
          fr: 'Les motifs de picking s’écrivent souvent en tablature. Pour la lire, va voir [lire une tablature](wissen:tabulatur-lesen). Ce que signifient 4/4 et 3/4 est expliqué dans [mesures et temps](wissen:takt-und-taktarten).',
        },
      },
      {
        tip: {
          de: 'Gleichmäßig ist wichtiger als schnell. Stell das [Metronom](tool:rhythmus) langsam ein und zupf zu jedem Klick einen Ton. Erst wenn das Muster von allein läuft, wechselst du dazu die Akkorde. Mehr Ideen bei [Mit Metronom üben](wissen:mit-metronom-ueben).',
          en: 'Steady matters more than speedy. Set the [metronome](tool:rhythmus) to a slow tempo and pick one note per click. Only once the pattern runs by itself should you start changing chords. More ideas in [practising with a metronome](wissen:mit-metronom-ueben).',
          fr: 'La régularité compte plus que la vitesse. Règle le [métronome](tool:rhythmus) sur un tempo lent et pince une note par clic. Change d’accord seulement quand le motif tourne tout seul. Plus d’idées dans [travailler avec un métronome](wissen:mit-metronom-ueben).',
        },
      },
      {
        h2: {
          de: 'Typische Stolpersteine',
          en: 'Common stumbling blocks',
          fr: 'Les pièges classiques',
        },
      },
      {
        ul: [
          {
            de: 'Die Hand hüpft mit jedem Ton hoch. Lass sie ruhig an ihrem Platz, nur die Finger bewegen sich.',
            en: 'Your hand bounces up with every note. Keep it still – only the fingers move.',
            fr: 'La main saute à chaque note. Garde-la immobile, seuls les doigts bougent.',
          },
          {
            de: 'Die Finger zupfen zu kräftig, die Saite schlägt gegen die Bünde. Ein sanftes Ziehen reicht.',
            en: 'Plucking too hard so the string slaps the frets. A gentle pull is enough.',
            fr: 'Pincer trop fort, la corde claque contre les frettes. Une légère traction suffit.',
          },
          {
            de: 'Beim Akkordwechsel stoppt das Muster. Übe den Wechsel zuerst allein, ohne Zupfen.',
            en: 'The pattern stops at every chord change. Practise the change on its own first, without picking.',
            fr: 'Le motif s’arrête à chaque changement d’accord. Entraîne d’abord le changement seul, sans pincer.',
          },
        ],
      },
      { tool: 'rhythmus' },
    ],
    related: ['ukulele-saiten', 'tabulatur-lesen', 'mit-metronom-ueben', 'takt-und-taktarten'],
  },
  {
    id: 'ukulele-linkshaender',
    slug: { de: 'ukulele-linkshaender', en: 'left-handed-ukulele', fr: 'ukulele-gaucher' },
    instruments: ['ukulele'],
    category: 'erste-schritte',
    published: '2026-10-10',
    title: {
      de: 'Ukulele für Linkshänder – umdrehen, umbesaiten oder rechtsherum?',
      en: 'Left-handed ukulele – flip it, restring it or play right-handed?',
      fr: 'Ukulélé pour gaucher – inverser les cordes ou jouer en droitier ?',
    },
    description: {
      de: 'Linkshänder an der Ukulele: rechtsherum lernen, umbesaiten oder verkehrt herum spielen? Vor- und Nachteile und gespiegelte Griffbilder in der App.',
      en: 'Left-handed on the ukulele: learn right-handed, restring it or play it upside down? Pros and cons, plus mirrored chord charts in the app.',
      fr: 'Gaucher au ukulélé : jouer en droitier, inverser les cordes ou jouer à l’envers ? Avantages, inconvénients et diagrammes inversés dans l’appli.',
    },
    blocks: [
      {
        p: {
          de: 'Du schreibst mit links und fragst dich, wie herum du die Ukulele halten sollst? Gute Nachricht: Bei der Ukulele brauchen **beide Hände** Geschick. Die eine greift die Akkorde, die andere schlägt den Rhythmus. Es gibt deshalb kein „richtig“ oder „verkehrt“, sondern drei Wege, die alle funktionieren.',
          en: 'You write with your left hand and wonder which way round to hold the ukulele? Good news: on the ukulele **both hands** need skill. One frets the chords, the other strums the rhythm. So there is no single correct way – there are three ways, and all of them work.',
          fr: 'Tu écris de la main gauche et tu te demandes dans quel sens tenir le ukulélé ? Bonne nouvelle : au ukulélé, **les deux mains** travaillent. L’une forme les accords, l’autre gratte le rythme. Il n’y a donc pas de bon ou de mauvais sens, mais trois façons de faire qui marchent toutes.',
        },
      },
      { h2: { de: 'Weg 1: ganz normal rechtsherum', en: 'Option 1: play the standard way', fr: 'Option 1 : jouer comme un droitier' } },
      {
        p: {
          de: 'Viele Linkshänder lernen Ukulele einfach wie alle anderen: Hals nach links, die linke Hand greift. Das hat Vorteile: Du kannst jede Ukulele ausleihen, siehst die Griffe der Lehrkraft und der Klasse genau so wie in den Schulheften, und deine geschickte linke Hand übernimmt die Griffe – das ist oft der schwierigere Teil.',
          en: 'Many left-handers simply learn the ukulele like everybody else: neck to the left, left hand on the chords. That has advantages: you can borrow any ukulele, you see your teacher’s and classmates’ chords exactly as in the school books, and your skilful left hand does the fretting – often the harder job.',
          fr: 'Beaucoup de gauchers apprennent tout simplement comme tout le monde : manche à gauche, main gauche sur les accords. C’est pratique : tu peux emprunter n’importe quel ukulélé, tu vois les accords du professeur et de la classe comme dans les méthodes, et ta main gauche habile s’occupe des accords – souvent la partie la plus difficile.',
        },
      },
      { h2: { de: 'Weg 2: umdrehen und umbesaiten', en: 'Option 2: flip it and restring it', fr: 'Option 2 : le retourner et inverser les cordes' } },
      {
        p: {
          de: 'Hier hältst du die Ukulele spiegelverkehrt: Hals nach rechts, die rechte Hand greift, die linke schlägt. Damit die Saiten wieder in der gewohnten Reihenfolge liegen – G oben beim Kinn, A unten –, werden sie **umgekehrt aufgezogen**. Alles ist dann genau ein Spiegelbild einer Rechtshänder-Ukulele.',
          en: 'Here you hold the ukulele mirrored: neck to the right, right hand fretting, left hand strumming. So that the strings are back in their usual order – G at the top near your chin, A at the bottom – they are **strung the other way round**. Everything is then an exact mirror image of a right-handed ukulele.',
          fr: 'Ici, tu tiens le ukulélé en miroir : manche à droite, la main droite forme les accords, la gauche gratte. Pour que les cordes retrouvent leur ordre habituel – Sol en haut près du menton, La en bas –, on les **monte dans l’autre sens**. Tout devient alors le reflet exact d’un ukulélé de droitier.',
        },
      },
      {
        ul: [
          {
            de: 'Der **Sattel** oben am Hals hat für jede Saite eine Kerbe, passend zu ihrer Dicke. Nach dem Umbesaiten liegen dickere Saiten in Kerben für dünnere. Oft geht es trotzdem; sonst passt eine Fachwerkstatt die Kerben an oder setzt einen neuen Sattel ein.',
            en: 'The **nut** at the top of the neck has a slot for each string, cut to its thickness. After restringing, thicker strings sit in slots meant for thinner ones. Often it still works; otherwise a repair shop adjusts the slots or fits a new nut.',
            fr: 'Le **sillet** en haut du manche a une encoche par corde, adaptée à son épaisseur. Après l’inversion, des cordes plus épaisses se retrouvent dans des encoches plus fines. Souvent ça marche quand même ; sinon, un luthier ajuste les encoches ou pose un nouveau sillet.',
          },
          {
            de: 'Der **Steg** unten auf dem Korpus ist bei den meisten Ukulelen gerade und funktioniert in beide Richtungen. Ist die Stegeinlage schräg oder abgestuft, sollte sie umgedreht oder ersetzt werden, damit die Töne weiter oben am Hals stimmen.',
            en: 'The **bridge** on the body is straight on most ukuleles and works either way. If the saddle is slanted or stepped, it should be turned round or replaced so notes higher up the neck stay in tune.',
            fr: 'Le **chevalet** sur la caisse est droit sur la plupart des ukulélés et fonctionne dans les deux sens. Si le sillet de chevalet est en biais ou en escalier, il faut le retourner ou le remplacer pour que les notes restent justes plus haut sur le manche.',
          },
          {
            de: 'Die kleinen **Orientierungspunkte** an der Halskante zeigen dann nach unten. Ein Erwachsener kann neue Punkte als Aufkleber oben anbringen.',
            en: 'The little **side dots** on the edge of the neck then face downwards. An adult can stick new ones on the top edge.',
            fr: 'Les petits **repères** sur la tranche du manche se retrouvent en dessous. Un adulte peut coller de nouveaux repères sur le dessus.',
          },
        ],
      },
      {
        p: {
          de: 'Weil die meisten Ukulelen fast symmetrisch gebaut sind, klappt das Umbesaiten hier leichter als bei vielen anderen Instrumenten. Es gibt auch fertige Linkshänder-Ukulelen.',
          en: 'Because most ukuleles are built almost symmetrically, restringing is easier than on many other instruments. Ready-made left-handed ukuleles exist too.',
          fr: 'Comme la plupart des ukulélés sont presque symétriques, l’inversion des cordes est plus simple que sur beaucoup d’autres instruments. Il existe aussi des ukulélés pour gauchers tout prêts.',
        },
      },
      { h2: { de: 'Weg 3: verkehrt herum, ohne Umbesaiten', en: 'Option 3: upside down, without restringing', fr: 'Option 3 : à l’envers, sans inverser les cordes' } },
      {
        p: {
          de: 'Manche drehen eine normale Ukulele einfach um und spielen sie so. Dann liegt die A-Saite oben und die G-Saite unten. Das geht, aber alle Griffe fühlen sich anders an als in jedem Schulheft, und die Finger müssen eigene Fingersätze finden. Für den Anfang in einer Klasse ist das meist der schwerste Weg.',
          en: 'Some people simply turn an ordinary ukulele over and play it that way. The A string is then at the top and the G string at the bottom. It works, but every chord feels different from any school book, and your fingers have to find their own fingerings. When starting out in a class, it is usually the hardest option.',
          fr: 'Certains retournent simplement un ukulélé normal et jouent ainsi. La corde de La est alors en haut et celle de Sol en bas. Ça marche, mais tous les accords se sentent autrement que dans les méthodes, et les doigts doivent trouver leurs propres doigtés. Pour débuter en classe, c’est souvent le chemin le plus difficile.',
        },
      },
      { h2: { de: 'Die Linkshänder-Ansicht in der App', en: 'The left-handed view in the app', fr: 'Le mode gaucher dans l’appli' } },
      {
        p: {
          de: 'Spielst du eine umbesaitete Ukulele (Weg 2), schalte die Einstellung **Linkshänder** ein – unter „Meine Sterne“ oder direkt unter dem Griffbild auf jeder Akkord-Seite. Dann sind alle Griffbilder und der Hals beim Blues gespiegelt, so wie du dein Instrument siehst. Die Buchstaben und Zahlen bleiben gut lesbar. Spielst du rechtsherum oder verkehrt herum ohne Umbesaiten, lass die Einstellung aus: Dann zeigen die normalen Griffbilder, wo die Finger hingehören.',
          en: 'If you play a restrung ukulele (option 2), switch on the **Left-handed** setting – under “My Stars” or right below the chord chart on any chord page. All chord charts and the blues neck are then mirrored, just as you see your instrument. Letters and numbers stay easy to read. If you play right-handed, or upside down without restringing, leave it off: the normal charts then show where your fingers go.',
          fr: 'Si tu joues un ukulélé aux cordes inversées (option 2), active le réglage **Mode gaucher** – dans « Mes étoiles » ou juste sous le diagramme de chaque page d’accord. Tous les diagrammes et le manche du blues sont alors inversés, comme tu vois ton instrument. Les lettres et les chiffres restent lisibles. Si tu joues en droitier, ou à l’envers sans inverser les cordes, laisse-le désactivé : les diagrammes normaux montrent où vont tes doigts.',
        },
      },
      { tool: 'akkorde' },
      {
        tip: {
          de: 'Probiert in Ruhe beide Richtungen aus, bevor ihr umbauen lasst, und sprecht mit der Lehrkraft. Wichtig ist nur, dass du dich wohlfühlst und gern spielst.',
          en: 'Try both directions calmly before having anything changed, and talk to the teacher. All that matters is that you feel comfortable and enjoy playing.',
          fr: 'Essayez tranquillement les deux sens avant de faire modifier l’instrument, et parlez-en au professeur. L’essentiel, c’est que tu te sentes à l’aise et que tu aies envie de jouer.',
        },
      },
    ],
    related: ['ukulele-halten', 'ukulele-saiten', 'ukulele-kinder', 'saiten-wechseln-pflege'],
  },
];
