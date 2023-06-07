import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const StepProgress = ({ width }: { width?: string }) => {
  // main return
  return (
    <View className="relative mx-6">
      <LinearGradient
        colors={["#F5F7F9", "#ECEEEF"]}
        className="h-3 rounded-t-full"
      />
      <LinearGradient
        colors={["#37E1EC", "#11BBB0"]}
        className={`absolute h-3 ${width || "w-full"} rounded-tl-full`}
      />
    </View>
  );
};
