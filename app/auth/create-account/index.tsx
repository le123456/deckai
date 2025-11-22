// app/auth/create-account/index.tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { useEffect, useRef, useState, useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useLocale } from '../../../src/i18n/LocaleProvider';

const COMMON_DOMAINS = [
  'gmail.com',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
  'yahoo.com',
];

export default function CreateAccountEmailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { t } = useLocale();

  const tag = typeof params.tag === 'string' ? params.tag : '';
  const playerRaw = typeof params.player === 'string' ? params.player : '';
  const onboardingRaw =
    typeof params.onboarding === 'string' ? params.onboarding : '';

  const [email, setEmail] = useState('');

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(14)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 180,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 180,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, slide]);

  const isValid = useMemo(() => {
    if (!email.includes('@')) return false;
    const [localPart, domainPart] = email.split('@');
    if (!localPart || localPart.length < 2) return false;
    if (!domainPart) return false;
    return true;
  }, [email]);

  const domainSuggestions = useMemo(() => {
    const [, domainPart] = email.split('@');
    if (!email.includes('@') || !domainPart) return [];
    const lower = domainPart.toLowerCase();
    return COMMON_DOMAINS.filter((d) => d.startsWith(lower));
  }, [email]);

  function applyDomainSuggestion(domain: string) {
    const [localPart] = email.split('@');
    setEmail(`${localPart}@${domain}`);
  }

  function handleNext() {
    if (!isValid) return;

    router.push({
      pathname: '/auth/create-account/password',
      params: {
        email,
        tag,
        player: playerRaw,
        onboarding: onboardingRaw, // ← enviando para a próxima etapa
      },
    });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Ionicons name="chevron-back" size={26} color="#111" />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.container,
          { opacity: fade, transform: [{ translateY: slide }] },
        ]}
      >
        <Text style={styles.title}>{t('auth.create.title')}</Text>
        <Text style={styles.subtitle}>{t('auth.create.subtitle')}</Text>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>
            {t('auth.create.emailLabel')}
          </Text>
          <TextInput
            style={styles.input}
            placeholder={t('auth.create.emailPlaceholder')}
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
          />

          {domainSuggestions.length > 0 && (
            <View style={styles.suggestionsRow}>
              {domainSuggestions.map((d) => (
                <TouchableOpacity
                  key={d}
                  style={styles.suggestionChip}
                  onPress={() => applyDomainSuggestion(d)}
                >
                  <Text style={styles.suggestionText}>{d}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={handleNext}
          style={[styles.primaryButton, !isValid && { opacity: 0.4 }]}
          disabled={!isValid}
        >
          <Text style={styles.primaryButtonText}>
            {t('auth.create.continue')}
          </Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>{t('auth.create.social.or')}</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-google" size={20} color="#FFF" />
          <Text style={styles.socialText}>
            {t('auth.create.social.google')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-apple" size={22} color="#FFF" />
          <Text style={styles.socialText}>
            {t('auth.create.social.apple')}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF' },
  backBtn: { paddingHorizontal: 18, paddingTop: 14 },
  container: { flex: 1, paddingHorizontal: 22, paddingTop: 10 },

  title: { fontSize: 28, fontWeight: '800', color: '#111' },
  subtitle: { marginTop: 6, fontSize: 15, color: '#6B7280', marginBottom: 32 },

  inputWrapper: { marginBottom: 18 },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    fontSize: 16,
  },

  suggestionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  suggestionChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
  },
  suggestionText: {
    fontSize: 13,
    color: '#4B5563',
  },

  primaryButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },

  dividerRow: {
    marginTop: 28,
    marginBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 14,
    color: '#6B7280',
  },

  socialButton: {
    height: 52,
    backgroundColor: '#000',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'center',
    marginBottom: 12,
  },
  socialText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
