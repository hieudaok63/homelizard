import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { type RootStackParams } from "../routes";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "Results">;

const Results = ({ navigation }: Props) => {
  // functions
  const handlePressEmailOption = () => {
    navigation.navigate("RegisterEmailPassword");
  };

  // main return
  return (
    <SearchLayout>
      <KeyboardAwareScrollView>
        <View className="mb-4 px-8 pt-8">
          <Text className="font-weight_800 text-font-18 text-black_1 mb-6 text-center">
            Wir finden für dich
          </Text>

          <Text className="text-black_1 text-font-14 font-weight_800 mb-2">
            Wir konnten bereits 5 Objekte finden
          </Text>

          <Text className="text-black_1 pl-8 opacity-60">
            Melde dich jetzt an oder erstelle einen Account um Details der
            Objekte zu erhalten.
          </Text>
        </View>

        <View className="flex-1 flex-row items-center justify-center">
          <Text className="font-weight_400 text-font-14 mr-1 text-black">
            Oder nutzen sie
          </Text>
          <TouchableOpacity onPress={handlePressEmailOption}>
            <Text className="font-weight_500 text-font-14 text-blue_1">
              E-Mail
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SearchLayout>
  );
};

export default Results;
