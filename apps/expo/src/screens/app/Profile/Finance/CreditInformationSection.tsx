import React, { type Dispatch, type SetStateAction } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { z } from "zod";

import { cn } from "@homelizard/tailwind-config/utils";

import ArrowDownIcon from "@assets/icons/ArrowDownIcon.svg";
import ArrowUpIcon from "@assets/icons/ArrowUpIcon.svg";
import PropertyIcon from "@assets/icons/PropertyIcon.svg";

import { ButtonProfile } from "~/components/Profile";
import { useAppNavigation } from "~/components/navigation/useAppNavigation";
import { ButtonActionMain } from "~/components/ui";
import InputProfile from "~/components/ui/input/InputProfile";
import { useZodForm } from "~/hooks/useZodForm";

interface CreditInformationSection {
  isShowModal: boolean;
  setShowListOption: Dispatch<SetStateAction<boolean>>;
  title: string;
  description?: string;
}

export const CreditInformationSection = ({
  isShowModal,
  title,
  setShowListOption,
}: CreditInformationSection) => {
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
    <KeyboardAwareScrollView className="pb-5 pt-3">
      <ButtonActionMain
        onPress={() => setShowListOption((pre) => !pre)}
        title={title}
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
        <View className="">
          <InputProfile
            name="test"
            control={control}
            placeholder="Noch nicht verfügbar"
            label="Bonität"
            inputGrey
          />
          <ButtonProfile
            onPress={() => alert(1)}
            variant="blue"
            progress={20}
            title="Bonitätsangaben"
            description="Zahlungsverhalten"
            IconLeftProps
          />
          <ButtonProfile
            onPress={() => alert(1)}
            variant="blue"
            progress={20}
            title="Wohnorte"
            description="Bisherige Wohnorte"
            IconLeftProps
          />
          <ButtonProfile
            onPress={() => alert(1)}
            variant="blue"
            progress={20}
            title="Familienstand"
            description="Ehegatten, Kinder, etc..."
            IconLeftProps
          />
          <ButtonProfile
            onPress={() => alert(1)}
            variant="blue"
            progress={20}
            title="Laufende Kredite"
            description="Höhe und Zwecke"
            IconLeftProps
          />
          <ButtonProfile
            onPress={() => alert(1)}
            variant="blue"
            progress={20}
            title="Eigentum"
            description="Besitzt du bereits Immobilien?"
            IconLeftProps={<PropertyIcon />}
          />
          <ButtonProfile
            onPress={() => alert(1)}
            variant="blue"
            progress={20}
            title="Investments"
            description="Unternehmensbeteiligungen"
            IconLeftProps
            isLastItem
          />
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};
