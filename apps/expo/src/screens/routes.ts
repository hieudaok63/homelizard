import { type NavigatorScreenParams } from "@react-navigation/native";

import { type TabStackParams } from "./app/routes";

export type RootStackParams = {
  navigate: (arg0: string) => void;
  goBack: () => void;
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
  // Register
  RegisterEmailPassword: undefined;
  RegisterNameSex: undefined;
  RegisterAgb: undefined;
  // Profile picture
  ProfilePictureEdit: undefined;
};
