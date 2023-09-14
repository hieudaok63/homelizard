import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";

import { AppText } from "./AppText";
import { Button } from "./Button";

interface InputMultiSelectProps {
  value: string[];
  data: string[];
  onSelected: (values: string[]) => void;
  placeholder?: string;
  label?: string;
}
export const InputMultiSelect = (props: InputMultiSelectProps) => {
  const { value = [], data, onSelected, label = "", placeholder = "" } = props;
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [listSelect, setListSelect] = useState<string[]>([]);
  const isSelected = (objectType: string) => {
    return listSelect.includes(objectType);
  };
  useEffect(() => {
    setListSelect(value);
  }, [value, isShowModal]);
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        key={item}
        className={`flex-row items-center justify-center border-b border-color_gray py-4 ${
          isSelected(item) && "bg-[#0080FF]"
        }`}
        onPress={() => {
          toggleObjectType(item);
        }}
      >
        <Text
          className={`text-font-24 font-weight_400 ${
            isSelected(item) ? "text-white" : "text-blue_1"
          }`}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  const toggleObjectType = (item: string) => {
    const index = listSelect.indexOf(item);
    if (index > -1) {
      setListSelect([
        ...listSelect.slice(0, index),
        ...listSelect.slice(index + 1),
      ]);
    } else {
      setListSelect([...listSelect, item]);
    }
  };
  return (
    <View>
      <View className="flex-1 flex-row  justify-between p-4">
        <AppText classText="w-[35%] bg-white text-[#828282D9]" text={label} />
        <TouchableOpacity
          onPress={() => setIsShowModal(true)}
          className="w-[65%]"
          style={{
            borderBottomColor: "#0000001F",
            borderBottomWidth: 1,
          }}
        >
          <Text className="pb-2 text-base font-medium">
            {value.join(" ,") || placeholder}
          </Text>
        </TouchableOpacity>
      </View>

      {/* bottom menu */}
      <Modal
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          setIsShowModal(false);
        }}
        visible={isShowModal}
      >
        <View className="flex-1 justify-end">
          <TouchableNativeFeedback
            onPress={() => {
              setIsShowModal(false);
            }}
          >
            <View
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            />
          </TouchableNativeFeedback>
          <View className="h-[70%] bg-white">
            <View className="border-b border-color_gray">
              <Text className="py-4 text-center text-font-24 font-weight_400 text-grey opacity-80">
                {label}
              </Text>
            </View>
            <FlatList data={data} renderItem={renderItem} />

            <Button
              className="mb-9 h-12 w-[143px] self-center rounded-[28px] bg-[#0080FF]"
              title="Ok"
              onPress={() => {
                setIsShowModal(false);
                onSelected(listSelect);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
