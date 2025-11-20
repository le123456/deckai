// app/onboarding/plan-processing.tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { onboardingStyles as base } from './styles';
import { ProgressBar } from './ProgressBar';
import { useLocale } from '../i18n/LocaleProvider';

const CHECK_ITEMS = [
  'onboarding.planProcessing.item.style',
  'onboarding.planProcessing.item.deck',
  'onboarding.planProcessing.item.cost',
  'onboarding.planProcessing.item.history',
  'onboarding.planProcessing.item.synergy',
  'onboarding.planProcessing.item.matchups',
  'onboarding.planProcessing.item.prediction',
];

export default function OnboardingPlanProcessing() {
  const router = useRouter();
  const { t } = useLocale();

  const [progress, setProgress] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const totalDuration = 2800;
    const stepMs = 80;

    const interval = setInterval(() => {
      setProgress((prev) =>
        Math.min(prev + (100 * stepMs) / totalDuration, 100)
      );
    }, stepMs);

    Animated.timing(progressAnim, {
      toValue: 100,
      duration: totalDuration,
      useNativeDriver: false,
    }).start(() => {
      clearInterval(interval);
      router.replace('/onboarding/plan-summary');
    });

    return () => {
      clearInterval(interval);
      progressAnim.stopAnimation();
    };
  }, [progressAnim, router]);

  const widthInterpolate = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['8%', '100%'],
  });

  const activeIndex = Math.min(
    CHECK_ITEMS.length - 1,
    Math.floor((progress / 100) * CHECK_ITEMS.length)
  );

  return (
    <SafeAreaView style={base.safe}>
      <View style={base.header} />

      <ProgressBar step={7} total={7} />

      <View style={base.screenContainer}>
        <Text style={base.title}>
          {t('onboarding.planProcessing.title')}
        </Text>

        <Text style={base.subtitle}>
          {t('onboarding.planProcessing.subtitle')}
        </Text>

        <View style={styles.centerBlock}>
          <Text style={styles.percentText}>{Math.round(progress)}%</Text>
          <Text style={styles.percentSub}>
            {t('onboarding.planProcessing.percentLabel')}
          </Text>

          <View style={styles.loadingBar}>
            <Animated.View
              style={[styles.loadingFill, { width: widthInterpolate }]}
            />
          </View>

          <View style={styles.gifWrapper}>
            <Image
              source={require('../../assets/gifs/plan-loading.gif')}
              style={styles.gif}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.checklistCard}>
          {CHECK_ITEMS.map((key, index) => {
            const isActive = index <= activeIndex;
            return (
              <View key={key} style={styles.checkItem}>
                <View
                  style={[
                    styles.checkBullet,
                    isActive && styles.checkBulletActive,
                  ]}
                >
                  {isActive && (
                    <Text style={styles.checkBulletText}>✓</Text>
                  )}
                </View>

                <Text
                  style={[
                    styles.checkLabel,
                    isActive && styles.checkLabelActive,
                  ]}
                >
                  {t(key)}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centerBlock: {
    marginTop: 24,
    alignItems: 'center',
  },
  percentText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#111827',
  },
  percentSub: {
    marginTop: 4,
    fontSize: 14,
    color: '#6B7280',
  },
  loadingBar: {
    marginTop: 14,
    height: 6,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
    width: '70%',
  },
  loadingFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#111827',
  },
  gifWrapper: {
    marginTop: 18,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  gif: {
    width: 120,
    height: 120,
  },
  checklistCard: {
    marginTop: 24,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkBullet: {
    width: 20,
    height: 20,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  checkBulletActive: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  checkBulletText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  checkLabel: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  checkLabelActive: {
    color: '#111827',
  },
});
