// src/home/components/DeckFavourite.tsx
import React from "react";
import { View, Image, Text } from "react-native";

type Props = {
  favourite: {
    local?: any;
    remote?: string | null;
    name: string | null;
  };
};

export function DeckFavourite({ favourite }: Props) {
  const hasLocal = !!favourite.local;
  const hasRemote = !!favourite.remote;

  if (!hasLocal && !hasRemote) {
    return (
      <View className="items-center opacity-60">
        <View className="w-14 h-14 rounded-xl bg-zinc-800 items-center justify-center" />
        <View className="w-full h-[1px] bg-white/10 mt-1" />
      </View>
    );
  }

  return (
    <View className="items-center">
      {hasLocal ? (
        <Image
          source={favourite.local}
          className="w-16 h-16"
          resizeMode="contain"
        />
      ) : (
        <Image
          source={{ uri: favourite.remote! }}
          className="w-16 h-16"
          resizeMode="contain"
        />
      )}

      <View className="w-full h-[1px] bg-white/25 mt-1" />
      {favourite.name && (
        <Text className="text-[11px] text-zinc-400 mt-1" numberOfLines={1}>
          {favourite.name}
        </Text>
      )}
    </View>
  );
}
