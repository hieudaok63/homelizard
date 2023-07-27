import React from "react";
import { type StyleProp, type ViewStyle } from "react-native";

import { ButtonProfile } from "~/components/Profile";
import { useAppNavigation } from "~/components/navigation/useAppNavigation";
import { ProfileSectionAccordion } from "~/components/ui/Profile";
import { progressSlice } from "~/zustand/store";

interface ContactDetailSection {
  style?: StyleProp<ViewStyle>;
}

export const ContactDetailSection = ({ style }: ContactDetailSection) => {
  const navigation = useAppNavigation();

  const {
    addressProgress,
    basicInformationProgress,
    contactDetailProgress,
    emailAndWebProgress,
    mobilePhoneProgress,
  } = progressSlice((state) => state);
  return (
    <ProfileSectionAccordion
      title="Kontaktdaten"
      progress={contactDetailProgress}
      variant="yellow"
      style={style}
    >
      <ButtonProfile
        onPress={() => navigation.navigate("BasicInfoSection")}
        variant="yellow"
        progress={basicInformationProgress}
        title="Basisdaten"
        description="Titel, Namen, Beruf, Geburtsdaten"
      />
      <ButtonProfile
        onPress={() => navigation.navigate("MobilePhoneSection")}
        variant="yellow"
        progress={mobilePhoneProgress}
        title="Mobile phone"
        description="Telefonische Erreichbarkeit"
      />
      <ButtonProfile
        onPress={() => navigation.navigate("EmailAndWebSection")}
        variant="yellow"
        progress={emailAndWebProgress}
        description="Email- und Web-Adressen"
        title="Email & web"
      />
      <ButtonProfile
        onPress={() => navigation.navigate("AddressSection")}
        variant="yellow"
        progress={addressProgress}
        title="Adressen"
        description="Wo und wie arbeiten Sie?"
      />
    </ProfileSectionAccordion>
  );
};
