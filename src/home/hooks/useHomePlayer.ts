import { useMemo } from "react";
import { resolveArenaImage } from "../../utils/arenaMap";
import { resolveCardSource, resolveFavouriteCardSource } from "../../cards/cardResolver";


/* -------------------------------------------------------
   1) CONSTANTES / ECONOMIA
------------------------------------------------------- */
const GOLD_PER_DAY_FREE = 3000;
const MINUTES_PER_BATTLE = 3.5;

/* -------------------------------------------------------
   2) TIPAGEM
------------------------------------------------------- */

export type ClashCardApi = {
  name: string;
  level: number;
  maxLevel: number;
  elixirCost: number;
  iconUrls?: { medium: string };
  rarity?: string;
};

export type HomeStats = {
  wins: number;
  losses: number;
  battles: number;
  winrate: number;
  trophies: number;
  bestTrophies?: number;
  kingLevel?: number;
  avgElixir: number;
  hoursPlayed: number;
  accountAgeYears?: number;

  goldToMaxDeck: number;
  daysToMaxDeckFree: number;

  threeCrownWins?: number;
  friendlyWins?: number;
  tournamentBattleCount?: number;

  clanDonations?: number;
  clanDonationsReceived?: number;

  collectionTotalCards?: number;
  collectionMaxLevel?: number;
  collectionEvolutions?: number;
  collectionStarLevels?: number;
  badgesTotal?: number;
  badgesMaxed?: number;
  achievementsTotal?: number;
  achievementsCompleted?: number;
};

export type HomeDeckCard = {
  name: string;
  icon: any;
  elixirCost: number;
  level: number;
  maxLevel: number;
  rarity: string;
};

export type HomePlayerModel = {
  name: string;
  tag: string;
  trophies: number;

  clanName: string | null;
  clanTag: string | null;

  arenaName: string;
  arenaImage: any;

  favourite: {
    local?: any;
    remote?: string | null;
    name: string | null;
  };

  deck: HomeDeckCard[];
  towerIcon: string | null;

  stats: HomeStats;
};

/* -------------------------------------------------------
   HELPERS
------------------------------------------------------- */

function computeAvgElixir(deck: ClashCardApi[]): number {
  if (!deck.length) return 0;
  const total = deck.reduce((s, c) => s + (c.elixirCost ?? 0), 0);
  return Number((total / deck.length).toFixed(1));
}

const GOLD_TO_MAX_BY_RARITY: Record<string, number> = {
  common: 240_000,
  rare: 240_000,
  epic: 240_000,
  legendary: 230_000,
  champion: 210_000,
  default: 240_000,
};

const START_LEVEL_BY_RARITY: Record<string, number> = {
  common: 1,
  rare: 3,
  epic: 6,
  legendary: 9,
  champion: 11,
  default: 1,
};

function computeGoldToMaxCard(card: ClashCardApi): number {
  const rarityKey = (card.rarity ?? "default").toLowerCase();
  const totalForFull =
    GOLD_TO_MAX_BY_RARITY[rarityKey] ?? GOLD_TO_MAX_BY_RARITY.default;
  const startLevel =
    START_LEVEL_BY_RARITY[rarityKey] ?? START_LEVEL_BY_RARITY.default;

  const currentLevel = card.level ?? startLevel;
  const maxLevel = card.maxLevel ?? 15;

  if (currentLevel >= maxLevel) return 0;

  const totalLevels = maxLevel - startLevel;
  const missing = maxLevel - currentLevel;
  const perLevel = totalForFull / totalLevels;

  return Math.max(0, Math.round(missing * perLevel));
}

function computeAccountAgeYears(player: any): number | undefined {
  if (!player?.badges) return undefined;

  const badge = player.badges.find((b: any) => b.name === "YearsPlayed");
  if (!badge) return undefined;

  return Math.floor(badge.level);
}

/* -------------------------------------------------------
   HOOK PRINCIPAL
------------------------------------------------------- */

