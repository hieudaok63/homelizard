import { View, TouchableOpacity, FlatList } from "react-native";
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

export const LinkedProfilesSection = () => {
  const chunkedData = splitArrayIntoChunks<DataItem>(
    DATA,
    DEFAULT_RENDER_ITEM,
  );

  return (
    <View className="mb-4 px-8">
      <View className="flex flex-row items-center justify-between pb-4">
        <AppText text="Linked profiles" large className="text-pink" />
        <TouchableOpacity activeOpacity={0.5}>
          <AppText text="See all" className="text-blue_1" />
        </TouchableOpacity>
      </View>
      <FlatList
        className="-mx-8"
        data={chunkedData}
        renderItem={ContentDashBoard}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onEndReachedThreshold={1}
        initialNumToRender={4}
        pagingEnabled
        horizontal
      />
    </View>
  );
};