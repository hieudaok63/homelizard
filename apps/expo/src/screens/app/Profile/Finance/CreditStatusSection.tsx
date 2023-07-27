import React, { type Dispatch, type SetStateAction } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { z } from "zod";

import { cn } from "@homelizard/tailwind-config/utils";

import ArrowDownIcon from "@assets/icons/ArrowDownIcon.svg";
import ArrowUpIcon from "@assets/icons/ArrowUpIcon.svg";

import { useAppNavigation } from "~/components/navigation/useAppNavigation";
import { ButtonActionMain } from "~/components/ui";
import InputProfile from "~/components/ui/input/InputProfile";
import { useZodForm } from "~/hooks/useZodForm";

interface ICreditStatusSection {
  isShowModal: boolean;
  setShowListOption: Dispatch<SetStateAction<boolean>>;
  title: string;
  description?: string;
}

export const CreditStatusSection = ({
  isShowModal,
  title,
  setShowListOption,
}: ICreditStatusSection) => {
  const formSchema = z.object({
    test: z.string(),
  });
  const { handleSubmit, control } = useZodForm({
    schema: formSchema,
    defaultValues: {
      test: "",
    },
  });

  const navigation = useAppNavigation();

  return (
    <KeyboardAwareScrollView
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="pb-5"
    >
      <ButtonActionMain
        onPress={() => setShowListOption((pre) => !pre)}
        title={title}
        IconLeftProps
        variant="blue"
        progress={41}
        IconRightProps={
          isShowModal ? (
            <ArrowUpIcon color="white" width={24} height={24} />
          ) : (
            <ArrowDownIcon fill="#000000" />
          )
        }
        isButton
        classButton={cn(
          "rounded-none",
          isShowModal ? "rounded-t-[40px]" : "rounded-full",
        )}
      />
      {isShowModal && (
        <View className="rounded-b-[40px] bg-white pb-8">
          <InputProfile
            name="test"
            control={control}
            placeholder="Noch nicht verfügbar"
            label="Bonität"
            inputGrey
          />
          <InputProfile
            name="test"
            control={control}
            placeholder="Noch nicht verfügbar"
            label="Bonität"
            inputGrey
          />
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};
