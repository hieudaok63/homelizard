import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import TabBar from "~/components/navigation/TabBar";
import { HomeScreen } from "./Home";
import { ProfileScreen } from "./Profile";
import { type TabStackParams } from "./routes";
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator<TabStackParams>();

const AppStack = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t("navigation.home"),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{
          num: 2,
        }}
        options={{
          tabBarLabel: t("navigation.profile"),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
