import React from "react";
import { Text } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { Button } from "~/components/ui/Button";
import { type RootStackParams } from "../routes";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "ObjectStyle">;

const ObjectStyle = ({ navigation }: Props) => {
  return (
    <SearchLayout>
      <Text>ObjectStyle</Text>
      <Button
        title="Weiter"
        onPress={() => {
          navigation.navigate("Results");
        }}
      />
    </SearchLayout>
  );
};
export default ObjectStyle;
