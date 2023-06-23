import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { cn } from "@homelizard/tailwind-config/utils";

export const StepProgress = ({ progress }: { progress: string | number }) => {
  const progressBarWidth = `${progress}%`;

  // main return
  return (
    <View className="relative mx-6">
      <LinearGradient
        colors={["#F5F7F9", "#ECEEEF"]}
        className="h-3 rounded-t-full"
      />
      <LinearGradient
        colors={["#37E1EC", "#11BBB0"]}
        className={cn(
          "absolute h-3  rounded-tl-full",
          progress === 100 && "rounded-t-full",
        )}
        style={{ width: progressBarWidth }}
      />
    </View>
  );
};
