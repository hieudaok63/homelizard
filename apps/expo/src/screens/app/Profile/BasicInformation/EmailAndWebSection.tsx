import React, { useEffect } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { z } from "zod";

import { api } from "~/utils/api";
import { Button, SpeechBubbleIcon } from "~/components/ui";
import { HeaderForm, LayoutForm } from "~/components/ui/Profile";
import TextInputController from "~/components/ui/input/TextInputController";
import { useZodForm } from "~/hooks/useZodForm";
import { useApplicationLoadingStore } from "~/zustand/store";
import { type TabStackParams } from "../../routes";
import { LayoutBasicInfo } from "./_layout";

type IProps = NativeStackScreenProps<TabStackParams, "EmailAndWebSection">;

const defaultValues = {
  email: "",
  website: "",
};
const schema = z.object({
  email: z.string(),
  website: z.string(),
});

export const EmailAndWebSection = ({ navigation }: IProps) => {
  // trpc
  const utils = api.useContext();
  const { data } = api.user.userInfo.useQuery();

  // zustand
  const setLoading = useApplicationLoadingStore((state) => state.setLoading);

  const { handleSubmit, control, reset } = useZodForm({
    schema,
    defaultValues,
  });

  const { mutateAsync } = api.user.update.useMutation({
    async onSuccess() {
      await utils.user.invalidate();
      Toast?.show({
        type: "success",
        text1: "Success",
        text2: "Email and Website saved!",
      });
      navigation.goBack();
      setLoading(false);
    },
    onError(err) {
      setLoading(false);
      console.log({ err: err.message });
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
      email: data.email,
      website: data.website,
    });
  });

  // auto fill existing data
  useEffect(() => {
    if (data) {
      reset({
        email: data.email,
        website: data.website as string,
      });
    }
  }, [data, reset]);

  // main return
  return (
    <LayoutBasicInfo>
      <LayoutForm>
        <View className="mt-5 min-h-[70%] rounded-3xl bg-white">
          <KeyboardAwareScrollView>
            <HeaderForm
              iconLeft={<SpeechBubbleIcon color="yellow" />}
              title="Email & web"
              progress={100}
              variant="yellow"
            />
            <TextInputController
              name="email"
              control={control}
              placeholder="Add Email"
              variant="inline"
              label="Email"
            />
            <TextInputController
              name="website"
              control={control}
              placeholder="Add Web"
              variant="inline"
              label="Web"
            />

            <Button
              title="Save"
              className="mx-4 mt-2 rounded-full"
              onPress={onSubmit}
            />
          </KeyboardAwareScrollView>
        </View>
      </LayoutForm>
    </LayoutBasicInfo>
  );
};
