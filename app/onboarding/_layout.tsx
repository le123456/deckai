import { Stack } from 'expo-router';
import { OnboardingProvider } from './OnboardingProvider';

export default function OnboardingLayout() {
  return (
    <OnboardingProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </OnboardingProvider>
  );
}
