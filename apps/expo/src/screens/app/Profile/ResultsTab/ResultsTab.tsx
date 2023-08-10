import React, { useMemo } from "react";
import {
  RefreshControl,
  type ImageSourcePropType,
  type ListRenderItemInfo,
} from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

import { api, type RouterOutputs } from "~/utils/api";
import { BottomNavBarPadding } from "~/components/navigation/NavBar";
import { useAppNavigation } from "~/components/navigation/useAppNavigation";
import { ResultCard } from "~/components/ui";
import { AppText } from "~/components/ui/AppText";

export type IItem = {
  title: string;
  desc: string;
  imgSrc: ImageSourcePropType;
  timeCreate: string;
  id: number;
};

export const ResultsTab = () => {
  const navigation = useAppNavigation();
  const { items, fetchNextPage, isRefetching, refetch } =
    useInfiniteSearchResults();
  const ResultItem = ({
    item,
  }: ListRenderItemInfo<
    RouterOutputs["searchResult"]["bySearchProfileId"]["data"][number]
  >) => {
    return (
      <ResultCard
        title={item?.realEstate.title}
        description={item?.realEstate.description}
        imageUrl={item?.realEstate.imageUrl}
        createdAt={item?.createdAt}
        onPress={() => {
          navigation.push("ObjectDetail", {
            itemId: item.id,
          });
        }}
      />
    );
  };
  return (
    <Tabs.FlatList
      data={items}
      renderItem={ResultItem}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
      ListHeaderComponent={HeaderPost}
      ListFooterComponent={BottomNavBarPadding}
      showsVerticalScrollIndicator={false}
      onEndReached={() => fetchNextPage()}
    />
  );
};

const HeaderPost = () => {
  return (
    <AppText
      text="Heute"
      className="px-6 pb-1 pt-4 font-nunito-bold text-2xl text-white"
    />
  );
};

const useInfiniteSearchResults = () => {
  const { data, ...useQueryReturn } = api.searchResult.list.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const items = useMemo(
    () => data?.pages.flatMap((page) => page.items),
    [data],
  );

  return { items, ...useQueryReturn };
};
