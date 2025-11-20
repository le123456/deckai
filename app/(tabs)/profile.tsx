// app/(tabs)/profile.tsx
import { View, Text, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-background px-5 pt-10">
      <View className="flex-row items-center mb-6">
        <View className="w-14 h-14 rounded-full bg-primarySoft items-center justify-center mr-3">
          <Text className="text-white text-xl font-bold">D</Text>
        </View>
        <View>
          <Text className="text-white text-lg font-semibold">Jogador deckia</Text>
          <Text className="text-zinc-400 text-xs">email@exemplo.com</Text>
        </View>
      </View>

      <View className="mb-6">
        <Text className="text-white font-semibold mb-3">Conta Clash Royale</Text>
        <Text className="text-zinc-400 text-xs">TAG do jogador</Text>
        <Text className="text-white text-sm mb-2">#XXXXX</Text>

        <TouchableOpacity className="bg-backgroundSoft border border-zinc-800 rounded-full py-2 items-center">
          <Text className="text-white text-sm font-medium">Editar TAG</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text className="text-white font-semibold mb-3">Conta</Text>
        <TouchableOpacity className="border border-red-500 rounded-full py-2 items-center">
          <Text className="text-red-500 text-sm font-medium">Sair da conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
