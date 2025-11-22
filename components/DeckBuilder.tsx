// components/DeckBuilder.tsx
import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
} from "react-native";

type CardType = {
  id: string;
  name: string;
  icon: any;
};

export function DeckBuilder({
  deck,
  tower,
  onPressSlot,
  onPressTower,
  onRemoveCard,
  onRemoveTower,
}: {
  deck: (CardType | null)[];
  tower: CardType | null;
  onPressSlot: (index: number) => void;
  onPressTower: () => void;
  onRemoveCard: (index: number) => void;
  onRemoveTower: () => void;
}) {
  return (
    <View style={styles.wrapper}>

      {/* GRID 4×2 */}
      <View style={styles.left}>
        {deck.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.cardSlot, card && styles.cardSlotFilled]}
            activeOpacity={0.85}
            onPress={() => {
              if (card) return onRemoveCard(index);
              onPressSlot(index);
            }}
            onLongPress={() => {
              if (card) onPressSlot(index);
            }}
          >
            {card ? (
              <Image source={card.icon} style={styles.cardImage} />
            ) : (
              <View style={styles.emptySlot}>
                <Text style={styles.emptyIcon}>+</Text>
                <Text style={styles.emptyText}>Adicionar</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* TORRE */}
      <View style={styles.rightWrapper}>
        <TouchableOpacity
          style={[styles.towerSlot, tower && styles.cardSlotFilled]}
          activeOpacity={0.9}
          onPress={() => {
            if (tower) return onRemoveTower();
            onPressTower();
          }}
          onLongPress={() => {
            if (tower) onPressTower();
          }}
        >
          {tower ? (
            <Image source={tower.icon} style={styles.towerImage} />
          ) : (
            <View style={styles.emptySlot}>
              <Text style={styles.emptyIcon}>+</Text>
              <Text style={styles.emptyText}>Torre</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

    </View>
  );
}

//
// =============================
//        PROPORÇÕES
// =============================
//
// Proporção oficial Clash Royale (cards e towers novas)
//
const ASPECT = 0.68;

// Cartas grandes + altas (visual oficial)
const CARD_WIDTH_PERCENT = "22%";

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },

  // GRID DAS CARTAS
  left: {
    width: "74%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  // COLUNA DA TORRE
  rightWrapper: {
    width: "26%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 38, // torre um pouco mais alta
  },

  // SLOT DAS CARTAS — altura corrigida
  cardSlot: {
    width: CARD_WIDTH_PERCENT,
    aspectRatio: ASPECT,
    backgroundColor: "#FFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 16,
  },

  cardSlotFilled: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },

  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  // TORRE — perfeita, levemente maior
  towerSlot: {
    width: "82%",          // ajustado (era 85%)
    aspectRatio: ASPECT,
    transform: [{ scale: 0.92 }],  // 0.92 = perfeito
    backgroundColor: "#FFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  towerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  // SLOT VAZIO
  emptySlot: {
    alignItems: "center",
  },
  emptyIcon: {
    fontSize: 28,
    color: "#9CA3AF",
  },
  emptyText: {
    marginTop: 4,
    fontSize: 11,
    color: "#9CA3AF",
  },
});
