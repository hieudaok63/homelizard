import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Tabs, type TabItemProps } from "react-native-collapsible-tab-view";
import Animated from "react-native-reanimated";

import DotIcon from "@assets/icons/DotIcon.svg";
import EditIcon from "@assets/icons/EditIcon.svg";
import EyeIcon from "@assets/icons/EyeIcon.svg";

import { generateBoxShadowStyle } from "~/utils/helpers";
import {
  CollapsibleHeaderTabs,
  useAnimatedTabLabelColor,
} from "~/components/navigation/CollapsibleHeaderTabs/CollapsibleHeaderTabs";
import { ScrollingTabBackground } from "~/components/navigation/CollapsibleHeaderTabs/ScrollingTabBackground";
import { NotificationBadge, UserAvatar } from "~/components/ui";
import { AppText } from "~/components/ui/AppText";
import { MyProfileTab } from "./MyProfileTab";
import { ResultsTab } from "./ResultsTab";

export function ProfileScreen() {
  return (
    <CollapsibleHeaderTabs
      renderHeader={ProfileScreenHeader}
      headerHeight={PROFILE_SCREEN_HEADER_HEIGHT}
    >
      <Tabs.Tab name="my_profile" label="Mein Profil">
        <ScrollingTabBackground
          variant="yellow"
          headerHeight={PROFILE_SCREEN_HEADER_HEIGHT}
        >
          <MyProfileTab />
        </ScrollingTabBackground>
      </Tabs.Tab>
      <Tabs.Tab name="results" label={ResultsTabLabel}>
        <ScrollingTabBackground
          variant="yellow"
          headerHeight={PROFILE_SCREEN_HEADER_HEIGHT}
        >
          <ResultsTab />
        </ScrollingTabBackground>
      </Tabs.Tab>
    </CollapsibleHeaderTabs>
  );
}

const ResultsTabLabel = (props: TabItemProps<"results">) => {
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

const smallBoxShadow = generateBoxShadowStyle("small");

const PROFILE_SCREEN_HEADER_HEIGHT = 484;
const ProfileScreenHeader = () => {
  return (
    <>
      <View className="relative h-[375px]" pointerEvents="box-none">
        <View pointerEvents="none">
          <UserAvatar className="h-full w-full rounded-none rounded-br-[188px]" />
        </View>
        <TouchableOpacity
          className="absolute bottom-6 right-10 items-center justify-center rounded-full bg-white p-3"
          activeOpacity={0.5}
          style={smallBoxShadow}
        >
          <EyeIcon />
        </TouchableOpacity>
      </View>
      <View
        className="my-6 flex flex-row items-start justify-between px-6"
        pointerEvents="box-none"
      >
        <View pointerEvents="box-none">
          <View pointerEvents="none">
            <AppText text="Hello, Veronica" large />
          </View>
          <TouchableOpacity>
            <View className="mt-[0px] flex flex-row items-center">
              <AppText
                text="Teile uns etwas über dich mit..."
                numberOfLines={1}
              />
              <EditIcon />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="items-center justify-center rounded-full bg-white p-3"
          style={smallBoxShadow}
        >
          <DotIcon />
        </TouchableOpacity>
      </View>
    </>
  );
};
