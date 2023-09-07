import React from "react";
import { FlatList, ListRenderItem, TouchableOpacity, View } from "react-native";
import { t } from "i18next";

import { cn } from "@homelizard/tailwind-config/utils";

import { GoogleDriveIcon } from "@assets/icons";
import ArrowRightIcon from "@assets/icons/ArrowRightIcon.svg";

import { api } from "~/utils/api";
import { AppText } from "~/components/ui/AppText";
import { UploadFile } from "~/components/ui/UploadFile";
import { styleBoxShadow } from "./ContentDashBoard";

export const DATA_UPLOAD = [
  {
    id: 1,
    name: "Copy Name Image",
    date: "10 Oct 2023",
    type: "Shared",
  },
  {
    id: 2,
    name: "Drive File",
    date: "10 Oct 2023",
    type: "Private",
  },
];

interface IItem {
  id: number;
  name: string;
  date: string;
  type: string;
}

const badgeColorByType = (type: string) => {
  switch (type) {
    case "Shared":
      return "bg-blue";
    case "Private":
      return "bg-text_yellow";

    default:
      return "";
  }
};

export const UploadSection = () => {
  const { data, isLoading } = api.profile.listProfileCV.useQuery({
    page: 1,
    limit: 50,
  });

  console.log({ data });

  if (!data?.data.length) return null;
  return (
    <View className="mb-4 px-8">
      <View className="flex flex-row items-center justify-between pb-4 pt-3">
        <AppText text={t("home:uploads")} large className="text-purple" />
        <TouchableOpacity activeOpacity={0.5}>
          <AppText text={t("home:seeAll")} className="text-blue" />
        </TouchableOpacity>
      </View>
      <FlatList data={data?.data || []} renderItem={UploadItem} />
    </View>
  );
};

const UploadItem = ({ item }) => {
  const { blobName, cvType, updatedAt } = item;
  return (
    <UploadFile
      titleFile={blobName}
      typeFileUpload={cvType}
      onPress={() => {}}
      iconLeft={<GoogleDriveIcon />}
      dateCreate={updatedAt}
      classButton="bg-white rounded-full"
      style={[styleBoxShadow]}
    />
  );
};
