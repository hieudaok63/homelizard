import React from "react";
import { Text, View } from "react-native";
import MapView from "react-native-maps";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { Button } from "~/components/ui/Button";
import { type RootStackParams } from "../routes";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "Location">;

const Location = ({ navigation }: Props) => {
  return (
    <SearchLayout>
      <Text>Location</Text>
      <View className="p-4">
        <View className="aspect-square overflow-hidden rounded-full">
          <MapView className="h-full w-full" />
        </View>
      </View>
      <Button
        title="Weiter"
        onPress={() => {
          navigation.navigate("PlotSize");
        }}
      />
    </SearchLayout>
  );
};
export default Location;
