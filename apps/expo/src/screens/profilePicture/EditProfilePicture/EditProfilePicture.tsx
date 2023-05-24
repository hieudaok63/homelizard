import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
// icons
import ArrowLeftIcon from "@assets/icons/ArrowLeftIcon.svg";
import CameraIcon from "@assets/icons/CameraIcon.svg";
import PersonIcon_1 from "@assets/icons/PersonIcon_1.svg";
import PersonIcon_2 from "@assets/icons/PersonIcon_2.svg";
import PersonIcon_3 from "@assets/icons/PersonIcon_3.svg";
import QuestionCirleIcon from "@assets/icons/QuestionCircleIcon.svg";

import { generateBoxShadowStyle } from "~/utils/helpers";
import { PopupModal } from "~/components/ui";
import { ProfilePictureLayout } from "../_layout";
import { useModel } from "./logic";

export const EditProfilePicture = () => {
  const {
    isSkipModalVisible,
    goBack,
    showSkipModal,
    hideSkipModal,
    launchImageLibraryCallback,
  } = useModel();

  // main return
  return (
    <ProfilePictureLayout>
      <View className="flex-row items-center justify-between px-5 pt-10">
        <TouchableOpacity onPress={goBack}>
          <ArrowLeftIcon />
        </TouchableOpacity>

        <View className="flex-row items-center">
          <TouchableOpacity onPress={showSkipModal}>
            <Text className="text-font-16 text-black_xtra font-weight_400">
              SKIP
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="ml-3">
            <QuestionCirleIcon />
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-14 px-14">
        <Text className="font-weight_400 text-font-45 text-black_xtra mb-6 opacity-80">
          Your profile picture
        </Text>
        <Text className="font-weight_400 text-font-17 text-black_xtra  opacity-80">
          This will make it easier for your friends, family or co-workers to
          find you
        </Text>
      </View>

      <View className="mb-10 mt-6 flex-row items-center justify-center">
        <TouchableOpacity
          onPress={launchImageLibraryCallback}
          style={{
            ...generateBoxShadowStyle({
              xOffset: 3,
              yOffset: 2,
              shadowColorIos: "#000000",
              shadowOpacity: 0.16,
              shadowRadius: 16,
              elevation: 4,
              shadowColorAndroid: "#000000",
            }),
          }}
          className="bg-grey_2 h-64 w-64 flex-row items-center justify-center rounded-l-full rounded-t-full"
        >
          <CameraIcon />
        </TouchableOpacity>
      </View>

      <View className="flex-row pl-10">
        <PersonIcon_1 className="mr-6" />
        <PersonIcon_2 className="mr-6" />
        <PersonIcon_3 className="mr-6" />
      </View>

      {/* skip popup modal */}
      <PopupModal
        modalVisible={isSkipModalVisible}
        hideModal={hideSkipModal}
        top={"30%"}
      >
        <View className="p-4">
          <Text className="font-nunito-italic font-weight_200 text-font-17 mb-1 text-center">
            Skip this step
          </Text>
          <Text className="text-black_extra font-weight_400 text-font-13">
            Would you like to jump directly to the homepage? Yo can always
            continue the personalisation from your profile.
          </Text>
        </View>
        <TouchableOpacity
          onPress={hideSkipModal}
          className="border-color_gray w-full flex-row items-center justify-center border-t"
        >
          <Text className="font-weight_200 text-blue_2 text-font-17 py-2.5 italic">
            Skip
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={hideSkipModal}
          className="border-color_gray w-full flex-row items-center justify-center border-t pb-1"
        >
          <Text className="font-weight_400 text-blue_2 text-font-17 py-2.5">
            Continue personalising
          </Text>
        </TouchableOpacity>
      </PopupModal>
    </ProfilePictureLayout>
  );
};
