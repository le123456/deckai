 
// src/home/components/HomeStatsCard.tsx
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { HomeStats } from "../hooks/useHomePlayer";

type Props = {
  stats: HomeStats;
  refreshing: boolean;
  onRefreshFast: () => void;
};

type TabId = "core" | "battles" | "clan" | "collection";

function TabButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.tabButton, active && styles.tabButtonActive]}
    >
      <Text style={active ? styles.tabLabelActive : styles.tabLabel}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function MetricCard({
  label,
  value,
  small,
}: {
  label: string;
  value: string;
  small?: boolean;
}) {
  return (
    <View style={[styles.metricCard, small && styles.metricCardSmall]}>
      <Text style={styles.metricValue} numberOfLines={1}>
        {value}
      </Text>
      <Text style={styles.metricLabel} numberOfLines={2}>
        {label}
      </Text>
    </View>
  );
}

export function HomeStatsCard({ stats, refreshing, onRefreshFast }: Props) {
  const [tab, setTab] = useState<TabId>("core");

  const winrateText = useMemo(
    () => `${stats.winrate.toFixed(1)}%`,
    [stats.winrate]
  );

  const hoursText = useMemo(() => {
    if (!stats.hoursPlayed) return "—";
    return stats.hoursPlayed >= 10
      ? `${stats.hoursPlayed.toFixed(0)}h`
      : `${stats.hoursPlayed.toFixed(1)}h`;
  }, [stats.hoursPlayed]);

  const goldK = useMemo(() => {
    if (!stats.goldToMaxDeck || stats.goldToMaxDeck <= 0) return "0";
    return (stats.goldToMaxDeck / 1000).toFixed(1);
  }, [stats.goldToMaxDeck]);

  const timeFreeText = useMemo(() => {
    const days = stats.daysToMaxDeckFree || 0;
    if (days <= 0) return "—";

    if (days < 30) return `${days} dias`;
    if (days < 365) return `≈ ${(days / 30).toFixed(1)} meses`;

    const years = days / 365;
    if (years < 1.5) return "≈ 1 ano";
    return `≈ ${years.toFixed(1)} anos`;
  }, [stats.daysToMaxDeckFree]);

  // ✔️ CORRIGIDO: sem .0 no final
  const yearsText = useMemo(() => {
    if (!stats.accountAgeYears || stats.accountAgeYears <= 0) return "—";
    if (stats.accountAgeYears < 1.5) return "≈ 1 ano";
    return `≈ ${Math.floor(stats.accountAgeYears)} anos`;
  }, [stats.accountAgeYears]);

  // Batalhas avançadas
  const threeCrownRateText = useMemo(() => {
    if (!stats.threeCrownWins || !stats.wins) return "—";
    const pct = (stats.threeCrownWins / stats.wins) * 100;
    return `${pct.toFixed(1)}%`;
  }, [stats.threeCrownWins, stats.wins]);

  const friendlyWinsText =
    stats.friendlyWins != null ? String(stats.friendlyWins) : "—";

  const tourBattlesText =
    stats.tournamentBattleCount != null
      ? String(stats.tournamentBattleCount)
      : "—";

  // Clã
  const donations = stats.clanDonations ?? 0;
  const donationsRecv = stats.clanDonationsReceived ?? 0;
  const donationBalance =
    donations || donationsRecv ? donations - donationsRecv : 0;

  const donationsText =
    stats.clanDonations != null ? String(stats.clanDonations) : "—";
  const donationsRecvText =
    stats.clanDonationsReceived != null
      ? String(stats.clanDonationsReceived)
      : "—";
  const donationBalanceText =
    donations || donationsRecv ? `${donationBalance}` : "—";

  // Coleção / badges / achievements
  const totalCardsText =
    stats.collectionTotalCards != null
      ? String(stats.collectionTotalCards)
      : "—";
  const maxLevelText =
    stats.collectionMaxLevel != null ? `Nv ${stats.collectionMaxLevel}` : "—";
  const evolutionsText =
    stats.collectionEvolutions != null
      ? String(stats.collectionEvolutions)
      : "—";
  const starsText =
    stats.collectionStarLevels != null
      ? String(stats.collectionStarLevels)
      : "—";
  const badgesTotalText =
    stats.badgesTotal != null ? String(stats.badgesTotal) : "—";
  const achievementsTotalText =
    stats.achievementsTotal != null ? String(stats.achievementsTotal) : "—";

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Estatísticas</Text>
            <Text style={styles.subtitle}>
              Seu resumo de progresso no Clash Royale
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => !refreshing && onRefreshFast()}
            disabled={refreshing}
            style={styles.refreshBtn}
            activeOpacity={0.8}
          >
            {refreshing ? (
              <ActivityIndicator color="#0F172A" size="small" />
            ) : (
              <Ionicons name="refresh" size={18} color="#0F172A" />
            )}
          </TouchableOpacity>
        </View>

        {/* TABS */}
        <View style={styles.tabRow}>
          <TabButton
            label="Geral"
            active={tab === "core"}
            onPress={() => setTab("core")}
          />
          <TabButton
            label="Batalhas"
            active={tab === "battles"}
            onPress={() => setTab("battles")}
          />
          <TabButton
            label="Clã"
            active={tab === "clan"}
            onPress={() => setTab("clan")}
          />
          <TabButton
            label="Coleção"
            active={tab === "collection"}
            onPress={() => setTab("collection")}
          />
        </View>

        {/* ABA GERAL */}
        {tab === "core" && (
          <>
            {/* HERO */}
            <View style={styles.heroRow}>
              <View style={styles.heroLeft}>
                <Image
                  source={require("../../../assets/icons/crown.webp")}
                  style={styles.crownIcon}
                  resizeMode="contain"
                />
                <View>
                  <Text style={styles.trophiesMain}>{stats.trophies}</Text>
                  {stats.bestTrophies != null && (
                    <Text style={styles.trophiesSub}>
                      Melhor: {stats.bestTrophies}
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.heroRight}>
                {stats.kingLevel != null && (
                  <View style={styles.levelWrapper}>
                    <Image
                      source={require("../../../assets/icons/experience.webp")}
                      style={styles.levelIcon}
                      resizeMode="contain"
                    />
                    <View style={styles.levelCenter}>
                      <Text style={styles.levelText}>{stats.kingLevel}</Text>
                    </View>
                  </View>
                )}
                {/* ❌ Tempo de conta REMOVIDO */}
              </View>
            </View>

            {/* LINHA CORE */}
            <View style={styles.metricsRow}>
              <MetricCard label="Winrate" value={winrateText} />
              <MetricCard label="Horas jogadas" value={hoursText} />

              {/* 🔥 SUBSTITUIÇÃO DO ELIXIR MÉDIO */}
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>{yearsText}</Text>
                <Text style={styles.metricLabel}>Conta criada há</Text>
              </View>
            </View>

            {/* PROGRESSO */}
            <View style={styles.metricsRowSecondary}>
              <MetricCard
                small
                label="Ouro p/ maxar deck (estim.)"
                value={`${goldK}k`}
              />
              <MetricCard
                small
                label="Tempo F2P p/ juntar esse ouro"
                value={timeFreeText}
              />
            </View>

            <Text style={styles.footnote}>
              Tempo estimado para juntar o ouro necessário (não para conseguir
              as cartas), usando ~5.000 ouro/dia F2P.
            </Text>
          </>
        )}

        {/* BATALHAS */}
        {tab === "battles" && (
          <>
            <View style={styles.metricsRow}>
              <MetricCard label="Vitórias" value={String(stats.wins)} />
              <MetricCard label="Derrotas" value={String(stats.losses)} />
              <MetricCard label="Partidas totais" value={String(stats.battles)} />
            </View>

            <View style={styles.metricsRowSecondary}>
              <MetricCard
                small
                label="Vitórias 3 coroas"
                value={
                  stats.threeCrownWins != null
                    ? String(stats.threeCrownWins)
                    : "—"
                }
              />
              <MetricCard
                small
                label="% vitórias com 3 coroas"
                value={threeCrownRateText}
              />
            </View>

            <View style={styles.metricsRowSecondary}>
              <MetricCard
                small
                label="Vitórias em amistosos"
                value={friendlyWinsText}
              />
              <MetricCard small label="Batalhas em torneios" value={tourBattlesText} />
            </View>
          </>
        )}

        {/* CLÃ */}
        {tab === "clan" && (
          <>
            <View style={styles.metricsRow}>
              <MetricCard label="Doações feitas" value={donationsText} />
              <MetricCard label="Doações recebidas" value={donationsRecvText} />
            </View>

            <View style={styles.metricsRowSecondary}>
              <MetricCard small label="Saldo de doações" value={donationBalanceText} />
              <MetricCard
                small
                label="Clan activity score"
                value={
                  donations || donationsRecv ? `${donations + donationsRecv}` : "—"
                }
              />
            </View>

            <Text style={styles.footnote}>
              Clan activity é um score simples baseado em doações, só para ter
              uma noção rápida do seu impacto.
            </Text>
          </>
        )}

        {/* COLEÇÃO */}
        {tab === "collection" && (
          <>
            <View style={styles.metricsRow}>
              <MetricCard label="Cartas diferentes" value={totalCardsText} />
              <MetricCard label="Maior nível de carta" value={maxLevelText} />
            </View>

            <View style={styles.metricsRowSecondary}>
              <MetricCard small label="Cartas com evolução" value={evolutionsText} />
              <MetricCard small label="Cartas com estrela" value={starsText} />
            </View>

            <View style={styles.metricsRowSecondary}>
              <MetricCard small label="Badges" value={badgesTotalText} />
              <MetricCard small label="Achievements" value={achievementsTotalText} />
            </View>

            <Text style={styles.footnote}>
              Estas métricas são baseadas nos dados de coleção, badges e
              achievements da conta.
            </Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 18,
    marginTop: 14,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#020617",
  },
  subtitle: {
    marginTop: 2,
    fontSize: 12,
    color: "#6B7280",
  },
  refreshBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
  },

  tabRow: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 12,
  },
  tabButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E5E7EB",
    marginRight: 8,
    backgroundColor: "#F9FAFB",
  },
  tabButtonActive: {
    backgroundColor: "#020617",
    borderColor: "#020617",
  },
  tabLabel: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "500",
  },
  tabLabelActive: {
    fontSize: 11,
    color: "#F9FAFB",
    fontWeight: "600",
  },

  heroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  heroLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  crownIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  trophiesMain: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
  },
  trophiesSub: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  heroRight: {
    alignItems: "flex-end",
  },

  levelWrapper: {
    width: 50,
    height: 50,
    marginBottom: 6,
    marginRight: 20,
  },
  levelIcon: {
    width: "100%",
    height: "100%",
  },
  levelCenter: {
    position: "absolute",
    top: -3,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  levelText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  pill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#F1F5F9",
    alignItems: "flex-end",
  },
  pillLabel: {
    fontSize: 10,
    color: "#64748B",
  },
  pillValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#020617",
    marginTop: 1,
  },

  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metricsRowSecondary: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },

  metricCard: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 14,
    backgroundColor: "#F9FAFB",
  },
  metricCardSmall: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  metricLabel: {
    marginTop: 2,
    fontSize: 11,
    color: "#6B7280",
  },

  elixirRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  elixirIcon: {
    width: 14,
    height: 14,
    marginRight: 4,
  },

  footnote: {
    marginTop: 10,
    fontSize: 10,
    color: "#9CA3AF",
    textAlign: "center",
  },
});

export default HomeStatsCard;
