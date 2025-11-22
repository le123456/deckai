// app/onboarding/styles.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Ambos existiam – mantive os dois, pois são usados em locais diferentes
export const CARD_WIDTH = Math.min(380, width * 0.9);
export const CARD_WIDTH_SUMMARY = width - 40; // usado no plan-summary

export const onboardingStyles = StyleSheet.create({
  // --- Layout Base ---
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  screenContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
  },

  // --- Títulos ---
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#020617',
    marginTop: 6,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
    maxWidth: '90%',
  },

  // --- Barra de Progresso (duas variações preservadas) ---
  progressBarWrapper: {
    height: 4,
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 16,
  },

  // Variação antiga (segmentada)
  progressSegment: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    marginRight: 4,
  },
  progressSegmentActive: {
    backgroundColor: '#111827',
  },

  // Variação nova (barra contínua)
  progressTrack: {
    flex: 1,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#111827',
  },

  // --- Botão Primário ---
  primaryButton: {
    height: 52,
    borderRadius: 999,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  primaryButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F9FAFB',
  },

  // --- Listas ---
  list: {
    gap: 12,
  },

  // Variação antiga (quadrada)
  optionItem: {
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  optionItemSelected: {
    backgroundColor: '#E0E7FF',
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },

  // Variação nova (row redonda)
  optionRow: {
    height: 52,
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionRowSelected: {
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#6366F1',
  },

  // Texto de opções (compatível com ambas)
  optionText: {
    fontSize: 16,
    color: '#111827',
  },
  optionTextSelected: {
    fontWeight: '600',
    color: '#111827',
  },

  // --- Opção com ícone (nova versão) ---
  optionIconRow: {
    height: 52,
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIconWrapper: {
    width: 26,
    height: 26,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  optionRightCircle: {
    marginLeft: 'auto',
    width: 20,
    height: 20,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },
  optionRightCircleSelected: {
    borderColor: '#4F46E5',
    backgroundColor: '#EEF2FF',
  },
});
