import type { Article } from './types.ts';

export const BANJO_ARTICLES: Article[] = [
  {
    id: 'banjo-kinder',
    slug: { de: 'banjo-arten-fuer-kinder', en: 'banjo-types-kids', fr: 'quel-banjo-enfant' },
    instruments: ['banjo'],
    category: 'erste-schritte',
    title: {
      de: 'Welches Banjo für Kinder? Banjo-Arten einfach erklärt',
      en: 'Which Banjo for Kids? Banjo Types Explained Simply',
      fr: 'Quel banjo pour un enfant ? Les types de banjo expliqués',
    },
    description: {
      de: 'Fünfsaitig, Tenor, Gitarren-Banjo oder Banjo-Ukulele? So findest du das passende Banjo für Kinder – mit Tipps zu Gewicht, Größe und Bauart.',
      en: 'Five-string, tenor, six-string or banjo ukulele? How to choose the right banjo for kids, with tips on weight, size and open-back versus resonator.',
      fr: 'Cinq cordes, ténor, banjo-guitare ou banjolélé ? Comment choisir un banjo pour enfant : poids, taille, résonateur ou dos ouvert.',
    },
    blocks: [
      {
        p: {
          de: 'Banjo ist nicht gleich Banjo. Es gibt mehrere Arten, die unterschiedlich gestimmt sind und in ganz verschiedener Musik vorkommen. Bevor du (oder deine Eltern) eins aussuchst, lohnt sich ein kurzer Überblick. Auf dieser Seite geht es vor allem um das **fünfsaitige Banjo in Open-G-Stimmung** – das klassische Banjo aus Bluegrass und Old-Time-Musik.',
          en: 'Not every banjo is the same. There are several kinds, tuned differently and used in quite different styles of music. Before you (or your parents) pick one, a quick overview helps. This site is mainly about the **five-string banjo in open G tuning** – the classic banjo of bluegrass and old-time music.',
          fr: 'Il n’existe pas un seul banjo, mais plusieurs, accordés différemment et utilisés dans des musiques très variées. Avant d’en choisir un (seul ou avec tes parents), un petit tour d’horizon s’impose. Ce site parle surtout du **banjo à cinq cordes en open G** : le banjo classique du bluegrass et de la musique old-time.',
        },
      },
      { h2: { de: 'Die wichtigsten Banjo-Arten', en: 'The main types of banjo', fr: 'Les principaux types de banjo' } },
      {
        ul: [
          {
            de: '**Fünfsaitiges Banjo:** vier lange Saiten und eine kurze fünfte Saite, die erst am 5. Bund beginnt. Gespielt wird meist mit den Fingern (Picking) oder im Clawhammer-Stil. Das ist das Banjo, um das es hier geht.',
            en: '**Five-string banjo:** four long strings plus a short fifth string that starts at the 5th fret. Usually played with the fingers (picking) or in clawhammer style. This is the banjo this site covers.',
            fr: '**Banjo à cinq cordes :** quatre cordes longues et une cinquième corde courte qui commence à la 5e case. On le joue surtout aux doigts (picking) ou en clawhammer. C’est le banjo dont parle ce site.',
          },
          {
            de: '**Tenor-Banjo (4 Saiten):** kürzerer Hals, meist in Quinten gestimmt (C G D A), wird mit Plektrum gespielt – beliebt in irischer Musik und im Dixieland.',
            en: '**Tenor banjo (4 strings):** shorter neck, usually tuned in fifths (C G D A) and played with a pick – popular in Irish music and Dixieland jazz.',
            fr: '**Banjo ténor (4 cordes) :** manche plus court, accordé en quintes (C G D A, soit Do Sol Ré La) et joué au médiator – très présent dans la musique irlandaise et le jazz New Orleans.',
          },
          {
            de: '**Plektrum-Banjo (4 Saiten):** langer Hals wie beim Fünfsaiter, aber ohne kurze Saite; ebenfalls mit Plektrum.',
            en: '**Plectrum banjo (4 strings):** long neck like the five-string, but without the short string; also played with a pick.',
            fr: '**Banjo plectre (4 cordes) :** manche long comme le cinq cordes, mais sans la corde courte ; joué lui aussi au médiator.',
          },
          {
            de: '**Gitarren-Banjo (6 Saiten):** gestimmt wie eine Gitarre. Praktisch für Gitarristen, die den Banjo-Klang wollen.',
            en: '**Six-string banjo:** tuned like a guitar. Handy for guitarists who want the banjo sound.',
            fr: '**Banjo-guitare (6 cordes) :** accordé comme une guitare. Pratique pour les guitaristes qui veulent le son du banjo.',
          },
          {
            de: '**Banjo-Ukulele:** klein, vier Saiten, gestimmt wie eine Ukulele (G C E A). Klingt hell und kräftig.',
            en: '**Banjo ukulele:** small, four strings, tuned like a ukulele (G C E A). Bright and punchy.',
            fr: '**Banjolélé :** petit, quatre cordes, accordé comme un ukulélé (G C E A). Son clair et percutant.',
          },
        ],
      },
      { h2: { de: 'Resonator oder offene Rückseite?', en: 'Resonator or open back?', fr: 'Résonateur ou dos ouvert ?' } },
      {
        p: {
          de: 'Viele Fünfsaiter haben hinten eine geschlossene Schale, den **Resonator**. Er wirft den Klang nach vorne und macht das Banjo laut – ideal für Bluegrass in der Band. Dafür ist so ein Banjo oft ziemlich schwer. Banjos mit **offener Rückseite** (Open Back) klingen weicher und leiser und sind deutlich leichter. Für Kinder ist das meist angenehmer, gerade beim Üben zu Hause.',
          en: 'Many five-strings have a closed back called a **resonator**. It projects the sound forward and makes the banjo loud – great for bluegrass in a band. The downside: these banjos are often quite heavy. **Open-back** banjos sound softer and mellower and are much lighter. For kids that is usually more comfortable, especially for practising at home.',
          fr: 'Beaucoup de banjos à cinq cordes ont au dos une caisse fermée, le **résonateur**. Il projette le son vers l’avant et rend l’instrument puissant – parfait pour le bluegrass en groupe. Mais ces banjos sont souvent lourds. Les banjos à **dos ouvert** (open back) sonnent plus doux, moins fort, et pèsent nettement moins. Pour un enfant, c’est généralement plus confortable, surtout pour jouer à la maison.',
        },
      },
      { h2: { de: 'Worauf du bei Kindern achten solltest', en: 'What to look for with kids', fr: 'Ce qui compte pour un enfant' } },
      {
        ul: [
          {
            de: '**Gewicht:** Ein Banjo sollte sich bequem auf dem Oberschenkel halten lassen. Lieber leichter als zu schwer.',
            en: '**Weight:** the banjo should rest comfortably on the thigh. Lighter is better than too heavy.',
            fr: '**Poids :** le banjo doit reposer confortablement sur la cuisse. Mieux vaut trop léger que trop lourd.',
          },
          {
            de: '**Mensur:** Es gibt Banjos mit kürzerem Hals (kurze Mensur). Die Bünde liegen enger zusammen, die Finger müssen sich weniger strecken.',
            en: '**Scale length:** some banjos have a shorter neck (short scale). The frets sit closer together, so small hands don’t have to stretch as much.',
            fr: '**Diapason :** certains banjos ont un manche plus court. Les cases sont plus rapprochées et les petites mains s’étirent moins.',
          },
          {
            de: '**Saitenlage:** Die Saiten sollten nah am Griffbrett liegen. Sonst muss man sehr fest drücken, und das macht keinen Spaß. Ein Fachgeschäft oder eine Lehrkraft kann das einstellen.',
            en: '**Action:** the strings should sit close to the fingerboard. Otherwise you have to press very hard, which is no fun. A music shop or teacher can adjust it.',
            fr: '**Hauteur des cordes :** les cordes doivent être proches de la touche. Sinon il faut appuyer très fort, et ça décourage vite. Un magasin de musique ou un professeur peut régler cela.',
          },
          {
            de: '**Stimmmechaniken:** Sie sollten sich leicht drehen lassen und die Stimmung halten.',
            en: '**Tuners:** they should turn smoothly and hold the tuning.',
            fr: '**Mécaniques :** elles doivent tourner facilement et bien tenir l’accord.',
          },
        ],
      },
      {
        tip: {
          de: 'Kleine Kinder, die einfach Lieder begleiten wollen, kommen mit einer Banjo-Ukulele oft schneller zum Ziel. Wer den typischen Banjo-Sound mit Rolls lernen möchte, greift zum Fünfsaiter.',
          en: 'Younger kids who just want to accompany songs often get going faster on a banjo ukulele. Anyone who wants the classic banjo sound with rolls should choose a five-string.',
          fr: 'Les plus jeunes qui veulent surtout accompagner des chansons progressent souvent plus vite avec un banjolélé. Pour le vrai son banjo avec des rolls, choisis un cinq cordes.',
        },
      },
      {
        p: {
          de: 'Wenn du dein Banjo hast, geht es weiter mit [Banjo halten](wissen:banjo-halten) und [Banjo stimmen](wissen:banjo-stimmen).',
          en: 'Once you have your banjo, carry on with [holding the banjo](wissen:banjo-halten) and [tuning the banjo](wissen:banjo-stimmen).',
          fr: 'Une fois ton banjo trouvé, passe à [tenir le banjo](wissen:banjo-halten) puis à [accorder le banjo](wissen:banjo-stimmen).',
        },
      },
    ],
    related: ['banjo-halten', 'banjo-saiten', 'banjo-stimmen', 'ueben-mit-kindern'],
  },
  {
    id: 'banjo-halten',
    slug: { de: 'banjo-halten-fingerpicks', en: 'hold-banjo-fingerpicks', fr: 'tenir-banjo-onglets' },
    instruments: ['banjo'],
    category: 'erste-schritte',
    title: {
      de: 'Banjo halten und Fingerpicks anlegen – so geht’s',
      en: 'How to Hold a Banjo and Wear Fingerpicks',
      fr: 'Tenir son banjo et mettre les onglets',
    },
    description: {
      de: 'Banjo richtig halten: Sitzhaltung, Gurt, Hand am Hals und wie Daumen- und Fingerpicks sitzen. Einfache Schritte für Kinder und Anfänger.',
      en: 'How to hold a banjo: sitting position, strap, fretting hand and how thumb and finger picks should sit. Simple steps for kids and beginners.',
      fr: 'Bien tenir son banjo : position assise, sangle, main gauche et mise en place des onglets de pouce et de doigts. Étapes simples pour débutants.',
    },
    blocks: [
      {
        p: {
          de: 'Eine gute Haltung macht das Spielen viel leichter. Das Banjo soll ruhig liegen, damit beide Hände frei arbeiten können. Nimm dir am Anfang ruhig ein paar Minuten nur für die Haltung – das zahlt sich aus.',
          en: 'A good posture makes playing much easier. The banjo should sit still so both hands can move freely. Take a few minutes at the start just for posture – it pays off.',
          fr: 'Une bonne position rend le jeu bien plus facile. Le banjo doit rester stable pour que tes deux mains soient libres. Prends quelques minutes au début rien que pour la posture : ça vaut le coup.',
        },
      },
      { h2: { de: 'Im Sitzen', en: 'Sitting down', fr: 'En position assise' } },
      {
        ol: [
          {
            de: 'Setz dich auf einen Stuhl ohne Armlehnen, die Füße flach auf dem Boden.',
            en: 'Sit on a chair without armrests, feet flat on the floor.',
            fr: 'Assieds-toi sur une chaise sans accoudoirs, les pieds bien à plat.',
          },
          {
            de: 'Leg das Banjo mit dem runden Körper auf deinen rechten Oberschenkel (Linkshänder: links).',
            en: 'Rest the round body on your right thigh (left-handers: left).',
            fr: 'Pose le corps rond du banjo sur ta cuisse droite (gauchers : gauche).',
          },
          {
            de: 'Der Hals zeigt schräg nach oben, etwa so, dass der Kopf des Banjos auf Schulterhöhe ist.',
            en: 'The neck points up at an angle, roughly so the headstock is at shoulder height.',
            fr: 'Le manche monte en biais, la tête à peu près à hauteur d’épaule.',
          },
          {
            de: 'Ein **Gurt** hilft auch im Sitzen: Er trägt das Gewicht, und die linke Hand muss den Hals nicht festhalten.',
            en: 'A **strap** helps even when sitting: it carries the weight, so your fretting hand doesn’t have to hold the neck up.',
            fr: 'Une **sangle** aide même assis : elle porte le poids, et ta main gauche n’a pas à soutenir le manche.',
          },
        ],
      },
      { h2: { de: 'Die Greifhand', en: 'The fretting hand', fr: 'La main gauche' } },
      {
        p: {
          de: 'Der Daumen liegt locker hinten am Hals, ungefähr hinter dem Mittelfinger. Die Finger drücken mit den Fingerkuppen kurz hinter dem Bundstäbchen auf die Saite. Das Handgelenk bleibt entspannt und nicht stark abgeknickt.',
          en: 'Your thumb rests lightly on the back of the neck, roughly behind your middle finger. Press the strings with your fingertips just behind the fret wire. Keep your wrist relaxed and not sharply bent.',
          fr: 'Ton pouce repose légèrement derrière le manche, à peu près derrière le majeur. Appuie sur les cordes du bout des doigts, juste derrière la frette. Garde le poignet détendu, sans le plier fortement.',
        },
      },
      { h2: { de: 'Die Anschlaghand und die Picks', en: 'The picking hand and the picks', fr: 'La main droite et les onglets' } },
      {
        p: {
          de: 'Beim Bluegrass-Banjo spielt man mit drei Fingern: **Daumen (T), Zeigefinger (I) und Mittelfinger (M)**. Dafür trägt man meist Picks: einen **Daumenpick** aus Kunststoff und zwei **Fingerpicks** aus Metall für Zeige- und Mittelfinger. Sie machen den Ton laut und klar.',
          en: 'In bluegrass style you play with three fingers: **thumb (T), index (I) and middle (M)**. Most players wear picks: a plastic **thumb pick** and two metal **finger picks** for index and middle finger. They make the sound loud and crisp.',
          fr: 'En bluegrass, on joue avec trois doigts : **pouce (T), index (I) et majeur (M)**. On porte en général des onglets : un **onglet de pouce** en plastique et deux **onglets de doigts** en métal pour l’index et le majeur. Ils donnent un son fort et net.',
        },
      },
      {
        ul: [
          {
            de: 'Der Daumenpick zeigt mit seiner Spitze nach unten zu den Saiten, quer zum Daumen.',
            en: 'The thumb pick’s blade points down toward the strings, across the thumb.',
            fr: 'La lame de l’onglet de pouce pointe vers les cordes, en travers du pouce.',
          },
          {
            de: 'Die Fingerpicks sitzen auf der Seite der Fingerkuppe, nicht auf dem Fingernagel. Die Metallzunge ragt ein kleines Stück über die Kuppe hinaus.',
            en: 'The finger picks sit on the pad side of the fingertip, not over the nail. The metal blade sticks out just a little past the tip.',
            fr: 'Les onglets de doigts se placent côté pulpe, pas sur l’ongle. La lame dépasse juste un peu du bout du doigt.',
          },
          {
            de: 'Fest genug, dass nichts rutscht – aber nicht so eng, dass es drückt oder kribbelt.',
            en: 'Snug enough that nothing slips, but not so tight that it pinches or tingles.',
            fr: 'Assez serrés pour ne pas glisser, mais pas au point de serrer ou de picoter.',
          },
          {
            de: 'Viele Bluegrass-Spieler stützen Ringfinger und kleinen Finger leicht auf dem Fell ab, nahe am Steg. Das gibt der Hand Halt.',
            en: 'Many bluegrass players rest their ring and little fingers lightly on the head, near the bridge. It anchors the hand.',
            fr: 'Beaucoup de joueurs de bluegrass posent légèrement l’annulaire et l’auriculaire sur la peau, près du chevalet. Cela stabilise la main.',
          },
        ],
      },
      {
        tip: {
          de: 'Picks fühlen sich am Anfang komisch an. Du kannst die ersten Wochen auch ganz ohne Picks spielen und sie später dazunehmen. Beim Clawhammer-Stil braucht man gar keine.',
          en: 'Picks feel odd at first. You can play without them for the first few weeks and add them later. Clawhammer style doesn’t use picks at all.',
          fr: 'Les onglets semblent bizarres au début. Tu peux jouer sans pendant les premières semaines et les ajouter plus tard. En clawhammer, on n’en utilise pas du tout.',
        },
      },
      {
        p: {
          de: 'Als Nächstes lernst du die [Saiten des Banjos](wissen:banjo-saiten) kennen und probierst die ersten [Rolls](wissen:banjo-rolls).',
          en: 'Next, get to know the [banjo’s strings](wissen:banjo-saiten) and try your first [rolls](wissen:banjo-rolls).',
          fr: 'Ensuite, découvre les [cordes du banjo](wissen:banjo-saiten) et essaie tes premiers [rolls](wissen:banjo-rolls).',
        },
      },
    ],
    related: ['banjo-kinder', 'banjo-saiten', 'banjo-rolls', 'fingerkuppen-hornhaut'],
  },
  {
    id: 'banjo-saiten',
    slug: { de: 'banjo-saiten-namen', en: 'banjo-string-names', fr: 'noms-cordes-banjo' },
    instruments: ['banjo'],
    category: 'erste-schritte',
    title: {
      de: 'Banjo-Saiten: Namen und Nummern der fünf Saiten',
      en: 'Banjo String Names and Numbers Made Easy',
      fr: 'Les cordes du banjo : noms et numéros',
    },
    description: {
      de: 'Wie heißen die Banjo-Saiten? Nummern 1 bis 5, die Töne g D G B D und warum die fünfte Saite so kurz ist – mit Merksatz für Kinder.',
      en: 'What are the banjo string names? Numbers 1 to 5, the notes g D G B D and why the fifth string is so short – with an easy memory trick.',
      fr: 'Comment s’appellent les cordes du banjo ? Numéros 1 à 5, les notes g D G B D et pourquoi la 5e corde est si courte, avec une astuce.',
    },
    blocks: [
      {
        p: {
          de: 'Das Banjo hat fünf Saiten, aber eine davon ist etwas Besonderes. Wenn du weißt, wie sie heißen und wo sie liegen, verstehst du Griffbilder und [Tabulatur](wissen:tabulatur-lesen) viel schneller.',
          en: 'The banjo has five strings, and one of them is a bit special. Once you know their names and positions, chord diagrams and [tab](wissen:tabulatur-lesen) make sense much faster.',
          fr: 'Le banjo a cinq cordes, dont une un peu spéciale. Quand tu connais leurs noms et leur place, les diagrammes d’accords et la [tablature](wissen:tabulatur-lesen) deviennent bien plus clairs.',
        },
      },
      { h2: { de: 'Die Nummern', en: 'The numbers', fr: 'Les numéros' } },
      {
        p: {
          de: 'Die Saiten werden von der **dünnsten** zur dicksten gezählt – also von unten nach oben, wenn du das Banjo hältst. Die Saite, die dem Boden am nächsten ist, ist die **1. Saite**. Dann kommen die 2., 3. und 4. Saite. Die **5. Saite** liegt ganz oben, neben der 4. – und sie ist kurz.',
          en: 'The strings are counted from the **thinnest** to the thickest – from bottom to top as you hold the banjo. The string closest to the floor is **string 1**. Then come strings 2, 3 and 4. **String 5** sits right at the top, next to string 4 – and it’s short.',
          fr: 'On compte les cordes de la **plus fine** à la plus grosse, donc de bas en haut quand tu tiens le banjo. La corde la plus proche du sol est la **1re corde**. Viennent ensuite la 2e, la 3e et la 4e. La **5e corde** est tout en haut, à côté de la 4e – et elle est courte.',
        },
      },
      { h2: { de: 'Die Töne in Open G', en: 'The notes in open G', fr: 'Les notes en open G' } },
      {
        ul: [
          {
            de: '**5. Saite: g** – hoch, kurz, beginnt erst am 5. Bund',
            en: '**String 5: g** – high, short, starts at the 5th fret',
            fr: '**5e corde : g (Sol aigu)** – courte, elle commence à la 5e case',
          },
          { de: '**4. Saite: D** – die tiefste Saite', en: '**String 4: D** – the lowest string', fr: '**4e corde : D (Ré)** – la plus grave' },
          { de: '**3. Saite: G**', en: '**String 3: G**', fr: '**3e corde : G (Sol)**' },
          { de: '**2. Saite: B** (im Deutschen auch H genannt)', en: '**String 2: B**', fr: '**2e corde : B (Si)**' },
          { de: '**1. Saite: D** – eine Oktave höher als die 4.', en: '**String 1: D** – an octave above string 4', fr: '**1re corde : D (Ré)** – une octave au-dessus de la 4e' },
        ],
      },
      {
        tip: {
          de: 'Merksatz von der 5. bis zur 1. Saite (g D G B D): **„Gib Dem Gorilla Bitte Datteln!“**',
          en: 'Memory trick from string 5 to string 1 (g D G B D): **“Giraffes Don’t Get Bored Dancing!”**',
          fr: 'Pour retenir de la 5e à la 1re corde (Sol Ré Sol Si Ré) : **« Sol, Ré, Sol, Si, Ré – le banjo est prêt ! »**',
        },
      },
      { h2: { de: 'Saiten im Griffbild finden', en: 'Finding the strings in a chord diagram', fr: 'Retrouver les cordes sur un diagramme' } },
      {
        p: {
          de: 'Ein Griffbild zeigt den Hals so, als ob das Banjo vor dir an der Wand hängt: Der Sattel ist oben, die senkrechten Linien sind die Saiten. Die dicke 4. Saite ist links, die 1. Saite rechts. Die kurze 5. Saite wird oft gar nicht eingezeichnet, weil sie meistens leer mitklingt. Wenn du beim Üben unsicher bist, zupf jede Saite einzeln an und sag ihre Nummer laut – nach ein paar Tagen weißt du sie auswendig.',
          en: 'A chord diagram shows the neck as if the banjo were hanging on the wall in front of you: the nut is at the top and the vertical lines are the strings. The thick string 4 is on the left, string 1 on the right. The short fifth string is often left out because it usually just rings open. If you’re unsure while practising, pluck each string on its own and say its number out loud – after a few days you’ll know them by heart.',
          fr: 'Un diagramme d’accord montre le manche comme si le banjo était accroché au mur devant toi : le sillet est en haut, les lignes verticales sont les cordes. La grosse 4e corde est à gauche, la 1re à droite. La 5e corde courte n’est souvent pas dessinée, car elle sonne presque toujours à vide. Si tu hésites, pince chaque corde une par une en disant son numéro à voix haute : en quelques jours, tu les connaîtras par cœur.',
        },
      },
      { h2: { de: 'Warum ist die 5. Saite so kurz?', en: 'Why is the fifth string so short?', fr: 'Pourquoi la 5e corde est-elle si courte ?' } },
      {
        p: {
          de: 'Die 5. Saite hat ihren eigenen Wirbel seitlich am Hals und beginnt erst am 5. Bund. Man spielt sie fast immer leer, also ohne zu greifen. Sie klingt wie ein heller, gleichbleibender Ton zwischen den anderen – eine **Bordunsaite**. Dieser Ton gibt dem Banjo seinen typischen, glitzernden Klang. Meist schlägt sie der Daumen an.',
          en: 'String 5 has its own tuning peg on the side of the neck and only starts at the 5th fret. You almost always play it open, without fretting. It rings as a bright, steady note between the others – a **drone string**. That drone is a big part of the banjo’s sparkling sound. Usually the thumb plays it.',
          fr: 'La 5e corde a sa propre mécanique sur le côté du manche et ne commence qu’à la 5e case. On la joue presque toujours à vide, sans appuyer. Elle sonne comme une note aiguë et constante entre les autres : c’est une **corde de bourdon**. Ce bourdon donne au banjo son son pétillant. En général, c’est le pouce qui la joue.',
        },
      },
      {
        p: {
          de: 'Wenn du alle fünf Saiten leer anschlägst, hörst du einen G-Dur-Akkord. Deshalb heißt diese Stimmung **Open G** – „offenes G“. Wie du sie einstellst, steht unter [Banjo stimmen](wissen:banjo-stimmen).',
          en: 'Strum all five strings open and you hear a G major chord. That’s why this tuning is called **open G**. How to set it up is explained in [tuning the banjo](wissen:banjo-stimmen).',
          fr: 'Si tu joues les cinq cordes à vide, tu entends un accord de Sol majeur. D’où le nom **open G** (« Sol ouvert »). Pour le régler, lis [accorder le banjo](wissen:banjo-stimmen).',
        },
      },
      { chord: 'G' },
    ],
    related: ['banjo-stimmen', 'banjo-halten', 'toene-und-notennamen', 'tabulatur-lesen'],
  },
  {
    id: 'banjo-stimmen',
    slug: { de: 'banjo-stimmen-open-g', en: 'tune-banjo-open-g', fr: 'accorder-banjo-open-g' },
    instruments: ['banjo'],
    category: 'erste-schritte',
    title: {
      de: 'Banjo stimmen in Open G – Schritt für Schritt',
      en: 'How to Tune a Banjo to Open G – Step by Step',
      fr: 'Accorder un banjo en open G, étape par étape',
    },
    description: {
      de: 'Banjo stimmen in Open G (g D G B D): mit Stimmgerät oder nach Gehör, Saite für Saite. Plus: Warum du den losen Steg prüfen solltest.',
      en: 'Tune your banjo to open G (g D G B D) with a tuner or by ear, string by string. Plus: why you should check the floating bridge position.',
      fr: 'Accorder son banjo en open G (g D G B D) avec un accordeur ou à l’oreille, corde par corde. Et pourquoi vérifier la place du chevalet.',
    },
    blocks: [
      {
        p: {
          de: 'Ein gestimmtes Banjo klingt sofort schöner – und Akkorde hören sich so an, wie sie sollen. Banjo-Saiten verstimmen sich leicht, deshalb stimmst du am besten **vor jedem Üben**. Mit etwas Übung dauert das nur eine Minute.',
          en: 'A banjo in tune sounds better straight away, and chords sound the way they should. Banjo strings drift easily, so tune **every time you practise**. With a little experience it takes about a minute.',
          fr: 'Un banjo bien accordé sonne tout de suite mieux, et les accords sonnent comme prévu. Les cordes se désaccordent facilement : accorde ton banjo **à chaque fois que tu joues**. Avec l’habitude, ça prend une minute.',
        },
      },
      { h2: { de: 'Die Zieltöne', en: 'The target notes', fr: 'Les notes à obtenir' } },
      {
        ul: [
          { de: '5. Saite: **g** (G4, hoch)', en: 'String 5: **g** (G4, high)', fr: '5e corde : **g** (Sol aigu, G4)' },
          { de: '4. Saite: **D** (D3)', en: 'String 4: **D** (D3)', fr: '4e corde : **D** (Ré, D3)' },
          { de: '3. Saite: **G** (G3)', en: 'String 3: **G** (G3)', fr: '3e corde : **G** (Sol, G3)' },
          { de: '2. Saite: **B** (B3, im Deutschen auch H)', en: 'String 2: **B** (B3)', fr: '2e corde : **B** (Si, B3)' },
          { de: '1. Saite: **D** (D4)', en: 'String 1: **D** (D4)', fr: '1re corde : **D** (Ré, D4)' },
        ],
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
          de: 'Wenn eine Saite stimmt (zum Beispiel die 4. Saite D), kannst du die anderen danach stimmen. Greif dazu den angegebenen Bund und vergleiche mit der leeren Nachbarsaite – beide Töne sollen gleich klingen:',
          en: 'Once one string is in tune (say string 4, D), you can tune the rest to it. Fret the given position and compare it with the next open string – both should sound the same:',
          fr: 'Quand une corde est juste (par exemple la 4e, Ré), tu peux accorder les autres à partir d’elle. Appuie à la case indiquée et compare avec la corde voisine à vide : les deux doivent sonner pareil.',
        },
      },
      {
        ul: [
          {
            de: '4. Saite im **5. Bund** = 3. Saite leer (G)',
            en: 'String 4 at the **5th fret** = string 3 open (G)',
            fr: '4e corde à la **5e case** = 3e corde à vide (Sol)',
          },
          {
            de: '3. Saite im **4. Bund** = 2. Saite leer (B)',
            en: 'String 3 at the **4th fret** = string 2 open (B)',
            fr: '3e corde à la **4e case** = 2e corde à vide (Si)',
          },
          {
            de: '2. Saite im **3. Bund** = 1. Saite leer (D)',
            en: 'String 2 at the **3rd fret** = string 1 open (D)',
            fr: '2e corde à la **3e case** = 1re corde à vide (Ré)',
          },
          {
            de: '1. Saite im **5. Bund** = 5. Saite leer (g)',
            en: 'String 1 at the **5th fret** = string 5 open (g)',
            fr: '1re corde à la **5e case** = 5e corde à vide (Sol aigu)',
          },
        ],
      },
      {
        p: {
          de: 'Zum Schluss schlägst du alle Saiten leer an: Es sollte ein voller, ruhiger G-Dur-Akkord klingen.',
          en: 'Finally, strum all strings open: you should hear a full, calm G major chord.',
          fr: 'Pour finir, joue toutes les cordes à vide : tu dois entendre un accord de Sol majeur plein et stable.',
        },
      },
      { h2: { de: 'Der lose Steg', en: 'The floating bridge', fr: 'Le chevalet mobile' } },
      {
        p: {
          de: 'Beim Banjo ist der Steg nicht festgeklebt, sondern wird nur vom Saitendruck gehalten. Verrutscht er, klingen die Töne weiter oben am Hals schief, obwohl die leeren Saiten stimmen. Prüfe das so: Der Ton im **12. Bund** soll genau eine Oktave über der leeren Saite liegen. Ist er zu hoch, schiebst du den Steg ein kleines Stück Richtung Saitenhalter; ist er zu tief, ein Stück Richtung Hals. Bitte am besten einen Erwachsenen oder deine Lehrkraft um Hilfe.',
          en: 'On a banjo the bridge isn’t glued down – string tension holds it in place. If it slides, notes higher up the neck sound off even though the open strings are in tune. Check it like this: the note at the **12th fret** should be exactly one octave above the open string. If it’s sharp, nudge the bridge slightly toward the tailpiece; if it’s flat, slightly toward the neck. Ask an adult or your teacher to help.',
          fr: 'Sur un banjo, le chevalet n’est pas collé : c’est la tension des cordes qui le tient. S’il glisse, les notes plus haut sur le manche sonnent faux même si les cordes à vide sont justes. Vérifie ainsi : la note à la **12e case** doit être exactement une octave au-dessus de la corde à vide. Trop aiguë ? Recule un peu le chevalet vers le cordier. Trop grave ? Avance-le un peu vers le manche. Demande de l’aide à un adulte ou à ton professeur.',
        },
      },
      {
        tip: {
          de: 'Stimm immer von unten an den Ton heran: lieber erst etwas zu tief und dann hochdrehen. So hält die Stimmung besser.',
          en: 'Always tune up to the note: start a little low and turn up. The tuning holds better that way.',
          fr: 'Accorde toujours en montant vers la note : pars un peu en dessous puis remonte. L’accord tient mieux.',
        },
      },
    ],
    related: ['banjo-saiten', 'banjo-erste-akkorde', 'saiten-wechseln-pflege', 'banjo-kapodaster'],
  },
  {
    id: 'banjo-erste-akkorde',
    slug: { de: 'banjo-erste-akkorde', en: 'first-banjo-chords', fr: 'premiers-accords-banjo' },
    instruments: ['banjo'],
    category: 'erste-schritte',
    title: {
      de: 'Die ersten Banjo-Akkorde: G, C und D7',
      en: 'Your First Banjo Chords: G, C and D7',
      fr: 'Les premiers accords de banjo : G, C et D7',
    },
    description: {
      de: 'Banjo lernen für Anfänger: die ersten drei Akkorde G, C und D7 mit Griffbildern, der erste Akkordwechsel und Lieder zum Mitspielen.',
      en: 'Learn banjo as a beginner: your first three chords G, C and D7 with diagrams, your first chord change and simple songs to play along with.',
      fr: 'Apprendre le banjo : les trois premiers accords G, C et D7 avec diagrammes, le premier changement d’accord et des chansons pour jouer.',
    },
    blocks: [
      {
        p: {
          de: 'Mit nur drei Akkorden kannst du auf dem Banjo schon viele Lieder begleiten. Das Schöne: Den ersten Akkord musst du gar nicht greifen.',
          en: 'With just three chords you can already accompany lots of songs on the banjo. The best part: you don’t even have to fret the first one.',
          fr: 'Avec seulement trois accords, tu peux déjà accompagner plein de chansons au banjo. Et le premier, tu n’as même pas besoin de le former.',
        },
      },
      { h2: { de: '1. G-Dur – ganz ohne Finger', en: '1. G major – no fingers needed', fr: '1. Sol majeur – sans aucun doigt' } },
      {
        p: {
          de: 'Weil das Banjo in Open G gestimmt ist, klingt **G** schon, wenn du alle Saiten leer anschlägst. Probier es aus: einmal mit dem Daumen über alle Saiten streichen.',
          en: 'Because the banjo is tuned to open G, **G** rings out as soon as you play all strings open. Try it: brush your thumb across all the strings.',
          fr: 'Comme le banjo est accordé en open G, l’accord de **G** sonne dès que tu joues toutes les cordes à vide. Essaie : passe le pouce sur toutes les cordes.',
        },
      },
      { chord: 'G' },
      { h2: { de: '2. C-Dur', en: '2. C major', fr: '2. Do majeur (C)' } },
      {
        p: {
          de: 'Für **C** brauchst du drei Finger. Von der 4. zur 1. Saite gezählt: 4. Saite **2. Bund**, 3. Saite leer, 2. Saite **1. Bund**, 1. Saite **2. Bund**. Die 5. Saite klingt einfach leer mit.',
          en: 'For **C** you need three fingers. From string 4 to string 1: string 4 at the **2nd fret**, string 3 open, string 2 at the **1st fret**, string 1 at the **2nd fret**. String 5 just rings open.',
          fr: 'Pour **C**, il faut trois doigts. De la 4e à la 1re corde : 4e corde **case 2**, 3e corde à vide, 2e corde **case 1**, 1re corde **case 2**. La 5e corde sonne à vide.',
        },
      },
      { chord: 'C' },
      { h2: { de: '3. D7', en: '3. D7', fr: '3. D7 (Ré septième)' } },
      {
        p: {
          de: '**D7** führt fast immer zurück zu G – das klingt wie „nach Hause kommen“. Das Griffbild zeigt dir, wo die Finger hingehören. Sobald D7 sitzt, kannst du auch **D** lernen: 4. Saite leer, 3. Saite 2. Bund, 2. Saite 3. Bund, 1. Saite 4. Bund.',
          en: '**D7** almost always leads back to G – it sounds like “coming home”. The diagram shows where your fingers go. Once D7 feels good, you can learn **D** as well: string 4 open, string 3 at fret 2, string 2 at fret 3, string 1 at fret 4.',
          fr: '**D7** ramène presque toujours vers G : on a l’impression de « rentrer à la maison ». Le diagramme te montre où placer les doigts. Quand D7 est bien en place, apprends aussi **D** : 4e corde à vide, 3e corde case 2, 2e corde case 3, 1re corde case 4.',
        },
      },
      { chord: 'D7' },
      { chord: 'D' },
      { h2: { de: 'Der erste Akkordwechsel: G → C', en: 'Your first chord change: G → C', fr: 'Le premier changement : G → C' } },
      {
        ol: [
          {
            de: 'Spiel G (leer) und zähl langsam bis vier.',
            en: 'Play G (open) and count slowly to four.',
            fr: 'Joue G (à vide) et compte lentement jusqu’à quatre.',
          },
          {
            de: 'Setz während „vier“ schon die Finger für C auf.',
            en: 'On “four”, already start placing your fingers for C.',
            fr: 'Sur « quatre », commence déjà à poser les doigts pour C.',
          },
          {
            de: 'Spiel C und zähl wieder bis vier. Dann Finger hoch – zurück zu G.',
            en: 'Play C and count to four again. Then lift your fingers – back to G.',
            fr: 'Joue C et compte de nouveau jusqu’à quatre. Puis lève les doigts : retour à G.',
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
          de: 'Mit G und D7 (oder C und G7 in anderen Tonarten) klappen viele Lieder, zum Beispiel [Oh My Darling, Clementine](lied:clementine) oder [Skip to My Lou](lied:skip-to-my-lou). Mit drei Akkorden geht [Michael, Row the Boat Ashore](lied:michael-row). Wenn ein Lied in einer anderen Tonart steht, hilft [Transponieren](wissen:transponieren).',
          en: 'Many songs work with just two chords, for example [Oh My Darling, Clementine](lied:clementine) or [Skip to My Lou](lied:skip-to-my-lou). With three chords you can play [Michael, Row the Boat Ashore](lied:michael-row). If a song is in a different key, [transposing](wissen:transponieren) helps.',
          fr: 'Beaucoup de chansons se jouent avec deux accords, par exemple [Oh My Darling, Clementine](lied:clementine) ou [Skip to My Lou](lied:skip-to-my-lou). Avec trois accords, tu peux jouer [Michael, Row the Boat Ashore](lied:michael-row). Si une chanson est dans une autre tonalité, [transposer](wissen:transponieren) t’aidera.',
        },
      },
      { tool: 'lieder' },
    ],
    related: ['banjo-akkorde', 'akkordwechsel-schneller', 'lieder-fuer-anfaenger', 'banjo-rolls'],
  },
  {
    id: 'banjo-akkorde',
    slug: { de: 'wichtigste-banjo-akkorde', en: 'banjo-chords', fr: 'accords-banjo' },
    instruments: ['banjo'],
    category: 'akkorde',
    title: {
      de: 'Banjo Akkorde: die wichtigsten Griffe in Open G',
      en: 'Banjo Chords: The Most Important Shapes in Open G',
      fr: 'Accords de banjo : les plus importants en open G',
    },
    description: {
      de: 'Die wichtigsten Banjo Akkorde in Open-G-Stimmung mit Griffbildern: G, C, D, D7, Em, Am, G7 und F – und in welcher Reihenfolge du sie lernst.',
      en: 'The most important banjo chords in open G tuning with diagrams: G, C, D, D7, Em, Am, G7 and F – plus a sensible order to learn them in.',
      fr: 'Les accords de banjo essentiels en open G avec diagrammes : G, C, D, D7, Em, Am, G7 et F, et dans quel ordre les apprendre.',
    },
    blocks: [
      {
        p: {
          de: 'Diese acht Akkorde reichen für sehr viele Volkslieder, Bluegrass-Stücke und Kinderlieder. Lerne sie nicht alle auf einmal – nimm dir lieber einen neuen pro Woche vor und übe ihn mit Akkorden, die du schon kannst.',
          en: 'These eight chords cover a huge number of folk songs, bluegrass tunes and children’s songs. Don’t learn them all at once – add one new chord a week and practise it together with the ones you already know.',
          fr: 'Ces huit accords suffisent pour énormément de chansons traditionnelles, de morceaux de bluegrass et de comptines. Ne les apprends pas tous d’un coup : ajoute un accord par semaine et travaille-le avec ceux que tu connais déjà.',
        },
      },
      { h2: { de: 'Die Grundakkorde in G-Dur', en: 'The core chords in G major', fr: 'Les accords de base en Sol majeur' } },
      {
        p: {
          de: 'In der Tonart G-Dur sind **G**, **C** und **D** (oder D7) die drei Hauptakkorde. Mit ihnen begleitest du die meisten einfachen Lieder.',
          en: 'In the key of G major, **G**, **C** and **D** (or D7) are the three main chords. They’ll get you through most simple songs.',
          fr: 'En Sol majeur, **G**, **C** et **D** (ou D7) sont les trois accords principaux. Ils suffisent pour la plupart des chansons simples.',
        },
      },
      { chord: 'G' },
      { chord: 'C' },
      { chord: 'D' },
      { chord: 'D7' },
      { h2: { de: 'Moll-Akkorde: Em und Am', en: 'Minor chords: Em and Am', fr: 'Accords mineurs : Em et Am' } },
      {
        p: {
          de: 'Moll klingt weicher und oft etwas nachdenklich (mehr dazu bei [Dur und Moll](wissen:dur-und-moll)). **Em** ist auf dem Banjo leicht: 4. Saite 2. Bund, 1. Saite 2. Bund, die mittleren Saiten bleiben leer. **Am** braucht vier Finger und ist etwas für später.',
          en: 'Minor chords sound softer and often a bit thoughtful (more in [major and minor](wissen:dur-und-moll)). **Em** is easy on the banjo: string 4 at fret 2, string 1 at fret 2, the middle strings stay open. **Am** takes four fingers – one for a little later.',
          fr: 'Les accords mineurs sonnent plus doux, souvent un peu mélancoliques (voir [majeur et mineur](wissen:dur-und-moll)). **Em** est facile au banjo : 4e corde case 2, 1re corde case 2, les cordes du milieu à vide. **Am** demande quatre doigts : garde-le pour un peu plus tard.',
        },
      },
      { chord: 'Em' },
      { chord: 'Am' },
      { h2: { de: 'G7 und F', en: 'G7 and F', fr: 'G7 et F' } },
      {
        p: {
          de: '**G7** ist einfach: nur ein Finger auf der 1. Saite im 3. Bund. Er führt gern zu C. **F** braucht vier Finger und Kraft – nimm dir dafür Zeit und sei geduldig mit dir.',
          en: '**G7** is easy: just one finger on string 1 at the 3rd fret. It likes to lead to C. **F** needs four fingers and some strength – take your time and be patient with yourself.',
          fr: '**G7** est simple : un seul doigt sur la 1re corde, case 3. Il mène volontiers vers C. **F** demande quatre doigts et un peu de force : prends ton temps et sois patient avec toi-même.',
        },
      },
      { chord: 'G7' },
      { chord: 'F' },
      { h2: { de: 'So übst du einen neuen Akkord', en: 'How to practise a new chord', fr: 'Comment travailler un nouvel accord' } },
      {
        ol: [
          {
            de: 'Setz die Finger langsam auf, einen nach dem anderen, und schau dir das Griffbild dabei genau an.',
            en: 'Place your fingers slowly, one at a time, while looking closely at the diagram.',
            fr: 'Pose tes doigts lentement, un par un, en regardant bien le diagramme.',
          },
          {
            de: 'Zupf jede Saite einzeln an. Klingt jede klar? Dann passt der Griff.',
            en: 'Pluck each string on its own. Does every one ring clearly? Then the shape is right.',
            fr: 'Pince chaque corde séparément. Est-ce que chacune sonne clairement ? Alors la position est bonne.',
          },
          {
            de: 'Nimm die Hand weg, lockere sie kurz und setz den Griff noch einmal auf. Zehnmal hintereinander ist eine gute Übung.',
            en: 'Lift your hand off, shake it loose and place the shape again. Ten times in a row is a good exercise.',
            fr: 'Retire ta main, détends-la et reforme l’accord. Dix fois de suite, c’est un bon exercice.',
          },
          {
            de: 'Wechsle dann zwischen dem neuen Akkord und einem, den du schon kannst – zum Beispiel G und Em.',
            en: 'Then switch between the new chord and one you already know – for example G and Em.',
            fr: 'Ensuite, alterne entre le nouvel accord et un accord que tu connais déjà, par exemple G et Em.',
          },
        ],
      },
      { h2: { de: 'Eine gute Reihenfolge', en: 'A good learning order', fr: 'Un bon ordre d’apprentissage' } },
      {
        ol: [
          { de: 'G, C, D7', en: 'G, C, D7', fr: 'G, C, D7' },
          { de: 'Em und G7', en: 'Em and G7', fr: 'Em et G7' },
          { de: 'D', en: 'D', fr: 'D' },
          { de: 'Am und F', en: 'Am and F', fr: 'Am et F' },
        ],
      },
      {
        tip: {
          de: 'Klingt eine Saite dumpf oder schnarrt? Dann schau bei [Saite schnarrt oder klingt dumpf](wissen:saubere-griffe) vorbei. Mit dem [Akkord-Detektiv](tool:detektiv) kannst du prüfen, welchen Akkord du gerade spielst.',
          en: 'Does a string sound muted or buzz? Have a look at [buzzing or muted strings](wissen:saubere-griffe). The [chord detective](tool:detektiv) tells you which chord you’re playing.',
          fr: 'Une corde sonne étouffée ou frise ? Jette un œil à [corde qui frise ou sonne étouffée](wissen:saubere-griffe). Le [détective d’accords](tool:detektiv) te dit quel accord tu joues.',
        },
      },
      { tool: 'akkorde' },
    ],
    related: ['banjo-erste-akkorde', 'akkordsymbole-lesen', 'saubere-griffe', 'banjo-kapodaster'],
  },
  {
    id: 'banjo-rolls',
    slug: { de: 'banjo-rolls-lernen', en: 'banjo-rolls', fr: 'rolls-banjo' },
    instruments: ['banjo'],
    category: 'technik',
    title: {
      de: 'Banjo-Rolls lernen: Forward Roll, Backward Roll & Co.',
      en: 'Learn Banjo Rolls: Forward, Backward and Alternating Thumb',
      fr: 'Apprendre les rolls au banjo : forward, backward et alternés',
    },
    description: {
      de: 'Banjo-Rolls für Anfänger: Alternating Thumb, Forward, Backward und Forward-Reverse Roll erklärt – langsam mit Metronom üben, erst auf leeren Saiten.',
      en: 'Banjo rolls for beginners: alternating thumb, forward, backward and forward-reverse rolls explained. Start slowly on open strings with a metronome.',
      fr: 'Les rolls de banjo pour débutants : alternating thumb, forward, backward et forward-reverse. Commence lentement à vide, avec un métronome.',
    },
    blocks: [
      {
        p: {
          de: 'Der typische, perlende Banjo-Klang entsteht durch **Rolls**: Daumen, Zeige- und Mittelfinger zupfen in einem festen Muster nacheinander verschiedene Saiten. Dabei entstehen gleichmäßige Achtelnoten – acht Töne pro 4/4-Takt. Die linke Hand kann dazu einen Akkord greifen.',
          en: 'The classic rippling banjo sound comes from **rolls**: thumb, index and middle finger pick different strings one after another in a set pattern. The result is a steady stream of eighth notes – eight notes per 4/4 bar. Your other hand can hold a chord meanwhile.',
          fr: 'Le son perlé typique du banjo vient des **rolls** : pouce, index et majeur pincent l’une après l’autre différentes cordes selon un motif fixe. On obtient un flot régulier de croches, huit notes par mesure à 4/4. Pendant ce temps, l’autre main peut tenir un accord.',
        },
      },
      {
        p: {
          de: 'Abkürzungen: **T** = Daumen (englisch thumb), **I** = Zeigefinger (index), **M** = Mittelfinger (middle).',
          en: 'Abbreviations: **T** = thumb, **I** = index finger, **M** = middle finger.',
          fr: 'Abréviations : **T** = pouce (thumb), **I** = index, **M** = majeur (middle).',
        },
      },
      { h2: { de: 'Bevor du anfängst', en: 'Before you start', fr: 'Avant de commencer' } },
      {
        ul: [
          {
            de: 'Übe zuerst auf den **leeren Saiten** – das ist ein G-Akkord, du brauchst die linke Hand also noch gar nicht.',
            en: 'Practise on **open strings** first – that’s a G chord, so you don’t need your other hand yet.',
            fr: 'Commence sur les **cordes à vide** : c’est un accord de G, tu n’as donc pas encore besoin de l’autre main.',
          },
          {
            de: 'Eine einfache Aufteilung: Der Daumen spielt die 5., 4. und 3. Saite, der Zeigefinger die 2., der Mittelfinger die 1. Saite.',
            en: 'A simple split: thumb plays strings 5, 4 and 3, index plays string 2, middle plays string 1.',
            fr: 'Une répartition simple : le pouce joue les cordes 5, 4 et 3, l’index la 2e, le majeur la 1re.',
          },
          {
            de: 'Ganz langsam beginnen. Gleichmäßig ist wichtiger als schnell.',
            en: 'Start really slowly. Even is more important than fast.',
            fr: 'Commence très lentement. La régularité compte plus que la vitesse.',
          },
        ],
      },
      { h2: { de: 'Die wichtigsten Rolls', en: 'The essential rolls', fr: 'Les rolls essentiels' } },
      {
        ul: [
          {
            de: '**Alternating Thumb Roll:** T I T M – T I T M. Der Daumen spielt jeden zweiten Ton. Ein guter Einstieg.',
            en: '**Alternating thumb roll:** T I T M – T I T M. The thumb plays every other note. A great place to start.',
            fr: '**Alternating thumb roll :** T I T M – T I T M. Le pouce joue une note sur deux. Idéal pour débuter.',
          },
          {
            de: '**Forward Roll:** T I M – T I M – T M. Die Finger „rollen“ vorwärts vom Daumen zum Mittelfinger.',
            en: '**Forward roll:** T I M – T I M – T M. The fingers roll forward from thumb to middle finger.',
            fr: '**Forward roll (roll avant) :** T I M – T I M – T M. Les doigts « roulent » du pouce vers le majeur.',
          },
          {
            de: '**Backward Roll:** M I T – M I T – M I. Dieselbe Idee rückwärts.',
            en: '**Backward roll:** M I T – M I T – M I. The same idea in reverse.',
            fr: '**Backward roll (roll arrière) :** M I T – M I T – M I. Même idée, à l’envers.',
          },
          {
            de: '**Forward-Reverse Roll:** T I M T – M I T M. Erst vorwärts, dann zurück.',
            en: '**Forward-reverse roll:** T I M T – M I T M. Forward first, then back.',
            fr: '**Forward-reverse roll :** T I M T – M I T M. D’abord en avant, puis en arrière.',
          },
        ],
      },
      { h2: { de: 'So übst du einen Roll', en: 'How to practise a roll', fr: 'Comment travailler un roll' } },
      {
        ol: [
          {
            de: 'Sag das Muster laut: „Daumen, Zeige, Daumen, Mittel“.',
            en: 'Say the pattern out loud: “thumb, index, thumb, middle”.',
            fr: 'Dis le motif à voix haute : « pouce, index, pouce, majeur ».',
          },
          {
            de: 'Stell das Metronom langsam ein und spiel zwei Töne pro Klick.',
            en: 'Set the metronome slow and play two notes per click.',
            fr: 'Règle le métronome lentement et joue deux notes par clic.',
          },
          {
            de: 'Wenn es fünfmal hintereinander gleichmäßig klappt, stell das Tempo ein kleines bisschen schneller.',
            en: 'When it sounds even five times in a row, nudge the tempo up a little.',
            fr: 'Quand c’est régulier cinq fois de suite, augmente un tout petit peu le tempo.',
          },
          {
            de: 'Später greifst du dazu Akkorde wie [C](chord:C) oder [D7](chord:D7) und wechselst nach jedem Takt.',
            en: 'Later, hold chords like [C](chord:C) or [D7](chord:D7) and change after each bar.',
            fr: 'Plus tard, tiens des accords comme [C](chord:C) ou [D7](chord:D7) et change à chaque mesure.',
          },
        ],
      },
      { tool: 'rhythmus' },
      {
        tip: {
          de: 'Lass die Hand locker und zupf eher leicht. Ein Roll klingt am schönsten, wenn alle Töne gleich laut sind. Mehr zum Metronom: [Mit Metronom üben](wissen:mit-metronom-ueben).',
          en: 'Keep your hand relaxed and pick lightly. A roll sounds best when every note is the same volume. More on metronome practice: [practise with a metronome](wissen:mit-metronom-ueben).',
          fr: 'Garde la main souple et pince légèrement. Un roll sonne mieux quand toutes les notes ont le même volume. Pour le métronome : [travailler avec un métronome](wissen:mit-metronom-ueben).',
        },
      },
    ],
    related: ['banjo-halten', 'mit-metronom-ueben', 'takt-und-taktarten', 'tabulatur-lesen'],
  },
  {
    id: 'banjo-kapodaster',
    slug: { de: 'kapodaster-banjo', en: 'banjo-capo', fr: 'capodastre-banjo' },
    instruments: ['banjo'],
    category: 'technik',
    title: {
      de: 'Kapodaster am Banjo – und was ist mit der 5. Saite?',
      en: 'Using a Capo on Banjo – and What About the 5th String?',
      fr: 'Le capodastre au banjo – et la 5e corde ?',
    },
    description: {
      de: 'Kapodaster am Banjo richtig nutzen: in andere Tonarten wechseln, ohne neue Griffe zu lernen, und die kurze 5. Saite passend höher stimmen.',
      en: 'How to use a capo on the banjo: play in new keys without learning new shapes, and how to raise the short fifth string to match.',
      fr: 'Utiliser un capodastre au banjo : jouer dans d’autres tonalités sans nouvelles positions, et remonter la 5e corde courte en conséquence.',
    },
    blocks: [
      {
        p: {
          de: 'Ein **Kapodaster** ist eine Klemme, die quer über alle Saiten an einem Bund gesetzt wird. Er wirkt wie ein verschobener Sattel: Alles klingt höher, aber du greifst die gleichen Akkorde wie vorher. Auf dem Banjo ist das besonders praktisch, weil viele Stücke in G gespielt werden – und mit Kapo kannst du dieselben Griffe in A oder D nutzen.',
          en: 'A **capo** is a clamp placed across all strings at one fret. It works like a moved nut: everything sounds higher, but you play the same chord shapes as before. That’s especially handy on banjo, since so much is played in G – with a capo you can use the same shapes in A or D.',
          fr: 'Un **capodastre** est une pince qu’on place en travers de toutes les cordes sur une case. Il agit comme un sillet déplacé : tout sonne plus aigu, mais tu gardes les mêmes positions d’accords. Au banjo, c’est très pratique, car on joue beaucoup en Sol : avec un capodastre, les mêmes positions servent en La ou en Ré.',
        },
      },
      { h2: { de: 'Wofür brauchst du ihn?', en: 'What is it for?', fr: 'À quoi sert-il ?' } },
      {
        ul: [
          {
            de: 'Ein Lied passt besser zu deiner Stimme oder zur Stimme der Klasse.',
            en: 'A song suits your voice – or your class’s voices – better.',
            fr: 'Une chanson convient mieux à ta voix ou à celle de la classe.',
          },
          {
            de: 'Andere Instrumente spielen in A, du kennst die Griffe aber nur in G.',
            en: 'Other instruments are playing in A, but you only know the shapes in G.',
            fr: 'Les autres instruments jouent en La, mais tu ne connais les positions qu’en Sol.',
          },
          {
            de: 'Du willst ein Stück so spielen, wie du es in Tabulatur gelernt hast, nur in einer anderen Tonart.',
            en: 'You want to play a tune exactly as you learned it from tab, just in another key.',
            fr: 'Tu veux jouer un morceau exactement comme dans la tablature, mais dans une autre tonalité.',
          },
        ],
      },
      { h2: { de: 'Welcher Bund ergibt welche Tonart?', en: 'Which fret gives which key?', fr: 'Quelle case pour quelle tonalité ?' } },
      {
        p: {
          de: 'Jeder Bund macht alles einen Halbton höher. Du greifst Akkorde in G:',
          en: 'Each fret raises everything by a semitone. You play shapes in G:',
          fr: 'Chaque case monte tout d’un demi-ton. Tu joues les positions de Sol :',
        },
      },
      {
        ul: [
          { de: 'Kapo im **2. Bund** → klingt in **A**', en: 'Capo at the **2nd fret** → sounds in **A**', fr: 'Capodastre en **case 2** → sonne en **La (A)**' },
          { de: 'Kapo im **3. Bund** → klingt in **Bb**', en: 'Capo at the **3rd fret** → sounds in **Bb**', fr: 'Capodastre en **case 3** → sonne en **Si bémol (Bb)**' },
          { de: 'Kapo im **4. Bund** → klingt in **B** (im Deutschen H)', en: 'Capo at the **4th fret** → sounds in **B**', fr: 'Capodastre en **case 4** → sonne en **Si (B)**' },
          { de: 'Kapo im **7. Bund** → klingt in **D**', en: 'Capo at the **7th fret** → sounds in **D**', fr: 'Capodastre en **case 7** → sonne en **Ré (D)**' },
        ],
      },
      { h2: { de: 'Die Sache mit der 5. Saite', en: 'The fifth-string question', fr: 'Le cas de la 5e corde' } },
      {
        p: {
          de: 'Die kurze 5. Saite beginnt erst am 5. Bund – der Kapodaster erreicht sie nicht. Sie muss deshalb **genauso viele Halbtöne höher** klingen wie die anderen Saiten. Mit Kapo im 2. Bund soll sie also statt g ein **a** spielen. Dafür gibt es zwei Wege:',
          en: 'The short fifth string only starts at the 5th fret, so the capo can’t reach it. It has to be raised **by the same number of semitones** as the other strings. With the capo at fret 2, it should play **a** instead of g. There are two ways to do that:',
          fr: 'La 5e corde courte commence à la 5e case : le capodastre ne l’atteint pas. Elle doit donc monter **du même nombre de demi-tons** que les autres. Avec le capodastre en case 2, elle doit jouer **La (a)** au lieu de Sol. Deux solutions :',
        },
      },
      {
        ol: [
          {
            de: '**Höher stimmen:** Dreh die 5. Saite einfach zwei Halbtöne höher. Das geht schnell, aber dreh vorsichtig, damit die Saite nicht reißt – und stimm sie danach wieder zurück.',
            en: '**Tune it up:** simply raise string 5 by two semitones. Quick and easy – just turn carefully so the string doesn’t snap, and tune it back down afterwards.',
            fr: '**L’accorder plus haut :** monte simplement la 5e corde de deux demi-tons. C’est rapide ; tourne doucement pour ne pas casser la corde, et redescends-la ensuite.',
          },
          {
            de: '**Kleine Haken am Hals:** Viele Banjos haben kleine Haken oder Nägel (oft „Railroad Spikes“ genannt) neben der 5. Saite, etwa am 7., 9. und 10. Bund. Du hakst die Saite darunter ein; sie wirkt dann wie mit Kapo gegriffen. Für Kapo im 2. Bund nimmst du den Haken am 7. Bund.',
            en: '**Small spikes on the neck:** many banjos have little hooks or spikes (often called “railroad spikes”) beside string 5, typically at frets 7, 9 and 10. You tuck the string under one, and it acts like a capo for that string. For a capo at fret 2, use the spike at fret 7.',
            fr: '**Petits crochets sur le manche :** beaucoup de banjos ont de petits crochets ou clous (souvent appelés « railroad spikes ») à côté de la 5e corde, en général aux cases 7, 9 et 10. Tu glisses la corde dessous et elle se comporte comme si elle était capodastrée. Pour un capodastre en case 2, utilise le crochet de la case 7.',
          },
        ],
      },
      {
        tip: {
          de: 'Nach dem Aufsetzen des Kapodasters immer kurz nachstimmen – er zieht die Saiten oft ein wenig höher. Mit dem [Stimmgerät](tool:stimmen) geht das schnell.',
          en: 'Always do a quick tuning check after putting the capo on – it often pulls the strings slightly sharp. The [tuner](tool:stimmen) makes it quick.',
          fr: 'Après avoir posé le capodastre, vérifie toujours l’accord : il tire souvent les cordes un peu vers l’aigu. Avec l’[accordeur](tool:stimmen), c’est rapide.',
        },
      },
      {
        p: {
          de: 'Wie Tonarten zusammenhängen und wie du ohne Kapo in eine andere Tonart wechselst, erklärt [Transponieren](wissen:transponieren).',
          en: 'How keys relate to each other, and how to change key without a capo, is explained in [transposing](wissen:transponieren).',
          fr: 'Comment les tonalités sont liées et comment changer de tonalité sans capodastre : voir [transposer](wissen:transponieren).',
        },
      },
    ],
    related: ['transponieren', 'banjo-stimmen', 'banjo-akkorde', 'banjo-saiten'],
  },
];
