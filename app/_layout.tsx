// app/_layout.tsx
import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LocaleProvider } from './i18n/LocaleProvider';

export default function RootLayout() {
  return (
    <LocaleProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#050816' },
        }}
      />
    </LocaleProvider>
  );
}
