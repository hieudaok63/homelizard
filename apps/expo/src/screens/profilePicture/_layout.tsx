import React, { type PropsWithChildren } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";

import GradientPatternBackground from "~/components/ui/GradientPatternBackground";

export const ProfilePictureLayout = ({ children }: PropsWithChildren) => {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  // main return
  return (
    <GradientPatternBackground variant="yellow">
      <View
        style={{
          marginTop: headerHeight || insets?.bottom,
        }}
      >
        {children}
      </View>
    </GradientPatternBackground>
  );
};
