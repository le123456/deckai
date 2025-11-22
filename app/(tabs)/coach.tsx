// app/(tabs)/coach.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function CoachScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      {/* HEADER */}
      <Text style={styles.title}>Coach IA</Text>
      <Text style={styles.subtitle}>
        Ferramentas avançadas para evoluir seu jogo.
      </Text>

      <Text style={styles.sectionLabel}>Ferramentas</Text>

      {/* --- ANALISAR DECK --- */}
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => router.push("/coach/analyzer")}
      >
        <View style={[styles.iconCircle, styles.iconPurple]}>
          <Ionicons name="flash-outline" size={24} color="#FFFFFF" />
        </View>

        <View style={styles.cardTextArea}>
          <View style={styles.titleRow}>
            <Text style={styles.cardTitle}>Analisar deck</Text>
            <View style={[styles.badge, { backgroundColor: "#EEF2FF" }]}>
              <Text style={[styles.badgeText, { color: "#4F46E5" }]}>
                IA
              </Text>
            </View>
          </View>

          <Text style={styles.cardSubtitle}>
            Fraquezas, ajustes e como jogar melhor.
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </TouchableOpacity>

      {/* --- MATCHUPS --- */}
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => router.push("/coach/matchups")}
      >
        <View style={[styles.iconCircle, styles.iconBlue]}>
          <Ionicons name="git-compare-outline" size={24} color="#FFFFFF" />
        </View>

        <View style={styles.cardTextArea}>
          <View style={styles.titleRow}>
            <Text style={styles.cardTitle}>Matchups</Text>
            <View style={[styles.badge, { backgroundColor: "#DBEAFE" }]}>
              <Text style={[styles.badgeText, { color: "#2563EB" }]}>
                1X1
              </Text>
            </View>
          </View>

          <Text style={styles.cardSubtitle}>
            Compare decks e veja quem tem vantagem.
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </TouchableOpacity>

      {/* --- DECK COUNTER --- */}
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => router.push("/")}
      >
        <View style={[styles.iconCircle, styles.iconRed]}>
          <Ionicons name="shield-outline" size={24} color="#FFFFFF" />
        </View>

        <View style={styles.cardTextArea}>
          <View style={styles.titleRow}>
            <Text style={styles.cardTitle}>Deck counter</Text>
            <View style={[styles.badge, { backgroundColor: "#FEE2E2" }]}>
              <Text style={[styles.badgeText, { color: "#DC2626" }]}>
                META
              </Text>
            </View>
          </View>

          <Text style={styles.cardSubtitle}>
            Gere um deck para punir o meta atual.
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </TouchableOpacity>

      {/* --- APRENDER --- */}
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => router.push("/")}
      >
        <View style={[styles.iconCircle, styles.iconGreen]}>
          <Ionicons name="school-outline" size={24} color="#FFFFFF" />
        </View>

        <View style={styles.cardTextArea}>
          <View style={styles.titleRow}>
            <Text style={styles.cardTitle}>Aprender</Text>
            <View style={[styles.badge, { backgroundColor: "#DCFCE7" }]}>
              <Text style={[styles.badgeText, { color: "#15803D" }]}>
                XP
              </Text>
            </View>
          </View>

          <Text style={styles.cardSubtitle}>
            Aulas rápidas, guias e quizzes para evoluir.
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F5FB",
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 12,
  },

  card: {
    width: "100%",
    borderRadius: 24,
    height: "15%",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  iconPurple: { backgroundColor: "#7C3AED" },
  iconBlue: { backgroundColor: "#3B82F6" },
  iconRed: { backgroundColor: "#EF4444" },
  iconGreen: { backgroundColor: "#10B981" },

  cardTextArea: { flex: 1 },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  badge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
  },

  cardSubtitle: {
    fontSize: 12,
    color: "#6B7280",
  },
});
