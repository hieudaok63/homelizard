import React from "react";
import { Text } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { Button } from "~/components/ui/Button";
import { type RootStackParams } from "../routes";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "NumberOfRooms">;

const NumberOfRooms = ({ navigation }: Props) => {
  return (
    <SearchLayout>
      <Text>NumberOfRooms</Text>
      <Button
        title="Weiter"
        onPress={() => {
          navigation.navigate("YearOfConstruction");
        }}
      />
    </SearchLayout>
  );
};
export default NumberOfRooms;
