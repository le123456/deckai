// app/onboarding/proof.tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { onboardingStyles as base, CARD_WIDTH } from '../../src/onboarding/styles';
import { ProgressBar } from '../../src/onboarding/ProgressBar';
import { useLocale } from '../../src/i18n/LocaleProvider';

export default function OnboardingProofScreen() {
    const router = useRouter();
    const { t } = useLocale();

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

            <ProgressBar step={5} total={7} />

            <View style={base.screenContainer}>
                <Text style={base.title}>
                    {t('onboarding.proof.title')}
                </Text>
                <Text style={base.subtitle}>
                    {t('onboarding.proof.subtitle')}
                </Text>

                {/* card tipo Cal AI */}
                <View style={styles.card}>
                    <View style={styles.chartWrapper}>
                        <View style={styles.pillColumn}>
                            <View style={styles.pill}>
                                <View style={styles.pillTop}>
                                    <Text style={styles.pillTitle}>
                                        {t('onboarding.proof.without')}
                                    </Text>
                                </View>
                                <View style={[styles.pillBottom, styles.pillBottomLight]}>
                                    <Text style={styles.pillBottomLightText}>
                                        {t('onboarding.proof.badgeWithout')}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.pillColumn}>
                            <View style={styles.pill}>
                                <View style={styles.pillTop}>
                                    <Text style={styles.pillTitle}>
                                        {t('onboarding.proof.with')}
                                    </Text>
                                </View>
                                <View style={[styles.pillBottom, styles.pillBottomDark]}>
                                    <Text style={styles.pillBottomDarkText}>
                                        {t('onboarding.proof.badgeWith')}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.cardFootnote}>
                        {t('onboarding.proof.footnote')}
                    </Text>
                </View>

                <View style={{ flex: 1 }} />

                <TouchableOpacity
                    style={base.primaryButton}
                    activeOpacity={0.9}
                    onPress={() => router.push('/onboarding/tag')}
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
    card: {
        width: CARD_WIDTH,
        alignSelf: 'center',
        marginTop: 32,
        borderRadius: 32,
        paddingVertical: 28,
        paddingHorizontal: 24,
        backgroundColor: '#F5F5F7',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 24,
        shadowOffset: { width: 0, height: 12 },
    },
    chartWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 18,
    },
    pillColumn: {
        alignItems: 'center',
    },
    pill: {
        width: 96,
        height: 190,
        borderRadius: 32,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
    },
    pillTop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    pillBottom: {
        height: 64,
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pillBottomLight: {
        backgroundColor: '#E5E7EB',
    },
    pillBottomDark: {
        backgroundColor: '#000000',
        height: 130,
    },
    pillTitle: {
        textAlign: 'center',
        fontSize: 13,
        fontWeight: '600',
        color: '#111827',
        lineHeight: 18,
    },
    pillBottomLightText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#111827',
    },
    pillBottomDarkText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    cardFootnote: {
        fontSize: 12,
        textAlign: 'center',
        color: '#6B7280',
    },
});
