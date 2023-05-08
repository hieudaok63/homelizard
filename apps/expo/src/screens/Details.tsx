import { Text, View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { type RootStackParams } from "./routes";
import { Button } from "~/components/ui/Button";

export type DetailsScreenProps = {
  num: number;
};

type Props = NativeStackScreenProps<RootStackParams, "Details">;

export const DetailsScreen = ({ route, navigation }: Props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen {route.params.num}</Text>
      <Button
        title="Details"
        onPress={() => navigation.push("Details", { num: route.params.num + 1 })}
      />
    </View>
  );
};
