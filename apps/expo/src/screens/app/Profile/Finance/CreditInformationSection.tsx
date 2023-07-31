import React, { type Dispatch, type SetStateAction } from "react";
import { type StyleProp, type ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { z } from "zod";

import PropertyIcon from "@assets/icons/PropertyIcon.svg";

import { ButtonProfile } from "~/components/Profile";
import { ProfileSectionAccordion } from "~/components/ui/Profile";
import InputProfile from "~/components/ui/input/InputProfile";
import { useZodForm } from "~/hooks/useZodForm";

interface CreditInformationSection {
  isShowModal: boolean;
  setShowListOption: Dispatch<SetStateAction<boolean>>;
  title: string;
  description?: string;
}

export const CreditInformationSection = ({
  style,
}: {
  style?: StyleProp<ViewStyle>;
}) => {
  const formSchema = z.object({
    test: z.string(),
  });
  const { control } = useZodForm({
    schema: formSchema,
    defaultValues: {
      test: "",
    },
  });

  return (
    <ProfileSectionAccordion
      title="Bonität"
      variant="blue"
      progress={41}
      style={style}
    >
      <KeyboardAwareScrollView>
        <InputProfile
          name="test"
          control={control}
          placeholder="Noch nicht verfügbar"
          label="Bonität"
          inputGrey
        />
        <ButtonProfile
          onPress={() => {}}
          variant="blue"
          progress={25}
          title="Bonitätsangaben"
          description="Zahlungsverhalten"
          IconLeftProps
        />
        <ButtonProfile
          onPress={() => {}}
          variant="blue"
          progress={20}
          title="Wohnorte"
          description="Bisherige Wohnorte"
          IconLeftProps
        />
        <ButtonProfile
          onPress={() => {}}
          variant="blue"
          progress={20}
          title="Familienstand"
          description="Ehegatten, Kinder, etc..."
          IconLeftProps
        />
        <ButtonProfile
          onPress={() => {}}
          variant="blue"
          progress={20}
          title="Laufende Kredite"
          description="Höhe und Zwecke"
          IconLeftProps
        />
        <ButtonProfile
          onPress={() => {}}
          variant="blue"
          progress={20}
          title="Eigentum"
          description="Besitzt du bereits Immobilien?"
          IconLeftProps={<PropertyIcon />}
        />
        <ButtonProfile
          onPress={() => {}}
          variant="blue"
          progress={20}
          title="Investments"
          description="Unternehmensbeteiligungen"
          IconLeftProps
          isLastItem
        />
      </KeyboardAwareScrollView>
    </ProfileSectionAccordion>
  );
};
