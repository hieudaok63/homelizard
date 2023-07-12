import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

import CvIcon from "@assets/icons/CvIcon.svg";
import DefaultYellowIcon from "@assets/icons/DefaultYellowIcon.svg";
import GoogleDriveIcon from "@assets/icons/GoogleDriveIcon.svg";
import IconPlus from "@assets/icons/IconPlus.svg";

import { BottomSheet, ButtonActionMain } from "~/components/ui";
import { AppText } from "~/components/ui/AppText";
import { HeaderForm, LayoutForm } from "~/components/ui/Profile";
import { UploadFile } from "~/components/ui/UploadFile";
import { LayoutBasicInfo } from "./_layout";

export const listAction = ["Upload File", "Add link"];

export const CurriculumVitaeSection = () => {
  const { t } = useTranslation();
  const [showModalAdd, setShowModalAdd] = useState(false);

  return (
    <LayoutBasicInfo>
      <LayoutForm>
        <View className="mt-5 h-[80%] rounded-[45px] bg-white">
          <HeaderForm
            iconLeft={<DefaultYellowIcon />}
            title="Curriculum vitae"
            progress={90}
            variant="yellow"
          />
          <View>
            <UploadFile
              titleFile="2021_CV.pdf"
              typeFileUpload="cv"
              onPress={() => alert(1)}
              iconLeft={<CvIcon />}
              dateCreate="10 Oct 2021"
            />
            <UploadFile
              titleFile="CV_Updated.pdf"
              typeFileUpload="drive"
              onPress={() => alert(1)}
              iconLeft={<GoogleDriveIcon />}
              dateCreate="10 Oct 2021"
            />
          </View>
          <ButtonActionMain
            title="Add"
            isProgressbar={false}
            onPress={() => setShowModalAdd(true)}
            progress={0}
            styleBoxShadowBtn={false}
            IconRightProps={<IconPlus />}
            classTitleButton="text-grey text-font-25"
            activeOpacity={0.5}
            classButton="w-full border-b border-placeholder"
          />
        </View>

        <BottomSheet
          show={showModalAdd}
          height={500}
          onOuterClick={() => setShowModalAdd(false)}
          setShow={() => setShowModalAdd(false)}
          className="opacity-0"
        >
          <View>
            <View className="border-color_gray  border-b p-6">
              <AppText
                text="Add CV"
                className="text-placeholder text-font-24 font-weight_400 text-center"
              />
            </View>

            {listAction?.map((item) => (
              <TouchableOpacity
                key={item}
                className="border-color_gray flex-row justify-center border-b py-4"
                onPress={() => {
                  setShowModalAdd(false);
                }}
              >
                <AppText
                  text={item}
                  className="text-blue_1 text-font-24 font-weight_400"
                />
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheet>
      </LayoutForm>
    </LayoutBasicInfo>
  );
};
