import React, { type PropsWithChildren } from "react";
import { View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

import GradientPatternBackground from "~/components/ui/GradientPatternBackground";

export const SearchLayout = ({ children }: PropsWithChildren) => {
  const headerHeight = useHeaderHeight();
  return (
    <GradientPatternBackground variant="blue">
      <View
        style={{
          marginTop: headerHeight,
        }}
      >
        {children}
      </View>
    </GradientPatternBackground>
  );
};
