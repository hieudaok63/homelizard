import React from "react";
import { View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

import ArrowRightIcon from "@assets/icons/ArrowRightIcon.svg";
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
      <View className="mt-6 px-6">
        <View className="pb-4">
          <AppText text="Mein Profil" large />
        </View>
        {/* Personal Detail */}
        <View className="mb-3">
          <ButtonActionMain
            title="Persönliche Daten"
            description="Address,etc..."
            onPress={() => navigation.navigate("ListBasicSection")}
            isProgressbar
            IconLeftProps={<PeopleIcon />}
            IconRightProps={<ArrowRightIcon fill="#000000" />}
            progress={10}
            onPressIconRight={() => navigation.navigate("ListBasicSection")}
            styleBoxShadowBtn
            variant="yellow"
          />
        </View>

        {/* Finanzen */}
        <View className="mb-3">
          <ButtonActionMain
            title="Finanzen"
            description="Finanzierung, Bank etc..."
            onPress={() => navigation.navigate("ListFinanceSection")}
            isProgressbar
            IconLeftProps
            IconRightProps={<ArrowRightIcon fill="#000000" />}
            progress={10}
            onPressIconRight={() => navigation.navigate("ListFinanceSection")}
            styleBoxShadowBtn
            variant="blue"
          />
        </View>

        {/* Search History  */}
        <View className="mb-3">
          <ButtonActionMain
            title="Suchen"
            description="Suchen und Filter"
            onPress={() => navigation.navigate("ListSearchHistorySection")}
            isProgressbar
            IconLeftProps
            IconRightProps={<ArrowRightIcon fill="#000000" />}
            progress={30}
            onPressIconRight={() =>
              navigation?.navigate("ListSearchHistorySection")
            }
            styleBoxShadowBtn
            variant="turquoise"
          />
        </View>

        <View className="mb-3">
          <ButtonActionMain
            title="Objekte"
            description="Such-Ergebnisse"
            onPress={() => navigation.navigate("ListFavoriteSection")}
            isProgressbar
            IconLeftProps={<LoveIcon />}
            IconRightProps={<ArrowRightIcon fill="#000000" />}
            progress={30}
            onPressIconRight={() => navigation.navigate("ListFavoriteSection")}
            styleBoxShadowBtn
            variant="pink"
          />
        </View>
        <SignOutButton />
      </View>
    </Tabs.ScrollView>
  );
};
