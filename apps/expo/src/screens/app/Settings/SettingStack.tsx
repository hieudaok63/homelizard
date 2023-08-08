import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DeleteAccount } from "./DeleteAccount/DeleteAccount";
import { SettingScreen } from "./SettingScreen";

const Stack = createNativeStackNavigator();

const SettingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen
          name="SettingScreen"
          component={SettingScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
export default SettingStack;
