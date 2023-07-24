import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import dayjs from "dayjs";
import { z } from "zod";

import ArrowRightIcon from "@assets/icons/ArrowRightIcon.svg";
import ArrowUpIcon from "@assets/icons/ArrowUpIcon.svg";

import { ButtonProfile } from "~/components/Profile";
import InputProfile from "~/components/ui/input/InputProfile";
import { useZodForm } from "~/hooks/useZodForm";
import { type TypeSearchHistoryProfile } from "./ListSearchHistorySection";

export const ItemSearchProfile = ({
  item,
  onPress,
  selected,
}: {
  item: TypeSearchHistoryProfile;
  onPress: () => void;
  selected?: boolean;
}) => {
  const DetailSearchProfile = ({
    item,
  }: {
    item: TypeSearchHistoryProfile;
  }) => {
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
    const { handleSubmit, control } = useZodForm({
      schema: formSchema,
      defaultValues: {
        objectType: item.objectType,
        radius: `${
          item?.address?.city ? item?.address?.city + "," : ""
        } ${item.radius.toString()}`.trim(),
        plotSize: `${item.plotSize.toString()}`,
        livingAreaSize: `${item.livingAreaSize.toString()}`,
        roomAmount: item.roomAmount.toString(),
        objectStyle: item.objectStyles[0],
        yearOfConstruction: `${item.startYearOfConstruction} - ${item.endYearOfConstruction}`,
        availability: dayjs(item.availability).format("DD.MM.YYYY"),
      },
    });
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        className="flex flex-col rounded-b-[28px] bg-white"
      >
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
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <ButtonProfile
        variant="turquoise"
        title={item.objectType}
        description={item.objectStyles.join(", ")}
        onPress={onPress}
        progress={0}
        IconLeftProps
        IconRightProps={
          selected ? (
            <ArrowUpIcon fill="#000000" />
          ) : (
            <ArrowRightIcon fill="#141313" />
          )
        }
      />
      {selected && <DetailSearchProfile item={item} />}
    </View>
  );
};
