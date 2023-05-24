import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { type RootStackParams } from "~/screens/routes";

// types
export type IProps = NativeStackScreenProps<
  RootStackParams,
  "ProfilePictureEdit"
>;

export const useModel = (props?: IProps) => {
  const navigation = useNavigation<RootStackParams>();

  // local states
  const [isSkipModalVisible, setIsSkipModalVisible] = useState<boolean>(false);

  // functions
  const goBack = () => navigation?.goBack();

  const showSkipModal = () => setIsSkipModalVisible(true);

  const hideSkipModal = () => setIsSkipModalVisible(false);

  const launchImageLibraryCallback = () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  // main return
  return {
    navigation,
    isSkipModalVisible,
    setIsSkipModalVisible,
    goBack,
    showSkipModal,
    hideSkipModal,
    launchImageLibraryCallback,
  };
};
