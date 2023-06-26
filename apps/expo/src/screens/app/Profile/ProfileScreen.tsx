import React from "react";
import { View } from "react-native";
import { Tabs, type TabItemProps } from "react-native-collapsible-tab-view";
import Animated from "react-native-reanimated";

import { generateBoxShadowStyle } from "~/utils/helpers";
import {
  CollapsibleHeaderTabs,
  useAnimatedTabLabelColor,
} from "~/components/navigation/CollapsibleHeaderTabs/CollapsibleHeaderTabs";
import { type AppNavigationProps } from "~/components/navigation/useAppNavigation";
import { NotificationBadge } from "~/components/ui";
import {
  HeaderProfileUI,
  PROFILE_SCREEN_HEADER_HEIGHT,
} from "~/components/ui/Profile";
import { MainProfileTab } from "./MainProfile";
import { ResultsTab } from "./Results";
import { ProfileLayout } from "./_layout";

export const styleBoxShadow = generateBoxShadowStyle({
  xOffset: 0,
  yOffset: 0,
  shadowColorIos: "#000000",
  shadowOpacity: 0.16,
  shadowRadius: 10,
  elevation: 4,
  shadowColorAndroid: "white",
});

export function ProfileScreen({ navigation }: AppNavigationProps<"Home">) {
  return (
    <ProfileLayout>
      <View className="h-full">
        <CollapsibleHeaderTabs
          renderHeader={ProfileScreenHeader}
          headerHeight={PROFILE_SCREEN_HEADER_HEIGHT}
          snapThreshold={1}
        >
          <Tabs.Tab name="main_profile" label="Mein Profil">
            <MainProfileTab />
          </Tabs.Tab>
          <Tabs.Tab name="results" label={ResultsLabel}>
            <ResultsTab />
          </Tabs.Tab>
        </CollapsibleHeaderTabs>
      </View>
    </ProfileLayout>
  );
}

const ResultsLabel = (props: TabItemProps<"results">) => {
  const textColorStyle = useAnimatedTabLabelColor(
    props.index,
    props.indexDecimal,
  );
  return (
    <View className="flex-row items-center gap-1">
      <Animated.Text style={textColorStyle}>Objekte</Animated.Text>
      <NotificationBadge number={3} />
    </View>
  );
};

const ProfileScreenHeader = () => {
  return <HeaderProfileUI />;
};
