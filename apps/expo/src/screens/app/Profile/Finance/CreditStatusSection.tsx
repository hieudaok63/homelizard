import React from "react";
import { type StyleProp, type ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { z } from "zod";

import { ProfileSectionAccordion } from "~/components/ui/Profile";
import InputProfile from "~/components/ui/input/InputProfile";
import { useZodForm } from "~/hooks/useZodForm";

export const CreditStatusSection = ({
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
    <ProfileSectionAccordion title="Zusagen" variant="blue" progress={41} style={style}>
      <KeyboardAwareScrollView>
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
      </KeyboardAwareScrollView>
    </ProfileSectionAccordion>
  );
};
