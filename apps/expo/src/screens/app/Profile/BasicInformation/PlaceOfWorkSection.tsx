import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { MOBILE_PHONE_REGEX } from "@homelizard/api/src/constant/base.constant";

import SearchIcon from "@assets/icons/SearchIcon.svg";

import { api } from "~/utils/api";
import { DatePickerProfile } from "~/components/Profile";
import { useAppNavigation } from "~/components/navigation/useAppNavigation";
import { Button, SpeechBubbleIcon } from "~/components/ui";
import { HeaderForm, LayoutForm } from "~/components/ui/Profile";
import InputProfile from "~/components/ui/input/InputProfile";
import InputSelectDate from "~/components/ui/input/InputSelectDate";
import { useZodForm } from "~/hooks/useZodForm";
import { locationSlice } from "~/zustand/store";
import { LayoutBasicInfo } from "./_layout";

export const PlaceOfWorkSection = () => {
  const utils = api.useContext();

  const navigation = useAppNavigation();

  const [valueDate, setValueDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { data } = api.user.userInfo.useQuery();

  const { addressParam, address } = locationSlice((state) => state);

  const TOTAL_FIELD = 7;

  const DATA_FIELD = {
    position: data?.placeOfWork?.position,
    company: data?.placeOfWork?.company,
    since: data?.placeOfWork?.since,
    company_address: data?.placeOfWork?.addressId,
    phone_company: data?.placeOfWork?.phone,
    email_company: data?.placeOfWork?.email,
    web_company: data?.placeOfWork?.web,
  };

  const formSchema = z.object({
    position: z.string(),
    company: z.string(),
    since: z.string(),
    company_address: z.string(),
    phone_company: z.string().regex(MOBILE_PHONE_REGEX),
    email_company: z.string(),
    web_company: z.string(),
  });

  const { handleSubmit, control, reset, setValue } = useZodForm({
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

  useEffect(() => {
    if (data) {
      reset({
        position: data?.placeOfWork?.position,
        company: data?.placeOfWork?.company,
        since: data?.placeOfWork?.since,
        company_address: address.name,
        phone_company: data?.placeOfWork?.phone,
        email_company: data?.placeOfWork?.email,
        web_company: data?.placeOfWork?.web,
      });
    }
  }, [data, address]);

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
          <KeyboardAwareScrollView>
            <View className="mt-5 h-[105%] rounded-[45px] bg-white">
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
              <InputSelectDate
                control={control}
                name="since"
                placeholder="Company Since"
                onPressSelectDate={() => setShowDatePicker(true)}
                onSwitch={false}
              />
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
              <View className="px-4 pt-4">
                <Button
                  title="Update"
                  className="mt-4 rounded"
                  onPress={onSubmit}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </LayoutForm>
      </LayoutBasicInfo>

      <DatePickerProfile
        showDatePicker={showDatePicker}
        setShowDatePicker={() => {
          setShowDatePicker(false);
          setValue("since", valueDate, { shouldValidate: true });
        }}
        setValueDate={setValueDate}
      />
    </>
  );
};
