import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { MOBILE_PHONE_REGEX } from "@homelizard/api/src/constant/base.constant";

import DefaultYellowIcon from "@assets/icons/DefaultYellowIcon.svg";
import IconPlus from "@assets/icons/IconPlus.svg";

import { api } from "~/utils/api";
import { type Percentage } from "~/components/ui";
import { HeaderForm, LayoutForm } from "~/components/ui/Profile";
import InputProfile from "~/components/ui/input/InputProfile";
import { useZodForm } from "~/hooks/useZodForm";
import { progressSlice } from "~/zustand/store";
import { LayoutBasicInfo } from "./_layout";

export const formSchema = z.object({
  phone: z.string().regex(MOBILE_PHONE_REGEX),
});

export const MobilePhoneSection = () => {
  const utils = api.useContext();

  const { data } = api.user.userInfo.useQuery();

  const setMobilePhoneProgress = progressSlice(
    (state) => state?.setMobilePhoneProgress,
  );

  const { t } = useTranslation();

  const [progress, setProgress] = useState<Percentage>(0);

  const DATA_FIELD = {
    phone: data?.mobilePhone,
  };

  const { handleSubmit, control, reset } = useZodForm({
    schema: formSchema,
    defaultValues: {
      phone: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        phone: data.mobilePhone as string,
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
    mutate({
      mobilePhone: data.phone,
    });

    try {
    } catch (error) {
      console.log(error);
    }
  });

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
      setMobilePhoneProgress(100);
      setProgress(100);
    } else {
      setMobilePhoneProgress(0);
    }
  };

  useEffect(() => {
    elementCheck(DATA_FIELD);
  }, [data]);

  return (
    <LayoutBasicInfo>
      <LayoutForm>
        <View className="mt-5 h-[70%] rounded-[45px] bg-white">
          <HeaderForm
            iconLeft={<DefaultYellowIcon />}
            title="Mobile phone"
            progress={progress}
            variant="yellow"
          />
          <InputProfile
            name="phone"
            control={control}
            label="Add a number"
            keyboardType="number-pad"
            rightIconProps={<IconPlus />}
            inputPhoneNumber
            onPressRightInput={onSubmit}
          />
        </View>
      </LayoutForm>
    </LayoutBasicInfo>
  );
};
