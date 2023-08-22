import React, { type Dispatch, type SetStateAction } from "react";
import { TouchableOpacity, View } from "react-native";

import { BottomSheet } from "~/components/ui";
import { AppText } from "~/components/ui/AppText";

interface IModalAddFile {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  handleActionUploadFile: any;
  handleActionAddLink: any;
}

export const listAction = ["Upload File", "Add link"];

const ModalAddFile = ({
  showModal,
  setShowModal,
  handleActionUploadFile,
  handleActionAddLink,
}: IModalAddFile) => {
  return (
    <BottomSheet
      show={showModal}
      height={500}
      onClose={() => setShowModal(false)}
    >
      <View>
        <View className="border-color_gray  border-b p-6">
          <AppText
            text="Add CV"
            className="text-placeholder text-font-24 font-weight_400 pt-5 text-center"
          />
        </View>

        <TouchableOpacity
          className="border-color_gray flex-row justify-center border-b py-4"
          onPress={() => {
            setShowModal(false);

            setTimeout(() => {
              handleActionUploadFile();
            }, 0);
          }}
        >
          <AppText
            text="Upload File"
            className="text-blue_1 text-font-24 font-weight_400 pt-5"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="border-color_gray flex-row justify-center border-b py-4"
          onPress={() => {
            setShowModal(false);
            setTimeout(() => {
              handleActionAddLink();
            }, 0);
          }}
        >
          <AppText
            text="Add link"
            className="text-blue_1 text-font-24 font-weight_400 pt-5"
          />
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default ModalAddFile;
