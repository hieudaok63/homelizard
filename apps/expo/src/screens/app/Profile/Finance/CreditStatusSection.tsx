import React from "react";
import { type StyleProp, type ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { t } from "i18next";
import { z } from "zod";

import { ProfileSectionAccordion } from "~/components/ui/Profile";
import TextInputController from "~/components/ui/input/TextInputController";
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
    <ProfileSectionAccordion
      title={t("profile:finance.zusagen.title")}
      variant="blue"
      progress={41}
      style={style}
    >
      <KeyboardAwareScrollView>
        <TextInputController
          name="test"
          control={control}
          placeholder={t(
            "profile:finance.zusagen.creditworthiness.description",
          )}
          label={t("profile:finance.zusagen.creditworthiness.title")}
          variant="inline"
        />
        <TextInputController
          name="test"
          control={control}
          placeholder={t(
            "profile:finance.zusagen.creditworthiness.description",
          )}
          label={t("profile:finance.zusagen.creditworthiness.title")}
          variant="inline"
        />
      </KeyboardAwareScrollView>
    </ProfileSectionAccordion>
  );
};
