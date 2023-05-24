import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";
import ArrowDownIcon from "@assets/icons/ArrowDownIcon.svg";
import QuestionCircleIcon from "@assets/icons/QuestionCircleIcon.svg";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { Controller, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { AppInput, Button } from "~/components/ui";
import { BottomSheet } from "~/components/ui/BottomSheet";
import { useZodForm } from "~/hooks/useZodForm";
import { type RootStackParams } from "~/screens/routes";
import { RegisterLayout } from "./_layout";

// types
type IProps = NativeStackScreenProps<RootStackParams, "RegisterNameSex">;

// form schema
const formSchema = z.object({
  first_name: z.string().min(1, "This field is required"),
  last_name: z.string().min(1, "This field is required"),
  sex: z.string().min(1, "This field is required"),
});

type FormSchemaType = z.infer<typeof formSchema>;

const salutationOptions: string[] = ["Frau", "Herr", "Divers"];

export const RegisterNameSex = ({ navigation }: IProps) => {
  // local states
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useZodForm<FormSchemaType>({
    schema: formSchema,
    defaultValues: {
      first_name: "",
      last_name: "",
      sex: "",
    },
  });

  // functions
  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log(data); // for debug
    navigation?.navigate("RegisterAgb");
  };

  const openBottomSheet = () => {
    setShowBottomSheet(true);
  };

  const hideBottomSheet = () => {
    setShowBottomSheet(false);
  };

  // main return
  return (
    <RegisterLayout>
      <KeyboardAwareScrollView>
        <View className="h-full w-full px-5 pb-14">
          <Text className="font-nunito-800 text-font-18 text-dark">
            Login : Registrierung
          </Text>
          <Text className="font-nunito-800 text-font-18 text-dark pl-16">
            Anrede und Name
          </Text>

          <View>
            <TouchableOpacity
              className="mt-32 rounded-l-2xl rounded-t-2xl bg-white px-4 py-5"
              onPress={openBottomSheet}
            >
              {watch("sex") ? (
                <>
                  <Text className="text-placeholder  text-xs">Anrede</Text>
                  <Text className="font-weight_600  text-base text-black">
                    {watch("sex")}
                  </Text>
                </>
              ) : (
                <Text className="font-weight_600  text-placeholder text-base">
                  Anrede
                </Text>
              )}
            </TouchableOpacity>
            {errors?.sex ? (
              <Text className="mt-1 pl-2 text-red-700">
                {errors?.sex?.message}
              </Text>
            ) : null}
          </View>

          <Controller
            control={control}
            name="first_name"
            render={({ field: { onChange, value } }) => (
              <AppInput
                placeholder="Vorname"
                className="mt-5"
                value={value}
                onChangeText={onChange}
                error={errors?.first_name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="last_name"
            render={({ field: { onChange, value } }) => (
              <AppInput
                placeholder="Nachname"
                className="mt-5"
                value={value}
                onChangeText={onChange}
                error={errors?.last_name?.message}
              />
            )}
          />

          <View className="mt-48 w-full">
            <View className="relative">
              <LinearGradient
                colors={["#F5F7F9", "#ECEEEF"]}
                className=" h-3 w-full rounded-t-full"
              />
              <LinearGradient
                colors={["#4AB0F7", "#317FEC"]}
                className="absolute h-3 w-1/3 rounded-tl-full"
              />
            </View>
            <Button
              title="Weiter"
              onPress={handleSubmit(onSubmit)}
              className="rounded-full"
            />
          </View>
        </View>
      </KeyboardAwareScrollView>

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

          {salutationOptions?.map((item) => (
            <TouchableOpacity
              key={item}
              className="border-color_gray flex-row justify-center border-b py-4"
              onPress={() => {
                setValue("sex", item, { shouldValidate: true });
                hideBottomSheet();
              }}
            >
              <Text className="text-blue text-font-24 font-weight_400">
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheet>
    </RegisterLayout>
  );
};
