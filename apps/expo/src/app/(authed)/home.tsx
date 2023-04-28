import { Stack } from "expo-router";
import { View } from "react-native";
import AuthIndicator from "~/components/dev/AuthIndicator";

const Home = () => {
  return (
    <View className="bg-[#1F104A]">
      <View className="h-full w-full p-4">
        <Stack.Screen options={{ title: "Home Page" }} />
        <AuthIndicator />
      </View>
    </View>
  );
};

export default Home;