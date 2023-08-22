import React from "react";
import { Tabs } from "react-native-collapsible-tab-view";
import { t } from "i18next";

import { BottomNavBarPadding } from "~/components/navigation/NavBar";
import { ConversationSection } from "./ConversationSection";
import { FavoriteObjectSection } from "./FavoriteObjectSection";
import { LinkedProfilesSection } from "./LinkedProfilesSection";
import { UploadSection } from "./UploadSection";

const sections = [
  {
    title: t("home:linkedProfiles"),
    Section: LinkedProfilesSection,
  },
  {
    title: t("home:favoriteObjects"),
    Section: FavoriteObjectSection,
  },
  {
    title: t("home:conversations"),
    Section: ConversationSection,
  },
  {
    title: t("home:uploads"),
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
