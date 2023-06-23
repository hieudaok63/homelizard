import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  SceneMap,
  TabView,
  type NavigationState,
  type Route,
  type SceneRendererProps,
} from "react-native-tab-view";
import MaskedView from "@react-native-masked-view/masked-view";

import { DashboardTab } from "./DashBoard/DashboardTab";
import { ResultsTab } from "./Results/ResultsTab";

export const tabs: Route[] = [
  { key: "dashboard", title: "Dashboard" },
  { key: "results", title: "Results" },
];

const renderScene = SceneMap({
  dashboard: DashboardTab,
  results: ResultsTab,
});

export const TabBar = (
  props: SceneRendererProps & {
    navigationState: NavigationState<(typeof tabs)[number]>;
  },
) => {
  const numRoutes = props.navigationState.routes.length;

  const maskLeft = useSharedValue(
    `${(props.navigationState.index / numRoutes) * 100}%`,
  );

  const animatedMaskStyles = useAnimatedStyle(() => {
    return {
      width: `${(1 / numRoutes) * 100}%`,
      left: withSpring(maskLeft.value, { overshootClamping: true }),
    };
  });

  return (
    <View className="mx-8 mb-4 h-14">
      <View className="flex h-full w-full flex-row items-center justify-between rounded-full bg-black p-1">
        {props.navigationState.routes.map((route, index) => (
          <TouchableOpacity
            key={route.key}
            className="flex h-full flex-1 items-center justify-center"
            onPress={() => {
              props.jumpTo(route.key);
              maskLeft.value = `${(index / numRoutes) * 100}%`;
            }}
          >
            <Text className="text-white">{route.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        className="absolute h-full w-full p-1"
        pointerEvents="none" // This is important to make sure the absolutely positioned MaskedView doesn't capture touches
      >
        <MaskedView
          androidRenderingMode="software"
          maskElement={
            <Animated.View
              style={animatedMaskStyles}
              className="absolute h-full rounded-full bg-black"
            />
          }
        >
          <View className="flex h-full w-full flex-row items-center justify-between bg-white">
            {props.navigationState.routes.map((route) => (
              <Text key={route.key} className="flex-1 text-center text-black">
                {route.title}
              </Text>
            ))}
          </View>
        </MaskedView>
      </View>
    </View>
  );
};

export const ContentHome = () => {
  const [index, setIndex] = useState(0);

  return (
    <TabView
      navigationState={{ index, routes: tabs }}
      renderScene={renderScene}
      renderTabBar={TabBar}
      onIndexChange={setIndex}
      swipeEnabled={false}
      lazy
    />
  );
};
