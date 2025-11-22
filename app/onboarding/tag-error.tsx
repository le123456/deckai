// app/onboarding/tag-error.tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { onboardingStyles as base } from '../../src/onboarding/styles';
import { useLocale } from '../../src/i18n/LocaleProvider';

export default function OnboardingTagError() {
  const router = useRouter();
  const { t } = useLocale();
  const { tag, msg } = useLocalSearchParams();

  const cleanTag =
    typeof tag === 'string' ? tag.replace('#', '').toUpperCase() : '';

  // Mensagem específica
  const reason =
    msg === 'not_found'
      ? t('onboarding.tagError.not_found')
      : msg === 'network'
      ? t('onboarding.tagError.network')
      : t('onboarding.tagError.not_found');

  return (
    <SafeAreaView style={base.safe}>
      {/* HEADER */}
      <View style={base.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#111827" />
        </TouchableOpacity>
      </View>

      <View style={base.screenContainer}>

        {/* TITLE */}
        <Text style={base.title}>
          {t('onboarding.tagError.title')}
        </Text>

        {/* SUBTITLE */}
        <Text style={base.subtitle}>
          {t('onboarding.tagError.subtitle')}
        </Text>

        {/* ERROR BOX */}
        <View
          style={{
            marginTop: 40,
            paddingVertical: 22,
            paddingHorizontal: 20,
            borderRadius: 16,
            backgroundColor: '#FEF2F2',
            borderWidth: 1,
            borderColor: '#FECACA',
            width: '90%',
            alignSelf: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons
            name="alert-circle"
            size={34}
            color="#DC2626"
            style={{ marginBottom: 12 }}
          />

          <Text
            style={{
              color: '#B91C1C',
              fontSize: 16,
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: 6,
            }}
          >
            {reason}
          </Text>

          <Text
            style={{
              color: '#B91C1C',
              fontSize: 15,
              textAlign: 'center',
              opacity: 0.9,
            }}
          >
            TAG: #{cleanTag}
          </Text>
        </View>

        <View style={{ flex: 1 }} />

        {/* BUTTON */}
        <TouchableOpacity
          style={base.primaryButton}
          onPress={() => router.replace('/onboarding/tag')}
          activeOpacity={0.9}
        >
          <Text style={base.primaryButtonText}>
            {t('onboarding.tagError.tryAgain')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
