import React, { type PropsWithChildren } from "react";
import { useHeaderMeasurements } from "react-native-collapsible-tab-view";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { TABBAR_HEIGHT } from "~/components/navigation/CollapsibleHeaderTabs/CollapsibleHeaderTabs";
import GradientPatternBackground from "~/components/ui/GradientPatternBackground";
import { HOME_SCREEN_HEADER_HEIGHT } from "../HomeScreen";

/**
 * This layout uses two counter animated(scrolling) views to scroll the background up together with the collapsible header
 * The inner counter scrolling view is used to allow the actual child content to scroll at normal speed to match it with the finger movement
 * and avoid it jumping back and forth.
 **/
export const LayoutResults = ({ children }: PropsWithChildren) => {
  const { top, height } = useHeaderMeasurements();
  const style = useAnimatedStyle(() => {
    return {
      top: top.value,
      marginTop: (height.value ?? HOME_SCREEN_HEADER_HEIGHT) + TABBAR_HEIGHT,
    };
  });
  const innerStyle = useAnimatedStyle(() => {
    return {
      top: -top.value,
      marginTop: -(height.value ?? HOME_SCREEN_HEADER_HEIGHT) - TABBAR_HEIGHT,
    };
  });

  return (
    <Animated.View
      style={style}
      className="absolute h-full w-full overflow-hidden rounded-tr-[50px]"
    >
      <GradientPatternBackground variant="blue">
        <Animated.View style={innerStyle} className="absolute h-full w-full">
          {children}
        </Animated.View>
      </GradientPatternBackground>
    </Animated.View>
  );
};
