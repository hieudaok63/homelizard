import React, { useMemo } from "react";
import { type ListRenderItemInfo } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

import { api } from "~/utils/api";
import { BottomNavBarPadding } from "~/components/navigation/NavBar";
import { AppText } from "~/components/ui/AppText";
import { SearchResultCard, type SearchResultItem } from "./SearchResultCard";

export const ResultsTab = () => {
  const { items, fetchNextPage } = useInfiniteSearchResults();

  return (
    <Tabs.FlatList
      data={items}
      renderItem={ResultItem}
      // TODO: change to section list
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
      text="Today"
      className="px-6 pb-1 pt-4 font-nunito-bold text-2xl text-white"
    />
  );
};

const ResultItem = ({ item }: ListRenderItemInfo<SearchResultItem>) => {
  return <SearchResultCard item={item} />;
};

const useInfiniteSearchResults = () => {
  const { data, fetchNextPage } = api.searchResult.list.useInfiniteQuery(
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

  return { items, fetchNextPage };
};
