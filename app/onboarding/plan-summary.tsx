// app/onboarding/plan-summary.tsx
import React, { useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { onboardingStyles as base } from '../../src/onboarding/styles';
import { ProgressBar } from '../../src/onboarding/ProgressBar';
import { useLocale } from '../../src/i18n/LocaleProvider';
import { useProfile } from '../../src/profile/useProfile';
import { arenaMap } from '../../src/utils/arenaMap';

type CRCard = {
  elixirCost?: number;
};

function getArenaIndex(t: number): number {
  const thresholds = [
    300, 600, 1000, 1300, 1600, 2000, 2300, 2600, 3000,
    3300, 3600, 4000, 4300, 4600, 5000, 5300, 5600, 6000,
    6300, 6600, 7000, 7300, 7600, 8000,
  ];
  const index = thresholds.findIndex((x) => t < x);
  return index === -1 ? thresholds.length : index;
}

export default function OnboardingPlanSummary() {
  const router = useRouter();
  const { t } = useLocale();
  const { profile, loading } = useProfile();

  const cardAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(cardAnim, {
      toValue: 1,
      duration: 260,
      useNativeDriver: true,
    }).start();
  }, [cardAnim]);

  if (loading || !profile) {
    return (
      <SafeAreaView style={styles.loadingSafe}>
        <ActivityIndicator size="large" color="#7C3AED" />
        <Text style={styles.loadingText}>
          {t('onboarding.planSummary.loading')}
        </Text>
      </SafeAreaView>
    );
  }

  const player = profile.player_json ?? {};
  const tag = profile.tag ?? '';

  const trophies: number = player?.trophies ?? 0;
  const deck: CRCard[] = (player?.currentDeck ?? []) as CRCard[];

  const targetTrophies =
    trophies > 0 ? Math.min(Math.round(trophies * 1.3), 10000) : 300;

  const trophiesDelta = Math.max(targetTrophies - trophies, 0);

  const currentArenaIndex = getArenaIndex(trophies);
  const targetArenaIndex = getArenaIndex(targetTrophies);

  const currentArenaImg = arenaMap[currentArenaIndex];
  const targetArenaImg = arenaMap[targetArenaIndex];

  const avgElixir =
    deck.length > 0
      ? (
          deck.reduce((s, c) => s + (c.elixirCost ?? 0), 0) / deck.length
        ).toFixed(1)
      : '3.5';

  // sinergia alta, bem "preview PRO"
  const synergy = 9;

  const deckSlots: number[] = Array.from({ length: 8 }, (_, i) => i);

  const cardStyle = {
    opacity: cardAnim,
    transform: [
      {
        translateY: cardAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [16, 0],
        }),
      },
    ],
  };

  function handlePro() {
    // futuramente: abrir paywall / RevenueCat
    router.replace('/(tabs)');
  }

  function handleFree() {
    router.replace('/(tabs)');
  }

  return (
    <SafeAreaView style={base.safe}>
      <View style={base.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#111827" />
        </TouchableOpacity>
      </View>

      <ProgressBar step={7} total={7} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Uma frase só, bem discreta */}
        <Text style={styles.subtitleOnly}>
          {t('onboarding.planSummary.heroSubtitle')}
        </Text>

        {/* CARD PRINCIPAL */}
        <Animated.View style={[styles.mainCard, cardStyle]}>
          {/* Linha fina no topo */}
          <View style={styles.topLineFull} />

          {/* Nome + tag */}
          <Text style={styles.playerName}>
            {player?.name ?? 'Player'}
            {tag ? ` • #${tag}` : ''}
          </Text>

          {/* ARENAS – maiores e com mais destaque */}
          <View style={styles.arenasRow}>
            <View style={styles.arenaCol}>
              <View style={styles.arenaBadge}>
                {currentArenaImg && (
                  <Image
                    source={currentArenaImg}
                    style={styles.arenaImg}
                    resizeMode="contain"
                  />
                )}
              </View>
              <Text style={styles.arenaLabel}>Agora</Text>
              <Text style={styles.arenaTrophies}>{trophies} 🏆</Text>
            </View>

            <Ionicons
              name="arrow-forward"
              size={22}
              color="#9CA3AF"
              style={{ marginHorizontal: 16 }}
            />

            <View style={styles.arenaCol}>
              <View style={styles.arenaBadge}>
                {targetArenaImg && (
                  <Image
                    source={targetArenaImg}
                    style={styles.arenaImg}
                    resizeMode="contain"
                  />
                )}
              </View>
              <Text style={styles.arenaLabel}>Meta</Text>
              <Text style={styles.arenaTrophies}>
                {targetTrophies} 🏆
              </Text>
            </View>
          </View>

          {/* Delta */}
          <View style={styles.deltaPill}>
            <Text style={styles.deltaText}>+{trophiesDelta} troféus</Text>
          </View>

          {/* DECK PLACEHOLDER 4x2 – cartas menores, bem discretas */}
          <View style={styles.deckWrapper}>
            <View style={styles.deckGrid}>
              {deckSlots.map((slotIndex: number) => (
                <View key={slotIndex} style={styles.deckSlot}>
                  <View style={styles.deckCardSlot} />
                </View>
              ))}
            </View>

            <View style={styles.deckOverlay}>
              <View style={styles.lockCircle}>
                <Ionicons name="lock-closed" size={16} color="#fff" />
              </View>
            </View>
          </View>

          {/* MÉTRICAS */}
          <View style={styles.metricsRow}>
            <View style={styles.metricBox}>
              <Text style={styles.metricValueBig}>{avgElixir}</Text>
              <Text style={styles.metricLabelSmall}>
                {t('onboarding.planSummary.metric.costLabel')}
              </Text>
            </View>

            <View style={styles.metricBox}>
              <Text style={styles.metricValueBig}>{synergy}/10</Text>
              <Text style={styles.metricLabelSmall}>
                {t('onboarding.planSummary.metric.synergyLabel')}
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* TRIAL + CTA PRO */}
        <View style={styles.trialWrapper}>
          <View style={styles.trialPill}>
            <Text style={styles.trialPillText}>
              {t('onboarding.planSummary.trial.badge')}
            </Text>
          </View>
          <Text style={styles.trialNote}>
            {t('onboarding.planSummary.trial.copy')}
          </Text>
        </View>

        {/* PRO – botão principal preto */}
        <TouchableOpacity style={styles.primaryButton} onPress={handlePro}>
          <Text style={styles.primaryButtonText}>
            {t('onboarding.planSummary.ctaPro')}
          </Text>
        </TouchableOpacity>

        {/* GRÁTIS – parágrafo, sem cara de botão */}
        <TouchableOpacity
          onPress={handleFree}
          activeOpacity={0.7}
          style={styles.freeTextWrapper}
        >
          <Text style={styles.freeText}>
            {t('onboarding.planSummary.ctaSecondary')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ========= STYLES ========= */
const styles = StyleSheet.create({
  loadingSafe: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  loadingText: {
    marginTop: 14,
    color: '#6B7280',
  },

  subtitleOnly: {
    fontSize: 13,
    textAlign: 'center',
    color: '#9CA3AF',
    marginTop: 10,
    marginBottom: 8,
  },

  mainCard: {
    marginHorizontal: 16,
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#020617',
  },

  topLineFull: {
    height: 1,
    backgroundColor: '#111827',
    marginBottom: 10,
  },

  playerName: {
    fontSize: 14,
    color: '#E5E7EB',
    textAlign: 'center',
    marginBottom: 10,
  },

  arenasRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  arenaCol: {
    alignItems: 'center',
  },
  arenaBadge: {
    width: 96,
    height: 96,
    borderRadius: 30,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arenaImg: {
    width: 86,
    height: 86,
  },
  arenaLabel: {
    marginTop: 4,
    fontSize: 11,
    color: '#9CA3AF',
  },
  arenaTrophies: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F9FAFB',
    marginTop: 2,
  },

  deltaPill: {
    alignSelf: 'center',
    marginTop: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#111827',
    marginBottom: 8,
  },
  deltaText: {
    fontSize: 11,
    color: '#E5E7EB',
    fontWeight: '600',
  },

  // Deck bem discreto
  deckWrapper: {
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#111827',
  },
  deckGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  deckSlot: {
    width: '25%',
    padding: 4,
  },
  deckCardSlot: {
    width: '100%',
    aspectRatio: 0.78,
    borderRadius: 12,
    backgroundColor: '#0B1120',
    transform: [{ scale: 0.86 }], // 👈 cartas menores
  },
  deckOverlay: {
    position: 'absolute',
    inset: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  metricsRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8,
  },
  metricBox: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#111827',
  },
  metricValueBig: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F9FAFB',
  },
  metricLabelSmall: {
    marginTop: 2,
    fontSize: 11,
    color: '#9CA3AF',
  },

  trialWrapper: {
    marginTop: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  trialPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#EEF2FF',
  },
  trialPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4F46E5',
  },
  trialNote: {
    marginTop: 6,
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },

  primaryButton: {
    marginTop: 14,
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 999,
    backgroundColor: '#111827',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: '700',
  },

  freeTextWrapper: {
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 4,
    alignItems: 'center',
  },
  freeText: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
  },
});
