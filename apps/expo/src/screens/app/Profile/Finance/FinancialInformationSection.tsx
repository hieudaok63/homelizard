import React from "react";
import { type StyleProp, type ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { z } from "zod";

import { ButtonProfile } from "~/components/Profile";
import { ProfileSectionAccordion } from "~/components/ui/Profile";
import TextInputController from "~/components/ui/input/TextInputController";
import { useZodForm } from "~/hooks/useZodForm";

export const FinancialInformationSection = ({
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
      title="Finanzierung"
      variant="blue"
      progress={0}
      style={style}
    >
      <KeyboardAwareScrollView>
        <TextInputController
          name="test"
          control={control}
          placeholder="Noch nicht verfügbar"
          label="Finanzierung"
          variant="inline"
        />
        <ButtonProfile
          onPress={() => {}}
          variant="blue"
          progress={20}
          title="Nachweise"
          description="Einkommensnachweis, Kontoauszüge"
          IconLeftProps
        />
        <ButtonProfile
          onPress={() => {}}
          variant="blue"
          progress={20}
          title="Wirtschaftliche Bonität"
          description="Gehalt, Werte, monatliche Ausgaben"
          IconLeftProps
        />
        <ButtonProfile
          onPress={() => {}}
          variant="blue"
          progress={20}
          title="Travel"
          description="Your travel destinations"
          IconLeftProps
          isLastItem
        />
      </KeyboardAwareScrollView>
    </ProfileSectionAccordion>
  );
};
