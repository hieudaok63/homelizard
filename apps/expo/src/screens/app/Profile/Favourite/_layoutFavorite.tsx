import React, { type PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppHeader } from "~/components/AppHeader";
import GradientPatternBackground from "~/components/ui/GradientPatternBackground";

export const LayoutFavorite = ({ children }: PropsWithChildren) => {
  return (
    <GradientPatternBackground variant="yellow">
      <SafeAreaView className="h-full px-8">
        <AppHeader title="Favoriten" />
        {children}
      </SafeAreaView>
    </GradientPatternBackground>
  );
};
