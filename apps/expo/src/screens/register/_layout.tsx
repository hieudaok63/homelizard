import React, { type PropsWithChildren } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ImmowerkSvg from "@assets/immowerk.svg";
import { useHeaderHeight } from "@react-navigation/elements";

import GradientPatternBackground from "~/components/ui/GradientPatternBackground";

export const RegisterLayout = ({ children }: PropsWithChildren) => {
  const insets = useSafeAreaInsets();
  const height = useHeaderHeight();
  return (
    <GradientPatternBackground variant="blue">
      <View
        style={{
          paddingTop: height,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
      >
        <View className="w-full flex-row-reverse pl-8">
          <ImmowerkSvg />
        </View>
        {children}
      </View>
    </GradientPatternBackground>
  );
};
