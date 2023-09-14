import React, { type PropsWithChildren } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { t } from "i18next";

import { AppHeader } from "~/components/AppHeader";
import GradientPatternBackground from "~/components/ui/GradientPatternBackground";

export const LayoutFinance = ({ children }: PropsWithChildren) => {
  return (
    <GradientPatternBackground variant="yellow">
      <SafeAreaView className="h-full" edges={["top"]}>
        <View className="px-8">
          <AppHeader title={t("profile:finance.title")} />
        </View>
        {children}
      </SafeAreaView>
    </GradientPatternBackground>
  );
};
