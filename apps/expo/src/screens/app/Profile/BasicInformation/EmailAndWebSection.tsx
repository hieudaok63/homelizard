import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { z } from "zod";

import IconPlus from "@assets/icons/IconPlus.svg";

import { api } from "~/utils/api";
import { SpeechBubbleIcon, type Percentage } from "~/components/ui";
import { HeaderForm, LayoutForm } from "~/components/ui/Profile";
import InputProfile from "~/components/ui/input/InputProfile";
import { useZodForm } from "~/hooks/useZodForm";
import { progressSlice } from "~/zustand/store";
import { LayoutBasicInfo } from "./_layout";

export const EmailAndWebSection = () => {
  const utils = api.useContext();

  const { data } = api.user.userInfo.useQuery();

  const setEmailAndWebProgress = progressSlice(
    (state) => state?.setEmailAndWebProgress,
  );

  const [progress, setProgress] = useState<Percentage>(0);

  const TOTAL_FIELD = 2;

  const DATA_FIELD = {
    email: data?.email,
    website: data?.website,
  };

  const formSchema = z.object({
    email: z.string(),
    website: z.string(),
  });

  const { handleSubmit, control, reset, setValue } = useZodForm({
    schema: formSchema,
    defaultValues: {
      email: "",
      website: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        email: data.email,
        website: data.website as string,
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
      console.log({ err: err.message });
      Toast?.show({
        type: "error",
        text1: err.message,
        visibilityTime: 2000,
      });
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    mutate({
      email: data.email,
      website: data.website,
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
      setProgress(100);
      setEmailAndWebProgress(100);
    } else if (count) {
      const numberProgress = Math.round(
        ((TOTAL_FIELD - count) / TOTAL_FIELD) * 100,
      ) as Percentage;
      setProgress(numberProgress);
      setEmailAndWebProgress(numberProgress);
    }
  };

  useEffect(() => {
    elementCheck(DATA_FIELD);
  }, []);

  return (
    <LayoutBasicInfo>
      <LayoutForm>
        <View className="mt-5 h-[80%] rounded-[45px] bg-white">
          <HeaderForm
            iconLeft={<SpeechBubbleIcon color="yellow" />}
            title="Email & web"
            progress={progress}
            variant="yellow"
          />
          <InputProfile
            name="email"
            control={control}
            placeholder="Add Email"
            label="Email"
            rightIconProps={<IconPlus />}
            onPressRightInput={onSubmit}
          />
          <InputProfile
            name="website"
            control={control}
            placeholder="Add Web"
            label="Web"
            rightIconProps={<IconPlus />}
            onPressRightInput={onSubmit}
          />
        </View>
      </LayoutForm>
    </LayoutBasicInfo>
  );
};
