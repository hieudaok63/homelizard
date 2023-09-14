import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import AreaRoomIcon from "@assets/icons/AreaRoomIcon.svg";
import BathRoomIcon from "@assets/icons/BathRoomIcon.svg";
import BedRoomIcon from "@assets/icons/BedRoomIcon.svg";

import { genImageUrl } from "~/utils/imageUrl";
import { useAppNavigation } from "~/components/navigation/useAppNavigation";
import { DetailObject } from "~/components/ui/Profile";
import { type FavoriteItem } from "./ListFavoriteSection";

export const ItemFavorite = ({ item }: { item: FavoriteItem }) => {
  const navigation = useAppNavigation();
  const { realEstate } = item.searchResult;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.push("ObjectDetail", {
          itemId: item.searchResult.id,
        })
      }
      className="flex flex-col rounded-b-[28px] bg-white pb-2"
    >
      <Image
        source={genImageUrl(realEstate.imageUrl)}
        alt={realEstate.title}
        className="h-[380px]"
      />
      <View className="flex flex-row items-center justify-between  px-14 pt-5">
        {realEstate.numberOfBedroom && (
          <DetailObject
            text={realEstate.numberOfBedroom}
            Icon={<BedRoomIcon />}
          />
        )}
        {realEstate.numberOfBathroom && (
          <DetailObject
            text={realEstate.numberOfBathroom}
            Icon={<BathRoomIcon fill="#262332" />}
          />
        )}
        {realEstate.livingAreaSize && (
          <DetailObject
            text={realEstate.livingAreaSize}
            Icon={<AreaRoomIcon fill="#262332" />}
          />
        )}
      </View>
      <View className="mt-2 pl-14">
        {realEstate.price && (
          <Text className="text-lg font-extrabold">{realEstate.price}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
