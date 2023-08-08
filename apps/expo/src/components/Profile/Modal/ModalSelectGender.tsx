import React, { type Dispatch, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

import { genderOptions } from "@homelizard/schema";

import ArrowDownIcon from "@assets/icons/ArrowDownIcon.svg";
import QuestionCircleIcon from "@assets/icons/QuestionCircleIcon.svg";

import { BottomSheet } from "~/components/ui";

interface IModalSelectGender {
  showModal?: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  onPressItem?: (e: typeof genderOptions[number]) => void;
}

export const ModalSelectGender = ({
  showModal,
  setShowModal,
  onPressItem,
}: IModalSelectGender) => {
  const { t } = useTranslation();

  return (
    <BottomSheet
      height={500}
      show={!!showModal}
      onOuterClick={() => setShowModal(false)}
      setShow={() => setShowModal(false)}
      className="opacity-0"
    >
      <View>
        <View className="flex-row justify-between border-b border-color_gray p-6">
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <ArrowDownIcon fill="#000000" />
          </TouchableOpacity>
          <Text className="text-font-24 font-weight_400 text-placeholder">
            Anrede
          </Text>
          <TouchableOpacity>
            <QuestionCircleIcon />
          </TouchableOpacity>
        </View>

        {genderOptions?.map((item) => (
          <TouchableOpacity
            key={item}
            className="flex-row justify-center border-b border-color_gray py-4"
            onPress={() => {
              if (onPressItem) {
                onPressItem(item);
              }
              setShowModal(false);
            }}
          >
            <Text className="text-font-24 font-weight_400 text-blue_1">
              {t(`gender.${item}`)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </BottomSheet>
  );
};
