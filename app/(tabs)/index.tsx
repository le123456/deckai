// app/(tabs)/index.tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 12,   // sobe os cards
          paddingBottom: 40,
        }}
      >
        <Text className="text-white text-2xl font-bold mb-4">Início</Text>

        <View className="bg-backgroundSoft border border-zinc-800 rounded-2xl p-4 mb-3">
          <Text className="text-white font-semibold mb-1">Seu status</Text>
          <Text className="text-zinc-400 text-xs">
            Conecte sua TAG para gerar decks com base nas suas cartas.
          </Text>
        </View>

        <View className="bg-backgroundSoft border border-zinc-800 rounded-2xl p-4">
          <Text className="text-white font-semibold mb-1">Deck recomendado</Text>
          <Text className="text-zinc-400 text-xs">
            Assim que conectar, vamos sugerir um deck para você testar.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
