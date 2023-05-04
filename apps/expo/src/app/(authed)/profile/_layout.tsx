import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import GradientPatternBackground from "~/components/ui/GradientPatternBackground";

const RootLayout = () => {
  return (
    <GradientPatternBackground variant="yellow">
      <Stack
        screenOptions={{
          // headerTransparent: true,
          headerStyle: {
            backgroundColor: "transparent",
          },
          contentStyle: {
            backgroundColor: "transparent",
          },
        }}
      />
      <StatusBar />
    </GradientPatternBackground>
  );
};

export default RootLayout;
