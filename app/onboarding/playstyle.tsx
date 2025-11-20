import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { onboardingStyles as base } from './styles';
import { ProgressBar } from './ProgressBar';
import { useOnboarding } from './OnboardingProvider';
import { useLocale } from '../i18n/LocaleProvider';

const OPTIONS: { id: string; key: string; emoji: string }[] = [
  {
    id: 'ladder',
    key: 'onboarding.playstyle.opt.ladder',
    emoji: '🏆',
  },
  {
    id: 'challenges',
    key: 'onboarding.playstyle.opt.challenges',
    emoji: '🎯',
  },
  {
    id: 'clan',
    key: 'onboarding.playstyle.opt.clan',
    emoji: '🛡️',
  },
  {
    id: 'casual',
    key: 'onboarding.playstyle.opt.casual',
    emoji: '😄',
  },
];

export default function OnboardingPlaystyleScreen() {
  const router = useRouter();
  const { answers, setAnswer } = useOnboarding();
  const { t } = useLocale();

  const [selected, setSelected] = useState<string | null>(
    answers.playMode ?? null
  );

  function handleSelect(id: string) {
    setSelected(id);
    setAnswer('playMode', id);
  }

  function handleContinue() {
    if (!selected) return;
    router.push('/onboarding/arena-level');
  }

  return (
    <SafeAreaView style={base.safe}>
      <View style={base.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#111827" />
        </TouchableOpacity>
      </View>

      <ProgressBar step={2} total={7} />

      <View style={base.screenContainer}>
        <Text style={base.title}>{t('onboarding.playstyle.title')}</Text>
        <Text style={base.subtitle}>{t('onboarding.playstyle.subtitle')}</Text>

        <View style={{ marginTop: 32, gap: 14 }}>
          {OPTIONS.map((opt) => {
            const isActive = selected === opt.id;

            return (
              <TouchableOpacity
                key={opt.id}
                activeOpacity={0.85}
                onPress={() => handleSelect(opt.id)}
                style={[
                  base.optionRow,
                  isActive && base.optionRowSelected,
                ]}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{
                      fontSize: 20,
                      width: 26,
                      marginRight: 10,
                      opacity: isActive ? 1 : 0.55,
                    }}
                  >
                    {opt.emoji}
                  </Text>

                  <Text
                    style={[
                      base.optionText,
                      isActive && base.optionTextSelected,
                    ]}
                  >
                    {t(opt.key)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          onPress={handleContinue}
          disabled={!selected}
          style={[
            base.primaryButton,
            !selected && base.primaryButtonDisabled,
          ]}
        >
          <Text style={base.primaryButtonText}>
            {t('common.continue')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
