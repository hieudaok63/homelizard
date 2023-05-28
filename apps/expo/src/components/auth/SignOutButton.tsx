import { Button, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

import { useBoundStore } from "~/zustand/store";

export const SignOutButton = () => {
  const { signOut, isLoaded } = useAuth();
  const setLoadingApp = useBoundStore((state) => state.setLoading);
  const signOutFunc = async () => {
    if (!isLoaded) return;

    try {
      setLoadingApp(true);
      await signOut();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingApp(false);
    }
  };
  return (
    <View className="rounded-lg border-2 border-gray-500 p-4">
      <Button title="Sign Out" onPress={signOutFunc} />
    </View>
  );
};
