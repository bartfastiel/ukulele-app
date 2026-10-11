import type { Course } from './lektionen.ts';
import type { L10n } from './types.ts';

const L = (de: string, en: string, fr: string): L10n => ({ de, en, fr });

/** Gitarren-Kurs: eine Lektion je Unterrichtswoche. Nummern nie verschieben – Neues kommt hinten dazu. */
export const GITARRE_COURSE: Course = {
  instrument: 'gitarre',
  parts: [
    { from: 1, title: L('Erste Schritte', 'First steps', 'Premiers pas') },
    { from: 6, title: L('Die ersten Lieder', 'Your first songs', 'Tes premières chansons') },
    { from: 11, title: L('Neue Griffe, neue Muster', 'New chords, new patterns', 'Nouveaux accords, nouveaux rythmes') },
    { from: 18, title: L('Musik verstehen', 'Understanding music', 'Comprendre la musique') },
    { from: 22, title: L('Für Fortgeschrittene', 'Going further', 'Pour aller plus loin') },
  ],
  lessons: [
    // ---------- 1 ----------
    {
      n: 1,
      title: L('Halten, anschlagen, erster Akkord', 'Hold, strum, first chord', 'Tenir, gratter, premier accord'),
      goal: L(
        'Du hältst die Gitarre bequem, schlägst Saiten an und spielst deinen ersten Akkord: Em.',
        'You hold the guitar comfortably, strike the strings and play your very first chord: Em.',
        'Tu tiens la guitare confortablement, tu fais sonner les cordes et tu joues ton premier accord : Em.',
      ),
      chords: ['Em'],
      steps: [
        L(
          'Setz dich vorn auf die Stuhlkante. Die Gitarre liegt auf dem rechten Bein, der Hals zeigt leicht nach oben. Schultern locker! Oder klassisch auf dem linken Bein mit Fußbank – wie deine Lehrkraft es zeigt. Mehr in [Gitarre richtig halten](wissen:gitarre-halten).',
          'Sit near the front edge of your chair. The guitar rests on your right leg, the neck points slightly up. Keep your shoulders loose! Or classical style on your left leg with a footstool – as your teacher shows you. More in [Holding the guitar](wissen:gitarre-halten).',
          'Assieds-toi au bord de la chaise. La guitare repose sur ta jambe droite, le manche monte un peu. Épaules détendues ! Ou en position classique sur la jambe gauche avec un repose-pied – comme ton enseignant te le montre. Plus de détails : [Tenir la guitare](wissen:gitarre-halten).',
        ),
        L(
          'Zupf nur die dickste Saite, die tiefe E-Saite, mit dem Daumen. Lass sie klingen, bis sie leise wird. Dann zupf die dünnste, die hohe e-Saite.',
          'Pluck only the thickest string, the low E string, with your thumb. Let it ring until it fades. Then pluck the thinnest one, the high e string.',
          'Pince seulement la corde la plus grosse, la corde E grave, avec le pouce. Laisse-la sonner jusqu’au silence. Puis la plus fine, la corde e aiguë.',
        ),
        L(
          'Jetzt einmal über alle sechs Saiten: mit dem Daumen, dem Nagel des Zeigefingers oder einem Plektrum – wie deine Lehrkraft es zeigt – von oben nach unten streichen, ruhig, gleichmäßig, nicht zu hart.',
          'Now sweep across all six strings once: with your thumb, index fingernail or a pick – as your teacher shows you – from top to bottom, calm, even, not too hard.',
          'Balaie maintenant les six cordes d’un coup : avec le pouce, l’ongle de l’index ou un médiator – comme ton enseignant te le montre – de haut en bas, calmement, régulièrement, sans taper.',
        ),
        L(
          'Dein erster Akkord [Em](chord:Em): Mittelfinger auf die A-Saite, Ringfinger auf die D-Saite, beide im 2. Bund. Alle sechs Saiten dürfen klingen.',
          'Your first chord, [Em](chord:Em): middle finger on the A string, ring finger on the D string, both at the 2nd fret. All six strings may ring.',
          'Ton premier accord, [Em](chord:Em) : majeur sur la corde A, annulaire sur la corde D, tous deux en case 2. Les six cordes peuvent sonner.',
        ),
        L(
          'So liest du ein Griffbild: Die senkrechten Linien sind die Saiten (links die tiefe E-, rechts die hohe e-Saite), die waagrechten die Bundstäbchen. Ein Punkt zeigt, wo ein Finger drückt – die Zahl darin, welcher: 1 Zeige-, 2 Mittel-, 3 Ring-, 4 kleiner Finger. „o“ heißt leer anschlagen, „x“ nicht anschlagen.',
          'How to read a chord chart: the vertical lines are the strings (low E on the left, high e on the right), the horizontal ones are the frets. A dot shows where a finger presses – the number says which one: 1 index, 2 middle, 3 ring, 4 little finger. “o” means play the open string, “x” means don’t play it.',
          'Lire un diagramme : les lignes verticales sont les cordes (E grave à gauche, e aiguë à droite), les lignes horizontales les frettes. Un point montre où un doigt appuie – le chiffre dit lequel : 1 index, 2 majeur, 3 annulaire, 4 auriculaire. « o » : corde à vide, « x » : ne pas jouer la corde.',
        ),
        L(
          'Tippe auf der Akkordseite auf das Mikrofon: Die App hört zu und sagt dir, ob alle Saiten klingen. Mehr Tipps: [Die ersten Akkorde](wissen:gitarre-erste-akkorde).',
          'On the chord page, tap the microphone: the app listens and tells you whether all strings ring. More tips: [First chords](wissen:gitarre-erste-akkorde).',
          'Sur la page de l’accord, touche le micro : l’appli écoute et te dit si toutes les cordes sonnent. Plus d’astuces : [Premiers accords](wissen:gitarre-erste-akkorde).',
        ),
      ],
      piece: {
        text: L(
          'Einzählen („eins, zwei, drei, vier“), dann viermal Em anschlagen, viermal alle Saiten leer – und immer im Kreis. Im Rhythmus „Nur runter“ wählen, Akkord Em, Tempo langsam: Das Metronom zählt mit.',
          'Count in (“one, two, three, four”), then strum Em four times, all open strings four times – round and round. In the rhythm tool choose “Only down”, chord Em, slow tempo: the metronome counts along.',
          'Compte (« un, deux, trois, quatre »), puis gratte quatre fois Em, quatre fois les cordes à vide – et on recommence. Dans le rythme, choisis « Que vers le bas », accord Em, tempo lent : le métronome compte avec toi.',
        ),
        play: [{ tool: 'rhythmus', pattern: 'Nur runter' }],
      },
      homework: [
        L('Jeden Tag: gerade sitzen, Gitarre auf das rechte Bein, Schultern locker.', 'Every day: sit up straight, guitar on your right leg, shoulders loose.', 'Chaque jour : assieds-toi droit, guitare sur la jambe droite, épaules détendues.'),
        L('Tag 1–2: jede Saite einzeln zupfen, von tief nach hoch, und klingen lassen.', 'Days 1–2: pluck each string on its own, low to high, and let it ring.', 'Jours 1–2 : pince chaque corde seule, du grave à l’aigu, et laisse sonner.'),
        L('Tag 3–4: Em greifen, loslassen, wieder greifen – zehnmal.', 'Days 3–4: put Em on, let go, put it on again – ten times.', 'Jours 3–4 : pose Em, relâche, repose – dix fois.'),
        L('Tag 5: dein Stück mit dem Metronom – viermal Em, viermal leer.', 'Day 5: your piece with the metronome – four times Em, four times open.', 'Jour 5 : ton morceau avec le métronome – quatre fois Em, quatre fois à vide.'),
        L('Spaß: Spiel dein Stück jemandem zu Hause vor!', 'Fun: play your piece for someone at home!', 'Pour le plaisir : joue ton morceau à quelqu’un chez toi !'),
      ],
      done: [
        L('du bequem sitzt und die Gitarre nicht wegrutscht', 'you sit comfortably and the guitar doesn’t slip', 'tu es bien assis et la guitare ne glisse pas'),
        L('bei Em alle sechs Saiten klingen', 'all six strings ring when you play Em', 'les six cordes sonnent quand tu joues Em'),
        L('du dein Stück einmal ohne Pause schaffst', 'you get through your piece once without stopping', 'tu joues ton morceau une fois sans t’arrêter'),
      ],
      trouble: [
        L(
          'Die Fingerkuppen tun weh? Das ist am Anfang normal. Lieber jeden Tag kurz üben als einmal lang – nach ein, zwei Wochen wird die Haut fester.',
          'Do your fingertips hurt? That’s normal at the start. Practise a little every day rather than once for a long time – after a week or two the skin gets tougher.',
          'Le bout des doigts fait mal ? C’est normal au début. Joue un peu chaque jour plutôt qu’une fois longtemps – en une ou deux semaines, la peau durcit.',
        ),
        L(
          'Eine Saite klingt dumpf? Dann berührt ein Finger sie. Stell die Finger steiler auf, wie kleine Hämmer.',
          'A string sounds muffled? Then a finger is touching it. Arch your fingers more, like little hammers.',
          'Une corde sonne étouffée ? Un doigt la touche. Place tes doigts plus droits, comme de petits marteaux.',
        ),
      ],
      teacher: [
        L(
          'Einstieg: Alle zupfen gleichzeitig die tiefe E-Saite und hören zu, bis der Ton verklingt. Wer hört ihn am längsten?',
          'Warm-up: everyone plucks the low E string at the same time and listens until it fades. Who can hear it the longest?',
          'Mise en route : tout le monde pince la corde E grave en même temps et écoute jusqu’au silence. Qui l’entend le plus longtemps ?',
        ),
        L(
          'Übung: Em greifen und lösen im Wechsel – die Lehrkraft ruft im Takt „greifen“ und „lösen“, die Gruppe folgt.',
          'Practice: put Em on and release it in turn – the teacher calls “on” and “off” in time, the group follows.',
          'Exercice : poser et relâcher Em à tour de rôle – l’enseignant annonce « on pose », « on lâche » en rythme, le groupe suit.',
        ),
        L(
          'Gemeinsam: das Stück mit dem Metronom im Kreis – eine Hälfte spielt Em, die andere die leeren Saiten, dann tauschen.',
          'Together: play the piece round and round with the metronome – half the group plays Em, the other half the open strings, then swap.',
          'Ensemble : jouer le morceau en boucle avec le métronome – une moitié joue Em, l’autre les cordes à vide, puis on échange.',
        ),
      ],
      sheet: [
        L('Vorn auf die Stuhlkante, Gitarre auf das rechte Bein, Schultern locker.', 'Front edge of the chair, guitar on your right leg, shoulders loose.', 'Au bord de la chaise, guitare sur la jambe droite, épaules détendues.'),
        L('Erst einzelne Saiten zupfen, dann einmal über alle sechs streichen.', 'First pluck single strings, then sweep across all six.', 'D’abord pincer une corde, puis balayer les six.'),
        L('**Em:** Mittelfinger A-Saite, Ringfinger D-Saite, beide im 2. Bund.', '**Em:** middle finger A string, ring finger D string, both at fret 2.', '**Em :** majeur corde A, annulaire corde D, tous deux en case 2.'),
      ],
      wissen: ['gitarre-halten', 'gitarre-erste-akkorde'],
    },
    // ---------- 2 ----------
    {
      n: 2,
      title: L('Stimmen und die Saitennamen', 'Tuning and string names', 'Accorder et nommer les cordes'),
      goal: L(
        'Du stimmst deine Gitarre mit dem Stimmgerät und kennst die Namen aller sechs Saiten.',
        'You tune your guitar with the tuner and know the names of all six strings.',
        'Tu accordes ta guitare avec l’accordeur et tu connais le nom des six cordes.',
      ),
      review: L(
        'Letzte Woche: sitzen, anschlagen und Em. Spiel zum Aufwärmen einmal dein Stück: viermal Em, viermal leer.',
        'Last week: sitting, strumming and Em. Warm up with your piece once: four times Em, four times open.',
        'La semaine dernière : la posture, le grattage et Em. Échauffe-toi avec ton morceau : quatre fois Em, quatre fois à vide.',
      ),
      steps: [
        L(
          'Die Saiten heißen von der dicksten zur dünnsten: **E A D G B e**. Merksatz: **E**lf **A**ffen **D**ösen **G**ern **B**ei **E**rdbeeren.',
          'From thickest to thinnest the strings are: **E A D G B e**. Memory trick: **E**very **A**nt **D**igs **G**reat **B**ig **E**arthworms.',
          'De la plus grosse à la plus fine, les cordes s’appellent : **E A D G B e**. Pour t’en souvenir : **E**lle **A** **D**eux **G**rands **B**eaux **É**léphants.',
        ),
        L(
          'Öffne das [Stimmgerät](tool:stimmen) und zupf die tiefe E-Saite. Die Anzeige sagt dir: zu tief, zu hoch oder genau richtig.',
          'Open the [tuner](tool:stimmen) and pluck the low E string. The display tells you: too low, too high or just right.',
          'Ouvre l’[accordeur](tool:stimmen) et pince la corde E grave. L’affichage te dit : trop grave, trop aigu ou juste.',
        ),
        L(
          'Zu tief? Dreh den Wirbel langsam so, dass die Saite straffer wird, und zupf dabei immer wieder. Zu hoch? Erst ein Stück lockern, dann von unten herandrehen.',
          'Too low? Turn the tuning peg slowly so the string gets tighter, and keep plucking while you turn. Too high? Loosen a bit first, then tune up to the note.',
          'Trop grave ? Tourne la cheville doucement pour tendre la corde, en pinçant sans arrêt. Trop aigu ? Détends un peu, puis remonte jusqu’à la note.',
        ),
        L(
          'So stimmst du alle sechs Saiten nacheinander. Danach noch einmal alle prüfen – oft hat sich eine wieder ein wenig verstellt. Mehr in [Gitarre stimmen](wissen:gitarre-stimmen).',
          'Tune all six strings one after the other this way. Then check them all once more – often one has moved a little. More in [Tuning the guitar](wissen:gitarre-stimmen).',
          'Accorde ainsi les six cordes l’une après l’autre. Vérifie-les ensuite encore une fois – souvent l’une a un peu bougé. Plus d’infos : [Accorder la guitare](wissen:gitarre-stimmen).',
        ),
        L(
          'Hör den Unterschied: Spiel [Em](chord:Em) vor und nach dem Stimmen. Gestimmt klingt der Akkord viel klarer.',
          'Hear the difference: play [Em](chord:Em) before and after tuning. In tune, the chord sounds much clearer.',
          'Écoute la différence : joue [Em](chord:Em) avant et après l’accordage. Accordé, l’accord sonne bien plus clair.',
        ),
        L(
          'Pflege: Wisch nach dem Üben die Saiten kurz mit einem trockenen Tuch ab und stell die Gitarre in ihre Tasche oder auf einen Ständer – nicht an die Heizung und nicht in die pralle Sonne.',
          'Care: after practising, wipe the strings with a dry cloth and put the guitar in its bag or on a stand – not next to the heater and not in bright sun.',
          'Entretien : après avoir joué, essuie les cordes avec un chiffon sec et range la guitare dans sa housse ou sur un support – pas près du radiateur ni en plein soleil.',
        ),
      ],
      piece: {
        text: L(
          'Viermal Em anschlagen, dann viermal nur die tiefe E-Saite zupfen – im Wechsel, immer im Kreis. Im Rhythmus „Nur runter“, Tempo langsam.',
          'Strum Em four times, then pluck only the low E string four times – back and forth, round and round. In the rhythm tool “Only down”, slow tempo.',
          'Gratte quatre fois Em, puis pince quatre fois seulement la corde E grave – en alternance, en boucle. Dans le rythme « Que vers le bas », tempo lent.',
        ),
        play: [{ tool: 'stimmen' }, { tool: 'rhythmus', pattern: 'Nur runter' }],
      },
      homework: [
        L('Jeden Tag zuerst stimmen – Saite für Saite mit dem Stimmgerät.', 'Tune first every day – string by string with the tuner.', 'Chaque jour, accorde d’abord – corde par corde avec l’accordeur.'),
        L('Tag 1–2: Saitennamen aufsagen und dabei jede Saite zupfen.', 'Days 1–2: say the string names out loud while plucking each one.', 'Jours 1–2 : dis le nom des cordes à voix haute en pinçant chacune.'),
        L('Tag 3–4: dein Stück mit dem Metronom, langsam.', 'Days 3–4: your piece with the metronome, slowly.', 'Jours 3–4 : ton morceau avec le métronome, lentement.'),
        L('Tag 5: Augen zu – welche Saite zupfst du? Sag den Namen.', 'Day 5: eyes closed – which string are you plucking? Say its name.', 'Jour 5 : yeux fermés – quelle corde pinces-tu ? Dis son nom.'),
        L('Spaß: Erfinde einen eigenen Merksatz für E A D G B e.', 'Fun: make up your own memory trick for E A D G B e.', 'Pour le plaisir : invente ta propre phrase pour E A D G B e.'),
      ],
      done: [
        L('du alle sechs Saiten mit dem Stimmgerät stimmen kannst', 'you can tune all six strings with the tuner', 'tu sais accorder les six cordes avec l’accordeur'),
        L('du die Saitennamen von tief nach hoch weißt', 'you know the string names from low to high', 'tu connais le nom des cordes du grave à l’aigu'),
      ],
      trouble: [
        L(
          'Die Anzeige springt hin und her? Zupf eine Saite allein, kräftig, und halte die anderen still. Ein ruhiger Raum hilft dem Mikrofon.',
          'The display jumps around? Pluck one string on its own, firmly, and keep the others quiet. A quiet room helps the microphone.',
          'L’affichage saute dans tous les sens ? Pince une seule corde, franchement, et garde les autres silencieuses. Une pièce calme aide le micro.',
        ),
        L(
          'Angst, dass die Saite reißt? Dreh in kleinen Schritten und zupf dabei. Wird der Ton viel höher als gedacht, dreh zurück.',
          'Worried the string will snap? Turn in small steps while you pluck. If the note gets much higher than expected, turn back.',
          'Peur de casser la corde ? Tourne par petits pas en pinçant. Si la note monte bien plus que prévu, reviens en arrière.',
        ),
      ],
      teacher: [
        L(
          'Einstieg: Die Gruppe sagt die Saitennamen im Chor auf, die Lehrkraft zupft dazu jeweils die Saite.',
          'Warm-up: the group says the string names together while the teacher plucks each string.',
          'Mise en route : le groupe récite le nom des cordes en chœur pendant que l’enseignant pince chaque corde.',
        ),
        L(
          'Übung: Zu zweit stimmen – eine Person dreht, die andere liest das Stimmgerät ab und sagt „höher“ oder „tiefer“.',
          'Practice: tune in pairs – one turns the pegs, the other reads the tuner and says “higher” or “lower”.',
          'Exercice : accorder à deux – l’un tourne, l’autre lit l’accordeur et dit « plus aigu » ou « plus grave ».',
        ),
        L(
          'Gemeinsam: das Stück im Kreis spielen – erst alle Em, dann alle die tiefe E-Saite. Klingt gestimmt viel schöner!',
          'Together: play the piece round and round – first everyone Em, then everyone the low E string. It sounds so much better in tune!',
          'Ensemble : jouer le morceau en boucle – d’abord tous Em, puis tous la corde E grave. Accordé, c’est bien plus beau !',
        ),
      ],
      sheet: [
        L('Saiten von dick nach dünn: **E A D G B e**.', 'Strings from thick to thin: **E A D G B e**.', 'Cordes de la grosse à la fine : **E A D G B e**.'),
        L('Stimmgerät öffnen, eine Saite zupfen, Wirbel langsam drehen.', 'Open the tuner, pluck one string, turn the peg slowly.', 'Ouvre l’accordeur, pince une corde, tourne la cheville doucement.'),
        L('Zu hoch? Erst lockern, dann von unten herandrehen.', 'Too high? Loosen first, then tune up to the note.', 'Trop aigu ? Détends d’abord, puis remonte.'),
      ],
      wissen: ['gitarre-stimmen', 'gitarre-saiten'],
    },
    // ---------- 3 ----------
    {
      n: 3,
      title: L('Die Saite richtig drücken', 'Pressing a string properly', 'Bien appuyer sur la corde'),
      goal: L(
        'Du drückst eine Saite so, dass sie klar klingt – und spielst damit Blues mit der Band.',
        'You press a string so that it rings clearly – and use it to play the blues with the band.',
        'Tu appuies sur une corde pour qu’elle sonne clair – et tu joues du blues avec le groupe.',
      ),
      review: L(
        'Letzte Woche: stimmen und E A D G B e. Stimm zuerst deine Gitarre und sag dabei die Saitennamen auf.',
        'Last week: tuning and E A D G B e. Tune your guitar first and say the string names as you go.',
        'La semaine dernière : l’accordage et E A D G B e. Accorde d’abord ta guitare en disant le nom des cordes.',
      ),
      steps: [
        L(
          'Der Daumen der linken Hand liegt hinten am Hals, etwa hinter dem Mittelfinger. Die Hand bleibt rund, wie um einen kleinen Ball.',
          'Your left thumb rests on the back of the neck, roughly behind your middle finger. Keep the hand round, as if holding a small ball.',
          'Le pouce gauche se pose derrière le manche, à peu près derrière le majeur. La main reste arrondie, comme autour d’une petite balle.',
        ),
        L(
          'Drück mit der **Fingerkuppe**, nicht mit dem flachen Finger. Der beste Platz ist **kurz vor dem Bundstäbchen**, nicht mitten im Bund.',
          'Press with your **fingertip**, not the flat of your finger. The best spot is **just behind the fret wire**, not in the middle of the fret.',
          'Appuie avec le **bout du doigt**, pas à plat. Le meilleur endroit est **juste avant la frette**, pas au milieu de la case.',
        ),
        L(
          'Nicht zu fest! Drück erst ganz leicht, zupf, und drück dann nur so viel fester, bis der Ton klar klingt. Mehr ist nicht nötig.',
          'Not too hard! Press very lightly first, pluck, then press only a little harder until the note rings clearly. No more is needed.',
          'Pas trop fort ! Appuie d’abord très doucement, pince, puis appuie juste un peu plus jusqu’à ce que la note sonne clair. Pas besoin de plus.',
        ),
        L(
          'Probier es auf der A-Saite im 2. Bund mit dem Zeigefinger: Das ist der Ton B. Schnarrt es? Rück näher an das Bundstäbchen. Mehr in [Sauber greifen](wissen:saubere-griffe).',
          'Try it on the A string at the 2nd fret with your index finger: that’s the note B. Buzzing? Move closer to the fret wire. More in [Clean fretting](wissen:saubere-griffe).',
          'Essaie sur la corde A en case 2 avec l’index : c’est la note Si. Ça frise ? Rapproche-toi de la frette. Plus d’infos : [Bien appuyer](wissen:saubere-griffe).',
        ),
        L(
          'Im [Blues](tool:blues) auf Stufe 1 spielst du nur Grundtöne: E und A sind leere Saiten, B liegt auf der A-Saite im 2. Bund. Der goldene Punkt zeigt dir, wann welcher dran ist.',
          'In the [blues](tool:blues) on level 1 you only play root notes: E and A are open strings, B is on the A string at the 2nd fret. The golden dot shows you which one comes next.',
          'Dans le [blues](tool:blues) au niveau 1, tu ne joues que les fondamentales : Mi et La sont des cordes à vide, Si est sur la corde A en case 2. Le point doré t’indique laquelle jouer.',
        ),
      ],
      piece: {
        text: L(
          'Blues mit Band in E, Stufe 1 · Grundton: In jedem Takt viermal den Grundton zupfen – E, A oder B. Die Band spielt dazu, du gibst den Bass!',
          'Blues with the band in E, level 1 · Root note: pluck the root four times in every bar – E, A or B. The band plays along, you are the bass!',
          'Blues avec le groupe en E, niveau 1 · Fondamentale : dans chaque mesure, pince quatre fois la fondamentale – Mi, La ou Si. Le groupe joue, toi tu fais la basse !',
        ),
        play: [{ tool: 'blues', level: 1, key: 'E' }],
      },
      homework: [
        L('Jeden Tag zuerst stimmen.', 'Tune first every day.', 'Chaque jour, accorde d’abord.'),
        L('Tag 1–2: B auf der A-Saite (2. Bund) – erst leicht, dann fester, bis es klar klingt.', 'Days 1–2: B on the A string (fret 2) – lightly first, then firmer until it rings clearly.', 'Jours 1–2 : Si sur la corde A (case 2) – d’abord doucement, puis plus fort jusqu’à un son clair.'),
        L('Tag 3: dasselbe mit Mittel- und Ringfinger.', 'Day 3: the same with your middle and ring fingers.', 'Jour 3 : pareil avec le majeur et l’annulaire.'),
        L('Tag 4–5: Blues Stufe 1 mit der Band, ganz langsam.', 'Days 4–5: blues level 1 with the band, very slowly.', 'Jours 4–5 : blues niveau 1 avec le groupe, très lentement.'),
        L('Spaß: Lass dir die 12 Takte einmal komplett gelingen – und klatsch dir selbst!', 'Fun: get through all 12 bars once – then give yourself a round of applause!', 'Pour le plaisir : réussis les 12 mesures en entier – et applaudis-toi !'),
      ],
      done: [
        L('B auf der A-Saite klar klingt, ohne zu schnarren', 'B on the A string rings clearly without buzzing', 'Si sur la corde A sonne clair, sans friser'),
        L('du im Blues bei jedem Takt den richtigen Grundton findest', 'you find the right root note in every bar of the blues', 'tu trouves la bonne fondamentale à chaque mesure du blues'),
      ],
      trouble: [
        L(
          'Es schnarrt? Finger näher ans Bundstäbchen schieben – nicht einfach fester drücken.',
          'Buzzing? Slide your finger closer to the fret wire – don’t just press harder.',
          'Ça frise ? Avance le doigt vers la frette – n’appuie pas simplement plus fort.',
        ),
        L(
          'Die Hand wird müde? Nach jedem Versuch kurz ausschütteln. Der Daumen drückt nicht mit, er hält nur dagegen.',
          'Your hand gets tired? Shake it out after each try. The thumb doesn’t squeeze, it just gives support.',
          'La main fatigue ? Secoue-la après chaque essai. Le pouce ne serre pas, il sert juste d’appui.',
        ),
        L(
          'Die Fingerkuppe tut weh? Normal – lieber zweimal am Tag fünf Minuten als einmal lange. Mehr in [Hornhaut](wissen:fingerkuppen-hornhaut).',
          'Fingertip sore? Normal – better twice a day for five minutes than once for a long time. More in [Calluses](wissen:fingerkuppen-hornhaut).',
          'Le bout du doigt fait mal ? Normal – mieux vaut deux fois cinq minutes par jour qu’une longue séance. Plus d’infos : [La corne](wissen:fingerkuppen-hornhaut).',
        ),
      ],
      teacher: [
        L(
          'Einstieg: „Leise-laut-Spiel“ – alle drücken B ganz leicht und werden langsam fester, bis der Ton klar ist. Wie wenig Kraft reicht?',
          'Warm-up: the “soft-to-firm game” – everyone presses B very lightly and slowly gets firmer until the note is clear. How little force is enough?',
          'Mise en route : le « jeu du doux au ferme » – tous appuient Si très doucement puis de plus en plus, jusqu’au son clair. Quelle force suffit ?',
        ),
        L(
          'Übung: Die Lehrkraft zeigt E, A oder B, die Gruppe spielt den Ton viermal. Erst langsam, dann zügiger.',
          'Practice: the teacher points to E, A or B and the group plays that note four times. Slowly at first, then faster.',
          'Exercice : l’enseignant montre Mi, La ou Si, le groupe joue la note quatre fois. Lentement d’abord, puis plus vite.',
        ),
        L(
          'Gemeinsam: Blues mit der App über Lautsprecher, Stufe 1 – die ganze Gruppe ist die Bassgruppe.',
          'Together: blues with the app through a speaker, level 1 – the whole group is the bass section.',
          'Ensemble : blues avec l’appli sur haut-parleur, niveau 1 – tout le groupe fait la basse.',
        ),
      ],
      sheet: [
        L('Daumen hinten am Hals, Hand rund wie um einen Ball.', 'Thumb on the back of the neck, hand round as if holding a ball.', 'Pouce derrière le manche, main ronde comme autour d’une balle.'),
        L('Mit der Fingerkuppe **kurz vor dem Bundstäbchen** drücken.', 'Press with your fingertip **just behind the fret wire**.', 'Appuie du bout du doigt **juste avant la frette**.'),
        L('Nur so fest, bis es klar klingt – nicht fester.', 'Only as firm as it takes to ring clearly – no harder.', 'Juste assez fort pour un son clair – pas plus.'),
        L('Blues Stufe 1: E und A leer, B = A-Saite 2. Bund.', 'Blues level 1: E and A open, B = A string fret 2.', 'Blues niveau 1 : Mi et La à vide, Si = corde A case 2.'),
      ],
      wissen: ['saubere-griffe', 'fingerkuppen-hornhaut'],
    },
    // ---------- 4 ----------
    {
      n: 4,
      title: L('E-Dur', 'E major', 'Mi majeur (E)'),
      goal: L(
        'Du spielst E-Dur und wechselst zwischen Em und E – mit nur einem Finger Unterschied.',
        'You play E major and switch between Em and E – just one finger makes the difference.',
        'Tu joues E (Mi majeur) et tu passes de Em à E – un seul doigt fait la différence.',
      ),
      chords: ['E'],
      review: L(
        'Letzte Woche: richtig drücken. Spiel einmal Blues Stufe 1 – klingt B klar?',
        'Last week: pressing properly. Play blues level 1 once – does B ring clearly?',
        'La semaine dernière : bien appuyer. Joue une fois le blues niveau 1 – le Si sonne-t-il clair ?',
      ),
      steps: [
        L(
          'Greif [Em](chord:Em) wie gewohnt: Mittelfinger A-Saite, Ringfinger D-Saite, beide im 2. Bund.',
          'Play [Em](chord:Em) as usual: middle finger on the A string, ring finger on the D string, both at the 2nd fret.',
          'Pose [Em](chord:Em) comme d’habitude : majeur sur la corde A, annulaire sur la corde D, tous deux en case 2.',
        ),
        L(
          'Jetzt kommt der Zeigefinger dazu: auf die G-Saite im 1. Bund. Das ist [E](chord:E) – E-Dur. Hör hin: Es klingt heller, fröhlicher.',
          'Now add your index finger: G string, 1st fret. That’s [E](chord:E) – E major. Listen: it sounds brighter, happier.',
          'Ajoute maintenant l’index : corde G, case 1. Voilà [E](chord:E) – Mi majeur. Écoute : c’est plus lumineux, plus joyeux.',
        ),
        L(
          'Achte darauf, dass der Zeigefinger die B-Saite darunter nicht berührt. Zupf die Saiten einzeln von tief nach hoch: Klingen alle sechs?',
          'Make sure your index finger doesn’t touch the B string below it. Pluck the strings one by one from low to high: do all six ring?',
          'Vérifie que l’index ne touche pas la corde B juste en dessous. Pince les cordes une à une du grave à l’aigu : les six sonnent-elles ?',
        ),
        L(
          'Wechsel üben: Mittel- und Ringfinger bleiben liegen, nur der Zeigefinger hebt sich und landet wieder. Em – E – Em – E.',
          'Practise switching: middle and ring fingers stay put, only the index finger lifts off and lands again. Em – E – Em – E.',
          'Entraîne le changement : majeur et annulaire restent en place, seul l’index se lève et se repose. Em – E – Em – E.',
        ),
        L(
          'Lied ab: [Bruder Jakob](lied:bruder-jakob) in E braucht nur einen Akkord. Die Begleitung wartet auf dich.',
          'Song time: [Bruder Jakob](lied:bruder-jakob) in E needs only one chord. The backing waits for you.',
          'À toi : [Bruder Jakob](lied:bruder-jakob) en E n’a besoin que d’un accord. L’accompagnement t’attend.',
        ),
      ],
      piece: {
        text: L(
          'Bruder Jakob in E – nur E-Dur, viermal pro Takt nach unten. Danach im Rhythmus: viermal Em, viermal E, im Kreis.',
          'Bruder Jakob in E – only E major, four downstrokes per bar. Then in the rhythm tool: four times Em, four times E, round and round.',
          'Bruder Jakob en E – seulement E, quatre coups vers le bas par mesure. Puis dans le rythme : quatre fois Em, quatre fois E, en boucle.',
        ),
        play: [{ song: 'bruder-jakob', key: 'E' }, { tool: 'rhythmus', pattern: 'Nur runter' }],
      },
      homework: [
        L('Jeden Tag zuerst stimmen.', 'Tune first every day.', 'Chaque jour, accorde d’abord.'),
        L('Tag 1–2: E greifen, Saiten einzeln zupfen – klingen alle sechs?', 'Days 1–2: play E, pluck the strings one by one – do all six ring?', 'Jours 1–2 : pose E, pince les cordes une à une – les six sonnent-elles ?'),
        L('Tag 3–4: Em – E – Em – E, nur der Zeigefinger bewegt sich.', 'Days 3–4: Em – E – Em – E, only the index finger moves.', 'Jours 3–4 : Em – E – Em – E, seul l’index bouge.'),
        L('Tag 5: Bruder Jakob in E mitspielen.', 'Day 5: play along with Bruder Jakob in E.', 'Jour 5 : joue Bruder Jakob en E.'),
        L('Spaß: Sing Bruder Jakob mit, während du spielst!', 'Fun: sing Bruder Jakob while you play!', 'Pour le plaisir : chante Bruder Jakob en jouant !'),
      ],
      done: [
        L('bei E alle sechs Saiten klingen', 'all six strings ring when you play E', 'les six cordes sonnent quand tu joues E'),
        L('du Em und E im Takt wechseln kannst', 'you can switch between Em and E in time', 'tu passes de Em à E en rythme'),
        L('du Bruder Jakob einmal ganz durchspielst', 'you play Bruder Jakob all the way through once', 'tu joues Bruder Jakob une fois en entier'),
      ],
      trouble: [
        L(
          'Die B-Saite klingt dumpf? Der Zeigefinger liegt zu flach. Stell ihn steiler auf, sodass nur die Kuppe die G-Saite berührt.',
          'The B string sounds muffled? Your index finger is too flat. Arch it so only the tip touches the G string.',
          'La corde B sonne étouffée ? L’index est trop à plat. Redresse-le pour que seul le bout touche la corde G.',
        ),
        L(
          'Drei Finger auf einmal sind schwer? Setz sie nacheinander: erst Mittel-, dann Ring-, dann Zeigefinger. Mit der Zeit landen alle zusammen.',
          'Three fingers at once is hard? Place them one after another: middle, then ring, then index. In time they’ll all land together.',
          'Trois doigts d’un coup, c’est dur ? Pose-les l’un après l’autre : majeur, annulaire, puis index. Avec le temps, ils arriveront ensemble.',
        ),
      ],
      teacher: [
        L(
          'Einstieg: Die Lehrkraft spielt Em und E im Wechsel – die Gruppe ruft „traurig“ oder „fröhlich“.',
          'Warm-up: the teacher alternates Em and E – the group calls out “sad” or “happy”.',
          'Mise en route : l’enseignant alterne Em et E – le groupe dit « triste » ou « joyeux ».',
        ),
        L(
          'Übung: „Zeigefinger-Hüpfen“ – auf Kommando hebt die Gruppe nur den Zeigefinger und setzt ihn wieder, ohne zu spielen.',
          'Practice: “index finger hop” – on cue, the group lifts only the index finger and puts it back, without strumming.',
          'Exercice : « saut de l’index » – au signal, le groupe lève seulement l’index et le repose, sans jouer.',
        ),
        L(
          'Gemeinsam: Bruder Jakob in E – zuerst singen alle, dann spielen alle E dazu, zum Schluss als Kanon in zwei Gruppen singen.',
          'Together: Bruder Jakob in E – first everyone sings, then everyone strums E along, finally sing it as a round in two groups.',
          'Ensemble : Bruder Jakob en E – d’abord tous chantent, puis tous jouent E, enfin on le chante en canon à deux groupes.',
        ),
      ],
      sheet: [
        L('Em greifen, dann Zeigefinger auf die G-Saite im 1. Bund: **E**.', 'Play Em, then add your index finger on the G string, fret 1: **E**.', 'Pose Em, puis l’index sur la corde G en case 1 : **E**.'),
        L('Zeigefinger steil, damit die B-Saite frei klingt.', 'Keep the index finger arched so the B string rings freely.', 'Index bien droit pour que la corde B sonne librement.'),
        L('Em – E – Em – E: nur der Zeigefinger bewegt sich.', 'Em – E – Em – E: only the index finger moves.', 'Em – E – Em – E : seul l’index bouge.'),
      ],
      wissen: ['gitarre-erste-akkorde'],
    },
    // ---------- 5 ----------
    {
      n: 5,
      title: L('a-Moll (Am)', 'A minor (Am)', 'La mineur (Am)'),
      goal: L(
        'Du spielst Am und wechselst zwischen Em und Am im Takt.',
        'You play Am and switch between Em and Am in time.',
        'Tu joues Am et tu passes de Em à Am en rythme.',
      ),
      chords: ['Am'],
      review: L(
        'Letzte Woche: E-Dur. Spiel zum Aufwärmen Bruder Jakob in E.',
        'Last week: E major. Warm up with Bruder Jakob in E.',
        'La semaine dernière : E (Mi majeur). Échauffe-toi avec Bruder Jakob en E.',
      ),
      steps: [
        L(
          'Greif [E](chord:E). Jetzt rück mit allen drei Fingern gemeinsam **eine Saite weiter Richtung Boden** – die Form bleibt gleich. Das ist [Am](chord:Am).',
          'Play [E](chord:E). Now move all three fingers together **one string towards the floor** – the shape stays the same. That’s [Am](chord:Am).',
          'Pose [E](chord:E). Décale maintenant les trois doigts ensemble **d’une corde vers le sol** – la forme reste la même. Voilà [Am](chord:Am).',
        ),
        L(
          'Bei Am liegen: Mittelfinger D-Saite und Ringfinger G-Saite im 2. Bund, Zeigefinger B-Saite im 1. Bund.',
          'For Am: middle finger on the D string and ring finger on the G string at the 2nd fret, index finger on the B string at the 1st fret.',
          'Pour Am : majeur sur la corde D et annulaire sur la corde G en case 2, index sur la corde B en case 1.',
        ),
        L(
          'Die tiefe E-Saite schlägst du bei Am **nicht** an. Beginn den Anschlag auf der A-Saite.',
          'With Am you **don’t** play the low E string. Start your strum on the A string.',
          'Avec Am, tu **ne joues pas** la corde E grave. Commence ton grattage sur la corde A.',
        ),
        L(
          'Wechsel Em – Am: Erst ganz langsam, Finger setzen, anschlagen, lösen. Schau vor dem Wechsel schon dorthin, wo die Finger hinwollen. Mehr Tricks in [Akkordwechsel](wissen:akkordwechsel-schneller).',
          'Switching Em – Am: very slowly at first – place fingers, strum, release. Look where your fingers are going before you switch. More tricks in [Chord changes](wissen:akkordwechsel-schneller).',
          'Changement Em – Am : très lentement d’abord – poser, gratter, relâcher. Regarde où vont tes doigts avant de changer. Plus d’astuces : [Changer d’accord](wissen:akkordwechsel-schneller).',
        ),
        L(
          'Im [Akkord-Spiel](tool:spiel) wählst du „Em und Am“: Wie viele Wechsel schaffst du in einer Minute?',
          'In the [chord game](tool:spiel) choose “Em and Am”: how many changes can you manage in one minute?',
          'Dans le [jeu des accords](tool:spiel), choisis « Em et Am » : combien de changements en une minute ?',
        ),
      ],
      piece: {
        text: L(
          'Viermal Em, viermal Am – im Kreis, mit dem Rhythmus „Nur runter“, langsam. Klingt schon nach einem richtigen Song! Danach: Akkord-Spiel mit Em und Am.',
          'Four times Em, four times Am – round and round with “Only down”, slowly. Already sounds like a real song! Then: the chord game with Em and Am.',
          'Quatre fois Em, quatre fois Am – en boucle avec « Que vers le bas », lentement. On dirait déjà une vraie chanson ! Ensuite : le jeu avec Em et Am.',
        ),
        play: [{ tool: 'rhythmus', pattern: 'Nur runter' }, { tool: 'spiel', chords: ['Em', 'Am'] }],
      },
      homework: [
        L('Jeden Tag zuerst stimmen.', 'Tune first every day.', 'Chaque jour, accorde d’abord.'),
        L('Tag 1–2: Am greifen, Saiten einzeln zupfen (ohne tiefe E).', 'Days 1–2: play Am, pluck the strings one by one (not the low E).', 'Jours 1–2 : pose Am, pince les cordes une à une (sans E grave).'),
        L('Tag 3: E – Am – E – Am: die Form wandert eine Saite.', 'Day 3: E – Am – E – Am: the shape moves one string.', 'Jour 3 : E – Am – E – Am : la forme se décale d’une corde.'),
        L('Tag 4–5: dein Stück viermal Em, viermal Am mit dem Metronom.', 'Days 4–5: your piece, four times Em, four times Am, with the metronome.', 'Jours 4–5 : ton morceau, quatre fois Em, quatre fois Am, avec le métronome.'),
        L('Spaß: Akkord-Spiel Em und Am – schlag deinen Rekord vom Vortag!', 'Fun: chord game Em and Am – beat yesterday’s record!', 'Pour le plaisir : jeu Em et Am – bats ton record de la veille !'),
      ],
      done: [
        L('bei Am fünf Saiten klar klingen', 'five strings ring clearly when you play Am', 'cinq cordes sonnent clair quand tu joues Am'),
        L('du Em – Am im langsamen Takt ohne Pause wechselst', 'you switch Em – Am at a slow tempo without stopping', 'tu passes de Em à Am lentement sans t’arrêter'),
      ],
      trouble: [
        L(
          'Die hohe e-Saite klingt nicht? Der Zeigefinger auf der B-Saite liegt zu flach und berührt sie. Mehr Bogen in die Finger!',
          'The high e string doesn’t ring? The index finger on the B string is too flat and touches it. Put more curve in your fingers!',
          'La corde e aiguë ne sonne pas ? L’index sur la corde B est trop à plat et la touche. Arrondis davantage les doigts !',
        ),
        L(
          'Der Wechsel dauert zu lange? Übe nur den Weg: Finger setzen, lösen, setzen – ohne anzuschlagen. Fünfmal, dann erst mit Musik.',
          'The change takes too long? Practise just the movement: place, release, place – without strumming. Five times, then with music.',
          'Le changement est trop lent ? Entraîne juste le geste : poser, lâcher, poser – sans gratter. Cinq fois, puis avec la musique.',
        ),
      ],
      teacher: [
        L(
          'Einstieg: Vom E zum Am „umziehen“ – alle greifen E, auf „Umzug!“ rücken alle die Form eine Saite weiter.',
          'Warm-up: “moving house” from E to Am – everyone plays E, and on “Move!” everyone shifts the shape one string over.',
          'Mise en route : « déménager » de E à Am – tous posent E, et au signal « On déménage ! » ils décalent la forme d’une corde.',
        ),
        L(
          'Übung: Em – Am im Kreis, die Lehrkraft zählt laut „1, 2, 3, wechseln“. Erst langsam, dann etwas schneller.',
          'Practice: Em – Am round and round, the teacher counts aloud “1, 2, 3, change”. Slowly first, then a little faster.',
          'Exercice : Em – Am en boucle, l’enseignant compte « 1, 2, 3, on change ». Lentement d’abord, puis un peu plus vite.',
        ),
        L(
          'Gemeinsam: Das Stück mit Metronom spielen; eine kleine Gruppe summt dazu eine erfundene Melodie.',
          'Together: play the piece with the metronome; a small group hums an invented melody over it.',
          'Ensemble : jouer le morceau avec le métronome ; un petit groupe fredonne une mélodie inventée par-dessus.',
        ),
      ],
      sheet: [
        L('E-Form eine Saite Richtung Boden schieben: **Am**.', 'Move the E shape one string towards the floor: **Am**.', 'Décale la forme de E d’une corde vers le sol : **Am**.'),
        L('Tiefe E-Saite bei Am nicht anschlagen.', 'Don’t play the low E string with Am.', 'Ne joue pas la corde E grave avec Am.'),
        L('Vor dem Wechsel schon zum neuen Griff schauen.', 'Look at the next chord before you change.', 'Regarde l’accord suivant avant de changer.'),
      ],
      wissen: ['akkordwechsel-schneller', 'gitarre-erste-akkorde'],
    },
    // ---------- 6 ----------
    {
      n: 6,
      title: L('A-Dur und E7: das erste Lied', 'A and E7: your first song', 'A et E7 : ta première chanson'),
      goal: L(
        'Du spielst A und E7 und begleitest dein erstes Lied mit zwei Akkorden.',
        'You play A and E7 and accompany your first song with two chords.',
        'Tu joues A et E7 et tu accompagnes ta première chanson à deux accords.',
      ),
      chords: ['A', 'E7'],
      review: L(
        'Letzte Woche: Am. Spiel einmal viermal Em, viermal Am – und dann E, damit die Finger warm sind.',
        'Last week: Am. Play four times Em, four times Am once – then E, to warm up your fingers.',
        'La semaine dernière : Am. Joue quatre fois Em, quatre fois Am – puis E, pour échauffer les doigts.',
      ),
      steps: [
        L(
          '[A](chord:A): Zeige-, Mittel- und Ringfinger nebeneinander im 2. Bund auf D-, G- und B-Saite. Tiefe E-Saite nicht anschlagen.',
          '[A](chord:A): index, middle and ring fingers side by side at the 2nd fret on the D, G and B strings. Don’t play the low E string.',
          '[A](chord:A) : index, majeur et annulaire côte à côte en case 2 sur les cordes D, G et B. Ne joue pas la corde E grave.',
        ),
        L(
          'Die drei Finger haben wenig Platz. Stell sie schräg hintereinander, dann passt es. Die hohe e-Saite muss frei klingen.',
          'The three fingers don’t have much room. Angle them slightly one behind the other and they’ll fit. The high e string must ring freely.',
          'Les trois doigts ont peu de place. Place-les en biais, l’un derrière l’autre, et ça passe. La corde e aiguë doit sonner librement.',
        ),
        L(
          '[E7](chord:E7) ist E-Dur ohne Ringfinger: Mittelfinger A-Saite 2. Bund, Zeigefinger G-Saite 1. Bund. Alle sechs Saiten klingen.',
          '[E7](chord:E7) is E major without the ring finger: middle finger A string 2nd fret, index finger G string 1st fret. All six strings ring.',
          '[E7](chord:E7), c’est E sans l’annulaire : majeur corde A case 2, index corde G case 1. Les six cordes sonnent.',
        ),
        L(
          'Wechsel A – E7 langsam üben. Dann [Hänschen klein](lied:haenschen-klein) in A: Die Begleitung wartet bei jedem Wechsel auf dich.',
          'Practise switching A – E7 slowly. Then [Hänschen klein](lied:haenschen-klein) in A: the backing waits for you at every change.',
          'Entraîne lentement A – E7. Puis [Hänschen klein](lied:haenschen-klein) en A : l’accompagnement t’attend à chaque changement.',
        ),
      ],
      piece: {
        text: L(
          'Dein erstes Lied: Hänschen klein in A – nur A und E7, Anschlag nur runter. Klappt es, dann Summ, summ, summ in A.',
          'Your first song: Hänschen klein in A – only A and E7, downstrokes only. When it works, try Summ, summ, summ in A.',
          'Ta première chanson : Hänschen klein en A – seulement A et E7, que vers le bas. Quand ça marche, Summ, summ, summ en A.',
        ),
        play: [{ song: 'haenschen-klein', key: 'A' }, { song: 'summ-summ', key: 'A' }, { tool: 'spiel', chords: ['E', 'A'] }],
      },
      homework: [
        L('Jeden Tag zuerst stimmen.', 'Tune first every day.', 'Chaque jour, accorde d’abord.'),
        L('Tag 1: A greifen – klingt die hohe e-Saite frei?', 'Day 1: play A – does the high e string ring freely?', 'Jour 1 : pose A – la corde e aiguë sonne-t-elle ?'),
        L('Tag 2–3: A – E7 – A – E7 langsam wechseln.', 'Days 2–3: switch A – E7 – A – E7 slowly.', 'Jours 2–3 : change lentement A – E7 – A – E7.'),
        L('Tag 4–5: Hänschen klein in A mitspielen.', 'Days 4–5: play along with Hänschen klein in A.', 'Jours 4–5 : joue Hänschen klein en A.'),
        L('Spaß: Akkord-Spiel „E und A“ – wie viele schaffst du?', 'Fun: chord game “E and A” – how many can you do?', 'Pour le plaisir : jeu « E et A » – combien en fais-tu ?'),
      ],
      done: [
        L('A und E7 klar klingen', 'A and E7 ring clearly', 'A et E7 sonnent clair'),
        L('du Hänschen klein einmal ganz mitspielst', 'you play Hänschen klein all the way through once', 'tu joues Hänschen klein une fois en entier'),
      ],
      trouble: [
        L(
          'Bei A klingt die hohe e-Saite nicht? Der Ringfinger berührt sie. Zieh ihn etwas zurück oder probier die Finger schräger.',
          'With A the high e string doesn’t ring? Your ring finger touches it. Pull it back a little or angle your fingers more.',
          'Avec A, la corde e aiguë ne sonne pas ? L’annulaire la touche. Recule-le un peu ou incline davantage les doigts.',
        ),
        L(
          'Das Lied ist zu schnell? „Wartet auf mich“ lässt dir bei jedem Wechsel Zeit. Lass dir Zeit, es zählt, dass es klingt.',
          'The song is too fast? “Waits for me” gives you time at every change. Take your time – what counts is that it sounds good.',
          'La chanson va trop vite ? « Attends-moi » te laisse le temps à chaque changement. Prends ton temps – l’important, c’est que ça sonne.',
        ),
      ],
      teacher: [
        L(
          'Einstieg: E und E7 im Vergleich – die Gruppe hört, dass E7 „weitergehen will“.',
          'Warm-up: compare E and E7 – the group hears that E7 “wants to move on”.',
          'Mise en route : comparer E et E7 – le groupe entend que E7 « veut continuer ».',
        ),
        L(
          'Übung: A – E7 im Kreis, je vier Schläge. Wer wechselt, ohne die Hand vom Hals zu nehmen?',
          'Practice: A – E7 round and round, four beats each. Who can switch without taking the hand off the neck?',
          'Exercice : A – E7 en boucle, quatre temps chacun. Qui change sans lâcher le manche ?',
        ),
        L(
          'Gemeinsam: Hänschen klein in A – erst singen, dann singen und spielen. Ein Kind zeigt die Wechsel an. Liegt eine Tonart zum Singen ungünstig, im Lied die Tonart ★ wählen oder mit Kapodaster spielen.',
          'Together: Hänschen klein in A – first sing, then sing and play. One child shows when to change. If a key is awkward for singing, choose the ★ key in the song or play with a capo.',
          'Ensemble : Hänschen klein en A – d’abord chanter, puis chanter et jouer. Un enfant indique les changements. Si une tonalité est peu pratique pour chanter, choisir la tonalité ★ dans la chanson ou jouer avec un capodastre.',
        ),
      ],
      sheet: [
        L('**A:** drei Finger im 2. Bund auf D-, G- und B-Saite.', '**A:** three fingers at fret 2 on the D, G and B strings.', '**A :** trois doigts en case 2 sur les cordes D, G et B.'),
        L('**E7:** wie E, nur ohne Ringfinger.', '**E7:** like E, just without the ring finger.', '**E7 :** comme E, mais sans l’annulaire.'),
        L('Hänschen klein in A: nur A und E7.', 'Hänschen klein in A: only A and E7.', 'Hänschen klein en A : seulement A et E7.'),
      ],
      wissen: ['gitarre-erste-akkorde', 'lieder-fuer-anfaenger'],
    },
    // ---------- 7 ----------
    {
      n: 7,
      title: L('Runter-rauf', 'Down-up', 'Bas-haut'),
      goal: L(
        'Du schlägst gleichmäßig runter und rauf und spielst damit Lieder mit A und E7.',
        'You strum evenly down and up and use it to play songs with A and E7.',
        'Tu grattes régulièrement vers le bas et vers le haut et tu joues des chansons avec A et E7.',
      ),
      review: L(
        'Letzte Woche: A und E7. Spiel zum Aufwärmen Hänschen klein in A.',
        'Last week: A and E7. Warm up with Hänschen klein in A.',
        'La semaine dernière : A et E7. Échauffe-toi avec Hänschen klein en A.',
      ),
      steps: [
        L(
          'Die Hand schwingt wie ein Pendel aus dem Handgelenk: runter auf den Zählzeiten 1, 2, 3, 4 – rauf auf jedem „und“ dazwischen.',
          'Your hand swings like a pendulum from the wrist: down on beats 1, 2, 3, 4 – up on every “and” in between.',
          'La main se balance comme un pendule depuis le poignet : vers le bas sur 1, 2, 3, 4 – vers le haut sur chaque « et » entre deux.',
        ),
        L(
          'Beim Raufschlag triffst du vor allem die dünnen Saiten. Das ist richtig so – er ist leiser und leichter als der Runterschlag.',
          'On the upstroke you mostly hit the thin strings. That’s just how it should be – it’s lighter and softer than the downstroke.',
          'Vers le haut, tu touches surtout les cordes fines. C’est normal – ce coup est plus léger et plus doux que vers le bas.',
        ),
        L(
          'Öffne den [Rhythmus](tool:rhythmus), wähl „Runter-rauf“ und Tempo langsam. Sprich mit: „1 und 2 und 3 und 4 und“. Mehr in [Schlagmuster lernen](wissen:schlagmuster-lernen).',
          'Open the [rhythm tool](tool:rhythmus), choose “Down-up” and a slow tempo. Say it out loud: “1 and 2 and 3 and 4 and”. More in [Strumming patterns](wissen:schlagmuster-lernen).',
          'Ouvre le [rythme](tool:rhythmus), choisis « Bas-haut » et un tempo lent. Dis à voix haute : « 1 et 2 et 3 et 4 et ». Plus d’infos : [Rythmiques](wissen:schlagmuster-lernen).',
        ),
        L(
          'Jetzt mit Akkorden: Erst nur A im Runter-rauf, dann ein Lied. Beim Wechsel darf der letzte Raufschlag ruhig leere Saiten treffen.',
          'Now with chords: first just A in down-up, then a song. During a change, the last upstroke may hit open strings – that’s fine.',
          'Maintenant avec des accords : d’abord A seul en bas-haut, puis une chanson. Au changement, le dernier coup vers le haut peut toucher des cordes à vide.',
        ),
      ],
      piece: {
        text: L(
          'Row, Row, Row Your Boat in A mit Runter-rauf – ganz gleichmäßig, wie ein Ruderboot. Danach Mary Had a Little Lamb in A.',
          'Row, Row, Row Your Boat in A with down-up – nice and even, like a rowing boat. Then Mary Had a Little Lamb in A.',
          'Row, Row, Row Your Boat en A avec bas-haut – bien régulier, comme une barque. Puis Mary Had a Little Lamb en A.',
        ),
        play: [{ tool: 'rhythmus', pattern: 'Runter-rauf' }, { song: 'row-row', key: 'A' }, { song: 'mary-lamb', key: 'A' }],
      },
      homework: [
        L('Jeden Tag zuerst stimmen.', 'Tune first every day.', 'Chaque jour, accorde d’abord.'),
        L('Tag 1–2: Runter-rauf mit dem Metronom, nur auf A.', 'Days 1–2: down-up with the metronome, just on A.', 'Jours 1–2 : bas-haut avec le métronome, seulement sur A.'),
        L('Tag 3: Runter-rauf mit A – E7 im Wechsel, je ein Takt.', 'Day 3: down-up switching A – E7, one bar each.', 'Jour 3 : bas-haut en alternant A – E7, une mesure chacun.'),
        L('Tag 4–5: Row, Row, Row Your Boat in A mitspielen.', 'Days 4–5: play along with Row, Row, Row Your Boat in A.', 'Jours 4–5 : joue Row, Row, Row Your Boat en A.'),
        L('Spaß: Spiel das Lied als Kanon mit jemandem, der singt!', 'Fun: play the song as a round with someone singing!', 'Pour le plaisir : joue la chanson en canon avec quelqu’un qui chante !'),
      ],
      done: [
        L('du Runter-rauf gleichmäßig zum Metronom spielst', 'you play down-up evenly with the metronome', 'tu joues bas-haut régulièrement avec le métronome'),
        L('du ein Lied mit Runter-rauf ohne Anhalten schaffst', 'you get through a song with down-up without stopping', 'tu joues une chanson en bas-haut sans t’arrêter'),
      ],
      trouble: [
        L(
          'Der Takt läuft dir davon? Die Hand schwingt immer weiter, auch beim Wechsel. Lieber einen Schlag leer lassen als anhalten.',
          'Losing the beat? Your hand keeps swinging, even during a change. Better to skip a strum than to stop.',
          'Tu perds le rythme ? La main continue de se balancer, même pendant le changement. Mieux vaut sauter un coup que s’arrêter.',
        ),
        L(
          'Es klingt hart und laut? Locker aus dem Handgelenk, nicht aus dem Arm. Halt das Plektrum oder den Finger ganz entspannt.',
          'It sounds harsh and loud? Loosen up – strum from the wrist, not the arm. Hold your pick or finger nice and relaxed.',
          'Ça sonne dur et fort ? Détends-toi – gratte depuis le poignet, pas avec le bras. Tiens le médiator ou le doigt bien souplement.',
        ),
      ],
      teacher: [
        L(
          'Einstieg: Ohne Gitarre „in der Luft“ runter-rauf schwingen und dazu „1 und 2 und …“ sprechen.',
          'Warm-up: swing down-up “in the air” without guitars, saying “1 and 2 and …”.',
          'Mise en route : sans guitare, balancer bas-haut « dans le vide » en disant « 1 et 2 et … ».',
        ),
        L(
          'Übung: Hälfte spielt nur Runterschläge, die andere nur Raufschläge – zusammen ergibt es Runter-rauf.',
          'Practice: half the group plays only downstrokes, the other half only upstrokes – together it makes down-up.',
          'Exercice : une moitié joue seulement vers le bas, l’autre seulement vers le haut – ensemble, cela donne bas-haut.',
        ),
        L(
          'Gemeinsam: Row, Row, Row Your Boat in A – erst gemeinsam, dann als Kanon in zwei Gruppen.',
          'Together: Row, Row, Row Your Boat in A – first all together, then as a round in two groups.',
          'Ensemble : Row, Row, Row Your Boat en A – d’abord tous ensemble, puis en canon à deux groupes.',
        ),
      ],
      sheet: [
        L('Runter auf 1, 2, 3, 4 – rauf auf jedem „und“.', 'Down on 1, 2, 3, 4 – up on every “and”.', 'Bas sur 1, 2, 3, 4 – haut sur chaque « et ».'),
        L('Die Hand schwingt locker aus dem Handgelenk weiter.', 'The hand keeps swinging loosely from the wrist.', 'La main continue de se balancer depuis le poignet.'),
        L('Raufschlag: leiser, vor allem die dünnen Saiten.', 'Upstroke: softer, mostly the thin strings.', 'Vers le haut : plus doux, surtout les cordes fines.'),
      ],
      wissen: ['schlagmuster-lernen', 'mit-metronom-ueben'],
    },
    // ---------- 8 ----------
    {
      n: 8,
      title: L('D-Dur und A7', 'D and A7', 'D et A7'),
      goal: L(
        'Du spielst D und A7 und begleitest Lieder in D.',
        'You play D and A7 and accompany songs in D.',
        'Tu joues D et A7 et tu accompagnes des chansons en D.',
      ),
      chords: ['D', 'A7'],
      review: L(
        'Letzte Woche: Runter-rauf. Spiel Row, Row, Row Your Boat in A mit Runter-rauf.',
        'Last week: down-up. Play Row, Row, Row Your Boat in A with down-up.',
        'La semaine dernière : bas-haut. Joue Row, Row, Row Your Boat en A en bas-haut.',
      ),
      steps: [
        L(
          '[D](chord:D) ist ein kleines Dreieck: Zeigefinger G-Saite 2. Bund, Ringfinger B-Saite 3. Bund, Mittelfinger hohe e-Saite 2. Bund.',
          '[D](chord:D) is a little triangle: index finger G string 2nd fret, ring finger B string 3rd fret, middle finger high e string 2nd fret.',
          '[D](chord:D) forme un petit triangle : index corde G case 2, annulaire corde B case 3, majeur corde e aiguë case 2.',
        ),
        L(
          'Bei D schlägst du nur die vier dünnen Saiten an, ab der D-Saite. Ziel mit dem Daumen auf die D-Saite.',
          'With D you strum only the four thin strings, starting from the D string. Aim your thumb at the D string.',
          'Avec D, tu grattes seulement les quatre cordes fines, à partir de la corde D. Vise la corde D avec le pouce.',
        ),
        L(
          '[A7](chord:A7) ist leicht: Mittelfinger D-Saite und Ringfinger B-Saite, beide im 2. Bund. Die G-Saite bleibt leer. Tiefe E-Saite nicht anschlagen.',
          '[A7](chord:A7) is easy: middle finger D string and ring finger B string, both at the 2nd fret. The G string stays open. Don’t play the low E string.',
          '[A7](chord:A7) est facile : majeur corde D et annulaire corde B, tous deux en case 2. La corde G reste à vide. Ne joue pas la corde E grave.',
        ),
        L(
          'Wechsel D – A7: Der Ringfinger rutscht auf der B-Saite vom 3. in den 2. Bund. Lass ihn dabei leicht auf der Saite liegen – das ist dein Gleitfinger.',
          'Switching D – A7: your ring finger slides on the B string from the 3rd to the 2nd fret. Keep it resting lightly on the string – it’s your guide finger.',
          'Changement D – A7 : l’annulaire glisse sur la corde B de la case 3 à la case 2. Laisse-le effleurer la corde – c’est ton doigt guide.',
        ),
        L(
          'Dann mitspielen: [Old MacDonald](lied:old-macdonald) in D – mit D und A7.',
          'Then play along: [Old MacDonald](lied:old-macdonald) in D – with D and A7.',
          'Puis joue : [Old MacDonald](lied:old-macdonald) en D – avec D et A7.',
        ),
      ],
      piece: {
        text: L(
          'Old MacDonald in D mit D und A7 – zuerst nur runter, dann Runter-rauf. Klappt es, folgt Yankee Doodle in D.',
          'Old MacDonald in D with D and A7 – first downstrokes only, then down-up. When it works, Yankee Doodle in D comes next.',
          'Old MacDonald en D avec D et A7 – d’abord que vers le bas, puis bas-haut. Quand ça marche, Yankee Doodle en D.',
        ),
        play: [{ song: 'old-macdonald', key: 'D' }, { song: 'yankee-doodle', key: 'D' }, { tool: 'spiel', chords: ['D', 'A'] }],
      },
      homework: [
        L('Jeden Tag zuerst stimmen.', 'Tune first every day.', 'Chaque jour, accorde d’abord.'),
        L('Tag 1: D greifen, nur vier Saiten anschlagen.', 'Day 1: play D, strum only four strings.', 'Jour 1 : pose D, gratte seulement quatre cordes.'),
        L('Tag 2–3: D – A7 mit Gleitfinger auf der B-Saite.', 'Days 2–3: D – A7 with your guide finger on the B string.', 'Jours 2–3 : D – A7 avec le doigt guide sur la corde B.'),
        L('Tag 4–5: Old MacDonald in D mitspielen.', 'Days 4–5: play along with Old MacDonald in D.', 'Jours 4–5 : joue Old MacDonald en D.'),
        L('Spaß: Mach bei „Ee-i-ee-i-o“ die Tiergeräusche!', 'Fun: do the animal noises at “E-I-E-I-O”!', 'Pour le plaisir : fais les cris d’animaux sur « Ee-i-ee-i-o » !'),
      ],
      done: [
        L('D mit vier klaren Saiten klingt', 'D rings clearly on four strings', 'D sonne clair sur quatre cordes'),
        L('du D – A7 im Takt wechselst', 'you switch D – A7 in time', 'tu passes de D à A7 en rythme'),
        L('du Old MacDonald einmal ganz schaffst', 'you get through Old MacDonald once', 'tu joues Old MacDonald une fois en entier'),
      ],
      trouble: [
        L(
          'Bei D klingt die hohe e-Saite nicht? Der Mittelfinger muss steil stehen. Dreh das Handgelenk etwas nach vorn.',
          'With D the high e string doesn’t ring? Your middle finger needs to stand up steeply. Turn your wrist slightly forwards.',
          'Avec D, la corde e aiguë ne sonne pas ? Le majeur doit être bien droit. Tourne un peu le poignet vers l’avant.',
        ),
        L(
          'Es brummt dumpf? Du triffst die tiefen Saiten mit. Starte den Anschlag erst bei der D-Saite.',
          'A muddy rumble? You’re hitting the low strings too. Start your strum at the D string.',
          'Ça gronde ? Tu touches aussi les cordes graves. Commence ton grattage à la corde D.',
        ),
      ],
      teacher: [
        L(
          'Einstieg: „Dreieck legen“ – alle greifen D, zeigen die Hand vor, die Lehrkraft prüft, ob die Finger ein Dreieck bilden.',
          'Warm-up: “build the triangle” – everyone plays D and shows their hand; the teacher checks that the fingers make a triangle.',
          'Mise en route : « fais le triangle » – tous posent D et montrent leur main ; l’enseignant vérifie le triangle.',
        ),
        L(
          'Übung: D – A7 im Kreis, die Lehrkraft ruft „gleiten“ beim Wechsel. Wer hält den Ringfinger auf der Saite?',
          'Practice: D – A7 round and round, the teacher calls “slide” at each change. Who keeps the ring finger on the string?',
          'Exercice : D – A7 en boucle, l’enseignant dit « glisse » au changement. Qui garde l’annulaire sur la corde ?',
        ),
        L(
          'Gemeinsam: Old MacDonald in D – Kinder wählen reihum ein Tier für die nächste Strophe.',
          'Together: Old MacDonald in D – children take turns choosing an animal for the next verse.',
          'Ensemble : Old MacDonald en D – chacun à son tour choisit un animal pour le couplet suivant.',
        ),
      ],
      sheet: [
        L('**D:** Dreieck auf G-, B- und e-Saite, nur vier Saiten anschlagen.', '**D:** triangle on the G, B and e strings, strum only four strings.', '**D :** triangle sur les cordes G, B et e, gratter seulement quatre cordes.'),
        L('**A7:** D- und B-Saite im 2. Bund, G-Saite leer.', '**A7:** D and B strings at fret 2, G string open.', '**A7 :** cordes D et B en case 2, corde G à vide.'),
        L('D → A7: Ringfinger gleitet auf der B-Saite.', 'D → A7: ring finger slides along the B string.', 'D → A7 : l’annulaire glisse sur la corde B.'),
      ],
      wissen: ['gitarre-akkorde', 'akkordwechsel-schneller'],
    },
    // ---------- 9 ----------
    {
      n: 9,
      title: L('Drei Akkorde: A, D und E7', 'Three chords: A, D and E7', 'Trois accords : A, D et E7'),
      goal: L(
        'Du begleitest Lieder mit drei Akkorden – A, D und E7.',
        'You accompany songs with three chords – A, D and E7.',
        'Tu accompagnes des chansons avec trois accords – A, D et E7.',
      ),
      review: L(
        'Letzte Woche: D und A7. Spiel zum Aufwärmen Old MacDonald in D.',
        'Last week: D and A7. Warm up with Old MacDonald in D.',
        'La semaine dernière : D et A7. Échauffe-toi avec Old MacDonald en D.',
      ),
      steps: [
        L(
          'Mit drei Akkorden kannst du hunderte Lieder spielen! In A sind das [A](chord:A), [D](chord:D) und [E7](chord:E7).',
          'With three chords you can play hundreds of songs! In A they are [A](chord:A), [D](chord:D) and [E7](chord:E7).',
          'Avec trois accords, tu peux jouer des centaines de chansons ! En La, ce sont [A](chord:A), [D](chord:D) et [E7](chord:E7).',
        ),
        L(
          'Übe die Wechsel einzeln: A – D, D – E7, E7 – A. Der schwierigste bekommt am meisten Zeit.',
          'Practise the changes one by one: A – D, D – E7, E7 – A. The hardest one gets the most time.',
          'Entraîne les changements un par un : A – D, D – E7, E7 – A. Le plus difficile reçoit le plus de temps.',
        ),
        L(
          'Trick für A – D: Der Zeigefinger rutscht im 2. Bund von der D- auf die G-Saite – er bleibt im selben Bund. Die anderen Finger springen um ihn herum.',
          'Trick for A – D: your index finger slides at the 2nd fret from the D string to the G string – it stays at the same fret. The other fingers jump around it.',
          'Astuce pour A – D : l’index glisse en case 2 de la corde D à la corde G – il reste dans la même case. Les autres doigts sautent autour.',
        ),
        L(
          'Dann: [Alle meine Entchen](lied:alle-meine-entchen) in A. Wer will, schaltet im Lied die Tabulatur ein und sieht die Melodie.',
          'Then: [Alle meine Entchen](lied:alle-meine-entchen) in A. If you like, switch on the tab in the song to see the melody.',
          'Ensuite : [Alle meine Entchen](lied:alle-meine-entchen) en A. Si tu veux, active la tablature pour voir la mélodie.',
        ),
      ],
      piece: {
        text: L(
          'Alle meine Entchen in A mit A, D und E7 – mit Runter-rauf. Dann Twinkle, Twinkle, Little Star in A. Zwei Lieder, drei Akkorde!',
          'Alle meine Entchen in A with A, D and E7 – with down-up. Then Twinkle, Twinkle, Little Star in A. Two songs, three chords!',
          'Alle meine Entchen en A avec A, D et E7 – en bas-haut. Puis Twinkle, Twinkle, Little Star en A. Deux chansons, trois accords !',
        ),
        play: [{ song: 'alle-meine-entchen', key: 'A' }, { song: 'twinkle', key: 'A' }, { tool: 'spiel', chords: ['A', 'D', 'E'] }],
      },
      homework: [
        L('Jeden Tag zuerst stimmen.', 'Tune first every day.', 'Chaque jour, accorde d’abord.'),
        L('Tag 1: A – D und D – E7 je zehnmal wechseln.', 'Day 1: switch A – D and D – E7 ten times each.', 'Jour 1 : change A – D et D – E7 dix fois chacun.'),
        L('Tag 2–3: Alle meine Entchen in A mitspielen.', 'Days 2–3: play along with Alle meine Entchen in A.', 'Jours 2–3 : joue Alle meine Entchen en A.'),
        L('Tag 4–5: Twinkle, Twinkle, Little Star in A.', 'Days 4–5: Twinkle, Twinkle, Little Star in A.', 'Jours 4–5 : Twinkle, Twinkle, Little Star en A.'),
        L('Spaß: Akkord-Spiel „A, D, E“ – notier deinen Rekord.', 'Fun: chord game “A, D, E” – write down your record.', 'Pour le plaisir : jeu « A, D, E » – note ton record.'),
      ],
      done: [
        L('du A, D und E7 nacheinander ohne Pause greifst', 'you play A, D and E7 one after the other without stopping', 'tu enchaînes A, D et E7 sans t’arrêter'),
        L('du ein Lied mit drei Akkorden ganz durchspielst', 'you play a three-chord song all the way through', 'tu joues une chanson à trois accords en entier'),
      ],
      trouble: [
        L(
          'Ein Wechsel hakt immer? Spiel nur diesen Wechsel eine Minute lang, ganz langsam. Danach geht das Lied leichter.',
          'One change always gets stuck? Play just that change for a minute, very slowly. Afterwards the song gets easier.',
          'Un changement bloque toujours ? Joue seulement celui-là pendant une minute, très lentement. Ensuite, la chanson ira mieux.',
        ),
        L(
          'Die Finger tun nach einer Weile weh? Pause machen, ausschütteln, weiter. Fünf Minuten zweimal sind besser als zehn auf einmal.',
          'Fingers sore after a while? Take a break, shake them out, carry on. Five minutes twice beats ten minutes at once.',
          'Les doigts font mal après un moment ? Fais une pause, secoue la main, continue. Deux fois cinq minutes valent mieux que dix d’un coup.',
        ),
      ],
      teacher: [
        L(
          'Einstieg: Akkord-Ansage – die Lehrkraft ruft A, D oder E7, alle greifen so schnell wie möglich und schlagen einmal an.',
          'Warm-up: chord call – the teacher calls A, D or E7, everyone grabs the chord as fast as they can and strums once.',
          'Mise en route : appel d’accords – l’enseignant annonce A, D ou E7, tout le monde pose l’accord au plus vite et gratte une fois.',
        ),
        L(
          'Übung: Drei Gruppen, jede übernimmt einen Akkord. Die Lehrkraft zeigt, welche Gruppe gerade spielt.',
          'Practice: three groups, each takes one chord. The teacher points to the group that plays.',
          'Exercice : trois groupes, chacun prend un accord. L’enseignant montre le groupe qui joue.',
        ),
        L(
          'Gemeinsam: Twinkle, Twinkle, Little Star in A – alle spielen, ein paar Kinder singen dazu.',
          'Together: Twinkle, Twinkle, Little Star in A – everyone plays, a few children sing.',
          'Ensemble : Twinkle, Twinkle, Little Star en A – tout le monde joue, quelques enfants chantent.',
        ),
      ],
      sheet: [
        L('In A: **A, D, E7** – damit klappen viele Lieder.', 'In A: **A, D, E7** – that opens up lots of songs.', 'En La : **A, D, E7** – de quoi jouer plein de chansons.'),
        L('Wechsel einzeln üben: A – D, D – E7, E7 – A.', 'Practise the changes on their own: A – D, D – E7, E7 – A.', 'Entraîne chaque changement : A – D, D – E7, E7 – A.'),
        L('A → D: Zeigefinger rutscht im 2. Bund von der D- auf die G-Saite.', 'A → D: index slides at fret 2 from the D to the G string.', 'A → D : l’index glisse en case 2 de la corde D à la corde G.'),
      ],
      wissen: ['lieder-fuer-anfaenger', 'akkordwechsel-schneller'],
    },
    // ---------- 10 ----------
    {
      n: 10,
      title: L('Der Insel-Schlag', 'The island strum', 'Le rythme des îles'),
      goal: L(
        'Du spielst das Schlagmuster runter, runter-rauf, rauf-runter-rauf und begleitest damit Lieder.',
        'You play the strum pattern down, down-up, up-down-up and use it to accompany songs.',
        'Tu joues la rythmique bas, bas-haut, haut-bas-haut et tu accompagnes des chansons avec.',
      ),
      review: L(
        'Letzte Woche: A, D und E7. Spiel Alle meine Entchen in A mit Runter-rauf.',
        'Last week: A, D and E7. Play Alle meine Entchen in A with down-up.',
        'La semaine dernière : A, D et E7. Joue Alle meine Entchen en A en bas-haut.',
      ),
      steps: [
        L(
          'Das Muster heißt: **runter, runter, rauf, rauf, runter, rauf**. Zwischen den beiden „rauf“ schwingt die Hand runter, ohne die Saiten zu treffen.',
          'The pattern goes: **down, down, up, up, down, up**. Between the two “ups” your hand swings down without touching the strings.',
          'La rythmique : **bas, bas, haut, haut, bas, haut**. Entre les deux « haut », la main redescend sans toucher les cordes.',
        ),
        L(
          'Gezählt: „1 – 2 und – und 4 und“. Auf der 3 ist die Lücke. Die Hand schwingt trotzdem gleichmäßig weiter.',
          'Counted: “1 – 2 and – and 4 and”. Beat 3 is the gap. Your hand keeps swinging evenly anyway.',
          'En comptant : « 1 – 2 et – et 4 et ». Le 3 est le trou. La main continue quand même de se balancer régulièrement.',
        ),
        L(
          'Im [Rhythmus](tool:rhythmus) das Muster „Runter, runter, rauf, rauf, runter, rauf“ wählen und langsam mitspielen, zuerst nur auf A.',
          'In the [rhythm tool](tool:rhythmus) choose “Down, down, up, up, down, up” and play along slowly, first just on A.',
          'Dans le [rythme](tool:rhythmus), choisis « Bas, bas, haut, haut, bas, haut » et joue lentement, d’abord seulement sur A.',
        ),
        L(
          'Das Metronom ist dein bester Freund: Lieber langsam und gleichmäßig als schnell und wackelig. Mehr in [Mit Metronom üben](wissen:mit-metronom-ueben).',
          'The metronome is your best friend: slow and steady beats fast and wobbly. More in [Practising with a metronome](wissen:mit-metronom-ueben).',
          'Le métronome est ton meilleur ami : mieux vaut lent et régulier que rapide et bancal. Plus d’infos : [Jouer avec un métronome](wissen:mit-metronom-ueben).',
        ),
      ],
      piece: {
        text: L(
          'Michael, Row the Boat Ashore in A mit dem Insel-Schlag – A, D und E7. Wenn es rollt: Swing Low, Sweet Chariot in A.',
          'Michael, Row the Boat Ashore in A with the island strum – A, D and E7. Once it flows: Swing Low, Sweet Chariot in A.',
          'Michael, Row the Boat Ashore en A avec le rythme des îles – A, D et E7. Quand ça roule : Swing Low, Sweet Chariot en A.',
        ),
        play: [{ tool: 'rhythmus', pattern: 'Runter, runter, rauf, rauf, runter, rauf' }, { song: 'michael-row', key: 'A' }, { song: 'swing-low', key: 'A' }],
      },
      homework: [
        L('Jeden Tag zuerst stimmen.', 'Tune first every day.', 'Chaque jour, accorde d’abord.'),
        L('Tag 1–2: Muster ohne Akkord, Saiten leicht abdämpfen.', 'Days 1–2: the pattern without a chord, strings lightly muted.', 'Jours 1–2 : la rythmique sans accord, cordes légèrement étouffées.'),
        L('Tag 3: Muster auf A, dann auf D, mit dem Metronom.', 'Day 3: the pattern on A, then on D, with the metronome.', 'Jour 3 : la rythmique sur A, puis sur D, avec le métronome.'),
        L('Tag 4–5: Michael, Row the Boat Ashore in A.', 'Days 4–5: Michael, Row the Boat Ashore in A.', 'Jours 4–5 : Michael, Row the Boat Ashore en A.'),
        L('Spaß: Sprich das Muster als Quatschwort-Reim mit!', 'Fun: say the pattern as a silly rhyme while you play!', 'Pour le plaisir : dis la rythmique comme une comptine rigolote !'),
      ],
      done: [
        L('du das Muster viermal hintereinander gleichmäßig spielst', 'you play the pattern four times in a row evenly', 'tu joues la rythmique quatre fois de suite régulièrement'),
        L('du ein Lied damit begleitest', 'you accompany a song with it', 'tu accompagnes une chanson avec'),
      ],
      trouble: [
        L(
          'Du verlierst dich nach der Lücke? Sprich laut mit: „runter, runter-rauf, – rauf-runter-rauf“. Die Hand schwingt in der Lücke einfach durch.',
          'Getting lost after the gap? Say it out loud: “down, down-up, – up-down-up”. In the gap your hand just swings through.',
          'Tu te perds après le trou ? Dis-le à voix haute : « bas, bas-haut, – haut-bas-haut ». Dans le trou, la main passe simplement.',
        ),
        L(
          'Mit Akkordwechsel zu schwer? Spiel im Lied erst nur runter und nimm das Muster nur dort, wo der Akkord lange bleibt.',
          'Too hard with chord changes? In the song, play only downstrokes first and use the pattern only where a chord lasts a long time.',
          'Trop dur avec les changements ? Dans la chanson, joue d’abord seulement vers le bas et garde la rythmique là où l’accord dure.',
        ),
      ],
      teacher: [
        L(
          'Einstieg: Das Muster klatschen und auf die Knie patschen – Runter = Knie, Rauf = Klatschen.',
          'Warm-up: clap and pat the pattern – down = pat your knees, up = clap.',
          'Mise en route : frapper la rythmique – bas = taper sur les genoux, haut = taper dans les mains.',
        ),
        L(
          'Übung: Alle spielen das Muster auf gedämpften Saiten, die Lehrkraft gibt mit dem Metronom das Tempo vor.',
          'Practice: everyone plays the pattern on muted strings while the teacher sets the tempo with the metronome.',
          'Exercice : tout le monde joue la rythmique sur cordes étouffées, l’enseignant donne le tempo au métronome.',
        ),
        L(
          'Gemeinsam: Michael, Row the Boat Ashore – eine Gruppe spielt das Muster, eine nur Runterschläge, alle singen den Refrain.',
          'Together: Michael, Row the Boat Ashore – one group plays the pattern, one only downstrokes, everyone sings the chorus.',
          'Ensemble : Michael, Row the Boat Ashore – un groupe joue la rythmique, un autre que vers le bas, tout le monde chante le refrain.',
        ),
      ],
      sheet: [
        L('**runter, runter, rauf, rauf, runter, rauf**', '**down, down, up, up, down, up**', '**bas, bas, haut, haut, bas, haut**'),
        L('Zählen: „1 – 2 und – und 4 und“ – die 3 ist die Lücke.', 'Count: “1 – 2 and – and 4 and” – beat 3 is the gap.', 'Compter : « 1 – 2 et – et 4 et » – le 3 est le trou.'),
        L('Die Hand schwingt immer weiter, auch in der Lücke.', 'The hand keeps swinging, even through the gap.', 'La main continue, même dans le trou.'),
      ],
      wissen: ['mit-metronom-ueben', 'schlagmuster-lernen'],
    },
    // ---------- 11 ----------
    {
      n: 11,
      title: L('Em und D: ein Seemannslied', 'Em and D: a sea shanty', 'Em et D : un chant de marins'),
      goal: L(
        'Du begleitest ein Moll-Lied mit Em und D und spürst, wie Moll klingt.',
        'You accompany a minor song with Em and D and feel how minor sounds.',
        'Tu accompagnes une chanson en mineur avec Em et D et tu sens comment sonne le mineur.',
      ),
      review: L(
        'Letzte Woche: der Insel-Schlag. Spiel Michael, Row the Boat Ashore damit.',
        'Last week: the island strum. Play Michael, Row the Boat Ashore with it.',
        'La semaine dernière : le rythme des îles. Joue Michael, Row the Boat Ashore avec.',
      ),
      steps: [
        L(
          'Erinner dich an [Em](chord:Em) aus Lektion 1 und [D](chord:D) aus Lektion 8. Heute kommen sie zusammen.',
          'Remember [Em](chord:Em) from lesson 1 and [D](chord:D) from lesson 8. Today they come together.',
          'Souviens-toi de [Em](chord:Em) (leçon 1) et de [D](chord:D) (leçon 8). Aujourd’hui, ils se rencontrent.',
        ),
        L(
          'Wechsel Em – D: Alle Finger heben sich ab. Schau beim Wechsel auf die G-Saite – dort landet der Zeigefinger von D zuerst.',
          'Switching Em – D: all fingers lift off. Look at the G string as you change – that’s where the index finger of D lands first.',
          'Changement Em – D : tous les doigts se lèvent. Regarde la corde G en changeant – c’est là que l’index de D se pose en premier.',
        ),
        L(
          'Bei Em schlägst du alle sechs Saiten, bei D nur vier. Die Hand trifft einfach etwas weiter unten.',
          'With Em you strum all six strings, with D only four. Your hand just starts a bit lower down.',
          'Avec Em, tu grattes les six cordes, avec D seulement quatre. La main commence simplement un peu plus bas.',
        ),
        L(
          '[What Shall We Do with the Drunken Sailor](lied:drunken-sailor) in Em ist ein altes Seemannslied. Kräftig und gleichmäßig spielen – wie Matrosen beim Seilziehen.',
          '[What Shall We Do with the Drunken Sailor](lied:drunken-sailor) in Em is an old sea shanty. Play it strong and steady – like sailors hauling a rope.',
          '[What Shall We Do with the Drunken Sailor](lied:drunken-sailor) en Em est un vieux chant de marins. Joue fort et régulier – comme des marins qui tirent une corde.',
        ),
      ],
      piece: {
        text: L(
          'Drunken Sailor in Em – nur Em und D, kräftig mit Runter-rauf. Beim Refrain „Way hay and up she rises“ darfst du laut werden!',
          'Drunken Sailor in Em – only Em and D, strong with down-up. In the chorus “Way hay and up she rises” you can play loud!',
          'Drunken Sailor en Em – seulement Em et D, fort en bas-haut. Au refrain « Way hay and up she rises », tu peux jouer fort !',
        ),
        play: [{ song: 'drunken-sailor', key: 'Em' }],
      },
      homework: [
        L('Jeden Tag zuerst stimmen.', 'Tune first every day.', 'Chaque jour, accorde d’abord.'),
        L('Tag 1–2: Em – D zehnmal wechseln, langsam.', 'Days 1–2: switch Em – D ten times, slowly.', 'Jours 1–2 : change Em – D dix fois, lentement.'),
        L('Tag 3–4: Drunken Sailor in Em mitspielen.', 'Days 3–4: play along with Drunken Sailor in Em.', 'Jours 3–4 : joue Drunken Sailor en Em.'),
        L('Tag 5: das Lied mit Runter-rauf, ein bisschen schneller.', 'Day 5: the song with down-up, a little faster.', 'Jour 5 : la chanson en bas-haut, un peu plus vite.'),
        L('Spaß: Stampf beim Spielen im Takt mit dem Fuß!', 'Fun: stamp your foot to the beat while you play!', 'Pour le plaisir : tape du pied en rythme en jouant !'),
      ],
      done: [
        L('du Em – D im Takt wechselst', 'you switch Em – D in time', 'tu passes de Em à D en rythme'),
        L('du Drunken Sailor einmal ganz durchspielst', 'you play Drunken Sailor all the way through once', 'tu joues Drunken Sailor une fois en entier'),
      ],
      trouble: [
        L(
          'D kommt zu spät? Heb die Finger von Em schon auf dem letzten Schlag ab – ein kurzer leerer Schlag ist erlaubt.',
          'D comes too late? Lift your Em fingers on the last beat already – a quick open strum is allowed.',
          'Le D arrive trop tard ? Lève les doigts de Em dès le dernier temps – un petit coup à vide est permis.',
        ),
        L(
          'Es klingt matschig? Bei D die tiefen Saiten auslassen und den Anschlag kürzer machen.',
          'It sounds muddy? Leave out the low strings on D and make your strum shorter.',
          'Ça sonne brouillon ? Évite les cordes graves sur D et raccourcis ton grattage.',
        ),
      ],
      teacher: [
        L(
          'Einstieg: Kurz erzählen, was ein Shanty ist: Matrosen sangen im Takt, um gemeinsam zu ziehen.',
          'Warm-up: briefly explain what a shanty is: sailors sang in rhythm so they could pull together.',
          'Mise en route : expliquer ce qu’est un chant de marins : les marins chantaient en rythme pour tirer ensemble.',
        ),
        L(
          'Übung: Em – D im Kreis mit Stampfen auf der 1 – wer wechselt pünktlich?',
          'Practice: Em – D round and round, stamping on beat 1 – who changes on time?',
          'Exercice : Em – D en boucle en tapant du pied sur le 1 – qui change à temps ?',
        ),
        L(
          'Gemeinsam: Drunken Sailor – Gruppe A spielt die Strophe, Gruppe B den Refrain, alle singen „Way hay“.',
          'Together: Drunken Sailor – group A plays the verse, group B the chorus, everyone sings “Way hay”.',
          'Ensemble : Drunken Sailor – le groupe A joue le couplet, le groupe B le refrain, tout le monde chante « Way hay ».',
        ),
      ],
      sheet: [
        L('**Em:** alle sechs Saiten. **D:** nur vier Saiten.', '**Em:** all six strings. **D:** only four strings.', '**Em :** les six cordes. **D :** seulement quatre.'),
        L('Beim Wechsel zuerst den Zeigefinger von D auf die G-Saite.', 'When changing, put D’s index finger on the G string first.', 'Au changement, pose d’abord l’index de D sur la corde G.'),
        L('Kräftig und gleichmäßig spielen, wie beim Seilziehen.', 'Play strong and steady, like hauling a rope.', 'Joue fort et régulier, comme en tirant une corde.'),
      ],
      wissen: ['dur-und-moll', 'akkordwechsel-schneller'],
    },
    // ---------- 12 ----------
    {
      n: 12,
      title: L('G-Dur und D7', 'G and D7', 'G et D7'),
      goal: L(
        'Du spielst G und D7 und begleitest Lieder in G.',
        'You play G and D7 and accompany songs in G.',
        'Tu joues G et D7 et tu accompagnes des chansons en G.',
      ),
      chords: ['G', 'D7'],
      review: L(
        'Letzte Woche: Em und D. Spiel Drunken Sailor zum Aufwärmen.',
        'Last week: Em and D. Warm up with Drunken Sailor.',
        'La semaine dernière : Em et D. Échauffe-toi avec Drunken Sailor.',
      ),
      steps: [
        L(
          '[G](chord:G): Mittelfinger tiefe E-Saite 3. Bund, Zeigefinger A-Saite 2. Bund, Ringfinger hohe e-Saite 3. Bund. Alle sechs Saiten klingen.',
          '[G](chord:G): middle finger low E string 3rd fret, index finger A string 2nd fret, ring finger high e string 3rd fret. All six strings ring.',
          '[G](chord:G) : majeur corde E grave case 3, index corde A case 2, annulaire corde e aiguë case 3. Les six cordes sonnent.',
        ),
        L(
          'Die Hand muss weit sein: von der dicksten bis zur dünnsten Saite. Der Daumen rutscht hinten am Hals etwas nach unten, dann klappt es.',
          'Your hand has to stretch wide: from the thickest to the thinnest string. Let your thumb slide a little lower on the back of the neck and it works.',
          'La main doit s’ouvrir grand : de la plus grosse à la plus fine corde. Fais glisser le pouce un peu plus bas derrière le manche, et ça passe.',
        ),
        L(
          '[D7](chord:D7): Mittelfinger G-Saite 2. Bund, Zeigefinger B-Saite 1. Bund, Ringfinger hohe e-Saite 2. Bund. Nur vier Saiten anschlagen, ab der D-Saite.',
          '[D7](chord:D7): middle finger G string 2nd fret, index finger B string 1st fret, ring finger high e string 2nd fret. Strum only four strings, from the D string.',
          '[D7](chord:D7) : majeur corde G case 2, index corde B case 1, annulaire corde e aiguë case 2. Gratte seulement quatre cordes, à partir de la corde D.',
        ),
        L(
          'Dann mitspielen: [Hänschen klein](lied:haenschen-klein) in G – dasselbe Lied wie in Lektion 6, nur mit neuen Griffen.',
          'Then play along: [Hänschen klein](lied:haenschen-klein) in G – the same song as in lesson 6, just with new chords.',
          'Puis joue : [Hänschen klein](lied:haenschen-klein) en G – la même chanson qu’en leçon 6, avec de nouveaux accords.',
        ),
      ],
      piece: {
        text: L(
          'Hänschen klein in G mit G und D7. Kennst du schon – klingt jetzt tiefer und voller! Danach das Abendlied Kein schöner Land in G, ruhig und langsam.',
          'Hänschen klein in G with G and D7. You already know it – now it sounds lower and fuller! Then the evening song Kein schöner Land in G, calm and slow.',
          'Hänschen klein en G avec G et D7. Tu la connais – elle sonne maintenant plus grave et plus pleine ! Puis Kein schöner Land en G, calme et lent.',
        ),
        play: [{ song: 'haenschen-klein', key: 'G' }, { song: 'kein-schoener-land', key: 'G' }],
      },
      homework: [
        L('Jeden Tag zuerst stimmen.', 'Tune first every day.', 'Chaque jour, accorde d’abord.'),
        L('Tag 1: G greifen, Saiten einzeln zupfen – klingen alle?', 'Day 1: play G, pluck the strings one by one – do they all ring?', 'Jour 1 : pose G, pince les cordes une à une – sonnent-elles toutes ?'),
        L('Tag 2–3: G – D7 zehnmal langsam wechseln.', 'Days 2–3: switch G – D7 ten times slowly.', 'Jours 2–3 : change G – D7 dix fois lentement.'),
        L('Tag 4–5: Hänschen klein in G, dann Kein schöner Land.', 'Days 4–5: Hänschen klein in G, then Kein schöner Land.', 'Jours 4–5 : Hänschen klein en G, puis Kein schöner Land.'),
        L('Spaß: Spiel Hänschen klein in A und in G – was klingt dir besser?', 'Fun: play Hänschen klein in A and in G – which do you like better?', 'Pour le plaisir : joue Hänschen klein en A et en G – lequel préfères-tu ?'),
      ],
      done: [
        L('G mit allen sechs Saiten klingt', 'G rings on all six strings', 'G sonne sur les six cordes'),
        L('du G – D7 im Takt wechselst', 'you switch G – D7 in time', 'tu passes de G à D7 en rythme'),
      ],
      trouble: [
        L(
          'Bei G klingt die A-Saite dumpf? Der Mittelfinger auf der tiefen E-Saite liegt zu flach und berührt sie. Mehr Bogen!',
          'With G the A string sounds muffled? The middle finger on the low E string is too flat and touches it. More curve!',
          'Avec G, la corde A sonne étouffée ? Le majeur sur la corde E grave est trop à plat et la touche. Plus d’arrondi !',
        ),
        L(
          'Die Hand ist zu klein für G? Probier erst nur die drei Finger ohne Anschlag zu setzen. Jeden Tag ein bisschen – die Hand wird beweglicher.',
          'Hand too small for G? First just place the three fingers without strumming. A little every day – your hand will become more flexible.',
          'La main est trop petite pour G ? Pose d’abord les trois doigts sans gratter. Un peu chaque jour – ta main deviendra plus souple.',
        ),
      ],
      teacher: [
        L(
          'Einstieg: Hänschen klein in A (Lektion 6) und in G vorspielen – die Gruppe hört: gleiches Lied, andere Tonart.',
          'Warm-up: play Hänschen klein in A (lesson 6) and in G – the group hears: same song, different key.',
          'Mise en route : jouer Hänschen klein en A (leçon 6) puis en G – le groupe entend : même chanson, autre tonalité.',
        ),
        L(
          'Übung: G – D7 im Kreis, je zwei Takte. Kinder helfen sich gegenseitig, die G-Finger richtig zu setzen.',
          'Practice: G – D7 round and round, two bars each. Children help each other place the G fingers correctly.',
          'Exercice : G – D7 en boucle, deux mesures chacun. Les enfants s’aident à bien placer les doigts de G.',
        ),
        L(
          'Gemeinsam: Kein schöner Land in G – langsam und leise, als Abschluss der Stunde.',
          'Together: Kein schöner Land in G – slow and soft, to end the lesson.',
          'Ensemble : Kein schöner Land en G – lent et doux, pour finir le cours.',
        ),
      ],
      sheet: [
        L('**G:** tiefe E-Saite 3, A-Saite 2, hohe e-Saite 3 – alle sechs Saiten.', '**G:** low E string 3, A string 2, high e string 3 – all six strings.', '**G :** corde E grave 3, corde A 2, corde e aiguë 3 – les six cordes.'),
        L('**D7:** G-Saite 2, B-Saite 1, e-Saite 2 – nur vier Saiten.', '**D7:** G string 2, B string 1, e string 2 – only four strings.', '**D7 :** corde G 2, corde B 1, corde e 2 – seulement quatre cordes.'),
        L('Daumen hinten etwas tiefer, damit die Hand weit wird.', 'Thumb a little lower on the back so the hand opens wide.', 'Pouce un peu plus bas derrière pour ouvrir la main.'),
      ],
      wissen: ['gitarre-akkorde', 'saubere-griffe'],
    },
    // ---------- 13 ----------
    {
      n: 13,
      title: L('C-Dur', 'C major', 'Do majeur (C)'),
      goal: L(
        'Du spielst C und begleitest Lieder in G mit G, C und D7.',
        'You play C and accompany songs in G with G, C and D7.',
        'Tu joues C et tu accompagnes des chansons en G avec G, C et D7.',
      ),
      chords: ['C'],
      review: L(
        'Letzte Woche: G und D7. Spiel Hänschen klein in G zum Aufwärmen.',
        'Last week: G and D7. Warm up with Hänschen klein in G.',
        'La semaine dernière : G et D7. Échauffe-toi avec Hänschen klein en G.',
      ),
      steps: [
        L(
          '[C](chord:C) ist eine kleine Treppe: Ringfinger A-Saite 3. Bund, Mittelfinger D-Saite 2. Bund, Zeigefinger B-Saite 1. Bund.',
          '[C](chord:C) is a little staircase: ring finger A string 3rd fret, middle finger D string 2nd fret, index finger B string 1st fret.',
          '[C](chord:C) est un petit escalier : annulaire corde A case 3, majeur corde D case 2, index corde B case 1.',
        ),
        L(
          'Die G-Saite und die hohe e-Saite bleiben leer und müssen frei klingen. Die tiefe E-Saite schlägst du nicht an.',
          'The G string and the high e string stay open and must ring freely. Don’t play the low E string.',
          'La corde G et la corde e aiguë restent à vide et doivent sonner librement. Ne joue pas la corde E grave.',
        ),
        L(
          'Wechsel G – C: Der Ringfinger wandert von der hohen e-Saite zur A-Saite. Übe den Weg langsam, ohne Anschlag.',
          'Switching G – C: the ring finger travels from the high e string to the A string. Practise the move slowly, without strumming.',
          'Changement G – C : l’annulaire passe de la corde e aiguë à la corde A. Entraîne le geste lentement, sans gratter.',
        ),
        L(
          'Mit G, C und D7 hast du die drei wichtigsten Akkorde in G. [Alle meine Entchen](lied:alle-meine-entchen) in G passt genau dazu.',
          'With G, C and D7 you have the three most important chords in G. [Alle meine Entchen](lied:alle-meine-entchen) in G fits perfectly.',
          'Avec G, C et D7, tu as les trois accords les plus importants en G. [Alle meine Entchen](lied:alle-meine-entchen) en G va parfaitement.',
        ),
      ],
      piece: {
        text: L(
          'Alle meine Entchen in G mit G, C und D7. Dann Jingle Bells in G mit Runter-rauf – fröhlich und schwungvoll!',
          'Alle meine Entchen in G with G, C and D7. Then Jingle Bells in G with down-up – bright and bouncy!',
          'Alle meine Entchen en G avec G, C et D7. Puis Jingle Bells en G en bas-haut – joyeux et entraînant !',
        ),
        play: [{ song: 'alle-meine-entchen', key: 'G' }, { song: 'jingle-bells', key: 'G' }, { tool: 'spiel', chords: ['G', 'C'] }],
      },
      homework: [
        L('Jeden Tag zuerst stimmen.', 'Tune first every day.', 'Chaque jour, accorde d’abord.'),
        L('Tag 1: C greifen – klingen G- und e-Saite frei?', 'Day 1: play C – do the G and e strings ring freely?', 'Jour 1 : pose C – les cordes G et e sonnent-elles ?'),
        L('Tag 2–3: G – C zehnmal wechseln, dann Akkord-Spiel „G und C“.', 'Days 2–3: switch G – C ten times, then chord game “G and C”.', 'Jours 2–3 : change G – C dix fois, puis jeu « G et C ».'),
        L('Tag 4–5: Alle meine Entchen und Jingle Bells in G.', 'Days 4–5: Alle meine Entchen and Jingle Bells in G.', 'Jours 4–5 : Alle meine Entchen et Jingle Bells en G.'),
        L('Spaß: Spiel Jingle Bells jemandem vor – egal, welche Jahreszeit!', 'Fun: play Jingle Bells for someone – whatever the season!', 'Pour le plaisir : joue Jingle Bells à quelqu’un – peu importe la saison !'),
      ],
      done: [
        L('bei C fünf Saiten klar klingen', 'five strings ring clearly when you play C', 'cinq cordes sonnent clair avec C'),
        L('du G, C und D7 in einem Lied wechselst', 'you switch G, C and D7 within a song', 'tu enchaînes G, C et D7 dans une chanson'),
      ],
      trouble: [
        L(
          'Die hohe e-Saite klingt bei C nicht? Der Zeigefinger liegt zu flach. Kuppe steil auf die B-Saite, damit darunter Platz bleibt.',
          'The high e string doesn’t ring with C? Your index finger is too flat. Put the tip steeply on the B string so there’s room underneath.',
          'La corde e aiguë ne sonne pas avec C ? L’index est trop à plat. Pose le bout bien droit sur la corde B pour laisser de la place.',
        ),
        L(
          'Die Strecke G – C ist zu weit? Setz zuerst den Ringfinger, die anderen folgen. Der Ringfinger führt.',
          'G – C feels like too big a stretch? Place the ring finger first, the others follow. The ring finger leads.',
          'G – C, c’est trop loin ? Pose d’abord l’annulaire, les autres suivent. C’est l’annulaire qui guide.',
        ),
      ],
      teacher: [
        L(
          'Einstieg: Die „Treppe“ von C zeigen – Finger steigen von der A- zur B-Saite eine Stufe pro Bund ab.',
          'Warm-up: show the C “staircase” – the fingers step down one fret at a time from the A to the B string.',
          'Mise en route : montrer l’« escalier » de C – les doigts descendent d’une case à chaque corde, de la corde A à la corde B.',
        ),
        L(
          'Übung: Akkord-Spiel „G und C“ über Lautsprecher – die ganze Gruppe zählt gemeinsam die Treffer.',
          'Practice: chord game “G and C” through a speaker – the whole group counts the hits together.',
          'Exercice : jeu « G et C » sur haut-parleur – tout le groupe compte les réussites ensemble.',
        ),
        L(
          'Gemeinsam: Jingle Bells in G – mit Glöckchen oder Klatschen auf „Jingle bells“.',
          'Together: Jingle Bells in G – with little bells or claps on “Jingle bells”.',
          'Ensemble : Jingle Bells en G – avec des clochettes ou des claquements de mains sur « Jingle bells ».',
        ),
      ],
      sheet: [
        L('**C:** Treppe – A-Saite 3, D-Saite 2, B-Saite 1.', '**C:** staircase – A string 3, D string 2, B string 1.', '**C :** escalier – corde A 3, corde D 2, corde B 1.'),
        L('G- und e-Saite leer, tiefe E-Saite nicht anschlagen.', 'G and e strings open, don’t play the low E string.', 'Cordes G et e à vide, pas de corde E grave.'),
        L('In G: **G, C, D7** – die drei Hauptakkorde.', 'In G: **G, C, D7** – the three main chords.', 'En Sol : **G, C, D7** – les trois accords principaux.'),
      ],
      wissen: ['gitarre-akkorde', 'akkordwechsel-schneller'],
    },
    // ---------- 14 ----------
    {
      n: 14,
      title: L('Walzer im Dreiertakt', 'Waltz in three', 'Valse à trois temps'),
      goal: L(
        'Du spielst im Dreiertakt und begleitest Walzerlieder in G.',
        'You play in three-four time and accompany waltz songs in G.',
        'Tu joues à trois temps et tu accompagnes des valses en G.',
      ),
      review: L(
        'Letzte Woche: C-Dur. Spiel Alle meine Entchen in G mit G, C und D7.',
        'Last week: C major. Play Alle meine Entchen in G with G, C and D7.',
        'La semaine dernière : C. Joue Alle meine Entchen en G avec G, C et D7.',
      ),
      steps: [
        L(
          'Ein Walzer hat drei Schläge pro Takt: **1** 2 3, **1** 2 3. Die Eins ist betont, 2 und 3 sind leichter.',
          'A waltz has three beats per bar: **1** 2 3, **1** 2 3. Beat one is strong, 2 and 3 are lighter.',
          'Une valse a trois temps par mesure : **1** 2 3, **1** 2 3. Le 1 est appuyé, le 2 et le 3 plus légers.',
        ),
        L(
          'Im [Rhythmus](tool:rhythmus) wählst du „Walzer (3/4)“: runter, runter, runter. Spiel die Eins etwas kräftiger.',
          'In the [rhythm tool](tool:rhythmus) choose “Waltz (3/4)”: down, down, down. Play beat one a little stronger.',
          'Dans le [rythme](tool:rhythmus), choisis « Valse (3/4) » : bas, bas, bas. Joue le 1 un peu plus fort.',
        ),
        L(
          'Für Fortgeschrittene: Auf der Eins nur die tiefste Saite des Akkords zupfen, auf 2 und 3 die hohen Saiten anschlagen – „Bum, tschick, tschick“.',
          'For a challenge: on beat one pluck only the lowest string of the chord, on 2 and 3 strum the high strings – “boom, chick, chick”.',
          'Pour aller plus loin : sur le 1, pince seulement la corde la plus grave de l’accord, sur 2 et 3 gratte les aiguës – « boum, tchic, tchic ».',
        ),
        L(
          'Mehr über Taktarten erfährst du in [Takt und Taktarten](wissen:takt-und-taktarten). Dann: [Die Gedanken sind frei](lied:gedanken-sind-frei) in G.',
          'Learn more about time signatures in [Time signatures](wissen:takt-und-taktarten). Then: [Die Gedanken sind frei](lied:gedanken-sind-frei) in G.',
          'Pour en savoir plus sur les mesures : [Mesures](wissen:takt-und-taktarten). Ensuite : [Die Gedanken sind frei](lied:gedanken-sind-frei) en G.',
        ),
      ],
      piece: {
        text: L(
          'Die Gedanken sind frei in G im Walzer: G, D7 und C, betont auf der Eins. Danach das lustige Mein Hut, der hat drei Ecken in G.',
          'Die Gedanken sind frei in G as a waltz: G, D7 and C, stressing beat one. Then the funny Mein Hut, der hat drei Ecken in G.',
          'Die Gedanken sind frei en G en valse : G, D7 et C, avec le 1 appuyé. Puis la drôle Mein Hut, der hat drei Ecken en G.',
        ),
        play: [{ tool: 'rhythmus', pattern: 'Walzer (3/4)' }, { song: 'gedanken-sind-frei', key: 'G' }, { song: 'mein-hut', key: 'G' }],
      },
      homework: [
        L('Jeden Tag zuerst stimmen.', 'Tune first every day.', 'Chaque jour, accorde d’abord.'),
        L('Tag 1–2: Walzer-Muster auf G mit dem Metronom, „1 2 3“ zählen.', 'Days 1–2: the waltz pattern on G with the metronome, counting “1 2 3”.', 'Jours 1–2 : la valse sur G avec le métronome, en comptant « 1 2 3 ».'),
        L('Tag 3–4: Die Gedanken sind frei in G.', 'Days 3–4: Die Gedanken sind frei in G.', 'Jours 3–4 : Die Gedanken sind frei en G.'),
        L('Tag 5: Mein Hut, der hat drei Ecken in G.', 'Day 5: Mein Hut, der hat drei Ecken in G.', 'Jour 5 : Mein Hut, der hat drei Ecken en G.'),
        L('Spaß: Lass jemanden zu deinem Walzer tanzen!', 'Fun: get someone to dance to your waltz!', 'Pour le plaisir : fais danser quelqu’un sur ta valse !'),
      ],
      done: [
        L('du den Dreiertakt hörst und mitzählen kannst', 'you can hear three-four time and count along', 'tu entends la mesure à trois temps et tu sais la compter'),
        L('du ein Walzerlied ohne Anhalten spielst', 'you play a waltz song without stopping', 'tu joues une valse sans t’arrêter'),
      ],
      trouble: [
        L(
          'Du rutschst immer in den Vierertakt? Zähl laut mit und betone die Eins deutlich, zum Beispiel mit einem Nicken.',
          'You keep slipping into four? Count out loud and mark beat one clearly – with a nod, for example.',
          'Tu repars toujours à quatre temps ? Compte à voix haute et marque bien le 1, par exemple d’un signe de tête.',
        ),
        L(
          'Der Wechsel kommt zu früh oder zu spät? Im Walzer ist ein Takt kürzer – der Wechsel kommt schon nach drei Schlägen.',
          'The change comes too early or too late? In a waltz a bar is shorter – the change comes after just three beats.',
          'Le changement arrive trop tôt ou trop tard ? En valse, une mesure est plus courte – on change déjà après trois temps.',
        ),
      ],
      teacher: [
        L(
          'Einstieg: Im Kreis schunkeln und „1 2 3“ zählen. Auf der Eins stampfen alle.',
          'Warm-up: sway in a circle and count “1 2 3”. Everyone stamps on beat one.',
          'Mise en route : se balancer en cercle en comptant « 1 2 3 ». Tout le monde tape du pied sur le 1.',
        ),
        L(
          'Übung: „Bum, tschick, tschick“ – Gruppe A spielt die Eins, Gruppe B die Zwei und Drei.',
          'Practice: “boom, chick, chick” – group A plays beat one, group B beats two and three.',
          'Exercice : « boum, tchic, tchic » – le groupe A joue le 1, le groupe B le 2 et le 3.',
        ),
        L(
          'Gemeinsam: Mein Hut, der hat drei Ecken – bei jeder Strophe ein Wort weglassen und durch eine Geste ersetzen.',
          'Together: Mein Hut, der hat drei Ecken – in each verse leave out one more word and replace it with a gesture.',
          'Ensemble : Mein Hut, der hat drei Ecken – à chaque couplet, remplacer un mot de plus par un geste.',
        ),
      ],
      sheet: [
        L('Walzer: **1** 2 3 – die Eins betonen.', 'Waltz: **1** 2 3 – stress beat one.', 'Valse : **1** 2 3 – appuyer le 1.'),
        L('Muster: runter, runter, runter.', 'Pattern: down, down, down.', 'Rythmique : bas, bas, bas.'),
        L('Bonus: „Bum, tschick, tschick“ – tiefe Saite, dann hohe.', 'Bonus: “boom, chick, chick” – low string, then high ones.', 'Bonus : « boum, tchic, tchic » – corde grave, puis aiguës.'),
      ],
      wissen: ['takt-und-taktarten', 'mit-metronom-ueben'],
    },
    // ---------- 15 ----------
    {
      n: 15,
      title: L('Vier Akkorde: G, Em, C, D7', 'Four chords: G, Em, C, D7', 'Quatre accords : G, Em, C, D7'),
      goal: L(
        'Du spielst vier Akkorde im Kreis – die Grundlage für unzählige Lieder.',
        'You play four chords in a loop – the basis of countless songs.',
        'Tu joues quatre accords en boucle – la base d’innombrables chansons.',
      ),
      review: L(
        'Letzte Woche: Walzer. Spiel Die Gedanken sind frei und betone die Eins.',
        'Last week: the waltz. Play Die Gedanken sind frei and stress beat one.',
        'La semaine dernière : la valse. Joue Die Gedanken sind frei en appuyant le 1.',
      ),
      steps: [
        L(
          'Die Folge heißt: [G](chord:G) – [Em](chord:Em) – [C](chord:C) – [D7](chord:D7). Jeder Akkord bekommt einen Takt, dann geht es von vorn los.',
          'The loop goes: [G](chord:G) – [Em](chord:Em) – [C](chord:C) – [D7](chord:D7). Each chord gets one bar, then it starts again.',
          'La suite : [G](chord:G) – [Em](chord:Em) – [C](chord:C) – [D7](chord:D7). Chaque accord dure une mesure, puis on recommence.',
        ),
        L(
          'Übe zuerst die neuen Paare: G – Em und Em – C. Bei Em – C rutscht der Mittelfinger von der A- auf die D-Saite (bleibt im 2. Bund), der Ringfinger springt auf die A-Saite in den 3. Bund, der Zeigefinger kommt auf die B-Saite in den 1. Bund.',
          'First practise the new pairs: G – Em and Em – C. For Em – C, the middle finger slides from the A to the D string (staying at fret 2), the ring finger jumps to the A string at fret 3, and the index finger joins on the B string at fret 1.',
          'Entraîne d’abord les nouvelles paires : G – Em et Em – C. Pour Em – C, le majeur glisse de la corde A à la corde D (il reste en case 2), l’annulaire saute sur la corde A en case 3 et l’index s’ajoute sur la corde B en case 1.',
        ),
        L(
          'Dann alle vier im Kreis, langsam mit „Nur runter“. Klappt das, nimm Runter-rauf oder den Insel-Schlag.',
          'Then all four in a loop, slowly with “Only down”. Once that works, use down-up or the island strum.',
          'Puis les quatre en boucle, lentement avec « Que vers le bas ». Quand ça marche, passe au bas-haut ou au rythme des îles.',
        ),
        L(
          'Das Lied [Am Lagerfeuer](lied:lagerfeuer) in G benutzt genau diese vier Akkorde.',
          'The song [Am Lagerfeuer](lied:lagerfeuer) in G uses exactly these four chords.',
          'La chanson [Am Lagerfeuer](lied:lagerfeuer) en G utilise exactement ces quatre accords.',
        ),
      ],
      piece: {
        text: L(
          'Am Lagerfeuer in G: G, Em, C, D7 – immer im Kreis. Fang mit „Nur runter“ an und steiger dich zum Insel-Schlag. Das klingt nach richtiger Band!',
          'Am Lagerfeuer in G: G, Em, C, D7 – round and round. Start with “Only down” and build up to the island strum. That sounds like a real band!',
          'Am Lagerfeuer en G : G, Em, C, D7 – en boucle. Commence par « Que vers le bas » et monte jusqu’au rythme des îles. On dirait un vrai groupe !',
        ),
        play: [{ song: 'lagerfeuer', key: 'G' }, { tool: 'spiel', chords: ['G', 'Em', 'C', 'D'] }],
      },
      homework: [
        L('Jeden Tag zuerst stimmen.', 'Tune first every day.', 'Chaque jour, accorde d’abord.'),
        L('Tag 1: G – Em und Em – C je zehnmal wechseln.', 'Day 1: switch G – Em and Em – C ten times each.', 'Jour 1 : change G – Em et Em – C dix fois chacun.'),
        L('Tag 2–3: alle vier im Kreis, je ein Takt, mit Metronom.', 'Days 2–3: all four in a loop, one bar each, with the metronome.', 'Jours 2–3 : les quatre en boucle, une mesure chacun, avec métronome.'),
        L('Tag 4–5: Am Lagerfeuer in G mitspielen.', 'Days 4–5: play along with Am Lagerfeuer in G.', 'Jours 4–5 : joue Am Lagerfeuer en G.'),
        L('Spaß: Summ eine eigene Melodie über die vier Akkorde!', 'Fun: hum your own melody over the four chords!', 'Pour le plaisir : fredonne ta propre mélodie sur les quatre accords !'),
      ],
      done: [
        L('du die vier Akkorde zweimal im Kreis ohne Pause spielst', 'you play the four chords twice round without stopping', 'tu enchaînes deux fois les quatre accords sans t’arrêter'),
        L('du Am Lagerfeuer einmal ganz schaffst', 'you get through Am Lagerfeuer once', 'tu joues Am Lagerfeuer une fois en entier'),
      ],
      trouble: [
        L(
          'Ein Wechsel ist immer zu langsam? Übe nur diesen – und spiel im Lied vor dem Wechsel einen leeren Schlag, bis es besser klappt.',
          'One change is always too slow? Practise only that one – and in the song, allow an open strum before it until it gets better.',
          'Un changement est toujours trop lent ? Entraîne seulement celui-là – et dans la chanson, autorise un coup à vide avant, en attendant.',
        ),
        L(
          'Die Hand verkrampft? Zwischendurch schütteln und die Schultern kreisen lassen. Locker spielt es sich schneller.',
          'Your hand cramps up? Shake it out now and then and roll your shoulders. Relaxed hands are faster.',
          'La main se crispe ? Secoue-la de temps en temps et fais rouler tes épaules. Détendu, on joue plus vite.',
        ),
      ],
      teacher: [
        L(
          'Einstieg: Die Lehrkraft spielt die Folge vor; die Gruppe ruft die Akkordnamen mit.',
          'Warm-up: the teacher plays the loop; the group calls out the chord names.',
          'Mise en route : l’enseignant joue la suite ; le groupe annonce le nom des accords.',
        ),
        L(
          'Übung: Vier Gruppen, jede übernimmt einen Akkord – dann rotieren, bis jede alle vier gespielt hat.',
          'Practice: four groups, each takes one chord – then rotate until every group has played all four.',
          'Exercice : quatre groupes, chacun prend un accord – puis on tourne jusqu’à ce que chaque groupe ait joué les quatre.',
        ),
        L(
          'Gemeinsam: Am Lagerfeuer – alle spielen, und wer mag, singt oder summt eine Melodie dazu.',
          'Together: Am Lagerfeuer – everyone plays, and anyone who wants to sings or hums a melody.',
          'Ensemble : Am Lagerfeuer – tout le monde joue, et qui veut chante ou fredonne une mélodie.',
        ),
      ],
      sheet: [
        L('Folge: **G – Em – C – D7**, je ein Takt, im Kreis.', 'Loop: **G – Em – C – D7**, one bar each, round and round.', 'Suite : **G – Em – C – D7**, une mesure chacun, en boucle.'),
        L('Neue Paare zuerst üben: G – Em und Em – C.', 'Practise the new pairs first: G – Em and Em – C.', 'Entraîne d’abord les paires : G – Em et Em – C.'),
        L('Erst „Nur runter“, dann Runter-rauf, dann Insel-Schlag.', 'First “Only down”, then down-up, then the island strum.', 'D’abord que vers le bas, puis bas-haut, puis le rythme des îles.'),
      ],
      wissen: ['akkordwechsel-schneller', 'lieder-fuer-anfaenger'],
    },
    // ---------- 16 ----------
    {
      n: 16,
      title: L('Der Kapodaster', 'The capo', 'Le capodastre'),
      goal: L(
        'Du setzt einen Kapodaster und spielst bekannte Griffe in einer höheren Tonart.',
        'You put on a capo and play familiar chords in a higher key.',
        'Tu poses un capodastre et tu joues des accords connus dans une tonalité plus aiguë.',
      ),
      review: L(
        'Letzte Woche: G, Em, C, D7. Spiel Am Lagerfeuer in G – das brauchst du heute wieder.',
        'Last week: G, Em, C, D7. Play Am Lagerfeuer in G – you need it again today.',
        'La semaine dernière : G, Em, C, D7. Joue Am Lagerfeuer en G – tu en auras besoin aujourd’hui.',
      ),
      steps: [
        L(
          'Ein Kapodaster ist eine Klemme, die alle Saiten in einem Bund herunterdrückt – wie ein Zeigefinger, der nie müde wird. Mehr in [Kapodaster](wissen:gitarre-kapodaster).',
          'A capo is a clamp that presses all strings down at one fret – like an index finger that never gets tired. More in [The capo](wissen:gitarre-kapodaster).',
          'Un capodastre est une pince qui appuie toutes les cordes sur une case – comme un index qui ne se fatigue jamais. Plus d’infos : [Le capodastre](wissen:gitarre-kapodaster).',
        ),
        L(
          'Setz ihn in den 2. Bund, kurz vor das Bundstäbchen und gerade. Danach mit dem [Stimmgerät](tool:stimmen) prüfen: Der Kapo zieht die Saiten oft etwas höher.',
          'Put it at the 2nd fret, just behind the fret wire and straight. Then check with the [tuner](tool:stimmen): a capo often pulls the strings slightly sharp.',
          'Place-le en case 2, juste avant la frette et bien droit. Puis vérifie avec l’[accordeur](tool:stimmen) : le capodastre fait souvent monter un peu les cordes.',
        ),
        L(
          'Jetzt greifst du wie gewohnt G, Em, C und D7 – es klingt aber zwei Halbtöne höher: A, F#m, D und E7. Neue Tonart, keine neuen Griffe!',
          'Now you play G, Em, C and D7 as usual – but it sounds two semitones higher: A, F#m, D and E7. New key, no new chords!',
          'Tu joues G, Em, C et D7 comme d’habitude – mais ça sonne deux demi-tons plus haut : A, F#m, D et E7. Nouvelle tonalité, aucun nouvel accord !',
        ),
        L(
          'Im Lied [Am Lagerfeuer](lied:lagerfeuer) in A zeigt die App „Kapo 2, greif wie G“. Über dem Text stehen die klingenden Akkorde – du greifst die aus G. Mehr in [Transponieren](wissen:transponieren).',
          'In the song [Am Lagerfeuer](lied:lagerfeuer) in A, the app shows “Capo 2, play as G”. Above the lyrics you see the sounding chords – you play the ones from G. More in [Transposing](wissen:transponieren).',
          'Dans la chanson [Am Lagerfeuer](lied:lagerfeuer) en A, l’appli indique le capodastre en case 2 avec les accords de G. Au-dessus du texte, ce sont les accords entendus – toi, tu joues ceux de Sol. Plus d’infos : [Transposer](wissen:transponieren).',
        ),
      ],
      piece: {
        text: L(
          'Am Lagerfeuer in A mit Kapo im 2. Bund: Du greifst G, Em, C, D7 wie letzte Woche – und es klingt heller. Vergleich: einmal ohne, einmal mit Kapo.',
          'Am Lagerfeuer in A with the capo at fret 2: you play G, Em, C, D7 like last week – and it sounds brighter. Compare: once without, once with the capo.',
          'Am Lagerfeuer en A avec le capodastre en case 2 : tu joues G, Em, C, D7 comme la semaine dernière – et ça sonne plus clair. Compare sans et avec capodastre.',
        ),
        play: [{ song: 'lagerfeuer', key: 'A', capo: 2 }, { tool: 'stimmen' }],
      },
      homework: [
        L('Jeden Tag: Kapo setzen, dann nachstimmen.', 'Every day: put the capo on, then retune.', 'Chaque jour : pose le capodastre, puis réaccorde.'),
        L('Tag 1–2: Kapo in Bund 1, 2, 3 – G anschlagen und hören.', 'Days 1–2: capo at fret 1, 2, 3 – strum G and listen.', 'Jours 1–2 : capodastre en case 1, 2, 3 – gratte G et écoute.'),
        L('Tag 3–4: Am Lagerfeuer in A mit Kapo 2.', 'Days 3–4: Am Lagerfeuer in A with capo 2.', 'Jours 3–4 : Am Lagerfeuer en A avec capodastre en case 2.'),
        L('Tag 5: dasselbe Lied ohne Kapo in G – hörst du den Unterschied?', 'Day 5: the same song without capo in G – can you hear the difference?', 'Jour 5 : la même chanson sans capodastre en G – entends-tu la différence ?'),
        L('Spaß: Find die Kapo-Lage, in der du am besten mitsingen kannst!', 'Fun: find the capo position where singing along feels best!', 'Pour le plaisir : trouve la case de capodastre où tu chantes le mieux !'),
      ],
      done: [
        L('der Kapo gerade sitzt und alle Saiten klar klingen', 'the capo sits straight and all strings ring clearly', 'le capodastre est droit et toutes les cordes sonnent clair'),
        L('du Am Lagerfeuer mit Kapo 2 spielst', 'you play Am Lagerfeuer with capo 2', 'tu joues Am Lagerfeuer avec le capodastre en case 2'),
      ],
      trouble: [
        L(
          'Es schnarrt mit Kapo? Er sitzt zu weit vom Bundstäbchen weg oder schief. Näher heranschieben und gerade ausrichten.',
          'Buzzing with the capo? It’s too far from the fret wire or crooked. Push it closer and straighten it.',
          'Ça frise avec le capodastre ? Il est trop loin de la frette ou de travers. Rapproche-le et redresse-le.',
        ),
        L(
          'Kein Kapodaster zur Hand? Spiel das Lied in G – oder probier in der App eine andere Tonart mit „−“ und „+“.',
          'No capo at hand? Play the song in G – or try another key in the app with “−” and “+”.',
          'Pas de capodastre sous la main ? Joue la chanson en G – ou essaie une autre tonalité dans l’appli avec « − » et « + ».',
        ),
      ],
      teacher: [
        L(
          'Einstieg: Die Lehrkraft spielt dasselbe G ohne Kapo, dann mit Kapo 2 und Kapo 5 – die Gruppe hört, wie es höher wird.',
          'Warm-up: the teacher plays the same G without a capo, then with capo 2 and capo 5 – the group hears it getting higher.',
          'Mise en route : l’enseignant joue le même G sans capodastre, puis avec capodastre en case 2 et en case 5 – le groupe entend que ça monte.',
        ),
        L(
          'Übung: Kapo setzen und nachstimmen in Paaren; die Lehrkraft geht herum und prüft den Sitz.',
          'Practice: put on the capo and retune in pairs; the teacher walks around and checks the position.',
          'Exercice : poser le capodastre et réaccorder à deux ; l’enseignant passe et vérifie la position.',
        ),
        L(
          'Gemeinsam: Am Lagerfeuer – die Hälfte mit Kapo 2 (greift G), die andere ohne Kapo in A (greift A, F#m …), wer schon kann.',
          'Together: Am Lagerfeuer – half the group with capo 2 (playing G shapes), the more advanced without capo in A (A, F#m …).',
          'Ensemble : Am Lagerfeuer – une moitié avec capodastre en case 2 (formes de G), les plus avancés sans capodastre en A (A, F#m …).',
        ),
      ],
      sheet: [
        L('Kapo gerade, kurz vor das Bundstäbchen.', 'Capo straight, just behind the fret wire.', 'Capodastre droit, juste avant la frette.'),
        L('Nach dem Aufsetzen immer nachstimmen.', 'Always retune after putting it on.', 'Toujours réaccorder après l’avoir posé.'),
        L('Kapo 2 + Griffe aus G = klingt in A.', 'Capo 2 + G shapes = sounds in A.', 'Capodastre case 2 + formes de G = sonne en A.'),
      ],
      wissen: ['gitarre-kapodaster', 'transponieren'],
    },
    // ---------- 17 ----------
    {
      n: 17,
      title: L('Zupfen mit Daumen und Fingern', 'Picking with thumb and fingers', 'Arpèges avec pouce et doigts'),
      goal: L(
        'Du zupfst Akkorde mit Daumen und drei Fingern und spielst ein ruhiges Lied im 6/8-Takt.',
        'You pick chords with your thumb and three fingers and play a calm song in 6/8.',
        'Tu fais des arpèges avec le pouce et trois doigts et tu joues une chanson calme en 6/8.',
      ),
      review: L(
        'Letzte Woche: Kapodaster. Spiel G, D7 und C einmal ohne Kapo – heute zupfen wir sie.',
        'Last week: the capo. Play G, D7 and C once without capo – today we pick them.',
        'La semaine dernière : le capodastre. Joue G, D7 et C une fois sans capodastre – aujourd’hui on les arpège.',
      ),
      steps: [
        L(
          'Der Daumen spielt den Bass: die tiefste Saite des Akkords, den Grundton. Bei G die tiefe E-Saite, bei C die A-Saite, bei D7 die D-Saite.',
          'Your thumb plays the bass: the lowest string of the chord, the root. For G it’s the low E string, for C the A string, for D7 the D string.',
          'Le pouce joue la basse : la corde la plus grave de l’accord, la fondamentale. Pour G la corde E grave, pour C la corde A, pour D7 la corde D.',
        ),
        L(
          'Zeige-, Mittel- und Ringfinger liegen auf G-, B- und e-Saite. Jeder Finger hat seine eigene Saite.',
          'Index, middle and ring fingers rest on the G, B and e strings. Each finger has its own string.',
          'Index, majeur et annulaire se posent sur les cordes G, B et e. Chaque doigt a sa propre corde.',
        ),
        L(
          'Das Muster für 6/8: **Daumen – Zeige – Mittel – Ring – Mittel – Zeige**. Sechs Töne, schön gleichmäßig, wie eine Welle.',
          'The pattern for 6/8: **thumb – index – middle – ring – middle – index**. Six notes, nice and even, like a wave.',
          'La formule pour le 6/8 : **pouce – index – majeur – annulaire – majeur – index**. Six notes, bien régulières, comme une vague.',
        ),
        L(
          'Zum Einfühlen in den 6/8-Takt hilft der [Rhythmus](tool:rhythmus) mit „Schaukeln (6/8)“. Mehr in [Gitarre zupfen](wissen:gitarre-zupfen).',
          'To get a feel for 6/8, use the [rhythm tool](tool:rhythmus) with “Rocking (6/8)”. More in [Fingerpicking](wissen:gitarre-zupfen).',
          'Pour sentir le 6/8, utilise le [rythme](tool:rhythmus) avec « Balancé (6/8) ». Plus d’infos : [Arpèges à la guitare](wissen:gitarre-zupfen).',
        ),
        L(
          'Dann: [Stille Nacht](lied:stille-nacht) in G, ganz ruhig gezupft.',
          'Then: [Stille Nacht](lied:stille-nacht) in G, picked very calmly.',
          'Ensuite : [Stille Nacht](lied:stille-nacht) en G, arpégé tout en douceur.',
        ),
      ],
      piece: {
        text: L(
          'Stille Nacht in G gezupft: pro Takt einmal Daumen – Zeige – Mittel – Ring – Mittel – Zeige. G, D7 und C – leise und schön.',
          'Stille Nacht in G, picked: once per bar thumb – index – middle – ring – middle – index. G, D7 and C – soft and beautiful.',
          'Stille Nacht en G, en arpège : une fois par mesure pouce – index – majeur – annulaire – majeur – index. G, D7 et C – doux et beau.',
        ),
        play: [{ tool: 'rhythmus', pattern: 'Schaukeln (6/8)' }, { song: 'stille-nacht', key: 'G' }],
      },
      homework: [
        L('Jeden Tag zuerst stimmen.', 'Tune first every day.', 'Chaque jour, accorde d’abord.'),
        L('Tag 1–2: Muster auf leeren Saiten, Daumen auf der tiefen E-Saite.', 'Days 1–2: the pattern on open strings, thumb on the low E string.', 'Jours 1–2 : la formule sur cordes à vide, pouce sur la corde E grave.'),
        L('Tag 3: Muster auf G, C und D7 – Daumen sucht den Grundton.', 'Day 3: the pattern on G, C and D7 – the thumb finds the root.', 'Jour 3 : la formule sur G, C et D7 – le pouce cherche la fondamentale.'),
        L('Tag 4–5: Stille Nacht in G zupfen.', 'Days 4–5: pick Stille Nacht in G.', 'Jours 4–5 : Stille Nacht en G en arpège.'),
        L('Spaß: Zupf ein Gute-Nacht-Lied für jemanden in deiner Familie.', 'Fun: pick a goodnight song for someone in your family.', 'Pour le plaisir : joue une berceuse en arpège pour quelqu’un de ta famille.'),
      ],
      done: [
        L('das Muster sechs Töne gleichmäßig klingen lässt', 'the pattern’s six notes sound even', 'les six notes de la formule sont régulières'),
        L('der Daumen bei jedem Akkord die richtige Saite findet', 'your thumb finds the right string for each chord', 'le pouce trouve la bonne corde pour chaque accord'),
      ],
      trouble: [
        L(
          'Die Finger verheddern sich? Erst nur Daumen und Zeigefinger im Wechsel, dann Mittel- und Ringfinger dazunehmen.',
          'Fingers getting tangled? Start with just thumb and index alternating, then add middle and ring fingers.',
          'Les doigts s’emmêlent ? Commence par pouce et index en alternance, puis ajoute majeur et annulaire.',
        ),
        L(
          'Es klingt zu leise? Zupf mit der Fingerkuppe leicht in die Saite hinein, nicht von ihr weg. Die Hand bleibt ruhig über den Saiten.',
          'Too quiet? Pluck with your fingertip slightly into the string rather than away from it. Keep your hand still above the strings.',
          'Trop faible ? Pince avec le bout du doigt un peu vers l’intérieur, pas en tirant vers l’extérieur. La main reste calme au-dessus des cordes.',
        ),
      ],
      teacher: [
        L(
          'Einstieg: Die Finger „zuordnen“ – alle legen Daumen, Zeige, Mittel und Ring auf ihre Saiten und zupfen auf Zuruf einzeln.',
          'Warm-up: “assign the fingers” – everyone places thumb, index, middle and ring on their strings and plucks each on cue.',
          'Mise en route : « placer les doigts » – chacun pose pouce, index, majeur et annulaire sur leurs cordes et pince chaque doigt au signal.',
        ),
        L(
          'Übung: Das Muster langsam auf leeren Saiten, die Lehrkraft zählt „1 2 3 4 5 6“.',
          'Practice: the pattern slowly on open strings while the teacher counts “1 2 3 4 5 6”.',
          'Exercice : la formule lentement sur cordes à vide, l’enseignant compte « 1 2 3 4 5 6 ».',
        ),
        L(
          'Gemeinsam: Stille Nacht – eine Gruppe zupft, eine schlägt leise „Nur runter“, alle summen die Melodie.',
          'Together: Stille Nacht – one group picks, one strums softly “Only down”, everyone hums the melody.',
          'Ensemble : Stille Nacht – un groupe joue en arpège, un autre gratte doucement vers le bas, tout le monde fredonne la mélodie.',
        ),
      ],
      sheet: [
        L('Daumen auf dem Grundton: G = tiefe E, C = A, D7 = D-Saite.', 'Thumb on the root: G = low E, C = A, D7 = D string.', 'Pouce sur la fondamentale : G = E grave, C = corde A, D7 = corde D.'),
        L('Zeige, Mittel, Ring auf G-, B- und e-Saite.', 'Index, middle, ring on the G, B and e strings.', 'Index, majeur, annulaire sur les cordes G, B et e.'),
        L('6/8: **Daumen – Zeige – Mittel – Ring – Mittel – Zeige**.', '6/8: **thumb – index – middle – ring – middle – index**.', '6/8 : **pouce – index – majeur – annulaire – majeur – index**.'),
      ],
      wissen: ['gitarre-zupfen'],
    },
    // ---------- 18 ----------
    {
      n: 18,
      title: L('Dur und Moll hören', 'Hearing major and minor', 'Entendre majeur et mineur'),
      goal: L(
        'Du hörst den Unterschied zwischen Dur und Moll und weißt, welcher Ton ihn macht.',
        'You hear the difference between major and minor and know which note makes it.',
        'Tu entends la différence entre majeur et mineur et tu sais quelle note la crée.',
      ),
      review: L(
        'Letzte Woche: Zupfen. Zupf einmal Stille Nacht – und dann E und Em gezupft.',
        'Last week: picking. Pick Stille Nacht once – then E and Em, picked.',
        'La semaine dernière : les arpèges. Joue Stille Nacht en arpège – puis E et Em en arpège.',
      ),
      steps: [
        L(
          'Spiel [E](chord:E) und dann [Em](chord:Em). Dur klingt hell und fröhlich, Moll weicher, oft ein bisschen traurig.',
          'Play [E](chord:E) and then [Em](chord:Em). Major sounds bright and happy, minor softer and often a little sad.',
          'Joue [E](chord:E) puis [Em](chord:Em). Le majeur sonne clair et joyeux, le mineur plus doux, souvent un peu triste.',
        ),
        L(
          'Der Unterschied ist nur ein Ton: die **Terz**. Bei E greift der Zeigefinger die G-Saite im 1. Bund (G#), bei Em klingt die G-Saite leer (G) – einen Halbton tiefer.',
          'The difference is just one note: the **third**. In E your index finger frets the G string at the 1st fret (G#); in Em the G string rings open (G) – one semitone lower.',
          'La différence tient à une seule note : la **tierce**. Dans E, l’index appuie la corde G en case 1 (Sol dièse) ; dans Em, la corde G sonne à vide (Sol) – un demi-ton plus bas.',
        ),
        L(
          'Ratespiel: Jemand spielt E oder Em, A oder Am – du hörst nur zu und sagst „Dur“ oder „Moll“. Mehr in [Dur und Moll](wissen:dur-und-moll).',
          'Guessing game: someone plays E or Em, A or Am – you just listen and say “major” or “minor”. More in [Major and minor](wissen:dur-und-moll).',
          'Devinette : quelqu’un joue E ou Em, A ou Am – tu écoutes seulement et tu dis « majeur » ou « mineur ». Plus d’infos : [Majeur et mineur](wissen:dur-und-moll).',
        ),
        L(
          'Der [Akkord-Detektiv](tool:detektiv) hört zu und sagt dir, welchen Akkord du spielst – auch ob Dur oder Moll.',
          'The [chord detective](tool:detektiv) listens and tells you which chord you’re playing – including whether it’s major or minor.',
          'Le [détective des accords](tool:detektiv) écoute et te dit quel accord tu joues – y compris s’il est majeur ou mineur.',
        ),
      ],
      piece: {
        text: L(
          'Amazing Grace in G: G, C und D7 in Dur – und an einer Stelle Em. Hörst du, wie der Moll-Akkord die Stimmung kurz verändert?',
          'Amazing Grace in G: G, C and D7 in major – and Em in one spot. Can you hear how the minor chord briefly changes the mood?',
          'Amazing Grace en G : G, C et D7 en majeur – et Em à un endroit. Entends-tu comme l’accord mineur change un instant l’ambiance ?',
        ),
        play: [{ song: 'amazing-grace', key: 'G' }, { tool: 'detektiv' }],
      },
      homework: [
        L('Jeden Tag zuerst stimmen.', 'Tune first every day.', 'Chaque jour, accorde d’abord.'),
        L('Tag 1–2: E – Em und A – Am im Wechsel, genau hinhören.', 'Days 1–2: alternate E – Em and A – Am, listen closely.', 'Jours 1–2 : alterne E – Em et A – Am, écoute bien.'),
        L('Tag 3: dem Akkord-Detektiv fünf Akkorde vorspielen.', 'Day 3: play five chords for the chord detective.', 'Jour 3 : joue cinq accords au détective des accords.'),
        L('Tag 4–5: Amazing Grace in G.', 'Days 4–5: Amazing Grace in G.', 'Jours 4–5 : Amazing Grace en G.'),
        L('Spaß: Spiel jemandem Dur und Moll vor – errät er es?', 'Fun: play major and minor for someone – can they guess?', 'Pour le plaisir : joue majeur et mineur à quelqu’un – devine-t-il ?'),
      ],
      done: [
        L('du Dur und Moll beim Hören meistens erkennst', 'you can usually tell major from minor by ear', 'tu reconnais le plus souvent majeur et mineur à l’oreille'),
        L('du zeigen kannst, welcher Finger E zu Em macht', 'you can show which finger turns E into Em', 'tu sais montrer quel doigt transforme E en Em'),
      ],
      trouble: [
        L(
          'Du hörst keinen Unterschied? Zupf nur die G-Saite: einmal leer, einmal im 1. Bund. Dann den ganzen Akkord.',
          'Can’t hear a difference? Pluck only the G string: once open, once at the 1st fret. Then the whole chord.',
          'Tu n’entends pas de différence ? Pince seulement la corde G : à vide, puis en case 1. Ensuite l’accord entier.',
        ),
        L(
          'Der Detektiv erkennt nichts? Ein Akkord klar und kräftig anschlagen und klingen lassen, nah am Mikrofon.',
          'The detective doesn’t recognise anything? Strum one chord clearly and firmly, let it ring, close to the microphone.',
          'Le détective ne reconnaît rien ? Gratte un accord clairement et franchement, laisse-le sonner, près du micro.',
        ),
      ],
      teacher: [
        L(
          'Einstieg: Die Lehrkraft spielt Dur- und Moll-Akkorde, die Gruppe zeigt Daumen hoch (Dur) oder Daumen zur Seite (Moll).',
          'Warm-up: the teacher plays major and minor chords, the group shows thumbs up (major) or thumbs sideways (minor).',
          'Mise en route : l’enseignant joue des accords majeurs et mineurs, le groupe lève le pouce (majeur) ou le met de côté (mineur).',
        ),
        L(
          'Übung: Paare spielen sich gegenseitig E/Em und A/Am vor und raten.',
          'Practice: pairs play E/Em and A/Am for each other and guess.',
          'Exercice : en binômes, chacun joue E/Em et A/Am à l’autre, qui devine.',
        ),
        L(
          'Gemeinsam: Amazing Grace – die Gruppe hebt beim Em kurz die Hand.',
          'Together: Amazing Grace – the group briefly raises a hand at the Em.',
          'Ensemble : Amazing Grace – le groupe lève brièvement la main sur le Em.',
        ),
      ],
      sheet: [
        L('Dur = hell, Moll = weicher. Der Unterschied: die **Terz**.', 'Major = bright, minor = softer. The difference: the **third**.', 'Majeur = clair, mineur = plus doux. La différence : la **tierce**.'),
        L('E → Em: Zeigefinger von der G-Saite nehmen.', 'E → Em: lift the index finger off the G string.', 'E → Em : retirer l’index de la corde G.'),
        L('Ratespiel: E/Em, A/Am – Dur oder Moll?', 'Guessing game: E/Em, A/Am – major or minor?', 'Devinette : E/Em, A/Am – majeur ou mineur ?'),
      ],
      wissen: ['dur-und-moll'],
    },
    // ---------- 19 ----------
    {
      n: 19,
      title: L('Takt und Notenwerte', 'Time and note values', 'Mesure et valeurs de notes'),
      goal: L(
        'Du weißt, wie lang Ganze, Halbe, Viertel und Achtel sind, und spielst einen Marsch im 2/4-Takt.',
        'You know how long whole, half, quarter and eighth notes are, and play a march in 2/4.',
        'Tu connais la durée des rondes, blanches, noires et croches, et tu joues une marche à 2/4.',
      ),
      review: L(
        'Letzte Woche: Dur und Moll. Spiel E, Em, A und Am und sag dazu „Dur“ oder „Moll“.',
        'Last week: major and minor. Play E, Em, A and Am, saying “major” or “minor” for each.',
        'La semaine dernière : majeur et mineur. Joue E, Em, A et Am en disant « majeur » ou « mineur ».',
      ),
      steps: [
        L(
          'Notenwerte im 4/4-Takt: **Ganze** = 4 Schläge, **Halbe** = 2, **Viertel** = 1, **Achtel** = ein halber Schlag. Zwei Achtel sind „1 und“.',
          'Note values in 4/4: **whole** = 4 beats, **half** = 2, **quarter** = 1, **eighth** = half a beat. Two eighths are “1 and”.',
          'Valeurs en 4/4 : **ronde** = 4 temps, **blanche** = 2, **noire** = 1, **croche** = un demi-temps. Deux croches font « 1 et ».',
        ),
        L(
          'Probier es auf A: einmal schlagen und vier Schläge klingen lassen (Ganze), dann zweimal (Halbe), viermal (Viertel), achtmal runter-rauf (Achtel).',
          'Try it on A: strum once and let it ring four beats (whole), then twice (halves), four times (quarters), eight times down-up (eighths).',
          'Essaie sur A : gratte une fois et laisse sonner quatre temps (ronde), puis deux fois (blanches), quatre fois (noires), huit fois bas-haut (croches).',
        ),
        L(
          'Die Taktart sagt, wie viele Schläge ein Takt hat: 4/4 = vier, 3/4 = drei (Walzer), 2/4 = zwei (Marsch). Mehr in [Takt und Taktarten](wissen:takt-und-taktarten).',
          'The time signature tells you how many beats are in a bar: 4/4 = four, 3/4 = three (waltz), 2/4 = two (march). More in [Time signatures](wissen:takt-und-taktarten).',
          'La mesure indique le nombre de temps : 4/4 = quatre, 3/4 = trois (valse), 2/4 = deux (marche). Plus d’infos : [Mesures](wissen:takt-und-taktarten).',
        ),
        L(
          'Im [Rhythmus](tool:rhythmus) „Marsch (2/4)“ wählen: runter, runter-rauf. Gezählt: „1, 2 und“. Dann [Ein Jäger aus Kurpfalz](lied:jaeger-aus-kurpfalz) in A.',
          'In the [rhythm tool](tool:rhythmus) choose “March (2/4)”: down, down-up. Counted: “1, 2 and”. Then [Ein Jäger aus Kurpfalz](lied:jaeger-aus-kurpfalz) in A.',
          'Dans le [rythme](tool:rhythmus), choisis « Marche (2/4) » : bas, bas-haut. En comptant : « 1, 2 et ». Puis [Ein Jäger aus Kurpfalz](lied:jaeger-aus-kurpfalz) en A.',
        ),
      ],
      piece: {
        text: L(
          'Ein Jäger aus Kurpfalz in A mit A und E7 – im Marsch-Muster „runter, runter-rauf“. Flott und munter, wie zu Pferd!',
          'Ein Jäger aus Kurpfalz in A with A and E7 – in the march pattern “down, down-up”. Brisk and lively, like riding a horse!',
          'Ein Jäger aus Kurpfalz en A avec A et E7 – en rythmique de marche « bas, bas-haut ». Vif et joyeux, comme à cheval !',
        ),
        play: [{ tool: 'rhythmus', pattern: 'Marsch (2/4)' }, { song: 'jaeger-aus-kurpfalz', key: 'A' }],
      },
      homework: [
        L('Jeden Tag zuerst stimmen.', 'Tune first every day.', 'Chaque jour, accorde d’abord.'),
        L('Tag 1–2: Ganze, Halbe, Viertel, Achtel auf A – laut zählen.', 'Days 1–2: whole, half, quarter, eighth on A – count out loud.', 'Jours 1–2 : rondes, blanches, noires, croches sur A – compte à voix haute.'),
        L('Tag 3: Marsch-Muster mit Metronom, A und E7 im Wechsel.', 'Day 3: march pattern with metronome, alternating A and E7.', 'Jour 3 : rythmique de marche avec métronome, A et E7 en alternance.'),
        L('Tag 4–5: Ein Jäger aus Kurpfalz in A.', 'Days 4–5: Ein Jäger aus Kurpfalz in A.', 'Jours 4–5 : Ein Jäger aus Kurpfalz en A.'),
        L('Spaß: Marschier beim Zählen durchs Zimmer!', 'Fun: march around the room while you count!', 'Pour le plaisir : marche dans la pièce en comptant !'),
      ],
      done: [
        L('du die vier Notenwerte auf A vorspielen kannst', 'you can demonstrate the four note values on A', 'tu sais jouer les quatre valeurs de notes sur A'),
        L('du den Marsch gleichmäßig durchspielst', 'you play the march evenly all the way through', 'tu joues la marche régulièrement jusqu’au bout'),
      ],
      trouble: [
        L(
          'Die Ganze wird zu kurz? Nach dem Anschlag die Hand weiterzählen lassen – leise mit dem Fuß mittippen.',
          'Your whole note gets too short? After strumming, keep counting with your hand – tap your foot quietly along.',
          'Ta ronde est trop courte ? Après le grattage, continue de compter avec la main – tape doucement du pied.',
        ),
        L(
          'Der Marsch stolpert? Erst nur „runter, runter“ spielen, dann das „rauf“ dazunehmen.',
          'The march stumbles? Play only “down, down” first, then add the “up”.',
          'La marche trébuche ? Joue d’abord seulement « bas, bas », puis ajoute le « haut ».',
        ),
      ],
      teacher: [
        L(
          'Einstieg: Notenwerte klatschen – die Lehrkraft zeigt Karten mit Ganze, Halbe, Viertel, Achtel.',
          'Warm-up: clap note values – the teacher shows cards with whole, half, quarter and eighth notes.',
          'Mise en route : frapper les valeurs – l’enseignant montre des cartes ronde, blanche, noire, croche.',
        ),
        L(
          'Übung: Vier Gruppen spielen gleichzeitig A in Ganzen, Halben, Vierteln und Achteln – ein lebendiges Rhythmus-Bild.',
          'Practice: four groups play A at the same time in wholes, halves, quarters and eighths – a living rhythm picture.',
          'Exercice : quatre groupes jouent A en même temps en rondes, blanches, noires et croches – un tableau rythmique vivant.',
        ),
        L(
          'Gemeinsam: Ein Jäger aus Kurpfalz – im Marsch durch den Raum, die Gitarren spielen im Stehen oder Sitzen.',
          'Together: Ein Jäger aus Kurpfalz – march around the room while the guitars play, standing or seated.',
          'Ensemble : Ein Jäger aus Kurpfalz – on défile dans la salle pendant que les guitares jouent, debout ou assis.',
        ),
      ],
      sheet: [
        L('Ganze 4 · Halbe 2 · Viertel 1 · Achtel ½ Schlag.', 'Whole 4 · half 2 · quarter 1 · eighth ½ beat.', 'Ronde 4 · blanche 2 · noire 1 · croche ½ temps.'),
        L('4/4 = vier, 3/4 = drei, 2/4 = zwei Schläge pro Takt.', '4/4 = four, 3/4 = three, 2/4 = two beats per bar.', '4/4 = quatre, 3/4 = trois, 2/4 = deux temps par mesure.'),
        L('Marsch: **runter, runter-rauf** – „1, 2 und“.', 'March: **down, down-up** – “1, 2 and”.', 'Marche : **bas, bas-haut** – « 1, 2 et ».'),
      ],
      wissen: ['takt-und-taktarten', 'mit-metronom-ueben'],
    },
    // ---------- 20 ----------
    {
      n: 20,
      title: L('Der 12-Takt-Blues in E', 'The 12-bar blues in E', 'Le blues en 12 mesures en E'),
      goal: L(
        'Du kennst das Blues-Schema mit E, A und B7 und spielst mit der Band.',
        'You know the blues pattern with E, A and B7 and play with the band.',
        'Tu connais la grille du blues avec E, A et B7 et tu joues avec le groupe.',
      ),
      chords: ['B7'],
      review: L(
        'Letzte Woche: Takt und Notenwerte. Spiel E in Vierteln, dann in Achteln (runter-rauf).',
        'Last week: time and note values. Play E in quarters, then in eighths (down-up).',
        'La semaine dernière : mesure et valeurs. Joue E en noires, puis en croches (bas-haut).',
      ),
      steps: [
        L(
          'Neuer Griff [B7](chord:B7): Mittelfinger A-Saite 2, Zeigefinger D-Saite 1, Ringfinger G-Saite 2, B-Saite leer, kleiner Finger e-Saite 2. Tiefe E-Saite nicht anschlagen.',
          'New chord [B7](chord:B7): middle finger A string 2, index D string 1, ring G string 2, B string open, little finger e string 2. Don’t play the low E string.',
          'Nouvel accord [B7](chord:B7) : majeur corde A case 2, index corde D case 1, annulaire corde G case 2, corde B à vide, auriculaire corde e case 2. Pas de corde E grave.',
        ),
        L(
          'Im Blues in E sind E, A und B7 die Stufen **I, IV und V**: der erste, vierte und fünfte Ton der E-Dur-Tonleiter.',
          'In the blues in E, E, A and B7 are degrees **I, IV and V**: the first, fourth and fifth notes of the E major scale.',
          'Dans le blues en E, E, A et B7 sont les degrés **I, IV et V** : les premier, quatrième et cinquième degrés de la gamme de Mi majeur.',
        ),
        L(
          'Das Grundschema: Takt 1–4 E, Takt 5–6 A, Takt 7–8 E, Takt 9 B7, Takt 10 A, Takt 11 E, Takt 12 B7 – der führt zurück zum Anfang. Die Band spielt alle drei als Septakkorde. Mehr in [12-Takt-Blues](wissen:zwoelf-takt-blues).',
          'The basic pattern: bars 1–4 E, bars 5–6 A, bars 7–8 E, bar 9 B7, bar 10 A, bar 11 E, bar 12 B7 – it leads back to the start. The band plays all three as seventh chords. More in [12-bar blues](wissen:zwoelf-takt-blues).',
          'La grille de base : mesures 1–4 E, 5–6 A, 7–8 E, 9 B7, 10 A, 11 E, 12 B7 – elle ramène au début. Le groupe joue les trois en accords de septième. Plus d’infos : [Blues en 12 mesures](wissen:zwoelf-takt-blues).',
        ),
        L(
          'Im [Blues](tool:blues) wählst du Tonart E. Die App zeigt dir, welcher Akkord gerade dran ist. Auf Stufe 3 spielst du das Boogie-Riff auf den beiden tiefsten Saiten.',
          'In the [blues](tool:blues) choose the key of E. The app shows you which chord is up. On level 3 you play the boogie riff on the two lowest strings.',
          'Dans le [blues](tool:blues), choisis la tonalité E. L’appli montre quel accord vient. Au niveau 3, tu joues le riff boogie sur les deux cordes les plus graves.',
        ),
      ],
      piece: {
        text: L(
          'Blues in E mit der Band: erst die Akkorde E, A und B7 im Schema schlagen, dann auf Stufe 3 das Boogie-Riff. Zwölf Takte – und noch einmal!',
          'Blues in E with the band: first strum E, A and B7 through the pattern, then the boogie riff on level 3. Twelve bars – and again!',
          'Blues en E avec le groupe : d’abord gratte E, A et B7 sur la grille, puis le riff boogie au niveau 3. Douze mesures – et on recommence !',
        ),
        play: [{ tool: 'blues', level: 3, key: 'E' }],
      },
      homework: [
        L('Jeden Tag zuerst stimmen.', 'Tune first every day.', 'Chaque jour, accorde d’abord.'),
        L('Tag 1: B7 greifen, Saiten einzeln prüfen.', 'Day 1: play B7, check the strings one by one.', 'Jour 1 : pose B7, vérifie les cordes une à une.'),
        L('Tag 2–3: das Schema E, A, B7 aufschreiben und spielen.', 'Days 2–3: write out the pattern E, A, B7 and play it.', 'Jours 2–3 : écris la grille E, A, B7 et joue-la.'),
        L('Tag 4–5: Blues mit der Band, erst Akkorde, dann Boogie-Riff.', 'Days 4–5: blues with the band, first chords, then the boogie riff.', 'Jours 4–5 : blues avec le groupe, d’abord les accords, puis le riff.'),
        L('Spaß: Erfinde einen Blues-Text über dein Frühstück!', 'Fun: make up blues lyrics about your breakfast!', 'Pour le plaisir : invente des paroles de blues sur ton petit-déjeuner !'),
      ],
      done: [
        L('B7 mit fünf Saiten klar klingt', 'B7 rings clearly on five strings', 'B7 sonne clair sur cinq cordes'),
        L('du die zwölf Takte mit der Band ohne Anhalten spielst', 'you play the twelve bars with the band without stopping', 'tu joues les douze mesures avec le groupe sans t’arrêter'),
      ],
      trouble: [
        L(
          'B7 ist schwer? Vier Finger auf einmal – setz sie von unten nach oben: Mittel, Zeige, Ring, klein. Mit der Zeit geht es schneller.',
          'B7 is hard? Four fingers at once – place them from bottom to top: middle, index, ring, little. It gets faster with time.',
          'B7 est difficile ? Quatre doigts d’un coup – pose-les du grave vers l’aigu : majeur, index, annulaire, auriculaire. Ça viendra.',
        ),
        L(
          'Du verlierst dich im Schema? Zähl die Takte laut mit oder schau auf die Anzeige „Takt n von 12“ in der App.',
          'Lost in the pattern? Count the bars out loud or watch the “Bar n of 12” display in the app.',
          'Perdu dans la grille ? Compte les mesures à voix haute ou regarde l’affichage des mesures dans l’appli.',
        ),
      ],
      teacher: [
        L(
          'Einstieg: Das Schema an die Tafel als 3 × 4 Kästchen schreiben; die Gruppe liest die Akkorde vor.',
          'Warm-up: write the pattern on the board as 3 × 4 boxes; the group reads the chords out loud.',
          'Mise en route : écrire la grille au tableau en 3 × 4 cases ; le groupe lit les accords à voix haute.',
        ),
        L(
          'Übung: Gruppe 1 spielt Akkorde, Gruppe 2 das Boogie-Riff, dann tauschen. Die App spielt Bass und Schlagzeug.',
          'Practice: group 1 plays chords, group 2 the boogie riff, then swap. The app plays bass and drums.',
          'Exercice : le groupe 1 joue les accords, le groupe 2 le riff boogie, puis on échange. L’appli joue basse et batterie.',
        ),
        L(
          'Gemeinsam: Ein Klassen-Blues – jedes Kind singt reihum eine selbst erfundene Zeile.',
          'Together: a class blues – each child takes a turn singing a line they made up.',
          'Ensemble : un blues de classe – chaque enfant chante à son tour une phrase inventée.',
        ),
      ],
      sheet: [
        L('**B7:** A 2, D 1, G 2, B leer, e 2 – tiefe E-Saite nicht.', '**B7:** A 2, D 1, G 2, B open, e 2 – no low E string.', '**B7 :** A 2, D 1, G 2, B à vide, e 2 – pas de corde E grave.'),
        L('Stufen in E: I = E, IV = A, V = B7.', 'Degrees in E: I = E, IV = A, V = B7.', 'Degrés en E : I = E, IV = A, V = B7.'),
        L('Schema: E E E E | A A E E | B7 A E B7', 'Pattern: E E E E | A A E E | B7 A E B7', 'Grille : E E E E | A A E E | B7 A E B7'),
      ],
      wissen: ['zwoelf-takt-blues'],
    },
    // ---------- 21 ----------
    {
      n: 21,
      title: L('Powerchords', 'Power chords', 'Les power chords'),
      goal: L(
        'Du spielst E5, A5 und D5 mit zwei Fingern und rockst damit zum Blues.',
        'You play E5, A5 and D5 with two fingers and rock out to the blues.',
        'Tu joues E5, A5 et D5 avec deux doigts et tu fais du rock sur le blues.',
      ),
      chords: ['E5', 'A5', 'D5'],
      review: L(
        'Letzte Woche: der 12-Takt-Blues. Spiel einmal das Schema mit E, A und B7.',
        'Last week: the 12-bar blues. Play the pattern once with E, A and B7.',
        'La semaine dernière : le blues en 12 mesures. Joue une fois la grille avec E, A et B7.',
      ),
      steps: [
        L(
          'Ein Powerchord hat nur Grundton und Quinte – weder Dur noch Moll. Er klingt kräftig, besonders auf der E-Gitarre. Mehr in [Powerchords](wissen:e-gitarre-powerchords).',
          'A power chord has just the root and the fifth – neither major nor minor. It sounds powerful, especially on electric guitar. More in [Power chords](wissen:e-gitarre-powerchords).',
          'Un power chord n’a que la fondamentale et la quinte – ni majeur ni mineur. Il sonne puissant, surtout à la guitare électrique. Plus d’infos : [Power chords](wissen:e-gitarre-powerchords).',
        ),
        L(
          '[E5](chord:E5): tiefe E-Saite leer, Zeige- und Mittelfinger im 2. Bund auf A- und D-Saite. Nur diese drei Saiten anschlagen.',
          '[E5](chord:E5): low E string open, index and middle fingers at the 2nd fret on the A and D strings. Strum only these three strings.',
          '[E5](chord:E5) : corde E grave à vide, index et majeur en case 2 sur les cordes A et D. Gratte seulement ces trois cordes.',
        ),
        L(
          '[A5](chord:A5) ist dieselbe Form eine Saite weiter: A-Saite leer, D- und G-Saite im 2. Bund. [D5](chord:D5): D-Saite leer, G-Saite 2. Bund, B-Saite 3. Bund.',
          '[A5](chord:A5) is the same shape one string over: A string open, D and G strings at the 2nd fret. [D5](chord:D5): D string open, G string 2nd fret, B string 3rd fret.',
          '[A5](chord:A5) est la même forme décalée d’une corde : corde A à vide, cordes D et G en case 2. [D5](chord:D5) : corde D à vide, corde G case 2, corde B case 3.',
        ),
        L(
          'Die anderen Saiten dämpfst du: Die Handkante der Anschlaghand liegt leicht auf den Saiten am Steg – das klingt gleich nach Rock. Alle Formen auf einen Blick: [Powerchords](tool:powerchords).',
          'Mute the other strings: rest the edge of your strumming hand lightly on the strings near the bridge – instantly rock. All shapes at a glance: [Power chords](tool:powerchords).',
          'Étouffe les autres cordes : pose légèrement le tranchant de la main droite sur les cordes près du chevalet – tout de suite rock. Toutes les formes : [Power chords](tool:powerchords).',
        ),
      ],
      piece: {
        text: L(
          'Blues in E mit der Band – statt einzelner Grundtöne spielst du E5 und A5, kurz und gedämpft in Achteln. Beim B bleibst du beim Einzelton auf der A-Saite im 2. Bund.',
          'Blues in E with the band – instead of single roots, play E5 and A5, short and muted in eighths. On B, keep the single note on the A string at the 2nd fret.',
          'Blues en E avec le groupe – au lieu des fondamentales seules, joue E5 et A5, courts et étouffés en croches. Sur le Si, garde la note seule sur la corde A en case 2.',
        ),
        play: [{ tool: 'powerchords' }, { tool: 'blues', level: 1, key: 'E' }],
      },
      homework: [
        L('Jeden Tag zuerst stimmen.', 'Tune first every day.', 'Chaque jour, accorde d’abord.'),
        L('Tag 1–2: E5, A5, D5 – nur drei Saiten, Rest gedämpft.', 'Days 1–2: E5, A5, D5 – only three strings, the rest muted.', 'Jours 1–2 : E5, A5, D5 – trois cordes seulement, le reste étouffé.'),
        L('Tag 3: E5 – A5 – E5 – D5 in Achteln mit Metronom.', 'Day 3: E5 – A5 – E5 – D5 in eighths with the metronome.', 'Jour 3 : E5 – A5 – E5 – D5 en croches avec le métronome.'),
        L('Tag 4–5: Blues in E mit Powerchords.', 'Days 4–5: blues in E with power chords.', 'Jours 4–5 : blues en E avec power chords.'),
        L('Spaß: Erfinde dein eigenes Rock-Riff aus E5, A5 und D5!', 'Fun: invent your own rock riff from E5, A5 and D5!', 'Pour le plaisir : invente ton propre riff rock avec E5, A5 et D5 !'),
      ],
      done: [
        L('nur die drei Saiten des Powerchords klingen', 'only the three strings of the power chord ring', 'seules les trois cordes du power chord sonnent'),
        L('du im Blues E5 und A5 im Takt wechselst', 'you switch E5 and A5 in time in the blues', 'tu changes E5 et A5 en rythme dans le blues'),
      ],
      trouble: [
        L(
          'Es klingen zu viele Saiten mit? Kürzer anschlagen und die Handkante dichter an den Steg legen.',
          'Too many strings ringing? Strum shorter and keep the edge of your hand closer to the bridge.',
          'Trop de cordes sonnent ? Gratte plus court et rapproche le tranchant de la main du chevalet.',
        ),
        L(
          'Es klingt zu dumpf gedämpft? Die Handkante nur ganz leicht auflegen – die Saiten sollen noch klingen, nur kürzer.',
          'Too muffled? Rest the edge of your hand only very lightly – the strings should still sound, just shorter.',
          'Trop étouffé ? Pose le tranchant de la main très légèrement – les cordes doivent encore sonner, juste plus court.',
        ),
      ],
      teacher: [
        L(
          'Einstieg: E und E5 vergleichen – die Gruppe hört, dass E5 weder fröhlich noch traurig, sondern „stark“ klingt.',
          'Warm-up: compare E and E5 – the group hears that E5 sounds neither happy nor sad, but “strong”.',
          'Mise en route : comparer E et E5 – le groupe entend que E5 n’est ni joyeux ni triste, mais « fort ».',
        ),
        L(
          'Übung: Gedämpfte Achtel auf E5 im Chor, die Lehrkraft gibt mit dem Metronom das Tempo vor.',
          'Practice: muted eighths on E5 together, with the teacher setting the tempo on the metronome.',
          'Exercice : croches étouffées sur E5 tous ensemble, l’enseignant donne le tempo au métronome.',
        ),
        L(
          'Gemeinsam: Blues in E – die eine Hälfte spielt Powerchords, die andere das Boogie-Riff aus Lektion 20.',
          'Together: blues in E – half the group plays power chords, the other half the boogie riff from lesson 20.',
          'Ensemble : blues en E – une moitié joue les power chords, l’autre le riff boogie de la leçon 20.',
        ),
      ],
      sheet: [
        L('Powerchord = Grundton + Quinte, nur drei Saiten.', 'Power chord = root + fifth, only three strings.', 'Power chord = fondamentale + quinte, trois cordes seulement.'),
        L('**E5**, **A5**, **D5**: tiefste Saite leer, zwei Finger dazu.', '**E5**, **A5**, **D5**: lowest string open, add two fingers.', '**E5**, **A5**, **D5** : corde grave à vide, plus deux doigts.'),
        L('Handkante leicht auf die Saiten am Steg: gedämpft.', 'Edge of the hand lightly on the strings at the bridge: muted.', 'Tranchant de la main sur les cordes au chevalet : étouffé.'),
      ],
      wissen: ['e-gitarre-powerchords', 'zwoelf-takt-blues'],
    },
    // ---------- 22 ----------
    {
      n: 22,
      title: L('Tonleiter und Melodie', 'Scale and melody', 'Gamme et mélodie'),
      goal: L(
        'Du spielst die C-Dur-Tonleiter, liest Tabulatur und zupfst eine Melodie.',
        'You play the C major scale, read tab and pick out a melody.',
        'Tu joues la gamme de Do majeur, tu lis la tablature et tu joues une mélodie.',
      ),
      review: L(
        'Letzte Woche: Powerchords. Spiel E5, A5 und D5 gedämpft zum Aufwärmen.',
        'Last week: power chords. Warm up with E5, A5 and D5, muted.',
        'La semaine dernière : les power chords. Échauffe-toi avec E5, A5 et D5 étouffés.',
      ),
      steps: [
        L(
          'Eine Tonleiter sind die Töne einer Tonart nacheinander. C-Dur: **C D E F G A B C** – ganz ohne Kreuze und B’s. Mehr in [Töne und Notennamen](wissen:toene-und-notennamen).',
          'A scale is the notes of a key one after another. C major: **C D E F G A B C** – no sharps or flats at all. More in [Note names](wissen:toene-und-notennamen).',
          'Une gamme, ce sont les notes d’une tonalité les unes après les autres. Do majeur : **Do Ré Mi Fa Sol La Si Do** – sans dièse ni bémol. Plus d’infos : [Les noms des notes](wissen:toene-und-notennamen).',
        ),
        L(
          'So liegt sie auf der Gitarre: A-Saite 3. Bund (C) · D-Saite leer, 2., 3. Bund (D, E, F) · G-Saite leer, 2. Bund (G, A) · B-Saite leer, 1. Bund (B, C).',
          'Here it is on the guitar: A string 3rd fret (C) · D string open, 2nd, 3rd fret (D, E, F) · G string open, 2nd fret (G, A) · B string open, 1st fret (B, C).',
          'Sur la guitare : corde A case 3 (Do) · corde D à vide, cases 2 et 3 (Ré, Mi, Fa) · corde G à vide, case 2 (Sol, La) · corde B à vide, case 1 (Si, Do).',
        ),
        L(
          'Tabulatur liest du so: Im Lied steht unter jeder Silbe ein Kürzel wie **G2** – Buchstabe = Saite, Zahl = Bund, 0 = leer. Mehr in [Tabulatur lesen](wissen:tabulatur-lesen).',
          'Reading tab: in the song, each syllable gets a short code like **G2** – letter = string, number = fret, 0 = open. More in [Reading tab](wissen:tabulatur-lesen).',
          'Lire une tablature : dans la chanson, chaque syllabe a un code comme **G2** – lettre = corde, chiffre = case, 0 = à vide. Plus d’infos : [Lire une tablature](wissen:tabulatur-lesen).',
        ),
        L(
          'Öffne [Alle meine Entchen](lied:alle-meine-entchen) in G und schalte die Tabulatur ein. Die Melodie liegt auf G-, B- und e-Saite und braucht nur G, A, B, C, D und E – alles Töne aus deiner Tonleiter. Erst zupfen, dann begleiten.',
          'Open [Alle meine Entchen](lied:alle-meine-entchen) in G and switch on the tab. The melody lies on the G, B and e strings and only needs G, A, B, C, D and E – all notes from your scale. First pick it, then accompany.',
          'Ouvre [Alle meine Entchen](lied:alle-meine-entchen) en G et active la tablature. La mélodie est sur les cordes G, B et e et n’utilise que Sol, La, Si, Do, Ré et Mi – toutes des notes de ta gamme. D’abord la jouer, puis accompagner.',
        ),
        L(
          'Schnelle Töne hintereinander spielst du im Wechselschlag: mit dem Plektrum runter, rauf, runter, rauf – mit den Fingern abwechselnd Zeige- und Mittelfinger.',
          'Play quick notes in a row with alternate picking: with a pick down, up, down, up – with your fingers, alternate index and middle.',
          'Les notes rapides se jouent en alternance : au médiator bas, haut, bas, haut – aux doigts, index et majeur l’un après l’autre.',
        ),
      ],
      piece: {
        text: L(
          'Alle meine Entchen in G: zuerst die Melodie aus der Tabulatur zupfen, Ton für Ton. Dann die Akkorde G, C und D7 dazu spielen – oder zu zweit: einer Melodie, einer Akkorde!',
          'Alle meine Entchen in G: first pick the melody from the tab, note by note. Then play the chords G, C and D7 – or in pairs: one plays melody, one chords!',
          'Alle meine Entchen en G : d’abord la mélodie d’après la tablature, note par note. Puis les accords G, C et D7 – ou à deux : l’un la mélodie, l’autre les accords !',
        ),
        play: [{ song: 'alle-meine-entchen', key: 'G' }],
      },
      homework: [
        L('Jeden Tag zuerst stimmen.', 'Tune first every day.', 'Chaque jour, accorde d’abord.'),
        L('Tag 1–2: C-Dur-Tonleiter rauf und runter, Notennamen mitsprechen.', 'Days 1–2: C major scale up and down, saying the note names.', 'Jours 1–2 : gamme de Do majeur en montant et descendant, en nommant les notes.'),
        L('Tag 3–4: Melodie von Alle meine Entchen nach Tab zupfen.', 'Days 3–4: pick the melody of Alle meine Entchen from the tab.', 'Jours 3–4 : joue la mélodie de Alle meine Entchen d’après la tablature.'),
        L('Tag 5: Melodie und Akkorde im Wechsel.', 'Day 5: melody and chords taking turns.', 'Jour 5 : mélodie et accords en alternance.'),
        L('Spaß: Erfinde eine kurze Melodie aus fünf Tönen der Tonleiter!', 'Fun: make up a short melody from five notes of the scale!', 'Pour le plaisir : invente une petite mélodie avec cinq notes de la gamme !'),
      ],
      done: [
        L('du die C-Dur-Tonleiter ohne Hilfe spielst', 'you play the C major scale without help', 'tu joues la gamme de Do majeur sans aide'),
        L('du eine Melodie aus der Tabulatur zupfen kannst', 'you can pick out a melody from tab', 'tu sais jouer une mélodie d’après une tablature'),
      ],
      trouble: [
        L(
          'Du verlierst den Überblick? Sing die Melodie zuerst. Dann suchst du Ton für Ton auf dem Hals.',
          'Losing track? Sing the melody first. Then find it note by note on the neck.',
          'Tu t’y perds ? Chante d’abord la mélodie. Puis cherche-la note par note sur le manche.',
        ),
        L(
          'Die Töne klingen zu kurz? Lass den Finger liegen, bis der nächste Ton kommt.',
          'The notes are too short? Keep your finger down until the next note comes.',
          'Les notes sont trop courtes ? Laisse le doigt en place jusqu’à la note suivante.',
        ),
      ],
      teacher: [
        L(
          'Einstieg: Die Tonleiter singen (C bis C), dann gemeinsam auf der Gitarre spielen.',
          'Warm-up: sing the scale (C to C), then play it together on the guitar.',
          'Mise en route : chanter la gamme (Do à Do), puis la jouer ensemble à la guitare.',
        ),
        L(
          'Übung: Tabs an der Tafel – die Lehrkraft schreibt kurze Tonfolgen, die Gruppe spielt sie nach.',
          'Practice: tab on the board – the teacher writes short note sequences and the group plays them.',
          'Exercice : tablature au tableau – l’enseignant écrit de courtes suites de notes que le groupe joue.',
        ),
        L(
          'Gemeinsam: Alle meine Entchen – eine Hälfte Melodie, die andere Akkorde, dann tauschen.',
          'Together: Alle meine Entchen – half play the melody, the other half the chords, then swap.',
          'Ensemble : Alle meine Entchen – une moitié joue la mélodie, l’autre les accords, puis on échange.',
        ),
      ],
      sheet: [
        L('C-Dur: **C D E F G A B C**.', 'C major: **C D E F G A B C**.', 'Do majeur : **Do Ré Mi Fa Sol La Si Do**.'),
        L('A 3 · D 0 2 3 · G 0 2 · B 0 1', 'A 3 · D 0 2 3 · G 0 2 · B 0 1', 'A 3 · D 0 2 3 · G 0 2 · B 0 1'),
        L('Tab: Linie = Saite, Zahl = Bund, 0 = leer.', 'Tab: line = string, number = fret, 0 = open.', 'Tablature : ligne = corde, chiffre = case, 0 = à vide.'),
      ],
      wissen: ['tabulatur-lesen', 'toene-und-notennamen'],
    },
    // ---------- 23 ----------
    {
      n: 23,
      title: L('Das kleine F und G7', 'The small F and G7', 'Le petit F et G7'),
      goal: L(
        'Du spielst das kleine F und G7 und begleitest Lieder in C.',
        'You play the small F and G7 and accompany songs in C.',
        'Tu joues le petit F et G7 et tu accompagnes des chansons en C.',
      ),
      chords: ['F', 'G7'],
      review: L(
        'Letzte Woche: Tonleiter. Spiel die C-Dur-Tonleiter einmal rauf und runter.',
        'Last week: the scale. Play the C major scale up and down once.',
        'La semaine dernière : la gamme. Joue la gamme de Do majeur une fois en montant et descendant.',
      ),
      steps: [
        L(
          'Das kleine [F](chord:F): Ringfinger D-Saite 3. Bund, Mittelfinger G-Saite 2. Bund, Zeigefinger **flach** über B- und e-Saite im 1. Bund. Nur die vier dünnen Saiten anschlagen.',
          'The small [F](chord:F): ring finger D string 3rd fret, middle finger G string 2nd fret, index finger **flat** across the B and e strings at the 1st fret. Strum only the four thin strings.',
          'Le petit [F](chord:F) : annulaire corde D case 3, majeur corde G case 2, index **à plat** sur les cordes B et e en case 1. Gratte seulement les quatre cordes fines.',
        ),
        L(
          'Der Zeigefinger drückt hier zwei Saiten auf einmal – ein Mini-Barré. Das ist die Vorstufe für die großen Barré-Griffe. Mehr in [Barré-Griffe](wissen:gitarre-barre).',
          'Here the index finger presses two strings at once – a mini barre. It’s the first step towards full barre chords. More in [Barre chords](wissen:gitarre-barre).',
          'Ici, l’index appuie deux cordes à la fois – un mini barré. C’est l’étape avant les grands barrés. Plus d’infos : [Les barrés](wissen:gitarre-barre).',
        ),
        L(
          '[G7](chord:G7): Ringfinger tiefe E-Saite 3. Bund, Mittelfinger A-Saite 2. Bund, Zeigefinger hohe e-Saite 1. Bund. Alle sechs Saiten klingen.',
          '[G7](chord:G7): ring finger low E string 3rd fret, middle finger A string 2nd fret, index finger high e string 1st fret. All six strings ring.',
          '[G7](chord:G7) : annulaire corde E grave case 3, majeur corde A case 2, index corde e aiguë case 1. Les six cordes sonnent.',
        ),
        L(
          'Mit [C](chord:C), F und G7 spielst du jetzt Lieder in C – wie [Alle meine Entchen](lied:alle-meine-entchen) im Original.',
          'With [C](chord:C), F and G7 you can now play songs in C – like [Alle meine Entchen](lied:alle-meine-entchen) in its original key.',
          'Avec [C](chord:C), F et G7, tu joues maintenant des chansons en C – comme [Alle meine Entchen](lied:alle-meine-entchen) dans sa tonalité d’origine.',
        ),
      ],
      piece: {
        text: L(
          'Alle meine Entchen in C mit C, F und G7 – dasselbe Lied in einer neuen Tonart. Klappt es: Muss i denn zum Städtele hinaus.',
          'Alle meine Entchen in C with C, F and G7 – the same song in a new key. When it works: Muss i denn zum Städtele hinaus.',
          'Alle meine Entchen en C avec C, F et G7 – la même chanson dans une nouvelle tonalité. Quand ça marche : Muss i denn zum Städtele hinaus.',
        ),
        play: [{ song: 'alle-meine-entchen' }, { song: 'muss-i-denn' }],
      },
      homework: [
        L('Jeden Tag zuerst stimmen.', 'Tune first every day.', 'Chaque jour, accorde d’abord.'),
        L('Tag 1–2: F greifen – klingen B- und e-Saite unter dem Zeigefinger?', 'Days 1–2: play F – do the B and e strings ring under your index?', 'Jours 1–2 : pose F – les cordes B et e sonnent-elles sous l’index ?'),
        L('Tag 3: C – F und G7 – C je zehnmal wechseln.', 'Day 3: switch C – F and G7 – C ten times each.', 'Jour 3 : change C – F et G7 – C dix fois chacun.'),
        L('Tag 4–5: Alle meine Entchen in C, dann Muss i denn.', 'Days 4–5: Alle meine Entchen in C, then Muss i denn.', 'Jours 4–5 : Alle meine Entchen en C, puis Muss i denn.'),
        L('Spaß: Spiel Alle meine Entchen in A, G und C – welche Tonart magst du?', 'Fun: play Alle meine Entchen in A, G and C – which key do you like?', 'Pour le plaisir : joue Alle meine Entchen en A, Sol et Do – quelle tonalité préfères-tu ?'),
      ],
      done: [
        L('beim kleinen F alle vier Saiten klingen', 'all four strings ring on the small F', 'les quatre cordes sonnent avec le petit F'),
        L('du ein Lied in C mit C, F und G7 schaffst', 'you get through a song in C with C, F and G7', 'tu joues une chanson en C avec C, F et G7'),
      ],
      trouble: [
        L(
          'B- oder e-Saite klingt beim F nicht? Dreh den Zeigefinger leicht auf die Seite zum Daumen hin – die harte Kante drückt besser.',
          'The B or e string doesn’t ring on F? Roll your index finger slightly onto its side towards the thumb – the firmer edge presses better.',
          'La corde B ou e ne sonne pas avec F ? Tourne légèrement l’index sur le côté, vers le pouce – le bord plus dur appuie mieux.',
        ),
        L(
          'Das F tut weh? Das ist normal am Anfang. Lieber oft kurz üben und zwischendurch die Hand lockern.',
          'F hurts? That’s normal at first. Practise often and briefly, and loosen your hand in between.',
          'Le F fait mal ? C’est normal au début. Entraîne-toi souvent et brièvement, et détends la main entre-temps.',
        ),
      ],
      teacher: [
        L(
          'Einstieg: Mini-Barré üben – nur der Zeigefinger flach über B- und e-Saite, beide Saiten zupfen: Klingen beide?',
          'Warm-up: practise the mini barre – just the index finger flat across the B and e strings, pluck both: do both ring?',
          'Mise en route : le mini barré – seul l’index à plat sur les cordes B et e, pincer les deux : sonnent-elles toutes les deux ?',
        ),
        L(
          'Übung: C – F – G7 – C im Kreis, je zwei Takte. Wer F noch nicht schafft, spielt solange [Fmaj7] ohne Zeigefinger weiter (xx3210).',
          'Practice: C – F – G7 – C round and round, two bars each. Anyone not ready for F yet plays it without the index finger (xx3210, Fmaj7).',
          'Exercice : C – F – G7 – C en boucle, deux mesures chacun. Qui n’a pas encore F le joue sans l’index (xx3210, Fmaj7).',
        ),
        L(
          'Gemeinsam: Muss i denn zum Städtele hinaus – laut singen und zum Schluss winken.',
          'Together: Muss i denn zum Städtele hinaus – sing loudly and wave at the end.',
          'Ensemble : Muss i denn zum Städtele hinaus – chanter fort et faire au revoir à la fin.',
        ),
      ],
      sheet: [
        L('**F (klein):** D 3, G 2, Zeigefinger flach über B und e im 1. Bund.', '**F (small):** D 3, G 2, index flat across B and e at fret 1.', '**F (petit) :** D 3, G 2, index à plat sur B et e en case 1.'),
        L('**G7:** tiefe E 3, A 2, hohe e 1 – alle sechs Saiten.', '**G7:** low E 3, A 2, high e 1 – all six strings.', '**G7 :** E grave 3, A 2, e aiguë 1 – les six cordes.'),
        L('In C: **C, F, G7**.', 'In C: **C, F, G7**.', 'En Do : **C, F, G7**.'),
      ],
      wissen: ['gitarre-barre', 'saubere-griffe'],
    },
    // ---------- 24 ----------
    {
      n: 24,
      title: L('Barré-Griff 1: Bm', 'Barre chord 1: Bm', 'Barré n° 1 : Bm'),
      goal: L(
        'Du spielst deinen ersten großen Barré-Griff, Bm, und begleitest ein Lied in D.',
        'You play your first full barre chord, Bm, and accompany a song in D.',
        'Tu joues ton premier grand barré, Bm, et tu accompagnes une chanson en D.',
      ),
      chords: ['Bm'],
      review: L(
        'Letzte Woche: kleines F. Spiel das Mini-Barré auf B- und e-Saite – klingen beide?',
        'Last week: the small F. Play the mini barre on the B and e strings – do both ring?',
        'La semaine dernière : le petit F. Joue le mini barré sur les cordes B et e – sonnent-elles toutes les deux ?',
      ),
      steps: [
        L(
          'Beim Barré liegt der Zeigefinger quer über mehrere Saiten – wie ein Kapodaster. Bei [Bm](chord:Bm) im 2. Bund von der A- bis zur hohen e-Saite.',
          'In a barre chord, your index finger lies across several strings – like a capo. For [Bm](chord:Bm) at the 2nd fret, from the A string to the high e string.',
          'Dans un barré, l’index se couche sur plusieurs cordes – comme un capodastre. Pour [Bm](chord:Bm), en case 2, de la corde A à la corde e aiguë.',
        ),
        L(
          'Dazu: Mittelfinger B-Saite 3. Bund, Ringfinger D-Saite 4. Bund, kleiner Finger G-Saite 4. Bund. Die tiefe E-Saite schlägst du nicht an.',
          'Then: middle finger B string 3rd fret, ring finger D string 4th fret, little finger G string 4th fret. Don’t play the low E string.',
          'Ensuite : majeur corde B case 3, annulaire corde D case 4, auriculaire corde G case 4. Ne joue pas la corde E grave.',
        ),
        L(
          'Tricks: Zeigefinger leicht auf die Seite drehen, Daumen hinten in die Mitte des Halses, Ellbogen nah am Körper. Es kommt auf die Lage an, nicht auf Kraft. Mehr in [Barré-Griffe](wissen:gitarre-barre).',
          'Tricks: roll your index finger slightly onto its side, thumb in the middle of the back of the neck, elbow close to your body. Position matters more than strength. More in [Barre chords](wissen:gitarre-barre).',
          'Astuces : tourne un peu l’index sur le côté, pouce au milieu du dos du manche, coude près du corps. La position compte plus que la force. Plus d’infos : [Les barrés](wissen:gitarre-barre).',
        ),
        L(
          'Saiten einzeln zupfen und prüfen. Es klingt noch nicht alles? Völlig normal – Barré braucht ein paar Wochen.',
          'Pluck the strings one by one to check. Not everything rings yet? Completely normal – barre chords take a few weeks.',
          'Pince les cordes une à une pour vérifier. Tout ne sonne pas encore ? C’est tout à fait normal – le barré demande quelques semaines.',
        ),
        L(
          'Dann [Am Lagerfeuer](lied:lagerfeuer) in D: D, Bm, G und A7.',
          'Then [Am Lagerfeuer](lied:lagerfeuer) in D: D, Bm, G and A7.',
          'Puis [Am Lagerfeuer](lied:lagerfeuer) en D : D, Bm, G et A7.',
        ),
      ],
      piece: {
        text: L(
          'Am Lagerfeuer in D: D, Bm, G, A7 im Kreis. Wenn Bm noch hakt, schlag dort nur die vier dünnen Saiten an – das klingt auch schon gut.',
          'Am Lagerfeuer in D: D, Bm, G, A7 round and round. If Bm still sticks, strum only the four thin strings there – that already sounds good.',
          'Am Lagerfeuer en D : D, Bm, G, A7 en boucle. Si Bm coince encore, gratte seulement les quatre cordes fines – ça sonne déjà bien.',
        ),
        play: [{ song: 'lagerfeuer', key: 'D' }],
      },
      homework: [
        L('Jeden Tag zuerst stimmen.', 'Tune first every day.', 'Chaque jour, accorde d’abord.'),
        L('Tag 1–2: nur den Zeigefinger quer im 2. Bund – Saiten einzeln zupfen.', 'Days 1–2: just the index finger across fret 2 – pluck each string.', 'Jours 1–2 : seulement l’index en barré case 2 – pince chaque corde.'),
        L('Tag 3: ganzer Bm-Griff, aufsetzen und lösen, zehnmal.', 'Day 3: the whole Bm chord, place and release, ten times.', 'Jour 3 : l’accord Bm entier, poser et relâcher, dix fois.'),
        L('Tag 4–5: Am Lagerfeuer in D.', 'Days 4–5: Am Lagerfeuer in D.', 'Jours 4–5 : Am Lagerfeuer en D.'),
        L('Spaß: Mach ein Foto von deinem ersten sauberen Bm!', 'Fun: take a photo of your first clean Bm!', 'Pour le plaisir : prends en photo ton premier Bm bien net !'),
      ],
      done: [
        L('bei Bm mindestens vier Saiten klar klingen', 'at least four strings ring clearly on Bm', 'au moins quatre cordes sonnent clair avec Bm'),
        L('du Am Lagerfeuer in D einmal durchspielst', 'you play Am Lagerfeuer in D once through', 'tu joues Am Lagerfeuer en D une fois en entier'),
      ],
      trouble: [
        L(
          'Eine Saite unter dem Zeigefinger klingt dumpf? Sie liegt in einer Gelenkfalte. Den Finger ein wenig höher oder tiefer schieben.',
          'A string under the index finger sounds muffled? It’s sitting in a joint crease. Slide the finger slightly up or down.',
          'Une corde sous l’index sonne étouffée ? Elle tombe dans un pli d’articulation. Décale un peu le doigt vers le haut ou le bas.',
        ),
        L(
          'Die Hand wird schnell müde? Nur kurz drücken, dann lösen und schütteln. Kraft kommt mit der Zeit – Verkrampfen hilft nicht.',
          'Hand tires quickly? Press briefly, then release and shake. Strength comes with time – tensing up doesn’t help.',
          'La main fatigue vite ? Appuie brièvement, puis relâche et secoue. La force vient avec le temps – se crisper n’aide pas.',
        ),
      ],
      teacher: [
        L(
          'Einstieg: „Finger-Kapodaster“ – alle legen nur den Zeigefinger quer in den 2. Bund und zupfen Saite für Saite.',
          'Warm-up: “finger capo” – everyone lays just the index finger across fret 2 and plucks string by string.',
          'Mise en route : le « capodastre-doigt » – tous posent seulement l’index en travers de la case 2 et pincent corde par corde.',
        ),
        L(
          'Übung: Paare prüfen sich gegenseitig: Einer greift Bm, der andere zupft jede Saite und gibt Tipps.',
          'Practice: pairs check each other: one plays Bm, the other plucks each string and gives tips.',
          'Exercice : en binômes – l’un pose Bm, l’autre pince chaque corde et donne des conseils.',
        ),
        L(
          'Gemeinsam: Am Lagerfeuer in D – wer Bm noch nicht schafft, spielt dort nur die vier dünnen Saiten.',
          'Together: Am Lagerfeuer in D – anyone not ready for Bm plays only the four thin strings there.',
          'Ensemble : Am Lagerfeuer en D – qui n’a pas encore Bm ne joue que les quatre cordes fines à cet endroit.',
        ),
      ],
      sheet: [
        L('**Bm:** Zeigefinger quer im 2. Bund (A bis e).', '**Bm:** index finger across fret 2 (A to e).', '**Bm :** index en barré case 2 (de A à e).'),
        L('Mittel B 3, Ring D 4, klein G 4 – tiefe E-Saite nicht.', 'Middle B 3, ring D 4, little G 4 – no low E string.', 'Majeur B 3, annulaire D 4, auriculaire G 4 – pas de E grave.'),
        L('Zeigefinger leicht auf die Seite, Daumen hinten mittig.', 'Index slightly on its side, thumb centred on the back.', 'Index un peu sur le côté, pouce au milieu derrière.'),
      ],
      wissen: ['gitarre-barre'],
    },
    // ---------- 25 ----------
    {
      n: 25,
      title: L('Barré-Griff 2: F#m', 'Barre chord 2: F#m', 'Barré n° 2 : F#m'),
      goal: L(
        'Du spielst F#m als Barré über alle sechs Saiten und begleitest ein Lied in A ohne Kapo.',
        'You play F#m as a barre across all six strings and accompany a song in A without a capo.',
        'Tu joues F#m en barré sur les six cordes et tu accompagnes une chanson en A sans capodastre.',
      ),
      chords: ['F#m'],
      review: L(
        'Letzte Woche: Bm. Spiel Bm und zupf jede Saite – wie viele klingen schon?',
        'Last week: Bm. Play Bm and pluck each string – how many ring already?',
        'La semaine dernière : Bm. Joue Bm et pince chaque corde – combien sonnent déjà ?',
      ),
      steps: [
        L(
          '[F#m](chord:F#m) ist die Em-Form, zwei Bünde höher geschoben: Der Zeigefinger liegt quer über **alle sechs** Saiten im 2. Bund, er ersetzt den Sattel.',
          '[F#m](chord:F#m) is the Em shape moved up two frets: your index finger lies across **all six** strings at the 2nd fret, replacing the nut.',
          '[F#m](chord:F#m), c’est la forme de Em montée de deux cases : l’index se couche sur **les six** cordes en case 2 et remplace le sillet.',
        ),
        L(
          'Ringfinger A-Saite 4. Bund, kleiner Finger D-Saite 4. Bund. Alle sechs Saiten klingen.',
          'Ring finger A string 4th fret, little finger D string 4th fret. All six strings ring.',
          'Annulaire corde A case 4, auriculaire corde D case 4. Les six cordes sonnent.',
        ),
        L(
          'Erinnerst du dich an Lektion 16? Mit Kapo 2 hast du Em gegriffen und F#m gehört. Jetzt ist dein Zeigefinger der Kapo!',
          'Remember lesson 16? With capo 2 you played Em and heard F#m. Now your index finger is the capo!',
          'Tu te souviens de la leçon 16 ? Avec le capodastre en case 2, tu jouais Em et tu entendais F#m. Maintenant, ton index est le capodastre !',
        ),
        L(
          'Dann [Am Lagerfeuer](lied:lagerfeuer) in A – diesmal ohne Kapo: A, F#m, D und E7. Den Kapo-Vorschlag der App lässt du heute einfach links liegen. Mehr in [Barré-Griffe](wissen:gitarre-barre).',
          'Then [Am Lagerfeuer](lied:lagerfeuer) in A – this time without a capo: A, F#m, D and E7. Just ignore the app’s capo suggestion today. More in [Barre chords](wissen:gitarre-barre).',
          'Puis [Am Lagerfeuer](lied:lagerfeuer) en A – cette fois sans capodastre : A, F#m, D et E7. Aujourd’hui, ignore simplement la suggestion de capodastre de l’appli. Plus d’infos : [Les barrés](wissen:gitarre-barre).',
        ),
      ],
      piece: {
        text: L(
          'Am Lagerfeuer in A ohne Kapo: A, F#m, D, E7. Es klingt genau wie in Lektion 16 – aber jetzt mit echten Griffen. Wenn F#m hakt, kurz Kapo-Version spielen.',
          'Am Lagerfeuer in A without capo: A, F#m, D, E7. It sounds just like lesson 16 – but now with real chords. If F#m sticks, switch to the capo version for a bit.',
          'Am Lagerfeuer en A sans capodastre : A, F#m, D, E7. Ça sonne comme en leçon 16 – mais avec de vrais accords. Si F#m coince, reviens un moment à la version capodastre.',
        ),
        play: [{ song: 'lagerfeuer', key: 'A' }],
      },
      homework: [
        L('Jeden Tag zuerst stimmen.', 'Tune first every day.', 'Chaque jour, accorde d’abord.'),
        L('Tag 1–2: Zeigefinger quer über alle sechs Saiten – jede einzeln zupfen.', 'Days 1–2: index across all six strings – pluck each one.', 'Jours 1–2 : index en travers des six cordes – pince chacune.'),
        L('Tag 3: F#m und A im Wechsel, langsam.', 'Day 3: switch F#m and A slowly.', 'Jour 3 : alterne F#m et A, lentement.'),
        L('Tag 4–5: Am Lagerfeuer in A ohne Kapo.', 'Days 4–5: Am Lagerfeuer in A without capo.', 'Jours 4–5 : Am Lagerfeuer en A sans capodastre.'),
        L('Spaß: Schieb die F#m-Form in den 3. und 5. Bund – wie klingt es?', 'Fun: slide the F#m shape to fret 3 and 5 – how does it sound?', 'Pour le plaisir : glisse la forme de F#m en case 3 et 5 – comment ça sonne ?'),
      ],
      done: [
        L('bei F#m mindestens fünf Saiten klar klingen', 'at least five strings ring clearly on F#m', 'au moins cinq cordes sonnent clair avec F#m'),
        L('du Am Lagerfeuer in A ohne Kapo schaffst', 'you get through Am Lagerfeuer in A without capo', 'tu joues Am Lagerfeuer en A sans capodastre'),
      ],
      trouble: [
        L(
          'Die hohe e- oder B-Saite klingt nicht? Den Zeigefinger etwas weiter über den Hals schieben, sodass die Spitze leicht übersteht.',
          'The high e or B string doesn’t ring? Push your index finger a bit further across the neck so the tip sticks out slightly.',
          'La corde e aiguë ou B ne sonne pas ? Avance un peu l’index sur le manche pour que le bout dépasse légèrement.',
        ),
        L(
          'Es tut weh oder klappt nicht? Nach fünf Minuten Pause machen. Barré lernt man in Wochen, nicht in Tagen – jeder Tag zählt.',
          'It hurts or won’t work? Take a break after five minutes. You learn barre chords over weeks, not days – every day counts.',
          'Ça fait mal ou ça ne marche pas ? Fais une pause après cinq minutes. Le barré s’apprend en semaines, pas en jours – chaque jour compte.',
        ),
      ],
      teacher: [
        L(
          'Einstieg: Em greifen, dann mit Kapo 2 – und dann die Form mit Zeigefinger-Barré im 2. Bund. Gleicher Klang!',
          'Warm-up: play Em, then with capo 2 – then the shape with an index barre at fret 2. Same sound!',
          'Mise en route : jouer Em, puis avec capodastre en case 2 – puis la forme avec l’index en barré case 2. Même son !',
        ),
        L(
          'Übung: Barré im Wandern – F#m-Form im 2., 3. und 5. Bund (F#m, Gm, Am) nacheinander anschlagen.',
          'Practice: the moving barre – play the F#m shape at frets 2, 3 and 5 (F#m, Gm, Am) one after another.',
          'Exercice : le barré qui voyage – jouer la forme de F#m en cases 2, 3 et 5 (F#m, Gm, Am) l’une après l’autre.',
        ),
        L(
          'Gemeinsam: Am Lagerfeuer in A – Barré-Gruppe ohne Kapo und Kapo-Gruppe spielen gleichzeitig. Es passt zusammen!',
          'Together: Am Lagerfeuer in A – the barre group without capo and the capo group play at the same time. It fits together!',
          'Ensemble : Am Lagerfeuer en A – le groupe barré sans capodastre et le groupe avec capodastre jouent en même temps. Ça s’accorde !',
        ),
      ],
      sheet: [
        L('**F#m:** Em-Form mit Zeigefinger quer im 2. Bund.', '**F#m:** Em shape with the index finger across fret 2.', '**F#m :** forme de Em avec l’index en barré case 2.'),
        L('Ring A 4, klein D 4 – alle sechs Saiten.', 'Ring A 4, little D 4 – all six strings.', 'Annulaire A 4, auriculaire D 4 – les six cordes.'),
        L('Zeigefinger = Kapodaster, nur aus Fleisch.', 'Index finger = a capo made of finger.', 'Index = un capodastre en chair et en os.'),
      ],
      wissen: ['gitarre-barre', 'gitarre-kapodaster'],
    },
    // ---------- 26 ----------
    {
      n: 26,
      title: L('Transponieren und Stufen I–IV–V', 'Transposing and I–IV–V', 'Transposer et degrés I–IV–V'),
      goal: L(
        'Du findest in G, D und A die drei Hauptakkorde und spielst ein Lied in drei Tonarten.',
        'You find the three main chords in G, D and A and play one song in three keys.',
        'Tu trouves les trois accords principaux en G, Ré et La et tu joues une chanson dans trois tonalités.',
      ),
      review: L(
        'Letzte Woche: F#m. Spiel Am Lagerfeuer in A – einmal mit Barré, einmal mit Kapo.',
        'Last week: F#m. Play Am Lagerfeuer in A – once with the barre, once with the capo.',
        'La semaine dernière : F#m. Joue Am Lagerfeuer en A – une fois en barré, une fois avec capodastre.',
      ),
      steps: [
        L(
          'Zähl die Töne einer Dur-Tonleiter ab dem Grundton: 1 = **I**, 4 = **IV**, 5 = **V**. Diese drei Akkorde tragen sehr viele Lieder.',
          'Count the notes of a major scale from the root: 1 = **I**, 4 = **IV**, 5 = **V**. These three chords carry a great many songs.',
          'Compte les notes d’une gamme majeure depuis la fondamentale : 1 = **I**, 4 = **IV**, 5 = **V**. Ces trois accords portent énormément de chansons.',
        ),
        L(
          'In G: G A B **C** **D** → I = G, IV = C, V = D. In D: I = D, IV = G, V = A. In A: I = A, IV = D, V = E. Die V wird oft zum Septakkord: D7, A7, E7.',
          'In G: G A B **C** **D** → I = G, IV = C, V = D. In D: I = D, IV = G, V = A. In A: I = A, IV = D, V = E. The V often becomes a seventh chord: D7, A7, E7.',
          'En Sol : Sol La Si **Do** **Ré** → I = G, IV = C, V = D. En Ré : I = D, IV = G, V = A. En La : I = A, IV = D, V = E. Le V devient souvent un accord de septième : D7, A7, E7.',
        ),
        L(
          'Transponieren heißt: Ein Lied in eine andere Tonart bringen. Du ersetzt einfach I, IV und V durch die Akkorde der neuen Tonart. Mehr in [Transponieren](wissen:transponieren).',
          'Transposing means moving a song into another key. You simply replace I, IV and V with the chords of the new key. More in [Transposing](wissen:transponieren).',
          'Transposer, c’est faire passer une chanson dans une autre tonalité. Tu remplaces simplement I, IV et V par les accords de la nouvelle tonalité. Plus d’infos : [Transposer](wissen:transponieren).',
        ),
        L(
          'In der App wechselst du die Tonart im Lied mit „−“ und „+“. Probier [Michael, Row the Boat Ashore](lied:michael-row) in G, D und A.',
          'In the app you change a song’s key with “−” and “+”. Try [Michael, Row the Boat Ashore](lied:michael-row) in G, D and A.',
          'Dans l’appli, tu changes la tonalité d’une chanson avec « − » et « + ». Essaie [Michael, Row the Boat Ashore](lied:michael-row) en G, Ré et La.',
        ),
      ],
      piece: {
        text: L(
          'Michael, Row the Boat Ashore in drei Tonarten: G (G, C, D7), D (D, G, A7) und A (A, D, E7). Welche klingt für deine Stimme am schönsten?',
          'Michael, Row the Boat Ashore in three keys: G (G, C, D7), D (D, G, A7) and A (A, D, E7). Which one suits your voice best?',
          'Michael, Row the Boat Ashore dans trois tonalités : Sol (G, C, D7), Ré (D, G, A7) et La (A, D, E7). Laquelle va le mieux à ta voix ?',
        ),
        play: [
          { song: 'michael-row', key: 'G' },
          { song: 'michael-row', key: 'D' },
          { song: 'michael-row', key: 'A' },
        ],
      },
      homework: [
        L('Jeden Tag zuerst stimmen.', 'Tune first every day.', 'Chaque jour, accorde d’abord.'),
        L('Tag 1: I, IV, V in G, D und A aufschreiben.', 'Day 1: write down I, IV, V in G, D and A.', 'Jour 1 : écris I, IV, V en G, Ré et La.'),
        L('Tag 2–4: Michael, Row the Boat in G, dann D, dann A.', 'Days 2–4: Michael, Row the Boat in G, then D, then A.', 'Jours 2–4 : Michael, Row the Boat en G, puis Ré, puis La.'),
        L('Tag 5: ein anderes Lied in deine Lieblingstonart bringen.', 'Day 5: move another song into your favourite key.', 'Jour 5 : passe une autre chanson dans ta tonalité préférée.'),
        L('Spaß: Sing mit und find die Tonart, in der deine Stimme am besten klingt!', 'Fun: sing along and find the key where your voice sounds best!', 'Pour le plaisir : chante et trouve la tonalité où ta voix sonne le mieux !'),
      ],
      done: [
        L('du I, IV und V in G, D und A nennen kannst', 'you can name I, IV and V in G, D and A', 'tu sais nommer I, IV et V en G, Ré et La'),
        L('du ein Lied in zwei Tonarten spielst', 'you play one song in two keys', 'tu joues une chanson dans deux tonalités'),
      ],
      trouble: [
        L(
          'Das Abzählen verwirrt? Schreib die Tonleiter auf und kreise Ton 1, 4 und 5 ein.',
          'Counting gets confusing? Write out the scale and circle notes 1, 4 and 5.',
          'Le comptage t’embrouille ? Écris la gamme et entoure les notes 1, 4 et 5.',
        ),
        L(
          'Eine Tonart hat Griffe, die du noch nicht kannst? Dann hilft der Kapodaster – oder der Knopf „Einfache Griffe“ im Lied.',
          'A key has chords you don’t know yet? A capo helps – or the “Easy chords” button in the song.',
          'Une tonalité a des accords que tu ne connais pas encore ? Le capodastre aide – ou le bouton des accords faciles dans la chanson.',
        ),
      ],
      teacher: [
        L(
          'Einstieg: Tabelle an der Tafel – Tonart | I | IV | V. Die Gruppe füllt G, D und A gemeinsam aus.',
          'Warm-up: a table on the board – key | I | IV | V. The group fills in G, D and A together.',
          'Mise en route : un tableau – tonalité | I | IV | V. Le groupe remplit Sol, Ré et La ensemble.',
        ),
        L(
          'Übung: Die Lehrkraft ruft eine Tonart und eine Stufe („D, vier!“), alle greifen den Akkord.',
          'Practice: the teacher calls a key and a degree (“D, four!”), everyone plays the chord.',
          'Exercice : l’enseignant annonce une tonalité et un degré (« Ré, quatre ! »), tout le monde pose l’accord.',
        ),
        L(
          'Gemeinsam: Michael, Row the Boat Ashore nacheinander in G, D und A – die Gruppe stimmt ab, welche am besten zum Singen passt.',
          'Together: Michael, Row the Boat Ashore in G, D and A in turn – the group votes for the best key to sing in.',
          'Ensemble : Michael, Row the Boat Ashore en G, Ré puis La – le groupe vote pour la meilleure tonalité pour chanter.',
        ),
      ],
      sheet: [
        L('Stufen: Ton 1 = **I**, Ton 4 = **IV**, Ton 5 = **V**.', 'Degrees: note 1 = **I**, note 4 = **IV**, note 5 = **V**.', 'Degrés : note 1 = **I**, note 4 = **IV**, note 5 = **V**.'),
        L('G: G C D7 · D: D G A7 · A: A D E7', 'G: G C D7 · D: D G A7 · A: A D E7', 'Sol : G C D7 · Ré : D G A7 · La : A D E7'),
        L('Transponieren = I, IV, V der neuen Tonart einsetzen.', 'Transposing = swap in I, IV, V of the new key.', 'Transposer = mettre les I, IV, V de la nouvelle tonalité.'),
      ],
      wissen: ['transponieren'],
    },
    // ---------- 27 ----------
    {
      n: 27,
      title: L('Dein Konzert', 'Your concert', 'Ton concert'),
      goal: L(
        'Du stellst ein kleines Programm zusammen und spielst es anderen vor.',
        'You put together a little programme and play it for others.',
        'Tu prépares un petit programme et tu le joues devant d’autres.',
      ),
      review: L(
        'Letzte Woche: Transponieren. Spiel ein Lied in deiner Lieblingstonart.',
        'Last week: transposing. Play a song in your favourite key.',
        'La semaine dernière : transposer. Joue une chanson dans ta tonalité préférée.',
      ),
      steps: [
        L(
          'Such dir zwei oder drei Lieder aus, die du gern spielst – ein leichtes zum Anfangen, ein schwungvolles, ein ruhiges zum Schluss.',
          'Pick two or three songs you enjoy playing – an easy one to start, a lively one, and a calm one to finish.',
          'Choisis deux ou trois chansons que tu aimes jouer – une facile pour commencer, une entraînante, une calme pour finir.',
        ),
        L(
          'Übe die Übergänge: Lied zu Ende spielen, kurz Pause, stimmen, Ansage, nächstes Lied. Auch das gehört zum Konzert.',
          'Practise the gaps between songs: finish the song, short pause, tune, announce, next song. That’s part of a concert too.',
          'Entraîne les transitions : finir la chanson, petite pause, accorder, annoncer, chanson suivante. Ça fait aussi partie du concert.',
        ),
        L(
          'Ein Fehler? Einfach weiterspielen! Das Publikum merkt es meistens gar nicht – wichtig ist, dass der Rhythmus weiterläuft.',
          'A slip? Just keep playing! The audience usually doesn’t even notice – what matters is that the rhythm keeps going.',
          'Un raté ? Continue simplement ! Le public ne le remarque presque jamais – l’important, c’est que le rythme continue.',
        ),
        L(
          'Lust auf ein eigenes Lied? Mit [Eigenes Lied](tool:eigenes-lied) schreibst du Text und Akkorde und spielst dein Lied mit der Begleitung. Ideen: [Lieder für Anfänger](wissen:lieder-fuer-anfaenger).',
          'Fancy your own song? With [My song](tool:eigenes-lied) you write lyrics and chords and play your song with the backing. Ideas: [Songs for beginners](wissen:lieder-fuer-anfaenger).',
          'Envie de ta propre chanson ? Avec [Ma chanson](tool:eigenes-lied), tu écris paroles et accords et tu la joues avec l’accompagnement. Des idées : [Chansons pour débuter](wissen:lieder-fuer-anfaenger).',
        ),
      ],
      piece: {
        text: L(
          'Dein Programm, zum Beispiel: Auld Lang Syne in G, Freut euch des Lebens in G (im Walzer!) und dein Lieblingslied aus dem Kurs. Applaus!',
          'Your programme, for example: Auld Lang Syne in G, Freut euch des Lebens in G (as a waltz!) and your favourite song from the course. Applause!',
          'Ton programme, par exemple : Auld Lang Syne en G, Freut euch des Lebens en G (en valse !) et ta chanson préférée du cours. Bravo !',
        ),
        play: [{ song: 'auld-lang-syne', key: 'G' }, { song: 'freut-euch-des-lebens', key: 'G' }, { tool: 'eigenes-lied' }],
      },
      homework: [
        L('Jeden Tag zuerst stimmen.', 'Tune first every day.', 'Chaque jour, accorde d’abord.'),
        L('Tag 1: Programm aus zwei oder drei Liedern aufschreiben.', 'Day 1: write down a programme of two or three songs.', 'Jour 1 : écris un programme de deux ou trois chansons.'),
        L('Tag 2–4: das Programm einmal ganz durchspielen, ohne Anhalten.', 'Days 2–4: play the whole programme once, without stopping.', 'Jours 2–4 : joue le programme en entier une fois, sans t’arrêter.'),
        L('Tag 5: Generalprobe vor einer Person.', 'Day 5: dress rehearsal in front of one person.', 'Jour 5 : répétition générale devant une personne.'),
        L('Spaß: Gestalte ein Konzertplakat mit deinen Liedern!', 'Fun: design a concert poster with your songs!', 'Pour le plaisir : dessine une affiche de concert avec tes chansons !'),
      ],
      done: [
        L('du dein Programm ohne Anhalten spielst', 'you play your programme without stopping', 'tu joues ton programme sans t’arrêter'),
        L('du es mindestens einer Person vorgespielt hast', 'you’ve played it for at least one person', 'tu l’as joué devant au moins une personne'),
      ],
      trouble: [
        L(
          'Lampenfieber? Ganz normal! Tief durchatmen, langsam anfangen – das erste Lied darf das leichteste sein.',
          'Stage fright? Totally normal! Take a deep breath and start slowly – the first song can be the easiest.',
          'Le trac ? Tout à fait normal ! Respire profondément, commence lentement – la première chanson peut être la plus facile.',
        ),
        L(
          'Die Finger zittern? Vorher fünf Minuten einspielen: Tonleiter, ein paar Akkordwechsel, dann geht es los.',
          'Fingers shaking? Warm up for five minutes first: scale, a few chord changes, then off you go.',
          'Les doigts tremblent ? Échauffe-toi cinq minutes avant : gamme, quelques changements d’accords, et c’est parti.',
        ),
      ],
      teacher: [
        L(
          'Einstieg: Jedes Kind nennt sein Lieblingslied aus dem Kurs; die Lehrkraft schreibt eine Konzert-Liste.',
          'Warm-up: each child names their favourite song from the course; the teacher writes a concert list.',
          'Mise en route : chaque enfant cite sa chanson préférée du cours ; l’enseignant établit une liste de concert.',
        ),
        L(
          'Übung: Generalprobe in kleinen Gruppen – Auftreten, Ansage, Spielen, Verbeugen.',
          'Practice: dress rehearsal in small groups – walking on, announcing, playing, bowing.',
          'Exercice : répétition générale en petits groupes – entrée, annonce, jeu, salut.',
        ),
        L(
          'Gemeinsam: Abschlusskonzert für Eltern oder eine andere Klasse, zum Schluss alle zusammen mit Auld Lang Syne.',
          'Together: a final concert for parents or another class, ending with everyone playing Auld Lang Syne.',
          'Ensemble : concert de fin pour les parents ou une autre classe, avec Auld Lang Syne tous ensemble pour finir.',
        ),
      ],
      sheet: [
        L('Zwei oder drei Lieder aussuchen: leicht, schwungvoll, ruhig.', 'Pick two or three songs: easy, lively, calm.', 'Choisis deux ou trois chansons : facile, entraînante, calme.'),
        L('Übergänge üben: Pause, stimmen, Ansage.', 'Practise the gaps: pause, tune, announce.', 'Entraîne les transitions : pause, accorder, annoncer.'),
        L('Verspielt? Einfach weiterspielen – der Rhythmus läuft weiter.', 'A slip? Just keep going – the rhythm carries on.', 'Un raté ? Continue – le rythme continue.'),
      ],
      wissen: ['lieder-fuer-anfaenger'],
    },
  ],
};
