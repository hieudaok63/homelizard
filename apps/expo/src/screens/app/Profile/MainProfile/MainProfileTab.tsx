import React from "react";
import { Tabs } from "react-native-collapsible-tab-view";

import { AppText } from "~/components/ui/AppText";
import { LayoutContent } from "~/components/ui/Profile";

export const MainProfileTab = () => {
  return (
    <LayoutContent>
      <Tabs.ScrollView>
        <AppText text="Hello world" />
        <AppText text="Hello world" />
        <AppText text="Hello world" />
        <AppText text="Hello world" />
      </Tabs.ScrollView>
    </LayoutContent>
  );
};
