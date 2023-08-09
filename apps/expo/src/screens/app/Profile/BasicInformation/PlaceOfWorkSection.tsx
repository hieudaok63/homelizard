import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import dayjs from "dayjs";
import { z } from "zod";

import { MOBILE_PHONE_REGEX } from "@homelizard/api/src/constant/base.constant";

import SearchIcon from "@assets/icons/SearchIcon.svg";

import { api } from "~/utils/api";
import { TriggerDatePicker } from "~/components/DatePicker/TriggerDatePicker";
import { useAppNavigation } from "~/components/navigation/useAppNavigation";
import { Button, SpeechBubbleIcon } from "~/components/ui";
import { AppText } from "~/components/ui/AppText";
import { HeaderForm, LayoutForm } from "~/components/ui/Profile";
import InputProfile from "~/components/ui/input/InputProfile";
import { useZodForm } from "~/hooks/useZodForm";
import { locationSlice } from "~/zustand/store";
import { LayoutBasicInfo } from "./_layout";

const schema = z.object({
  position: z.string(),
  company: z.string(),
  since: z.date(),
  company_address: z.string(),
  phone_company: z.string().regex(MOBILE_PHONE_REGEX),
  email_company: z.string(),
  web_company: z.string(),
});

type IPlaceOfWork = z.infer<typeof schema>;

const defaultValues: IPlaceOfWork = {
  position: "",
  company: "",
  since: new Date(),
  company_address: "",
  phone_company: "",
  email_company: "",
  web_company: "",
};

export const PlaceOfWorkSection = () => {
  const navigation = useAppNavigation();
  const utils = api.useContext();
  const { data } = api.user.userInfo.useQuery();
  const { addressParam, address } = locationSlice((state) => state);

  const { handleSubmit, control, reset, watch, setValue } = useZodForm({
    schema,
    defaultValues,
  });

  useEffect(() => {
    if (data) {
      reset({
        position: data?.placeOfWork?.position,
        company: data?.placeOfWork?.company,
        since: data?.placeOfWork?.since || new Date(),
        company_address: address.name || "",
        phone_company: data?.placeOfWork?.phone,
        email_company: data?.placeOfWork?.email,
        web_company: data?.placeOfWork?.web,
      });
    }
  }, [data, address, reset]);

  const { mutate } = api.user.editPlaceOfWork.useMutation({
    async onSuccess() {
      await utils.user.invalidate();

      Toast?.show({
        type: "success",
        text1: "Success",
        visibilityTime: 2000,
      });
    },
    onError(err) {
      console.log({ err });
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log({ dataSubmit: data });
    alert(1);

    try {
      mutate({
        position: data?.position,
        company: data?.company,
        since: dayjs(data?.since).toDate(),
        phone: data?.phone_company,
        email: data?.email_company,
        web: data?.web_company,
        address: {
          street: addressParam.street,
          city: addressParam.city,
          zipCode: addressParam.city,
          country: addressParam.country,
        },
      });
    } catch (error) {
      console.log(error, "nbd");
    }
  });

  return (
    <>
      <LayoutBasicInfo>
        <LayoutForm>
          <View className="mt-5 max-h-[75%] overflow-hidden rounded-3xl bg-white">
            <KeyboardAwareScrollView>
              <HeaderForm
                iconLeft={<SpeechBubbleIcon color="yellow" />}
                title="Place of work"
                progress={50}
                variant="yellow"
              />
              <InputProfile
                name="position"
                control={control}
                placeholder="Enter position"
                label="Position"
              />
              <InputProfile
                name="company"
                control={control}
                placeholder="Enter name"
                label="Company"
              />

              <TriggerDatePicker
                value={watch("since")}
                onChange={(e) => {
                  const { timestamp } = e?.nativeEvent;
                  if (timestamp) {
                    setValue("since", new Date(timestamp), {
                      shouldValidate: true,
                    });
                  }
                }}
              >
                <View className="flex w-full flex-row items-center py-4 pl-4 pr-10">
                  <AppText
                    text="Company since"
                    className="w-4/12 text-font-16 text-grey"
                  />
                  <View className="flex flex-1 flex-row justify-center border-b border-color_gray pb-2">
                    <AppText
                      text={dayjs(watch("since"))?.format("DD | MM | YYYY")}
                    />
                  </View>
                </View>
              </TriggerDatePicker>

              <View className="w-full">
                <TouchableOpacity
                  className=" absolute bottom-0 left-0 right-0 top-0 z-20 w-full    "
                  onPress={() => navigation?.navigate("LocationSection")}
                />
                <InputProfile
                  name="company_address"
                  control={control}
                  placeholder="Search location"
                  label="Company address"
                  rightIconProps={<SearchIcon fill="#0080FF" />}
                  multiline
                />
              </View>

              <InputProfile
                control={control}
                name="phone_company"
                placeholder="Enter company phone"
                label="Phone"
                keyboardType="number-pad"
              />
              <InputProfile
                control={control}
                name="email_company"
                placeholder="Enter your work email"
                label="Email"
              />
              <InputProfile
                control={control}
                placeholder="Company website"
                label="Web"
                name="web_company"
              />
              <View className="px-4 py-4">
                <Button
                  title="Update"
                  className="rounded-full"
                  onPress={onSubmit}
                />
              </View>
            </KeyboardAwareScrollView>
          </View>
        </LayoutForm>
      </LayoutBasicInfo>
    </>
  );
};
