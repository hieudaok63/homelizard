import React from "react";
import { Tabs } from "react-native-collapsible-tab-view";

import { BottomNavBarPadding } from "~/components/navigation/NavBar";
import { ConversationSection } from "./ConversationSection";
import { FavoriteObjectSection } from "./FavoriteObjectSection";
import { LinkedProfilesSection } from "./LinkedProfilesSection";
import { UploadSection } from "./UploadSection";

const sections = [
  {
    title: "Linked Profiles",
    Section: LinkedProfilesSection,
  },
  {
    title: "Favorite Objects",
    Section: FavoriteObjectSection,
  },
  {
    title: "Conversations",
    Section: ConversationSection,
  },
  {
    title: "Uploads",
    Section: UploadSection,
  },
];

export const DashboardTab = () => {
  return (
    <Tabs.FlatList
      data={sections}
      renderItem={({ item }) => <item.Section />}
      ListFooterComponent={BottomNavBarPadding}
      keyExtractor={({ title }) => title}
      showsVerticalScrollIndicator={false}
    />
  );
};
