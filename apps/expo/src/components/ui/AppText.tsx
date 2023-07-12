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
}

export const AppText = (props: AppTextProps) => {
  const { style, onPress, numberOfLines, className, text, large } = props;

  return (
    <Text
      className={cn(
        "font-nunito text-sm text-black",
        className,
        large && "text-4xl",
      )}
      style={style}
      onPress={onPress}
      numberOfLines={numberOfLines}
    >
      {text}
    </Text>
  );
};
