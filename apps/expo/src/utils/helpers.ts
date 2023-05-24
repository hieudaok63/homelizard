import { Platform } from "react-native";

export const generateBoxShadowStyle = (param: {
  xOffset: number;
  yOffset: number;
  shadowColorIos: string;
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
  shadowColorAndroid: string;
}) => {
  const {
    xOffset,
    yOffset,
    shadowColorAndroid,
    shadowColorIos,
    shadowOpacity,
    shadowRadius,
    elevation,
  } = param;
  if (Platform.OS === "ios") {
    return {
      shadowColor: shadowColorIos,
      shadowOffset: { width: xOffset, height: yOffset },
      shadowOpacity,
      shadowRadius,
    };
  } else if (Platform.OS === "android") {
    return {
      elevation,
      shadowColor: shadowColorAndroid,
    };
  }
};
