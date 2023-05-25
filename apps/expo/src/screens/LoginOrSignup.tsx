import React from "react";
import { View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { Button } from "~/components/ui/Button";
import { type RootStackParams } from "./routes";

type Props = NativeStackScreenProps<RootStackParams, "LoginOrSignUp">;

const LoginOrSignup = ({ navigation }: Props) => (
  <View className="flex h-full items-center justify-center">
    <Button
      title="Log in"
      onPress={() => {
        navigation.navigate("Login");
      }}
    />
    <Button
      title="Create a new account"
      onPress={() => {
        navigation.navigate("RegisterEmailPassword");
      }}
    />
    <Button
      title="Search somthing"
      onPress={() => {
        navigation.navigate("ObjectType");
      }}
    />
  </View>
);

export default LoginOrSignup;
