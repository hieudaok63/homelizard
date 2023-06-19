import React, { type PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView edges={["top"]} className="bg-bg_home h-full">
        {children}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
