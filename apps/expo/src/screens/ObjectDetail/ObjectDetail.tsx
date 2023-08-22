import React, { useEffect } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { cn } from "@homelizard/tailwind-config/utils";

import AreaRoomIcon from "@assets/icons/AreaRoomIcon.svg";
import BathRoomIcon from "@assets/icons/BathRoomIcon.svg";
import BedRoomIcon from "@assets/icons/BedRoomIcon.svg";
import LoveIcon from "@assets/icons/LoveIcon.svg";
import PhoneIcon from "@assets/icons/PhoneIcon.svg";

import { api } from "~/utils/api";
import { genImageUrl } from "~/utils/imageUrl";
import { BottomNavBarPadding } from "~/components/navigation/NavBar";
import { ContentObject, DetailObject, HeaderScroll } from "~/components/ui";
import { AppText } from "~/components/ui/AppText";
import ReadMoreText from "~/components/ui/ReadMoreText";
import { useApplicationLoadingStore } from "~/zustand/store";
import { type RootStackParams } from "../RootStackParams";
import { ObjectDetailLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "ObjectDetail">;
export const ObjectDetail = ({ route }: Props) => {
  const { itemId } = route.params;
  const { bottom } = useSafeAreaInsets();

  //zustand
  const setLoading = useApplicationLoadingStore((state) => state.setLoading);

  // trpc
  const { data, isLoading } = api.searchResult.byId.useQuery({
    searchResultId: itemId,
  });

  const requestObject = api.request.requestObject.useMutation({
    onSuccess() {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Sent request successfully!",
      });
    },
    onError(error) {
      console.log(error);
      Toast?.show({
        type: "error",
        text1: "Error!",
        text2: "Something went wrong.",
      });
    },
  });

  // functions
  const handlePressRequestObject = () => {
    requestObject.mutate({
      realEstateObjectId: data!.realEstate.id,
    });
  };

  // effects
  useEffect(() => {
    setLoading(isLoading || requestObject.isLoading);
  }, [setLoading, isLoading, requestObject.isLoading]);

  // main return
  return (
    <ObjectDetailLayout>
      <HeaderScroll>
        {/* show image */}
        <View className="h-[375px]">
          <Image
            className="h-[375px] w-full rounded-br-[188px]"
            source={genImageUrl(data?.realEstate?.imageUrl)}
            alt="House"
          />
          <TouchableOpacity
            className="bg-purply_blue absolute bottom-5 right-11 h-10 w-10 items-center justify-center rounded-full"
            activeOpacity={0.9}
            onPress={handlePressRequestObject}
          >
            <PhoneIcon width={20} height={20} />
          </TouchableOpacity>
        </View>
        {/* show address */}
        {(data?.realEstate?.address?.street ||
          data?.realEstate?.address?.city) && (
          <View className="bg-black">
            <AppText
              text={[
                data?.realEstate?.address?.street,
                data?.realEstate?.address?.city,
              ].join(", ")}
              className="ml-auto mr-4 mt-2 font-weight_800 text-grey"
            />
          </View>
        )}

        <View className="mx-4 mt-2">
          <AppText
            text={data?.realEstate?.title as string}
            className="text-font-24 font-weight_700 leading-8 "
          />
        </View>

        <View className="mx-3 mt-1 rounded-[16px] bg-white px-2 pb-4">
          {/* show statistics */}
          <View className="ml-3 mt-1">
            <AppText
              text={`${data?.realEstate.price} €`}
              className="font-nunito-800 text-lg"
            />
            <View className="flex w-6/12 flex-row items-center justify-between pt-5">
              <DetailObject
                text={data?.realEstate.numberOfBedroom as number}
                Icon={<BedRoomIcon fill="#262332" />}
              />
              <DetailObject
                text={data?.realEstate.numberOfBathroom as number}
                Icon={<BathRoomIcon fill="#262332" />}
              />
              <DetailObject
                text={data?.realEstate.livingAreaSize as number}
                Icon={<AreaRoomIcon fill="#262332" />}
              />
            </View>
          </View>
          {/*  */}

          <View className="border-l-purply_blue w-12/12 ml-2 mt-4 rounded-[20px] border-l-[6px] pl-4 ">
            <AppText text="Daten" className=" mb-2  font-nunito-800 text-sm" />
            <ContentObject
              type="Typ"
              content={data?.realEstate.objectType as string}
            />
            <ContentObject
              type="Etagenanzahl"
              content={data?.realEstate?.numberOfFloor.toString()}
            />
            <ContentObject
              type="Wohnfläche ca."
              content={`${data?.realEstate.livingAreaSize} m²`}
            />
            <ContentObject
              type="Grundstück ca."
              content={`${data?.realEstate.plotSize} m²`}
            />
            <ContentObject
              type="Zimmer"
              content={data?.realEstate.roomAmount.toString()}
            />
            <ContentObject
              type="Schlafzimmer"
              content={data?.realEstate.numberOfBedroom.toString()}
            />
            <ContentObject
              type="Badezimmer"
              content={data?.realEstate.numberOfBathroom.toString()}
            />
          </View>
          <View
            className={cn(
              "border-l-purply_blue w-12/12 ml-2 mt-4 rounded-[20px] border-l-[5px] px-4",
            )}
          >
            <View className="my-2">
              <AppText
                text="Beschreibung"
                className=" mb-2 font-nunito-800 text-sm"
              />
              <ReadMoreText
                text={data?.realEstate.description || ""}
                initialNumberOfLines={11}
              />
            </View>
          </View>
        </View>

        <BottomNavBarPadding />
      </HeaderScroll>
      <View
        style={{ paddingBottom: bottom }}
        className={cn(
          "absolute bottom-0 left-6 right-6 mx-2 mt-5 flex flex-row items-center justify-around",
        )}
      >
        <View className="">
          <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-full bg-black_1">
            <LoveIcon />
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="ml-6 rounded-3xl bg-black_1">
          <AppText
            text="Besichtigung vereinbaren"
            className="font-nunito-light mt-auto px-20 py-4 text-center text-white"
          />
        </TouchableOpacity>
      </View>
    </ObjectDetailLayout>
  );
};
