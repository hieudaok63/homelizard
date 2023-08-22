import React from "react";
import { View } from "react-native";
import dayjs from "dayjs";
import { z } from "zod";

import { objectTypeSchema } from "@homelizard/schema";

import TextInputController from "~/components/ui/input/TextInputController";
import { useZodForm } from "~/hooks/useZodForm";
import { type SearchProfileItem } from "./ListSearchHistorySection";

const formSchema = z.object({
  objectTypes: z.array(objectTypeSchema),
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
      objectTypes: item.objectTypes,
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
      <TextInputController
        name="objectTypes"
        control={control}
        placeholder="Noch nicht verfügbar"
        label="Objekttyp"
        variant="inline"
      />
      <TextInputController
        name="radius"
        control={control}
        placeholder="Noch nicht verfügbar"
        label="Ort, Umkreis (km)"
        variant="inline"
      />
      <TextInputController
        name="plotSize"
        control={control}
        placeholder="Noch nicht verfügbar"
        label="Grundstück (m²)"
        variant="inline"
      />
      <TextInputController
        name="livingAreaSize"
        control={control}
        placeholder="Noch nicht verfügbar"
        label="Wohnfläche (m²)"
        variant="inline"
      />
      <TextInputController
        name="roomAmount"
        control={control}
        placeholder="Noch nicht verfügbar"
        label="Zimmer"
        variant="inline"
      />
      <TextInputController
        name="objectStyle"
        control={control}
        placeholder="Noch nicht verfügbar"
        label="Stil"
        variant="inline"
      />
      <TextInputController
        name="yearOfConstruction"
        control={control}
        placeholder="Noch nicht verfügbar"
        label="Baujahr"
        variant="inline"
      />
      <TextInputController
        name="availability"
        control={control}
        placeholder="Noch nicht verfügbar"
        label="Verfügbarkeit"
        variant="inline"
      />
    </View>
  );
};
