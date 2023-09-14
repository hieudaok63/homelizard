import React, { type PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import GradientPatternBackground from "~/components/ui/GradientPatternBackground";

export const ProfilePictureLayout = ({ children }: PropsWithChildren) => {
  // main return
  return (
    <GradientPatternBackground variant="yellow">
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </GradientPatternBackground>
  );
};
