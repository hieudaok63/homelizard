import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import {
  colorGradients,
  type ColorGradientVariant,
} from "~/utils/colorGradients";

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

export type Percentage = Range<0, 101>;

export const StepProgress = ({
  progress,
  variant = "blue",
}: {
  progress: Percentage;
  variant?: ColorGradientVariant;
}) => {
  const { maskGradient } = colorGradients[variant];
  // main return
  return (
    <View className="relative">
      {/* <LinearGradient
        colors={["#F5F7F9", "#ECEEEF"]}
        className="h-[6px] rounded-t-full"
      /> */}
      <View className="h-[6px] rounded-t-full bg-slate-200" />

      <View className="absolute bottom-0 w-full overflow-hidden rounded-t-full">
        <LinearGradient
          colors={maskGradient}
          className="h-2 rounded-sm"
          style={{ width: `${progress}%` }}
        />
      </View>
    </View>
  );
};
