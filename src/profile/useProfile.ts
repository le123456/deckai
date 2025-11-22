import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile({ ...data, user });
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return { profile, loading, reloadProfile: load };
}
