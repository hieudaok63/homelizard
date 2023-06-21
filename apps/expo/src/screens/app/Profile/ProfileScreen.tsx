import React from "react";
import { Text } from "react-native";
import { type Route } from "react-native-tab-view";

import { TabComponent } from "~/components/TabComponent";
import { HeaderProfile } from "./HeaderProfile";
import { ContentPost } from "./Results/ContentPost";
import { ProfileLayout } from "./_layout";
import { LayoutContent } from "./_layoutContent";

export const tabs: Route[] = [
  { key: "profile", title: "Mein Profil" },
  { key: "results", title: "Objekte" },
];

export const tabScreens = [
  {
    title: "Main Profile",
    Section: <Text>Main Profile</Text>,
  },
  {
    title: "Result Objects",
    Section: (
      <LayoutContent>
        <ContentPost />
      </LayoutContent>
    ),
  },
];

export const ProfileScreen = () => {
  return (
    <ProfileLayout>
      <HeaderProfile />
      <TabComponent
        data={tabs}
        screen={tabScreens.map((item) => item.Section)}
      />
    </ProfileLayout>
  );
};
