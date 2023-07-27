import React from "react";
import { type StyleProp, type ViewStyle } from "react-native";

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
      title="Beruf"
      description="Ihr Arbeitsplatz und Lebenslauf"
      variant="yellow"
      progress={14}
      style={style}
    >
      <ButtonProfile
        onPress={() => navigation.navigate("PlaceOfWorkSection")}
        variant="yellow"
        progress={20}
        title="Arbeitsplatz"
        description="Wo und wie arbeiten Sie?"
      />
      <ButtonProfile
        onPress={() => navigation.navigate("CurriculumVitaeSection")}
        variant="yellow"
        progress={20}
        title="Curriculum vitae"
        description="Ausbildung, Qualifikation"
        isLastItem
      />
    </ProfileSectionAccordion>
  );
};
