import { Button, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import { SignOutButton } from "~/components/auth/SignOutButton";
import { type AppNavigationProps } from "~/components/navigation/useAppNavigation";

export function HomeScreen({ navigation }: AppNavigationProps<"Home">) {
  const { t } = useTranslation("home");

  return (
    <View className="flex h-full items-center justify-center">
      <Text>Home Screen</Text>
      <Text>{t("title")}</Text>
      <Button
        title="Details"
        onPress={() => navigation.navigate("Profile", { num: 1 })}
      />
      <Button
        title="Search somthing"
        onPress={() => {
          navigation.navigate("ObjectType");
        }}
      />
      <SignOutButton />
    </View>
  );
}
