import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { cn } from "@homelizard/tailwind-config/utils";

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
    <View className={cn("relative mx-6")}>
      <LinearGradient
        colors={["#F5F7F9", "#ECEEEF"]}
        className="h-3 rounded-t-full"
      />

      <LinearGradient
        colors={maskGradient}
        className={cn(
          "absolute h-3  rounded-tl-full",
          progress === 100 && "rounded-t-full",
        )}
        style={{ width: `${progress}%` }}
      />
    </View>
  );
};
