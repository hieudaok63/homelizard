import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useAuth } from "@clerk/clerk-expo";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { api } from "~/utils/api";
import { AnimatedHouse } from "~/components/ui";
import {
  useApplicationLoadingStore,
  useSearchWizardStore,
} from "~/zustand/store";
import { type RootStackParams } from "../RootStackParams";
import { SearchLayout } from "./_layout";

const resultNumberFound = [1, 3, 5];

type Props = NativeStackScreenProps<RootStackParams, "Results">;

const Results = ({ navigation }: Props) => {
  const { isSignedIn } = useAuth();
  const { t } = useTranslation("search");
  const [loadingHouse, setLoadingHouse] = useState(true);
  // trpc
  const trpc = api.useContext();
  const searchProfileMutation = api.search.searchProfile.useMutation();
  // zustand
  const setLoading = useApplicationLoadingStore((state) => state.setLoading);
  const resetSearchWizard = useSearchWizardStore((state) => state.reset);
  const searchWizardData = useSearchWizardStore((state) => state);

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (currentIndex === resultNumberFound.length - 1) {
      return;
    }

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === resultNumberFound.length - 1 ? 0 : prevIndex + 1,
      );
    }, 600);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]);

  useEffect(() => {
    if (!loadingHouse && !searchProfileMutation.isLoading) {
      if (isSignedIn) {
        navigation.navigate("AppStack", { screen: "Profile" });
        Toast.show({
          type: "success",
          text1: t("search.text.createSearchSuccess"),
        });
      } else {
        navigation.navigate("LoginSocial", { screen: "RegisterEmailPassword" });
      }
    }
  }, [loadingHouse, searchProfileMutation.isLoading]);

  useEffect(() => {
    if (isSignedIn) {
      setLoading(true);
      searchProfileMutation.mutate(
        {
          objectTypes: searchWizardData.objectTypes,
          livingAreaSize: searchWizardData?.livingArea,
          roomAmount: searchWizardData?.numberOfRooms,
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          latitude: (searchWizardData?.location)!.latitude,
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          longitude: (searchWizardData?.location)!.longitude,
          radius: searchWizardData?.radius,
          plotSize: searchWizardData?.plotSize,
          // TODO: check why dayjs is needed here
          availability: dayjs(searchWizardData.availabilityDate).toDate(),
          purchaseType: searchWizardData?.purchaseType,
          minPrice: 1, // hard code for now
          maxPrice: searchWizardData?.maxPrice,
          // hidden for now - WD-138
          // objectStyles: searchWizardData.objectStyles,
          // hidden for now - WD-158
          // startYearOfConstruction: searchWizardData?.yearOfConstructionStart,
          // endYearOfConstruction: searchWizardData?.yearOfConstructionEnd,
        },
        {
          async onSuccess() {
            setLoading(false);
            resetSearchWizard();
            await trpc.search.invalidate();
          },
          onError(error) {
            setLoading(false);
            Toast.show({
              type: "error",
              text1:
                error?.data?.zodError?.formErrors?.[0] ||
                "Something went wrong!",
            });
          },
        },
      );
    }
  }, []);

  // main return
  return (
    <SearchLayout>
      <View className="mb-4 h-5/6 items-center px-8 pt-8">
        <Text className="mb-6 text-center text-font-18 font-weight_800 text-black_1">
          {t("search.label.weSearch")}
        </Text>

        <Text className="mb-2 text-font-14 font-weight_800 text-black_1">
          {t("search.text.results").replace(
            "COUNT",
            resultNumberFound[currentIndex]?.toString() || "",
          )}
        </Text>
        <View className="flex-1 items-center justify-center">
          <AnimatedHouse
            numberOfRoom={searchWizardData.numberOfRooms}
            livingArea={searchWizardData.livingArea}
            plotSize={searchWizardData.plotSize}
            onSuccess={() => setLoadingHouse(false)}
          />
        </View>
      </View>
    </SearchLayout>
  );
};

export default Results;
