import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ApplicationLoader from "~/ApplicationLoader";
import RootProvider from "~/RootProvider";
import { type RootStackParams } from "~/screens/routes";
import { DetailsScreen } from "./src/screens/Details";
import { HomeScreen } from "./src/screens/Home";

const Stack = createNativeStackNavigator<RootStackParams>();

// Must be exported or Fast Refresh won't update the context
export function App() {
  return (
    <RootProvider>
      <ApplicationLoader>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationLoader>
    </RootProvider>
  );
}

registerRootComponent(App);
