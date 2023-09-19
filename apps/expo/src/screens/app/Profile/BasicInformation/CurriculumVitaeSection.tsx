import React, { useRef, useState } from "react";
import { FlatList, Linking, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import * as DocumentPicker from "expo-document-picker";
import { useTranslation } from "react-i18next";

import GoogleDriveIcon from "@assets/icons/GoogleDriveIcon.svg";
import IconPlus from "@assets/icons/IconPlus.svg";

import { api } from "~/utils/api";
import ModalAddFile from "~/components/Profile/Modal/ModalAddFile";
import ModalOpenFile from "~/components/Profile/Modal/ModalOpenFile";
import ModalUpdateInfoFile from "~/components/Profile/Modal/ModalUpdateInfoFile";
import { SpeechBubbleIcon, type Percentage } from "~/components/ui";
import { HeaderForm, LayoutForm } from "~/components/ui/Profile";
import { UploadFile } from "~/components/ui/UploadFile";
import { useApplicationLoadingStore } from "~/zustand/store";
import { LayoutBasicInfo } from "./_layout";

type ItemListProfileCVType = {
  id: string;
  url: string;
  blobName: any;
  cvType: string;
  fileType: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
export const CurriculumVitaeSection = () => {
  const { t } = useTranslation("profile");
  const trpc = api.useContext();
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [showModalOpen, setShowModalOpen] = useState<boolean>(false);
  const [selectFile, setSelectFile] = useState<ItemListProfileCVType>();
  const [isAddLink, setIsAddLink] = useState<boolean>(false);
  const [singleFile, setSingleFile] = useState(null);
  const refList = useRef<any>(null);
  const setLoading = useApplicationLoadingStore((state) => state.setLoading);
  const { data, isLoading } = api.profile.listProfileCV.useQuery({
    page: 1,
    limit: 50,
  });
  console.log({ data });

  //upload link
  const addLinkCV = api.profile.addCVByLink.useMutation({
    onSuccess: async () => {
      setIsAddLink(false);
      setLoading(false);
      Toast?.show({
        type: "success",
        text1: t("contactDetails.curriculumVitae.uploadLink"),
        visibilityTime: 5000,
      });
      await trpc.profile.listProfileCV.invalidate();
    },
  });

  const handleActionAddLink = async (params: {
    blobName: string;
    link: string;
  }) => {
    await setIsAddLink(false);
    setLoading(true);

    await addLinkCV.mutateAsync(params);
  };

  //upload file
  const handleUploadFile = async (params: any) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        type: "*/*",
      });

      if (result?.type === "success") {
        // Printing the log realted to the file
        callApiUploadFile(result);
        // Setting the state to show single file attributes
        // setSingleFile(result);
      }
    } catch (err) {
      setSingleFile(null);
      console.warn(err);
      return false;
    }
  };
  const getBlob = async (fileUri: string) => {
    const resp = await fetch(fileUri);
    const imageBody = await resp.blob();
    return imageBody;
  };
  const callApiUploadFile = async (image: any) => {
    if (!image) {
      return;
    }
    setLoading(true);
    const imageBlob = await getBlob(image.uri);

    const { url } = await trpc.client.profile.signUploadFileUrl.query({
      fileSize: imageBlob.size,
      blobName: image?.name,
      fileType: imageBlob?.type,
    });
    const { url: urlImageOnline } =
      await trpc.client.profile.signedFileUrl.query({
        blobName: image?.name,
        fileType: "curriculumVitae",
      });

    await fetch(url, {
      method: "PUT",
      body: imageBlob,
    });

    Toast?.show({
      type: "success",
      text1: t("contactDetails.curriculumVitae.successAddFile"),
      visibilityTime: 5000,
    });
    await trpc.profile.listProfileCV.invalidate();
    setLoading(false);
  };
  //delete item
  const { mutate: removeFileCV } = api.profile.removeFile.useMutation({
    onSuccess: async (value) => {
      console.log({ value });

      Toast?.show({
        type: "success",
        text1: t("contactDetails.curriculumVitae.deleteFile"),
        visibilityTime: 5000,
      });
      await trpc.profile.listProfileCV.invalidate();
    },
  });
  const deleteFile = (id?: string) => {
    console.log({ id }, { selectFile });
    if (id) {
      removeFileCV({ fileId: id });
    }
  };
  //
  const openFile = async (value?: ItemListProfileCVType) => {
    if (value?.cvType === "link") {
      Linking.openURL(value.url || "");
    } else {
      const { url: urlImageOnline } =
        await trpc.client.profile.signedFileUrl.query({
          blobName: value?.blobName,
          fileType: "curriculumVitae",
        });
      Linking.openURL(urlImageOnline || "");
    }
  };
  //ui
  const renderItem = ({ item, index }) => {
    const { blobName, cvType, updatedAt } = item;
    return (
      <UploadFile
        titleFile={blobName}
        typeFileUpload={cvType}
        onPress={() => {
          setShowModalOpen(true);
          setSelectFile(item);
        }}
        iconLeft={<GoogleDriveIcon />}
        dateCreate={updatedAt}
      />
    );
  };
  if (!data) return null;
  return (
    <>
      <LayoutBasicInfo>
        <LayoutForm>
          <View className="mt-5 h-[70%] rounded-[45px] bg-white">
            <HeaderForm
              iconLeft={<SpeechBubbleIcon color="yellow" />}
              title={t("contactDetails.curriculumVitae.title")}
              progress={
                (data.data?.length < 11
                  ? Number(data.data?.length / 10) * 100
                  : 100) as Percentage
              }
              variant="yellow"
            />
            <FlatList
              style={{ flex: 1 }}
              data={data?.data}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              ListFooterComponent={() => {
                return (
                  <TouchableOpacity
                    className="mb-16 mt-2 w-11/12  flex-row justify-between self-end rounded-none border-b py-2 pr-4"
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#0000001F",
                    }}
                    onPress={() => setShowModalAdd(true)}
                  >
                    <Text className="text-base font-extrabold text-[#828282D9]">
                      {t("contactDetails.curriculumVitae.add")}
                    </Text>
                    <IconPlus />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </LayoutForm>
      </LayoutBasicInfo>
      <ModalAddFile
        setShowModal={setShowModalAdd}
        showModal={showModalAdd}
        handleActionUploadFile={handleUploadFile}
        handleActionAddLink={() => setIsAddLink(true)}
      />
      <ModalOpenFile
        setShowModal={setShowModalOpen}
        showModal={showModalOpen}
        title={selectFile?.blobName}
        openFile={() => {
          openFile(selectFile);
        }}
        handleActionRemove={() => deleteFile(selectFile?.id)}
      />
      <ModalUpdateInfoFile
        isShow={isAddLink}
        onSave={(value) => handleActionAddLink(value)}
        setIsShow={() => setIsAddLink(false)}
      />
    </>
  );
};
