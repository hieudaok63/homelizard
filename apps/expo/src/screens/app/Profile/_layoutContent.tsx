import React, { type PropsWithChildren } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import GradientPatternBackground from "~/components/ui/GradientPatternBackground";

export const LayoutContent = ({ children }: PropsWithChildren) => {
  return (
    <GestureHandlerRootView>
      <View className="mt-5 overflow-hidden rounded-tr-[50x]">
        <GradientPatternBackground variant="yellow">
          {children}
        </GradientPatternBackground>
      </View>
    </GestureHandlerRootView>
  );
};
