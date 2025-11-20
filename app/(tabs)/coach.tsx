// app/(tabs)/coach.tsx
import { View, Text, TouchableOpacity } from 'react-native';

export default function CoachScreen() {
  return (
    <View className="flex-1 bg-background px-5 pt-10">
      <Text className="text-white text-2xl font-bold mb-1">Coach IA</Text>
      <Text className="text-zinc-400 text-xs mb-4">
        Ferramentas para entender e melhorar seus decks.
      </Text>

      <View className="flex-row flex-wrap justify-between">
        {[
          ['Analisar deck', 'Veja fraquezas, substituições e como jogar.'],
          ['Matchups', 'Simule deck vs deck e entenda o confronto.'],
          ['Counter', 'Gere um deck counter para o meta atual.'],
          ['Learn', 'Lições, guias e quizzes para evoluir.'],
        ].map(([title, desc]) => (
          <TouchableOpacity
            key={title}
            className="w-[48%] bg-backgroundSoft border border-zinc-800 rounded-2xl p-3 mb-3"
          >
            <Text className="text-white text-sm font-semibold mb-1">{title}</Text>
            <Text className="text-zinc-400 text-[11px]">{desc}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
