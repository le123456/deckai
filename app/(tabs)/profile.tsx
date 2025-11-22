// app/(tabs)/profile.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { supabase } from "../../src/lib/supabase";
import { useProfile } from "../../src/profile/useProfile";
import { resolveFavouriteCardSource } from "../../src/cards/cardResolver";

export default function ProfileScreen() {
  const router = useRouter();
  const { profile, loading } = useProfile();

  if (loading || !profile) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  const email = profile.user?.email ?? "";

  // Defaults
  let playerName = profile.display_name ?? "Jogador DeckIA";
  let tag = profile.tag ?? "–";
  let favouriteImage: any = null;

  // Extrai dados do player_json (nome, tag, carta favorita)
  try {
    let raw: any = profile.player_json;
    if (typeof raw === "string") raw = JSON.parse(raw);
    if (typeof raw === "string") raw = JSON.parse(raw);

    const playerRaw = Array.isArray(raw) ? raw[0] : raw;

    if (playerRaw?.name) playerName = playerRaw.name;
    if (playerRaw?.tag) tag = playerRaw.tag.replace("#", "");

    const fav = playerRaw?.currentFavouriteCard;
    if (fav) {
      const r = resolveFavouriteCardSource(
        fav.name ?? null,
        fav.iconUrls?.medium ?? null
      );
      favouriteImage = r.local ? r.local : r.remote ? { uri: r.remote } : null;
    }
  } catch {
    // se der ruim, usa defaults
  }

  const plan = profile.plan === "pro" ? "PRO" : "Free";

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ======== HERO (carta favorita + infos) ======== */}
      <View style={styles.heroWrapper}>
        <LinearGradient
          colors={["#EEF2FF", "#F9FAFB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.heroTopRow}>
            <Text style={styles.heroLabel}>Perfil</Text>
            <View style={styles.planPill}>
              <Text style={styles.planPillText}>{plan} Plan</Text>
            </View>
          </View>

          <View style={styles.heroMain}>
            {/* Avatar (carta favorita) */}
            <View style={styles.avatarWrapper}>
              {favouriteImage ? (
                <Image
                  source={favouriteImage}
                  style={styles.avatar}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.avatarFallback}>
                  <Text style={styles.avatarFallbackText}>
                    {playerName[0]?.toUpperCase() ?? "J"}
                  </Text>
                </View>
              )}
            </View>

            {/* Infos à direita */}
            <View style={styles.heroInfo}>
              <Text style={styles.playerName}>{playerName}</Text>
              <Text style={styles.playerEmail}>{email}</Text>

              {/* TAG chip com lápis */}
              <TouchableOpacity
                style={styles.tagChip}
                onPress={() => router.push("../profile/edit-tag")}
              >
                <Text style={styles.tagChipText}>#{tag}</Text>
                <View style={styles.tagChipIcon}>
                  <Ionicons name="create-outline" size={15} color="#111827" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* ======== CONTA CLASH ROYALE ======== */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Conta Clash Royale</Text>

        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.label}>TAG vinculada</Text>
            <Text style={styles.value}>#{tag}</Text>
          </View>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push("/profile/edit-tag")}
          >
            <Ionicons name="create-outline" size={18} color="#111827" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ======== ASSINATURA ======== */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Assinatura</Text>

        <TouchableOpacity
          style={styles.actionRow}
          onPress={() => router.push("/profile/plan")}
        >
          <View>
            <Text style={styles.actionTitle}>Gerenciar plano</Text>
            <Text style={styles.actionDesc}>
              {plan === "Free" ? "Atualize para PRO e remova anúncios." : "Assinatura PRO ativa."}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionRow, { marginTop: 10 }]}
          onPress={() => router.push("./profile/restore")}
        >
          <View>
            <Text style={styles.actionTitle}>Restaurar compras</Text>
            <Text style={styles.actionDesc}>
              Restaure sua assinatura em um novo dispositivo.
            </Text>
          </View>
          <Ionicons name="refresh" size={18} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* ======== LEGAL ======== */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Legal</Text>

        <TouchableOpacity
          style={styles.linkRow}
          onPress={() => router.push("/legal/privacy")}
        >
          <Text style={styles.linkText}>Política de Privacidade</Text>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkRow}
          onPress={() => router.push("/legal/terms")}
        >
          <Text style={styles.linkText}>Termos de Uso</Text>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* ======== LOGOUT ======== */}
      <View style={styles.footerCard}>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={async () => {
            await supabase.auth.signOut();
            router.replace("/auth/login");
          }}
        >
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 100,
  },

  loading: {
    flex: 1,
    backgroundColor: "#F4F5FB",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "#111827",
    fontSize: 14,
  },

  /* HERO */
  heroWrapper: {
    marginBottom: 28,
  },
  heroCard: {
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  heroLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#6B7280",
  },
  planPill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: "#EDE9FE",
  },
  planPillText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#7C3AED",
  },

  heroMain: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrapper: {
    width: 86,
    height: 86,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 4,
    marginRight: 14,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  avatarFallback: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarFallbackText: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
  },

  heroInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  playerEmail: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
    marginBottom: 8,
  },
  tagChip: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  tagChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginRight: 8,
  },
  tagChipIcon: {
    width: 24,
    height: 24,
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },

  /* CARDS GENÉRICOS */
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },

  /* ACTION ROWS (plano / restore) */
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 4,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  actionDesc: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },

  /* LEGAL LINKS */
  linkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  linkText: {
    fontSize: 14,
    color: "#4B5563",
  },

  /* FOOTER / LOGOUT */
  footerCard: {
    marginTop: 4,
  },
  logoutBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#EF4444",
  },
});
