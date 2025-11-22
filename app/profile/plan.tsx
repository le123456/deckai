// app/profile/plan.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useProfile } from "../../src/profile/useProfile";

export default function PlanScreen() {
  const router = useRouter();
  const { profile } = useProfile();

  const plan = profile?.plan === "pro" ? "PRO" : "Free";
  const isPro = plan === "PRO";

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Voltar */}
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={22} color="#111827" />
      </TouchableOpacity>

      {/* Títulos */}
      <Text style={styles.title}>Plano DeckIA</Text>
      <Text style={styles.subtitle}>
        Controle sua experiência com a IA da DeckIA.
      </Text>

      {/* Card único de plano */}
      <View style={styles.card}>
        {/* Topo do card: plano + pill de experiência */}
        <View style={styles.cardHeaderRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardLabel}>Plano atual</Text>

            <View style={styles.planRow}>
              <Text style={styles.planName}>{plan}</Text>

              <View
                style={[
                  styles.planBadge,
                  isPro ? styles.planBadgePro : styles.planBadgeFree,
                ]}
              >
                <Text
                  style={[
                    styles.planBadgeText,
                    isPro ? styles.planBadgeTextPro : styles.planBadgeTextFree,
                  ]}
                >
                  {isPro ? "PRO ativo" : "Plano Free"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.experiencePill}>
            <Ionicons
              name={isPro ? "sparkles-outline" : "videocam-outline"}
              size={16}
              color={isPro ? "#7C3AED" : "#6B7280"}
            />
            <Text style={styles.experiencePillText}>
              {isPro ? "Experiência completa" : "IA com anúncios"}
            </Text>
          </View>
        </View>

        {/* Descrição curta */}
        <Text style={styles.desc}>
          {isPro
            ? "Você está no PRO. IA mais rápida, sem anúncios e com análises avançadas sempre liberadas."
            : "Você está no plano Free. As funções essenciais da IA estão ativas, mas algumas análises profundas exigem anúncios ou podem ter limite diário."}
        </Text>

        <View style={styles.divider} />

        {/* Se for FREE, mostra benefícios do PRO dentro do card */}
        {!isPro ? (
          <>
            <Text style={styles.sectionLabel}>Ao virar PRO você ganha:</Text>

            <View style={styles.featureRow}>
              <Ionicons name="flash-outline" size={18} color="#7C3AED" />
              <Text style={styles.featureText}>
                IA instantânea, sem precisar assistir anúncios.
              </Text>
            </View>

            <View style={styles.featureRow}>
              <Ionicons
                name="shield-checkmark-outline"
                size={18}
                color="#7C3AED"
              />
              <Text style={styles.featureText}>
                Análises profundas de deck: matchups, counters e ajustes finos.
              </Text>
            </View>

            <View style={styles.featureRow}>
              <Ionicons name="sparkles-outline" size={18} color="#7C3AED" />
              <Text style={styles.featureText}>
                Sugestões otimizadas com a melhor IA da plataforma.
              </Text>
            </View>

            <View style={styles.featureRow}>
              <Ionicons name="stats-chart-outline" size={18} color="#7C3AED" />
              <Text style={styles.featureText}>
                Prioridade em novos modos, features e melhorias.
              </Text>
            </View>

            {/* 3 dias grátis */}
            <View style={styles.trialPill}>
              <Text style={styles.trialPillText}>🎁 3 dias de PRO grátis</Text>
            </View>

            {/* CTA */}
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => router.push("/")}
              activeOpacity={0.9}
            >
              <Text style={styles.primaryBtnText}>Tornar-se PRO</Text>
            </TouchableOpacity>

            <Text style={styles.note}>
              A assinatura é gerenciada pela App Store / Google Play.
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.sectionLabel}>Você já tem:</Text>

            <View style={styles.featureRow}>
              <Ionicons name="flash-outline" size={18} color="#16A34A" />
              <Text style={styles.featureText}>
                IA sem anúncios e com prioridade máxima.
              </Text>
            </View>

            <View style={styles.featureRow}>
              <Ionicons name="sparkles-outline" size={18} color="#16A34A" />
              <Text style={styles.featureText}>
                Todas as análises avançadas liberadas para seu deck.
              </Text>
            </View>

            <Text style={[styles.note, { marginTop: 10 }]}>
              Para gerenciar ou cancelar, acesse sua assinatura na App Store /
              Google Play.
            </Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F5FB",
  },
  content: {
    paddingTop: 60,
    paddingHorizontal: 22,
    paddingBottom: 60,
  },

  back: {
    marginBottom: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    marginBottom: 22,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },

  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 6,
  },

  planRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  planName: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },
  planBadge: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  planBadgePro: {
    backgroundColor: "#DCFCE7",
  },
  planBadgeFree: {
    backgroundColor: "#E5E7EB",
  },
  planBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  planBadgeTextPro: {
    color: "#15803D",
  },
  planBadgeTextFree: {
    color: "#4B5563",
  },

  experiencePill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#F3F4FF",
  },
  experiencePillText: {
    marginLeft: 6,
    fontSize: 11,
    fontWeight: "500",
    color: "#4B5563",
  },

  desc: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 18,
  },

  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 10,
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#111827",
    flex: 1,
  },

  trialPill: {
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 10,
    backgroundColor: "#EDE9FE",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
  },
  trialPillText: {
    color: "#7C3AED",
    fontSize: 13,
    fontWeight: "600",
  },

  primaryBtn: {
    backgroundColor: "#111827",
    borderRadius: 999,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  note: {
    textAlign: "center",
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 18,
  },
});
