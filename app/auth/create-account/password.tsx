// app/auth/create-account/password.tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { supabase } from '../../../src/lib/supabase';
import { useLocale } from '../../../src/i18n/LocaleProvider';

export default function CreateAccountPasswordScreen() {
  const router = useRouter();
  const { email, tag, player, onboarding } = useLocalSearchParams();
  const { t } = useLocale();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(14)).current;

  // Parse seguro do JSON enviado pelo plan-processing
  let onboardingAnswers: any = null;
  try {
    onboardingAnswers =
      typeof onboarding === 'string' && onboarding.length > 0
        ? JSON.parse(onboarding)
        : null;
  } catch {
    onboardingAnswers = null;
  }

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

  const shouldValidate = confirm.length > 0;

  async function createAccount() {
    setErrorMsg('');

    if (shouldValidate) {
      if (password.length < 6) {
        setErrorMsg(t('auth.password.error.short'));
        return;
      }
      if (password !== confirm) {
        setErrorMsg(t('auth.password.error.mismatch'));
        return;
      }
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: String(email),
      password,
    });

    if (error) {
      setLoading(false);
      setErrorMsg(error.message || 'Erro ao criar usuário.');
      return;
    }

    const user = data?.user;
    if (!user) {
      setLoading(false);
      setErrorMsg('Erro ao criar usuário.');
      return;
    }

    // Parse do player
    let parsedPlayer: any = null;
    if (typeof player === 'string' && player.length > 0 && player !== 'null') {
      try {
        parsedPlayer = JSON.parse(player);
      } catch {
        parsedPlayer = null;
      }
    }

    // SALVAR PERFIL COMPLETO COM answers SOMENTE DO ONBOARDING
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert(
        {
          id: user.id,
          email,
          tag: typeof tag === 'string' ? tag : '',
          player_json: parsedPlayer,
          answers: {
            goal: onboardingAnswers?.goal ?? null,
            source: onboardingAnswers?.source ?? null,
            playMode: onboardingAnswers?.playMode ?? null,
            arenaRange: onboardingAnswers?.arenaRange ?? null,
          },
          plan: 'free',
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );

    if (profileError) {
      console.log('profiles upsert error', profileError);
      setLoading(false);
      router.replace('/onboarding/plan-summary');
      return;
    }

    setLoading(false);
    router.replace('/onboarding/plan-summary');
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
        <Text style={styles.title}>{t('auth.password.title')}</Text>

        <Text style={styles.subtitle}>
          {t('auth.password.subtitle')}{' '}
          <Text style={styles.email}>{email}</Text>
        </Text>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>{t('auth.password.label')}</Text>

          <View style={styles.passwordRow}>
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!show}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShow(!show)}>
              <Ionicons
                name={show ? 'eye-off' : 'eye'}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>
            {t('auth.password.confirmLabel')}
          </Text>

          <View style={styles.passwordRow}>
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!show}
              value={confirm}
              onChangeText={setConfirm}
            />
          </View>
        </View>

        {shouldValidate && errorMsg ? (
          <Text style={styles.error}>{errorMsg}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={createAccount}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.primaryButtonText}>
              {t('auth.password.create')}
            </Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF' },
  backBtn: { paddingHorizontal: 18, paddingTop: 14 },
  container: { flex: 1, paddingHorizontal: 22, paddingTop: 12 },

  title: { fontSize: 26, fontWeight: '800', color: '#111' },
  subtitle: { marginTop: 6, fontSize: 15, color: '#6B7280', marginBottom: 26 },
  email: { fontWeight: '700', color: '#111' },

  inputWrapper: { marginBottom: 20 },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    color: '#374151',
  },

  passwordRow: {
    height: 52,
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    alignItems: 'center',
  },

  passwordInput: { flex: 1, fontSize: 16 },

  error: { color: '#DC2626', fontSize: 14, marginBottom: 12 },

  primaryButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
