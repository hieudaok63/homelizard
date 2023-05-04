import React from "react";
import { View } from "react-native";
import { Slot } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";

import GradientPatternBackground from "~/components/ui/GradientPatternBackground";

const SearchLayout = () => {
  const headerHeight = useHeaderHeight();
  return (
    <GradientPatternBackground variant="blue">
      {/* <Stack.Screen options={{ title: "Search" }} /> */}
      <View
        style={{
          marginTop: headerHeight,
        }}
      >
        <Slot />
      </View>
    </GradientPatternBackground>
  );
};

export default SearchLayout;
