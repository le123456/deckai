import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function OnboardingRatingScreen() {
  const router = useRouter();
  const [rating, setRating] = useState<number | null>(null);

  const handleContinue = () => {
    // TODO: salvar rating
    router.push('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* topo */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={22} color="#111827" />
        </TouchableOpacity>
      </View>

      {/* linha de progresso */}
      <View style={styles.progressLineWrapper}>
        <View style={styles.progressLineActive} />
        <View style={styles.progressLineActive} />
        <View style={styles.progressLineRest} />
      </View>

      <View style={styles.container}>
        {/* card grande de reviews de fundo */}
        <View style={styles.reviewCard}>
          <Text style={styles.reviewTitle}>Avalie a Deck IA</Text>

          <View style={styles.summaryRow}>
            <Ionicons name="star" size={18} color="#FBBF24" />
            <Text style={styles.summaryScore}>4,8</Text>
            <Text style={styles.summaryCount}>• 10k+ avaliações</Text>
          </View>

          <View style={styles.testimonialRow}>
            <Text style={styles.testimonialName}>KingPlayer</Text>
            <View style={styles.testimonialStars}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Ionicons key={i} name="star" size={12} color="#FBBF24" />
              ))}
            </View>
            <Text style={styles.testimonialText}>
              “Subi 500 troféus em 2 semanas depois de usar os decks sugeridos.”
            </Text>
          </View>

          <View style={styles.testimonialRow}>
            <Text style={styles.testimonialName}>ArenaMaster</Text>
            <View style={styles.testimonialStars}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Ionicons key={i} name="star" size={12} color="#FBBF24" />
              ))}
            </View>
            <Text style={styles.testimonialText}>
              “Finalmente parei de trocar de deck toda hora. A IA escolheu um que encaixa comigo.”
            </Text>
          </View>
        </View>

        {/* “popup” de rating em cima, estilo sistema */}
        <View style={styles.popupShadowWrapper}>
          <View style={styles.popupCard}>
            <View style={styles.popupIconCircle}>
              <Text style={styles.popupIconText}>D</Text>
            </View>

            <Text style={styles.popupTitle}>Curtindo a Deck IA?</Text>
            <Text style={styles.popupBody}>
              Toque em uma estrela para avaliar na loja.
            </Text>

            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((value) => (
                <TouchableOpacity
                  key={value}
                  onPress={() => setRating(value)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={rating && rating >= value ? 'star' : 'star-outline'}
                    size={30}
                    color={rating && rating >= value ? '#FBBF24' : '#D1D5DB'}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.popupButtonsRow}>
              <TouchableOpacity
                style={styles.popupButtonGhost}
                activeOpacity={0.8}
                onPress={handleContinue}
              >
                <Text style={styles.popupButtonGhostText}>Agora não</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.popupButtonPrimary}
                activeOpacity={0.9}
                onPress={handleContinue}
              >
                <Text style={styles.popupButtonPrimaryText}>Avaliar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={styles.footerButton}
          activeOpacity={0.9}
          onPress={handleContinue}
        >
          <Text style={styles.footerButtonText}>Continuar</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 4,
  },
  progressLineWrapper: {
    height: 3,
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 12,
  },
  progressLineActive: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 999,
    marginRight: 4,
  },
  progressLineRest: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 8,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    marginTop: 4,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryScore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 4,
  },
  summaryCount: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
  },
  testimonialRow: {
    marginBottom: 10,
  },
  testimonialName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  testimonialStars: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  testimonialText: {
    fontSize: 11,
    color: '#4B5563',
    lineHeight: 15,
  },
  popupShadowWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 200,
    alignItems: 'center',
  },
  popupCard: {
    width: 260,
    borderRadius: 22,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 18,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 14 },
    alignItems: 'center',
  },
  popupIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  popupIconText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 20,
  },
  popupTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  popupBody: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 14,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 16,
  },
  popupButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
  },
  popupButtonGhost: {
    flex: 1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  popupButtonGhostText: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '500',
  },
  popupButtonPrimary: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#111827',
  },
  popupButtonPrimaryText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  footerButton: {
    marginTop: 220,
    backgroundColor: '#111827',
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
