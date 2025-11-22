// src/home/components/HomeDeck.tsx
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import type { HomeDeckCard } from "../hooks/useHomePlayer";

type Props = {
  deck: HomeDeckCard[];
  avgElixir: number;
  towerIcon: string | null;
  onAnalyze: () => void;
};

const CARD_WIDTH = 46;
const CARD_HEIGHT = 64;
const DECK_GRID_WIDTH = 196;

/* -----------------------------------
   RARITY COLORS for level bar
----------------------------------- */
const rarityStyle: any = {
  common: {
    from: "rgba(15,23,42,0.9)",
    to: "rgba(30,64,175,0.9)",
    textColor: "#E5F0FF",
    border: "rgba(148,163,184,0.9)",
    textShadow: "#020617",
  },
  rare: {
    from: "rgba(180,101,35,0.95)",
    to: "rgba(242,153,74,0.95)",
    textColor: "#FFE9B8",
    border: "#FBBF77",
    textShadow: "#3b1f09",
  },
  epic: {
    from: "rgba(128,70,255,0.95)",
    to: "rgba(204,120,255,0.95)",
    textColor: "#F9E6FF",
    border: "#C084FC",
    textShadow: "#3b0764",
  },
  legendary: {
    from: "rgba(51,187,177,0.95)",
    to: "rgba(180,242,125,0.95)",
    textColor: "#F9FFE5",
    border: "#6EE7B7",
    textShadow: "#064E3B",
  },
  champion: {
    from: "rgba(255,214,94,0.98)",
    to: "rgba(255,248,174,0.98)",
    textColor: "#4A2F00",
    border: "#FACC15",
    textShadow: "#1F1300",
  },
};

function getRarity(r: string | undefined) {
  return r?.toLowerCase() ?? "common";
}

function getDisplayLevel(card: HomeDeckCard): number {
  const level = card.level ?? 0;
  const maxLevel = card.maxLevel ?? 15;
  const raw = 15 - (maxLevel + 1) + level;
  return Math.max(1, Math.min(15, raw));
}

function DeckCardView({ card, index }: { card: HomeDeckCard; index: number }) {
  const translateY = useRef(new Animated.Value(10)).current;
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

  const rarity = getRarity(card.rarity);
  const rstyle = rarityStyle[rarity] ?? rarityStyle.common;

  const displayLevel = getDisplayLevel(card);

  return (
    <Animated.View
      style={[
        styles.cardWrapper,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      {card.icon && (
        <Image
          source={
            typeof card.icon === "string" ? { uri: card.icon } : card.icon
          }
          style={styles.cardImage}
          resizeMode="contain"
        />
      )}

      {/* LEVEL BAR – ~86% width, 80% da altura antiga */}
      <LinearGradient
        colors={[rstyle.from, rstyle.to]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.levelTag,
          {
            borderColor: rstyle.border,
          },
        ]}
      >
        <Text
          style={[
            styles.levelTagText,
            {
              color: rstyle.textColor,
              textShadowColor: rstyle.textShadow,
            },
          ]}
        >
          Nv {displayLevel}
        </Text>
      </LinearGradient>
    </Animated.View>
  );
}

export function HomeDeck({ deck, avgElixir, towerIcon, onAnalyze }: Props) {
  const row1 = deck.slice(0, 4);
  const row2 = deck.slice(4, 8);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Deck atual</Text>

        <View style={styles.deckOuter}>
          {/* GRID 4x2 ORIGINAL */}
          <View style={styles.deckGrid}>
            <View style={styles.row}>
              {row1.map((c, i) => (
                <DeckCardView key={c.name + i} card={c} index={i} />
              ))}
            </View>

            <View style={[styles.row, { marginTop: 6 }]}>
              {row2.map((c, i) => (
                <DeckCardView
                  key={c.name + (i + 4)}
                  card={c}
                  index={i + 4}
                />
              ))}
            </View>

            {/* Elixir com BOX ROXO */}
            <View style={styles.elixirRow}>
              <View style={styles.elixirBox}>
                <Image
                  source={require("../../../assets/icons/elixir.webp")}
                  style={styles.elixirIcon}
                  resizeMode="contain"
                />
                <Text style={styles.elixirText}>{avgElixir}</Text>
              </View>
            </View>
          </View>

          {/* Torre à direita */}
          <View style={styles.towerCol}>
            {towerIcon && (
              <Image
                source={{ uri: towerIcon }}
                style={styles.towerCard}
                resizeMode="contain"
              />
            )}
          </View>
        </View>

        <TouchableOpacity style={styles.analyzeBtn} onPress={onAnalyze}>
          <Text style={styles.analyzeText}>Analisar deck com IA</Text>
        </TouchableOpacity>

        <Text style={styles.analyzeHint}>
          Counters, ajustes e matchups completos com base neste deck.
        </Text>
      </View>
    </View>
  );
}

/* -----------------------------------------
   STYLES
----------------------------------------- */
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    marginTop: 14,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#020617",
    marginBottom: 10,
  },

  deckOuter: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginTop: 4,
  },

  deckGrid: {
    width: DECK_GRID_WIDTH,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  /* CARD */
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

  /* LEVEL — 86% da largura, ~80% da altura antiga, borda só embaixo */
  levelTag: {
    position: "absolute",
    bottom: 0,
    width: "86%",
    height: "20.5%",
    alignSelf: "center",
    paddingVertical: 1.5,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderWidth: 1,
    borderTopWidth: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  levelTagText: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.2,
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 1.5,
  },

  /* ELIXIR */
  elixirRow: {
    flexDirection: "row",
    marginTop: 8,
  },
  elixirBox: {
    flexDirection: "row",
    backgroundColor: "rgba(124,58,237,0.12)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "flex-start",
  },
  elixirIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  elixirText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#7C3AED",
  },

  /* TORRE */
  towerCol: {
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  towerCard: {
    width: 64,
    height: 88,
    transform: [{ translateY: -10 }],
  },

  /* BOTÃO */
  analyzeBtn: {
    marginTop: 14,
    backgroundColor: "#111827",
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: "center",
  },
  analyzeText: {
    color: "#F9FAFB",
    fontSize: 14,
    fontWeight: "600",
  },
  analyzeHint: {
    marginTop: 6,
    fontSize: 11,
    color: "#6B7280",
    textAlign: "center",
  },
});

export default HomeDeck;
