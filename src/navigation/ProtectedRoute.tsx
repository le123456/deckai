import { Redirect } from "expo-router";
import { useSession } from "../auth/useSession";

export function ProtectedRoute({ children }: { children: any }) {
  const { session, loading } = useSession();

  if (loading) return null;

  if (!session) return <Redirect href="/auth/login" />;

  return children;
}
