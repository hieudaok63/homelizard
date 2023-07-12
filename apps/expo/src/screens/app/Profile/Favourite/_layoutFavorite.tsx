import React, { type PropsWithChildren } from "react";
import { SafeAreaView, View } from "react-native";

import { AppHeader } from "~/components/AppHeader";
import GradientPatternBackground from "~/components/ui/GradientPatternBackground";

export const LayoutFavorite = ({ children }: PropsWithChildren) => {
  return (
    <GradientPatternBackground variant="yellow">
      <SafeAreaView className="h-full">
        <View className="px-8">
          <AppHeader title="Favoriten" />
          {children}
        </View>
      </SafeAreaView>
    </GradientPatternBackground>
  );
};
