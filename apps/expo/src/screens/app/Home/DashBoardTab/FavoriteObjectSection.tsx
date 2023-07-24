import React from "react";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { type CarouselRenderItemInfo } from "react-native-reanimated-carousel/lib/typescript/types";

import { api, type RouterOutputs } from "~/utils/api";
import { genImageUrl } from "~/utils/imageUrl";
import { useAppNavigation } from "~/components/navigation/useAppNavigation";
import { ButtonAddFavorite } from "~/components/ui";
import { AppText } from "~/components/ui/AppText";

export const FavoriteObjectSection = () => {
  const width = Dimensions.get("window").width;

  const { data } = api.favorite.list.useQuery();

  return (
    <View className="px-8">
      <AppText text="Favorite objects" large className="text-placeholder" />
      <View className="-mx-8">
        <Carousel
          data={data ?? []}
          width={width}
          height={330}
          renderItem={FavoriteObjectItem}
          loop={false}
          scrollAnimationDuration={1000}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.8,
            parallaxScrollingOffset: 100,
          }}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
        />
      </View>
    </View>
  );
};

type FavoriteItem = RouterOutputs["favorite"]["list"][number];

const FavoriteObjectItem = ({ item }: CarouselRenderItemInfo<FavoriteItem>) => {
  const utils = api.useContext();
  const navigation = useAppNavigation();
  const { mutate: removeFavoriteById } = api.favorite.removeById.useMutation({
    async onSuccess() {
      await utils.favorite.list.invalidate();
    },
  });

  return (
    <TouchableOpacity
      className="w-full overflow-hidden rounded-3xl"
      onPress={() =>
        navigation.push("ObjectDetail", {
          itemId: item.searchResult.id,
        })
      }
    >
      <Image
        source={genImageUrl(item.searchResult.realEstate.imageUrl)}
        alt={item.searchResult.realEstate.title}
        className="h-full w-full"
      />
      <View className="absolute bottom-0 right-0">
        <ButtonAddFavorite
          selected
          onPressSelect={() => removeFavoriteById(item.id)}
        />
      </View>
    </TouchableOpacity>
  );
};
