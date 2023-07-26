import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { z } from "zod";

import SearchIcon from "@assets/icons/SearchIcon.svg";

import { useAppNavigation } from "~/components/navigation/useAppNavigation";
import { HeaderForm, LayoutForm } from "~/components/ui/Profile";
import InputProfile from "~/components/ui/input/InputProfile";
import { useZodForm } from "~/hooks/useZodForm";
import { locationSlice } from "~/zustand/store";
import { LayoutBasicInfo } from "./_layout";
import { SpeechBubbleIcon } from "~/components/ui";

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
          <View>
            <TouchableOpacity
              className="absolute bottom-0 left-0 right-0 top-0 z-20 h-[200px]  w-full  "
              onPress={() => navigation?.navigate("LocationSection")}
            />
            <View className=" absolute bottom-0 left-0 right-0 top-0 h-[200px] w-full ">
              <InputProfile
                name="addressUser"
                control={control}
                placeholder="Add a address"
                label="Address"
                multiline
                rightIconProps={<SearchIcon fill="#0080FF" />}
              />
            </View>
          </View>
        </View>
      </LayoutForm>
    </LayoutBasicInfo>
  );
};
