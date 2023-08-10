import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { z } from "zod";

import { genderSchema } from "@homelizard/schema";

import { TriggerDatePicker } from "~/components/DatePicker/TriggerDatePicker";
import { ModalSelectGender } from "~/components/Profile/Modal";
import { Button, SpeechBubbleIcon } from "~/components/ui";
import { AppText } from "~/components/ui/AppText";
import { HeaderForm, LayoutForm } from "~/components/ui/Profile";
import InputSelectGender from "~/components/ui/input/InputSelectGender";
import TextInputController from "~/components/ui/input/TextInputController";
import { useZodForm } from "~/hooks/useZodForm";
import { api } from "~/utils/api";
import { useApplicationLoadingStore } from "~/zustand/store";
import { type TabStackParams } from "../../routes";
import { LayoutBasicInfo } from "./_layout";

type IProps = NativeStackScreenProps<TabStackParams, "BasicInfoSection">;

const schema = z.object({
  title: z.string().min(1, "Required"),
  first_name: z.string().min(1, "Required"),
  middle_name: z.string().min(1, "Required"),
  last_name: z.string().min(1, "Required"),
  suffix: z.string().min(1, "Required"),
  gender: genderSchema,
  birth_day: z.date(),
});

type IBasicInformation = z.infer<typeof schema>;

const defaultValues: IBasicInformation = {
  title: "",
  first_name: "",
  middle_name: "",
  last_name: "",
  suffix: "",
  gender: "male",
  birth_day: new Date(),
};

export const BasicInfoSection = ({ navigation }: IProps) => {
  const trpc = api.useContext();
  const { data } = api.user.userInfo.useQuery();
  const setLoading = useApplicationLoadingStore((state) => state?.setLoading);
  const [showModalGender, setShowModalGender] = useState(false);

  const { handleSubmit, control, reset, setValue, watch } = useZodForm({
    schema,
    defaultValues,
  });

  useEffect(() => {
    if (data) {
      reset({
        title: data?.title as string,
        first_name: data?.firstName,
        middle_name: data?.middleName as string,
        last_name: data?.lastName,
        suffix: data?.suffix as string,
        gender: data.gender,
        birth_day: data.birthday || new Date(),
      });
    }
  }, [data, reset]);

  const { mutateAsync } = api.user.update.useMutation({
    async onSuccess() {
      await trpc.user.invalidate();
      setLoading(false);
      navigation.goBack();
      Toast?.show({
        type: "success",
        text1: "Success",
        text2: "Basic information saved!",
      });
    },
    onError(err) {
      setLoading(false);
      console.log({ err });
      Toast?.show({
        type: "error",
        text1: "Error!",
        text2: err?.message,
      });
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    await mutateAsync({
      title: data.title,
      firstName: data.first_name,
      middleName: data.middle_name,
      lastName: data.last_name,
      gender: data.gender,
      suffix: data.suffix,
      birthday: dayjs(data.birth_day).toDate(),
    });
  });

  return (
    <>
      <LayoutBasicInfo>
        <LayoutForm>
          <View className="mt-5 max-h-[75%] overflow-hidden rounded-2xl bg-white">
            <KeyboardAwareScrollView>
              <HeaderForm
                iconLeft={<SpeechBubbleIcon color="yellow" />}
                title="Basisdaten"
                progress={100}
                variant="yellow"
              />
              <TextInputController
                name="title"
                control={control}
                placeholder="Add title"
                variant="inline"
                label="Title"
              />
              <TextInputController
                name="first_name"
                control={control}
                placeholder="Add First name"
                variant="inline"
                label="First name"
              />
              <TextInputController
                name="middle_name"
                control={control}
                placeholder="Add Middle name"
                variant="inline"
                label="Middle Name"
              />
              <TextInputController
                name="last_name"
                control={control}
                placeholder="Add Last name"
                variant="inline"
                label="Last name"
              />
              <TextInputController
                name="suffix"
                control={control}
                placeholder="Add Suffix"
                variant="inline"
                label="Suffix"
              />
              <InputSelectGender
                control={control}
                name="gender"
                placeholder="Gender"
                onPressGender={() => setShowModalGender(true)}
              />
              <TriggerDatePicker
                value={watch("birth_day")}
                onChange={(e) => {
                  const { timestamp } = e?.nativeEvent;
                  if (timestamp) {
                    setValue("birth_day", new Date(timestamp), {
                      shouldValidate: true,
                    });
                  }
                }}
              >
                <View className="flex w-full flex-row border-b border-color_gray px-4 py-4">
                  <AppText
                    text="Birthday"
                    className="w-4/12 text-font-16 text-grey"
                  />
                  <AppText
                    text={dayjs(watch("birth_day"))?.format("DD | MM | YYYY")}
                    className="flex-1 pl-1"
                  />
                </View>
              </TriggerDatePicker>

              <View className="mt-4 w-full px-4 pb-2">
                <Button
                  title="Save"
                  className="rounded-full"
                  onPress={onSubmit}
                />
              </View>
            </KeyboardAwareScrollView>
          </View>
        </LayoutForm>
      </LayoutBasicInfo>
      {/* Modals */}
      <ModalSelectGender
        setShowModal={setShowModalGender}
        showModal={showModalGender}
        onPressItem={(e) => {
          setValue("gender", e, { shouldValidate: true });
        }}
      />
    </>
  );
};
