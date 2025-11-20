// app/index.tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useLocale } from './i18n/LocaleProvider';

const logo = require('../assets/images/deckia-logo.png');

export default function WelcomeScreen() {
  const router = useRouter();
  const { locale, setLocale, t } = useLocale();

  const toggleLocale = () => {
    setLocale(locale === 'pt-BR' ? 'en-US' : 'pt-BR');
  };

  const langLabel = locale === 'pt-BR' ? 'PT-BR ⌄' : 'EN-US ⌄';

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.langPill} onPress={toggleLocale}>
          <Text style={styles.langText}>{langLabel}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.center}>
        <Image source={logo} style={styles.logo} />

        <Text style={styles.title}>{t('welcome.title')}</Text>

        <Text style={styles.subtitle}>{t('welcome.subtitle')}</Text>

        <TouchableOpacity
          onPress={() => router.push('/onboarding/goal')}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>{t('welcome.cta')}</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.secondary}>{t('welcome.loginLater')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  topRow: {
    paddingHorizontal: 24,
    paddingTop: 12,
    alignItems: 'flex-end',
  },
  langPill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    backgroundColor: '#FFFFFF',
  },
  langText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#111827',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 22,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    color: '#0F0F0F',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#6B7280',
    marginTop: -8,
  },
  primaryButton: {
    marginTop: 12,
    backgroundColor: '#0F0F0F',
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondary: {
    fontSize: 14,
    textAlign: 'center',
    color: '#9CA3AF',
    marginTop: -6,
  },
});
