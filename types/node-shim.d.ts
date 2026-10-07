// Minimale Typen für Node-Module in Tests und Werkzeugen – erspart @types/node mitsamt seinen Abhängigkeiten.
declare module 'node:test' {
  export function test(name: string, fn: () => void | Promise<void>): void;
}
declare module 'node:assert/strict' {
  const assert: {
    (value: unknown, message?: string): void;
    equal(actual: unknown, expected: unknown, message?: string): void;
    deepEqual(actual: unknown, expected: unknown, message?: string): void;
    ok(value: unknown, message?: string): void;
    throws(fn: () => unknown): void;
    match(value: string, re: RegExp, message?: string): void;
  };
  export default assert;
}
declare module 'node:fs' {
  export function writeFileSync(path: string, data: Uint8Array | string): void;
  export function mkdirSync(path: string, opts?: { recursive?: boolean }): void;
  export function readFileSync(path: string): Uint8Array;
  export function readdirSync(path: string): string[];
  export function statSync(path: string): { isDirectory(): boolean };
}
declare module 'node:path' {
  export function dirname(path: string): string;
  export function join(...parts: string[]): string;
}
declare module 'node:zlib' {
  export function crc32(data: Uint8Array): number;
  export function deflateRawSync(data: Uint8Array, opts?: { level?: number }): Uint8Array;
  export function inflateRawSync(data: Uint8Array): Uint8Array;
}
declare const process: { env: Record<string, string | undefined>; argv: string[]; exit(code?: number): never };
declare module 'node:fs' {
  export function existsSync(path: string): boolean;
}
declare module 'node:fs' {
  export function writeFileSync(path: string | URL, data: Uint8Array | string): void;
  export function readFileSync(path: string | URL, encoding: 'utf8'): string;
  export function readdirSync(path: string | URL): string[];
}
declare module 'node:crypto' {
  export function createHash(alg: string): { update(data: string | Uint8Array): { digest(enc: 'hex'): string } };
}
