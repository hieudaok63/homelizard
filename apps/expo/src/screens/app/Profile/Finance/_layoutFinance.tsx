import React, { type PropsWithChildren } from "react";
import { SafeAreaView, View } from "react-native";

import { AppHeader } from "~/components/AppHeader";
import GradientPatternBackground from "~/components/ui/GradientPatternBackground";

export const LayoutFinance = ({ children }: PropsWithChildren) => {
  return (
    <GradientPatternBackground variant="yellow">
      <SafeAreaView className="h-full ">
        <View className=" pb-[33px]">
          <View className="px-8 ">
            <AppHeader title="Persönliche Daten" />
          </View>
          {children}
        </View>
      </SafeAreaView>
    </GradientPatternBackground>
  );
};
