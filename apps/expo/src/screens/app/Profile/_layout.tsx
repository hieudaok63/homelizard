import React, { type PropsWithChildren } from "react";
import { ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const ProfileLayout = ({ children }: PropsWithChildren) => {
  // main return
  return (
    <GestureHandlerRootView>
      <ScrollView showsVerticalScrollIndicator={false} className="h-full ">
        {children}
      </ScrollView>
    </GestureHandlerRootView>
  );
};
