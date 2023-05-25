import React, { type PropsWithChildren } from "react";
import { View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

import GradientPatternBackground from "~/components/ui/GradientPatternBackground";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const RegisterLayout = ({ children }: PropsWithChildren) => {
  const insets = useSafeAreaInsets();
  const height = useHeaderHeight();
  return (
    <GradientPatternBackground variant="blue">
      <View style={{
        paddingTop: height,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        
      }}>{children}</View>
    </GradientPatternBackground>
  );
};
