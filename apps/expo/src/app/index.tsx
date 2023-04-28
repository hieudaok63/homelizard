import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import AuthIndicator from "~/components/dev/AuthIndicator";

const Index = () => {
  return (
    <SafeAreaView className="bg-[#1F104A]">
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full p-4">
        <Text className="mx-auto pb-2 text-5xl font-bold text-white">
          Create <Text className="text-pink-400">T3</Text> Turbo
        </Text>
        <Text className="font-nunito mt-2 text-4xl text-white">
          This is normal text
        </Text>
        <AuthIndicator />
      </View>
    </SafeAreaView>
  );
};

export default Index;
