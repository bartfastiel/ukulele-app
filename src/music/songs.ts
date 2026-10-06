import { parseSong, type Song, type SongSource } from './song.ts';
import { CHORD_SONGS } from './songs-chordpro.ts';
import { KINDER_SONGS } from './songs-kinder.ts';
import { ENGLISH_SONGS } from './songs-english.ts';
import { MELODIES } from './songs-melodies.ts';

const PD = 'gemeinfrei';

export const SONG_SOURCES: SongSource[] = [
  {
    id: 'bruder-jakob',
    category: 'kinder',
    title: 'Bruder Jakob',
    origin: `Traditionell, ${PD}`,
    meter: 4,
    bpm: 100,
    text: `
[F]Bru-:F4 der:G4 Ja-:A4 kob,:F4 | Bru-:F4 der:G4 Ja-:A4 kob,:F4 |
schläfst:A4 du:Bb4 noch?:C5:2 | schläfst:A4 du:Bb4 noch?:C5:2 |
Hörst:C5:0.5 du:D5:0.5 nicht:C5:0.5 die:Bb4:0.5 Glo-:A4 cken?:F4 | Hörst:C5:0.5 du:D5:0.5 nicht:C5:0.5 die:Bb4:0.5 Glo-:A4 cken?:F4 |
Ding,:F4 dang,:C4 dong.:F4:2 | Ding,:F4 dang,:C4 dong.:F4:2 |`,
  },
  {
    id: 'row-row',
    category: 'english',
    title: 'Row, Row, Row Your Boat',
    origin: `Traditionell (England), ${PD}`,
    meter: 4,
    bpm: 90,
    text: `
[C]Row,:C4 row,:C4 row:C4:0.75 your:D4:0.25 boat:E4 | gent-:E4:0.75 ly:D4:0.25 down:E4:0.75 the:F4:0.25 stream.:G4:2 |
Mer-:C5:1/3 ri-:C5:1/3 ly,:C5:1/3 mer-:G4:1/3 ri-:G4:1/3 ly,:G4:1/3 mer-:E4:1/3 ri-:E4:1/3 ly,:E4:1/3 mer-:C4:1/3 ri-:C4:1/3 ly,:C4:1/3 | [G7]life:G4:0.75 is:F4:0.25 but:E4:0.75 a:D4:0.25 [C]dream.:C4:2 |
Row,:C4 row,:C4 row:C4:0.75 your:D4:0.25 boat:E4 | gent-:E4:0.75 ly:D4:0.25 down:E4:0.75 the:F4:0.25 stream.:G4:2 |
Mer-:C5:1/3 ri-:C5:1/3 ly,:C5:1/3 mer-:G4:1/3 ri-:G4:1/3 ly,:G4:1/3 mer-:E4:1/3 ri-:E4:1/3 ly,:E4:1/3 mer-:C4:1/3 ri-:C4:1/3 ly,:C4:1/3 | [G7]life:G4:0.75 is:F4:0.25 but:E4:0.75 a:D4:0.25 [C]dream.:C4:2 |`,
  },
  {
    id: 'haenschen-klein',
    category: 'kinder',
    title: 'Hänschen klein',
    origin: `Traditionell, Text Franz Wiedemann (1860), ${PD}`,
    meter: 4,
    bpm: 100,
    text: `
[C]Häns-:G4 chen:E4 klein:E4:2 | [G7]ging:F4 al-:D4 lein:D4:2 | [C]in:C4 die:D4 wei-:E4 te:F4 | Welt:G4 hin-:G4 ein.:G4:2 |
Stock:G4 und:E4 Hut:E4:2 | [G7]steht:F4 ihm:D4 gut,:D4:2 | [C]ist:C4 gar:E4 wohl-:G4 ge-:G4 | mut.:C4:4 |
[G7]A-:D4 ber:D4 Mut-:D4 ter:D4 | wei-:D4 net:E4 sehr,:F4:2 | [C]hat:E4 ja:E4 nun:E4 kein:E4 | Häns-:E4 chen:F4 mehr.:G4:2 |
Da:G4 be-:E4 sinnt:E4:2 | [G7]sich:F4 das:D4 Kind,:D4:2 | [C]eilt:C4 nach:E4 Haus:G4 ge-:G4 | schwind.:C4:4 |`,
  },
  {
    id: 'alle-meine-entchen',
    category: 'kinder',
    title: 'Alle meine Entchen',
    origin: `Traditionell, ${PD}`,
    meter: 4,
    bpm: 100,
    text: `
[C]Al-:C4 le:D4 mei-:E4 ne:F4 | Ent-:G4:2 chen:G4:2 |
[F]schwim-:A4 men:A4 auf:A4 dem:A4 | [C]See,:G4:4 |
[F]schwim-:A4 men:A4 auf:A4 dem:A4 | [C]See.:G4:4 |
[G7]Köpf-:F4 chen:F4 in:F4 das:F4 | [C]Was-:E4:2 ser,:E4:2 |
[G7]Schwänz-:D4 chen:D4 in:D4 die:D4 | [C]Höh.:C4:4 |`,
  },
  {
    id: 'ode-an-die-freude',
    originalKey: 'D',
    category: 'lagerfeuer',
    title: 'Ode an die Freude',
    origin: `Ludwig van Beethoven / Friedrich Schiller, ${PD}`,
    meter: 4,
    bpm: 100,
    text: `
[F]Freu-:A4 de,:A4 schö-:Bb4 ner:C5 | [C7]Göt-:C5 ter-:Bb4 fun-:A4 ken,:G4 | [F]Toch-:F4 ter:F4 aus:G4 E-:A4 | [C7]ly-:A4:1.5 si-:G4:0.5 um,:G4:2 |
[F]wir:A4 be-:A4 tre-:Bb4 ten:C5 | [C7]feu-:C5 er-:Bb4 trun-:A4 ken,:G4 | [F]Himm-:F4 li-:F4 sche,:G4 dein:A4 | [C7]Hei-:G4:1.5 lig-:F4:0.5 [F]tum.:F4:2 |
[C7]Dei-:G4 ne:G4 Zau-:A4 [F]ber:F4 | [C7]bin-:G4 den:A4:0.5 ~:Bb4:0.5 wie-:A4 [F]der,:F4 | [C7]was:G4 die:A4:0.5 ~:Bb4:0.5 Mo-:A4 de:G4 | [F]streng:F4 [C7]ge-:G4 teilt;:C4:2 |
[F]al-:A4 le:A4 Men-:Bb4 schen:C5 | [C7]wer-:C5 den:Bb4 Brü-:A4 der,:G4 | [F]wo:F4 dein:F4 sanf-:G4 ter:A4 | [C7]Flü-:G4:1.5 gel:F4:0.5 [F]weilt.:F4:2 |`,
  },
  {
    id: 'twinkle',
    category: 'english',
    title: 'Twinkle, Twinkle, Little Star',
    origin: `Text Jane Taylor (1806), Melodie traditionell, ${PD}`,
    meter: 4,
    bpm: 100,
    text: `
[C]Twin-:C4 kle,:C4 twin-:G4 kle,:G4 | [F]lit-:A4 tle:A4 [C]star,:G4:2 | [F]how:F4 I:F4 [C]won-:E4 der:E4 | [G7]what:D4 you:D4 [C]are.:C4:2 |
Up:G4 a-:G4 [F]bove:F4 the:F4 | [C]world:E4 so:E4 [G7]high,:D4:2 | [C]like:G4 a:G4 [F]dia-:F4 mond:F4 | [C]in:E4 the:E4 [G7]sky.:D4:2 |
[C]Twin-:C4 kle,:C4 twin-:G4 kle,:G4 | [F]lit-:A4 tle:A4 [C]star,:G4:2 | [F]how:F4 I:F4 [C]won-:E4 der:E4 | [G7]what:D4 you:D4 [C]are.:C4:2 |`,
  },
  {
    id: 'jingle-bells',
    category: 'weihnachten',
    title: 'Jingle Bells',
    origin: `James Lord Pierpont (1857), ${PD}`,
    meter: 4,
    bpm: 110,
    text: `
[C]Jin-:E4 gle:E4 bells,:E4:2 | jin-:E4 gle:E4 bells,:E4:2 | jin-:E4 gle:G4 all:C4:1.5 the:D4:0.5 | way!:E4:4 |
[F]Oh:F4 what:F4 fun:F4:1.5 it:F4:0.5 | [C]is:F4 to:E4 ride:E4 in:E4:0.5 a:E4:0.5 | [G7]one-:E4 horse:D4 o-:D4 pen:E4 | sleigh,:D4:2 hey!:G4:2 |
[C]Jin-:E4 gle:E4 bells,:E4:2 | jin-:E4 gle:E4 bells,:E4:2 | jin-:E4 gle:G4 all:C4:1.5 the:D4:0.5 | way!:E4:4 |
[F]Oh:F4 what:F4 fun:F4 it:F4 | [C]is:F4 to:E4 ride:E4 in:E4:0.5 a:E4:0.5 | [G7]one-:G4 horse:G4 o-:F4 pen:D4 | [C]sleigh!:C4:4 |`,
  },
  {
    id: 'geburtstag',
    category: 'kinder',
    title: 'Zum Geburtstag viel Glück',
    origin: `Melodie Mildred J. Hill (1893), ${PD}`,
    meter: 3,
    bpm: 100,
    pickup: 1,
    text: `
[C]Zum:G4:0.75 Ge-:G4:0.25 | burts-:A4 tag:G4 viel:C5 | [G7]Glück,:B4:2
zum:G4:0.75 Ge-:G4:0.25 | burts-:A4 tag:G4 viel:D5 | [C]Glück,:C5:2
zum:G4:0.75 Ge-:G4:0.25 | [C7]burts-:G5 tag,:E5 lie-:C5 | [F]bes:B4 Kind,:A4
zum:F5:0.75 Ge-:F5:0.25 | [C]burts-:E5 tag:C5 [G7]viel:D5 | [C]Glück!:C5:3 |`,
  },
  {
    id: 'gcea',
    category: 'eigene',
    title: 'G-C-E-A (das Saiten-Lied)',
    origin: 'Eigenes Lied für diese App, frei verwendbar (CC0)',
    meter: 4,
    bpm: 90,
    text: `
[C]G,:G4 C,:C4 E,:E4 A!:A4 | [Am]Das:C5 sind:A4 die:A4 Sai-:C5 | [F]ten,:A4:2 die:F4 ich:A4 | [G7]mag!:G4:3 _:R |
[C]Ich:E4 spiel’:E4 sie:G4 laut,:G4 | [Am]ich:A4 spiel’:A4 sie:C5 leis’,:A4 | [F]ich:A4 spiel’:A4 für:F4 dich:A4 | [G7]und:B4 mich!:G4:3 |
[C]G,:G4 C,:C4 E,:E4 A!:A4 | [Am]Das:C5 sind:A4 die:A4 Sai-:C5 | [F]ten,:A4:2 die:F4 ich:A4 | [C]mag!:C4:3 _:R |`,
  },
  {
    id: 'mary-lamb',
    category: 'english',
    title: 'Mary Had a Little Lamb',
    origin: `Text Sarah Josepha Hale (1830), Melodie traditionell, ${PD}`,
    meter: 4,
    bpm: 100,
    text: `
[C]Ma-:E4 ry:D4 had:C4 a:D4 | lit-:E4 tle:E4 lamb,:E4:2 | [G7]lit-:D4 tle:D4 lamb,:D4:2 | [C]lit-:E4 tle:G4 lamb,:G4:2 |
Ma-:E4 ry:D4 had:C4 a:D4 | lit-:E4 tle:E4 lamb,:E4 its:E4 | [G7]fleece:D4 was:D4 white:E4 as:D4 | [C]snow.:C4:4 |
Ev-:E4 ery-:D4 where:C4 that:D4 | Ma-:E4 ry:E4 went,:E4:2 | [G7]Ma-:D4 ry:D4 went,:D4:2 | [C]Ma-:E4 ry:G4 went,:G4:2 |
Ev-:E4 ery-:D4 where:C4 that:D4 | Ma-:E4 ry:E4 went,:E4 the:E4 | [G7]lamb:D4 was:D4 sure:E4 to:D4 | [C]go.:C4:4 |`,
  },
  {
    id: 'london-bridge',
    category: 'english',
    title: 'London Bridge Is Falling Down',
    origin: `Traditionell (England), ${PD}`,
    meter: 4,
    bpm: 100,
    text: `
[C]Lon-:G4:1.5 don:A4:0.5 Bridge:G4 is:F4 | fal-:E4 ling:F4 down,:G4:2 | [G7]fal-:D4 ling:E4 down,:F4:2 | [C]fal-:E4 ling:F4 down.:G4:2 |
Lon-:G4:1.5 don:A4:0.5 Bridge:G4 is:F4 | fal-:E4 ling:F4 down,:G4:2 | [G7]my:D4:2 fair:G4:2 | [C]la-:E4 dy.:C4:3 |`,
  },
  {
    id: 'old-macdonald',
    category: 'english',
    title: 'Old MacDonald Had a Farm',
    origin: `Traditionell (England/USA), ${PD}`,
    meter: 4,
    bpm: 110,
    text: `
[F]Old:F4 Mac-:F4 Don-:F4 ald:C4 | had:D4 a:D4 farm,:C4:2 | [C7]E-:A4 I-:A4 E-:G4 I-:G4 | [F]O!:F4:3 And:C4 |
on:F4 his:F4 farm:F4 he:C4 | had:D4 a:D4 cow,:C4:2 | [C7]E-:A4 I-:A4 E-:G4 I-:G4 | [F]O!:F4:3 With:C4:0.5 a:C4:0.5 |
moo:F4 moo:F4 here,:F4 and:C4:0.5 a:C4:0.5 | moo:F4 moo:F4 there,:F4:2 |
here:F4:0.5 a:F4:0.5 moo,:F4 there:F4:0.5 a:F4:0.5 moo,:F4 | ev-:F4:0.5 ery-:F4:0.5 where:F4:0.5 a:F4:0.5 moo:F4 moo.:F4 |
Old:F4 Mac-:F4 Don-:F4 ald:C4 | had:D4 a:D4 farm,:C4:2 | [C7]E-:A4 I-:A4 E-:G4 I-:G4 | [F]O!:F4:4 |`,
  },
  {
    id: 'yankee-doodle',
    category: 'english',
    title: 'Yankee Doodle',
    origin: `Traditionell (USA, 18. Jh.), ${PD}`,
    meter: 4,
    bpm: 100,
    text: `
[F]Yan-:F4:0.5 kee:F4:0.5 Doo-:G4:0.5 dle:A4:0.5 went:F4:0.5 to:A4:0.5 town,:G4:0.5 a-:C4:0.5 | rid-:F4:0.5 ing:F4:0.5 on:G4:0.5 a:A4:0.5 po-:F4 [C7]ny,:E4 |
[F]stuck:F4:0.5 a:F4:0.5 fea-:G4:0.5 ther:A4:0.5 [C7]in:Bb4:0.5 his:A4:0.5 cap:G4:0.5 and:F4:0.5 | called:E4:0.5 it:C4:0.5 ma-:D4:0.5 ca-:E4:0.5 [F]ro-:F4 ni.:F4 |
[F]Yan-:F4:0.5 kee:F4:0.5 Doo-:G4:0.5 dle:A4:0.5 went:F4:0.5 to:A4:0.5 town,:G4:0.5 a-:C4:0.5 | rid-:F4:0.5 ing:F4:0.5 on:G4:0.5 a:A4:0.5 po-:F4 [C7]ny,:E4 |
[F]stuck:F4:0.5 a:F4:0.5 fea-:G4:0.5 ther:A4:0.5 [C7]in:Bb4:0.5 his:A4:0.5 cap:G4:0.5 and:F4:0.5 | called:E4:0.5 it:C4:0.5 ma-:D4:0.5 ca-:E4:0.5 [F]ro-:F4 ni.:F4 |`,
  },
  {
    id: 'stille-nacht',
    originalKey: 'D',
    category: 'weihnachten',
    title: 'Stille Nacht, heilige Nacht',
    origin: `Text Joseph Mohr (1816), Melodie Franz Xaver Gruber (1818), ${PD}`,
    meter: 6,
    bpm: 150,
    text: `
[C]Stil-:G4:1.5 le:A4:0.5 Nacht,:G4 ~:E4:3 | hei-:G4:1.5 li-:A4:0.5 ge:G4 Nacht!:E4:3 |
[G7]Al-:D5:2 les:D5 schläft,:B4:3 | [C]ein-:C5:2 sam:C5 wacht:G4:3 |
[F]nur:A4:2 das:A4 trau-:C5:1.5 te:B4:0.5 hoch-:A4 | [C]hei-:G4:1.5 li-:A4:0.5 ge:G4 Paar.:E4:3 |
[F]Hol-:A4:2 der:A4 Kna-:C5:1.5 be:B4:0.5 im:A4 | [C]lo-:G4:1.5 cki-:A4:0.5 gen:G4 Haar,:E4:3 |
[G7]schlaf:D5:2 in:D5 himm-:F5:1.5 li-:D5:0.5 scher:B4 | [C]Ruh,:C5:3 ~:E5:3 |
schlaf:C5 in:G4 himm-:E4 [G7]li-:G4:1.5 scher:F4:0.5 ~:D4 | [C]Ruh.:C4:6 |`,
  },
  {
    id: 'lagerfeuer',
    category: 'eigene',
    title: 'Am Lagerfeuer',
    origin: 'Eigenes Lied für diese App, frei verwendbar (CC0)',
    meter: 4,
    bpm: 90,
    text: `
[C]Am:E4 La-:E4 ger-:G4 feu-:G4 | [Am]er:A4:2 sit-:G4 zen:E4 | [F]wir:F4:2 und:A4 sin-:A4 | [G7]gen,:G4:4 |
[C]die:E4 Fun-:E4 ken:G4 flie-:C5 | [Am]gen:C5:2 hoch:A4 bis:A4 | [F]zu:C5:2 den:A4 Ster-:F4 | [G7]nen,:G4:4 |
[C]vier:G4 Sai-:G4 ten:E4 klin-:G4 | [Am]gen:A4:2 hell:C5 in:A4 | [F]dunk-:A4:2 ler:F4:2 | [G7]Nacht,:B4:4 |
[C]wir:E4 spie-:E4 len,:G4 bis:G4 | [Am]die:A4:2 Son-:A4 ne:C5 | [G7]wie-:G4:2 der:F4:2 | [C]lacht.:C4:4 |`,
  },
  {
    id: 'drunken-sailor',
    category: 'english',
    title: 'What Shall We Do with the Drunken Sailor',
    origin: `Seemannslied (Shanty), traditionell, 19. Jahrhundert, ${PD}`,
    meter: 4,
    bpm: 90,
    text: `
[Dm]What:A4:0.5 shall:A4:0.25 we:A4:0.25 do:A4:0.5 with:A4:0.25 the:A4:0.25 drun-:A4:0.5 ken:D4:0.5 sai-:F4:0.5 lor?:A4:0.5 |
[C]What:G4:0.5 shall:G4:0.25 we:G4:0.25 do:G4:0.5 with:G4:0.25 the:G4:0.25 drun-:G4:0.5 ken:C4:0.5 sai-:E4:0.5 lor?:G4:0.5 |
[Dm]What:A4:0.5 shall:A4:0.25 we:A4:0.25 do:A4:0.5 with:A4:0.25 the:A4:0.25 drun-:A4:0.5 ken:B4:0.5 sai-:C5:0.5 lor?:D5:0.5 |
[C]Ear-:C5:0.5 ly:A4:0.5 in:G4:0.5 the:E4:0.5 [Dm]mor-:D4 ning!:D4 |
[Dm]Way,:A4 hay,:A4 and:A4:0.5 up:D4:0.5 she:F4:0.5 ri-:A4:0.25 ses,:A4:0.25 |
[C]Way,:G4 hay,:G4 and:G4:0.5 up:C4:0.5 she:E4:0.5 ri-:G4:0.25 ses,:G4:0.25 |
[Dm]Way,:A4 hay,:A4 and:A4:0.5 up:B4:0.5 she:C5:0.5 ri-:D5:0.25 ses,:D5:0.25 |
[C]Ear-:C5:0.5 ly:A4:0.5 in:G4:0.5 the:E4:0.5 [Dm]mor-:D4 ning!:D4 |
[Dm]Put:A4:0.5 him:A4:0.25 in:A4:0.25 the:A4:0.5 long-:A4:0.25 boat:A4:0.25 till:A4:0.5 he’s:D4:0.5 so-:F4:0.5 ber,:A4:0.5 |
[C]Put:G4:0.5 him:G4:0.25 in:G4:0.25 the:G4:0.5 long-:G4:0.25 boat:G4:0.25 till:G4:0.5 he’s:C4:0.5 so-:E4:0.5 ber,:G4:0.5 |
[Dm]Put:A4:0.5 him:A4:0.25 in:A4:0.25 the:A4:0.5 long-:A4:0.25 boat:A4:0.25 till:A4:0.5 he’s:B4:0.5 so-:C5:0.5 ber,:D5:0.5 |
[C]Ear-:C5:0.5 ly:A4:0.5 in:G4:0.5 the:E4:0.5 [Dm]mor-:D4 ning!:D4 |
[Dm]Way,:A4 hay,:A4 and:A4:0.5 up:D4:0.5 she:F4:0.5 ri-:A4:0.25 ses,:A4:0.25 |
[C]Way,:G4 hay,:G4 and:G4:0.5 up:C4:0.5 she:E4:0.5 ri-:G4:0.25 ses,:G4:0.25 |
[Dm]Way,:A4 hay,:A4 and:A4:0.5 up:B4:0.5 she:C5:0.5 ri-:D5:0.25 ses,:D5:0.25 |
[C]Ear-:C5:0.5 ly:A4:0.5 in:G4:0.5 the:E4:0.5 [Dm]mor-:D4 ning!:D4 |`,
  },
];

/** Lieder mit Akkorden + Text bekommen eine Melodie, wenn ihr Wikipedia-Artikel ein Notenbeispiel hat. */
function withMelody(src: SongSource): SongSource {
  const m = MELODIES[src.id];
  if (!m) return src;
  return {
    ...src,
    chordpro: undefined,
    text: m.text,
    meter: m.meter,
    pickup: m.pickup || undefined,
    originalKey: src.originalKey || m.originalKey,
    bpm: m.meter === 6 || m.meter === 3 ? Math.max(src.bpm, 110) : src.bpm,
    origin: `${src.origin}; Melodie nach dem Notenbeispiel im Wikipedia-Artikel`,
  };
}

export const SONGS: Song[] = SONG_SOURCES.concat(CHORD_SONGS, KINDER_SONGS, ENGLISH_SONGS).map(withMelody).map(parseSong);

export function song(id: string): Song | undefined {
  return SONGS.find((s) => s.id === id);
}
