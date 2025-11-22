// app/profile/restore.tsx
import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function RestorePurchasesScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleRestore() {
    setLoading(true);
    Alert.alert("Restaurar compras", "Função será ativada com RevenueCat.");
    setLoading(false);
  }

  return (
    <ScrollView className="flex-1 bg-background px-5 pt-10">
      <TouchableOpacity onPress={() => router.back()}>
        <Text className="text-zinc-400 mb-6">◀ Voltar</Text>
      </TouchableOpacity>

      <Text className="text-white text-2xl font-bold mb-3">Restaurar compras</Text>
      <Text className="text-zinc-400 text-sm mb-6">
        Caso você tenha assinado em outro dispositivo, restaure aqui.
      </Text>

      <TouchableOpacity
        onPress={handleRestore}
        className="bg-primary rounded-full py-3 items-center"
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white">Restaurar</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
