import React, { type PropsWithChildren } from "react";
import { View } from "react-native";

export const Container = ({ children }: PropsWithChildren) => {
  return (
    <View className="mx-3 mb-5 rounded-full rounded-br-none">{children}</View>
  );
};
