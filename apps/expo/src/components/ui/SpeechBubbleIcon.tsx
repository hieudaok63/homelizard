import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import {
  colorGradients,
  type ColorGradientVariant,
} from "~/utils/colorGradients";
import { generateBoxShadowStyle } from "~/utils/helpers";

interface SpeechBubbleIcon {
  children?: React.ReactNode;
  color: ColorGradientVariant;
}

export const styleBoxShadowBlockIcon = generateBoxShadowStyle("shadowBtn");

export const SpeechBubbleIcon = ({ color, children }: SpeechBubbleIcon) => {
  const { maskGradient } = colorGradients[color];

  return (
    <View
      style={styleBoxShadowBlockIcon}
      className="rounded-l-full rounded-tr-full bg-white p-[7px]"
    >
      <LinearGradient
        colors={maskGradient}
        className="h-[34px] w-[34px] items-center justify-center overflow-hidden rounded-l-full rounded-tr-full"
      >
        {children}
      </LinearGradient>
    </View>
  );
};
