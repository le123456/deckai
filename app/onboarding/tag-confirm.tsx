import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { onboardingStyles as base } from "./styles";
import { ProgressBar } from "./ProgressBar";
import { useOnboarding } from "./OnboardingProvider";
import { useLocale } from "../i18n/LocaleProvider";
import { arenaMap } from "../utils/arenaMap";

type ClashCard = {
  iconUrls: { medium: string };
  elixirCost?: number;
  level?: number;
  maxLevel?: number;
};

export default function OnboardingTagConfirm() {
  const router = useRouter();
  const { t } = useLocale();
  const { setAnswer } = useOnboarding();

  const params = useLocalSearchParams();
  const tag = typeof params.tag === "string" ? params.tag : "";
  const raw = typeof params.data === "string" ? params.data : "[]";

  let player: any = {};
  try {
    const arr = JSON.parse(raw);
    player = Array.isArray(arr) ? arr[0] ?? {} : {};
  } catch {}

  const trophies = player?.trophies ?? 0;
  const wins = player?.wins ?? 0;
  const losses = player?.losses ?? 0;
  const level = player?.expLevel ?? 0;
  const deck: ClashCard[] = player?.currentDeck ?? [];
  const ninthCardUrl =
    player?.currentDeckSupportCards?.[0]?.iconUrls?.medium ?? undefined;

  const totalBattles = wins + losses;
  const winrate =
    totalBattles > 0
      ? `${Math.round((wins / totalBattles) * 100)}%`
      : "—";

  const avgElixir =
    deck.length > 0
      ? (
          deck.reduce((s, c) => s + (c.elixirCost ?? 0), 0) / deck.length
        ).toFixed(1)
      : "—";

  const arenaImg = arenaMap[getArenaIndex(trophies)];

  function getArenaIndex(t: number): number {
    const thresholds = [
      300, 600, 1000, 1300, 1600, 2000, 2300, 2600, 3000,
      3300, 3600, 4000, 4300, 4600, 5000, 5300, 5600, 6000,
      6300, 6600, 7000, 7300, 7600, 8000,
    ];
    const index = thresholds.findIndex((x) => t < x);
    return index === -1 ? thresholds.length : index;
  }

  function handleContinue() {
    setAnswer("player", player);
    router.push("/onboarding/plan-generating");
  }

  return (
    <SafeAreaView style={base.safe}>
      <View style={base.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#111827" />
        </TouchableOpacity>
      </View>

      <ProgressBar step={7} total={7} />

      <View style={[base.screenContainer, { paddingTop: 6 }]}>
        <Text style={[base.title, { marginBottom: 4 }]}>
          {t("onboarding.tag.confirmTitle")}
        </Text>

        <Text style={[base.subtitle, { marginBottom: 22 }]}>
          {t("onboarding.tag.confirmSubtitle").replace("{{tag}}", tag)}
        </Text>

        <View style={styles.cardContainer}>
          {/* ARENA + NAME */}
          <View style={{ alignItems: "center", marginBottom: 22 }}>
            {arenaImg && (
              <Image
                source={arenaImg}
                style={{ width: 130, height: 130 }}
                resizeMode="contain"
              />
            )}

            <Text style={styles.playerName}>{player?.name ?? "Jogador"}</Text>
            <Text style={styles.playerTag}>#{tag}</Text>
          </View>

          {/* STATS */}
          <View style={styles.statsRow}>
            <Stat label={t("onboarding.tag.stat.trophies")} value={trophies} />
            <Stat label={t("onboarding.tag.stat.wins")} value={wins} />
            <Stat label={t("onboarding.tag.stat.level")} value={level} />
            <Stat label={t("onboarding.tag.stat.winrate")} value={winrate} />
          </View>

          {/* DECK + TORRE */}
          <DeckPro deck={deck} ninthCardUrl={ninthCardUrl} elixir={avgElixir} />
        </View>

        <View style={{ flex: 1 }} />

        {/* YES BUTTON */}
        <TouchableOpacity
          onPress={handleContinue}
          style={[
            base.primaryButton,
            {
              width: "88%",
              alignSelf: "center",
              marginBottom: 10,
              borderRadius: 999,
            },
          ]}
        >
          <Text style={[base.primaryButtonText, { fontSize: 17 }]}>
            {t("onboarding.tag.confirmYes")}
          </Text>
        </TouchableOpacity>

        {/* NO BUTTON */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ width: "88%", alignSelf: "center", marginBottom: 14 }}
        >
          <Text style={styles.noButtonText}>
            {t("onboarding.tag.confirmNotMe")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ---------------- COMPONENTES ---------------- */

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={{ fontSize: 19, fontWeight: "700", color: "#111827" }}>
        {value}
      </Text>
      <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 3 }}>
        {label}
      </Text>
    </View>
  );
}

