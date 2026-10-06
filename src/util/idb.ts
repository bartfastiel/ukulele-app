/** Winziger IndexedDB-Speicher (ein Objektspeicher, Schlüssel → Wert), damit Aufnahmen ein Neuladen überstehen. */
const DB = 'ukulele-club';
const STORE = 'aufnahmen';

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function run<T>(mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest): Promise<T> {
  return open().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const tx = db.transaction(STORE, mode);
        const req = fn(tx.objectStore(STORE));
        tx.oncomplete = () => resolve(req.result as T);
        tx.onerror = () => reject(tx.error);
      }),
  );
}

export function idbPut(key: string, value: unknown): Promise<void> {
  return run<void>('readwrite', (s) => s.put(value, key));
}

export function idbDelete(key: string): Promise<void> {
  return run<void>('readwrite', (s) => s.delete(key));
}

export function idbAll<T>(): Promise<T[]> {
  return run<T[]>('readonly', (s) => s.getAll());
}

export function idbClear(): Promise<void> {
  return run<void>('readwrite', (s) => s.clear());
}
