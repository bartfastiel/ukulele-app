/**
 * Lernweg-Seiten im Build: Kursübersicht und je Lektion eine Seite – auf dem Bildschirm ausführlich, dazu ein knappes
 * Druckblatt für genau eine A4-Seite (nur im Druck sichtbar, mit QR-Code auf die Lektion). Läuft nur in Node.
 */
import { h, s } from '../ui/dom.ts';
import { icon } from '../ui/icons.ts';
import { chordDiagram } from '../ui/chord-diagram.ts';
import { chord } from '../music/chords.ts';
import { STRINGS } from '../music/notes.ts';
import type { Chord } from '../music/grip.ts';
import { LEVELS } from '../music/blues.ts';
import { findSong } from '../music/library.ts';
import { encodeQr, qrPath } from '../util/qr.ts';
import { t, type Lang } from '../i18n.ts';
import { canonicalChord } from './routes.ts';
import type { SiteDef } from './sites.ts';
import type { Course, Lesson, Play } from '../content/lektionen.ts';
import type { Article, L10n } from '../content/types.ts';

export interface LessonCtx {
  siteDef: SiteDef;
  /** Link innerhalb des Builds. */
  rel: (route: string, l: Lang) => string;
  /** Öffentliche Adresse (QR-Code, strukturierte Daten). */
  publicUrl: (route: string, l: Lang) => string;
  /** Text mit **fett** und [Links](art:ziel). */
  inline: (text: string, l: Lang) => Node[];
  /** Inhaltsseite mit Kopfzeile. */
  screen: (title: string, back: string, ...content: (Node | null)[]) => Node[];
  articles: Article[];
}

/** „Lektion 4: Der erste Akkordwechsel“ */
export function lessonHeading(lesson: Lesson, l: Lang): string {
  return t('Lektion {n}: {title}', { n: lesson.n, title: lesson.title[l] });
}

export function lessonPageTitle(lesson: Lesson, siteDef: SiteDef, l: Lang): string {
  return t('{instrument} lernen: Lektion {n} – {title}', { instrument: siteDef.name[l], n: lesson.n, title: lesson.title[l] });
}

export function lessonDescription(lesson: Lesson, l: Lang): string {
  return `${plain(lesson.goal[l])} ${t('Lektion {n} des kostenlosen Kurses: Schritt für Schritt, mit Griffbildern, Stück zum Mitspielen, Hausaufgabe und Druckblatt.', { n: lesson.n })}`;
}

export function courseTitle(course: Course, siteDef: SiteDef, l: Lang): string {
  return t('{instrument} lernen: Kurs in {n} Lektionen', { instrument: siteDef.name[l], n: course.lessons.length });
}

export function courseDescription(course: Course, siteDef: SiteDef, l: Lang): string {
  return t('Kostenloser Kurs für {instrument} in der Schule und zu Hause: {n} Lektionen, eine pro Woche – mit Griffbildern, Liedern zum Mitspielen, Hausaufgabe und Druckblatt.', {
    instrument: siteDef.name[l],
    n: course.lessons.length,
  });
}

/** Text ohne Auszeichnung (Beschreibung, Druckblatt). */
function plain(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\[([^\]]+)\]\([a-z-]+:[^)]+\)/g, '$1');
}

/** Nur **fett**, Links als reiner Text – fürs Papier. */
function paper(text: string): Node[] {
  const out: Node[] = [];
  const parts = text.replace(/\[([^\]]+)\]\([a-z-]+:[^)]+\)/g, '$1').split(/\*\*/);
  parts.forEach((p, i) => {
    if (p) out.push(i % 2 ? h('strong', null, p) : document.createTextNode(p));
  });
  return out;
}

