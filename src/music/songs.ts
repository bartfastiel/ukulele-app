import { parseSong, type Song, type SongSource } from './song.ts';

const PD = 'gemeinfrei';

export const SONG_SOURCES: SongSource[] = [
  {
    id: 'bruder-jakob',
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
    title: 'G-C-E-A (das Saiten-Lied)',
    origin: 'Eigenes Lied für diese App, frei verwendbar (CC0)',
    meter: 4,
    bpm: 90,
    text: `
[C]G,:G4 C,:C4 E,:E4 A!:A4 | [Am]Das:C5 sind:A4 die:A4 Sai-:C5 | [F]ten,:A4:2 die:F4 ich:A4 | [G7]mag!:G4:3 _:R |
[C]Ich:E4 spiel’:E4 sie:G4 laut,:G4 | [Am]ich:A4 spiel’:A4 sie:C5 leis’,:A4 | [F]ich:A4 spiel’:A4 für:F4 dich:A4 | [G7]und:B4 mich!:G4:3 |
[C]G,:G4 C,:C4 E,:E4 A!:A4 | [Am]Das:C5 sind:A4 die:A4 Sai-:C5 | [F]ten,:A4:2 die:F4 ich:A4 | [C]mag!:C4:3 _:R |`,
  },
];

export const SONGS: Song[] = SONG_SOURCES.map(parseSong);

export function song(id: string): Song | undefined {
  return SONGS.find((s) => s.id === id);
}
