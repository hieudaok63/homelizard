import { type BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { type CompositeScreenProps, useNavigation } from "@react-navigation/native"
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type TabStackParams } from "~/screens/app/routes";
import { type RootStackParams } from "~/screens/routes";

export type AppNavigationProps<Screen extends keyof TabStackParams > = CompositeScreenProps<
  BottomTabScreenProps<TabStackParams, Screen>,
  NativeStackScreenProps<RootStackParams>
>;

export const useAppNavigation = <Screen extends keyof TabStackParams>() => {
  return useNavigation<AppNavigationProps<Screen>>()
}