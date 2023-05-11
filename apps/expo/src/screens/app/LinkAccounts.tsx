import { View } from "react-native";
import { Text } from "react-native-svg";

import { type AppNavigationProps } from "~/components/navigation/useAppNavigation";

export function HomeScreen({ navigation }: AppNavigationProps<"LinkAccounts">) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>LinkAccounts Screen</Text>
    </View>
  );
}
