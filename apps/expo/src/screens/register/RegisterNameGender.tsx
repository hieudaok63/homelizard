import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useUser } from "@clerk/clerk-expo";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { genderOptions, genderSchema } from "@homelizard/schema";

import ArrowDownIcon from "@assets/icons/ArrowDownIcon.svg";
import QuestionCircleIcon from "@assets/icons/QuestionCircleIcon.svg";

import { api } from "~/utils/api";
import { StepProgressButton } from "~/components/ui";
import { BottomSheet } from "~/components/ui/BottomSheet";
import TextInput from "~/components/ui/input/TextInput";
import { useDisableBackButton } from "~/hooks/useDisableBackButton";
import { useZodForm } from "~/hooks/useZodForm";
import { type RootStackParams } from "~/screens/RootStackParams";
import {
  useApplicationLoadingStore,
  useSearchWizardStore,
  useUserStore,
} from "~/zustand/store";
import { RegisterLayout } from "./_layout";

// types
type IProps = NativeStackScreenProps<RootStackParams, "RegisterNameGender">;

// form schema
const formSchema = z.object({
  firstName: z.string().min(1, "This field is required"),
  lastName: z.string().min(1, "This field is required"),
  gender: genderSchema,
});

export const RegisterNameGender = ({ navigation }: IProps) => {
  useDisableBackButton();

  const register = api.user.register.useMutation({
    onSuccess: async () => {
      const user = await trpc.client.user.userInfo.query();
      setUserInfo(user);

      // TODO: validate search wizard data
      // save search profile
      await searchTrpc.mutateAsync({
        objectType: searchWizardData.objectType!,
        objectStyles: searchWizardData?.objectStyles,
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
      });

      resetSearchWizard();
    },
  });
  const searchTrpc = api.search.searchProfile.useMutation();
  const setLoadingApp = useApplicationLoadingStore((state) => state.setLoading);
  const searchWizardData = useSearchWizardStore((state) => state);
  const resetSearchWizard = useSearchWizardStore((state) => state.reset);
  const setUserInfo = useUserStore((state) => state.setUser);

  const trpc = api.useContext();

  // local states
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const { t } = useTranslation();

  const { user, isLoaded } = useUser();

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useZodForm({
    schema: formSchema,
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: undefined,
    },
  });

  // functions
  const onSubmit = handleSubmit(async (data) => {
    if (!isLoaded || !user) return;

    try {
      setLoadingApp(true);
      await register.mutateAsync(data);

      // navigation?.navigate("RegisterAgb");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      console.log(err);
      Toast.show({
        type: "error",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        text1: err?.message || "Cannot save name and gender",
      });
    } finally {
      setLoadingApp(false);
      navigation?.navigate("RegisterAgb"); // hard code for now
    }
  });

  const openBottomSheet = () => {
    setShowBottomSheet(true);
  };

  const hideBottomSheet = () => {
    setShowBottomSheet(false);
  };

  // main return
  return (
    <RegisterLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex h-full justify-between px-6"
      >
        <View>
          <Text className="font-nunito-800 text-font-18 text-dark">
            Login : Registrierung
          </Text>
          <Text className="pl-16 font-nunito-800 text-font-18 text-dark">
            Anrede und Name
          </Text>
        </View>

        <View className="flex gap-6">
          <View>
            <TouchableOpacity
              className="rounded-l-2xl rounded-t-2xl bg-white px-4 py-4"
              onPress={openBottomSheet}
            >
              {watch("gender") ? (
                <>
                  <Text className="text-xs  text-placeholder">Anrede</Text>
                  <Text className="text-base  font-weight_600 text-black">
                    {t(`gender.${watch("gender")}`)}
                  </Text>
                </>
              ) : (
                <Text className="text-base  font-weight_600 text-placeholder">
                  Anrede
                </Text>
              )}
            </TouchableOpacity>
            {errors?.gender && (
              <Text className="mt-1 pl-2 text-red-700">
                {errors?.gender?.message}
              </Text>
            )}
          </View>

          <TextInput control={control} name="firstName" placeholder="Vorname" />
          <TextInput control={control} name="lastName" placeholder="Nachname" />
        </View>

        <View>
          <StepProgressButton
            variant="turquoise"
            progress={60}
            title="Weiter"
            onPress={onSubmit}
          />
        </View>
      </KeyboardAvoidingView>

      {/* bottom menu */}
      <BottomSheet
        show={showBottomSheet}
        height={428}
        onOuterClick={hideBottomSheet}
        setShow={setShowBottomSheet}
      >
        <View>
          <View className="flex-row justify-between border-b border-color_gray p-6">
            <TouchableOpacity onPress={hideBottomSheet}>
              <ArrowDownIcon fill="#000000" />
            </TouchableOpacity>
            <Text className="text-font-24 font-weight_400 text-placeholder">
              Anrede
            </Text>
            <TouchableOpacity>
              <QuestionCircleIcon />
            </TouchableOpacity>
          </View>

          {genderOptions?.map((item) => (
            <TouchableOpacity
              key={item}
              className="flex-row justify-center border-b border-color_gray py-4"
              onPress={() => {
                setValue("gender", item, { shouldValidate: true });
                hideBottomSheet();
              }}
            >
              <Text className="text-font-24 font-weight_400 text-blue_1">
                {t(`gender.${item}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheet>
    </RegisterLayout>
  );
};
