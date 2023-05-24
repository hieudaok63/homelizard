import React, { type FC } from "react";
import {
  Text,
  TouchableOpacity,
  type StyleProp,
  type ViewStyle,
} from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  className?: string;
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({
  title,
  onPress,
  style,
  className,
  disabled,
}) => {
  return (
    <TouchableOpacity
      className={`${
        !disabled ? "bg-brand" : "bg-gray-400"
      } mb-2 flex items-center px-4 py-3 ${className || ""}`}
      onPress={onPress}
      style={[style]}
      disabled={disabled}
    >
      <Text className="text-base text-white">{title}</Text>
    </TouchableOpacity>
  );
};
