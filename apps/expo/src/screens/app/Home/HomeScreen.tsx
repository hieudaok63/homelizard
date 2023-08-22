import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Tabs, type TabItemProps } from "react-native-collapsible-tab-view";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { t } from "i18next";

import MessageIcon from "@assets/icons/MessageIcon.svg";

import {
  CollapsibleHeaderTabs,
  useAnimatedTabLabelColor,
} from "~/components/navigation/CollapsibleHeaderTabs/CollapsibleHeaderTabs";
import { ScrollingTabBackground } from "~/components/navigation/CollapsibleHeaderTabs/ScrollingTabBackground";
import { type AppNavigationProps } from "~/components/navigation/useAppNavigation";
import { NotificationBadge } from "~/components/ui";
import { DashboardTab } from "./DashBoardTab";
import { ResultsTab } from "./ResultsTab/ResultsTab";
import { HomeLayout } from "./_layout";

export function HomeScreen({ navigation }: AppNavigationProps<"Home">) {
  return (
    <HomeLayout>
      <View className="h-full">
        <CollapsibleHeaderTabs
          renderHeader={HomeScreenHeader}
          headerHeight={HOME_SCREEN_HEADER_HEIGHT}
          snapThreshold={0.5}
        >
          <Tabs.Tab name="dashboard" label={t("home:dashboard")}>
            <DashboardTab />
          </Tabs.Tab>
          <Tabs.Tab name="results" label={ResultsTabLabel}>
            <ScrollingTabBackground
              variant="blue"
              headerHeight={HOME_SCREEN_HEADER_HEIGHT}
            >
              <ResultsTab />
            </ScrollingTabBackground>
          </Tabs.Tab>
        </CollapsibleHeaderTabs>
      </View>
    </HomeLayout>
  );
}

const ResultsTabLabel = (props: TabItemProps<"results">) => {
  const textColorStyle = useAnimatedTabLabelColor(
    props.index,
    props.indexDecimal,
  );
  return (
    <View className="flex-row items-center gap-1">
      <Animated.Text style={textColorStyle}>
        {t("home:ergebnisse")}
      </Animated.Text>
      <NotificationBadge number={3} />
    </View>
  );
};

export const HOME_SCREEN_HEADER_HEIGHT = 80;

const HomeScreenHeader = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      pointerEvents="box-none"
      style={{ marginTop: top }}
      className="flex flex-row items-center justify-between px-8 py-2"
    >
      <View pointerEvents="none">
        <Text className="text-font-28 font-weight_400">{t("home:title")}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-dark"
      >
        <MessageIcon width={24} height={24} />
        <NotificationBadge number={5} className="absolute -right-2 -top-2" />
      </TouchableOpacity>
    </View>
  );
};
