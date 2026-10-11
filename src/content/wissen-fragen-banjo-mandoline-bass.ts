import type { Article } from './types.ts';

// Fragen rund um Banjo, Mandoline und E-Bass (Ausbau Oktober 2026)
export const FRAGEN_BANJO_MANDOLINE_BASS: Article[] = [
  {
    id: 'banjo-einstellen',
    slug: { de: 'banjo-einstellen-steg-fell-saitenlage', en: 'banjo-setup-bridge-head-action', fr: 'regler-banjo-chevalet-peau-action' },
    instruments: ['banjo'],
    category: 'instrument',
    title: {
      de: 'Banjo einstellen: Steg-Position, Fell und Saitenlage',
      en: 'Banjo Setup: Bridge Position, Head Tension and Action',
      fr: 'Régler son banjo : position du chevalet, peau et hauteur des cordes',
    },
    description: {
      de: 'Steg verrutscht, Fell zu locker, Saiten zu hoch? Was du am Banjo selbst einstellen kannst, in welcher Reihenfolge – und wo die Arbeit für die Werkstatt anfängt.',
      en: 'Bridge moved, head too loose, strings too high? What you can adjust on a banjo yourself, in which order – and where the job for a repair shop begins.',
      fr: 'Chevalet déplacé, peau trop molle, cordes trop hautes ? Ce que tu peux régler toi-même sur un banjo, dans quel ordre – et quand passer à l’atelier.',
    },
    blocks: [
      {
        p: {
          de: 'Ein Banjo ist ein bisschen wie eine Trommel mit Hals: Ein gespanntes **Fell** trägt den **Steg**, und der Steg wird nur vom Druck der Saiten gehalten. Darum verstellt sich beim Banjo mehr als bei einer Gitarre – und vieles kannst du zusammen mit einem Erwachsenen selbst wieder einstellen. Arbeite in kleinen Schritten und prüfe nach jedem Schritt den Klang.',
          en: 'A banjo is a bit like a drum with a neck: a tensioned **head** carries the **bridge**, and the bridge is held only by string pressure. That’s why more things shift on a banjo than on a guitar – and you can reset many of them yourself together with an adult. Work in small steps and check the sound after each one.',
          fr: 'Un banjo ressemble un peu à un tambour avec un manche : une **peau** tendue porte le **chevalet**, et le chevalet ne tient que par la pression des cordes. C’est pourquoi plus de choses bougent sur un banjo que sur une guitare – et tu peux en régler beaucoup toi-même avec un adulte. Avance par petites étapes et écoute le son après chacune.',
        },
      },
      { h2: { de: 'Bevor du anfängst', en: 'Before you start', fr: 'Avant de commencer' } },
      {
        ul: [
          {
            de: 'Mach ein Foto und markiere die Stelle des Stegs mit einem Bleistiftstrich auf einem Streifen Kreppband neben dem Steg.',
            en: 'Take a photo and mark the bridge position with a pencil line on a strip of masking tape next to the bridge.',
            fr: 'Prends une photo et marque la place du chevalet d’un trait de crayon sur un morceau de ruban de masquage à côté.',
          },
          {
            de: 'Nimm **nie alle Saiten gleichzeitig** ab. Sonst fällt der Steg um, und seine Position ist weg. Beim Saitenwechsel immer eine Saite nach der anderen.',
            en: '**Never remove all strings at once.** Otherwise the bridge falls over and its position is lost. When changing strings, do one at a time.',
            fr: 'N’enlève **jamais toutes les cordes en même temps.** Sinon le chevalet tombe et sa position est perdue. Change les cordes une par une.',
          },
          {
            de: 'Stimm das Banjo zuerst richtig. Alle Einstellungen prüfst du im gestimmten Zustand.',
            en: 'Tune the banjo properly first. You check every adjustment with the banjo in tune.',
            fr: 'Accorde d’abord correctement le banjo. Chaque réglage se vérifie banjo accordé.',
          },
        ],
      },
      { tool: 'stimmen' },
      { h2: { de: '1. Der Steg: gerade stehen, richtig sitzen', en: '1. The bridge: standing straight, sitting right', fr: '1. Le chevalet : bien droit, bien placé' } },
      {
        p: {
          de: 'Schau von der Seite: Der Steg soll **senkrecht** auf dem Fell stehen, nicht nach vorn oder hinten gekippt, und seine Füße liegen ganz flach auf. Kippt er, drück ihn bei leicht gelockerten Saiten vorsichtig gerade.',
          en: 'Look from the side: the bridge should stand **upright** on the head, not leaning forward or back, with its feet sitting completely flat. If it leans, gently straighten it with the strings slightly loosened.',
          fr: 'Regarde de côté : le chevalet doit être **bien vertical** sur la peau, ni penché vers l’avant ni vers l’arrière, avec ses pieds bien à plat. S’il penche, redresse-le doucement en détendant un peu les cordes.',
        },
      },
      {
        p: {
          de: 'Die **Position** prüfst du am 12. Bund: Der gegriffene Ton im 12. Bund soll genau eine Oktave über der leeren Saite liegen. Vergleich nach Gehör oder mit einem Stimmgerät, das jeden Ton anzeigt – das Stimmgerät der App kennt nur die leeren Saiten. Prüf die 1. und die 4. Saite.',
          en: 'Check the **position** at the 12th fret: the fretted note at the 12th fret should be exactly one octave above the open string. Compare by ear or with a tuner that shows any note – the app’s tuner only knows the open strings. Check the 1st and the 4th string.',
          fr: 'Vérifie la **position** à la 12e case : la note appuyée à la 12e case doit être exactement une octave au-dessus de la corde à vide. Compare à l’oreille ou avec un accordeur qui affiche toutes les notes – celui de l’appli ne connaît que les cordes à vide. Vérifie la 1re et la 4e corde.',
        },
      },
      {
        ul: [
          {
            de: 'Gegriffen **zu hoch**? Schieb den Steg ein kleines Stück vom Hals weg, Richtung Saitenhalter.',
            en: 'Fretted note **too high**? Move the bridge a little away from the neck, towards the tailpiece.',
            fr: 'Note appuyée **trop haute** ? Éloigne un peu le chevalet du manche, vers le cordier.',
          },
          {
            de: 'Gegriffen **zu tief**? Schieb ihn ein kleines Stück Richtung Hals.',
            en: 'Fretted note **too low**? Move it a little towards the neck.',
            fr: 'Note appuyée **trop basse** ? Rapproche-le un peu du manche.',
          },
          {
            de: 'Danach nachstimmen und noch einmal prüfen. Oft steht der Steg am Ende ganz leicht schräg, mit der Seite der tiefen Saite etwas weiter hinten – das ist in Ordnung.',
            en: 'Then retune and check again. Often the bridge ends up very slightly angled, with the low-string side a little further back – that’s fine.',
            fr: 'Puis réaccorde et vérifie encore. Souvent, le chevalet finit très légèrement de biais, côté corde grave un peu plus en arrière – c’est normal.',
          },
        ],
      },
      {
        tip: {
          de: 'Als grober Anhalt: Vom Sattel bis zum 12. Bund ist es etwa genauso weit wie vom 12. Bund bis zum Steg. Der Steg steht meist ein klein wenig weiter hinten.',
          en: 'As a rough guide: the distance from the nut to the 12th fret is about the same as from the 12th fret to the bridge. The bridge usually sits just a little further back.',
          fr: 'Repère approximatif : la distance du sillet à la 12e case est à peu près la même que de la 12e case au chevalet. Le chevalet est en général un tout petit peu plus loin.',
        },
      },
      { h2: { de: '2. Das Fell spannen', en: '2. Tightening the head', fr: '2. Tendre la peau' } },
      {
        p: {
          de: 'Rund um das Fell sitzen viele **Spannhaken** mit kleinen Muttern. Mit der Zeit gibt das Fell nach: Das Banjo klingt dumpfer, und der Steg sinkt etwas ein. Dann wird es Zeit nachzuspannen:',
          en: 'Around the head there are many **tension hooks** with small nuts. Over time the head loosens: the banjo sounds duller and the bridge sinks in a little. Then it’s time to tighten it:',
          fr: 'Autour de la peau se trouvent de nombreux **crochets de tension** avec de petits écrous. Avec le temps, la peau se détend : le banjo sonne plus sourd et le chevalet s’enfonce un peu. Il est alors temps de la retendre :',
        },
      },
      {
        ol: [
          {
            de: 'Lockere die Saiten ein wenig, damit der Steg das Fell nicht so stark belastet.',
            en: 'Loosen the strings a little so the bridge doesn’t press so hard on the head.',
            fr: 'Détends un peu les cordes pour que le chevalet n’appuie pas trop sur la peau.',
          },
          {
            de: 'Dreh mit dem passenden Schlüssel jede Mutter nur eine **kleine Vierteldrehung** – reihum oder über Kreuz wie bei einer Trommel, damit das Fell gleichmäßig gespannt wird.',
            en: 'With the right wrench, turn each nut only **a small quarter turn** – going round or criss-cross like on a drum, so the head is tensioned evenly.',
            fr: 'Avec la bonne clé, tourne chaque écrou d’**un petit quart de tour** seulement – en faisant le tour ou en croix comme sur un tambour, pour une tension régulière.',
          },
          {
            de: 'Klopf mit dem Finger neben jedem Haken leicht aufs Fell. Überall sollte es ungefähr gleich hoch klingen.',
            en: 'Tap the head lightly with a finger next to each hook. It should sound roughly the same pitch everywhere.',
            fr: 'Tapote légèrement la peau près de chaque crochet. Elle doit sonner à peu près pareil partout.',
          },
          {
            de: 'Stimmen, anhören, bei Bedarf noch eine Runde. Ein straffes Fell klingt hell und knackig, ein lockeres weicher. **Nicht überspannen** – ein Fell kann reißen.',
            en: 'Tune, listen, do another round if needed. A tight head sounds bright and crisp, a looser one softer. **Don’t overtighten** – a head can tear.',
            fr: 'Accorde, écoute, refais un tour si besoin. Une peau tendue sonne clair et sec, une peau plus lâche plus doux. **Ne tends pas trop** – une peau peut se déchirer.',
          },
        ],
      },
      { h2: { de: '3. Die Saitenlage', en: '3. The action', fr: '3. La hauteur des cordes' } },
      {
        p: {
          de: 'Die **Saitenlage** ist der Abstand zwischen Saite und Bundstäbchen, gemessen am 12. Bund. Ist sie zu hoch, ist das Greifen anstrengend und gegriffene Töne klingen zu hoch. Ist sie zu niedrig, schnarren die Saiten. Am einfachsten änderst du sie über den **Steg**: Stege gibt es in verschiedenen Höhen. Auch ein frisch gespanntes Fell hebt die Saiten ein wenig an.',
          en: 'The **action** is the gap between string and fret, measured at the 12th fret. If it’s too high, fretting is tiring and fretted notes sound sharp. If it’s too low, the strings buzz. The easiest way to change it is the **bridge**: bridges come in different heights. A freshly tightened head also lifts the strings a little.',
          fr: 'La **hauteur des cordes** est l’écart entre la corde et la frette, mesuré à la 12e case. Trop haute, appuyer est fatigant et les notes sonnent trop haut. Trop basse, les cordes frisent. Le plus simple est de jouer sur le **chevalet** : il en existe de différentes hauteurs. Une peau fraîchement retendue relève aussi un peu les cordes.',
        },
      },
      { h2: { de: 'Ab hier: Werkstatt', en: 'From here on: repair shop', fr: 'À partir d’ici : l’atelier' } },
      {
        p: {
          de: 'Diese Arbeiten gehören in erfahrene Hände oder in eine Werkstatt für Saiteninstrumente:',
          en: 'These jobs belong in experienced hands or in a repair shop for string instruments:',
          fr: 'Ces travaux sont à confier à des mains expérimentées ou à un atelier de lutherie :',
        },
      },
      {
        ul: [
          { de: 'den **Halsstab** im Hals verstellen', en: 'adjusting the **truss rod** inside the neck', fr: 'régler la **tige de réglage** dans le manche' },
          { de: 'den **Halswinkel** ändern, etwa über die Stangen im Inneren des Korpus', en: 'changing the **neck angle**, for example with the rods inside the pot', fr: 'modifier l’**angle du manche**, par exemple avec les tiges à l’intérieur du fût' },
          { de: 'ein neues Fell aufziehen, wenn ihr das noch nie gemacht habt', en: 'fitting a new head if you’ve never done it before', fr: 'poser une nouvelle peau si vous ne l’avez jamais fait' },
          { de: 'Steg oder Sattel abschleifen, Kerben neu feilen, Bundstäbchen bearbeiten', en: 'sanding the bridge or nut, recutting slots, working on the frets', fr: 'poncer le chevalet ou le sillet, refaire les fentes, travailler les frettes' },
          { de: 'Risse im Holz oder ein lockerer Hals', en: 'cracks in the wood or a loose neck', fr: 'fissures dans le bois ou manche qui bouge' },
        ],
      },
      {
        p: {
          de: 'Wie du die Saiten stimmst, steht in [Banjo stimmen](wissen:banjo-stimmen). Schnarrt eine Saite nur bei einem bestimmten Griff, liegt es oft an der Greifhand – siehe [Saite schnarrt oder klingt dumpf?](wissen:saubere-griffe).',
          en: 'How to tune the strings is explained in [Tuning the banjo](wissen:banjo-stimmen). If a string only buzzes in one particular chord, it’s often the fretting hand – see [String buzzing or sounding dull?](wissen:saubere-griffe).',
          fr: 'Pour accorder les cordes, lis [Accorder le banjo](wissen:banjo-stimmen). Si une corde ne frise que sur un accord précis, c’est souvent la main gauche – voir [La corde frise ou sonne étouffée ?](wissen:saubere-griffe).',
        },
      },
    ],
    related: ['banjo-stimmen', 'banjo-saiten', 'saiten-wechseln-pflege', 'saubere-griffe'],
    published: '2026-10-11',
  },
  {
    id: 'banjo-clawhammer',
    slug: { de: 'clawhammer-banjo-lernen', en: 'clawhammer-banjo-for-beginners', fr: 'banjo-clawhammer-debutant' },
    instruments: ['banjo'],
    category: 'technik',
    title: {
      de: 'Clawhammer: der andere Banjo-Anschlag für Einsteiger',
      en: 'Clawhammer: the Other Way to Play the Banjo, for Beginners',
      fr: 'Le clawhammer : l’autre façon de jouer du banjo, pour débuter',
    },
    description: {
      de: 'Beim Clawhammer schlägt die Hand wie eine Kralle nach unten, ganz ohne Fingerpicks. So lernst du den Grundschlag „Bum-di-ty“ Schritt für Schritt.',
      en: 'In clawhammer the hand strikes down like a claw, without any fingerpicks. Learn the basic “bum-ditty” stroke step by step.',
      fr: 'En clawhammer, la main frappe vers le bas comme une griffe, sans onglets. Apprends le coup de base « boum-di-ty » étape par étape.',
    },
    blocks: [
      {
        p: {
          de: 'Es gibt zwei große Arten, das fünfsaitige Banjo anzuschlagen. Beim **Picking** zupfen Daumen, Zeige- und Mittelfinger mit Fingerpicks nach oben – das sind die [Banjo-Rolls](wissen:banjo-rolls). Beim **Clawhammer** ist es umgekehrt: Die Hand formt eine Kralle und schlägt mit dem **Fingernagel nach unten** auf die Saite, der Daumen zupft die kurze 5. Saite. Der Klang ist weicher und rollender, typisch für alte amerikanische Tanzmusik.',
          en: 'There are two main ways to play the five-string banjo. In **picking** the thumb, index and middle finger pluck upwards with fingerpicks – those are the [banjo rolls](wissen:banjo-rolls). **Clawhammer** works the other way round: the hand forms a claw and strikes **down with the fingernail**, while the thumb plucks the short 5th string. The sound is softer and more rolling, typical of old American dance music.',
          fr: 'Il y a deux grandes façons de jouer du banjo à cinq cordes. En **picking**, le pouce, l’index et le majeur pincent vers le haut avec des onglets – ce sont les [rolls de banjo](wissen:banjo-rolls). En **clawhammer**, c’est l’inverse : la main forme une griffe et frappe la corde **vers le bas avec l’ongle**, et le pouce pince la petite 5e corde. Le son est plus doux et plus roulant, typique des anciennes musiques à danser américaines.',
        },
      },
      { h2: { de: 'Die Hand als Kralle', en: 'The hand as a claw', fr: 'La main en griffe' } },
      {
        ul: [
          {
            de: 'Mach eine lockere halbe Faust. Der **Mittelfinger** (oder der Zeigefinger) steht ein Stück vor – er ist dein „Hammer“.',
            en: 'Make a loose half fist. Your **middle finger** (or index finger) sticks out a little – it’s your “hammer”.',
            fr: 'Fais un poing à moitié fermé et détendu. Le **majeur** (ou l’index) dépasse un peu – c’est ton « marteau ».',
          },
          {
            de: 'Der **Daumen** zeigt zur Seite und liegt bereit an der 5. Saite.',
            en: 'Your **thumb** points sideways and waits by the 5th string.',
            fr: 'Le **pouce** pointe sur le côté, prêt près de la 5e corde.',
          },
          {
            de: 'Die Bewegung kommt aus **Handgelenk und Unterarm**, wie beim Anklopfen an eine Tür. Der Finger selbst bleibt fest und zupft nicht.',
            en: 'The movement comes from the **wrist and forearm**, like knocking on a door. The finger itself stays firm and doesn’t pluck.',
            fr: 'Le mouvement vient du **poignet et de l’avant-bras**, comme quand on frappe à une porte. Le doigt reste ferme et ne pince pas.',
          },
          {
            de: 'Gespielt wird ohne Fingerpicks, nur mit dem eigenen Nagel. Ein nicht zu kurzer Nagel am Schlagfinger hilft.',
            en: 'It’s played without fingerpicks, just with your own nail. A nail that isn’t too short on the striking finger helps.',
            fr: 'On joue sans onglets, avec son propre ongle. Un ongle pas trop court sur le doigt qui frappe aide.',
          },
        ],
      },
      { h2: { de: 'Der Grundschlag: „Bum-di-ty“', en: 'The basic stroke: “bum-ditty”', fr: 'Le coup de base : « boum-di-ty »' } },
      {
        p: {
          de: 'Fast alles im Clawhammer baut auf einem Muster aus drei Teilen auf. Sprich es laut mit: „**Bum** – **di**-**ty**“. Das „Bum“ ist ein langer Ton (ein ganzer Schlag), „di“ und „ty“ sind zwei kurze (zusammen ein Schlag). Gezählt: „1 – 2 und“.',
          en: 'Almost everything in clawhammer is built on a three-part pattern. Say it out loud: “**bum** – **dit**-**ty**”. The “bum” is a long note (a whole beat), “dit” and “ty” are two short ones (one beat together). Counted: “1 – 2 and”.',
          fr: 'Presque tout le clawhammer repose sur un motif en trois parties. Dis-le à voix haute : « **boum** – **di**-**ty** ». Le « boum » est une note longue (un temps entier), « di » et « ty » deux notes courtes (un temps à elles deux). En comptant : « 1 – 2 et ».',
        },
      },
      {
        ol: [
          {
            de: '**Bum:** Der Nagel schlägt nach unten auf **eine** Saite, zum Beispiel die 3. Saite (G). Danach bleibt der Finger an der nächsten Saite liegen.',
            en: '**Bum:** the nail strikes down on **one** string, for example the 3rd string (G). Afterwards the finger comes to rest on the next string.',
            fr: '**Boum :** l’ongle frappe vers le bas **une seule** corde, par exemple la 3e corde (Sol). Ensuite le doigt reste posé sur la corde suivante.',
          },
          {
            de: '**Di:** Die Hand streicht mit dem Nagel nach unten über **mehrere** Saiten, meist die hohen drei oder zwei.',
            en: '**Dit:** the hand brushes down across **several** strings with the nail, usually the top two or three.',
            fr: '**Di :** la main balaie vers le bas **plusieurs** cordes avec l’ongle, en général les deux ou trois plus aiguës.',
          },
          {
            de: '**Ty:** Während der Abwärtsbewegung hat sich der Daumen auf die 5. Saite gelegt. Wenn die Hand wieder hochkommt, rutscht der Daumen ab und die 5. Saite klingt.',
            en: '**Ty:** during the down movement your thumb has landed on the 5th string. As the hand comes back up, the thumb slips off and the 5th string rings.',
            fr: '**Ty :** pendant le mouvement vers le bas, le pouce s’est posé sur la 5e corde. Quand la main remonte, le pouce glisse et la 5e corde sonne.',
          },
        ],
      },
      { h2: { de: 'So übst du', en: 'How to practise', fr: 'Comment t’entraîner' } },
      {
        ol: [
          {
            de: 'Stell das Metronom auf 60. Übe erst nur das „Bum“ auf der 3. Saite, auf jeden Klick.',
            en: 'Set the metronome to 60. First practise only the “bum” on the 3rd string, on every click.',
            fr: 'Règle le métronome sur 60. Travaille d’abord seulement le « boum » sur la 3e corde, à chaque clic.',
          },
          {
            de: 'Dann „Bum – di“: Schlag, dann über die hohen Saiten streichen.',
            en: 'Then “bum – dit”: strike, then brush across the high strings.',
            fr: 'Puis « boum – di » : frappe, puis balaie les cordes aiguës.',
          },
          {
            de: 'Zuletzt kommt der Daumen dazu. Wenn es holpert, lass das Metronom langsamer laufen – nicht die Bewegung abkürzen.',
            en: 'Finally add the thumb. If it stumbles, slow the metronome down – don’t cut the movement short.',
            fr: 'Ajoute enfin le pouce. Si ça accroche, ralentis le métronome – sans raccourcir le mouvement.',
          },
          {
            de: 'Klappt es, wechsle beim „Bum“ zwischen den Saiten und greif mit der linken Hand einfache Akkorde wie G und C.',
            en: 'Once it works, switch strings for the “bum” and fret simple chords such as G and C with your other hand.',
            fr: 'Quand ça marche, change de corde pour le « boum » et fais des accords simples comme G et C avec l’autre main.',
          },
        ],
      },
      { tool: 'rhythmus' },
      { chord: 'G' },
      { chord: 'C' },
      { h2: { de: 'Stimmungen und Lieder', en: 'Tunings and songs', fr: 'Accordages et chansons' } },
      {
        p: {
          de: 'Clawhammer klappt in der normalen Open-G-Stimmung. Viele Clawhammer-Spieler mögen auch die Stimmungen **Double C** und **G-Modal** – mehr dazu in [Banjo-Stimmungen Double C und G-Modal](wissen:banjo-double-c-g-modal). Zum Üben passen einfache Lieder mit wenigen Akkorden, etwa [Skip to My Lou](lied:skip-to-my-lou) oder [Oh My Darling, Clementine](lied:clementine).',
          en: 'Clawhammer works in the normal open G tuning. Many clawhammer players also like the **double C** and **G modal** tunings – more in [Banjo tunings double C and G modal](wissen:banjo-double-c-g-modal). Simple songs with few chords are great for practice, such as [Skip to My Lou](lied:skip-to-my-lou) or [Oh My Darling, Clementine](lied:clementine).',
          fr: 'Le clawhammer marche dans l’accordage habituel en Sol ouvert. Beaucoup aiment aussi les accordages **Double C** et **G modal** – plus d’infos dans [Accordages de banjo Double C et G modal](wissen:banjo-double-c-g-modal). Pour t’entraîner, choisis des chansons simples avec peu d’accords, comme [Skip to My Lou](lied:skip-to-my-lou) ou [Oh My Darling, Clementine](lied:clementine).',
        },
      },
      {
        tip: {
          de: 'Der Daumen schlägt nie aktiv nach oben. Er liegt einfach im Weg, und die Handbewegung nach oben lässt die 5. Saite klingen. Das fühlt sich erst seltsam an und wird dann ganz natürlich.',
          en: 'The thumb never actively plucks upwards. It just sits in the way, and the hand moving back up makes the 5th string ring. That feels strange at first and then becomes completely natural.',
          fr: 'Le pouce ne pince jamais activement vers le haut. Il est simplement sur le chemin, et c’est la main qui remonte qui fait sonner la 5e corde. Ça paraît étrange au début, puis ça devient tout naturel.',
        },
      },
    ],
    related: ['banjo-rolls', 'banjo-double-c-g-modal', 'banjo-halten', 'mit-metronom-ueben'],
    published: '2026-10-11',
  },
  {
    id: 'tenorbanjo-irish',
    slug: { de: 'tenorbanjo-irish-folk-gdae-cgda', en: 'tenor-banjo-irish-gdae-or-cgda', fr: 'banjo-tenor-irlandais-gdae-cgda' },
    instruments: ['banjo', 'mandoline'],
    category: 'instrument',
    title: {
      de: 'Tenorbanjo für Irish Folk: GDAE oder CGDA – und welche Saiten?',
      en: 'Tenor Banjo for Irish Music: GDAE or CGDA – and Which Strings?',
      fr: 'Banjo ténor pour la musique irlandaise : GDAE ou CGDA – et quelles cordes ?',
    },
    description: {
      de: 'Das viersaitige Tenorbanjo gibt es in zwei Stimmungen. Was GDAE und CGDA unterscheidet, welche Saiten du brauchst – und warum Mandolinen-Griffe passen.',
      en: 'The four-string tenor banjo comes in two tunings. What sets GDAE and CGDA apart, which strings you need – and why mandolin fingerings fit.',
      fr: 'Le banjo ténor à quatre cordes existe en deux accordages. Ce qui distingue GDAE et CGDA, quelles cordes choisir – et pourquoi les doigtés de mandoline vont.',
    },
    blocks: [
      {
        p: {
          de: 'Das **Tenorbanjo** hat vier gleich lange Saiten, keine kurze 5. Saite, und wird mit einem **Plektrum** gespielt. In irischen Sessions spielt es meist die Melodie – Jigs, Reels und Polkas – zusammen mit Geige, Flöte und Akkordeon. Es gibt zwei übliche Stimmungen, und die Wahl hängt davon ab, welche Musik du spielen willst.',
          en: 'The **tenor banjo** has four strings of equal length, no short 5th string, and is played with a **pick**. In Irish sessions it usually plays the melody – jigs, reels and polkas – along with fiddle, flute and accordion. There are two common tunings, and the choice depends on the music you want to play.',
          fr: 'Le **banjo ténor** a quatre cordes de même longueur, pas de petite 5e corde, et se joue au **médiator**. Dans les sessions irlandaises, il joue en général la mélodie – gigues, reels et polkas – avec le violon, la flûte et l’accordéon. Il existe deux accordages courants, et le choix dépend de la musique que tu veux jouer.',
        },
      },
      { h2: { de: 'GDAE: die irische Stimmung', en: 'GDAE: the Irish tuning', fr: 'GDAE : l’accordage irlandais' } },
      {
        p: {
          de: 'In **G D A E** ist das Tenorbanjo gestimmt wie Geige und Mandoline, nur **eine Oktave tiefer**. Der große Vorteil: Melodien liegen auf dem Griffbrett genauso wie auf Geige und Mandoline. Wer eins davon kann, findet sich schnell zurecht. Die allermeisten Banjospieler in der irischen Musik nutzen diese Stimmung.',
          en: 'In **G D A E** the tenor banjo is tuned like the fiddle and mandolin, just **one octave lower**. The big advantage: melodies lie on the fretboard exactly as on fiddle and mandolin. If you can play one of them, you’ll find your way quickly. The vast majority of banjo players in Irish music use this tuning.',
          fr: 'En **G D A E**, le banjo ténor est accordé comme le violon et la mandoline, mais **une octave plus bas**. Le grand avantage : les mélodies se placent sur le manche exactement comme au violon et à la mandoline. Si tu joues déjà de l’un d’eux, tu t’y retrouves vite. La grande majorité des banjoïstes de musique irlandaise utilisent cet accordage.',
        },
      },
      { h2: { de: 'CGDA: die klassische Tenor-Stimmung', en: 'CGDA: the classic tenor tuning', fr: 'CGDA : l’accordage ténor classique' } },
      {
        p: {
          de: 'In **C G D A** klingt das Tenorbanjo heller und knackiger. So wurde es ursprünglich gestimmt, vor allem für Jazz und Dixieland, wo es Akkorde im Rhythmus schlägt. Die Töne entsprechen genau der Bratsche. Die Griffformen sind dieselben wie bei GDAE, weil beide Stimmungen in Quinten gehen – sie heißen aber anders: Was in GDAE ein G ist, ist in CGDA ein C.',
          en: 'In **C G D A** the tenor banjo sounds brighter and punchier. That was its original tuning, mainly for jazz and Dixieland, where it strums chords in rhythm. The notes are exactly those of the viola. The chord shapes are the same as in GDAE, because both tunings go in fifths – but they have different names: what’s a G in GDAE is a C in CGDA.',
          fr: 'En **C G D A**, le banjo ténor sonne plus clair et plus incisif. C’est son accordage d’origine, surtout pour le jazz et le dixieland, où il joue des accords en rythme. Les notes sont exactement celles de l’alto. Les formes d’accords sont les mêmes qu’en GDAE, car les deux accordages sont en quintes – mais elles changent de nom : ce qui est un G en GDAE est un C en CGDA.',
        },
      },
      { h2: { de: 'Welche Saiten?', en: 'Which strings?', fr: 'Quelles cordes ?' } },
      {
        ul: [
          {
            de: 'Für **GDAE** brauchst du einen Saitensatz, der **ausdrücklich für diese Stimmung** gedacht ist (oft „Irish“ genannt). Die Saiten, vor allem das tiefe G, sind deutlich dicker. Ein CGDA-Satz einfach tiefer gestimmt wäre viel zu schlaff und würde schnarren.',
            en: 'For **GDAE** you need a string set **made for that tuning** (often labelled “Irish”). The strings, especially the low G, are much thicker. A CGDA set simply tuned down would be far too floppy and would buzz.',
            fr: 'Pour **GDAE**, il te faut un jeu de cordes **prévu pour cet accordage** (souvent appelé « Irish »). Les cordes, surtout le Sol grave, sont bien plus épaisses. Un jeu CGDA simplement accordé plus bas serait beaucoup trop mou et friserait.',
          },
          {
            de: 'Wer von CGDA auf GDAE umstellt, braucht manchmal breitere Kerben im Sattel für die dickeren Saiten. Das macht am besten eine Werkstatt.',
            en: 'If you switch from CGDA to GDAE, the nut slots sometimes need widening for the thicker strings. Best left to a repair shop.',
            fr: 'En passant de CGDA à GDAE, il faut parfois élargir les fentes du sillet pour les cordes plus épaisses. Mieux vaut confier ça à un atelier.',
          },
          {
            de: 'Tenorbanjos gibt es mit kürzerem Hals (17 Bünde) und längerem Hals (19 Bünde). Für irische Melodien greifen viele zum kürzeren, weil die Abstände zwischen den Bünden kleiner sind.',
            en: 'Tenor banjos come with a shorter neck (17 frets) and a longer one (19 frets). For Irish tunes many prefer the shorter one, because the frets are closer together.',
            fr: 'Il existe des banjos ténor à manche court (17 cases) et à manche long (19 cases). Pour les airs irlandais, beaucoup préfèrent le court, car les cases sont plus rapprochées.',
          },
        ],
      },
      { h2: { de: 'Und in dieser App?', en: 'And in this app?', fr: 'Et dans cette appli ?' } },
      {
        p: {
          de: 'Ehrlich gesagt: Ein Tenorbanjo gibt es in der App nicht. Die Banjo-Seite ist für das fünfsaitige Banjo. Spielst du in **GDAE**, nimm die **Mandoline**: Griffbilder, Akkordnamen und Melodien passen genau, sie klingen auf dem Banjo nur eine Oktave tiefer. Das Stimmgerät der Mandoline erwartet die Töne allerdings eine Oktave höher – zum Stimmen brauchst du deshalb ein Stimmgerät, das jeden Ton anzeigt.',
          en: 'To be honest: there’s no tenor banjo in the app. The banjo page is for the five-string banjo. If you play in **GDAE**, use the **mandolin**: chord diagrams, chord names and melodies fit exactly, they just sound an octave lower on the banjo. The mandolin tuner, however, expects the notes an octave higher – so for tuning you need a tuner that shows any note.',
          fr: 'Pour être honnête : il n’y a pas de banjo ténor dans l’appli. La page banjo est faite pour le banjo à cinq cordes. Si tu joues en **GDAE**, prends la **mandoline** : diagrammes, noms d’accords et mélodies correspondent exactement, ils sonnent juste une octave plus bas au banjo. L’accordeur de la mandoline attend cependant les notes une octave plus haut – pour accorder, il te faut donc un accordeur qui affiche toutes les notes.',
        },
      },
      {
        tip: {
          de: 'Der Hals eines Tenorbanjos ist länger als der einer Mandoline. Viele greifen darum nicht mit einem Finger pro Bund, sondern nehmen Zeige-, Mittel- und kleinen Finger und rutschen für weite Griffe etwas mit der Hand.',
          en: 'A tenor banjo neck is longer than a mandolin’s. So many players don’t use one finger per fret, but index, middle and little finger, shifting the hand a little for wide stretches.',
          fr: 'Le manche d’un banjo ténor est plus long que celui d’une mandoline. Beaucoup ne jouent donc pas avec un doigt par case, mais avec l’index, le majeur et l’auriculaire, en déplaçant un peu la main pour les grands écarts.',
        },
      },
    ],
    related: ['banjo-kinder', 'mandoline-und-geige', 'mandoline-erste-akkorde', 'gitarrenbanjo', 'mandoline-wie-gitarre'],
    published: '2026-10-11',
  },
  {
    id: 'gitarrenbanjo',
    slug: { de: 'gitarrenbanjo-sechssaitig', en: 'six-string-banjo-guitar-tuning', fr: 'banjo-six-cordes-accorde-comme-guitare' },
    instruments: ['banjo', 'gitarre'],
    category: 'instrument',
    title: {
      de: 'Gitarrenbanjo (6 Saiten): gestimmt wie die Gitarre',
      en: 'Six-String Banjo: Tuned Just Like a Guitar',
      fr: 'Le banjo à six cordes : accordé comme une guitare',
    },
    description: {
      de: 'Das Gitarrenbanjo hat sechs Saiten und ist wie eine Gitarre gestimmt (E A D G B E). Alle Gitarrengriffe passen – nur Fell und Steg brauchen Banjo-Pflege.',
      en: 'The six-string banjo is tuned like a guitar (E A D G B E). Every guitar chord works – only the head and bridge need banjo-style care.',
      fr: 'Le banjo à six cordes s’accorde comme une guitare (E A D G B E). Tous les accords de guitare marchent – seuls la peau et le chevalet demandent un soin de banjo.',
    },
    blocks: [
      {
        p: {
          de: 'Ein **Gitarrenbanjo** sieht aus wie ein Banjo – runder Korpus mit Fell, loser Steg – hat aber **sechs Saiten** und einen Gitarrenhals. Gestimmt ist es genau wie eine Gitarre: **E A D G B E**. Es klingt hell und knackig nach Banjo, wird aber gegriffen wie eine Gitarre.',
          en: 'A **six-string banjo** looks like a banjo – round body with a head, floating bridge – but has **six strings** and a guitar neck. It’s tuned exactly like a guitar: **E A D G B E**. It sounds bright and crisp like a banjo, but you fret it like a guitar.',
          fr: 'Un **banjo à six cordes** ressemble à un banjo – caisse ronde avec une peau, chevalet mobile – mais a **six cordes** et un manche de guitare. Il s’accorde exactement comme une guitare : **E A D G B E**. Il sonne clair et vif comme un banjo, mais se joue comme une guitare.',
        },
      },
      { h2: { de: 'Für wen ist das gut?', en: 'Who is it for?', fr: 'Pour qui ?' } },
      {
        p: {
          de: 'Für alle, die schon Gitarre spielen und den Banjo-Klang mögen. Du musst keine neuen Griffe lernen: Jeder Akkord, jedes Lied und jedes Zupfmuster von der Gitarre funktioniert sofort. Auch ein Kapodaster sitzt wie auf der Gitarre.',
          en: 'For anyone who already plays guitar and loves the banjo sound. You don’t have to learn new chords: every chord, every song and every picking pattern from the guitar works right away. A capo fits just like on the guitar, too.',
          fr: 'Pour tous ceux qui jouent déjà de la guitare et aiment le son du banjo. Pas besoin d’apprendre de nouveaux accords : chaque accord, chaque chanson et chaque arpège de guitare marche tout de suite. Le capodastre se pose aussi comme sur une guitare.',
        },
      },
      { h2: { de: 'Was anders ist als beim fünfsaitigen Banjo', en: 'How it differs from the five-string banjo', fr: 'Ce qui change par rapport au banjo à cinq cordes' } },
      {
        ul: [
          {
            de: 'Es fehlt die kurze, hohe **5. Saite**, die beim klassischen Banjo bei jedem Roll mitklingt. Dadurch klingt das Gitarrenbanjo weniger nach Bluegrass, eher nach einer sehr hellen Gitarre.',
            en: 'The short, high **5th string** that rings in every roll on a classic banjo is missing. So the six-string banjo sounds less like bluegrass and more like a very bright guitar.',
            fr: 'Il manque la petite **5e corde** aiguë qui sonne dans chaque roll sur un banjo classique. Le banjo à six cordes sonne donc moins bluegrass, plutôt comme une guitare très claire.',
          },
          {
            de: 'Die Griffe des fünfsaitigen Banjos in Open G passen **nicht** – dort ist alles anders gestimmt.',
            en: 'Chord shapes from the five-string banjo in open G do **not** fit – everything is tuned differently there.',
            fr: 'Les doigtés du banjo à cinq cordes en Sol ouvert ne vont **pas** – tout y est accordé autrement.',
          },
          {
            de: 'Fell und loser Steg brauchen dieselbe Pflege wie bei jedem Banjo: Steg-Position prüfen, Fell ab und zu nachspannen.',
            en: 'The head and floating bridge need the same care as on any banjo: check the bridge position and tighten the head now and then.',
            fr: 'La peau et le chevalet mobile demandent le même soin que sur tout banjo : vérifier la place du chevalet et retendre la peau de temps en temps.',
          },
          {
            de: 'Saiten: Nimm leichte Stahlsaiten, wie sie für das Instrument empfohlen werden. Zu dicke Saiten belasten Steg und Fell stark.',
            en: 'Strings: use light steel strings as recommended for the instrument. Strings that are too heavy put a lot of strain on the bridge and head.',
            fr: 'Cordes : prends des cordes en acier légères, comme recommandé pour l’instrument. Des cordes trop grosses fatiguent beaucoup le chevalet et la peau.',
          },
        ],
      },
      { h2: { de: 'Und in dieser App?', en: 'And in this app?', fr: 'Et dans cette appli ?' } },
      {
        p: {
          de: 'Für ein Gitarrenbanjo wählst du in der App die **Gitarre**. Stimmgerät, Griffbilder, Lieder und Blues passen dann genau. Die Banjo-Seite dagegen gehört zum fünfsaitigen Banjo in Open G. Wichtiges über Akkordwechsel steht in [Akkordwechsel schneller lernen](wissen:akkordwechsel-schneller).',
          en: 'For a six-string banjo, choose the **guitar** in the app. Tuner, chord diagrams, songs and blues then fit exactly. The banjo page, on the other hand, is for the five-string banjo in open G. Useful tips on changing chords are in [Change chords faster](wissen:akkordwechsel-schneller).',
          fr: 'Pour un banjo à six cordes, choisis la **guitare** dans l’appli. Accordeur, diagrammes, chansons et blues correspondent alors exactement. La page banjo, elle, est faite pour le banjo à cinq cordes en Sol ouvert. Des conseils pour changer d’accord se trouvent dans [Changer d’accord plus vite](wissen:akkordwechsel-schneller).',
        },
      },
      {
        tip: {
          de: 'Weil ein Banjo-Fell sehr laut ist, klingt ein Gitarrenbanjo neben anderen Gitarren gut heraus. In der Gruppe reicht oft ein sanfter Anschlag.',
          en: 'Because a banjo head is very loud, a six-string banjo cuts through nicely next to other guitars. In a group a gentle stroke is often enough.',
          fr: 'Comme une peau de banjo est très sonore, un banjo à six cordes ressort bien à côté d’autres guitares. En groupe, une attaque douce suffit souvent.',
        },
      },
    ],
    related: ['banjo-kinder', 'gitarre-akkorde', 'banjo-einstellen', 'gitarre-kapodaster', 'tenorbanjo-irish'],
    published: '2026-10-11',
  },
  {
    id: 'mandoline-alt-gefunden',
    slug: { de: 'alte-mandoline-saiten-steg-stimmen', en: 'old-mandolin-strings-bridge-tuning', fr: 'vieille-mandoline-cordes-chevalet-accordage' },
    instruments: ['mandoline'],
    category: 'instrument',
    title: {
      de: 'Alte Mandoline gefunden – Saiten, Steg und Stimmen',
      en: 'Found an Old Mandolin? Strings, Bridge and Tuning',
      fr: 'Tu as trouvé une vieille mandoline ? Cordes, chevalet et accordage',
    },
    description: {
      de: 'Eine Mandoline vom Dachboden wieder spielbar machen: worauf du achtest, welche Saiten passen, wo der lose Steg hingehört und wann die Werkstatt helfen sollte.',
      en: 'Bringing an attic mandolin back to life: what to check, which strings fit, where the floating bridge belongs and when a repair shop should help.',
      fr: 'Remettre en état une mandoline du grenier : quoi vérifier, quelles cordes choisir, où placer le chevalet mobile et quand faire appel à un atelier.',
    },
    blocks: [
      {
        p: {
          de: 'Auf vielen Dachböden liegen Mandolinen von Großeltern oder Urgroßeltern – früher waren Mandolinenorchester sehr beliebt. Oft lässt sich so ein Instrument mit wenig Aufwand wieder spielbar machen. Wichtig ist, behutsam vorzugehen: Alte Instrumente sind empfindlich.',
          en: 'Many attics hold mandolins that belonged to grandparents or great-grandparents – mandolin orchestras used to be very popular. Often such an instrument can be made playable again with little effort. The key is to go gently: old instruments are delicate.',
          fr: 'Beaucoup de greniers cachent des mandolines de grands-parents ou d’arrière-grands-parents – les orchestres de mandolines étaient autrefois très populaires. Souvent, un tel instrument redevient jouable sans grand effort. L’important est d’y aller doucement : les vieux instruments sont fragiles.',
        },
      },
      { h2: { de: 'Erst einmal anschauen', en: 'Take a good look first', fr: 'D’abord, bien regarder' } },
      {
        ul: [
          { de: '**Risse** in der Decke (oben), im Boden oder an den Seiten?', en: '**Cracks** in the top, back or sides?', fr: 'Des **fissures** sur la table, le fond ou les côtés ?' },
          { de: 'Ist die **Decke hinter dem Steg eingesunken**? Leg ein Lineal quer darüber und schau, ob Licht durchscheint.', en: 'Has the **top sunk in behind the bridge**? Lay a ruler across it and see if light shows underneath.', fr: 'La **table est-elle affaissée derrière le chevalet** ? Pose une règle en travers et regarde si la lumière passe dessous.' },
          { de: 'Ist der **Hals gerade**? Schau vom Kopf aus am Griffbrett entlang wie über einen Gewehrlauf.', en: 'Is the **neck straight**? Sight along the fretboard from the headstock.', fr: 'Le **manche est-il droit** ? Vise le long de la touche depuis la tête.' },
          { de: 'Drehen sich die **Mechaniken**? Sind die Bundstäbchen sehr abgenutzt?', en: 'Do the **tuners** turn? Are the frets badly worn?', fr: 'Les **mécaniques** tournent-elles ? Les frettes sont-elles très usées ?' },
        ],
      },
      {
        p: {
          de: 'Findest du große Risse, eine eingesunkene Decke oder einen krummen Hals, bring die Mandoline erst in eine Werkstatt, bevor du Saiten aufziehst. Saitenzug kann Schäden sonst verschlimmern.',
          en: 'If you find large cracks, a sunken top or a bent neck, take the mandolin to a repair shop before fitting strings. String tension could otherwise make the damage worse.',
          fr: 'Si tu trouves de grosses fissures, une table affaissée ou un manche tordu, apporte la mandoline à un atelier avant de mettre des cordes. Sinon, la tension des cordes pourrait aggraver les dégâts.',
        },
      },
      { h2: { de: 'Welche Bauart ist es?', en: 'What kind is it?', fr: 'Quel type de mandoline ?' } },
      {
        p: {
          de: 'Viele alte Mandolinen haben einen **gewölbten Rücken aus vielen schmalen Holzspänen** – das ist die neapolitanische Bauart. Andere haben einen flachen oder leicht gewölbten Boden. Beide haben **acht Saiten in vier Paaren** und werden gleich gestimmt. Die gewölbten sind besonders leicht gebaut. Für sie sind **leichte Saiten** am schonendsten.',
          en: 'Many old mandolins have a **rounded back made of many narrow wooden ribs** – that’s the Neapolitan style. Others have a flat or slightly arched back. Both have **eight strings in four pairs** and are tuned the same way. The bowl-back ones are built especially lightly. **Light strings** are the gentlest choice for them.',
          fr: 'Beaucoup de vieilles mandolines ont un **dos bombé fait de nombreuses fines côtes de bois** – c’est le modèle napolitain. D’autres ont un fond plat ou légèrement bombé. Toutes ont **huit cordes en quatre paires** et s’accordent de la même façon. Les mandolines à dos bombé sont très légères. Pour elles, des **cordes légères** sont le plus sûr.',
        },
      },
      { h2: { de: 'Neue Saiten aufziehen', en: 'Fitting new strings', fr: 'Mettre de nouvelles cordes' } },
      {
        ul: [
          {
            de: 'Alte, rostige Saiten kommen alle runter. Neue Mandolinensaiten haben meist eine **Schlaufe** am Ende, die über kleine Stifte am Saitenhalter gehängt wird.',
            en: 'Old, rusty strings all come off. New mandolin strings usually have a **loop** at the end that hooks over small pins on the tailpiece.',
            fr: 'Les vieilles cordes rouillées s’enlèvent toutes. Les cordes de mandoline neuves ont en général une **boucle** au bout, qu’on accroche à de petits ergots du cordier.',
          },
          {
            de: 'Steht der Steg noch, wechsle **Paar für Paar**, damit er stehen bleibt.',
            en: 'If the bridge is still standing, change **one pair at a time** so it stays in place.',
            fr: 'Si le chevalet tient encore, change les cordes **paire par paire** pour qu’il reste en place.',
          },
          {
            de: 'Zieh die Saiten nicht in einem Rutsch auf Tonhöhe, sondern in zwei, drei Runden. Schau zwischendurch, ob sich etwas verzieht oder knackt.',
            en: 'Don’t bring the strings up to pitch in one go, but in two or three rounds. Check in between whether anything bends or creaks.',
            fr: 'Ne monte pas les cordes à la bonne hauteur d’un seul coup, mais en deux ou trois tours. Vérifie entre-temps que rien ne se déforme ni ne craque.',
          },
        ],
      },
      { h2: { de: 'Wo gehört der Steg hin?', en: 'Where does the bridge go?', fr: 'Où placer le chevalet ?' } },
      {
        p: {
          de: 'Bei den meisten Mandolinen ist der Steg **nicht festgeklebt**, sondern wird vom Saitendruck gehalten. Ist er umgefallen, stell ihn so auf, dass der Abstand vom 12. Bund zum Steg etwa so groß ist wie vom Sattel zum 12. Bund. Seine Unterseite muss sich der Wölbung der Decke anpassen. Feineinstellung: Der gegriffene Ton im 12. Bund soll genau eine Oktave über der leeren Saite klingen. Zu hoch: Steg etwas vom Hals weg. Zu tief: Steg etwas zum Hals hin.',
          en: 'On most mandolins the bridge is **not glued**, but held by string pressure. If it has fallen over, place it so that the distance from the 12th fret to the bridge is about the same as from the nut to the 12th fret. Its underside must follow the curve of the top. Fine-tuning: the fretted note at the 12th fret should sound exactly one octave above the open string. Too high: move the bridge a little away from the neck. Too low: a little towards the neck.',
          fr: 'Sur la plupart des mandolines, le chevalet **n’est pas collé**, il tient par la pression des cordes. S’il est tombé, place-le de façon que la distance de la 12e case au chevalet soit à peu près égale à celle du sillet à la 12e case. Son dessous doit épouser la courbe de la table. Réglage fin : la note appuyée à la 12e case doit sonner exactement une octave au-dessus de la corde à vide. Trop haute : éloigne un peu le chevalet du manche. Trop basse : rapproche-le.',
        },
      },
      { h2: { de: 'Stimmen', en: 'Tuning', fr: 'Accorder' } },
      {
        p: {
          de: 'Gestimmt wird **G D A E**, die beiden Saiten eines Paares jeweils auf denselben Ton. Wie das genau geht, steht in [Mandoline stimmen](wissen:mandoline-stimmen). Neue Saiten dehnen sich in den ersten Tagen – stimm öfter nach.',
          en: 'The tuning is **G D A E**, with both strings of a pair on the same note. How exactly is explained in [Tuning the mandolin](wissen:mandoline-stimmen). New strings stretch during the first days – retune often.',
          fr: 'L’accordage est **G D A E**, les deux cordes d’une paire sur la même note. Tout est expliqué dans [Accorder la mandoline](wissen:mandoline-stimmen). Les cordes neuves se détendent les premiers jours – réaccorde souvent.',
        },
      },
      { tool: 'stimmen' },
      {
        tip: {
          de: 'Eine alte Mandoline aus der Familie ist oft mehr wert als ihr Preis. Eine Werkstatt kann einschätzen, ob sich eine Reparatur lohnt – und manchmal steckt im Kasten noch eine Geschichte, die die Großeltern erzählen können.',
          en: 'An old family mandolin is often worth more than its price. A repair shop can tell you whether a repair is worthwhile – and sometimes the case holds a story the grandparents can tell.',
          fr: 'Une vieille mandoline de famille vaut souvent plus que son prix. Un atelier peut dire si une réparation en vaut la peine – et parfois, l’étui cache une histoire que les grands-parents peuvent raconter.',
        },
      },
    ],
    related: ['mandoline-stimmen', 'saiten-wechseln-pflege', 'mandoline-erste-akkorde', 'mandoline-und-geige'],
    published: '2026-10-11',
  },
  {
    id: 'mandoline-chop-doppelgriffe',
    slug: { de: 'mandoline-chop-akkorde-doppelgriffe', en: 'mandolin-chop-chords-double-stops', fr: 'mandoline-accords-chop-doubles-cordes' },
    instruments: ['mandoline'],
    category: 'technik',
    title: {
      de: 'Chop-Akkorde und Doppelgriffe auf der Mandoline',
      en: 'Chop Chords and Double Stops on the Mandolin',
      fr: 'Accords « chop » et doubles cordes à la mandoline',
    },
    description: {
      de: 'Mit Chop-Akkorden wird die Mandoline zum Schlagzeug der Band, mit Doppelgriffen klingt die Melodie voller. Griffe, Übungen und Tipps für den Einstieg.',
      en: 'Chop chords turn the mandolin into the band’s drummer, double stops make melodies sound fuller. Shapes, exercises and tips to get started.',
      fr: 'Avec les accords « chop », la mandoline devient la batterie du groupe ; avec les doubles cordes, la mélodie sonne plus riche. Doigtés, exercices et conseils.',
    },
    blocks: [
      {
        p: {
          de: 'In der Folk- und Bluegrass-Musik hat die Mandoline zwei Aufgaben: Melodien spielen und den Rhythmus machen. Für den Rhythmus gibt es den **Chop**, einen kurzen, trockenen Akkord-Schlag. Für vollere Melodien gibt es **Doppelgriffe**: zwei Saitenpaare zugleich.',
          en: 'In folk and bluegrass the mandolin has two jobs: playing melodies and keeping the rhythm. For rhythm there’s the **chop**, a short, dry chord stroke. For fuller melodies there are **double stops**: two string pairs at once.',
          fr: 'En folk et en bluegrass, la mandoline a deux rôles : jouer des mélodies et marquer le rythme. Pour le rythme, il y a le **chop**, un coup d’accord court et sec. Pour des mélodies plus riches, il y a les **doubles cordes** : deux paires de cordes à la fois.',
        },
      },
      { h2: { de: 'Der Chop: Akkord wie eine Trommel', en: 'The chop: a chord like a drum', fr: 'Le chop : un accord comme un tambour' } },
      {
        p: {
          de: 'Für einen Chop brauchst du einen Griff **ohne leere Saiten**. Du schlägst ihn kurz nach unten an und lässt sofort danach den Druck der Greifhand locker – die Finger bleiben auf den Saiten liegen. So klingt der Akkord nur einen Augenblick: „tschack“. Gespielt wird meist auf **2 und 4**, wie die kleine Trommel im Schlagzeug.',
          en: 'A chop needs a chord **without open strings**. Strike it briefly downwards and right after release the pressure of your fretting hand – the fingers stay on the strings. That way the chord rings for just a moment: “chack”. It’s usually played on **2 and 4**, like the snare drum in a drum kit.',
          fr: 'Pour un chop, il faut un accord **sans corde à vide**. Gratte-le brièvement vers le bas et relâche tout de suite la pression de la main gauche – les doigts restent sur les cordes. L’accord ne sonne qu’un instant : « tchak ». On le joue en général sur **2 et 4**, comme la caisse claire d’une batterie.',
        },
      },
      { h2: { de: 'Eine Form für viele Akkorde', en: 'One shape for many chords', fr: 'Une forme pour beaucoup d’accords' } },
      {
        p: {
          de: 'Diese Form brauchst du für den Anfang. Die Zahlen sind die Bünde, von der G-Saite bis zur E-Saite: **2 – 2 – 4 – 5** ergibt **A-Dur**. Der Zeigefinger liegt quer über G- und D-Saitenpaar, der Ringfinger auf dem A-Paar, der kleine Finger auf dem E-Paar. Schiebst du die ganze Form den Hals hinauf, bekommst du weitere Dur-Akkorde:',
          en: 'This is the shape you need to start with. The numbers are frets, from the G string to the E string: **2 – 2 – 4 – 5** gives **A major**. Your index finger lies across the G and D pairs, the ring finger on the A pair and the little finger on the E pair. Slide the whole shape up the neck and you get more major chords:',
          fr: 'Voici la forme pour commencer. Les chiffres sont les cases, de la corde de Sol à celle de Mi : **2 – 2 – 4 – 5** donne **La majeur**. L’index est couché sur les paires de Sol et de Ré, l’annulaire sur la paire de La, l’auriculaire sur la paire de Mi. En glissant toute la forme vers le haut du manche, tu obtiens d’autres accords majeurs :',
        },
      },
      {
        ul: [
          { de: '**A:** 2 – 2 – 4 – 5', en: '**A:** 2 – 2 – 4 – 5', fr: '**A :** 2 – 2 – 4 – 5' },
          { de: '**B:** 4 – 4 – 6 – 7', en: '**B:** 4 – 4 – 6 – 7', fr: '**B :** 4 – 4 – 6 – 7' },
          { de: '**C:** 5 – 5 – 7 – 8', en: '**C:** 5 – 5 – 7 – 8', fr: '**C :** 5 – 5 – 7 – 8' },
          { de: '**D:** 7 – 7 – 9 – 10', en: '**D:** 7 – 7 – 9 – 10', fr: '**D :** 7 – 7 – 9 – 10' },
        ],
      },
      {
        p: {
          de: 'Für **G-Dur** gibt es eine zweite Form, die näher am Sattel liegt: **4 – 5 – 5 – 7**. Mit G, C und D in diesen Formen kannst du schon viele Lieder in G-Dur begleiten.',
          en: 'For **G major** there’s a second shape closer to the nut: **4 – 5 – 5 – 7**. With G, C and D in these shapes you can already back lots of songs in G major.',
          fr: 'Pour **Sol majeur**, il existe une deuxième forme plus près du sillet : **4 – 5 – 5 – 7**. Avec G, C et D dans ces formes, tu peux déjà accompagner beaucoup de chansons en Sol majeur.',
        },
      },
      {
        tip: {
          de: 'Diese Griffe brauchen Kraft und Spannweite. Übe sie zuerst ganz ruhig und nur kurz. Wenn die Hand müde wird, Pause – das ist am Anfang ganz normal.',
          en: 'These shapes need strength and stretch. Practise them slowly and only briefly at first. When your hand gets tired, take a break – that’s completely normal at the start.',
          fr: 'Ces accords demandent de la force et de l’écart. Travaille-les d’abord calmement et peu de temps. Quand la main fatigue, fais une pause – c’est tout à fait normal au début.',
        },
      },
      {
        p: {
          de: 'Üben mit dem Metronom: Stell es auf 70 und zähl „1, 2, 3, 4“. Chop nur auf 2 und 4, auf 1 und 3 ist Stille. Klingt es wie eine Trommel, hast du es geschafft.',
          en: 'Practise with the metronome: set it to 70 and count “1, 2, 3, 4”. Chop only on 2 and 4, with silence on 1 and 3. If it sounds like a drum, you’ve got it.',
          fr: 'Entraîne-toi avec le métronome : règle-le sur 70 et compte « 1, 2, 3, 4 ». Chop seulement sur 2 et 4, silence sur 1 et 3. Si ça sonne comme un tambour, c’est gagné.',
        },
      },
      { tool: 'rhythmus' },
      { h2: { de: 'Doppelgriffe: zwei Saitenpaare zugleich', en: 'Double stops: two pairs at once', fr: 'Doubles cordes : deux paires à la fois' } },
      {
        p: {
          de: 'Bei einem **Doppelgriff** spielst du zwei benachbarte Saitenpaare gleichzeitig, meist die A- und die E-Saite. Oben liegt die Melodie, darunter ein passender zweiter Ton. Das klingt gleich viel voller. Drei Beispiele:',
          en: 'In a **double stop** you play two neighbouring string pairs at once, usually the A and E strings. The melody is on top, with a matching second note underneath. It instantly sounds much fuller. Three examples:',
          fr: 'Avec une **double corde**, tu joues deux paires voisines en même temps, souvent celles de La et de Mi. La mélodie est en haut, avec une deuxième note assortie en dessous. Ça sonne tout de suite plus riche. Trois exemples :',
        },
      },
      {
        ul: [
          { de: 'Zu **G**: A-Saite im 2. Bund und E-Saite im 3. Bund (die Töne B und G)', en: 'For **G**: A string at fret 2 and E string at fret 3 (the notes B and G)', fr: 'Pour **G** : corde de La à la 2e case et corde de Mi à la 3e case (Si et Sol)' },
          { de: 'Zu **C**: A-Saite im 3. Bund und leere E-Saite (C und E)', en: 'For **C**: A string at fret 3 and open E string (C and E)', fr: 'Pour **C** : corde de La à la 3e case et corde de Mi à vide (Do et Mi)' },
          { de: 'Zu **D**: leere A-Saite und E-Saite im 2. Bund (A und F#)', en: 'For **D**: open A string and E string at fret 2 (A and F#)', fr: 'Pour **D** : corde de La à vide et corde de Mi à la 2e case (La et Fa#)' },
        ],
      },
      {
        p: {
          de: 'Mit [Tremolo](wissen:mandoline-tremolo) auf einem Doppelgriff klingt die Mandoline besonders schön. Probier es bei einem langsamen Lied wie [Amazing Grace](lied:amazing-grace).',
          en: 'Played with [tremolo](wissen:mandoline-tremolo), a double stop sounds especially beautiful on the mandolin. Try it in a slow song like [Amazing Grace](lied:amazing-grace).',
          fr: 'Avec du [trémolo](wissen:mandoline-tremolo), une double corde sonne particulièrement bien à la mandoline. Essaie sur une chanson lente comme [Amazing Grace](lied:amazing-grace).',
        },
      },
    ],
    related: ['mandoline-erste-akkorde', 'mandoline-tremolo', 'mit-metronom-ueben', 'takt-und-taktarten'],
    published: '2026-10-11',
  },
  {
    id: 'mandoline-wie-gitarre',
    slug: { de: 'mandoline-fuer-gitarre-und-ukulele-spieler', en: 'mandolin-for-guitar-and-ukulele-players', fr: 'mandoline-pour-guitaristes-et-ukulelistes' },
    instruments: ['mandoline'],
    category: 'instrument',
    title: {
      de: 'Mandoline für Gitarren- und Ukulele-Spieler: Was gleich ist, was neu ist',
      en: 'Mandolin for Guitar and Ukulele Players: What’s the Same, What’s New',
      fr: 'La mandoline pour guitaristes et ukulélistes : ce qui change, ce qui reste',
    },
    description: {
      de: 'Kann man Mandoline wie Gitarre oder Ukulele spielen? Die Griffe sind anders, weil sie in Quinten gestimmt ist – vieles andere nimmst du aber direkt mit.',
      en: 'Can you play the mandolin like a guitar or ukulele? The chord shapes differ because it’s tuned in fifths – but you can bring plenty of other skills along.',
      fr: 'Peut-on jouer de la mandoline comme d’une guitare ou d’un ukulélé ? Les doigtés changent, car elle est accordée en quintes – mais tu gardes beaucoup d’acquis.',
    },
    blocks: [
      {
        p: {
          de: 'Du spielst schon Gitarre oder Ukulele und hast eine Mandoline in der Hand? Die kurze Antwort: Deine **Griffe** passen nicht, aber fast **alles andere** schon. Der Umstieg geht schneller, als viele denken.',
          en: 'You already play guitar or ukulele and have a mandolin in your hands? The short answer: your **chord shapes** don’t fit, but almost **everything else** does. Switching is quicker than many people think.',
          fr: 'Tu joues déjà de la guitare ou du ukulélé et tu tiens une mandoline ? Réponse courte : tes **doigtés** ne vont pas, mais presque **tout le reste**, si. Le passage est plus rapide qu’on ne le croit.',
        },
      },
      { h2: { de: 'Warum die Griffe nicht passen', en: 'Why the chord shapes don’t fit', fr: 'Pourquoi les doigtés ne vont pas' } },
      {
        p: {
          de: 'Gitarre und Ukulele sind überwiegend in **Quarten** gestimmt: Von einer Saite zur nächsten sind es fünf Halbtöne (mit einer Ausnahme). Die Mandoline ist wie die Geige in **Quinten** gestimmt: **G D A E**, von Saite zu Saite sieben Halbtöne. Deshalb liegen alle Töne anders, und jeder Akkord hat eine eigene Form.',
          en: 'Guitar and ukulele are mostly tuned in **fourths**: five semitones from one string to the next (with one exception). The mandolin, like the violin, is tuned in **fifths**: **G D A E**, seven semitones from string to string. That’s why every note sits somewhere else and every chord has its own shape.',
          fr: 'La guitare et le ukulélé sont surtout accordés en **quartes** : cinq demi-tons d’une corde à l’autre (avec une exception). La mandoline, comme le violon, est accordée en **quintes** : **G D A E**, sept demi-tons de corde en corde. C’est pourquoi toutes les notes sont ailleurs et chaque accord a sa propre forme.',
        },
      },
      { h2: { de: 'Was du mitnimmst', en: 'What you bring along', fr: 'Ce que tu gardes' } },
      {
        ul: [
          { de: 'Akkordnamen und Akkordsymbole – ein G ist auch auf der Mandoline ein G', en: 'Chord names and symbols – a G is a G on the mandolin too', fr: 'Les noms et symboles d’accords – un G reste un G à la mandoline' },
          { de: 'Rhythmusgefühl, Schlagmuster und Erfahrung mit dem Takt', en: 'Your sense of rhythm, strumming patterns and feel for the beat', fr: 'Ton sens du rythme, tes rythmiques et ton expérience de la mesure' },
          { de: 'Lieder, die du kennst, und dein Gehör', en: 'Songs you know, and your ear', fr: 'Les chansons que tu connais, et ton oreille' },
          { de: 'Fingerkuppen mit Hornhaut und eine geübte Greifhand', en: 'Calloused fingertips and a trained fretting hand', fr: 'Des bouts de doigts endurcis et une main gauche entraînée' },
          { de: 'Wer Gitarre mit Plektrum spielt: die Anschlagtechnik', en: 'If you play guitar with a pick: your picking technique', fr: 'Si tu joues de la guitare au médiator : ta technique de médiator' },
        ],
      },
      { h2: { de: 'Was neu ist', en: 'What’s new', fr: 'Ce qui est nouveau' } },
      {
        ul: [
          {
            de: '**Doppelsaiten:** Jeder Ton wird auf zwei Saiten zugleich gegriffen. Die Fingerkuppe muss beide gut herunterdrücken.',
            en: '**Double strings:** every note is fretted on two strings at once. Your fingertip must press both down well.',
            fr: '**Cordes doubles :** chaque note se joue sur deux cordes à la fois. Le bout du doigt doit bien appuyer sur les deux.',
          },
          {
            de: '**Kleine Bünde, kurze Saiten:** Die Bünde liegen eng beieinander, aber die Stahlsaiten sind straff.',
            en: '**Small frets, short strings:** the frets are close together, but the steel strings are tight.',
            fr: '**Petites cases, cordes courtes :** les cases sont rapprochées, mais les cordes en acier sont tendues.',
          },
          {
            de: '**Plektrum:** Gespielt wird fast immer mit Plektrum, für lange Töne mit [Tremolo](wissen:mandoline-tremolo).',
            en: '**Pick:** it’s almost always played with a pick, and long notes with [tremolo](wissen:mandoline-tremolo).',
            fr: '**Médiator :** on joue presque toujours au médiator, et les notes longues en [trémolo](wissen:mandoline-tremolo).',
          },
          {
            de: '**Kleine Griffe:** Viele Mandolinen-Akkorde brauchen nur zwei oder drei Finger.',
            en: '**Small chords:** many mandolin chords need only two or three fingers.',
            fr: '**Petits accords :** beaucoup d’accords de mandoline ne demandent que deux ou trois doigts.',
          },
        ],
      },
      { chord: 'G' },
      { chord: 'C' },
      { chord: 'D' },
      { h2: { de: 'Einfach umstimmen?', en: 'Just retune it?', fr: 'Et si on l’accordait autrement ?' } },
      {
        p: {
          de: 'Manche überlegen, die Mandoline wie eine Ukulele oder Gitarre zu stimmen. Davon ist abzuraten: Saiten und Instrument sind für G D A E gebaut, andere Töne bedeuten zu schlaffe oder zu straffe Saiten. Und die Quinten sind gerade der Reiz: Sie machen Melodien auf der Mandoline besonders bequem. Die Griffe lernst du in [Die ersten Akkorde auf der Mandoline](wissen:mandoline-erste-akkorde).',
          en: 'Some people think about tuning the mandolin like a ukulele or guitar. Better not: strings and instrument are built for G D A E, and other notes mean strings that are too slack or too tight. Besides, the fifths are exactly what makes the mandolin special: they make melodies especially comfortable. Learn the chords in [First mandolin chords](wissen:mandoline-erste-akkorde).',
          fr: 'Certains pensent accorder la mandoline comme un ukulélé ou une guitare. Mieux vaut éviter : les cordes et l’instrument sont faits pour G D A E, et d’autres notes donneraient des cordes trop molles ou trop tendues. Et les quintes font justement le charme de la mandoline : elles rendent les mélodies très confortables. Apprends les accords dans [Premiers accords à la mandoline](wissen:mandoline-erste-akkorde).',
        },
      },
      {
        tip: {
          de: 'Ein Vorteil der Quinten: Eine Griffform lässt sich auf der Mandoline einfach auf andere Saiten verschieben und klingt dort genauso. Was du auf G- und D-Saite lernst, funktioniert auch auf D- und A-Saite.',
          en: 'One perk of the fifths: on the mandolin a shape can simply be moved to other strings and sounds the same there. What you learn on the G and D strings also works on the D and A strings.',
          fr: 'Un avantage des quintes : à la mandoline, une forme se déplace simplement sur d’autres cordes et y sonne pareil. Ce que tu apprends sur les cordes de Sol et de Ré marche aussi sur celles de Ré et de La.',
        },
      },
      { tool: 'akkorde' },
    ],
    related: ['mandoline-erste-akkorde', 'mandoline-und-geige', 'mandoline-stimmen', 'akkordsymbole-lesen'],
    published: '2026-10-11',
  },
  {
    id: 'bass-griffbrett-lernen',
    slug: { de: 'e-bass-griffbrett-lernen-toene', en: 'learn-bass-fretboard-notes', fr: 'apprendre-notes-manche-basse' },
    instruments: ['bass'],
    category: 'theorie',
    title: {
      de: 'E-Bass-Griffbrett lernen: ein Ton pro Woche',
      en: 'Learning the Bass Fretboard: One Note a Week',
      fr: 'Apprendre le manche de la basse : une note par semaine',
    },
    description: {
      de: 'Die Töne auf dem E-Bass lernst du am leichtesten Schritt für Schritt: jede Woche ein Ton, mit Oktav-Trick, Punkten als Wegweiser und kurzen Übungen.',
      en: 'The easiest way to learn the notes on the bass is step by step: one note each week, with the octave trick, the dots as signposts and short exercises.',
      fr: 'Le plus simple pour apprendre les notes de la basse : une note par semaine, avec l’astuce de l’octave, les repères du manche et de courts exercices.',
    },
    blocks: [
      {
        p: {
          de: 'Zwölf Bünde, vier Saiten – am Anfang sieht das Griffbrett aus wie ein Labyrinth. Der Trick: nicht alles auf einmal lernen, sondern **jede Woche einen Ton**. Nach zwei Monaten kennst du alle Stammtöne, ohne dass es je anstrengend war.',
          en: 'Twelve frets, four strings – at first the fretboard looks like a maze. The trick: don’t learn everything at once, learn **one note each week**. After two months you know all the natural notes, and it was never hard work.',
          fr: 'Douze cases, quatre cordes – au début, le manche ressemble à un labyrinthe. L’astuce : ne pas tout apprendre d’un coup, mais **une note par semaine**. En deux mois, tu connais toutes les notes naturelles sans jamais t’être épuisé.',
        },
      },
      { h2: { de: 'Deine Wegweiser', en: 'Your signposts', fr: 'Tes repères' } },
      {
        ul: [
          {
            de: 'Die **leeren Saiten** heißen E, A, D, G.',
            en: 'The **open strings** are E, A, D, G.',
            fr: 'Les **cordes à vide** sont E, A, D, G (Mi, La, Ré, Sol).',
          },
          {
            de: 'Im **12. Bund** (zwei Punkte) wiederholt sich alles: Dort klingt jede Saite eine Oktave höher als leer, mit demselben Namen.',
            en: 'At the **12th fret** (two dots) everything repeats: each string sounds an octave higher than open, with the same name.',
            fr: 'À la **12e case** (deux points), tout recommence : chaque corde sonne une octave plus haut qu’à vide, avec le même nom.',
          },
          {
            de: '**Oktav-Trick:** Zwei Saiten höher, zwei Bünde weiter liegt derselbe Ton eine Oktave höher.',
            en: '**Octave trick:** two strings up, two frets further, you find the same note an octave higher.',
            fr: '**Astuce de l’octave :** deux cordes plus haut, deux cases plus loin, tu trouves la même note une octave au-dessus.',
          },
          {
            de: '**Gleicher Ton:** Der 5. Bund einer Saite klingt genau wie die nächste leere Saite (E-Saite 5. Bund = leere A-Saite).',
            en: '**Same note:** the 5th fret of a string sounds exactly like the next open string (E string, 5th fret = open A).',
            fr: '**Même note :** la 5e case d’une corde sonne exactement comme la corde à vide suivante (corde de Mi, 5e case = La à vide).',
          },
        ],
      },
      { h2: { de: 'Der Plan', en: 'The plan', fr: 'Le programme' } },
      {
        ol: [
          {
            de: '**Woche 1 – E und A:** leere E- und A-Saite, beide im 12. Bund, dazu A auf der E-Saite im 5. Bund und E auf der D-Saite im 2. Bund.',
            en: '**Week 1 – E and A:** open E and A strings, both at the 12th fret, plus A on the E string at fret 5 and E on the D string at fret 2.',
            fr: '**Semaine 1 – E et A :** cordes de Mi et de La à vide, les deux à la 12e case, plus La sur la corde de Mi à la 5e case et Mi sur la corde de Ré à la 2e case.',
          },
          {
            de: '**Woche 2 – G:** E-Saite 3. Bund, Oktave auf der D-Saite im 5. Bund, dazu die leere G-Saite.',
            en: '**Week 2 – G:** E string fret 3, the octave on the D string at fret 5, plus the open G string.',
            fr: '**Semaine 2 – G :** corde de Mi 3e case, l’octave sur la corde de Ré à la 5e case, plus la corde de Sol à vide.',
          },
          {
            de: '**Woche 3 – C:** A-Saite 3. Bund, Oktave auf der G-Saite im 5. Bund, dazu E-Saite 8. Bund.',
            en: '**Week 3 – C:** A string fret 3, the octave on the G string at fret 5, plus E string fret 8.',
            fr: '**Semaine 3 – C :** corde de La 3e case, l’octave sur la corde de Sol à la 5e case, plus corde de Mi 8e case.',
          },
          {
            de: '**Woche 4 – D:** leere D-Saite, A-Saite 5. Bund, E-Saite 10. Bund, G-Saite 7. Bund.',
            en: '**Week 4 – D:** open D string, A string fret 5, E string fret 10, G string fret 7.',
            fr: '**Semaine 4 – D :** corde de Ré à vide, corde de La 5e case, corde de Mi 10e case, corde de Sol 7e case.',
          },
          {
            de: '**Woche 5 – F:** E-Saite 1. Bund, Oktave auf der D-Saite im 3. Bund, dazu A-Saite 8. Bund.',
            en: '**Week 5 – F:** E string fret 1, the octave on the D string at fret 3, plus A string fret 8.',
            fr: '**Semaine 5 – F :** corde de Mi 1re case, l’octave sur la corde de Ré à la 3e case, plus corde de La 8e case.',
          },
          {
            de: '**Woche 6 – B:** A-Saite 2. Bund, Oktave auf der G-Saite im 4. Bund, dazu E-Saite 7. Bund.',
            en: '**Week 6 – B:** A string fret 2, the octave on the G string at fret 4, plus E string fret 7.',
            fr: '**Semaine 6 – B :** corde de La 2e case, l’octave sur la corde de Sol à la 4e case, plus corde de Mi 7e case.',
          },
          {
            de: '**Woche 7 und 8 – die Töne dazwischen:** Ein Bund höher bekommt ein # (F# liegt einen Bund über F), ein Bund tiefer ein b. Nur zwischen E und F sowie zwischen B und C liegt kein Ton dazwischen.',
            en: '**Weeks 7 and 8 – the notes in between:** one fret higher adds a # (F# is one fret above F), one fret lower a b. Only between E and F and between B and C is there no note in between.',
            fr: '**Semaines 7 et 8 – les notes intermédiaires :** une case plus haut ajoute un # (F# est une case au-dessus de F), une case plus bas un b. Il n’y a pas de note entre E et F, ni entre B et C.',
          },
        ],
      },
      { h2: { de: 'Fünf Minuten am Tag', en: 'Five minutes a day', fr: 'Cinq minutes par jour' } },
      {
        ul: [
          {
            de: 'Spiel den Ton der Woche an allen Stellen, die du kennst, und **sag dabei laut seinen Namen**.',
            en: 'Play the note of the week in every place you know and **say its name out loud**.',
            fr: 'Joue la note de la semaine à tous les endroits que tu connais et **dis son nom à voix haute**.',
          },
          {
            de: 'Mit Metronom: Auf jeden Klick eine andere Stelle desselben Tons.',
            en: 'With the metronome: a different spot for the same note on every click.',
            fr: 'Avec le métronome : à chaque clic, un autre endroit pour la même note.',
          },
          {
            de: 'Wiederhol zum Schluss kurz die Töne der Wochen davor.',
            en: 'Finish with a quick review of the notes from the previous weeks.',
            fr: 'Termine par une petite révision des notes des semaines précédentes.',
          },
        ],
      },
      {
        p: {
          de: 'Der Ton-Detektiv der App sagt dir, welchen Ton du gerade spielst und wo er überall auf dem Hals liegt. So kannst du dich selbst prüfen. Was die Tonnamen bedeuten, steht in [Töne und Notennamen](wissen:toene-und-notennamen).',
          en: 'The app’s note detective tells you which note you’re playing and everywhere it sits on the neck. That way you can check yourself. What the note names mean is explained in [Notes and note names](wissen:toene-und-notennamen).',
          fr: 'Le détective de notes de l’appli te dit quelle note tu joues et tous les endroits où elle se trouve sur le manche. Tu peux ainsi te vérifier. Le sens des noms de notes est expliqué dans [Les notes et leurs noms](wissen:toene-und-notennamen).',
        },
      },
      { tool: 'detektiv' },
      {
        tip: {
          de: 'Kleb keine Namen aufs Griffbrett. Dein Kopf merkt sich die Töne viel besser, wenn er sie selbst finden muss.',
          en: 'Don’t stick labels on the fretboard. Your brain remembers the notes much better when it has to find them itself.',
          fr: 'Ne colle pas d’étiquettes sur le manche. Ton cerveau retient bien mieux les notes quand il doit les trouver lui-même.',
        },
      },
    ],
    related: ['bass-erste-toene', 'toene-und-notennamen', 'bass-metronom-schlagzeug', 'tabulatur-lesen'],
    published: '2026-10-11',
  },
  {
    id: 'bass-short-scale-kinder',
    slug: { de: 'e-bass-fuer-kinder-short-scale', en: 'bass-guitar-for-kids-short-scale', fr: 'basse-electrique-enfant-short-scale' },
    instruments: ['bass'],
    category: 'instrument',
    title: {
      de: 'E-Bass für Kinder: Short Scale, Gewicht und Verstärker',
      en: 'Bass Guitar for Kids: Short Scale, Weight and Amp',
      fr: 'Basse électrique pour enfant : short scale, poids et ampli',
    },
    description: {
      de: 'Welcher E-Bass passt zu Kinderhänden? Was Mensur und Short Scale bedeuten, worauf ihr bei Gewicht, Saiten und Übungsverstärker achtet.',
      en: 'Which bass guitar suits children’s hands? What scale length and short scale mean, and what to look for in weight, strings and a practice amp.',
      fr: 'Quelle basse pour des mains d’enfant ? Ce que veulent dire diapason et short scale, et à quoi faire attention pour le poids, les cordes et l’ampli.',
    },
    blocks: [
      {
        p: {
          de: 'Ein normaler E-Bass ist groß: langer Hals, weite Abstände zwischen den Bünden, oft ziemlich schwer. Für Kinder gibt es deshalb kürzere Bässe. Das wichtigste Wort dabei ist **Mensur**.',
          en: 'A standard bass guitar is big: a long neck, wide spaces between frets, often quite heavy. That’s why there are shorter basses for children. The most important word here is **scale length**.',
          fr: 'Une basse classique est grande : un long manche, des cases espacées, souvent assez lourde. Il existe donc des basses plus courtes pour les enfants. Le mot le plus important ici est le **diapason**.',
        },
      },
      { h2: { de: 'Was ist die Mensur?', en: 'What is scale length?', fr: 'Qu’est-ce que le diapason ?' } },
      {
        p: {
          de: 'Die **Mensur** ist die Länge des schwingenden Teils der Saite, vom Sattel bis zum Steg. Je kürzer sie ist, desto enger liegen die Bünde und desto kürzer ist der Hals. Üblich sind:',
          en: 'The **scale length** is the length of the vibrating part of the string, from the nut to the bridge. The shorter it is, the closer the frets and the shorter the neck. Common sizes are:',
          fr: 'Le **diapason** est la longueur de la partie vibrante de la corde, du sillet au chevalet. Plus il est court, plus les cases sont rapprochées et plus le manche est court. Les tailles courantes :',
        },
      },
      {
        ul: [
          { de: '**Long Scale:** etwa 86 cm (34 Zoll) – der „normale“ Bass', en: '**Long scale:** about 86 cm (34 inches) – the “standard” bass', fr: '**Long scale :** environ 86 cm (34 pouces) – la basse « standard »' },
          { de: '**Medium Scale:** etwa 81 cm (32 Zoll)', en: '**Medium scale:** about 81 cm (32 inches)', fr: '**Medium scale :** environ 81 cm (32 pouces)' },
          { de: '**Short Scale:** etwa 76 cm (30 Zoll) – gut für viele Kinder', en: '**Short scale:** about 76 cm (30 inches) – good for many children', fr: '**Short scale :** environ 76 cm (30 pouces) – bien pour beaucoup d’enfants' },
          { de: 'Es gibt auch noch kürzere Bässe für jüngere Kinder.', en: 'There are even shorter basses for younger children.', fr: 'Il existe aussi des basses encore plus courtes pour les plus jeunes.' },
        ],
      },
      { h2: { de: 'Welche Größe passt?', en: 'Which size fits?', fr: 'Quelle taille choisir ?' } },
      {
        p: {
          de: 'Eine feste Altersgrenze gibt es nicht – es kommt auf Armlänge und Handgröße an. Ein guter Test im Geschäft: Das Kind sitzt mit dem Bass und greift im **1. Bund** auf der E-Saite. Geht das, ohne dass der Arm ganz gestreckt ist und die Schulter nach vorn rutscht, passt die Größe. Für Kinder um die zehn Jahre ist ein Short-Scale-Bass oft die bequemste Wahl. Auch viele Erwachsene spielen Short Scale – der Klang ist etwas runder, aber vollwertig.',
          en: 'There’s no fixed age limit – it depends on arm length and hand size. A good test in the shop: the child sits with the bass and frets the E string at the **1st fret**. If that works without the arm fully stretched and the shoulder pulled forward, the size fits. For children around ten, a short-scale bass is often the most comfortable choice. Plenty of adults play short scale too – the sound is a little rounder, but every bit a real bass.',
          fr: 'Il n’y a pas d’âge fixe – tout dépend de la longueur du bras et de la taille de la main. Un bon test en magasin : l’enfant est assis avec la basse et appuie sur la corde de Mi à la **1re case**. S’il y arrive sans tendre complètement le bras ni avancer l’épaule, la taille convient. Vers dix ans, une basse short scale est souvent le choix le plus confortable. Beaucoup d’adultes jouent aussi en short scale – le son est un peu plus rond, mais c’est une vraie basse.',
        },
      },
      { h2: { de: 'Worauf ihr noch achten könnt', en: 'What else to look out for', fr: 'À quoi faire attention aussi' } },
      {
        ul: [
          {
            de: '**Gewicht:** Bässe sind unterschiedlich schwer. Ein leichteres Instrument und ein breiter, gepolsterter Gurt schonen Schultern und Rücken.',
            en: '**Weight:** basses vary a lot in weight. A lighter instrument and a wide, padded strap are kind to shoulders and back.',
            fr: '**Poids :** les basses ont des poids très différents. Un instrument plus léger et une sangle large et rembourrée ménagent épaules et dos.',
          },
          {
            de: '**Passende Saiten:** Saiten gibt es in Längen passend zur Mensur. Für einen Short-Scale-Bass kauft ihr Short-Scale-Saiten – zu lange Saiten passen oft nicht richtig auf die Wirbel.',
            en: '**Matching strings:** strings come in lengths to match the scale. For a short-scale bass buy short-scale strings – strings that are too long often don’t fit the tuning posts properly.',
            fr: '**Cordes adaptées :** les cordes existent en longueurs adaptées au diapason. Pour une basse short scale, prenez des cordes short scale – des cordes trop longues se montent souvent mal sur les mécaniques.',
          },
          {
            de: '**Verstärker:** Zum Üben reicht ein kleiner Übungsverstärker für Bass oder ein Kopfhörer-Verstärker. Leise üben schont die Ohren – und die Nachbarn.',
            en: '**Amp:** for practice a small bass practice amp or a headphone amp is enough. Practising quietly protects the ears – and the neighbours.',
            fr: '**Ampli :** pour s’entraîner, un petit ampli de basse ou un ampli pour casque suffit. Jouer doucement protège les oreilles – et les voisins.',
          },
          {
            de: '**Saitenlage:** Liegen die Saiten zu hoch, ist das Drücken für Kinderfinger mühsam. Ein Musikgeschäft kann den Bass einstellen.',
            en: '**Action:** if the strings sit too high, pressing is hard work for small fingers. A music shop can set up the bass.',
            fr: '**Hauteur des cordes :** si les cordes sont trop hautes, appuyer est pénible pour des doigts d’enfant. Un magasin de musique peut régler la basse.',
          },
        ],
      },
      {
        p: {
          de: 'Gestimmt wird jeder E-Bass gleich, egal welche Mensur: **E A D G**. Das Stimmgerät der App passt also immer – mehr in [E-Bass stimmen](wissen:bass-stimmen).',
          en: 'Every bass guitar is tuned the same, whatever the scale length: **E A D G**. So the app’s tuner always fits – more in [Tuning the bass guitar](wissen:bass-stimmen).',
          fr: 'Toutes les basses s’accordent pareil, quel que soit le diapason : **E A D G**. L’accordeur de l’appli convient donc toujours – plus d’infos dans [Accorder la basse](wissen:bass-stimmen).',
        },
      },
      { tool: 'stimmen' },
    ],
    related: ['bass-stimmen', 'bass-erste-toene', 'bass-zupfen', 'ueben-mit-kindern'],
    published: '2026-10-11',
  },
  {
    id: 'bass-metronom-schlagzeug',
    slug: { de: 'e-bass-mit-metronom-und-schlagzeug-ueben', en: 'bass-practice-with-metronome-and-drums', fr: 'basse-travailler-metronome-batterie' },
    instruments: ['bass'],
    category: 'rhythmus',
    title: {
      de: 'E-Bass mit Metronom und Schlagzeug üben – so wirst du tight',
      en: 'Practising Bass with a Metronome and Drums – Getting Tight',
      fr: 'Travailler la basse avec métronome et batterie – pour être bien en place',
    },
    description: {
      de: 'Bass und Schlagzeug sind das Fundament der Band. Vier Übungen, mit denen du genau auf den Schlag spielst: Klick verschwinden lassen, 2 und 4, Bassdrum, Tonlänge.',
      en: 'Bass and drums are the foundation of a band. Four exercises to play right on the beat: make the click disappear, 2 and 4, the kick drum, note length.',
      fr: 'Basse et batterie sont le socle du groupe. Quatre exercices pour jouer pile sur le temps : faire disparaître le clic, 2 et 4, grosse caisse, durée des notes.',
    },
    blocks: [
      {
        p: {
          de: 'Ein Bass muss nicht viele Töne spielen – aber jeder muss **genau auf dem Schlag** sitzen. Zusammen mit dem Schlagzeug bildet der Bass die **Rhythmusgruppe**, auf der alle anderen aufbauen. Mit diesen Übungen trainierst du genau das. Grundlagen zum Metronom stehen in [Mit Metronom üben](wissen:mit-metronom-ueben).',
          en: 'A bass doesn’t have to play many notes – but each one must sit **right on the beat**. Together with the drums, the bass forms the **rhythm section** that everyone else builds on. These exercises train exactly that. Metronome basics are in [Practising with a metronome](wissen:mit-metronom-ueben).',
          fr: 'Une basse n’a pas besoin de jouer beaucoup de notes – mais chacune doit tomber **pile sur le temps**. Avec la batterie, la basse forme la **section rythmique** sur laquelle tous les autres s’appuient. Ces exercices travaillent exactement ça. Les bases du métronome sont dans [Travailler avec un métronome](wissen:mit-metronom-ueben).',
        },
      },
      { h2: { de: '1. Lass den Klick verschwinden', en: '1. Make the click disappear', fr: '1. Fais disparaître le clic' } },
      {
        p: {
          de: 'Stell das Metronom auf 60 und spiel auf jeden Klick die leere E-Saite. Hör genau hin: Wenn du perfekt triffst, verschmilzt dein Ton mit dem Klick, und du hörst ihn kaum noch. Hörst du den Klick deutlich vor oder nach deinem Ton, bist du zu spät oder zu früh. Dann weiter mit A, D und G, später mit Grundtönen eines Liedes.',
          en: 'Set the metronome to 60 and play the open E string on every click. Listen closely: when you hit it perfectly, your note blends with the click and you can hardly hear it. If you hear the click clearly before or after your note, you’re late or early. Then carry on with A, D and G, later with the root notes of a song.',
          fr: 'Règle le métronome sur 60 et joue la corde de Mi à vide à chaque clic. Écoute bien : si tu tombes parfaitement, ta note se fond dans le clic et tu ne l’entends presque plus. Si tu entends le clic nettement avant ou après ta note, tu es en retard ou en avance. Continue avec La, Ré et Sol, puis avec les fondamentales d’une chanson.',
        },
      },
      { tool: 'rhythmus' },
      { h2: { de: '2. Der Klick auf 2 und 4', en: '2. The click on 2 and 4', fr: '2. Le clic sur 2 et 4' } },
      {
        p: {
          de: 'In vielen Liedern betont das Schlagzeug die Schläge **2 und 4**. Stell das Metronom auf das halbe Tempo, zum Beispiel 40, wähle „Alle gleich“ und denk dir jeden Klick als 2 oder 4. Du spielst auf 1, 2, 3 und 4 – die 1 und die 3 musst du also selbst fühlen. Das ist anfangs knifflig, macht dich aber sehr sicher im Takt.',
          en: 'In many songs the drums stress beats **2 and 4**. Set the metronome to half speed, say 40, choose “All the same” and think of each click as 2 or 4. You play on 1, 2, 3 and 4 – so you have to feel 1 and 3 yourself. Tricky at first, but it makes your timing very solid.',
          fr: 'Dans beaucoup de chansons, la batterie accentue les temps **2 et 4**. Règle le métronome à la moitié du tempo, par exemple 40, choisis « Tous pareils » et imagine chaque clic comme le 2 ou le 4. Tu joues sur 1, 2, 3 et 4 – le 1 et le 3, tu dois donc les sentir toi-même. Difficile au début, mais ça rend ton rythme très solide.',
        },
      },
      { h2: { de: '3. Mit der Bassdrum spielen', en: '3. Playing with the kick drum', fr: '3. Jouer avec la grosse caisse' } },
      {
        p: {
          de: 'Die große, tiefe Trommel heißt **Bassdrum**. Sehr oft spielt der Bass genau dann, wenn sie schlägt. Hör dir Lieder an und klopf mit dem Fuß nur die Bassdrum mit. Im Blues-Werkzeug der App spielt eine Band mit Schlagzeug – ohne Bass, denn der bist du. Spiel dort erst nur Grundtöne und achte darauf, mit der Trommel zusammen zu sein.',
          en: 'The big, deep drum is called the **kick drum** (or bass drum). Very often the bass plays exactly when it hits. Listen to songs and tap only the kick drum with your foot. In the app’s blues tool a band plays with drums – without a bass, because that’s you. Play just root notes there at first and focus on being together with the drum.',
          fr: 'Le gros tambour grave s’appelle la **grosse caisse**. Très souvent, la basse joue exactement en même temps qu’elle. Écoute des chansons et tape du pied seulement sur la grosse caisse. Dans l’outil Blues de l’appli, un groupe joue avec batterie – sans basse, car c’est toi. Joue d’abord seulement des fondamentales et concentre-toi pour être ensemble avec la batterie.',
        },
      },
      { tool: 'blues' },
      { h2: { de: '4. Wie lang klingt der Ton?', en: '4. How long does the note ring?', fr: '4. Combien de temps dure la note ?' } },
      {
        p: {
          de: 'Beim Bass zählt nicht nur, wann ein Ton anfängt, sondern auch, **wann er aufhört**. Spiel vier Töne pro Takt einmal lang und klingend, einmal kurz und abgedämpft. Beides im Takt – das Ende des Tons sitzt genauso auf dem Schlag wie der Anfang. Wie das Abdämpfen geht, steht in [E-Bass zupfen](wissen:bass-zupfen).',
          en: 'On bass it’s not just when a note starts that counts, but also **when it stops**. Play four notes per bar, once long and ringing, once short and muted. Both in time – the end of the note sits on the beat just like the start. How to mute is explained in [Plucking the bass](wissen:bass-zupfen).',
          fr: 'À la basse, ce n’est pas seulement le début de la note qui compte, mais aussi **sa fin**. Joue quatre notes par mesure, une fois longues et sonnantes, une fois courtes et étouffées. Les deux en rythme – la fin de la note tombe sur le temps comme le début. Pour étouffer les cordes, lis [Pincer la basse](wissen:bass-zupfen).',
        },
      },
      {
        tip: {
          de: 'Nimm dich ab und zu mit dem Handy auf und hör es dir an. Beim Spielen merkt man kleine Wackler oft nicht – beim Anhören sofort.',
          en: 'Now and then, record yourself with a phone and listen back. While playing you often miss small wobbles – when listening you notice them right away.',
          fr: 'De temps en temps, enregistre-toi avec un téléphone et réécoute. En jouant, on rate souvent les petits flottements – à l’écoute, on les entend tout de suite.',
        },
      },
    ],
    related: ['mit-metronom-ueben', 'bass-zupfen', 'bass-walking-blues', 'takt-und-taktarten'],
    published: '2026-10-11',
  },
];
