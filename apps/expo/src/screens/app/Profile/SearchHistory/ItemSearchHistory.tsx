import React from "react";
import { View } from "react-native";
import dayjs from "dayjs";
import { z } from "zod";

import InputProfile from "~/components/ui/input/InputProfile";
import { useZodForm } from "~/hooks/useZodForm";
import { type SearchProfileItem } from "./ListSearchHistorySection";

const formSchema = z.object({
  objectType: z.string(),
  radius: z.string(),
  plotSize: z.string(),
  livingAreaSize: z.string(),
  roomAmount: z.string(),
  // TODO: change to select objectStyles
  objectStyle: z.string(),
  yearOfConstruction: z.string(),
  availability: z.string(),
  status: z.boolean(),
});

export const ItemSearchProfile = ({ item }: { item: SearchProfileItem }) => {
  const { control } = useZodForm({
    schema: formSchema,
    defaultValues: {
      objectType: item.objectType,
      radius: `${
        item?.address?.city ? item?.address?.city + "," : ""
      } ${item.radius.toString()}`.trim(),
      plotSize: `${item.plotSize.toString()}`,
      livingAreaSize: `${item.livingAreaSize.toString()}`,
      roomAmount: item.roomAmount.toString(),
      objectStyle: item.objectStyles?.join(", "),
      yearOfConstruction: `${item.startYearOfConstruction} - ${item.endYearOfConstruction}`,
      availability: dayjs(item.availability).format("DD.MM.YYYY"),
    },
  });

  // main return
  return (
    <View>
      <InputProfile
        name="objectType"
        control={control}
        placeholder="Noch nicht verfügbar"
        label="Objekttyp"
        inputGrey
      />
      <InputProfile
        name="radius"
        control={control}
        placeholder="Noch nicht verfügbar"
        label="Ort, Umkreis (km)"
        inputGrey
      />
      <InputProfile
        name="plotSize"
        control={control}
        placeholder="Noch nicht verfügbar"
        label="Grundstück (m²)"
        inputGrey
      />
      <InputProfile
        name="livingAreaSize"
        control={control}
        placeholder="Noch nicht verfügbar"
        label="Wohnfläche (m²)"
        inputGrey
      />
      <InputProfile
        name="roomAmount"
        control={control}
        placeholder="Noch nicht verfügbar"
        label="Zimmer"
        inputGrey
      />
      <InputProfile
        name="objectStyle"
        control={control}
        placeholder="Noch nicht verfügbar"
        label="Stil"
        inputGrey
      />
      <InputProfile
        name="yearOfConstruction"
        control={control}
        placeholder="Noch nicht verfügbar"
        label="Baujahr"
        inputGrey
      />
      <InputProfile
        name="availability"
        control={control}
        placeholder="Noch nicht verfügbar"
        label="Verfügbarkeit"
        inputGrey
      />
    </View>
  );
};
