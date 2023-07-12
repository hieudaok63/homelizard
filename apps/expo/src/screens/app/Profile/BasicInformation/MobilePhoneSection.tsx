import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import DefaultYellowIcon from "@assets/icons/DefaultYellowIcon.svg";
import IconPlus from "@assets/icons/IconPlus.svg";

import { HeaderForm, LayoutForm } from "~/components/ui/Profile";
import InputProfile from "~/components/ui/input/InputProfile";
import { useZodForm } from "~/hooks/useZodForm";
import { LayoutBasicInfo } from "./_layout";

export const MobilePhoneSection = () => {
  const formSchema = z.object({
    phone: z.string(),
  });
  const { handleSubmit, control } = useZodForm({
    schema: formSchema,
    defaultValues: {
      phone: "",
    },
  });
  const { t } = useTranslation();

  return (
    <LayoutBasicInfo>
      <LayoutForm>
        <View className="mt-5 h-[70%] rounded-[45px] bg-white">
          <HeaderForm
            iconLeft={<DefaultYellowIcon />}
            title="Mobile phone"
            progress={50}
            variant="yellow"
          />
          <InputProfile
            name="phone"
            control={control}
            label="Add a number"
            keyboardType="number-pad"
            rightIconProps={<IconPlus />}
            inputPhoneNumber
          />
        </View>
      </LayoutForm>
    </LayoutBasicInfo>
  );
};
