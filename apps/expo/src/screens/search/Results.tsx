import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useAuth } from "@clerk/clerk-expo";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";

import { api } from "~/utils/api";
import { StepProgressButton } from "~/components/ui";
import { getCountScreen } from "~/utils";
import {
  useApplicationLoadingStore,
  useSearchWizardStore,
} from "~/zustand/store";
import { type RootStackParams } from "../RootStackParams";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "Results">;

const Results = ({ navigation }: Props) => {
  const { isSignedIn } = useAuth();
  // trpc
  const trpc = api.useContext();
  const searchProfileMutation = api.search.searchProfile.useMutation();
  // zustand
  const setLoading = useApplicationLoadingStore((state) => state.setLoading);
  const resetSearchWizard = useSearchWizardStore((state) => state.reset);
  const searchWizardData = useSearchWizardStore((state) => state);

  // functions
  const handlePressEmailOption = () => {
    navigation.navigate("RegisterEmailPassword");
  };

  const handleClickGetObjects = async () => {
    setLoading(true);

    await searchProfileMutation.mutateAsync(
      {
        objectType: searchWizardData.objectType!,
        // objectStyles:searchWizardData.objectStyles,
        //hidden for now - WD-138
        objectStyles: ["bohemian"],
        livingAreaSize: searchWizardData?.livingArea,
        roomAmount: searchWizardData?.numberOfRooms,
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        latitude: (searchWizardData?.location)!.latitude,
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        longitude: (searchWizardData?.location)!.longitude,
        radius: searchWizardData?.radius,
        plotSize: searchWizardData?.plotSize,
        startYearOfConstruction: searchWizardData?.yearOfConstructionStart,
        endYearOfConstruction: searchWizardData?.yearOfConstructionEnd,
        // TODO: check why dayjs is needed here
        availability: dayjs(searchWizardData.availabilityDate).toDate(),
        purchaseType: searchWizardData?.purchaseType,
        minPrice: 1, // hard code for now
        maxPrice: searchWizardData?.maxPrice,
      },
      {
        async onSuccess() {
          // @ts-ignore
          navigation.navigate("Profile");
          setLoading(false);
          Toast.show({
            type: "success",
            text1: "Created new search profile!",
          });
          resetSearchWizard();
          await trpc.search.invalidate();
        },
        onError(error) {
          setLoading(false);
          Toast.show({
            type: "error",
            text1:
              error?.data?.zodError?.formErrors?.[0] || "Something went wrong!",
          });
        },
      },
    );
  };
  // main return
  return (
    <SearchLayout>
      {isSignedIn ? (
        <>
          <View className="mb-4 h-5/6 items-center justify-center px-8 pt-8">
            <Text className="mb-6 text-center text-font-18 font-weight_800 text-black_1">
              Wir finden für dich
            </Text>

            <Text className="mb-2 text-font-14 font-weight_800 text-black_1">
              Wir konnten bereits 5 Objekte finden
            </Text>
          </View>

          <StepProgressButton
            title="Get objects"
            progress={getCountScreen("Results")}
            onPress={handleClickGetObjects}
            variant="turquoise"
          />
        </>
      ) : (
        <>
          <View className="mb-4 px-8 pt-8">
            <Text className="mb-6 text-center text-font-18 font-weight_800 text-black_1">
              Wir finden für dich
            </Text>

            <Text className="mb-2 text-font-14 font-weight_800 text-black_1">
              Wir konnten bereits 5 Objekte finden
            </Text>

            <Text className="pl-8 text-black_1 opacity-60">
              Melde dich jetzt an oder erstelle einen Account um Details der
              Objekte zu erhalten.
            </Text>
          </View>

          <View className="flex-row items-center justify-center">
            <Text className="mr-1 text-font-14 font-weight_400 text-black">
              Oder nutzen sie
            </Text>
            <TouchableOpacity onPress={handlePressEmailOption}>
              <Text className="text-font-14 font-weight_500 text-blue_1">
                E-Mail
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SearchLayout>
  );
};

export default Results;
