import React from "react";
import { ScrollView } from "react-native";

import { BottomNavBarPadding } from "~/components/navigation/NavBar";
import { ContactDetailSection } from "./ContactDetailSection";
import { ProfessionSection } from "./ProfessionSection";
import { LayoutBasicInfo } from "./_layout";

export const ListBasicSection = () => {
  return (
    <LayoutBasicInfo>
      <ScrollView className="space-y-2" showsVerticalScrollIndicator={false}>
        <ContactDetailSection />
        <ProfessionSection />
        <BottomNavBarPadding />
      </ScrollView>
    </LayoutBasicInfo>
  );
};
