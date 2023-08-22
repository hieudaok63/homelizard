import React, { type Dispatch, type SetStateAction } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { BottomSheet } from "~/components/ui";
import { AppText } from "~/components/ui/AppText";

interface IModalOpenFile {
  showModal?: boolean;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  title?: string;
  handleActionRemove: () => void;
  openFile: () => void;
}

const ModalOpenFile = ({
  showModal = false,
  setShowModal = () => {},
  title = "",
  handleActionRemove,
  openFile,
}: IModalOpenFile) => {
  return (
    <BottomSheet
      show={showModal}
      height={500}
      onClose={() => setShowModal(false)}
    >
      <View>
        <View className="border-color_gray  border-b p-6">
          <AppText
            text={title}
            className="text-placeholder text-font-24 font-weight_400 pt-5 text-center"
          />
        </View>
        <TouchableOpacity
          className="border-color_gray flex-row justify-center border-b py-4"
          onPress={() => {
            setShowModal(false);
            setTimeout(() => {
              openFile();
            }, 0);
          }}
        >
          <AppText
            text="Open"
            className="text-blue_1 text-font-24 font-weight_400 pt-5"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="border-color_gray flex-row justify-center border-b py-4"
          onPress={() => {
            setShowModal(false);

            setTimeout(() => {}, 0);
          }}
        >
          <AppText
            text="Share"
            className="text-blue_1 text-font-24 font-weight_400 pt-5"
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="border-color_gray flex-row justify-center border-b py-4"
          onPress={() => {
            setShowModal(false);
            setTimeout(() => {
              handleActionRemove();
            }, 0);
          }}
        >
          <AppText
            text="Remove file"
            className="text-red_1 text-font-24 font-weight_400 pt-5"
          />
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default ModalOpenFile;
