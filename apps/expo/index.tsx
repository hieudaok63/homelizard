import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";

import ApplicationLoader from "~/ApplicationLoader";
import RootProvider from "~/RootProvider";
import { RootStack } from "./src/screens/RootStack";

export function App() {
  return (
    <>
      <RootProvider>
        <ApplicationLoader>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </ApplicationLoader>
      </RootProvider>
    </>
  );
}

registerRootComponent(App);
