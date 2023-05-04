import React, { type PropsWithChildren } from "react";
import { ImageBackground, View, type ImageSourcePropType } from "react-native";
import { useAssets } from "expo-asset";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

const variants = {
  yellow: {
    backgroundGradient: ["#FADA25", "#F4B512"],
    maskGradient: ["#F7CF20", "#F4BE17"],
  },
  blue: {
    backgroundGradient: ["#4AB0F7", "#317FEC"],
    maskGradient: ["#43A3F4", "#3483EB"],
  }
}

type GradientPatternBackgroundProps = {
  variant?: keyof typeof variants;
}

const GradientPatternBackground: React.FC<PropsWithChildren<GradientPatternBackgroundProps>> = ({
  children,
  variant = "yellow",
}) => {
  const { backgroundGradient, maskGradient } = variants[variant]
  const [assets] = useAssets([require("../../../assets/bg-pattern.png")]);
  if (!assets) return null;
  return (
    <>
      <LinearGradient
        colors={backgroundGradient}
        className="absolute h-full w-full"
      >
        <MaskedView
          className="h-full w-full"
          maskElement={
            <ImageBackground
              resizeMode="repeat"
              className="h-full w-full"
              source={assets[0] as ImageSourcePropType}
            />
          }
        >
          <LinearGradient
            colors={maskGradient}
            className="h-full w-full"
          ></LinearGradient>
        </MaskedView>
      </LinearGradient>
        {children}
      {/* <View className="mt-20 h-full w-full">
      </View> */}
    </>
  );
};

export default GradientPatternBackground;
