import React from "react";
import { ActivityIndicator, View } from "react-native";

type IFullScreenloading = {
  status: boolean;
};

export const FullScreenLoading = (props: IFullScreenloading) => {
  const { status } = props;
  if (status) {
    return (
      <View
        className="absolute bottom-0 left-0 right-0 top-0 z-50 items-center justify-center bg-black opacity-70"
        style={{
          elevation: 999,
        }}
      >
        <ActivityIndicator size="large" color={"#262636"} />
      </View>
    );
  } else {
    return null;
  }
};
