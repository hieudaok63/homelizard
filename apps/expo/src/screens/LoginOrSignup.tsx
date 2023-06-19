/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { TransparentHeaderSafeView } from "~/components/ui";
import { useSearchWizardStore } from "~/zustand/store";
import { type RootStackParams } from "./routes";

type Props = NativeStackScreenProps<RootStackParams, "LoginOrSignUp">;

const LoginOrSignup = ({ navigation }: Props) => {
  const resetSearchWizard = useSearchWizardStore((state) => state?.reset);
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
    navigation?.navigate("Login");
  };

  return (
    <TransparentHeaderSafeView>
      <View className="flex h-full w-full items-center justify-center">
        <TouchableOpacity
          className="flex-row items-center justify-center"
          onPress={handlePressLoginOption}
        >
          <Image source={require("@assets/OAuth.png")} alt="oauth" />
        </TouchableOpacity>
        <View className="flex-row items-center justify-center">
          <Text className="font-weight_400 text-font-14 mr-1 text-black">
            Oder nutzen sie
          </Text>
          <TouchableOpacity onPress={handlePressLoginOption}>
            <Text className="font-weight_500 text-font-14 text-blue_1">
              E-Mail
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-center">
          <Text className="font-weight_400 text-font-14 mr-1 text-black">
            Sie haben kein Konto?
          </Text>
          <TouchableOpacity onPress={handlePressRegister}>
            <Text className="font-weight_500 text-font-14 text-blue">
              Jetzt registrieren
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={resetSearchWizard} className="bg-green">
          <Text>reset seacrh (using for dev)</Text>
        </TouchableOpacity>
      </View>
    </TransparentHeaderSafeView>
  );
};

export default LoginOrSignup;
