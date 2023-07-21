import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { z } from "zod";

import { cn } from "@homelizard/tailwind-config/utils";

import ArrowDownIcon from "@assets/icons/ArrowDownIcon.svg";
import ArrowUpIcon from "@assets/icons/ArrowUpIcon.svg";

import { ButtonProfile } from "~/components/Profile";
import { BottomNavBarPadding } from "~/components/navigation/NavBar";
import { ButtonActionMain } from "~/components/ui";
import InputProfile from "~/components/ui/input/InputProfile";
import { useZodForm } from "~/hooks/useZodForm";
import { LayoutSearchHistory } from "./_layoutSearchHistory";

export const HausSearchOption = () => {
  const [showListOption, setShowListOption] = useState(true);
  const formSchema = z.object({
    category: z.string(),
    object_type: z.string(),
    location_radius: z.string(),
    property: z.string(),
    living_space: z.string(),
    room: z.string(),
    style: z.string(),
    construction_year: z.string(),
    standard: z.string(),
    availability: z.string(),
  });
  const { control } = useZodForm({
    schema: formSchema,
    defaultValues: {
      category: "Haus",
      object_type: "Einfamilienhaus",
      location_radius: "München, 25 km",
      property: "800 m²",
      living_space: "210 m²",
      room: "8",
      style: "Modern",
      construction_year: "2004",
      standard: "Gehoben",
      availability: "12.12.2023",
    },
  });

  return (
    <LayoutSearchHistory>
      <KeyboardAwareScrollView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="pb-3 pt-3"
        showsVerticalScrollIndicator={false}
      >
        <ButtonActionMain
          onPress={() => setShowListOption((pre) => !pre)}
          title="Haus"
          IconLeftProps
          variant="turquoise"
          progress={54}
          description="Einfamilienhaus, München"
          isProgressbar
          IconRightProps={
            showListOption ? (
              <ArrowUpIcon color="white" width={24} height={24} />
            ) : (
              <ArrowDownIcon fill="#000000" />
            )
          }
          onPressIconRight={() => setShowListOption((pre) => !pre)}
          styleBoxShadowBtn={true}
          classButton={cn(
            "rounded-none",
            showListOption ? "rounded-t-[40px]" : "rounded-full",
          )}
          activeOpacity={0.8}
        />
        {showListOption && (
          <>
            <InputProfile
              name="category"
              control={control}
              placeholder="Noch nicht verfügbar"
              label="Kategorie"
              inputGrey
            />
            <InputProfile
              name="object_type"
              control={control}
              placeholder="Noch nicht verfügbar"
              label="Objekttyp"
              inputGrey
            />
            <InputProfile
              name="location_radius"
              control={control}
              placeholder="Noch nicht verfügbar"
              label="Ort, Umkreis"
              inputGrey
            />
            <InputProfile
              name="property"
              control={control}
              placeholder="Noch nicht verfügbar"
              label="Grundstück"
              inputGrey
            />
            <InputProfile
              name="living_space"
              control={control}
              placeholder="Noch nicht verfügbar"
              label="Wohnfläche"
              inputGrey
            />
            <InputProfile
              name="room"
              control={control}
              placeholder="Noch nicht verfügbar"
              label="Zimmer"
              inputGrey
            />
            <InputProfile
              name="style"
              control={control}
              placeholder="Noch nicht verfügbar"
              label="Stil"
              inputGrey
            />
            <InputProfile
              name="construction_year"
              control={control}
              placeholder="Noch nicht verfügbar"
              label="Baujahr"
              inputGrey
            />
            <InputProfile
              name="standard"
              control={control}
              placeholder="Noch nicht verfügbar"
              label="Standard"
              inputGrey
            />
            <InputProfile
              name="availability"
              control={control}
              placeholder="Noch nicht verfügbar"
              label="Verfügbarkeit"
              inputGrey
            />
            <ButtonProfile
              onPress={() => alert(1)}
              onPressIconRight={() => alert(1)}
              variant="turquoise"
              progress={20}
              title="Mehrfamilienhaus"
              description="Mehrfamilienhaus, Rosenheim"
              IconLeftProps
            />
            <ButtonProfile
              onPress={() => alert(1)}
              onPressIconRight={() => alert(1)}
              variant="turquoise"
              progress={20}
              title="Wohnung"
              description="Loft, München"
              IconLeftProps
              lastItemButton
            />
          </>
        )}
        <BottomNavBarPadding />
      </KeyboardAwareScrollView>
    </LayoutSearchHistory>
  );
};
