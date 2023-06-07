import { useState } from "react";
import { Switch, Text, View } from "react-native";
import HomeLizardSvg from "@assets/homelizard.svg";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { Button, StepProgress } from "~/components/ui";
import { type RootStackParams } from "~/screens/routes";
import { RegisterLayout } from "./_layout";

type IProps = NativeStackScreenProps<RootStackParams, "RegisterAgb">;

export const RegisterAgb = ({ navigation }: IProps) => {
  // local states
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  // functions
  const handlePressNext = () => {
    navigation.navigate("ProfilePictureEdit");
  };

  // main return
  return (
    <RegisterLayout>
      <View className="w-ful relative h-full px-5">
        <Text className="text-font-18 font-nunito-800 mt-5 text-center">
          AGB
        </Text>

        <View className="mt-16 w-full flex-row justify-center">
          <HomeLizardSvg />
        </View>

        <View className="absolute bottom-14 left-5 w-full">
          <View className="mb-28 w-full flex-row justify-between">
            <Switch
              value={isEnabled}
              onValueChange={(val) => {
                setIsEnabled(val);
              }}
              ios_backgroundColor="rgba(120, 120, 128, 0.32)"
              trackColor={{
                false: "rgba(120, 120, 128, 0.32)",
                true: "#32D74B",
              }}
              thumbColor="#fffff"
              className="mr-3"
            />
            <Text className="text-font-17 font-weight_300 text-right italic">
              Hiermit stimme ich den Homelizard AGB uneingeschränkt zu.
            </Text>
          </View>
          <View className="relative">
            <StepProgress width={isEnabled ? "w-9/12" : "w-7/12"} />
          </View>
          <Button
            title="Weiter"
            onPress={handlePressNext}
            className="rounded-full"
            disabled={!isEnabled}
          />
        </View>
      </View>
    </RegisterLayout>
  );
};
