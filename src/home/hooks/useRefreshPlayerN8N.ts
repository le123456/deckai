import { useState, useCallback } from "react";
import { supabase } from "../../lib/supabase";

const N8N_REFRESH_URL =
  "https://webhook.synergysolution.com.br/webhook/clash/player";

export function useRefreshPlayer(profile: any | null) {
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(
    async (setFullLoading?: (v: boolean) => void) => {
      try {
        setRefreshing(true);
        setFullLoading?.(true);

        // 1) pegar tag
        const tag =
          profile?.tag ||
          (() => {
            try {
              const arr = JSON.parse(profile?.player_json ?? "[]");
              return arr?.[0]?.tag;
            } catch {
              return null;
            }
          })();

        if (!tag) {
          console.log("❌ Nenhuma TAG encontrada para refresh");
          setFullLoading?.(false);
          setRefreshing(false);
          return;
        }

        // 2) chamar n8n
        const encoded = encodeURIComponent(tag);
        const url = `${N8N_REFRESH_URL}?tag=${encoded}`;

        const resp = await fetch(url);
        if (!resp.ok) throw new Error("Erro ao puxar player");

        const data = await resp.json();

        // 3) salvar no supabase
        const { error } = await supabase
          .from("profiles")
          .update({
            player_json: JSON.stringify(data),
            updated_at: new Date().toISOString(),
          })
          .eq("id", profile.id);

        if (error) console.warn("Erro ao salvar Supabase:", error);

        await supabase.auth.refreshSession();
      } catch (e) {
        console.log("Erro no refresh:", e);
      } finally {
        setRefreshing(false);
        setFullLoading?.(false);
      }
    },
    [profile]
  );

  return { refresh, refreshing };
}
