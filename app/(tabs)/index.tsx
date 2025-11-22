// app/home/index.tsx
import React, { useCallback, useState } from "react";
import {
  ScrollView,
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";

import { useProfile } from "../../src/profile/useProfile";
import { useRefreshPlayer } from "../../src/home/hooks/useRefreshPlayerN8N";
import { useHomePlayer } from "../../src/home/hooks/useHomePlayer";

import { HomeHeader } from "../../src/home/components/HomeHeader";
import { HomeStatsCard } from "../../src/home/components/HomeStatsCard";
import { HomeDeck } from "../../src/home/components/HomeDeck";
import { HomeAISection } from "../../src/home/components/HomeAISection"; // 👈 IMPORTADO

export default function HomeScreen() {
  const { profile, loading, reloadProfile } = useProfile();
  const [fullLoading, setFullLoading] = useState(false);

  const player = useHomePlayer(profile);

  const { refresh, refreshing } = useRefreshPlayer(profile);

  const handleRefresh = useCallback(async () => {
    setFullLoading(true);

    await refresh();
    await reloadProfile();

    setFullLoading(false);
  }, [refresh, reloadProfile]);

  if (loading || fullLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#111827" />
        <Text style={styles.loadingText}>Atualizando dados...</Text>
      </View>
    );
  }

  if (!player) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Conecte sua TAG primeiro para ver sua Home personalizada.
        </Text>
      </View>
    );
  }

  const isPro = profile?.plan === "pro"; // 👈 PRO real

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <HomeHeader player={player} />

      <HomeStatsCard
        stats={player.stats}
        refreshing={refreshing}
        onRefreshFast={handleRefresh}
      />



      <HomeDeck
        deck={player.deck}
        avgElixir={player.stats.avgElixir}
        towerIcon={player.towerIcon}
        onAnalyze={() => {
          console.log("Deck analysis button clicked");
        }}
      />
            {/* 🔥 SEÇÃO DE IA — adicionada aqui */}
      <HomeAISection
        isPro={isPro}
        onFast={() => {
          console.log("FAST AI ANALYSIS");
          // abrir drawer, modal, n8n, anúncio… você decide depois
        }}
        onDeep={() => {
          console.log("DEEP AI ANALYSIS");
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F5FB",
  },
  content: {
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#F4F5FB",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: "#111827",
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: "#F4F5FB",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 15,
    color: "#111827",
  },
});
