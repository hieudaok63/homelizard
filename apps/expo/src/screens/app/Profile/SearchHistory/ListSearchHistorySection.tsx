import React from "react";
import { ScrollView, View } from "react-native";
import { useTranslation } from "react-i18next";

import { ButtonProfile } from "~/components/Profile";
import { BottomNavBarPadding } from "~/components/navigation/NavBar";
import { useAppNavigation } from "~/components/navigation/useAppNavigation";
import { LayoutSearchHistory } from "./_layoutSearchHistory";

export const ListSearchHistorySection = () => {
  const { t } = useTranslation();
  const navigation = useAppNavigation();

  return (
    <LayoutSearchHistory>
      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
        <View className="rounded-[45px] pt-9 ">
          <ButtonProfile
            variant="turquoise"
            title="Haus"
            description="Einfamilienhaus, München"
            onPress={() => navigation.navigate("HausSearchOption")}
            onPressIconRight={() => navigation.navigate("HausSearchOption")}
            progress={20}
            IconLeftProps
            firstItemButton
          />
          <ButtonProfile
            variant="turquoise"
            title="Mehrfamilienhaus"
            description="Mehrfamilienhaus, Rosenheim"
            onPress={() => alert(1)}
            onPressIconRight={() => alert(1)}
            progress={40}
            IconLeftProps
          />
          <ButtonProfile
            variant="turquoise"
            title="Wohnung"
            description="Loft, München"
            onPress={() => alert(1)}
            onPressIconRight={() => alert(1)}
            progress={60}
            IconLeftProps
            lastItemButton
          />
        </View>

        <BottomNavBarPadding />
      </ScrollView>
    </LayoutSearchHistory>
  );
};
