import React from "react";
import { View } from "react-native";
import dayjs from "dayjs";
import { t } from "i18next";
import { z } from "zod";

import {
  objectTypeSchema,
  type ObjectType as IObjectType,
} from "@homelizard/schema";

import { InputMultiSelect } from "~/components/ui";
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
  // objectStyle: z.string(),
  // yearOfConstruction: z.string(),
  availability: z.string(),
  status: z.boolean(),
});
const listObjectTypes: IObjectType[] = [
  "apartment_normal",
  "apartment_maisonette",
  "apartment_attic",
  "apartment_penthouse",
  "apartment_terraced",
  "apartment_studio",
  "house_detached",
  "house_semi_detached",
  "house_row_corner",
  "house_row_middle",
  "house_farm",
];
export const ItemSearchProfile = ({ item }: { item: SearchProfileItem }) => {
  const { control, watch, setValue } = useZodForm({
    schema: formSchema,
    defaultValues: {
      objectTypes: item.objectTypes,
      radius: `${
        item?.address?.city ? item?.address?.city + "," : ""
      } ${item.radius.toString()}`.trim(),
      plotSize: `${item.plotSize.toString()}`,
      livingAreaSize: `${item.livingAreaSize.toString()}`,
      roomAmount: item.roomAmount.toString(),
      // objectStyle: item.objectStyles?.join(", "),
      // yearOfConstruction: `${item.startYearOfConstruction} - ${item.endYearOfConstruction}`,
      availability: dayjs(item.availability).format("DD.MM.YYYY"),
    },
  });

  // main return
  return (
    <View>
      <InputMultiSelect
        data={listObjectTypes}
        value={watch("objectTypes")}
        placeholder={t("profile:search.objectTypes.placeholder")}
        label={t("profile:search.objectTypes.title")}
        onSelected={(values) => {
          setValue("objectTypes", values);
        }}
      />
      <TextInputController
        name="radius"
        control={control}
        placeholder={t("profile:search.objectTypes.placeholder")}
        label={t("profile:search.radius")}
        variant="inline"
      />
      <TextInputController
        name="plotSize"
        control={control}
        placeholder={t("profile:search.objectTypes.placeholder")}
        label={t("profile:search.plotSize")}
        variant="inline"
      />
      <TextInputController
        name="livingAreaSize"
        control={control}
        placeholder={t("profile:search.objectTypes.placeholder")}
        label={t("profile:search.livingAreaSize")}
        variant="inline"
      />
      <TextInputController
        name="roomAmount"
        control={control}
        placeholder={t("profile:search.objectTypes.placeholder")}
        label={t("profile:search.roomAmount")}
        variant="inline"
      />
      {/* <TextInputController
        name="objectStyle"
        control={control}
        placeholder={t("profile:search.objectTypes.placeholder")}
        label={t("profile:search.objectStyle")}
        variant="inline"
      />
      <TextInputController
        name="yearOfConstruction"
        control={control}
        placeholder={t("profile:search.objectTypes.placeholder")}
        label={t("profile:search.yearOfConstruction")}
        variant="inline"
      /> */}
      <TextInputController
        name="availability"
        control={control}
        placeholder={t("profile:search.objectTypes.placeholder")}
        label={t("profile:search.availability")}
        variant="inline"
      />
    </View>
  );
};
