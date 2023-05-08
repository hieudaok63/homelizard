import { Button, View } from "react-native";
import { Text } from "react-native-svg";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { type RootStackParams } from "./routes";

export type Props = NativeStackScreenProps<RootStackParams, "Home">;

export function HomeScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Details"
        onPress={() => navigation.navigate("Details", { num: 1 })}
      />
    </View>
  );
}
