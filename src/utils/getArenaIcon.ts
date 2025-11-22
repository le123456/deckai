import { arenaMap } from './arenaMap';

export function getArenaIcon(arenaId?: number) {
  if (!arenaId) return null;
  return arenaMap[arenaId] ?? null;
}
