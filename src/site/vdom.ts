/**
 * Minimaler DOM-Nachbau für das Vorrendern im Build (Node): genug für h()/s() und die Griffbilder. Wird nur im Build
 * installiert, nie im Browser.
 */
const VOID = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'];

export function esc(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function escAttr(text: string): string {
  return esc(text).replace(/"/g, '&quot;');
}

class VNode {
  childNodes: VNode[] = [];
  parentNode: VNode | null = null;
  get firstChild(): VNode | null {
    return this.childNodes[0] || null;
  }
  appendChild<T extends VNode>(c: T): T {
    if (c.parentNode) c.parentNode.removeChild(c);
    c.parentNode = this;
    this.childNodes.push(c);
    return c;
  }
  insertBefore<T extends VNode>(c: T, ref: VNode | null): T {
    if (!ref) return this.appendChild(c);
    if (c.parentNode) c.parentNode.removeChild(c);
    c.parentNode = this;
    this.childNodes.splice(this.childNodes.indexOf(ref), 0, c);
    return c;
  }
  removeChild<T extends VNode>(c: T): T {
    const i = this.childNodes.indexOf(c);
    if (i >= 0) this.childNodes.splice(i, 1);
    c.parentNode = null;
    return c;
  }
  get textContent(): string {
    return this.childNodes.map((c) => c.textContent).join('');
  }
  set textContent(v: string) {
    this.childNodes = [];
    if (v) this.appendChild(new VText(v));
  }
}

class VText extends VNode {
  data: string;
  constructor(data: string) {
    super();
    this.data = data;
  }
  get textContent(): string {
    return this.data;
  }
  set textContent(v: string) {
    this.data = v;
  }
}

class VElement extends VNode {
  tagName: string;
  attrs: Record<string, string> = {};
  style: Record<string, string> = {};
  constructor(tag: string) {
    super();
    this.tagName = tag;
  }
  setAttribute(k: string, v: string): void {
    this.attrs[k] = String(v);
  }
  getAttribute(k: string): string | null {
    return k in this.attrs ? this.attrs[k] : null;
  }
  hasAttribute(k: string): boolean {
    return k in this.attrs;
  }
  removeAttribute(k: string): void {
    delete this.attrs[k];
  }
  addEventListener(): void {}
  get className(): string {
    return this.attrs.class || '';
  }
  set className(v: string) {
    this.attrs.class = v;
  }
  get classList(): { add: (c: string) => void; remove: (c: string) => void; contains: (c: string) => boolean; toggle: (c: string, on?: boolean) => void } {
    const list = () => (this.attrs.class || '').split(/\s+/).filter(Boolean);
    const set = (l: string[]) => (this.attrs.class = l.join(' '));
    return {
      add: (c) => set(list().indexOf(c) >= 0 ? list() : list().concat([c])),
      remove: (c) => set(list().filter((x) => x !== c)),
      contains: (c) => list().indexOf(c) >= 0,
      toggle: (c, on) => {
        const has = list().indexOf(c) >= 0;
        const want = on === undefined ? !has : on;
        if (want && !has) set(list().concat([c]));
        if (!want && has) set(list().filter((x) => x !== c));
      },
    };
  }
  querySelector(): null {
    return null;
  }
}

export function serialize(n: unknown): string {
  if (n instanceof VText) return esc(n.data);
  if (!(n instanceof VElement)) return '';
  const attrs = Object.keys(n.attrs)
    .map((k) => (n.attrs[k] === '' ? ` ${k}` : ` ${k}="${escAttr(n.attrs[k])}"`))
    .join('');
  if (VOID.indexOf(n.tagName) >= 0) return `<${n.tagName}${attrs}>`;
  return `<${n.tagName}${attrs}>${n.childNodes.map(serialize).join('')}</${n.tagName}>`;
}

/** Ersetzt document (nur im Build): createElement & Co. liefern serialisierbare Knoten. */
export function installDom(): void {
  const g = globalThis as unknown as Record<string, unknown>;
  const documentElement = new VElement('html');
  g.document = {
    createElement: (tag: string) => new VElement(tag),
    createElementNS: (_ns: string, tag: string) => new VElement(tag),
    createTextNode: (text: string) => new VText(text),
    documentElement,
    getElementById: () => null,
    querySelector: () => null,
  };
}
