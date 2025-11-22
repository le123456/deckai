// src/home/components/HomeHeader.tsx
import React, { useMemo } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { HomePlayerModel } from "../hooks/useHomePlayer";

type Props = { player: HomePlayerModel };

export function HomeHeader({ player }: Props) {
  const insets = useSafeAreaInsets();

  const favLocal = player.favourite.local;
  const favRemote = player.favourite.remote;

  let favSource: any | undefined;
  if (favLocal) favSource = favLocal;
  else if (favRemote) favSource = { uri: favRemote };

  /** --------------------------
   * Font size dinâmico:
   * - Nome curto → maior
   * - Nome longo → reduz automaticamente
   ------------------------------------- */
  const dynamicNameSize = useMemo(() => {
    const len = player.name.length;
    if (len <= 8) return 28;
    if (len <= 12) return 25;
    if (len <= 16) return 22;
    return 20;
  }, [player.name]);

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingTop: insets.top * 0.25, // topo mais baixo
        },
      ]}
    >
      <View style={styles.container}>

        {/* ------------------- ARENA ------------------- */}
        <View style={styles.left}>
          <Image
            source={player.arenaImage}
            style={styles.arena}
            resizeMode="contain"
          />
          <Text style={styles.arenaName}>{player.arenaName}</Text>
        </View>

        {/* ------------------- CENTRO ------------------- */}
        <View style={styles.center}>
          <Text style={[styles.name, { fontSize: dynamicNameSize }]}>
            {player.name}
          </Text>

          {player.clanName && (
            <Text style={styles.clanName}>{player.clanName}</Text>
          )}

          <Text style={styles.tagText}>{player.tag}</Text>

          <View style={styles.rowCenter}>
            <Image
              source={require("../../../assets/icons/crown.webp")}
              style={styles.trophyIcon}
            />
            <Text style={styles.trophy}>{player.trophies}</Text>
          </View>
        </View>

        {/* ------------------- FAVORITA ------------------- */}
        <View style={styles.right}>
          <Text style={styles.favLabel}>Carta favorita</Text>

          {favSource && (
            <Image
              source={favSource}
              style={styles.favCard}
              resizeMode="contain"
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 42,
    borderBottomRightRadius: 42,
    paddingBottom: 28,
    overflow: "hidden",
  },

  container: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: 40, // equilibrado
  },

  left: {
    width: "31%",
    alignItems: "center",
  },

  center: {
    width: "38%", // maior para nome/clã
    alignItems: "center",
  },

  right: {
    width: "31%",
    alignItems: "flex-end",
    paddingRight: 4,
  },

  /** ARENA */
  arena: {
    width: 110,
    height: 110,
    marginTop: -6, // sobe um pouquinho
  },

  arenaName: {
    marginTop: 6,
    fontSize: 13,
    color: "#475569",
    fontWeight: "500",
  },

  /** CARTA FAVORITA */
  favCard: {
    width: 120,
    height: 120,
    marginTop: 10,

    // move levemente à direita para polir o layout
    marginRight: -6,
  },

  favLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: -4,
    marginRight: 6,
    fontWeight: "500",
  },

  /** CENTRO */
  name: {
    fontWeight: "800",
    color: "#020617",
    textAlign: "center",
  },

  tagText: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },

  clanName: {
    fontSize: 14,
    color: "#475569",
    marginTop: 4,
    fontWeight: "600",
  },

  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  trophyIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },

  trophy: {
    fontSize: 16,
    fontWeight: "700",
    color: "#334155",
  },
});
