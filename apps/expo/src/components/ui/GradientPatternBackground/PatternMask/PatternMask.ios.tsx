import React from "react";
import { ImageBackground, type ImageSourcePropType } from "react-native";
import { useAssets } from "expo-asset";

const PatternMask = () => {
  const [assets] = useAssets([require("../../../assets/bg-pattern.png")]);
  if (!assets) return null;
  return (
    <ImageBackground
      resizeMode="repeat"
      className="h-full w-full"
      source={assets[0] as ImageSourcePropType}
    />
  );
};

export default PatternMask;
