import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

import AreaRoomIcon from "@assets/icons/AreaRoomIcon.svg";
import ArrowRightIcon from "@assets/icons/ArrowRightIcon.svg";
import ArrowUpIcon from "@assets/icons/ArrowUpIcon.svg";
import BathRoomIcon from "@assets/icons/BathRoomIcon.svg";
import BedRoomIcon from "@assets/icons/BedRoomIcon.svg";
import LoveIcon from "@assets/icons/LoveIcon.svg";

import { ButtonProfile } from "~/components/Profile";
import { DetailObject } from "~/components/ui/Profile";

interface IItem {
  id: number;
  typeRoom: string;
  detailRoom: string;
  imageRoom: string;
  bedRoom: number;
  bathroom: number;
  roomArea: number;
  status: boolean;
  priceRoom: string;
}

export const ItemFavorite = ({
  item,
  onPress,
  firstItemButton,
  lastItemButton,
}: {
  item: IItem;
  index: number;
  firstItemButton: boolean;
  lastItemButton: boolean;
  onPress: () => void;
}) => {
  const DetailObjectRoom = ({ item }: { item: IItem }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => alert(1)}
        className="flex flex-col rounded-b-[28px] bg-white "
      >
        <Image source={{ uri: item.imageRoom }} className="h-[380px]" />
        <View className=" ml-auto mr-auto flex w-7/12 flex-row items-center justify-between pt-5">
          {item.bedRoom && (
            <DetailObject
              text={item.bedRoom}
              Icon={<BedRoomIcon fill="#262332" />}
            />
          )}
          {item.bathroom && (
            <DetailObject
              text={item.bathroom}
              Icon={<BathRoomIcon fill="#262332" />}
            />
          )}
          {item.roomArea && (
            <DetailObject
              text={item.roomArea}
              Icon={<AreaRoomIcon fill="#262332" />}
            />
          )}
        </View>
        <View>{item.priceRoom && <DetailObject text={item.priceRoom} />}</View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="">
      <ButtonProfile
        variant="pink"
        title={item.typeRoom}
        description={item.detailRoom}
        onPress={onPress}
        onPressIconRight={() => alert(1)}
        progress={0}
        IconLeftProps={<LoveIcon />}
        IconRightProps={
          item?.status ? (
            <ArrowUpIcon fill="#000000" />
          ) : (
            <ArrowRightIcon fill="#000000" />
          )
        }
        lastItemButton={item?.status ? false : lastItemButton}
        firstItemButton={firstItemButton}
      />
      {item?.status && <DetailObjectRoom item={item} />}
    </View>
  );
};
