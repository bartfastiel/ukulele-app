import type { Article } from './types.ts';

// Weihnachtslieder: leichte Lieder für die Adventszeit, nach Zahl der Akkorde sortiert.
export const WEIHNACHTEN_ARTICLES: Article[] = [
  {
    id: 'weihnachtslieder-leicht',
    slug: { de: 'leichte-weihnachtslieder', en: 'easy-christmas-songs', fr: 'chants-de-noel-faciles' },
    instruments: ['ukulele', 'gitarre', 'banjo', 'bariton', 'mandoline'],
    category: 'erste-schritte',
    published: '2026-10-11',
    title: {
      de: 'Die leichtesten Weihnachtslieder – mit zwei oder drei Akkorden',
      en: 'The easiest Christmas songs – with two or three chords',
      fr: 'Les chants de Noël les plus faciles – avec deux ou trois accords',
    },
    description: {
      de: 'Weihnachtslieder für Anfänger und Kinder: welche mit zwei Akkorden auskommen, welche mit drei – und wie du jedes Lied in eine leichte Tonart schiebst.',
      en: 'Christmas songs for beginners and kids: which ones need only two chords, which need three – and how to move any song into an easy key.',
      fr: 'Des chants de Noël pour débutants et enfants : lesquels se jouent avec deux accords, lesquels avec trois – et comment passer chaque chant dans une tonalité facile.',
    },
    blocks: [
      {
        p: {
          de: 'Im Advent möchte fast jeder ein Weihnachtslied spielen – am liebsten unter dem Tannenbaum, mit der ganzen Familie. Das klappt schon nach wenigen Wochen: Viele Weihnachtslieder kommen mit zwei oder drei Akkorden aus. Hier stehen sie, sortiert danach, wie viele Griffe du brauchst.',
          en: 'During Advent nearly everyone wants to play a Christmas song – ideally under the tree, with the whole family. You can do that after just a few weeks: many Christmas songs need only two or three chords. Here they are, sorted by how many chords you need.',
          fr: 'Pendant l’Avent, presque tout le monde a envie de jouer un chant de Noël – au pied du sapin, avec toute la famille. C’est possible après quelques semaines seulement : beaucoup de chants de Noël se jouent avec deux ou trois accords. Les voici, classés selon le nombre d’accords.',
        },
      },
      { h2: { de: 'Zwei Akkorde: C und G7', en: 'Two chords: C and G7', fr: 'Deux accords : C et G7' } },
      { chord: 'C' },
      { chord: 'G7' },
      {
        ul: [
          {
            de: '[Lasst uns froh und munter sein](lied:lasst-uns-froh) – das Nikolauslied, fröhlich und kurz',
            en: '[Lasst uns froh und munter sein](lied:lasst-uns-froh) – a short, cheerful German song for St Nicholas’ Day',
            fr: '[Lasst uns froh und munter sein](lied:lasst-uns-froh) – une chanson allemande courte et joyeuse pour la Saint-Nicolas',
          },
          {
            de: '[Still, still, still](lied:still-still-still) – ein ruhiges Wiegenlied aus Salzburg',
            en: '[Still, still, still](lied:still-still-still) – a calm lullaby from Salzburg',
            fr: '[Still, still, still](lied:still-still-still) – une berceuse douce de Salzbourg',
          },
          {
            de: '[Was soll das bedeuten](lied:was-soll-das-bedeuten) – ein Hirtenlied im Dreiertakt',
            en: '[Was soll das bedeuten](lied:was-soll-das-bedeuten) – a shepherds’ song in three-four time',
            fr: '[Was soll das bedeuten](lied:was-soll-das-bedeuten) – une chanson de bergers à trois temps',
          },
          {
            de: '[I Saw Three Ships](lied:i-saw-three-ships) – ein altes englisches Lied, das schnell im Ohr bleibt',
            en: '[I Saw Three Ships](lied:i-saw-three-ships) – an old English carol that sticks in your head',
            fr: '[I Saw Three Ships](lied:i-saw-three-ships) – un vieux chant anglais qu’on retient vite',
          },
          {
            de: '[Il est né, le divin Enfant](lied:il-est-ne) – ein fröhliches französisches Lied',
            en: '[Il est né, le divin Enfant](lied:il-est-ne) – a cheerful French carol',
            fr: '[Il est né, le divin Enfant](lied:il-est-ne) – un chant français tout joyeux',
          },
          {
            de: '[Am Weihnachtsbaum die Lichter brennen](lied:am-weihnachtsbaum) und [Tochter Zion](lied:tochter-zion)',
            en: '[Am Weihnachtsbaum die Lichter brennen](lied:am-weihnachtsbaum) and [Tochter Zion](lied:tochter-zion)',
            fr: '[Am Weihnachtsbaum die Lichter brennen](lied:am-weihnachtsbaum) et [Tochter Zion](lied:tochter-zion)',
          },
        ],
      },
      {
        tip: {
          de: 'Übe zuerst nur den Wechsel von C nach G7 und zurück, ohne Lied. In der App wartet die Begleitung an jedem Akkordwechsel auf dich – du hast also so viel Zeit, wie du brauchst.',
          en: 'First practise just the change from C to G7 and back, without a song. In the app the backing waits for you at every chord change – so you have all the time you need.',
          fr: 'Entraîne-toi d’abord seulement à passer de C à G7 et retour, sans chanson. Dans l’appli, l’accompagnement t’attend à chaque changement d’accord – tu as donc tout ton temps.',
        },
      },
      { h2: { de: 'Drei Akkorde: C, F und G7', en: 'Three chords: C, F and G7', fr: 'Trois accords : C, F et G7' } },
      { chord: 'F' },
      {
        p: {
          de: 'Mit F dazu spielst du die meisten bekannten Weihnachtslieder. Das F ist der dritte Griff, den viele Kinder lernen – danach stehen dir diese Lieder offen:',
          en: 'Add F and you can play most of the well-known Christmas songs. F is the third chord many kids learn – after that, these songs are open to you:',
          fr: 'Ajoute F et tu peux jouer la plupart des chants de Noël connus. F est le troisième accord que beaucoup d’enfants apprennent – ensuite, ces chants sont à ta portée :',
        },
      },
      {
        ul: [
          { de: '[Alle Jahre wieder](lied:alle-jahre-wieder)', en: '[Alle Jahre wieder](lied:alle-jahre-wieder)', fr: '[Alle Jahre wieder](lied:alle-jahre-wieder)' },
          { de: '[Stille Nacht, heilige Nacht](lied:stille-nacht)', en: '[Stille Nacht, heilige Nacht](lied:stille-nacht) (Silent Night)', fr: '[Stille Nacht, heilige Nacht](lied:stille-nacht) (Douce nuit)' },
          { de: '[Jingle Bells](lied:jingle-bells)', en: '[Jingle Bells](lied:jingle-bells)', fr: '[Jingle Bells](lied:jingle-bells)' },
          { de: '[Ihr Kinderlein, kommet](lied:ihr-kinderlein-kommet)', en: '[Ihr Kinderlein, kommet](lied:ihr-kinderlein-kommet)', fr: '[Ihr Kinderlein, kommet](lied:ihr-kinderlein-kommet)' },
          { de: '[O du fröhliche](lied:o-du-froehliche)', en: '[O du fröhliche](lied:o-du-froehliche)', fr: '[O du fröhliche](lied:o-du-froehliche)' },
          { de: '[Joy to the World](lied:joy-to-the-world)', en: '[Joy to the World](lied:joy-to-the-world)', fr: '[Joy to the World](lied:joy-to-the-world)' },
          { de: '[Herbei, o ihr Gläub’gen](lied:herbei-o-ihr-glaeubigen) (englisch: [O Come, All Ye Faithful](lied:o-come-all-ye-faithful)) und [The First Nowell](lied:first-nowell)', en: '[O Come, All Ye Faithful](lied:o-come-all-ye-faithful) (in German: [Herbei, o ihr Gläub’gen](lied:herbei-o-ihr-glaeubigen)) and [The First Nowell](lied:first-nowell)', fr: '[O Come, All Ye Faithful](lied:o-come-all-ye-faithful) (en allemand : [Herbei, o ihr Gläub’gen](lied:herbei-o-ihr-glaeubigen)) et [The First Nowell](lied:first-nowell)' },
        ],
      },
      { h2: { de: 'Wenn ein Griff zu schwer ist', en: 'When a chord is too hard', fr: 'Quand un accord est trop difficile' } },
      {
        p: {
          de: 'Jedes Lied lässt sich in eine andere Tonart schieben. Im Lied wählst du unter „Tonart“ eine neue – der Stern zeigt die mit den leichtesten Griffen für dein Instrument, Melodie und Tabulatur wandern mit. „Einfache Griffe“ ersetzt außerdem schwere Akkorde durch leichtere Verwandte, etwa G7 statt G.',
          en: 'Any song can be moved to another key. In the song, choose a new one under “Key” – the star marks the key with the easiest chords for your instrument, and the melody and tab move along. “Easy chords” also swaps hard chords for easier relatives, such as G7 instead of G.',
          fr: 'Chaque chant peut passer dans une autre tonalité. Dans le chant, choisis-en une nouvelle sous « Tonalité » – l’étoile montre celle aux accords les plus faciles pour ton instrument, la mélodie et la tablature suivent. « Accords faciles » remplace aussi les accords difficiles par des voisins plus simples, par exemple G7 au lieu de G.',
        },
      },
      { h2: { de: 'Noch ohne Akkorde? Eine Saite reicht', en: 'No chords yet? One string is enough', fr: 'Pas encore d’accords ? Une corde suffit' } },
      {
        p: {
          de: 'Wer ganz neu anfängt, kann eine Melodie auch auf einer einzigen Saite zupfen: Die Zahlen sagen nur, in welchem Bund der Finger liegt. Auf der Seite mit allen Weihnachtsliedern stehen dafür drei Lieder als Ein-Saiten-Tabulatur, passend zu deinem Instrument.',
          en: 'If you are just starting, you can also pluck a melody on a single string: the numbers only tell you which fret your finger goes on. The page with all Christmas songs has three songs written out for one string, made for your instrument.',
          fr: 'Si tu débutes tout juste, tu peux aussi pincer une mélodie sur une seule corde : les nombres disent seulement sur quelle case poser le doigt. La page avec tous les chants de Noël en propose trois en tablature sur une corde, adaptée à ton instrument.',
        },
      },
      { tool: 'lieder' },
    ],
    related: ['lieder-fuer-anfaenger'],
  },
];
