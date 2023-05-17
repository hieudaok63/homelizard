import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";


import { type AppNavigationProps } from "~/components/navigation/useAppNavigation";
import { Button } from "~/components/ui/Button";

export type ProfileScreenProps = {
  num: number;
};

export const ProfileScreen = ({
  route,
  navigation,
}: AppNavigationProps<"Profile">) => {
  const { t } = useTranslation(["profile"]);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{t("profile:title")}</Text>
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
