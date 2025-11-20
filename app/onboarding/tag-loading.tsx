// app/onboarding/tag-loading.tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { onboardingStyles as base } from './styles';
import { useOnboarding } from './OnboardingProvider';
import { useLocale } from '../i18n/LocaleProvider';

export default function OnboardingTagLoading() {
  const router = useRouter();
  const { answers } = useOnboarding();
  const { t } = useLocale();

  const tag = answers.tag ?? '';

  useEffect(() => {
    if (!tag || tag.length < 3) {
      router.replace('/onboarding/tag-error');
      return;
    }

    async function fetchPlayer() {
      try {
        const encoded = encodeURIComponent(tag);
        const url = `https://webhook.synergysolution.com.br/webhook/clash/player?tag=${encoded}`;

        const resp = await fetch(url, { method: 'GET' });

        if (!resp.ok) {
          router.replace({
            pathname: '/onboarding/tag-error',
            params: { tag, msg: 'not_found' },
          });
          return;
        }

        const data = await resp.json();

        router.replace({
          pathname: '/onboarding/tag-confirm',
          params: { tag, data: JSON.stringify(data) },
        });
      } catch {
        router.replace({
          pathname: '/onboarding/tag-error',
          params: { tag, msg: 'network' },
        });
      }
    }

    fetchPlayer();
  }, [tag, router]);

  return (
    <SafeAreaView style={base.safe}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 24,
        }}
      >
        <ActivityIndicator size="large" color="#111827" />

        <Text
          style={{
            marginTop: 22,
            fontSize: 18,
            fontWeight: '600',
            color: '#111827',
            textAlign: 'center',
          }}
        >
          {t('onboarding.tagLoading.title')}
        </Text>
      </View>
    </SafeAreaView>
  );
}
