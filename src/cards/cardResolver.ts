// src/cards/cardResolver.ts
import { cardAssets } from "./cardAssets";
import { normalizeCardName, toKebabCase } from "./cardNameNormalizer";

export type CardResolved = {
  local?: any;           // asset local (cards)
  remote?: string | null;
  name: string | null;
};

/**
 * PRIORIDADE (DECK):
 * 1) assets/cards (sem pegar CHR)
 * 2) remote url
 */
export function resolveCardSource(
  rawName: string | null,
  remoteUrl: string | null
): CardResolved {
  if (!rawName) {
    return { local: undefined, remote: remoteUrl, name: null };
  }

  const snake = normalizeCardName(rawName);  // ex: barbarians
  const kebab = toKebabCase(snake);          // ex: barbarians

  // 1) cards/snake_case_card  (ex: "barbarians_card", "goblins_card")
  const snakeCard = `${snake}_card`;
  if (cardAssets[snakeCard]) {
    return { local: cardAssets[snakeCard], remote: null, name: rawName };
  }

  // 2) cards/kebab-case-card  (ex: "barbarian-barrel-card")
  const kebabCard = `${kebab}-card`;
  if (cardAssets[kebabCard]) {
    return { local: cardAssets[kebabCard], remote: null, name: rawName };
  }

  // 3) cards/kebab-case PURO, mas só para nomes compostos (têm "-")
  //    ex: "giant-skeleton", "magic-archer"
  if (kebab.includes("-") && cardAssets[kebab]) {
    return { local: cardAssets[kebab], remote: null, name: rawName };
  }

  // 4) fallback remoto
  if (remoteUrl) {
    return { local: undefined, remote: remoteUrl, name: rawName };
  }

  return { local: undefined, remote: null, name: rawName };
}

/**
 * PRIORIDADE (FAVORITA):
 * 1) CHR (snake / snake_dl)
 * 2) assets/cards (mesma lógica do deck)
 * 3) remote url
 */
export function resolveFavouriteCardSource(
  rawName: string | null,
  remoteUrl: string | null
): CardResolved {
  if (!rawName) {
    return { local: undefined, remote: remoteUrl, name: null };
  }

  const snake = normalizeCardName(rawName);

  // 1) CHR: snake_case
  if (cardAssets[snake]) {
    return { local: cardAssets[snake], remote: null, name: rawName };
  }

  // 1b) CHR: snake_case_dl
  const dlKey = `${snake}_dl`;
  if (cardAssets[dlKey]) {
    return { local: cardAssets[dlKey], remote: null, name: rawName };
  }

  // 2) reaproveita a lógica dos cards
  const deckResolved = resolveCardSource(rawName, remoteUrl);
  if (deckResolved.local || deckResolved.remote) {
    return deckResolved;
  }

  // 3) fallback remoto (por segurança)
  if (remoteUrl) {
    return { local: undefined, remote: remoteUrl, name: rawName };
  }

  return { local: undefined, remote: null, name: rawName };
}
