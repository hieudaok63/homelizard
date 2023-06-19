import React from "react";
import { FlatList } from "react-native";

import { BottomNavBarPadding } from "~/components/navigation/TabBar";
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
    <FlatList
      data={sections}
      renderItem={({ item }) => <item.Section />}
      ListFooterComponent={BottomNavBarPadding}
      keyExtractor={({ title }) => title}
      showsVerticalScrollIndicator={false}
    />
  );
};
