import React, { type PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { t } from "i18next";

import { AppHeader } from "~/components/AppHeader";
import GradientPatternBackground from "~/components/ui/GradientPatternBackground";

export const LayoutSearchHistory = ({ children }: PropsWithChildren) => {
  return (
    <GradientPatternBackground variant="yellow">
      <SafeAreaView className="h-full px-8">
        <AppHeader title={t("profile:search.title")} />
        {children}
      </SafeAreaView>
    </GradientPatternBackground>
  );
};
