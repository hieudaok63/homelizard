import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { genderSchema } from "@homelizard/schema";

import DefaultYellowIcon from "@assets/icons/DefaultYellowIcon.svg";
import IconPlus from "@assets/icons/IconPlus.svg";

import { api } from "~/utils/api";
import { DatePickerProfile } from "~/components/Profile";
import { ModalSelectGender } from "~/components/Profile/Modal";
import { HeaderForm, LayoutForm } from "~/components/ui/Profile";
import { type Percentage } from "~/components/ui/StepProgress";
import InputProfile from "~/components/ui/input/InputProfile";
import InputSelectDate from "~/components/ui/input/InputSelectDate";
import InputSelectGender from "~/components/ui/input/InputSelectGender";
import { useZodForm } from "~/hooks/useZodForm";
import { progressSlice } from "~/zustand/store";
import { LayoutBasicInfo } from "./_layout";

const formSchema = z.object({
  title: z.string(),
  first_name: z.string(),
  middle_name: z.string(),
  last_name: z.string(),
  suffix: z.string(),
  gender: genderSchema,
  birth_day: z.string(),
});

export const BasicInfoSection = () => {
  const utils = api.useContext();

  const { data } = api.user.userInfo.useQuery();

  const setBasicInformationProgress = progressSlice(
    (state) => state?.setBasicInformationProgress,
  );

  const TOTAL_FIELD = 7;
  const DATA_FIELD = {
    title: data?.title,
    first_name: data?.firstName,
    middle_name: data?.middleName,
    last_name: data?.lastName,
    suffix: data?.suffix,
    gender: data?.gender,
    birth_day: undefined,
  };

  const [progress, setProgress] = useState<Percentage>(0);
  const [showModal, setShowModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [valueDate, setValueDate] = useState("");

  const elementCheck = (objarray: any) => {
    const listArray = Object.keys(objarray);
    let count = 0;

    for (const key of listArray) {
      const item = objarray[key];

      if (item === undefined || item === "" || item === null) {
        count++;
      }
    }

    if (count === 0) {
      setProgress(100);
      setBasicInformationProgress(100);
    } else if (count) {
      const numberProgress = Math.round(
        ((TOTAL_FIELD - count) / TOTAL_FIELD) * 100,
      ) as Percentage;
      setProgress(numberProgress);
      setBasicInformationProgress(numberProgress);
    }
  };

  useEffect(() => {
    elementCheck(DATA_FIELD);
  }, [data]);

  const { handleSubmit, control, reset, setValue } = useZodForm({
    schema: formSchema,
    defaultValues: {
      title: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      suffix: "",
      gender: "male",
      birth_day: "",
    },
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (data) {
      reset({
        title: data?.title as string,
        first_name: data?.firstName,
        middle_name: data?.middleName as string,
        last_name: data?.lastName,
        suffix: data?.suffix as string,
        gender: data.gender,
        birth_day: "Sat Jul 10 2022 16:14:48 GMT+0700",
      });
    }
  }, [data]);

  const { mutate } = api.user.update.useMutation({
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
    const dateBirthDay = dayjs(data.birth_day).unix();

    mutate({
      title: data.title,
      firstName: data.first_name,
      middleName: data.middle_name,
      lastName: data.last_name,
      gender: data.gender,
      suffix: data.suffix,
      //   birthday: date,
    });

    try {
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <LayoutBasicInfo>
        <LayoutForm>
          <KeyboardAwareScrollView>
            <View className="mt-5 h-[120%] rounded-[45px] bg-white">
              <HeaderForm
                iconLeft={<DefaultYellowIcon />}
                title="Basisdaten"
                progress={progress}
                variant="yellow"
              />
              <InputProfile
                name="title"
                control={control}
                placeholder="Add title"
                label="Title"
                rightIconProps={<IconPlus />}
                onPressRightInput={onSubmit}
              />
              <InputProfile
                name="first_name"
                control={control}
                placeholder="Add First name"
                label="First name"
                rightIconProps={<IconPlus />}
                onPressRightInput={onSubmit}
              />
              <InputProfile
                name="middle_name"
                control={control}
                placeholder="Add Middle name"
                label="Middle Name"
                rightIconProps={<IconPlus />}
                onPressRightInput={onSubmit}
              />
              <InputProfile
                name="last_name"
                control={control}
                placeholder="Add Last name"
                label="Last name"
                rightIconProps={<IconPlus />}
                onPressRightInput={onSubmit}
              />
              <InputProfile
                name="suffix"
                control={control}
                placeholder="Add Suffix"
                label="Suffix"
                rightIconProps={<IconPlus />}
                onPressRightInput={onSubmit}
              />
              <InputSelectGender
                control={control}
                name="gender"
                placeholder="Gender"
                onPressGender={() => setShowModal(true)}
              />
              <InputSelectDate
                control={control}
                name="birth_day"
                placeholder="Birthday"
                onPressSelectDate={() => setShowDatePicker(true)}
                onSwitch
              />
            </View>
          </KeyboardAwareScrollView>
        </LayoutForm>
      </LayoutBasicInfo>

      <ModalSelectGender
        setShowModal={setShowModal}
        showModal={showModal}
        setValue={setValue}
        onSubmit={onSubmit}
      />
      <DatePickerProfile
        showDatePicker={showDatePicker}
        setShowDatePicker={() => {
          setShowDatePicker(false);
          setValue("birth_day", valueDate, { shouldValidate: true });
        }}
        setValueDate={setValueDate}
      />
    </>
  );
};
