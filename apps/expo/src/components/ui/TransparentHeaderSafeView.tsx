import React, { type PropsWithChildren } from "react";
import { Dimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";

export const TransparentHeaderSafeView = ({ children }: PropsWithChildren) => {
  const insets = useSafeAreaInsets();
  const height = useHeaderHeight();
  const heightScreen = Dimensions.get("window").height;

  // main return
  return (
    <View
      style={{
        paddingTop: height,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        height: heightScreen,
      }}
    >
      {children}
    </View>
  );
};
