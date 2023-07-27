import React from "react";
import { View } from "react-native";

import { ContactDetailSection } from "./ContactDetailSection";
import { ProfessionSection } from "./ProfessionSection";
import { LayoutBasicInfo } from "./_layout";

export const ListBasicSection = () => {
  return (
    <LayoutBasicInfo>
      <View className="flex flex-col space-y-2">
        <ContactDetailSection />
        <ProfessionSection />
      </View>
    </LayoutBasicInfo>
  );
};
