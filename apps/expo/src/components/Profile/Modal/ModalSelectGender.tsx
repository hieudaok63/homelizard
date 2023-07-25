import React, { type Dispatch, type SetStateAction } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

import { genderOptions } from "@homelizard/schema";

import ArrowDownIcon from "@assets/icons/ArrowDownIcon.svg";
import QuestionCircleIcon from "@assets/icons/QuestionCircleIcon.svg";

import { BottomSheet } from "~/components/ui";

interface IModalSelectGender {
  showModal?: boolean;

  setShowModal?: Dispatch<SetStateAction<boolean>>;
  setValue?: any;
  onSubmit?: any;
}

export const ModalSelectGender = ({
  showModal,
  setShowModal,
  setValue,
  onSubmit,
}: IModalSelectGender) => {
  const { t } = useTranslation();

  return (
    <BottomSheet
      height={500}
      show={showModal}
      onOuterClick={() => setShowModal(false)}
      setShow={() => setShowModal(false)}
      className="opacity-0"
    >
      <View>
        <View className="border-color_gray flex-row justify-between border-b p-6">
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <ArrowDownIcon fill="#000000" />
          </TouchableOpacity>
          <Text className="text-placeholder text-font-24 font-weight_400">
            Anrede
          </Text>
          <TouchableOpacity>
            <QuestionCircleIcon />
          </TouchableOpacity>
        </View>

        {genderOptions?.map((item) => (
          <TouchableOpacity
            key={item}
            className="border-color_gray flex-row justify-center border-b py-4"
            onPress={() => {
              setValue("gender", item, { shouldValidate: true });
              setShowModal(false);
              onSubmit();
            }}
          >
            <Text className="text-blue_1 text-font-24 font-weight_400">
              {t(`gender.${item}`)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </BottomSheet>
  );
};
