// app/legal/terms.tsx
import { Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function TermsOfUse() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-background px-5 pt-10" showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={() => router.back()} className="mb-6">
        <Text className="text-zinc-400 text-sm">◀ Voltar</Text>
      </TouchableOpacity>

      <Text className="text-white text-2xl font-bold mb-4">Termos de Uso</Text>

      <Text className="text-zinc-300 leading-6 mb-4">
        Ao usar o aplicativo DeckIA, você concorda com estes Termos de Uso.
      </Text>

      <Text className="text-white font-semibold mb-2">1. Uso do Aplicativo</Text>
      <Text className="text-zinc-300 leading-6 mb-4">
        O DeckIA fornece análises e insights sobre Clash Royale. Não temos vínculo
        oficial com a Supercell. Todo conteúdo é baseado em algoritmos e APIs públicas.
      </Text>

      <Text className="text-white font-semibold mb-2">2. Assinaturas PRO</Text>
      <Text className="text-zinc-300 leading-6 mb-4">
        O plano PRO é renovado automaticamente pela App Store/Google Play,
        salvo cancelamento manual pelo usuário nas configurações da loja.
      </Text>

      <Text className="text-white font-semibold mb-2">3. Responsabilidade</Text>
      <Text className="text-zinc-300 leading-6 mb-4">
        Não garantimos vitórias, resultados específicos ou desempenho no jogo.
        O app é uma ferramenta de auxílio e estratégia.
      </Text>

      <Text className="text-white font-semibold mb-2">4. Propriedade Intelectual</Text>
      <Text className="text-zinc-300 leading-6 mb-4">
        Todas as imagens e marcas do Clash Royale pertencem à Supercell.
        O DeckIA utiliza apenas assets disponíveis publicamente.
      </Text>

      <Text className="text-white font-semibold mb-2">5. Cancelamento</Text>
      <Text className="text-zinc-300 leading-6 mb-10">
        Você pode cancelar sua assinatura a qualquer momento nas configurações
        da App Store ou Google Play.
      </Text>
    </ScrollView>
  );
}
