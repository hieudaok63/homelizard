import React from "react";
import { View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

import LoveIcon from "@assets/icons/LoveIcon.svg";
import PeopleIcon from "@assets/icons/PeopleIcon.svg";

import { SignOutButton } from "~/components/auth/SignOutButton";
import { useAppNavigation } from "~/components/navigation/useAppNavigation";
import { ButtonActionMain } from "~/components/ui";
import { AppText } from "~/components/ui/AppText";

export const MyProfileTab = () => {
  const navigation = useAppNavigation();

  return (
    <Tabs.ScrollView>
      <View className="p-6">
        <AppText text="Mein Profil" large />
      </View>
      <View className="flex-column gap-y-2 px-6">
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
        <SignOutButton />
      </View>
    </Tabs.ScrollView>
  );
};
