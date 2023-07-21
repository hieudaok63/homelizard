import React from "react";
import { View } from "react-native";

import { generateBoxShadowStyle } from "~/utils/helpers";

export const shadowStyle = generateBoxShadowStyle("shadowThumb");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
