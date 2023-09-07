import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import { t } from "i18next";

import { AppText } from "~/components/ui/AppText";
import { splitArrayIntoChunks } from "~/utils";
import { ContentDashBoard } from "./ContentDashBoard";

interface DataItem {
  id: number;
  name: string;
  date: string;
  status: string;
}

export const DATA = [
  {
    id: 1,
    name: "Name1",
    date: "Next event date",
    status: "Family",
  },
  {
    id: 2,
    name: "Name2",
    date: "Next event date",
    status: "Business",
  },
  {
    id: 3,
    name: "Name3",
    date: "Birthday: 25 Jun 2021",
    status: "Friends",
  },
  {
    id: 4,
    name: "Name4",
    date: "Dinner: 11 Mar 2021",
    status: "Business",
  },
  {
    id: 5,
    name: "Name5",
    date: "Dinner: 11 Mar 2021",
    status: "Business",
  },
  {
    id: 6,
    name: "Name6",
    date: "Next event date",
    status: "Friends",
  },

  {
    id: 7,
    name: "Name6",
    date: "Next event date",
    status: "Friends",
  },
  {
    id: 8,
    name: "Name7",
    date: "Next event date",
    status: "Friends",
  },
  {
    id: 9,
    name: "Name6",
    date: "Next event date",
    status: "Friends",
  },
  {
    id: 10,
    name: "Name7",
    date: "Next event date",
    status: "Friends",
  },
  {
    id: 11,
    name: "Name6",
    date: "Next event date",
    status: "Friends",
  },
  {
    id: 12,
    name: "Name7",
    date: "Next event date",
    status: "Friends",
  },
  {
    id: 13,
    name: "Name6",
    date: "Next event date",
    status: "Friends",
  },
  {
    id: 14,
    name: "Name7",
    date: "Next event date",
    status: "Friends",
  },
  {
    id: 15,
    name: "Name6",
    date: "Next event date",
    status: "Friends",
  },
  {
    id: 16,
    name: "Name7",
    date: "Next event date",
    status: "Friends",
  },
  {
    id: 17,
    name: "Name6",
    date: "Next event date",
    status: "Friends",
  },
  {
    id: 18,
    name: "Name7",
    date: "Next event date",
    status: "Friends",
  },
  {
    id: 19,
    name: "Name6",
    date: "Next event date",
    status: "Friends",
  },
  {
    id: 20,
    name: "Name7",
    date: "Next event date",
    status: "Friends",
  },
  {
    id: 21,
    name: "Name7",
    date: "Next event date",
    status: "Friends",
  },
  {
    id: 22,
    name: "Name6",
    date: "Next event date",
    status: "Friends",
  },
  {
    id: 23,
    name: "Name7",
    date: "Next event date",
    status: "Friends",
  },
];
export const DEFAULT_RENDER_ITEM = 4;

interface IItem {
  name: string;
  date: string;
  status: string;
  id: number;
}
export const LinkedProfilesSection = () => {
  const chunkedData = splitArrayIntoChunks<DataItem>(DATA, DEFAULT_RENDER_ITEM);
  const refFlatList = useRef<any>();

  const [numItem, setNumItem] = useState(0);
  const onViewCallBack = React.useCallback(
    ({
      viewableItems,
      changed,
    }: {
      viewableItems: Array<ViewToken>;
      changed: Array<ViewToken>;
    }) => {
      const num: number = viewableItems[0]?.index || 0;
      setNumItem(num || 0);
    },
    [],
  );
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderItem = ({ item, index }: { item: IItem[]; index: number }) => {
    return <ContentDashBoard item={item} index={index} />;
  };
  const { width } = Dimensions.get("window");
  return (
    <View className="my-6">
      <View className="mx-6 flex flex-row items-center justify-between">
        <AppText text={t("home:linkedProfiles")} large className="text-pink" />
        <TouchableOpacity activeOpacity={0.5}>
          <AppText text={t("home:seeAll")} className="text-blue_1" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={chunkedData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onEndReachedThreshold={1}
        initialNumToRender={4}
        pagingEnabled
        horizontal
        initialScrollIndex={numItem}
        className="mt-2"
      />
    </View>
  );
};
