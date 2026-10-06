import type { SongSource } from './song.ts';

// Englische Lieder ohne Melodie (Akkorde + Text). Alle gemeinfrei nach deutschem Recht; Texte aus Drucken vor 1925
// (Quelle in origin), Akkorde als eigene einfache Begleitung in C.

export const ENGLISH_SONGS: SongSource[] = [
  {
    id: 'clementine',
    title: 'Oh My Darling, Clementine',
    category: 'english',
    origin: 'Percy Montrose, 1884 (nach einem Lied von 1863); Text nach Camp-Fire Choruses (1916, archive.org); gemeinfrei',
    meter: 3,
    bpm: 110,
    chordpro: `
In a [C]cabin, in a canyon,
an excavation for a [G7]mine,
dwelt a [G7]miner, a forty-[C]niner,
and his [C]daughter, [G7]Clemen[C]tine.
{Chorus}
Oh, my [C]darling, oh, my darling,
oh, my darling Clemen[G7]tine!
You are [C]lost and gone for[G7]ever,
dreadful [G7]sorry, Clemen[C]tine.
Light she [C]was, and like a fairy,
and her shoes were number [G7]nine;
herring [G7]boxes without [C]topses,
sandals [C]were for [G7]Clemen[C]tine.
Oh, my [C]darling, oh, my darling,
oh, my darling Clemen[G7]tine!
You are [C]lost and gone for[G7]ever,
dreadful [G7]sorry, Clemen[C]tine.`,
  },
  {
    id: 'my-bonnie',
    title: 'My Bonnie Lies Over the Ocean',
    category: 'english',
    origin: 'Schottisch traditionell, Erstdruck 1881 (Charles E. Pratt, 1841–1902); Text nach Canadian Soldiers\' Song Book (1918, Wikisource); gemeinfrei',
    meter: 3,
    bpm: 110,
    chordpro: `
My [C]Bonnie lies [F]over the [C]ocean,
my Bonnie lies [D7]over the [G7]sea,
my [C]Bonnie lies [F]over the [C]ocean,
oh, [F]bring back my [G7]Bonnie to [C]me.
{Chorus}
[C]Bring back, [Dm]bring back,
[G7]bring back my Bonnie to [C]me, to [G7]me;
[C]bring back, [Dm]bring back,
oh, [G7]bring back my Bonnie to [C]me.
Oh, [C]blow, ye winds, [F]over the [C]ocean,
oh, blow, ye winds, [D7]over the [G7]sea,
oh, [C]blow, ye winds, [F]over the [C]ocean,
and [F]bring back my [G7]Bonnie to [C]me.
The [C]winds have blown [F]over the [C]ocean,
the winds have blown [D7]over the [G7]sea,
the [C]winds have blown [F]over the [C]ocean
and [F]brought back my [G7]Bonnie to [C]me.`,
  },
  {
    id: 'home-on-the-range',
    title: 'Home on the Range',
    category: 'english',
    origin: 'Text Brewster Higley (1823–1911), Melodie Daniel E. Kelley (1843–1905); Text nach Lomax, Cowboy Songs (1910, Projekt Gutenberg); gemeinfrei',
    meter: 3,
    bpm: 100,
    chordpro: `
Oh, [C]give me a home where the [F]buffalo roam,
where the [C]deer and the antelope [G7]play,
where [C]seldom is heard a dis[F]couraging word
and the [C]skies are [G7]not cloudy all [C]day.
{Chorus}
[G7]Home, [C]home on the [F]range,
where the [C]deer and the antelope [G7]play;
where [C]seldom is heard a dis[F]couraging word
and the [C]skies are [G7]not cloudy all [C]day.
Where the [C]air is so pure, the [F]zephyrs so free,
the [C]breezes so balmy and [G7]light,
that I [C]would not exchange my [F]home on the range
for [C]all of the [G7]cities so [C]bright.
How [C]often at night when the [F]heavens are bright
with the [C]light from the glittering [G7]stars,
have I [C]stood here amazed and [F]asked as I gazed
if their [C]glory ex[G7]ceeds that of [C]ours.`,
  },
  {
    id: 'skip-to-my-lou',
    title: 'Skip to My Lou',
    category: 'english',
    origin: 'Traditionelles Spiellied (USA, 19. Jh.); Text nach Wolford, The Play-Party in Indiana (1916, archive.org); gemeinfrei',
    meter: 4,
    bpm: 120,
    chordpro: `
The [C]cat's in the buttermilk, skip-to-my-Lou,
[G7]cat's in the buttermilk, skip-to-my-Lou,
[C]cat's in the buttermilk, skip-to-my-Lou,
[G7]skip-to-my-Lou, my [C]darling.
[C]Little red wagon painted blue, skip-to-my-Lou,
[G7]little red wagon painted blue, skip-to-my-Lou,
[C]little red wagon painted blue, skip-to-my-Lou,
[G7]skip-to-my-Lou, my [C]darling.
[C]Flies in the biscuit, two by two, skip-to-my-Lou,
[G7]flies in the biscuit, two by two, skip-to-my-Lou,
[C]flies in the biscuit, two by two, skip-to-my-Lou,
[G7]skip-to-my-Lou, my [C]darling.`,
  },
  {
    id: 'good-night-ladies',
    title: 'Good-Night, Ladies',
    category: 'english',
    origin: 'Edwin P. Christy (1815–1862), 1847; Refrain College-Lied um 1867; Text nach Camp-Fire Choruses (1916, archive.org); gemeinfrei',
    meter: 4,
    bpm: 100,
    chordpro: `
Good-[C]night, ladies; good-[G7]night, ladies;
good-[C]night, ladies, we're [G7]going to leave you [C]now.
{Chorus}
[C]Merrily we roll along, roll along, [G7]roll along,
[C]merrily we roll along, o'er the [G7]deep blue [C]sea.
Fare[C]well, ladies; fare[G7]well, ladies;
fare[C]well, ladies, we're [G7]going to leave you [C]now.
Sweet [C]dreams, ladies; sweet [G7]dreams, ladies;
sweet [C]dreams, ladies, we're [G7]going to leave you [C]now.`,
  },
  {
    id: 'molly-malone',
    title: 'Molly Malone',
    category: 'english',
    origin: 'Irisch, 1881 anonym gedruckt; Text nach Students\' Songs (1884, archive.org); gemeinfrei',
    meter: 3,
    bpm: 110,
    chordpro: `
In [C]Dublin City, where the [Am]girls they are so [Dm]pretty,
'twas [G7]there I first met with sweet [D7]Molly Ma[G7]lone;
she [C]drove a wheel[Am]barrow through [Dm]streets broad and [G7]narrow,
crying, "[C]Cockles and [Am]mussels, a[Dm]live, all a[G7]live!" [C]
{Chorus}
A[C]live, a[Am]live! A[Dm]live, a[G7]live!
Crying, "[C]Cockles and [Am]mussels, a[Dm]live, all a[G7]live!" [C]
She [C]was a fish[Am]monger, and [Dm]that was the [G7]wonder,
her father and mother were [D7]fishmongers [G7]too;
they [C]drove wheel[Am]barrows through [Dm]streets broad and [G7]narrow,
crying, "[C]Cockles and [Am]mussels, a[Dm]live, all a[G7]live!" [C]`,
  },
  {
    id: 'swing-low',
    title: 'Swing Low, Sweet Chariot',
    category: 'english',
    origin: 'Spiritual, Wallace Willis zugeschrieben (gest. um 1880); Text nach Heart Songs (1909, archive.org); gemeinfrei',
    meter: 4,
    bpm: 80,
    chordpro: `
[C]Swing low, sweet [F]chari[C]ot,
coming for to carry me [G7]home,
[C]swing low, sweet [F]chari[C]ot,
coming for to [G7]carry me [C]home.
I [C]looked over Jordan, and [F]what did I [C]see,
coming for to carry me [G7]home?
A [C]band of angels [F]coming after [C]me,
coming for to [G7]carry me [C]home.
If [C]you get there be[F]fore I [C]do,
coming for to carry me [G7]home,
tell [C]all my friends I'm [F]coming [C]too,
coming for to [G7]carry me [C]home.`,
  },
  {
    id: 'michael-row',
    title: 'Michael, Row the Boat Ashore',
    category: 'english',
    origin: 'Spiritual, Erstdruck in Slave Songs of the United States (1867, archive.org), Schreibung modernisiert; gemeinfrei',
    meter: 4,
    bpm: 100,
    chordpro: `
[C]Michael, row the boat a[F]shore, [C]Halle[G7]lu[C]jah!
[C]Brother, lend a helping [F]hand, [C]Halle[G7]lu[C]jah!
[C]Sister, help for trim that [F]boat, [C]Halle[G7]lu[C]jah!
[C]Jordan stream is wide and [F]deep, [C]Halle[G7]lu[C]jah!
[C]Jesus stand on the other [F]side, [C]Halle[G7]lu[C]jah!`,
  },
  {
    id: 'down-by-the-riverside',
    title: 'Down by the Riverside',
    category: 'english',
    origin: 'Spiritual, traditionell; Text nach Golden Book of Favorite Songs (1923, archive.org), Schreibung modernisiert; gemeinfrei',
    meter: 4,
    bpm: 110,
    chordpro: `
Gonna [C]lay down my burden, down by the riverside,
down by the [G7]riverside, down by the [C]riverside;
gonna lay down my burden, down by the riverside,
to [G7]study war no [C]more.
{Chorus}
Ain't gonna [F]study war no more, ain't gonna [C]study war no more,
ain't gonna [G7]study war no [C]more. [C7]
Ain't gonna [F]study war no more, ain't gonna [C]study war no more,
ain't gonna [G7]study war no [C]more!
Gonna [C]lay down my sword and shield, down by the riverside,
down by the [G7]riverside, down by the [C]riverside;
gonna lay down my sword and shield, down by the riverside,
to [G7]study war no [C]more.`,
  },
  {
    id: 'amazing-grace',
    title: 'Amazing Grace',
    category: 'english',
    origin: 'Text John Newton (1725–1807), Melodie „New Britain“ (anonym, 1829); Text nach Olney Hymns (Wikisource); gemeinfrei',
    meter: 3,
    bpm: 90,
    chordpro: `
A[C]mazing grace! (How [F]sweet the [C]sound!)
That saved a wretch like [G7]me!
I [C]once was lost, but [F]now am [C]found,
was [Am]blind, but [G7]now I [C]see.
'Twas [C]grace that taught my [F]heart to [C]fear,
and grace my fears re[G7]lieved;
how [C]precious did that [F]grace ap[C]pear
the [Am]hour I [G7]first be[C]lieved!
Through [C]many dangers, [F]toils, and [C]snares,
I have already [G7]come;
'tis [C]grace has brought me [F]safe thus [C]far,
and [Am]grace will [G7]lead me [C]home.`,
  },
  {
    id: 'shenandoah',
    title: 'Shenandoah',
    category: 'english',
    origin: 'Seemannslied, traditionell (19. Jh.); Text nach The Shanty Book (R. R. Terry, 1921, Projekt Gutenberg); gemeinfrei',
    meter: 4,
    bpm: 70,
    chordpro: `
Oh [C]Shenandoah, I [F]long to [C]hear you,
a[Am]way, you [F]rolling [C]river.
Oh [C]Shenandoah, I [F]long to [C]hear you,
a[Am]way, I'm [F]bound to [C]go
'cross the [F]wide Mis[G7]sou[C]ri.
Oh [C]Shenandoah, I [F]love your [C]daughter,
a[Am]way, you [F]rolling [C]river.
Oh [C]Shenandoah, I [F]love your [C]daughter,
a[Am]way, I'm [F]bound to [C]go
'cross the [F]wide Mis[G7]sou[C]ri.`,
  },
  {
    id: 'blow-the-man-down',
    title: 'Blow the Man Down',
    category: 'english',
    origin: 'Seemannslied, traditionell; Text nach The Shanty Book (R. R. Terry, 1921, Projekt Gutenberg); gemeinfrei',
    meter: 3,
    bpm: 120,
    chordpro: `
Oh, [C]blow the man down, bullies, blow the man [G7]down,
to me way-ay, blow the man [C]down.
Oh, [C]blow the man down, bullies, blow him a[G7]way,
oh, gimme some time to blow the man [C]down.
We [C]went over the bar on the thirteenth of [G7]May,
to me way-ay, blow the man [C]down.
The [C]Galloper jumped, and the gale came a[G7]way,
oh, gimme some time to blow the man [C]down.`,
  },
  {
    id: 'rio-grande',
    title: 'Bound for the Rio Grande',
    category: 'english',
    origin: 'Seemannslied, traditionell; Text nach The Shanty Book (R. R. Terry, 1921, Projekt Gutenberg); gemeinfrei',
    meter: 4,
    bpm: 100,
    chordpro: `
I'll [C]sing you a song of the [G7]fish of the [C]sea,
oh, [G7]Rio!
I'll [C]sing you a song of the [F]fish of the [C]sea,
and we're [G7]bound for the Rio [C]Grande.
{Chorus}
Then a[C]way, love, a[F]way,
'way [C]down Rio,
so [C]fare ye well, my [F]pretty young [C]gel,
for we're [G7]bound for the Rio [C]Grande.
Sing [C]good-bye to Sally, and [G7]good-bye to [C]Sue,
oh, [G7]Rio!
And [C]you who are listening, [F]good-bye to [C]you,
and we're [G7]bound for the Rio [C]Grande.`,
  },
  {
    id: 'leave-her-bullies',
    title: 'Time for Us to Leave Her',
    category: 'english',
    origin: 'Seemannslied, traditionell (um 1850); Text nach W. B. Whall, Ships, Sea Songs and Shanties (1913, archive.org); gemeinfrei',
    meter: 3,
    bpm: 110,
    chordpro: `
Oh, the [C]times are hard and the [G7]wages low,
[C]leave her, [F]bullies, [C]leave her;
I [C]guess it's time for [G7]us to go,
it's [C]time for [G7]us to [C]leave her.
Oh, [C]don't you hear our [G7]old man say,
[C]leave her, [F]bullies, [C]leave her;
to[C]morrow you will [G7]get your pay,
it's [C]time for [G7]us to [C]leave her.`,
  },
  {
    id: 'loch-lomond',
    title: 'Loch Lomond',
    category: 'english',
    origin: 'Schottisch traditionell, gedruckt 1841; Text nach Camp-Fire Choruses (1916, archive.org); gemeinfrei',
    meter: 4,
    bpm: 90,
    chordpro: `
By yon [C]bonnie banks, and by [Am]yon bonnie [Dm]braes,
where the [G7]sun shines bright on Loch [C]Lomon',
where me and my true love were [Am]ever wont to [Dm]gae,
on the [F]bonnie, bonnie [G7]banks Loch [C]Lomon'.
{Chorus}
Oh, ye'll [C]tak' the high road, and [Am]I'll tak' the [Dm]low road,
an' I'll [G7]be in Scotland a[C]fore ye;
but me and my true love will [Am]never meet a[Dm]gain
on the [F]bonnie, bonnie [G7]banks o' Loch [C]Lomon'.`,
  },
  {
    id: 'auld-lang-syne',
    title: 'Auld Lang Syne',
    category: 'english',
    origin: 'Text Robert Burns (1759–1796), Melodie traditionell; Text nach Camp-Fire Choruses (1916, archive.org); gemeinfrei',
    meter: 4,
    bpm: 90,
    chordpro: `
Should [C]auld acquaintance be for[G7]got,
and [C]never brought to [F]min'?
Should [C]auld acquaintance be for[G7]got,
and [Am]days o' [F]auld [G7]lang [C]syne?
{Chorus}
For [C]auld lang syne, my [G7]dear,
for [C]auld lang [F]syne,
we'll [C]tak' a cup o' kindness [G7]yet,
for [Am]auld [F]lang [G7]syne. [C]
We [C]twa ha'e run aboot the [G7]braes,
and [C]pu'd the gowans [F]fine;
but [C]we've wandered mony a weary [G7]foot
[Am]sin' [F]auld [G7]lang [C]syne.`,
  },
];
