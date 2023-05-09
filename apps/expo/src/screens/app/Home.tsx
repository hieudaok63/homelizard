import { Button, View } from "react-native";
import { Text } from "react-native-svg";
import { type BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { type CompositeScreenProps } from "@react-navigation/native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { type RootStackParams } from "../routes";
import { type TabStackParams } from "./routes";

export type Props = CompositeScreenProps<
  BottomTabScreenProps<TabStackParams, "Home">,
  NativeStackScreenProps<RootStackParams>
>;

export function HomeScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Details"
        onPress={() => navigation.navigate("Profile", { num: 1 })}
      />
      <Button
        title="Logout"
        onPress={() => navigation.navigate("LoginOrSignUp")}
      />
    </View>
  );
}
