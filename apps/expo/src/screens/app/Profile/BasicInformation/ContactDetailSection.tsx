import React from "react";
import { type StyleProp, type ViewStyle } from "react-native";
import { t } from "i18next";

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
      title={t("profile:contactDetails.title")}
      progress={contactDetailProgress}
      variant="yellow"
      style={style}
    >
      <ButtonProfile
        onPress={() => navigation.navigate("BasicInfoSection")}
        variant="yellow"
        progress={basicInformationProgress}
        title={t("profile:contactDetails.basicData.title")}
        description={t("profile:contactDetails.basicData.description")}
      />
      <ButtonProfile
        onPress={() => navigation.navigate("MobilePhoneSection")}
        variant="yellow"
        progress={mobilePhoneProgress}
        title={t("profile:contactDetails.mobilePhone.title")}
        description={t("profile:contactDetails.mobilePhone.description")}
      />
      <ButtonProfile
        onPress={() => navigation.navigate("EmailAndWebSection")}
        variant="yellow"
        progress={emailAndWebProgress}
        title={t("profile:contactDetails.emailWeb.title")}
        description={t("profile:contactDetails.emailWeb.description")}
      />
      <ButtonProfile
        onPress={() => navigation.navigate("AddressSection")}
        variant="yellow"
        progress={addressProgress}
        title={t("profile:contactDetails.address.title")}
        description={t("profile:contactDetails.address.description")}
      />
    </ProfileSectionAccordion>
  );
};
