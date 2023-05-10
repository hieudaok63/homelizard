import React, { type PropsWithChildren } from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

import PatternMask from "./PatternMask";

const variants = {
  yellow: {
    backgroundGradient: ["#FADA25", "#F4B512"],
    maskGradient: ["#F7CF20", "#F4BE17"],
  },
  blue: {
    backgroundGradient: ["#4AB0F7", "#317FEC"],
    maskGradient: ["#43A3F4", "#3483EB"],
  },
};

type GradientPatternBackgroundProps = {
  variant?: keyof typeof variants;
};

const GradientPatternBackground: React.FC<
  PropsWithChildren<GradientPatternBackgroundProps>
> = ({ children, variant = "yellow" }) => {
  const { backgroundGradient, maskGradient } = variants[variant];
  return (
    <>
      <LinearGradient
        colors={backgroundGradient}
        className="absolute h-full w-full"
      >
        <MaskedView
          className="h-full w-full"
          androidRenderingMode="software"
          maskElement={<PatternMask />}
        >
          <LinearGradient colors={maskGradient} className="h-full w-full" />
        </MaskedView>
      </LinearGradient>
      {children}
    </>
  );
};

export default GradientPatternBackground;
