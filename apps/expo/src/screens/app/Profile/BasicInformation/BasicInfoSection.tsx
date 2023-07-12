import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { genderOptions } from "@homelizard/schema";

import ArrowDownIcon from "@assets/icons/ArrowDownIcon.svg";
import DefaultYellowIcon from "@assets/icons/DefaultYellowIcon.svg";
import IconPlus from "@assets/icons/IconPlus.svg";
import QuestionCircleIcon from "@assets/icons/QuestionCircleIcon.svg";

import { DatePickerProfile } from "~/components/Profile";
import { BottomSheet } from "~/components/ui";
import { HeaderForm, LayoutForm } from "~/components/ui/Profile";
import InputProfile from "~/components/ui/input/InputProfile";
import InputSelectDate from "~/components/ui/input/InputSelectDate";
import InputSelectGender from "~/components/ui/input/InputSelectGender";
import { useZodForm } from "~/hooks/useZodForm";
import { LayoutBasicInfo } from "./_layout";

export const BasicInfoSection = () => {
  const formSchema = z.object({
    title: z.string(),
    first_name: z.string(),
    middle_name: z.string(),
    last_name: z.string(),
    suffix: z.string(),
    gender: z.string(),
    birth_day: z.string(),
  });
  const { handleSubmit, control } = useZodForm({
    schema: formSchema,
    defaultValues: {
      title: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      suffix: "",
      gender: "",
      birth_day: "",
    },
  });
  const { t } = useTranslation();

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleShowDatePicker = () => setShowDatePicker(true);
  const handleHideDatePicker = () => setShowDatePicker(false);
  const handleShowGenderPicker = () => setShowBottomSheet(true);
  const handleHideGenderDatePicker = () => setShowBottomSheet(false);

  return (
    <LayoutBasicInfo>
      <LayoutForm>
        <KeyboardAwareScrollView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="mt-5 h-[120%] rounded-[45px] bg-white">
            <HeaderForm
              iconLeft={<DefaultYellowIcon />}
              title="Basisdaten"
              progress={50}
              variant="yellow"
            />
            <InputProfile
              name="title"
              control={control}
              placeholder="Add title"
              label="Title"
              rightIconProps={<IconPlus />}
            />
            <InputProfile
              name="first_name"
              control={control}
              placeholder="Add First name"
              label="First name"
              rightIconProps={<IconPlus />}
            />
            <InputProfile
              name="middle_name"
              control={control}
              placeholder="Add Middle name"
              label="Middle Name"
              rightIconProps={<IconPlus />}
            />
            <InputProfile
              name="last_name"
              control={control}
              placeholder="Add Last name"
              label="Last name"
              rightIconProps={<IconPlus />}
            />
            <InputProfile
              name="suffix"
              control={control}
              placeholder="Add Suffix"
              label="Suffix"
              rightIconProps={<IconPlus />}
            />
            <InputSelectGender
              control={control}
              name="gender"
              placeholder="Gender"
            />
            <InputSelectDate
              control={control}
              name="birth_day"
              placeholder="Birthday"
            />
            <DatePickerProfile
              isShowModalVisible={showDatePicker}
              setIsHideModalVisible={handleHideDatePicker}
            />
          </View>
        </KeyboardAwareScrollView>

        <BottomSheet
          show={showBottomSheet}
          height={300}
          onOuterClick={handleHideGenderDatePicker}
          setShow={() => alert(1)}
          className="opacity-0"
        >
          <View>
            <View className="border-color_gray flex-row justify-between border-b p-6">
              <TouchableOpacity onPress={handleHideGenderDatePicker}>
                <ArrowDownIcon fill="#000000" />
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
                  // setValue("gender", item, { shouldValidate: true });
                  handleHideGenderDatePicker();
                }}
              >
                <Text className="text-blue_1 text-font-24 font-weight_400">
                  {t(`gender.${item}`)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheet>
      </LayoutForm>
    </LayoutBasicInfo>
  );
};
