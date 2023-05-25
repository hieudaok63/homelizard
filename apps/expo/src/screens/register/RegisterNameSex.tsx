import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ArrowDownIcon from "@assets/icons/ArrowDownIcon.svg";
import QuestionCircleIcon from "@assets/icons/QuestionCircleIcon.svg";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { Button } from "~/components/ui";
import { BottomSheet } from "~/components/ui/BottomSheet";
import TextInput from "~/components/ui/input/TextInput";
import { useZodForm } from "~/hooks/useZodForm";
import { type RootStackParams } from "~/screens/routes";
import { RegisterLayout } from "./_layout";

// types
type IProps = NativeStackScreenProps<RootStackParams, "RegisterNameSex">;

const genderOptions = ["female", "male", "other"] as const;

// form schema
const formSchema = z.object({
  firstName: z.string().min(1, "This field is required"),
  lastName: z.string().min(1, "This field is required"),
  gender: z.enum(genderOptions),
});

export const RegisterNameSex = ({ navigation }: IProps) => {
  // local states
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const { t } = useTranslation();

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useZodForm({
    schema: formSchema,
  });

  // functions
  const onSubmit = handleSubmit((data) => {
    console.log(data); // for debug
    navigation?.navigate("RegisterAgb");
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
          <Text className="font-nunito-800 text-font-18 text-dark pl-16">
            Anrede und Name
          </Text>
        </View>

        <View className="flex gap-6">
          <View>
            <TouchableOpacity
              className="rounded-l-2xl rounded-t-2xl bg-white px-4 py-5"
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
              className="mx-6 h-3 rounded-t-full"
            />
            <LinearGradient
              colors={["#4AB0F7", "#317FEC"]}
              className="absolute mx-6 h-3 w-1/3 rounded-tl-full"
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
