import { SONGS } from './songs.ts';
import type { Song } from './song.ts';
import { ownToSong } from './own-songs.ts';
import { ownSongs } from '../store.ts';

/** Eigene Lieder, die sich spielen lassen (ohne erkannte Akkorde fehlen sie in der Liste, bleiben aber bearbeitbar). */
export function ownPlayable(): Song[] {
  const out: Song[] = [];
  for (const o of ownSongs()) {
    const s = ownToSong(o);
    if (s) out.push(s);
  }
  return out;
}

/** Mitgelieferte und eigene Lieder. */
export function allSongs(): Song[] {
  return SONGS.concat(ownPlayable());
}

export function findSong(id: string): Song | undefined {
  const builtIn = SONGS.find((s) => s.id === id);
  if (builtIn) return builtIn;
  const own = ownSongs().find((o) => o.id === id);
  return own ? ownToSong(own) || undefined : undefined;
}
