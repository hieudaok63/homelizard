import React from "react";
import { View } from "react-native";
import { z } from "zod";

import DefaultYellowIcon from "@assets/icons/DefaultYellowIcon.svg";
import SearchIcon from "@assets/icons/SearchIcon.svg";

import { HeaderForm, LayoutForm } from "~/components/ui/Profile";
import InputProfile from "~/components/ui/input/InputProfile";
import { useZodForm } from "~/hooks/useZodForm";
import { LayoutBasicInfo } from "./_layout";

export const AddressSection = () => {
  const formSchema = z.object({
    address: z.string(),
  });
  const { handleSubmit, control } = useZodForm({
    schema: formSchema,
    defaultValues: {
      address: "",
    },
  });

  return (
    <LayoutBasicInfo>
      <LayoutForm>
        <View className="mt-5 h-[80%] rounded-[45px] bg-white">
          <HeaderForm
            iconLeft={<DefaultYellowIcon />}
            title="Address"
            progress={50}
            variant="yellow"
          />
          <InputProfile
            name="address"
            control={control}
            placeholder="Add a address"
            label="Address"
            multiline
            rightIconProps={<SearchIcon fill="#0080FF" />}
          />
        </View>
      </LayoutForm>
    </LayoutBasicInfo>
  );
};
