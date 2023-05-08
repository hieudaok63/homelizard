import React, { type FC } from "react";
import { Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
};

export const Button: FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      className="bg-brand mb-2 flex items-center rounded-xl px-4 py-3"
      onPress={onPress}
    >
      <Text className="text-base text-white">{title}</Text>
    </TouchableOpacity>
  );
};
