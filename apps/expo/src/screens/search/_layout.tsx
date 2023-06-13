import React, { type PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { TransparentHeaderSafeView } from "~/components/ui";
import GradientPatternBackground from "~/components/ui/GradientPatternBackground";

export const SearchLayout = ({ children }: PropsWithChildren) => {
  // main return
  return (
    <GestureHandlerRootView>
      <GradientPatternBackground variant="white">
        <TransparentHeaderSafeView>{children}</TransparentHeaderSafeView>
      </GradientPatternBackground>
    </GestureHandlerRootView>
  );
};
