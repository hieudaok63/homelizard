import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

import AreaRoomIcon from "@assets/icons/AreaRoomIcon.svg";
import ArrowRightIcon from "@assets/icons/ArrowRightIcon.svg";
import ArrowUpIcon from "@assets/icons/ArrowUpIcon.svg";
import BathRoomIcon from "@assets/icons/BathRoomIcon.svg";
import BedRoomIcon from "@assets/icons/BedRoomIcon.svg";
import LoveIcon from "@assets/icons/LoveIcon.svg";

import { handleLongContent } from "~/utils/helpers";
import { genImageUrl } from "~/utils/imageUrl";
import { ButtonProfile } from "~/components/Profile";
import { useAppNavigation } from "~/components/navigation/useAppNavigation";
import { DetailObject } from "~/components/ui/Profile";
import { type TypeFavoriteProfile } from "./ListFavoriteSection";

export const ItemFavorite = ({
  item,
  onPress,
  selected,
}: {
  item: TypeFavoriteProfile;
  selected: boolean;
  onPress: () => void;
}) => {
  return (
    <View>
      <ButtonProfile
        variant="pink"
        title={item.searchResult.realEstate.objectType}
        description={handleLongContent(
          item.searchResult.realEstate.description,
          30,
        )}
        onPress={onPress}
        progress={0}
        IconLeftProps={<LoveIcon />}
        IconRightProps={
          item.status ? (
            <ArrowUpIcon fill="#000000" />
          ) : (
            <ArrowRightIcon fill="#000000" />
          )
        }
      />
      {selected && <DetailObjectRoom item={item} />}
    </View>
  );
};

const DetailObjectRoom = ({ item }: { item: TypeFavoriteProfile }) => {
  const navigation = useAppNavigation();
  const realEstate = item.searchResult.realEstate;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.push("ObjectDetail", {
          itemId: item.searchResult.id,
        })
      }
      className="flex flex-col rounded-b-[28px] bg-white"
    >
      <Image
        source={genImageUrl(realEstate.imageUrl)}
        alt={realEstate.title}
        className="h-[380px]"
      />
      <View className="ml-auto mr-auto flex w-7/12 flex-row items-center justify-between pt-5">
        {realEstate.numberOfBedroom && (
          <DetailObject
            text={realEstate.numberOfBedroom}
            Icon={<BedRoomIcon fill="#262332" />}
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
      <View>
        {realEstate.price && <DetailObject text={realEstate.price} />}
      </View>
    </TouchableOpacity>
  );
};
