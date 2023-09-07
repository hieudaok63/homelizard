import React from "react";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import dayjs from "dayjs";

import CvIcon from "@assets/icons/CvIcon.svg";
import GoogleDriveIcon from "@assets/icons/GoogleDriveIcon.svg";

import { AppText } from "./AppText";

interface IUploadFile {
  typeFileUpload: "upload" | "link" | "none";
  onPress: () => void;
  activeOpacity?: number;

  classButton?: string;

  titleFile: string;
  classTitleButton?: string;
  dateCreate: string;
  iconLeft?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const UploadFile = ({
  titleFile,
  classTitleButton,
  typeFileUpload,
  activeOpacity,
  classButton,
  style,
  onPress,
  dateCreate,
  iconLeft,
}: IUploadFile) => {
  return (
    <TouchableOpacity
      className={`flex w-full flex-row items-center pl-5 ${classButton}`}
      onPress={onPress}
      style={style}
      activeOpacity={activeOpacity}
    >
      {typeFileUpload === "link" ? <GoogleDriveIcon /> : <CvIcon />}
      <View className="w-full pb-2 pl-4">
        <AppText
          text={titleFile}
          numberOfLines={2}
          className={`mt-2 pb-2 text-font-18 font-weight_700 ${classTitleButton}`}
        />
        <View className="mb-2 flex w-3/5 flex-row items-center">
          <View className="mr-2 rounded-full bg-text_yellow">
            <AppText text="Private" className="p-1 font-weight_500" />
          </View>
          {typeFileUpload === "link" ? (
            <AppText
              text="Via Google Drive"
              className="mr-1 font-weight_700 text-blue_1"
            />
          ) : (
            <AppText
              text={dayjs(dateCreate).format("DD MMM YYYY")}
              className="mr-1 font-weight_700 text-grey"
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
