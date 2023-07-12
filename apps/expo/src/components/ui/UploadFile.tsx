import React from "react";
import { TouchableOpacity, View } from "react-native";

import { AppText } from "./AppText";

interface IUploadFile {
  typeFileUpload: "cv" | "drive" | "none";
  onPress: () => void;
  activeOpacity?: number;

  classButton?: string;

  titleFile: string;
  classTitleButton?: string;
  dateCreate: string;
  iconLeft?: React.ReactNode;
}

export const UploadFile = ({
  titleFile,
  classTitleButton,
  typeFileUpload,
  activeOpacity,
  classButton,

  onPress,
  dateCreate,
  iconLeft,
}: IUploadFile) => {
  return (
    <TouchableOpacity
      className={`flex w-full flex-row items-center pl-5 ${classButton}`}
      onPress={onPress}
      activeOpacity={activeOpacity}
    >
      {iconLeft}
      <View className="w-full pb-2 pl-4">
        <AppText
          text={titleFile}
          className={`font-weight_700 text-font-18 mt-2 pb-2 ${classTitleButton}`}
        />
        <View className="mb-2 flex w-3/5 flex-row items-center">
          <View className="bg-text_yellow mr-2 rounded-full">
            <AppText text="Private" className="font-weight_500 p-1" />
          </View>
          {typeFileUpload === "drive" ? (
            <AppText
              text="Via Google Drive"
              className="text-blue_1 font-weight_700 mr-1"
            />
          ) : (
            <AppText
              text={dateCreate}
              className="text-grey font-weight_700 mr-1"
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
