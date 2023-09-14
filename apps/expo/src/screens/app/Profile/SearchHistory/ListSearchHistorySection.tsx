import React from "react";
import { FlatList, View, type ListRenderItem } from "react-native";
import { t } from "i18next";

import { api, type RouterOutputs } from "~/utils/api";
import { BottomNavBarPadding } from "~/components/navigation/NavBar";
import { AppText } from "~/components/ui/AppText";
import { ProfileSectionAccordion } from "~/components/ui/Profile";
import { ItemSearchProfile } from "./ItemSearchHistory";
import { LayoutSearchHistory } from "./_layoutSearchHistory";

export type SearchProfileItem = RouterOutputs["search"]["list"][number];

// helper functions
const handleItemClassName = (index: number, length?: number) => {
  if (!length) return "";
  if (index === 0) return "rounded-b-none";
  if (index === length - 1) return "rounded-t-none";
  return "rounded-none";
};

// component
export const ListSearchHistorySection = () => {
  const { data, isLoading } = api.search.list.useQuery();
  const renderItem: ListRenderItem<SearchProfileItem> = ({ item, index }) => {
    return (
      <ProfileSectionAccordion
        title={item?.objectTypes?.join(", ")}
        variant="turquoise"
        progress={100}
        className={handleItemClassName(index, data?.length)}
      >
        <ItemSearchProfile item={item} />
      </ProfileSectionAccordion>
    );
  };

  if (isLoading) {
    return (
      <LayoutSearchHistory>
        <View className="mt-3">
          <AppText text={t("profile:loading")} className="w-full text-center" />
        </View>
      </LayoutSearchHistory>
    );
  }

  return (
    <LayoutSearchHistory>
      <View className="mt-3">
        {data?.length ? (
          <FlatList
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            ListFooterComponent={<BottomNavBarPadding />}
          />
        ) : (
          <AppText
            text={t("profile:nothingHere")}
            className="w-full text-center"
          />
        )}
      </View>
    </LayoutSearchHistory>
  );
};
