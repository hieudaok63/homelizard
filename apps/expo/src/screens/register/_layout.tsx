import React, { type PropsWithChildren } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";

import GradientPatternBackground from "~/components/ui/GradientPatternBackground";

export const RegisterLayout = ({ children }: PropsWithChildren) => {
  const insets = useSafeAreaInsets();
  const height = useHeaderHeight();
  return (
    <GradientPatternBackground variant="white">
      <View
        style={{
          paddingTop: height,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
      >
        {children}
      </View>
    </GradientPatternBackground>
  );
};
