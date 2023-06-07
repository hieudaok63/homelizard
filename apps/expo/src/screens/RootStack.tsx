import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// search screens
import { useCheckNameGender } from "~/hooks/useCheckNameGender";
import Login from "./Login";
import LoginOrSignUp from "./LoginOrSignup";
import AppStack from "./app/AppStack";
import { EditProfilePicture } from "./profilePicture";
// register screens
import {
  RegisterAgb,
  RegisterEmailPassword,
  RegisterNameGender,
  RegisterVerifyEmail,
} from "./register";
import { type RootStackParams } from "./routes";
import Availability from "./search/Availability";
import LivingArea from "./search/LivingArea";
import Location from "./search/Location";
import NumberOfRooms from "./search/NumberOfRooms";
import ObjectStyle from "./search/ObjectStyle";
import ObjectStyleResult from "./search/ObjectStyleResult";
import ObjectType from "./search/ObjectType";
import PlotSize from "./search/PlotSize";
import Results from "./search/Results";
import YearOfConstruction from "./search/YearOfConstruction";

const Stack = createNativeStackNavigator<RootStackParams>();

export function RootStack() {
  const { isSignedIn } = useAuth();

  useCheckNameGender(); // handle check user name and gender status

  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        animation: "slide_from_right",
        headerTitle: "",
      }}
    >
      {isSignedIn ? (
        <>
          <Stack.Screen
            name="AppStack"
            component={AppStack}
            options={{
              headerShown: false,
            }}
          />

          {/* register basic information */}
          <Stack.Group>
            <Stack.Screen
              name="RegisterNameGender"
              component={RegisterNameGender}
              options={{ headerBackVisible: false }}
            />
            <Stack.Screen name="RegisterAgb" component={RegisterAgb} />
          </Stack.Group>

          {/* profile picture */}
          <Stack.Group>
            <Stack.Screen
              name="ProfilePictureEdit"
              component={EditProfilePicture}
              options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: "red",
                },
              }}
            />
          </Stack.Group>
        </>
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

          {/* register email and password */}
          <Stack.Group>
            <Stack.Screen
              name="RegisterEmailPassword"
              component={RegisterEmailPassword}
            />
            <Stack.Screen
              name="RegisterVerifyEmail"
              component={RegisterVerifyEmail}
            />
          </Stack.Group>

          {/* search */}
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
            <Stack.Screen
              name="ObjectStyleResult"
              component={ObjectStyleResult}
            />
            <Stack.Screen name="Results" component={Results} />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
}
