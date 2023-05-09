import React, { useState } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import HomeIcon from "@assets/icons/HomeIcon.svg";
import MenuIcon from "@assets/icons/MenuIcon.svg";
import PeopleIcon from "@assets/icons/PeopleIcon.svg";
import PersonIcon from "@assets/icons/PersonIcon.svg";
import PlusIcon from "@assets/icons/PlusIcon.svg";
import { type BottomTabBarProps } from "@react-navigation/bottom-tabs";

const TabBar = ({
  descriptors,
  insets,
  navigation,
  state,
}: BottomTabBarProps) => {
  const [open, setOpen] = useState(false);
  // console.log({descriptors,insets,navigation,state});

  return (
    <View className="flex items-center">
      <View
        style={{
          height: open ? 200 : 64,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        className="bg-dark absolute bottom-6 flex w-[327px] justify-between rounded-[32px]"
      >
        <View className="absolute -top-7 flex w-full items-center">
          <TouchableWithoutFeedback
            onPress={() => {
              setOpen(!open);
            }}
          >
            <View className="bg-dark rounded-full p-4">
              <PlusIcon />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View className="flex flex-row justify-between"></View>

        <View className="flex flex-row justify-between">
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
                setOpen(!open);
              }}
            >
              <View className="p-4">
                <MenuIcon />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TabBar;
