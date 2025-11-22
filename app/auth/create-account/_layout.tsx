import { Stack } from 'expo-router';
import { OnboardingProvider } from '../../../src/onboarding/OnboardingProvider';

export default function CreateAccountLayout() {
  return (
    <OnboardingProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </OnboardingProvider>
  );
}
