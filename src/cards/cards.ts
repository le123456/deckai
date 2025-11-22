// src/cards/cards.ts
import { cardAssets } from "./cardAssets";
import { normalizeCardName } from "./cardNameNormalizer";

export type CardItem = {
  id: string;   // ex: mega_knight
  key: string;  // ex: "mega-knight"
  icon: any;    // require(...)
};

// ===========================
// LISTA DE REJEIÇÕES FINAIS
// ===========================

// cartas oficiais removidas do jogo
const REMOVED = new Set([
  "fire-spirits",
  "spear-goblins",       // versão antiga, substituída
]);

// cartas misteriosas
const UNKNOWN = new Set([
  "card-champion-unknown",
  "card-legendary-unknown",
]);

// skins / modos especiais / eventos
const SKINS = new Set([
  "santa-hog-rider",
  "super-archers",
  "super-hog-rider",
  "super-ice-golem",
  "super-lava-hound",
  "super-magic-archer",
  "super-mini-pekka",
  "super-witch",
]);

// evoluções EV1
const EVOLUTIONS = (key: string) => key.includes("ev1");

// somente assets/cards/
function isValidCardKey(key: string): boolean {
  // deve vir do diretório cards/ => todas têm "-" ou terminam com "_card"
  const isCardAsset =
    key.includes("-") || key.endsWith("_card");

  if (!isCardAsset) return false;

  // remover skins, removidas, misteriosas, super, evoluções
  if (REMOVED.has(key)) return false;
  if (UNKNOWN.has(key)) return false;
  if (SKINS.has(key)) return false;
  if (EVOLUTIONS(key)) return false;

  return true;
}

// extrair ID verdadeiro da carta
function getCardId(key: string): string {
  let raw = key
    .replace("_card", "")
    .replace("-card", "");

  return normalizeCardName(raw);
}

// ========================================
// GERAR LISTA FINAL SEM DUPLICADAS
// ========================================

const map = Object.keys(cardAssets)
  .filter(isValidCardKey)
  .reduce<Record<string, CardItem>>((acc, key) => {
    const id = getCardId(key);

    // troca duplicadas pela última (prioridade correta)
    acc[id] = { id, key, icon: cardAssets[key] };
    return acc;
  }, {});

export const ALL_CARDS: CardItem[] = Object.values(map).sort((a, b) =>
  a.id.localeCompare(b.id)
);
