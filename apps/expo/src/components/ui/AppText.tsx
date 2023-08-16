import React from "react";
import { Text, type StyleProp, type TextStyle } from "react-native";

import { cn } from "@homelizard/tailwind-config/utils";

interface AppTextProps {
  text: string;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  numberOfLines?: number;
  isPrice?: boolean;
  className?: string;
  large?: boolean;
  classText?: string;
}

export const AppText = (props: AppTextProps) => {
  const { style, onPress, classText, numberOfLines, className, text, large } =
    props;
  return (
    <Text
      className={cn(
        "font-nunito text-sm text-black",
        large && "text-4xl",
        className,
        classText,
      )}
      style={style}
      onPress={onPress}
      numberOfLines={numberOfLines}
    >
      {text}
    </Text>
  );
};
