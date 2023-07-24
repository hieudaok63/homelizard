import React, { useCallback, useState } from "react";
import { FlatList, View, type ListRenderItem } from "react-native";

import { api, type RouterOutputs } from "~/utils/api";
import { ItemFavorite } from "./ItemFavorite";
import { LayoutFavorite } from "./_layoutFavorite";

type FavoriteItem = RouterOutputs["favorite"]["list"][number];
export type TypeFavoriteProfile = FavoriteItem & { status: boolean };

export const ListFavoriteSection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const { data } = api.favorite.list.useQuery(undefined, {
    select: (data) => data.map((elem) => ({ ...elem, status: false })),
  });

  const onSelectItem = useCallback(
    (index: number) => {
      if ((selectedIndex === 0 || selectedIndex) && selectedIndex === index) {
        setSelectedIndex(null);
        return;
      }
      setSelectedIndex(index);
    },
    [selectedIndex],
  );

  const renderItem: ListRenderItem<TypeFavoriteProfile> = ({ item, index }) => {
    return (
      <ItemFavorite
        onPress={() => {
          onSelectItem(index);
        }}
        item={item}
        selected={selectedIndex === index}
      />
    );
  };

  return (
    <LayoutFavorite>
      <View className="mt-3 overflow-hidden rounded-2xl ">
        <FlatList
          data={data ?? []}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </LayoutFavorite>
  );
};
