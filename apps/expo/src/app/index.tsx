import React from "react";
import { Text, View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

import { Button } from "~/components/ui/Button";
import { Stack } from "expo-router";

const Index = () => {
  const headerHeight = useHeaderHeight();
  return (
    <View
      className="h-full w-full p-4"
      style={{
        marginTop: headerHeight,
      }}
    >
      <Stack.Screen options={{ title: "" }} />
      <Text className="mx-auto pb-2 text-5xl font-bold text-black">
        Create <Text className="text-pink-400">T3</Text> Turbo
      </Text>
      <Button title="Log in" onPress="/login" />
      <Button title="Create a new account" onPress="/search/object-type" />
      <Button title="example" onPress="/t3-example" />
      {/* <Link href="/login">
          <Text className="font-nunito mt-2 text-4xl text-white">Log in</Text>
        </Link>
        <Link href="/search/object-type">
          <Text className="font-nunito mt-2 text-4xl text-white">
            Create a new account
          </Text>
        </Link> */}
    </View>
  );
};

export default Index;
