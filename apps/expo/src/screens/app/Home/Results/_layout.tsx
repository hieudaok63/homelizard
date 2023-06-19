import React, { type PropsWithChildren } from "react";
import { View } from "react-native";

import GradientPatternBackground from "~/components/ui/GradientPatternBackground";

export const LayoutResults = ({ children }: PropsWithChildren) => {
  // main return
  return (
    <View className="overflow-hidden rounded-tr-[50px]">
      <GradientPatternBackground variant="blue">
        {children}
      </GradientPatternBackground>
    </View>
  );
};
