/**
 * Mahagoni-Maserung, einmal beim Start auf ein Canvas gerechnet und als Hintergrundbild für alle Holzflächen
 * verwendet: kachelbar (periodisches Rauschen), damit eine kleine Textur große Flächen füllt. Danach kostet sie
 * beim Rendern nichts mehr – keine Filter, keine Shader pro Frame.
 */
const W = 256;
const H = 256;

function lattice(px: number, py: number, seed: number): (x: number, y: number) => number {
  const vals = new Float32Array(px * py);
  let s = seed;
  for (let i = 0; i < vals.length; i++) {
    s = (s * 16807) % 2147483647;
    vals[i] = s / 2147483647;
  }
  return (x, y) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const fx = x - xi;
    const fy = y - yi;
    const sx = fx * fx * (3 - 2 * fx);
    const sy = fy * fy * (3 - 2 * fy);
    const at = (a: number, b: number) => vals[(((b % py) + py) % py) * px + (((a % px) + px) % px)];
    const top = at(xi, yi) + (at(xi + 1, yi) - at(xi, yi)) * sx;
    const bot = at(xi, yi + 1) + (at(xi + 1, yi + 1) - at(xi, yi + 1)) * sx;
    return top + (bot - top) * sy;
  };
}

export function renderWood(tone: 'body' | 'button' = 'body'): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const g = canvas.getContext('2d')!;
  const img = g.createImageData(W, H);
  const warp = lattice(4, 4, 7);
  const warp2 = lattice(8, 8, 5);
  const fine = lattice(64, 16, 11);
  const ribbon = lattice(8, 2, 3);
  const dark = tone === 'body' ? [58, 20, 9] : [92, 32, 14];
  const light = tone === 'body' ? [122, 48, 22] : [168, 72, 34];
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const u = (x / W) * 4;
      const v = (y / H) * 4;
      const w = warp(u, v) * 2.2 + warp2(u * 2, v * 2) * 0.6;
      // Längsmaserung: Ringe laufen waagrecht, leicht gewellt; ganzzahlige Frequenz, damit die Kachel nahtlos ist
      const grain = Math.sin((y / H) * Math.PI * 2 * 22 + w * 3.2) * 0.5 + 0.5;
      const pores = fine((x / W) * 64, (y / H) * 16);
      const rib = ribbon((x / W) * 8, (y / H) * 2);
      let t = 0.25 + grain * 0.38 + (pores - 0.5) * 0.22;
      t *= 0.78 + rib * 0.44;
      t = Math.max(0, Math.min(1, t));
      const i = (y * W + x) * 4;
      img.data[i] = dark[0] + (light[0] - dark[0]) * t;
      img.data[i + 1] = dark[1] + (light[1] - dark[1]) * t;
      img.data[i + 2] = dark[2] + (light[2] - dark[2]) * t;
      img.data[i + 3] = 255;
    }
  g.putImageData(img, 0, 0);
  return canvas;
}

export function installWood(): void {
  const root = document.documentElement;
  const set = (name: string, canvas: HTMLCanvasElement) => {
    const apply = (url: string) => root.style.setProperty(name, `url("${url}")`);
    if (canvas.toBlob) canvas.toBlob((b) => (b ? apply(URL.createObjectURL(b)) : apply(canvas.toDataURL())), 'image/png');
    else apply(canvas.toDataURL());
  };
  set('--wood-body', renderWood('body'));
  set('--wood-btn', renderWood('button'));
}
