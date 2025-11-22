// app/onboarding/tag.tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { onboardingStyles as base } from '../../src/onboarding/styles';
import { ProgressBar } from '../../src/onboarding/ProgressBar';
import { useOnboarding } from '../../src/onboarding/OnboardingProvider';
import { useLocale } from '../../src/i18n/LocaleProvider';

export default function OnboardingTagScreen() {
  const router = useRouter();
  const { t, locale } = useLocale();
  const { setAnswer } = useOnboarding();

  const [tag, setTag] = useState('');
  const [error, setError] = useState('');

  async function pasteTag() {
    const txt = await Clipboard.getStringAsync();
    handleChange(txt);
  }

  function handleChange(v: string) {
    const clean = v.replace('#', '').toUpperCase();
    setTag(clean);
    if (error) setError('');
  }

  function handleContinue() {
    if (tag.length < 5) {
      setError(t('onboarding.tag.invalid'));
      return;
    }

    setAnswer('tag', tag.toUpperCase());
    router.push('/onboarding/tag-loading');
  }

  const isDisabled = tag.length < 5;

  return (
    <SafeAreaView style={base.safe}>
      <View style={base.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#111827" />
        </TouchableOpacity>
      </View>

      <ProgressBar step={6} total={7} />

      <View style={base.screenContainer}>
        <Text style={base.title}>{t('onboarding.tag.title')}</Text>
        <Text style={base.subtitle}>{t('onboarding.tag.subtitle')}</Text>

        <View
          style={{
            marginTop: 28,
            padding: 14,
            borderRadius: 22,
            backgroundColor: '#F1F2F4',
            alignSelf: 'center',
            overflow: 'hidden',
          }}
        >
          <Image
            source={
              locale === 'pt-BR'
                ? require('../../assets/onboarding/tag_hint_pt.webp')
                : require('../../assets/onboarding/tag_hint_en.webp')
            }
            style={{
              width: 260,
              height: 180,
              borderRadius: 18,
            }}
            resizeMode="contain"
          />
        </View>

        <TextInput
          placeholder="9LP2QJ8CV"
          autoCapitalize="characters"
          value={tag}
          onChangeText={handleChange}
          style={{
            marginTop: 32,
            backgroundColor: '#FFFFFF',
            borderWidth: 1.5,
            borderColor: '#E5E7EB',
            borderRadius: 14,
            paddingVertical: 14,
            paddingHorizontal: 18,
            fontSize: 17,
            fontWeight: '500',
            color: '#111827',
            textAlign: 'center',
          }}
        />

        {error !== '' && (
          <Text
            style={{
              marginTop: 6,
              color: '#DC2626',
              fontSize: 13,
              textAlign: 'center',
            }}
          >
            {error}
          </Text>
        )}

        <TouchableOpacity
          onPress={pasteTag}
          activeOpacity={0.85}
          style={{
            alignSelf: 'center',
            marginTop: 14,
            paddingHorizontal: 18,
            paddingVertical: 7,
            backgroundColor: '#F3F4F6',
            borderRadius: 999,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: '600',
              color: '#111827',
            }}
          >
            {t('onboarding.tag.paste')}
          </Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={[
            base.primaryButton,
            isDisabled && base.primaryButtonDisabled,
          ]}
          disabled={isDisabled}
          onPress={handleContinue}
          activeOpacity={isDisabled ? 1 : 0.9}
        >
          <Text style={base.primaryButtonText}>{t('common.continue')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