export function useHomePlayer(profile: any | null): HomePlayerModel | null {
  return useMemo(() => {
    if (!profile) return null;

    let raw = profile.player_json;
    if (!raw) return null;

    if (typeof raw === "string") {
      try {
        raw = JSON.parse(raw);
      } catch {
        return null;
      }
    }

    const playerRaw = Array.isArray(raw) ? raw[0] : raw;
    if (!playerRaw || typeof playerRaw !== "object") return null;

    /* ------------------------------
       CORE
    ------------------------------ */
    const name = playerRaw.name ?? "Jogador";
    const tag = playerRaw.tag ?? "";
    const trophies = playerRaw.trophies ?? 0;
    const bestTrophies = playerRaw.bestTrophies;
    const kingLevel = playerRaw.expLevel;

    const wins = playerRaw.wins ?? 0;
    const losses = playerRaw.losses ?? 0;
    const battles = playerRaw.battleCount ?? wins + losses;

    const winrate =
      battles > 0 ? Number(((wins / battles) * 100).toFixed(1)) : 0;

    /* ------------------------------
       DECK (corrigido)
    ------------------------------ */
    const deckApi: ClashCardApi[] = playerRaw.currentDeck ?? [];

    const deck: HomeDeckCard[] = deckApi.map((c) => {
      const resolved = resolveCardSource(
        c.name ?? null,
        c.iconUrls?.medium ?? null
      );

      return {
        name: c.name,
        icon: resolved.local ?? resolved.remote ?? null,
        elixirCost: c.elixirCost ?? 0,
        level: c.level,
        maxLevel: c.maxLevel,
        rarity: c.rarity?.toLowerCase() ?? "common",
      };
    });

    const avgElixir = computeAvgElixir(deckApi);

    /* ------------------------------
       GOLD / TEMPO
    ------------------------------ */
    const goldToMaxDeck = deckApi.reduce(
      (sum, c) => sum + computeGoldToMaxCard(c),
      0
    );

    const daysToMaxDeckFree =
      goldToMaxDeck > 0 ? Math.ceil(goldToMaxDeck / GOLD_PER_DAY_FREE) : 0;

    const hoursPlayed =
      battles > 0
        ? Number(((battles * MINUTES_PER_BATTLE) / 60).toFixed(1))
        : 0;

    const accountAgeYears = computeAccountAgeYears(playerRaw);

    /* ------------------------------
       BATALHAS / CLÃ / COLEÇÃO
    ------------------------------ */
    const threeCrownWins = playerRaw.threeCrownWins;
    const friendlyWins = playerRaw.friendWins;
    const tournamentBattleCount = playerRaw.tournamentBattleCount;

    const clanName = playerRaw.clan?.name ?? null;
    const clanTag = playerRaw.clan?.tag ?? null;
    const clanDonations =
      playerRaw.donations ?? playerRaw.totalDonations ?? undefined;
    const clanDonationsReceived = playerRaw.donationsReceived ?? undefined;

    const cards: any[] = Array.isArray(playerRaw.cards) ? playerRaw.cards : [];
    const badges: any[] = Array.isArray(playerRaw.badges)
      ? playerRaw.badges
      : [];
    const achievements: any[] = Array.isArray(playerRaw.achievements)
      ? playerRaw.achievements
      : [];

    const collectionTotalCards = cards.length || undefined;
    const collectionMaxLevel =
      cards.length > 0
        ? cards.reduce((max, c) => Math.max(max, c.level ?? 0), 0)
        : undefined;

    const collectionEvolutions =
      cards.filter((c) => (c.evolutionLevel ?? 0) > 0).length || undefined;

    const collectionStarLevels =
      cards.filter((c) => (c.starLevel ?? 0) > 0).length || undefined;

    const badgesTotal = badges.length || undefined;
    const badgesMaxed =
      badges.filter(
        (b) => b.maxLevel && (b.level ?? 0) >= b.maxLevel
      ).length || undefined;

    const achievementsTotal = achievements.length || undefined;
    const achievementsCompleted =
      achievements.filter((a) => {
        const progress = a.progress ?? a.value ?? 0;
        const target = a.target ?? 0;
        return target > 0 && progress >= target;
      }).length || undefined;

    /* ------------------------------
       ARENA
    ------------------------------ */
    const arenaName =
      playerRaw.arena?.name ??
      playerRaw.progress?.[""]?.arena?.name ??
      "Arena";

    const arenaImage = resolveArenaImage(arenaName, trophies);

    /* ------------------------------
      FAVORITA
    ------------------------------ */
    const fav = playerRaw.currentFavouriteCard;
    const favName = fav?.name ?? null;
    const favRemote = fav?.iconUrls?.medium ?? null;

    const favourite = resolveFavouriteCardSource(
      favName ?? null,
      favRemote ?? null
    );

    /* ------------------------------
       RETORNO FINAL
    ------------------------------ */
    return {
      name,
      tag,
      trophies,
      clanName,
      clanTag,
      arenaName,
      arenaImage,

      favourite,

      deck,
      towerIcon:
        playerRaw.currentDeckSupportCards?.[0]?.iconUrls?.medium ?? null,

      stats: {
        wins,
        losses,
        battles,
        winrate,
        trophies,
        bestTrophies,
        kingLevel,
        avgElixir,
        hoursPlayed,
        accountAgeYears,

        goldToMaxDeck,
        daysToMaxDeckFree,

        threeCrownWins,
        friendlyWins,
        tournamentBattleCount,

        clanDonations,
        clanDonationsReceived,

        collectionTotalCards,
        collectionMaxLevel,
        collectionEvolutions,
        collectionStarLevels,
        badgesTotal,
        badgesMaxed,
        achievementsTotal,
        achievementsCompleted,
      },
    };
  }, [profile]);
}
