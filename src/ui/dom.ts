type Child = Node | string | number | null | undefined | false;
type Attrs = Record<string, string | number | boolean | EventListener | null | undefined>;

function apply(el: Element, attrs: Attrs | null, children: Child[]): void {
  if (attrs)
    for (const key of Object.keys(attrs)) {
      const v = attrs[key];
      if (v === null || v === undefined || v === false) continue;
      if (key.startsWith('on') && typeof v === 'function') el.addEventListener(key.slice(2), v);
      else el.setAttribute(key, v === true ? '' : String(v));
    }
  for (const c of children) {
    if (c === null || c === undefined || c === false) continue;
    el.appendChild(typeof c === 'object' ? c : document.createTextNode(String(c)));
  }
}

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs?: Attrs | null,
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  apply(el, attrs ?? null, children);
  return el;
}

const SVG = 'http://www.w3.org/2000/svg';

export function s(tag: string, attrs?: Attrs | null, ...children: Child[]): SVGElement {
  const el = document.createElementNS(SVG, tag) as SVGElement;
  apply(el, attrs ?? null, children);
  return el;
}

export function clear(el: Element): void {
  while (el.firstChild) el.removeChild(el.firstChild);
}

/** Text für Screenreader ansagen (aria-live-Region im index.html). */
export function announce(text: string): void {
  const live = document.getElementById('live');
  if (!live) return;
  live.textContent = '';
  window.setTimeout(() => (live.textContent = text), 30);
}

export function reducedMotion(): boolean {
  return document.documentElement.classList.contains('calm') || matchMedia('(prefers-reduced-motion: reduce)').matches;
}
