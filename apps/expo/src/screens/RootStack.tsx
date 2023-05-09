import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./Login";
import LoginOrSignUp from "./LoginOrSignup";
import AppStack from "./app/AppStack";
import { type RootStackParams } from "./routes";
import Availability from "./search/Availability";
import LivingArea from "./search/LivingArea";
import Location from "./search/Location";
import NumberOfRooms from "./search/NumberOfRooms";
import ObjectStyle from "./search/ObjectStyle";
import ObjectType from "./search/ObjectType";
import PlotSize from "./search/PlotSize";
import Results from "./search/Results";
import YearOfConstruction from "./search/YearOfConstruction";

const Stack = createNativeStackNavigator<RootStackParams>();

export function RootStack() {
  const { isSignedIn } = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
      }}
    >
      {isSignedIn ? (
        <Stack.Screen
          name="AppStack"
          component={AppStack}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <>
          <Stack.Screen
            name="LoginOrSignUp"
            component={LoginOrSignUp}
            options={{
              headerTitle: "Login",
              headerShown: false,
              contentStyle: {
                backgroundColor: "white",
              },
            }}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Group>
            <Stack.Screen name="ObjectType" component={ObjectType} />
            <Stack.Screen name="Location" component={Location} />
            <Stack.Screen name="PlotSize" component={PlotSize} />
            <Stack.Screen name="LivingArea" component={LivingArea} />
            <Stack.Screen name="NumberOfRooms" component={NumberOfRooms} />
            <Stack.Screen
              name="YearOfConstruction"
              component={YearOfConstruction}
            />
            <Stack.Screen name="Availability" component={Availability} />
            <Stack.Screen name="ObjectStyle" component={ObjectStyle} />
            <Stack.Screen name="Results" component={Results} />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
}
