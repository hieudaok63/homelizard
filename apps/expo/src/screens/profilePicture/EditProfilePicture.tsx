import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
// libs
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

// icons
import ArrowLeftIcon from "@assets/icons/ArrowLeftIcon.svg";
import PersonIcon_1 from "@assets/icons/PersonIcon_1.svg";
import PersonIcon_2 from "@assets/icons/PersonIcon_2.svg";
import PersonIcon_3 from "@assets/icons/PersonIcon_3.svg";
import QuestionCirleIcon from "@assets/icons/QuestionCircleIcon.svg";

import ImagePicker from "~/components/ImagePicker";
import { PopupModal } from "~/components/ui";
import { type RootStackParams } from "~/screens/RootStackParams";
import { ProfilePictureLayout } from "./_layout";

// types
type IProps = NativeStackScreenProps<RootStackParams, "ProfilePictureEdit">;

export const EditProfilePicture = ({ navigation }: IProps) => {
  // local states
  const [isSkipModalVisible, setIsSkipModalVisible] = useState<boolean>(false);

  // functions
  const goBack = () => navigation?.goBack();

  const showSkipModal = () => setIsSkipModalVisible(true);

  const hideSkipModal = () => setIsSkipModalVisible(false);

  const handleSkip = () => {
    hideSkipModal();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation?.navigate("AppStack");
  };

  // main return
  return (
    <ProfilePictureLayout>
      <View className="flex-row items-center justify-between px-5 pt-10">
        <TouchableOpacity onPress={goBack}>
          <ArrowLeftIcon />
        </TouchableOpacity>

        <View className="flex-row items-center">
          <TouchableOpacity onPress={showSkipModal}>
            <Text className="text-font-16 font-weight_400 text-black_xtra">
              SKIP
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="ml-3">
            <QuestionCirleIcon />
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-14 px-14">
        <Text className="mb-6 text-font-45 font-weight_400 text-black_xtra opacity-80">
          Your profile picture
        </Text>
        <Text className="text-font-17 font-weight_400 text-black_xtra  opacity-80">
          This will make it easier for your friends, family or co-workers to
          find you
        </Text>
      </View>

      <View className="mb-10 mt-6 flex-row items-center justify-center">
        <ImagePicker />
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
        top="30%"
      >
        <View className="p-4">
          <Text className="mb-1 text-center font-nunito-italic text-font-17 font-weight_200">
            Skip this step
          </Text>
          <Text className="text-black_extra text-font-13 font-weight_400">
            Would you like to jump directly to the homepage? Yo can always
            continue the personalization from your profile.
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleSkip}
          className="w-full flex-row items-center justify-center border-t border-color_gray"
        >
          <Text className="py-2.5 text-font-17 font-weight_200 italic text-blue_2">
            Skip
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={hideSkipModal}
          className="w-full flex-row items-center justify-center border-t border-color_gray pb-1"
        >
          <Text className="py-2.5 text-font-17 font-weight_400 text-blue_2">
            Continue personalizing
          </Text>
        </TouchableOpacity>
      </PopupModal>
    </ProfilePictureLayout>
  );
};
