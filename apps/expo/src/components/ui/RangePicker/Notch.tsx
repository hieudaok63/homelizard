import React from "react";
import { StyleSheet, View } from "react-native";

const Notch = () => {
  return <View style={styles.root} />;
};

export default Notch;

const styles = StyleSheet.create({
  root: {
    width: 8,
    height: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#4499ff",
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
});
