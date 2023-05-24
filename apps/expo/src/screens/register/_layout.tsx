import React, { type PropsWithChildren } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ImmowerkSvg from "@assets/immowerk.svg";

import GradientPatternBackground from "~/components/ui/GradientPatternBackground";

export const RegisterLayout = ({ children }: PropsWithChildren) => {
  // main return
  return (
    <GradientPatternBackground variant="blue">
      <SafeAreaView>
        <View className="w-full flex-row-reverse pl-8">
          <ImmowerkSvg />
        </View>
        {children}
      </SafeAreaView>
    </GradientPatternBackground>
  );
};
