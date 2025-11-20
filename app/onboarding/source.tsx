import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, Feather, FontAwesome6 } from '@expo/vector-icons';
import { cloneElement, useState } from 'react';
import { onboardingStyles as base } from './styles';
import { ProgressBar } from './ProgressBar';
import { useOnboarding } from './OnboardingProvider';
import { useLocale } from '../i18n/LocaleProvider';

const SOURCES = [
  {
    id: 'instagram',
    labelKey: 'onboarding.source.instagram',
    icon: <Feather name="instagram" size={18} color="#6B7280" />,
  },
  {
    id: 'app_store',
    labelKey: 'onboarding.source.app_store',
    icon: <FontAwesome6 name="apple" size={18} color="#6B7280" />,
  },
  {
    id: 'tiktok',
    labelKey: 'onboarding.source.tiktok',
    icon: <FontAwesome6 name="tiktok" size={18} color="#6B7280" />,
  },
  {
    id: 'youtube',
    labelKey: 'onboarding.source.youtube',
    icon: <FontAwesome6 name="youtube" size={18} color="#6B7280" />,
  },
  {
    id: 'x',
    labelKey: 'onboarding.source.x',
    icon: <FontAwesome6 name="x-twitter" size={18} color="#6B7280" />,
  },
  {
    id: 'google',
    labelKey: 'onboarding.source.google',
    icon: <FontAwesome6 name="google" size={18} color="#6B7280" />,
  },
  {
    id: 'facebook',
    labelKey: 'onboarding.source.facebook',
    icon: <FontAwesome6 name="facebook" size={18} color="#6B7280" />,
  },
  {
    id: 'tv',
    labelKey: 'onboarding.source.tv',
    icon: <Ionicons name="tv-outline" size={18} color="#6B7280" />,
  },
  {
    id: 'other',
    labelKey: 'onboarding.source.other',
    icon: (
      <Ionicons
        name="ellipsis-horizontal-circle-outline"
        size={18}
        color="#6B7280"
      />
    ),
  },
];

export default function OnboardingSourceScreen() {
  const router = useRouter();
  const { answers, setAnswer } = useOnboarding();
  const { t } = useLocale();

  const [selected, setSelected] = useState<string | null>(
    answers.source ?? null
  );

  function handleSelect(value: string) {
    setSelected(value);
    setAnswer('source', value);
  }

  const handleContinue = () => {
    if (!selected) return;
    router.push('/onboarding/proof');
  };

  return (
    <SafeAreaView style={base.safe}>
      <View style={base.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={22} color="#111827" />
        </TouchableOpacity>
      </View>

      <ProgressBar step={4} total={7} />

      <View style={base.screenContainer}>
        <Text style={base.title}>{t('onboarding.source.title')}</Text>
        <Text style={base.subtitle}>{t('onboarding.source.subtitle')}</Text>

        <View style={{ flex: 1, marginTop: 26 }}>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 8, gap: 12 }}
            showsVerticalScrollIndicator={false}
          >
            {SOURCES.map((src) => {
              const isSelected = selected === src.id;

              return (
                <TouchableOpacity
                  key={src.id}
                  style={[
                    base.optionItem,
                    styles.row,
                    isSelected && base.optionItemSelected,
                  ]}
                  onPress={() => handleSelect(src.id)}
                  activeOpacity={0.9}
                >
                  <View
                    style={[
                      styles.iconPill,
                      isSelected && styles.iconPillSelected,
                    ]}
                  >
                    {cloneElement(src.icon, {
                      color: isSelected ? '#1F2937' : '#6B7280',
                    })}
                  </View>

                  <Text
                    style={[
                      base.optionText,
                      styles.label,
                      isSelected && base.optionTextSelected,
                    ]}
                  >
                    {t(src.labelKey)}
                  </Text>

                  <View style={styles.radioOuter}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={[
            base.primaryButton,
            !selected && base.primaryButtonDisabled,
          ]}
          disabled={!selected}
          activeOpacity={selected ? 0.9 : 1}
          onPress={handleContinue}
        >
          <Text style={base.primaryButtonText}>
            {t('common.continue')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconPill: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconPillSelected: {
    backgroundColor: '#E0E7FF',
  },
  label: {
    flex: 1,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5F5',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4F46E5',
  },
});
