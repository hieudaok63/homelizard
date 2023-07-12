import React, { useEffect, useState } from "react";
import { FlatList, type ListRenderItem } from "react-native";
import { useTranslation } from "react-i18next";

import { BottomNavBarPadding } from "~/components/navigation/NavBar";
import { useAppNavigation } from "~/components/navigation/useAppNavigation";
import { ItemFavorite } from "./ItemFavorite";
import { LayoutFavorite } from "./_layoutFavorite";

type Room = {
  id: number;
  typeRoom: string;
  detailRoom: string;
  imageRoom: string;
  priceRoom: string;
  bedRoom: number;
  bathroom: number;
  roomArea: number;
  status: boolean;
};

export const LIST_ROOM_FAVORITE: Room[] = [
  {
    id: 1,
    typeRoom: "Einfamilienhaus",
    detailRoom: "230 m², München",
    imageRoom: "https://picsum.photos/seed/picsum/200/300",
    priceRoom: "€1.200.000",
    bedRoom: 8,
    bathroom: 4,
    roomArea: 1200,
    status: false,
  },
  {
    id: 2,
    typeRoom: "Einfamilienhaus",
    detailRoom: "230 m², München",
    imageRoom: "https://picsum.photos/seed/picsum/200/300",
    priceRoom: "€1.200.000",
    bedRoom: 8,
    bathroom: 4,
    roomArea: 1200,
    status: false,
  },
  {
    id: 3,
    typeRoom: "Einfamilienhaus",
    detailRoom: "230 m², München",
    imageRoom: "https://picsum.photos/seed/picsum/200/300",
    priceRoom: "€1.200.000",
    bedRoom: 8,
    bathroom: 4,
    roomArea: 1200,
    status: false,
  },
  {
    id: 4,
    typeRoom: "Einfamilienhaus",
    detailRoom: "230 m², München",
    imageRoom: "https://picsum.photos/seed/picsum/200/300",
    priceRoom: "€1.200.000",
    bedRoom: 8,
    bathroom: 4,
    roomArea: 1200,
    status: false,
  },
  // ... other room objects
];

export const FIRST_ITEM_FAVORITE = 1;

export const ListFavoriteSection = () => {
  const { t } = useTranslation();
  const navigation = useAppNavigation();
  const [data, setData] = useState<Room[]>([]);
  const lastItemFavorite: Room | undefined = data[data.length - 1];

  useEffect(() => {
    callApi();
  }, []);

  const callApi = () => {
    setData(convertData(LIST_ROOM_FAVORITE));
  };

  const convertData = (list: Room[]): Room[] => {
    return list.map((elm) => {
      return {
        ...elm,
        status: false,
      };
    });
  };

  const onSelectItem = (index: number) => {
    const newList = data;
    const newDataSelect = newList.map((elm, num) => {
      if (index === num) {
        return {
          ...elm,
          status: !elm?.status,
        };
      } else {
        return {
          ...elm,
          status: false,
        };
      }
    });
    setData(newDataSelect);
  };

  const renderItem: ListRenderItem<Room> = ({ item, index }) => {
    return (
      <ItemFavorite
        onPress={() => {
          onSelectItem(index);
        }}
        item={item}
        index={index}
        firstItemButton={item.id === FIRST_ITEM_FAVORITE}
        lastItemButton={item.id === lastItemFavorite.id}
      />
    );
  };

  return (
    <LayoutFavorite>
      <FlatList
        data={data}
        renderItem={renderItem}
        ListFooterComponent={BottomNavBarPadding}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        className="mt-3"
      />
    </LayoutFavorite>
  );
};
