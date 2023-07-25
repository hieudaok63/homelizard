import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  AddressSection,
  BasicInfoSection,
  CurriculumVitaeSection,
  EmailAndWebSection,
  ListBasicSection,
  LocationSection,
  MobilePhoneSection,
  PlaceOfWorkSection,
} from "./BasicInformation";
import { ListFavoriteSection } from "./Favourite";
import { ListFinanceSection } from "./Finance";
import { ProfileScreen } from "./ProfileScreen";
import { ListSearchHistorySection } from "./SearchHistory";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BasicInfoSection"
          component={BasicInfoSection}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ListBasicSection"
          component={ListBasicSection}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="MobilePhoneSection"
          component={MobilePhoneSection}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EmailAndWebSection"
          component={EmailAndWebSection}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddressSection"
          component={AddressSection}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PlaceOfWorkSection"
          component={PlaceOfWorkSection}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CurriculumVitaeSection"
          component={CurriculumVitaeSection}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ListFinanceSection"
          component={ListFinanceSection}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ListSearchHistorySection"
          component={ListSearchHistorySection}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ListFavoriteSection"
          component={ListFavoriteSection}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LocationSection"
          component={LocationSection}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default ProfileStack;
