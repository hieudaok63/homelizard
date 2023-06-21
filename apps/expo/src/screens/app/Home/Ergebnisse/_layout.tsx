import React, { type PropsWithChildren } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { TransparentHeaderSafeView } from "~/components/ui";
import GradientPatternBackground from "~/components/ui/GradientPatternBackground";

export const LayoutErgebnisse = ({ children }: PropsWithChildren) => {
  // main return
  return (
    <GestureHandlerRootView>
      <View className={`mt-5 h-full overflow-hidden rounded-tr-[50px]`}>
        <GradientPatternBackground variant="blue">
          <TransparentHeaderSafeView>{children}</TransparentHeaderSafeView>
        </GradientPatternBackground>
      </View>
    </GestureHandlerRootView>
  );
};
