import React from "react";
import { View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import { t } from "i18next";

import LoveIcon from "@assets/icons/LoveIcon.svg";
import PeopleIcon from "@assets/icons/PeopleIcon.svg";

import { useAppNavigation } from "~/components/navigation/useAppNavigation";
import { ButtonActionMain } from "~/components/ui";

export const MyProfileTab = () => {
  const navigation = useAppNavigation();

  return (
    <Tabs.ScrollView>
      <View className="flex-column gap-y-2 px-6 py-4">
        {/* Personal Detail */}
        <ButtonActionMain
          title={t("profile:personalData")}
          description={t("profile:desPersonalData")}
          onPress={() => navigation.navigate("ListBasicSection")}
          IconLeftProps={<PeopleIcon />}
          progress={10}
          isButton
          variant="yellow"
        />

        {/* Finanzen */}
        <ButtonActionMain
          title={t("profile:finance.title")}
          description={t("profile:finance.description")}
          onPress={() => navigation.navigate("ListFinanceSection")}
          progress={10}
          isButton
          variant="blue"
        />

        {/* Search History  */}
        <ButtonActionMain
          title={t("profile:search.title")}
          description={t("profile:search.description")}
          onPress={() => navigation.navigate("ListSearchHistorySection")}
          progress={30}
          isButton
          variant="turquoise"
        />

        <ButtonActionMain
          title={t("profile:object")}
          description={t("profile:desObject")}
          onPress={() => navigation.navigate("ListFavoriteSection")}
          IconLeftProps={<LoveIcon />}
          progress={30}
          isButton
          variant="pink"
        />
      </View>
    </Tabs.ScrollView>
  );
};
