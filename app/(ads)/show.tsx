import { View, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";

export default function ShowAd() {
  const { seconds, redirect } = useLocalSearchParams<{ seconds: string; redirect: string }>();
  const router = useRouter();

  useEffect(() => {
    const ms = Number(seconds) * 1000;
    const timer = setTimeout(() => {
      router.replace(redirect);
    }, ms);

    return () => clearTimeout(timer);
  }, [seconds, redirect]);

  return (
    <View>
      <Text>Anúncio por {seconds}s...</Text>
    </View>
  );
}
