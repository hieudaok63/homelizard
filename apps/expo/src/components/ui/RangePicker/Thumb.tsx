import React from "react";
import { View } from "react-native";

import { generateBoxShadowStyle } from "~/utils/helpers";

const shadowStyle = generateBoxShadowStyle({
  xOffset: 0,
  yOffset: 0,
  shadowColorIos: "#000000",
  shadowOpacity: 0.5,
  shadowRadius: 3,
  elevation: 10,
  shadowColorAndroid: "#000000",
});

const Thumb = ({ name }: { name: "high" | "low" }) => {
  return (
    <View
      className="h-4 w-4 rounded-full bg-white"
      style={{
        ...shadowStyle,
      }}
    />
  );
};

export default Thumb;
