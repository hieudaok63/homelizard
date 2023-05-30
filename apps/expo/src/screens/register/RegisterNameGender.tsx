import { useEffect, useState } from "react";
import {
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ArrowDownIcon from "@assets/icons/ArrowDownIcon.svg";
import QuestionCircleIcon from "@assets/icons/QuestionCircleIcon.svg";
import { useUser } from "@clerk/clerk-expo";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { genderOptions, genderSchema } from "@homelizard/schema";

import { api } from "~/utils/api";
import { Button } from "~/components/ui";
import { BottomSheet } from "~/components/ui/BottomSheet";
import TextInput from "~/components/ui/input/TextInput";
import { useZodForm } from "~/hooks/useZodForm";
import { type RootStackParams } from "~/screens/routes";
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
  const register = api.user.register.useMutation();

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
    console.log(data); // for debug

    if (!isLoaded || !user) return;

    try {
      await register.mutateAsync(data);
      navigation?.navigate("RegisterAgb");
    } catch (err: unknown) {
      console.error(JSON.stringify(err, null, 2));
      console.log(err);
    }
  });

  const openBottomSheet = () => {
    setShowBottomSheet(true);
  };

  const hideBottomSheet = () => {
    setShowBottomSheet(false);
  };

  const backBtnHandlerFunc = () => {
    if (showBottomSheet) hideBottomSheet();
    return true;
  };

  // effects
  // prevent the hardware back button
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backBtnHandlerFunc);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backBtnHandlerFunc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Text className="font-nunito-800 text-font-18 text-dark pl-16">
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
                  <Text className="text-placeholder  text-xs">Anrede</Text>
                  <Text className="font-weight_600  text-base text-black">
                    {t(`gender.${watch("gender")}`)}
                  </Text>
                </>
              ) : (
                <Text className="font-weight_600  text-placeholder text-base">
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
          <View className="relative">
            <LinearGradient
              colors={["#F5F7F9", "#ECEEEF"]}
              className="h-3 rounded-t-full"
            />
            <LinearGradient
              colors={["#4AB0F7", "#317FEC"]}
              className="absolute h-3 w-1/3 rounded-tl-full"
            />
          </View>
          <Button title="Weiter" onPress={onSubmit} className="rounded-full" />
        </View>
      </KeyboardAvoidingView>

      {/* bottom menu */}
      <BottomSheet
        show={showBottomSheet}
        height={428}
        onOuterClick={hideBottomSheet}
      >
        <View>
          <View className="border-color_gray flex-row justify-between border-b p-6">
            <TouchableOpacity onPress={hideBottomSheet}>
              <ArrowDownIcon />
            </TouchableOpacity>
            <Text className="text-placeholder text-font-24 font-weight_400">
              Anrede
            </Text>
            <TouchableOpacity>
              <QuestionCircleIcon />
            </TouchableOpacity>
          </View>

          {genderOptions?.map((item) => (
            <TouchableOpacity
              key={item}
              className="border-color_gray flex-row justify-center border-b py-4"
              onPress={() => {
                setValue("gender", item, { shouldValidate: true });
                hideBottomSheet();
              }}
            >
              <Text className="text-blue text-font-24 font-weight_400">
                {t(`gender.${item}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheet>
    </RegisterLayout>
  );
};
