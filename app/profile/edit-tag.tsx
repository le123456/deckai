// app/profile/edit-tag.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import { supabase } from "../../src/lib/supabase";
import { useProfile } from "../../src/profile/useProfile";

export default function EditTagScreen() {
  const router = useRouter();
  const { profile } = useProfile();

  const currentTag = profile?.tag ?? "";
  const [tag, setTag] = useState<string>(currentTag);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pasteTag() {
    const txt = await Clipboard.getStringAsync();
    const clean = txt.replace("#", "").trim().toUpperCase();
    setTag(clean);
    if (error) setError(null);
  }

  function normalizeTag(t: string) {
    return t.replace("#", "").trim().toUpperCase();
  }

  async function handleSave() {
    setError(null);

    const clean = normalizeTag(tag);
    if (!clean || clean.length < 3) {
      setError("TAG inválida");
      return;
    }

    setSaving(true);

    const { data } = await supabase.auth.getUser();
    if (!data?.user) {
      setError("Usuário não encontrado.");
      setSaving(false);
      return;
    }

    const { error: updErr } = await supabase
      .from("profiles")
      .update({ tag: clean })
      .eq("id", data.user.id);

    if (updErr) {
      setError("Erro ao salvar TAG.");
    } else {
      router.back();
    }

    setSaving(false);
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* BOTÃO DE VOLTAR */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Editar TAG</Text>

        {/* AVISO PERMANENTE */}
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>Atenção</Text>
          <Text style={styles.warningText}>
            Por segurança, sua TAG só pode ser alterada{" "}
            <Text style={styles.warningStrong}>1 vez a cada 15 dias</Text>.
          </Text>
        </View>

        {/* BLOCO EDITÁVEL */}
        <View style={styles.card}>
          {/* TAG ATUAL */}
          <Text style={styles.label}>TAG atual</Text>
          <Text style={styles.currentTag}>#{currentTag}</Text>

          {/* NOVA TAG */}
          <Text style={[styles.label, { marginTop: 18 }]}>Nova TAG</Text>

          {/* INPUT COM COLAR + # */}
          <View style={styles.inputWrapper}>
            <Text style={styles.hash}>#</Text>

            <TextInput
              style={styles.input}
              value={tag}
              onChangeText={(t) => setTag(t.toUpperCase())}
              autoCapitalize="characters"
              placeholder="YL29V828Y"
              placeholderTextColor="#999"
            />

            <TouchableOpacity onPress={pasteTag} style={styles.pasteBtnRight}>
              <Text style={styles.pasteText}>Colar</Text>
            </TouchableOpacity>
          </View>


          {error && <Text style={styles.error}>{error}</Text>}

          {/* SALVAR */}
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveText}>Salvar</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 4,
  },

  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 20,
  },

  /* AVISO */
  warningBox: {
    backgroundColor: "#FEF3C7",
    borderColor: "#FCD34D",
    borderWidth: 1,
    padding: 14,
    borderRadius: 16,
    marginBottom: 28,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#92400E",
    marginBottom: 4,
  },
  warningText: {
    fontSize: 13,
    color: "#92400E",
    lineHeight: 18,
  },
  warningStrong: {
    fontWeight: "700",
  },

  /* CARD BRANCO */
  card: {
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  label: {
    fontSize: 12,
    color: "#6B7280",
  },

  currentTag: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginTop: 2,
  },

  /* INPUT */
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginTop: 6,
  },

  hash: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6B7280",
    marginRight: 6,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
    fontWeight: "600",
  },

  pasteBtnRight: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    marginLeft: 10,
  },

  pasteText: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "600",
  },


  error: {
    color: "#DC2626",
    fontSize: 12,
    marginTop: 8,
  },

  /* BOTÃO SALVAR */
  saveBtn: {
    backgroundColor: "#111827",
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 18,
  },
  saveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
