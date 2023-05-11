import { Button, View } from "react-native";
import { Text } from "react-native-svg";

import { SignOutButton } from "~/components/auth/SignOutButton";
import { type AppNavigationProps } from "~/components/navigation/useAppNavigation";

export function HomeScreen({ navigation }: AppNavigationProps<"Home">) {
  return (
    <View className="flex h-full items-center justify-center bg-lime-100">
      <View className="flex h-full items-center justify-center">
        <Text>Home Screen</Text>
        <Button
          title="Details"
          onPress={() => navigation.navigate("Profile", { num: 1 })}
        />
        <SignOutButton />
      </View>
      {/* <TabBar  /> */}
    </View>
  );
}
