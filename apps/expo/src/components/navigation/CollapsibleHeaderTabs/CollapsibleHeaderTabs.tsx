import { type ComponentProps } from "react";
import { TouchableOpacity, View } from "react-native";
import { Tabs, type TabBarProps } from "react-native-collapsible-tab-view";
import { type TabItemProps } from "react-native-collapsible-tab-view/lib/typescript/src/types";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type CollapsibleHeaderTabsProps = Omit<
  ComponentProps<typeof Tabs.Container>,
  "renderTabBar"
>;

export const CollapsibleHeaderTabs = (props: CollapsibleHeaderTabsProps) => {
  return (
    <Tabs.Container
      lazy
      renderTabBar={TabBar}
      tabBarHeight={TABBAR_HEIGHT}
      {...props}
    />
  );
};

export const TABBAR_HEIGHT = 88;

const TabBar = (props: TabBarProps<string>) => {
  const { top } = useSafeAreaInsets();
  const numRoutes = props.tabNames.length;

  const indicatorStyle = useAnimatedStyle(() => {
    const width = (1 / numRoutes) * 100;
    return {
      width: `${width}%`,
      left: `${interpolate(
        props.indexDecimal.value,
        props.tabNames.map((_, i) => i), // [0, 1, 2]
        props.tabNames.map((_, i) => i * width), // [0, 50, 100]
      )}%`,
    };
  });

  return (
    <View
      className="mx-8 mb-2 h-14 rounded-full bg-black"
      style={{ marginTop: top }}
    >
      <View className="h-full w-full justify-center p-1">
        <Animated.View
          style={indicatorStyle}
          className="h-full rounded-full bg-white"
        />
      </View>
      <View className="absolute flex h-full w-full flex-row items-center justify-between rounded-full p-1">
        {props.tabNames.map((name, index) => {
          return (
            <TouchableOpacity
              key={name}
              className="flex h-full flex-1 items-center justify-center"
              onPress={() => {
                props.onTabPress(name);
              }}
            >
              <Label
                name={name}
                label={props.tabProps.get(name)?.label ?? name}
                indexDecimal={props.indexDecimal}
                index={index}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const Label = (tabItemProps: TabItemProps<string>) => {
  const label = tabItemProps.label;
  const textColor = useAnimatedTabLabelColor(
    tabItemProps.index,
    tabItemProps.indexDecimal,
  );
  if (typeof label === "string") {
    return (
      <Animated.Text style={textColor} className="text-center">
        {label}
      </Animated.Text>
    );
  }
  return <>{label(tabItemProps)}</>;
};

export const useAnimatedTabLabelColor = (
  index: number,
  indexDecimal: Animated.SharedValue<number>,
) => {
  return useAnimatedStyle(() => ({
    color: Math.abs(indexDecimal.value - index) < 0.5 ? "#000000" : "#ffffff",
  }));
};