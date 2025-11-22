// app/onboarding/plan-generating.tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { onboardingStyles as base } from '../../src/onboarding/styles';
import { ProgressBar } from '../../src/onboarding/ProgressBar';
import { useLocale } from '../../src/i18n/LocaleProvider';

export default function OnboardingPlanGenerating() {
  const router = useRouter();
  const { t } = useLocale();

  function handleGenerate() {
    router.push('/onboarding/plan-processing');
  }

  return (
    <SafeAreaView style={base.safe}>
      <View style={base.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#111827" />
        </TouchableOpacity>
      </View>

      <ProgressBar step={7} total={7} />

      <View style={base.screenContainer}>
        <Text style={base.title}>
          {t('onboarding.planGenerating.title')}
        </Text>

        <Text style={base.subtitle}>
          {t('onboarding.planGenerating.subtitle')}
        </Text>

        <View style={styles.gifCard}>
          <Image
            source={require('../../assets/gifs/plan-loading.gif')}
            style={styles.gif}
            resizeMode="contain"
          />
        </View>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          onPress={handleGenerate}
          style={base.primaryButton}
          activeOpacity={0.9}
        >
          <Text style={base.primaryButtonText}>
            {t('onboarding.planGenerating.cta')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gifCard: {
    marginTop: 32,
    alignSelf: 'stretch',
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gif: {
    width: 160,
    height: 160,
  },
});
