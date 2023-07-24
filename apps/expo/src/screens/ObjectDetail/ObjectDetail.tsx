import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";

import { cn } from "@homelizard/tailwind-config/utils";

import AreaRoomIcon from "@assets/icons/AreaRoomIcon.svg";
import BathRoomIcon from "@assets/icons/BathRoomIcon.svg";
import BedRoomIcon from "@assets/icons/BedRoomIcon.svg";
import LoveIcon from "@assets/icons/LoveIcon.svg";
import PhoneIcon from "@assets/icons/PhoneIcon.svg";

import { BottomNavBarPadding } from "~/components/navigation/NavBar";
import { ContentObject, DetailObject } from "~/components/ui";
import { AppText } from "~/components/ui/AppText";
import { api } from "~/utils/api";
import { genImageUrl } from "~/utils/imageUrl";
import { type RootStackParams } from "../RootStackParams";
import { ObjectDetailLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "ObjectDetail">;

export const ObjectDetail = ({ route }: Props) => {
  const [showMoreBasicRoom, setShowMoreBasicRoom] = useState(false);
  const [showMoreContentRoom, setShowMoreContentRoom] = useState(false);
  const [showBtnshowMore, setShowBtnshowMore] = useState(false);
  const { itemId } = route.params;

  const { data } = api.searchResult.byId.useQuery({ searchResultId: itemId });

  return (
    <ObjectDetailLayout>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <View className="h-[375px]">
          <Image
            className="h-full w-full rounded-br-[190px]"
            source={genImageUrl(data?.realEstate?.imageUrl)}
            alt="House"
          />

          <TouchableOpacity
            className="absolute bottom-8 right-8 h-12 w-12 items-center justify-center rounded-full"
            activeOpacity={0.9}
          >
            <Image
              className="h-full w-full rounded-full"
              source={genImageUrl(
                "https://fastly.picsum.photos/id/197/200/300.jpg?hmac=p4Xo0YBZC4uaAtKFs7gx7d5446a8gUo7X6bEI9mgkpg",
              )}
              alt="Contact"
            />
            <View className="bg-purply_blue absolute -bottom-2 -left-2 items-center justify-center rounded-full p-1">
              <PhoneIcon width={20} height={20} />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <AppText
            text={[
              data?.realEstate?.address?.street,
              data?.realEstate?.address?.city,
            ].join(", ")}
            className="ml-auto mr-4 mt-2 font-weight_800 text-grey"
          />
        </View>
        <View className="mx-6 mt-2">
          <AppText
            text={data?.realEstate?.title as string}
            className="text-font-24 font-weight_700 leading-8 "
          />
        </View>
        <ScrollView
          className="mx-3 h-full  rounded-[16px] bg-white p-2"
          showsVerticalScrollIndicator={false}
        >
          <View className="ml-3 mt-1">
            <AppText
              text={`${data?.realEstate.price} €`}
              className="text-lg font-nunito-800"
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
          <ScrollView
            className={cn(
              "border-l-purply_blue w-12/12 mt-3 rounded-[20px] border-l-[5px] bg-white p-1",
              showMoreBasicRoom ? "h-full" : "h-[300px]",
            )}
            showsVerticalScrollIndicator={false}
          >
            <View className="ml-2 mt-2 pb-10">
              <AppText
                text="Daten"
                className=" mb-2 text-sm font-nunito-800"
              />
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
          </ScrollView>
          {!showBtnshowMore && (
            <View>
              <TouchableOpacity
                onPress={() => setShowMoreBasicRoom((pre) => !pre)}
                className="-mt-7 ml-auto mr-2 w-4/12"
              >
                {!showMoreBasicRoom && (
                  <AppText
                    text="mehr ..."
                    className="text-purply_blue text-right font-nunito-bold"
                  />
                )}
              </TouchableOpacity>
            </View>
          )}
          <ScrollView
            className={cn(
              "border-l-purply_blue w-12/12 mt-8  rounded-[20px] border-l-[5px] bg-white p-1",
              showMoreContentRoom ? "h-full" : "h-[300px]",
            )}
            showsVerticalScrollIndicator={false}
          >
            <View className="ml-2 mt-2 pb-10">
              <AppText
                text="Beschreibung"
                className=" mb-2 text-sm font-nunito-800"
              />
              <AppText
                className=" font-weight_300 text-grey"
                text="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. "
              />
              <AppText
                className=" font-weight_300 text-grey"
                text="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. "
              />
              <AppText
                className=" font-weight_300 text-grey"
                text="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. "
              />
            </View>
          </ScrollView>
          <View>
            <TouchableOpacity
              onPress={() => {
                setShowMoreContentRoom((pre) => !pre);
                setShowMoreBasicRoom(false);
                setShowBtnshowMore(false);
              }}
              className="-mt-7 ml-auto mr-2 w-4/12"
            >
              <AppText
                text="mehr ..."
                className="text-purply_blue text-right font-nunito-bold"
              />
            </TouchableOpacity>
          </View>
          <View className="mx-2 mt-5 flex flex-row items-center justify-around ">
            <View className="">
              <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-full bg-black_1">
                <LoveIcon />
              </TouchableOpacity>
            </View>
            <TouchableOpacity className="my-auto rounded-3xl bg-black_1">
              <AppText
                text="Jetzt kontaktieren"
                className="mt-auto px-20 py-4 text-center font-nunito-light text-white"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <BottomNavBarPadding />
      </ScrollView>
    </ObjectDetailLayout>
  );
};
