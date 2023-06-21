import React from "react";
import { Text } from "react-native";
import { type Route } from "react-native-tab-view";

import { TabComponent } from "~/components/TabComponent";
import ContentPost from "./Results/ContentPost";
import { LayoutContent } from "./_layoutContent";

export const tabs: Route[] = [
  { key: "profile", title: "Mein Profil" },
  { key: "results", title: "Objekte" },
];

const tabScreens = [
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

export const TabProfile = () => {
  return (
    <TabComponent data={tabs} screen={tabScreens.map((item) => item.Section)} />
  );
};
