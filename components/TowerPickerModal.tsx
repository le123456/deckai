// components/TowerPickerModal.tsx
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

type Tower = {
  id: string;
  icon: any;
};

type TowerPickerProps = {
  visible: boolean;
  onClose: () => void;
  towers: Tower[];
  onSelect: (towerId: string) => void;
};

export function TowerPickerModal({
  visible,
  onClose,
  towers,
  onSelect,
}: TowerPickerProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => towers.filter((t) => t.id.toLowerCase().includes(query.toLowerCase())),
    [query, towers]
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          
          <View style={styles.header}>
            <Text style={styles.title}>Selecionar Torre</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={23} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={18} color="#aaa" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar torre..."
              placeholderTextColor="#666"
              value={query}
              onChangeText={setQuery}
            />
          </View>

          <FlatList
            data={filtered}
            keyExtractor={(i) => i.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.row}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.towerBtn}
                onPress={() => {
                  onSelect(item.id);
                  onClose();
                }}
              >
                <Image source={item.icon} style={styles.towerImg} />
              </TouchableOpacity>
            )}
          />

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "flex-end" },
  modal: {
    height: "72%",
    backgroundColor: "#0b0b0c",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
  },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 18 },
  title: { color: "#fff", fontSize: 18, fontWeight: "600" },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1C",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 18,
    gap: 12,
  },
  searchInput: { flex: 1, color: "#fff" },
  row: { justifyContent: "space-between", marginBottom: 18 },
  towerBtn: {
    width: "46%",
    aspectRatio: 0.68,
    backgroundColor: "#131315",
    borderRadius: 14,
    overflow: "hidden",
  },
  towerImg: { width: "100%", height: "100%" },
});
