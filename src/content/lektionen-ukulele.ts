import type { Course } from './lektionen.ts';
import type { L10n } from './types.ts';

function l(de: string, en: string, fr: string): L10n {
  return { de, en, fr };
}

export const UKULELE_COURSE: Course = {
  instrument: 'ukulele',
  parts: [
    { from: 1, title: l('Erste Schritte', 'First steps', 'Premiers pas') },
    { from: 5, title: l('Die ersten Lieder', 'The first songs', 'Les premières chansons') },
    { from: 10, title: l('Rhythmus und mehr Akkorde', 'Rhythm and more chords', 'Rythme et nouveaux accords') },
    { from: 16, title: l('Musik verstehen', 'Understanding music', 'Comprendre la musique') },
    { from: 19, title: l('Neue Tonarten und Griffe', 'New keys and chords', 'Nouvelles tonalités et nouveaux accords') },
  ],
  lessons: [
    // ---------- 1 ----------
    {
      n: 1,
      title: l('Halten, anschlagen, erster Akkord', 'Hold, strum, first chord', 'Tenir, gratter, premier accord'),
      goal: l(
        'Du hältst die Ukulele locker, schlägst die Saiten an und spielst deinen ersten Akkord: C.',
        'You hold the ukulele relaxed, strum the strings and play your first chord: C.',
        'Tu tiens le ukulélé sans te crisper, tu grattes les cordes et tu joues ton premier accord : C.',
      ),
      chords: ['C'],
      steps: [
        l(
          'Setz dich aufrecht hin. Die Ukulele liegt am Bauch, der Hals zeigt schräg nach links oben. Der rechte Unterarm hält sie leicht fest. Mehr dazu: [Ukulele halten](wissen:ukulele-halten).',
          'Sit up straight. The ukulele rests against your tummy, the neck points up to the left. Your right forearm holds it gently. More: [How to hold the ukulele](wissen:ukulele-halten).',
          'Assieds-toi bien droit. Le ukulélé repose contre ton ventre, le manche monte vers la gauche. Ton avant-bras droit le tient doucement. Plus d’infos : [Tenir le ukulélé](wissen:ukulele-halten).',
        ),
        l(
          'Zupf eine einzelne Saite mit dem Daumen an – ganz ruhig. Hör zu, bis der Ton leise wird. Dann die nächste Saite.',
          'Pluck a single string with your thumb – nice and calm. Listen until the sound fades. Then the next string.',
          'Pince une seule corde avec le pouce, tout doucement. Écoute jusqu’à ce que le son s’éteigne. Puis la corde suivante.',
        ),
        l(
          'Jetzt einmal über alle Saiten: Streich mit dem Zeigefinger (Nagelseite) von oben nach unten. Die Bewegung kommt aus dem Handgelenk, locker wie beim Wassertropfen-Abschütteln.',
          'Now across all strings: brush down with your index finger (nail side). The movement comes from the wrist, loose like shaking off water drops.',
          'Maintenant sur toutes les cordes : gratte vers le bas avec l’index (côté ongle). Le mouvement vient du poignet, souple, comme pour secouer des gouttes d’eau.',
        ),
        l(
          'Dein erster Akkord: **C**. Setz den Ringfinger auf die A-Saite (die unterste) im 3. Bund. Die anderen Saiten bleiben frei. Schau dir das Griffbild an: [C](chord:C).',
          'Your first chord: **C**. Put your ring finger on the A string (the bottom one) at the 3rd fret. The other strings stay open. Look at the chord chart: [C](chord:C).',
          'Ton premier accord : **C**. Pose l’annulaire sur la corde A (celle du bas) à la 3e case. Les autres cordes restent libres. Regarde le diagramme : [C](chord:C).',
        ),
        l(
          'So liest du ein Griffbild: Die senkrechten Linien sind die Saiten (links G, rechts A), die waagrechten die Bundstäbchen. Ein Punkt zeigt, wo ein Finger drückt – die Zahl darin, welcher: 1 Zeige-, 2 Mittel-, 3 Ring-, 4 kleiner Finger. „o“ heißt leer anschlagen, „x“ nicht anschlagen.',
          'How to read a chord chart: the vertical lines are the strings (G on the left, A on the right), the horizontal ones are the frets. A dot shows where a finger presses – the number says which one: 1 index, 2 middle, 3 ring, 4 little finger. “o” means play the open string, “x” means don’t play it.',
          'Lire un diagramme : les lignes verticales sont les cordes (G à gauche, A à droite), les lignes horizontales les frettes. Un point montre où un doigt appuie – le chiffre dit lequel : 1 index, 2 majeur, 3 annulaire, 4 auriculaire. « o » : corde à vide, « x » : ne pas jouer la corde.',
        ),
        l(
          'Zähl erst ein: „eins, zwei, drei, vier“ – dann schlag C viermal an und zähl laut weiter. Auf der Akkordseite kannst du ihn vom Mikrofon prüfen lassen.',
          'Count in first: “one, two, three, four” – then strum C four times and keep counting out loud. On the chord page the microphone can check it for you.',
          'Compte d’abord : « un, deux, trois, quatre » – puis gratte C quatre fois en continuant à compter à voix haute. Sur la page de l’accord, le micro peut le vérifier.',
        ),
      ],
      piece: {
        text: l(
          '„Bruder Jakob“ nur mit C: Bei jedem Schlag einmal runter. Die Begleitung wartet auf dich. Danach im Rhythmus: viermal C – kurz Pause – viermal C.',
          '“Bruder Jakob” with just C: one strum down on every beat. The backing waits for you. Then with the rhythm tool: four times C – short pause – four times C.',
          '« Bruder Jakob » avec seulement C : un coup vers le bas à chaque temps. L’accompagnement t’attend. Puis avec le rythme : quatre fois C – petite pause – quatre fois C.',
        ),
        play: [{ song: 'bruder-jakob', key: 'C' }, { tool: 'rhythmus', pattern: 'Nur runter' }],
      },
      homework: [
        l('Jeden Tag: Ukulele richtig halten, 1 Minute lang locker.', 'Every day: hold the ukulele properly, relaxed for 1 minute.', 'Chaque jour : tiens bien le ukulélé, détendu, pendant 1 minute.'),
        l('Jede Saite einzeln zupfen und lauschen.', 'Pluck each string on its own and listen.', 'Pince chaque corde seule et écoute.'),
        l('C greifen, viermal anschlagen, loslassen – fünfmal.', 'Fret C, strum four times, let go – five times.', 'Pose C, gratte quatre fois, relâche – cinq fois.'),
        l('**Spaß:** „Bruder Jakob“ mit C spielen und dazu singen.', '**Fun:** play “Bruder Jakob” with C and sing along.', '**Pour le plaisir :** joue « Bruder Jakob » avec C et chante.'),
      ],
      done: [
        l('du C viermal hintereinander anschlagen kannst, und es klingt', 'you can strum C four times in a row and it rings', 'tu peux gratter C quatre fois de suite et ça sonne'),
        l('du „Bruder Jakob“ mit C einmal ganz durchspielst', 'you play “Bruder Jakob” with C all the way through', 'tu joues « Bruder Jakob » avec C en entier'),
      ],
      trouble: [
        l(
          'Die Ukulele rutscht? Drück sie mit dem rechten Unterarm sanft an den Bauch. Die linke Hand soll nichts festhalten müssen.',
          'The ukulele slips? Press it gently against your tummy with your right forearm. Your left hand should not have to hold it.',
          'Le ukulélé glisse ? Serre-le doucement contre ton ventre avec l’avant-bras droit. La main gauche ne doit pas avoir à le tenir.',
        ),
        l(
          'Das C klingt dumpf? Stell den Ringfinger steiler auf, damit er die E-Saite daneben nicht berührt.',
          'C sounds muffled? Put your ring finger up more steeply so it doesn’t touch the E string next to it.',
          'Le C sonne étouffé ? Redresse l’annulaire pour qu’il ne touche pas la corde E à côté.',
        ),
      ],
      teacher: [
        l(
          'Einstieg: Alle halten die Ukulele, die Lehrkraft zeigt Haltung und Anschlag. Gemeinsam jede Saite einzeln zupfen und lauschen, bis es still ist.',
          'Warm-up: everyone holds the ukulele, the teacher shows posture and strum. Pluck each string together and listen until it is quiet.',
          'Entrée : tout le monde tient son ukulélé, l’enseignant montre la posture et le geste. Pincer chaque corde ensemble et écouter jusqu’au silence.',
        ),
        l(
          'Übung: C greifen, im Kreis nacheinander einmal anschlagen, dann alle zusammen viermal auf „eins, zwei, drei, vier“.',
          'Practice: fret C, strum once each around the circle, then all together four times on “one, two, three, four”.',
          'Exercice : poser C, gratter une fois chacun à tour de rôle, puis tous ensemble quatre fois sur « un, deux, trois, quatre ».',
        ),
        l(
          'Gemeinsames Lied: „Bruder Jakob“ mit C, die Hälfte singt, die andere spielt – dann tauschen. Als Kanon wird es noch schöner. Zum Singen liegt C etwas tief – summen ist in Ordnung; in Lektion 5 kommt das Lied in F, das passt besser zu Kinderstimmen.',
          'Song together: “Bruder Jakob” with C, half sing, half play – then swap. As a round it sounds even nicer. C is a bit low for singing – humming is fine; in lesson 5 the song comes in F, which suits children’s voices better.',
          'Chanson ensemble : « Bruder Jakob » avec C, une moitié chante, l’autre joue – puis on échange. En canon, c’est encore plus beau. En C, c’est un peu grave pour chanter – fredonner suffit ; en leçon 5, la chanson vient en F, mieux adapté aux voix d’enfants.',
        ),
      ],
      sheet: [
        l('Ukulele an den Bauch, Hals schräg nach oben, Schultern locker.', 'Ukulele against your tummy, neck up at an angle, shoulders loose.', 'Ukulélé contre le ventre, manche en biais vers le haut, épaules détendues.'),
        l('Einzelne Saite zupfen, dann mit dem Zeigefinger über alle Saiten runter.', 'Pluck one string, then brush down across all strings with your index finger.', 'Pince une corde, puis gratte toutes les cordes vers le bas avec l’index.'),
        l('**C:** Ringfinger auf die A-Saite, 3. Bund.', '**C:** ring finger on the A string, 3rd fret.', '**C :** annulaire sur la corde A, 3e case.'),
        l('Einzählen, dann viermal anschlagen und laut weiterzählen.', 'Count in, then strum four times and keep counting out loud.', 'Compte, puis gratte quatre fois en comptant à voix haute.'),
      ],
      wissen: ['ukulele-halten', 'ukulele-erste-akkorde'],
    },
    // ---------- 2 ----------
    {
      n: 2,
      title: l('Stimmen und die Saiten G C E A', 'Tuning and the strings G C E A', 'Accorder et les cordes G C E A'),
      goal: l(
        'Du stimmst deine Ukulele mit dem Stimmgerät und kennst die Namen der vier Saiten.',
        'You tune your ukulele with the tuner and know the names of the four strings.',
        'Tu accordes ton ukulélé avec l’accordeur et tu connais le nom des quatre cordes.',
      ),
      review: l(
        'Halte die Ukulele wie letzte Woche und spiel viermal C. Klingt es schon schöner?',
        'Hold the ukulele like last week and play C four times. Does it already sound nicer?',
        'Tiens le ukulélé comme la semaine dernière et joue quatre fois C. Ça sonne déjà mieux ?',
      ),
      steps: [
        l(
          'Die Saiten heißen von oben nach unten **G C E A**. Merksatz: „**G**lückliche **C**lowns **e**ssen **A**nanas.“ Mehr dazu: [Ukulele-Saiten](wissen:ukulele-saiten).',
          'From top to bottom the strings are **G C E A**. Memory trick: “**G**ood **C**ats **E**at **A**nything.” More: [Ukulele strings](wissen:ukulele-saiten).',
          'De haut en bas, les cordes s’appellent **G C E A**. Petit truc : « **G**rand **C**astor **E**st **A**rrivé ». Plus d’infos : [Les cordes du ukulélé](wissen:ukulele-saiten).',
        ),
        l(
          'Die G-Saite ist besonders: Sie klingt höher als die C-Saite daneben. Das ist bei der Ukulele so gewollt und gibt ihr den typischen hellen Klang.',
          'The G string is special: it sounds higher than the C string next to it. That’s on purpose and gives the ukulele its bright sound.',
          'La corde G est spéciale : elle sonne plus aigu que la corde C à côté. C’est voulu et ça donne au ukulélé son son clair.',
        ),
        l(
          'Öffne das [Stimmgerät](tool:stimmen). Zupf eine Saite und lass sie klingen. Die Anzeige sagt dir, ob sie zu tief oder zu hoch ist.',
          'Open the [tuner](tool:stimmen). Pluck a string and let it ring. The display tells you whether it is too low or too high.',
          'Ouvre l’[accordeur](tool:stimmen). Pince une corde et laisse-la sonner. L’affichage te dit si elle est trop grave ou trop aiguë.',
        ),
        l(
          'Dreh den Wirbel ganz langsam, immer nur ein kleines Stück, und zupf dabei weiter. Zu tief? Etwas fester drehen. Zu hoch? Erst unter den Ton, dann hinauf.',
          'Turn the tuning peg very slowly, just a little at a time, and keep plucking. Too low? Tighten a bit. Too high? Go below the note first, then come up.',
          'Tourne la mécanique très lentement, un tout petit peu à la fois, en continuant à pincer. Trop grave ? Serre un peu. Trop aigu ? Descends d’abord sous la note, puis remonte.',
        ),
        l(
          'Stimm jedes Mal vor dem Üben. Eine gestimmte Ukulele klingt sofort viel schöner. So geht’s Schritt für Schritt: [Ukulele stimmen](wissen:ukulele-stimmen).',
          'Tune every time before you practise. A tuned ukulele sounds much nicer right away. Step by step: [Tuning the ukulele](wissen:ukulele-stimmen).',
          'Accorde avant chaque séance. Un ukulélé accordé sonne tout de suite bien mieux. Pas à pas : [Accorder le ukulélé](wissen:ukulele-stimmen).',
        ),
        l(
          'Pflege: Wisch nach dem Üben die Saiten kurz mit einem trockenen Tuch ab und leg die Ukulele in ihre Hülle – nicht an die Heizung und nicht in die pralle Sonne.',
          'Care: after practising, wipe the strings with a dry cloth and put the ukulele in its bag – not next to the heater and not in bright sun.',
          'Entretien : après avoir joué, essuie les cordes avec un chiffon sec et range le ukulélé dans sa housse – pas près du radiateur ni en plein soleil.',
        ),
      ],
      piece: {
        text: l(
          'Im Rhythmus „Nur runter“: viermal C anschlagen, dann G, C, E, A einzeln zupfen – immer im Wechsel. Danach „Bruder Jakob“ mit C.',
          'With the rhythm “Only down”: strum C four times, then pluck G, C, E, A one by one – keep switching. Then “Bruder Jakob” with C.',
          'Avec le rythme « Que vers le bas » : gratte C quatre fois, puis pince G, C, E, A une par une – en alternance. Puis « Bruder Jakob » avec C.',
        ),
        play: [{ tool: 'stimmen' }, { tool: 'rhythmus', pattern: 'Nur runter' }, { song: 'bruder-jakob', key: 'C' }],
      },
      homework: [
        l('Jeden Tag zuerst stimmen.', 'Tune first, every day.', 'Chaque jour, accorde d’abord.'),
        l('Die Saiten zupfen und dabei laut sagen: G, C, E, A.', 'Pluck the strings and say out loud: G, C, E, A.', 'Pince les cordes en disant à voix haute : G, C, E, A.'),
        l('Viermal C, viermal einzeln zupfen – dreimal hintereinander.', 'Four times C, four single plucks – three rounds in a row.', 'Quatre fois C, quatre cordes pincées – trois fois de suite.'),
        l('**Spaß:** Bring jemandem in der Familie den Merksatz bei.', '**Fun:** teach someone in your family the memory trick.', '**Pour le plaisir :** apprends le petit truc à quelqu’un de ta famille.'),
      ],
      done: [
        l('du alle vier Saiten mit dem Stimmgerät gestimmt hast', 'you have tuned all four strings with the tuner', 'tu as accordé les quatre cordes avec l’accordeur'),
        l('du die Saiten ohne Nachschauen benennen kannst', 'you can name the strings without looking', 'tu sais nommer les cordes sans regarder'),
      ],
      trouble: [
        l(
          'Das Stimmgerät zeigt nichts? Erlaube das Mikrofon und zupf etwas kräftiger. Leise Umgebung hilft.',
          'The tuner shows nothing? Allow the microphone and pluck a little harder. A quiet room helps.',
          'L’accordeur n’affiche rien ? Autorise le micro et pince un peu plus fort. Un endroit calme aide.',
        ),
        l(
          'Die Saite verstimmt sich gleich wieder? Neue Saiten dehnen sich noch. Das wird nach ein paar Tagen besser.',
          'The string goes out of tune again right away? New strings still stretch. It gets better after a few days.',
          'La corde se désaccorde tout de suite ? Les cordes neuves s’étirent encore. Ça ira mieux après quelques jours.',
        ),
      ],
      teacher: [
        l(
          'Einstieg: Merksatz gemeinsam sprechen, dabei auf die Saiten zeigen. Wer erfindet einen eigenen Merksatz?',
          'Warm-up: say the memory trick together while pointing at the strings. Who can invent their own?',
          'Entrée : dire le petit truc ensemble en montrant les cordes. Qui invente sa propre phrase ?',
        ),
        l(
          'Übung: Stimmen in Paaren – eine Person stimmt, die andere schaut aufs Stimmgerät. Danach tauschen.',
          'Practice: tune in pairs – one person tunes, the other watches the tuner. Then swap.',
          'Exercice : accorder en binômes – l’un accorde, l’autre regarde l’accordeur. Puis on échange.',
        ),
        l(
          'Gemeinsames Lied: „Bruder Jakob“ mit C. Eine Gruppe schlägt C, die andere zupft dazu G C E A.',
          'Song together: “Bruder Jakob” with C. One group strums C, the other plucks G C E A.',
          'Chanson ensemble : « Bruder Jakob » avec C. Un groupe gratte C, l’autre pince G C E A.',
        ),
      ],
      sheet: [
        l('Saiten von oben nach unten: **G C E A**.', 'Strings from top to bottom: **G C E A**.', 'Cordes de haut en bas : **G C E A**.'),
        l('Saite zupfen, Stimmgerät ansehen, Wirbel langsam drehen.', 'Pluck a string, watch the tuner, turn the peg slowly.', 'Pince la corde, regarde l’accordeur, tourne doucement la mécanique.'),
        l('Zu hoch? Erst unter den Ton, dann hinauf.', 'Too high? Go below the note first, then up.', 'Trop aigu ? Descends sous la note, puis remonte.'),
        l('Vor jedem Üben stimmen.', 'Tune before every practice.', 'Accorde avant chaque séance.'),
      ],
      wissen: ['ukulele-stimmen', 'ukulele-saiten'],
    },
    // ---------- 3 ----------
    {
      n: 3,
      title: l('Die Saite richtig drücken', 'Pressing the string properly', 'Bien appuyer sur la corde'),
      goal: l(
        'Du drückst eine Saite so, dass der Ton klar klingt – und spielst Blues mit der Band.',
        'You press a string so the note rings clearly – and play the blues with the band.',
        'Tu appuies sur une corde pour que la note sonne clair – et tu joues du blues avec le groupe.',
      ),
      review: l(
        'Stimm deine Ukulele und sag die Saitennamen auf. Dann viermal C.',
        'Tune your ukulele and say the string names. Then four times C.',
        'Accorde ton ukulélé et récite le nom des cordes. Puis quatre fois C.',
      ),
      steps: [
        l(
          'Drück mit der **Fingerkuppe**, nicht mit dem flachen Finger. Der Fingernagel muss kurz sein.',
          'Press with your **fingertip**, not the flat of your finger. Your fingernail needs to be short.',
          'Appuie avec le **bout du doigt**, pas avec le plat. L’ongle doit être court.',
        ),
        l(
          'Setz den Finger **kurz vor das Bundstäbchen** – also knapp links vom Metallstreifen, nicht genau darauf und nicht in die Mitte.',
          'Put your finger **just behind the fret wire** – right next to the metal strip, not on top of it and not in the middle.',
          'Pose le doigt **juste avant la frette** – tout près de la barrette en métal, pas dessus et pas au milieu de la case.',
        ),
        l(
          'Nicht zu fest! Drück nur so stark, bis der Ton klar klingt. Probier es aus: erst ganz leicht (es schnarrt), dann etwas mehr (es klingt).',
          'Not too hard! Press only until the note rings clearly. Try it: very lightly first (it buzzes), then a bit more (it rings).',
          'Pas trop fort ! Appuie juste assez pour que la note sonne clair. Essaie : d’abord très léger (ça frise), puis un peu plus (ça sonne).',
        ),
        l(
          'Der Daumen liegt locker hinten am Hals, ungefähr hinter dem Zeigefinger. Er drückt nicht dagegen wie eine Zange.',
          'Your thumb rests loosely behind the neck, roughly behind your index finger. It doesn’t squeeze like pliers.',
          'Le pouce repose souplement derrière le manche, à peu près derrière l’index. Il ne serre pas comme une pince.',
        ),
        l(
          'Übe das mit dem Ton **F**: Zeigefinger auf die E-Saite im 1. Bund. Dazu kommen die leeren Saiten C und G. Mehr: [Sauber greifen](wissen:saubere-griffe).',
          'Practise with the note **F**: index finger on the E string at the 1st fret. Plus the open strings C and G. More: [Clean fretting](wissen:saubere-griffe).',
          'Entraîne-toi avec la note **Fa** : index sur la corde E à la 1re case. Avec les cordes à vide C et G. Plus d’infos : [Bien appuyer](wissen:saubere-griffe).',
        ),
      ],
      piece: {
        text: l(
          'Blues mit Band, Stufe 1 in C: Spiel in jedem Takt viermal den Grundton. C und G sind leere Saiten, F greifst du auf der E-Saite im 1. Bund.',
          'Blues with the band, level 1 in C: play the root note four times in each bar. C and G are open strings, F is on the E string at the 1st fret.',
          'Blues avec le groupe, niveau 1 en C : joue la fondamentale quatre fois par mesure. Do et Sol sont des cordes à vide, Fa se joue sur la corde E à la 1re case.',
        ),
        play: [{ tool: 'blues', level: 1, key: 'C' }],
      },
      homework: [
        l('Stimmen, dann F auf der E-Saite: leicht – mehr – klingt!', 'Tune, then F on the E string: light – more – it rings!', 'Accorde, puis Fa sur la corde E : léger – plus – ça sonne !'),
        l('Den Finger kurz vor das Bundstäbchen setzen, zehnmal.', 'Place your finger just behind the fret wire, ten times.', 'Pose le doigt juste avant la frette, dix fois.'),
        l('Viermal C anschlagen zum Aufwärmen.', 'Strum C four times to warm up.', 'Gratte quatre fois C pour t’échauffer.'),
        l('**Spaß:** Blues mit der Band, Stufe 1, ganz langsam.', '**Fun:** blues with the band, level 1, very slowly.', '**Pour le plaisir :** blues avec le groupe, niveau 1, très lentement.'),
      ],
      done: [
        l('dein F klar klingt und nicht schnarrt', 'your F rings clearly and doesn’t buzz', 'ton Fa sonne clair sans friser'),
        l('du einmal die ganzen 12 Blues-Takte mitgespielt hast', 'you have played along with all 12 blues bars once', 'tu as joué une fois les 12 mesures du blues'),
      ],
      trouble: [
        l(
          'Es schnarrt? Rück den Finger näher ans Bundstäbchen, statt fester zu drücken.',
          'It buzzes? Move your finger closer to the fret wire instead of pressing harder.',
          'Ça frise ? Rapproche le doigt de la frette au lieu d’appuyer plus fort.',
        ),
        l(
          'Die Fingerkuppe tut weh? Das ist am Anfang normal. Lieber mehrmals kurz üben als einmal lang – bald bildet sich Hornhaut. [Mehr dazu](wissen:fingerkuppen-hornhaut).',
          'Your fingertip hurts? That’s normal at first. Practise briefly several times rather than once for long – calluses will form soon. [More](wissen:fingerkuppen-hornhaut).',
          'Le bout du doigt fait mal ? C’est normal au début. Mieux vaut plusieurs petites séances qu’une longue – la corne se forme vite. [Plus d’infos](wissen:fingerkuppen-hornhaut).',
        ),
      ],
      teacher: [
        l(
          'Einstieg: Experiment „schnarrt – klingt“: alle drücken die E-Saite im 1. Bund erst ganz leicht, dann etwas fester. Wann klingt es?',
          'Warm-up: experiment “buzz – ring”: everyone presses the E string at fret 1, first very lightly, then a bit harder. When does it ring?',
          'Entrée : expérience « ça frise – ça sonne » : tout le monde appuie sur la corde E en case 1, d’abord très léger puis un peu plus. Quand ça sonne ?',
        ),
        l(
          'Übung: Lehrkraft ruft „C“, „F“ oder „G“, die Klasse spielt den Ton einmal. Erst langsam, dann schneller.',
          'Practice: the teacher calls “C”, “F” or “G”, the class plays that note once. Slowly first, then faster.',
          'Exercice : l’enseignant annonce « Do », « Fa » ou « Sol », la classe joue la note une fois. D’abord lentement, puis plus vite.',
        ),
        l(
          'Gemeinsam: Blues mit Band, Stufe 1 in C über Lautsprecher – alle spielen die Grundtöne mit.',
          'Together: blues with the band, level 1 in C over a speaker – everyone plays the root notes.',
          'Ensemble : blues avec le groupe, niveau 1 en C sur un haut-parleur – tout le monde joue les fondamentales.',
        ),
      ],
      sheet: [
        l('Mit der **Fingerkuppe** drücken, Nagel kurz.', 'Press with your **fingertip**, nail short.', 'Appuie avec le **bout du doigt**, ongle court.'),
        l('Finger **kurz vor das Bundstäbchen** setzen.', 'Finger **just behind the fret wire**.', 'Doigt **juste avant la frette**.'),
        l('Nur so fest, bis es klingt. Daumen locker hinten.', 'Only as hard as needed to ring. Thumb loose behind.', 'Juste assez fort pour que ça sonne. Pouce souple derrière.'),
        l('Blues-Töne: C (leer), F (E-Saite, 1. Bund), G (leer).', 'Blues notes: C (open), F (E string, 1st fret), G (open).', 'Notes du blues : Do (à vide), Fa (corde E, case 1), Sol (à vide).'),
      ],
      wissen: ['saubere-griffe', 'fingerkuppen-hornhaut'],
    },
    // ---------- 4 ----------
    {
      n: 4,
      title: l('Am und der erste Wechsel', 'Am and your first change', 'Am et le premier changement'),
      goal: l(
        'Du lernst a-Moll und wechselst ruhig zwischen C und Am.',
        'You learn A minor and switch calmly between C and Am.',
        'Tu apprends La mineur et tu passes calmement de C à Am.',
      ),
      chords: ['Am'],
      review: l(
        'Spiel die Blues-Töne C, F, G der Vorwoche. Klingt das F schon klar?',
        'Play last week’s blues notes C, F, G. Does the F ring clearly yet?',
        'Joue les notes de blues de la semaine dernière : Do, Fa, Sol. Le Fa sonne-t-il clair ?',
      ),
      steps: [
        l(
          '**Am** (a-Moll): Mittelfinger auf die G-Saite (die oberste) im 2. Bund. Die anderen Saiten sind frei. Griffbild: [Am](chord:Am).',
          '**Am** (A minor): middle finger on the G string (the top one) at the 2nd fret. The other strings are open. Chart: [Am](chord:Am).',
          '**Am** (La mineur) : majeur sur la corde G (celle du haut) à la 2e case. Les autres cordes sont libres. Diagramme : [Am](chord:Am).',
        ),
        l(
          'Hör hin: C klingt hell und fröhlich, Am klingt weicher, ein bisschen nachdenklich.',
          'Listen: C sounds bright and happy, Am sounds softer, a little thoughtful.',
          'Écoute : C sonne clair et joyeux, Am sonne plus doux, un peu rêveur.',
        ),
        l(
          'Wechsel ganz langsam: C greifen – loslassen – Am greifen. Schau dir den Weg an: Ringfinger weg, Mittelfinger hin.',
          'Switch very slowly: fret C – let go – fret Am. Watch the path: ring finger off, middle finger on.',
          'Change très lentement : pose C – relâche – pose Am. Regarde le chemin : l’annulaire part, le majeur arrive.',
        ),
        l(
          'Trick: Denk den nächsten Akkord schon, während du noch den alten spielst. Mehr Tricks: [Akkordwechsel schneller](wissen:akkordwechsel-schneller).',
          'Trick: think of the next chord while you are still playing the old one. More tricks: [Faster chord changes](wissen:akkordwechsel-schneller).',
          'Astuce : pense déjà au prochain accord pendant que tu joues encore l’ancien. Plus d’astuces : [Changer d’accord plus vite](wissen:akkordwechsel-schneller).',
        ),
        l(
          'Im Akkord-Spiel zählt das Mikrofon, wie oft du in einer Minute wechselst. Nicht hetzen – sauber zählt mehr.',
          'In the chord game the microphone counts how often you switch in one minute. Don’t rush – clean beats fast.',
          'Dans le jeu des accords, le micro compte combien de changements tu fais en une minute. Pas de précipitation : propre vaut mieux que rapide.',
        ),
      ],
      piece: {
        text: l(
          'Einzählen, dann im Rhythmus „Nur runter“, langsam: viermal C, viermal Am – immer weiter im Kreis. Dann das Akkord-Spiel mit C und Am.',
          'Count in, then with the rhythm “Only down”, slow: four times C, four times Am – round and round. Then the chord game with C and Am.',
          'Compte, puis avec le rythme « Que vers le bas », lent : quatre fois C, quatre fois Am – en boucle. Puis le jeu des accords avec C et Am.',
        ),
        play: [{ tool: 'rhythmus', pattern: 'Nur runter' }, { tool: 'spiel', chords: ['C', 'Am'] }],
      },
      homework: [
        l('Stimmen und Am fünfmal greifen und anschlagen.', 'Tune, then fret and strum Am five times.', 'Accorde, puis pose et gratte Am cinq fois.'),
        l('C – Am – C – Am ganz langsam, ohne Rhythmus.', 'C – Am – C – Am very slowly, no rhythm.', 'C – Am – C – Am très lentement, sans rythme.'),
        l('Viermal C, viermal Am mit dem Metronom (Langsam).', 'Four times C, four times Am with the metronome (slow).', 'Quatre fois C, quatre fois Am avec le métronome (lent).'),
        l('**Spaß:** Akkord-Spiel C und Am – schreib deinen Rekord auf.', '**Fun:** chord game C and Am – write down your record.', '**Pour le plaisir :** jeu des accords C et Am – note ton record.'),
      ],
      done: [
        l('du von C zu Am wechselst, ohne den Takt zu verlieren (langsam)', 'you can switch from C to Am without losing the beat (slowly)', 'tu passes de C à Am sans perdre le rythme (lentement)'),
        l('du den Unterschied zwischen C und Am hören kannst', 'you can hear the difference between C and Am', 'tu entends la différence entre C et Am'),
      ],
      trouble: [
        l(
          'Der Wechsel dauert zu lange? Übe nur die Bewegung, ohne anzuschlagen: zehnmal hin und her.',
          'The change takes too long? Practise just the movement without strumming: ten times back and forth.',
          'Le changement prend trop de temps ? Entraîne seulement le mouvement, sans gratter : dix allers-retours.',
        ),
        l(
          'Beim Am klingt die C-Saite dumpf? Der Mittelfinger liegt zu flach – stell ihn steiler auf.',
          'With Am the C string sounds muffled? Your middle finger is too flat – stand it up more.',
          'Avec Am, la corde C sonne étouffée ? Le majeur est trop à plat – redresse-le.',
        ),
      ],
      teacher: [
        l(
          'Einstieg: C und Am vorspielen. Die Klasse zeigt Daumen hoch für „fröhlich“ und Daumen zur Seite für „nachdenklich“.',
          'Warm-up: play C and Am. The class shows thumbs up for “happy” and thumbs sideways for “thoughtful”.',
          'Entrée : jouer C puis Am. La classe lève le pouce pour « joyeux » et le met de côté pour « rêveur ».',
        ),
        l(
          'Übung: Wechsel auf Kommando – Lehrkraft zählt vier Schläge, auf „eins“ wird gewechselt. Erst sehr langsam.',
          'Practice: change on command – teacher counts four beats, change on “one”. Very slowly at first.',
          'Exercice : changement au signal – l’enseignant compte quatre temps, on change sur « un ». Très lentement au début.',
        ),
        l(
          'Gemeinsam: Viermal C, viermal Am als Begleitung – die Lehrkraft summt oder singt eine Melodie dazu.',
          'Together: four times C, four times Am as an accompaniment – the teacher hums or sings a tune over it.',
          'Ensemble : quatre fois C, quatre fois Am en accompagnement – l’enseignant fredonne ou chante une mélodie.',
        ),
      ],
      sheet: [
        l('**Am:** Mittelfinger auf die G-Saite, 2. Bund.', '**Am:** middle finger on the G string, 2nd fret.', '**Am :** majeur sur la corde G, 2e case.'),
        l('C hell, Am weich – hör den Unterschied.', 'C bright, Am soft – hear the difference.', 'C clair, Am doux – écoute la différence.'),
        l('Wechsel langsam: Ringfinger weg, Mittelfinger hin.', 'Change slowly: ring finger off, middle finger on.', 'Change lentement : l’annulaire part, le majeur arrive.'),
        l('Viermal C, viermal Am – im Kreis.', 'Four times C, four times Am – round and round.', 'Quatre fois C, quatre fois Am – en boucle.'),
      ],
      wissen: ['akkordwechsel-schneller', 'ukulele-erste-akkorde'],
    },
    // ---------- 5 ----------
    {
      n: 5,
      title: l('F-Dur', 'F major', 'Fa majeur'),
      goal: l(
        'Du greifst F mit zwei Fingern und spielst „Bruder Jakob“ in seiner richtigen Tonart.',
        'You fret F with two fingers and play “Bruder Jakob” in its usual key.',
        'Tu poses F avec deux doigts et tu joues « Bruder Jakob » dans sa tonalité habituelle.',
      ),
      chords: ['F'],
      review: l(
        'Viermal C, viermal Am. Wie viele Wechsel hast du im Akkord-Spiel geschafft?',
        'Four times C, four times Am. How many changes did you get in the chord game?',
        'Quatre fois C, quatre fois Am. Combien de changements as-tu réussis au jeu des accords ?',
      ),
      steps: [
        l(
          '**F** hat zwei Finger: Mittelfinger auf die G-Saite im 2. Bund (wie bei Am!), Zeigefinger auf die E-Saite im 1. Bund. Griffbild: [F](chord:F).',
          '**F** uses two fingers: middle finger on the G string at fret 2 (just like Am!), index finger on the E string at fret 1. Chart: [F](chord:F).',
          '**F** se joue avec deux doigts : majeur sur la corde G en case 2 (comme pour Am !), index sur la corde E en case 1. Diagramme : [F](chord:F).',
        ),
        l(
          'Den F-Ton auf der E-Saite kennst du schon vom Blues. Jetzt kommt nur der Mittelfinger dazu.',
          'You already know the F note on the E string from the blues. Now you just add the middle finger.',
          'Tu connais déjà le Fa sur la corde E grâce au blues. Il suffit d’ajouter le majeur.',
        ),
        l(
          'Prüf jede Saite einzeln: G, C, E, A nacheinander zupfen. Klingen alle vier? Dann schlag den ganzen Akkord an.',
          'Check each string: pluck G, C, E, A one after another. Do all four ring? Then strum the whole chord.',
          'Vérifie chaque corde : pince G, C, E, A l’une après l’autre. Les quatre sonnent ? Alors gratte tout l’accord.',
        ),
        l(
          'Wechsel C ↔ F: Am und F teilen sich den Mittelfinger. Von Am zu F musst du nur den Zeigefinger dazusetzen – probier es aus!',
          'Changing C ↔ F: Am and F share the middle finger. From Am to F you only add your index finger – try it!',
          'Changement C ↔ F : Am et F partagent le majeur. De Am à F, tu ajoutes juste l’index – essaie !',
        ),
        l(
          '„Bruder Jakob“ steht eigentlich in F. Die Begleitung wartet bei jedem Akkord, bis du so weit bist.',
          '“Bruder Jakob” is really in F. The backing waits at every chord until you’re ready.',
          '« Bruder Jakob » est en fait en F. L’accompagnement attend à chaque accord que tu sois prêt.',
        ),
      ],
      piece: {
        text: l(
          '„Bruder Jakob“ jetzt in F – bei jedem Schlag runter. Danach das Akkord-Spiel mit C und F.',
          '“Bruder Jakob” now in F – down on every beat. Then the chord game with C and F.',
          '« Bruder Jakob » maintenant en F – vers le bas à chaque temps. Puis le jeu des accords avec C et F.',
        ),
        play: [{ song: 'bruder-jakob' }, { tool: 'spiel', chords: ['C', 'F'] }],
      },
      homework: [
        l('Stimmen, F greifen und jede Saite einzeln prüfen.', 'Tune, fret F and check each string.', 'Accorde, pose F et vérifie chaque corde.'),
        l('Am – F – Am – F: nur den Zeigefinger setzen und heben.', 'Am – F – Am – F: just put down and lift your index finger.', 'Am – F – Am – F : pose et lève juste l’index.'),
        l('Viermal C, viermal F – langsam im Kreis.', 'Four times C, four times F – slowly round and round.', 'Quatre fois C, quatre fois F – lentement en boucle.'),
        l('**Spaß:** „Bruder Jakob“ in F mit Begleitung spielen.', '**Fun:** play “Bruder Jakob” in F with the backing.', '**Pour le plaisir :** joue « Bruder Jakob » en F avec l’accompagnement.'),
      ],
      done: [
        l('alle vier Saiten bei F klingen', 'all four strings ring with F', 'les quatre cordes sonnent avec F'),
        l('du „Bruder Jakob“ in F bis zum Ende spielst', 'you play “Bruder Jakob” in F to the end', 'tu joues « Bruder Jakob » en F jusqu’au bout'),
      ],
      trouble: [
        l(
          'Die E-Saite klingt nicht? Der Zeigefinger muss mit der Kuppe drücken und kurz vor dem Bundstäbchen stehen.',
          'The E string doesn’t ring? Your index finger has to press with its tip, just behind the fret wire.',
          'La corde E ne sonne pas ? L’index doit appuyer du bout, juste avant la frette.',
        ),
        l(
          'Die A-Saite klingt dumpf? Ein Finger berührt sie von oben. Wölbe die Finger wie über einen kleinen Ball.',
          'The A string sounds muffled? A finger is touching it from above. Curve your fingers as if over a small ball.',
          'La corde A sonne étouffée ? Un doigt la touche. Arrondis les doigts comme au-dessus d’une petite balle.',
        ),
      ],
      teacher: [
        l(
          'Einstieg: Alle greifen Am, dann setzt jeder nur den Zeigefinger dazu – „Zauberei, das ist F!“',
          'Warm-up: everyone frets Am, then just adds the index finger – “Magic, that’s F!”',
          'Entrée : tout le monde pose Am, puis ajoute juste l’index – « Magie, c’est F ! »',
        ),
        l(
          'Übung: Saiten-Check in Paaren – eine Person greift F, die andere hört, ob alle vier Saiten klingen.',
          'Practice: string check in pairs – one person frets F, the other listens whether all four strings ring.',
          'Exercice : contrôle en binômes – l’un pose F, l’autre écoute si les quatre cordes sonnent.',
        ),
        l(
          'Gemeinsames Lied: „Bruder Jakob“ in F, zuerst einstimmig, dann als Kanon in zwei Gruppen.',
          'Song together: “Bruder Jakob” in F, first in unison, then as a round in two groups.',
          'Chanson ensemble : « Bruder Jakob » en F, d’abord à l’unisson, puis en canon à deux groupes.',
        ),
      ],
      sheet: [
        l('**F:** Mittelfinger G-Saite 2. Bund, Zeigefinger E-Saite 1. Bund.', '**F:** middle finger G string fret 2, index E string fret 1.', '**F :** majeur corde G case 2, index corde E case 1.'),
        l('Jede Saite einzeln zupfen: Klingen alle vier?', 'Pluck each string: do all four ring?', 'Pince chaque corde : les quatre sonnent ?'),
        l('Von Am zu F: nur den Zeigefinger dazu.', 'From Am to F: just add the index finger.', 'De Am à F : ajoute juste l’index.'),
      ],
      wissen: ['ukulele-erste-akkorde', 'saubere-griffe'],
    },
    // ---------- 6 ----------
    {
      n: 6,
      title: l('C7 und das erste Lied mit Wechsel', 'C7 and your first song with changes', 'C7 et la première chanson avec changement'),
      goal: l(
        'Du lernst C7 und begleitest ein ganzes Lied mit den zwei Akkorden F und C7.',
        'You learn C7 and accompany a whole song with two chords, F and C7.',
        'Tu apprends C7 et tu accompagnes toute une chanson avec deux accords, F et C7.',
      ),
      chords: ['C7'],
      review: l(
        'Spiel „Bruder Jakob“ in F. Klingen alle vier Saiten?',
        'Play “Bruder Jakob” in F. Do all four strings ring?',
        'Joue « Bruder Jakob » en F. Les quatre cordes sonnent ?',
      ),
      steps: [
        l(
          '**C7**: Zeigefinger auf die A-Saite im 1. Bund. Fertig! Griffbild: [C7](chord:C7).',
          '**C7**: index finger on the A string at fret 1. Done! Chart: [C7](chord:C7).',
          '**C7** : index sur la corde A en case 1. C’est tout ! Diagramme : [C7](chord:C7).',
        ),
        l(
          'C7 klingt, als wolle er weiter – meistens geht es danach zu F. Hör es dir an: C7 – F. Das klingt wie „angekommen“.',
          'C7 sounds like it wants to move on – usually to F. Listen: C7 – F. It sounds like “arrived”.',
          'C7 donne envie d’avancer – le plus souvent vers F. Écoute : C7 – F. On dirait « arrivé ».',
        ),
        l(
          'Wechsel F ↔ C7: Bei F liegt der Zeigefinger auf der E-Saite. Für C7 rutscht er eine Saite tiefer auf die A-Saite, der Mittelfinger geht weg.',
          'Changing F ↔ C7: with F your index finger is on the E string. For C7 it slides one string down to the A string, the middle finger lifts.',
          'Changement F ↔ C7 : pour F, l’index est sur la corde E. Pour C7, il glisse d’une corde vers le bas sur la corde A, le majeur se lève.',
        ),
        l(
          'Im Lied stehen die Akkorde über dem Text. Gewechselt wird genau dort, wo der neue Akkord steht. Die Begleitung wartet auf dich.',
          'In the song the chords stand above the words. Change exactly where the new chord appears. The backing waits for you.',
          'Dans la chanson, les accords sont au-dessus des paroles. Change exactement là où le nouvel accord apparaît. L’accompagnement t’attend.',
        ),
      ],
      piece: {
        text: l(
          '„Old MacDonald“ mit F und C7 – dein erstes Lied mit Akkordwechsel! Für ruhige Abende: „Schlaf, Kindlein, schlaf“.',
          '“Old MacDonald” with F and C7 – your first song with chord changes! For quiet evenings: “Schlaf, Kindlein, schlaf”.',
          '« Old MacDonald » avec F et C7 – ta première chanson avec changements d’accords ! Pour le soir : « Schlaf, Kindlein, schlaf ».',
        ),
        play: [{ song: 'old-macdonald' }, { song: 'schlaf-kindlein' }, { tool: 'spiel', chords: ['F', 'C7'] }],
      },
      homework: [
        l('Stimmen, dann F – C7 – F – C7 ohne Anschlag, zehnmal.', 'Tune, then F – C7 – F – C7 without strumming, ten times.', 'Accorde, puis F – C7 – F – C7 sans gratter, dix fois.'),
        l('Viermal F, viermal C7 – langsam im Kreis.', 'Four times F, four times C7 – slowly round and round.', 'Quatre fois F, quatre fois C7 – lentement en boucle.'),
        l('„Old MacDonald“ mit „Wartet auf mich“.', '“Old MacDonald” with “Waits for me”.', '« Old MacDonald » avec « Attends-moi ».'),
        l('**Spaß:** Erfinde neue Tiere für „Old MacDonald“ und sing sie.', '**Fun:** invent new animals for “Old MacDonald” and sing them.', '**Pour le plaisir :** invente de nouveaux animaux pour « Old MacDonald » et chante-les.'),
      ],
      done: [
        l('du „Old MacDonald“ einmal ganz begleitest', 'you accompany “Old MacDonald” all the way through once', 'tu accompagnes « Old MacDonald » une fois en entier'),
        l('du von F zu C7 wechselst, ohne hinzuschauen', 'you switch from F to C7 without looking', 'tu passes de F à C7 sans regarder'),
      ],
      trouble: [
        l(
          'Du kommst zu spät zum neuen Akkord? Lass den letzten Schlag vor dem Wechsel weg und nutz die Zeit zum Umgreifen.',
          'You arrive late at the new chord? Leave out the last strum before the change and use that time to move.',
          'Tu arrives en retard sur le nouvel accord ? Saute le dernier coup avant le changement et profites-en pour changer.',
        ),
        l(
          'Die Finger tun weh? Mach nach 10 Minuten Pause. Kurz und oft ist besser als lang.',
          'Your fingers hurt? Take a break after 10 minutes. Short and often beats long.',
          'Les doigts font mal ? Fais une pause après 10 minutes. Court et souvent, c’est mieux que long.',
        ),
      ],
      teacher: [
        l(
          'Einstieg: C7 – F vorspielen und fragen: Wie klingt C7 – fertig oder noch nicht fertig?',
          'Warm-up: play C7 – F and ask: does C7 sound finished or not yet finished?',
          'Entrée : jouer C7 – F et demander : C7 sonne-t-il fini ou pas encore fini ?',
        ),
        l(
          'Übung: Die Klasse spielt F, auf Handzeichen wechseln alle zu C7 und zurück. Das Tempo der Zeichen langsam steigern.',
          'Practice: the class plays F, on a hand signal everyone changes to C7 and back. Slowly speed up the signals.',
          'Exercice : la classe joue F, sur un signe de la main tout le monde passe à C7 et revient. Accélérer peu à peu.',
        ),
        l(
          'Gemeinsames Lied: „Old MacDonald“ – jedes Kind darf ein Tier wünschen, die ganze Klasse macht das Geräusch.',
          'Song together: “Old MacDonald” – each child picks an animal, the whole class makes the sound.',
          'Chanson ensemble : « Old MacDonald » – chaque enfant choisit un animal, toute la classe fait le cri.',
        ),
      ],
      sheet: [
        l('**C7:** Zeigefinger auf die A-Saite, 1. Bund.', '**C7:** index finger on the A string, fret 1.', '**C7 :** index sur la corde A, case 1.'),
        l('F → C7: Zeigefinger rutscht eine Saite tiefer.', 'F → C7: index finger slides down one string.', 'F → C7 : l’index glisse d’une corde vers le bas.'),
        l('Gewechselt wird dort, wo der neue Akkord über dem Text steht.', 'Change where the new chord stands above the words.', 'Change là où le nouvel accord est au-dessus des paroles.'),
      ],
      wissen: ['akkordwechsel-schneller', 'akkordsymbole-lesen'],
    },
    // ---------- 7 ----------
    {
      n: 7,
      title: l('Runter-rauf', 'Down-up', 'Bas-haut'),
      goal: l(
        'Du schlägst gleichmäßig runter und rauf und spielst damit zwei Lieder.',
        'You strum evenly down and up and use it in two songs.',
        'Tu grattes régulièrement vers le bas et vers le haut et tu l’utilises dans deux chansons.',
      ),
      review: l(
        '„Old MacDonald“ mit F und C7 – klappt der Wechsel schon ohne Hinschauen?',
        '“Old MacDonald” with F and C7 – does the change work without looking yet?',
        '« Old MacDonald » avec F et C7 – le changement marche-t-il sans regarder ?',
      ),
      steps: [
        l(
          'Bis jetzt hast du nur runter geschlagen. Jetzt kommt rauf dazu: runter mit dem Fingernagel, rauf mit der Fingerkuppe.',
          'So far you’ve only strummed down. Now add up: down with the fingernail, up with the fingertip.',
          'Jusqu’ici tu grattais seulement vers le bas. Ajoute maintenant le haut : en bas avec l’ongle, en haut avec la pulpe.',
        ),
        l(
          'Zähl dabei: „eins und zwei und drei und vier und“. Auf die Zahlen geht es runter, auf „und“ rauf.',
          'Count: “one and two and three and four and”. Down on the numbers, up on “and”.',
          'Compte : « un et deux et trois et quatre et ». En bas sur les chiffres, en haut sur « et ».',
        ),
        l(
          'Die Hand schwingt immer weiter wie ein Pendel – auch wenn du mal nicht triffst. So bleibt der Rhythmus stabil.',
          'Your hand keeps swinging like a pendulum – even if you miss once. That keeps the rhythm steady.',
          'La main continue de se balancer comme un pendule – même si tu rates une corde. Le rythme reste stable.',
        ),
        l(
          'Übe im [Rhythmus](tool:rhythmus) das Muster „Runter-rauf“, erst auf „Langsam“. Mehr dazu: [Schlagmuster lernen](wissen:schlagmuster-lernen).',
          'Practise the “Down-up” pattern in [Rhythm](tool:rhythmus), on “Slow” first. More: [Learning strumming patterns](wissen:schlagmuster-lernen).',
          'Entraîne le motif « Bas-haut » dans [Rythme](tool:rhythmus), d’abord sur « Lent ». Plus d’infos : [Apprendre les rythmiques](wissen:schlagmuster-lernen).',
        ),
        l(
          'Rauf brauchst du nicht alle Saiten zu treffen – zwei oder drei reichen. Rauf darf leiser sein als runter.',
          'On the up-strum you don’t need to hit all strings – two or three are enough. Up can be quieter than down.',
          'Vers le haut, pas besoin de toucher toutes les cordes – deux ou trois suffisent. Le haut peut être plus doux que le bas.',
        ),
      ],
      piece: {
        text: l(
          'Erst „Runter-rauf“ mit F im Rhythmus-Werkzeug. Dann „Yankee Doodle“ und „Ode an die Freude“ mit F und C7 – jetzt mit Runter-rauf!',
          'First “Down-up” with F in the rhythm tool. Then “Yankee Doodle” and “Ode an die Freude” with F and C7 – now with down-up!',
          'D’abord « Bas-haut » avec F dans l’outil rythme. Puis « Yankee Doodle » et « Ode an die Freude » avec F et C7 – maintenant en bas-haut !',
        ),
        play: [{ tool: 'rhythmus', pattern: 'Runter-rauf' }, { song: 'yankee-doodle' }, { song: 'ode-an-die-freude' }],
      },
      homework: [
        l('Runter-rauf ohne Akkord, nur auf leeren Saiten, mit Metronom.', 'Down-up without a chord, open strings only, with the metronome.', 'Bas-haut sans accord, cordes à vide, avec le métronome.'),
        l('Runter-rauf mit F, dann mit C7.', 'Down-up with F, then with C7.', 'Bas-haut avec F, puis avec C7.'),
        l('„Yankee Doodle“ mit Runter-rauf.', '“Yankee Doodle” with down-up.', '« Yankee Doodle » en bas-haut.'),
        l('**Spaß:** Spiel ein Lied deiner Wahl und klopf dabei mit dem Fuß.', '**Fun:** play a song of your choice and tap your foot.', '**Pour le plaisir :** joue une chanson au choix en tapant du pied.'),
      ],
      done: [
        l('deine Hand gleichmäßig runter und rauf schwingt', 'your hand swings down and up evenly', 'ta main se balance régulièrement en bas et en haut'),
        l('du ein Lied mit Runter-rauf ganz durchspielst', 'you play a whole song with down-up', 'tu joues une chanson entière en bas-haut'),
      ],
      trouble: [
        l(
          'Die Hand bleibt hängen? Schlag nicht zu tief in die Saiten – nur leicht drüberstreichen.',
          'Your hand gets stuck? Don’t dig into the strings – just brush lightly across.',
          'La main accroche ? N’enfonce pas les doigts dans les cordes – effleure-les légèrement.',
        ),
        l(
          'Es wird immer schneller? Stell das Metronom auf „Langsam“ und zähl laut mit.',
          'It keeps getting faster? Set the metronome to “Slow” and count out loud.',
          'Ça accélère sans cesse ? Mets le métronome sur « Lent » et compte à voix haute.',
        ),
      ],
      teacher: [
        l(
          'Einstieg: Alle machen die Pendelbewegung in der Luft, ohne Ukulele, und sprechen „runter-rauf“.',
          'Warm-up: everyone does the pendulum movement in the air, without the ukulele, saying “down-up”.',
          'Entrée : tout le monde fait le mouvement de pendule dans l’air, sans ukulélé, en disant « bas-haut ».',
        ),
        l(
          'Übung: Hälfte spielt nur runter, die andere Hälfte runter-rauf – gleichzeitig zum Metronom.',
          'Practice: half play down only, the other half down-up – at the same time to the metronome.',
          'Exercice : une moitié joue seulement en bas, l’autre en bas-haut – en même temps, avec le métronome.',
        ),
        l(
          'Gemeinsames Lied: „Ode an die Freude“ – erst langsam singen, dann mit Runter-rauf begleiten.',
          'Song together: “Ode an die Freude” – sing slowly first, then accompany with down-up.',
          'Chanson ensemble : « Ode an die Freude » – chanter lentement d’abord, puis accompagner en bas-haut.',
        ),
      ],
      sheet: [
        l('Runter mit dem Nagel, rauf mit der Kuppe.', 'Down with the nail, up with the fingertip.', 'En bas avec l’ongle, en haut avec la pulpe.'),
        l('Zählen: „eins und zwei und …“ – Zahl runter, „und“ rauf.', 'Count: “one and two and …” – number down, “and” up.', 'Compter : « un et deux et … » – chiffre en bas, « et » en haut.'),
        l('Die Hand schwingt immer weiter wie ein Pendel.', 'Your hand always keeps swinging like a pendulum.', 'La main se balance toujours comme un pendule.'),
      ],
      wissen: ['schlagmuster-lernen', 'mit-metronom-ueben'],
    },
    // ---------- 8 ----------
    {
      n: 8,
      title: l('G7', 'G7', 'G7'),
      goal: l(
        'Du lernst G7 mit drei Fingern und spielst „Hänschen klein“ mit C und G7.',
        'You learn G7 with three fingers and play “Hänschen klein” with C and G7.',
        'Tu apprends G7 avec trois doigts et tu joues « Hänschen klein » avec C et G7.',
      ),
      chords: ['G7'],
      review: l(
        'Runter-rauf mit F und C7 zum Metronom. Schwingt die Hand gleichmäßig?',
        'Down-up with F and C7 to the metronome. Is your hand swinging evenly?',
        'Bas-haut avec F et C7 au métronome. Ta main se balance-t-elle régulièrement ?',
      ),
      steps: [
        l(
          '**G7** bildet ein kleines Dreieck: Mittelfinger auf der C-Saite im 2. Bund, Zeigefinger auf der E-Saite im 1. Bund, Ringfinger auf der A-Saite im 2. Bund. Griffbild: [G7](chord:G7).',
          '**G7** makes a little triangle: middle finger on the C string at fret 2, index on the E string at fret 1, ring finger on the A string at fret 2. Chart: [G7](chord:G7).',
          '**G7** forme un petit triangle : majeur sur la corde C en case 2, index sur la corde E en case 1, annulaire sur la corde A en case 2. Diagramme : [G7](chord:G7).',
        ),
        l(
          'Setz die Finger einzeln, dann alle zusammen. Zupf jede Saite einzeln – auch die leere G-Saite muss klingen.',
          'Place the fingers one by one, then all together. Pluck each string – the open G string must ring too.',
          'Pose les doigts un par un, puis tous ensemble. Pince chaque corde – la corde G à vide doit sonner aussi.',
        ),
        l(
          'G7 will zurück zum C, genau wie C7 zum F. Hör es dir an: G7 – C.',
          'G7 wants to go back to C, just like C7 goes to F. Listen: G7 – C.',
          'G7 veut revenir à C, comme C7 va vers F. Écoute : G7 – C.',
        ),
        l(
          'Wechsel C ↔ G7: Beim C ist nur der Ringfinger unten. Übe erst die Form von G7 „in der Luft“ und setz sie dann als Ganzes auf.',
          'Changing C ↔ G7: with C only your ring finger is down. Practise the G7 shape “in the air” first, then put it down as one.',
          'Changement C ↔ G7 : pour C, seul l’annulaire est posé. Forme d’abord G7 « en l’air », puis pose-le d’un coup.',
        ),
      ],
      piece: {
        text: l(
          '„Hänschen klein“ und „Summ, summ, summ“ mit C und G7. Nimm „Nur runter“ oder schon „Runter-rauf“ – du entscheidest.',
          '“Hänschen klein” and “Summ, summ, summ” with C and G7. Use “Only down” or already “Down-up” – your choice.',
          '« Hänschen klein » et « Summ, summ, summ » avec C et G7. En « seulement vers le bas » ou déjà en « bas-haut » – à toi de choisir.',
        ),
        play: [{ song: 'haenschen-klein' }, { song: 'summ-summ' }, { tool: 'spiel', chords: ['C', 'G7'] }],
      },
      homework: [
        l('G7 greifen, jede Saite prüfen, loslassen – fünfmal.', 'Fret G7, check each string, let go – five times.', 'Pose G7, vérifie chaque corde, relâche – cinq fois.'),
        l('C – G7 – C – G7 langsam, ohne Rhythmus.', 'C – G7 – C – G7 slowly, no rhythm.', 'C – G7 – C – G7 lentement, sans rythme.'),
        l('„Hänschen klein“ mit „Wartet auf mich“.', '“Hänschen klein” with “Waits for me”.', '« Hänschen klein » avec « Attends-moi ».'),
        l('**Spaß:** Akkord-Spiel C und G7 – schlag deinen Rekord.', '**Fun:** chord game C and G7 – beat your record.', '**Pour le plaisir :** jeu des accords C et G7 – bats ton record.'),
      ],
      done: [
        l('bei G7 alle vier Saiten klingen', 'all four strings ring with G7', 'les quatre cordes sonnent avec G7'),
        l('du „Hänschen klein“ ganz begleitest', 'you accompany all of “Hänschen klein”', 'tu accompagnes « Hänschen klein » en entier'),
      ],
      trouble: [
        l(
          'Die Finger passen nicht nebeneinander? Lass den Daumen hinten tiefer am Hals sinken – dann haben die Finger mehr Platz.',
          'Your fingers don’t fit side by side? Let your thumb sink lower behind the neck – that gives your fingers more room.',
          'Les doigts ne tiennent pas côte à côte ? Descends un peu le pouce derrière le manche – les doigts auront plus de place.',
        ),
        l(
          'Die G-Saite klingt nicht? Der Mittelfinger liegt an ihr an. Stell ihn steiler auf.',
          'The G string doesn’t ring? Your middle finger is leaning on it. Stand it up more.',
          'La corde G ne sonne pas ? Le majeur la touche. Redresse-le.',
        ),
      ],
      teacher: [
        l(
          'Einstieg: „Finger-Dreieck“ – alle formen G7 in der Luft, setzen es auf, heben es ab. Fünfmal.',
          'Warm-up: “finger triangle” – everyone forms G7 in the air, puts it down, lifts it. Five times.',
          'Entrée : « triangle de doigts » – tout le monde forme G7 en l’air, le pose, le lève. Cinq fois.',
        ),
        l(
          'Übung: Lehrkraft spielt C oder G7, die Klasse hört und ruft den Akkord. Danach selbst wechseln.',
          'Practice: the teacher plays C or G7, the class listens and calls out the chord. Then switch yourselves.',
          'Exercice : l’enseignant joue C ou G7, la classe écoute et annonce l’accord. Puis à vous de changer.',
        ),
        l(
          'Gemeinsames Lied: „Hänschen klein“ – eine Gruppe singt, eine spielt, dann tauschen.',
          'Song together: “Hänschen klein” – one group sings, one plays, then swap.',
          'Chanson ensemble : « Hänschen klein » – un groupe chante, l’autre joue, puis on échange.',
        ),
      ],
      sheet: [
        l('**G7:** Mittel C-Saite 2, Zeige E-Saite 1, Ring A-Saite 2.', '**G7:** middle C string 2, index E string 1, ring A string 2.', '**G7 :** majeur corde C 2, index corde E 1, annulaire corde A 2.'),
        l('Jede Saite einzeln prüfen – auch die leere G-Saite.', 'Check each string – the open G string too.', 'Vérifie chaque corde – la corde G à vide aussi.'),
        l('G7 in der Luft formen, dann als Ganzes aufsetzen.', 'Form G7 in the air, then put it down as one.', 'Forme G7 en l’air, puis pose-le d’un coup.'),
      ],
      wissen: ['ukulele-erste-akkorde', 'akkordwechsel-schneller'],
    },
    // ---------- 9 ----------
    {
      n: 9,
      title: l('Drei Akkorde: C, F, G7', 'Three chords: C, F, G7', 'Trois accords : C, F, G7'),
      goal: l(
        'Du verbindest C, F und G7 und kannst damit viele Kinderlieder begleiten.',
        'You connect C, F and G7 and can accompany lots of children’s songs with them.',
        'Tu enchaînes C, F et G7 et tu peux accompagner beaucoup de chansons pour enfants.',
      ),
      review: l(
        'C – G7 – C – G7: Klingt dein G7 schon sauber?',
        'C – G7 – C – G7: does your G7 sound clean yet?',
        'C – G7 – C – G7 : ton G7 sonne-t-il déjà bien ?',
      ),
      steps: [
        l(
          'Mit C, F und G7 kannst du sehr viele Lieder spielen. Sie gehören zusammen wie eine kleine Familie: C ist zu Hause, F und G7 sind Ausflüge.',
          'With C, F and G7 you can play loads of songs. They belong together like a little family: C is home, F and G7 are trips away.',
          'Avec C, F et G7, tu peux jouer énormément de chansons. Ils forment une petite famille : C, c’est la maison, F et G7 sont des balades.',
        ),
        l(
          'Übe den Kreis C – F – G7 – C. Jeder Akkord bekommt vier Schläge.',
          'Practise the circle C – F – G7 – C. Each chord gets four strums.',
          'Entraîne le cercle C – F – G7 – C. Chaque accord a quatre coups.',
        ),
        l(
          'Von F zu G7: Der Zeigefinger bleibt auf der E-Saite im 1. Bund liegen! Nur die anderen Finger wandern.',
          'From F to G7: your index finger stays on the E string at fret 1! Only the other fingers move.',
          'De F à G7 : l’index reste sur la corde E en case 1 ! Seuls les autres doigts bougent.',
        ),
        l(
          'Im Akkord-Spiel mit „C · F · G7“ zählt das Mikrofon deine Wechsel. Lieber sauber als schnell.',
          'In the chord game with “C · F · G7” the microphone counts your changes. Clean is better than fast.',
          'Dans le jeu des accords avec « C · F · G7 », le micro compte tes changements. Propre vaut mieux que rapide.',
        ),
      ],
      piece: {
        text: l(
          '„Alle meine Entchen“ und „Twinkle, Twinkle, Little Star“ mit C, F und G7. Wer mag, singt dazu.',
          '“Alle meine Entchen” and “Twinkle, Twinkle, Little Star” with C, F and G7. Sing along if you like.',
          '« Alle meine Entchen » et « Twinkle, Twinkle, Little Star » avec C, F et G7. Chante si tu veux.',
        ),
        play: [{ song: 'alle-meine-entchen' }, { song: 'twinkle' }, { tool: 'spiel', chords: ['C', 'F', 'G7'] }],
      },
      homework: [
        l('Kreis C – F – G7 – C, je vier Schläge, dreimal.', 'Circle C – F – G7 – C, four strums each, three times.', 'Cercle C – F – G7 – C, quatre coups chacun, trois fois.'),
        l('F → G7: Zeigefinger liegen lassen, zehnmal.', 'F → G7: keep the index finger down, ten times.', 'F → G7 : garde l’index posé, dix fois.'),
        l('„Alle meine Entchen“ ganz begleiten.', 'Accompany all of “Alle meine Entchen”.', 'Accompagne « Alle meine Entchen » en entier.'),
        l('**Spaß:** „Twinkle“ jemandem vorspielen.', '**Fun:** play “Twinkle” for someone.', '**Pour le plaisir :** joue « Twinkle » pour quelqu’un.'),
      ],
      done: [
        l('du den Kreis C – F – G7 – C ohne Anhalten spielst', 'you play the circle C – F – G7 – C without stopping', 'tu joues le cercle C – F – G7 – C sans t’arrêter'),
        l('du ein Lied mit drei Akkorden ganz begleitest', 'you accompany a whole song with three chords', 'tu accompagnes une chanson entière avec trois accords'),
      ],
      trouble: [
        l(
          'Ein Wechsel klappt nicht? Übe nur dieses eine Paar (z. B. F → G7) eine Minute lang, dann wieder das ganze Lied.',
          'One change doesn’t work? Practise just that pair (e.g. F → G7) for a minute, then the whole song again.',
          'Un changement ne marche pas ? Entraîne seulement cette paire (par ex. F → G7) une minute, puis la chanson entière.',
        ),
        l(
          'Du verlierst den Überblick? Sag den nächsten Akkord leise vor dich hin, bevor er kommt.',
          'You lose track? Whisper the next chord to yourself before it comes.',
          'Tu te perds ? Dis tout bas le prochain accord avant qu’il arrive.',
        ),
      ],
      teacher: [
        l(
          'Einstieg: Akkord-Ansage – Lehrkraft zeigt Karten mit C, F oder G7, die Klasse greift sofort.',
          'Warm-up: chord call – the teacher shows cards with C, F or G7, the class frets it right away.',
          'Entrée : annonce d’accords – l’enseignant montre des cartes C, F ou G7, la classe pose l’accord aussitôt.',
        ),
        l(
          'Übung: Kreis C – F – G7 – C gemeinsam, erst mit vier, dann mit zwei Schlägen pro Akkord.',
          'Practice: circle C – F – G7 – C together, first with four, then two strums per chord.',
          'Exercice : cercle C – F – G7 – C ensemble, d’abord quatre puis deux coups par accord.',
        ),
        l(
          'Gemeinsames Lied: „Alle meine Entchen“ – alle singen und spielen. Danach „Twinkle“ auf Englisch.',
          'Song together: “Alle meine Entchen” – everyone sings and plays. Then “Twinkle” in English.',
          'Chanson ensemble : « Alle meine Entchen » – tout le monde chante et joue. Puis « Twinkle » en anglais.',
        ),
      ],
      sheet: [
        l('Kreis: C – F – G7 – C, je vier Schläge.', 'Circle: C – F – G7 – C, four strums each.', 'Cercle : C – F – G7 – C, quatre coups chacun.'),
        l('F → G7: Zeigefinger bleibt auf der E-Saite liegen.', 'F → G7: index finger stays on the E string.', 'F → G7 : l’index reste sur la corde E.'),
        l('Nächsten Akkord leise vorsagen.', 'Whisper the next chord.', 'Dis tout bas le prochain accord.'),
      ],
      wissen: ['lieder-fuer-anfaenger', 'akkordwechsel-schneller'],
    },
    // ---------- 10 ----------
    {
      n: 10,
      title: l('Der Insel-Schlag', 'The island strum', 'Le rythme des îles'),
      goal: l(
        'Du lernst das typische Ukulele-Schlagmuster „runter, runter, rauf, rauf, runter, rauf“.',
        'You learn the classic ukulele strum “down, down, up, up, down, up”.',
        'Tu apprends le rythme typique du ukulélé « bas, bas, haut, haut, bas, haut ».',
      ),
      review: l(
        'Spiel „Alle meine Entchen“ mit C, F und G7 – diesmal mit Runter-rauf.',
        'Play “Alle meine Entchen” with C, F and G7 – this time with down-up.',
        'Joue « Alle meine Entchen » avec C, F et G7 – cette fois en bas-haut.',
      ),
      steps: [
        l(
          'Das Muster heißt: **runter, runter, rauf, rauf, runter, rauf**. Es klingt nach Strand und Sonne.',
          'The pattern is: **down, down, up, up, down, up**. It sounds like beach and sunshine.',
          'Le motif : **bas, bas, haut, haut, bas, haut**. Ça sonne comme la plage et le soleil.',
        ),
        l(
          'Das Geheimnis: Die Hand schwingt wie beim Runter-rauf immer weiter. Zwischen den beiden „rauf“ geht sie runter, **ohne** die Saiten zu treffen.',
          'The secret: your hand keeps swinging like in down-up. Between the two “ups” it goes down **without** touching the strings.',
          'Le secret : la main continue de se balancer comme en bas-haut. Entre les deux « haut », elle descend **sans** toucher les cordes.',
        ),
        l(
          'Zähl so: „eins, zwei und – und vier und“. Bei „drei“ macht die Hand die Luftbewegung.',
          'Count: “one, two and – and four and”. On “three” your hand strums the air.',
          'Compte : « un, deux et – et quatre et ». Sur « trois », la main gratte l’air.',
        ),
        l(
          'Übe es im [Rhythmus](tool:rhythmus) mit C, zuerst auf „Langsam“. Das Werkzeug spielt dir das Muster vor. Mehr: [Mit Metronom üben](wissen:mit-metronom-ueben).',
          'Practise it in [Rhythm](tool:rhythmus) with C, on “Slow” first. The tool plays the pattern for you. More: [Practising with a metronome](wissen:mit-metronom-ueben).',
          'Entraîne-le dans [Rythme](tool:rhythmus) avec C, d’abord sur « Lent ». L’outil te joue le motif. Plus d’infos : [Jouer avec un métronome](wissen:mit-metronom-ueben).',
        ),
        l(
          'Erst wenn es mit einem Akkord gleichmäßig klappt, nimm ein Lied dazu.',
          'Only when it works evenly with one chord, add a song.',
          'Seulement quand c’est régulier avec un accord, passe à une chanson.',
        ),
      ],
      piece: {
        text: l(
          'Insel-Schlag mit C, dann „Michael, Row the Boat Ashore“ und „Swing Low, Sweet Chariot“ mit C, F und G7 – klingt gleich viel mehr nach Ukulele!',
          'Island strum with C, then “Michael, Row the Boat Ashore” and “Swing Low, Sweet Chariot” with C, F and G7 – sounds much more like ukulele!',
          'Rythme des îles avec C, puis « Michael, Row the Boat Ashore » et « Swing Low, Sweet Chariot » avec C, F et G7 – ça sonne vraiment ukulélé !',
        ),
        play: [{ tool: 'rhythmus', pattern: 'Runter, runter, rauf, rauf, runter, rauf' }, { song: 'michael-row' }, { song: 'swing-low' }],
      },
      homework: [
        l('Muster ohne Ukulele in der Luft, laut sprechen.', 'Pattern in the air without the ukulele, saying it out loud.', 'Le motif en l’air sans ukulélé, en le disant à voix haute.'),
        l('Insel-Schlag mit C, Metronom „Langsam“, zwei Minuten.', 'Island strum with C, metronome “Slow”, two minutes.', 'Rythme des îles avec C, métronome « Lent », deux minutes.'),
        l('Mit Akkordwechsel: zweimal Muster C, zweimal F.', 'With changes: pattern twice on C, twice on F.', 'Avec changement : deux fois le motif sur C, deux fois sur F.'),
        l('**Spaß:** „Michael, Row the Boat Ashore“ mit Insel-Schlag.', '**Fun:** “Michael, Row the Boat Ashore” with the island strum.', '**Pour le plaisir :** « Michael, Row the Boat Ashore » avec le rythme des îles.'),
      ],
      done: [
        l('du das Muster viermal hintereinander gleichmäßig spielst', 'you play the pattern four times in a row evenly', 'tu joues le motif quatre fois de suite régulièrement'),
        l('du ein Lied mit dem Insel-Schlag begleitest (auch langsam)', 'you accompany a song with the island strum (slow is fine)', 'tu accompagnes une chanson avec le rythme des îles (même lentement)'),
      ],
      trouble: [
        l(
          'Die Hand stoppt bei „drei“? Dann ist der Luftschlag verloren gegangen. Mach ihn anfangs übertrieben groß.',
          'Your hand stops on “three”? Then the air strum got lost. Make it extra big at first.',
          'La main s’arrête sur « trois » ? Le coup dans l’air a disparu. Fais-le exagérément grand au début.',
        ),
        l(
          'Mit Akkordwechsel fällt alles auseinander? Spiel beim Wechsel nur einmal runter und fang dann das Muster neu an.',
          'Everything falls apart with chord changes? Strum just once down at the change, then restart the pattern.',
          'Tout se défait avec les changements ? Au changement, gratte juste une fois vers le bas, puis reprends le motif.',
        ),
      ],
      teacher: [
        l(
          'Einstieg: Muster mit Körperklatschen – Oberschenkel runter, Hände rauf. Alle sprechen mit.',
          'Warm-up: body percussion – thighs for down, hands up for up. Everyone says it along.',
          'Entrée : percussions corporelles – cuisses pour le bas, mains en haut pour le haut. Tout le monde dit le motif.',
        ),
        l(
          'Übung: Ein Akkord, das Muster in Schleife; dann Wechsel nach je zwei Mustern.',
          'Practice: one chord, pattern on repeat; then change after every two patterns.',
          'Exercice : un accord, le motif en boucle ; puis changement toutes les deux mesures.',
        ),
        l(
          'Gemeinsames Lied: „Michael, Row the Boat Ashore“ – Halleluja-Rufe darf die ganze Klasse laut singen.',
          'Song together: “Michael, Row the Boat Ashore” – the whole class sings the hallelujahs loudly.',
          'Chanson ensemble : « Michael, Row the Boat Ashore » – toute la classe chante fort les « Alléluia ».',
        ),
      ],
      sheet: [
        l('**runter, runter, rauf, rauf, runter, rauf**', '**down, down, up, up, down, up**', '**bas, bas, haut, haut, bas, haut**'),
        l('Zählen: „eins, zwei und – und vier und“.', 'Count: “one, two and – and four and”.', 'Compter : « un, deux et – et quatre et ».'),
        l('Bei „drei“ schwingt die Hand runter, ohne zu treffen.', 'On “three” your hand swings down without hitting.', 'Sur « trois », la main descend sans toucher.'),
      ],
      wissen: ['schlagmuster-lernen', 'mit-metronom-ueben'],
    },
    // ---------- 11 ----------
    {
      n: 11,
      title: l('Walzer im Dreiertakt', 'Waltz in three', 'La valse à trois temps'),
      goal: l(
        'Du spielst im 3/4-Takt und begleitest „Zum Geburtstag viel Glück“.',
        'You play in 3/4 time and accompany “Zum Geburtstag viel Glück”.',
        'Tu joues à trois temps et tu accompagnes « Zum Geburtstag viel Glück ».',
      ),
      review: l(
        'Der Insel-Schlag mit C und F – ist er schon gleichmäßig?',
        'The island strum with C and F – is it even yet?',
        'Le rythme des îles avec C et F – est-il déjà régulier ?',
      ),
      steps: [
        l(
          'Bisher hast du immer bis vier gezählt. Ein Walzer zählt nur bis **drei**: „**eins**, zwei, drei, **eins**, zwei, drei“.',
          'So far you’ve always counted to four. A waltz only counts to **three**: “**one**, two, three, **one**, two, three”.',
          'Jusqu’ici tu comptais jusqu’à quatre. Une valse compte seulement jusqu’à **trois** : « **un**, deux, trois, **un**, deux, trois ».',
        ),
        l(
          'Die Eins ist etwas lauter. So hört man, wo der Takt beginnt – wie beim Tanzen: großer Schritt, klein, klein.',
          'The one is a little louder. That way you hear where the bar starts – like dancing: big step, small, small.',
          'Le un est un peu plus fort. On entend ainsi où commence la mesure – comme en dansant : grand pas, petit, petit.',
        ),
        l(
          'Wähle im [Rhythmus](tool:rhythmus) das Muster „Walzer (3/4)“. Später kannst du „Walzer mit rauf“ probieren.',
          'In [Rhythm](tool:rhythmus) choose the “Waltz (3/4)” pattern. Later you can try “Waltz with up”.',
          'Dans [Rythme](tool:rhythmus), choisis le motif « Valse (3/4) ». Plus tard, essaie « Valse avec haut ».',
        ),
        l(
          '„Zum Geburtstag viel Glück“ braucht C, G7, C7 und F – alle kennst du schon! Es fängt mit einem Auftakt an: Der Gesang beginnt kurz vor der ersten Eins.',
          '“Zum Geburtstag viel Glück” uses C, G7, C7 and F – you know them all! It starts with a pick-up: the singing begins just before the first one.',
          '« Zum Geburtstag viel Glück » utilise C, G7, C7 et F – tu les connais tous ! La chanson commence par une anacrouse : le chant démarre juste avant le premier temps.',
        ),
      ],
      piece: {
        text: l(
          '„Zum Geburtstag viel Glück“ im Walzertakt – das kannst du ab jetzt auf jeder Feier spielen! Dazu „Mein Hut, der hat drei Ecken“.',
          '“Zum Geburtstag viel Glück” in waltz time – from now on you can play it at every party! Plus “Mein Hut, der hat drei Ecken”.',
          '« Zum Geburtstag viel Glück » à trois temps – tu pourras le jouer à chaque fête ! Et aussi « Mein Hut, der hat drei Ecken ».',
        ),
        play: [{ tool: 'rhythmus', pattern: 'Walzer (3/4)' }, { song: 'geburtstag' }, { song: 'mein-hut' }],
      },
      homework: [
        l('Walzer-Muster mit C, laut „eins, zwei, drei“ zählen.', 'Waltz pattern with C, counting “one, two, three” out loud.', 'Motif de valse avec C, en comptant « un, deux, trois » à voix haute.'),
        l('C – G7 – C7 – F je drei Schläge.', 'C – G7 – C7 – F, three strums each.', 'C – G7 – C7 – F, trois coups chacun.'),
        l('„Zum Geburtstag viel Glück“ mit Begleitung.', '“Zum Geburtstag viel Glück” with the backing.', '« Zum Geburtstag viel Glück » avec l’accompagnement.'),
        l('**Spaß:** Spiel es beim nächsten Geburtstag in der Familie!', '**Fun:** play it at the next family birthday!', '**Pour le plaisir :** joue-le au prochain anniversaire en famille !'),
      ],
      done: [
        l('du im Dreiertakt spielst und die Eins betonst', 'you play in three and stress the one', 'tu joues à trois temps en accentuant le un'),
        l('du „Zum Geburtstag viel Glück“ ganz begleitest', 'you accompany all of “Zum Geburtstag viel Glück”', 'tu accompagnes « Zum Geburtstag viel Glück » en entier'),
      ],
      trouble: [
        l(
          'Du zählst aus Gewohnheit bis vier? Sprich die Zahlen laut, und nick bei der Eins mit dem Kopf.',
          'You count to four out of habit? Say the numbers out loud and nod on the one.',
          'Tu comptes jusqu’à quatre par habitude ? Dis les chiffres à voix haute et hoche la tête sur le un.',
        ),
        l(
          'Der Auftakt verwirrt dich? Warte mit dem ersten Schlag, bis „Zum Ge-“ gesungen ist – dann kommt die Eins.',
          'The pick-up confuses you? Wait with the first strum until “Zum Ge-” is sung – then comes the one.',
          'L’anacrouse te perturbe ? Attends pour le premier coup que « Joy- » soit chanté – puis vient le un.',
        ),
      ],
      teacher: [
        l(
          'Einstieg: Walzerschritt im Kreis – auf „eins“ stampfen, auf „zwei, drei“ leise tippen.',
          'Warm-up: waltz step in a circle – stomp on “one”, tiptoe on “two, three”.',
          'Entrée : pas de valse en cercle – taper du pied sur « un », marcher doucement sur « deux, trois ».',
        ),
        l(
          'Übung: Vierer- und Dreiertakt im Wechsel – die Lehrkraft ruft „vier“ oder „drei“, die Klasse wechselt das Zählen.',
          'Practice: switch between four and three – the teacher calls “four” or “three”, the class changes the count.',
          'Exercice : alterner quatre et trois temps – l’enseignant annonce « quatre » ou « trois », la classe change.',
        ),
        l(
          'Gemeinsames Lied: „Zum Geburtstag viel Glück“ für ein Kind, das bald Geburtstag hat.',
          'Song together: “Zum Geburtstag viel Glück” for a child whose birthday is coming up.',
          'Chanson ensemble : « Zum Geburtstag viel Glück » pour un enfant dont l’anniversaire approche.',
        ),
      ],
      sheet: [
        l('Walzer: „**eins**, zwei, drei“ – die Eins etwas lauter.', 'Waltz: “**one**, two, three” – the one a bit louder.', 'Valse : « **un**, deux, trois » – le un un peu plus fort.'),
        l('Muster „Walzer (3/4)“: runter, runter, runter.', '“Waltz (3/4)” pattern: down, down, down.', 'Motif « Valse (3/4) » : bas, bas, bas.'),
        l('Geburtstagslied: C, G7, C7, F – mit Auftakt.', 'Birthday song: C, G7, C7, F – with a pick-up.', 'Chanson d’anniversaire : C, G7, C7, F – avec anacrouse.'),
      ],
      wissen: ['takt-und-taktarten'],
    },
    // ---------- 12 ----------
    {
      n: 12,
      title: l('Vier Akkorde: C, Am, F, G7', 'Four chords: C, Am, F, G7', 'Quatre accords : C, Am, F, G7'),
      goal: l(
        'Du spielst die berühmte Folge C – Am – F – G7, mit der unzählige Lieder klingen.',
        'You play the famous sequence C – Am – F – G7 that countless songs are built on.',
        'Tu joues la célèbre suite C – Am – F – G7, base d’innombrables chansons.',
      ),
      review: l(
        'Spiel „Zum Geburtstag viel Glück“ im Walzertakt.',
        'Play “Zum Geburtstag viel Glück” in waltz time.',
        'Joue « Zum Geburtstag viel Glück » à trois temps.',
      ),
      steps: [
        l(
          'Die Folge **C – Am – F – G7** klingt wie viele Popsongs. Du kennst alle vier Akkorde schon!',
          'The sequence **C – Am – F – G7** sounds like many pop songs. You already know all four chords!',
          'La suite **C – Am – F – G7** sonne comme beaucoup de chansons pop. Tu connais déjà les quatre accords !',
        ),
        l(
          'Achte auf die Abkürzungen: Von Am zu F bleibt der Mittelfinger liegen. Von F zu G7 bleibt der Zeigefinger liegen.',
          'Look for shortcuts: from Am to F the middle finger stays down. From F to G7 the index finger stays down.',
          'Repère les raccourcis : de Am à F, le majeur reste posé. De F à G7, l’index reste posé.',
        ),
        l(
          'Spiel jeden Akkord viermal, dann den nächsten. Danach probier es mit Runter-rauf oder dem Insel-Schlag.',
          'Play each chord four times, then the next. Then try it with down-up or the island strum.',
          'Joue chaque accord quatre fois, puis le suivant. Ensuite, essaie en bas-haut ou avec le rythme des îles.',
        ),
        l(
          '„G-C-E-A“ ist ein Lied über die Saiten deiner Ukulele, „Am Lagerfeuer“ ein Lied zum Mitsingen – beide mit genau diesen vier Akkorden.',
          '“G-C-E-A” is a song about your ukulele’s strings, “Am Lagerfeuer” a sing-along – both with exactly these four chords.',
          '« G-C-E-A » est une chanson sur les cordes de ton ukulélé, « Am Lagerfeuer » une chanson à chanter ensemble – toutes deux avec ces quatre accords.',
        ),
      ],
      piece: {
        text: l(
          '„Am Lagerfeuer“ und „G-C-E-A (das Saiten-Lied)“ mit C, Am, F und G7. Mit Insel-Schlag klingt es richtig nach Band.',
          '“Am Lagerfeuer” and “G-C-E-A (the string song)” with C, Am, F and G7. With the island strum it sounds like a real band.',
          '« Am Lagerfeuer » et « G-C-E-A (la chanson des cordes) » avec C, Am, F et G7. Avec le rythme des îles, on dirait un vrai groupe.',
        ),
        play: [{ song: 'lagerfeuer' }, { song: 'gcea' }, { tool: 'spiel', chords: ['C', 'Am', 'F', 'G7'] }],
      },
      homework: [
        l('C – Am – F – G7, je vier Schläge, dreimal.', 'C – Am – F – G7, four strums each, three times.', 'C – Am – F – G7, quatre coups chacun, trois fois.'),
        l('Die Abkürzungen üben: Am ↔ F und F ↔ G7.', 'Practise the shortcuts: Am ↔ F and F ↔ G7.', 'Entraîne les raccourcis : Am ↔ F et F ↔ G7.'),
        l('„Am Lagerfeuer“ mit „Wartet auf mich“.', '“Am Lagerfeuer” with “Waits for me”.', '« Am Lagerfeuer » avec « Attends-moi ».'),
        l('**Spaß:** Sing eine eigene Melodie über die vier Akkorde.', '**Fun:** sing your own tune over the four chords.', '**Pour le plaisir :** chante ta propre mélodie sur les quatre accords.'),
      ],
      done: [
        l('du C – Am – F – G7 ohne Pause im Kreis spielst', 'you play C – Am – F – G7 round and round without stopping', 'tu joues C – Am – F – G7 en boucle sans t’arrêter'),
        l('du ein Lied mit vier Akkorden ganz begleitest', 'you accompany a whole song with four chords', 'tu accompagnes une chanson entière avec quatre accords'),
      ],
      trouble: [
        l(
          'G7 kommt immer zu spät? Fang schon auf dem letzten Schlag von F an umzugreifen – der Zeigefinger bleibt ja liegen.',
          'G7 always comes late? Start moving on the last strum of F – your index finger stays down anyway.',
          'G7 arrive toujours en retard ? Commence à changer dès le dernier coup de F – l’index reste posé.',
        ),
        l(
          'Zu viel auf einmal? Spiel nur C – Am, bis es läuft, dann F – G7, dann alles zusammen.',
          'Too much at once? Play just C – Am until it flows, then F – G7, then everything together.',
          'Trop à la fois ? Joue seulement C – Am jusqu’à ce que ça roule, puis F – G7, puis tout ensemble.',
        ),
      ],
      teacher: [
        l(
          'Einstieg: Vier Gruppen, jede bekommt einen Akkord. Die Lehrkraft zeigt auf die Gruppen – die Folge entsteht gemeinsam.',
          'Warm-up: four groups, each gets one chord. The teacher points at the groups – the sequence is built together.',
          'Entrée : quatre groupes, chacun un accord. L’enseignant désigne les groupes – la suite se construit ensemble.',
        ),
        l(
          'Übung: Alle spielen die Folge; nach jedem Durchgang wird ein neues Schlagmuster gewählt.',
          'Practice: everyone plays the sequence; after each round a new strumming pattern is chosen.',
          'Exercice : tout le monde joue la suite ; à chaque tour, on choisit un nouveau rythme.',
        ),
        l(
          'Gemeinsames Lied: „G-C-E-A“ – passt zum Saitenlernen und macht Laune.',
          'Song together: “G-C-E-A” – fits learning the strings and is good fun.',
          'Chanson ensemble : « G-C-E-A » – parfaite pour retenir les cordes et pleine d’entrain.',
        ),
      ],
      sheet: [
        l('Folge: **C – Am – F – G7**, je vier Schläge.', 'Sequence: **C – Am – F – G7**, four strums each.', 'Suite : **C – Am – F – G7**, quatre coups chacun.'),
        l('Am → F: Mittelfinger bleibt. F → G7: Zeigefinger bleibt.', 'Am → F: middle finger stays. F → G7: index stays.', 'Am → F : le majeur reste. F → G7 : l’index reste.'),
        l('Mit Insel-Schlag klingt es nach Band.', 'With the island strum it sounds like a band.', 'Avec le rythme des îles, on dirait un groupe.'),
      ],
      wissen: ['akkordwechsel-schneller', 'ukulele-akkorde'],
    },
    // ---------- 13 ----------
    {
      n: 13,
      title: l('Schaukeln im 6/8-Takt', 'Rocking in 6/8', 'Se balancer en 6/8'),
      goal: l(
        'Du spielst den schaukelnden 6/8-Takt und begleitest ein Laternenlied.',
        'You play the rocking 6/8 time and accompany a lantern song.',
        'Tu joues la mesure balancée à 6/8 et tu accompagnes une chanson de lanterne.',
      ),
      review: l(
        'C – Am – F – G7 im Kreis, mit deinem Lieblings-Schlagmuster.',
        'C – Am – F – G7 round and round, with your favourite strum.',
        'C – Am – F – G7 en boucle, avec ton rythme préféré.',
      ),
      steps: [
        l(
          'Im 6/8-Takt zählst du bis sechs: „**eins**, zwei, drei, **vier**, fünf, sechs“. Es fühlt sich an wie zwei große Schaukelbewegungen.',
          'In 6/8 you count to six: “**one**, two, three, **four**, five, six”. It feels like two big rocking movements.',
          'En 6/8, tu comptes jusqu’à six : « **un**, deux, trois, **quatre**, cinq, six ». On dirait deux grands balancements.',
        ),
        l(
          'Das Muster „Schaukeln (6/8)“: runter … rauf, runter … rauf. Die Eins und die Vier sind die Hauptschläge.',
          'The “Rocking (6/8)” pattern: down … up, down … up. One and four are the main beats.',
          'Le motif « Balancé (6/8) » : bas … haut, bas … haut. Le un et le quatre sont les temps forts.',
        ),
        l(
          'Wiege dich beim Spielen leicht mit – wie ein Boot auf den Wellen. Dann kommt das Gefühl von allein.',
          'Rock gently as you play – like a boat on the waves. Then the feeling comes by itself.',
          'Balance-toi doucement en jouant – comme un bateau sur les vagues. Le bon feeling vient tout seul.',
        ),
        l(
          'Übe erst im [Rhythmus](tool:rhythmus) mit C, dann im Lied. „Stille Nacht“ ist ebenfalls ein 6/8-Lied – ganz ruhig gespielt.',
          'Practise first in [Rhythm](tool:rhythmus) with C, then in the song. “Stille Nacht” is also a 6/8 song – played very calmly.',
          'Entraîne-toi d’abord dans [Rythme](tool:rhythmus) avec C, puis dans la chanson. « Stille Nacht » est aussi en 6/8 – jouée très calmement.',
        ),
      ],
      piece: {
        text: l(
          '„Ich geh mit meiner Laterne“ mit C und G7 im Schaukeltakt. Für ruhige Momente: „Stille Nacht“ mit C, G7 und F.',
          '“Ich geh mit meiner Laterne” with C and G7 in rocking time. For quiet moments: “Stille Nacht” with C, G7 and F.',
          '« Ich geh mit meiner Laterne » avec C et G7 en balancement. Pour les moments calmes : « Stille Nacht » avec C, G7 et F.',
        ),
        play: [{ tool: 'rhythmus', pattern: 'Schaukeln (6/8)' }, { song: 'ich-geh-mit-meiner-laterne' }, { song: 'stille-nacht' }],
      },
      homework: [
        l('Bis sechs zählen und bei 1 und 4 klatschen.', 'Count to six and clap on 1 and 4.', 'Compte jusqu’à six et frappe dans tes mains sur 1 et 4.'),
        l('Schaukel-Muster mit C, zwei Minuten.', 'Rocking pattern with C, two minutes.', 'Motif de balancement avec C, deux minutes.'),
        l('Laternenlied mit „Wartet auf mich“.', 'Lantern song with “Waits for me”.', 'Chanson de lanterne avec « Attends-moi ».'),
        l('**Spaß:** Spiel abends „Stille Nacht“ ganz leise.', '**Fun:** play “Stille Nacht” very softly in the evening.', '**Pour le plaisir :** joue « Stille Nacht » tout doucement le soir.'),
      ],
      done: [
        l('du das Schaukeln gleichmäßig spielst', 'you play the rocking pattern evenly', 'tu joues le balancement régulièrement'),
        l('du ein 6/8-Lied ganz begleitest', 'you accompany a whole 6/8 song', 'tu accompagnes une chanson en 6/8 en entier'),
      ],
      trouble: [
        l(
          'Es klingt wie ein Walzer? Beim Walzer zählst du 3, hier zweimal 3. Die Vier muss genauso deutlich sein wie die Eins.',
          'It sounds like a waltz? A waltz counts 3, this is twice 3. The four must be as clear as the one.',
          'On dirait une valse ? La valse compte 3, ici c’est deux fois 3. Le quatre doit être aussi net que le un.',
        ),
        l(
          'Zu hektisch? Stell die Begleitung langsamer. 6/8 darf ruhig und weich klingen.',
          'Too hectic? Slow the backing down. 6/8 can sound calm and soft.',
          'Trop agité ? Ralentis l’accompagnement. Le 6/8 peut être calme et doux.',
        ),
      ],
      teacher: [
        l(
          'Einstieg: Alle schaukeln im Sitzen hin und her und zählen bis sechs. Auf 1 und 4 kippen.',
          'Warm-up: everyone rocks from side to side while seated and counts to six. Tip over on 1 and 4.',
          'Entrée : tout le monde se balance assis en comptant jusqu’à six. On penche sur 1 et 4.',
        ),
        l(
          'Übung: Hälfte klatscht 1 und 4, die andere spielt das Schaukel-Muster – dann tauschen.',
          'Practice: half clap 1 and 4, the other half play the rocking pattern – then swap.',
          'Exercice : une moitié frappe 1 et 4, l’autre joue le balancement – puis on échange.',
        ),
        l(
          'Gemeinsames Lied: „Ich geh mit meiner Laterne“ – gern mit Laternenumzug durch den Raum.',
          'Song together: “Ich geh mit meiner Laterne” – maybe with a little lantern parade through the room.',
          'Chanson ensemble : « Ich geh mit meiner Laterne » – pourquoi pas avec un petit défilé dans la salle.',
        ),
      ],
      sheet: [
        l('Zählen: „**eins**, zwei, drei, **vier**, fünf, sechs“.', 'Count: “**one**, two, three, **four**, five, six”.', 'Compter : « **un**, deux, trois, **quatre**, cinq, six ».'),
        l('Muster: runter … rauf, runter … rauf.', 'Pattern: down … up, down … up.', 'Motif : bas … haut, bas … haut.'),
        l('Mitschaukeln wie ein Boot auf den Wellen.', 'Rock along like a boat on the waves.', 'Balance-toi comme un bateau sur les vagues.'),
      ],
      wissen: ['takt-und-taktarten', 'schlagmuster-lernen'],
    },
    // ---------- 14 ----------
    {
      n: 14,
      title: l('Zupfen mit Daumen und Fingern', 'Picking with thumb and fingers', 'Pincer avec le pouce et les doigts'),
      goal: l(
        'Du zupfst Akkorde Saite für Saite und begleitest ein ruhiges Lied.',
        'You pick chords string by string and accompany a calm song.',
        'Tu pinces les accords corde par corde et tu accompagnes une chanson calme.',
      ),
      review: l(
        'Spiel das Laternenlied im Schaukeltakt.',
        'Play the lantern song in rocking time.',
        'Joue la chanson de lanterne en balancement.',
      ),
      steps: [
        l(
          'Beim Zupfen hat jeder Finger seine Saite: **Daumen** G- und C-Saite, **Zeigefinger** E-Saite, **Mittelfinger** A-Saite.',
          'When picking, each finger has its string: **thumb** G and C strings, **index** E string, **middle** A string.',
          'Pour pincer, chaque doigt a sa corde : **pouce** cordes G et C, **index** corde E, **majeur** corde A.',
        ),
        l(
          'Erstes Muster im Dreiertakt: Daumen (C-Saite) – Zeige – Mittel, einmal pro Takt: „eins, zwei, drei“. Immer wieder, ganz gleichmäßig.',
          'First pattern, in three: thumb (C string) – index – middle, once per bar: “one, two, three”. Over and over, nice and even.',
          'Premier motif, à trois temps : pouce (corde C) – index – majeur, une fois par mesure : « un, deux, trois ». Encore et encore, bien régulier.',
        ),
        l(
          'Die linke Hand greift ganz normal den Akkord. Nur die rechte Hand macht etwas Neues.',
          'Your left hand frets the chord as usual. Only your right hand does something new.',
          'La main gauche pose l’accord comme d’habitude. Seule la main droite fait quelque chose de nouveau.',
        ),
        l(
          'Übe das Muster erst mit C, dann mit G7. Zupfen klingt leise und schön – perfekt für ruhige Lieder. Mehr: [Ukulele zupfen](wissen:ukulele-zupfen).',
          'Practise the pattern with C first, then G7. Picking sounds soft and pretty – perfect for calm songs. More: [Ukulele fingerpicking](wissen:ukulele-zupfen).',
          'Entraîne le motif avec C, puis avec G7. Le picking sonne doux et joli – parfait pour les chansons calmes. Plus d’infos : [Pincer au ukulélé](wissen:ukulele-zupfen).',
        ),
      ],
      piece: {
        text: l(
          '„Kein schöner Land“ und „Clementine“ mit C und G7 – diesmal gezupft statt geschlagen. Stell die Begleitung ruhig langsamer.',
          '“Kein schöner Land” and “Clementine” with C and G7 – picked this time instead of strummed. Feel free to slow the backing down.',
          '« Kein schöner Land » et « Clementine » avec C et G7 – cette fois en pinçant au lieu de gratter. Ralentis l’accompagnement si besoin.',
        ),
        play: [{ song: 'kein-schoener-land' }, { song: 'clementine' }],
      },
      homework: [
        l('Ohne Akkord: Daumen – Zeige – Mittel, zwei Minuten.', 'No chord: thumb – index – middle, two minutes.', 'Sans accord : pouce – index – majeur, deux minutes.'),
        l('Das Muster mit C, dann mit G7.', 'The pattern with C, then with G7.', 'Le motif avec C, puis avec G7.'),
        l('„Kein schöner Land“ gezupft.', '“Kein schöner Land” picked.', '« Kein schöner Land » en pinçant.'),
        l('**Spaß:** Zupf ein Gute-Nacht-Lied für jemanden.', '**Fun:** pick a goodnight song for someone.', '**Pour le plaisir :** pince une berceuse pour quelqu’un.'),
      ],
      done: [
        l('jeder Finger seine Saite findet, ohne hinzuschauen', 'each finger finds its string without looking', 'chaque doigt trouve sa corde sans regarder'),
        l('du ein Lied gezupft begleitest', 'you accompany a song by picking', 'tu accompagnes une chanson en pinçant'),
      ],
      trouble: [
        l(
          'Die Finger verheddern sich? Leg den Daumen locker auf die C-Saite und die Finger auf ihre Saiten – das ist deine Startposition.',
          'Your fingers get tangled? Rest your thumb on the C string and your fingers on their strings – that’s your starting position.',
          'Les doigts s’emmêlent ? Pose le pouce sur la corde C et les doigts sur leurs cordes – c’est ta position de départ.',
        ),
        l(
          'Zu leise? Zupf mit dem Finger leicht nach oben in die Hand, nicht von der Ukulele weg.',
          'Too quiet? Pull the string slightly up into your palm, not away from the ukulele.',
          'Trop faible ? Tire la corde légèrement vers ta paume, pas loin du ukulélé.',
        ),
      ],
      teacher: [
        l(
          'Einstieg: Finger-Zuordnung als Spiel – die Lehrkraft ruft „Daumen!“, „Zeige!“, „Mittel!“, alle zupfen die passende Saite.',
          'Warm-up: finger game – the teacher calls “Thumb!”, “Index!”, “Middle!”, everyone plucks the matching string.',
          'Entrée : jeu des doigts – l’enseignant annonce « Pouce ! », « Index ! », « Majeur ! », tout le monde pince la bonne corde.',
        ),
        l(
          'Übung: Das Muster langsam gemeinsam, dann eine Gruppe zupft, die andere schlägt – das klingt nach Orchester.',
          'Practice: the pattern slowly together, then one group picks, the other strums – sounds like an orchestra.',
          'Exercice : le motif lentement ensemble, puis un groupe pince, l’autre gratte – on dirait un orchestre.',
        ),
        l(
          'Gemeinsames Lied: „Kein schöner Land“ – ruhig singen, die Zupfgruppe begleitet.',
          'Song together: “Kein schöner Land” – sing calmly, the picking group accompanies.',
          'Chanson ensemble : « Kein schöner Land » – chanter calmement, le groupe qui pince accompagne.',
        ),
      ],
      sheet: [
        l('Daumen: G/C-Saite · Zeige: E-Saite · Mittel: A-Saite.', 'Thumb: G/C string · index: E string · middle: A string.', 'Pouce : corde G/C · index : corde E · majeur : corde A.'),
        l('Muster: Daumen – Zeige – Mittel (eins, zwei, drei).', 'Pattern: thumb – index – middle (one, two, three).', 'Motif : pouce – index – majeur (un, deux, trois).'),
        l('Links ganz normal den Akkord greifen.', 'Left hand frets the chord as usual.', 'Main gauche : accord comme d’habitude.'),
      ],
      wissen: ['ukulele-zupfen'],
    },
    // ---------- 15 ----------
    {
      n: 15,
      title: l('d-Moll', 'D minor', 'Ré mineur'),
      goal: l(
        'Du lernst Dm und spielst „What Shall We Do with the Drunken Sailor“.',
        'You learn Dm and play “What Shall We Do with the Drunken Sailor”.',
        'Tu apprends Dm et tu joues « What Shall We Do with the Drunken Sailor ».',
      ),
      chords: ['Dm'],
      review: l(
        'Zupf „Kein schöner Land“ mit C und G7.',
        'Pick “Kein schöner Land” with C and G7.',
        'Pince « Kein schöner Land » avec C et G7.',
      ),
      steps: [
        l(
          '**Dm**: Mittelfinger auf die G-Saite im 2. Bund, Ringfinger auf die C-Saite im 2. Bund, Zeigefinger auf die E-Saite im 1. Bund. Griffbild: [Dm](chord:Dm).',
          '**Dm**: middle finger on the G string at fret 2, ring finger on the C string at fret 2, index on the E string at fret 1. Chart: [Dm](chord:Dm).',
          '**Dm** : majeur sur la corde G en case 2, annulaire sur la corde C en case 2, index sur la corde E en case 1. Diagramme : [Dm](chord:Dm).',
        ),
        l(
          'Kennst du schon? Dm ist wie F plus Ringfinger. Von F zu Dm setzt du nur einen Finger dazu.',
          'Look familiar? Dm is F plus your ring finger. From F to Dm you just add one finger.',
          'Ça te dit quelque chose ? Dm, c’est F plus l’annulaire. De F à Dm, tu ajoutes juste un doigt.',
        ),
        l(
          'Dm ist ein Moll-Akkord: Er klingt dunkler als F. Matrosenlieder klingen damit richtig nach Meer.',
          'Dm is a minor chord: it sounds darker than F. Sailor songs sound just like the sea with it.',
          'Dm est un accord mineur : il sonne plus sombre que F. Les chansons de marins sentent vraiment la mer.',
        ),
        l(
          'Wechsel Dm ↔ C: Alle drei Finger heben ab, nur der Ringfinger geht auf die A-Saite im 3. Bund.',
          'Changing Dm ↔ C: all three fingers lift, only the ring finger goes to the A string at fret 3.',
          'Changement Dm ↔ C : les trois doigts se lèvent, seul l’annulaire va sur la corde A en case 3.',
        ),
      ],
      piece: {
        text: l(
          '„What Shall We Do with the Drunken Sailor“ mit Dm und C – kräftig runter-rauf! Ruhiger: „Leise rieselt der Schnee“ mit C, F, G7 und Dm.',
          '“What Shall We Do with the Drunken Sailor” with Dm and C – a strong down-up! Calmer: “Leise rieselt der Schnee” with C, F, G7 and Dm.',
          '« What Shall We Do with the Drunken Sailor » avec Dm et C – un bas-haut énergique ! Plus calme : « Leise rieselt der Schnee » avec C, F, G7 et Dm.',
        ),
        play: [{ song: 'drunken-sailor' }, { song: 'leise-rieselt' }],
      },
      homework: [
        l('F greifen, Ringfinger dazu: Dm! Zehnmal hin und zurück.', 'Fret F, add the ring finger: Dm! Ten times back and forth.', 'Pose F, ajoute l’annulaire : Dm ! Dix allers-retours.'),
        l('Dm – C – Dm – C, je vier Schläge.', 'Dm – C – Dm – C, four strums each.', 'Dm – C – Dm – C, quatre coups chacun.'),
        l('„Drunken Sailor“ mit „Wartet auf mich“.', '“Drunken Sailor” with “Waits for me”.', '« Drunken Sailor » avec « Attends-moi ».'),
        l('**Spaß:** Sing den Refrain „Hooray and up she rises“ ganz laut.', '**Fun:** sing the chorus “Hooray and up she rises” really loud.', '**Pour le plaisir :** chante très fort le refrain « Hooray and up she rises ».'),
      ],
      done: [
        l('bei Dm alle vier Saiten klingen', 'all four strings ring with Dm', 'les quatre cordes sonnent avec Dm'),
        l('du „Drunken Sailor“ ganz begleitest', 'you accompany all of “Drunken Sailor”', 'tu accompagnes « Drunken Sailor » en entier'),
      ],
      trouble: [
        l(
          'Mittel- und Ringfinger haben im 2. Bund wenig Platz? Der Ringfinger darf etwas weiter rechts stehen, nah am Bundstäbchen.',
          'Middle and ring fingers lack room at fret 2? The ring finger can sit a little further toward the fret wire.',
          'Le majeur et l’annulaire manquent de place en case 2 ? L’annulaire peut se placer un peu plus près de la frette.',
        ),
        l(
          'Die E-Saite klingt dumpf? Der Ringfinger berührt sie – stell ihn steiler auf.',
          'The E string sounds muffled? Your ring finger is touching it – stand it up more.',
          'La corde E sonne étouffée ? L’annulaire la touche – redresse-le.',
        ),
      ],
      teacher: [
        l(
          'Einstieg: F und Dm vorspielen – welcher klingt nach Sonne, welcher nach Nebel auf dem Meer?',
          'Warm-up: play F and Dm – which sounds like sunshine, which like fog over the sea?',
          'Entrée : jouer F puis Dm – lequel sonne comme le soleil, lequel comme le brouillard sur la mer ?',
        ),
        l(
          'Übung: F → Dm → F nur mit dem Ringfinger, dann Dm ↔ C im Takt.',
          'Practice: F → Dm → F with just the ring finger, then Dm ↔ C in time.',
          'Exercice : F → Dm → F avec juste l’annulaire, puis Dm ↔ C en rythme.',
        ),
        l(
          'Gemeinsames Lied: „Drunken Sailor“ – die Klasse stampft auf der Eins mit.',
          'Song together: “Drunken Sailor” – the class stomps on the one.',
          'Chanson ensemble : « Drunken Sailor » – la classe tape du pied sur le un.',
        ),
      ],
      sheet: [
        l('**Dm:** Mittel G-Saite 2, Ring C-Saite 2, Zeige E-Saite 1.', '**Dm:** middle G string 2, ring C string 2, index E string 1.', '**Dm :** majeur corde G 2, annulaire corde C 2, index corde E 1.'),
        l('Dm = F plus Ringfinger.', 'Dm = F plus ring finger.', 'Dm = F plus l’annulaire.'),
        l('Moll klingt dunkler als Dur.', 'Minor sounds darker than major.', 'Le mineur sonne plus sombre que le majeur.'),
      ],
      wissen: ['ukulele-akkorde', 'saubere-griffe'],
    },
    // ---------- 16 ----------
    {
      n: 16,
      title: l('Dur und Moll hören', 'Hearing major and minor', 'Entendre majeur et mineur'),
      goal: l(
        'Du hörst, ob ein Akkord Dur oder Moll ist, und weißt, woran das liegt.',
        'You hear whether a chord is major or minor and know why.',
        'Tu entends si un accord est majeur ou mineur et tu sais pourquoi.',
      ),
      review: l(
        '„Drunken Sailor“ mit Dm und C – klingt dein Dm sauber?',
        '“Drunken Sailor” with Dm and C – does your Dm sound clean?',
        '« Drunken Sailor » avec Dm et C – ton Dm sonne-t-il bien ?',
      ),
      steps: [
        l(
          '**Dur** klingt hell und fröhlich (C, F, G). **Moll** klingt weich, dunkler, manchmal traurig (Am, Dm). Moll erkennst du am kleinen „m“.',
          '**Major** sounds bright and happy (C, F, G). **Minor** sounds soft, darker, sometimes sad (Am, Dm). You spot minor by the little “m”.',
          'Le **majeur** sonne clair et joyeux (C, F, G). Le **mineur** sonne doux, plus sombre, parfois triste (Am, Dm). On le reconnaît au petit « m ».',
        ),
        l(
          'Ein Akkord besteht aus drei Tönen. Der mittlere heißt **Terz**. Liegt sie einen Halbton tiefer, wird aus Dur Moll.',
          'A chord is made of three notes. The middle one is the **third**. If it is one semitone lower, major becomes minor.',
          'Un accord est fait de trois notes. Celle du milieu s’appelle la **tierce**. Si elle est un demi-ton plus bas, le majeur devient mineur.',
        ),
        l(
          'Beispiel: C-Dur sind die Töne C, E, G. a-Moll sind A, C, E. Mehr dazu: [Dur und Moll](wissen:dur-und-moll).',
          'Example: C major is the notes C, E, G. A minor is A, C, E. More: [Major and minor](wissen:dur-und-moll).',
          'Exemple : Do majeur, ce sont les notes Do, Mi, Sol. La mineur : La, Do, Mi. Plus d’infos : [Majeur et mineur](wissen:dur-und-moll).',
        ),
        l(
          'Hörspiel: Spiel einem anderen einen Akkord vor, ohne zu sagen welcher. Dur oder Moll? Der [Akkord-Detektiv](tool:detektiv) verrät dir, ob ihr richtig liegt.',
          'Listening game: play a chord for someone without saying which. Major or minor? The [chord detective](tool:detektiv) tells you if you guessed it.',
          'Jeu d’écoute : joue un accord à quelqu’un sans dire lequel. Majeur ou mineur ? Le [détective des accords](tool:detektiv) te dit si c’est bien ça.',
        ),
      ],
      piece: {
        text: l(
          '„Shenandoah“ und „Amazing Grace“ mischen Dur und Moll (C, F, Am, G7). Hör beim Spielen genau hin, wann es dunkler wird.',
          '“Shenandoah” and “Amazing Grace” mix major and minor (C, F, Am, G7). Listen carefully as you play for when it gets darker.',
          '« Shenandoah » et « Amazing Grace » mélangent majeur et mineur (C, F, Am, G7). Écoute bien quand ça devient plus sombre.',
        ),
        play: [{ tool: 'detektiv' }, { song: 'shenandoah' }, { song: 'amazing-grace' }],
      },
      homework: [
        l('C und Am abwechselnd spielen: hell – dunkel.', 'Play C and Am in turn: bright – dark.', 'Joue C et Am en alternance : clair – sombre.'),
        l('Dur-Moll-Ratespiel mit jemandem aus der Familie.', 'Major-minor guessing game with someone in your family.', 'Jeu de devinettes majeur-mineur avec quelqu’un de ta famille.'),
        l('„Amazing Grace“ mit Begleitung.', '“Amazing Grace” with the backing.', '« Amazing Grace » avec l’accompagnement.'),
        l('**Spaß:** Finde ein Lied im Radio – Dur oder Moll?', '**Fun:** find a song on the radio – major or minor?', '**Pour le plaisir :** trouve une chanson à la radio – majeur ou mineur ?'),
      ],
      done: [
        l('du bei C, F, Am und Dm sagen kannst, ob Dur oder Moll', 'you can tell for C, F, Am and Dm whether major or minor', 'tu sais dire pour C, F, Am et Dm si c’est majeur ou mineur'),
        l('du ein Lied mit Dur und Moll begleitest', 'you accompany a song with major and minor', 'tu accompagnes une chanson avec majeur et mineur'),
      ],
      trouble: [
        l(
          'Du hörst den Unterschied nicht? Spiel die Akkorde ganz langsam und zupf sie Saite für Saite. Oft hilft es, die Augen zu schließen.',
          'You can’t hear the difference? Play the chords very slowly and pick them string by string. Closing your eyes often helps.',
          'Tu n’entends pas la différence ? Joue les accords très lentement en pinçant corde par corde. Fermer les yeux aide souvent.',
        ),
        l(
          'Traurig ist nicht immer Moll – auch Tempo und Lautstärke ändern die Stimmung. Achte nur auf den Akkord selbst.',
          'Sad isn’t always minor – tempo and volume change the mood too. Focus on the chord itself.',
          'Triste n’est pas toujours mineur – le tempo et le volume changent aussi l’ambiance. Concentre-toi sur l’accord.',
        ),
      ],
      teacher: [
        l(
          'Einstieg: Lehrkraft spielt Dur und Moll, die Klasse antwortet mit Sonne (Arme hoch) oder Regen (Finger zappeln nach unten).',
          'Warm-up: the teacher plays major and minor, the class answers with sun (arms up) or rain (fingers wiggling down).',
          'Entrée : l’enseignant joue majeur ou mineur, la classe répond par soleil (bras en l’air) ou pluie (doigts qui tombent).',
        ),
        l(
          'Übung: Terz zeigen – C-Dur und c-Moll nacheinander singen (C E G, C Es G). Wo ändert sich etwas?',
          'Practice: show the third – sing C major and C minor (C E G, C Eb G). Where does something change?',
          'Exercice : montrer la tierce – chanter Do majeur et Do mineur (Do Mi Sol, Do Mib Sol). Où ça change ?',
        ),
        l(
          'Gemeinsames Lied: „Amazing Grace“ – langsam, mit Zupfen oder ruhigem Schlag.',
          'Song together: “Amazing Grace” – slow, picked or with a calm strum.',
          'Chanson ensemble : « Amazing Grace » – lentement, en pinçant ou en grattant calmement.',
        ),
      ],
      sheet: [
        l('**Dur** hell (C, F, G) – **Moll** weich, dunkler (Am, Dm).', '**Major** bright (C, F, G) – **minor** soft, darker (Am, Dm).', '**Majeur** clair (C, F, G) – **mineur** doux, plus sombre (Am, Dm).'),
        l('Der mittlere Ton heißt Terz.', 'The middle note is called the third.', 'La note du milieu s’appelle la tierce.'),
        l('Terz einen Halbton tiefer: Dur wird Moll.', 'Third a semitone lower: major becomes minor.', 'Tierce un demi-ton plus bas : le majeur devient mineur.'),
      ],
      wissen: ['dur-und-moll', 'akkordsymbole-lesen'],
    },
    // ---------- 17 ----------
    {
      n: 17,
      title: l('Takt und Notenwerte', 'Time signatures and note values', 'Mesures et valeurs de notes'),
      goal: l(
        'Du verstehst 2/4-, 3/4- und 4/4-Takt und weißt, wie lang Ganze, Halbe und Viertel sind.',
        'You understand 2/4, 3/4 and 4/4 time and know how long whole, half and quarter notes are.',
        'Tu comprends les mesures à 2/4, 3/4 et 4/4 et tu connais la durée de la ronde, de la blanche et de la noire.',
      ),
      review: l(
        'Spiel C und Am und sag, welcher Dur und welcher Moll ist.',
        'Play C and Am and say which is major and which is minor.',
        'Joue C et Am et dis lequel est majeur, lequel est mineur.',
      ),
      steps: [
        l(
          'Die Zahl oben im Takt sagt, bis wohin du zählst: **4/4** bis vier, **3/4** bis drei (Walzer), **2/4** bis zwei (Marsch).',
          'The top number tells you how far to count: **4/4** to four, **3/4** to three (waltz), **2/4** to two (march).',
          'Le chiffre du haut dit jusqu’où compter : **4/4** jusqu’à quatre, **3/4** jusqu’à trois (valse), **2/4** jusqu’à deux (marche).',
        ),
        l(
          'Notenwerte: Eine **Viertel** dauert einen Schlag, eine **Halbe** zwei, eine **Ganze** vier. Eine **Achtel** ist halb so lang wie eine Viertel – wie beim Runter-rauf.',
          'Note values: a **quarter note** lasts one beat, a **half note** two, a **whole note** four. An **eighth note** is half a quarter – like in down-up.',
          'Valeurs : une **noire** dure un temps, une **blanche** deux, une **ronde** quatre. Une **croche** dure la moitié d’une noire – comme en bas-haut.',
        ),
        l(
          'Auch Pausen zählen mit: Leg die Handfläche der Anschlaghand sanft auf die Saiten – sie verstummen. Probier: zweimal C anschlagen, dann zwei Schläge Pause mit der Hand auf den Saiten.',
          'Rests count too: lay the palm of your strumming hand gently on the strings – they go quiet. Try it: strum C twice, then two beats of rest with your hand on the strings.',
          'Les silences comptent aussi : pose doucement la paume de la main qui gratte sur les cordes – elles se taisent. Essaie : deux coups sur C, puis deux temps de silence, la main sur les cordes.',
        ),
        l(
          'Spiel mit C: viermal Viertel (4 Schläge), zweimal Halbe (Schlag, klingen lassen), eine Ganze (einmal anschlagen, bis vier zählen).',
          'Play with C: four quarters (4 strums), two halves (strum, let it ring), one whole (strum once, count to four).',
          'Joue avec C : quatre noires (4 coups), deux blanches (un coup, laisse sonner), une ronde (un coup, compte jusqu’à quatre).',
        ),
        l(
          'Im 2/4-Takt geht es zackig wie ein Marsch: „**eins**, zwei, **eins**, zwei“. Das Muster heißt „Marsch (2/4)“. Mehr: [Takt und Taktarten](wissen:takt-und-taktarten).',
          'In 2/4 it’s brisk like a march: “**one**, two, **one**, two”. The pattern is called “March (2/4)”. More: [Time signatures](wissen:takt-und-taktarten).',
          'À 2/4, c’est vif comme une marche : « **un**, deux, **un**, deux ». Le motif s’appelle « Marche (2/4) ». Plus d’infos : [Les mesures](wissen:takt-und-taktarten).',
        ),
      ],
      piece: {
        text: l(
          'Marsch-Muster im Rhythmus, dann „Ein Jäger aus Kurpfalz“ und „Auf de schwäbsche Eisebahne“ mit C und G7 – zackig im Zweiertakt.',
          'March pattern in Rhythm, then “Ein Jäger aus Kurpfalz” and “Auf de schwäbsche Eisebahne” with C and G7 – brisk in two.',
          'Motif de marche dans Rythme, puis « Ein Jäger aus Kurpfalz » et « Auf de schwäbsche Eisebahne » avec C et G7 – vif à deux temps.',
        ),
        play: [{ tool: 'rhythmus', pattern: 'Marsch (2/4)' }, { song: 'jaeger-aus-kurpfalz' }, { song: 'schwaebsche-eisebahne' }],
      },
      homework: [
        l('Mit C: Viertel, Halbe, Ganze spielen und mitzählen.', 'With C: play quarters, halves, wholes and count along.', 'Avec C : joue noires, blanches, rondes en comptant.'),
        l('Je ein Lied im 2/4-, 3/4- und 4/4-Takt spielen.', 'Play one song each in 2/4, 3/4 and 4/4.', 'Joue une chanson à 2/4, une à 3/4 et une à 4/4.'),
        l('„Ein Jäger aus Kurpfalz“ mit Begleitung.', '“Ein Jäger aus Kurpfalz” with the backing.', '« Ein Jäger aus Kurpfalz » avec l’accompagnement.'),
        l('**Spaß:** Marschier beim Spielen durchs Zimmer.', '**Fun:** march around the room as you play.', '**Pour le plaisir :** marche dans la pièce en jouant.'),
      ],
      done: [
        l('du sagen kannst, wie viele Schläge Viertel, Halbe und Ganze haben', 'you can say how many beats quarter, half and whole notes have', 'tu sais combien de temps durent noire, blanche et ronde'),
        l('du ein Lied im 2/4-Takt begleitest', 'you accompany a song in 2/4', 'tu accompagnes une chanson à 2/4'),
      ],
      trouble: [
        l(
          'Bei der Ganzen hörst du zu früh auf? Zähl laut bis vier und schlag erst bei der nächsten Eins wieder an.',
          'You stop too early on the whole note? Count out loud to four and only strum again on the next one.',
          'Tu t’arrêtes trop tôt sur la ronde ? Compte à voix haute jusqu’à quatre et ne gratte qu’au un suivant.',
        ),
        l(
          'Der Marsch wird zu schnell? Stell das Metronom auf „Langsam“ und lauf im Takt auf der Stelle.',
          'The march gets too fast? Set the metronome to “Slow” and march on the spot in time.',
          'La marche s’emballe ? Mets le métronome sur « Lent » et marche sur place en rythme.',
        ),
      ],
      teacher: [
        l(
          'Einstieg: Notenwerte klatschen – Viertel klatschen, Halbe klatschen und Hände halten, Ganze klatschen und Kreis malen.',
          'Warm-up: clap note values – quarters clap, halves clap and hold, wholes clap and draw a circle.',
          'Entrée : frapper les valeurs – noires frappées, blanches frappées puis mains tenues, rondes frappées puis un cercle dessiné.',
        ),
        l(
          'Übung: Lehrkraft zeigt Notenkarten, die Klasse spielt sie mit C. Danach Taktarten raten: Lehrkraft spielt, Klasse zählt mit.',
          'Practice: the teacher shows note cards, the class plays them on C. Then guess the time: teacher plays, class counts.',
          'Exercice : l’enseignant montre des cartes de notes, la classe les joue sur C. Puis deviner la mesure : l’enseignant joue, la classe compte.',
        ),
        l(
          'Gemeinsames Lied: „Ein Jäger aus Kurpfalz“ – beim „Trara“ alle laut.',
          'Song together: “Ein Jäger aus Kurpfalz” – everyone loud on the “Trara”.',
          'Chanson ensemble : « Ein Jäger aus Kurpfalz » – tout le monde fort sur le « Trara ».',
        ),
      ],
      sheet: [
        l('2/4 Marsch · 3/4 Walzer · 4/4 bis vier zählen.', '2/4 march · 3/4 waltz · 4/4 count to four.', '2/4 marche · 3/4 valse · 4/4 compter jusqu’à quatre.'),
        l('Viertel = 1 Schlag, Halbe = 2, Ganze = 4.', 'Quarter = 1 beat, half = 2, whole = 4.', 'Noire = 1 temps, blanche = 2, ronde = 4.'),
        l('Achtel = halber Schlag (runter-rauf).', 'Eighth = half a beat (down-up).', 'Croche = demi-temps (bas-haut).'),
      ],
      wissen: ['takt-und-taktarten', 'mit-metronom-ueben'],
    },
    // ---------- 18 ----------
    {
      n: 18,
      title: l('Der 12-Takt-Blues', 'The 12-bar blues', 'Le blues en 12 mesures'),
      goal: l(
        'Du kennst das Blues-Schema mit den Stufen I, IV und V und jammst mit der Band.',
        'You know the blues pattern with steps I, IV and V and jam with the band.',
        'Tu connais la grille du blues avec les degrés I, IV et V et tu improvises avec le groupe.',
      ),
      review: l(
        'Spiel C mit Viertel, Halben und einer Ganzen und zähl laut.',
        'Play C with quarters, halves and a whole note, counting out loud.',
        'Joue C en noires, blanches et une ronde en comptant à voix haute.',
      ),
      steps: [
        l(
          'In C-Dur sind **C**, **F** und **G** die wichtigsten Akkorde. Musiker nennen sie Stufe **I**, **IV** und **V** – zähl ab C: C (1), D, E, F (4), G (5).',
          'In C major the most important chords are **C**, **F** and **G**. Musicians call them steps **I**, **IV** and **V** – count from C: C (1), D, E, F (4), G (5).',
          'En Do majeur, les accords principaux sont **C**, **F** et **G**. Les musiciens les appellent degrés **I**, **IV** et **V** – compte depuis Do : Do (1), Ré, Mi, Fa (4), Sol (5).',
        ),
        l(
          'Der Blues hat 12 Takte: **C C C C | F F C C | G F C G7**. Der letzte Takt führt zurück zum Anfang. Die Band spielt alle drei als Septakkorde (C7, F7, G7).',
          'The blues has 12 bars: **C C C C | F F C C | G F C G7**. The last bar leads back to the start. The band plays all three as seventh chords (C7, F7, G7).',
          'Le blues a 12 mesures : **C C C C | F F C C | G F C G7**. La dernière mesure ramène au début. Le groupe joue les trois en accords de septième (C7, F7, G7).',
        ),
        l(
          'Stufe 2 im [Blues](tool:blues): Grundton und Quinte. Zu C sind das C und G – zwei leere Saiten!',
          'Level 2 in [Blues](tool:blues): root and fifth. For C those are C and G – two open strings!',
          'Niveau 2 dans [Blues](tool:blues) : fondamentale et quinte. Pour C, ce sont Do et Sol – deux cordes à vide !',
        ),
        l(
          'Stufe 3 ist das Boogie-Riff. Über C liegt es ganz auf leeren Saiten: C, E, G, A. Mehr: [12-Takt-Blues](wissen:zwoelf-takt-blues).',
          'Level 3 is the boogie riff. Over C it sits entirely on open strings: C, E, G, A. More: [12-bar blues](wissen:zwoelf-takt-blues).',
          'Le niveau 3, c’est le riff boogie. Sur C, il se joue entièrement sur cordes à vide : Do, Mi, Sol, La. Plus d’infos : [Blues en 12 mesures](wissen:zwoelf-takt-blues).',
        ),
      ],
      piece: {
        text: l(
          'Blues mit Band in C: erst Stufe 2 (Grundton und Quinte), dann Stufe 3 (Boogie-Riff). Die Band spielt die Akkorde, du spielst die Töne.',
          'Blues with the band in C: first level 2 (root and fifth), then level 3 (boogie riff). The band plays the chords, you play the notes.',
          'Blues avec le groupe en C : d’abord le niveau 2 (fondamentale et quinte), puis le niveau 3 (riff boogie). Le groupe joue les accords, toi les notes.',
        ),
        play: [{ tool: 'blues', level: 2, key: 'C' }, { tool: 'blues', level: 3, key: 'C' }],
      },
      homework: [
        l('Das Schema aufschreiben und mit C, F, G7 strummen.', 'Write out the pattern and strum it with C, F, G7.', 'Écris la grille et gratte-la avec C, F, G7.'),
        l('Blues Stufe 2 mit der Band, langsam.', 'Blues level 2 with the band, slow.', 'Blues niveau 2 avec le groupe, lent.'),
        l('Blues Stufe 3: das Boogie-Riff.', 'Blues level 3: the boogie riff.', 'Blues niveau 3 : le riff boogie.'),
        l('**Spaß:** Erfinde einen Blues-Text über deinen Tag.', '**Fun:** make up blues lyrics about your day.', '**Pour le plaisir :** invente des paroles de blues sur ta journée.'),
      ],
      done: [
        l('du die 12 Takte einmal ohne Anhalten mitspielst', 'you play along with all 12 bars once without stopping', 'tu joues les 12 mesures une fois sans t’arrêter'),
        l('du sagen kannst, welche Akkorde Stufe I, IV und V in C sind', 'you can say which chords are steps I, IV and V in C', 'tu sais quels accords sont les degrés I, IV et V en C'),
      ],
      trouble: [
        l(
          'Du verlierst dich in den 12 Takten? Die App zählt die Takte mit – schau auf „Takt n von 12“.',
          'You get lost in the 12 bars? The app counts the bars – watch “Bar n of 12”.',
          'Tu te perds dans les 12 mesures ? L’appli compte les mesures – regarde « Mesure n sur 12 ».',
        ),
        l(
          'Das Riff ist zu schnell? Wähle das Tempo „Sehr langsam“ und spiel erst nur über C.',
          'The riff is too fast? Choose the tempo “Very slow” and play over C only at first.',
          'Le riff va trop vite ? Choisis le tempo « Très lent » et joue d’abord seulement sur C.',
        ),
      ],
      teacher: [
        l(
          'Einstieg: Schema an die Tafel (3 Zeilen × 4 Takte). Die Klasse zählt die Takte laut, die Lehrkraft zeigt mit.',
          'Warm-up: pattern on the board (3 lines × 4 bars). The class counts the bars out loud while the teacher points.',
          'Entrée : la grille au tableau (3 lignes × 4 mesures). La classe compte les mesures à voix haute, l’enseignant montre.',
        ),
        l(
          'Übung: Drei Gruppen spielen C, F oder G7 nur dann, wenn ihr Akkord dran ist. Danach alle alles.',
          'Practice: three groups play C, F or G7 only when their chord is up. Then everyone plays everything.',
          'Exercice : trois groupes jouent C, F ou G7 seulement quand c’est leur accord. Puis tout le monde joue tout.',
        ),
        l(
          'Gemeinsam: Blues mit Band über Lautsprecher – eine Gruppe strummt, eine spielt das Boogie-Riff.',
          'Together: blues with the band over a speaker – one group strums, one plays the boogie riff.',
          'Ensemble : blues avec le groupe sur haut-parleur – un groupe gratte, l’autre joue le riff boogie.',
        ),
      ],
      sheet: [
        l('Stufen in C: **I = C, IV = F, V = G**.', 'Steps in C: **I = C, IV = F, V = G**.', 'Degrés en C : **I = C, IV = F, V = G**.'),
        l('Blues: C C C C | F F C C | G F C G7', 'Blues: C C C C | F F C C | G F C G7', 'Blues : C C C C | F F C C | G F C G7'),
        l('Boogie über C: leere Saiten C, E, G, A.', 'Boogie over C: open strings C, E, G, A.', 'Boogie sur C : cordes à vide Do, Mi, Sol, La.'),
      ],
      wissen: ['zwoelf-takt-blues'],
    },
    // ---------- 19 ----------
    {
      n: 19,
      title: l('G-Dur', 'G major', 'Sol majeur'),
      goal: l(
        'Du lernst den vollen G-Dur-Akkord mit drei Fingern und spielst ein Abendlied.',
        'You learn the full G major chord with three fingers and play an evening song.',
        'Tu apprends l’accord complet de Sol majeur avec trois doigts et tu joues une chanson du soir.',
      ),
      chords: ['G'],
      review: l(
        'Spiel einmal den 12-Takt-Blues in C – Akkorde oder Riff.',
        'Play the 12-bar blues in C once – chords or riff.',
        'Joue une fois le blues en 12 mesures en C – accords ou riff.',
      ),
      steps: [
        l(
          '**G**: Zeigefinger auf die C-Saite im 2. Bund, Mittelfinger auf die A-Saite im 2. Bund, Ringfinger auf die E-Saite im 3. Bund. Griffbild: [G](chord:G).',
          '**G**: index finger on the C string at fret 2, middle finger on the A string at fret 2, ring finger on the E string at fret 3. Chart: [G](chord:G).',
          '**G** : index sur la corde C en case 2, majeur sur la corde A en case 2, annulaire sur la corde E en case 3. Diagramme : [G](chord:G).',
        ),
        l(
          'G sieht aus wie ein kleines Dreieck – wie G7, nur andersherum. G klingt fester und „fertiger“ als G7.',
          'G looks like a little triangle – like G7 but the other way round. G sounds firmer and more “finished” than G7.',
          'G ressemble à un petit triangle – comme G7, mais à l’envers. G sonne plus solide et plus « terminé » que G7.',
        ),
        l(
          'Prüf jede Saite einzeln. Die leere G-Saite oben muss mitklingen.',
          'Check each string. The open G string at the top must ring too.',
          'Vérifie chaque corde. La corde G à vide en haut doit sonner aussi.',
        ),
        l(
          'Wechsel C ↔ G: Der Ringfinger wandert von der A-Saite (3. Bund) zur E-Saite (3. Bund) – er bleibt im selben Bund.',
          'Changing C ↔ G: the ring finger moves from the A string (fret 3) to the E string (fret 3) – it stays at the same fret.',
          'Changement C ↔ G : l’annulaire passe de la corde A (case 3) à la corde E (case 3) – il reste dans la même case.',
        ),
      ],
      piece: {
        text: l(
          '„Der Mond ist aufgegangen“ mit C, G und F – ruhig gezupft oder sanft geschlagen. Fröhlicher: „Ein Vogel wollte Hochzeit machen“.',
          '“Der Mond ist aufgegangen” with C, G and F – calmly picked or gently strummed. More cheerful: “Ein Vogel wollte Hochzeit machen”.',
          '« Der Mond ist aufgegangen » avec C, G et F – pincé calmement ou gratté doucement. Plus joyeux : « Ein Vogel wollte Hochzeit machen ».',
        ),
        play: [{ song: 'mond-ist-aufgegangen' }, { song: 'vogelhochzeit' }],
      },
      homework: [
        l('G greifen, jede Saite prüfen – fünfmal.', 'Fret G, check each string – five times.', 'Pose G, vérifie chaque corde – cinq fois.'),
        l('C ↔ G: Ringfinger bleibt im 3. Bund.', 'C ↔ G: ring finger stays at fret 3.', 'C ↔ G : l’annulaire reste en case 3.'),
        l('„Der Mond ist aufgegangen“ mit Begleitung.', '“Der Mond ist aufgegangen” with the backing.', '« Der Mond ist aufgegangen » avec l’accompagnement.'),
        l('**Spaß:** Spiel es abends als Gute-Nacht-Lied.', '**Fun:** play it in the evening as a goodnight song.', '**Pour le plaisir :** joue-la le soir comme berceuse.'),
      ],
      done: [
        l('bei G alle vier Saiten klingen', 'all four strings ring with G', 'les quatre cordes sonnent avec G'),
        l('du „Der Mond ist aufgegangen“ ganz begleitest', 'you accompany all of “Der Mond ist aufgegangen”', 'tu accompagnes « Der Mond ist aufgegangen » en entier'),
      ],
      trouble: [
        l(
          'Die Finger stehen sich im Weg? Setz zuerst den Ringfinger, dann Zeige- und Mittelfinger.',
          'Your fingers get in each other’s way? Place the ring finger first, then index and middle.',
          'Les doigts se gênent ? Pose d’abord l’annulaire, puis l’index et le majeur.',
        ),
        l(
          'Die A-Saite schnarrt? Der Mittelfinger muss nah ans Bundstäbchen.',
          'The A string buzzes? Your middle finger needs to be close to the fret wire.',
          'La corde A frise ? Le majeur doit être près de la frette.',
        ),
      ],
      teacher: [
        l(
          'Einstieg: G7 und G vorspielen – welcher will weiter, welcher ist angekommen?',
          'Warm-up: play G7 and G – which wants to move on, which has arrived?',
          'Entrée : jouer G7 puis G – lequel veut avancer, lequel est arrivé ?',
        ),
        l(
          'Übung: C ↔ G im Takt, erst je vier, dann je zwei Schläge. Partner prüfen die G-Saite.',
          'Practice: C ↔ G in time, four strums each, then two. Partners check the G string.',
          'Exercice : C ↔ G en rythme, quatre coups chacun, puis deux. Les binômes vérifient la corde G.',
        ),
        l(
          'Gemeinsames Lied: „Ein Vogel wollte Hochzeit machen“ – jede Strophe ein anderes Kind als Vorsänger.',
          'Song together: “Ein Vogel wollte Hochzeit machen” – a different child leads each verse.',
          'Chanson ensemble : « Ein Vogel wollte Hochzeit machen » – un enfant différent mène chaque couplet.',
        ),
      ],
      sheet: [
        l('**G:** Zeige C-Saite 2, Mittel A-Saite 2, Ring E-Saite 3.', '**G:** index C string 2, middle A string 2, ring E string 3.', '**G :** index corde C 2, majeur corde A 2, annulaire corde E 3.'),
        l('Leere G-Saite muss mitklingen.', 'The open G string must ring.', 'La corde G à vide doit sonner.'),
        l('C ↔ G: Ringfinger bleibt im 3. Bund.', 'C ↔ G: ring finger stays at fret 3.', 'C ↔ G : l’annulaire reste en case 3.'),
      ],
      wissen: ['ukulele-akkorde'],
    },
    // ---------- 20 ----------
    {
      n: 20,
      title: l('A7 und D7', 'A7 and D7', 'A7 et D7'),
      goal: l(
        'Du lernst A7 und D7 und spielst Lieder mit fünf Akkorden.',
        'You learn A7 and D7 and play songs with five chords.',
        'Tu apprends A7 et D7 et tu joues des chansons à cinq accords.',
      ),
      chords: ['A7', 'D7'],
      review: l(
        'C ↔ G im Takt. Klingt die leere G-Saite beim G mit?',
        'C ↔ G in time. Does the open G string ring with G?',
        'C ↔ G en rythme. La corde G à vide sonne-t-elle avec G ?',
      ),
      steps: [
        l(
          '**A7**: Zeigefinger auf die C-Saite im 1. Bund. Nur ein Finger! Griffbild: [A7](chord:A7).',
          '**A7**: index finger on the C string at fret 1. Just one finger! Chart: [A7](chord:A7).',
          '**A7** : index sur la corde C en case 1. Un seul doigt ! Diagramme : [A7](chord:A7).',
        ),
        l(
          '**D7**: Zeigefinger liegt quer über G-, C- und E-Saite im 2. Bund, Mittelfinger auf der A-Saite im 3. Bund. Griffbild: [D7](chord:D7).',
          '**D7**: index finger lies across the G, C and E strings at fret 2, middle finger on the A string at fret 3. Chart: [D7](chord:D7).',
          '**D7** : l’index est posé en travers des cordes G, C et E en case 2, le majeur sur la corde A en case 3. Diagramme : [D7](chord:D7).',
        ),
        l(
          'Beim D7 drückt der Zeigefinger drei Saiten auf einmal – ein kleiner Barré. Leg ihn gerade hin und roll ihn leicht auf die Seite.',
          'For D7 your index presses three strings at once – a little barre. Lay it straight and roll it slightly onto its side.',
          'Pour D7, l’index appuie trois cordes à la fois – un petit barré. Pose-le bien droit et fais-le rouler légèrement sur le côté.',
        ),
        l(
          'Septakkorde wollen weiter: A7 führt gern zu D7 oder Dm, D7 führt zu G. In „Weißt du, wie viel Sternlein stehen“ hörst du das schön.',
          'Seventh chords want to move on: A7 likes to lead to D7 or Dm, D7 leads to G. You can hear it nicely in “Weißt du, wie viel Sternlein stehen”.',
          'Les accords de septième veulent avancer : A7 mène volontiers à D7 ou Dm, D7 mène à G. On l’entend bien dans « Weißt du, wie viel Sternlein stehen ».',
        ),
      ],
      piece: {
        text: l(
          '„Weißt du, wie viel Sternlein stehen“ (C, G7, A7, F, D7) und „My Bonnie Lies Over the Ocean“ (C, F, D7, G7, Dm) – fünf Akkorde!',
          '“Weißt du, wie viel Sternlein stehen” (C, G7, A7, F, D7) and “My Bonnie Lies Over the Ocean” (C, F, D7, G7, Dm) – five chords!',
          '« Weißt du, wie viel Sternlein stehen » (C, G7, A7, F, D7) et « My Bonnie Lies Over the Ocean » (C, F, D7, G7, Dm) – cinq accords !',
        ),
        play: [{ song: 'weisst-du-wie-viel' }, { song: 'my-bonnie' }],
      },
      homework: [
        l('A7 und D7 je fünfmal greifen und prüfen.', 'Fret and check A7 and D7 five times each.', 'Pose et vérifie A7 et D7 cinq fois chacun.'),
        l('D7 → G7 → C langsam im Kreis.', 'D7 → G7 → C slowly round and round.', 'D7 → G7 → C lentement en boucle.'),
        l('„My Bonnie“ mit „Wartet auf mich“.', '“My Bonnie” with “Waits for me”.', '« My Bonnie » avec « Attends-moi ».'),
        l('**Spaß:** Zähl abends Sterne und spiel das Sternlein-Lied.', '**Fun:** count stars in the evening and play the star song.', '**Pour le plaisir :** compte les étoiles le soir et joue la chanson des étoiles.'),
      ],
      done: [
        l('bei D7 alle vier Saiten klingen', 'all four strings ring with D7', 'les quatre cordes sonnent avec D7'),
        l('du ein Lied mit fünf Akkorden ganz begleitest', 'you accompany a whole song with five chords', 'tu accompagnes une chanson entière à cinq accords'),
      ],
      trouble: [
        l(
          'Beim D7 klingt eine Saite dumpf? Der Zeigefinger liegt in einer Gelenkfalte. Schieb ihn ein Stück hoch oder runter.',
          'With D7 one string sounds muffled? The string is in a crease of your index finger. Shift it a little up or down.',
          'Avec D7, une corde sonne étouffée ? Elle tombe dans un pli de l’index. Décale-le un peu vers le haut ou le bas.',
        ),
        l(
          'Zu viele Akkorde? Markiere im Lied die schwierigen Stellen und übe nur diese Wechsel, bevor du das ganze Lied spielst.',
          'Too many chords? Mark the tricky spots and practise only those changes before playing the whole song.',
          'Trop d’accords ? Repère les passages difficiles et entraîne seulement ces changements avant toute la chanson.',
        ),
      ],
      teacher: [
        l(
          'Einstieg: „Ein-Finger-Akkorde“ wiederholen: C7, A7, Am – wer findet alle ohne Griffbild?',
          'Warm-up: review “one-finger chords”: C7, A7, Am – who can find them all without a chart?',
          'Entrée : réviser les « accords à un doigt » : C7, A7, Am – qui les trouve tous sans diagramme ?',
        ),
        l(
          'Übung: D7 als „Mini-Barré“ – alle legen den Zeigefinger quer, zupfen G, C, E einzeln, dann Mittelfinger dazu.',
          'Practice: D7 as a “mini barre” – everyone lays the index across, plucks G, C, E one by one, then adds the middle finger.',
          'Exercice : D7 en « mini-barré » – tout le monde couche l’index, pince G, C, E un par un, puis ajoute le majeur.',
        ),
        l(
          'Gemeinsames Lied: „My Bonnie“ – beim „Bring back“ die ganze Klasse im Chor.',
          'Song together: “My Bonnie” – the whole class in chorus on “Bring back”.',
          'Chanson ensemble : « My Bonnie » – toute la classe en chœur sur « Bring back ».',
        ),
      ],
      sheet: [
        l('**A7:** Zeigefinger auf der C-Saite, 1. Bund.', '**A7:** index finger on the C string, fret 1.', '**A7 :** index sur la corde C, case 1.'),
        l('**D7:** Zeigefinger quer über G, C, E im 2. Bund, Mittel A-Saite 3.', '**D7:** index across G, C, E at fret 2, middle A string 3.', '**D7 :** index en travers de G, C, E en case 2, majeur corde A 3.'),
        l('Schwierige Wechsel einzeln üben.', 'Practise tricky changes on their own.', 'Entraîne seuls les changements difficiles.'),
      ],
      wissen: ['ukulele-akkorde', 'akkordwechsel-schneller'],
    },
    // ---------- 21 ----------
    {
      n: 21,
      title: l('Neue Tonart G: e-Moll', 'New key G: E minor', 'Nouvelle tonalité G : Mi mineur'),
      goal: l(
        'Du lernst Em und spielst bekannte Lieder in der Tonart G.',
        'You learn Em and play songs you know in the key of G.',
        'Tu apprends Em et tu joues des chansons connues dans la tonalité de G.',
      ),
      chords: ['Em'],
      review: l(
        'A7 und D7 greifen – klingt dein D7 schon klar?',
        'Fret A7 and D7 – does your D7 sound clear yet?',
        'Pose A7 et D7 – ton D7 sonne-t-il déjà clair ?',
      ),
      steps: [
        l(
          '**Em**: Zeigefinger auf die A-Saite im 2. Bund, Mittelfinger auf die E-Saite im 3. Bund, Ringfinger auf die C-Saite im 4. Bund. Griffbild: [Em](chord:Em).',
          '**Em**: index finger on the A string at fret 2, middle finger on the E string at fret 3, ring finger on the C string at fret 4. Chart: [Em](chord:Em).',
          '**Em** : index sur la corde A en case 2, majeur sur la corde E en case 3, annulaire sur la corde C en case 4. Diagramme : [Em](chord:Em).',
        ),
        l(
          'Die Finger bilden eine schräge Treppe. Die leere G-Saite klingt mit.',
          'The fingers form a slanted staircase. The open G string rings along.',
          'Les doigts forment un escalier en biais. La corde G à vide sonne aussi.',
        ),
        l(
          'Ein Lied lässt sich in eine andere **Tonart** verschieben: Alle Akkorde rücken gleich weit. Aus C – Am – F – G7 wird in G: G – Em – C – D7.',
          'A song can be moved to another **key**: all chords shift by the same amount. C – Am – F – G7 becomes in G: G – Em – C – D7.',
          'On peut déplacer une chanson dans une autre **tonalité** : tous les accords se décalent pareil. C – Am – F – G7 devient en G : G – Em – C – D7.',
        ),
        l(
          'Die Links unten öffnen die Lieder gleich in G. Im Lied kannst du die Tonart auch selbst mit + und − ändern. Mehr: [Transponieren](wissen:transponieren).',
          'The links below open the songs straight in G. In the song you can also change the key yourself with + and −. More: [Transposing](wissen:transponieren).',
          'Les liens ci-dessous ouvrent directement les chansons en G. Dans la chanson, tu peux aussi changer la tonalité avec + et −. Plus d’infos : [Transposer](wissen:transponieren).',
        ),
      ],
      piece: {
        text: l(
          '„Hänschen klein“ in G mit G und D7 – das kennst du schon, nur mit neuen Griffen. Dann „Am Lagerfeuer“ in G mit G, Em, C und D7 – es klingt anders als in C.',
          '“Hänschen klein” in G with G and D7 – you know it already, just with new chords. Then “Am Lagerfeuer” in G with G, Em, C and D7 – it sounds different from C.',
          '« Hänschen klein » en G avec G et D7 – tu la connais déjà, mais avec de nouveaux accords. Puis « Am Lagerfeuer » en G avec G, Em, C et D7 – ça sonne autrement qu’en C.',
        ),
        play: [{ song: 'haenschen-klein', key: 'G' }, { song: 'lagerfeuer', key: 'G' }],
      },
      homework: [
        l('Em greifen, jede Saite prüfen – fünfmal.', 'Fret Em, check each string – five times.', 'Pose Em, vérifie chaque corde – cinq fois.'),
        l('G – Em – C – D7, je vier Schläge.', 'G – Em – C – D7, four strums each.', 'G – Em – C – D7, quatre coups chacun.'),
        l('„Hänschen klein“ in G und in C – hör den Unterschied.', '“Hänschen klein” in G and in C – hear the difference.', '« Hänschen klein » en G et en C – écoute la différence.'),
        l('**Spaß:** „Am Lagerfeuer“ in G mit Insel-Schlag.', '**Fun:** “Am Lagerfeuer” in G with the island strum.', '**Pour le plaisir :** « Am Lagerfeuer » en G avec le rythme des îles.'),
      ],
      done: [
        l('bei Em alle vier Saiten klingen', 'all four strings ring with Em', 'les quatre cordes sonnent avec Em'),
        l('du ein Lied in G ganz begleitest', 'you accompany a whole song in G', 'tu accompagnes une chanson entière en G'),
      ],
      trouble: [
        l(
          'Der Ringfinger erreicht den 4. Bund nicht? Lass den Daumen hinten tiefer rutschen und dreh das Handgelenk etwas nach vorn.',
          'Your ring finger can’t reach fret 4? Let your thumb slide lower behind the neck and turn your wrist slightly forward.',
          'L’annulaire n’atteint pas la case 4 ? Descends le pouce derrière le manche et tourne un peu le poignet vers l’avant.',
        ),
        l(
          'Em ist anfangs schwer – das ist normal. Übe ihn eine Woche lang jeden Tag kurz, dann sitzt er.',
          'Em is hard at first – that’s normal. Practise it briefly every day for a week and it will sit.',
          'Em est difficile au début – c’est normal. Entraîne-le un peu chaque jour pendant une semaine, et il sera en place.',
        ),
      ],
      teacher: [
        l(
          'Einstieg: „Hänschen klein“ in C und in G vorspielen. Was ist gleich, was anders?',
          'Warm-up: play “Hänschen klein” in C and in G. What is the same, what is different?',
          'Entrée : jouer « Hänschen klein » en C puis en G. Qu’est-ce qui est pareil, qu’est-ce qui change ?',
        ),
        l(
          'Übung: Tabelle an der Tafel – C→G, Am→Em, F→C, G7→D7. Die Klasse spielt Zeile für Zeile.',
          'Practice: table on the board – C→G, Am→Em, F→C, G7→D7. The class plays line by line.',
          'Exercice : tableau au tableau – C→G, Am→Em, F→C, G7→D7. La classe joue ligne par ligne.',
        ),
        l(
          'Gemeinsames Lied: „Am Lagerfeuer“ in G – wer mag, singt eine zweite Stimme.',
          'Song together: “Am Lagerfeuer” in G – whoever likes can sing a second part.',
          'Chanson ensemble : « Am Lagerfeuer » en G – qui veut chante une deuxième voix.',
        ),
      ],
      sheet: [
        l('**Em:** Zeige A-Saite 2, Mittel E-Saite 3, Ring C-Saite 4.', '**Em:** index A string 2, middle E string 3, ring C string 4.', '**Em :** index corde A 2, majeur corde E 3, annulaire corde C 4.'),
        l('In G: C→G, Am→Em, F→C, G7→D7.', 'In G: C→G, Am→Em, F→C, G7→D7.', 'En G : C→G, Am→Em, F→C, G7→D7.'),
        l('Im Lied Tonart mit + und − ändern.', 'Change the key in the song with + and −.', 'Change la tonalité dans la chanson avec + et −.'),
      ],
      wissen: ['transponieren', 'ukulele-akkorde'],
    },
    // ---------- 22 ----------
    {
      n: 22,
      title: l('Tonleiter und Melodie', 'Scale and melody', 'Gamme et mélodie'),
      goal: l(
        'Du spielst die C-Dur-Tonleiter, liest Tabulatur und zupfst eine Melodie.',
        'You play the C major scale, read tablature and pick a melody.',
        'Tu joues la gamme de Do majeur, tu lis la tablature et tu pinces une mélodie.',
      ),
      review: l(
        'G – Em – C – D7 im Kreis. Klingt dein Em schon?',
        'G – Em – C – D7 round and round. Does your Em ring yet?',
        'G – Em – C – D7 en boucle. Ton Em sonne-t-il déjà ?',
      ),
      steps: [
        l(
          'Die **C-Dur-Tonleiter** hat acht Töne: C D E F G A B C. Auf der Ukulele: C-Saite leer (C), 2. Bund (D); E-Saite leer (E), 1. Bund (F), 3. Bund (G); A-Saite leer (A), 2. Bund (B), 3. Bund (C).',
          'The **C major scale** has eight notes: C D E F G A B C. On the ukulele: C string open (C), fret 2 (D); E string open (E), fret 1 (F), fret 3 (G); A string open (A), fret 2 (B), fret 3 (C).',
          'La **gamme de Do majeur** a huit notes : Do Ré Mi Fa Sol La Si Do. Au ukulélé : corde C à vide (Do), case 2 (Ré) ; corde E à vide (Mi), case 1 (Fa), case 3 (Sol) ; corde A à vide (La), case 2 (Si), case 3 (Do).',
        ),
        l(
          'Spiel sie langsam hinauf und wieder hinunter. Sing die Namen mit. Mehr: [Töne und Notennamen](wissen:toene-und-notennamen).',
          'Play it slowly up and back down. Sing the names along. More: [Note names](wissen:toene-und-notennamen).',
          'Joue-la lentement en montant puis en descendant. Chante les noms. Plus d’infos : [Les noms des notes](wissen:toene-und-notennamen).',
        ),
        l(
          '**Tabulatur** zeigt dir, auf welcher Saite und in welchem Bund ein Ton liegt. Im Lied steht unter jeder Silbe ein Kürzel wie **A3**: Buchstabe = Saite, Zahl = Bund, 0 = leere Saite. Mehr: [Tabulatur lesen](wissen:tabulatur-lesen).',
          '**Tablature** shows which string and fret a note is on. In the song, each syllable gets a short code like **A3**: letter = string, number = fret, 0 = open string. More: [Reading tabs](wissen:tabulatur-lesen).',
          'La **tablature** indique la corde et la case de chaque note. Dans la chanson, chaque syllabe a un code comme **A3** : lettre = corde, chiffre = case, 0 = corde à vide. Plus d’infos : [Lire une tablature](wissen:tabulatur-lesen).',
        ),
        l(
          'Öffne „Alle meine Entchen“ und schalte „Tabulatur“ ein. Jetzt siehst du die Melodie als Zahlen unter dem Text – und zupfst sie mit.',
          'Open “Alle meine Entchen” and switch on “Tab”. Now you see the melody as numbers under the words – pick it along.',
          'Ouvre « Alle meine Entchen » et active « Tablature ». Tu vois la mélodie en chiffres sous les paroles – pince-la en même temps.',
        ),
        l(
          'Zwei Töne schnell hintereinander auf derselben Saite? Zupf abwechselnd mit Zeige- und Mittelfinger – das ist der Wechselschlag.',
          'Two quick notes in a row on the same string? Alternate index and middle finger – that’s alternate picking.',
          'Deux notes rapides de suite sur la même corde ? Alterne index et majeur – c’est le jeu en alternance.',
        ),
      ],
      piece: {
        text: l(
          '„Alle meine Entchen“ als Melodie: Tabulatur einschalten und Ton für Ton mitzupfen. Wenn es klappt: einmal Melodie, einmal Akkorde.',
          '“Alle meine Entchen” as a melody: switch on Tab and pick note by note. Once it works: once melody, once chords.',
          '« Alle meine Entchen » en mélodie : active Tablature et pince note par note. Quand ça marche : une fois la mélodie, une fois les accords.',
        ),
        play: [{ song: 'alle-meine-entchen' }],
      },
      homework: [
        l('Tonleiter hinauf und hinunter, Namen mitsingen.', 'Scale up and down, singing the names.', 'Gamme en montant et en descendant, en chantant les noms.'),
        l('„Alle meine Entchen“ mit Tab, erste Zeile.', '“Alle meine Entchen” with Tab, first line.', '« Alle meine Entchen » avec Tab, première ligne.'),
        l('Die ganze Melodie langsam.', 'The whole melody slowly.', 'Toute la mélodie lentement.'),
        l('**Spaß:** Erfinde eine eigene Mini-Melodie aus fünf Tönen.', '**Fun:** make up your own mini-melody from five notes.', '**Pour le plaisir :** invente ta propre mini-mélodie de cinq notes.'),
      ],
      done: [
        l('du die C-Dur-Tonleiter hinauf und hinunter spielst', 'you play the C major scale up and down', 'tu joues la gamme de Do majeur en montant et en descendant'),
        l('du eine Melodie nach Tabulatur zupfst', 'you pick a melody from tablature', 'tu pinces une mélodie d’après une tablature'),
      ],
      trouble: [
        l(
          'Du findest die Töne nicht schnell genug? Stell die Begleitung langsamer und nutze „Wartet auf mich“.',
          'You can’t find the notes fast enough? Slow the backing down and use “Waits for me”.',
          'Tu ne trouves pas les notes assez vite ? Ralentis l’accompagnement et utilise « Attends-moi ».',
        ),
        l(
          'Du findest die Saite nicht? Der Buchstabe im Kürzel ist der Saitenname: **A3** heißt A-Saite (beim Halten die unterste), 3. Bund.',
          'Can’t find the string? The letter in the code is the string name: **A3** means A string (the bottom one when you hold the ukulele), 3rd fret.',
          'Tu ne trouves pas la corde ? La lettre du code est le nom de la corde : **A3** veut dire corde A (celle du bas quand tu tiens le ukulélé), case 3.',
        ),
      ],
      teacher: [
        l(
          'Einstieg: Tonleiter singen und mit der Hand die Höhe zeigen (Treppe hinauf, Treppe hinunter).',
          'Warm-up: sing the scale and show the pitch with your hand (stairs up, stairs down).',
          'Entrée : chanter la gamme en montrant la hauteur avec la main (escalier qui monte, qui descend).',
        ),
        l(
          'Übung: Tonleiter reihum – jedes Kind spielt einen Ton, das nächste den folgenden.',
          'Practice: scale around the circle – each child plays one note, the next child the following one.',
          'Exercice : gamme en relais – chaque enfant joue une note, le suivant la note d’après.',
        ),
        l(
          'Gemeinsam: Eine Gruppe zupft die Melodie von „Alle meine Entchen“, die andere begleitet mit Akkorden.',
          'Together: one group picks the melody of “Alle meine Entchen”, the other accompanies with chords.',
          'Ensemble : un groupe pince la mélodie de « Alle meine Entchen », l’autre accompagne avec les accords.',
        ),
      ],
      sheet: [
        l('C-Saite: 0 (C), 2 (D) · E-Saite: 0 (E), 1 (F), 3 (G)', 'C string: 0 (C), 2 (D) · E string: 0 (E), 1 (F), 3 (G)', 'Corde C : 0 (Do), 2 (Ré) · corde E : 0 (Mi), 1 (Fa), 3 (Sol)'),
        l('A-Saite: 0 (A), 2 (B), 3 (C)', 'A string: 0 (A), 2 (B), 3 (C)', 'Corde A : 0 (La), 2 (Si), 3 (Do)'),
        l('Tab: Zahl = Bund, 0 = leere Saite.', 'Tab: number = fret, 0 = open string.', 'Tab : chiffre = case, 0 = corde à vide.'),
      ],
      wissen: ['tabulatur-lesen', 'toene-und-notennamen'],
    },
    // ---------- 23 ----------
    {
      n: 23,
      title: l('Neue Griffe: D, A und E7', 'New chords: D, A and E7', 'Nouveaux accords : D, A et E7'),
      goal: l(
        'Du lernst D, A und E7 und spielst ein Lied in A und in D.',
        'You learn D, A and E7 and play a song in A and in D.',
        'Tu apprends D, A et E7 et tu joues une chanson en A et en D.',
      ),
      chords: ['A', 'D', 'E7', 'Bb'],
      review: l(
        'Spiel die C-Dur-Tonleiter einmal hinauf und hinunter.',
        'Play the C major scale up and down once.',
        'Joue une fois la gamme de Do majeur en montant et en descendant.',
      ),
      steps: [
        l(
          '**A**: Mittelfinger G-Saite 2. Bund, Zeigefinger C-Saite 1. Bund. E- und A-Saite bleiben frei. Griffbild: [A](chord:A).',
          '**A**: middle finger G string fret 2, index C string fret 1. The E and A strings stay open. Chart: [A](chord:A).',
          '**A** : majeur corde G case 2, index corde C case 1. Les cordes E et A restent libres. Diagramme : [A](chord:A).',
        ),
        l(
          '**D**: Zeige-, Mittel- und Ringfinger nebeneinander im 2. Bund auf G-, C- und E-Saite. Die A-Saite bleibt frei. Griffbild: [D](chord:D).',
          '**D**: index, middle and ring fingers side by side at fret 2 on the G, C and E strings. The A string stays open. Chart: [D](chord:D).',
          '**D** : index, majeur et annulaire côte à côte en case 2 sur les cordes G, C et E. La corde A reste libre. Diagramme : [D](chord:D).',
        ),
        l(
          '**E7**: Zeigefinger G-Saite 1. Bund, Mittelfinger C-Saite 2. Bund, Ringfinger A-Saite 2. Bund. Griffbild: [E7](chord:E7).',
          '**E7**: index G string fret 1, middle C string fret 2, ring A string fret 2. Chart: [E7](chord:E7).',
          '**E7** : index corde G case 1, majeur corde C case 2, annulaire corde A case 2. Diagramme : [E7](chord:E7).',
        ),
        l(
          'In A brauchst du A, D und E7 – in D brauchst du D, G und A7. So spielst du dasselbe Lied in zwei neuen Tonarten.',
          'In A you need A, D and E7 – in D you need D, G and A7. That way you play the same song in two new keys.',
          'En A, il te faut A, D et E7 – en D, il te faut D, G et A7. Ainsi, tu joues la même chanson dans deux nouvelles tonalités.',
        ),
        l(
          'Ausblick für Mutige: **Bb** – Zeigefinger quer über E- und A-Saite im 1. Bund, Mittelfinger C-Saite 2. Bund, Ringfinger G-Saite 3. Bund. Ein echter kleiner Barré, er braucht Wochen. Tipps: [Schwierige Ukulele-Akkorde](wissen:ukulele-schwierige-akkorde).',
          'A preview for the brave: **Bb** – index across the E and A strings at fret 1, middle C string fret 2, ring G string fret 3. A real little barre that takes weeks. Tips: [Tricky ukulele chords](wissen:ukulele-schwierige-akkorde).',
          'Pour les courageux : **Bb** – index en travers des cordes E et A en case 1, majeur corde C case 2, annulaire corde G case 3. Un vrai petit barré qui demande des semaines. Astuces : [Accords de ukulélé difficiles](wissen:ukulele-schwierige-akkorde).',
        ),
      ],
      piece: {
        text: l(
          '„Alle meine Entchen“ in A mit A, D und E7 – dann in D mit D, G und A7. Dieselbe Melodie, zwei neue Klangfarben.',
          '“Alle meine Entchen” in A with A, D and E7 – then in D with D, G and A7. The same tune in two new colours.',
          '« Alle meine Entchen » en A avec A, D et E7 – puis en D avec D, G et A7. La même mélodie, deux nouvelles couleurs.',
        ),
        play: [{ song: 'alle-meine-entchen', key: 'A' }, { song: 'alle-meine-entchen', key: 'D' }],
      },
      homework: [
        l('Tag 1: A greifen und prüfen, A ↔ D.', 'Day 1: fret and check A, A ↔ D.', 'Jour 1 : pose et vérifie A, A ↔ D.'),
        l('Tag 2–3: E7 dazu, dann „Alle meine Entchen“ in A.', 'Days 2–3: add E7, then “Alle meine Entchen” in A.', 'Jours 2–3 : ajoute E7, puis « Alle meine Entchen » en A.'),
        l('Tag 4–5: dasselbe Lied in D mit D, G und A7.', 'Days 4–5: the same song in D with D, G and A7.', 'Jours 4–5 : la même chanson en D avec D, G et A7.'),
        l('**Spaß:** Lass jemanden raten, in welcher Tonart du spielst.', '**Fun:** let someone guess which key you are playing in.', '**Pour le plaisir :** fais deviner à quelqu’un dans quelle tonalité tu joues.'),
      ],
      done: [
        l('dein A und dein D klar klingen', 'your A and your D ring clearly', 'ton A et ton D sonnent clair'),
        l('du „Alle meine Entchen“ in A einmal ganz begleitest', 'you accompany all of “Alle meine Entchen” in A once', 'tu accompagnes une fois « Alle meine Entchen » en A en entier'),
      ],
      trouble: [
        l(
          'Beim D passen drei Finger nicht in den 2. Bund? Stell sie leicht schräg hintereinander – oder leg nur den Zeigefinger quer über drei Saiten.',
          'Three fingers won’t fit in fret 2 for D? Angle them slightly one behind the other – or lay just your index across three strings.',
          'Trois doigts ne tiennent pas en case 2 pour D ? Place-les un peu en biais l’un derrière l’autre – ou couche juste l’index sur trois cordes.',
        ),
        l(
          'Der Wechsel A – E7 hakt? Der Mittelfinger rutscht von der G- auf die C-Saite und bleibt im 2. Bund – lass ihn dabei auf dem Holz entlanggleiten.',
          'The A – E7 change sticks? Your middle finger moves from the G to the C string and stays at fret 2 – let it glide along the neck.',
          'Le passage A – E7 coince ? Le majeur passe de la corde G à la corde C et reste en case 2 – fais-le glisser le long du manche.',
        ),
      ],
      teacher: [
        l(
          'Einstieg: Fingergymnastik – Finger einzeln auf den Hals tippen, dann drei nebeneinander im 2. Bund.',
          'Warm-up: finger gymnastics – tap fingers one by one on the neck, then three side by side at fret 2.',
          'Entrée : gymnastique des doigts – taper les doigts un par un sur le manche, puis trois côte à côte en case 2.',
        ),
        l(
          'Übung: Drei Stationen (A, D, E7), Partner prüfen gegenseitig. Wer fertig ist, versucht Bb.',
          'Practice: three stations (A, D, E7), partners check each other. Anyone who is done tries Bb.',
          'Exercice : trois ateliers (A, D, E7), les binômes se vérifient. Qui a fini essaie Bb.',
        ),
        l(
          'Gemeinsames Lied: „Alle meine Entchen“ in C, in A und in D – die Klasse hört, wie sich die Tonart ändert.',
          'Song together: “Alle meine Entchen” in C, in A and in D – the class hears how the key changes.',
          'Chanson ensemble : « Alle meine Entchen » en C, en A et en D – la classe entend la tonalité changer.',
        ),
      ],
      sheet: [
        l('**A:** Mittel G-Saite 2, Zeige C-Saite 1.', '**A:** middle G string 2, index C string 1.', '**A :** majeur corde G 2, index corde C 1.'),
        l('**D:** drei Finger im 2. Bund auf G, C, E.', '**D:** three fingers at fret 2 on G, C, E.', '**D :** trois doigts en case 2 sur G, C, E.'),
        l('**E7:** Zeige G-Saite 1, Mittel C-Saite 2, Ring A-Saite 2.', '**E7:** index G string 1, middle C string 2, ring A string 2.', '**E7 :** index corde G 1, majeur corde C 2, annulaire corde A 2.'),
        l('**Bb** ist der Ausblick – jeden Tag kurz probieren.', '**Bb** is a preview – try it briefly every day.', '**Bb** est un aperçu – essaie-le un peu chaque jour.'),
      ],
      wissen: ['ukulele-schwierige-akkorde', 'saubere-griffe'],
    },
    // ---------- 24 ----------
    {
      n: 24,
      title: l('Dein Konzert', 'Your concert', 'Ton concert'),
      goal: l(
        'Du stellst ein kleines Programm zusammen und spielst es vor – mit einem Lied deiner Wahl.',
        'You put together a little programme and perform it – including a song of your choice.',
        'Tu prépares un petit programme et tu le joues devant d’autres – avec une chanson de ton choix.',
      ),
      review: l(
        'Spiel D, E7 und Bb einmal nacheinander. Welcher klappt schon am besten?',
        'Play D, E7 and Bb once each. Which one works best already?',
        'Joue D, E7 et Bb une fois chacun. Lequel marche déjà le mieux ?',
      ),
      steps: [
        l(
          'Wähle drei Lieder: eins, das du sicher kannst, eins zum Mitsingen und eins, das dir besonders gefällt. Die [Liederliste](tool:lieder) hilft dir.',
          'Choose three songs: one you know well, one to sing along to and one you especially like. The [song list](tool:lieder) helps.',
          'Choisis trois chansons : une que tu maîtrises, une à chanter ensemble et une que tu aimes particulièrement. La [liste des chansons](tool:lieder) t’aide.',
        ),
        l(
          'Du hast ein Lieblingslied, das nicht in der App ist? Leg es als [eigenes Lied](tool:eigenes-lied) an: Akkorde und Text einfügen, fertig.',
          'You have a favourite song that’s not in the app? Add it as [your own song](tool:eigenes-lied): paste chords and words, done.',
          'Tu as une chanson préférée qui n’est pas dans l’appli ? Ajoute-la comme [chanson perso](tool:eigenes-lied) : colle accords et paroles, c’est tout.',
        ),
        l(
          'Übe den Ablauf: Stimmen, kurz ansagen („Ich spiele …“), spielen, verbeugen. Kleine Fehler einfach überspielen – das Publikum merkt es kaum.',
          'Practise the routine: tune, announce briefly (“I’m going to play …”), play, bow. Just play through small slips – the audience hardly notices.',
          'Entraîne le déroulement : accorder, annoncer (« Je vais jouer … »), jouer, saluer. Continue simplement après une petite erreur – le public le remarque à peine.',
        ),
        l(
          'Schau zurück: Du kannst jetzt 14 Akkorde, viele Schlagmuster, Zupfen, Blues und Melodie. Toll gemacht!',
          'Look back: you now know 14 chords, several strumming patterns, picking, blues and melody. Well done!',
          'Regarde le chemin parcouru : tu connais 14 accords, plusieurs rythmes, le picking, le blues et la mélodie. Bravo !',
        ),
      ],
      piece: {
        text: l(
          'Dein Konzertprogramm, zum Beispiel „Freut euch des Lebens“, „Auld Lang Syne“ und dein eigenes Lied. Alles mit C, G7, F und Am – oder was du wählst.',
          'Your concert programme, for example “Freut euch des Lebens”, “Auld Lang Syne” and your own song. All with C, G7, F and Am – or whatever you choose.',
          'Ton programme de concert, par exemple « Freut euch des Lebens », « Auld Lang Syne » et ta propre chanson. Tout avec C, G7, F et Am – ou ce que tu choisis.',
        ),
        play: [{ tool: 'eigenes-lied' }, { song: 'auld-lang-syne' }, { song: 'freut-euch-des-lebens' }],
      },
      homework: [
        l('Drei Lieder für dein Programm auswählen.', 'Choose three songs for your programme.', 'Choisis trois chansons pour ton programme.'),
        l('Jedes Lied zweimal ganz durchspielen.', 'Play each song all the way through twice.', 'Joue chaque chanson deux fois en entier.'),
        l('Den Ablauf üben: stimmen, ansagen, spielen, verbeugen.', 'Practise the routine: tune, announce, play, bow.', 'Entraîne le déroulement : accorder, annoncer, jouer, saluer.'),
        l('**Spaß:** Gib ein Wohnzimmer-Konzert für Familie oder Freunde.', '**Fun:** give a living-room concert for family or friends.', '**Pour le plaisir :** donne un concert au salon pour ta famille ou tes amis.'),
      ],
      done: [
        l('du drei Lieder hintereinander vorspielst', 'you perform three songs in a row', 'tu joues trois chansons d’affilée devant quelqu’un'),
        l('du nach einem Patzer einfach weiterspielst', 'you just keep going after a slip', 'tu continues simplement après une petite erreur'),
      ],
      trouble: [
        l(
          'Lampenfieber? Atme vor dem Spielen dreimal tief ein und aus. Fang mit dem Lied an, das du am sichersten kannst.',
          'Stage fright? Breathe in and out deeply three times before playing. Start with the song you know best.',
          'Le trac ? Respire profondément trois fois avant de jouer. Commence par la chanson que tu maîtrises le mieux.',
        ),
        l(
          'Beim Vorspielen wird es schneller? Zähl leise ein („eins, zwei, drei, vier“) und denk an das Metronom.',
          'You speed up when performing? Count in quietly (“one, two, three, four”) and think of the metronome.',
          'Tu accélères devant le public ? Compte doucement (« un, deux, trois, quatre ») et pense au métronome.',
        ),
      ],
      teacher: [
        l(
          'Einstieg: Programm planen – jedes Kind schreibt seine drei Lieder auf, die Klasse wählt zwei gemeinsame Lieder dazu.',
          'Warm-up: plan the programme – each child writes down three songs, the class picks two shared songs as well.',
          'Entrée : préparer le programme – chaque enfant note ses trois chansons, la classe choisit en plus deux chansons communes.',
        ),
        l(
          'Übung: Generalprobe in kleinen Gruppen – jede Gruppe spielt einmal vor der Klasse, alle klatschen.',
          'Practice: dress rehearsal in small groups – each group plays once for the class, everyone applauds.',
          'Exercice : répétition générale en petits groupes – chaque groupe joue une fois devant la classe, tout le monde applaudit.',
        ),
        l(
          'Gemeinsames Lied: „Auld Lang Syne“ als großes Finale – gern vor Eltern oder anderen Klassen.',
          'Song together: “Auld Lang Syne” as the grand finale – ideally for parents or other classes.',
          'Chanson ensemble : « Auld Lang Syne » en grand final – idéalement devant les parents ou d’autres classes.',
        ),
      ],
      sheet: [
        l('Drei Lieder wählen: sicher, zum Mitsingen, Lieblingslied.', 'Choose three songs: safe, sing-along, favourite.', 'Choisis trois chansons : sûre, à chanter, préférée.'),
        l('Ablauf: stimmen – ansagen – spielen – verbeugen.', 'Routine: tune – announce – play – bow.', 'Déroulement : accorder – annoncer – jouer – saluer.'),
        l('Nach einem Patzer einfach weiterspielen.', 'After a slip, just keep going.', 'Après une erreur, continue simplement.'),
      ],
      wissen: ['lieder-fuer-anfaenger', 'ueben-mit-kindern'],
    },
  ],
};
