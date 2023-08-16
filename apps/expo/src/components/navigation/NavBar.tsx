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
import { LinearGradient } from "expo-linear-gradient";
import { type BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { cn } from "@homelizard/tailwind-config/utils";

import ArrowRightIcon from "@assets/icons/ArrowRightIcon.svg";
import CloseIcon from "@assets/icons/CloseIcon.svg";
import HomeIcon from "@assets/icons/HomeIcon.svg";
import LoveIcon from "@assets/icons/LoveIcon.svg";
import MenuIcon from "@assets/icons/MenuIcon.svg";
import NotepadIcon from "@assets/icons/NotepadIcon.svg";
import PeopleIcon from "@assets/icons/PeopleIcon.svg";
import PersonIcon from "@assets/icons/PersonIcon.svg";
import PlusIcon from "@assets/icons/PlusIcon.svg";
import SettingsIcon from "@assets/icons/SettingsIcon.svg";

import { type RootStackParams } from "~/screens/RootStackParams";
import { type TabStackParams } from "~/screens/app/routes";
import { useNavbarStore } from "~/zustand/slices/navbar";
import { SignOutButton } from "../auth/SignOutButton";
import { useAppNavigation } from "./useAppNavigation";

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

type IMenuLinkData = {
  screen?: keyof RootStackParams;
  name: string;
  Icon: React.FC<SvgProps>;
  iconGradient: {
    from: string;
    to: string;
  };
};

const menuLinkData: IMenuLinkData[] = [
  {
    name: "Settings",
    Icon: SettingsIcon,
    iconGradient: {
      from: "#A079EB",
      to: "#6E4AE5",
    },
    screen: "Setting",
  },

  {
    name: "Create new search",
    Icon: NotepadIcon,
    iconGradient: {
      from: "#A079EB",
      to: "#6E4AE5",
    },
    screen: "ObjectType",
  },
  {
    name: "Favorite",
    Icon: LoveIcon,
    iconGradient: {
      from: "#EF8FAF",
      to: "#E75E7B",
    },
    screen: "ListFavoriteSection",
  },
];

const NavBar = ({ navigation, state }: BottomTabBarProps) => {
  // zustand
  const { open, setOpen } = useNavbarStore((slice) => slice);
  // local states
  const maxHeight = useSharedValue(0);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    maxHeight.value = withSpring(open ? contentHeight + PADDING_HEIGHT : 0, {
      overshootClamping: true,
      // damping: 10,
      stiffness: 50,
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
          className="flex-between flex overflow-hidden bg-dark"
        >
          <View
            // basis-[1px] is used to allow RN to calculate the height of the view
            className="flex-grow basis-[1px] bg-dark"
          >
            <View
              onLayout={(e) => {
                setContentHeight(e.nativeEvent.layout.height);
              }}
            >
              {menuLinkData.map((item) => (
                <MenuLink key={item.name} {...item} />
              ))}

              <SignOutButton />
            </View>
          </View>
          <View
            style={{
              height: PADDING_HEIGHT,
            }}
            className="flex-none bg-dark"
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

export default NavBar;

const CenterButton = (props: ComponentProps<typeof TouchableOpacity>) => {
  return (
    <View
      style={shadowStyle}
      className="absolute -top-7 flex w-full items-center"
    >
      <TouchableOpacity {...props}>
        <View className="rounded-full bg-dark p-4">
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
  // <View className="h-8 rounded-bl-full rounded-br-full bg-dark"/>
);

type ActionBarProps = {
  onMenuPress: () => void;
  navigation: BottomTabBarProps["navigation"];
  state: BottomTabBarProps["state"];
  menuOpen: boolean;
  showLabels?: boolean;
};

const ActionBar = ({
  onMenuPress,
  navigation,
  state,
  showLabels,
  menuOpen,
}: ActionBarProps) => {
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
            label="Close"
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
      <View className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-dark">
        <Animated.View>
          <Icon className={cn("fill-white", active && "fill-blue-400")} />
        </Animated.View>
        {showLabel && (
          <Animated.Text
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(200)}
            layout={Layout}
            className={cn("text-xs text-white", active && "text-blue-400")}
          >
            {label}
          </Animated.Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const MenuLink = ({
  name,
  Icon,
  iconGradient,
  screen,
}: (typeof menuLinkData)[0]) => {
  const setOpenMenu = useNavbarStore((slice) => slice.setOpen);
  const navigation = useAppNavigation<keyof TabStackParams>();

  const handleClickItemMenu = () => {
    setOpenMenu(false);
    if (screen) navigation?.navigate(screen);
  };

  return (
    <TouchableOpacity onPress={handleClickItemMenu}>
      <View className="flex flex-row items-center border-b-[1px] border-[#303040] p-4 py-2">
        <LinearGradient
          className="rounded-bl-full rounded-tl-full rounded-tr-full p-2"
          colors={[iconGradient.from, iconGradient.to]}
        >
          <Icon />
        </LinearGradient>
        <Text className="ml-4 flex-grow text-lg text-white">{name}</Text>
        <ArrowRightIcon />
      </View>
    </TouchableOpacity>
  );
};

export const BottomNavBarPadding = () => <View className="h-28" />;
