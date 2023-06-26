import React, { type PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const ProfileLayout = ({ children }: PropsWithChildren) => {
  return <GestureHandlerRootView>{children}</GestureHandlerRootView>;
};
