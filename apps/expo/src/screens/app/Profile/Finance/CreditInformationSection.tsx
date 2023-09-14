import React, { type Dispatch, type SetStateAction } from "react";
import { type StyleProp, type ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { t } from "i18next";
import { z } from "zod";

import PropertyIcon from "@assets/icons/PropertyIcon.svg";

import { ButtonProfile } from "~/components/Profile";
import { ProfileSectionAccordion } from "~/components/ui/Profile";
import TextInputController from "~/components/ui/input/TextInputController";
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
      title={t("profile:finance.zusagen.creditworthiness.title")}
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
        <ButtonProfile
          onPress={() => {}}
          variant="blue"
          progress={25}
          title={t(
            "profile:finance.zusagen.creditworthiness.creditInformation",
          )}
          description={t(
            "profile:finance.zusagen.creditworthiness.paymentHistory",
          )}
          IconLeftProps
        />
        <ButtonProfile
          onPress={() => {}}
          variant="blue"
          progress={20}
          title={t("profile:finance.zusagen.creditworthiness.placeOfResidence")}
          description={t(
            "profile:finance.zusagen.creditworthiness.bisherigeWohnorte",
          )}
          IconLeftProps
        />
        <ButtonProfile
          onPress={() => {}}
          variant="blue"
          progress={20}
          title={t("profile:finance.zusagen.creditworthiness.maritalStatus")}
          description={t(
            "profile:finance.zusagen.creditworthiness.desMaritalStatus",
          )}
          IconLeftProps
        />
        <ButtonProfile
          onPress={() => {}}
          variant="blue"
          progress={20}
          title={t("profile:finance.zusagen.creditworthiness.currentLoans")}
          description={t(
            "profile:finance.zusagen.creditworthiness.desCurrentLoans",
          )}
          IconLeftProps
        />
        <ButtonProfile
          onPress={() => {}}
          variant="blue"
          progress={20}
          title={t("profile:finance.zusagen.creditworthiness.desInvestments")}
          description={t(
            "profile:finance.zusagen.creditworthiness.desInvestments",
          )}
          IconLeftProps={<PropertyIcon />}
        />
        <ButtonProfile
          onPress={() => {}}
          variant="blue"
          progress={20}
          title={t("profile:finance.zusagen.creditworthiness.investments")}
          description={t(
            "profile:finance.zusagen.creditworthiness.desInvestments",
          )}
          IconLeftProps
          isLastItem
        />
      </KeyboardAwareScrollView>
    </ProfileSectionAccordion>
  );
};
