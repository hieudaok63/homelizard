import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { z } from "zod";

import { MOBILE_PHONE_REGEX } from "@homelizard/api/src/constant/base.constant";

import ArrowUpIcon from "@assets/icons/ArrowUpIcon.svg";
import CloseIcon from "@assets/icons/CloseIcon.svg";

import { api } from "~/utils/api";
import { Button, SpeechBubbleIcon } from "~/components/ui";
import { AppText } from "~/components/ui/AppText";
import { HeaderForm, LayoutForm } from "~/components/ui/Profile";
import TextInputController from "~/components/ui/input/TextInputController";
import { useZodForm } from "~/hooks/useZodForm";
import { useApplicationLoadingStore } from "~/zustand/store";
import { type TabStackParams } from "../../routes";
import { LayoutBasicInfo } from "./_layout";

type IProps = NativeStackScreenProps<TabStackParams, "MobilePhoneSection">;

export const formSchema = z.object({
  phone: z.string().regex(MOBILE_PHONE_REGEX),
});

const defaultValues = {
  phone: "",
};

export const MobilePhoneSection = ({ navigation }: IProps) => {
  const utils = api.useContext();
  const { data } = api.user.userInfo.useQuery();
  const setLoading = useApplicationLoadingStore((state) => state?.setLoading);

  const { handleSubmit, control, reset } = useZodForm({
    schema: formSchema,
    defaultValues,
  });

  useEffect(() => {
    if (data?.mobilePhone) {
      reset({
        phone: data.mobilePhone,
      });
    }
  }, [data?.mobilePhone, reset]);

  const { mutateAsync } = api.user.update.useMutation({
    async onSuccess() {
      await utils.user.invalidate();
      navigation.goBack();
      setLoading(false);
      Toast?.show({
        type: "success",
        text1: "Success",
        text2: "Phone number saved!",
      });
    },
    onError(err) {
      console.log({ err });
      setLoading(false);
      Toast?.show({
        type: "error",
        text1: "Error!",
        text2: err.message,
      });
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    await mutateAsync({
      mobilePhone: data.phone,
    });
  });

  return (
    <LayoutBasicInfo>
      <LayoutForm>
        <View className="mt-5 min-h-[50%] rounded-3xl bg-white pb-8">
          <HeaderForm
            iconLeft={<SpeechBubbleIcon color="yellow" />}
            title="Mobile phone"
            progress={100}
            variant="yellow"
          />

          <View className="flex w-full flex-row items-center px-4">
            <TouchableOpacity className="bg-grey_4 mr-2 rounded-full p-1">
              <CloseIcon />
            </TouchableOpacity>

            <TouchableOpacity className="flex flex-row items-center">
              <AppText text="Mobile" className="text-font-16 text-blue_2" />
              <ArrowUpIcon
                width={25}
                height={25}
                className=" rotate-90 text-blue_2"
              />
            </TouchableOpacity>
          </View>

          <TextInputController
            name="phone"
            control={control}
            keyboardType="number-pad"
            placeholder="Add a number"
            // variant="inline"
            label="Phone number"
          />

          <Button
            title="Save"
            onPress={onSubmit}
            className="mx-4 rounded-full"
          />
        </View>
      </LayoutForm>
    </LayoutBasicInfo>
  );
};
