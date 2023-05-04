import React from "react";
import { Text, View } from "react-native";
import { Stack } from "expo-router";

import { Button } from "~/components/ui/Button";

const ObjectType = () => {
  return (
    <View>
      <Stack.Screen name="../../" options={{ title: "Object Type" }} />
      <Text>ObjectType</Text>
      <Button title="Weiter" onPress="/search/location" />
    </View>
  );
};

export default ObjectType;
