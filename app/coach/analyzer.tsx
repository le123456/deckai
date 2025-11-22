// app/coach/analyzer.tsx
import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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

export default function AnalyzerScreen() {
  const router = useRouter();
  const { profile } = useProfile();

  /* ---------------------------------------
     EXTRAI CARTAS DA CONTA DO JOGADOR
  --------------------------------------- */
  const userOwnedCardIds = useMemo(() => {
    if (!profile?.player_json) return [];

    try {
      let pj: any = profile.player_json;

      if (typeof pj === "string") pj = JSON.parse(pj);
      if (Array.isArray(pj)) pj = pj[0];

      const cards = pj?.cards ?? [];
      if (!Array.isArray(cards)) return [];

      // snake_case sempre
      return cards.map((c: any) => normalizeCardName(c.name));
    } catch {
      return [];
    }
  }, [profile]);

  /* ---------------------------------------
     ESTADOS
  --------------------------------------- */
  const [deck, setDeck] = useState<DeckCard[]>(Array(8).fill(null));
  const [tower, setTower] = useState<TowerCard>(null);

  const [selectIndex, setSelectIndex] = useState<number | null>(null);
  const [selectTower, setSelectTower] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);

  const [useMyCards, setUseMyCards] = useState(false);
  const [allowIncomplete, setAllowIncomplete] = useState(false);
  const [autoTower, setAutoTower] = useState(false);

  const isPro = false;

  /* ---------------------------------------
     SEM FILTRAR — o filtro fica no Modal
  --------------------------------------- */
  const availableCards = ALL_CARDS;

  const blacklist = deck.filter(Boolean).map((c: any) => c.id);

  useEffect(() => {
    if (autoTower && !tower) {
      const t = ALL_TOWERS[0];
      setTower({ id: t.id, name: t.id, icon: t.icon });
    }
  }, [autoTower]);

  function validateDeck() {
    const filled = deck.filter(Boolean).length;
    if (!allowIncomplete && filled < 8) {
      alert("Complete o deck antes de analisar.");
      return false;
    }
    return true;
  }

  function handleFast() {
    if (!validateDeck()) return;
    alert("Rodando análise rápida…");
  }

  function handleDeep() {
    if (!validateDeck()) return;
    alert("Rodando análise avançada…");
  }

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

        <Text style={styles.headerTitle}>Analisar Deck</Text>

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
        <View style={styles.bigCard}>
          <Text style={styles.subtitle}>
            Monte seu deck e utilize a IA para avaliar.
          </Text>

          <DeckBuilder
            deck={deck}
            tower={tower}
            onPressSlot={(i) => setSelectIndex(i)}
            onPressTower={() => setSelectTower(true)}
            onRemoveCard={(i) => {
              const copy = [...deck];
              copy[i] = null;
              setDeck(copy);
            }}
            onRemoveTower={() => setTower(null)}
          />

          <TouchableOpacity style={styles.fastBtn} onPress={handleFast}>
            <Text style={styles.fastTitle}>Análise rápida</Text>
            <Text style={styles.fastDesc}>
              {isPro ? "PRO: resultado instantâneo." : "Free: assiste 15s de anúncio"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deepBtn} onPress={handleDeep}>
            <Text style={styles.deepTitle}>Análise avançada</Text>
            <Text style={styles.deepDesc}>
              {isPro
                ? "PRO: matchups, counters e ajustes completos."
                : "Free: assiste 30s de anúncio"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            {isPro
              ? "No PRO todas as análises são instantâneas e sem anúncios."
              : "No plano Free, as análises são liberadas após anúncios curtos. No PRO tudo é instantâneo e sem anúncios."}
          </Text>
        </View>
      </ScrollView>

      {/* PICKER DE CARTAS */}
      <CardPickerModal
        visible={selectIndex !== null}
        onClose={() => setSelectIndex(null)}
        blacklist={blacklist}
        cards={availableCards.map((c) => ({
          id: c.id,
          icon: c.icon,
        }))}
        userOwned={useMyCards ? userOwnedCardIds : []}
        allowAll={!useMyCards} // 🔥 AGORA FUNCIONA
        onSelect={(cardId) => {
          const c = ALL_CARDS.find((x) => x.id === cardId);
          if (!c) return;

          const updated = [...deck];
          updated[selectIndex!] = {
            id: c.id,
            name: c.id,
            icon: c.icon,
          };

          setDeck(updated);
          setSelectIndex(null);
        }}
      />

      {/* PICKER DE TORRE */}
      <TowerPickerModal
        visible={selectTower}
        onClose={() => setSelectTower(false)}
        towers={ALL_TOWERS}
        onSelect={(towerId) => {
          const t = ALL_TOWERS.find((x) => x.id === towerId);
          if (!t) return;
          setTower({ id: t.id, name: t.id, icon: t.icon });
          setSelectTower(false);
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
// ============ STYLES ============
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

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 18,
  },

  fastBtn: {
    marginTop: 20,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#020617",
  },
  fastTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  fastDesc: {
    marginTop: 2,
    fontSize: 12,
    color: "#E5E7EB",
  },

  deepBtn: {
    marginTop: 12,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#8B5CF6",
  },
  deepTitle: { fontSize: 15, fontWeight: "600", color: "#fff" },
  deepDesc: {
    marginTop: 2,
    fontSize: 12,
    color: "#EEF2FF",
  },

  footerText: {
    marginTop: 14,
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 17,
  },
});
