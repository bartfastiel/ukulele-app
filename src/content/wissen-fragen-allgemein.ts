import type { Article } from './types.ts';

// Instrumentübergreifende Fragen von Einsteigern, Eltern und Lehrkräften (Ausbau Oktober 2026)
export const FRAGEN_ALLGEMEIN: Article[] = [
  {
    id: 'griffbild-lesen',
    slug: { de: 'griffbild-lesen-akkorddiagramm', en: 'how-to-read-chord-diagrams', fr: 'lire-un-diagramme-d-accord' },
    instruments: ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline', 'bass'],
    category: 'akkorde',
    title: {
      de: 'Griffbild lesen: Punkte, Zahlen, x, o und „3fr“ einfach erklärt',
      en: 'How to Read Chord Diagrams: Dots, Numbers, x, o and “3fr” Explained',
      fr: 'Lire un diagramme d’accord : points, chiffres, x, o et « 3fr » expliqués',
    },
    description: {
      de: 'So liest du ein Griffbild: Linien, Punkte und Fingernummern, was x und o über dem Sattel bedeuten und was eine Bundzahl wie „3fr“ neben dem Bild sagt.',
      en: 'How to read a chord diagram: lines, dots and finger numbers, what x and o above the nut mean, and what a fret number like “3fr” next to it tells you.',
      fr: 'Comment lire un diagramme d’accord : lignes, points et numéros de doigts, ce que veulent dire x et o au-dessus du sillet, et une case comme « 3fr ».',
    },
    blocks: [
      {
        p: {
          de: 'Ein **Griffbild** (auch Akkorddiagramm) zeigt dir ein Stück vom Hals deines Instruments – so, als ob es mit dem Kopf nach oben vor dir an der Wand hängt. Du schaust also von vorn auf das Griffbrett. Wenn du es einmal verstanden hast, kannst du jeden neuen Akkord selbst nachgreifen.',
          en: 'A **chord diagram** shows you part of your instrument’s neck – as if it were hanging on the wall in front of you, headstock up. So you’re looking at the fretboard from the front. Once you understand it, you can work out any new chord yourself.',
          fr: 'Un **diagramme d’accord** te montre une partie du manche de ton instrument – comme s’il était accroché au mur devant toi, la tête en haut. Tu regardes donc la touche de face. Une fois que tu l’as compris, tu peux jouer n’importe quel nouvel accord tout seul.',
        },
      },
      { h2: { de: 'Linien: Saiten und Bünde', en: 'Lines: strings and frets', fr: 'Les lignes : cordes et cases' } },
      {
        ul: [
          {
            de: 'Die **senkrechten Linien** sind die Saiten. Ganz links ist die Saite, die beim Spielen oben liegt, nah an deinem Kinn. In der App steht unter jeder Saite ihr Name.',
            en: 'The **vertical lines** are the strings. On the far left is the string that’s on top when you play, close to your chin. In the app each string’s name is written underneath.',
            fr: 'Les **lignes verticales** sont les cordes. Tout à gauche, la corde qui est en haut quand tu joues, près de ton menton. Dans l’appli, le nom de chaque corde est écrit en dessous.',
          },
          {
            de: 'Die **waagrechten Linien** sind die Bundstäbchen. Der Platz zwischen zwei Linien ist ein Bund.',
            en: 'The **horizontal lines** are the fret wires. The space between two lines is one fret.',
            fr: 'Les **lignes horizontales** sont les frettes. L’espace entre deux lignes est une case.',
          },
          {
            de: 'Die **dicke Linie oben** ist der Sattel – dort beginnt das Griffbrett.',
            en: 'The **thick line at the top** is the nut – that’s where the fretboard begins.',
            fr: 'La **ligne épaisse en haut** est le sillet – c’est là que commence la touche.',
          },
        ],
      },
      { h2: { de: 'Punkte und Zahlen: wo und womit', en: 'Dots and numbers: where and with which finger', fr: 'Points et chiffres : où et avec quel doigt' } },
      {
        p: {
          de: 'Ein **Punkt** zeigt, wo du drückst: auf dieser Saite in diesem Bund, am besten dicht hinter dem Bundstäbchen. Die **Zahl im Punkt** sagt, welcher Finger drückt:',
          en: 'A **dot** shows where to press: on that string in that fret, ideally just behind the fret wire. The **number in the dot** tells you which finger presses:',
          fr: 'Un **point** montre où appuyer : sur cette corde, dans cette case, de préférence juste derrière la frette. Le **chiffre dans le point** indique quel doigt appuie :',
        },
      },
      {
        ul: [
          { de: '**1** = Zeigefinger', en: '**1** = index finger', fr: '**1** = index' },
          { de: '**2** = Mittelfinger', en: '**2** = middle finger', fr: '**2** = majeur' },
          { de: '**3** = Ringfinger', en: '**3** = ring finger', fr: '**3** = annulaire' },
          { de: '**4** = kleiner Finger', en: '**4** = little finger', fr: '**4** = auriculaire' },
        ],
      },
      {
        p: {
          de: 'Ein **Balken** quer über mehrere Saiten heißt Barré: Ein Finger, meist der Zeigefinger, drückt mehrere Saiten im selben Bund zugleich. Manche Bücher schreiben für den Daumen ein **T**.',
          en: 'A **bar** across several strings means a barre: one finger, usually the index, presses several strings at the same fret. Some books use a **T** for the thumb.',
          fr: 'Une **barre** en travers de plusieurs cordes signifie un barré : un doigt, en général l’index, appuie plusieurs cordes dans la même case. Certains livres notent le pouce avec un **T**.',
        },
      },
      { chord: 'C' },
      { chord: 'G7' },
      { h2: { de: 'Über dem Sattel: o und x', en: 'Above the nut: o and x', fr: 'Au-dessus du sillet : o et x' } },
      {
        ul: [
          {
            de: 'Ein **Kreis (o)** heißt: Diese Saite klingt **leer** mit, ohne Finger.',
            en: 'A **circle (o)** means: this string rings **open**, without a finger.',
            fr: 'Un **rond (o)** signifie : cette corde sonne **à vide**, sans doigt.',
          },
          {
            de: 'Ein **Kreuz (x)** heißt: Diese Saite **nicht spielen**. Du schlägst sie nicht an oder dämpfst sie mit einem Finger ab.',
            en: 'A **cross (x)** means: **don’t play** this string. Don’t strike it, or mute it with a finger.',
            fr: 'Une **croix (x)** signifie : **ne joue pas** cette corde. Ne la gratte pas, ou étouffe-la avec un doigt.',
          },
          {
            de: 'Steht über einer Saite gar nichts und liegt auch kein Punkt darauf, gilt meist dasselbe wie beim Kreuz.',
            en: 'If there’s nothing above a string and no dot on it, it usually means the same as a cross.',
            fr: 'S’il n’y a rien au-dessus d’une corde et aucun point dessus, c’est en général comme une croix.',
          },
        ],
      },
      { h2: { de: 'Weiter oben am Hals: „3fr“', en: 'Higher up the neck: “3fr”', fr: 'Plus haut sur le manche : « 3fr »' } },
      {
        p: {
          de: 'Liegt ein Griff weiter oben, zeigt das Bild nicht den Sattel, sondern einen Ausschnitt. Daneben steht dann eine Bundzahl, etwa **„3fr“** (fr für englisch fret = Bund), manchmal auch römisch **III**. Sie bedeutet: Die oberste Bundreihe im Bild ist der **3. Bund**. In der App siehst du in diesem Fall keinen dicken Sattel, sondern links neben der ersten Reihe nur die Zahl.',
          en: 'If a chord sits higher up, the diagram doesn’t show the nut but just a section of the neck. Next to it there’s a fret number such as **“3fr”** (fr for fret), sometimes in Roman numerals like **III**. It means: the top row in the diagram is the **3rd fret**. In the app you then see no thick nut, just the number to the left of the first row.',
          fr: 'Si un accord se joue plus haut, le diagramme ne montre pas le sillet mais seulement une partie du manche. À côté figure alors un numéro de case comme **« 3fr »** (fr pour fret = case en anglais), parfois en chiffres romains comme **III**. Cela veut dire : la rangée du haut est la **3e case**. Dans l’appli, tu ne vois alors pas de sillet épais, juste le chiffre à gauche de la première rangée.',
        },
      },
      { h2: { de: 'Besonderheiten je Instrument', en: 'Instrument quirks', fr: 'Particularités selon l’instrument' } },
      {
        ul: [
          {
            de: '**Banjo:** Die kurze 5. Saite beginnt erst am 5. Bund. Im Griffbild ist sie darüber nur gestrichelt.',
            en: '**Banjo:** the short 5th string only starts at the 5th fret. In the diagram it’s dashed above that point.',
            fr: '**Banjo :** la petite 5e corde ne commence qu’à la 5e case. Sur le diagramme, elle est en pointillés au-dessus.',
          },
          {
            de: '**Mandoline:** Jede Linie steht für ein Saitenpaar. Ein Punkt heißt: beide Saiten des Paares drücken.',
            en: '**Mandolin:** each line stands for a pair of strings. A dot means: press both strings of the pair.',
            fr: '**Mandoline :** chaque ligne représente une paire de cordes. Un point veut dire : appuie sur les deux cordes de la paire.',
          },
          {
            de: '**E-Bass:** Hier zeigt das Bild meist nur **einen** Ton, den Grundton des Akkords. Ein heller Punkt mit einer 5 markiert die Quinte, die du dazu spielen kannst.',
            en: '**Bass guitar:** here the diagram usually shows just **one** note, the root of the chord. A pale dot with a 5 marks the fifth you can add.',
            fr: '**Basse :** ici, le diagramme ne montre en général qu’**une** note, la fondamentale de l’accord. Un point clair avec un 5 indique la quinte que tu peux ajouter.',
          },
          {
            de: '**Linkshänder:** In der App kannst du alle Griffbilder spiegeln lassen, dann ist die tiefe Saite rechts.',
            en: '**Left-handers:** in the app you can mirror all diagrams, so the low string is on the right.',
            fr: '**Gauchers :** dans l’appli, tu peux inverser tous les diagrammes ; la corde grave est alors à droite.',
          },
        ],
      },
      {
        tip: {
          de: 'Lies ein Griffbild immer in derselben Reihenfolge: erst die Saite, dann den Bund, dann den Finger. Setz die Finger nacheinander, zupf jede Saite einzeln – und erst dann schlägst du den ganzen Akkord an.',
          en: 'Always read a diagram in the same order: first the string, then the fret, then the finger. Place your fingers one after another, pluck each string on its own – and only then strum the whole chord.',
          fr: 'Lis toujours un diagramme dans le même ordre : d’abord la corde, puis la case, puis le doigt. Pose les doigts l’un après l’autre, pince chaque corde séparément – et seulement ensuite, gratte tout l’accord.',
        },
      },
      {
        p: {
          de: 'Ein Griffbild zeigt einen Akkord zum Festhalten. Für Melodien, bei denen die Töne nacheinander kommen, gibt es die Tabulatur – mehr in [Tabulatur lesen](wissen:tabulatur-lesen).',
          en: 'A chord diagram shows one chord to hold. For melodies where notes come one after another there’s tab – more in [Reading tab](wissen:tabulatur-lesen).',
          fr: 'Un diagramme montre un accord à tenir. Pour les mélodies, où les notes se suivent, il y a la tablature – plus d’infos dans [Lire une tablature](wissen:tabulatur-lesen).',
        },
      },
      { tool: 'akkorde' },
    ],
    related: ['akkordsymbole-lesen', 'tabulatur-lesen', 'saubere-griffe', 'toene-und-notennamen', 'musik-ohne-noten'],
    published: '2026-10-11',
  },
  {
    id: 'wiedereinstieg-nach-pause',
    slug: { de: 'wieder-anfangen-nach-langer-pause', en: 'getting-back-to-playing-after-a-long-break', fr: 'reprendre-apres-une-longue-pause' },
    instruments: ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline', 'bass'],
    category: 'erste-schritte',
    title: {
      de: 'Wiedereinstieg nach langer Pause – so kommst du zurück ans Instrument',
      en: 'Getting Back to Playing After a Long Break',
      fr: 'Reprendre ton instrument après une longue pause',
    },
    description: {
      de: 'Das Instrument stand jahrelang in der Ecke? So machst du es wieder spielbar, schonst die Finger und findest schnell zurück – oft gerade, wenn das Kind anfängt.',
      en: 'Has your instrument sat in a corner for years? Here’s how to make it playable, go easy on your fingers and get back into it fast – often just as your child starts.',
      fr: 'Ton instrument dort dans un coin depuis des années ? Voici comment le remettre en état, ménager tes doigts et t’y remettre vite – souvent quand ton enfant commence.',
    },
    blocks: [
      {
        p: {
          de: 'Früher hast du gespielt, dann kamen Ausbildung, Arbeit, Familie – und das Instrument stand in der Ecke. Viele greifen genau dann wieder dazu, wenn das eigene Kind ein Instrument lernt. Die gute Nachricht: Die Hände erinnern sich schneller, als du denkst. Ein paar Dinge machen den Neustart leichter.',
          en: 'You used to play, then came training, work, family – and the instrument stood in the corner. Many people pick it up again just when their own child starts learning. The good news: your hands remember faster than you think. A few things make the restart easier.',
          fr: 'Tu jouais autrefois, puis sont venus les études, le travail, la famille – et l’instrument est resté dans un coin. Beaucoup s’y remettent justement quand leur enfant commence à apprendre. Bonne nouvelle : les mains se souviennent plus vite qu’on ne le croit. Quelques points facilitent la reprise.',
        },
      },
      { h2: { de: 'Erst das Instrument', en: 'The instrument first', fr: 'D’abord l’instrument' } },
      {
        ul: [
          {
            de: '**Neue Saiten:** Alte Saiten sind oft angelaufen, klingen dumpf und halten die Stimmung schlecht. Ein frischer Satz ist der günstigste Weg zu besserem Klang.',
            en: '**New strings:** old strings are often tarnished, sound dull and don’t stay in tune. A fresh set is the cheapest way to a better sound.',
            fr: '**Cordes neuves :** les vieilles cordes sont souvent ternies, sonnent sourd et tiennent mal l’accord. Un jeu neuf est le moyen le moins cher d’avoir un meilleur son.',
          },
          {
            de: '**Anschauen:** Risse im Holz, ein krummer Hals oder Saiten, die sehr hoch über dem Griffbrett liegen? Dann lohnt ein Besuch in einer Werkstatt, bevor du losübst.',
            en: '**Take a look:** cracks in the wood, a bent neck or strings sitting very high above the fretboard? Then it’s worth visiting a repair shop before you start practising.',
            fr: '**Inspecte-le :** fissures dans le bois, manche tordu ou cordes très hautes au-dessus de la touche ? Alors un passage chez un luthier vaut la peine avant de t’entraîner.',
          },
          {
            de: '**Stimmen:** Nach langer Zeit ist alles verstimmt. Neue Saiten dehnen sich in den ersten Tagen – stimm öfter nach.',
            en: '**Tune:** after a long time everything is out of tune. New strings stretch during the first days – retune often.',
            fr: '**Accorde :** après longtemps, tout est désaccordé. Les cordes neuves se détendent les premiers jours – réaccorde souvent.',
          },
        ],
      },
      { tool: 'stimmen' },
      { h2: { de: 'Dann die Finger', en: 'Then your fingers', fr: 'Ensuite les doigts' } },
      {
        p: {
          de: 'Die Hornhaut an den Fingerkuppen ist weg – das Drücken tut anfangs wieder weh. Spiel in der ersten Woche lieber zwei-, dreimal am Tag zehn Minuten als einmal eine Stunde. Nach ein, zwei Wochen ist die Haut wieder da. Mehr dazu in [Fingerkuppen tun weh?](wissen:fingerkuppen-hornhaut).',
          en: 'The calluses on your fingertips are gone – pressing hurts again at first. In the first week, play ten minutes two or three times a day rather than an hour in one go. After a week or two the skin is back. More in [Sore fingertips?](wissen:fingerkuppen-hornhaut).',
          fr: 'La corne au bout des doigts a disparu – appuyer fait de nouveau mal au début. La première semaine, joue plutôt dix minutes deux ou trois fois par jour qu’une heure d’un coup. Au bout d’une ou deux semaines, la peau est revenue. Plus d’infos dans [Mal au bout des doigts ?](wissen:fingerkuppen-hornhaut).',
        },
      },
      { h2: { de: 'Mit Bekanntem anfangen', en: 'Start with what you know', fr: 'Commence par ce que tu connais' } },
      {
        p: {
          de: 'Spiel zuerst Lieder und Griffe, die du früher konntest. Das bringt schnelle Erfolgserlebnisse und weckt die Bewegungen wieder auf. Danach den Rhythmus auffrischen: Ein paar Minuten mit dem Metronom zeigen, wo es noch hakt – siehe [Mit Metronom üben](wissen:mit-metronom-ueben).',
          en: 'First play songs and chords you used to know. That brings quick wins and wakes the movements back up. Then refresh your rhythm: a few minutes with the metronome show where things still catch – see [Practising with a metronome](wissen:mit-metronom-ueben).',
          fr: 'Joue d’abord les chansons et les accords que tu connaissais. Ça apporte des réussites rapides et réveille les gestes. Ensuite, rafraîchis ton rythme : quelques minutes avec le métronome montrent ce qui accroche encore – voir [Travailler avec un métronome](wissen:mit-metronom-ueben).',
        },
      },
      { h2: { de: 'Ein Ziel setzen', en: 'Set a goal', fr: 'Fixe-toi un objectif' } },
      {
        ul: [
          {
            de: 'Nimm dir **ein Lied** für die nächsten zwei Wochen vor – nicht zehn.',
            en: 'Pick **one song** for the next two weeks – not ten.',
            fr: 'Choisis **une chanson** pour les deux prochaines semaines – pas dix.',
          },
          {
            de: 'Spiel mit anderen: mit dem Kind, in der Familie, mit Freunden. Gemeinsam bleibt man leichter dran.',
            en: 'Play with others: with your child, in the family, with friends. It’s easier to keep going together.',
            fr: 'Joue avec d’autres : avec ton enfant, en famille, entre amis. À plusieurs, on tient plus facilement.',
          },
          {
            de: 'Probier etwas Neues, das früher zu schwer war. Mit mehr Geduld als mit 14 klappt es oft überraschend gut.',
            en: 'Try something new that used to be too hard. With more patience than you had at 14, it often works surprisingly well.',
            fr: 'Essaie quelque chose de nouveau qui était trop difficile avant. Avec plus de patience qu’à 14 ans, ça marche souvent étonnamment bien.',
          },
        ],
      },
      {
        tip: {
          de: 'Vergleich dich nicht mit früher. Du fängst nicht bei null an – und jede Woche wird es spürbar besser.',
          en: 'Don’t compare yourself with how you used to play. You’re not starting from zero – and every week gets noticeably better.',
          fr: 'Ne te compare pas à ton niveau d’avant. Tu ne repars pas de zéro – et chaque semaine, ça va nettement mieux.',
        },
      },
      { tool: 'lieder' },
    ],
    related: ['fingerkuppen-hornhaut', 'mit-metronom-ueben', 'saiten-wechseln-pflege', 'ueben-mit-kindern', 'lieder-fuer-anfaenger'],
    published: '2026-10-11',
  },
  {
    id: 'eltern-ohne-vorkenntnisse',
    slug: { de: 'kind-beim-ueben-helfen-ohne-selbst-zu-spielen', en: 'help-your-child-practise-without-playing-yourself', fr: 'aider-son-enfant-sans-jouer-soi-meme' },
    instruments: ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline', 'bass'],
    category: 'eltern-lehrkraefte',
    title: {
      de: 'Sie spielen selbst nicht? So helfen Sie Ihrem Kind trotzdem beim Üben',
      en: 'You Don’t Play Yourself? How You Can Still Help Your Child Practise',
      fr: 'Vous ne jouez pas vous-même ? Comment aider quand même votre enfant',
    },
    description: {
      de: 'Eltern müssen kein Instrument spielen, um zu helfen. Stimmen, Griffbilder vergleichen, gute Fragen stellen und sich vom Kind etwas zeigen lassen – so geht’s.',
      en: 'Parents don’t need to play an instrument to help. Tuning, comparing chord diagrams, asking good questions and letting your child teach you – here’s how.',
      fr: 'Pas besoin de jouer d’un instrument pour aider. Accorder, comparer les diagrammes, poser de bonnes questions et se laisser apprendre par l’enfant – voici comment.',
    },
    blocks: [
      {
        p: {
          de: 'Viele Eltern denken: „Ich kann ja selbst nicht spielen, da kann ich nicht helfen.“ Das stimmt nicht. Die wichtigsten Hilfen beim Üben haben mit dem Spielen selbst wenig zu tun. Hier sind Dinge, die Sie ohne jede Vorkenntnis können.',
          en: 'Many parents think: “I can’t play myself, so I can’t help.” That isn’t true. The most important kinds of help with practice have little to do with playing. Here are things you can do without any prior knowledge.',
          fr: 'Beaucoup de parents se disent : « Je ne joue pas moi-même, je ne peux donc pas aider. » C’est faux. Les aides les plus importantes ont peu à voir avec le jeu lui-même. Voici ce que vous pouvez faire sans aucune connaissance préalable.',
        },
      },
      { h2: { de: 'Das Instrument stimmen', en: 'Tuning the instrument', fr: 'Accorder l’instrument' } },
      {
        p: {
          de: 'Ein verstimmtes Instrument klingt schief, egal wie gut das Kind greift – und das frustriert. Stimmen ist mit einem Stimmgerät auch für Nicht-Musiker leicht: Saite zupfen, Nadel ansehen, Wirbel drehen. Zwei Minuten vor dem Üben sind die wertvollste Hilfe überhaupt. Das Stimmgerät der App zeigt, welche Saite es hört, und gibt Hinweise, wenn man am Wirbel einer anderen Saite dreht.',
          en: 'An out-of-tune instrument sounds off no matter how well the child plays – and that’s frustrating. With a tuner, tuning is easy even for non-musicians: pluck a string, watch the needle, turn the peg. Two minutes before practice is the most valuable help of all. The app’s tuner shows which string it hears and gives hints if you turn the peg of a different string.',
          fr: 'Un instrument désaccordé sonne mal, même si l’enfant joue bien – et c’est frustrant. Avec un accordeur, accorder est facile même sans être musicien : pincer une corde, regarder l’aiguille, tourner la cheville. Deux minutes avant de jouer, c’est l’aide la plus précieuse qui soit. L’accordeur de l’appli indique quelle corde il entend et prévient si l’on tourne la cheville d’une autre corde.',
        },
      },
      { tool: 'stimmen' },
      { h2: { de: 'Griffbilder vergleichen', en: 'Comparing chord diagrams', fr: 'Comparer les diagrammes' } },
      {
        p: {
          de: 'Ein Griffbild zu lesen, lernen Sie in fünf Minuten – siehe [Griffbild lesen](wissen:griffbild-lesen). Dann können Sie mit Ihrem Kind vergleichen: Liegt jeder Finger auf der richtigen Saite und im richtigen Bund? Fragen Sie lieber, als zu korrigieren: „Schau mal, wo im Bild der Ringfinger ist – und wo ist deiner?“',
          en: 'You can learn to read a chord diagram in five minutes – see [How to read chord diagrams](wissen:griffbild-lesen). Then you can compare with your child: is every finger on the right string and fret? Ask rather than correct: “Look where the ring finger is in the picture – and where’s yours?”',
          fr: 'Lire un diagramme s’apprend en cinq minutes – voir [Lire un diagramme d’accord](wissen:griffbild-lesen). Vous pourrez ensuite comparer avec votre enfant : chaque doigt est-il sur la bonne corde et dans la bonne case ? Questionnez plutôt que corriger : « Regarde où est l’annulaire sur l’image – et où est le tien ? »',
        },
      },
      { h2: { de: 'Ihr Kind wird zur Lehrkraft', en: 'Your child becomes the teacher', fr: 'Votre enfant devient le professeur' } },
      {
        p: {
          de: 'Lassen Sie sich einen Akkord oder ein kleines Lied **beibringen**. Wer etwas erklärt, versteht es selbst besser – und Kinder genießen es sehr, einmal die Expertin oder der Experte zu sein. Dass Ihnen die Finger dabei wehtun und es schief klingt, ist sogar gut: Ihr Kind sieht, dass Anfangen für alle schwer ist.',
          en: 'Let your child **teach you** a chord or a little song. Explaining something helps you understand it better – and children love being the expert for once. If your fingers hurt and it sounds off, that’s actually good: your child sees that starting out is hard for everyone.',
          fr: 'Demandez à votre enfant de vous **apprendre** un accord ou une petite chanson. Expliquer aide à mieux comprendre – et les enfants adorent être l’expert pour une fois. Si vos doigts font mal et que ça sonne de travers, c’est même bien : votre enfant voit que débuter est difficile pour tout le monde.',
        },
      },
      { h2: { de: 'Gute Fragen statt Bewertungen', en: 'Good questions instead of judgements', fr: 'De bonnes questions plutôt que des jugements' } },
      {
        ul: [
          { de: '„Was war heute am schwersten?“', en: '“What was hardest today?”', fr: '« Qu’est-ce qui était le plus dur aujourd’hui ? »' },
          { de: '„Welche Saite klingt noch nicht mit?“', en: '“Which string isn’t ringing yet?”', fr: '« Quelle corde ne sonne pas encore ? »' },
          { de: '„Spielst du mir das Lied vor, das du gerade übst?“', en: '“Will you play me the song you’re working on?”', fr: '« Tu me joues la chanson que tu travailles ? »' },
          { de: '„Was möchtest du als Nächstes lernen?“', en: '“What would you like to learn next?”', fr: '« Qu’est-ce que tu aimerais apprendre ensuite ? »' },
        ],
      },
      {
        p: {
          de: 'Ob ein Akkord sauber klingt, muss niemand allein entscheiden: Bei jedem Griff in der App gibt es den Knopf „Prüf mich!“. Das Mikrofon hört zu und sagt, welche Saite noch nicht passt. Die Auswertung bleibt auf dem Gerät.',
          en: 'Nobody has to judge alone whether a chord sounds clean: every chord in the app has a “Check me!” button. The microphone listens and says which string isn’t right yet. The analysis stays on the device.',
          fr: 'Personne n’a à juger seul si un accord sonne bien : chaque accord de l’appli a un bouton « Teste-moi ! ». Le micro écoute et dit quelle corde n’est pas encore juste. L’analyse reste sur l’appareil.',
        },
      },
      { h2: { de: 'Mitmachen ohne Instrument', en: 'Joining in without an instrument', fr: 'Participer sans instrument' } },
      {
        ul: [
          {
            de: '**Mitsingen:** Mit Gesang wird aus dem Üben ein Lied. Ihre Stimme muss dafür nicht schön sein.',
            en: '**Sing along:** with singing, practice turns into a song. Your voice doesn’t need to be pretty.',
            fr: '**Chanter :** avec le chant, l’exercice devient une chanson. Votre voix n’a pas besoin d’être belle.',
          },
          {
            de: '**Takt klatschen:** Klatschen Sie den Grundschlag mit oder schalten Sie das Metronom ein.',
            en: '**Clap the beat:** clap along to the pulse or switch on the metronome.',
            fr: '**Frapper le temps :** frappez la pulsation dans les mains ou allumez le métronome.',
          },
          {
            de: '**Zuhören:** Ein kleines Vorspiel nach dem Abendessen ist für viele Kinder die schönste Belohnung.',
            en: '**Listen:** a mini concert after dinner is the nicest reward for many children.',
            fr: '**Écouter :** un petit concert après le dîner est pour beaucoup d’enfants la plus belle récompense.',
          },
        ],
      },
      {
        tip: {
          de: 'Rahmen schaffen ist Elternsache, Spielen ist Kindersache: ein fester Platz, an dem das Instrument griffbereit steht, und eine feste Zeit am Tag. Mehr Ideen stehen in [Üben mit Kindern](wissen:ueben-mit-kindern).',
          en: 'Setting the frame is the parent’s job, playing is the child’s: a fixed spot where the instrument is always within reach, and a fixed time of day. More ideas in [Practising with children](wissen:ueben-mit-kindern).',
          fr: 'Le cadre, c’est l’affaire des parents ; jouer, celle de l’enfant : un endroit fixe où l’instrument est toujours à portée de main, et un moment fixe dans la journée. D’autres idées dans [Faire pratiquer les enfants](wissen:ueben-mit-kindern).',
        },
      },
    ],
    related: ['ueben-mit-kindern', 'griffbild-lesen', 'musik-ohne-noten', 'app-ohne-konto'],
    published: '2026-10-11',
  },
  {
    id: 'klasse-stimmen',
    slug: { de: 'klasse-stimmen-viele-instrumente-schnell', en: 'tuning-a-whole-class-quickly', fr: 'accorder-toute-une-classe-rapidement' },
    instruments: ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline'],
    category: 'eltern-lehrkraefte',
    title: {
      de: 'Stimmen in der Klasse: 25 Instrumente schnell gestimmt',
      en: 'Tuning in Class: Getting 25 Instruments in Tune Quickly',
      fr: 'Accorder en classe : 25 instruments accordés rapidement',
    },
    description: {
      de: 'Stimmen frisst die halbe Musikstunde? Mit Vorbereitung, Stimm-Stationen, Stimm-Helfern und ein paar Tricks sind 25 Instrumente in wenigen Minuten gestimmt.',
      en: 'Tuning eats half the music lesson? With preparation, tuning stations, tuning helpers and a few tricks, 25 instruments are in tune within minutes.',
      fr: 'L’accordage mange la moitié du cours ? Avec de la préparation, des postes d’accordage, des assistants et quelques astuces, 25 instruments sont prêts en quelques minutes.',
    },
    blocks: [
      {
        p: {
          de: '25 Ukulelen oder Gitarren, 45 Minuten Unterricht – und zehn davon gehen fürs Stimmen drauf? Das muss nicht sein. Mit etwas Organisation klingt die Klasse schnell sauber, und die Kinder lernen nebenbei, selbst zu stimmen. Allgemeine Tipps für den Unterricht stehen in [Instrumentalklasse in der Schule](wissen:instrumentalklasse-schule).',
          en: '25 ukuleles or guitars, a 45-minute lesson – and ten minutes go on tuning? It doesn’t have to be that way. With a little organisation the class sounds clean quickly, and the children learn to tune on their own along the way. General tips for lessons are in [Instrumental classes at school](wissen:instrumentalklasse-schule).',
          fr: '25 ukulélés ou guitares, 45 minutes de cours – et dix passent à accorder ? Ce n’est pas une fatalité. Avec un peu d’organisation, la classe sonne vite juste, et les enfants apprennent à accorder eux-mêmes. Des conseils généraux se trouvent dans [Classe d’instruments à l’école](wissen:instrumentalklasse-schule).',
        },
      },
      { h2: { de: 'Vor der Stunde', en: 'Before the lesson', fr: 'Avant le cours' } },
      {
        ul: [
          {
            de: 'Bleiben die Instrumente in der Schule, stimmen Sie oder ein Helfer sie **vorab** – etwa in der Pause davor. Instrumente, die im selben Raum lagern, halten die Stimmung besser.',
            en: 'If the instruments stay at school, you or a helper tune them **in advance** – for example during the break before. Instruments stored in the same room hold their tuning better.',
            fr: 'Si les instruments restent à l’école, vous ou un assistant les accordez **à l’avance** – par exemple pendant la récréation précédente. Les instruments rangés dans la même salle tiennent mieux l’accord.',
          },
          {
            de: '**Neue Saiten vordehnen:** Nach dem Aufziehen jede Saite stimmen, vorsichtig vom Griffbrett wegziehen und nachstimmen, mehrmals. Das erspart Wochen voller Nachstimmen.',
            en: '**Pre-stretch new strings:** after fitting, tune each string, gently pull it away from the fretboard and retune, several times. That saves weeks of constant retuning.',
            fr: '**Pré-étirer les cordes neuves :** après le montage, accordez chaque corde, tirez-la doucement loin de la touche et réaccordez, plusieurs fois. Cela évite des semaines de réaccordage.',
          },
          {
            de: 'Kommen die Instrumente aus der Kälte, lassen Sie sie ein paar Minuten im Raum warm werden, bevor gestimmt wird.',
            en: 'If the instruments come in from the cold, let them warm up in the room for a few minutes before tuning.',
            fr: 'Si les instruments arrivent du froid, laissez-les se réchauffer quelques minutes dans la salle avant d’accorder.',
          },
        ],
      },
      { h2: { de: 'Stimm-Stationen', en: 'Tuning stations', fr: 'Postes d’accordage' } },
      {
        p: {
          de: 'Richten Sie drei oder vier **Stationen** mit einem Tablet oder Handy ein, auf dem das Stimmgerät läuft. Die Kinder kommen reihum, während die anderen eine ruhige Aufgabe haben – zum Beispiel einen Griff aus dem Liedblatt suchen oder einen Rhythmus leise auf dem Knie klopfen. Ruhe ist wichtig: Ein Stimmgerät über Mikrofon hört in einem lauten Raum schlechter.',
          en: 'Set up three or four **stations** with a tablet or phone running the tuner. The children come in turn while the others have a quiet task – for example finding a chord from the song sheet or tapping a rhythm softly on their knees. Quiet matters: a microphone-based tuner hears less well in a noisy room.',
          fr: 'Installez trois ou quatre **postes** avec une tablette ou un téléphone où tourne l’accordeur. Les enfants passent à tour de rôle pendant que les autres font une tâche calme – par exemple chercher un accord de la grille ou taper doucement un rythme sur les genoux. Le calme compte : un accordeur par micro entend moins bien dans une salle bruyante.',
        },
      },
      { tool: 'stimmen' },
      {
        ul: [
          {
            de: '**Stimm-Helfer:** Kinder, die schon sicher stimmen, werden Helfer für eine Station. Ein kleines „Stimm-Diplom“ für dreimal selbstständig Stimmen motiviert.',
            en: '**Tuning helpers:** children who can already tune confidently become helpers at a station. A little “tuning certificate” for tuning on their own three times is motivating.',
            fr: '**Assistants d’accordage :** les enfants qui accordent déjà bien deviennent assistants à un poste. Un petit « diplôme d’accordage » après trois accordages en autonomie motive.',
          },
          {
            de: '**Klemm-Stimmgeräte:** Kleine Stimmgeräte, die man an den Kopf des Instruments klemmt, nehmen die Schwingung direkt ab und funktionieren auch, wenn es laut ist.',
            en: '**Clip-on tuners:** small tuners clipped to the instrument’s headstock pick up the vibration directly and work even when it’s noisy.',
            fr: '**Accordeurs à pince :** de petits accordeurs fixés sur la tête de l’instrument captent directement la vibration et fonctionnent même dans le bruit.',
          },
        ],
      },
      { h2: { de: 'Der richtige Wirbel', en: 'The right peg', fr: 'La bonne cheville' } },
      {
        p: {
          de: 'Der häufigste Stolperstein: Ein Kind zupft die eine Saite und dreht am Wirbel der anderen. Helfen kann ein **farbiger Punkt** auf jedem Wirbel und dieselbe Farbe am Saitenende. Das Stimmgerät der App bemerkt außerdem, wenn sich beim Drehen gar nichts an der gezupften Saite ändert, und gibt dann einen Hinweis.',
          en: 'The most common stumbling block: a child plucks one string and turns the peg of another. A **coloured dot** on each peg with the same colour at the string end can help. The app’s tuner also notices when turning doesn’t change the plucked string at all, and then gives a hint.',
          fr: 'L’écueil le plus courant : un enfant pince une corde et tourne la cheville d’une autre. Une **pastille de couleur** sur chaque cheville, de la même couleur au bout de la corde, peut aider. L’accordeur de l’appli remarque aussi quand rien ne change sur la corde pincée en tournant, et donne alors un conseil.',
        },
      },
      { h2: { de: 'Der Hörtest am Schluss', en: 'A listening check at the end', fr: 'Un test d’écoute pour finir' } },
      {
        p: {
          de: 'Lassen Sie zum Schluss reihum jedes Kind einmal einen einfachen Akkord anschlagen, etwa C auf der Ukulele oder Em auf der Gitarre. Ein Instrument, das noch nicht stimmt, fällt so sofort auf – ohne dass es jemand vor der ganzen Klasse bewerten muss: „Lass uns das zusammen noch kurz nachstimmen.“',
          en: 'Finally, have each child strum a simple chord in turn, such as C on the ukulele or Em on the guitar. An instrument that isn’t in tune yet stands out at once – without anyone having to judge it in front of the class: “Let’s quickly retune that together.”',
          fr: 'Pour finir, faites gratter à chaque enfant, tour à tour, un accord simple, comme C au ukulélé ou Em à la guitare. Un instrument pas encore juste se remarque tout de suite – sans qu’on ait à le juger devant toute la classe : « On le réaccorde vite ensemble. »',
        },
      },
      {
        tip: {
          de: 'Stimmen ist ein Lernziel, keine Vorarbeit. Wer in der Grundschul- oder Unterstufenzeit lernt, sein Instrument selbst zu stimmen, hat das fürs Leben.',
          en: 'Tuning is a learning goal, not just preparation. Children who learn to tune their own instrument at primary or lower secondary age keep that skill for life.',
          fr: 'Accorder est un objectif d’apprentissage, pas une simple préparation. L’enfant qui apprend à accorder son instrument au primaire ou au collège garde ce savoir toute sa vie.',
        },
      },
    ],
    related: ['instrumentalklasse-schule', 'saiten-wechseln-pflege', 'ueben-mit-kindern', 'app-ohne-konto'],
    published: '2026-10-11',
  },
  {
    id: 'musik-ohne-noten',
    slug: { de: 'musik-lernen-ohne-noten', en: 'learning-music-without-sheet-music', fr: 'apprendre-la-musique-sans-partition' },
    instruments: ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline', 'bass'],
    category: 'erste-schritte',
    title: {
      de: 'Musik lernen ohne Noten – geht das?',
      en: 'Learning Music Without Reading Notes – Does It Work?',
      fr: 'Apprendre la musique sans solfège – est-ce possible ?',
    },
    description: {
      de: 'Für Saiteninstrumente musst du keine Noten lesen können, um loszulegen. Akkordsymbole, Griffbilder, Tabulatur und dein Gehör reichen für viele Lieder.',
      en: 'You don’t need to read notes to get started on a string instrument. Chord symbols, chord diagrams, tab and your ear are enough for lots of songs.',
      fr: 'Pas besoin de lire les notes pour commencer un instrument à cordes. Symboles d’accords, diagrammes, tablatures et ton oreille suffisent pour plein de chansons.',
    },
    blocks: [
      {
        p: {
          de: 'Kannst du keine Noten lesen? Kein Problem. Sehr viele Menschen, die Gitarre, Ukulele, Banjo oder Bass spielen, haben nie Noten gelernt – und spielen trotzdem richtig gut. Für Saiteninstrumente gibt es nämlich eigene, viel einfachere Schreibweisen.',
          en: 'Can’t read notes? No problem. Lots of people who play guitar, ukulele, banjo or bass never learned to read music – and still play really well. String instruments have their own, much simpler ways of writing music down.',
          fr: 'Tu ne sais pas lire les notes ? Pas de souci. Énormément de gens qui jouent de la guitare, du ukulélé, du banjo ou de la basse n’ont jamais appris le solfège – et jouent quand même très bien. Les instruments à cordes ont leurs propres notations, bien plus simples.',
        },
      },
      { h2: { de: '1. Akkordsymbole über dem Text', en: '1. Chord symbols above the lyrics', fr: '1. Les symboles d’accords au-dessus des paroles' } },
      {
        p: {
          de: 'Auf den meisten Liedblättern stehen nur der Text und darüber Buchstaben wie C, Am oder G7. Jeder Buchstabe ist ein Akkord, und er steht genau über der Silbe, auf der du wechselst. Mehr brauchst du für die Begleitung nicht.',
          en: 'Most song sheets only show the lyrics with letters like C, Am or G7 above them. Each letter is a chord, placed right above the syllable where you change. That’s all you need for accompaniment.',
          fr: 'La plupart des grilles ne montrent que les paroles, avec au-dessus des lettres comme C, Am ou G7. Chaque lettre est un accord, placé juste au-dessus de la syllabe où tu changes. Pour accompagner, il ne t’en faut pas plus.',
        },
      },
      { h2: { de: '2. Griffbilder', en: '2. Chord diagrams', fr: '2. Les diagrammes' } },
      {
        p: {
          de: 'Ein Griffbild zeigt, wo deine Finger hinkommen – wie ein kleines Foto vom Griffbrett. Wie du es liest, steht in [Griffbild lesen](wissen:griffbild-lesen).',
          en: 'A chord diagram shows where your fingers go – like a little photo of the fretboard. How to read one is explained in [How to read chord diagrams](wissen:griffbild-lesen).',
          fr: 'Un diagramme montre où placer tes doigts – comme une petite photo de la touche. Pour le lire, va voir [Lire un diagramme d’accord](wissen:griffbild-lesen).',
        },
      },
      { h2: { de: '3. Tabulatur für Melodien', en: '3. Tab for melodies', fr: '3. La tablature pour les mélodies' } },
      {
        p: {
          de: 'Für einzelne Töne gibt es die **Tabulatur**: Linien für die Saiten, Zahlen für die Bünde. Du liest einfach ab, wo du greifst. Alles dazu in [Tabulatur lesen](wissen:tabulatur-lesen).',
          en: 'For single notes there’s **tab**: lines for the strings, numbers for the frets. You simply read off where to press. All about it in [Reading tab](wissen:tabulatur-lesen).',
          fr: 'Pour les notes seules, il y a la **tablature** : des lignes pour les cordes, des chiffres pour les cases. Tu lis simplement où appuyer. Tout est expliqué dans [Lire une tablature](wissen:tabulatur-lesen).',
        },
      },
      { h2: { de: '4. Dein Gehör', en: '4. Your ear', fr: '4. Ton oreille' } },
      {
        p: {
          de: 'Viele Lieder kennst du schon im Kopf. Summ den Anfang und such den ersten Ton auf deinem Instrument – höher oder tiefer? Langsam tastest du dich durch die Melodie. Der Akkord- bzw. Ton-Detektiv der App sagt dir, wie ein Ton oder Griff heißt, den du gefunden hast.',
          en: 'You already know lots of songs by heart. Hum the beginning and look for the first note on your instrument – higher or lower? Step by step you feel your way through the melody. The app’s chord or note detective tells you the name of a note or chord you’ve found.',
          fr: 'Tu connais déjà plein de chansons par cœur. Fredonne le début et cherche la première note sur ton instrument – plus haut ou plus bas ? Petit à petit, tu avances dans la mélodie. Le détective de l’appli te dit le nom de la note ou de l’accord que tu as trouvé.',
        },
      },
      { tool: 'detektiv' },
      { h2: { de: '5. Rhythmus ohne Noten', en: '5. Rhythm without notes', fr: '5. Le rythme sans notes' } },
      {
        p: {
          de: 'Rhythmus lernst du am besten mit dem Körper: zählen, klatschen, sprechen. Im Rhythmus-Werkzeug steht unter jedem Muster eine Sprechsilbe, die genau so klingt wie der Rhythmus. Wie der Takt funktioniert, steht in [Takt und Taktarten](wissen:takt-und-taktarten).',
          en: 'Rhythm is best learned with your body: counting, clapping, speaking. In the rhythm tool each pattern comes with spoken syllables that sound just like the rhythm. How time signatures work is explained in [Time signatures](wissen:takt-und-taktarten).',
          fr: 'Le rythme s’apprend mieux avec le corps : compter, frapper dans les mains, parler. Dans l’outil Rythme, chaque motif a des syllabes à dire qui sonnent exactement comme le rythme. Le fonctionnement de la mesure est expliqué dans [La mesure](wissen:takt-und-taktarten).',
        },
      },
      { h2: { de: 'Brauche ich irgendwann doch Noten?', en: 'Will I need sheet music at some point?', fr: 'Aurai-je besoin du solfège un jour ?' } },
      {
        p: {
          de: 'Für Lieder begleiten, mit Freunden spielen und in einer Band brauchst du keine Noten. Hilfreich werden sie, wenn du in einem Orchester spielst, klassische Stücke lernen oder Melodien ganz genau aufschreiben willst. Das kannst du später Schritt für Schritt lernen – die Tonnamen sind ein guter Anfang: [Töne und Notennamen](wissen:toene-und-notennamen).',
          en: 'For accompanying songs, playing with friends or in a band, you don’t need sheet music. It becomes useful if you play in an orchestra, want to learn classical pieces or write melodies down exactly. You can learn that later, step by step – note names are a good start: [Notes and note names](wissen:toene-und-notennamen).',
          fr: 'Pour accompagner des chansons, jouer avec des amis ou dans un groupe, pas besoin de solfège. Il devient utile si tu joues dans un orchestre, veux apprendre des morceaux classiques ou noter précisément des mélodies. Tu pourras l’apprendre plus tard, pas à pas – les noms des notes sont un bon début : [Les notes et leurs noms](wissen:toene-und-notennamen).',
        },
      },
      {
        tip: {
          de: 'In der App siehst du bei jedem Lied den Text mit Akkorden, bei vielen auch die Tabulatur – ganz ohne Notenlinien.',
          en: 'In the app every song shows the lyrics with chords, and many also show tab – no staff lines needed.',
          fr: 'Dans l’appli, chaque chanson affiche les paroles avec les accords, et beaucoup aussi la tablature – sans portée.',
        },
      },
      { tool: 'lieder' },
    ],
    related: ['tabulatur-lesen', 'griffbild-lesen', 'akkordsymbole-lesen', 'toene-und-notennamen', 'eltern-ohne-vorkenntnisse'],
    published: '2026-10-11',
  },
];
