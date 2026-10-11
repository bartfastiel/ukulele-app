import { lessonDone, load, setLessonDone } from '../store.ts';
import { t } from '../i18n.ts';
import { icon } from './icons.ts';

/** Knopf „Als geschafft abhaken“ auf einer Lektion: zeigt und ändert das Häkchen im Speicher des Geräts. */
function doneButton(btn: HTMLElement): void {
  const n = Number(btn.getAttribute('data-lesson-done'));
  const draw = () => {
    const done = lessonDone(n);
    btn.setAttribute('aria-pressed', String(done));
    while (btn.firstChild) btn.removeChild(btn.firstChild);
    btn.appendChild(icon('check'));
    btn.appendChild(document.createTextNode(' ' + (done ? t('Geschafft!') : t('Als geschafft abhaken'))));
  };
  btn.addEventListener('click', () => {
    setLessonDone(n, !lessonDone(n));
    draw();
  });
  draw();
}

/** Lektionen: Häkchen setzen und in der Übersicht zeigen, Druckknöpfe. Reine Inhaltsseiten, daher nach dem Laden. */
export function initLessons(): void {
  const btn = document.querySelector('[data-lesson-done]');
  if (btn) doneButton(btn as HTMLElement);
  const done = load().lessonsDone || [];
  const items = document.querySelectorAll('[data-lesson]');
  for (let i = 0; i < items.length; i++) {
    const n = Number(items[i].getAttribute('data-lesson'));
    if (done.indexOf(n) < 0) continue;
    items[i].classList.add('is-done');
    const mark = items[i].querySelector('.course-check');
    if (mark) {
      mark.appendChild(icon('check'));
      mark.removeAttribute('aria-hidden');
      mark.setAttribute('title', t('Geschafft!'));
      mark.setAttribute('role', 'img');
      mark.setAttribute('aria-label', t('Geschafft!'));
    }
  }
  const prints = document.querySelectorAll('[data-print]');
  for (let i = 0; i < prints.length; i++) prints[i].addEventListener('click', () => window.print());
}
