import React, { useState } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import DefaultYellowIcon from "@assets/icons/DefaultYellowIcon.svg";
import IconPlus from "@assets/icons/IconPlus.svg";
import SearchIcon from "@assets/icons/SearchIcon.svg";

import { DatePickerProfile } from "~/components/Profile";
import { HeaderForm, LayoutForm } from "~/components/ui/Profile";
import InputProfile from "~/components/ui/input/InputProfile";
import { useZodForm } from "~/hooks/useZodForm";
import { LayoutBasicInfo } from "./_layout";

export const PlaceOfWorkSection = () => {
  const formSchema = z.object({
    position: z.string(),
    company: z.string(),
    since: z.string(),
    company_address: z.string(),
    phone_company: z.string(),
    email_company: z.string(),
    web_company: z.string(),
  });
  const { handleSubmit, control } = useZodForm({
    schema: formSchema,
    defaultValues: {
      position: "",
      company: "",
      since: "",
      company_address: "",
      phone_company: "",
      email_company: "",
      web_company: "",
    },
  });
  const { t } = useTranslation();

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleHideDatePicker = () => setShowDatePicker(false);

  return (
    <LayoutBasicInfo>
      <LayoutForm>
        <KeyboardAwareScrollView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="mt-5 h-[120%] rounded-[45px] bg-white">
            <HeaderForm
              iconLeft={<DefaultYellowIcon />}
              title="Place of work"
              progress={50}
              variant="yellow"
            />
            <InputProfile
              name="position"
              control={control}
              placeholder="Enter position"
              label="Position"
              rightIconProps={<IconPlus />}
            />
            <InputProfile
              name="company"
              control={control}
              placeholder="Enter name"
              label="Company"
              rightIconProps={<IconPlus />}
            />
            <InputProfile
              name="since"
              control={control}
              placeholder="DD | MM | YYYY"
              label="Since"
            />
            <InputProfile
              name="company_address"
              control={control}
              placeholder="Search location"
              label="Company address"
              rightIconProps={<SearchIcon fill="#0080FF" />}
            />
            <InputProfile
              control={control}
              name="email_company"
              placeholder="Enter company phone"
              label="Phone"
              keyboardType="number-pad"
              rightIconProps={<IconPlus />}
            />
            <InputProfile
              control={control}
              name="email_company"
              placeholder="Enter your work email"
              label="Email"
              rightIconProps={<IconPlus />}
            />
            <InputProfile
              control={control}
              placeholder="Company website"
              label="Web"
              name="web_company"
              rightIconProps={<IconPlus />}
            />
            <DatePickerProfile
              isShowModalVisible={showDatePicker}
              setIsHideModalVisible={handleHideDatePicker}
            />
          </View>
        </KeyboardAwareScrollView>
      </LayoutForm>
    </LayoutBasicInfo>
  );
};
