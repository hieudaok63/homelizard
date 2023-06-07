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
  ObjectStyleResult: undefined;
  Results: undefined;
  // Register
  RegisterEmailPassword: undefined;
  RegisterVerifyEmail: undefined;
  RegisterNameGender: undefined;
  RegisterAgb: undefined;
  // Profile picture
  ProfilePictureEdit: undefined;
};
