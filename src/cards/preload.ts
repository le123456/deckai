import { Image } from "expo-image";
import { ALL_CARDS } from "./cards";
import { ALL_TOWERS } from "./towers";

let preloaded = false;

export async function preloadAllAssets() {
  if (preloaded) return;

  const sources = [
    ...ALL_CARDS.map((c) => c.icon),
    ...ALL_TOWERS.map((t) => t.icon),
  ];

  try {
    await Image.prefetch(sources);
    console.log("Pré-carregamento completo!");
  } catch (e) {
    console.log("Erro no preload:", e);
  }

  preloaded = true;
}
