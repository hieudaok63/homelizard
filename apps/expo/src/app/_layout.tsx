import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import GradientPatternBackground from "~/components/ui/GradientPatternBackground";

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  return (
    <>
      <GradientPatternBackground variant="yellow">
        <Stack
          screenOptions={{
            headerTransparent: true,
            contentStyle: {
              backgroundColor: "transparent",
            },
          }}
        />
        <StatusBar />
      </GradientPatternBackground>
    </>
  );
};

export default RootLayout;
