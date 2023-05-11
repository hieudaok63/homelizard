import React, { useEffect, useState, type ComponentProps } from "react";
import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Circle, Defs, Mask, Rect, Svg, type SvgProps } from "react-native-svg";
import HomeIcon from "@assets/icons/HomeIcon.svg";
import MenuIcon from "@assets/icons/MenuIcon.svg";
import PeopleIcon from "@assets/icons/PeopleIcon.svg";
import PersonIcon from "@assets/icons/PersonIcon.svg";
import PlusIcon from "@assets/icons/PlusIcon.svg";
import { type BottomTabBarProps } from "@react-navigation/bottom-tabs";

const AnimatedView = Animated.createAnimatedComponent(View);

const PADDING_HEIGHT = 29;

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 8,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

const linkData = [
  { name: "Home" },
  { name: "Home1" },
  { name: "Home2" },
  { name: "Home3" },
  { name: "Home4" },
  { name: "Home5" },
  { name: "Profile" }
]

const TabBar = ({
  descriptors,
  insets,
  navigation,
  state,
}: BottomTabBarProps) => {
  const maxHeight = useSharedValue(0);
  const [open, setOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    maxHeight.value = withSpring(open ? contentHeight + PADDING_HEIGHT : 0, { overshootClamping: true, damping: 15 });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, contentHeight]);

  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      height: maxHeight.value,
      // one pixel is added to the height to prevent a small gap from appearing on android
      marginBottom: maxHeight.value === 0 ? 0 : -1,
    };
  });

  return (
    <View className="flex items-center">
      <View className="absolute bottom-6 flex w-[328px]">
        <TopBackground />
        <AnimatedView 
          style={animatedContentStyle}
          className="overflow-hidden flex flex-between bg-dark">
            
            <View
              // basis-[1px] is used to allow RN to calculate the height of the view
              className="bg-dark flex-grow basis-[1px]"
              >
            <View
              className=""
              onLayout={(e) => {
                setContentHeight(e.nativeEvent.layout.height)
              }}
              >
              {linkData.map((item) => (
                <TouchableOpacity
                  key={item.name}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("Home")}
                >
                  <View className="flex flex-row p-2">
                    <Text className="text-white">{item.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              </View>
              </View>
          <View 
            style={{
              height: PADDING_HEIGHT,
            }}
            className="bg-dark flex-none" />
        </AnimatedView>
        <BottomBackground />

        <ActionBar
          onMenuPress={() => {
            setOpen(!open);
          }}
          navigation={navigation}
        />
      </View>
    </View>
  );
};

export default TabBar;

const CenterButton = (props: ComponentProps<typeof TouchableOpacity>) => {
  return (
    <View
      style={shadowStyle}
      className="absolute -top-7 flex w-full items-center"
    >
      <TouchableOpacity {...props}>
        <View className="bg-dark rounded-full p-4">
          <PlusIcon />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const TopBackground = () => (
  <Svg className="h-8">
    <Defs>
      <Mask id="mask">
        <Rect width="100%" height="100%" fill="white" />
        <Circle r="32" cx="50%" cy="0" fill="black" />
      </Mask>
    </Defs>
    <Rect fill="#262636" width="100%" height="200%" rx="32" mask="url(#mask)" />
  </Svg>
);

const BottomBackground = () => (
  <Svg className="h-8" style={shadowStyle}>
  {/* <Svg className="h-8"> */}
    <Rect fill="#262636" y="-32" width="100%" height="200%" rx="32" />
  </Svg>
);

type ActionBarProps = {
  onMenuPress: () => void;
  navigation: BottomTabBarProps["navigation"];
};

const ActionBar = ({ onMenuPress, navigation }: ActionBarProps) => {
  return (
    <>
      <CenterButton
        onPress={onMenuPress}
      />
      <View className="absolute bottom-0 left-0 right-0 flex flex-row justify-between">
        <View className="flex flex-row px-2 py-1">
          <TabActionButton onPress={() => navigation.navigate("Home")} Icon={HomeIcon} />
          <TabActionButton onPress={() => navigation.navigate("Home")} Icon={PeopleIcon} />
        </View>
        <View className="flex flex-row px-2 py-1">
          <TabActionButton onPress={() => navigation.navigate("Profile")} Icon={PersonIcon} />
          <TabActionButton onPress={onMenuPress} Icon={MenuIcon} />
        </View>
      </View>
    </>
  );
};

type TabActionButtonProps = {
  onPress: () => void;
  Icon: React.FC<SvgProps>;
  label?: string;
};

const TabActionButton = ({ onPress, Icon }: TabActionButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View className="p-4 bg-dark rounded-full">
        <Icon/>
      </View>
    </TouchableOpacity>
  )
}
