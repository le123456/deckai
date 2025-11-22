// src/home/components/HomeAISection.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

type Props = {
  isPro: boolean;
};

export function HomeAISection({ isPro }: Props) {
  const router = useRouter();

  function goAnalyze() {
    router.push("/coach/analyzer");
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>IA da Deck</Text>
        <Text style={styles.subtitle}>
          Gere insights rápidos ou análises profundas sobre seu deck e estilo de
          jogo.
        </Text>

        {/* Botão Análise Rápida */}
        <TouchableOpacity style={styles.fastBtn} onPress={goAnalyze}>
          <View>
            <Text style={styles.fastTitle}>Análise rápida</Text>
            <Text style={styles.fastDesc}>
              {isPro
                ? "PRO: resultado instantâneo, sem anúncio."
                : "Free: assiste 15s de anúncio"}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Botão Análise Avançada */}
        <TouchableOpacity style={styles.deepBtn} onPress={goAnalyze}>
          <View>
            <Text style={styles.deepTitle}>Análise avançada</Text>
            <Text style={styles.deepDesc}>
              {isPro
                ? "PRO: matchups, counters e ajustes completos."
                : "Free: assiste 30s de anúncio"}
            </Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.footer}>
          {isPro
            ? "No PRO, toda análise de IA é instantânea e sem anúncios."
            : "No plano Free, toda análise de IA é liberada após um anúncio curto. No PRO, tudo é instantâneo e sem anúncios."}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    marginTop: 16,
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 18,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#020617",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#6B7280",
  },
  fastBtn: {
    marginTop: 14,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#020617",
  },
  fastTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#F9FAFB",
  },
  fastDesc: {
    marginTop: 2,
    fontSize: 12,
    color: "#E5E7EB",
  },
  deepBtn: {
    marginTop: 10,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#8B5CF6",
  },
  deepTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#F9FAFB",
  },
  deepDesc: {
    marginTop: 2,
    fontSize: 12,
    color: "#EEF2FF",
  },
  footer: {
    marginTop: 10,
    fontSize: 11,
    color: "#6B7280",
  },
});
