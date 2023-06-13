import React, { type PropsWithChildren } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";

export const TransparentHeaderSafeView = ({ children }: PropsWithChildren) => {
  const insets = useSafeAreaInsets();
  const height = useHeaderHeight();

  // main return
  return (
    <View
      style={{
        paddingTop: height,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {children}
    </View>
  );
};
