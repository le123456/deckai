// app/utils/arenaMap.ts

function normalizeArena(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");
}

// ==============================
// Mapa por NOME normalizado
// ==============================
export const arenaMapByName: Record<string, any> = {
  trainingcamp: require("../../assets/arena/arena0.webp"),
  goblinstadium: require("../../assets/arena/arena1.webp"),
  bonepit: require("../../assets/arena/arena2.webp"),
  barbarianbowl: require("../../assets/arena/arena3.webp"),
  spellvalley: require("../../assets/arena/arena4.webp"),
  buildersworkshop: require("../../assets/arena/arena5.webp"),
  pekkaplayhouse: require("../../assets/arena/arena6.webp"),
  royalarena: require("../../assets/arena/arena7.webp"),
  frozenpeak: require("../../assets/arena/arena8.webp"),
  junglearena: require("../../assets/arena/arena9.webp"),
  hogmountain: require("../../assets/arena/arena10.webp"),
  electrovalley: require("../../assets/arena/arena11.webp"),
  spookytown: require("../../assets/arena/arena12.webp"),
  rascalshideout: require("../../assets/arena/arena13.webp"),
  serenitiypeak: require("../../assets/arena/arena14.webp"),

  minersmine: require("../../assets/arena/arena15.webp"),
  executionerskitchen: require("../../assets/arena/arena16.webp"),
  royalcrypt: require("../../assets/arena/arena17.webp"),
  silentsanctuary: require("../../assets/arena/arena18.webp"),
  dragonspa: require("../../assets/arena/arena19.webp"),
  bootcamp: require("../../assets/arena/arena20.webp"),
  clashfest: require("../../assets/arena/arena21.webp"),
  pancakes: require("../../assets/arena/arena22.webp"),
  valkalla: require("../../assets/arena/arena23.webp"),

  legendaryarena: require("../../assets/arena/arena24.webp"), // FINAL
};

// ==============================
// Mapa por índice
// ==============================
export const arenaMap: Record<number, any> = {
  0: require("../../assets/arena/arena0.webp"),
  1: require("../../assets/arena/arena1.webp"),
  2: require("../../assets/arena/arena2.webp"),
  3: require("../../assets/arena/arena3.webp"),
  4: require("../../assets/arena/arena4.webp"),
  5: require("../../assets/arena/arena5.webp"),
  6: require("../../assets/arena/arena6.webp"),
  7: require("../../assets/arena/arena7.webp"),
  8: require("../../assets/arena/arena8.webp"),
  9: require("../../assets/arena/arena9.webp"),
  10: require("../../assets/arena/arena10.webp"),
  11: require("../../assets/arena/arena11.webp"),
  12: require("../../assets/arena/arena12.webp"),
  13: require("../../assets/arena/arena13.webp"),
  14: require("../../assets/arena/arena14.webp"),
  15: require("../../assets/arena/arena15.webp"),
  16: require("../../assets/arena/arena16.webp"),
  17: require("../../assets/arena/arena17.webp"),
  18: require("../../assets/arena/arena18.webp"),
  19: require("../../assets/arena/arena19.webp"),
  20: require("../../assets/arena/arena20.webp"),
  21: require("../../assets/arena/arena21.webp"),
  22: require("../../assets/arena/arena22.webp"),
  23: require("../../assets/arena/arena23.webp"),
  24: require("../../assets/arena/arena24.webp"), // Legendary Arena FINAL
};

// ==============================
// Resolver da Arena (corrigido)
// ==============================
export function resolveArenaImage(arenaName: string | undefined, trophies: number) {
  if (arenaName) {
    const key = normalizeArena(arenaName);
    if (arenaMapByName[key]) return arenaMapByName[key];
  }

  // thresholds oficiais — AGORA CORRETOS
  const thresholds = [
    300, 600, 1000, 1300, 1600,
    2000, 2300, 2600, 3000, 3400,
    3800, 4200, 4600, 5000, 5500,
    6000, 6500, 7000, 7500, 8000,
    8500, 9000, 9500, // ⬅️ último threshold REAL
  ];

  const idx = thresholds.findIndex((x) => trophies < x);
  const index = idx === -1 ? 24 : idx;

  return arenaMap[index] ?? arenaMap[0];
}
