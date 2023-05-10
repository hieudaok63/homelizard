import React from "react";
import { SafeAreaView, View } from "react-native";

import SignInWithOAuth from "~/components/auth/SignInWithOAuth";

const Login = () => {
  return (
    <SafeAreaView className="bg-[#2e026d] bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <View className="h-full w-full p-4">
        <SignInWithOAuth />
      </View>
    </SafeAreaView>
  );
};

export default Login;