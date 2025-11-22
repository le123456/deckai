// app/legal/privacy.tsx
import { Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-background px-5 pt-10" showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={() => router.back()} className="mb-6">
        <Text className="text-zinc-400 text-sm">◀ Voltar</Text>
      </TouchableOpacity>

      <Text className="text-white text-2xl font-bold mb-4">Política de Privacidade</Text>

      <Text className="text-zinc-300 leading-6 mb-4">
        Esta Política de Privacidade descreve como tratamos os dados dos usuários
        do aplicativo DeckIA.
      </Text>

      <Text className="text-white font-semibold mb-2">1. Coleta de Informações</Text>
      <Text className="text-zinc-300 leading-6 mb-4">
        Coletamos apenas os dados necessários para funcionamento do app, como:
        • E-mail para login  
        • TAG do Clash Royale  
        • Dados públicos da sua conta Clash Royale  
        • Respostas do onboarding  
      </Text>

      <Text className="text-white font-semibold mb-2">2. Uso das Informações</Text>
      <Text className="text-zinc-300 leading-6 mb-4">
        Usamos as informações para fornecer funcionalidades como análises de deck,
        recomendações e personalização da experiência dentro do aplicativo.
      </Text>

      <Text className="text-white font-semibold mb-2">3. Compartilhamento</Text>
      <Text className="text-zinc-300 leading-6 mb-4">
        Não vendemos, alugamos ou compartilhamos seus dados com terceiros,
        exceto provedores essenciais: Supabase (autenticação), RevenueCat
        (assinaturas) e API oficial do Clash Royale.
      </Text>

      <Text className="text-white font-semibold mb-2">4. Segurança</Text>
      <Text className="text-zinc-300 leading-6 mb-4">
        Todos os dados são armazenados com criptografia e protegidos por medidas
        modernas de segurança oferecidas pelos provedores utilizados.
      </Text>

      <Text className="text-white font-semibold mb-2">5. Seus Direitos</Text>
      <Text className="text-zinc-300 leading-6 mb-10">
        Você pode solicitar exclusão da conta, alteração da TAG ou remoção completa
        dos seus dados entrando em contato pelo suporte no e-mail:
        suporte@deckia.app
      </Text>
    </ScrollView>
  );
}
