import "../global.css";

import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LocaleProvider } from "../src/i18n/LocaleProvider";
import * as SplashScreen from "expo-splash-screen";

import { preloadAllAssets } from "../src/cards/preload";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        await preloadAllAssets();   // 🔥 PRELOAD AQUI!
      } catch (e) {
        console.log("Erro no preload inicial:", e);
      } finally {
        setReady(true);
        SplashScreen.hideAsync();  // 🔥 só libera o app depois
      }
    }

    init();
  }, []);

  if (!ready) return null;

  return (
    <SafeAreaProvider>
      <LocaleProvider>
        <StatusBar style="dark" />

        <Stack
          initialRouteName="app-loader"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#F3F4F6" },
          }}
        >
          <Stack.Screen name="app-loader" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </LocaleProvider>
    </SafeAreaProvider>
  );
}
