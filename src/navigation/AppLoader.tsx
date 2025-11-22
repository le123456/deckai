// src/navigation/AppLoader.tsx
import { useEffect } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthGate } from '../auth/useAuthGate';

export default function AppLoader() {
  const router = useRouter();
  const { session, loading } = useAuthGate();

  useEffect(() => {
    if (loading) return;

    // Usuário logado
    if (session) {
      router.replace('/(tabs)');
      return;
    }

    // Usuário não logado → inicia onboarding
    router.replace('/');
  }, [loading, session]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
      }}
    >
      <ActivityIndicator size="large" color="#7C3AED" />
      <Text style={{ marginTop: 12, color: '#6B7280' }}>
        Carregando...
      </Text>
    </View>
  );
}
