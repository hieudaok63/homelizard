import { Platform } from "react-native";

import { shaDowStyles } from "./shadow";

export const generateBoxShadowStyle = (variant: keyof typeof shaDowStyles) => {
  const { shaDowStyle } = shaDowStyles[variant];

  if (Platform.OS === "ios") {
    return {
      ...shaDowStyle,
      shadowColor: shaDowStyle.shadowColorIos,
      shadowOffset: { width: shaDowStyle.xOffset, height: shaDowStyle.yOffset },
    };
  } else if (Platform.OS === "android") {
    return {
      ...shaDowStyle,
      elevation: shaDowStyle.elevation,
      shadowColor: shaDowStyle.shadowColorAndroid,
    };
  }
};

// TODO: replace with text-overflow: ellipsis
export const handleLongContent = (content: string, length = 20) => {
  if (content.length > 20) {
    return `${content.substring(0, length)}...`;
  }
  return content;
};
