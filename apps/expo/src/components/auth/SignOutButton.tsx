import {
  Text,
  TouchableOpacity,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useAuth } from "@clerk/clerk-expo";

import { useApplicationLoadingStore } from "~/zustand/store";

export const SignOutButton = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  const { signOut, isLoaded } = useAuth();
  const setLoadingApp = useApplicationLoadingStore((state) => state.setLoading);

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
    <TouchableOpacity className="p-4" style={style} onPress={signOutFunc}>
      <Text className=" w-full text-center text-lg text-white">Sign Out</Text>
    </TouchableOpacity>
  );
};
