import React, { useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";

import { cn } from "@homelizard/tailwind-config/utils";

import AreaRoomIcon from "@assets/icons/AreaRoomIcon.svg";
import BathRoomIcon from "@assets/icons/BathRoomIcon.svg";
import BedRoomIcon from "@assets/icons/BedRoomIcon.svg";
import LoveIcon from "@assets/icons/LoveIcon.svg";
import PhoneIcon from "@assets/icons/PhoneIcon.svg";

import { genImageUrl } from "~/utils/imageUrl";
import { BottomNavBarPadding } from "~/components/navigation/NavBar";
import { ContentObject, DetailObject } from "~/components/ui";
import { AppText } from "~/components/ui/AppText";
import { ObjectDetailLayout } from "./_layout";

export const ObjectDetail = () => {
  const [showMoreBasicRoom, setShowMoreBasicRoom] = useState(false);
  const [showMoreContentRoom, setShowMoreContentRoom] = useState(false);
  const [showBtnshowMore, setShowBtnshowMore] = useState(false);

  return (
    <ObjectDetailLayout>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <View className="h-[375px]">
          <Image
            className="h-full w-full rounded-br-[190px]"
            source={genImageUrl("/image/retail-object/RetailObject1.jpg")}
            alt="House"
          />

          <TouchableOpacity
            className="absolute bottom-8 right-8 h-12 w-12 items-center justify-center rounded-full"
            activeOpacity={0.9}
          >
            <Image
              className=" h-full w-full rounded-full"
              source={{
                uri: "https://fastly.picsum.photos/id/197/200/300.jpg?hmac=p4Xo0YBZC4uaAtKFs7gx7d5446a8gUo7X6bEI9mgkpg",
              }}
              alt="Contact"
            />
            <View className="bg-purply_blue absolute -bottom-2 -left-2 items-center justify-center rounded-full p-1">
              <PhoneIcon width={20} height={20} />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <AppText
            text="Memmingerberg, Oberallgäu"
            className="font-weight_800 text-grey ml-auto mr-4 mt-2"
          />
        </View>
        <View className="mx-6 mt-2">
          <AppText
            text="Architektonisches Highlight - tolles Einfamilienhaus mit großem Garten in Fellheim"
            className=" font-weight_700 text-font-24 leading-8 "
          />
        </View>
        <ScrollView
          className="mx-3 h-full  rounded-[16px] bg-white p-2"
          showsVerticalScrollIndicator={false}
        >
          <View className="ml-3 mt-1">
            <AppText
              text="659.000 €"
              className=" font-weight_800 text-font-18 "
            />
            <View className=" flex w-6/12 flex-row items-center justify-between pt-5">
              <DetailObject text="4" Icon={<BedRoomIcon fill="#262332" />} />
              <DetailObject text="5" Icon={<BathRoomIcon fill="#262332" />} />
              <DetailObject text="6" Icon={<AreaRoomIcon fill="#262332" />} />
            </View>
          </View>
          <ScrollView
            className={cn(
              "border-l-purply_blue w-12/12 mt-3  rounded-[20px] border-l-[5px] bg-white p-1",
              showMoreBasicRoom ? "h-[100%]" : "h-[300px]",
            )}
            showsVerticalScrollIndicator={false}
          >
            <View className="ml-2 mt-2 pb-10">
              <AppText
                text="Daten"
                className=" font-weight_800 text-font-14 mb-2"
              />
              <ContentObject
                type="Typ"
                content="Einfamilienhaus (freistehend)"
              />
              <ContentObject type="Etagenanzahl" content="2" />
              <ContentObject type="Wohnfläche ca." content="172,5 m²" />
              <ContentObject type="Nutzfläche ca." content="80 m²" />
              <ContentObject type="Grundstück ca." content="1.592 m²" />
              <ContentObject type="Zimmer" content="7" />
              <ContentObject type="Schlafzimmer" content="3" />
              <ContentObject type="Badezimmer" content="2" />
            </View>
          </ScrollView>
          {!showBtnshowMore && (
            <View>
              <TouchableOpacity
                onPress={() => setShowMoreBasicRoom((pre) => !pre)}
                className=" -mt-7 ml-auto mr-2 w-4/12"
              >
                {!showMoreBasicRoom && (
                  <AppText
                    text="mehr ..."
                    className="text-purply_blue font-weight_700 text-right"
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
                className=" font-weight_800 text-font-14 mb-2"
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
              className=" -mt-7 ml-auto mr-2 w-4/12"
            >
              <AppText
                text="mehr ..."
                className="text-purply_blue font-weight_700 text-right"
              />
            </TouchableOpacity>
          </View>
          <View className="mx-2 mt-5 flex  flex-row items-center justify-around ">
            <View className="">
              <TouchableOpacity className="bg-black_1  h-12 w-12  items-center justify-center rounded-full ">
                <LoveIcon />
              </TouchableOpacity>
            </View>
            <TouchableOpacity className="bg-black_1 my-auto rounded-[24px]">
              <AppText
                text="Jetzt kontaktieren"
                className="font-weight_300 text-font-16  mt-auto px-20 py-4 text-center text-white"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <BottomNavBarPadding />
      </ScrollView>
    </ObjectDetailLayout>
  );
};
