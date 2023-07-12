import React from "react";
import { View } from "react-native";
import { z } from "zod";

import CloseIcon from "@assets/icons/CloseIcon.svg";
import DefaultYellowIcon from "@assets/icons/DefaultYellowIcon.svg";

import { HeaderForm, LayoutForm } from "~/components/ui/Profile";
import InputProfile from "~/components/ui/input/InputProfile";
import { useZodForm } from "~/hooks/useZodForm";
import { LayoutBasicInfo } from "./_layout";

export const EmailAndWebSection = () => {
  const formSchema = z.object({
    email: z.string(),
    web: z.string(),
  });
  const { handleSubmit, control } = useZodForm({
    schema: formSchema,
    defaultValues: {
      email: "",
      web: "",
    },
  });

  return (
    <LayoutBasicInfo>
      <LayoutForm>
        <View className="mt-5 h-[80%] rounded-[45px] bg-white">
          <HeaderForm
            iconLeft={<DefaultYellowIcon />}
            title="Email & web"
            progress={40}
            variant="yellow"
          />
          <InputProfile
            name="email"
            control={control}
            placeholder="Add Email"
            label="Email"
            rightIconProps={<CloseIcon />}
            classIconRight="bg-red_1 w-10 rounded-full p-2 "
          />
          <InputProfile
            name="web"
            control={control}
            placeholder="Add Web"
            label="Web"
          />
        </View>
      </LayoutForm>
    </LayoutBasicInfo>
  );
};
