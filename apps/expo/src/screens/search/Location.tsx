import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text } from "react-native";

import { Button } from "~/components/ui/Button";
import { type RootStackParams } from "../routes";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "Location">;

const Location = ({ navigation }: Props) => {
  return (
    <SearchLayout>
      <Text>Location</Text>
      <Button title="Weiter" onPress={() => {
        navigation.navigate("PlotSize");
      }} />
    </SearchLayout>
  );
};
export default Location;
