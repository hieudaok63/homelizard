import React from "react";
import { Text, type StyleProp, type TextStyle } from "react-native";

interface AppTextProps {
  text?: string;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  numberOfLines?: number;
  isPrice?: boolean;
  className?: string;
  large?: boolean;
}

export const AppText = (props: AppTextProps) => {
  const { style, onPress, numberOfLines, className, text, large } = props;

  return (
    <Text
      className={`text-font-14 font-weight_400 text-black ${className} ${
        large && "text-font-28"
      }`}
      style={style}
      onPress={onPress}
      numberOfLines={numberOfLines}
    >
      {text}
    </Text>
  );
};
