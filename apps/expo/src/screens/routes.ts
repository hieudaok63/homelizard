import { type NavigatorScreenParams } from "@react-navigation/native";
import { type TabStackParams } from "./app/routes";

export type RootStackParams = {
  // Tabstack
  AppStack: NavigatorScreenParams<TabStackParams>;
  LoginOrSignUp: undefined;
  Login: undefined;
  // Search
  ObjectType: undefined;
  Location: undefined;
  PlotSize: undefined;
  LivingArea: undefined;
  NumberOfRooms: undefined;
  YearOfConstruction: undefined;
  Availability: undefined;
  ObjectStyle: undefined;
  Results: undefined;
}