import React, { useEffect, useState, type ComponentProps } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Circle, Defs, Mask, Rect, Svg } from "react-native-svg";
import HomeIcon from "@assets/icons/HomeIcon.svg";
import MenuIcon from "@assets/icons/MenuIcon.svg";
import PeopleIcon from "@assets/icons/PeopleIcon.svg";
import PersonIcon from "@assets/icons/PersonIcon.svg";
import PlusIcon from "@assets/icons/PlusIcon.svg";
import { type BottomTabBarProps } from "@react-navigation/bottom-tabs";

const AnimatedView = Animated.createAnimatedComponent(View);

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

const TabBar = ({
  descriptors,
  insets,
  navigation,
  state,
}: BottomTabBarProps) => {
  const maxHeight = useSharedValue(0);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    maxHeight.value = withTiming(open ? 200 : 0, { duration: 300 });
  }, [open]);

  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      maxHeight: maxHeight.value - 32,
    };
  });

  const animatedPaddingStyle = useAnimatedStyle(() => {
    return {
      height: maxHeight.value > 32 ? 32 : maxHeight.value,
    };
  });

  return (
    <View className="flex items-center">
      <View className="absolute bottom-6 flex w-[328px] justify-between">
        <TopBackground />
        <AnimatedView
          style={animatedContentStyle}
          className="bg-dark overflow-hidden"
        >
          <View className="flex">
            <FlatList
              onLayout={(e) => {
                console.log(e.nativeEvent.layout);
              }}
              data={[{ name: "Home" }, { name: "Profile" }]}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item.name}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("Home")}
                >
                  <View className="flex flex-row p-2">
                    <Text className="text-white">{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </AnimatedView>
        <AnimatedView style={animatedPaddingStyle} className="bg-dark" />
        <BottomBackground />

        <ActionBar
          onMenuPress={() => {
            setOpen(!open);
          }}
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
    <Rect fill="#262636" y="-32" width="100%" height="200%" rx="32" />
  </Svg>
);

type ActionBarProps = {
  onMenuPress: () => void;
};

const ActionBar = ({ onMenuPress }: ActionBarProps) => {
  return (
    <>
      <CenterButton
        onPress={onMenuPress}
      />
      <View className="absolute bottom-0 left-0 right-0 flex flex-row justify-between">
        <View className="flex flex-row px-2 py-1">
          <View className="p-4">
            <HomeIcon />
          </View>
          <View className="p-4">
            <PeopleIcon />
          </View>
        </View>
        <View className="flex flex-row px-2 py-1">
          <View className="p-4">
            <PersonIcon />
          </View>
          <TouchableWithoutFeedback onPress={onMenuPress}>
            <View className="p-4">
              <MenuIcon />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </>
  );
};
