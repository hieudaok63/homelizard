import { Text, View } from "react-native";
import { Stack } from "expo-router";

import AuthIndicator from "~/components/dev/AuthIndicator";

const Home = () => {
  return (
    <View className="bg-[#1F104A]">
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full p-4">
        <Text className="text-3xl text-white">Home Page</Text>
        <AuthIndicator />
      </View>
    </View>
  );
};

export default Home;
