import React, { type FC } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

type ButtonProps = {
  title: string;
  onPress: string | (() => void);
};

export const Button: FC<ButtonProps> = ({ title, onPress }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="bg-brand mb-2 flex items-center rounded-xl px-4 py-3"
      onPress={() => {
        if (typeof onPress === "string") {
          router.push(onPress);
        } else {
          onPress();
        }
      }}
    >
      <Text className="text-base text-white">{title}</Text>
    </TouchableOpacity>
  );
};
