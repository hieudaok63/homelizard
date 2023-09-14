import React from "react";
import { type StyleProp, type ViewStyle } from "react-native";
import { t } from "i18next";

import { ButtonProfile } from "~/components/Profile";
import { useAppNavigation } from "~/components/navigation/useAppNavigation";
import { ProfileSectionAccordion } from "~/components/ui/Profile";

interface ProfessionSectionProps {
  style?: StyleProp<ViewStyle>;
}

export const ProfessionSection = ({ style }: ProfessionSectionProps) => {
  const navigation = useAppNavigation();

  return (
    <ProfileSectionAccordion
      title={t("profile:contactDetails.profession.title")}
      description={t("profile:contactDetails.profession.description")}
      variant="yellow"
      progress={14}
      style={style}
    >
      <ButtonProfile
        onPress={() => navigation.navigate("PlaceOfWorkSection")}
        variant="yellow"
        progress={20}
        title={t("profile:contactDetails.workplace.title")}
        description={t("profile:contactDetails.workplace.description")}
      />
      <ButtonProfile
        onPress={() => navigation.navigate("CurriculumVitaeSection")}
        variant="yellow"
        progress={20}
        title={t("profile:contactDetails.curriculumVitae.title")}
        description={t("profile:contactDetails.curriculumVitae.description")}
        isLastItem
      />
    </ProfileSectionAccordion>
  );
};
