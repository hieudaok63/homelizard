import React, { useState } from "react";
import { View } from "react-native";

import { ContactDetailSection } from "./ContactDetailSection";
import { ProfessionSection } from "./ProfessionSection";
import { LayoutBasicInfo } from "./_layout";

export const ListBasicSection = () => {
  const [showOptionContact, setShowOptionContact] = useState(false);
  const [showOptionProfession, setShowOptionProfession] = useState(false);

  return (
    <LayoutBasicInfo>
      <View className="rounded-[45px] py-5">
        <ContactDetailSection
          isShowModal={showOptionContact}
          setShowListOption={setShowOptionContact}
          title="Kontaktdetails"
        />
      </View>
      <View className="rounded-[45px] ">
        <ProfessionSection
          setShowListOption={setShowOptionProfession}
          isShowModal={showOptionProfession}
          title="Beruf"
          description="Ihr Arbeitsplatz und Lebenslauf"
        />
      </View>
    </LayoutBasicInfo>
  );
};
