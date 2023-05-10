import React, { useRef, useState, type ComponentProps } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, {
  Transition,
  Transitioning,
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Circle, Defs, Mask, Rect, Svg } from "react-native-svg";
import HomeIcon from "@assets/icons/HomeIcon.svg";
import MenuIcon from "@assets/icons/MenuIcon.svg";
import PeopleIcon from "@assets/icons/PeopleIcon.svg";
import PersonIcon from "@assets/icons/PersonIcon.svg";
import PlusIcon from "@assets/icons/PlusIcon.svg";
import { type BottomTabBarProps } from "@react-navigation/bottom-tabs";

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedView = Animated.createAnimatedComponent(View);

const TabBar = ({
  descriptors,
  insets,
  navigation,
  state,
}: BottomTabBarProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // console.log({descriptors,insets,navigation,state});

  const animatedProps = useAnimatedProps(() => {
    return {
      height: withTiming(open ? 200 : 64, { duration: 300 }),
    };
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(open ? 200 : 64, { duration: 300 }),
    };
  });

  return (
    <View className="flex items-center">
      <Transitioning.View
        ref={ref}
        transition={transition}
        // className="bg-dark absolute bottom-6 flex w-[327px] justify-between rounded-[32px]"
        className="absolute bottom-6 flex w-[328px] justify-between"
      >
        {/* <AnimatedView
        style={animatedStyle}
        className="absolute bottom-6 flex w-[328px] justify-between"
        // className="bg-dark absolute bottom-6 flex w-[327px] justify-between rounded-[32px]"
      > */}
        {/* <Svg
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          className="absolute"
        >
          <Defs>
            <Mask id="mask">
              <AnimatedRect
                animatedProps={animatedProps}
                width="100%"
                fill="white"
              />
              <Circle r="32" cx="50%" cy="0" fill="black" />
            </Mask>
          </Defs>
          <AnimatedRect
            fill="#262636"
            animatedProps={animatedProps}
            width="100%"
            rx="32"
            mask="url(#mask)"
          />
        </Svg> */}

        <Svg
          style={{
            height: 32,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Defs>
            <Mask id="mask">
              <Rect width="100%" height="100%" fill="white" />
              <Circle r="32" cx="50%" cy="0" fill="black" />
            </Mask>
          </Defs>
          <Rect
            fill="#262636"
            width="100%"
            height="200%"
            rx="32"
            mask="url(#mask)"
          />
        </Svg>
        <CenterButton
          onPress={() => {
            ref.current.animateNextTransition();
            setOpen(!open);
          }}
        />
        <View className="bg-dark">
        {open && (
          <View className="flex overflow-hidden pb-8">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Home")}
              >
                <View className="flex flex-row p-2">
                  <Text className="text-white">Home</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Profile")}
              >
                <View className="flex flex-row p-2">
                  <Text className="text-white">Profile</Text>
                </View>
              </TouchableOpacity>
          </View>
        )}
          </View>
        <Svg
          style={{
            height: 32,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Rect fill="#262636" y="-32" width="100%" height="200%" rx="32" />
        </Svg>

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
            <TouchableWithoutFeedback
              onPress={() => {
                ref.current.animateNextTransition();
                setOpen(!open);
                // animatedHeight.value = animatedHeight.value === 64 ? 200 : 64;
              }}
            >
              <View className="p-4">
                <MenuIcon />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Transitioning.View>
    </View>
  );
};

export default TabBar;

const CenterButton = (props: ComponentProps<typeof TouchableOpacity>) => {
  return (
    <View
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
     className="absolute -top-7 flex w-full items-center">
      <TouchableOpacity {...props}>
        <View className="bg-dark rounded-full p-4">
          <PlusIcon />
        </View>
      </TouchableOpacity>
    </View>
  );
};
