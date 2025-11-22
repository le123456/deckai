// app/coach/matchups.tsx
import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { DeckBuilder } from "../../components/DeckBuilder";
import { CardPickerModal } from "../../components/CardPickerModal";
import { TowerPickerModal } from "../../components/TowerPickerModal";
import { ConfigModal } from "../../components/ConfigModal";

import { ALL_CARDS } from "../../src/cards/cards";
import { ALL_TOWERS } from "../../src/cards/towers";

import { useProfile } from "../../src/profile/useProfile";
import { normalizeCardName } from "../../src/cards/cardNameNormalizer";

type DeckCard = { id: string; name: string; icon: any } | null;
type TowerCard = { id: string; name: string; icon: any } | null;

export default function MatchupsScreen() {
  const router = useRouter();
  const { profile } = useProfile();

  // ============================
  // EXTRAI CARTAS DO JOGADOR
  // ============================
  const userOwnedCardIds = useMemo(() => {
    if (!profile?.player_json) return [];

    try {
      let pj: any = profile.player_json;

      if (typeof pj === "string") pj = JSON.parse(pj);
      if (Array.isArray(pj)) pj = pj[0];

      const cards = pj?.cards ?? [];
      if (!Array.isArray(cards)) return [];

      return cards.map((c: any) => normalizeCardName(c.name)); // snake_case
    } catch {
      return [];
    }
  }, [profile]);

  // ============================
  // 2 DECKS
  // ============================
  const [deckA, setDeckA] = useState<DeckCard[]>(Array(8).fill(null));
  const [towerA, setTowerA] = useState<TowerCard>(null);

  const [deckB, setDeckB] = useState<DeckCard[]>(Array(8).fill(null));
  const [towerB, setTowerB] = useState<TowerCard>(null);

  // Pickers
  const [pickA, setPickA] = useState<number | null>(null);
  const [pickB, setPickB] = useState<number | null>(null);

  const [pickTowerA, setPickTowerA] = useState(false);
  const [pickTowerB, setPickTowerB] = useState(false);

  const [configOpen, setConfigOpen] = useState(false);

  const [useMyCards, setUseMyCards] = useState(false);
  const [allowIncomplete, setAllowIncomplete] = useState(false);
  const [autoTower, setAutoTower] = useState(false);

  const isPro = false;

  // ============================
  // NUNCA mais filtramos aqui
  // ============================
  const availableCards = ALL_CARDS;

  const blacklistA = deckA.filter(Boolean).map((c: any) => c.id);
  const blacklistB = deckB.filter(Boolean).map((c: any) => c.id);

  // Torre automática
  useEffect(() => {
    if (autoTower) {
      if (!towerA) {
        const t = ALL_TOWERS[0];
        setTowerA({ id: t.id, name: t.id, icon: t.icon });
      }
      if (!towerB) {
        const t = ALL_TOWERS[0];
        setTowerB({ id: t.id, name: t.id, icon: t.icon });
      }
    }
  }, [autoTower]);

  // ============================
  // PROGRESS BAR
  // ============================
  const progress = useMemo(() => new Animated.Value(0), []);
  const [result, setResult] = useState<{ winA: number; winB: number } | null>(
    null
  );

  function animateBar(value: number) {
    Animated.timing(progress, {
      toValue: value,
      duration: 900,
      useNativeDriver: false,
    }).start();
  }

  // ============================
  // VALIDAÇÃO
  // ============================
  function validateDecks() {
    const filledA = deckA.filter(Boolean).length;
    const filledB = deckB.filter(Boolean).length;

    if (!allowIncomplete && (filledA < 8 || filledB < 8)) {
      alert("Complete os dois decks para analisar.");
      return false;
    }
    return true;
  }

  // SIMULAÇÃO TEMPORÁRIA
  function computeMatchup() {
    if (!validateDecks()) return;

    const score = Math.random();
    const r = {
      winA: Math.round(score * 100),
      winB: Math.round((1 - score) * 100),
    };

    setResult(r);
    animateBar(score);
  }

  // =============================
  // UI
  // =============================
  return (
    <View style={styles.screen}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => router.replace("/(tabs)/coach")}
        >
          <Ionicons name="chevron-back" size={22} color="#111" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Matchups</Text>

        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => setConfigOpen(true)}
        >
          <Ionicons name="options-outline" size={22} color="#111" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        {/* Deck A */}
        <View style={styles.bigCard}>
          <Text style={styles.labelDeck}>Seu Deck</Text>

          <DeckBuilder
            deck={deckA}
            tower={towerA}
            onPressSlot={(i) => setPickA(i)}
            onPressTower={() => setPickTowerA(true)}
            onRemoveCard={(i) => {
              const d = [...deckA];
              d[i] = null;
              setDeckA(d);
            }}
            onRemoveTower={() => setTowerA(null)}
          />
        </View>

        {/* Deck B */}
        <View style={styles.bigCard}>
          <Text style={styles.labelDeck}>Deck Adversário</Text>

          <DeckBuilder
            deck={deckB}
            tower={towerB}
            onPressSlot={(i) => setPickB(i)}
            onPressTower={() => setPickTowerB(true)}
            onRemoveCard={(i) => {
              const d = [...deckB];
              d[i] = null;
              setDeckB(d);
            }}
            onRemoveTower={() => setTowerB(null)}
          />
        </View>

        {/* BOTÃO */}
        <TouchableOpacity style={styles.calcBtn} onPress={computeMatchup}>
          <Text style={styles.calcBtnText}>Calcular Matchup</Text>
        </TouchableOpacity>

        {/* RESULTADO */}
        {result && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Probabilidade estimada</Text>

            <View style={styles.barWrapper}>
              <Animated.View
                style={[
                  styles.barFill,
                  {
                    width: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </View>

            <View style={styles.percentRow}>
              <Text style={styles.percentA}>{result.winA}%</Text>
              <Text style={styles.percentB}>{result.winB}%</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* MODALS */}

      {/* PICKER A */}
      <CardPickerModal
        visible={pickA !== null}
        onClose={() => setPickA(null)}
        blacklist={blacklistA}
        cards={availableCards.map((c) => ({ id: c.id, icon: c.icon }))}
        userOwned={useMyCards ? userOwnedCardIds : []}
        allowAll={!useMyCards}
        onSelect={(cardId) => {
          const c = ALL_CARDS.find((x) => x.id === cardId);
          if (!c) return;
          const updated = [...deckA];
          updated[pickA!] = { id: c.id, name: c.id, icon: c.icon };
          setDeckA(updated);
          setPickA(null);
        }}
      />

      {/* PICKER B */}
      <CardPickerModal
        visible={pickB !== null}
        onClose={() => setPickB(null)}
        blacklist={blacklistB}
        cards={availableCards.map((c) => ({ id: c.id, icon: c.icon }))}
        userOwned={useMyCards ? userOwnedCardIds : []}
        allowAll={!useMyCards}
        onSelect={(cardId) => {
          const c = ALL_CARDS.find((x) => x.id === cardId);
          if (!c) return;
          const updated = [...deckB];
          updated[pickB!] = { id: c.id, name: c.id, icon: c.icon };
          setDeckB(updated);
          setPickB(null);
        }}
      />

      {/* Tower A */}
      <TowerPickerModal
        visible={pickTowerA}
        onClose={() => setPickTowerA(false)}
        towers={ALL_TOWERS}
        onSelect={(id) => {
          const t = ALL_TOWERS.find((x) => x.id === id);
          if (t) setTowerA({ id: t.id, name: t.id, icon: t.icon });
          setPickTowerA(false);
        }}
      />

      {/* Tower B */}
      <TowerPickerModal
        visible={pickTowerB}
        onClose={() => setPickTowerB(false)}
        towers={ALL_TOWERS}
        onSelect={(id) => {
          const t = ALL_TOWERS.find((x) => x.id === id);
          if (t) setTowerB({ id: t.id, name: t.id, icon: t.icon });
          setPickTowerB(false);
        }}
      />

      {/* CONFIG */}
      <ConfigModal
        visible={configOpen}
        onClose={() => setConfigOpen(false)}
        useMyCards={useMyCards}
        allowIncomplete={allowIncomplete}
        autoTower={autoTower}
        setUseMyCards={setUseMyCards}
        setAllowIncomplete={setAllowIncomplete}
        setAutoTower={setAutoTower}
      />
    </View>
  );
}

//
// =======================
//        STYLES
// =======================
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F3F4F6" },

  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },

  headerBtn: {
    width: 36,
    height: 36,
    backgroundColor: "#F1F1F2",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: { fontSize: 18, fontWeight: "700", color: "#111" },

  bigCard: {
    backgroundColor: "#fff",
    marginTop: 24,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 22,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },

  labelDeck: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },

  calcBtn: {
    marginTop: 26,
    marginHorizontal: 20,
    backgroundColor: "#7C3AED",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },

  calcBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },

  resultCard: {
    marginTop: 26,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },

  resultTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
    marginBottom: 14,
  },

  barWrapper: {
    width: "100%",
    height: 16,
    backgroundColor: "#E5E7EB",
    borderRadius: 20,
    overflow: "hidden",
  },

  barFill: {
    height: "100%",
    backgroundColor: "#7C3AED",
  },

  percentRow: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  percentA: { fontWeight: "700", color: "#1E293B" },
  percentB: { fontWeight: "700", color: "#7C3AED" },
});
