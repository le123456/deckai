// components/ConfigModal.tsx
import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  onClose: () => void;

  useMyCards: boolean;
  allowIncomplete: boolean;
  autoTower: boolean;

  setUseMyCards: (v: boolean) => void;
  setAllowIncomplete: (v: boolean) => void;
  setAutoTower: (v: boolean) => void;
};

export function ConfigModal({
  visible,
  onClose,
  useMyCards,
  allowIncomplete,
  autoTower,
  setUseMyCards,
  setAllowIncomplete,
  setAutoTower,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.sheet}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Configurações</Text>

          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* OPTIONS */}
        <View style={styles.options}>
          {/* USAR MINHAS CARTAS */}
          <View style={styles.optionRow}>
            <View style={styles.optionTextBlock}>
              <Text style={styles.optionTitle}>Usar minhas cartas</Text>
              <Text style={styles.optionSubtitle}>
                Filtrar cartas para mostrar apenas as que você possui.
              </Text>
            </View>
            <Switch
              value={useMyCards}
              onValueChange={setUseMyCards}
              thumbColor="#fff"
              trackColor={{ false: "#2A2A2E", true: "#7C3AED" }}
            />
          </View>

          {/* DECK INCOMPLETO */}
          <View style={styles.optionRow}>
            <View style={styles.optionTextBlock}>
              <Text style={styles.optionTitle}>Permitir deck incompleto</Text>
              <Text style={styles.optionSubtitle}>
                Executar análise mesmo sem todas as 8 cartas.
              </Text>
            </View>
            <Switch
              value={allowIncomplete}
              onValueChange={setAllowIncomplete}
              thumbColor="#fff"
              trackColor={{ false: "#2A2A2E", true: "#7C3AED" }}
            />
          </View>

          {/* TORRE AUTOMÁTICA */}
          <View style={styles.optionRow}>
            <View style={styles.optionTextBlock}>
              <Text style={styles.optionTitle}>Torre automática</Text>
              <Text style={styles.optionSubtitle}>
                Sugerir automaticamente a melhor torre.
              </Text>
            </View>
            <Switch
              value={autoTower}
              onValueChange={setAutoTower}
              thumbColor="#fff"
              trackColor={{ false: "#2A2A2E", true: "#7C3AED" }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

//
// ================================
//             STYLES
// ================================
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
  },

  sheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#141416", // CINZA ESCURO PREMIUM
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 42,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },

  closeBtn: {
    padding: 6,
  },

  options: {
    marginTop: 8,
  },

  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.07)",
  },

  optionTextBlock: {
    width: "75%",
  },

  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 2,
  },

  optionSubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.55)",
    lineHeight: 18,
  },
});
