// app/onboarding/plan-summary.tsx
import React, { useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { onboardingStyles as base } from './styles';
import { ProgressBar } from './ProgressBar';
import { useLocale } from '../i18n/LocaleProvider';
import { useOnboarding } from './OnboardingProvider';

type Card = {
  name: string;
  elixirCost?: number;
  iconUrls?: { medium?: string };
};

const TROPHY_CAP = 10000;
const MAX_WINRATE_AFTER = 70;
const MIN_WINRATE_DELTA = 7;

export default function OnboardingPlanSummary() {
  const router = useRouter();
  const { t } = useLocale();
  const { answers } = useOnboarding();

  const rawPlayer = answers.player as any;
  const player = Array.isArray(rawPlayer) ? rawPlayer[0] : rawPlayer;

  const trophies: number = player?.trophies ?? 0;
  const wins: number = player?.wins ?? 0;
  const losses: number = player?.losses ?? 0;
  const battles = wins + losses;

  const currentWinRate =
    battles > 0 ? Math.round((wins / battles) * 100) : 0;

  // 🎯 Meta: +20% com limite 10k
  const rawTarget = trophies * 1.2;
  const targetTrophies: number =
    trophies > 0 ? Math.min(Math.round(rawTarget), TROPHY_CAP) : 300;
  const trophiesDelta = Math.max(targetTrophies - trophies, 0);

  // 📈 Winrate após plano
  let suggestedWinRate = 55;
  if (currentWinRate > 0) {
    const boosted = Math.round(currentWinRate * 1.25);
    let candidate = Math.min(boosted, MAX_WINRATE_AFTER);
    if (candidate < currentWinRate + MIN_WINRATE_DELTA) {
      candidate = Math.min(
        currentWinRate + MIN_WINRATE_DELTA,
        MAX_WINRATE_AFTER
      );
    }
    suggestedWinRate = candidate;
  }

  const currentDeck: Card[] = (player?.currentDeck ?? []) as Card[];

  const avgElixir: string =
    currentDeck.length > 0
      ? (
          currentDeck.reduce(
            (sum: number, c: Card) => sum + (c.elixirCost ?? 0),
            0
          ) / currentDeck.length
        ).toFixed(1)
      : '3.5';

  const synergyScore = 7.2;

  function handleStart() {
    router.replace('/(tabs)');
  }

  function handleSkip() {
    router.replace('/(tabs)');
  }

  // Animação para suavizar entrada
  const cardAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(cardAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, []);

  const cardAnimatedStyle = {
    opacity: cardAnim,
    transform: [
      {
        translateY: cardAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [12, 0],
        }),
      },
    ],
  };

  return (
    <SafeAreaView style={base.safe}>
      {/* topo */}
      <View style={base.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#111827" />
        </TouchableOpacity>
      </View>

      <ProgressBar step={7} total={7} />

      {/* Conteúdo principal */}
      <View style={base.screenContainer}>
        <Text style={styles.heroTitle}>
          {t('onboarding.planSummary.heroTitle').replace(
            '{name}',
            player?.name ?? 'Player'
          )}
        </Text>

        <Text style={styles.heroSubtitle}>
          {t('onboarding.planSummary.heroSubtitle')}
        </Text>

        {/* CARD */}
        <Animated.View style={[styles.cardWrapper, cardAnimatedStyle]}>
          <LinearGradient
            colors={['#3A0CA3', '#4C1D95', '#6D28D9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.playerName}>{player?.name}</Text>

                {!!player?.tag && (
                  <Text style={styles.playerTag}>{player.tag}</Text>
                )}

                {!!player?.arena?.name && (
                  <Text style={styles.arenaText}>
                    {t('onboarding.planSummary.trophies').replace(
                      '{arena}',
                      player.arena.name
                    )}
                  </Text>
                )}
              </View>

              <View style={styles.trophyPill}>
                <Ionicons name="trophy" size={13} color="#FACC15" />
                <Text style={styles.trophyPillText}>
                  {trophies > 0 ? trophies : '--'}
                </Text>
              </View>
            </View>

            {/* META */}
            <View style={styles.goalSection}>
              <Text style={styles.goalDelta}>+{trophiesDelta}</Text>

              <Text style={styles.goalLabel}>
                {t('onboarding.planSummary.metric.targetLabel')}
              </Text>

              <Text style={styles.goalTagline}>
                {t('onboarding.planSummary.metric.targetTagline')
                  .replace('{from}', String(trophies))
                  .replace('{to}', String(targetTrophies))}
              </Text>
            </View>

            {/* WINRATE */}
            <View style={styles.winrateRow}>
              <View style={styles.winrateCol}>
                <Text style={styles.winLabel}>Atual</Text>
                <Text style={styles.winValue}>
                  {currentWinRate > 0 ? `${currentWinRate}%` : '--'}
                </Text>
              </View>

              <Ionicons
                name="arrow-forward"
                size={18}
                color="#E5E7EB"
                style={styles.winArrow}
              />

              <View style={[styles.winrateCol, { alignItems: 'flex-end' }]}>
                <Text style={styles.winLabel}>Estimado</Text>
                <Text style={styles.winValueHighlight}>
                  {suggestedWinRate}%
                </Text>
              </View>
            </View>

            {/* CHIPS */}
            <View style={styles.chipsRow}>
              <View style={styles.chip}>
                <Text style={styles.chipLabel}>
                  {t('onboarding.planSummary.metric.costLabel')}
                </Text>
                <Text style={styles.chipValue}>{avgElixir}</Text>
              </View>

              <View style={styles.chip}>
                <Text style={styles.chipLabel}>
                  {t('onboarding.planSummary.metric.synergyLabel')}
                </Text>
                <Text style={styles.chipValue}>
                  {synergyScore.toFixed(1)}/10
                </Text>
              </View>
            </View>

            {/* DECK BLOQUEADO */}
            <View style={styles.deckSection}>
              <Text style={styles.deckTitle}>
                {t('onboarding.planSummary.deckTitleLocked')}
              </Text>
              <Text style={styles.deckSubtitle}>
                {t('onboarding.planSummary.deckLockedCTA')}
              </Text>

              <View style={styles.deckWrapper}>
                <View style={styles.deckGrid}>
                  {currentDeck.slice(0, 8).map((card, index) => (
                    <View key={index} style={styles.deckItem}>
                      <View style={styles.deckCard}>
                        {card.iconUrls?.medium ? (
                          <Image
                            source={{ uri: card.iconUrls.medium }}
                            style={styles.deckCardImage}
                            blurRadius={14}
                          />
                        ) : (
                          <View style={styles.deckCardFallback} />
                        )}
                      </View>
                    </View>
                  ))}
                </View>

                <View style={styles.deckLockOverlay}>
                  <View style={styles.deckLockCircle}>
                    <Ionicons name="lock-closed" size={20} color="#fff" />
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* BOTÕES */}
        <TouchableOpacity
          onPress={handleStart}
          style={styles.primaryButton}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#6D28D9', '#7C3AED']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.primaryButtonInner}
          >
            <Text style={styles.primaryButtonText}>
              {t('onboarding.planSummary.ctaPrimary')}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSkip}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>
            {t('onboarding.planSummary.ctaSecondary')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ============= STYLES ============= */

const styles = StyleSheet.create({
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    color: '#111',
    marginTop: 4,
  },
  heroSubtitle: {
    fontSize: 13,
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 4,
    marginBottom: 2,
    paddingHorizontal: 24,
  },

  cardWrapper: {
    marginTop: 14,
    width: '100%',
    alignSelf: 'center',
    maxWidth: 340,
  },

  card: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  playerTag: {
    marginTop: 2,
    fontSize: 11,
    color: '#ddd',
  },
  arenaText: {
    marginTop: 4,
    fontSize: 11,
    color: '#eee',
    opacity: 0.9,
  },

  trophyPill: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15,23,42,0.45)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(250,204,21,0.35)',
  },
  trophyPillText: {
    color: '#FACC15',
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
  },

  goalSection: {
    marginTop: 14,
  },
  goalDelta: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '800',
  },
  goalLabel: {
    fontSize: 12,
    color: '#eee',
    marginTop: 2,
  },
  goalTagline: {
    marginTop: 2,
    fontSize: 11,
    color: '#ddd',
  },

  winrateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  winrateCol: {
    flex: 1,
  },
  winLabel: {
    fontSize: 11,
    color: '#ddd',
  },
  winValue: {
    marginTop: 2,
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  winValueHighlight: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
  },
  winArrow: {
    marginHorizontal: 10,
    opacity: 0.7,
  },

  chipsRow: {
    flexDirection: 'row',
    marginTop: 14,
    gap: 8,
  },
  chip: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.28)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  chipLabel: {
    fontSize: 11,
    color: '#ccc',
  },
  chipValue: {
    marginTop: 3,
    fontSize: 15,
    color: '#fff',
    fontWeight: '700',
  },

  deckSection: {
    marginTop: 14,
  },
  deckTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  deckSubtitle: {
    fontSize: 11,
    color: '#eee',
    opacity: 0.9,
    marginTop: 2,
  },

  deckWrapper: {
    marginTop: 8,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 6,
    position: 'relative',
  },
  deckGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  deckItem: {
    width: '25%',
    padding: 4,
    alignItems: 'center',
  },
  deckCard: {
    width: 46,
    height: 56,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(30,41,59,0.8)',
  },
  deckCardImage: {
    width: '100%',
    height: '100%',
    opacity: 0.45,
  },
  deckCardFallback: {
    flex: 1,
    backgroundColor: 'rgba(50,60,80,0.8)',
  },

  deckLockOverlay: {
    position: 'absolute',
    inset: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckLockCircle: {
    width: 38,
    height: 38,
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  primaryButton: {
    marginTop: 18,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
  },
  primaryButtonInner: {
    borderRadius: 14,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },

  secondaryButton: {
    marginTop: 8,
    alignSelf: 'center',
  },
  secondaryButtonText: {
    fontSize: 13,
    color: '#6B7280',
    textDecorationLine: 'underline',
  },
});
