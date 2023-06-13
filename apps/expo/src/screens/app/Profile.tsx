import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import ImagePicker from "~/components/ImagePicker";
import { type AppNavigationProps } from "~/components/navigation/useAppNavigation";
import { Button } from "~/components/ui/Button";
import { useBackendUser } from "~/hooks/useBackendUser";

export type ProfileScreenProps = {
  num: number;
};

export const ProfileScreen = ({
  route,
  navigation,
}: AppNavigationProps<"Profile">) => {
  const { t } = useTranslation(["profile"]);
  const user = useBackendUser();

  // main return
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{t("profile:title")}</Text>
      <Text>{user?.email}</Text>
      <Text>{`${user?.firstName} ${user?.lastName}`}</Text>
      <Text>{user?.gender}</Text>
      <Text>{user?.id}</Text>

      <Text>Profile Screen {route.params.num}</Text>
      <Button
        title="Profile"
        onPress={() =>
          navigation.navigate("Profile", { num: route.params.num + 1 })
        }
      />
      <ImagePicker />
    </View>
  );
};
