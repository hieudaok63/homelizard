import React, { type PropsWithChildren } from "react";
import { SafeAreaView, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AppHeader } from "~/components/AppHeader";
import GradientPatternBackground from "~/components/ui/GradientPatternBackground";

export const LayoutSearchHistory = ({ children }: PropsWithChildren) => {
  return (
    <GestureHandlerRootView>
      <GradientPatternBackground variant="yellow">
        <SafeAreaView className="h-full ">
          <View className="px-8 pb-[33px]">
            <AppHeader title="Suchen" />
            {children}
          </View>
        </SafeAreaView>
      </GradientPatternBackground>
    </GestureHandlerRootView>
  );
};
