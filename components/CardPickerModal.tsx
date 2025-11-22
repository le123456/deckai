// components/CardPickerModal.tsx
import React, { useState, useMemo } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

import { normalizeCardName } from "../src/cards/cardNameNormalizer";

type CardItem = {
  id: string;   // ex: "baby_dragon", "skeletons", "royal-ghost"
  icon: any;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
  cards: CardItem[];
  blacklist?: string[];
  userOwned: string[];      // nomes crus vindos do Clash (raw)
  allowAll: boolean;        // 🔥 SE useMyCards=false → TRUE
};

export function CardPickerModal({
  visible,
  onClose,
  onSelect,
  cards,
  userOwned,
  allowAll,
  blacklist = [],
}: Props) {
  const [query, setQuery] = useState("");

  //
  // 🔥 1) Normaliza todas cartas owned para snake_case
  //
  const ownedNormalized = useMemo(() => {
    return userOwned.map((raw) => normalizeCardName(raw));
  }, [userOwned]);

  //
  // 🔥 2) Normalizar query (mantém padrão do app inteiro)
  //
  const normQuery = normalizeCardName(query);

  //
  // 🔥 3) Filtrar cartas
  //
  const filtered = useMemo(() => {
    return cards.filter((c) => {
      const id = c.id; // já normalizado no assets
      const matchesQuery = id.includes(normQuery);
      const notBlocked = !blacklist.includes(c.id);
      return matchesQuery && notBlocked;
    });
  }, [cards, normQuery, blacklist]);

  //
  // HELPER: verifica se carta é owned
  //
  function isOwned(id: string) {
    const norm = normalizeCardName(id);
    return ownedNormalized.includes(norm);
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>Selecionar Carta</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* SEARCH */}
          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={18} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar carta..."
              placeholderTextColor="#777"
              value={query}
              onChangeText={setQuery}
            />
          </View>

          {/* GRID */}
          <FlatList
            data={filtered}
            keyExtractor={(i) => i.id}
            numColumns={4}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.row}
            renderItem={({ item }) => {
              const owned = isOwned(item.id);

              // 🔥 Lógica corrigida:
              // allowAll = true → SEM LIMITES
              const isDisabled = !allowAll && !owned;

              return (
                <TouchableOpacity
                  disabled={isDisabled}
                  onPress={() => {
                    if (!isDisabled) {
                      onSelect(item.id);
                      onClose();
                    }
                  }}
                  style={[
                    styles.cardBtn,
                    isDisabled && styles.disabledCard,
                  ]}
                >
                  <Image source={item.icon} style={styles.cardImg} />

                  {owned && !allowAll && (
                    <View style={styles.badgeOwned}>
                      <Text style={styles.badgeOwnedText}>Na conta</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

//
// =============================
//          STYLES
// =============================
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modal: {
    height: "84%",
    backgroundColor: "#0c0c0e",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#151518",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    gap: 10,
    marginBottom: 16,
  },
  searchInput: {
    color: "#fff",
    flex: 1,
    fontSize: 15,
  },

  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  cardBtn: {
    width: "22%",
    aspectRatio: 0.68,
    backgroundColor: "#1a1a1e",
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledCard: {
    opacity: 0.25,
  },

  cardImg: {
    width: "100%",
    height: "100%",
  },

  badgeOwned: {
    position: "absolute",
    top: 4,
    left: 4,
    backgroundColor: "#10B981",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeOwnedText: {
    fontSize: 9,
    fontWeight: "600",
    color: "#fff",
  },
});
