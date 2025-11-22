import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useLocale } from "../src/i18n/LocaleProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_CONFIG = {
  index: { key: "tabs.home", icon: "home-outline" },
  decks: { key: "tabs.decks", icon: "grid-outline" },
  coach: { key: "tabs.coach", icon: "disc-outline" },
  profile: { key: "tabs.profile", icon: "person-outline" },
} as const;

export default function BottomTabBar({ state, navigation }: BottomTabBarProps) {
  const { t } = useLocale();
  const insets = useSafeAreaInsets();

  const middle = Math.floor(state.routes.length / 2);
  const left = state.routes.slice(0, middle);
  const right = state.routes.slice(middle);

  const renderTab = (route: any) => {
    const index = state.routes.findIndex((r) => r.key === route.key);
    const isFocused = state.index === index;

    const config =
      TAB_CONFIG[route.name as keyof typeof TAB_CONFIG] ?? {
        key: "",
        icon: "ellipse-outline",
      };

    return (
      <TouchableOpacity
        key={route.key}
        style={styles.tabButton}
        activeOpacity={0.85}
        onPress={() => navigation.navigate(route.name)}
      >
        <Ionicons
          name={config.icon as any}
          size={24}
          color={isFocused ? "#0F172A" : "#9CA3AF"}
        />

        <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
          {t(config.key) ?? route.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.fullWrapper, { paddingBottom: insets.bottom + 4 }]}>
      {/* Barra */}
      <View style={styles.barWrapper}>
        <View style={styles.bar}>
          <View style={styles.sideGroup}>{left.map(renderTab)}</View>
          <View style={{ width: 70 }} />
          <View style={styles.sideGroup}>{right.map(renderTab)}</View>
        </View>
      </View>

      {/* Botão central */}
      <View style={styles.floatingButtonContainer} pointerEvents="box-none">
        <TouchableOpacity activeOpacity={0.85}>
          <View style={styles.centerButtonBg}>
            <View style={styles.centerButton}>
              <Text style={styles.centerPlus}>+</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullWrapper: {
    width: "100%",
    position: "relative",
    backgroundColor: "transparent",
  },

  barWrapper: {
    width: "100%",
    paddingHorizontal: 16,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 25,
    left: 0,
    right: 0,
  },

  bar: {
    height: 70,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    elevation: 8,

    shadowColor: "#000",
    shadowOpacity: 0.10,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },


  sideGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 28,
  },

  tabButton: {
    alignItems: "center",
    justifyContent: "center",
  },

  tabLabel: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 4,
  },

  tabLabelActive: {
    color: "#0F172A",
    fontWeight: "600",
  },

  floatingButtonContainer: {
    position: "absolute",
    width: "100%",
    bottom:45,
    alignItems: "center",
    zIndex: 999,
    pointerEvents: "box-none",
  },

  centerButtonBg: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  centerButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#020617",
    alignItems: "center",
    justifyContent: "center",
  },

  centerPlus: {
    color: "#FFFFFF",
    fontSize: 30,
    marginTop: -3,
  },
});
