import { type BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  useNavigation,
  type CompositeScreenProps,
} from "@react-navigation/native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { type RootStackParams } from "~/screens/RootStackParams";
import { type TabStackParams } from "~/screens/app/routes";

export type AppNavigationProps<Screen extends keyof TabStackParams> =
  CompositeScreenProps<
    BottomTabScreenProps<TabStackParams, Screen>,
    NativeStackScreenProps<RootStackParams>
  >;

export const useAppNavigation = <Screen extends keyof TabStackParams>() => {
  return useNavigation<AppNavigationProps<Screen>["navigation"]>();
};
