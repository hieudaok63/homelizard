import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";

import NavBar from "~/components/navigation/NavBar";
import { HomeScreen } from "./Home/HomeScreen";
import ProfileStack from "./Profile/ProfileStack";
import { type TabStackParams } from "./routes";

const Tab = createBottomTabNavigator<TabStackParams>();

const AppStack = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator tabBar={(props) => <NavBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t("navigation.home"),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: t("navigation.profile"),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
