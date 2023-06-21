import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { type Route } from "react-native-tab-view";

import { cn } from "@homelizard/tailwind-config/utils";

interface TabComponentProps {
  data: Route[];
  screen: React.ReactNode[];
}

export const TabComponent: React.FC<TabComponentProps> = ({ data, screen }) => {
  const [index, setIndex] = useState(0);
  const routes = data;

  const renderScreen = () => {
    const CurrentScreen = screen[index];
    if (CurrentScreen) {
      return CurrentScreen;
    }
    return null;
  };

  return (
    <>
      <View className="px-8">
        <View className="mt-3 flex flex-row rounded-full bg-black p-1">
          {routes.map((route, i) => {
            return (
              <View key={i}>
                <TouchableOpacity
                  activeOpacity={1}
                  key={i}
                  className={cn(
                    "flex flex-row items-center rounded-full",
                    index === i ? "bg-white" : "bg-black",
                  )}
                  onPress={() => {
                    setIndex(i);
                  }}
                >
                  <Text
                    className={cn(
                      "font-weight_700 w-[180px] py-5 text-center text-white",
                      index === i && "text-black",
                    )}
                  >
                    {route.title}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
      <View>{renderScreen()}</View>
    </>
  );
};
