import type { Article } from './types.ts';

/** Andere Stimmungen und Instrument-Varianten – jeweils mit dem Weg zur Einstellung in der App. */
export const STIMMUNGEN_ARTICLES: Article[] = [
  {
    id: 'gitarre-drop-d',
    slug: { de: 'drop-d-stimmung-gitarre', en: 'drop-d-tuning-guitar', fr: 'accordage-drop-d-guitare' },
    instruments: ['gitarre'],
    category: 'technik',
    title: {
      de: 'Drop D: Die einfachste andere Stimmung für Gitarre',
      en: 'Drop D: The Easiest Alternate Tuning for Guitar',
      fr: 'Drop D : l’accordage alternatif le plus simple à la guitare',
    },
    description: {
      de: 'Drop D erklärt: nur die tiefe E-Saite einen Ganzton tiefer auf D. Powerchords mit einem Finger, Lieder in D – und so stellst du es im Stimmgerät ein.',
      en: 'Drop D explained: only the low E string goes down a whole step to D. One-finger power chords, songs in D – and how to set it up in the tuner.',
      fr: 'Le Drop D expliqué : seule la corde de E grave descend d’un ton jusqu’à D. Power chords à un doigt, chansons en D – et le réglage dans l’accordeur.',
    },
    blocks: [
      {
        p: {
          de: 'Bei **Drop D** stimmst du nur eine einzige Saite um: Die tiefe E-Saite wird einen Ganzton tiefer, auf **D**. Von tief nach hoch heißen die Saiten dann **D A D G B E**. Alle anderen Saiten bleiben, wie sie sind.',
          en: 'In **Drop D** you retune just one string: the low E string goes down a whole step to **D**. From low to high the strings are then **D A D G B E**. All the other strings stay as they are.',
          fr: 'En **Drop D**, tu ne réaccordes qu’une seule corde : la corde de E grave descend d’un ton, jusqu’à **D**. Du grave à l’aigu, les cordes deviennent **D A D G B E**. Toutes les autres restent comme avant.',
        },
      },
      { h2: { de: 'So stimmst du um', en: 'How to retune', fr: 'Comment réaccorder' } },
      {
        p: {
          de: 'Zupf die tiefe E-Saite und die D-Saite (die dritte von oben) abwechselnd. Dreh die tiefe Saite langsam lockerer, bis sie genau eine Oktave tiefer klingt als die D-Saite – die beiden klingen dann fast wie ein Ton. Noch einfacher geht es mit dem Stimmgerät.',
          en: 'Pluck the low E string and the D string (third from the top) one after the other. Slowly loosen the low string until it sounds exactly one octave below the D string – the two then almost blend into one note. It’s even easier with the tuner.',
          fr: 'Pince tour à tour la corde de E grave et la corde de D (la troisième en partant du haut). Détends doucement la corde grave jusqu’à ce qu’elle sonne exactement une octave sous la corde de D : les deux se fondent presque en une seule note. C’est encore plus simple avec l’accordeur.',
        },
      },
      { h2: { de: 'Powerchords mit einem Finger', en: 'One-finger power chords', fr: 'Des power chords avec un seul doigt' } },
      {
        p: {
          de: 'Das Besondere an Drop D: Die drei tiefsten Saiten (D A D) ergeben leer angeschlagen schon einen kräftigen **Powerchord** (D5). Legst du einen Finger quer über diese drei Saiten im selben Bund, verschiebst du den Akkord: im 2. Bund klingt E5, im 3. Bund F5, im 5. Bund G5, im 7. Bund A5. Die drei hohen Saiten schlägst du dabei nicht an. So klingen viele Rocklieder.',
          en: 'What makes Drop D special: the three lowest strings (D A D) played open already make a strong **power chord** (D5). Lay one finger across those three strings at the same fret and the chord moves: fret 2 gives E5, fret 3 F5, fret 5 G5, fret 7 A5. Don’t play the three high strings. Lots of rock songs sound just like this.',
          fr: 'Ce qui rend le Drop D spécial : les trois cordes les plus graves (D A D), jouées à vide, forment déjà un **power chord** puissant (D5). Pose un doigt à plat sur ces trois cordes dans la même case et l’accord se déplace : case 2 = E5, case 3 = F5, case 5 = G5, case 7 = A5. Ne joue pas les trois cordes aiguës. Beaucoup de morceaux rock sonnent exactement comme ça.',
        },
      },
      { h2: { de: 'Was sich bei den Griffen ändert', en: 'What changes in your chords', fr: 'Ce qui change pour les accords' } },
      {
        p: {
          de: 'Alle Griffe, die die tiefe E-Saite nicht benutzen, bleiben genau gleich – zum Beispiel [C](chord:C), [A](chord:A) und [Am](chord:Am). Nur wenn die tiefe Saite mitklingt, greifst du dort zwei Bünde höher: [E](chord:E) wird von tief nach hoch zu **2 2 2 1 0 0**. Bei [G](chord:G) wäre das zu weit gespreizt – nimm einfach die vier hohen Saiten (**x x 0 0 0 3**) oder für vollen Klang **5 5 0 0 0 3**. Dafür klingt [D](chord:D) jetzt mit allen sechs Saiten richtig voll (**0 0 0 2 3 2**) – Lieder in D lieben diese Stimmung.',
          en: 'Every chord that doesn’t use the low E string stays exactly the same – for example [C](chord:C), [A](chord:A) and [Am](chord:Am). Only where the low string rings along do you fret it two frets higher: [E](chord:E) becomes **2 2 2 1 0 0** from low to high. For [G](chord:G) that would be too much of a stretch – just play the four high strings (**x x 0 0 0 3**) or, for a full sound, **5 5 0 0 0 3**. In return, [D](chord:D) now sounds really full on all six strings (**0 0 0 2 3 2**) – songs in D love this tuning.',
          fr: 'Tous les accords qui n’utilisent pas la corde de E grave restent exactement pareils, par exemple [C](chord:C), [A](chord:A) et [Am](chord:Am). Seulement quand la corde grave sonne aussi, tu l’appuies deux cases plus haut : [E](chord:E) devient **2 2 2 1 0 0** du grave à l’aigu. Pour [G](chord:G), l’écart serait trop grand : joue simplement les quatre cordes aiguës (**x x 0 0 0 3**) ou, pour un son plein, **5 5 0 0 0 3**. En échange, [D](chord:D) sonne maintenant bien plein sur les six cordes (**0 0 0 2 3 2**) : les chansons en D adorent cet accordage.',
        },
      },
      { h2: { de: 'In der App einstellen', en: 'Setting it up in the app', fr: 'Le réglage dans l’appli' } },
      {
        p: {
          de: 'Öffne das [Stimmgerät](tool:stimmen), tippe unten auf **„Andere Stimmung …“** und wähle **„Drop D“**. Dann zeigen Stimmgerät, Griffbilder, Lieder und der Blues-Hals diese Stimmung, und oben auf jeder Seite steht ein Hinweis. Mit **„Zurück zur Normalstimmung“** ist alles wieder wie vorher.',
          en: 'Open the [tuner](tool:stimmen), tap **“Other tuning …”** at the bottom and choose **“Drop D”**. The tuner, chord charts, songs and the blues neck then follow this tuning, and a note appears at the top of every page. **“Back to standard tuning”** puts everything back.',
          fr: 'Ouvre l’[accordeur](tool:stimmen), touche **« Autre accordage … »** en bas et choisis **« Drop D »**. L’accordeur, les diagrammes, les chansons et le manche du blues suivent alors cet accordage, et un message s’affiche en haut de chaque page. **« Revenir à l’accordage standard »** remet tout comme avant.',
        },
      },
      { tool: 'stimmen' },
      {
        tip: {
          de: 'Wenn du fertig bist, stimm die tiefe Saite wieder hoch auf E. In der Schule und in den meisten Heften wird mit der Normalstimmung gespielt.',
          en: 'When you’re done, tune the low string back up to E. School classes and most books use standard tuning.',
          fr: 'Quand tu as fini, remonte la corde grave jusqu’à E. À l’école et dans la plupart des méthodes, on joue en accordage standard.',
        },
      },
    ],
    related: ['gitarre-stimmen', 'e-gitarre-powerchords', 'gitarre-open-g', 'gitarre-dadgad'],
  },
  {
    id: 'gitarre-open-g',
    slug: { de: 'open-g-stimmung-gitarre', en: 'open-g-tuning-guitar', fr: 'accordage-open-g-guitare' },
    instruments: ['gitarre'],
    category: 'technik',
    title: {
      de: 'Open G: Gitarre so stimmen, dass alle Saiten leer G-Dur klingen',
      en: 'Open G Tuning: All Open Strings Sound a G Chord',
      fr: 'Open G : accorder la guitare pour que les cordes à vide sonnent en G',
    },
    description: {
      de: 'Open G (D G D G B D): Alle Saiten leer sind schon G-Dur, C und D sind ein Finger quer im 5. und 7. Bund. Ideal für Blues, Rock und Bottleneck.',
      en: 'Open G (D G D G B D): all open strings already make G major; C and D are one finger across frets 5 and 7. Great for blues, rock and slide.',
      fr: 'Open G (D G D G B D) : les cordes à vide forment déjà un sol majeur, C et D sont un doigt à plat en cases 5 et 7. Idéal pour le blues, le rock et le slide.',
    },
    blocks: [
      {
        p: {
          de: 'Bei **Open G** sind die Saiten von tief nach hoch auf **D G D G B D** gestimmt. Schlägst du alle sechs Saiten leer an, erklingt schon ein vollständiger **G-Dur-Akkord**. Deshalb heißt die Stimmung „offen“: Du musst gar nichts greifen.',
          en: 'In **Open G** the strings are tuned **D G D G B D** from low to high. Strum all six open strings and you already hear a complete **G major chord**. That’s why it’s called “open”: you don’t have to fret anything.',
          fr: 'En **Open G**, les cordes sont accordées **D G D G B D** du grave à l’aigu. Gratte les six cordes à vide et tu entends déjà un **accord de sol majeur** complet. D’où le nom « ouvert » : tu n’as rien à appuyer.',
        },
      },
      { h2: { de: 'Umstimmen aus der Normalstimmung', en: 'Retuning from standard', fr: 'Réaccorder depuis l’accordage standard' } },
      {
        ul: [
          {
            de: 'tiefe E-Saite einen Ganzton tiefer auf **D**',
            en: 'low E string down a whole step to **D**',
            fr: 'corde de E grave un ton plus bas, sur **D**',
          },
          { de: 'A-Saite einen Ganzton tiefer auf **G**', en: 'A string down a whole step to **G**', fr: 'corde de A un ton plus bas, sur **G**' },
          { de: 'D-, G- und B-Saite bleiben', en: 'D, G and B strings stay the same', fr: 'les cordes de D, G et B ne changent pas' },
          {
            de: 'hohe E-Saite einen Ganzton tiefer auf **D**',
            en: 'high E string down a whole step to **D**',
            fr: 'corde de E aiguë un ton plus bas, sur **D**',
          },
        ],
      },
      { h2: { de: 'Akkorde mit einem Finger', en: 'Chords with one finger', fr: 'Des accords avec un seul doigt' } },
      {
        p: {
          de: 'Weil alle Saiten leer schon G-Dur ergeben, ist jeder andere Dur-Akkord einfach der **Zeigefinger quer über alle Saiten** in einem Bund:',
          en: 'Because the open strings already make G major, every other major chord is simply your **index finger across all strings** at one fret:',
          fr: 'Comme les cordes à vide donnent déjà sol majeur, tout autre accord majeur est simplement **l’index à plat sur toutes les cordes** dans une case :',
        },
      },
      {
        ul: [
          { de: '**G:** alle Saiten leer', en: '**G:** all strings open', fr: '**G :** toutes les cordes à vide' },
          { de: '**C:** Zeigefinger quer im 5. Bund', en: '**C:** index finger across fret 5', fr: '**C :** index à plat en case 5' },
          { de: '**D:** Zeigefinger quer im 7. Bund', en: '**D:** index finger across fret 7', fr: '**D :** index à plat en case 7' },
          { de: '**G eine Oktave höher:** quer im 12. Bund', en: '**G an octave higher:** across fret 12', fr: '**G une octave plus haut :** à plat en case 12' },
        ],
      },
      {
        p: {
          de: 'Mit G, C und D kannst du schon einen ganzen [Zwölf-Takt-Blues](wissen:zwoelf-takt-blues) spielen. Open G ist deshalb beliebt für Blues und Rock – und für das Spiel mit dem **Bottleneck**, einem glatten Röhrchen, das über die Saiten gleitet (mehr dazu bei [Open D und Open E](wissen:gitarre-open-d-open-e)).',
          en: 'With G, C and D you can already play a whole [twelve-bar blues](wissen:zwoelf-takt-blues). That’s why Open G is popular for blues and rock – and for **slide**, a smooth tube that glides over the strings (more in [Open D and Open E](wissen:gitarre-open-d-open-e)).',
          fr: 'Avec G, C et D, tu peux déjà jouer tout un [blues en douze mesures](wissen:zwoelf-takt-blues). C’est pourquoi l’Open G est apprécié pour le blues et le rock, et pour le **bottleneck**, un tube lisse qui glisse sur les cordes (plus de détails dans [Open D et Open E](wissen:gitarre-open-d-open-e)).',
        },
      },
      { h2: { de: 'In der App einstellen', en: 'Setting it up in the app', fr: 'Le réglage dans l’appli' } },
      {
        p: {
          de: 'Im [Stimmgerät](tool:stimmen) unten auf **„Andere Stimmung …“** tippen und **„Open G“** wählen. Das Stimmgerät zeigt dann die Saiten D G D G B D, die Griffbilder zeigen die Barré-Griffe, und auch Lieder und der Blues-Hals folgen der Stimmung. Ein Hinweis oben auf jeder Seite erinnert dich daran – mit dem Knopf **„Zurück zur Normalstimmung“**.',
          en: 'In the [tuner](tool:stimmen), tap **“Other tuning …”** at the bottom and choose **“Open G”**. The tuner then shows the strings D G D G B D, the chord charts show the barre shapes, and songs and the blues neck follow the tuning too. A note at the top of every page reminds you – with the button **“Back to standard tuning”**.',
          fr: 'Dans l’[accordeur](tool:stimmen), touche **« Autre accordage … »** en bas et choisis **« Open G »**. L’accordeur affiche alors les cordes D G D G B D, les diagrammes montrent les barrés, et les chansons comme le manche du blues suivent l’accordage. Un message en haut de chaque page te le rappelle, avec le bouton **« Revenir à l’accordage standard »**.',
        },
      },
      { tool: 'stimmen' },
    ],
    related: ['gitarre-open-d-open-e', 'gitarre-drop-d', 'gitarre-barre', 'zwoelf-takt-blues'],
  },
  {
    id: 'gitarre-open-d-open-e',
    slug: { de: 'open-d-open-e-slide-gitarre', en: 'open-d-open-e-slide-guitar', fr: 'open-d-open-e-guitare-slide' },
    instruments: ['gitarre'],
    category: 'technik',
    title: {
      de: 'Open D und Open E: Stimmungen für Slide-Gitarre und Bottleneck',
      en: 'Open D and Open E: Tunings for Slide Guitar',
      fr: 'Open D et Open E : les accordages de la guitare slide',
    },
    description: {
      de: 'Open D (D A D F# A D) und Open E (E B E G# B E) erklärt: Dur mit einem Finger, Slide mit dem Bottleneck – und wie du sie im Stimmgerät einstellst.',
      en: 'Open D (D A D F# A D) and Open E (E B E G# B E) explained: major chords with one finger, slide playing – and how to set them up in the tuner.',
      fr: 'Open D (D A D F# A D) et Open E (E B E G# B E) expliqués : accords majeurs à un doigt, jeu au bottleneck – et le réglage dans l’accordeur.',
    },
    blocks: [
      {
        p: {
          de: 'Bei beiden Stimmungen klingen alle sechs Saiten leer schon als Dur-Akkord: bei **Open D** (D A D F# A D) als D-Dur, bei **Open E** (E B E G# B E) als E-Dur. Open E ist dieselbe Stimmung wie Open D, nur zwei Bünde höher.',
          en: 'In both tunings all six open strings already sound as a major chord: **Open D** (D A D F# A D) gives D major, **Open E** (E B E G# B E) gives E major. Open E is the same tuning as Open D, just two frets higher.',
          fr: 'Dans ces deux accordages, les six cordes à vide sonnent déjà en accord majeur : **Open D** (D A D F# A D) donne ré majeur, **Open E** (E B E G# B E) donne mi majeur. L’Open E est le même accordage que l’Open D, simplement deux cases plus haut.',
        },
      },
      { h2: { de: 'Dur-Akkorde mit einem Finger', en: 'Major chords with one finger', fr: 'Accords majeurs à un doigt' } },
      {
        ul: [
          {
            de: '**Open D:** D = alle Saiten leer, G = Zeigefinger quer im 5. Bund, A = quer im 7. Bund',
            en: '**Open D:** D = all strings open, G = index finger across fret 5, A = across fret 7',
            fr: '**Open D :** D = toutes les cordes à vide, G = index à plat en case 5, A = à plat en case 7',
          },
          {
            de: '**Open E:** E = alle Saiten leer, A = Zeigefinger quer im 5. Bund, B = quer im 7. Bund',
            en: '**Open E:** E = all strings open, A = index finger across fret 5, B = across fret 7',
            fr: '**Open E :** E = toutes les cordes à vide, A = index à plat en case 5, B = à plat en case 7',
          },
        ],
      },
      { h2: { de: 'Slide-Gitarre: spielen mit dem Bottleneck', en: 'Slide guitar: playing with a slide', fr: 'La guitare slide : jouer au bottleneck' } },
      {
        p: {
          de: 'Ein **Bottleneck** (auch Slide) ist ein glattes Röhrchen aus Glas oder Metall. Du steckst es auf den kleinen Finger oder den Ringfinger. Die anderen Finger dämpfen hinter dem Röhrchen leicht die Saiten, damit nichts schnarrt.',
          en: 'A **slide** (also called bottleneck) is a smooth tube made of glass or metal. Put it on your little finger or ring finger. The other fingers rest lightly on the strings behind it so nothing buzzes.',
          fr: 'Un **bottleneck** (ou slide) est un tube lisse en verre ou en métal. Tu l’enfiles sur l’auriculaire ou l’annulaire. Les autres doigts effleurent les cordes derrière le tube pour que rien ne frise.',
        },
      },
      {
        ol: [
          {
            de: 'Leg das Röhrchen nur **sanft** auf die Saiten – nicht bis aufs Griffbrett drücken.',
            en: 'Rest the slide **gently** on the strings – don’t press them down to the fretboard.',
            fr: 'Pose le tube **doucement** sur les cordes, sans les enfoncer jusqu’à la touche.',
          },
          {
            de: 'Halte es **genau über dem Bundstäbchen**, nicht dazwischen. Sonst klingt der Ton zu tief.',
            en: 'Hold it **right above the fret wire**, not between frets. Otherwise the note sounds flat.',
            fr: 'Tiens-le **juste au-dessus de la frette**, pas entre deux. Sinon la note sonne trop bas.',
          },
          {
            de: 'Gleite von einem Bund zum nächsten: Über dem 5. Bund klingt der Akkord eine Quarte höher, über dem 12. eine Oktave.',
            en: 'Glide from one fret to the next: above fret 5 the chord sounds a fourth higher, above fret 12 an octave higher.',
            fr: 'Glisse d’une case à l’autre : au-dessus de la case 5, l’accord sonne une quarte plus haut, au-dessus de la case 12 une octave plus haut.',
          },
        ],
      },
      {
        tip: {
          de: 'Für Open E werden drei Saiten **höher** gestimmt als sonst. Das spannt die Saiten und den Hals stärker. Bist du oder ein Erwachsener unsicher, nimm lieber **Open D** – und setz für den Klang von Open E einen Kapodaster in den 2. Bund.',
          en: 'For Open E, three strings are tuned **higher** than usual. That puts more tension on the strings and the neck. If you or an adult aren’t sure, use **Open D** instead – and put a capo on fret 2 to get the sound of Open E.',
          fr: 'Pour l’Open E, trois cordes sont accordées **plus haut** que d’habitude. Les cordes et le manche sont alors plus tendus. Si toi ou un adulte avez un doute, prends plutôt l’**Open D**, et mets un capodastre en case 2 pour obtenir le son de l’Open E.',
        },
      },
      { h2: { de: 'In der App einstellen', en: 'Setting it up in the app', fr: 'Le réglage dans l’appli' } },
      {
        p: {
          de: 'Tippe im [Stimmgerät](tool:stimmen) unten auf **„Andere Stimmung …“** und wähle **„Open D“** oder **„Open E“**. Stimmgerät, Griffbilder, Lieder und der Blues-Hals folgen dann dieser Stimmung. Oben auf jeder Seite erinnert dich ein Hinweis daran; **„Zurück zur Normalstimmung“** stellt alles zurück.',
          en: 'In the [tuner](tool:stimmen), tap **“Other tuning …”** at the bottom and choose **“Open D”** or **“Open E”**. The tuner, chord charts, songs and the blues neck then follow that tuning. A note at the top of every page reminds you; **“Back to standard tuning”** sets everything back.',
          fr: 'Dans l’[accordeur](tool:stimmen), touche **« Autre accordage … »** en bas et choisis **« Open D »** ou **« Open E »**. L’accordeur, les diagrammes, les chansons et le manche du blues suivent alors cet accordage. Un message en haut de chaque page te le rappelle ; **« Revenir à l’accordage standard »** remet tout en place.',
        },
      },
      { tool: 'stimmen' },
    ],
    related: ['gitarre-open-g', 'gitarre-kapodaster', 'zwoelf-takt-blues', 'gitarre-stimmen'],
  },
  {
    id: 'gitarre-dadgad',
    slug: { de: 'dadgad-stimmung-gitarre', en: 'dadgad-tuning-guitar', fr: 'accordage-dadgad-guitare' },
    instruments: ['gitarre'],
    category: 'technik',
    title: {
      de: 'DADGAD: Die keltische Gitarrenstimmung einfach erklärt',
      en: 'DADGAD: The Celtic Guitar Tuning Explained Simply',
      fr: 'DADGAD : l’accordage celtique de la guitare expliqué simplement',
    },
    description: {
      de: 'DADGAD klingt offen und schwebend – typisch für irische und keltische Musik. So stimmst du um, so klingen Lieder in D und G, so stellst du es in der App ein.',
      en: 'DADGAD sounds open and floating – typical of Irish and Celtic music. How to retune, how songs in D and G sound, and how to set it up in the app.',
      fr: 'Le DADGAD sonne ouvert et flottant, typique de la musique irlandaise et celtique. Comment réaccorder, jouer en D et en G, et le régler dans l’appli.',
    },
    blocks: [
      {
        p: {
          de: 'Der Name verrät schon die Stimmung: Die Saiten heißen von tief nach hoch **D A D G A D**. Leer angeschlagen klingt das weder richtig nach Dur noch nach Moll, sondern offen und ein bisschen schwebend. Musiker nennen den Klang **Dsus4**.',
          en: 'The name already tells you the tuning: from low to high the strings are **D A D G A D**. Strummed open it sounds neither quite major nor minor, but open and a little floating. Musicians call that sound **Dsus4**.',
          fr: 'Le nom dit déjà tout : du grave à l’aigu, les cordes sont **D A D G A D**. À vide, ça ne sonne ni vraiment majeur ni mineur, mais ouvert et un peu flottant. Les musiciens appellent ce son **Dsus4**.',
        },
      },
      { h2: { de: 'Umstimmen', en: 'Retuning', fr: 'Réaccorder' } },
      {
        ul: [
          { de: 'tiefe E-Saite einen Ganzton tiefer auf **D**', en: 'low E string down a whole step to **D**', fr: 'corde de E grave un ton plus bas, sur **D**' },
          { de: 'A-, D- und G-Saite bleiben', en: 'A, D and G strings stay the same', fr: 'les cordes de A, D et G ne changent pas' },
          { de: 'B-Saite einen Ganzton tiefer auf **A**', en: 'B string down a whole step to **A**', fr: 'corde de B un ton plus bas, sur **A**' },
          { de: 'hohe E-Saite einen Ganzton tiefer auf **D**', en: 'high E string down a whole step to **D**', fr: 'corde de E aiguë un ton plus bas, sur **D**' },
        ],
      },
      { h2: { de: 'Wofür DADGAD gut ist', en: 'What DADGAD is good for', fr: 'À quoi sert le DADGAD' } },
      {
        p: {
          de: 'In **irischer und keltischer Musik** begleitet die Gitarre oft Geige, Flöte und Gesang. Die vielen leeren D- und A-Saiten klingen dabei wie ein Dudelsack-Ton, der immer mitläuft. Am besten passen Lieder in **D** und **G**. Viele Griffe sind kleiner als sonst, weil die leeren Saiten oft mitklingen dürfen.',
          en: 'In **Irish and Celtic music** the guitar often accompanies fiddle, flute and voice. The many open D and A strings sound like a bagpipe drone that keeps humming along. Songs in **D** and **G** fit best. Many chord shapes are smaller than usual because the open strings can often ring along.',
          fr: 'Dans la **musique irlandaise et celtique**, la guitare accompagne souvent le violon, la flûte et le chant. Les nombreuses cordes de D et de A à vide sonnent comme le bourdon d’une cornemuse qui ne s’arrête jamais. Les chansons en **D** et en **G** conviennent le mieux. Beaucoup de doigtés sont plus petits que d’habitude, car les cordes à vide peuvent souvent sonner avec.',
        },
      },
      {
        tip: {
          de: 'Spiel einfach mal nur die leeren Saiten und greif auf der G-Saite verschiedene Bünde dazu. So entdeckst du schnell, warum diese Stimmung zum Ausprobieren einlädt.',
          en: 'Just strum the open strings and add different frets on the G string. You’ll quickly hear why this tuning invites you to experiment.',
          fr: 'Joue simplement les cordes à vide et ajoute différentes cases sur la corde de G. Tu entendras vite pourquoi cet accordage donne envie d’essayer plein de choses.',
        },
      },
      { h2: { de: 'In der App einstellen', en: 'Setting it up in the app', fr: 'Le réglage dans l’appli' } },
      {
        p: {
          de: 'Im [Stimmgerät](tool:stimmen) unten auf **„Andere Stimmung …“** tippen und **„DADGAD“** wählen. Danach rechnet die App alle Griffbilder für DADGAD aus, auch in den Liedern und im Blues. Ein Hinweis oben auf jeder Seite zeigt die Stimmung, **„Zurück zur Normalstimmung“** schaltet zurück.',
          en: 'In the [tuner](tool:stimmen), tap **“Other tuning …”** at the bottom and choose **“DADGAD”**. The app then works out every chord chart for DADGAD, in the songs and the blues too. A note at the top of every page shows the tuning; **“Back to standard tuning”** switches back.',
          fr: 'Dans l’[accordeur](tool:stimmen), touche **« Autre accordage … »** en bas et choisis **« DADGAD »**. L’appli calcule alors tous les diagrammes pour le DADGAD, aussi dans les chansons et le blues. Un message en haut de chaque page indique l’accordage ; **« Revenir à l’accordage standard »** te ramène en arrière.',
        },
      },
      { tool: 'stimmen' },
    ],
    related: ['gitarre-drop-d', 'gitarre-open-g', 'gitarre-zupfen', 'gitarre-stimmen'],
  },
  {
    id: 'banjo-double-c-g-modal',
    slug: { de: 'banjo-double-c-g-modal-stimmung', en: 'banjo-double-c-g-modal-tuning', fr: 'banjo-accordage-double-c-g-modal' },
    instruments: ['banjo'],
    category: 'technik',
    title: {
      de: 'Banjo-Stimmungen Double C und G-Modal (Sawmill)',
      en: 'Banjo Tunings: Double C and G Modal (Sawmill)',
      fr: 'Accordages du banjo : Double C et G-Modal (Sawmill)',
    },
    description: {
      de: 'Double C (g C G C D) und G-Modal (g D G C D) für das 5-saitige Banjo: Wofür sie gut sind, wie du umstimmst und wie du sie im Stimmgerät einstellst.',
      en: 'Double C (g C G C D) and G modal (g D G C D) for 5-string banjo: what they’re good for, how to retune, and how to set them up in the tuner.',
      fr: 'Double C (g C G C D) et G-Modal (g D G C D) pour le banjo 5 cordes : à quoi ils servent, comment réaccorder et comment les régler dans l’accordeur.',
    },
    blocks: [
      {
        p: {
          de: 'Das 5-saitige Banjo ist meist auf **Open G** gestimmt (g D G B D). In der **Old-Time-Musik** – alten Tanzmelodien aus den Bergen Nordamerikas, oft zusammen mit der Fiddle gespielt – stimmen Banjospieler aber gern um, damit Melodien in anderen Tonarten leicht von der Hand gehen. Zwei Stimmungen sind besonders beliebt.',
          en: 'The 5-string banjo is usually tuned to **open G** (g D G B D). In **old-time music** – old dance tunes from the mountains of North America, often played with a fiddle – banjo players like to retune so tunes in other keys come easily. Two tunings are especially popular.',
          fr: 'Le banjo 5 cordes est généralement accordé en **Open G** (g D G B D). Dans la **musique old-time**, de vieux airs à danser venus des montagnes d’Amérique du Nord, souvent joués avec le violon, les banjoïstes aiment réaccorder pour jouer facilement dans d’autres tonalités. Deux accordages sont particulièrement appréciés.',
        },
      },
      { h2: { de: 'Double C: g C G C D', en: 'Double C: g C G C D', fr: 'Double C : g C G C D' } },
      {
        p: {
          de: 'Zwei Saiten werden zu **C**: die tiefe D-Saite einen Ganzton tiefer, die B-Saite einen Halbton höher. Damit liegen viele Melodien in **C** und **D** (mit Kapodaster) bequem. Leer angeschlagen klingt das Banjo jetzt hell und offen.',
          en: 'Two strings become **C**: the low D string goes down a whole step, the B string up a half step. That makes lots of tunes in **C** and **D** (with a capo) comfortable. Strummed open, the banjo now sounds bright and open.',
          fr: 'Deux cordes deviennent **C** : la corde de D grave descend d’un ton, la corde de B monte d’un demi-ton. Beaucoup de mélodies en **C** et en **D** (avec capodastre) deviennent alors confortables. À vide, le banjo sonne clair et ouvert.',
        },
      },
      { h2: { de: 'G-Modal (Sawmill): g D G C D', en: 'G modal (Sawmill): g D G C D', fr: 'G-Modal (Sawmill) : g D G C D' } },
      {
        p: {
          de: 'Hier ändert sich nur eine Saite: Die B-Saite wird einen Halbton höher auf **C**. Ohne B klingt das Banjo leer weder nach Dur noch nach Moll – geheimnisvoll und alt. Diese Stimmung passt zu Melodien, die zwischen Dur und Moll schweben.',
          en: 'Only one string changes here: the B string goes up a half step to **C**. Without B, the open banjo sounds neither major nor minor – mysterious and old. This tuning suits tunes that float between major and minor.',
          fr: 'Ici, une seule corde change : la corde de B monte d’un demi-ton jusqu’à **C**. Sans B, le banjo à vide ne sonne ni majeur ni mineur : mystérieux et ancien. Cet accordage convient aux mélodies qui flottent entre majeur et mineur.',
        },
      },
      {
        tip: {
          de: 'Die kurze 5. Saite bleibt in beiden Stimmungen auf **g**. Stimm um, indem du die Saite erst etwas zu tief drehst und dann langsam zum neuen Ton hoch – so hält sie besser.',
          en: 'The short 5th string stays on **g** in both tunings. When retuning, go a little below the new note first and then slowly come up to it – the string holds its tuning better that way.',
          fr: 'La petite 5e corde reste sur **g** dans les deux accordages. Pour réaccorder, descends d’abord un peu sous la nouvelle note, puis remonte doucement : la corde tient mieux l’accord.',
        },
      },
      { h2: { de: 'In der App einstellen', en: 'Setting it up in the app', fr: 'Le réglage dans l’appli' } },
      {
        p: {
          de: 'Im [Stimmgerät](tool:stimmen) unten auf **„Andere Stimmung …“** tippen. Dort stehen **„Double C“**, **„G-Modal (Sawmill)“** und **„Open D“**. Nach der Wahl stimmst du mit dem Stimmgerät auf die neuen Töne, und Griffbilder, Lieder und Blues-Hals passen dazu. Ein Hinweis oben auf jeder Seite hat den Knopf **„Zurück zur Normalstimmung“**. Bei **Open D** (f# D F# A D) wird auch die kurze 5. Saite einen Halbton tiefer auf **f#** gestimmt.',
          en: 'In the [tuner](tool:stimmen), tap **“Other tuning …”** at the bottom. You’ll find **“Double C”**, **“G-Modal (Sawmill)”** and **“Open D”** there. Once chosen, the tuner tunes to the new notes, and chord charts, songs and the blues neck follow. A note at the top of every page has the button **“Back to standard tuning”**. In **Open D** (f# D F# A D) the short 5th string also goes down a half step to **f#**.',
          fr: 'Dans l’[accordeur](tool:stimmen), touche **« Autre accordage … »** en bas. Tu y trouves **« Double C »**, **« G-Modal (Sawmill) »** et **« Open D »**. Une fois choisi, l’accordeur vise les nouvelles notes, et les diagrammes, les chansons et le manche du blues suivent. Un message en haut de chaque page propose le bouton **« Revenir à l’accordage standard »**. En **Open D** (f# D F# A D), la petite 5e corde descend aussi d’un demi-ton, sur **f#**.',
        },
      },
      { tool: 'stimmen' },
    ],
    related: ['banjo-stimmen', 'banjo-saiten', 'banjo-rolls', 'banjo-kapodaster'],
  },
  {
    id: 'ukulele-d-stimmung-tiefes-g',
    slug: { de: 'ukulele-d-stimmung-tiefes-g', en: 'ukulele-d-tuning-low-g', fr: 'ukulele-accordage-d-g-grave' },
    instruments: ['ukulele'],
    category: 'technik',
    title: {
      de: 'Ukulele mit tiefem G und in D-Stimmung: Was ist anders?',
      en: 'Ukulele with Low G and in D Tuning: What’s Different?',
      fr: 'Ukulélé avec G grave et accordage en D : qu’est-ce qui change ?',
    },
    description: {
      de: 'Tiefes G (G3) klingt voller, die D-Stimmung (A D F# B) heller. Was sich an Klang und Akkordnamen ändert und wie du beides im Stimmgerät einstellst.',
      en: 'Low G (G3) sounds fuller, D tuning (A D F# B) brighter. What changes in sound and chord names – and how to set up both in the tuner.',
      fr: 'Le G grave (G3) sonne plus plein, l’accordage en D (A D F# B) plus clair. Ce qui change pour le son et les noms d’accords, et le réglage dans l’accordeur.',
    },
    blocks: [
      {
        p: {
          de: 'Normal ist die Ukulele auf **G C E A** gestimmt, mit einem **hohen G**: Die oberste Saite klingt höher als die zweite. Daher kommt der helle, typische Ukulele-Klang. Es gibt aber zwei beliebte Abwandlungen.',
          en: 'Normally the ukulele is tuned **G C E A** with a **high G**: the top string sounds higher than the second one. That gives the bright, typical ukulele sound. But there are two popular variations.',
          fr: 'Normalement, le ukulélé est accordé **G C E A** avec un **G aigu** : la corde du haut sonne plus aigu que la deuxième. C’est ce qui donne le son clair typique du ukulélé. Mais il existe deux variantes appréciées.',
        },
      },
      { h2: { de: 'Tiefes G (Low G)', en: 'Low G', fr: 'G grave' } },
      {
        p: {
          de: 'Hier klingt die G-Saite eine **Oktave tiefer** (G3 statt G4). Dafür brauchst du eine eigene, dickere G-Saite – die normale Saite einfach lockerer zu drehen klappt nicht, sie würde schlabbern. Die **Griffe bleiben genau gleich**, nur der Klang wird voller und tiefer. Außerdem kannst du Melodien spielen, die unter das C der C-Saite gehen. Tiefes G gibt es oft auf Tenor-Ukulelen.',
          en: 'Here the G string sounds an **octave lower** (G3 instead of G4). You need a separate, thicker G string for this – just loosening the normal string doesn’t work, it would flop around. The **chord shapes stay exactly the same**; only the sound gets fuller and deeper. You can also play melodies that go below the C of the C string. Low G is common on tenor ukuleles.',
          fr: 'Ici, la corde de G sonne **une octave plus bas** (G3 au lieu de G4). Il faut pour cela une corde de G spéciale, plus épaisse : détendre simplement la corde habituelle ne marche pas, elle serait toute molle. Les **doigtés restent exactement les mêmes**, seul le son devient plus plein et plus grave. Tu peux aussi jouer des mélodies qui descendent sous le C de la corde de C. Le G grave est fréquent sur les ukulélés ténor.',
        },
      },
      { h2: { de: 'D-Stimmung: A D F# B', en: 'D tuning: A D F# B', fr: 'Accordage en D : A D F# B' } },
      {
        p: {
          de: 'Bei der **D-Stimmung** sind alle vier Saiten einen Ganzton höher: **A D F# B**. So waren früher viele Ukulelen gestimmt, und sie klingt besonders hell. Deine Finger machen dieselben Formen wie immer – aber der **Akkord heißt anders**, weil alles zwei Halbtöne höher klingt. Die Form von C (nur der Ringfinger im 3. Bund der untersten Saite, in D-Stimmung die B-Saite) ergibt in D-Stimmung **D-Dur**, die Form von G7 ergibt A7.',
          en: 'In **D tuning** all four strings are a whole step higher: **A D F# B**. Lots of ukuleles used to be tuned this way, and it sounds especially bright. Your fingers make the same shapes as always – but the **chord has a different name**, because everything sounds two half steps higher. The C shape (just the ring finger on fret 3 of the bottom string – the B string in D tuning) becomes **D major** in D tuning, and the G7 shape becomes A7.',
          fr: 'En **accordage en D**, les quatre cordes sont un ton plus haut : **A D F# B**. Autrefois, beaucoup de ukulélés étaient accordés ainsi, et le son est particulièrement clair. Tes doigts font les mêmes formes que d’habitude, mais **l’accord change de nom**, car tout sonne deux demi-tons plus haut. La forme de C (seulement l’annulaire en case 3 de la corde du bas, la corde de B en accordage en D) donne **ré majeur** en accordage en D, et la forme de G7 donne A7.',
        },
      },
      {
        tip: {
          de: 'Die D-Stimmung spannt die Saiten stärker. Dreh langsam und hör auf, wenn eine Saite sehr hart wird – frag im Zweifel einen Erwachsenen.',
          en: 'D tuning puts more tension on the strings. Turn the pegs slowly and stop if a string feels very tight – if in doubt, ask an adult.',
          fr: 'L’accordage en D tend davantage les cordes. Tourne doucement et arrête si une corde devient très dure ; en cas de doute, demande à un adulte.',
        },
      },
      { h2: { de: 'In der App einstellen', en: 'Setting it up in the app', fr: 'Le réglage dans l’appli' } },
      {
        p: {
          de: 'Im [Stimmgerät](tool:stimmen) unten auf **„Andere Stimmung …“** tippen. Dort findest du **„Tiefes G“** und **„D-Stimmung“**. Mit tiefem G stimmt das Stimmgerät die G-Saite eine Oktave tiefer, alle Griffe bleiben gleich. Mit D-Stimmung zeigen Griffbilder und Lieder die passenden Formen, und oben auf jeder Seite steht ein Hinweis mit dem Knopf **„Zurück zur Normalstimmung“**.',
          en: 'In the [tuner](tool:stimmen), tap **“Other tuning …”** at the bottom. You’ll find **“Low G”** and **“D tuning”** there. With low G, the tuner tunes the G string an octave lower and all chord shapes stay the same. With D tuning, chord charts and songs show the matching shapes, and a note at the top of every page has the button **“Back to standard tuning”**.',
          fr: 'Dans l’[accordeur](tool:stimmen), touche **« Autre accordage … »** en bas. Tu y trouves **« G grave »** et **« Accordage en D »**. Avec le G grave, l’accordeur vise la corde de G une octave plus bas et tous les doigtés restent pareils. Avec l’accordage en D, les diagrammes et les chansons montrent les bonnes formes, et un message en haut de chaque page propose le bouton **« Revenir à l’accordage standard »**.',
        },
      },
      { tool: 'stimmen' },
    ],
    related: ['ukulele-stimmen', 'ukulele-saiten', 'ukulele-groessen', 'transponieren'],
  },
  {
    id: 'gitarre-zwoelfsaitig',
    slug: { de: '12-saitige-gitarre', en: '12-string-guitar', fr: 'guitare-12-cordes' },
    instruments: ['gitarre'],
    category: 'instrument',
    title: {
      de: '12-saitige Gitarre: So funktioniert sie und so stimmst du sie',
      en: '12-String Guitar: How It Works and How to Tune It',
      fr: 'Guitare 12 cordes : comment elle fonctionne et comment l’accorder',
    },
    description: {
      de: 'Die 12-saitige Gitarre hat sechs Saitenpaare: Oktavsaiten bei E A D G, gleiche Töne bei B und E. Gleiche Griffe, besonderer Klang – und so stimmst du sie.',
      en: 'A 12-string guitar has six pairs of strings: octave strings on E A D G, unison on B and E. Same chords, a special shimmer – and how to tune it.',
      fr: 'La guitare 12 cordes a six paires de cordes : à l’octave sur E A D G, à l’unisson sur B et E. Mêmes accords, son scintillant – et comment l’accorder.',
    },
    blocks: [
      {
        p: {
          de: 'Eine **12-saitige Gitarre** hat statt sechs einzelner Saiten sechs **Saitenpaare** (Chöre). Du greifst und schlägst immer beide Saiten eines Paars zusammen an, als wäre es eine. Dadurch klingt jeder Akkord voller und glitzernder – fast wie zwei Gitarren auf einmal.',
          en: 'Instead of six single strings, a **12-string guitar** has six **pairs of strings** (courses). You always fret and strum both strings of a pair together, as if they were one. That makes every chord sound fuller and shimmering – almost like two guitars at once.',
          fr: 'Au lieu de six cordes simples, une **guitare 12 cordes** a six **paires de cordes** (des chœurs). Tu appuies et grattes toujours les deux cordes d’une paire ensemble, comme si c’était une seule. Chaque accord sonne alors plus plein et scintillant, presque comme deux guitares à la fois.',
        },
      },
      { h2: { de: 'Die Saitenpaare', en: 'The string pairs', fr: 'Les paires de cordes' } },
      {
        ul: [
          {
            de: '**E, A, D, G (die vier tiefen):** neben der normalen Saite liegt eine dünne **Oktavsaite**, die eine Oktave höher klingt.',
            en: '**E, A, D, G (the four low ones):** next to the normal string there’s a thin **octave string** that sounds an octave higher.',
            fr: '**E, A, D, G (les quatre graves) :** à côté de la corde normale se trouve une fine **corde d’octave** qui sonne une octave plus haut.',
          },
          {
            de: '**B und E (die beiden hohen):** zwei gleiche Saiten im **Einklang**, also genau gleich hoch.',
            en: '**B and E (the two high ones):** two identical strings in **unison**, tuned to exactly the same note.',
            fr: '**B et E (les deux aiguës) :** deux cordes identiques à **l’unisson**, exactement à la même hauteur.',
          },
        ],
      },
      {
        p: {
          de: 'Die **Griffe sind dieselben** wie auf der normalen Gitarre: [G](chord:G), [C](chord:C), [D](chord:D) und alle anderen. Du brauchst aber etwas mehr Kraft in den Fingern, weil du immer zwei Saiten herunterdrückst. Für das allererste Instrument ist eine 6-saitige Gitarre deshalb meist die bessere Wahl.',
          en: 'The **chord shapes are the same** as on a normal guitar: [G](chord:G), [C](chord:C), [D](chord:D) and all the others. You do need a bit more finger strength, because you always press down two strings. That’s why a 6-string guitar is usually the better choice for a very first instrument.',
          fr: 'Les **doigtés sont les mêmes** que sur une guitare normale : [G](chord:G), [C](chord:C), [D](chord:D) et tous les autres. Il faut juste un peu plus de force dans les doigts, car tu appuies toujours sur deux cordes. Pour un tout premier instrument, une guitare 6 cordes est donc souvent un meilleur choix.',
        },
      },
      { h2: { de: 'Stimmen', en: 'Tuning', fr: 'L’accordage' } },
      {
        ol: [
          {
            de: 'Stimm zuerst in jedem Paar die **dicke Saite** ganz normal (E A D G B E).',
            en: 'First tune the **thick string** of each pair as usual (E A D G B E).',
            fr: 'Accorde d’abord la **corde épaisse** de chaque paire, comme d’habitude (E A D G B E).',
          },
          {
            de: 'Dann die **Partnerin**: bei E, A, D und G eine Oktave höher, bei B und E genau gleich.',
            en: 'Then its **partner**: an octave higher for E, A, D and G, exactly the same for B and E.',
            fr: 'Puis sa **partenaire** : une octave plus haut pour E, A, D et G, exactement pareil pour B et E.',
          },
          {
            de: 'Zupf beide zusammen. Klingt es „wabernd“, ist die Partnerin noch nicht ganz genau – dreh ganz wenig, bis das Wabern verschwindet.',
            en: 'Pluck both together. If it sounds “wobbly”, the partner isn’t quite there yet – turn just a tiny bit until the wobble disappears.',
            fr: 'Pince les deux ensemble. Si ça « ondule », la partenaire n’est pas encore tout à fait juste : tourne très peu jusqu’à ce que l’ondulation disparaisse.',
          },
        ],
      },
      { h2: { de: 'In der App einstellen', en: 'Setting it up in the app', fr: 'Le réglage dans l’appli' } },
      {
        p: {
          de: 'Im [Stimmgerät](tool:stimmen) unten auf **„Meine Gitarre …“** tippen und **„12-saitige Gitarre“** einschalten. Dann erkennt das Stimmgerät auch die Oktavsaiten und sagt dir, welche Saite du gerade stimmst. Die Saiten-Knöpfe spielen jedes Paar so vor, wie es klingen soll.',
          en: 'In the [tuner](tool:stimmen), tap **“My guitar …”** at the bottom and switch on **“12-string guitar”**. The tuner then also recognises the octave strings and tells you which string you’re tuning. The string buttons play each pair the way it should sound.',
          fr: 'Dans l’[accordeur](tool:stimmen), touche **« Ma guitare … »** en bas et active **« Guitare 12 cordes »**. L’accordeur reconnaît alors aussi les cordes d’octave et t’indique quelle corde tu accordes. Les boutons des cordes font entendre chaque paire comme elle doit sonner.',
        },
      },
      { tool: 'stimmen' },
    ],
    related: ['gitarre-stimmen', 'gitarre-saiten', 'gitarre-kinder', 'e-gitarre-powerchords'],
  },
  {
    id: 'e-gitarre-powerchords',
    slug: { de: 'e-gitarre-powerchords-ziehen', en: 'electric-guitar-power-chords-bending', fr: 'guitare-electrique-power-chords-tire' },
    instruments: ['gitarre'],
    category: 'technik',
    title: {
      de: 'E-Gitarre für Einsteiger: Powerchords und Saiten ziehen',
      en: 'Electric Guitar for Beginners: Power Chords and String Bending',
      fr: 'Guitare électrique pour débuter : power chords et tirés de corde',
    },
    description: {
      de: 'E-Gitarre einfach erklärt: Tonabnehmer, Verstärker und Verzerrung, Powerchords mit zwei Fingern und das Ziehen einer Saite – mit Tipps für dein Gehör.',
      en: 'Electric guitar made simple: pickups, amp and distortion, two-finger power chords and bending a string – with tips to protect your hearing.',
      fr: 'La guitare électrique expliquée : micros, ampli et distorsion, power chords à deux doigts et tirés de corde – avec des conseils pour protéger tes oreilles.',
    },
    blocks: [
      {
        p: {
          de: 'Eine **E-Gitarre** ist fast ganz aus festem Holz und klingt ohne Strom nur leise. Unter den Saiten sitzen **Tonabnehmer**: kleine Magnete mit Draht, die das Schwingen der Stahlsaiten in ein elektrisches Signal verwandeln. Ein **Verstärker** macht daraus den lauten Klang. Stimmung und Griffe sind dieselben wie bei der Akustikgitarre.',
          en: 'An **electric guitar** is mostly solid wood and sounds quiet without power. Under the strings sit **pickups**: small magnets wrapped in wire that turn the vibration of the steel strings into an electrical signal. An **amplifier** makes it loud. Tuning and chord shapes are the same as on an acoustic guitar.',
          fr: 'Une **guitare électrique** est presque entièrement en bois plein et sonne faiblement sans courant. Sous les cordes se trouvent des **micros** : de petits aimants entourés de fil qui transforment la vibration des cordes en acier en signal électrique. Un **ampli** rend le son puissant. L’accordage et les doigtés sont les mêmes que sur une guitare acoustique.',
        },
      },
      {
        p: {
          de: 'Viele Verstärker haben eine **Verzerrung** (Overdrive, Distortion). Sie macht den Ton rau, kräftig und lang klingend – der typische Rock-Klang. Mit Verzerrung klingen volle Akkorde schnell matschig. Deshalb spielt man gern **Powerchords**.',
          en: 'Many amps have **distortion** (overdrive). It makes the sound rough, powerful and long-ringing – the typical rock sound. With distortion, full chords quickly sound muddy. That’s why players love **power chords**.',
          fr: 'Beaucoup d’amplis ont une **distorsion** (overdrive). Elle rend le son rugueux, puissant et long : le son rock typique. Avec la distorsion, les accords complets deviennent vite brouillons. C’est pour ça qu’on aime les **power chords**.',
        },
      },
      { h2: { de: 'Powerchords', en: 'Power chords', fr: 'Les power chords' } },
      {
        p: {
          de: 'Ein Powerchord hat nur **Grundton und Quinte** – keine Terz, darum ist er weder Dur noch Moll. Man schreibt ihn mit einer 5, zum Beispiel **E5**: die tiefe E-Saite leer und die A-Saite im 2. Bund. Für mehr Druck nimmst du die D-Saite im 2. Bund dazu, das ist der Grundton eine Oktave höher.',
          en: 'A power chord has only the **root and the fifth** – no third, so it’s neither major nor minor. It’s written with a 5, for example **E5**: the low E string open and the A string at fret 2. For more punch, add the D string at fret 2 – that’s the root an octave higher.',
          fr: 'Un power chord n’a que la **fondamentale et la quinte**, sans tierce : il n’est donc ni majeur ni mineur. On l’écrit avec un 5, par exemple **E5** : la corde de E grave à vide et la corde de A en case 2. Pour plus de punch, ajoute la corde de D en case 2 : c’est la fondamentale une octave plus haut.',
        },
      },
      {
        p: {
          de: 'Das Schöne: Die Form lässt sich verschieben. Zeigefinger auf der tiefen E-Saite, Ringfinger zwei Bünde höher auf der A-Saite. Im 3. Bund ist das **G5**, im 5. Bund **A5**, im 7. Bund **B5**. Schlag nur diese Saiten an und dämpf die anderen leicht mit der Hand ab. In [Drop D](wissen:gitarre-drop-d) geht ein Powerchord sogar mit einem einzigen Finger.',
          en: 'The great thing: the shape can move. Index finger on the low E string, ring finger two frets higher on the A string. At fret 3 that’s **G5**, at fret 5 **A5**, at fret 7 **B5**. Only strum those strings and lightly mute the others with your hand. In [Drop D](wissen:gitarre-drop-d) a power chord even works with a single finger.',
          fr: 'Le plus chouette : la forme se déplace. Index sur la corde de E grave, annulaire deux cases plus haut sur la corde de A. En case 3, c’est **G5**, en case 5 **A5**, en case 7 **B5**. Ne gratte que ces cordes et étouffe légèrement les autres avec la main. En [Drop D](wissen:gitarre-drop-d), un power chord se joue même avec un seul doigt.',
        },
      },
      { h2: { de: 'Saiten ziehen (Bending)', en: 'Bending strings', fr: 'Tirer les cordes (bend)' } },
      {
        p: {
          de: 'Beim **Ziehen** schiebst du eine gegriffene Saite quer über das Griffbrett. Dadurch wird sie straffer und der Ton steigt – wie eine singende Stimme. Am besten geht es auf der **G- oder B-Saite**: Ringfinger im Bund, Mittel- und Zeigefinger helfen dahinter mit. Zieh so weit, bis der Ton einen **Ganzton** höher klingt, also so hoch wie zwei Bünde weiter. Die dünnen Stahlsaiten der E-Gitarre machen das leicht.',
          en: 'When **bending**, you push a fretted string sideways across the fretboard. It gets tighter and the note rises – like a singing voice. It works best on the **G or B string**: ring finger on the fret, middle and index fingers helping behind it. Push until the note sounds a **whole step** higher – as high as two frets further up. The thin steel strings of an electric guitar make this easy.',
          fr: 'Pour un **tiré** (bend), tu pousses une corde appuyée sur le côté, à travers la touche. Elle se tend et la note monte, comme une voix qui chante. Ça marche le mieux sur la **corde de G ou de B** : annulaire dans la case, majeur et index qui aident derrière. Pousse jusqu’à ce que la note sonne un **ton** plus haut, aussi haut que deux cases plus loin. Les fines cordes en acier de la guitare électrique rendent ça facile.',
        },
      },
      {
        tip: {
          de: 'Schütz dein Gehör: Dreh den Verstärker nur so laut, dass du dich daneben noch gut unterhalten kannst. Mit Kopfhörern gilt dasselbe.',
          en: 'Protect your hearing: only turn the amp up so loud that you could still talk comfortably next to it. The same goes for headphones.',
          fr: 'Protège tes oreilles : ne monte l’ampli que jusqu’au point où tu peux encore discuter tranquillement à côté. C’est pareil avec un casque.',
        },
      },
      { h2: { de: 'In der App einstellen', en: 'Setting it up in the app', fr: 'Le réglage dans l’appli' } },
      {
        p: {
          de: 'Im [Stimmgerät](tool:stimmen) unten auf **„Meine Gitarre …“** tippen. Dort wählst du den Klang: **„Konzertgitarre (Nylon)“**, **„Westerngitarre (Stahl)“** oder **„E-Gitarre“**. Mit E-Gitarre klingen Lieder, Akkorde und der [Blues](tool:blues) verzerrt – dort kannst du auch das Ziehen ausprobieren.',
          en: 'In the [tuner](tool:stimmen), tap **“My guitar …”** at the bottom. There you choose the sound: **“Classical guitar (nylon)”**, **“Steel-string acoustic”** or **“Electric guitar”**. With electric guitar, songs, chords and the [blues](tool:blues) sound distorted – and you can try bending there too.',
          fr: 'Dans l’[accordeur](tool:stimmen), touche **« Ma guitare … »** en bas. Tu y choisis le son : **« Guitare classique (nylon) »**, **« Guitare folk (acier) »** ou **« Guitare électrique »**. Avec la guitare électrique, les chansons, les accords et le [blues](tool:blues) sonnent saturés, et tu peux aussi y essayer les tirés.',
        },
      },
      { tool: 'blues' },
    ],
    related: ['gitarre-drop-d', 'zwoelf-takt-blues', 'gitarre-barre', 'gitarre-zwoelfsaitig'],
  },
  {
    id: 'ukulele-groessen',
    slug: { de: 'ukulele-groessen-sopran-konzert-tenor', en: 'ukulele-sizes-soprano-concert-tenor', fr: 'tailles-ukulele-soprano-concert-tenor' },
    instruments: ['ukulele'],
    category: 'instrument',
    title: {
      de: 'Sopran, Konzert oder Tenor? Ukulele-Größen im Vergleich',
      en: 'Soprano, Concert or Tenor? Ukulele Sizes Compared',
      fr: 'Soprano, concert ou ténor ? Les tailles de ukulélé comparées',
    },
    description: {
      de: 'Sopran-, Konzert- und Tenor-Ukulele: Längen, Klang und für wen welche passt. Alle drei sind gleich gestimmt (G C E A) und haben dieselben Griffe.',
      en: 'Soprano, concert and tenor ukulele: lengths, sound and who each one suits. All three are tuned the same (G C E A) and use the same chord shapes.',
      fr: 'Ukulélé soprano, concert et ténor : longueurs, son et pour qui. Les trois s’accordent pareil (G C E A) et utilisent les mêmes doigtés.',
    },
    blocks: [
      {
        p: {
          de: 'Ukulelen gibt es in mehreren Größen. Die drei häufigsten sind **Sopran**, **Konzert** und **Tenor**. Das Gute: Sie werden alle gleich gestimmt (**G C E A**), und alle Griffe sind dieselben. Was du auf der einen lernst, kannst du sofort auf der anderen spielen.',
          en: 'Ukuleles come in several sizes. The three most common are **soprano**, **concert** and **tenor**. The good news: they’re all tuned the same (**G C E A**), and every chord shape is the same. Whatever you learn on one, you can play right away on another.',
          fr: 'Les ukulélés existent en plusieurs tailles. Les trois plus courantes sont **soprano**, **concert** et **ténor**. La bonne nouvelle : elles s’accordent toutes pareil (**G C E A**), et tous les doigtés sont identiques. Ce que tu apprends sur l’une, tu peux le jouer tout de suite sur l’autre.',
        },
      },
      { h2: { de: 'Die Größen', en: 'The sizes', fr: 'Les tailles' } },
      {
        ul: [
          {
            de: '**Sopran** (etwa 53 cm lang): die kleinste und klassische Ukulele, heller, typischer Klang. Ideal für kleine Hände und Schulklassen.',
            en: '**Soprano** (about 53 cm long): the smallest, classic ukulele with a bright, typical sound. Ideal for small hands and school classes.',
            fr: '**Soprano** (environ 53 cm) : le plus petit ukulélé, le classique, au son clair typique. Idéal pour les petites mains et les classes.',
          },
          {
            de: '**Konzert** (etwa 58 cm): etwas größer, mehr Platz zwischen den Bünden, etwas lauter und runder. Gut für größere Kinder und Erwachsene.',
            en: '**Concert** (about 58 cm): a little bigger, more room between frets, a bit louder and rounder. Good for older kids and adults.',
            fr: '**Concert** (environ 58 cm) : un peu plus grand, plus d’espace entre les cases, un son un peu plus fort et plus rond. Bien pour les enfants plus grands et les adultes.',
          },
          {
            de: '**Tenor** (etwa 66 cm): voller, wärmerer Klang und mehr Bünde. Tenor-Ukulelen werden oft auch mit **tiefem G** gespielt.',
            en: '**Tenor** (about 66 cm): a fuller, warmer sound and more frets. Tenor ukuleles are often played with a **low G** too.',
            fr: '**Ténor** (environ 66 cm) : un son plus plein et plus chaud, et plus de cases. Les ukulélés ténor se jouent souvent aussi avec un **G grave**.',
          },
        ],
      },
      {
        p: {
          de: 'Dann gibt es noch die **Bariton-Ukulele**. Sie ist noch größer und anders gestimmt (D G B E, wie die vier hohen Gitarrensaiten). Dieselbe Fingerform heißt dort anders als auf den drei kleineren Ukulelen.',
          en: 'There’s also the **baritone ukulele**. It’s even bigger and tuned differently (D G B E, like the four highest guitar strings). The same finger shape has a different chord name there than on the three smaller ukuleles.',
          fr: 'Il existe aussi le **ukulélé baryton**. Il est encore plus grand et accordé autrement (D G B E, comme les quatre cordes aiguës de la guitare). La même forme de doigts y porte un autre nom d’accord que sur les trois ukulélés plus petits.',
        },
      },
      {
        tip: {
          de: 'Für den Anfang in der Schule passt fast immer die Sopran-Ukulele. Wenn die Finger an den Bünden eng aneinanderstoßen, probier im Musikgeschäft eine Konzert-Ukulele.',
          en: 'For starting out at school, a soprano ukulele almost always fits. If your fingers bump into each other at the frets, try a concert ukulele in a music shop.',
          fr: 'Pour commencer à l’école, le ukulélé soprano convient presque toujours. Si tes doigts se cognent entre les cases, essaie un ukulélé concert dans un magasin de musique.',
        },
      },
      { h2: { de: 'In der App', en: 'In the app', fr: 'Dans l’appli' } },
      {
        p: {
          de: 'Das [Stimmgerät](tool:stimmen) und alle Griffbilder gelten für Sopran, Konzert und Tenor gleich – du musst nichts umstellen. Spielst du eine Ukulele mit tiefem G, tippe im Stimmgerät unten auf **„Andere Stimmung …“** und wähle **„Tiefes G“** (mehr dazu bei [tiefem G und D-Stimmung](wissen:ukulele-d-stimmung-tiefes-g)).',
          en: 'The [tuner](tool:stimmen) and all chord charts work the same for soprano, concert and tenor – there’s nothing to change. If your ukulele has a low G, tap **“Other tuning …”** at the bottom of the tuner and choose **“Low G”** (more in [low G and D tuning](wissen:ukulele-d-stimmung-tiefes-g)).',
          fr: 'L’[accordeur](tool:stimmen) et tous les diagrammes valent pareil pour le soprano, le concert et le ténor : tu n’as rien à changer. Si ton ukulélé a un G grave, touche **« Autre accordage … »** en bas de l’accordeur et choisis **« G grave »** (plus de détails dans [G grave et accordage en D](wissen:ukulele-d-stimmung-tiefes-g)).',
        },
      },
      { tool: 'stimmen' },
    ],
    related: ['ukulele-kinder', 'ukulele-saiten', 'ukulele-d-stimmung-tiefes-g', 'ukulele-stimmen'],
  },
];
