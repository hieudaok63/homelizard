import { Button, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

export const SignOutButton = () => {
  const { signOut } = useAuth();
  return (
    <View className="rounded-lg border-2 border-gray-500 p-4">
      <Button
        title="Sign Out"
        onPress={() => {
          void signOut();
        }}
      />
    </View>
  );
};
