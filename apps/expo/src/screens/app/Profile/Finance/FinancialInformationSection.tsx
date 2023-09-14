import React from "react";
import { type StyleProp, type ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { t } from "i18next";
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
      title={t("profile:finance.zusagen.creditworthiness.financing")}
      variant="blue"
      progress={0}
      style={style}
    >
      <KeyboardAwareScrollView>
        <TextInputController
          name="test"
          control={control}
          placeholder={t(
            "profile:finance.zusagen.creditworthiness.notYetAvailable",
          )}
          label={t("profile:finance.zusagen.creditworthiness.financing")}
          variant="inline"
        />
        <ButtonProfile
          onPress={() => {}}
          variant="blue"
          progress={20}
          title={t("profile:finance.zusagen.creditworthiness.proof")}
          description={t("profile:finance.zusagen.creditworthiness.desProof")}
          IconLeftProps
        />
        <ButtonProfile
          onPress={() => {}}
          variant="blue"
          progress={20}
          title={t(
            "profile:finance.zusagen.creditworthiness.economicCreditworthiness",
          )}
          description={t(
            "profile:finance.zusagen.creditworthiness.desEconomicCreditworthiness",
          )}
          IconLeftProps
        />
        <ButtonProfile
          onPress={() => {}}
          variant="blue"
          progress={20}
          title={t("profile:finance.zusagen.creditworthiness.travel")}
          description={t("profile:finance.zusagen.creditworthiness.desTravel")}
          IconLeftProps
          isLastItem
        />
      </KeyboardAwareScrollView>
    </ProfileSectionAccordion>
  );
};
