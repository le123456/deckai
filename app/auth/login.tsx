// app/auth/login.tsx
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Platform,
  FlatList,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../src/lib/supabase";
import { useLocale } from "../../src/i18n/LocaleProvider";

export default function LoginScreen() {
  const router = useRouter();
  const { t } = useLocale();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [showSuggestions, setShowSuggestions] = useState(false);

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(12)).current;

  // Sugestões comuns
  const DOMAINS = ["gmail.com", "outlook.com", "hotmail.com", "icloud.com"];

  // Autocomplete baseado no texto antes do "@"
  const autoSuggestions = email.includes("@")
    ? []
    : DOMAINS.map((d) => `${email}@${d}`);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const isEmailValid = email.includes("@") && email.includes(".");

  async function handleLogin() {
    setErrorMsg("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(
        error.message === "Invalid login credentials"
          ? t("auth.login.error.invalid")
          : error.message
      );
      return;
    }

    // Após login → tabs
    router.replace("/(tabs)");
  }

  async function signInWithOAuth(provider: "google" | "apple") {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: "exp://localhost:8081" },
    });

    setLoading(false);
    if (error) setErrorMsg(error.message);
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* VOLTAR → /index */}
      <TouchableOpacity
        onPress={() => router.replace("/")}
        style={styles.backBtn}
      >
        <Ionicons name="chevron-back" size={26} color="#111" />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.container,
          { opacity: fade, transform: [{ translateY: slide }] },
        ]}
      >
        <Text style={styles.title}>{t("auth.login.title")}</Text>
        <Text style={styles.subtitle}>{t("auth.login.subtitle")}</Text>

        {/* EMAIL FIELD */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>{t("auth.login.emailLabel")}</Text>

          <View style={styles.inputEmailRow}>
            <TextInput
              style={styles.inputEmail}
              placeholder="seuemail@gmail.com"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={(txt) => {
                setEmail(txt);
                setShowSuggestions(true);
              }}
            />
          </View>

          {/* AUTO-SUGESTÕES */}
          {showSuggestions && autoSuggestions.length > 0 && (
            <View style={styles.suggestionBox}>
              <FlatList
                data={autoSuggestions}
                keyExtractor={(i) => i}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => {
                      setEmail(item);
                      setShowSuggestions(false);
                    }}
                  >
                    <Ionicons
                      name="mail-outline"
                      size={17}
                      color="#6B7280"
                      style={{ marginRight: 8 }}
                    />
                    <Text style={styles.suggestionText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>

        {/* PASSWORD FIELD */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>{t("auth.login.passwordLabel")}</Text>

          <View style={styles.passwordRow}>
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!show}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShow(!show)}>
              <Ionicons
                name={show ? "eye-off" : "eye"}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>
        </View>

        {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

        {/* CTA */}
        <TouchableOpacity
          onPress={handleLogin}
          style={[
            styles.primaryButton,
            (!isEmailValid || password.length < 3) && { opacity: 0.45 },
          ]}
          disabled={!isEmailValid || loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.primaryButtonText}>
              {t("auth.login.cta")}
            </Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>{t("auth.or")}</Text>
          <View style={styles.divider} />
        </View>

        {/* GOOGLE */}
        <TouchableOpacity
          style={styles.oauthButton}
          onPress={() => signInWithOAuth("google")}
        >
          <Ionicons name="logo-google" size={18} color="#111" />
          <Text style={styles.oauthText}>
            {t("auth.continue.google")}
          </Text>
        </TouchableOpacity>

        {/* APPLE */}
        {Platform.OS === "ios" && (
          <TouchableOpacity
            style={styles.oauthButton}
            onPress={() => signInWithOAuth("apple")}
          >
            <Ionicons name="logo-apple" size={20} color="#111" />
            <Text style={styles.oauthText}>
              {t("auth.continue.apple")}
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFF" },
  backBtn: { paddingHorizontal: 18, paddingTop: 14 },

  container: { flex: 1, paddingHorizontal: 22, paddingTop: 10 },

  title: { fontSize: 30, fontWeight: "800", color: "#111" },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 28,
    marginTop: 4,
  },

  /* EMAIL */
  inputWrapper: { marginBottom: 22 },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },

  inputEmailRow: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: "#E5E7EB",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  inputEmail: { flex: 1, fontSize: 16 },

  suggestionBox: {
    marginTop: 6,
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  suggestionText: {
    color: "#1F2937",
    fontSize: 14,
  },

  /* PASSWORD */
  passwordRow: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  passwordInput: { flex: 1, fontSize: 16 },

  error: { color: "#DC2626", fontSize: 14, marginBottom: 12 },

  primaryButton: {
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 6,
  },
  primaryButtonText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "700",
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 26,
    marginBottom: 18,
  },
  divider: { flex: 1, height: 1, backgroundColor: "#E5E7EB" },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 13,
    color: "#6B7280",
  },

  oauthButton: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 12,
  },
  oauthText: {
    fontSize: 15,
    color: "#111",
    fontWeight: "600",
  },
});
