import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import { HomelizardLogo } from "@assets/icons";

import { useSearchWizardStore } from "~/zustand/store";
import { type RootStackParams } from "./RootStackParams";

type Props = NativeStackScreenProps<RootStackParams, "LoginOrSignUp">;

const LoginOrSignup = ({ navigation }: Props) => {
  const isSearchComplete = useSearchWizardStore((state) => state?.isCompleted);
  const { t } = useTranslation("auth");
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
        {t("slogan_weFind")}
      </Text>

      <TouchableOpacity
        onPress={handlePressLoginOption}
        className="w-[70%] items-center rounded-3xl  bg-white px-4 py-3 shadow-md"
      >
        <Text className=" nunito text-base font-normal  text-black ">
          {t("login.title")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handlePressRegister}
        className="mt-11 w-[70%] items-center rounded-3xl  bg-[#262636] px-4 py-3 shadow-md"
      >
        <Text className=" nunito text-base font-normal  text-white ">
          {t("signUp.title")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginOrSignup;
