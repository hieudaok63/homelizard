import { registerRootComponent } from "expo";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";

import ApplicationLoader from "~/ApplicationLoader";
import RootProvider from "~/RootProvider";
import { RootStack } from "./src/screens/RootStack";

let App = () => {
  return (
    <RootProvider>
      <ApplicationLoader>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </ApplicationLoader>
    </RootProvider>
  );
};

if (__DEV__ && Constants.expoConfig?.extra?.EXPO_PUBLIC_STORYBOOK_ENABLED === "true") {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-var-requires
  App = require("./.storybook").default;
}

registerRootComponent(App);
