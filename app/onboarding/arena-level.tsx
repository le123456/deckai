import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { onboardingStyles as base } from '../../src/onboarding/styles';
import { ProgressBar } from '../../src/onboarding/ProgressBar';
import { useOnboarding } from '../../src/onboarding/OnboardingProvider';
import { useLocale } from '../../src/i18n/LocaleProvider';

const ARENAS = [
  {
    id: 'low',
    key: 'onboarding.arena.opt.1',
    value: 'Arena 1–4',
    img: require('../../assets/arenas/arena_low.webp'),
  },
  {
    id: 'mid1',
    key: 'onboarding.arena.opt.2',
    value: 'Arena 5–9',
    img: require('../../assets/arenas/arena_mid1.webp'),
  },
  {
    id: 'mid2',
    key: 'onboarding.arena.opt.3',
    value: 'Arena 10–13',
    img: require('../../assets/arenas/arena_mid2.webp'),
  },
  {
    id: 'high',
    key: 'onboarding.arena.opt.4',
    value: 'Arena 14+',
    img: require('../../assets/arenas/arena_high.webp'),
  },
];

export default function OnboardingArenaLevelScreen() {
  const router = useRouter();
  const { answers, setAnswer } = useOnboarding();
  const { t } = useLocale();

  const initialIndex =
    Math.max(0, ARENAS.findIndex((a) => a.id === answers.arenaRange));

  const [index, setIndex] = useState(initialIndex);
  const arena = ARENAS[index];

  const handleContinue = () => {
    setAnswer('arenaRange', arena.id);
    router.push('/onboarding/source');
  };

  return (
    <SafeAreaView style={base.safe}>

      {/* HEADER */}
      <View style={base.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#111827" />
        </TouchableOpacity>
      </View>

      <ProgressBar step={3} total={7} />

      {/* TÍTULO + SUBTÍTULO (EXATAMENTE IGUAL AO GOAL) */}
      <View style={{ paddingHorizontal: 24, marginTop: 6, marginBottom: 4 }}>
        <Text style={base.title}>{t('onboarding.arena.title')}</Text>
        <Text style={base.subtitle}>{t('onboarding.arena.subtitle')}</Text>
      </View>

      {/* CONTEÚDO CENTRAL */}
      <View style={styles.centerContainer}>

        {/* VALOR CENTRAL */}
        <Text style={styles.valueText}>{arena.value}</Text>

        {/* ÍCONES */}
        <View style={styles.iconRow}>
          {ARENAS.map((a, i) => (
            <Image
              key={a.id}
              source={a.img}
              style={[
                styles.iconImg,
                i === index ? styles.iconActive : styles.iconInactive,
              ]}
            />
          ))}
        </View>

        {/* SLIDER */}
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={3}
          step={1}
          value={index}
          onValueChange={(v: number) =>
            setIndex(Math.min(3, Math.max(0, v)))
          }
          minimumTrackTintColor="#000"
          maximumTrackTintColor="rgba(0,0,0,0.2)"
          thumbTintColor="#000"
        />

        {/* LABELS */}
        <View style={styles.labelsRow}>
          <Text style={styles.labelSmall}>{t('onboarding.arena.label.low')}</Text>
          <Text style={styles.labelSmall}>{t('onboarding.arena.label.mid')}</Text>
          <Text style={styles.labelSmall}>{t('onboarding.arena.label.high')}</Text>
          <Text style={styles.labelSmall}>{t('onboarding.arena.label.champ')}</Text>
        </View>

      </View>

      {/* BOTÃO */}
      <View style={{ paddingHorizontal: 24, marginBottom: 28 }}>
        <TouchableOpacity
          onPress={handleContinue}
          style={base.primaryButton}
        >
          <Text style={base.primaryButtonText}>{t('common.continue')}</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center', // MEIO EXATO
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  valueText: {
    fontSize: 34,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 26,
  },

  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '88%',
    marginBottom: 26,
  },

  iconImg: {
    width: 62,
    height: 62,
  },
  iconActive: {
    opacity: 1,
    transform: [{ scale: 1.2 }],
  },
  iconInactive: {
    opacity: 0.25,
    transform: [{ scale: 0.95 }],
  },

  slider: {
    width: '92%',
    marginBottom: 10,
  },

  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '92%',
  },

  labelSmall: {
    fontSize: 12,
    color: '#6B7280',
  },
});
