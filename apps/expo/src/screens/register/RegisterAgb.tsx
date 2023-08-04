import { useState } from "react";
import { Switch, Text, View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import HomeLizardSvg from "@assets/homelizard.svg";

import { StepProgressButton } from "~/components/ui";
import { type RootStackParams } from "~/screens/RootStackParams";
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
      <View className="relative h-full w-full px-5">
        <Text className="mt-5 text-center font-nunito-800 text-font-18">
          AGB
        </Text>

        <View className="mt-16 w-full flex-row justify-center">
          <HomeLizardSvg />
        </View>

        <View className="absolute bottom-12 w-full">
          <View className="mb-28 w-full flex-row justify-between px-6">
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
            <Text className="text-right text-font-17 font-weight_300 italic">
              Hiermit stimme ich den Homelizard AGB uneingeschränkt zu.
            </Text>
          </View>
        </View>
        <StepProgressButton
          disabled={!isEnabled}
          progress={isEnabled ? 100 : 70}
          title="Weiter"
          onPress={handlePressNext}
          variant="turquoise"
        />
      </View>
    </RegisterLayout>
  );
};
