import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { onboardingStyles as base } from './styles';
import { ProgressBar } from './ProgressBar';
import { useOnboarding, ClashGoal } from './OnboardingProvider';
import { useLocale } from '../i18n/LocaleProvider';

const OPTIONS: { id: ClashGoal; key: string; emoji: string }[] = [
  {
    id: 'arena',
    key: 'onboarding.goal.option.arena',
    emoji: '⬆️',
  },
  {
    id: 'win_more',
    key: 'onboarding.goal.option.win_more',
    emoji: '🏆',
  },
  {
    id: 'find_deck',
    key: 'onboarding.goal.option.find_deck',
    emoji: '🃏',
  },
  {
    id: 'test_app',
    key: 'onboarding.goal.option.test_app',
    emoji: '⚡',
  },
];

export default function OnboardingGoalScreen() {
  const router = useRouter();
  const { answers, setAnswer } = useOnboarding();
  const { t } = useLocale();

  const [selected, setSelected] = useState<ClashGoal | undefined>(answers.goal);

  function handleSelect(id: ClashGoal) {
    setSelected(id);
    setAnswer('goal', id);
  }

  function handleContinue() {
    if (!selected) return;
    router.push('/onboarding/playstyle');
  }

  return (
    <SafeAreaView style={base.safe}>
      <View style={base.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#111827" />
        </TouchableOpacity>
      </View>

      <ProgressBar step={1} total={7} />

      <View style={base.screenContainer}>
        <Text style={base.title}>{t('onboarding.goal.title')}</Text>
        <Text style={base.subtitle}>{t('onboarding.goal.subtitle')}</Text>

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