/* --------- nível exibido = 15 - (maxLevel + 1) + level --------- */

function getDisplayLevel(card: ClashCard): number {
  const level = card.level ?? 0;
  const maxLevel = card.maxLevel ?? 15;
  const raw = 15 - (maxLevel + 1) + level;
  return Math.max(1, Math.min(15, raw));
}

/* -------------------- DECK PRO -------------------- */

function DeckPro({
  deck,
  ninthCardUrl,
  elixir,
}: {
  deck: ClashCard[];
  ninthCardUrl?: string;
  elixir: string;
}) {
  const row1 = deck.slice(0, 4);
  const row2 = deck.slice(4, 8);

  return (
    <View style={styles.deckContainer}>
      {/* GRID ESQUERDO: 8 CARTAS (4x2) */}
      <View style={styles.deckGrid}>
        <View style={styles.row}>
          {row1.map((c, i) => (
            <DeckCard key={i} card={c} index={i} />
          ))}
        </View>

        <View style={[styles.row, { marginTop: 6 }]}>
          {row2.map((c, i) => (
            <DeckCard key={i + 4} card={c} index={i + 4} />
          ))}
        </View>

        {/* ELIXIR */}
        <View style={styles.elixirRow}>
          <Image
            source={require("../../assets/icons/elixir.png")}
            style={{ width: 14, height: 14, marginRight: 4 }}
          />
          <Text style={styles.elixirText}>{elixir}</Text>
        </View>
      </View>

      {/* GRID DIREITO: TORRE */}
      <View style={styles.towerGrid}>
        {ninthCardUrl && (
          <Image
            source={{ uri: ninthCardUrl }}
            style={styles.towerCard}
            resizeMode="contain"
          />
        )}
      </View>
    </View>
  );
}

/* -------------------- CARTA INDIVIDUAL + ANIMAÇÃO -------------------- */

function DeckCard({ card, index }: { card: ClashCard; index: number }) {
  const displayLevel = getDisplayLevel(card);

  const translateY = useRef(new Animated.Value(12)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 260,
        delay: index * 60,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 220,
        delay: index * 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, opacity, translateY]);

  return (
    <Animated.View
      style={[
        styles.cardWrapper,
        { opacity, transform: [{ translateY }] },
      ]}
    >
      <Image
        source={{ uri: card.iconUrls.medium }}
        style={styles.cardImage}
        resizeMode="contain"
      />
      <View style={styles.levelTag}>
        <Text style={styles.levelTagText}>Nv {displayLevel}</Text>
      </View>
    </Animated.View>
  );
}

/* -------------------- STYLES -------------------- */

const CARD_WIDTH = 46;
const CARD_HEIGHT = 64;
const DECK_GRID_WIDTH = 196;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 22,
    paddingVertical: 26,
    paddingHorizontal: 22,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },

  playerName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginTop: 8,
  },

  playerTag: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 26,
  },

  /* ===== DECK (tudo dentro do quadrado) ===== */

  deckContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fdfdff",
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    marginTop: 4,
    alignSelf: "stretch",
    justifyContent: "space-between",
  },

  deckGrid: {
    width: DECK_GRID_WIDTH,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardWrapper: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  cardImage: {
    width: "100%",
    height: "100%",
  },

  levelTag: {
    position: "absolute",
    bottom: 2,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.78)",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },

  levelTagText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "700",
  },

  // Torre num grid separado, alinhada pelo meio e ligeiramente pra cima
  towerGrid: {
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  towerCard: {
    width: 64,
    height: 88,
    transform: [{ translateY: -12 }], // 👈 sobe um pouco para alinhar o centro
  },

  elixirRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  elixirText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#7b27ff",
  },

  noButtonText: {
    fontSize: 15,
    textAlign: "center",
    color: "#6B7280",
    fontWeight: "600",
  },
});
