import React from "react";
import { Text } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { Button } from "~/components/ui/Button";
import { type RootStackParams } from "../routes";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "PlotSize">;

const PlotSize = ({ navigation }: Props) => {
  return (
    <SearchLayout>
      <Text>PlotSize</Text>
      <Button
        title="Weiter"
        onPress={() => {
          navigation.navigate("LivingArea");
        }}
      />
    </SearchLayout>
  );
};
export default PlotSize;
