import { Redirect } from "expo-router";
import { useSession } from "../auth/useSession";

export function GuestRoute({ children }: { children: any }) {
  const { session, loading } = useSession();

  if (loading) return null;

  if (session) return <Redirect href="/(tabs)" />;

  return children;
}
