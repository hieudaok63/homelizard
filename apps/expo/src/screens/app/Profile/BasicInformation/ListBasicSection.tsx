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
      <View className="flex flex-col space-y-2">
        <View>
          <ContactDetailSection
            isShowModal={showOptionContact}
            setShowListOption={setShowOptionContact}
            title="Kontaktdetails"
          />
        </View>
        <View>
          <ProfessionSection
            setShowListOption={setShowOptionProfession}
            isShowModal={showOptionProfession}
            title="Beruf"
            description="Ihr Arbeitsplatz und Lebenslauf"
          />
        </View>
      </View>
    </LayoutBasicInfo>
  );
};
