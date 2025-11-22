// src/cards/towers.ts
import { towerAssets } from "./towerAssets";

export type TowerItem = {
  id: string;
  icon: any;
};

export const ALL_TOWERS: TowerItem[] = Object.keys(towerAssets)
  .map((id) => ({
    id,
    icon: towerAssets[id],
  }))
  .sort((a, b) => a.id.localeCompare(b.id));
