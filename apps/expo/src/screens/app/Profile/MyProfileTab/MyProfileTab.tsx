import React from "react";
import { View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

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
          title="Persönliche Daten"
          description="Address,etc..."
          onPress={() => navigation.navigate("ListBasicSection")}
          IconLeftProps={<PeopleIcon />}
          progress={10}
          isButton
          variant="yellow"
        />

        {/* Finanzen */}
        <ButtonActionMain
          title="Finanzen"
          description="Finanzierung, Bank etc..."
          onPress={() => navigation.navigate("ListFinanceSection")}
          progress={10}
          isButton
          variant="blue"
        />

        {/* Search History  */}
        <ButtonActionMain
          title="Suchen"
          description="Suchen und Filter"
          onPress={() => navigation.navigate("ListSearchHistorySection")}
          progress={30}
          isButton
          variant="turquoise"
        />

        <ButtonActionMain
          title="Objekte"
          description="Such-Ergebnisse"
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
