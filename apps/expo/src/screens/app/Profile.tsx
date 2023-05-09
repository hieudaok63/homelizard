import { Text, View } from "react-native";

import { Button } from "~/components/ui/Button";
import { type TabStackParams } from "./routes";
import { type BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type ProfileScreenProps = {
  num: number;
};

type Props = BottomTabScreenProps<TabStackParams, "Profile">;

export const ProfileScreen = ({ route, navigation }: Props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile Screen {route.params.num}</Text>
      <Button
        title="Profile"
        onPress={() =>
          navigation.navigate("Profile", { num: route.params.num + 1 })
        }
      />
    </View>
  );
};
