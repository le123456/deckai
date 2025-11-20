// app/onboarding/ProgressBar.tsx
import React from 'react';
import { View } from 'react-native';
import { onboardingStyles as base } from './styles';

type Props = {
  step: number; // começa em 1
  total: number;
};

export function ProgressBar({ step, total }: Props) {
  return (
    <View style={base.progressBarWrapper}>
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index + 1 <= step;

        return (
          <View
            key={index}
            style={[
              base.progressSegment,
              isActive && base.progressSegmentActive,
              // tirar marginRight do último pra não sobrar espaço
              index === total - 1 && { marginRight: 0 },
            ]}
          />
        );
      })}
    </View>
  );
}
