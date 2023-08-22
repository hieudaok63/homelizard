import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { HomelizardLogo } from "@assets/icons";

import { useSearchWizardStore } from "~/zustand/store";
import { type RootStackParams } from "./RootStackParams";

type Props = NativeStackScreenProps<RootStackParams, "LoginOrSignUp">;

const LoginOrSignup = ({ navigation }: Props) => {
  const isSearchComplete = useSearchWizardStore((state) => state?.isCompleted);

  // functions
  const handlePressRegister = () => {
    if (!isSearchComplete) {
      navigation.navigate("ObjectType");
      return;
    }

    navigation?.navigate("Results");
  };

  const handlePressLoginOption = () => {
    navigation?.navigate("LoginSocial", { screen: "Login" });
  };

  return (
    <View className="flex h-full w-full items-center bg-[#F7FAFF] pt-[120px]">
      <HomelizardLogo />
      <Text className="nunito mb-48 text-2xl font-light text-[#26233299]">
        Wir finden deine Immobilie
      </Text>

      <TouchableOpacity
        onPress={handlePressLoginOption}
        className="w-[70%] items-center rounded-3xl  bg-white px-4 py-3 shadow-md"
      >
        <Text className=" nunito text-base font-normal  text-black ">
          Log in
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handlePressRegister}
        className="mt-11 w-[70%] items-center rounded-3xl  bg-[#262636] px-4 py-3 shadow-md"
      >
        <Text className=" nunito text-base font-normal  text-white ">
          Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginOrSignup;
