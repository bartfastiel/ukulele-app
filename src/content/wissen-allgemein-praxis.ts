import type { Article } from './types.ts';

export const ALLGEMEIN_PRAXIS: Article[] = [
  {
    id: 'fingerkuppen-hornhaut',
    slug: {
      de: 'fingerkuppen-schmerzen-hornhaut',
      en: 'sore-fingertips-calluses',
      fr: 'doigts-douloureux-corne',
    },
    instruments: ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline'],
    category: 'technik',
    title: {
      de: 'Fingerkuppen tun weh? So wächst Hornhaut beim Saitenspiel',
      en: 'Sore fingertips? How calluses grow when you start playing',
      fr: 'Mal au bout des doigts ? Comment la corne se forme',
    },
    description: {
      de: 'Schmerzende Fingerkuppen sind am Anfang normal. Wie lange es dauert, bis Hornhaut wächst, und wie du trotzdem jeden Tag ein bisschen üben kannst.',
      en: 'Sore fingertips are normal when you start. Find out how long calluses take to form and how to keep practising a little every day without pain.',
      fr: 'Avoir mal au bout des doigts est normal au début. Combien de temps la corne met à se former et comment jouer un peu chaque jour sans douleur.',
    },
    blocks: [
      {
        p: {
          de: 'Du hast ein paar Tage gespielt und jetzt pieksen deine Fingerkuppen? Willkommen im Club! Fast alle, die mit Ukulele, Gitarre oder Banjo anfangen, kennen das. Deine Haut ist es einfach noch nicht gewohnt, auf dünne Saiten zu drücken. Das geht vorbei – versprochen.',
          en: 'You have been playing for a few days and now your fingertips sting? Welcome to the club! Almost everyone who starts the ukulele, guitar or banjo goes through this. Your skin simply isn’t used to pressing on thin strings yet. It passes – promise.',
          fr: 'Tu joues depuis quelques jours et le bout de tes doigts te pique ? Bienvenue au club ! Presque tous ceux qui commencent le ukulélé, la guitare ou le banjo passent par là. Ta peau n’a simplement pas encore l’habitude d’appuyer sur des cordes fines. Ça passe, promis.',
        },
      },
      { h2: { de: 'Was passiert mit deinen Fingern?', en: 'What is happening to your fingers?', fr: 'Que se passe-t-il avec tes doigts ?' } },
      {
        p: {
          de: 'Wenn du eine Saite herunterdrückst, liegt der ganze Druck auf einer winzigen Stelle deiner Fingerkuppe. Der Körper merkt sich das und baut dort nach und nach eine dickere, festere Hautschicht auf: die **Hornhaut**. Mit Hornhaut tut das Drücken nicht mehr weh, und deine Töne klingen sogar klarer.',
          en: 'When you press a string down, all the pressure sits on a tiny spot of your fingertip. Your body notices and slowly builds a thicker, tougher layer of skin there: a **callus**. Once you have calluses, pressing no longer hurts, and your notes even sound clearer.',
          fr: 'Quand tu appuies sur une corde, toute la pression se concentre sur un minuscule point du bout de ton doigt. Ton corps s’en souvient et fabrique peu à peu à cet endroit une peau plus épaisse et plus dure : la **corne**. Avec de la corne, appuyer ne fait plus mal, et tes notes sonnent même plus nettes.',
        },
      },
      {
        ul: [
          {
            de: '**Ukulele und Konzertgitarre** haben weiche Nylonsaiten. Hier gewöhnen sich die Finger meist am schnellsten.',
            en: '**Ukulele and classical guitar** use soft nylon strings. Fingers usually get used to them fastest.',
            fr: '**Le ukulélé et la guitare classique** ont des cordes en nylon souples. Les doigts s’y habituent en général le plus vite.',
          },
          {
            de: '**Westerngitarre, Banjo und Mandoline** haben Stahlsaiten. Die sind dünner und härter, deshalb drücken sie am Anfang stärker.',
            en: '**Steel-string guitar, banjo and mandolin** use steel strings. They are thinner and harder, so they press more at first.',
            fr: '**La guitare folk, le banjo et la mandoline** ont des cordes en acier. Plus fines et plus dures, elles marquent davantage au début.',
          },
          {
            de: 'Nach etwa **zwei bis vier Wochen** regelmäßigem Üben merken die meisten kaum noch etwas.',
            en: 'After about **two to four weeks** of regular practice, most people hardly notice anything any more.',
            fr: 'Après environ **deux à quatre semaines** de pratique régulière, la plupart ne sentent presque plus rien.',
          },
        ],
      },
      { h2: { de: 'So übst du, ohne dass es zu sehr wehtut', en: 'How to practise without too much pain', fr: 'Jouer sans avoir trop mal' } },
      {
        ol: [
          {
            de: '**Lieber oft und kurz:** Zehn Minuten am Tag sind besser als eine Stunde am Wochenende. So hat die Haut Zeit, sich zu erholen und fester zu werden.',
            en: '**Little and often:** ten minutes a day beats one hour at the weekend. Your skin gets time to recover and toughen up.',
            fr: '**Peu mais souvent :** dix minutes par jour valent mieux qu’une heure le week-end. La peau a le temps de se reposer et de durcir.',
          },
          {
            de: '**Nicht zu fest drücken:** Probier aus, wie wenig Druck reicht, damit der Ton klar klingt. Meist ist es viel weniger, als du denkst.',
            en: '**Don’t squeeze too hard:** test how little pressure you need for a clear note. It is usually much less than you think.',
            fr: '**N’appuie pas trop fort :** cherche la pression minimale pour que la note sonne bien. C’est souvent bien moins que tu ne crois.',
          },
          {
            de: '**Dicht am Bundstäbchen greifen:** Dann brauchst du weniger Kraft.',
            en: '**Press close to the fret:** you’ll need less force.',
            fr: '**Appuie près de la frette :** il faut alors moins de force.',
          },
          {
            de: '**Pausen machen:** Wenn es brennt, leg das Instrument kurz weg. Hör dir ein Lied an oder übe den Rhythmus mit der Schlaghand.',
            en: '**Take breaks:** if it burns, put the instrument down for a moment. Listen to a song or practise rhythm with your strumming hand.',
            fr: '**Fais des pauses :** si ça brûle, pose l’instrument un moment. Écoute une chanson ou travaille le rythme avec la main qui gratte.',
          },
        ],
      },
      {
        tip: {
          de: 'Während die Finger sich erholen, kannst du prima den Rhythmus üben – ganz ohne Greifen, nur mit leeren Saiten und dem Metronom.',
          en: 'While your fingers recover, you can work on rhythm – no fretting at all, just open strings and the metronome.',
          fr: 'Pendant que tes doigts se reposent, tu peux travailler le rythme : sans rien appuyer, juste les cordes à vide et le métronome.',
        },
      },
      { tool: 'rhythmus' },
      { h2: { de: 'Was du lieber lassen solltest', en: 'Things to avoid', fr: 'Ce qu’il vaut mieux éviter' } },
      {
        ul: [
          {
            de: 'Nicht mit nassen oder frisch eingecremten Fingern spielen – aufgeweichte Haut wird schneller wund.',
            en: 'Don’t play right after a bath or with freshly creamed hands – softened skin gets sore more quickly.',
            fr: 'Évite de jouer juste après le bain ou avec les mains pleines de crème : la peau ramollie s’abîme plus vite.',
          },
          {
            de: 'Die Hornhaut nicht abknibbeln oder abfeilen. Sie ist dein Schutz.',
            en: 'Don’t pick or file off your calluses. They are your protection.',
            fr: 'N’arrache pas et ne lime pas ta corne. C’est ta protection.',
          },
          {
            de: 'Wenn sich eine Blase bildet oder es richtig wehtut: ein paar Tage Pause. Das ist kein Rückschritt, sondern klug.',
            en: 'If you get a blister or it really hurts, take a few days off. That isn’t a step back, it’s smart.',
            fr: 'Si une ampoule apparaît ou si ça fait vraiment mal, fais quelques jours de pause. Ce n’est pas un recul, c’est malin.',
          },
        ],
      },
      {
        p: {
          de: 'Übrigens: Auch Profis hatten am Anfang wunde Finger. Wer dranbleibt, hat bald Fingerkuppen, die Saiten kaum noch spüren. Wie du das Üben gut in den Alltag einbaust, steht in [Üben mit Kindern](wissen:ueben-mit-kindern).',
          en: 'By the way, even professionals had sore fingers at the beginning. Keep at it and you’ll soon have fingertips that barely feel the strings. For ideas on fitting practice into everyday life, see [Practising with kids](wissen:ueben-mit-kindern).',
          fr: 'D’ailleurs, même les pros ont eu mal aux doigts au début. Si tu persévères, tu auras bientôt des doigts qui sentent à peine les cordes. Pour intégrer la pratique au quotidien, lis [Faire pratiquer les enfants](wissen:ueben-mit-kindern).',
        },
      },
    ],
    related: ['saubere-griffe', 'ueben-mit-kindern', 'akkordwechsel-schneller'],
  },

  {
    id: 'akkordwechsel-schneller',
    slug: { de: 'akkordwechsel-schneller', en: 'faster-chord-changes', fr: 'changer-accords-plus-vite' },
    instruments: ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline'],
    category: 'technik',
    title: {
      de: 'Akkordwechsel schneller lernen – 6 Tricks für Anfänger',
      en: 'Faster chord changes – 6 tricks for beginners',
      fr: 'Changer d’accord plus vite – 6 astuces pour débutants',
    },
    description: {
      de: 'Der Akkordwechsel hakt noch? Mit Ankerfinger, Blick aufs Ziel und kurzen Wechsel-Runden klappt es Schritt für Schritt flüssiger – auf jedem Instrument.',
      en: 'Chord changes still feel slow? Anchor fingers, looking ahead and short change drills make them smoother step by step – on any stringed instrument.',
      fr: 'Tes changements d’accords accrochent encore ? Doigt pivot, regard vers l’accord suivant et petits exercices : ça devient fluide pas à pas.',
    },
    blocks: [
      {
        p: {
          de: 'Einen Akkord greifen kannst du schon – aber beim Wechsel zum nächsten entsteht eine Pause, und das Lied stolpert? Das ist ganz normal. Der Wechsel ist für die Finger eine eigene Bewegung, die man genauso übt wie den Griff selbst. Mit diesen Tricks wird es schnell besser.',
          en: 'You can already hold a chord, but switching to the next one leaves a gap and the song stumbles? That’s completely normal. A change is its own movement for your fingers, and you practise it just like the chord itself. These tricks help quickly.',
          fr: 'Tu sais déjà faire un accord, mais en passant au suivant il y a un blanc et la chanson trébuche ? C’est tout à fait normal. Le changement est un mouvement à part entière, qui se travaille comme l’accord lui-même. Ces astuces t’aideront vite.',
        },
      },
      { h2: { de: '1. Finde den Ankerfinger', en: '1. Find the anchor finger', fr: '1. Trouve le doigt pivot' } },
      {
        p: {
          de: 'Oft bleibt ein Finger bei beiden Akkorden auf derselben Saite im selben Bund liegen oder rutscht nur auf seiner Saite ein Stück weiter. Diesen **Ankerfinger** hebst du beim Wechsel nicht ab. Er hält deine Hand in Position, und die anderen Finger finden ihren Platz leichter. Schau dir die beiden Griffbilder nebeneinander an und such nach gemeinsamen Punkten.',
          en: 'Often one finger stays on the same string and fret in both chords, or just slides along its string. Keep this **anchor finger** down while changing. It holds your hand in place and the other fingers find their spots more easily. Look at both chord diagrams side by side and search for shared dots.',
          fr: 'Souvent, un doigt reste sur la même corde et la même case dans les deux accords, ou glisse simplement le long de sa corde. Ne soulève pas ce **doigt pivot** pendant le changement : il garde ta main en place et les autres doigts trouvent plus facilement leur position. Compare les deux diagrammes côte à côte pour repérer les points communs.',
        },
      },
      { chord: 'C' },
      { chord: 'Am' },
      { h2: { de: '2. Schau vorher aufs Ziel', en: '2. Look ahead to the next chord', fr: '2. Regarde l’accord suivant à l’avance' } },
      {
        p: {
          de: 'Denk schon an den nächsten Akkord, während du den aktuellen noch spielst. Wo muss welcher Finger hin? Wer erst beim Wechsel überlegt, ist zu spät. In der App zeigt dir der Liedplayer deshalb immer „Jetzt“ und „Gleich“ an.',
          en: 'Think about the next chord while you are still playing the current one. Which finger goes where? If you only start thinking at the change, you are already late. That’s why the song player in the app always shows “Now” and “Next”.',
          fr: 'Pense déjà à l’accord suivant pendant que tu joues celui en cours. Quel doigt va où ? Si tu réfléchis seulement au moment du changement, c’est trop tard. C’est pour ça que le lecteur de chansons de l’appli affiche toujours « Maintenant » et « Ensuite ».',
        },
      },
      { h2: { de: '3. Alle Finger gleichzeitig', en: '3. Move all fingers together', fr: '3. Tous les doigts en même temps' } },
      {
        p: {
          de: 'Setze die Finger nicht einzeln nacheinander, sondern versuche, sie als Gruppe in die neue Form zu bringen – wie ein Stempel. Am Anfang langsam, mit der Zeit immer flüssiger. Halte die Finger dabei nah über den Saiten, statt sie weit abzuheben.',
          en: 'Don’t place your fingers one after another; try to move them as a group into the new shape, like a stamp. Slowly at first, then more and more smoothly. Keep your fingers hovering close to the strings rather than lifting them high.',
          fr: 'Ne pose pas les doigts un par un : essaie de les amener ensemble dans la nouvelle forme, comme un tampon. Lentement au début, puis de plus en plus fluide. Garde les doigts près des cordes au lieu de les lever haut.',
        },
      },
      { h2: { de: '4. Wechsel-Runden: eine Minute, zwei Akkorde', en: '4. Change drills: one minute, two chords', fr: '4. Exercice minute : deux accords' } },
      {
        p: {
          de: 'Nimm zwei Akkorde, zum Beispiel [C](chord:C) und [Am](chord:Am), und wechsle eine Minute lang hin und her. Einmal anschlagen, wechseln, anschlagen. Zähl mit, wie viele Wechsel du schaffst – morgen sind es bestimmt mehr. Genau dafür gibt es das **Akkord-Spiel**: Wählst du zwei Akkorde, wird es zum Wechsel-Training, und das Mikrofon zählt mit.',
          en: 'Pick two chords, for example [C](chord:C) and [Am](chord:Am), and switch back and forth for one minute. Strum once, change, strum. Count how many changes you manage – tomorrow it’ll be more. That’s exactly what the **chord game** is for: choose two chords and it becomes a change drill, with the microphone counting along.',
          fr: 'Prends deux accords, par exemple [C](chord:C) et [Am](chord:Am), et passe de l’un à l’autre pendant une minute. Un coup, changement, un coup. Compte combien de changements tu réussis : demain, ce sera plus. C’est exactement le rôle du **jeu des accords** : choisis deux accords et il devient un entraînement aux changements, le micro compte avec toi.',
        },
      },
      { tool: 'spiel' },
      { h2: { de: '5. Langsam ist schnell', en: '5. Slow is fast', fr: '5. Lentement, c’est plus vite' } },
      {
        p: {
          de: 'Spiel ein Lied so langsam, dass jeder Wechsel rechtzeitig klappt – auch wenn es sich fast zu langsam anfühlt. Dein Kopf lernt die Bewegung sauber, und das Tempo kommt dann von allein. Ein Metronom hilft, gleichmäßig zu bleiben.',
          en: 'Play a song so slowly that every change lands in time, even if it feels almost too slow. Your brain learns the movement cleanly, and speed comes by itself. A metronome helps you stay steady.',
          fr: 'Joue une chanson assez lentement pour que chaque changement tombe à temps, même si ça paraît presque trop lent. Ton cerveau apprend un mouvement propre, et la vitesse viendra toute seule. Un métronome t’aide à rester régulier.',
        },
      },
      { h2: { de: '6. Weiterspielen statt anhalten', en: '6. Keep going instead of stopping', fr: '6. Continue au lieu de t’arrêter' } },
      {
        p: {
          de: 'Wenn ein Wechsel noch nicht sitzt, schlag trotzdem im Rhythmus weiter – zur Not auf leeren Saiten. Der Rhythmus ist wichtiger als jeder einzelne Ton. Mit der Zeit kommen die Finger immer pünktlicher an.',
          en: 'If a change isn’t ready yet, keep strumming in rhythm anyway, even on open strings. Rhythm matters more than any single note. Over time your fingers will arrive more and more on time.',
          fr: 'Si un changement n’est pas encore prêt, continue de gratter en rythme, même sur les cordes à vide. Le rythme compte plus que chaque note. Avec le temps, tes doigts arriveront de plus en plus à l’heure.',
        },
      },
      {
        tip: {
          de: 'Der schwierigste Wechsel in einem Lied verdient eine eigene Übungsrunde. Übe nur diese Stelle ein paar Mal, bevor du das ganze Lied spielst.',
          en: 'The hardest change in a song deserves its own drill. Practise just that spot a few times before playing the whole song.',
          fr: 'Le changement le plus difficile d’une chanson mérite son propre exercice. Travaille juste ce passage quelques fois avant de jouer toute la chanson.',
        },
      },
    ],
    related: ['saubere-griffe', 'mit-metronom-ueben', 'lieder-fuer-anfaenger'],
  },

  {
    id: 'saubere-griffe',
    slug: { de: 'saite-schnarrt-klingt-dumpf', en: 'buzzing-muted-strings', fr: 'corde-qui-frise' },
    instruments: ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline'],
    category: 'technik',
    title: {
      de: 'Saite schnarrt oder klingt dumpf? So greifst du sauber',
      en: 'String buzzing or sounding dead? How to fret cleanly',
      fr: 'Une corde frise ou sonne étouffée ? Bien appuyer les accords',
    },
    description: {
      de: 'Wenn eine Saite schnarrt oder dumpf klingt, liegt es meist an Fingerposition oder Druck. So findest du die Ursache und lässt jeden Akkord klar klingen.',
      en: 'A buzzing or muted string usually comes down to finger position or pressure. Here’s how to find the cause and make every chord ring out clearly.',
      fr: 'Une corde qui frise ou sonne mat, c’est souvent la position du doigt ou la pression. Trouve la cause et fais sonner chaque accord bien clair.',
    },
    blocks: [
      {
        p: {
          de: 'Du greifst einen Akkord, schlägst an – und irgendwas klingt komisch. Eine Saite **schnarrt** (es surrt oder scheppert), oder sie klingt **dumpf** und fast gar nicht. Keine Sorge: Das passiert allen, und die Ursache lässt sich fast immer schnell finden.',
          en: 'You hold a chord, strum – and something sounds odd. One string **buzzes** (it rattles or fizzes), or it sounds **dead** and barely rings at all. Don’t worry: it happens to everyone, and the cause is nearly always easy to find.',
          fr: 'Tu fais un accord, tu grattes… et quelque chose sonne bizarre. Une corde **frise** (elle grésille), ou elle sonne **étouffée**, presque pas du tout. Pas d’inquiétude : ça arrive à tout le monde, et la cause se trouve presque toujours vite.',
        },
      },
      { h2: { de: 'Saite für Saite prüfen', en: 'Check string by string', fr: 'Vérifie corde par corde' } },
      {
        p: {
          de: 'Halte den Akkord fest und zupfe jede Saite einzeln, langsam von oben nach unten. So hörst du genau, welche Saite das Problem ist. Dann schau dir den Finger auf dieser Saite – und die Finger daneben – genau an.',
          en: 'Hold the chord and pick each string one at a time, slowly. That way you can hear exactly which string is the problem. Then look closely at the finger on that string – and the fingers next to it.',
          fr: 'Garde l’accord et pince chaque corde une par une, lentement. Tu entends ainsi exactement quelle corde pose problème. Regarde ensuite de près le doigt sur cette corde, et les doigts voisins.',
        },
      },
      { h2: { de: 'Wenn die Saite schnarrt', en: 'If the string buzzes', fr: 'Si la corde frise' } },
      {
        ul: [
          {
            de: '**Zu weit weg vom Bundstäbchen:** Setz den Finger dicht hinter das Metallstäbchen, also auf die Seite zum Klangkörper hin – nicht mitten ins Feld und nicht obendrauf.',
            en: '**Too far from the fret:** place your finger just behind the metal fret wire, on the side towards the body – not in the middle of the space and not on top of it.',
            fr: '**Trop loin de la frette :** place le doigt juste derrière la barrette métallique, du côté de la caisse – pas au milieu de la case, ni dessus.',
          },
          {
            de: '**Zu wenig Druck:** Drück etwas fester, aber nur so viel wie nötig.',
            en: '**Not enough pressure:** press a little harder, but only as much as needed.',
            fr: '**Pas assez de pression :** appuie un peu plus fort, mais juste ce qu’il faut.',
          },
          {
            de: '**Instrument verstimmt oder Saite lose:** Manchmal liegt es gar nicht an dir. Stimm zuerst nach.',
            en: '**Out of tune or a slack string:** sometimes it isn’t you at all. Tune up first.',
            fr: '**Instrument désaccordé ou corde détendue :** parfois, tu n’y es pour rien. Accorde d’abord.',
          },
        ],
      },
      { h2: { de: 'Wenn die Saite dumpf klingt', en: 'If the string sounds dead', fr: 'Si la corde sonne étouffée' } },
      {
        ul: [
          {
            de: '**Ein Nachbarfinger berührt die Saite:** Das ist die häufigste Ursache. Greif mit der **Fingerkuppe**, nicht mit dem flachen Finger, und stell die Finger schön rund auf – wie kleine Bögen.',
            en: '**A neighbouring finger touches the string:** this is the most common cause. Fret with your **fingertip**, not the flat pad, and keep your fingers nicely arched, like little bridges.',
            fr: '**Un doigt voisin touche la corde :** c’est la cause la plus fréquente. Appuie avec le **bout du doigt**, pas avec la pulpe à plat, et garde les doigts bien arrondis, comme de petits ponts.',
          },
          {
            de: '**Der Handballen liegt an:** Bei Ukulele und Gitarre berührt manchmal der Handballen unten die höchste Saite. Halte etwas Abstand zwischen Handfläche und Hals.',
            en: '**Your palm is touching:** on ukulele and guitar, the base of your hand sometimes rests on the highest string. Leave a little space between your palm and the neck.',
            fr: '**La paume touche :** au ukulélé et à la guitare, la base de la main frôle parfois la corde la plus aiguë. Laisse un petit espace entre la paume et le manche.',
          },
          {
            de: '**Daumenposition:** Steht der Daumen hinten in der Mitte des Halses, können sich die Finger besser aufrichten.',
            en: '**Thumb position:** with your thumb behind the middle of the neck, your fingers can arch more easily.',
            fr: '**Position du pouce :** quand le pouce est derrière le manche, au milieu, les doigts se cambrent plus facilement.',
          },
          {
            de: '**Fingernägel zu lang:** Lange Nägel an der Greifhand verhindern, dass die Kuppe senkrecht aufsetzt. Kurz schneiden hilft sofort.',
            en: '**Nails too long:** long nails on your fretting hand stop the tip from landing straight. Trimming them helps instantly.',
            fr: '**Ongles trop longs :** des ongles longs sur la main qui appuie empêchent le doigt de se poser bien droit. Les couper aide tout de suite.',
          },
        ],
      },
      {
        tip: {
          de: 'Beim Banjo ist es besonders wichtig, die kurze fünfte Saite nicht mit dem Daumen der Greifhand zu berühren. Bei der Gitarre kann es auch an einer Saite liegen, die gar nicht mitklingen soll – achte auf die Kreuze im Griffbild.',
          en: 'On the banjo, take special care not to touch the short fifth string with your fretting-hand thumb. On guitar, it may be a string that isn’t meant to sound at all – look for the crosses on the chord diagram.',
          fr: 'Au banjo, fais bien attention à ne pas toucher la petite cinquième corde avec le pouce de la main gauche. À la guitare, c’est peut-être une corde qui ne devrait pas sonner du tout : repère les croix sur le diagramme.',
        },
      },
      { h2: { de: 'Lass die App zuhören', en: 'Let the app listen', fr: 'Laisse l’appli écouter' } },
      {
        p: {
          de: 'Im Werkzeug **Akkorde** gibt es bei jedem Griffbild den Knopf **„Prüf mich!“**. Du spielst den Akkord, das Mikrofon hört zu, und die App sagt dir, welche Saite noch nicht richtig klingt. Die Auswertung passiert nur auf deinem Gerät. Ohne Mikrofon kannst du einfach selbst Saite für Saite vergleichen und dir den Akkord vorspielen lassen.',
          en: 'In the **Chords** tool, every chord diagram has a **“Check me!”** button. You play the chord, the microphone listens, and the app tells you which string isn’t ringing yet. The analysis happens only on your device. Without a microphone, just compare string by string and let the app play the chord for you.',
          fr: 'Dans l’outil **Accords**, chaque diagramme a un bouton **« Vérifie-moi ! »**. Tu joues l’accord, le micro écoute et l’appli te dit quelle corde ne sonne pas encore. L’analyse se fait uniquement sur ton appareil. Sans micro, compare simplement corde par corde et fais-toi jouer l’accord par l’appli.',
        },
      },
      { tool: 'akkorde' },
      {
        p: {
          de: 'Und wenn die Finger vom vielen Drücken wehtun, lies [Fingerkuppen tun weh?](wissen:fingerkuppen-hornhaut) – das gehört am Anfang einfach dazu.',
          en: 'And if your fingers hurt from all that pressing, read [Sore fingertips?](wissen:fingerkuppen-hornhaut) – it’s just part of starting out.',
          fr: 'Et si tes doigts ont mal à force d’appuyer, lis [Mal au bout des doigts ?](wissen:fingerkuppen-hornhaut) – ça fait partie des débuts.',
        },
      },
    ],
    related: ['akkordwechsel-schneller', 'fingerkuppen-hornhaut', 'saiten-wechseln-pflege'],
  },

  {
    id: 'lieder-fuer-anfaenger',
    slug: { de: 'lieder-fuer-anfaenger', en: 'easy-songs-beginners', fr: 'chansons-faciles-debutants' },
    instruments: ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline'],
    category: 'erste-schritte',
    title: {
      de: 'Einfache Lieder für Anfänger – mit einem, zwei oder drei Akkorden',
      en: 'Easy songs for beginners – with one, two or three chords',
      fr: 'Chansons faciles pour débutants – avec un, deux ou trois accords',
    },
    description: {
      de: 'Einfache Lieder für Anfänger und Kinder, sortiert nach Anzahl der Akkorde: vom Ein-Akkord-Lied bis zu vier Akkorden. Alle direkt spielbar.',
      en: 'Easy songs for beginners and kids, sorted by number of chords: from one-chord songs up to four chords. All ready to play.',
      fr: 'Des chansons faciles pour débutants et enfants, classées par nombre d’accords, d’un seul à quatre. Toutes prêtes à jouer.',
    },
    blocks: [
      {
        p: {
          de: 'Das Schönste am Lernen ist, wenn aus ein paar Griffen ein echtes Lied wird. Dafür brauchst du gar nicht viele Akkorde. Hier findest du Lieder, sortiert danach, wie viele Akkorde vorkommen. Alle sind in der App mit Text und Akkordwechseln zum Mitspielen da.',
          en: 'The best part of learning is when a few chords turn into a real song. You don’t need many chords for that. Here are songs sorted by how many chords they use. They are all in the app with lyrics and chord changes to play along.',
          fr: 'Le plus chouette, c’est quand quelques accords deviennent une vraie chanson. Et il n’en faut pas beaucoup ! Voici des chansons classées selon le nombre d’accords. Toutes sont dans l’appli, avec paroles et changements d’accords pour jouer avec.',
        },
      },
      { h2: { de: 'Ein Akkord: sofort loslegen', en: 'One chord: start right away', fr: 'Un seul accord : on commence tout de suite' } },
      {
        p: {
          de: '[Bruder Jakob](lied:bruder-jakob) kommt mit einem einzigen Akkord aus: F. Du kannst dich also ganz auf den Rhythmus konzentrieren. Als Kanon klingt es besonders schön, wenn jemand mitsingt.',
          en: '[Bruder Jakob](lied:bruder-jakob) (the German “Frère Jacques”) needs just one chord: F. So you can focus entirely on rhythm. It sounds lovely as a round when someone sings along.',
          fr: '[Bruder Jakob](lied:bruder-jakob) (la version allemande de « Frère Jacques ») n’a besoin que d’un seul accord : F. Tu peux te concentrer entièrement sur le rythme. En canon, avec quelqu’un qui chante, c’est très joli.',
        },
      },
      { chord: 'F' },
      { h2: { de: 'Zwei Akkorde: C und G7', en: 'Two chords: C and G7', fr: 'Deux accords : C et G7' } },
      {
        p: {
          de: 'Mit [C](chord:C) und [G7](chord:G7) kannst du schon eine ganze Menge Lieder begleiten. Der Wechsel zwischen den beiden ist das erste große Ziel für viele Anfänger.',
          en: 'With [C](chord:C) and [G7](chord:G7) you can already accompany lots of songs. Changing between these two is the first big goal for many beginners.',
          fr: 'Avec [C](chord:C) et [G7](chord:G7), tu peux déjà accompagner plein de chansons. Passer de l’un à l’autre est le premier grand objectif de beaucoup de débutants.',
        },
      },
      {
        ul: [
          { de: '[Hänschen klein](lied:haenschen-klein)', en: '[Hänschen klein](lied:haenschen-klein) (German children’s song)', fr: '[Hänschen klein](lied:haenschen-klein) (comptine allemande)' },
          { de: '[Row, Row, Row Your Boat](lied:row-row)', en: '[Row, Row, Row Your Boat](lied:row-row)', fr: '[Row, Row, Row Your Boat](lied:row-row)' },
          { de: '[Mary Had a Little Lamb](lied:mary-lamb)', en: '[Mary Had a Little Lamb](lied:mary-lamb)', fr: '[Mary Had a Little Lamb](lied:mary-lamb)' },
          { de: '[London Bridge Is Falling Down](lied:london-bridge)', en: '[London Bridge Is Falling Down](lied:london-bridge)', fr: '[London Bridge Is Falling Down](lied:london-bridge)' },
          { de: '[Skip to My Lou](lied:skip-to-my-lou)', en: '[Skip to My Lou](lied:skip-to-my-lou)', fr: '[Skip to My Lou](lied:skip-to-my-lou)' },
          { de: '[Oh My Darling, Clementine](lied:clementine)', en: '[Oh My Darling, Clementine](lied:clementine)', fr: '[Oh My Darling, Clementine](lied:clementine)' },
        ],
      },
      {
        p: {
          de: 'Etwas ganz anderes: [What Shall We Do with the Drunken Sailor](lied:drunken-sailor) braucht nur Dm und C und klingt nach Seemannslied in Moll.',
          en: 'Something different: [What Shall We Do with the Drunken Sailor](lied:drunken-sailor) only needs Dm and C and has that minor-key sea-shanty sound.',
          fr: 'Pour changer : [What Shall We Do with the Drunken Sailor](lied:drunken-sailor) n’utilise que Dm et C et sonne comme un chant de marins en mineur.',
        },
      },
      { h2: { de: 'Drei Akkorde: C, F und G7', en: 'Three chords: C, F and G7', fr: 'Trois accords : C, F et G7' } },
      {
        p: {
          de: 'Kommt [F](chord:F) dazu, hast du die drei wichtigsten Akkorde der Tonart C beisammen. Damit klappen unzählige Volks- und Kinderlieder:',
          en: 'Add [F](chord:F) and you have the three most important chords in the key of C. That opens up countless folk and children’s songs:',
          fr: 'Ajoute [F](chord:F) et tu as les trois accords les plus importants de la tonalité de C. Ça ouvre la porte à d’innombrables chansons populaires et enfantines :',
        },
      },
      {
        ul: [
          { de: '[Alle meine Entchen](lied:alle-meine-entchen)', en: '[Alle meine Entchen](lied:alle-meine-entchen) (German children’s song)', fr: '[Alle meine Entchen](lied:alle-meine-entchen) (comptine allemande)' },
          { de: '[Twinkle, Twinkle, Little Star](lied:twinkle)', en: '[Twinkle, Twinkle, Little Star](lied:twinkle)', fr: '[Twinkle, Twinkle, Little Star](lied:twinkle) (l’air de « Ah ! vous dirai-je, maman »)' },
          { de: '[Jingle Bells](lied:jingle-bells)', en: '[Jingle Bells](lied:jingle-bells)', fr: '[Jingle Bells](lied:jingle-bells)' },
          { de: '[Alle Vögel sind schon da](lied:alle-voegel)', en: '[Alle Vögel sind schon da](lied:alle-voegel) (German spring song)', fr: '[Alle Vögel sind schon da](lied:alle-voegel) (chanson de printemps allemande)' },
        ],
      },
      { h2: { de: 'Vier Akkorde: mit Moll', en: 'Four chords: adding minor', fr: 'Quatre accords : avec du mineur' } },
      {
        p: {
          de: 'Mit [Am](chord:Am) als viertem Akkord wird es gefühlvoller. Probier [Am Lagerfeuer](lied:lagerfeuer) oder [Amazing Grace](lied:amazing-grace).',
          en: 'With [Am](chord:Am) as a fourth chord, things get more emotional. Try [Am Lagerfeuer](lied:lagerfeuer) or [Amazing Grace](lied:amazing-grace).',
          fr: 'Avec [Am](chord:Am) comme quatrième accord, ça devient plus émouvant. Essaie [Am Lagerfeuer](lied:lagerfeuer) ou [Amazing Grace](lied:amazing-grace).',
        },
      },
      { tool: 'lieder' },
      {
        tip: {
          de: 'Ein Akkord ist zu schwer? Mit dem Transponieren kannst du ein Lied in eine andere Tonart verschieben, in der die Griffe leichter liegen. Mehr dazu unter [Transponieren](wissen:transponieren).',
          en: 'A chord is too hard? Transposing moves a song into another key where the shapes are easier. More in [Transposing](wissen:transponieren).',
          fr: 'Un accord est trop difficile ? En transposant, tu déplaces la chanson dans une autre tonalité où les accords sont plus simples. Plus d’infos dans [Transposer](wissen:transponieren).',
        },
      },
      { h2: { de: 'Dein eigenes Lied', en: 'Your own song', fr: 'Ta propre chanson' } },
      {
        p: {
          de: 'Dein Lieblingslied ist nicht dabei? Dann füge Text und Akkorde einfach selbst ein. Die App macht daraus ein Lied zum Mitspielen, das nur auf deinem Gerät gespeichert wird.',
          en: 'Your favourite song isn’t here? Just paste in the lyrics and chords yourself. The app turns them into a play-along song, saved only on your device.',
          fr: 'Ta chanson préférée n’y est pas ? Colle toi-même les paroles et les accords. L’appli en fait une chanson à jouer, enregistrée uniquement sur ton appareil.',
        },
      },
      { tool: 'eigenes-lied' },
    ],
    related: ['akkordwechsel-schneller', 'transponieren', 'akkordsymbole-lesen'],
  },

  {
    id: 'ueben-mit-kindern',
    slug: { de: 'ueben-mit-kindern', en: 'practicing-with-kids', fr: 'faire-pratiquer-enfants' },
    instruments: ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline'],
    category: 'eltern-lehrkraefte',
    title: {
      de: 'Üben mit Kindern – so bleibt die Freude am Instrument',
      en: 'Practising with kids – keeping the joy of music alive',
      fr: 'Faire pratiquer son enfant – garder le plaisir de jouer',
    },
    description: {
      de: 'Wie Eltern ihr Kind beim Instrument-Üben begleiten: kurz und regelmäßig, ohne Druck, mit Lob für den Einsatz. Praktische Tipps für den Alltag.',
      en: 'How parents can support a child learning an instrument: short, regular practice, no pressure, and praise for effort. Practical tips for everyday life.',
      fr: 'Comment accompagner votre enfant dans l’apprentissage d’un instrument : séances courtes et régulières, sans pression, en valorisant l’effort.',
    },
    blocks: [
      {
        p: {
          de: 'Ob Ukulele, Gitarre oder Banjo: Kinder lernen ein Instrument am besten, wenn Üben sich nicht wie eine Pflicht anfühlt, sondern wie ein fester, angenehmer Teil des Tages. Eltern müssen dafür selbst nicht spielen können. Wichtiger sind Interesse, Geduld und ein paar gute Gewohnheiten.',
          en: 'Ukulele, guitar or banjo – children learn best when practice doesn’t feel like a chore but like a regular, pleasant part of the day. Parents don’t need to play themselves. Interest, patience and a few good habits matter far more.',
          fr: 'Ukulélé, guitare ou banjo : les enfants apprennent mieux quand la pratique n’est pas une corvée, mais un moment agréable et régulier de la journée. Inutile de savoir jouer vous-même. L’intérêt, la patience et quelques bonnes habitudes comptent bien davantage.',
        },
      },
      { h2: { de: 'Kurz und regelmäßig', en: 'Short and regular', fr: 'Court et régulier' } },
      {
        p: {
          de: 'Für Kinder um die zehn Jahre sind **10 bis 15 Minuten täglich** ein guter Richtwert. Das bringt deutlich mehr als eine lange Einheit pro Woche: Die Finger gewöhnen sich an die Saiten, Griffe und Wechsel setzen sich fest. Ein fester Zeitpunkt hilft – etwa direkt nach den Hausaufgaben oder vor dem Abendessen. Wenn das Instrument griffbereit steht statt im Koffer, wird es auch öfter zwischendurch in die Hand genommen.',
          en: 'For children around ten, **10 to 15 minutes a day** is a good guideline. That achieves far more than one long session a week: fingers get used to the strings, and chords and changes stick. A fixed time helps – right after homework or before dinner, say. An instrument left out on a stand rather than in its case gets picked up much more often.',
          fr: 'Pour un enfant d’une dizaine d’années, **10 à 15 minutes par jour** sont un bon repère. C’est bien plus efficace qu’une longue séance par semaine : les doigts s’habituent aux cordes, les accords et les changements s’installent. Un horaire fixe aide, par exemple juste après les devoirs ou avant le dîner. Un instrument posé sur un support, à portée de main, est aussi pris bien plus souvent qu’un instrument rangé dans son étui.',
        },
      },
      { h2: { de: 'Ein kleines Ritual', en: 'A small routine', fr: 'Un petit rituel' } },
      {
        ol: [
          {
            de: '**Stimmen** (1–2 Minuten) – ein gestimmtes Instrument klingt schön und motiviert.',
            en: '**Tune up** (1–2 minutes) – an instrument in tune sounds good and is motivating.',
            fr: '**Accorder** (1 à 2 minutes) : un instrument juste sonne bien et motive.',
          },
          {
            de: '**Aufwärmen** mit etwas Bekanntem, das schon gut klappt.',
            en: '**Warm up** with something familiar that already works well.',
            fr: '**S’échauffer** avec quelque chose de connu qui marche déjà bien.',
          },
          {
            de: '**Eine neue Sache** – ein Akkord, ein Wechsel oder eine Liedzeile. Nicht mehr.',
            en: '**One new thing** – a chord, a change or a line of a song. No more.',
            fr: '**Une seule nouveauté** : un accord, un changement ou une ligne de chanson. Pas plus.',
          },
          {
            de: '**Zum Schluss ein Lieblingslied**, damit die Einheit mit einem Erfolg endet.',
            en: '**Finish with a favourite song**, so the session ends on a success.',
            fr: '**Terminer par une chanson préférée**, pour finir sur une réussite.',
          },
        ],
      },
      { tool: 'stimmen' },
      { h2: { de: 'Ohne Druck, mit Lob für den Einsatz', en: 'No pressure, praise the effort', fr: 'Sans pression, en valorisant l’effort' } },
      {
        p: {
          de: 'Loben Sie das Dranbleiben, nicht nur das Ergebnis: „Du hast heute dreimal den Wechsel von C nach G7 probiert – und beim letzten Mal war er schon viel flüssiger.“ Vermeiden Sie Bewertungen wie „Das klang aber schief“. Besser: „Hör mal, welche Saite noch nicht mitklingt.“ Wenn etwas nicht klappt, ist es noch nicht geübt – mehr nicht. Fehler sind ein normaler Teil des Lernens.',
          en: 'Praise persistence, not just results: “You tried the change from C to G7 three times today – and the last one was much smoother.” Avoid judgements like “That sounded awful.” Try instead: “Listen – which string isn’t ringing yet?” If something doesn’t work, it simply hasn’t been practised yet. Mistakes are a normal part of learning.',
          fr: 'Félicitez la persévérance, pas seulement le résultat : « Tu as essayé trois fois le passage de C à G7 aujourd’hui, et la dernière fois c’était beaucoup plus fluide. » Évitez les jugements du type « Ça sonnait mal ». Préférez : « Écoute, quelle corde ne sonne pas encore ? » Si quelque chose ne marche pas, c’est simplement que ce n’est pas encore travaillé. Les erreurs font partie de l’apprentissage.',
        },
      },
      { h2: { de: 'Motivation: Ziele, Sterne und Mitbestimmung', en: 'Motivation: goals, stars and a say', fr: 'Motivation : objectifs, étoiles et choix' } },
      {
        ul: [
          {
            de: '**Mitbestimmen lassen:** Das Kind wählt das Lied aus, das es lernen möchte. Eigene Wünsche motivieren mehr als jeder Plan.',
            en: '**Let them choose:** the child picks the song they want to learn. Their own wishes motivate more than any plan.',
            fr: '**Laisser choisir :** l’enfant choisit la chanson qu’il veut apprendre. Ses envies motivent plus que n’importe quel programme.',
          },
          {
            de: '**Kleine Ziele:** „Bis Freitag klappt der Wechsel von C nach Am“ ist greifbarer als „Gitarre lernen“.',
            en: '**Small goals:** “By Friday, the change from C to Am works” is more tangible than “learn the guitar”.',
            fr: '**De petits objectifs :** « D’ici vendredi, le passage de C à Am fonctionne » est plus concret que « apprendre la guitare ».',
          },
          {
            de: '**Sichtbarer Fortschritt:** In der App gibt es Sterne für gespielte Lieder und einen Kalender der Übungstage. Sterne gehen nie verloren.',
            en: '**Visible progress:** the app awards stars for songs played and keeps a calendar of practice days. Stars are never taken away.',
            fr: '**Des progrès visibles :** l’appli donne des étoiles pour les chansons jouées et tient un calendrier des jours de pratique. Les étoiles ne se perdent jamais.',
          },
          {
            de: '**Spielerisch üben:** Das Akkord-Spiel oder der Blues mit Begleitband sind eine willkommene Abwechslung.',
            en: '**Make it playful:** the chord game or the blues with a backing band make a welcome change.',
            fr: '**Jouer pour de vrai :** le jeu des accords ou le blues avec groupe d’accompagnement apportent une variété bienvenue.',
          },
        ],
      },
      { h2: { de: 'Vorspielen in der Familie', en: 'Mini concerts at home', fr: 'De petits concerts en famille' } },
      {
        p: {
          de: 'Ein kleines Vorspiel am Sonntag, beim Geburtstag der Oma oder per Videoanruf gibt dem Üben ein Ziel. Singen Sie mit, auch wenn Sie selbst kein Instrument spielen – gemeinsames Musizieren ist für Kinder oft die größte Belohnung. Ein passendes Lied für den Anfang ist [Zum Geburtstag viel Glück](lied:geburtstag).',
          en: 'A little performance on Sunday, at grandma’s birthday or over a video call gives practice a purpose. Sing along even if you don’t play – making music together is often the biggest reward for children. A good first piece is [Zum Geburtstag viel Glück](lied:geburtstag), the German “Happy Birthday”.',
          fr: 'Un petit concert le dimanche, à l’anniversaire de mamie ou en appel vidéo donne un but à la pratique. Chantez avec votre enfant, même sans jouer d’un instrument : faire de la musique ensemble est souvent la plus belle récompense. Une bonne première chanson : [Zum Geburtstag viel Glück](lied:geburtstag), l’air de « Joyeux anniversaire ».',
        },
      },
      {
        tip: {
          de: 'Durststrecken sind normal. Eine Woche Pause ist kein Drama. Statt zu ermahnen, hilft oft ein neues Lied oder einfach gemeinsames Spielen.',
          en: 'Slumps are normal. A week off is no drama. Rather than nagging, a new song or simply playing together often does the trick.',
          fr: 'Les passages à vide sont normaux. Une semaine de pause n’est pas un drame. Plutôt que de faire des reproches, une nouvelle chanson ou un moment de musique ensemble aide souvent.',
        },
      },
      {
        p: {
          de: 'Wenn die Finger am Anfang wehtun, ist das normal und vergeht nach einigen Wochen – mehr dazu in [Fingerkuppen tun weh?](wissen:fingerkuppen-hornhaut).',
          en: 'Sore fingers at the beginning are normal and pass after a few weeks – more in [Sore fingertips?](wissen:fingerkuppen-hornhaut).',
          fr: 'Avoir mal aux doigts au début est normal et passe en quelques semaines – plus d’infos dans [Mal au bout des doigts ?](wissen:fingerkuppen-hornhaut).',
        },
      },
    ],
    related: ['instrumentalklasse-schule', 'lieder-fuer-anfaenger', 'app-ohne-konto'],
  },

  {
    id: 'instrumentalklasse-schule',
    slug: { de: 'instrumentalklasse-schule', en: 'school-instrument-class', fr: 'classe-instrument-ecole' },
    instruments: ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline'],
    category: 'eltern-lehrkraefte',
    title: {
      de: 'Instrumentalklasse in der Schule – Tipps für Lehrkräfte und Eltern',
      en: 'Instrument class at school – tips for teachers and parents',
      fr: 'Classe d’instrument à l’école – conseils pour enseignants et parents',
    },
    description: {
      de: 'Ukulelen- oder Gitarrenklasse: wie gemeinsames Stimmen, ein festes Tempo und gezielte Hausaufgaben gelingen und wie die kostenlose App den Unterricht begleitet.',
      en: 'Ukulele or guitar class: how to manage group tuning, a shared tempo and focused homework, and how the free app can support lessons without accounts.',
      fr: 'Classe de ukulélé ou de guitare : accorder en groupe, garder un tempo commun, donner des devoirs ciblés, et utiliser l’appli gratuite sans compte.',
    },
    blocks: [
      {
        p: {
          de: 'In vielen Schulen lernen ganze Klassen gemeinsam Ukulele oder Gitarre, manchmal auch andere Saiteninstrumente. Das ist eine großartige Chance: Kinder erleben früh, wie es ist, zusammen Musik zu machen. Gleichzeitig ist eine Gruppe von 25 Kindern mit Instrumenten eine besondere Herausforderung. Diese Hinweise richten sich an Lehrkräfte und an Eltern, die das Üben zu Hause begleiten.',
          en: 'In many schools, whole classes learn ukulele or guitar together, sometimes other stringed instruments too. It’s a great opportunity: children experience making music together early on. At the same time, 25 children with instruments are a challenge of their own. These notes are for teachers and for parents supporting practice at home.',
          fr: 'Dans de nombreuses écoles, des classes entières apprennent ensemble le ukulélé ou la guitare, parfois d’autres instruments à cordes. C’est une belle occasion : les enfants découvrent tôt le plaisir de jouer ensemble. Mais 25 enfants avec leurs instruments, c’est aussi un défi. Ces conseils s’adressent aux enseignants et aux parents qui accompagnent la pratique à la maison.',
        },
      },
      { h2: { de: 'Stimmen zu Beginn der Stunde', en: 'Tuning at the start of the lesson', fr: 'Accorder en début de cours' } },
      {
        p: {
          de: 'Verstimmte Instrumente sind der häufigste Grund, warum eine Klasse „schief“ klingt. Neue Nylonsaiten dehnen sich in den ersten Wochen stark und müssen oft nachgestimmt werden. Bewährt hat sich:',
          en: 'Out-of-tune instruments are the most common reason a class sounds off. New nylon strings stretch a lot in the first weeks and need frequent retuning. What works well:',
          fr: 'Des instruments désaccordés sont la raison la plus fréquente pour laquelle une classe sonne faux. Les cordes en nylon neuves se détendent beaucoup les premières semaines et doivent être souvent réaccordées. Ce qui fonctionne bien :',
        },
      },
      {
        ul: [
          {
            de: 'Kinder stimmen mit einem Stimmgerät auf dem Tablet oder Handy in kleinen Gruppen, während die anderen leise eine Aufgabe erledigen.',
            en: 'Children tune with a tuner on a tablet or phone in small groups while the others work quietly on a task.',
            fr: 'Les enfants s’accordent par petits groupes avec un accordeur sur tablette ou téléphone, pendant que les autres font une activité calme.',
          },
          {
            de: 'Ältere oder sichere Kinder werden „Stimm-Helfer“ für andere.',
            en: 'Older or more confident children become “tuning helpers” for the others.',
            fr: 'Les enfants plus âgés ou plus à l’aise deviennent « assistants d’accordage ».',
          },
          {
            de: 'Das Stimmgerät der App zeigt eine Nadel, erkennt die Saite und gibt Tipps, wenn ein Kind am Wirbel der Nachbarsaite dreht.',
            en: 'The app’s tuner shows a needle, detects the string and gives hints if a child turns the peg of the neighbouring string.',
            fr: 'L’accordeur de l’appli affiche une aiguille, reconnaît la corde et donne des conseils si l’enfant tourne la cheville de la corde voisine.',
          },
        ],
      },
      { tool: 'stimmen' },
      { h2: { de: 'Ein gemeinsames Tempo', en: 'A shared tempo', fr: 'Un tempo commun' } },
      {
        p: {
          de: 'In der Gruppe ist ein gleichmäßiger Puls wichtiger als jeder einzelne Akkord. Ein lautes Metronom oder ein klar vorgezähltes „1, 2, 3, 4“ hält alle zusammen. Wählen Sie das Tempo so, dass auch die langsamsten Kinder ihre Wechsel schaffen. Wer einen Wechsel noch nicht schafft, schlägt einfach im Rhythmus weiter – so bleibt die Klasse zusammen und niemand fällt heraus.',
          en: 'In a group, a steady pulse matters more than any individual chord. A loud metronome or a clear count-in of “1, 2, 3, 4” keeps everyone together. Choose a tempo at which even the slowest children can manage their changes. Anyone who can’t make a change yet simply keeps strumming in time – the class stays together and nobody drops out.',
          fr: 'En groupe, une pulsation régulière compte plus que chaque accord. Un métronome bien audible ou un « 1, 2, 3, 4 » clairement compté garde tout le monde ensemble. Choisissez un tempo qui permette même aux plus lents de réussir leurs changements. Celui qui n’y arrive pas encore continue simplement de gratter en rythme : la classe reste soudée et personne ne décroche.',
        },
      },
      { tool: 'rhythmus' },
      { h2: { de: 'Akkordwechsel gezielt üben', en: 'Practising chord changes deliberately', fr: 'Travailler les changements d’accords' } },
      {
        p: {
          de: 'Der Wechsel zwischen zwei Akkorden ist für Anfänger die größte Hürde. Kurze Wechsel-Runden von einer Minute mit genau zwei Akkorden wirken Wunder – in der Stunde ebenso wie zu Hause. Das Akkord-Spiel der App zählt per Mikrofon mit, funktioniert aber auch ohne Mikrofon. Weitere Ideen stehen in [Akkordwechsel schneller lernen](wissen:akkordwechsel-schneller).',
          en: 'Switching between two chords is the biggest hurdle for beginners. Short one-minute drills with exactly two chords work wonders, in class and at home. The app’s chord game counts along using the microphone but also works without one. More ideas in [Faster chord changes](wissen:akkordwechsel-schneller).',
          fr: 'Le passage d’un accord à l’autre est le plus grand obstacle pour les débutants. De courts exercices d’une minute avec exactement deux accords font des merveilles, en classe comme à la maison. Le jeu des accords de l’appli compte avec le micro, mais fonctionne aussi sans. D’autres idées dans [Changer d’accord plus vite](wissen:akkordwechsel-schneller).',
        },
      },
      { h2: { de: 'Die App als Hausaufgaben-Begleiter', en: 'The app as a homework companion', fr: 'L’appli comme compagnon des devoirs' } },
      {
        ul: [
          {
            de: '**Ohne Konto:** Keine Anmeldung, keine Klassenverwaltung, keine Daten der Kinder. Einfach die Seite öffnen.',
            en: '**No account:** no sign-up, no class management, no pupil data. Just open the page.',
            fr: '**Sans compte :** pas d’inscription, pas de gestion de classe, aucune donnée d’élève. Il suffit d’ouvrir la page.',
          },
          {
            de: '**Lieder mit Quelle:** Bei jedem mitgelieferten Lied stehen Herkunft und Textquelle.',
            en: '**Songs with sources:** every included song comes with its origin and the source of its lyrics.',
            fr: '**Chansons avec source :** chaque chanson fournie indique son origine et la source des paroles.',
          },
          {
            de: '**Eigene Lieder teilen:** Lehrkräfte können ein Lied mit Akkorden eingeben und per Link oder QR-Code an die Klasse weitergeben. Der Inhalt steckt im Link selbst, nichts wird hochgeladen. Bitte nur eigene oder freie Lieder teilen.',
            en: '**Share your own songs:** teachers can enter a song with chords and share it with the class via link or QR code. The content lives inside the link itself; nothing is uploaded. Please share only your own or free songs.',
            fr: '**Partager vos chansons :** l’enseignant peut saisir une chanson avec ses accords et la transmettre à la classe par lien ou QR code. Le contenu est dans le lien lui-même, rien n’est envoyé sur un serveur. Ne partagez que des chansons personnelles ou libres.',
          },
          {
            de: '**Wartet auf mich:** Im Liedmodus hält das Lied bei jedem Akkordwechsel an, bis das Kind so weit ist. So üben langsame und schnelle Kinder im eigenen Tempo.',
            en: '**Waits for me:** in this song mode, the song pauses at every chord change until the child is ready. Slower and faster children both practise at their own pace.',
            fr: '**M’attend :** dans ce mode, la chanson s’arrête à chaque changement d’accord jusqu’à ce que l’enfant soit prêt. Chacun travaille à son rythme.',
          },
        ],
      },
      { tool: 'eigenes-lied' },
      {
        tip: {
          de: 'Konkrete Hausaufgaben wirken besser als „übt mal“: zum Beispiel „Jeden Tag einmal das Lied im Modus ‚Wartet auf mich‘ und eine Minute Wechsel C–G7“.',
          en: 'Specific homework works better than “practise a bit”: for example, “Every day, play the song once in ‘Waits for me’ mode and do one minute of C–G7 changes.”',
          fr: 'Des devoirs précis marchent mieux que « entraînez-vous » : par exemple « chaque jour, la chanson une fois en mode “M’attend” et une minute de changements C–G7 ».',
        },
      },
      {
        p: {
          de: 'Wie Eltern zu Hause unterstützen können, ohne Druck aufzubauen, lesen Sie in [Üben mit Kindern](wissen:ueben-mit-kindern).',
          en: 'How parents can help at home without adding pressure is covered in [Practising with kids](wissen:ueben-mit-kindern).',
          fr: 'Comment les parents peuvent aider à la maison sans mettre de pression : voir [Faire pratiquer son enfant](wissen:ueben-mit-kindern).',
        },
      },
    ],
    related: ['ueben-mit-kindern', 'app-ohne-konto', 'lieder-fuer-anfaenger'],
  },

  {
    id: 'app-ohne-konto',
    slug: { de: 'app-ohne-konto-datenschutz', en: 'app-privacy-no-account', fr: 'appli-sans-compte-vie-privee' },
    instruments: ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline'],
    category: 'eltern-lehrkraefte',
    title: {
      de: 'Lern-App ohne Konto: Datenschutz, Mikrofon und Werbefreiheit',
      en: 'Learning app with no account: privacy, microphone and no ads',
      fr: 'Appli sans compte : vie privée, micro et zéro publicité',
    },
    description: {
      de: 'Kein Konto, keine Werbung, kein Tracking: Alles bleibt auf dem Gerät, das Mikrofon wird nur lokal ausgewertet. So funktioniert die kostenlose Lern-App.',
      en: 'No account, no ads, no tracking: everything stays on the device, and the microphone is only analysed locally. Here is how the free learning app works.',
      fr: 'Sans compte, sans publicité, sans pistage : tout reste sur l’appareil et le micro est analysé localement. Voici comment fonctionne l’appli gratuite.',
    },
    blocks: [
      {
        p: {
          de: 'Viele Eltern und Lehrkräfte fragen zu Recht: Was passiert mit den Daten meines Kindes? Die kurze Antwort: Diese App sammelt keine. Sie läuft vollständig im Browser, braucht kein Konto und zeigt keine Werbung. Hier steht, was das im Einzelnen bedeutet.',
          en: 'Many parents and teachers rightly ask: what happens to my child’s data? The short answer: this app doesn’t collect any. It runs entirely in the browser, needs no account and shows no ads. Here is what that means in detail.',
          fr: 'Beaucoup de parents et d’enseignants se demandent à juste titre : que deviennent les données de mon enfant ? Réponse courte : cette appli n’en collecte aucune. Elle fonctionne entièrement dans le navigateur, sans compte et sans publicité. Voici ce que cela signifie concrètement.',
        },
      },
      { h2: { de: 'Kein Konto, keine Werbung, kein Tracking', en: 'No account, no ads, no tracking', fr: 'Ni compte, ni publicité, ni pistage' } },
      {
        ul: [
          {
            de: 'Es gibt **keine Anmeldung** – weder E-Mail-Adresse noch Name oder Alter werden abgefragt.',
            en: 'There is **no sign-up** – no email address, name or age is ever requested.',
            fr: 'Il n’y a **aucune inscription** : ni adresse e-mail, ni nom, ni âge ne sont demandés.',
          },
          {
            de: 'Es gibt **keine Werbung** und keine Käufe innerhalb der App.',
            en: 'There are **no ads** and no in-app purchases.',
            fr: 'Il n’y a **aucune publicité** ni achat intégré.',
          },
          {
            de: 'Es gibt **kein Tracking** und keine Analyse-Dienste, die das Nutzungsverhalten auswerten.',
            en: 'There is **no tracking** and no analytics service watching how the app is used.',
            fr: 'Il n’y a **aucun pistage** ni service d’analyse qui observe l’utilisation.',
          },
        ],
      },
      { h2: { de: 'Alles bleibt auf dem Gerät', en: 'Everything stays on the device', fr: 'Tout reste sur l’appareil' } },
      {
        p: {
          de: 'Sterne, Übungstage, Einstellungen und eigene Lieder speichert die App im lokalen Speicher des Browsers auf genau diesem Gerät. Nichts davon wird an einen Server geschickt. Das hat eine Folge: Wer die Browserdaten löscht, löscht auch den Fortschritt. Damit nichts verloren geht, gibt es unter „Meine Sterne“ einen **Sicherungs-Code**. Mit ihm lässt sich der Stand aufschreiben und auf einem anderen Gerät wieder einspielen.',
          en: 'Stars, practice days, settings and your own songs are kept in the browser’s local storage on that very device. None of it is sent to a server. One consequence: clearing the browser data also clears the progress. So nothing gets lost, “My stars” offers a **backup code**. You can note it down and restore your progress on another device.',
          fr: 'Étoiles, jours de pratique, réglages et chansons personnelles sont enregistrés dans le stockage local du navigateur, sur cet appareil précis. Rien n’est envoyé à un serveur. Conséquence : effacer les données du navigateur efface aussi la progression. Pour ne rien perdre, « Mes étoiles » propose un **code de sauvegarde**, à noter puis à saisir sur un autre appareil.',
        },
      },
      { h2: { de: 'Das Mikrofon hört nur mit, es nimmt nichts auf', en: 'The microphone listens, it doesn’t record', fr: 'Le micro écoute, il n’enregistre pas' } },
      {
        p: {
          de: 'Stimmgerät, „Prüf mich!“, Akkord-Spiel und Akkord-Detektiv nutzen das Mikrofon, um Töne und Akkorde zu erkennen. Die Auswertung geschieht **ausschließlich auf dem Gerät**, in Echtzeit. Es wird nichts aufgezeichnet, gespeichert oder hochgeladen. Der Browser fragt vorher um Erlaubnis, und die lässt sich jederzeit wieder entziehen.',
          en: 'The tuner, “Check me!”, the chord game and the chord detective use the microphone to recognise notes and chords. The analysis happens **only on the device**, in real time. Nothing is recorded, stored or uploaded. The browser asks for permission first, and you can withdraw it at any time.',
          fr: 'L’accordeur, « Vérifie-moi ! », le jeu des accords et le détective d’accords utilisent le micro pour reconnaître notes et accords. L’analyse se fait **uniquement sur l’appareil**, en temps réel. Rien n’est enregistré, stocké ni envoyé. Le navigateur demande d’abord l’autorisation, que vous pouvez retirer à tout moment.',
        },
      },
      {
        tip: {
          de: 'Ohne Mikrofon funktioniert alles weiter. Dann bestätigt das Kind einfach selbst, wenn ein Akkord geklappt hat.',
          en: 'Everything keeps working without a microphone. The child then simply confirms when a chord worked.',
          fr: 'Tout fonctionne aussi sans micro. L’enfant confirme alors lui-même quand un accord a réussi.',
        },
      },
      { h2: { de: 'Lieder teilen ohne Server', en: 'Sharing songs without a server', fr: 'Partager des chansons sans serveur' } },
      {
        p: {
          de: 'Eigene Lieder lassen sich per Link oder QR-Code teilen. Das ganze Lied steckt komprimiert im Link, und zwar hinter dem Zeichen „#“. Dieser Teil einer Adresse wird vom Browser nie an den Server übertragen. Das Lied geht also direkt von Gerät zu Gerät.',
          en: 'Your own songs can be shared via link or QR code. The whole song is compressed into the link, after the “#” sign. Browsers never send that part of an address to the server, so the song travels straight from device to device.',
          fr: 'Les chansons personnelles se partagent par lien ou QR code. Toute la chanson est compressée dans le lien, après le signe « # ». Les navigateurs n’envoient jamais cette partie d’une adresse au serveur : la chanson passe directement d’un appareil à l’autre.',
        },
      },
      { tool: 'eigenes-lied' },
      { h2: { de: 'Offen und kostenlos', en: 'Open and free', fr: 'Ouverte et gratuite' } },
      {
        p: {
          de: 'Die App ist Open Source: Der gesamte Quelltext ist öffentlich einsehbar, sodass jeder nachprüfen kann, dass sie tut, was hier steht. Sie ist kostenlos und entstand ursprünglich als private Übungshilfe für ein Kind in einer Ukulelenklasse. Wie sie sich gut ins Üben einfügt, steht in [Üben mit Kindern](wissen:ueben-mit-kindern).',
          en: 'The app is open source: all of its code is public, so anyone can check that it does what is described here. It is free and started out as a private practice aid for a child in a school ukulele class. How it fits into everyday practice is covered in [Practising with kids](wissen:ueben-mit-kindern).',
          fr: 'L’appli est open source : tout son code est public, chacun peut donc vérifier qu’elle fait ce qui est décrit ici. Elle est gratuite et est née comme aide à la pratique pour un enfant d’une classe de ukulélé. Pour l’intégrer au quotidien, voir [Faire pratiquer son enfant](wissen:ueben-mit-kindern).',
        },
      },
    ],
    related: ['ueben-mit-kindern', 'instrumentalklasse-schule'],
  },

  {
    id: 'saiten-wechseln-pflege',
    slug: { de: 'saiten-wechseln-pflege', en: 'change-strings-care', fr: 'changer-cordes-entretien' },
    instruments: ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline'],
    category: 'instrument',
    title: {
      de: 'Saiten wechseln und Instrument pflegen – so geht’s',
      en: 'Changing strings and caring for your instrument',
      fr: 'Changer les cordes et entretenir son instrument',
    },
    description: {
      de: 'Wann Saiten gewechselt werden sollten, worauf du bei Ukulele, Gitarre und Banjo achten musst und wie du dein Instrument richtig aufbewahrst und pflegst.',
      en: 'When to change strings, what to watch out for on ukulele, guitar and banjo, and how to store and look after your instrument so it keeps sounding great.',
      fr: 'Quand changer les cordes, à quoi faire attention sur ukulélé, guitare et banjo, et comment ranger et entretenir ton instrument pour qu’il sonne bien.',
    },
    blocks: [
      {
        p: {
          de: 'Ein Instrument, das gut gepflegt ist, klingt schöner, bleibt besser in Stimmung und macht mehr Spaß. Das meiste davon ist ganz einfach. Nur beim Saitenwechsel lohnt es sich, beim ersten Mal einen Erwachsenen oder deine Lehrkraft dazuzuholen.',
          en: 'A well-cared-for instrument sounds nicer, stays in tune better and is more fun to play. Most of it is very simple. Only when changing strings is it worth asking an adult or your teacher to help the first time.',
          fr: 'Un instrument bien entretenu sonne mieux, tient mieux l’accord et donne plus envie de jouer. C’est en général très simple. Seulement pour changer les cordes, mieux vaut demander de l’aide à un adulte ou à ton professeur la première fois.',
        },
      },
      { h2: { de: 'Jeden Tag: kleine Pflege', en: 'Every day: a little care', fr: 'Chaque jour : un peu de soin' } },
      {
        ul: [
          {
            de: '**Hände waschen** vor dem Spielen. Fett und Schmutz machen Saiten schneller stumpf.',
            en: '**Wash your hands** before playing. Grease and dirt make strings dull faster.',
            fr: '**Lave-toi les mains** avant de jouer. Le gras et la saleté ternissent vite les cordes.',
          },
          {
            de: '**Abwischen** nach dem Spielen: Saiten und Hals kurz mit einem trockenen, weichen Tuch abreiben.',
            en: '**Wipe down** after playing: give the strings and neck a quick rub with a dry, soft cloth.',
            fr: '**Essuie** après avoir joué : passe un chiffon doux et sec sur les cordes et le manche.',
          },
          {
            de: '**Sicher abstellen:** in einem Ständer, an einer Wandhalterung oder in der Tasche – nicht auf dem Stuhl, wo sich jemand draufsetzt.',
            en: '**Put it down safely:** on a stand, a wall hanger or in its case – not on a chair where someone might sit on it.',
            fr: '**Range-le en sécurité :** sur un support, au mur ou dans son étui – pas sur une chaise où quelqu’un pourrait s’asseoir.',
          },
        ],
      },
      { h2: { de: 'Richtig aufbewahren', en: 'Storing it properly', fr: 'Bien le ranger' } },
      {
        p: {
          de: 'Holz mag keine Extreme. Lass dein Instrument nicht in der prallen Sonne, nicht direkt an der Heizung und im Winter nicht im kalten Auto liegen. Große Temperatursprünge und sehr trockene Luft können Holz reißen lassen und verstimmen das Instrument. Kommt es aus der Kälte, lass es ein paar Minuten in der geschlossenen Tasche warm werden.',
          en: 'Wood doesn’t like extremes. Don’t leave your instrument in blazing sun, right next to a radiator or in a cold car in winter. Big temperature jumps and very dry air can crack wood and knock the instrument out of tune. If it comes in from the cold, let it warm up in its closed case for a few minutes.',
          fr: 'Le bois n’aime pas les extrêmes. Ne laisse pas ton instrument en plein soleil, contre un radiateur ou dans une voiture froide en hiver. Les grands écarts de température et l’air très sec peuvent fendre le bois et désaccorder l’instrument. S’il arrive du froid, laisse-le se réchauffer quelques minutes dans son étui fermé.',
        },
      },
      { h2: { de: 'Wann sollten die Saiten gewechselt werden?', en: 'When should strings be changed?', fr: 'Quand changer les cordes ?' } },
      {
        ul: [
          {
            de: 'Sie klingen **dumpf** und nicht mehr hell, obwohl das Instrument gestimmt ist.',
            en: 'They sound **dull** rather than bright, even though the instrument is in tune.',
            fr: 'Elles sonnent **sourd** et plus clair du tout, alors que l’instrument est accordé.',
          },
          {
            de: 'Das Instrument **hält die Stimmung nicht mehr**, oder Akkorde weiter oben am Hals klingen schief.',
            en: 'The instrument **won’t stay in tune** any more, or chords higher up the neck sound off.',
            fr: 'L’instrument **ne tient plus l’accord**, ou les accords plus haut sur le manche sonnent faux.',
          },
          {
            de: 'Man sieht **Rillen, Rost oder aufgeraute Stellen**, oder eine Saite ist gerissen.',
            en: 'You can see **grooves, rust or rough spots**, or a string has broken.',
            fr: 'On voit des **creux, de la rouille ou des endroits rugueux**, ou une corde a cassé.',
          },
        ],
      },
      {
        p: {
          de: 'Wer täglich ein bisschen übt, wechselt grob alle paar Monate. Bei Stahlsaiten und viel Spielen kann es auch früher sein.',
          en: 'If you practise a little every day, a change every few months is a rough guide. With steel strings and lots of playing it can be sooner.',
          fr: 'Si tu joues un peu chaque jour, change-les environ tous les quelques mois. Avec des cordes en acier et beaucoup de jeu, ça peut être plus tôt.',
        },
      },
      { h2: { de: 'Was je Instrument wichtig ist', en: 'What matters on each instrument', fr: 'Ce qui compte selon l’instrument' } },
      {
        ul: [
          {
            de: '**Ukulele und Konzertgitarre (Nylon):** Neue Nylonsaiten dehnen sich in den ersten Tagen stark. Stimm oft nach – das ist ganz normal und hört nach ein bis zwei Wochen auf. Vorsichtiges Ziehen an der frisch aufgezogenen Saite hilft beim Einspielen.',
            en: '**Ukulele and classical guitar (nylon):** new nylon strings stretch a lot during the first days. Retune often – that’s perfectly normal and settles after one or two weeks. Gently pulling on a freshly fitted string helps it settle.',
            fr: '**Ukulélé et guitare classique (nylon) :** les cordes en nylon neuves se détendent beaucoup les premiers jours. Réaccorde souvent, c’est tout à fait normal et ça se stabilise après une ou deux semaines. Tirer doucement sur une corde neuve l’aide à se mettre en place.',
          },
          {
            de: '**Westerngitarre (Stahl):** Niemals Stahlsaiten auf eine Konzertgitarre ziehen – der Zug ist viel höher und kann das Instrument beschädigen. Saitenenden sind spitz, also vorsichtig abknipsen.',
            en: '**Steel-string guitar:** never put steel strings on a classical guitar – the tension is much higher and can damage it. String ends are sharp, so snip them carefully.',
            fr: '**Guitare folk (acier) :** ne mets jamais de cordes en acier sur une guitare classique – la tension est bien plus forte et peut l’abîmer. Les bouts de cordes piquent : coupe-les prudemment.',
          },
          {
            de: '**Banjo und Mandoline (Stahl):** Der Steg wird nur vom Druck der Saiten gehalten und ist nicht festgeklebt. Wechsle deshalb **eine Saite nach der anderen**, nie alle auf einmal. Markiere vorher die Steglage mit einem kleinen Stück Klebeband, denn schon ein paar Millimeter verschieben die Stimmung weiter oben am Hals.',
            en: '**Banjo and mandolin (steel):** the bridge is held in place only by string pressure, not glued. So change **one string at a time**, never all at once. Mark the bridge position with a small piece of tape first, because even a few millimetres throw off the tuning higher up the neck.',
            fr: '**Banjo et mandoline (acier) :** le chevalet tient uniquement grâce à la pression des cordes, il n’est pas collé. Change donc **une corde à la fois**, jamais toutes d’un coup. Marque d’abord sa position avec un petit bout de ruban adhésif : quelques millimètres suffisent à fausser la justesse plus haut sur le manche.',
          },
        ],
      },
      {
        tip: {
          de: 'Nach dem Saitenwechsel ist Stimmen besonders wichtig. Das Stimmgerät der App erkennt die Saite und zeigt dir, ob du höher oder tiefer drehen musst.',
          en: 'After changing strings, tuning matters more than ever. The app’s tuner detects the string and shows whether to tune up or down.',
          fr: 'Après un changement de cordes, accorder est encore plus important. L’accordeur de l’appli reconnaît la corde et t’indique s’il faut monter ou descendre.',
        },
      },
      { tool: 'stimmen' },
      {
        p: {
          de: 'Klingt eine Saite trotz neuer Saiten noch komisch, findest du Hilfe in [Saite schnarrt oder klingt dumpf?](wissen:saubere-griffe).',
          en: 'If a string still sounds odd with new strings on, see [String buzzing or sounding dead?](wissen:saubere-griffe).',
          fr: 'Si une corde sonne encore bizarre malgré des cordes neuves, regarde [Une corde frise ou sonne étouffée ?](wissen:saubere-griffe).',
        },
      },
    ],
    related: ['saubere-griffe', 'fingerkuppen-hornhaut'],
  },
];
