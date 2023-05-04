import React from "react";
import { Text, View } from "react-native";

import { Button } from "~/components/ui/Button";

const Results = () => {
  return (
    <View>
      <Text>Results</Text>
      <Button title="Weiter" onPress="/home" />
    </View>
  );
};

export default Results;
