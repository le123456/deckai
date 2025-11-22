// app/auth/_layout.tsx
import { Stack } from "expo-router";
import { GuestRoute } from "../../src/navigation/GuestRoute";

export default function AuthLayout() {
  return (
    <GuestRoute>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#FFF" },
        }}
      />
    </GuestRoute>
  );
}
