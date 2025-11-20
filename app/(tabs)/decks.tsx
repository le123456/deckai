// app/(tabs)/decks.tsx
import { View, Text } from 'react-native';

export default function DecksScreen() {
  return (
    <View className="flex-1 bg-background px-5 pt-10">
      <Text className="text-white text-2xl font-bold mb-2">Decks</Text>
      <Text className="text-zinc-400 text-xs">
        Aqui vão ficar seus decks gerados e salvos pela IA.
      </Text>
    </View>
  );
}
