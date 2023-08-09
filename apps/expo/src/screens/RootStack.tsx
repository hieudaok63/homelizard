import React from "react";
// register screens
import { useAuth } from "@clerk/clerk-expo";
// search screens
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { BackButton } from "~/components/navigation/BackButton";
import { useGetUserInfo } from "~/hooks/useGetUserInfo";
import Login from "./Login";
import LoginOrSignUp from "./LoginOrSignup";
import { ObjectDetail } from "./ObjectDetail";
import { type RootStackParams } from "./RootStackParams";
import AppStack from "./app/AppStack";
import { EditProfilePicture } from "./profilePicture";
import {
  RegisterAgb,
  RegisterEmailPassword,
  RegisterNameGender,
  RegisterVerifyEmail,
} from "./register";
import Availability from "./search/Availability";
import LivingArea from "./search/LivingArea";
import Location from "./search/Location";
import NumberOfRooms from "./search/NumberOfRooms";
import ObjectStyle from "./search/ObjectStyle";
import ObjectStyleResult from "./search/ObjectStyleResult";
import ObjectType from "./search/ObjectType";
import PlotSize from "./search/PlotSize";
import PriceRange from "./search/PriceRange";
import Results from "./search/Results";
import YearOfConstruction from "./search/YearOfConstruction";

const Stack = createNativeStackNavigator<RootStackParams>();

export function RootStack() {
  const { isSignedIn } = useAuth();

  useGetUserInfo(); // handle check user name and gender status

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

          <Stack.Screen
            name="ObjectDetail"
            component={ObjectDetail}
            options={{
              headerShown: false,
              headerLeft: () => <BackButton />,
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

          {/* search */}
          <Stack.Group>
            <Stack.Screen
              name="ObjectType"
              component={ObjectType}
              options={{
                headerLeft: () => (
                  <BackButton
                    screen={isSignedIn ? undefined : "LoginOrSignUp"}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="Location"
              component={Location}
              options={{
                headerLeft: () => <BackButton screen="ObjectType" />,
              }}
            />
            <Stack.Screen
              name="PlotSize"
              component={PlotSize}
              options={{
                headerLeft: () => <BackButton screen="Location" />,
              }}
            />
            <Stack.Screen
              name="LivingArea"
              component={LivingArea}
              options={{
                headerLeft: () => <BackButton screen="PlotSize" />,
              }}
            />
            <Stack.Screen
              name="NumberOfRooms"
              component={NumberOfRooms}
              options={{
                headerLeft: () => <BackButton screen="LivingArea" />,
              }}
            />
            <Stack.Screen
              name="YearOfConstruction"
              component={YearOfConstruction}
              options={{
                headerLeft: () => <BackButton screen="NumberOfRooms" />,
              }}
            />
            <Stack.Screen
              name="PriceRange"
              component={PriceRange}
              options={{
                headerLeft: () => <BackButton screen="YearOfConstruction" />,
              }}
            />
            <Stack.Screen
              name="Availability"
              component={Availability}
              options={{
                headerLeft: () => <BackButton screen="PriceRange" />,
              }}
            />
            <Stack.Screen
              name="ObjectStyle"
              component={ObjectStyle}
              options={{
                headerLeft: () => <BackButton screen="Availability" />,
              }}
            />
            <Stack.Screen
              name="ObjectStyleResult"
              component={ObjectStyleResult}
              options={{
                headerLeft: () => <BackButton screen="ObjectStyle" />,
              }}
            />
            <Stack.Screen
              name="Results"
              component={Results}
              options={{
                headerLeft: () => <BackButton screen="ObjectStyleResult" />,
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
        </>
      )}
    </Stack.Navigator>
  );
}
