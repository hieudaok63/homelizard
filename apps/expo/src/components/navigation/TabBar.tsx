import React, { useEffect, useState, type ComponentProps } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
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
import CloseIcon from "@assets/icons/CloseIcon.svg";
import { type BottomTabBarProps } from "@react-navigation/bottom-tabs";
import clsx from "clsx";

const PADDING_HEIGHT = 28;

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 6,
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
  { name: "Profile" },
];

const TabBar = ({
  descriptors,
  insets,
  navigation,
  state,
}: BottomTabBarProps) => {
  const maxHeight = useSharedValue(0);
  const [open, setOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    maxHeight.value = withSpring(open ? contentHeight + PADDING_HEIGHT : 0, {
      overshootClamping: true,
      damping: 15,
    });
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
        <Animated.View
          style={animatedContentStyle}
          className="flex-between bg-dark flex overflow-hidden"
        >
          <View
            // basis-[1px] is used to allow RN to calculate the height of the view
            className="bg-dark flex-grow basis-[1px]"
          >
            <View
              className=""
              onLayout={(e) => {
                setContentHeight(e.nativeEvent.layout.height);
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
            className="bg-dark flex-none"
          />
        </Animated.View>
        <BottomBackground />

        <ActionBar
          onMenuPress={() => {
            setOpen(!open);
          }}
          menuOpen={open}
          navigation={navigation}
          state={state}
          showLabels={open}
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
  navigation: BottomTabBarProps["navigation"];
  state: BottomTabBarProps["state"];
  menuOpen: boolean;
  showLabels?: boolean;
};

const ActionBar = ({ onMenuPress, navigation, state, showLabels, menuOpen }: ActionBarProps) => {
  return (
    <>
      <CenterButton onPress={onMenuPress} />
      <View className="absolute bottom-0 left-0 right-0 flex h-16 flex-row justify-between">
        <View className="flex flex-row items-center px-2 py-1">
          <TabActionButton
            Icon={HomeIcon}
            label="Home"
            showLabel={showLabels}
            onPress={() => navigation.navigate("Home")}
            active={state.index === 0}
          />
          <TabActionButton
            Icon={PeopleIcon}
            label="Accounts"
            showLabel={showLabels}
            onPress={() => navigation.navigate("LinkAccounts")}
          />
        </View>
        <View className="flex flex-row items-center px-2 py-1">
          <TabActionButton
            onPress={() => navigation.navigate("Profile")}
            label="Profile"
            showLabel={showLabels}
            Icon={PersonIcon}
            active={state.index === 1}
          />
          <TabActionButton
            label={"Close"}
            showLabel={showLabels}
            onPress={onMenuPress}
            Icon={menuOpen ? CloseIcon : MenuIcon}
          />
        </View>
      </View>
    </>
  );
};

type TabActionButtonProps = {
  onPress: () => void;
  Icon: React.FC<SvgProps>;
  label?: string;
  showLabel?: boolean;
  active?: boolean;
};

const TabActionButton = ({
  onPress,
  Icon,
  label,
  showLabel,
  active,
}: TabActionButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="bg-dark flex h-14 w-14 flex-col items-center justify-center rounded-full">
        <Animated.View layout={Layout}>
          <Icon className={clsx("fill-white", active && "fill-blue-400")} />
        </Animated.View>
        {showLabel && (
          <Animated.Text
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(200)}
            layout={Layout}
            className={clsx("text-xs text-white", active && "text-blue-400")}
          >
            {label}
          </Animated.Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
