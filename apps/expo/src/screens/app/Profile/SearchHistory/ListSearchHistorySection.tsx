import React, { useCallback, useState } from "react";
import { FlatList, View, type ListRenderItem } from "react-native";

import { api, type RouterOutputs } from "~/utils/api";
import { ItemSearchProfile } from "./ItemSearchHistory";
import { LayoutSearchHistory } from "./_layoutSearchHistory";

type SearchProfileItem = RouterOutputs["search"]["list"][number];

export type TypeSearchHistoryProfile = SearchProfileItem & { status: boolean };

export const ListSearchHistorySection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const { data } = api.search.list.useQuery(undefined, {
    select: (data) => data.map((elem) => ({ ...elem, status: false })),
  });

  const onSelectItem = useCallback(
    (index: number) => {
      if (selectedIndex === 0 || selectedIndex) {
        setSelectedIndex(null);
        return;
      }
      setSelectedIndex(index);
    },
    [selectedIndex],
  );

  const renderItem: ListRenderItem<TypeSearchHistoryProfile> = ({
    item,
    index,
  }) => {
    return (
      <ItemSearchProfile
        onPress={() => {
          onSelectItem(index);
        }}
        item={item}
        selected={selectedIndex === index}
      />
    );
  };

  return (
    <LayoutSearchHistory>
      <View className="mt-3 overflow-hidden rounded-2xl">
        <FlatList
          data={data ?? []}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </LayoutSearchHistory>
  );
};
