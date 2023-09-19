import React from "react";
import { FlatList, View, type ListRenderItem } from "react-native";

import LoveIcon from "@assets/icons/LoveIcon.svg";

import { api, type RouterOutputs } from "~/utils/api";
import { BottomNavBarPadding } from "~/components/navigation/NavBar";
import { AppText } from "~/components/ui/AppText";
import { ProfileSectionAccordion } from "~/components/ui/Profile";
import { ItemFavorite } from "./ItemFavorite";
import { LayoutFavorite } from "./_layoutFavorite";

export type FavoriteItem = RouterOutputs["favorite"]["list"][number];

// helper functions
const handleItemClassName = (index: number, length?: number) => {
  if (!length) return "";
  if (index === 0) return "rounded-b-none";
  if (index === length - 1) return "rounded-t-none";
  return "rounded-none";
};

export const ListFavoriteSection = () => {
  const { data, isLoading } = api.favorite.list.useQuery();

  const renderItem: ListRenderItem<FavoriteItem> = ({ item, index }) => {
    return (
      <ProfileSectionAccordion
        title={item?.searchResult?.realEstate?.title}
        description={[
          `${item?.searchResult.realEstate.livingAreaSize} m²`,
          item?.searchResult?.realEstate?.objectTypes.join(", "),
        ].join(", ")}
        variant="pink"
        progress={100}
        className={handleItemClassName(index, data?.length)}
        style={{ borderBottomColor: "#0000001F", borderBottomWidth: 1 }}
        iconLeft={<LoveIcon />}
      >
        <ItemFavorite item={item} />
      </ProfileSectionAccordion>
    );
  };

  if (isLoading) {
    return (
      <LayoutFavorite>
        <View className="mt-3">
          <AppText text="Loading..." className="w-full text-center" />
        </View>
      </LayoutFavorite>
    );
  }

  return (
    <LayoutFavorite>
      <View className="mt-3 flex-1">
        {data?.length ? (
          <FlatList
            data={data ?? []}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            ListFooterComponent={<BottomNavBarPadding />}
          />
        ) : (
          <AppText text="Nothing here yet." className="w-full text-center" />
        )}
      </View>
    </LayoutFavorite>
  );
};