function hostAndPath(url: string): string {
  return url.replace(/^[a-z]+:\/\//, '').replace(/^www\./, '');
}

function qr(url: string): Node | null {
  const code = encodeQr(url, { ecl: 'M' });
  if (!code) return null;
  const n = code.size + 8;
  return s(
    'svg',
    { viewBox: `0 0 ${n} ${n}`, class: 'sheet-qr', role: 'img', 'aria-label': t('QR-Code mit dem Link zu dieser Lektion'), 'shape-rendering': 'crispEdges' },
    s('path', { d: qrPath(code), fill: '#000' }),
  );
}

const TOOL_ICON: Record<string, string> = {
  stimmen: 'tuner',
  rhythmus: 'rhythm',
  spiel: 'game',
  blues: 'blues',
  detektiv: 'detective',
  akkorde: 'chords',
  lieder: 'songs',
  'eigenes-lied': 'plus',
  powerchords: 'chords',
};

function toolLabel(tool: string): string {
  const labels: Record<string, string> = {
    stimmen: t('Zum Stimmgerät'),
    rhythmus: t('Rhythmus üben'),
    spiel: t('Akkord-Spiel starten'),
    blues: t('Blues spielen'),
    detektiv: t('Akkord-Detektiv öffnen'),
    akkorde: t('Alle Akkorde'),
    lieder: t('Lieder spielen'),
    'eigenes-lied': t('Eigenes Lied anlegen'),
    powerchords: t('Powerchords'),
  };
  return labels[tool] || tool;
}

/** Ziel-Route und Beschriftung eines Mitspiel-Eintrags. */
export function playTarget(p: Play): { route: string; query: string; label: string; hint: string; icon: string } {
  const x = p as { song?: string; key?: string; capo?: number; tool?: string; pattern?: string; chords?: string[]; level?: number };
  if (x.song) {
    const song = findSong(x.song);
    const title = song ? song.title : x.song;
    return {
      route: `lied/${x.song}`,
      query: x.key ? '?tonart=' + encodeURIComponent(x.key) : '',
      label: x.key ? t('{title} in {key}', { title, key: x.key }) : title,
      hint: x.capo ? t('Kapodaster im {n}. Bund', { n: x.capo }) : '',
      icon: 'play',
    };
  }
  const tool = x.tool || '';
  let hint = '';
  if (tool === 'rhythmus' && x.pattern) hint = t('Muster: {pattern}', { pattern: t(x.pattern) });
  if (tool === 'spiel' && x.chords) hint = t('Wähle: {chords}', { chords: x.chords.join(' · ') });
  if (tool === 'blues' && x.level) {
    const level = LEVELS[x.level - 1];
    hint = t('Stufe {level}, Tonart {key}', { level: level ? t(level.title) : String(x.level), key: x.key || '' });
  }
  return { route: tool, query: '', label: toolLabel(tool), hint, icon: TOOL_ICON[tool] || 'next' };
}

function playButtons(lesson: Lesson, ctx: LessonCtx, l: Lang): Node {
  return h(
    'div',
    { class: 'lesson-play' },
    ...lesson.piece.play.map((p) => {
      const x = playTarget(p);
      return h(
        'p',
        null,
        h('a', { class: 'btn btn-primary article-tool', href: ctx.rel(x.route, l) + x.query }, icon(x.icon), ' ', x.label),
        x.hint ? h('span', { class: 'lesson-play-hint' }, ' ', x.hint) : null,
      );
    }),
  );
}

function chordTiles(names: string[], ctx: LessonCtx, l: Lang): Node | null {
  if (!names.length) return null;
  return h(
    'div',
    { class: 'lesson-chords' },
    ...names.map((n) => {
      const name = canonicalChord(n);
      return h(
        'span',
        { class: 'article-chord' },
        h('a', { class: 'chord-name', href: ctx.rel(`akkord/${encodeURIComponent(name)}`, l) }, name),
        chordDiagram(chord(name), { labels: false }),
      );
    }),
  );
}

function list(tag: 'ul' | 'ol', items: L10n[], ctx: LessonCtx, l: Lang, cls?: string): Node {
  return h(tag, cls ? { class: cls } : null, ...items.map((x) => h('li', null, ...ctx.inline(x[l], l))));
}

/** Griffbild fürs Papier: dünne schwarze Linien, weiße Punkte mit Fingerzahl, keine Flächen. */
function paperDiagram(ch: Chord): Node {
  const n = ch.frets.length;
  const gap = 12;
  const fh = 15;
  const used = ch.frets.filter((f) => f > 0);
  const top = used.length && Math.max.apply(null, used) > 4 ? Math.min.apply(null, used) : 1;
  const rows = Math.max(4, (used.length ? Math.max.apply(null, used) : 0) - top + 1);
  const x0 = 12;
  const y0 = 16;
  const w = x0 * 2 + gap * (n - 1);
  const hgt = y0 + fh * rows + 16;
  const line = (x1: number, y1: number, x2: number, y2: number, sw: number) => s('line', { x1, y1, x2, y2, stroke: '#000', 'stroke-width': sw });
  const parts: Node[] = [];
  for (let r = 0; r <= rows; r++) parts.push(line(x0, y0 + r * fh, x0 + gap * (n - 1), y0 + r * fh, r === 0 && top === 1 ? 2.4 : 0.6));
  for (let i = 0; i < n; i++) parts.push(line(x0 + i * gap, y0, x0 + i * gap, y0 + rows * fh, 0.6));
  if (top > 1) parts.push(s('text', { x: 1, y: y0 + fh * 0.5 + 3, 'font-size': 8, fill: '#000' }, String(top)));
  const b = ch.barre;
  if (b && b.fret >= top) {
    const cy = y0 + (b.fret - top + 0.5) * fh;
    parts.push(s('rect', { x: x0 + Math.min(b.from, b.to) * gap - 5, y: cy - 5, width: Math.abs(b.to - b.from) * gap + 10, height: 10, rx: 5, fill: '#fff', stroke: '#000', 'stroke-width': 0.8 }));
  }
  ch.frets.forEach((f, i) => {
    const x = x0 + i * gap;
    if (f === 0) parts.push(s('circle', { cx: x, cy: y0 - 7, r: 3, fill: 'none', stroke: '#000', 'stroke-width': 0.8 }));
    else if (f < 0) parts.push(s('path', { d: `M${x - 3} ${y0 - 10}l6 6m0 -6l-6 6`, stroke: '#000', 'stroke-width': 0.8 }));
    else {
      const cy = y0 + (f - top + 0.5) * fh;
      const onBarre = !!b && f === b.fret && ch.fingers[i] === 1;
      if (!onBarre) parts.push(s('circle', { cx: x, cy, r: 5, fill: '#fff', stroke: '#000', 'stroke-width': 0.8 }));
      if (ch.fingers[i] && (!onBarre || i === b!.from)) parts.push(s('text', { x, y: cy + 3, 'text-anchor': 'middle', 'font-size': 8, fill: '#000' }, String(ch.fingers[i])));
    }
    parts.push(s('text', { x, y: hgt - 3, 'text-anchor': 'middle', 'font-size': 7, fill: '#000' }, STRINGS[i] ? STRINGS[i].name : ''));
  });
  return s('svg', { viewBox: `0 0 ${w} ${hgt}`, class: 'sheet-diagram', role: 'img', 'aria-label': ch.name }, ...parts);
}

const WEEKDAYS = () => [t('Mo'), t('Di'), t('Mi'), t('Do'), t('Fr')];

/** Druckblatt: eine A4-Seite, schwarz auf weiß. */
function sheet(course: Course, lesson: Lesson, ctx: LessonCtx, l: Lang): Node {
  const url = ctx.publicUrl(`lektion/${lesson.n}`, l);
  const box = () => h('span', { class: 'sheet-box', 'aria-hidden': 'true' });
  return h(
    'section',
    { class: 'lesson-sheet', 'aria-hidden': 'true' },
    h(
      'header',
      { class: 'sheet-head' },
      h(
        'div',
        { class: 'sheet-title' },
        h('p', { class: 'sheet-kicker' }, t('{brand} · Lektion {n} von {total}', { brand: ctx.siteDef.brand[l], n: lesson.n, total: course.lessons.length })),
        h('h2', null, lesson.title[l]),
        h('p', { class: 'sheet-goal' }, h('strong', null, t('Ziel:'), ' '), ...paper(lesson.goal[l])),
      ),
      h('div', { class: 'sheet-link' }, qr(url), h('p', null, hostAndPath(url))),
    ),
    h('div', { class: 'sheet-block' }, h('h3', null, t('So geht’s')), h('ol', null, ...lesson.sheet.map((x) => h('li', null, ...paper(x[l]))))),
    lesson.chords && lesson.chords.length
      ? h(
          'div',
          { class: 'sheet-chords' },
          ...lesson.chords.map((n) => h('span', { class: 'sheet-chord' }, h('b', null, canonicalChord(n)), paperDiagram(chord(canonicalChord(n))))),
        )
      : null,
    h('div', { class: 'sheet-block sheet-piece' }, h('h3', null, t('Dein Stück')), h('p', null, ...paper(lesson.piece.text[l]))),
    h(
      'div',
      { class: 'sheet-block' },
      h('h3', null, t('Hausaufgabe bis zum nächsten Mal')),
      h('ul', { class: 'sheet-checks' }, ...lesson.homework.map((x) => h('li', null, box(), ' ', ...paper(x[l])))),
      h('p', { class: 'sheet-days' }, t('Geübt:'), ' ', ...WEEKDAYS().map((d) => h('span', null, box(), ' ', d))),
    ),
    h('div', { class: 'sheet-block' }, h('h3', null, t('Geschafft, wenn …')), h('ul', { class: 'sheet-checks' }, ...lesson.done.map((x) => h('li', null, box(), ' ', ...paper(x[l]))))),
  );
}

export function lessonPage(course: Course, lesson: Lesson, ctx: LessonCtx, l: Lang): Node[] {
  const prev = course.lessons.filter((x) => x.n === lesson.n - 1)[0];
  const next = course.lessons.filter((x) => x.n === lesson.n + 1)[0];
  const related = (lesson.wissen || []).map((id) => ctx.articles.filter((a) => a.id === id)[0]).filter((a) => !!a);
  return ctx.screen(
    lessonHeading(lesson, l),
    ctx.rel('lektionen', l),
    h(
      'div',
      { class: 'lesson-screen' },
      h(
        'section',
        { class: 'card article lesson-goal' },
        h('p', { class: 'lesson-week' }, t('Woche {n} von {total}', { n: lesson.n, total: course.lessons.length })),
        h('p', null, h('strong', null, t('Ziel:'), ' '), ...ctx.inline(lesson.goal[l], l)),
        h(
          'p',
          { class: 'lesson-actions' },
          h('button', { type: 'button', class: 'btn btn-seg lesson-done', 'data-lesson-done': String(lesson.n), 'aria-pressed': 'false' }, icon('check'), ' ', t('Als geschafft abhaken')),
          h('button', { type: 'button', class: 'btn btn-seg', 'data-print': '' }, t('Blatt drucken')),
        ),
      ),
      lesson.review ? h('section', { class: 'card article' }, h('h2', null, t('Wiederholung')), h('p', null, ...ctx.inline(lesson.review[l], l))) : null,
      h(
        'section',
        { class: 'card article' },
        h('h2', null, t('Schritt für Schritt')),
        list('ol', lesson.steps, ctx, l, 'lesson-steps'),
        chordTiles(lesson.chords || [], ctx, l),
      ),
      h(
        'section',
        { class: 'card article lesson-piece' },
        h('h2', null, t('Jetzt wird Musik gemacht: dein Stück')),
        h('p', null, ...ctx.inline(lesson.piece.text[l], l)),
        playButtons(lesson, ctx, l),
      ),
      h(
        'section',
        { class: 'card article lesson-homework' },
        h('h2', null, t('Hausaufgabe bis zum nächsten Mal')),
        h('p', { class: 'small' }, t('Fünf Tage, je etwa zehn Minuten:')),
        list('ul', lesson.homework, ctx, l),
      ),
      h('section', { class: 'card article lesson-done-when' }, h('h2', null, t('Geschafft, wenn …')), list('ul', lesson.done, ctx, l)),
      h('section', { class: 'card article' }, h('h2', null, t('Wenn es hakt')), list('ul', lesson.trouble, ctx, l)),
      h(
        'details',
        { class: 'card article lesson-teacher' },
        h('summary', null, t('Für Lehrkräfte: Ablauf in der Stunde')),
        list('ol', lesson.teacher, ctx, l),
        h('p', { class: 'small' }, t('An die Tafel: {url}', { url: hostAndPath(ctx.publicUrl(`lektion/${lesson.n}`, l)) })),
      ),
      related.length
        ? h(
            'section',
            { class: 'card wissen-cat' },
            h('h2', null, t('Mehr dazu')),
            h('ul', { class: 'wissen-list' }, ...related.map((a) => h('li', null, h('a', { href: ctx.rel(`wissen/${a.id}`, l) }, a.title[l])))),
          )
        : null,
      h(
        'nav',
        { class: 'lesson-nav', 'aria-label': t('Lektionen') },
        prev ? h('a', { class: 'btn btn-seg', href: ctx.rel(`lektion/${prev.n}`, l), rel: 'prev' }, '‹ ', t('Lektion {n}', { n: prev.n })) : null,
        h('a', { class: 'btn btn-seg', href: ctx.rel('lektionen', l) }, t('Alle Lektionen')),
        next ? h('a', { class: 'btn btn-primary', href: ctx.rel(`lektion/${next.n}`, l), rel: 'next' }, t('Lektion {n}', { n: next.n }), ' ›') : null,
      ),
    ),
    sheet(course, lesson, ctx, l),
  );
}

export function coursePage(course: Course, ctx: LessonCtx, l: Lang): Node[] {
  const parts = course.parts;
  const inPart = (i: number) => course.lessons.filter((x) => x.n >= parts[i].from && (i + 1 >= parts.length || x.n < parts[i + 1].from));
  const example = hostAndPath(ctx.publicUrl('lektion/4', l));
  return ctx.screen(
    t('{instrument} lernen in Lektionen', { instrument: ctx.siteDef.name[l] }),
    ctx.rel('', l),
    h(
      'div',
      { class: 'course-screen' },
      h(
        'section',
        { class: 'card article' },
        h('p', null, t('Jede Woche eine Lektion: Sie bauen aufeinander auf – von der Haltung über die ersten Akkorde bis zu Barré, Blues und Musiktheorie. Jede Lektion hat ein Stück zum Mitspielen, eine Hausaufgabe für zehn Minuten am Tag und ein Blatt zum Ausdrucken.')),
        h('p', null, t('Für Lehrkräfte: Die Nummern bleiben fest. Schreib einfach die Adresse an die Tafel, zum Beispiel {url}.', { url: example })),
        h('p', { class: 'lesson-actions' }, h('button', { type: 'button', class: 'btn btn-seg', 'data-print': '' }, t('Übersicht drucken'))),
      ),
      ...parts.map((part, i) =>
        h(
          'section',
          { class: 'card wissen-cat' },
          h('h2', null, part.title[l]),
          h(
            'ol',
            { class: 'course-list', start: String(part.from) },
            ...inPart(i).map((x) =>
              h(
                'li',
                { 'data-lesson': String(x.n) },
                h('a', { href: ctx.rel(`lektion/${x.n}`, l) }, h('span', { class: 'course-n' }, t('Lektion {n}', { n: x.n })), ' ', x.title[l]),
                h('span', { class: 'course-check', 'aria-hidden': 'true' }),
                h('span', { class: 'small course-goal' }, ' ', plain(x.goal[l])),
              ),
            ),
          ),
        ),
      ),
    ),
    h(
      'section',
      { class: 'course-sheet', 'aria-hidden': 'true' },
      h('h2', null, t('{instrument} lernen in Lektionen', { instrument: ctx.siteDef.name[l] }), ' – ', ctx.siteDef.brand[l]),
      h(
        'table',
        null,
        h('thead', null, h('tr', null, h('th', null, t('Woche')), h('th', null, t('Lektion')), h('th', null, t('Inhalt')))),
        h(
          'tbody',
          null,
          ...course.lessons.map((x) =>
            h(
              'tr',
              null,
              h('td', null, String(x.n)),
              h('td', null, x.title[l]),
              h('td', null, plain(x.goal[l]), x.chords && x.chords.length ? ` ${t('Neu: {chords}', { chords: x.chords.join(', ') })}` : ''),
            ),
          ),
        ),
      ),
      h('p', null, hostAndPath(ctx.publicUrl('lektionen', l))),
    ),
  );
}

/** Kurs als schema.org Course mit den Lektionen als Teilen. */
export function courseLd(course: Course, ctx: LessonCtx, l: Lang): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseTitle(course, ctx.siteDef, l),
    description: courseDescription(course, ctx.siteDef, l),
    url: ctx.publicUrl('lektionen', l),
    inLanguage: l,
    isAccessibleForFree: true,
    educationalLevel: 'Beginner',
    provider: { '@type': 'Organization', name: ctx.siteDef.brand[l], url: ctx.publicUrl('', l) },
    hasPart: course.lessons.map((x) => ({ '@type': 'LearningResource', position: x.n, name: lessonHeading(x, l), url: ctx.publicUrl(`lektion/${x.n}`, l) })),
  };
}

export function lessonLd(course: Course, lesson: Lesson, ctx: LessonCtx, l: Lang): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: lessonPageTitle(lesson, ctx.siteDef, l),
    description: lessonDescription(lesson, l),
    url: ctx.publicUrl(`lektion/${lesson.n}`, l),
    learningResourceType: 'Lesson',
    educationalLevel: 'Beginner',
    teaches: plain(lesson.goal[l]),
    timeRequired: 'PT45M',
    position: lesson.n,
    inLanguage: l,
    isAccessibleForFree: true,
    isPartOf: { '@type': 'Course', name: courseTitle(course, ctx.siteDef, l), url: ctx.publicUrl('lektionen', l) },
  };
}
