import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { z } from "zod";

import SearchIcon from "@assets/icons/SearchIcon.svg";

import { useAppNavigation } from "~/components/navigation/useAppNavigation";
import { SpeechBubbleIcon } from "~/components/ui";
import { HeaderForm, LayoutForm } from "~/components/ui/Profile";
import TextInputController from "~/components/ui/input/TextInputController";
import { useZodForm } from "~/hooks/useZodForm";
import { locationSlice } from "~/zustand/store";
import { LayoutBasicInfo } from "./_layout";

export const AddressSection = () => {
  const navigation = useAppNavigation();

  const { address, addressParam } = locationSlice((state) => state);

  const formSchema = z.object({
    addressUser: z.string(),
  });

  const { handleSubmit, control, reset } = useZodForm({
    schema: formSchema,
    defaultValues: {
      addressUser: address.name,
    },
  });

  useEffect(() => {
    if (address) {
      reset({
        addressUser: address?.name as string,
      });
    }
  }, [address.name]);
  return (
    <LayoutBasicInfo>
      <LayoutForm>
        <View className="mt-5 h-[80%] rounded-[45px] bg-white">
          <HeaderForm
            iconLeft={<SpeechBubbleIcon color="yellow" />}
            title="Address"
            progress={50}
            variant="yellow"
          />
          <TouchableOpacity
            className="flex flex-row items-center pl-2 pr-4"
            onPress={() => navigation?.navigate("LocationSection")}
          >
            <View className="flex-1">
              <TextInputController
                name="addressUser"
                control={control}
                placeholder="Add a address"
                multiline
                variant="inline"
                label="Address"
              />
            </View>
            <SearchIcon fill="#0080FF" />
          </TouchableOpacity>
        </View>
      </LayoutForm>
    </LayoutBasicInfo>
  );
};
