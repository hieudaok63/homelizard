import React, { PropsWithChildren, useRef } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { cn } from "@homelizard/tailwind-config/utils";

import { IconBack } from "@assets/icons";

import { useAppNavigation } from "../navigation/useAppNavigation";

interface HeaderScrollProps {
  title?: string;
}
export const HeaderScroll = ({ children, title }: PropsWithChildren<HeaderScrollProps>) => {
  const { top } = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useAppNavigation();
  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 100], // Change this value to adjust when the animation should start
    outputRange: ["transparent", "#262332"], // Change this value to set the header background colors during the animation
    extrapolate: "clamp",
  });
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }, // This is required for Android compatibility
  );
  return (
    <>
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        className="flex-1"
        onScroll={handleScroll}
        scrollEventThrottle={16} // Adjust this value for smoother animation
      >
        {children}
      </ScrollView>
      <Animated.View
        className="absolute left-0 right-0 flex-row px-4 pb-2"
        style={[
          {
            paddingTop: top,
            backgroundColor: headerBackgroundColor,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className={cn(title && "absolute pl-4")}
          style={{ paddingTop: title && top }}
        >
          <IconBack />
        </TouchableOpacity>
        {title && (
          <Text className="flex-1 pl-4 text-center font-nunito-800 text-lg">
            {title}
          </Text>
        )}
      </Animated.View>
    </>
  );
};
